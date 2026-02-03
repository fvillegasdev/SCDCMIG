using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_TiposUbicacion")]
    public interface ITiposUbicacion
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        bool UnidadDeVentaMinima { get; set; }
    }
}
