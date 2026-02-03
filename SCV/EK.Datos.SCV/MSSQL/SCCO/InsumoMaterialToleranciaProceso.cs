using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCCO.MSSQL
{
    public class InsumoMaterialToleranciaProceso
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IInsumoMaterialToleranciaProceso>, d.SCCO.Interfaces.IInsumosMaterialesToleranciaProcesos
    {
        private const string USP_SCCO_INSUMOSMATERIALES_TOLERANCIAPROCESOS_SELECT = "usp_scco_InsumosMateriales_ToleranciaProcesos_select";

        public InsumoMaterialToleranciaProceso(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCCO_INSUMOSMATERIALES_TOLERANCIAPROCESOS_SELECT,
                  string.Empty,
                  "scco_InsumosMateriales_ToleranciaProcesos")
        {}
    }
}
