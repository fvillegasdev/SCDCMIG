//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;
//using dao = EK.Datos.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Usuarios
//        : DAOBase, dao.IUsuarios
//    {
//        private const string USP_USUARIOS_EXCEPCIONES = "{call usp_usuarios_excepciones(?,?)}";
//        private const string USP_USUARIOS_EXCEPCIONES_INS_UPD = "{call usp_usuarios_excepciones_ins_upd(?,?,?,?)}";
//        private const string USP_USUARIOS_NIVELES_ASIGNADOS = "{call usp_usuario_niveles_asignados(?)}";
//        private const string USP_USUARIOS_SELECT = "{call usp_usuarios_select(?,?,?,?,?)}";
//        private const string USP_USUARIOS_LOGIN = "{call usp_usuarios_login(?,?,?)}";
//        private const string USP_USUARIOS_MENU = "{call usp_usuarios_menu(?,?)}";
//        private const string USP_USUARIOS_PERMISOS = "{call usp_usuarios_permisos(?,?,?)}";
//        private const string USP_USUARIOS_MODULOS = "{call usp_usuarios_modulos(?)}";
//        private const string USP_USUARIOS_INS_UPD = "{call usp_usuarios_ins_upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//        private const string USP_USUARIOS_NIVELES = "{call usp_usuarioNiveles_select(?,?)}";
//        private const string USP_USUARIOS_FAVORITOS = "{call usp_usuarios_favoritos_select(?)}";
//        private const string USP_USUARIOS_FAVORITOS_INSERT = "{call usp_usuarios_favoritos_insert(?,?,?,?,?,?,?,?)}";
//        private const string USP_USUARIOS_FAVORITOS_DELETE = "{call usp_usuarios_favoritos_delete(?,?)}";
//        private const string USP_USUARIONIVELCOMPANIA_SELECT = "{call usp_usuarionivelcompania_select(?,?,?,?)}";
//        private const string USP_USUARIONIVELCOMPANIA_INS_DEL = "{call usp_usuarionivelcompania_ins_del(?,?,?,?)}";

//        private const string USP_USUARIOINTENTOSBLOQUEO_UPD = "{call usp_usuariointentosbloqueo_upd(?,?,?)}";
//        #region Public Functions

//        public Usuarios(m.Interfaces.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        public object[] GetNivelesAsignados(int idUsuario)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idUsuario", idUsuario }
//                };

//                retValue =
//                    helper.CreateEntities(USP_USUARIOS_NIVELES_ASIGNADOS, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public m.Interfaces.IFavorito[] GetFavoritos(int idUsuario)
//        {
//            List< m.Interfaces.IFavorito> retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idUser", idUsuario }
//                };

//                retValue =
//                    helper.CreateEntities<m.Interfaces.IFavorito>(USP_USUARIOS_FAVORITOS, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public int AgregarFavorito(m.Interfaces.IFavorito favorito)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    {"idUser", favorito.IdCreadoPor },
//                    {"titulo", favorito.Titulo },
//                    {"icono", favorito.Icono },
//                    {"enlace", favorito.Enlace },
//                    {"tipo", favorito.Tipo },
//                    {"idPadre", favorito.IdPadre },
//                    {"creado", DateTime.UtcNow },
//                    {"creadoPor", favorito.IdCreadoPor }
//                };
//                return helper.GetResult(USP_USUARIOS_FAVORITOS_INSERT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int RemoverFavorito(m.Interfaces.IFavorito favorito)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    {"idUser", favorito.IdCreadoPor },
//                    {"enlace", favorito.Enlace }
//                };
//                return helper.GetResult(USP_USUARIOS_FAVORITOS_DELETE, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public m.Interfaces.IOpcionModulo[] GetExcepciones(int idNivel, int idUsuario)
//        {
//            List<m.Interfaces.IOpcionModulo> retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idNivel", idNivel },
//                    { "idUser", idUsuario }
//                };

//                retValue =
//                    helper.CreateEntities<m.Interfaces.IOpcionModulo>(USP_USUARIOS_EXCEPCIONES, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        //public int GuardarConfiguracion(int idNivel, int idOpcion, int permisos)
//        //{
//        //    try
//        //    {
//        //        var parameters = new Dictionary<string, object> {
//        //            { "idNivel", idNivel},
//        //            { "idOpcion", idOpcion},
//        //            { "permisos", permisos }
//        //        };

//        //        return helper.GetResult(USP_USUARIOS_EXCEPCIONES_INS_UPD, CommandType.StoredProcedure, parameters);
//        //    }
//        //    catch
//        //    {
//        //        throw;
//        //    }
//        //}

//        private m.Interfaces.IUsuario selectUsuario(Dictionary<string, object> parameters)
//        {
//            m.Interfaces.IUsuario retValue = null;

//            try
//            {
//                retValue = helper.CreateSingleEntity<m.Interfaces.IUsuario>(USP_USUARIOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        private object[] selectUsuarios(Dictionary<string, object> parameters)
//        {
//            object[] retValue = null;

//            try
//            {
//                retValue = helper.CreateEntities(USP_USUARIOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public object[] GetModulosUsuario(string idUser)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idUser", idUser }
//                };

//                retValue = helper.CreateEntities(USP_USUARIOS_MODULOS, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public m.Interfaces.IOpcionModulo[] GetOpcionesMenu(int idUser, int idCompania)
//        {
//            List<m.Interfaces.IOpcionModulo> retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idUser", idUser },
//                    { "idCompania", idCompania }
//                };

//                retValue = helper.CreateEntities<m.Interfaces.IOpcionModulo>(USP_USUARIOS_MENU, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public object[] GetPermisos(int idUser, int idCompania)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idUser", idUser },
//                    { "idModulo", null },
//                    { "idCompania", idCompania }
//                };

//                retValue = helper.CreateEntities(USP_USUARIOS_PERMISOS, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public object[] GetAll(int idCompania = 0, int idUsuario = 0, int idPuesto = 0)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idUsuario", idUsuario},
//                    { "idCliente", DBNull.Value},
//                    { "UUID", DBNull.Value},
//                    { "email", DBNull.Value}
//                };

//                retValue = this.selectUsuarios(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public m.Interfaces.IUsuario GetByUID(string ID)
//        {
//            m.Interfaces.IUsuario retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idUsuario", DBNull.Value},
//                    { "idCliente", DBNull.Value},
//                    { "UUID", ID},
//                    { "email", DBNull.Value}
//                };

//                retValue = this.selectUsuario(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public m.Interfaces.IUsuario GetByEmail(string email)
//        {
//            m.Interfaces.IUsuario retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idUsuario", DBNull.Value},
//                    { "idCliente", DBNull.Value},
//                    { "UUID", DBNull.Value},
//                    { "email", email}
//                };

//                retValue = this.selectUsuario(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public object Login(string userName)
//        {
//            var parameters = new Dictionary<string, object>(){
//                    { "userName", userName}
//                };

//            object retValue = null;

//            try
//            {
//                retValue = helper.CreateSingleEntity(USP_USUARIOS_LOGIN, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public m.Interfaces.IUsuario GetByID(int ID)
//        {
//            m.Interfaces.IUsuario retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idUsuario", ID},
//                    { "idCliente", DBNull.Value},
//                    { "UUID", DBNull.Value},
//                    { "email", DBNull.Value}
//                };

//                retValue = this.selectUsuario(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public object[] GetByClienteID(int ID)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idUsuario", DBNull.Value},
//                    { "idCliente", ID},
//                    { "UUID", DBNull.Value},
//                    { "email", DBNull.Value}
//                };

//                retValue = this.selectUsuarios(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public object[] GetKV()
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idUsuario", DBNull.Value},
//                    { "idCliente", DBNull.Value},
//                    { "UUID", DBNull.Value},
//                    { "email", DBNull.Value},
//                    { "kv", true }
//                };

//                retValue = this.selectUsuarios(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public int Save(m.Interfaces.IUsuario model)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>() {
//                    {"ID",  model.ID},
//                    {"Nombre", model.Nombre},
//                    {"Apellidos", model.Apellidos},
//                    {"Email",  model.Email},
//                    {"Telefono",  model.Telefono},
//                    {"VigenciaInicio",  model.VigenciaInicio},
//                    {"VigenciaFin",  model.VigenciaFin},
//                    {"UUID",  model.UUID},
//                    {"IdPuesto",  model.IdPuesto},
//                    {"Bloqueado",  model.Bloqueado},
//                    {"IdEstatus",  model.IdEstatus},
//                    {"CreadoPor",  model.IdCreadoPor},
//                    {"ModificadoPor",  model.IdModificadoPor},
//                    {"IdTimeZone",  model.IdTimeZone},
//                    {"IdCliente",  model.IdCliente}
//                };
//                return helper.GetResult(USP_USUARIOS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public m.Interfaces.IUsuario[] Get(string nombre)
//        {
//            Dictionary<string, object> parameters = new Dictionary<string, object>();
//            List<m.Interfaces.IUsuario> retValue;
//            try
//            {
//                string sqlQuery = @"select ID
//                            , Nombre
//                            , IdEstatus
//                            , Creado
//                            , CreadoPor
//                            , Modificado
//                            , ModificadoPor
//                            , RV = cast(cast(RV as bigint) as nvarchar)
//                        FROM dbo.Usuarios
//                        WHERE Upper(nombre) like '%' + @nombre + '%'";

//                parameters = new Dictionary<string, object>();
//                parameters.Add("nombre", nombre.ToUpper());

//                retValue = helper.CreateEntities<m.Interfaces.IUsuario>(sqlQuery, CommandType.Text, parameters);
//                return retValue.ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public int UpdateIntentosBloqueo(int id, int bloqueo, int intentos)
//        {
//            int retValue = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>(){
//                    { "id", id},
//                    { "bloqueo", bloqueo },
//                    { "intentos", intentos}
//                };
//                retValue = helper.GetResult(USP_USUARIOINTENTOSBLOQUEO_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//            return retValue;
//        }

//        #region UsuarioNivelCompania

//        public object[] GetUsuarioNivelCompania(int idusuario, int idcompania, int idnivel)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idusuario", idusuario},
//                    { "idcompania",idcompania },
//                    { "idnivel",idnivel },
//                    { "id" , DBNull.Value}
//               };

//                return helper.CreateEntities<m.Interfaces.IUsuarioNivelCompania>(USP_USUARIONIVELCOMPANIA_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public object[] GetConfiguracionNiveles(int id, int todos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>() {
//                    { "idUsuario" , id},
//                    { "all", todos }
//                };

//                return helper.CreateEntities(USP_USUARIOS_NIVELES, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public m.Interfaces.IUsuarioNivelCompania GetByIDUsuarioNivelCompania(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>() {
//                    { "idusuario" , DBNull.Value},
//                    { "idnivel", DBNull.Value},
//                    { "idcompania", DBNull.Value},
//                    { "id" , id}
//                };

//                return helper.CreateSingleEntity<m.Interfaces.IUsuarioNivelCompania>(USP_USUARIONIVELCOMPANIA_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int SaveUsuarioNivelCompania(m.Interfaces.IUsuarioNivelCompania model)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    {"ID", model.ID },
//                    {"IdUsuario", model.IdUsuario },
//                    {"IdCompania", model.IdCompania },
//                    {"IdNivel", model.IdNivel }
//                };
//                return helper.GetResult(USP_USUARIONIVELCOMPANIA_INS_DEL, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int SaveExcepcion(int idUser, int idNivel, int idOpcion, int permisos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    {"idUser", idUser },
//                    {"idNivel", idNivel },
//                    {"idOpcion", idOpcion },
//                    {"permisos", permisos }
//                };
//                return helper.GetResult(USP_USUARIOS_EXCEPCIONES_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int DeleteUsuarioNivelCompania(int Id)
//        {
//            var parameters = new Dictionary<string, object>() {
//                    { "ID" , Id},
//                    { "IdUsuario",DBNull.Value},
//                    { "IdCompania", DBNull.Value},
//                    { "IdNivel", DBNull.Value}
//                };
//            return helper.GetResult(USP_USUARIONIVELCOMPANIA_INS_DEL, CommandType.StoredProcedure, parameters);
//        }

//        #endregion UsuarioNivelCompania

//        #endregion Public Functions
//    }
//}