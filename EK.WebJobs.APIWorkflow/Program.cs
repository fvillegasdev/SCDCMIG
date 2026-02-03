using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Runtime.Serialization;
using System.Xml;

using Microsoft.Azure;
using Microsoft.ServiceBus;
using Microsoft.ServiceBus.Messaging;

//using EK.Common.Managers;

namespace EK.WorkflowManager.APIWorkflowManager
{
    class Program
    {
        //private static EK.WebJobs.APIWorkflow.Instances WFInst = new WebJobs.APIWorkflow.Instances();

        static void Main(string[] args)
        {
            //EK.WebJobs.APIWorkflow.Instances WFInst = new WebJobs.APIWorkflow.Instances();
            //WFInst.Listener();
            //Console.Read();
        }

        //private static void initAPIListenerWF()
        //{

        //    string connectionString = CloudConfigurationManager.GetSetting("ek:ServiceBus");            
        //    //SubscriptionClient client =
        //    //    SubscriptionClient.CreateFromConnectionString(connectionString, "workflow", "requests");

        //    QueueClient client = QueueClient.CreateFromConnectionString(connectionString);


        //    // Configure the callback options.
        //    OnMessageOptions options = new OnMessageOptions();
        //    options.AutoComplete = false;
        //    options.AutoRenewTimeout = TimeSpan.FromMinutes(1);

        //    client.OnMessage((message) =>
        //    {
        //        try
        //        {
        //            var bodyData = message.GetBody<Dictionary<string, object>>();
        //            var propMsg = message.Properties;
        //            var Reference = propMsg["reference"].ToString();
        //            var Key = propMsg["entity"].ToString();
        //            var wfi = WFInst.GetWorkflowInstancebyReference(Key,Reference);

        //            if (wfi == null)
        //            {                       
        //                var wf = WFInst.daoWF.GetWorkflowByKey(Key);
        //                if (wf != null)//Verifica si existe el flujo de trabajo de la referencia
        //                {
        //                    var NewInstance = new Modelo.Kontrol.WorkflowInstance()
        //                    {
        //                        FlujoId = (int)wf.ID,
        //                        Nombre = wf.Nombre,
        //                        Alias = "Instancia WF" + wf.ID,
        //                        IdStatus = 15,
        //                        EstadoStr = "",
        //                        Referencia = Reference,
        //                        IdAmbito = wf.IdAmbito,
        //                        IdEntidad = wf.IdEntidad
        //                    };
        //                    wfi = WFInst.daoWFI.InsertWorkflowInstance(NewInstance); // Inserta la instancia de flujo

        //                    var wftasks = WFInst.daoWF.GetTasksByWorkflow((int)wfi.ID); // obtiene las actividades del flujo

        //                    if (wftasks != null)
        //                    {
        //                        Modelo.Kontrol.Interfaces.ITareaInstancia FirstTask=null;

        //                        foreach (var t in wftasks) //Inserta cada tarea del flujo en las instancias
        //                        {
        //                            var Newtask = new Modelo.Kontrol.TareaInstancia()
        //                            {
        //                                FlujoTrabajoInstanciaId = (int)wfi.ID,
        //                                TareaId = (int)t.ID,
        //                                IdStatus = t.IdStatus,
        //                                Descripcion = t.Descripcion,
        //                                Comentarios = "",
        //                                FechaAprobacion = null,
        //                                FechaAsignacion = null,
        //                                FechaVigencia = null,
        //                                IdCreadoPor = 1,
        //                                IdModificadoPor = 1,
        //                                AprobadoPor = null,
        //                                Orden = t.Orden,
        //                                EstadoStr = t.EstadoTarea,
        //                                IdEstatus = t.IdEstatus
        //                            };

        //                            if (FirstTask.ID == null)
        //                            {
        //                                FirstTask = WFInst.daoTI.InsertTaskInstance(Newtask);
        //                            }
        //                            else {
        //                                WFInst.daoTI.InsertTaskInstance(Newtask);
        //                            }                                                                                                     
        //                        }

        //                        if (FirstTask != null) //Crea la notificacion de la primera tarea
        //                        {
        //                            var NewStorageTarea = new Modelo.Kontrol.StorageTarea()
        //                            {
        //                                TareaInstanciaId = (int)FirstTask.ID,
        //                                DescripcionTareaInstancia = FirstTask.Descripcion,
        //                                TareaId = FirstTask.TareaId,
        //                                DescripcionTarea = FirstTask.DescripcionTarea,
        //                                IdStatus = FirstTask.IdStatus,
        //                                NombreStatus = FirstTask.Status.Nombre,
        //                                Comentarios = FirstTask.Comentarios,
        //                                FechaAprobacion = (DateTime)FirstTask.FechaAprobacion,
        //                                FechaAsignacion = (DateTime)FirstTask.FechaAsignacion,
        //                                FechaVigencia = (DateTime)FirstTask.FechaVigencia,
        //                                AprobadoPor = (int)FirstTask.AprobadoPor.ID,
        //                                Orden = FirstTask.Orden,
        //                                EstadoStr = FirstTask.EstadoStr,
        //                                Tipo = 1
        //                            };

        //                            WFInst.InsertStorageTarea(NewStorageTarea);
        //                        }                               
        //                    }
        //                }
        //                else
        //                {
        //                }
        //            }

        //            //Revisa si se Autorizó o Rechazo el WF

        //            message.Complete();
        //        }
        //        catch (Exception ex)
        //        {
        //            Console.Write(ex.Message.ToString());
        //            message.Abandon();
        //            //throw;
        //        }

        //    }, options);
        //}


    }
}
