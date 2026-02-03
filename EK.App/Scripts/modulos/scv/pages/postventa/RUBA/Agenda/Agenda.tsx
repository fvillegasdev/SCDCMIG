namespace EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda {
    "use strict";
    const SECTION_CONCEPTO_ID: string = "AgendaSPV";
    const PAGE_ORDEN_TRABAJO_ID: string = "agenda$ordenTrabajo";
    const PAGE_ORDEN_TRABAJO_RESERVA_ID: string = "agenda$ordenTrabajo$reserva";

    declare const ExcelJS: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;

    interface IAgendaDashBoard extends page.IProps {
        usuarioSeleccionado?: any;
        agendaActualizada?: any;
        funcionAgenda?: any;
        buscador?: any;
        newRenderDates?: any;
        fraccSeleccionado?: any;
        fSeleccionado?: any;
        vocacion?: any;
    };

    interface IAgendaState {
        modoAgenda: boolean;
        pageId: string;
    };
    declare const calendar: any;
    const listHeaderOT: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">#OT</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Inicio Estimado Trabajo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Final Estimado Trabajo"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Planificación"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderOTPartidas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Familia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>
    const listHeaderOrdenTrabajo: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">#OT</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Plan. Inicio"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Plan. Fin"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Planificación"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderOrdenTrabajoPartidas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>
    // import { lazy } from 'react';

    export const Vista: any = global.connect(class extends React.Component<IAgendaDashBoard, IAgendaState>{
        constructor(props: IAgendaDashBoard) {
            super(props);
            let tipoAgenda: string = global.getData(props.funcionAgenda).tipo;
            let pageId: string;
            switch (tipoAgenda) {
                case "PostVenta": pageId = "Agenda"; break;
                case "Contratista": pageId = "DashBoardAgendaContratista"; break;
                case "ContratistaAreasComunes": pageId = "AgendaAreasComunes"; break;
            };
            this.state = { modoAgenda: true, pageId };
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.usuarioSeleccionado = state.global.UsuarioAgendaSelected;
            retValue.agendaActualizada = state.global.ACTDETALLEAGENDA;
            retValue.funcionAgenda = state.global.funcionAgenda;
            retValue.newRenderDates = state.global.newRenderDates;
            retValue.buscador = state.global.Buscador_seleccionado;
            retValue.fraccSeleccionado = state.global.fraccSeleccionado;
            retValue.fSeleccionado = state.global.fSeleccionado;
            retValue.vocacion = Forms.getDataValue("Vocaciones", retValue.config.id, state);
            return retValue;
        };
        onNewCalendar(): void {
            let fechaActual: Date = new Date();
            let fechaPropuesta: Date;
            fechaActual = global.FechaPropuesta(fechaActual, 1);
            fechaPropuesta = global.FechaPropuesta(fechaActual, 1);
            Forms.reset("AgendaNew");
            Forms.updateFormElement("AgendaNew", "FechaInicio", fechaActual);
            Forms.updateFormElement("AgendaNew", "FechaFin", fechaPropuesta);

            let claveTipoAgenda: any = Forms.getValue("TipoAgenda", this.state.pageId) && Forms.getValue("TipoAgenda", this.state.pageId).Clave ? Forms.getValue("TipoAgenda", this.state.pageId).Clave : null;

            global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: claveTipoAgenda });

            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", []);
            Forms.updateFormElement("CapturaInfo", "ContratistaOTAgendaEdit", []);

            agendaContratistaPV.resetAgenda();
            //
            this.props.config.setState({ viewMode: false });
            this.props.config.setState({ viewMode: true }, SECTION_CONCEPTO_ID);
            //
            let modalCalen: any = $("#modalCalen");
            modalCalen.modal();
            modalCalen.css("height", "auto");
            modalCalen.on("hidden.bs.modal", function () {
                let state: DataElement = global.getStateItem(["global.state", SECTION_CONCEPTO_ID].join("$"));
                if (global.getData(state).viewMode !== true) {
                    let config: any = global.getStateItem("global.pageConfig");
                    if (config && global.isSuccessful(config)) {
                        let _config: page.IPageConfig = global.getPageConfig(config);
                        if (_config) {
                            _config.setState({ viewMode: true }, SECTION_CONCEPTO_ID);
                        };
                    };
                };
            });
        };
        //cambiarFraccionamiento() {
        //    console.log('cambiando fraccionamiento')
        //    let fracc = EK.Store.getState().forms.DashBoardAgendaContratista.form.Fraccionamientos.value;
        //    if (fracc !== null && fracc !== undefined) {
        //        dispatchSuccessful("load::fSeleccionado", fracc.Clave);
        //    }
        //    //console.log(fracc)
        //    //
        //}
        componentDidMount(): any {

            Forms.reset(this.state.pageId);
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", []);
            Forms.updateFormElement("CapturaInfo", "ContratistaOTAgendaEdit", []);

            let funcionAgenda: string = this.props.funcionAgenda != null && this.props.funcionAgenda != undefined && this.props.funcionAgenda.data != null && this.props.funcionAgenda.data != undefined && this.props.funcionAgenda.data.tipo != null && this.props.funcionAgenda.data.tipo != undefined ? this.props.funcionAgenda.data.tipo : null;
            let encodedParams: string = global.encodeParameters({ activos: 1, FuncionAgenda: funcionAgenda });
            let p: any = global.assign({
                activos: 1, FuncionAgenda: funcionAgenda
            });

            global.asyncPost("base/kontrol/agendaSPV/GetBP/getStateCalendarDashBoard/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                if (status === AsyncActionTypeEnum.successful) {
                    if (funcionAgenda === "PostVenta") {
                        Forms.updateFormElement(this.state.pageId, "TipoAgenda", { ID: -2, Clave: "Ver Todos" });
                    };
                    global.dispatchSuccessful("load::EstadoSeleccionado", data);
                }
            });
        };

        componentWillUnmount() {
            Forms.reset(this.state.pageId);
            dispatchDefault("load::UsuariosAgenda", {});
            dispatchDefault("load::dashBoardAgendaIndicadoresEstados", {});
            dispatchDefault("load::catalogo$AgendaDetallesCitaResult", {});
            dispatchDefault("load::AgendaDashBoard", null);
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", {});
            Forms.updateFormElement("CapturaInfo", "ContratistaOTAgendaEdit", {});
            Forms.updateFormElement(this.state.pageId, "FraccionamientosGeo", {});
        };

        componentWillReceiveProps(nextProps: IAgendaDashBoard) {
            //console.log(nextProps)
            if (this.props.fSeleccionado !== undefined) {
                if (hasChanged(this.props.fSeleccionado.data, nextProps.fSeleccionado.data)) {
                    //console.log('Cambiando fraccionamiento');
                    // console.log(this.props.fSeleccionado.data, nextProps.fSeleccionado.data);
                    let idTipoAgenda: any = Forms.getValue("TipoAgenda", this.state.pageId) && Forms.getValue("TipoAgenda", this.state.pageId).ID ? Forms.getValue("TipoAgenda", this.state.pageId).ID : null;
                    let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", this.state.pageId) && Forms.getValue("PlazaInicial", this.state.pageId).ID ? Forms.getValue("PlazaInicial", this.state.pageId).ID : null;
                    let estadoSeleccionado: any = EK.Store.getState().global.EstatusAgendaSelected ? getData(EK.Store.getState().global.EstatusAgendaSelected).Clave : null;
                    idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
                    idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
                    //let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : null;
                    let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).ID ? getData(nextProps.usuarioSeleccionado).ID : null;
                    estadoSeleccionado = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item._action && getData(nextProps.usuarioSeleccionado).item._action != undefined ? getData(nextProps.usuarioSeleccionado).item._action : estadoSeleccionado;
                    let vocacion = nextProps.vocacion.data && nextProps.vocacion.data.Clave ? nextProps.vocacion.data.Clave : null;
                    let funcionAgenda: string = this.props.funcionAgenda != null && this.props.funcionAgenda != undefined && this.props.funcionAgenda.data != null && this.props.funcionAgenda.data != undefined && this.props.funcionAgenda.data.tipo != null && this.props.funcionAgenda.data.tipo != undefined ? this.props.funcionAgenda.data.tipo : null;
                    let calendar: any = $('#AgendaDashBoard');
                    const fechaActualRender = calendar.fullCalendar('getDate').format();
                    let fSeleccionado = nextProps.fSeleccionado && nextProps.fSeleccionado.data && !Array.isArray(nextProps.fSeleccionado.data) ? nextProps.fSeleccionado.data : null;
                    //console.log(fSeleccionado)
                    if (fSeleccionado) {
                        let p: any = global.assign({
                            activos: 1,
                            TipoAgenda: idTipoAgenda,
                            IdPlaza: idPlazaSeleccionada,
                            ClaveEstado: estadoSeleccionado,
                            UsuarioSeleccionado: usuarioSeleccionado,
                            FuncionAgenda: funcionAgenda,
                            FechaInicio: fechaActualRender,
                            fSeleccionado,
                            vocacion
                        });

                        let p_2: any = global.assign({
                            activos: 1, TipoAgenda: idTipoAgenda, IdPlaza: idPlazaSeleccionada, ClaveEstado: estadoSeleccionado, FuncionAgenda: funcionAgenda, FechaInicio: fechaActualRender
                        });

                        dispatchSuccessful('load::ParametrosReloadAgenda', p);
                        dispatchAsyncPost("load::AgendaDashBoard", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
                        //console.log('buscar a')
                    } else {
                        dispatchSuccessful('load::AgendaDashBoard', []);
                    }
                    
                }
            }

            if (this.props.vocacion !== undefined && this.props.config && this.props.config.id && this.props.config.id === 'DashBoardAgendaContratista') {
                if (global.isSuccessful(nextProps.vocacion)) {
                    if (hasChanged(this.props.vocacion.data, nextProps.vocacion.data)) {
                       // console.log(nextProps.vocacion.data)
                        if (nextProps.vocacion.data.Clave) {
                            //console.log('Cambiando fraccionamiento');
                            // console.log(this.props.fSeleccionado.data, nextProps.fSeleccionado.data);
                            let idTipoAgenda: any = Forms.getValue("TipoAgenda", this.state.pageId) && Forms.getValue("TipoAgenda", this.state.pageId).ID ? Forms.getValue("TipoAgenda", this.state.pageId).ID : null;
                            let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", this.state.pageId) && Forms.getValue("PlazaInicial", this.state.pageId).ID ? Forms.getValue("PlazaInicial", this.state.pageId).ID : null;
                            let estadoSeleccionado: any = EK.Store.getState().global.EstatusAgendaSelected ? getData(EK.Store.getState().global.EstatusAgendaSelected).Clave : null;
                            idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
                            idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
                            //let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : null;
                            let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).ID ? getData(nextProps.usuarioSeleccionado).ID : null;
                            estadoSeleccionado = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item._action && getData(nextProps.usuarioSeleccionado).item._action != undefined ? getData(nextProps.usuarioSeleccionado).item._action : estadoSeleccionado;
                            let vocacion = nextProps.vocacion.data && nextProps.vocacion.data.Clave ? nextProps.vocacion.data.Clave : null;
                            let funcionAgenda: string = this.props.funcionAgenda != null && this.props.funcionAgenda != undefined && this.props.funcionAgenda.data != null && this.props.funcionAgenda.data != undefined && this.props.funcionAgenda.data.tipo != null && this.props.funcionAgenda.data.tipo != undefined ? this.props.funcionAgenda.data.tipo : null;
                            let calendar: any = $('#AgendaDashBoard');
                            const fechaActualRender = calendar.fullCalendar('getDate').format();
                            let fSeleccionado = nextProps.fSeleccionado && nextProps.fSeleccionado.data && !Array.isArray(nextProps.fSeleccionado.data) ? nextProps.fSeleccionado.data : null;
                            //if (idPlazaSeleccionada && funcionAgenda && vocacion) {
                                let p: any = global.assign({
                                    activos: 1,
                                    TipoAgenda: idTipoAgenda,
                                    IdPlaza: idPlazaSeleccionada,
                                    ClaveEstado: estadoSeleccionado,
                                    UsuarioSeleccionado: usuarioSeleccionado,
                                    FuncionAgenda: funcionAgenda,
                                    FechaInicio: fechaActualRender,
                                    fSeleccionado,
                                    vocacion
                                });

                                let p_2: any = global.assign({
                                    activos: 1, TipoAgenda: idTipoAgenda, IdPlaza: idPlazaSeleccionada, ClaveEstado: estadoSeleccionado, FuncionAgenda: funcionAgenda, FechaInicio: fechaActualRender
                                });
                            //console.log(p)
                            //console.log(this.props)
                                dispatchSuccessful('load::ParametrosReloadAgenda', p);
                                dispatchAsyncPost("load::AgendaDashBoard", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
                                console.log('buscar a')
                           // }
                            
                        }
                        
                    }
                }
            }

            if (hasChanged(this.props.usuarioSeleccionado, nextProps.usuarioSeleccionado)) {
                if (global.isSuccessful(nextProps.usuarioSeleccionado)) {
                    let idTipoAgenda: any = Forms.getValue("TipoAgenda", this.state.pageId) && Forms.getValue("TipoAgenda", this.state.pageId).ID ? Forms.getValue("TipoAgenda", this.state.pageId).ID : null;
                    let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", this.state.pageId) && Forms.getValue("PlazaInicial", this.state.pageId).ID ? Forms.getValue("PlazaInicial", this.state.pageId).ID : null;
                    let estadoSeleccionado: any = EK.Store.getState().global.EstatusAgendaSelected ? getData(EK.Store.getState().global.EstatusAgendaSelected).Clave : null;
                    idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
                    idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
                    //let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : null;
                    let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).ID ? getData(nextProps.usuarioSeleccionado).ID : null;
                    estadoSeleccionado = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item._action && getData(nextProps.usuarioSeleccionado).item._action != undefined ? getData(nextProps.usuarioSeleccionado).item._action : estadoSeleccionado;
                    let vocacion = nextProps.vocacion.data && nextProps.vocacion.data.Clave ? nextProps.vocacion.data.Clave : null;
                    let funcionAgenda: string = this.props.funcionAgenda != null && this.props.funcionAgenda != undefined && this.props.funcionAgenda.data != null && this.props.funcionAgenda.data != undefined && this.props.funcionAgenda.data.tipo != null && this.props.funcionAgenda.data.tipo != undefined ? this.props.funcionAgenda.data.tipo : null;
                    let calendar: any = $('#AgendaDashBoard');
                    const fechaActualRender = calendar.fullCalendar('getDate').format();
                    //console.log(EK.Store.getState().global.fSeleccionado)
                    //let fs = EK.Store.getState().global.fSeleccionado !== undefined && EK.Store.getState().global.fSeleccionado !== null ? EK.Store.getState().global.fSeleccionado.data : '-2';
                    let fSeleccionado = nextProps.fSeleccionado && nextProps.fSeleccionado.data && !Array.isArray(nextProps.fSeleccionado.data) ? nextProps.fSeleccionado.data : null;

                    let p: any = global.assign({
                        activos: 1,
                        TipoAgenda: idTipoAgenda,
                        IdPlaza: idPlazaSeleccionada,
                        ClaveEstado: estadoSeleccionado,
                        UsuarioSeleccionado: usuarioSeleccionado,
                        FuncionAgenda: funcionAgenda,
                        FechaInicio: fechaActualRender,
                        fSeleccionado,
                        vocacion
                    });
                    if (idTipoAgenda === null || idTipoAgenda === undefined) {
                        return;
                    }
                    console.log(p)
                    dispatchSuccessful('load::ParametrosReloadAgenda', p);
                    dispatchAsyncPost("load::AgendaDashBoard", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
                    //dispatchAsyncPost("load::UsuariosAgenda", "base/kontrol/agendaSPV/GetBP/getUsersCalendarDashBoard/", { parametros: p });
                    //console.log('Buscar b',p)
                }
            };
            if (hasChanged(this.props.buscador, nextProps.buscador)) {
                if (global.isSuccessful(nextProps.buscador)) {
                    let data = getData(nextProps.buscador)
                    dispatchSuccessful("load::UsuarioAgendaSelected", data)
                }
            };
            if (hasChanged(nextProps.agendaActualizada, this.props.agendaActualizada) && global.isSuccessful(nextProps.agendaActualizada)) {
                //aqui deberia hacer el render de las otras citas y regargar la agenda del usuario o administrador
                let item: any = getData(nextProps.agendaActualizada);
                switch (item.Estado) {
                    case 5: // eliminado con exito
                        let idTipoAgenda: any = Forms.getValue("TipoAgenda", this.state.pageId) && Forms.getValue("TipoAgenda", this.state.pageId).ID ? Forms.getValue("TipoAgenda", this.state.pageId).ID : null;
                        let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", this.state.pageId) && Forms.getValue("PlazaInicial", this.state.pageId).ID ? Forms.getValue("PlazaInicial", this.state.pageId).ID : null;
                        let estadoSeleccionado: any = EK.Store.getState().global.EstatusAgendaSelected ? getData(EK.Store.getState().global.EstatusAgendaSelected).Clave : null;
                        idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
                        idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
                        let usuarioSeleccionado: any = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item.ID ? getData(nextProps.usuarioSeleccionado).item.ID : null;
                        estadoSeleccionado = nextProps.usuarioSeleccionado && getData(nextProps.usuarioSeleccionado).item && getData(nextProps.usuarioSeleccionado).item._action && getData(nextProps.usuarioSeleccionado).item._action != undefined ? getData(nextProps.usuarioSeleccionado).item._action : estadoSeleccionado;
 
                        let funcionAgenda: string = this.props.funcionAgenda != null && this.props.funcionAgenda != undefined && this.props.funcionAgenda.data != null && this.props.funcionAgenda.data != undefined && this.props.funcionAgenda.data.tipo != null && this.props.funcionAgenda.data.tipo != undefined ? this.props.funcionAgenda.data.tipo : null;

                        let p: any = global.assign({
                            activos: 1,
                            TipoAgenda: idTipoAgenda,
                            IdPlaza: idPlazaSeleccionada,
                            ClaveEstado: estadoSeleccionado,
                            UsuarioSeleccionado: usuarioSeleccionado,
                            FuncionAgenda: funcionAgenda,
                        });
                        global.dispatchAsyncPost("load::AgendaDashBoardGrid", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoardGrid/", { parametros: p });
                        global.dispatchAsyncPost("load::dashBoardAgendaIndicadoresEstados", "base/kontrol/agendaSPV/GetBP/getStateCalendarDashBoard/", { parametros: p });
                        break;
                    default:
                        break;
                }
            }
        };

        cambiarTipoAgenda() {

        }

        removeNodeHtml(nodes) {
            nodes[0].remove();
            if (nodes.length > 0) {
                this.removeNodeHtml(nodes);
            }
            else {
                return;
            }
        }
        clearPopOver() {
            //var eventos:any = document.getElementsByClassName("fc-day-grid-event fc-h-event fc-start fc-end");
            var eventos:any = document.getElementsByClassName("popover");
            if (eventos.length > 0) {
                this.removeNodeHtml(eventos);
            }
        }
        onSelectTipo(tipo?: any): void {
            if (tipo === "LISTA") {
                this.setState(global.assign(this.state, { modoAgenda: false }));
                let funcionAgenda: string = getData(EK.Store.getState().global.funcionAgenda).tipo;
                let pageId: string;
                switch (funcionAgenda) {
                    case "PostVenta": pageId = "Agenda"; break;
                    case "Contratista": pageId = "DashBoardAgendaContratista"; break;
                    case "ContratistaAreasComunes": pageId = "AgendaAreasComunes"; break;
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
                });
                global.dispatchAsyncPost("load::AgendaDashBoardGrid", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoardGrid/", { parametros: p });

            } else {
                this.setState(global.assign(this.state, { modoAgenda: true }));
                const fechaActualRender = EK.Store.getState().global.FechaCalendarioInicial.data
                setTimeout(() => {
                    let calendar: any = $('#AgendaDashBoard');
                    calendar.fullCalendar('gotoDate', fechaActualRender);
                }, 10)

            }
        };

        toStringDate(date: any) {
            let ndate = new Date(date);
            let dateString = `${ndate.getDate() > 9 ? ndate.getDate() : '0' + ndate.getDate()}/${ndate.getMonth() > 8 ? ndate.getMonth() + 1 : '0' + ndate.getMonth()}/${ndate.getFullYear()}`;
            return dateString;
        }

        onExportToExcel() {

            let usuarioSeleccionado = EK.Store.getState().global.UsuarioAgendaSelected && getData(EK.Store.getState().global.UsuarioAgendaSelected).item && getData(EK.Store.getState().global.UsuarioAgendaSelected).item.ID ? getData(EK.Store.getState().global.UsuarioAgendaSelected).item.ID : null;
            let idTipoAgenda: any = Forms.getValue("TipoAgenda", this.state.pageId) && Forms.getValue("TipoAgenda", this.state.pageId).ID ? Forms.getValue("TipoAgenda", this.state.pageId).ID : null;
            let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", this.state.pageId) && Forms.getValue("PlazaInicial", this.state.pageId).ID ? Forms.getValue("PlazaInicial", this.state.pageId).ID : null;
            let estadoSeleccionado: any = EK.Store.getState().global.EstatusAgendaSelected ? getData(EK.Store.getState().global.EstatusAgendaSelected).Clave : null;
            idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
            idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
            let vocacion = this.props.vocacion.data && this.props.vocacion.data.Clave ? this.props.vocacion.data.Clave : null;
           // console.log()
            estadoSeleccionado = EK.Store.getState().global.UsuarioAgendaSelected && getData(EK.Store.getState().global.UsuarioAgendaSelected).item && getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action && getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action != undefined ? getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action : estadoSeleccionado;

            let funcionAgenda: string = this.props.funcionAgenda != null && this.props.funcionAgenda != undefined && this.props.funcionAgenda.data != null && this.props.funcionAgenda.data != undefined && this.props.funcionAgenda.data.tipo != null && this.props.funcionAgenda.data.tipo != undefined ? this.props.funcionAgenda.data.tipo : null;

            let filtros: any = {};
            filtros['activos'] = "1";
            filtros['TipoAgenda'] = idTipoAgenda;
            filtros['IdPlaza'] = idPlazaSeleccionada;
            filtros['ClaveEstado'] = estadoSeleccionado;
            filtros['UsuarioSeleccionado'] = usuarioSeleccionado;
            filtros['FuncionAgenda'] = funcionAgenda;
            filtros['FechaInicio'] = Forms.getValue("ReportDateCalendarStart", this.props.config.id);
            filtros['FechaFin'] = Forms.getValue("ReportDateCalendarEnd", this.props.config.id);
            filtros['fSeleccionado'] = EK.Store.getState().global.fSeleccionado !== null && EK.Store.getState().global.fSeleccionado !== undefined ? EK.Store.getState().global.fSeleccionado.data : '-2';
            filtros['vocacion'] = vocacion;

           // console.log(filtros)
            //let tipoAgendaTitulo = filtros.idTipoAgenda === 

            global.asyncPost("base/kontrol/agendaSPV/GetBP/getAgendaDataForExportExcel", { parametros: filtros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //console.log(data)
                        if (data && data.length > 0) {
                            const workbook = new ExcelJS.Workbook();
                            const worksheet = workbook.addWorksheet(`Agenda de ${filtros.FuncionAgenda}`);
                            worksheet.mergeCells("A1", "G1"); // Une varias celdas
                            worksheet.getCell("A1").value = `Agenda de ${ filtros.FuncionAgenda }`;
                            worksheet.getCell("A1").font = { size: 16, bold: true };
                            worksheet.getCell("A1").alignment = { horizontal: "center" };

                            worksheet.mergeCells("A2", "G2");
                            worksheet.getCell("A2").value = `Desde ${this.toStringDate(filtros.FechaInicio)} al ${this.toStringDate(filtros.FechaFin)}`;
                            worksheet.getCell("A2").font = { size: 12, italic: true, color: { argb: "555555" } };
                            worksheet.getCell("A2").alignment = { horizontal: "center" };
                            worksheet.addRow([]);

                            const columnas = ["Asignado", "Fecha Hora", "Descripcion", "Folio", "Orden", "Ubicacion", "Estatus", "Motivo Reprogramacion"];
                            const headerRow = worksheet.addRow(columnas);
                            headerRow.eachCell((cell) => {
                                cell.font = { bold: true, color: { argb: "FFFFFF" } };
                                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } }; // azul
                                cell.alignment = { horizontal: "center" };
                            });

                            data.forEach((item) => {
                                //let nd = new Date(item.FechaInicio);
                                //let dateString = `${nd.getDate() > 9 ? nd.getDate() : '0' + nd.getDate()}/${nd.getMonth() > 8 ? nd.getMonth() + 1 : '0' + nd.getMonth()}/${nd.getFullYear()}`;
                                worksheet.addRow([
                                    item.Asignado,
                                    this.toStringDate(item.FechaInicio) + ' '+  item.HoraInicio,
                                    item.Descripcion,
                                    item.IdExpediente,
                                    item.IdOrden,
                                    item.AtenderA,
                                    item.Estatus.Nombre,
                                    item.MotivoRep,
                                ]);
                            });

                            worksheet.columns.forEach((col) => {
                                let maxLength = 10;
                                col.eachCell({ includeEmpty: true }, (cell) => {
                                    const value = cell.value ? cell.value.toString() : "";
                                    if (value.length > maxLength) maxLength = value.length;
                                });
                                col.width = maxLength + 2;
                            });
                            let timestamp = Date.now();
                            // --- 7️⃣ Exportar archivo con FileSaver ---
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                const blob = new Blob([buffer], {
                                    type:
                                        //"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                        "application/octet-stream",
                                });
                                saveAs(blob, `Agenda_${filtros.FuncionAgenda}_${timestamp}.xlsx`);
                            });
                            console.log(data);
                        } else {
                            global.info('No se encontro ninguna plantificacion en el rango de fechas')
                            console.log(data)
                        }


                        break;
                    case AsyncActionTypeEnum.loading:
                        //loader.style.display = 'block';
                        //loadedTable.style.display = 'none';
                        //global.warning('Se produjo un error al consultar la agenda')
                        break;
                    case AsyncActionTypeEnum.failed:
                        global.warning('Se produjo un error al consultar la agenda')
                        //loader.style.display = 'none';
                        //loadedTable.style.display = 'none';

                        break;
                }
            });
        }

        onPrintGrid(): void {
            //console.log('sds');
            let usuarioSeleccionado = EK.Store.getState().global.UsuarioAgendaSelected && getData(EK.Store.getState().global.UsuarioAgendaSelected).item && getData(EK.Store.getState().global.UsuarioAgendaSelected).item.ID ? getData(EK.Store.getState().global.UsuarioAgendaSelected).item.ID : null;
            let idTipoAgenda: any = Forms.getValue("TipoAgenda", this.state.pageId) && Forms.getValue("TipoAgenda", this.state.pageId).ID ? Forms.getValue("TipoAgenda", this.state.pageId).ID : null;
            let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", this.state.pageId) && Forms.getValue("PlazaInicial", this.state.pageId).ID ? Forms.getValue("PlazaInicial", this.state.pageId).ID : null;
            let estadoSeleccionado: any = EK.Store.getState().global.EstatusAgendaSelected ? getData(EK.Store.getState().global.EstatusAgendaSelected).Clave : null;
            idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
            idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
            let vocacion = this.props.vocacion.data && this.props.vocacion.data.Clave ? this.props.vocacion.data.Clave : null;

            estadoSeleccionado = EK.Store.getState().global.UsuarioAgendaSelected && getData(EK.Store.getState().global.UsuarioAgendaSelected).item && getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action && getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action != undefined ? getData(EK.Store.getState().global.UsuarioAgendaSelected).item._action : estadoSeleccionado;

            let funcionAgenda: string = this.props.funcionAgenda != null && this.props.funcionAgenda != undefined && this.props.funcionAgenda.data != null && this.props.funcionAgenda.data != undefined && this.props.funcionAgenda.data.tipo != null && this.props.funcionAgenda.data.tipo != undefined ? this.props.funcionAgenda.data.tipo : null;

            let item: any = {};
            item['activos'] = "1";
            item['TipoAgenda'] = idTipoAgenda;
            item['IdPlaza'] = idPlazaSeleccionada;
            item['ClaveEstado'] = estadoSeleccionado;
            item['UsuarioSeleccionado'] = usuarioSeleccionado;
            item['FuncionAgenda'] = funcionAgenda;
            item['FechaInicio'] = Forms.getValue("ReportDateCalendarStart", this.props.config.id);
            item['FechaFin'] = Forms.getValue("ReportDateCalendarEnd", this.props.config.id);
            item['fSeleccionado'] = EK.Store.getState().global.fSeleccionado !== null && EK.Store.getState().global.fSeleccionado !== undefined ? EK.Store.getState().global.fSeleccionado.data : '-2';
            item['vocacion'] = vocacion;

            let formName: string = "PrintCalendarContractors";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "base/scv/AgendaSPV/print/printDocumentAgendaDashBoardGrid/");
            form.setAttribute("target", formName);
            //
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = (JSON.stringify(item));
            form.appendChild(input);
            //
            document.body.appendChild(form);
            //
            window.open("about:blank", formName);
            //
            form.submit();
            //
            document.body.removeChild(form);
        };
        onSendCalendar(idUsuario: any) {
            let redirectPath: string;
            redirectPath = "/base/kontrol/usuarios/getBP/SendCalendar/" + global.encodeParameters({ id: idUsuario });
            var pathDispatch = global.getFullUrl(redirectPath, "");
            //
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=UTF-8",
                url: pathDispatch,
                async: true
            }).done((data: any): any => {
                global.success("Calendario enviado", "Completado");
            }).fail((jqXHR: any, textStatus: any): any => {
                global.errorMessage("Error no se pudo enviar el calendario", "Completado");
            }).always((): any => {
            });
        };



        onclickView(item: any, state: any, props): void {
            Forms.updateFormElement("CapturaInfo", "DetalleCteAgendaEdit", null);
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", null);
            Forms.updateFormElement("CapturaInfo", "ContratistaOTAgendaEdit", null);

            let idAgenda: any = item.ID;
            let claveTipoAgenda: any = item.TipoAgenda.Clave;
            dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: claveTipoAgenda });
            let p: any = global.assign({
                IdAgenda: idAgenda,
                ClaveTipoAgenda: claveTipoAgenda,
                IdAgendaDetalle: 0,
            });
            global.dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p }, "AgendaDetallesCitaResult");

            let modalAgenda: any = $("#modalAgendaInformacionCita");
            modalAgenda.modal();
            modalAgenda.css("height", "auto");
        };

        onFilter(props: any, filters: any, type?: string): void { };
        render(): JSX.Element {
            //let data;
            //try {
            //    console.log(EK.Store.getState().global.AgendaDashBoard.data.Events);
            //} catch (ex) {}

            let ml: any = $ml["Agenda"];
            let pageId: string = this.state.pageId;
            let verBotonAgregar: boolean = false;
            let claveTipoAgenda: any = Forms.getValue("TipoAgenda", pageId) && Forms.getValue("TipoAgenda", pageId).Clave ? Forms.getValue("TipoAgenda", pageId).Clave : null;
            let modoAgenda: boolean = this.state.modoAgenda;
            let seleccionoUsario: any = this.props.usuarioSeleccionado != null &&
                this.props.usuarioSeleccionado.data != null &&
                this.props.usuarioSeleccionado.data.item != null &&
                this.props.usuarioSeleccionado.data.item.ID != null ? this.props.usuarioSeleccionado.data.item.ID : null;
            let funcionAgenda: string = this.props.funcionAgenda != null && this.props.funcionAgenda != undefined && this.props.funcionAgenda.data != null && this.props.funcionAgenda.data != undefined && this.props.funcionAgenda.data.tipo != null && this.props.funcionAgenda.data.tipo != undefined ? this.props.funcionAgenda.data.tipo : null;
            seleccionoUsario = funcionAgenda === "PostVenta" ? seleccionoUsario : null;

            let formatNombre: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "<span id= '" + row.ID + "'ref='link'  role='button' data-trigger='focus' data-toggle='popover' onMouseEnter='mostrarDetalleTarea(" + row.ID + ")' class='popovers' > " + data + "</span> ";
            };
            let tipoAgenda: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "<div style='text-align: center;'><i class='" + row.TipoAgendaIcono + "' " + "style=' font-size: 15px'> </i > </div > ";
            };
            let estatusAgenda: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "<div style='text-align: center;'><i class='" + row.EstatusAgendaIcono + "' " + "style='color: " + row.EstatusAgendaIconoColor + "; font-size: 15px'> </i > </div >";
            };
            let dateTimeDirect: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return global.formatDateTimeDirect(data, true);
            };
            if (claveTipoAgenda != null && claveTipoAgenda != undefined && (claveTipoAgenda === 'EntregaVivienda' || claveTipoAgenda === 'Contratista' || claveTipoAgenda === 'FechaConstruccion' || claveTipoAgenda === 'EntregaVivienda')) {
                verBotonAgregar = true;
            };
            let tituloAtender: any = funcionAgenda === "PostVenta" ? "Cliente" : "Ubicación";
            let tituloAsignado: any = funcionAgenda === "PostVenta" ? "Usuario" : claveTipoAgenda === "Contratista" ? "Contratista" : "Supervisor";
            let tituloIdExpediente: any = funcionAgenda === "PostVenta" ? "Id Cliente" : "Id Folio";

            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "TipoAgendaIcono", title: "Tipo", width: 3, render: tipoAgenda })
                .add({ data: "Estatus", width: 4, render: estatusAgenda })
                .add({ data: "FechaInicio", title: "Inicio", width: 6, render: dateTimeDirect })
                .add({ data: "FechaFin", title: "Fin", width: 6, render: dateTimeDirect })
                .add({ data: "AtenderA", title: tituloAtender, width: 10 })
                .add({ data: "Asignado", title: tituloAsignado, width: 13 })
                .add({ data: "IdExpediente", title: tituloIdExpediente, width: 4 })
                .addDateTime({ data: "Creado", title: "Fecha Creación", width: 7 })
                .toArray();

            let config: page.IPageConfig = global.createPageConfig(pageId, "scv", []);
            if (config.id === "DashBoardAgendaContratista") {
                config.slots.push(PAGE_ORDEN_TRABAJO_ID);
                config.slots.push(PAGE_ORDEN_TRABAJO_RESERVA_ID);
            };
            if (config.id === "AgendaAreasComunes") {
                config.slots.push(PAGE_ORDEN_TRABAJO_ID);
                config.slots.push(PAGE_ORDEN_TRABAJO_RESERVA_ID);
            };
            let widthHT = 10;
            let plazasSize = [12, 8, 8, 8];

            switch (funcionAgenda) {
                case 'PostVenta':
                    widthHT = 10;
                    break;
                case 'Contratista':
                    plazasSize = [12, 2, 2, 2];
                    break;
            }
           // console.log(this.props.vocacion)
            return <page.Main {...config} pageMode={PageMode.Principal} allowNew={verBotonAgregar} onNew={this.onNewCalendar.bind(this)} onFilter={this.onFilter.bind(this)} allowSave={false} allowEdit={false} allowDelete={false} allowExcel={false} forceUpdate={true}>
                <NewCalendarModal size={[12, 12, 12, 12]} />
                <Row>
                    <page.OptionSection
                        id={pageId}
                        subTitle={"Filtros de la Agenda"}
                        level={2}
                        icon="far fa-address-book"
                        collapsed={false}>
                        <Row style={{ marginLeft: "0px", marginRight: "0px", marginBottom: "10px" }} >
                            {/*<TipoAgendaDDL id="TipoAgenda" idForm={pageId} size={[12, 4, 4, 4]} change={this.cambiarTipoAgenda} validations={[validations.required()]} agregarTodos={true} />*/}
                            <TipoAgendaFixedDDL id="TipoAgenda" idForm={pageId} size={[12, 4, 4, 4]} change={this.cambiarTipoAgenda} validations={[validations.required()]} agregarTodos={true} />
                            <PlazasFixedDDL id="PlazaInicial" idForm={pageId} size={plazasSize} label={"PLAZA"} validations={[validations.required()]} required={true} />
                            {funcionAgenda === "Contratista" ?
                                <span>
                                    <ddl.VocacionesFilterDDL id="Vocaciones" idForm={pageId} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                                    <FraccionamientosDashBoardFailureReportDDL id={"Fraccionamientos"} size={[12, 4, 4, 4]} idForm={pageId} /*idForm={this.props.pageId} */ validations={[validations.required()]} required={true} /> 
                                    </span>
                                    : null

                                // <FraccionamientosGeoJsonDDL id={"FraccionamientosGeo"} size={[12, 4, 4, 4]} idForm={pageId} style={{ marginLeft: "-15px" }} validations={[validations.required()]} required={true} add />:null
                            }
                        </Row>
                        <Row style={{ marginLeft: "10px", marginRight: "10px" }} >
                            <CalendarType pageId={pageId} />
                            <Column size={[12, 12, widthHT, widthHT]}  >
                                <AgendaDashBoardEntregaVivienda.AgendaDashBoardEntregaViviendaGeneral pageId={pageId} />
                            </Column>
                            {funcionAgenda === "PostVenta" ?
                                /*<MapView pageId={pageId} />*/null : null}
                        </Row>
                    </page.OptionSection>
                    <Row>
                        <Column size={[12, 12, 5, 5]} style={{ float: "Right", top: "10px" }}  >
                            <div className="input-group right-addon">
                                <DatePicker id={"ReportDateCalendarStart"} size={[6, 6, 6, 6]} label={"Fecha Inicio"} type="date" idForm={this.props.config.id} value={global.getObtenerFecha()} validations={[validations.required()]} />
                                <DatePicker id={"ReportDateCalendarEnd"} size={[6, 6, 6, 6]} label={"Fecha Fin"} type="date" idForm={this.props.config.id} value={global.getObtenerFecha()} validations={[validations.required()]} />
                                <span className="input-group-btn">
                                    <Button className="btn default" onClick={() => this.onPrintGrid()} style={{ height: "30px", top: "10px", left: "-14px", color: "rgb(38, 194, 129)" }}>
                                        <i className="fas fa-print"></i>
                                    </Button>
                                    <Button className="btn default" onClick={() => this.onExportToExcel()} style={{ height: "30px", top: "10px", left: "-14px", color: "rgb(38, 194, 129)" }}>
                                        <i className="fas fa-file-excel"></i>
                                    </Button>
                                </span>
                            </div>
                        </Column>
                    </Row>
                    <Row style={{ marginTop: "20px" }} >
                        <Column style={{ marginLeft: "11px" }} >
                            <Button size={[12, 12, 2, 2]} className="btn btn-md btn-editing" style={{ backgroundColor: (modoAgenda === true ? ' #9dbfea' : '#e9e7e7'), color: "#FFFFFF", width: "120px" }} icon="far fa-calendar-alt" onClick={() => this.onSelectTipo('CALENDARIO')} > Calendario</Button>
                            <Button size={[12, 12, 2, 2]} className="btn btn-md btn-editing" style={{ backgroundColor: (modoAgenda === true ? '#e9e7e7' : ' #9dbfea'), color: "#FFFFFF", width: "120px" }} icon="fas fa-bars" onClick={() => this.onSelectTipo('LISTA')} > Lista</Button>
                            <Button size={[12, 12, 12, 4]} className="btn btn-xs btn-editing" style={{ backgroundColor: '#8ad48c', color: "#FFFFFF", width: "250px", position: "absolute", right: "37px" }} icon="fas fa-eraser" onClick={() => this.clearPopOver()} > Limpiar info </Button> 
                            {seleccionoUsario != null ? <Button size={[12, 12, 12, 4]} className="btn btn-md btn-editing" style={{ backgroundColor: '#8ad48c', color: "#FFFFFF", width: "250px", position: "absolute", right: "37px" }} icon="fas fa-share-square" onClick={() => this.onSendCalendar(seleccionoUsario)} > Enviar Calendario </Button> : null}
                        </Column>
                    </Row>
                    <Row style={{ marginLeft: "10px", marginRight: "10px" }} >
                        <div className="portlet light bordered  ek-sombra" style={{ paddingRight: "5px", paddingLeft: "5px", paddingBottom: "5px" }}>
                            <div>
                                {modoAgenda === true ?
                                    <calendar.GlobalAgendaDashBoard id="AgendaDashBoard" minTime={"07:00:00"} maxTime={"20:00:00"} />
                                    : <PageTable
                                        columns={columns}
                                        pageId={pageId}
                                        onRowDoubleClick={this.onclickView}
                                        onRowRightClick={this.onclickView} />
                                }
                            </div>
                        </div>
                    </Row>
                </Row>
            </page.Main>;
        };
    });

    class PageTable extends React.Component<any, any> {
        static props: any = (state: any) => ({
            data: state.global.AgendaDashBoardGrid
        });
        component: any = ReactRedux.connect(PageTable.props, null)(DataTable);
        render(): any {
            return <this.component {...this.props} />;
        };
    };

    interface IMapViewProps extends page.IProps {
        entidad?: any;
        state?: DataElement;
        asentamiento: any;
        geolocalizacion: string;
        usuarioSeleccionado?: any;
        pageId: string;
        fraccionamientoSeleccionado?: string;
    };

    interface IMapViewState extends IAgendaState {
        useLocation: boolean;
    };


    let MapView: any = global.connect(class extends React.Component<IMapViewProps, IMapViewState> {
        constructor(props: IMapViewProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.usuarioSeleccionado = state.global.UsuarioAgendaSelected;
            retValue.fraccionamientoSeleccionado = Forms.getDataValue("FraccionamientosGeo", state.pageId, state);
            return retValue;
        };
        componentWillReceiveProps(nextProps: IMapViewProps): void {
            if (hasChanged(this.props.usuarioSeleccionado, nextProps.usuarioSeleccionado)) {
                if (isSuccessful(nextProps.usuarioSeleccionado)) {
                    //Forms.updateFormElement(getData(EK.Store.getState().global.pageConfig).id, "FraccionamientosGeo", {})
                    let datosFraccionamientos = getData(EK.Store.getState().global.DDLFRACCIONAMIENTOSGEOJSON);
                    dispatchSuccessful("load::DDLFRACCIONAMIENTOSGEOJSON", datosFraccionamientos);
                };

            };
        };

        shouldComponentUpdate(nextProps: IMapViewProps, nextState: IMapViewProps): any {
            return hasChanged(this.props.fraccionamientoSeleccionado, nextProps.fraccionamientoSeleccionado);
        };

        render(): JSX.Element {
            let mapLocation: string = "";
            let pageId: string = this.props.pageId;
            let idTipoAgenda: any = Forms.getValue("TipoAgenda", pageId) && Forms.getValue("TipoAgenda", pageId).ID ? Forms.getValue("TipoAgenda", pageId).ID : null;
            let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", pageId) && Forms.getValue("PlazaInicial", pageId).ID ? Forms.getValue("PlazaInicial", pageId).ID : null;
            let idFraccionamientoSeleccionado: any = Forms.getValue("FraccionamientosGeo", pageId) && Forms.getValue("FraccionamientosGeo", pageId).Clave ? Forms.getValue("FraccionamientosGeo", pageId).Clave : null;
            let estadoSeleccionado: any = EK.Store.getState().global.EstatusAgendaSelected ? getData(EK.Store.getState().global.EstatusAgendaSelected).Clave : null;
            let buscarMapa: boolean = false;
            if (idPlazaSeleccionada != null && idTipoAgenda != null && idFraccionamientoSeleccionado != null) {
                buscarMapa = true
            }

            if (buscarMapa === true) {
                idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
                idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
                let usuarioSeleccionado: any = this.props.usuarioSeleccionado && getData(this.props.usuarioSeleccionado).item && getData(this.props.usuarioSeleccionado).item.ID ? getData(this.props.usuarioSeleccionado).item.ID : null;
                estadoSeleccionado = this.props.usuarioSeleccionado && getData(this.props.usuarioSeleccionado).item && getData(this.props.usuarioSeleccionado).item._action && getData(this.props.usuarioSeleccionado).item._action != undefined ? getData(this.props.usuarioSeleccionado).item._action : estadoSeleccionado;
                let funcionAgenda: string = EK.Store.getState().global.funcionAgenda != null && EK.Store.getState().global.funcionAgenda != undefined && EK.Store.getState().global.funcionAgenda.data != null && EK.Store.getState().global.funcionAgenda.data != undefined && EK.Store.getState().global.funcionAgenda.data.tipo != null && EK.Store.getState().global.funcionAgenda.data.tipo != undefined ? EK.Store.getState().global.funcionAgenda.data.tipo : null;
                //mapLocation = '/kontrol/map/multilocations/' + global.encodeObject({ activos: 1, TipoAgenda: idTipoAgenda, IdPlaza: idPlazaSeleccionada, ClaveEstado: estadoSeleccionado, UsuarioSeleccionado: usuarioSeleccionado, FuncionAgenda: funcionAgenda, Geo: '0' });
                mapLocation = "/kontrol/map/multilocations/" + global.encodeObject({ TA: idTipoAgenda, PS: idPlazaSeleccionada, CE: estadoSeleccionado, US: usuarioSeleccionado, FA: funcionAgenda, Geo: "0", FS: idFraccionamientoSeleccionado });
                mapLocation = global.getFullUrl(mapLocation, "");
            }
            return <Column size={[12, 12, 3, 3]} style={{ paddingRight: "5px", paddingLeft: "5px" }}>
                <div className="portlet light  portlet-fit  bordered  ek-sombra " style={{ height: "273px" }}>
                    <div className="portlet-body" style={{ height: "100%" }} >

                        <FraccionamientosGeoJsonDDL id={"FraccionamientosGeo"} size={[12, 12, 12, 12]} idForm={this.props.pageId} style={{ marginLeft: "-15px" }} validations={[validations.required()]} required={true} add />

                        {/*
                            <iframe
                                style={{ border: 0, width: "100%", height: "80%" }}
                                src={mapLocation} />*/}

                    </div>
                </div>
            </Column>;
        }
    });


    interface IFraccionamientosGeoJsonVDDLProps extends IDropDrownListProps {
        plazaSeleccionada?: global.DataElement;
    }

    export class FraccionamientosGeoJson$DDL extends React.Component<IFraccionamientosGeoJsonVDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.DDLFRACCIONAMIENTOSGEOJSON,
            plazaSeleccionada: Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
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

        componentWillReceiveProps(nextProps: IFraccionamientosGeoJsonVDDLProps, nextState: IFraccionamientosGeoJsonVDDLProps): void {
            if (global.hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada)) {
                if ((getData(nextProps.plazaSeleccionada).ID != getData(this.props.plazaSeleccionada).ID)) {
                    let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    Forms.updateFormElement(idForm, this.props.id, {})
                    //console.log(idForm); //'DashBoardAgendaContratista'
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2, ConCapasGeoJson: "1" });
                    //if (idForm === 'DashBoardAgendaContratista') {
                    //    encodedParams = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2 });
                    //} else {
                    //    encodedParams = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2, ConCapasGeoJson: "1" });
                    //}
                    let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;
                    if (idPlaza != undefined) {
                        dispatchAsync("load::DDLFRACCIONAMIENTOSGEOJSON", encodedURL);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IFraccionamientosGeoJsonVDDLProps, nextState: IFraccionamientosGeoJsonVDDLProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} /*addNewItem={"SO"} addNewItemText={"Indique el Fraccionamiento"}  */ />;
        };
    };

    export class FraccionamientosDashBoardFailureReport$DDL extends React.Component<IFraccionamientosGeoJsonVDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.fraccSeleccionado,
            plazaSeleccionada: Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state) //Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
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
        componentDidMount(): any {
            //dispatchSuccessful("load::fSeleccionado", '-2');
        }

        componentWillReceiveProps(nextProps: IFraccionamientosGeoJsonVDDLProps, nextState: IFraccionamientosGeoJsonVDDLProps): void {
            if (global.hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada)) {
                if ((getData(nextProps.plazaSeleccionada).ID != getData(this.props.plazaSeleccionada).ID)) {
                    let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

                    Forms.updateFormElement(idForm, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2 });
                    let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;
                    if (idPlaza != undefined) {
                        dispatchAsync("load::fraccSeleccionado", encodedURL);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IFraccionamientosGeoJsonVDDLProps, nextState: IFraccionamientosGeoJsonVDDLProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            ////////
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            //console.log(idForm)
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
            console.log(itemsModificados)
            ///////
            return <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" inDashboardCalendar={true} itemsFixed={itemsModificados} idForm={idForm} /> 

            //<EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} /*addNewItem={"SO"} addNewItemText={"Indique el Fraccionamiento"}  */ />;
        };
    };

    export const FraccionamientosGeoJsonDDL: any = ReactRedux.connect(FraccionamientosGeoJson$DDL.props, null)(FraccionamientosGeoJson$DDL);
    export const FraccionamientosDashBoardFailureReportDDL: any = ReactRedux.connect(FraccionamientosDashBoardFailureReport$DDL.props, null)(FraccionamientosDashBoardFailureReport$DDL);


    ///
    interface IOrdenTrabajoModalProps extends page.IProps {
        ordenTrabajo?: DataElement;
    };

    export const OrdenTrabajoModal: any = global.connect(class extends React.Component<IOrdenTrabajoModalProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.ordenTrabajo = state.global[["entity", PAGE_ORDEN_TRABAJO_ID].join("$")];
            return retValue;
        };
        componentDidMount(): void {
            this.props.config.setEntity({}, PAGE_ORDEN_TRABAJO_ID);
            this.props.config.setCatalogo([], PAGE_ORDEN_TRABAJO_ID);
        };
        componentWillReceiveProps(nextProps: IOrdenTrabajoModalProps): void {
            if (global.hasChanged(this.props.ordenTrabajo, nextProps.ordenTrabajo)) {
                if (global.isSuccessful(nextProps.ordenTrabajo)) {
                    let item: any = global.getData(nextProps.ordenTrabajo);
                    let data: any[] = [];
                    if (item && item.ID) {
                        data.push(item);
                    };

                    this.props.config.setCatalogo(data, PAGE_ORDEN_TRABAJO_ID);
                };
            };
        };
        render(): JSX.Element {
            return <modal.Modal id="modalOrdenTrabajo" header={<span>
                <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{"Detalle Orden de Trabajo"}</h6>
            </span>}>
                <page.SectionList
                    id={PAGE_ORDEN_TRABAJO_ID}
                    parent={this.props.config.id}
                    icon="fa fa-briefcase"
                    level={1}
                    title="Orden de Trabajo"
                    listHeader={listHeaderOT}
                    size={[12, 12, 12, 12]}
                    readonly={true}
                    hideNewButton={true}
                    items={createSuccessfulStoreObject([])}
                    formatter={(index: number, item: any) => {
                        return <Row id={"row_orden_trabajo_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                            <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                <Row>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                        <CollapseButton idElement={"row_orden_trabajo_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.ID > 0 ? <span className="badge badge-info">{item.ID}</span> : "&nbsp;"}</Column>
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaInicio)}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaFin)}</Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave] }}></i>}</Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info">{item.EstatusOrdenTrabajo.Nombre}</span></Column>
                                    <Column size={[1, 1, 1, 1]}></Column>
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
                                        items={global.createSuccessfulStoreObject(item.Partidas ? item.Partidas : [])}
                                        readonly={true}
                                        listHeader={listHeaderOTPartidas}
                                        addRemoveButton={false}
                                        formatter={(_index: number, _item: any): any => {
                                            return <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.IdFalla}</span>{_item.Partida.Falla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{_item.Partida.UbicacionFalla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.FallaOrigen.ID}</span>{_item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
                                            </Row>
                                        }} />
                                </Column>
                            </Row>
                        </Row>
                    }}>
                </page.SectionList>
            </modal.Modal>
        };
    });
    export const OrdenTrabajoModalAreasComunes: any = global.connect(class extends React.Component<IOrdenTrabajoModalProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.ordenTrabajo = state.global[["entity", PAGE_ORDEN_TRABAJO_ID].join("$")];
            return retValue;
        };
        componentDidMount(): void {
            this.props.config.setEntity({}, PAGE_ORDEN_TRABAJO_ID);
            this.props.config.setCatalogo([], PAGE_ORDEN_TRABAJO_ID);
        };
        componentWillReceiveProps(nextProps: IOrdenTrabajoModalProps): void {
            if (global.hasChanged(this.props.ordenTrabajo, nextProps.ordenTrabajo)) {
                if (global.isSuccessful(nextProps.ordenTrabajo)) {
                    let item: any = global.getData(nextProps.ordenTrabajo);
                    let data: any[] = [];
                    if (item && item.ID) {
                        data.push(item);
                    };

                    this.props.config.setCatalogo(data, PAGE_ORDEN_TRABAJO_ID);
                };
            };
        };
        render(): JSX.Element {
            return <modal.Modal id="modalOrdenTrabajoAreasComunes" header={<span>
                <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{"Detalle Orden de Trabajo"}</h6>
            </span>}>
                <page.SectionList
                    id={PAGE_ORDEN_TRABAJO_ID}
                    parent={this.props.config.id}
                    icon="fa fa-briefcase"
                    level={1}
                    title="Orden de Trabajo"
                    listHeader={listHeaderOrdenTrabajo}
                    size={[12, 12, 12, 12]}
                    readonly={true}
                    hideNewButton={true}
                    items={createSuccessfulStoreObject([])}
                    formatter={(index: number, item: any) => {
                        return <Row id={"row_orden_trabajo_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                            <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                <Row>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                        <CollapseButton idElement={"row_orden_trabajo_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.ID > 0 ? <span className="badge badge-info">{item.ID}</span> : <span>&nbsp;</span>}</Column>
                                    <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Agenda === undefined || item.Agenda.ID === null || item.Agenda.ID === undefined ? "" : global.formatDateTimeDirect(item.Agenda.FechaInicio, true)}</Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Agenda === undefined || item.Agenda.ID === null || item.Agenda.ID === undefined ? "" : global.formatDateTimeDirect(item.Agenda.FechaFin, true)}</Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave], fontSize: "small" }}></i>}</Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info">{item.EstatusOrdenTrabajo.Nombre}</span></Column>
                                    <Column size={[1, 1, 1, 1]}></Column>
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
                                        items={global.createSuccessfulStoreObject(item.Partidas ? item.Partidas : [])}
                                        readonly={true}
                                        listHeader={listHeaderOrdenTrabajoPartidas}
                                        addRemoveButton={false}
                                        formatter={(_index: number, _item: any): any => {
                                            return <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.Id}</span>{_item.Partida.Falla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.Id}</span>{_item.Partida.UbicacionFalla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Nombre}</Column>
                                            </Row>
                                        }} />
                                </Column>
                            </Row>
                        </Row>
                    }}>
                </page.SectionList>
            </modal.Modal>
        };
    });
    export const onOrdenTrabajoClick: (id: number) => void = (id: number): void => {
        global.dispatchAsyncPost("global-page-entity", "base/scv/OrdenesTrabajoRUBA/id", { id }, PAGE_ORDEN_TRABAJO_ID);

        let modalOT: any = $("#modalOrdenTrabajo");
        modalOT.modal();
        modalOT.css("height", "auto");
    };
    export const onOrdenTrabajoClickAreasComunes: (id: number) => void = (id: number): void => {
        global.dispatchAsyncPost("global-page-entity", "base/scv/OrdenesTrabajoRUBAAreasComunes/id", { id }, PAGE_ORDEN_TRABAJO_ID);

        let modalOT: any = $("#modalOrdenTrabajoAreasComunes");
        modalOT.modal();
        modalOT.css("height", "auto");
    };
};


import agendaRUBA = EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda;