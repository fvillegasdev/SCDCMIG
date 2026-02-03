using System;
using System.Threading.Tasks;

using EK.Modelo.Kontrol;
using mdl = EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol.Interfaces
{
    public partial interface IUsuario
    {
        Task<mdl.ICommandResult> SignIn(string userName, string password);
    }
}