using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol
{
    public abstract class DAOBaseGeneric<T>
        : DAOBase, d.Kontrol.Interfaces.IDAOBaseGeneric<T> where T: class, m.Kontrol.Interfaces.IBaseKontrol
    {
        public DAOBaseGeneric()
        {
        }

        public DAOBaseGeneric(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper, string defaultSelect, string defaultSave, string entityName)
            : base(factory, helper, defaultSelect, defaultSave, entityName)
        {
        }

        public virtual async Task<T> BaseGetById(string commandName, int id)
        {
            T retValue;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id}
                };

                retValue = await helper.CreateSingleEntityAsync<T>(commandName, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (Exception e)
            {
                throw new ApplicationException("BP Application Exception", e);
            } 
        }
        public virtual async Task<T> BaseGetByClave(string commandName, string clave)
        {
            T retValue;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "clave", clave}
                };

                retValue = await helper.CreateSingleEntityAsync<T>(commandName, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (Exception e)
            {
                throw new ApplicationException("BP Application Exception", e);
            }
        }
        public virtual async Task<T> GetById(int id)
        {
            return await BaseGetById(this.defaultSelect, id);
        }
        public virtual async Task<T> GetByClave(string clave)
        {
            return await BaseGetByClave(this.defaultSelect, clave);
        }
        public virtual async Task<List<T>> BaseGetAll(string commandName, Dictionary<string, object> p)
        {
            List<T> retValue;

            try
            {
                retValue = await helper.CreateEntitiesAsync<T>(commandName, CommandType.StoredProcedure, p);

                return retValue;
            }
            catch (Exception e)
            {
                throw new ApplicationException("BP Application Exception", e);
            }
        }
        public virtual async Task<List<T>> GetAll(Dictionary<string, object> parametros) {
            return await BaseGetAll(this.defaultSelect, parametros);
        }
        protected virtual async Task<object[]> BaseExport(string commandName, Dictionary<string, object> p)
        {
            object[] retValue;

            try
            {
                retValue = await helper.CreateEntitiesAsync(commandName, CommandType.StoredProcedure, p);

                return retValue;
            }
            catch (Exception e)
            {
                throw new ApplicationException("BP Application Exception", e);
            }
        }
        public virtual async Task<object[]> Export(Dictionary<string, object> parametros)
        {
            return await BaseExport(this.defaultSelect, parametros);
        }
        protected virtual async Task<object[]> BaseSearch(string commandName, string p)
        {
            object[] retValue;

            try
            {
                var parameters = new Dictionary<string, object>()
                {
                    { "search", p }
                };
                retValue = await helper.CreateEntitiesAsync(commandName, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (Exception e)
            {
                throw new ApplicationException("BP Application Exception", e);
            }
        }
        protected virtual async Task<object[]> BaseSearch(string commandName, Dictionary<string, object> parametros)
        {
            object[] retValue;

            try
            {
                retValue = await helper.CreateEntitiesAsync(commandName, CommandType.StoredProcedure, parametros);

                return retValue;
            }
            catch (Exception e)
            {
                throw new ApplicationException("BP Application Exception", e);
            }
        }
        public virtual async Task<object[]> Search(string criteria)
        {
            return await BaseSearch(this.defaultSelect, criteria);
        }

        public virtual async Task<object[]> Search(Dictionary<string, object> parametros) {
            return await BaseSearch(this.defaultSelect, parametros);
        }
        protected virtual async Task<T> BaseSave(string commandName, Dictionary<string, object> p) {
            T retValue = null;

            try
            {
                retValue = await helper.CreateSingleEntityAsync<T>(commandName, CommandType.StoredProcedure, p);

                return retValue;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("", ex);
            }
        }
        public virtual async Task<T> Save(T model)
        {
            if (string.IsNullOrEmpty(this.defaultSave))
            {
                return await this.SaveEntity(model, true, true);
            }
            else
            {
                return await BaseSave(this.defaultSave, new Dictionary<string, object>());
            }
        }
        public override async Task<int> Delete(int id)
        {
            return await DeleteEntity(id, IDName, base.entityName);
        }
        protected override async Task<int> DeleteEntity(int id, string idName, string entityName) {
            return await DeleteEntity(id, idName, entityName, true);
        }
        protected override async Task<int> DeleteEntity(int id, string idName, string entityName, bool updateIfNoDelete)
        {
            int retValue = -1;
            try
            {
                var parameters = new Dictionary<string, object> {
                    { "ID", id },
                    { "idName", idName},
                    { "entityName", entityName},
                    { "update", updateIfNoDelete}
                };

                retValue = await helper.GetResultAsync(USP_ALL_DELETE, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<R> SaveEntity<R>(R model) where R : class {
            return await this.SaveEntity(model, true);
        }
        public async Task<R> SaveEntity<R>(R model, bool refresh) where R : class {
            return await this.SaveEntity(model, refresh, false);
        }
        public async Task<R> SaveEntity<R>(R model, bool refresh, bool allProps) where R: class
        {
            R retValue = default(R);

            try
            {
                if (model != null)
                {
                    var configuration = DAOSingleton.Instance.GetTypeConfiguration(model, allProps);

                    var result = await helper.GetResultAsync(configuration.Query, CommandType.Text, configuration.PropParameters);

                    if (refresh)
                    {
                        retValue = await this.GetById(result) as R;
                    }
                    else {
                        retValue = model;
                        if (retValue != null) {
                            (retValue as dynamic).ID = result;
                        }
                    }

                    return retValue;
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al actualizar el registro.", ex);
            }

            return null;
        }
        public async Task<R> SaveEntity<R>(R model, bool refresh, bool allProps, List<string> excludedFields = null) where R : class
        {
            R retValue = default(R);

            try
            {
                if (model != null)
                {
                    var configuration = excludedFields != null ? DAOSingleton.Instance.GetTypeConfiguration(model, allProps, excludedFields) : DAOSingleton.Instance.GetTypeConfiguration(model, allProps, excludedFields);

                    var result = await helper.GetResultAsync(configuration.Query, CommandType.Text, configuration.PropParameters);

                    if (refresh)
                    {
                        retValue = await this.GetById(result) as R;
                    }
                    else
                    {
                        retValue = model;
                        if (retValue != null)
                        {
                            (retValue as dynamic).ID = result;
                        }
                    }

                    return retValue;
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al actualizar el registro.", ex);
            }

            return null;
        }
        private string getOperador(string operador) {
            string retValue = "";

            if (operador == "EQ") {
                retValue = "=";
            }
            else if (operador == "NE")
            {
                retValue = "<>";
            }
            else if (operador == "GT")
            {
                retValue = ">";
            }
            else if (operador == "LT")
            {
                retValue = "<";
            }
            else if (operador == "GTE")
            {
                retValue = ">=";
            }
            else if (operador == "LTE")
            {
                retValue = "<=";
            }

            return retValue;
        }
        private string getOperadorLogico(string operador) {
            return operador;
        }
        public async Task<object[]> Select(m.Kontrol.Interfaces.IQuery query)
        {
            var parameters = new Dictionary<string, object>();
            var selectSB = new StringBuilder();
            var select = query.Select;
            var filters = query.Where;
            var firstElement = true;
            selectSB.Append("SELECT\r\n");
            //
            foreach (var t in select) {
                foreach (var c in t.Fields) {
                    if (!firstElement) {
                        selectSB.Append(",");
                    }

                    selectSB.AppendFormat("{0}.{1} AS [{2}]\r\n", t.Clave, c.Nombre, c.Clave);

                    if (firstElement) {
                        firstElement = false;
                    }
                }
            }
            //
            foreach (var t in select)
            {
                if (t.LeftTable == null)
                {
                    selectSB.AppendFormat("FROM {0} AS {1}\r\n", t.Nombre, t.Clave);
                }
                else
                {
                    string joinType = null;
                    if (t.LeftTable.JoinType == m.Kontrol.Interfaces.TableJoinTypeEnum.InnerJoin)
                    {
                        joinType = "INNER JOIN";
                    }
                    else if (t.LeftTable.JoinType == m.Kontrol.Interfaces.TableJoinTypeEnum.LeftJoin)
                    {
                        joinType = "LEFT JOIN";
                    }
                    selectSB.AppendFormat("{0} {1} AS {2} ON {3}.[{4}] = {5}.ID \r\n", joinType, t.Nombre, t.Clave, t.LeftTable.Table.Clave, t.LeftTable.Field.Clave, t.Clave);
                }
            }
            //
            if (filters != null && filters.Count > 0)
            {
                firstElement = true;
                selectSB.Append("\r\n WHERE \r\n");
                foreach (var f in filters)
                {
                    if (!firstElement)
                    {
                        selectSB.AppendFormat(" {0} ", this.getOperadorLogico(f.OperadorLogico));
                    }
                    selectSB.AppendFormat("{0}.{1} {2} @{0}_{1}", f.Table.Clave, f.Nombre, this.getOperador(f.Operador));
                    //
                    parameters.Add($"{f.Table.Clave}_{f.Nombre}", f.Value);
                    //
                    firstElement = false;
                }
            }
            object[] retValue;
            try
            {
                retValue = await helper.CreateEntitiesAsync(selectSB.ToString(), CommandType.Text, parameters);

                return retValue;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

    internal class DynamicEntityData {
        public string TableName { get; set; }
        public Dictionary<string, string> PropsToFields { get; set; }
        public Dictionary<string, string> MapProps { get; set; }
        public string Query { get; set; }
    }

    internal class DynamicEntityDataReturn
    {
        public string Query { get; set; }
        public Dictionary<string, object> PropParameters { get; set; }
        public Dictionary<string, string> MapProps { get; set; }
    }

    internal class DAOSingleton {
        private static readonly Lazy<DAOSingleton> singleton = new Lazy<DAOSingleton>(() => new DAOSingleton(), System.Threading.LazyThreadSafetyMode.PublicationOnly);
        private Dictionary<string, DynamicEntityData> configuration;

        private DAOSingleton() {
            this.configuration = new Dictionary<string, DynamicEntityData>();
        }

        public static DAOSingleton Instance {
            get {
                return DAOSingleton.singleton.Value;
            }
        }

        private DynamicEntityData getConfigurationModelData(object model) {
            DynamicEntityData retValue = null;

            var modelType = model.GetType();
            var modelTypeName = modelType.FullName;

            if (this.configuration.ContainsKey(modelTypeName))
            {
                retValue = this.configuration[modelTypeName];
            }
            else
            {
                string tableName = null;

                Dictionary<string, string> fieldBaseList = new Dictionary<string, string>();
                Dictionary<string, string> mapBaseList = new Dictionary<string, string>();

                foreach (var iModelType in modelType.GetInterfaces())
                {
                    foreach (var ta in iModelType.GetCustomAttributes())
                    {
                        if (ta.TypeId.ToString() == "EK.Table")
                        {
                            tableName = ta.ToString();

                            break;
                        }
                    }

                    foreach (var f in iModelType.GetProperties())
                    {
                        foreach (dynamic ca in f.GetCustomAttributes())
                        {
                            if (ca.TypeId.ToString() == "EK.Column")
                            {
                                var fieldName = ca.ToString();
                                if (string.IsNullOrEmpty(fieldName)) {
                                    fieldName = f.Name;
                                }
                                if (ca.Exclude)
                                {
                                    if (fieldBaseList.ContainsKey(f.Name))
                                    {
                                        fieldBaseList.Remove(f.Name);
                                    }
                                }
                                else {
                                    if (!fieldBaseList.ContainsKey(f.Name))
                                    {
                                        fieldBaseList.Add(f.Name, fieldName);
                                    }
                                    else {
                                        fieldBaseList[f.Name] = fieldName;
                                    }
                                }
                            }
                            else if (ca.TypeId.ToString() == "EK.MapID")
                            {
                                var propName = ca.ToString();
                                if (string.IsNullOrEmpty(propName))
                                {
                                    propName = f.Name;
                                }
                                if (!mapBaseList.ContainsKey(f.Name))
                                {
                                    mapBaseList.Add(f.Name, propName);
                                }
                            }
                        }
                    }
                }

                retValue = new DynamicEntityData();
                retValue.TableName = tableName;
                retValue.PropsToFields = fieldBaseList;
                retValue.MapProps = mapBaseList;
            }

            return retValue;
        }

        private Dictionary<string, object> getPropParameters(object model, bool changesOnly, List<string> excludedFields) {
            var retValue = new Dictionary<string, object>();
            var configuration = this.getConfigurationModelData(model);
            var modelType = model.GetType();
            var configProps = configuration.PropsToFields;

            Func<string, object> getValue = (string p) =>
            {
                object fnRetValue = modelType.InvokeMember(p, BindingFlags.GetProperty, null, model, null);

                if (fnRetValue != null && fnRetValue.GetType() == typeof(string) && string.IsNullOrEmpty((string)fnRetValue))
                {
                    fnRetValue = DBNull.Value;
                }

                return fnRetValue ?? DBNull.Value;
            };

            if (!changesOnly)
            {
                foreach (var p in configProps)
                {
                    if (!excludedFields.Contains(p.Key))
                    {
                        retValue.Add(p.Value, getValue(p.Key));
                    }
                }
            }
            else {
                var props = ((EK.Modelo.Kontrol.Interfaces.IBaseKontrol)model).GetChanges();
                foreach (var p in props) {
                    if (!excludedFields.Contains(p) && configProps.ContainsKey(p))
                    {
                        retValue.Add(configProps[p], getValue(p));
                    }
                }
            }

            return retValue;
        }

        private string createInsertStatement(object model, List<string> excludedFields)
        {
            var modelType = model.GetType();
            var configuration = this.getConfigurationModelData(model);
            var props = configuration.PropsToFields;
            int i = 0;

            StringBuilder retValue = new StringBuilder();
            retValue.Append($"INSERT INTO {configuration.TableName} (");
            foreach (var f in props)
            {
                if (!excludedFields.Contains(f.Value))
                {
                    if (i > 0)
                    {
                        retValue.Append(", ");
                    }
                    retValue.Append(f.Value);
                    i++;
                }
            }
            retValue.Append(") VALUES (");
            i = 0;
            foreach (var f in props)
            {
                if (!excludedFields.Contains(f.Value))
                {
                    if (i > 0)
                    {
                        retValue.Append(",");
                    }
#if SYBASE17
                    retValue.Append($":{f.Value}");
#endif
#if MSSQL
                    retValue.Append($"@{f.Value}");
#endif
                    i++;
                }
            }
#if SYBASE17
            retValue.Append("); SELECT ID = @@identity;");
#endif
#if MSSQL
              retValue.Append("); SELECT ID = SCOPE_IDENTITY();");
#endif
            configuration.Query = retValue.ToString();

            return retValue.ToString();
        }
        private string createUpdateStatement(object model, List<string> excludedFields, bool allProperties)
        {
            var modelType = model.GetType();
            var baseKontrol = (EK.Modelo.Kontrol.Interfaces.IBaseKontrol)model;
            var configuration = this.getConfigurationModelData(model);
            var props = configuration.PropsToFields;
            var idFieldName = props["ID"];
            //
            int i = 0; 
            List<string> propChanged;
            if (allProperties)
            {
                propChanged = props.Select(k => k.Key).ToList();
            }
            else {
                propChanged = ((EK.Modelo.Kontrol.Interfaces.IBaseKontrol)model).GetChanges();
            }

            StringBuilder retValue = new StringBuilder();

#if MSSQL
            retValue.Append($@"
            DECLARE @current NVARCHAR(25);
            SET @current = (SELECT dbo.ufn_getVersion(RV) FROM {configuration.TableName} WITH (NOLOCK) WHERE {idFieldName} = @{idFieldName});
            IF @Version <> @current BEGIN
	            THROW 51000, 'You are trying to modify a previous version of the record', 1;  
            END;
            ");
            retValue.Append($"UPDATE {configuration.TableName} SET ");
            foreach (var f in propChanged)
            {
                if (!excludedFields.Contains(f) && props.ContainsKey(f))
                {
                    if (i > 0)
                    {
                        retValue.Append(", ");
                    }
                    var field = props[f];
                    retValue.Append($"{field}=@{field}");
                    i++;
                }
            }
            retValue.Append($" WHERE {idFieldName}=@{idFieldName};");
            retValue.Append($" SELECT {idFieldName} = @{idFieldName};");
#endif
#if SYBASE17
            retValue.Append($@"  DECLARE @current CHAR(25) 
            SET @current = (SELECT ufn_getVersion(RV) FROM  {configuration.TableName} 
                              WITH(NOLOCK) WHERE {idFieldName} = {baseKontrol.ID.Value}) 
            if {baseKontrol.Version} <> @current BEGIN 
                select  'You are trying to modify a previous version of the record ' 
                return 
            END ");

            retValue.Append($"UPDATE {configuration.TableName} SET ");
            foreach (var f in propChanged)
            {
                if (!excludedFields.Contains(f) && props.ContainsKey(f))
                {
                    if (i > 0)
                    {
                        retValue.Append(", ");
                    }
                    var field = props[f];
                    retValue.Append($"{field}=:{field}");
                    i++;
                }
            }
            retValue.Append($" WHERE {idFieldName}={baseKontrol.ID.Value}");
            retValue.Append($" SELECT {idFieldName} = {baseKontrol.ID.Value}");
#endif
            return retValue.ToString();
        }

        //public void GetChildConfiguration(object model, object parent) {

        //    var childConfig = GetTypeConfiguration(model);
        //}

        public DynamicEntityDataReturn GetTypeConfiguration(object model, bool allProperties, List<string> excluded = null) {
            var retValue = new DynamicEntityDataReturn();
            var baseKontrol = (EK.Modelo.Kontrol.Interfaces.IBaseKontrol) model;

            
            if (baseKontrol.Estado == Modelo.Kontrol.KontrolEstadosEnum.Nuevo)
            {
                var excludedFields = new List<string>() { "ID", "Version" };
                if(excluded != null)
                {
                    foreach(var ex in excluded)
                    {
                        excludedFields.Add(ex);
                    }
                }
                retValue.PropParameters = this.getPropParameters(model, false, excludedFields);
                retValue.Query = this.createInsertStatement(model, excludedFields);
            }
            else {
                var excludedFields = new List<string>() { "ID", "Version", "Creado", "IdCreadoPor", "CreadoPor" };

                retValue.PropParameters = this.getPropParameters(model, !allProperties, excludedFields);
                retValue.PropParameters.Add("ID", baseKontrol.ID);
                retValue.PropParameters.Add("Version", baseKontrol.Version);
                retValue.Query = this.createUpdateStatement(model, excludedFields, allProperties);
            }
            
            return retValue;
        }
    }
}
