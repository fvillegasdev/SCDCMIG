using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_clientes_Contactos")]
    public interface IClienteContactos
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdCliente { get; set; }

        [m.Kontrol.Column()]
        int IdTipoContacto { get; set; }


        [m.Kontrol.Column()]
        int? IdTipoTelefono { get; set; }

        [m.Kontrol.Column()]
        string Contacto { get; set; }

        [m.Kontrol.Column()]
        string Cargo { get; set; }

        [m.Kontrol.Column()]
        string Extension { get; set; }

        [m.Kontrol.Column()]
        bool Titular { get; set; }


        [m.Kontrol.Column()]
        int? IdVerificacion { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        m.SCV.Interfaces.ICliente Cliente { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoTelefono { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoContacto { get; set; }
        m.SCV.Interfaces.IVerificacion Verificacion { get; set; }


    }
}
