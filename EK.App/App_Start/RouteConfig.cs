using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace EK.App
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();

            routes.MapRoute(
                name: "Kontrol_Routes",
                url: "",
                defaults: new { controller = "kontrol", action = "index", id = UrlParameter.Optional },
                namespaces: new[] { "EK.Web.Kontrol.Controllers" }

            );

            routes.MapRoute(
                name: "All",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "kontrol", action = "index", id = UrlParameter.Optional }
            );

            //routes.MapRoute(
            //    name: "SBO_Routes",
            //    url: "SBO",
            //    defaults: new { controller = "SBO", action = "Index", id = UrlParameter.Optional },
            //    namespaces: new[] { "EK.Web.SBO.Controllers" }

            //);
        }
    }
}
