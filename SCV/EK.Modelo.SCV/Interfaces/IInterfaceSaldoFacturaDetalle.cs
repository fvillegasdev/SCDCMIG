using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("interface_saldo_factura_detalle")]
    public interface IInterfaceSaldoFacturaDetalle
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        /*Save Interface Saldo Factura Detalle*/
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Modificado", true)]
        new DateTime Modificado { get; set; }

        [m.Kontrol.Column("ModificadoPor", true)]
        new int IdModificadoPor { get; set; }
        

        [m.Kontrol.Column()]
        int? Num_documento { get; set; }

        [m.Kontrol.Column()]
        int? Factura { get; set; }

        [m.Kontrol.Column()]
        decimal? Importe { get; set; }
    }
}
