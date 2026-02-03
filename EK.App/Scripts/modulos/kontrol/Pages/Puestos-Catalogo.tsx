namespace EK.Modules.Kontrol.Pages.Puestos {
    "use strict";
    const Puestos_Categorias: string = "Categorias";
    const config: page.IPageConfig = global.createPageConfig("puestos", "Kontrol", [Puestos_Categorias]);
    let PAGE_ID = "Puestos";
    //PAGE_ID = PAGE_ID.toUpperCase();
    const Header_Puestos_Categorias: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[10, 10, 4, 4]} className="list-default-header">{"Clave"}</Column>
                <Column size={[10, 10, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[10, 10, 3, 3]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[10, 10, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </div>;

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addNumber("Rango")
                .addObject(Puestos_Categorias)
                .addEstatus("Estatus")
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let Puesto: any = getData(props.entidad);
            let IdPuesto:any = getDataID(props.entidad);

            if (IdPuesto === -1) {
                global.dispatchSuccessful("global-page-data", [], Puestos_Categorias);
            }
            else {
                let url: string = global.encodeAllURL("kontrol", "Categorias", { IdPuesto });
                global.dispatchAsync("global-page-data", url, Puestos_Categorias);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        level="main"
                        icon="fa fa-sliders" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 6, 6]} maxLength={150} validations={[validations.required()]} />
                            <Input id={"Rango"} size={[12, 12, 2, 2]}  />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>

                           <page.SectionList
                            id={Puestos_Categorias}
                            parent={config.id}
                            idParent={config.id}
                            icon="fa fa-cubes"
                            level={1}
                            style={{ paddingTop: 20 }}
                            size={[12, 12, 12, 12]}
                            listHeader={Header_Puestos_Categorias}
                            items={createSuccessfulStoreObject([])} readonly={false}
                            addRemoveButton={false}
                            mapFormToEntity={(form: EditForm): any => {
                                return form
                                    .addID()
                                    .addClave()
                                    .addNombre()
                                    .addVersion()
                                    .addEstatus()
                                    .toObject();
                            }}
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[4, 4, 4, 4]} className="listItem-default-header">
                                        <span>{item.Clave}</span>
                                    </Column>
                                    <Column size={[4, 4, 4, 4]} className="listItem-default-header">
                                        <span>{item.Nombre}</span>
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "left" }}>
                                        <span style={{ fontWeight: 400 }}>{item.Estatus.Clave ? EK.UX.Labels.ok(item.Estatus.Clave) : null}</span>
                                    </Column>
                                    <buttons.PopOver idParent={config.id} idForm={Puestos_Categorias} info={item}
                                        extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                </Row>;
                            }}>
                                <Row>
                                <input.Clave idFormSection={Puestos_Categorias} url="base/scv/Categorias/exists/Exists" size={[12, 12, 5, 5]} />
                                    <input.Nombre idFormSection={Puestos_Categorias} size={[12, 12, 5, 5]} />
                                    <checkBox.Status id={"Estatus"} idFormSection={Puestos_Categorias} size={[12, 12, 2, 2]} />
                                </Row>
                            </page.SectionList>
                    </page.OptionSection>
                    
                </Column>

            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-sliders" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12,6, 6]} />
                            <label.Rango id="Rango" size={[12, 12, 2, 2]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                        </Row>

                        <page.SectionList
                            id={Puestos_Categorias}
                            parent={config.id}
                            icon="fa fa-cubes"
                            level="1"
                            style={{ paddingTop: 20 }}
                            size={[12, 12, 12, 12]}
                            listHeader={Header_Puestos_Categorias}
                            items={createSuccessfulStoreObject([])} readonly={false}
                            addRemoveButton={false}
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[4, 4, 4, 4]} className="listItem-default-header">
                                        <span>{item.Clave}</span>
                                    </Column>
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                        <span>{item.Nombre}</span>
                                    </Column>
                                    <Column size={[3, 3, 3, 3]} style={{ textAlign: "center" }}>
                                        <span style={{ fontWeight: 400 }}>{item.Estatus.Clave ? EK.UX.Labels.ok(item.Estatus.Clave) : null}</span>
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                                    </Column>

                                </Row>;
                            }}>
                            <Row>
                                <input.Clave idFormSection={Puestos_Categorias} size={[12, 12, 6, 6]} />
                                <input.Nombre idFormSection={Puestos_Categorias} size={[12, 12, 6, 6]} />
                                <checkBox.Status idFormSection={Puestos_Categorias} size={[12, 12, 2, 2]} />
                            </Row>
                        </page.SectionList>
                    </page.OptionSection>
                </Column>
               
            </page.View>;
        };
    };
};

//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "puestos";
//    const idForm: string = "puestos";
//    const CLAVECATALOGO: string = "PUESTOS";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        puesto?: any;
//        params?: IParams;
//        guardar?: (item: any[]) => void;
//        history?: any[];
//        global?: any;
//        isNew?: boolean;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarPuestos extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: true };
//        }

//        static defaultProps: IProps = {
//            puesto: undefined,
//            global: {},
//            isNew: false
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();
//            let model: any = item
//                .addNumberConst("ID", this.props.puesto.data.ID != undefined ? this.props.puesto.data.ID : 0)
//                .addStringConst("ClaveCatalogo", CLAVECATALOGO)
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
//                ReactRouter.hashHistory.push($bc.kontrol.puestos.link);
//            }
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.puesto, nextProps.puesto)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));
//                } else {
//                    dispatchFailed("puestos-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("puestos-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

//        componentDidUpdate(prevProps: IProps, prevState: IState): any {
//            let $page: any = $ml[PAGE_ID];
//            if (wasUpdated(prevProps.puesto, this.props.puesto)) {
//                success($page.mensajes.exito);
//                this.setState({ viewMode: true });
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];  /// PAGE_ID 
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.puestos];
//            let editView: boolean = this.props.isNew || !this.state.viewMode;

//            let current: any = this.props.puesto.data;
//            let estatus: boolean = (current.Estatus == undefined || current.Estatus == null) ? false
//                : (current.Estatus.ID === 13) ? true : false;

//            let title: IPageTitle = {
//                title: !this.props.isNew ? current.Nombre : $page.edit.titulo,
//                subTitle: !this.props.isNew ? current.Clave : "",
//                children: [EK.UX.Labels.badgeEstatus(current.Estatus)]
//            };

//            let status: AsyncActionTypeEnum =
//                (!this.props.puesto || !this.props.puesto.status) ? AsyncActionTypeEnum.default : this.props.puesto.status;

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.puesto}>
//                        {!editView
//                            ? <View item={current} />
//                            : <Edit isNew={this.props.isNew} item={current} />}
//                    </PanelUpdate>
//                </PageV2 >;
//            return page;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            puesto: state.puestos.selected,
//            history: state.puestos.history[state.puestos.selected.data.ID],
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.puestos.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "puestos-setSelected",
//                    url: "catalogos/get/" + id
//                }));
//            },
//            guardar: (item: any, strUrl: string): void => {
//                dispatch(actionAsync({
//                    action: "puestos-guardar",
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
//    export let PagePuestosCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarPuestos);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevoPuesto extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PagePuestosCatalogo isNew={true} />
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
//            let $page: any = $ml[PAGE_ID];
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
//                    helpLabel={$page.form.clave.helplabel}
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
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let Status: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 10, 10, 2]} />
//                    <Label label={$page.form.nombre.label} value={current.Nombre} size={[12, 12, 12, 10]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}
