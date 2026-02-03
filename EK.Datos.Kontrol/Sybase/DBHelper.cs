using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Odbc;
using System.Dynamic;
using System.Linq;

using mKontrol = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.Sybase
{
    public class DBHelper
        //: Interfaces.IDBHelper, IDisposable
    {
        private bool isTransactionActive;
        private mKontrol.IContainerFactory factory;
        private OdbcConnection ekConnection;
        private OdbcTransaction ekTransaction;

        private const string CLAVE_COMPANIA_KEY = "idCompania";
        private string ekConnectionString = ConfigurationManager.ConnectionStrings["sybase:cs"].ConnectionString;

        public DBHelper(mKontrol.IContainerFactory factory)
        {
            this.isTransactionActive = false;
            this.factory = factory;
        }

        #region Transaction Methods
        public T GetDAO<T>() where T : class, EK.Datos.Kontrol.Interfaces.IDAOBase
        {
            T dao = this.factory.GetInstance<T>();
            //dao.Helper = this;

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

            ekConnection = new OdbcConnection(ekConnectionString);
            try
            {
                ekConnection.Open();
            }
            catch {
                throw;
                //throw new ApplicationException(ekConnectionString, ex);
            }
        }

        private OdbcCommand getCommand(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            OdbcCommand retValue = new OdbcCommand();

            if (ekConnection == null)
            {
                this.createConnection();
            }

            retValue = new OdbcCommand(sql, ekConnection);
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
            var properties = instanceType.GetProperties().ToDictionary(p => p.Name);

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
            }

            return retValue;
        }

        public List<T> CreateEntities<T>(IDataReader reader) where T : class
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

                    retValue.Add(instance);
                }
            }

            return retValue;
        }

        public T CreateSingleEntity<T>(string sql) where T : class
        {
            return this.CreateSingleEntity<T>(sql, CommandType.Text);
        }

        public T CreateSingleEntity<T>(string sql, CommandType commandType) where T : class
        {
            return this.CreateSingleEntity<T>(sql, commandType, null);
        }

        public T CreateSingleEntity<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class
        {
            var retValue = this.CreateEntities<T>(sql, commandType, parameters);

            return (retValue != null && retValue.Count > 0) ? retValue.Single() : null;
        }

        public object CreateSingleEntity(string sql)
        {
            return this.CreateSingleEntity(sql, CommandType.Text);
        }

        public object CreateSingleEntity(string sql, CommandType commandType)
        {
            return this.CreateSingleEntity(sql, commandType, null);
        }

        public object CreateSingleEntity(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            var retValue = this.CreateEntities(sql, commandType, parameters);

            return (retValue != null && retValue.Length > 0) ? retValue[0] : null;
        }

        public List<T> CreateEntities<T>(string sql) where T : class
        {
            return this.CreateEntities<T>(sql, CommandType.Text);
        }

        public List<T> CreateEntities<T>(string sql, CommandType commandType) where T : class
        {
            return this.CreateEntities<T>(sql, commandType, null);
        }

        public List<T> CreateEntities<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class
        {
            List<T> retValue = null;
            OdbcDataReader reader = null;
            try
            {
                var command = this.getCommand(sql, commandType, parameters);
                reader = command.ExecuteReader();

                retValue = this.CreateEntities<T>(reader);

                reader.Close();
            }
            catch
            {
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw;
            }
            finally
            {
                releaseConnectionIfNeeded();
            }

            return retValue;
        }

        private void releaseConnectionIfNeeded()
        {
            if (!this.isTransactionActive)
            {
                if (this.ekConnection != null)
                {
                    this.ekConnection.Dispose();
                    this.ekConnection = null;
                }
            }
        }

        #region DynamicObjects

        public object[] CreateEntities(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            object[] retValue;
            OdbcDataReader reader = null;

            try
            {
                var command = this.getCommand(sql, commandType, parameters);
                reader = command.ExecuteReader();

                retValue = this.CreateEntities(reader);

                reader.Close();
            }
            catch
            {
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;


                throw;
            }
            finally
            {
                releaseConnectionIfNeeded();
            }

            return retValue;
        }

        public object[] CreateEntities(System.Data.IDataReader reader)
        {
            dynamic retValue = new List<ExpandoObject>();
            if (reader != null)
            {
                int x = 0;
                while (reader.Read())
                {
                    dynamic obj = new ExpandoObject();
                    var dictionary = (IDictionary<string, object>)obj;
                    var listaParent = new Dictionary<string, ExpandoObject>();

                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        var propName = reader.GetName(i);
                        var valueProp = getEntityValue(reader.GetFieldType(i), reader.GetValue(i));

                        if (propName.Split('.').Length > 1)
                        {
                            var objParent = new ExpandoObject();
                            var dictionaryParent = (IDictionary<string, object>)objParent;
                            if (!listaParent.ContainsKey(propName.Split('.')[0]))
                            {
                                dictionaryParent.Add(propName.Split('.')[1], valueProp);
                                listaParent.Add(propName.Split('.')[0], objParent);
                            }
                            else
                            {
                                if ((listaParent.TryGetValue(propName.Split('.')[0], out objParent)))
                                {
                                    dictionaryParent = (IDictionary<string, object>)objParent;
                                    dictionaryParent.Add(propName.Split('.')[1], valueProp);
                                }
                                listaParent[propName.Split('.')[0]] = objParent;
                            }
                        }
                        else
                        {
                            dictionary.Add(propName, valueProp);
                        }
                    }
                    foreach (var item in listaParent)
                    {
                        dictionary.Add(item.Key, item.Value);
                    }
                    retValue.Add(obj);
                    x++;
                }
            }
            return retValue.ToArray();
        }

        public int GetResult(string sql, CommandType commandType, Dictionary<string, object> parameters)
        {
            int retValue = 0;
            OdbcDataReader reader = null;
            try
            {
                var command = this.getCommand(sql, commandType, parameters);
                reader = command.ExecuteReader();

                if (reader != null)
                {
                    while (reader.Read())
                    {
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            retValue = (int)getEntityValue(reader.GetFieldType(i), reader.GetValue(i));
                        }
                    }
                }
                reader.Close();
                return retValue;
            }
            catch
            {
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
                reader = null;

                throw;
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

                    if (this.ekConnection != null)
                    {
                        this.ekConnection.Dispose();
                        this.ekConnection = null;
                    }
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