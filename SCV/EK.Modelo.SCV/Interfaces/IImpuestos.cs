using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Impuestos")]
    public interface IImpuestos
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        decimal Porcentaje { get; set; }

        [m.Kontrol.Column()]
        bool RetImp { get; set; }

        [m.Kontrol.Column()]
        int IdTipoImpuesto { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoImpuesto { get; set; }
    }
}
