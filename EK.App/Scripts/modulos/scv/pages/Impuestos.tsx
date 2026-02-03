namespace EK.Modules.SCV.Pages.Impuestos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Impuestos", "scv");

    interface IFiltroImpuestos extends page.IProps {
        EstadoEntidad: any;
    }
    

    export class Vista extends page.Base {

        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/impuestos/GetBP/GetImpuestos", { parametros: f });
        }

        render(): JSX.Element {

            let formatPorcentajeImpuesto: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
               return "<span>" + row.Porcentaje +" %" + "</span>"
            }



            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 15 })
                .addNombre({ width: 30 })
                .add({ data: "Porcentaje", title: "Porcentaje (%)", width: 10, render: formatPorcentajeImpuesto})
                .addEstatus({ data: "RetImp", title: "Retencion de Impuestos", width: 10 })
                .addEstatus({ width: 15})
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>
        }
    }
}