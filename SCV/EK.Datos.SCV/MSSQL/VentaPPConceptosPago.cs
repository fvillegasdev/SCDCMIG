using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class VentaPPConceptosPago
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IVentaPPConcepto>, d.SCV.Interfaces.IVentaPPConceptosPago
    {
        private const string USP_SCV_COTIZACIONESPP_CONCEPTOSPAGO_SELECT = "usp_scv_Ventas_PPConceptosPago_select";
        public VentaPPConceptosPago(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_COTIZACIONESPP_CONCEPTOSPAGO_SELECT, null, "scv_Ventas_PPConceptosPago") { }
    }
}
