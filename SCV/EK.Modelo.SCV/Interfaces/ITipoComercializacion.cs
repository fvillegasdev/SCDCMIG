using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_TiposComercializacion")]

    public interface ITipoComercializacion : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        bool Paquete { get; set; }
    }
}
