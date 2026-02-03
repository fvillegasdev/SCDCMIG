using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Sindicatos
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISindicato>, d.SCV.Interfaces.ISindicatos
    {
        private const string USP_SCV_SINDICATOS_SELECT = "usp_scv_sindicatos_select";
        public Sindicatos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_SINDICATOS_SELECT, null, "scv_Sindicatos") { }
    }
}
