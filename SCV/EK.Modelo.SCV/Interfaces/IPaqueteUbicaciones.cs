using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_PaquetesUbicaciones")]
    public interface IPaqueteUbicaciones
    : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdUbicacion { get; set; }

        [m.Kontrol.Column()]
        int IdPaquete { get; set; }

        [m.Kontrol.Column()]
        int Orden { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }
        m.SCV.Interfaces.IPaquete Paquete { get; set; }
    }
}
