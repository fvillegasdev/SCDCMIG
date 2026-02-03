namespace EK.Modules.SCCO.Pages.Desarrollos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("SCCODesarrollos", "scco");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addDescripcion({ width: 60 })
                .addEstatus({ width: 20 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} allowDelete={false}
                allowEdit={false}
                allowNew={false}
                allowView={true}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};