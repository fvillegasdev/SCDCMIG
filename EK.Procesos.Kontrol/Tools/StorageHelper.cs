using System;

using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.RetryPolicies;

namespace EK.Procesos.Kontrol.Tools
{
    internal class StorageHelper
    {
        public static string GetStorageAccount()
        {
            string retValue = string.Empty;

            try
            {
                retValue = CloudConfigurationManager.GetSetting("storage:files");
            }
            catch 
            {
                throw;
            }

            return retValue;
        }

        public static dynamic GetStorageToken(string containerName)
        {
            containerName = containerName.ToLower().Trim();

            // create the container based on the Account Key
            var storageAccount = getStorageAccount();
            var blobClient = storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference(containerName);
            
            try
            {
                BlobRequestOptions requestOptions = new BlobRequestOptions() { RetryPolicy = new NoRetry() };
                container.CreateIfNotExists(requestOptions, null);
            }
            catch
            {                
                throw;
            }

            SharedAccessBlobPolicy policy = new SharedAccessBlobPolicy()
            {
                Permissions =
                SharedAccessBlobPermissions.Read |
                SharedAccessBlobPermissions.Write |
                SharedAccessBlobPermissions.List |
                SharedAccessBlobPermissions.Create |
                SharedAccessBlobPermissions.Delete,
                
                SharedAccessStartTime = DateTime.Today,
                SharedAccessExpiryTime = DateTime.Today.AddDays(1)
            };

            BlobContainerPermissions permissions = new BlobContainerPermissions();
            permissions.PublicAccess = BlobContainerPublicAccessType.Off;
            permissions.SharedAccessPolicies.Clear();
            container.SetPermissions(permissions);

            // Get token
            string sasToken = container.GetSharedAccessSignature(policy);
            string containerUri = container.Uri.OriginalString;
            
            return new { Token = sasToken, Uri = containerUri };
        }

        private static string GetAccountSASToken()
        {
            CloudStorageAccount storageAccount = getStorageAccount();

            SharedAccessAccountPolicy policy = new SharedAccessAccountPolicy()
            {
                Permissions = SharedAccessAccountPermissions.Read | SharedAccessAccountPermissions.Write | SharedAccessAccountPermissions.List | SharedAccessAccountPermissions.Create | SharedAccessAccountPermissions.Delete,
                Services = SharedAccessAccountServices.Blob,
                ResourceTypes = SharedAccessAccountResourceTypes.Object,
                SharedAccessStartTime = DateTime.Today,
                SharedAccessExpiryTime = DateTime.Today.AddDays(1),
                Protocols = SharedAccessProtocol.HttpsOnly
            };

            string sasToken = storageAccount.GetSharedAccessSignature(policy);

            return sasToken;
        }

        private static CloudStorageAccount storageAccount;
        private static CloudStorageAccount getStorageAccount()
        {
            try
            {
                if (storageAccount == null)
                {
                    storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("storage:files"));
                }
            }
            catch (FormatException)
            {
                throw;
            }
            catch (ArgumentException)
            {
                throw;
            }

            return storageAccount;
        }
    }
}
