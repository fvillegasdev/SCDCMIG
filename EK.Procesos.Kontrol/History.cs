using System;
using System.Diagnostics;
using System.Dynamic;
using System.Threading.Tasks;

using Newtonsoft.Json;
using dKontrol = EK.Datos.Kontrol.Interfaces;
using mKontrol = EK.Modelo.Kontrol.Interfaces;
using pKontrol = EK.Procesos.Kontrol.Interfaces;
using EK.Common.Managers;
using Microsoft.ServiceBus.Messaging;

namespace EK.Procesos.Kontrol
{
    public class History
        : ProcesoBase, pKontrol.IHistory
    {
        public History(mKontrol.IContainerFactory factory)
               : base(factory)
        {
            base.factory = factory;
        }

        public async Task<object[]> GetHistory(string entity, int id, int top)
        {
            //var retValue = await base.GetEntityHistory(entity, id, top);

            return null;
        }

        //public object GetHistory(string entity, int top, string order)
        //{
        //    return base.GetEntityHistory(entity, top);
        //}
    }
}
