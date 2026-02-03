//using System;
//using System.Configuration;
//using System.Collections.Generic;
//using System.Web;
//using System.Web.Mvc;

//using EK.Common.Utils;

//namespace EK.Common.Services
//{
//    public class ServiceCommand
//        : IServiceCommand
//    {
//        const string JSON_CONTENT_TYPE = "application/json";

//        private string commandId;
//        private Dictionary<string, object> parameters;
//        private string token;
//        protected string serviceHost;

//        public static ServiceCommand Create(string apiAddress, string commandId) {
//            return new ServiceCommand(apiAddress, commandId);
//        }

//        private ServiceCommand(string apiAddress, string commandId) {
//            this.commandId = commandId;
//            this.parameters = new Dictionary<string, object>();
//            this.serviceHost = ConfigurationManager.AppSettings[string.Format("{0}:baseAddress", apiAddress)];
//        }

//        public object this[string parameter] {
//            get {
//                return this.parameters[parameter];
//            }

//            set {
//                this.parameters[parameter] = value;
//            }
//        }

//        public Dictionary<string, object> Parameters {
//            get {
//                return this.parameters;
//            }
//            set {
//                this.parameters = value;
//            }
//        }

//        public ServiceCommand AddToken(string token)
//        {
//            this.token = token;

//            return this;
//        }

//        public ServiceCommand Add(Dictionary<string, object> parameters)
//        {
//            if (parameters != null)
//            {
//                foreach (var p in parameters)
//                {
//                    this.parameters.Add(p.Key, p.Value);
//                }
//            }

//            return this;
//        }

//        public IServiceCommand Add(string parameter, object value) {
//            object paramValue = null;

//            if (value != null && value.GetType().IsEnum)
//            {
//                paramValue = Convert.ToInt32(value);
//            }
//            else {
//                paramValue = value;
//            }

//            this.parameters.Add(parameter, paramValue);

//            return this;
//        }

//        public ContentResult Execute() {
//            return this.Execute<ContentResult>();
//        }

//        public T Execute<T>() where T: class {
//            return RequestManager.Create(this.token).Post<T>(this.serviceHost, new { ID = commandId, Parametros = this.parameters });
//        }
//    }
//}
