using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.MSSQL
{
    public class WBSTarjetas
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IWBSTarjeta>, d.SCCO.Interfaces.IWBSTarjetas
    {
        private const string USP_SCCO_WBS_TARJETAS_SELECT = "usp_scco_wbs_tarjetas_select";
        public WBSTarjetas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_WBS_TARJETAS_SELECT, null, "scco_wbs_tarjetas")
        { }
    }
}