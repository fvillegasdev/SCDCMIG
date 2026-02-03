using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class TareaInstance
        : BPBase<m.Kontrol.Interfaces.ITareaInstancia, d.Kontrol.Interfaces.ITareaInstance>, p.Kontrol.Interfaces.ITareaInstance
    {
        public TareaInstance(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ITareaInstance dao)
               : base(factory, dao, "taskinstance")
        {
        }

        public async Task<List<m.Kontrol.Interfaces.ITareaInstancia>> obtenerTareasInstancia(Dictionary<string, object> parametros)
        {
            var daoNI = Get<d.Kontrol.Interfaces.INotificadoresInstancia>();
            List<m.Kontrol.Interfaces.ITareaInstancia> tareasInstancia = new List<m.Kontrol.Interfaces.ITareaInstancia>();
            tareasInstancia = await this.dao.GetAll(parametros);

            foreach (var tareaInstancia in tareasInstancia)
            {
                var parameters = new Dictionary<string, object>() {
                    { "idInstancia", tareaInstancia.ID },
                    { "obtenerUsuarios",false }
                };
                tareaInstancia.Autorizadores = await daoNI.GetAll(parameters);
            }
            return tareasInstancia;
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> obtenerAutorizadores(Dictionary<string, object> parametros)
        {
            var daoNI = Get<d.Kontrol.Interfaces.INotificadoresInstancia>();
            List<m.Kontrol.Interfaces.IUsuario> autorizadoresTareasInstancia = new List<m.Kontrol.Interfaces.IUsuario>();
            autorizadoresTareasInstancia = await daoNI.obtenerUsuariosAutorizadoresTareaInstancia(parametros);
            return autorizadoresTareasInstancia;
        }


        public async Task<object> GetUsersByTaskInstance(Dictionary<string, object> parametros)
        {
            var daoNI = Get<d.Kontrol.Interfaces.INotificadoresInstancia>();
            return await daoNI.GetUsersByTaskInstance(parametros);
        }

        public new async Task<object> GetAll(Dictionary<string, object> parametros)
        {
            var dao = Get<d.Kontrol.Interfaces.INotification>();
            return await dao.GetMessageNotifications(base.getUserId());
        }
    }
}

//using System.Collections.Generic;
 //using pro = EK.Procesos.Kontrol.Interfaces;
 //using dat = EK.Datos.Kontrol.Interfaces;
 //using model = EK.Modelo.Kontrol.Interfaces;
 //using Newtonsoft.Json;
 //using EK.Common.Managers;
 //using System.Diagnostics;
 //using System.Dynamic;
 //using System;
 //using Microsoft.ServiceBus.Messaging;

//using System.Threading.Tasks;
//using EK.Drivers.Log;

//namespace EK.Procesos.Kontrol
//{
//    public class TareaInstance 
//        : ProcesoBase, pro.ITareaInstance
//    {
//        private dat.ITareaInstance dao;
//        public TareaInstance(model.IContainerFactory factory, dat.ITareaInstance dao)
//        {
//            this.factory = factory;
//            this.dao = dao;
//        }

//        //public model.ITareaInstancia GetTaskInstanceByIdTask(int idTareaInstancia)
//        //{
//        //    return this.dao.GetTaskInstanceByIdTask(idTareaInstancia);
//        //}

//        //public List<model.ITareaInstanciaDocumentos> GetDocumentsByTaskInstance(int idTareaInstancia)
//        //{
//        //    return null; // this.dao.GetDocumentsByTaskInstance(idTareaInstancia);
//        //}

//        //public async Task<model.ITareaInstancia> InsertTaskInstance(string FormJson)
//        //{
//        //    dynamic retValue = 0;
//        //    return await Task.FromResult(retValue);
//        //   // dynamic obj = JsonConvert.DeserializeObject(FormJson);
//        //   // var m = factory.GetInstance<model.ITareaInstancia>();

//        //   // m.FlujoId = int.Parse(obj["FlujoId"].ToString());
//        //   // m.FlujoTrabajoInstanciaId = int.Parse(obj["FlujoTrabajoInstanciaId"].ToString());
//        //   // m.TareaId = int.Parse(obj["TareaId"].ToString());
//        //   // m.IdStatus = int.Parse(obj["IdStatus"].ToString());
//        //   // m.Descripcion = obj["Descripcion"].ToString();
//        //   // m.Comentarios = obj["Comentarios"].ToString();
//        //   // m.FechaAprobacion = null;
//        //   // m.FechaAsignacion = obj["FechaAsignacion"] == null ? null : DateTime.Parse(obj["FechaAsignacion"].ToString());
//        //   // m.FechaVigencia = obj["FechaVigencia"] == null ? null : DateTime.Parse(obj["FechaVigencia"].ToString());
//        //   // m.IdCreadoPor = int.Parse(obj["IdCreadoPor"].ToString());
//        //   // m.IdModificadoPor = int.Parse(obj["IdModificadoPor"].ToString());
//        //   // m.IdAprobadoPor = null;
//        //   // m.Orden = int.Parse(obj["Orden"].ToString());
//        //   // m.EstadoStr = obj["EstadoStr"].ToString();
//        //   // m.IdEstatus = int.Parse(obj["IdEstatus"].ToString());     

//        //   // m.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;

//        //   // m = this.dao.InsertTaskInstance(m);
//        //   //await this.Log(m);

//        //   // return m;
//        //}

//        //public async Task<model.ITareaInstancia> UpdateTaskInstance(string FormJson)
//        //{
//        //    dynamic retValue = 0;
//        //    return await Task.FromResult(retValue);

//        //    //dynamic obj = JsonConvert.DeserializeObject(FormJson);
//        //    //var m = factory.GetInstance<model.ITareaInstancia>();

//        //    //m.ID = obj.ID;
//        //    //m.FlujoTrabajoInstanciaId = obj.FlujoTrabajoInstanciaId;
//        //    //m.IdStatus = obj.IdStatus;
//        //    //m.Comentarios = obj.Comentarios;
//        //    //m.IdModificadoPor = 1;//obj.IdModificadoPor;
//        //    //m.IdAprobadoPor = 1;//obj.IdAprobadoPor;            
//        //    //m.EstadoStr = obj.EstadoStr;
//        //    ////m.IdEstatus = obj.IdEstatus;


//        //    //this.dao.UpdateTaskInstance(m);

//        //    //m = this.dao.GetTaskInstanceByIdTask(m.ID.Value);
//        //    //m.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;

//        //    //// log changes
//        //    //await this.Log(m);

//        //    //return m;
//        //}

//        //public async Task<List<model.ITareaInstanciaDocumentos>> InsertDocumentsTaskInstance(string FormJson)
//        //{
//        //    dynamic retValue = 0;
//        //    return await Task.FromResult(retValue);

//        //    //dynamic obj = JsonConvert.DeserializeObject(FormJson);
//        //    //var m = factory.GetInstance<model.ITareaInstanciaDocumentos>();

//        //    //m.TareaInstanciaId = obj.TareaInstanciaId;
//        //    //m.DocumentoId = obj.DocumentoId;
//        //    //m.ArchivoId = obj.ArchivoId;
//        //    //m.Obligatorio = obj.Obligatorio;
//        //    //m.text = obj.text;
//        //    //m.Referencia = obj.Referencia;

//        //    //List<model.ITareaInstanciaDocumentos> lstDocs = this.dao.InsertDocumentsTaskInstance(m);
//        //    //var TI = factory.GetInstance<model.ITareaInstancia>();

//        //    //TI = this.dao.GetTaskInstanceByIdTask(m.TareaInstanciaId);
//        //    //TI.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;

//        //    //TI.Comentarios = "Archivo asignado a instancia";
//        //    //TI.Descripcion = "Archivo:" + obj.Nombre;
//        //    //TI.Creado = DateTime.Now;
//        //    //TI.Modificado = DateTime.Now;
//        //    //TI.IdCreadoPor = this.getUserId();
//        //    //TI.IdModificadoPor = this.getUserId();
//        //    //await this.Log(TI);

//        //    //return lstDocs;
//        //}

//        //public async Task<List<model.ITareaInstanciaDocumentos>> DeleteDocumentsTaskInstance(string FormJson)
//        //{
//        //    dynamic retValue = 0;
//        //    return await Task.FromResult(retValue);

//        //    //var stopWatch = Stopwatch.StartNew();
//        //    //dynamic obj = JsonConvert.DeserializeObject(FormJson);
//        //    //var m = factory.GetInstance<model.ITareaInstanciaDocumentos>();

//        //    //m.TareaInstanciaId = obj.TareaInstanciaId;
//        //    //m.DocumentoId = obj.DocumentoId;
//        //    //m.ArchivoId = obj.ArchivoId;
//        //    //m.Obligatorio = obj.Obligatorio;
//        //    //m.text = obj.text;
//        //    //m.Referencia = obj.Referencia;

//        //    //List<model.ITareaInstanciaDocumentos> lstDocs = this.dao.DeleteDocumentsTaskInstance(m);

//        //    //stopWatch.Stop();
//        //    //var TI = factory.GetInstance<model.ITareaInstancia>();

//        //    //TI = this.dao.GetTaskInstanceByIdTask(m.TareaInstanciaId);
//        //    //TI.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;

//        //    //TI.Comentarios = "Archivo eliminado de la instancia";
//        //    //TI.Descripcion = "Archivo:" + obj.Nombre;
//        //    //TI.Creado = DateTime.Now;
//        //    //TI.Modificado = DateTime.Now;
//        //    //TI.IdCreadoPor = this.getUserId();
//        //    //TI.IdModificadoPor = this.getUserId();
//        //    //await this.Log(TI);

//        //    //return lstDocs;

//        //}

//        //public async Task<object[]> GetHistory(int top)
//        //{
//        //    return await base.GetEntityHistory("workflowTaskInstance", top);
//        //}

//        //public async Task<object[]> GetHistory(int ID, int top)
//        //{
//        //    return await base.GetEntityHistory("workflowTaskInstance", ID, top);
//        //}

//        //private async Task Log(model.ITareaInstancia obj)
//        //{
//        //    //dynamic entity = new ElasticEntity();

//        //    //entity.ID = obj.ID;

//        //    ////entity.IdEstatus = obj.Estatus.ID;
//        //    ////entity.IdEstatusClave = obj.Estatus.Clave;
//        //    ////entity.IdEstatusNombre = obj.Estatus.Nombre;

//        //    //entity.Modificado = obj.Modificado;
//        //    //entity.FlujoId = obj.FlujoId;
//        //    //entity.FlujoTrabajoInstanciaId = obj.FlujoTrabajoInstanciaId;
//        //    //entity.TareaId = obj.TareaId;
//        //    //entity.NombreFlujoInstancia = obj.NombreFlujoInstancia;
//        //    //entity.IdStatus = obj.IdStatus;
//        //    //entity.Descripcion = obj.Descripcion;
//        //    //entity.Comentarios = obj.Comentarios;
//        //    //entity.IdCreadoPor = obj.IdCreadoPor;
//        //    //entity.IdModificadoPor = obj.IdModificadoPor;

//        //    //if (obj.FechaAprobacion != null)
//        //    //{
//        //    //    entity.FechaAprobacion = obj.FechaAprobacion;
//        //    //}

//        //    //if (obj.FechaAsignacion != null)
//        //    //{
//        //    //    entity.FechaAsignacion = obj.FechaAsignacion;
//        //    //}

//        //    //entity.FechaVigencia = obj.FechaVigencia;
//        //    //entity.IdAprobadoPor = obj.IdAprobadoPor;
//        //    //entity.Orden = obj.Orden;
//        //    //entity.EstadoStr = obj.EstadoStr;
//        //    //entity.IdStatus = obj.Status.ID;
//        //    //entity.StatusNombre = obj.Status.Nombre;
//        //    //entity.StatusClave = obj.Status.Clave;
//        //    //entity.IdAmbito = obj.Ambito.ID;
//        //    //entity.AmbitoNombre = obj.Ambito.Nombre;
//        //    //entity.AmbitoClave = obj.Ambito.Clave;

//        //    //if (obj.IdAprobadoPor != null)
//        //    //{
//        //    //    entity.IdAprobadoPor = obj.AprobadoPor.ID;
//        //    //    entity.AprobadoPorNombre = obj.AprobadoPor.Nombre;
//        //    //}

//        //    //entity.DescripcionTarea = obj.DescripcionTarea;

//        //    //entity.RecordType = Convert.ToInt32(obj.Estado);
//        //    //entity.RecordTypeName = obj.Estado.ToString();

//        //    //if (obj.Creado != null)
//        //    //{
//        //    //    entity.Creado = obj.Creado;
//        //    //    entity.IdCreadoPor = obj.CreadoPor.ID;
//        //    //    entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
//        //    //}

//        //    //if (obj.Modificado != null)
//        //    //{
//        //    //    entity.Modificado = obj.Modificado;
//        //    //    entity.IdModificadoPor = base.User.Current.ID;
//        //    //    entity.IdModificadoPorNombre = base.User.Current.Nombre;
//        //    //}
//        //    //await this.factory.GetInstance<ILogger>().AddAsync("workflowTaskInstance", entity);
//        //}

//        //#region MisProcesos


//        //public List<model.ITareaInstancia> GetMyTasks(int TipoConsulta)
//        //{
//        //    List<model.ITareaInstancia> result = null;
//        //    result = null; // this.dao.GetMyTasks(this.getUserId(), TipoConsulta);              
//        //    return result;
//        //}
//        //#endregion
//    }
//}