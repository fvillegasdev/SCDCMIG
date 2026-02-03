using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;



namespace EK.Procesos.SGP.Interfaces
{
    [m.Kontrol.KontrolName("ReservaTerritorial")]
    public interface IReservaTerritorial
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SGP.Interfaces.IReservaTerritorial>
    {

    }
}
