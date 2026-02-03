using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCCO.MSSQL
{
    public class ObraIndirecto
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IObraIndirecto>, d.SCCO.Interfaces.IObraIndirecto

    {
        private const string USP_SCCO_OBRA_INDIRECTOS_SELECT = "usp_scco_Obra_Indirectos_select";

        public ObraIndirecto(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCCO_OBRA_INDIRECTOS_SELECT,
                  string.Empty,
                  "scco_Obra_Indirectos")
        {}
    }
}
