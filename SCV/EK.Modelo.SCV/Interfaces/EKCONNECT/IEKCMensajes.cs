using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces.EKCONNECT
{
    [m.Kontrol.Table("ekc_Mensajes")]
    public interface IEKCMensajes : m.Kontrol.Interfaces.IBaseKontrol
    {
       
        [m.Kontrol.Column("IdChat", true)]
        int IdChat { get; set; }

        [m.Kontrol.Column("Mensaje", true)]
        string Mensaje { get; set; }

        [m.Kontrol.Column("UUId", true)]
        string UUId { get; set; }

        [m.Kontrol.Column("IdTipoMensaje", true)]
        int IdTipoMensaje { get; set; }

        string ClaveTipoMensaje { get; set; }

        [m.Kontrol.Column("IdEntidadEmision", true)]
        int IdEntidadEmision { get; set; }

        [m.Kontrol.Column("IdTipoEntidadEmision", true)]
        int IdTipoEntidadEmision { get; set; }

        [m.Kontrol.Column("IdFileRef", true)]
        int IdFileRef { get; set; }

        [m.Kontrol.Column("IdWA", true)]
        string IdWA { get; set; }

        [m.Kontrol.Column("ChatBot", true)]
        bool ChatBot { get; set; }

        string tipoSalida { get; set; }
    }
}
