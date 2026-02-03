namespace EK.Modules.SCCO.Pages.GrupoInsumo {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("GrupoInsumo", "scco");

    interface IFiltroGrupoInsumo extends page.IProps {
        EstadoEntidad: any;
    }

    export let Vista: any = global.connect(class extends React.Component<IFiltroGrupoInsumo, IFiltroGrupoInsumo> {
        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scco/grupoInsumo/GetBP/GetGrupoInsumo", { parametros: f });
        };
        constructor(props: IFiltroGrupoInsumo) {
            super(props);
        }
        render(): JSX.Element {

            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "TipoInsumo.Nombre", width: 20 })
                .addClave({ width: 10 })
                .addNombre({ width: 20 })
                .add({ data: "InventariadoGrupoInsumo.Nombre", width: 20 })
                .add({ data: "PresupuestoGrupoInsumo.Nombre", width: 20 })

                .add({ data: "ValidaPresupuesto.Nombre", width: 20 })

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
