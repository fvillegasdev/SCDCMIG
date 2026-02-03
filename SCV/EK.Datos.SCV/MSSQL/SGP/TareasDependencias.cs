using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SGP.MSSQL
{
    public class TareasDependencias
     : d.Kontrol.DAOBaseGeneric<m.SGP.Interfaces.ITareasDependencias>,
        d.SGP.Interfaces.ITareasDependencias
    {
        private const string USP_TAREAS_SELECT = "usp_sgp_tareas_dependencias";

        public TareasDependencias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_TAREAS_SELECT, null, "sgp_tareas_dependencias")
        { }

    }
}
