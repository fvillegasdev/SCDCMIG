using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.MSSQL
{
    public class Tabuladores
      : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.ITabulador>, d.SCCO.Interfaces.ITabuladores
    {
        private const string USP_SCCO_TABULADORES_SELECT = "usp_scco_Tabuladores_select";
        public Tabuladores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_TABULADORES_SELECT, null, "scco_Tabuladores")
        { }
    }
}