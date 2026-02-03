using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class OrdenesTrabajoDetallesRUBAAreasComunes :
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBAAreasComunes>, d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes
    {
        private const string USP_SPV_ORDENES_TRABAJO_DETALLE_SELECT = "usp_spv_Ordenes_Trabajo_Detalle_Areas_Comunes_select";
        public OrdenesTrabajoDetallesRUBAAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_ORDENES_TRABAJO_DETALLE_SELECT, null, "spv_ordenes_trabajo_detalle_areas_comunes")
        { }
    }
}
