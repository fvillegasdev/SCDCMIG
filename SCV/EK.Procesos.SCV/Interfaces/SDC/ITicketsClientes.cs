using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;

namespace EK.Procesos.SDC.Interfaces
{
    [m.Kontrol.KontrolName("TicketsClientes")]
    public interface ITicketsClientes
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SDC.Interfaces.ITicketCliente>
    {
    }
}