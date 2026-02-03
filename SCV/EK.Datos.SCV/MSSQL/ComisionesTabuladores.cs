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
    public class ComisionesTabuladores:
         d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesTabuladores>, d.SCV.Interfaces.IComisionesTabuladores
    {
        private const string ENTITY_NAME = "scv_ComisionesTabuladores";
        private const string USP_SCV_COMISIONES_SELECT = "usp_scv_ComisionesTabuladores_select";

        public ComisionesTabuladores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
                : base(factory, helper, USP_SCV_COMISIONES_SELECT, null, ENTITY_NAME)
        { }


        public async Task<object> GetComisiones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_COMISIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
