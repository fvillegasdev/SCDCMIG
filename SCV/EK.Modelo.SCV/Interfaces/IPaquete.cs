using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Paquetes")]
    public interface IPaquete
    : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }

        List<m.SCV.Interfaces.IPaqueteUbicaciones> paqueteUbicaciones { get; set; }
    }
}
