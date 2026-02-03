using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mdl = EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol.Interfaces
{

    [EK.Modelo.Kontrol.KontrolName("EnvioCorreo")]
    public interface IEnvioCorreo: Kontrol.Interfaces.IBaseProceso
    {
        int SendMailTaskAssigned(int IdFlujo, int IdTarea, int IdTareaInstancia, int IdCliente,string NombreUsuario);
        Task SendEmail(string[] To, string Subject, string Body);
    }
}
