using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SDC.Interfaces
{
    [m.Kontrol.Table("sdc_ticketsClientes")]
    public interface ITicketCliente
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdExpediente { get; set; }

        [m.Kontrol.Column()]
        int IdVentaUbicacion { get; set; }

        [m.Kontrol.Column()]
        int Calificacion { get; set; }

        [m.Kontrol.Column("IdEstatusTicket")]
        int IdEstatusTicket { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusTicket { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaReporte { get; set; }

        [m.Kontrol.Column()]
        string ObservacionesCliente { get; set; }

        [m.Kontrol.Column("IdMedioSolicitud")]
        int IdMedioSolicitud { get; set; }
        m.Kontrol.Interfaces.IItemGeneral MedioSolicitud { get; set; }

        [m.Kontrol.Column()]
        string Observaciones { get; set; }






        [m.Kontrol.Column("IdCliente", true)]
        int IdCliente { get; set; }
        m.SCV.Interfaces.ICliente Cliente { get; set; }
        [m.Kontrol.Column("IdExpedienteUbicacion", true)]
        int IdExpedienteUbicacion { get; set; }
        m.SCV.Interfaces.IExpedienteUbicacion ExpedienteUbicacion { get; set; }
        [m.Kontrol.Column("IdUbicacion", true)]
        int IdUbicacion { get; set; }
        EK.Modelo.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

    }
}