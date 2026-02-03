#if RUBA
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_fallas")]
    public interface IFalla : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("clave_falla")]
        int IdFalla { get; set; }

        [m.Kontrol.Column("clave_tipo_falla")]
        int IdTipoFalla { get; set; }
        m.SCV.Interfaces.ITipoComponente TipoFalla { get; set; }

        [m.Kontrol.Column("clave_tipo_vivienda")]
        int IdTipoVivienda { get; set; }
        m.SCV.Interfaces.ITipoVivienda TipoVivienda { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("desc_falla")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("TiempoRespuesta")]
        decimal TiempoRespuesta { get; set; }

        [m.Kontrol.Column("DuracionGarantia")]
        int? DuracionGarantia { get; set; }

        [m.Kontrol.Column("IdUbicacionFalla")]
        int? IdUbicacionFalla { get; set; }

        [m.Kontrol.Column("ImpactoFalla")]
        string IdImpactoFalla { get; set; }
        m.Kontrol.Interfaces.IItemGeneral ImpactoFalla { get; set; }

        [m.Kontrol.Column("NuevaGarantia")]
        int? NuevaGarantia { get; set; }

        [m.Kontrol.Column("Activo")]
        int? Activo { get; set; }
    }
}
#endif