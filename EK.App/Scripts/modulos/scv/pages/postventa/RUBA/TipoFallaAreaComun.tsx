namespace EK.Modules.SCV.Pages.postventa.RUBA.TipoFallaAreaComun {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("TipoFallaAreaComun", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 10 })
                .add({ data: "Siglas", width: 20 })
                .addDescripcion({ width: 50 })
                .add({ data: "DuracionGarantia", width: 10 })
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