//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "seccionesparametros";
//    const idForm: string = "secciones";
//    const CATALOGO: string = "AGRUPADOR";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        agrupadorparametro?: any;
//        params?: IParams;
//        guardar?: (item: any[]) => void;
//        cargaGlobal?: () => any;
//        global?: any;
//        isNew?: boolean;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarSeccionesParametros extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: true };
//        }

//        static defaultProps: IProps = {
//            agrupadorparametro: undefined,
//            isNew: false
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();

//            let model: any = item
//                .addNumberConst("ID", this.props.agrupadorparametro.data.ID != undefined ? this.props.agrupadorparametro.data.ID : 0)
//                .addStringConst("ClaveCatalogo", CATALOGO)
//                .addString("Clave")
//                .addString("Nombre")
//                .addEstatus("Estatus")
//                .toObject();
//            this.props.guardar(model);
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
//                ReactRouter.hashHistory.push($bc.kontrol.secciones.link);
//            }
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.agrupadorparametro, nextProps.agrupadorparametro) ||
//                (this.state.viewMode !== nextState.viewMode));
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));
//                } else {
//                    dispatchFailed("secciones-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("secciones-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

//        componentDidUpdate(prevProps: IProps, prevState: IState): any {
//            const $page: any = $ml[PAGE_ID];
//            if (wasUpdated(prevProps.agrupadorparametro, this.props.agrupadorparametro)) {
//                success($page.mensajes.exito);
//                this.setState({ viewMode: true });
//            }
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.secciones];

//            let current: any = this.props.agrupadorparametro.data;
//            let editView: boolean = this.props.isNew || !this.state.viewMode;

//            let title: IPageTitle = {
//                title: !this.props.isNew ? current.Nombre : $page.edit.titulo,
//                subTitle: "",
//                children: [EK.UX.Labels.badgeEstatus(current.Estatus), EK.UX.Labels.badgeBloqueado(current.Bloqueado)]
//            };

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.agrupadorparametro}>
//                        {!this.props.isNew && this.state.viewMode
//                            ? <View item={current} />
//                            : <Edit isNew={this.props.isNew}
//                                item={current} />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            agrupadorparametro: state.secciones.selected
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.secciones.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "secciones-setSelected",
//                    url: "catalogos/get/" + id
//                }));
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "secciones-guardar",
//                    type: HttpMethod.PUT,
//                    url: "catalogosgeneralesvalores/save",
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
//    export let PageSeccionesParametrosCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarSeccionesParametros);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevaSeccionParametro extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PageSeccionesParametrosCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        item: any;
//        isNew?: boolean;
//    };

//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
//        };

//        refs: {
//            form: any;
//        };

//        render(): JSX.Element {
//            const $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            return <FadeInColumn>
//                <Input id="ID" value={current.ID} label="" visible={false} />
//                <Input
//                    id="Clave"
//                    label={$page.form.clave.label}
//                    size={[12, 6, 6, 2]}
//                    required={true}
//                    value={current.Clave}
//                    helpLabel={$page.form.clave.helplabel}
//                    maxLength={100}
//                    validations={[
//                        validations.required($page.form.clave.validaciones.requerida)
//                    ]} />
//                <Input
//                    id="Nombre"
//                    label={$page.form.nombre.label}
//                    size={[12, 6, 6, 8]}
//                    required={true}
//                    value={current.Nombre}
//                    helpLabel={$page.form.nombre.helplabel}
//                    maxLength={300}
//                    validations={[
//                        validations.required($page.form.nombre.validaciones.requerida)
//                    ]} />
//                <CheckBoxStatus
//                    id="Estatus"
//                    label={$page.form.estatus.label}
//                    xs={{ size: 12 }}
//                    sm={{ size: 6 }}
//                    md={{ size: 6 }}
//                    lg={{ size: 2 }}
//                    required={false}
//                    value={Status}
//                    helpLabel={$page.form.estatus.helplabel}
//                    disabled={false}
//                    style={{ marginTop: 25 }} />
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
//            const $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 10, 10, 2]} />
//                    <Label label={$page.form.nombre.label} value={current.Nombre} size={[12, 12, 12, 10]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/

//    // History
//    const historyUsuariosMapProps: any = (state: any): any => {
//        return {
//            data: state.secciones.history[state.secciones.selected.data.ID]
//        };
//    };

//    let History: any = ReactRedux.connect(historyUsuariosMapProps, null)(HistoryItemCatalogoTab);
//}
