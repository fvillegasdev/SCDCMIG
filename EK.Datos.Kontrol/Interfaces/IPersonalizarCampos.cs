using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.Interfaces
{
    public interface IPersonalizarCampos
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IPersonalizarCampo>
    {

        Task<List<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>> GetCustomForm(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor>> GetCustomFormValue(Dictionary<string, object> parametros);

        Task<int> GetConfigCountValue(Dictionary<string, object> parametros);
    }
}
