using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TiposUbicacion
        :d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITiposUbicacion>,d.SCV.Interfaces.ITiposUbicacion
    {
        private const string USP_SCV_TIPOSUBICACION_SELECT = "usp_scv_TiposUbicacion_select";

        public TiposUbicacion(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            :base(factory,helper,USP_SCV_TIPOSUBICACION_SELECT,null, "scv_TiposUbicacion")
        { }
    }
}
