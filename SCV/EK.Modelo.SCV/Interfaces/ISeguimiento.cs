using System;
using System.Collections.Generic;
using m = EK.Modelo.SCV;
using md = EK.Modelo;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV.Interfaces
{
    public interface ISeguimiento : mk.Interfaces.IBaseKontrol
    {
        int IdEntidadFase { get; set; }
        int IdExpediente { get; set; }
        m.Interfaces.IExpediente Expediente { get; set; }
        int IdFase { get; set; }
        m.Interfaces.IFaseExpediente Fase { get; set; }
        m.Interfaces.IVenta Venta { get; set; }
        int IdVenta { get; set; }
        int IdEsquema { get; set; }
        m.Interfaces.IEsquema Esquema { get; set; }
        int? IdEstatusSeguimiento { get; set; }
        mk.Interfaces.IItemGeneral EstatusSeguimiento { get; set; }
        DateTime? VigenciaEstatus { get; set; }
        int? IdMotivoSuspension { get; set; }
        m.Interfaces.IMotivoSuspension MotivoSuspension { get; set; }
        int? IdMotivoCancelacion { get; set; }
        //mk.Interfaces.IItemGeneral MotivoCancelacion { get; set; }
        m.Interfaces.IMotivosCancelacion MotivoCancelacion { get; set; }
        int? IdMotivoReanudacion { get; set; }
        mk.Interfaces.IItemGeneral MotivoReanudacion { get; set; }
        decimal? CANTIDAD_ORDEN_SEGUIMIENTO { get; set; }
        decimal? CANTIDAD_ORDEN_AVANZADA { get; set; }
        string Justificacion { get; set; }
        int? IdPosicion { get; set; }
        mk.Interfaces.IPosicion Posicion { get; set; }
        List<m.Interfaces.ISeguimientoAutorizado> Autorizados { get; set; }
        md.SCV.Interfaces.ITipoComercializacion TipoComercializacion { get; set; }

        bool AllowEdicion { get; set; }
        string Response { get; set; }
        DateTime? FechaEstimada { get; set; }
    }
}