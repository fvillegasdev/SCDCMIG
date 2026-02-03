//A '.tsx' file enables JSX support in the TypeScript compiler, 
//for more information see the following page on the TypeScript wiki:
//https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.Regimen {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Regimen", "scv");

    interface IFiltroRegimen extends page.IProps {
        EstadoEntidad: any;
    }

    export let Vista: any = global.connect(class extends React.Component<IFiltroRegimen, IFiltroRegimen> {

        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/regimen/GetBP/GetRegimen", { parametros: f });
        }
        constructor(props: IFiltroRegimen)
        {
            super(props);
        }
        render(): JSX.Element {
            let ml: any = config.getML();

            let formatCantidadCompania: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "<span class='badge badge-success'>" + row.Compania.Nombre + "</span>"
            }


            let columnus: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 15 })
                .add({ data: "Nombre", width: 30 })
                //.add({ data: "CantidadCompania", width: 30, render: formatCantidadCompania })
                .addEstatus({ width: 15 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columnus} />
            </page.Main>
        };
    });
};
