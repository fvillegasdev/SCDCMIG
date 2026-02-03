using System.Collections.Generic;

using Microsoft.Azure;
using Microsoft.ServiceBus;
using Microsoft.ServiceBus.Messaging;

using EK.Common.Utils;

namespace EK.Common.Managers
{
    public class ServiceBusManager
    {
        //string connectionString =
        //    CloudConfigurationManager.GetSetting("azure:servicebus");

        public static BrokeredMessage CreateMessage(Dictionary<string, object> message) {
            return new BrokeredMessage();
        }

        public static void Send(BrokeredMessage message)
        {
            var type = message.Properties["Type"].ToString();
            var connectionString = System.Configuration.ConfigurationManager.AppSettings["ek:ServiceBus"]; // "Endpoint =sb://ekservicebus.servicebus.windows.net/;SharedAccessKeyName=ek-policy;SharedAccessKey=UedHV0OKDXczfSGE8/JILEen8Tt69jbQ54eCvA9N2yM=;EntityPath=ek";
            var Client = TopicClient.CreateFromConnectionString(connectionString, type);

            Client.Send(message);
        }

        public static void Send(string topic, string subscriptionName, BrokeredMessage message) {
            //CreateSubscription("workflow", "requests", "workflows-new", "estatus='nuevo'");
            string connectionString = System.Configuration.ConfigurationManager.AppSettings["ek:ServiceBus"]; // "Endpoint =sb://ekservicebus.servicebus.windows.net/;SharedAccessKeyName=ek-policy;SharedAccessKey=UedHV0OKDXczfSGE8/JILEen8Tt69jbQ54eCvA9N2yM=;EntityPath=ek";
            var Client = TopicClient.CreateFromConnectionString(connectionString, topic);

            if (!string.IsNullOrEmpty(subscriptionName))
            {
                message.Properties["Type"] = subscriptionName;
                var namespaceManager = NamespaceManager.CreateFromConnectionString(connectionString);
                if (!namespaceManager.SubscriptionExists(topic, subscriptionName))
                {
                    SqlFilter subscriptionFilter = new SqlFilter(string.Format("Type = '{0}'", subscriptionName));

                    var subscription = new SubscriptionDescription(topic, subscriptionName);
                    subscription.ForwardTo = "client1";
                    
                    namespaceManager.CreateSubscription(subscription, subscriptionFilter);                    
                }
            }
            
            Client.Send(message);
        }

        public static void CreateSubscription(string topic, string subscriptionName, string queue, string filter)
        {
            string connectionString = System.Configuration.ConfigurationManager.AppSettings["ek:ServiceBus"]; // "Endpoint =sb://ekservicebus.servicebus.windows.net/;SharedAccessKeyName=ek-policy;SharedAccessKey=UedHV0OKDXczfSGE8/JILEen8Tt69jbQ54eCvA9N2yM=;EntityPath=ek";
            var Client = TopicClient.CreateFromConnectionString(connectionString, topic);

            if (!string.IsNullOrEmpty(subscriptionName))
            {
                var namespaceManager = NamespaceManager.CreateFromConnectionString(connectionString);
                if (!namespaceManager.SubscriptionExists(topic, subscriptionName))
                {
                    SqlFilter subscriptionFilter = new SqlFilter(string.Format(filter, subscriptionName));

                    var subscription = new SubscriptionDescription(topic, subscriptionName);
                    subscription.ForwardTo = queue;

                    namespaceManager.CreateSubscription(subscription, subscriptionFilter);
                }
            }
        }
        public static void Send(string topic, string subscription, IDictionary<string, object> message) {
            Send(topic, subscription, new BrokeredMessage(message));
        }

        public static ElasticObject CreateMessage() {
            return new ElasticObject();
        }

        public static void SendToQueue(string QueueName, BrokeredMessage message)
        {
            string connectionString = System.Configuration.ConfigurationManager.AppSettings["ek:ServiceBus"];            

            var client = QueueClient.CreateFromConnectionString(connectionString, QueueName);           

            client.Send(message);
        }
    }
}