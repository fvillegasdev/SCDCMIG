using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class OrdenesTrabajoRUBAAreasComunes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes>, d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes
    {
        private const string USP_SPV_ORDENES_TRABAJO_SELECT = "usp_spv_Ordenes_Trabajo_Areas_Comunes_select";
        public OrdenesTrabajoRUBAAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_ORDENES_TRABAJO_SELECT, null, "spv_ordenes_trabajo_areas_comunes")
        { }
    }
}
