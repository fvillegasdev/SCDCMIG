using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("GISVistasElementos")]
    public interface IVistaElemento : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IVistaElemento>, p.Kontrol.Interfaces.IBaseProceso
    {
        //Task<m.Kontrol.Interfaces.IVistaElemento> Save(List<m.Kontrol.Interfaces.IVistaElemento> elementos);
        //Task<List<m.Kontrol.Interfaces.IVistaElemento>> Save(m.Kontrol.Interfaces.IVistas elementos);
        //Task<m.Kontrol.Interfaces.IVistas> Save(m.Kontrol.Interfaces.IVistas elementos);
        //Task<m.Kontrol.Interfaces.IVistaElemento> Save(m.Kontrol.Interfaces.IVistaElemento elemento);
        Task<object[]> GetUbicacionColores(Dictionary<string, object> parametros);
        //Task<object[]> GetUbicacionColores(int Id, int IdFilter);

    }
}
