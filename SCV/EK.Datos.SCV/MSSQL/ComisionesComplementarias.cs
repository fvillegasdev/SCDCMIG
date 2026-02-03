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
    public class ComisionesComplementarias:
         d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesComplementarias>, d.SCV.Interfaces.IComisionesComplementarias
    {
        private const string ENTITY_NAME = "scv_ComisionesComplementarias";
        private const string USP_SCV_COMISIONES_SELECT = "usp_scv_ComisionesComplementarias_select";
        private const string USP_SCV_COMISIONES_INSERT = "usp_scv_ComisionesComplementarias_ins";


        public ComisionesComplementarias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
                : base(factory, helper, USP_SCV_COMISIONES_SELECT, null, ENTITY_NAME)
        { }


        public async Task<int> GuardarComisionesComplementarias(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.GetResultAsync(USP_SCV_COMISIONES_INSERT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
