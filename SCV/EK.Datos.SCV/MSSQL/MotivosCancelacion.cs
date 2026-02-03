using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.MSSQL
{
    public class MotivosCancelacion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IMotivosCancelacion>, d.SCV.Interfaces.IMotivosCancelacion
    {
        private const string USP_SCV_MOTIVOSCANCELACION_SELECT = "usp_scv_MotivosCancelacion_select";

        public MotivosCancelacion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_MOTIVOSCANCELACION_SELECT, null, "scv_MotivosCancelacion")
        { }

        public async Task<object> GetAllMotivosCancelacion(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_MOTIVOSCANCELACION_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
