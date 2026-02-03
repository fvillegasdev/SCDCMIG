using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class InsumosTarjetasDetalle : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IInsumoTarjetaDetalle>, d.SCCO.Interfaces.IInsumosTarjetasDetalle
    {
        private const string USP_SCCO_INSUMOSTARJETAS_DETALLE_SELECT = "usp_scco_InsumosTarjetas_detalle_select";
        public InsumosTarjetasDetalle(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_INSUMOSTARJETAS_DETALLE_SELECT, null, "scco_InsumosTarjetas_detalle")
        { }
    }
}