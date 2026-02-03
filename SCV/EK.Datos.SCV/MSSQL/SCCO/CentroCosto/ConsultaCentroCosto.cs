using System;
using System.Collections.Generic;
using System.Data;
using miSCO = EK.Modelo.SCO.Interfaces;
using diSCO = EK.Datos.SCO.Interfaces;

namespace EK.Datos.SCO.MSSQL
{
    public partial class CentroCosto
    {
        public miSCO.ICentroCosto[] Search(string parametro)
        {
            try
            {
                var parameters = new Dictionary<string, object>()
                {
                    { "id", DBNull.Value },
                    { "kv", 0 }
                };

                return helper.CreateEntities<miSCO.ICentroCosto>(
                    USP_CENTROSCOSTO_SELECT, CommandType.StoredProcedure, parameters).ToArray();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}