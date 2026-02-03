//namespace EK.Modules.SCCO.Pages.TipoObra {
//    "use strict";
//    const config: page.IPageConfig = global.createPageConfig("TipoObra", "scco");

//    export class Vistas extends page.Base {
//        render(): JSX.Element {
//            let ml: any = config.getML();
//            let columns: dt.IDTColumn[] = dt.createColumns(ml)
//                //.addClave({ width: 10 })
//                //.add({ data: "Siglas", width: 20 })
//                //.addDescripcion({ width: 30 })
//                //.add({ data: "DuracionGarantia", width: 10 })
//                //.add({ data: "UsoFalla.Nombre", width: 20 })
//                .addEstatus({ width: 10 })
//                .toArray();

//            return <page.Main {...config} pageMode={PageMode.Principal}>
//                <page.Filters>
//                    <buttons.EstatusFilter />
//                </page.Filters>
//                <dt.PageTable columns={columns} />
//            </page.Main>;
//        };
//    };
//};