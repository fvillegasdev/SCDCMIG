using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Falla
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IFalla>, d.SCV.Interfaces.IFallas
    {
        private const string USP_SPV_FALLAS_SELECT = "usp_spv_Fallas_select";
        public Falla(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_FALLAS_SELECT, null, "spv_Falla")
        { }
    }
}