using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ExpedientesOwners : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IExpedienteOwner>
        , d.SCV.Interfaces.IExpedientesOwners
    {
        private const string USP_SCV_EXPEDIENTES_OWNERS_SELECT = "usp_scv_Expedientes_Owners_select";
        public ExpedientesOwners(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_EXPEDIENTES_OWNERS_SELECT, null, "scv_Expedientes_Owners")
        { }
    }
}