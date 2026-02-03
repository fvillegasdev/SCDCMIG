namespace EK.Modules.SCV.Pages.SegmentosVigencia {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("segmentosvigencia", "scv");
    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Segmento.Descripcion", width: 20 })
                .add({ data: "PrecioInicial", width: 10 })
                .add({ data: "PrecioFinal", width: 10 })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};


//namespace EK.Modules.SCV.Pages.SegmentosVigencias {
//    "use strict";
//    const PAGE_ID: string = "segmentosvigencia";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        cargarDatos: () => void;
//        items?: any;
//    }

//    export class PageEditar extends React.Component<IProps, IProps> {
//        constructor(props: IProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: IProps, nextState: IProps): boolean {
//            return true;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            setCurrentEntityType(PAGE_ID);
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                this.props.cargarDatos();
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
//                    data.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00;
//            };

//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.segmentosvigencia];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.segmentodescripcion, data: "Segmento.Descripcion" },
//                { title: $page.consulta.grid.headers.vigencia, data: "Vigencia" , "render": dateFormat },
//                { title: $page.consulta.grid.headers.precioinicial, data: "PrecioInicial", render: CurrencyFormat},
//                { title: $page.consulta.grid.headers.preciofinal, data: "PrecioFinal", render: CurrencyFormat},
//                { title: $page.consulta.grid.headers.estatus, render: EK.UX.Labels.formatBadgeEstatus, data: "Estatus" }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"segmentosvigencias/exportar"} />
//                        <PrintButton linkTo={"segmentosvigencias/imprimir"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    // connect 
//    class PageTable extends React.Component<any, any>{
//        static props: any = (state: any) => ({
//            data: state.segmentosvigencias.catalogo,
//            selectedItem: state.segmentosvigencias.selected.data
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/segmentosvigencia/nuevo")
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
//            info: state.segmentosvigencias.selected,
//            visible: isSuccessful(state.segmentosvigencias.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/segmentosvigencia/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };
//    //
//    class $segmentosVigenciasPage {
//        static props: any = (state: any): any => {
//            return {
//                items: state.segmentosvigencias.catalogo

//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("segmentosvigencias-setSelected", item);
//                setCurrentEntity(item);
//            },
//            cargarDatos: (): any => {
//                dispatchAsync("segmentosvigencias-catalogo", "segmentosvigencias(0,0)");
//            }
//        });
//    };
//    export const Consulta: any = ReactRedux.connect($segmentosVigenciasPage.props, $segmentosVigenciasPage.dispatchs)(PageEditar);
//}