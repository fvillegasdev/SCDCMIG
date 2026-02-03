using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo.SCV.Interfaces;
using mk = EK.Modelo.Kontrol;
using pki = EK.Procesos.Kontrol.Interfaces;

namespace EK.Procesos.SCV.Interfaces
{
    [mk.KontrolName("CaracteristicaAdicional")]
    public interface ICaracteristicaAdicional : pki.IBaseProceso
    {
        Task<object[]> GetAllByVentaOpcional(Dictionary<string, object> parametros);

        #region CaracteristicasComponent
        Task<List<m.IEntidadCaracteristica>> GetCaracteristicas(Dictionary<string, object> parametros);
        #endregion
    }
}