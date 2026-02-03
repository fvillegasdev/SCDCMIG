//using Microsoft.IdentityModel.Clients.ActiveDirectory;
//using System.Web;
//using System.Runtime.Caching;
//using System.Threading;
//using System.Collections.Generic;

//namespace EK.Common.Utils
//{

//    public class NaiveMemoryCache : TokenCache
//    {
//        private static ReaderWriterLockSlim SessionLock = new ReaderWriterLockSlim(LockRecursionPolicy.NoRecursion);
//        string UserObjectId = string.Empty;
//        string CacheId = string.Empty;

//        public NaiveMemoryCache(string userId)
//        {
//            UserObjectId = userId;
//            CacheId = UserObjectId + "_TokenCache";

//            this.AfterAccess = AfterAccessNotification;
//            this.BeforeAccess = BeforeAccessNotification;
//            Load();
//        }

//        public void Load()
//        {
//            SessionLock.EnterReadLock();
//            this.Deserialize((byte[]) MemoryCache.Default[CacheId]);            
//            SessionLock.ExitReadLock();
//        }

//        public void Persist()
//        {
//            SessionLock.EnterWriteLock();

//            // Optimistically set HasStateChanged to false. We need to do it early to avoid losing changes made by a concurrent thread.
//            this.HasStateChanged = false;
//            var policy = new CacheItemPolicy();
//            policy.SlidingExpiration = System.TimeSpan.FromMinutes(30);
//            // Reflect changes in the persistent store
//            MemoryCache.Default.Set(CacheId, this.Serialize(), policy);
//            SessionLock.ExitWriteLock();
//        }

//        // Empties the persistent store.
//        public override void Clear()
//        {
//            base.Clear();
//            MemoryCache.Default.Remove(CacheId);
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