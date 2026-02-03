using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("Posiciones")]
    public interface IPosicion
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IPosicion>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<m.Kontrol.Interfaces.IPosicion> AsignarPosicion(int idUsuario, int? idPosicion);
        Task<m.Kontrol.Interfaces.IPosicion> GetJefeInmediato(int? idUsuario);
        Task<List<m.Kontrol.Interfaces.IPosicion>> GetAscendientes(int? idUsuario);
        Task<List<m.Kontrol.Interfaces.IPosicion>> GetDescendientes(int? idUsuario);
        //Task<modelo.IPosicion> GetPosicion(int id);
        //Task<modelo.IPosicion[]> GetPosiciones(string estatus, int kv);
        //Task<modelo.IPosicion[]> GetPosicionesPorPuesto(int idPuesto, string estatus, int kv);
        //Task<modelo.IPosicion[]> GetPosicionesPorCategoria(int idCategoria, string estatus, int kv);
        //Task<modelo.IPuesto> GetPuesto(int id);
        //Task<modelo.IPuesto[]> GetPuestos(bool activos, int kv);
        //Task<modelo.ICategoria> GetCategoria(int id);
        //Task<modelo.ICategoria[]> GetCategorias(bool activos, int kv);
        //Task<modelo.ICategoria[]> GetCategoriasPorPuesto(int idPuesto, bool activos, int kv);
    }
}