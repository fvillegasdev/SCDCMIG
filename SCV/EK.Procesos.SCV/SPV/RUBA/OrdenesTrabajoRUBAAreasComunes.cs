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
    public class OrdenesTrabajoRUBAAreasComunes : p.Kontrol.BPBase<m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes, d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>,
        p.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes
    {
        public OrdenesTrabajoRUBAAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes dao)
           : base(factory, dao, "ordenesTrabajoRUBAAreasComunes")
        {
        }

        protected override async Task<m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes> afterGetItem(m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes item)
        {
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();

            if (item != null)
            {
                var parametros = new Dictionary<string, object>() { { "idOrdenTrabajo", item.ID } };
                item.Partidas = await daoOTD.GetAll(parametros);
            };

            return item;
        }
    }
}
