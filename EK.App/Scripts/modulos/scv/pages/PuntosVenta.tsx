namespace EK.Modules.SCV.Pages.PuntosVenta {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("puntosventa", "scv");
    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ data: "Clave", width: 20 })
                .addNombre({ width: 50 })
                .add({ data: "Telefono1", width: 20 })
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