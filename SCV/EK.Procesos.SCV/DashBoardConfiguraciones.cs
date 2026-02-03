using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class DashBoardConfiguraciones : p.Kontrol.BPBase<m.SCV.Interfaces.IDashBoardConfiguracion, d.SCV.Interfaces.IDashBoardConfiguraciones>,
        p.SCV.Interfaces.IDashBoardConfiguraciones
    {
        public DashBoardConfiguraciones(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IDashBoardConfiguraciones dao)
            : base(factory, dao, "dashBoardConfiguraciones")
        {
        }
    }
}