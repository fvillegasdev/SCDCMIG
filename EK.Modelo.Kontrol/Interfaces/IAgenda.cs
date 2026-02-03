//using System;
//using System.Collections.Generic;

//using m = EK.Modelo;

//namespace EK.Modelo.Kontrol.Interfaces
//{
//    [m.Kontrol.Table("scv_Bitacora")]
//    public interface IAgenda
//        //: m.Kontrol.Interfaces.IBaseKontrol
//    {

//        [m.Kontrol.Column()]
//        int IdEntidad { get; set; }

//        [m.Kontrol.Column()]
//        int IdEvento { get; set; }

//        [m.Kontrol.Column()]
//        string Comentarios { get; set; }

//        [m.Kontrol.Column()]
//        int? IdTipoEntidadPadre { get; set; }

//        [m.Kontrol.Column()]
//        int? IdEntidadPadre { get; set; }

//        [m.Kontrol.Column()]
//        int? IdTipoEntidad { get; set; }

//        [m.Kontrol.Column()]
//        int? IdEntidadPosterior { get; set; }


//        [m.Kontrol.Column("Clave", true)]
//        new string Clave { get; set; }

//        [m.Kontrol.Column("Nombre", true)]
//        new string Nombre { get; set; }

//        [m.Kontrol.Column("Modulo")]
//        string Modulo { get; set; }


//        m.Kontrol.Interfaces.IItemGeneral TipoEntidad { get; set; }
//        m.Kontrol.Interfaces.IBitacoraEventos Evento { get; set; }
//    }
//}