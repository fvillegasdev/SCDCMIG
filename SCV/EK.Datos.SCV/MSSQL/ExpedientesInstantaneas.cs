using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ExpedientesInstantaneas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IExpedienteInstantanea>
        , d.SCV.Interfaces.IExpedientesInstantaneas
    {
        private const string USP_SCV_EXPEDIENTES_INSTANTANEAS_SELECT = "usp_scv_Expedientes_Categoria_Instantaneas_select";
        private const string USP_SCV_EXPEDIENTES_AGENTES_SELECT = "usp_scv_Expedientes_Agente_Jerarquias_select";

        public ExpedientesInstantaneas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_EXPEDIENTES_INSTANTANEAS_SELECT, null, "scv_Expedientes_Categoria_Instantaneas")
        { }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> GetSuperiores(int idAgente)
        {
            try
            {
                var parameters = new Dictionary<string, object> { { "IdAgente", idAgente } };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuario>(
                    USP_SCV_EXPEDIENTES_AGENTES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object> GetInstantaneaSeguimiento(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_EXPEDIENTES_INSTANTANEAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}