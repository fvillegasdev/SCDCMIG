using System;
using System.Threading.Tasks;
using mk = EK.Modelo.Kontrol;
using dk = EK.Datos.Kontrol;
using System.Collections.Generic;
using System.Data;

namespace EK.Datos.Kontrol.MSSQL
{
    public class DateDifference : dk.DAOBase, Interfaces.IDateDifference
    {
        private const string USP_GETDATEDIFFERENCE = "usp_GetDateDifference";
        public DateDifference(mk.Interfaces.IContainerFactory factory, dk.Interfaces.IDBHelper helper)
        {
            base.factory = factory;
            base.helper = helper;
        }

        public async Task<mk.Interfaces.IDateDifference> GetDateDifference(string DatePart, DateTime FromDate, DateTime ToDate)
        {
            try
            {
                var p = new Dictionary<string, object>();
                p.Add("DatePart", DatePart);
                p.Add("FromDate", FromDate);
                p.Add("ToDate", ToDate);

                return await helper.CreateSingleEntityAsync<mk.Interfaces.IDateDifference>(
                    USP_GETDATEDIFFERENCE, CommandType.StoredProcedure, p);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}