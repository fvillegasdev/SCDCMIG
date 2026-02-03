namespace EK.Modules.Kontrol.Pages {
    const PAGE_ID: string = "ENK005$EX";

    const ICON_BAN: string = "icon-ek-003";
    const ICON_READ: string = "icon-ek-135";
    const ICON_WRITE: string = "icon-ek-068";
    const ICON_NEW: string = "icon-ek-091";
    const ICON_DELETE: string = "icon-ek-138";

    interface IExcepcionesProps extends React.Props<any> {
        data?: any;
        entidad?: any;
        claveEntidad?: string;
        opciones?: any;
        excepciones?: any;
        params?: { id: number; };
        obtenerDatos?: (idUsuario: number, idNivel: number) => any;
        nivelesAsignados?: any;
        nivelSeleccionado?: any;
        actualizarExcepciones?: (excepciones: any) => any;
        saveExcepciones?: (excepciones: any) => any;
        obtenerNivelesAsignados?: (idUsuario: number) => any;
        seleccionarNivel?: (nivel: any) => any;
        cargaUsuario?: (idUsuario: number) => void;
    };

    interface IExcepcionesState extends IExcepcionesProps {
        viewMode: boolean;
    };

    class ExcepcionesForm extends React.Component<IExcepcionesProps, IExcepcionesState> {
        constructor(props: IExcepcionesProps) {
            super(props);

            this.onCancelEditForm = this.onCancelEditForm.bind(this);
            //this.onSaveForm = this.onSaveForm.bind(this);
            this.onEditForm = this.onEditForm.bind(this);
            this.onSaveExcepciones = this.onSaveExcepciones.bind(this);
            this.onNivelClick = this.onNivelClick.bind(this);
            this.onPermisoClick = this.onPermisoClick.bind(this);
            this.state = { viewMode: true };
        }

        static defaultProps: IExcepcionesProps = {};

        onEditForm(): void {
            this.setState({ viewMode: false });
        };

        onSaveExcepciones(): any {
            let acciones: any[] = this.props.excepciones.data;
            let accionesState: any[] = [];
            let wasFound: boolean = false;

            for (var i = 0; i < acciones.length; i++) {
                accionesState.push({ idOpcion: acciones[i].opcion.ID, permisos: acciones[i].permiso.nuevo });
            };

            this.props.saveExcepciones({
                idUser: this.props.entidad.data.ID,
                idNivel: this.props.nivelSeleccionado.data.ID,
                acciones: accionesState
            });

            this.setState({ viewMode: false });
        };

        onCancelEditForm(): void {
            if (this.state.viewMode) {
                ReactRouter.hashHistory.goBack();
            } else {
                this.props.actualizarExcepciones([]);
                this.setState({ viewMode: true });
            }
        };

        //onSaveForm(): void {
        //    ReactRouter.hashHistory.goBack();
        //};

        shouldComponentUpdate(nextProps: IExcepcionesProps, nextState: IExcepcionesState) {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.excepciones, nextProps.excepciones) ||
                hasChanged(this.props.nivelesAsignados, nextProps.nivelesAsignados) ||
                hasChanged(this.props.nivelSeleccionado, nextProps.nivelSeleccionado) ||
                hasChanged(this.props.opciones, nextProps.opciones) ||
                this.state.viewMode !== nextState.viewMode;
        }

        componentDidMount(): void {
            this.props.actualizarExcepciones([]);

            if (this.props.params.id) {
                if (isSuccessful(this.props.entidad)) {
                    this.props.obtenerNivelesAsignados(this.props.entidad.data.ID);
                } else {
                    this.props.cargaUsuario(Number(this.props.params.id));
                };
            } else {
                dispatchFailed("usuarios-setSelected", null);
            }

            //if (!isLoadingOrSuccessful(this.props.entidad)) {
            //    // load
            //} else {
            //    if (!isLoadingOrSuccessful(this.props.nivelesAsignados)) {
            //        this.props.obtenerNivelesAsignados(this.props.entidad.data.ID);
            //    } else {
            //        if (!isLoadingOrSuccessful(this.props.opciones)) {
            //            this.props.obtenerDatos(this.props.entidad.data.ID, this.props.nivelSeleccionado.data.ID);
            //        };
            //    };
            //}
        };

        //componentDidUpdate(prevProps: INivelesProps) {
        //    if (isSuccessful(this.props.entidad)) {
        //        if (isLoadingOrSuccessful(this.props.nivelesAsignados)) { } else {
        //            this.props.obtenerDatos(this.props.entidad.data.ID);
        //        }
        //    };

        componentDidUpdate(prevProps: IExcepcionesProps) {
            if (isSuccessful(this.props.entidad)) {
                if (isLoadingOrSuccessful(this.props.nivelesAsignados)) { } else {
                    this.props.obtenerNivelesAsignados(this.props.entidad.data.ID);
                }
            };

            if (prevProps.opciones.status === AsyncActionTypeEnum.updating) {
                if (this.props.opciones.status === AsyncActionTypeEnum.successful) {
                    success("La configuración de excepciones fué guardada");

                    this.props.actualizarExcepciones([]);
                    this.setState({ viewMode: true });
                };
            };
        };

        componentWillReceiveProps(nextProps: IExcepcionesProps): void {
            if (hasChanged(this.props.nivelSeleccionado, nextProps.nivelSeleccionado)) {
                if (isSuccessful(nextProps.nivelSeleccionado)) {
                    this.props.actualizarExcepciones([]);
                    this.props.obtenerDatos(getDataID(this.props.entidad), getDataID(nextProps.nivelSeleccionado));
                };
            };

            if (hasChanged(this.props.entidad, nextProps.entidad)) {
                if (isSuccessful(nextProps.entidad)) {
                    this.props.obtenerNivelesAsignados(getDataID(nextProps.entidad));
                };
            };
        };

        onPermisoClick(item: any, permiso: number): void {
            let acciones: any[] = this.props.excepciones.data;
            let accionesState: any[] = [];
            let wasFound: boolean = false;

            for (var i = 0; i < acciones.length; i++) {
                let value: any = {
                    opcion: EK.Global.assign({}, acciones[i].opcion),
                    permiso: EK.Global.assign({}, acciones[i].permiso)
                };

                if (value.opcion.ID === item.ID) {
                    if (value.permiso.original !== permiso) {
                        value.permiso.nuevo = permiso;

                        accionesState.push(value);
                    };

                    wasFound = true;
                } else {
                    accionesState.push(value);
                };
            };

            if (!wasFound) {
                accionesState.push({
                    opcion: EK.Global.assign({}, item),
                    permiso: { original: item.Permisos, nuevo: permiso }
                });
            };

            this.props.actualizarExcepciones(accionesState);
        };

        updatePermisos(acciones: any[]): any {
            if (!isSuccessful(this.props.opciones)) {
                return this.props.opciones;
            };

            let retValue: any[] = [];

            let fnSearchPermiso = (opcion: any): number => {
                let permiso: number = null;

                if (acciones && acciones.length > 0) {
                    for (var i = 0; i < acciones.length; i++) {
                        if (opcion.ID === acciones[i].opcion.ID) {
                            permiso = acciones[i].permiso.nuevo;

                            break;
                        };
                    };
                };

                return permiso;
            }

            let fnIterateOpciones = (parent, opciones: any[]) => {
                for (var i = 0; i < opciones.length; i++) {
                    let opcion: any = opciones[i];
                    let nuevoPermiso: number = fnSearchPermiso(opcion);

                    let nuevaOpcion: any = {
                        ID: opcion.ID,
                        Clave: opcion.Clave,
                        Descripcion: opcion.Descripcion,
                        EsSeccion: opcion.EsSeccion,
                        Icono: opcion.Icono,
                        OPermisos: opcion.Permisos,
                        Permisos: nuevoPermiso === null ? (opcion.Excepcion !== -1 ? opcion.Excepcion : opcion.Permisos) : nuevoPermiso,
                        EsExcepcion: opcion.Excepcion !== -1,
                        EsNuevoPermiso: nuevoPermiso !== null,
                        Ruta: opcion.Ruta,
                        Opcion: opcion.Opcion,
                        Opciones: []
                    };

                    parent.push(nuevaOpcion);

                    if (opcion.Opciones && opcion.Opciones.length > 0) {
                        fnIterateOpciones(nuevaOpcion.Opciones, opcion.Opciones);
                    };
                };
            };

            fnIterateOpciones(retValue, this.props.opciones.data);

            return createSuccessfulStoreObject(retValue);
        };

        onNivelClick(item: any): any {
            this.props.seleccionarNivel(item);
        }

        render(): JSX.Element {
            let $$bc: any = $ml.bc;
            let bc: any = [$$bc.global.ek, $$bc.kontrol.cg, $$bc.kontrol.usuarios];

            //
            let iconNormal = (icon: string, oPermisos: boolean) => {
                return oPermisos ? <span className="label bg-grey-salt bg-font-grey-salt" style={{ padding: "6px 2px 2px 2px" }}>
                    <i className={icon} style={{ fontSize: 16, height: 16 }}></i>
                </span> : <i className={icon}></i>;
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
            let iconSelEdit = (icon: string, warning?: boolean) => {
                let labelClass: string = "btn btn-icon-only green-meadow";
                if (warning === true) {
                    labelClass = "btn btn-icon-only red-intense";
                };

                return <button className={labelClass} style={{ height: 28, paddingTop: 6 }}>
                    <i className={icon} style={{ fontSize: 16, height: 16 }}></i>
                </button>;
            };

            let entidad: any = this.props.entidad;
            let current: any = entidad.data;
            let opciones: any = this.updatePermisos(this.props.excepciones.data);
            let niveles: any[] = this.props.nivelesAsignados.data;
            let nivelSeleccionado: string = isSuccessful(this.props.nivelSeleccionado) ? this.props.nivelSeleccionado.data.Nivel : "Seleccione un Nivel";
            let excepcionItem: any = <span className="badge badge-danger">E</span>;
            //let estatus: boolean = false;
            //estatus = EK.Global.getGlobal(Catalogos.estatus).isActive(entidad.Estatus);
            let loadingObj: any = !isSuccessful(this.props.entidad) ? this.props.entidad : this.props.nivelesAsignados;
            let mensajeActualizacion: string = isUpdating(opciones) ? $ml.global.guardando : $ml.global.leyendo;

            let list: any;
            if (this.state.viewMode === true) {
                list = <List key="listaConsulta"
                    items={opciones}
                    childrenPropertyName="Opciones"
                    readonly={false}
                    addRemoveButton={false}
                    formatter={(index: number, item: any) => {
                        let icono: string = item.Icono ? item.Icono : "fa fa-list-alt";
                        let esSeccion: boolean = item.EsSeccion;

                        return <div>
                            <i className={icono} style={{ height: 25, padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
                            {esSeccion ? <span className="badge badge-info">Sección</span> : null}
                            <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Opcion} {item.EsNuevoPermiso ? <span className="badge badge-warning">E</span> : (item.EsExcepcion ? <span className="badge badge-danger">E</span> : null)}</div>
                            {item.ID > 0 ?
                                <div style={{ display: "inline-block", float: "right", marginTop: -3, fontSize: 18 }}>
                                    {item.Permisos === 0 ? iconSel(ICON_BAN, true) : iconNormal(ICON_BAN, item.OPermisos === 0)}
                                    {item.Permisos === 1 ? iconSel(ICON_READ) : iconNormal(ICON_READ, item.OPermisos === 1)}
                                    {item.Permisos === 2 ? iconSel(ICON_WRITE) : iconNormal(ICON_WRITE, item.OPermisos === 2)}
                                    {item.Permisos === 4 ? iconSel(ICON_NEW) : iconNormal(ICON_NEW, item.OPermisos === 4)}
                                    {item.Permisos === 8 ? iconSel(ICON_DELETE) : iconNormal(ICON_DELETE, item.OPermisos === 8)}
                                </div> : null
                            }
                        </div>;
                    } } />;
            } else {
                list = <List key="listaEdicion"
                    items={opciones}
                    childrenPropertyName="Opciones"
                    readonly={false}
                    addRemoveButton={false}
                    formatter={(index: number, item: any) => {
                        let icono: string = item.Icono ? item.Icono : "fa fa-list-alt";
                        let esSeccion: boolean = item.EsSeccion;

                        return <div>
                            <i className={icono} style={{ height: 25, padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
                            {esSeccion ? <span className="badge badge-info">Sección</span> : null}
                            <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Opcion} {item.EsNuevoPermiso ? <span className="badge badge-warning">E</span> : (item.EsExcepcion ? <span className="badge badge-danger">E</span> : null)}</div>
                            {item.ID > 0 ?
                                <div className="btn-group" style={{ display: "inline-block", float: "right", marginTop: -3, fontSize: 18 }}>
                                    {item.Permisos === 0 ? iconSelEdit(ICON_BAN, true) : <ButtonNormal icon={ICON_BAN} OPermiso={item.OPermisos === 0} permiso={EK.UX.Auth.NONE_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
                                    {item.Permisos === 1 ? iconSelEdit(ICON_READ) : <ButtonNormal icon={ICON_READ} OPermiso={item.OPermisos === 1} permiso={EK.UX.Auth.READ_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
                                    {item.Permisos === 2 ? iconSelEdit(ICON_WRITE) : <ButtonNormal icon={ICON_WRITE} OPermiso={item.OPermisos === 2} permiso={EK.UX.Auth.WRITE_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
                                    {item.Permisos === 4 ? iconSelEdit(ICON_NEW) : <ButtonNormal icon={ICON_NEW} OPermiso={item.OPermisos === 4} permiso={EK.UX.Auth.NEW_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
                                    {item.Permisos === 8 ? iconSelEdit(ICON_DELETE) : <ButtonNormal icon={ICON_DELETE} OPermiso={item.OPermisos === 8} permiso={EK.UX.Auth.DELETE_PERMISSION} item={item} onClick={this.onPermisoClick}></ButtonNormal>}
                                </div>
                                : null}
                        </div>;
                    } } />;
            };

            let title: IPageTitle = {
                title: current.Nombre,
                subTitle: ["<", current.Email, ">"].join("")
            };

            // create the page component
            let page: JSX.Element = <PageV2 id={PAGE_ID} title={title} breadcrumb={bc}>
                <PageButtons>
                    <EditButton onClick={this.onEditForm} text="" visible={this.state.viewMode} />
                    <Usuarios$Excepciones$SaveButton onClick={this.onSaveExcepciones} visible={!this.state.viewMode} />
                    <CancelButton onClick={this.onCancelEditForm} />
                </PageButtons>
                <Row style={{ marginBottom: 35 }}>
                    <Column size={[12, 12, 12, 12]}>
                        <OptionSection title={$ml.usuarios.excepciones.title} readOnly={false} collapsed={false}>
                            <Row>
                                <Column size={[12, 12, 12, 12]}>
                                    <div className="btn-group" style={{ width: "100%", marginBottom: 20 }}>
                                        <button className="btn btn-default btn-sm dropdown-toggle" aria-expanded="false" type="button" data-toggle="dropdown" style={{ width: "100%", textAlign: "left" }}>
                                            {nivelSeleccionado}
                                            <i className="fa fa-angle-down"></i>
                                        </button>
                                        <ul className="dropdown-menu" role="menu" style={{ maxHeight: 250, width: "100%", overflow: "hidden", overflowY: "scroll" }}>
                                            {niveles.map((value: any, index: any) => {
                                                return <li key={index}><Link onClick={this.onNivelClick} info={value} text={value.Nivel}></Link></li>;
                                            })}
                                        </ul>
                                    </div>
                                    <UpdateColumn info={opciones} text={mensajeActualizacion}>
                                    {list}
                                    </UpdateColumn>
                                </Column>
                            </Row>
                        </OptionSection>
                    </Column>
                </Row>
            </PageV2>;

            return page;
        };
    }
    // 
    class ButtonNormal extends React.Component<{
        icon: string;
        item: any;
        permiso: number;
        OPermiso: boolean;
        onClick: (item: any, permiso: AuthorizePermission) => any
    }, {}> {
        render(): JSX.Element {
            return <button className={"btn btn-icon-only " + (this.props.OPermiso ? "grey-salt" : "white")} style={{ height: 28 }} onClick={(): any => { this.props.onClick(this.props.item, this.props.permiso); } }>
                <i className={this.props.icon} style={{ fontSize: 18, height: 18, marginTop: -4 }}></i>
            </button>;
        }
    };

    const mapEXButtonProps: any = (state: any) => {
        return {
            visible: state.usuarios.excepciones.data.length > 0
        };
    };

    const mapExcepcionesProps: any = (state: any): any => {
        return {
            entidad: state.usuarios.selected,
            opciones: state.usuarios.opciones,
            excepciones: state.usuarios.excepciones,
            nivelesAsignados: state.usuarios.nivelesAsignados,
            nivelSeleccionado: state.usuarios.nivelAsignadoSeleccionado
        };
    };

    const mapExcepcionesDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            cargaUsuario: (idUsuario: number): void => {
                dispatchAsync("usuarios-setSelected", "Usuarios/GetById/" + idUsuario);
            },
            obtenerDatos: (idUsuario: number, idNivel: number): any => {
                dispatchAsync("usuarios-excepciones-opciones", "usuarios(" + idUsuario + ")/niveles(" + idNivel + ")/excepciones");
            },
            obtenerNivelesAsignados: (idUsuario?: number): any => {
                if (!idUsuario) {
                    dispatchSuccessful("usuarios-niveles-asignados", []);
                } else {
                    dispatchAsync("usuarios-niveles-asignados", "usuarios(" + idUsuario + ")/niveles/asignados/todos");
                };
            },
            seleccionarNivel: (nivel: any): any => {
                dispatchSuccessful("usuarios-nivel-asignado-sel", nivel);
            },
            actualizarExcepciones: (excepciones: any): any => {
                dispatchSuccessful("usuarios-excepciones", excepciones);
            },
            saveExcepciones(excepciones: any) {
                dispatch(actionAsync({
                    action: "usuarios-excepciones-save",
                    type: HttpMethod.PUT,
                    url: "usuarios/excepciones/guardar",
                    data: excepciones,
                    custom: {
                        processData: false,
                        contentType: false
                    },
                    status: AsyncActionTypeEnum.updating
                }));
            }
        };
    };

    export let Usuarios$Excepciones$SaveButton: any = ReactRedux.connect(mapEXButtonProps, null)(EK.UX.Buttons.SaveButton);
    export let Usuario$Excepciones: any = ReactRedux.connect(mapExcepcionesProps, mapExcepcionesDispatchs)(ExcepcionesForm);
}