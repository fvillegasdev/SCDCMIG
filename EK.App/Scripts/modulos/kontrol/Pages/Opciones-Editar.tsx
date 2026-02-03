namespace EK.Modules.Kontrol.Pages {
    "use strict";

    const idForm: string = "opciones";
    const idPage: string = "";

    const form: () => EditForm = (): EditForm => {
        return new EditForm(idForm);
    };

    interface IOpcionesParams {
        id: number;
    }

    interface IOpcionesProps extends React.Props<any> {
        cargarDatos?: (id: number) => void;
        opcion: any;
        params?: IOpcionesParams;
        history?: any[];
        global?: any;
        isNew?: boolean;
        parametersSelected?: any;
        guardar?: (item: any, strUrl: string) => void;
        modulo?: any;
    }

    interface IOpcionesState {
        viewMode?: boolean;
    }
    export class ConnectedPageEditarOpciones extends React.Component<IOpcionesProps, IOpcionesState> {
        constructor(props: IOpcionesProps) {
            super(props);
            this.state = { viewMode: true };

            this.editForm = this.editForm.bind(this);
            this.saveForm = this.saveForm.bind(this);
            this.cancelEditForm = this.cancelEditForm.bind(this);
        }

        static defaultProps: IOpcionesProps = {
            opcion: undefined,
            global: {},
            isNew: false
        };

        saveForm(item: any): void {
            let strUrl: string = this.props.isNew ? "opciones/insert" : "opciones/Save";
            this.props.guardar(item, strUrl);
            this.setState({ viewMode: false });
        }

        editForm(): void {
            this.setState({ viewMode: false });
        }

        cancelEditForm(): void {
            if (!this.props.isNew) {
                this.setState({ viewMode: true });
            } else {
                ReactRouter.hashHistory.push("opciones");
            }
        }


        shouldComponentUpdate(nextProps: IOpcionesProps, nextState: IOpcionesState): boolean {
            return (this.props.opcion.timestamp !== nextProps.opcion.timestamp)
                || (this.state.viewMode !== nextState.viewMode);
        }

        componentDidMount(): any {
            requireGlobal(Catalogos.estatus);

            if (!this.props.isNew) {
                if (this.props.params.id) {
                    this.props.cargarDatos(Number(this.props.params.id));
                } else {
                    dispatchFailed("opciones-setSelected", null);
                }
            } else {
                dispatchSuccessful("opciones-setSelected", createSuccessfulStoreObject({}));
            }
        };

        componentDidUpdate(prevProps: IOpcionesProps, prevState: IOpcionesState): any {
            if (prevProps.opcion.status === AsyncActionTypeEnum.updating) {
                if (this.props.opcion.status === AsyncActionTypeEnum.successful) {
                    success("La opción " + this.props.opcion.data.Opcion + " ha sido actualizada...");
                }
            }
        }

        render(): JSX.Element {
            // define the breadcrumb element, maybe could be automatically in the future
            let itemsBC: EK.UX.IBreadcrumbItem[] = [
                { text: "EK", link: "/" },
                { text: "Catálogos Globales", link: "/" },
                { text: "Opciones", link: "/Opciones" },
                { text: "Editar", href: "/Opciones/Editar" }
            ];

            let opcion: any = this.props.opcion.data;
            let status: AsyncActionTypeEnum =
                (!this.props.opcion || !this.props.opcion.status) ? AsyncActionTypeEnum.default : this.props.opcion.status;

            // create the page component
            let page: JSX.Element =
                <Page id="EK0106">
                    <PageBar> <Breadcrumb data={itemsBC} /> </PageBar>
                    <Grid>
                        <Row>
                            <PanelUpdate info={this.props.opcion}>
                                {!this.props.isNew && this.state.viewMode
                                    ? <View
                                        data={opcion}
                                        onEditForm={this.editForm} />
                                    : <Edit
                                        isNew={this.props.isNew}
                                        data={opcion}
                                        onCancelEditForm={this.cancelEditForm}
                                        onSaveForm={this.saveForm}
                                        modulo={this.props.modulo} />}
                            </PanelUpdate>
                        </Row>
                    </Grid>
                    {!this.props.isNew
                        ? <QuickSidebarTab>
                            <HistoryItemTab data={this.props.history} />
                        </QuickSidebarTab>
                        : null}
                </Page>;
            return page;
        }
    }

    const mapProps: any = (state: any): any => {
        return {
            opcion: state.opciones.selected,
            modulo: state.global.modulo,
            history: state.opciones.history[state.opciones.selected.data.ID],
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            cargarDatos: (id: number): void => {
                dispatch(EK.Global.actionAsync({
                    action: "opciones-setSelected",
                    url: "Opciones/GetById/" + id
                }));
                dispatch(EK.Global.actionAsync({
                    action: "history-opcion",
                    url: "History/Entity/Opcion/" + id + "/1000",
                    data: { ID: id }
                }));
            },
            guardar: (item: any, strUrl: string): void => {
                dispatch(actionAsync({
                    action: "opciones-guardar",
                    type: HttpMethod.PUT,
                    url: strUrl,
                    data: item,
                    custom: {
                        processData: false,
                        contentType: false
                    },
                    status: AsyncActionTypeEnum.updating
                }));
            }
        };
    };

    export let PageOpcionesCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarOpciones);

    /*** BEGIN: NEW FORM ***/
    export class NuevaOpcion extends React.Component<{}, {}> {
        render(): JSX.Element {
            return <PageOpcionesCatalogo isNew={true} />
        }
    };
    /*** END: NEW FORM ***/

    /*** BEGIN: EDIT FORM ***/
    interface IEditProps extends React.Props<any> {
        data: any;
        isNew?: boolean;
        onCancelEditForm?: () => any;
        onSaveForm?: (item: any) => any;
        modulo?: any;
    };

    class Edit extends React.Component<IEditProps, IEditProps> {
        constructor(props: IEditProps) {
            super(props);

            this.onSaveFormClick = this.onSaveFormClick.bind(this);
        };

        onSaveFormClick(): void {
            let item: EditForm = form();

            let opcion: any = item
                .addNumberConst("ID", this.props.data.ID)
                .addString("Opcion")
                .addString("Descripcion")
                .addNumber("Permisos")
                .addBoolean("EsVisible")
                .addEstatus("Estatus")
                .addObject("Modulo")
                .toObject();

            this.props.onSaveForm(opcion);
        };

        render(): JSX.Element {
            let current: any = this.props.data;
            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
            let pageTitle: string = !this.props.isNew ? current.Opcion : "Nueva opción";
            let pageSubtitle: string = !this.props.isNew ? current.ID : "";

            let modulo: any = (!this.props.isNew) ? current.Modulo :
                this.props.modulo.data;

            return <FadeInColumn>
                <PageToolbar>
                    <PageTitle title={pageTitle} subTitle={pageSubtitle} />
                    <ButtonGroup>
                        <SaveButton onClick={this.onSaveFormClick} />
                        <CancelButton onClick={this.props.onCancelEditForm} />
                    </ButtonGroup>
                </PageToolbar>
                <Form id={idForm}>
                    <Input id="ID" value={current.ID} label="" visible={false} />
                    <Input id="Permisos" value={4} label="" visible={false} />
                    <Input
                        id="Opcion"
                        label="Opción"
                        size={[12, 12, 12, 10]}
                        required={true}
                        helpLabel="Capture el nombre de la opción"
                        value={current.Opcion}
                        maxLength={300}
                        validations={[
                            validations.required("El nombre de la opción es requerida")
                        ]} />
                    <Input
                        id="Icono"
                        label="Icono"
                        size={[12, 6, 6, 2]}
                        helpLabel="Capture el nombre del Icono"
                        value={current.Icono}
                        maxLength={100} />
                    <Input
                        id="Descripcion"
                        label="Descripción"
                        size={[12, 10, 10, 8]}
                        required={true}
                        helpLabel="Capture la descripción"
                        value={current.Descripcion}
                        maxLength={300}
                        />
                    <CheckBoxStatus
                        id="EsVisible"
                        label="Es Visible"
                        helpLabel="Es visible"
                        value={(current.EsVisible === 1) ? true : false}
                        xs={{ size: 4 }}
                        sm={{ size: 2 }}
                        md={{ size: 2 }}
                        lg={{ size: 2 }}
                        required={false}
                        checkedLabel="Visible"
                        uncheckedLabel="No visible" />
                    <CheckBoxStatus
                        id="Estatus"
                        label="Activo"
                        xs={{ size: 12 }}
                        sm={{ size: 6 }}
                        md={{ size: 6 }}
                        lg={{ size: 2 }}
                        required={false}
                        helpLabel="Estatus de la opción"
                        value={Status} />
                    <Select
                        id={"Modulo"}
                        label={"Módulo"}
                        remoteUrl={"Modulos/Search"}
                        mode={SelectModeEnum.Single}
                        itemFormatter={(index: number, item: any) => { return <h5>{item.Nombre}</h5> } }
                        suggestionFormatter={(item: any) => { return <div>{item.Nombre}</div> } }
                        size={[12, 12, 12, 6]}
                        helpLabel={"Capture el nombre del módulo."}
                        itemLabel={"módulo"}
                        itemValue={"Nombre"}
                        itemKey={"ID"}
                        value={modulo}
                        required={true} />
                </Form>
            </FadeInColumn>;
        };
    }
    /*** END: EDIT FORM ***/

    /*** BEGIN: VIEW FORM ***/
    interface IViewProps extends React.Props<any> {
        data: any;
        onEditForm?: () => any;
    };

    class View extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
            this.onCancelEditForm = this.onCancelEditForm.bind(this);
        }

        onCancelEditForm(): void {
            ReactRouter.hashHistory.push("opciones");
        }

        render(): JSX.Element {
            let current: any = this.props.data;
            let Status: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;

            return <FadeInColumn>
                <PageToolbar>
                    <PageTitle title={current.ID} subTitle={current.Nombre} />
                    {EK.UX.Labels.badgeEstatus(current.Estatus)}
                    <ButtonGroup>
                        <EditButton onClick={this.props.onEditForm} />
                        <CancelButton onClick={this.onCancelEditForm} />
                    </ButtonGroup>
                </PageToolbar>
                <Row style={{ marginBottom: 35 }}>
                    <Label label="Opción" value={current.Opcion} size={[12, 12, 12, 6]} />
                    <Label label="Descripción" value={current.Descripcion} size={[12, 10, 10, 6]} />
                </Row>
            </FadeInColumn>;
        };
    }
    /*** END: VIEW FORM ***/
}