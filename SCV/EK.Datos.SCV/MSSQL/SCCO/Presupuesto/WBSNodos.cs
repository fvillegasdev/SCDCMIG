using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.MSSQL
{
    public class WBSNodos
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IWBSNodo>, d.SCCO.Interfaces.IWBSNodos
    {
        private const string USP_SCCO_WBS_NODOS_SELECT = "usp_scco_wbs_nodos_select";
        public WBSNodos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_WBS_NODOS_SELECT, null, "scco_wbs_nodos")
        { }
    }
}