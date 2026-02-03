using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DashBoardExpedientes
          : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDashBoardExpedienteIndicador>, d.SCV.Interfaces.IDashBoardExpedientes
    {
        private const string USP_SCV_DASHBOARD_INDICADORES_SELECT = "usp_scv_Expedientes_DashBoard_Indicadores_select";
        private const string USP_SCV_DASHBOARD_INFO = "usp_scv_Expedientes_DashBoard_Indicadores";

        private const string USP_SCV_DASHBOARDDOCUMENTOS_INDICADORES_SELECT = "usp_scv_Expedientes_DashBoard_Documentos";



        public DashBoardExpedientes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_DASHBOARD_INDICADORES_SELECT, null, "dashBoardExpedientes")
        {
        }

        public async Task<object> GetDashboardInfo(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_DASHBOARD_INFO, CommandType.StoredProcedure, parameters);
            }
            catch(Exception ex)
            {
                throw new ApplicationException("GetDashboardInfo::" + ex.Message, ex);
            }
        }


        public async Task<object> GetDasboardDocumentosIndicadores(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_DASHBOARDDOCUMENTOS_INDICADORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetDasboardDocumentosIndicadores::" + ex.Message, ex);
            }
        }


    }
}