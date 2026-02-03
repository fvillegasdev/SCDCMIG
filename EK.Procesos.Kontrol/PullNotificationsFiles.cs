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
using System.IO;

namespace EK.Procesos.Kontrol
{
    public class PullNotificationsFiles
     : p.Kontrol.BPBase<m.Kontrol.Interfaces.IPullNotificationsFiles, d.Kontrol.Interfaces.IPullNotificationsFiles>, p.Kontrol.Interfaces.IPullNotificationsFiles
    {
        #region Constructor

        public PullNotificationsFiles(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPullNotificationsFiles dao)
           : base(factory, dao, "PullNotificationsFiles")
        {
        }

        #endregion Constructor

        public async Task<m.Kontrol.Interfaces.IPullNotificationsFiles> CreateDocument(byte[] byteArray, dynamic retvalue)
        {
            var documento = Get<m.Kontrol.Interfaces.IKontrolDocument>();
            var pullNotificationsFiles = Get<m.Kontrol.Interfaces.IPullNotificationsFiles>();
            var fileDriver = Get<EK.Drivers.Storage.IStorage>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            MemoryStream stream = new MemoryStream(byteArray);
            stream.Position = 0;
            documento.Extension = "txt";
            documento.Nombre = string.Format("{0}.txt", "NotificationContent");
            documento.ContentType = "text/html";
            documento.Content = stream;
            documento.Content.Position = 0;
            documento.Size = stream.Length;

            DateTime dt = DateTime.UtcNow;
            string uid = dt.Ticks.ToString();
            string modulo = "notifications";
            string entityType = "emails";

            var md = new Dictionary<string, string>{
                { "source", "ek" },
                { "name", documento.Nombre },
                { "uuid", uid },
                { "tipo", modulo },
                { "entityId", Convert.ToString(retvalue.ID) },
                { "entityType", entityType },
                { "modulo", modulo }};

            string storagePath = string.Format("notifications/{0}/{1}/{2}/{3}", entityType, retvalue.ID, modulo, uid);
            string filePath = string.Format("notifications/GetFile/{0}/{1}/{2}/{3}", entityType, retvalue.ID, modulo, uid);
            fileDriver.Save(storagePath, documento.ContentType, md, stream.ToArray());
            try
            {
                pullNotificationsFiles.EntityType = entityType;
                pullNotificationsFiles.IdPullNotifications = retvalue.ID;
                pullNotificationsFiles.Modulo = modulo;
                pullNotificationsFiles.Tipo = modulo;
                pullNotificationsFiles.Uid = uid;
                pullNotificationsFiles.Nombre = documento.Nombre;
                pullNotificationsFiles.StoragePath = storagePath;
                pullNotificationsFiles.FileSize = documento.Size;
                pullNotificationsFiles.FileType = documento.ContentType;
                pullNotificationsFiles.FileExtension = documento.Extension;
                pullNotificationsFiles.IdEstatus = estatus.ID;
                pullNotificationsFiles.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                pullNotificationsFiles = await dao.Save(pullNotificationsFiles);
                //var file = fileDriver.GetFile(storagePath);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return pullNotificationsFiles;
        }

    }
}