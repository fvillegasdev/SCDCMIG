using System;
using System.Configuration;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.Globalization;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

using EK.Utils;

using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

using EK.Drivers.Storage;
using System.Web.Routing;

using SimpleInjector;

namespace EK.Common
{
    [Authorize]
    //[EK.Common.Utils.LoginFilter]
    public class BaseKontroller
        : Base
    {
        const string JSON_CONTENT_TYPE = "application/json";
        const string CURRENT_USER = "APP_USER_INFO";
        const string API_CLIENT = "APP_API_CLIENT";

        protected string bpName;
        protected string modulo;

        public BaseKontroller()
            : base()
        {
        }

        public BaseKontroller(string modulo, string bpName)
            : this()
        {
            this.bpName = bpName;
            this.modulo = modulo;
        }

        protected virtual string Modulo { get; }

        protected IAPIClient getClient()
        {
            IAPIClient apiClient = null;
            if (Session[API_CLIENT] == null)
            {
                Container container = BootstrapperKontrolAPI.GetContainer();
                if (Session[API_CLIENT] == null)
                {
                    container = BootstrapperKontrolAPI.GetContainer();
                }
                else
                {
                    container = (Container)Session[API_CLIENT];
                }
                apiClient = container.GetInstance<IAPIClient>();
                //
                Session[API_CLIENT] = apiClient;
            }
            else
            {
                apiClient = (IAPIClient)Session[API_CLIENT];
            }

            return apiClient;
        }

        protected IServiceCommand Get(string commandId)
        {
            IAPIClient apiClient = this.getClient();
            //
            return apiClient.GetServiceCommand(commandId);
        }

        protected dynamic GetInputObject() {
            var objectString = this.GetInputData();
            dynamic obj = JObject.Parse(objectString);

            return obj;
        }

        protected dynamic GetInputFormObject()
        {
            var objectString = this.GetInputData();
            string unescapedString = Uri.UnescapeDataString(objectString);
            objectString = unescapedString.Replace("singlevalue=", "").Replace("+", " ");
            //byte[] data = Convert.FromBase64String(objectString);
            //string decodedString = Encoding.UTF8.GetString(data);
            dynamic obj = JObject.Parse(objectString);

            return obj;
        }

        protected dynamic GetEncodedObject(string encodedData)
        {
            byte[] data = Convert.FromBase64String(encodedData);
            string decodedString = Encoding.UTF8.GetString(data);
            string unescapedString =  Uri.UnescapeDataString(decodedString);
            dynamic obj = JObject.Parse(unescapedString);

            return obj;
        }
        protected string GetEncodedString(string encodedData)
        {
            if (encodedData == null) {
                return string.Empty;
            }
            byte[] data = Convert.FromBase64String(encodedData);
            string decodedString = Encoding.UTF8.GetString(data);
            string unescapedString = Uri.UnescapeDataString(decodedString);

            return unescapedString;
        }
        protected Dictionary<string, object> GetEncodedDictionary(string encodedData)
        {
            byte[] data = Convert.FromBase64String(encodedData);
            string decodedString = Encoding.UTF8.GetString(data);
            string unescapedString = Uri.UnescapeDataString(decodedString);

            dynamic obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(unescapedString);

            return obj;
        }
        protected Dictionary<string, object> GetDictionary()
        {
            return JsonConvert.DeserializeObject<Dictionary<string, object>>(GetInputData());
        }
        protected string GetInputData()
        {
            
            string retValue = null;      
            try
            {
                Request.InputStream.Position = 0;

                using (var stream = new System.IO.StreamReader(Request.InputStream))
                {
                    retValue = stream.ReadToEnd();

                    stream.Close();
                }
                 return retValue;
            }
            catch (Exception ex)
            {
                return retValue;
            }
        }

        protected ActionResult Json(string data)
        {
            return new ContentResult() { Content = data, ContentType = JSON_CONTENT_TYPE };
        }

        protected dynamic Usuario
        {
            get
            {
                dynamic userInfo = Session[CURRENT_USER];

                return userInfo;
            }
            set {
                Session[CURRENT_USER] = value;
            }
        }

        public string ToAbsoluteUrl(string relativeUrl)
        {
            return string.Format("http{0}://{1}{2}{3}",
                (Request.IsSecureConnection) ? "s" : "",
                Request.Url.Host, 
                (Request.Url.Port == 80) ? "" : ":" + Request.Url.Port.ToString(),
                VirtualPathUtility.ToAbsolute(relativeUrl)
            );
        }

        protected dynamic Compania
        {
            get
            {
                return null;
            }
        }

        protected dynamic Cliente
        {
            get
            {
                dynamic userInfo = Session[CURRENT_USER];

                return userInfo.Cliente;
            }
        }

        public async Task<dynamic> GetAppInfo()
        {
            dynamic permisos = await this.Get("/Usuarios/GetPermisos").ExecuteAsync<JToken>();
            dynamic menu = await this.Get("/Usuarios/GetMenu").ExecuteAsync<JToken>();
            dynamic clasificadores = await this.Get("/Usuarios/GetClasificadores").ExecuteAsync<JToken>();
            //dynamic clientes = await this.Get("/Clientes/Get").ExecuteAsync<JToken>();
            Assembly assembly = Assembly.Load("EK.App");
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
            string version = fvi.FileVersion;
            //
            string logoPath = "";
            int idDominio = 1; //
            dynamic logo = await Get("/KontrolFiles/GetItem").Add("parametros", new Dictionary<string, object>() {
                    { "tipo", "anexos" },
                    { "entityType", "dominios" },
                    { "entityId", idDominio },
                    { "activos", 1 }
                }).ExecuteAsync<JToken>();

            if (logo != null)
            {
                logoPath = logo.FilePath;
            }
            //
            dynamic usuario = Usuario;
            dynamic retValue = new JObject();
            retValue.Add("Permisos", permisos);
            retValue.Add("Menu", menu);
            retValue.Add("Clasificadores", clasificadores);
            retValue.Add("Logo", logoPath);
            retValue.Add("Version", version);

            if (usuario != null)
            {
                string idLanguage = usuario.Idioma.Clave;
                string idTimeZone = usuario.TimeZone.Clave;
                TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById(idTimeZone);
                TimeSpan tziOffset = tzi.BaseUtcOffset;

                var dtOffset = TimeZoneInfo.ConvertTime(DateTime.Now, tzi); ;
                if (tzi.IsDaylightSavingTime(dtOffset)) {
                    tziOffset = tziOffset.Add(TimeSpan.FromHours(1));
                }

                dynamic timeZone = new JObject();
                dynamic timeOffset = new JObject();
                timeOffset.Add("Days", tziOffset.TotalDays);
                timeOffset.Add("Hours", tziOffset.TotalHours);
                timeOffset.Add("Milliseconds", tziOffset.TotalMilliseconds);
                timeOffset.Add("Minutes", tziOffset.TotalMinutes);
                timeOffset.Add("Seconds", tziOffset.TotalSeconds);

                timeZone.Add("DisplayName", tzi.DisplayName);
                timeZone.Add("BaseOffset", timeOffset);
                retValue.Add("TimeZone", timeZone);

                CultureInfo ci = CultureInfo.GetCultureInfo(idLanguage);
                dynamic language = new JObject();
                language.Add("ClaveLang", idLanguage);
                language.Add("Clave", ci.TwoLetterISOLanguageName);
                language.Add("LCID", ci.LCID);
                language.Add("Nombre", ci.DisplayName);
                language.Add("ShortDatePattern", ci.DateTimeFormat.ShortDatePattern);
                language.Add("LongDatePattern", ci.DateTimeFormat.LongDatePattern);
                language.Add("YearMonthPattern", ci.DateTimeFormat.YearMonthPattern);
                language.Add("TimeSeparator", ci.DateTimeFormat.TimeSeparator);
                retValue.Add("Language", language);

                string fotoPath = "";
                int idUsuario = usuario.ID;
                dynamic foto = await Get("/KontrolFiles/GetItem").Add("parametros", new Dictionary<string, object>() {
                    { "tipo", "images" },
                    { "entityType", "usuarios" },
                    { "entityId", idUsuario },
                    { "activos", 1 }
                }).ExecuteAsync<JToken>();

                if (foto != null)
                {
                    fotoPath = foto.FilePath;
                }
                //Propiedades.IsAgent
                string redirectUrl = ConfigurationManager.AppSettings["drivers:scdc:redirectReportUrl"];

                dynamic user = await this.Get("/Usuarios/getCurrentUser").ExecuteAsync<JToken>();

                dynamic userInfo = new JObject();
                userInfo.Add("ID", usuario.ID);
                userInfo.Add("Nombre", $"{usuario.Nombre} {usuario.Apellidos}");
                userInfo.Add("Clave", usuario.Clave);
                userInfo.Add("Foto", fotoPath);
                userInfo.Add("IdAgente", user.IdAgente);
                userInfo.Add("IdDashBoard", user.IdDashBoard);
                userInfo.Add("RutaDashBoard", user.RutaDashBoard);
                userInfo.Add("NivelUsuario", user.NivelUsuario);
                userInfo.Add("FolioPendiente", user.folio);
                userInfo.Add("redirectReportUrl", redirectUrl);
                if (usuario.Posicion != null)
                {
                    userInfo.Add("Posicion", usuario.Posicion.Nombre);
                    userInfo.Add("PosicionID", usuario.Posicion.ID);
                    userInfo.Add("PosicionClave", usuario.Posicion.Clave);
                }
                retValue.Add("Me", userInfo);
                retValue.Add("Nombre", Convert.ToString($"{usuario.Nombre} {usuario.Apellidos}"));
            }

            //dynamic cliente = new JObject();
            //cliente.Add("ID", usuario.Cliente.ID);
            //cliente.Add("Clave", usuario.Cliente.Clave);
            //cliente.Add("Nombre", usuario.Cliente.Nombre);

            //retValue.Add("Cliente", cliente);
            //retValue.Add("Clientes", clientes);
            //      retValue.Resultado.Add("Companias", companias.Resultado);
            //      retValue.Resultado.Add("Compania",compania);
            //retValue.Resultado.Add("Notificaciones", notificaciones.Resultado);

            //retValue.Add("Iniciales", Convert.ToString(usuario.Iniciales));

            return retValue;
        }
    }
}
