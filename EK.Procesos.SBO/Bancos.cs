using pBancos = EK.Procesos.SBO.Interfaces;
using dBancos = EK.Datos.SBO.Interfaces;
using bKontrol = EK.Modelo.Kontrol.Interfaces;
using mBancos = EK.Modelo.SBO.Interfaces;
using EK.Procesos.Kontrol;
using Newtonsoft.Json;
using System;
using System.Diagnostics;
using Microsoft.ServiceBus.Messaging;
using EK.Common.Managers;
using System.Threading.Tasks;
using EK.Common.Utils;
using EK.Drivers.Log;

namespace EK.Procesos.SBO
{
    public class Bancos : ProcesoBase, pBancos.IBancos
    {
        private dBancos.IBancos dao;
        //private const string entityName = "bancos";

        public Bancos(bKontrol.IContainerFactory factory, dBancos.IBancos dao) : base(factory)
        {
            this.factory = factory;
            this.dao = dao;
            this.entityName = "bancos";
        }

        public async Task<object[]> GetAll()
        {
            return await this.dao.GetAll();
        }

        public async Task<object[]> compania(int idCompania)
        {
            return await this.dao.compania(idCompania);
        }
        public async Task<mBancos.IBancos> GetById(int id)
        {
            return await this.dao.GetById(id);
        }

        public async Task<mBancos.IBancos> Insert(string banco)
        {
            var stopWatch = Stopwatch.StartNew();


            dynamic obj = JsonConvert.DeserializeObject(banco);
            var model = factory.GetInstance<mBancos.IBancos>();
            //model.Clave = obj.Clave;
            //model.Descripcion = obj.Descripcion;
            //model.Sucursal = obj.Sucursal;
            //model.Direccion = obj.Direccion;
            //model.Telefono1 = obj.Telefono1;
            //model.ExtTel = obj.ExtTel;
            //model.Responsable = obj.Responsable;
            //model.IdBancoSAT = (obj.BancoSAT != null) ? obj.BancoSAT : (obj.BancoSAT.ID != null ? obj.BancoSAT.ID : null);
            //model.BancoExtranjero = obj.BancoExtranjero == true ? "1" : "0";
            //model.IdLocalidad = obj.Localidad;
            //model.Swift = obj.Swift;
            //model.SPEUA = obj.SPEUA;
            //model.IdEstatus = obj.Estatus.ID;
            //model.IdCreadoPor = base.getUserId();
            //model.IdModificadoPor = base.getUserId();
            //model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            //stopWatch.Stop();
            int number = 0; // await this.dao.Insert(model);
            //stopWatch.Stop();

            model = await this.dao.GetById(number);

            // log changes
            //  this.Log(model, (int)stopWatch.ElapsedMilliseconds);

            await this.Log(model);
            return model;

        }

        public async Task<mBancos.IBancos> Update(string banco)
        {
            var stopWatch = Stopwatch.StartNew();


            dynamic obj = JsonConvert.DeserializeObject(banco);
            var model = factory.GetInstance<mBancos.IBancos>();
            model.ID = obj.ID;
            model.Clave = obj.Clave;
            model.Descripcion = obj.Descripcion;
            model.Sucursal = obj.Sucursal;
            model.Direccion = obj.Direccion;
            model.Telefono1 = obj.Telefono1;
            model.ExtTel = obj.ExtTel;
            model.Responsable = obj.Responsable;
            model.IdBancoSAT = (obj.BancoSAT != null) ? obj.BancoSAT : (obj.BancoSAT.ID != null ? obj.BancoSAT.ID : null);
            model.BancoExtranjero = obj.BancoExtranjero == true ? "1" : "0";
            model.IdLocalidad = obj.Localidad; // (obj.Localidad != null) ? obj.Localidad.ID :null;
            model.Swift = obj.Swift;
            model.SPEUA = obj.SPEUA;
            model.IdEstatus =obj.Estatus.ID;
            model.IdCreadoPor = base.getUserId();
            model.IdModificadoPor = base.getUserId(); 
            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
            stopWatch.Stop();
            //int number = 0; // await this.dao.Update(model);
            stopWatch.Stop();

            model = await this.dao.GetById(model.ID.Value);
            model.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;

            // log changes
            //  this.Log(model, (int)stopWatch.ElapsedMilliseconds);
            await this.Log(model);
            return model;

        }

        private async Task Log(mBancos.IBancos obj)
        {
            dynamic entity = new EK.Drivers.Log.ElasticEntity();

            entity.ID = obj.ID;

            entity.Clave = obj.Clave;
            entity.Descripcion = obj.Descripcion;
            entity.Sucursal = obj.Sucursal;
            entity.Direccion = obj.Direccion;
            entity.Telefono1 = obj.Telefono1;
            entity.ExtTel = obj.ExtTel;
            entity.Responsable = obj.Responsable;
            entity.IdBancoSAT = (obj.BancoSAT != null) ? obj.BancoSAT.ID : null;
            entity.BancoExtranjero = obj.BancoExtranjero == "1" ? true : false;
            entity.IdLocalidad = obj.Localidad;
            entity.Swift = obj.Swift;
            entity.SPEUA = obj.SPEUA;
            entity.IdEstatus = obj.Estatus.ID;
            entity.IdCreadoPor = base.getUserId();
            entity.IdModificadoPor = base.getUserId();
            entity.Estado = (int) Modelo.Kontrol.KontrolEstadosEnum.Nuevo;

            await this.factory.GetInstance<ILogger>().AddAsync("bancos", entity);

            BrokeredMessage messageQueue = new BrokeredMessage(entity);
            messageQueue.Properties["typeKey"] = "bancos";

            messageQueue.Properties["usuario"] = obj.ModificadoPor.Nombre;
            messageQueue.Properties["reference"] = obj.ID;
            messageQueue.Properties["referenceJSON"] = JsonConvert.SerializeObject(obj);

            ServiceBusManager.SendToQueue("workflows-new", messageQueue);
        }

        public async Task<object[]> GetHistory(int top)
        {
            return await base.GetEntityHistory(entityName, top);
        }

        public async Task<object[]> GetHistory(int ID, int top)
        {
            return await base.GetEntityHistory(entityName, ID, top);
        }
    }
}
