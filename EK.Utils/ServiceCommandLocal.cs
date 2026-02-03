using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Modelo.Kontrol;
using EK.Modelo.Kontrol.Interfaces;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using SimpleInjector;

namespace EK.Utils
{
    public class ServiceCommandLocal
            : IServiceCommand
    {
        private const string JSON_CONTENT_TYPE = "application/json";
        private Dictionary<string, object> parameters;
        private string commandId;
        private IContainerFactory factory;

        public ServiceCommandLocal(IContainerFactory factory)
        {
            this.factory = factory;
            this.parameters = new Dictionary<string, object>();
        }

        public string Command
        {
            get
            {
                return this.commandId;
            }
            set
            {
                this.commandId = value;
            }
        }

        public IServiceCommand Add(Dictionary<string, object> parameters)
        {
            if (parameters != null)
            {
                foreach (var p in parameters)
                {
                    this.parameters.Add(p.Key, p.Value);
                }
            }

            return this;
        }

        public IServiceCommand Add(string parameter, object value)
        {
            object paramValue = null;

            if (value != null && value.GetType().IsEnum)
            {
                paramValue = Convert.ToInt32(value);
            }
            else
            {
                paramValue = value;
            }

            this.parameters.Add(parameter, paramValue);

            return this;
        }

        public IServiceCommand AddKey(object value)
        {
            this.parameters.Add("$__KEY", value);

            return this;
        }

        private T serializeObject<T>(object obj) where T : class
        {
            T retValue = default(T);
            string data = JsonConvert.SerializeObject(obj);

            if (typeof(T) == typeof(string))
            {
                retValue = data as T;
            }
            else if (typeof(T) == typeof(Stream))
            {
                byte[] byteArray = Encoding.UTF8.GetBytes(data);
                MemoryStream stream = new MemoryStream(byteArray);

                retValue = stream as T;
            }
            else if (typeof(T) == typeof(ContentResult))
            {
                retValue = new ContentResult() { Content = data, ContentType = JSON_CONTENT_TYPE } as T;
            }
            else if (typeof(T) == typeof(JToken))
            {
                retValue = JToken.Parse(data) as T;
            }

            return retValue;
        }

        public ContentResult Execute()
        {
            return this.Execute<ContentResult>();
        }

        public T Execute<T>() where T : class
        {
            try
            {
                object result = null;

                result = this.factory.GetInstance<CommandManager>().Execute(this.commandId, this.parameters).Result;

                return this.serializeObject<T>(result);
            }
            catch (Exception ex){
                throw ex;
            }
        }

        public async Task<ContentResult> ExecuteAsync() {
            return await this.ExecuteAsync<ContentResult>();
        }

        public async Task<T> ExecuteAsync<T>() where T : class
        {
            var logger = this.factory.GetInstance<EK.Drivers.Log.ILogger>();
            try
            {
                object result = null;
                string key = null;
                object user = null;

                if (this.parameters != null && this.parameters.ContainsKey("$__KEY")) {
                    key = this.parameters["$__KEY"].ToString();

                    this.parameters.Remove("$__KEY");

                    var userParameters = new Dictionary<string, object>() { { "uuid", key } };
                    
                    user = await this.factory.GetInstance<CommandManager>().Execute("/usuarios/GetByUUID", userParameters);
                }
                result = await this.factory.GetInstance<CommandManager>().Execute(this.commandId, this.parameters, user);

                return this.serializeObject<T>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
