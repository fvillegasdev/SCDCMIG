using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_causas_falla")]
    public interface ICausaFalla
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("desc_causa")]
        string Descripcion { get; set; }
        
        [m.Kontrol.Column("clave_causa")]
        int? IdCausaFalla { get; set; }

        [m.Kontrol.Column("clave_origen")]
        string ClaveOrigen { get; set; }

        [m.Kontrol.Column("desc_origen")]
        string DescripcionOrigen { get; set; }

        [m.Kontrol.Column("abreviatura")]
        string Abreviatura { get; set; }

        [m.Kontrol.Column("activo")]
        int? Activo { get; set; }
        m.SCV.Interfaces.IOrigenFalla FallaOrigen { get; set; }
    }
}