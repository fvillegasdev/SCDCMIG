using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using dao = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.Kontrol;

namespace EK.Datos.Kontrol.MSSQL
{
    public class CatalogosGeneralesValores 
        : EK.Datos.Kontrol.DAOBase, dao.ICatalogosGeneralesValores
    {
        private const string USP_CATALOGOSGENERALESVALORES_SELECT = "usp_catalogosgeneralesvalores_select";
        private const string USP_CATALOGOSGENERALESVALORES_INS_UPD = "usp_catalogosgeneralesvalores_ins_upd";

        public CatalogosGeneralesValores(dao.IDBHelper helper)
        {
            this.helper = helper;
        }

        public async Task<object[]> Get(string clave, string nombre, int activos = 0)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("claveCatalogo", clave);
                parameters.Add("nombre", nombre.ToUpper());
                parameters.Add("activos", activos);
                return (await helper.CreateEntitiesAsync<m.Interfaces.IItemGeneral>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
            }
            catch
            {
                throw;
            }
        }

        public async Task<EK.Modelo.Kontrol.Interfaces.IItemGeneral> GetByClave(string claveCatalogo, string clave)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("clavecatalogo", claveCatalogo);
                parameters.Add("clave", clave);

                return await helper.CreateSingleEntityAsync<EK.Modelo.Kontrol.Interfaces.IItemGeneral>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object[]> GetByCatalogo(string clave, int activos = 0)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("clavecatalogo", clave);
                parameters.Add("activos", activos);
                return (await helper.CreateEntitiesAsync<m.Interfaces.IItemGeneralValores>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
            }
            catch
            {
                throw;
            }
        }

        public async Task<object[]> GetKVByCatalogo(string clave)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("clavecatalogo", clave);
                return (await helper.CreateEntitiesAsync<m.Interfaces.IItemGeneralValores>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
            }
            catch
            {
                throw;
            }
        }

        public async Task<m.Interfaces.IItemGeneralValores> Get(int id)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("ID", id);

                return await helper.CreateSingleEntityAsync<m.Interfaces.IItemGeneralValores>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> Save(m.Interfaces.IItemGeneralValores model)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("id", model.ID);
                parameters.Add("clavecatalogo", model.ClaveCatalogo);
                parameters.Add("Clave", model.Clave);
                parameters.Add("Nombre", model.Nombre);
                parameters.Add("IdSeccion", (model.IdSeccion == null) ? Convert.DBNull : model.IdSeccion);
                parameters.Add("IdEstatus", model.IdEstatus);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                parameters.Add("CreadoPor", model.IdCreadoPor);

                return await helper.GetResultAsync(USP_CATALOGOSGENERALESVALORES_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object[]> GetAll(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
    }
}