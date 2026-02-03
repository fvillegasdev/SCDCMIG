//namespace EK.Modules.Kontrol.Pages.Niveles {
//    const SECTION_ID: string = "nivelescatalogo$CONFIG";
//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(SECTION_ID);
//    };
//    const ICON_BAN: string = "icon-ek-003";
//    const ICON_READ: string = "icon-ek-135";
//    const ICON_WRITE: string = "icon-ek-068";
//    const ICON_NEW: string = "icon-ek-091";
//    const ICON_DELETE: string = "icon-ek-138";

//    interface INivelesConfigProps extends EK.Modules.Kontrol.Pages.INivelesProps {
//        opciones?: any;
//        modulos?: any;
//        cargarOpciones?: (idNivel: number, idModulo: number) => void;
//        actualizarAcciones?: (acciones: any) => any;
//        acciones?: any;
//    }

//    interface INivelesConfigState extends EK.Modules.Kontrol.Pages.INivelesState {
//        opciones?: any;
//        idModulo?: number;
//    }

//    export class Configuracion extends React.Component<INivelesConfigProps, INivelesConfigState> {
//        constructor(props: INivelesConfigProps) {
//            super(props);

//            this.onGetOpciones = this.onGetOpciones.bind(this);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: true };
//        }

//        static defaultProps: INivelesConfigProps = {
//            nivel: undefined,
//            global: {}
//        };

//        saveForm(item: any): void {
//            let acciones: any[] = this.props.acciones.data;
//            let accionesState: any[] = [];
//            let wasFound: boolean = false;

//            for (var i = 0; i < acciones.length; i++) {
//                accionesState.push({ idOpcion: acciones[i].opcion.ID, permisos: acciones[i].permiso.nuevo });
//            };

//            this.props.guardar({
//                idNivel: this.props.params.id,
//                idModulo: this.state.idModulo,
//                acciones: accionesState
//            });

//            this.setState({ viewMode: false });
//        };

//        editForm(): void {
//            this.setState({ viewMode: false });
//        };

//        cancelEditForm(): void {
//            if (!this.props.isNew) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.push("kontrol/niveles");
//            }
//        };

//        onGetOpciones(idNivel: number, idModulo: number): void {
//            this.setState({
//                idModulo: idModulo
//            });

//            this.props.cargarOpciones(idNivel, idModulo);
//        };

//        shouldComponentUpdate(nextProps: INivelesConfigProps, nextState: INivelesConfigState): boolean {
//            return (getTimestamp(this.props.nivel) !== getTimestamp(nextProps.nivel))
//                || (getTimestamp(this.props.opciones) !== getTimestamp(nextProps.opciones))
//                || (getTimestamp(this.props.modulos) !== getTimestamp(nextProps.modulos))
//                || (getTimestamp(this.props.acciones) !== getTimestamp(nextProps.acciones))
//                || (this.state.viewMode !== nextState.viewMode);
//        };

//        componentWillMount(): any {
//            let opciones: any = createDefaultStoreObject([]);

//            dispatchSync("niveles-configuracion", opciones);
//            this.setState({ opciones: opciones });
//        };

//        componentWillReceiveProps(nextProps: INivelesConfigState): any {
//            this.setState({ opciones: nextProps.opciones });
//        };

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);
//            requireGlobal(Catalogos.modulos);

//            if (this.props.params.id) {
//                if (Number(this.props.params.id) === Number(this.props.nivel.data.ID)) {
//                } else {
//                    this.props.cargarDatos(Number(this.props.params.id));
//                }
//                //this.props.cargarOpciones(Number(this.props.params.id));
//            } else {
//                dispatchFailed("niveles-setSelected", null);
//            }
//        };

//        componentDidUpdate(prevProps: INivelesConfigProps, prevState: EK.Modules.Kontrol.Pages.INivelesState): any {
//            if (prevProps.opciones.status === AsyncActionTypeEnum.updating) {
//                if (this.props.opciones.status === AsyncActionTypeEnum.successful) {
//                    success("La configuración del nivel ha sido actualizada...");

//                    this.props.actualizarAcciones([]);
//                }
//            }
//        }

//        render(): JSX.Element {
//            let editView: boolean = this.props.isNew || !this.state.viewMode;
//            // define the breadcrumb element, maybe could be automatically in the future
//            let itemsBC: EK.UX.IBreadcrumbItem[] = [
//                { text: "EK", link: "/" },
//                { text: "Catálogos Globales", link: "/" },
//                { text: "Niveles", link: "kontrol/niveles" },
//                { text: "Configuración", href: "kontrol/niveles/editar" }
//            ];

//            let nivel: any = getData(this.props.nivel);

//            let status: AsyncActionTypeEnum =
//                (!this.props.nivel || !this.props.nivel.status) ? AsyncActionTypeEnum.default : this.props.nivel.status;

//            let estatus: boolean = false;
//            if (nivel.Clave) {
//                estatus = EK.Global.getGlobal(Catalogos.estatus).isActive(nivel.Estatus);
//            }

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={SECTION_ID} breadcrumb={itemsBC} title={"Configuración de Seguridad"}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={null} /> : null}
//                        {!editView ? <EditButton onClick={null} /> : null}
//                        <CancelButton onClick={null} />
//                    </PageButtons>
//                    <Grid>
//                        <Row>
//                            <PanelUpdate info={this.props.nivel}>
//                                {this.state.viewMode
//                                    ? <View
//                                        data={nivel}
//                                        opciones={this.state.opciones}
//                                        onEditForm={this.editForm}
//                                        onGetOpciones={this.onGetOpciones}
//                                        idModulo={this.state.idModulo}
//                                        modulos={this.props.modulos} />
//                                    : <Edit
//                                        isNew={this.props.isNew}
//                                        data={nivel}
//                                        acciones={this.props.acciones}
//                                        opciones={this.state.opciones}
//                                        onCancelEditForm={this.cancelEditForm}
//                                        onSaveForm={this.saveForm}
//                                        onGetOpciones={this.onGetOpciones}
//                                        actualizarAcciones={this.props.actualizarAcciones}
//                                        idModulo={this.state.idModulo}
//                                        modulos={this.props.modulos} />}
//                            </PanelUpdate>
//                        </Row>
//                    </Grid>
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            nivel: state.niveles.selected,
//            history: state.niveles.history[state.niveles.selected.data.ID],
//            modulos: state.global.MODULOS,
//            opciones: state.niveles.configuracion,
//            acciones: state.niveles.acciones
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (idNivel: number): void => {
//                dispatchAsync("niveles-setSelected", ["Niveles/GetById/", idNivel].join(""));
//            },
//            actualizarAcciones: (acciones: any): any => {
//                dispatchSuccessful("niveles-acciones", acciones);
//            },
//            cargarOpciones: (idNivel: number, idModulo: number): void => {
//                dispatchAsync("niveles-configuracion", ["niveles(", idNivel, ")/configuracion(", idModulo, ")"].join(""));
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "niveles-configuracion-guardar",
//                    type: HttpMethod.PUT,
//                    url: "niveles/configuracion/guardar",
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

//    /*** BEGIN: EDIT FORM ***/
//    class ButtonNormal extends React.Component<{ icon: string; item: any; permiso: number; onClick: (item: any, permiso: AuthorizePermission) => any }, {}> {
//        render(): JSX.Element {
//            return <button className="btn btn-icon-only white" style={{ height: 28 }} onClick={(): any => { this.props.onClick(this.props.item, this.props.permiso); } }>
//                <i className={this.props.icon} style={{ fontSize: 18, height: 18, marginTop: -4 }}></i>
//            </button>;
//        }
//    };

//    interface IEditProps extends React.Props<any> {
//        data?: any;
//        isNew?: boolean;
//        onCancelEditForm?: () => any;
//        onSaveForm?: (item: any) => any;
//        idModulo?: number;
//        modulos?: any;
//        opciones?: any;
//        acciones?: any;
//        onGetOpciones?: (idNivel: number, idModulo: number) => any;
//        actualizarAcciones?: (items: any[]) => void;
//    };

//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);

//            this.onPermisoClick = this.onPermisoClick.bind(this);
//            this.onModuloSelected = this.onModuloSelected.bind(this);
//            this.refreshState = this.refreshState.bind(this);
//            this.onSaveFormClick = this.onSaveFormClick.bind(this);
//            this.updatePermisos = this.updatePermisos.bind(this);

//            this.refreshState(props);
//        };

//        onSaveFormClick(): void {
//            this.props.onSaveForm(null);
//        };

//        onModuloSelected(e): void {
//            let current: any = this.props.data;

//            if (this.props.onGetOpciones && e) {
//                this.setState({ data: { modulo: { ID: e.ID } } });

//                this.props.onGetOpciones(current.ID, e.ID);
//            }
//        }

//        onSave(info: any): void {
//            this.props.onSaveForm(null);
//        }

//        onPermisoClick(item: any, permiso: number): void {
//            let acciones: any[] = this.props.acciones.data;
//            let accionesState: any[] = [];
//            let wasFound: boolean = false;

//            for (var i = 0; i < acciones.length; i++) {
//                let value: any = {
//                    opcion: EK.Global.assign({}, acciones[i].opcion),
//                    permiso: EK.Global.assign({}, acciones[i].permiso)
//                };

//                if (value.opcion.ID === item.ID) {
//                    if (value.permiso.original !== permiso) {
//                        value.permiso.nuevo = permiso;

//                        accionesState.push(value);
//                    };

//                    wasFound = true;
//                } else {
//                    accionesState.push(value);
//                };
//            };

//            if (!wasFound) {
//                accionesState.push({
//                    opcion: EK.Global.assign({}, item),
//                    permiso: { original: item.Permisos, nuevo: permiso }
//                });
//            };

//            this.props.actualizarAcciones(accionesState);
//        };

//        updatePermisos(acciones: any[]): any {
//            if (!isSuccessful(this.props.opciones)) {
//                return this.props.opciones;
//            };

//            let retValue: any[] = [];

//            let fnSearchPermiso = (opcion: any): number => {
//                let permiso: number = null;

//                if (acciones && acciones.length > 0) {
//                    for (var i = 0; i < acciones.length; i++) {
//                        if (opcion.ID === acciones[i].opcion.ID) {
//                            permiso = acciones[i].permiso.nuevo;

//                            break;
//                        };
//                    };
//                };

//                return permiso;
//            }

//            let fnIterateOpciones = (parent, opciones: any[]) => {
//                for (var i = 0; i < opciones.length; i++) {
//                    let opcion: any = opciones[i];
//                    let nuevoPermiso: number = fnSearchPermiso(opcion);

//                    let nuevaOpcion: any = {
//                        ID: opcion.ID,
//                        Clave: opcion.Clave,
//                        Descripcion: opcion.Descripcion,
//                        EsSeccion: opcion.EsSeccion,
//                        Icono: opcion.Icono,
//                        IdModulo: opcion.IdModulo,
//                        Permisos: nuevoPermiso === null ? opcion.Permisos : nuevoPermiso,
//                        Ruta: opcion.Ruta,
//                        Opcion: opcion.Opcion,
//                        Opciones: []
//                    };

//                    parent.push(nuevaOpcion);

//                    if (opcion.Opciones && opcion.Opciones.length > 0) {
//                        fnIterateOpciones(nuevaOpcion.Opciones, opcion.Opciones);
//                    };
//                };
//            };

//            fnIterateOpciones(retValue, this.props.opciones.data);

//            return createSuccessfulStoreObject(retValue);
//        };

//        refreshState(props: IEditProps): void {
//            let mData: any[] = props.modulos.data;
//            let modulos: any = props.modulos;

//            mData.splice(0, 0, { ID: -1, Nombre: "Seleccione un Módulo para configurar" });
//            modulos.data = mData;

//            this.state = {
//                data: { modulo: { ID: props.idModulo } },
//                modulos: modulos,
//                opciones: props.opciones
//            };
//        };

//        componentWillReceiveProps(nextProps: IEditProps): any {
//            if (getTimestamp(nextProps.modulos) !== getTimestamp(this.state.modulos)) {
//                this.refreshState(nextProps);
//            };
//        };

//        render(): JSX.Element {
//            let current: any = this.props.data;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let pageTitle: string = current.Nivel;
//            let iconStyle: React.CSSProperties = { padding: 3, width: 24, height: 24 };

//            let opciones: any = this.updatePermisos(this.props.acciones.data);
//            let mensajeActualizacion: string =
//                opciones.status === AsyncActionTypeEnum.updating ?
//                    "Guardando la configuración del Nivel" : "Obteniendo la configuración del Nivel";
//            //
//            let iconSel = (icon: string, warning?: boolean) => {
//                let labelClass: string = "btn btn-icon-only green-meadow";
//                if (warning === true) {
//                    labelClass = "btn btn-icon-only red-intense";
//                };

//                return <button className={labelClass} style={{ height: 28, paddingTop: 6 }}>
//                    <i className={icon} style={{ fontSize: 16, height: 16 }}></i>
//                </button>;
//            };

//            return <FadeInColumn>
//                <Row>
//                    <Label label="Nivel" value={current.Nivel} size={[12, 12, 12, 12]} />
//                </Row>
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <OptionSection id={SECTION_ID} title="Configuración de acceso" readOnly={true}>
//                            <UpdateColumn info={opciones} text={mensajeActualizacion}>
//                                <Row>
//                                    <DropdownList id="ModulosEdit" label="Módulos" value={this.state.data.modulo} items={this.state.modulos} size={[12, 12, 12, 12]}
//                                        change={this.onModuloSelected} helpLabel="Módulos habilitados del sistema" />
//                                </Row>
//                                <Row>
//                                    <List items={opciones}
//                                        childrenPropertyName="Opciones"
//                                        readonly={false}
//                                        addRemoveButton={false}
//                                        formatter={(index: number, item: any) => {
//                                            let icono: string = item.Icono ? item.Icono : "fa fa-list-alt";
//                                            let esSeccion: boolean = item.EsSeccion;

//                                            return <div>
//                                                <i className={icono} style={{ height: 25, padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
//                                                {esSeccion ? <span className="badge badge-info">Sección</span> : null}
//                                                <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Opcion}</div>
//                                                <div className="btn-group" style={{ display: "inline-block", float: "right", marginTop: -3, fontSize: 18 }}>
//                                                    {item.Permisos === 0 ? iconSel(ICON_BAN, true) : <ButtonNormal icon={ICON_BAN} permiso={EK.UX.Auth.NONE_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
//                                                    {item.Permisos === 1 ? iconSel(ICON_READ) : <ButtonNormal icon={ICON_READ} permiso={EK.UX.Auth.READ_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
//                                                    {item.Permisos === 2 ? iconSel(ICON_WRITE) : <ButtonNormal icon={ICON_WRITE} permiso={EK.UX.Auth.WRITE_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
//                                                    {item.Permisos === 4 ? iconSel(ICON_NEW) : <ButtonNormal icon={ICON_NEW} permiso={EK.UX.Auth.NEW_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
//                                                    {item.Permisos === 8 ? iconSel(ICON_DELETE) : <ButtonNormal icon={ICON_DELETE} permiso={EK.UX.Auth.DELETE_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
//                                                </div>
//                                            </div>;
//                                        } } />
//                                </Row>
//                            </UpdateColumn>
//                        </OptionSection>
//                    </Column>
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IViewProps extends React.Props<any> {
//        data?: any;
//        idModulo?: number;
//        modulos?: any;
//        opciones?: any;
//        onEditForm?: () => any;
//        onGetOpciones?: (idNivel: number, idModulo: number) => any;
//    };

//    class View extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);

//            this.refreshState = this.refreshState.bind(this);
//            this.onCancelEditForm = this.onCancelEditForm.bind(this);
//            this.onModuloSelected = this.onModuloSelected.bind(this);

//            this.refreshState(props);
//        }

//        static defaultProps: IViewProps = {
//            data: createDefaultStoreObject([]),
//            modulos: createDefaultStoreObject([]),
//            opciones: createDefaultStoreObject([])
//        };

//        onCancelEditForm(): void {
//            ReactRouter.hashHistory.goBack();
//        }

//        onModuloSelected(e): void {
//            let current: any = this.props.data;

//            if (this.props.onGetOpciones && e) {
//                this.setState({ data: { modulo: { ID: e.ID } } });

//                this.props.onGetOpciones(current.ID, e.ID);
//            }
//        }

//        refreshState(props: IViewProps): void {
//            let mData: any[] = props.modulos.data;
//            let modulos: any = props.modulos;

//            mData.splice(0, 0, { ID: -1, Nombre: "Seleccione un Módulo para configurar" });
//            modulos.data = mData;

//            this.state = {
//                data: { modulo: { ID: props.idModulo } },
//                modulos: modulos,
//                opciones: props.opciones
//            };
//        }

//        componentWillReceiveProps(nextProps: IViewProps): any {
//            if (getTimestamp(nextProps.modulos) !== getTimestamp(this.state.modulos)) {
//                this.refreshState(nextProps);
//            };
//        }

//        render(): JSX.Element {
//            let current: any = this.props.data;
//            let Status: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let opciones: any = this.props.opciones;
//            let iconStyle: React.CSSProperties = { padding: 3, width: 24, height: 24 };
//            let mensajeActualizacion: string =
//                opciones.status === AsyncActionTypeEnum.updating ?
//                    "Guardando la configuración del Nivel" : "Obteniendo la configuración del Nivel";

//            let iconNormal = (icon: string) => {
//                return <i className={icon}></i>;
//            };

//            //
//            let iconSel = (icon: string, warning?: boolean) => {
//                let labelClass: string = "label bg-green-meadow bg-font-green-meadow";
//                if (warning === true) {
//                    labelClass = "label label-danger";
//                };

//                return <span className={labelClass} style={{ padding: "6px 2px 2px 2px" }}>
//                    <i className={icon} style={{ fontSize: 16, height: 16 }}></i>
//                </span>;
//            };

//            //let getOptionType = (item: any) => {
//            //    if (item) {
//            //        if (item.EsSeccion === true) {
//            //            return <i className="icon-ek-130 font-blue-soft" style={{fontSize: 18}}></i>;
//            //        } else {
//            //            if (!item.Ruta) {
//            //                return <i className="icon-ek-074 font-yellow-crusta" style={{ fontSize: 18 }}></i>;
//            //            } else {
//            //                return <i className="icon-ek-085 font-blue-steel" style={{ fontSize: 18 }}></i>;
//            //            }
//            //        }
//            //    }

//            //    return null;
//            //}

//            return <FadeInColumn>
//                <Row>
//                    <Label label="Nivel" value={current.Nivel} size={[12, 12, 12, 12]} />
//                </Row>
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <OptionSection id={SECTION_ID} title="Configuración de acceso" readOnly={true} collapsed={true}>
//                            <UpdateColumn info={opciones} text={mensajeActualizacion}>
//                                <Row>
//                                    <DropdownList id="Modulos" label="Módulos" value={this.state.data.modulo} items={this.state.modulos} size={[12, 12, 12, 12]}
//                                        change={this.onModuloSelected} helpLabel="Módulos habilitados del sistema" />
//                                </Row>
//                                <Row>
//                                    <List items={opciones}
//                                        childrenPropertyName="Opciones"
//                                        readonly={false}
//                                        addRemoveButton={false}
//                                        formatter={(index: number, item: any) => {
//                                            let icono: string = item.Icono ? item.Icono : "fa fa-list-alt";
//                                            let esSeccion: boolean = item.EsSeccion;

//                                            return <div>
//                                                <i className={icono} style={{ height: 25, padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
//                                                {esSeccion ? <span className="badge badge-info">Sección</span> : null}
//                                                <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Opcion}</div>
//                                                <div style={{ display: "inline-block", float: "right", marginTop: -3, fontSize: 18 }}>
//                                                    {item.Permisos === 0 ? iconSel(ICON_BAN, true) : iconNormal(ICON_BAN)}
//                                                    {item.Permisos === 1 ? iconSel(ICON_READ) : iconNormal(ICON_READ)}
//                                                    {item.Permisos === 2 ? iconSel(ICON_WRITE) : iconNormal(ICON_WRITE)}
//                                                    {item.Permisos === 4 ? iconSel(ICON_NEW) : iconNormal(ICON_NEW)}
//                                                    {item.Permisos === 8 ? iconSel(ICON_DELETE) : iconNormal(ICON_DELETE)}
//                                                </div>
//                                            </div>;
//                                        } } />
//                                </Row>
//                            </UpdateColumn>
//                        </OptionSection>
//                    </Column>
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/

//    const titleActionMapProps: any = (state: any): any => {
//        return {
//            title: state.niveles && state.niveles.selected && state.niveles.selected.data ? state.niveles.selected.data.Nivel : null
//        };
//    };

//    const actionMapProps: any = (state: any): any => {
//        return {
//            sectionId: SECTION_ID,
//            item: state.niveles.selected
//        };
//    };

//    export let Nivel$Configuracion: any = ReactRedux.connect(mapProps, mapDispatchs)(Configuracion);
//    export let Nivel$Configuracion$Action: any = ReactRedux.connect(actionMapProps, null)(EK.UX.Tabs.AccionSectionItem);
//    //export let Nivel$Configuracion$TitleAction: any = ReactRedux.connect(titleActionMapProps, null)(EK.UX.Tabs.AccionTitleItem);
//}

//import Nivel$Configuracion = EK.Modules.Kontrol.Pages.Niveles.Configuracion;
//import Nivel$Configuracion$Action = EK.Modules.Kontrol.Pages.Niveles.Nivel$Configuracion$Action;
////import Nivel$Configuracion$TitleAction = EK.Modules.Kontrol.Pages.Niveles.Nivel$Configuracion$TitleAction;