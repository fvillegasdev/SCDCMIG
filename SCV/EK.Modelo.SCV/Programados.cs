using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("CapturaFechaConstruccion")]
    public interface IProgramados
        : IBaseKontrol
    {
        [m.Kontrol.Column()]
        string NumCte { get; set; }
        [m.Kontrol.Column()]
        string Desc_detalle { get; set; }
        [m.Kontrol.Column()]
        string detalle { get; set; }
        [m.Kontrol.Column()]
        string Cve_detalle { get; set; }
        [m.Kontrol.Column()]
        bool Bit_reparado { get; set; }
        [m.Kontrol.Column()]
        int Usuario { get; set; }
        [m.Kontrol.Column()]
        int Id_Detalle { get; set; }

        [m.Kontrol.Column()]
        int? IdCertificacion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Certificacion { get; set; }

        [m.Kontrol.Column()]
        bool? Obligatorio { get; set; }
    }
}