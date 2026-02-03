using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("paquetes")]
    public interface IPaquetes
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPaquete>
    {
        //Task<int> SaveList(List<m.SCV.Interfaces.IBitacora> items, int idRegistro, string entidad);

        Task<List<m.SCV.Interfaces.IPaqueteUbicaciones>> UpdateEstatusUbicacion(int idUbicacion, string claveEstatus);
    }
}