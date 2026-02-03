using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_clientes_refPersonales")]
    public interface IClienteReferencia
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        //[m.Kontrol.Column("Nombre", true)]
        //new string Nombre { get; set; }
        [m.Kontrol.Column("IdCliente")]
        int IdCliente { get; set; }
        [m.Kontrol.Column("IdTipoReferencia")]
        int IdTipoReferencia { get; set; }
        [m.Kontrol.Column("Apaterno")]
        string ApellidoPaterno { get; set; }
        [m.Kontrol.Column("Amaterno")]
        string ApellidoMaterno { get; set; }
        [m.Kontrol.Column("Telefono")]
        string Telefono { get; set; }
        [m.Kontrol.Column("Celular")]
        string Celular { get; set; }

        [m.Kontrol.Column("IdReferencia")]
        int IdReferencia { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoReferencia { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Referencia { get; set; }

    }
}