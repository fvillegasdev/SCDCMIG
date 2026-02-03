using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Tarea
        : BPBase<m.Kontrol.Interfaces.ITarea, d.Kontrol.Interfaces.ITarea>, p.Kontrol.Interfaces.ITarea
    {
        public Tarea(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ITarea dao)
               : base(factory, dao, "tarea")
        {
        }

        #region "LEGACY"
        //public async Task<model.ITarea> InsertTask(string FormJson)
        //{
        //    dynamic obj = JsonConvert.DeserializeObject(FormJson);
        //    var m = factory.GetInstance<model.ITarea>();

        //    m.ID = obj.ID;
        //    m.Creado = obj.Creado;
        //    m.Modificado = obj.Modificado;
        //    m.IdCreadoPor = this.getUserId();
        //    m.IdModificadoPor = this.getUserId();
        //    m.DiasVigencia = obj.DiasVigencia;
        //    m.Descripcion = obj.Descripcion;
        //    m.EstadoTarea = obj.EstadoTarea;
        //    m.Orden = obj.Orden;
           
        //    m.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;

        //    m = this.dao.InsertTask(0, m);

        //    await this.Log(m);

        //    return m;
        //}
        //public async Task<model.ITarea> UpdateTask(string FormJson)
        //{
        //    dynamic obj = JsonConvert.DeserializeObject(FormJson);
        //    var m = factory.GetInstance<model.ITarea>();

        //    m.ID = obj.ID;
        //    m.Creado = obj.Creado;
        //    m.Modificado = obj.Modificado;
        //    m.IdCreadoPor = this.getUserId();
        //    m.IdModificadoPor = this.getUserId();
        //    m.DiasVigencia = obj.DiasVigencia;
        //    m.Descripcion = obj.Descripcion;
        //    m.EstadoTarea = obj.EstadoTarea;
        //    m.Orden = obj.Orden;

        //    //m.CreadoPor = obj.CreadoPor.ID;
        //    //m.NombreCreador = obj.CreadoPor.Nombre;
        //    //m.ModificadoPor = obj.CreadoPor.ID;
        //    //m.NombreModificador = obj.CreadoPor.Nombre;

        //    m.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;

        //    int NewTask = this.dao.UpdateTask(m);

        //    //m = daoWF.GetWorkflowTasksById(NewTask);

        //    await this.Log(m);

        //    return m;
        //}

        //public async Task<int> DeleteTask(string FormJson)
        //{
        //    dynamic obj = JsonConvert.DeserializeObject(FormJson);
        //    var m = factory.GetInstance<model.ITarea>();

        //    m.ID = obj.ID;
        //    //m.Creado = obj.Creado;
        //    //m.Modificado = obj.Modificado;
        //    m.IdCreadoPor = this.getUserId();
        //    m.IdModificadoPor = this.getUserId();
        //    //m.FlujoId = obj.FlujoId;
        //    //m.FlujoNombre = obj.FlujoNombre;
        //    //m.DiasVigencia = obj.DiasVigencia;
        //    //m.Descripcion = obj.Descripcion;
        //    //m.EstadoTarea = obj.EstadoTarea;
        //    //m.Orden = obj.Orden;
        //    //m.IdStatus = obj.IdStatus;
        //    //m.StatusNombre = obj.StatusNombre;
        //    //m.AmbitoNombre = obj.AmbitoNombre;
        //    //m.CreadoPor = new EK.Modelo.Kontrol.BaseUsuario() { ID = 1, Nombre = "" };
        //    //m.ModificadoPor = new EK.Modelo.Kontrol.BaseUsuario() { ID = 1, Nombre = "" };

        //    m.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;    

        //    m = this.dao.DeleteTask(m);

        //    await this.Log(m);

        //    return 1;
        //}
        //public List<model.ITarea> ChangeOrderTask(List<model.ITarea> mn)
        //{
        //    var stopWatch = Stopwatch.StartNew();
        //    //dynamic obj = JsonConvert.DeserializeObject(FormJson);
        //    var m = factory.GetInstance<model.ITarea>();

        //    //m.ID = obj.ID;
        //    //m.Nombre = obj.Nombre;
        //    //m.Alias = obj.Alias;
        //    //m.Creado = obj.Creado;
        //    //m.Modificado = obj.Modificado;
        //    //m.IdCreadoPor = 1;
        //    //m.IdAmbito = (int)obj.Ambito.Value;
        //    ////m.CreadoPor = obj.CreadoPor.ID;
        //    ////m.NombreCreador = obj.CreadoPor.Nombre;
        //    ////m.ModificadoPor = obj.CreadoPor.ID;
        //    ////m.NombreModificador = obj.CreadoPor.Nombre;

        //    m.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
        //    stopWatch.Stop();

        //    m = this.dao.InsertTask(0, m);

        //    //this.Log(m, (int)stopWatch.ElapsedMilliseconds);

        //    return mn;
        //}
        //public model.ITarea GetWorkflowTasksInfoNew(int idFlujo)
        //{
        //    return this.dao.GetWorkflowTasksInfoNew(idFlujo);
        //}

        //public List<model.ITareaAsignado> GetTaskAssignedByTask(int IdTarea)
        //{
        //    return this.dao.GetTaskAssignedByTask(IdTarea);
        //}
        //public List<model.IUsuario> GetUsersAssignedByTask(int IdTarea)
        //{
        //    return this.dao.GetUsersAssignedByTask(IdTarea);
        //}
        //public List<model.ITareaAsignado> GetPossibleAssignUsers(string search)
        //{
        //    return this.dao.GetPossibleAssignUsers(search);
        //}
        //public bool SaveTaskAssignedUser(int IdTarea, int AsignadoId, string Tipo)
        //{
        //    return this.dao.SaveTaskAssignedUser(IdTarea, AsignadoId,Tipo);
        //}
        //public bool DeleteTaskAssignedUser(int IdTarea)
        //{
        //    return this.dao.DeleteTaskAssignedUser(IdTarea);
        //}

        //public async Task<object[]> GetHistory(int top)
        //{
        //    return await base.GetEntityHistory("workflowTask", top);
        //}
        //public async Task<object[]> GetHistory(int ID, int top)
        //{
        //    return await base.GetEntityHistory("workflowTask", ID, top);
        //}

        //private async Task Log(model.ITarea obj)
        //{
        //    dynamic entity = new ElasticEntity();

        //    entity.ID = obj.ID;

        //    if (obj != null)
        //    {
        //        entity.IdCliente = 1;
        //        entity.IdClienteNombre = "ENK";
        //    }

        //    //entity.IdEstatus = obj.Estatus.ID;
        //    //entity.IdEstatusClave = obj.Estatus.Clave;
        //    //entity.IdEstatusNombre = obj.Estatus.Nombre;

        //    entity.ID = obj.ID;



        //    entity.ID = obj.ID;
        //    entity.Modificado = obj.Modificado;
        //    //entity.FlujoId = obj.FlujoId;
        //    //entity.FlujoNombre = obj.FlujoNombre;
        //    entity.DiasVigencia = obj.DiasVigencia;
        //    entity.Descripcion = obj.Descripcion;
        //    entity.EstadoTarea = obj.EstadoTarea;
        //    entity.Orden = obj.Orden;

        //    entity.RecordType = Convert.ToInt32(obj.Estado);
        //    entity.RecordTypeName = obj.Estado.ToString();

        //    entity.Creado = obj.Creado;
        //    entity.IdCreadoPor = obj.CreadoPor.ID;
        //    entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

        //    entity.Modificado = obj.Modificado;
        //    entity.IdModificadoPor = base.User.Current.ID;
        //    entity.IdModificadoPorNombre = base.User.Current.Nombre;

        //    await this.factory.GetInstance<ILogger>().AddAsync("workflowTask", entity);
        //}
        #endregion "LEGACY"
    }
}
