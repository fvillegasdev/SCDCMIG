using System.Collections.Generic;
using System.Web.Optimization;

namespace EK.App.App_Start.Bundles
{
    public static class SBO
    {
        public static Bundle GetBundle(string version)
        {
            var scripts = new string[]{
                "~/Scripts/modulos/sbo/Pages/TipoMovimiento.js",
                "~/Scripts/modulos/sbo/Pages/TipoMovimiento-Editar.js",

                "~/Scripts/modulos/sbo/Pages/Bancos-Editar.js",
                "~/Scripts/modulos/sbo/Pages/CapturaCheque.js",
                "~/Scripts/modulos/sbo/Pages/CuentasBancarias.js",
                "~/Scripts/modulos/sbo/Pages/CuentasBancarias-Editar.js",
                "~/Scripts/modulos/sbo/Pages/SubTipoMovimiento.js",
                "~/Scripts/modulos/sbo/Pages/SubTipoMovimiento-Editar.js",
                "~/Scripts/modulos/sbo/Pages/ReporteCheques.js",
                "~/Scripts/modulos/sbo/Pages/BatchElectronico.js",
                "~/Scripts/modulos/sbo/Pages/ConfirmacionBatchElectronico.js",
                "~/Scripts/modulos/sbo/Pages/GeneracionChequesAutomaticos.js",
                "~/Scripts/modulos/sbo/Pages/CapturaCheque.js",
                "~/Scripts/modulos/sbo/Pages/CapturaCheque-Editar.js",
                "~/Scripts/modulos/sbo/Pages/ConfirmacionPagos.js",
                "~/Scripts/modulos/sbo/store/reducers/BancosReducer.js",
                "~/Scripts/modulos/sbo/store/reducers/CuentasBancariasReducer.js",
                "~/Scripts/modulos/sbo/store/reducers/SubTipoMovimientoReducer.js",
                "~/Scripts/modulos/sbo/store/reducers/TipoMovimientoReducer.js",
                "~/Scripts/modulos/sbo/store/reducers/ChequesReducer.js",
                "~/Scripts/modulos/sbo/store/reducers/BatchReducer.js",
                "~/Scripts/modulos/sbo/store/reducers/GeneracionChequesAutomaticosReducer.js",
                "~/Scripts/modulos/sbo/store/reducers/ProveedoresReducer.js",
                "~/Scripts/modulos/sbo/store/reducers/CentrosCostoReducer.js",
                "~/Scripts/modulos/sbo/store/reducers/reducers.js",
                "~/Scripts/modulos/sbo/Index.js"
            };

            return new ScriptBundle($"~/b/{version}/modulo-sbo").Include(scripts);
        }
    }
}