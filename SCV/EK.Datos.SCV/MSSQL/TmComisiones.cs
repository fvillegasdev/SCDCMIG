using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TmComisiones
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITmComisiones>,d.SCV.Interfaces.ITmComisiones
    {
        private const string USP_USP_TM_Comision_SELECT = "usp_scv_TM_Comision_select";

            public TmComisiones(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
                : base(factory, helper, USP_USP_TM_Comision_SELECT, null, "scv_TM_Comisiones") { }
    }
}
