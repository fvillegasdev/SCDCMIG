using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("EntregaUbicaciones")]

    public interface IEntregaUbicaciones
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IEntregaUbicacion>
    {
        Task<m.SCV.Interfaces.IEntregaUbicacion> SaveReversarEntrega(m.SCV.Interfaces.IEntregaUbicacion item);
    }
}