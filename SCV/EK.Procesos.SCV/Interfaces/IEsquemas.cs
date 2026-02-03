using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Procesos.SCV.Interfaces
{
    [mk.KontrolName("Esquemas")]
    public interface IEsquemas : Kontrol.Interfaces.IBaseProceso
    {
        Task<object> GetConfiguracion(int idEsquema);

        #region "Esquema"
        Task<List<m.Interfaces.IEsquema>> GetAll(Dictionary<string, object> parametros);
        Task<m.Interfaces.IEsquema> GetById(int id);
        Task<m.Interfaces.IEsquema> Save(m.Interfaces.IEsquema item);
        Task<m.Interfaces.IEsquema> Delete(int id);
        #endregion

        #region "Niveles"
        Task<List<m.Interfaces.IEsquemaNivel>> ComputeNiveles(Dictionary<string, object> parametros);
        Task<m.Interfaces.IEsquemaNivel> DeleteNivel(m.Interfaces.IEsquemaNivel item);
        Task<List<m.Interfaces.IEsquemaNivel>> UpdateNiveles(m.Interfaces.IEsquema item);
        #endregion

        #region "Etapas"
        Task<List<m.Interfaces.IEsquemaEtapa>> GetEtapas(Dictionary<string, object> parametros);

        Task<List<m.Interfaces.IEsquemaEtapa>> GetEtapasXEsquema(Dictionary<string, object> parametros); 
        
        Task<m.Interfaces.IEsquemaEtapa> SaveEtapa(m.Interfaces.IEsquemaEtapa item);
        Task<m.Interfaces.IEsquemaEtapa> DeleteEtapa(int id);
        #endregion

        #region "Requisitos"
        Task<List<m.Interfaces.IEsquemaEtapaRequisito>> GetRequisitos(Dictionary<string, object> parametros);
        Task<m.Interfaces.IEsquemaEtapaRequisito> SaveRequisito(m.Interfaces.IEsquemaEtapaRequisito item);
        Task<m.Interfaces.IEsquemaEtapaRequisito> DeleteRequisito(int id);
        #endregion

        #region "Documentos"
        Task<List<m.Interfaces.IEsquemaEtapaDocumento>> GetDocumentos(Dictionary<string, object> parametros);
        Task<m.Interfaces.IEsquemaEtapaDocumento> SaveDocumento(m.Interfaces.IEsquemaEtapaDocumento item);
        Task<m.Interfaces.IEsquemaEtapaDocumento> DeleteDocumento(int id);
        #endregion

        #region "Procesos"
        Task<List<m.Interfaces.IEsquemaEtapaProceso>> GetProcesos(Dictionary<string, object> parametros);
        Task<m.Interfaces.IEsquemaEtapaProceso> SaveProceso(m.Interfaces.IEsquemaEtapaProceso item);
        Task<m.Interfaces.IEsquemaEtapaProceso> DeleteProceso(int id);
        #endregion

        Task<object[]> GetEsquemasInstitucion(int idInstitucion);
    }
}