using System.Collections.Generic;
using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.Interfaces
{
    public interface ISeguimientos : EK.Datos.Kontrol.Interfaces.IDAOBase
    {
        #region EXPEDIENTE
        Task<int> setIniciaExpediente(miSCV.ISeguimiento model, string parOperacion, int parModificadoPor);
        #endregion

        #region SEGUIMIENTO 
        Task<object[]> GetAll(int activos);
        Task<List<miSCV.ISeguimiento>> GetAll(Dictionary<string,object> parametros);
        Task<miSCV.ISeguimiento> GetById(int id); //Este metodo trae el seguimiento calculado desde una vista con joins.
        Task<miSCV.ISeguimiento> GetByEntidadId(int id); //Este metodo trae el seguimiento nativo (sin calculos).
        Task<int> Save(Dictionary<string, object> parameters);
       // Task<int> GetResponsableAsignado(Dictionary<string, object> parameters);
        #endregion

        #region ETAPAS
        Task<int> getOrdenEtapa(miSCV.ISeguimientoEtapa model, string parOperacion, int? idPosicion, int? idModificadoPor);
        Task<miSCV.ISeguimientoEtapa> GetEtapa(Dictionary<string, object> parameters);
        Task<List<miSCV.ISeguimientoEtapa>> GetEtapas(Dictionary<string, object> parameters);
        Task<int> SaveEtapa(Dictionary<string, object> parameters);
        Task<List<miSCV.ISeguimientoEtapa>> getSeguimientoEtapas(int? parIdSeguimiento, int? idPosicion, int? idModificadoPor);
        Task<int> setAvanzarEtapa(miSCV.ISeguimientoEtapa model, string parOperacion, int parModificadoPor);
        #endregion

        #region REQUISITOS
        Task<miSCV.ISeguimientoRequisito> GetRequisito(Dictionary<string, object> parameters);
        Task<List<miSCV.ISeguimientoRequisito>> GetRequisitos(Dictionary<string, object> parameters);
        Task<int> SaveRequisito(Dictionary<string, object> parameters);
        Task<int> getRequisitosPendienteEtapa(miSCV.ISeguimientoEtapa model, string parOperacion, int? idPosicion, int? idModificadoPor);
        Task<object[]> getSeguimientoRequisitos(int? parIdSeguimiento, int? parIdEtapa, int? idPosicion, int? idModificadoPor);
        Task<int> setIniciarRequisitos(miSCV.ISeguimientoEtapa model, string parOperacion, int parModificadoPor, int ordenSeguimiento);
        #endregion

        #region PROCESOS
        Task<List<miSCV.ISeguimientoProceso>> ObtenerSeguimientoProceso(int idExpediente, int idSeguimiento, int idEtapa);
        Task<miSCV.ISeguimientoProceso> GetProceso(Dictionary<string, object> parameters);
        Task<List<miSCV.ISeguimientoProceso>> GetProcesos(Dictionary<string, object> parameters);
        Task<int> SaveProceso(Dictionary<string, object> parameters);
        Task<object[]> getSeguimientoProcesos(int? parIdSeguimiento, int? parIdEtapa, int? idPosicion, int? idModificadoPor);
        Task<int> getProcesosPendienteEtapa(miSCV.ISeguimientoEtapa model, string parOperacion, int? idPosicion, int? idModificadoPor);

        #endregion

        #region DOCUMENTOS 
        Task<object[]> getSeguimientoDocumentos(int? parIdSeguimiento, int? parIdEtapa, int? idPosicion);
        Task<int> SaveDocumento(Dictionary<string, object> parameters);
        Task<List<miSCV.ISeguimientoDocumento>> GetDocumentos(Dictionary<string, object> parameters);
        #endregion
    }
}