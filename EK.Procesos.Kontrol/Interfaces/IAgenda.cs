//using m = EK.Modelo;
//using p = EK.Procesos;

//using System;
//using System.Net;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Procesos.Kontrol.Interfaces
//{
//    [m.Kontrol.KontrolName("Agenda")]
//    public interface IAgenda
//        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IAgenda>, p.Kontrol.Interfaces.IBaseProceso
//    {
//        Task<m.Kontrol.Interfaces.ICalendar> getAgendaDashBoard(Dictionary<string, object> parametros);
//        Task<List<m.Kontrol.Interfaces.IAgenda>> getAgendaDashBoardGrid(Dictionary<string, object> parametros);
//        Task<m.Kontrol.Interfaces.IAgenda> SaveDetProg(Dictionary<string, object> parametros);

//        Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getUsersCalendarDashBoard(Dictionary<string, object> parametros);
//        Task<List<m.Kontrol.Interfaces.IAgenda>> getGeoCalendarDashBoard(Dictionary<string, object> parametros);
//        Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getStateCalendarDashBoard(Dictionary<string, object> parametros);  
//    }
//}