using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

using EK.Drivers.Log;

using mKontrol = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.MSSQL
{
    public class DBHelper
        : Interfaces.IDBHelper, IDisposable
    {
        private mKontrol.IContainerFactory factory;
        private SqlConnection ekConnection;
        private const string CLAVE_COMPANIA_KEY = "idCompania";
        private string ekConnectionString = ConfigurationManager.ConnectionStrings["mssql:cs"].ConnectionString;
        private SqlTransaction ekTransaction;
        private long time;

        public DBHelper(mKontrol.IContainerFactory factory)
        {
            this.factory = factory;
            this.time = DateTime.UtcNow.Ticks;
        }

        #region Transaction Methods
        public T GetDAO<T>() where T : class, EK.Datos.Kontrol.Interfaces.IDAOBase
        {
            T dao = this.factory.GetInstance<T>();
            dao.Helper = this;

            return dao;
        }

        public void BeginTransaction()
        {
            if (this.ekConnection == null)
            {
                this.createConnection();
            }

            if (this.ekTransaction == null)
            {
                this.ekTransaction = this.ekConnection.BeginTransaction();
            }
        }

        public void Commit()
        {
            if (this.ekTransaction != null)
            {
                try
                {
                    this.ekTransaction.Commit();
                    this.releaseTransaction();
                }
                catch
                {
                    throw;
                }
            }
            else {
                this.closeConnection();
            }
        }

        public void Rollback()
        {
            if (this.ekTransaction != null)
            {
                try
                {
                    this.ekTransaction.Rollback();
                    this.releaseTransaction();
                }
                catch
                {
                    throw;
                }
            }
            else {
                this.closeConnection();
            }
        }

        public long TimeStamp
        {
            get
            {
                return this.time;
            }
        }

        public bool IsInTransaction {
            get {
                return this.ekTransaction != null;
            }
        }

        public bool HasConnection
        {
            get
            {
                return this.ekConnection != null;
            }
        }
        #endregion

        public Dictionary<string, object> CreateParameters()
        {
            return new Dictionary<string, object>();
        }

        public Dictionary<string, object> CreateParameters(int idCompany)
        {
            var retValue = new Dictionary<string, object>();
            retValue.Add(CLAVE_COMPANIA_KEY, idCompany);

            return retValue;
        }

        private void createConnection()
        {
            if (this.ekConnection != null) return;

            ekConnection = new SqlConnection(ekConnectionString);

            try
            {
                ekConnection.Open();
            }
            catch
            {
                throw;
            }
        }

        private void closeConnection() {
            if (this.ekConnection != null) {
                try
                {
                    this.ekConnection.Close();
                }
                catch { }
                finally {
                    this.ekConnection.Dispose();
                    this.ekConnection = null;
                }
            }
        }

        private async Task createConnectionAsync()
        {
            if (this.ekConnection != null) return;

            ekConnection = new SqlConnection(ekConnectionString);

            try
            {
                await ekConnection.OpenAsync();
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        private SqlCommand getCommand(string sql, CommandType commandType, Dictionary<string, object> parameters) {
            if (ekConnection == null)
            {
                this.createConnection();
            }

            return this.configureCommand(sql, commandType, parameters);
        }

        private async Task<SqlCommand> getCommandAsync(string sql, CommandType commandType, Dictionary<string, object> parameters) {
            if (ekConnection == null)
            {
                await this.createConnectionAsync();
            }

            return this.configureCommand(sql, commandType, parameters);
        }

        private SqlCommand configureCommand(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            SqlCommand retValue = new SqlCommand();

            retValue = new SqlCommand(sql, ekConnection);
            if (this.ekTransaction != null)
            {
                retValue.Transaction = this.ekTransaction;
            }
            retValue.CommandType = commandType;

            if (parameters != null && parameters.Count > 0)
            {
                foreach (var p in parameters)
                {
                    retValue.Parameters.AddWithValue("@" + p.Key, p.Value);
                }
            }

            return retValue;
        }

        private void setValue(object instance, object value, string propName)
        {
            if (instance == null) return;

            var instanceType = instance.GetType();
            Dictionary<string, System.Reflection.PropertyInfo> properties = new Dictionary<string, System.Reflection.PropertyInfo>();

            foreach (var p in instanceType.GetProperties()) {
                if (!properties.ContainsKey(p.Name)) {
                    properties.Add(p.Name, p);
                }
            }

            if (properties.ContainsKey(propName))
            {
                properties[propName].SetMethod.Invoke(
                    instance,
                    new object[] {
                        this.getEntityValue(properties[propName].PropertyType, value)
                    });
            }
            else
            {
                var index = propName.IndexOf(".");
                if (index >= 0)
                {
                    var parentPropName = propName.Substring(0, index);
                    var newPropName = propName.Substring(index + 1);

                    if (properties.ContainsKey(parentPropName))
                    {
                        object parentProp = properties[parentPropName].GetMethod.Invoke(instance, null);

                        // if null create new instance
                        if (parentProp == null)
                        {
                            parentProp = this.factory.GetInstance(properties[parentPropName].PropertyType);
                            properties[parentPropName].SetMethod.Invoke(instance, new object[] { parentProp });
                        }

                        setValue(
                            parentProp,
                            value,
                            newPropName
                            );
                    }
                }
            }
        }

        private object getEntityValue(Type type, object value)
        {
            object retValue = null;

            if (value != null && !Convert.IsDBNull(value))
            {
                if (type == typeof(int) || type == typeof(int?))
                {
                    retValue = Convert.ToInt32(value);
                }
                else if (type == typeof(string))
                {
                    retValue = Convert.ToString(value);
                }
                else if (type == typeof(DateTime) || type == typeof(DateTime?))
                {
                    retValue = Convert.ToDateTime(value);
                }
                else if (type == typeof(bool) || type == typeof(bool?))
                {
                    retValue = Convert.ToBoolean(value);
                }
                else if (type == typeof(decimal) || type == typeof(decimal?))
                {
                    retValue = Convert.ToDecimal(value);
                }
                else {
                    retValue = value;
                }
            }

            return retValue;
        }

        private List<T> CreateEntities<T>(System.Data.IDataReader reader) where T : class
        {
            var retValue = new List<T>();
            var type = typeof(T);

            if (reader != null)
            {
                var fieldNames = new Dictionary<string, int>();

                for (var i = 0; i < reader.FieldCount; i++)
                {
                    fieldNames.Add(reader.GetName(i), i);
                }

                while (reader.Read())
                {
                    var instance = factory.GetInstance<T>();

                    foreach (var f in fieldNames)
                    {
                        this.setValue(
                            instance,
                            reader.GetValue(fieldNames[f.Key]),
                            f.Key);
                    }

                    var instanceBK = (EK.Modelo.Kontrol.Interfaces.IBaseKontrol)instance;
                    instanceBK.Estado = Modelo.Kontrol.KontrolEstadosEnum.SinCambios;
                    instanceBK.TrackChanges = true;

                    retValue.Add(instance);
                }
            }

            return retValue;
        }

        public T CreateSingleEntity<T>(string sql) where T : class
        {
            return this.CreateSingleEntity<T>(sql, CommandType.Text);
        }

        public async Task<T> CreateSingleEntityAsync<T>(string sql) where T : class
        {
            return await this.CreateSingleEntityAsync<T>(sql, CommandType.Text);
        }

        public T CreateSingleEntity<T>(string sql, CommandType commandType) where T : class
        {
            return this.CreateSingleEntity<T>(sql, commandType, null);
        }

        public async Task<T> CreateSingleEntityAsync<T>(string sql, CommandType commandType) where T : class
        {
            return await this.CreateSingleEntityAsync<T>(sql, commandType, null);
        }

        public T CreateSingleEntity<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class
        {
            var retValue = this.CreateEntities<T>(sql, commandType, parameters);

            return (retValue != null && retValue.Count > 0) ? retValue.Single() : null;
        }

        public async Task<T> CreateSingleEntityAsync<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class
        {
            var retValue = await this.CreateEntitiesAsync<T>(sql, commandType, parameters);

            return (retValue != null && retValue.Count > 0) ? retValue.First() : null;
        }

        public object CreateSingleEntity(string sql)
        {
            return this.CreateSingleEntity(sql, CommandType.Text);
        }

        public async Task<object> CreateSingleEntityAsync(string sql)
        {
            return await this.CreateSingleEntityAsync(sql, CommandType.Text);
        }

        public object CreateSingleEntity(string sql, CommandType commandType)
        {
            return this.CreateSingleEntity(sql, commandType, null);
        }

        public async Task<object> CreateSingleEntityAsync(string sql, CommandType commandType)
        {
            return await this.CreateSingleEntityAsync(sql, commandType, null);
        }

        public object CreateSingleEntity(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            var retValue = this.CreateEntities(sql, commandType, parameters);

            return (retValue != null && retValue.Length > 0) ? retValue[0] : null;
        }
        public async Task<object> CreateSingleEntityAsync(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            var retValue = await this.CreateEntitiesAsync(sql, commandType, parameters);

            return (retValue != null && retValue.Length > 0) ? retValue[0] : null;
        }

        public List<T> CreateEntities<T>(string sql) where T : class
        {
            return this.CreateEntities<T>(sql, CommandType.Text);
        }

        public async Task<List<T>> CreateEntitiesAsync<T>(string sql) where T : class
        {
            return await this.CreateEntitiesAsync<T>(sql, CommandType.Text);
        }

        public List<T> CreateEntities<T>(string sql, CommandType commandType) where T : class
        {
            return this.CreateEntities<T>(sql, commandType, null);
        }

        public async Task<List<T>> CreateEntitiesAsync<T>(string sql, CommandType commandType) where T : class
        {
            return await this.CreateEntitiesAsync<T>(sql, commandType, null);
        }

        public List<T> CreateEntities<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class {
            List<T> retValue = null;
            SqlDataReader reader = null;
            try
            {
                var command = this.getCommand(sql, commandType, parameters);
                reader = command.ExecuteReader();

                retValue = this.CreateEntities<T>(reader);

                reader.Close();
            }
            catch (Exception ex)
            {
                Task.Run(async () => {
                    await this.Log(ex, "List<T> CreateEntities<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class", sql, parameters);
                });
                //
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw;
            }
            finally {
                if (this.ekTransaction == null) {
                    this.closeConnection();
                }
            }

            return retValue;
        }

        public async Task<List<T>> CreateEntitiesAsync<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class {
            List<T> retValue = null;
            SqlDataReader reader = null;
            try
            {
                var command = await this.getCommandAsync(sql, commandType, parameters);
                reader = await command.ExecuteReaderAsync();

                retValue = this.CreateEntities<T>(reader);

                reader.Close();
            }
            catch (Exception ex)
            {
                await this.Log(ex, "Task<List<T>> CreateEntitiesAsync<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class", sql, parameters);
                //
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw ex;
            }
            finally
            {
                if (this.ekTransaction == null)
                {
                    this.closeConnection();
                }
            }

            return retValue;
        }

        #region DynamicObjects

        public object[] CreateEntities(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            object[] retValue;
            SqlDataReader reader = null;
            try
            {
                var command = this.getCommand(sql, commandType, parameters);
                reader = command.ExecuteReader();

                retValue = this.CreateEntities(reader);

                reader.Close();
            }
            catch (Exception ex)
            {
                Task.Run(async () => {
                    await this.Log(ex, "object[] CreateEntities(string sql, CommandType commandType, Dictionary<string, object> parameters)", sql, parameters);
                });
                //
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw;
            }
            finally
            {
                if (this.ekTransaction == null)
                {
                    this.closeConnection();
                }
            }

            return retValue;
        }

        private async Task<object[]> readJSONDatareader(SqlDataReader reader) {
            var results = new List<object>();
            var result = new System.Text.StringBuilder();

            while (reader.Read()) {
                result.Append(reader.GetString(0));
            }

            if (await reader.NextResultAsync())
            {
                results = new List<object>
                    {
                        result.ToString()
                    };
                //
                result = new System.Text.StringBuilder();
                while (reader.Read())
                {
                    result.Append(reader.GetString(0));
                }
                results.Add(result.ToString());
                //
                while (await reader.NextResultAsync())
                {
                    result = new System.Text.StringBuilder();
                    while (reader.Read())
                    {
                        result.Append(reader.GetString(0));
                    }
                    results.Add(result.ToString());
                }
                //
                return results.ToArray();
            }
            else
            {
                return new object[] { result.ToString() };
            }
        }

        public async Task<object[]> CreateEntitiesAsync(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            List<object> results;
            object[] retValue;
            object[] result;
            SqlDataReader reader = null;
            try
            {
                var command = await this.getCommandAsync(sql, commandType, parameters);
                reader = await command.ExecuteReaderAsync();

                if (parameters != null && parameters.ContainsKey("json"))
                {
                    retValue = await this.readJSONDatareader(reader);
                }
                else
                {
                    //retValue = this.CreateEntities(reader);
                    result = this.CreateEntities(reader);

                    if (await reader.NextResultAsync())
                    {
                        results = new List<object>
                    {
                        result
                    };
                        //
                        result = this.CreateEntities(reader);
                        results.Add(result);
                        //
                        while (await reader.NextResultAsync())
                        {
                            result = this.CreateEntities(reader);
                            results.Add(result);
                        }
                        //
                        retValue = results.ToArray();
                    }
                    else
                    {
                        retValue = result;
                    }
                }

                reader.Close();
            }
            catch (Exception ex)
            {
                await this.Log(ex, "Task<object[]> CreateEntitiesAsync(string sql, CommandType commandType, Dictionary<string, object> parameters)", sql, parameters);
                //
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw ex;
            }
            finally
            {
                if (this.ekTransaction == null)
                {
                    this.closeConnection();
                }
            }

            return retValue;
        }


        public object[] CreateEntities(System.Data.IDataReader reader)
        {
            var retValue = new List<ExpandoObject>();

            if (reader != null)
            {
                int x = 0;
                while (reader.Read())
                {
                    IDictionary<string, object> obj = new ExpandoObject();

                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        var propName = reader.GetName(i);
                        var valueProp = getEntityValue(reader.GetFieldType(i), reader.GetValue(i));

                        if (propName.Contains("."))
                        {
                            Console.WriteLine(propName);
                            var propNameComp = propName.Split('.');
                            IDictionary<string, object> parent = obj; // listaParent;

                            for (int j = 0; j < propNameComp.Length; j++)
                            {
                                var p = propNameComp[j];

                                if (j == propNameComp.Length - 1)
                                {
                                    if (parent.ContainsKey(p))
                                    {
                                        parent[p] = valueProp;
                                    }
                                    else
                                    {
                                        parent.Add(p, valueProp);
                                    }
                                }
                                else
                                {
                                    if (!parent.ContainsKey(p))
                                    {
                                        parent.Add(p, new ExpandoObject());
                                        parent = (IDictionary<string, object>)parent[p];
                                    }
                                    else {
                                        parent = (IDictionary<string, object>)parent[p];
                                    }
                                }
                            }
                        }
                        else {
                            if (obj.ContainsKey(propName))
                            {
                                obj[propName] = valueProp;
                            }
                            else {
                                obj.Add(propName, valueProp);
                            }
                        }
                    }

                    retValue.Add((ExpandoObject) obj);
                    x++;
                }
            }
            return retValue.ToArray();
        }

        public int GetResult(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            int retValue = 0;
            SqlDataReader reader = null;
            try
            {
                var command = this.getCommand(sql, commandType, parameters);
                reader = command.ExecuteReader();

                if (reader != null) {
                    while (reader.Read()) {
                        for (int i = 0; i < reader.FieldCount; i++) {
                            retValue = (int)getEntityValue(reader.GetFieldType(i), reader.GetValue(i));
                        }
                    }
                }

                reader.Close();
                return retValue;
            }
            catch (Exception ex)
            {
                Task.Run(async () => {
                    await this.Log(ex, "int GetResult(string sql, CommandType commandType, Dictionary<string, object> parameters)", sql, parameters);
                });
                //
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw;
            }
            finally
            {
                if (this.ekTransaction == null)
                {
                    this.closeConnection();
                }
            }

        }

        public async Task<int> GetResultAsync(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            int retValue = 0;
            SqlDataReader reader = null;
            try
            {
                var command = await this.getCommandAsync(sql, commandType, parameters);
                reader = await command.ExecuteReaderAsync();

                if (reader != null)
                {
                    while (reader.Read())
                    {
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            retValue = Convert.ToInt32(reader.GetValue(i));
                        }
                    }
                }

                reader.Close();
                return retValue;
            }
            catch(Exception ex)
            {
                await this.Log(ex, "Task<int> GetResultAsync(string sql, CommandType commandType, Dictionary<string, object> parameters)", sql, parameters);
                //
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw new ApplicationException(ex.Message, ex);
            }
            finally
            {
                if (this.ekTransaction == null)
                {
                    this.closeConnection();
                }
            }
        }

        public async Task<string> GetResultStringAsync(string sql, CommandType commandType)
        {
            string retValue = "";
            SqlDataReader reader = null;
            //SADataReader reader = null;
            try
            {
                var command = await this.getCommandAsync(sql, commandType, null);
                reader = await command.ExecuteReaderAsync();

                if (reader != null)
                {
                    while (reader.Read())
                    {
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            var x = reader.GetValue(i);
                            retValue = reader.GetValue(i).ToString();
                        }
                    }
                }

                reader.Close();
                return retValue;
            }
            catch (Exception ex)
            {
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw new ApplicationException(ex.Message, ex);
            }
            finally
            {
                if (this.ekTransaction == null)
                {
                    this.closeConnection();
                }
            }
        }

        public async Task<string> GetResultStringAsync(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            string retValue = "";
            SqlDataReader reader = null;
            //SADataReader reader = null;
            try
            {
                var command = await this.getCommandAsync(sql, commandType, parameters);
                reader = await command.ExecuteReaderAsync();

                if (reader != null)
                {
                    while (reader.Read())
                    {
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            var x = reader.GetValue(i);
                            retValue = reader.GetValue(i).ToString();
                        }
                    }
                }

                reader.Close();
                return retValue;
            }
            catch (Exception ex)
            {
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw new ApplicationException(ex.Message, ex);
            }
            finally
            {
                if (this.ekTransaction == null)
                {
                    this.closeConnection();
                }
            }
        }

        protected async Task Log(Exception obj, string entityName, string sql, Dictionary<string, object> data)
        {
            try
            {
                dynamic entity = new ElasticEntity();
                entity.ID = obj.HResult;
                entity.Message = "##SQL##" + obj.Message;
                entity.StackTrace = obj.StackTrace;
                entity.SQL = sql;
                entity.Data = Newtonsoft.Json.JsonConvert.SerializeObject(data);

                /************************** ***********************/
                entity.RecordType = "dao";
                /************************** ***********************/

                entity.Creado = DateTime.UtcNow;
                entity.Modificado = DateTime.UtcNow;

                await this.factory.GetInstance<ILogger>().AddAsync(entityName, entity);
            }
            catch {
            }
        }
        #endregion DynamicObjects

        #region IDisposable Support

        private bool disposedValue = false; // To detect redundant calls

        private void releaseTransaction()
        {
            if (this.ekTransaction != null)
            {
                try
                {
                    if (this.ekTransaction != null)
                    {
                        this.ekTransaction.Dispose();
                    }
                    this.ekTransaction = null;
                    // close the connection
                    this.closeConnection();
                }
                catch
                {
                    throw;
                }
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    if (this.ekTransaction != null)
                    {
                        try
                        {
                            this.ekTransaction.Rollback();
                            this.releaseTransaction();
                        }
                        catch
                        {
                            throw;
                        }
                    }

                    this.closeConnection();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
        }

        #endregion IDisposable Support
    }
}