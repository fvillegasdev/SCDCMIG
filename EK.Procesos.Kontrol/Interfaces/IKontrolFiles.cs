using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

using m = EK.Modelo.Kontrol.Interfaces;
using mk = EK.Modelo.Kontrol;

namespace EK.Procesos.Kontrol.Interfaces
{
    [mk.KontrolName("KontrolFiles")]
    public interface IKontrolFiles : IBaseProceso
    {
        Task<List<m.IKontrolFile>> GetAll(Dictionary<string, object> parametros);
        Task<m.IKontrolFile> GetItem(Dictionary<string, object> parametros);
        Task<m.IKontrolFile> GetById(int id);
        Task<m.IKontrolFile> GetByUid(string uid);
        Task<m.IKontrolFile> Save(m.IKontrolFile item);
        Task<m.IKontrolFile> SaveFile(m.IKontrolFile item, MemoryStream stream, string contentType);
        Task<bool> DeleteFile(string path);
        Task<m.IKontrolFile> CreateDocumento(string entityType, int entityId, string tipo, string modulo, m.IKontrolDocument documento);
        Task<m.IKontrolFile> CreateDocumento(string entityType, int entityId, string tipo, string modulo, EK.Drivers.Common.IKontrolFiles documento);
        Task<long?> GetLastVersion(string tipo, string modulo, string entityType, int entityId);
        Task<m.IKontrolFile> Delete(int id);
        Task<bool> DeleteByParams(Dictionary<string, object> parametros);
        Task<m.IKontrolFile> ConvertirDocumento(string entityType, int entityId, string modulo, string tipo, Stream input, dynamic data, m.IMoneda moneda, string languaje, string fileName, string extension, string contentType);
        System.IO.Stream GetByStorage(string entityType, int entityId, string tipo, string uid);
        byte[] CompressFiles(List<m.IKontrolDocument> entries);
        byte[] CompressFiles(List<m.IKontrolFile> files);
        Task<m.IKontrolFile> SaveZipFile(byte[] bytes, string filename);


        Task<m.IKontrolFilesVersiones> SaveFileVersion(m.IKontrolFilesVersiones item, MemoryStream stream, string contentType, m.IKontrolFile padre);
    }
}