//namespace EK.Modules.SCV.Pages.Ventas {
//    "use strict";
//    const config: page.IPageConfig = global.createPageConfig("ventas", "scv");

//    export class Vista extends page.Base {
//        render(): JSX.Element {
//            let ml: any = config.getML();

//            let columns: dt.IDTColumn[] = dt.createColumns(ml)
//                .add({ data: "Cliente.ID", width: 5 })
//                .add({ data: "IdExpediente", width: 10 })
//                .add({ data: "Cliente.Clave", width: 10 })
//                .add({ data: "Cliente.Nombre", width: 20 })
//                .add({ data: "Desarrollo.Nombre", width: 55})
//                .addEstatus({ width: 10 })
//                .toArray();

//            return <page.Main {...config} pageMode={PageMode.Principal}>
//                <dt.PageTable columns={columns} />
//                <page.Filters>
//                    <buttons.EstatusFilter />
//                </page.Filters>
//            </page.Main>;
//        };
//    };
//};