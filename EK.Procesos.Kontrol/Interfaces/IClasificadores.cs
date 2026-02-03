using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("clasificadores")]
    public interface IClasificadores
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IClasificador>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.Kontrol.Interfaces.ICatalogoClasificador>> SaveClasificadores(string claveEntidad, int idEntidad, List<m.Kontrol.Interfaces.ICatalogoClasificador> clasificadores);

    }
}