//namespace EK.Modules.SBO.Pages {
//    "use strict";
//    const PAGE_ID = "SBO004";
//    const idForm: string = "tipomovimiento";
//    const idPage: string = "";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface ITipoMovimientoParams {
//        id: number;
//    }

//    interface ITipoMovimientoProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        TipoMovimiento: any;
//        params?: ITipoMovimientoParams;
//        history?: any[];
//        global?: any;
//        guardar?: (item: any, strUrl: string) => void;
//        isNew?: boolean;
//    }

//    interface ITipoMovimientoState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarTM extends React.Component<ITipoMovimientoProps, ITipoMovimientoState> {
//        constructor(props: ITipoMovimientoProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: true };
//        }

//        static defaultProps: ITipoMovimientoProps = {
//            isNew: false,
//            TipoMovimiento: undefined,
//            global: {}
//        };

//        saveForm(item: any): void {
//            let strUrl: string = this.props.isNew ? "tipomovimiento/insert" : "tipomovimiento/update";
//            this.props.guardar(item, strUrl);
//            this.setState({ viewMode: false });
//        }

//        editForm(): void {
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//            if (!this.props.isNew) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.push("sbo/TipoMovimiento");
//            }
//        }

//        shouldComponentUpdate(nextProps: ITipoMovimientoProps, nextState: ITipoMovimientoState): boolean {
//            return (this.props.TipoMovimiento.timestamp !== nextProps.TipoMovimiento.timestamp)
//                || (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {

//            requireGlobal(Catalogos.estatus);

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));
//                } else {
//                    dispatchFailed("TipoMovimiento-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("TipoMovimiento-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

        

//        render(): JSX.Element {
//           let TipoMovimiento: any = this.props.TipoMovimiento.data;
//            // define the breadcrumb element, maybe could be automatically in the future
//            let itemsBC: EK.UX.IBreadcrumbItem[] = [
//                { text: "SBO", link: "/" },
//                { text: "Catálogos", link: "/" },
//                { text: "Tipo de Movimiento", link: "sbo/TipoMovimiento" },
//                (this.props.isNew ? { text: "Nuevo", href: "" } : { text: TipoMovimiento.Clave, href: "" })
//            ];

//            let pageTitle: string = !this.props.isNew ? TipoMovimiento.Descripcion : "TipoMovimiento";
//            let pageSubtitle: string = !this.props.isNew ? TipoMovimiento.Clave : "Nuevo";

          
//            // create the page component
//            let page: JSX.Element =
//                <Page id={PAGE_ID}>
//                    <PageBar>
//                        <Breadcrumb data={itemsBC} />
//                    </PageBar>
//                    <Grid>
//                        <Row>
//                            <LeftPanelUpdate info={this.props.TipoMovimiento}>
//                                {!this.props.isNew && this.state.viewMode
//                                    ? <View
//                                        data={TipoMovimiento}
//                                        onEditForm={this.editForm} />
//                                    : <Edit
//                                        isNew={this.props.isNew}
//                                        data={TipoMovimiento}
//                                        onCancelEditForm={this.cancelEditForm}
//                                        onSaveForm={this.saveForm} />}
//                            </LeftPanelUpdate>
//                            {!this.props.isNew
//                                ? <RightColumn>
//                                    <PortletTab>
//                                        <HistoryItemTab data={this.props.history} />
//                                    </PortletTab>
//                                </RightColumn>
//                                : null}
//                        </Row>
//                    </Grid>
//                </Page>;
//            return page;
//        }
//    }
//    //<AccionesItemTab data={"Sub TM"} />
//    const mapProps: any = (state: any): any => {
//        return {
//            TipoMovimiento: state.tipomovimiento.selected
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.tipomovimiento.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (id: number): void => {
//               // dispatch(EK.Global.actionAsync({
//               //     action: "TipoMovimiento-setSelected",
//               //     url: "TipoMovimiento/GetById/" + id 
//              //  }))
//               dispatchAsync("TipoMovimiento-setSelected", "tipomovimiento(" + id + ")");
//            },
//            guardar: (item: any, strUrl: string): void => {
//                dispatch(actionAsync({
//                    action: "TipoMovimiento-guardar",
//                    type: HttpMethod.PUT,
//                    url: strUrl,
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            }
//        };
//    };

//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    export let PageTipoMovimientoCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarTM);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevoTipoMovimiento extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PageTipoMovimientoCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        data?: any;
//        isNew?: boolean;
//        onCancelEditForm?: () => any;
//        onSaveForm?: (item: any) => any;
//    };
 
//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
//            this.onSaveFormClick = this.onSaveFormClick.bind(this);
            
//        };
//        onSaveFormClick(): void {
//            let item: EditForm = form();

//            let tipomovimiento: any = item
//                .addNumberConst("ID", !this.props.isNew ? this.props.data.ID : 0)
//                .addString("Clave")
//                .addString("Naturaleza")
//                .addString("Descripcion")
//                .addBoolean("UsaSubTipo")
//                .addEstatus("Estatus")
//                .toObject();

//            this.props.onSaveForm(tipomovimiento);
//        };

//        render(): JSX.Element {
//            let current: any = this.props.data;
//            let SubTipo: boolean = this.props.isNew ? false : current.UsaSubTipo === "1"? true: false;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let pageTitle: string = !this.props.isNew ? current.Descripcion : "Nuevo Tipo Movimiento";

//            let pageSubtitle: string = !this.props.isNew ? current.Clave : "";
                   
//            return <FadeInColumn>
//                <PageToolbar>
//                    <PageTitle title={pageTitle} subTitle={pageSubtitle}>
                        
//                    </PageTitle>
//                    <ButtonGroup>
//                        <SaveButton onClick={this.onSaveFormClick} />
//                        <CancelButton onClick={this.props.onCancelEditForm} />
//                    </ButtonGroup>
//                </PageToolbar>
//                <Form id={idForm}>
//                    <Input id="ID" value={current.ID} label="" visible={false} />
//                    <Input
//                        id="Naturaleza"
//                        label="Naturaleza"
//                        size={[12, 6, 6, 3]}
//                        helpLabel=""
//                        value={current.Naturaleza}
//                        maxLength={10}
//                    />
//                    <Input
//                            id="Clave"
//                            label="Clave"
//                            size={[12, 6, 6, 2]}
//                            helpLabel="Capture clave"
//                            value={current.Clave}
//                            maxLength={4}
//                            validations={[
//                                validations.required("La clave es requerida")
//                            ]} />
                     
//                        <CheckBox
//                        id="UsaSubTipo"
//                            label="Sub Tipo Movimiento"
//                            size={[12, 6, 6, 4]}
//                            required={false}
//                            value={SubTipo}
//                            helpLabel="Usa Sub Tipo Movimiento" />
//                        <CheckBoxStatus
//                            id="Estatus"
//                            label="Activo"
//                            xs={{ size: 12 }}
//                            sm={{ size: 6 }}
//                            md={{ size: 6 }}
//                            lg={{ size: 2 }} 
//                            helpLabel="Estatus de TM"
//                            value={Status} />
//                        <Input
//                            id="Descripcion"
//                            label="Descripcion"
//                            size={[12, 5, 5, 11]}
//                            helpLabel="Capture la descripción del Tipo de Movimiento"
//                            value={current.Descripcion}
//                            maxLength={150} />
//                </Form>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IViewProps extends React.Props<any> {
//        data: any;
//        onEditForm?: () => any;

//    };

//    class View extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//            this.onCancelEditForm = this.onCancelEditForm.bind(this);
//        }

//        onCancelEditForm(): void {
//            ReactRouter.hashHistory.push("sbo/TipoMovimiento");
//        }

//        render(): JSX.Element {
//            let current: any = this.props.data;
//            let SubTipo: any = current.UsaSubTipo ===  "1" ? "S" : "N";

         
//            return <FadeInColumn>
//                <PageToolbar>
//                    <PageTitle title={current.Descripcion} subTitle={current.Clave} >
//                        {EK.UX.Labels.badgeEstatus(current.Estatus)}
//                    </PageTitle>
//                    <ButtonGroup>
//                        <EditButton onClick={this.props.onEditForm} />
//                        <CancelButton onClick={this.onCancelEditForm} />
//                    </ButtonGroup>
//                </PageToolbar>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label="Naturaleza" value={current.Naturaleza} size={[12, 2, 2, 2]} />
//                    <Label label="Clave" value={current.Clave} size={[12, 12, 12, 2]} />
//                    <Label label="Usa Sub TM" value={SubTipo} size={[12, 2, 2, 2]} />
//                    <Label label="Descripcion" value={current.Descripcion} size={[12, 10, 10, 10]} />
                    
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}