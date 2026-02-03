using System;
using System.Configuration;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Threading.Tasks;

using EK.Utils;

using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

using EK.Drivers.Storage;
using System.Web.Routing;
using SimpleInjector;

namespace EK.Utils
{
    public class BaseKontrollerOpen
        : Base
    {
        private const string API_CLIENT = "APP_API_CLIENT";
        private const string API_CONTAINER = "APP_API_CONTAINER";
        protected const string JSON_CONTENT_TYPE = "application/json";

        protected string GetInputData()
        {
            string retValue = null;
            Request.InputStream.Position = 0;

            using (var stream = new System.IO.StreamReader(Request.InputStream))
            {
                retValue = stream.ReadToEnd();

                stream.Close();
            }

            return retValue;
        }

        protected dynamic GetInputObject()
        {
            var objectString = this.GetInputData();
            dynamic obj = JObject.Parse(objectString);

            return obj;
        }

        protected dynamic GetInputFormObject()
        {
            var objectString = this.GetInputData();
            string unescapedString = Uri.UnescapeDataString(objectString);
            objectString = unescapedString.Replace("singlevalue=", "").Replace("+", " ");
            //byte[] data = Convert.FromBase64String(objectString);
            //string decodedString = Encoding.UTF8.GetString(data);
            dynamic obj = JObject.Parse(objectString);

            return obj;
        }
        
        protected IServiceCommand Get(string commandId)
        {
            IAPIClient apiClient = this.getClient();
            //
            return apiClient.GetServiceCommand(commandId);
        }

        protected IAPIClient getClient()
        {
            return BaseKontrollerCommon.getClient(Session);
        }
    }
}
