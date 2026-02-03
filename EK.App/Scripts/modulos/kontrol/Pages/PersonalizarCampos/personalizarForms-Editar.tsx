//SCVClientes
namespace EK.Modules.Kontrol.Pages.PersonalizarForms {
    "use strict";

    let PAGE_ID = "personalizarCamposOpciones";

    const SECTION_SECCIONES_ID: string = "SeccionesForms";
    const SECTION_CONFIGURACION_ID: string = "ConfiguracionesForms";
    const SECTION_CAMPOS_ID: string = PAGE_ID + "$Campos";
    const SECTION_SECCION_SELECCIONADA_ID: string = PAGE_ID + "$SeccionSeleccionada";
    const SECTION_SECCION_SELECCIONADA_VIEW: string = PAGE_ID + "$SeccionSeleccionadaView";
    const SECTION_CONFIGURACION_ID_TEMPORAL: string = "ConfiguracionesTemporalForms";
    const SECTION_DDL_SECIONES_EDIT: string = PAGE_ID + "$seccionesDDLEdit";
    const SAVE_ID: string = PAGE_ID + "$Save";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "kontrol", [SECTION_SECCIONES_ID, SECTION_CONFIGURACION_ID, SECTION_CAMPOS_ID]);

    const PAGE_ID_NAME: string = "Personalizar Formularios";
    const NameFormCustom: string = "CUSTOMFORM"; 

    export interface ITipoCampoEnum {
        numero: string;
        lista: string;
        texto: string;
        logico: string;
        fecha: string;
        archivo: string;
        entidad: string;
    };

    export var TipoCampoEnum: ITipoCampoEnum = {
        numero: "NUM",
        lista: "LIS",
        archivo: "ARCH",
        fecha: "FEC",
        logico: "LOG",
        texto: "TEX",
        entidad: "ENT"
    }

    export var IconsTipoCampo: any = {
        "NUM":  "fal fa-sort-numeric-up-alt",
        "LIS":  "fal fa-list-ul",
        "TEX":  "fal fa-font",
        "LOG":  "fal fa-check-square",
        "FEC":  "fal fa-calendar-alt",
        "ARCH": "fal fa-file-alt",
        "ENT":  "fad fa-grip-vertical"
    };

    export var IconsConfiguracion: any = {
        "XS": "fas fa-mobile-alt",
        "SM": "fas fa-tablet-alt",
        "MD": "fas fa-laptop",
        "LG": "fas fa-tv"
    };





    interface IConfiguracionForm extends page.IProps {
        vigenciaActiva: any;
        tipoEntidad: any;
        estadoEntidad: any;
        configuracion: any;
        save?: global.DataElement;
    }

    export let Edicion: any = global.connect(class extends React.Component<IConfiguracionForm, {}> {
        constructor(props: IConfiguracionForm) {
            super(props);
            this.saveForm = this.saveForm.bind(this);
            this.actualizarEstado = this.actualizarEstado.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.tipoEntidad = Forms.getValue("TipoEntidad", config.id);
            retValue.estadoEntidad = state.global.currentEntityState;
            retValue.configuracion = state.global.catalogo$configuracion;
            retValue.save = state.global["catalogo$" + SAVE_ID];
            return retValue;
        };

        saveForm(props: IConfiguracionForm): any {
            let item: EditForm = Forms.getForm(config.id)

            let tipoEntidad: any= item.getValue("TipoEntidad");
            let tipoEntidadID: any = tipoEntidad.ID ? tipoEntidad.ID : -1;

            if (tipoEntidadID < 0) {
                global.warning("Seleccione el tipo de entidad.");
                return null;
            }

            let itemConfiguracion: any = getData(item[SECTION_CONFIGURACION_ID]);
            itemConfiguracion.forEach((value: any, index: number) => {
                delete value["_eliminado"];
            });

            let model: any = item
                .addID()
                .addObject("TipoEntidad")
                .addObject("Secciones",SECTION_SECCIONES_ID)
                .addObject("Configuraciones",SECTION_CONFIGURACION_ID)
                .addVersion()
                .toObject();
            global.dispatchAsyncPut("global-page-data", "base/kontrol/PersonalizarCamposOpciones/save", model, SAVE_ID);
        };

        componentDidUpdate(prevProps: IConfiguracionForm, prevState: IConfiguracionForm): any {
            if (this.props.save && wasUpdated(prevProps.save, this.props.save, false)) {
                let item: any = getData(this.props.save);
                let IdTipoEntidad: number = item.Secciones && item.Secciones[0].IdTipoEntidad ? item.Secciones[0].IdTipoEntidad : -1;

                let SeccionSeleccionadaID: number = getDataID(EK.Store.getState().global[SECTION_SECCION_SELECCIONADA_ID]);

                Forms.updateFormElement(config.id, "TipoEntidad", { ID: IdTipoEntidad });
                switch (item.Estado) {
                    case 4: // eliminado con exito
                        break;
                    default:
                        global.success("Registro Actualizado");
                        let parametros: string = global.encodeObject({ IdTipoEntidad: IdTipoEntidad });
                        dispatchAsync("global-page-data", "base/kontrol/PersonalizarCampos/Get/GetAllSecciones/" + parametros, SECTION_SECCIONES_ID);

                        if (SeccionSeleccionadaID > 0) {
                            let parametros: string = global.encodeObject({ IdSeccion: SeccionSeleccionadaID   });
                            dispatchAsync("global-page-data", "base/kontrol/PersonalizarCampos/Get/GetAllConfiguracion/" + parametros, SECTION_CONFIGURACION_ID);
                        } else {
                            global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);
                        }
                        this.actualizarEstado(true);
                        break;
                }
            }
        };
        actualizarEstado(estado: boolean): void {
            dispatchSuccessful("load::currentEntityState", { viewMode: estado })
        }
        onFilter(props: page.IProps, filters: any): any {
        };
        componentWillReceiveProps(nextProps: IConfiguracionForm, nextState: IConfiguracionForm): any {

            if (hasChanged(this.props.tipoEntidad, nextProps.tipoEntidad)) {
                let tipoEntidad: any = nextProps.tipoEntidad;
                if (tipoEntidad && tipoEntidad.ID > 0) {
                    global.dispatchAsync("global-page-data", "base/scv/PersonalizarCampos/Get/GetAll/", SECTION_CAMPOS_ID);
                    global.dispatchSuccessful("global-page-data", [], SECTION_SECCIONES_ID);
                    global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);

                }
                else {
                    global.dispatchSuccessful("global-page-data", [], SECTION_SECCIONES_ID);
                    global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);
                }
            }
        };

        componentDidMount() {
            dispatchSuccessful("global-page-data", [], SECTION_SECCIONES_ID);
            dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);
            dispatchSuccessful("load::currentEntityState", { viewMode: true });
            dispatchSuccessful("load::currentEntity", []);
        }

        shouldComponentUpdate(nextProps: IConfiguracionForm, nextState: IConfiguracionForm): boolean {
            return hasChanged(this.props.estadoEntidad, nextProps.estadoEntidad) ||
                hasChanged(this.props.tipoEntidad, nextProps.tipoEntidad) ||
                hasChanged(this.props.save, nextProps.save);
        };

        render(): JSX.Element {
            let estadoEntidad: any = getData(this.props.estadoEntidad);
            let canPageEdit: boolean = estadoEntidad && estadoEntidad.viewMode ? estadoEntidad.viewMode : false;

            let permiso: number = getOptionPermissionValue(config.id);

            if (permiso === null || permiso === auth.NONE_PERMISSION) {
                return null;
            };

            let permisoEscritura: boolean = permiso >= auth.WRITE_PERMISSION ? true : false;
            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowDelete={false}
                allowView={false}
                onSave={this.saveForm}
                onFilter={this.onFilter}
                allowExcel={false}
                allowNew={false}>
                <PageButtons>
                    {(canPageEdit == true && permisoEscritura) ?
                        <div>
                            <EditarEntidad onClick={(e) => this.actualizarEstado(false)} />
                        </div>
                        : null
                    }
                    {(canPageEdit == false) ?
                        < CancelButton onClick={(e) => this.actualizarEstado(true)} /> : null
                    }
                    <SaveButton key="btnSave1" onClick={this.saveForm} />
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    });


    interface IEditState {
        camposClassState: string;
    };
    let Edit: any = global.connect(class extends React.Component<IConfiguracionForm, IEditState> {
        constructor(props: IConfiguracionForm) {
            super(props);
            this.state = { camposClassState: "reporter-fields-container-compressed" };
        }
        static props: any = (state: any) => ({
        });

        render(): JSX.Element {
            
            return <page.Edit>
                <div className={"reporter-fields-container " + this.state.camposClassState}>
                    <Button icon="fa fa-expand" color={"white"} className={"btn btn-default-ek  btn-sm white reporter-btn-expand"}
                        onClick={() => { this.setState({ camposClassState: "reporter-fields-container-expanded" }); }} />
                    <Button icon="fa fa-compress" color={"white"} className={"btn btn-default-ek  btn-sm white reporter-btn-compress"}
                        onClick={() => { this.setState({ camposClassState: "reporter-fields-container-compressed" }); }} />
                    <div className="reporter-selector"><ddl.TiposCamposDDL addNewItem={"VT"} /></div>
                    <Column className="reporter-fields"><SectionCampos /></Column>
                </div>
                <Row>
                    <Column size={[12, 12, 12, 12]} >
                        <ddl.TipoEntidadConfiguracionDDL size={[6, 6, 6, 6]} id="TipoEntidad" addNewItem={"SO"} />
                    </Column>
                    <Column size={[12, 12, 4, 4]} style={{ marginTop: "10px" }}>
                        <SectionSeccionesEdit />
                    </Column>
                    <Column size={[12, 12, 8, 8]} style={{ marginTop: "10px" }}>
                        <SectionConfiguracionEdit />
                    </Column>
                </Row>
                <Row>
                    <Column size={[12, 12, 12, 12]} >
                        <SectionFieldsRendering id="customEdit" />
                    </Column>
                </Row>
            </page.Edit>;
        };
    });


    let View: any = global.connect(class extends React.Component<IConfiguracionForm, {}> {
        static props: any = (state: any) => ({
        });

        ComponentWillMount() {
            global.dispatchSuccessful("global-page-data", [], SECTION_SECCIONES_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);
        }

        render(): JSX.Element {
            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <ddl.TipoEntidadConfiguracionDDL size={[6, 6, 6, 6]} id="TipoEntidad" addNewItem={"SO"} />
                    </Column>
                    <Column size={[12, 12, 3, 3]} style={{ marginTop: "10px" }}>
                        <SectionSeccionesView />
                    </Column>
                    <Column size={[12, 12, 9, 9]} style={{ marginTop: "10px" }}>
                        <SectionConfiguracionView/>
                    </Column>
                </Row>
                <Row>
                    <Column size={[12, 12, 12, 12]} >
                        <SectionFieldsRendering id="customView" />
                    </Column>
                </Row>
            </page.View>;
        };
    });

    interface ISectionSeccionesEdit extends page.IProps {
        TipoEntidad?: any;
        SeccionGlobal?: any;
        SeccionSelecionada?: any;
    };
    let SectionSeccionesEdit: any = global.connect(class extends React.Component<ISectionSeccionesEdit, ISectionSeccionesEdit> {
        constructor(props: ISectionSeccionesEdit) {
            super(props);
            this.onClickItem = this.onClickItem.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.SeccionSelecionada = state.global[SECTION_SECCION_SELECCIONADA_ID];
            retValue.SeccionGlobal = state.global["catalogo$" + SECTION_SECCIONES_ID];
            retValue.TipoEntidad = Forms.getValue("TipoEntidad", PAGE_ID);
            return retValue;
        };
        shouldComponentUpdate(nextProps: ISectionSeccionesEdit, nextState: {}): boolean {
            return hasChanged(this.props.TipoEntidad, nextProps.TipoEntidad)
                || hasChanged(this.props.SeccionSelecionada, nextProps.SeccionSelecionada)
                || hasChanged(this.props.SeccionGlobal, nextProps.SeccionGlobal);
        };
        componentDidUpdate(): void {
        }

        componentDidUnMount(): void {
            global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID_TEMPORAL);
            global.dispatchSuccessful("global-page-data", [], SECTION_DDL_SECIONES_EDIT);
        };
        componentWillReceiveProps(nextProps: ISectionSeccionesEdit): any {
            if (hasChanged(this.props.TipoEntidad, nextProps.TipoEntidad)) {
                if (nextProps.TipoEntidad != null && nextProps.TipoEntidad != undefined) {
                    let TipoEntidadID: any = nextProps.TipoEntidad.ID;
                    if (TipoEntidadID > 0) {
                        let parametros: string = global.encodeObject({ IdTipoEntidad: TipoEntidadID });
                        dispatchAsync("global-page-data", "base/kontrol/PersonalizarCampos/Get/GetAllSecciones/" + parametros, SECTION_SECCIONES_ID);
                        dispatchAsync("global-page-data", "base/kontrol/PersonalizarCampos/Get/GetAllConfiguracion/" + parametros, SECTION_CONFIGURACION_ID_TEMPORAL);


                   } else {
                        global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);
                        global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID_TEMPORAL);
                    }
                    dispatchSuccessful("load::" + SECTION_SECCION_SELECCIONADA_ID, []);
                }
            }

            if (hasChanged(this.props.SeccionSelecionada, nextProps.SeccionSelecionada)) {
                let seccionSeleccionadaId: any = getDataID(nextProps.SeccionSelecionada);
                if (seccionSeleccionadaId != 0) {
                    let itemsSecciones: any = global.createSuccessfulStoreObject(getData(getData(Forms.getDataValue(SECTION_SECCIONES_ID, PAGE_ID, EK.Store.getState()))))
                    let nuevosItems: any[] = [];
                    itemsSecciones.data.forEach((value: any, index: number) => {
                        nuevosItems.push(value);
                    });
                    global.dispatchSuccessful("global-page-data", nuevosItems, SECTION_DDL_SECIONES_EDIT);
                    Forms.updateFormElement(PAGE_ID, SECTION_SECCIONES_ID, itemsSecciones);
                }
            }
        };

        onClickItem(item: any) {
            dispatchSuccessful("load::" + SECTION_SECCION_SELECCIONADA_ID, item);
        };

        onDeleteSection(item: any): any {
            let $ml: any = this.props.config.getML();

            let idSeccion = item.ID ? item.ID : 0;
            let ValueForm: any = Forms.getValue(SECTION_CONFIGURACION_ID, config.id);
            let dataValue: any = getData(ValueForm);
            let tieneConfiguraciones: boolean = false;

            for (var i = 0; i < dataValue.length; i++) {
                if (dataValue[i].Seccion.ID === idSeccion) {
                    tieneConfiguraciones = true
                }
            }

            if (!tieneConfiguraciones) {
                EK.Global.confirm($ml.autorizacionSeccion.descripcion, $ml.autorizacionSeccion.titulo, () => {
                    let TipoEntidad: any = Forms.getValue("TipoEntidad", config.id);
                    let idTipoEntidad: number = TipoEntidad.ID ? TipoEntidad.ID : 0;

                    if (idSeccion > 0) {
                        let parametros: string = global.encodeObject({ idSeccion: idSeccion, idTipoEntidad: idTipoEntidad });
                        dispatchAsync("global-page-data", "base/kontrol/PersonalizarCampos/Get/deleteSectionById/" + parametros, SECTION_SECCIONES_ID);
                        global.info($ml.autorizacionSeccion.deshabilitada);
                    }
                    else {
                        let ValueFormSection: any = Forms.getValue(SECTION_SECCIONES_ID, config.id);
                        let dataValueSection: any = getData(ValueFormSection);

                        for (var i = 0; i < dataValueSection.length; i++) {
                            if (dataValueSection[i].ID === idSeccion) {
                                dataValueSection.splice(i, 1);
                            }
                        }
                        Forms.updateFormElement(config.id, SECTION_SECCIONES_ID, createSuccessfulStoreObject(dataValueSection));
                        global.info($ml.autorizacionSeccion.mensaje);
                    }
                });
            } else {
                global.warning($ml.autorizacionSeccion.tieneDatos);
            }
        };

        render(): JSX.Element {
            const Encabezado_Secciones: JSX.Element =
                <div key="listHeaderKey" style={{ padding: "0px 0px" }}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[7, 7, 7, 7]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Visible"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </div>;

            let deleteSection: any = {
                icon: "fal fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onDeleteSection(item);
                }
            };

            return <div>
                <page.SectionList
                    id={SECTION_SECCIONES_ID}
                    parent={PAGE_ID}
                    icon={"fa fa-cog"}
                    title={"Secciones"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={false}
                    onItemClick={this.onClickItem.bind(this)}
                    drawOddLine={false}
                    selectable={true}
                    readonly={false}
                    hideNewButton={false}
                    listHeader={Encabezado_Secciones}
                    mapFormToEntity={(form: EditForm): any => {
                        let ordenMax: number = 0;
                        let itemsData: any = global.createSuccessfulStoreObject(getData(EK.Store.getState().forms[PAGE_ID].form[SECTION_SECCIONES_ID].value));   
                        let items = getData(itemsData);

                        if (items != null && items != undefined && items.length > 0) {
                            let size: number = items.length;
                            ordenMax = items[size-1].Orden;
                        }
                        ordenMax++;

                        let retValue: any = form
                            .addID()
                            .addNombre()
                            .addClave()
                            .addNumberConst("IdTipoEntidad", this.props.TipoEntidad.ID)
                            .addNumberConst("Orden", ordenMax)
                            .addBoolean("Visible")
                            .addString("xs")
                            .addString("sm")
                            .addString("md")
                            .addString("lg")
                            .addVersion()
                            .toObject();

                        let idSeccionAsignar:number = itemsData.getNextLowerID() - 1;
                        retValue.ID = idSeccionAsignar;
                        let nuevosItems: any[] = [];
                        items.forEach((value: any, index: number) => {
                            nuevosItems.push(value);
                        });
                        nuevosItems.push(retValue);
                        global.dispatchSuccessful("global-page-data", nuevosItems, SECTION_DDL_SECIONES_EDIT);

                        if (retValue.IdTipoEntidad < 0) {
                            global.warning("Seleccione el tipo de entidad.");
                            return null;
                        }

                        return retValue;
                    }}
                    formatter={(index: number, item: any) => {
                        let itemSeleccionado: number = this.props.SeccionSelecionada && getData(this.props.SeccionSelecionada).ID ? getData(this.props.SeccionSelecionada).ID : 0;
                        let estatusSeleccion: boolean = itemSeleccionado == item.ID ? true : false;
                        let estatusClass: string = "";

                        if (estatusSeleccion == true) {
                            estatusClass += " selected";
                        }

                        return <div className={estatusClass}>
                                <div id={"row_seccion_id" + item.ID} className={"panel-collapsed listItem-default-header "} style={{ marginBottom: "10px", marginTop: "10px" }}>
                                <Column size={[1, 1, 1, 1]} >
                                    <CollapseButton idElement={"row_seccion_id" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                </Column>
                                <Column size={[7, 7, 7, 7]}>
                                    <input.Text value={item.Nombre} id="Nombre" property={SECTION_SECCIONES_ID} index={index} idFormSection={config.id} />
                                </Column>
                                <Column size={[2, 2, 2, 2]}>
                                    <checkBox.CheckBox textAlign="center" property={SECTION_SECCIONES_ID}
                                        value={item.Visible} index={index} id={"Visible"} idFormSection={config.id} />
                                </Column>
                                <Column size={[1, 1, 1, 1]}>
                                    <buttons.PopOver idFormSection={SECTION_SECCIONES_ID} info={item}
                                        extraData={[deleteSection]} />
                                </Column>
                                <Row id={"row_seccion_id" + index}>
                                <Column
                                    xs={{ size: 10 }}
                                    sm={{ size: 10, offset: 1 }}
                                    md={{ size: 10, offset: 1 }}
                                    lg={{ size: 10, offset: 1 }}
                                    className="panel-detail well well-sm">
                                    <Row>
                                        <Column size={[3, 3, 3, 3]} className="list-center-header"><span><i className={IconsConfiguracion["XS"]}></i></span></Column>
                                        <Column size={[3, 3, 3, 3]} className="list-center-header"><span><i className={IconsConfiguracion["SM"]}></i></span></Column>
                                        <Column size={[3, 3, 3, 3]} className="list-center-header"><span><i className={IconsConfiguracion["MD"]}></i></span></Column>
                                        <Column size={[3, 3, 3, 3]} className="list-center-header"><span><i className={IconsConfiguracion["LG"]}></i></span></Column>
                                    </Row>
                                        <Row>
                                            <Column size={[3, 3, 3, 3]}>
                                            <input.Porcentaje property={SECTION_SECCIONES_ID} index={index} value={item.xs > 0 ? item.xs : null} id="xs" idFormSection={config.id} />
                                        </Column>

                                        <Column size={[3, 3, 3, 3]}>
                                            <input.Porcentaje property={SECTION_SECCIONES_ID} index={index} value={item.sm > 0 ? item.sm : null} id="sm" idFormSection={config.id} />
                                        </Column>

                                        <Column size={[3, 3, 3, 3]}>
                                            <input.Porcentaje property={SECTION_SECCIONES_ID} index={index} value={item.md > 0 ? item.md : null} id="md" idFormSection={config.id} />
                                        </Column>
                                        <Column size={[3, 3, 3, 3]}>
                                            <input.Porcentaje property={SECTION_SECCIONES_ID} index={index} value={item.lg > 0 ? item.lg : null} id="lg" idFormSection={config.id} />
                                        </Column>
                                    </Row>
                                </Column>
                                </Row>
                                </div>
                            </div>;
                    }}>
                    <Column size={[12, 12, 12, 12]}>
                        <Row>
                            <input.Clave idFormSection={SECTION_SECCIONES_ID} maxLength={15} size={[12, 12, 6, 6]} validations={[validations.required()]} />
                            <checkBox.CheckBox id="Visible" label="Visible" idFormSection={SECTION_SECCIONES_ID} size={[12, 12, 2, 2]} textAlign="center" />
                            <input.Nombre idFormSection={SECTION_SECCIONES_ID} size={[12,12 ,12, 12]} validations={[validations.required()]} />
                           
                        </Row>
                        <Row style={{ textAlign: "center"}}>
                            <Column size={[12, 3, 3, 3]} style={{padding: "0px"}}>
                                <span><i className={IconsConfiguracion["XS"]}></i></span>
                                <input.Porcentaje id="xs" idFormSection={SECTION_SECCIONES_ID} style={{ padding: "0px" }} value={100} validations={[validations.required()]}/>
                            </Column>
                            <Column size={[12, 3, 3, 3]} style={{ padding: "0px" }}>
                                <span><i className={IconsConfiguracion["SM"]}></i></span>
                                <input.Porcentaje id="sm" idFormSection={SECTION_SECCIONES_ID} style={{ padding: "0px" }} value={100} validations={[validations.required()]}/>
                            </Column>
                            <Column size={[12, 3, 3, 3]} style={{ padding: "0px" }}>
                                <span><i className={IconsConfiguracion["MD"]}></i></span>
                                <input.Porcentaje id="md" idFormSection={SECTION_SECCIONES_ID} style={{ padding: "0px" }} value={100} validations={[validations.required()]}/>
                            </Column>
                            <Column size={[12, 3, 3, 3]} style={{ padding: "0px" }}>
                                <span><i className={IconsConfiguracion["LG"]}></i></span>
                                <input.Porcentaje id="lg" idFormSection={SECTION_SECCIONES_ID} style={{ padding: "0px" }} value={100} validations={[validations.required()]}/>
                            </Column>
                        </Row>
                    </Column>
                </page.SectionList>
            </div>
        };
    });

    interface ISectionSeccionesView extends page.IProps {
        TipoEntidad?: any;
        SeccionGlobal?: any;
        SeccionSelecionada?: any;
    };
    let SectionSeccionesView: any = global.connect(class extends React.Component<ISectionSeccionesView, ISectionSeccionesView> {
        constructor(props: ISectionSeccionesView) {
            super(props);
            this.onClickItem = this.onClickItem.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.TipoEntidad = Forms.getValue("TipoEntidad", PAGE_ID);
            retValue.SeccionSelecionada = state.global[SECTION_SECCION_SELECCIONADA_ID];
            retValue.SeccionGlobal = state.global["catalogo$" + SECTION_SECCIONES_ID];
            return retValue;
        };
        shouldComponentUpdate(nextProps: ISectionSeccionesView, { }): boolean {
            return hasChanged(this.props.TipoEntidad, nextProps.TipoEntidad)
                || hasChanged(this.props.SeccionSelecionada, nextProps.SeccionSelecionada)
                || hasChanged(this.props.SeccionGlobal, nextProps.SeccionGlobal);
        };
        componentDidMount(): void {
        };
        componentWillReceiveProps(nextProps: ISectionSeccionesView): any {
            if (hasChanged(this.props.TipoEntidad, nextProps.TipoEntidad)) {
                if (nextProps.TipoEntidad != null && nextProps.TipoEntidad != undefined) {
                    let TipoEntidadID: any = nextProps.TipoEntidad.ID;
                    if (TipoEntidadID > 0) {
                        let parametros: string = global.encodeObject({ IdTipoEntidad: TipoEntidadID });
                        dispatchAsync("global-page-data", "base/kontrol/PersonalizarCampos/Get/GetAllSecciones/" + parametros, SECTION_SECCIONES_ID);
                        global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);
                    } else {
                        global.dispatchSuccessful("global-page-data", [], SECTION_SECCIONES_ID);
                        global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);
                    }
                    dispatchSuccessful("load::" + SECTION_SECCION_SELECCIONADA_ID, []);
                }
            }
        };

        onClickItem(item: any) {
            let IdSeccion: any = item.ID;
            if (IdSeccion > 0) {
                let parametros: string = global.encodeObject({ IdSeccion: IdSeccion });
                dispatchAsync("global-page-data", "base/kontrol/PersonalizarCampos/Get/GetAllConfiguracion/" + parametros, SECTION_CONFIGURACION_ID);
            } else {
                global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);
            }

            dispatchSuccessful("load::" + SECTION_SECCION_SELECCIONADA_ID, item);
            let items: any = getData(this.props.SeccionGlobal);
            EK.Global.dispatchSuccessful("global-page-data", items, SECTION_SECCIONES_ID);
        };

        render(): JSX.Element {
            const Encabezado_Secciones: JSX.Element =
                <div key="listHeaderKey" style={{ padding: "0px 0px" }}>
                    <Row>
                        <Column size={[8, 8, 8, 8]} className="list-center-header">{"Nombre"}</Column>
                        <Column size={[4, 4, 4, 4]} className="list-default-header">{"Visible"}</Column>
                    </Row>
                </div>;

            return <div>
                <page.SectionList
                    id={SECTION_SECCIONES_ID}
                    parent={PAGE_ID}
                    icon={"fa fa-cog"}
                    title={"Secciones"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={false}
                    onItemClick={this.onClickItem.bind(this)}
                    drawOddLine={false}
                    selectable={true}
                    readonly={true}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={Encabezado_Secciones}
                    formatter = {(index: number, item: any) => {
                        let itemSeleccionado: number = this.props.SeccionSelecionada && getData(this.props.SeccionSelecionada).ID ? getData(this.props.SeccionSelecionada).ID : 0;
                        let estatusSeleccion: boolean = itemSeleccionado == item.ID ? true : false;
                        let estatusClass: string = "";

                        if (estatusSeleccion == true) {
                            estatusClass += " selected";
                        }

                        return <div className={estatusClass}>
                         <div id={"row_seccion_id" + item.ID} className={"panel-collapsed listItem-default-header "} style={{ marginBottom: "10px", marginTop: "10px" }}>
                            <Column size={[2, 2, 2, 2]} >
                                <CollapseButton idElement={"row_seccion_id" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                            </Column>
                            <Column size={[7, 7, 7, 7]}>
                                {item.Nombre}
                            </Column>
                            <Column size={[3, 3, 3, 3]}>
                               {EK.UX.Labels.ok(item.Visible)}
                            </Column>                                
                            <Row id={"row_seccion_id" + index}>
                                <Column
                                    xs={{ size: 10 }}
                                    sm={{ size: 10, offset: 1 }}
                                    md={{ size: 10, offset: 1 }}
                                    lg={{ size: 10, offset: 1 }}
                                    className="panel-detail well well-sm">
                                    <Row>
                                        <Column size={[3, 3, 3, 3]} className="list-center-header"><span><i className={IconsConfiguracion["XS"]}></i></span></Column>
                                        <Column size={[3, 3, 3, 3]} className="list-center-header"><span><i className={IconsConfiguracion["SM"]}></i></span></Column>
                                        <Column size={[3, 3, 3, 3]} className="list-center-header"><span><i className={IconsConfiguracion["MD"]}></i></span></Column>
                                        <Column size={[3, 3, 3, 3]} className="list-center-header"><span><i className={IconsConfiguracion["LG"]}></i></span></Column>
                                    </Row>
                                    <Row>
                                        <Column size={[3, 3, 3, 3]}>
                                            {item.xs > 0 ? item.xs + "%" : ""}
                                        </Column>
                                        <Column size={[3, 3, 3, 3]}>
                                            {item.sm > 0 ? item.sm + "%" : ""}
                                        </Column>
                                        <Column size={[3, 3, 3, 3]} >
                                            {item.md > 0 ? item.md + "%" : ""}
                                        </Column>
                                        <Column size={[3, 3, 3, 3]} >
                                            {item.lg > 0 ? item.lg + "%" : ""}
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>   
                        </div>
                        </div>;
                    }}>
                </page.SectionList>
            </div>
        };
    });


    interface ISectionConfiguraction extends page.IProps {
        configuracionCatalogo: any;
        SeccionSelected?: any;
        configuracionCatalogoTemporal?: any;
        SeccionGlobal?: any;
    };

    let SectionConfiguracionView: any = global.connect(class extends React.Component<ISectionConfiguraction, ISectionConfiguraction> {
        constructor(props: ISectionConfiguraction) {
            super(props);
            this.onClickItem = this.onClickItem.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.SeccionSelected = state.global[SECTION_SECCION_SELECCIONADA_ID]
            retValue.configuracionCatalogo = state.global["catalogo$" + SECTION_CONFIGURACION_ID]
            return retValue;
        };

        shouldComponentUpdate(nextProps: ISectionConfiguraction, { }): boolean {
            return hasChanged(this.props.configuracionCatalogo, nextProps.configuracionCatalogo)
                || hasChanged(this.props.SeccionSelected, nextProps.SeccionSelected);
        };

        onClickItem(item: any) {
        };

        render(): JSX.Element {
            return <div >
                <page.SectionList
                    id={SECTION_CONFIGURACION_ID}
                    parent={PAGE_ID}
                    icon={"fa fa-cog"}
                    title={"Configuración"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={false}
                    onItemClick={this.onClickItem.bind(this)}
                    height={"420px"}
                    drawOddLine={true}
                    selectable={true}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Campo"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Etiqueta"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Tipo"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Visible"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Obligatorio"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header"><span><i className={IconsConfiguracion["XS"]}></i></span></Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header"><span><i className={IconsConfiguracion["SM"]}></i></span></Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header"><span><i className={IconsConfiguracion["MD"]}></i></span></Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header"><span><i className={IconsConfiguracion["LG"]}></i></span></Column>
                        </Row>
                    </div>}
                    formatter={(index: number, item: any) => {
                        return <Row>
                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                                <span>{item.Campo.Nombre} </span>
                            </Column>
                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                                <span>{item.Etiqueta}</span>
                            </Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                <span className="badge badge-info"><i className={IconsTipoCampo[item.Campo.TipoCampo.Clave]}></i></span>
                            </Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                {EK.UX.Labels.ok(item.Visible)}
                            </Column>
                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                                {EK.UX.Labels.ok(item.Requerido)}
                            </Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                {item.xs > 0 ? item.xs + "%" : ""}
                            </Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                {item.sm > 0 ? item.sm + "%" : ""}
                            </Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                {item.md > 0 ? item.md + "%" : ""}
                            </Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                {item.lg > 0 ? item.lg + "%" : ""}
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>
            </div>
        };
    });


    let SectionConfiguracionEdit: any = global.connect(class extends React.Component<ISectionConfiguraction, ISectionConfiguraction> {
        constructor(props: ISectionConfiguraction) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.configuracionCatalogo = state.global["catalogo$" + SECTION_CONFIGURACION_ID];
            retValue.configuracionCatalogoTemporal = state.global["catalogo$" + SECTION_CONFIGURACION_ID_TEMPORAL];
            retValue.SeccionGlobal = state.global["catalogo$" + SECTION_SECCIONES_ID];
            retValue.SeccionSelected = state.global[SECTION_SECCION_SELECCIONADA_ID];
            return retValue;
        };
        componentWillReceiveProps(nextProps: ISectionConfiguraction): any {
            let seccionSeleccionadaId: any = getDataID(nextProps.SeccionSelected);


            if (hasChanged(this.props.configuracionCatalogoTemporal, nextProps.configuracionCatalogoTemporal)) {
                if (nextProps.configuracionCatalogoTemporal != null && nextProps.configuracionCatalogoTemporal != undefined) {

                    let ItemsTemporales: any = getData(nextProps.configuracionCatalogoTemporal);
                    if (ItemsTemporales.length > 0) {
                        if (ItemsTemporales && ItemsTemporales != undefined && ItemsTemporales.length > 0) {
                            ItemsTemporales.forEach((value: any, index: number) => {
                                if (value.Seccion.ID != seccionSeleccionadaId) {
                                    value["_eliminado"] = true;
                                } else {
                                    value["_eliminado"] = false;
                                }
                                value["_indexMap"] = index;
                            });
                        }
                        global.dispatchSuccessful("global-page-data", ItemsTemporales, SECTION_CONFIGURACION_ID);
                    } else {
                        global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID);
                    }
                }
            }

            if (hasChanged(this.props.SeccionSelected, nextProps.SeccionSelected)) {
                if (nextProps.SeccionSelected != null && nextProps.SeccionSelected != undefined) {
                    if (seccionSeleccionadaId != 0) {
                        let formConfiguraciones: any = Forms.getValue(SECTION_CONFIGURACION_ID, config.id);
                        let ItemsConfig: any = getData(formConfiguraciones);
                        
                        if (ItemsConfig && ItemsConfig != undefined && ItemsConfig.length > 0) {
                            ItemsConfig.forEach((value: any, index: number) => {
                                if (value.Seccion.ID != seccionSeleccionadaId) {
                                    value["_eliminado"] = true;
                                } else {
                                    value["_eliminado"] = false;
                               }
                            });
                            global.dispatchSuccessful("global-page-data", global.createSuccessfulStoreObject(ItemsConfig), SECTION_CONFIGURACION_ID);
                        }
                    }

                }
            }

        };
        componentDidMount(): void {

            let TipoEntidad: any = Forms.getValue("TipoEntidad", config.id);
            let TipoEntidadID: number = TipoEntidad.ID ? TipoEntidad.ID : 0;
            
            if (TipoEntidadID > 0) {
                let parametros: string = global.encodeObject({ IdTipoEntidad: TipoEntidadID});
                dispatchAsync("global-page-data", "base/kontrol/PersonalizarCampos/Get/GetAllConfiguracion/" + parametros, SECTION_CONFIGURACION_ID_TEMPORAL);
            } else {
                global.dispatchSuccessful("global-page-data", [], SECTION_CONFIGURACION_ID_TEMPORAL);
            }
        };
        componentDidUpdate(prevProps: ISectionConfiguraction, { }): any {
        };

        onDeleteConfiguration(item: any): any{
                let $ml: any = this.props.config.getML();
                EK.Global.confirm($ml.autorizacionConfiguracion.descripcion, $ml.autorizacionConfiguracion.titulo, () => {
                    let idCampoOpcion = item.ID ? item.ID : 0;
                    let TipoEntidad: any = Forms.getValue("TipoEntidad", config.id);
                    let idTipoEntidad: number = TipoEntidad.ID ? TipoEntidad.ID : 0;
                    if(idCampoOpcion > 0) {
                        let parametros: string = global.encodeObject({ OperacionEspecificaSP: "ConfiguracionesConDatos", IdCampoOpcion: idCampoOpcion, IdTipoEntidad: idTipoEntidad });
                        dispatchAsync("global-page-data", "base/kontrol/PersonalizarCampos/Get/deleteConfigurationById/" + parametros, SECTION_CONFIGURACION_ID_TEMPORAL);
                        global.info($ml.autorizacionConfiguracion.deshabilitada);
                    } else {
                        let ValueForm: any = Forms.getValue(SECTION_CONFIGURACION_ID, config.id);
                        let dataValue: any = getData(ValueForm);

                        for (var i = 0; i < dataValue.length; i++) {
                            if (dataValue[i].ID === idCampoOpcion) {
                                dataValue.splice(i, 1);
                            }
                        }
                        Forms.updateFormElement(config.id, SECTION_CONFIGURACION_ID, createSuccessfulStoreObject(dataValue));
                        global.info($ml.autorizacionConfiguracion.mensaje);
                    }
                });
        };

        shouldComponentUpdate(nextProps: ISectionConfiguraction, nextState: ISectionConfiguraction): boolean {
            return hasChanged(this.props.configuracionCatalogo, nextProps.configuracionCatalogo);
        };
        render(): JSX.Element {

            if (page.canViewReadMode()) {
                return null;
            }
            //let ml: any = buscarML();
            let deleteConfiguration: any = {
                icon: "fal fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onDeleteConfiguration(item);
                }
            };

            return <page.SectionList
                id={SECTION_CONFIGURACION_ID}
                parent={PAGE_ID}
                icon={"fa fa-cog"}
                title={"Configuración"}
                size={[12, 12, 12, 12]}
                level={1}
                horizontalScrolling={false}
                height={"420px"}
                drawOddLine={true}
                selectable={true}
                readonly={false}
                addRemoveButton={false}
                hideNewButton={true}
                items={createSuccessfulStoreObject([])}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Campo"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Etiqueta"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Tipo"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Visible"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Obligatorio"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header"><span><i className={IconsConfiguracion["XS"]}></i></span></Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header"><span><i className={IconsConfiguracion["SM"]}></i></span></Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header"><span><i className={IconsConfiguracion["MD"]}></i></span></Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header"><span><i className={IconsConfiguracion["LG"]}></i></span></Column>
                    </Row>
                </div>}
                formatter={(index: number, item: any): any => {
                    let indexSeccion:number = item._indexMap;
                    return <div id={"row_conf_seccion_id" + item.ID} className={"panel-collapsed listItem-default-header "} style={{ marginBottom: "10px", marginTop: "10px" }}>
                        <Column size={[1, 1, 1, 1]} >
                            <CollapseButton idElement={"row_conf_seccion_id" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            {item.Nombre}
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                            <input.Text property={SECTION_CONFIGURACION_ID} index={indexSeccion} value={item.Etiqueta != "" ? item.Etiqueta : ""} id="Etiqueta" idFormSection={config.id} />
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            {item.Clave}
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <checkBox.CheckBox textAlign="center" property={SECTION_CONFIGURACION_ID}
                                value={item.Visible} index={indexSeccion} id={"Visible"} idFormSection={config.id} />
                        </Column>

                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <checkBox.CheckBox textAlign="center" property={SECTION_CONFIGURACION_ID}
                                value={item.Requerido} index={indexSeccion} id={"Requerido"} idFormSection={config.id} />
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <input.Porcentaje property={SECTION_CONFIGURACION_ID} index={indexSeccion} value={item.xs > 0 ? item.xs : null} id="xs" idFormSection={config.id} />
                        </Column>

                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <input.Porcentaje property={SECTION_CONFIGURACION_ID} index={indexSeccion} value={item.sm > 0 ? item.sm : null} id="sm" idFormSection={config.id} />
                        </Column>

                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <input.Porcentaje property={SECTION_CONFIGURACION_ID} index={indexSeccion} value={item.md > 0 ? item.md : null} id="md" idFormSection={config.id} />
                        </Column>

                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <input.Porcentaje property={SECTION_CONFIGURACION_ID} index={indexSeccion} value={item.lg > 0 ? item.lg : null} id="lg" idFormSection={config.id} />
                        </Column>
                        <Column size={[1, 1, 1, 1]}>
                            <buttons.PopOver idFormSection={SECTION_CONFIGURACION_ID} info={item}
                                extraData={[deleteConfiguration]} />
                        </Column>
                        <Row id={"row_conf_seccion_id" + indexSeccion}>
                            <Column
                                xs={{ size: 10 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 10, offset: 1 }}
                                lg={{ size: 10, offset: 1 }}
                                className="panel-detail well well-sm">
                                <Row>
                                    <Column size={[3, 3, 3, 3]} ><span style={{ paddingLeft: "85px" }}>Sección</span></Column>
                                </Row>
                                <Column size={[5, 5, 5, 5]}>
                                    <SeccionesDisponiblesDDL index={indexSeccion} property={SECTION_CONFIGURACION_ID} value={item.Seccion} id="Seccion" idFormSection={config.id} />
                                </Column>
                        </Column>
                        </Row>
                    </div>;
                }}/>
        };
    });

    interface ISeccionesDipDDL extends IDropDrownListProps {
     
    }

    export let SeccionesDisponiblesDDL: any = global.connect(class extends React.Component<ISeccionesDipDDL , {}> {
        static props: any = (state: any) => ({
            items: state.global["catalogo$" + SECTION_DDL_SECIONES_EDIT]
        });
        static defaultProps: ISeccionesDipDDL = {
            id: "TipoSeccionConfiguracion",
            items: createDefaultStoreObject([]),
            label: "Tipo Sección",
            helpLabel: "Seleccione un Tipo de Sección",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
        };

        componenDidMount() {
            global.dispatchSuccessful("global-page-data", [], SECTION_DDL_SECIONES_EDIT);
        }
         render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form  {...this.props} />;
        }
    });


    interface ISectionCampos extends page.IProps {
        Items?: any;
        SeccionSelected?: any;
        TipoCampo?: any;
    };

    let SectionCampos: any = global.connect(class extends React.Component<ISectionCampos, ISectionCampos> {
        constructor(props: ISectionCampos) {
            super(props);
            this.onClickItem = this.onClickItem.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.Items = state.global["catalogo$" + SECTION_CAMPOS_ID]
            retValue.SeccionSelected = state.global[SECTION_SECCION_SELECCIONADA_ID]
            retValue.TipoCampo = Forms.getValue("TipoCampo", PAGE_ID);
            return retValue;
        };

        asignarElemento(index: any, item: any, e: any): void {
            let arrayConfiguracion: any[] = new Array();
            let ValueForm: any = Forms.getValue(SECTION_CONFIGURACION_ID, config.id);
            let dataValue: any = getData(ValueForm);
            let seccion: any = getData(this.props.SeccionSelected);

            let idSeccionAsignar: number = ValueForm.getNextLowerID();
            if (seccion && seccion != undefined && seccion.ID) {
                let retValue: any = global.assign({}, {
                    ID: idSeccionAsignar,
                    IdCampo: item.ID,
                    IdSeccion: seccion.ID,
                    Seccion: seccion,
                    Nombre: item.Nombre,
                    Etiqueta: item.Etiqueta,
                    Clave: item.TipoCampo.Clave,
                    Visible: true,
                    Requerido: false,
                    xs: 100,
                    sm: 100,
                    md: 100,
                    lg: 100,
                    _eliminado: false,
                    _nuevo: true,
                    _indexMap: dataValue.length
                });



                dataValue.push(retValue);
                let elementos = createSuccessfulStoreObject(dataValue);
                Forms.updateFormElement(config.id, SECTION_CONFIGURACION_ID, elementos);
            }
            else {
                warning("Para agregar el campo se debe seleccionar una sección");
            }
        }

        shouldComponentUpdate(nextProps: ISectionCampos, { }): boolean {
            return hasChanged(this.props.Items, nextProps.Items) ||
                hasChanged(this.props.TipoCampo, nextProps.TipoCampo);
        };

        componentWillReceiveProps(nextProps: ISectionCampos): any {
            if (hasChanged(this.props.TipoCampo, nextProps.TipoCampo)) {
                    if (nextProps.TipoCampo != null && nextProps.TipoCampo != undefined) {
                        let TipoCampoID: any = nextProps.TipoCampo.ID;
                        if (TipoCampoID > 0) {
                            let parametros: string = global.encodeObject({ IdTipo: TipoCampoID });
                            dispatchAsync("global-page-data", "base/scv/PersonalizarCampos/Get/GetAll/" + parametros, SECTION_CAMPOS_ID);
                        } else {
                            global.dispatchAsync("global-page-data", "base/scv/PersonalizarCampos/Get/GetAll/", SECTION_CAMPOS_ID);
                        }
                    }
            }
        };

        onClickItem(item: any) {
        };

        render(): JSX.Element {
            let campos: any = getData(this.props.Items);

            return <div>
                <List
                    id={SECTION_CAMPOS_ID}
                    items={global.createSuccessfulStoreObject(campos)}
                    dragAndDrop={true}
                    readonly={true}
                    listMode={"literal"}
                    horizontalScrolling={false}
                    onItemClick={this.onClickItem.bind(this)}
                    height={"420px"}
                    drawOddLine={true}
                    selectable={true}
                    addRemoveButton={false}
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px"}}>
                            <Row>
                                <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;
                                    <span>&nbsp;</span>
                                </Column>
                                <Column size={[7, 7, 7, 7]} className="list-default-header">
                                    <span style={{ fontSize: "11px" }}>{"Campo"}</span>
                                </Column>
                                <Column size={[3, 3, 3, 3]} className="list-default-header">
                                    <span style={{ fontSize: "11px" }}>{"Tipo"}</span>
                                </Column>
                            </Row>
                        </div>}
                    formatter={(index: number, item: any) => {
                        return <div className={"listItem-default-item "} style={{ marginBottom: "5px" }}>
                            <Row>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">
                                    <i className="fa fa-plus-square" title="Agregar Campo" style={{ color: "blue", cursor: "pointer", fontSize: "15px" }} onClick={(e) => this.asignarElemento(index, item, e)}></i>
                                </Column>
                                <Column size={[7, 7, 7, 7]} className="listItem-default-item">
                                    <span>{item.Nombre}</span>
                                </Column>
                                <Column size={[3, 3, 3, 3]} className="listItem-default-item">
                                    <span className="badge badge-info"><i className={IconsTipoCampo[item.TipoCampo.Clave]}></i></span>
                                </Column>
                            </Row>
                        </div>;
                    }}/>
            </div>
        };
    });

    interface ISectionFieldsRendering extends page.IProps {
        TipoProyecto?: any;
        entityState?: DataElement;
    };
    let SectionFieldsRendering: any = global.connect(class extends React.Component<ISectionFieldsRendering, ISectionFieldsRendering> {
        constructor(props: ISectionFieldsRendering) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.TipoProyecto = Forms.getValue("TipoEntidad", config.id);
            retValue.entityState = state.global.currentEntityState
            return retValue;
        };
        shouldComponentUpdate(nextProps: ISectionFieldsRendering, { }): boolean {
            return hasChanged(this.props.TipoProyecto, nextProps.TipoProyecto)
                || hasChanged(this.props.entityState, nextProps.entityState);
        };

        render(): JSX.Element {
            let tipoProyecto: any = this.props.TipoProyecto;
            let claveProyecto: string = "";

            if (tipoProyecto != null && tipoProyecto != undefined && tipoProyecto.ID && tipoProyecto.ID > 0) {
                claveProyecto = tipoProyecto.Clave;
            }
            return <FieldsRendering modoView={this.props.entityState} tipoEntidad={claveProyecto} />
        };
    });

    export interface IEntidadButton extends EK.UX.Buttons.IButtonProps {
        estado: any;
    }
    let EditarEntidad: any = global.connect(class extends React.Component<IEntidadButton, {}> {
        constructor(props: IEntidadButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            estado: state.global.currentEntityState
        });
        static defaultProps: IEntidadButton = {
            icon: "fa fa-edit",
            text: "",
            color: "white",
            className: "btn-editar btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined,
            estado: undefined,
        };
        onClick(): void {
            if (this.props.onClick) {
                this.props.onClick();
            }
        };
        shouldComponentUpdate(nextProps: IEntidadButton, nextState: IEntidadButton): boolean {
            return hasChanged(this.props.estado, nextProps.estado)
        };
        render(): JSX.Element {
            let estadoEntidad: any = getData(this.props.estado);
            let canPageEdit: boolean = estadoEntidad && estadoEntidad.viewMode ? estadoEntidad.viewMode : false;

            if (canPageEdit == false) {
                return null;
            }
            let className: string;
            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn btn-default-ek";
            }

            return <Button {...this.props} className={className} onClick={this.onClick} />

        };
    });

};