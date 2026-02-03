using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class Presupuestos :
        d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IPresupuesto>, d.SCCO.Interfaces.IPresupuestos
    {
        private const string USP_SCCO_PRESUPUESTOS_SELECT = "usp_scco_Presupuestos_select";
        public Presupuestos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_PRESUPUESTOS_SELECT, null, "scco_Presupuestos")
        { }
    }
}