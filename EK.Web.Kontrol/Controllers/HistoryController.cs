using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public class HistoryController
        : EK.Common.BaseKontroller
    {        
        [Route("history/{entity}/{id}/{top}")]
        [Route("history/{entity}/{id}")]
        [HttpGet]
        public async Task<ActionResult> Entity(string entity, int id, int? top)
        {
            int historyTop = top ?? 25;
            var retValue = await Get("/History/GetHistory")
                .Add("entity", entity)
                .Add("id", id)
                .Add("top", historyTop)
                .ExecuteAsync();

            return null;
        }

        //[Route("history/{entity}/{top}/{order}")]
        //[HttpGet]
        //public ActionResult All(string entity, int top, string order)
        //{
        //    return Get("/History/GetAllEntityHistory")
        //        .Add("entity", entity.ToLower())
        //        .Add("order", order.ToLower())
        //        .Add("top", top)
        //        .Execute();
        //}
    }
}
