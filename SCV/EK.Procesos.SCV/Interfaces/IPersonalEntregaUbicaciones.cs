using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("PersonalEntregaUbicaciones")]

    public interface IPersonalEntregaUbicaciones
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IEntregaUbicacionResponsable>
    {
        Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsable>> getPersonalEntregaVivienda(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento>> getAsignado(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento>> getNoAsignado(Dictionary<string, object> parametros);

    }
}