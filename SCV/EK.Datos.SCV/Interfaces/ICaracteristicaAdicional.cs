using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.Interfaces
{
    public interface ICaracteristicaAdicional
         : dki.IDAOBaseGeneric<m.ICaracteristicaAdicional>
    {
        Task<object[]> GetAllByVentaOpcional(Dictionary<string, object> parametros);

        #region CaracteristicasComponent
        Task<List<m.IEntidadCaracteristica>> GetCaracteristicas(Dictionary<string,object> parametros);
        Task<int> SaveCaracteristica(m.IEntidadCaracteristica model);

        Task<int> DeleteCaracteristica(int id);
        Task<m.IEntidadCaracteristica> GetCaracteristicasById(int id);
        #endregion
    }
}
