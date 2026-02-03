using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ComisionesProcesosPeriodos :
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesProcesoPeriodos>, d.SCV.Interfaces.IComisionesProcesoPeriodos
    {
        private const string ENTITY_NAME = "scv_ComisionesProcesosPeriodos";
        private const string USP_SCV_COMISIONES_PROCESOS_PERIODOS_SELECT = "usp_scv_ComisionesProcesosPeriodos_select ";

        public ComisionesProcesosPeriodos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
          : base(factory, helper, USP_SCV_COMISIONES_PROCESOS_PERIODOS_SELECT, null, ENTITY_NAME)
        { }

    }
}
