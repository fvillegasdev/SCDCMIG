using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class TiposClasificador 
        : DAOBaseGeneric<m.Kontrol.Interfaces.ITipoClasificador>, d.Kontrol.Interfaces.ITiposClasificador
    {
        private const string USP_TIPOSCLASIFICADOR_SELECT = "usp_TiposClasificador_select";
        //private const string USP_CLASIFICADORES_SELECT = "usp_clasificadores_select";
        //private const string USP_TIPOSCLASIFICADOR_INSERT_UPDATE = "usp_tiposclasificadores_ins_upd";
        //private const string USP_CLASIFICADORESENTIDAD_SELECT = "usp_clasificadoresEntidad_select";
        //private const string USP_TIPOSCLASIFICADORENTIDAD_SELECT = "usp_TiposClasificadorEntidad_select";

        public TiposClasificador(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_TIPOSCLASIFICADOR_SELECT,
                  string.Empty,
                  "tiposClasificador")
        { }

        public async Task<object[]> GetAllTiposClasificador(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TIPOSCLASIFICADOR_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
        //public async Task<object[]> ObtenerTiposClasificador(int id, int activos)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object> {
        //            { "id", id },
        //            { "activos", activos }
        //        };

        //        return (await helper.CreateEntitiesAsync<m.Interfaces.ITipoClasificador>(USP_TIPOSCLASIFICADOR_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}


        //public async Task<object[]> ObtenerClasificadoresXTipo(string clavecatalogo, int activos)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object> {
        //            { "clavecatalogo", clavecatalogo },
        //            { "activos", activos }
        //        };

        //        return await helper.CreateEntitiesAsync(USP_CLASIFICADORES_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        //public async Task<m.Interfaces.ITipoClasificador> Save(m.Interfaces.ITipoClasificador modelTipo)
        //{
        //    m.Interfaces.ITipoClasificador result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "Id",modelTipo.ID },                    
        //            { "Nombre",modelTipo.Nombre },
        //            { "Clave",modelTipo.Clave },
        //            { "Descripcion",modelTipo.Descripcion },
        //            { "IdEstatus",modelTipo.IdEstatus },
        //            { "CreadoPor",modelTipo.IdCreadoPor },
        //            { "ModificadoPor",modelTipo.IdModificadoPor }
        //            //{ "IdCatalogosClasificadores",modelTipo.IdCatalogosClasificadores }
        //    };

        //        result = await helper.CreateSingleEntityAsync<m.Interfaces.ITipoClasificador>(USP_TIPOSCLASIFICADOR_INSERT_UPDATE, CommandType.StoredProcedure, parameters);

        //        return result;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        //public async Task<object[]> ObtenerTiposClasificadorXEntidad(string claveCatalogo, int idUser)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object> {
        //            { "claveCatalogo", claveCatalogo },
        //            { "idUser", idUser }
        //        };

        //        return (await helper.CreateEntitiesAsync<m.Interfaces.ITipoClasificador>(USP_TIPOSCLASIFICADORENTIDAD_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        //public async Task<object[]> ObtenerCatalogoClasificadoresXEntidad(int idTipoClasificador, string claveentidad, int idUser)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object> {
        //            { "idTipoClasificador", idTipoClasificador },
        //            { "claveEntidad", claveentidad },
        //            { "idUsuario", idUser }
        //        };

        //        return await helper.CreateEntitiesAsync(USP_CLASIFICADORESENTIDAD_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}
    }
}