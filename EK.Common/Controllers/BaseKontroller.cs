//using System;
//using System.Configuration;
//using System.Dynamic;
//using System.Globalization;
//using System.Runtime.Caching;
//using System.Security.Claims;
//using System.Web;
//using System.Web.Mvc;
//using System.Threading.Tasks;
//using Microsoft.Owin.Security;
//using Microsoft.Owin.Security.OpenIdConnect;

//using EK.Common.Managers;

//using Newtonsoft.Json.Linq;
//using Newtonsoft.Json;

//using EK.Drivers.Storage;

//namespace EK.Common
//{
//    [Authorize]
//    [EK.Common.Utils.LoginFilter]
//    public class BaseKontroller
//        : Controller
//    {
//        const string JSON_CONTENT_TYPE = "application/json";
//        const string CURRENT_USER = "APP_USER_INFO";

//        public BaseKontroller()
//            : base()
//        {
//        }

//        protected virtual string Modulo { get; }

//        protected IServiceCommand Get(string commandId)
//        {
//            return ServiceCommand.Create("kontrolapi", commandId);
//        }

//        protected string GetInputData()
//        {
//            string retValue = null;
//            Request.InputStream.Position = 0;

//            using (var stream = new System.IO.StreamReader(Request.InputStream))
//            {
//                retValue = stream.ReadToEnd();

//                stream.Close();
//            }

//            return retValue;
//        }

//        protected ActionResult Json(string data)
//        {
//            return new ContentResult() { Content = data, ContentType = JSON_CONTENT_TYPE };
//        }

//        protected dynamic Usuario
//        {
//            get
//            {
//                dynamic userInfo = Session[CURRENT_USER];

//                return userInfo;
//            }
//        }

//        protected dynamic Compania
//        {
//            get
//            {
//                return null;
//            }
//        }

//        protected dynamic Cliente
//        {
//            get
//            {
//                dynamic userInfo = Session[CURRENT_USER];

//                return userInfo.Cliente;
//            }
//        }



//        public ActionResult GetAppInfo()
//        {

//            //int idCompania = 0;
//            /* dynamic compania = null;

//             dynamic companias = this.Get("/Usuarios/GetUsuarioNivelCompania")
//             .Add("idusuario", 0)
//             .Execute<JToken>();
//            if(idCompania == 0){
//                 if (companias != null)
//                 {
//                     compania = companias.Resultado[0].Compania;
//                     idCompania = compania.ID;
//                 }
//             }

//             */

//            dynamic permisos = this.Get("/Usuarios/GetPermisos").Execute<JToken>();
//            dynamic menu = this.Get("/Usuarios/GetMenu").Execute<JToken>();
//            dynamic clientes = this.Get("/Clientes/Get").Execute<JToken>();

//            dynamic usuario = Usuario;
//            dynamic retValue = new JObject();
//            retValue.Add("Codigo", 1);
//            retValue.Add("Resultado", new JObject());
//            retValue.Resultado.Add("Permisos", permisos.Resultado);
//            retValue.Resultado.Add("Menu", menu.Resultado);

//            dynamic cliente = new JObject();
//            cliente.Add("ID", usuario.Cliente.ID);
//            cliente.Add("Clave", usuario.Cliente.Clave);
//            cliente.Add("Nombre", usuario.Cliente.Nombre);

//            retValue.Resultado.Add("Cliente", cliente);
//            retValue.Resultado.Add("Clientes", clientes.Resultado);
//            //      retValue.Resultado.Add("Companias", companias.Resultado);
//            //      retValue.Resultado.Add("Compania",compania);
//            //retValue.Resultado.Add("Notificaciones", notificaciones.Resultado);
//            retValue.Resultado.Add("Nombre", Convert.ToString(usuario.Nombre));
//            retValue.Resultado.Add("Iniciales", Convert.ToString(usuario.Iniciales));

//            return new ContentResult() { Content = retValue.ToString(), ContentType = JSON_CONTENT_TYPE };
//        }

//        [HttpGet]
//        public ActionResult GetNotifications()
//        {
//            dynamic usuario = Usuario;
//            return Get("/Notification/GetAllNotifications").Add("IdUser", usuario.ID).Execute();
//        }

//        #region "File Management"
//        protected IStorage GetFileManager()
//        {
//            return new EK.Drivers.Storage.BlobStorage();
//        }

//        protected ImageManager GetImageManager()
//        {
//            return new ImageManager(new EK.Drivers.Storage.BlobStorage());
//        }
//        #endregion
//    }
//}
