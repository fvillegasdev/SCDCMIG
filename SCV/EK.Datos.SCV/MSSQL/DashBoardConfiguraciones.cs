using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class DashBoardConfiguraciones
         : dk.DAOBaseGeneric<m.IDashBoardConfiguracion>, EK.Datos.SCV.Interfaces.IDashBoardConfiguraciones
    {
        private const string USP_SCV_DASHBOARD_CONFIGURACION_SELECT = "usp_scv_expedientes_dashboard_configuracion_select";

        public DashBoardConfiguraciones(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_DASHBOARD_CONFIGURACION_SELECT, null, "dashBoardConfiguraciones")
        {
        }
    }
}