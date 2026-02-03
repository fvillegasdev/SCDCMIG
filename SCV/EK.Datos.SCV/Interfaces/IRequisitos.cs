using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IRequisitos
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IRequisito>
    {
        #region      
        Task<List<m.SCV.Interfaces.IRequisitoCaracteristica>> GetCaracteristicas(Dictionary<string, object> parametros);
        Task<int> SaveCaracteristica(m.SCV.Interfaces.IRequisitoCaracteristica model);
        Task<int> DeleteCaracteristica(int idCaracteristica);
        #endregion
    }
}