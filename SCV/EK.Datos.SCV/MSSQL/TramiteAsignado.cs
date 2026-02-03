using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TramiteAsignado
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITramiteAsignado>, d.SCV.Interfaces.ITramiteAsignado
    {
        private const string USP_TRAMITE_ASIGNADO = "usp_scv_tramite_asignado_select";

        public TramiteAsignado(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_TRAMITE_ASIGNADO, string.Empty, "tramiteasignado")
        { }
    }
}
