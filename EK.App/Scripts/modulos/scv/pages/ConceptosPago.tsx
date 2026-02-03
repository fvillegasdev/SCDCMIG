namespace EK.Modules.SCV.Pages.SCVConceptosPago {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("conceptosPago", "scv");

    interface IFiltroConcPago extends page.IProps {
        EstadoEntidad: any;
    }

    export let Vista: any = global.connect(class extends React.Component<IFiltroConcPago, IFiltroConcPago> {

        onFilter(props: any, filters: any, type?: string) {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/conceptosPago/GetBP/GetConceptosPago", { parametros: f });
        }

        constructor(props: IFiltroConcPago) {
            super(props);
        }

        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 50 })
                .add({ data: "TipoConceptoPago.Nombre", width: 20 })
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