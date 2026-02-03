using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.Sybase17
{
    public class TipoObra
      : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.ITipoObra>, d.SCCO.Interfaces.ITipoObra
    {
        private const string USP_SCCO_TIPO_OBRAS_SELECT = "usp_scco_tipo_obras_select";
        public TipoObra(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_TIPO_OBRAS_SELECT, null, "scco_tipo_Obra")
        { }

        public async Task<object> GetTipoObra(Dictionary<string, object> parametros)
        {

            try
            {
                return await helper.CreateEntitiesAsync(USP_SCCO_TIPO_OBRAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {

                throw;
            }

        }
        public async Task<object> GetAllTipoObra(Dictionary<string, object> parametros)
        {

            try
            {
                return await helper.CreateEntitiesAsync(USP_SCCO_TIPO_OBRAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {

                throw;
            }

        }

    }
}