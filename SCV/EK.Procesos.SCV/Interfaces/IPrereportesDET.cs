using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("PrereportesDetalle")]
    public interface IPrereportesDET
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPrereporteDetalle>
    {
        Task <List<m.SCV.Interfaces.IPrereporteDetalle>> GetByPartidaCte(int numcte,int reporte);
        Task <m.SCV.Interfaces.IPrereporteDetalle> GetByIdPartida(int idpartida);   
        Task <m.SCV.Interfaces.IPrereporteDetalle> UpdateEstatusPreRepDet(int idpartida,string estatus,string fechaAgenda = null);   
    }
}
