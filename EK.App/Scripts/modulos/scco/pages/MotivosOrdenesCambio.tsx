namespace EK.Modules.SCCO.Pages.MotivosOrdenesCambio {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("MotivosOrdenesCambio", "scco");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .add({ data: "TipoOrdenCambio.Nombre", title: "Tipo Orden de Cambio", width: 30 })
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