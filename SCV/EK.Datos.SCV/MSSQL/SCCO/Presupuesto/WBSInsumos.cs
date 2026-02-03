using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.MSSQL
{
    public class WBSInsumos
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IWBSInsumo>, d.SCCO.Interfaces.IWBSInsumos
    {
        private const string USP_SCCO_WBS_INSUMOS_SELECT = "usp_scco_wbs_insumos_select";
        public WBSInsumos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_WBS_INSUMOS_SELECT, null, "scco_wbs_insumos")
        { }
    }
}