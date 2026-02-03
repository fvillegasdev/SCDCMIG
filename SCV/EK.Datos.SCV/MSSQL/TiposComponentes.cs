
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TiposComponentes
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITipoComponente>, d.SCV.Interfaces.ITiposComponentes
    {
        private const string USP_SPV_TIPO_FALLA_SELECT = "usp_spv_tipos_componentes_select";
        public TiposComponentes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_TIPO_FALLA_SELECT, null, "spv_Tipos_Componentes")
        { }
    }
}
