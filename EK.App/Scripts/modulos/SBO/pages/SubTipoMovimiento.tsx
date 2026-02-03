
//namespace EK.Modules.SBO.Pages {
//    "use strict";

//    const idForm: string = "subtipomovimiento"

//    interface ISubTipoMovimientoProps extends React.Props<any> {
//        cargaDatos: () => void;
//        setSelected: (item: any) => void;
//        clientesSelected?: any;
//    }

//    export class PageSubTipoMovimiento extends React.Component<ISubTipoMovimientoProps, ISubTipoMovimientoProps> {
//        constructor(props: ISubTipoMovimientoProps) {
//            super(props);

//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        shouldComponentUpdate(nextProps: ISubTipoMovimientoProps, nextState: ISubTipoMovimientoProps): boolean {
//            return false;
//        }

//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            let state: any = EK.Store.getState();
//            this.props.cargaDatos();

//        }

//        render(): JSX.Element {

          


//            let itemsBC: any = [
//                { text: "SBO", link: "/" },
//                { text: "Catálogos", link: "/" },
//                { text: "SubTipo de Movimientos", link: "sbo/subtipomovimiento" }
//            ];

//            let columns: any[] = [
//                { "title": "Clave", "data": "Clave" },
//                { "title": "Descripción", "data": "Descripcion" },
//                { "title": "TM", "data": "TipoMovimiento.Nombre" },
//                { "title": "Naturaleza", "data": "TipoMovimiento.Naturaleza" },
//                { title: "Estatus", data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            // create the page component
//            let page: JSX.Element =
//                <Page id="SBO007" >
//                    <PageBar>
//                        <Breadcrumb data={itemsBC} />
//                    </PageBar>
//                    <Row>
//                        <LeftColumn>
//                            <PageToolbar>
//                                <PageTitle title="Administración de SubTipo de Movimientos" />
//                                <ButtonGroup>
//                                    <ViewButton />
//                                    <NewButton />
//                                </ButtonGroup>
//                                <div id="dtButtons" className="btn-group"></div>
//                            </PageToolbar>
//                            <TableSubTipoMovimiento id="tblTM" columns={columns} onRowSelected={this.onSelectedChanged} />
//                        </LeftColumn>
//                        <RightColumn>
//                            <PortletTab id="PortletSubTiposMovimiento">
//                                <InfoItem />
//                                <History />
//                            </PortletTab>
//                        </RightColumn>
//                    </Row>
//                </Page>;

//            return page;
//        }
//    }

//    //
//    // map props
//    //
//    const tableSubTMMapProps: any = (state: any): any => {
//        return {
//            data: state.subtipomovimiento.SubTipoMovimiento
//        };
//    };

//    const historyTMMapProps: any = (state: any): any =>
//    { return { data: state.subtipomovimiento.history.all }; };

//    const infoItemMapProps: any = (state: any): any =>
//    { return { data: state.subtipomovimiento.selected }; };


//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.subtipomovimiento.selected.data
//            },
//            visible: state.subtipomovimiento.selected.data.ID !== undefined
//        };
//    };

//    //
//    // map dispatchs
//    //
//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("SubTipoMovimiento-setSelected", item);
//            },
//            cargaDatos: (): void => {
//                dispatchAsync("SubTipoMovimiento-catalogo", "subtipomovimiento/GetAll");
//            }
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("sbo/subtipomovimiento/" + info.selected.ID);
//            }
//        }
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.opciones.history.all
//        };
//    };

//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => go("sbo/subtipomovimiento/nuevo")
//        };
//    };
//    // 
//    // connect
//    // 
//    export let SubTipoMovimientoPage: any = ReactRedux.connect(null, mapDispatchs)(PageSubTipoMovimiento);
//    let TableSubTipoMovimiento: any = ReactRedux.connect(tableSubTMMapProps, null)(DataTableExt);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);

//}