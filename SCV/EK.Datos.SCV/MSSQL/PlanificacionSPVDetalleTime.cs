using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class PlanificacionSPVDetalleTime
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPlanificacionSPVDetalleTime>, d.SCV.Interfaces.IPlanificacionSPVDetalleTime
    {
        private const string USP_SPV_PLANIFICACIONDETALLETIME_SELECT = "usp_spv_planificacionDetalleTime_Select";

        public PlanificacionSPVDetalleTime(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_PLANIFICACIONDETALLETIME_SELECT, null, "PlanificacionSPVDetalleTime")
        { }

    }
}