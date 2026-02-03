using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ReporteFallasAreasComunes")]
    public interface IReporteFallasAreasComunes
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IReporteFallasAreasComunes>
    {
        Task<object> GetTipoFallas(int idUsuario);
        Task<object> GetFallaAreaComun(Dictionary<string, object> parametros);
        Task<object> GetUbicacionFalla(int idUsuario);
        Task<object> GetCausaFalla(int idUsuario);
        Task<string> RequestURI(string uri, object obj);
        Task<m.SCV.Interfaces.IReporteFallasAreasComunes> TryCerrarReporte(m.SCV.Interfaces.IReporteFallasAreasComunes item, string estatus, bool validate);
        Task<Drivers.Common.IKontrolFiles> GetDocumentOT(int id);
        Task<object[]> GetFraccReportes(string DesarrolloClave);

        #region Activador
        Task<m.SCV.Interfaces.IReporteFallasAreasComunes> ReverseReporteFallas(m.SCV.Interfaces.IReporteFallasAreasComunes item);

        #endregion
    }
}
