using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using miSCV = EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ConsultaViviendaEntregable
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IConsultaViviendaEntregable>, d.SCV.Interfaces.IConsultaViviendaEntregables
    {
        private const string USP_SPV_CONSULTA_VIVIENDA_ENTREGABLE_SELECT = "usp_spv_ConsultaViviendaEntregable_select";
        private const string USP_SPV_CONSULTA_PLAZAS_SELECT = "usp_spv_plazas_select";
        private const string USP_SPV_CONSULTA_PLAZAS_CAT_SELECT = "usp_spv_plazas_cat_select";
        private const string USP_SPV_CONSULTA_HIPOTECAVERDE_SELECT = "usp_spv_hipotecaverde_select";
        private const string USP_SPV_CONSULTA_EQUIPAMIENTO_SELECT = "usp_spv_equipamiento_select";
        private const string USP_SPV_CONSULTA_FRACCIONAMIENTO_SELECT = "usp_spv_fraccionamiento_select";
        private const string USP_SPV_CONSULTA_FINANCIAMIENTO_SELECT = "usp_spv_financiamiento_select";
        private const string USP_SPV_CONSULTA_VIVIENDASENTREGADAS_SELECT = "usp_spv_viviendas_entregadas_select";
        private const string USP_SPV_CONSULTA_TIPOVIVIENDA_SELECT = "usp_spv_Tipo_Vivienda_select";
        private const string USP_SPV_CONSULTA_CONSULTAVIVIENDAENTREGABLE_SELECT = "usp_spv_viviendaentregable_select";
        private const string USP_SPV_CONSULTA_CONSULTAREZAGOSENTREGA_SELECT = "usp_spv_consulta_rezagos_entrega_select";
        private const string USP_SPV_CONSULTA_CONSULTAPERSONAENTREGAV_SELECT = "uvw_spv_personal_entrega_viv";
        private const string USP_SPV_CONSULTA_DETALLES_REPROG_SELECT = "usp_spv_detalles_reprog_select";
        private const string USP_SPV_CONSULTA_AGENDA_VIVIENDASENTREGABLES_SELECT = "usp_spv_ConfigViviendaEntregable_agenda_select";
        private const string USP_SPV_CONSULTA_DETALLES_CITA_AGENDA_SELECT = "usp_spv_detalles_cita_agenda_select";

        public ConsultaViviendaEntregable(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CONSULTA_VIVIENDA_ENTREGABLE_SELECT, null, "spv_Consulta_Vivienda_Entregable")
        { }

        public async Task<List<miSCV.IConsultaViviendaEntregablePlazas>> GetPlazas(int Usuario)
        {

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Usuario", Usuario }
                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregablePlazas>(USP_SPV_CONSULTA_PLAZAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<miSCV.IConsultaViviendaEntregablePlazas>> GetPlazasFracCats(int Usuario)
        {

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Usuario", Usuario }
                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregablePlazas>(USP_SPV_CONSULTA_PLAZAS_CAT_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<miSCV.IConsultaViviendaEntregablePlazas>> GetSPVPlazasSupervisoresCat(int Usuario)
        {

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Usuario", Usuario }
                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregablePlazas>(USP_SPV_CONSULTA_PLAZAS_CAT_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<miSCV.IConsultaViviendaEntregableHipotecaVerde>> GetHipotecaVerde()
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {

                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregableHipotecaVerde>(USP_SPV_CONSULTA_HIPOTECAVERDE_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConsultaViviendaEntregableEquipamiento>> GetEquipamiento()
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {

                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregableEquipamiento>(USP_SPV_CONSULTA_EQUIPAMIENTO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConsultaViviendaEntregableFinanciamiento>> GetFinanciamiento()
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {

                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregableFinanciamiento>(USP_SPV_CONSULTA_FINANCIAMIENTO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConsultaViviendaEntregableVivEntregadas>> GetViviendasEntregadas()
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {

                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregableVivEntregadas>(USP_SPV_CONSULTA_VIVIENDASENTREGADAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<miSCV.IConsultaViviendaEntregableTipoVivienda>> GetTipoVivienda()
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {

                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregableTipoVivienda>(USP_SPV_CONSULTA_TIPOVIVIENDA_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConsultaViviendaEntregablePersonalEntregaViv>> GetPersonaEntregaV(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregablePersonalEntregaViv>(USP_SPV_CONSULTA_CONSULTAPERSONAENTREGAV_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<miSCV.IConsultaViviendaEntregableRezagosEntrega>> GetMotivoRezago()
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {

                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregableRezagosEntrega>(USP_SPV_CONSULTA_CONSULTAREZAGOSENTREGA_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConsultaViviendaEntregableDetallesReprog>> GetDetallesReprog(Dictionary<string, object> parametros)
        {
            try
            {
              

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregableDetallesReprog>(USP_SPV_CONSULTA_DETALLES_REPROG_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConsultaViviendaEntregableResult>> GetViviendasEntregables(Dictionary<string, object> parametros)
        {
            try
            {
                //var parameters = new Dictionary<string, object>
                //{
                //    { "PlazaInicial", PlazaInicial },
                //    { "PlazaFinal", PlazaFinal },
                //    { "FechaInicial", FechaInicial },
                //    { "FechaFinal", FechaFinal },
                //    { "HipotecaVerde", HipotecaVerde },
                //    { "Equipamiento", Equipamiento },
                //    { "FraccInicial", FraccInicial },
                //    { "FraccFinal", FraccFinal },
                //    { "ClienteIni", ClienteIni },
                //    { "ClienteFin", ClienteFin },
                //    { "Segmento", Segmento },
                //    { "ViviendaEntregada", ViviendaEntregada },
                //    { "Financiamiento", Financiamiento }

                //};

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregableResult>(USP_SPV_CONSULTA_CONSULTAVIVIENDAENTREGABLE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConsultaViviendaAgendaEntregableResult>> GetAgendaViviendasEntregables(string PlazaInicial, string FraccInicial, int PersonaEntregaV,int Usuario)
        {

            try
            {
                var parameters = new Dictionary<string, object>
                {

                    { "PlazaInicial", PlazaInicial },
                    { "FraccInicial", FraccInicial },
                    { "PersonaEntregaV", PersonaEntregaV },
                    { "Usuario", Usuario }

                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaAgendaEntregableResult>(USP_SPV_CONSULTA_AGENDA_VIVIENDASENTREGABLES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConsultaViviendaDetallesCitaAgendaResult>> GetAgendaDetalleCita(int IdAgenda, int IdAgendaDetalle)
        {

            try
            {
                var parameters = new Dictionary<string, object>
                {

                    { "IdAgenda", IdAgenda },
                    { "IdAgendaDetalle", IdAgendaDetalle }

                };

                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaDetallesCitaAgendaResult>(USP_SPV_CONSULTA_DETALLES_CITA_AGENDA_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableEquipamiento>> GetEquipamientoUbicacion(int idCliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("operacion", "EQUIPAMIENTO-UBICACION");
                parametros.Add("idCliente", idCliente);

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IConsultaViviendaEntregableEquipamiento>(
                    "usp_spv_equipamiento_ubicacion_select", CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Task<object[]> GetReporteEncuestaEntregaVivienda(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public Task<object[]> GetReporteEncuestaEntregaViviendaGrafica(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
    }
}
