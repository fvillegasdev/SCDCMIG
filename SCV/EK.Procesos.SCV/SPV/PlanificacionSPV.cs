using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using NT = EK.Drivers.Notifications;
using System.Dynamic;
using System.Linq;

namespace EK.Procesos.SCV
{
    public class PlanificacionSPV : p.Kontrol.BPBase<m.SCV.Interfaces.IPlanificacionSPV, d.SCV.Interfaces.IPlanificacionSPV>,
        p.SCV.Interfaces.IPlanificacionSPV
    {
        public PlanificacionSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IPlanificacionSPV dao)
            : base(factory, dao, "PlanificacionSPV")
        {
        }

        public async override Task<m.SCV.Interfaces.IPlanificacionSPV> Save(m.SCV.Interfaces.IPlanificacionSPV item)
        {
            var retValue = Get<m.SCV.Interfaces.IPlanificacionSPV>();
            var daoPlanificacionDetalle = Get<d.SCV.Interfaces.IPlanificacionSPVDetalle>();
            var daoPlanificacionDetalleTime = Get<d.SCV.Interfaces.IPlanificacionSPVDetalleTime>();
            var daoCatalogosGenerales = Get<d.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var TipoTarea = await daoCatalogosGenerales.GetByClave("TipoAgenda", item.TipoAgenda);

            //Estatus inicial para cada tarea y su detalle (Actividad)
            var EstatusPlanificacion = await daoCatalogosGenerales.GetByClave("ESTATUSTAREASPVPLAN", "TAREACON");
            var EstatusPlanificacionDet = await daoCatalogosGenerales.GetByClave("ESTATUSACTSPVPLAN", "ACTENP");


            item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
            item = await Assign(item);
            item.IdTipoTarea = (Int32)TipoTarea.ID;
            item.IdEstatusPlanificacion = (Int32)EstatusPlanificacion.ID;
            string claveTipoTarea = item.TipoAgenda;
            string Entidad = "";
            switch (claveTipoTarea)
            {
                case "FechaConstruccion":
                    Entidad = "Ubicaciones";
                    break;
                case "EntregaVivienda":
                    Entidad = "Ubicaciones";
                    break;
                case "Contratista":
                    Entidad = "Ubicaciones";
                    break;
                case "Dictamen":
                    Entidad = "Ubicaciones";
                    break;
            }
            try
            {
                BeginTransaction();

                var planificado = item.Planificado;

                foreach (var p in planificado)
                {
                    retValue = await this.dao.SaveEntity(item, true, false);
                    var actividades = item.Actividades;

                    foreach (var a in actividades)
                    {
                        var actividad = Get<m.SCV.Interfaces.IPlanificacionSPVDetalle>();
                        var tiempo = Get<m.SCV.Interfaces.IPlanificacionSPVDetalleTime>();
                        actividad.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        actividad.IdPlanificacion = (Int32)retValue.ID;
                        actividad.IdRecurso = (Int32)a.Recurso.ID;
                        actividad.Entidad = Entidad;
                        actividad.IdEntidad = (Int32)p.ID;
                        actividad.IdEstatusPlanificacionDet = (Int32)EstatusPlanificacionDet.ID;
                        actividad.Estate = await Validaciones(a.HoraInicio, a.HoraFin, (Int32)a.Recurso.ID);
                        //Pendiente de validar actividad.Estate
                        actividad = await daoPlanificacionDetalle.SaveEntity(actividad, false, false);

                        tiempo.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        tiempo.IdPlanificacionDetalle = (Int32)actividad.ID;
                        tiempo.Fecha = a.Fecha;
                        tiempo.HoraInicio = a.HoraInicio.ToLocalTime();
                        tiempo.HoraFin = a.HoraFin.ToLocalTime();
                        tiempo = await daoPlanificacionDetalleTime.SaveEntity(tiempo, false, false);

                    }
                }
                //object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                //await SendNotificationNewKalendar(userTarge, "NOTIFICAR-NUEVA-AGENDA-USUARIO", linkTarea, obj, parametros);
                Commit();

                retValue.Actividades = item.Actividades;
                retValue.Planificado = item.Planificado;
                retValue.Recurso = item.Recurso;
                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IPlanificacionSPVDetalle> SaveAtencion(m.SCV.Interfaces.IPlanificacionSPVDetalle item)
        {
            var retValue = Get<m.SCV.Interfaces.IPlanificacionSPVDetalle>();
            var daoPlanificacionDetalle = Get<d.SCV.Interfaces.IPlanificacionSPVDetalle>();
            var daoPlanificacionDetalleTime = Get<d.SCV.Interfaces.IPlanificacionSPVDetalleTime>();
            var daoCatalogosGenerales = Get<d.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var planificacionSPVDetalleAnterior = await daoPlanificacionDetalle.GetById((Int32)item.ID);
            string Estatus = item.EstatusDashboard;

            //Estatus inicial para detalle (Actividad)
            var EstatusPlanificacionDet = await daoCatalogosGenerales.GetByClave("ESTATUSACTSPVPLAN", "ACTENP");
            var EstatusPlanificacionDetAnterior = await daoCatalogosGenerales.GetByClave("ESTATUSACTSPVPLAN", Estatus);
            try
            {
                BeginTransaction();

                var actividad = Get<m.SCV.Interfaces.IPlanificacionSPVDetalle>();
                var actividadAnterior = Get<m.SCV.Interfaces.IPlanificacionSPVDetalle>();
                var tiempo = Get<m.SCV.Interfaces.IPlanificacionSPVDetalleTime>();

                actividadAnterior.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                actividadAnterior.ID = (Int32)planificacionSPVDetalleAnterior.ID;
                actividadAnterior.Version = planificacionSPVDetalleAnterior.Version;
                actividadAnterior.IdEstatusPlanificacionDet = (Int32)EstatusPlanificacionDetAnterior.ID;

                switch (Estatus)
                {
                    case "ACTREP":
                        //Se actualiza Estatus Actividad Anterior
                        actividadAnterior.Observaciones = item.Observaciones;
                        actividadAnterior.IdMotivoReprogramacion = /*(Int32)item.IdMotivoReprogramacion*/ 1;
                        actividadAnterior = await daoPlanificacionDetalle.SaveEntity(actividadAnterior, false, false);

                        //Se inserta nueva Actividad con relación a la Actividad Reprogramada
                        actividad.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        actividad.IdPlanificacion = planificacionSPVDetalleAnterior.IdPlanificacion;
                        actividad.IdRecurso = (Int32)item.Recurso.ID;
                        actividad.IdPadre = (Int32)planificacionSPVDetalleAnterior.ID;
                        actividad.Entidad = planificacionSPVDetalleAnterior.Entidad;
                        actividad.IdEntidad = (Int32)planificacionSPVDetalleAnterior.IdEntidad;
                        actividad.IdEstatusPlanificacionDet = (Int32)EstatusPlanificacionDet.ID;
                        actividad.Estate = await Validaciones(item.HoraInicio, item.HoraFin, (Int32)item.Recurso.ID);
                        //Pendiente de validar actividad.Estate
                        actividad = await daoPlanificacionDetalle.SaveEntity(actividad, false, false);

                        //Se inserta detalle de tiempo de nueva Actividad
                        tiempo.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        tiempo.IdPlanificacionDetalle = (Int32)actividad.ID;
                        tiempo.Fecha = item.HoraInicio;
                        tiempo.HoraInicio = item.HoraInicio.ToLocalTime();
                        tiempo.HoraFin = item.HoraFin.ToLocalTime();
                        tiempo = await daoPlanificacionDetalleTime.SaveEntity(tiempo, false, false);
                        break;

                    case "ACTATN":
                        //Se actualiza Estatus Actividad Actual Atencion
                        actividadAnterior.Observaciones = item.Observaciones;
                        actividadAnterior = await daoPlanificacionDetalle.SaveEntity(actividadAnterior, false, false);
                        break;

                }

                Commit();

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }
        //public async Task<object> GetAgendaDetalleCita(Dictionary<string, object> parametros)
        //{
        //    if (parametros["IdAgendaDetalle"] == null)
        //    {
        //        parametros["IdAgendaDetalle"] = 0;
        //    }

        //    var parametros1 = new Dictionary<string, object>();
        //    parametros1.Add("IdAgenda", parametros["IdAgenda"]);
        //    parametros1.Add("IdAgendaDetalle", parametros["IdAgendaDetalle"]);

        //    switch (parametros["ClaveTipoAgenda"].ToString())
        //    {
        //        case "FechaConstruccion":
        //        case "EntregaVivienda":
        //            var bpFechaConstruccionEntrega = Get<p.SCV.Interfaces.IConsultaViviendaEntregable>();
        //            return await bpFechaConstruccionEntrega.GetAgendaDetalleCita(Convert.ToInt32(parametros["IdAgenda"]), Convert.ToInt32(parametros["IdAgendaDetalle"]));
        //        default:
        //            return null;
        //    }
        //}

        public async Task<m.Kontrol.Interfaces.ICalendar> GetPlanificacionCalendar(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            var idUser = base.getUserId();
            var retValue = Get<m.Kontrol.Interfaces.ICalendar>();
            var daoPlanificacionDetalle = Get<d.SCV.Interfaces.IPlanificacionSPVDetalle>();


            retValue.ProdID = "-//enkontrol.com//Task & Events Calendar//END";
            retValue.Version = "2.0";
            retValue.Events = new List<m.Kontrol.Interfaces.ICalendarEvent>();

            parametros.Remove("IdPlazas");
            parametros.Remove("IdDesarrollos");
            parametros.Remove("IdPrototipos");

            try
            {
                var planificacionSPVDetalles = await daoPlanificacionDetalle.GetAll(parametros);
                var events = new Dictionary<DateTime, m.Kontrol.Interfaces.ICalendarEvent>();
                if (planificacionSPVDetalles != null)
                {
                    foreach (var t in planificacionSPVDetalles)
                    {
                        string etiqueta;
                        var calendarEvent = Get<m.Kontrol.Interfaces.ICalendarEvent>();
                        var iconoCalendario = "";
                        var colorReserva = t.EstatusPlanificacionDet.BGColor;
                        var titulo_AtenderA = t.TipoTarea.Nombre.ToString();
                        calendarEvent.ID = (Int32)t.ID;
                        calendarEvent.UID = t.ID.ToString();
                        calendarEvent.Categories = "Categories";
                        iconoCalendario = "fa fa-calendar";
                        etiqueta = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + "#F00000" + "\" \"> </I> " +  titulo_AtenderA + "<br> " + "planificado");
                        calendarEvent.Summary = $"{etiqueta }";
                        calendarEvent.DTStart = t.DTStart;
                        calendarEvent.DTEnd = t.DTEnd;
                        calendarEvent.DTStamp = t.Creado.ToString();
                        calendarEvent.Location = "EnKontrol";
                        calendarEvent.Description = "http://enkontrol.com";
                        calendarEvent.BackgroundColor = colorReserva;
                        calendarEvent.TextColor = "#FFFFFF";
                        calendarEvent.TipoAgenda = t.TipoTarea;
                        calendarEvent.AllDay = false;
                        retValue.Events.Add(calendarEvent);
                    }
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetPlanificacionSPVDetalle(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }

            parametros.Remove("IdPlazas");
            parametros.Remove("IdDesarrollos");
            parametros.Remove("IdPrototipos");

            var daoPlanificacionDetalle = Get<d.SCV.Interfaces.IPlanificacionSPVDetalle>();

            try
            {
                var planificacionSPVDetalle = await daoPlanificacionDetalle.GetAll(parametros);

                return planificacionSPVDetalle;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task <List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetViewPrincipalActs(Dictionary<string, object> parametros)
        {
            var idUser = base.getUserId();
            var daoPlanificacion = Get<d.SCV.Interfaces.IPlanificacionSPVDetalle>();

            try
            {
                var planificacionSPVDetalles = await daoPlanificacion.GetViewPrincipalActs(parametros);

                return planificacionSPVDetalles;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetViewActsDet(Dictionary<string, object> parametros)
        {
            var idUser = base.getUserId();
            var daoPlanificacion = Get<d.SCV.Interfaces.IPlanificacionSPVDetalle>();

            try
            {
                var planificacionSPVDetalles = await daoPlanificacion.GetViewActsDet(parametros);

                return planificacionSPVDetalles;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IPlanificacionSPV>> GetRecursosProgramados(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }

            parametros.Remove("IdPlazas");
            parametros.Remove("IdDesarrollos");
            parametros.Remove("IdPrototipos");

            var daoPlanificacionDashboard = Get<d.SCV.Interfaces.IPlanificacionSPVDashboard>();

            return await daoPlanificacionDashboard.GetRecursosProgramados(parametros);
        }

        public async Task SendNotificationNewCalendar(List<m.Kontrol.Interfaces.IUsuario> usuarios, string nombrePlantilla, string link, object obj, Dictionary<string, object> parametros)
        {
            var bpPlantillas = Get<p.Kontrol.Interfaces.IPlantillasMails>();
            var plantilla = await bpPlantillas.GetByClave(nombrePlantilla);

            var Marcadores = base.getMarcadoresValores(plantilla.Plantilla, obj);
            var MarcadoresTitulo = base.getMarcadoresValores(plantilla.Nombre, obj);

            string NombrePlantilla = plantilla.Nombre;
            foreach (var m in MarcadoresTitulo)
            {
                NombrePlantilla = NombrePlantilla.Replace(m.Key.ToString(), m.Value.ToString());
            }

            var bpNotificacion = Get<p.Kontrol.Interfaces.INotification>();
            var daoNotificacion = Get<d.Kontrol.Interfaces.INotification>();
            var notification = await bpNotificacion.GetNewEntity();
            await Assign(notification);
            notification.TrackChanges = true;
            notification.ID = -1;
            //notification.IdEntidad = user.ID;
            notification.Link = link;

            notification.Nombre = NombrePlantilla;
            notification.idplantilla = plantilla.ID.Value;
            //notification.Descripcion = plantilla.Plantilla_Contenido;
            notification.TipoEntidad = "U";
            var not = await daoNotificacion.SaveEntity(notification, false, false);
            //var not = await bpNotificacion.Save(notification);

            var bpNotificacionMarcador = Get<p.Kontrol.Interfaces.INotificacionMarcador>();
            var daoNotificacionMarcador = Get<d.Kontrol.Interfaces.INotificacionMarcadores>();
            var bpNotificacionUsuario = Get<p.Kontrol.Interfaces.INotificacionUsuario>();
            var daoNotificacionUsuario = Get<d.Kontrol.Interfaces.INotificacionUsuario>();
            foreach (var m in Marcadores)
            {
                var notmar = await bpNotificacionMarcador.GetNewEntity();
                await Assign(notmar);

                notmar.idnotificacion = not.ID.Value;
                notmar.marcador = m.Key.ToString();
                notmar.valor = m.Value.ToString();
                List<string> excluir = new List<string>();
                excluir.Add("Clave");
                excluir.Add("Nombre");
                excluir.Add("Creado");
                excluir.Add("Modificado");
                excluir.Add("IdEstatus");
                excluir.Add("ModificadoPor");
                excluir.Add("CreadoPor");
                excluir.Add("IdModificadoPor");
                excluir.Add("IdCreadoPor");
                await daoNotificacionMarcador.SaveEntity(notmar, false, false, excluir);
                //await bpNotificacionMarcador.Save(notmar);
            }

            foreach (var u in usuarios)
            {
                if (u.Email != null)
                {
                    var notusu = await bpNotificacionUsuario.GetNewEntity();
                    notusu.idnotificacion = not.ID.Value;
                    notusu.num = u.ID.Value;
                    List<string> excluir = new List<string>();
                    excluir.Add("Clave");
                    excluir.Add("Nombre");
                    excluir.Add("Creado");
                    excluir.Add("Modificado");
                    excluir.Add("IdEstatus");
                    excluir.Add("ModificadoPor");
                    excluir.Add("CreadoPor");
                    excluir.Add("IdModificadoPor");
                    excluir.Add("IdCreadoPor");
                    await daoNotificacionUsuario.SaveEntity(notusu, false, false, excluir);
                }

            }

        }

        private async Task<bool> Validaciones(DateTime HoraInicio, DateTime HoraFin, int IdRecurso)
        {
            bool retvalue = true;
            var parametros = new Dictionary<string, object>();
            parametros.Add("IdRecurso", IdRecurso);
            var planificacion = await GetPlanificacionCalendar(parametros);
            var eventos = planificacion.Events;
            var vControl = 0;

            var thisDayArray = (from e in eventos
                                where e.DTStart.ToShortDateString() == HoraInicio.ToShortDateString()
                                select e).ToList();
            foreach (var t in thisDayArray)
            {
                retvalue = (t.DTStart <= HoraInicio.ToLocalTime() && t.DTEnd <= HoraInicio.ToLocalTime()) || (t.DTStart >= HoraFin.ToLocalTime() && t.DTEnd >= HoraFin.ToLocalTime());
                if (!retvalue)
                {
                    vControl = retvalue == false ? vControl + 1 : vControl;
                }
            }
            if (vControl > 0)
            {
                retvalue = false;
            }

            return retvalue;
        }
    }
}