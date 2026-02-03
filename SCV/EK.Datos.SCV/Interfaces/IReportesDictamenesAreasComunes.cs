using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Interfaces
{
    public interface IReportesDictamenesAreasComunes
         : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IReporteAreasComunesDictamen>
    {
        Task<List<m.SCV.Interfaces.IAgendaDictamenDetalleAreasComunes>> GetDictamenes(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDiagnosticosImagenesCAT>> GetDiagnosticateImageCAT(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDiagnosticosNotaCAT>> GetDiagnosticateNoteCAT(Dictionary<string, object> parametros);
    }
}
