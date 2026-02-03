namespace EK.Modules.SCV.Pages.postventa.RUBA.AgendaContratistaAreasComunes {
    const PAGE_ID: string = "AgendaContratistaAreasComunes";
    const PAGE_CONTRATISTA_ID: string = "AgendaContratistaPV";
    const PAGE_NEW_CONTRATISTA_ID: string = "AgendaNewContratistaPV";
    const PAGE_ORDEN_TRABAJO_RESERVA_ID: string = "agenda$ordenTrabajo$reserva";
    const SECTION_CAPTURA_INFO: string = "CapturaInfo";
    const SECTION_CONCEPTO_ID: string = "AgendaSPV";
    const DETALLES_CITA: string = "DetallesCita";
    const REPORTE_SEGUIMIENTO: string = "reporte$seguimiento";
    const REPORTE_REPROGRAMACIONES: string = "reporte$reprogramaciones";
    const w: any = window;
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "kontrol", []);

    export const resetAgenda: () => void = (): void => {
        global.dispatchSuccessful("global-page-data", [], "AgendaPostVentaResult");
        global.dispatchSuccessful("global-page-data", [], "ContratistaOTAgendaEdit");
        global.dispatchSuccessful("global-page-data", [], SECTION_CONCEPTO_ID);
        global.dispatchSuccessful("global-page-data", [], PAGE_ORDEN_TRABAJO_RESERVA_ID);
        global.dispatchSuccessful("load::ACTDETALLEAGENDA", null);

        Forms.updateFormElement(SECTION_CAPTURA_INFO, "ContratistaOTAgendaEdit", []);
        Forms.remove("FormularioViviendasMasivas");
    };

    class AgendaState {
        public atendido: boolean;
        public cancelado: boolean;
        public reprogramacion: boolean;
        public reprogramado: boolean;
        public detallar: boolean;
        public filtrado: boolean;
        public changeContratista: boolean;
        public action: string;

        constructor(state?: any) {
            if (state) {
                this.atendido = state.atendido;
                this.cancelado = state.cancelado;
                this.reprogramacion = state.reprogramacion;
                this.reprogramado = state.reprogramado;
                this.detallar = state.detallar;
                this.filtrado = state.filtrado;
                this.action = state.action;
                this.changeContratista = state.changeContratista;
            }
        };
    };

    const listHeaderOrdenTrabajoReserva: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"Observaciones"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Fecha Inicio"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Hora Fin"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderOrdenTrabajo: JSX.Element =
        <Column size={[12, 12, 12, 12]} className="fixheaderlist">
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"#Folio/#OT"}</Column>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"Reporto"}</Column>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"Fraccionamientooo"}</Column>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Creado"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"Observaciones"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header bold center">&nbsp;</Column>
            </Row>
        </Column>

    interface IAgendaContratistaProps extends page.IProps {
        agendaActualizada?: any;
        agendaState?: DataElement;
        cambioContratista?: DataElement;
        checkListGuardado?: any;
        contratistaOTAgenda?: any;
        detCita?: any;
        entityType: any;
        entity: any;
        fechaInicio?: any;
        fechaInicioReserva?: any;
        fechaInicioSeguimiento?: any;
        forma?: any;
        plaza?: any;
        saveAgenda?: (item: any) => void;
        changeContratista?: (item: any) => void;
        tipoAgenda?: any;
    };

    export const AgendaContratistaAreasComunes: any = global.connect(class extends React.Component<IAgendaContratistaProps, IAgendaContratistaProps> {
        constructor(props: IAgendaContratistaProps) {
            super(props);
            this.onAddNew = this.onAddNew.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onSelectCalendar = this.onSelectCalendar.bind(this);
            this.onSelectEliminamosContratistaOT = this.onSelectEliminamosContratistaOT.bind(this);
            this.onSelectDetalleCita = this.onSelectDetalleCita.bind(this);
            this.onSelectNewContratista = this.onSelectNewContratista.bind(this);
            this.onClose = this.onClose.bind(this)
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.data = state.global.catalogo$AgendaPostVentaResult;
            retValue.contratistaOTAgenda = Forms.getDataValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO, state);
            retValue.agendaNewContratista = Forms.getValue("Contratista", PAGE_NEW_CONTRATISTA_ID, state);
            retValue.plaza = Forms.getValue("PlazaInicial", PAGE_CONTRATISTA_ID, state);
            retValue.detCita = state.global.catalogo$AgendaDetallesCitaResult;
            retValue.agendaActualizada = state.global.ACTDETALLEAGENDA;
            retValue.entity = state.global.KontrolFileParametersCurrentEntity;
            retValue.entityType = state.global.KontrolFileParametersCurrentEntityType;
            retValue.checkListGuardado = state.global.catalogo$ChecklistProgramadosGuardados;
            retValue.tipoAgenda = Forms.getValue("TipoAgenda", "AgendaNew");
            retValue.agendaState = state.global.state$AgendaContratistaAreasComunes;
            retValue.cambioContratista = state.global.CHANGECONTRATISTAOT;
            retValue.fechaInicio = state.forms.DetallesCita === undefined || state.forms.DetallesCita === null || state.forms.DetallesCita.form.FechaInicio === undefined || state.forms.DetallesCita.form.FechaInicio === null ? null : state.forms.DetallesCita.form.FechaInicio;
            retValue.fechaInicioReserva = Forms.getValue("FechaInicio", PAGE_ORDEN_TRABAJO_RESERVA_ID);
            retValue.fechaInicioSeguimiento = state.forms.DetallesCita === undefined || state.forms.FechaInicioSeguimiento === null || state.forms.DetallesCita.form.FechaInicioSeguimiento === undefined || state.forms.DetallesCita.form.FechaInicioSeguimiento === null ? null : state.forms.DetallesCita.form.FechaInicioSeguimiento;
            return retValue;
        };
        refs: {
            modal: Element;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            saveAgenda: (item: any): void => {
                global.dispatchAsyncPut("load::ACTDETALLEAGENDA", "base/kontrol/AgendaSPV/Get/SaveDetProgContratistaAreasComunes", item, "ActDetalleAgenda");
                let page = getData(EK.Store.getState().global.page);
                let canceladoReload = getData(EK.Store.getState().global.TipoAccionAgendaReload);
                let entidad = getData(EK.Store.getState().global.currentEntity);

                if (page.id === "ReporteFallasAreasComunes") {
                    if (canceladoReload == "CAN") {
                        let modalAgenda: any = $("#modalAgendaContratista");
                        modalAgenda.modal("hide");
                        setTimeout(() => {
                            go("scv/pv/reporteFallasAreasComunes/" + entidad.ID, false);
                        }, 1500)
                    }
                }
            },
            changeContratista: (item: any): void => {
                console.log(item)
                global.dispatchAsyncPut("load::CHANGECONTRATISTAOT", "base/kontrol/AgendaSPV/Get/SaveAgendaChangeContratistaAreasComunes", item);
            }
        });
        componentDidMount(): void {
            agendaContratistaAreasComunesPV.resetAgenda();

            let state: AgendaState = new AgendaState();
            state.reprogramacion = false;
            state.atendido = false;
            state.reprogramado = false;
            state.cancelado = false;
            state.detallar = false;
            state.filtrado = false;
            state.changeContratista = false;
            state.action = "";

            this.props.config.setState(state, PAGE_ID);
            this.props.config.setCatalogo([], PAGE_CONTRATISTA_ID);
            this.props.config.setCatalogo([], PAGE_ORDEN_TRABAJO_RESERVA_ID);
        };
        componentWillUnmount(): void {
            agendaContratistaAreasComunesPV.resetAgenda();
        };
        componentWillUpdate(nextProps: IAgendaContratistaProps, nextState: IAgendaContratistaProps): void {
            if (hasChanged(this.props.detCita, nextProps.detCita)) {
                if (global.isSuccessful(nextProps.detCita)) {
                    let state: AgendaState = new AgendaState(global.getData(nextProps.agendaState));
                    state.reprogramacion = false;
                    state.atendido = false;
                    state.reprogramado = false;
                    state.cancelado = false;
                    state.detallar = false;
                    state.filtrado = false;
                    state.changeContratista = false;

                    Forms.reset("DetallesCita");
                    Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", null);

                    nextProps.config.setState(state, PAGE_ID);
                }
            }
        };
        componentWillReceiveProps(nextProps: IAgendaContratistaProps, nextState: IAgendaContratistaProps): void {
            if (hasChanged(this.props.checkListGuardado, nextProps.checkListGuardado) && global.isSuccessful(nextProps.checkListGuardado)) {
                let item: any = getData(nextProps.checkListGuardado);
                switch (item.Estado) {
                    case 5:
                        let ubicacionEnProceso: any = Forms.getValue("DetalleCteAgendaEdit", SECTION_CAPTURA_INFO);
                        if (ubicacionEnProceso === null || ubicacionEnProceso === undefined) {
                            return;
                        } else {
                            ubicacionEnProceso.CantidadPendientesPorReparar = item.CantidadPendientesPorReparar;
                            ubicacionEnProceso.bit_revisado = item.bit_revisado;
                            Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", ubicacionEnProceso);
                        }
                        global.success("CheckList Guardado Correctamente!");
                        break;
                    default: break;
                }
            };


            if (hasChanged(nextProps.agendaActualizada, this.props.agendaActualizada) && global.isSuccessful(nextProps.agendaActualizada)) {
                //aqui deberia hacer el render de las otras citas y regargar la agenda del usuario o administrador
                let item: any = getData(nextProps.agendaActualizada);
                switch (item.Estado) {
                    case 5: // eliminado con exito
                        success("Planificación Actualizada Correctamente!");
                        let idPagina = getData(EK.Store.getState().global.pageConfig).id;
                        //console.log(idPagina)
                        if (idPagina === 'AgendaAreasComunes') {
                            let id = getData(EK.Store.getState().global.IdEvento);
                            let accion = getData(EK.Store.getState().global.TipoAccionAgendaReload);
                            let indicadoresEstado = getData(EK.Store.getState().global.dashBoardAgendaIndicadoresEstados);
                            if (id !== undefined && id !== null) {
                                let objectCalendar = getData(EK.Store.getState().global.AgendaDashBoard);
                                let eventos = objectCalendar.Events;
                                let index = 0;
                                let repetidos = 0;
                                for (const evento of eventos) {
                                    index++;
                                    if (evento.UID === id) {
                                        repetidos++;
                                        evento.DTStart = item.FechaInicio;
                                        evento.DTEnd = item.FechaFin;
                                        const vencidos = this.diasVencidos(item.FechaInicio);
                                        if (vencidos === 0) {
                                            evento.BackgroundColor = '#FF8F00';
                                        } else if (vencidos > 0) {
                                            evento.BackgroundColor = '#df0707';
                                        } else {
                                            evento.BackgroundColor = '#8BC780';
                                        }

                                        break;
                                    }
                                }
                                if (repetidos > 1) {
                                    let params = getData(EK.Store.getState().global.ParametrosReloadAgenda);
                                    let fecha = getData(EK.Store.getState().global.FechaForReloadCalendar);
                                    params.FechaInicio = fecha;
                                    global.asyncPost("base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: params }, (status: AsyncActionTypeEnum, data: any[]) => {
                                        if (status === AsyncActionTypeEnum.successful) {
                                            global.dispatchSuccessful("load::AgendaDashBoard", data);
                                            let calendar: any = $('#AgendaDashBoard');
                                            calendar.fullCalendar('gotoDate', fecha);
                                        }
                                    });
                                } else {
                                    switch (accion) {
                                        case 'CAN':
                                            eventos.splice(index, 1);
                                            break;
                                        case 'ATE':
                                            eventos.splice(index, 1);
                                            indicadoresEstado[0].CantidadAtendidas++;
                                            break;
                                        case 'REP':
                                            indicadoresEstado[0].CantidadReprogramadas++;
                                            break;
                                        case 'REP-ATE':
                                            indicadoresEstado[0].CantidadAtendidas++;
                                            indicadoresEstado[0].CantidadReprogramadas++;
                                            eventos.splice(index, 1);
                                            break;
                                    }
                                    //objectCalendar.Events = eventos;
                                    //let calendar: any = $('#AgendaDashBoard');
                                    //let fecha = getData(EK.Store.getState().global.FechaForReloadCalendar);
                                    //setTimeout(() => {
                                    //    console.log(fecha);
                                    //    global.dispatchSuccessful("load::AgendaDashBoard", objectCalendar);
                                    //    global.dispatchSuccessful('load::dashBoardAgendaIndicadoresEstados', indicadoresEstado)
                                    //    calendar.fullCalendar('gotoDate', fecha);
                                    //}, 100);
                                    let params = getData(EK.Store.getState().global.ParametrosReloadAgenda);
                                    let fecha = getData(EK.Store.getState().global.FechaForReloadCalendar);
                                    params.FechaInicio = fecha;
                                    global.asyncPost("base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: params }, (status: AsyncActionTypeEnum, data: any[]) => {
                                        if (status === AsyncActionTypeEnum.successful) {
                                            global.dispatchSuccessful("load::AgendaDashBoard", data);
                                            let calendar: any = $('#AgendaDashBoard');
                                            calendar.fullCalendar('gotoDate', fecha);
                                        }
                                    });
                                }
                            }
                        }

                        this.onClose();
                        break;
                    default: break;
                }
            };

            if (global.hasChanged(this.props.cambioContratista, nextProps.cambioContratista) && global.isSuccessful(nextProps.cambioContratista)) {
                let item: any = getData(nextProps.cambioContratista);
                switch (item.Estado) {
                    case 5: // eliminado con exito
                        success("Cambio del contratista Actualizado Correctamente!");
                        this.onClose();
                        break;
                    default: break;
                }
            };

            if (global.hasChanged(this.props.tipoAgenda, nextProps.tipoAgenda)) {
                Forms.updateFormElement(SECTION_CAPTURA_INFO, "ContratistaOTAgendaEdit", []);
            };

            if (global.hasChanged(this.props.fechaInicio, nextProps.fechaInicio)) {
                if (nextProps.fechaInicio != null && nextProps.fechaInicio != undefined) {
                    if (this.props.fechaInicio != undefined && this.props.fechaInicio != null && nextProps.fechaInicio != null && nextProps.fechaInicio != undefined) {
                        let updateValue: boolean = false;
                        updateValue = global.hasChanged(this.props.fechaInicio, nextProps.fechaInicio) && this.equalDates(this.props.fechaInicio.value, nextProps.fechaInicio.value, '!=');
                        if (updateValue === true) {
                            this.nuevoHorario(DETALLES_CITA);
                        };
                    };
                };
            };
            //
            if (global.hasChanged(this.props.fechaInicioSeguimiento, nextProps.fechaInicioSeguimiento)) {
                if (nextProps.fechaInicioSeguimiento != null && nextProps.fechaInicioSeguimiento != undefined) {
                    if (this.props.fechaInicioSeguimiento != undefined && this.props.fechaInicioSeguimiento != null && nextProps.fechaInicioSeguimiento != null && nextProps.fechaInicioSeguimiento != undefined) {
                        let updateValue: boolean = false;
                        updateValue = global.hasChanged(this.props.fechaInicioSeguimiento, nextProps.fechaInicioSeguimiento) && this.equalDates(this.props.fechaInicioSeguimiento.value, nextProps.fechaInicioSeguimiento.value, '!=');
                        if (updateValue === true) {
                            this.nuevoHorarioSeguimiento(DETALLES_CITA);
                        };
                    };
                };
            };
            //
            if (global.hasChanged(this.props.fechaInicioReserva, nextProps.fechaInicioReserva)) {
                if (this.equalDates(this.props.fechaInicioReserva, nextProps.fechaInicioReserva, "!=")) {
                    this.nuevoHorario(PAGE_ORDEN_TRABAJO_RESERVA_ID);
                };
            };

        };
        nuevoHorario(idForm: string): void {
            var fechaHoraInicio = new Date(Forms.getValue("FechaInicio", idForm));
            var horarioCompleto: any = getData(EK.Store.getState().global.HorarioAtencion);

            fechaHoraInicio.setHours(fechaHoraInicio.getHours() + 1);

            var horas: any = fechaHoraInicio.getHours();
            var minutos: any = fechaHoraInicio.getMinutes();
            var horaPropuesta: any = ("00" + horas).slice(-2) + ':' + ("00" + minutos).slice(-2)
            horarioCompleto.forEach((item: any) => {
                if (item.Clave === horaPropuesta) {
                    Forms.updateFormElement(idForm, "HoraFIN", item);
                };
            });
        };
        nuevoHorarioSeguimiento(idForm: string): void {
            var fechaHoraInicio = new Date(Forms.getValue("FechaInicioSeguimiento", idForm));
            var horarioCompleto: any = getData(EK.Store.getState().global.HorarioAtencion);

            fechaHoraInicio.setHours(fechaHoraInicio.getHours() + 1);

            var horas: any = fechaHoraInicio.getHours();
            var minutos: any = fechaHoraInicio.getMinutes();
            var horaPropuesta: any = ("00" + horas).slice(-2) + ':' + ("00" + minutos).slice(-2)
            horarioCompleto.forEach((item: any) => {
                if (item.Clave === horaPropuesta) {
                    Forms.updateFormElement(idForm, "HoraFinSeguimiento", item);
                };
            });
        };
        equalDates(d1: Date, d2: Date, validacion: any): boolean {
            let cDate: Date = d1 ? new Date(d1.getTime()) : null;
            let nDate: Date = d2 ? new Date(d2.getTime()) : null;

            if (cDate === null || nDate === null) return true;
            switch (validacion) {
                case '!=':
                    return cDate.getTime() !== nDate.getTime();
                case '<':
                    return cDate.getTime() < nDate.getTime();
                case '>':
                    return cDate.getTime() > nDate.getTime();
                case '=':
                    return cDate.getTime() == nDate.getTime();
                case '<=':
                    return cDate.getTime() <= nDate.getTime();
                case '>=':
                    return cDate.getTime() >= nDate.getTime();
                default:
                    return false;
            }
        };
        //Abrimos Modal para seleccion de Viviendas entregables
        onAddNew(): void {
            let modalAgenda: any = $("#modalAgendaContratista");
            modalAgenda.modal();
            modalAgenda.css("height", "auto");
        };
        onSearch(): void {
            let plaza: any = Forms.getValue("PlazaInicial", PAGE_CONTRATISTA_ID);
            let contratista: any = Forms.getValue("Contratista", PAGE_CONTRATISTA_ID);

            if (!(plaza && plaza.ID > 0)) {
                global.warning("Por favor indique la plaza.");
                return;
            };

            if (!(contratista && contratista.ID > 0)) {
                global.warning("Por favor indique el contratista.");
                return;
            };

            let encodedParams: string = global.encodeParameters({ plaza: plaza.ID, idContratista: contratista.ID, bitot: 1 });
            let checkedItems: any[] = Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO);
            if (checkedItems && checkedItems.length > 0) {
                EK.Global.confirm("Al actualizar la consulta se borrarán los registros seleccionados.\nPresione Confirmar para actualizar la consulta.", "Agenda de Contratista", () => {
                    agendaContratistaAreasComunesPV.resetAgenda();
                    global.dispatchAsync("global-page-data", "base/scv/Contratistas/Get/GetOrdenesTrabajo/" + encodedParams, "AgendaPostVentaResult");
                });
            } else {
                global.dispatchAsync("global-page-data", "base/scv/Contratistas/Get/GetOrdenesTrabajo/" + encodedParams, "AgendaPostVentaResult");
            };
        };
        onClose(): void {
            let state: AgendaState = new AgendaState(global.getData(this.props.agendaState));
            state.reprogramacion = false;
            state.atendido = false;
            state.reprogramado = false;
            state.cancelado = false;
            state.detallar = false;
            state.filtrado = false;
            state.changeContratista = false;
            state.action = "";

            this.props.config.setState(state, PAGE_ID);

            Forms.reset("DetallesCita");
            Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", null);

            let modalCalen: any = $("#modalAgendaContratista");
            modalCalen.modal("hide");

            let ModalObj2: any = $("#modalAgendaInformacionCita");
            ModalObj2.modal("hide");
        };
        //Seleccion multiple de Conceptos del Calendario
        onSelectCalendar(item: any, value: any): void {
            let entidades: any[] = Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO);
            let retValue: any[] = [];
            //
            if (!item.Reservas) {
                item.Reservas = [];
            };
            //
            if (value === true) {
                if (entidades === undefined || entidades === null || !entidades) {
                    let items: DataElement = global.createSuccessfulStoreObject([]);
                    items = items.upsertItem(item);
                    retValue = global.getData(items, []);
                } else {
                    if (entidades && entidades.length >= 1) {
                        let distinto: boolean =
                            entidades.filter((row: any, index: number) => {
                                return (item.IdUbicacion === row.IdUbicacion) &&
                                    (item.OrdenTrabajo.IdContratista === row.OrdenTrabajo.IdContratista);
                            }).length <= 0;

                        if (distinto === true) {
                            Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
                            global.info("Las ordenes de trabajo deben corresponder al mismo contratista y ubicación.");
                            return;
                        };
                    };

                    let items: DataElement = global.createSuccessfulStoreObject(entidades);
                    if (item.ID == undefined && item.ID == null) {
                        item.ID = items.getNextLowerID();
                    };

                    items = items.upsertItem(item);
                    retValue = global.getData(items, []);
                }
            } else if (entidades && entidades.length) {
                retValue = entidades.filter(seleccionados => seleccionados.ID != item.ID);
            };
            //
            Forms.updateFormElement(SECTION_CAPTURA_INFO, "ContratistaOTAgendaEdit", retValue);
        };
        //Eliminamos Ubicacion de la Agenda
        onSelectEliminamosContratistaOT(item: any): void {
            //Seleccionamos Arreglo de ContratistaOT seleccionado
            let ContratistaOTAgenda: any[] = Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO);
            //Filtramos ContratistaOT
            let Filtrado: any[] = (ContratistaOTAgenda.filter(elemento => elemento.ID != item.ID));
            //Actualizamos el Estado ContratistaOTAgendaEdit
            Forms.updateFormElement(SECTION_CAPTURA_INFO, "ContratistaOTAgendaEdit", Filtrado);
            Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
        };

        onSelectNewContratista(item: any, Estatus: any): void {

            let ordenTrabajo: any = global.assign({}, item.OrdenTrabajo);
            let state: AgendaState = new AgendaState(global.getData(this.props.agendaState));
            state.detallar = false;
            state.filtrado = true;
            state.changeContratista = true;

            //visualizacion
            if (Estatus === "VER") state.detallar = true;

            state.atendido = false;
            state.reprogramado = false;
            state.cancelado = false;
            state.reprogramacion = false;

            Forms.reset(DETALLES_CITA);

            let idPlaza: any = this.props.plaza != undefined && this.props.plaza.ID != undefined ? this.props.plaza.ID : null;
            let encodedURL: string = global.encodeAllURL("scv", "Contratistas", { idPlaza });
            global.dispatchAsync("load::plaza$contratistas", encodedURL);

            //Actualizamos el Estado Detalle Cte Agenda Edit
            Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", item);
            global.dispatchSuccessful("load::KontrolFileParametersCurrentEntityType", { data: "SPVAgendaContratista" });
            global.dispatchSuccessful("load::KontrolFileParametersCurrentEntity", ordenTrabajo);

            this.props.config.setState(state, PAGE_ID);
        }

        onConfirmNewContratista(item: any, Estatus: any): void {
            EK.Global.confirm("Presione Confirmar para Cambiar al Contratista", "Reprogramar Contratista", () => {

                let state: AgendaState = new AgendaState(global.getData(this.props.agendaState));

                let item: any = Forms.getValue("DetalleCteAgendaEdit", SECTION_CAPTURA_INFO);
                let contratista: any = Forms.getValue("Contratista", PAGE_NEW_CONTRATISTA_ID);

                if (!(contratista && contratista.ID > 0)) {
                    global.warning("Por favor indique el contratista.");
                    return;
                };
                //console.log(this.props.plaza)
                item.OrdenTrabajo.IdContratista = contratista.ID;
                item.IdPlaza = this.props.plaza.Clave;
                console.log(item)
                this.props.changeContratista(item);

                agendaContratistaAreasComunesPV.resetAgenda();
                this.props.config.setState(state, PAGE_ID);
            });
        }

        onSaveNewSeguimiento(item: any, Estatus: any): void {

            EK.Global.confirm("Presione confirmar agregar nuevo seguimiento a la cita", "Agregar Nuevo Seguimiento", () => {

                let item: any = Forms.getValue("DetalleCteAgendaEdit", SECTION_CAPTURA_INFO);
                let FechaInicioSeguimiento: any = Forms.getValue("FechaInicioSeguimiento", DETALLES_CITA);
                let HoraFinSeguimiento: any = Forms.getValue("HoraFinSeguimiento", DETALLES_CITA);
                let ObservacionSeguimiento: string = Forms.getValue("ObservacionSeguimiento", DETALLES_CITA);

                let horaFinClave: string = !(HoraFinSeguimiento && HoraFinSeguimiento.Clave) ? null : HoraFinSeguimiento.Clave;
                if (horaFinClave === undefined || horaFinClave === null) {
                    global.warning("Debe Indicar la Hora Fin");
                    return;
                };

                var timePat = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$";
                var matchArray = horaFinClave.match(timePat);
                if (matchArray == null) {
                    return;
                };

                var fechaProcesar = new Date(FechaInicioSeguimiento);
                var pad: string = "00";
                horaFinClave = horaFinClave + ":00.000";

                let fechaFin: Date = new Date(fechaProcesar.getFullYear() + "-" + (pad + (fechaProcesar.getMonth() + 1).toString()).slice(-pad.length) + "-" + (pad + fechaProcesar.getDate().toString()).slice(-pad.length) + " " + horaFinClave);
                if (this.equalDates(fechaFin, FechaInicioSeguimiento, "<=")) {
                    warning("La hora fin no puede ser menor o igual a la hora de inicio ");
                    return;
                };

                let state: AgendaState = new AgendaState(global.getData(this.props.agendaState));

                let fechaInicioReprog: string = new Date(FechaInicioSeguimiento.getTime() - (FechaInicioSeguimiento.getTimezoneOffset() * 60000)).toISOString();
                let fechaFinReprog: string = new Date(fechaFin.getTime() - (fechaFin.getTimezoneOffset() * 60000)).toISOString();
                let idAgendaDetalle: any = item.OrdenTrabajo.AgendaDetalle.ID;
                let estatusAgenda: any = global.assign({ ID: -1, Clave: "SEG" });

                item.OrdenTrabajo.Agenda = global.assign(item.OrdenTrabajo.Agenda, {
                    IdAgendaDetalle: idAgendaDetalle,
                    EstatusAgenda: estatusAgenda,
                    FechaInicio: fechaInicioReprog,
                    FechaFin: fechaFinReprog,
                    TipoAgenda: this.props.tipoAgenda
                });

                item.OrdenTrabajo.AgendaDetalle = global.assign(item.OrdenTrabajo.AgendaDetalle, {
                    Observaciones: ObservacionSeguimiento,
                });

                this.props.saveAgenda(item);

            });
        }

        onSelectDetalleCita(item: any, Estatus: any): void {
            let ordenTrabajo: any = global.assign({}, item.OrdenTrabajo);
            let state: AgendaState = new AgendaState(global.getData(this.props.agendaState));
            state.detallar = false;
            state.filtrado = true;
            state.changeContratista = false;

            if (Estatus === "ATE") {
                state.atendido = true;
                state.reprogramado = false;
                state.cancelado = false;
                state.reprogramacion = false;
            };

            if (Estatus == "VER") {
                let p: any = global.assign({
                    tipoAgenda: "ContratistaAreasComunes",
                    idExpediente: ordenTrabajo.ID,
                    estatusAgenda: "SEG",
                    OperacionEspecificaSP: "CITAS-HISTORIAL"
                });
                global.dispatchAsyncPost("load::reporte$seguimiento", "base/scv/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p });

                p.estatusAgenda = "REP";
                global.dispatchAsyncPost("load::reporte$reprogramaciones", "base/scv/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p });
            }

            //Reprogramados
            if (Estatus === "REP") {
                state.atendido = false;
                state.reprogramado = true;
                state.cancelado = false;
                state.reprogramacion = true;

                let p: any = global.assign({
                    tipoAgenda: "ContratistaAreasComunes",
                    idExpediente: ordenTrabajo.ID,
                    estatusAgenda: "REP",
                    OperacionEspecificaSP: "CITAS-HISTORIAL"
                });
                global.dispatchAsyncPost("load::reporte$reprogramaciones", "base/scv/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p });

            };

            //Cancelados
            if (Estatus === "CAN") {
                state.atendido = false;
                state.reprogramado = false;
                state.cancelado = true;
                state.reprogramacion = false;
            };

            //visualizacion
            if (Estatus === "VER") {
                state.detallar = true;

                let estatusAgenda = !(ordenTrabajo && ordenTrabajo.Agenda) ? "" : ordenTrabajo.Agenda.EstatusAgenda.Clave;
                if (estatusAgenda === "ATE") {
                    state.atendido = true;
                    state.reprogramado = false;
                    state.cancelado = false;
                    state.reprogramacion = false;
                } else if (estatusAgenda === "REP") {
                    state.atendido = false;
                    state.reprogramado = true;
                    state.cancelado = false;
                    state.reprogramacion = true;
                } else if (estatusAgenda === "SUS") {
                    state.atendido = false;
                    state.reprogramado = false;
                    state.cancelado = true;
                    state.reprogramacion = false;
                }
            };

            if (state.detallar === true) {
                let horaFin: any = global.assign({
                    ID: 99999,
                    Clave: new Date(ordenTrabajo.Agenda.FechaFin).toLocaleTimeString("en-US"),
                    Nombre: ""
                });


                Forms.reset(DETALLES_CITA);
                Forms.updateFormElement(DETALLES_CITA, "Motivo", ordenTrabajo.AgendaDetalle.Motivo);
                Forms.updateFormElement(DETALLES_CITA, "FechaInicio", ordenTrabajo.Agenda.FechaInicio);
                Forms.updateFormElement(DETALLES_CITA, "FechaFin", ordenTrabajo.Agenda.FechaFin);
                Forms.updateFormElement(DETALLES_CITA, "HoraFIN", horaFin);
                Forms.updateFormElement(DETALLES_CITA, "Observaciones", ordenTrabajo.AgendaDetalle.Observaciones);
                Forms.updateFormElement(DETALLES_CITA, "EstatusAgenda", ordenTrabajo.Agenda.EstatusAgenda);
                Forms.updateFormElement(DETALLES_CITA, "FechaInicioTrabajo", ordenTrabajo.FechaInicio);
                Forms.updateFormElement(DETALLES_CITA, "FechaFinTrabajo", ordenTrabajo.FechaFin);
                Forms.updateFormElement(DETALLES_CITA, "FechaInicioSeguimiento", ordenTrabajo.FechaInicio);
                this.nuevoHorarioSeguimiento(DETALLES_CITA);

            } else {
                let fechaActual: Date = new Date();
                let fechaPropuesta: Date;
                fechaActual = global.FechaPropuesta(fechaActual, 1);
                fechaPropuesta = global.FechaPropuesta(fechaActual, 1);
                Forms.reset(DETALLES_CITA);
                Forms.updateFormElement(DETALLES_CITA, "FechaInicio", fechaActual);
            };

            //Actualizamos el Estado DetalleCteAgendaEdit
            Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", item);
            global.dispatchSuccessful("load::KontrolFileParametersCurrentEntityType", { data: "SPVAgendaContratista" });
            global.dispatchSuccessful("load::KontrolFileParametersCurrentEntity", ordenTrabajo);

            this.props.config.setState(state, PAGE_ID);
        };
        diasVencidos(newDate: Date) {
            let fecha = new Date();
            let fechaString = fecha.getFullYear() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getDate();
            let fechaString2 = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
            let nfecha = new Date(fechaString);
            let nfecha2 = new Date(fechaString2);
            let n1 = nfecha.getTime();
            let n2 = nfecha2.getTime()
            let vencidos = (n1 - n2) / 1000 / 60 / 60 / 24;
            return vencidos;
        }
        //Botones de Estatus
        onSelectBotonEstatus(Estatus?: any): void {
            let item: any = Forms.getValue("DetalleCteAgendaEdit", SECTION_CAPTURA_INFO);
            //console.log(item);
            let fechaInicio: any = Forms.getValue("FechaInicio", DETALLES_CITA);
            let motivoProceso: any = Forms.getValue("Motivo", DETALLES_CITA);

            let observaciones: any = Forms.getValue("Observaciones", DETALLES_CITA);
            if (observaciones === undefined) {
                observaciones = "";
            };

            let tituloMotivo: any = "";
            //let tipoAgendaCLave: any = item.OrdenTrabajo.Agenda.TipoAgenda.Clave ? item.OrdenTrabajo.Agenda.TipoAgenda.Clave : null
            let IdUsuarioAsignado: any = item.OrdenTrabajo.IdContratista ? item.OrdenTrabajo.IdContratista : null;
            let horaFin: any = Forms.getValue("HoraFIN", DETALLES_CITA);
            let horaFinClave: string = !(horaFin && horaFin.Clave) ? null : horaFin.Clave;

            if (Estatus === "REP") {
                if (horaFinClave === undefined || horaFinClave === null) {
                    global.warning("Debe Indicar la Hora Fin");
                    return;
                };

                var timePat = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$";
                var matchArray = horaFinClave.match(timePat);
                if (matchArray == null) {
                    return;
                };
            } else {
                if (horaFinClave === undefined || horaFinClave === null) {
                    horaFinClave = "00:00"
                };
            };

            var fechaProcesar = new Date(fechaInicio);
            var pad: string = "00";
            horaFinClave = horaFinClave + ":00.000";

            let fechaFin: Date = new Date(fechaProcesar.getFullYear() + "-" + (pad + (fechaProcesar.getMonth() + 1).toString()).slice(-pad.length) + "-" + (pad + fechaProcesar.getDate().toString()).slice(-pad.length) + " " + horaFinClave);
            let agendaState: AgendaState = new AgendaState(global.getData(this.props.agendaState));
            let idAgendaDetalle: any = item.OrdenTrabajo.AgendaDetalle.ID;

            if (Estatus === "REP" || Estatus === "CAN") {
                tituloMotivo = "Cancelación";
                if (Estatus === "REP") {
                    tituloMotivo = "Reprogramación";
                };
                if (!(motivoProceso && motivoProceso.ID)) {
                    global.warning("Debe indicar el motivo de " + tituloMotivo);
                    return;
                };
            };

            let estatusAgenda: any = global.assign({ ID: -1, Clave: Estatus });

            //Estatus Atendido
            if (Estatus === "ATE") {
                let fechaInicioTrabajo: any = Forms.getValue("FechaInicioTrabajo", DETALLES_CITA);
                let fechaFinTrabajo: any = Forms.getValue("FechaFinTrabajo", DETALLES_CITA);

                if (!this.equalDates(fechaInicioTrabajo, fechaFinTrabajo, "<=")) {
                    warning("La fecha fin del trabajo no puede ser menor a la fecha inicial del trabajo. ");
                    return;
                };

                EK.Global.confirm("Presione Confirmar ", "Atender Cita", () => {
                    dispatchSuccessful('load::TipoAccionAgendaReload', 'ATE')
                    item.OrdenTrabajo.Agenda = global.assign(item.OrdenTrabajo.Agenda, {
                        IdAgendaDetalle: idAgendaDetalle,
                        EstatusAgenda: estatusAgenda,
                        FechaInicio: fechaInicio,
                        FechaFin: fechaFin,
                        TipoAgenda: this.props.tipoAgenda
                    });

                    item.OrdenTrabajo = global.assign(item.OrdenTrabajo, {
                        FechaInicio: fechaInicioTrabajo,
                        FechaFin: fechaFinTrabajo
                    });

                    item.OrdenTrabajo.AgendaDetalle = global.assign(item.OrdenTrabajo.AgendaDetalle, {
                        Observaciones: observaciones,
                        IdUsuarioAsignado: IdUsuarioAsignado
                    });

                    this.props.saveAgenda(item);
                });
            };

            //Estatus Reprogramado
            if (Estatus === "REP") {
                dispatchSuccessful('load::TipoAccionAgendaReload', 'REP')
                if (this.equalDates(fechaFin, fechaInicio, "<=")) {
                    warning("La hora fin no puede ser menor o igual a la hora de inicio ");
                    return;
                };

                EK.Global.confirm("Presione Confirmar para Reprogramar la Planificación", "Reprogramar Planificación", () => {
                    agendaState.reprogramacion = true;
                    let fechaInicioReprog: string = new Date(fechaInicio.getTime() - (fechaInicio.getTimezoneOffset() * 60000)).toISOString();
                    let fechaFinReprog: string = new Date(fechaFin.getTime() - (fechaFin.getTimezoneOffset() * 60000)).toISOString();

                    item.OrdenTrabajo.Agenda = global.assign(item.OrdenTrabajo.Agenda, {
                        IdAgendaDetalle: idAgendaDetalle,
                        EstatusAgenda: estatusAgenda,
                        FechaInicio: fechaInicioReprog,
                        FechaFin: fechaFinReprog,
                        TipoAgenda: this.props.tipoAgenda
                    });

                    item.OrdenTrabajo.AgendaDetalle = global.assign(item.OrdenTrabajo.AgendaDetalle, {
                        IdMotivo: motivoProceso.ID,
                        Observaciones: observaciones,
                        IdUsuarioAsignado: IdUsuarioAsignado
                    });

                    //console.log(item)
                    this.props.saveAgenda(item);
                });
            };

            //Estatus Cancelado
            if (Estatus === "CAN") {
                EK.Global.confirm("Presione Confirmar para Cancelar esta Planificación ", "Cancelar Planificación", () => {
                    dispatchSuccessful('load::TipoAccionAgendaReload', 'CAN');
                    agendaState.cancelado = true;

                    item.OrdenTrabajo.Agenda = global.assign(item.OrdenTrabajo.Agenda, {
                        IdAgendaDetalle: idAgendaDetalle,
                        EstatusAgenda: estatusAgenda,
                        TipoAgenda: this.props.tipoAgenda
                    });

                    item.OrdenTrabajo.AgendaDetalle = global.assign(item.OrdenTrabajo.AgendaDetalle, {
                        IdMotivo: motivoProceso.ID,
                        Observaciones: observaciones,
                        IdUsuarioAsignado: IdUsuarioAsignado
                    });

                    this.props.saveAgenda(item);
                });
            };

            //Estatus Change Contratista
            if (Estatus === "CAN") {
                EK.Global.confirm("Presione Confirmar para Cancelar esta Planificación ", "Cancelar Planificación", () => {
                    dispatchSuccessful('load::TipoAccionAgendaReload', 'CAN');
                    agendaState.cancelado = true;

                    item.OrdenTrabajo.Agenda = global.assign(item.OrdenTrabajo.Agenda, {
                        IdAgendaDetalle: idAgendaDetalle,
                        EstatusAgenda: estatusAgenda,
                        TipoAgenda: this.props.tipoAgenda
                    });

                    item.OrdenTrabajo.AgendaDetalle = global.assign(item.OrdenTrabajo.AgendaDetalle, {
                        IdMotivo: motivoProceso.ID,
                        Observaciones: observaciones,
                        IdUsuarioAsignado: IdUsuarioAsignado
                    });

                    this.props.saveAgenda(item);
                });
            };

            this.props.config.setState(agendaState, PAGE_ID);
        };
        footerAtencionCita(): JSX.Element {
            return null;
        };
        headerPersonalized(info: any): JSX.Element {
            if (info != undefined || info != null) {
                return <div>
                    <span >
                        <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info["titulo"]}</h6>
                    </span>
                    <span className="badge badge-info" ><i className={info["iconoAgenda"]} style={{ height: "22px", marginTop: "-17px" }}></i>  {info["nombreAgenda"]} </span>
                    <span><span className="badge badge-success">{info["ContratistaID"]}</span>&nbsp;{info["ContratistaNombre"]}</span>
                </div>
            } else {
                return <div></div>;
            }
        };
        footerProgramacionMasiva(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Aceptar</button>
                <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        headerPersonalizedProgramacionMasiva(info: any): JSX.Element {
            if (info != undefined || info != null) {
                return <div>
                    <span >
                        <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info}</h6>
                    </span>
                </div>
            } else {
                return <div></div>;
            }
        };
        onCancel(): void {
            Forms.remove(SECTION_CONCEPTO_ID);
            if (this.props.config) {
                this.props.config.setState({ viewMode: true }, SECTION_CONCEPTO_ID);
            }
        };
        onReserve(info: any, button: any): void {
            this.props.config.setState({ viewMode: false }, SECTION_CONCEPTO_ID)
            this.props.config.setEntity(info, SECTION_CONCEPTO_ID);

            if (info.Reservas) {
                this.props.config.setCatalogo(info.Reservas, PAGE_ORDEN_TRABAJO_RESERVA_ID);
            } else {
                this.props.config.clearCatalogo(PAGE_ORDEN_TRABAJO_RESERVA_ID);
            };
        };
        onSave(config: page.IPageConfig): void {
            let item: DataElement = config.getEntity(SECTION_CONCEPTO_ID);
            let entidad: any = global.getData(item);
            //
            let entidades: DataElement = Forms.getValue(PAGE_ORDEN_TRABAJO_RESERVA_ID, SECTION_CONCEPTO_ID);
            if (!entidades) {
                entidades = global.createSuccessfulStoreObject([]);
            }
            else if (entidades.data.length > 0) {
                for (const f of entidades.data) {
                    let _fecha = new Date(f.FechaInicio);
                    f.FechaInicio = _fecha;
                }
            }

            //
            let retValue: DataElement = this.props.contratistaOTAgenda;
            if (!retValue) {
                retValue = global.createSuccessfulStoreObject([]);
            };
            //
            let items: any[] = global.getData(retValue, []);
            if (items && items.length > 0) {
                for (let i = 0; i < items.length; i++) {
                    let value: any = global.assign({}, items[i]);
                    if (value.IdOrdenTrabajo === entidad.IdOrdenTrabajo) {
                        let _item: any = global.assign({}, value);
                        _item.Reservas = global.getData(entidades);
                        retValue = retValue.upsertItem(_item);
                        break;
                    };
                };
            };
            //
            if (retValue && global.isSuccessful(retValue)) {
                Forms.updateFormElement(SECTION_CAPTURA_INFO, "ContratistaOTAgendaEdit", retValue.data);
            };
            //
            config.setState({ viewMode: true }, SECTION_CONCEPTO_ID);
        };
        onUpdateAgendaClick() {
            let entidades: any[] = global.getData(this.props.detCita, []) as any[];
            if (!(entidades && entidades.length > 0)) {
                global.warning("Para realizar este proceso debe tener definida las OT a planificar");
                return;
            };
            //
            let tipoAgenda: any;
            let tipoAgendaCG: DataElement = global.getStateItem("global.TipoAgenda") as DataElement;
            if (tipoAgendaCG && global.isSuccessful(tipoAgendaCG)) {
                let tiposAgenda: any[] = global.getData(tipoAgendaCG, []);
                if (tiposAgenda && tiposAgenda.length > 0) {
                    let items: any[] = tiposAgenda.filter((value) => { return value.Clave === "ContratistaAreasComunes" }) as any[];
                    if (items && items.length > 0) {
                        tipoAgenda = items[0];
                    };
                };
            };
            //
            let idTipoAgenda: number = tipoAgenda ? Number(tipoAgenda.ID) : null;
            let idContratista: string = (entidades[0].OrdenTrabajo.IdContratista).toString();
            //
            let p: any = global.assign({
                activos: 1,
                TipoAgenda: idTipoAgenda,
                IdPlaza: "-2",
                ClaveEstado: "TODOS",
                UsuarioSeleccionado: idContratista,
                FuncionAgenda: "Contratista",
                CalendarComplete: "SI",
                FechaInicio: new Date()
            });

            //console.log(p);
            global.dispatchSuccessful('load::ParametrosCalendarioFromAgenda', p);
            
            global.dispatchAsyncPost("load::AgendaNewCalendasUser", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
        };

        obtenerParametrosBusqueda(fini, ffin?: null) {
            try {
                let funcionAgenda: string = getData(EK.Store.getState().global.funcionAgenda).tipo;
                let pageId: string;
                switch (funcionAgenda) {
                    case "PostVenta": pageId = "Agenda"; break;
                    case "Contratista": pageId = "AgendaAreasComunes"; break;
                };
                let idTipoAgenda: any = Forms.getValue("TipoAgenda", pageId) && Forms.getValue("TipoAgenda", pageId).Clave ? Forms.getValue("TipoAgenda", pageId) : null;
                let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", pageId) && Forms.getValue("PlazaInicial", pageId).ID ? Forms.getValue("PlazaInicial", pageId).ID : null;
                idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
                idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
                let usuarioSeleccionado: any = EK.Store.getState().global.UsuarioAgendaSelected && getData(EK.Store.getState().global.UsuarioAgendaSelected).item && getData(EK.Store.getState().global.UsuarioAgendaSelected).item.ID ? getData(EK.Store.getState().global.UsuarioAgendaSelected).item.ID : null;
                let estadoSeleccionado: any = EK.Store.getState().global.EstatusAgendaSelected ? getData(EK.Store.getState().global.EstatusAgendaSelected).Clave : null;
                estadoSeleccionado = EK.Store.getState().global.UsuarioAgendaSelected && getData(EK.Store.getState().global.UsuarioAgendaSelected).item && getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action && getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action != undefined ? getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action : estadoSeleccionado;

                let p: any = global.assign({
                    activos: 1,
                    TipoAgenda: idTipoAgenda.ID,
                    IdPlaza: idPlazaSeleccionada,
                    ClaveEstado: estadoSeleccionado,
                    UsuarioSeleccionado: usuarioSeleccionado,
                    FuncionAgenda: funcionAgenda,
                    FechaInicio: fini,
                    FechaFin: ffin
                });
                return p;
            } catch (ex) { return null }
        }
        resetCalendarTab() {
            dispatchDefault('load::ParametrosCalendarioFromAgenda', [])
            dispatchDefault('load::AgendaNewCalendasUser', [])
            //console.log('calendario nuevo');
        }
        render(): JSX.Element {
            let $page: any = $ml[config.id];
            let agendaState: AgendaState = new AgendaState(global.getData(this.props.agendaState));
            let DetallesCita: any[] = getData(this.props.detCita);
            let fechaInicio: Date;
            let fechaFin: Date;
            let infoHeader: any;
            let tituloTab: any = null;
            let reserve: boolean = false;

            if (agendaState.atendido === true) {
                tituloTab = 'Atención';
            } else if (agendaState.cancelado === true) {
                tituloTab = "Cancelado";
            } else if (agendaState.reprogramado === true) {
                tituloTab = "Reprogramación";
            } else if (agendaState.detallar === true) {
                tituloTab = "Visualización";
            }
            let tipoAgenda: any = Forms.getValue("TipoAgenda", "AgendaNew");
            if ((DetallesCita) && DetallesCita.length > 0) {
                let detalleCita: any = DetallesCita[0];
                if (detalleCita && detalleCita.OrdenTrabajo) {
                    fechaInicio = detalleCita.OrdenTrabajo.Agenda.FechaInicio as Date;
                    fechaFin = detalleCita.OrdenTrabajo.Agenda.FechaInicio as Date;
                    infoHeader = { titulo: "Información de la Planificación", nombreAgenda: detalleCita.OrdenTrabajo.Agenda.TipoAgenda.Nombre, claveAgenda: detalleCita.OrdenTrabajo.Agenda.TipoAgenda.Icono, ContratistaID: detalleCita.OrdenTrabajo.Contratista.ID, ContratistaNombre: detalleCita.OrdenTrabajo.Contratista.Nombre };
                }
            }

            //
            if (!fechaInicio) {
                fechaInicio = global.getToday(true);
            };
            //        
            if (!fechaFin) {
                fechaFin = global.getToday(true);
            };
            //
            let atendido: any = {
                icon: "fa fa-check",
                info: "",
                titulo: "Atender Cita",
                style: "color: #8bc780",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {

                    this.onSelectDetalleCita(item, "ATE");
                }
            };
            //
            let reprogramado: any = {
                icon: "icon-loop",
                info: "",
                titulo: "Reprogramar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let p: any = global.assign({
                        Motivo: "REP",
                        Uso: "Contratista"
                    });
                    dispatchAsyncPost("load::SPVMOTIVOS", "CapturaFechaConstruccion/GetMotivosReprogramacion/", { parametros: p });
                    this.onSelectDetalleCita(item, "REP");
                }
            };

            let verInformacion: any = {
                icon: "fa fa-list-alt",
                info: "",
                titulo: "Ver Información",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelectDetalleCita(item, "VER");
                }
            };

            let cambiarContratista: any = {
                icon: "fa fa-users",
                info: "",
                titulo: "Cambiar Contratista",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelectNewContratista(item, "VER");
                }
            };

            let reservedInformation: any = {
                icon: "fas fa-layer-group",
                info: "",
                titulo: "Reservado",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    //this.onSelectDetalleCita(item, "VER");
                    reserve = true;
                    EK.Global.info("Esta planificación es de tipo RESERVA ");
                    // return;
                }
            };
            //
            let cancelado: any = {
                icon: "far fa-calendar-times",
                info: "",
                titulo: "Cancelar",
                color: "#df0707",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let p: any = global.assign({
                        Motivo: "CAN",
                        Uso: "Contratista"
                    });
                    dispatchAsyncPost("load::SPVMOTIVOS", "CapturaFechaConstruccion/GetMotivosReprogramacion/", { parametros: p });
                    this.onSelectDetalleCita(item, "CAN");
                }
            };
            //
            let edit: any = {
                icon: "icon-pencil",
                titulo: "Editar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    global.fixJsonDates(item);

                    Forms.remove(id);
                    Forms.updateFormElements(id, item);

                    config.setEntity(item, id);
                    config.setState({ viewMode: false }, id);
                }
            };
            // console.log(agendaState);
            return <div>
                <agendaRUBA.OrdenTrabajoModalAreasComunes />
                {/* PROGRAMACIÓN MASIVA DE ENTREGA DE VIVIENDA  */}
                <modal.Modal id="modalAgendaContratista" header={this.headerPersonalizedProgramacionMasiva("Planificación de Ordenes de Trabajo")} footer={this.footerProgramacionMasiva()} addDefaultCloseFooter={false}>
                    <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                        <Column size={[12, 12, 12, 12]}>
                            <Row>
                                <page.OptionSection
                                    id={PAGE_CONTRATISTA_ID}
                                    subTitle={"Filtrar Información"}
                                    level={2}
                                    icon="icon-folder"
                                    collapsed={false}>
                                    <SectionButtons>
                                        <ButtonSearch onClick={this.onSearch.bind(this)} />
                                    </SectionButtons>
                                    <Row>
                                        <PlazasDDL id="PlazaInicial" size={[12, 12, 4, 4]} label="Plaza" idFormSection={PAGE_CONTRATISTA_ID} required={true} validations={[validations.required()]} />
                                        <SPVContratistasDDL id="Contratista" size={[12, 12, 8, 8]} idFormSection={PAGE_CONTRATISTA_ID} required={true} validations={[validations.required()]} />
                                    </Row>
                                </page.OptionSection>
                            </Row>
                        </Column>
                        <Column size={[12, 12, 12, 12]}>
                            <Row>
                                <OptionSection
                                    title="Ordenes de Trabajo Disponibles"
                                    id={SECTION_CAPTURA_INFO}
                                    icon="fa fa-table"
                                    onSave={null}
                                    level={1}
                                    collapsed={false}>
                                    <PanelUpdate info={this.props.data}>
                                        <List
                                            items={global.getData(this.props.data)}
                                            readonly={true}
                                            addRemoveButton={false}
                                            dragAndDrop={false}
                                            horizontalScrolling={true}
                                            height={"450px"}
                                            listHeader={<Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header" style={{ width: 55 }}>&nbsp;</Column>
                                                    <Column size={[2, 2, 2, 2]} className="list-center-header">{"#Folio/#OT"}</Column>
                                                    <Column size={[5, 5, 5, 5]} className="list-default-header">{"Cliente"}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación"}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header">{"Creado"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                                                    <Column size={[5, 5, 5, 5]} className="list-default-header">{"Observaciones"}</Column>
                                                </Row>
                                            </Column>}
                                            formatter={(index: number, item: any) => {
                                                return <Row style={{ margin: 0 }}>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-default-header" style={{ margin: "-22px 0px", width: 55 }}><checkBox.CheckBox idFormSection={"FormularioViviendasMasivas"} id={"CheckSeleccion_" + item.ID} value={false} initialValue={false} change={(value: any) => this.onSelectCalendar(item, value)} size={[1, 1, 1, 1]} /></Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                                                        <span className="badge badge-success bold">
                                                            <a onClick={(e) => { window.open(["#/scv/pv/reporteFallasAreasComunes/", item.IdFolio].join(""), '_blank') }} style={{ color: "white" }}>{item.IdFolio}</a>
                                                        </span>&nbsp;/&nbsp;
                                                        <span className="badge badge-info bold">
                                                            <a rel="noopener noreferrer" href="javascript:void(0)" style={{ color: "white" }} onClick={(value) => { agendaRUBA.onOrdenTrabajoClickAreasComunes(item.IdOrdenTrabajo) }}>{item.IdOrdenTrabajo}</a>
                                                        </span>
                                                    </Column>
                                                    <Column size={[5, 5, 5, 5]} className="listItem-default-header listItem-overflow">{!(item.Cliente) ? null : <span><span className="badge badge-success bold">{item.Cliente.ID}</span>&nbsp;{item.Cliente.Nombre}</span>}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-default-header">{!(item.Ubicacion) ? null : <span className="badge badge-info bold">{item.Ubicacion.ClaveFormato}</span>}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="listItem-default-header listItem-overflow">{!(item.OrdenTrabajo && item.OrdenTrabajo.Contratista) ? null : <span><span className="badge badge-success">{item.OrdenTrabajo.Contratista.ID}</span>&nbsp;{item.OrdenTrabajo.Contratista.Descripcion}</span>}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-default-header">{global.formatDateTimeDirect(item.Creado)}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-default-header">{!(item.OrdenTrabajo && item.OrdenTrabajo.EstatusOrdenTrabajo) ? null : <span className="badge badge-info bold">{item.OrdenTrabajo.EstatusOrdenTrabajo.Nombre}</span>}</Column>
                                                    <Column size={[5, 5, 5, 5]} className="listItem-default-header listItem-overflow">{item.OrdenTrabajo.Observaciones}</Column>
                                                </Row>
                                            }} />
                                    </PanelUpdate>
                                </OptionSection>
                            </Row>
                        </Column>
                    </Row>
                </modal.Modal>
                {/* ATENCIÓN DE LA CITA PLANIFICADA */}

                <modal.Modal id="modalAgendaInformacionCita" header={this.headerPersonalized(infoHeader)} addDefaultCloseFooter={false} footer={<div className="modal-footer">
                    {agendaState.atendido === true && !agendaState.detallar ? global.isUpdating(this.props.agendaActualizada) ? <div style={{ position: "relative", float: "right", right: "119px" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} /></div> : <Button size={[2, 2, 2, 2]} visible={agendaState.atendido} className="btn btn-md btn-editing" style={{ backgroundColor: "#69b65c", color: "#FFFFFF" }} icon="fa fa-check" onClick={() => this.onSelectBotonEstatus("ATE")} > Atender Cita</Button> : null}
                    {agendaState.reprogramado === true && !agendaState.detallar ? global.isUpdating(this.props.agendaActualizada) ? <div style={{ position: "relative", float: "right", right: "119px" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} /></div> : <Button size={[6, 6, 6, 6]} visible={agendaState.reprogramado} className="btn btn-md btn-editing" style={{ backgroundColor: "#659be0", color: "#FFFFFF" }} icon="icon-loop" onClick={() => this.onSelectBotonEstatus("REP")} > Reprogramar</Button> : null}
                    {agendaState.cancelado === true && !agendaState.detallar ? global.isUpdating(this.props.agendaActualizada) ? <div style={{ position: "relative", float: "right", right: "119px" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} /></div> : <Button size={[2, 2, 2, 2]} visible={agendaState.cancelado} className="btn btn-md btn-editing" style={{ backgroundColor: "#eb6969", color: "#FFFFFF" }} icon="fa fa-times-circle" onClick={() => this.onSelectBotonEstatus("CAN")} > Cancelar</Button> : null}
                    <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md RED" data-dismiss="modal">Cerrar</button>
                </div>}>
                    <Row>
                        <Column size={[12, 12, 12, 12]} style={{ overflowY: "scroll", height: "450px" }}>
                            <Row>
                                <Column size={[12, 12, 12, 6]}>
                                    <Column size={[12, 12, 12, 12]}>
                                        <OptionSection
                                            title="Detalles Cliente"
                                            id={DETALLES_CITA}
                                            icon="fa fa-table"
                                            onSave={null}
                                            level={2}
                                            collapsed={false}>
                                            <PanelUpdate info={this.props.detCita}>
                                                <List
                                                    items={getData(this.props.detCita)}
                                                    readonly={false}
                                                    addRemoveButton={false}
                                                    dragAndDrop={false}
                                                    height={"200px"}
                                                    horizontalScrolling={true}
                                                    listHeader={<Column size={[12, 12, 12, 12]} className="fixheaderlist">
                                                        <Row>
                                                            <Column size={[3, 3, 3, 3]} className="list-default-header bold">{"#Folio/#OT"}</Column>
                                                            <Column size={[9, 9, 9, 9]} className="list-default-header bold">{"Cliente"}</Column>
                                                            <Column size={[3, 3, 6, 6]} className="list-default-header bold">{"Fraccionamiento"}</Column>
                                                            <Column size={[3, 3, 3, 3]} className="list-default-header bold">{"Creado"}</Column>
                                                            <Column size={[3, 3, 3, 3]} className="list-default-header bold">{"Estatus"}</Column>
                                                            <Column size={[6, 6, 6, 6]} className="list-default-header bold">{"Observaciones"}</Column>
                                                            <Column size={[1, 1, 1, 1]} className="list-default-header bold center">&nbsp;</Column>
                                                        </Row>
                                                    </Column>}
                                                    formatter={(index: number, item: any) => {
                                                        return <Row style={{ margin: 0 }}>
                                                            <Column size={[3, 3, 3, 3]} className="listItem-center-header">
                                                                <span className="badge badge-success bold">
                                                                    <a onClick={(e) => { window.open(["#/scv/pv/reporteFallasAreasComunes/", item.IdFolio].join(""), '_blank') }} style={{ color: "white" }}>{item.IdFolio}</a>
                                                                </span>&nbsp;/&nbsp;
                                                                <span className="badge badge-info bold">
                                                                    <a rel="noopener noreferrer" href="javascript:void(0)" style={{ color: "white" }} onClick={(value) => { agendaRUBA.onOrdenTrabajoClickAreasComunes(item.IdOrdenTrabajo) }}>{item.IdOrdenTrabajo}</a>
                                                                </span>
                                                            </Column>
                                                            {
                                                                item.UsuarioReporta === "PorCliente" ?
                                                                    <Column size={[6, 6, 6, 6]} className="listItem-default-header listItem-overflow">{!(item.Cliente) ? null : <span><span className="badge badge-success bold">{item.Cliente.ID}</span>&nbsp;{item.Cliente.Nombre}</span>}</Column>
                                                                    : null
                                                            }
                                                            {
                                                                item.UsuarioReporta === "PorColaborador" ?
                                                                    <Column size={[6, 6, 6, 6]} className="listItem-default-header listItem-overflow">{!(item.Usuario) ? null : <span><span className="badge badge-success bold">{item.Usuario.ID}</span>&nbsp;{item.Usuario.Nombre}</span>}</Column>
                                                                    : null
                                                            }
                                                            {
                                                                item.UsuarioReporta === "PorAnonimo" ?
                                                                    <Column size={[6, 6, 6, 6]} className="listItem-default-header listItem-overflow"> <span><span className="badge badge-success bold">999999</span>&nbsp; Anonimo </span></Column>
                                                                    : null
                                                            }
                                                            <Column size={[3, 3, 6, 6]} className="listItem-default-header listItem-overflow">{!(item.Ubicacion) ? null : <span className="badge badge-info bold">{item.Ubicacion.Descripcion}</span>}</Column>
                                                            <Column size={[3, 3, 3, 3]} className="listItem-default-header listItem-overflow">{global.formatDateTimeDirect(item.Creado)}</Column>
                                                            <Column size={[3, 3, 3, 3]} className="listItem-default-header listItem-overflow">{!(item.OrdenTrabajo && item.OrdenTrabajo.EstatusOrdenTrabajo) ? null : <span className="badge badge-info bold">{item.OrdenTrabajo.EstatusOrdenTrabajo.Nombre}</span>}</Column>
                                                            <Column size={[6, 6, 6, 6]} className="listItem-default-header listItem-overflow">{item.OrdenTrabajo != undefined && item.OrdenTrabajo.Observaciones != undefined ? item.OrdenTrabajo.Observaciones : null}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header listItem-overflow" style={{ overflow: "unset", position: "sticky", right: 0, zIndex: 20, backgroundColor: "white" }}>
                                                                {(() => {
                                                                    switch (item.Reserva) {
                                                                        case false: // ACTIVA
                                                                        //return <buttons.PopOver idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[verInformacion]} />;
                                                                        case null: // ACTIVA
                                                                        case undefined:
                                                                            switch (item.OrdenTrabajo.Agenda.EstatusAgenda.Clave) {
                                                                                case "ACT": // ACTIVA
                                                                                    if (agendaState && agendaState.action === "REPROGRAMACION") {
                                                                                        return <buttons.PopOver style={{ marginTop: 15 }} idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[atendido, reprogramado, cancelado, cambiarContratista]} />;
                                                                                    } else {
                                                                                        if (item.TipoAgenda && item.TipoAgenda.Clave === 'FechaConstruccion') {
                                                                                            return <buttons.PopOver style={{ marginTop: 15 }} idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[atendido, reprogramado, cambiarContratista]} />;
                                                                                        } else {
                                                                                            return <buttons.PopOver style={{ marginTop: 15 }} idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[atendido, reprogramado, cancelado, cambiarContratista]} />;
                                                                                        }
                                                                                    }
                                                                                case "SUS": // SUSPENDIDA
                                                                                    return <buttons.PopOver style={{ marginTop: 15 }} idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[reprogramado]} />;
                                                                                case "ATE": // ATENDIDA
                                                                                    return <buttons.PopOver style={{ marginTop: 15 }} idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[verInformacion]} />;
                                                                                case "REP": // REPROGRAMADA
                                                                                    return <buttons.PopOver style={{ marginTop: 15 }} idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[verInformacion]} />;
                                                                                case "CAN": // CANCELADA
                                                                                    return <buttons.PopOver style={{ marginTop: 15 }} idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[verInformacion]} />;
                                                                                default:
                                                                                    return null;
                                                                            }
                                                                        case true:
                                                                            return <buttons.PopOver style={{ marginTop: 15 }} idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[reservedInformation]} />;
                                                                    }
                                                                })()}
                                                            </Column>
                                                        </Row>
                                                    }} />
                                            </PanelUpdate>
                                            {/*<div className="tab-pane" id="tab_historico_reprogramaciones">
                                                <h4>Listado de Reprogramaciones</h4>
                                                <ViewHistoricoReprogramaciones />
                                            </div>*/}
                                        </OptionSection>
                                    </Column>
                                </Column>
                                <Column size={[12, 12, 12, 6]}>
                                    {tituloTab !== null ?
                                        <div className="tabbable-line">
                                            <ul className="nav nav-tabs ">
                                                {reserve === false || reserve === undefined && agendaState.changeContratista == false ?
                                                    <li className="active">
                                                        <a href="#tab_proceso_contratista_proceso" data-toggle="tab" aria-expanded="true"> {tituloTab} </a>
                                                    </li> : null}
                                                {agendaState.reprogramacion === true ?
                                                    <li className="" onClick={this.resetCalendarTab.bind(this)}>
                                                        <a href="#tab_agenda_calendar" data-toggle="tab" aria-expanded="false"> Calendario </a>
                                                    </li>
                                                    : null}
                                                {agendaState.detallar === true &&
                                                    agendaState.atendido === true ?
                                                    <li className="">
                                                        <a href="#tab_segumiento" data-toggle="tab" aria-expanded="true"> Seguimiento </a>
                                                    </li>
                                                    : null}
                                                {agendaState.changeContratista === false ?
                                                    <li className="">
                                                        <a href="#tab_historico_reprogramaciones" data-toggle="tab" aria-expanded="true"> Reprogramaciones </a>
                                                    </li>
                                                    : null}
                                                <li className={reserve === false || reserve === undefined ? "" : "active"}>
                                                    <a href="#tab_citas_multiples" data-toggle="tab" aria-expanded="true"> Citas Múltiples </a>
                                                </li>
                                                {agendaState.changeContratista === true ?
                                                    <li className="">
                                                        <a href="#tab_change_contratista" data-toggle="tab" aria-expanded="false"> Cambiar Contratista </a>
                                                    </li>
                                                    : null}
                                                {/*       noooooooe liminar esto es patra activar la función de las notas y origen de la cita
                                                <li className=""> 
                                                    <a href="#tab_proceso_contratista_notas" data-toggle="tab" aria-expanded="true"> Notas </a>
                                                </li>
                                                <li className="">
                                                    <a href="#tab_proceso_cocntratista_origen" data-toggle="tab" aria-expanded="false"> Origen </a>
                                                </li>
                                                */}
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="tab_proceso_contratista_proceso">
                                                    {agendaState.filtrado === true ?
                                                        <Column size={[12, 12, 12, 12]}>
                                                            {agendaState.reprogramacion === true || agendaState.cancelado === true ?
                                                                agendaState.detallar === true ?
                                                                    <label.Entidad id="Motivo" idForm={DETALLES_CITA} label="Motivo" size={[12, 12, 12, 12]} /> :
                                                                    <MotivosreprogDDL id="Motivo" label="Motivo" size={[12, 12, 12, 12]} idFormSection={DETALLES_CITA} validations={[validations.required()]} required={true} /> : null
                                                            }
                                                            {agendaState.reprogramacion === true ?
                                                                agendaState.detallar === true ?
                                                                    <label.FechaHora id="FechaInicio" idForm={DETALLES_CITA} label="FECHA INICIO" value={(item: any, entidad: any) => {
                                                                        return global.formatDateTimeDirect(item, true);
                                                                    }} size={[12, 12, 6, 6]} /> :
                                                                    <DatePicker id="FechaInicio" label="FECHA INICIO" minuteStep={30} startDays={undefined} hoursDisabled={[0, 1, 2, 3, 4, 5, 6, 21, 22, 23, 24]} type="datetime" idFormSection={DETALLES_CITA} value={global.getToday()} size={[12, 12, 12, 6]} validations={[validations.required()]} required={true} /> : null
                                                            }
                                                            {agendaState.reprogramacion === true ?
                                                                agendaState.detallar === true ?
                                                                    <label.Entidad id="HoraFIN" idForm={DETALLES_CITA} label="HORA FIN" size={[12, 12, 6, 6]} /> :
                                                                    <SPVHorariosAtencionDDL id="HoraFIN" idFormSection={DETALLES_CITA} validations={[validations.required()]} size={[12, 12, 12, 6]} /> : null
                                                            }
                                                            {agendaState.detallar === true ?
                                                                <label.Label id="Observaciones" idForm={DETALLES_CITA} label="Observaciones" size={[12, 12, 12, 12]} /> :
                                                                <input.Text id="Observaciones" label="Observaciones" size={[12, 12, 12, 12]} maxLength={250} rowspan={250} idFormSection={DETALLES_CITA} required={false} />
                                                            }
                                                            {agendaState.atendido === true ?
                                                                agendaState.detallar === true ?
                                                                    <label.FechaHora id="FechaInicioTrabajo" idForm={DETALLES_CITA} label="Inicio Estimado Trabajo" size={[12, 12, 6, 6]} /> :
                                                                    <DatePicker id="FechaInicioTrabajo" label="Inicio Estimado Trabajo" idFormSection={DETALLES_CITA} startDays={undefined} hoursDisabled={[]} value={fechaInicio} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} /> : null
                                                            }
                                                            {agendaState.detallar === true &&
                                                                agendaState.atendido === true ?
                                                                <Column className="listItem-center-header" size={[12, 12, 12, 12]} style={{ marginTop: "10px" }}   >
                                                                    <input.Text id="ObservacionSeguimiento" label="Observaciones de Seguimiento" size={[12, 12, 12, 12]} maxLength={250} rowspan={250} idFormSection={DETALLES_CITA} required={true} />
                                                                    <DatePicker id="FechaInicioSeguimiento" label="FECHA INICIO" minuteStep={30} startDays={undefined} hoursDisabled={[0, 1, 2, 3, 4, 5, 6, 21, 22, 23, 24]} type="datetime" idFormSection={DETALLES_CITA} value={global.getToday()} size={[12, 12, 12, 6]} validations={[validations.required()]} required={true} />
                                                                    <SPVHorariosAtencionDDL id="HoraFinSeguimiento" idFormSection={DETALLES_CITA} validations={[validations.required()]} size={[12, 12, 12, 6]} />
                                                                    <Column style={{ marginLeft: "0px", marginTop: "20px", marginBottom: "20px" }}>
                                                                        <Button size={[6, 6, 6, 6]} className="btn btn-md btn-editing" style={{ backgroundColor: '#659be0', color: "#FFFFFF" }} icon="fa fa-angle-double-right" onClick={this.onSaveNewSeguimiento.bind(this)}> Guardar Seguimiento </Button>
                                                                    </Column>
                                                                </Column>
                                                                : null
                                                            }
                                                            <Column size={[12, 12, 12, 12]} style={{ marginTop: "10px" }} >
                                                                {
                                                                    this.props.entity && global.getDataID(this.props.entity) > 0 ?
                                                                        <KontrolFileManager modulo="SPV" entityType={this.props.entityType} tipo="anexos" entity={this.props.entity} viewMode={agendaState.detallar} multiple={true} size={[12, 12, 12, 12]} /> : null
                                                                }
                                                            </Column>
                                                        </Column> : null
                                                    }
                                                </div>
                                                <div className="tab-pane" id="tab_citas_multiples">
                                                    {/*<li className="in">*/}
                                                    {/* <img className="avatar" alt="" src="../assets/layouts/layout/img/avatar1.jpg"> */}
                                                    <div className="message in ">
                                                        <span className="arrow"> </span>
                                                        <span className="datename">  </span>
                                                        <span className="datetime"> </span>
                                                        <span className="body">  </span>
                                                    </div>
                                                    {/*</li>*/}
                                                </div>
                                                <div className="tab-pane" id="tab_segumiento">
                                                    <ViewSeguimientoCita />
                                                </div>
                                                <div className="tab-pane" id="tab_historico_reprogramaciones">
                                                    <ViewHistoricoReprogramaciones />
                                                </div>
                                                <div className="tab-pane" id="tab_change_contratista">
                                                    <Row>
                                                        <SPVContratistasDDL id="Contratista" size={[12, 12, 12, 12]} idFormSection={PAGE_NEW_CONTRATISTA_ID} required={true} validations={[validations.required()]} />
                                                        <Column style={{ marginLeft: "0px", marginTop: "20px", marginBottom: "20px" }}>
                                                            <Button size={[6, 6, 6, 6]} className="btn btn-md btn-editing" style={{ backgroundColor: '#659be0', color: "#FFFFFF" }} icon="icon-loop" onClick={this.onConfirmNewContratista.bind(this)}> Cambiar Contratista </Button>
                                                        </Column>
                                                    </Row>
                                                </div>
                                                <div className="tab-pane" id="tab_proceso_contratista_notas">
                                                    {/*<li className="in">*/}
                                                    {/* <img className="avatar" alt="" src="../assets/layouts/layout/img/avatar1.jpg"> */}
                                                    <div className="message in ">
                                                        <span className="arrow"> </span>
                                                        <span className="datename"> Bob Nilson </span>
                                                        <span className="datetime"> at 20:30 </span>
                                                        <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </span>
                                                    </div>
                                                    {/*</li>*/}
                                                </div>
                                                <div className="tab-pane" id="tab_proceso_contratista_origen"> tres </div>
                                                <div className="tab-pane" id="tab_agenda_calendar">
                                                    <Row>
                                                        <Column style={{ marginLeft: "7px", marginTop: "-27px", marginBottom: "39px" }}>
                                                            <Button size={[4, 4, 4, 4]} className="btn btn-md btn-editing" style={{ backgroundColor: '#8ad48c', color: "#FFFFFF", width: "250px", position: "absolute", right: "40px" }} icon="fas fa-sync-alt" onClick={this.onUpdateAgendaClick.bind(this)}> Actualizar Calendario </Button>
                                                        </Column>
                                                    </Row>
                                                    <Row style={{ marginLeft: "10px", marginRight: "10px", height: "340px", overflow: "overlay" }} >
                                                        <calendar.GlobalAgendaNew id="AgendaNewCalendar" idForm={DETALLES_CITA} applyValuesControl="FechaInicio" minTime="07:00:00" maxTime="20:00:00" />
                                                    </Row>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="tabbable-line">
                                            <alerts.Alert type={alerts.AlertTypeEnum.info}>
                                                <p style={{ fontSize: 12 }}> Seleccione un detalle para visualizar la información. </p>
                                            </alerts.Alert>
                                        </div>
                                    }
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                </modal.Modal>
                <OptionSection
                    title="Orden(es) de Trabajo para Agendar"
                    id={SECTION_CONCEPTO_ID}
                    icon="fa fa-table"
                    level={1}
                    collapsed={false}
                    onSave={null}>
                    <SectionView onAddNew={!this.props.forma || this.props.forma != "Individual" ? this.onAddNew : null}>
                        <List
                            items={getData(this.props.contratistaOTAgenda)}
                            readonly={true}
                            horizontalScrolling={true}
                            height={"300px"}
                            drawOddLine={true}
                            addRemoveButton={false}
                            listHeader={listHeaderOrdenTrabajo}
                            formatter={(index: number, item: any) => {
                                let drawOddLine: any;
                                drawOddLine = "#f9f9f9";

                                if ((index % 2) == 0) {
                                    drawOddLine = "white";
                                };

                                return <Row id={"row_reservas_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                    <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                        <Row>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                <CollapseButton idElement={"row_reservas_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                            </Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                                                <span className="badge badge-success bold">
                                                    <a onClick={(e) => { window.open(["#/scv/pv/reporteFallasAreasComunes/", item.IdFolio].join(""), '_blank') }} style={{ color: "white" }}>{item.IdFolio}</a>
                                                </span>&nbsp;/&nbsp;
                                                <span className="badge badge-info bold"><a rel="noopener noreferrer" href="javascript:void(0)" style={{ color: "white" }} onClick={(value) => { agendaRUBA.onOrdenTrabajoClick(item.IdOrdenTrabajo) }}>{item.IdOrdenTrabajo}</a></span>
                                            </Column>
                                            {
                                                item.UsuarioReporta === "PorCliente" ?
                                                <Column size={[6, 6, 6, 6]} className="listItem-default-header listItem-overflow">{!(item.Cliente) ? null : <span><span className="badge badge-success bold">{item.Cliente.ID}</span>&nbsp;{item.Cliente.Nombre}</span>}</Column>
                                                :null
                                            }
                                            {
                                                item.UsuarioReporta === "PorColaborador" ?
                                                    <Column size={[6, 6, 6, 6]} className="listItem-default-header listItem-overflow">{!(item.Usuario) ? null : <span><span className="badge badge-success bold">{item.Usuario.ID}</span>&nbsp;{item.Usuario.Nombre}</span>}</Column>
                                                    : null
                                            }
                                            {
                                                item.UsuarioReporta === "PorAnonimo" ?
                                                    <Column size={[6, 6, 6, 6]} className="listItem-default-header listItem-overflow"> <span><span className="badge badge-success bold">999999</span>&nbsp; Anonimo </span></Column>
                                                    : null
                                            }
                                            <Column size={[6, 6, 6, 6]} className="listItem-default-header">{!(item.Ubicacion) ? null : <span className="badge badge-info bold">{item.Ubicacion.Descripcion}</span>}</Column>
                                            <Column size={[4, 4, 4, 4]} className="listItem-default-header listItem-overflow">{!(item.OrdenTrabajo && item.OrdenTrabajo.Contratista) ? null : <span><span className="badge badge-success">{item.OrdenTrabajo.Contratista.ID}</span>&nbsp;{item.OrdenTrabajo.Contratista.Descripcion}</span>}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header">{global.formatDateTimeDirect(item.Creado)}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header">{!(item.OrdenTrabajo && item.OrdenTrabajo.EstatusOrdenTrabajo) ? null : <span className="badge badge-info bold">{item.OrdenTrabajo.EstatusOrdenTrabajo.Nombre}</span>}</Column>
                                            <Column size={[6, 6, 6, 6]} className="listItem-default-header listItem-overflow">{item.OrdenTrabajo.Observaciones}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header" style={{ position: "sticky", right: 0, zIndex: 0, backgroundColor: drawOddLine }}>
                                                <Button size={[1, 1, 1, 1]} className="btn-ico-ek btn-xs btn  default blue" style={{ fontSize: "5px" }} icon="fas fa-plus" onClick={this.onReserve.bind(this)} info={item}></Button>
                                                {!this.props.forma || this.props.forma != "Individual" ?
                                                    <Button size={[1, 1, 1, 1]} className="btn-ico-ek btn-xs btn  default red" style={{ fontSize: "5px", borderTopLeftRadius: "50px", borderTopRightRadius: "50px", borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px" }} icon="fas fa-times" onClick={this.onSelectEliminamosContratistaOT} info={item}></Button> : null
                                                }
                                            </Column>
                                        </Row>
                                    </Column>
                                    <Row>
                                        <Column
                                            xs={{ size: 10 }}
                                            sm={{ size: 10, offset: 1 }}
                                            md={{ size: 10, offset: 1 }}
                                            lg={{ size: 10, offset: 1 }}
                                            className="panel-detail well well-sm">
                                            <List
                                                items={global.createSuccessfulStoreObject(item.Reservas)}
                                                readonly={true}
                                                listHeader={listHeaderOrdenTrabajoReserva}
                                                addRemoveButton={false}
                                                formatter={(_index: number, _item: any): any => {
                                                    let fechaInicio: Date = new Date(_item.FechaInicio);

                                                    return <Row style={{ margin: 0 }}>
                                                        <Column size={[6, 6, 6, 6]} className="listItem-default-item listItem-overflow">{_item.Descripcion}</Column>
                                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item">{global.formatDateTimeDirect(fechaInicio, true)}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{_item.HoraFIN ? _item.HoraFIN.Clave : ""}</Column>
                                                    </Row>
                                                }} />
                                        </Column>
                                    </Row>
                                </Row>
                            }} />
                    </SectionView>
                    <SectionEdit
                        idForm={PAGE_ORDEN_TRABAJO_RESERVA_ID}
                        onCancel={this.onCancel.bind(this)}
                        onSave={this.onSave.bind(this)}>
                        <Row>
                            <page.SectionList
                                id={PAGE_ORDEN_TRABAJO_RESERVA_ID}
                                parent={SECTION_CONCEPTO_ID}
                                icon="fas fa-clock"
                                level={1}
                                title="Reserva Atención Orden Trabajo"
                                listHeader={listHeaderOrdenTrabajoReserva}
                                size={[12, 12, 12, 12]}
                                autonomo={true}
                                readonly={true}
                                style={{ marginTop: 12 }}
                                items={createSuccessfulStoreObject([])}
                                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                    let retValue: any = form
                                        .addID()
                                        .addDescripcion()
                                        .addDate("FechaInicio")
                                        .addObject("HoraFIN")
                                        .addStringConst("Geolocalizacion", "0")
                                        .addObjectConst("TipoAgenda", this.props.tipoAgenda)
                                        .addVersion()
                                        .toObject();

                                    if (!(retValue.HoraFIN && retValue.HoraFIN.Clave)) {
                                        global.warning("Debe indicar la hora fin");
                                        return null;
                                    };

                                    let horaFin: string = retValue.HoraFIN.Clave;
                                    let matchArray: RegExpMatchArray = horaFin.match('^([01]?[0-9]|2[0-3]):[0-5][0-9]$');
                                    if (!matchArray) {
                                        global.warning("La hora fin indicada no es correcta");
                                        return null;
                                    };

                                    horaFin += ":00.000";
                                    let fechaInicio: Date = new Date(retValue.FechaInicio);
                                    let padding: string = "00";
                                    let fechaFin = new Date(fechaInicio.getFullYear() + "-" + (padding + (fechaInicio.getMonth() + 1).toString()).slice(-padding.length) + "-" + (padding + fechaInicio.getDate().toString()).slice(-padding.length) + " " + horaFin);

                                    if (this.equalDates(fechaFin, fechaInicio, "<=")) {
                                        global.warning("La hora fin no puede ser menor o igual a la hora de inicio ");
                                        return null;
                                    };

                                    retValue.FechaFin = new Date(fechaFin.getTime() - (fechaFin.getTimezoneOffset() * 60000)).toISOString();

                                    return retValue;
                                }}
                                formatter={(index: number, item: any) => {
                                    let fechaInicio: Date = new Date(item.FechaInicio);

                                    return <Row style={{ margin: 0 }}>
                                        <Column size={[6, 6, 6, 6]} className="listItem-default-item listItem-overflow">{item.Descripcion}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item">{global.formatDateTimeDirect(fechaInicio, true)}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{item.HoraFIN ? item.HoraFIN.Clave : ""}</Column>
                                        <buttons.PopOver idParent={SECTION_CONCEPTO_ID} idForm={PAGE_ORDEN_TRABAJO_RESERVA_ID} info={item} extraData={[edit, buttons.PopOver.remove]} />
                                    </Row>
                                }}>
                                <Row>
                                    <input.Text id="Descripcion" label="Observaciones" size={[12, 12, 12, 12]} idFormSection={PAGE_ORDEN_TRABAJO_RESERVA_ID} maxLength={250} rowspan={250} required={false} />
                                    <DatePicker id="FechaInicio" label="Fecha Inicio" size={[12, 12, 4, 4]} idFormSection={PAGE_ORDEN_TRABAJO_RESERVA_ID} minuteStep={30} startDays={undefined} hoursDisabled={[0, 1, 2, 3, 4, 5, 6, 21, 22, 23, 24]} type="datetime" value={global.getObtenerFecha()} validations={[validations.required()]} required={true} />
                                    <SPVHorariosAtencionDDL id="HoraFIN" size={[12, 12, 3, 3]} idFormSection={PAGE_ORDEN_TRABAJO_RESERVA_ID} validations={[validations.required()]} />
                                </Row>
                            </page.SectionList>
                        </Row>
                    </SectionEdit>


                    {/*<SectionEdit
                        idForm={SECTION_CAPTURA_INFO}
                        onCancel={this.onClickCancel}
                        onSave={null}>
                        <Column size={[12, 12, 12, 12]}>
                            <Row>
                                <OptionSection
                                    title="Detalles Reprogramación"
                                    id={SECTION_CAPTURA_INFO}
                                    icon="fa fa-table"
                                    onSave={null}
                                    level={2}
                                    collapsed={false}>
                                    <PanelUpdate info={this.props.ContratistaOTAgenda}>
                                        <List
                                            items={getData(this.props.ContratistaOTAgenda)}
                                            readonly={false}
                                            addRemoveButton={false}
                                            dragAndDrop={false}
                                            listHeader={<div>
                                                <Row>
                                                    <Column>
                                                        <Column size={[10, 10, 10, 10]} style={{ textAlign: "center" }} className="list-default-header bold">{"DETALLES"}</Column>
                                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"AGREGAR"}</Column>
                                                    </Column>
                                                </Row>
                                            </div>}
                                            formatter={(index11: number, item: any) => {
                                                return <Row style={{ textAlign: "left" }} id={"row_concepto_3232" + index11} className="panel-collapsed" >
                                                    <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                        <Row>
                                                            <Column size={[10, 10, 10, 10]} className="listItem-left-header hidden-xs bold">
                                                                <i className="fa fa-circle"></i>{item.detalle}
                                                            </Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header hidden-xs">
                                                                <Button className="btn  default btn-default-ek" onClick={null} info={item} icon="fa fa-plus-square"></Button>
                                                            </Column>
                                                        </Row>
                                                    </Column>
                                                </Row>
                                            } } />
                                    </PanelUpdate>
                                </OptionSection>
                            </Row>
                        </Column>
                    </SectionEdit>*/}
                </OptionSection>
            </div>
        }
    });

    /*COMPONENTES*/
    interface ISPVContratistasDDLProps extends ddl.IDropDrownListProps {
        plaza?: DataElement;
    };

    export const SPVContratistasDDL: any = global.connect(class extends React.Component<ISPVContratistasDDLProps, {}> {
        static props: any = (state: any) => ({
            plaza: Forms.getDataValue("PlazaInicial", PAGE_CONTRATISTA_ID, state),
            items: state.global.plaza$contratistas
        });
        static defaultProps: ISPVContratistasDDLProps = {
            id: "Contratista",
            items: createDefaultStoreObject([]),
            label: "Contratista",
            helpLabel: "Seleccione un contratista",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'> ", item.id, "</span>",
                        "<span class='bold' style='font-size: 90%'> ", item.Descripcion, "</span> "
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Descripcion) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ", item.text, "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success bold'> ", item.id, "</span>",
                    "<span class='bold' style='font-size: 90%'> ", item.Descripcion, "</span> "
                ].join(""));
            }
        };
        componentWillReceiveProps(nextProps: ISPVContratistasDDLProps, { }): void {
            if (global.hasChanged(this.props.plaza, nextProps.plaza) && global.isSuccessful(nextProps.plaza)) {
                if (global.getDataID(this.props.plaza) !== global.getDataID(nextProps.plaza)) {
                    let idPlaza: any = global.getDataID(nextProps.plaza) > 0 ? global.getDataID(nextProps.plaza) : null;
                    let encodedURL: string = global.encodeAllURL("scv", "Contratistas", { idPlaza, bitot: 1 });
                    global.dispatchAsync("load::plaza$contratistas", encodedURL);

                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                    Forms.updateFormElement(idForm, this.props.id, []);
                };
            };
        };
        render(): JSX.Element {
            return <ddl.DropdownList$Form {...this.props} />;
        };
    });

    interface IButtonSearchProps extends buttons.IButtonProps {
        forms?: any;
    };

    const ButtonSearch: any = global.connect(class extends React.Component<IButtonSearchProps, {}>{
        static props: any = (state: any) => ({
            forms: state.forms
        });
        static defaultProps: IButtonSearchProps = {
            icon: "fa fa-search",
            text: "",
            color: "white",
            style: null,
            className: "",
            iconOnly: true,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        render(): JSX.Element {
            let color: string = "#d26c35";
            let className: string = "";

            if (this.props.forms) {
                let form: any = this.props.forms[PAGE_CONTRATISTA_ID];
                if (form && form.hasChanged === true) {
                    color = "white";
                    className = " btn-editing";
                };
            };

            return <Button {...this.props} className={className} color={color} style={{ marginRight: 5, color }} />
        };
    });

    const ButtonSearchContratista: any = global.connect(class extends React.Component<IButtonSearchProps, {}>{
        static props: any = (state: any) => ({
            forms: state.forms
        });
        static defaultProps: IButtonSearchProps = {
            icon: "fa fa-search",
            text: "",
            color: "white",
            style: null,
            className: "",
            iconOnly: true,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        render(): JSX.Element {
            let color: string = "#d26c35";
            let className: string = "";

            if (this.props.forms) {
                let form: any = this.props.forms[PAGE_CONTRATISTA_ID];
                if (form && form.hasChanged === true) {
                    color = "white";
                    className = " btn-editing";
                };
            };

            return <Button {...this.props} className={className} color={color} style={{ marginRight: 5, color }} />
        };
    });

    // Historial Seguimiento
    const listHeaderSeguimiento: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{""}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Descripcion"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Inicio"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fin"}</Column>
            </Row>
        </Column>

    interface ISPVSeguimientoProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        loadSeguimiento?: (item: any[]) => DataElement;
    };

    class ViewSeguimientoCita extends React.Component<ISPVSeguimientoProps, {}>{

        render(): JSX.Element {

            let seguimiento: any = getData(EK.Store.getState().global.reporte$seguimiento);

            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (isEmptyObject(item)) return;
                    global.dispatchAsyncPut("load::ACTDETALLEAGENDA", "base/kontrol/AgendaSPV/Get/DeleteCitaSeguimiento", item, "ActDetalleAgenda");
                }
            };
            return <List
                id={REPORTE_SEGUIMIENTO}
                items={seguimiento}
                readonly={true}
                listHeader={listHeaderSeguimiento}
                formatter={(index: number, item: any) => {
                    return <Row style={{ margin: 0 }}>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-header"><Button size={[5, 5, 5, 5]} iconOnly={true} icon="glyphicon glyphicon-envelope" />{item.Descripcion}</Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">{item.FechaInicio.toLocaleString()}</Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">{item.FechaFin.toLocaleString()}</Column>
                        <buttons.PopOver info={item} extraData={[remove]} />
                    </Row>
                }} />
        };
    };

    // Historial de Reprogramaciones
    const listHeaderHistoricoReprogramaciones: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Motivo y Observaciones"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Inicio"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fin"}</Column>
            </Row>
        </Column>

    interface ISPVHistoricoReprogramacionesProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        loadReprogramaciones?: (item: any[]) => DataElement;
    };

    class ViewHistoricoReprogramaciones extends React.Component<ISPVHistoricoReprogramacionesProps, {}>{

        render(): JSX.Element {

            let reprogramaciones: any = getData(EK.Store.getState().global.reporte$reprogramaciones);

            return <List
                id={REPORTE_REPROGRAMACIONES}
                items={reprogramaciones}
                readonly={true}
                listHeader={listHeaderHistoricoReprogramaciones}
                formatter={(index: number, item: any) => {
                    return <Row style={{ margin: 0 }}>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-header">{item.Descripcion}</Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">{item.FechaInicio.toLocaleString()}</Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">{item.FechaFin.toLocaleString()}</Column>
                    </Row>
                }} />
        };
    };
};

import agendaContratistaAreasComunesPV = EK.Modules.SCV.Pages.postventa.RUBA.AgendaContratistaAreasComunes;