using System.Diagnostics;
using System.Reflection;
using System.Web;
using System.Web.Optimization;

namespace EK.App
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
            string version = fvi.FileVersion;
            //
            bundles.Add(new ScriptBundle($"~/b/{version}/jquery").Include("~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle($"~/b/{version}/jqueryval").Include("~/Scripts/jquery.validate*"));
            bundles.Add(new ScriptBundle($"~/b/{version}/jqueryrepeater").Include("~/Content/Theme/plugins/jquery-repeater/jquery-repeater.js"));

            bundles.Add(EK.App.App_Start.Bundles.Componentes.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.Kontrol.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.SBO.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.SCV.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.SCCO.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.SDC.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.SCP.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.SGP.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.RUBA.CONTRATISTAS.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.RUBA.SPV.GetBundle(version));
            bundles.Add(EK.App.App_Start.Bundles.InitApp.GetBundle(version));



            // core
            bundles.Add(new ScriptBundle($"~/b/{version}/core").Include(
                "~/Content/Theme/global/plugins/fullcalendar/lib/moment.min.js",
                "~/Content/Theme/global/plugins/bootstrap/js/bootstrap.min.js",
                "~/Scripts/lib/react/react.js",
                "~/Scripts/lib/react-dom/react-dom-server.js",
                "~/Scripts/lib/react-dom/react-dom.js",
                "~/Scripts/lib/react-router/ReactRouter.js",
                "~/Scripts/lib/redux-thunk/redux-thunk.js",
                "~/Scripts/lib/redux/redux.js",
                "~/Scripts/lib/react-redux/react-redux.js"
                )
            );
            //plugins
            bundles.Add(new ScriptBundle($"~/b/{version}/plugins").Include(
                "~/Content/Theme/global/plugins/js.cookie.min.js",
                "~/Content/Theme/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js",
                "~/Content/Theme/global/plugins/jquery.blockui.min.js",
                "~/Content/Theme/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js",
                "~/Content/Theme/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js",
                "~/Content/Theme/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js",
                "~/Content/Theme/global/plugins/jquery-inputmask/jquery.maskedinput.min.js",
                "~/Content/Theme/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js",
                "~/Content/Theme/global/plugins/bootstrap-select/js/bootstrap-select.min.js",
                "~/Content/Theme/global/scripts/app.min.js",
                //"~/Content/Theme/pages/scripts/components-bootstrap-select.min.js",
                "~/Content/Theme/global/plugins/datatables/datatables.min.js",
                "~/Content/Theme/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js",
                "~/Content/Theme/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js",
                "~/Content/Theme/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.es.min.js",
                "~/Content/Theme/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js",
                "~/Content/Theme/global/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.es.js",
                "~/Content/Theme/global/plugins/jquery-bootpag/jquery.bootpag.min.js",
                "~/Content/Theme/global/plugins/holder.js",
                "~/Content/Theme/global/plugins/select2/js/select2.full.js",
                "~/Content/Theme/global/plugins/select2/js/i18n/es.js",
                "~/Content/Theme/global/plugins/typeahead/handlebars.min.js",
                "~/Content/Theme/global/plugins/typeahead/typeahead.bundle.min.js",
                "~/Content/Theme/global/plugins/jquery-nestable/jquery.nestable.js",
                "~/Content/Theme/global/plugins/bootstrap-toastr/toastr.min.js",
                "~/Content/Theme/global/plugins/icheck/icheck.min.js",
                "~/Content/Theme/global/plugins/jstree/dist/jstree.js",
                "~/Content/Theme/global/plugins/bootstrap-summernote/summernote.js",
                "~/Content/Theme/global/plugins/bootbox/bootbox.min.js",
                "~/Content/Theme/global/plugins/bootstrap-sweetalert/sweetalert.min.js",
                "~/Content/Theme/global/plugins/bootstrap-contextmenu/bootstrap-contextmenu.js",
                "~/Content/Theme/global/plugins/bootbox/bootbox.min.js",
                "~/Content/Theme/global/plugins/fullcalendar/fullcalendar.js",
                "~/Content/Theme/global/plugins/fullcalendar/locale/es.js",
                "~/Content/Theme/global/plugins/jquery-lightbox/lc_lightbox.lite.js",
                "~/Content/Theme/global/plugins/jquery-lightbox/AlloyFinger/alloy_finger.min.js",
                "~/Content/Theme/global/plugins/jquery-minicolors/jquery.minicolors.min.js",
                "~/Content/Theme/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js",
                "~/Content/Theme/global/plugins/bootstrap-modal/js/bootstrap-modal.js",
                 "~/Content/Theme/global/plugins/counterup/jquery.waypoints.min.js",
                 "~/Content/Theme/global/plugins/counterup/jquery.counterup.min.js",
                "~/Content/Theme/global/plugins/amcharts/amcharts/amcharts.js",
                "~/Content/Theme/global/plugins/amcharts/amcharts/serial.js",
                "~/Content/Theme/global/plugins/amcharts/amcharts/themes/light.js",
                "~/Content/Theme/global/plugins/amcharts/amcharts/pie.js",
                "~/Content/Theme/global/plugins/dhtmlx/gantt/codebase/dhtmlxgantt.js",
                //"~/Content/Theme/global/plugins/kanban/kanban.bundle.js",
                //"~/Content/Theme/global/plugins/kanban/kanban-board.js",
                "~/Content/Theme/global/plugins/jquery.ekchat.js",
                "~/Scripts/shortcut.js",
                "~/Content/Theme/layout/scripts/layout.js",
                "~/Content/Theme/layout/global/scripts/quick-sidebar.js",
                "~/Content/Theme/layout/global/scripts/quick-nav.min.js",
                //"~/Content/ek/login/EasePack.min.js",
                //"~/Content/ek/login/TweenLite.min.js",
                //"~/Content/ek/login/index.js",
                
                "~/Scripts/ping.js",
                "~/Scripts/polyfill.js",
                "~/Scripts/dx.all.js",
                "~/Scripts/ExcelJS.js",
                "~/Scripts/FileSaver.js",
                "~/Scripts/jszip.min.js",
                "~/Scripts/pdfobject.js",
                "~/Scripts/require.js",
                "~/Scripts/quagga.min.js",
                "~/Scripts/signalr.min.js"
                )
            );

            bundles.Add(new ScriptBundle($"~/b/{version}/modernizr").Include("~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle($"~/b/{version}/bootstrap").Include("~/Scripts/bootstrap.js", "~/Scripts/respond.js"));
            bundles.Add(new StyleBundle($"~/b/{version}/css").Include(
                "~/Content/site.css",
                "~/Content/siteXS.css",
                "~/Content/siteSM.css",
                "~/Content/siteMD.css",
                "~/Content/siteXL.css",
                "~/Content/DataTableExtended.css",
                "~/Content/dx.common.css",
                "~/Content/dx.light.css",
                "~/Content/styles.css"
                ));

            /*
                "~/Content/ek/login/animated.css",
                "~/Content/Theme/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css",
                "~/Content/Theme/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css",
                "~/Content/Theme/global/plugins/bootstrap-select/css/bootstrap-select.min.css",
                "~/Content/Theme/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css",
                "~/Content/Theme/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                "~/Content/Theme/global/plugins/select2/css/select2.min.css",
                "~/Content/Theme/global/plugins/select2/css/select2-bootstrap.min.css",
                "~/Content/Theme/global/plugins/typeahead/typeahead.css",
                "~/Content/Theme/global/plugins/jquery-nestable/jquery.nestable.css",
                "~/Content/Theme/global/plugins/jquery-file-upload/css/jquery.fileupload.css",
                "~/Content/Theme/global/plugins/bootstrap-toastr/toastr.min.css",
                "~/Content/Theme/global/plugins/icheck/skins/all.css",
                "~/Content/Theme/global/plugins/jstree/dist/themes/default/style.min.css",
                "~/Content/Theme/global/plugins/bootstrap-sweetalert/sweetalert.css",
                "~/Content/Theme/global/plugins/fullcalendar/fullcalendar.min.css",
                "~/Content/Theme/global/plugins/jquery-minicolors/jquery.minicolors.css",
                "~/Content/Theme/global/plugins/bootstrap-modal/css/bootstrap-modal.css",
                "~/Content/Theme/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css",
                "~/Content/Theme/layout/css/layout.min.css",
                "~/Content/Theme/layout/css/themes/light.min.css",
                "~/Content/Theme/global/plugins/jquery-lightbox/css/lc_lightbox.min.css",
                "~/Content/Theme/global/plugins/jquery-lightbox/skins/dark.css",
                "~/Content/bootstrap.css", 
             */
            //
#if OPTIMIZE
            //BundleTable.EnableOptimizations = true;
#endif
        }
    }
}
