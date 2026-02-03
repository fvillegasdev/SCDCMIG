using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Principal;
using System.Web;

using SimpleInjector;

using Newtonsoft.Json.Linq;

namespace EK.Utils
{
    public class APIClientLocal
        : IAPIClient
    {
        object current;
        Container container;

        public APIClientLocal(Container container) {
            this.container = container;
        }

        public async Task<EK.Modelo.Kontrol.Interfaces.ICommandResult> Login(string userName, string password) {
            var proceso = this.container.GetInstance<EK.Procesos.Kontrol.Interfaces.IUsuario>();
            var retValue = await proceso.SignIn(userName, password);

            //var retValue = (LoginResultEnum) result.Codigo;

            if ((LoginResultEnum) retValue.Codigo == LoginResultEnum.Found) {
                this.current = retValue.Resultado;
            }

            return retValue;
        }

        public void AddIdentity(IIdentity identity)
        {
        }

        public IServiceCommand GetServiceCommand(string commandId)
        {
            IServiceCommand serviceCommand = this.container.GetInstance<IServiceCommand>();
            serviceCommand.Command = commandId;

            return serviceCommand;
        }

        public async Task<IServiceCommand> GetServiceCommandAsync(string commandId) {
            IServiceCommand retValue = null;

            await Task.Run(() =>
            {
                retValue = this.GetServiceCommand(commandId);
            });

            return retValue;
        }

        public object CurrentUser
        {
            get
            {
                return this.current;
            }
        }
    }
}