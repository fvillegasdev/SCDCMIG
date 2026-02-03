namespace EK.Modules.Kontrol.Pages.TipoCitas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tipocitas", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 50 })
                .add({ width: 10, data: "Color", render: EK.UX.Labels.formatColor })
                .addEstatus({ width: 20 })
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