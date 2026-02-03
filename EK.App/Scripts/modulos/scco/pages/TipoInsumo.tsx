namespace EK.Modules.SCCO.Pages.TipoInsumo {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("TipoInsumo", "scco");

    interface IFiltroTipoInsumo extends page.IProps {
        EstadoEntidad: any;
    };
    
    export let Vista: any = global.connect(class extends React.Component<IFiltroTipoInsumo, IFiltroTipoInsumo> {
        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scco/tipoInsumo/GetBP/GetTipoInsumo", { parametros: f });

        };
        constructor(props: IFiltroTipoInsumo) {
            super(props);
        }
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .add({ data: "Categoria.Nombre", title: "Categoria", width: 30 })
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
}
