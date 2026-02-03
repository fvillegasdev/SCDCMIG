using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("TipoInsumo")]

    public interface ITipoInsumo
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.ITipoInsumo>
    {
        Task<object> GetTipoInsumo(Dictionary<string, object> parametros);
    }
}