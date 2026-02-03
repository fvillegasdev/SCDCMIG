using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class FallasAreasComunes
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IFallasAreasComunes>, d.SCV.Interfaces.IFallasAreasComunes
    {
        private const string USP_SPV_FALLA_AREAS_COMUNES_SELECT = "usp_spv_falla_area_comun_select";
        private const string USP_SPV_FALLA_AREAS_COMUNES_INUP = "usp_spv_falla_area_comun_insertUpdate";
        public FallasAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_FALLA_AREAS_COMUNES_SELECT, null, "spv_falla_area_comun")
        { }

        public async Task<object[]> GetCatalogo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_FALLA_AREAS_COMUNES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> CrudCatalogoFallaAreaComun(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_FALLA_AREAS_COMUNES_INUP, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
