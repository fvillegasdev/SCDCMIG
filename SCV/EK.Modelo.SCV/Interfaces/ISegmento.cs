using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sm_segmentos")]
    public interface ISegmento
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("id_segmento")]
        int ID { get; set; }

        [m.Kontrol.Column("abrev_seg")]
        string abrev_seg{ get; set; }

        [m.Kontrol.Column("vocacion")]
        string vocacion { get; set; }

        [m.Kontrol.Column("id_contable")]
        int IdContable { get; set; }

        [m.Kontrol.Column("desc_segmento")]
        string Descripcion { get; set; }
        //#if RUBA
        int? IdTipoVivienda { get; set; }
        //#endif
    }
}