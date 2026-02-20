using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Usuarios
        : DAOBaseGeneric<m.Kontrol.Interfaces.IUsuario>, d.Kontrol.Interfaces.IUsuarios
    {
        private const string USP_USUARIOS_EXCEPCIONES = "usp_usuarios_excepciones";
        //private const string USP_USUARIOS_NIVELES_ASIGNADOS = "usp_usuario_niveles_asignados";
        private const string USP_USUARIOS_EXCEPCIONES_INS_UPD = "usp_usuarios_excepciones_ins_upd";
        private const string USP_USUARIOS_SELECT = "usp_usuarios_select";
        private const string USP_USUARIOS_LOGIN = "usp_usuarios_login";
        private const string USP_USUARIOS_PERMISOS = "usp_usuarios_permisos";
        private const string USP_USUARIOS_MENU = "usp_usuarios_menu";
        private const string USP_USUARIOS_MENU_ADMIN = "usp_usuarios_menu_admin";
        private const string USP_USUARIOS_MODULOS = "usp_usuarios_modulos";
        private const string USP_USUARIOS_NIVELES = "usp_usuarioNiveles_select";
        private const string USP_USUARIOS_FAVORITOS = "usp_usuarios_favoritos_select";
        private const string USP_USUARIOS_FAVORITOS_INSERT = "usp_usuarios_favoritos_insert";
        private const string USP_USUARIOS_FAVORITOS_DELETE = "usp_usuarios_favoritos_delete";
        private const string USP_USUARIONIVELCOMPANIA_SELECT = "usp_usuarionivelcompania_select";
        private const string USP_CATSBYPLAZA_SELECT = "usp_catsbyplaza_select";
        private const string USP_USUARIONIVELCOMPANIA_INS_DEL = "usp_usuarionivelcompania_ins_del";
        private const string USP_USUARIOINTENTOSBLOQUEO_UPD = "usp_usuariointentosbloqueo_upd";
        private const string USP_USUARIOS_REPORTE = "usp_usuarios_reporte";
        private const string USP_USUARIOSDESC_SELECT = "usp_usuariosDesc_select";
        private const string USP_FECHASBLOQUEADAS_SELECT = "usp_fechasbloqueadascat_select";
        private const string USP_FECHASBLOQUEADAS_INSERT = "usp_fechasbloqueadascat_insert";
        private const string USP_FECHASBLOQUEADAS_DELETE = "usp_fechasbloqueadascat_delete";

        #region Public Functions

        public Usuarios(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_USUARIOS_SELECT, null, "usuarios")
        { }
        public async Task<object> GetUsuariosDescendientes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_USUARIOSDESC_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        //public async Task<object[]> GetNivelesAsignados(int idUsuario)
        //{
        //    object[] retValue = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object> {
        //            { "idUsuario", idUsuario }
        //        };

        //        retValue =
        //            await helper.CreateEntitiesAsync(USP_USUARIOS_NIVELES_ASIGNADOS, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue;
        //}
        public async Task<object> GetUsuarios(Dictionary<string,object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_USUARIOS_REPORTE,CommandType.StoredProcedure,parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> GetUserById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object> {
                    { "id", id }
                };

               return
                    await helper.CreateSingleEntityAsync(USP_USUARIOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

        }
        


        public async Task<m.Kontrol.Interfaces.IFavorito[]> GetFavoritos(int idUsuario)
        {
            List<m.Kontrol.Interfaces.IFavorito> retValue = null;

            try
            {
                var parameters = new Dictionary<string, object> {
                    { "idUser", idUsuario }
                };

                retValue =
                    await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IFavorito>(USP_USUARIOS_FAVORITOS, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue.ToArray() : null;
        }



        public async Task<int> AgregarFavorito(m.Kontrol.Interfaces.IFavorito favorito)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    {"idUser", favorito.IdCreadoPor },
                    {"titulo", favorito.Titulo },
                    {"icono", favorito.Icono },
                    {"enlace", favorito.Enlace },
                    {"tipo", favorito.Tipo },
                    {"idPadre", favorito.IdPadre },
                    {"creado", DateTime.UtcNow },
                    {"creadoPor", favorito.IdCreadoPor }
                };
                return await helper.GetResultAsync(USP_USUARIOS_FAVORITOS_INSERT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> RemoverFavorito(m.Kontrol.Interfaces.IFavorito favorito)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                        {
                            {"idUser", favorito.IdCreadoPor },
                            {"enlace", favorito.Enlace }
                        };
                return await helper.GetResultAsync(USP_USUARIOS_FAVORITOS_DELETE, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetExcepciones(int idNivel, int idUsuario)
        {
            List<m.Kontrol.Interfaces.IOpcionModulo> retValue = null;

            try
            {
                var parameters = new Dictionary<string, object> {
                    { "idNivel", idNivel },
                    { "idUsuario", idUsuario }
                };

                retValue =
                    await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IOpcionModulo>(USP_USUARIOS_EXCEPCIONES, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue.ToArray() : null;
        }


        private async Task<m.Kontrol.Interfaces.IUsuario> selectUsuario(Dictionary<string, object> parameters)
        {
            m.Kontrol.Interfaces.IUsuario retValue = null;

            try
            {
                retValue = await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IUsuario>(USP_USUARIOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        private async Task<object[]> selectUsuarios(Dictionary<string, object> parameters)
        {
            object[] retValue = null;

            try
            {
                retValue = await helper.CreateEntitiesAsync(USP_USUARIOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue : null;
        }

        public async Task<object[]> GetModulosUsuario(string idUser)
        {
            object[] retValue = null;

            try
            {
                var parameters = new Dictionary<string, object> {
                    { "idUser", idUser }
                };

                retValue = await helper.CreateEntitiesAsync(USP_USUARIOS_MODULOS, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue : null;
        }

        public async Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetOpcionesMenu(int idUser)
        {
            List<m.Kontrol.Interfaces.IOpcionModulo> retValue = null;

            try
            {
                var parameters = new Dictionary<string, object> {
                    { "idUser", idUser }
                };

                retValue = await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IOpcionModulo>(USP_USUARIOS_MENU, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue.ToArray() : null;
        }

        public async Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetOpcionesMenuAdmin(int idUser)
        {
            List<m.Kontrol.Interfaces.IOpcionModulo> retValue = null;

            try
            {
                var parameters = new Dictionary<string, object> {
                    { "idUser", idUser }
                };

                retValue = await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IOpcionModulo>(USP_USUARIOS_MENU_ADMIN, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue.ToArray() : null;
        }

        public async Task<object[]> GetPermisos(int idUser)
        {
            object[] retValue = null;

            try
            {
                var parameters = new Dictionary<string, object> {
                    { "idUser", idUser }
                };

                retValue = await helper.CreateEntitiesAsync(USP_USUARIOS_PERMISOS, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue : null;
        }

        public async Task<object[]> GetAll(int? activos)
        {
            object[] retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "activos", activos ?? 0 } 
                };

                retValue = await this.selectUsuarios(parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        public async Task<m.Kontrol.Interfaces.IUsuario> GetByUID(string ID)
        {
            m.Kontrol.Interfaces.IUsuario retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "UUID", ID}
                };

                retValue = await this.selectUsuario(parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        public async Task<m.Kontrol.Interfaces.IUsuario> GetByEmail(string email)
        {
            m.Kontrol.Interfaces.IUsuario retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "email", email}
                };

                retValue = await this.selectUsuario(parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        public async Task<object> Login(string userName)
        {
            var parameters = new Dictionary<string, object>(){
                    { "userName", userName}
                };

            object retValue = null;

            try
            {
                retValue = await helper.CreateSingleEntityAsync(USP_USUARIOS_LOGIN, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        //public async Task<m.Interfaces.IUsuario> GetByID(int ID)
        //{
        //    m.Interfaces.IUsuario retValue = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "id", ID}
        //        };

        //        retValue = await this.selectUsuario(parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue;
        //}

        //public async Task<object[]> GetByClienteID(int ID)
        //{
        //    object[] retValue = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "idCliente", ID}
        //        };

        //        retValue = await this.selectUsuarios(parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue;
        //}

        //public async Task<object[]> GetKV()
        //{
        //    object[] retValue = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "kv", true }
        //        };

        //        retValue = await this.selectUsuarios(parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue;
        //}

        //public override async Task<m.Interfaces.IUsuario> Save(m.Interfaces.IUsuario model)
        //{
        //    var p = new Dictionary<string, object>(){
        //        {"ID",  model.ID},
        //        {"Nombre",  model.Nombre},
        //        {"Apellidos",  model.Apellidos},
        //        {"Email",  model.Email},
        //        {"Telefono",  model.Telefono},
        //        {"VigenciaInicio",  model.VigenciaInicio},
        //        {"VigenciaFin",  model.VigenciaFin},
        //        {"Bloqueado",  model.Bloqueado},
        //        {"IdEstatus",  model.IdEstatus},
        //        {"ModificadoPor",  model.IdModificadoPor},
        //        {"IdTimeZone",  model.IdTimeZone},
        //        {"IdIdioma",  model.IdIdioma}
        //    };
        //    return await base.BaseSave(base.defaultSave, p);
        //}


        public async Task<int> UpdateIntentosBloqueo(int id, int bloqueo, int intentos)
        {
            int retValue = 0;
            try
            {
                var parameters = new Dictionary<string, object>(){
                    { "id", id},
                    { "bloqueo", bloqueo },
                    { "intentos", intentos}
                };
                retValue = await helper.GetResultAsync(USP_USUARIOINTENTOSBLOQUEO_UPD, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue;

        }

        #region "UsuarioNivelCompania"

        public async Task<List<m.Kontrol.Interfaces.IUsuarioNivelCompania>> GetConfiguracionNiveles(int id, int todos)
        {
            try
            {
                var parameters = new Dictionary<string, object>() {
                    { "idUsuario", id},
                    { "all", todos }
                };

                var retValue = await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuarioNivelCompania>(USP_USUARIOS_NIVELES, CommandType.StoredProcedure, parameters);
                return retValue;
            }
            catch
            {
                throw;
            }
        }

        public async Task<object[]> GetUsuarioNivelCompania(int idusuario, int idcompania, int idnivel)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idusuario", idusuario},
                    { "idcompania",idcompania },
                    { "idnivel",idnivel },
               };
                return (await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuarioNivelCompania>(USP_USUARIONIVELCOMPANIA_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
            }
            catch
            {
                throw;
            }
        }

        public async Task<m.Kontrol.Interfaces.IUsuarioNivelCompania> GetByIDUsuarioNivelCompania(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>() {
                    { "idusuario" , DBNull.Value},
                    { "idnivel", DBNull.Value},
                    { "idcompania", DBNull.Value},
                    { "id" , id}
                };

                return await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IUsuarioNivelCompania>(USP_USUARIONIVELCOMPANIA_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }
        
        public async Task<List<m.Kontrol.Interfaces.IUsuario>> GetListaCatByPlaza(Dictionary<string, object> parametros)
        {
            try
            {
                //var parameters = new Dictionary<string, object>() {
                //    { "idusuario" , DBNull.Value},
                //    { "idnivel", DBNull.Value},
                //    { "idcompania", DBNull.Value},
                //    { "id" , id}
                //};

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuario>(USP_CATSBYPLAZA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
        
        public async Task<List<m.Kontrol.Interfaces.IAgendaFechaBloqueo>> GetFechasUsuariobloqueo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IAgendaFechaBloqueo>(USP_FECHASBLOQUEADAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
        
        public async Task<List<m.Kontrol.Interfaces.IAgendaFechaBloqueo>> saveFechasBloqueadasCat(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IAgendaFechaBloqueo>(USP_FECHASBLOQUEADAS_INSERT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
        public async Task<List<m.Kontrol.Interfaces.IAgendaFechaBloqueo>> deleteFechasBloqueadasCat(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IAgendaFechaBloqueo>(USP_FECHASBLOQUEADAS_DELETE, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SaveUsuarioNivelCompania(m.Kontrol.Interfaces.IUsuarioNivelCompania model)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    {"ID",model.ID },
                    {"IdUsuario",model.IdUsuario },
                    {"IdNivel",model.IdNivel },
                    {"IdCompania",model.IdCompania }
                };
                return await helper.GetResultAsync(USP_USUARIONIVELCOMPANIA_INS_DEL, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SaveExcepcion(int idUser, int idNivel, int idOpcion, int permisos)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    {"idUser", idUser },
                    {"idNivel", idNivel },
                    {"idOpcion", idOpcion },
                    {"permisos", permisos }
                };
                return await helper.GetResultAsync(USP_USUARIOS_EXCEPCIONES_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch 
            {
                throw;
            }
        }

        public async Task<int> DeleteUsuarioNivelCompania(int Id)
        {
            var parameters = new Dictionary<string, object>() {
                    { "ID" , Id},
                    { "IdUsuario",DBNull.Value},
                    { "IdCompania", DBNull.Value},
                    { "IdNivel", DBNull.Value}
                };
            return await helper.GetResultAsync(USP_USUARIONIVELCOMPANIA_INS_DEL, CommandType.StoredProcedure, parameters);
        }
        #endregion "UsuarioNivelCompania"

        #endregion Public Functions
    }
}