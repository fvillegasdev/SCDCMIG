namespace EK.Modules.SCV.Pages.Desarrollos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("desarrollos", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Clave", width: 30 })
                .add({ data: "Descripcion", width: 50 })
                //.add({ data: "CentroCosto.Nombre", width: 10 })
                .addEstatus({width: 20 })
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