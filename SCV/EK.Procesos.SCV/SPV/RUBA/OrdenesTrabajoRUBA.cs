using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class OrdenesTrabajoRUBA : p.Kontrol.BPBase<m.SCV.Interfaces.IOrdenTrabajoRUBA, d.SCV.Interfaces.IOrdenesTrabajoRUBA>,
        p.SCV.Interfaces.IOrdenesTrabajoRUBA
    {
        public OrdenesTrabajoRUBA(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IOrdenesTrabajoRUBA dao)
            : base(factory, dao, "ordenesTrabajoRUBA")
        {
        }

        protected override async Task<m.SCV.Interfaces.IOrdenTrabajoRUBA> afterGetItem(m.SCV.Interfaces.IOrdenTrabajoRUBA item)
        {
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();

            if (item != null)
            {
                var parametros = new Dictionary<string, object>() { { "idOrdenTrabajo", item.ID } };
                item.Partidas = await daoOTD.GetAll(parametros);
            };

            return item;
        }
    }
}