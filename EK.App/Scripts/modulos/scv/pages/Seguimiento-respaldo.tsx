//namespace EK.Modules.SCV.Pages.SeguimientoExpedientes {
//    "use strict";
//    const PAGE_ID: string = "seguimientos"

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: () => void;
//        items?: any;
//    }

//    export class cSeguimientosRespaldo extends React.Component<IProps, IProps>{
//        constructor(props: IProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        static props: any = (state: any): any => {
//            return {
//                items: state.seguimientosReducer.catalogo
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("scv-seguimientos-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (): any => {
//                dispatchAsync("scv-seguimientos-catalogo", "SCV/Seguimientos/GetAll(0)");
//            }
//        });
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
//                this.props.obtenerDatos();
//            };
//        }

//        /* Render */
//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.pd, $bc.scv.seguimientos];


//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.folioVenta, data: "ID" },
//                { title: $page.consulta.grid.headers.esquemaVenta, data: "Fase.IdProspectacion" },
//                { title: $page.consulta.grid.headers.esquemaVenta, data: "Fase.IdVenta" },
//                { title: $page.consulta.grid.headers.esquemaVenta, data: "Fase.IdPostVenta" },
//                { title: $page.consulta.grid.headers.estatusSeguimiento, data: "CANTIDAD_ORDEN_AVANZADA", render: EK.UX.Labels.formatSeguimientoEstatus },

//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"SCV/Seguimientos/Exportar"} />
//                        <PrintButton linkTo={"SCV/Seguimientos/Imprimir"} />
//                        <ViewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    // connect 
//    class PageTable extends React.Component<any, any>{
//        static props: any = (state: any) => ({
//            data: state.seguimientosReducer.catalogo,
//            selectedItem: state.seguimientosReducer.selected.data
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };

//    //
//    class ViewButton extends React.Component<{}, {}> {
//        static props: any = (state: any) => ({
//            info: state.seguimientosReducer.selected,
//            visible: isSuccessful(state.seguimientosReducer.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/seguimientoExpedientes/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };


//    export const ConsultaRespaldo: any = ReactRedux.connect(cSeguimientos.props, cSeguimientos.dispatchs)(cSeguimientos);

//}