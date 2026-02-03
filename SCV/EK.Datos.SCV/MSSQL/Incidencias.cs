using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Incidencias
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IIncidencia>, d.SCV.Interfaces.IIncidencias
    {
        private const string USP_SPV_INCIDENCIAS_SELECT = "usp_spv_Incidencias_select";
        public Incidencias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_INCIDENCIAS_SELECT, null, "spv_Incidencia")
        { }
    }
}