namespace EK.Modules.SCV.Pages.paquetes {
    "use strict";
    let PAGE_ID: string = "Paquetes"
    let PAQUETES_UBICACIONES: string = "paqueteUbicaciones"

    const config: page.IPageConfig = global.createPageConfig("paquetes", "scv", [PAQUETES_UBICACIONES]);

    interface IPageEditProps extends page.IProps {
        prototipo?: any;
        desarrollo?: any;
        ubicaciones?: any;
    };
    interface IEdicion extends React.Props<any> {
        entidad: any;
    };
    export const Edicion: any = global.connect(class extends React.Component<IEdicion, IEdicion> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity
        });
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addNumber("IdEstatus")
                .addObject("Desarrollo")
                .addVersion()
                .addObject(PAQUETES_UBICACIONES)
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let idPaquete: any = getDataID(props.entidad);
            let paquete: any = getData(props.entidad);

            if (idPaquete <= 0 || idPaquete === undefined) {
                global.dispatchSuccessful("global-page-data", [], PAQUETES_UBICACIONES);
            }
            else {
                let ClaveTipoContacto: string = "CORREO";
                let parametros: any = global.assign({ idPaquete: idPaquete });
                props.config.dispatchCatalogoBase("base/scv/paquetes/Get/obtenerPaquetesUbicaciones/", parametros, PAQUETES_UBICACIONES);
                if (paquete && paquete.IdDesarrollo) {
                    let url: string = global.encodeAllURL("scv", "Prototipos", { idDesarrollo: paquete.IdDesarrollo });
                    dispatchAsync("load::PROTOTIPOS", url);
                }
                else
                {
                    Forms.updateFormElement(PaqueteUbicaciones, "ubicaciones", { id: -1, nombre: "seleccione una opcion" })
                    Forms.updateFormElement(PaqueteUbicaciones, "prototipo", { id: -1, nombre: "seleccione una opcion" })
                    global.dispatchSuccessful("load::ubicaciones", []);
                    global.dispatchSuccessful("load::prototipos", []);
                }
            };
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let permitirEdicion: boolean = entidad && entidad.Estatus && entidad.Estatus.Clave == "A" ? true : entidad.ID == -1 ? true : false;
            let permitirEliminar: boolean = entidad && entidad.Estatus && entidad.Estatus.Clave == "A" && entidad.CantidadUbicaciones == 0 ? true : entidad.ID == -1 ? true : false;

            return <page.Main {...config} pageMode={PageMode.Edicion}
                onEntityLoaded={this.onEntityLoaded}
                allowDelete={permitirEliminar}
                allowSave={permitirEdicion}
                allowEdit={permitirEdicion}
                onSave={this.saveForm}>
                <PageButtons>
                    <CerrarPaqueteButton />
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    });
    export const Edit: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.desarrollo = Forms.getValue("Desarrollo", config.id, state);
            retValue.ubicaciones = state.global.catalogo$paqueteUbicaciones;
            return retValue;
        };
        componentWillReceiveProps(nextProps: IPageEditProps, nextState: IPageEditProps): any {
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo)) {
                if (nextProps.desarrollo && nextProps.desarrollo.ID && nextProps.desarrollo.ID > 0) {
                    let url: string = global.encodeAllURL("scv", "Prototipos", { idDesarrollo: nextProps.desarrollo.ID });
                    dispatchAsync("load::PROTOTIPOS", url);
                    Forms.updateFormElement(PaqueteUbicaciones, "prototipo", { id: -1, nombre: "seleccione una opcion" })
                    global.dispatchSuccessful("load::UBICACIONES", []);
                }
                else if (nextProps.desarrollo && nextProps.desarrollo.id && nextProps.desarrollo.id==-1)
                {
                    Forms.updateFormElement(PaqueteUbicaciones, "ubicaciones", { id: -1, nombre: "seleccione una opcion" })
                    Forms.updateFormElement(PaqueteUbicaciones, "prototipo", { id: -1, nombre: "seleccione una opcion" })
                    global.dispatchSuccessful("load::UBICACIONES", []);
                    global.dispatchSuccessful("load::PROTOTIPOS", []);

                }
            };
        };
        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad);
            let arregloEstatus: any = {};
            if (entidad.Estatus) {
                arregloEstatus[0] = entidad.Estatus.Nombre;
                arregloEstatus[1] = undefined;
                arregloEstatus[2] = "AZUL";
            }

            return <page.Edit>
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-building" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 12, 4, 4]} />
                            {(entidad && entidad.ID < 1) ?
                                <ddl.DesarrollosDDL size={[12, 4, 4, 4]} id="Desarrollo" agregarnuevoItem={true} validations={[validations.required()]} />
                                :
                                <label.EntidadDescripcion id={"Desarrollo"} size={[12, 4, 4, 4]}  />}

                            {(entidad && entidad.ID > 1) ?
                                <label.EstatusColor id={"Estatus"} value={arregloEstatus} size={[12, 12, 2, 2]} />
                                :
                                <label.EstatusTarea id={"Estatus"} value={arregloEstatus} size={[12, 12, 2, 2]} />}
                            
                        </Row>
                        <Column size={[12, 12, 12, 12]} style={{ padding: "0" }} >
                            <PaqueteUbicaciones />
                        </Column>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });
    export const View: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            
            let entidad: any = getData(this.props.entidad);
            let arregloEstatus: any = {};
            if (entidad.Estatus) {
                let claveEstatus: string = entidad.Estatus.Clave;
                let colorEstatus: string = claveEstatus == "A" ? "AZUL" : claveEstatus == "COM" ? "VERDE" : claveEstatus === "CE" ? "AMARILLO" : "AZUL";

                arregloEstatus[0] = entidad.Estatus.Nombre;
                arregloEstatus[1] = undefined;
                arregloEstatus[2] = colorEstatus;
            }

            return <page.View>
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-building" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 4, 4, 4]} />
                            <label.Entidad id="Desarrollo" size={[12, 4, 4, 4]} />
                            <label.EstatusColor id={"Estatus"} value={arregloEstatus} size={[12, 12, 2, 2]} />
                        </Row>
                        <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                            <PaqueteUbicaciones />
                        </Column>
                    </page.OptionSection>
                   
                </Column>
            </page.View>;
        };
    });

    export let PaqueteUbicaciones: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.prototipo = Forms.getValue("Prototipo", PAQUETES_UBICACIONES, state);
            return retValue;
        };
        componentWillReceiveProps(nextProps: IPageEditProps, nextState: IPageEditProps): any {
            if (global.hasChanged(this.props.prototipo, nextProps.prototipo)) {
                if (nextProps.prototipo && nextProps.prototipo.ID && nextProps.prototipo.ID > 0) {
                    let desarrollo: any = Forms.getValue("Desarrollo", config.id, this.state);
                    global.dispatchSuccessful("load::UBICACIONES", []);

                    let url: string = global.encodeAllURL("scv", "Ubicaciones", { idDesarrollo: desarrollo.ID, IdPrototipo: nextProps.prototipo.ID, activos: 1, idEstatusUbicacion: 1,paquete:"false" });
                    dispatchAsync("load::UBICACIONES", url);
                }
                else if (nextProps.prototipo && nextProps.prototipo.ID && nextProps.prototipo.ID == -1) {
                    Forms.updateFormElement(PAQUETES_UBICACIONES, "Ubicaciones", { ID: -1, Nombre: "Seleccione una opcion" })
                    global.dispatchSuccessful("load::UBICACIONES", []);
                }
            };
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={PAQUETES_UBICACIONES}
                parent={config.id}
                title={"Ubicaciones"}
                level={1}
                style={{ paddingTop: 20 }}
                items={createSuccessfulStoreObject([])}
                icon={"fa fa-home"}
                size={[12, 6, 6, 6]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 1, 1, 1]} className="list-default-header">{"Orden"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Prototipo"}</Column>
                        <Column size={[12, 5, 5, 5]} className="list-default-header">{"Ubicación"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Estatus"}</Column>
                    </Row>
                </div>}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addObject("Ubicacion")
                        .addNumber("Orden")
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {
                            if (value.Ubicacion.ID === retValue.Ubicacion.ID) {
                                retValue.ID = value.ID;
                                retValue._found = true;
                            };
                        });
                    };
                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    let estatus: string = item.Estatus ? item.Estatus.Nombre : "";
                    let claveUbicacion: string = item.Ubicacion.ClaveFormato != null ? item.Ubicacion.ClaveFormato:item.Ubicacion.Clave;
                    return <Row>
                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                            <span className="badge badge-success">{item.Orden + " "}</span>
                        </Column>
                        <Column size={[12, 3, 3, 3]}>
                            <span>{item.Ubicacion.Prototipo.Nombre + " "}</span>
                        </Column>
                        <Column size={[12, 5, 5, 5]} className="listItem-default-item">
                            <span>{claveUbicacion+ " "}</span>
                        </Column>
                        <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                            <span className="badge badge-info">{estatus}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={PAQUETES_UBICACIONES} info={item}
                                extraData={[buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <input.Integer size={[12, 3, 3, 3]} id={"Orden"} label="Orden" idFormSection={PAQUETES_UBICACIONES} validations={[validations.required()]} />
                    <ddl.PrototiposDDl size={[12, 9, 9, 9]} id="Prototipo" idFormSection={PAQUETES_UBICACIONES} cargarDatos={false} agregarnuevoItem={true} />
                    <ddl.UbicacionesDDL size={[12, 12, 12, 12]} id="Ubicacion" idFormSection={PAQUETES_UBICACIONES} validations={[validations.required()]} cargarDatos={false} agregarnuevoItem={true}/>
                </Row>
            </page.SectionList>
        };
    })

    interface ICerrarPaqueteButton extends EK.UX.Buttons.IButtonProps {
        entidad?: any;
        config?: page.IPageConfig;
    }

    let CerrarPaqueteButton: any = global.connect(class extends React.Component<ICerrarPaqueteButton, {}> {
        constructor(props: ICerrarPaqueteButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: ICerrarPaqueteButton = {
            icon: "fa fa-check-circle",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let item: any = getData(this.props.entidad);

            let parametros: any = global.encodeParameters({ ID: item.ID, Estatus:"CE" });
            EK.Global.confirm($ml.titulo.cerrarPaquete.descripcion, $ml.titulo.cerrarPaquete.titulo, () => {
                global.asyncGet("base/scv/Paquetes/Get/UpdateEstatus/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        global.dispatchLoading("global-current-entity", data);
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchSuccessful("global-current-entity", data);
                        if (this.props.config) {
                            this.props.config.setState({ viewMode: true });
                        }
                        success($ml.mensajes.paqueteCerrado);
                    }
                });
            });
        }
        render(): JSX.Element {
            let idEntidad: any = global.getDataID(this.props.entidad);
            let entidad: any = global.getData(this.props.entidad);
            if (idEntidad > 0 && entidad && entidad.Estatus && entidad.Estatus.Clave == "COM") {
                return <Button {...this.props} onClick={this.onClick} />;

            }
            else {
                return null;
            }
            //return <Button {...this.props} onClick={this.onClick} />;
        }
    });


};