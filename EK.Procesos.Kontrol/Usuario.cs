using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
using System.Linq;

namespace EK.Procesos.Kontrol
{
    public class Usuario
        : BPBase<m.Kontrol.Interfaces.IUsuario, d.Kontrol.Interfaces.IUsuarios>, p.Kontrol.Interfaces.IUsuario
    {
        //private const string USP_SCV_USUARIO_SELECT = "usp_scv_usuario_select";
        public Usuario(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IUsuarios dao)
               : base(factory, dao, "usuarios")
        {
        }

        /*Filtro para mostrar usuario descendente con parametros Bloqueado*/
        public async Task<object> GetUsuariosDescendiente(Dictionary<string, object> parametros)
        {
            object result = null;

            var daoRe = Get<d.Kontrol.Interfaces.IUsuarios>();
            int idUser = base.getUserId();
            var estatus= Convert.ToInt32(parametros["estatus"]);
            if (estatus <= 0)
            {
                var p = new Dictionary<string, object>();
                p.Add("id", idUser);
                p.Add("descendientes", true);             
                result = await daoRe.GetUsuariosDescendientes(p);
                return result;
            }
            var sendParameters = new Dictionary<string, object>();
            
            sendParameters.Add("id", idUser);
            sendParameters.Add("descendientes", true);
            sendParameters.Add("IdEstatus", parametros["estatus"]);
            result = await daoRe.GetUsuariosDescendientes(sendParameters);

            return result;
        }
        /*El parametro me, determina si el usuario del cual se solicito la descendencia
         tambien debe ser parte del resultadot*/
        public async Task<List<m.Kontrol.Interfaces.IUsuario>> GetDescendientes(int? id, bool? me )
        {
            int idUser = id == null ? base.getUserId() : id.Value;
            //
            var parametros = new Dictionary<string, object>() {
                { "id", idUser },
                { "descendientes", true }
            };

            if (me == true)
                parametros.Add("me", me);

            return await this.dao.GetAll(parametros);
        }
        public async Task<List<m.Kontrol.Interfaces.IUsuario>> GetUsersDescendientes(int? id, bool? me, bool? bloqueado)
        {
            var estatus = await base.GetCGV("ESTATUS", "A");
            int idUser = id == null ? base.getUserId() : id.Value;
            //
            var parametros = new Dictionary<string, object>() {
                { "id", idUser },
                { "descendientes", true }
            };

            if (me == true)
                parametros.Add("me", me);
            if (bloqueado == false)
            {
                parametros.Add("bloqueado", 0);
                parametros.Add("IdEstatus", estatus.ID);
            }

            return await this.dao.GetAll(parametros);
        }

        //public async Task<object> GetUsuarios(Dictionary<string, object> parametros)
        //{
        //    try
        //    {
        //        return await helper.CreateEntitiesAsync(USP_SCV_USUARIO_SELECT, CommandType.StoredProcedure, parametros);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        public async Task<object> getCurrentUser()
        {
            return await this.dao.GetUserById(base.getUserId());
        }

        public new async Task<object> GetAll(Dictionary<string, object>parametros)
        {
            
            var daoUsuarios = Get<d.Kontrol.Interfaces.IUsuarios>();
            return await daoUsuarios.GetAll(parametros);
        }



        public async Task<m.Kontrol.Interfaces.IUsuario> Current()
        {
            // check permission
            return await this.GetById(base.getUserId());
        }

        public async Task<m.Kontrol.Interfaces.IUsuario> SetUserLanguage(string claveIdioma)
        {
            var idioma = await base.GetCGV("IDIOMA", claveIdioma);
            var usuario = await this.GetById(base.getUserId());
            m.Kontrol.Interfaces.IUsuario retValue = null;

            usuario.IdIdioma = idioma.ID.Value;
            usuario.Idioma = idioma;

            retValue = await this.dao.SaveEntity(usuario);

            return retValue;
        }

        public async Task<object> GetUsuario(Dictionary<string,object> parametros)
        {

            //var Grupo= Convert.ToString(parametros["IdGrupo"]);
            //if (Grupo == "") { Grupo = null; }

            //var ParametersFilters = new Dictionary<string, object> {
            //    { "activos", parametros["activos"] },
            //    { "idGrupo", Grupo },
            //    { "Agente",parametros["Agente"]},
            //    { "bloqueado",parametros["Bloqueado"]},
            //    { "Comisionable",parametros["Comisionable"]},
            //    { "VigenciaInicio",parametros["VigenciaInicio"]},
            //    { "VigenciaFin",parametros["VigenciaFin"]}
            //};
            //var daoUs = Get<d.Kontrol.Interfaces.IUsuarios>();
            //if (Grupo == null || Grupo != "-1")
            //{
            //    var result = await daoUs.GetUsuarios(ParametersFilters);
            //    return result;
            //}
            //else
            //{
            //    var ResultNull = await daoUs.GetUsuarios(parametros);
            //    return null;
            //}
            var res = await this.dao.GetUsuarios(parametros);
            return res;
        }

        //public async Task<object> GetUsuarios(Dictionary<string, object> parametros)
        //{

        //    var daoUsuarios = Get<d.Kontrol.Interfaces.IUsuarios>();
        //    return await daoUsuarios.GetAll(parametros);
        //}

        //public async Task<object[]> GetNivelesAsignados(int idUsuario)
        //{
        //    return await this.dao.GetNivelesAsignados(idUsuario);
        //}

        public async Task<bool> SendCalendar(int id)
        {
            var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
            var user = await this.GetById(id);
            var pm = await GetGlobalParameters("INSTALACION");
            var url = pm.Value<string>("SitioWeb").Replace("/#", "");
            //
            var parametros = new Dictionary<string, object>() {
                    { "LinkCalendario", $"{url}/kontrol/calendar/{user.UUID}" }
                };
            //
            await base.SendNotification(user, "US-CALENDARIO", parametros["LinkCalendario"].ToString(), user, parametros);
            //
            return true;
        }

        public async Task<m.Kontrol.Interfaces.IUsuario> SavePassword(int id, string password, string passwordConfirm, string version)
        {
            m.Kontrol.Interfaces.IUsuario retValue = null;

            try
            {
                BeginTransaction(true);
                //
                var user = await this.dao.GetById(id);
                var idCurrentUser = getUserId();

                if (id == idCurrentUser)
                {
                    // OK
                }
                else
                {
                    // Check permission
                }

                if (password != passwordConfirm)
                {
                    SetReturnInfo(1001, "La contraseña no coincide");
                    return null;
                }

                string userID = $"{id}@{password}";
                string loginPassword = this.generateSHA512String(userID);

                var userKontrol = Get<m.Kontrol.Interfaces.IUsuarioKontrol>();
                userKontrol.ID = id;
                userKontrol.Password = loginPassword;
                userKontrol.Version = version;
                userKontrol.IdModificadoPor = base.getUserId();
                userKontrol.Modificado = DateTime.UtcNow;

                await this.dao.SaveEntity<m.Kontrol.Interfaces.IUsuarioKontrol>(userKontrol, false);
                //
                retValue = await this.GetById(id);

               await SendMail(id, "US-PASSWORD", retValue);
                await LogEvent(id, 1001, "Cambio de contraseña");
                //
                Commit();

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        public async Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetExcepciones(int idNivel, int idUsuario)
        {
            var excepciones = await this.dao.GetExcepciones(idNivel, idUsuario);

            return this.getOpciones(excepciones);
        }

        public async Task<m.Kontrol.Interfaces.IUsuario> GetMyProfile()
        {
            m.Kontrol.Interfaces.IUsuario retValue = null;

            try
            {
                retValue = await this.dao.GetById(getUserId());
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        public async Task<string[]> GetModulos()
        {
            var userId = getUserUId();
            var modulos = await this.dao.GetModulosUsuario(userId); ;
            var retValue = new List<string>();

            if (modulos != null)
            {
                foreach (dynamic m in modulos)
                {
                    retValue.Add(m.Clave);
                }
            }

            return retValue.ToArray();
        }

        public async Task<object[]> GetPermisos()
        {
            var userId = getUserId();

            return await this.dao.GetPermisos(userId);
        }

        public async Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetMenu()
        {
            var procModulos = (Modulos)factory.GetInstance<p.Kontrol.Interfaces.IModulos>();
            var opciones = await this.dao.GetOpcionesMenu(base.getUserId());

            return procModulos.GetOpciones(opciones);
        }

        public async Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetMenuAdmin()
        {
            var idUser = base.getUserId();

            var bpModulos = Get<p.Kontrol.Interfaces.IModulos>();
            var opciones = await this.dao.GetOpcionesMenuAdmin(idUser);

            return bpModulos.GetOpciones(opciones);
        }

        protected override async Task<m.Kontrol.Interfaces.IUsuario> afterGetItem(m.Kontrol.Interfaces.IUsuario item)
        {
            if (item.IdPosicion != null)
            {
                var bpPosiciones = Get<p.Kontrol.Interfaces.IPosicion>();
                item.Posicion = await bpPosiciones.GetById(item.IdPosicion.Value);
            }

            return item;
        }

        public async Task<m.Kontrol.Interfaces.IUsuario> GetInfoAgente(int ID)
        {
            var retValue = await this.dao.GetById(ID);

            if (retValue.IdPosicion != null)
            {
                var daoPosiciones = Get<p.Kontrol.Interfaces.IPosicion>();
                retValue.Posicion = await daoPosiciones.GetById(retValue.IdPosicion.Value);
            }

            return retValue;
        }

        public async Task<m.Kontrol.Interfaces.IUsuario> GetByEmail(string email)
        {
            return await this.dao.GetByEmail(email);
        }

        public async Task<m.Kontrol.Interfaces.IUsuario> GetByUUID(string uuid)
        {
            return await this.dao.GetByUID(uuid);
        }

        public override async Task<m.Kontrol.Interfaces.IUsuario> Save(m.Kontrol.Interfaces.IUsuario item)
        {
            m.Kontrol.Interfaces.IUsuario retValue = null;
            var daoUNC = Get<d.Kontrol.Interfaces.IUsuarioNivelesCompania>();
            var daoClas = Get<d.Kontrol.Interfaces.ICatalogosClasificadores>();

            

            try
            {
                BeginTransaction(true);
                //
                var posicionesBP = Get<p.Kontrol.Interfaces.IPosicion>();
                
                if (item.ID > 0)
                {
                    
                    dynamic user = await this.dao.Login(item.Clave);

                    if (user != null)
                    {
                        bool bloqueado = Convert.ToBoolean(user.Bloqueado);
                        bool isActive = Convert.ToBoolean(user.IsActive);

                        if (bloqueado && !item.Bloqueado)
                        {
                            item.Intentos = 0;
                            await base.LogEvent(item.ID.Value, 1002, "Desbloqueado");
                            // await SendMail(item.ID.Value, "", "");
                        }

                        if (!isActive)
                        {
                            var estatus = await base.GetCGV("ESTATUS", "A");
                            if (estatus.ID == item.IdEstatus)
                            {
                                await base.LogEvent(item.ID.Value, 1003, "Activado");
                            }
                        }
                    }
                    var temp = await this.dao.GetById(item.ID.Value);
                    item.UUID = temp.UUID;
                    //item.Password = user.Password;

                    if (user != null)
                    {
                        item.Password = user.Password;
                    }
                    else
                    {
                        item.Password = temp.Password;
                    }
                }

                else
                {
                    item.UUID = Guid.NewGuid().ToString(); 
                }

                retValue = await base.saveModel(item);

                if (item.ID ==-1) {
                    int id = Convert.ToInt32(retValue.ID);
                    Random valIni = new Random();
                    int numAlea = valIni.Next(50001, 99000);
                    byte[] codif = System.Text.Encoding.UTF8.GetBytes(numAlea.ToString());
                    string resultCod = Convert.ToBase64String(codif);

                    string userID = $"{id}@{resultCod}";
                    string generatePassword = this.generateSHA512String(userID);

                    retValue.Password = generatePassword;
                    retValue.Changed("Password", true);
                    retValue = await base.saveModel(retValue);

                    var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
                    var optionAut = await bpOption.GetByClave("usuariosPassword");
                    var pm = await GetGlobalParameters("INSTALACION");
                    string linkCambioContraseña = $"{pm.Value<string>("SitioWeb")}{optionAut.Ruta}".Replace(":id", Convert.ToString(id));
                    
                    var retVal= await this.GetById(id);
                    retVal.Password = resultCod;
                    retVal.LinkReferencia = linkCambioContraseña;
                    await SendMail(id, "AUT-SENDEMAIL", retVal);
                }
                
                if (retValue != null)
                {
                    var parametros = new Dictionary<string, object>() { { "idUsuario", retValue.ID } };

                    await posicionesBP.AsignarPosicion(retValue.ID.Value, item.IdPosicion);

                    if (item.IdPosicion != null)
                    {
                        retValue.Posicion = await posicionesBP.GetById(item.IdPosicion.Value);
                    }
                    else
                    {
                        retValue.Posicion = null;
                    }

                    var fecha = DateTime.UtcNow;
                    var estatus = await base.GetCGV("ESTATUS", "A");

                    // Niveles
                    if (item.Niveles != null)
                    {
                        foreach (var n in item.Niveles)
                        {
                            if (n.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoUNC.Delete(n.ID.Value);
                            }
                            else
                            {
                                if (n.Estado == m.Kontrol.KontrolEstadosEnum.Modificado || n.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                {
                                    n.IdModificadoPor = base.getUserId();
                                    n.Modificado = fecha;

                                    if (n.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                    {
                                        n.IdCreadoPor = base.getUserId();
                                        n.Creado = fecha;
                                        n.IdEstatus = estatus.ID;
                                        n.IdUsuario = retValue.ID.Value;
                                    }
                                    await daoUNC.SaveEntity(n, false, true);
                                }
                            }
                        }
                    }
                    retValue.Niveles = await daoUNC.GetAll(parametros);

                    // Clasificadores
                    if (item.Clasificadores != null)
                    {
                        foreach (var n in item.Clasificadores)
                        {
                            if (n.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoClas.Delete(n.ID.Value);
                            }
                            else
                            {
                                if (n.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                {
                                    n.IdEntidad = retValue.ID.Value;
                                    n.ClaveEntidad = this.EntityName.ToUpper();
                                    n.IdEstatus = estatus.ID;
                                    n.Creado = fecha;
                                    n.IdCreadoPor = base.getUserId();
                                    n.Modificado = fecha;
                                    n.IdModificadoPor = base.getUserId();

                                    await daoClas.SaveEntity(n, false, true);
                                }
                            }
                        }
                    }
                    parametros = new Dictionary<string, object> { { "claveEntidad", "usuarios" }, { "id", item.ID } };
                    retValue.Clasificadores = await daoClas.GetAll(parametros);
                }

                //
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;

        }

        public async Task<object[]> GetFavoritos()
        {
            var idUser = base.getUserId();
            var retValue = await this.dao.GetFavoritos(idUser);

            return retValue;
        }

        public async Task<object[]> AgregarFavorito(m.Kontrol.Interfaces.IFavorito favorito)
        {
            object[] retValue = null;
            try
            {
                //dynamic obj = JsonConvert.DeserializeObject(favorito);
                //mKontrol.IFavorito favoritoObj = this.factory.GetInstance<mKontrol.IFavorito>();
                favorito.IdCreadoPor = base.getUserId();
                //favoritoObj.Titulo = obj.Titulo;
                //favoritoObj.Icono = obj.Icono;
                //favoritoObj.Enlace = obj.Enlace;
                favorito.Tipo = m.Kontrol.Interfaces.FavoritoTypeEnum.Item;
                favorito.IdPadre = null;
                favorito.Creado = DateTime.UtcNow;

                await this.dao.AgregarFavorito(favorito);

                retValue = await this.GetFavoritos();
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        public async Task<object[]> RemoverFavorito(m.Kontrol.Interfaces.IFavorito favorito)
        {
            object[] retValue = null;
            try
            {
                //dynamic obj = JsonConvert.DeserializeObject(favorito);
                //mKontrol.IFavorito favoritoObj = this.factory.GetInstance<mKontrol.IFavorito>();
                favorito.IdCreadoPor = base.getUserId();
                //favoritoObj.Titulo = obj.Titulo;
                //favoritoObj.Icono = obj.Icono;
                //favoritoObj.Enlace = obj.Enlace;
                favorito.Tipo = m.Kontrol.Interfaces.FavoritoTypeEnum.Item;
                favorito.IdPadre = null;
                favorito.Creado = DateTime.UtcNow;

                await this.dao.RemoverFavorito(favorito);

                retValue = await this.GetFavoritos();
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        //private async Task Log(m.Kontrol.Interfaces.IUsuario obj, m.Kontrol.Interfaces.IUsuarioNivelCompania objNiveles = null)
        //{
        //    dynamic entity = new ElasticEntity();
        //    entity.Bloqueado = obj.Bloqueado;
        //    entity.Email = obj.Email;
        //    entity.ID = obj.ID;
        //    entity.IdEstatus = obj.Estatus.ID;
        //    entity.IdEstatusClave = obj.Estatus.Clave;
        //    entity.IdEstatusNombre = obj.Estatus.Nombre;
        //    entity.Nombre = obj.Nombre;
        //    entity.Telefono = obj.Telefono;
        //    entity.IdTimeZone = obj.TimeZone.ID;
        //    entity.IdTimeZoneClave = obj.TimeZone.Clave;
        //    entity.IdTimeZoneNombre = obj.TimeZone.Nombre;
        //    entity.VigenciaInicio = obj.VigenciaInicio;
        //    entity.VigenciaFin = obj.VigenciaFin;
        //    entity.UUID = obj.UUID;

        //    /************************** ***********************/
        //    entity.RecordType = Convert.ToInt32(obj.Estado);
        //    entity.RecordTypeName = obj.Estado.ToString();
        //    /************************** ***********************/

        //    entity.Creado = obj.Creado;
        //    entity.IdCreadoPor = obj.CreadoPor.ID;
        //    entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

        //    entity.Modificado = obj.Modificado;
        //    entity.IdModificadoPor = getUserId();
        //    entity.IdModificadoPorNombre = getUserId();

        //    if (objNiveles != null)
        //    {
        //        entity.IdNivel = objNiveles.Nivel.ID;
        //        entity.IdNivelNombre = objNiveles.Nivel.Nivel;
        //        entity.IdNivelEstatusClave = objNiveles.Nivel.Estatus.Clave;
        //        entity.IdNivelEstatus = objNiveles.Nivel.Estatus.Nombre;

        //        entity.IdCompania = objNiveles.Compania.ID;
        //        entity.IdCompaniaNombre = objNiveles.Compania.Nombre;
        //        entity.IdCompaniaEstatusClave = objNiveles.Compania.Estatus.Clave;
        //        entity.IdCompaniaEstatusNombre = objNiveles.Compania.Estatus.Nombre;

        //        entity.RecordType = Convert.ToInt32(objNiveles.Estado);
        //        entity.RecordTypeName = objNiveles.Estado.ToString();
        //    }
        //    await this.factory.GetInstance<ILogger>().AddAsync(entityName, entity);
        //}

        //public async Task<mKontrol.IUsuario[]> Search(string nombre)
        //{
        //    return await this.dao.Get(nombre);
        //}

        #region "UsuarioNivelCompania"

        public async Task<List<m.Kontrol.Interfaces.IUsuarioNivelCompania>> GetConfiguracionNiveles(int idUsuario, int todos)
        {
            var parametros = new Dictionary<string, object>() { { "idUsuario", idUsuario } };
            var daoUNC = Get<d.Kontrol.Interfaces.IUsuarioNivelesCompania>();

            return await daoUNC.GetAll(parametros);
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuarioNivelCompania>> GetUsuarioNivelCompania(int idusuario)
        {
            if (idusuario == 0)
            {
                idusuario = getUserId();
            }

            var parameters = new Dictionary<string, object> { { "idUsuario", idusuario } };
            var daoUNC = Get<d.Kontrol.Interfaces.IUsuarioNivelesCompania>();

            var res = await daoUNC.GetAll(parameters);
            return res;
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuarioNivelCompania>> SaveUsuarioNivelCompania(string modelo)
        {
            dynamic obj = JsonConvert.DeserializeObject(modelo);

            try
            {
                BeginTransaction();

                int idUsuario = obj.idUsuario;
                var usuariosDAO = Get<d.Kontrol.Interfaces.IUsuarios>();

                foreach (dynamic nivel in obj.niveles)
                {
                    string n = nivel.idNivel.ToString();
                    m.Kontrol.Interfaces.IUsuarioNivelCompania asignacion =
                        this.factory.GetInstance<m.Kontrol.Interfaces.IUsuarioNivelCompania>();
                    asignacion.ID = nivel.ID;
                    asignacion.IdCompania = nivel.idCompania;
                    asignacion.IdNivel = string.IsNullOrEmpty(n) ? 0 : nivel.idNivel;
                    asignacion.IdUsuario = idUsuario;

                    if (nivel.ID == 0)
                    {
                        if (nivel.idNivel == null)
                        {
                            // do nothing
                        }
                        else
                        {
                            await usuariosDAO.SaveUsuarioNivelCompania(asignacion);
                            // insert
                        }
                    }
                    else
                    {
                        if (nivel.idNivel == null)
                        {
                            await usuariosDAO.SaveUsuarioNivelCompania(asignacion);
                            // delete
                        }
                        else
                        {
                            await usuariosDAO.SaveUsuarioNivelCompania(asignacion);
                            // update, changed to something else
                        }
                    }
                }
                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return await this.GetConfiguracionNiveles(getUserId(), 1);
        }

        public async Task<object[]> SaveExcepciones(string excepciones)
        {
            dynamic obj = JsonConvert.DeserializeObject(excepciones);
            int idNivel = obj.idNivel;
            int idUsuario = obj.idUser;
            dynamic acciones = obj.acciones;

            try
            {
                BeginTransaction();

                var usuariosDAO = Get<d.Kontrol.Interfaces.IUsuarios>();
                foreach (dynamic a in acciones)
                {
                    int idOpcion = a.idOpcion;
                    int permisos = a.permisos;

                    //dynamic history = new ExpandoObject();
                    //history.IdEntidad = item.ID;
                    //history.IdEntidadClave = item.Clave;
                    //history.IdEntidadNombre = item.Nombre;
                    //history.IdTipo = a.TipoClasificador.ID;
                    //history.IdTipoClave = a.TipoClasificador.Clave;
                    //history.IdTipoNombre = a.TipoClasificador.Nombre;
                    //history.IdClasificador = a.ID;
                    //history.IdClasificadorClave = a.Clave;
                    //history.IdClasificadorNombre = a.Nombre;

                    await usuariosDAO.SaveExcepcion(idUsuario, idNivel, idOpcion, permisos);

                    //history.RecordType = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                    //await this.LogClasificadores(entidad, history);
                }
                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return await this.GetExcepciones(idNivel, idUsuario);
        }

        public async Task<int> DeleteUsuarioNivelCompania(int id)
        {
            m.Kontrol.Interfaces.IUsuarioNivelCompania model = await this.dao.GetByIDUsuarioNivelCompania(id);
            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
            int number = await this.dao.DeleteUsuarioNivelCompania(id);

            var modelUsuario = await this.dao.GetById((int)model.Usuario.ID);

            modelUsuario.IdEstatus = modelUsuario.Estatus.ID;
            modelUsuario.IdCreadoPor = modelUsuario.CreadoPor.ID;
            modelUsuario.IdModificadoPor = getUserId();
            modelUsuario.IdTimeZone = (int)modelUsuario.TimeZone.ID;

            await this.dao.Save(modelUsuario);

            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;

            this.Log(modelUsuario, model);

            return number;
        }
        #endregion "UsuarioNivelCompania"

        internal m.Kontrol.Interfaces.IOpcionModulo[] getOpciones(m.Kontrol.Interfaces.IOpcionModulo[] opciones)
        {
            Dictionary<int, m.Kontrol.Interfaces.IOpcionModulo> index = new Dictionary<int, m.Kontrol.Interfaces.IOpcionModulo>();
            index.Add(-1, this.factory.GetInstance<m.Kontrol.Interfaces.IOpcionModulo>());

            try
            {
                if (opciones != null)
                {
                    for (int i = 0; i < opciones.Length; i++)
                    {
                        m.Kontrol.Interfaces.IOpcionModulo opcion = opciones[i];
                        int idPadre = opcion.IdPadre ?? -1;

                        if (!index.ContainsKey(idPadre))
                        {
                            index.Add(idPadre, this.factory.GetInstance<m.Kontrol.Interfaces.IOpcionModulo>());
                        }
                    }

                    for (int i = 0; i < opciones.Length; i++)
                    {
                        m.Kontrol.Interfaces.IOpcionModulo opcion = opciones[i];
                        int id = opcion.ID ?? -1;
                        int idPadre = opcion.IdPadre ?? -1;

                        if (index.ContainsKey(id))
                        {
                            opcion.Opciones = index[id].Opciones;
                            index[id] = opcion;
                        }

                        if (index.ContainsKey(idPadre))
                        {
                            index[idPadre].Opciones.Add(opcion);
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }

            return index[-1].Opciones.ToArray();
        }

        #region "Cryptography"

        private string generateSHA512String(string inputString)
        {
#if SYBASE
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha256.ComputeHash(bytes);
            return getStringFromHash(hash);
#endif
#if MSSQL
             //SHA512 sha512 = SHA512Managed.Create();
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha256.ComputeHash(bytes);
           // byte[] hash = sha512.ComputeHash(bytes);
            return getStringFromHash(hash);
#endif
        }

        private string getStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }

#endregion "Cryptography"

        private async Task updateIntentos(int idUser, int intentos, bool bloqueado, string version)
        {
            var user = Get<m.Kontrol.Interfaces.IUsuarioKontrol>();
            user.TrackChanges = true;
            user.ID = idUser;
            user.Bloqueado = bloqueado;
            user.Version = version;

            if (bloqueado)
            {
                user.Intentos = intentos;

                //var plantilla = await GetPlantilla("US-BLOQUEO", user);
                // await SendMail(idUser, "EK - Su usuario ha sido bloqueado", plantilla.ToString());
                await SendMail(idUser, "US-BLOQUEO", user);

                await this.dao.SaveEntity<m.Kontrol.Interfaces.IUsuarioKontrol>(user, false);
            }
            else
            {
                user.Intentos = intentos;
                await this.dao.SaveEntity<m.Kontrol.Interfaces.IUsuarioKontrol>(user, false);
            }
        }

        public async Task<m.Kontrol.Interfaces.ICommandResult> SignIn(string userName, string password)
        {
            dynamic user = await this.dao.Login(userName);
            var retValue = this.factory.GetInstance<EK.Modelo.Kontrol.Interfaces.ICommandResult>();

            retValue.Codigo = 200;
            retValue.Mensaje = "El Usuario se encuentra ACTIVO y VIGENTE";

            if (user == null)
            {
                // not found
                retValue.Codigo = 404;
                retValue.Mensaje = "El USUARIO no se encontró en el directorio";
            }
            else
            {
                // check password
                int idUser = user.ID;
                string userID = $"{user.ID}@{password}";

                string loginPassword = this.generateSHA512String(userID);
                string userPassword = user.Password;
                if (userPassword != loginPassword)
                {
                    int intentosMax = 3; // System.Convert.ToInt32(WebConfigurationManager.AppSettings["NumeroIntentos"].ToString());
                    int intentos = (user.Intentos + 1);
                    retValue.Codigo = 201;
                    retValue.Mensaje = "Contraseña del USUARIO incorrecta.  Quedan " + (intentosMax - intentos) + " intentos para escribir una contraseña correcta.";

                    // Incrementar intentos 
                    if (intentos >= intentosMax)
                    {
                        user.Bloqueado = 1;

                        retValue.Codigo = 206;
                        retValue.Mensaje = "El USUARIO se encuentra BLOQUEADO. Ha alcanzado el número máximo de intentos fallidos de inicio de sesión.";
                    }

                    // si sobrepasa el numero de intentos permitidos bloquear usuario.
                    bool bloqueado = Convert.ToBoolean(user.Bloqueado);
                    string version = Convert.ToString(user.Version);

                    await this.updateIntentos(idUser, intentos, bloqueado, version);
                    //this.dao.UpdateIntentosBloqueo(user.ID, user.Bloqueado, (user.Intentos + 1));
                }
                //else if (user.IsActive == 0)
                else if (user.IsActive == false)
                {
                    // check estatus
                    retValue.Codigo = 202;
                    retValue.Mensaje = "El USUARIO se encuentra INACTIVO";
                }
                else if (user.Bloqueado == 1)
                {
                    // check blocked
                    retValue.Codigo = 203;
                    retValue.Mensaje = "El USUARIO se encuentra BLOQUEADO";
                }
                else if (user.EsClienteBloqueado)
                {
                    // check CLIENT 
                    retValue.Codigo = 204;
                    retValue.Mensaje = "El CLIENTE se encuentra BLOQUEADO";
                }
                else if (user.VigenciaInicio < DateTime.Now.Date && DateTime.Now.Date > user.VigenciaFin)
                {
                    // check vigencia
                    retValue.Codigo = 205;
                    retValue.Mensaje = "El USUARIO no se encuentra VIGENTE";
                }
                else
                {
                    string version = Convert.ToString(user.Version);
                    int intentos = (user.Intentos + 1);

                    if (intentos > 0)
                    {
                        await this.updateIntentos(idUser, 0, false, version);
                    }
                }

                retValue.Resultado = await this.dao.GetById(idUser);
            }

            return retValue;
        }

#region CLASIFICADORES_USUARIO

        public async Task<List<m.Kontrol.Interfaces.ICatalogoClasificador>> GetClasificadores(int? idUser)
        {
            var parametros = new Dictionary<string, object> { { "claveEntidad", "usuarios" }, { "idEntidad", idUser } };
            var daoClas = Get<d.Kontrol.Interfaces.ICatalogosClasificadores>();

            return await daoClas.GetAll(parametros);
        }
        public async Task<List<m.Kontrol.Interfaces.ICatalogoClasificador>> GetClasificadores()
        {
            var parametros = new Dictionary<string, object> { { "claveEntidad", "usuarios" }, { "idEntidad", getUserId() } };
            var daoClas = Get<d.Kontrol.Interfaces.ICatalogosClasificadores>();

            return await daoClas.GetAll(parametros);
        }

        public async Task<bool> CheckClasificador(int? idUser, string claveClasificador, int? idClasificador)
        {
            bool retValue = true;

            try
            {
                var clasificadores = await this.GetClasificadores(idUser);
                retValue = clasificadores.Any(p => p.TipoClasificador.Clave == claveClasificador && p.IdClasificador == idClasificador);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

#endregion
        public async Task<m.Kontrol.Interfaces.IUsuario> SetDashBoard(int idTablero)
        {
           // var idioma = await base.GetCGV("IDIOMA","");
            var usuario = await this.GetById(base.getUserId());
            m.Kontrol.Interfaces.IUsuario retValue = null;
            usuario.IdDashBoard = idTablero;
            usuario.Changed("IdDashBoard", true);
            retValue = await this.dao.SaveEntity(usuario);
            return retValue;
        }
        //public async Task<EK.Modelo.> UpdateDashBoard(int idCliente, int idDashBoard)
        //{
        //    m.SCV.Interfaces.ICliente retValue = null;

        //    try
        //    {
        //        // BeginTransaction();

        //        var cliente = await this.GetById(idCliente);
        //        //Si el cliente es prospecto se convierte en cliente.
        //        if (cliente != null || cliente.Prospecto == true)
        //        {
        //            cliente.Prospecto = valor;
        //            cliente.Changed("Prospecto", true);
        //            cliente.FechaCliente = DateTime.Now;
        //            cliente.Changed("FechaCliente", true);
        //            var EstatusVenta = await this.dao.SaveEntity(cliente, false);

        //            //Regresamos la informacion del cliente ya con el Estatus Actualizado.
        //            retValue = await this.GetById(idCliente);

        //        }

        //        //Commit();
        //    }
        //    catch
        //    {
        //        Rollback();
        //        throw;
        //    }

        //    return retValue;
        //}
    }
}