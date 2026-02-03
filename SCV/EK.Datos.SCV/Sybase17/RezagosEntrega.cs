using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class RezagosEntrega
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IRezagosEntrega>, d.SCV.Interfaces.IRezagosEntrega
    {
        private const string USP_SV_REZAGOS_ENTREGA_SELECT = "usp_sv_rezagos_entrega_select";

        public RezagosEntrega(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SV_REZAGOS_ENTREGA_SELECT, null, "sv_rezagos_entrega")
        { }
    }
}
