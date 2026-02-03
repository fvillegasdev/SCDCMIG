using System;
using System.Security.Cryptography;
using System.Dynamic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

using EK.Drivers.Log;
using drivers = EK.Drivers;
using Newtonsoft.Json;
using System.Globalization;
using System.Text.RegularExpressions;
using System.IO;

namespace EK.Procesos.Kontrol
{
    public class ProcesoBase
        : p.Kontrol.Interfaces.IBaseProceso
    {
        protected m.Kontrol.Interfaces.IContainerFactory factory;
        protected static InternalUser user;
        protected EK.Datos.Kontrol.Interfaces.IDAOBase daoBase;
        protected string entityName;
        private d.Kontrol.Interfaces.IDBHelper helper;
        private p.Kontrol.Interfaces.ICatalogosGeneralesValores bpCGV;
        private bool? isRoot;
        private int returnCode;
        private int? idUser;
        private string returnMessage;
        private int returnSeverity;

        public EK.Datos.Kontrol.Interfaces.IDAOBase DaoBase
        {
            get
            {
                return this.daoBase;
            }
            set
            {
                this.daoBase = value;
            }
        }


        public virtual string EntityName
        {
            get
            {
                return this.entityName;
            }
        }

        public virtual async Task<string> GetDescripcion(dynamic obj)
        {
            var retValue = new StringBuilder();
            if (obj != null)
            {
                retValue.Append($"{obj.Clave}");
                retValue.Append($"{obj.Nombre}");
            }

            return await Task.Run(() => { return retValue.ToString(); });
        }

        public int ReturnCode
        {
            get
            {
                return this.returnCode;
            }
            set
            {
                this.returnCode = value;
            }
        }
        public string ReturnMessage
        {
            get
            {
                return this.returnMessage;
            }
            set
            {
                this.returnMessage = value;
            }
        }
        public int ReturnSeverity
        {
            get
            {
                return this.returnSeverity;
            }
            set
            {
                this.returnSeverity = value;
            }
        }

        protected dynamic ToDynamic(object obj)
        {
            IDictionary<string, object> expando = new ExpandoObject();

            foreach (var propertyInfo in obj.GetType().GetProperties())
            {
                var currentValue = propertyInfo.GetValue(obj);
                var pName = propertyInfo.Name;

                if (!expando.ContainsKey(pName))
                {
                    expando.Add(pName, currentValue);
                }
            }
            return expando as ExpandoObject;
        }
        protected void SetReturnInfo(int code, string message)
        {
            this.SetReturnInfo(code, message, 1);
        }

        protected void SetReturnInfo(int code, string message, int severity)
        {
            this.returnCode = code;
            this.returnMessage = message;
            this.returnSeverity = severity;
        }

        public ProcesoBase()
        {
        }

        protected ProcesoBase(m.Kontrol.Interfaces.IContainerFactory factory)
        {
            this.factory = factory;
        }

        protected ProcesoBase(m.Kontrol.Interfaces.IContainerFactory factory, EK.Datos.Kontrol.Interfaces.IDAOBase daoBase)
        {
            this.factory = factory;
            this.daoBase = daoBase;
        }

        protected ProcesoBase(m.Kontrol.Interfaces.IContainerFactory factory, EK.Datos.Kontrol.Interfaces.IDAOBase daoBase, string entityName)
        {
            this.factory = factory;
            this.daoBase = daoBase;
            this.entityName = entityName;
        }

        protected void BeginTransaction()
        {
            BeginTransaction(false);
        }

        protected void BeginTransaction(bool includeDefault)
        {
            if (this.helper == null)
            {
                this.helper = this.factory.GetInstance<d.Kontrol.Interfaces.IDBHelper>();
                this.isRoot = true;
                this.helper.BeginTransaction();
            }
            else
            {
                if (!this.helper.IsInTransaction)
                {
                    this.helper.BeginTransaction();
                    this.isRoot = true;
                }
            }

            if (includeDefault)
            {
                if (this.daoBase.Helper == null || this.daoBase.Helper.TimeStamp != this.helper.TimeStamp)
                {
                    this.daoBase.Helper = this.helper;
                }
            }
        }

        protected void Commit()
        {
            if (this.helper != null)
            {
                if (this.isRoot ?? false)
                {
                    this.helper.Commit();
                }
            }
        }

        protected void Rollback()
        {
            if (this.helper != null)
            {
                if (this.isRoot ?? false)
                {
                    this.helper.Rollback();
                }
            }
        }

        protected async Task<T> Assign<T>(T source) where T : class
        {
            var obj = (EK.Modelo.Kontrol.Interfaces.IBaseKontrol)source;
            if (obj != null)
            {
                if (obj.ID == null)
                {
                    obj.ID = -1;
                }
                if (string.IsNullOrEmpty(obj.Version))
                {
                    obj.Version = "0";
                }
                //obj.GetChanges().Add("ID");

                var currentDate = DateTime.UtcNow;
                if (obj.Estado == Modelo.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    obj.Creado = currentDate;
                    obj.IdCreadoPor = getUserId();
                }

                obj.Modificado = currentDate;
                obj.IdModificadoPor = getUserId();
                if (obj.IdEstatus == null)
                {
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUS", "A");

                    obj.IdEstatus = estatus.ID;
                    obj.Estatus = estatus;
                }
            }

            return obj as T;
        }

        protected async Task<m.Kontrol.Interfaces.IItemGeneral> GetCGV(string cg, string clave)
        {
            if (bpCGV == null)
            {
                bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            }

            var retValue = await bpCGV.Get(cg, clave);

            return retValue;
        }

        public object GetByType (Type type, m.Kontrol.Interfaces.IBaseKontrol source) {
            var retValue = this.factory.GetInstance(type);
            //
            if (this.helper == null)
            {
                this.helper = this.factory.GetInstance<d.Kontrol.Interfaces.IDBHelper>();
            }
            //
            if (retValue is m.Kontrol.Interfaces.IBaseKontrol)
            {
                var obj = (m.Kontrol.Interfaces.IBaseKontrol)retValue;

                if (source != null)
                {
                    obj.TrackChanges = false;

                    obj.ID = source.ID;
                    obj.Clave = source.Clave;
                    obj.Nombre = source.Nombre;
                    obj.IdEstatus = source.IdEstatus;
                    obj.Estatus = source.Estatus;
                    obj.Creado = DateTime.UtcNow;
                    obj.Modificado = obj.Creado;
                    obj.IdCreadoPor = getUserId();
                    obj.IdModificadoPor = getUserId();
                    obj.Estado = source.Estado;
                    obj.Version = source.Version;

                    obj.TrackChanges = true;
                }
                else
                {
                    obj.TrackChanges = true;
                    if (obj.ID == null)
                    {
                        obj.ID = -1;
                    }
                    if (string.IsNullOrEmpty(obj.Version))
                    {
                        obj.Version = "0";
                    }
                    var currentDate = DateTime.UtcNow;
                    obj.Creado = currentDate;
                    obj.IdCreadoPor = getUserId();
                    obj.Modificado = currentDate;
                    obj.IdModificadoPor = getUserId();
                    //obj.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                }
            }
            else if (retValue is d.Kontrol.Interfaces.IDAOBase)
            {
                d.Kontrol.Interfaces.IDAOBase obj = (d.Kontrol.Interfaces.IDAOBase)retValue;
                obj.Helper = this.helper;
            }
            else if (retValue is p.Kontrol.Interfaces.IBaseProceso)
            {
                p.Kontrol.Interfaces.IBaseProceso obj = (p.Kontrol.Interfaces.IBaseProceso)retValue;
                obj.Helper = this.helper;
                obj.IsRoot = false;
                obj.IdUser = this.idUser;
            }

            return retValue;
        }

        public object GetByTypeName(string typeName) {
            var type = Type.GetType(typeName);

            return this.GetByType(type, null);
        }

        public T Get<T>(m.Kontrol.Interfaces.IBaseKontrol source) where T : class
        {
            return this.GetByType(typeof(T), source) as T;
        }

        public T Get<T>() where T : class
        {
            return Get<T>(null);
        }

        protected async Task SendMail(int idUser, string nombrePlantilla, object obj)
        {
            var plantilla = await GetPlantilla(nombrePlantilla, obj);

            await SendMail(idUser, plantilla.Titulo, plantilla.Plantilla_Contenido);
        }

        protected async Task SendMail(string[] emails, string nombrePlantilla, object obj)
        {
            await this.SendMail(emails, nombrePlantilla, obj, null);
        }

        protected async Task SendMail(string[] emails, string nombrePlantilla, object obj, Dictionary<string, object> parametros)
        {
            var plantilla = await GetPlantilla(nombrePlantilla, obj, parametros);

            await SendMail(emails, plantilla.Titulo, plantilla.Plantilla_Contenido);
        }

        protected async Task SendNotification(dynamic user, string nombrePlantilla, string link, object obj, Dictionary<string, object> parametros)
        {
            var plantilla = await GetPlantilla(nombrePlantilla, obj, parametros);
            var bpNotificacion = Get<p.Kontrol.Interfaces.INotification>();
            var notification = await bpNotificacion.GetNewEntity();
            await Assign(notification);
            notification.TrackChanges = true;
            notification.ID = -1;
            //notification.IdEntidad = user.ID;
            notification.Link = link;
            notification.Nombre = plantilla.Titulo;
            //notification.Descripcion = plantilla.Plantilla_Contenido;
            notification.TipoEntidad = "U";
            await bpNotificacion.Save(notification);

            var toUser = new string[] { $"{user.Nombre} {user.Apellidos}<{user.Email}>" };
            await SendMail(toUser, plantilla.Titulo, plantilla.Plantilla_Contenido);
        }

        protected async Task SendMail(int idUser, string asunto, string contenido)
        {
            var bpEmail = Get<p.Kontrol.Interfaces.IEnvioCorreo>();
            var bpUser = Get<p.Kontrol.Interfaces.IUsuario>();
            var user = await bpUser.GetById(idUser);

            if (user != null)
            {
                await bpEmail.SendEmail(new string[] { $"{user.Nombre} {user.Apellidos}<{user.Email}>" }, asunto, contenido);
            }
        }

        public Dictionary<string, object> getMarcadoresValores(string contenido, dynamic obj)
        {
            dynamic valores = JsonConvert.DeserializeObject(JsonConvert.SerializeObject(obj));
            Regex rx = new Regex(@"@@.*?@@", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            MatchCollection matches = rx.Matches(contenido);
            var ListaMarcadorValor = new Dictionary<string, object>();
            foreach (var m in matches)
            {
                var key = m.ToString();
                var keymod = key.Replace("@@", "");

                var arr = keymod.Split('.');
                dynamic valor = null;

                foreach (var p in arr)
                {
                    if (valor == null)
                    {
                        valor = valores[p];
                    }
                    else
                    {
                        valor = valor[p];
                    }
                }
                ListaMarcadorValor.Add(key, valor.ToString());
            }
            return ListaMarcadorValor;
        }

        protected async Task<drivers.Emailing.Plantilla> GetPlantilla(string idPlantilla, object obj)
        {
            return await this.GetPlantilla(idPlantilla, obj, null);
        }

        protected async Task<drivers.Emailing.Plantilla> GetPlantilla(string idPlantilla, object obj, Dictionary<string, object> parametros)
        {
            return await this.GetPlantilla(idPlantilla, obj, parametros, null);
        }

        protected async Task<drivers.Emailing.Plantilla> GetPlantilla(
            string idPlantilla,
            object obj,
            Dictionary<string, object> parametros,
            m.Kontrol.Interfaces.IMoneda moneda)
        {
            dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(obj));
            drivers.Emailing.Plantilla retValue = new EK.Drivers.Emailing.Plantilla(this.factory);
            var bpPlantillas = Get<p.Kontrol.Interfaces.IPlantillasMails>();
            var bpKontrolFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
            string titulo = "";
            string contenido = "";
            //
            // agregamos parametros personalizados
            if (parametros != null)
            {
                Newtonsoft.Json.Linq.JObject paramObj = new Newtonsoft.Json.Linq.JObject();
                foreach (var p in parametros)
                {
                    paramObj.Add(p.Key, Convert.ToString(p.Value));
                }
                objJson.Add("Parametros", paramObj);
            }
            // Se obtiene la plantilla
            var plantilla = await bpPlantillas.GetByClave(idPlantilla);
            if (plantilla != null)
            {
                if (plantilla.TipoPlantilla != null && (plantilla.TipoPlantilla.Clave == "WORDF" || plantilla.TipoPlantilla.Clave == "HTMLF"))
                {
                    var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
                    var filesParams = new Dictionary<string, object>() {
                        { "tipo", "anexos" },
                        { "entityType", "plantillas"},
                        { "entityId", plantilla.ID}
                    };
                    var files = await bpFiles.GetAll(filesParams);
                    m.Kontrol.Interfaces.IKontrolFile file = null;
                    if (files != null && files.Count > 0)
                    {
                        file = files[0];
                        var content = bpKontrolFiles.GetByStorage(file.EntityType, file.EntityId, file.Tipo, file.Uid);
                        plantilla.Contenido = content;
                        retValue.Contenido = content;
                        retValue.TipoPlantilla = plantilla.TipoPlantilla.Clave;
                        titulo = plantilla.Nombre;
                        retValue.Combinar(ref titulo, ref contenido, objJson);
                        retValue.Titulo = titulo;
                        retValue.Idioma = plantilla.Idioma.Clave;
                        retValue.Contenido.Position = 0;
                        StreamReader sr = new StreamReader(retValue.Contenido);
                        var contenidoString = sr.ReadLine();
                        Console.WriteLine(contenidoString);
                        //Console.ReadLine();
                    }
                    else
                    {
                        this.SetReturnInfo(1, "La plantilla " + idPlantilla + " no fue configurada correctamente o no existe. Por favor verifique e intente de nuevo.");
                        return null;
                    }
                }
                else {
                    titulo = plantilla.Nombre;
                    contenido = plantilla.Plantilla;
                    retValue.Combinar(ref titulo, ref contenido, objJson);
                    retValue.Titulo = titulo;
                    retValue.Plantilla_Contenido = contenido;
                }
            }
            else
            {
                this.SetReturnInfo(1, "La plantilla " + idPlantilla + " no fue configurada correctamente o no existe. Por favor verifique e intente de nuevo.");
                //retValue.Titulo = "PlantillaNoConfigurada";
                //retValue.Plantilla_Contenido = null;
                //return retValue;
                return null;
            }

            return retValue;
        }

        protected async Task SendMail(string[] emails, string asunto, string contenido)
        {
            var bpEmail = Get<p.Kontrol.Interfaces.IEnvioCorreo>();
            await bpEmail.SendEmail(emails, asunto, contenido);
        }

        protected DateTime Today()
        {
            TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time (Mexico)");
            DateTime retValue = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, cstZone);

            return retValue;
        }

        protected async Task<m.Kontrol.Interfaces.IParametros> GetGlobalParameters(string section)
        {
            m.Kontrol.Interfaces.IParametros retValue = null;

            try
            {
                var bpParametros = Get<p.Kontrol.Interfaces.IParametros>();

                retValue = await bpParametros.Get(section);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
                //
            }

            return retValue;
        }

        public d.Kontrol.Interfaces.IDBHelper Helper
        {
            get
            {
                return this.helper;
            }

            set
            {
                this.helper = value;
            }
        }

        public bool IsRoot
        {
            get
            {
                return this.isRoot ?? false;
            }
            set
            {
                this.isRoot = value;
            }
        }

        public int? IdUser
        {
            get
            {
                return this.idUser ?? 0;
            }
            set
            {
                this.idUser = value;
            }
        }

        protected string getUserClaim(string claim)
        {
            return ClaimsPrincipal.Current.FindFirst(claim).Value;
        }

        protected async Task<m.Kontrol.Interfaces.IUsuario> getUser()
        {
            var bpUser = Get<p.Kontrol.Interfaces.IUsuario>();
            var retValue = await bpUser.GetById(this.getUserId());

            return retValue;
        }

        public int getUserId()
        {
            if (this.idUser != null)
            {
                return this.idUser.Value;
            }
            else
            {
                var claim = ClaimsPrincipal.Current.FindFirst(EK.Modelo.Kontrol.Claims.UserId);
                if (claim != null)
                {
                    return Convert.ToInt32(ClaimsPrincipal.Current.FindFirst(EK.Modelo.Kontrol.Claims.UserId).Value);
                }
                else
                {
                    return 0;
                }
            }
        }

        protected string getUserName()
        {
            return Convert.ToString(ClaimsPrincipal.Current.FindFirst(System.Security.Claims.ClaimTypes.Name).Value);
        }

        protected string getUserUId()
        {
            return ClaimsPrincipal.Current.FindFirst(EK.Modelo.Kontrol.Claims.ObjectId).Value;
        }

        //protected int Delete(int id) {

        //}

        protected Modelo.Kontrol.KontrolEstadosEnum getEstadoEntidad(dynamic entidad)
        {
            Modelo.Kontrol.KontrolEstadosEnum retValue = Modelo.Kontrol.KontrolEstadosEnum.SinCambios;

            if (entidad.ID < 0)
            {
                retValue = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            }
            else
            {
                if (entidad._modificado == true)
                {
                    retValue = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }
                else if (entidad._eliminado == true)
                {
                    retValue = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
            }

            return retValue;
        }

        protected InternalUser User
        {
            get
            {
                if (user == null)
                {
                    user = new InternalUser();
                }

                return user;
            }
        }

        protected string GetSHA512String(string inputString)
        {
            return this.GetHash(inputString, "SHA512");
        }
        protected string GetSHA384String(string inputString)
        {
            return this.GetHash(inputString, "SHA384");
        }
        protected string GetSHA256String(string inputString)
        {
            return this.GetHash(inputString, "SHA256");
        }
        protected string GetMD5String(string inputString)
        {
            return this.GetHash(inputString, "MD5");
        }
        protected string GetSHA1String(string inputString)
        {
            return this.GetHash(inputString, "SHA1");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="inputString"></param>
        /// <param name="hashAlgoritm">SHA, MD5, SHA256, SHA384, SHA512</param>
        /// <returns></returns>
        protected string GetHash(string inputString, string hashAlgoritm)
        {
            HashAlgorithm hashObj = HashAlgorithm.Create(hashAlgoritm);
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = hashObj.ComputeHash(bytes);

            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }

        //public virtual async Task<m.IBaseKontrol> GetById(string idPage, int id)
        //{
        //    return await this.daoBase.GetById(id);
        //}

        //public virtual async Task<List<m.IBaseKontrol>> GetAll(int activos)
        //{
        //    return await this.daoBase.GetAll(activos);
        //}

        //protected async Task<m.IBaseKontrol> Save(m.IBaseKontrol item)
        //{
        //    m.IBaseKontrol retValue = null;

        //    try
        //    {
        //        BeginTransaction(true);

        //        item.IdModificadoPor = this.getUserId();

        //        retValue = await this.daoBase.Save(item);
        //        retValue.Estado = item.ID == null || item.ID <= 0 ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;

        //        await Log(retValue);

        //        Commit();
        //    }
        //    catch (Exception ex)
        //    {
        //        Rollback();
        //        throw ex;
        //    }

        //    return retValue;
        //}

        //public virtual async Task<m.IBaseKontrol> Delete(string idPage, int id) {
        //    // verificar permisos
        //    m.IBaseKontrol retValue = null;

        //    try
        //    {
        //        BeginTransaction();

        //        retValue = await this.daoBase.GetById(id);

        //        await this.daoBase.Delete(id);

        //        var deletedItem = await this.daoBase.GetById(id);
        //        if (deletedItem == null)
        //        {
        //            retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
        //        }
        //        else
        //        {
        //            retValue = deletedItem;
        //            retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
        //        }

        //        await Log(retValue);

        //        Commit();
        //    }
        //    catch (Exception ex)
        //    {
        //        Rollback();
        //        throw ex;
        //    }

        //    return retValue;
        //}
        protected virtual void Log(dynamic entity, dynamic obj) { }
        protected async Task Log(m.Kontrol.Interfaces.IBaseKontrol obj, string entityName)
        {
            dynamic entity = new ElasticEntity();
            entity.ID = obj.ID ?? -1;
            entity.Clave = obj.Clave ?? "*";
            entity.Nombre = obj.Nombre ?? "*";
            entity.Version = obj.Version ?? "0";
            entity.IdEstatus = obj.Estatus.ID;
            entity.IdEstatusClave = obj.Estatus.Clave;
            entity.IdEstatusNombre = obj.Estatus.Nombre;

            /************************** ***********************/
            entity.RecordType = Convert.ToInt32(obj.Estado);
            entity.RecordTypeName = obj.Estado.ToString();
            /************************** ***********************/

            entity.Creado = obj.Creado;
            entity.IdCreadoPor = obj.IdCreadoPor;
            if (obj.CreadoPor != null)
            {
                entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
            }

            entity.Modificado = obj.Modificado;
            entity.IdModificadoPor = obj.IdModificadoPor;
            if (obj.ModificadoPor != null)
            {   
                entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;
            }

            this.Log(entity, obj);

            await this.factory.GetInstance<ILogger>().AddAsync(entityName, entity);
        }
        protected virtual async Task Log(m.Kontrol.Interfaces.IBaseKontrol obj)
        {
            await Log(obj, this.entityName);
        }
        protected async Task LogEvent(int idEntity, int idEvent, string message)
        {
            await LogEvent(idEntity, this.entityName, idEvent, string.Empty, message);
        }
        protected async Task LogEvent(int idEntity, string entityName, int idEvent, string message)
        {
            await LogEvent(idEntity, string.IsNullOrEmpty(entityName) ? this.entityName : entityName, idEvent, string.Empty, message);
        }
        protected async Task LogEvent(int idEntity, string entityName, int idEvent, string clave, string message)
        {
            dynamic entity = new ElasticEntity();
            entity.ID = idEntity;
            entity.Message = message;
            entity.Clave = clave;
            //"ID", "Clave", "Modificado", "IdModificadoPorNombre"
            /************************** ***********************/
            entity.RecordType = idEvent;
            entity.RecordTypeName = "Evento";
            /************************** ***********************/

            var user = await this.getUser();
            entity.Creado = DateTime.UtcNow;
            entity.IdCreadoPor = this.getUserId();
            entity.IdCreadoPorNombre = $"{user.Nombre} {user.Apellidos}";

            entity.Modificado = DateTime.UtcNow;
            entity.IdModificadoPor = this.getUserId();
            entity.IdModificadoPorNombre = $"{user.Nombre} {user.Apellidos}";

            await this.factory.GetInstance<ILogger>().AddAsync(entityName, entity);
        }
        protected virtual string[] GetEntityHistoryFields() { return null; }
        protected async Task<object[]> GetEntityHistory(string entityName, int top)
        {
            entityName = entityName.ToLower();
            var logger = this.factory.GetInstance<ILogger>();
            List<string> fields = new List<string> { "ID", "Clave", "Modificado", "IdModificadoPorNombre", "RecordType" };
            string[] extraFields = GetEntityHistoryFields();

            if (extraFields != null)
            {
                fields.AddRange(extraFields);
            }

            logger
               .Select(fields.ToArray())
               .SelectTop(top)
               .OrderByDesc("Modificado");

            return await logger.QueryAsync(entityName);
        }
        protected async Task<object[]> GetEntityHistory(string entityName, int ID, int top)
        {
            entityName = entityName.ToLower();
            var logger = this.factory.GetInstance<ILogger>();
            var condition = Logger.Equal("ID", ID);
            List<string> fields = new List<string> { "ID", "Clave", "Modificado", "IdModificadoPorNombre", "RecordType" };
            string[] extraFields = GetEntityHistoryFields();

            if (extraFields != null)
            {
                fields.AddRange(extraFields);
            }

            logger
               .Select(fields.ToArray())
               .SelectTop(top)
               .Where(condition)
               .OrderByDesc("Modificado");

            return await logger.QueryAsync(entityName);
        }

        protected T Evaluate<T>(string exp, string json) 
        {
            return this.Evaluate<T>(exp, (object)json);
        }

        protected T Evaluate<T>(string exp, object obj)
        {

            dynamic objeto = JsonConvert.DeserializeObject<ExpandoObject>(Convert.ToString(obj));

            var s = new System.Text.StringBuilder();
            s.AppendLine("class Expression:");
            s.AppendLine("  def __init__(self):");
            s.AppendLine("      pass");
            s.AppendLine("  def test(self, d):");
            s.AppendLine("      return "+exp);

            var engine = IronPython.Hosting.Python.CreateEngine();
            var scope = engine.CreateScope();
            var ops = engine.Operations;
           

            object retValue;

            try
            {
                var code = s.ToString();
                engine.Execute(code, scope);
                var pythonType = scope.GetVariable("Expression");
                dynamic instance = ops.CreateInstance(pythonType);

                retValue = instance.test(objeto);
            }
            catch (Exception e)
            {
                throw;
            }

            return (T)retValue ;
        }

        protected T Evaluate<T>(string exp, Dictionary<string, double> obj, object defValue)
        {
            var code = this.createDictionaryCode(exp, obj);

            var engine = IronPython.Hosting.Python.CreateEngine();
            var scope = engine.CreateScope();
            var ops = engine.Operations;
            engine.Execute(code, scope);

            var pythonType = scope.GetVariable("Expression");
            dynamic instance = ops.CreateInstance(pythonType);

            object retValue = defValue;

            try
            {
                retValue = instance.test();
            }
            catch(Exception ex)
            {
                string error = ex.ToString();
                //throw;
            }
            return (T)System.Convert.ChangeType(retValue, typeof(T));
            //return (T)retValue;
        }

        private string createDictionaryCode(string formula, Dictionary<string, double> items)
        {
            var s = new StringBuilder();
            s.AppendLine("def rtz(v):");
            s.AppendLine("  return 0 if v < 0 else v");
            s.AppendLine("class Expression:");
            s.AppendLine("  def __init__(self):");
            s.AppendLine("      pass");
            s.AppendLine("  def test(self):");
            foreach (var c in items)
            {
                double importe = 0d;
                string clave = string.Empty;
                //
                try
                {
                    clave = Convert.ToString(c.Key).Trim();
                    importe = Convert.ToDouble(c.Value);
                }
                catch
                {
                    importe = 0;
                }
                //
                if (!string.IsNullOrEmpty(clave))
                {
                    var culture = CultureInfo.CreateSpecificCulture("en-US");
                    s.AppendLine($"      {clave} = {importe.ToString(culture)}");
                }
            }
            s.AppendLine($"      return {formula}");

            return s.ToString();
        }

        #region "Workflows"
        protected async Task StartWorkflow(string clave, m.Kontrol.Interfaces.IBaseKontrol entity, int workflowOwner)
        {
            var manager = Get<p.Kontrol.Interfaces.IWorkflowManager>();

            await manager.Start(clave, entity, workflowOwner);
        }
        #endregion
    }
}
