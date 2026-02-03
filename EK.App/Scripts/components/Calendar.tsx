namespace EK.UX.Calendar {
    "use strict";
    interface ICalendarProps extends React.Props<any> {
        config?: page.IPageConfig;
        data?: any;
        entity?: DataElement;
        entityType?: DataElement;
        id?: string;
        minTime?: string;
        maxTime?: string;
        onEventDataTransform?: (item: any) => void;
        onEventClick?: (calEvent: any, jsEvent: any, view: any) => any;
        onDayClick?: (date: any, jsEvent: any, view: any) => any;
        onSelect?: (startDate: any, endDate: any) => any;
        nuevorender?: (a: any, b: any) => any;
        pageId?: string;
        selectedItem?: any;
        selectedItems?: any[];
        slot?: string;
        idForm?: any;
        defaultFecha?: any;
        applyValuesControl?: any;
        prev?: () => any;
    };
    export class Calendar extends React.Component<ICalendarProps, ICalendarProps> {
        constructor(props: IDataTableProps) {
            super(props);
            this.calendarInit = this.calendarInit.bind(this);
            this.calendarDestroy = this.calendarDestroy.bind(this);
        };
        static defaultProps: ICalendarProps = {
            defaultFecha: new Date()
        };
        refs: {
            container: Element;
        };
        shouldComponentUpdate(nextProps: IDataTableProps, nextState: any): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };
        calendarInit(fechaDefault?: null, vistaDefault?: null): void {
            let calendar: any = $(this.refs.container);
            calendar.fullCalendar({
                header: {
                    left: "month,agendaWeek,agendaDay,listWeek",
                    center: "title",
                    right: "prev,today,next"
                },
                defaultView: vistaDefault !== null ? vistaDefault : 'month',
                defaultDate: fechaDefault !== null ? fechaDefault : new Date(),
                navLinks: true, // can click day/week names to navigate views
                editable: false,
                minTime: this.props.minTime === undefined ? "00:00:00" : this.props.minTime,
                maxTime: this.props.maxTime === undefined ? "24:00:00" : this.props.maxTime,
                eventLimit: 4, // allow "more" link when too many events
                themeSystem: "bootstrap3",
                height: (e) => { return "auto" },
                contentHeight: (e) => { return "auto" },
                eventClick: this.props.onEventClick,
                viewRender: (a, b) => this.viewRender(a, b),
                eventDrop: (eventDropInfo) => this.moveEvent(eventDropInfo),
                eventDataTransform: this.props.onEventDataTransform,
                events: getData(this.props.data),
                prev: this.props.prev,
                dayClick: this.props.onDayClick,
                select: this.props.onSelect,
                textEscape: false,
                eventRender: function (eventObj, $el) {
                    console.log(eventObj)
                    $el.popover({
                        html: true,
                        width: "350px",
                        maxWidth: "400px",
                        title: function () {
                            let a;
                            a = "Información"
                            return a;
                        },
                        content: "<div style=\"font-size: 11px;\"  >" + (eventObj.desc) + "</div>",
                        trigger: 'hover',
                        placement: 'top',
                        container: 'body'
                    });
                },
                selectable: true,
                selectOverlap: false
            });

            const initialDate = calendar.fullCalendar('getDate').format();
            dispatchSuccessful('load::FechaCalendarioInicial', initialDate);

            calendar.find(".fc-right button").addClass("white btn-semirounded-ek");
            calendar.find(".fc-left button").addClass("white btn-semirounded-ek");
            // Evento que se ejecuta al dar clic en los botones de tipo de vista (mes, semana, dia)
            calendar.find(".fc-left").click((e) => {
                const tipoVista = EK.Store.getState().global.tipoVistaCalendario !== undefined ? EK.Store.getState().global.tipoVistaCalendario.data : 'month'
                switch (tipoVista) {
                    case 'agendaWeek':
                    case 'listWeek':
                        const intervalStart = calendar.fullCalendar('getView').intervalStart.format();
                        const intervalEnd = calendar.fullCalendar('getView').intervalEnd.format();
                        const mesI = new Date(intervalStart).getMonth() + 1;
                        const mesF = new Date(intervalEnd).getMonth() + 1;
                        const anioI = new Date(intervalStart).getFullYear();
                        const anioF = new Date(intervalEnd).getFullYear();
                        dispatchSuccessful('load::FechaCalendarioInicial', intervalStart);
                        dispatchSuccessful('load::FechaCalendarioFinal', intervalEnd);
                        if (mesI !== mesF) {
                            this.reloadDataCalendario(intervalStart, intervalEnd);
                        }
                        break;
                }
            });

            // Evento que se ejecuta al dar clic en los botones adelante y atras
            calendar.find(".fc-right").click((e) => {
                 console.log('Cambiando fechas');
                const tipoVista = EK.Store.getState().global.tipoVistaCalendario !== undefined ? EK.Store.getState().global.tipoVistaCalendario.data : 'month'
                const intervalStart = calendar.fullCalendar('getView').intervalStart.format();
                const intervalEnd = calendar.fullCalendar('getView').intervalEnd.format();
                const mesI = new Date(intervalStart).getMonth() + 1;
                const mesF = new Date(intervalEnd).getMonth() + 1;
                const anioI = new Date(intervalStart).getFullYear();
                const anioF = new Date(intervalEnd).getFullYear();
                switch (tipoVista) {
                    case 'month':
                        const dateStart = calendar.fullCalendar('getDate').format();
                        dispatchSuccessful('load::FechaCalendarioInicial', dateStart);
                        dispatchSuccessful('load::FechaCalendarioFinal', undefined);
                        this.reloadDataCalendario(dateStart); 
                        break;
                    case 'agendaWeek':
                    case 'listWeek':
                        dispatchSuccessful('load::FechaCalendarioInicial', intervalStart);
                        dispatchSuccessful('load::FechaCalendarioFinal', intervalEnd);
                        if (mesI !== mesF) {
                            this.reloadDataCalendario(intervalStart, intervalEnd);
                        }
                        break;
                    case 'agendaDay':
                        let calendario: any = $('#AgendaDashBoard');
                        const inicioDia: Date = calendario.fullCalendar('getDate').format();
                        const date = new Date(inicioDia);
                        const dateNext = new Date(inicioDia);
                        const datePrev = new Date(inicioDia);
                        dateNext.setDate(date.getDate() + 1);
                        datePrev.setDate(date.getDate() + (-1));
                        dispatchSuccessful('load::FechaCalendarioInicial', date);
                        if (e.toElement.className.includes('left') || e.toElement.className.includes('prev')) {
                            let thisM = date.getMonth();
                            let nextM = dateNext.getMonth();
                            if (thisM !== nextM) {
                                this.reloadDataCalendario(date);
                            }
                        }
                        else if (e.toElement.className.includes('right') || e.toElement.className.includes('next')) {
                            let thisM = date.getMonth();
                            let prevM = datePrev.getMonth();
                            if (thisM !== prevM) {
                                this.reloadDataCalendario(date);
                            }
                        }
                        break;
                }
            })
        };
        viewRender(a, b) {
            dispatchSuccessful('load::tipoVistaCalendario', a.name);
        }

        reloadDataCalendario(fini, ffin?: null) {
            try {
                let paginaActual = EK.Store.getState().global.pageConfig.data.id
                //console.log(paginaActual)
                switch (paginaActual) {
                    case 'ReportesFallas':
                    case 'ReporteFallasAreasComunes':
                    case 'ConfigViviendaEntregable':
                    case 'CapturaFechaConstruccion':
                        let params = getData(EK.Store.getState().global.ParametrosCalendarioFromAgenda);
                        //console.log(Array.isArray(params));
                        if (Array.isArray(params)) {
                            return;
                        }
                        //let fsele = EK.Store.getState().global.fSeleccionado.data;
                        params.FechaInicio = fini;
                        if (ffin !== null) {
                            params.FechaFin = ffin;
                        }
                        params.fSeleccionado = null;
                        //console.log(params)
                        dispatchAsyncPost("load::AgendaNewCalendasUser", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: params });
                        break;
                    case 'ComiteReunionesAgenda':
                        let IdComite = getData(EK.Store.getState().global.COMITES_Seleccionada).ID;
                        console.log(fini, 'ffin',ffin)
                        let loader = document.getElementById('loading');
                        let loaded = document.getElementById('loadedData');
                        let month = new Date(fini).getMonth() + 1;
                        let year = new Date(fini).getFullYear();
                        let parametros = global.assign({
                            IDCOMITE: IdComite,
                            MONTH: month,
                            YEAR: year,
                        })

                        global.asyncPost("base/kontrol/Comites/GetBP/GetAgenda/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:
                                    console.log(data)
                                    dispatchSuccessful("load::AgendaReuniones", data)

                                    loader.style.display = 'none';
                                    loaded.style.display = 'inherit';
                                    break;
                                case AsyncActionTypeEnum.loading:
                                    loader.style.display = 'block';
                                    loaded.style.display = 'none'
                                    break;
                                case AsyncActionTypeEnum.failed:
                                    loader.style.display = 'none';
                                    loaded.style.display = 'inherit';
                                    break;
                            }
                        })
                        
                        break;
                    default:
                        let funcionAgenda: string = getData(EK.Store.getState().global.funcionAgenda).tipo;
                        let pageId: string;
                        //console.log( funcionAgenda)
                        let fsel = EK.Store.getState().global.fSeleccionado !== null && EK.Store.getState().global.fSeleccionado !== undefined ? EK.Store.getState().global.fSeleccionado.data : '-2';
                        switch (funcionAgenda) {
                            case "PostVenta": pageId = "Agenda"; fsel = null; break;
                            case "Contratista": pageId = "DashBoardAgendaContratista"; break;
                            case "ContratistaAreasComunes": pageId = "AgendaAreasComunes"; fsel = null; break;
                        };
                       
                        let idTipoAgenda: any = Forms.getValue("TipoAgenda", pageId) && Forms.getValue("TipoAgenda", pageId).Clave ? Forms.getValue("TipoAgenda", pageId) : null;
                        let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", pageId) && Forms.getValue("PlazaInicial", pageId).ID ? Forms.getValue("PlazaInicial", pageId).ID : null;
                        idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
                        idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
                        let usuarioSeleccionado: any = EK.Store.getState().global.UsuarioAgendaSelected && getData(EK.Store.getState().global.UsuarioAgendaSelected).item && getData(EK.Store.getState().global.UsuarioAgendaSelected).item.ID ? getData(EK.Store.getState().global.UsuarioAgendaSelected).item.ID : null;
                        let estadoSeleccionado: any = EK.Store.getState().global.EstatusAgendaSelected ? getData(EK.Store.getState().global.EstatusAgendaSelected).Clave : null;
                        estadoSeleccionado = EK.Store.getState().global.UsuarioAgendaSelected && getData(EK.Store.getState().global.UsuarioAgendaSelected).item && getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action && getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action != undefined ? getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action : estadoSeleccionado;
                        //console.log(EK.Store.getState().global.fSeleccionado.data);
                        
                        
                        let p: any = global.assign({
                            activos: 1,
                            TipoAgenda: idTipoAgenda.ID,
                            IdPlaza: idPlazaSeleccionada,
                            ClaveEstado: estadoSeleccionado,
                            UsuarioSeleccionado: usuarioSeleccionado,
                            FuncionAgenda: funcionAgenda,
                            FechaInicio: fini,
                            FechaFin: ffin,
                            fSeleccionado:fsel
                        });
                        //console.log('cambiando algo en agenda')
                        dispatchSuccessful('load::ParametrosReloadAgenda', p);
                       // dispatchSuccessful("load::AgendaDashBoard", []);
                        dispatchAsyncPost("load::AgendaDashBoard", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p })
                        dispatchAsyncPost("load::UsuariosAgenda", "base/kontrol/agendaSPV/GetBP/getUsersCalendarDashBoard/", { parametros: p });

                        break;
                }

            } catch (ex) { return null }
        }

        moveEvent(eventDropInfo) {
            // if (tipo)
            //Forms.updateFormElement("CapturaInfo", "DetalleCteAgendaEdit", null);
            //Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", null);

            //let idAgenda: any = eventDropInfo.id;
            //let claveTipoAgenda: any = eventDropInfo.TipoAgenda.Clave;
            //global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: claveTipoAgenda });

            //let p: any = global.assign({
            //    IdAgenda: idAgenda,
            //    ClaveTipoAgenda: claveTipoAgenda,
            //    IdAgendaDetalle: 0,
            //});

            //global.dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p }, "AgendaDetallesCitaResult");

            //let modalAgenda: any = $("#modalAgendaInformacionCita");
            //modalAgenda.modal();
            //modalAgenda.css("height", "auto");
        }

        calendarDestroy(): void {
            let calendar: any = $(this.refs.container);
            calendar.fullCalendar("destroy");
        };
        componentDidMount(): void {
            this.calendarInit();
        };
        componentWillUnmount(): void {
            this.calendarDestroy();
        };
        componentWillUpdate(nextProps: IDataTableProps, nextState: any) {

            this.calendarDestroy();
        };
        componentDidUpdate(): void {
            const fechaActualRender = EK.Store.getState().global.FechaCalendarioInicial.data
            const tipoVista = EK.Store.getState().global.tipoVistaCalendario !== undefined ? EK.Store.getState().global.tipoVistaCalendario.data : 'month'
            this.calendarInit(fechaActualRender, tipoVista);
        };
        render(): JSX.Element {
            return <div id={this.props.id} ref="container"></div>;
        };
    };

    export const GlobalCalendar: any = global.connect(class extends React.Component<ICalendarProps, ICalendarProps>{
        static props: any = (state: any) => ({
            data: state.global.calendario
        });
        onEventDataTransform(item: any): any {
            return {
                id: item.ID,
                //url: item.Link,
                ruta: item.Ruta,
                title: item.Summary,
                allDay: item.AllDay === true,
                start: item.DTStart,
                end: item.DTEnd,
                desc: item.Description,
                location: item.Location,
                textColor: item.TextColor ? item.TextColor : undefined,
                backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
            };
        };
        onEventClick(calEvent: any, jsEvent: any, view: any): any {
            // console.log('sdsdsd');
            global.goModal("modalDetalle", calEvent.ruta);
        };
        render(): JSX.Element {
            let data: DataElement;
            if (isSuccessful(this.props.data)) {
                data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
                data.timestamp = this.props.data.timestamp;
                data.status = this.props.data.status;
            }
            else {
                data = this.props.data;
                data.data = global.getData(this.props.data);
            };
            return <div><Calendar {...this.props} data={data}
                onEventClick={this.onEventClick.bind(this)}
                onEventDataTransform={this.onEventDataTransform.bind(this)}></Calendar>
                <modal.Modal id="modalDetalle" url={"about:blank"}></modal.Modal></div>;
        };
    });

    export const GlobalAgendaDashBoard: any = global.connect(class extends React.Component<ICalendarProps, ICalendarProps>{
        static props: any = (state: any) => ({
            data: state.global.AgendaDashBoard
        });
        onEventDataTransform(item: any): any {
            return {
                id: item.UID,
                url: item.Link,
                TipoAgenda: item.TipoAgenda,
                title: item.Summary,
                allDay: item.AllDay === true,
                start: item.DTStart,
                end: item.DTEnd,
                desc: item.Description,
                location: item.Location,
                textColor: item.TextColor ? item.TextColor : undefined,
                backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
            };
        };
        onEventClick(calEvent: any, jsEvent: any, view: any): any {
            let params = getData(EK.Store.getState().global.ParametrosReloadAgenda);
            global.dispatchSuccessful("load::IdEvento", calEvent.id);
            let calendar: any = $('#AgendaDashBoard');
            const dateStart = calendar.fullCalendar('getDate').format();
            dispatchSuccessful('load::FechaForReloadCalendar', dateStart);
            Forms.updateFormElement("CapturaInfo", "DetalleCteAgendaEdit", null);
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", null);

            let idAgenda: any = calEvent.id;
            let claveTipoAgenda: any = calEvent.TipoAgenda.Clave;

            global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: claveTipoAgenda });

            let p: any = global.assign({
                IdAgenda: idAgenda,
                ClaveTipoAgenda: claveTipoAgenda,
                IdAgendaDetalle: 0,
            });

            global.dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p }, "AgendaDetallesCitaResult");

            let modalAgenda: any = $("#modalAgendaInformacionCita");
            modalAgenda.modal();
            modalAgenda.css("height", "auto");
            let modalContainer: any = document.querySelector('#modalAgendaInformacionCita');
            let mh = modalContainer.clientHeight;
            let mw = modalContainer.clientWidth;
            let customHeight = mh * 0.80;
            let camContainer: any = document.querySelector('#main_body_infocita');
            camContainer.style.height = `${customHeight}px`;
        };
        render(): JSX.Element {
            let data: DataElement;
            if (isSuccessful(this.props.data)) {
                data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
                data.timestamp = this.props.data.timestamp;
                data.status = this.props.data.status;
            }
            else {
                if (this.props.data) {
                    data = this.props.data;
                    data.data = global.getData(this.props.data);
                }
            };

            return <Calendar {...this.props} data={data}
                onEventClick={this.onEventClick.bind(this)}
                onEventDataTransform={this.onEventDataTransform.bind(this)}></Calendar>;
        };
    });

    export const GlobalAgendaNew: any = global.connect(class extends React.Component<ICalendarProps, ICalendarProps>{
        static props: any = (state: any) => ({
            data: state.global.AgendaNewCalendasUser
        });
        onSelect(startDate: any, endDate: any, jsEvent: any, view: any): any {
            if (startDate._ambigTime === false) {
                let fechaRecibida: Date = new Date(startDate);
                let nuevaFechaRecibida: Date = new Date(fechaRecibida.getTime() + (fechaRecibida.getTimezoneOffset() * (1 * 60000)));
                let fechaActual: Date = new Date();
                if (nuevaFechaRecibida.getTime() <= fechaActual.getTime()) {
                    EK.Global.warning("Error en selección de fecha", "Seleccione por favor una fecha y hora mayor a la actual");
                    return;
                };

                if (this.props.applyValuesControl) {
                    EK.Global.confirm("Presione para confirmar", "Estas seleccionando la fecha \n\n" + global.formatDateTimeDirect(nuevaFechaRecibida, true), () => {
                        let fechaInicio: any = new Date(startDate.format());
                        Forms.updateFormElement(this.props.idForm, this.props.applyValuesControl, fechaInicio);
                    });
                }
            }
        };
        onEventDataTransform(item: any): any {
            console.log(item)
            return {
                id: item.UID,
                url: item.Link,
                TipoAgenda: item.TipoAgenda,
                title: item.Summary,
                allDay: item.AllDay === true,
                start: item.DTStart,
                end: item.DTEnd,
                desc: item.Description,
                location: item.Location,
                textColor: item.TextColor ? item.TextColor : undefined,
                backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
            };
        };
        shouldComponentUpdate(nextProps: ICalendarProps, nextState: any): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };
        render(): JSX.Element {
            let data: DataElement;
            //console.log(data)
            if (isSuccessful(this.props.data)) {
                data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
                data.timestamp = this.props.data.timestamp;
                data.status = this.props.data.status;
            }
            else {
                if (this.props.data) {
                    data = this.props.data;
                    data.data = global.getData(this.props.data);
                }
            };

            return <Calendar {...this.props} data={data}
                onEventDataTransform={this.onEventDataTransform.bind(this)}
                onSelect={this.onSelect.bind(this)}></Calendar>;
        };
        //onEventDataTransform(item: any): any {
        //    return {
        //        id: item.UID,
        //        url: item.Link,
        //        TipoAgenda: item.TipoAgenda,
        //        title: item.Summary,
        //        allDay: item.AllDay === true,
        //        start: item.DTStart,
        //        end: item.DTEnd,
        //        desc: item.Description,
        //        location: item.Location,
        //        textColor: item.TextColor ? item.TextColor : undefined,
        //        backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
        //    };
        //};
        //onEventClick(calEvent: any, jsEvent: any, view: any): any {
        //    let params = getData(EK.Store.getState().global.ParametrosReloadAgenda);
        //    global.dispatchSuccessful("load::IdEvento", calEvent.id);
        //    let calendar: any = $('#AgendaDashBoard');
        //    const dateStart = calendar.fullCalendar('getDate').format();
        //    dispatchSuccessful('load::FechaForReloadCalendar', dateStart);
        //    Forms.updateFormElement("CapturaInfo", "DetalleCteAgendaEdit", null);
        //    Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", null);

        //    let idAgenda: any = calEvent.id;
        //    let claveTipoAgenda: any = calEvent.TipoAgenda.Clave;

        //    global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: claveTipoAgenda });

        //    let p: any = global.assign({
        //        IdAgenda: idAgenda,
        //        ClaveTipoAgenda: claveTipoAgenda,
        //        IdAgendaDetalle: 0,
        //    });

        //    global.dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p }, "AgendaDetallesCitaResult");

        //    let modalAgenda: any = $("#modalAgendaInformacionCita");
        //    modalAgenda.modal();
        //    modalAgenda.css("height", "auto");
        //    let modalContainer: any = document.querySelector('#modalAgendaInformacionCita');
        //    let mh = modalContainer.clientHeight;
        //    let mw = modalContainer.clientWidth;
        //    let customHeight = mh * 0.80;
        //    let camContainer: any = document.querySelector('#main_body_infocita');
        //    camContainer.style.height = `${customHeight}px`;
        //};
        //render(): JSX.Element {
        //    let data: DataElement;
        //    if (isSuccessful(this.props.data)) {
        //        data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
        //        data.timestamp = this.props.data.timestamp;
        //        data.status = this.props.data.status;
        //    }
        //    else {
        //        if (this.props.data) {
        //            data = this.props.data;
        //            data.data = global.getData(this.props.data);
        //        }
        //    };

        //    return <Calendar {...this.props} data={data}
        //        onEventClick={this.onEventClick.bind(this)}
        //        onEventDataTransform={this.onEventDataTransform.bind(this)}></Calendar>;
        //};
    });

    export const GlobalSPVPlanificacion: any = global.connect(class extends React.Component<ICalendarProps, ICalendarProps>{
        static props: any = (state: any) => ({
            data: state.global.AgendaSPVPlanificacionCalendar
        });
        onEventDataTransform(item: any): any {
            return {
                id: item.ID,
                //url: item.Link,
                ruta: item.Ruta,
                title: item.Summary,
                allDay: item.AllDay === true,
                start: item.DTStart,
                end: item.DTEnd,
                desc: item.Description,
                location: item.Location,
                textColor: item.TextColor ? item.TextColor : undefined,
                backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
            };
        };
        //onEventClick(calEvent: any, jsEvent: any, view: any): any {
        //};

        render(): JSX.Element {
            let data: DataElement;
            if (isSuccessful(this.props.data)) {
                data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
                data.timestamp = this.props.data.timestamp;
                data.status = this.props.data.status;
            }
            else {
                if (this.props.data) {
                    data = this.props.data;
                    data.data = global.getData(this.props.data);
                }
            };

            return <Calendar {...this.props} data={data}
                onEventDataTransform={this.onEventDataTransform.bind(this)}
            ></Calendar>;
        };
    });

    export const GlobalSPVPlanificacionDashboard: any = global.connect(class extends React.Component<ICalendarProps, ICalendarProps>{
        static props: any = (state: any) => ({
            data: state.global.AgendaSPVPlanificacionCalendarDashboard
        });
        onEventDataTransform(item: any): any {
            return {
                id: item.ID,
                //url: item.Link,
                ruta: item.Ruta,
                title: item.Summary,
                allDay: item.AllDay === true,
                start: item.DTStart,
                end: item.DTEnd,
                desc: item.Description,
                location: item.Location,
                textColor: item.TextColor ? item.TextColor : undefined,
                backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
            };
        };
        //onEventClick(calEvent: any, jsEvent: any, view: any): any {
        //};

        render(): JSX.Element {
            let data: DataElement;
            if (isSuccessful(this.props.data)) {
                data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
                data.timestamp = this.props.data.timestamp;
                data.status = this.props.data.status;
            }
            else {
                if (this.props.data) {
                    data = this.props.data;
                    data.data = global.getData(this.props.data);
                }
            };

            return <Calendar {...this.props} data={data}
                onEventDataTransform={this.onEventDataTransform.bind(this)}
            ></Calendar>;
        };
    });


    export const GlobalWBSTareasSGPCalendar: any = global.connect(class extends React.Component<ICalendarProps, ICalendarProps>{
        static props: any = (state: any) => ({
            data: state.global.WBSTareasSGPCalendar
        });
        onEventDataTransform(item: any): any {
            return {
                id: item.ID,
                //url: item.Link,
                ruta: item.Ruta,
                title: item.Summary,
                allDay: item.AllDay === true,
                start: item.DTStart,
                end: item.DTEnd,
                desc: item.Description,
                location: item.Location,
                textColor: item.TextColor ? item.TextColor : undefined,
                backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
            };
        };
        //onEventClick(calEvent: any, jsEvent: any, view: any): any {
        //};

        render(): JSX.Element {
            let data: DataElement;
            if (isSuccessful(this.props.data)) {
                data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
                data.timestamp = this.props.data.timestamp;
                data.status = this.props.data.status;
            }
            else {
                if (this.props.data) {
                    data = this.props.data;
                    data.data = global.getData(this.props.data);
                }
            };

            return <Calendar {...this.props} data={data}
                onEventDataTransform={this.onEventDataTransform.bind(this)}
            ></Calendar>;
        };
    });

    export const GlobalAgendaReuniones: any = global.connect(class extends React.Component<ICalendarProps, ICalendarProps>{
        static props: any = (state: any) => ({
            data: state.global.AgendaReuniones
        });
        onEventDataTransform(item: any): any {
            return {
                id: item.UID,
                url: item.Link,
                title: item.Summary,
                allDay: item.AllDay === true,
                start: item.DTStart,
                end: item.DTEnd,
                desc: item.Description,
                location: item.Location,
                textColor: item.TextColor ? item.TextColor : undefined,
                backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
            };
        };
        onEventClick(calEvent: any, jsEvent: any, view: any): any {
            dispatchSuccessful("load::Load", { load: true })
            let IdReunion = calEvent.id;
            let parametros = global.assign({
                ID: IdReunion,
            })

            global.asyncPost("base/kontrol/Comites/GetBP/GetEventById/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        dispatchSuccessful("load::Event", data, this.props.id)
                        dispatchSuccessful("load::Load", { load: false })

                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        dispatchSuccessful("load::Load", { load: false })
                        break;
                }
            })
            let modalAgenda: any = $("#ModalAgendaReuniones");
            modalAgenda.modal();
            modalAgenda.css("height", "auto");
            
        };
        render(): JSX.Element {
            let data: DataElement;
            if (isSuccessful(this.props.data)) {
                data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
                data.timestamp = this.props.data.timestamp;
                data.status = this.props.data.status;
            }
            else {
                if (this.props.data) {
                    data = this.props.data;
                    data.data = global.getData(this.props.data);
                }
            };
            return <Calendar {...this.props} data={data}
                onEventClick={this.onEventClick.bind(this)}
                onEventDataTransform={this.onEventDataTransform.bind(this)}></Calendar>;
        };
    });
};

import calendar = EK.UX.Calendar;