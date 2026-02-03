using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using miSCV = EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using EK.Datos.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class ConfigViviendaEntregable
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IConfigViviendaEntregable>, d.SCV.Interfaces.IConfigViviendaEntregable
    {
        private const string USP_SPV_CONFIG_VIVIENDA_ENTREGABLE_SELECT = "usp_spv_Config_Vivienda_Entregable";
        private const string USP_SPV_CONFIG_VIVIENDAENTREGABLE_SELECT = "usp_spv_ConfigViviendaEntregable_select";
        private const string USP_SPV_DET_PROGRAMACION_INS = "usp_spv_det_programacion_ins";
        private const string USP_SPV_CONFIG_VIVIENDAENTREGABLE_INS = "usp_spv_config_viviendaentregable_ins";
        private const string USP_SPV_CONSULTA_DOCS_IMPRESION_SELECT = "usp_spv_DocImpresion_select";
        private const string USP_SPV_CONSULTA_INFO_CLIENTE_SELECT = "usp_spv_Cliente_Info_Impresion_select";
        private const string USP_SPV_UPDATE_RESPONSABLEVIV = "usp_spv_Cliente_Info_Impresion_select";

        public ConfigViviendaEntregable(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CONFIG_VIVIENDA_ENTREGABLE_SELECT, null, "sm_financiamiento_etapa")
        { }

        public async Task<List<miSCV.IConfigViviendaEntregable>> GetConfigViviendaEntregable(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<miSCV.IConfigViviendaEntregable>(USP_SPV_CONFIG_VIVIENDAENTREGABLE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConfigViviendaEntregable>> SaveDetProg(int numcte, string desc_detalle_repr, int cve_detalle, int bit_reparado, int Usuario)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "numcte", numcte },
                    { "desc_detalle_repr", desc_detalle_repr },
                    { "cve_detalle", cve_detalle },
                    { "bit_reparado", bit_reparado },
                    { "Usuario", Usuario }


                };

                return await helper.CreateEntitiesAsync<miSCV.IConfigViviendaEntregable>(USP_SPV_DET_PROGRAMACION_INS, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IConfigViviendaEntregable>> SaveConfigViv(int numcte, DateTime FechaProgramacion, int PersonaEntregaV, string HoralugarEntrega, string ObservacionesCte)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {

                    { "numcte", numcte },
                    { "FechaProgramacion", FechaProgramacion },
                    { "PersonaEntregaV", PersonaEntregaV },
                    { "HoralugarEntrega", HoralugarEntrega },
                    { "ObservacionesCte", ObservacionesCte }

                };

                return await helper.CreateEntitiesAsync<miSCV.IConfigViviendaEntregable>(USP_SPV_CONFIG_VIVIENDAENTREGABLE_INS, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IPreparacionVivienda>> GetDocumentoImpresion(m.Kontrol.Interfaces.IPreparacionVivienda model)

        {
            try
            {
                var parameters = new Dictionary<string, object>();

                parameters.Add("Plaza", model.plaza);
                parameters.Add("clave_tipo_vivienda ", model.clave_tipo_vivienda);
                parameters.Add("hipoteca_verde", model.hipoteca_verde);

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IPreparacionVivienda>(USP_SPV_CONSULTA_DOCS_IMPRESION_SELECT, CommandType.StoredProcedure, parameters);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IPreparacionViviendaDocs> GetInformacionCte(int idUbicacionVenta)

        {
            try
            {
                var parameters = new Dictionary<string, object>();

                parameters.Add("IdUbicacionVenta", idUbicacionVenta);

                //return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IPreparacionViviendaDocs>(USP_SPV_CONSULTA_INFO_CLIENTE_SELECT, CommandType.StoredProcedure, parameters);
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IPreparacionViviendaDocs>(USP_SPV_CONSULTA_INFO_CLIENTE_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> UpdateResponsableEntViv(Dictionary<string, object> parametros)
        {
            try
            {

                return await helper.GetResultAsync(USP_SPV_UPDATE_RESPONSABLEVIV, CommandType.StoredProcedure, parametros);


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Task<int> EncuestaVivienddaEntregable(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
    }
}
