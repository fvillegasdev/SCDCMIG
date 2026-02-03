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
    public class TipoInsumo
      : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.ITipoInsumo>, d.SCCO.Interfaces.ITipoInsumo
    {
        private const string USP_SCCO_TIPO_INSUMO_SELECT = "usp_scco_tipo_insumo_select";
        public TipoInsumo(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_TIPO_INSUMO_SELECT, null, "scco_tipo_insumo")
        { }
        public async Task<object> GetTipoInsumo(Dictionary<string,object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCCO_TIPO_INSUMO_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public async Task<object> GetAllTipoInsumo(Dictionary<string,object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCCO_TIPO_INSUMO_SELECT,CommandType.StoredProcedure,parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}