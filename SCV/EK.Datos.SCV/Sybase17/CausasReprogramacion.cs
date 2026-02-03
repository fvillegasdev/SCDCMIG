using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class CausasReprogramacion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICausasReprogramacion>, d.SCV.Interfaces.ICausasReprogramacion
    {
        private const string USP_SPV_CAUSAS_REPROGRAMACION_SELECT = "usp_spv_causas_reprogramacion_select";

        public CausasReprogramacion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CAUSAS_REPROGRAMACION_SELECT, null, "spv_causas_reprog")
        { }
    }
}
