using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_tabuladores")]
    public interface ITabulador
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdMoneda { get; set; }
        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }

        List<m.SCCO.Interfaces.ITabuladorInsumo> Insumos { get; set; }
    }
}