using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    public interface IComisionesAutorizacion
    {
        Task<bool> ActualizarImportes(m.SCV.Interfaces.IComisionesAprobacion item,m.Kontrol.Interfaces.IItemGeneral estatus);
    }
}
