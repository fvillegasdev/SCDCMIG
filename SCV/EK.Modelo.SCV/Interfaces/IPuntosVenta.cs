using EK.Modelo.Kontrol.Interfaces;
using System.Collections.Generic;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_PuntosVenta")]

    public interface IPuntoVenta : IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Direccion { get; set; }



        [m.Kontrol.Column()]
        string Telefono1 { get; set; }

        [m.Kontrol.Column()]
        string Telefono2 { get; set; }

        [m.Kontrol.Column()]
        int? IdLocalidad { get; set; }

        //string CodigoPostal { get; set; }

        m.Kontrol.Interfaces.IAsentamiento Localidad { get; set; }
        List<m.SCV.Interfaces.IPuntosVentaDesarrollos> Desarrollos { get; set; }

    }
}
