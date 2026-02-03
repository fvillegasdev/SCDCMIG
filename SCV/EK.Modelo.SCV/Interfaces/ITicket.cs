using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Tickets")]
    public interface ITicket
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdExpediente { get; set; }

        [m.Kontrol.Column()]
        int IdVentaUbicacion { get; set; }

        IUbicaciones Ubicacion { get; set; }
        [m.Kontrol.Column("IdUbicacion",true)]
        int IdUbicacion { get; set; }


        IContratista ResponsableConstruccion { get; set; }


        [m.Kontrol.Column()]
        DateTime FechaReporte { get; set; }

        [m.Kontrol.Column()]
        int IdResponsableConstruccion { get; set; }
        
        
        [m.Kontrol.Column("IdMedioSolicitud")]
        int IdMedioSolicitud { get; set; }
        m.Kontrol.Interfaces.IItemGeneral MedioSolicitud { get; set; }

        [m.Kontrol.Column("IdEstatusTicket")]
        int IdEstatusTicket { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusTicket { get; set; }




        [m.Kontrol.Column()]
        string   ObservacionesCliente { get; set; }

        [m.Kontrol.Column()]
        string ObservacionesContratista { get; set; }

        [m.Kontrol.Column("IdCliente", true)]
        int IdCliente { get; set; }
        m.SCV.Interfaces.ICliente Cliente { get; set; }



        [m.Kontrol.Column("IdExpedienteUbicacion", true)]
        int IdExpedienteUbicacion { get; set; }
        m.SCV.Interfaces.IExpedienteUbicacion ExpedienteUbicacion { get; set; }



        List<m.SCV.Interfaces.IClienteContactos> Contactos { get; set; }
        List<m.SCV.Interfaces.IIncidencia> Incidencias { get; set; }

        List<m.SCV.Interfaces.IIncidencia> Partidas { get; set; }


        List<m.SCV.Interfaces.IOrdenTrabajo> OrdenesTrabajo { get; set; }

        [m.Kontrol.Column()]
        int IdContratistaResponsable { get; set; }



        //Exclude
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        #region "CAMPOS CALCULADOS"
        
        int DiasTranscurridos { get; set; }

        [m.Kontrol.Column("DiasSolucion")]
        int? DiasSolucion { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaPosibleSolucion { get; set; }
        


        #endregion
    }
}