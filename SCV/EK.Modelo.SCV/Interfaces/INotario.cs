using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mkontrol = EK.Modelo.Kontrol;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Notarios")]
    public interface INotario
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        m.Kontrol.Interfaces.IAsentamiento Asentamiento { get; set; }
      //  int _Id { get; set; }
       [m.Kontrol.Column()]
   //     string Nombre { get; set; }

        int NumNotaria { get; set; }
        [m.Kontrol.Column()]
        bool Suplente { get; set; }
        [m.Kontrol.Column()]
        string Direccion { get; set; }
        [m.Kontrol.Column()]
        int IdLocalidad { get; set; }
        [m.Kontrol.Column()]
        string Telefono1 { get; set; }
        [m.Kontrol.Column()]
        string Telefono2 { get; set; }
        [m.Kontrol.Column()]
        string Email { get; set; }
    }
}
