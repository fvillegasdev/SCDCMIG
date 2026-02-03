using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IEntidad
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        List<m.Kontrol.Interfaces.IEntidadCampo> Campos { get; set; }
    }
}
