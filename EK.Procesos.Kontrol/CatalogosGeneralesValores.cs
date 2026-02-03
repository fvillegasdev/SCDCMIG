using EK.Drivers.Log;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.Kontrol.Interfaces;
using p = EK.Procesos.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol
{
    public class CatalogosGeneralesValores
        : ProcesoBase, p.ICatalogosGeneralesValores
    {
        private d.ICatalogosGeneralesValores dao;

        public CatalogosGeneralesValores(m.IContainerFactory factory, d.ICatalogosGeneralesValores dao)
            : base(factory)
        {
            this.factory = factory;
            this.dao = dao;
        }

        public async Task<m.IItemGeneralValores> GetByID(int id)
        {
            return await this.dao.Get(id);
        }

        public async Task<object[]> GetByCatalogo(string clave, int activos = 0)
        {
            return await this.dao.GetByCatalogo(clave, activos);
        }

        public async Task<object[]> Search(string clave, string nombre, int activos = 0)
        {
            return await this.dao.Get(clave, nombre, activos);
        }
      
        public async Task<m.IItemGeneralValores> Save(string catalogogeneralvalores)
        {
            dynamic obj = JsonConvert.DeserializeObject(catalogogeneralvalores);
            var model = factory.GetInstance<m.IItemGeneralValores>();
            model.ID = (obj.ID == null) ? 0 : obj.ID;
            model.Clave = obj.Clave;
            model.Nombre = obj.Nombre;
            model.ClaveCatalogo = obj.ClaveCatalogo;
            model.IdEstatus = obj.Estatus.ID;
            model.IdCreadoPor = base.getUserId(); // Obtener del usuario actual
            model.IdModificadoPor = base.getUserId(); // Obtener del usuario actual

            int number = await this.dao.Save(model);

            // save - refresh the info
            model = await this.dao.Get((model.ID == 0) ? number : (int)model.ID);
            model.Estado = (obj.ID == null) ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo :
                Modelo.Kontrol.KontrolEstadosEnum.Modificado;

            // log changes
            await this.Log(model);

            return model;
        }

        public async Task<EK.Modelo.Kontrol.Interfaces.IItemGeneral> Get(string claveCatalogo, string clave)
        {
            return await this.dao.GetByClave(claveCatalogo, clave);
        }
        public async Task<object[]> GetAll(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAll(parametros);
        }
        #region Private Functions

        private async Task Log(m.IItemGeneralValores obj)
        {
            dynamic entity = new ElasticEntity();
            entity.ID = obj.ID;
            entity.IdEstatus = obj.Estatus.ID;
            entity.IdEstatusClave = obj.Estatus.Clave;
            entity.IdEstatusNombre = obj.Estatus.Nombre;

            entity.RecordType = Convert.ToInt32(obj.Estado);
            entity.RecordTypeName = obj.Estado.ToString();
            entity.Creado = obj.Creado;
            entity.IdCreadoPor = obj.CreadoPor.ID;
            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
            entity.Clave = obj.Clave;
            entity.Nombre = obj.Nombre;
            entity.IdCatalogo = obj.Catalogo.ID;
            entity.IdCatalogoNombre = obj.Catalogo.Nombre;

            entity.Modificado = obj.Modificado;
            entity.IdModificadoPor = obj.ModificadoPor.ID;
            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

            await this.factory.GetInstance<ILogger>().AddAsync(obj.Catalogo.Clave.ToLower(), entity);
        }

        #endregion Private Functions
    }
}