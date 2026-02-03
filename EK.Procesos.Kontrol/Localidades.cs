using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Localidades
        : BPBase<m.Kontrol.Interfaces.ILocalidad, d.Kontrol.Interfaces.ILocalidades>, p.Kontrol.Interfaces.ILocalidades
    {

        public Localidades(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ILocalidades dao)
               : base(factory, dao, "localidades")
        {
        }
    }
}