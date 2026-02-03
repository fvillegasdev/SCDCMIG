//using System;
//using System.Collections.Generic;
//using System.Configuration;
////using pro = EK.Procesos.Kontrol.Interfaces;
////using model = EK.Modelo.Kontrol.Interfaces;
//using SimpleInjector;
//using Microsoft.Azure;
//using Microsoft.ServiceBus.Messaging;
//using System.Collections;
//using EK.Utils;
//using EK.Common.Utils;


//namespace EK.WebJobs.APIWorkflow
//{
//    public class Instances
//    {
//        //private int UserCreatorId = 0;
//        //private int IdCliente = 0;
//        //private string NombreUsuario = "";
    

//        public Instances ()
//        {
            
//        }

//        public bool Listener()
//        {

//            string connectionString = CloudConfigurationManager.GetSetting("ek:ServiceBus$workflows-new");
//            connectionString += "EntityPath=workflows-new";

//            QueueClient client = QueueClient.CreateFromConnectionString(connectionString);

//            // Configure the callback options.
//            OnMessageOptions options = new OnMessageOptions();
//            options.AutoComplete = false;
//            options.AutoRenewTimeout = TimeSpan.FromMinutes(1);

//            client.OnMessage((message) =>
//            {
//                try
//                {                    
//                    var propMsg = message.Properties;
//                    var ClaveTipo = propMsg.ContainsKey("typeKey") == false ? "" : propMsg["typeKey"].ToString();
//                    var Reference = propMsg.ContainsKey("reference") == false ? "" : propMsg["reference"].ToString();
//                    var ReferenceJSON = propMsg.ContainsKey("referenceJSON") == false ? "" : propMsg["referenceJSON"].ToString();
//                    var user = ConfigurationManager.AppSettings["workflow:user"];
//                    var password = ConfigurationManager.AppSettings["workflow:password"];

//                    var clientAPI = APIClient.Create("kontrolapi", user, password);
//                    var parameters = new Dictionary<string, object>
//                            {
//                                { "ClaveTipo",ClaveTipo },
//                                { "Reference",Reference },
//                                { "ReferenceJSON",ReferenceJSON },
//                                { "WFUserCreator",user }
//                            };
//                    dynamic Result = clientAPI.Invoke("/WorkflowManager/StartListener", parameters);
//                }
//                catch (Exception ex)
//                {
//                    Console.Write(ex.Message.ToString());
//                    message.Abandon();
//                    //throw;
//                }

//            }, options);

//            return true;
//        }


//        #region FUnciones anteriores
//         //    private Dictionary<string, string> GetCatalogArray(string clave)
//    //    {
//    //        var client = APIClient.Create("api");
//    //        var parameters = new Dictionary<string, object>
//    //            {
//    //                { "clave",clave },
//    //                { "activos",0 }
//    //            };
//    //        dynamic Result = client.Invoke("/CatalogosGeneralesValores/GetByCatalogo", parameters);

//    //        if (Result.Count > 0)
//    //        {
//    //            Dictionary<string, string> LII = new Dictionary<string, string>();

//    //            foreach (var item in Result)
//    //            {
//    //                LII.Add(item.ID.ToString(), item.Clave.ToString());
//    //            }
//    //            return LII;
//    //        }
//    //        return Result;         
//    //    }       
//    //    private int GetCatalogValue(Dictionary<string, string> collection, string nombre)
//    //{
//    //    foreach (var item in collection)
//    //    {
//    //        if (item.Value.Trim() == nombre)
//    //        {
//    //            return int.Parse(item.Key);
//    //        }
//    //    }
//    //    return 0;
//    //}

        



//        //public bool Listener()
//        //{

//        //    string connectionString = CloudConfigurationManager.GetSetting("ek:ServiceBus$workflows-new");
//        //    connectionString += "EntityPath=workflows-new";

//        //    QueueClient client = QueueClient.CreateFromConnectionString(connectionString);

//        //    // Configure the callback options.
//        //    OnMessageOptions options = new OnMessageOptions();
//        //    options.AutoComplete = false;
//        //    options.AutoRenewTimeout = TimeSpan.FromMinutes(1);

//        //     GetWorkflowServiceUserbyMail();

//        //    var GralStatus = this.GetCatalogArray("ESTATUS");
//        //    var WFStatus = this.GetCatalogArray("FLUJOESTATUS");
//        //    var TaskStatus = this.GetCatalogArray("TAREASTATUS");            

//        //    client.OnMessage((message) =>
//        //    {
//        //        try
//        //        {
//        //            var entity = message;                
//        //            var propMsg = message.Properties;
//        //            var ClaveTipo = propMsg.ContainsKey("typeKey") == false? "": propMsg["typeKey"].ToString();
//        //            var ClaveWF = propMsg.ContainsKey("workflowKey") == false ? "" : propMsg["workflowKey"].ToString();
//        //            var Reference = propMsg.ContainsKey("reference") == false ? "" : propMsg["reference"].ToString();
//        //            var ReferenceJSON = propMsg.ContainsKey("referenceJSON") == false? "" : propMsg["referenceJSON"].ToString();

//        //            if (ClaveTipo.Length > 0 && ClaveWF.Length > 0)
//        //            {
//        //                var wfi = this.GetWorkflowInstancebyKeys(ClaveTipo, ClaveWF, Reference);

//        //                if (wfi == null)
//        //                {
//        //                    var wf = this.GetWorkflowByKey(ClaveTipo, ClaveWF);
//        //                    if (wf != null)//Verifica si existe el flujo de trabajo de la clave
//        //                    {
//        //                        var NewInstance = new Dictionary<string, string>
//        //                        {
//        //                            { "FlujoId" , wf["ID"] },
//        //                            { "Nombre" , wf["Nombre"] },
//        //                            { "Alias" , "Instancia WF" + wf["ID"] },
//        //                            { "IdStatus" , this.GetCatalogValue(WFStatus, "EP").ToString() },
//        //                            { "EstadoStr" , "" },
//        //                            { "Referencia" , Reference },
//        //                            { "ReferenciaJSON" , ReferenceJSON },
//        //                            { "IdAmbito" , wf["IdAmbito"] },
//        //                            { "IdTipo" , wf["IdTipo"] },
//        //                            { "IdEstatus" , wf["IdEstatus"] },
//        //                            { "Automatico" , wf["Automatico"] },
//        //                            { "CreadoPor", UserCreatorId.ToString()},
//        //                            { "ModificadoPor", UserCreatorId.ToString()}

//        //                        };
//        //                        wfi = this.InsertWorkflowInstance(NewInstance); // Inserta la instancia de flujo

//        //                        var wftasks = this.GetTasksByWorkflow(int.Parse(wf["ID"])); // obtiene las actividades del flujo

//        //                        if (wftasks != null && wftasks.Count > 0)
//        //                        {
//        //                            Dictionary<string,string> FirstTask = null;
//        //                            Dictionary<string, string> TaskInserted = null;

//        //                            foreach (var t in wftasks) //Inserta cada tarea del flujo en las instancias
//        //                            {
//        //                                var Newtask = new Dictionary<string, string>
//        //                                {
//        //                                    {"FlujoId" , wf["ID"] },
//        //                                    {"FlujoTrabajoInstanciaId" , wfi["ID"] },
//        //                                    {"TareaId" , t["ID"] },
//        //                                    {"IdStatus" , t["IdStatus"] },
//        //                                    {"Descripcion" , t["Descripcion"] },
//        //                                    {"Comentarios" , "" },
//        //                                    {"FechaAsignacion" , DateTime.UtcNow.ToString() },
//        //                                    {"FechaVigencia" , DateTime.UtcNow.AddDays(7).ToString() },
//        //                                    {"IdCreadoPor" , UserCreatorId.ToString() },
//        //                                    {"IdModificadoPor" , UserCreatorId.ToString()},
//        //                                    {"Orden" , t["Orden"] },
//        //                                    {"EstadoStr" , t["EstadoTarea"] },
//        //                                    {"IdEstatus" , t["IdEstatus"] }
//        //                                };

//        //                                if (FirstTask == null)
//        //                                {
//        //                                    FirstTask = this.InsertTaskInstance(Newtask);
//        //                                    this.SendMailTaskAssigned(int.Parse(wf["ID"]), int.Parse(FirstTask["ID"].ToString()));
//        //                                }
//        //                                else
//        //                                {
//        //                                    TaskInserted = this.InsertTaskInstance(Newtask);
//        //                                    this.SendMailTaskAssigned(int.Parse(wf["ID"]), int.Parse(TaskInserted["ID"].ToString()));
//        //                                }

//        //                            }

//        //                            if (FirstTask != null) //Crea la notificacion de la primera tarea
//        //                            {
//        //                                var NewStorageTarea = new Dictionary<string,string>
//        //                                {
//        //                                    {"TareaInstanciaId" , FirstTask["ID"]},
//        //                                    {"DescripcionTareaInstancia" , FirstTask["Descripcion"] },
//        //                                    {"TareaId" , FirstTask["TareaId"] },
//        //                                    {"DescripcionTarea" , FirstTask["DescripcionTarea"] },
//        //                                    {"IdStatus" , FirstTask["IdStatus"] },                                            
//        //                                    {"Comentarios" , FirstTask["Comentarios"] },
//        //                                    {"FechaAsignacion" , FirstTask["FechaAsignacion"] },
//        //                                    {"FechaVigencia" , FirstTask["FechaVigencia"] },
//        //                                    {"Orden" , FirstTask["Orden"] },
//        //                                    {"EstadoStr" , FirstTask["EstadoStr"] },
//        //                                    {"Tipo" , "N" },
//        //                                    {"IdCreadoPor" , UserCreatorId.ToString() },
//        //                                    {"IdModificadoPor" , UserCreatorId.ToString() },
//        //                                    {"IdEstatus" , FirstTask["IdEstatus"] }
//        //                                };

//        //                                this.InsertStorageTarea(NewStorageTarea);
//        //                            }
//        //                        }
//        //                    }
//        //                }
//        //            }                          
//        //        }
//        //        catch (Exception ex)
//        //        {
//        //            Console.Write(ex.Message.ToString());
//        //            message.Abandon();
//        //                //throw;
//        //            }

//        //    }, options);

//        //    return true;
//        //}



//        //public Dictionary<string,string> GetWorkflowInstancebyKeys(string TypeKey, string WorkflowKey, string Reference)
//        //{
//        //    var client = APIClient.Create("api");
//        //    var parameters = new Dictionary<string, object>
//        //        {
//        //            { "TypeKey",TypeKey },
//        //            { "WorkflowKey",WorkflowKey },
//        //            { "Reference",Reference}
//        //        };
//        //    dynamic Result = client.Invoke("/WorkflowManager/GetWorkflowInstancebyReference", parameters);

//        //    if (Result.Codigo == null)
//        //    {
//        //        var WFI = new Dictionary<string, string>
//        //        {
//        //            { "ID" , Result["ID"].ToString() },
//        //            { "Nombre" , Result["Nombre"].ToString() }
//        //            //IdAmbito = Result["IdAmbito"],
//        //            //IdTipo = Result["IdTipo"],
//        //            //IdEstatus = Result["IdEstatus"],
//        //            //Automatico = Result["Automatico"]
//        //        };
//        //        return WFI;
//        //    }
//        //    return null;
//        //    //return daoM.GetWorkflowInstancebyReference(Key, Reference);
//        //}

//        //public bool InsertStorageTarea(Dictionary<string, string> StorageTask)
//        //{
//        //    var client = APIClient.Create("api");
//        //    var parameters = new Dictionary<string, object>
//        //        {
//        //            { "FormJson",Newtonsoft.Json.JsonConvert.SerializeObject(StorageTask) } 
//        //        };
//        //    dynamic Result = client.Invoke("/WorkflowManager/InsertStorageTarea", parameters);
//        //    return Result;
//        //    //return daoM.InsertStorageTarea(StorageTask);
//        //}

//        //public Dictionary<string, string> GetWorkflowByKey(string TypeKey, string WorkflowKey)
//        //{
//        //    var client = APIClient.Create("api");
//        //    var parameters = new Dictionary<string, object>
//        //        {
//        //             { "TypeKey",TypeKey },
//        //            { "WorkflowKey",WorkflowKey }
//        //        };
//        //    dynamic Result = client.Invoke("/Workflows/GetWorkflowByKey", parameters);

//        //    if (Result.Codigo == null)
//        //    {
//        //        var WF = new Dictionary<string, string>
//        //        {
//        //            { "ID" , Result["ID"].ToString() },
//        //            { "Nombre" , Result["Nombre"].ToString() },
//        //            { "IdAmbito" , Result["IdAmbito"].ToString() }, 
//        //            { "IdTipo" , Result["IdTipo"].ToString() },
//        //            { "IdEstatus" , Result["IdEstatus"].ToString() },
//        //            { "Automatico" , Result["Automatico"].ToString() }

//        //        };

//        //        return WF;                
//        //    }
//        //    return null;
//        //    //return daoWF.GetWorkflowByKey(Key);
//        //}

//        //public List<Dictionary<string, string>> GetTasksByWorkflow(int idFlujo)
//        //{
//        //    var client = APIClient.Create("api");
//        //    var parameters = new Dictionary<string, object>
//        //        {
//        //            { "idFlujo",idFlujo }
//        //        };
//        //    dynamic Result = client.Invoke("/Workflows/GetTasksByWorkflow", parameters);
//        //    List<Dictionary<string,string>> retVal = new List<Dictionary<string, string>>(); 
//        //    if (Result.Count > 0)
//        //    {
//        //        foreach (var item in Result)
//        //        {
//        //            var Task = new Dictionary<string, string>
//        //            {
//        //                { "ID" , item["ID"].ToString() },
//        //                { "IdStatus" , item["IdStatus"].ToString() },
//        //                { "Descripcion" , item["Descripcion"].ToString() },                                                                       
//        //                { "Orden" , item["Orden"].ToString() },
//        //                { "EstadoTarea" , item["Orden"] == 1 ? "Autorizando" : "Pendiente" }, 
//        //                { "IdEstatus" , item["IdEstatus"].ToString() }
//        //            };

//        //            retVal.Add(Task);
//        //        }

//        //        return retVal;
//        //    }
//        //    return null;

//        //    //return daoWF.GetTasksByWorkflow(idFlujo);
//        //}

//        //public Dictionary<string,string> InsertWorkflowInstance(Dictionary<string, string> WFInstance)
//        //{
//        //    var client = APIClient.Create("api");
//        //    var parameters = new Dictionary<string, object>
//        //        {
//        //            { "FormJson",Newtonsoft.Json.JsonConvert.SerializeObject(WFInstance) }
//        //        };
//        //    dynamic Result = client.Invoke("/WorkflowInstance/InsertWorkflowInstance",parameters);
//        //    //model.IWorkflowInstance retVal = (Result.Codigo == 1 ? null : Result);
//        //    //return retVal;
//        //    if (Result.Codigo == null)
//        //    {
//        //        var WFI = new Dictionary<string, string>
//        //        {
//        //            { "ID", Result["ID"].ToString() },
//        //            { "Nombre", Result["Nombre"].ToString() },
//        //            { "IdAmbito", Result["IdAmbito"].ToString() },
//        //            { "IdTipo", Result["IdTipo"].ToString() },
//        //            { "IdEstatus", Result["IdEstatus"].ToString() },
//        //            { "Automatico", Result["Automatico"].ToString() }
//        //        };

//        //        return WFI;
//        //    }
//        //    return null;
//        //    //return daoWFI.InsertWorkflowInstance(WFInstance);
//        //}

//        //public Dictionary<string, string> InsertTaskInstance(Dictionary<string, string> TaskInstance)
//        //{
//        //    var client = APIClient.Create("api");
//        //    var parameters = new Dictionary<string, object>
//        //        {
//        //           { "FormJson",Newtonsoft.Json.JsonConvert.SerializeObject(TaskInstance) }  
//        //        };
//        //    dynamic Result = client.Invoke("/TaskInstance/InsertTaskInstance", parameters);
//        //    //model.ITareaInstancia retVal = (Result.Codigo == 1 ? null : Result);
//        //    //return retVal;
//        //    if (Result.Codigo == null)
//        //    {
//        //        var WFI = new Dictionary<string, string>
//        //        {
//        //            { "ID", Result["ID"].ToString() },
//        //            { "TareaId", Result["TareaId"].ToString() },
//        //            { "DescripcionTarea", Result["DescripcionTarea"].ToString() },
//        //            { "Comentarios", Result["Comentarios"].ToString() },
//        //            { "IdEstatus", Result["IdEstatus"].ToString() },
//        //            { "FlujoTrabajoInstanciaId", Result["FlujoTrabajoInstanciaId"].ToString() },                    
//        //            { "IdStatus", Result["IdStatus"].ToString() },
//        //            { "Descripcion", Result["Descripcion"].ToString() },
//        //            { "Orden", Result["Orden"].ToString() },
//        //            { "EstadoStr", Result["EstadoStr"].ToString() } ,
//        //            { "FechaAsignacion", Result["FechaAsignacion"].ToString() },
//        //            { "FechaVigencia", Result["FechaVigencia"].ToString() }
//        //        };

//        //        return WFI;
//        //    }
//        //    return null;
//        //    //return daoTI.InsertTaskInstance(TaskInstance);
//        //}

//        //public int SendMailTaskAssigned(int IdFlujo, int IdTareaInstancia)
//        //{
//        //    var client = APIClient.Create("api");
//        //    var parameters = new Dictionary<string, object>
//        //        {
//        //            { "IdFlujo",IdFlujo },
//        //            { "IdTarea",IdTareaInstancia },
//        //            { "IdCliente", this.IdCliente},
//        //            { "NombreUsuario", this.NombreUsuario}
//        //        };
//        //    dynamic Result = client.Invoke("/EnvioCorreo/SendMailTaskAssigned", parameters);
//        //    return Result;

//        //}

//        //private int GetWorkflowServiceUserbyMail()
//        //{
//        //    var client = APIClient.Create("api");
//        //    var parameters = new Dictionary<string, object>
//        //        {
//        //            { "email","workflow-service@ruba.mx" }
//        //        };
//        //    dynamic Result = client.Invoke("/Usuarios/GetByEmail", parameters);

//        //    if (Result.Codigo == null)
//        //    {
//        //        this.UserCreatorId = int.Parse(Result["ID"].ToString());
//        //        this.NombreUsuario = Result["Nombre"].ToString();
//        //        this.IdCliente = int.Parse(Result["IdCliente"].ToString());
//        //    }
//        //    return 0;
//        //}
//        #endregion
//    }
//}
