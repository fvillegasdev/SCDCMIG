using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ExpedientesTags
        :d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IExpedienteTags>,d.SCV.Interfaces.IExpedientesTags

    {
        private const string USP_SCV_EXPEDIENTES_TAGS = "usp_scv_Expedientes_Tags";

        public ExpedientesTags(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            :base(factory,helper, USP_SCV_EXPEDIENTES_TAGS, null, "scv_Expedientes_Tags")
        { }

        public async Task<List<m.Kontrol.Interfaces.IClasificador>> ObtenerTagsExpediente(Dictionary<string,object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IClasificador>(USP_SCV_EXPEDIENTES_TAGS,CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<m.SCV.Interfaces.IExpedienteTags>> ObtenerTagsPorExpediente(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IExpedienteTags>(USP_SCV_EXPEDIENTES_TAGS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
