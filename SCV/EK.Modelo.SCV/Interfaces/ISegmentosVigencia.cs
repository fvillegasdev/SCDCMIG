using EK.Modelo.Kontrol.Interfaces;
using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("SCV_SegmentosVigencia")]
    public interface ISegmentosVigencia :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdSegmento { get; set; }
        ISegmento Segmento { get; set; }
        [m.Kontrol.Column()]
        decimal PrecioInicial { get; set; }
        [m.Kontrol.Column()]
        decimal PrecioFinal { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
    }
}