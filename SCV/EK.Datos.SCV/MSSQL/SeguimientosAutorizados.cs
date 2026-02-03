using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class SeguimientosAutorizados : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISeguimientoAutorizado>
        , d.SCV.Interfaces.ISeguimientosAutorizados
    {
        private const string USP_SCV_SEGUIMIENTOS_AUTORIZADOS_SELECT = "usp_scv_Expedientes_Seguimientos_Autorizados_select";
        public SeguimientosAutorizados(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_SEGUIMIENTOS_AUTORIZADOS_SELECT, null, "scv_Expedientes_Seguimientos_Autorizados")
        { }
    }
}