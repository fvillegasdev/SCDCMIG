using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("Reportes")]
    public interface IReporte
        : IBaseKontrol
    {
        [Column()]
        int? IdEntidad { get; set; }
        m.Kontrol.Interfaces.IEntidad Entidad { get; set; }
        List<m.Kontrol.Interfaces.IReporteCampo> Campos { get; set; }
        List<m.Kontrol.Interfaces.IReporteFiltro> Filtros { get; set; }
        [Column()]
        string SubTitulo { get; set; }
        [Column()]
        int? IdPlantillaEnc { get; set; }
        [Column()]
        int? IdPlantillaPP { get; set; }
        m.Kontrol.Interfaces.IPlantillasMails PlantillaEnc { get; set; }
        m.Kontrol.Interfaces.IPlantillasMails PlantillaPP { get; set; }
        [Column()]
        int IdCategoria { get; set; }
        [Column()]
        int IdTipoReporte { get; set; }
        int IdReportePBI { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Categoria { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoReporte { get; set; }
        m.Kontrol.Interfaces.IItemGeneral ReportePBI { get; set; }
        [Column()]
        string ReportePBIClave { get; set; }
        [Column()]
        string ReportePBINombre { get; set; }
    }
}