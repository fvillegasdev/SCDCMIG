using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Data;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class InsumosTarjetas : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IInsumoTarjeta>, d.SCCO.Interfaces.IInsumosTarjetas
    {
        private const string USP_SCCO_INSUMOSTARJETAS_SELECT = "usp_scco_InsumosTarjetas_select";
        public InsumosTarjetas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_INSUMOSTARJETAS_SELECT, null, "scco_InsumosTarjetas")
        { }

        public async Task<m.SCCO.Interfaces.IInsumoTarjeta> GetByIdInsumo(int idInsumo)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idInsumo", idInsumo}
                };

                return await helper.CreateSingleEntityAsync<m.SCCO.Interfaces.IInsumoTarjeta>(
                    USP_SCCO_INSUMOSTARJETAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}