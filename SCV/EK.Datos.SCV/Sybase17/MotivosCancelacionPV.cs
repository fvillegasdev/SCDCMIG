using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class MotivosCancelacionPV
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IMotivosCancelacionPV>, d.SCV.Interfaces.IMotivosCancelacionPV
    {
        private const string USP_SPV_MOTIVOS_CANCELACION_SELECT = "usp_spv_motivos_cancelacion_select";

        public MotivosCancelacionPV(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_MOTIVOS_CANCELACION_SELECT, null, "sv_motivos_cancelacion")
        { }
    }
}
