using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_OrdenTrabajo")]
    public interface IOrdenTrabajo
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        DateTime? FechaInicioEstimadoTrabajo { get; set; }

        
        [m.Kontrol.Column()]
        DateTime? FechaFinEstimadoTrabajo { get; set; }


        [m.Kontrol.Column()]
        DateTime? FechaInicioRealTrabajo { get; set; }


        [m.Kontrol.Column()]
        DateTime? FechaFinRealTrabajo { get; set; }

        [m.Kontrol.Column()]
        string Observaciones { get; set; }

        [m.Kontrol.Column("IdVentaUbicacion",true)]
        int IdVentaUbicacion { get; set; }

        [m.Kontrol.Column()]
        int? IdFallaReal { get; set; }


        [m.Kontrol.Column()]
        int IdContratista { get; set; }

        IContratista Contratista { get; set; }


        [m.Kontrol.Column()]
        int IdCausaReal { get; set; }

        [m.Kontrol.Column()]
        int IdTicket { get; set; }

        


        List<m.SCV.Interfaces.IOrdenTrabajoDetalle> Incidencias { get; set; }
        //List<m.SCV.Interfaces.IOrdenTrabajoDetalle> Partidas { get; set; }

        //List<m.SCV.Interfaces.IOrdenTrabajoDetalle> OTDetalle { get; set; }
        [m.Kontrol.Column("IdEstatusOrdenTrabajo")]
        int IdEstatusOrdenTrabajo { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusOrdenTrabajo { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


    }
}
