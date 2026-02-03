using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Parametros
        : DAOBaseGeneric<m.Kontrol.Interfaces.IParametro>, d.Kontrol.Interfaces.IParametros
    {
        private const string USP_PARAMETROS_VALORES_SELECT = "usp_parametros_valores_select";
        private const string USP_PARAMETROS_SELECT = "usp_parametros_select";

        public Parametros(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper,
                  USP_PARAMETROS_SELECT, 
                  "",
                  "parametros")
        { }

        public async Task<List<m.Kontrol.Interfaces.IParametro>> GetParametrosGlobal(string seccion)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>() {
                    { "seccion", seccion }
                };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IParametro>(USP_PARAMETROS_VALORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IParametro>> GetAllParametros(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IParametro>(USP_PARAMETROS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

        public async Task<m.Kontrol.Interfaces.IParametro> GetByIDParametros(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IParametro>(USP_PARAMETROS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }


    }
}