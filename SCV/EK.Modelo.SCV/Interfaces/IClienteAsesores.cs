using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_clientes_Asesores")]
    public interface IClienteAsesores
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdCliente { get; set; }

        [m.Kontrol.Column()]
        int IdUsuario { get; set; }

        [m.Kontrol.Column()]
        bool Titular { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }



        m.SCV.Interfaces.ICliente Cliente { get; set; }
        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }

    }
}