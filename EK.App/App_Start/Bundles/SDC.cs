using System;
using System.Collections.Generic;
using System.Web.Optimization;

namespace EK.App.App_Start.Bundles
{
    public class SDC
    {
        public static Bundle GetBundle(string version)
        {
            var scripts = new string[]{
                "~/Scripts/modulos/sdc/Pages/dashboardDesarrolloComunitario.js",
                "~/Scripts/modulos/sdc/Pages/estadoCuenta.js",
                 "~/Scripts/modulos/sdc/Pages/ticketsClientes.js",
                "~/Scripts/modulos/sdc/Index.js"

            };
            return new ScriptBundle($"~/b/{version}/modulo-sdc").Include(scripts);
        }
    }
}