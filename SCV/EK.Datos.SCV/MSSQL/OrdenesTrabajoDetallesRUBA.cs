using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.MSSQL
{
    public class OrdenesTrabajoDetallesRUBA :
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBA>, d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA
    {
        private  const string USP_SPV_ORDENES_TRABAJO_DETALLE_SELECT = "usp_spv_Ordenes_Trabajo_Detalle_select";
        public OrdenesTrabajoDetallesRUBA(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, "usp_spv_Ordenes_Trabajo_Detalle_select", null, "spv_ordenes_trabajo_detalle")
        { }
    }
}