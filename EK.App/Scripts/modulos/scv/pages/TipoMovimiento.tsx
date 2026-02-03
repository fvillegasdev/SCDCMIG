namespace EK.Modules.SCV.Pages.TipoMovimiento {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("TipoMovimiento", "scv");

    interface IFiltroTipoMovimiento extends page.IProps {
        EstadoEntidad: any;
    }

    export class Vista extends page.Base {
        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/tipoMovimiento/GetBP/GetTipoMovimiento",{ parametros: f });
        }
        render(): JSX.Element {
            let ml: any = config.getML();
            let columnus: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 15 })
                .add({ data: "Nombre", width: 30 })
                .add({ data:"Naturaleza", width: 10, render: EK.UX.Labels.formatNaturaleza })
                //.add({ data: "Naturaleza.Nombre", width: 10 })
                //.add({ data: "Compania.Nombre", width:30 })             
                .addEstatus({ width: 15 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columnus} />
            </page.Main>
        }
    }
}