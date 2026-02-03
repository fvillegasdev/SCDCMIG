using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;
using dk = EK.Datos.Kontrol;

namespace EK.Datos.SCV.MSSQL
{
    public class Esquemas
        : dk.DAOBase, Interfaces.IEsquemas
    {
        private const string USP_SCV_ESQUEMAS_SELECT = "usp_scv_Esquemas_select";
        private const string USP_SCV_ESQUEMAS_INS_UPD = "usp_scv_Esquemas_ins_upd";
        private const string USP_SCV_ESQUEMAS_ETAPAS_SELECT = "usp_scv_Esquemas_Etapas_select";
        private const string USP_SCV_ESQUEMAS_ETAPAS_INS_UPD = "usp_scv_Esquemas_Etapas_ins_upd";
        private const string USP_SCV_ESQUEMAS_ETAPAS_DELETE = "usp_scv_Esquemas_Etapas_delete";
        private const string USP_SCV_ESQUEMAS_ETAPAS_REQUISITOS_SELECT = "usp_scv_Esquemas_Etapas_Requisitos_select";
        private const string USP_SCV_ESQUEMAS_ETAPAS_REQUISITOS_INS_UPD = "usp_scv_Esquemas_Etapas_Requisitos_ins_upd";
        private const string USP_SCV_ESQUEMAS_ETAPAS_DOCUMENTOS_SELECT = "usp_scv_Esquemas_Etapas_Documentos_select";
        private const string USP_SCV_ESQUEMAS_ETAPAS_DOCUMENTOS_INS_UPD = "usp_scv_Esquemas_Etapas_Documentos_ins_upd";
        private const string USP_SCV_ESQUEMAS_ETAPAS_PROCESOS_SELECT = "usp_scv_Esquemas_Etapas_Procesos_select";
        private const string USP_SCV_ESQUEMAS_ETAPAS_PROCESOS_INS_UPD = "usp_scv_Esquemas_Etapas_Procesos_ins_upd";

        public Esquemas(mk.Interfaces.IContainerFactory factory, dk.Interfaces.IDBHelper helper)
        {
            base.factory = factory;
            base.helper = helper;
        }

        #region "Esquema"

        public async Task<m.Interfaces.IEsquema> GetById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id},
                    { "activos", DBNull.Value}
                };

                return await helper.CreateSingleEntityAsync<m.Interfaces.IEsquema>(
                    USP_SCV_ESQUEMAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<m.Interfaces.IEsquema>> GetAll(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Interfaces.IEsquema>(
                    USP_SCV_ESQUEMAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<m.Interfaces.IEsquema>> GetAllFase(Dictionary<string, object> parametro)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Interfaces.IEsquema>(USP_SCV_ESQUEMAS_SELECT, CommandType.StoredProcedure, parametro);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> Save(m.Interfaces.IEsquema model)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("Clave", model.Clave);
                parameters.Add("Nombre", model.Nombre);
                parameters.Add("IdFaseExpediente", model.IdFaseExpediente);
                //parameters.Add("IdTipoFinanciamiento", model.IdTipoFinanciamiento);
                parameters.Add("IdEstatus", model.IdEstatus);
                parameters.Add("IdCreadoPor", model.IdCreadoPor);
                parameters.Add("IdModificadoPor", model.IdModificadoPor);

                return await helper.GetResultAsync(
                    USP_SCV_ESQUEMAS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> DeleteEsquema(int id)
        {
            return await base.DeleteEntity(id, "Id", "scv_Esquemas", false);
        }

        #endregion

        #region "Etapas"

        public async Task<m.Interfaces.IEsquemaEtapa> GetEtapaById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };

                return await helper.CreateSingleEntityAsync<m.Interfaces.IEsquemaEtapa>(
                    USP_SCV_ESQUEMAS_ETAPAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<m.Interfaces.IEsquemaEtapa>> GetEtapas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Interfaces.IEsquemaEtapa>(
                    USP_SCV_ESQUEMAS_ETAPAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }


        public async Task<List<m.Interfaces.IEsquemaEtapa>> GetEtapasXEsquema(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Interfaces.IEsquemaEtapa>(
                    USP_SCV_ESQUEMAS_ETAPAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }


        public async Task<int> SaveEtapa(m.Interfaces.IEsquemaEtapa model, int? operacion)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdEsquema", model.IdEsquema);
                parameters.Add("IdEtapa", model.IdEtapa);
                parameters.Add("PlazoDias", model.PlazoDias);
                parameters.Add("Orden", model.Orden);
                parameters.Add("IdWorkFlow", model.IdWorkFlow);
                parameters.Add("IdAreaResponsable", model.IdAreaResponsable);
                parameters.Add("IdCreadoPor", model.IdCreadoPor);
                parameters.Add("IdModificadoPor", model.IdModificadoPor);
                parameters.Add("Operacion", operacion);
                return await helper.GetResultAsync(USP_SCV_ESQUEMAS_ETAPAS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteEtapa(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_SCV_ESQUEMAS_ETAPAS_DELETE,
                    CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> DeleteEtapa(int id)
        {
            return await base.DeleteEntity(id, "ID", "scv_Esquemas_Etapas", false);
        }

        #endregion

        #region "Requisitos"

        public async Task<m.Interfaces.IEsquemaEtapaRequisito> GetRequisitoById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };

                return await helper.CreateSingleEntityAsync<m.Interfaces.IEsquemaEtapaRequisito>(
                    USP_SCV_ESQUEMAS_ETAPAS_REQUISITOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<m.Interfaces.IEsquemaEtapaRequisito>> GetRequisitos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Interfaces.IEsquemaEtapaRequisito>(
                    USP_SCV_ESQUEMAS_ETAPAS_REQUISITOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SaveRequisito(m.Interfaces.IEsquemaEtapaRequisito model)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdEsquema", model.IdEsquema);
                parameters.Add("IdEtapa", model.IdEtapa);
                parameters.Add("IdRequisito", model.IdRequisito);
                parameters.Add("Obligatorio", model.Obligatorio);
                parameters.Add("PlazoDias", model.PlazoDias);
                parameters.Add("IdCreadoPor", model.IdCreadoPor);
                parameters.Add("IdModificadoPor", model.IdModificadoPor);

                return await helper.GetResultAsync(USP_SCV_ESQUEMAS_ETAPAS_REQUISITOS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteRequisito(int id)
        {
            return await base.DeleteEntity(id, "ID", "scv_Esquemas_Etapas_Requisitos", false);
        }

        #endregion

        #region "Documentos"

        public async Task<m.Interfaces.IEsquemaEtapaDocumento> GetDocumentoById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };

                return await helper.CreateSingleEntityAsync<m.Interfaces.IEsquemaEtapaDocumento>(
                    USP_SCV_ESQUEMAS_ETAPAS_DOCUMENTOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<m.Interfaces.IEsquemaEtapaDocumento>> GetDocumentos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Interfaces.IEsquemaEtapaDocumento>(
                    USP_SCV_ESQUEMAS_ETAPAS_DOCUMENTOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SaveDocumento(m.Interfaces.IEsquemaEtapaDocumento model)
        {
            try
            {
                var p = new Dictionary<string, object>();
                p.Add("Id", model.ID);
                p.Add("IdEsquema", model.IdEsquema);
                p.Add("IdEtapa", model.IdEtapa);
                p.Add("IdDocumento", model.IdDocumento);
                p.Add("IdRequisitoRelacionado", model.IdRequisitoRelacionado);
                p.Add("IdCreadoPor", model.IdCreadoPor);
                p.Add("IdModificadoPor", model.IdModificadoPor);

                return await helper.GetResultAsync(USP_SCV_ESQUEMAS_ETAPAS_DOCUMENTOS_INS_UPD,
                    CommandType.StoredProcedure, p);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteDocumento(int id)
        {
            return await base.DeleteEntity(id, "ID", "scv_Esquemas_Etapas_Documentos", false);
        }

        #endregion

        #region "Procesos"

        public async Task<m.Interfaces.IEsquemaEtapaProceso> GetProcesoById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };

                return await helper.CreateSingleEntityAsync<m.Interfaces.IEsquemaEtapaProceso>(
                    USP_SCV_ESQUEMAS_ETAPAS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<m.Interfaces.IEsquemaEtapaProceso>> GetProcesos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Interfaces.IEsquemaEtapaProceso>(
                    USP_SCV_ESQUEMAS_ETAPAS_PROCESOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SaveProceso(m.Interfaces.IEsquemaEtapaProceso model)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdEsquema", model.IdEsquema);
                parameters.Add("IdEtapa", model.IdEtapa);
                parameters.Add("IdProceso", model.IdProceso);
                parameters.Add("configuracion", model.Configuracion);
                parameters.Add("IdCreadoPor", model.IdCreadoPor);
                parameters.Add("IdModificadoPor", model.IdModificadoPor);
                parameters.Add("Nombre",model.Nombre);
                return await helper.GetResultAsync(USP_SCV_ESQUEMAS_ETAPAS_PROCESOS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteProceso(int id)
        {
            return await base.DeleteEntity(id, "ID", "scv_Esquemas_Etapas_Procesos", false);
        }

        #endregion

        public async Task<object[]> GetEsquemasInstitucion(int idInstitucion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idInstitucion", idInstitucion}
                };

                return await helper.CreateEntitiesAsync(
                    USP_SCV_ESQUEMAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }
    }
}