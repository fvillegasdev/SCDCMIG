using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EK.Drivers.Log;
using Newtonsoft.Json;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
using drivers = EK.Drivers;
using System.Dynamic;

namespace EK.Procesos.Kontrol
{
    public class PullNotifications
     : p.Kontrol.BPBase<m.Kontrol.Interfaces.IPullNotifications, d.Kontrol.Interfaces.IPullNotifications>, p.Kontrol.Interfaces.IPullNotifications
    {
        private new const string entityName = "PullNotifications";

        #region Constructor

        public PullNotifications(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPullNotifications dao)
           : base(factory, dao, entityName)
        {
        }

        #endregion Constructor

        public async Task<m.Kontrol.Interfaces.IPullNotifications> SendNotification(string[] emails, string asunto, string contenido, string entityName, dynamic obj)
        {
            var pullNotifications = Get<m.Kontrol.Interfaces.IPullNotifications>();
            drivers.Emailing.Plantilla plantilla = new drivers.Emailing.Plantilla(this.factory);
            var daopullNotificationsEntities = Get<d.Kontrol.Interfaces.IPullNotificationsEntities>();
            var entidad = await daopullNotificationsEntities.GetByClave(entityName);
            var bpPullNotificationsFiles = Get<EK.Procesos.Kontrol.Interfaces.IPullNotificationsFiles>();

            try
            {
                pullNotifications.IdRelacionEntidad = obj.ID;
                pullNotifications.IdEntidad = entidad.ID;
                pullNotifications.Titulo = asunto;
                pullNotifications.TipoEnvio = "Email";
                pullNotifications.FechaEnvio = DateTime.UtcNow;
                pullNotifications.Creado = DateTime.UtcNow;
                pullNotifications.IdCreadoPor = getUserId();
                pullNotifications.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;

                foreach (var e in emails)
                {
                    pullNotifications.ATID = Guid.NewGuid().ToString().ToUpper();
                    pullNotifications.AVID = Guid.NewGuid().ToString().ToUpper();
                    pullNotifications.Destinatario = e;
                    pullNotifications = await dao.Save(pullNotifications);
                    string PlantillaContenido = plantilla.ExtractDataLinks(contenido, pullNotifications, entityName);
                    string PlantillaContenidoPlus = plantilla.AddTrackingLinks(PlantillaContenido, pullNotifications);
                    // convert string to stream
                    byte[] byteArray = Encoding.UTF8.GetBytes(PlantillaContenidoPlus);
                    var PullNotificationsFiles = bpPullNotificationsFiles.CreateDocument(byteArray, pullNotifications);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return pullNotifications;
        }

        //public async Task<m.Kontrol.Interfaces.IPullNotificationsEntities> GetBpWorkFlow(int IdRelacionEntidad)
        //{
        //    var parameters = new Dictionary<string, object>
        //        {
        //            { "ID", IdRelacionEntidad }
        //        };
        //    var BPWorkFlow = await this.dao.GetBPWorkFlow(parameters);
        //    return BPWorkFlow;
        //}

        internal string GetBpType(Dictionary<string, object> parametros)
        {
            string BPType = string.Empty;
            dynamic jObject = null;
            string paramsLinkItem = parametros["PullNotificationsLinks"].ToString();
            if (jObject == null)
            {
                jObject = JsonConvert.DeserializeObject(paramsLinkItem);
                BPType = jObject.GetValue("BPType").ToString();
            }
            return BPType;
        }

        public async Task<object> ActionMethod(Dictionary<string, object> parametros)
        {
            dynamic retValue = new ExpandoObject();
            dynamic instance = null;
            string idType = GetBpType(parametros);
            var type = Type.GetType(idType.ToString());
            instance = factory.GetInstance(type);
            var m = await instance.DoAction(parametros);
            return m;
        }
    }
}