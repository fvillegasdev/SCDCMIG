using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.MSSQL
{
    public class PolizaFiniquito
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPolizaFiniquito>,
        d.SCV.Interfaces.IPolizaFiniquito
    {
        private const string USP_POLIZAFINIQUITO_SELECT_GENERADA = "usp_scv_PolizaFiniquitoG";
        private const string USP_POLIZAFINIQUITO_SELECT_NOGENERADA = "usp_scv_PolizaFiniquitoNG";
        private const string USP_INTERFACE_ELIMINA_POLIZA_INS = "usp_scv_INTERFACE_ELIMINA_POLIZA_ins";

        public PolizaFiniquito(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_POLIZAFINIQUITO_SELECT_GENERADA, null, "scv_PolizaFiniquito")
        { }

        public async Task<object> GetAllPolizaGenerada(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_POLIZAFINIQUITO_SELECT_GENERADA, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetAllPolizaGenerada::" + ex.Message, ex);
            }
        }

        public async Task<object> GetAllPolizaNoGenerada(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_POLIZAFINIQUITO_SELECT_NOGENERADA, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetAllPolizaNoGenerada::" + ex.Message, ex);
            }
        }

        public async Task<int> CancelarPoliza(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_INTERFACE_ELIMINA_POLIZA_INS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("CancelarPoliza::" + ex.Message, ex);
            }
        }

    }
}