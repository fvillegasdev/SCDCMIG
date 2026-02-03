namespace EK.Modules.SCV.Pages.postventa.RUBA.PersonalEntregaUbicaciones {
    const PAGE_ID: string = "PersonalEntregaUbicaciones";
    const REPORTE_USUARIOS_ID: string = PAGE_ID + "$usuarios";
    const REPORTE_PLAZAS_ID: string = PAGE_ID + "$plazas";
    const REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID: string = PAGE_ID + "$fraccionamientosNoAsignados";
    const REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID: string = PAGE_ID + "$fraccionamientosAsignados";
    const REPORTE_PLAZA_SELECCIONADA: string = PAGE_ID + "$plazaSeleccionada";
    const REPORTE_USUARIO_SELECCIONADO: string = PAGE_ID + "$usuarioSeleccionado";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID, REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID]);
   
      export const Edicion: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        componentWillMount() {
            global.dispatchSuccessful("global-page-data", [], REPORTE_PLAZAS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_USUARIOS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID);
            dispatchDefault("load::" + REPORTE_PLAZA_SELECCIONADA, {});
        }

        componentWillUnmount() {
            global.dispatchSuccessful("global-page-data", [], REPORTE_PLAZAS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_USUARIOS_ID); 
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID); 
            dispatchDefault("load::" + REPORTE_PLAZA_SELECCIONADA, {});
        }
       
        onSave(props: page.IProps, item: global.EditForm): any {
            let idPlazaSeleccionada: any = getData(EK.Store.getState().global[REPORTE_PLAZA_SELECCIONADA]).ID;
            let idUsuarioSeleccionado: any = getData(EK.Store.getState().global[REPORTE_USUARIO_SELECCIONADO]).ID; 

            let cantidadAsignados: any[] = global.getData(Forms.getValue(REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID, config.id), []);

            if (cantidadAsignados.length <= 0 || cantidadAsignados === undefined || cantidadAsignados === null) {
                warning("No Existen Fraccionamientos Asignados");
                return null;
            }
            let model: any = item
                .addID()
                .addStringConst("IdPlaza", idPlazaSeleccionada)
                .addNumberConst("IdUsuario", idUsuarioSeleccionado)
                .addObject("Fraccionamiento", REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID)
                .addVersion()
                .toObject();
           
            return model;
        };

        onFilter(props: any, filters: any, type?: string): void { };
        onEntitySaved(props: page.IProps): void {
            //global.dispatchAsync("global-page-data", "base/scv/Plaza/Get/GetSPVPlazas/", REPORTE_PLAZAS_ID);
            // props.config.setState({ viewMode: false });
            let item = getData(EK.Store.getState().global.PersonalEntregaUbicaciones$plazaSeleccionada);
            let prevID: number = item && item.ID ? item.ID : null;
            if (prevID > 0) {
            } else {
                prevID = null
            }
            let p: any = global.assign({
                activos: 1,
                IdPlaza: prevID
            });
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID);
            dispatchSuccessful("load::" + REPORTE_PLAZA_SELECCIONADA, item);
            dispatchAsyncPost("global-page-data", "base/kontrol/PersonalEntregaUbicaciones/GetBP/getPersonalEntregaVivienda/", { parametros: p }, REPORTE_USUARIOS_ID);
            delete EK.Store.getState().global.catalogoOriginalUPP;
            delete EK.Store.getState().global.catalogoOriginalFA;
            delete EK.Store.getState().global.catalogoOriginalFNA;
            Forms.updateFormElement(config.id, 'FiltrarInfo', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoFA', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoFNA', null);
          };
          componentDidMount() {
              console.log('Cargado')
        }
        onEntityLoaded(props: page.IProps): void { };

        onWillEntityLoad(id: any, props: page.IProps): void {
            global.setCurrentEntity({});
            global.dispatchAsync("global-page-data", "base/scv/Plaza/Get/GetSPVPlazas/", REPORTE_PLAZAS_ID);
           // props.config.setState({ viewMode: false });
        };
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowNew={false}
                allowDelete={false}
                allowEdit={true}
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

    interface IViewProps extends page.IProps {
    };

    let View: any = global.connect(class extends React.Component<IViewProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});

        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let isNew: boolean = global.getDataID(this.props.entidad) <= 0;
            let displayAntiguo: boolean = false;
            let idPlaza: string = undefined;
            let editCampos: any = {};
            let badgeAntiguo: string = "badge badge-info";


            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <PlazasCard idPageBase={PAGE_ID} />
                </Column>
                <Column size={[12, 12, 6, 6]}>
                    <ViewSPVUsuarios />
                </Column>
                <Column size={[12, 12, 6, 6]}>
                    <Column size={[12, 12, 12, 12]}>
                        <ViewSPVFraccionamientosAsignados />
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <ViewSPVFraccionamientosNoAsignados />
                    </Column>
                </Column>
            </page.View>
        }
    });


    interface IEditProps extends page.IProps {
    };

    let Edit: any = global.connect(class extends React.Component<IEditProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({ });

        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);

            let isNew: boolean = global.getDataID(this.props.entidad) <= 0;
            let displayAntiguo: boolean = false;
            let idPlaza: string = undefined;
            let editCampos: any = {};
            let badgeAntiguo: string = "badge badge-info";

            
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <PlazasCard idPageBase={PAGE_ID} />
                </Column>
                <Column size={[12, 12, 6, 6]}>
                    <ViewSPVUsuarios />
                </Column>
                <Column size={[12, 12, 6, 6]}>
                    <Column size={[12, 12, 12, 12]}>
                        <ViewSPVFraccionamientosAsignados />
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <ViewSPVFraccionamientosNoAsignados />
                    </Column>
                </Column>
            </page.Edit>
        }
    });

    export interface IPlazasdRF extends page.IProps {
         plazas?: DataElement;
         idPageBase: any;
         plazaSeleccionada?: any;
    };

    export let PlazasCard: any = global.connect(class extends React.Component<IPlazasdRF, IPlazasdRF> {
        constructor(props: IPlazasdRF) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };
        static props: any = (state: any) => ({
            plazas: state.global["catalogo$" + REPORTE_PLAZAS_ID],
            plazaSeleccionada: state.global[REPORTE_PLAZA_SELECCIONADA]
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

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
            let prevID: number = item && item.ID ? item.ID : null;
            if (prevID > 0) {
            } else {
                prevID = null
            }
            let p: any = global.assign({
                activos: 1,
                IdPlaza: prevID
            });
            //console.log('Seleccionar plaza')
            delete EK.Store.getState().global.catalogoOriginalUPP;
            delete EK.Store.getState().global.catalogoOriginalFA;
            delete EK.Store.getState().global.catalogoOriginalFNA;
            Forms.updateFormElement(config.id, 'FiltrarInfo', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoFA', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoFNA', null);
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID); 
            dispatchSuccessful("load::" + REPORTE_PLAZA_SELECCIONADA, item);
            dispatchAsyncPost("global-page-data", "base/kontrol/PersonalEntregaUbicaciones/GetBP/getPersonalEntregaVivienda/", { parametros: p }, REPORTE_USUARIOS_ID);
        };

        render(): JSX.Element {
            let $page: any = $ml[''];
            let IndicaActualizando: any = isSuccessful(this.props.plazas) ? '' : <AwesomeSpinner paddingTop={50} size={40} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;
            let itemsModificados: DataElement = this.props.plazas;
            let items: DataElement = itemsModificados;
            let data: any[] = global.getData(items, []);
            let plazaSeleccionada: string = this.props.plazaSeleccionada === undefined || getData(this.props.plazaSeleccionada).ID === undefined ? 0 : getData(this.props.plazaSeleccionada).ID; 
            return <Column size={[12, 12, 12, 12]}  >
                <div className="portlet light   portlet-fit  bordered  ek-sombra " style={{ marginLeft:"-15px" }}>
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

    /////////////////////// USUARIOS 
    const listHeaderUsuarios: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"Usuario"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Fracc. Configurados"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    interface IViewProps extends page.IProps {
        usuarios?: global.DataElement;
    };

    let ViewSPVUsuarios: any = global.connect(class extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.usuarios = state.global["catalogo$" + REPORTE_USUARIOS_ID];
            return retValue;
        };
        shouldComponentUpdate(nextProps: IViewProps, { }): boolean {
            return hasChanged(this.props.usuarios, nextProps.usuarios);
        };
        onClickItem(item: any) {
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID);

            if (item.ID != null && item.ID != undefined) {
                let idPlazaSeleccionada: any = getData(EK.Store.getState().global[REPORTE_PLAZA_SELECCIONADA]).ID;
                dispatchSuccessful("load::" + REPORTE_USUARIO_SELECCIONADO, item);
                let p: any = global.assign({
                    activos: 1,
                    IdPlaza: idPlazaSeleccionada,
                    IdUsuarioSeleccionado: item.Usuario.ID
                });

                dispatchAsyncPost("global-page-data", "base/kontrol/PersonalEntregaUbicaciones/GetBP/getAsignado/", { parametros: p }, REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID);
                dispatchAsyncPost("global-page-data", "base/kontrol/PersonalEntregaUbicaciones/GetBP/getNoAsignado/", { parametros: p }, REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID);
            }
            delete EK.Store.getState().global.catalogoOriginalFA;
            delete EK.Store.getState().global.catalogoOriginalFNA;

        }

       
        
        render(): JSX.Element {
            return <page.OptionSection
                id={REPORTE_USUARIOS_ID}
                parent={config.id}
                icon="fa fa-users"
                level={1} collapsed={false}
                subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                    {[global.getData(this.props.usuarios, []).length].join("")}
                </span>}>
                <input.Text id="FiltrarInfo" placeHolder="Ingrese informacion para filtrar" change={global.filtrarDataResultados.bind(this, REPORTE_USUARIOS_ID, 'catalogoOriginalUPP', ['Usuario.Nombre', 'Usuario.ID'])} idFormSection={config.id} size={[12, 12, 12, 12]} />

                <PanelUpdate info={this.props.usuarios}>
                    
                    <List
                        id={REPORTE_USUARIOS_ID}
                        items={getData(this.props.usuarios)}
                        readonly={true}
                        horizontalScrolling={true}
                        selectable={true}
                        height={"450px"}
                        onItemClick={this.onClickItem.bind(this)}
                        drawOddLine={true}
                        listHeader={listHeaderUsuarios}
                        formatter={(index: number, item: any) => {
                            //console.log(item.Usuario)
                            return <Row style={{ margin: 0 }}>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow">
                                    <div style={{ overflow: "unset" }}>
                                    {item.Usuario && item.Usuario.Foto
                                        ?
                                        <img alt="" className="img-circle" src={item.Usuario.Foto} style={{ width: "30px", height: "30px" }} />
                                        : null}
                                    </div>
                                </Column>
                                <Column size={[6, 6, 6, 6]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Usuario.ID}</span>{item.Usuario.Nombre}</Column>
                                <Column size={[3, 3, 3, 3]} className="listItem-default-item"> <span className="badge badge-info" style={{background:"#4cd964" }}>{item.Cantidad}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                            </Row>
                        }} />
                </PanelUpdate>
            </page.OptionSection>
        };
    });

    ///////////////////////////////////////////////////////////  FRACCIONAMIENTOS
    const listHeaderFraccionamientos: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[8, 8, 8, 8]} className="list-default-header">{"Fraccionamiento"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    interface IViewFraccionamientosProps extends page.IProps {
        fraccionamientos?: global.DataElement;
        fraccionamientosAsignados?: any;
        fraccionamientosNoAsignados?: any;
    };

    let ViewSPVFraccionamientosAsignados: any = global.connect(class extends React.Component<IViewFraccionamientosProps, IViewFraccionamientosProps> {
        constructor(props: IViewFraccionamientosProps) {
            super(props);
            this.agregarElemento = this.agregarElemento.bind(this);
            this.eliminarElemento = this.eliminarElemento.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.fraccionamientos = state.global["catalogo$" + REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID];
            retValue.fraccionamientosAsignados = Forms.getValue(REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID, config.id);
            retValue.fraccionamientosNoAsignados = Forms.getValue(REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID, config.id);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IViewFraccionamientosProps, { }): boolean {
            //console.log(global.hasChanged(this.props.fraccionamientosAsignados, nextProps.fraccionamientosAsignados))
            //console.log(this.props.fraccionamientos, nextProps.fraccionamientos)
            return hasChanged(this.props.fraccionamientos, nextProps.fraccionamientos) ||
                global.hasChanged(this.props.fraccionamientosAsignados, nextProps.fraccionamientosAsignados);
        };

        agregarElemento(item: any) {
            
            let catalogo = `catalogo$${REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID}`;
            let receptor: any = this.props.fraccionamientosNoAsignados;
            let ListaBackup = EK.Store.getState().global.catalogoOriginalFNA;
            receptor.timestamp++;
            receptor.data.push(item);

            EK.Global.dispatchSuccessful("global-page-data", receptor.data, REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID)
            Forms.updateFormElement(config.id, REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID, receptor.data)

            if (ListaBackup !== undefined && ListaBackup !== null) {
                if (ListaBackup.data.length !== receptor.data.length) {
                    ListaBackup.data.push(item);
                }
                global.dispatchSuccessful("load::catalogoOriginalFNA", ListaBackup.data);
            }   

        }

        eliminarElemento( item: any, e: any): void {
            let items: any[] = new Array();
            if (this.props.fraccionamientosAsignados.data.length > 0) {
                this.agregarElemento(item);

                let posicion: any; 
                let totalElementos: any = getData(this.props.fraccionamientosAsignados).length;
                items = getData(this.props.fraccionamientosAsignados);
                for (var i = 0; i < totalElementos; i++){
                    if (items[i].Clave === item.Clave && items[i]._eliminado != true  ){
                        posicion = i; 
                        break;
                    }
                }
                
                items[posicion]._eliminado = true; 
                let info: any = this.props.fraccionamientosAsignados; 
                let elementos = info;
                elementos.data = items;
                elementos.timestamp = info.timestamp + 1;
                Forms.updateFormElement(config.id, REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID, elementos)
            }
        }

        

        render(): JSX.Element {
            let editarElemento: any = getData(this.props.state).viewMode === true ? false : true;

            return <div>
                <page.SectionList
                    id={REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID}
                    parent={config.id}
                    subTitle={(data: any): any => {
                        return <span>
                            <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>
                            <br />
                            <input.Text id="FiltrarInfoFA" placeHolder="Ingrese informacion para filtrar" change={global.filtrarDataResultados.bind(this, REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID, 'catalogoOriginalFA', ['Nombre', 'Clave'])} label="" idFormSection={config.id} size={[12, 12, 12, 12]} />
                        </span>
                    }}
                    icon={"fa fa-cog"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={true}
                    
                    height={"450px"}
                    drawOddLine={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={listHeaderFraccionamientos  }
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                                <Column size={[8, 8, 8, 8]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                    {editarElemento === true ?
                                        <i className="fas fa-times" title="Eliminar Fraccionamiento" style={{ color: "red", cursor: "pointer" }} onClick={(e) => this.eliminarElemento(item, e)}        ></i>
                                        : null}
                                </Column>
                            </Row>;
                    }}>

                </page.SectionList>
            </div>
        };
    });

    //FRACCIONAMIENTOS NO ASIGNADOS
    let ViewSPVFraccionamientosNoAsignados: any = global.connect(class extends React.Component<IViewFraccionamientosProps, IViewFraccionamientosProps> {
        constructor(props: IViewFraccionamientosProps) {
            super(props);
            this.agregarElemento = this.agregarElemento.bind(this);
            this.eliminarElemento = this.eliminarElemento.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.fraccionamientos = state.global["catalogo$" + REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID];
            retValue.fraccionamientosAsignados = Forms.getValue(REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID, config.id);
            retValue.fraccionamientosNoAsignados = Forms.getValue(REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID, config.id);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IViewFraccionamientosProps, { }): boolean {
            
            return hasChanged(this.props.fraccionamientos, nextProps.fraccionamientos) ||
                global.hasChanged(this.props.fraccionamientosNoAsignados, nextProps.fraccionamientosNoAsignados);
        };

        agregarElemento(item: any) {
            let receptor: any = this.props.fraccionamientosAsignados;
            let ListaBackup = EK.Store.getState().global.catalogoOriginalFA;
            item._eliminado = false;
            item._nuevo = true;
            //item.ID = -1;
            receptor.timestamp = receptor.timestamp + 1;
            receptor.data.push(item);

            EK.Global.dispatchSuccessful("global-page-data", receptor.data, REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID);

            if (ListaBackup !== undefined && ListaBackup !== null) {
                console.log(ListaBackup.data.length, receptor.data.length);
                if (ListaBackup.data.length !== receptor.data.length) {
                    ListaBackup.data.push(item);
                }
                global.dispatchSuccessful("load::catalogoOriginalFA", ListaBackup.data);
            }            
        }

        eliminarElemento(posicion: any, item: any, e: any): void {
            let items: any[] = new Array();
            if (this.props.fraccionamientosNoAsignados.data.length > 0) {
                this.agregarElemento(item);

                items = getData(this.props.fraccionamientosNoAsignados);
                items.splice(posicion, 1);

                let info: any = this.props.fraccionamientosNoAsignados;
                let elementos = info;
                elementos.data = items;
                elementos.timestamp = info.timestamp + 1;
                Forms.updateFormElement(config.id, REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID, elementos)
            }
        }


        render(): JSX.Element {
            let editarElemento: any = getData(this.props.state).viewMode === true ? false : true;
            return <div>
                <page.SectionList
                    id={REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID}
                    parent={config.id}
                    subTitle={(data: any): any => {
                        return <span>
                            <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>
                            <br />
                            <input.Text id="FiltrarInfoFNA" placeHolder="Ingrese informacion para filtrar" change={global.filtrarDataResultados.bind(this, REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID, 'catalogoOriginalFNA', ['Nombre', 'Clave'])} label="" idFormSection={config.id} size={[12, 12, 12, 12]} />
                        </span>
                    }}
                    icon={"fa fa-cog"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={true}
                    height={"450px"}
                    drawOddLine={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={listHeaderFraccionamientos}
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[8, 8, 8, 8]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                {editarElemento === true ?
                                    <i className="fa fa-plus-square" title="Agregar Fraccionamiento" style={{ color: "blue", cursor: "pointer" }} onClick={(e) => this.eliminarElemento(index, item, e)}        ></i>
                                    : null}
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>
            </div>
        };
    });
};
