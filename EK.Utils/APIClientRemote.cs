using System;
using System.Collections.Generic;
using System.Configuration;
using System.Security.Principal;
using System.Threading.Tasks;

using IdentityModel.Client;
using EK.Common.Managers;

using Newtonsoft.Json.Linq;

using SimpleInjector;

namespace EK.Utils
{
    public class APIClientRemote
        : IAPIClient
    {
        private string configScope = ConfigurationManager.AppSettings["client:scope"];
        private string userName;
        private string password;
        private TokenResponse token;
        private long expiresIn;
        private string accessToken;
        object current;
        private IIdentity identity;
        Container container;

        public APIClientRemote(Container container) {
            this.identity = null;
            this.container = container;
        }

        public async Task<EK.Modelo.Kontrol.Interfaces.ICommandResult> Login(string userName, string password) {
            var tokenManager = TokenManager.Create(this.configScope);

            this.userName = userName;
            this.password = password;
            this.token = tokenManager.CreateToken(this.userName, this.password);

            dynamic retValue = await this.Invoke("/Usuarios/SignIn");

            //var retValue = (LoginResultEnum) result.Codigo;

            //if (retValue == LoginResultEnum.Found)
            //{
            //    this.current = result.Resultado;
            //}

            //return retValue;
            if ((LoginResultEnum)retValue.Codigo == LoginResultEnum.Found)
            {
                this.current = retValue.Resultado;
            }

            //this.current = result;
            return retValue;
        }

        public void AddIdentity(IIdentity identity) {
            var tokenManager = TokenManager.Create(this.configScope);

            this.token = tokenManager.CreateToken(this.token.AccessToken, identity);
        }

        public IServiceCommand GetServiceCommand(string commandId) {
            ServiceCommandRemote serviceCommand = this.container.GetInstance<ServiceCommandRemote>();
            serviceCommand.Command = commandId;
            serviceCommand.AddToken(this.token.AccessToken);
            serviceCommand.Configure(this.configScope);

            return (IServiceCommand) serviceCommand;
        }

        public async Task<IServiceCommand> GetServiceCommandAsync(string commandId)
        {
            IServiceCommand retValue = null;

            await Task.Run(() =>
            {
                retValue = this.GetServiceCommand(commandId);
            });

            return retValue;
        }

        public object CurrentUser
        {
            get {
                return this.current;
            }
        }

        public string Scope {
            get {
                return this.configScope;
            }
            set {
                this.configScope = value;
            }
        }

        public string UserName {
            get {
                return this.userName;
            }
            set {
                this.userName = value;
            }
        }

        public string Password {
            get {
                return this.password;
            }
            set {
                this.password = value;
            }
        }

        //public static void Configure(string configurationScope)
        //{
        //    return new APIClient(configurationScope);
        //}

        //public static APIClient Create(string configurationScope, string userName, string password)
        //{
        //    return new APIClient(configurationScope, userName, password);
        //}

        //public static APIClient Create(string configurationScope, string accessToken, IIdentity identity)
        //{
        //    return new APIClient(configurationScope, accessToken, identity);
        //}

        //private APIClient(string configurationScope)
        //{
        //    this.configScope = configurationScope;
        //}

        //private APIClient(string configurationScope, string username, string password)
        //{
        //    this.configScope = configurationScope;
        //    this.userName = username;
        //    this.password = password;
        //}

        //private APIClient(string configurationScope, string accessToken, IIdentity identity)
        //{
        //    this.accessToken = accessToken;
        //    this.identity = identity;
        //    this.configScope = configurationScope;
        //}

        public async Task<object> Invoke(string command)
        {
            return await this.Invoke(command, null);
        }

        public async Task<object> Invoke(string command, Dictionary<string, object> parameters)
        {
            if (this.isTokenInvalid())
            {
                var tokenManager = TokenManager.Create(this.configScope);

                if (!string.IsNullOrEmpty(this.userName) && !string.IsNullOrEmpty(this.password))
                {
                    this.token = tokenManager.CreateToken(this.userName, this.password);
                }
                else
                {
                    if (!string.IsNullOrEmpty(this.accessToken))
                    {
                        this.token = tokenManager.CreateToken(this.accessToken, this.identity);
                    }
                    else
                    {
                        this.token = tokenManager.CreateToken();
                    }
                }

                //this.token = string.IsNullOrEmpty(this.accessToken) 
                //    ? tokenManager.CreateToken() 
                //    : tokenManager.CreateToken(this.accessToken, this.identity);

                this.expiresIn = DateTime.UtcNow.AddSeconds(this.token.ExpiresIn).Ticks;
                this.accessToken = this.token.AccessToken;
            }

            var serviceCommand = (ServiceCommandRemote)this.GetServiceCommand(command);
            serviceCommand.Add(parameters);
            serviceCommand.AddToken(token.AccessToken);

            var result = await serviceCommand.ExecuteAsync<JToken>();

            return result;
        }

        private bool isTokenInvalid()
        {
            bool retValue = false;

            if (this.token == null)
            {
                retValue = true;
            }
            else
            {
                if (this.expiresIn < DateTime.UtcNow.Ticks)
                {
                    retValue = true;
                }
            }

            return retValue;
        }

        public string AccessToken
        {
            get
            {
                return this.accessToken;
            }
        }

        public long ExpiresIn
        {
            get
            {
                return this.expiresIn;
            }
        }
    }
}
