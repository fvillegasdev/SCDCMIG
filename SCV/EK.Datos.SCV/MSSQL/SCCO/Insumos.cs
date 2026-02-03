using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class Insumos : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IInsumo>, d.SCCO.Interfaces.IInsumos
    {
        private const string USP_SCCO_INSUMO_SELECT = "usp_scco_Insumo_select";
        public Insumos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_INSUMO_SELECT, null, "scco_Insumo")
        { }
    }
}