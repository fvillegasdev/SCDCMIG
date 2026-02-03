using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;


namespace EK.Procesos.SGP
{
    public class ReservaTerritorial
    : p.Kontrol.BPBase<m.SGP.Interfaces.IReservaTerritorial, d.SGP.Interfaces.IReservaTerritorial>,
    p.SGP.Interfaces.IReservaTerritorial
    {
        public ReservaTerritorial(m.Kontrol.Interfaces.IContainerFactory factory,
            d.SGP.Interfaces.IReservaTerritorial dao)
            : base(factory, dao, "sgp_reservaterritorial")
        {
        }

    }
}