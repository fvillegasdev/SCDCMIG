namespace EK.Modules.SCCO.Pages.TabuladoresInsumos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("TabuladoresInsumos", "scco");

    export let Vista: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scco/TabuladoresInsumos/allPost", f);
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .add({ data: "Moneda.Nombre", width: "200px" })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });
};