using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ComisionesProcesos:
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesProceso>, d.SCV.Interfaces.IComisionesProceso
    {
        private const string ENTITY_NAME = "scv_ComisionesProcesos";
        private const string USP_SCV_COMISIONES_PROCESOS_SELECT = "usp_scv_ComisionesProcesos_select ";

        public ComisionesProcesos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
          : base(factory, helper, USP_SCV_COMISIONES_PROCESOS_SELECT, null, ENTITY_NAME)
        { }

    }
}
