//using Microsoft.IdentityModel.Clients.ActiveDirectory;
//using System.Web;
//using System.Threading;
//using System.Collections.Generic;

//namespace EK.Common.Utils
//{

//    public class NaiveSessionCache : TokenCache
//    {
//        private static ReaderWriterLockSlim SessionLock = new ReaderWriterLockSlim(LockRecursionPolicy.NoRecursion);
//        string UserObjectId = string.Empty;
//        string CacheId = string.Empty;
//        System.Web.SessionState.HttpSessionState values;

//        public NaiveSessionCache(string userId, System.Web.SessionState.HttpSessionState values)
//        {
//            UserObjectId = userId;
//            CacheId = UserObjectId + "_TokenCache";
//            this.values = values;

//            this.AfterAccess = AfterAccessNotification;
//            this.BeforeAccess = BeforeAccessNotification;
//            Load();
//        }

//        public void Load()
//        {
//            SessionLock.EnterReadLock();
//            //this.Deserialize((byte[])HttpContext.Current.Session[CacheId]);
//            this.Deserialize((byte[])this.values[CacheId]);
//            SessionLock.ExitReadLock();
//        }

//        public void Persist()
//        {
//            SessionLock.EnterWriteLock();

//            // Optimistically set HasStateChanged to false. We need to do it early to avoid losing changes made by a concurrent thread.
//            this.HasStateChanged = false;

//            // Reflect changes in the persistent store
//            //HttpContext.Current.Session[CacheId] = this.Serialize();
//            this.values[CacheId] = this.Serialize();
//            SessionLock.ExitWriteLock();
//        }

//        // Empties the persistent store.
//        public override void Clear()
//        {
//            base.Clear();
//            this.values.Remove(CacheId);
//            //System.Web.HttpContext.Current.Session.Remove(CacheId);
//        }

//        // Triggered right before ADAL needs to access the cache.
//        // Reload the cache from the persistent store in case it changed since the last access.
//        void BeforeAccessNotification(TokenCacheNotificationArgs args)
//        {
//            Load();
//        }

//        // Triggered right after ADAL accessed the cache.
//        void AfterAccessNotification(TokenCacheNotificationArgs args)
//        {
//            // if the access operation resulted in a cache update
//            if (this.HasStateChanged)
//            {
//                Persist();
//            }
//        }
//    }
//}