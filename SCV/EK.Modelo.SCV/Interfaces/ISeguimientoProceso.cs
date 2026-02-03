using System;
using mk = EK.Modelo.Kontrol;
using m = EK.Modelo.SCV;

namespace EK.Modelo.SCV.Interfaces
{
    public interface ISeguimientoProceso : mk.Interfaces.IBaseKontrol
    {
        int? IdExpediente { get; set; }
        int? IdFaseExpediente { get; set; }
        m.Interfaces.IFaseExpediente Fase { get; set; }
        int IdSeguimiento { get; set; }

        int IdEtapa { get; set; }
        m.Interfaces.IEtapa Etapa { get; set; }
        mk.Interfaces.IItemGeneral EstatusEtapa { get; set; }

        int IdProceso { get; set; }
        m.Interfaces.IProceso Proceso { get; set; }
        int? IdEstatusProceso { get; set; }
        DateTime FechaEjecucion { get; set; }
        mk.Interfaces.IItemGeneral EstatusProceso { get; set; }
        int IdSeguimientoEtapa { get; set; }
        int? ReadOnlyKontrol { get; set; }

        string Configuracion { get; set; }

    }
}