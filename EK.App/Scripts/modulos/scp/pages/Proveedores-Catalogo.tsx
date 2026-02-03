namespace EK.Modules.SCP.Pages.Proveedores {
    "use strict";

    const SUBTITULO: string = "Proveedores";
    const DATOS_FISCALES: string = "InfoFiscal";    
    const ACTA_CONSTITUTIVA: string = "ActasConstitutivas";
    const INFO_TIPOPERSONA: string = "InfoTipoPersona";
    const REGISTRO_PUBLICO_PROPIEDAD: string = "RegistrosPublicosPropiedad";
    const TELEFONOS_ID: string = "Telefonos";
    const CORREOS_ID: string = "Correos";
    const CONTRATISTAS: string = "Contratistas";
    const GEO_ID: string = "Proveedor";
    const idModalGeo: string = "modal" + GEO_ID;

    const DIVSTYLE = {
        padding: 0
    };

    interface IPageEditProps extends page.IProps {
        tipoPersona?: any;
        item?: any;
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

    const config: page.IPageConfig = global.createPageConfig("Proveedores", "kontrol", [DATOS_FISCALES,
        ACTA_CONSTITUTIVA,
        INFO_TIPOPERSONA,
        TELEFONOS_ID,
        CORREOS_ID,
        REGISTRO_PUBLICO_PROPIEDAD,
        CONTRATISTAS
    ]);

    let ml: any = config.getML();
    export const Edicion: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoPersona = Forms.getValue("TipoPersona", config.id, state);
            return retValue;
        };

        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .addObject("TipoPersona")
                .addString("NombreCorto")
                .addString("ApellidoMaterno")
                .addString("ApellidoPaterno")
                .addString("RFC")
                .addString("CURP")
                .addString("Domicilio")
                .addString("Geolocalizacion")
                .addString("NumInterior")
                .addString("NumExterior")
                .addObject("Asentamiento")
                .addObject("TipoProveedor")
                .addObject("TipoMovimientoProveedor")
                .addObject(TELEFONOS_ID)
                .addObject(CORREOS_ID)
                .addObject(ACTA_CONSTITUTIVA)
                .addObject(REGISTRO_PUBLICO_PROPIEDAD)
                .addString('NombreContacto')
                .addString('LimiteCredito')
                .addString('CondicionesPago')
                .addObject("Sociedad")
                .addObject("Tercero")
                .addObject("Operacion")
                .addString("Pyme")
                .addString("IdentificacionFiscal")
                .addObject("Regimen")
                .addObject("Nacionalidad")
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let proveedor: any = getData(props.entidad);
            let idProveedor: number = getDataID(props.entidad);
            $("#").css
            if (idProveedor <= 0 || idProveedor === undefined) {
                global.dispatchSuccessful("global-page-data", [], TELEFONOS_ID);
                global.dispatchSuccessful("global-page-data", [], CORREOS_ID);
                global.dispatchSuccessful("global-page-data", [], ACTA_CONSTITUTIVA);
                global.dispatchSuccessful("global-page-data", [], REGISTRO_PUBLICO_PROPIEDAD);
                global.dispatchSuccessful("global-page-data", [], CONTRATISTAS);
                setGeoInfo(null);
            }
            else {
                let ClaveTipoContacto: string = "CORREO";
                let parametros: any = global.assign({ idProveedor, ClaveTipoContacto });
                props.config.dispatchCatalogoBase("base/kontrol/Proveedores/Get/GetProveedorContactos/", parametros, CORREOS_ID);
                parametros = global.assign({ idProveedor, ClaveTipoContacto: "TELEFONO" });
                props.config.dispatchCatalogoBase("base/kontrol/Proveedores/Get/GetProveedorContactos/", parametros, TELEFONOS_ID);
                props.config.dispatchCatalogoBase("base/scco/Contratistas/all/", { idProveedor: idProveedor }, CONTRATISTAS);
                global.dispatchSuccessful("global-page-data", proveedor.ActasConstitutivas, ACTA_CONSTITUTIVA);
                global.dispatchSuccessful("global-page-data", proveedor.RegistrosPublicosPropiedad, REGISTRO_PUBLICO_PROPIEDAD);
                setGeoInfo(proveedor);
            };
            if (proveedor.tipoPersona) {
                console.log(proveedor.TipoPersona.Clave);
            }
        };
        render(): JSX.Element {
            let tipoPersona: any = Forms.getValue("TipoPersona", config.id);
            let personaFisica: boolean = false;
            let personaMoral: boolean = false;

            if (global.isSuccessful(this.props.entidad)) {
                tipoPersona = global.getData(this.props.entidad).TipoPersona;
                if (!tipoPersona || tipoPersona.ID < 0) {
                    tipoPersona = Forms.getValue("TipoPersona", config.id);
                };
            };
            if (tipoPersona !== undefined && tipoPersona !== null) {
                personaFisica = tipoPersona.Clave === "F";
                personaMoral = tipoPersona.Clave === "M";
            }; 

            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <PageButtons>
                    <ExpMapViewerButton />
                </PageButtons>
                {personaFisica === true ? <ViewFisica /> : null}
                {personaMoral === true ? <ViewMoral /> : null}
                {personaFisica === true ? <EditFisica /> : null}
                {personaMoral === true ? <EditMoral /> : null}
                {!tipoPersona ? <EditTipoPersona /> : null}
            </page.Main>;
        };
    });

    const EditTipoPersona: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoPersona = Forms.getValue("TipoPersona", config.id, state);
            return retValue;
        };
        onSelectTipoPersona(info: any): void {
            let tp: any = Forms.getValue("TipoPersona", INFO_TIPOPERSONA);
            Forms.updateFormElement(config.id, "TipoPersona", tp);
            EK.UX.getCurrentConfiguration(config.id + tp.Clave);
        };
        shouldComponentUpdate(nextProps: IPageEditProps, nextState: IPageEditProps): boolean {
            return global.hasChanged(this.props.tipoPersona, nextProps.tipoPersona);
        };
        render(): JSX.Element {
            let tipoPersona: any = Forms.getValue("TipoPersona", config.id);
            if (tipoPersona !== undefined && tipoPersona !== null) {
                return null;
            }; 
            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 6, 6]}>
                        <page.OptionSection
                            id={INFO_TIPOPERSONA}
                            icon="fa fa-user"
                            collapsed={false}
                            hideCollapseButton={true}>
                            <SectionButtons>
                                <buttons.Button icon="fa fa-arrow-right" color="white" iconOnly={true} className="btn-ico-ek" onClick={this.onSelectTipoPersona} info={null} />
                            </SectionButtons>
                            <ddl.TiposPersonaDDL agregarnuevoItem={false} idFormSection={INFO_TIPOPERSONA} />
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    });

    export let TelefonosFisica: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveTelefono = this.onSaveTelefono.bind(this);
            this.onValidateContacto = this.onValidateContacto.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSaveTelefono(): void {
            let item: EditForm = Forms.getForm(TELEFONOS_ID);
            if (this.onValidateContacto(item, TELEFONOS_ID)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionTelefono);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(TELEFONOS_ID);
                let elemento: any;
                elemento = item
                    .addID()
                    .addString("Contacto")
                    .addBoolean("Titular")
                    .addString("Extension")
                    .addObject("TipoTelefono")
                    .addString("Cargo")
                    .addString("Nombre")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                //Validaciones
                if (elemento["Titular"] == true && entidades.data.length != 0) {
                    for (var i = 0; i < entidades.data.length; i++) {
                        entidades.data[i].Titular = false;
                        entidades.data[i].Estado = 3;
                    }
                }
                else if (entidades.data.length === 0 && (elemento["Titular"] == false || elemento["Titular"] == undefined)) {
                    elemento["Titular"] = true;
                }
                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, TELEFONOS_ID);
                global.dispatchSuccessful("global-page-data", retValue, TELEFONOS_ID);
                this.props.config.setState({ viewMode: true }, TELEFONOS_ID);
            }
        }
        onValidateContacto(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Contacto == item.Contacto && (item.ID < 1 || item.ID === undefined) && (value.ID != item.ID)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={TELEFONOS_ID}
                parent={config.id}
                title={"Teléfonos"}
                level={1}
                onSave={this.onSaveTelefono}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-phone"
                size={[6, 3, 3, 3]}
                style={{ paddingTop: 20 }}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addString("Contacto")
                        .addBoolean("Titular")
                        .addString("Extension")
                        .addObject("TipoTelefono")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    var extension = item.Extension != null || item.Extension == "" ? "(" + item.Extension + ")" : "";
                    var titular = item.Titular == true ? " P" : "";
                    var clase = item.Titular == true ? "badge badge-success" : "";
                    return <Row>
                        <Column size={[10, 10, 10, 10]}>
                            <span className="badge badge-info">{item.TipoTelefono.Nombre}</span>
                            <span>{" " + item.Contacto} {extension} </span>
                            <span className={clase}>{" " + titular}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={TELEFONOS_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <ddl.TiposTelefonoDLL id="TipoTelefono" idFormSection={TELEFONOS_ID} validations={[validations.required()]} size={[12, 6, 6, 6]} />
                    <CheckBox id="Titular" idFormSection={TELEFONOS_ID} size={[12, 6, 6, 6]} label="Principal" />
                    <input.Unique label="Télefono" idElement={"Celular"} base={false} id="Contacto" size={[12, 12, 7, 7]} idFormSection={TELEFONOS_ID} validations={[validations.required(), validations.length("", 10)]} />
                    <Input id="Extension" label="Extensión" idFormSection={TELEFONOS_ID} size={[12, 12, 5, 5]} maxLength={5} />
                </Row>
            </page.SectionList>
        };
    })

    export let TelefonoMoral: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveTelefono = this.onSaveTelefono.bind(this);
            this.onValidateContacto = this.onValidateContacto.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSaveTelefono(): void {
            let item: EditForm = Forms.getForm(TELEFONOS_ID);
            if (this.onValidateContacto(item, TELEFONOS_ID)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionTelefono);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(TELEFONOS_ID);
                let elemento: any;
                elemento = item
                    .addID()
                    .addString("Contacto")
                    .addBoolean("Titular")
                    .addString("Extension")
                    .addObject("TipoTelefono")
                    .addString("Cargo")
                    .addString("Nombre")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                //Nuevos Elementos
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                //Validaciones
                if (elemento["Titular"] == true && entidades.data.length != 0) {
                    for (var i = 0; i < entidades.data.length; i++) {
                        entidades.data[i].Titular = false;
                        entidades.data[i].Estado = 3;
                    }
                }
                else if (entidades.data.length === 0 && (elemento["Titular"] == false || elemento["Titular"] == undefined)) {
                    elemento["Titular"] = true;
                }
                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, TELEFONOS_ID);
                global.dispatchSuccessful("global-page-data", retValue, TELEFONOS_ID);
                this.props.config.setState({ viewMode: true }, TELEFONOS_ID);
            }
        }
        onValidateContacto(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Contacto == item.Contacto && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={TELEFONOS_ID}
                parent={config.id}
                title={"Teléfonos"}
                level={1}
                onSave={this.onSaveTelefono}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-phone"
                size={[12, 6, 3, 3]}
                style={{ paddingTop: 20 }}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addString("Contacto")
                        .addString("Nombre")
                        .addString("Cargo")
                        .addString("Extension")
                        .addObject("TipoTelefono")
                        .addBoolean("Titular")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    var extension = item.Extension != null || item.Extension == "" ? "(" + item.Extension + ")" : "";
                    var titular = item.Titular == true ? " P" : "";
                    var clase = item.Titular == true ? "badge badge-success" : "";
                    return <Row>
                        <Column className="listItem-default-header" >
                            <Row>
                                <Column size={[10, 10, 10, 10]}>
                                    <span className="badge badge-info">{item.TipoTelefono.Nombre} </span>
                                    <span>{" " + item.Contacto} {extension + " "}</span>
                                    <span className={clase}>{" " + titular}</span>
                                </Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                                    {(estadoEntidad) ? null :
                                        <buttons.PopOver idParent={config.id} idForm={TELEFONOS_ID} info={item}
                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                    }
                                </Column>
                                <Column size={[10, 10, 10, 10]} className="listItem-default-item">
                                    <span className="badge badge-default">{item.Cargo + " "} </span>
                                    <span>{" " + item.Nombre}</span>
                                </Column>
                            </Row>
                        </Column>
                    </Row>;
                }}>
                <Row>
                    <Input id="Nombre" label="Nombre" idFormSection={TELEFONOS_ID} size={[12, 12, 12, 12]} maxLength={50} validations={[validations.required()]} />
                    <Input id="Cargo" label="Cargo" idFormSection={TELEFONOS_ID} size={[12, 12, 12, 12]} maxLength={50} validations={[validations.required()]} />
                    <ddl.TiposTelefonoDLL id="TipoTelefono" idFormSection={TELEFONOS_ID} size={[12, 6, 6, 6]} validations={[validations.required()]} />
                    <CheckBox id="Titular" idFormSection={TELEFONOS_ID} size={[12, 6, 6, 6]} label="Principal" />
                    <input.Unique label="Télefono" idElement={"Celular"} base={false} validations={[validations.required(), validations.length("", 10)]} id="Contacto" size={[12, 12, 7, 7]} idFormSection={TELEFONOS_ID} />
                    <Input id="Extension" label="Extensión" idFormSection={TELEFONOS_ID} size={[12, 12, 5, 5]} maxLength={5} />
                </Row>
            </page.SectionList>
        };
    })

    export let CorreosFisica: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveCorreo = this.onSaveCorreo.bind(this);
            this.onValidateContacto = this.onValidateContacto.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onValidateContacto(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Contacto == item.Contacto && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        onSaveCorreo(): void {
            let item: EditForm = Forms.getForm(CORREOS_ID);
            if (this.onValidateContacto(item, CORREOS_ID)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionCorreo);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(CORREOS_ID);
                let elemento: any;
                elemento = item
                    .addID()
                    .addString("Contacto")
                    .addBoolean("Titular")
                    .addString("Cargo")
                    .addString("Nombre")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                //Para nuevos elementos
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                //Validaciones
                if (elemento["Titular"] == true && entidades.data.length != 0) {
                    for (var i = 0; i < entidades.data.length; i++) {
                        entidades.data[i].Titular = false;
                        entidades.data[i].Estado = 3;
                    }
                }
                else if (entidades.data.length === 0 && (elemento["Titular"] == false || elemento["Titular"] == undefined)) {
                    elemento["Titular"] = true;
                }

                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, CORREOS_ID);
                global.dispatchSuccessful("global-page-data", retValue, CORREOS_ID);
                this.props.config.setState({ viewMode: true }, CORREOS_ID);
            }
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={CORREOS_ID}
                parent={config.id}
                title={"Correos"}
                level={1}
                onSave={this.onSaveCorreo}
                style={{ paddingTop: 20 }}
                items={createSuccessfulStoreObject([])}
                icon="fa fa-at"
                size={[6, 3, 3, 3]}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addString("Contacto")
                        .addBoolean("Titular")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    var titular = item.Titular == true ? " P" : "";
                    var clase = item.Titular == true ? "badge badge-success" : "";
                    return <Row>
                        <Column size={[10, 10, 10, 10]}>
                            <span>{" " + item.Contacto + " "}</span>
                            <span className={clase}>{" " + titular}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={CORREOS_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <input.Unique label="Correo" idElement={"Correo"} base={false} id="Contacto" size={[12, 12, 12, 12]} idFormSection={CORREOS_ID} />
                    <CheckBox id="Titular" idFormSection={CORREOS_ID} size={[12, 6, 6, 6]} label="Principal" />
                </Row>
            </page.SectionList>
        };
    })

    export let CorreoMoral: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveCorreo = this.onSaveCorreo.bind(this);
            this.onValidateContacto = this.onValidateContacto.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSaveCorreo(): void {
            let item: EditForm = Forms.getForm(CORREOS_ID);
            if (this.onValidateContacto(item, CORREOS_ID)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionCorreo);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(CORREOS_ID);
                let elemento: any;
                elemento = item
                    .addID()
                    .addString("Contacto")
                    .addBoolean("Titular")
                    .addString("Cargo")
                    .addString("Nombre")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                //Nuevos Elementos
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                //Validaciones
                if (elemento["Titular"] == true && entidades.data.length != 0) {
                    for (var i = 0; i < entidades.data.length; i++) {
                        entidades.data[i].Titular = false;
                        entidades.data[i].Estado = 3;
                    }
                }
                else if (entidades.data.length === 0 && (elemento["Titular"] == false || elemento["Titular"] == undefined)) {
                    elemento["Titular"] = true;
                }
                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, CORREOS_ID);
                global.dispatchSuccessful("global-page-data", retValue, CORREOS_ID);
                this.props.config.setState({ viewMode: true }, CORREOS_ID);
            }
        }
        onValidateContacto(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Contacto == item.Contacto && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={CORREOS_ID}
                parent={config.id}
                title={"Correos"}
                level={1}
                onSave={this.onSaveCorreo}
                style={{ paddingTop: 20 }}
                items={createSuccessfulStoreObject([])}
                icon="fa fa-at"
                size={[12, 6, 3, 3]}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addString("Contacto")
                        .addString("Nombre")
                        .addString("Cargo")
                        .addBoolean("Titular")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    var titular = item.Titular == true ? " P" : "";
                    var clase = item.Titular == true ? "badge badge-success" : "";
                    return <Row>
                        <Column size={[10, 10, 10, 10]} className="listItem-default-item">
                            <span className="badge badge-info">{" " + item.Cargo}</span>
                            <span>{" " + item.Nombre}</span>
                        </Column>
                        <Column size={[10, 10, 10, 10]}>
                            <span>{" " + item.Contacto + " "}</span>
                            <span className={clase}>{" " + titular}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={CORREOS_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }

                    </Row>;
                }}>
                <Row>
                    <Input id="Nombre" label="Nombre" idFormSection={CORREOS_ID} size={[12, 12, 12, 12]} maxLength={50} validations={[validations.required()]} />
                    <Input id="Cargo" label="Cargo" idFormSection={CORREOS_ID} size={[12, 12, 12, 12]} maxLength={50} validations={[validations.required()]} />
                    <input.Unique label="Correo" idElement={"Correo"} base={false} id="Contacto" size={[12, 12, 12, 12]} idFormSection={CORREOS_ID} />
                    <CheckBox id="Titular" idFormSection={CORREOS_ID} size={[12, 6, 6, 6]} label="Principal" />
                </Row>
            </page.SectionList>
        };
    })

    export let ActaConstitutiva: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveActa = this.onSaveActa.bind(this);
            this.onValidateActa = this.onValidateActa.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSaveActa(): void {
            let item: EditForm = Forms.getForm(ACTA_CONSTITUTIVA);
            if (this.onValidateActa(item, ACTA_CONSTITUTIVA)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacion);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(ACTA_CONSTITUTIVA);
                let elemento: any;
                elemento = item
                    .addID()
                    .addClave()
                    .addNombre()
                    .addEstatus()
                    .addNumber("VolumenActa")
                    .addString("NombreNotario")
                    .addNumber("NumNotario")
                    .addDate("FechaActa")
                    .addVersion()
                    .addVersion()
                    .toObject();
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                
                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, ACTA_CONSTITUTIVA);
                global.dispatchSuccessful("global-page-data", retValue, ACTA_CONSTITUTIVA);
                this.props.config.setState({ viewMode: true }, ACTA_CONSTITUTIVA);
            }
        }

        onValidateActa(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Clave == item.Clave && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }

        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={ACTA_CONSTITUTIVA}
                parent={config.id}
                title={"Acta Constitutiva"}
                icon="far fa-clipboard"
                level={1}
                onSave={this.onSaveActa}
                size={[6, 6, 6, 6]}
                style={{ paddingTop: 20 }}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                     <Row>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Nombre Notario"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Num Notario"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Volumen Acta"}</Column>
                        <Column size={[3, 3, 2, 2]} className="list-default-header">{"Fecha Acta"}</Column>
                   </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addClave()
                        .addEstatus()
                        .addNumber("VolumenActa")
                        .addString("NombreNotario")
                        .addNumber("NumNotario")
                        .addDate("FechaActa")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.VolumenActa}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item"><span>{item.NombreNotario}</span></Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item"><span>{item.NumNotario}</span></Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{label.formatDate( item.FechaActa)}</span></Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={ACTA_CONSTITUTIVA} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <input.Integer id="VolumenActa" size={[6, 6, 6, 6]} idFormSection={ACTA_CONSTITUTIVA} validations={[validations.required()]} />
                    <input.Text id="NombreNotario" size={[6, 6, 6, 6]} idFormSection={ACTA_CONSTITUTIVA} validations={[validations.required()]}/>
                    <input.Integer id="NumNotario" size={[6, 6, 6, 6]} idFormSection={ACTA_CONSTITUTIVA} validations={[validations.required()]}/>
                    <input.Date id="FechaActa" size={[6, 6, 6, 6]} idFormSection={ACTA_CONSTITUTIVA} validations={[validations.required()]}/>
                </Row>
            </page.SectionList>
        };
    });

    export let RegistroPublico: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveRegistroPublico = this.onSaveRegistroPublico.bind(this);
            this.onValidateRegistro = this.onValidateRegistro.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSaveRegistroPublico(): void {
            let item: EditForm = Forms.getForm(REGISTRO_PUBLICO_PROPIEDAD);
            if (this.onValidateRegistro(item, REGISTRO_PUBLICO_PROPIEDAD)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacion);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(REGISTRO_PUBLICO_PROPIEDAD);
                let elemento: any;
                elemento = item
                    .addID()
                    .addNombre()
                    .addEstatus()
                    .addDate("FechaInscripcion")
                    .addObject("Ciudad")
                    .addString("Partida")
                    .addString("Folio")
                    .addString("Libro")
                    .addString("Seccion")
                    .addVersion()
                    .addVersion()
                    .toObject();
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }

                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, REGISTRO_PUBLICO_PROPIEDAD);
                global.dispatchSuccessful("global-page-data", retValue, REGISTRO_PUBLICO_PROPIEDAD);
                this.props.config.setState({ viewMode: true }, REGISTRO_PUBLICO_PROPIEDAD);
            }
        }

        onValidateRegistro(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Clave != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Clave == item.Clave && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={REGISTRO_PUBLICO_PROPIEDAD}
                parent={config.id}
                title={"Registro Público de Propiedad"}
                icon="fas fa-clipboard"
                level={1}
                onSave={this.onSaveRegistroPublico}
                size={[6, 6, 6, 6]}
                style={{ paddingTop: 20 }}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Folio"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Libro"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fecha de Inscripción"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addNombre()
                        .addEstatus()
                        .addDate("FechaInscripcion")
                        .addObject("Ciudad")
                        .addString("Partida")
                        .addString("Folio")
                        .addString("Libro")
                        .addString("Seccion")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.Nombre}</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span>{item.Partida}</span></Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span>{item.Folio}</span></Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span>{item.Libro}</span></Column>                        
                        <Column size={[2, 2, 1, 1]} className="listItem-default-item"><span>{label.formatDate(item.FechaInscripcion)}</span></Column>

                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={REGISTRO_PUBLICO_PROPIEDAD} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}
            >
                <Row>
                    <input.Nombre size={[12, 12, 8, 8]} idFormSection={REGISTRO_PUBLICO_PROPIEDAD} validations={[validations.required()]} />
                    <input.Integer id="Partida" size={[12, 4, 4, 4]} idFormSection={REGISTRO_PUBLICO_PROPIEDAD} validations={[validations.required()]}/>
                    <input.Integer id="Folio" size={[12, 4, 4, 4]} idFormSection={REGISTRO_PUBLICO_PROPIEDAD} validations={[validations.required()]}/>
                    <input.Integer id="Libro" size={[12, 4, 4, 4]} idFormSection={REGISTRO_PUBLICO_PROPIEDAD} validations={[validations.required()]}/>
                    <input.Integer id="Seccion" size={[12, 4, 4, 4]} idFormSection={REGISTRO_PUBLICO_PROPIEDAD} validations={[validations.required()]}/>
                    <select.Estados id="Ciudad" size={[6, 6, 6, 6]} idFormSection={REGISTRO_PUBLICO_PROPIEDAD} validations={[validations.required()]}/>
                    <input.Date id="FechaInscripcion" size={[6, 6, 6, 6]} idFormSection={REGISTRO_PUBLICO_PROPIEDAD} validations={[validations.required()]}/>
                </Row>
            </page.SectionList>
        };
    });

    class SectionContratista extends page.Base {
        render(): JSX.Element {
            return <page.SectionList
                id={CONTRATISTAS}
                parent={config.id}
                icon="fas fa-scroll"
                level={1}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Clave"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tipo de Convenio"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Representante"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Dirección"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={true}
                addRemoveButton={false}
                hideNewButton={true}
                mapFormToEntity={(form: EditForm): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .addVersion()
                        .toObject();

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                            <a target='_blank' rel='noopener noreferrer' href={`#/scco/Contratistas/${item.ID}`}
                                style={{ textDecoration: 'underline' }}
                                className="badge badge-success">
                                <span style={{ marginRight: 10 }}>{item.Clave} </span>
                            </a>
                        </Column>
                        <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                            <span>{item.Nombre}</span>
                        </Column>
                        <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                            <span>{item.TipoConvenio.Nombre}</span>
                        </Column>
                        <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                            <span>{item.Representante}</span>
                        </Column>
                        <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                            <span>{item.Direccion}</span>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        }
    }

    let ExpMapViewerButton: any = global.connect(class extends React.Component<IMapViewerButtonProps, {}> {
        constructor(props: IMapViewerButtonProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            info: state.global["catalogo$" + GEO_ID],
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
            let proveedor: any;
            let isReadMode: boolean = page.canViewReadMode(this.props.state);
            //
            if (isReadMode === true) {
                proveedor = global.getData(this.props.entidad);
            }
            else {
                proveedor = item
                    .addString("Geolocalizacion")
                    .addString("Domicilio")
                    .addObject("Asentamiento")
                    .addString("NumInterior")
                    .addString("NumExterior")
                    .toObject();
            };

            if (isReadMode === true && !proveedor.Geolocalizacion) {
                global.warning("No se ha establecido la información de geo-localización");
                return;
            };

            setGeoInfo(proveedor, isReadMode);
            //
            global.goModal(idModalGeo, "/kontrol/map/markers?callback=" + idModalGeo);
        };
        componentWillUnmount(): void {
            global.setModalData(idModalGeo, undefined);
        };
        render(): JSX.Element {
            let icon: string = "fa fa-map-pin";
            if (global.isSuccessful(this.props.info)) {
                icon = "fa fa-map-pin";
            }
            else if (global.isLoadingOrUpdating(this.props.info)) {
                icon = "fa fa-refresh fa-spin";
            };
            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.Read}>
                <div style={{ display: "inline-block" }}>
                    <modal.Modal id={idModalGeo} url={"about:blank"}></modal.Modal>
                    <Button {...this.props} onClick={this.onClick} icon={icon} />
                </div>
            </Authorize>;
        };
    });

    const setGeoInfo: (proveedor: any, readOnly?: boolean) => void = (proveedor: any, readOnly?: boolean): void => {
        let mode: string = "read";
        if (readOnly === false) {
            mode = "select";
        };
        //
        if (!proveedor) {
            global.setModalData(idModalGeo, null);
            return;
        };
        //
        let fullAddress: string = undefined;
        let geoLocalizacion: string = undefined;
        //
        if (proveedor.Geolocalizacion) {
            geoLocalizacion = proveedor.Geolocalizacion;
        }
        else {
            fullAddress = [proveedor.Domicilio, " ", proveedor.NumExterior, ", ", proveedor.Asentamiento.Nombre, ", ", proveedor.Asentamiento.Localidad.Nombre, ", ", proveedor.Asentamiento.CP].join("");
        }
        global.setModalData(idModalGeo, {
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

    //edicionFisica
    class EditFisica extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={SUBTITULO}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}
                        level="main">
                        <Column size={[12, 12, 12, 12]} style={DIVSTYLE}>
                            <input.Clave size={[12, 4, 4, 4]} maxLength={50} validations={[validations.required()]} />
                            <label.Entidad id="TipoPersona" size={[12, 4, 4, 4]} />
                            <checkBox.Status size={[12, 4, 4, 4]} />

                            <input.Nombre size={[12, 4, 4, 4]} validations={[validations.required()]} />
                            <Input id={"ApellidoPaterno"} size={[12, 4, 4, 4]} />
                            <Input id={"ApellidoMaterno"} size={[12, 4, 4, 4]} />
                            <Input id={"NombreCorto"} size={[12, 4, 4, 4]} />
                            <input.RFC size={[12, 4, 4, 4]} />
                            <input.CURP id="CURP" size={[12, 4, 4, 4]} />
                            <ddl.TipoProveedorDDL addNewItem={"SO"} size={[12, 4, 4, 4]} />
                            <ddl.TipoMovimientoProveedorDDL addNewItem={"SO"} size={[12, 4, 4, 4]} />
                            <Input id={"NombreContacto"} size={[12, 4, 4, 4]} />
                            <Currency id={"LimiteCredito"} size={[12, 4, 4, 4]} />
                            <Input id={"CondicionesPago"} size={[12, 4, 4, 4]} />
                        </Column>

                        <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                            <page.OptionSection
                                id="InfoDomicilio"
                                icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={false}>
                                <Input id={"Domicilio"} size={[12, 6, 4, 4]} />
                                <Input id={"NumInterior"} size={[12, 3, 2, 2]} />
                                <Input id={"NumExterior"} size={[12, 3, 2, 2]} />
                                <label.Label id="Geolocalizacion" size={[12, 12, 4, 4]} />
                                <select.Asentamientos id="Asentamiento" size={[12, 12, 12, 12]} /> 
                            </page.OptionSection>
                        </Column>
                        <TelefonosFisica />
                        <CorreosFisica />
                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                            <page.OptionSection
                                id={DATOS_FISCALES}
                                icon="fas fa-book" level={1} collapsed={false}
                                hideCollapseButton={false}
                                size={[12, 3, 3, 3]}>
                                <ddl.TipoSociedadDDL addNewItem={"SO"} size={[12, 6, 6, 6]} />
                                <ddl.TipoTerceroDDL addNewItem={"SO"} size={[12, 6, 6, 6]}/>
                                <ddl.TipoOperacionDDL addNewItem={"SO"} size={[12, 6, 6, 6]} />
                                <ddl.NacionalidadDLL addNewItem={"SO"} size={[12, 6, 6, 6]} />
                                <Input id={"Pyme"} size={[12, 6, 6, 6]} />
                                <Input id={"IdentificacionFiscal"} size={[12, 6, 6, 6]} />
                                <ddl.SCVRegimenDDL />
                            </page.OptionSection>
                        </Column>
                        <ActaConstitutiva />
                        <RegistroPublico />
                        <SectionContratista />
                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                            <KontrolFileManager modulo={config.id} viewMode={false} multiple={true}/>
                        </Column>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    //edicionMoral
    class EditMoral extends page.Base {
        render(): JSX.Element {
            return <page.Edit>                
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={SUBTITULO}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}
                        level="main">
                        <Column size={[12, 12, 12, 12]} style={DIVSTYLE}>
                            <input.Clave size={[12, 4, 4, 4]} maxLength={50} validations={[validations.required()]} />
                            <label.Entidad id="TipoPersona" size={[12, 4, 4, 4]} />
                            <checkBox.Status size={[12, 4, 4, 4]} />
                            <input.Nombre size={[12, 4, 4, 4]} validations={[validations.required()]} />
                            <input.RFC size={[12, 4, 4, 4]} />
                            <Input id={"NombreCorto"} size={[12, 4, 4, 4]} />                           
                            <ddl.TipoProveedorDDL addNewItem={"SO"} size={[12, 4, 4, 4]} />
                            <ddl.TipoMovimientoProveedorDDL addNewItem={"SO"} size={[12, 4, 4, 4]} />
                            <Input id={"NombreContacto"} size={[12, 4, 4, 4]} />
                            <Currency id={"LimiteCredito"} size={[12, 4, 4, 4]} />
                            <Input id={"CondicionesPago"} size={[12, 4, 4, 4]} />
                        </Column>
                        <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                            <page.OptionSection
                                id="InfoDomicilio"
                                icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={false}>
                                <Input id={"Domicilio"} size={[12, 6, 4, 4]} />
                                <Input id={"NumInterior"} size={[12, 3, 2, 2]} />
                                <Input id={"NumExterior"} size={[12, 3, 2, 2]} />
                                <label.Label id="Geolocalizacion" size={[12, 12, 4, 4]} />
                                <select.Asentamientos id="Asentamiento" size={[12, 12, 12, 12]} />
                            </page.OptionSection>
                        </Column>
                        <TelefonoMoral />
                        <CorreoMoral />
                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                            <page.OptionSection
                                id={DATOS_FISCALES}
                                icon="fas fa-book" level={1} collapsed={false}
                                hideCollapseButton={false}
                                size={[12, 3, 3, 3]}>
                                <ddl.TipoSociedadDDL addNewItem={"SO"} size={[12, 6, 6, 6]} />
                                <ddl.TipoTerceroDDL addNewItem={"SO"} size={[12, 6, 6, 6]} />
                                <ddl.TipoOperacionDDL addNewItem={"SO"} size={[12, 6, 6, 6]} />
                                <ddl.NacionalidadDLL addNewItem={"SO"} size={[12, 6, 6, 6]} />
                                <Input id={"Pyme"} size={[12, 6, 6, 6]} />
                                <Input id={"IdentificacionFiscal"} size={[12, 6, 6, 6]} />
                                <ddl.SCVRegimenDDL />
                            </page.OptionSection>
                        </Column>                        
                        <ActaConstitutiva />
                        <RegistroPublico />
                        <SectionContratista />
                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                            <KontrolFileManager modulo={config.id} viewMode={false} multiple={true} />
                        </Column>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    //vistaFisica
    class ViewFisica extends page.Base {        
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={SUBTITULO}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}
                        level="main">
                        <Column size={[12, 12, 12, 12]} style={{ paddingBottom: 1, padding: 0}}>
                            <label.Clave size={[12, 4, 4, 4]} />
                            <label.EntidadBadge id="TipoPersona" size={[12, 4, 4, 4]} />
                            <label.EntidadBadge id="Estatus" size={[12, 4, 4, 4]} />
                        </Column>
                        <Column size={[12, 12, 12, 12]} style={DIVSTYLE}>
                            <label.Nombre size={[12, 3, 3, 3]} />    
                            <label.Label id={"ApellidoPaterno"} size={[12, 3, 3, 3]} />
                            <label.Label id={"ApellidoMaterno"} size={[12, 3, 3, 3]} />
                            <label.Label id={"NombreCorto"} size={[12, 3, 3, 3]} />
                            <label.Label id={"RFC"} size={[12, 3, 3, 3]} />
                            <label.Label id={"CURP"} size={[12, 3, 3, 3]} />
                            <label.Entidad id="TipoProveedor" size={[12, 3, 3, 3]} />
                            <label.Entidad id="TipoMovimientoProveedor" size={[12, 3, 3, 3]} />
                            <label.Label id={"NombreContacto"} size={[12, 3, 3, 3]} />
                            <label.Label id={"LimiteCredito"} size={[12, 3, 3, 3]} />
                            <label.Label id={"CondicionesPago"} size={[12, 3, 3, 3]} />
                        </Column>
                        <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                            <page.OptionSection
                                id="InfoDomicilio"
                                icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={false}>
                                <label.Label id={"Domicilio"} size={[6, 6, 3, 3]} />
                                <label.Label id={"NumInterior"} size={[6, 6, 3, 3]} />
                                <label.Label id={"NumExterior"} size={[6, 6, 3, 3]} />
                                <label.Label id="Geolocalizacion" size={[6, 6, 3, 3]} />
                                <label.Localidad id="Asentamiento" size={[12, 12, 12, 12]}/>
                            </page.OptionSection>
                        </Column>
                        <TelefonosFisica />
                        <CorreosFisica />

                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                            <page.OptionSection
                                id={DATOS_FISCALES}
                                icon="fas fa-book" level={1} collapsed={false}
                                hideCollapseButton={false}
                                size={[12, 3, 3, 3]}>
                                <label.Label id={"Pyme"} />
                                <label.Label id={"IdentificacionFiscal"} />
                                <label.Entidad id="Sociedad" />
                                <label.Entidad id="Tercero" />
                                <label.Entidad id="Operacion" />
                                <label.Entidad id="Nacionalidad" />
                                <label.Entidad id="Regimen" size={[12, 12, 12, 12]} />
                            </page.OptionSection>
                        </Column>                        
                        <ActaConstitutiva />
                        <RegistroPublico />
                        <SectionContratista />
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
    //vistaMoral  
    class ViewMoral extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={SUBTITULO}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}
                        level="main">
                        <Column size={[12, 12, 12, 12]} style={{ paddingBottom: 1, padding: 0 }}>
                            <label.Clave size={[12, 4, 4, 4]} />
                            <label.EntidadBadge id="TipoPersona" size={[12, 4, 4, 4]} />
                            <label.EntidadBadge id="Estatus" size={[12, 4, 4, 4]} />
                        </Column>
                        <Column size={[12, 12, 12, 12]} style={DIVSTYLE}>
                            <label.Nombre size={[12, 3, 3, 3]} />
                            <label.Label id={"RFC"} size={[12, 3, 3, 3]} />
                            <label.Label id={"NombreCorto"} size={[12, 3, 3, 3]} />
                            <label.Entidad id="TipoProveedor" size={[12, 3, 3, 3]} />
                            <label.Entidad id="TipoMovimientoProveedor" size={[12, 3, 3, 3]} />
                            <label.Label id={"NombreContacto"} size={[12, 3, 3, 3]} />                            
                            <label.Label id={"LimiteCredito"} size={[12, 3, 3, 3]} />
                            <label.Label id={"CondicionesPago"} size={[12, 3, 3, 3]} />
                        </Column>
                        <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                            <page.OptionSection
                                id="InfoDomicilio"
                                icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={false}>
                                <label.Label id={"Domicilio"} size={[6, 6, 3, 3]} />
                                <label.Label id={"NumInterior"} size={[6, 6, 3, 3]} />
                                <label.Label id={"NumExterior"} size={[6, 6, 3, 3]} />
                                <label.Label id="Geolocalizacion" size={[6, 6, 3, 3]} />
                                <label.Localidad id="Asentamiento" size={[12, 12, 12, 12]} />
                            </page.OptionSection>
                        </Column>
                        
                        <TelefonoMoral />
                        <CorreoMoral />

                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                            <page.OptionSection
                                id={DATOS_FISCALES}
                                icon="fas fa-book" level={1} collapsed={false}
                                hideCollapseButton={false}
                                size={[12, 3, 3, 3]}>
                                <label.Label id={"Pyme"} />
                                <label.Label id={"IdentificacionFiscal"} />
                                <label.Entidad id="Sociedad" />
                                <label.Entidad id="Tercero" />
                                <label.Entidad id="Operacion" />
                                <label.Entidad id="Nacionalidad" />
                                <label.Entidad id="Regimen" size={[12, 12, 12, 12]} />
                            </page.OptionSection>
                        </Column>                        
                        <ActaConstitutiva />
                        <RegistroPublico />
                        <SectionContratista />
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};
