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
    public class ComisionAniosPeriodos :
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionAniosPeriodos>,
        d.SCV.Interfaces.IComisionAniosPeriodos
    {
        private const string USP_SCV_COMISONES_PERIODOS_DETALLES_SELECT = "usp_scv_Comision_AniosPeriodos_select";

        public ComisionAniosPeriodos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_COMISONES_PERIODOS_DETALLES_SELECT, null, "scv_Comision_AniosPeriodos")
        { }

        public async Task<object> GetAllComisionesPeriodoDetalles(Dictionary<string,object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_COMISONES_PERIODOS_DETALLES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
