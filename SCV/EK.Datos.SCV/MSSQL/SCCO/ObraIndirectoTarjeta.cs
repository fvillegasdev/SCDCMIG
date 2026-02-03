using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCCO.MSSQL
{
    public class ObraIndirectoTarjeta
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IObraIndirectoTarjeta>, d.SCCO.Interfaces.IObraIndirectoTarjeta

    {
        private const string USP_OBRA_INDIRECTOSTARJETAS_SELECT = "usp_Obra_IndirectosTarjetas_select";

        public ObraIndirectoTarjeta(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_OBRA_INDIRECTOSTARJETAS_SELECT,
                  string.Empty,
                  "scco_Obra_IndirectosTarjetas")
        {   }
    }
}
