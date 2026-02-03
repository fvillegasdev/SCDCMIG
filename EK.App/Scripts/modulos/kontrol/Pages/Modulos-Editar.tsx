namespace EK.Modules.Kontrol.Pages.Modulos {
    "use strict";
    const MODULOS_OPCIONES: string = "ModulosOpciones";
    const config: page.IPageConfig = global.createPageConfig("modulos", "kontrol", [MODULOS_OPCIONES]);

    let PAGE_ID = "Módulos";
    let idModulo: any = -1;

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addString("Descripcion")
                .addEstatus()
                .addVersion()
                .toObject();

            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let parametros: any = global.assign({ idModulo: getDataID(props.entidad),activos:1 });
            config.dispatchCatalogoBase("base/Kontrol/modulos/Get/GetOpciones/", parametros , MODULOS_OPCIONES);
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
                        icon="icon-ek-058" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={5} />
                            <input.Nombre size={[12, 12, 4, 4]} maxLength={150} />
                            <Input id={"Descripcion"} size={[12, 12, 4, 4]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <ViewOpciones />
                        </Row>
                    </page.OptionSection>
                </Column>
                <Row>
 
                </Row>
            </page.Edit>
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="icon-ek-058" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 4, 4]} />
                            <Label id={"Descripcion"} size={[12, 12, 4, 4]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <ViewOpciones />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>
        }
    }

    interface IViewOpcionesProps extends React.Props<any> {
        modulo?: any;
        opciones?: any;
        entidad?: any;
    };
    const ViewOpciones = global.connect(class extends React.Component<IViewOpcionesProps, IViewOpcionesProps> {
        constructor(props: IViewOpcionesProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            opciones: state.global.catalogo$ModulosOpciones,
            entidad: state.global.currentEntity
        });
        render(): JSX.Element {
            let opciones: any = global.getData(this.props.opciones);
            let iconStyle: React.CSSProperties = { padding: 3, width: 24, height: 24 };
            let iconNormal = (icon: string) => {
                return <i className={icon}></i>;
            };
            //
            let iconSel = (icon: string, warning?: boolean) => {
                let labelClass: string = "label bg-green-meadow bg-font-green-meadow";
                if (warning === true) {
                    labelClass = "label label-danger";
                };

                return <span className={labelClass} style={{ padding: "6px 2px 2px 2px" }}>
                    <i className={icon} style={{ fontSize: 16, height: 16 }}></i>
                </span>;
            };
            //
            return <Column style={{ marginTop: 10 }}>
                <page.OptionSection
                    id={MODULOS_OPCIONES}
                    title="Opciones"
                    level={1}
                    icon="fa fa-spinner"
                    readOnly={true}
                    collapsed={false}>
                    <Row>
                        <Column style={{ padding: "15px 25px" }}>
                            <PanelUpdate info={this.props.opciones}>
                                <List items={opciones}
                                    childrenPropertyName="Opciones"
                                    readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        let icono: string = item.Icono ? item.Icono : "fa fa-list-alt";
                                        let esSeccion: boolean = item.EsSeccion;

                                        return <div>
                                            <i className={icono} style={{ height: 25, padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
                                            {esSeccion ? <span className="badge badge-info">Sección</span> : null}
                                            <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Nombre}</div>
                                            <div className="btn-group" style={{ display: "inline-block", float: "right", marginTop: -3, fontSize: 18 }}>
                                            </div>
                                        </div>;
                                    }} />
                            </PanelUpdate>
                        </Column>
                    </Row>
                </page.OptionSection>
            </Column>;
        };
    });
}
//namespace EK.Modules.Kontrol.Pages { 
//namespace EK.Modules.Kontrol.Pages.Modulos { 
//    "use strict";
//    const PAGE_ID: string = "modulos";
//    const MODULOS_SECTION_ID: string = [PAGE_ID, "OPCIONES"].join("$");

//    const idForm: string = "modulos";
//    const idPage: string = "";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        modulo: any;
//        opciones?: any;
//        params?: IParams;
//        cargaGlobal?: () => any;
//        history?: any[];
//        global?: any;
//        guardar?: (item: any) => void;
//        isNew?: boolean;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class _PageModulo extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);

//            this.onEditForm = this.onEditForm.bind(this);
//            this.onSaveForm = this.onSaveForm.bind(this);
//            this.onCancelEditForm = this.onCancelEditForm.bind(this);

//            this.state = { viewMode: true };
//        }

//        static defaultProps: IProps = {
//            isNew: false,
//            modulo: undefined,
//            global: {}
//        };

//        onSaveForm(): void {
//            let item: EditForm = Forms.getForm();

//            let modulo: any = item
//                .addNumberConst("ID", this.props.modulo.data.ID != undefined ? this.props.modulo.data.ID : 0)
//                .addString("Clave")
//                .addString("Nombre")
//                .addEstatus("Estatus")
//                .toObject();
//            this.props.guardar(modulo);
//            this.setState({ viewMode: false });
//        }

//        onEditForm(): void {
//            this.setState({ viewMode: false });
//        }

//        onCancelEditForm(): void {
//            let $bc: any = $ml.bc;
//            if (!this.props.isNew && !this.state.viewMode) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.push($bc.kontrol.modulos.link);
//            }
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.modulo, nextProps.modulo)) ||
//                (hasChanged(this.props.opciones, nextProps.opciones)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentWillReceiveProps(nextProps: IProps): any {
//            if (hasChanged(this.props.modulo, nextProps.modulo)) {
//                setCurrentEntity(nextProps.modulo);
//            };
//        };

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));
//                } else {
//                    dispatchFailed("modulos-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("modulos-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

//        componentDidUpdate(prevProps: IProps, prevState: IState): any {
//            let $page: any = $ml[PAGE_ID];
//            if (wasUpdated(prevProps.modulo, this.props.modulo)) {
//                success($page.mensajes.exito);
//                this.setState({ viewMode: true });
//            };
//        }

//        render(): JSX.Element {
//            let current: any = this.props.modulo;
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.modulos];
//            let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let title: IPageTitle = {
//                title: !this.props.isNew ? current.data.Nombre : $page.edit.titulo,
//                subTitle: !this.props.isNew ? current.data.Clave : "",
//                children: [EK.UX.Labels.badgeEstatus(current.data.Estatus)]
//            };

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.onSaveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.onEditForm} /> : null}
//                        <CancelButton onClick={this.onCancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={current}>
//                        {!this.props.isNew && this.state.viewMode
//                            ? <Ver
//                                item={{ modulo: current, opciones: this.props.opciones }} />
//                            : <Editar
//                                isNew={this.props.isNew}
//                                item={current}
//                                />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    //<QuickSidebarTab>
//    //    <CompaniasItemTab />
//    //    <UsuariosItemTab />
//    //</QuickSidebarTab>

//    const mapProps: any = (state: any): any => {
//        return {
//            modulo: state.modulos.selected,
//            opciones: state.modulos.opciones,
//            history: state.modulos.history[state.modulos.selected.data.ID]
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.modulos.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (id: number): void => {
//                dispatchAsync("modulos-setSelected", ["modulos(", id, ")"].join(""));
//                dispatchAsync("modulos-opciones", ["modulos(", id, ")/opciones"].join(""));
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "modulos-guardar",
//                    type: HttpMethod.PUT,
//                    url: "modulos/Save",
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
//    export let Modulo: any = ReactRedux.connect(mapProps, mapDispatchs)(_PageModulo);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevoModulo extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <Modulo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        item: any;
//        isNew?: boolean;
//        parametersSelected?: any;
//    };

//    class Editar extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];  /// PAGE_ID 
//            let $bc: any = $ml.bc;

//            let current: any = this.props.item.data;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            return <FadeInColumn>
//                <Input id="ID" value={current.ID} label="" visible={false} />
//                <Input
//                    id="Clave"
//                    label={$page.form.clave.label}
//                    size={[12, 6, 6, 2]}
//                    required={true}
//                    value={current.Clave}
//                    maxLength={10}
//                    validations={[
//                        validations.required($page.form.clave.validaciones.requerida)
//                    ]} />
//                <Input
//                    id="Nombre"
//                    label={$page.form.nombre.label}
//                    size={[12, 6, 6, 8]}
//                    required={true}
//                    value={current.Nombre}
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
//                    value={Status}
//                    />
//            </FadeInColumn>;
//        };
//    }
//    interface IViewProps extends React.Props<any> {
//        item: any;
//    };
//    class Ver extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item.modulo.data;
//            let opciones: any = this.props.item.opciones;

//            return <FadeInColumn>
//                <Row style={{ marginBottom: 15 }}>
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 10, 10, 2]} />
//                    <Label label={$page.form.nombre.label} value={current.Nombre} size={[12, 12, 12, 10]} />
//                </Row>
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <OptionSection title={$page.form.opciones.label} readOnly={true} collapsed={false}>
//                            <PanelUpdate info={opciones} text={$page.form.updating.text}>
//                                <Row>
//                                    <Column>
//                                        <List items={opciones}
//                                            childrenPropertyName="Opciones"
//                                            readonly={false}
//                                            addRemoveButton={false}
//                                            formatter={(index: number, item: any) => {
//                                                let icono: string = item.Icono ? item.Icono : "fa fa-list-alt"
//                                                return <div>
//                                                    <i className={icono}
//                                                        style={{ height: 25, border: "1px dashed #999", padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
//                                                    <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Opcion}</div>
//                                                </div>;
//                                            } } />
//                                    </Column>
//                                </Row>
//                            </PanelUpdate>
//                        </OptionSection>
//                    </Column>
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//}