using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class Contratos : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IContrato>, d.SCCO.Interfaces.IContratos
    {
        private const string USP_SCCO_CONTRATOS_SELECT = "usp_scco_Contratos_select";
        public Contratos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_CONTRATOS_SELECT, null, "scco_Contratos")
        { }
    }
}