using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;

using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ubicacionEstatus")]

    public interface IUbicacionesEstatus
        : p.Kontrol.Interfaces.IBaseProceso
    {
        
    }
}