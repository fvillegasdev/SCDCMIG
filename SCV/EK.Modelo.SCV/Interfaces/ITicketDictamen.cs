using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Dictamen")]
    public interface ITicketDictamen
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("IdIncidencia")]
        int IdIncidencia { get; set; }



     




        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [m.Kontrol.Column("Comentarios")]
        string Descripcion
        {
            get; set;
        }

        [m.Kontrol.Column("IdEstatusDictamen")]
        int IdEstatusDictamen { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusDictamen { get; set; }



        m.SCV.Interfaces.IIncidencia Incidencia { get; set; }


    }
}