using EK.Datos.SCV.Interfaces.EKCONNECT;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17.EKCONNECT
{
    public class EKCChats : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.EKCONNECT.IEKCChats>, d.SCV.Interfaces.EKCONNECT.IEKCChats
    {
        private const string USP_SPV_EKCCHATS = "usp_spv_ekcchats";
        public EKCChats(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
          : base(factory, helper, "", null, "EKCChats")
        { }
        public async Task<List<m.SCV.Interfaces.EKCONNECT.IEKCChats>> GetAllChats(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync<m.SCV.Interfaces.EKCONNECT.IEKCChats>(
                    USP_SPV_EKCCHATS, CommandType.StoredProcedure, parametros);
        }

        public async Task<m.SCV.Interfaces.EKCONNECT.IEKCChats> getOrCreate(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.EKCONNECT.IEKCChats>(
                   USP_SPV_EKCCHATS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<int> SaveChat(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
    }
}
