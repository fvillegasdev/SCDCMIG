namespace EK.Modules.SCV.Pages.postventa.UbicacionesFalla {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("UbicacionesFalla", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 35 })
                .add({ data: "UsoFalla.Nombre", width: 35 })
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