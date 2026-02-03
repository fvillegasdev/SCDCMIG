using System.Configuration;
using System.Web.Mvc;
using System.IO;

using EK.Drivers.Storage;

namespace EK.Utils
{
    public class Base
        : Controller
    {
        private string storageTarget = ConfigurationManager.AppSettings["drivers:storage:target"];

        #region "File Management"

        public Drivers.Storage.File GetFileStorage(string repositoryFilefileName)
        {
            return GetFileManager().GetFile(repositoryFilefileName);
        }

        protected IStorage GetFileManager()
        {
            EK.Drivers.Storage.IStorage retValue = null;
            var type = System.Type.GetType(storageTarget);
            retValue = System.Activator.CreateInstance(type) as IStorage;
            //if ("file".Equals(storageTarget))
            //{
            //    retValue = new EK.Drivers.Storage.FileSystemStorage();
            //}
            //else if ("blob".Equals(storageTarget))
            //{
            //    retValue = new EK.Drivers.Storage.BlobStorage();
            //}
            return retValue;
        }

        protected EK.Common.Managers.ImageManager GetImageManager()
        {
            EK.Common.Managers.ImageManager retValue = null;
            var type = System.Type.GetType(storageTarget);

            //if ("file".Equals(storageTarget))
            //{
            //    retValue = new EK.Common.Managers.ImageManager(new EK.Drivers.Storage.FileSystemStorage());
            //}
            //else if ("blob".Equals(storageTarget))
            //{
            //    retValue = new EK.Common.Managers.ImageManager(new EK.Drivers.Storage.BlobStorage());
            //}

            retValue = new EK.Common.Managers.ImageManager(System.Activator.CreateInstance(type) as IStorage);


            return retValue;
        }
        #endregion
    }
}