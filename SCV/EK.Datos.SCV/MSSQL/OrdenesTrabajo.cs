using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{

    public class OrdenesTrabajo
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IOrdenTrabajo>, d.SCV.Interfaces.IOrdenesTrabajo
    {
        private const string USP_SPV_ORDENES_TRABAJO_SELECT = "usp_spv_Ordenes_Trabajo_select";
        public OrdenesTrabajo(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_ORDENES_TRABAJO_SELECT, null, "spv_ordenes_trabajo")
        { }
    }
}