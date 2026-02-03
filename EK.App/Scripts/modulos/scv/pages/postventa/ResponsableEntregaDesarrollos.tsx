namespace EK.Modules.SCV.Pages.postventa.ResponsableEntregaDesarrollos {
    const PAGE_ID: string = "ResponsableEntregaDesarrollos";
    const REPORTE_PLAZAS_ID: string = PAGE_ID + "$plazas";
    const REPORTE_GRUPOS_ID: string = PAGE_ID + "$grupos";
    const REPORTE_DESARROLLOS_ASIGNADOS_ID: string = PAGE_ID + "$desarrollosAsignados";
    const REPORTE_PLAZA_SELECCIONADA: string = PAGE_ID + "$plazaSeleccionada";
    const REPORTE_GRUPO_SELECCIONADO: string = PAGE_ID + "$grupoSeleccionado";




    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [REPORTE_DESARROLLOS_ASIGNADOS_ID, REPORTE_GRUPOS_ID]);

    export const Edicion: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        componentWillMount() {
            global.dispatchSuccessful("global-page-data", [], REPORTE_PLAZAS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_DESARROLLOS_ASIGNADOS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_GRUPOS_ID);
            global.dispatchSuccessful("global-page-data", {}, REPORTE_GRUPO_SELECCIONADO);
            global.dispatchSuccessful("global-page-data", {}, REPORTE_PLAZA_SELECCIONADA);
        }

        componentWillUnmount() {
            global.dispatchSuccessful("global-page-data", [], REPORTE_PLAZAS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_DESARROLLOS_ASIGNADOS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_GRUPOS_ID);
            global.dispatchSuccessful("global-page-data", {}, REPORTE_GRUPO_SELECCIONADO);
            global.dispatchSuccessful("global-page-data", {}, REPORTE_PLAZA_SELECCIONADA);
         }

        onSave(props: page.IProps, item: global.EditForm): any {
            let cantidadAsignados: any[] = global.getData(Forms.getValue(REPORTE_DESARROLLOS_ASIGNADOS_ID, config.id), []);

            if (cantidadAsignados.length <= 0 || cantidadAsignados === undefined || cantidadAsignados === null) {
                warning("No Existen Desarrollos Asignados");
                return null;
            }
            let model: any = item
                .addID()
                .addObject("Desarrollos", REPORTE_DESARROLLOS_ASIGNADOS_ID)
                .addVersion()
                .toObject();

            return model;
        };

        onFilter(props: any, filters: any, type?: string): void { };
        onEntitySaved(props: page.IProps): void {
            global.dispatchAsync("global-page-data", "base/scv/Plaza/Get/GetSPVPlazasClasificadores/", REPORTE_PLAZAS_ID);
        };
        onEntityLoaded(props: page.IProps): void { };

        onWillEntityLoad(id: any, props: page.IProps): void {
            global.setCurrentEntity({});
            global.dispatchAsync("global-page-data", "base/scv/Plaza/Get/GetSPVPlazasClasificadores/", REPORTE_PLAZAS_ID);
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

    interface IViewProps extends page.IProps {    };

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
                <Row>
                    <Column size={[12, 12, 5, 5]}>
                        <ViewSPVGrupos />
                    </Column>
                    <Column size={[12, 12, 7, 7]}>
                        <Column size={[12, 12, 12, 12]}>
                            <ViewSPVDesarrollosAsignados />
                        </Column>
                    </Column>
                </Row>
            </page.View>
        }
    });

    interface IEditProps extends page.IProps {  };

    let Edit: any = global.connect(class extends React.Component<IEditProps, {}> {
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
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <PlazasCard idPageBase={PAGE_ID} />
                </Column>
                <Row>
                    <Column size={[12, 12, 5, 5]}>
                        <ViewSPVGrupos />
                    </Column>
                    <Column size={[12, 12, 7, 7]}>
                        <Column size={[12, 12, 12, 12]}>
                            <ViewSPVDesarrollosAsignados />
                        </Column>
                    </Column>
                </Row>
            </page.Edit>
        }
    });

    export interface IPlazasdRF extends page.IProps {
        plazas?: DataElement;
        idPageBase: any;
    };

    export let PlazasCard: any = global.connect(class extends React.Component<IPlazasdRF, IPlazasdRF> {
        constructor(props: IPlazasdRF) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };

        static props: any = (state: any) => ({
            plazas: state.global["catalogo$" + REPORTE_PLAZAS_ID]
        });

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({   });

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
            let idPlaza: number = item && item.ID ? item.ID : null;
            if (idPlaza > 0) {
            } else {
                idPlaza = null
            }
            Global.dispatchSuccessful("global-page-data", [], REPORTE_DESARROLLOS_ASIGNADOS_ID);
            dispatchSuccessful("load::" + REPORTE_PLAZA_SELECCIONADA, item);
            global.dispatchAsync("global-page-data", "base/scv/gruposusuario/Get/GetAll/", REPORTE_GRUPOS_ID);
            global.dispatchAsync("global-page-data", "base/scv/Desarrollos/Get/GetSPVDesarrollosClasificadores/" + global.encodeParameters({ activos: 1, IdPlaza: idPlaza }), REPORTE_DESARROLLOS_ASIGNADOS_ID);
        };

        render(): JSX.Element {
            let $page: any = $ml[''];
            let IndicaActualizando: any = isSuccessful(this.props.plazas) ? '' : <AwesomeSpinner paddingTop={50} size={40} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;
            let itemsModificados: DataElement = this.props.plazas;
            let items: DataElement = itemsModificados;
            let data: any[] = global.getData(items, []);

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

    interface IViewProps extends page.IProps {
        desarrollos?: global.DataElement;
        grupos?: global.DataElement;
        grupoSeleccionado?: global.DataElement;
    };


    let ViewSPVGrupos: any = global.connect(class extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.grupos = state.global["catalogo$" + REPORTE_GRUPOS_ID];
            retValue.grupoSeleccionado = state.global[REPORTE_GRUPO_SELECCIONADO];
            return retValue;
        };

        shouldComponentUpdate(nextProps: IViewProps, {}): boolean {
            return hasChanged(this.props.grupos, nextProps.grupos) ||
                hasChanged(this.props.grupoSeleccionado, nextProps.grupoSeleccionado);
        };

        onClickItem(item: any) {
            let idPlaza: any = getData(EK.Store.getState().global[REPORTE_PLAZA_SELECCIONADA]).ID;
            let idGrupo: any = item.ID;
            if (idGrupo <= 0 || idGrupo === null || idGrupo === undefined) {
                global.dispatchSuccessful("global-page-data", [], REPORTE_DESARROLLOS_ASIGNADOS_ID);
            }
            else {
                dispatchSuccessful("load::" + REPORTE_GRUPO_SELECCIONADO, item);
                let items: any = EK.Store.getState().global["catalogo$" + REPORTE_GRUPOS_ID];
                EK.Global.dispatchSuccessful("global-page-data", items.data, REPORTE_GRUPOS_ID);
            }
        }

        onGetImagenes(itemImagenes: any): any {
            let retValue: any[] = [];
            let arrayElementos: any[] = [];
            let arrayImagenes: any[] = [];
            
            let iniciales: string; 
            if (itemImagenes != null && itemImagenes != undefined) {
                arrayElementos = itemImagenes.split(",");
                if (arrayElementos && arrayElementos.length >= 0) {
                    arrayElementos.forEach((value: any, index: number) => {
                        arrayImagenes = value.split(":::");
                        let nombreLetras: any[] = [];
                        nombreLetras = arrayImagenes[0].trim().split(" ");
                        if (nombreLetras.length > 0) {
                            iniciales = nombreLetras[0].substr(0, 1) + (nombreLetras.length > 1  ?  nombreLetras[1].substr(0, 1) : ''  );
                        }
                        retValue.push(<div key={"ImgItemFotoDet_" + index.toString()}>
                            {arrayImagenes[1] === "" ?
                                <div className="img-circle" style={{ background: "#1e7145", color:"white", width: "30px", height: "30px", float: "left", marginTop: "10px", marginLeft: "10px", position: "relative", zIndex: (300 + index), display: "inline-flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}   >
                                    <p title={arrayImagenes[0].trim()} >{iniciales}</p>
                                </div>
                                :
                                <img alt="" title={arrayImagenes[0].trim()} className="img-circle" src={arrayImagenes[1].trim()} style={{ background: "beige", width: "30px", height: "30px", float: "left", marginTop: "10px", marginLeft: "10px", position: "relative", zIndex: (300 + index),  justifyContent: "center", alignItems: "center", textAlign: "center" }} />
                            }
                        </div>);
                    }) 
                }
            }
            return retValue;
        };

        render(): JSX.Element {
            return <div >
                <page.SectionList
                    id={REPORTE_GRUPOS_ID}
                    parent={config.id}
                    subTitle={(data: any): any => { return <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>; }}
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
                    listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[12, 12, 12, 12]} className="list-default-header">{"Nombre"}</Column>
                        </Row>
                    </div>}
                    formatter={(index: number, item: any) => {
                        let itemSeleccionado: string = this.props.grupoSeleccionado && getData(this.props.grupoSeleccionado).Clave ? getData(this.props.grupoSeleccionado).Clave : "TODOS";
                        let estatusSeleccion: boolean = itemSeleccionado == item.Clave ? true : false;
                        let estatusClass: string = "";

                        if (estatusSeleccion == true) {
                            estatusClass += " selected";
                        }
                        return <div className={estatusClass}>
                            <Row style={{ padding: "0px 10px", overflow: "unset"}}>
                                <Column size={[12, 12, 12, 12]} className="listItem-default-item ">
                                    <span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}
                                    <span className="badge badge-default" style={{ marginRight: 5, float: "right", backgroundColor: "#4cd964" }}>{item.CantidadUsuarios ? item.CantidadUsuarios : 0}</span>
                                    <div style={{ overflow:"unset" }}>
                                        {this.onGetImagenes(item.FotosUsuarios)}
                                    </div>
                                </Column>
                            </Row> </div>;
                    }}>
                </page.SectionList>
            </div>
        };
    });

    

    let ViewSPVDesarrollosAsignados: any = global.connect(class extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.desarrollos = state.global["catalogo$" + REPORTE_DESARROLLOS_ASIGNADOS_ID];
            retValue.data = state.global["catalogo$" + REPORTE_DESARROLLOS_ASIGNADOS_ID];
            return retValue;
        };
        shouldComponentUpdate(nextProps: IViewProps, {}): boolean {
            return hasChanged(this.props.desarrollos, nextProps.desarrollos);
        };

        asignarElemento(posicion: any, item: any, e: any): void {
            let items: any[] = new Array();
            let asignar: any = getData(EK.Store.getState().global[ REPORTE_GRUPO_SELECCIONADO]);

            let idPlaza: any = getData(EK.Store.getState().global[REPORTE_PLAZA_SELECCIONADA]).ID;
            let idGrupo: any = getData(EK.Store.getState().global[REPORTE_GRUPO_SELECCIONADO]).ID;
            let cantidadUsuarios: any = getData(EK.Store.getState().global[REPORTE_GRUPO_SELECCIONADO]).CantidadUsuarios;

            if (idPlaza === null || idPlaza === undefined || idPlaza <= 0) {
                warning("Debe indicar la plaza");
                return null;
            }
            if (idGrupo === null || idGrupo === undefined || idGrupo <= 0) {
                warning("Debe indicar un grupo");
                return null;
            }

            if (cantidadUsuarios === null || cantidadUsuarios === undefined || cantidadUsuarios <= 0) {
                warning("El grupo seleccionado no tiene usuarios asignados");
                return null;
            }

            if (this.props.desarrollos.data.length > 0) {
                items = getData(this.props.desarrollos);
                items[posicion].IdGrupoEntrega = asignar.ID;
                items[posicion].GrupoEntrega.ID = asignar.ID;
                items[posicion].GrupoEntrega.Clave = asignar.Clave;
                items[posicion].GrupoEntrega.Nombre = asignar.Nombre;
                items[posicion]._modificado = true;

                let info: any = this.props.desarrollos;
                let elementos = info;
                elementos.data = items;
                elementos.timestamp = info.timestamp + 1;
                Forms.updateFormElement(config.id, REPORTE_DESARROLLOS_ASIGNADOS_ID, elementos)
            }
        }

        eliminarElemento(posicion: any, item: any, e: any): void {
            let items: any[] = new Array();
            if (this.props.desarrollos.data.length > 0) {
                items = getData(this.props.desarrollos);
                items[posicion].IdGrupoEntrega = null;
                items[posicion].GrupoEntrega.ID = null;
                items[posicion].GrupoEntrega.Clave = null;
                items[posicion].GrupoEntrega.Nombre = null;
                items[posicion]._modificado = true
                let info: any = this.props.desarrollos;
                let elementos = info;
                elementos.data = items;
                elementos.timestamp = info.timestamp + 1;
                Forms.updateFormElement(config.id, REPORTE_DESARROLLOS_ASIGNADOS_ID, elementos)
            }
        }

        render(): JSX.Element {
            let editarElemento: any = getData(this.props.state).viewMode === true ? false : true;
            return <div >
                <page.SectionList
                    id={REPORTE_DESARROLLOS_ASIGNADOS_ID}
                    parent={config.id}
                    icon={"fa fa-cog"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={true}
                    height={"380px"}
                    drawOddLine={true}
                    //selectable={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[12, 12, 1, 1]} className="list-center-header">&nbsp;</Column>
                                <Column size={[12, 12, 7, 7]} className="list-default-header">{"Desarrollo"}</Column>
                                <Column size={[12, 12, 3, 3]} className="list-default-header">{"Grupo"}</Column>
                                <Column size={[12, 12, 1, 1]} className="list-center-header">&nbsp;</Column>
                            </Row>
                        </div>}
                    formatter={(index: number, item: any) => {
                        return <Row>
                                <Column>
                                    <Column size={[12, 12, 1, 1]} className="listItem-default-item listItem-overflow">
                                        {(item.GrupoEntrega.ID === null || item.GrupoEntrega.ID === undefined) && editarElemento === true ?
                                            <i className="fa fa-plus-square" title="Vincular Grupo de Entrega" style={{ color: "blue", cursor: "pointer", fontSize: "15px" }} onClick={(e) => this.asignarElemento(index, item, e)}        ></i>
                                            : null}
                                        {(item.GrupoEntrega.ID != null || item.GrupoEntrega.ID != undefined) && editarElemento === true ?
                                            <i className="fas fa-times" title="Desvincular Grupo de Entrega" style={{ color: "red", cursor: "pointer", fontSize: "15px" }} onClick={(e) => this.eliminarElemento(index, item, e)}        ></i>
                                            : null
                                        }
                                    </Column>
                                    <Column size={[12, 12, 7, 7]} className="listItem-default-item">
                                        <span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}
                                    </Column>

                                    <Column size={[12, 12, 3, 3]} className="listItem-default-item">
                                        <span className="badge badge-success" style={{ marginRight: 5 }}>{item.GrupoEntrega.Clave ? item.GrupoEntrega.Clave : ''}</span>{item.GrupoEntrega.Nombre ? item.GrupoEntrega.Nombre : '' }
                                    </Column>
                                </Column>
                            </Row>;
                    }}>
                </page.SectionList>
            </div>
        };
    });
  
};
