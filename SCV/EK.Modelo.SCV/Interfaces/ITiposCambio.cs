using EK.Modelo.Kontrol.Interfaces;
using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("TiposCambio")]

    public interface ITiposCambio
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdMonedaOrigen { get; set; }

        [m.Kontrol.Column()]
        DateTime Fecha { get; set; }

        [m.Kontrol.Column()]
        decimal Valor { get; set; }

        [m.Kontrol.Column()]
        int IdMonedaDestino { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaHasta { get; set; }

        IMoneda MonedaOrigen { get; set; }
        IMoneda MonedaDestino { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


    }


}










