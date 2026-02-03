using System;
using System.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

using miKontrol = EK.Modelo.Kontrol.Interfaces;
using diKontrol = EK.Datos.Kontrol.Interfaces;

using EK.Modelo.SCV.Interfaces;
using diSCV = EK.Datos.SCV.Interfaces;
using miSCV = EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class Seguimientos : EK.Datos.Kontrol.DAOBase, diSCV.ISeguimientos
    {
        private const string USP_SCV_EXPEDIENTES_SELECT = "usp_scv_Expedientes_select";
        private const string USP_SCV_EXPEDIENTES_INS_UPD = "usp_scv_Expedientes_ins_upd";

        private const string USP_SCV_SEGUIMIENTOS_SELECT = "usp_scv_Expedientes_Seguimientos_select";
        private const string USP_SCV_SEGUIMIENTOS_INS_UPD = "usp_scv_Expedientes_Seguimientos_ins_upd";
        private const string USP_SCV_SEGUIMIENTOS_ENTIDAD_SELECT = "usp_scv_Expedientes_Seguimientos_Entidad_select";

        private const string USP_SCV_SEGUIMIENTOS_DOCUMENTOS_SELECT = "usp_scv_Expedientes_Seguimientos_Documentos_select";
        private const string USP_SCV_SEGUIMIENTOS_DOCUMENTOS_INS_UPD = "usp_scv_Expedientes_Seguimientos_Documentos_ins_upd";

        private const string USP_SCV_SEGUIMIENTOS_PROCESOS_SELECT = "usp_scv_Expedientes_Seguimientos_Procesos_select";
        private const string USP_SCV_SEGUIMIENTOS_PROCESOS_INS_UPD = "usp_scv_Expedientes_Seguimientos_Procesos_ins_upd";

        private const string USP_SCV_SEGUIMIENTOS_ETAPAS_SELECT = "usp_scv_Expedientes_Seguimientos_Etapas_select";
        private const string USP_SCV_SEGUIMIENTOS_ETAPAS_INS_UPD = "usp_scv_Expedientes_Seguimientos_Etapas_ins_upd";

        private const string USP_SCV_SEGUIMIENTOS_REQUISITOS_SELECT = "usp_scv_Expedientes_Requisitos_select";
        private const string USP_SCV_SEGUIMIENTOS_REQUISITOS_INS_UPD = "usp_scv_Expedientes_Requisitos_ins_upd";

        public Seguimientos(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
        {
            base.factory = factory;
            base.helper = helper;
        }

        #region EXPEDIENTE

        public async Task<int> setIniciaExpediente(ISeguimiento model, string parOperacion, int parModificadoPor)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdExpediente", model.IdExpediente},
                    { "IdVenta", model.IdExpediente},
                    { "OperacionEspecificaSP",parOperacion},
                    { "ModificadoPor",parModificadoPor  }
                };

                return await helper.GetResultAsync(USP_SCV_EXPEDIENTES_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        #endregion

        #region SEGUIMIENTO 

        public async Task<object[]> GetAll(int activos)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", DBNull.Value},
                    { "activos", activos}
                };
                return await helper.CreateEntitiesAsync(USP_SCV_EXPEDIENTES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ISeguimiento>> GetAll(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<ISeguimiento>(
                    USP_SCV_SEGUIMIENTOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ISeguimiento> GetById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id},
                    { "activos", DBNull.Value}
                };

                return await helper.CreateSingleEntityAsync<miSCV.ISeguimiento>(
                    USP_SCV_SEGUIMIENTOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ISeguimiento> GetByEntidadId(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id},
                    { "activos", DBNull.Value}
                };

                return await helper.CreateSingleEntityAsync<miSCV.ISeguimiento>(
                    USP_SCV_SEGUIMIENTOS_ENTIDAD_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> Save(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.GetResultAsync(USP_SCV_SEGUIMIENTOS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region DOCUMENTOS

        public async Task<List<ISeguimientoDocumento>> GetDocumentos(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync<ISeguimientoDocumento>(
                    USP_SCV_SEGUIMIENTOS_DOCUMENTOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveDocumento(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.GetResultAsync(USP_SCV_SEGUIMIENTOS_DOCUMENTOS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> getSeguimientoDocumentos(int? parIdSeguimiento, int? parIdEtapa, int? idPosicion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", parIdSeguimiento },
                    { "IdEtapa", parIdEtapa },
                    { "IdPosicion", idPosicion }
                };

                return await helper.CreateEntitiesAsync(USP_SCV_SEGUIMIENTOS_DOCUMENTOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region PROCESOS

        public async Task<List<ISeguimientoProceso>> GetProcesos(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync<ISeguimientoProceso>(
                    USP_SCV_SEGUIMIENTOS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveProceso(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.GetResultAsync(USP_SCV_SEGUIMIENTOS_PROCESOS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> getSeguimientoProcesos(int? parIdSeguimiento, int? parIdEtapa, int? idPosicion, int? idModificadoPor)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", parIdSeguimiento },
                    { "IdEtapa", parIdEtapa },
                    { "ModificadoPor", idModificadoPor },
                    { "IdPosicion", idPosicion }
                };

                return await helper.CreateEntitiesAsync(USP_SCV_SEGUIMIENTOS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ISeguimientoProceso>> ObtenerSeguimientoProceso(int idExpediente, int idSeguimiento, int idEtapa)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", idSeguimiento },
                    { "IdEtapa", idEtapa },
                    { "IdExpediente", idExpediente },
                    { "Operacion", "CONSULTAR_PROCESOS_SEGUIMIENTO_ETAPA" }
                };

                return await helper.CreateEntitiesAsync<ISeguimientoProceso>(USP_SCV_SEGUIMIENTOS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ISeguimientoProceso> GetProceso(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<ISeguimientoProceso>(
                    USP_SCV_SEGUIMIENTOS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> getProcesosPendienteEtapa(ISeguimientoEtapa model, string parOperacion, int? idPosicion, int? idModificadoPor)
        {
            int retValue = -1;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", model.IdSeguimiento },
                    { "IdEtapa", model.IdEtapa },
                    { "Operacion", parOperacion },
                    { "IdPosicion", idPosicion },
                    { "ModificadoPor", idModificadoPor }
                };

                retValue = await helper.GetResultAsync(USP_SCV_SEGUIMIENTOS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #endregion

        #region REQUISITOS

        public async Task<ISeguimientoRequisito> GetRequisito(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<ISeguimientoRequisito>(
                    USP_SCV_SEGUIMIENTOS_REQUISITOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ISeguimientoRequisito>> GetRequisitos(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync<ISeguimientoRequisito>(
                    USP_SCV_SEGUIMIENTOS_REQUISITOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SaveRequisito(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.GetResultAsync(
                    USP_SCV_SEGUIMIENTOS_REQUISITOS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> getRequisitosPendienteEtapa(ISeguimientoEtapa model, string parOperacion, int? idPosicion, int? idModificadoPor)
        {
            int retValue = -1;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", model.IdSeguimiento },
                    { "IdEtapa", model.IdEtapa },
                    { "OperacionEspecificaSP", parOperacion },
                    { "ModificadoPor", idModificadoPor },
                    { "IdPosicion", idPosicion }
                };

                retValue = await helper.GetResultAsync(USP_SCV_SEGUIMIENTOS_REQUISITOS_SELECT, CommandType.StoredProcedure, parameters);
                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> getSeguimientoRequisitos(int? parIdSeguimiento, int? parIdEtapa, int? idPosicion, int? idModificadoPor)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", parIdSeguimiento },
                    { "IdEtapa", parIdEtapa },
                    { "OperacionEspecificaSP", "CATALOGO_GENERAL" },
                    { "ModificadoPor", idModificadoPor },
                    { "IdPosicion", idPosicion }
                };
                return await helper.CreateEntitiesAsync(USP_SCV_SEGUIMIENTOS_REQUISITOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> setIniciarRequisitos(ISeguimientoEtapa model, string parOperacion, int parModificadoPor, int ordenSeguimiento)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", model.IdSeguimiento},
                    { "IdOrden",ordenSeguimiento},
                    { "OperacionEspecificaSP",parOperacion},
                    { "ModificadoPor",parModificadoPor  }
                };

                return await helper.GetResultAsync(USP_SCV_SEGUIMIENTOS_REQUISITOS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        #endregion

        #region ETAPAS

        public async Task<List<ISeguimientoEtapa>> GetEtapas(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync<ISeguimientoEtapa>(
                    USP_SCV_SEGUIMIENTOS_ETAPAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveEtapa(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.GetResultAsync(
                    USP_SCV_SEGUIMIENTOS_ETAPAS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ISeguimientoEtapa>> getSeguimientoEtapas(int? parIdSeguimiento, int? idPosicion, int? idModificadoPor)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", parIdSeguimiento},
                    { "IdEtapa", DBNull.Value},
                    { "OperacionEspecificaSP","CATALOGO_GENERAL"},
                    { "IdPosicion", idPosicion },
                    { "ModificadoPor", idModificadoPor }
                };

                return await helper.CreateEntitiesAsync<ISeguimientoEtapa>(
                    USP_SCV_SEGUIMIENTOS_ETAPAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> setAvanzarEtapa(ISeguimientoEtapa model, string parOperacion, int parModificadoPor)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", model.IdSeguimiento},
                    { "IdEtapa", model.IdEtapa},
                    { "OperacionEspecificaSP",parOperacion},
                    { "ModificadoPor",parModificadoPor  }
                };

                return await helper.GetResultAsync(USP_SCV_SEGUIMIENTOS_ETAPAS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> getOrdenEtapa(ISeguimientoEtapa model, string parOperacion, int? idPosicion, int? idModificadoPor)
        {
            int retValue = 0;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdSeguimiento", model.IdSeguimiento },
                    { "IdEtapa", model.IdEtapa },
                    { "OperacionEspecificaSP", parOperacion },
                    { "IdPosicion", idPosicion },
                    { "ModificadoPor", idModificadoPor }
                };

                retValue = await helper.GetResultAsync(USP_SCV_SEGUIMIENTOS_ETAPAS_SELECT, CommandType.StoredProcedure, parameters);
                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ISeguimientoEtapa> GetEtapa(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<ISeguimientoEtapa>(
                    USP_SCV_SEGUIMIENTOS_ETAPAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}