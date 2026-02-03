using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [KontrolName("Agentes")]
    public interface IUsuarios
        : m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IAgente>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<m.SCV.Interfaces.IAgente> GetByUserId(int id);
        

    }
}