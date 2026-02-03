using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d=EK.Datos;

namespace EK.Datos.Kontrol.MSSQL
{
    public class UnidadMedida : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IUnidadMedida>, d.Kontrol.Interfaces.IUnidadMedida
    {

        private const string USP_UNIDADMEDIDA_SELECT = "usp_UnidadMedida_select";

        public UnidadMedida(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            :base(factory,helper,USP_UNIDADMEDIDA_SELECT,null, "UnidadMedida")
        {

        }

        public async Task<object> GetAllUnidadMedida(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_UNIDADMEDIDA_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
