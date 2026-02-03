using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("ReportesFiltros")]
    public interface IReporteFiltro
        : IBaseKontrol
    {
        [Column()]
        int IdReporte { get; set; }
        [Column()]
        string Titulo { get; set; }
        object Value { get; set; }
        [Column("Value")]
        object ValueString { get; set; }
        [Column()]
        string SourceName { get; set; }
        [Column()]
        string SourceDataType { get; set; }
        [Column()]
        int IdDataType { get; set; }
        m.Kontrol.Interfaces.IItemGeneral DataType { get; set; }
        [Column()]
        int IdOperador { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Operador { get; set; }
        [Column()]
        int IdOperadorLogico { get; set; }
        m.Kontrol.Interfaces.IItemGeneral OperadorLogico { get; set; }
    }
}
