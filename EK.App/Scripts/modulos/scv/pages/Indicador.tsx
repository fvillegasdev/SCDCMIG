namespace EK.Modules.SCV.Pages.Indicador {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Indicadores", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Clave", width: 20 })
                .add({ data: "Nombre", width: 30 })
                .addEstatus({ width: 30 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    }
}