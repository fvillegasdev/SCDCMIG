using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReporteFallasAreasComunes
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IReporteFallasAreasComunes>
    {
        #region ++++++++++++ Proceso ++++++++++++++++++++
        Task<object> GetTipoFallas(int idUsuario);
        Task<object> GetFallaAreaComun(Dictionary<string, object> parametros);
        Task<object> GetUbicacionFalla(int idUsuario);
        Task<object> GetCausaFalla(int idUsuario);
        Task<m.SCV.Interfaces.IReporteFallasAreasComunes> GetByEntityId(int id);
        Task<int> CancelarDetallesFolio(string folio);
        Task<object[]> GetFraccReportes(string DesarrolloClave);
        Task<int> ValidarResponsablePlaza(string idPlaza);

        Task<List<m.SCV.Interfaces.IContratista>> GetContratistas(Dictionary<string, object> parametros); 
        #endregion

        #region ++++++++++++ Dashboard ++++++++++++++
        Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getStateDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getUsersDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ITopReport>> getTopReportDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteFallasAreasComunes>> getGridDashBoard(Dictionary<string, object> parametros);

        Task<object[]> Search(Dictionary<string, object> parametros);

        #endregion
    }
}
