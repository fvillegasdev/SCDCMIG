using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IPosiciones
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IPosicion>
    {
        //Task<m.Kontrol.Interfaces.IPosicion> GetPosicion(int id);
        //Task<m.Kontrol.Interfaces.IPosicion> GetPosicionUsuario(int idUsuario);
        //Task<m.Kontrol.Interfaces.IPosicion[]> GetPosiciones(int? idPuesto, int? idCategoria, string estatus, int kv);
        //Task<int> SavePosicion(m.Kontrol.Interfaces.IPosicion posicion);
        //Task<int> SaveUsuarioPosicion(int idPosicion, int? idUsuario, int idModificadoPor);
        Task<m.Kontrol.Interfaces.IPuesto> GetPuesto(int id);
        //Task<m.Kontrol.Interfaces.IPuesto[]> GetPuestos(bool activos, int kv);
        Task<m.Kontrol.Interfaces.ICategoria> GetCategoria(int id);
        Task<List<m.Kontrol.Interfaces.IPosicion>> GetAscendientes(int? idUsuario);
        Task<List<m.Kontrol.Interfaces.IPosicion>> GetDescendientes(int? idUsuario);
        //Task<m.Kontrol.Interfaces.ICategoria[]> GetCategorias(int? idPuesto, bool activos, int kv);
    }
}