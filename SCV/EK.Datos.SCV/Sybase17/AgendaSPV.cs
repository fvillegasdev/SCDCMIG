using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class AgendaSPV
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IAgendaSPV>, d.SCV.Interfaces.IAgendaSPV
    {
        private const string USP_SPV_CONSULTA_CABECERA_CITA_AGENDA_SELECT = "usp_spv_detalles_cita_Contratistas_OrdenesTrabajo_select";
        private const string USP_SPV_ACTUALIZA_FECHA_CONSTRUC_INS_UPD = "usp_spv_agendaentvivienda_ins_upd";
        private const string USP_SPV_ACTUALIZA_ESTATUS_AGENDA_INS_UPD = "usp_spv_actualiza_estatus_agenda_ins_upd";
        private const string USP_SPV_AGENDA_DETALLE_SELECT = "usp_spv_agenda_detalle_select";
        private const string USP_SPV_CONSULTA_DETALLES_CITA_AGENDA_SELECT = "usp_spv_detalles_cita_agenda_select";
        private const string USP_USUARIOSEMAILCAT_SELECT = "usp_usuariosemailcat_select";
        private const string PARAM_CIA_VALOR_SELECT = "usp_parametro_cia_valor_select";
        private const string USP_CERRAR_RESERVAS = "usp_upd_cerrar_reservas_ot";
        private const string USP_UPS_KONTROLFILESENTITYID = "usp_upd_kontrolFiles";
        private const string USP_MODIFICARAGENDA_UPD = "usp_ModificarAgenda_Upd";
        private const string USP_TRACK_AGENDA = "usp_track_agenda";

        public AgendaSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, "", null, "AgendaSPV")
        { }

        public async Task<List<m.SCV.Interfaces.IAgendaContratistaDetalle>> GetAgendaDetalleCitaContratista(int IdAgenda, int IdAgendaDetalle)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdAgenda", IdAgenda },
                    { "IdAgendaDetalle", IdAgendaDetalle },
                    { "OperacionEspecificaSP", "DETALLE-CITA-OT-CONTRATISTA" }
            };
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IAgendaContratistaDetalle>(USP_SPV_CONSULTA_CABECERA_CITA_AGENDA_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>> GetAgendaDetalleCitaContratistaAreasComunes(int IdAgenda, int IdAgendaDetalle)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdAgenda", IdAgenda },
                    { "IdAgendaDetalle", IdAgendaDetalle },
                    { "OperacionEspecificaSP", "DETALLE-CITA-OT-CONTRATISTA-AREASCOMUNES" }
            };
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>(USP_SPV_CONSULTA_CABECERA_CITA_AGENDA_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> GetPeriodoDetalleDisponible(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_SPV_AGENDA_DETALLE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveAgendaEntVivivienda(m.Kontrol.Interfaces.IAgendaEntVivienda item, m.Kontrol.Interfaces.IItemGeneral estatusAgenda)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("IdAgenda", item.IdAgenda);
                parameters.Add("IdExpediente", item.IdExpediente);
                parameters.Add("IdEstatusAgenda", estatusAgenda.ID);
                parameters.Add("IdUsuarioAsignado", item.IdUsuarioAsignado);
                parameters.Add("Id", item.ID);
                parameters.Add("IdEstatus", item.IdEstatus);
                parameters.Add("CreadoPor", item.IdCreadoPor);
                parameters.Add("ModificadoPor", item.IdModificadoPor);
                parameters.Add("TipoAgenda", item.TipoAgenda);

                return await helper.GetResultAsync(
                       USP_SPV_ACTUALIZA_FECHA_CONSTRUC_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> CerrarReservas(Dictionary<string, object> parametros)
        {
            try
            {
                //var parameters = new Dictionary<string, object>();
                //parameters.Add("IdAgenda", item.IdAgenda);
                //parameters.Add("IdExpediente", item.IdExpediente);
                //parameters.Add("IdEstatusAgenda", estatusAgenda.ID);
                //parameters.Add("IdUsuarioAsignado", item.IdUsuarioAsignado);
                //parameters.Add("Id", item.ID);
                //parameters.Add("IdEstatus", item.IdEstatus);
                //parameters.Add("CreadoPor", item.IdCreadoPor);
                //parameters.Add("ModificadoPor", item.IdModificadoPor);
                //parameters.Add("TipoAgenda", item.TipoAgenda);

                return await helper.GetResultAsync(
                       USP_CERRAR_RESERVAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveDetProg(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_SPV_ACTUALIZA_ESTATUS_AGENDA_INS_UPD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> GetCuantasReprogramaciones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_SPV_AGENDA_DETALLE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IAgenda>> GetAgendaDetalleHistorial(string tipoAgenda, int idExpediente, string estatusAgenda)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdExpediente", idExpediente },
                    { "TipoAgenda", tipoAgenda },
                    { "EstatusAgenda", estatusAgenda },
                    { "OperacionEspecificaSP", "CITAS-HISTORIAL" }
                };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IAgenda>(
                    USP_SPV_AGENDA_DETALLE_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<object> GetUsuariosEmailCat(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_USUARIOSEMAILCAT_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> GetPlazasEmailCC(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(PARAM_CIA_VALOR_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> updateEntityId(Dictionary<string, object> parametros)
        {
            try
            {

                return await helper.GetResultAsync(
                    USP_UPS_KONTROLFILESENTITYID, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.Kontrol.Interfaces.IModificarAgenda> SaveCambioAgenda(Dictionary<string, object> parametros)
        {
            try
            {
                var res = await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IModificarAgenda>(
                     USP_MODIFICARAGENDA_UPD, CommandType.StoredProcedure, parametros);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> addTrackAgenda(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(
                    USP_TRACK_AGENDA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}