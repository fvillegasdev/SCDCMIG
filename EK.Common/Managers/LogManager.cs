using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Threading.Tasks;

using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage.Queue;

using EK.Common.Utils;

namespace EK.Common.Managers
{
    public class LogManager
    {
        public static ElasticEntity GetEntity()
        {
            return new ElasticEntity();
        }

        public static void AddEntity(string tableName, Dictionary<string, object> entity)
        {
            var elasticEntity = new ElasticEntity(entity);

            AddEntity(tableName, elasticEntity);
        }

        public static void AddEntity(string tableName, ElasticEntity entity)
        {
            if (string.IsNullOrEmpty(entity.RowKey))
            {
                entity.RowKey = DateTime.Now.ToUniversalTime().ToString("yyyy-MM-dd HH:mm:ss");
            }

            var table = createTable(tableName);
            var tableAction = TableOperation.Insert(entity);

            var result = table.Execute(tableAction);
        }

        public static List<Dictionary<string, object>> Query(string tableName, int top)
        {
            var table = createTable(tableName);
            var tableQuery = new TableQuery().Take(top);
            var result = table.ExecuteQuery(tableQuery);

            var retValue = new List<Dictionary<string, object>>();
            foreach (var r in result)
            {
                retValue.Add(convertToDictionary(r));
            }

            return retValue;
        }

        public static List<Dictionary<string, object>> Query(string tableName, string filter, int top)
        {
            var table = createTable(tableName);
            var tableQuery = new TableQuery().Where(filter).Take(top);
            var result = table.ExecuteQuery(tableQuery);

            var retValue = new List<Dictionary<string, object>>();
            foreach (var r in result)
            {
                retValue.Add(convertToDictionary(r));
            }

            return retValue;
        }

        public static List<Dictionary<string, object>> Query(string tableName, List<string> columns, string filter, int top)
        {
            var table = createTable(tableName);
            var tableQuery = new TableQuery().Where(filter).Select(columns).Take(top);
            var result = table.ExecuteQuery(tableQuery);

            var retValue = new List<Dictionary<string, object>>();
            foreach (var r in result)
            {
                retValue.Add(convertToDictionary(r));
            }

            return retValue;
        }

        public static List<Dictionary<string, object>> GetHistory(string tableName, string columns, string filter, int top)
        {
            /*
             To query the history, some fields are mandatory 
             */
            var columnNames = columns.Split(",".ToCharArray());
            var columnNamesList = new List<string>();

            columnNamesList.Add("Timestamp");
            columnNamesList.Add("RecordType");
            columnNamesList.Add("Creado");
            columnNamesList.Add("CreadoPor");
            columnNamesList.Add("CreadoPorNombre");
            columnNamesList.Add("Modificado");
            columnNamesList.Add("ModificadoPor");
            columnNamesList.Add("ModificadoPorNombre");
            columnNamesList.Add("RV");
            foreach (var columnName in columnNames)
            {
                if (!string.IsNullOrEmpty(columnName))
                {
                    columnNamesList.Add(columnName.Trim());
                }
            }

            return Query(tableName, columnNamesList, filter, top);
        }

        public static List<Dictionary<string, object>> Query(string tableName, string partitionKey, string rowKey)
        {
            var table = createTable(tableName);
            var query = TableQuery.CombineFilters(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, partitionKey),
                TableOperators.And,
                TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.GreaterThanOrEqual, rowKey)
                );

            var tableQuery = new TableQuery().Where(query);
            var result = table.ExecuteQuery(tableQuery);

            var retValue = new List<Dictionary<string, object>>();
            foreach (var r in result)
            {
                retValue.Add(convertToDictionary(r));
            }

            return retValue;
        }

        public static void AddQueue(string queueName, ElasticEntity entity)
        {
            var entityData = Newtonsoft.Json.JsonConvert.SerializeObject(entity);
            if (string.IsNullOrEmpty(entity.RowKey))
            {
                entity.RowKey = DateTime.Now.Ticks.ToString();
            }

            var queue = createQueue(queueName);
            var message = new CloudQueueMessage(entityData);

            queue.AddMessage(message);
        }

        private static CloudTable createTable(string tableName)
        {
            //var storageAccount = createStorageAccountFromConnectionString(CloudConfigurationManager.GetSetting("ek:StorageTableKey"));
            dynamic storageAccount = null;
            var tableClient = storageAccount.CreateCloudTableClient();

            //var accountSAS = new StorageCredentials(storageToken);
            //var container = new CloudTableClient(storageUri, accountSAS);

            CloudTable table = tableClient.GetTableReference(tableName);
            try
            {
                table.CreateIfNotExists();
            }
            catch (StorageException)
            {
                throw;
            }

            return table;
        }

        private static CloudQueue createQueue(string queueName)
        {
            dynamic storageAccount = null;
            //var storageAccount = createStorageAccountFromConnectionString(CloudConfigurationManager.GetSetting("storage:data"));
            var queueClient = storageAccount.CreateCloudQueueClient();

            var queue = queueClient.GetQueueReference(queueName);
            try
            {
                queue.CreateIfNotExists();
            }
            catch (StorageException)
            {
                throw;
            }

            return queue;
        }

        private static CloudStorageAccount createStorageAccountFromConnectionString(string storageConnectionString)
        {
            CloudStorageAccount storageAccount;
            try
            {
                storageAccount = CloudStorageAccount.Parse(storageConnectionString);
            }
            catch (FormatException)
            {
                throw;
            }
            catch (ArgumentException)
            {
                throw;
            }

            return storageAccount;
        }

        private static Dictionary<string, object> convertToDictionary(DynamicTableEntity entity)
        {
            var retValue = new Dictionary<string, object>();

            retValue.Add("PartitionKey", entity.PartitionKey);
            retValue.Add("RowKey", entity.RowKey);
            retValue.Add("Timestamp", entity.Timestamp);
            foreach (var item in entity.Properties)
            {
                retValue.Add(item.Key, item.Value.PropertyAsObject);
            }

            return retValue;
        }
    }
}
