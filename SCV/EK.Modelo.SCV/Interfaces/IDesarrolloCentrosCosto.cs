using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Desarrollos_CentrosCosto")]
    public interface IDesarrolloCentrosCosto
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdCentroCosto { get; set; }

        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }

        [m.Kontrol.Column()]
        int IdTipoCentroCosto { get; set; }



        [m.Kontrol.Column()]
        bool? Principal { get; set; }

        m.Kontrol.Interfaces.ICentrosCosto CentroCosto { get; set; }
        List<IEntidadCaracteristica> CaracteristicasCentrosCosto { get; set; }
        
    }
}