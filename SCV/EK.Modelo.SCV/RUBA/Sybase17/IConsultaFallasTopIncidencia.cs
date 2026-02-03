using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IConsultaFallasTopIncidencia
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        string IdPlazaInicial { get; set; }

        string IdVocacion { get; set; }

        List<m.SCV.Interfaces.IFraccionamientos> Fraccionamientos { get; set; }

        DateTime? FechaInicial { get; set; }

        DateTime? FechaFinal { get; set; }

        string IdProceden { get; set; }

        string IdTipoVisualizacion { get; set; }

        string IdFiltrarPor { get; set; }
        string Segmento { get; set; }
    }
}