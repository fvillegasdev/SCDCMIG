using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public partial class Compania
        : BPBase<m.Kontrol.Interfaces.ICompania, d.Kontrol.Interfaces.ICompania>, p.Kontrol.Interfaces.ICompania
    {
        public Compania(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ICompania dao)
               : base(factory, dao, "compania")
        {
        }


        #region Public Functions

        //public async Task<mKontrol.ICompania> Save(string compania)
        //{
        //    dynamic obj = JsonConvert.DeserializeObject(compania);
        //    var model = factory.GetInstance<mKontrol.ICompania>();
        //    model.ID = obj.ID == null ? 0 : obj.ID;
        //    model.Clave = obj.Clave;
        //    model.Nombre = obj.Nombre;
        //    model.Rfc = obj.Rfc;
        //    model.IdLocalidad = (obj.Localidad != null) ? obj.Localidad.ID : null;
        //    model.Domicilio = obj.Domicilio;
        //    model.IdEstatus = obj.Estatus.ID;
        //    model.IdCreadoPor = base.getUserId(); // Obtener del usuario actual
        //    model.IdModificadoPor = base.getUserId(); // Obtener del usuario actual
        //    model.AplicaVivienda = obj.AplicaVivienda;
        //    // save
        //    int number = await this.dao.Save(model);
        //    model = await this.dao.Get(obj.ID == null ? number : (int)obj.ID);
        //    model.Estado = obj.ID == null ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;

        //    // refresh the info - log changes
        //    await this.Log(model);
        //    return model;
        //}

        public async Task<List<m.Kontrol.Interfaces.ICompania>> GetVivienda()
        {
            var parametros = new Dictionary<string, object>() { { "vivienda", 1 } };

            return await this.dao.GetAll(parametros);
        }

        public async Task<DateTime> Today(int idCompania)
        {
            var compania = await this.GetById(idCompania);
            var claveZona = compania.TimeZone.Clave;

            TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById(claveZona);
            DateTime retValue = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, cstZone);

            return retValue;
        }

        #endregion Public Functions

        #region Private Functions

        //private async Task Log(mKontrol.ICompania obj)
        //{
        //    dynamic entity = new ElasticEntity();

        //    entity.ID = obj.ID;
        //    if (obj.Localidad != null)
        //    {
        //        entity.IdLocalidad = obj.Localidad.ID;
        //        entity.IdLocalidadNombre = obj.Localidad.Nombre;
        //    }

        //    entity.IdEstatus = obj.Estatus.ID;
        //    entity.IdEstatusClave = obj.Estatus.Clave;
        //    entity.IdEstatusNombre = obj.Estatus.Nombre;
        //    entity.Clave = obj.Clave;
        //    entity.Nombre = obj.Nombre;

        //    entity.Rfc = obj.Rfc;
        //    entity.Domicilio = obj.Domicilio;

        //    entity.RecordType = Convert.ToInt32(obj.Estado);
        //    entity.RecordTypeName = obj.Estado.ToString();

        //    entity.Creado = obj.Creado;
        //    entity.IdCreadoPor = obj.CreadoPor.ID;
        //    entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

        //    entity.Modificado = obj.Modificado;
        //    entity.IdModificadoPor = obj.ModificadoPor.ID;
        //    entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

        //    await this.factory.GetInstance<ILogger>().AddAsync("compania", entity);

        //    //await this.factory.GetInstance<ILogger>().AddAsync("COMPAÑIA", entity);

        //    BrokeredMessage messageQueue = new BrokeredMessage(entity);
        //    messageQueue.Properties["typeKey"] = "compania";            
            
        //    messageQueue.Properties["usuario"] = obj.ModificadoPor.Nombre;
        //    messageQueue.Properties["reference"] = obj.ID;
        //    messageQueue.Properties["referenceJSON"] = JsonConvert.SerializeObject(obj);
           
        //    ServiceBusManager.SendToQueue("workflows-new", messageQueue);
        //}

       
        #endregion Private Functions
    }
}