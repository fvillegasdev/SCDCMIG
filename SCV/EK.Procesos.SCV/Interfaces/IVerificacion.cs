using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("verificacion")]
    public interface IVerificacion
        :m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IVerificacion>,p.Kontrol.Interfaces.IBaseProceso
    {

    }
}
