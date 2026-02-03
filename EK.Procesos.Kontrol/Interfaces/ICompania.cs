using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("Companias")]
    public partial interface ICompania
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.ICompania>, IBaseProceso
    {
        Task<List<m.Kontrol.Interfaces.ICompania>> GetVivienda();
        Task<DateTime> Today(int idCompania);
    }
}