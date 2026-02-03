using System.Collections.Generic;
using System.Threading.Tasks;
using im = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface ICatalogosGeneralesValores : IDAOBase
    {
        Task<object[]> Get(string clave, string nombre, int activos = 0);

        Task<im.IItemGeneralValores> Get(int id);

        Task<object[]> GetByCatalogo(string clave, int activos = 0);

        Task<object[]> GetKVByCatalogo(string clave);

        Task<EK.Modelo.Kontrol.Interfaces.IItemGeneral> GetByClave(string claveCatalogo, string clave);

        Task<int> Save(im.IItemGeneralValores model);
        Task<object[]> GetAll(Dictionary<string, object> parametros);
    }
}