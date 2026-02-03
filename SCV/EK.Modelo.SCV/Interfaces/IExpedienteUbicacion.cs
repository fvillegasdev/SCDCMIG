using System;
using System.Collections.Generic;

using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    public interface IExpedienteUbicacion
        : m.Kontrol.Interfaces.IBaseKontrol
    {


        [m.Kontrol.Column("ID",true)]
        new int ID { get; set; }


        [m.Kontrol.Column()]
        int IdCliente { get; set; }
        m.SCV.Interfaces.ICliente Cliente { get; set; }


        [m.Kontrol.Column()]
        int IdExpediente { get; set; }
        m.SCV.Interfaces.IExpediente Expediente { get; set; }



        [m.Kontrol.Column()]
        int IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        [m.Kontrol.Column("IdVentaUbicacion", true)]
        string IdVentaUbicacion { get; set; }

        [m.Kontrol.Column("MesesTranscurridos", true)]
        int MesesTranscurridos { get; set; }


        [m.Kontrol.Column()]
        int IdContratista { get; set; }




    }
}