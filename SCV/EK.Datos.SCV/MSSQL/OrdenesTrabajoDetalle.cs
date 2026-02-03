using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class OrdenesTrabajoDetalle
       : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IOrdenTrabajoDetalle>, d.SCV.Interfaces.IOrdenesTrabajoDetalles
    {
        private const string USP_SPV_ORDENES_TRABAJO_SELECT = "usp_spv_Ordenes_Trabajo_detalle_select";
        public OrdenesTrabajoDetalle(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_ORDENES_TRABAJO_SELECT, null, "spv_ordenes_trabajo")
        { }
    }
}