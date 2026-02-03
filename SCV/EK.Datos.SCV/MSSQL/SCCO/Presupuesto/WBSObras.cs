using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.MSSQL
{
    public class WBSObras
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IWBSObra>, d.SCCO.Interfaces.IWBSObras
    {
        private const string USP_SCCO_WBS_OBRAS_SELECT = "usp_scco_wbs_obras_select";
        public WBSObras(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_WBS_OBRAS_SELECT, null, "scco_wbs_obras")
        { }
    }
}