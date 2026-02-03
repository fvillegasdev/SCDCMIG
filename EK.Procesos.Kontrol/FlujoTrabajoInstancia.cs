using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class FlujoTrabajoInstancia
        : BPBase<m.Kontrol.Interfaces.IWorkflowInstance, d.Kontrol.Interfaces.IWorkflowInstance>, p.Kontrol.Interfaces.IFlujoTrabajoInstancia
    {
        public FlujoTrabajoInstancia(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IWorkflowInstance dao)
               : base(factory, dao, "flujoTrabajoInstancia")
        {
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> getUsuariosPropietarios(Dictionary<string, object> parametros)
       {
            var daoGUD = Get<d.Kontrol.Interfaces.IWorkflowInstance>();
            return await daoGUD.GetUsuariosPropietarios(parametros);
        }
    }
}