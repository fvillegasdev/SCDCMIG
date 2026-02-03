//using System;
//using System.Collections.Generic;
//using System.Diagnostics;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Threading.Tasks;
//using System.Web.Http;

//using EK.Drivers.Log;
//using EK.Utils;
//using EK.Modelo.Kontrol;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.KontrolService.Controllers
//{
//    public class TestServiceController : ApiController
//    {
//        public async Task<string> Get()
//        {
//            try
//            {
//                EK.Procesos.Kontrol.Interfaces.IUsuario p = null;
//                p = EK.Utils.BootstrapperKontrolAPI.Container.GetInstance<EK.Procesos.Kontrol.Interfaces.IUsuario>();
                
//                return (await p.GetByEmail("atorres@enkontrol.com")).Nombre;
//            }
//            catch (Exception ex)
//            {
//                return $"{ex.Message} ------ {ex.StackTrace}";
//            }
//        }
//    }

//    [Authorize]
//    public class KontrolServiceController : ApiController
//    {
//        // GET api/kontrolService
//        //public ICommandResult Get([FromBody]CommandQuery command)
//        //{
//        //    ICommandResult retValue = null;

//        //    try
//        //    {
//        //        retValue = EK.Utils.BootstrapperKontrolAPI.CommandManager.Execute(command);
//        //    }
//        //    catch
//        //    {
//        //        throw;
//        //    }

//        //    return retValue;
//        //}

//        // POST api/values
//        public async Task<object> Post([FromBody]CommandQuery command)
//        {
//            object retValue = null;

//            try
//            {
//                var stopWatch = Stopwatch.StartNew();

//                retValue = await EK.Utils.BootstrapperKontrolAPI.CommandManager.Execute(command);

//                stopWatch.Stop();

//                await logWebRequest(command.ID, stopWatch.ElapsedMilliseconds);
//            }
//            catch (Exception ex){
//                throw new ApplicationException("Kontrol Service", ex);
//            }

//            return retValue;
//        }

//        // PUT api/values/5
//        //public ICommandResult Put([FromBody]CommandQuery command)
//        //{
//        //    ICommandResult retValue = null;

//        //    try
//        //    {
//        //        retValue = EK.Utils.BootstrapperKontrolAPI.CommandManager.Execute(command);
//        //    }
//        //    catch
//        //    {
//        //        throw;
//        //    }

//        //    return retValue;
//        //}

//        // DELETE api/values/5
//        //public ICommandResult Delete([FromBody]CommandQuery command)
//        //{
//        //    ICommandResult retValue = null;

//        //    try
//        //    {
//        //        retValue = EK.Utils.BootstrapperKontrolAPI.CommandManager.Execute(command);
//        //    }
//        //    catch
//        //    {
//        //        throw;
//        //    }

//        //    return retValue;
//        //}

//        private async Task logWebRequest(string commandId, long milliseconds)
//        {
//            DateTime endTime = DateTime.UtcNow;

//            dynamic message = new EK.Drivers.Log.ElasticEntity();
//            message.Timestamp = DateTime.UtcNow;
//            message.TimestampTicks = DateTime.UtcNow.Ticks;
//            message.Command = commandId;
//            message.Method = Request.Method;
//            message.RequestUrl = Request.RequestUri.OriginalString;
//            message.Referer = Request.Headers.GetValues("Referer").ElementAt(0);
//            message.UserAgent = Request.Headers.GetValues("User-Agent").ElementAt(0);
//            message.UserRequest = Request.Headers.GetValues("User").ElementAt(0);
//            message.UserToken = User.Identity.Name;
//            message.ElapsedMilliseconds = (int)milliseconds;
//            message.ResponseCode = 200;

//            var log = Utils.BootstrapperKontrolAPI.Container.GetInstance<ILogger>();
//            await log.AddAsync("api", message);
//        }
//    }
//}
