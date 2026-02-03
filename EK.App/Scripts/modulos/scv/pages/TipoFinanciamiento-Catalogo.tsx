namespace EK.Modules.SCV.Pages.TipoFinanciamiento {
    "use strict";
    const SCV_INSTITUCIONES: string = "Instituciones";
    const SCV_CONCEPTOS: string = "Conceptos";
    const config: page.IPageConfig = global.createPageConfig("tipoFinanciamiento", "scv", [SCV_INSTITUCIONES, SCV_CONCEPTOS]);

    let Iconos: any = {};
    Iconos[SCV_INSTITUCIONES] = "fa fa-object-group";

    interface IPageEditProps extends page.IProps {
        item?: any;
    };

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .addObject(SCV_INSTITUCIONES)
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let idFinanciamiento: any = getDataID(props.entidad);
            if (idFinanciamiento === -1) {
                global.dispatchSuccessful("global-page-data", [], SCV_INSTITUCIONES);
                global.dispatchSuccessful("global-page-data", [], SCV_CONCEPTOS);
            }
            else {
                let parametros: any = global.assign({ idFinanciamiento });
                props.config.dispatchCatalogoBase("base/kontrol/TipoFinanciamiento/Get/GetAllTFInstituciones/", parametros, SCV_INSTITUCIONES);
                global.dispatchSuccessful("global-page-data", [], SCV_CONCEPTOS);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded} >
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={"Tipo de Financiamiento"}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} validations={[validations.required()]} />
                            <input.Nombre size={[12, 12, 8, 8]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <TFInstituciones />
                        </Row>
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
                        id={config.id}
                        subTitle={"Tipo de Financiamiento"}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <TFInstituciones />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };

    export let TFInstituciones: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onAddNew(): any {
            Forms.remove(SCV_INSTITUCIONES);
            Forms.remove(SCV_CONCEPTOS);
            global.dispatchSuccessful("global-page-data", [], SCV_CONCEPTOS);
            config.setState({ viewMode: false }, SCV_INSTITUCIONES);
        };
        render(): JSX.Element {
            let valorElementos: DataElement = this.props.item;
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            //
            let concepto: any = Forms.getValue("Concepto", SCV_CONCEPTOS);
            let isImporte: boolean = false;
            //
            if (concepto) {
                let tipoConcepto: any = global.assign({}, concepto.TipoConcepto);
                if (tipoConcepto.Clave === "IMP") {
                    isImporte = true;
                }
            }
            //
            let editInstitucion: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    EK.Global.dispatchFullSuccessful("global-page-data", item.Conceptos, SCV_CONCEPTOS, 0, "");
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    config.setState({ viewMode: false }, id);
                }
            };
            let removeConcepto: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let element: DataElement = Forms.getValue(id, SCV_INSTITUCIONES);
                    let x: any = element.removeItem(item);
                    Forms.updateFormElement(SCV_INSTITUCIONES, id, element.removeItem(item));
                }
            }
            let editConcepto: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let element: DataElement = Forms.getValue(id, SCV_INSTITUCIONES);
                    Forms.remove(SCV_CONCEPTOS);
                    element.upsertItem(item);
                    Forms.updateFormElements(id, item);                    
                    config.setState({ viewMode: false }, id);
                }
            }
            const institucionesListHeader: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[12, 10, 10, 10]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>;

            const conceptosListHeader: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[12, 12, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[12, 12, 4, 4]} className="list-default-header">{"Tipo Concepto"}</Column>
                        <Column size={[12, 12, 2, 2]} className="list-default-header">{"Crédito"}</Column>
                        <Column size={[12, 12, 2, 2]} className="list-default-header">{"Impresión"}</Column>
                        
                    </Row>
                </Column>

            return <page.SectionList
                id={SCV_INSTITUCIONES}
                parent={config.id}
                level={1}
                icon={Iconos[SCV_INSTITUCIONES]}
                size={[12, 12, 6, 6]}
                style={{ paddingTop: 15 }}
                listHeader={institucionesListHeader}
                items={createSuccessfulStoreObject([])}
                readonly={false}
                addRemoveButton={false}
                onAddNew={estadoEntidad ? null : this.onAddNew}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addObject("Institucion")
                        .addObject("Conceptos")
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {
                            if (value.Institucion.ID === retValue.Institucion.ID) {
                                retValue.ID = value.ID;
                                retValue._found = true;
                            };
                        });
                    };
                    return retValue;
                } }
                formatter={(index: number, item: any) => {
                    var Visible = true;
                    if (item.Conceptos == undefined || item.Conceptos.length == 0) {
                        Visible = false;
                    }
                    return <Row id={"row_Institucion_" + item.ID} className="panel-collapsed">
                        <Row>
                            <Column size={[1, 1, 1, 1]}>
                                <CollapseButton visible={Visible} idElement={"row_Institucion_" + item.ID} className="button-panel-plus"
                                    collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down"
                                    style={null} collapsed={true} iconOnly={true} />
                            </Column>
                            <Column size={[12, 10, 10, 10]} className="listItem-default-item"><span>{item.Institucion.Nombre}</span></Column>
                            {estadoEntidad ? null :
                                <buttons.PopOver idParent={config.id} idForm={SCV_INSTITUCIONES} info={item}
                                    extraData={[editInstitucion, buttons.PopOver.remove]} />
                            }
                        </Row>
                        <Row>
                            <Column
                                xs={{ size: 12 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 10, offset: 1 }}
                                lg={{ size: 10, offset: 1 }}
                                className="panel-detail well well-sm">
                                <List
                                    id={this.props.id + "_list"}
                                    items={global.createSuccessfulStoreObject(item.Conceptos)}
                                    readonly={true}
                                    addRemoveButton={false}
                                    listHeader={conceptosListHeader}
                                    formatter={(index_c: number, item_c: any): any => {
                                        return <Row id={"row_ConceptoCredito_" + index_c}>
                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-success">{item_c.Orden + " "}</span></Column>
                                            <Column size={[12, 12, 4, 4]} className="listItem-default-header">{item_c.Concepto.Nombre}</Column>
                                            <Column size={[12, 12, 4, 4]} className="listItem-default-header">{item_c.Concepto.TipoConcepto.Nombre}</Column>
                                            <Column size={[12, 12, 1, 1]} className="listItem-center-header" style={{ fontWeight: 600, color: "lightgrey" }}>{EK.UX.Labels.bool(item_c.Credito)}</Column>
                                            <Column size={[12, 12, 1, 1]} className="listItem-center-header" style={{ color: "lightgrey" }}>{EK.UX.Labels.bool(item_c.Impresion)}</Column>
                                            <Column size={[12, 12, 1, 1]}></Column>
                                        </Row>
                                    } } />
                            </Column>
                        </Row>
                    </Row>
                } }>
                <Row>
                    <ddl.InstitucionesCreditoDDL id={"Institucion"} size={[12, 12, 12, 12]} idFormSection={SCV_INSTITUCIONES} required={true} />
                    <page.SectionList
                        id={SCV_CONCEPTOS}
                        parent={SCV_INSTITUCIONES}
                        level={1}
                        style={{ paddingTop: 15 }}
                        icon="fa fa-check-circle-o"
                        listHeader={conceptosListHeader}
                        size={[12, 12, 12, 12]}
                        items={createSuccessfulStoreObject([])}
                        addRemoveButton={true}
                        mapFormToEntity={(form: EditForm, entidades?: any): any => {
                            let retValue: any = form
                                .addID()
                                .addVersion()
                                .addObject("Concepto")
                                .addBoolean("Credito")
                                .addNumber("Orden")
                                .addBoolean("Impresion")
                                .addEstatus()
                                .toObject();
                            let e: any[] = entidades;
                            if (e && e.length > 0) {
                                e.forEach((value: any, index: number): any => {
                                    if (value.Orden !== retValue.Orden) {
                                        if (value.Concepto.ID === retValue.Concepto.ID && retValue._found !== true) {
                                            retValue.ID = value.ID;
                                            retValue.Orden = value.Orden;
                                            retValue._found = true;
                                        };
                                    } else
                                    {
                                        /*
                                        retValue.ID = value.ID;
                                        retValue.Concepto = value.Concepto;
                                        retValue.Credito = value.Credito;
                                        retValue.Impresion = value.Impresion;
                                        retValue._found = true;
                                        */

                                        retValue._found = true;
                                    };
                                    if (retValue.Concepto.TipoConcepto.Clave != "IMP") {
                                        retValue.Credito = false;
                                    }
                                });
                            };
                            return retValue;

                        } }
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column size={[12, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-success">{item.Orden + " "}</span></Column>
                                <Column size={[12, 4, 4, 4]} className="listItem-default-header"><span>{item.Concepto.Nombre}</span></Column>
                                <Column size={[12, 4, 4, 4]} className="listItem-default-header"><span>{item.Concepto.TipoConcepto.Nombre}</span></Column>
                                <Column size={[12, 1, 1, 1]} className="listItem-center-header"><span style={{ color: "lightgrey" }}>{EK.UX.Labels.bool(item.Credito)}</span></Column>
                                <Column size={[12, 1, 1, 1]} className="listItem-center-header"><span style={{ color: "lightgrey" }}>{EK.UX.Labels.bool(item.Impresion)}</span></Column>
                                <buttons.PopOver idParent={config.id} idForm={SCV_CONCEPTOS} info={item} extraData={[editConcepto, removeConcepto]} />
                            </Row>
                        } }>
                        <Row>
                            <input.Integer size={[12, 4, 4, 4]} id={"Orden"} label="Orden" idFormSection={SCV_CONCEPTOS} validations={[validations.required()]} />
                            <ddl.ConceptosCreditoDDL id={"Concepto"} idFormSection={SCV_CONCEPTOS} size={[12, 8, 8, 8]} validations={[validations.required()]} />
                            {isImporte === true ?
                                <CheckBox id={"Credito"} label="Crédito" idFormSection={SCV_CONCEPTOS} size={[12, 4, 4, 4]} value={true} /> : null
                            }
                            <CheckBox id={"Impresion"} label="Impresión" idFormSection={SCV_CONCEPTOS} size={[12, 4, 4, 4]} />
                        </Row>
                    </page.SectionList>
                </Row>
            </page.SectionList>
        };
    })
};

//namespace EK.Modules.SCV.Pages.TipoFinanciamiento {
//    "use strict";
//    const PAGE_ID: string = "tipofinanciamiento";
//    const CLAVECATALOGO: string = "SCVTIPOFINANCIAMIENTO";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        item?: any;
//        params?: IParams;
//        guardar?: (item: any[]) => void;
//        isNew?: boolean;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarTipoFinanciamiento extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: this.props.isNew ? false : true };
//        }

//        static defaultProps: IProps = {
//            isNew: false
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();
//            let model: any = item
//                .addNumberConst("ID", getDataID(this.props.item))
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
//            if (!this.props.isNew && !this.state.viewMode) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.goBack();
//            }
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.item, nextProps.item)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);
//            setCurrentEntityType(PAGE_ID);
//            if (!this.props.isNew) {
//                let id: number = Number(this.props.params.id);
//                if (id) {
//                    if (isSuccessful(this.props.item)) {
//                        if (id !== getDataID(this.props.item)) {
//                            this.props.cargarDatos(id);
//                        }
//                    } else {
//                        this.props.cargarDatos(id);
//                    }
//                    this.props.cargarDatos(id);
//                } else {
//                    dispatchFailed("tipofinanciamiento-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("tipofinanciamiento-setSelected", createSuccessfulStoreObject({}));
//            }
//        }


//        componentWillReceiveProps(nextProps: IProps) {
//            if (hasChanged(this.props.item, nextProps.item)) {
//                if (isSuccessful(nextProps.item)) {
//                    setCurrentEntity(nextProps.item);
//                };
//            };
//        };

//        componentDidUpdate(prevProps: IProps, prevState: IState): any {
//            let $page: any = $ml[PAGE_ID];
//            if (wasUpdated(prevProps.item, this.props.item)) {
//                success($page.mensajes.exito);
//                //this.props.cargarDatos(0);
//                this.setState({ viewMode: true });
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.tipofinanciamiento];
//           // let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let editView: boolean = !this.state.viewMode;
//            let current: any = this.props.item.data;

//            let title: IPageTitle = {
//                title: !this.props.isNew ? current.Nombre : $page.edit.titulo,
//                subTitle: !this.props.isNew ? current.Clave : "",
//                children: [EK.UX.Labels.badgeEstatus(current.Estatus)]
//            };

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.item}>
//                        {!editView
//                            ? <View item={current} />
//                            : <Edit
//                                isNew={this.props.isNew}
//                                item={current}
//                                />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    class $tipofinanciamientoPage {
//        static props: any = (state: any): any => {
//            return {
//                item: state.tipofinanciamiento.selected
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            cargarDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "tipofinanciamiento-setSelected",
//                    url: "catalogos/get/" + id
//                }));
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "tipofinanciamiento-guardar",
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
//        });
//    }

//    export let Edicion: any = ReactRedux.connect($tipofinanciamientoPage.props, $tipofinanciamientoPage.dispatchs)(ConnectedPageEditarTipoFinanciamiento);

//    /*** BEGIN: NEW FORM ***/
//    export class Nuevo extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <Edicion isNew={true} />
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
//                    label={$page.form.descripcion.label}
//                    size={[12, 6, 6, 8]}
//                    required={true}
//                    value={current.Nombre}
//                    helpLabel={$page.form.descripcion.helplabel}
//                    maxLength={300}
//                    validations={[
//                        validations.required($page.form.descripcion.validaciones.requerida)
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
//            let current: any = this.props.item;
//            let $page: any = $ml[PAGE_ID];
//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 10, 10, 2]} />
//                    <Label label={$page.form.descripcion.label} value={current.Nombre} size={[12, 12, 12, 10]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}