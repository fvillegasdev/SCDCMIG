using m = EK.Modelo;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Desarrollos")]

    public interface IDesarrollos
        : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object> GetByDesarrolloId(Dictionary<string, object> parametros);
        Task<object> GetAllDesarrollosEsquemas(Dictionary<string, object> parametros);
        Task<object> GetAllDesarrollosPrototipos(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDesarrolloCentrosCosto>> GetAllDesarrolloCentroCosto(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDesarrolloCuentas>> GetAllDesarrollosCuentas(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IDesarrolloEsquema> GetDesarrolloEsquema(int? idDesarrollo, int? idEsquema);
        Task<m.SCV.Interfaces.IDesarrollosFinanciamiento> GetDesarrolloFinanciamiento(int? idDesarrollo, int? idTipoFinanciamiento);
        Task<List<m.SCV.Interfaces.IDesarrollosFinanciamiento>> GetAllDesarrollosFinanciamientos(Dictionary<string, object> parametros);
        Task<object> GetDesarrolloTiposComercializacion(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDesarrollos>> GetSPVDesarrollosClasificadores(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IResponsableEntregaDesarrollo> SetGrupoResponsable(m.SCV.Interfaces.IResponsableEntregaDesarrollo item);

        Task<List<m.SCV.Interfaces.IDesarrolloConceptosPago>> GetConceptosPago(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IMotivosCancelacion>> GetMotivosCancelacionList(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDesarrolloMotivoCancelacion>> GetMotivosCancelacion(Dictionary<string, object> parametros);
    }
}