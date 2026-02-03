using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces.EKCONNECT
{
    [m.Kontrol.Table("ekc_Chats")]
    public interface IEKCChats : m.Kontrol.Interfaces.IBaseKontrol
    {
        //[m.Kontrol.Column("Id", true)]
        //int Id { get; set; }

        [m.Kontrol.Column("Proceso", true)]
        string Proceso { get; set; }

        [m.Kontrol.Column("IdEntidadProceso", true)]
        int IdEntidadProceso { get; set; }

        [m.Kontrol.Column("IdTipoChat", true)]
        int IdTipoChat { get; set; }

        [m.Kontrol.Column("Contacto", true)]
        string Contacto { get; set; }

        [m.Kontrol.Column("IdEntidad", true)]
        int IdEntidad { get; set; }

        [m.Kontrol.Column("IdTipoEntidad", true)]
        int IdTipoEntidad { get; set; }

        [m.Kontrol.Column("IdCanal", true)]
        int IdCanal { get; set; }

        //[m.Kontrol.Column("IdEstatus", true)]
       //int IdEstatus { get; set; }

        //[m.Kontrol.Column("Creado", true)]
        //DateTime Creado { get; set; }

        //[m.Kontrol.Column("CreadoPor", true)]
        //int CreadoPor { get; set; }

        //[m.Kontrol.Column("Modificado", true)]
        //DateTime Modificado { get; set; }

        //[m.Kontrol.Column("ModificadoPor", true)]
        //int ModificadoPor { get; set; }

        //[m.Kontrol.Column("RV", true)]
        //DateTime RV { get; set; }

        [m.Kontrol.Column("IdEtiqueta", true)]
        int IdEtiqueta { get; set; }

        [m.Kontrol.Column("IdFoto", true)]
        int IdFoto { get; set; }

        [m.Kontrol.Column("AtiendeChatBot", true)]
        bool AtiendeChatBot { get; set; }

        [m.Kontrol.Column("HiloConversacion", true)]
        string HiloConversacion { get; set; }

        string lastMessage { get; set; }
        int cantidadMensajesEntrantes { get; set; }

    }
}
