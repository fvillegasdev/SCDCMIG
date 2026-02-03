using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class RezagosEntrega
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IRezagosEntrega>, d.SCV.Interfaces.IRezagosEntrega
    {
        private const string USP_SPV_REZAGOS_ENTREGA_SELECT = "usp_spv_rezagos_entrega_select";

        public RezagosEntrega(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_REZAGOS_ENTREGA_SELECT, null, "spv_Rezagos_Entrega")
        { }
    }
}
