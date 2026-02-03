//#if MSSQL
//using System;
//using System.Collections.Generic;
//using m = EK.Modelo;
//using mo = EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol.Interfaces
//{
//    [Table("Agenda")]
//    public interface IAgendaEntVivienda
//        : IBaseKontrol
//    {

//        [m.Kontrol.Column()]
//        int IdAgenda { get; set; }
//        [m.Kontrol.Column()]
//        int IdExpediente { get; set; }
//        [m.Kontrol.Column()]
//        int IdEstatusAgenda { get; set; }
//        [m.Kontrol.Column()]
//        int IdUsuarioAsignado { get; set; }
//        [m.Kontrol.Column()]
//        string TipoAgenda { get; set; }
//        [m.Kontrol.Column("IdAgendaPadre")]
//        int? IdAgendaPadre { get; set; }
//    }
//}
//#endif
