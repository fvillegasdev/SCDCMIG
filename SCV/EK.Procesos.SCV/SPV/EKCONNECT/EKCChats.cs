using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;
using EK.Modelo.SCV.Interfaces.EKCONNECT;

namespace EK.Procesos.SCV.SPV.EKCONNECT
{
    public class EKCChats : p.Kontrol.BPBase<m.SCV.Interfaces.EKCONNECT.IEKCChats, d.SCV.Interfaces.EKCONNECT.IEKCChats>, p.SCV.Interfaces.EKCONNECT.IEKCChats
    {
        public EKCChats(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.EKCONNECT.IEKCChats dao)
         : base(factory, dao, "EKCChats")
        {
        }

        public Task<int> createChat(Dictionary<string, object> parametros)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<IEKCChats>> getAllChats(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAllChats(parametros);
        }
    }
}
