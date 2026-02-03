using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SDC.Interfaces
{
    [m.Kontrol.Table("SDC_EstadoCuenta")]
    public interface IEstadoCuenta
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdConcepto { get; set; }


        [m.Kontrol.Column()]
        decimal Cuota { get; set; }


        [m.Kontrol.Column()]
        int IdPeriodicidad { get; set; }


        [m.Kontrol.Column()]
        int IdCliente { get; set; }


        [m.Kontrol.Column()]
        int IdUbicacion { get; set; }



        m.SCV.Interfaces.ICliente Cliente { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }


        m.Kontrol.Interfaces.IPeriodicidadDetalle PeriodicidadDetalle { get; set; }
        m.SDC.Interfaces.IConceptosCuota Concepto { get; set; }



    }
}