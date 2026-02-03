using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ChecklistControl 
        : p.Kontrol.BPBase<m.SCV.Interfaces.IChecklistControl, d.SCV.Interfaces.IChecklistsControl>, p.SCV.Interfaces.IChecklistsControl, p.Kontrol.Interfaces.IWorkflowBP
    {
        public ChecklistControl(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IChecklistsControl dao)
          : base(factory, dao, "CheckListControl")
        {
        }

        public async Task<object> SaveChecklists(List<m.SCV.Interfaces.IChecklistControl> item)
        {
            try
            {
                //BeginTransaction(true);

                var daoT = Get<d.SCV.Interfaces.IChecklistsControl>();

                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                //Estatus Checklist (Flujo Autorizacion)
                var porAutorizar = await bpEstatus.Get("ESTATUSCHECKLISTSPV", "PORAUTORIZAR");
                var finalizada = await bpEstatus.Get("ESTATUSCHECKLISTSPV", "FINALIZADA");


                List<m.SCV.Interfaces.IChecklistControl> itemsWorkflow = new List<m.SCV.Interfaces.IChecklistControl>();

                foreach (var elem in item)
                {
                    if (elem.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        var elementoAnterior = await dao.GetById((Int32)elem.ID);

                        elem.IdEstatus = estatus.ID;
                        elem.Modificado = DateTime.UtcNow;
                        elem.IdModificadoPor = base.getUserId();

                        if (elem.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                        {
                            elem.Creado = DateTime.UtcNow;
                            elem.IdCreadoPor = base.getUserId();
                        }

                        if (elem.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            await daoT.Delete(elem.ID.Value);
                        }
                        else
                        {
                            bool startWorkflow = false;
                            
                            if (elem.TotalAvance == 100)
                            {
                                //Culminado Por
                                if (elementoAnterior != null)
                                {
                                    if(elementoAnterior.TotalAvance != elem.TotalAvance)
                                    {
                                        elem.IdCulminadoPor = base.getUserId();
                                        elem.FechaCulminado = DateTime.UtcNow;
                                    }
                                }
                                else
                                {
                                    elem.IdCulminadoPor = base.getUserId();
                                    elem.FechaCulminado = DateTime.UtcNow;
                                }
                                
                                //Flujo autorizacion
                                if (elem.IdFlujoAutorizacion != null)
                                {
                                    if (elem.IdEstatusChecklist != porAutorizar.ID && elem.IdEstatusChecklist != finalizada.ID)
                                    {
                                        //Solo enviar a autorizar cuando no esté 'Por Autorizar' o 'Finalizada'
                                        elem.IdEstatusChecklist = (int)porAutorizar.ID;

                                        //Total avance no modificar directamente cuando sea 100
                                        if(elementoAnterior != null)
                                        {
                                            elem.TotalAvance = elementoAnterior.TotalAvance;
                                        }
                                        else
                                        {
                                            elem.TotalAvance = 0;
                                        }

                                        startWorkflow = true;
                                    }
                                }
                                else
                                {
                                    elem.IdEstatusChecklist = (int)finalizada.ID;
                                }
                            }

                            //Revisado Por
                            if(elem.Revisado == true)
                            {
                                if(elementoAnterior != null)
                                {
                                    if(elementoAnterior.Revisado != true)
                                    {
                                        elem.IdRevisadoPor = base.getUserId();
                                        elem.FechaRevisado = DateTime.UtcNow;
                                    }
                                }
                                else
                                {
                                    elem.IdRevisadoPor = base.getUserId();
                                    elem.FechaRevisado = DateTime.UtcNow;
                                }
                            }

                            await daoT.SaveEntity(elem, false, true);

                            if (startWorkflow)
                            {
                                itemsWorkflow.Add(elem);
                            }
                        }
                    }
                }
                
                //Commit();

                foreach (var itemWF in itemsWorkflow)
                {
                    await StartWorkflow(itemWF.FlujoAutorizacion.Clave, itemWF, (int)itemWF.IdModificadoPor);
                }


                if (item.Count > 0)
                {
                    var pa = new Dictionary<string, object>
                        {
                            { "activos", 1},
                            { "modulo", item[0].Modulo},
                            { "entityType", item[0].EntityType},
                            { "entityId", item[0].EntityId}
                        };
                    return await this.GetAll(pa);
                }
                else
                {
                    return new List<m.SCV.Interfaces.IChecklistControl>();
                }
                
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }


        #region Workflow
        public override async Task<string> GetDescripcion(dynamic obj)
        {
            return "";
        }

        public async Task<p.Kontrol.WorkflowResult> Authorize(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                retValue.Success = true;
                retValue.Message = $"Se autorizó el checklist #{id}";

                var item = await this.GetById(id);
                if(item != null)
                {
                    if (instance.Workflow.Tipo.Clave == "WF-CHECKLIST")
                    {
                        var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var finalizada = await bpEstatus.Get("ESTATUSCHECKLISTSPV", "FINALIZADA");

                        item.IdEstatusChecklist = (int)finalizada.ID;
                        item.Changed("IdEstatusChecklist", true);
                        item.Modificado = DateTime.UtcNow;
                        item.Changed("Modificado", true);
                        item.IdModificadoPor = base.getUserId();
                        item.Changed("IdModificadoPor", true);
                        item.TotalAvance = 100;
                        item.Changed("TotalAvance", true);

                        item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        item = await this.dao.SaveEntity(item, true, false);
                    }
                    Commit();
                }
                else
                {
                    retValue.Success = false;
                    retValue.Message = $"El checklist #{id} no existe";
                }
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<p.Kontrol.WorkflowResult> Reject(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                retValue.Success = true;
                retValue.Message = $"Se rechazó el checklist #{id}";

                var item = await this.GetById(id);

                if (instance.Workflow.Tipo.Clave == "WF-CHECKLIST")
                {
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var enproceso = await bpEstatus.Get("ESTATUSCHECKLISTSPV", "ENPROCESO");

                    item.IdEstatusChecklist = (int)enproceso.ID;
                    item.Changed("IdEstatusChecklist", true);
                    item.Modificado = DateTime.UtcNow;
                    item.Changed("Modificado", true);
                    item.IdModificadoPor = base.getUserId();
                    item.Changed("IdModificadoPor", true);

                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item = await this.dao.SaveEntity(item, true, false);
                }
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        #endregion
    }
}
