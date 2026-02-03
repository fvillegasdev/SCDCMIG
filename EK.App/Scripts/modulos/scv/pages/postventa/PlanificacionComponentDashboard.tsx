// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.postventa.SPVPlanificacionComponentDashboard {
    "use strict";

    const PAGE_ID: string = "SPVPlanificacionDashboard";
    const SECTION_GRID: string = PAGE_ID + "$SectionGrid";
    const SECTION_ACTIVIDADES: string = PAGE_ID + "$SectionActividades";
    const SECTION_CALENDARIO_ID: string = PAGE_ID + "$SectionCalendar";
    const DASHBOARD_CALENDAR_ID = "AgendaSPVPlanificacionDashboard";


    //const RECURSO_SELECCIONADO = "SPVPlanificacionComponent$RecursoSeleccionado";
    const TIPOAGENDA_STATE = "SPVPlanificacionComponentTipoAgenda";
    const CALENDAR_STATE_DASHBOARD = "AgendaSPVPlanificacionCalendarDashboard";
    const RECURSOSPROGRAMADOS_STATE = "RECURSOSPROGRAMADOSSPVDASHBOARDPLAN";


    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [SECTION_GRID]);
    const w: any = window;

    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
        if (f && f != null) {
            f.IdDesarrollos === -2 ? f.IdDesarrollos = 0 : f.IdDesarrollos;
            f.IdEstatusPlanificacionDet === -2 ? f.IdEstatusPlanificacionDet = 0 : f.IdEstatusPlanificacionDet;
            f.IdMeses === -2 ? f.IdMeses = 0 : f.IdMeses;
            f.IdFullAnio === -2 ? f.IdFullAnio = 0 : f.IdFullAnio;
            f.IdPlazas === -2 ? f.IdPlazas = 0 : f.IdPlazas;
            f.IdPrototipos === -2 ? f.IdPrototipos = 0 : f.IdPrototipos;
            f.IdRecurso === -2 ? f.IdRecurso = 0 : f.IdRecurso;
            f.IdTipoTarea === -2 ? f.IdTipoTarea = 0 : f.IdTipoTarea;
        }
        if (type === undefined) {
            if (f && f != null) {
                f.IdRecurso = f.IdRecurso ? 0 : undefined;
            }
            dispatchAsyncPost("load::" + RECURSOSPROGRAMADOS_STATE, "base/scv/PlanificacionSPV/GetBP/GetRecursosProgramados/", { parametros: f });
        }
        props.config.dispatchCatalogoBasePost("base/scv/PlanificacionSPV/GetBP/GetPlanificacionSPVDetalle", { parametros: f }, SECTION_GRID);
        dispatchAsyncPost("load::" + CALENDAR_STATE_DASHBOARD, "base/scv/PlanificacionSPV/GetBP/GetPlanificacionCalendar/", { parametros: f });
    };

    interface IView extends page.IProps {
    };

    interface IIViewState {
    };

    export const Vista: any = global.connect(class extends React.Component<IView, IIViewState>{

        constructor(props: IView) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });

        componentDidMount(): void {
        };


        componentWillReceiveProps(nextProps: IView, { }): any { };

        onNew(item: any, props: page.IProps): void {
        };

        onClick(btn: any, input: any, props: select.ISelectProps): void {
        };

        render(): JSX.Element {
            let ml: any = config.getML();
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={onPageFilter} onNew={this.onNew.bind(this)}>
                <page.Filters collapsed={true}>
                    <ddl.FullAniosDDL id="FullAnio" size={[12, 12, 2, 2]} />
                    <ddl.MesesDDL id="Meses" size={[12, 12, 3, 3]} style={{ float: "right" }} required={true} addNewItem={"VT"} validations={[validations.required()]} />
                    <ddl.TipoAgendaDDL id="TipoTarea" size={[12, 12, 4, 4]} addNewItem={"VT"} />
                    <PlazasClasificadorFilterDDL size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                    <ddl.DesarrollosClasificadorFilterDDL size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                    <ddl.PrototiposClasificadorFilterDDL size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                </page.Filters>

                <Row style={{ marginTop: "8px" }} >
                    <Column size={[12, 12, 12, 12]}  >
                        <RecursosProgramados />
                    </Column>
                </Row>
                <div className="portlet light bordered  ek-sombra" style={{ padding: 0 }}>
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <Tabs/>
                        </Column>
                    </Row>
                </div>
                <PlanificacionComponentAtencionModal />
            </page.Main>
        }
    });

    interface ITabProps extends page.IProps {
    };

    let Tabs: any = global.connect(class extends React.Component<ITabProps, ITabProps> {
        static props: any = (state: any) => ({
        });
        componentWillMount(): void {
        };
        onClose(): void {
        };
        componentDidUpdate(prevProps: ITabProps, prevState: ITabProps): any {
        };
        componentWillReceiveProps(nextProps: ITabProps): void {
        };
        render(): JSX.Element {
            return <div className="tabbable-line">
                <ul className="nav nav-tabs ">
                    <li id="tab1" className="active">
                        <a href="#tab_DASHBOARD1" data-toggle="tab" aria-expanded="true"> Calendario </a>
                    </li>
                    <li id="tab2" className="">
                        <a href="#tab_DASHBOARD2" data-toggle="tab" aria-expanded="false"> Lista </a>
                    </li>
                    <li id="tab3" className="">
                        <a href="#tab_DASHBOARD3" data-toggle="tab" aria-expanded="false"> Gantt </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="tab_DASHBOARD1">
                        <ViewCalendar />
                    </div>
                    <div className="tab-pane" id="tab_DASHBOARD2">
                        <VistaTareasGrid/>
                    </div>
                    <div className="tab-pane" id="tab_DASHBOARD3">

                    </div>
                </div>
            </div>;
        };
    });

    interface IViewCalendarProps extends page.IProps {
        recursoSeleccionado?: global.DataElement;
        actividades?: global.DataElement;
        updatedActivitiesForm?: EditForm;
        tipoAgenda?: EditForm;
    };


    let ViewCalendar: any = global.connect(class extends React.Component<IViewCalendarProps, IViewCalendarProps> {
        constructor(props: IViewCalendarProps) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            //retValue.recursoSeleccionado = state.global[RECURSO_SELECCIONADO];
            retValue.tipoAgenda = getData(state.global[TIPOAGENDA_STATE]).TipoAgenda;
            return retValue;
        };

        //shouldComponentUpdate(nextProps: IViewCalendarProps, { }): boolean {
        //    return hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado);
        //};

        onClickEventProp(calEvent: any, jsEvent: any, view: any): any {
            let state: any = EK.Store.getState();
            let IdPlanificacionDet: any = calEvent.id;
            let IdPlanificacion: number = 0;
            let events: any = state.global["catalogo$" + SECTION_GRID];
            if (events.data && events.data.length > 0) {
                events.data.forEach((value: any, index: number) => {
                    if (value.ID === IdPlanificacionDet) {
                        IdPlanificacion = value.IdPlanificacion;
                        let parametros: string = global.encodeObject({ IdPlanificacion: IdPlanificacion });
                        dispatchAsync("global-page-data", "base/scv/PlanificacionSPV/Get/GetPlanificacionSPVDetalle/" + parametros, "SPVPlanificacionComponentAtencion$listActividades");
                        let filters: string = global.encodeObject({ Clave: value.Ubicacion.Clave });
                        dispatchAsync("global-page-data", "base/scv/Ubicaciones/Get/GetAll/" + filters, "SPVPlanificacionComponentAtencion$GridUbicacion");
                    }
                });
            }            
            //Abrimos el Modal
            dispatchSuccessful("global-page-data", config, "SPVPlanificacionComponentAtencion$config");
            let modalObject: any = $("#SPVPlanificacionComponentAtencion");
            modalObject.modal();
            modalObject.css("height", "auto");
        };

        onClickSelectProp(startDate: any, endDate: any, jsEvent: any, view: any): any {
        };


        render(): JSX.Element {
            let minTime = "07:00:00";
            let maxTime = "20:00:00";
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={SECTION_CALENDARIO_ID}
                    parent={PAGE_ID}
                    title={"Planificación"}
                    level={2}
                    icon="fa fa-info-circle" collapsed={false} >
                    <calendar.GlobalSPVPlanificacionDashboard
                        id={DASHBOARD_CALENDAR_ID}
                        idForm={PAGE_ID}
                        minTime={minTime}
                        maxTime={maxTime}
                        onEventClick={this.onClickEventProp}
                        onSelect={this.onClickSelectProp}
                    />
                </page.OptionSection>
            </Column>
        };
    });


    let RecursosProgramados: any = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.data = state.global[RECURSOSPROGRAMADOS_STATE];
            return retValue;
        };

        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        onClickElementHorizontal(item: any): void {
            let action: any = item._action;
            if (action === undefined) {
                Forms.updateFormElement(config.idFilters, "ClaveEstatusDashboard", "TODOS" );
            } else {
                Forms.updateFormElement(config.idFilters, "ClaveEstatusDashboard", action);
            }
            Forms.updateFormElement(config.idFilters, "Recurso", item);
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(props, null, "onClickElementHorizontal");
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.data)) {
                dispatchAsync("load::" + RECURSOSPROGRAMADOS_STATE, "base/scv/PlanificacionSPV/Get/GetRecursosProgramados/");
            };
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
                    let TotalCantidadTareaPorCon: number = 0;
                    let TotalCantidadTareaCom: number = 0;
                    let TotalCantidadTareaCancel: number = 0;
                    let TotalCantidadTareaDeten: number = 0;
                    let TotalCantidadTareaConfirm: number = 0;
                    let TotalCantidadActReprogramadas: number = 0;
                    let TotalCantidadActAtendidas: number = 0;
                    let TotalCantidadActEnProceso: number = 0;
                    let TotalCantidadActSuspendidas: number = 0;
                    let TotalCantidadActEnProcesoVencidas: number = 0;
                    let TotalCantidadActEnProcesoPorVencer: number = 0;
                    let TotalCantidadActEnProcesoATiempo: number = 0;

                    getData(this.props.data).forEach((value: any, index: number): any => {
                        TotalCantidadTareaPorCon += value.CantidadTareaPorCon;
                        TotalCantidadTareaCom += value.CantidadTareaCom;
                        TotalCantidadTareaCancel += value.CantidadTareaCancel;
                        TotalCantidadTareaDeten += value.CantidadTareaDeten;
                        TotalCantidadTareaConfirm += value.CantidadTareaConfirm;
                        TotalCantidadActReprogramadas += value.CantidadActReprogramadas;
                        TotalCantidadActAtendidas += value.CantidadActAtendidas;
                        TotalCantidadActSuspendidas += value.CantidadActSuspendidas;
                        TotalCantidadActEnProceso += value.CantidadActEnProceso;
                        TotalCantidadActEnProcesoVencidas += value.CantidadActEnProcesoVencidas;
                        TotalCantidadActEnProcesoPorVencer += value.CantidadActEnProcesoPorVencer;
                        TotalCantidadActEnProcesoATiempo += value.CantidadActEnProcesoATiempo;
                    });
                    nuevoItem["ID"] = -2;
                    nuevoItem["Clave"] = "TODOS";
                    nuevoItem["Nombre"] = "TODOS";
                    // nuevoItem["Fase"] = nuevoItemFase;
                    nuevoItem["CantidadActReprogramadas"] = TotalCantidadActReprogramadas;
                    nuevoItem["CantidadActAtendidas"] = TotalCantidadActAtendidas;
                    nuevoItem["CantidadActEnProceso"] = TotalCantidadActEnProceso;
                    nuevoItem["CantidadActSuspendidas"] = TotalCantidadActSuspendidas;
                    nuevoItem["CantidadActEnProcesoVencidas"] = TotalCantidadActEnProcesoVencidas;
                    nuevoItem["CantidadActEnProcesoPorVencer"] = TotalCantidadActEnProcesoPorVencer;
                    nuevoItem["CantidadActEnProcesoATiempo"] = TotalCantidadActEnProcesoATiempo;

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
                                            tipoPresentacion={12} />
                                    }
                                </Column>
                            </Row>
                        </div>
                    </div>
                </Column>
            </Row>;
        }
    });



    let VistaTareasGrid: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);

        }

        onRowDoubleClick(item: any): any {
        };

        onViewPlanificacion(item: any): void {
        };

        render(): JSX.Element {
            let ml: any = config.getML();
            let retValue: any;

            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "TipoTarea.Nombre", title: "Tipo Agenda", width: "150px", fixed: true })
                .add({ data: "IdPlanificacion", width: "100px", fixed: true, title: "Tarea ID" })
                .add({ data: "Tarea.Nombre", title: "Tarea", width: "150px", fixed: true })
                .addID({ title: "Actividad ID", width: "120px", fixed: true })
                .addDateFormat({ data: "Fecha", width: "150px", title: "Fecha" })
                .add({ data: "DTStart", title: "Hora Inicio", width: "100px", format: global.formatTimePlanificacionSPV })
                .add({ data: "DTEnd", title: "Hora Fin", width: "100px", format: global.formatTimePlanificacionSPV })
                .add({ data: "Recurso.Nombre", title: "Asignado a", width: "150px" })
                .add({ data: "Ubicacion.ClaveCorta", title: "Ubicación", width: "150px" })
                .add({ data: "Ubicacion.TipoUbicacion.Nombre", title: "Tipo Ubicación", width: "150px" })
                .add({ data: "Ubicacion.Plaza.Nombre", title: "Plaza", width: "150px" })
                .add({ data: "Ubicacion.Desarrollo.Nombre", title: "Desarrollo", width: "150px" })


            return <Row>
                <Column>
                    <page.SectionListExtended
                        id={SECTION_GRID}
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
                </Column>
            </Row>;
        };
    });


};