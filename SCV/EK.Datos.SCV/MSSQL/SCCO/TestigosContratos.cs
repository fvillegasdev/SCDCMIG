using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class TestigosContratos : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.ITestigoContrato>, d.SCCO.Interfaces.ITestigosContratos
    { 
        private const string USP_SCCO_TestigosContratos_SELECT = "usp_scco_testigos_contratos_select";
        public TestigosContratos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_TestigosContratos_SELECT, null, "scco_testigos_contratos")
        { }
    }
}