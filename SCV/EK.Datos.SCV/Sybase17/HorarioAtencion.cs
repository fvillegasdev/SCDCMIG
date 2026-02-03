using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class HorarioAtencion
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IHorarioAtencion>, d.SCV.Interfaces.IHorarioAtencion
    {
        private const string USP_SPV_BASE_SELECT = "usp_spv_horarios_atencion_select";
        public HorarioAtencion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_BASE_SELECT, null, "spv_horarios_atencion")
        { }
    }
}