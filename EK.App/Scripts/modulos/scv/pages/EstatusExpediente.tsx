// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.EstatusExpediente {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("estatusExpediente", "scv");

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters, { clave: config.id });

            config.dispatchCatalogoBase("/base/kontrol/CGValores/all/", f);
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 70 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
}