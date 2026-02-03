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
    public class ComisionesRevisionDetalle
        :d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesRevisionDetalle>,d.SCV.Interfaces.IComisionesRevisionDetalle
    {
        public const string USP_SCV_COMISIONREVISIONDETALLE_SELECT = "usp_scv_ComisionRevisionDetalle_select";

        public ComisionesRevisionDetalle(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper) 
            :base(factory,helper,USP_SCV_COMISIONREVISIONDETALLE_SELECT,null, "scv_ComisionRevisionDetalle")
        { }

        public async Task<m.SCV.Interfaces.IComisionesRevisionDetalle> GetRevisionDetalle(int IdRevision, int nRevision)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("IdRevision", IdRevision);
                parameters.Add("nRevision", nRevision);
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IComisionesRevisionDetalle>(USP_SCV_COMISIONREVISIONDETALLE_SELECT, CommandType.StoredProcedure, parameters);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
