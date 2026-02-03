using System.Collections.Generic;
using System.Web.Optimization;

namespace EK.App.App_Start.Bundles
{
    public static class InitApp
    {
        public static Bundle GetBundle(string version)
        {
            var scripts = new string[]{
                "~/Scripts/components/store/Store.js",
                "~/Scripts/modulos/Index.js"
            };

            return new ScriptBundle($"~/b/{version}/init-app").Include(scripts);
        }
    }
}