using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mkontrol = EK.Modelo.Kontrol;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_CentralesObreras")]
    public interface ICentralObrera 
        : m.Kontrol.Interfaces.IBaseKontrol
    {
    }
}
