using EK.Modelo.SCV.Interfaces.EKCONNECT;
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
    public class EKCMensajes : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>, d.SCV.Interfaces.EKCONNECT.IEKCMensajes
    {
        public const string USP_SPV_EKCMENSAJES = "usp_spv_ekcmensajes";

        public EKCMensajes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
        : base(factory, helper, USP_SPV_EKCMENSAJES, null, "ekcmensajes")
        {

        }

        public async Task<List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>> getByChatId(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>(
                    USP_SPV_EKCMENSAJES, CommandType.StoredProcedure, parametros);
        }

        public async Task<IEKCMensajes> getByIdWA(Dictionary<string, object> parametros)
        {
            return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>(
                  USP_SPV_EKCMENSAJES, CommandType.StoredProcedure, parametros);
        }

        public async Task<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> getByMensajeId(Dictionary<string, object> parametros)
        {
            return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>(
                   USP_SPV_EKCMENSAJES, CommandType.StoredProcedure, parametros);
        }

        public async Task<int> LogErrors(Dictionary<string, object> parametros)
        {
            try {
                return await helper.GetResultAsync(USP_SPV_EKCMENSAJES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveMensaje(Dictionary<string, object> parametros)
        {
            try {
                //parametros.Add("OPERACION", "INSERTCAPTUREEVENT");
                return await helper.GetResultAsync(USP_SPV_EKCMENSAJES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEKCMensajes> UdateIdWAMensaje(int IdMensaje, string idWA)
        {
            var parametros = new Dictionary<string, object>();
            parametros.Add("Action", "UPDATE_IDWA");
            parametros.Add("idMensaje",IdMensaje);
            parametros.Add("idWA", idWA);
            return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>(
                 USP_SPV_EKCMENSAJES, CommandType.StoredProcedure, parametros);
        }
    }
}
