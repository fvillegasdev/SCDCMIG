//#if SYBASE17
using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Agenda")]
    public interface IAgenda
        : IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column()]
        int IdTipoAgenda { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoAgenda { get; set; }  

        [m.Kontrol.Column()]
        DateTime FechaInicio { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaFin { get; set; }

        string FechaInicioC { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        string id_identificador_cc { get; set; }

        [m.Kontrol.Column()]
        int anioInicio { get; set; }

        [m.Kontrol.Column()]
        int mesInicio { get; set; }

        [m.Kontrol.Column()]
        string Geolocalizacion { get; set; }

        [m.Kontrol.Column()]
        int IdLocalidad { get; set; }
        m.Kontrol.Interfaces.IAsentamiento Localidad { get; set; }
        IAgenda Calendario { get; set; }
        List<IAgendaEntVivienda> UbicacionesAgenda { get; set; }
        [m.Kontrol.Column("Asignado",true)]
        string Asignado { get; set; }
        IUsuario AsignadoA { get; set; }
        IItemGeneral EstatusAgenda { get; set; }
        [m.Kontrol.Column("EstatusAgendaIcono", true)]
        string EstatusAgendaIcono { get; set; }
        [m.Kontrol.Column("TipoAgendaBgColor", true)]
        string TipoAgendaBgColor { get; set; }
        [m.Kontrol.Column("EstatusAgendaIconoColor", true)]
        string EstatusAgendaIconoColor { get; set; }
        [m.Kontrol.Column("ProcesoEjecutado", true)]
        string ProcesoEjecutado { get; set; }
        [m.Kontrol.Column("TipoAgendaIcono", true)]
        string TipoAgendaIcono { get; set; }
        [m.Kontrol.Column("IdExpediente", false)]
        int IdExpediente { get; set; }
        [m.Kontrol.Column("IdAgendaDetalle", true)]
        int IdAgendaDetalle { get; set; }
        [m.Kontrol.Column("AtenderA", true)]
        string AtenderA { get; set; }
        [m.Kontrol.Column("IdLote", true)]
        string IdLote { get; set; }
        [m.Kontrol.Column("Reserva")]
        bool? Reserva { get; set; }

        [m.Kontrol.Column("HoraInicio", true)]
        string HoraInicio { get; set; }

        [m.Kontrol.Column("IdOrden", true)]
        int IdOrden { get; set; }
        [m.Kontrol.Column("Ubicacion", true)]
        string Ubicacion { get; set; }
        string MotivoRep { get; set; }

        [m.Kontrol.Column()]
        int IdEstatusAgenda { get; set; }

        [m.Kontrol.Column()]
        int IdMotivo { get; set; }

        [m.Kontrol.Column()]
        int IdUsuarioAsignado { get; set; }

        [m.Kontrol.Column()]
        int IdAgendaPadre { get; set; }

        [m.Kontrol.Column()]
        string Observaciones { get; set; }
    }
}
//#endif