using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCCO.MSSQL
{
    public class ObraValidaciones
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IObraValidacion>, d.SCCO.Interfaces.IObraValidacion

    {
        private const string USP_SCCO_OBRA_VALIDACIONES_SELECT = "usp_scco_Obra_Validaciones_select";

        public ObraValidaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCCO_OBRA_VALIDACIONES_SELECT,
                  string.Empty,
                  "scco_Obra_Validaciones")
        { }
    }
}
