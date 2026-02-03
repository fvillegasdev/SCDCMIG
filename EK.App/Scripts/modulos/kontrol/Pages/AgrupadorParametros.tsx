//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "seccionesparametros"//"ENK011";
//    const idForm: string = "secciones";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: () => void;
//        obtenerHistoria: () => void;
//        selected?: any;
//    }

//    export class PageSeccionesParametros extends React.Component<IProps, IProps> {
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
//            let $page: any = $ml[PAGE_ID]; // Cambiar el nombre en opciones PAGE_ID
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.secciones];

//            let columns: any[] = [
//                { "title": $page.consulta.grid.headers.clave, "data": "Clave" },
//                { "title": $page.consulta.grid.headers.nombre, "data": "Nombre" },
//                { "title": $page.consulta.grid.headers.estatus, "data": "Estatus", render: EK.UX.Labels.formatBadgeEstatus }];

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={$page.consulta.title}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"catalogos/exportar(AGRUPADOR)"} />
//                        <PrintButton linkTo={"catalogos/imprimir(AGRUPADOR)"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageInfo>
//                        <InfoItem />
//                    </PageInfo>
//                    <DataTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("secciones-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (): any => {
//                let key: string = "catalogos(agrupador)";
//                dispatchAsync("secciones-catalogo", key);
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("history-secciones", "catalogo(AGRUPADOR)/history");
//            }
//        };
//    };

//    // View Button
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.secciones.selected.data
//            },
//            visible: state.secciones.selected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/parametros/secciones/" + info.selected.ID);
//            }
//        }
//    };

//    // New Button
//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                go("kontrol/parametros/secciones/nuevo");
//            }
//        }
//    };

//    // DataTable 
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.secciones.secciones
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.secciones.selected
//        };
//    };

//    // History
//    const historyUsuariosMapProps: any = (state: any): any => {
//        return {
//            data: state.secciones.history.all
//        };
//    };

//    const inputMapProps: any = (state: any): any => {
//        return {
//            parametro: state.forms.seccionesBuscar.form.Parametro.value
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.secciones.secciones !== undefined)
//            && (state.secciones.secciones.data !== undefined)
//            && (state.secciones.secciones.data.length > 0)
//        };
//    };

//    // Connect 
//    export let SeccionesParametrosPage: any = ReactRedux.connect(null, mapDispatchs)(PageSeccionesParametros);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, null)(DataTableExt);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyUsuariosMapProps, null)(HistoryItemTab);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//}