using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("Presupuestos")]
    public interface IPresupuestos :
        p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.IPresupuesto>
    {
        Task<List<m.SCCO.Interfaces.IWBSBase>> GetInsumosWBS(int idTarjeta);
    }
}