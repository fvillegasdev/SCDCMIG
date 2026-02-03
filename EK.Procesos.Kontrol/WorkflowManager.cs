using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.Threading.Tasks;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using p = EK.Procesos;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Procesos.Kontrol
{
    public class WorkflowManager
        : BPBase<m.Kontrol.Interfaces.IBaseKontrol, d.Kontrol.Interfaces.IWorkflowManager>, p.Kontrol.Interfaces.IWorkflowManager
    {
        private const string FLUJO_ESTATUS = "FLUJOESTATUS";
        private const string FLUJO_APROBADO = "AP";
        private const string FLUJO_RECHAZADO = "RE";
        private const string TAREA_ESTATUS = "FLUJOESTATUS";
        private const string TAREA_APROBADO = "AP";
        private const string TAREA_RECHAZADO = "RE";
        private const string TAREA_CANCELADO = "CA";
        private const string TAREA_ASIGNADO = "AS";
        private const string TAREA_NO_ASIGNADO = "NA";

        private const string TASK_ENTITY = "wmAutorizaciones";
        private const string WF_ENTITY = "wmInstancias";

        public WorkflowManager(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IWorkflowManager dao)
               : base(factory, dao, "workflows")
        {
        }

        public async Task<m.Kontrol.Interfaces.IWorkflowInstance> Start(int id, m.Kontrol.Interfaces.IBaseKontrol entidad, int idUserOwner)
        {
            return await Task.FromResult(null as m.Kontrol.Interfaces.IWorkflowInstance);
        }

        public async Task<m.Kontrol.Interfaces.IWorkflowInstance> Start(string clavePlantilla, m.Kontrol.Interfaces.IBaseKontrol entidad, int idUserOwner) {
            try
            {
                BeginTransaction(true);
                var wfDao = Get<d.Kontrol.Interfaces.IWorkflow>();
                var wfTasksDao = Get<d.Kontrol.Interfaces.ITarea>();
                var instanceDao = Get<d.Kontrol.Interfaces.IWorkflowInstance>();
                var instanceTasksDao = Get<d.Kontrol.Interfaces.ITareaInstance>();

                /*Se obtiene el flujo de autorizacion*/
                var flujo = await wfDao.GetByClave(clavePlantilla);

                if (flujo == null)
                {
                    base.SetReturnInfo(1, "El flujo de trabajo no se encuentra registrado", 1);
                    throw new ApplicationException("El flujo de trabajo no se encuentra registrado");
                }

                /*Se obtienen las tareas del flujo de autorizacion*/
                var tareas = await wfTasksDao.GetAll(new Dictionary<string, object> { { "idFlujo", flujo.ID.Value }, { "activos", 1} });

                /* Instancia Flujo Trabajo Instancia*/
                var flujoTrabajoInstancia = Get<m.Kontrol.Interfaces.IWorkflowInstance>();


                /*Estatus de autorizadores*/
                var estatusAutorizadorEjecutable = await GetCGV("AUTORIZADORESESTATUS", "E");
                var estatusAutorizadorNoEjecutable =await GetCGV("AUTORIZADORESESTATUS", "NOE");

                /*Estatus de tareas*/
                var estatusTareaEjecutable = await GetCGV("TAREAESTATUS", "NA");
                var estatusTareaNoEjecutable = await GetCGV("TAREAESTATUS", "NOE");

                /*Instancia de Tarea Instancia*/
                m.Kontrol.Interfaces.ITareaInstancia tareaAsignada = null;

                /*Tareas de flujo de trabajo Instancia*/
                flujoTrabajoInstancia.Tareas = new List<m.Kontrol.Interfaces.ITareaInstancia>();

                bool hasAutorizadoresBeforeTask = true;
                bool hasAutorizadoresTasks = false;
                bool taskBeforeExecutable = true;
                bool withOutAssignTask = true;


                /* 1.- Flujo de trabajo Instancia*/
                if (flujo != null)
                {
                    await base.Assign(flujoTrabajoInstancia);
                    flujoTrabajoInstancia.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    flujoTrabajoInstancia.Clave = flujo.Clave;
                    flujoTrabajoInstancia.Nombre = flujo.Nombre;
                    flujoTrabajoInstancia.IdFlujo = flujo.ID.Value;
                    flujoTrabajoInstancia.IdReferencia = entidad.ID.Value;
                    flujoTrabajoInstancia.Referencia = JsonConvert.SerializeObject(entidad);
                    flujoTrabajoInstancia.IdUserOwner = idUserOwner;//Propietario
                    flujoTrabajoInstancia.FechaInicio = DateTime.UtcNow;

                    /* Si hay Tareas del flujo de trabajo es estatus es Validacion*/
                    if (tareas != null && tareas.Count > 0)
                    {
                        var estatusProgreso = await GetCGV("FLUJOESTATUS", "EP");
                        flujoTrabajoInstancia.EstadoWF = tareas[0].Clave;
                        flujoTrabajoInstancia.IdEstatus = estatusProgreso.ID;
                    }
                    else
                    {
                        /*Si no tiene tareas el flujo es aprobado*/
                        var estatusAprobado = await GetCGV("FLUJOESTATUS", "AP");
                        flujoTrabajoInstancia.EstadoWF = estatusAprobado.Clave;
                        flujoTrabajoInstancia.IdEstatus = estatusAprobado.ID;
                    }
                    /*Se guarda el flujo de autorizacion  en flujo de trabajo Instancia*/
                    flujoTrabajoInstancia = await instanceDao.SaveEntity(flujoTrabajoInstancia,true);
                }

                /*Total de tarea no ejecutables*/
                int contadorTareasNoEjecutables = 0;

                /*2.- Tareas del flujo*/
                if (tareas != null && tareas.Count > 0)
                {
                    for (var i=0; i<tareas.Count; i++)
                    {
                        //se asigna Tarea en posicion
                        var tareaEnCurso = tareas[i];

                        bool tareaEjecutable = true;
                        bool errorExpresion = false;

                        if (tareaEnCurso.Expresion != null && tareaEnCurso.Expresion != "")
                        {
                            try
                            {
                                tareaEjecutable = base.Evaluate<bool>(tareaEnCurso.Expresion, flujoTrabajoInstancia.Referencia);
                            }
                            catch
                            {
                                tareaEjecutable = true;
                                errorExpresion = true;
                            }
                        }



                        var tareaInstancia = Get<m.Kontrol.Interfaces.ITareaInstancia>();
                        tareaInstancia.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        tareaInstancia.IdInstancia = flujoTrabajoInstancia.ID.Value;
                        tareaInstancia.Clave = tareaEnCurso.Clave;
                        tareaInstancia.Nombre = tareaEnCurso.Nombre;
                        tareaInstancia.Orden = Convert.ToInt32(tareaEnCurso.Orden);
                        tareaInstancia.Comentarios = string.Empty;
                        tareaInstancia.DiasVigencia = tareaEnCurso.DiasVigencia;
                        tareaInstancia.Expresion = tareaEnCurso.Expresion;


                        if (!tareaEjecutable)
                        {
                            tareaInstancia.ExpresionMensaje = tareaEnCurso.ExpresionMensaje;
                        }
                        else if (errorExpresion)
                        {
                            tareaInstancia.ExpresionMensaje = "Error al ejecutar la expresión";
                        }

                        /*si la tarea se encuentra en la posicion 1 o no  tiene autorizadores o
                         * no se ha asignado ninguna tarea la anterior esta como no ejecutable
                         * y la tarea en curso esta como ejecutable
                         * se asignan la fecha asignacion,fecha vigencia, 
                         * dias vigencia*/
                        if ( (i == 0 || hasAutorizadoresBeforeTask == false || (withOutAssignTask==true && taskBeforeExecutable==false))
                            && tareaEjecutable )
                        {
                            await this.AssignTask(tareaInstancia);
                            tareaInstancia = await instanceTasksDao.SaveEntity(tareaInstancia);

                            tareaAsignada = tareaInstancia;
                            tareaAsignada.Instancia = flujoTrabajoInstancia;

                            /*Una tarea ya ha sido asignada*/
                            withOutAssignTask = false;
                        }
                        else
                        {
                            /*De lo contrario almacenamos tarea*/
                            var estatusSA = tareaEjecutable ? estatusTareaEjecutable : estatusTareaNoEjecutable;

                            tareaInstancia.FechaAsignacion = null;
                            tareaInstancia.FechaVigencia = null;
                            tareaInstancia.IdEstatus = estatusSA.ID;
                            tareaInstancia = await instanceTasksDao.SaveEntity(tareaInstancia, true);

                            if (estatusSA.Clave == "NOE")
                            {
                                contadorTareasNoEjecutables++;
                            }
                        }
                        /*Validar si la tarea anterior es ejecutable*/
                        taskBeforeExecutable = tareaEjecutable;

                        /* 1.-Instancia de notificadores */
                        var daoTA = Get<d.Kontrol.Interfaces.INotificadores>();
                        var daoTAI = Get<d.Kontrol.Interfaces.INotificadoresInstancia>();
                        /*Se obtienen autorizadores de tareas*/
                        var parameters = new Dictionary<string, object>() { { "idFlujoAutorizacion", flujo.ID }, { "idTarea", tareaEnCurso.ID.Value } };
                        var tareaAutorizadores = await daoTA.GetAll(parameters);


                        bool hasAutorizadoresTask = false;

                        /*si  hay autorizadores en la tarea*/
                        if (tareaAutorizadores != null && tareaAutorizadores.Count > 0)
                        {

                            /* 2.- insertar autorizadores de tareas en la tabla notificadores instancia */
                            /*Autorizadores Tareas*/
                            foreach (var autorizador in tareaAutorizadores)
                            {
                                /*Validar si la tarea cumple con la expresion*/
                                var autorizadoEnCurso = autorizador;

                                bool autorizadorEjecutable = true;
                                bool errorExpresionAutorizador = false;

                                if (autorizadoEnCurso.Expresion != null && autorizadoEnCurso.Expresion != "")
                                {
                                    try
                                    {
                                        autorizadorEjecutable = base.Evaluate<bool>(autorizadoEnCurso.Expresion, flujoTrabajoInstancia.Referencia);
                                    }
                                    catch
                                    {
                                        autorizadorEjecutable = true;
                                        errorExpresionAutorizador = true;
                                    }
                                }

                                int idEstatusAutorizador = autorizadorEjecutable?estatusAutorizadorEjecutable.ID.Value : estatusAutorizadorNoEjecutable.ID.Value;

                                /*Modelo de autorizadores Instancia*/
                                var autorizadorTarea = Get<m.Kontrol.Interfaces.INotificadoresInstancia>();


                                /*Asignar estatus acorde al resultado de la expresion*/
                                if (autorizadorEjecutable)
                                {
                                    /*La tarea si tiene autorizadores por lo cual no debe aprovarse en automatico*/
                                    hasAutorizadoresTask = true;
                                    hasAutorizadoresTasks = true;
                                    hasAutorizadoresBeforeTask = true;

                                    if (errorExpresionAutorizador == true)
                                    {
                                        autorizadorTarea.ExpresionMensaje = "Error al ejecutar la expresión";
                                    }
                                }
                                else
                                {
                                    autorizadorTarea.ExpresionMensaje = autorizadoEnCurso.ExpresionMensaje;
                                }
                               
                              
                                /*Llenado de datos*/
                                autorizadorTarea.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                autorizadorTarea.IdTareaInstancia = tareaInstancia.ID.Value;//Tarea En Curso
                                autorizadorTarea.Entidad = autorizador.Entidad;
                                autorizadorTarea.IdTipoNotificador = autorizador.IdTipoNotificador;
                                autorizadorTarea.IdRegistro = Convert.ToInt32(autorizador.IdRegistro);
                                autorizadorTarea.IdFlujoAutorizacionInstancia = flujoTrabajoInstancia.ID.Value;
                                autorizadorTarea.IdEstatus = idEstatusAutorizador;
                                autorizadorTarea.Modificado = DateTime.UtcNow;
                                autorizadorTarea.Creado = DateTime.UtcNow;
                                autorizadorTarea.IdModificadoPor = base.getUserId();
                                autorizadorTarea.IdCreadoPor = base.getUserId();
                                autorizadorTarea.Expresion = autorizadoEnCurso.Expresion;
                                await daoTAI.SaveEntity(autorizadorTarea, false, true);

                            }
                        }

                        /*Si no tiene autorizadores la tarea es aprobada*/

                        if (!hasAutorizadoresTask && tareaInstancia.Estatus.Clave!="NOE")
                        {
                            var estatusAprobado = await GetCGV("TAREAESTATUS", "AP");
                            tareaInstancia.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                            tareaInstancia.IdEstatus = estatusAprobado.ID;
                            tareaInstancia.FechaAsignacion = null;
                            tareaInstancia.FechaVigencia = null;
                            tareaInstancia = await instanceTasksDao.SaveEntity(tareaInstancia);
                            hasAutorizadoresBeforeTask = false;
                        }

                    }

                    /*Obtencion de tareas instancia de un flujo de trabajo instancia*/
                    flujoTrabajoInstancia.Tareas = await instanceTasksDao.GetAll(new Dictionary<string, object> { { "idInstancia", flujoTrabajoInstancia.ID } });
                }


                /*Si ninguna tarea tiene autorizadores o  la cantidad de tareas no ejecutables es igual al total de tareas
                 * o si el flujo no tiene ninguna tarea lo aprobamos*/

                if ( hasAutorizadoresTasks == false || contadorTareasNoEjecutables==tareas.Count || tareas.Count==0)
                {
                    if (flujoTrabajoInstancia.Estatus.Clave != "AP")
                    {
                        var estatusAprobado = await GetCGV("FLUJOESTATUS", "AP");
                        flujoTrabajoInstancia.EstadoWF = estatusAprobado.Clave;
                        flujoTrabajoInstancia.IdEstatus = estatusAprobado.ID;
                        flujoTrabajoInstancia = await instanceDao.SaveEntity(flujoTrabajoInstancia);
                    }
                  

                    if (tareaAsignada != null)
                    {
                        await TaskApproval(tareaAsignada);
                    }

                    /*Invocar lógica de aprobacion*/
                    await this.approveWorkflow(flujoTrabajoInstancia);
                }

                /*Tareas Instancia*/
                var daoInstanceTasks = Get<d.Kontrol.Interfaces.ITareaInstance>();
                /*Referencia*/
                var bpReferencia = await this.getReferenciaBP(flujoTrabajoInstancia.Workflow.IdTipo);
                var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
                var optionReferencia = await bpOption.GetByClave(bpReferencia.EntityName);
                var optionAut = await bpOption.GetByClave("wmAutorizaciones");
                var pm = await GetGlobalParameters("INSTALACION");
                var parametros = new Dictionary<string, object>() {
                    { "LinkReferencia", $"{pm.Value<string>("SitioWeb")}{optionReferencia.Ruta}/{flujoTrabajoInstancia.IdReferencia}" },
                    { "LinkTarea", $"{pm.Value<string>("SitioWeb")}{optionAut.Ruta}".Replace(":id", Convert.ToString( tareaAsignada!=null? tareaAsignada.ID.Value:0)) },
                    { "LinkFlujo", $"{pm.Value<string>("SitioWeb")}{optionAut.Ruta}".Replace(":id", Convert.ToString(flujoTrabajoInstancia.ID.Value)) }
                };

                /*Obtencion de notificadores por tarea a ejecutar habitualmente la 1*/

                if (tareaAsignada != null)
                {
                    var notificadores = await daoInstanceTasks.GetAutorizadoresTarea(tareaAsignada.ID.Value);

                    /*Enviar notificacion solamente a autorizadores ejecutables */

                    var notificadoresEjecutables = notificadores.FindAll(x => x.Estatus.Clave == "E");

                    foreach (dynamic n in notificadoresEjecutables)
                    {
                        if (n.ID != null)
                        {
                            await SendNotification(n, "WF-TAREA-ASIGNACION", parametros["LinkTarea"].ToString(), tareaAsignada, parametros);
                        }
                    }

                }

                if (tareaAsignada != null)
                {
                    await LogEvent(tareaAsignada.ID.Value, TASK_ENTITY, 1053, "Asignado");
                    await LogEvent(flujoTrabajoInstancia.ID.Value, WF_ENTITY, 1053, tareaAsignada.Clave, "Asignado");
                }

                Commit();
                return flujoTrabajoInstancia;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        private async Task setReferenciaInfo(m.Kontrol.Interfaces.IWorkflowInstance instance, p.Kontrol.Interfaces.IWorkflowBP bpReferencia) {
            if (bpReferencia == null)
            {
                bpReferencia = await this.getReferenciaBP(instance.Workflow.IdTipo);
            }
            //
            var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
            var option = await bpOption.GetByClave(bpReferencia.EntityName);
            var pm = await GetGlobalParameters("INSTALACION");
            //            
            instance.LinkReferencia = $"{pm.Value<string>("SitioWeb")}{option.Ruta}/{instance.IdReferencia}";
            if (!string.IsNullOrEmpty(instance.Referencia))
            {
                JObject referencia = (JObject)JsonConvert.DeserializeObject(instance.Referencia);
                instance.DescripcionReferencia = await bpReferencia.GetDescripcion(referencia);
            }
        }

        private async Task<p.Kontrol.Interfaces.IWorkflowBP> getReferenciaBP(int idTipo)
        {
            p.Kontrol.Interfaces.IWorkflowBP retValue = null;

            var bpWorkflowType = Get<d.Kontrol.Interfaces.ITipoWorkflow>();
            dynamic wfType = await bpWorkflowType.GetBPType(idTipo);

            string idType = wfType.BPType;
            var type = Type.GetType(idType);

            // retValue = (p.Kontrol.Interfaces.IWorkflowBP)base.factory.GetInstance(type);

            retValue = (p.Kontrol.Interfaces.IWorkflowBP)base.GetByType(type,null);
            return retValue;
        }
        //aqui
        private async Task approveWorkflow(m.Kontrol.Interfaces.IWorkflowInstance instance) {
            BeginTransaction(true);
            var daoInstance = Get<d.Kontrol.Interfaces.IWorkflowInstance>();
            var bpInstance = await this.getReferenciaBP(instance.Workflow.IdTipo);

            var result = await bpInstance.Authorize(instance.IdReferencia, instance);

            if (!result.Success)
            {
                throw new ApplicationException(result.Message);
            }
            else
            {
                if (instance.Estatus.Clave != "AP")
                {
                    var instanceDao = Get<d.Kontrol.Interfaces.IWorkflowInstance>();

                    var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatusAprobado = await bpEstatus.Get("FLUJOESTATUS", "AP");

                    instance.Changed("EstadoWF", true);
                    instance.Changed("IdEstatus", true);

                    instance.EstadoWF = estatusAprobado.Clave;
                    instance.IdEstatus = estatusAprobado.ID;
                    await instanceDao.SaveEntity(instance);
                }

            }
            Commit();
        }

        private bool isCompleted(m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            bool retValue = false;
            int tareasCompletadas = 0;
            //
            if (instance != null)
            {
                if (instance.Tareas.Count > 0)
                {

                    /*Solo tomar en cuenta tareas ejecutables*/

                    var tareasEjecutables = instance.Tareas.FindAll(x => x.Estatus.Clave != "NOE");

                    foreach (var tarea in tareasEjecutables)
                    {
                        if (tarea.Estatus.Clave == "AP") // NO ASIGNADA
                        {
                            tareasCompletadas += 1;
                        }
                    }

                    if (tareasEjecutables.Count == tareasCompletadas)
                    {
                        retValue = true;
                    }
                }
            }

            return retValue;
        }

        public async Task<m.Kontrol.Interfaces.ITareaInstancia> TaskApproval(m.Kontrol.Interfaces.ITareaInstancia tarea)
        {
            m.Kontrol.Interfaces.ITareaInstancia retValue = null;
            try
            {
                BeginTransaction(true);

                retValue = await Assign(tarea);

                var now = DateTime.UtcNow;
                var idInstancia = tarea.IdInstancia;
                var instanceParameters = new Dictionary<string, object> { { "idInstancia", idInstancia } };
                //
                var daoInstance = Get<d.Kontrol.Interfaces.IWorkflowInstance>();
                var daoInstanceTasks = Get<d.Kontrol.Interfaces.ITareaInstance>();
                //
                var bpUsuarios = Get<p.Kontrol.Interfaces.IUsuario>();
                // instancia && owner
                var instance = await Assign(await daoInstance.GetById(idInstancia));
                var bpReferencia = await this.getReferenciaBP(instance.Workflow.IdTipo);
                //
                var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
                var optionReferencia = await bpOption.GetByClave(bpReferencia.EntityName);
                var optionAut = await bpOption.GetByClave("wmAutorizaciones");
                //
                var pm = await GetGlobalParameters("INSTALACION");

                string linkTarea = $"{pm.Value<string>("SitioWeb")}{optionAut.Ruta}".Replace(":id", "");
                var parametros = new Dictionary<string, object>() {
                    { "LinkReferencia", $"{pm.Value<string>("SitioWeb")}{optionReferencia.Ruta}/{instance.IdReferencia}" },
                    { "LinkTarea", "" },
                    { "LinkFlujo", $"{pm.Value<string>("SitioWeb")}{optionAut.Ruta}".Replace(":id", Convert.ToString(instance.ID.Value)) }
                };
                // 
                var userOwner = await bpUsuarios.GetById(instance.IdUserOwner);
                var toUserOwner = new string[] { $"{userOwner.Nombre} {userOwner.Apellidos}<{userOwner.Clave}>" };
                // 
                var estatus = retValue.Estatus;
                if (estatus.Clave == "AP")
                {
                    // guardar tarea actual
                    retValue.IdEstatus = tarea.IdEstatus;
                    retValue.FechaAprobacion = now;
                    retValue.Comentarios = tarea.Comentarios;
                    retValue.IdCompletadoPor = base.getUserId();
                    retValue = await daoInstanceTasks.SaveEntity(retValue);

                    instance.Tareas = await daoInstanceTasks.GetAll(instanceParameters);
                    //
                    if (this.isCompleted(instance))
                    {
                        // guardar workflow aprobado
                        var estatusWF = await base.GetCGV(FLUJO_ESTATUS, FLUJO_APROBADO);
                        instance.EstadoWF = retValue.Clave;
                        instance.IdEstatus = estatusWF.ID;
                        instance.FechaFin = now;
                        instance = await daoInstance.SaveEntity(instance);
                        retValue.Instancia = instance;

                        // invocar lógica del WF
                        bool bpResultExecution = false;
                        try
                        {
                            var bpResult = await bpReferencia.Authorize(instance.IdReferencia, instance);
                            bpResultExecution = bpResult.Success;
                        }
                        catch {
                        }

                        if (!bpResultExecution)
                        {
                            throw new ApplicationException("Cannot execute underlying Business Process logic");
                        }

                        // enviar notificaciones
                        var notificadores = await daoInstance.GetNotificadores(idInstancia);

                        // enviar al dueño 
                        var pTask = new Dictionary<string, object>(parametros);
                        pTask["LinkTarea"] = $"{linkTarea}/{retValue.ID}";                        
                        // EMAIL
                        await SendNotification(userOwner, "WF-TAREA-COMPLETA", pTask["LinkTarea"].ToString(), retValue, pTask);
                        await SendNotification(userOwner, "WF-AUTORIZADO", parametros["LinkFlujo"].ToString(), instance, parametros);
                        //
                        foreach (dynamic n in notificadores) {
                            await SendNotification(n, "WF-AUTORIZADO", pTask["LinkTarea"].ToString(), instance, parametros);
                        }
                        // LOG
                        await LogEvent(retValue.ID.Value, TASK_ENTITY, 1052, "Aprobado");
                        await LogEvent(instance.ID.Value, WF_ENTITY, 1052, retValue.Clave, "Aprobado");
                        if (bpResultExecution)
                        {
                            await LogEvent(instance.ID.Value, WF_ENTITY, 1050, "Autorizado");
                            await LogEvent(instance.IdReferencia, bpReferencia.EntityName, 1050, $"{instance.Clave}/{retValue.Clave}", "Autorizado");
                        }
                    }
                    else
                    {
                        // siguiente tarea
                        var nextTask = await this.getNextTask(instance);
                        nextTask = await daoInstanceTasks.SaveEntity(nextTask);
                        //aqui

                        // guardar workflow
                        instance.EstadoWF = nextTask.Clave;
                        instance = await daoInstance.SaveEntity(instance);

                        //
                        var pTask = new Dictionary<string, object>(parametros);
                        pTask["LinkTarea"] = $"{linkTarea}/{retValue.ID}"; 
                        
                        /* enviar notificaciones de siguiente tarea*/
                        var pNextTask = new Dictionary<string, object>(parametros);
                        pNextTask["LinkTarea"] = $"{linkTarea}/{nextTask.ID}";

                        var notificadores = await daoInstanceTasks.GetAutorizadoresTarea(nextTask.ID.Value);
                        /*Solo obtener autorizadores ejecutables*/
                        var autorizadoresNextTask = notificadores.FindAll(x => x.Estatus.Clave == "E");


                        await SendNotification(userOwner, "WF-TAREA-COMPLETA", pTask["LinkTarea"].ToString(), retValue, pTask);

                        foreach (dynamic n in autorizadoresNextTask)
                        {
                            await SendNotification(n, "WF-TAREA-ASIGNACION", pNextTask["LinkTarea"].ToString(), nextTask, pNextTask);
                        }


                        // LOG
                        await LogEvent(retValue.ID.Value, TASK_ENTITY, 1052, "Aprobado");
                        await LogEvent(instance.ID.Value, WF_ENTITY, 1052, retValue.Clave, "Aprobado");
                        await LogEvent(nextTask.ID.Value, TASK_ENTITY, 1053, "Asignado");
                        await LogEvent(instance.ID.Value, WF_ENTITY, 1053, nextTask.Clave, "Asignado");
                    }
                }
                else if (estatus.Clave == "RE")
                {
                    // guardar workflow
                    var estatusWF = await base.GetCGV(FLUJO_ESTATUS, FLUJO_RECHAZADO);
                    instance.IdEstatus = estatusWF.ID;
                    instance.FechaFin = DateTime.UtcNow;
                    instance = await daoInstance.SaveEntity(instance);

                    // guardar tarea actual
                    retValue.IdEstatus = tarea.IdEstatus;
                    retValue.FechaAprobacion = now;
                    retValue.Comentarios = tarea.Comentarios;
                    retValue.IdCompletadoPor = base.getUserId();
                    retValue = await daoInstanceTasks.SaveEntity(retValue);

                    // cancelar tareas pendientes
                    var tasks = await daoInstanceTasks.GetAll(instanceParameters);

                    if (tasks != null && tasks.Count > 0) {
                        var estatusCancelado = await base.GetCGV(TAREA_ESTATUS, TAREA_CANCELADO);
                        foreach (var cancelTask in tasks) {
                            if (cancelTask.Estatus.Clave == TAREA_ASIGNADO || cancelTask.Estatus.Clave == TAREA_NO_ASIGNADO) {
                                cancelTask.IdEstatus = estatusCancelado.ID;
                                cancelTask.IdModificadoPor = getUserId();
                                cancelTask.Modificado = now;

                                await daoInstanceTasks.SaveEntity(cancelTask, false);
                            }
                        }
                    }

                    // invocar lógica de la entidad
                    bool bpResultExecution = false;
                    try
                    {
                        var bpResult = await bpReferencia.Reject(instance.IdReferencia, instance);
                        bpResultExecution = bpResult.Success;
                    }
                    catch
                    {
                    }

                    if (!bpResultExecution)
                    {
                        throw new ApplicationException("Cannot execute underlying Business Process logic");
                    }

                    await SendNotification(userOwner, "WF-RECHAZADO", parametros["LinkFlujo"].ToString(), instance, parametros);
                    // LOG
                    await LogEvent(retValue.ID.Value, TASK_ENTITY, 1054, "Rechazado");
                    await LogEvent(instance.ID.Value, WF_ENTITY, 1054, retValue.Clave, "Rechazado");
                    if (tasks != null && tasks.Count > 0)
                    {
                        foreach (var cancelTask in tasks)
                        {
                            await LogEvent(cancelTask.ID.Value, TASK_ENTITY, 1055, "Cancelado");
                        }
                    }
                    if (bpResultExecution)
                    {
                        await LogEvent(instance.ID.Value, WF_ENTITY, 1051, "Rechazado");
                        await LogEvent(instance.IdReferencia, bpReferencia.EntityName, 1051, $"{instance.Clave}/{retValue.Clave}", "Rechazado");
                    }
                }
                retValue = await this.GetAssignedTask(retValue.ID.Value);

                Commit();

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        private async Task<m.Kontrol.Interfaces.ITareaInstancia> getNextTask(m.Kontrol.Interfaces.IWorkflowInstance instance) {
            m.Kontrol.Interfaces.ITareaInstancia retValue = null;

            if (instance != null) {
                if (instance.Tareas != null && instance.Tareas.Count > 0) {
                    for (var i = 0; i < instance.Tareas.Count; i++) {
                        if (instance.Tareas[i].Estatus.Clave == TAREA_NO_ASIGNADO) {
                            retValue = await Assign(instance.Tareas[i]);

                            var estatusAsignado = await base.GetCGV("TAREAESTATUS", "AS");
                            DateTime fechaAsignacion = DateTime.UtcNow;
                            retValue.FechaAsignacion = fechaAsignacion;
                            retValue.FechaVigencia = fechaAsignacion.AddDays(retValue.DiasVigencia);
                            retValue.IdEstatus = estatusAsignado.ID;
                            retValue.Estatus = estatusAsignado;

                            break;
                        }
                    }
                }
            }

            return retValue;
        }

        public async Task AssignTask(m.Kontrol.Interfaces.ITareaInstancia tarea)
        {
            var estatusAsignado = await base.GetCGV("TAREAESTATUS", "AS");
            //

            //if (tarea.Estatus.Clave == "NA") // NO ASIGNADA
            //{
                //
                DateTime fechaAsignacion = DateTime.UtcNow;
                tarea.FechaAsignacion = fechaAsignacion;
                tarea.FechaVigencia = fechaAsignacion.AddDays(tarea.DiasVigencia);
                tarea.IdModificadoPor = base.getUserId();
                tarea.IdEstatus = estatusAsignado.ID;

            //} 
        }

        private int getEstatusVigencia(DateTime? vigencia, double dias)
        {
            if (vigencia == null) {
                return 1;
            }
            double daysDiff = Math.Ceiling((vigencia.Value.Date - DateTime.UtcNow).TotalDays);

            if (daysDiff < 0d)
            {
                return 2;
            }
            else
            {
                if (daysDiff / dias <= 0.75)
                {
                    return 0;
                }
                else
                {
                    return 1;
                }
            }
        }

        public async Task<m.Kontrol.Interfaces.ITareaInstancia> GetAssignedTask(int id) {
            var daoTarea = Get<d.Kontrol.Interfaces.ITareaInstance>();
            var daoInstancia = Get<d.Kontrol.Interfaces.IWorkflowInstance>();

            //
            var retValue = await daoTarea.GetById(id);
            if (retValue != null) { 
                retValue.Instancia = await daoInstancia.GetById(retValue.IdInstancia);
                retValue.Instancia.Referencia = await daoInstancia.GetReferencia(retValue.IdInstancia);
                // Link
                await this.setReferenciaInfo(retValue.Instancia, null);
                //
                if (retValue.Estatus.Clave == "AS")
                {
                    retValue.EstatusVigencia = this.getEstatusVigencia(retValue.FechaVigencia, retValue.DiasVigencia);
                }
                else {
                    retValue.EstatusVigencia = 0;
                }
            }
            return retValue;
        }

        public async Task<object[]> GetAssignedTasks() {
            int idUser = base.getUserId();

            return await dao.GetAssignedTasks(idUser);
        }

        public async Task<object> GetAssignedTasks(Dictionary<string,object> parametros)
        {
            object retValue = null;
            //
            if (await base.IsValidToken(parametros)) {
                int idUser = base.getUserId();

                if (idUser > 0)
                {
                    if (parametros.ContainsKey("estatus"))
                    {
                        if (parametros["estatus"].ToString() == "AS") {
                            retValue = await dao.GetAssignedTasks(idUser);
                        }
                        else {
                            var daoTareas = Get<d.Kontrol.Interfaces.ITareaInstance>();
                            var pTareas = new Dictionary<string, object>() {
                                { "claveEstatus", parametros["estatus"] },
                                { "idUsuario", idUser }
                            };
                            //
                            retValue = await daoTareas.GetAll(pTareas);
                        }
                    }
                    else {
                        base.SetReturnInfo(501, "Invalid status");
                    }
                }
            }
            //
            return retValue;
        }
        public async Task<List<m.Kontrol.Interfaces.IWorkflowInstance>> GetInstances(Dictionary<string, object> parametros)
        {
            var daoInstances = Get<d.Kontrol.Interfaces.IWorkflowInstance>();
            parametros.Add("idUsuario", base.getUserId());
            var retValue = await daoInstances.GetAll(parametros);

            return retValue;
        }
        /*Metodo para obtener los flujos de autorizacion de un usuario, es decir los procesos de los cuales es dueño, 
         lo que el usuario solicito*/
        public async Task<List<m.Kontrol.Interfaces.IWorkflowInstance>> GetUserInstances(Dictionary<string, object> parametros)
        {
            var daoInstances = Get<d.Kontrol.Interfaces.IWorkflowInstance>();
            if (parametros == null) {
                parametros = new Dictionary<string, object>();
            }
            parametros.Add("idUserOwner", base.getUserId());

            var retValue = await daoInstances.GetAll(parametros);

            return retValue;
        }
    }
}