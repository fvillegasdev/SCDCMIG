using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class BitacoraAD : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IBitacoraAD>, d.SCCO.Interfaces.IBitacoraAD
    { 
        private const string USP_SCCO_Bitacora_AditivasDeductivas_SELECT = "usp_scco_Bitacora_AditivasDeductivas_select";
        public BitacoraAD(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_Bitacora_AditivasDeductivas_SELECT, null, "scco_Bitacora_AditivasDeductivas")
        { }
    }
}