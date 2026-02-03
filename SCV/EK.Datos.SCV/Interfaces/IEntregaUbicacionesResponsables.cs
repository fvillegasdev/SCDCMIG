using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Interfaces
{
    public interface IEntregaUbicacionesResponsables
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IEntregaUbicacionResponsable>
    {
        Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsable>> getInformacionPersonalEntrega(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento>> getFraccionamientos(Dictionary<string, object> parametros);


    }
}
