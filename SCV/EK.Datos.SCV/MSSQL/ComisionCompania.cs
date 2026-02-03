using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ComisionCompania
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionCompania>, d.SCV.Interfaces.IComisionCompania
    {
        private const string USP_SCV_COMISIONCOMPANIA_SELECT = "usp_scv_comisioncompania_select";

        public ComisionCompania(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper,USP_SCV_COMISIONCOMPANIA_SELECT,null,"scv_ComisionCompania")
        { }

        public async Task<object> GetAllComisionCompania(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_COMISIONCOMPANIA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
