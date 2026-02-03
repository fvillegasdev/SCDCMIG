using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.AspNet.Identity;

using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;


//using EK.Common.Services;
using EK.Common.Utils;
using EK.Utils;
using EK.Modelo.Kontrol;
using p = EK.Procesos;
using EK.Procesos.SCV;
using d = EK.Datos.SCV.Interfaces;
using EK.Procesos.Kontrol;
using EK.Modelo.Kontrol.Interfaces;
using System.Dynamic;
using EK.Modelo.Kontrol.EKCONNECT;

namespace EK.Web.Kontrol.Controllers
{
    public class KontrolAccountController
        : BaseKontrollerOpen
    {
        private const string userKey = "APP_USER_INFO";
        private const string userIdKey = "APP_USER_ID";
        private const string API_CLIENT = "APP_API_CLIENT";
        private const string API_CONTAINER = "APP_API_CONTAINER";
        private const string CURRENT_USER = "APP_USER_INFO";
        private const string bearerTokenKey = "API_TOKEN";
        private const string bearerTokenExpirationKey = "API_TOKEN_EXPIRATION";

        [Route("kontrol/lang/{idLanguage}")]
        [HttpGet]
        public ActionResult Language(string idLanguage)
        {
            var assembly = Assembly.Load("EK.ML");
            var resourceName = $"EK.ML.{idLanguage}.json";
            string result = null;

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                result = reader.ReadToEnd();
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [Route("kontrol/login")]
        [HttpGet]
        public ActionResult Login()
        {
            return View("~/Views/Kontrol/Login.cshtml");
        }

        [Route("kontrol/calendar/{key}")]
        [HttpGet]
        public async Task<ActionResult> Calendar(string key)
        {
            IAPIClient apiClient = base.getClient();
            //
            var contents = await apiClient
                .GetServiceCommand("/calendario/GetTextCalendar")
                .AddKey(key)
                .ExecuteAsync<string>();
            //
            contents = contents.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");
            //
            byte[] byteArray = Encoding.UTF8.GetBytes(contents);
            MemoryStream retValue = new MemoryStream(byteArray);
            //
            return File(retValue, "text/calendar", "calendar.ics");
        }

        [Route("kontrol/plantilla/{key}/{clave}")]
        [HttpGet]
        public async Task<ActionResult> GetPlantilla(string key, string clave)
        {
            IAPIClient apiClient = base.getClient();
            //
            dynamic contents = await apiClient
                .GetServiceCommand("/Plantillas/GetByClave")
                .Add("clave", clave)
                .AddKey(key)
                .ExecuteAsync<JToken>();

            string retValue = contents.Plantilla;
            //
            return Content(retValue);
        }

        [Route("kontrol/{key}/view")]
        [HttpGet]
        public async Task<ActionResult> GetFile(string key, string fileInfo)
        {
            IAPIClient apiClient = base.getClient();
            //
            byte[] data = Convert.FromBase64String(fileInfo);
            string decodedString = Encoding.UTF8.GetString(data);
            string unescapedString = Uri.UnescapeDataString(decodedString);

            string.Format("{0}", "kontrolFiles/" + unescapedString);
            string rp = $"kontrolFiles/{unescapedString}";
            EK.Drivers.Storage.File file = GetFileManager().GetFile(rp);

            if (file != null)
            {
                string filename = string.Empty;
                file.Content.Position = 0;

                if (file.MetaData.TryGetValue("name", out filename))
                {
                    file.Content.Position = 0;
                    return File(file.Content, file.ContentType, filename);
                }
                else
                {
                    file.Content.Position = 0;
                    return File(file.Content, file.ContentType);
                }
            }

            return await Task.FromResult(HttpNotFound());
        }

        [Route("kontrol/login/validate")]
        [HttpPost]
        public async Task<ActionResult> ValidateLogin(string username, string password, string returnUrl)
        {
            var retUrl = HttpUtility.UrlDecode(returnUrl);

            IAPIClient client = base.getClient();

            var result = await client.Login(username, password);
            var resultCode = (LoginResultEnum)result.Codigo;

            if (resultCode == LoginResultEnum.Found)
            {
                dynamic user = client.CurrentUser;
                Session[CURRENT_USER] = user;

                if (user != null)
                {
                    var ident = new ClaimsIdentity(
                      new[] {
                            new Claim("http://schemas.enkontrol.com/identity/claims/user", Convert.ToString(user.ID)),
                            new Claim(ClaimTypes.GivenName, Convert.ToString(user.Nombre)),
                            new Claim(ClaimTypes.Email, Convert.ToString(user.Clave)),
                            new Claim(System.Security.Claims.ClaimTypes.NameIdentifier, Convert.ToString(user.Clave)),
                            new Claim(EK.Modelo.Kontrol.Claims.ObjectId, Convert.ToString(user.UUID)),
                            new Claim(ClaimTypes.NameIdentifier, username),
                            new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider", "ASP.NET Identity", "http://www.w3.org/2001/XMLSchema#string"),
                            new Claim(ClaimTypes.Name, username)
                      },
                      DefaultAuthenticationTypes.ApplicationCookie);

                    HttpContext.GetOwinContext().Authentication.SignIn(new AuthenticationProperties { IsPersistent = false }, ident);
                    client.AddIdentity(ident);

                    return Redirect(retUrl); // auth succeed 
                }
            }
            else
            {
                retUrl = $"{this.Request.UrlReferrer.LocalPath}?ReturnUrl={returnUrl}&error={HttpUtility.UrlEncode(result.Mensaje)}";
                return Redirect(retUrl);
            }

            return View();
        }


        [Route("kontrol/login/mobile/validate")]
        [HttpPost]
        public async Task<object> ValidateMobileLogin(string username)
        {
            //var retUrl = HttpUtility.UrlDecode(returnUrl);

            object result = null;

            IAPIClient client = base.getClient();

            result = await client.Login("sluna@enkontrol.com", "enkontrol--");

            return "HDTPM";

            //return null;
        }

        //https://demos.gruporuba.com.mx/scdc3/kontrol/reportefallas/printOT/90367
        [Route("kontrol/reportefallas/printOT/{IdOrdenTrabajo}")]
        [HttpGet]
        public async Task<ActionResult> imprimirOT(int IdOrdenTrabajo)
        {
            try
            {
                dynamic data = new ExpandoObject();
                string item = JsonConvert.SerializeObject(data);
                dynamic content = await Get("/AgendaSPV/GetDocumentOTHtmlString")
                  .Add("id", IdOrdenTrabajo)
                  .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);
                string namex = string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid);
                Response.AddHeader("content-disposition", string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid));

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                //Response.Write("File Not Exists");
                return Content("<h2>No se encontro el archivo con el ID: "+ IdOrdenTrabajo+"</h2>");
                //throw ex;
            }
        }

        public async Task<int> logErrors(string error)
        {
            var paramError = new Dictionary<string, object>();
            paramError.Add("action", "INSERT_LOG");
            paramError.Add("Err_Msg", error);
            var resul = await Get($"/ekcmensajes/LogErrors")
           //.Add("parametros", paramData)
           .Add("parametros", paramError)
           .ExecuteAsync();

            return -2;
        }

        [Route("kontrol/EKConnect/receive")]
        [HttpPost]
        public async Task<ActionResult> ekcReceive()
        {
            try
            {

                //await this.logErrors("Entrar al controlador " + DateTime.Now.ToShortTimeString());
                var obj = base.GetInputData();
                EKCRequest jsonData = JsonConvert.DeserializeObject<EKCRequest>(obj);
                
                var bp = "ekcmensajes";
                var action = "";
                dynamic objData = JsonConvert.DeserializeObject<object>(jsonData.data.ToString());
                string tipo = objData.typeMessage ?? objData.TypeMessage;
                dynamic paramsMsg;
                switch (tipo)
                {
                    case "TXT":
                        action = "recibir";
                        paramsMsg = JsonConvert.DeserializeObject<EKCRequestData>(jsonData.data.ToString());
                        break;
                    case "FILE":
                        action = "recibirBase64EKC";
                        paramsMsg = JsonConvert.DeserializeObject<ImageBase64>(jsonData.data.ToString());
                        break; 
                    case "UBICACION":
                        action = "ReceiveUbicacionFromEKCC";
                        paramsMsg = JsonConvert.DeserializeObject<UbicacionEKCData>(jsonData.data.ToString());
                        //JObject jsonObject = JObject.Parse(jsonData.data.ToString());
                        //if (jsonObject["Location"] != null)
                        //{
                        //    paramsMsg.latitude = jsonObject["Location"]["Latitude"]?.Value<double>() ?? 0;
                        //    paramsMsg.longitude = jsonObject["Location"]["Longitude"]?.Value<double>() ?? 0;
                        //    paramsMsg.name = jsonObject["Location"]["Name"]?.Value<string>() ?? "";
                        //    paramsMsg.address = jsonObject["Location"]["Address"]?.Value<string>() ?? "";
                        //}
                        //paramsMsg.latitude = objData.Location.Latitude;
                        //paramsMsg.longitude = objData.Location.Longitude;
                        //paramsMsg.name = objData.Location.Name;
                        //paramsMsg.address = objData.Location.Address;
                        break;
                    default:
                        paramsMsg = objData;
                        break;
                } 
              
                return await Get($"/{bp}/{action}")
                .Add("parametros", paramsMsg)
                .ExecuteAsync();
               
            }
            catch (Exception ex)
            {
                //var par = new Dictionary<string, object>();
                ////par.Add("action", "INSERT_LOG");
                // par.Add("Err_Msg", ex.InnerException.Message);
                // await Get($"/ekcmensajes/LogErrors")
                //.Add("parametros", paramData)
                //.Add("parametros", par)
                //.ExecuteAsync();
                await this.logErrors(ex.InnerException.Message);
                 //Response.Write("File Not Exists");
                return Content("Error al recibir los datos ");
                //throw ex;
            }
        }

        [Route("kontrol/mailingNotification/enviarCorreoFirmaCliente/{IdCliente}")]
        [HttpGet]
        public async Task<ActionResult> enviarCorreoFirmaCliente(int IdCliente)
        {
            try
            {
                dynamic content = await Get("/agendaspv/EnviarCorreoFirmaCliente")
                     .Add("IdCliente", IdCliente)
                     .ExecuteAsync();
                string resultado = "";
                var res = content.Content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                if (res == "1")
                {
                    resultado = "Correo Enviado";
                } else
                {
                    resultado = "Error al enviar: [" + res + "]";
                }
                return Content(resultado);
            }
            catch (Exception ex)
            {
                return Content("Error general: " + ex.Message + " | " + ex.InnerException.Message);
            }
        }

        [Route("kontrol/mailingNotification/enviarCorreoEntregaCliente/{IdCliente}")]
        [HttpGet]
        public async Task<ActionResult> enviarCorreoEntregaCliente(int IdCliente)
        {
            try
            {
                dynamic content = await Get("/agendaspv/EnviarCorreoEntregaCliente")
                     .Add("IdCliente", IdCliente)
                     .ExecuteAsync();
                string resultado = "";
                var res = content.Content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                if (res == "1")
                {
                    resultado = "Correo Enviado";
                }
                else
                {
                    resultado = "Error al enviar: [" + res + "]";
                }
                return Content(resultado);
            }
            catch (Exception ex)
            {
                return Content("Error general: " + ex.Message  + " | " + ex.InnerException.Message);
            }
        }

        [Route("kontrol/ResumenFoliosCAT/EnviarCorreoDiario")]
        [HttpGet]
        public async Task<ActionResult> EnviarEmailResumenFoliosCerradosCAT()
        {
            try
            {
                return await Get("/ReportesFallas/EnviarCorreoDiarioACat")
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    [Authorize()]
    public class KontrolController
        : EK.Common.BaseKontroller
    {
        private const string JSON_CONTENT_TYPE = "application/json";

        public KontrolController()
            : base()
        {
        }

        protected override string Modulo
        {
            get
            {
                return "enk";
            }
        }

        // GET: Kontrol/Home
        public ActionResult Index()
        {
            if (base.Usuario == null)
            {
                HttpContext.GetOwinContext().Authentication.SignOut();
                HttpContext.GetOwinContext().Authentication.Challenge();
            }
            else
            {
                ViewBag.Language = base.Usuario.Idioma.Clave;
            }

            if (Request.QueryString["modal"] == "1")
            {
                ViewBag.IsModal = "1";
            }
            else
            {
                ViewBag.IsModal = "0";
            }

            return View();
        }

        public void SignIn()
        {
            if (!Request.IsAuthenticated)
            {
                HttpContext.GetOwinContext().Authentication.Challenge();
            }
        }

        public ActionResult SignOut()
        {
            Request.GetOwinContext().Authentication.SignOut();
            //
            Session.Abandon();
            //
            return Redirect("~/");
        }

        public ActionResult ReportExample()
        {
            return new Rotativa.ViewAsPdf("ReportExample");
        }

        [Route("Kontrol/GetConfiguracion")]
        [HttpGet]
        public async Task<ActionResult> GetConfiguracionAsync()
        {
            return await this.GetAppInfo();
        }

        [HttpGet]
        public async Task<ActionResult> GetConfiguracionScript()
        {
            dynamic retValue = new JObject();
            retValue.Configuration = await this.GetAppInfo();
            retValue.Favoritos = await Get("/Usuarios/GetFavoritos").ExecuteAsync<JToken>();
            retValue.Notificaciones = await Get("/notificaciones/GetAllNotifications").ExecuteAsync<JToken>();
            retValue.NotificacionesApp = await Get("/notificaciones/GetAllNotificationsFromApp").ExecuteAsync<JToken>();
            retValue.Calendario = await Get("/calendario/GetByCurrentUser").ExecuteAsync<JToken>();

            string jsContent = "";

            if (retValue != null)
            {
                jsContent = "var __USER_CONFIG=" + Newtonsoft.Json.JsonConvert.SerializeObject(retValue, Newtonsoft.Json.Formatting.None) + ";global.fixJsonDates(__USER_CONFIG);";
            }

            return new JavaScriptResult() { Script = jsContent };
        }
        [Route("kontrol/setLanguage/{lang}")]
        [HttpGet]
        public async Task<ActionResult> SetUserLanguage(string lang)
        {
            var userString = await Get("/usuarios/SetUserLanguage")
                .Add("claveIdioma", lang)
                .ExecuteAsync<string>();
            //
            base.Usuario = JToken.Parse(userString) as JToken;
            //
            return new ContentResult() { Content = userString, ContentType = JSON_CONTENT_TYPE } as ContentResult;
        }


        [Route("kontrol/PlantillasMeta/handlePlantilla")]
        [HttpPost]
        public async Task<ActionResult> handlePlantilla()
        {
            try
            {
                Dictionary<string, object> obj = base.GetDictionary();

                //await this.logErrors("Entrar al controlador " + DateTime.Now.ToShortTimeString());
                //var obj = base.GetInputData();
               // EKCRequest jsonData = JsonConvert.DeserializeObject<EKCRequest>(obj);

                var bp = "PlantillasMeta";
                var action = obj["action"];
                //dynamic objData = JsonConvert.DeserializeObject<object>(jsonData.data.ToString());
                //string tipo = objData.typeMessage ?? objData.TypeMessage;
               //dynamic paramsMsg;
                //switch (tipo)
                //{
                //    case "TXT":
                //        action = "recibir";
                //        paramsMsg = JsonConvert.DeserializeObject<EKCRequestData>(jsonData.data.ToString());
                //        break;
                //    case "FILE":
                //        action = "recibirBase64EKC";
                //        paramsMsg = JsonConvert.DeserializeObject<ImageBase64>(jsonData.data.ToString());
                //        break;
                //    case "UBICACION":
                //        action = "ReceiveUbicacionFromEKCC";
                //        paramsMsg = JsonConvert.DeserializeObject<UbicacionEKCData>(jsonData.data.ToString());
                       
                //        break;
                //    default:
                //        paramsMsg = objData;
                //        break;
                //}

                return await Get($"/{bp}/{action}")
                .Add("parametros", obj)
                .ExecuteAsync();

            }
            catch (Exception ex)
            {
                //var par = new Dictionary<string, object>();
                ////par.Add("action", "INSERT_LOG");
                // par.Add("Err_Msg", ex.InnerException.Message);
                // await Get($"/ekcmensajes/LogErrors")
                //.Add("parametros", paramData)
                //.Add("parametros", par)
                //.ExecuteAsync();
                
                //await this.log(ex.InnerException.Message);
                //Response.Write("File Not Exists");
                return Content("Error al recibir los datos ");
                //throw ex;
            }
        }

        [Route("kontrol/notifications/assigned")]
        [HttpGet]
        public async Task<ActionResult> GetNotifications()
        {
            //return Json(new object());
            //dynamic usuario = Usuario;
            return await Get("/notificaciones/GetAllNotifications").ExecuteAsync();
        }

        [Route("kontrol/notificationsapp/assigned")]
        [HttpGet]
        public async Task<ActionResult> GetNotificationsApp()
        {
            //return Json(new object());
            //dynamic usuario = Usuario;
            return await Get("/notificaciones/GetAllNotificationsFromApp").ExecuteAsync();
        }
        [Route("kontrol/delete/{idForm}/{id}")]
        [HttpGet]
        public async Task<ActionResult> DefaultDelete(string idForm, int id)
        {
            return await Get("/base/Delete").Add("idForm", idForm).Add("id", id).ExecuteAsync();
        }

        //public void EndSession()
        //{
        //    if (HttpContext.Request.IsAuthenticated)
        //    {                
        //        string userObjectID = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

        //        AuthenticationContext authContext = new AuthenticationContext(aadInstance);
        //        if (authContext.TokenCache != null)
        //        {
        //            authContext.TokenCache.Clear();
        //        }
        //    }

        //    HttpContext.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
        //}
        #region "BP Commands"
        [Route("base/{modulo}/{bp}/id")]
        [HttpPost]
        public async Task<ActionResult> GetById(string modulo, string bp)
        {
            dynamic obj = base.GetInputObject();
            if(modulo == "scv" && bp == "ReportesFallas")
            {
                return await Get($"/{bp}/GetAndSaveById")
               .Add("id", obj.id)
               .ExecuteAsync();
            } else
            {
                return await Get($"/{bp}/GetById")
               .Add("id", obj.id)
               .ExecuteAsync();
            }
           
        }
        [Route("base/{modulo}/{bp}/all/{filtros?}")]
        [HttpGet]
        public async Task<ActionResult> GetAll(string modulo, string bp, string filtros)
        {
            var obj = filtros != null ? base.GetEncodedDictionary(filtros) : new Dictionary<string, object>();
            
            return await Get($"/{bp}/GetAll")
           .Add("parametros", obj)
           .ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/allPost/{filtros?}")]
        [HttpPost]
        public async Task<ActionResult> GetAllPost(string modulo, string bp, string filtros)
        {
            Dictionary<string, object> obj = base.GetDictionary();
            return await Get($"/{bp}/GetAll")
           .Add("parametros", obj)
           .ExecuteAsync();
        }

        [Route("base/{modulo}/{bp}/Get/{accion}/{filtros?}")]
        [HttpGet]
        public async Task<ActionResult> GetAction(string modulo, string bp, string accion, string filtros)
        {
            var obj = filtros != null ? base.GetEncodedDictionary(filtros) : new Dictionary<string, object>();

            return await Get($"/{bp}/{accion}")
                .Add("parametros", obj)
                .ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/GetBP/{accion}/{filtros?}")]
        [HttpGet]
        public async Task<ActionResult> GetActionByParams(string modulo, string bp, string accion, string filtros)
        {
            Dictionary<string, object> obj = filtros != null ? base.GetEncodedDictionary(filtros) : new Dictionary<string, object>();

            var command = Get($"/{bp}/{accion}");
            if (obj != null)
            {
                foreach (var e in obj)
                {
                    command.Add(e.Key, e.Value);
                }
            }
            return await command.ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/GetBP/{accion}")]
        [HttpPost]
        public async Task<ActionResult> GetActionByPost(string modulo, string bp, string accion)
        {
            var obj = base.GetDictionary();
            var command = Get($"/{bp}/{accion}");

            if (obj != null)
            {
                foreach (var e in obj)
                {
                    command.Add(e.Key, e.Value);
                }
            }

            return await command.ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/all")]
        [HttpPost]
        public async Task<ActionResult> GetAll(string modulo, string bp)
        {
            var obj = base.GetDictionary();

            return await Get($"/{bp}/GetAll")
                .Add("parametros", obj)
                .ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/save")]
        [HttpPut]
        public async Task<ActionResult> Save(string modulo, string bp)
        {
            var input = base.GetInputData();

             return await Get($"/{bp}/Save")
                .Add("item", input)
                .ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/delete")]
        [HttpPut]
        public async Task<ActionResult> Delete(string modulo, string bp)
        {
            dynamic obj = base.GetInputObject();

            return await Get($"/{bp}/Delete")
                .Add("id", obj.id)
                .ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/imprimir/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> Imprimir(string modulo, string bp, string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            dynamic data = await Get($"/{bp}/GetAll")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Rotativa.ViewAsPdf($"~/Views/{modulo}/Reportes/{bp}.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }
        [Route("base/{modulo}/reporte/{reporte}")]
        [HttpPost]
        public async Task<ActionResult> GetReporte(string modulo, string reporte)
        {
            var obj = base.GetDictionary();

            return await Get($"/{modulo}Reportes/Get{reporte}")
                .Add("parametros", obj)
                .ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/exportar/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> Exportar(string modulo, string bp, string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            dynamic data = await Get($"/{bp}/Export")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Excel().Exportar(bp, data);
        }
        [Route("base/{modulo}/{bp}/exportar")]
        [HttpPost]
        public async Task<ActionResult> ExportarPost(string modulo, string bp)
        {
            string filtros = Request.Form["data"];
            var obj = filtros != null ? base.GetEncodedDictionary(filtros) : new Dictionary<string, object>();

            dynamic data = await Get($"/{bp}/Export")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Excel().Exportar(bp, data);
        }

        [Route("base/{modulo}/{bp}/print/{accion}")]
        [HttpPost]
        public async Task<ActionResult> Print(string modulo, string bp, string accion)
        {
            try
            {
                string filtros = Request.Form["data"];
                dynamic obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(filtros);

                dynamic content = await Get($"/{bp}/{accion}")
                                       .Add("parametros", obj)
                                       .ExecuteAsync<string>();
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);
                Response.AddHeader("content-disposition", string.Format("inline; filename=\"{0}.pdf\"", accion));

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("base/{modulo}/{bp}/search")]
        [HttpPost]
        public async Task<ActionResult> Search(string modulo, string bp){
            var obj = base.GetInputObject();

            return await Get($"/{bp}/Search")
                .Add("criteria", obj.search)
                .ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/exists/{slot}")]
        [HttpPost]
        public async Task<ActionResult> Exists(string modulo, string bp, string slot)
        {
            var obj = base.GetDictionary();
            return await Get($"/{bp}/{slot}")
                .Add("parametros", obj)
                .ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/Get/{accion}")]
        [HttpPut]
        public async Task<ActionResult> PutAction(string modulo, string bp, string accion)
        {
            var input = base.GetInputData();

            return await Get($"/{bp}/{accion}")
                .Add("item", input)
                .ExecuteAsync();
        }
        [Route("base/{modulo}/{bp}/GetBP/{accion}")]
        [HttpPut]
        public async Task<ActionResult> GetActionByPut(string modulo, string bp, string accion)
        {
            var obj = base.GetDictionary();
            var command = Get($"/{bp}/{accion}");

            if (obj != null)
            {
                foreach (var e in obj)
                {
                    command.Add(e.Key, e.Value);
                }
            }

            return await command.ExecuteAsync();
        }
        #endregion
    }
}