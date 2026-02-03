
//namespace EK.Modules.SBO.Pages {
//    "use strict";
//    const PAGE_ID: string = "SBO004";
//    const SECTION_ID: string = "SBO004$CL";
//    const idForm: string = "tipomovimiento"

//    interface ITipoMovimientoProps extends React.Props<any> {
//        cargaDatos: () => void;
//        setSelected: (item: any) => void;

//    }

//    export class PageTipoMovimiento extends React.Component<ITipoMovimientoProps, ITipoMovimientoProps> {
//        constructor(props: ITipoMovimientoProps) {
//            super(props);

//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        shouldComponentUpdate(nextProps: ITipoMovimientoProps, nextState: ITipoMovimientoProps): boolean {
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
//                { text: "Tipo de Movimientos", link: "sbo/TipoMovimiento" }
//            ];

//            let columns: any[] = [
//                { "title": "Clave", "data": "Clave" },
//                { "title": "Naturaleza", "data": "Naturaleza" },
//                { "title": "Descripción", "data": "Descripcion" },
//                { "title": "Usa Sub Tipo", "data": "UsaSubTipo" },
//                { title: "Estatus", data: "Estatus", render: EK.UX.Labels.formatBadgeEC }
//            ];

         
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title="Administración de Tipos de Movimientos" breadcrumb={itemsBC}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"TipoMovimiento/Exportar"} />
//                        <PrintButton linkTo="bancos/imprimir" />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageInfo>
//                        <InfoItem />
//                    </PageInfo>
//                    <PageFilter>
//                        <CollapsePanel id={"idFilterClasificador"} title={"Clasificadores"} ref="Clasificador">
//                            <FiltrosClasificadorItemTab claveEntidad={EK.Global.ClaveCatalogos.TM} />
//                        </CollapsePanel>
//                    </PageFilter>
//                    <TableTipoMovimiento id="tblTM" columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;

//            return page;

//        }
//    }
  
//    const tableTMMapProps: any = (state: any): any => {
//        return {
//            data: state.tipomovimiento.tipomovimiento
//        };
//    };

//    const historyTMMapProps: any = (state: any): any =>
//    { return { data: state.tipomovimiento.history.all }; };

//    const infoItemMapProps: any = (state: any): any =>
//    { return { data: state.tipomovimiento.selected }; };


//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.tipomovimiento.selected.data
//            },
//            visible: state.tipomovimiento.selected.data.ID !== undefined
//        };
//    };

//    //
//    // map dispatchs
//    //
//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchSuccessful("TipoMovimiento-setSelected", item);
//            },
//            cargaDatos: (): void => {
//                dispatchAsync("TipoMovimiento-catalogo", "TipoMovimiento/GetAll");
//            }
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("sbo/TipoMovimiento/" + info.selected.ID);
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
//            onClick: (info: any): void => go("sbo/TipoMovimiento/Nuevo")
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.tipomovimiento.tipomovimiento !== undefined)
//            && (state.tipomovimiento.tipomovimiento.data !== undefined)
//            && (state.tipomovimiento.tipomovimiento.data.length > 0)
//        };
//    };

//    // 
//    // connect
//    // 
//    export let TipoMovimientoPage: any = ReactRedux.connect(null, mapDispatchs)(PageTipoMovimiento);
//    let TableTipoMovimiento: any = ReactRedux.connect(tableTMMapProps, null)(DataTableExt);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let FiltrosClasificador: any = ReactRedux.connect(null, null)(FiltrosClasificadorItemTab);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);

//    /*** BEGIN: CLASIFICADORES FORM ***/
//    interface IClasificadoresProps extends React.Props<any> {
//        data?: any;
//        entidad?: { ID: number };
//        claveEntidad?: string;
//    };

//    class ClasificadoresForm extends React.Component<IClasificadoresProps, IClasificadoresProps> {
//        constructor(props: IClasificadoresProps) {
//            super(props);

//            this.onCancelEditForm = this.onCancelEditForm.bind(this);
//            this.onSaveForm = this.onSaveForm.bind(this);
//        }

//        onCancelEditForm(): void {
//            ReactRouter.hashHistory.goBack();
//        }

//        onSaveForm(): void {
//            ReactRouter.hashHistory.goBack();
//        }

//        render(): JSX.Element {
//            let itemsBC: EK.UX.IBreadcrumbItem[] = [
//                { text: "EK", link: "/" },
//                { text: "Catálogos Globales", link: "/" },
//                { text: "Tipo de Movimiento", link: "/sbo/tipomovimiento" },
//                { text: "Clasificadores", href: null }
//            ];

//            let entidad: any = this.props.entidad;
//            let current: any = entidad.data;

//            let estatus: boolean = false;
//            if (entidad.Clave) {
//                estatus = EK.Global.getGlobal(Catalogos.estatus).isActive(entidad.Estatus);
//            }

//            // create the page component
//            let page: JSX.Element =
//                <Page id={SECTION_ID}>
//                    <PageBar>
//                        <Breadcrumb data={itemsBC} />
//                    </PageBar>
//                    <Grid>
//                        <Row>
//                            <LeftPanelUpdate info={entidad}>
//                                <PageToolbar>
//                                    <PageTitle title={current.Descripcion} subTitle={current.Clave} >
//                                        {EK.UX.Labels.badgeEstatus(current.Estatus)}
//                                    </PageTitle>
//                                    <ButtonGroup>
//                                        <Clasificadores$SaveButton />
//                                        <CancelButton onClick={this.onCancelEditForm} />
//                                    </ButtonGroup>
//                                    <div id="dtButtons" className="btn-group"></div>
//                                </PageToolbar>
//                                <Row style={{ marginBottom: 35 }}>
//                                    <Label label="Clave" value={current.Clave} size={[6, 6, 2, 2]} />
//                                    <Label label="Naturaleza" value={current.Naturaleza} size={[6, 6, 2, 2]} />
//                                    <Label label="Descripcion" value={current.Descripcion} size={[12, 12, 8, 8]} />
//                                    <ClasificadoresSection id={SECTION_ID} claveEntidad={EK.Global.ClaveCatalogos.TM} item={current} />
//                                </Row>
//                            </LeftPanelUpdate>
//                            <RightColumn>
//                                <PortletTab>
//                                    <HistoryItemTab data={null} />
//                                </PortletTab>
//                            </RightColumn>
//                        </Row>
//                    </Grid>
//                </Page>;

//            return page;
//        };
//    }

//    const mapClasificadoresProps: any = (state: any): any => {
//        return {
//            entidad: state.tipomovimiento.selected,
//            claveEntidad: EK.Global.ClaveCatalogos.TM
//        };
//    };

//    const titleActionMapProps: any = (state: any): any => {
//        return {
//            title: state.tipomovimiento && state.tipomovimiento.selected && state.tipomovimiento.selected.data
//                ? state.tipomovimiento.selected.data.Descripcion : null
//        };
//    };

//    const actionMapProps: any = (state: any): any => {
//        return {
//            sectionId: SECTION_ID,
//            item: state.tipomovimiento.selected
//        };
//    };

//    export let TM$Clasificadores: any = ReactRedux.connect(mapClasificadoresProps, null)(ClasificadoresForm);
//    //export let TM$Clasificadores$Action: any = ReactRedux.connect(actionMapProps, null)(EK.UX.Tabs.AccionSectionItem);
//    //export let TM$Clasificadores$TitleAction: any = ReactRedux.connect(titleActionMapProps, null)(EK.UX.Tabs.AccionTitleItem);

//    /*** END: CLASIFICADORES FORM ***/
//}