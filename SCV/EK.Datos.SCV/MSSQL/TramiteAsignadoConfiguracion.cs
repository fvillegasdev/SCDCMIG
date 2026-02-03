using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TramiteAsignadoConfiguracion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITramiteAsignadoConfiguracion>, d.SCV.Interfaces.ITramiteAsignadoConfiguracion
    {
        private const string USP_TRAMITE_CONFIGURACION = "usp_scv_tramite_asignado_configuracion_select";

        public TramiteAsignadoConfiguracion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_TRAMITE_CONFIGURACION, string.Empty, "tramiteasignadoconfiguracion")
        {

        }
    }
}
