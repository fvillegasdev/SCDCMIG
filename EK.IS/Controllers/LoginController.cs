using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IdentityServer3.Core.Extensions;
using System.Threading.Tasks;

namespace EK.IS.Controllers
{
    public class LoginController : Controller
    {
        [Route("login")]
        public ActionResult Index(string id)
        {
            ViewBag.loginId = id;
            return View();
        }

        [Route("login")]
        [HttpPost]
        public ActionResult Index(string id, string username, string password, string remember)
        {
            var env = Request.GetOwinContext().Environment;
            var newLogin = new IdentityServer3.Core.Models.AuthenticatedLogin
            {
                Subject = username,
                Name = username,
            };
            env.IssueLoginCookie(newLogin);

            var msg = env.GetSignInMessage(id);
            var returnUrl = msg.ReturnUrl;

            env.RemovePartialLoginCookie();

            return Redirect(returnUrl);
        }
    }
}