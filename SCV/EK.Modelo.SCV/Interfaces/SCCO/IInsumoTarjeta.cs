using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_InsumosTarjetas")]
    public interface IInsumoTarjeta : m.SCCO.Interfaces.IBaseInsumo
    {
       
        /** base excluded **/
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        /** base excluded **/

        [m.Kontrol.Column()]
        int IdTipoTarjeta { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoTarjeta { get; set; }

        [m.Kontrol.Column()]
        int IdInsumo { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        int IdObra { get; set; }
        m.SCCO.Interfaces.IObra Obra { get; set; }

        [m.Kontrol.Column()]
        int IdTipoPresupuesto { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoPresupuesto { get; set; }

        [m.Kontrol.Column()]
        int IdTabulador { get; set; }
        m.SCCO.Interfaces.ITabulador Tabulador { get; set; }

        [m.Kontrol.Column()]
        decimal CostoDirecto { get; set; }

        List<IInsumoTarjetaDetalle> TarjetaInsumos { get; set; }
    }
}