using System;
using System.Data;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class InsumosMateriales : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IInsumoMaterial>, d.SCCO.Interfaces.IInsumosMateriales
    {
        private const string USP_SCCO_INSUMOSMATERIALES_SELECT = "usp_scco_InsumosMateriales_select";
        public InsumosMateriales(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_INSUMOSMATERIALES_SELECT, null, "scco_InsumosMateriales")
        { }

        public async Task<m.SCCO.Interfaces.IInsumoMaterial> GetByIdInsumo(int idInsumo)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idInsumo", idInsumo}
                };

                return await helper.CreateSingleEntityAsync<m.SCCO.Interfaces.IInsumoMaterial>(
                    USP_SCCO_INSUMOSMATERIALES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}