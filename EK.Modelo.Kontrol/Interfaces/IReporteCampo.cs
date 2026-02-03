using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("ReportesCampos")]
    public interface IReporteCampo
        : IBaseKontrol
    {
        [Column()]
        int IdReporte { get; set; }
        [Column()]
        string Titulo { get; set; }
        [Column()]
        string Width { get; set; }
        [Column()]
        string SourceName { get; set; }
        [Column()]
        string SourceDataType { get; set; }
        [Column()]
        int IdDataType { get; set; }
        m.Kontrol.Interfaces.IItemGeneral DataType { get; set; }
        [Column()]
        int IdAlineacion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Alineacion { get; set; }
    }
}