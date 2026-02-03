//namespace EK.Modules.SCV.Pages.postventa.RUBA.DashBoardFallas {
//    "use strict";
//    const AGENTES_ID: string = "agentes";
//    let IdCliente = -1;
//    const clientes_ID: string = "clientes";
  
//    let PAGE_ID = "DashBoardFallas";
//    //const TELEFONOS_ID: string = "Telefonos";
//    //const CORREOS_ID: string = "Correos";
//    //const CLIENTE_DESAROLLO: string = "ClienteDesarrollo";
//   // const scv_Desarrollos_Prototipos: string = "Prototipos";
//   // const scv_Desarrollos_Esquemas: string = "Esquemas";
//  //  const vistasMapa: string = "VistasMapa";

//    let Iconos: any = {};
//   // Iconos[CORREOS_ID] = "fa fa-at";
//    //Iconos[TELEFONOS_ID] = "fa fa-tablet";
//    //Iconos[CLIENTE_DESAROLLO] = "fa fa-institution";
//    //Iconos[scv_Desarrollos_Prototipos] = "fa fa-object-group";
//    //Iconos[scv_Desarrollos_Esquemas] = "fa fa-cc-diners-club";
//    const w: any = window;

//    //const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [AGENTES_ID, CLIENTE_DESAROLLO, TELEFONOS_ID, CORREOS_ID, scv_Desarrollos_Prototipos, scv_Desarrollos_Esquemas, vistasMapa]);
//    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [AGENTES_ID]);

//    export class EstatusDashBoardFallasInfo {
//        static iconos: any = {
//            'A': "glyphicon glyphicon-play",   //ACTIVO
//            'W': "fas fa-exclamation-triangle",              //POR VENCER
//            'V': "fa fa-times-circle",         //VENCIDO
//            'S': "glyphicon glyphicon-pause",  //SUSPENDIDO
//            'SINMARCA': ""                     //SIN MARCA
//        };

//        static iconosColor: any = {
//            'A': "#8bc780",                   //ACTIVO
//            'W': "#ff8f00",                   //POR VENCER
//            'V': "#df0707",                   //VENCIDO
//            'S': "",                          //SUSPENDIDO
//            'SINMARCA': ""                    //REQUISITO VENCIDO
//        };

//    }
//    export class Vista extends page.Base {
//        onFilter(props: page.IProps, filters: any): any {
//            var IdCliente = getData(EK.Store.getState().global.Cliente_Expediente_Seleccionado).ID;
//            let f: any;
//            if (IdCliente != undefined) {
//                f = global.assign({ idCliente: IdCliente, OperacionEspecificaSP  : "DashBoard"});
//            } else {
//                f = global.assign({ filters, OperacionEspecificaSP  : "DashBoard"});
//            }
//        };

//        onView(item: any, props: page.IProps): any {
//            let retValue: any;
//            retValue = getData(item) ? getData(item).ID : 0;
//            if (retValue > 0) {
//                go("scv/expedientes/" + retValue, false)
//            }
//        };
    
//        render(): JSX.Element {
//            let ml: any = config.getML();
//            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} onView={this.onView} >
//                <Row>
//                    <ExpedientesDashBoard />
//                </Row>
//            </page.Main>;
//        };
//    };

//    interface IExpedientesDashBoard extends page.IProps {
//        indicadoresFases?: DataElement;
//        indicadoresEstados?: DataElement;
//        indicadoresEtapas?: DataElement;
//        TopGraficaEtapas?: DataElement;
//        TopGraficaDesarrollos?: DataElement;

//        EstadoSeleccionado?: any;
//        EtapaSeleccionada?: any;
//        FaseSeleccionada?: any;
//        DesarrolloSeleccionado?: any;
//        ClienteSeleccionado?: DataElement;
//        ClienteSeleccionadoSinExpediente?: DataElement;
//        getIndicadores?: (idCliente: number, Estado: string) => void;
//        onclick?: () => void;
//    }

//    let ExpedientesDashBoard: any = global.connect(class extends React.Component<IExpedientesDashBoard, {}>{
//        constructor(props: IExpedientesDashBoard) {
//            super(props);
//            this.onClick = this.onClick.bind(this);
//            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
//        }

//        static props: any = (state: any): any => ({
//            indicadoresEtapas: state.global.dashBoardIndicadoresEtapas,
//            EstadoSeleccionado: state.global.EstatusSelected,
//            FaseSeleccionada: state.global.FaseSelected,
//            TopGraficaEtapas: state.global.catalogo$dashBoardTopGraficaEtapas,
//            TopGraficaDesarrollos: state.global.catalogo$dashBoardTopGraficaDesarrollos,
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

//        });

//        onClick(): void {

//        }

//        onClickElementHorizontal(item: any): void {
//            let prevID: number = item && item.ID ? item.ID : null;
//            if (prevID > 0) {
//            } else {
//                prevID = null
//            }
//            dispatchSuccessful("load::EtapaSelected", { ID: prevID })
//        }

//        componentDidMount(): void {
//            dispatchSuccessful("load::EstatusSelected", { Clave: "TODOS", Nombre: 'TODOS LOS ESTADOS' });
//            dispatchSuccessful("load::FaseSelected", { Clave: "TODOS", Nombre: 'TODAS LAS FASES' });
//            dispatchSuccessful("load::EtapaSelected", { ID: null, Clave: "TODOS", Nombre: 'TODAS LAS ETAPAS' });
//        }

//        shouldComponentUpdate(nextProps: IExpedientesDashBoard, nextState: IExpedientesDashBoard): boolean {
//            return hasChanged(this.props.indicadoresEtapas, nextProps.indicadoresEtapas) ||
//                hasChanged(this.props.EstadoSeleccionado, nextProps.EstadoSeleccionado) ||
//                hasChanged(this.props.FaseSeleccionada, nextProps.FaseSeleccionada) ||
//                hasChanged(this.props.TopGraficaEtapas, nextProps.TopGraficaEtapas) ||
//                hasChanged(this.props.TopGraficaDesarrollos, nextProps.TopGraficaDesarrollos);
//        };

//        componentWillUpdate(nextProps: IExpedientesDashBoard, {}): void {
//            if ((nextProps.EstadoSeleccionado !== this.props.EstadoSeleccionado) || (nextProps.FaseSeleccionada !== this.props.FaseSeleccionada)) {
//                var idCliente = getData(EK.Store.getState().global.Cliente_Expediente_Seleccionado).ID;
//                let EstadoSeleccionado: any = nextProps.EstadoSeleccionado && getData(nextProps.EstadoSeleccionado).Clave != 'TODOS' ? getData(nextProps.EstadoSeleccionado).Clave : null;
//                let FaseSeleccionada: any = nextProps.FaseSeleccionada && getData(nextProps.FaseSeleccionada).Clave != 'TODOS' ? getData(nextProps.FaseSeleccionada).Clave : null;

//                let encodedParams: string = global.encodeParameters({ IdCliente: idCliente, ClaveEstado: EstadoSeleccionado, Fase: FaseSeleccionada });
//                let encodedURL: any = "SCV/Expedientes/DashBoard/Etapas/" + encodedParams;
//                dispatchAsync("load::dashBoardIndicadoresEtapas", encodedURL);
//            }
//        };



//        prepareDataChartsEtapas(data: any): any {
//            if (!data) {
//                return [];
//            };

//            let colorGrafica: any = {
//                0: "#FF0F00",
//                1: "#FF6600",
//                2: "#FF9E01",
//                3: "#FCD202",
//                4: "#F8FF01",
//                5: "#B0DE09",
//                6: "#04D215",
//                7: "#0D8ECF",
//                8: "#0D52D1",
//                9: "#2A0CD0"
//            };

//            let retValue: any[] = [];
//            let datos: any;
//            for (var i = 0; i < data.length; i++) {
//                retValue.push({
//                    "categoryField": data[i].Etapa.Clave,
//                    "valueField": data[i].ConteoExpediente,
//                    "Nombre": data[i].Etapa.Nombre,
//                    "NombreToolTips": data[i].Fase.Nombre,
//                    "color": colorGrafica[i] 
//                });
//            }
//            return retValue;
//        }
//        prepareDataChartsDesarrollos(data: any): any {
//            if (!data) {
//                return [];
//            };

//            let colorGrafica: any = {
//                0: "#FF0F00",
//                1: "#FF6600",
//                2: "#FF9E01",
//                3: "#FCD202",
//                4: "#F8FF01",
//                5: "#B0DE09",
//                6: "#04D215",
//                7: "#0D8ECF",
//                8: "#0D52D1",
//                9: "#2A0CD0"
//            };

//            let retValue: any[] = [];
//            let datos: any;
//            for (var i = 0; i < data.length; i++) {
//                retValue.push({
//                    "categoryField": data[i].Desarrollo.Clave,
//                    "valueField": data[i].ConteoExpediente,
//                    "Nombre": data[i].Desarrollo.Nombre,
//                    "NombreToolTips": data[i].Desarrollo.Clave,
//                    "color": colorGrafica[i]
//                });
//            }
//            return retValue;
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let EstadoSeleccionado: any = '';
//            let muestraEstado: boolean = this.props.EstadoSeleccionado && getData(this.props.EstadoSeleccionado).Clave != null ? true : false;

//            if (muestraEstado) {
//                EstadoSeleccionado = getData(this.props.EstadoSeleccionado).Clave;
//            }

//            let estiloPersonalizado: React.CSSProperties = {
//                opacity: EstadoSeleccionado === 'ProspectosSinExpedientes' ? 0 : 1.0,
//                pointerEvents: EstadoSeleccionado === 'ProspectosSinExpedientes' ? "none" : "auto",
//                paddingRight: "5px",
//                paddingLeft: "5px"
//            };
//            let IndicaActualizando: any = isSuccessful(this.props.indicadoresEtapas) ? '' : <AwesomeSpinner paddingTop={50} size={40} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;

//            let itemsModificados: DataElement = this.props.indicadoresEtapas;
//            if (isSuccessful(this.props.indicadoresEtapas)) {
//                let nuevoItem: any = {};
//                let nuevoItemFase: any = {};
//                let nuevoElemento: any = 'SI';
//                if (itemsModificados.data.length > 0) {
//                    if (itemsModificados.data[0].Clave === 'TODAS') {
//                        nuevoElemento = 'NO'
//                    }
//                }
//                if (nuevoElemento === 'SI') {
//                    nuevoItemFase['ID'] = null;
//                    nuevoItemFase['Clave'] = 'Las Etapas';
//                    nuevoItemFase['Nombre'] = 'Las Etapas';

//                    let totalFases: number = 0;
//                    let totalCantidadActivos: number = 0;
//                    let totalCantidadSuspendidos: number = 0;
//                    let totalCantidadPorVencer: number = 0;
//                    let totalCantidadVencidos: number = 0;

//                    getData(this.props.indicadoresEtapas).forEach((value: any, index: number): any => {
//                        totalCantidadActivos += value.CantidadActivos;
//                        totalCantidadSuspendidos += value.CantidadSuspendidos;
//                        totalCantidadPorVencer += value.CantidadPorVencer;
//                        totalCantidadVencidos += value.CantidadVencidos;
//                    });

//                    nuevoItem['ID'] = null;
//                    nuevoItem['Clave'] = 'TODAS';
//                    nuevoItem['Nombre'] = 'TODAS';
//                    nuevoItem['Fase'] = nuevoItemFase;
//                    nuevoItem['CantidadActivos'] = totalCantidadActivos;
//                    nuevoItem['CantidadSuspendidos'] = totalCantidadSuspendidos;
//                    nuevoItem['CantidadPorVencer'] = totalCantidadPorVencer;
//                    nuevoItem['CantidadVencidos'] = totalCantidadVencidos;

//                    itemsModificados.data.unshift(nuevoItem);
//                }
//                IndicaActualizando = '';
//            }

//            let items: DataElement = itemsModificados;

//            return <div >
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <Column size={[12, 12, 2, 2]} style={{ paddingRight: "5px", paddingLeft: "5px" }}>
//                            <div className="portlet light  portlet-fit  bordered  ek-sombra " >
//                                <div className="portlet-body" >
//                                    <ExpedientesDashBoardEstados />
//                                </div>
//                            </div>
//                        </Column>
//                    {EstadoSeleccionado != 'ProspectosSinExpedientes' ?
//                            <Column size={[12, 12, 7, 7]} style={{ estiloPersonalizado }} >
//                                <div className="portlet light   portlet-fit  bordered  ek-sombra " >
//                                    <div className="portlet-body">
//                                        <Row >
//                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 ">
//                                                <div>
//                                                    <ExpedientesDashBoardFases />
//                                                </div>
//                                            </Column>
//                                            <Column size={[12, 12, 12, 12]} >
//                                                <Row style={{ marginBottom: "67px" }}>
//                                                <div>
//                                                    <div> {IndicaActualizando}
//                                                        {this.props.indicadoresEtapas ?
//                                                            <EKHorizontalTimeLine
//                                                                items={items}
//                                                                onClickElementHorizontal={this.onClickElementHorizontal}
//                                                                page={$page}
//                                                                tipoPresentacion={3} />
//                                                            : null}
//                                                    </div>
//                                                </div>
//                                                </Row>
//                                            </Column>
//                                        </Row>
//                                    </div>
//                                </div>
//                            </Column>
//                            : <Column size={[12, 12, 10, 10]}    >
//                                <page.OptionSection
//                                    icon="fa fa-users"
//                                    level={1}
//                                    subTitle="Clientes sin Expedientes"
//                                   collapsed={false}>
//                                      <VistaClientesSinExpedientes />
//                                 </page.OptionSection>
//                            </Column>}
//                    {EstadoSeleccionado != 'ProspectosSinExpedientes' ?
//                        <Column size={[12, 12, 3, 3]} style={{ paddingRight: "5px", paddingLeft: "5px" }}>
//                            <div className="portlet light bordered  ek-sombra" style={{ paddingRight: "5px", paddingLeft: "5px", paddingBottom: "5px" }}>
//                                <div className="portlet-title  tabbable-line" style={{ border: "0px", borderBottom: "1px solid #eef1f5" }}>
//                                        <div className="caption">
//                                            <i className="fa fa-line-chart"></i>
//                                            <span className="caption-subject bold  uppercase" style={{ color: "#9ea4aa" }}> TOP 10 </span>
//                                    </div>
//                                    <div className="actions">
//                                        <a title="" className="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title=""> </a>
//                                    </div>
//                                    <ul className="nav nav-tabs">
//                                        <li className="active">
//                                            <a className="active" aria-expanded="true" href="#tab_1_1" data-toggle="tab"> Etapas </a>
//                                        </li>
//                                        <li>
//                                            <a aria-expanded="false" href="#tab_1_2" data-toggle="tab"> Desarrollos </a>
//                                        </li>
//                                    </ul>
//                                </div>
//                                <div className="portlet-body">
//                                    <div className="tab-content">
//                                        <div className="tab-pane active" id="tab_1_1">
//                                            < EKGraficas2 id={"grafica1"} dataProvider={this.prepareDataChartsEtapas(getData(this.props.TopGraficaEtapas))} tipoGrafica={"serial"} />
//                                        </div>
//                                        <div className="tab-pane" id="tab_1_2">
//                                            < EKGraficas2 id={"grafica2"} dataProvider={this.prepareDataChartsDesarrollos(getData(this.props.TopGraficaDesarrollos))} tipoGrafica={"pie"} />
//                                        </div>
//                                    </div>
//                                </div>
//                            </div>
//                        </Column>
//                        : null}
//                    {EstadoSeleccionado === 'ProspectosSinExpedientes' ?
//                            <Column size={[12, 12, 12,12]} style={{ paddingRight: "5px", paddingLeft: "5px" }}>
//                            <div className="portlet light bordered  ek-sombra" style={{ paddingRight: "5px", paddingLeft: "5px", paddingBottom: "5px" }}>
//                                <div className="portlet-title  tabbable-line" style={{ border: "0px", borderBottom: "1px solid #eef1f5" }}>
//                                        <div className="caption">
//                                            <span className="caption-subject bold  uppercase" style={{ color: "#9ea4aa" }}> <i className="fa fa-desktop"></i>  Escritorio </span>
//                                    </div>
//                                    <div className="actions">
//                                        <a title="" className="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title=""> </a>
//                                    </div>
//                                    <ul className="nav nav-tabs">
//                                        <li className="active">
//                                                <a className="active" aria-expanded="true" href="#tab_2_1" data-toggle="tab"><span className="icon-target" aria-hidden="true"></span> Información de Interes </a>
//                                        </li>
//                                        <li>
//                                                <a aria-expanded="false" href="#tab_2_2" data-toggle="tab"><span className="icon-tag" aria-hidden="true"></span> Contacto </a>
//                                        </li>
//                                    </ul>
//                                </div>
//                                <div className="portlet-body">
//                                    <div className="tab-content">
//                                        <div className="tab-pane active" id="tab_2_1">
//                                            <div className="portlet-body"  >
//                                                <Row>
//                                                    <Column>
//                                                            <Column size={[12, 12, 5,5]} style={{ padding: "0" }}>
//                                                                { /*  < VistaDesarrolloInteres /> */} 
//                                                            </Column>
//                                                            <Column size={[12, 12, 7,7]} style={{ padding: "0" }}>
//                                                                { /*< VistaPrototiposEsquemasDesarrollo /> */} 
//                                                            </Column>
     
//                                                    </Column>
//                                                </Row>
//                                            </div>
//                                        </div>
//                                        <div className="tab-pane" id="tab_2_2">
//                                            <div className="portlet-body"  >
//                                                <Row>
//                                                    <Column size={[12, 12, 12, 12]} style={{ padding: "15px" }}>
//                                                            { /*< VistaInformacionContacto /> */} 
//                                                    </Column>
//                                                </Row>
//                                            </div>
//                                        </div>
//                                    </div>
//                                </div>
//                            </div>
//                            </Column>
//                        : null}
//                    {EstadoSeleccionado != 'ProspectosSinExpedientes' ?
//                        <Row>
//                            <Column size={[12, 12, 12, 12]}    >
//                                    <VistaExpedientes />
//                            </Column>
//                            <Column size={[12, 12, 12, 12]}    >
//                                    <Agentes />
//                            </Column>
//                        </Row>
//                        : null}
//                </Column>
//                    </Row>
//            </div>
//        }
//    });

//    export let VistaExpedientes: any = global.connect(class extends React.Component<IExpedientesDashBoard, {}> {
//        constructor(props: IExpedientesDashBoard) {
//            super(props);
//            this.inicializaClickMensaje = this.inicializaClickMensaje.bind(this);
//            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
//        }

//        static props: any = (state: any): any => ({
//            data: state.global.currentCatalogo,
//            EstadoSeleccionado: state.global.EstatusSelected,
//            FaseSeleccionada: state.global.FaseSelected,
//            EtapaSeleccionada: state.global.EtapaSelected,
//            indicadoresFases: state.global.catalogo$dashBoardIndicadoresFases,

//        });

//        componentWillUpdate(nextProps: IExpedientesDashBoard, {}): void {
//            if ((nextProps.EstadoSeleccionado !== this.props.EstadoSeleccionado) || (nextProps.FaseSeleccionada !== this.props.FaseSeleccionada) || (nextProps.EtapaSeleccionada !== this.props.EtapaSeleccionada)) {
//                dispatchExpediente(nextProps, this.props);

//                if ((nextProps.EstadoSeleccionado !== this.props.EstadoSeleccionado) || (nextProps.FaseSeleccionada !== this.props.FaseSeleccionada)) {
//                    var idCliente = getData(EK.Store.getState().global.Cliente_Expediente_Seleccionado).ID;
//                    var EstadoSeleccionado = nextProps.EstadoSeleccionado && getData(nextProps.EstadoSeleccionado).Clave && getData(nextProps.EstadoSeleccionado).Clave != 'TODOS' ? getData(nextProps.EstadoSeleccionado).Clave : null;
//                    var FaseSeleccionada = nextProps.FaseSeleccionada && getData(nextProps.FaseSeleccionada).Clave && getData(nextProps.FaseSeleccionada).Clave != 'TODOS' ? getData(nextProps.FaseSeleccionada).Clave : null;
//                    var EtapaSeleccionada = nextProps.EtapaSeleccionada && getData(nextProps.EtapaSeleccionada).ID && getData(nextProps.EtapaSeleccionada).ID > 0 ? getData(nextProps.EtapaSeleccionada).ID : null;

//                    let encodedParams: string = global.encodeParameters({ IdCliente: idCliente, ClaveEstado: EstadoSeleccionado, Fase: FaseSeleccionada });

//                    let encodedURL: any = "SCV/Expedientes/DashBoard/TopGraficaEtapas/" + encodedParams;
//                    dispatchAsync("global-page-data", encodedURL, "dashBoardTopGraficaEtapas");

//                    let encodedURL2: any = "SCV/Expedientes/DashBoard/TopGraficaDesarrollos/" + encodedParams;
//                    dispatchAsync("global-page-data", encodedURL2, "dashBoardTopGraficaDesarrollos");
//                }
//            }
//        };

  

//        inicializaClickMensaje() {
//            $(".boton").click(function () {
//                var dataId = $(this).attr("data-id");
//                let link: any;
//                link = '/scv/expedientes/' + dataId       //location.href 
//                let notificacion: any = ({
//                    Nombre: '',
//                    Descripcion: '',
//                    Link: link
//                });
//                dispatchSuccessful("notificaciones-setSelected", notificacion);
//                go("/kontrol/notificaciones/id?nuevo");
//            });
//        }


//        onRowDoubleClick(item : any): any {
//             if (isSuccessful(this.props.data)) {
//                go("scv/expedientes/" +item.ID);
//            };
//        };
//        componentWillReceiveProps(nextProps: IExpedientesDashBoard, nextState: IExpedientesDashBoard) {
//            this.inicializaClickMensaje();
//        };
//        render(): JSX.Element {
//            let ml: any = config.getML();

//            let formatClaveDashBoard: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
//                let estatus_etapa: any = row.EstatusEtapa && row.EstatusEtapa.Clave === 'D' ? ' <span class="badge badge-success pull-right ek-sombra" style="    font-size: 8px!important;">' + row.EstatusEtapa.Nombre : '';
//                return '<div><i class="' + EstatusDashBoardFallasInfo.iconos[row.ClaveDashBoard] + '" style="color :' + EstatusDashBoardFallasInfo.iconosColor[row.ClaveDashBoard] + '" ></i> ' + data + estatus_etapa + '</span></div>';
//            };

//            let formatProgressBar: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
//                return w.ReactDOMServer.renderToStaticMarkup(<div style={{ width: "100%", fontSize: "11px", lineHeight: "1.42857", textAlign: "center" }}>
//                    <div style={{ float: "left", width: "100%", texAlign: "center", border: "0px solid #e7ecf1", borderRight: "none", height: "15px" }}>
//                        <i  ></i><span style={{ display: "inline-block", fontSize: "8px" }}> {EK.UX.Labels.formatDecimal(row.PorcentajeAvance)} %</span>
//                        <div className="progress" style={{ marginBottom: "0px", height: "4px", marginRight: "-1px" }}>
//                            <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: row.PorcentajeAvance + "%", fontSize: "8px", TextAlign: "right", background: EstatusDashBoardFallasInfo.iconosColor[row.ClaveDashBoard] }} ></div>
//                        </div>
//                    </div>
//                </div>);
//            };

//            let formatConfigMensaje: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
//                let onClicks: () => any = (): any => {
//                    let url: any; 
//                        url = '#/kontrol/notificaciones/id?nuevo'; 
//                    return url;
//                };
//                return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>
//                    <div className="btn default btn-circle btn-xs" title="Mensajes">
//                        <a style={{ color: "gray" }}  data-id={data}   className='boton' ><i className='icon-envelope'></i></a>
//                    </div>
//                </div>);
//            };

//            let formatConfigTarea: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
//                return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>
//                    <div className="btn default btn-circle btn-xs" title="Agenda">
//                        <a style={{ color: "gray" }} className={'ActividadesExpediente'} href='#/kontrol/tareas/id?nuevo' target="_blank" ><i className='fa fa-calendar-o'></i></a>
//                    </div>
//                </div>);
//            };

//            let formatConfigCita: (data: any, type: any, row: any ) => string = (data: any, type: any, row: any) => {

//                let informacion: any = global.encodeObject({ IdClienteREF: row.Cliente.ID, IdExpedienteREF: data  });
//                let enlace: any = "#/kontrol/citas/id?nuevo&" + informacion; 
//                return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>
//                    <div className="btn default btn-circle btn-xs" title="Citas">
//                        <a style={{ color: "gray" }} className={'CitasExpedientes'} href={enlace} target="_blank" ><i className='fa fa-calendar'></i></a>
//                    </div>
//                </div>);
//            };

//            let formatNombre: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
//                if (row.Cliente.TipoPersona.Clave === "F") {
//                    return row.Cliente.Nombre + " " + row.Cliente.ApellidoPaterno + " " + row.Cliente.ApellidoMaterno;
//                }
//                else {
//                    return data;
//                };
//            };
//            let columns: dt.IDTColumn[] = dt.createColumns(ml)
//                .addID({ width: 15, title: "Expediente" })
//                .add({ data: "Cliente.Nombre", title: "Nombre", width: 35, render: formatNombre })
//                .add({ data: "Cliente.Celular", title: "Teléfono", width: 10 })
//                .add({ data: "Cliente.Email", title: "Email", width: 20 })
//                .add({ data: "Etapa.Nombre", title: "Etapa", width: 25, render: formatClaveDashBoard })
//                .add({ data: "Fase.Clave", title: "Fase", width: 10 })
//                .add({ data: "PorcentajeAvance", title: "Avance", width: 8, render: formatProgressBar })

//                .add({ data: "ID", title: "", width: 5, render: EK.UX.Labels.formatConfigExpediente })
//                .add({ data: "ID", title: "", width: 5, render: formatConfigMensaje })
//                .add({ data: "ID", title: "", width: 5, render: formatConfigCita })
//                .add({ data: "ID", title: "", width: 5, render: formatConfigTarea })
//                .toArray();
//            return <div>
//                <dt.PageTable columns={columns} onRowDoubleClick={this.onRowDoubleClick} />

//            </div>;
//        };
//    });




//    let VistaClientesSinExpedientes: any = global.connect(class extends React.Component<IExpedientesDashBoard, {}>{
//        constructor(props: IExpedientesDashBoard) {
//            super(props);
//            this.onclick = this.onclick.bind(this);
//        }

//        static props: any = (state: any): any => ({
//            data: state.global.RedurcerClientesSinExpediente,
//            config: global.getPageConfig(state.global.pageConfig),
//            EstadoSeleccionado: state.global.EstatusSelected,
//        });

//        componentDidMount(): void {
//            dispatchDefault("load::Cliente_Sin_Expediente_Seleccionado", {});
//            let encodedURL: any = "SCV/Clientes/SinExpediente/";
//            dispatchAsync("load::RedurcerClientesSinExpediente", encodedURL);
//        };

//        onclick(item: any) {
//            dispatchSuccessful("load::Cliente_Sin_Expediente_Seleccionado", item);
//        };

//        render(): JSX.Element {
//            let ml: any = config.getML();
//            let formatNombre: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
//                if (row.TipoPersona.Clave === "F") {
//                    return row.Nombre + " " + row.ApellidoPaterno + " " + row.ApellidoMaterno;
//                }
//                else {
//                    return data;
//                };
//            };

//            let formatConfigTarea: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
//                return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>
//                    <div className="btn default btn-circle btn-xs">
//                        <a style={{ color: "gray" }} className={'ActividadesExpediente'} href='#/kontrol/tareas/id?nuevo' target="_blank" ><i className='fa fa-calendar-o'></i></a>
//                    </div>
//                </div>);
//            };

//            let columns: dt.IDTColumn[] = dt.createColumns(ml)
//                .addID({ width: 5, title: "Id" })
//                .add({ data: "TipoPersona.Nombre", title: "Tipo", width: 10 })
//                .add({ data: "RFC", title: "RFC", width: 20 })
//                .add({ data: "Nombre", title: "Nombre", width: 45, render: formatNombre })
//                .add({ data: "ID", title: "", width: 5, render: formatConfigTarea })
//                .addEstatus({ width: 10 })
//                .toArray();
//            return <div >
//                <PanelUpdate info={this.props.data}>
//                    <PageTableClientesSinExpedientes columns={columns} pageId={clientes_ID} onRowSelected={this.onclick} />
//                </PanelUpdate>
//            </div>;
//        };
//    });


//    class PageTableClientesSinExpedientes extends React.Component<any, any> {
//        static props: any = (state: any) => ({
//            data: state.global.RedurcerClientesSinExpediente,
//        });
//        component: any = ReactRedux.connect(PageTableClientesSinExpedientes.props, null)(DataTable);
//        render(): any {
//            return <this.component {...this.props}  />;
//        };
//    };

//    export const dispatchExpediente: (next: any, actual: any) => void = (next: any, actual: any): void => {
//        var idCliente = getData(EK.Store.getState().global.Cliente_Expediente_Seleccionado).ID;
//        var EstadoSeleccionado = next.EstadoSeleccionado && getData(next.EstadoSeleccionado).Clave && getData(next.EstadoSeleccionado).Clave != 'TODOS' ? getData(next.EstadoSeleccionado).Clave : null;
//        var FaseSeleccionada = next.FaseSeleccionada && getData(next.FaseSeleccionada).Clave && getData(next.FaseSeleccionada).Clave != 'TODOS' ? getData(next.FaseSeleccionada).Clave : null;
//        var EtapaSeleccionada = next.EtapaSeleccionada && getData(next.EtapaSeleccionada).ID && getData(next.EtapaSeleccionada).ID > 0 ? getData(next.EtapaSeleccionada).ID : null;
//        let f: any;
//        if (idCliente === undefined) {
//            idCliente = null;
//        }
//        f = global.assign({ IdCliente: idCliente, ClaveEstado: EstadoSeleccionado, Fase: FaseSeleccionada, IdEtapa: EtapaSeleccionada, OperacionEspecificaSP: "DashBoard" });
//        config.dispatchCatalogoBase("/base/kontrol/expedientes/all/", f);

//    };

//    let ExpedientesDashBoardEstados: any = global.connect(class extends React.Component<IExpedientesDashBoard, {}>{
//        constructor(props: IExpedientesDashBoard) {
//            super(props);
//            this.onClick = this.onClick.bind(this);
//        }

//        static props: any = (state: any): any => ({
//            indicadoresEstados: state.global.dashBoardIndicadoresEstados,
//            ClienteSeleccionado: state.global.Cliente_Expediente_Seleccionado,
//            EstadoSeleccionado: state.global.EstatusSelected,
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            getIndicadores: (ArgIdCliente: number, ArgEstado: string): void => {
//                let encodedParams: string = global.encodeParameters({ IdCliente: ArgIdCliente });
//                let encodedURL: any = "SCV/Expedientes/DashBoard/Estados/" + encodedParams;
//                dispatchAsync("load::dashBoardIndicadoresEstados", encodedURL);
//            }
//        });

//        onClick(valor: any, e: any): void {
//            e.preventDefault();
//            dispatchSuccessful("load::EtapaSelected", { ID: null, CLave: "TODOS" })
//            dispatchSuccessful("load::EstatusSelected", { Clave: valor });
//            dispatchSuccessful("load::FaseSelected", { ID: "TODOS", Clave: "TODOS" })
//        }
//        componentWillMount(): void {
//            dispatchSuccessful("load::dashBoardIndicadoresEstados", createDefaultStoreObject({}));
//        }

//        componentDidMount(): void {
//            let idCliente: any = this.props.ClienteSeleccionado ? getData(this.props.ClienteSeleccionado).ID : null;
//            dispatchSuccessful("load::EstatusSelected", { Clave: "TODOS", Nombre: 'TODOS LOS ESTADOS' });
//            this.props.getIndicadores(idCliente, "TODOS");
//        }

//        shouldComponentUpdate(nextProps: IExpedientesDashBoard, nextState: IExpedientesDashBoard): boolean {
//            return hasChanged(this.props.indicadoresEstados, nextProps.indicadoresEstados) ||
//                hasChanged(this.props.EstadoSeleccionado, nextProps.EstadoSeleccionado);
//        };

//        render(): JSX.Element {
//            let indicadores: any = getData(this.props.indicadoresEstados);

//            let totalIndicador: number = 0;
//            let CantidadActivos: number = 0;
//            let CantidadSuspendidos: number = 0;
//            let CantidadPorVencer: number = 0;
//            let CantidadVencidos: number = 0;
//            let CantidadProspectosSinExpedientes: number = 0;
//            let indicadorDeActualizacion: boolean = true;

//            if (isSuccessful(this.props.indicadoresEstados)) {
//                totalIndicador = 0;
//                CantidadActivos = 0;
//                CantidadSuspendidos = 0;
//                CantidadPorVencer = 0;
//                CantidadVencidos = 0;
//                CantidadProspectosSinExpedientes = 0;
//                indicadorDeActualizacion = false;
//                if (getData(this.props.indicadoresEstados).length > 0) {

//                    CantidadActivos = getData(this.props.indicadoresEstados)[0].CantidadActivos;
//                    CantidadSuspendidos = getData(this.props.indicadoresEstados)[0].CantidadSuspendidos;
//                    CantidadPorVencer = getData(this.props.indicadoresEstados)[0].CantidadPorVencer;
//                    CantidadVencidos = getData(this.props.indicadoresEstados)[0].CantidadVencidos;
//                    CantidadProspectosSinExpedientes = getData(this.props.indicadoresEstados)[0].CantidadProspectosSinExpedientes;
//                    totalIndicador = this.props.indicadoresEstados ? (CantidadActivos + CantidadSuspendidos + CantidadVencidos + CantidadPorVencer) : 0;

//                }

//            }
//            let IndicaActualizando: any = indicadorDeActualizacion ? <AwesomeSpinner paddingTop={0} size={11} icon={"fas fa-sync-alt"} colorClass={"font-white"} /> : '';

//            let resaltar: (parametro: string) => string = (parametro: string) => {
//                let retorno = ''; 
//                if (getData(this.props.EstadoSeleccionado).Clave === parametro || getData(this.props.EstadoSeleccionado).Clave === parametro) {
//                    retorno = " indicar_seleccion"; 
//                }
//                return retorno;
//            }


//            return <div >
//                <ol className="dd-list " >
//                    <li className={"dd-item dd3-item panel panel-main panel-sub10 dd3-content-ek  " + resaltar('TODOS') } data-id="209" onClick={(e) => this.onClick("TODOS", e)} style={{ cursor: "pointer" }}>
//                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px" }}>{IndicaActualizando ? IndicaActualizando : totalIndicador}</span>
//                        <a className="btn" onClick={(e) => this.onClick("TODOS", e)}>
//                            <i className="fas fa-bars "></i> TODOS </a>
//                    </li>
//                    <li className={"dd-item dd3-item  dd3-content-ek  " + resaltar ('A')} onClick={(e) => this.onClick("A", e)} data-id="210" style={{ cursor: "pointer" }}>
//                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px" }}>{IndicaActualizando ? IndicaActualizando : CantidadActivos}</span>
//                        <a className="btn" >
//                            <i className={EstatusDashBoardFallasInfo.iconos['A']} style={{ color: EstatusDashBoardFallasInfo.iconosColor['A'] }}></i>  </a>
//                    </li>
//                    <li className={"dd-item dd3-item  dd3-content-ek  " + resaltar('W')} onClick={(e) => this.onClick("W", e)} data-id="212" style={{ cursor: "pointer" }} >
//                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px" }}>{IndicaActualizando ? IndicaActualizando : CantidadPorVencer}</span>
//                        <a className="btn">
//                            <i className={EstatusDashBoardFallasInfo.iconos['W']} style={{ color: EstatusDashBoardFallasInfo.iconosColor['W'] }}></i>  </a>
//                    </li>
//                    <li className={"dd-item dd3-item  dd3-content-ek  " + resaltar('V')} onClick={(e) => this.onClick("V", e)} data-id="213" style={{ cursor: "pointer" }}>
//                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px" }}>{IndicaActualizando ? IndicaActualizando : CantidadVencidos}</span>
//                        <a className="btn" >
//                            <i className={EstatusDashBoardFallasInfo.iconos['V']} style={{ color: EstatusDashBoardFallasInfo.iconosColor['V'] }}></i> </a>
//                    </li>
//                    <li className={"dd-item dd3-item panel panel-main panel-sub10 dd3-content-ek  " + resaltar('S')} onClick={(e) => this.onClick("S", e)} data-id="211" style={{ cursor: "pointer" }}>
//                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px" }}>{IndicaActualizando ? IndicaActualizando : CantidadSuspendidos}</span>
//                        <a className="btn" >
//                            <i className={EstatusDashBoardFallasInfo.iconos['S']} ></i>  </a>
//                    </li>
//                    <li className={"dd-item dd3-item  dd3-content-ek" + resaltar('ProspectosSinExpedientes')} data-id="212" onClick={(e) => this.onClick("ProspectosSinExpedientes", e)} style={{ cursor: "pointer" }}>
//                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px", background: "Red" }}>{IndicaActualizando ? IndicaActualizando : CantidadProspectosSinExpedientes}</span>
//                        <a className="btn" >
//                            <i className="fa fa-group" style={{ color: "Red" }}></i> </a>
//                    </li>

//                </ol>
//            </div>
//        }
//    });

//    let ExpedientesDashBoardFases: any = global.connect(class extends React.Component<IExpedientesDashBoard, {}>{
//        constructor(props: IExpedientesDashBoard) {
//            super(props);
//            this.onClick = this.onClick.bind(this);
//        };

//        static props: any = (state: any): any => ({
//            indicadoresFases: state.global.catalogo$dashBoardIndicadoresFases,
//            EstadoSeleccionado: state.global.EstatusSelected,
//            ClienteSeleccionado: state.global.Cliente_Expediente_Seleccionado,
//            FaseSeleccionada: state.global.FaseSelected,
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            getIndicadores: (ArgIdCliente: number, ArgEstado: string): void => {
//                let encodedParams: string = global.encodeParameters({ IdCliente: ArgIdCliente, ClaveEstado: ArgEstado });
//                let encodedURL: any = "SCV/Expedientes/DashBoard/Fases/" + encodedParams;
//                dispatchAsync("global-page-data", encodedURL, "dashBoardIndicadoresFases");
//            }
//        });

//        onClick(valor: any, e: any): void {
//            dispatchSuccessful("load::FaseSelected", { Clave: valor });
//            dispatchSuccessful("load::EtapaSelected", { ID: null })
//        };

//        componentDidMount(): void {
//            let idCliente: any = this.props.ClienteSeleccionado ? getData(this.props.ClienteSeleccionado).ID : null;
//            let EstadoSeleccionado: any = this.props.EstadoSeleccionado ? getData(this.props.EstadoSeleccionado).Clave : "TODOS";
//            this.props.getIndicadores(idCliente, null);
//        };

//        shouldComponentUpdate(nextProps: IExpedientesDashBoard, nextState: IExpedientesDashBoard): boolean {
//            return hasChanged(this.props.indicadoresFases, nextProps.indicadoresFases) ||
//                hasChanged(this.props.EstadoSeleccionado, nextProps.EstadoSeleccionado) ||
//                hasChanged(this.props.ClienteSeleccionado, nextProps.ClienteSeleccionado) ||
//                hasChanged(this.props.FaseSeleccionada, nextProps.FaseSeleccionada) ;
//        };

//        componentWillUpdate(nextProps: IExpedientesDashBoard, {}): void {
//            if (nextProps.EstadoSeleccionado !== this.props.EstadoSeleccionado) {
//                let idCliente: any = this.props.ClienteSeleccionado ? getData(this.props.ClienteSeleccionado).ID : null;
//                let EstadoSeleccionado: any = nextProps.EstadoSeleccionado && getData(nextProps.EstadoSeleccionado).Clave != 'TODOS' ? getData(nextProps.EstadoSeleccionado).Clave : null;
//                this.props.getIndicadores(idCliente, EstadoSeleccionado);
//            }
//        };

//        render(): JSX.Element {
//            let indicadores: any = this.props.indicadoresFases;
//            let EstadoSeleccionado: any = '';
//            let iconoEstadoSeleccionado: any = '';
//            let muestraEstado: boolean = this.props.EstadoSeleccionado && getData(this.props.EstadoSeleccionado).Clave != null ? true : false;
//            let iconos: any[] = [];
//            iconos['TODOS'] = "fas fa-bars";
//            iconos['A'] = "glyphicon glyphicon-play";
//            iconos['W'] = "fas fa-exclamation-triangle";
//            iconos['V'] = "fa fa-times-circle";
//            iconos['S'] = "glyphicon glyphicon-pause";
//            let iconosColor: any[] = [];
//            iconosColor['TODOS'] = "";
//            iconosColor['A'] = "#8bc780";
//            iconosColor['W'] = "#ff8f00";
//            iconosColor['V'] = "#df0707";
//            iconosColor['S'] = "";

//            if (muestraEstado) {
//                EstadoSeleccionado = getData(this.props.EstadoSeleccionado).Clave;
//                iconoEstadoSeleccionado = iconos[EstadoSeleccionado];
//            }

//            let estiloPersonalizado: React.CSSProperties = {
//                opacity: EstadoSeleccionado === 'ProspectosSinExpedientes' ? 0 : 1.0,
//                pointerEvents: EstadoSeleccionado === 'ProspectosSinExpedientes' ? "none" : "auto"
//            };
//            let IndicaActualizando: any = <AwesomeSpinner paddingTop={15} size={28} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;;

//            let itemsModificados: DataElement = this.props.indicadoresFases;
//            if (isSuccessful(this.props.indicadoresFases)) {
//                let nuevoItem: any = {};

//                let totalFases: number = 0;
//                let nuevoElemento: any = 'SI'; 
//                if (itemsModificados.data.length > 0) {
//                    if (itemsModificados.data[0].Clave === 'TODOS') {
//                        nuevoElemento = 'NO'
//                    }
//                }
//                if (nuevoElemento === 'SI') {
//                    getData(this.props.indicadoresFases).forEach((value: any, index: number): any => {
//                        totalFases += value.ConteoExpediente;
//                    });

//                    nuevoItem['ID'] = null; nuevoItem['Clave'] = 'TODOS';
//                    nuevoItem['Nombre'] = 'TODAS';
//                    nuevoItem['ConteoExpediente'] = totalFases;

//                    itemsModificados.data.unshift(nuevoItem);
//                }
//                IndicaActualizando = '';
//                itemsModificados.timestamp = Number(new Date());
//                itemsModificados = itemsModificados.getActiveItems();
//            }

//            let items: DataElement = itemsModificados;

//            let resaltar: (parametro: string) => string = (parametro: string) => {
//                let retorno = '';
//                if (getData(this.props.FaseSeleccionada).Clave === parametro || getData(this.props.FaseSeleccionada).Clave === parametro) {
//                    retorno = " indicar_seleccion";
//                }
//                return retorno;
//            }
//            return <div >
//                {IndicaActualizando === '' ?
//                    <List
//                        items={items}
//                        readonly={false}
//                        addRemoveButton={false}
//                        dragAndDrop={false}
//                        listMode={"list-horizontal"}
//                        formatter={(index: number, item: any) => {
//                            return <div >
//                                <a className={"btn " + resaltar(item.Clave) } onClick={(e) => this.onClick(item.Clave, e)}>
//                                    <span className="badge badge-success pull-right ek-sombra" style={{ marginBottom: "16px", marginTop: "-8px" }}>{item.ConteoExpediente}</span>
//                                    <i className={item.ID ? item.IconoReg : iconoEstadoSeleccionado} style={{ color: iconosColor[EstadoSeleccionado] }} ></i>{item.Nombre}  </a>
//                            </div>;
//                        }} />
//                    : IndicaActualizando}
//            </div>;
         
//        }
//    });



//    let Agentes: any = global.connect(class extends page.Base {
//        constructor(props: IExpedientesDashBoard) {
//            super(props);
//        }

//        static props: any = (state: any): any => ({
//            data: state.global.catalogo$agentes,
//            config: global.getPageConfig(state.global.pageConfig)
//        });

//        componentDidMount(): void {
//            this.props.config.dispatchCatalogoBase("/usuarios/descendientes", null, AGENTES_ID);
//        };

//        render(): JSX.Element {
//            return <OptionSection
//                id={AGENTES_ID}
//                icon="fa fa-table"
//                collapsed={false}
//                inlineEdit={false}
//                title={"Agentes"}
//            >
//                <PanelUpdate info={this.props.data}>
//                    <List id={AGENTES_ID + "_list"}
//                        items={this.props.data}
//                        readonly={true}
//                        addRemoveButton={false}
//                        listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
//                            <Row>
//                                <Column size={[6, 2, 2, 2]} className="list-default-header">{"Área"}</Column>
//                                <Column size={[6, 3, 3, 3]} className="list-default-header">{"Posición"}</Column>
//                                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Email"}</Column>
//                                <Column size={[12, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
//                            </Row>
//                        </div>}
//                        formatter={(index: number, item: any) => {
//                            return <Row>
//                                <Column size={[6, 2, 2, 2]} className="listItem-default-header">{item.AreaOrganizacion.Nombre}</Column>
//                                <Column size={[6, 3, 3, 3]} className="listItem-default-header">{item.Posicion.Nombre}</Column>
//                                <Column size={[12, 2, 2, 2]} className="listItem-default-header">{item.Clave}</Column>
//                                <Column size={[12, 4, 4, 4]} className="listItem-default-header">{item.Nombre} {item.Apellidos}</Column>
//                            </Row>;
//                        }} />
//                </PanelUpdate>
//            </OptionSection>;
//        }
//    });



    
//}