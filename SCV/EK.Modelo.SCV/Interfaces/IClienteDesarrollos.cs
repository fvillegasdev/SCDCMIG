using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m= EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_clientes_Desarrollos")]
    public interface IClienteDesarrollos:
        m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
         int IdCliente { get; set; }
        m.SCV.Interfaces.ICliente Cliente { get; set; }


        [m.Kontrol.Column()]
         int IdDesarrollo { get; set; }

        [m.Kontrol.Column()]
        int? IdBoleta { get; set; }

        
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

    }
}
