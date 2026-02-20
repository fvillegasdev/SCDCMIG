using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class PrereporteDetalle
         : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPrereporteDetalle>, d.SCV.Interfaces.IPrereportesDetalles
    {
        private const string USP_SPV_PREREPORTE_DETALLES_SELECT = "usp_spv_prereporte_detalles_select";
        private const string USP_SPV_PREREPORTEDET_SELECT_CTEINC = "usp_spv_prereporte_det_cterep_select";
        private const string USP_SPV_PREREPORTEDET_ByPartida_SELECT = "usp_spv_prereporte_det_byIdPartida_select";
        private const string USP_SPV_PREREPORTEDET_UPD = "usp_spv_prereporte_det_upd";
        public PrereporteDetalle(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
          : base(factory, helper, USP_SPV_PREREPORTE_DETALLES_SELECT, null, "PrereporteDetalle")
        { }

        public async Task<List<m.SCV.Interfaces.IPrereporteDetalle>> GetByPartidaCte(int numcte, int reporte)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Cliente", numcte },
                    { "IdReporte", reporte }
            };
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IPrereporteDetalle>(USP_SPV_PREREPORTEDET_SELECT_CTEINC, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IPrereporteDetalle> GetByIdPartida(int idpartida)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdPartida", idpartida }
            };
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IPrereporteDetalle>(USP_SPV_PREREPORTEDET_ByPartida_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IPrereporteDetalle> UpdateEstatusPreRepDet(int idpartida, string estatus, string fechaAgenda = null)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdPartida", idpartida },
                    { "Estatus", estatus }
            };
                if (fechaAgenda != null && fechaAgenda != "")
                {
                    parameters.Add("FechaAgenda", fechaAgenda);
                }
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IPrereporteDetalle>(USP_SPV_PREREPORTEDET_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
