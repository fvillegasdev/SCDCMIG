using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IConsultaViviendaEntregableDetallesReprog
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string id_detalle { get; set; }

        [m.Kontrol.Column()]
        string detalle { get; set; }

        [m.Kontrol.Column()]
        bool? Obligatorio { get; set; }

        [m.Kontrol.Column()]
        int? IdCertificacion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Certificacion { get; set; }
    }
}