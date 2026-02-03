using m = EK.Modelo;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("BienesAdicionales")]
    public interface IBienesAdicionales
         : m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IBienesAdicionales>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
