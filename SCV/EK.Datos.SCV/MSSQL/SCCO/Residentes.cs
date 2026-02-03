using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.MSSQL
{
   
    public class Residentes
      : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IResidentes>, d.SCCO.Interfaces.IResidentes
    {
        private const string USP_SCCO_RESIDENTES_SELECT = "usp_scco_Residentes_select";
        public Residentes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_RESIDENTES_SELECT, null, "scco_Residentes")
        { }        
    }
}