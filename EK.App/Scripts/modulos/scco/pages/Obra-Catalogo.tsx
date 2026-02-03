namespace EK.Modules.SCCO.Pages.Obra {
    "use strict";
    const PAGE_ID: string = "Obra";
    const PAGE_OBRA_UNIVERSAL_ID: string = "obra$universal";
    const PAGE_INDIRECTOS_ID: string = "ObraIndirectos";
    const PAGE_INDIRECTOS_TARJETA_ID: string = "ObraIndirectoTarjetas"
    const PAGE_VALIDACIONES_ID: string = "ObraValidaciones";
    const PAGE_COMPANIAS: string = "ObraCompanias";
    const PAGE_NIVELES: string = "ObraNiveles";
    const MODAL_GPS_ID: string = "modal" + PAGE_ID;

    const config: page.IPageConfig = global.createPageConfig("Obra", "scco", [
        PAGE_VALIDACIONES_ID,
        PAGE_INDIRECTOS_ID,
        PAGE_INDIRECTOS_TARJETA_ID,
        PAGE_COMPANIAS,
        PAGE_NIVELES
    ]);

    interface IPageEditProps extends page.IProps, grid.IColumn {
        tipoIndirecto?: DataElement;
        wbsNivel: DataElement;
        wbsNiveles?: DataElement;
    };

    interface IMapViewerButtonProps extends IButtonProps {
        entidad?: DataElement;
        entityType?: string;
        dataManager?: StateDataManager;
        url?: string;
        showUpdateGeo?: boolean;
        showRelateLocation?: boolean;
        config?: page.IPageConfig;
        state?: DataElement;
    };

    export const Edicion: any = page.connect(class extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject("Desarrollo")
                .addObject("CentroCosto")
                .addObject("TipoObra")
                .addString("Contrato")
                .addString("Direccion")
                .addObject("EstadoObra")
                .addString("UbicacionObra")
                .addString("Responsable")
                .addObject("TipoFSR")
                .addNumber("FactorFSR")
                .addObject("InsumoFSR")
                .addBoolean("ValuacionActualizada")
                .addString("Geolocalizacion")
                .addObject("Asentamiento")
                .addNumber("MinimoWBSNivel")
                .addNumber("MaximoWBSNivel")
                .addBoolean("ObraUniversal")
                .addBoolean("AfectaObraUniversal")
                .addObject("Obra")
                .addObject("Tabulador")
                .addObject(PAGE_INDIRECTOS_ID)
                .addObject(PAGE_VALIDACIONES_ID)
                .addObject(PAGE_INDIRECTOS_TARJETA_ID)
                .addObject(PAGE_COMPANIAS)
                .addObject(PAGE_NIVELES)
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let entidad: any = getData(props.entidad);
            let idEntidad: number = getDataID(props.entidad);
            let idDesarrollo = props.entidad.data.IdDesarrollo;

            if (idEntidad <= 0 || idEntidad === undefined) {
                global.dispatchSuccessful("global-page-data", [], PAGE_INDIRECTOS_ID)
                global.dispatchSuccessful("global-page-data", [], PAGE_VALIDACIONES_ID)
                global.dispatchSuccessful("global-page-data", [], PAGE_INDIRECTOS_TARJETA_ID)
                global.dispatchSuccessful("global-page-data", [], PAGE_COMPANIAS)
                global.dispatchSuccessful("global-page-data", [], PAGE_NIVELES)
                setGeoInfo(null);
            } else {
                global.dispatchSuccessful("global-page-data", entidad.ObraIndirectos, PAGE_INDIRECTOS_ID)
                global.dispatchSuccessful("global-page-data", entidad.ObraValidaciones, PAGE_VALIDACIONES_ID)
                global.dispatchSuccessful("global-page-data", entidad.ObraIndirectoTarjetas, PAGE_INDIRECTOS_TARJETA_ID)
                global.dispatchSuccessful("global-page-data", entidad.ObraCompanias, PAGE_COMPANIAS)
                global.dispatchSuccessful("global-page-data", entidad.ObraNiveles, PAGE_NIVELES)
                setGeoInfo(entidad);
            };
            //
            if (idEntidad == -1 && entidad.IdObra > 0) {
                props.config.updateForm();
                //
                global.dispatchSuccessful("global-page-data", entidad.ObraIndirectos, PAGE_INDIRECTOS_ID)
                global.dispatchSuccessful("global-page-data", entidad.ObraValidaciones, PAGE_VALIDACIONES_ID)
                global.dispatchSuccessful("global-page-data", entidad.ObraIndirectoTarjetas, PAGE_INDIRECTOS_TARJETA_ID)
                global.dispatchSuccessful("global-page-data", entidad.ObraCompanias, PAGE_COMPANIAS)
                global.dispatchSuccessful("global-page-data", entidad.ObraNiveles, PAGE_NIVELES)
                //
                setGeoInfo(entidad);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <PageButtons>
                    <ExpMapViewerButton />
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    });

    let ExpMapViewerButton: any = global.connect(class extends React.Component<IMapViewerButtonProps, {}> {
        constructor(props: IMapViewerButtonProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            info: state.global["catalogo$" + MODAL_GPS_ID],
            entidad: state.global.currentEntity,
            state: state.global.currentEntityState
        });
        static defaultProps: IMapViewerButtonProps = {
            id: "btnMap",
            icon: "fa fa-map-pin",
            text: "",
            color: "white",
            className: "btn-ver btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(e: any): any {
            let item: EditForm = new EditForm();
            let obra: any;
            let isReadMode: boolean = page.canViewReadMode(this.props.state);
            //
            if (isReadMode === true) {
                obra = global.getData(this.props.entidad);
            } else {
                obra = item
                    .addString("Geolocalizacion")
                    .addString("Direccion")
                    .addString("UbicacionObra")
                    .addObject("Asentamiento")
                    .toObject();
            };
            //
            if (isReadMode === true && !obra.Geolocalizacion) {
                global.warning("No se ha establecido la información de geo-localización");
                return;
            };
            //
            setGeoInfo(obra, isReadMode);
            global.goModal(MODAL_GPS_ID, "/kontrol/map/markers?callback=" + MODAL_GPS_ID);
        };
        componentWillUnmount(): void {
            global.setModalData(MODAL_GPS_ID, undefined);
        };
        render(): JSX.Element {
            let icon: string = "fa fa-map-pin";
            //
            if (global.isSuccessful(this.props.info)) {
                icon = "fa fa-map-pin";
            } else if (global.isLoadingOrUpdating(this.props.info)) {
                icon = "fa fa-refresh fa-spin";
            };
            //
            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.Read}>
                <div style={{ display: "inline-block" }}>
                    <modal.Modal id={MODAL_GPS_ID} url={"about:blank"}></modal.Modal>
                    <Button {...this.props} onClick={this.onClick} icon={icon} />
                </div>
            </Authorize>;
        };
    });

    const setGeoInfo: (cliente: any, readOnly?: boolean) => void = (cliente: any, readOnly?: boolean): void => {
        let mode: string = "read";
        if (readOnly === false) {
            mode = "select";
        };
        //
        if (!cliente) {
            global.setModalData(MODAL_GPS_ID, null);
            return;
        };
        //
        let fullAddress: string = undefined;
        let geoLocalizacion: string = undefined;
        //
        if (cliente.Geolocalizacion) {
            geoLocalizacion = cliente.Geolocalizacion;
        } else {
            fullAddress = [cliente.Direccion, " ", cliente.UbicacionObra, ", ", cliente.Asentamiento.Nombre, ", ", cliente.Asentamiento.Localidad.Nombre, ", ", cliente.Asentamiento.CP].join("");
        };
        //
        global.setModalData(MODAL_GPS_ID, {
            mode: mode,
            geolocalizacion: geoLocalizacion,
            address: fullAddress,
            marker: {
                icon: "/Content/Img/maps/man_red_circle.png",
                markerType: "prospecto",
                title: "Prospecto/Cliente"
            },
            onMapLocationChanged: (p: any) => {
                Forms.updateFormElement(config.id, "Geolocalizacion", p);
            }
        });
    };

    let SeccionIndirectos: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoIndirecto = Forms.getDataValue("TipoIndirecto", PAGE_INDIRECTOS_ID, state);
            return retValue;
        };
        componentWillReceiveProps(nextProps: IPageEditProps) {
            if (global.hasChanged(this.props.tipoIndirecto, nextProps.tipoIndirecto)) {
                if (global.isSuccessful(nextProps.tipoIndirecto)) {
                    let tipoIndirecto: any = global.getData(nextProps.tipoIndirecto);
                    if (tipoIndirecto) {
                        if (tipoIndirecto.Clave != "TI") {
                            Forms.updateFormElement(PAGE_INDIRECTOS_ID, "TipoInsumo", "");
                        };
                    };
                };
            };
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let validacion: boolean;
            //
            if (global.isSuccessful(this.props.tipoIndirecto)) {
                let tipoIndirecto: any = global.getData(this.props.tipoIndirecto);
                if (tipoIndirecto) {
                    if (tipoIndirecto.Clave === "TI") {
                        validacion = true;
                    };
                };
            };
            //
            return <page.SectionList
                id={PAGE_INDIRECTOS_ID}
                title={"Indirectos"}
                parent={config.id}
                icon="fas fa-scroll"
                level={1}
                size={this.props.size}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tipo Indirecto"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Nivel"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Porcentaje"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tipo Insumo"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addClave()
                        .addEstatus()
                        .addNombre()
                        .addObject("Nivel")
                        .addNumber("Porcentaje")
                        .addObject("TipoIndirecto")
                        .addObject("TipoInsumo")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.Nombre}</span>
                        </Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{item.TipoIndirecto.Nombre}</span></Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{item.Nivel.Nombre}</span></Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{item.Porcentaje}</span></Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item"><span>{item.TipoInsumo.Nombre}</span></Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={PAGE_INDIRECTOS_ID} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <input.Nombre size={[6, 6, 6, 6]} idFormSection={PAGE_INDIRECTOS_ID} validations={[validations.required()]} />
                    <ddl.TipoNivelIndirectoDDL id="Nivel" size={[6, 6, 6, 6]} idFormSection={PAGE_INDIRECTOS_ID} addNewItem={"SO"} validations={[validations.required()]} />
                    <ddl.TipoIndirectoDDL id="TipoIndirecto" size={[6, 6, 6, 6]} idFormSection={PAGE_INDIRECTOS_ID} addNewItem={"SO"} validations={[validations.required()]} />
                    {validacion === true ? <ddl.TipoInsumoDDL id="TipoInsumo" size={[6, 6, 6, 6]} idFormSection={PAGE_INDIRECTOS_ID} addNewItem={"SO"} validations={[validations.required()]} /> : null}
                    <input.Porcentaje id="Porcentaje" size={[6, 6, 6, 6]} idFormSection={PAGE_INDIRECTOS_ID} validations={[validations.required()]} />
                </Row>
            </page.SectionList>
        }
    });

    let SeccionValidacion: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={PAGE_VALIDACIONES_ID}
                title={"Validaciones"}
                parent={config.id}
                icon="fas fa-briefcase"
                level={1}
                size={this.props.size}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 2, 3, 3]} className="list-default-header">{"Clave"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tipo de Validación"}</Column>
                        <Column size={[12, 3, 2, 2]} className="list-default-header">{"Operador"}</Column>
                        <Column size={[12, 3, 2, 2]} className="list-default-header">{"Valor"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addClave()
                        .addEstatus()
                        .addNombre()
                        .addObject("TipoValidacion")
                        .addObject("Operacion")
                        .addObject("Valor")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.Clave}</span>
                        </Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{item.Nombre}</span></Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{item.TipoValidacion.Nombre}</span></Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{item.Operacion.Nombre}</span></Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{item.Valor}</span></Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={PAGE_VALIDACIONES_ID} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <input.Clave size={[6, 6, 4, 4]} maxLength={50} idFormSection={PAGE_VALIDACIONES_ID} />
                    <input.Nombre size={[6, 6, 8, 8]} idFormSection={PAGE_VALIDACIONES_ID} validations={[validations.required()]} />
                    <ddl.TipoValidacionDDL id="TipoValidacion" size={[6, 6, 4, 4]} idFormSection={PAGE_VALIDACIONES_ID} validations={[validations.required()]} />
                    <ddl.OperadoresDDL id={"Operacion"} size={[6, 6, 4, 4]} idFormSection={PAGE_VALIDACIONES_ID} validations={[validations.required()]} />
                    <input.Integer id="Valor" size={[6, 6, 4, 4]} idFormSection={PAGE_VALIDACIONES_ID} validations={[validations.required()]} />
                </Row>
            </page.SectionList>
        }
    });

    let SeccionIndirectosTarjeta: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={PAGE_INDIRECTOS_TARJETA_ID}
                title={"Indirectos Tarjeta"}
                parent={config.id}
                icon="fas fa-book"
                level={1}
                size={this.props.size}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tarjeta"}</Column>
                        <Column size={[12, 2, 3, 3]} className="list-default-header">{"Descripción Tarjeta"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Porcentaje"}</Column>
                        <Column size={[12, 3, 2, 2]} className="list-default-header">{"Monto Valuación"}</Column>
                        <Column size={[12, 3, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])}
                readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addClave()
                        .addEstatus()
                        .addNombre()
                        .addObject("Tarjeta")
                        .addNumber("Porcentaje")
                        .addNumber("MontoValuacion")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.Tarjeta.Clave}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item"><span>{item.Tarjeta.Nombre}</span></Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item"><span>{item.Porcentaje}</span></Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{item.MontoValuacion}</span></Column>
                        <Column size={[3, 3, 1, 1]} className="listItem-default-item"><span>{item.Estatus.Nombre}</span></Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={PAGE_INDIRECTOS_TARJETA_ID} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <ddl.SCCOTarjetasDDL size={[12, 12, 10, 10]} idFormSection={PAGE_INDIRECTOS_TARJETA_ID} validations={[validations.required()]} />
                    <checkBox.Status size={[12, 12, 2, 2]} idFormSection={PAGE_INDIRECTOS_TARJETA_ID} validations={[validations.required()]} />
                    <input.Porcentaje id="Porcentaje" size={[12, 12, 6, 6]} idFormSection={PAGE_INDIRECTOS_TARJETA_ID} validations={[validations.required()]} />
                    <input.Integer id="MontoValuacion" size={[12, 12, 6, 6]} idFormSection={PAGE_INDIRECTOS_TARJETA_ID} validations={[validations.required()]} />
                </Row>
            </page.SectionList>
        }
    })

    let SeccionCompanias: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={PAGE_COMPANIAS}
                title={"Compañias de Ejecución"}
                parent={config.id}
                icon="fas fa-building"
                level={1}
                size={this.props.size}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[6, 6, 6, 5]} className="list-default-header">{"Clave"}</Column>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">{"Nombre"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addClave()
                        .addEstatus()
                        .addNombre()
                        .addObject("Compania")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[6, 6, 6, 5]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.Compania.Clave}</span>
                        </Column>
                        <Column size={[6, 6, 6, 6]} className="listItem-default-item"><span>{item.Compania.Nombre}</span></Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={PAGE_COMPANIAS} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <ddl.CompaniaDDL idFormSection={PAGE_COMPANIAS} size={[12, 12, 12, 12]} addNewItem={"SO"} validations={[validations.required()]} />
                </Row>
            </page.SectionList>
        }
    });

    let SectionNivelesWbs: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps>{
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveNivel = this.onSaveNivel.bind(this);
            this.onValidate = this.onValidate.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.wbsNivel = Forms.getDataValue("WBSNivel", PAGE_NIVELES, state);
            retValue.wbsNiveles = Forms.getValue(PAGE_NIVELES, config.id)
            return retValue;
        };
        componentWillReceiveProps(nextProps: IPageEditProps) {
            if (global.hasChanged(this.props.wbsNivel, nextProps.wbsNivel)) {
                if (global.isSuccessful(nextProps.wbsNivel)) {
                    let nivel: any = global.getData(nextProps.wbsNivel);
                    if (nivel) {
                        if (nivel.Clave === "T") {
                            Forms.updateFormElement(PAGE_NIVELES, "TipoNivel", null)
                        }
                    }
                };
            };
        };
        onValidate(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.TipoNivel != null) {
                items.forEach((value: any, index: number) => {
                    if (value.IdTipoNivel === item.TipoNivel.ID)
                        result = true
                    if (item.WBSNivel.Clave === "T") {
                        if (value.IdWBSNivel === item.WBSNivel.ID) {
                            result = true
                        }
                    }
                });
            }
            return result;
        };
        onSaveNivel(): void {
            let item: EditForm = Forms.getForm(PAGE_NIVELES);
            if (this.onValidate(item, PAGE_NIVELES)) {
                warning('Ingrese otro tipo de nivel o modifique uno ya existente', 'Nivel ya capturado')
                return;
            } else {
                let entidades: DataElement = this.props.config.getCatalogo(PAGE_NIVELES);
                let elemento: any = item
                    .addID()
                    .addEstatus()
                    .addNumber("Nivel")
                    .addObject("WBSNivel")
                    .addObject("TipoNivel")
                    .addVersion()
                    .toObject();
                //
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    };
                };
                //
                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, PAGE_NIVELES, retValue);
                global.dispatchSuccessful("global-page-data", retValue, PAGE_NIVELES);
                this.props.config.setState({ viewMode: true }, PAGE_NIVELES);
            };
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let mostrar: boolean;
            let allowEdit: boolean = false;
            //
            if (global.isSuccessful(this.props.wbsNivel)) {
                let level: any = global.getData(this.props.wbsNivel);
                if (level) {
                    if (level.Clave === "N") {
                        mostrar = true;
                    };
                };
            };
            //
            if (global.isSuccessful(this.props.wbsNiveles)) {
                let wbsNiveles: DataElement = this.props.wbsNiveles.getActiveItems();
                if (wbsNiveles) {
                    let items = global.getData(wbsNiveles);
                    if (items) {
                        if (items.find(x => x.WBSNivel.Clave === "T")) {
                            allowEdit = true;
                        } else {
                            allowEdit = false;
                        };
                    };
                };
            };
            //
            return <page.SectionList
                id={PAGE_NIVELES}
                parent={config.id}
                icon="fas fa-scroll"
                level={1}
                onSave={this.onSaveNivel}
                size={this.props.size}
                style={{ paddingTop: 12 }}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Nivel"}</Column>
                        <Column size={[12, 4, 4, 4]} className="list-default-header">{"Nivel WBS"}</Column>
                        <Column size={[12, 4, 4, 4]} className="list-default-header">{"Tipo de Nivel"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                hideNewButton={allowEdit}
                mapFormToEntity={(form: EditForm): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .addNumber("Nivel")
                        .addObject("WBSNivel")
                        .addObject("TipoNivel")
                        .addVersion()
                        .toObject();
                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                            <span style={{ marginRight: 10 }}>{item.Nivel} </span>
                        </Column>
                        <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                            <span>{item.WBSNivel.Nombre}</span>
                        </Column>
                        <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                            <span>{!(item.TipoNivel) ? "" : item.TipoNivel.Nombre}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={PAGE_NIVELES} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <WbSNiveles id="WBSNivel" idFormSection={PAGE_NIVELES} size={[12, 12, 4, 4]} addNewItem={"SO"} validations={[validations.required()]} />
                    {mostrar === true ? <ddl.SCCOTiposNivelesDDL id="TipoNivel" idFormSection={PAGE_NIVELES} size={[12, 12, 4, 4]} /> : null}
                </Row>
            </page.SectionList>
        }
    });

    export let WbSNiveles: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SCCOWBSTIPOSNODOS
        });
        static defaultProps: IDropDrownListProps = {
            id: "WbsNivel",
            items: createDefaultStoreObject([]),
            label: "Nivel WBS",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (item.Clave == 'N' || item.Clave == 'T')
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span>"].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::SCCOWBSTIPOSNODOS", "catalogos/get(SCCOWBSTIPOSNODOS)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export let ObrasUniversales: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListProps>{
        static props: any = (state: any) => ({
            items: state.global.ObrasUniversales
        });
        static defaultProps: IDropDrownListProps = {
            id: "Obra",
            label: "Obra Universal",
            helpLabel: "Seleccione una Obra Universal",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                } else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };

                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let parametros: any = { activos: 1, obraUniversal: true };
                let url: string = global.encodeAllURL("scco", "Obra", parametros);
                global.dispatchAsync("load::ObrasUniversales", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    interface IEdit extends page.IProps {
        niveles?: any;
        Obra?: any;
        ObraUniversal?: any;
    };

    let Edit = global.connect(class extends React.Component<IEdit, IEdit> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.ObraUniversal = Forms.getDataValue("ObraUniversal", config.id, state)
            retValue.Obra = Forms.getDataValue("Obra", config.id, state);
            retValue.niveles = Forms.getValue(PAGE_NIVELES, config.id, state);
            return retValue;
        };
        componentWillReceiveProps(nextProps: IEdit) {
            if (global.hasChanged(this.props.niveles, nextProps.niveles)) {
                if (global.isSuccessful(nextProps.niveles)) {
                    let nextItems = global.getData(nextProps.niveles, []);
                    let prevItems = global.getData(this.props.niveles, []);
                    if (prevItems !== nextItems) {
                        if (nextItems.length > 0) {
                            let count = 1
                            let colum = '_eliminado'
                            for (let i: number = 0; i < nextItems.length; i++) {
                                if (!(colum in nextItems[i])) {
                                    nextItems[i].Nivel = count++;
                                    if (nextItems[i].ID > 0) {
                                        nextItems[i]._modificado = true;
                                    }
                                } else {
                                    //console.log('Elemento Eliminado')
                                    //console.log(nextItems[i])
                                }
                                Forms.updateFormElement(config.id, PAGE_NIVELES, global.createSuccessfulStoreObject(nextItems))
                                global.dispatchSuccessful("global-page-data", nextItems, PAGE_NIVELES);
                            }
                        }
                    }
                }
            };
            //
            if (global.hasChanged(this.props.ObraUniversal, nextProps.ObraUniversal)) {
                if (global.isSuccessful(nextProps.ObraUniversal)) {
                    let obraUniversal = global.getData(this.props.ObraUniversal)
                    if (obraUniversal) {
                        Forms.updateFormElement(config.id, "Obra", null)
                        Forms.updateFormElement(config.id, "Tabulador", null)
                        Forms.updateFormElement(config.id, "AfectaObraUniversal", false)
                    }
                }
            };
            //
            let viewMode: boolean = getData(this.props.state).viewMode;
            if (viewMode === false) {
                if (global.hasChanged(this.props.Obra, nextProps.Obra)) {
                    if (global.getDataID(this.props.Obra) !== global.getDataID(nextProps.Obra)) {
                        if (isSuccessful(nextProps.Obra)) {
                            if (global.getDataID(nextProps.Obra) > 0) {
                                let idObra: number = getDataID(this.props.entidad);
                                let idObraUniversal: any = global.getDataID(nextProps.Obra);
                                let idObraTabulador: number = -1;

                                let obraTabulador: any = Forms.getValue("Tabulador", config.id);
                                if (obraTabulador) {
                                    if (obraTabulador.ID && obraTabulador.ID > 0) {
                                        idObraTabulador = Number(obraTabulador.ID);
                                    };
                                };

                                let parametros: any = global.encodeParameters({ idCurrentItem: idObra, idObraUniversal, idObraTabulador });

                                global.dispatchAsync("global-current-entity", "base/scco/Obra/GetBP/FillObra/" + parametros);
                            };
                        };
                    };
                };
            };
        };
        render(): JSX.Element {
            let displayObraUniversal: boolean = Forms.getValue("ObraUniversal", config.id);
            let idEntidad: number = global.getDataID(this.props.entidad);
            
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_OBRA_UNIVERSAL_ID}
                        icon="fa fa-cog"
                        collapsed={false}
                        hideCollapseButton={true}
                        level={1}>
                        {idEntidad > 0 ?
                            <Row>
                                <label.Boolean id="ObraUniversal" size={[6, 2, 2, 2]} />
                                {displayObraUniversal !== true ? <label.Entidad id="Obra" size={[12, 4, 4, 4]} /> : null}
                                {displayObraUniversal !== true ? <ddl.SCCOTabuladoresDDL addNewItem="SO" size={[12, 4, 4, 4]} /> : null}
                                {displayObraUniversal !== true ? <checkBox.CheckBox id="AfectaObraUniversal" size={[12, 6, 2, 2]} /> : null}
                            </Row> :
                            <Row>
                                <checkBox.CheckBox id="ObraUniversal" size={[6, 6, 2, 2]} />
                                {displayObraUniversal !== true ? <ObrasUniversales addNewItem="SO" size={[12, 4, 4, 4]} /> : null}
                                {displayObraUniversal !== true ? <ddl.SCCOTabuladoresDDL addNewItem="SO" size={[12, 4, 4, 4]} /> : null}
                                {displayObraUniversal !== true ? <checkBox.CheckBox id="AfectaObraUniversal" size={[12, 6, 2, 2]} /> : null}
                            </Row>
                        }
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-city fa-3x"
                        collapsed={false}
                        hideCollapseButton={true}
                        level="main">
                        <Row>
                            <input.Clave size={[6, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[6, 4, 6, 6]} maxLength={150} />
                            <ddl.SCCOEstatusObraDDL id="EstadoObra" size={[6, 2, 2, 2]} addNewItem={"SO"} validations={[validations.required()]} />
                            <checkBox.Status size={[6, 2, 2, 2]} />
                            <ddl.DesarrollosDDL id="Desarrollo" size={[12, 12, 4, 4]} addNewItem={"SO"} addNewItemText={"Desarrollo no Asignado"} />
                            <ddl.CentrosCostoDDL id="CentroCosto" size={[12, 12, 4, 4]} addNewItem={"SO"} />
                            <ddl.TipoObraDDL id="TipoObra" size={[12, 12, 2, 2]} addNewItem={"SO"} validations={[validations.required()]} />
                            <CheckBox id="ValuacionActualizada" size={[12, 12, 2, 2]} />
                            <ddl.TipoFSRDDL size={[12, 12, 2, 2]} addNewItem={"SO"} validations={[validations.required()]} />
                            <Currency id="FactorFSR" size={[12, 12, 2, 2]} />
                            <ddl.SCCOInsumosDDL id="InsumoFSR" clasificacion="INSUMO" size={[12, 12, 4, 4]} />
                            <input.Integer id="Contrato" size={[12, 12, 4, 4]} />
                            <input.Integer id="MinimoWBSNivel" size={[12, 12, 2, 2]} />
                            <input.Integer id="MaximoWBSNivel" size={[12, 12, 2, 2]} />
                            <Input id="Responsable" size={[12, 12, 4, 4]} />
                            <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                                <Column size={[12, 12, 6, 6]} style={{ paddingTop: 12 }}>
                                    <page.OptionSection
                                        id="InfoDireccion" icon="fa fa-home" title="Dirección"
                                        level={1} collapsed={false} hideCollapseButton={false}>
                                        <Row>
                                            <Input id="Direccion" size={[12, 12, 4, 4]} />
                                            <Input id="UbicacionObra" size={[12, 12, 4, 4]} />
                                            <label.Label id="Geolocalizacion" size={[12, 12, 4, 4]} />
                                            <select.Asentamientos id="Asentamiento" size={[12, 12, 12, 12]} />
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <SectionNivelesWbs size={[12, 12, 6, 6]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                                <SeccionCompanias size={[12, 12, 6, 6]} />
                                <SeccionIndirectos size={[12, 12, 6, 6]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                                <SeccionValidacion size={[12, 12, 6, 6]} />
                                <SeccionIndirectosTarjeta size={[12, 12, 6, 6]} />
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <KontrolFileManager modulo={config.modulo} viewMode={false} multiple={false} />
                </Column>
            </page.Edit>;
        };
    });

    interface IView extends React.Props<any> {
        item: any;
    };

    const View: any = page.connect(class extends page.Base {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity
        });
        render(): JSX.Element {
            let displayObraUniversal: boolean = false;
            //
            if (global.isSuccessful(this.props.entidad)) {
                let isObraUniversal = global.getData(this.props.entidad).ObraUniversal;
                if (isObraUniversal !== undefined && isObraUniversal !== null) {
                    displayObraUniversal = isObraUniversal === true;
                };
            };
            //
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_OBRA_UNIVERSAL_ID}
                        icon="fa fa-cog"
                        collapsed={false}
                        hideCollapseButton={true}
                        level={1}>
                        <Row>
                            <label.Boolean id="ObraUniversal" size={[6, 2, 2, 2]} />
                            {displayObraUniversal !== true ? <label.Entidad id="Obra" size={[12, 4, 4, 4]} /> : null}
                            {displayObraUniversal !== true ? <label.Entidad id="Tabulador" size={[12, 4, 4, 4]} /> : null}
                            {displayObraUniversal !== true ? <label.Boolean id="AfectaObraUniversal" size={[12, 4, 2, 2]} /> : null}
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-city fa-3x"
                        collapsed={false}
                        hideCollapseButton={true}
                        level="main">
                        <Row>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 6, 6, 6]} />
                            <label.Entidad id="EstadoObra" size={[12, 2, 2, 2]} />
                            <label.Estatus size={[6, 2, 2, 2]} />
                            <label.Entidad id="Desarrollo" size={[12, 4, 4, 4]} />
                            <label.Entidad id="CentroCosto" size={[12, 4, 4, 4]} />
                            <label.Entidad id="TipoObra" size={[12, 4, 2, 2]} />
                            <label.Boolean id="ValuacionActualizada" size={[12, 12, 2, 2]} />
                            <label.Entidad id="TipoFSR" size={[12, 4, 2, 2]} />
                            <label.Label id="FactorFSR" size={[12, 4, 2, 2]} />
                            <label.Insumo id="InsumoFSR" size={[12, 4, 4, 4]} />
                            <label.Label id="Contrato" size={[12, 4, 4, 4]} />
                            <label.Label id="MinimoWBSNivel" size={[12, 12, 2, 2]} />
                            <label.Label id="MaximoWBSNivel" size={[12, 12, 2, 2]} />
                            <label.Label id="Responsable" size={[12, 4, 4, 4]} />
                            <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                                <Column size={[12, 12, 6, 6]} style={{ paddingTop: 12 }}>
                                    <page.OptionSection
                                        id="InfoDireccion" icon="fa fa-home" title="Dirección"
                                        level={1} collapsed={false} hideCollapseButton={false}>
                                        <label.Label id="Direccion" size={[12, 12, 4, 4]} />
                                        <label.Label id="UbicacionObra" size={[12, 12, 4, 4]} />
                                        <label.Label id="Geolocalizacion" size={[12, 12, 4, 4]} />
                                        <label.Localidad id="Asentamiento" size={[12, 12, 12, 12]} />
                                    </page.OptionSection>
                                </Column>
                                <SectionNivelesWbs size={[12, 12, 6, 6]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                                <SeccionCompanias size={[12, 12, 6, 6]} />
                                <SeccionIndirectos size={[12, 12, 6, 6]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                                <SeccionValidacion size={[12, 12, 6, 6]} />
                                <SeccionIndirectosTarjeta size={[12, 12, 6, 6]} />
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <KontrolFileManager modulo={config.id} viewMode={false} multiple={false} />
                </Column>
            </page.View>;
        };
    });
};