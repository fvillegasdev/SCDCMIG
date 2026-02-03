using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.Interfaces
{
    public interface IPersonalizarCamposOpciones
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>
    {

        Task<List<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>> GetCustomForm(Dictionary<string, object> parametros);
  


    }
}
