using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Sybase17
{
    public class BienesAdicionales
         : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IBienesAdicionales>, d.SCV.Interfaces.IBienesAdicionales
    {
        private const string USP_BIENES_ADICIONALES_SELECT = "usp_bienes_adicionales_select";

        public BienesAdicionales(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
          : base(factory, helper, USP_BIENES_ADICIONALES_SELECT, null, "BienesAdicionales")
        { }

        public async Task<List<m.SCV.Interfaces.IBienesAdicionales>> GetBienesAdicionales(string fracc)
        {
            try
            {
                var parameters = new Dictionary<string, object> {
                    { "cve_fracc", fracc }
                };
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IBienesAdicionales>(USP_BIENES_ADICIONALES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
