using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_PlanificacionDetalle")]
    public interface IPlanificacionSPVDetalle
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdPlanificacion { get; set; }
        [m.Kontrol.Column()]
        int IdRecurso { get; set; }
        [m.Kontrol.Column()]
        string Entidad { get; set; }
        [m.Kontrol.Column()]
        int IdEntidad { get; set; }

        [m.Kontrol.Column()]
        int IdEstatusPlanificacionDet { get; set; }

        [m.Kontrol.Column()]
        int IdPadre { get; set; }

        [m.Kontrol.Column()]
        int IdMotivoReprogramacion { get; set; }
        
        [m.Kontrol.Column()]
        string Observaciones { get; set; }


        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("IdEstatus", true)]
        new string IdEstatus { get; set; }

        m.Kontrol.ItemGeneral TipoTarea { get; set; }
        m.Kontrol.ItemGeneral Tarea { get; set; }
        m.Kontrol.ItemGeneral EstatusPlanificacion { get; set; }
        m.Kontrol.ItemGeneral EstatusPlanificacionDet { get; set; }
        m.Kontrol.Interfaces.IUsuario Recurso { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }
        int IdTipoTarea { get; set; }
        DateTime Fecha { get; set; }
        DateTime HoraInicio { get; set; }
        DateTime HoraFin { get; set; }
        DateTime DTStart { get; set; }
        DateTime DTEnd { get; set; }
        bool Estate { get; set; }
        string FotoRecurso { get; set; }
        string EstatusDashboard { get; set; }
        int DaysDiff { get; set; }

    }
}