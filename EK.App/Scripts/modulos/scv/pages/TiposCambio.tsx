//A '.tsx' file enables JSX support in the TypeScript compiler, 
//for more information see the following page on the TypeScript wiki:
//https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.TiposCambio {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tiposcambio", "scv"); 

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "MonedaOrigen.Clave", width: 10 })
                .add({ data: "MonedaOrigen.Nombre", width: 15 })
                .add({ data: "MonedaDestino.Clave", width: 10 })
                .add({ data: "MonedaDestino.Nombre", width: 15 })
                .addDate({ data: "Fecha", width: 15 })
                .addDate({ data: "FechaHasta", width: 15 })
                .add({ data: "Valor", width: 10 })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;

        }
    }
}


//namespace EK.Modules.SCV.Pages.TiposCambio {
//    "use strict";
//    const PAGE_ID: string = "tiposcambio";

//    interface ITiposCambioProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerCatalogo: () => void;
//        items?: any;
//    }

//    export class PageTiposCambio extends React.Component<ITiposCambioProps, ITiposCambioProps> {
//        constructor(props: ITiposCambioProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: ITiposCambioProps, nextState: ITiposCambioProps): boolean {
//            return true;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            setCurrentEntityType(PAGE_ID);
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                this.props.obtenerCatalogo();
//            };
//        }

//        /*  Render */
//        render(): JSX.Element {
//            let dateFormat: (data: Date, type: any, row: any) => string = (data: any, type: any, row: any) => {
//                var pad: string = "00";
//                return (data !== undefined || data !== null) ?
//                    (pad + data.getDate().toString()).slice(-pad.length) + "/" +
//                    (pad + (data.getMonth() + 1).toString()).slice(-pad.length) + "/" +
//                    data.getFullYear() : "";
//            };

//            let CurrencyFormat: (data: Date, type: any, row: any) => string = (data: any, type: any, row: any) => {
//                return (data !== undefined || data !== null) ?
//                    data.toLocaleString(undefined, { minimumFractionDigits: 4 }) : 0.0000;
//            };


//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;

//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.tiposcambio];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.monedaclave, data: "Moneda.Clave" },
//                { title: $page.consulta.grid.headers.monedanombre, data: "Moneda.Nombre" },
//                { title: $page.consulta.grid.headers.monedaclavedestino, data: "MonedaDestino.Clave" },
//                { title: $page.consulta.grid.headers.monedanombredestino, data: "MonedaDestino.Nombre" },
//                { title: $page.consulta.grid.headers.fecha, data: "Fecha", render: dateFormat },
//                { title: $page.consulta.grid.headers.fechahasta, data: "FechaHasta", render: dateFormat },
//                { title: $page.consulta.grid.headers.tipocambio, data: "Valor", render: EK.UX.Labels.formatCurrency },
//                { title: $page.consulta.grid.headers.status, data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"TiposCambio/exportar"} />
//                        <PrintButton linkTo={"TiposCambio/Imprimir"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;

//            //<PageInfo><InfoItem /></PageInfo>
//            return page;
//        }
//    }

//    class $tiposcambioPage {
//        static props: any = (state: any): any => {
//            return {
//                selected: state.TiposCambioReducer.selected,
//                items: state.TiposCambioReducer.catalogo
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("tiposcambio-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("tiposcambio-catalogo", "tiposcambio(0)");
//            }
//        });
//    }

//    export const Consulta: any =
//        ReactRedux.connect($tiposcambioPage.props, $tiposcambioPage.dispatchs)(PageTiposCambio);

//    // connect 
//    class PageTable extends React.Component<any, any>{
//        static props: any = (state: any) => ({
//            data: state.TiposCambioReducer.catalogo
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/kontrol/tiposcambio/nuevo")
//        });

//        component: any =
//        ReactRedux.connect(null, NewButton.dispatchs)(EK.UX.Buttons.NewButton);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class ViewButton extends React.Component<{}, {}> {
//        static props: any = (state: any) => ({
//            info: state.TiposCambioReducer.selected,
//            visible: isSuccessful(state.TiposCambioReducer.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/kontrol/tiposcambio/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };

//}