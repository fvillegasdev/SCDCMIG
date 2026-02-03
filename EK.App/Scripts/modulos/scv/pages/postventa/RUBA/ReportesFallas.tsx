//// A '.tsx' file enables JSX support in the TypeScript compiler, 
//// for more information see the following page on the TypeScript wiki:
//// https://github.com/Microsoft/TypeScript/wiki/JSX
//namespace EK.Modules.SCV.Pages.postventa.ReportesFallas {
//    "use strict";
//    const config: page.IPageConfig = global.createPageConfig("ReportesFallas", "scv");
//    const PAGE_ID: string = "ReportesFallas";

//    export const formatEstatusReporte: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
//        let retValue: string = "";

//        if (data && data.Clave) {
//            if (data.Clave === "T") {
//                retValue = "<span class='badge bg-green-jungle bg-font-green-jungle' style='padding: 4px 15px 4px; height: 100%;'>" + data.Nombre + "</span>";
//            } else if (data.Clave === "P") {
//                retValue = "<span class='badge bg-green-jungle bg-font-green-jungle' style='padding: 4px 15px 4px; height: 100%;'>" + data.Nombre + "</span>";
//            } else {
//                retValue = "<span class='badge badge-info' style='padding: 4px 15px 4px; height: 100%;'>" + data.Nombre + "</span>";
//            }
//        }

//        return "<div style='text-align: center;'>" + retValue + "</div>";
//    };

//    export class Vista extends page.Base {
//        render(): JSX.Element {
//            let ml: any = config.getML();
//            let columns: dt.IDTColumn[] = dt.createColumns(ml)
//                .add({ data: "ID", width: 10 })
//                .add({ data: "Ubicacion.ClaveFormato", width: 20 })
//                .add({ data: "Cliente.Nombre", width: 20 })
//                .add({ data: "ResponsableConstruccion.Nombre", width: 20 })
//                .add({ data: "EstatusReporte", width: 10, render: formatEstatusReporte })
//                .add({ data: "Revisado", width: 10, render: EK.UX.Labels.formatBadgeOk })
//                .toArray();

//            return <page.Main {...config} pageMode={PageMode.Principal}>
//                <dt.PageTable columns={columns} />
//            </page.Main>;
//        };
//    };
//}