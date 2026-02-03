namespace EK.Modules.SCV.Pages.postventa.Tickets {
    "use strict";

    const PAGE_ID: string = "Tickets";

    const FORMULARIO_FILTRO: string = "FormularioFiltroDashBoardTickets";

    const GRID_TICKETS: string = PAGE_ID + "$gridTickets";
    const USUARIOS_TICKETS: string = PAGE_ID + "$usuariosTickets";
    const TOP_INCIDENCIAS: string = PAGE_ID + "$topIncidencias";
    const TOP_CONTRATISTAS: string = PAGE_ID + "$topContratistas";
    const TOP_PROTOTIPOS: string = PAGE_ID + "$topPrototipos";


    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [GRID_TICKETS, USUARIOS_TICKETS, TOP_INCIDENCIAS, TOP_CONTRATISTAS, TOP_PROTOTIPOS]);


    const w: any = window;
    //export class EstatusTicketsDashBoardInfo {
    //    static iconos: any = {
    //        "SIN": "fas fa-hourglass-half",      //SIN ATENDER
    //        "ACT": "glyphicon glyphicon-play",   //Activo - A Tiempo
    //        "W": "fas fa-exclamation-triangle",  //POR VENCER
    //        "V": "fa fa-times-circle",           //VENCIDO
    //        "REP": "icon-loop",                  //REPROGRAMADO
    //        "ATE": "fa fa-check",                //ATENDIDAS
    //        "SUS": "glyphicon glyphicon-pause",  //CANCELADA - SUSPENDIDAS
    //        "DAB": "fas fa-clipboard-check",     // DICTAMENES ABIERTOS
    //        "SINMARCA": ""                       //SIN MARCA
    //    };

    //    static iconosColor: any = {
    //        "SIN": "#fbf641",                   //SIN ATENDER
    //        "ACT": "#8bc780",                   //Activo - A Tiempo
    //        "W": "#ff8f00",                     //POR VENCER
    //        "V": "#df0707",                     //VENCIDO
    //        "REP": "#9d9b9b",                   //REPROGRAMADO
    //        "ATE": "#9d9b9b",                   //ATENDIDAS
    //        "SUS": "#337ab7",                   //CANCELADA - SUSPENDIDAS
    //        "DAB": "#36c6d3",                   //DICTAMENES ABIERTOS
    //        "SINMARCA": ""                      //SIN MARCA
    //    };
    //};

    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
        if (f && f.IdDesarrollos === undefined) {
            props.config.setState({ clasificadorConfigurado: false, mensajeError: "No existen desarrollos para la Plaza seleccionada" }, config.id + "$filters");
            EK.Global.info("No existen desarrollos para la Plaza seleccionada");
            global.dispatchSuccessful("global-page-data", [], USUARIOS_TICKETS);
            global.dispatchSuccessful("global-page-data", [], GRID_TICKETS);
            global.dispatchSuccessful("global-page-data", [], TOP_INCIDENCIAS);
            global.dispatchSuccessful("global-page-data", [], TOP_CONTRATISTAS);
            global.dispatchSuccessful("global-page-data", [], TOP_PROTOTIPOS);

            Forms.updateFormElement(config.idFilters, "Meses", { ID: (new Date().getMonth() + 1) });

            return;
        }

        if (f && f.IdPrototipos === undefined) {
            props.config.setState({ clasificadorConfigurado: false, mensajeError: "No existen prototipos para el Desarrollo seleccionado" }, config.id + "$filters");
            EK.Global.info("No existen prototipos para el Desarrollo seleccionado");
            global.dispatchSuccessful("global-page-data", [], USUARIOS_TICKETS);
            global.dispatchSuccessful("global-page-data", [], GRID_TICKETS);
            global.dispatchSuccessful("global-page-data", [], TOP_INCIDENCIAS);
            global.dispatchSuccessful("global-page-data", [], TOP_CONTRATISTAS);
            global.dispatchSuccessful("global-page-data", [], TOP_PROTOTIPOS);
            return;
        }

        if ((f && f.IdPlaza && f.IdPlazas === -3) || (f && f.IdDesarrollos && f.IdDesarrollos === -3) || (f && f.IdPrototipos && f.IdPrototipos === -3)) {

            let errorGenerado: any;

            if (f.IdPlazas === -3) {
                errorGenerado = "EL clasificador de Plazas no se encuentra configurado";
            } else if (f.IdDesarrollos === -3) {
                errorGenerado = "EL clasificador de Desarrollos no se encuentra configurado";
            } else if (f.IdPrototipos === -3) {
                errorGenerado = "Desarrollo sin prototipos configurados";
            } else {
                errorGenerado = "Error";
            }
            props.config.setState({ clasificadorConfigurado: false, mensajeError: errorGenerado }, config.id + "$filters");
            EK.Global.info(errorGenerado);
        } else {
            switch (type) {
                case "UsuarioTickets":
                    props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getGridDashBoard", { parametros: f }, GRID_TICKETS);
                    props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopIncidencias", { parametros: f }, TOP_INCIDENCIAS);
                    props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopContratistas", { parametros: f }, TOP_CONTRATISTAS);
                    props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopPrototipos", { parametros: f }, TOP_PROTOTIPOS);
                    break;
                default:
                    if (f === null || f === undefined) {
                        f = {};

                        f["IdPlazas"] = -2;
                        f["IdDesarrollos"] = -2;
                        f["IdPrototipos"] = -2;
                        f["IdFullAnio"] = new Date().getFullYear();
                        f["IdMeses"] = new Date().getMonth() + 1 ;
                        f["IdEstatusTickets"] = -2;
                        f["IdOrigenTickets"] = -2;
                        f["IdUsuarioSeleccionado"] = -2;
                        Forms.updateFormElement(config.idFilters, "Meses", { ID: (f["IdMeses"]) });
                        Forms.updateFormElement(config.idFilters, "UsuarioSeleccionado", { ID: -2 });
                       

                    }
                    f["IdUsuarioSeleccionado"] = -2;
                    Forms.updateFormElement(config.idFilters, "UsuarioSeleccionado", { ID: -2 });

                    props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getUsersDashBoard", { parametros: f }, USUARIOS_TICKETS);
                    props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getGridDashBoard", { parametros: f }, GRID_TICKETS);
                    props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopIncidencias", { parametros: f }, TOP_INCIDENCIAS);
                    props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopContratistas", { parametros: f }, TOP_CONTRATISTAS);
                    props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopPrototipos", { parametros: f }, TOP_PROTOTIPOS);

                    break;
            }
        }

    };


    interface IDashBoardTickets extends page.IProps {
        plazas?: DataElement;
        desarrollos?: DataElement;
        prototipos?: DataElement;
        data?: DataElement;
    };

    interface IDashBoardTicketState {
        clasificadorConfigurado: boolean;
        mensajeError: string;
    };

    export const formatIDPreReporte: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let valorIdReporte: any = row.IdPrereporte && row.IdPrereporte > 0 ? row.IdPrereporte : 0;
        if (valorIdReporte > 0) {
            return w.ReactDOMServer.renderToStaticMarkup(
                <div>
                    <i className="fas fa-mobile-alt" style={{ fontSize: "14px" }}>&nbsp;</i>
                    <span className="badge" style={{ backgroundColor: "#4cd964" }} >{row.IdPrereporte}</span>
                </div>
            );
        } else {
            return null;
        }
    };

    export const Vista: any = global.connect(class extends React.Component<IDashBoardTickets, IDashBoardTicketState>{

        constructor(props: IDashBoardTickets) {
            super(props);
            this.state = { clasificadorConfigurado: true, mensajeError: "" };
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plazas = Forms.getDataValue("Plazas", [config.id + "$filters"].join(""), state);
            retValue.desarrollos = Forms.getDataValue("Desarrollos", [config.id + "$filters"].join(""), state);
            retValue.prototipos = Forms.getDataValue("Prototipos", [config.id + "$filters"].join(""), state);
            retValue.data = state.global.DatosDashBoardTickets;
            return retValue;
        };

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });

        componentDidMount(): void {
            Forms.updateFormElement(config.idFilters, "Meses", { ID: (new Date().getMonth() + 1) });
           // Forms.updateFormElement(config.id + "$filters", "Meses", );
        };



        componentWillReceiveProps(nextProps: IDashBoardTickets, {}): any {    };

        onNew(item: any, props: page.IProps): void {
          
            Forms.updateFormElement(config.idFilters, {});

            //page.applyFilter(global.pageProps(this.state), null, config.idFilters);
           
            global.go("scv/pv/Tickets/id?nuevo");
        };

    
        onClick(btn: any, input: any, props: select.ISelectProps): void {
            let item: any = Forms.getValue("ReporteBuscador", config.id);
            if (item && item.ID > 0) {
                go("scv/pv/Tickets/" + item.ID, false);
                page.applyFilter(this.props, null, config.idFilters);
                //this.props.config.clearCatalogo(null, config.idFilters);
            };
        };

        render(): JSX.Element {
            let messages: JSX.Element[] = [];
            let ml: any = config.getML();

            return <page.Main {...config} pageMode={PageMode.Principal}  onFilter={onPageFilter} onNew={this.onNew.bind(this)}>
                <page.Filters collapsed={true}  >
                    <select.ReportesFallasSPV id="FolioCliente" label="Ticket/Cliente/Ubicación" size={[12, 12, 4, 4]} iconButton="fas fa-arrow-right" buttonClick={this.onClick} />
                    <ddl.FullAniosDDL id="FullAnio" size={[12, 12, 1, 1]} />
                    <ddl.MesesDDL id="Meses" size={[12, 12, 2, 2]} style={{ float: "right" }} required={true} validations={[validations.required()]} />
                    <ddl.EstatusTicketsSPVFilterDDL id={"EstatusTickets"} size={[12, 12, 2, 2]} selectAll={true} validations={[validations.required()]} required={true} />
                    <ddl.SPVMediosComunicacionDDL id={"OrigenTickets"} size={[12, 12, 3, 3]} selectAll={true} validations={[validations.required()]} required={true} />
                    <PlazasClasificadorFilterDDL size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                    <ddl.DesarrollosClasificadorFilterDDL size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                    <ddl.PrototiposClasificadorFilterDDL size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                </page.Filters>

                <Row style={{ marginTop: "8px" }} >
                    <Column size={[12, 12, 9, 9]}  >
                        <UsuariosTickets />
                    </Column>
                    <Column size={[12, 12, 3, 3]} className="ek-sombra" style={{ height: "193px", paddingLeft: "5px", paddingRight: "5px", marginLeft: 0, marginRight: 0, marginBottom: 6,/* border: "solid 1px #90CAF9",*/ backgroundColor: "#FFF", "borderRadius": 4 }}>
                        <div className="tabbable-line">
                            <ul className="nav nav-tabs ">
                                <li className="active">
                                    <a href="#tab_1" data-toggle="tab" aria-expanded="true" style={{ fontSize: "10px" }}>Top Incidencias </a>
                                </li>
                                <li className="">
                                    <a href="#tab_2" data-toggle="tab" aria-expanded="false" style={{ fontSize: "10px" }}>Top Contratista </a>
                                </li>
                                <li className="">
                                    <a href="#tab_3" data-toggle="tab" aria-expanded="false" style={{ fontSize: "10px" }}>Top Prototipo </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="tab_1">
                                    <TopIncidencias />
                                </div>
                                <div className="tab-pane" id="tab_2">
                                    <TopContratistas />
                                </div>
                                <div className="tab-pane" id="tab_3">
                                    <TopPrototipos />
                                </div>
                            </div>
                        </div>
                    </Column>

                </Row>
                <div className="portlet light bordered  ek-sombra" style={{ padding: 0 }}>
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <VistaTickets />
                        </Column>
                    </Row>
                </div>
            </page.Main>
        }
    });

    export let VistaTickets: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
            
        }

        onRowDoubleClick(item: any): any {
            let data: DataElement = config.getCatalogo(GRID_TICKETS);
            if (isSuccessful(data)) {
                go("scv/pv/Tickets/" + item.ID);
                Forms.updateFormElement(config.idFilters, {});
                page.applyFilter(this.props, null, config.idFilters);
                //this.props.config.clearCatalogo(null, config.idFilters);

            };
        };

        //onGetData(data: DataElement): DataElement {
        //    let retValue: DataElement = config.getCatalogo(GRID_TICKETS);
        //    if (global.isSuccessful(data)) {
        //        let allData: any = global.getData(data);

        //        retValue.data = allData.Expedientes;
        //    }
        //    else {
        //        retValue.data = [];
        //    };

        //    return retValue;
        //};

        render(): JSX.Element {
            let ml: any = config.getML();

            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addID({ width: "80px", title: "TICKET", fixed: true })
                .add({ data: "IdExpediente", width: "80px", fixed: true })
                .addNombreCompletoCliente({ width: "300px", fixed: true })
                .add({ data: "Ubicacion.Plaza.Clave", title: "Plazas", width: "150px" })
                .add({ data: "Ubicacion.Desarrollo.Clave", title: "Desarrollo", width: "150px" })
                .add({ data: "Ubicacion.Prototipo.Clave", title: "Prototipo", width: "150px" })
                .add({ data: "Ubicacion.Clave", title: "Ubicación", width: "150px" })
                .add({ data: "ResponsableConstruccion.Nombre", title: "Responsable Const.", width: "150px" })
                .add({ data: "EstatusReporte", title: "Estatus Reporte", width: "150px" });

            return <Row>
                <Column>
                    <dt.DataTableExtended id={GRID_TICKETS} dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} />
                </Column>
            </Row>;
        };
    });

    class TopIncidencias$ extends React.Component<any, any> {
        static props: any = (state: any) => ({
            data: state.global["catalogo$" + TOP_INCIDENCIAS]
        });
        render(): any {
            let IndicaActualizando: any = isSuccessful(this.props.data) ? "" : <AwesomeSpinner paddingTop={20} size={30} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;
            return <div>
                {IndicaActualizando ? IndicaActualizando :
                    <Row style={{ width: "100%", marginLeft: "-5px", marginTop: "-30px" }} >
                        <List
                            items={getData(this.props.data)}
                            readonly={true}
                            addRemoveButton={false}
                            horizontalScrolling={true}
                            height={"150px"}
                            dragAndDrop={false}
                            listHeader={
                                <Column size={[12, 12, 12, 12]}>
                                    <Row style={{ padding: "0px 10px" }}>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ fontSize: "10px" }}>{"Cant."}</Column>
                                        <Column size={[12, 12, 5, 5]} className="list-default-header" style={{ fontSize: "10px" }}>{"Nombre"}</Column>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ fontSize: "10px" }}>{"Total"}</Column>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ fontSize: "10px" }}>{"%"}</Column>
                                    </Row>
                                </Column>}
                            formatter={(index: number, item: any) => {
                                let porcentaje: any = 0; 
                                if (item.Total != 0) {
                                    porcentaje = ((item.Cantidad / item.Total) * 100).toFixed(2);
                                } else {
                                    porcentaje = 0; 
                                }


                                return <Row style={{ padding: "0px 10px", marginTop: "-10px" }}>
                                    <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}><span className="badge badge-success" style={{ margin: "0px 10px" }}>{item.Cantidad}</span></Column>
                                    <Column size={[12, 12, 5, 5]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}>{item.Nombre}</Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}>{item.Total}</Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}>{porcentaje}</Column>
                                </Row>;
                            }} />
                    </Row>
                }
            </div>
        };
    };
    const TopIncidencias: any = ReactRedux.connect(TopIncidencias$.props, null)(TopIncidencias$);

    class TopPrototipos$ extends React.Component<any, any> {
        static props: any = (state: any) => ({
            data: state.global["catalogo$" + TOP_PROTOTIPOS]
        });
        render(): any {
            let IndicaActualizando: any = isSuccessful(this.props.data) ? "" : <AwesomeSpinner paddingTop={20} size={30} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;
            return <div>
                {IndicaActualizando ? IndicaActualizando :
                    <Row style={{ width: "100%", marginLeft: "-5px", marginTop: "-30px" }} >
                        <List
                            items={getData(this.props.data)}
                            readonly={true}
                            addRemoveButton={false}
                            horizontalScrolling={true}
                            height={"150px"}
                            dragAndDrop={false}
                            listHeader={
                                <Column size={[12, 12, 12, 12]}>
                                    <Row style={{ padding: "0px 10px" }}>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ fontSize: "10px" }}>{"Cant."}</Column>
                                        <Column size={[12, 12, 5, 5]} className="list-default-header" style={{ fontSize: "10px" }}>{"Nombre"}</Column>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ fontSize: "10px" }}>{"Total"}</Column>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ fontSize: "10px" }}>{"%"}</Column>
                                    </Row>
                                </Column>}
                            formatter={(index: number, item: any) => {
                                let porcentaje: any = 0;
                                if (item.Total != 0) {
                                    porcentaje = ((item.Cantidad / item.Total) * 100).toFixed(2);
                                } else {
                                    porcentaje = 0;
                                }


                                return <Row style={{ padding: "0px 10px", marginTop: "-10px" }}>
                                    <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}><span className="badge badge-success" style={{ margin: "0px 10px" }}>{item.Cantidad}</span></Column>
                                    <Column size={[12, 12, 5, 5]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}>{item.Nombre}</Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}>{item.Total}</Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}>{porcentaje}</Column>
                                </Row>;

                            }} />
                    </Row>
                }
            </div>
        };
    };
    const TopPrototipos: any = ReactRedux.connect(TopPrototipos$.props, null)(TopPrototipos$);

    class TopContratistas$ extends React.Component<any, any> {
        static props: any = (state: any) => ({
            data: state.global["catalogo$" + TOP_CONTRATISTAS]
        });
       
        render(): any {
            let IndicaActualizando: any = isSuccessful(this.props.data) ? "" : <AwesomeSpinner paddingTop={20} size={30} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;
            return <div>
                {IndicaActualizando ? IndicaActualizando :
                    <Row style={{ width: "100%", marginLeft: "-5px", marginTop: "-30px" }} >
                        <List
                            items={getData(this.props.data)}
                            readonly={true}
                            addRemoveButton={false}
                            horizontalScrolling={true}
                            height={"150px"}
                            dragAndDrop={false}
                            listHeader={
                                <Column size={[12, 12, 12, 12]}>
                                    <Row style={{ padding: "0px 10px" }}>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ fontSize: "10px" }}>{"Cant."}</Column>
                                        <Column size={[12, 12, 5, 5]} className="list-default-header" style={{ fontSize: "10px" }}>{"Nombre"}</Column>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ fontSize: "10px" }}>{"Total"}</Column>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ fontSize: "10px" }}>{"%"}</Column>
                                    </Row>
                                </Column>}
                            formatter={(index: number, item: any) => {
                                let porcentaje: any = 0;
                                if (item.Total != 0) {
                                    porcentaje = ((item.Cantidad / item.Total) * 100).toFixed(2);
                                } else {
                                    porcentaje = 0;
                                }


                                return <Row style={{ padding: "0px 10px", marginTop: "-10px" }}>
                                    <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}><span className="badge badge-success" style={{ margin: "0px 10px" }}>{item.Cantidad}</span></Column>
                                    <Column size={[12, 12, 5, 5]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}>{item.Nombre}</Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}>{item.Total}</Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ whiteSpace: "normal", fontSize: "10px" }}>{porcentaje}</Column>
                                </Row>;

                            }} />
                    </Row>
                }
            </div>
        };
    };
    const TopContratistas: any = ReactRedux.connect(TopContratistas$.props, null)(TopContratistas$);

    let UsuariosTickets: any = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.data = state.global["catalogo$" + USUARIOS_TICKETS];
            //
            return retValue;
        };

        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        onClickElementHorizontal(item: any): void {
            let etapa: number = null;
            let action: number = item._action;

            if (action === undefined) {
                Forms.updateFormElement(config.idFilters, "EstatusTickets", { ID: -2 });
            } else {
                if (action > 0) {
                    Forms.updateFormElement(config.idFilters, "EstatusTickets", { ID: action });
                };
            }
            Forms.updateFormElement(config.idFilters, "UsuarioSeleccionado", item);
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(props, null, "UsuarioTickets");
        };


        render(): JSX.Element {
            let $page: any = $ml[""];
            let IndicaActualizando: any = isSuccessful(this.props.data) ? "" : <AwesomeSpinner paddingTop={50} size={40} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;
            let itemsModificados: DataElement = this.props.data;
            if (isSuccessful(this.props.data)) {
                let nuevoItem: any = {};
                let nuevoItemFase: any = {};
                let nuevoElemento: any = "SI";
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].Clave === "TODOS") {
                        nuevoElemento = "NO"
                    }
                }
                if (nuevoElemento === "SI") {
                    nuevoItemFase["ID"] = null;
                    nuevoItemFase["Clave"] = " ";
                    nuevoItemFase["Nombre"] = " ";
                    let totalFases: number = 0;
                    let totalCantidadActivas: number = 0;
                    let totalCantidadCanceladas: number = 0;
                    let totalCantidadPorVencer: number = 0;
                    let totalCantidadVencidas: number = 0;
                    let totalCantidadFinalizadas: number = 0;

                    getData(this.props.data).forEach((value: any, index: number): any => {
                        totalCantidadActivas += value.CantidadActivas;
                        totalCantidadCanceladas += value.CantidadCanceladas;
                        totalCantidadPorVencer += value.CantidadPorVencer;
                        totalCantidadVencidas += value.CantidadVencidas;
                        totalCantidadFinalizadas += value.CantidadFinalizadas;
                    });
                    nuevoItem["ID"] = -2;
                    nuevoItem["Clave"] = "TODOS";
                    nuevoItem["Nombre"] = "TODOS";
                   // nuevoItem["Fase"] = nuevoItemFase;
                    nuevoItem["CantidadActivas"] = totalCantidadActivas;
                    nuevoItem["CantidadCanceladas"] = totalCantidadCanceladas;
                    nuevoItem["CantidadPorVencer"] = totalCantidadPorVencer;
                    nuevoItem["CantidadVencidas"] = totalCantidadVencidas;
                    nuevoItem["CantidadFinalizadas"] = totalCantidadFinalizadas;

                    itemsModificados.data.unshift(nuevoItem);
                }
                IndicaActualizando = "";
            }
            let items: DataElement = itemsModificados;
            let data: any[] = global.getData(items, []);
            let estiloPersonalizado: React.CSSProperties = {};
            return <Row>
                <Column size={[12, 12, 12, 12]} style={{ estiloPersonalizado }} >
                    <div className="portlet light   portlet-fit  bordered  ek-sombra " >
                        <div className="portlet-body">
                            <Row className="timeline-expediente">
                                <Column size={[12, 12, 12, 12]} className="events-container">
                                    {IndicaActualizando ? IndicaActualizando :
                                        <EKHorizontalTimeLine
                                            items={items}
                                            customScroll={true}
                                            onClickElementHorizontal={this.onClickElementHorizontal}
                                            desactivarFondo={true}
                                            page={$page}
                                            tipoPresentacion={8} />
                                    }
                                </Column>
                            </Row>
                        </div>
                    </div>
                </Column>
            </Row>;
        }
    });

    export let TagsTickets = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.TagsExpedientes
        });
        static defaultProps: IDropDrownListProps = {
            id: "Tags",
            itemKey: "ID",
            itemValue: "Nombre",
            mode: SelectModeEnum.Multiple,
            matchers: ["Clave"],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='badge badge-success bold'>",
                            item.obj.Clave,
                            "</span>",
                            "<span class='bold' style='font-size: 90%'>",
                            item.obj.Nombre,
                            "</span> "
                        ].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return item.Clave;
                };
            },
            selectionFormatter: (item): any => {
                let id: number = parseInt(item.id);
                if (isNaN(id)) {
                    return item.text;
                };
                if (id < 1) {
                    return item.Clave;
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.Clave,
                        "</span>"].join(""));
                }
            },
            processData: (data): any => {
                let items: any[] = data;
                let options: any = {};
                let tp: any = 0;
                for (var i = 0; i < items.length; i++) {
                    tp = items[i].TipoClasificador;
                    if (!tp) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (!options[tp.ID]) {
                            options[tp.ID] = { "obj": tp, "children": [] };
                        };
                        items[i].id = items[i].ID;
                        options[tp.ID].children.push(items[i]);
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };

                return retValue;
            },
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TagsExpedientes", "base/kontrol/clasificadores/Get/GetAll/" + global.encodeObject({ activos: 1, claveTipo: "TAG" }));
               
            };
            //this.props.config.clearCatalogo(null, config.idFilters);
            page.applyFilter(this.props, null, config.idFilters);
            Forms.updateFormElement(config.idFilters, {});
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

};