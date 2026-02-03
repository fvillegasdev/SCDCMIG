using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class TipoContratista
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITipoContratista>, d.SCV.Interfaces.ITipoContratista
    {
        private const string USP_SPV_TIPO_CONTRATISTA_SELECT = "usp_spv_tipo_contratista_select";

        public TipoContratista(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_TIPO_CONTRATISTA_SELECT, null, "sv_tipo_contratista")
        { }
    }
}
