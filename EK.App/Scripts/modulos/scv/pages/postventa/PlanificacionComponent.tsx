// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.postventa.SPVPlanificacionComponent {
    "use strict";
    const PAGE_ID = "SPVPlanificacionComponent";
    const DESARROLLO_ID = PAGE_ID + "$Desarrollo";
    const RECURSO_SELECCIONADO: string = PAGE_ID + "$RecursoSeleccionado";

    const SECTION_RESOURCES_ID = PAGE_ID + "$Resources";
    const SECTION_ACTIVIDADES_ID = PAGE_ID + "$Actividades";
    const SECTION_GRID_PLANIFICACION: string = PAGE_ID + "$GridPlanificacion";
    const SECTION_CALENDARIO_ID: string = PAGE_ID + "$Calendar";

    const CONFIGMODAL_ID = PAGE_ID + "$config";
    const PLANIFICACION_CALENDAR_ID = "AgendaSPVPlanificacionResource";
    const CALENDAR_STATE = "AgendaSPVPlanificacionCalendar";
    const CALENDAR_STATE_TEMP = "AgendaSPVPlanificacionCalendarTemp";
    const TIPOAGENDA_STATE = PAGE_ID + "TipoAgenda";

    const PLANIFICACION_NEW = PAGE_ID + "$New";

    const configModal: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [SECTION_RESOURCES_ID, SECTION_ACTIVIDADES_ID, SECTION_GRID_PLANIFICACION, SECTION_CALENDARIO_ID]);


    interface IPlanificacionComponentProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    export class PlanificacionComponentModalBase extends React.Component<IPlanificacionComponentProps, {}> {
        constructor(props: IPlanificacionComponentProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        componentWillMount() {
            global.dispatchSuccessful("global-page-data", [], DESARROLLO_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_RESOURCES_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_ACTIVIDADES_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_GRID_PLANIFICACION);
            global.dispatchSuccessful("global-page-data", [], SECTION_CALENDARIO_ID);
            global.dispatchSuccessful("global-page-data", [], RECURSO_SELECCIONADO);
            global.dispatchSuccessful("global-page-data", [], PLANIFICACION_CALENDAR_ID);
            global.dispatchSuccessful("global-page-data", [], PLANIFICACION_NEW);
        }

        componentWillUnmount() {
            global.dispatchSuccessful("global-page-data", [], DESARROLLO_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_RESOURCES_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_ACTIVIDADES_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_GRID_PLANIFICACION);
            global.dispatchSuccessful("global-page-data", [], SECTION_CALENDARIO_ID);
            global.dispatchSuccessful("global-page-data", [], RECURSO_SELECCIONADO);
            global.dispatchSuccessful("global-page-data", [], PLANIFICACION_CALENDAR_ID);
            global.dispatchSuccessful("global-page-data", [], PLANIFICACION_NEW);
        }

        componentDidMount(): void {
        };

        render(): JSX.Element {
            return <Column
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalPlanificacion {...this.props} />
            </Column>
        }
    };

    interface IModalPlanificacionProps extends page.IProps {
        tipoAgenda?: any;
        configModal?: any;
        recursoSeleccionado?: global.DataElement;
        savePlanificacion?: global.DataElement;
    };

    //***Modal para mostrar la información de la Planificacion ***//
    let ModalPlanificacion: any = global.connect(class extends React.Component<IModalPlanificacionProps, {}> {
        constructor(props: IModalPlanificacionProps) {
            super(props);
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalPlanificacionProps = {};
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            configModal: state.global["catalogo$" + CONFIGMODAL_ID],
            recursoSeleccionado: state.global[RECURSO_SELECCIONADO],
            tipoAgenda: getData(state.global[TIPOAGENDA_STATE]).TipoAgenda,
            savePlanificacion: state.global["catalogo$" + PLANIFICACION_NEW],

        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerItem: (id: number): void => { }
        });

        componentWillReceiveProps(nextProps: IModalPlanificacionProps): any {
            if (global.hasChanged(this.props.configModal, nextProps.configModal)) {
                if (isSuccessful(nextProps.configModal)) {
                    let dataConfig: any = getData(nextProps.configModal);
                    global.setPageConfig({
                        id: dataConfig.id,
                        modulo: dataConfig.modulo,
                        slots: configModal.slots.concat(dataConfig.slots),
                        idML: dataConfig.idML
                    });
                }
            }
        };

        shouldComponentUpdate(nextProps: IModalPlanificacionProps, { }): boolean {
            return hasChanged(this.props.tipoAgenda, nextProps.tipoAgenda) ||
                hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado) ||
                hasChanged(this.props.savePlanificacion, nextProps.savePlanificacion);
        };

        componentDidUpdate(prevProps: IModalPlanificacionProps, prevState: IModalPlanificacionProps): any {
            if (this.props.savePlanificacion && wasUpdated(prevProps.savePlanificacion, this.props.savePlanificacion, false)) {
                let item: any = getData(prevProps.savePlanificacion);
                switch (item.Estado) {
                    case 4: // eliminado con exito
                        break;
                    default:
                        global.success("Información incorporada a la Planificación");
                        this.onClose();
                        break;
                }
            }
        };

        getActivitiesTareaConfig(): any {
            let retValues: any[] = [];
            let TipoAgenda: any = this.props.tipoAgenda;

            if (TipoAgenda === undefined) {
                TipoAgenda = "PlanCompromisoContruccion";
            }

            let activitiesValue: any[] = Forms.getValue(SECTION_ACTIVIDADES_ID, PAGE_ID);
            let activities: any[] = getData(activitiesValue);

            if (activities === undefined || activities.length <= 0 || activities === null) {
                global.warning("Capture una Planificación. Por favor intente nuevamente.");
                return;
            } else {
                activities.forEach((value: any, index: number) => {
                    let retValue: any = global.assign(value, {
                        Fecha: value.Fecha,
                        HoraInicio: value.HoraInicio,
                        HoraFin: value.HoraFin,
                        TipoAgenda: TipoAgenda
                    });
                    retValues.push(retValue);
                });
            };
            return retValues;
        };

        getResourcesTareaConfig(): any {
            let retValues: any[] = [];
            let TipoAgenda: any = this.props.tipoAgenda;
            let retValue: any;
            if (TipoAgenda === undefined) {
                TipoAgenda = "PlanCompromisoContruccion";
            }

            let resource: any;
            if(this.props.recursoSeleccionado) {
                resource = getData(this.props.recursoSeleccionado);
            }
            if (resource === undefined || resource === null) {
                global.warning("Seleccione un Responsable. Por favor intente nuevamente.");
                return;
            } else {
                retValue = global.assign({}, {
                    ID: resource.ID
                });
            };
            return retValue;
        };

        getPlanificacionConfig(): any {
            let retValues: any[] = [];
            let TipoAgenda: any = this.props.tipoAgenda;
            let retValue: any;
            if (TipoAgenda === undefined) {
                TipoAgenda = "PlanCompromisoContruccion";
            }

            let planificadoValue: any[] = Forms.getValue(SECTION_GRID_PLANIFICACION, PAGE_ID);
            let planificacion: any[] = getData(planificadoValue);

            if (planificacion === undefined || planificacion.length <= 0 || planificacion === null) {
                global.warning("Debe indicar un elemento a Planificar. Por favor intente nuevamente.");
                return;
            } else {
                planificacion.forEach((value: any, index: number) => {
                    let retValue: any = global.assign(value, {
                        ID: value.ID,
                        Clave: value.Clave,
                        Nombre: value.Nombre,
                    });
                    retValues.push(retValue);
                });
            };
            return retValues;
        };

        onSavePlanificacion(): void {
            if (!Forms.isValid(this.props.config.id)) {
                warning("verificar los campos obligatorios");
                return;
            }

            let tipoTarea: any;
            let tarea: any;
            let chkNotificacion: any;
            let chkConfirmacion: any;
            let chkRecordatorio: any;

            tipoTarea = Forms.getValue("TipoAgenda", this.props.config.id);
            tarea = Forms.getValue("Tarea", this.props.config.id);

            let tareacase: string = "PlanCompromisoContruccion";
            switch (tareacase) {
                case "EntregaVivienda":   // POSTVENTA - ENTREGA DE VIVIENDA
                    break;
                case "PlanCompromisoContruccion":
                    let TipoAgenda: any = this.props.tipoAgenda;
                    if (TipoAgenda === undefined) {
                        TipoAgenda = "PlanCompromisoContruccion";
                    }
                    let activities: any[] = this.getActivitiesTareaConfig();
                    let resources: any[] = this.getResourcesTareaConfig();
                    let planificado: any[] = this.getPlanificacionConfig();
                    if (activities === null || activities === undefined || activities.length === 0 || resources === null || resources === undefined || planificado === null || planificado === undefined) {
                        return;
                    };

                    let _item: EditForm = Forms.getForm(this.props.config.id);
                    let _model: any = _item
                        .addID()
                        .addString("TipoAgenda")
                        .addObject("Tarea")
                        .addBoolean("Confirmacion")
                        .addBoolean("NotificacionCorreo")
                        .addBoolean("Recordatorio")
                        .addVersion()
                        .toObject();

                    _model["Actividades"] = activities;
                    _model["Recurso"] = resources;
                    _model["TipoAgenda"] = TipoAgenda;
                    _model["Planificado"] = planificado;
                    global.dispatchAsyncPut("global-page-data", "base/scv/PlanificacionSPV/Get/Save", _model, PLANIFICACION_NEW);
                    break;

                default:
                    return null;
            }
        };
        onClose(): void {
            global.dispatchSuccessful("global-page-data", [], DESARROLLO_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_RESOURCES_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_ACTIVIDADES_ID);
            global.dispatchSuccessful("global-page-data", [], SECTION_GRID_PLANIFICACION);
            global.dispatchSuccessful("global-page-data", [], SECTION_CALENDARIO_ID);
            global.dispatchSuccessful("global-page-data", [], RECURSO_SELECCIONADO);
            global.dispatchSuccessful("global-page-data", [], PLANIFICACION_CALENDAR_ID);
            global.dispatchSuccessful("global-page-data", [], PLANIFICACION_NEW);
            let calendarState: any = getData(EK.Store.getState().global[CALENDAR_STATE]);
            calendarState.Events = [];
            global.dispatchSuccessful("load::" + CALENDAR_STATE, calendarState);

            let modalObject: any = $("#SPVPlanificacionComponent");
            modalObject.modal("hide");
        };

        footerPersonalized(): JSX.Element {
            let state: DataElement = this.props.config.getState();

            return <div className="modal-footer">
                {global.isUpdating(this.props.savePlanificacion) ?
                    <div>
                        <div style={{ position: "relative", float: "right", right: "119px" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} /></div>
                        <div style={{ float: "right" }}><button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button></div>
                    </div> :
                    <div>
                        {global.getData(state).viewMode === true ? <Button size={[2, 2, 2, 2]} className="btn btn-md btn-editing" style={{ backgroundColor: "#8bc780", color: "#FFFFFF" }} icon="fa fa-check" onClick={this.onSavePlanificacion.bind(this)}>Agregar Planificación</Button> : null}
                        <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                    </div>
                }
            </div>
        };
        header(title: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{title}</h6>
                </span>
            </div>
        };
        render(): JSX.Element {
            return <modal.Modal id={PAGE_ID} header={this.header("Planificación")} addDefaultCloseFooter={false} footer={this.footerPersonalized()} >
                <View tipoAgenda={this.props.tipoAgenda}/>
            </modal.Modal>
        }
    });

    interface IView extends page.IProps {
        tipoAgenda?: any;
    }
    let View: any = global.connect(class extends React.Component<IView, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoAgenda = state.global[TIPOAGENDA_STATE];
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});

        render(): JSX.Element {
            return <Row>
                <Column size={[12, 12, 3, 3]} style={{ marginTop: "40px" }}>
                    <ViewSPVGruposDetalle />
                    </Column>
                    <Column size={[12, 12, 9, 9]}>
                    <TabCalendarDetails  />
                    </Column>
                </Row>;
        }
    });

    interface IViewSPVGruposProps extends page.IProps {
        desarrollo?: global.DataElement;
        recursoSeleccionado?: global.DataElement;
        resources?: global.DataElement;
    };


    export let ViewSPVGruposDetalle: any = global.connect(class extends React.Component<IViewSPVGruposProps, IViewSPVGruposProps> {
        constructor(props: IViewSPVGruposProps) {
            super(props);
            this.onClickItem = this.onClickItem.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.desarrollo = state.global["catalogo$" + DESARROLLO_ID];
            retValue.resources = state.global["catalogo$" + SECTION_RESOURCES_ID];
            retValue.recursoSeleccionado = state.global[RECURSO_SELECCIONADO];
            return retValue;
        };

        shouldComponentUpdate(nextProps: IViewSPVGruposProps, { }): boolean {
            return hasChanged(this.props.desarrollo, nextProps.desarrollo) ||
                hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado);
        };

        componentWillReceiveProps(nextProps: IViewSPVGruposProps): any {
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo)) {
                if (isSuccessful(nextProps.desarrollo)) {
                    let idGrupoEntrega: any;
                    let entidadDesarrollo: any = global.getData(nextProps.desarrollo);
                    if (entidadDesarrollo) {
                        if (entidadDesarrollo.length >= 1) {
                            idGrupoEntrega = entidadDesarrollo[0].IdGrupoEntrega;
                        }
                    }
                    let parametros: string = global.encodeObject({ IdGrupo: idGrupoEntrega });
                    dispatchAsync("global-page-data", "base/scv/GruposUsuario/Get/GetGroupsDetailsUser/" + parametros, SECTION_RESOURCES_ID);
                }
            }
        };
            
        onClickItem(item: any) {
            let idGrupo: any = item.ID;
            global.dispatchSuccessful("load::" + RECURSO_SELECCIONADO, item);
            let items: any = EK.Store.getState().global["catalogo$" + SECTION_RESOURCES_ID];
            global.dispatchSuccessful("global-page-data", items.data, SECTION_RESOURCES_ID);
            $("#tab1").removeClass("active");
            $("#tab2").addClass(" active");
            $("#tab_1").removeClass("active");
            $("#tab_2").addClass(" active");
        };

        render(): JSX.Element {
            return <div >
                <page.SectionList
                    id={SECTION_RESOURCES_ID}
                    parent={PAGE_ID}
                    icon={"fa fa-cog"}
                    title={"Recursos"}
                    size={[12, 12, 12, 12]}
                    level={2}
                    horizontalScrolling={false}
                    onItemClick={this.onClickItem.bind(this)}
                    height={"420px"}
                    drawOddLine={true}
                    selectable={true}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    formatter={(index: number, item: any) => {
                        let itemSeleccionado: string = this.props.recursoSeleccionado && getData(this.props.recursoSeleccionado).Recurso.timestamp ? getData(this.props.recursoSeleccionado).Recurso.timestamp : "TODOS";
                        let estatusSeleccion: boolean = itemSeleccionado == item.Recurso.timestamp ? true : false;
                        let estatusClass: string = "";

                        if (estatusSeleccion == true) {
                            estatusClass += " selected";
                        }
                        return <div className={"listItem-default-item " + estatusClass}>
                            <Row style={{ padding: "0px 10px", overflow: "unset" }}>
                                <Column size={[3, 3, 3, 3]} className="">
                                    <div style={{ overflow: "unset" }}>
                                        {item.Recurso.FotosUsuarios === "" ?
                                            <div className="img-circle" style={{ background: "#1e7145", color: "white", width: "35px", height: "35px", float: "left", marginTop: "10px", marginLeft: "0px", position: "relative", zIndex: (300 + index), display: "inline-flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}   >
                                                <p>{"Foto"}</p>
                                            </div>
                                            :
                                            <img alt="" title={""} className="img-circle" src={item.Recurso.FotosUsuarios} style={{ background: "beige", width: "35px", height: "35px", float: "left", marginTop: "10px", marginLeft: "0px", position: "relative", zIndex: (300 + index), justifyContent: "center", alignItems: "center", textAlign: "center" }} />
                                        }
                                    </div>
                                </Column>
                                <Column size={[9, 9, 9, 9]}>
                                    <span className="" style={{ marginLeft: 0, color: "#3b328a" }}>{item.Recurso.Nombre}</span><br />
                                    <span className="" style={{ marginLeft: 0, float: "none", color: "#00b5fe" }}>{item.Recurso.Posicion}</span><br />
                                    <span className="far fa-envelope" style={{ marginLeft: 0, float: "none", marginRight: 0 }}>&nbsp;{item.Recurso.Email}</span>
                                </Column>
                            </Row>
                        </div>;
                    }}>
                </page.SectionList>
            </div>
        };
    });

    interface ITabProps extends page.IProps {
    };

    let TabCalendarDetails: any = global.connect(class extends React.Component<ITabProps, ITabProps> {
        static props: any = (state: any) => ({
        });
        componentWillMount(): void {
        };
        onClose(): void {
        };
        nuevoHorario(): void {
        };
        componentDidUpdate(prevProps: ITabProps, prevState: ITabProps): any {
        };
        equalDates(d1: Date, d2: Date): boolean {
            return true;
        };
        componentWillReceiveProps(nextProps: ITabProps): void {
        };
        render(): JSX.Element {
            return <div className="tabbable-line">
                <ul className="nav nav-tabs ">
                    <li id="tab1" className="active">
                        <a href="#tab_1" data-toggle="tab" aria-expanded="true"> Planificación </a>
                    </li>
                    <li id="tab2" className="">
                        <a href="#tab_2" data-toggle="tab" aria-expanded="false"> Calendario </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="tab_1">
                        <ViewCalendarDetails />
                    </div>
                    <div className="tab-pane" id="tab_2">
                        <div>
                            <Row style={{ marginLeft: "10px", marginRight: "10px", height: "340px", overflow: "overlay" }} >
                                <ViewCalendarPlanificacion />
                            </Row>
                        </div>
                    </div>
                </div>
            </div>;
        };
    });


    interface IViewCalendarProps extends page.IProps {
        recursoSeleccionado?: global.DataElement;
        actividades?: global.DataElement;
        calendarState?: any;
        applyValuesControl?: any;
        calendarStateTemp?: any;
        onClickEventProp?: (calEvent: any, jsEvent: any, view: any) => void;
        onClickSelectProp?: (startDate: any, endDate: any, jsEvent: any, view: any) => void;

    };
    export let ViewCalendarPlanificacion: any = global.connect(class extends React.Component<IViewCalendarProps, IViewCalendarProps> {
        constructor(props: IViewCalendarProps) {
            super(props);
            this.onClickEvent = this.onClickEvent.bind(this);
            this.onClickSelect = this.onClickSelect.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.recursoSeleccionado = state.global[RECURSO_SELECCIONADO];
            retValue.calendarState = state.global[CALENDAR_STATE];
            retValue.calendarStateTemp = state.global[CALENDAR_STATE_TEMP];
            retValue.actividades = state.global["catalogo$" + SECTION_ACTIVIDADES_ID];
            return retValue;
        };

        onClickEvent(calEvent: any, jsEvent: any, view: any): any {
            if (this.props.onClickEventProp) {
                this.props.onClickEventProp(calEvent, jsEvent, view);
            } else {
                this.onEventClick(calEvent, jsEvent, view);
            }
        };

        onClickSelect(startDate: any, endDate: any, jsEvent: any, view: any): any {
            if (this.props.onClickSelectProp) {
                this.props.onClickSelectProp(startDate, endDate, jsEvent, view);
            } else {
                this.onSelectEvent(startDate, endDate, jsEvent, view);
            }
        };

        componentWillReceiveProps(nextProps: IViewCalendarProps): void {
            if (nextProps.recursoSeleccionado) {
                if (hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado)) {
                    let recurso: any = getData(nextProps.recursoSeleccionado);
                    if (recurso && recurso !== undefined && recurso !== null) {
                        let parametros: any = { IdRecurso: recurso.ID };
                        dispatchAsync("load::" + CALENDAR_STATE_TEMP, "base/scv/PlanificacionSPV/Get/GetPlanificacionCalendar/" + global.encodeParameters(parametros));
                    }
                }
                if (hasChanged(this.props.calendarStateTemp, nextProps.calendarStateTemp)) {
                    let actividades: any = getData(this.props.actividades);
                    let recurso: any = getData(nextProps.recursoSeleccionado);
                    let calendarState: any = getData(nextProps.calendarStateTemp);
                    let events: any = calendarState.Events;
                    let temporal: any;
                    if (actividades && actividades != undefined && actividades.length > 0) {
                        temporal = actividades.filter(value => value.Recurso.ID === recurso.ID);
                    }
                    if (calendarState && calendarState.Events) {
                        if (temporal && temporal.length > 0) {
                            temporal.forEach((value: any, index: number) => {
                                if (value.Recurso.ID === recurso.ID) {
                                    let calendarEvent: any = this.getJSCalendarEvent(value.HoraInicio, value.HoraFin, events, actividades, value.IdEvent);
                                    events.push(calendarEvent);
                                }
                                calendarState.Events = events;
                            });
                        }
                        global.dispatchSuccessful("load::" + CALENDAR_STATE, calendarState);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IViewCalendarProps, { }): boolean {
            return hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado) ||
                hasChanged(this.props.calendarState, nextProps.calendarState);
        };

        componentDidUpdate(prevProps: IViewCalendarProps, prevState: IViewCalendarProps): any {
        };

        daysDiff(startDate: any, endDate: any) {
            let t2: any = new Date(endDate).getTime();
            let t1: any = new Date(startDate).getTime();
            return (t2 - t1) / (24 * 3600 * 1000);
        };

        getDateTimezone(startDate: any) {
            let fechaInicial: Date = new Date(startDate);
            let initDate: Date = new Date(fechaInicial.getTime() + (fechaInicial.getTimezoneOffset() * (1 * 60000)));
            return initDate;
        };

        validaciones(initDate: any, endDate: any, IdRecurso: number) {
            let state: any = EK.Store.getState();
            let retvalue: boolean = true;

            let fechaActual: Date = new Date();
            if (initDate.getTime() <= fechaActual.getTime()) {
                global.warning("Selección de fecha y hora no válida. Por favor intente nuevamente.");
                retvalue = false;
                return retvalue;
            }

            //if (!this.props.recursoSeleccionado) {
            //    global.warning("Seleccione un Recurso. Por favor intente nuevamente.");
            //    retvalue = false;
            //    return retvalue;
            //}

            let actividades: any = getData(this.props.actividades);
            let vControl: number = 0;
            if (actividades && actividades.length > 0) {
                actividades.forEach((value: any, index: number) => {
                    retvalue = (initDate.getTime() <= value.HoraInicio.getTime() && endDate.getTime() <= value.HoraInicio.getTime()) || (initDate.getTime() >= value.HoraFin.getTime() && endDate.getTime() >= value.HoraFin.getTime());
                    if (!retvalue) {
                        vControl = retvalue === false ? vControl + 1 : vControl;
                        if (IdRecurso != value.Recurso.ID) {
                            vControl -= 1;
                            retvalue = true;
                        }
                    }
                });
                if (vControl > 0) {
                    global.warning("Se empalma con los horarios ya reservados. Por favor intente nuevamente.");
                    retvalue = false;
                }
            }            
            return retvalue;
        };
        getMaxCalendarEventID(events: any, actividades: any) {
            let MaxindexEvent = 0;
            let MaxindexActs = 0;
            let Maxindex = 0;
            let indexActual = 0;
            if (events && events.length > 0) {
                events.forEach((value: any, index: number) => {
                    indexActual = value.ID;
                    MaxindexEvent = indexActual > MaxindexEvent ? indexActual : MaxindexEvent;
                });
            }

            let actividadesMax: any = actividades.filter(value => value.IdEvent > MaxindexEvent);
            if (actividadesMax && actividadesMax.length > 0) {
                actividadesMax.forEach((value: any, index: number) => {
                    indexActual = value.IdEvent;
                    MaxindexActs = indexActual > MaxindexActs ? indexActual : MaxindexActs;
                });
            }
            return MaxindexEvent > MaxindexActs ? MaxindexEvent : MaxindexActs;
        }

        getJSCalendarEvent(initDate: any, endDate: any, events: any, actividades: any, IdEvent: number = 0) {
            let Maxindex = 0;
            // IDEvent > 0, fue asignado previamente a un evento del calendario = actividad, se toma el mismo IdEvent para guardar la relación.
            if (IdEvent > 0) {
                Maxindex = IdEvent - 1;
            } else {
                //Se compara en actividades y eventos para tomar el ID mayor del evento + 1.
                Maxindex = this.getMaxCalendarEventID(events, actividades);
            } 
            let iconoCalendario = "far fa-calendar";
            let etiqueta = "<I class=\"" + iconoCalendario + "\" style=\"color: \"" + "#F00000" + "\" \"> </I> " + " Planificación" + "<br> " + "reservado";

            let calendarEvent = {
                "ID": Maxindex + 1,
                "Link": null,
                "Ruta": null,
                "Categories": "Categories",
                "Summary": etiqueta,
                "DTStart": initDate,
                "DTEnd": endDate,
                "DTStamp": initDate.toString(),
                "Location": "EnKontrol",
                "Description": "http://enkontrol.com",
                "BackgroundColor": "#5cdce4",
                "TextColor": "#FFFFFF",
                "AllDay": false,
                "UID": Maxindex + 1,
                "isNew": true,
            }
            return calendarEvent;
        };

        reservarHorario(startDate: any, endDate: any, events: any, val: boolean = false) {
            let state: any = EK.Store.getState();
            let fechaInicial: Date = new Date(startDate);
            let initDate: Date;
            let fechaFinal: Date;
            //SE UTILIZA PARA CONVERTIR CON LA ZONA HORARIO, SI YA VIENE FORMATEADA CUANDO CLICK EN DAY COMPLETO, SE OMITE
            if (val) {
                fechaInicial = new Date(startDate);
                startDate = this.getDateTimezone(startDate);
                fechaFinal = new Date(endDate);;
                endDate = this.getDateTimezone(endDate);
            }
            let recurso: any = getData(this.props.recursoSeleccionado);

            let validacion: boolean = this.validaciones(startDate, endDate, recurso.ID);
            
            if(validacion) {
            let Maxindex = 0;
            let indexActual = 0;
            let actividades: any = getData(this.props.actividades);
            let items: any[] = [];
            let thisItems: any[] = actividades;
            let calendarState: any = getData(EK.Store.getState().global[CALENDAR_STATE]);
            let calendarEvent: any = this.getJSCalendarEvent(startDate, endDate, events, actividades);

            if (actividades && actividades.length > 0) {
                actividades.forEach((value: any, index: number) => {
                    indexActual = value.ID;
                    Maxindex = indexActual > Maxindex ? indexActual : Maxindex;
                });
            }

            items[0] = {
                ID: Maxindex + 1,
                Fecha: fechaInicial,
                HoraInicio: startDate,
                HoraFin: endDate,
                IdEvent: calendarEvent.ID,
                Recurso: recurso
            };

            if (items && items.length > 0) {
                items.forEach((value: any, index: number) => {
                    thisItems.push(value);
                });
            };
            let newActivities: any = global.createSuccessfulStoreObject(thisItems);
            global.dispatchSuccessful("global-page-data", newActivities, SECTION_ACTIVIDADES_ID);
            events.push(calendarEvent);
            calendarState.Events = events;
            global.dispatchSuccessful("load::" + CALENDAR_STATE, calendarState);

            success("Horario Reservado");
            $("#tab2").removeClass("active");
            $("#tab1").addClass(" active");
            $("#tab_2").removeClass("active");
            $("#tab_1").addClass(" active");
            }
        };

        onEventClick(calEvent: any, jsEvent: any, view: any): any {
            let eventos: any = calEvent.source.rawEventDefs;
            let idEvent: any = 0;
            if (eventos && eventos.length > 0) {
                eventos.forEach((value: any, index: number) => {
                    if (value.isNew && value.ID === calEvent.id) {
                        idEvent = value.ID;
                        EK.Global.confirm("Presione Confirmar para eliminar Planificación ...", "Eliminar \n", () => {
                            let element: DataElement = Forms.getValue(SECTION_ACTIVIDADES_ID, configModal.id);
                            let elements: any = getData(element);
                            elements.forEach((value: any, index: number) => {
                                if (value.IdEvent === idEvent) {
                                    value._eliminado = true;
                                    let newActivities: any = global.createSuccessfulStoreObject(elements);
                                    global.dispatchSuccessful("global-page-data", newActivities, SECTION_ACTIVIDADES_ID);
                                    global.info("Reserva eliminada");
                                }
                            });
                        })
                    }
                });
            }
        };

        onSelectEvent(startDate: any, endDate: any, jsEvent: any, view: any): any {
            let minTime = "07:00:00";
            let maxTime = "20:00:00";
            let events: any = view.options.events;
            let diference: any = this.daysDiff(startDate, endDate);
            if (diference > 1) {
                return null;
            } else if (diference < 1 && startDate._ambigTime === false) {
                EK.Global.confirm("Presione Confirmar para planificar ...", "Planificación \n\n" + global.formatDateTimeDirect(this.getDateTimezone(startDate), true) + " - " + global.formatTimePlanificacionSPV(this.getDateTimezone(endDate)), () => {
                    this.reservarHorario(startDate, endDate, events, true);
                })
            } else if (startDate._ambigTime) {
                let initDate: any = new Date(endDate.toDate().toDateString() + " " + minTime);
                let _endDate: any = new Date(endDate.toDate().toDateString() + " " + maxTime);
                EK.Global.confirm("Presione Confirmar para planificar ...", "Planificación \n\n" + global.formatDateTimeDirect(initDate, true) + " - " + global.formatTimePlanificacionSPV(_endDate), () => {
                    diference === 1 ? this.reservarHorario(initDate, _endDate, events) : null;
                })
            }
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
                    <calendar.GlobalSPVPlanificacion
                        id={PLANIFICACION_CALENDAR_ID}
                        idForm={PAGE_ID}
                        minTime={minTime}
                        maxTime={maxTime}
                        onEventClick={this.onClickEvent}
                        onSelect={this.onClickSelect}
                        applyValuesControl={this.props.applyValuesControl}
                    />
                    </page.OptionSection>
            </Column>
        };
    });


    interface IViewCalendarDetailsProps extends page.IProps {
        recursoSeleccionado?: global.DataElement;
        actividades?: global.DataElement;
        updatedActivitiesForm?: EditForm;
        tipoAgenda?: EditForm;
    };


    let ViewCalendarDetails: any = global.connect(class extends React.Component<IViewCalendarDetailsProps, IViewCalendarDetailsProps> {
        constructor(props: IViewCalendarDetailsProps) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.recursoSeleccionado = state.global[RECURSO_SELECCIONADO];
            retValue.actividades = state.global["catalogo$" + SECTION_ACTIVIDADES_ID];
            retValue.tipoAgenda = getData(state.global[TIPOAGENDA_STATE]).TipoAgenda;
            return retValue;
        };

        shouldComponentUpdate(nextProps: IViewCalendarDetailsProps, { }): boolean {
            return hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado) ||
                hasChanged(this.props.actividades, nextProps.actividades) ||
                hasChanged(this.props.tipoAgenda, nextProps.tipoAgenda);
        };

        render(): JSX.Element {
            let ml: any = configModal.getML();
            return <div>
                <CalendarDetailsGridPlanificacion />
                <Column size={[12, 12, 4, 4]} style={{ float: "right" }}>
                    <label.Label id="TipoAgenda" label={ml.form.TipoTarea.label} value={this.props.tipoAgenda} size={[12, 12, 12, 12]}/>
                    <ddl.TipoCitasDLL id="Tarea" validations={[validations.required()]} label={ml.form.Tarea.label} />
                    <checkBox.SPVPlanificacionNotificacion id="NotificacionCorreo" size={[7, 7, 7, 7]} label={ml.form.NotificacionCorreo.label} style={{ fontSize: "12px", marginTop: "-15px" }} />
                    <checkBox.SPVPlanificacionConfirmacion id="Confirmacion" size={[7, 7, 7, 7]} label={ml.form.Confirmacion.label} style={{ fontSize: "12px", marginTop: "-29px" }} />
                    <checkBox.SPVPlanificacionRecordatorio id="Recordatorio" size={[7, 7, 7, 7]} label={ml.form.Recordatorio.label} style={{ fontSize: "12px", marginTop: "-25px" }} />
                </Column>
                <CalendarDetailsActivities />
            </div>;
        };
    });


    let CalendarDetailsActivities: any = global.connect(class extends React.Component<IViewCalendarDetailsProps, IViewCalendarDetailsProps> {
        constructor(props: IViewCalendarDetailsProps) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.recursoSeleccionado = state.global[RECURSO_SELECCIONADO];
            retValue.actividades = state.global["catalogo$" + SECTION_ACTIVIDADES_ID];
            retValue.updatedActivitiesForm = Store.getState().forms[PAGE_ID].form[SECTION_ACTIVIDADES_ID];
            return retValue;
        };

        shouldComponentUpdate(nextProps: IViewCalendarDetailsProps, { }): boolean {
            return hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado) ||
                hasChanged(this.props.actividades, nextProps.actividades) ||
                hasChanged(this.props.updatedActivitiesForm, nextProps.updatedActivitiesForm);
        };

        componentWillReceiveProps(nextProps: IViewCalendarDetailsProps): any {
            if (global.hasChanged(this.props.updatedActivitiesForm, nextProps.updatedActivitiesForm)) {
                if (nextProps.updatedActivitiesForm) {
                    let UpdatedForm: any = Forms.getValue(SECTION_ACTIVIDADES_ID, PAGE_ID);
                    let UpdatedFormData: any = getData(UpdatedForm);
                    if (UpdatedFormData && UpdatedFormData.length > 0) {
                        UpdatedFormData.forEach((value: any, index: number) => {
                            if (value._eliminado) {
                                UpdatedFormData.splice(index, 1);
                                let idEvent: any = value.IdEvent;
                                let calendarState: any = getData(EK.Store.getState().global[CALENDAR_STATE]);
                                let events: any = calendarState.Events;
                                events.forEach((value: any, index: number) => {
                                    if (value.ID === idEvent) {
                                        events.splice(index, 1);
                                        calendarState.Events = events;
                                        global.dispatchSuccessful("load::" + CALENDAR_STATE, calendarState);
                                    }
                                });
                                let newActivities: any = global.createSuccessfulStoreObject(UpdatedFormData);
                                global.dispatchSuccessful("global-page-data", newActivities, SECTION_ACTIVIDADES_ID);
                            }
                        });
                    }
                }
            }
        };
  
        render(): JSX.Element {
            let onAddNew: any = () => {
                $("#tab1").removeClass("active");
                $("#tab2").addClass(" active");
                $("#tab_1").removeClass("active");
                $("#tab_2").addClass(" active");
            }

            let onClick: any = (item: any) => {
                //Para no redirigir 
            }

            let viewMode: boolean = getData(this.props.state).viewMode;

            let ml: any = configModal.getML();
            return <page.SectionList
                    id={SECTION_ACTIVIDADES_ID}
                    parent={PAGE_ID}
                    idForm={PAGE_ID}
                    title={"Actividades"}
                    level={1}
                    items={createSuccessfulStoreObject([])}
                    icon="fas fa-th-list"
                    onAddNew={onAddNew}
                    size={[12, 12, 8, 8]}
                    style={{ marginTop: "15px" }}
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[3, 3, 3, 3]} className="listItem-center-header">{"Fecha"}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-center-header">{"Hora Inicio"}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-center-header">{"Hora Fin"}</Column>
                                <Column size={[3, 3, 3, 3]} className="listItem-center-header">{"Nombre Recurso"}</Column>
                            </Row>
                        </div>}
                    mapFormToEntity={(form: EditForm): any => {
                        return form
                            .addID()
                            .addDate("Fecha")
                            .toObject();
                    }}
                    formatter={(index: number, item: any) => {
                        return <div>
                            <Row>
                                <Column size={[3, 3, 3, 3]} className="listItem-center-item">
                                    <span>{EK.UX.Labels.formatDate(item.Fecha)}</span>
                                </Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-center-item">
                                    <span>{global.formatTimePlanificacionSPV(item.HoraInicio)}</span>
                                </Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-center-item">
                                    <span>{global.formatTimePlanificacionSPV(item.HoraFin)}</span>
                                </Column>
                                <Column size={[3, 3, 3, 3]} className="listItem-center-item">
                                    <span>{item.Recurso.Recurso.Nombre}</span>
                                </Column>
                                {(viewMode) ?
                                    <buttons.PopOver idParent={PAGE_ID} idForm={SECTION_ACTIVIDADES_ID} info={item}
                                        extraData={[buttons.PopOver.remove]}
                                    /> : null
                                }
                            </Row>
                        </div>;
                    }}>
                </page.SectionList>;
        };
    });

    let CalendarDetailsGridPlanificacion: any = global.connect(class extends React.Component<IViewCalendarDetailsProps, IViewCalendarDetailsProps> {
        constructor(props: IViewCalendarDetailsProps) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.recursoSeleccionado = state.global[RECURSO_SELECCIONADO];
            return retValue;
        };

        shouldComponentUpdate(nextProps: IViewCalendarDetailsProps, { }): boolean {
            return hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado);
        };

        componentWillReceiveProps(nextProps: IViewCalendarDetailsProps): any {
        };

        onRowDoubleClick(item: any): any {
        };
        render(): JSX.Element {            
            let ml: any = configModal.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addSelect()
                .addID({ width: "80px", title: "ID", fixed: true })
                .add({ data: "Desarrollo.Nombre", title: "Desarrollo", width: "140px" })
                .add({ data: "Prototipo.Clave", title: "Prototipo", width: "140px" })
                .add({ data: "ClaveFormato", title: "Ubicación", width: "140px" })
                .toArray();
            
            return <page.SectionListExtended
                id={SECTION_GRID_PLANIFICACION}
                title={"Planificación"}
                parent={PAGE_ID}
                idForm={PAGE_ID}
                icon="fa fa-table"
                level={1}
                dtConfig={dtConfig}
                size={[12, 12, 8, 8]}
                hideNewButton={true}
                readonly={true}
                items={createSuccessfulStoreObject([])}
                onRowDoubleClick={this.onRowDoubleClick}>
            </page.SectionListExtended>;
        };
    });

};

import PlanificacionComponentModal = EK.Modules.SCV.Pages.postventa.SPVPlanificacionComponent.PlanificacionComponentModalBase;