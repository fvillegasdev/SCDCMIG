using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.MSSQL
{
    public class DesarrollosSCCO
      : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IDesarrolloSCCO>, d.SCCO.Interfaces.IDesarrollosSCCO
    {
        private const string USP_SCCO = "usp_scv_Desarrollos_select";
        public DesarrollosSCCO(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO, null, "scv_Desarrollos")
        { }
    }
}