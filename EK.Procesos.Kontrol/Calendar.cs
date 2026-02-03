using System;
using System.Net;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Threading.Tasks;
using EK.Procesos.Kontrol.Interfaces;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Calendar
        : p.Kontrol.ProcesoBase, p.Kontrol.Interfaces.ICalendar
    {
        public Calendar(m.Kontrol.Interfaces.IContainerFactory factory)
            : base(factory, null, "calendario")
        {
        }

        public async Task<m.Kontrol.Interfaces.ICalendar> GetByCurrentUser()
        {
            var idUser = base.getUserId();            
            var retValue = Get<m.Kontrol.Interfaces.ICalendar>();
            //retValue.CalScale = "GREGORIAN";
            //retValue.Method = "PUBLISH";
            retValue.ProdID = "-//enkontrol.com//Task & Events Calendar//END";
            retValue.Version = "2.0";
            retValue.Events = new List<m.Kontrol.Interfaces.ICalendarEvent>();

            var parametros = new Dictionary<string, object>();
            var wm = Get<p.Kontrol.Interfaces.IWorkflowManager>();
            var citasBP = Get<p.Kontrol.Interfaces.ICitas>();
            var tareasBP = Get<p.Kontrol.Interfaces.ITareasManuales>();

            var tasks = await wm.GetAssignedTasks();
            var citas = await citasBP.GetAll(parametros);
            var estatusCompletado = await base.GetCGV("ESTADOTAREA", "CO");
            var tareasManuales = await tareasBP.GetAll(new Dictionary<string, object>() {
                { "idAsignado", base.getUserId() },
                { "idEstatusNot", estatusCompletado.ID.Value}
            });

           

            var events = new Dictionary<DateTime, m.Kontrol.Interfaces.ICalendarEvent>();

            if (tasks != null) {
                var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
                var optionAut = await bpOption.GetByClave("wmAutorizaciones");
                var pm = await GetGlobalParameters("INSTALACION");
                string optionPath = optionAut.Ruta;
                string linkTarea;

                if (optionPath.Contains(":id"))
                {
                    linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}".Replace(":id", "");
                }
                else {
                    if (!optionPath.EndsWith("/")) {
                        linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}/";
                    }
                    else {
                        linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}";
                    }
                }

                foreach (dynamic t in tasks) {
                    DateTime? eventDateStart = t.FechaAsignacion;
                    DateTime? eventDateEnd = t.FechaVigencia;
                    //string eventDateStartStr = eventDateStart == null ? "" : eventDateStart.Value.ToString("yyyy-MM-dd");
                    //string eventDateEndStr = eventDateEnd == null ? "" : eventDateEnd.Value.ToString("yyyy-MM-dd");

                    if (eventDateStart != null && eventDateEnd != null) {
                        var calendarEvent = Get<m.Kontrol.Interfaces.ICalendarEvent>();
                        calendarEvent.ID = t.ID;
                        calendarEvent.UID = Guid.NewGuid().ToString(); // t.Usuario.Email;
                        calendarEvent.Categories = "EKAprobacion";
                        calendarEvent.Summary = $"{t.Nombre} ({t.Instancia.Nombre})";
                        calendarEvent.DTStart = eventDateStart.Value;
                        calendarEvent.DTEnd = eventDateEnd.Value;
                        calendarEvent.DTStamp = t.Creado.ToString("yyyyMMddTHHmmssZ");
                        calendarEvent.Location = "EnKontrol";
                        calendarEvent.Description = "http://enkontrol.com";
                        calendarEvent.Link = $"{linkTarea}{t.ID}";
                        calendarEvent.Ruta = $"{linkTarea}{t.ID}";
                        calendarEvent.AllDay = true;

                        retValue.Events.Add(calendarEvent);
                    }
                }
            }

            if (tareasManuales != null)
            {
                var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
                var optionAut = await bpOption.GetByClave("tareasManuales");
                var pm = await GetGlobalParameters("INSTALACION");
                string optionPath = optionAut.Ruta;
                string linkTarea;

                if (optionPath.Contains(":id"))
                {
                    linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}".Replace(":id", "");
                }
                else
                {
                    if (!optionPath.EndsWith("/"))
                    {
                        linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}/";
                    }
                    else
                    {
                        linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}";
                    }
                }

                foreach (dynamic t in tareasManuales)
                {
                    DateTime? eventDateStart = t.FechaInicio;
                    DateTime? eventDateEnd = t.FechaFin;
                    //string eventDateStartStr = eventDateStart == null ? "" : eventDateStart.Value.ToString("yyyy-MM-dd");
                    //string eventDateEndStr = eventDateEnd == null ? "" : eventDateEnd.Value.ToString("yyyy-MM-dd");

                    if (eventDateStart != null && eventDateEnd != null)
                    {
                        var calendarEvent = Get<m.Kontrol.Interfaces.ICalendarEvent>();
                        calendarEvent.ID = t.ID;
                        calendarEvent.UID = Guid.NewGuid().ToString(); // t.Usuario.Email;
                        calendarEvent.Categories = "EKTarea";
                        calendarEvent.Summary = $"{t.Nombre}";
                        calendarEvent.DTStart = eventDateStart.Value;
                        calendarEvent.DTEnd = eventDateEnd.Value;
                        calendarEvent.DTStamp = t.Creado.ToString("yyyyMMddTHHmmssZ");
                        calendarEvent.Location = "EnKontrol";
                        calendarEvent.Description = "http://enkontrol.com";
                        calendarEvent.Link = $"{linkTarea}{t.ID}";
                        calendarEvent.Ruta = $"{linkTarea}{t.ID}";
                        calendarEvent.BackgroundColor = t.Tipo.Color;
                        calendarEvent.TextColor = t.Tipo.ColorText;
                        calendarEvent.AllDay = false;

                        retValue.Events.Add(calendarEvent);
                    }
                }
            }

            if (citas != null)
            {
                var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
                var optionAut = await bpOption.GetByClave("citas");
                var pm = await GetGlobalParameters("INSTALACION");
                string optionPath = optionAut.Ruta;
                string linkTarea;

                if (optionPath.Contains(":id"))
                {
                    linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}".Replace(":id", "");
                }
                else
                {
                    if (!optionPath.EndsWith("/"))
                    {
                        linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}/";
                    }
                    else
                    {
                        linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}";
                    }
                }

                foreach (dynamic t in citas)
                {
                    DateTime? eventDateStart = t.FechaInicio;
                    DateTime? eventDateEnd = t.FechaFin;
                    //string eventDateStartStr = eventDateStart == null ? "" : eventDateStart.Value.ToString("yyyy-MM-dd HH:mm");
                    //string eventDateEndStr = eventDateEnd == null ? "" : eventDateEnd.Value.ToString("yyyy-MM-dd HH:mm");

                    if (eventDateStart != null && eventDateEnd != null)
                    {
                        var calendarEvent = Get<m.Kontrol.Interfaces.ICalendarEvent>();
                        calendarEvent.ID = t.ID;
                        calendarEvent.UID = Guid.NewGuid().ToString(); // t.Usuario.Email;
                        calendarEvent.Categories = "EKCita";
                        calendarEvent.Summary = $"{t.Descripcion}";
                        calendarEvent.DTStart = eventDateStart.Value;
                        calendarEvent.DTEnd = eventDateEnd.Value;
                        calendarEvent.DTStamp = t.Creado.ToString("yyyyMMddTHHmmssZ");
                        calendarEvent.Location = "EnKontrol";
                        calendarEvent.Description = "http://enkontrol.com";
                        calendarEvent.Link = $"{linkTarea}{t.ID}";
                        calendarEvent.Ruta = $"{linkTarea}{t.ID}";
                        calendarEvent.BackgroundColor = t.TipoCitas.Color;
                        calendarEvent.TextColor = t.TipoCitas.ColorText;
                        calendarEvent.AllDay = false;
                        calendarEvent.GEO = string.IsNullOrEmpty(t.Geolocalizacion) ? string.Empty : t.Geolocalizacion.Replace(" ", string.Empty);
                        //calendarEvent.

                        retValue.Events.Add(calendarEvent);
                    }
                }
            }

            #if SYBASE
            var citasPostVentaDAO = Get<d.Kontrol.Interfaces.IAgenda>();
            var citasPostVenta = await citasPostVentaDAO.GetAll(new Dictionary<string, object>() {
                { "IdUsuario", base.getUserId() },
                { "UsuarioSeleccionado", base.getUserId()},
                { "OperacionEspecificaSP", "AgendaDashBoard"},
                { "FuncionAgenda", "PostVenta"}
            });
            if (citasPostVenta != null)
            {
                var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
                var optionAut = await bpOption.GetByClave("citas");
                var pm = await GetGlobalParameters("INSTALACION");
                string optionPath = optionAut.Ruta;
                string linkTarea;

                if (optionPath.Contains(":id"))
                {
                    linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}".Replace(":id", "");
                }
                else
                {
                    if (!optionPath.EndsWith("/"))
                    {
                        linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}/";
                    }
                    else
                    {
                        linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}";
                    }
                }

                foreach (dynamic t in citasPostVenta)
                {
                    DateTime? eventDateStart = t.FechaInicio;
                    DateTime? eventDateEnd = t.FechaFin;
                    string etiqueta;
                    if (eventDateStart != null && eventDateEnd != null)
                    {
                        var calendarEvent = Get<m.Kontrol.Interfaces.ICalendarEvent>();
                        var iconoCalendario = "";
                        iconoCalendario = t.TipoAgendaIcono;
                        calendarEvent.ID = t.ID;
                        calendarEvent.UID = Guid.NewGuid().ToString(); // t.Usuario.Email;
                        calendarEvent.Categories = t.Asignado; // t.TipoAgenda.Nombre; // "PostVenta";
                       // calendarEvent.Summary = $"{ t.AtenderA}";
                        etiqueta = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + t.EstatusAgendaIconoColor + "\" \"> </I> " + t.AtenderA +"<br> "+t.Asignado);
                        calendarEvent.Summary = $"{etiqueta }";
                        calendarEvent.DTStart = eventDateStart.Value;
                        calendarEvent.DTEnd = eventDateEnd.Value;
                        calendarEvent.DTStamp = t.Creado.ToString("yyyyMMddTHHmmssZ");
                        calendarEvent.Location = "EnKontrol";
                        calendarEvent.Description = "http://enkontrol.com";
                        calendarEvent.Link = $"{linkTarea}{t.ID}";
                        calendarEvent.Ruta = $"{linkTarea}{t.ID}";
                        calendarEvent.BackgroundColor = t.EstatusAgendaIconoColor;
                        calendarEvent.TipoAgenda = t.TipoAgenda;
                        calendarEvent.TextColor = "#FFFFFF";  //t.Tipo.ColorText;
                        calendarEvent.AllDay = false;
                        calendarEvent.GEO = string.IsNullOrEmpty(t.Geolocalizacion) ? string.Empty : t.Geolocalizacion.Replace(" ", string.Empty);
                        //calendarEvent.

                        retValue.Events.Add(calendarEvent);
                    }
                }
            }
            #endif

            return retValue;
        }

        public async Task<string> GetTextCalendar() {
            var calendar = await this.GetByCurrentUser();
            var retValue = new StringBuilder();
            var htmlTemplate = "<!DOCTYPE HTML PUBLIC \" -//W3C//DTD HTML 3.2//EN\">"+
                "<HTML><HEAD><TITLE></TITLE></HEAD><BODY>" +
                "<P>{0}</P>" +
                "<P>Ver: <A HREF=\"{1}\">{1}</A></P>" +
                "{2}" +
                "</BODY></HTML>";

            var parametros = await base.GetGlobalParameters("INSTALACION");
            var mapURL = parametros.Value<string>("MapURL");

            if (calendar != null) {
                retValue.AppendLine("BEGIN:VCALENDAR");
                retValue.AppendLine($"VERSION:{calendar.Version}");
                retValue.AppendLine($"PRODID:{calendar.ProdID}");
                
                //retValue.AppendLine($"METHOD:{calendar.Method}");
                //retValue.AppendLine($"CALSCALE:{calendar.CalScale}");
                foreach (var e in calendar.Events) {
                    string mapURLEvent = string.IsNullOrEmpty(e.GEO) 
                        ? string.Empty :
                        string.Format("<P>Mapa: <A HREF =\"{0}\">{0}</A></P>", mapURL + e.GEO);

                    string mapURLEventText = string.IsNullOrEmpty(e.GEO) ? string.Empty : mapURL + e.GEO;

                    string eventDateStartStr = e.DTStart == null ? "" : e.DTStart.ToString("yyyyMMddTHHmmssZ");
                    string eventDateEndStr = e.DTEnd == null ? "" : e.DTEnd.ToString("yyyyMMddTHHmmssZ");
                    string html = string.Format(htmlTemplate, e.Summary, e.Link, mapURLEvent);

                    retValue.AppendLine("BEGIN:VEVENT");
                    retValue.AppendLine($"UID:{e.UID}");
                    retValue.AppendLine($"CATEGORIES:{e.Categories}");
                    retValue.AppendLine($"DTSTAMP:{e.DTStamp}");
                    retValue.AppendLine($"DTSTART:{eventDateStartStr}");
                    retValue.AppendLine($"DTEND:{eventDateEndStr}");
                    retValue.AppendLine($"DESCRIPTION:{e.Summary} \r\n {e.Link} \r\n {mapURLEventText}");
                    retValue.AppendLine($"X-ALT-DESC;FMTTYPE=text/html:{html}");
                    retValue.AppendLine($"SUMMARY:{e.Summary}");
                    retValue.AppendLine("END:VEVENT");
                }
                retValue.AppendLine("END:VCALENDAR");
            }

            return retValue.ToString();
        }
    }
}