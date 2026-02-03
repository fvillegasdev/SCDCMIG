using System.Threading.Tasks;
using mdl = EK.Modelo.SBO.Interfaces;

namespace EK.Procesos.SBO.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("Bancos")]
    public interface IBancos: Kontrol.Interfaces.IBaseProceso
    {

        Task<object[]> GetAll();
        Task<object[]> compania(int idCompania);

        Task<mdl.IBancos> GetById(int id);


        Task<mdl.IBancos> Insert(string banco);

        Task<mdl.IBancos> Update(string banco);

    }
}
