using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("MotivoSuspension")]

    public interface IMotivoSuspension
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IMotivoSuspension>
    {
        Task<object> GetUsuarios(Dictionary<string, object> parametros);
        Task<object> GetMotivoSuspension(Dictionary<string,object> parametros);
    }
}