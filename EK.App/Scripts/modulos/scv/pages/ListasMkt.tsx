namespace EK.Modules.SCV.Pages.ListasMkt {
    "use strict";

    const CRITERIOS_ID: string = "Criterios";
    const CLIENTE_ID: string = "ListaCliente";
    const INFORMACION_LISTA: string = "Lista Marketing";
    const INFO_TIPOORIGEN: string = "InfoTipoOrigen";
    const INFO_TOTAL: string = "Total";
    
    const config: page.IPageConfig = global.createPageConfig("ListasMkt", "scv", [CRITERIOS_ID, INFORMACION_LISTA, INFO_TIPOORIGEN, INFO_TOTAL]);
    
    
    export class Vista extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onclick = this.onclick.bind(this);
        };
        onclick(item: any) {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::ListaMkt_Seleccionado", itemFinal);
        };
        componentWillUnmount() {
        }

        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} onRowSelected={this.onclick} />
            </page.Main>;
        };
    }
}