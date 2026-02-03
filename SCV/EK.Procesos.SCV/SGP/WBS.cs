using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Net;

namespace EK.Procesos.SGP
{
    public class WBS
    : p.Kontrol.BPBase<m.SGP.Interfaces.IWBS, d.SGP.Interfaces.IWBS>,
    p.SGP.Interfaces.IWBS
    {
        public WBS(m.Kontrol.Interfaces.IContainerFactory factory,
            d.SGP.Interfaces.IWBS dao)
            : base(factory, dao, "wbs")
        {
        }

        public async Task<m.SGP.Interfaces.IWBS[]> SaveWBS(m.SGP.Interfaces.IWBS item)
        {
            var retValue = Get<m.SGP.Interfaces.IWBS>();
            var daoTareas = Get<d.SGP.Interfaces.ITareas>();
            var daoProyectos = Get<d.SGP.Interfaces.IProyectos>();
            var daoWBS = Get<d.SGP.Interfaces.IWBS>();
            var daoCatalogosGenerales = Get<d.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var proyecto = await daoProyectos.GetById((Int32)item.IdProyecto);
            int IdProyecto = proyecto.ID >= 1 ? Convert.ToInt32(proyecto.ID) : 0;
            var IdPadre = item.IdPadre >= 1 ? Convert.ToInt32(item.IdPadre) : 0;
            var Tarea = Get<m.SGP.Interfaces.ITareas>();

            //TipoNodo ()
            var TipoNodo = await daoCatalogosGenerales.GetByClave("WBSTipoNodoSGP", "sgp$" + item.Type);
            var TipoNodoRaiz = await daoCatalogosGenerales.GetByClave("WBSTipoNodoSGP", "sgp$proyectos");
            var FlujoAvanceNuevo = await daoCatalogosGenerales.GetByClave("FLUJOAVANCETAREASGP", "NOINICIADA");
            var TipoAvancePorcentaje = await daoCatalogosGenerales.GetByClave("TIPOAVANCETAREASGP", "PORCENTAJE");
            var PrioridadNinguna = await daoCatalogosGenerales.GetByClave("PRIORIDADTAREASGP", "NINGUNA");
            try
            {
                BeginTransaction();
                var padre = Get<m.SGP.Interfaces.IWBS>();
                //se inserta padre si no existe
                if (IdPadre == 0)
                {
                    padre.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    padre.Estatus = item.Estatus;
                    padre.IdEstatus = item.IdEstatus;
                    padre.IdProyecto = IdProyecto;
                    padre.Clave = proyecto.Clave;
                    padre.Nombre = proyecto.Nombre;
                    padre.IdTiponodo = (Int32)TipoNodoRaiz.ID;
                    padre.TieneHijos = true;
                    padre = await daoWBS.SaveEntity(padre, true, false);
                }
                else {
                    padre = await daoWBS.GetById(IdPadre);
                    padre.TieneHijos = true;
                    padre.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    padre = await daoWBS.SaveEntity(padre, true, false);
                }

                if (padre.ID > 0)
                {
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    retValue.Estatus = item.Estatus;
                    retValue.IdEstatus = item.IdEstatus;
                    retValue.IdProyecto = IdProyecto;
                    retValue.Clave = item.Clave;
                    retValue.Nombre = item.Nombre;
                    retValue.IdPadre = padre.ID;
                    retValue.IdTiponodo = (Int32)TipoNodo.ID;
                    retValue = await daoWBS.SaveEntity(retValue, true, false);

                    if (retValue != null)
                    {
                        if (TipoNodo.Clave == "sgp$tareas") {
                            Tarea.FechaEstimadaInicio = item.FechaInicio;
                            Tarea.FechaEstimadaFin = item.FechaFin;
                        }
                        Tarea.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        Tarea.Clave = item.Clave;
                        Tarea.Nombre = item.Nombre;
                        Tarea.Estatus = item.Estatus;
                        Tarea.IdEstatus = item.IdEstatus;
                        Tarea.IdWBS = (Int32)retValue.ID;
                        Tarea.Descripcion = item.Descripcion;
                        Tarea.Contemplaravance = item.Contemplaravance;
                        Tarea.PresentacionGantt = item.PresentacionGantt;
                        Tarea.IdFlujoAvance = (Int32)FlujoAvanceNuevo.ID;
                        Tarea.IdTipoAvance = TipoAvancePorcentaje.ID;
                        Tarea.IdPrioridad = PrioridadNinguna.ID;
                        Tarea.Contemplaravance = true;
                        Tarea = await daoTareas.SaveEntity(Tarea, false, false);
                    }
                }
                Commit();

                var parameters = new Dictionary<string, object> {
                    { "idProyecto", proyecto.ID }
                };
                var e = GetChildrens(await this.dao.GetTreeConfiguration(parameters));
                return e;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }


        public async Task<m.SGP.Interfaces.IWBS[]> DeleteWBSById(Dictionary<string, object> parametros)
        {
            parametros.TryGetValue("ID", out object ID);
            int id = ID != null ? Convert.ToInt32(ID) : 0;
            var item = Get<m.SGP.Interfaces.IWBS>();

            m.SGP.Interfaces.IWBS[] e = null;
            try
            {
                BeginTransaction(true);
                item = await this.dao.GetById(id);
                if (item != null && item.ID > 0)
                {
                    var daoTareas = Get<d.SGP.Interfaces.ITareas>();
                    var daoWBS = Get<d.SGP.Interfaces.IWBS>();
                    var resultT = await daoTareas.Delete(id, "IdWBS", "sgp_Tareas");
                    var result = await daoWBS.Delete(id);
                    if (result == 1 && resultT == 1) {
                        var parametersPadre = new Dictionary<string, object> {
                            { "IdPadre", item.IdPadre }
                        };
                        var Childrens = await daoWBS.GetAll(parametersPadre);
                        if (Childrens.Count == 0) {
                            var Padre = await daoWBS.GetById((Int32)item.IdPadre);
                            Padre.TieneHijos = false;
                            Padre.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                            Padre = await daoWBS.SaveEntity(Padre, false, false);
                        }
                    }
                }

                var parameters = new Dictionary<string, object> {
                    { "idProyecto", item.IdProyecto }
                };
                e = GetChildrens(await dao.GetTreeConfiguration(parameters));
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return e;
        }

        public async Task<m.SGP.Interfaces.IWBS[]> GetTreeConfiguration(Dictionary<string, object> parametros)
        {
            return GetChildrens(await this.dao.GetTreeConfiguration(parametros));
        }

        public async Task<m.SGP.Interfaces.IWBS[]> GetTreeTask(Dictionary<string, object> parametros)
        {
            return await this.dao.GetTreeConfiguration(parametros);
        }
        public async Task<m.Kontrol.Interfaces.ICalendar> GetCalendarWBS(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            var idUser = base.getUserId();
            var retValue = Get<m.Kontrol.Interfaces.ICalendar>();
            var daoWBS = Get<d.SGP.Interfaces.IWBS>();


            retValue.ProdID = "-//enkontrol.com//Task & Events Calendar//END";
            retValue.Version = "2.0";
            retValue.Events = new List<m.Kontrol.Interfaces.ICalendarEvent>();

            try
            {
                var WBSDetalles = await daoWBS.GetAll(parametros);
                var WBSDetallesTareas = WBSDetalles.FindAll(s => s.TipoNodo.Clave.Equals("sgp$tareas"));
                if (WBSDetallesTareas != null)
                {
                    foreach (var t in WBSDetallesTareas)
                    {
                        string etiqueta;
                        var calendarEvent = Get<m.Kontrol.Interfaces.ICalendarEvent>();
                        var iconoCalendario = "";
                        var colorReserva = t.Estatus.BGColor;
                        var tarea_nombre = t.Nombre;
                        var tarea_descripcion = t.Tarea.Descripcion;
                        calendarEvent.ID = (Int32)t.ID;
                        calendarEvent.UID = t.ID.ToString();
                        calendarEvent.Categories = "Categories";
                        iconoCalendario = "fa fa-calendar";
                        etiqueta = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + "#F00000" + "\" \"> </I> " + tarea_nombre + "<br> "+ tarea_descripcion);
                        calendarEvent.Summary = $"{etiqueta }";
                        calendarEvent.DTStart = Convert.ToDateTime(t.Tarea.FechaEstimadaInicio);
                        calendarEvent.DTEnd = Convert.ToDateTime(t.Tarea.FechaEstimadaFin);
                        calendarEvent.DTStamp = t.Tarea.Creado.ToString();
                        calendarEvent.Location = "EnKontrol";
                        calendarEvent.Description = t.Tarea.Descripcion;
                        calendarEvent.BackgroundColor = colorReserva;
                        calendarEvent.TextColor = "#FFFFFF";
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

        public async Task<m.Kontrol.Interfaces.IGantt> GetGanttWBS(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            var idUser = base.getUserId();
            var retValue = Get<m.Kontrol.Interfaces.IGantt>();
            var daoWBS = Get<d.SGP.Interfaces.IWBS>();

            retValue.Data = new List<m.Kontrol.Interfaces.IGanttTask>();
            retValue.Links = new List<m.Kontrol.Interfaces.IGanttTask>();

            try
            {
                var WBSDetalles = await daoWBS.GetAll(parametros);
                if (WBSDetalles != null)
                {
                    foreach (var t in WBSDetalles)
                    {
                        var ganttTask = Get<m.Kontrol.Interfaces.IGanttTask>();
                        var colorReserva = t.Estatus.BGColor;
                        var tarea_nombre = t.Nombre;
                        var tarea_descripcion = t.Tarea.Descripcion;
                        if (t.TipoNodo.Clave == "sgp$proyectos")
                        {
                            ganttTask.id = (Int32)t.ID;
                            ganttTask.text = t.Nombre;
                            ganttTask.progress = Convert.ToDecimal(50.00/100.00);
                            ganttTask.type = "project";
                            ganttTask.open = true;
                        }
                        else {
                            ganttTask.id = (Int32)t.ID;
                            ganttTask.text = t.Tarea.Nombre;
                            ganttTask.priority = $"<i title='{t.Tarea.Prioridad.Nombre}' class='{t.Tarea.Prioridad.Icono}' style='color: {t.Tarea.Prioridad.BGColor};'></i>";
                            if (t.Tarea.AsignadoA.Foto != "")
                            {
                                ganttTask.assigned = $"<img title='{t.Tarea.AsignadoA.Nombre}' class='img-circle-fixed' src='{t.Tarea.AsignadoA.Foto}' style='background: beige; width: 20px; height:20px; marginTop: 0px; display: inline-block;' />";
                            }
                            ganttTask.start_date = Convert.ToDateTime(t.Tarea.FechaEstimadaInicio).ToString("dd-MM-yyyy");
                            DateTime fechaInicio = Convert.ToDateTime(t.Tarea.FechaEstimadaInicio);
                            DateTime fechaFin = Convert.ToDateTime(t.Tarea.FechaEstimadaFin);
                            ganttTask.duration = (Int32)(fechaFin - fechaInicio).TotalDays;
                            ganttTask.parent = (Int32)t.IdPadre;
                            ganttTask.progress = t.Importe / 100;
                            ganttTask.type = "task";
                            ganttTask.open = true;
                        }
                        if (t.Tarea.PresentacionGantt != false || t.TipoNodo.Clave == "sgp$proyectos")
                        {
                            retValue.Data.Add(ganttTask);
                        }
                        retValue.Links = new List<m.Kontrol.Interfaces.IGanttTask>();
                    }
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }





        private m.SGP.Interfaces.IWBS[] GetChildrens(m.SGP.Interfaces.IWBS[] WBS)
        {
            List<m.SGP.Interfaces.IWBS> retValue = new List<m.SGP.Interfaces.IWBS>();
            Action<m.SGP.Interfaces.IWBS> lookup = null;
            if (WBS.Count() > 0)
            {
                if (WBS[0].IdPadre != null)
                {
                    WBS[0].IdPadre = null;
                }
            }

            try
            {
                if (WBS != null)
                {
                    retValue = new List<m.SGP.Interfaces.IWBS>();

                    lookup = (m.SGP.Interfaces.IWBS padre) =>
                    {
                        padre.children = new List<m.SGP.Interfaces.IWBS>();
                        WBS.Where(o => o.IdPadre == padre.ID).ToList().ForEach(o =>
                        {
                            //o.Padre = padre;
                            padre.children.Add(o);

                            // lookup childs
                            lookup(o);
                        });
                    };

                    WBS.Where(o => o.IdPadre == null).ToList().ForEach(o =>
                    {
                        retValue.Add(o);

                        // lookup childs
                        lookup(o);
                    });
                }
            }
            catch (Exception ex)
            {
                throw;
            }

            return retValue?.ToArray();
        }


    }
}