using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Utils;
using EK.Modelo.Kontrol;
using storage = EK.Drivers.Storage;

using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using EK.Common.Exportacion;
using System.Web.Configuration;
using OfficeOpenXml;

namespace EK.Web.Kontrol.Controllers
{
    [Authorize()]
    public partial class UsuariosController
        : EK.Common.BaseKontroller
    {
         private const string JSON_CONTENT_TYPE = "application/json";
        public UsuariosController() : 
            base()
        {
        }

        [Route("usuarios/descendientes/{me?}")]
        [HttpGet]
        public async Task<ActionResult> GetDescendientes(bool? me)
        {
            return await Get($"/usuarios/GetDescendientes")
                .Add("id", null)
                .Add("me", me)
                .ExecuteAsync();
        }
        [Route("usuarios/GetUsersDescendientes/{me?}/{bloqueado?}")]
        [HttpGet]
        public async Task<ActionResult> GetUsersDescendientes(bool? me, bool? bloqueado)
        {
            return await Get($"/usuarios/GetUsersDescendientes")
                .Add("id", null)
                .Add("me", me)
                .Add("bloqueado", bloqueado)
                .ExecuteAsync();
        }
        [Route("usuarios/descendientes/id")]
        [HttpPost]
        public async Task<ActionResult> GetDescendientesPost()
        {
            var input = base.GetInputObject();
            int? idInput = null;
                
            if (input != null) {
                idInput = input.id;
            };

            return await Get($"/usuarios/GetDescendientes")
                .Add("id", idInput)
                .Add("me", null)
                .ExecuteAsync();
        }

        [HttpGet]
        public async Task<ActionResult> GetCurrent()
        {
            return await Get("/Usuarios/GetMyProfile").ExecuteAsync();
        }

        [Route("usuario/modulos")]
        [Route("Usuarios/UsuarioModulos")]
        [HttpGet]
        public async Task<ActionResult> UsuarioModulos()
        {
            return await Get("/Modulos/GetByCurrentUser").ExecuteAsync();
        }

        [Route("usuario/menu/admin")]
        [HttpGet]
        public async Task<ActionResult> GetMenuAdmin()
        {
            return await Get("/Usuarios/GetMenuAdmin").ExecuteAsync();
        }

        [Route("usuario/save/password")]
        [HttpPut]
        public async Task<ActionResult> SavePassword()
        {
            var input = base.GetInputObject();

            return await Get($"/usuarios/SavePassword")
                .Add("id", input.ID)
                .Add("password", input.Password)
                .Add("passwordConfirm", input.PasswordConfirm)
                .Add("version", input.Version)
                .ExecuteAsync();
        }

        [Route("usuario/me")]
        [HttpPost]
        public async Task<ActionResult> Current()
        {
            return await Get($"/usuarios/Current")
                .ExecuteAsync();
        }

        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            bool vBoolean = false;
            DateTime vDateTime = DateTime.Now;

            dynamic model = new ExpandoObject();
            bool.TryParse(Request.Form["Bloqueado"], out vBoolean);
            model.Bloqueado = vBoolean;
            model.Email = Request.Form["Email"];
            model.ID = Request.Form["ID"];
            model.Estatus = JsonConvert.DeserializeObject(Request.Form["Estatus"]);
            model.IdEstatus = model.Estatus.ID;
            if (Request.Form["Posicion"] != null)
            {
                model.Posicion = JsonConvert.DeserializeObject(Request.Form["Posicion"]);
                model.IdPosicion = model.Posicion.ID;
            }
            if (Request.Form["TimeZone"] != null)
            {
                model.TimeZone = JsonConvert.DeserializeObject(Request.Form["TimeZone"]);
                model.IdTimeZone = model.TimeZone.ID;
            }
            if (Request.Form["Idioma"] != null)
            {
                model.Idioma = JsonConvert.DeserializeObject(Request.Form["Idioma"]);
                model.IdIdioma = model.Idioma.ID;
            }
            model.Nombre = Request.Form["Nombre"];
            model.Apellidos = Request.Form["Apellidos"];
            model.Telefono = Request.Form["Telefono"];
            DateTime.TryParse(Request.Form["VigenciaInicio"], null, DateTimeStyles.RoundtripKind, out vDateTime);
            model.VigenciaInicio = vDateTime;
            DateTime.TryParse(Request.Form["VigenciaFin"], null, DateTimeStyles.RoundtripKind, out vDateTime);
            model.VigenciaFin = vDateTime;

            //var input = new StreamReader(Request.InputStream).ReadToEnd();
            var input = JsonConvert.SerializeObject(model);
            var retValue = await Get("/Usuarios/Save").Add("usuario", input).ExecuteAsync();

            if (Request.Files.Count > 0)
            {
                var ms = new MemoryStream();
                var file = Request.Files[0];
                var fileName = string.Format("{0}", model.ID);
                var fileMD = new Dictionary<string, string>();
                var imageResult = false;

                fileMD.Add("source", "ek");
                fileMD.Add("id", Convert.ToString(model.ID));
                fileMD.Add("name", Convert.ToString(model.Nombre));
                fileMD.Add("entity", "usuario");

                file.InputStream.CopyTo(ms);

                imageResult = GetImageManager().SaveProfilePicture(fileName, file.ContentType, fileMD, ms);
            }
            else
            {
                // check if removed
                if (Request.Form["Foto"] == "removed")
                {
                    var fileName = string.Format("{0}", model.ID);

                    GetImageManager().RemoveProfilePicture(fileName);
                }
            }

            return retValue;
        }

        //public async Task<ActionResult> SaveImage()
        //{
        //    if (Request.Files.Count > 0)
        //    {
        //        var file = Request.Files[0];
        //        var fileName = System.IO.Path.GetFileName(file.FileName);

        //        // saveFile
        //    }

        //    return null;
        //}

        //[Route("usuarios/history({id})")]
        //[HttpGet]
        //public async Task<ActionResult> GetHistory(int id)
        //{
        //    return await Get("/Usuarios/GetHistory")
        //        .Add("ID", id)
        //        .Add("top", 25)
        //        .ExecuteAsync();
        //}

        //[Route("usuarios/history")]
        //public async Task<ActionResult> GetHistory()
        //{
        //    return await Get("/Usuarios/GetHistory")
        //        .Add("top", 25)
        //        .ExecuteAsync();
        //}

        [Route("usuarios/favoritos")]
        [HttpGet]
        public async Task<ActionResult> GetFavoritos()
        {
            return await Get("/Usuarios/GetFavoritos").ExecuteAsync();
        }

        [Route("usuarios/favoritos/agregar")]
        [HttpPut]
        public async Task<ActionResult> AgregarFavoritos()
        {
            return await Get("/Usuarios/AgregarFavorito").Add("favorito", base.GetInputData()).ExecuteAsync();
        }

        [Route("usuarios/favoritos/remover")]
        [HttpPut]
        public async Task<ActionResult> RemoverFavoritos()
        {
            return await Get("/Usuarios/RemoverFavorito").Add("favorito", base.GetInputData()).ExecuteAsync();
        }

        //[HttpGet]
        //public async Task<ActionResult> GetEntityHistory(string order, int top)
        //{
        //    return await Get("/Usuarios/GetEntityHistory")
        //        .Add("order", order)
        //        .Add("top", top)
        //        .ExecuteAsync();
        //}

        [Route("usuario/sm/foto")]
        [HttpGet]
        public async Task<ActionResult> smFoto()
        {
            var usuario = base.Usuario;

            if (usuario != null)
            {
                var fileName = string.Format("fotos/sm/{0}", base.Usuario.ID);
                storage.File image = GetFileManager().GetFile(fileName);

                if (image != null)
                {
                    image.Content.Position = 0;

                    return File(image.Content, image.ContentType);
                }
                else
                {
                    fileName = "fotos/sm/default";

                    image = GetFileManager().GetFile(fileName);
                    image.Content.Position = 0;

                    return File(image.Content, image.ContentType);
                }
            }

            return await Task.FromResult(HttpNotFound());
        }

        [Route("usuario/default/foto")]
        [HttpGet]
        public async Task<ActionResult> Foto(string size)
        {
            var fileName = $"fotos/{size}/default";
            storage.File file = GetFileManager().GetFile(fileName);

            file.Content.Position = 0;
            return File(file.Content, file.ContentType);
        }

        [Route("usuario({userId})/{size}/foto")]
        [HttpGet]
        public async Task<ActionResult> Foto(int userId, string size)
        {
            var fileName = string.Format("fotos/{0}/{1}", size, userId);
            storage.File file = GetFileManager().GetFile(fileName);

            if (file != null)
            {
                file.Content.Position = 0;

                return File(file.Content, file.ContentType);
            }
            else
            {
                fileName = $"fotos/{size}/default";

                file = GetFileManager().GetFile(fileName);
                file.Content.Position = 0;
                return File(file.Content, file.ContentType);
            }
        }
        
        public async Task<ActionResult> GetAgentes(string search)
        {
            return await Get("/Usuarios/Search")
                  .Add("nombre", search)
                  .ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Search(string search)
        {
            return await Get("/Usuarios/Search").Add("nombre", search).ExecuteAsync();
        }

        [Route("usuarios/key-value")]
        [Route("Usuarios/KV")]
        [HttpGet]
        public async Task<ActionResult> KVAgrupador()
        {
            return await Get("/Usuarios/GetKV")
                .ExecuteAsync();
        }


        #region "UsuarioNivelCompania"

        // GetConfiguracionNiveles
        [Route("usuarios({idusuario})/configuracion/niveles")]
        [HttpGet]
        public async Task<ActionResult> GetConfiguracionNiveles(int idUsuario)
        {
            return await Get("/Usuarios/GetConfiguracionNiveles")
                .Add("idUsuario", idUsuario)
                .Add("todos", 1)
                .ExecuteAsync();
        }

        [Route("usuarios/niveles({id})")]
        [Route("usuarios/niveles")]
        [HttpGet]
        public async Task<ActionResult> GetNiveles(int? id)
        {
            int idUsuario = id ?? 0;
            return await Get("/Usuarios/GetUsuarioNivelCompania")
                .Add("idusuario", idUsuario)
                .ExecuteAsync();
        }

        [Route("usuarios({idUsuario})/niveles/asignados/todos")]
        [HttpGet]
        public async Task<ActionResult> GetTodosNivelesAsignados(int idUsuario)
        {
            return await Get("/Usuarios/GetNivelesAsignados")
                .Add("idUsuario", idUsuario)
                .ExecuteAsync();
        }

        [Route("kontrol/usuarios/niveles/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetNivelesAsignados(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get($"/Usuarios/GetConfiguracionNiveles")
                .Add("idUsuario", obj["idUsuario"])
                .Add("todos", 0)
                .ExecuteAsync();
        }

        [Route("usuarios({idUsuario})/niveles/asignados")]
        [HttpGet]
        public async Task<ActionResult> GetNivelesAsignados(int idUsuario)
        {
            return await Get("/Usuarios/GetConfiguracionNiveles")
                .Add("idUsuario", idUsuario)
                .Add("todos", 0)
                .ExecuteAsync();
        }

        [Route("usuarios/perfil/niveles/asignados")]
        [HttpGet]
        public async Task<ActionResult> GetNivelesPerfilAsignados()
        {
            return await Get("/Usuarios/GetConfiguracionNiveles")
                .Add("idUsuario", base.Usuario.ID)
                .Add("todos", 0)
                .ExecuteAsync();
        }

        [Route("usuarios({idUsuario})/niveles({idNivel})/excepciones")]
        [HttpGet]
        public async Task<ActionResult> GetOpciones(int idUsuario, int idNivel)
        {
            return await Get("/Usuarios/GetExcepciones")
                .Add("idNivel", idNivel)
                .Add("idUsuario", idUsuario)
                .ExecuteAsync();
        }

        [Route("usuarios/excepciones/guardar")]
        [HttpPut]
        public async Task<ActionResult> SaveExcepciones()
        {
            return await Get("/Usuarios/SaveExcepciones").Add("excepciones", base.GetInputData()).ExecuteAsync();
        }

        [HttpPut]
        public async Task<ActionResult> DeleteNiveles()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Usuarios/DeleteUsuarioNivelCompania")
                .Add("id", input)
                .ExecuteAsync();
        }

        [HttpPut]
        public async Task<ActionResult> SaveNiveles()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Usuarios/SaveUsuarioNivelCompania")
                .Add("modelo", input)
                .ExecuteAsync();
        }
        #endregion "UsuarioNivelCompania"

        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/Usuarios/Get").ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/Catalogo.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        [Route("usuarios/setDashBoard/{id}")]
        [HttpGet]
        public async Task<ActionResult> SetUserDashBoard(string id)
        {
            var userString = await Get("/usuarios/SetDashBoard")
                .Add("idTablero", id)
                .ExecuteAsync<string>();
            //
            base.Usuario = JToken.Parse(userString) as JToken;
            //
            return new ContentResult() { Content = userString, ContentType = JSON_CONTENT_TYPE } as ContentResult;
        }

        //public async Task<ActionResult> Exportar()
        //{
        //    bool isENKUser = Convert.ToBoolean(Request.QueryString["isEnkUser"]);
        //    int cliente = Convert.ToInt32(Request.QueryString["cliente"].ToString());
        //    dynamic obj = await Get("/Usuarios/Get").ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Usuarios.xlsx";
        //    configuracion.NombreHojaTrabajo = "Usuario";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Cliente", Campo = "Cliente.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "ID", Campo = "ID" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Apellidos", Campo = "Apellidos" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Email", Campo = "Email" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Teléfono", Campo = "Telefono" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Vigencia del", Campo = "VigenciaInicio" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Vigencia al", Campo = "VigenciaFin" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Puesto", Campo = "Puesto.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}
    }
}