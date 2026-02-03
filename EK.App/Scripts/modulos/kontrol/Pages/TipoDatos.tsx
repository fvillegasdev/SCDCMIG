//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "tiposdatos";
//    const idForm: string = "tipodatos";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: () => void;
//        obtenerHistoria: () => void;
//        selected?: any;
//    }

//    export class PageTipoDatos extends React.Component<IProps, IProps> {
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
//            this.props.obtenerDatos();
//            this.props.obtenerHistoria();
//        }

//        /*  Render */
//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];  ///  
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.tiposdatos];

//            let columns: any[] = [
//                { "title": $page.consulta.grid.headers.clave, "data": "Clave" },
//                { "title": $page.consulta.grid.headers.tipodato, "data": "Nombre" },
//                { "title": $page.consulta.grid.headers.estatus, "data": "Estatus", render: EK.UX.Labels.formatBadgeEstatus }];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={$page.consulta.title}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"catalogos/exportar(TIPODATO)"} />
//                        <PrintButton linkTo={"catalogos/imprimir(TIPODATO)"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageInfo>
//                        <InfoItem />
//                    </PageInfo>
//                    <DataTable id={"tblTipoDatos"} columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("tiposdatos-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (): any => {
//                let key: string = "catalogos(tipodato)";
//                dispatchAsync("tiposdatos-catalogo", key);
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("history-tiposdatos", "catalogo(tipodato)/history");
//            }
//        };
//    };

//    // View Button
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.tiposdatos.selected.data
//            },
//            visible: state.tiposdatos.selected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/tiposdatos/" + info.selected.ID);
//            }
//        }
//    };

//    // New Button
//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {

//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/tiposdatos/nuevo");
//            }
//        }
//    };

//    // DataTable 
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.tiposdatos.tiposdatos
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.tiposdatos.selected
//        };
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.tiposdatos.history.all
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.tiposdatos.tiposdatos !== undefined)
//            && (state.tiposdatos.tiposdatos.data !== undefined)
//            && (state.tiposdatos.tiposdatos.data.length > 0)
//        };
//    };

//    // Connect 
//    export let TipoDatosPage: any = ReactRedux.connect(null, mapDispatchs)(PageTipoDatos);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, null)(DataTableExt);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//}