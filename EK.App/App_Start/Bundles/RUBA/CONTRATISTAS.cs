using System.Collections.Generic;
using System.Web.Optimization;

namespace EK.App.App_Start.Bundles.RUBA
{
    public static class CONTRATISTAS
    {
        public static Bundle GetBundle(string version)
        {
            var scripts = new string[]{
               //"~/Scripts/modulos/extends/RUBA/CONTRATISTAS/TipoProyecto.js",
               "~/Scripts/modulos/extends/RUBA/SPV/Index.js"
            };
            return new ScriptBundle($"~/b/{version}/RUBA/modulo-contratistas").Include(scripts);
        }
    }
}