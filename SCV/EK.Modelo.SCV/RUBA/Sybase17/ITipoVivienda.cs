using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_tipos_vivienda")]
    public interface ITipoVivienda : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("desc_tipo_vivienda")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("clave_tipo_vivienda")]
        int? IdTipoVivienda { get; set; }

        [m.Kontrol.Column("id_segmento")]
        int? IdSegmento { get; set; }
    }
}