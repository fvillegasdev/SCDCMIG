namespace EK.Modules.SCV.Pages.CampaniaPublicidad {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("campaniasPublicidad", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .add({ data: "MedioPublicidad.Nombre", width: 20 })
                .add({ data: "FechaInicial", width: 10, render: EK.UX.Labels.formatCellDate })
                .add({ data: "FechaFinal", width: 10, render: EK.UX.Labels.formatCellDate })
                .add({ data: "EstadoCampania.Nombre", width: 20 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
}