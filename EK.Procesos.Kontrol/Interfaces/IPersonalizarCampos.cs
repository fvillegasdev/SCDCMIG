using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("PersonalizarCampos")]
    public interface IPersonalizarCampos
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IPersonalizarCampo>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>> GetCustomForm(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor>> GetCustomFormValue(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> SaveCustomForm(List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> item, int IdRegistro  );
        Task<List<m.Kontrol.Interfaces.IPersonalizarCampoConfiguracion>> GetAllConfiguracion(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IPersonalizarCamposSecciones>> GetAllSecciones(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IPersonalizarCampoConfiguracion>> deleteConfigurationById(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IPersonalizarCamposSecciones>> deleteSectionById(Dictionary<string, object> parametros);
    }
}