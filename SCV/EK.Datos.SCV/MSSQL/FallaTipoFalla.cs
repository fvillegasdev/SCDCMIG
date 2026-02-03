using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class FallaTipoFalla
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IFallaTipoFalla>, d.SCV.Interfaces.IFallaTipoFalla
    {
        private const string USP_SPV_FALLAS_SELECT = "usp_spv_Fallas_TipoFalla_select";
        public FallaTipoFalla(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_FALLAS_SELECT, null, "spv_Falla_TipoFalla")
        { }
    }
}