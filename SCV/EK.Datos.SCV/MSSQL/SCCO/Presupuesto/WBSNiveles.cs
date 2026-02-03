using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.MSSQL
{
    public class WBSNiveles
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IWBSNivel>, d.SCCO.Interfaces.IWBSNiveles
    {
        private const string USP_SCCO_WBS_NIVELES_SELECT = "usp_scco_wbs_niveles_select";
        public WBSNiveles(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_WBS_NIVELES_SELECT, null, "scco_wbs_niveles")
        { }
    }
}