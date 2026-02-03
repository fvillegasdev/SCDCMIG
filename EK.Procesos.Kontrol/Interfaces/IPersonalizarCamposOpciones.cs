using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("PersonalizarCamposOpciones")]
    public interface IPersonalizarCamposOpciones
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>> GetCustomForm(Dictionary<string, object> parametros);
        //Task<List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor>> GetCustomFormValue(Dictionary<string, object> parametros);
        //Task<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> SaveCustomForm(List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> item, int IdRegistro  );
      
    }
}