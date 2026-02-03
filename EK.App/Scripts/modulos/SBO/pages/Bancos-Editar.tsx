//namespace EK.Modules.SBO.Pages {
//    "use strict";

//    const idForm: string = "bancos";
//    const idPage: string = "";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface IBancosParams {
//        id: number;
//    }

//    interface IBancosProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        Bancos: any;
//        params?: IBancosParams;
//        cargaGlobal?: () => any;
//        history?: any[];
//        global?: any;
//        guardar?: (item: any, strUrl: string) => void;
//        isNew?: boolean;
       
//    }

//    interface IBancosState {
//        viewMode?: boolean;
     
//    }

//    export class ConnectedPageEditarBancos extends React.Component<IBancosProps, IBancosState> {
//        constructor(props: IBancosProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: true };
//        }

//        static defaultProps: IBancosProps = {
//            isNew: false,
//            Bancos: undefined,
//            global: {}
//        };

//        saveForm(item: any): void {
//            let strUrl: string = this.props.isNew ? "bancos/insert" : "bancos/update";
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
//                ReactRouter.hashHistory.push("sbo/Bancos");
//            }
//        }

//        shouldComponentUpdate(nextProps: IBancosProps, nextState: IBancosState): boolean {
//            return (this.props.Bancos.timestamp !== nextProps.Bancos.timestamp)
//                || (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            this.props.cargaGlobal();
         
//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));
//                } else {
//                    dispatchFailed("Bancos-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("Bancos-setSelected", createSuccessfulStoreObject({}));
              
//            }
//        };

//        componentDidUpdate(prevProps: IBancosProps, prevState: IBancosState): any {
//            if (prevProps.Bancos.status === AsyncActionTypeEnum.updating) {
//                if (this.props.Bancos.status === AsyncActionTypeEnum.successful) {
//                    success("El banco ha sido actualizado...");
//                }
//            }
//        }

//        render(): JSX.Element {
//            let Bancos: any = this.props.Bancos.data;
//            // define the breadcrumb element, maybe could be automatically in the future
//            let itemsBC: EK.UX.IBreadcrumbItem[] = [
//                { text: "SBO", link: "/" },
//                { text: "Catálogos", link: "/" },
//                { text: "Bancos", link: "sbo/Bancos" },
//                (this.props.isNew ? { text: "Nuevo", href: "" } : { text: Bancos.Clave, href: "" })
//            ];



//            let pageTitle: string = !this.props.isNew ? Bancos.Descripcion : "Banco";
//            let pageSubtitle: string = !this.props.isNew ? Bancos.Clave : "Nuevo";


//            // create the page component
//            let page: JSX.Element =
//                <Page id="SBO002">
//                    <PageBar>
//                        <Breadcrumb data={itemsBC} />
//                    </PageBar>
//                    <Grid>
//                        <Row>
//                            <LeftPanelUpdate info={this.props.Bancos}>
//                                {!this.props.isNew && this.state.viewMode
//                                    ? <View
//                                        data={Bancos}
//                                        onEditForm={this.editForm} />
//                                    : <Edit
//                                        isNew={this.props.isNew}
//                                        item={Bancos}
//                                        global={this.props.global}
//                                        onCancelEditForm={this.cancelEditForm}
//                                        onSaveForm={this.saveForm}
                                       
//                                    />}
//                            </LeftPanelUpdate>
//                            {!this.props.isNew
//                                ? <RightColumn>
//                                    <PortletTab>
//                                        <InfoItem/>
//                                      <HistoryItemTab data={this.props.history} />
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
//            Bancos: state.bancos.selected,
//            history: state.bancos.history[state.bancos.selected.data.ID],
//            global: {
//                 bancosat: state.global.bsat
//            }
          
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.bancos.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (id: number): void => {
//                dispatchAsync("Bancos-setSelected", "bancos(" + id + ")");
//            },
//            cargaGlobal: (): void => {
//                dispatchAsync("load::bsat", "CatalogosGenerales/GetItems/BANCOSAT");
//                dispatchAsync("load::ESTATUS", "CatalogosGenerales/GetItems/ESTATUS");
//            },
//            guardar: (item: any, strUrl: string): void => {
//                dispatchAsyncPut("Bancos-guardar", strUrl, item);
//            }
//        };
//    };

//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    export let PageBancosCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarBancos);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevoBanco extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PageBancosCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        item?: any;
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

//            let banco: any = item
//                .addNumberConst("ID", this.props.item.ID)
//                .addString("Clave")
//                .addString("Descripcion")
//                .addString("Sucursal")
//                .addString("Direccion")
//                .addString("Telefono1")
//                .addString("ExtTel")
//                .addString("Responsable")
//                .addObject("BancoSAT")
//                .addBoolean("BancoExtranjero")
//                .addString("Swift")
//                .addString("SPEUA")
//                .addObject("Localidad")
//                .addEstatus("Estatus")
//                .toObject();

                
//            this.props.onSaveForm(banco);
//        };

     

//        render(): JSX.Element {
//            let current: any = this.props.item;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let pageTitle: string = !this.props.isNew ? current.Descripcion : "Nuevo Banco";
//            let pageSubtitle: string = !this.props.isNew ? current.Clave : "";
//            let tipoBanco: boolean = this.props.isNew ? false : (current.BancoExtranjero !== "Nacional") ? true : false;;

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
                   
//                    <CheckBoxStatus id="Estatus" value={Status}
//                        xs={{ size: 6, offset: 6 }}
//                        sm={{ size: 4, offset: 8 }}
//                        md={{ size: 4, offset: 8 }}
//                        lg={{ size: 3, offset: 6 }} />
//                    <CheckBox
//                        id="BancoExtranjero"
//                        label="Banco Extranjero"
//                        size={[6, 4, 4, 3]}
//                        required={false}
//                        value={tipoBanco}
//                        helpLabel="Banco Extranjero" />
//                    <Input
//                        id="Clave"
//                        label="Clave"
//                        size={[12, 6, 6, 2]}
//                        helpLabel="Capture la clave del banco"
//                        value={current.Clave}
//                        maxLength={4}
//                        validations={[
//                            validations.required("La clave de banco es requerida")
//                        ]} />
//                    <Input
//                        id="Descripcion"
//                        label="Descripción"
//                        size={[12, 6, 6, 10]}
//                        helpLabel="Capture descripción"
//                        value={current.Descripcion}
//                        maxLength={120}
//                        validations={[
//                            validations.required("La descripción es requerida")
//                        ]} />
//                    <Input
//                        id="Sucursal"
//                        label="Sucursal"
//                        size={[12, 6, 6, 6]}
//                        helpLabel="Capture Sucursal"
//                        value={current.Sucursal}
//                        maxLength={50}
//                        validations={[
//                            validations.required("La sucursal es requerida")
//                        ]} />
//                    <Input
//                        id="Direccion"
//                        label="Dirección"
//                        size={[12, 6, 6,6]}
//                        helpLabel="Capture Dirección"
//                        value={current.Direccion}
//                        maxLength={50}
//                        validations={[
//                            validations.required("La dirección es requerida")
//                        ]} />

//                    <Input
//                        id="Localidad"
//                        label="Localidad"
//                        size={[12, 6, 6, 6]}
//                        helpLabel="Capture Localidad"
//                        value={current.IdLocalidad}
//                        maxLength={50}
//                    />
//                    <DropdownList
//                        id="BancoSAT"
//                        label="BancoSAT"
//                        items={this.props.global.bancosat}
//                        size={[12, 6, 6, 6]}
//                        helpLabel="Cve de Banco en SAT"
//                        required={true}
//                        value={!this.props.isNew ? current.BancoSAT.ID : ""}
//                    />

//                    <Input
//                        id="Responsable"
//                        label="Responsable"
//                        size={[12, 6, 6, 6]}
//                        helpLabel="Capture Responsable"
//                        value={current.Responsable}
//                        maxLength={30}
//                         />
//                    <Input id="Telefono1" label="Teléfono" size={[12, 6, 6, 6]} value={current.Telefono1} mask="(99) 9999-9999" maxLength={10}
//                        validations={[
//                            validations.length("la longitud del teléfono es de 10 posiciones", 10)
//                        ]} />
//                    <Input
//                        id="ExtTel"
//                        label="Extensión Telefónica"
//                        size={[12, 6, 6, 3]}
//                        helpLabel="Capture Extensión"
//                        value={current.ExtTel}
//                        mask="9999"
//                        maxLength={4}
//                    /> 
                      
//                        <PageSection text="Configuración" />
                    
//                    <Input
//                        id="SPEUA"
//                        label="SPEUA"
//                        size={[12, 6, 6, 3]}
//                        helpLabel="Capture SPEUA"
//                        value={current.SPEUA}
//                        maxLength={10}
//                    />
//                    <Input
//                        id="Swift"
//                        label="SWIFT"
//                        size={[12, 6, 6, 3]}
//                        helpLabel="SWIFT"
//                        value={current.Swift}
//                        maxLength={10}
//                    />
                    
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
//            ReactRouter.hashHistory.push("sbo/Bancos");
//        }

//        render(): JSX.Element {
//            let current: any = this.props.data;

//            return <FadeInColumn>
//                <PageToolbar>
//                    <PageTitle title={current.Descripcion} subTitle={current.Banco}>
//                      {EK.UX.Labels.badgeEstatus(current.Estatus)}
//                         {EK.UX.Labels.badgeBloqueado(current.Bloqueado)}
//                    </PageTitle>
//                    <ButtonGroup>
//                        <EditButton onClick={this.props.onEditForm} />
//                        <CancelButton onClick={this.onCancelEditForm} />
//                    </ButtonGroup>
//                </PageToolbar>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label="Clave" value={current.Clave} size={[12, 8, 8, 2]} />
//                    <Label label="Descripción" value={current.Descripcion} size={[12, 8, 8, 8]} />
//                    <Label label="Tipo Banco" value={current.BancoExtranjero} size={[12, 8, 8, 2]} />    
//                    <Label label="Sucursal" value={current.Sucursal} size={[12, 8, 8, 2]} />
//                    <Label label="Dirección" value={current.Direccion} size={[12, 8, 8, 7]} />    
//                    <Label label="Ciudad/Ubicación" value={current.IdLocalidad} size={[12, 8, 8, 3]} />

//                    <Label label="Teléfono" value={current.Telefono1} size={[12, 8, 8, 2]} />
//                    <Label label="Extensión" value={current.ExtTel} size={[12, 8, 8, 2]} />
//                    <Label label="Responsable" value={current.Responsable} size={[12, 8, 8, 5]} />
//                    <Label label="Cve Banco" value={current.BancoSAT.Clave} size={[12, 8, 8, 3]} />
//                    <Label label="Banco SAT" value={current.BancoSAT.Nombre} size={[12, 8, 8, 4]} />
//                    <PageSection text="Configuración" />
                                    
//                    <Label label="SPEUA" value={current.SPEUA} size={[12, 8, 8, 2]} />
//                    <Label label="Código Swift" value={current.Swift} size={[12, 8, 8, 2]} />
                                    
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/



//}