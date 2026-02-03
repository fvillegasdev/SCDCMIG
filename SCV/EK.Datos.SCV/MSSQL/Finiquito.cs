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
    public class Finiquito
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IFiniquito>,
        d.SCV.Interfaces.IFiniquito
    {
        private const string USP_FINIQUITO_SELECT_GENERADA = "usp_scv_Finiquito";
        private const string USP_INTERFACE_ELIMINA_FINIQUITO = "usp_scv_INTERFACE_ELIMINA_FINIQUITO_ins";

        public Finiquito(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_FINIQUITO_SELECT_GENERADA, null, "scv_Finiquito")
        { }

        public async Task<object> GetAllExpedientesFiniquito(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_FINIQUITO_SELECT_GENERADA, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetAllExpedientesFiniquito::" + ex.Message, ex);
            }
        }


        public async Task<int> CancelarFiniquito(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_INTERFACE_ELIMINA_FINIQUITO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("CancelarFiniquito::" + ex.Message, ex);
            }
        }


    }
}