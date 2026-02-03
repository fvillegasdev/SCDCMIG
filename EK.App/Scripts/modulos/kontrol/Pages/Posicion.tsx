namespace EK.Modules.Kontrol.Pages.Posiciones {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("posiciones", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 22 })
                .add({ data: "Padre.Nombre", width: 22 })
                .add({ data: "Categoria.Nombre", width: 16 })
                .add({ data: "Estatus.Nombre", width: 10, render: label.formatBadgePosiciones })
                //.addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusPosicionFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};