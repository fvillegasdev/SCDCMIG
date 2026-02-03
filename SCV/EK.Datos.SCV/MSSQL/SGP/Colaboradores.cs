using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SGP.MSSQL
{
    public class Colaboradores
     : d.Kontrol.DAOBaseGeneric<m.SGP.Interfaces.IColaboradores>,
        d.SGP.Interfaces.IColaboradores
    {
        private const string USP_COLABORADORES_SELECT = "usp_sgp_proyectoColaboradores_select";

        public Colaboradores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_COLABORADORES_SELECT, null, "sgp_proyectoColaboradores")
        { }

    }
}
