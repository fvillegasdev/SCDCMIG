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
    public class EntregaPaquetes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IEntregaPaquetes, d.SCV.Interfaces.IEntregaPaquetes>, p.SCV.Interfaces.IEntregaPaquetes

    {
        public EntregaPaquetes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IEntregaPaquetes dao)
            : base(factory, dao, "EntregaPaquetes")
        { }

        public async Task<List<m.SCV.Interfaces.IEntregaPaquetes>> GetEntregaPaquetes(string Plaza, string Segmentos, string Fraccionamiento, DateTime FechaInicial, DateTime FechaFinal)
        {
            var ResultEntregaPaquetes = await this.dao.GetEntregaPaquetes(Plaza, Segmentos, Fraccionamiento, FechaInicial, FechaFinal);

           return ResultEntregaPaquetes;

        }

    }
}