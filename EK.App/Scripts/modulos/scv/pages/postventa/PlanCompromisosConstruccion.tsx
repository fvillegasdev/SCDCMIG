namespace EK.Modules.SCV.Pages.postventa.PlanCompromisosConstruccion {
    "use strict";

    const PAGE_ID: string = "PlanCompromisosConstruccion";

    const FORMULARIO_FILTRO: string = "FormularioFiltroDashBoardTickets";

    const GRID_PLAN: string = PAGE_ID + "$gridPlan";
    const DESARROLLOS_PLAN: string = PAGE_ID + "$desarrollosPlan";
    //const TOP_INCIDENCIAS: string = PAGE_ID + "$topIncidencias";
    //const TOP_CONTRATISTAS: string = PAGE_ID + "$topContratistas";
    //const TOP_PROTOTIPOS: string = PAGE_ID + "$topPrototipos";

    const MODAL_CHECKLIST_ID = PAGE_ID + "_ModalChecklist";

    const CHECKLIST_ITEMS_TODOS: any = "ChecklistEstandar$Todos";
    const CHECKLIST_ITEMS_TODOS_LOADDATA: any = "ChecklistEstandar$TodosLoadData";
    const CHECKLIST_ITEMS_SELECCIONADOS: any = "ChecklistEstandar$Seleccionados";
    const CHECKLIST_ITEMS_SELECCIONADOS_LOADDATA: any = "ChecklistEstandar$SeleccionadosLoadData";
    const CHECKLIST_ITEMS_SELECCIONADOS_PROGRESSBAR: any = CHECKLIST_ITEMS_SELECCIONADOS + '$PB';
    const BLOGPOST_SELECT_ENTITY: any = "BlogPost$SelectEntity";

    let checklistEntityId: number = null;

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [GRID_PLAN, DESARROLLOS_PLAN, CHECKLIST_ITEMS_TODOS, CHECKLIST_ITEMS_SELECCIONADOS]);


    const w: any = window;

    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
        if (f && f.IdPlazas === undefined) {
            f.IdPlazas = -2;
        }
    
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
                props.config.dispatchCatalogoBasePost("base/scv/PlanCompromisosConstruccion/GetBP/getGridDashBoard", { parametros: f }, GRID_PLAN);
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

                props.config.dispatchCatalogoBasePost("base/scv/PlanCompromisosConstruccion/GetBP/getDesarrolloDashBoard", { parametros: f }, DESARROLLOS_PLAN);
                props.config.dispatchCatalogoBasePost("base/scv/PlanCompromisosConstruccion/GetBP/getGridDashBoard", { parametros: f }, GRID_PLAN);
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
            //let data: DataElement = config.getCatalogo(GRID_PLAN);
            //if (isSuccessful(data)) {
            //    go("scv/pv/Tickets/" + item.ID);
            //    Forms.updateFormElement(config.idFilters, {});
            //    page.applyFilter(this.props, null, config.idFilters);
            //    //this.props.config.clearCatalogo(null, config.idFilters);

            //};
        };

        onSelectPlanificacion(item: any): void {
            //Estado para definir el uso del modal ---
            //dispatchSuccessful("load::SelectItemPlanCompromisosConstruccion", item);
            let desarrollo: string;
            desarrollo = item.Ubicacion.Desarrollo.Clave;
            let filtros: string = global.encodeObject({ clave: desarrollo });
            dispatchAsync("global-page-data", "base/scv/desarrollos/Get/GetAll/" + filtros, "SPVPlanificacionComponent$Desarrollo");
            dispatchSuccessful("global-page-data", config, "SPVPlanificacionComponent$config");
            let claveTipoAgenda: any = "FechaConstruccion";
            global.dispatchSuccessful("load::SPVPlanificacionComponentTipoAgenda", { TipoAgenda: claveTipoAgenda });

            let ubicacion = createSuccessfulStoreObject(item.Ubicacion);
            let filters: string = global.encodeObject({ Clave: item.Ubicacion.Clave });
            dispatchAsync("global-page-data", "base/scv/Ubicaciones/Get/GetAll/" + filters, "SPVPlanificacionComponent$GridPlanificacion");

            //Abrimos el Modal
            let modalObject: any = $("#SPVPlanificacionComponent");
            modalObject.modal();
            modalObject.css("height", "auto");
        };

        onViewPlanificacion(item: any): void {
            let claveTipoAgenda: any = "FechaConstruccion";
            global.dispatchSuccessful("load::SPVPlanificacionComponentTipoAgenda", { TipoAgenda: claveTipoAgenda });
            let filters: string = global.encodeObject({ TipoAgenda: claveTipoAgenda, IdEntidad: item.Ubicacion.ID, IdPadre: "0" });
            dispatchAsync("global-page-data", "base/scv/PlanificacionSPV/Get/GetViewPrincipalActs/" + filters, "SPVPlanificacionComponentViewTask$TasksHorizontal");

            //Abrimos el Modal
            let modalObject: any = $("#SPVPlanificacionComponentViewTask");
            modalObject.modal();
            modalObject.css("height", "auto");
        };

        onViewChecklist(item: any): void {
            console.log(item);
            const CHECKLIST_ITEMS_TODOS_LOADDATA: any = "ChecklistEstandar$TodosLoadData";
            const CHECKLIST_ITEMS_SELECCIONADOS_LOADDATA: any = "ChecklistEstandar$SeleccionadosLoadData";
            let claveTipoAgenda: any = "FechaConstruccion";
            checklistEntityId = item.IdUbicacion;

            global.dispatchSuccessful(
                "global-page-data",
                {
                    bp: 'CheckList',
                    parametros: { activos: 1, tipoChecklistClave: claveTipoAgenda }
                },
                CHECKLIST_ITEMS_TODOS_LOADDATA);


            global.dispatchSuccessful(
                "global-page-data",
                {
                    parametros: { activos: 1, OperacionEspecificaSP: 'FILTRAR_POR_ENTIDAD', modulo: 'spv', entityType: "spv$" + claveTipoAgenda, entityId: checklistEntityId }
                },
                CHECKLIST_ITEMS_SELECCIONADOS_LOADDATA);
            
            config.setState({ viewMode: false });

            ////Abrimos el Modal
            let modalObject: any = $("#" + MODAL_CHECKLIST_ID);
            modalObject.modal();
            modalObject.css("height", "auto");
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

            let formatPlanificacion: (data: any, row: any) => any = (data: any, row: any): any => {
                let w: any = window;
                let windowFn: string = "$$IDConstruccion";
                if (!w[windowFn]) {
                    w[windowFn] = (item: any, tipo: number) => {
                        if (tipo === 1) {
                            this.onSelectPlanificacion(item);
                        }
                        if (tipo === 2) {
                            this.onViewPlanificacion(item);
                        }
                        if (tipo === 3) {
                            this.onViewChecklist(item);
                        }
                    };
                };

                return <div style={{ textAlign: "center" }}>
                    <div className="btn btn-circle btn-xs" title="Planificar">
                        <a style={{}} data-id="data" onClick={() => window[windowFn](row, 1)} className="boton"><i className="fa fa-calendar"></i></a>
                    </div>
                    <div className="btn btn-circle btn-xs" title="Ver Planificación">
                        <a style={{}} data-id="data" onClick={() => window[windowFn](row, 2)} className="boton"><i className="fas fa-eye"></i></a>
                    </div>
                    <div className="btn btn-circle btn-xs" title="Checklist">
                        <a style={{}} data-id="data" onClick={() => window[windowFn](row, 3)} className="boton"><i className="fa fa-list"></i></a>
                    </div>
                </div>;
            };

            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addID({ width: "80px", title: "Planificacion", fixed: true })
                .add({ data: "IdExpediente", width: "80px", fixed: true })
                .addNombreCompletoCliente({ width: "300px", fixed: true })
                .add({ title: "Planificación", width: "120px", format: formatPlanificacion, fixed: true })
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
                        onRowDoubleClick={this.onRowDoubleClick}
                        items={createSuccessfulStoreObject([])}>
                    </page.SectionListExtended>
                    <PlanificacionComponentModal />
                    <PlanificacionComponentViewTaskModal />
                    <ModalChecklist />
                </Column>
            </Row>;
        };
    });




    interface IModalChecklistProps extends page.IProps {

    };

    const listHeaderTodos: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[10, 10, 10, 10]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    const listHeaderSeleccionados: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 7, 7]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    //***Modal para mostrar checklist ***//
    let ModalChecklist: any = global.connect(class extends React.Component<IModalChecklistProps, {}> {
        constructor(props: IModalChecklistProps) {
            super(props);
            this.onClickCommentsButton = this.onClickCommentsButton.bind(this);
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalChecklistProps = {};
        static props: any = (state: any) => ({

        });

        componentDidMount(): void {
        }

        componentWillReceiveProps(nextProps: IModalChecklistProps): any {
        };

        shouldComponentUpdate(nextProps: IModalChecklistProps, { }): boolean {
            return false;
        };

        componentDidUpdate(prevProps: IModalChecklistProps, prevState: IModalChecklistProps): any {
        };
        onClose(): void {
            config.setState({ viewMode: true });

            let modalObject: any = $("#" + MODAL_CHECKLIST_ID);
            modalObject.modal("hide");
        };
        onSave(): void {
            let items: any = global.getData(Forms.getValue(CHECKLIST_ITEMS_SELECCIONADOS, config.id));

            //Obtener y asignar valores de los progressbar
            items.forEach(function (value, index) {
                if (value.TotalAvance != 100) {//Validacion para no obtener el avance total de Forms cuando no se muestra el ProgressBar
                    let totalAvance: any = Forms.getValue(CHECKLIST_ITEMS_SELECCIONADOS_PROGRESSBAR + index, PAGE_ID);
                    let totalAvanceNumerico: number = totalAvance ? parseInt(totalAvance) : null;

                    if (value.ID >= 0) {
                        if (value.TotalAvance != totalAvanceNumerico && value._eliminado != true) {
                            value.TotalAvance = totalAvanceNumerico;
                            value._modificado = true;
                        }
                    }
                    else {
                        value.TotalAvance = totalAvanceNumerico;
                        delete value["_modificado"];
                    }
                }

               
            });

            console.log(items);

            dispatchAsyncPut("global-page-data", "base/SCV/ChecklistsControl/Get/SaveChecklists", items, CHECKLIST_ITEMS_SELECCIONADOS);
        };
        onChangeCheckbox(index: number): any {
            let customFunction: any = (e) => {
                let progressBarValue: number = e == true ? 100 : 0;
                Forms.updateFormElement(PAGE_ID, CHECKLIST_ITEMS_SELECCIONADOS_PROGRESSBAR + index, progressBarValue);
            };
            return customFunction;
        }
        onClickCommentsButton(index: number, item: any, config: any): any {
            let itemSelected: any = global.assign({}, {
                IDComponente: "QSPRcomments",
                ID: item.ID,
                Clave: item.Clave,
                Nombre: item.Nombre,
                TipoEntidad: {
                    Clave: 'svp$checklists',
                    Nombre: 'Checklists',
                }
            });

            global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY);

            config.setState({ viewMode: false });
        }
        onClickFilesButton(index: number, item: any, config: any): any {
            let itemSelected: any = global.assign({}, {
                IDComponente: "QSPRfiles",
                ID: item.ID,
                Clave: item.Clave,
                Nombre: item.Nombre,
                TipoEntidad: {
                    Clave: 'svp$checklists',
                    Nombre: 'Checklists',
                }
            });

            global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY);

            config.setState({ viewMode: false });
        }
        getCommentsButtton(index: number, item: any, config: any): JSX.Element {
            return item.ID >= 0 ? <button
                id={'ActionButton_' + index} key={"wbs-action-" + index}
                className="wbs-button" title={'Comentarios'}
                onClick={(e) => {
                    e.stopPropagation();
                    this.onClickCommentsButton(index, item, config)
                }}>
                <i className={'fas fal fa-comment'}></i>
                <span style={{ float: "right", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{item.TotalComentarios}</span>
            </button> : null;
        }
        getFilesButtton(index: number, item: any, config: any): JSX.Element {
            return item.ID >= 0 ? <button
                id={'ActionButton_Files_' + index} key={"wbs-action-Files-" + index}
                className="wbs-button" title={'Archivos'}
                onClick={(e) => {
                    e.stopPropagation();
                    this.onClickFilesButton(index, item, config)
                }}>
                <i className={'fas fal fa-file-alt'}></i>
                <span style={{ float: "right", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{item.TotalArchivos}</span>
            </button> : null;
        }
        removeSelectedItem: any = {
            icon: "fa fa-trash",
            titulo: "Eliminar",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                let element: DataElement = Forms.getValue(id, idParent);

                let withRemovedItem = element.removeItem(item);

                //Actualizar estado formulario
                Forms.updateFormElement(idParent, id, withRemovedItem);
            }
        }
        getProgressBarBGColor(index: number, item: any): any {
            let OKColor: string = '#85c680';
            let WarningColor: string = '#fbf647';
            let DangerColor: string = '#ed5565';
            let color: string;

            if (item.FechaCompromiso) {
                let now: any = new Date();
                let today: any = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                if (item.FechaCompromiso < today) {
                    color = DangerColor;
                }
                else {
                    color = OKColor;
                }
            }
            else {
                color = WarningColor;
            }
            return color;
        }
        getProgressBarTextColor(index: number, item: any): any {
            let color: string;

            if (item.FechaCompromiso) {
                color = '#ffffff';
            }
            else {
                color = '#989090';
            }
            return color;
        }
        footerPersonalized(): JSX.Element {
            return <div className="modal-footer">
                <div>
                    <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                    <Button size={[2, 2, 2, 2]} className="btn btn-md btn-editing" style={{ backgroundColor: "#8bc780", color: "#FFFFFF", float: "right" }} icon="fa fa-check" onClick={this.onSave.bind(this)}>Guardar</Button>
                </div>
            </div>
        }
        header(title: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{title}</h6>
                </span>
            </div>
        };
        render(): JSX.Element {
            return <div>
                <modal.Modal id={MODAL_CHECKLIST_ID}
                    header={this.header("Checklist")}
                    addDefaultCloseFooter={false}
                    footer={this.footerPersonalized()} >
                    <QuickSidePanelRight id="QSPRcomments" >
                        < EK.Modules.Kontrol.Pages.BlogPost.blogPost {...this.props} />
                    </QuickSidePanelRight>
                    <QuickSidePanelRight id="QSPRfiles" >
                        <QuickSidePanelArchivos />
                    </QuickSidePanelRight>
                    <Checklist
                        parent={config.id}
                        unselectedItems={CHECKLIST_ITEMS_TODOS}
                        selectedItems={CHECKLIST_ITEMS_SELECCIONADOS}
                        addSelectItemButton={true}
                        addRemoveSelectedItemButton={false}
                        getCustomRemoveButton={(index: number, item: any) => {
                            let idUsuario = global.getData(EK.Store.getState().global.app).Me.ID;
                            if ((item.TotalAvance == 0 || !item.TotalAvance) && (item.IdCreadoPor == idUsuario || !item.IdCreadoPor)) {
                                return <buttons.PopOver idParent={config.id} idForm={CHECKLIST_ITEMS_SELECCIONADOS} info={item} extraData={[this.removeSelectedItem]} />;
                            }
                            else {
                                return null;
                            }
                        }}
                        showUnselectedItems={true}

                        unselectedItemsHeader={<Column size={[10, 10, 10, 10]} className="list-default-header">{"Nombre"}</Column>}
                        unselectedItemsFormatter={(index: number, item: any) => {
                            return <Column size={[10, 10, 10, 10]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>;
                        }}
                        selectedItemsHeader={
                            [
                                <Column size={[10, 10, 6, 6]} key="nombre" className="list-default-header">{"Nombre"}</Column>,
                                <Column size={[10, 10, 2, 2]} key="compromiso" className="list-default-header">{"Compromiso"}</Column>,
                                <Column size={[10, 10, 2, 2]} key="avance" className="list-default-header">{"Avance"}</Column>,
                                <Column size={[10, 10, 1, 1]} key="estatus" className="list-default-header">{"Estatus"}</Column>,
                                <Column size={[10, 10, 1, 1]} key="revisado" className="list-default-header">{"Revisado"}</Column>,
                                <Column size={[10, 10, 1, 1]} key="botones" className="list-default-header">&nbsp;</Column>,
                                <Column size={[10, 10, 2, 2]} key="fechaculminado" className="list-default-header">{"Fecha Culminado"}</Column>,
                                <Column size={[10, 10, 2, 2]} key="culminadopor" className="list-default-header">{"Culminado Por"}</Column>,
                                <Column size={[10, 10, 2, 2]} key="fecharevisado" className="list-default-header">{"Fecha Revisado"}</Column>,
                                <Column size={[10, 10, 2, 2]} key="revisadopor" className="list-default-header">{"Revisado Por"}</Column>
                            ]
                        }
                        selectedItemsFormatter={(index: number, item: any) => {
                            return [
                                <Column size={[10, 10, 6, 6]} key={"clave" + index}>
                                    <span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{item.Nombre ? item.Nombre.trim() : ""}</span>
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"fechacompromiso" + index}>
                                    {(item.EstatusChecklist && item.EstatusChecklist.Clave == 'FINALIZADA')
                                        ? <span style={{ fontWeight: 300, fontSize: 10 }}>{global.formatDate(item.FechaCompromiso)}</span>
                                        : <DatePicker type="date" size={[6, 6, 6, 6]}
                                            property={CHECKLIST_ITEMS_SELECCIONADOS}
                                            value={item.FechaCompromiso} index={index} id={"FechaCompromiso"} idFormSection={config.id} />}
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"progressbar" + index}>
                                    {item.TotalAvance != 100 ?
                                        <div>
                                            {item.IdFlujoAutorizacion ? <i className="fa fa-random" aria-hidden="true" style={{ position: 'absolute', marginTop: '17px', marginLeft: '-3px' }}></i> : null}
                                            <EK.Modules.SGP.Pages.Tareas.ProgressBarSgp {...config} viewMode={false} showTitle={false}
                                                style={{ paddingLeft: '7px', paddingRight: '0px' }}
                                                id={CHECKLIST_ITEMS_SELECCIONADOS_PROGRESSBAR + index}
                                                value={item.Culminado == true ? 100 : item.TotalAvance}
                                                minValue={0} maxValue={100} size={[12, 12, 12, 12]}
                                                backgroundBar={this.getProgressBarBGColor(index, item)}
                                                colorText={this.getProgressBarTextColor(index, item)} />
                                        </div>
                                        : 
                                        <div id="" className="form-group" style={{ marginLeft: "5%", minHeight: "20px", paddingTop: "2px", display: "block", textAlign: "left" }}>
                                            <div style={{ width: "80%", height: "80%", position: "relative", marginLeft: "4px" }} >
                                                {item.IdFlujoAutorizacion ? <i className="fa fa-random" aria-hidden="true" style={{ position: 'absolute', marginTop: '-3px', marginLeft: '-14px' }}></i> : null}
                                                &nbsp;
                                                <span style={{ width: "80%", verticalAlign: "revert", paddingBottom: "0px", height: "7px" }}>
                                                    <span className="ek10-sgp-progress-bar-small-content" style={{ height: "inherit" }}   ></span>
                                                    <span className="ek10-sgp-progress-bar-small-advance" style={{ width: item.TotalAvance+'%', height: "inherit", backgroundColor: this.getProgressBarBGColor(index, item) }}></span>
                                                </span>
                                                {item.TotalAvance ? <div style={{ position: 'absolute', marginLeft: "42%", marginTop: "-8px" }}>{item.TotalAvance} %</div> : null}
                                            </div>
                                        </div> }
                                </Column>,
                                <Column size={[10, 10, 1, 1]} className="listItem-default-item" key={"estatusChecklist" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{item.EstatusChecklist ? item.EstatusChecklist.Nombre : ""}</span>
                                </Column>,
                                <Column size={[10, 10, 1, 1]} className="listItem-default-item" key={"revisado" + index}>
                                    {EK.UX.Labels.ok(item.Revisado)}
                                </Column>,
                                <Column size={[10, 10, 1, 1]} key={"botones" + index}>
                                    {this.getCommentsButtton(index, item, config)}
                                    {this.getFilesButtton(index, item, config)}
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"fechaculminado" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{global.formatDate(item.FechaCulminado)}</span>
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"culminadopor" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{item.CulminadoPor ? item.CulminadoPor.Nombre : ''}</span>
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"fecharevisado" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{global.formatDate(item.FechaRevisado)}</span>
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"revisadopor" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{item.RevisadoPor ? item.RevisadoPor.Nombre : ''}</span>
                                </Column>
                            ];
                        }}
                        onSelectItemValidation={(selectedItems: any, item: any) => {
                            let claveDuplicada: boolean = false;
                            selectedItems.forEach(function (val) {
                                if (val._eliminado != true && val.Clave === item.Clave) {
                                    claveDuplicada = true;
                                }
                            });

                            if (claveDuplicada) {
                                EK.Global.info("El elemento ya se encuentra seleccionado");
                            }

                            return !claveDuplicada;
                        }}
                        onSelectItemConversion={(item: any, newItem: any) => {
                            newItem.Clave = item.Clave;
                            newItem.Nombre = item.Nombre;
                            newItem.IdChecklist = item.ID;
                            newItem.TotalAvance = 0;
                            newItem.IdFlujoAutorizacion = item.IdFlujoAutorizacion;
                            newItem.FlujoAutorizacion = item.FlujoAutorizacion;
                            newItem.Modulo = "spv";
                            newItem.EntityType = "spv$" + "FechaConstruccion";
                            newItem.EntityId = checklistEntityId;
                            return newItem;
                        }}
                    />

                </modal.Modal>
            </div>

        }
    });

    let QuickSidePanelArchivos: any = global.connect(class extends React.Component<IQuickSidePanelRight, IQuickSidePanelRight> {
        constructor(props: IQuickSidePanelRight) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entity = state.global["catalogo$" + BLOGPOST_SELECT_ENTITY];
            return retValue;
        };
        shouldComponentUpdate(nextProps: IQuickSidePanelRight, { }): boolean {
            return global.hasChanged(this.props.entity, nextProps.entity);
        };

        render(): JSX.Element {
            let entity: any = getData(this.props.entity);
            if (!entity.ID) {
                return null;
            }

            let idEntity: number = entity.ID ? entity.ID : 0;
            let claveEntityType: number = entity.TipoEntidad.Clave ? entity.TipoEntidad.Clave : 0;

            return <KontrolFileManager title="Archivos" modulo={this.props.config.modulo} viewMode={false} multiple={true} entity={global.createSuccessfulStoreObject({ ID: idEntity })} entityType={global.createSuccessfulStoreObject([claveEntityType].join(""))} />
        };
    });




};