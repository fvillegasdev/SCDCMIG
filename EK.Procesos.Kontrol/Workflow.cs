using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Workflow
        : BPBase<m.Kontrol.Interfaces.IWorkflow, d.Kontrol.Interfaces.IWorkflow>, p.Kontrol.Interfaces.IWorkflow 
    {
        public Workflow(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IWorkflow dao)
               : base(factory, dao, "flujoTrabajo")
        {
        }

        #region "WORKFLOW"
        public async Task<List<IWorkflow>> GetWorkflowByTipo(string ClaveTipo)
        {
            return await this.dao.GetWorkflowByTipo(ClaveTipo);
        }

        public async Task<List<IWorkflow>> GetFlujoTrabajo(Dictionary<string, object> parametros)
        {
            var daoT = Get<d.Kontrol.Interfaces.ITarea>();
            var daoN = Get<d.Kontrol.Interfaces.INotificadores>();

            List<IWorkflow> FlujoTrabajo = new List<IWorkflow>();


            FlujoTrabajo = await this.dao.GetFlujoTrabajo(parametros);

            foreach (var flujo in FlujoTrabajo)
            {
                var parameters = new Dictionary<string, object>() { { "idFlujoAutorizacion", flujo.ID } };
                flujo.Notificadores=await daoN.GetAll(parameters);
                ///Tareas
                parameters = new Dictionary<string, object>() { { "IdFlujo", flujo.ID } };
                flujo.Tareas = await daoT.GetAll(parameters);

                foreach (var tarea in flujo.Tareas)
                {
                    parameters = new Dictionary<string, object>() { { "idFlujoAutorizacion", flujo.ID }, {"idTarea", tarea.ID} };
                    tarea.Autorizadores = await daoN.GetAll(parameters);
                }

            }
            return FlujoTrabajo;
        }



        //public async Task<List<model.IWorkflow>> GetWorkflowsList(int idTipo)
        //{
        //    return await this.dao.GetWorkflowsList(idTipo);
        //}

        //public async Task<List<model.IWorkflow>> GetWorkflowsByIdUser()
        //{
        //    int IdUser = this.getUserId();

        //    return await this.dao.GetWorkflowsByIdUser(IdUser);
        //}

        //public async Task<model.IWorkflow> GetWorkflowById(int Id)
        //{
        //    var result = await this.dao.GetWorkflowById(Id);

        //    return result;
        //}

        //public async Task<model.IWorkflow> GetWorkflowByKey(string TypeKey)
        //{
        //    return await this.dao.GetWorkflowByKey(TypeKey);            
        //}

        //public async Task<List<model.ITarea>> GetTasksByWorkflow(int idFlujo, bool Editar) {
        //    List<model.ITarea> Tareas= await this.dao.GetTasksByWorkflow(idFlujo);

        //    if (Editar)
        //    {
        //    }
        //    else
        //    {
        //        return Tareas.FindAll(z => z.ID > 0);
        //    }

        //    return Tareas;
        //}

        //private model.IWorkflow getWorkflowObject(model.IWorkflow workflow) {
        //    dynamic f = JsonConvert.DeserializeObject("");

        //    //Console.WriteLine("Values:");
        //    //foreach (var property in f.Properties())
        //    //{
        //    //    Console.WriteLine("  {0}: {1}", property.Name, property.Value);
        //    //}

        //    var flujo = factory.GetInstance<model.IWorkflow>();

        //    flujo.ID = f.ID;
        //    flujo.Nombre = f.Nombre;
        //    flujo.Alias = f.Alias;
        //    flujo.Modificado = f.Modificado;
        //    flujo.Tipo = f.Tipo;
        //    flujo.IdCreadoPor = this.getUserId();
        //    flujo.IdModificadoPor = this.getUserId();
        //    flujo.IdTipo = (int)f.Tipo.ID;
        //    flujo.IdEstatus = f.Estatus;
        //    if (f.JefeDirecto != null)
        //    {
        //        flujo.JefeDirecto = f.JefeDirecto;
        //    }
        //    else if (f.IdPueso != null)
        //    {
        //        flujo.IdPuesto = (int)f.IdPuesto;
        //        flujo.Puesto = f.Puesto;
        //        if (f.PuestoJerarquia != null)
        //        {
        //            flujo.PuestoJerarquia = true;
        //        }
        //        else if (f.PuestoTodos != null)
        //        {
        //            flujo.PuestoTodos = true;
        //        }
        //    }
        //    else if (flujo.IdPosicion != null)
        //    {
        //        flujo.IdPosicion = (int)f.IdPosicion;
        //        flujo.Posicion = f.Posicion;
        //    }

        //    dynamic tareas = f.Tareas;
        //    foreach (dynamic t in tareas)
        //    {
        //        var tarea = factory.GetInstance<model.ITarea>();
        //        tarea.ID = t.ID;
        //        tarea.Orden = t.Orden;
        //        tarea.DiasVigencia = t.DiasVigencia;
        //        tarea.EstadoTarea = t.EstadoTarea;
        //        tarea.Descripcion = t.Descripcion;
        //        tarea.IdCreadoPor = this.getUserId();
        //        tarea.IdModificadoPor = this.getUserId();

        //        if (t.JefeDirecto != null)
        //        {
        //            tarea.JefeDirecto = true;
        //        }
        //        else if (t.IdPueso != null)
        //        {
        //            tarea.IdPuesto = (int)t.IdPuesto;
        //            tarea.Puesto = t.Puesto;
        //            if (t.PuestoJerarquia != null)
        //            {
        //                tarea.PuestoJerarquia = true;
        //            }
        //            else if (t.PuestoTodos != null)
        //            {
        //                tarea.PuestoTodos = true;
        //            }
        //        }
        //        else if (t.IdPosicion != null)
        //        {
        //            tarea.IdPosicion = (int)t.IdPosicion;
        //            tarea.Posicion = t.Posicion;
        //        }
        //        tarea.Estado = base.getEstadoEntidad(tarea);

        //        dynamic reglas = t.Reglas;
        //        foreach (dynamic r in reglas)
        //        {
        //            var regla = factory.GetInstance<model.IReglaTarea>();
        //            regla.ID = r.ID;
        //            regla.Campo = r.Campo;
        //            regla.Operador = r.Operador;
        //            regla.Valor = r.Valor;
        //            regla.Estado = base.getEstadoEntidad(regla);
        //        }

        //        flujo.Tareas.Add(tarea);
        //    }

        //    flujo.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;

        //    return flujo;
        //}

        //public async Task<model.IWorkflow> Save(model.IWorkflow workflow)
        //{
        //    model.IWorkflow retValue = null;

        //    try
        //    {
        //        BeginTransaction();

        //        var workflowDAO = Get<dat.IWorkflow>();

        //        workflow.IdModificadoPor = this.getUserId();
        //        var idWorkflow = await this.dao.SaveWorkflow(workflow);

        //        if (workflow.Tareas != null && workflow.Tareas.Count > 0)
        //        {
        //            foreach (var t in workflow.Tareas)
        //            {
        //                // si es eliminar la tarea, eliminar todas sus reglas
        //                if (t.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
        //                {
        //                    if (t.Reglas != null && t.Reglas.Count > 0)
        //                    {
        //                        foreach (var r in t.Reglas)
        //                        {
        //                            await workflowDAO.DeleteRegla(r.ID.Value);
        //                        }
        //                    }

        //                    await workflowDAO.DeleteTarea(t.ID.Value);
        //                }
        //                else
        //                {
        //                    t.IdModificadoPor = this.getUserId();
        //                    var idTarea = await workflowDAO.SaveTarea(idWorkflow, t);

        //                    if (t.Reglas != null && t.Reglas.Count > 0)
        //                    {
        //                        foreach (var r in t.Reglas)
        //                        {
        //                            if (r.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
        //                            {
        //                                await workflowDAO.DeleteRegla(r.ID.Value);
        //                            }
        //                            else
        //                            {
        //                                r.IdModificadoPor = base.getUserId();
        //                                await workflowDAO.SaveRegla(idTarea, r);
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //        }

        //        retValue = await workflowDAO.GetWorkflowById(idWorkflow);

        //        Commit();
        //    }
        //    catch
        //    {
        //        Rollback();
        //        throw;
        //    }

        //    await this.Log(retValue);

        //    return retValue;
        //}

        //public List<model.INotificador> GetNotifiersByWorkflow(int idFlujo)
        //{
        //    return this.dao.GetNotifiersByWorkflow(idFlujo);
        //}

        //public List<model.INotificador> GetPossibleNotificators(string search)
        //{
        //    return this.dao.GetPossibleNotificators(search);
        //}

        //public bool SaveNotifierWorkflow(int FlujoId, int NotificadorId, string Tipo)
        //{
        //    return this.dao.SaveNotifierWorkflow(FlujoId, NotificadorId, Tipo);
        //}

        //public bool DeleteNotifierWorkflow(int FlujoId)
        //{
        //    return this.dao.DeleteNotifierWorkflow(FlujoId);
        //}

        //public object GetWorkflowHistory()
        //{
        //    var result = this.GetEntityHistory("A", 25);

        //    return result;
        //}


        //public model.ITarea GetWorkflowTasksById(int idTarea)
        //{
        //    var result = this.dao.GetWorkflowTasksById(idTarea);

        //    return result;
        //}

        //public async Task<object[]> GetHistory(int top)
        //{
        //    return await base.GetEntityHistory("workflow", top);
        //}

        //public async Task<object[]> GetHistory(int ID, int top)
        //{
        //    return await base.GetEntityHistory("workflow", ID, top);
        //}

        //private async Task Log(model.IWorkflow obj)
        //{

        //    dynamic entity = new ElasticEntity();

        //    entity.ID = obj.ID;
        //    entity.IdEstatus = obj.Estatus.ID;
        //    entity.IdEstatusClave = obj.Estatus.Clave;
        //    entity.IdEstatusNombre = obj.Estatus.Nombre;

        //    entity.ID = obj.ID;
        //    entity.Nombre = obj.Nombre;
        //    entity.Alias = obj.Alias;
        //    entity.Creado = obj.Creado;
        //    entity.Modificado = obj.Modificado;            

        //    entity.RecordType = Convert.ToInt32(obj.Estado);
        //    entity.RecordTypeName = obj.Estado.ToString();

        //    entity.Creado = obj.Creado;
        //    entity.IdCreadoPor = this.getUserId();
        //    entity.IdCreadoPorNombre = this.getUserName();

        //    entity.Modificado = obj.Modificado;
        //    entity.IdModificadoPor = this.getUserId();
        //    entity.IdModificadoPorNombre = this.getUserName();

        //    await this.factory.GetInstance<ILogger>().AddAsync("workflow", entity);
        //}

        #endregion
    }
}
