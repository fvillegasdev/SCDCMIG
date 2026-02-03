using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Web;

namespace EK.App
{
    [ExcludeFromCodeCoverage]
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Kontrol/Login")
            });
            app.MapSignalR();
        }
    }
}

//using Microsoft.Owin;
//using Owin;

//namespace EK.App
//{
//    public partial class Startup
//    {
//        public void Configuration(IAppBuilder app)
//        {
//            //
//            ConfigureAuth(app);
//            //ConfigureSignalR(app);
//        }
//    }
//}
