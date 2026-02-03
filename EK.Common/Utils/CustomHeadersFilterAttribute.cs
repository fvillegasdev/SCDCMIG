using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Common.Utils
{
    public class CustomHeadersFilterAttribute
        : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var headerKey = "X-EK-PAGE-ID";
            var headers = filterContext.RequestContext.HttpContext.Request.Headers;

            if (!string.IsNullOrEmpty(headers[headerKey])) {
                filterContext.HttpContext.Response.Headers.Add(headerKey, headers[headerKey]);
            }
        }
    }
}
