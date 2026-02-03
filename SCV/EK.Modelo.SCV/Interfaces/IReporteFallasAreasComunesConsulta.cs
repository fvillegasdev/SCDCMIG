using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IReporteFallasAreasComunesConsulta : m.Kontrol.Interfaces.IBaseKontrol
    {

        string IdPlazaInicial { get; set; }
        m.SCV.Interfaces.IPlaza PlazaInicial { get; set; }

        string IdVocacion { get; set; }
        m.SCV.Interfaces.IVocacionSPV Vocacion { get; set; }

        List<m.SCV.Interfaces.IFraccionamientos> Fraccionamientos { get; set; }

        int? IdContratista { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }

        int? IdMedioSolicitud { get; set; }
        m.Kontrol.Interfaces.IItemGeneral MedioSolicitud { get; set; }

        DateTime? FechaInicial { get; set; }

        DateTime? FechaFinal { get; set; }

        int? IdTipoFalla { get; set; }
        m.SCV.Interfaces.ITipoComponente TipoFalla { get; set; }

        int? IdFalla { get; set; }
        m.SCV.Interfaces.IFalla Falla { get; set; }

        int? IdCausaFalla { get; set; }
        m.SCV.Interfaces.ICausaFalla CausaFalla { get; set; }

        string OpcionProcede { get; set; }

        string OpcionCancelado { get; set; }
        string OpcionesDiagEstatus { get; set; }
        string OpcionesPartDiagEstatus { get; set; }
        string OpcionesEstatusFolio { get; set; }
        string OpcionesEstatusOT { get; set; }
        int NotivoCancelacion { get; set; }
    }
}
