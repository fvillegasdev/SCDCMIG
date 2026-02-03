using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Datos.SCV.Interfaces;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class PlanCompromisosConstruccion
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPlanCompromisosConstruccion>, d.SCV.Interfaces.IPlanCompromisosConstruccion
    { 
        private const string USP_SPV_Compromisos_SELECT = "USP_UVW_COMPROMISO_CONSTRUCCION_SELECT";
        

        //private const string USP_SCV_EXPEDIENTES_UBICACIONES_SELECT = "usp_spv_Expedientes_ubicaciones_select";
        //private const string USP_SCV_UBICACIONES_COMPONENTES_SELECT = "usp_spv_prototipos_ubicaciones_select";
        public PlanCompromisosConstruccion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_Compromisos_SELECT, null, "spv_ticket")
        { }

        public async Task<List<m.SCV.Interfaces.IPlanCompromisosConstruccion>> getGridDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IPlanCompromisosConstruccion>(USP_SPV_Compromisos_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IPlanCompromisoIndicador>> getDesarrolloDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IPlanCompromisoIndicador>(USP_SPV_Compromisos_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public async Task<List<m.SCV.Interfaces.IContratista>> GetContratistas(Dictionary<string, object> parametros)
        //{
        //    try
        //    {
        //        return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IContratista>(
        //            USP_SPV_Tickets_SELECT, CommandType.StoredProcedure, parametros);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public async Task<List<m.SCV.Interfaces.IContratistaUbicacion>> GetContratistasByUbicacion(Dictionary<string, object> parametros)
        //{
        //    try
        //    {
        //        return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IContratistaUbicacion>(
        //            USP_SPV_CONTRATISTAS_UBICACIONES_SELECT, CommandType.StoredProcedure, parametros);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        //public async Task<List<m.SCV.Interfaces.IExpedienteUbicacion>> getExpedienteUbicaciones(Dictionary<string, object> parametros)
        //{


        //    try
        //    {
        //        return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IExpedienteUbicacion>(USP_SCV_EXPEDIENTES_UBICACIONES_SELECT, CommandType.StoredProcedure, parametros);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        //public async Task<List<m.SCV.Interfaces.IUbicacionComponente>> getUbicacionesComponente(Dictionary<string, object> parametros)
        //{


        //    try
        //    {
        //        return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IUbicacionComponente>(USP_SCV_UBICACIONES_COMPONENTES_SELECT, CommandType.StoredProcedure, parametros);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        //public async Task<List<m.SCV.Interfaces.IIncidencia>> GetReincidencias(Dictionary<string, object> parametros)
        //{
        //    try
        //    {


        //        return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IIncidencia>(
        //            USP_SPV_ReIncidencias_CONSULTAS, CommandType.StoredProcedure, parametros);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        //public async Task<List<m.SCV.Interfaces.ITopReport>> getTop(Dictionary<string, object> parametros)
        //{


        //    try
        //    {
        //        return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ITopReport>(USP_SPV_Tickets_SELECT, CommandType.StoredProcedure, parametros);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}




        //public async Task<List<ITicket>> getUsersDashBoard(Dictionary<string, object> parametros)
        //{
        //    throw new NotImplementedException();
        //}
    }
}