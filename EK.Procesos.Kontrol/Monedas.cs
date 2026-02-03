using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Monedas  
        : BPBase<m.Kontrol.Interfaces.IMoneda, d.Kontrol.Interfaces.IMonedas>, p.Kontrol.Interfaces.IMonedas
    {
        public Monedas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IMonedas dao)
               : base(factory, dao, "monedas")
        {
        }
    }
}