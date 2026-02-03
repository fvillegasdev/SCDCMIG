using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ListadoPrueba")]

    public interface IListadoPrueba
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IListadoPrueba>
    {
        //Task<List<m.SCV.Interfaces.IListadoPrueba>> GetPruebas(Dictionary<string, object> parametros);
    }
}