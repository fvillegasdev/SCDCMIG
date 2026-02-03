using System;
using System.Collections.Generic;
using System.Dynamic;
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
using Microsoft.AspNet.Identity;

using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;


//using EK.Common.Services;
using EK.Common.Utils;
using EK.Utils;
using EM = EK.Drivers.Emailing;
//using java.io;

namespace EK.Web.Kontrol.Controllers
{
    public class KontrolMController
        : BaseKontrollerOpen
        //: EK.Common.BaseKontroller
    {
        [Route("kontrol/mobile/endpoint/v1")]
        [HttpPost]
        public async Task<ActionResult> MobileEndpoint()
        {
            IAPIClient apiClient = this.getClient();
            //
            dynamic obj = base.GetInputObject();
            //
            string commandName = obj.command;
            string[] commandSeparator = commandName.Split('/');

            string token = Request.Headers["Authorization"];
            string deviceId = obj.deviceId;
            dynamic data = obj.data;


            try
            {
                var retValue = "";
                switch (commandSeparator[1])
                {
                    
                    case "usuarios":
                        retValue = this.usuariosCommandResult(commandSeparator[2], token, deviceId, data);
                    break;


                    


                    /*
                    case "usuarios":
                        Dictionary<string, object> parametros = data.ToObject<Dictionary<string, object>>() as Dictionary<string, object>;

                        if (parametros == null)
                        {
                            parametros = new Dictionary<string, object>();
                        }
                        parametros.Add("token", token);

                        parametros.Add("idUser", 8);

                        commandName = "/kontrol/login/mobile/validate";

                        commandName = "/Usuarios/Mobile_SignIn";

                        return await apiClient
                        .GetServiceCommand(commandName)
                        .Add("parametros", parametros)
                        .ExecuteAsync();

                    break;
                    */

                    default:
                        retValue = "";
                    break;

                }
                return new ContentResult() { Content = retValue, ContentType = JSON_CONTENT_TYPE };
            }
            catch (Exception ex)
            {
                throw;
            }

            /*
            try
            {
                if (commandName == "/usuarios/image")
                {
                    return null;
                    //return this.getDummyCommandStreamResult(commandName, token, deviceId, data);
                }

                if (commandName == "/usuarios/mobileLogin")
                {
                    Dictionary<string, object> parametros = data.ToObject<Dictionary<string, object>>() as Dictionary<string, object>;
                    
                    if (parametros == null)
                    {
                        parametros = new Dictionary<string, object>();
                    }
                    parametros.Add("token", token);

                    parametros.Add("idUser", 8);
                    //parametros.Add("clavetipof", data.claveTipoFlujo);



                    commandName = "/kontrol/login/mobile/validate";

                    commandName = "/Usuarios/Mobile_SignIn";

                    //commandName = "/WorkflowManager/GetDashboardInfo";

                    //return null;

                    return await apiClient
                    .GetServiceCommand(commandName)
                    .Add("parametros", parametros)
                    .ExecuteAsync();

                }

                else if (commandName == "/workflowManager/tasks")
                {

                    Dictionary<string, object> parametros = data.ToObject<Dictionary<string, object>>() as Dictionary<string, object>;
                    //
                    if (parametros == null) {
                        parametros = new Dictionary<string, object>();
                    }
                    parametros.Add("token", token);

                    parametros.Add("idUser", 8);

                    commandName = "/WorkflowManager/GetDashboardInfo";
                    //commandName = "/WorkflowManager/GetFilteredTasks";

                    //return null;
                    return await apiClient
                        .GetServiceCommand(commandName)
                        .Add("parametros", parametros)
                        .ExecuteAsync();
                       
                }
                //-----------------------------------------------------------
                else if (commandName == "/workflowManager/aproval")
                {
                    Dictionary<string, object> parametros = data.ToObject<Dictionary<string, object>>() as Dictionary<string, object>;
                    //
                    if (parametros == null)
                    {
                        parametros = new Dictionary<string, object>();
                    }
                    parametros.Add("token", token);

                    commandName = "workflowManager/task/approval";

                    //commandName = "/WorkflowManager/GetAssignedTask";

                    return await apiClient
                        .GetServiceCommand(commandName)
                        .Add("parametros", parametros)
                        //.Add("id", 1128)
                        .ExecuteAsync();
                }



                else if (commandName == "/workflowManager/FilterTasks")
                {
                    Dictionary<string, object> parametros = data.ToObject<Dictionary<string, object>>() as Dictionary<string, object>;
                    //
                    if (parametros == null)
                    {
                        parametros = new Dictionary<string, object>();
                    }
                    parametros.Add("token", token);

                    parametros.Add("idUser", data.userId);
                    parametros.Add("clavetipof", data.claveTipoFlujo);


                    commandName = "/WorkflowManager/GetFilteredTasks";

                    //commandName = "/WorkflowManager/GetAssignedTask";

                    return await apiClient
                        .GetServiceCommand(commandName)
                        .Add("parametros", parametros)
                        //.Add("id", 1128)
                        .ExecuteAsync();
                }

                else if (commandName == "/workflowManager/AssignedTask")
                {
                    Dictionary<string, object> parametros = data.ToObject<Dictionary<string, object>>() as Dictionary<string, object>;
                    //
                    if (parametros == null)
                    {
                        parametros = new Dictionary<string, object>();
                    }
                    parametros.Add("token", token);

                    //commandName = "/WorkflowManager/GetFilteredTasks";

                    commandName = "/WorkflowManager/GetAssignedTask";

                    return await apiClient
                        .GetServiceCommand(commandName)
                        //.Add("parametros", parametros)
                        //.Add("id", 926)
                        .Add("id", 1018)
                        .ExecuteAsync();
                }
                //-----------------------------------------------------------
                else
                {
                    //return null;

                    var retValue = this.getDummyCommandResult(commandName, token, deviceId, data);
                    return new ContentResult() { Content = retValue, ContentType = JSON_CONTENT_TYPE };
                }
            }
            catch(Exception ex) {
                throw;
            }
            */

            //  when implemented -->
            //return await apiClient
            //    .GetServiceCommand(commandName)
            //    .AddKey(key)
            //    .ExecuteAsync();
        }

        /*private ActionResult getDummyCommandStreamResult(string commandName, string token, string deviceId, object data)
        {
            ActionResult ejemplo = Get("/ClientesModulos/Get")
            .Execute();

            return Json(ejemplo);
        }
        */

        private string getDummyCommandResult(string commandName, string token, string deviceId, object data) {
            var retValue = "ok";

            if (commandName == "/usuarios/login") {
                retValue = this.getDummyUsuariosLogin(deviceId, data);
            }
            else if (commandName == "/usuarios/getImagenPErfil")
            {
                retValue = this.getDummyUsuariosLogin(deviceId, data);
            }

            return retValue;
        }



        private string usuariosCommandResult(string commandName, string token, string deviceId, object data)
        {
            var retValue = "ok";

            switch (commandName)
            {
                case "login":
                    retValue = this.getDummyUsuariosLogin(deviceId, data);
                    break;
                case "getInformacionUsuario":
                    retValue = this.getProfileImagen(deviceId, data);
                    break;
                case "getImagenPErfil":
                    retValue = this.getProfileImagen(deviceId, data);
                    break;
                default:
                    retValue = this.getProfileImagen(deviceId, data);
                    break;
            }

            return retValue;
        }




        private string getDummyUsuariosLogin(string deviceId, object data) {
            dynamic retValue = new ExpandoObject();
            dynamic d = data;
            dynamic obj = new ExpandoObject();
            //
            if (d.userId == "atorres@enkontrol.com" && d.password == "pruebas" && (deviceId == "16A64C6527444F8A9E7FF74764647DDD" || deviceId == "6B6D8A7CDBA545D896D5BFD466DAD645")) {
                retValue.code = 200;
                retValue.message = "OK";

                obj.ID = 12;
                obj.Nombre = "Josue Alejandro Torres Rivera";
                obj.Foto = "/KontrolFiles/GetFile/usuarios/12/images/636560698405778748";
                obj.Posicion = new ExpandoObject();
                obj.Posicion.ID = 4;
                obj.Posicion.Clave = "AS-001-DES-CUMBRES";
                obj.Posicion.Nombre = "Asesor de Ventas - Desarrollo Cumbres";
                obj.Idioma = new ExpandoObject();
                obj.Idioma.ID = 384;
                obj.Idioma.Clave = "es-MX";
                obj.Idioma.Nombre = "Español (México)";
                obj.ZonaHoraria = new ExpandoObject();
                obj.ZonaHoraria.ID = 172;
                obj.ZonaHoraria.Clave = "Central Standard Time (Mexico)";
                obj.ZonaHoraria.Nombre = " (UTC-06:00) Guadalajara, Ciudad de México, Monterrey";
                obj.Email = "atorres@enkontrol.com";
                obj.Telefono = "8127580002";
                obj.Token = "5CC76D9044B6419B8748BBC7B349B66F359CEA3CECD84B56960C47DD2C639C36";
                obj.ExpiracionToken = DateTime.UtcNow.AddDays(1);

                retValue.data = obj;
            }
            else if (d.userId == "sluna@enkontrol.com" && d.password == "pruebas" && (deviceId == "6B6D8A7CDBA545D896D5BFD466DAD645" || deviceId == "16A64C6527444F8A9E7FF74764647DDD"))
            {
                retValue.code = 200;
                retValue.message = "OK";

                obj.ID = 8;
                obj.Nombre = "Sofia Abigail Luna";
                obj.Foto = "/KontrolFiles/GetFile/usuarios/8/images/636767116920087920";
                obj.Posicion = new ExpandoObject();
                obj.Posicion.ID = 8;
                obj.Posicion.Clave = "ASE-001-DES-CUMBRES";
                obj.Posicion.Nombre = " Asesor Estrella - Desarrollo Cumbres";
                obj.Idioma = new ExpandoObject();
                obj.Idioma.ID = 384;
                obj.Idioma.Clave = "es-MX";
                obj.Idioma.Nombre = "Español (México)";
                obj.ZonaHoraria = new ExpandoObject();
                obj.ZonaHoraria.ID = 172;
                obj.ZonaHoraria.Clave = "Central Standard Time (Mexico)";
                obj.ZonaHoraria.Nombre = " (UTC-06:00) Guadalajara, Ciudad de México, Monterrey";
                obj.Email = "sluna@enkontrol.com";
                obj.Telefono = "8181730400";
                obj.Token = "FDA30A6EBCC94A2F927452D29362EA72DAE93BB2C6204258990E73FEFFD0C676";
                obj.ExpiracionToken = DateTime.UtcNow.AddDays(1);

                retValue.data = obj;
            }
            else if ((d.userId == "janajera@enkontrol.com" && d.password == "pruebas" && deviceId == "DDF53E590B804206A992B4055EAD0250") || (d.userId == "sluna@enkontrol.com" && d.password == "prueba" && deviceId == "6B6D8A7CDBA545D896D5BFD466DAD645"))
            {
                retValue.code = 501;
                retValue.motivo = "contrasena";
                retValue.message = "Nombre de usuario o contraseña incorrecta";
            }
            else 
            {
                retValue.code = 501;
                retValue.motivo = "usuario";
                retValue.message = "Usuario no encontrado";
            }

            return Newtonsoft.Json.JsonConvert.SerializeObject(retValue);
        }


        private string getProfileImagen(string deviceId, object data)
        {
            dynamic retValue = new ExpandoObject();
            dynamic d = data;
            string[] fotoValues = d.foto.ToString().Split('/');
            string filePath = string.Format("kontrolFiles/usuarios/{0}/{1}/{2}", fotoValues[4], fotoValues[5], fotoValues[6]);
            var file = GetFileManager().GetFile(filePath);

            retValue.code = 200;
            retValue.message = "OK";

            if (file != null)
            {
                MemoryStream fs = new MemoryStream();
                file.Content.Position = 0;
                file.Content.CopyTo(fs);

                var inputAsString = Convert.ToBase64String(fs.ToArray());
                
                retValue.path = file.ContentType;
                retValue.foto = "data:" + file.ContentType + ";base64," + inputAsString;
            }
                return Newtonsoft.Json.JsonConvert.SerializeObject(retValue);
        }






        public async Task<ActionResult> LeadRegister(EM.LeadItem leadItem)
        {
            IAPIClient apiClient = this.getClient();
            dynamic obj;
            string commandName = "/BoletasProspeccion/Register";
            string token = Request.Params["TOKEN"];

            string deviceId = "6B6D8A7CDBA545D896D5BFD466DAD645";
            dynamic data = new ExpandoObject();
            data.userId = "jpuente@enkontrol.com";
            data.password = "pruebas";

            // This is for dev
            try
            {
                Dictionary<string, object> parametros = new Dictionary<string, object>();
                obj = JsonConvert.SerializeObject(leadItem);

                //
                if (parametros == null)
                {
                    parametros = new Dictionary<string, object>();
                }
                parametros.Add("token", token);
                parametros.Add("leadItem", obj);

                // Crea boleta prospeccion y devuelve el item(modelo) 
                commandName = "/BoletasProspeccion/CreateBoletaProspeccion";
                var item = await apiClient
                    .GetServiceCommand(commandName)
                    .Add("parametros", parametros)
                    .ExecuteAsync();

                //  Busca Plantilla
                string clavePlantilla = "EMFORMG";
                dynamic contents = await apiClient
                    .GetServiceCommand("/Plantillas/GetByClave")
                    .Add("clave", clavePlantilla)
                    .ExecuteAsync<JToken>();

                //  Valida contenido PLANTILLA not null 
                if (contents != null)
                {
                    return new ContentResult() { Content = contents["Plantilla"], ContentType = "text/html" };
                }
                else
                {
                    return new ContentResult() { Content = "Gracias por realizar el Registro, en breve nos pondremos en contacto", ContentType = "text/html" };
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("LeadRegister::" + ex.Message, ex);
            }
        }


    }
}
