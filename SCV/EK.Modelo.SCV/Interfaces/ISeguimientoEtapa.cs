using System;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface ISeguimientoEtapa : m.Kontrol.Interfaces.IBaseKontrol
    {
        int IdSeguimiento { get; set; }
        m.SCV.Interfaces.ISeguimiento Seguimiento { get; set; }

        int IdEtapa { get; set; }
        m.SCV.Interfaces.IEtapa Etapa { get; set; }

        int IdEsquema { get; set; }
        m.SCV.Interfaces.IEsquema Esquema { get; set; }

        int? Orden { get; set; }
        int? PlazoVencimiento { get; set; }
        int? DiasParaCulminarEtapa { get; set; }
        DateTime FechaInicio { get; set; }
        DateTime FechaVencimiento { get; set; }
        DateTime FechaCierre { get; set; }

        int? IdEstatusEtapa { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusEtapa { get; set; }

        int? IdAreaResponsable { get; set; }
        m.Kontrol.Interfaces.IItemGeneral AreaResponsable { get; set; }

        int? IdWorkFlow { get; set; }
        m.Kontrol.Interfaces.IWorkflow WorkFlow { get; set; }

        m.SCV.Interfaces.IFaseExpediente Fase { get; set; }
        int IdFase { get; set; }

        int IdCentroCosto { get; set; }
        m.Kontrol.Interfaces.ICentrosCosto CentroCosto { get; set; }

        int? IdPosicion { get; set; }
        m.Kontrol.Interfaces.IPosicion Posicion { get; set; }

        int? ReadOnlyKontrol { get; set; }
    }
}
