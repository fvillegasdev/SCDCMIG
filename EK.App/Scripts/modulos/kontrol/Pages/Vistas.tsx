namespace EK.Modules.Kontrol.Pages.Vistas {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("GISVistas", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 30 })
                .addNombre({ width: 30 })
                .add({ data: "SP", width: 30 })
                .add({ data: "Descripcion", width: 30 })
                .add({ data: "Estatus", width: 10, render: label.formatBadgeEB })
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