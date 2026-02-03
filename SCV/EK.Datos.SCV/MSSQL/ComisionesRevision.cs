using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ComisionesRevision
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesRevision>, d.SCV.Interfaces.IComisionesRevision
    {
        
        public const string USP_SCV_COMISIONESVERSIONES_SELECT = "usp_scv_ComisionesRevision_Select";
        private const string USP_SCV_COMISIONESAPROBACION_DELETE = "usp_scv_ComisionesAprobacionVersiones_Delete";

        public ComisionesRevision(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_COMISIONESVERSIONES_SELECT, string.Empty, "scv_ComisionRevision")
        { }

        public async Task<object> GetEstadiscoRevisionById(int IdRevision)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", IdRevision);
                parameters.Add("detalleRevision", true);
                return await helper.CreateSingleEntityAsync(USP_SCV_COMISIONESVERSIONES_SELECT, CommandType.StoredProcedure, parameters);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
