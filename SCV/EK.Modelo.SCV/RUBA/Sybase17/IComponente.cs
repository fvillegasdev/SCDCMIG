using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_equivalencias_familias")]
    public interface IComponente : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("clave_equivalencia")]
        int? IdEquivalencia { get; set; }

        [m.Kontrol.Column("desc_fam_equivalente")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("clave_tipo_falla")]
        int IdTipoFalla { get; set; }
        m.SCV.Interfaces.ITipoComponente TipoFalla { get; set; }

        [m.Kontrol.Column("clave_falla")]
        int IdFalla { get; set; }
        m.SCV.Interfaces.IFalla Falla { get; set; }
    }
}