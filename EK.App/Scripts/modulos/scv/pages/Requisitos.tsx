namespace EK.Modules.SCV.Pages.SCVRequisitos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("requisitos", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 10 })
                .addNombre({ width: 30 })
                .add({ data: "TipoRequisito.Nombre", width: 20 })
                .addEstatus({ data: "TieneVencimiento", width: 20 })
                //.add({ data: "TieneVencimiento", width: 10, render: EK.UX.Labels.formatBadgeOk })
                .add({ data: "WorkFlow.Nombre", width: 20 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    }
}