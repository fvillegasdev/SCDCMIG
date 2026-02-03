using System;
using System.IO;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Xml;

using Microsoft.Azure;
using Microsoft.ServiceBus;
using Microsoft.ServiceBus.Messaging;

namespace EK.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        { 
            string connectionString = "Endpoint=sb://ekservicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=//OWMlnj86cFBFiUFXa96aiTDMTJpnM2NM88Lta4nDs=";
            //string connectionString = CloudConfigurationManager.GetSetting("Microsoft.ServiceBus.ConnectionString");

            SubscriptionClient Client =
                SubscriptionClient.CreateFromConnectionString
                        (connectionString, "emailtopic", "emailtopics1");

            // Configure the callback options.
            OnMessageOptions options = new OnMessageOptions();
            options.AutoComplete = false;
            options.AutoRenewTimeout = TimeSpan.FromMinutes(1);

            Client.OnMessage((message) =>
            {
                try
                {
                    var bodyData = message.GetBody<Dictionary<string, object>>();

                    // Process message from subscription.
                    Console.WriteLine("\n**High Messages**");
                    //Console.WriteLine("Body: " + message.GetBody<Dictionary<string, object>>());
                    Console.WriteLine("MessageID: " + message.MessageId);
                    foreach (var entry in bodyData) {
                        Console.WriteLine("{0}: {1}", entry.Key, entry.Value);
                    }
                    //Console.WriteLine("Message Number: " +
                    //    message.Properties["MessageNumber"]);

                    // Remove message from subscription.
                    message.Complete();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message.ToString());
                    // Indicates a problem, unlock message in subscription.
                    message.Abandon();
                }
            }, options);

            Console.Read();
        }
    }
}
