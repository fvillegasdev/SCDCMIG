using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Text;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace EK.Procesos.Kontrol
{
    public class PlantillasLeads
        : BPBase<m.Kontrol.Interfaces.IPlantillasLeads, d.Kontrol.Interfaces.IPlantillasLeads>, p.Kontrol.Interfaces.IPlantillasLeads
    {
        public PlantillasLeads(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPlantillasLeads dao)
               : base(factory, dao, "plantillasLeads")
        {
        }

        public override async Task<m.Kontrol.Interfaces.IPlantillasLeads> Save(m.Kontrol.Interfaces.IPlantillasLeads item)
        {
            if (item.UUID == null)
            {
                item.UUID = Guid.NewGuid().ToString().ToUpper();
            }
            //Guardardo elemento actual
            item = await base.saveModel(item);
            return item;
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Plantilla = obj.Plantilla;
        }
    }
}