using System;
using System.Collections.Generic;
using System.Web.Optimization;

namespace EK.App.App_Start.Bundles
{
    public class SCCO
    {
        public static Bundle GetBundle(string version)
        {
            var scripts = new string[]{
                "~/Scripts/modulos/scco/Pages/SccoFilters.js",
                "~/Scripts/modulos/scco/Pages/TipoObra.js",
                "~/Scripts/modulos/scco/Pages/TipoObra-Catalogo.js",
                "~/Scripts/modulos/scco/Pages/TipoInsumo.js",
                "~/Scripts/modulos/scco/Pages/TipoInsumo-Catalogo.js",
                "~/Scripts/modulos/scco/Pages/Obra.js",
                "~/Scripts/modulos/scco/Pages/Obra-Catalogo.js",
                "~/Scripts/modulos/scco/Pages/InsumosMateriales.js",
                "~/Scripts/modulos/scco/Pages/InsumosMateriales-Catalogo.js",
                "~/Scripts/modulos/scco/Pages/GrupoInsumo.js",
                "~/Scripts/modulos/scco/Pages/GrupoInsumo-Catalogo.js",
                "~/Scripts/modulos/scco/pages/Contratista.js",
                "~/Scripts/modulos/scco/pages/Contratista-Editar.js",
                "~/Scripts/modulos/scco/pages/TipoNivelesPresupuesto.js",
                "~/Scripts/modulos/scco/pages/TipoNivelesPresupuesto-Catalogo.js",
                "~/Scripts/modulos/scco/pages/Residentes.js",
                "~/Scripts/modulos/scco/pages/Residentes-Catalogo.js",
                "~/Scripts/modulos/scco/pages/MotivosOrdenesCambio.js",
                "~/Scripts/modulos/scco/pages/MotivosOrdenesCambio-Catalogo.js",
                "~/Scripts/modulos/scco/pages/NivelesPresupuesto.js",
                "~/Scripts/modulos/scco/pages/NivelesPresupuesto-Catalogo.js",
                "~/Scripts/modulos/scco/pages/AnticiposDeducciones-Catalogo.js",
                "~/Scripts/modulos/scco/pages/AnticiposDeducciones.js",
                "~/Scripts/modulos/scco/pages/Desarrollos.js",
                "~/Scripts/modulos/scco/pages/Desarrollos-Catalogo.js",
                "~/Scripts/modulos/scco/pages/InsumosTarjetas-Catalogo.js",
                "~/Scripts/modulos/scco/pages/InsumosTarjetas.js",
                "~/Scripts/modulos/scco/pages/TabuladoresInsumos-Catalogo.js",
                "~/Scripts/modulos/scco/pages/TabuladoresInsumos.js",
                "~/Scripts/modulos/scco/pages/presupuestos/WBS-App-Components.js",
                "~/Scripts/modulos/scco/pages/presupuestos/WBS-App-Interfaces.js",
                "~/Scripts/modulos/scco/pages/presupuestos/WBS-App.js",
                "~/Scripts/modulos/scco/pages/presupuestos/WBS-TreeView.js",
                "~/Scripts/modulos/scco/pages/presupuestos/Presupuestos-Catalogo.js",
                "~/Scripts/modulos/scco/pages/presupuestos/Presupuestos.js",
                "~/Scripts/modulos/scco/pages/Contratos-Catalogo.js",
                "~/Scripts/modulos/scco/pages/Contratos.js",
                "~/Scripts/modulos/scco/Index.js"
            };

            return new ScriptBundle($"~/b/{version}/modulo-scco").Include(scripts);
        }
    }
}