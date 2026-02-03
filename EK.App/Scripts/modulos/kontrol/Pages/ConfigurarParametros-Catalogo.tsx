//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "configurarparametros";
//    const idForm: string = "configurarparametro";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        obtenerDatos?: (id: number) => void;
//        configurarparametro: any;
//        params?: IParams;
//        history?: any[];
//        global?: any;
//        isNew?: boolean;
//        guardar?: (item: any) => void;
//        modulo?: any;
//        cliente?: any;
//        seccion?: any;
//        compania?: any;
//        clientescompanias?: any;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }
//    export class ConnectedPageEditarConfigurarParametro extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);
//            this.state = { viewMode: true };

//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//        }

//        static defaultProps: IProps = {
//            configurarparametro: undefined,
//            global: {},
//            isNew: false
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();

//            let parametro: any = item
//                .addNumberConst("ID", this.props.configurarparametro.data.ID != undefined ? this.props.configurarparametro.data.ID : 0)
//                .addString("IdParametro")
//                .addString("Valor")
//                .addObject("Compania")
//                .addEstatus("Estatus")
//                .toObject();

//            this.props.guardar(parametro);
//            this.setState({ viewMode: false });
//        }

//        editForm(): void {
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//            let $bc: any = $ml.bc;
//            if (!this.props.isNew && !this.state.viewMode) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.push($bc.kontrol.configurarparametros.link);
//            }
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.configurarparametro, nextProps.configurarparametro)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.obtenerDatos(Number(this.props.params.id));
//                } else {
//                    dispatchFailed("configurarparametros-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("configurarparametros-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

//        componentDidUpdate(prevProps: IProps, prevState: IState): any {
//            let $page: any = $ml[PAGE_ID];
//            if (wasUpdated(prevProps.configurarparametro, this.props.configurarparametro)) {
//                success($page.mensajes.exito);
//                this.setState({ viewMode: true });
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.configurarparametros];
//            let editView: boolean = this.props.isNew || !this.state.viewMode;

//            let configurarparametro: any = this.props.configurarparametro.data;
//            let status: AsyncActionTypeEnum =
//                (!this.props.configurarparametro || !this.props.configurarparametro.status) ? AsyncActionTypeEnum.default : this.props.configurarparametro.status;

//            let title: IPageTitle = {
//                title: configurarparametro && configurarparametro.Parametro && configurarparametro.Parametro.Nombre ? configurarparametro.Parametro.Nombre : "",
//                subTitle: configurarparametro && configurarparametro.Parametro && configurarparametro.Parametro.Secciones && configurarparametro.Parametro.Secciones.Nombre ? configurarparametro.Parametro.Secciones.Nombre : "",
//                children: [EK.UX.Labels.badgeEstatus(configurarparametro.Estatus)]
//            };

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.configurarparametro}>
//                        {!this.props.isNew && this.state.viewMode
//                            ? <View item={configurarparametro} />
//                            : <Edit
//                                isNew={this.props.isNew}
//                                item={configurarparametro}
//                                modulo={this.props.modulo}
//                                cliente={this.props.cliente}
//                                seccion={this.props.seccion}
//                                compania={this.props.compania}
//                                clientescompanias={this.props.clientescompanias}
//                                />}
//                    </PanelUpdate>
//                </PageV2 >;
//            return page;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            configurarparametro: state.configurarparametros.selected,
//            modulo: state.global.modulo,
//            cliente: state.global.cliente,
//            seccion: state.global.seccion,
//            compania: state.global.clientecompania,
//            history: state.configurarparametros.history[state.configurarparametros.selected.data.ID],
//            clientescompanias: state.global.clientescompanias
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.configurarparametros.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            obtenerDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "configurarparametros-setSelected",
//                    url: "configurarparametros/GetById/" + id
//                }));
//                dispatch(EK.Global.actionAsync({
//                    action: "history-configurarparametro",
//                    url: "configurarparametros/history(" + id + ")",
//                    data: { ID: id }
//                }));
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "configurarparametros-guardar",
//                    type: HttpMethod.PUT,
//                    url: "Configurarparametros/Save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            },
//            obtenerClientesCompanias: (): any => {
//                dispatchAsync("clientescompanias-kv", "Companias");
//            }
//        };
//    };

//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    export let PageConfigurarParametroCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarConfigurarParametro);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevoConfigurarParametro extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PageConfigurarParametroCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        item: any;
//        isNew?: boolean;
//        modulo?: any;
//        cliente?: any;
//        seccion?: any;
//        compania?: any;
//        clientescompanias?: any;
//    };

//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let Status: boolean = current.ID == undefined ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            let validationsList: EK.UX.Validations.ValidationError[] = [];
//            let placeHolder: string = "";
//            if (current.Parametro && current.Parametro.TipoDato) {

//                switch (current.Parametro.TipoDato.Clave) {
//                    case TipoDato.INT:
//                    case TipoDato.DEC:
//                        placeHolder = "99999";
//                        validationsList.push(validations.isNumber($page.form.valor.validaciones.esnumero));
//                        break;
//                    case TipoDato.BOOL:
//                        placeHolder = "true|false";
//                        validationsList.push(validations.isBoolean($page.form.valor.validaciones.esboolean));
//                        break;
//                    case TipoDato.DT:
//                        placeHolder = "01/01/2017";
//                        validationsList.push(validations.isDateTime($page.form.valor.validaciones.esdatetime));
//                        break;
//                };
//            }
//            validationsList.push(validations.required($page.form.valor.validaciones.requerido));

//            let compania: any = (current.ID && current.Compania && current.Compania.ID) ?
//                current.Compania :
//                (this.props.compania && this.props.compania.data) ? this.props.compania.data : undefined;
//            let modulo: any = (current.Parametro && current.Parametro.Modulo && current.Parametro.Modulo.ID) ? current.Parametro.Modulo : undefined;
//            let cliente: any = (current.Cliente && current.Cliente.ID) ? current.Cliente : undefined;
//            let moduloNombre = (current.Parametro && current.Parametro.Modulo && current.Parametro.Modulo.ID) ? current.Parametro.Modulo.Nombre : "";

//            return < FadeInColumn >
//                <Input id="ID" value={current.ID} label="" visible={false} />
//                <Input id="IdCliente" value={1} label="" visible={false} />
//                <Input id="IdParametro" value={current.Parametro.ID} label="" visible={false} />

//                <Label id="Ambito" label={$page.form.ambito.label} value={current.Parametro.Ambito.Nombre} size={(current.Parametro.Ambito.Clave.trim() == Ambito.COMPANIAS) ? [12, 12, 12, 2] : [12, 12, 12, 5]} />
//                <Label id="Modulo" label={$page.form.modulo.label} value={current.Parametro.Modulo.Nombre} size={(current.Parametro.Ambito.Clave.trim() == Ambito.COMPANIAS) ? [12, 12, 12, 3] : [12, 12, 12, 5]} />
//                {(current.Parametro.Ambito.Clave.trim() == Ambito.COMPANIAS) ?
//                    <DropdownList
//                        id="Compania"
//                        label={$page.form.compania.label}
//                        items={this.props.clientescompanias}
//                        value={compania}
//                        size={[12, 12, 12, 5]}
//                        helpLabel={$page.form.compania.helplabel}
//                        style={{ marginBottom: 20 }}
//                        />
//                    : <Input id="Compania" label={$page.form.compania.label} value={undefined} visible={false} />
//                }
//                <CheckBoxStatus
//                    id="Estatus"
//                    label={$page.form.estatus.label}
//                    xs={{ size: 12 }}
//                    sm={{ size: 12 }}
//                    md={{ size: 12 }}
//                    lg={{ size: 2 }}
//                    helpLabel={$page.form.estatus.helplabel}
//                    value={Status}
//                    style={{ marginTop: 30, marginBottom: 20 }}
//                    />
//                <Input
//                    id="Valor"
//                    label={$page.form.valor.label}
//                    size={[12, 10, 10, 12]}
//                    required={true}
//                    helpLabel={$page.form.valor.helplabel}
//                    value={current.Valor}
//                    maxLength={300}
//                    placeHolder={placeHolder}
//                    validations={validationsList} />
//            </FadeInColumn>;
//        };
//    }
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IViewProps extends React.Props<any> {
//        item: any;
//    };

//    class View extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let Status: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label id="Ambito" label={$page.form.ambito.label} value={current.Parametro.Ambito.Nombre} size={(current.Parametro.Ambito.Clave.trim() == Ambito.COMPANIAS) ? [12, 12, 12, 2] : [12, 12, 12, 6]} />
//                    <Label id="Modulo" label={$page.form.modulo.label} value={current.Parametro.Modulo.Nombre} size={(current.Parametro.Ambito.Clave.trim() == Ambito.COMPANIAS) ? [12, 12, 12, 4] : [12, 12, 12, 6]} />
//                    {(current.Parametro.Ambito.Clave.trim() == Ambito.COMPANIAS) ?
//                        <Label id="Compania" label={$page.form.compania.label} value={current.Compania.Nombre} size={[12, 12, 12, 6]} /> :
//                        <Input id="Compania" label={$page.form.compania.label} value={""} visible={false} />}
//                    <Label id="Valor" label={$page.form.valor.label} value={current.Valor} size={[12, 12, 12, 12]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}