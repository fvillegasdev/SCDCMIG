using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IVistaElemento : IBaseKontrol
    {
        
        int IdElemento { get; set; }
        int IdVista { get; set; }
        string Color { get; set; }
    }
}
