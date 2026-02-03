using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SGP.MSSQL
{
    public class ReservaTerritorial
     : d.Kontrol.DAOBaseGeneric<m.SGP.Interfaces.IReservaTerritorial>,
        d.SGP.Interfaces.IReservaTerritorial
    {
        private const string USP_CRITERIOS_SELECT = "usp_sgp_reservaterritorial_select";

        public ReservaTerritorial(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_CRITERIOS_SELECT, null, "sgp_reservaterritorial")
        { }

    }
}
