#if RUBA
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Tipo_Falla_Area_Comun")]
    public interface ITipoFallaAreaComun
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("desc_area_falla")]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        string Siglas { get; set; }

        [m.Kontrol.Column("duracion_garantia")]
        int? DuracionGarantia { get; set; }

        [m.Kontrol.Column("id_area_falla")]
        int Clave { get; set; }
    }
}
#endif