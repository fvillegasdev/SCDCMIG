using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ReportesFallasDetalles : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReporteFallaDetalle>, d.SCV.Interfaces.IReportesFallasDetalles
    {
        private const string USP_SPV_REPORTESFALLAS_DETALLE_SELECT = "usp_spv_ReportesFallas_Detalle_select";
        public ReportesFallasDetalles(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_REPORTESFALLAS_DETALLE_SELECT, null, "sv_reporte_det")
        { }
    }
}