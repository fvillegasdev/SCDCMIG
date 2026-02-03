using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;
namespace EK.Datos.SCV.Interfaces
{
    public interface IReasignacion
        :dki.IDAOBaseGeneric<m.SCV.Interfaces.IReasignacion>
    {
        Task<object> GetReasignacionProspectos(Dictionary<string,object> parametros);
        Task<object> GetReasignacionExpedientes(Dictionary<string, object> parametros);
        Task<object> GetSaveReassignmentProspects(Dictionary<string, object> parametros);
        Task<object> GetSaveReassignmentExpedients(Dictionary<string, object> parametros);
    }
}
