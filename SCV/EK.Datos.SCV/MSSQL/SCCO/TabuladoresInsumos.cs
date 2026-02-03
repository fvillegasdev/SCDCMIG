using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class TabuladoresInsumos
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.ITabuladorInsumo>, d.SCCO.Interfaces.ITabuladoresInsumos
    {
        private const string USP_SCCO_TABULADORES_INSUMOS_SELECT = "usp_scco_Tabuladores_Insumos_select";
        public TabuladoresInsumos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_TABULADORES_INSUMOS_SELECT, null, "scco_Tabuladores_Insumos")
        { }
    }
}