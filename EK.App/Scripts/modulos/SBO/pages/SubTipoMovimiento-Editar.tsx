//namespace EK.Modules.SBO.Pages {
//    "use strict";

//    const idForm: string = "subtipomovimiento";
//    const idPage: string = "";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface ISubTipoMovimientoParams {
//        id: number;
//    }

//    interface ISubTipoMovimientoProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        SubTipoMovimiento: any;
//        params?: ISubTipoMovimientoParams;
//        history?: any[];
//        global?: any;
//        guardar?: (item: any, strUrl: string) => void;
//        isNew?: boolean;
//        cargaGlobal?: () => any;
      
//    }

//    interface ISubTipoMovimientoState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarSTM extends React.Component<ISubTipoMovimientoProps, ISubTipoMovimientoState> {
//        constructor(props: ISubTipoMovimientoProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: true };
//        }

//        static defaultProps: ISubTipoMovimientoProps = {
//            isNew: false,
//            SubTipoMovimiento: undefined,
//            global: {}
//        };

//        saveForm(item: any): void {
//            let strUrl: string = this.props.isNew ? "subtipomovimiento/insert" : "subtipomovimiento/update";
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
//                ReactRouter.hashHistory.push("sbo/subtipomovimiento");
//            }
//        }

//        shouldComponentUpdate(nextProps: ISubTipoMovimientoProps, nextState: ISubTipoMovimientoState): boolean {
//            return (this.props.SubTipoMovimiento.timestamp !== nextProps.SubTipoMovimiento.timestamp)
//                || (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {

//            requireGlobal(Catalogos.estatus);
//            this.props.cargaGlobal();

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));
                    
//                } else {
//                    dispatchFailed("SubTipoMovimiento-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("SubTipoMovimiento-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

        
//        componentDidUpdate(prevProps: ISubTipoMovimientoProps, prevState: ISubTipoMovimientoState): any {
//            if (prevProps.SubTipoMovimiento.status === AsyncActionTypeEnum.updating) {
//                if (this.props.SubTipoMovimiento.status === AsyncActionTypeEnum.successful) {
//                    success("El SubTipo Movimiento " + this.props.SubTipoMovimiento.data.Nombre + " ha sido actualizado...");
//                }
//            }
//        }
//        render(): JSX.Element {
//            let SubTipoMovimiento: any = this.props.SubTipoMovimiento.data;
//            // define the breadcrumb element, maybe could be automatically in the future
//            let itemsBC: EK.UX.IBreadcrumbItem[] = [
//                { text: "SBO", link: "/" },
//                { text: "Catálogos", link: "/" },
//                { text: "Subtipo de Movimiento", link: "sbo/subtipomovimiento" },
//                (this.props.isNew ? { text: "Nuevo", href: "" } : { text: SubTipoMovimiento.Clave, href: "" })
//            ];

            

//            let pageTitle: string = !this.props.isNew ? SubTipoMovimiento.Descripcion : "Subtipo Movimiento";
//            let pageSubtitle: string = !this.props.isNew ? SubTipoMovimiento.Clave : "Nuevo";

          
//            // create the page component
//            let page: JSX.Element =
//                <Page id="SBO007">
//                    <PageBar>
//                        <Breadcrumb data={itemsBC} />
//                    </PageBar>
//                    <Grid>
//                        <Row>
//                            <LeftPanelUpdate info={this.props.SubTipoMovimiento}>
//                                {!this.props.isNew && this.state.viewMode
//                                    ? <View
//                                        data={SubTipoMovimiento}
//                                        onEditForm={this.editForm} />
//                                    : <Edit
//                                        isNew={this.props.isNew}
//                                        data={SubTipoMovimiento}
//                                        global={this.props.global}
//                                        onCancelEditForm={this.cancelEditForm}
//                                        onSaveForm={this.saveForm}
                                        
//                                        />}
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

//    const mapProps: any = (state: any): any => {
//        return {
//            SubTipoMovimiento: state.subtipomovimiento.selected,
//            global: {
//                cattipomov: state.global.CatTM
//            }
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (id: number): void => {
//               // dispatch(EK.Global.actionAsync({
//               //     action: "TipoMovimiento-setSelected",
//               //     url: "TipoMovimiento/GetById/" + id 
//              //  }))
//                dispatchAsync("SubTipoMovimiento-setSelected", "subtipomovimiento(" + id + ")");
//            },
//            cargaGlobal: (): void => {
//                dispatchAsync("load::CatTM", "tipomovimiento/GetTipoMovimientoxSub");
//                dispatchAsync("load::ESTATUS", "CatalogosGenerales/GetItems/ESTATUS");
//            },
//            guardar: (item: any, strUrl: string): void => {
//                dispatchAsyncPut("SubTipoMovimiento-guardar", strUrl, item);
//            }
//        };
//    };

//    export let PageSTipoMovimientoCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarSTM);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevoSTipoMovimiento extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PageSTipoMovimientoCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        data?: any;
//        isNew?: boolean;
//        global?: any;
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

//            let subtm: any = item
//                .addNumberConst("ID", !this.props.isNew ? this.props.data.ID : 0)
//                .addString("Clave")
//                .addString("Descripcion")
//                .addEstatus("Estatus")
//                .addObject("TipoMovimiento")
//                .toObject();

//            this.props.onSaveForm(subtm);
//        };

//        render(): JSX.Element {
//            let current: any = this.props.data;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let pageTitle: string = !this.props.isNew ? current.Descripcion : "Nuevo Subtipo Movimiento";

//            let pageSubtitle: string = !this.props.isNew ? current.Clave : "";

            
//            return <FadeInColumn>
//                <PageToolbar>
//                    <PageTitle title={pageTitle} subTitle={pageSubtitle} />
//                    <ButtonGroup>
//                        <SaveButton onClick={this.onSaveFormClick} />
//                        <CancelButton onClick={this.props.onCancelEditForm} />
//                    </ButtonGroup>
//                </PageToolbar>
//                <Form id={idForm} ref="form">
//                    <Input id="ID" value={current.ID} label="" visible={false} />
                    
//                    <Input
//                            id="Clave"
//                            label="Clave"
//                            size={[12, 12, 12, 2]}
//                            helpLabel="Capture clave"
//                            value={current.Clave}
//                            maxLength={4}
//                            validations={[
//                                validations.required("La clave es requerida")
//                            ]} />
//                    <Input
//                        id="Descripcion"
//                        label="Descripcion"
//                        size={[12, 12, 12, 8]}
//                        helpLabel="Capture la descripción del Subtipo de Movimiento"
//                        value={current.Descripcion}
//                        maxLength={150} />
//                    <CheckBoxStatus
//                        id="Estatus"
//                        label="Activo"
//                        xs={{ size: 12 }}
//                        sm={{ size: 12 }}
//                        md={{ size: 12 }}
//                        lg={{ size: 2 }}
//                        helpLabel="Estatus de TM"
//                        value={Status} />
//                    <DropdownList
//                        id="TipoMovimiento"
//                        label="Tipo Movimiento"
//                        items={this.props.global.cattipomov}
//                        size={[12, 6, 6, 5]}
//                        helpLabel="Seleccione el TM"
//                        required={true}
//                        itemValue ="Descripcion"
//                        itemKey = "ID"
//                        value={!this.props.isNew ? current.TipoMovimiento.ID : ""}
//                       />
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
//            ReactRouter.hashHistory.push("sbo/subtipomovimiento");
//        }

//        render(): JSX.Element {
//            let current: any = this.props.data;
            
//            return <FadeInColumn>
//                <PageToolbar>
//                    <PageTitle title={current.Descripcion} subTitle={current.Clave}>
//                        {EK.UX.Labels.badgeEstatus(current.Estatus)}
//                    </PageTitle>
//                    <ButtonGroup>
//                        <EditButton onClick={this.props.onEditForm} />
//                        <CancelButton onClick={this.onCancelEditForm} />
//                    </ButtonGroup>
//                </PageToolbar>
//                <Row style={{ marginBottom: 35 }}>
                    
//                    <Label label="Clave" value={current.Clave} size={[12, 12, 12, 2]} />
//                    <Label label="Descripcion" value={current.Descripcion} size={[12, 10, 10, 10]} />
//                    <Label label="Clave" value={current.TipoMovimiento.Clave} size={[12, 10, 10, 2]} />
//                    <Label label="Tipo Movimiento" value={current.TipoMovimiento.Nombre} size={[12, 10, 10, 8]} />
//                    <Label label="Naturaleza" value={current.TipoMovimiento.Naturaleza} size={[12, 10, 10, 2]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
  

 
//}