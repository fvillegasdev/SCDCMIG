using System;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Threading.Tasks;

namespace EK.Procesos.SCV
{
    public class FasesExpediente
         : p.Kontrol.BPBase<m.SCV.Interfaces.IFaseExpediente, d.SCV.Interfaces.IFasesExpediente>,
        p.SCV.Interfaces.IFasesExpediente
    {
        public FasesExpediente(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IFasesExpediente dao)
            : base(factory, dao, "fasesExpediente")
        {
        }
    }
}