using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class BoletasProspeccion
        : dk.DAOBaseGeneric<m.IBoletasProspecccion>, d.IBoletasProspeccion
    {
        private const string ENTITY_NAME = "scv_BoletasProspeccion";
        private const string USP_SCV_BOLETAS_PROSPECCION_SELECT = "usp_scv_BoletasProspeccion_select";

        public BoletasProspeccion(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_BOLETAS_PROSPECCION_SELECT, null, ENTITY_NAME)
        { }

        public  async Task<m.IBoletasProspecccion> GetByIdBoleta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.IBoletasProspecccion>(USP_SCV_BOLETAS_PROSPECCION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
        public  async Task<object> GetAllBoleta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_BOLETAS_PROSPECCION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<m.IBoletasProspecccion> GetByIdSource(string idSource)
        {
            try
            {
                Dictionary<string, object> parametros = new Dictionary<string, object>();
                parametros.Add("idSource", idSource);

                return await helper.CreateSingleEntityAsync<m.IBoletasProspecccion>(USP_SCV_BOLETAS_PROSPECCION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

    }
}