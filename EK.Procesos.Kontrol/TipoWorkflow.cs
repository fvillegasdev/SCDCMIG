using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class TipoWorkflow
        : BPBase<m.Kontrol.Interfaces.ITipoWorkflow, d.Kontrol.Interfaces.ITipoWorkflow>, p.Kontrol.Interfaces.ITipoWorkflow
    {
        public TipoWorkflow(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ITipoWorkflow dao)
               : base(factory, dao, "tipoFlujo")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Nombre = obj.Nombre;
        }

        public override async Task<m.Kontrol.Interfaces.ITipoWorkflow> Save(m.Kontrol.Interfaces.ITipoWorkflow item)
        {
            //Rescatando Valores
            var flujoAutorizacion = item.flujoAutorizacion;
            //Estatus
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            //Guardardo elemento actual
            item.IdEstatus = estatus.ID;
            item = await base.saveModel(item);
            //Obteniendo Id
            int idTipoFlujo = item.ID ?? 0;
            //EntidadesAdicionales
            try
            {
                var daoWorkFlow = Get<d.Kontrol.Interfaces.IWorkflow>();
                var daoTareas = Get<d.Kontrol.Interfaces.ITarea>();
                var daoNotificadores = Get<d.Kontrol.Interfaces.INotificadores>();


                //Guardar Informacion Adicional
                if ((flujoAutorizacion != null && flujoAutorizacion.Count > 0))
                {
                    foreach (var flujo in flujoAutorizacion)
                    {
                        if (flujo.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            flujo.Estatus = estatus;
                            flujo.IdEstatus = estatus.ID;
                            flujo.IdTipo = idTipoFlujo;
                            flujo.Modificado = DateTime.UtcNow;
                            flujo.IdModificadoPor = base.getUserId();

                            if (flujo.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                flujo.Creado = DateTime.UtcNow;
                                flujo.IdCreadoPor = base.getUserId();
                            }
                            if (flujo.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoWorkFlow.Delete(flujo.ID.Value);
                            }
                            else
                            {
                                await daoWorkFlow.SaveEntity(flujo, false, true);
                            }
                        }

                        //Notificadores de flujo de trabajo
                        var flujoNotificadores = flujo.Notificadores;
                        foreach (var flujoNotificaciones in flujoNotificadores)
                        {
                            if (flujoNotificaciones.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                            {
                                flujoNotificaciones.Estatus = estatus;
                                flujoNotificaciones.IdEstatus = estatus.ID;
                                flujoNotificaciones.Entidad = "FT";
                                flujoNotificaciones.IdFlujoAutorizacion =Convert.ToInt32(flujo.ID);
                                flujoNotificaciones.Modificado = DateTime.UtcNow;
                                flujoNotificaciones.IdModificadoPor = base.getUserId();

                                if (flujoNotificaciones.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                {
                                    flujoNotificaciones.Creado = DateTime.UtcNow;
                                    flujoNotificaciones.IdCreadoPor = base.getUserId();
                                }
                                if (flujoNotificaciones.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                                {
                                    await daoNotificadores.Delete(flujoNotificaciones.ID.Value);
                                }
                                else
                                {
                                    await daoNotificadores.SaveEntity(flujoNotificaciones, false, true);
                                }
                            }
                        }
                        //Tareas de flujo de trabajo
                        var flujoTareas = flujo.Tareas;
                        foreach (var tarea in flujoTareas)
                        {
                            if (tarea.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                            {
                                tarea.IdFlujo = Convert.ToInt32(flujo.ID);
                                tarea.Modificado = DateTime.UtcNow;
                                tarea.IdModificadoPor = base.getUserId();

                                if (tarea.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                {
                                    tarea.Creado = DateTime.UtcNow;
                                    tarea.IdCreadoPor = base.getUserId();
                                }
                                if (tarea.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                                {
                                    await daoTareas.Delete(tarea.ID.Value);
                                }
                                else
                                {
                                    await daoTareas.SaveEntity(tarea, false, true);
                                }
                            }

                            //Notificadores de tareas
                            var flujoTareasNotificadores = tarea.Autorizadores;
                            foreach (var flujoNotificaciones in flujoTareasNotificadores)
                            {
                                if (flujoNotificaciones.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                                {
                                    flujoNotificaciones.Estatus = estatus;
                                    flujoNotificaciones.IdEstatus = estatus.ID;
                                    flujoNotificaciones.Entidad = "T";
                                    flujoNotificaciones.IdTarea = Convert.ToInt32(tarea.ID);
                                    flujoNotificaciones.IdFlujoAutorizacion = Convert.ToInt32(flujo.ID);
                                    flujoNotificaciones.Modificado = DateTime.UtcNow;
                                    flujoNotificaciones.IdModificadoPor = base.getUserId();

                                    if (flujoNotificaciones.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                    {
                                        flujoNotificaciones.Creado = DateTime.UtcNow;
                                        flujoNotificaciones.IdCreadoPor = base.getUserId();
                                    }
                                    if (flujoNotificaciones.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                                    {
                                        await daoNotificadores.Delete(flujoNotificaciones.ID.Value);
                                    }
                                    else
                                    {
                                        await daoNotificadores.SaveEntity(flujoNotificaciones, false, true);
                                    }
                                }
                            }
                        }

                    }
                }

                return item;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
