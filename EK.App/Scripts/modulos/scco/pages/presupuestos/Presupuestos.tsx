namespace EK.Modules.SCCO.Pages.Presupuestos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Presupuestos", "scco");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .add({ data: "Obra.Nombre", width: 30 })
                .add({ data: "Tabulador.Nombre", width: 30 })
                .add({ data: "TipoPresupuesto.Nombre", width: 30 })
                .add({ data: "EstatusPresupuesto.Nombre", width: 30 })
                .addEstatus({ width: 20 })
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