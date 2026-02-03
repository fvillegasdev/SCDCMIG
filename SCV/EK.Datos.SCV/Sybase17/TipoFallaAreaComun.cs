using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class TipoFallaAreaComun
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITipoFallaAreaComun>, d.SCV.Interfaces.ITipoFallaAreaComun
    {
        private const string USP_SPV_TIPO_FALLA_AREA_COMUN_SELECT = "usp_spv_tipo_falla_area_comun_select";
        public TipoFallaAreaComun(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_TIPO_FALLA_AREA_COMUN_SELECT, null, "spv_tipo_falla_area_comun")
        { }
    }
}