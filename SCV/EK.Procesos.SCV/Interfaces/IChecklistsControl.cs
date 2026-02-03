using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ChecklistsControl")]
    public interface IChecklistsControl
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IChecklistControl>
    {
        Task<object> SaveChecklists(List<m.SCV.Interfaces.IChecklistControl> item);

    }
}
