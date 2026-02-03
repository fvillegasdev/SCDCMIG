using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCCO.MSSQL
{
    public class ObraCompania
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IObraCompania>, d.SCCO.Interfaces.IObraCompania
    {
        private const string USP_SCCO_OBRA_COMPANIAS_SELECT = "usp_scco_Obra_Companias_select";

        public ObraCompania(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCCO_OBRA_COMPANIAS_SELECT,
                  string.Empty,
                  "scco_Obra_Companias")
        {}
    }
}
