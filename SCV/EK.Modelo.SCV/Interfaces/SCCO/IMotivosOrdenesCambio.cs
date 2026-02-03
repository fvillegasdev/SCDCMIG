using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_MotivosOrdenesCambio")]
    public interface IMotivosOrdenesCambio
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdTipoOrdenCambio { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoOrdenCambio { get; set; }
    }
}
