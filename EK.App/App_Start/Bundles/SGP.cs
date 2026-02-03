using System.Collections.Generic;
using System.Web.Optimization;

namespace EK.App.App_Start.Bundles
{
    public static class SGP
    {
        public static Bundle GetBundle(string version)
        {
            var scripts = new string[]{
                //"~/Scripts/modulos/sgp/Pages/_____.js",
                //"~/Scripts/modulos/sgp/Pages/_____-Editar.js"
                "~/Scripts/modulos/sgp/Pages/Tareas.js",
                "~/Scripts/modulos/sgp/Pages/Tareas-Edit.js",
                 "~/Scripts/modulos/sgp/Pages/TipoProyecto.js",
                "~/Scripts/modulos/sgp/Pages/TipoProyecto-Editar.js",
                "~/Scripts/modulos/sgp/Pages/Proyectos.js",
                "~/Scripts/modulos/sgp/Pages/Proyectos-Edit.js",
                "~/Scripts/modulos/sgp/Pages/ReservaTerritorial.js",
                "~/Scripts/modulos/sgp/Pages/ReservaTerritorial-Edit.js",
                "~/Scripts/modulos/sgp/Pages/DashboardProyectos.js",
                "~/Scripts/modulos/sgp/Pages/GruposUsuariosSGP.js",
                "~/Scripts/modulos/sgp/Pages/QuickSidePanel.js",
                "~/Scripts/modulos/sgp/Pages/TreeViewSGP.js",
                "~/Scripts/modulos/sgp/Index.js",
            };
            return new ScriptBundle($"~/b/{version}/modulo-sgp").Include(scripts);
        }
    }
}