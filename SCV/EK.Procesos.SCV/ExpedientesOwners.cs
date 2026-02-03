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
    public class ExpedientesOwners
        : p.Kontrol.BPBase<m.SCV.Interfaces.IExpedienteOwner, d.SCV.Interfaces.IExpedientesOwners>,
        p.SCV.Interfaces.IExpedientesOwners
    {
        public ExpedientesOwners(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IExpedientesOwners dao)
            : base(factory, dao, "expedientesOwners")
        {
        }
    }
}