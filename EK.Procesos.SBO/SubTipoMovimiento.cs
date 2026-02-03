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
//    public class SubTipoMovimiento : ProcesoBase, pBancos.ISubTipoMovimiento
//    {
//        private dBancos.ISubTipoMovimiento dao;

//        public SubTipoMovimiento(bKontrol.IContainerFactory factory, dBancos.ISubTipoMovimiento dao)
//        {
//            this.factory = factory;
//            this.dao = dao;
//        }
//        public object[] GetAll()
//        {
//            return this.dao.GetAll();
//        }

//        public mBancos.ISubTipoMovimiento GetById(int id)
//        {

//            return this.dao.GetById(id);
//        }

//        public mBancos.ISubTipoMovimiento Insert(string subtm)
//        {
//            var stopWatch = Stopwatch.StartNew();


//            dynamic obj = JsonConvert.DeserializeObject(subtm);
//            var model = factory.GetInstance<mBancos.ISubTipoMovimiento>();
//            model.Clave = obj.Clave;
//            model.Descripcion = obj.Descripcion;
//            model.IdTipoMovimiento = obj.TipoMovimiento.ID;
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
//          //  this.Log(model, (int)stopWatch.ElapsedMilliseconds);

//            return model;
//        }

//        public mBancos.ISubTipoMovimiento Update(string subtm)
//        {
//            var stopWatch = Stopwatch.StartNew();


//            dynamic obj = JsonConvert.DeserializeObject(subtm);
//            var model = factory.GetInstance<mBancos.ISubTipoMovimiento>();
//            model.ID = obj.ID;
//            model.Clave = obj.Clave;
//            model.Descripcion = obj.Descripcion;
//            model.IdTipoMovimiento = obj.TipoMovimiento.ID;
//            model.IdEstatus = obj.Estatus.ID;
//            model.IdCreadoPor = base.getUserId(); // User.Current.ID; // Obtener del usuario actual
//            model.IdModificadoPor = base.getUserId();  // base.User.Current.ID; // Obtener del usuario actual
//            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
//            stopWatch.Stop();
//            int number = this.dao.Insert(model);
//            stopWatch.Stop();

//            // save - refresh the info
//            model = this.dao.GetById(model.ID.Value);
//            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;

//            // log changes
//        //    this.Log(model, (int)stopWatch.ElapsedMilliseconds);

//            return model;
//        }

//        private void Log(mBancos.ISubTipoMovimiento obj, int elapsedTime)
//        {

//            dynamic entity = new ExpandoObject();

//            entity.ID = obj.ID;

//            entity.IdEstatus = obj.Estatus.ID;
//            entity.IdEstatusClave = obj.Estatus.Clave;
//            entity.IdEstatusNombre = obj.Estatus.Nombre;

//            entity.ID = obj.ID;
//            entity.Descripcion = obj.Descripcion;
//            entity.Clave = obj.Clave;
   
//            entity.RecordType = Convert.ToInt32(obj.Estado);
//            entity.RecordTypeName = obj.Estado.ToString();
//            entity.ElapsedTime = elapsedTime;

//            entity.Creado = obj.Creado;
//            entity.IdCreadoPor = obj.CreadoPor.ID;
//            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

//            entity.Modificado = obj.Modificado;
//           // entity.IdModificadoPor = base.User.Current.ID;
//            //entity.IdModificadoPorNombre = base.User.Current.Nombre;

//            BrokeredMessage message = new BrokeredMessage(entity);
//          //  message.Properties["type"] = "history";
//            message.Properties["entity"] = "subTipoMovimiento";
//            message.Properties["estatus"] = obj.Estatus.Clave;
//            message.Properties["usuario"] = obj.IdModificadoPor.ToString();


//         //   message.Properties["cliente"] = "ekinternal";
//         //   message.Properties["interno"] = "1";


//            ServiceBusManager.Send(message);
//        }
//    }
//}
