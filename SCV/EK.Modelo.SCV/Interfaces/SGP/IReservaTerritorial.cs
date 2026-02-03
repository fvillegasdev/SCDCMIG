using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SGP.Interfaces
{

    [m.Kontrol.Table("sgp_reservaterritorial")]
    public interface IReservaTerritorial : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Descripcion { get; set; }
    }
}