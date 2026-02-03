namespace EK.Modules.SCV.Pages.postventa.RUBA.SupervisoresUbicaciones {
    const PAGE_ID: string = "SupervisoresUbicaciones";
    const SECCION_SUPERVISORES_ID: string = PAGE_ID + "$supervisores";
    const SECCION_PLAZAS_ID: string = PAGE_ID + "$plazas";
    const SECCION_FRACCIONAMIENTOS_ID: string = PAGE_ID + "$fraccionamientos";
    const SECCION_UBICACIONES_ID: string = PAGE_ID + "$ubicaciones";
    const SECCION_PLAZA_SELECCIONADA: string = PAGE_ID + "$plazaSeleccionada";
    const SECCION_SUPERVISOR_SELECCIONADO: string = PAGE_ID + "$supervisorSeleccionado";
    const SECCION_FRACCIONAMIENTO_SELECCIONADO: string = PAGE_ID + "$fraccionamientoSeleccionado";


    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [SECCION_FRACCIONAMIENTOS_ID, SECCION_SUPERVISORES_ID, SECCION_UBICACIONES_ID ]);



    export const Edicion: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        componentWillMount() {
            global.dispatchSuccessful("global-page-data", [], SECCION_PLAZAS_ID);
            global.dispatchSuccessful("global-page-data", [], SECCION_SUPERVISORES_ID);
            global.dispatchSuccessful("global-page-data", [], SECCION_FRACCIONAMIENTOS_ID);
            global.dispatchSuccessful("global-page-data", [], SECCION_UBICACIONES_ID); 
            dispatchDefault("load::" + SECCION_SUPERVISOR_SELECCIONADO, {});
            dispatchDefault("load::" + SECCION_FRACCIONAMIENTO_SELECCIONADO, {});
            dispatchDefault("load::" + SECCION_PLAZA_SELECCIONADA, {});
        }
     
        componentWillUnmount() {
            global.dispatchSuccessful("global-page-data", [], SECCION_PLAZAS_ID);
            global.dispatchSuccessful("global-page-data", [], SECCION_SUPERVISORES_ID);
            global.dispatchSuccessful("global-page-data", [], SECCION_FRACCIONAMIENTOS_ID);
            global.dispatchSuccessful("global-page-data", [], SECCION_UBICACIONES_ID); 
            dispatchDefault("load::" + SECCION_SUPERVISOR_SELECCIONADO, {});
            dispatchDefault("load::" + SECCION_FRACCIONAMIENTO_SELECCIONADO, {});
            dispatchDefault("load::" + SECCION_PLAZA_SELECCIONADA, {});

        }

        onSave(props: page.IProps, item: global.EditForm): any {
            let model: any = item
                .addID()
                .addObject("Ubicaciones", SECCION_UBICACIONES_ID)
                .addVersion()
                .toObject();
            delete EK.Store.getState().global.catalogoOriginalF;
            delete EK.Store.getState().global.catalogoOriginalS;
            delete EK.Store.getState().global.catalogoOriginalU;
            Forms.updateFormElement(config.id, 'FiltrarInfoF', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoS', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoU', null);
            return model;
        };

        onFilter(props: any, filters: any, type?: string): void { };
        onEntitySaved(props: page.IProps): void {
            global.dispatchAsync("global-page-data", "base/scv/Plaza/Get/GetSPVPlazas/", SECCION_PLAZAS_ID);
           // props.config.setState({ viewMode: false });
        };
        onEntityLoaded(props: page.IProps): void { };

        onWillEntityLoad(id: any, props: page.IProps): void {
            global.setCurrentEntity({});
            global.dispatchAsync("global-page-data", "base/scv/Plaza/Get/GetSPVPlazas/", SECCION_PLAZAS_ID);
            //props.config.setState({ viewMode: false });
        };
        
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowNew={false}
                allowEdit={true}
                allowDelete={false}
                onSave={this.onSave.bind(this)}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                onEntitySaved={this.onEntitySaved}
                onFilter={this.onFilter.bind(this)}>
                <View />
                <Edit />
            </page.Main>
        };
    });

    interface IEditProps extends page.IProps {
    };

    let Edit: any = global.connect(class extends React.Component<IEditProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});

        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <PlazasCard idPageBase={PAGE_ID} />
                </Column>
                <Row>
                    <Column size={[12, 12, 12, 3]} >
                        <ViewSPVFraccionamientos />
                    </Column>
                    <Column size={[12, 12, 12, 4]}  >
                        <ViewSPVSupervisores />
                    </Column>
                    <Column size={[12, 12, 12, 5]} >
                        <ViewSPVUbicaciones  />
                    </Column>
                </Row>
            </page.Edit>
        }
    });

    interface IEditProps extends page.IProps {
    };

    let View: any = global.connect(class extends React.Component<IEditProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});

        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <PlazasCard idPageBase={PAGE_ID} />
                </Column>
                <Row>
                    <Column size={[12, 12, 12, 3]} >
                        <ViewSPVFraccionamientos />
                    </Column>
                    <Column size={[12, 12, 12, 4]}  >
                        <ViewSPVSupervisores  />
                    </Column>
                    <Column size={[12, 12, 12, 5]} >
                        <ViewSPVUbicaciones />
                    </Column>
                </Row>
            </page.View>
        }
    });

    export interface IPlazasdRF extends page.IProps {
        plazas?: DataElement;
        idPageBase: any;
        obtenerFraccionamientos?: (item: any) => void;
        plazaSeleccionada?: any;
    };

    export let PlazasCard: any = global.connect(class extends React.Component<IPlazasdRF, IPlazasdRF> {
        constructor(props: IPlazasdRF) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };
        static props: any = (state: any) => ({
            plazas: state.global["catalogo$" + SECCION_PLAZAS_ID],
            plazaSeleccionada: state.global[SECCION_PLAZA_SELECCIONADA]
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerFraccionamientos: (item: any): void => {
                let prevID: number = item && item.ID ? item.ID : null;
                if (prevID > 0) {
                } else {
                    prevID = null
                }
                global.dispatchSuccessful("global-page-data", [], SECCION_SUPERVISORES_ID);
                global.dispatchSuccessful("global-page-data", [], SECCION_UBICACIONES_ID);
                dispatchSuccessful("load::" + SECCION_PLAZA_SELECCIONADA, item);
                dispatchDefault("load::" + SECCION_SUPERVISOR_SELECCIONADO, {});
                dispatchDefault("load::" + SECCION_FRACCIONAMIENTO_SELECCIONADO, {});
                let encodedFilters: string = global.encodeObject({ activos: 1, IdPlaza: prevID });
                global.dispatchAsync("global-page-data", "base/kontrol/Fraccionamientos/all/" + encodedFilters, SECCION_FRACCIONAMIENTOS_ID);
            }
        });

        componentWillReceiveProps(nextProps: IPlazasdRF) {
            if (hasChanged(this.props.plazas, nextProps.plazas)) {
                if (global.isSuccessful(nextProps.plazas)) {
                    let cantidadItems: any = getData(nextProps.plazas).length;
                    if (cantidadItems > 0) {
                        let item: any = getData(nextProps.plazas)[0];
                        this.onClickElementHorizontal(item);
                    }

                }
            }
        };

        shouldComponentUpdate(nextProps: IPlazasdRF, {}): boolean {
            return hasChanged(this.props.plazas, nextProps.plazas);
        };

        onClickElementHorizontal(item: any): void {
            this.props.obtenerFraccionamientos(item);
            delete EK.Store.getState().global.catalogoOriginalF;
            delete EK.Store.getState().global.catalogoOriginalS;
            delete EK.Store.getState().global.catalogoOriginalU;
            Forms.updateFormElement(config.id, 'FiltrarInfoF', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoS', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoU', null);
        };

        render(): JSX.Element {
            let $page: any = $ml[''];
            let IndicaActualizando: any = isSuccessful(this.props.plazas) ? '' : <AwesomeSpinner paddingTop={50} size={40} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;
            let itemsModificados: DataElement = this.props.plazas;
            let items: DataElement = itemsModificados;
            let data: any[] = global.getData(items, []);
            let plazaSeleccionada: string = this.props.plazaSeleccionada === undefined || getData(this.props.plazaSeleccionada).ID === undefined ? 0 : getData(this.props.plazaSeleccionada).ID; 
            return <Column size={[12, 12, 12, 12]}  >
                <div className="portlet light   portlet-fit  bordered  ek-sombra " style={{ marginLeft: "-15px" }}>
                    <div className="portlet-body">
                        <Row className="timeline-expediente" style={{ background: "none" }} >
                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10" style={{ paddingBottom: 15 }}>
                                <span><i className="fas fa-boxes">&nbsp;</i><h5 style={{ margin: 0, display: "inline-block" }}> Plazas </h5></span>
                            </Column>
                            <Column size={[12, 12, 12, 12]} className="events-container" >
                                <Row style={{ marginBottom: "67px" }}>
                                    <div>
                                        <div> {IndicaActualizando}
                                            {this.props.plazas ?
                                                <EKHorizontalTimeLine
                                                    items={items}
                                                    desactivarFondo={true}
                                                    onClickElementHorizontal={this.onClickElementHorizontal}
                                                    page={$page}
                                                    idSeleccionado={plazaSeleccionada}
                                                    tipoPresentacion={6} />
                                                : null}
                                        </div>
                                    </div>
                                </Row>
                            </Column>
                        </Row>
                    </div>
                </div>
            </Column>;
        }
    });


    ///////////////////////////////////////////////////////////  FRACCIONAMIENTOS
    const listHeaderFraccionamientos: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 12, 12]} className="list-default-header">{"Fraccionamiento"}</Column>
            </Row>
        </Column>;

    interface IViewFraccionamientosProps extends page.IProps {
        fraccionamientos?: global.DataElement;
        fraccionamientoSeleccionado?: any;
    };

    let ViewSPVFraccionamientos: any = global.connect(class extends React.Component<IViewFraccionamientosProps, IViewFraccionamientosProps> {
        constructor(props: IViewFraccionamientosProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.fraccionamientos = state.global["catalogo$" + SECCION_FRACCIONAMIENTOS_ID];
            retValue.fraccionamientoSeleccionado = state.global[SECCION_FRACCIONAMIENTO_SELECCIONADO];
            return retValue;
        };
        shouldComponentUpdate(nextProps: IViewFraccionamientosProps, {}): boolean {
            return hasChanged(this.props.fraccionamientos, nextProps.fraccionamientos) ||
                hasChanged(this.props.fraccionamientoSeleccionado, nextProps.fraccionamientoSeleccionado);
        };

        onClickItem(item: any) {
            dispatchDefault("load::" + SECCION_SUPERVISOR_SELECCIONADO, {});

            if (item.ID != null && item.ID != undefined) {
                dispatchSuccessful("load::" + SECCION_FRACCIONAMIENTO_SELECCIONADO, item);
                let p: any = global.assign({
                    activos: 1,
                    IdFraccionamiento: item.Clave
                });
                dispatchAsyncPost("global-page-data", "base/kontrol/SupervisoresUbicaciones/GetBP/getSupervisoresFraccionamientos/", { parametros: p }, SECCION_SUPERVISORES_ID);
                dispatchAsyncPost("global-page-data", "base/kontrol/SupervisoresUbicaciones/GetBP/getUbicacionesFraccionamientos/", { parametros: p }, SECCION_UBICACIONES_ID);
                let items: any = EK.Store.getState().global["catalogo$" + SECCION_FRACCIONAMIENTOS_ID];
                EK.Global.dispatchSuccessful("global-page-data", items.data, SECCION_FRACCIONAMIENTOS_ID);
            } else {
                global.dispatchSuccessful("global-page-data", [], SECCION_SUPERVISORES_ID);
                global.dispatchSuccessful("global-page-data", [], SECCION_UBICACIONES_ID);
            }
            delete EK.Store.getState().global.catalogoOriginalS;
            delete EK.Store.getState().global.catalogoOriginalU;
        }

        render(): JSX.Element {
            return <div > 
                <page.SectionList
                    id={SECCION_FRACCIONAMIENTOS_ID}
                    parent={config.id}
                    subTitle={(data: any): any => {
                        return <span>
                            <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>
                            <br />
                            <input.Text id="FiltrarInfoF" placeHolder="Ingrese informacion para filtrar" change={global.filtrarDataResultados.bind(this, SECCION_FRACCIONAMIENTOS_ID, 'catalogoOriginalF', ['Nombre', 'Clave'])} label="" idFormSection={config.id} size={[12, 12, 12, 12]} />
                        </span>
                    }}
                    icon={"fa fa-cog"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={true}
                    onItemClick={this.onClickItem.bind(this)}
                    height={"380px"}
                    drawOddLine={true}
                    //selectable={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={listHeaderFraccionamientos}
                    formatter={(index: number, item: any) => {
                        let itemSeleccionado: string = this.props.fraccionamientoSeleccionado && getData(this.props.fraccionamientoSeleccionado).Clave ? getData(this.props.fraccionamientoSeleccionado).Clave : "TODOS";
                        let estatusSeleccion: boolean = itemSeleccionado == item.Clave ? true : false;
                        let estatusClass: string = "";

                        if (estatusSeleccion == true) {
                            estatusClass += " selected";
                        }
                        return <div className={estatusClass}>
                            <Row style={{ padding: "0px 10px" }}>
                            <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                        </Row> </div>;
                    }}>
                </page.SectionList>
            </div>
        };
    });

    /////////////////////// USUARIOS 
    const listHeaderUsuarios: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"Supervisor"}</Column>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"Coordinador"}</Column>
            </Row>
        </Column>;

    interface IViewProps extends page.IProps {
        usuarios?: global.DataElement;
        ubicaciones?: global.DataElement;
        supervisorSeleccionado?: any;
    };

    let ViewSPVSupervisores: any = global.connect(class extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.usuarios = state.global["catalogo$" + SECCION_SUPERVISORES_ID];
            retValue.supervisorSeleccionado = state.global[SECCION_SUPERVISOR_SELECCIONADO];
            return retValue;
        };
        shouldComponentUpdate(nextProps: IViewProps, {}): boolean {
            return hasChanged(this.props.usuarios, nextProps.usuarios) ||
                hasChanged(this.props.supervisorSeleccionado, nextProps.supervisorSeleccionado);
        };
        onClickItem(item: any) {
            if (item.IdSupervisor != null && item.IdSupervisor != undefined ) {
                dispatchSuccessful("load::" + SECCION_SUPERVISOR_SELECCIONADO, item);
                let items: any = EK.Store.getState().global["catalogo$" + SECCION_SUPERVISORES_ID];
                EK.Global.dispatchSuccessful("global-page-data", items.data, SECCION_SUPERVISORES_ID)

            } else {
                dispatchSuccessful("load::" + SECCION_SUPERVISOR_SELECCIONADO, {});
            }
        }
        componentWillReceiveProps(nextProps: IViewProps): any {
            if (global.hasChanged(this.props.supervisorSeleccionado, nextProps.supervisorSeleccionado)) {
                let items: any = EK.Store.getState().global["catalogo$" + SECCION_SUPERVISORES_ID];
                EK.Global.dispatchSuccessful("global-page-data", items.data, SECCION_SUPERVISORES_ID);
            };
        };

        render(): JSX.Element {
            return <div >
                <page.SectionList
                    id={SECCION_SUPERVISORES_ID}
                    parent={config.id}
                    subTitle={(data: any): any => {
                        return <span>
                            <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>
                            <br />
                            <input.Text id="FiltrarInfoS" placeHolder="Ingrese informacion para filtrar" change={global.filtrarDataResultados.bind(this, SECCION_SUPERVISORES_ID, 'catalogoOriginalS', ['Supervisor.Nombre', 'Supervisor.Clave'])} label="" idFormSection={config.id} size={[12, 12, 12, 12]} />
                        </span>
                    }}
                    icon={"fa fa-cog"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={true}
                    onItemClick={this.onClickItem.bind(this)}
                    height={"380px"}
                    drawOddLine={true}
                    //selectable={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={listHeaderUsuarios}
                    formatter={(index: number, item: any) => {
                        let itemSeleccionado: string = this.props.supervisorSeleccionado && getData(this.props.supervisorSeleccionado).ID ? getData(this.props.supervisorSeleccionado).ID : 0;
                        let estatusSeleccion: boolean = itemSeleccionado == item.ID ? true : false;
                        let estatusClass: string = "";

                        if (estatusSeleccion == true) {
                            estatusClass += " selected";
                        }

                        return <div className={estatusClass}>
                            <Row style={{ margin: 0 }}>
                                <Column size={[6, 6, 6, 6]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Supervisor.ID}</span>{item.Supervisor.Nombre}</Column>
                                <Column size={[6, 6, 6, 6]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Coordinador.ID}</span>{item.Coordinador.Nombre}</Column>
                            </Row>
                        </div>;
                    }}>
                </page.SectionList>
            </div>

          
        };

    });

    const listHeaderUbicaciones: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Ubicación"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Supervisor"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Coordinador"}</Column>
            </Row>
        </Column>;

    let ViewSPVUbicaciones: any = global.connect(class extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
            this.asignarElemento = this.asignarElemento.bind(this);
            this.eliminarElemento = this.eliminarElemento.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.ubicaciones = state.global["catalogo$" + SECCION_UBICACIONES_ID];
            return retValue;
        };
        shouldComponentUpdate(nextProps: IViewProps, {}): boolean {
            return hasChanged(this.props.ubicaciones, nextProps.ubicaciones);
        };

        asignarElemento(posicion: any, item: any, e: any): void {
            let items: any[] = new Array();
            let asignar: any = getData(EK.Store.getState().global[SECCION_SUPERVISOR_SELECCIONADO]);
            if (asignar.IdSupervisor === null || asignar.IdSupervisor === undefined || asignar.IdSupervisor <= 0) {
                warning("Debe Seleccionar un Supervisor");
                return null;
            } else {
                if (this.props.ubicaciones.data.length > 0) {
                    items = getData(this.props.ubicaciones);
                    items[posicion].IdCoordinador = asignar.Coordinador.ID;
                    items[posicion].Coordinador.ID = asignar.Coordinador.ID;
                    items[posicion].Coordinador.Clave = asignar.Coordinador.Clave;
                    items[posicion].Coordinador.Nombre = asignar.Coordinador.Nombre;
                    items[posicion].IdSupervisor = asignar.Supervisor.ID;
                    items[posicion].Supervisor.ID = asignar.Supervisor.ID;;
                    items[posicion].Supervisor.Clave = asignar.Supervisor.Clave;
                    items[posicion].Supervisor.Nombre = asignar.Supervisor.Nombre;
                    items[posicion]._modificado = true;

                    let info: any = this.props.ubicaciones;
                    let elementos = info;
                    elementos.data = items;
                    elementos.timestamp = info.timestamp + 1;
                    Forms.updateFormElement(config.id, SECCION_UBICACIONES_ID, elementos)
                }
            }
        }

        eliminarElemento(posicion: any, item: any, e: any): void {
            let items: any[] = new Array();
            if (this.props.ubicaciones.data.length > 0) {

                items = getData(this.props.ubicaciones);
                items[posicion].IdCoordinador = null;
                items[posicion].Coordinador.ID = null; 
                items[posicion].Coordinador.Clave = null; 
                items[posicion].Coordinador.Nombre = null; 
                items[posicion].IdSupervisor =null;
                items[posicion].Supervisor.ID = null; 
                items[posicion].Supervisor.Clave = null; 
                items[posicion].Supervisor.Nombre = null;
                items[posicion]._modificado = true
                let info: any = this.props.ubicaciones;
                let elementos = info;
                elementos.data = items;
                elementos.timestamp = info.timestamp + 1;
                Forms.updateFormElement(config.id, SECCION_UBICACIONES_ID, elementos)
            }
        }
        FiltrarResultados(CATALOGO_ID: any, CATALOGO_BU_ID, Filtros: any[], value: any) {
            let ListaFiltrada = [];
            let ListaOriginalBackUp: any = EK.Store.getState().global[CATALOGO_BU_ID];

            if (ListaOriginalBackUp === undefined) {
                let catalogo = `catalogo$${CATALOGO_ID}`;
                if (EK.Store.getState().global[catalogo].data.length === 0)
                    return
                ListaOriginalBackUp = EK.Store.getState().global[catalogo].data;
                global.dispatchSuccessful(`load::${CATALOGO_BU_ID}`, ListaOriginalBackUp);
            } else {
                ListaOriginalBackUp = ListaOriginalBackUp.data;
            }
            for (let u of ListaOriginalBackUp) {
                value = value.trim().replace(/\s/g,'');
                if (u.Ubicacion.Clave.toLowerCase().includes(value.toLowerCase())) {
                    ListaFiltrada.push(u);
                }
            }
            global.dispatchSuccessful("global-page-data", ListaFiltrada, CATALOGO_ID);
        }
        render(): JSX.Element {
            let editarElemento: any = getData(this.props.state).viewMode === true  ? false : true;
            
            return <div>
                <page.SectionList
                    id={SECCION_UBICACIONES_ID}
                    parent={config.id}
                    subTitle={(data: any): any => {
                        return <span>
                            <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>
                            <br />
                            <input.Text id="FiltrarInfoU" placeHolder="Ingrese informacion para filtrar" change={this.FiltrarResultados.bind(this, SECCION_UBICACIONES_ID, 'catalogoOriginalU', ['Supervisor.Nombre', 'Supervisor.Clave'])} label="" idFormSection={config.id} size={[12, 12, 12, 12]} />
                            {/*<input type="text" onKeyUp={this.focus.bind(this)} size={12} />*/}

                        </span>
                    }}
                    icon={"fa fa-cog"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={true}
                    height={"380px"}
                    drawOddLine={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={listHeaderUbicaciones}
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">
                                {(item.Coordinador.ID === null || item.Coordinador.ID === undefined) && editarElemento===true ?
                                    <i className="fa fa-plus-square" title="Agregar Supervisor" style={{ color: "blue", cursor: "pointer", fontSize: "15px" }} onClick={(e) => this.asignarElemento(index, item, e)}        ></i>
                                    : null}
                                {(item.Coordinador.ID != null || item.Coordinador.ID != undefined) && editarElemento === true ?  
                                    <i className="fas fa-times" title="Eliminar Supervisor" style={{ color: "red", cursor: "pointer", fontSize: "15px" }} onClick={(e) => this.eliminarElemento(index, item, e)}        ></i>
                                    : null
                                }
                            </Column>
                            <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Ubicacion.ClaveFormato}</span></Column>
                            <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Supervisor.ID}</span>{item.Supervisor.Nombre}</Column>
                            <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Coordinador.ID}</span>{item.Coordinador.Nombre}</Column>
                        </Row>;
                    }}>
                </page.SectionList>
            </div>
      
        };
    });





};
