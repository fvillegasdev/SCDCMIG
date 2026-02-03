using System.Collections.Generic;
using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.Interfaces
{
    public interface IEsquemas : EK.Datos.Kontrol.Interfaces.IDAOBase
    {
        #region "Esquema"
        Task<miSCV.IEsquema> GetById(int id);
        Task<List<miSCV.IEsquema>> GetAll(Dictionary<string, object> parametros);
        Task<List<miSCV.IEsquema>> GetAllFase(Dictionary<string, object> parametros);
        Task<int> Save(miSCV.IEsquema model);
        Task<int> DeleteEsquema(int id);
        #endregion

        #region "Etapas"
        Task<miSCV.IEsquemaEtapa> GetEtapaById(int id);
        Task<List<miSCV.IEsquemaEtapa>> GetEtapas(Dictionary<string, object> parametros);
        Task<List<miSCV.IEsquemaEtapa>> GetEtapasXEsquema(Dictionary<string, object> parametros);
        Task<int> SaveEtapa(miSCV.IEsquemaEtapa model, int? operacion);
        Task<int> DeleteEtapa(Dictionary<string, object> parametros);
        Task<int> DeleteEtapa(int id);
        #endregion

        #region "Requisitos"
        Task<miSCV.IEsquemaEtapaRequisito> GetRequisitoById(int id);
        Task<List<miSCV.IEsquemaEtapaRequisito>> GetRequisitos(Dictionary<string, object> parametros);
        Task<int> SaveRequisito(miSCV.IEsquemaEtapaRequisito model);
        Task<int> DeleteRequisito(int id);
        #endregion

        #region "Documentos"
        Task<miSCV.IEsquemaEtapaDocumento> GetDocumentoById(int id);
        Task<List<miSCV.IEsquemaEtapaDocumento>> GetDocumentos(Dictionary<string, object> parametros);
        Task<int> SaveDocumento(miSCV.IEsquemaEtapaDocumento model);
        Task<int> DeleteDocumento(int id);
        #endregion

        #region "Procesos"
        Task<miSCV.IEsquemaEtapaProceso> GetProcesoById(int id);
        Task<List<miSCV.IEsquemaEtapaProceso>> GetProcesos(Dictionary<string, object> parametros);
        Task<int> SaveProceso(miSCV.IEsquemaEtapaProceso model);
        Task<int> DeleteProceso(int id);
        #endregion

        Task<object[]> GetEsquemasInstitucion(int idInstitucion);
    }
}