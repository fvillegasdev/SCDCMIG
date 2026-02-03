using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class ReporteFallasAreasComunesPartidas : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReporteFallasAreasComunesPartida>, d.SCV.Interfaces.IReporteFallasAreasComunesPartidas
    {
        private const string USP_REPORTE_AREAS_COMUNES_PARTIDAS = "usp_reporte_areas_comunes_partidas";
        public ReporteFallasAreasComunesPartidas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_REPORTE_AREAS_COMUNES_PARTIDAS, null, "sv_reporte_fallas_areas_comunes_partidas")
        { }
    }
}
