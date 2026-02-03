namespace EK.Modules.SCV.Pages.postventa.RUBA.DashBoardFailureReport {
    "use strict";
    const DATOS_GRID_TABLERO: string = "DatosDashBoardReporteFallas"; 
    const config: page.IPageConfig = global.createPageConfig("ReportesFallas", "scv", [DATOS_GRID_TABLERO]);
    const PAGE_ID: string = "ReportesFallas";
    const FORMULARIO_FILTRO: string = "FormularioFiltroDashBoardReporteFallas";
    const w: any = window;
    export class EstatusReporteFallasDashBoardInfo {
        static iconos: any = {
            'SIN': "fas fa-hourglass-half",      //SIN ATENDER
            'ACT': "glyphicon glyphicon-play",   //Activo - A Tiempo
            'W': "fas fa-exclamation-triangle",  //POR VENCER
            'V': "fa fa-times-circle",           //VENCIDO
            'REP': "icon-loop",                  //REPROGRAMADO
            'ATE': "fa fa-check",                //ATENDIDAS
            'SUS': "glyphicon glyphicon-pause",  //CANCELADA - SUSPENDIDAS
            'DAB':"fas fa-clipboard-check" ,     //DICTAMENES ABIERTOS
            'SINMARCA': ""                       //SIN MARCA
        };

        static iconosColor: any = {
            'SIN': "#fbf641",                   //SIN ATENDER
            'ACT': "#8bc780",                   //Activo - A Tiempo
            'W': "#ff8f00",                     //POR VENCER
            'V': "#df0707",                     //VENCIDO
            'REP': "#9d9b9b",                   //REPROGRAMADO
            'ATE': "#9d9b9b",                   //ATENDIDAS
            'SUS': "#337ab7",                   //CANCELADA - SUSPENDIDAS
            'DAB': "#36c6d3",                   //DICTAMENES ABIERTOS
            'SINMARCA': ""                      //SIN MARCA
        };
    };

    interface IDashBoardReporteFallas extends page.IProps {
        estadosDashBoard?: DataElement;
        usuarioSeleccionado?: any;
        estadoSeleccionado?: DataElement;
        plaza?: DataElement;
        data?: DataElement;
        mes?: DataElement; 
        fraccionamiento?: DataElement; 
        obtenerGrid?: (idPlaza: any, claveEstado: any, usuarioSeleccionado: any) => void;
        obtenerTop?: (idPlaza: any, claveEstado: any, usuarioSeleccionado: any) => void;
    };

    interface IDashBoardReporteFallasState {
        modoAgenda: boolean;
    };

   



    export const Vista: any = global.connect(class extends React.Component<IDashBoardReporteFallas, IDashBoardReporteFallasState>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.estadosDashBoard = state.global.reporteFallas$estadosDashBoard;
            retValue.usuarioSeleccionado = state.global.UsuarioReporteFallaSelected;
            retValue.estadoSeleccionado = state.global.EstatusSelected;
            retValue.plaza = Forms.getDataValue("Plazas", PAGE_ID, state);
            retValue.mes = Forms.getDataValue("Meses", FORMULARIO_FILTRO, state);
            retValue.fraccionamiento = Forms.getDataValue("Fraccionamientos", FORMULARIO_FILTRO, state);
            retValue.data = state.global["catalogo$" + DATOS_GRID_TABLERO];
            return retValue;
        };
        onFilter(props: any, filters: any, type?: string): void {
            //alert("Filtros")
        };
        onExport(): void {
            let idPlaza: any = global.getDataID(this.props.plaza) ? global.getDataID(this.props.plaza) : null;
            let claveEstado: any = this.props.estadoSeleccionado ? global.getData(this.props.estadoSeleccionado).Clave : null;
            let usuarioSeleccionado: any = this.props.usuarioSeleccionado && getData(this.props.usuarioSeleccionado).item && getData(this.props.usuarioSeleccionado).item.ID ? getData(this.props.usuarioSeleccionado).item.ID : null;
            idPlaza = idPlaza == -2 ? null : idPlaza;
            claveEstado = this.props.usuarioSeleccionado && getData(this.props.usuarioSeleccionado).item && getData(this.props.usuarioSeleccionado).item._action && getData(this.props.usuarioSeleccionado).item._action != undefined ? getData(this.props.usuarioSeleccionado).item._action : claveEstado;

            var fecha = new Date();
            let idMes: any = Forms.getValue("Meses", FORMULARIO_FILTRO) === undefined || Forms.getValue("Meses", FORMULARIO_FILTRO) === null || Forms.getValue("Meses", FORMULARIO_FILTRO).ID === null || Forms.getValue("Meses", FORMULARIO_FILTRO).ID === undefined ? null : Forms.getValue("Meses", FORMULARIO_FILTRO).ID;
            if (idMes === undefined || idMes === null) {
                idMes = fecha.getMonth();
            };

            let idAnio: any = Forms.getValue("FullAnio", FORMULARIO_FILTRO) === undefined || Forms.getValue("FullAnio", FORMULARIO_FILTRO) === null || Forms.getValue("FullAnio", FORMULARIO_FILTRO).ID === null || Forms.getValue("FullAnio", FORMULARIO_FILTRO).ID === undefined ? null : Forms.getValue("FullAnio", FORMULARIO_FILTRO).ID;
            if (idAnio === undefined || idAnio === null) {
                idAnio = fecha.getFullYear();
            };

            let encodedParams: string = global.encodeObject({ IdPlaza: idPlaza, ClaveEstado: claveEstado, US: usuarioSeleccionado, CY: idAnio, MC: idMes });
            window.open("base/scv/ReportesFallas/exportar/" + encodedParams);
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerGrid: (idPlaza: any, claveEstado: any, usuarioSeleccionado: any): void => {
                var fecha = new Date();
                let idMes: any = Forms.getValue('Meses', FORMULARIO_FILTRO) === undefined || Forms.getValue('Meses', FORMULARIO_FILTRO) === null || Forms.getValue('Meses', FORMULARIO_FILTRO).ID === null || Forms.getValue('Meses', FORMULARIO_FILTRO).ID === undefined ? null : Forms.getValue('Meses', FORMULARIO_FILTRO).ID;
                if (idMes === undefined || idMes === null) {
                    idMes = fecha.getMonth();
                }
                let idAnio: any = Forms.getValue('FullAnio', FORMULARIO_FILTRO) === undefined || Forms.getValue('FullAnio', FORMULARIO_FILTRO) === null || Forms.getValue('FullAnio', FORMULARIO_FILTRO).ID === null || Forms.getValue('FullAnio', FORMULARIO_FILTRO).ID === undefined ? null : Forms.getValue('FullAnio', FORMULARIO_FILTRO).ID;
                if (idAnio === undefined || idAnio === null) {
                    idAnio = fecha.getFullYear();
                }
                let plaza = Forms.getValue("Plazas", PAGE_ID);
                if (plaza.ID != undefined) {
                    let idFraccionamiento: any = Forms.getValue('Fraccionamientos', FORMULARIO_FILTRO) === undefined || Forms.getValue('Fraccionamientos', FORMULARIO_FILTRO) === null || Forms.getValue('Fraccionamientos', FORMULARIO_FILTRO).ID === null || Forms.getValue('Fraccionamientos', FORMULARIO_FILTRO).ID === undefined ? null : Forms.getValue('Fraccionamientos', FORMULARIO_FILTRO).ID;
                    //global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/Get/getGridDashBoard/" + global.encodeObject({ IdPlaza: idPlaza, ClaveEstado: claveEstado, US: usuarioSeleccionado, CY: idAnio, MC: idMes, Fraccionamiento: idFraccionamiento }), DATOS_GRID_TABLERO);

                    //console.log(usuarioSeleccionado)
                    let parametros:any = { IdPlaza: idPlaza, ClaveEstado: claveEstado, US: usuarioSeleccionado, CY: idAnio, MC: idMes, Fraccionamiento: idFraccionamiento }
                    if (parametros.US === null || parametros.US === 'null') {
                        parametros['GetAllGrid'] = 1;
                    }
                    //let encodedParametros = global.encodeObject(parametros);
                    //global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/Get/getGridDashBoard/" + encodedParametros, DATOS_GRID_TABLERO);
                    //global.dispatchAsyncPost("global-page-data", "base/scv/ReportesFallas/Get/getGridDashBoard/", parametros, DATOS_GRID_TABLERO)
                    global.dispatchAsyncPost("global-page-data", "base/scv/reportesFallas/GetBP/getGridDashBoard/", {parametros}, DATOS_GRID_TABLERO)
                }
            },
            obtenerTop: (idPlaza: any, claveEstado: any, usuarioSeleccionado: any): void => {
                var fecha = new Date();
                let idMes: any = Forms.getValue('Meses', FORMULARIO_FILTRO) === undefined || Forms.getValue('Meses', FORMULARIO_FILTRO) === null || Forms.getValue('Meses', FORMULARIO_FILTRO).ID === null || Forms.getValue('Meses', FORMULARIO_FILTRO).ID === undefined ? null : Forms.getValue('Meses', FORMULARIO_FILTRO).ID;
                if (idMes === undefined || idMes === null) {
                    idMes = fecha.getMonth();
                }
                let idAnio: any = Forms.getValue('FullAnio', FORMULARIO_FILTRO) === undefined || Forms.getValue('FullAnio', FORMULARIO_FILTRO) === null || Forms.getValue('FullAnio', FORMULARIO_FILTRO).ID === null || Forms.getValue('FullAnio', FORMULARIO_FILTRO).ID === undefined ? null : Forms.getValue('FullAnio', FORMULARIO_FILTRO).ID;
                if (idAnio === undefined || idAnio === null) {
                    idAnio = fecha.getFullYear();
                }
                let plaza = Forms.getValue("Plazas", PAGE_ID);
                if (plaza.ID != undefined) {
                    // global.dispatchAsync("load::DatosDashBoardReporteTop", "base/scv/ReportesFallas/Get/getTopReportDashBoard/" + global.encodeObject({ IdPlaza: idPlaza, ClaveEstado: claveEstado, US: usuarioSeleccionado, CY: idAnio, MC: idMes }));
                }
            }
        });
        componentDidMount(): any {
            //let encodedParams: string = global.encodeParameters({ IdPlaza: "-2" });
            //global.dispatchAsync("load::reporteFallas$estadosDashBoard", "base/scv/ReportesFallas/Get/getStateDashBoard/" + encodedParams);
            global.dispatchSuccessful("load::EstatusSelected", { Clave: "TODOS", Nombre: 'TODOS LOS ESTADOS' });
            global.dispatchSuccessful("load::DatosDashBoardReporteTop", []);
            //Forms.updateFormElement(PAGE_ID, "Plazas", { ID: -2, Clave: 'Ver Todos' });
        };
        componentWillReceiveProps(nextProps: IDashBoardReporteFallas) {
            if (hasChanged(this.props.usuarioSeleccionado, nextProps.usuarioSeleccionado)) {
                if (global.isSuccessful(nextProps.usuarioSeleccionado)) {
                    let idPlaza: any = global.getDataID(nextProps.plaza) ? global.getDataID(nextProps.plaza) : null;
                    let claveEstado: any = nextProps.estadoSeleccionado ? global.getData(nextProps.estadoSeleccionado).Clave : null;
                    let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : null;
                    idPlaza = idPlaza == -2 ? null : idPlaza;
                    claveEstado = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item._action && getData(nextProps.usuarioSeleccionado).item._action != undefined ? getData(nextProps.usuarioSeleccionado).item._action : claveEstado;
                    let plaza = Forms.getValue("Plazas", PAGE_ID);
                    if (plaza.ID != undefined) {
                       // this.props.obtenerTop(idPlaza, claveEstado, usuarioSeleccionado);
                        this.props.obtenerGrid(idPlaza, claveEstado, usuarioSeleccionado);
                    }
                }
            };
            if (hasChanged(this.props.mes, nextProps.mes)) {
                if (global.isSuccessful(nextProps.mes) && (getData(nextProps.mes).ID != getData(this.props.mes).ID)) {
                    if (global.isSuccessful(nextProps.usuarioSeleccionado) || global.isSuccessful(nextProps.plaza)) {
                        let idPlaza: any = global.getDataID(nextProps.plaza) ? global.getDataID(nextProps.plaza) : null;
                        let claveEstado: any = nextProps.estadoSeleccionado ? global.getData(nextProps.estadoSeleccionado).Clave : null;
                        let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : null;
                        idPlaza = idPlaza == -2 ? null : idPlaza;
                        claveEstado = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item._action && getData(nextProps.usuarioSeleccionado).item._action != undefined ? getData(nextProps.usuarioSeleccionado).item._action : claveEstado;

                        this.props.obtenerGrid(idPlaza, claveEstado, usuarioSeleccionado);
                    }
                }
            };
            if (hasChanged(this.props.fraccionamiento, nextProps.fraccionamiento)) {
                if (global.isSuccessful(nextProps.fraccionamiento) && (getData(nextProps.fraccionamiento).ID != getData(this.props.fraccionamiento).ID)) {
                    if (global.isSuccessful(nextProps.usuarioSeleccionado) || global.isSuccessful(nextProps.plaza)) {
                        let idPlaza: any = global.getDataID(nextProps.plaza) ? global.getDataID(nextProps.plaza) : null;
                        let claveEstado: any = nextProps.estadoSeleccionado ? global.getData(nextProps.estadoSeleccionado).Clave : null;
                        let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : null;
                        idPlaza = idPlaza == -2 ? null : idPlaza;
                        claveEstado = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item._action && getData(nextProps.usuarioSeleccionado).item._action != undefined ? getData(nextProps.usuarioSeleccionado).item._action : claveEstado;

                        this.props.obtenerGrid(idPlaza, claveEstado, usuarioSeleccionado);
                    }
                }
            };


        };
        onNew(item: any, props: page.IProps): void {
            global.go("scv/pv/reportesFallas/id?nuevo");
        };
        onView(item: any, props: page.IProps): any {
            let id: number = item && item.ID ? item.ID : 0;
            if (id > 0) {
                go("scv/pv/reportesFallas/" + id, false);
            };
        };
        onRowDoubleClick(item: any): any {
            let id: number = item && item.ID ? item.ID : 0;
            if (id > 0) {
                go("scv/pv/reportesFallas/" + id, false);
            };
        };
        onClick(btn: any, input: any, props: select.ISelectProps): void {
            let item: any = Forms.getValue("ReporteBuscador", config.id);
            if (item && item.ID > 0) {
                go("scv/pv/reportesFallas/" + item.ID, false);
            };
        };
        render(): JSX.Element {
            let ml: any = config.getML();

            let formatEstatusReporte: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
               let retValue: any;
               if (data && data.Clave) {
                    if (data.Clave === "T") {
                        retValue = <span className="badge bg-green-jungle bg-font-green-jungle" style={{ padding: "4px 15px 4px", height: "100%"}}> {data.Nombre } </span>;
                    } else if (data.Clave === "P") {
                        retValue = <span className="badge bg-green-jungle bg-font-green-jungle" style={{ padding: "4px 15px 4px", height: "100%" }}> {data.Nombre} </span>;
                    } else {
                        retValue = <span className="badge badge-info" style={{ padding: "4px 15px 4px", height: "100%" }}> {data.Nombre} </span>;
                      }
                }
                return retValue;
            };

            let formatBadgeEncuesta: (data: boolean) => any = (data: boolean): any => {
                return <div style={{ textAlign: "center" }}>{label.ok(data)}</div>
            };

            let formatEstatusEncuesta: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
                let retValue: any;
                if (data && data.Cerrada === true) {
                    if (data.NoContesto === true) {
                        retValue = <div style={{ textAlign: "center" }}> <div style={{ textAlign: "center", fontSize: "19px", marginTop: "-4px" }}><span className="fab fa-creative-commons-pd" title="No Contesto" style={{ color: "brown" }} ></span></div></div>;
                    } else {
                        if (data.NoEncontrado === true) {
                                retValue = <div style={{ textAlign: "center" }}> <div style={{ textAlign: "center", fontSize: "19px", marginTop: "-4px" }}><span className="fal fa-map-marker-alt-slash" title="No Encontrado" style={{ color: "Orange" }}> </span></div></div>;
                        } else {
                            retValue = <div style={{ textAlign: "center" }}> <div style={{ textAlign: "center", fontSize: "19px", marginTop: "-4px" }}>{EK.Modules.SCV.Pages.postventa.RUBA.inquestSPV.onIconSatisfactionIndex(data.IndiceSatisfaccion, "EMOJIS")}</div></div>;
                        }
                    }
                       
                } else {
                    retValue = <span title="Encuesta Pendiente" >{formatBadgeEncuesta(false)} </span>;
                }
                return retValue;
            };

            let formatConfigAcciones: (data: any, row: any) => any = (data: any, row: any): any => {
                return <div style={{ textAlign: "right" }}>
                    <span>{data}</span>
                    <div className="btn btn-circle btn-xs" title="Ir al Folio">
                        <a style={{}} data-id="data" onClick={() => this.onRowDoubleClick(row)} className="boton"><i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>;
            };
        
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "ID", width: "100px", order: "desc", fixed: true, format: formatConfigAcciones })
                //.add({ data: "IdPrereporte", width: "120px", fixed: true, format: EK.UX.DataTable.formatPrereporte })
                //.add({ data: "ID", title: "", width: "80px", format: formatConfigAcciones, fixed: true })
                .add({ data: "listaFamilias", title: "Familia incidencia", width: "350px"})
               
                .add({ data: "Cliente.Nombre", width: "350px" })
                .add({ data: "Ubicacion.ClaveFormato", width: "100px" })
                .add({ data: "Desarrollo.Nombre", width: "350px" })
                .add({ data: "Desarrollo.Clave", width: "60px" })

                //.add({ data: "Cliente.Nombre", width: "350px"})
                .addDateFormat({ data: "Creado", width: "150px"})
                .add({ data: "CreadoPor.Nombre", width: "250px" })
                .add({ data: "EstatusReporte", width: "150px", format: formatEstatusReporte })
                .add({ data: "Cliente.TelefonoOtros", width: "150px" })

                .add({ data: "Cliente.TelefonoCasa", width: "150px" })
                .add({ data: "Cliente.TelefonoOficina", width: "150px" })
                .add({ data: "EncuestaSatisfaccion", title: "Encuesta", width: "90px", format: formatEstatusEncuesta })

                .add({ data: "Cliente.CorreoElectronico", width: "250px" })
               // .add({ data: "ResponsableConstruccion.Nombre", width: "250px" })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onView={this.onView.bind(this)} onFilter={this.onFilter.bind(this)} onNew={this.onNew.bind(this)} onExport={this.onExport.bind(this)}>
                <PageButtons>
                    <BitacoraSPVButton />
                </PageButtons>
                <ModalBitacoraClienteSPV size={[12, 12, 12, 12]} />
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros del Reporte de Fallas"}
                    level={2}
                    icon="far fa-address-book"
                    collapsed={false}>
                    <Row style={{ marginBottom: 10 }}>
                        <PeriodoReporte size={[12, 12, 6, 2]} />
                        <PlazasDDL id={"Plazas"} size={[12, 12, 6, 2]} label={"PLAZA"} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                        <select.ReportesFallasSPV id="ReporteBuscador" idForm={config.id} size={[12, 12, 6, 8]} iconButton="fas fa-arrow-right" buttonClick={this.onClick} />
                    </Row>
                    <Row>
                        <DashBoardEstadosReporteFallas />
                        <DashBoardUsuarios idPageBase={PAGE_ID} />
                        {/*<PageTableTopReporteFallas />*/}
                    </Row>
                </page.OptionSection>
                <div className="portlet light bordered  ek-sombra" style={{ padding: 0 }}>
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <ddl.MesesDDL id="Meses" idFormSection={FORMULARIO_FILTRO} size={[12,12, 6, 6]} style={{ float: "right" }} required={true} validations={[validations.required()]} />
                            <FraccionamientosDashBoardFailureReportDDL id={"Fraccionamientos"} size={[12, 12, 6,6]} idFormSection={FORMULARIO_FILTRO} /*idForm={this.props.pageId} */ validations={[validations.required()]} required={true} />
                        </Column>
                    </Row>
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <dt.DataTableExtended id={DATOS_GRID_TABLERO} dtType="list" dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
                        </Column>
                    </Row>
                </div>
            </page.Main>
        };
    });

 
    let PageTableTopReporteFallas: any = global.connect(class extends React.Component<IDashBoardReporteFallas, {}>{
        static props: any = (state: any) => ({
            data: state.global.DatosDashBoardReporteTop
        });
        render(): JSX.Element {
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(this.props.data, []).length].join("")}</span>;

            return <Column size={[12, 12, 3, 3]}>
                <OptionSection
                    id={"TopReporteDeFallas"}
                    icon="fa fa-calendar"
                    level={1}
                    title={"Top de Incidencias"}
                    subTitle={subTitleSeccion}
                    collapsed={false}>
                    <PanelUpdate info={this.props.data} text="Cargando la Información...">
                        <Row>
                            <List
                                items={getData(this.props.data)}
                                readonly={true}
                                addRemoveButton={false}
                                horizontalScrolling={true}
                                height={"225px"}
                                dragAndDrop={false}
                                listHeader={
                                    <Column size={[12, 12, 12, 12]}>
                                        <Row style={{ padding: "0px 10px" }}>
                                            <Column size={[3, 3, 3, 3]} className="list-default-header">{"Cant."}</Column>
                                            <Column size={[12, 12, 12, 12]} className="list-default-header">{"Incidencia"}</Column>
                                        </Row>
                                    </Column>}
                                formatter={(index: number, item: any) => {
                                    return <Row style={{ padding: "0px 10px" }}>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item" style={{ whiteSpace: "normal" }}>
                                            <span className="badge badge-success" style={{ margin: "0px 10px" }}>{item.Cantidad}</span>
                                        </Column>
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item" style={{ whiteSpace: "normal" }}>
                                            {item.Nombre}
                                        </Column>
                                    </Row>;
                                } } />
                        </Row>
                    </PanelUpdate>
                </OptionSection>
            </Column>
        }
    });

    interface ITopReporteFallasProps extends React.Props<any> {
        entidad?: any;
        state?: DataElement;
        asentamiento: any;
        geolocalizacion: string;
        usuarioSeleccionado?: any;
    };

    interface IEstadosReporteFallas extends page.IProps {
        item?: any;
        idForm: any;
        indicadoresEstados?: DataElement;
        EstadoSeleccionado?: any;
        PlazaSeleccionada?: any;
        getIndicadores?: (ArgIdPlaza: any) => void;
        onclick?: () => void;
        anioSeleccionado?: any; 
    };

    let DashBoardEstadosReporteFallas: any = global.connect(class extends React.Component<IEstadosReporteFallas, {}>{
        constructor(props: IEstadosReporteFallas) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any): any => ({
            indicadoresEstados: state.global.dashBoardReporteFallasIndicadoresEstados,
            PlazaSeleccionada: Forms.getValue("Plazas", PAGE_ID), 
            anioSeleccionado: Forms.getValue("FullAnio", FORMULARIO_FILTRO),
            EstadoSeleccionado: state.global.EstatusSelected,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            getIndicadores: (ArgIdPlaza: any): void => {
                var fecha = new Date();
                let idAnio: any = Forms.getValue('FullAnio', FORMULARIO_FILTRO) === undefined || Forms.getValue('FullAnio', FORMULARIO_FILTRO) === null || Forms.getValue('FullAnio', FORMULARIO_FILTRO).ID === null || Forms.getValue('FullAnio', FORMULARIO_FILTRO).ID === undefined ? null : Forms.getValue('FullAnio', FORMULARIO_FILTRO).ID; 
                if (idAnio === undefined || idAnio === null) {
                    idAnio = fecha.getFullYear();
                }

                ArgIdPlaza = ArgIdPlaza === -2 ? null : ArgIdPlaza;
                let encodedParams: string = global.encodeParameters({ IdPlaza: ArgIdPlaza, CY: idAnio });
                let plaza = Forms.getValue("Plazas", PAGE_ID);
                if (plaza.ID != undefined) {
                    dispatchAsync("load::dashBoardReporteFallasIndicadoresEstados", "base/scv/ReportesFallas/Get/getStateDashBoard/" + encodedParams);
                    dispatchSuccessful("load::EstatusSelected", { Clave: "TODOS", Nombre: 'TODOS LOS ESTADOS' });
                    dispatchSuccessful("load::UsuarioReporteFallaSelected", { ID: "TODOS", Clave: "TODOS" })
                }

            }
        });
        onClick(valor: any, e: any): void {
            e.preventDefault();
            dispatchSuccessful("load::EstatusSelected", { Clave: valor });
            dispatchSuccessful("load::UsuarioReporteFallaSelected", { ID: "TODOS", Clave: "TODOS" })
        };
        shouldComponentUpdate(nextProps: IEstadosReporteFallas, nextState: IEstadosReporteFallas): boolean {
            return hasChanged(this.props.indicadoresEstados, nextProps.indicadoresEstados) ||
                hasChanged(this.props.PlazaSeleccionada, nextProps.PlazaSeleccionada) ||
                hasChanged(this.props.EstadoSeleccionado, nextProps.EstadoSeleccionado) || hasChanged(this.props.anioSeleccionado, nextProps.anioSeleccionado);
        };
        componentWillUpdate(nextProps: IEstadosReporteFallas, {}): void {
            if (hasChanged(this.props.PlazaSeleccionada, nextProps.PlazaSeleccionada)) {
                let idPlazaNex: any = nextProps.PlazaSeleccionada && nextProps.PlazaSeleccionada.ID ? nextProps.PlazaSeleccionada.ID : null;
                let idPlazaProps: any = this.props.PlazaSeleccionada && this.props.PlazaSeleccionada.ID ? this.props.PlazaSeleccionada.ID : null;
                if (((idPlazaNex != idPlazaProps) && (idPlazaNex != -1))) {
                    this.props.getIndicadores(idPlazaNex);
                }
            }
            if (hasChanged(this.props.anioSeleccionado, nextProps.anioSeleccionado)) {
                let idPlazaNex: any = nextProps.PlazaSeleccionada && nextProps.PlazaSeleccionada.ID ? nextProps.PlazaSeleccionada.ID : null;
                    this.props.getIndicadores(idPlazaNex);
            }

                

        };
        render(): JSX.Element {
            let indicadores: any = getData(this.props.indicadoresEstados);
            let totalIndicador: number = 0;
            let cantidadActivas: number = 0;
            let cantidadPorVencer: number = 0;
            let cantidadVencidas: number = 0;
            let cantidadSuspendidas: number = 0;
            let cantidadAtendidas: number = 0;
            let cantidadCanceladas: number = 0;
            let cantidadDictamenesActivos: number = 0; 
            let indicadorDeActualizacion: boolean = true;

            if (isSuccessful(this.props.indicadoresEstados)) {
                totalIndicador = 0;
                cantidadActivas = 0;
                cantidadPorVencer = 0;
                cantidadVencidas = 0;
                cantidadSuspendidas = 0;
                cantidadAtendidas = 0;
                cantidadCanceladas = 0;
                cantidadDictamenesActivos = 0; 
                indicadorDeActualizacion = false;

                if (getData(this.props.indicadoresEstados).length > 0) {
                    cantidadActivas = getData(this.props.indicadoresEstados)[0].CantidadActivas;
                    cantidadPorVencer = getData(this.props.indicadoresEstados)[0].CantidadPorVencer;
                    cantidadVencidas = getData(this.props.indicadoresEstados)[0].CantidadVencidas;
                    cantidadSuspendidas = getData(this.props.indicadoresEstados)[0].CantidadSuspendidas;
                    cantidadAtendidas = getData(this.props.indicadoresEstados)[0].CantidadAtendidas;
                    cantidadCanceladas= getData(this.props.indicadoresEstados)[0].CantidadCanceladas;
                    cantidadDictamenesActivos = getData(this.props.indicadoresEstados)[0].CantidadDictamenesActivos;

                    cantidadActivas = cantidadActivas === null || cantidadActivas === undefined ? 0 : cantidadActivas;
                    cantidadPorVencer = cantidadPorVencer === null || cantidadPorVencer === undefined ? 0 : cantidadPorVencer;
                    cantidadVencidas = cantidadVencidas === null || cantidadVencidas === undefined ? 0 : cantidadVencidas;
                    cantidadSuspendidas = cantidadSuspendidas === null || cantidadSuspendidas === undefined ? 0 : cantidadSuspendidas;
                    cantidadAtendidas = cantidadAtendidas === null || cantidadAtendidas === undefined ? 0 : cantidadAtendidas;
                    cantidadCanceladas = cantidadCanceladas === null || cantidadCanceladas === undefined ? 0 : cantidadCanceladas;
                    totalIndicador = this.props.indicadoresEstados ? (cantidadActivas + cantidadPorVencer + cantidadVencidas + cantidadSuspendidas) : 0;
                }
            };

            let IndicaActualizando: any = indicadorDeActualizacion ? <AwesomeSpinner paddingTop={0} size={11} icon={"fas fa-sync-alt"} colorClass={"font-white"} /> : '';
            let resaltar: (parametro: string) => string = (parametro: string) => {
                let retorno = '';
                if (getData(this.props.EstadoSeleccionado).Clave === parametro || getData(this.props.EstadoSeleccionado).Clave === parametro) {
                    retorno = " indicar_seleccion";
                }
                return retorno;
            };

            return <Column size={[12, 12, 2, 2]}>
                <div className="portlet light  portlet-fit  bordered  ek-sombra " >
                    <div className="portlet-body" >
                        <div>
                            <ol className="dd-list " style={{ marginLeft: "-15px", marginRight: "-15px" }} >
                                <li className={"dd-item dd3-item panel panel-main panel-sub10 dd3-content-ek  " + resaltar('TODOS')} data-id="209" onClick={(e) => this.onClick("TODOS", e)} style={{ cursor: "pointer" }}>
                                    <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px" }}>{IndicaActualizando ? IndicaActualizando : totalIndicador}</span>
                                    <a className="btn" onClick={(e) => this.onClick("TODOS", e)}>
                                        <i className="fas fa-bars"></i> TODOS </a>
                                </li>
                                
                                <li className={"dd-item dd3-item  dd3-content-ek  " + resaltar('ACT')} onClick={(e) => this.onClick("ACT", e)} data-id="210" style={{ cursor: "pointer" }}>
                                    <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusReporteFallasDashBoardInfo.iconosColor['ACT'] }}>{IndicaActualizando ? IndicaActualizando : cantidadActivas}</span>
                                    <a className="btn">
                                        <i className={EstatusReporteFallasDashBoardInfo.iconos['ACT']} style={{ color: EstatusReporteFallasDashBoardInfo.iconosColor['ACT'] }}></i> <span style={{ fontSize: "11px" }}> Nuevo </span> </a>
                                </li>
                                <li className={"dd-item dd3-item  dd3-content-ek" + resaltar('ATE')} data-id="213" onClick={(e) => this.onClick("ATE", e)} style={{ cursor: "pointer" }}>
                                    <span className="badge badge-success pull-right " style={{ marginTop: "7px", background: EstatusReporteFallasDashBoardInfo.iconosColor['ATE'] }}>{IndicaActualizando ? IndicaActualizando : cantidadAtendidas}</span>
                                    <a className="btn">
                                        <i className={EstatusReporteFallasDashBoardInfo.iconos['ATE']} ></i><span style={{ fontSize: "11px" }}> Atendidos </span></a>
                                </li>
                                <li className={"dd-item dd3-item  dd3-content-ek    " + resaltar('CANC')} onClick={(e) => this.onClick("CANC", e)} data-id="213" style={{ cursor: "pointer" }}>
                                    <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusReporteFallasDashBoardInfo.iconosColor['V'] }}>{IndicaActualizando ? IndicaActualizando : cantidadCanceladas}</span>
                                    <a className="btn">
                                        <i className={EstatusReporteFallasDashBoardInfo.iconos['V']} style={{ color: EstatusReporteFallasDashBoardInfo.iconosColor['V'] }}></i> <span style={{ fontSize: "11px" }}> Cancelado </span>  </a>
                                </li>
                                
                                {/*<li className={"dd-item dd3-item  dd3-content-ek  " + resaltar('W')} onClick={(e) => this.onClick("W", e)} data-id="212" style={{ cursor: "pointer" }} >
                                    <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusReporteFallasDashBoardInfo.iconosColor['W'] }}>{IndicaActualizando ? IndicaActualizando : cantidadPorVencer}</span>
                                    <a className="btn">
                                        <i className={EstatusReporteFallasDashBoardInfo.iconos['W']} style={{ color: EstatusReporteFallasDashBoardInfo.iconosColor['W'] }}></i> <span style={{ fontSize: "11px" }}> Terminado </span>  </a>
                                </li>
                                <li className={"dd-item dd3-item  dd3-content-ek    " + resaltar('V')} onClick={(e) => this.onClick("V", e)} data-id="213" style={{ cursor: "pointer" }}>
                                    <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusReporteFallasDashBoardInfo.iconosColor['V'] }}>{IndicaActualizando ? IndicaActualizando : cantidadVencidas}</span>
                                    <a className="btn">
                                        <i className={EstatusReporteFallasDashBoardInfo.iconos['V']} style={{ color: EstatusReporteFallasDashBoardInfo.iconosColor['V'] }}></i> <span style={{ fontSize: "11px" }}> Cancelado </span>  </a>
                                </li>
                                */}
                                {/*<li className={"dd-item dd3-item panel panel-main panel-sub10 dd3-content-ek      " + resaltar('SUS')} onClick={(e) => this.onClick("SUS", e)} data-id="212" style={{ cursor: "pointer" }}>
                                    <span className="badge badge-DEFAULT pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusReporteFallasDashBoardInfo.iconosColor['SUS'] }}>{IndicaActualizando ? IndicaActualizando : cantidadSuspendidas}</span>
                                    <a className="btn">
                                        <i className={EstatusReporteFallasDashBoardInfo.iconos['SUS']} ></i> <span style={{ fontSize: "11px" }}> Suspendidos </span>  </a>
                                </li>
                                <li className={"dd-item dd3-item  dd3-content-ek" + resaltar('ATE')} data-id="213" onClick={(e) => this.onClick("ATE", e)} style={{ cursor: "pointer" }}>
                                    <span className="badge badge-success pull-right " style={{ marginTop: "7px", background: EstatusReporteFallasDashBoardInfo.iconosColor['ATE'] }}>{IndicaActualizando ? IndicaActualizando : cantidadAtendidas}</span>
                                    <a className="btn">
                                        <i className={EstatusReporteFallasDashBoardInfo.iconos['ATE']} ></i><span style={{ fontSize: "11px" }}> Atendidos </span></a>
                                </li>*/}
                                <li className={"dd-item dd3-item  dd3-content-ek" + resaltar('DAB')} data-id="213" onClick={(e) => this.onClick("DAB", e)} style={{ cursor: "pointer" }}>
                                    <span className="badge badge-success pull-right " style={{ marginTop: "7px", background: EstatusReporteFallasDashBoardInfo.iconosColor['DAB'] }}>{IndicaActualizando ? IndicaActualizando : cantidadDictamenesActivos}</span>
                                    <a className="btn">
                                        <i className={EstatusReporteFallasDashBoardInfo.iconos['DAB']} style={{ color: EstatusReporteFallasDashBoardInfo.iconosColor['DAB'] }} ></i><span style={{ fontSize: "11px" }}> Diagnósticos </span></a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </Column>
        }
    });

    class PeriodoReporte extends React.Component<grid.IColumn, grid.IColumn>{
        render(): JSX.Element {
            let formGroupClass: string = "form-group";
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs} style={{ paddingLeft: "0px", paddingRight:"0px" }}>
                <FadeInColumn>
                    <div className={formGroupClass}>
                        <ddl.FullAniosDDL id="FullAnio" idFormSection={FORMULARIO_FILTRO} size={[12, 12, 12, 12]} />
                    </div>
                </FadeInColumn>
            </Column>
        };
    };


    export interface IBitacoraSPVButtonProps extends IButtonProps, page.IProps { }

    export let BitacoraSPVButton: any = global.connect(class extends React.Component<IBitacoraSPVButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static defaultProps: IBitacoraSPVButtonProps = {
            icon: "fas fa-atlas",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onButtonClick(): void {
            Forms.updateFormElement("BitacoraClienteSPV", "Cliente", null); 
            global.dispatchSuccessful("global-page-data", [], "BitacoraClienteSPV$Detalle");
            global.dispatchSuccessful("global-page-entity", [], "BitacoraClienteSPV$Ubicacion");
            global.dispatchSuccessful("global-page-entity", [], "BitacoraClienteSPV$Ubicacion$Detalle");
            global.dispatchSuccessful("global-page-entity", [], "BitacoraClienteSPV$Etapa");
            global.dispatchSuccessful("global-page-entity", { origen: "DashBoardFailureReporte" }, "BitacoraClienteSPV$Origen");
            Forms.updateFormElement("BitacoraClienteSPV", "VerComentarios", { ID: 2, Clave: "C", Nombre: "Ver la Información Completa del Cliente" }); 
            let modalCalen: any = $("#modalBitacoraClienteSPV");
            modalCalen.modal();
         };
         render(): JSX.Element {
             return <span>
                         <Button keyBtn={"btnSPVBitacoraCliente"} {...this.props} id="btn_bitacora" onClick={this.onButtonClick} />
                     </span>
        };
    });


    interface IFraccionamientosDashBoardFailureReportVDDLProps extends IDropDrownListProps {
        plazaSeleccionada?: global.DataElement;
    }

    export class FraccionamientosDashBoardFailureReport$DDL extends React.Component<IFraccionamientosDashBoardFailureReportVDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.DDLFRACCIONAMIENTOSDBFAILUREREPORT,
            plazaSeleccionada: Forms.getDataValue("Plazas", PAGE_ID, state) //Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
        });

        static defaultProps: IDropDrownListProps = {
            id: "FraccionamientosGeo",
            items: createDefaultStoreObject([]),
            label: "Fraccionamientos",
            helpLabel: "Seleccione el fraccionamiento.",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentWillReceiveProps(nextProps: IFraccionamientosDashBoardFailureReportVDDLProps, nextState: IFraccionamientosDashBoardFailureReportVDDLProps): void {
            if (global.hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada)) {
                if ((getData(nextProps.plazaSeleccionada).ID != getData(this.props.plazaSeleccionada).ID)) {
                    let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                    Forms.updateFormElement(FORMULARIO_FILTRO, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2 });
                    let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;
                    if (idPlaza != undefined) {
                        dispatchAsync("load::DDLFRACCIONAMIENTOSDBFAILUREREPORT", encodedURL);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IFraccionamientosDashBoardFailureReportVDDLProps, nextState: IFraccionamientosDashBoardFailureReportVDDLProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillMount(): any {
            Forms.updateFormElement(FORMULARIO_FILTRO, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
        };
        
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            ////////
            if (global.isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    };
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    };
                };
            };
            ///////
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} /*addNewItem={"SO"} addNewItemText={"Indique el Fraccionamiento"}  */ />;
        };
    };
    export const FraccionamientosDashBoardFailureReportDDL: any = ReactRedux.connect(FraccionamientosDashBoardFailureReport$DDL.props, null)(FraccionamientosDashBoardFailureReport$DDL);




};