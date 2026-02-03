using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Plaza")]

    public interface IPlaza
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPlaza>
    {
        Task<List<m.Kontrol.Interfaces.IUsuario>> getGerentes(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IUsuario>> getCatByClaveUbicacion(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetSPVPlazas(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IPlaza>> GetSPVPlazasClasificadores(Dictionary<string, object> parametros);

    }
}