using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
using System.Net;

namespace EK.Procesos.Kontrol
{
    public class TareasManuales
    : BPBase<m.Kontrol.Interfaces.ITareaManual, d.Kontrol.Interfaces.ITareasManuales>, p.Kontrol.Interfaces.ITareasManuales
    {
        public TareasManuales(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ITareasManuales dao)
               : base(factory, dao, "tareasManuales")
        {
        }

        protected override async Task afterSaveItem(ITareaManual item)
        {
            var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
            var bpUsuario = Get<p.Kontrol.Interfaces.IUsuario>();
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

            var parametros = new Dictionary<string, object>()
            {
                { "Link", linkTarea + item.ID.Value.ToString() }
            };
            await SendNotification(await bpUsuario.GetById(item.IdAsignado), "US-TAREA", linkTarea, item, parametros);
        }

        public new async Task<object> GetAll(Dictionary<string, object> parametros)
        {
            if (!parametros.ContainsKey("IdAsignado"))
            {
                parametros.Add("idAsignado", base.getUserId());
            }
            return await this.dao.GetAllTareasManuales(parametros);
        }
        public override async Task<ITareaManual> Save (ITareaManual item)
        {
            ITareaManual retValue = null;
            int idAsignado = item.IdAsignado;
            int idAsignadoOriginal = item.IdAsignado;

            try
            {
                if (item.ID!=null && item.ID!=-1)
                {
                    retValue = await this.GetById(item.ID.Value);
                    idAsignadoOriginal = retValue.IdAsignado;

                }
                item = await base.saveModel(item);

                //if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo || (idAsignado != idAsignadoOriginal))
                //{
                //    await SendMail(idAsignadoOriginal, "US-TAREA", item);
                //}
            }

            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("Save::" + ex.Message, ex);
            }

            return item;
        }
        public async Task<m.Kontrol.Interfaces.ITareaManual> FinalizarTarea(Dictionary<string, object> parametros)
        {
            m.Kontrol.Interfaces.ITareaManual retValue = null;
            object tareaid = string.Empty;

            parametros.TryGetValue("ID", out tareaid);
            int idTarea = Convert.ToInt32(tareaid);

            try
            {
                var bpEstatusCliente = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatustarea = await bpEstatusCliente.Get("ESTADOTAREA", "CO");

                var tarea = await this.GetById(idTarea);
                //Si el cliente es prospecto se convierte en cliente.
                if (tarea != null && estatustarea != null)
                {
                    tarea.IdEstatus = estatustarea.ID.Value;
                    tarea.Changed("IdEstatus", true);

                    tarea.Completado = 100;
                    tarea.Changed("Completado", true);

                    var tareaactualizada = await this.dao.SaveEntity(tarea, false);
                    //Regresamos la informacion del cliente ya con el Estatus Actualizado.
                    retValue = await this.GetById(idTarea);
                }
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("FinalizarTarea::" + ex.Message, ex);
            }

            return retValue;
        }

        public async Task<m.Kontrol.Interfaces.ICalendar> ObtenerTareasManuales(Dictionary<string, object> parametros)
        {
            if (!parametros.ContainsKey("IdAsignado"))
            {
                parametros.Add("idAsignado", base.getUserId());
            }

            var retValue = Get<m.Kontrol.Interfaces.ICalendar>();
            retValue.ProdID = "-//enkontrol.com//Task & Events Calendar//END";
            retValue.Version = "2.0";
            retValue.Events = new List<m.Kontrol.Interfaces.ICalendarEvent>();

            var tareaBP = Get<p.Kontrol.Interfaces.ITareasManuales>();
            var tareasManuales = await tareaBP.GetAll(parametros);
            var events = new Dictionary<DateTime, m.Kontrol.Interfaces.ICalendarEvent>();

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
                    string etiqueta;
                    if (eventDateStart != null && eventDateEnd != null)
                    {
                        var calendarEvent = Get<m.Kontrol.Interfaces.ICalendarEvent>();
                        calendarEvent.ID = t.ID;
                        calendarEvent.UID = Guid.NewGuid().ToString(); 
                        calendarEvent.Categories = t.Tipo.Nombre;
                        etiqueta = WebUtility.HtmlDecode("<I class=\"" + "fa fa-calendar-o" + "\" style=\"color: \"" + t.Tipo.ColorText + "\" \"></I> " + t.Asignado.Nombre);
                        calendarEvent.Summary = $"{etiqueta }";

                        calendarEvent.DTStart = eventDateStart.Value;
                        calendarEvent.DTEnd = eventDateEnd.Value;
                        calendarEvent.DTStamp = t.Creado.ToString("yyyyMMddTHHmmssZ");
                        calendarEvent.Location = "EnKontrol";
                        calendarEvent.Description = "http://enkontrol.com";
                        calendarEvent.Link = $"{linkTarea}{t.ID}";
                        calendarEvent.BackgroundColor = t.Tipo.Color;
                        calendarEvent.TextColor = t.Tipo.ColorText;
                        calendarEvent.AllDay = false;

                        retValue.Events.Add(calendarEvent);
                    }
                }
            }
            return retValue;
        }

    }
}
