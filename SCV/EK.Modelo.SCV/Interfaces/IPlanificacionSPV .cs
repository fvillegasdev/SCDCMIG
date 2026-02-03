using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_planificacion")]
    public interface IPlanificacionSPV
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdTarea { get; set; }

        [m.Kontrol.Column()]
        int IdTipoTarea { get; set; }

        [m.Kontrol.Column()]
        int IdEstatusPlanificacion { get; set; }

        [m.Kontrol.Column()]
        decimal AvanceTarea { get; set; }

        [m.Kontrol.Column()]
        bool NotificacionCorreo { get; set; }

        [m.Kontrol.Column()]
        bool Confirmacion { get; set; }

        [m.Kontrol.Column()]
        bool Recordatorio { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoTarea { get; set; }
        List<m.SCV.Interfaces.IPlanificacionSPVDetalle> Actividades { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Recurso { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusPlanificacion { get; set; }
        List<m.Kontrol.Interfaces.IItemGeneral> Planificado { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        string TipoAgenda { get; set; }


        #region "CANTIDADES DASHBOARD"

        int CantidadTareaPorCon { get; set; }
        int CantidadTareaCom { get; set; }
        int CantidadTareaCancel { get; set; }
        int CantidadTareaDeten { get; set; }
        int CantidadTareaConfirm { get; set; }
        int CantidadActReprogramadas { get; set; }
        int CantidadActAtendidas { get; set; }
        int CantidadActEnProceso { get; set; }
        int CantidadActEnProcesoVencidas { get; set; }
        int CantidadActEnProcesoPorVencer { get; set; }
        int CantidadActEnProcesoATiempo { get; set; }
        int CantidadActSuspendidas { get; set; }

        #endregion

    }
}