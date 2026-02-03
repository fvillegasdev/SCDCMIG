using System;
using System.Collections.Generic;
using System.Configuration;
using System.Security.Principal;
using System.Security.Claims;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using IdentityModel;
using IdentityModel.Client;

namespace EK.Common.Managers
{
    public class TokenManager
    {
        private string address;
        private string clientId;
        private string clientSecret;
        private string user;
        private string password;
        private string serviceGrant;
        private string serviceScope;

        private string scope;

        public static TokenManager Create(string scope) {
            return new TokenManager(scope);
        }

        private string read(string key) {
            var appSetting = string.Format("{0}:{1}", this.scope, key);

            return ConfigurationManager.AppSettings[appSetting];
        }

        private TokenManager(string scope)
        {
            this.scope = scope;

            this.address = this.read("isAddress");
            this.clientId = this.read("clientId");
            this.clientSecret = this.read("clientSecret");
            this.user = this.read("user");
            this.password = this.read("password");
            this.serviceGrant = this.read("serviceGrant");
            this.serviceScope = this.read("serviceScope");
        }

        public TokenResponse CreateToken()
        {
            var client = new TokenClient(this.address);

            var additionalvalues = new Dictionary<string, string>()
            {
                { "client_id", this.clientId },
                { "client_secret", this.clientSecret },
                { "user_id", this.user },
                { "user_password", this.password }
            };

            return client.RequestCustomGrantAsync(this.serviceGrant, this.serviceScope, additionalvalues).Result;
        }

        public TokenResponse CreateToken(string userName, string password)
        {
            var client = new TokenClient(this.address);

            var additionalvalues = new Dictionary<string, string>()
            {
                { "client_id", this.clientId },
                { "client_secret", this.clientSecret },
                { "user_id", userName },
                { "user_password", password }
            };

            return client.RequestCustomGrantAsync(this.serviceGrant, this.serviceScope, additionalvalues).Result;
        }


        public TokenResponse CreateToken(string token, IIdentity identity)
        {
            var client = new TokenClient(this.address);
            var claimsIdentity = (ClaimsIdentity)identity;
            var claims = new Dictionary<string, string>();
            
            foreach (var kv in claimsIdentity.Claims) {
                if (!claims.ContainsKey(kv.Type)) {
                    claims.Add(kv.Type, kv.Value);
                }
            }

            var claimsText = Convert.ToBase64String(UTF8Encoding.UTF8.GetBytes(Newtonsoft.Json.JsonConvert.SerializeObject(claims)));
            var additionalvalues = new Dictionary<string, string>()
            {
                { "client_id", this.clientId },
                { "client_secret", this.clientSecret },
                { "user_data", claimsText },
                { "token", token }
            };

            return client.RequestCustomGrantAsync(this.serviceGrant, this.serviceScope, additionalvalues).Result;
        }

    }
}
