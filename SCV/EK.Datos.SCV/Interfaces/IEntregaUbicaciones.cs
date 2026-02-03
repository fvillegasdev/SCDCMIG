using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Interfaces
{
    public interface IEntregaUbicaciones
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IEntregaUbicacion>
    {

        Task<m.SCV.Interfaces.IEntregaUbicacionSeguimientoEtapa> getSeguimientoEtapa(Dictionary<string, object> parametros);

        Task<int> actualizarSeguimientoEtapa(Dictionary<string, object> parametros);
    }
}
