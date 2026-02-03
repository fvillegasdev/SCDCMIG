//using pBancos = EK.Procesos.SBO.Interfaces;
//using dBancos = EK.Datos.SBO.Interfaces;
//using bKontrol = EK.Modelo.Kontrol.Interfaces;
//using mBancos = EK.Modelo.SBO.Interfaces;
//using EK.Procesos.Kontrol;
//using Newtonsoft.Json;
//using System;
//using System.Diagnostics;
//using System.Dynamic;
//using EK.Common.Managers;
//using Microsoft.ServiceBus.Messaging;

//namespace EK.Procesos.SBO
//{
//    public class TipoMovimiento: ProcesoBase,  pBancos.ITipoMovimiento
//    {
//        private dBancos.ITipoMovimiento dao;

//        public TipoMovimiento(bKontrol.IContainerFactory factory, dBancos.ITipoMovimiento dao)
//        {
//            this.factory = factory;
//            this.dao = dao;
//        }

    
//        public object[] GetAll()
//        {
//            return this.dao.GetAll();
//        }

//        public mBancos.ITipoMovimiento GetById(int id)
//        {
//            return this.dao.GetById(id);
//        }

//        public object[] GetTipoMovimientoxSub()
//        {
//            return this.dao.GetTipoMovimientoxSub();
//        }

//        public object[] GetTMClasificador(int idTipoClasificador, int idClasificador, int todos)
//        {
//            return this.dao.GetTMClasificador(idTipoClasificador, idClasificador, base.getUserId(), todos);

//        }

//        public mBancos.ITipoMovimiento Insert(string tipomovimiento)
//        {
//            var stopWatch = Stopwatch.StartNew();

        
//            dynamic obj = JsonConvert.DeserializeObject(tipomovimiento);
//            var model = factory.GetInstance<mBancos.ITipoMovimiento>();
//            model.Clave = obj.Clave;
//            model.Descripcion = obj.Descripcion;
//            model.Naturaleza = obj.Naturaleza == "Cargo" ? "1": "0";
//            model.UsaSubTipo = obj.UsaSubTipo == true ? "1" : "0";
//            model.Conciliado = obj.idConciliado;
//            model.IdEstatus = obj.Estatus.ID;
//            model.IdCreadoPor = base.getUserId(); // User.Current.ID; // Obtener del usuario actual
//            model.IdModificadoPor = base.getUserId();  // base.User.Current.ID; // Obtener del usuario actual
//            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
//            stopWatch.Stop();
//            int number = this.dao.Insert(model);
//            stopWatch.Stop();

//            // save - refresh the info
//            model = this.dao.GetById(number);
//            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
//            // log changes
//        //    this.Log(model, (int)stopWatch.ElapsedMilliseconds);

//            return model;

//        }

//        public mBancos.ITipoMovimiento Update(string tipomovimiento)
//        {
//            var stopWatch = Stopwatch.StartNew();


//            dynamic obj = JsonConvert.DeserializeObject(tipomovimiento);
//            var model = factory.GetInstance<mBancos.ITipoMovimiento>();
//            model.ID = obj.ID;
//            model.Clave = obj.Clave;
//            model.Descripcion = obj.Descripcion;
//            model.Naturaleza = obj.Naturaleza == "Cargo" ? "1" : "0";
//            model.UsaSubTipo = obj.UsaSubTipo == true ? "1" : "0";
//            model.Conciliado = obj.idConciliado;
//            model.IdEstatus = obj.Estatus.ID;
//            model.IdCreadoPor = base.getUserId();//base.User.Current.ID; // Obtener del usuario actual
//            model.IdModificadoPor = base.getUserId(); // base.User.Current.ID; // Obtener del usuario actual
//            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
//            stopWatch.Stop();
//            int number = this.dao.Update(model);
//            stopWatch.Stop();

//            model = this.dao.GetById(number);
//            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;

//            // log changes
//           // this.Log(model, (int)stopWatch.ElapsedMilliseconds);

//            return model;

//        }

//        private void Log(mBancos.ITipoMovimiento obj, int elapsedTime)
//        {

//            dynamic entity = new ExpandoObject();

//            entity.ID = obj.ID;

//            entity.IdEstatus = obj.Estatus.ID;
//            entity.IdEstatusClave = obj.Estatus.Clave;
//            entity.IdEstatusNombre = obj.Estatus.Nombre;

//            entity.ID = obj.ID;
//            entity.Descripcion = obj.Descripcion;
//            entity.Clave = obj.Clave;
//            entity.Creado = obj.Creado;
//            entity.Modificado = obj.Modificado;
//            entity.IdModificadoPor = 1;


//            entity.RecordType = Convert.ToInt32(obj.Estado);
//            entity.RecordTypeName = obj.Estado.ToString();
//            entity.ElapsedTime = elapsedTime;

//            entity.Creado = obj.Creado;
//            entity.IdCreadoPor = obj.CreadoPor.ID;
//            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

//            entity.Modificado = obj.Modificado;
//            // entity.IdModificadoPor = base.User.Current.ID;
//            //entity.IdModificadoPorNombre = base.User.Current.Nombre;

//            BrokeredMessage message = new BrokeredMessage(entity);
//            //  message.Properties["type"] = "history";
//            message.Properties["entity"] = "TipoMovimiento";
//            message.Properties["estatus"] = obj.Estatus.Clave;
//            message.Properties["usuario"] = obj.IdModificadoPor.ToString();


//            //   message.Properties["cliente"] = "ekinternal";
//            //   message.Properties["interno"] = "1";


//            ServiceBusManager.Send(message);
//        }
//    }
//}
