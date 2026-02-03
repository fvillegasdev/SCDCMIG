using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class UbicacionesFalla
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IUbicacionesFalla>, d.SCV.Interfaces.IUbicacionesFalla
    {
        private const string USP_SPV_UBICACIONES_FALLA_SELECT = "usp_spv_ubicaciones_falla_select";
        public UbicacionesFalla(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_UBICACIONES_FALLA_SELECT, null, "spv_Ubicaciones_Falla")
        { }
    }
}