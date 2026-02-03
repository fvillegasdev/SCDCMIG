using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class OrigenFalla
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IOrigenFalla>, d.SCV.Interfaces.IOrigenFalla
    {
        private const string USP_SPV_ORIGEN_FALLA_SELECT = "usp_spv_origen_falla_select";
        public OrigenFalla(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_ORIGEN_FALLA_SELECT, null, "sv_Origen_Falla")
        { }
    }
}