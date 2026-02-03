using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class PlanificacionSPV
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPlanificacionSPV>, d.SCV.Interfaces.IPlanificacionSPV
    {
        private const string USP_SPV_PLANIFICACION_SELECT = "usp_spv_planificacion_Select";
        private const string USP_SPV_PLANIFICACIONDETALLETIME_SELECT = "usp_spv_planificacionDetalleTime_Select";

        public PlanificacionSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_PLANIFICACION_SELECT, null, "PlanificacionSPV")
        { }

    }
}