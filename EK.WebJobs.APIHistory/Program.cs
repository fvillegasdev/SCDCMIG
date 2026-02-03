using System;
using System.IO;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Xml;

using Microsoft.Azure;
using Microsoft.ServiceBus;
using Microsoft.ServiceBus.Messaging;

using EK.Common.Managers;

namespace EK.WebJobs.APIHistory
{
    class Program
    {
        static void Main(string[] args)
        {
            initAPIListener();
            initHistoryListener();

            Console.Read();

        }

        private static void initAPIListener() {
            string connectionString = CloudConfigurationManager.GetSetting("ek:ServiceBus$kontrolApi");

            SubscriptionClient client =
                SubscriptionClient.CreateFromConnectionString(connectionString, "kontrolapi", "all");

            // Configure the callback options.
            OnMessageOptions options = new OnMessageOptions();
            options.AutoComplete = false;
            options.AutoRenewTimeout = TimeSpan.FromMinutes(1);

            client.OnMessage((message) =>
            {
                try
                {
                    var bodyData = message.GetBody<Dictionary<string, object>>();

                    LogManager.AddEntity("KontrolApiLog", bodyData);

                    message.Complete();
                }
                catch (Exception)
                {
                    message.Abandon();
                    // log the exception
                }
            }, options);
        }

        private static void initHistoryListener()
        {
            string connectionString = CloudConfigurationManager.GetSetting("ek:ServiceBus$history");

            SubscriptionClient client =
                SubscriptionClient.CreateFromConnectionString(connectionString, "history", "all");

            // Configure the callback options.
            OnMessageOptions options = new OnMessageOptions();
            options.AutoComplete = false;
            options.AutoRenewTimeout = TimeSpan.FromMinutes(1);

            client.OnMessage((message) =>
            {
                try
                {
                    string tableName = "";
                    var d = message.GetBody<Dictionary<string, object>>();

                    // get modification date
                    DateTime fechaModificacion = DateTime.UtcNow;
                    if (d.ContainsKey("Modificado") && d["Modificado"] != null)
                    {
                        fechaModificacion = Convert.ToDateTime(d["Modificado"]);
                    }

                    // get modification user
                    string logUser = null;
                    if (d.ContainsKey("IdModificadoPor") && d["IdModificadoPor"] != null)
                    {
                        logUser = d["IdModificadoPor"].ToString();
                    }

                    var logType = message.Properties["type"].ToString();
                    var logEntity = message.Properties["entity"].ToString();
                    var logCliente = message.Properties["cliente"].ToString();

                    var rowKeyA = Convert.ToString(fechaModificacion.Ticks, 16);
                    var rowKeyD = Convert.ToString(~fechaModificacion.Ticks, 16);

                    // log entity history. 
                    tableName = string.Format("en000{0}", logEntity);                    
                    d["PartitionKey"] = string.Format("{0}", d["ID"]);
                    d["RowKey"] = rowKeyA;
                    LogManager.AddEntity(tableName, d);

                    tableName = string.Format("en100{0}", logEntity);
                    d["PartitionKey"] = rowKeyA;
                    d["RowKey"] = logUser;
                    LogManager.AddEntity(tableName, d);

                    tableName = string.Format("en200{0}", logEntity);
                    d["PartitionKey"] = rowKeyD;
                    d["RowKey"] = logUser;
                    LogManager.AddEntity(tableName, d);

                    // log user history. 
                    if (!string.IsNullOrEmpty(logUser))
                    {
                        tableName = string.Format("us000{0}", logUser);                        
                        d["PartitionKey"] = string.Format("{0}${1}", logEntity, d["ID"]);
                        d["RowKey"] = rowKeyD;
                        LogManager.AddEntity(tableName, d);

                        tableName = string.Format("us100{0}", logUser);
                        d["PartitionKey"] = rowKeyA;
                        d["RowKey"] = logEntity;
                        LogManager.AddEntity(tableName, d);

                        tableName = string.Format("us200{0}", logUser);
                        d["PartitionKey"] = rowKeyD;
                        d["RowKey"] = logEntity;
                        LogManager.AddEntity(tableName, d);
                    }

                    // log client history. 
                    tableName = string.Format("cl000{0}", logCliente);                    
                    d["PartitionKey"] = string.Format("{0}${1}", logEntity, d["ID"]);
                    d["RowKey"] = rowKeyD;
                    LogManager.AddEntity(tableName, d);

                    tableName = string.Format("cl100{0}", logCliente);
                    d["PartitionKey"] = rowKeyA;
                    d["RowKey"] = logEntity;
                    LogManager.AddEntity(tableName, d);

                    tableName = string.Format("cl200{0}", logCliente);
                    d["PartitionKey"] = rowKeyD;
                    d["RowKey"] = logEntity;
                    LogManager.AddEntity(tableName, d);

                    message.Complete();
                }
                catch (Exception)
                {
                    message.Abandon();
                    // log the exception
                }
            }, options);
        }
    }
}
