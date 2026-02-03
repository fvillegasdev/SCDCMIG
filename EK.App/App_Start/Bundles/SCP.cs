using System.Web.Optimization;

namespace EK.App.App_Start.Bundles
{
    public class SCP
    {
        public static Bundle GetBundle(string version)
        {
            var scripts = new string[]{
                "~/Scripts/modulos/scp/Pages/Proveedores.js",
                "~/Scripts/modulos/scp/Pages/Proveedores-Catalogo.js",
                "~/Scripts/modulos/scp/Pages/TipoProveedores.js",
                "~/Scripts/modulos/scp/Pages/TipoProveedores-Catalogo.js",
                "~/Scripts/modulos/scp/Pages/TipoMovimientoProveedores.js",
                "~/Scripts/modulos/scp/Pages/TipoMovimientoProveedores-Catalogo.js",
                "~/Scripts/modulos/scp/Pages/ProveedoresActasConstitutivas.js",
                "~/Scripts/modulos/scp/Pages/ProveedoresActasConstitutivas-Catalogo.js",
                "~/Scripts/modulos/scp/Pages/ProveedoresRegistroPublicoPropiedad.js",
                "~/Scripts/modulos/scp/Pages/ProveedoresRegistroPublicoPropiedad-Catalogo.js",

                "~/Scripts/modulos/scp/Index.js"
            };
            return new ScriptBundle($"~/b/{version}/modulo-scp").Include(scripts);
        }
    }
}