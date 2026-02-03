//using System;
//using System.Net;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using EK.Modelo.Kontrol.Interfaces;
//using d = EK.Datos;
//using m = EK.Modelo;
//using p = EK.Procesos;
//using mk = EK.Modelo.Kontrol;


//namespace EK.Procesos.Kontrol
//{
//    public class Agenda
//        : p.Kontrol.BPBase<m.Kontrol.Interfaces.IAgenda, d.Kontrol.Interfaces.IAgenda>, p.Kontrol.Interfaces.IAgenda
//    {
//        public Agenda(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IAgenda dao)
//               : base(factory, dao, "Agenda")
//        {
//        }

//        public override async Task<m.Kontrol.Interfaces.IAgenda> Save(m.Kontrol.Interfaces.IAgenda item)
//        {
//            int idAgenda = -1;
//            var retValue = Get<m.Kontrol.Interfaces.IAgenda>();
//            try
//            {
//                var retValidacion = 0;
//                var idUsuarioAsignado = -1;
//                var idExpediente = -1;
//                foreach (var registros in item.UbicacionesAgenda)
//                {
//                    idUsuarioAsignado = registros.IdUsuarioAsignado;
//                    idExpediente = registros.IdExpediente;
//                }

//                ///////////////// VALIDACION DE LA AGENDA PARA QUE NO PERMITA INCORPORAR NUEVOS EVENTOS EN LOS MISMOS BLOQUES DE FECHA
//                var parametrosValidacion = new Dictionary<string, object>();

//                parametrosValidacion.Add("FechaInicio", item.FechaInicio);
//                parametrosValidacion.Add("FechaFin", item.FechaFin);
//                parametrosValidacion.Add("IdUsuario", idUsuarioAsignado);
//                parametrosValidacion.Add("IdExpediente", idExpediente);
//                parametrosValidacion.Add("TipoAgenda", item.TipoAgenda.Clave);

//                //validacion 1
//                parametrosValidacion.Remove("OperacionEspecificaSP");
//                parametrosValidacion.Add("OperacionEspecificaSP", "NO-PERMITIR-FECHA-MENOR-QUE");
//                retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametrosValidacion);
//                if (retValidacion > 0)
//                {
//                    base.SetReturnInfo(2, "La Fecha de entrega, no puede ser menor a la planificada para la Construcción");
//                    retValue = item;
//                    retValue.Estado = mk.KontrolEstadosEnum.SinCambios;
//                    return retValue;
//                }

//                //validación 2
//                parametrosValidacion.Remove("OperacionEspecificaSP");
//                parametrosValidacion.Add("OperacionEspecificaSP", "NO-REPETIR-FECHA-INICIO");
//                retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametrosValidacion);
//                if (retValidacion > 0)
//                {
//                    base.SetReturnInfo(2, "La Fecha Inicio [" + item.FechaInicio + "] ya esta configurada");
//                    retValue = item;
//                    retValue.Estado = mk.KontrolEstadosEnum.SinCambios;
//                    return retValue;
//                }

//                //validacion 3
//                parametrosValidacion.Remove("OperacionEspecificaSP");
//                parametrosValidacion.Add("OperacionEspecificaSP", "NO-REPETIR-FECHA-FIN");
//                retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametrosValidacion);
//                if (retValidacion > 0)
//                {
//                    base.SetReturnInfo(2, "La Fecha Fin [" + item.FechaFin + "] ya esta configurada");
//                    retValue = item;
//                    retValue.Estado = mk.KontrolEstadosEnum.SinCambios;
//                    return retValue;
//                }
//                ///////////////// FIN DE LA VALIDACION

//                var bpEstatusAgenda = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
//                var EstatusAgenda = await bpEstatusAgenda.Get("AgendaEstatus", "ACT");
//                var estatus = await bpEstatusAgenda.Get("ESTATUS", "A");

//                item.IdEstatus  = estatus.ID; 

//                BeginTransaction(true);
//                //Obtenemos el ultimo ID insertado
//                retValue = await this.saveModel(item);
//                idAgenda = retValue.ID ?? 0;

//                //Obtenemos el Id del Estatus de la Agenda
 
//                var bpUsuarios = Get<p.Kontrol.Interfaces.IUsuario>();
//                idUsuarioAsignado = -1;
//                string linkTarea;
//                foreach (var c in item.UbicacionesAgenda)
//                {
//                    c.IdAgenda = idAgenda;
//                    c.ID = item.ID;
//                    c.IdEstatus = item.IdEstatus;
//                    c.IdCreadoPor = base.getUserId();
//                    c.IdModificadoPor = base.getUserId();

//                    var procesoConst = await dao.SaveAgendaEntVivivienda(c, EstatusAgenda);
//                    if (procesoConst > 0)
//                    {
//                        c.ID = procesoConst;
//                    }
//                    if (idUsuarioAsignado != c.IdUsuarioAsignado)
//                    {
//                        idUsuarioAsignado = c.IdUsuarioAsignado;
//                        var userTarge = await bpUsuarios.GetById(c.IdUsuarioAsignado);
//                        linkTarea = "";
//                        var parametros = new Dictionary<string, object>()
//                        {
//                            { "Link", linkTarea + idAgenda.ToString()
//                            }
//                        };
//                        await SendNotificationNewKalendar(userTarge, "NOTIFICAR-NUEVA-AGENDA", linkTarea, c, parametros);
//                    }
//                }

//                Commit();
//                retValue.UbicacionesAgenda = item.UbicacionesAgenda;
//                retValue.ProcesoEjecutado = item.ProcesoEjecutado;
//                retValue.EstatusAgenda = EstatusAgenda;
//                return retValue;
//            }
//            catch (Exception ex)
//            {
//                Rollback();
//                throw ex;
//            }
//        }

//        public async Task<m.Kontrol.Interfaces.IAgenda> SaveDetProg(Dictionary<string, object> parametros)
//        {
//            parametros.Add("IdUsuario", getUserId());
//            var retValidacion = 0;

//            var retValue = Get<m.Kontrol.Interfaces.IAgenda>();

//            var bpEstatusAgenda = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
//            var EstatusAgenda = await bpEstatusAgenda.Get("AgendaEstatus", "ACT");
//            var estatus = await bpEstatusAgenda.Get("ESTATUS", "A");

//            var idUsuarioAsignado = -1;
//            var idExpediente = -1;
//            //foreach (var registros in item.UbicacionesAgenda)
//            //{
//            //    idUsuarioAsignado = registros.IdUsuarioAsignado;
//            //    idExpediente = registros.IdExpediente;
//            //}
//            //idUsuarioAsignado = (int)parametros["IdUsuarioAsignado"]  ;
//            //idExpediente = (int)parametros["IdExpediente"]; 

//            var parametrosValidacion = new Dictionary<string, object>();
//            // VALIDACION DE LAS FECHAS DE INICIO Y FIN SEGUN LA NUEVA REPROGRAMACION
//            if (parametros["EstatusAgenda"].ToString() == "REP") {
//                retValue.FechaInicio = DateTime.Parse(parametros["FechaInicio"].ToString());
//                retValue.FechaFin = DateTime.Parse(parametros["FechaFin"].ToString());

//                parametrosValidacion.Add("FechaInicio", parametros["FechaInicio"]);
//                parametrosValidacion.Add("FechaFin", parametros["FechaFin"]);
//                parametrosValidacion.Add("IdUsuario", parametros["IdUsuarioAsignado"]);/********************************************************/
//                parametrosValidacion.Add("TipoAgenda", parametros["tipoAgendaCLave"]);/**************************************************************/
//                parametrosValidacion.Add("IdExpediente", parametros["IdExpediente"]);
//                parametrosValidacion.Add("OperacionEspecificaSP", "NO-REPETIR-FECHA-INICIO");

//                //validacion 1
//                parametrosValidacion.Remove("OperacionEspecificaSP");
//                parametrosValidacion.Add("OperacionEspecificaSP", "NO-PERMITIR-FECHA-MENOR-QUE");
//                retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametrosValidacion);
//                if (retValidacion > 0)
//                {
//                    base.SetReturnInfo(2, "La Fecha de entrega, no puede ser menor a la planificada para la Construcción");
//                    //retValue = item;
//                    retValue.Estado = mk.KontrolEstadosEnum.SinCambios;
//                    return retValue;
//                }
//                //validación 2
//                parametrosValidacion.Remove("OperacionEspecificaSP");
//                parametrosValidacion.Add("OperacionEspecificaSP", "NO-REPETIR-FECHA-INICIO");
//                retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametrosValidacion);
//                if (retValidacion > 0)
//                {
//                    base.SetReturnInfo(2, "La Fecha Inicio [" + parametros["FechaInicio"] + "] ya esta configurada");
//                    //retValue = item;
//                    retValue.Estado = mk.KontrolEstadosEnum.SinCambios;
//                    return retValue;
//                }
//                //validacion 3
//                parametrosValidacion.Remove("OperacionEspecificaSP");
//                parametrosValidacion.Add("OperacionEspecificaSP", "NO-REPETIR-FECHA-FIN");
//                retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametrosValidacion);
//                if (retValidacion > 0)
//                {
//                    base.SetReturnInfo(2, "La Fecha Fin [" + parametros["FechaFin"] + "] ya esta configurada");
//                    //retValue = item;
//                    retValue.Estado = mk.KontrolEstadosEnum.SinCambios;
//                    return retValue;
//                }
//                ///////////////// FIN DE LA VALIDACION
//            }
//            /////////////////// FIN DE LA VALIDACION
//            var itemAgendaDetalle = await this.dao.SaveDetProg(parametros);
//            //var agendaCitaBP = Get < EK.Datos..scv.Interfaces.IConsultaViviendaEntregables>();
//            //var AgendaDetalleCita = await this.dao.GetAgendaDetalleCita(IdAgenda, IdAgendaDetalle);

//            //var bpUsuarios = Get<p.Kontrol.Interfaces.IUsuario>();
//            //idUsuarioAsignado = -1;
//            //string linkTarea;
//            //var idAgenda = -1; 
//            //var userTarge = await bpUsuarios.GetById(Convert.ToInt32(parametros["IdUsuarioAsignado"]));
//            //linkTarea = "";
//            //var parametrosNotificacion = new Dictionary<string, object>()
//            //{
//            //    { "Link", linkTarea + idAgenda.ToString()
//            //    }
//            //};
//            //var itemNofificacion = Get<m.Kontrol.Interfaces.IAgenda>();

//            ////itemNofificacion.FechaFin = 
//            ////itemNofificacion.FechaInicio = 
//            ////itemNofificacion.AsignadoA = 

//            //await SendNotificationNewKalendar(userTarge, "NOTIFICAR-REPROGRAMACION-AGENDA", linkTarea, itemNofificacion, parametros);
//            //retValue.UbicacionesAgenda = item.UbicacionesAgenda;
//            //retValue.ProcesoEjecutado = item.ProcesoEjecutado;
//            retValue.EstatusAgenda = EstatusAgenda;
//            retValue.Estado = mk.KontrolEstadosEnum.Exitoso;

//            retValue.IdExpediente = Convert.ToInt32(parametros["IdExpediente"]);
//            //retValue.ID = Convert.ToInt32(parametros["IdExpediente"]);
//            retValue.IdAgendaDetalle = itemAgendaDetalle;
//            return retValue; 
//        }

//        public async Task<m.Kontrol.Interfaces.ICalendar> getAgendaDashBoard(Dictionary<string, object> parametros)
//        {
//            var idUser = base.getUserId();
//            var retValue = Get<m.Kontrol.Interfaces.ICalendar>();
//            retValue.ProdID = "-//enkontrol.com//Task & Events Calendar//END";
//            retValue.Version = "2.0";
//            retValue.Events = new List<m.Kontrol.Interfaces.ICalendarEvent>();
//            var agendaBP = Get<p.Kontrol.Interfaces.IAgenda>();
//            parametros.Add("OperacionEspecificaSP", "AgendaDashBoard");
//            parametros.Add("IdUsuario", getUserId());

//            var agenda = await agendaBP.GetAll(parametros);
//            var events = new Dictionary<DateTime, m.Kontrol.Interfaces.ICalendarEvent>();

//            if (agenda != null)
//            {
//                foreach (dynamic t in agenda)
//                {
//                    DateTime? eventDateStart = t.FechaInicio;
//                    DateTime? eventDateEnd = t.FechaFin;
//                    string etiqueta;
//                    string fondo;
//                    if (eventDateStart != null && eventDateEnd != null)
//                    {
//                        var calendarEvent = Get<m.Kontrol.Interfaces.ICalendarEvent>();
//                        var iconoCalendario = ""; 
//                        calendarEvent.ID = t.ID;
//                        calendarEvent.UID = t.ID.ToString();
//                        calendarEvent.Categories = t.Asignado;// t.TipoAgenda.Nombre;
//                        iconoCalendario = t.TipoAgendaIcono; 
//                        etiqueta = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + t.EstatusAgendaIconoColor + "\" \"> </I> " + t.AtenderA +"<br> "+t.Asignado);
//                        calendarEvent.Summary = $"{etiqueta }";
//                        calendarEvent.DTStart = eventDateStart.Value;
//                        calendarEvent.DTEnd = eventDateEnd.Value;
//                        calendarEvent.DTStamp = t.Creado.ToString("yyyyMMddTHHmmssZ");
//                        calendarEvent.Location = "EnKontrol";
//                        calendarEvent.Description = "http://enkontrol.com";
//                        calendarEvent.BackgroundColor = t.EstatusAgendaIconoColor; 
//                        calendarEvent.TextColor = "#FFFFFF";
//                        calendarEvent.TipoAgenda = t.TipoAgenda;
//                        calendarEvent.AllDay = false;
//                        retValue.Events.Add(calendarEvent);
//                    }
//                }
//            }
//            return retValue;
//        }

//        public async Task<List<m.Kontrol.Interfaces.IAgenda>> getAgendaDashBoardGrid(Dictionary<string, object> parametros)
//        {
//            var agendaBP = Get<p.Kontrol.Interfaces.IAgenda>();
//            parametros.Add("OperacionEspecificaSP", "AgendaDashBoardGrid");
//            parametros.Add("IdUsuario", base.getUserId());
//            return await agendaBP.GetAll(parametros);
//        }

//        public async Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getStateCalendarDashBoard(Dictionary<string, object> parametros)
//        {
//            parametros.Add("OperacionEspecificaSP", "AGENDA-DASHBOARD-ESTADOS");
//            parametros.Add("IdUsuario", getUserId());
//            return await this.dao.getStateCalendarDashBoard(parametros);
//        }

//        public async Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getUsersCalendarDashBoard(Dictionary<string, object> parametros)
//        {
//            parametros.Add("OperacionEspecificaSP", "AGENDA-DASHBOARD-USUARIOS");
//            parametros.Add("IdUsuario", getUserId());
//            return await this.dao.getUsersCalendarDashBoard(parametros);
//        }

//        public async Task<List<m.Kontrol.Interfaces.IAgenda>> getGeoCalendarDashBoard(Dictionary<string, object> parametros)
//        {
//            parametros.Add("OperacionEspecificaSP", "AGENDA-DASHBOARD-GEO");
//            parametros.Add("IdUsuario", getUserId());
//            return await this.dao.getGeoCalendarDashBoard(parametros);
//        }

//        protected async Task SendNotificationNewKalendar(dynamic user, string nombrePlantilla, string link, object obj, Dictionary<string, object> parametros)
//        {
//            var plantilla = await GetPlantilla(nombrePlantilla, obj, parametros);
//            var bpNotificacion = Get<p.Kontrol.Interfaces.INotification>();
//            var notification = await bpNotificacion.GetNewEntity();
//            await Assign(notification);
//            notification.TrackChanges = true;
//            notification.ID = -1;
//            notification.IdEntidad = user.ID;
//            notification.Link = link;
//            notification.Nombre = plantilla.GetNombre();
//            notification.Descripcion = plantilla.ToString();
//            notification.TipoEntidad = "U";
//            await bpNotificacion.Save(notification);
//            //var toUser = new string[] { $"{user.Nombre} {user.Apellidos}<{user.Email}>" };
//            // await SendMail(toUser, plantilla.GetNombre(), plantilla.ToString());
//        }
//    }
//}