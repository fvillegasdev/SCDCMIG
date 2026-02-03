using d = EK.Datos;
using m = EK.Modelo;



namespace EK.Datos.SCV.MSSQL
{
    public class CausasIncidencias :
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICausaIncidencia>, d.SCV.Interfaces.ICausasIncidencias
    {
        private const string USP_SPV_CAUSAS_INCIDENCIAS_SELECT = "usp_Causas_incidencias_select";
        public CausasIncidencias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CAUSAS_INCIDENCIAS_SELECT, null, "svc_causas_incidencia")
        {





        }
    }
}