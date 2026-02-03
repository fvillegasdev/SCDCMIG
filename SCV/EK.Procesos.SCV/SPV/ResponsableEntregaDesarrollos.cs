using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace EK.Procesos.SCV
{
    public class ResponsableEntregaDesarrollos : p.Kontrol.BPBase<m.SCV.Interfaces.IResponsableEntregaDesarrollo, d.SCV.Interfaces.IResponsableEntregaDesarrollos>, p.SCV.Interfaces.IResponsableEntregaDesarrollos
    {
        public ResponsableEntregaDesarrollos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IResponsableEntregaDesarrollos dao)
            : base(factory, dao, "ResponsableEntregaDesarrollos")
        {
        }
        public override async Task<m.SCV.Interfaces.IResponsableEntregaDesarrollo> Save(m.SCV.Interfaces.IResponsableEntregaDesarrollo item)
        {
            var bpREP = Get<p.SCV.Interfaces.IDesarrollos>();
            return await bpREP.SetGrupoResponsable(item);
        }
    }

}