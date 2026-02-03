using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.MSSQL
{
    public class ComisionesAprobacion
        :d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesAprobacion>,
        d.SCV.Interfaces.IComisionesAprobacion
    {
        private const string USP_SCV_APROBACIONCOMISIONES_SELECT = "usp_scv_ComisionesAprobacion_select";
        private const string USP_SCV_COMISIONESAPROBACION_INS_UPD = "usp_scv_ComisionesAprobacion_ins_upd";

        public ComisionesAprobacion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper,USP_SCV_APROBACIONCOMISIONES_SELECT, null, "scv_ComisionesAprobacion") { }

        public async Task<int> SaveRevisionDetalle(m.SCV.Interfaces.IComisionesRevision item)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("CreadoPor", item.CreadoPor.ID);
                parameters.Add("IdRevision", item.ID);

                return await helper.GetResultAsync(USP_SCV_COMISIONESAPROBACION_INS_UPD, CommandType.StoredProcedure, parameters);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<m.SCV.Interfaces.IComisionesAprobacion>> GetRevisionDetalle(int IdRevision)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("IdRevision", IdRevision);

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IComisionesAprobacion>(USP_SCV_APROBACIONCOMISIONES_SELECT, CommandType.StoredProcedure, parameters);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<int> ValidarAprobacionRevision(int idRevision)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("IdRevision", idRevision);
                parameters.Add("validarAprobacionRevision", idRevision);


                return await helper.GetResultAsync(USP_SCV_APROBACIONCOMISIONES_SELECT, CommandType.StoredProcedure, parameters);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
