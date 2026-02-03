using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class BitacoraAutorizacionIncidencia : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IBitacoraAutorizacionIncidencia>, d.SCV.Interfaces.IBitacoraAutorizacionIncidencia
    {
        private const string USP_SPV_BITACORAAUTORIZACIONINCIDENCIA_SELECT = "usp_spv_BitacoraAutIncidencia_select";

        public BitacoraAutorizacionIncidencia(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_BITACORAAUTORIZACIONINCIDENCIA_SELECT, null, "sv_reporte_det") { }
    }
}
