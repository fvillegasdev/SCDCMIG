using System;
using System.Security.Principal;
using System.Threading.Tasks;

namespace EK.Utils
{
    public enum LoginResultEnum {
        NotFound = 404,
        Found = 200,
        InvalidPassword = 201,
        Inactive = 202,
        Blocked = 203,
        Expired = 205,
        Locked = 206,
        Error = -1
    }
    public interface IAPIClient
    {
        IServiceCommand GetServiceCommand(string commandId);
        Task<IServiceCommand> GetServiceCommandAsync(string commandId);
        void AddIdentity(IIdentity identity);
        Task<EK.Modelo.Kontrol.Interfaces.ICommandResult> Login(string userName, string password);
        object CurrentUser { get; }
    }
}
