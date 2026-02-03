//using System;
//using System.Collections.Generic;
//using System.Web.Mvc;

//namespace EK.Common.Services
//{
//    public class ServiceLocalCommand
//        : IServiceCommand
//    {
//        private Dictionary<string, object> parameters;

//        public IServiceCommand Add(string parameter, object value)
//        {
//            object paramValue = null;

//            if (value != null && value.GetType().IsEnum)
//            {
//                paramValue = Convert.ToInt32(value);
//            }
//            else
//            {
//                paramValue = value;
//            }

//            this.parameters.Add(parameter, paramValue);

//            return this;
//        }

//        public ContentResult Execute()
//        {
//            return this.Execute<ContentResult>();
//        }

//        public T Execute<T>() where T : class
//        {
//            //retValue = await EK.Utils.BootstrapperKontrolAPI.CommandManager.Execute(command);
//            // create command
//            return null; // RequestManager.Create(this.token).Post<T>(this.serviceHost, new { ID = commandId, Parametros = this.parameters });
//        }
//    }
//}
