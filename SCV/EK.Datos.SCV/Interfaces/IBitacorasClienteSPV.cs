using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IBitacorasClienteSPV
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IBitacoraClienteSPV>
    {
        Task<int> GetMaxPartida(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IKontrolFile>> GetEvidenciasBitacora (Dictionary<string, object> parametros);
        Task<int> MarcarComentarioValidado(int IdComentario);
    }
}