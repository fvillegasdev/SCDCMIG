//using System;
//using System.Collections.Generic;
//using System.Security.Principal;
//using System.Security.Claims;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//using IdentityModel.Client;

//using EK.Common.Managers;
////using EK.Common.Services;

//using Newtonsoft.Json.Linq;

//namespace EK.Common.Utils
//{
//    public class APIClient
//    {
//        private string configScope;
//        private string userName;
//        private string password;
//        private TokenResponse token;
//        private long expiresIn;
//        private string accessToken;
//        private IIdentity identity;

//        public static APIClient Create(string configurationScope) {
//            return new APIClient(configurationScope);
//        }

//        public static APIClient Create(string configurationScope, string userName, string password)
//        {
//            return new APIClient(configurationScope, userName, password);
//        }

//        public static APIClient Create(string configurationScope, string accessToken, IIdentity identity)
//        {
//            return new APIClient(configurationScope, accessToken, identity);
//        }

//        private APIClient(string configurationScope) {
//            this.configScope = configurationScope;
//        }

//        private APIClient(string configurationScope, string username, string password)
//        {
//            this.configScope = configurationScope;
//            this.userName = username;
//            this.password = password;
//        }

//        private APIClient(string configurationScope, string accessToken, IIdentity identity)
//        {
//            this.accessToken = accessToken;
//            this.identity = identity;
//            this.configScope = configurationScope;
//        }

//        public object Invoke(string command) {
//            return this.Invoke(command, null);
//        }

//        public object Invoke(string command, Dictionary<string, object> parameters) {
//            if (this.isTokenInvalid()) {
//                var tokenManager = TokenManager.Create(this.configScope);

//                if (!string.IsNullOrEmpty(this.userName) && !string.IsNullOrEmpty(this.password))
//                {
//                    this.token = tokenManager.CreateToken(this.userName, this.password);
//                }
//                else {
//                    if (!string.IsNullOrEmpty(this.accessToken))
//                    {
//                        this.token = tokenManager.CreateToken(this.accessToken, this.identity);
//                    }
//                    else {
//                        this.token = tokenManager.CreateToken();
//                    }
//                }

//                //this.token = string.IsNullOrEmpty(this.accessToken) 
//                //    ? tokenManager.CreateToken() 
//                //    : tokenManager.CreateToken(this.accessToken, this.identity);

//                this.expiresIn = DateTime.UtcNow.AddSeconds(this.token.ExpiresIn).Ticks;
//                this.accessToken = this.token.AccessToken;
//            }
            
//            dynamic result = ServiceCommand.Create(this.configScope, command)
//                .Add(parameters)
//                .AddToken(token.AccessToken)
//                .Execute<JToken>();

//            if (result != null && result.Resultado != null) {
//                return result.Resultado;
//            }

//            return result;
//        }

//        private bool isTokenInvalid() {
//            bool retValue = false;

//            if (this.token == null)
//            {
//                retValue = true;
//            }
//            else {
//                if (this.expiresIn < DateTime.UtcNow.Ticks) {
//                    retValue = true;
//                }
//            }

//            return retValue;
//        }

//        public string AccessToken {
//            get {
//                return this.accessToken;
//            }
//        }

//        public long ExpiresIn {
//            get {
//                return this.expiresIn;
//            }
//        }
//    }
//}
