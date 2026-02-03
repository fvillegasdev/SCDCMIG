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
    public class BienesAdicionales : p.Kontrol.BPBase<m.SCV.Interfaces.IBienesAdicionales, d.SCV.Interfaces.IBienesAdicionales>,
        p.SCV.Interfaces.IBienesAdicionales
    {
        public BienesAdicionales(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IBienesAdicionales dao)
           : base(factory, dao, "BienesAdicionales")
        {
        }
        public async Task<List<m.SCV.Interfaces.IBienesAdicionales>> getListaBienesAdicionales(string fracc)
        {
            var daoBA = Get<d.SCV.Interfaces.IBienesAdicionales>();
            var bienesAdicionales = await daoBA.GetBienesAdicionales(fracc);
            return bienesAdicionales;
        }
    }
}
