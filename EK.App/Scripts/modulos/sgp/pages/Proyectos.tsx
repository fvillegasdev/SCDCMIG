namespace EK.Modules.SGP.Pages.Proyectos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Proyectos", "sgp");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .addEstatus({ width: 10 })
                .add({ data: "EstatusProyecto.Nombre", width: 20 })
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