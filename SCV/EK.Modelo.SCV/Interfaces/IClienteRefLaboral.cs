using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_clientes_ref_laborales")]
    public interface IClienteRefLaboral
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        [m.Kontrol.Column("Antiguedad")]
        int Antiguedad { get; set; }
        [m.Kontrol.Column("Puesto")]
        string Puesto { get; set; }
        [m.Kontrol.Column("EmpleoActual")]
        bool EmpleoActual { get; set; }
        [m.Kontrol.Column("IdEmpresa")]
        int IdEmpresa { get; set; }
        [m.Kontrol.Column("IdCliente")]
        int IdCliente { get; set; }
        IEmpresa Empresa { get; set; }
    }

    public interface IA {
        string C { get; set; }
        string D { get; set; }
    }

    public interface IB
        : IA
    {
        new string C { get; set; }
    }

    public class CC
        : IB
    {
        public string C { get; set; }
        public string D { get; set; }
    }
}
