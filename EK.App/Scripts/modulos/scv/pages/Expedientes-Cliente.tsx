//namespace EK.Modules.SCV.Pages.Expedientes {
//    "use strict";
//    const config: page.IPageConfig = global.createPageConfig("expedientes", "scv");
//    let PAGE_ID = "Expedientes";
//    export class Edicion extends page.Base {
//        onFilter(props: page.IProps, filters: any): any {
//            var Ruta = global.getCurrentPath();
//            var IdCliente = Ruta.split('/');
//            let f: any = global.assign({ idCliente: IdCliente[4]});
//            config.dispatchCatalogoBase("/base/kontrol/expedientes/all/", f);
//        };
//        render(): JSX.Element {
//            let ml: any = config.getML();
//            let columns: dt.IDTColumn[] = dt.createColumns(ml)
//                .addID({ width: 10 })
//                .addClave({ width: 10 })
//                .addNombre({ width: 10 })
//                .add({ data: "Cliente.Nombre", width: 30 })
//                .add({ data: "IdProspectacion", width: 10 })
//                .add({ data: "IdVenta", width: 10 })
//                .add({ data: "IdPostVenta", width: 10 })
//                .add({ data: "EstatusExpediente.Nombre", width: 10 })
//                .toArray();
//            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter}>
//                <dt.PageTable columns={columns} />
//                <page.Filters>
//                    <buttons.EstatusFilter />
//                </page.Filters>
//            </page.Main>;
//        };
//    };
//}