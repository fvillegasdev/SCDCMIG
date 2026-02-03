using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("bitacora")]
    public interface IBitacora
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IBitacora>
    {

        Task<m.Kontrol.Interfaces.IBitacora> SaveBitacora(string comentario,
            string claveEntidad,
            string claveEvento,
            int idEntidad,
            string claveEntidadPadre,
            int idEntidadPadre,
            int? idEntidadPosterior);
    }
}