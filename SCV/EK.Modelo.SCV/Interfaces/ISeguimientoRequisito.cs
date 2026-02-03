using System;
using mk = EK.Modelo.Kontrol;
using m = EK.Modelo.SCV;

namespace EK.Modelo.SCV.Interfaces
{
    public interface ISeguimientoRequisito : mk.Interfaces.IBaseKontrol
    {
        int IdSeguimiento { get; set; }
        m.Interfaces.ISeguimiento Seguimiento { get; set; }
        int IdEtapa { get; set; }
        m.Interfaces.IEtapa Etapa { get; set; }
        int IdRequisito { get; set; }
        m.Interfaces.IRequisito Requisito { get; set; }
        int? IdTipoEntidad { get; set; }
        string Valor { get; set; }
        DateTime? FechaVencimiento { get; set; }
        int IdExpediente { get; set; }
        string Valores { get; set; }
        int IdEstatusRequisito { get; set; }
        mk.Interfaces.IItemGeneral EstatusRequisito { get; set; }
        int? IdWorkFlow { get; set; }
        mk.Interfaces.IWorkflow WorkFlow { get; set; }
        int? ReadOnlyKontrol { get; set; }
    }
}