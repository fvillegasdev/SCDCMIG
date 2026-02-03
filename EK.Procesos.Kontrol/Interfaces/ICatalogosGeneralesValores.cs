using System.Threading.Tasks;
using mdl = EK.Modelo.Kontrol;

namespace EK.Procesos.Kontrol.Interfaces
{
    [mdl.KontrolName("CatalogosGeneralesValores")]
    public interface ICatalogosGeneralesValores
        : Kontrol.Interfaces.IBaseProceso
    {
        Task<mdl.Interfaces.IItemGeneralValores> GetByID(int id);
        Task<EK.Modelo.Kontrol.Interfaces.IItemGeneral> Get(string claveCatalogo, string clave);
        Task<object[]> GetByCatalogo(string clave, int activos = 0);
        Task<object[]> Search(string clave, string nombre, int activos = 0);
        Task<mdl.Interfaces.IItemGeneralValores> Save(string catalogogeneralvalores);
    }
}