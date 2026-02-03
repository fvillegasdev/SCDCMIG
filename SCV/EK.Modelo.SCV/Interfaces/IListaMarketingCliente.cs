using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ListaMarketingCliente")]

    public interface IListaMarketingCliente : m.Kontrol.Interfaces.IBaseKontrol
    {
        
        [m.Kontrol.Column("IdCliente")]
        int? IdCliente { get; set; }


        [m.Kontrol.Column("IdListaMkt")]
        int IdListaMkt { get; set; }

        m.SCV.Interfaces.ICliente Cliente { get; set; }

        m.SCV.Interfaces.ICliente Boleta { get; set; }

        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }
        
        
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        

    }
}
