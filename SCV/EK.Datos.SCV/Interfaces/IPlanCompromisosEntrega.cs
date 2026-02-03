using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPlanCompromisosEntrega
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPlanCompromisosEntrega>
    {

        //#region DASHBOARD

        Task<List<m.SCV.Interfaces.IPlanCompromisoIndicador>> getDesarrolloDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IPlanCompromisosConstruccion>> getGridDashBoard(Dictionary<string, object> parametros);

        //Task<List<m.SCV.Interfaces.IExpedienteUbicacion>> getExpedienteUbicaciones(Dictionary<string, object> parametros);

        //Task<List<m.SCV.Interfaces.ITopReport>> getTop(Dictionary<string, object> parametros);

        //Task<List<m.SCV.Interfaces.IContratista>> GetContratistas(Dictionary<string, object> parametros);
        //Task<List<m.SCV.Interfaces.IContratistaUbicacion>> GetContratistasByUbicacion(Dictionary<string, object> parametros);


        //Task<List<m.SCV.Interfaces.IUbicacionComponente>> getUbicacionesComponente(Dictionary<string, object> parametros);
        //Task<List<m.SCV.Interfaces.IIncidencia>> GetReincidencias(Dictionary<string, object> parametros);

        //#endregion DASHBOARD
    }
}