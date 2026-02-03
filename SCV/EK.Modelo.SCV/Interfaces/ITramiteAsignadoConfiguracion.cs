using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Tramite_Asignado_Configuracion")]
    public interface ITramiteAsignadoConfiguracion
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column()]
        int? IdTramite { get; set; }
        m.Kontrol.Interfaces.ICatalogoGeneral Tramite { get; set; }

        [m.Kontrol.Column()]
        int? IdTramiteAsignado { get; set; }
        m.SCV.Interfaces.ITramiteAsignado TramiteAsignado { get; set; }

        [m.Kontrol.Column("Asignado", true)]
        bool? Asignado { get; set; }
    }
}
