//namespace EK.Modules.Kontrol.Pages {
//    "use strict";

//    const idForm: string = "opciones";

//    interface IOpcionesProps extends React.Props<any> {
//        opciones: EK.Store.IAsyncData;
//        setSelected: (item: any) => void;
//        obtenerDatos: (modulo: any) => void;
//        obtenerHistoria: () => void;
//        history?: any;
//        selected?: any;
//        change?: (value: any) => void;
//        modulo?: any;
//    }

//    export class PageOpciones extends React.Component<IOpcionesProps, {}> {
//        constructor(props: IOpcionesProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: IOpcionesProps, nextState: IOpcionesProps): boolean {
//            // check if main data was updated
//            return true;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidUpdate(): any {
//            // load Clients info async, if not loaded or is invalid
//            this.props.obtenerDatos(this.props.modulo);
//            this.props.obtenerHistoria();
//        }

//        render(): JSX.Element {
//            // preserve render props
//            this.state = this.props;

//            // define the breadcrumb element, maybe could be automatically in the future
//            let itemsBC: any = [
//                { text: "EK", link: "/" },
//                { text: "Catálogos Globales", link: "/" },
//                { text: "Opciones", link: "/Opciones" }
//            ];

//            let columns: any[] = [
//                { "title": "ID", "data": "ID" },
//                { "title": "Opción", "data": "Opcion" },
//                { "title": "Permisos", "data": "Permisos" },
//                { "title": "Visible", "data": "EsVisible", render: EK.UX.Labels.formatBadgeVisible}
//            ];

//            // create the page component
//            let page: JSX.Element =
//                <Page id="EK0109">
//                    <PageBar>
//                        <Breadcrumb data={itemsBC} />
//                    </PageBar>
//                    <Grid>
//                        <Row>
//                            <LeftColumn>
//                                <PageToolbar>
//                                    <PageTitle title="Administración de opciones" />
//                                    <ButtonGroup>
//                                        <ViewButton />
//                                        <NewButton />
//                                    </ButtonGroup>
//                                </PageToolbar>
                             
//                                <DataTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                            </LeftColumn>
//                            <RightColumn>
//                                <PortletTab id="portletOpciones">
//                                    <InfoItem />
//                                    <History />
//                                </PortletTab>
//                            </RightColumn>
//                        </Row>
//                    </Grid>
//                </Page>;
//            return page;
//        }
//    }
//     //<ModuloFilter />
//    // state
//    const mapProps: any = (state: any): any => {
//        return {
//            modulo: state.global.modulo
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("opciones-setSelected", item);
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("history-opcion", "opciones/history");
//            },
//            obtenerDatos: (modulo: any): void => {
//                let idmodulo: number = (modulo) ? modulo.data.ID : 0;
//                let key: string = "Opciones/GetAll/" + idmodulo;
//                dispatchAsync("opciones-catalogo", key);
//            },
//        };
//    };

//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.opciones.selected.data
//            },
//            visible: state.opciones.selected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("/Opciones/" + info.selected.ID);
//            }
//        }
//    };

//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("/Opciones/Nuevo");
//            }
//        }
//    };

//    // DataTable 
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.opciones.opciones
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.opciones.selected
//        };
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.opciones.history.all
//        };
//    };

//    // connect page to the Main Store
//    export let OpcionesPage: any = ReactRedux.connect(mapProps, mapDispatchs)(PageOpciones);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, null)(DataTableExt);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//}