using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos;
using m = EK.Modelo;
using miSCV = EK.Modelo.SCV.Interfaces;
using EK.Datos.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class CapturaFechaConstruccion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICapturaFechaConstruccion>, d.SCV.Interfaces.ICapturaFechaConstruccion
    {
        private const string USP_SPV_CONSULTA_PREPARACION_VIVIENDA_SELECT = "usp_spv_ConsultaPreparacionVivienda_select";
        private const string USP_SPV_CONSUL_CAPTURA_FECHA_SELECT = "usp_spv_Captura_fechas_construccion_select";
        private const string USP_SPV_ACTUALIZA_FECHA_CONSTRUC_INS_UPD = "usp_spv_Captura_fechas_construccion_select";
        private const string USP_SPV_DET_PROGRAMACION_INS = "usp_spv_det_programacion_ins";
        private const string USP_SPV_MOTIVOS_REPROGRAMACION_SELECT = "usp_spv_motivos_reprogramacion_select";
        private const string USP_SPV_MOTIVOS_RECEPDET_SELECT = "usp_spv_motivos_recepciondetalle_select";
        private const string USP_SPV_PROGRAMADOS_SELECT = "usp_spv_programados_sel";
        private const string USP_SPV_CONSULTA_CONSULTAPERSONAENTREGAVXFRACC_SELECT = "usp_spv_personal_entrega_viv_fracc_select";

        public CapturaFechaConstruccion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CONSULTA_PREPARACION_VIVIENDA_SELECT, null, "spv_CapturaFechaConstruccion")
        { }


        public async Task<int> SaveCompromisoCons(miSCV.ICapturaFechaConstruccion model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();

                parameters.Add("FechaConstruccion", model.fecha_construccion);
                parameters.Add("FechaReprogramacion ", model.fecha_reprogramacion);
                parameters.Add("Motivo", model.observaciones);
                parameters.Add("Numcte", model.numcte);

                return await helper.GetResultAsync(
                       USP_SPV_ACTUALIZA_FECHA_CONSTRUC_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // public async Task<List<miSCV.ICapturaFechaConstruccion>> GetFechaConstruccion(string Plaza, string Segmentos, string Fraccionamiento, DateTime FechaInicial, DateTime FechaFinal)
        public async Task<List<miSCV.ICapturaFechaConstruccion>> GetFechaConstruccion(Dictionary<string, object> parametros)
        {

            try
            {
                return await helper.CreateEntitiesAsync<miSCV.ICapturaFechaConstruccion>(USP_SPV_CONSUL_CAPTURA_FECHA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.ICapturaFechaConstruccionExcel>> GetFechaConstruccionExcel(Dictionary<string, object> parametros)
        {

            try
            {
                return await helper.CreateEntitiesAsync<miSCV.ICapturaFechaConstruccionExcel>(USP_SPV_CONSUL_CAPTURA_FECHA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<int> SaveProgramados(m.Kontrol.Interfaces.IProgramados model, int Usuario)
        {
            try
            {
                var parameters = new Dictionary<string, object>();

                parameters.Add("numcte", model.NumCte);
                parameters.Add("desc_detalle_repr ", model.Desc_detalle);
                parameters.Add("cve_detalle", model.Cve_detalle);
                parameters.Add("bit_reparado", model.Bit_reparado);
                parameters.Add("Usuario", Usuario);

                return await helper.GetResultAsync(
                         USP_SPV_DET_PROGRAMACION_INS, CommandType.StoredProcedure, parameters);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IMotivosReprogramacion>> GetMotivosReprogramacion(Dictionary<string, object> parametros)
        {

            try
            {
                
                return await helper.CreateEntitiesAsync<miSCV.IMotivosReprogramacion>(USP_SPV_MOTIVOS_REPROGRAMACION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<miSCV.IMotivosReprogramacion>> GetMotivosRezago(Dictionary<string, object> parametros)
        {

            try
            {

                return await helper.CreateEntitiesAsync<miSCV.IMotivosReprogramacion>(USP_SPV_MOTIVOS_REPROGRAMACION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<miSCV.IMotivosReprogramacion>> GetMotivosRecepcionDetalle(Dictionary<string, object> parametros)
        {

            try
            {

                return await helper.CreateEntitiesAsync<miSCV.IMotivosReprogramacion>(USP_SPV_MOTIVOS_RECEPDET_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.Kontrol.Interfaces.IProgramados>> GetProgramados(Dictionary<string, object> parametros)
        {

            try
            {
                return await helper.CreateEntitiesAsync < m.Kontrol.Interfaces.IProgramados > (USP_SPV_PROGRAMADOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConsultaViviendaEntregablePersonalEntregaViv>> GetPersonaEntregaVxFracc(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<miSCV.IConsultaViviendaEntregablePersonalEntregaViv>(USP_SPV_CONSULTA_CONSULTAPERSONAENTREGAVXFRACC_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
