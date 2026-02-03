using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IKontrolFiles : IDAOBase
    {
        Task<List<m.IKontrolFile>> GetAll(Dictionary<string, object> parametros);
        Task<m.IKontrolFile> GetById(int id);
        Task<m.IKontrolFile> GetByClave(string clave);
        Task<m.IKontrolFile> GetByUid(string uid);
        Task<m.IKontrolFile> GetItem(Dictionary<string, object> parametros);
        Task<int> Save(m.IKontrolFile model);
        Task<int> Delete(int id);
    }
}