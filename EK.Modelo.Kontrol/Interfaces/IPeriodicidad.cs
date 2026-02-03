using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("Periodicidad")]
    public interface IPeriodicidad : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Descripcion { get; set; }
    }
}
