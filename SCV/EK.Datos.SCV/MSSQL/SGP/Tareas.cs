using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SGP.MSSQL
{
    public class Tareas
     : d.Kontrol.DAOBaseGeneric<m.SGP.Interfaces.ITareas>,
        d.SGP.Interfaces.ITareas
    {
        private const string USP_TAREAS_SELECT = "usp_sgp_tareas_select";

        public Tareas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_TAREAS_SELECT, null, "sgp_tareas")
        { }

    }
}
