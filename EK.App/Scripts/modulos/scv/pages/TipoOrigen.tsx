namespace EK.Modules.SCV.Pages.Origen {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Origen", "scv");

    interface IFiltroTipoOrigen extends page.IProps
    {
        EstadoEntidad: any;
    }

    export let Vista: any = global.connect(class extends React.Component<IFiltroTipoOrigen, IFiltroTipoOrigen> {

        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/origen/GetBP/GetTipoOrigen", { parametros: f });
        }

        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
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