using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ListaPrecios")]
    public interface IListaPrecios
        : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<m.SCV.Interfaces.IListaPrecios> GetByUbicacion(int IdUbicacion,int IdEsquema, List<m.SCV.Interfaces.IVentaCaracteristica> Caracteristicas, int IdExpediente);
        Task<m.SCV.Interfaces.IListaPreciosVersiones> SaveVersion(m.SCV.Interfaces.IListaPreciosVersiones item);
        Task<List<m.SCV.Interfaces.IListaPreciosVersiones>> GetAllVersiones(Dictionary<string, object> parametros);
        Task<string> ValidarExistenciaLP(int idDesarrollo, int idTipoComercializacion);
    }
}


