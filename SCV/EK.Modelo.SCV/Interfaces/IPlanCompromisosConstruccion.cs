using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_CompromisoConstruccion")]
    public interface IPlanCompromisosConstruccion
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdExpediente { get; set; }

        [m.Kontrol.Column()]
        int IdVentaUbicacion { get; set; }

        IUbicaciones Ubicacion { get; set; }
        [m.Kontrol.Column("IdUbicacion",true)]
        int IdUbicacion { get; set; }


        //IContratista ResponsableConstruccion { get; set; }


        [m.Kontrol.Column()]
        DateTime FechaReporte { get; set; }

        [m.Kontrol.Column()]
        int IdResponsableConstruccion { get; set; }
        
        


        [m.Kontrol.Column()]
        string   ObservacionesCliente { get; set; }

        [m.Kontrol.Column()]
        string ObservacionesContratista { get; set; }

        [m.Kontrol.Column("IdCliente", true)]
        int IdCliente { get; set; }
        m.SCV.Interfaces.ICliente Cliente { get; set; }



     

        [m.Kontrol.Column()]
        int IdContratistaResponsable { get; set; }


        [m.Kontrol.Column()]
        int DiasTranscurridos { get; set; }



        //Exclude
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        #region "CAMPOS CALCULADOS"
        
      [m.Kontrol.Column("DiasSolucion")]
        int? DiasSolucion { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaPosibleSolucion { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaInicio { get; set; }

        m.SCV.Interfaces.IEtapa Etapa { get; set; }

        [m.Kontrol.Column()]
        int TotalResponsables{ get; set; }



        #endregion
    }
}