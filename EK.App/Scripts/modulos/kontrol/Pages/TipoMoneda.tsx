namespace EK.Modules.Kontrol.Pages.Monedas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("monedas", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 10 })
                .add({ width: 10, data: "DecimalDigits" })
                .add({ width: 10, data: "DecimalSeparator" })
                .add({ width: 10, data: "GroupSeparator" })
                .addNombre({ width: 50 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};