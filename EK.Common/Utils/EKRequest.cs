using System;
using System.Configuration;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Net;
using System.Runtime.Caching;
using System.Web;
using System.Web.Mvc;
using System.Text;

using System.Threading.Tasks;
using System.Security.Claims;
using System.Threading;
using Microsoft.Owin.Security.OpenIdConnect;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.Owin.Security;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using EK.Common.Utils;

namespace EK.Common.Utils
{
    public class RequestManager
    {
        private const string JSON_CONTENT_TYPE = "application/json";
        private string bearerToken;

        public static RequestManager Create()
        {
            return new RequestManager();
        }

        public static RequestManager Create(string token)
        {
            return new RequestManager(token);
        }

        private RequestManager()
        {
        }

        private RequestManager(string token)
        {
            this.bearerToken = token;
        }

        #region "Post Methods"
        public string Post(string url)
        {
            return Post<string>(url);
        }

        public string Post(string url, object parameters)
        {
            return Post<string>(url, parameters);
        }

        public T Post<T>(string url) where T : class
        {
            return Post<T>(url, null);
        }

        public T Post<T>(string url, object parameters) where T : class
        {
            return invoke<T>(url, HttpMethod.Post, parameters).Result;
        }

        public async Task<T> PostAsync<T>(string url, object parameters) where T : class
        {
            return await invoke<T>(url, HttpMethod.Post, parameters);
        }
        #endregion

        #region "Get Methods"
        public string Get(string url)
        {
            return Get<string>(url);
        }

        public string Get(string url, object parameters)
        {
            return Get<string>(url, parameters);
        }

        public T Get<T>(string url) where T : class
        {
            return Get<T>(url, null);
        }

        public T Get<T>(string url, object parameters) where T : class
        {
            return invoke<T>(url, HttpMethod.Get, parameters).Result;
        }
        #endregion

        private async Task<T> invoke<T>(string url, HttpMethod method, object parameters) where T : class
        {
            T retValue = null;
            HttpResponseMessage response = null;

            try
            {
                var parametersSerialized = JsonConvert.SerializeObject(parameters);
                var command = new StringContent(parametersSerialized, Encoding.UTF8, JSON_CONTENT_TYPE);

                var bearerTokenKey = "API_TOKEN";
                var bearerToken = string.IsNullOrEmpty(this.bearerToken)
                    ? Convert.ToString(HttpContext.Current.Session[bearerTokenKey])
                    : this.bearerToken;

                var referrer = System.Web.HttpContext.Current != null
                    ? System.Web.HttpContext.Current.Request.Url.ToString()
                    : string.Format("file://{0}", System.Diagnostics.Process.GetCurrentProcess().ProcessName);

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(JSON_CONTENT_TYPE));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
                client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue(System.Reflection.Assembly.GetExecutingAssembly().GetName().Name, System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.ToString()));
                client.DefaultRequestHeaders.Referrer = new Uri(referrer);
                client.DefaultRequestHeaders.Add("User", ClaimsPrincipal.Current.Identity.Name);

                if (method == HttpMethod.Post)
                {
                    response = await client.PostAsync(url, command);
                }
                else if (method == HttpMethod.Get)
                {
                    response = await client.GetAsync(url);
                }

                response.EnsureSuccessStatusCode();

                if (typeof(T) == typeof(string))
                {
                    string result = response.Content.ReadAsStringAsync().Result;

                    retValue = result as T;
                }
                else if (typeof(T) == typeof(Stream))
                {
                    var result = response.Content.ReadAsStreamAsync().Result;

                    retValue = result as T;
                }
                else if (typeof(T) == typeof(ContentResult))
                {
                    string result = response.Content.ReadAsStringAsync().Result;

                    retValue = new ContentResult() { Content = result, ContentType = JSON_CONTENT_TYPE } as T;
                }
                else if (typeof(T) == typeof(JToken))
                {
                    string result = response.Content.ReadAsStringAsync().Result;

                    retValue = JToken.Parse(result) as T;
                }
            }
            catch (Exception ex) {
                //if (response != null) {
                //    var responseContent = response.Content.ReadAsStringAsync().Result;
                //    var responseJson = JsonConvert.SerializeObject(responseContent);
                //};

                throw ex;
            };

            return retValue;
        }
    }
}
