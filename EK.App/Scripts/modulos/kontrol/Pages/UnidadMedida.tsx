namespace EK.Modules.Kontrol.Pages.UnidadMedidanm {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("UnidadMedida", "kontrol");

    interface IFiltroUnidadMedida extends page.IProps {
        EstadoEntidad: any;
    };

    export class Vista extends page.Base {

        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/kontrol/unidadMedida/GetBP/GetUnidadMedida", { parametros: f });

        };

        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 15 })
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
    };
};