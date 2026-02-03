using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces

{
    public interface IPrereportesDetalles
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPrereporteDetalle>
    {
        Task<List<m.SCV.Interfaces.IPrereporteDetalle>> GetByPartidaCte(int numcte, int reporte);
        Task<m.SCV.Interfaces.IPrereporteDetalle> GetByIdPartida(int idpartida);
        Task<m.SCV.Interfaces.IPrereporteDetalle> UpdateEstatusPreRepDet(int idpartida, string estatus,string fechaAgenda=null);
    }
}