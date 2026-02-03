using EK.Modelo.Kontrol;
using System.Threading.Tasks;
using m = EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol.Interfaces
{
    [KontrolName("UsuarioNivelCompania")]
    public interface IUsuarioNivelCompania : Kontrol.Interfaces.IBaseProceso
    {
        object[] GetAll(int idcompania = 0, int idusuario = 0, int idnivel = 0);

        m.IUsuarioNivelCompania Get(int id);

        Task<m.IUsuarioNivelCompania> Save(string modelo);

        Task<int> Delete(int Id);
    }
}