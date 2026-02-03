using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Eventos
        : BPBase<m.Kontrol.Interfaces.IEvento, d.Kontrol.Interfaces.IEventos>, p.Kontrol.Interfaces.IEventos
    {
        public Eventos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IEventos dao)
            : base(factory, dao, "Eventos")
        {
        }
    }
}
