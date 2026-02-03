namespace EK.Modules.SCV.Pages.postventa.PlanCompromisosEntrega{
    "use strict";

    const PAGE_ID: string = "PlanCompromisosEntrega";

    const FORMULARIO_FILTRO: string = "FormularioFiltroDashBoardTickets";

    const GRID_PLAN: string = PAGE_ID + "$gridPlan";
    const DESARROLLOS_PLAN: string = PAGE_ID + "$desarrollosPlan";
    //const TOP_INCIDENCIAS: string = PAGE_ID + "$topIncidencias";
    //const TOP_CONTRATISTAS: string = PAGE_ID + "$topContratistas";
    //const TOP_PROTOTIPOS: string = PAGE_ID + "$topPrototipos";


    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [GRID_PLAN, DESARROLLOS_PLAN]);


    const w: any = window;

    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
        if (f && f.IdDesarrollos === undefined) {
            //props.config.setState({ clasificadorConfigurado: false, mensajeError: "No existen desarrollos para la Plaza seleccionada" }, config.id + "$filters");
            //EK.Global.info("No existen desarrollos para la Plaza seleccionada");
            //global.dispatchSuccessful("global-page-data", [], DESARROLLOS_PLAN);
            //global.dispatchSuccessful("global-page-data", [], GRID_PLAN);
            ////global.dispatchSuccessful("global-page-data", [], TOP_INCIDENCIAS);
            ////global.dispatchSuccessful("global-page-data", [], TOP_CONTRATISTAS);
            ////global.dispatchSuccessful("global-page-data", [], TOP_PROTOTIPOS);

            ////Forms.updateFormElement(config.idFilters, "Meses", { ID: (new Date().getMonth() + 1) });
            f.IdDesarrollos = -2;
            //return;
        }

        //if (f && f.IdPrototipos === undefined) {
        //    props.config.setState({ clasificadorConfigurado: false, mensajeError: "No existen prototipos para el Desarrollo seleccionado" }, config.id + "$filters");
        //    EK.Global.info("No existen prototipos para el Desarrollo seleccionado");
        //    global.dispatchSuccessful("global-page-data", [], USUARIOS_TICKETS);
        //    global.dispatchSuccessful("global-page-data", [], GRID_TICKETS);
        //    //global.dispatchSuccessful("global-page-data", [], TOP_INCIDENCIAS);
        //    //global.dispatchSuccessful("global-page-data", [], TOP_CONTRATISTAS);
        //    //global.dispatchSuccessful("global-page-data", [], TOP_PROTOTIPOS);
        //    return;
        //}

        //if ((f && f.IdPlaza && f.IdPlazas === -3) || (f && f.IdDesarrollos && f.IdDesarrollos === -3) || (f && f.IdPrototipos && f.IdPrototipos === -3)) {

        //    let errorGenerado: any;

        //    if (f.IdPlazas === -3) {
        //        errorGenerado = "EL clasificador de Plazas no se encuentra configurado";
        //    } else if (f.IdDesarrollos === -3) {
        //        errorGenerado = "EL clasificador de Desarrollos no se encuentra configurado";
        //    } else if (f.IdPrototipos === -3) {
        //        errorGenerado = "Desarrollo sin prototipos configurados";
        //    } else {
        //        errorGenerado = "Error";
        //    }
        //     props.config.setState({ clasificadorConfigurado: false, mensajeError: errorGenerado }, config.id + "$filters");
        //    EK.Global.info(errorGenerado);
        //} else {
        switch (type) {
            case "GRID_COMPROMISO":
                props.config.dispatchCatalogoBasePost("base/scv/PlanCompromisosEntrega/GetBP/getGridDashBoard", { parametros: f }, GRID_PLAN);
                //props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopIncidencias", { parametros: f }, TOP_INCIDENCIAS);
                //props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopContratistas", { parametros: f }, TOP_CONTRATISTAS);
                //props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopPrototipos", { parametros: f }, TOP_PROTOTIPOS);
                break;
            default:
                if (f === null || f === undefined) {
                    f = {};

                    f["IdPlazas"] = -2;
                    f["IdDesarrollos"] = -2;
                    //f["IdPrototipos"] = -2;
                    //f["IdFullAnio"] = new Date().getFullYear();
                    //f["IdMeses"] = new Date().getMonth() + 1 ;
                    //f["IdEstatusTickets"] = -2;
                    //f["IdOrigenTickets"] = -2;
                    //f["IdUsuarioSeleccionado"] = -2;
                    //Forms.updateFormElement(config.idFilters, "Meses", { ID: (f["IdMeses"]) });
                    //Forms.updateFormElement(config.idFilters, "UsuarioSeleccionado", { ID: -2 });


                }
                //f["IdUsuarioSeleccionado"] = -2;
                //Forms.updateFormElement(config.idFilters, "UsuarioSeleccionado", { ID: -2 });

                props.config.dispatchCatalogoBasePost("base/scv/PlanCompromisosEntrega/GetBP/getDesarrolloDashBoard", { parametros: f }, DESARROLLOS_PLAN);
                props.config.dispatchCatalogoBasePost("base/scv/PlanCompromisosEntrega/GetBP/getGridDashBoard", { parametros: f }, GRID_PLAN);
                //props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopIncidencias", { parametros: f }, TOP_INCIDENCIAS);
                //props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopContratistas", { parametros: f }, TOP_CONTRATISTAS);
                //props.config.dispatchCatalogoBasePost("base/scv/Tickets/GetBP/getTopPrototipos", { parametros: f }, TOP_PROTOTIPOS);

                break;

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

    export const formatEstatusReporte: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        let retValue: string = "";
        if (data && data.Clave) {
            if (data.Clave === "T") {
                retValue = "<span class='badge bg-green-jungle bg-font-green-jungle' style='padding: 4px 15px 4px; height: 100%;'>" + data.Nombre + "</span>";
            } else if (data.Clave === "P") {
                retValue = "<span class='badge bg-green-jungle bg-font-green-jungle' style='padding: 4px 15px 4px; height: 100%;'>" + data.Nombre + "</span>";
            } else {
                retValue = "<span class='badge badge-info' style='padding: 4px 15px 4px; height: 100%;'>" + data.Nombre + "</span>";
            }
        }
        return "<div style='text-align: center;'>" + retValue + "</div>";
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
            //Forms.updateFormElement(config.idFilters, "Meses", { ID: (new Date().getMonth() + 1) });
            // Forms.updateFormElement(config.id + "$filters", "Meses", );
        };



        componentWillReceiveProps(nextProps: IDashBoardTickets, { }): any { };

        onNew(item: any, props: page.IProps): void {

            Forms.updateFormElement(config.idFilters, {});

            //page.applyFilter(global.pageProps(this.state), null, config.idFilters);

            //global.go("scv/pv/Tickets/id?nuevo");
        };


        onClick(btn: any, input: any, props: select.ISelectProps): void {
            let item: any = Forms.getValue("ReporteBuscador", config.id);
            if (item && item.ID > 0) {
                //go("scv/pv/Tickets/" + item.ID, false);
                //page.applyFilter(this.props, null, config.idFilters);
                //this.props.config.clearCatalogo(null, config.idFilters);
            };
        };

        render(): JSX.Element {
            let messages: JSX.Element[] = [];
            let ml: any = config.getML();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={onPageFilter} onNew={this.onNew.bind(this)}>
                <page.Filters collapsed={true}  >
                    <PlazasClasificadorFilterDDL size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />


                </page.Filters>

                <Row style={{ marginTop: "8px" }} >
                    <Column size={[12, 12, 12, 12]}  >
                        <UsuariosTickets />
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
    let UsuariosTickets: any = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.data = state.global["catalogo$" + DESARROLLOS_PLAN];
            //
            return retValue;
        };

        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        onClickElementHorizontal(item: any): void {
            let etapa: number = null;
            let action: number = item._action;

            //if (action === undefined) {
            //    Forms.updateFormElement(config.idFilters, "Desarrollos", { ID: -2 });
            //} else {
            //    if (action > 0) {
            //        Forms.updateFormElement(config.idFilters, "Desarrollos", { ID: action });
            //    };
            //}
            Forms.updateFormElement(config.idFilters, "IdDesarrollos", item.ID);
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(props, null, "GRID_COMPROMISO");
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
                                            tipoPresentacion={10} />
                                    }
                                </Column>
                            </Row>
                        </div>
                    </div>
                </Column>
            </Row>;
        }
    });

    export let VistaTickets: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);

        }

        onRowDoubleClick(item: any): any {
            let data: DataElement = config.getCatalogo(GRID_PLAN);
            //if (isSuccessful(data)) {
            //    go("scv/pv/Tickets/" + item.ID);
            //    Forms.updateFormElement(config.idFilters, {});
            //    page.applyFilter(this.props, null, config.idFilters);
            //    //this.props.config.clearCatalogo(null, config.idFilters);

            //};
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
            let retValue: any;
            let formatedLabel: (data: any, row: any) => any = (data: any, row: any): any => {

                
                if (row.Ubicacion.Desarrollo && row.Ubicacion.Desarrollo.IdGrupoEntrega) {
                    //retValue = <div><span className="badge badge-success" style={{ marginRight: 5, background: "#36c6d3" }}>{row.TotalResponsables}</span> <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}><span className="path1"></span><span className="path2"></span></span></div>  ;
                    retValue = <div> <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}><span className="path1"></span><span className="path2"></span></span></div>;
                }
                
                return <div key={"estatus_" + row.ID}>
                    <div style={{ float: "left" }}>{(retValue)}</div>
                </div>;
            };

            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addID({ width: "80px", title: "Planificacion", fixed: true })
                .add({ data: "IdExpediente", width: "80px", fixed: true })
                .addNombreCompletoCliente({ width: "300px", fixed: true })
                .add({ data: "Ubicacion.Plaza.Nombre", title: "Plaza", width: "150px" })
                .add({ data: "Ubicacion.Desarrollo.Nombre", title: "Desarrollo", width: "150px" })
                .add({ data: "Ubicacion.Prototipo.Clave", title: "Prototipo", width: "150px" })
                .add({ data: "Ubicacion.ClaveFormato", title: "Ubicación", width: "150px" })
                .add({ data: "Etapa.Nombre", title: "Etapa", width: "150px" })
                .addDateFormat({ data: "FechaInicio", title: "Fecha Inicio Etapa", width: "150px" })
                .add({ data: "DiasTranscurridos", title: "Dias Transcurridos", width: "100px" })

                .add({ data: "Responsables", title: "Grupo Responsable",width: "200px", format: formatedLabel })






            return <Row>
                <Column>
                    <page.SectionListExtended
                        id={GRID_PLAN}
                        parent={config.id}
                        icon="fa fa-table"
                        level={1}
                        onSave={null}
                        dtConfig={dtConfig}
                        hideNewButton={true}
                        size={[12, 12, 12, 12]}
                        readonly={true}
                        items={createSuccessfulStoreObject([])}>
                       
                    </page.SectionListExtended>

                </Column>
            </Row>;
        };
    });



};