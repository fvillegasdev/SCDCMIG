using m = EK.Modelo;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("RadarClientes")]
    public interface IRadarClientes
         : m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IRadarCliente>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
