using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.MSSQL
{
    public class Criterios
     : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICriterios>,
        d.SCV.Interfaces.ICriterios
    {
        private const string USP_CRITERIOS_SELECT = "usp_scv_Criterios_select";


        public Criterios(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_CRITERIOS_SELECT, null, "scv_Criterios")
        { }

    }
}
