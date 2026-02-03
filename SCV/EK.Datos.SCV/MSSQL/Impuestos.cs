using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;



namespace EK.Datos.SCV.MSSQL
{
    public class Impuestos
        :d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IImpuestos>,d.SCV.Interfaces.IImpuestos
    {
        private const string USP_SCV_IMPUESTOS_SELECT = "usp_scv_Impuestos_select";
        public Impuestos(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            :base(factory,helper,USP_SCV_IMPUESTOS_SELECT,null, "scv_Impuestos")
        { }

        public async Task<object> GetAllImpuestos(Dictionary<string,object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_IMPUESTOS_SELECT,System.Data.CommandType.StoredProcedure,parameters);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
