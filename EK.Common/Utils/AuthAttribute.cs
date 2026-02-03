using System;
using System.Collections.Generic;

using System.Web;
using System.Web.Mvc;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Security.Principal;
using System.Web.Mvc.Properties;

using Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.Owin.Security.Notifications;

namespace EK.Common.Utils
{
    public class AuthAttribute :
        AuthorizeAttribute
    {
        //List<string> modules;
        public AuthAttribute() {
            //this.modules = new List<string>(modules);
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                // 403 we know who you are, but you haven't been granted access
                filterContext.Result = new HttpStatusCodeResult(System.Net.HttpStatusCode.Forbidden);
            }
            else
            {
                // 401 who are you? go login and then try again
                filterContext.Result = new HttpUnauthorizedResult();
            }
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            // base checkout
            base.OnAuthorization(filterContext);

            //if (filterContext.Result == null || ((HttpStatusCodeResult)filterContext.Result).StatusCode == 200)
            //{
            //    // check claims
            //    if (this.modules != null && this.modules.Count > 0)
            //    {
            //        var user =
            //            (System.Security.Claims.ClaimsIdentity)filterContext.HttpContext.User.Identity;

            //        var hasModuleClaim = false;

            //        foreach (var claim in this.modules)
            //        {
            //            var userClaim = user.FindFirst(claim);

            //            if (userClaim != null && userClaim.Value == "true")
            //            {
            //                hasModuleClaim = true;

            //                break;
            //            }
            //        }

            //        if (!hasModuleClaim)
            //        {
            //            filterContext.Result = new HttpStatusCodeResult(System.Net.HttpStatusCode.Forbidden);
            //        }
            //    }
            //}
        }
    }
}
