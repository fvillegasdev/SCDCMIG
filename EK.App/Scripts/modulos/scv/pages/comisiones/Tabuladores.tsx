namespace EK.Modules.SCV.Pages.Tabuladores {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Tabuladores", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Clave", width: 20 })
                .add({ data: "Nombre", width: 30 })
                .add({ data: "Plaza.Nombre", width: 20, title: "Plaza" })
                .add({ data: "Desarrollo.Nombre", width: 20, title: "Desarrollo" })
                .add({ data: "MontoBase", width: 20, title: "Monto base" })
                .addEstatus({width: 30})
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    }
}