using pBancos = EK.Procesos.SBO.Interfaces;
using dBancos = EK.Datos.SBO.Interfaces;
using bKontrol = EK.Modelo.Kontrol.Interfaces;
using mBancos = EK.Modelo.SBO.Interfaces;
using EK.Procesos.Kontrol;
using Newtonsoft.Json;
using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Common.Utils;
using EK.Drivers.Log;

namespace EK.Procesos.SBO
{
    public class CuentaBancaria : ProcesoBase, pBancos.ICuentaBancaria
    {
        private dBancos.ICuentaBancaria dao;
        //private const string entityName = "CuentaBancaria";

        public CuentaBancaria(bKontrol.IContainerFactory factory, dBancos.ICuentaBancaria dao)
        {
            this.factory = factory;
            this.dao = dao;
            this.entityName = "CuentaBancaria";
        }

        public async Task<object[]> GetAll()
        {
            return await this.dao.GetAll();
        }

        public async Task<mBancos.ICuentaBancaria> GetById(int id)
        {
            return await this.dao.GetById(id);
        }
        public async Task<List<mBancos.ICuentaBancaria>> GetByBank(int idBanco, int idCompania)
        {
            return await this.dao.GetByBank(idBanco,idCompania);
        }

        public async Task<mBancos.ICuentaBancaria> Save(string cb)
        {
            var stopWatch = Stopwatch.StartNew();

            dynamic obj = JsonConvert.DeserializeObject(cb);
            var model = factory.GetInstance<mBancos.ICuentaBancaria>();
            model.ID = obj.ID == null ? 0 : obj.ID;
            model.Clave = obj.Clave;
            model.Descripcion = obj.Descripcion;
            model.CuentaBanco = obj.CuentaBanco;
            model.Contrato = obj.Contrato;
            model.Referencia = obj.Referencia;
            model.BancaElectronica = obj.BancaElectronica;
            model.Clabe = obj.Clabe;
            model.Plaza = obj.Plaza;
            model.FechaInicio = obj.FechaInicio;
            model.LugarEmision = obj.LugarEmision;
            model.SucursalOrigen = obj.SucursalOrigen;
            model.Responsable = obj.Responsable;
            model.Telefono1 = obj.Telefono1;
            model.ExtTel = obj.ExtTel;
            model.IdBanco = obj.Banco.ID;
            model.IdCuentaContable = obj.IdcuentaContable;
            model.IdMoneda = obj.Moneda.ID;
            model.IdCentroCosto = obj.CentroCosto.ID;
            model.IdTipoPoliza = obj.TipoPoliza.ID;
            model.IdTipoCuenta = obj.TipoCuenta.ID;
            model.ChequeFisico = obj.ChequeFisico;
            model.ChequeElectronico = obj.ChequeElectronico;
            model.Clasificacion = obj.Clasificacion;
            model.CuentaTercero = obj.CuentaTercero == true ? 1:0;
            model.IdEstatus = obj.Estatus.ID;
            model.IdCreadoPor = base.getUserId();
            model.IdModificadoPor = base.getUserId();
            int number = 0; // await this.dao.Save(model);
            stopWatch.Stop();

            model = await this.dao.GetById(obj.ID == 0 ? number : (int)obj.ID);
            model.Estado = obj.ID == null ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;

            await this.Log(model);
            return model;

        }


//        public object[] GetCuentasClasificador(int idTipoClasificador, int idClasificador, int todos, int idBanco)
//        {
//        //    dynamic obj = JsonConvert.DeserializeObject(FormJson);

//          //  int? idTipoClasificador;
////            int? idClasificador;

//  //          idTipoClasificador = obj.idTipoClasificador;
//    //        idClasificador = obj.idClasificador;
            

//            return this.dao.GetCuentasClasificador(idTipoClasificador, idClasificador, base.getUserId(), todos, idBanco);
//        }

        public async Task<object[]> GetHistory(int top)
        {
            return await base.GetEntityHistory(entityName, top);
        }

        public async Task<object[]> GetHistory(int ID, int top)
        {
            return await base.GetEntityHistory(entityName, ID, top);
        }

        private async Task Log(mBancos.ICuentaBancaria obj)
        {
            dynamic entity = new Drivers.Log.ElasticEntity();

            entity.ID = obj.ID;
            entity.ID = obj.ID == null ? 0 : obj.ID;
            entity.Clave = obj.Clave;
            entity.Descripcion = obj.Descripcion;
            entity.CuentaBanco = obj.CuentaBanco;
            entity.Contrato = obj.Contrato;
            entity.Referencia = obj.Referencia;
            entity.BancaElectronica = obj.BancaElectronica;
            entity.Clabe = obj.Clabe;
            entity.Plaza = obj.Plaza;
            entity.FechaInicio = obj.FechaInicio;
            entity.LugarEmision = obj.LugarEmision;
            entity.SucursalOrigen = obj.SucursalOrigen;
            entity.Responsable = obj.Responsable;
            entity.Telefono1 = obj.Telefono1;
            entity.ExtTel = obj.ExtTel;
            entity.IdBanco = obj.Banco.ID;
            //entity.IdCuentaContable = obj.IdcuentaContable;
            entity.IdMoneda = obj.Moneda.ID;
            //entity.IdCentroCosto = obj.CentroCosto.ID;
            entity.IdTipoPoliza = obj.TipoPoliza.ID;
            entity.IdTipoCuenta = obj.TipoCuenta.ID;
            entity.ChequeFisico = obj.ChequeFisico;
            entity.ChequeElectronico = obj.ChequeElectronico;
            entity.Clasificacion = obj.Clasificacion;
            //entity.CuentaTercero = obj.CuentaTercero == true ? 1 : 0;
            entity.IdEstatus = obj.Estatus.ID;
            entity.IdCreadoPor = base.getUserId();
            entity.IdModificadoPor = base.getUserId();

            entity.RecordType = Convert.ToInt32(obj.Estado);
            entity.RecordTypeName = obj.Estado.ToString();

            entity.Creado = obj.Creado;
            entity.IdCreadoPor = obj.CreadoPor.ID;
            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

            entity.Modificado = obj.Modificado;
            entity.IdModificadoPor = obj.ModificadoPor.ID;
            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;
     

            await this.factory.GetInstance<ILogger>().AddAsync(entityName, entity);

           /* BrokeredMessage messageQueue = new BrokeredMessage(entity);
            messageQueue.Properties["typeKey"] = "cuentabancaria";

            messageQueue.Properties["usuario"] = obj.ModificadoPor.Nombre;
            messageQueue.Properties["reference"] = obj.ID;
            messageQueue.Properties["referenceJSON"] = JsonConvert.SerializeObject(obj);

            ServiceBusManager.SendToQueue("workflows-new", messageQueue);
            */

        }


    }
}
