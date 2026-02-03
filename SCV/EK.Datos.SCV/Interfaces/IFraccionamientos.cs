using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.Interfaces
{
    public interface IFraccionamientos
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IFraccionamientos>
    {
        Task<List<m.SCV.Interfaces.IFraccionamientos>> getFraccionamientosProyecto(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IFraccionamientos>> getFraccionamientosByProyectoID(Dictionary<string, object> parametros);

    }
}