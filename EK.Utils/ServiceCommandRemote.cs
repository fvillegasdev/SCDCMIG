using System;
using System.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

using EK.Common.Utils;

namespace EK.Utils
{
    public class ServiceCommandRemote
            : IServiceCommand
    {
        const string JSON_CONTENT_TYPE = "application/json";

        private Dictionary<string, object> parameters;
        private string token;
        protected string serviceHost;
        private string commandId;

        public void Configure(string apiAddress)
        {
            this.serviceHost = ConfigurationManager.AppSettings[string.Format("{0}:baseAddress", apiAddress)];
        }

        public ServiceCommandRemote()
        {
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

        //private ServiceCommandRemote(string apiAddress, string commandId)
        //{
        //    this.commandId = commandId;
        //    this.parameters = new Dictionary<string, object>();
        //    this.serviceHost = ConfigurationManager.AppSettings[string.Format("{0}:baseAddress", apiAddress)];
        //}

        public object this[string parameter]
        {
            get
            {
                return this.parameters[parameter];
            }

            set
            {
                this.parameters[parameter] = value;
            }
        }

        public Dictionary<string, object> Parameters
        {
            get
            {
                return this.parameters;
            }
            set
            {
                this.parameters = value;
            }
        }

        public ServiceCommandRemote AddToken(string token)
        {
            this.token = token;

            return this;
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
        public ContentResult Execute()
        {
            return this.Execute<ContentResult>();
        }

        public T Execute<T>() where T : class
        {
            return RequestManager.Create(this.token).Post<T>(this.serviceHost, new { ID = this.commandId, Parametros = this.parameters });
        }

        public async Task<ContentResult> ExecuteAsync()
        {
            return await this.ExecuteAsync<ContentResult>();
        }

        public async Task<T> ExecuteAsync<T>() where T : class
        {
            return await RequestManager.Create(this.token).PostAsync<T>(this.serviceHost, new { ID = this.commandId, Parametros = this.parameters });
        }
    }
}
