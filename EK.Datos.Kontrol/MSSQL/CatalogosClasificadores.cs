using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class CatalogosClasificadores
        : DAOBaseGeneric<m.Kontrol.Interfaces.ICatalogoClasificador>, d.Kontrol.Interfaces.ICatalogosClasificadores
    {
        private const string USP_CATALOGOSCLASIFICADORES_SELECT = "usp_catalogosclasificadores_select";

        public CatalogosClasificadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
              factory,
              helper,
              USP_CATALOGOSCLASIFICADORES_SELECT,
              string.Empty,
              "catalogosclasificadores")
        { }

        //public async Task<int> AgregarClasificador(string claveEntidad, int idEntidad, int idTipoClasificador, int idClasificador, int idUser)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object> {
        //            { "tipoAccion", 1},
        //            { "claveEntidad", claveEntidad},
        //            { "idEntidad", idEntidad },
        //            { "idTipoClasificador", idTipoClasificador},
        //            { "idClasificador", idClasificador },
        //            { "creadoPor", idUser },
        //        };

        //        return await helper.GetResultAsync(USP_CATALOGOSCLASIFICADORES_INS_DEL, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        //public async Task<int> EliminarClasificador(string claveEntidad, int idEntidad, int idTipoClasificador, int idClasificador, int idUser)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object> {
        //            { "tipoAccion", 2},
        //            { "claveEntidad", claveEntidad},
        //            { "idEntidad", idEntidad },
        //            { "idTipoClasificador", idTipoClasificador},
        //            { "idClasificador", idClasificador },
        //            { "creadoPor", idUser },
        //        };

        //        return await helper.GetResultAsync(USP_CATALOGOSCLASIFICADORES_INS_DEL, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        //public async Task<object[]> ObtenerClasificadoresXEntidad(string claveentidad, int identidad)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object> {
        //            { "claveentidad",claveentidad},
        //            { "identidad", identidad},
        //        };

        //        return await helper.CreateEntitiesAsync(USP_CATALOGOSCLASIFICADORES_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}
    }
}