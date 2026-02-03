// A '.tsx' file enisNew === true && !(entidad && entidad.Prereporte)ables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.Modules.SCV.Pages.postventa.RUBA.ReporteFallasAreasComunes {
    "use strict";
    const PAGE_ID: string = "ReporteFallasAreasComunes";
    const REPORTE_UBICACION_ID: string = "reporte$ubicacion";
    const REPORTE_UBICACION_CONTRATISTAS_ID: string = "reporte$ubicacion$contratistas";
    const REPORTE_INFORMACION_ID: string = "reporte$informacion";
    const REPORTE_CONTACTO_ID: string = "reporte$contacto";
    const REPORTE_FALLAS_ID: string = "reporte$fallas";
    const REPORTE_CLIENTE_ETAPA: string = "reporte$cliente$etapa";
    const REPORTE_PARTIDA: string = "reporte$partida";
    const REPORTE_PARTIDA_INFORME: string = "reporte$partida$informe";
    const REPORTE_ORDEN_TRABAJO_ID: string = "reporte$ordenTrabajo";
    const REPORTE_ORDEN_TRABAJO_PARTIDAS_ID: string = "reporte$ordenTrabajo$partidas";
    const REPORTE_ORDEN_TRABAJO_CALCULO_PARTIDAS_ID: string = "reporte$ordenTrabajo$partidasCalculo";
    const REPORTE_CONTRATISTAS_ID: string = "reporte$contratistas";
    const REPORTE_DICTAMENES_ID: string = "reporte$dictamenes";
    const REPORTE_DICTAMENES_DETALLES_ID: string = "reporte$dictamenes$detalles";
    const REPORTE_DICTAMENES_OPTIONS_ID: string = "reporte$dictamenes$options";
    const REPORTE_APPOINTMENT_ORDENES_TRABAJO_ID: string = "reporte$appointment$ordenesTrabajo";
    const REPORTE_APPOINTMENT_DICTAMENES_ID: string = "reporte$appointment$dictamenes";
    const INQUEST_ID: string = "reporte$InquestReportSPV";
    const DIAGNOSTICATE_IMAGE: string = "reporte$diagnosticate$image";
    const DIAGNOSTICATE_NOTE: string = "reporte$diagnosticate$note";
    const FORMULARIO_OPCIONES: string = "reportesConsulta$opcionesPartidas";
    const POR_CLIENTE: string = "PorCliente";
    const POR_COLABORADOR: string = "PorColaborador";
    const POR_ANONIMO: string = "PorAnonimo";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [REPORTE_UBICACION_ID, REPORTE_INFORMACION_ID, REPORTE_UBICACION_CONTRATISTAS_ID, REPORTE_FALLAS_ID, REPORTE_CONTACTO_ID, REPORTE_CLIENTE_ETAPA, REPORTE_PARTIDA, REPORTE_PARTIDA_INFORME, REPORTE_ORDEN_TRABAJO_ID, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_DICTAMENES_ID, REPORTE_DICTAMENES_DETALLES_ID, REPORTE_DICTAMENES_OPTIONS_ID, REPORTE_CONTRATISTAS_ID, REPORTE_APPOINTMENT_ORDENES_TRABAJO_ID, REPORTE_APPOINTMENT_DICTAMENES_ID, INQUEST_ID, DIAGNOSTICATE_IMAGE, DIAGNOSTICATE_NOTE]);
    class ViewState {
        public allowInquest: boolean;
        public allowCancel: boolean;
        public allowNew: boolean;
        public allowSave: boolean;
        public allowDelete: boolean;
        public allowPrint: boolean;
        public allowUpdate: boolean;
        public allowCancelFolio: boolean;
        public viewMode: boolean;
        public action: any;
        public selectionState: any;
        constructor(state?: any) {
            if (state) {
                this.allowCancel = state.allowCancel;
                this.allowNew = state.allowNew;
                this.allowSave = state.allowSave;
                this.allowDelete = state.allowDelete;
                this.allowPrint = state.allowPrint;
                this.allowUpdate = state.allowUpdate;
                this.allowCancelFolio = state.allowCancelFolio;
                this.viewMode = state.viewMode;
                this.action = state.action;
                this.selectionState = { checked: POR_CLIENTE };
            };
        };
    };

    export var BGCEstatusDictamen: any = {
        "I": "#36c6d3",
        "A": "#41c300",
        "N": "#ed6b75"
    };
    const listHeaderContratistas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Tipo Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">{"Default"}</Column>
            </Row>
        </Column>

    const listHeaderFallas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Incidencia"}</Column>
                {/*<Column size={[1, 1, 1, 1]} className="list-center-header">{"Diagnósticos"}</Column>*/}
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Cliente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                {/*<Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicacion Falla"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Reincidencias"}</Column>*/}
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Contratista"}</Column>
                {/*<Column size={[2, 2, 2, 2]} className="list-center-header">{"Garantía (días)"}</Column>*/}
                {/*<Column size={[2, 2, 2, 2]} className="list-default-header">{"Término Garantía"}</Column>*/}
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fecha Cerrado"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderContacto: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Contacto"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Tipo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Titular"}</Column>
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
                <Column size={[1, 1, 3, 3]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderDictamen: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">#Diagnóstico</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Descripción"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Responsable"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Plan. Inicio"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Plan. Fin"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Planificación"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderDictamenDetalle: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">Estado</Column>
                <Column size={[1, 1, 3, 3]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    let isEmty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    interface IColumnDictamenProps extends React.Props<any> {
        items: any[];
        size: number[];
    };

    /*export class ColumnDictamen extends React.Component<IColumnDictamenProps, {}>{
        render(): JSX.Element {
            let items: any[] = this.props.items ? this.props.items : [];
            //
            //let activos: number = items.filter((value) => { return value.EstatusDictamen.Clave === "I" }).length;
            //let aprobados: number = items.filter((value) => { return value.EstatusDictamen.Clave === "A" }).length;
            //let rechazados: number = items.filter((value) => { return value.EstatusDictamen.Clave === "N" }).length;
            //
            return <Column size={this.props.size} className="listItem-center-header">
                <span className="badge badge-roundless" style={{ backgroundColor: BGCEstatusDictamen["I"] }}>{activos}</span>&nbsp;
                    <span className="badge badge-roundless" style={{ backgroundColor: BGCEstatusDictamen["A"] }}>{aprobados}</span>&nbsp;
                    <span className="badge badge-roundless" style={{ backgroundColor: BGCEstatusDictamen["N"] }}>{rechazados}</span>
            </Column>
        };
    };*/

    const printOT: any = {
        icon: "fa fa-print",
        titulo: "Imprimir OT",
        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
            if ((item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda && item.AgendaDetalle.EstatusAgenda.ID) != null) {
                global.asyncGet("scv/reporteFallasAreasComunes/impresionDisponible/" + item.ID + "/", (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {
                        if (data === 'True') {
                            let win = window.open("scv/reporteFallasAreasComunes/imprimirOT/" + item.ID, "_blank");
                        } else {
                            global.errorMessage("No se pudo imprimir la OT, verifique que exista la plantilla.")
                        }
                    }
                });

                return;
            } else {
                global.warning("No se puede Imprimir la OT, porque no está Planificada la cita para el contratista.");
                return;
            }
        }
    };
    const printDiagnostico: any = {
        icon: "fa fa-print",
        titulo: "Imprimir Diagnóstico",
        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
            // if ((item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda && item.AgendaDetalle.EstatusAgenda.ID) != null) {
            let win = window.open("scv/ReporteFallasAreasComunes/imprimirDiagnostico/" + item.ID, "_blank");
            //} else {
            //    global.warning("No se puede Imprimir el Diagnostico, porque no está Planificada la cita.");
            //    return;
            //}
        }
    };

    const viewDiagnosticateInfoCAT: any = {
        icon: "fal fa-user-hard-hat",
        titulo: "Ver Información del Diagnóstico (CAT)",
        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
            let idDiagnostico: any = item.ID;
            let idPartida: any = item.Partida.ID;

            let encodedParams: string = global.encodeParameters({ IdDiagnostico: idDiagnostico, IdPartida: idPartida });
            global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/Get/GetDiagnosticateImageCAT/" + encodedParams, DIAGNOSTICATE_IMAGE);

            let encodedParams2: string = global.encodeParameters({ IdDiagnostico: idDiagnostico, IdPartida: idPartida });
            global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/Get/GetDiagnosticateNoteCAT/" + encodedParams2, DIAGNOSTICATE_NOTE);

            let modalLogBook: any = $("#modalDiagnosticateCATSPV");
            modalLogBook.modal();
        }
    };
    //


    interface IEditProps extends page.IProps {
        cambioContratista?: global.DataElement;
    };

    class Edicion$ extends React.Component<IEditProps, IEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.pageLink = state.global.currentLink;
            retValue.cambioContratista = state.global.CHANGECONTRATISTAOT;
            return retValue;
        };
        componentWillUnmount(): any {
            global.dispatchDefault("load::AgendaNewCalendasUser", null);
            global.dispatchSuccessful("global-page-data", [], "AgendaDetallesCitaResult");
            Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "Contratista", []);
            global.dispatchSuccessful("global-page-data", [], REPORTE_CONTRATISTAS_ID);
        };

        componentWillReceiveProps(nextProps: IEditProps, nextState: IEditProps): void {
            if (global.hasChanged(this.props.cambioContratista, nextProps.cambioContratista) && global.isSuccessful(nextProps.cambioContratista)) {
                let item: any = getData(nextProps.cambioContratista);
                switch (item.Estado) {
                    case 5:
                        let id: any
                        success("Planificación Actualizada Correctamente!");
                        let modalAgenda: any = $("#modalAgendaInformacionCita");
                        modalAgenda.modal("hide");
                        id = getData(this.props.entidad).ID;
                        config.dispatchEntity(id);
                        break;
                    default: break;
                }
            };
        };

        onSave(props: page.IProps, item: global.EditForm): any {
            let entidad = global.getData(EK.Store.getState().global.currentEntity);
            let contacto: any[] = global.getData(Forms.getValue(REPORTE_CONTACTO_ID, config.id), []);
            let contactoIsValid: boolean = true;

            contacto.forEach((value: any) => {
                if (!value.Contacto) {
                    contactoIsValid = false;
                }
            });


            let partidas: any[] = global.getData(Forms.getValue(REPORTE_FALLAS_ID, config.id), []);
            let partidasIdValid: boolean = true;

            partidas.forEach((value: any) => {
                if (value._eliminado !== true) {
                    if (!(value.TipoFalla && value.TipoFalla.ID) ||
                        !(value.Falla && value.Falla.ID) ||
                        !(value.UbicacionFalla && value.UbicacionFalla.ID) ||
                        !(value.Contratista && value.Contratista.ID)) {
                        partidasIdValid = false;
                    }
                }
            });

            if (partidas.length <= 0) {
                warning("Debe indicar por lo menos una incidencia.");
                return null;
            }

            if (!partidasIdValid) {
                warning("Una o más partidas no fueron capturadas correctamente. Por favor verifique la información e intente de nuevo.");
                return null;
            };
            let fraccionamiento;
            let desarrolloClave;
            let tipoCliente = Forms.getValue("OpcionesProcede", PAGE_ID);
            if (tipoCliente == undefined) {
                tipoCliente = entidad.UsuarioReporta
            };
            if (tipoCliente != "PorCliente" && entidad.UsuarioReporta != "PorCliente") {
                fraccionamiento = Forms.getValue("Fraccionamiento", PAGE_ID);
                if (fraccionamiento === undefined) {
                    desarrolloClave = entidad.DesarrolloClave
                } else {
                    desarrolloClave = fraccionamiento.Clave
                }
            } else {
                desarrolloClave = "none"; //se puso de esta manera para evitar el error del undefined y que se pueda hacer el dispatch
            }
            if (entidad.ID < 0) {// por si se ocupa

            }
            let calleA = item.getValue("CalleA");
            let calleB = item.getValue("CalleB");
            let ubicacionNombre = item.getValue("UbicacionNombre");
            let contratista = item.getValue("Contratista");
            let UrlAplicacion: any = window.location;
            let isIntraUrbana: boolean = UrlAplicacion.pathname.includes("intra")
            //if (calleA === undefined || calleA.replace(/\s/g, "") == "") {
            //    warning("El campo Calle A esta vacio, Favor de completar el campo");
            //    return null;
            //}
            //if (calleB == undefined || calleB.replace(/\s/g, "") == "") {
            //    warning("El campo Calle B esta vacio, Favor de completar el campo");
            //    return null;
            //}
            if (isIntraUrbana) {
                if (ubicacionNombre == undefined || ubicacionNombre.replace(/\s/g, "") == "") {
                    warning("El campo Ubicacion esta vacio, Favor de completar el campo");
                    return null;
                }
            } else {
                if (calleA === undefined || calleA.replace(/\s/g, "") == "") {
                    warning("El campo Calle A esta vacio, Favor de completar el campo");
                    return null;
                }
                if (calleB == undefined || calleB.replace(/\s/g, "") == "") {
                    warning("El campo Calle B esta vacio, Favor de completar el campo");
                    return null;
                }
            }
           
            if (contratista == undefined) {
                warning("Falta seleccionar el contratista.");
                return null;
            }
            let ubicacion: any = global.getData(props.config.getEntity(REPORTE_UBICACION_ID));
            let model: any = item
                .addID()
                .addStringConst("UsuarioReporta", tipoCliente)
                .addStringConst("DesarrolloClave", desarrolloClave)
                .addObject("Plaza")
                .addObject("Cliente")
                .addObject("Usuario")
                //.addObject("Prereporte")
                .addObjectConst("Ubicacion", ubicacion)
                .addNumberConst("IdUbicacion", ubicacion.ID)
                .addObject("ResponsableConstruccion")
                .addObject("SupervisorContratista")
                .addObject("MedioSolicitud")
                .addString("CalleA")
                .addString("CalleB")
                .addStringConst("UbicacionNombre", ubicacionNombre)
                

                .addString("TelefonoCasa")
                .addString("TelefonoOficina")
                .addString("TelefonoOtros")
                .addString("ObservacionesServicio")
                .addString("ObservacionesContratista")
                .addObject("Contratista")
                .addObject("TipoContratista")
                .addObject("Contactos", REPORTE_CONTACTO_ID)
                .addObject("Partidas", REPORTE_FALLAS_ID)
                .addObject("OrdenesTrabajo", REPORTE_ORDEN_TRABAJO_ID)
                .addObject("Dictamenes", REPORTE_DICTAMENES_ID)
                // .addObject("DictamenesPartidas", REPORTE_DICTAMENES_DETALLES_ID)
                .addObject("EstatusReporte")
                .addVersion()
                .toObject();

            if (model.EstatusReporte) {
                model.IdEstatusReporte = model.EstatusReporte.Clave;
            };

            let PartidasUpd = getData(EK.Store.getState().global.catalogo$reporte$fallas);

            for (const pt of PartidasUpd) {
                for (const pda of model.Partidas) {
                    if (pt.ID == pda.ID) {
                        if (pt.EstatusDictamen !== pda.EstatusDictamen) {
                            pda.EstatusDictamen = pt.EstatusDictamen;
                            pda.IdEstatusDictamen = pt.IdEstatusDictamen;
                            pda.Estado = 3;
                        }
                        // console.log(pt.EstatusDictamen, pda.EstatusDictamen);
                    }
                }

            }
            //console.log(model)
            // console.log(model.Partidas);
            // console.log(PartidasUpd);

            return model;
        };
        onFilter(props: any, filters: any, type?: string): void { };
        onEntityLoaded(props: page.IProps): void {
            let entidad: any = global.getData(props.entidad);
            let isNew: boolean = global.getDataID(props.entidad) <= 0;
            if (isNew === true && !(entidad && entidad.Prereporte)) {
                global.dispatchSuccessful("global-page-entity", {}, REPORTE_UBICACION_ID);
                global.dispatchSuccessful("global-page-entity", {}, REPORTE_INFORMACION_ID);
                global.dispatchSuccessful("global-page-data", [], REPORTE_UBICACION_CONTRATISTAS_ID);
                global.dispatchSuccessful("global-page-data", [], REPORTE_CONTACTO_ID);
                global.dispatchSuccessful("global-page-data", [], REPORTE_FALLAS_ID);
                global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_ID);
                global.dispatchSuccessful("global-page-data", [], REPORTE_DICTAMENES_ID);
                //global.dispatchSuccessful("load::TipoAgenda", null);
                entidad.IdEstatusReporte = "N";
                entidad.EstatusReporte = { Clave: "N", Nombre: "NUEVO" };
                entidad.FechaCaptura = global.getToday();

                props.config.setEntity(entidad);
            } else {
                global.dispatchSuccessful("global-page-entity", entidad.Ubicacion, REPORTE_UBICACION_ID);
                global.dispatchSuccessful("global-page-data", entidad.Contratistas, REPORTE_UBICACION_CONTRATISTAS_ID);
                global.dispatchSuccessful("global-page-data", entidad.Contactos, REPORTE_CONTACTO_ID);
                global.dispatchSuccessful("global-page-data", entidad.Partidas, REPORTE_FALLAS_ID);
                global.dispatchSuccessful("global-page-data", entidad.OrdenesTrabajo, REPORTE_ORDEN_TRABAJO_ID);
                // console.log(entidad);
                if (entidad.Cancelado === 'S') {
                    entidad.IdEstatusReporte = "C";
                    entidad.EstatusReporte = { Clave: "C", Nombre: "CANCELADO" };
                }

                //transformar el campo partida en arreglo de detalles para el dictamen
                let dictamenes: any[] = entidad.Dictamenes as any[];
                let partidas: any[] = entidad.Partidas as any[];
                if (dictamenes && dictamenes.length > 0) {
                    dictamenes.forEach((dm) => {

                        let detalles: any[] = [];
                        let IdPartidas: string[] = dm.IdPartidas.split(",");
                        for (var i = 0; i < IdPartidas.length; i++) {
                            let IdPartida = IdPartidas[i];
                            let partida: any = partidas.filter(
                                p => p.ID == IdPartida);

                            let item: any = global.assign({}, {
                                IdReporteDetalle: partida[0].ID,
                                IdReporte: partida[0].IdReporte,
                                Partida: partida[0]
                            });

                            detalles.push(item);
                        }
                        dm.Detalles = detalles;
                    });
                };
                Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "Contratista", []);
                global.dispatchSuccessful("global-page-data", [], REPORTE_CONTRATISTAS_ID);
                global.dispatchSuccessful("global-page-data", dictamenes, REPORTE_DICTAMENES_ID);

                Forms.updateFormElement(config.id, "Cliente", entidad.Cliente);

                ////configuración necesaria para inicializar agenda contratista
                //if (!isLoadingOrSuccessful(global.getStateItem("global.TipoAgenda"))) {
                global.dispatchAsync("load::TipoAgenda", "catalogos/get(TipoAgenda)");
                //};
                //configuración necesaria para inicializar agenda contratista
                global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: "ContratistaAreasComunes" });
            };

            let state: ViewState = new ViewState();
            let url: string = global.encodeAllURL("scv", "UbicacionesFalla", { activos: 1, usoFalla: "Ubicacion" });
            global.dispatchAsync("load::ubicaciones$fallas", url);
            state.allowInquest = false;
            if (entidad.IdEstatusReporte === "N" || entidad.IdEstatusReporte === "M") {
                state.allowNew = true;
                state.allowDelete = false;
            } else {
                state.allowNew = false;
                state.allowDelete = false;
            };

            if (entidad.IdEstatusReporte !== "T" && entidad.IdEstatusReporte !== "X" && entidad.IdEstatusReporte !== "C") {
                state.allowSave = true;
                state.allowCancel = true;
                state.allowCancelFolio = true;
            } else {
                state.allowSave = false;
                state.allowCancel = false;
                state.allowInquest = true;
                state.allowCancelFolio = false;
            };


            let fechaCaptura: Date = new Date(entidad.FechaCaptura);
            let horasTrascurridas: number = global.getDateDiff(fechaCaptura, global.getToday(), "hours");
            if (horasTrascurridas <= 24) {
                state.allowUpdate = true;
            };

            props.config.setState(state);
        };
        componentDidMount(): void {
            Forms.updateFormElement(config.id, "OpcionesProcede", POR_CLIENTE);
        };
        render(): JSX.Element {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            let permiso: AuthorizePermission = AuthorizePermission.Write;

            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowDelete={state.allowDelete}
                allowNew={state.allowNew}
                allowEdit={state.allowSave}
                allowSave={state.allowSave}
                onSave={this.onSave.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                onFilter={this.onFilter.bind(this)}>
                <PageButtons>
                    <BitacoraSPVButton />
                    {/*<PrereportesButton />*/}
                    {<ReportesButton />}
                    {/*<Authorize accion={AuthorizeAction.RenderBlocked} permiso={permiso}>
                        <CerrarReporteButton />
                    </Authorize>*/}
                    <CancelarFolioButton />
                    {/*<InquestReportButton />*/}
                </PageButtons>
                <ModalBitacoraClienteSPVAreasComunes size={[12, 12, 12, 12]} />
                {/*<ModalDiagnosticateCATSPV size={[12, 12, 12, 12]} />
                <ModalInquestReportSPV size={[12, 12, 12, 12]} />*/}
                <ModalComentariosOT size={[12, 12, 12, 12]} />
                <ModalCancelarFolioAreasComunes size={[12, 12, 12, 12]} />
                <View />
                <Edit />
            </page.Main>
        };
    };
    export const Edicion: any = ReactRedux.connect(Edicion$.props, null)(Edicion$);

    interface IViewProps extends page.IProps {
        ubicacion?: global.DataElement;
        slotState?: global.DataElement;
    };

    let View: any = global.connect(class extends React.Component<IViewProps, IViewProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.ubicacion = state.global.entity$reporte$ubicacion;
            retValue.slotState = state.global.state$reporte$fallas;
            return retValue;
        };

        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        render(): JSX.Element {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            let entidad: any = {};/* isSuccessful(global.getData(this.props.entidad)) ? global.getData(this.props.entidad) : {}*/;
            let appCATEnabled: any;
            let displayAntiguo: boolean = false;
            let badgeAntiguo: string = "badge badge-info";
            if (isSuccessful(this.props.entidad)) {
                entidad = global.getData(this.props.entidad);
                appCATEnabled = entidad.AppCATEnabled != null && entidad.AppCATEnabled != undefined ? entidad.AppCATEnabled : false;
            if (entidad) {
                if (entidad.Cliente && entidad.Cliente.Antiguedad > 5) {
                    displayAntiguo = true;
                    badgeAntiguo = "badge badge-danger";
                }
            };
            }
           //console.log(entidad)
            let slotState: any = global.getData(this.props.slotState);
            let idEntidad: number = !(slotState && slotState.entidad) ? undefined : slotState.entidad.ID;
            let contratistas: any = this.props.config.getCatalogo(REPORTE_UBICACION_CONTRATISTAS_ID);
            let ubicacion: any = global.getData(this.props.ubicacion);
            let supervisionExterna: number = undefined;

            if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {
                let plaza: any = global.getData(this.props.ubicacion).Plaza;
                // console.log(plaza);
                supervisionExterna = plaza ? plaza.ValidarResponsablePlaza : 0;
            };

            let labelGarantia: any = (value: any) => {
                return (value === undefined || value === null) ? "" : value > 0 ? "<span class='badge bold' style='background-color: rgb(65, 195, 0);'>" + value + "</span>" : "<span class='badge badge-danger bold'>" + value + "</span>"
            };

            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";

                if (state.allowUpdate === true) {
                    className = "fas fa-unlock";
                };

                return global.formatDate(value) + " <span class='pull-right'><i class='" + className + "' style='color:#1A237E;'></i></span>";
            };

            let labelFechaCustom: any = (value: any) => {
                return label.formatDate(value);
            };

            let formatDateFull: (data: any) => any = (data: any): any => {
                let valueFormat: any = global.formatDateTimeDirect(data, true) ? global.formatDateTimeDirect(data, true) : "";
                if (valueFormat == "01/01/1 12:00 AM") {
                    return "";
                }
                return <div> {valueFormat}</div>
            };
            let folioCancelado = global.getData(EK.Store.getState().global.currentEntity).Cancelado;
            let motivoCancelacionID = global.getData(EK.Store.getState().global.currentEntity).IdMotivoCancelado;
            let motivoCancelado = null;
            let fechaCancelado = global.getData(EK.Store.getState().global.currentEntity).FechaCancelacion;;
            if (motivoCancelacionID !== undefined && motivoCancelacionID !== null) {
                if (!this.isEmpty(global.getData(EK.Store.getState().global.SPVMOTIVOS))) {
                    for (const m of global.getData(EK.Store.getState().global.SPVMOTIVOS)) {
                        if (motivoCancelacionID === m.id) {
                            motivoCancelado = m.Nombre;
                        }
                    }
                }
                //for(const m of )
            }
            let UrlAplicacion: any = window.location;
            let isIntraUrbana: boolean = UrlAplicacion.pathname.includes("intra")

            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={<span>
                            <span>Reporte de Fallas Areas Comunes</span>
                            <span className="badge bold badge badge-success pull-right">{!(entidad && entidad.EstatusReporte) ? "" : entidad.EstatusReporte.Nombre}</span>
                            <span className="pull-right bold">Estatus:&nbsp;</span>
                            {entidad.IdPrereporte > 0 ? <span>
                                <span className="badge bold pull-right" style={{ backgroundColor: "#4cd964", marginRight: 5 }} >{entidad.IdPrereporte}</span>
                                <i className="fas fa-mobile-alt  pull-right" style={{ fontSize: "14px", margin: 2 }}></i></span> : null
                            }
                            {!(entidad && entidad.Prereporte) ?
                                <span className="pull-right"><span className="badge badge-danger bold">{entidad.ID <= 0 ? "nuevo" : entidad.ID}</span>&nbsp;&nbsp;</span> :
                                <span className="pull-right"><span className="badge badge bold" style={{ backgroundColor: "#41c300" }}>prereporte</span>&nbsp;&nbsp;</span>
                            }
                            <span className="pull-right bold">Folio:&nbsp;</span>
                        </span>}
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            {
                                entidad.UsuarioReporta == "PorCliente" ?
                                <label.Entidad id="Cliente" size={[12, 12, 6, 6]} value={(item: any) => {
                                        return !item ? "" : (!item.Clave ? "" : "<span class='" + badgeAntiguo + "'>" + item.Clave + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                                    }} />:null
                            }
                            {
                                entidad.UsuarioReporta == "PorColaborador" ?
                                    <label.Entidad id="Usuario" size={[12, 12, 6, 6]} value={(item: any) => {
                                        return !item ? "" : (!item.ID ? "" : "<span class='" + badgeAntiguo + "'>" + item.ID + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                                    }} /> : null
                            }
                            {
                                entidad.UsuarioReporta == "PorAnonimo" ?
                                    <label.Entidad id="Anonimo" size={[12, 12, 6, 6]} value={"ANONIMO"} /> : null
                            }
                            
                            <label.Fecha id="FechaCaptura" value={labelFechaCaptura} isHTML={true} size={[12, 12, 4, 2]} />
                            {/*<label.Fecha id="FechaEntregaVivienda" size={[12, 12, 4, 2]} />
                            <label.Label id="MesesTranscurridos" size={[12, 12, 4, 2]} />*/}
                        </Row>
                        <Row>
                            <Column size={[12, 12, 4, 4]} style={{ paddingTop: 10 }}>
                                <page.OptionSection
                                    id={REPORTE_UBICACION_ID}
                                    parent={config.id}
                                    title="UBICACIÓN"
                                    level={1}
                                    icon="fa fa-home"
                                    collapsed={false}
                                    hideCollapseButton={false}>
                                    <Row>
                                        <label.Entidad
                                            id="Plaza"
                                            idForm={REPORTE_UBICACION_ID}
                                            label={"Plaza"}
                                            value={entidad.PlazaView}
                                            size={[12, 12, 12, 12]} />
                                        <label.Entidad id="Desarrollo" idForm={REPORTE_UBICACION_ID} label={"FRACCIONAMIENTO"} size={[12, 12, 12, 12]} value={() => {
                                            return !entidad || !entidad.Desarrollo ? "" : (!entidad.DesarrolloClave ? "" : "<span class='badge badge-info'>" + entidad.DesarrolloClave + "</span> ") + (!entidad.Desarrollo.Nombre ? "" : entidad.Desarrollo.Nombre);
                                        }} />
                                        {isIntraUrbana ? <label.Entidad id="Ubicacion" value={entidad.UbicacionNombre} label={"Ubicación "} size={[12, 12, 12, 12]} /> :  null}
                                        {!isIntraUrbana ?
                                            <div>
                                                <label.Entidad id="CalleA" value={entidad.CalleA} label={"Calle A"} size={[12, 12, 12, 12]} />
                                                <label.Entidad id="CalleB" value={entidad.CalleB} label={"Calle B"} size={[12, 12, 12, 12]} />
                                            </div>
                                           : null
                                        }
                                    </Row>

                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 8, 8]} style={{ paddingTop: 10 }}>
                                <page.OptionSection
                                    id={REPORTE_INFORMACION_ID}
                                    title= "INFORMACIÓN GENERAL"
                                    parent={config.id}
                                    level={1}
                                    icon="fa fa-info-circle" collapsed={false}>
                                    <Row>
                                        <label.Fecha id="FechaSolucionReporte" value={labelFechaCustom} size={[12, 12, 3, 3]} />
                                        <label.Fecha id="FechaTerminacionFolio" label="FECHA TERMINACIÓN" value={entidad.FechaTerminacionFolio} size={[12, 12, 3, 3]} />
                                        <label.Entidad label="RESPONSABLE DE CONTRUCCI&Oacute;N PARA SEGUIMIENTO" id="ResponsableConstruccion" size={[12, 12, 6, 6]} />
                                    </Row>
                                    <Row>
                                        <label.Label label="DÍAS SOLUCIÓN" id="DiasSolucion" size={[3, 3, 3, 3]} />
                                        <label.Label label="DÍAS CONTRATISTA" id="DiasContratista" size={[3, 3, 3, 3]} />
                                        <label.Entidad id="MedioSolicitud" size={[12, 12, 6, 6]} />
                                    </Row>
                                    <Row>
                                        <label.Fecha id="FechaContratistaInicial" value={labelFechaCustom} size={[12, 12, 3, 3]} />
                                        <label.Fecha id="FechaContratistaFinal" value={labelFechaCustom} size={[12, 12, 3, 3]} />
                                        {/*supervisionExterna === 1 ? <label.Entidad id="SupervisorContratista" size={[12, 12, 6, 6]} /> : null*/}
                                        <label.Entidad id="CreadoPor" size={[12, 12, 6, 6]} />
                                    </Row>
                                    <Row>
                                        <label.Label id="ObservacionesServicio" size={[12, 12, 6, 6]} />
                                        <label.Label id="ObservacionesContratista" size={[11, 11, 5, 5]} />
                                        <ComentariosOTButton size={[1, 1, 1, 1]} style={{ background: '#3498db', marginTop: '10px', color: '#fff' }} />
                                    </Row>
                                    {folioCancelado === 'S' ?
                                        <Row>
                                            <label.Fecha label="Fecha cancelacion" value={fechaCancelado} size={[12, 12, 6, 6]} />
                                            <label.Label label="Motivo cancelacion" value={motivoCancelado} size={[12, 12, 6, 6]} />
                                        </Row> : null}
                                    <Row>
                                        <label.Entidad id="UsuarioProcesoFin" size={[12, 12, 6, 6]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 6, 6]}>
                                <page.OptionSection
                                    id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                    parent={config.id}
                                    level={1}
                                    title={"Contratista"}
                                    icon="fa fa-user" collapsed={false}>
                                    <Row>
                                        <label.Entidad id={"Contratista"} label={"Contratista"} size={[12, 12, 12, 12]} />
                                        <label.Entidad id={"TipoContratista"} label={"Tipo Contratista"} size={[12, 12, 12, 12]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 6, 6]}>
                                <page.OptionSection
                                    id={REPORTE_CONTACTO_ID}
                                    parent={config.id}
                                    title={"TELEFONOS"}
                                    level={1}
                                    icon="fas fa-mobile-alt" collapsed={false} hideCollapseButton={false}>
                                    <Row>
                                        <label.Entidad id={"TelefonoCasa"} label={"Teléfono Casa"} value={entidad.TelefonoCasa} size={[12, 12, 12, 12]} />
                                        <label.Entidad id={"TelefonoOficina"} label={"Teléfono Oficina"} value={entidad.TelefonoOficina} size={[12, 12, 12, 12]} />
                                        <label.Entidad id={"TelefonoOtros"} label={"Teléfono Otros"} value={entidad.TelefonoOtros} size={[12, 12, 12, 12]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            <page.SectionList
                                id={REPORTE_FALLAS_ID}
                                parent={config.id}
                                icon="fas fa-cogs"
                                level={1}
                                listHeader={listHeaderFallas}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                horizontalScrolling={true}
                                selectable={true}
                                drawOddLine={true}
                                items={createSuccessfulStoreObject([])}
                                formatter={(index: number, item: any) => {
                                    let bgColor: string;

                                    if (item.PartidaAutorizada === "R" || item.Procede === "N") {
                                        bgColor = "#FFA07A";
                                    };

                                    return <Row className="list-selectable-item" style={{ backgroundColor: bgColor }}>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.TipoFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.TipoFalla.ID}</span>{item.TipoFalla.Nombre}</span>}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Falla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Falla.Id}</span>{item.Falla.Nombre}</span>}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.UbicacionFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.ID}</span>{item.UbicacionFalla.Nombre}</span>}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</span>}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.Observaciones}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.Nombre : null}</Column>
                                        {/*<Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                            <a id={"a_reincidencias_" + index}>
                                                <span className="badge badge-warning bold">{item.Reincidencias}</span>
                                                <SPVReincidenciasConsulta target={"a_reincidencias_" + index} item={item} idFormSection={REPORTE_FALLAS_ID} />
                                            </a>
                                        </Column>*/}
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesContratista}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.FechaCerrado)}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">{!(item && item.EstatusPartida) ? null : <span className="badge badge-info">{item.EstatusPartida.Nombre}</span>}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">&nbsp;</Column>
                                    </Row>
                                }}>
                            </page.SectionList>
                        </Row>
                        <Row>
                            <page.SectionList
                                id={REPORTE_DICTAMENES_ID}
                                title="DIAGNÓSTICOS"
                                parent={config.id}
                                icon="fas fa-clipboard-check"
                                level={1}
                                listHeader={listHeaderDictamen}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                hideNewButton={state.allowSave !== true}
                                style={{ marginTop: 12 }}
                                items={createSuccessfulStoreObject([])}
                                formatter={(index: number, item: any) => {
                                    let extraData: any[] = [];
                                    extraData.push(printDiagnostico);
                                    if (appCATEnabled === true) {
                                        extraData.push(viewDiagnosticateInfoCAT);
                                    }

                                    let numPartidas: any[] = [];
                                    let partidas: any[] = EK.Store.getState().global.currentEntity.data.Partidas;
                                    for (var i = 0; i < item.IdPartidas.split(",").length; i++) {
                                        let IdPartida: number = item.IdPartidas.split(",")[i];
                                        let partidaNum: any = partidas.filter(
                                            p => p.ID == IdPartida);
                                        numPartidas.push(partidaNum[0].Partida);
                                    }
                                   // console.log(item)
                                    return <Row id={"row_dictamen_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                            <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                    <CollapseButton idElement={"row_dictamen_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info bold">{item.Partida ? numPartidas.toString() : ""}</span></Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-success bold">{item.ID > 0 ? item.ID : ""}</span></Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.ResponsableDictamen.ID === undefined || item.ResponsableDictamen.ID === null ? "" : item.ResponsableDictamen.Nombre}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Agenda === undefined || item.Agenda.ID === null || item.Agenda.ID === undefined ? "" : global.formatDateTimeDirect(item.Agenda.FechaInicio, true)}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Agenda === undefined || item.Agenda.ID === null || item.Agenda.ID === undefined ? "" : global.formatDateTimeDirect(item.Agenda.FechaFin, true)}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave], fontSize: "small" }}></i>}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow">{!(item && item.EstatusDictamen) ? null : <span className="badge" style={{ backgroundColor: BGCEstatusDictamen[item.EstatusDictamen.Clave] }}>{item.EstatusDictamen.Nombre}</span>}</Column>
                                                {extraData.length > 0 ? <buttons.PopOver2 idParent={config.id} idForm={REPORTE_DICTAMENES_ID} info={item} extraData={extraData} /> : null}
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
                                                    items={global.createSuccessfulStoreObject(item.Detalles)}
                                                    readonly={true}
                                                    listHeader={listHeaderDictamenDetalle}
                                                    addRemoveButton={false}
                                                    formatter={(_index: number, _item: any): any => {
                                                        return <Row>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.IdFalla}</span>{_item.Partida.Falla.Nombre}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{_item.Partida.UbicacionFalla.Nombre}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Nombre}</Column>
                                                            {/*<Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.FallaOrigen.ID}</span>{_item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>*/}
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.EstatusDictamen}</span></Column>
                                                        </Row>
                                                    }} />
                                            </Column>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm"
                                                style={{ marginTop: "-20px" }}>
                                                <KontrolFileManager title="Archivos del Diagnósticos" modulo={config.modulo} viewMode={true} multiple={true} entity={global.createSuccessfulStoreObject({ ID: item.ID })} entityType={global.createSuccessfulStoreObject(["reporte$dictamenes$", idEntidad].join(""))} />
                                            </Column>
                                        </Row>
                                    </Row>
                                }}>
                            </page.SectionList>
                            <page.SectionList
                                id={REPORTE_ORDEN_TRABAJO_ID}
                                parent={config.id}
                                icon="fa fa-briefcase"
                                level={1}
                                listHeader={listHeaderOrdenTrabajo}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                hideNewButton={state.allowSave !== true}
                                items={createSuccessfulStoreObject([])}
                                onAddNew={() => {
                                    if (entidad && entidad.EstatusReporte && (entidad.EstatusReporte.Clave === 'T' || entidad.EstatusReporte.Clave === 'X')) {
                                        if (entidad.EstatusReporte.Clave === 'X') {
                                            global.info("No puede agregar una nueva orden de trabajo porque el reporte se encuentra CANCELADO");
                                        }
                                        if (entidad.EstatusReporte.Clave === 'T') {
                                            global.info("No puede agregar una nueva orden de trabajo porque el reporte se encuentra TERMINADO");
                                        }
                                        return;
                                    }
                                    this.props.config.setState({ viewMode: false, action: { name: "onAddNewOT", data: null } });
                                    this.props.config.updateForm();
                                }}
                                formatter={(index: number, item: any) => {
                                    let partidas: global.DataElement = global.createSuccessfulStoreObject(item.Partidas);
                                    let extraData: any[] = [];
                                    let edit: any = {
                                        icon: "icon-pencil",
                                        titulo: "Editar Incidencia",
                                        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                                            this.props.config.setState({ viewMode: false });
                                            this.props.config.updateForm();
                                            this.props.config.setEntity(item, id);
                                            this.props.config.setState({ viewMode: false, idOrden: item.ID, workMode: false }, id);
                                            Forms.remove(id);
                                            Forms.updateFormElements(id, item);
                                            Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID,"ContratistaOT", item.Contratista)
                                            global.dispatchSuccessful("global-page-data", item.Partidas, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                        }
                                    };
                                    let remove: any = {
                                        icon: "fa fa-trash",
                                        titulo: "Eliminar",
                                        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                                            if (!(item.AgendaDetalle && item.AgendaDetalle.ID)) {
                                                this.props.config.setState({ viewMode: false });
                                                this.props.config.updateForm();

                                                let element: DataElement = Forms.getValue(id, idParent);

                                                Forms.updateFormElement(idParent, id, element.removeItem(item));
                                            } else {
                                                global.info("No se puede eliminar la orden de trabajo porque está en proceso de atención.");
                                            }
                                        }
                                    };
                                    let workOT: any = {
                                        icon: "fas fa-briefcase",
                                        titulo: "Trabajar OT",
                                        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                                            this.props.config.setState({ viewMode: false });
                                            this.props.config.updateForm();
                                            this.props.config.setEntity(item, id);
                                            this.props.config.setState({ viewMode: false, idOrden: null, workMode: true }, id);
                                            Forms.remove(id);
                                            Forms.updateFormElements(id, item);
                                            global.dispatchSuccessful("global-page-data", item.Partidas, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                        }
                                    };
                                    let appointment: any = {
                                        icon: "fa fa-calendar",
                                        titulo: "Planificar OT",
                                        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                                            this.props.config.setState({ viewMode: false, action: { name: "onPlanificacion", data: item } });
                                            this.props.config.updateForm();
                                        }
                                    };
                                    let EditItem = JSON.parse(JSON.stringify(item));
                                    EditItem.AgendaDetalle.ID = null;
                                    let newAppointment: any = {
                                        icon: "fa fa-calendar-check",
                                        titulo: "Replanificar OT",
                                        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                                            this.props.config.setState({ viewMode: false, action: { name: "onPlanificacion", data: EditItem } });
                                            this.props.config.updateForm();
                                        }
                                    }
                                    if (displayAntiguo === false && state.allowSave === true) {
                                        if (item.EstatusOrdenTrabajo.Clave === "N") {
                                            extraData.push(edit);
                                            extraData.push(appointment);
                                            if (item.IdAgenda !== null) {
                                                extraData.push(newAppointment);
                                            }
                                            extraData.push(remove);
                                            extraData.push(printOT);

                                        } else if (item.EstatusOrdenTrabajo.Clave === "E") {
                                            extraData.push(edit);
                                            extraData.push(appointment);
                                            extraData.push(workOT);
                                            extraData.push(printOT);
                                        }
                                    }
                                    if (item.EstatusOrdenTrabajo.Clave === "T" || item.EstatusOrdenTrabajo.Clave === "C") {
                                        extraData.push(printOT);
                                    };

                                    return <Row id={"row_orden_trabajo_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                            <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                    <CollapseButton idElement={"row_orden_trabajo_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.ID > 0 ? <span className="badge badge-info">{item.ID}</span> : "&nbsp;"}</Column>
                                                <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Agenda === undefined || item.Agenda.ID === null || item.Agenda.ID === undefined ? "" : global.formatDateTimeDirect(item.Agenda.FechaInicio, true)}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Agenda === undefined || item.Agenda.ID === null || item.Agenda.ID === undefined ? "" : global.formatDateTimeDirect(item.Agenda.FechaFin, true)}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave], fontSize: "small" }}></i>}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info">{item.EstatusOrdenTrabajo.Nombre}</span></Column>
                                                {extraData.length > 0 ? < buttons.PopOver2 idParent={config.id} idForm={REPORTE_ORDEN_TRABAJO_ID} info={item} extraData={extraData} /> : null}
                                            </Row>
                                        </Column>
                                        <Row>
                                            {appCATEnabled === true ?
                                                <div style={{ marginLeft: "124px" }}>
                                                    <div style={{ fontWeight: "bold" }}>
                                                        INFORMACIÓN DEL CAT
                                                    </div>
                                                    <div>
                                                        Atiende:  {item.IdAtiende ? item.IdAtiende : ""} &nbsp;&nbsp;&nbsp; {item.Atiende.Nombre ? item.Atiende.Nombre : ""}
                                                    </div>
                                                    <div>
                                                        Supervisor Contratista:  {item.IdSupervisorContratista ? item.IdSupervisorContratista : ""} &nbsp;&nbsp;&nbsp; {item.SupervisorContratista.Nombre ? item.SupervisorContratista.Nombre : ""}
                                                    </div>
                                                    <div>
                                                        <span> Visto Bueno:  </span> <span>{label.ok(item.VistoBueno)}</span>
                                                    </div>
                                                    <div>
                                                        <span> Fecha Incio Construcción:   {item.FechaInicioConst && formatDateFull(item.FechaInicioConst) != "" ? <span className="badge" style={{ backgroundColor: "#a3ec7e" }} >{formatDateFull(item.FechaInicioConst)} </span> : <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>} </span> <span> Fecha Fin Construcción: {item.FechaFinCons ? formatDateFull(item.FechaFinConst) : ""} </span>
                                                    </div>
                                                </div> :
                                                null}
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <List
                                                    items={partidas}
                                                    readonly={true}
                                                    listHeader={listHeaderOrdenTrabajoPartidas}
                                                    addRemoveButton={false}
                                                    formatter={(_index: number, _item: any): any => {
                                                        return <Row>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.IdFalla}</span>{_item.Partida.Falla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{_item.Partida.UbicacionFalla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Descripcion}</Column>
                                                            {/*<Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.FallaOrigen.ID}</span>{_item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>*/}
                                                        </Row>
                                                    }} />
                                            </Column>
                                        </Row>
                                    </Row>
                                }}>
                            </page.SectionList>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>
        }
    });

    interface IEditProps extends page.IProps {
        obtenerLote?: (idUbicacion: number) => void;
        obtenerContratistas?: (idUbicacion: number) => void;
        obtenerContacto?: (idCliente: number) => void;
        obtenerEtapa?: (idCliente: number, fechaReporte: Date) => void;
        calcularPartida?: (partida: any, reporte: any) => void;
        calcularReincidencias?: (partida: any) => void;
        cliente?: global.DataElement;
        usuario?: global.DataElement;
        ubicacion?: global.DataElement;
        etapa?: global.DataElement;
        contratistas?: global.DataElement;
        contacto?: global.DataElement;
        componente?: any;
        ubicacionFalla?: any;
        partida?: global.DataElement;
        partidaInforme?: global.DataElement;
        slotState?: global.DataElement;
        slotsMoverContacto?: any;
        slotsMoverFallas?: any;
        slotsMoverOT?: any;
        slotsMoverDictamenes?: any;
        plaza?: any;
        plaza2?: any;
    };

    export let TextAreaContainer: any = global.connect(class extends React.Component<IEditProps, {}> {
        render(): JSX.Element {
            return <Row>
                <TextArea id="ObservacionesContratista" rows={2} idForm={config.id} size={[6, 6, 5, 5]} />
                <ComentariosOTButton size={[1, 1, 1, 1]} style={{ background: '#3498db', marginTop: '10px', color: '#fff' }} />
            </Row>
        };
    });

    let Edit: any = global.connect(class extends React.Component<IEditProps, {}> {
        state = {
            value: "PorCliente",
            PlazaInicial: "01010000",
            notYetOptionSelected: true
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.cliente = Forms.getDataValue("Cliente", config.id, state);
            retValue.usuario = Forms.getDataValue("Usuario", config.id, state);
            retValue.ubicacion = state.global.entity$reporte$ubicacion;
            retValue.etapa = state.global.entity$reporte$cliente$etapa;
            retValue.contratistas = state.global.catalogo$reporte$ubicacion$contratistas;
            retValue.contacto = state.global.catalogo$reporte$contacto;
            retValue.componente = Forms.getValue("Falla", REPORTE_FALLAS_ID, state);
            retValue.ubicacionFalla = Forms.getValue("UbicacionFalla", REPORTE_FALLAS_ID, state);
            retValue.partida = state.global.entity$reporte$partida;
            retValue.partidaInforme = state.global.entity$reporte$partida$informe;
            retValue.slotState = state.global.state$reporte$fallas;
            retValue.slotsMoverContacto = state.global.state$reporte$contacto;
            retValue.slotsMoverFallas = state.global.state$reporte$fallas;
            retValue.slotsMoverOT = state.global.state$reporte$ordenTrabajo;
            retValue.slotsMoverDictamenes = state.global.state$reporte$dictamenes;
            retValue.plaza = state.global.Plaza_Seleccionada;
            retValue.plaza2 = state.global.Plaza_Seleccionada2;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerLote: (idUbicacion: number): void => {
                let encodedFilters: string = global.encodeObject({ id: idUbicacion });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, REPORTE_UBICACION_ID);
            },
            obtenerEtapa: (idCliente: number, fechaReporte: Date): void => {
                let encodedFilters: string = global.encodeObject({ idCliente, fechaReporte: fechaReporte.toISOString() });
                //global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetClienteEtapa/" + encodedFilters, REPORTE_CLIENTE_ETAPA);
            },
            obtenerContratistas: (idUbicacion: number): void => {
                let url: string = global.encodeAllURL("scv", "ContratistasUbicaciones", { idUbicacion });
                // console.log(url);
                global.dispatchAsync("global-page-data", url, REPORTE_UBICACION_CONTRATISTAS_ID);
            },
            obtenerContacto: (idCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente });
                //global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/GetBP/GetContactoCliente/" + encodedFilters, REPORTE_CONTACTO_ID);
            },
            calcularPartida: (partida: any, reporte: any): void => {
                //global.dispatchAsyncPost("global-page-entity", "scv/reportesFallas/calcularPartida/", { partida, reporte }, REPORTE_PARTIDA);
            },
            calcularReincidencias: (partida: any): void => {
                global.dispatchAsyncPost("global-page-entity", "scv/reportesFallas/calcularReincidencias/", { partida }, REPORTE_PARTIDA_INFORME);
            }
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (hasChanged(this.props.etapa, nextProps.etapa)) {
                if (isSuccessful(nextProps.etapa)) {
                    Forms.updateFormElement(config.id, "FechaEntregaVivienda", global.getData(nextProps.etapa).FechaLiberacion);
                    Forms.updateFormElement(config.id, "MesesTranscurridos", global.getData(nextProps.etapa).MesesTranscurridos);
                }
            };
            if (hasChanged(this.props.partida, nextProps.partida)) {
                if (isSuccessful(nextProps.partida)) {
                    Forms.updateFormElements(REPORTE_FALLAS_ID, global.getData(nextProps.partida));
                }
            };
            if (hasChanged(this.props.cliente, nextProps.cliente) && global.getDataID(this.props.cliente) !== global.getDataID(nextProps.cliente)) {
                if (isSuccessful(nextProps.cliente)) {
                    let cliente: any = global.getData(nextProps.cliente);
                    if (cliente.IdUbicacion > 0) {
                        this.props.obtenerLote(cliente.IdUbicacion);
                        this.props.obtenerContratistas(cliente.IdUbicacion);
                        Forms.updateFormElement(config.id, "TelefonoCasa", cliente.TelefonoCasa);
                        Forms.updateFormElement(config.id, "TelefonoOficina", cliente.TelefonoOficina);
                        Forms.updateFormElement(config.id, "TelefonoOtros", cliente.TelefonoOtros);
                            if (this.props.entidad.data.ID <= 0) {
                                setTimeout(() => {
                                    if (this.props.contratistas && this.props.contratistas.data) {
                                        let contratistas: any[] = global.getData(this.props.contratistas, []);
                                        contratistas = contratistas.filter(c => { return c.ContratistaDefault === "S"; });
                                        if (contratistas && contratistas.length > 0) {
                                            Forms.updateFormElement(PAGE_ID, "Contratista", contratistas[0].Contratista);
                                        };
                                    };
                                },1500)
                            }
                    }

                    if (global.getDataID(nextProps.entidad) <= 0) {
                        if (cliente && cliente.Antiguedad > 5) {
                            global.dispatchSuccessful("global-page-data", [], REPORTE_FALLAS_ID);
                            global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_ID);
                        };
                        //
                    //    this.props.obtenerEtapa(cliente.ID, global.getToday());
                        //
                        Forms.updateFormElement(config.id, "SupervisorContratista", undefined);
                    };
                };
            };
            if (hasChanged(this.props.usuario, nextProps.usuario) && global.getDataID(this.props.usuario) !== global.getDataID(nextProps.usuario)) {
                if (isSuccessful(nextProps.usuario)) {
                    let usuario: any = global.getData(nextProps.usuario);

                    if (global.getDataID(nextProps.entidad) <= 0) {
                        global.dispatchSuccessful("global-page-data", [], REPORTE_FALLAS_ID);
                        global.dispatchSuccessful("global-page-data", [], REPORTE_DICTAMENES_ID);
                        global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_ID);
                    };
                    this.setState({ notYetOptionSelected: false });
                };
            };
            if (hasChanged(this.props.partidaInforme, nextProps.partidaInforme)) {
                if (isSuccessful(nextProps.partidaInforme)) {
                    let partidaInforme: any = global.getData(nextProps.partidaInforme);
                    if (partidaInforme) {
                        Forms.updateFormElement(REPORTE_FALLAS_ID, "Reincidencias", partidaInforme.Reincidencias);
                        Forms.updateFormElement(REPORTE_FALLAS_ID, "ReincidenciasValues", partidaInforme.ReincidenciasValues);
                    };
                };
            };
            if (hasChanged(this.props.slotsMoverContacto, nextProps.slotsMoverContacto)) {
                if (getData(nextProps.slotsMoverContacto).viewMode === false) {
                    let target = $("#reporteContacto");
                    if (target.length) {
                        $('html, body').animate({ scrollTop: target.offset().top - 150 }, 500, 'swing');
                    }
                }
            };
            if (hasChanged(this.props.slotsMoverFallas, nextProps.slotsMoverFallas)) {
                if (getData(nextProps.slotsMoverFallas).viewMode === false) {
                    let target = $("#reporteFallas");
                    if (target.length) {
                        $('html, body').animate({ scrollTop: target.offset().top - 150 }, 500, 'swing');
                    }
                }
            };
            if (hasChanged(this.props.slotsMoverOT, nextProps.slotsMoverOT)) {
                if (getData(nextProps.slotsMoverOT).viewMode === false) {
                    let target = $("#reporteFallasOT");
                    if (target.length) {
                        $('html, body').animate({ scrollTop: target.offset().top - 150 }, 500, 'swing');
                    }
                }
            };
            if (hasChanged(this.props.slotsMoverDictamenes, nextProps.slotsMoverDictamenes)) {
                if (getData(nextProps.slotsMoverDictamenes).viewMode === false) {
                    let target = $("#reporteDictamenes");
                    if (target.length) {
                        $('html, body').animate({ scrollTop: target.offset().top - 150 }, 500, 'swing');
                    }
                }

            };
            if (global.hasChanged(this.props.plaza, nextProps.plaza)) {
                if ((getData(nextProps.plaza).ID != getData(this.props.plaza).ID)) {
                    let idPlaza: any = getData(nextProps.plaza).ID;
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2 });
                    let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;
                    if (idPlaza != undefined) {
                        dispatchAsync("load::DDLFRACCIONAMIENTOSCOLABORADOR", encodedURL);
                    }
                }
            }
        };
        hasChanged(componente1: any, componente2: any): boolean {
            let c1: any = componente1 === undefined ? null : componente1;
            let c2: any = componente2 === undefined ? null : componente2;

            try {
                if (c1 !== null && c2 !== null) {
                    return global.hasChanged(c1, c2) || c1.IdTipoFalla !== c2.IdTipoFalla || c1.IdFalla !== c2.IdFalla;
                } else {
                    if (c1 === null && c2 === null) {
                        return false;
                    } else {
                        return true;
                    };
                };
            } catch (e) {
                return true;
            }
        };
        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.cliente, nextProps.cliente) ||
                hasChanged(this.props.ubicacion, nextProps.ubicacion) ||
                hasChanged(this.props.etapa, nextProps.etapa) ||
                hasChanged(this.props.contratistas, nextProps.contratistas) ||
                hasChanged(this.props.contacto, nextProps.contacto) ||
                this.hasChanged(this.props.componente, nextProps.componente) ||
                this.hasChanged(this.props.ubicacionFalla, nextProps.ubicacionFalla) ||
                hasChanged(this.props.partida, nextProps.partida) ||
                hasChanged(this.props.partidaInforme, nextProps.partidaInforme) ||
                hasChanged(this.state, nextProps.state) ||
                hasChanged(this.props.slotState, nextProps.slotState);
        };
        componentDidUpdate(prevProps: IEditProps, { }): any {
            let state: any = global.getData(this.props.slotState);
            if (state && state.viewMode === false) {
                let fnCalcularReincidencias: Function = (): void => {
                    let reporte: any = Forms.getForm()
                        .addID()
                        .addObject("Cliente")
                        .toObject();

                    let partida: any = Forms.getForm(REPORTE_FALLAS_ID)
                        .addID()
                        .addObject("TipoFalla")
                        .addObject("Falla")
                        .addObject("CausaFalla")
                        .addObject("UbicacionFalla")
                        .addNumberConst("IdCliente", reporte.IdCliente)
                        .addNumberConst("IdReporte", reporte.ID)
                        .toObject();

                    this.props.calcularReincidencias(partida);
                };
                //
                if (this.hasChanged(prevProps.componente, this.props.componente)) {
                    if (this.props.componente && this.props.componente.ID > 0) {
                        let partida: any = Forms.getValues(REPORTE_FALLAS_ID);
                        let reporte: any = Forms.getForm()
                            .addID()
                            .addDate("FechaCaptura")
                            .addDate("FechaEntregaVivienda")
                            .addVersion()
                            .toObject();

                        this.props.calcularPartida(partida, reporte);

                        if (this.props.ubicacionFalla && this.props.ubicacionFalla.ID > 0) {
                            fnCalcularReincidencias();
                        };
                    };
                };
                //
                if (this.hasChanged(prevProps.ubicacionFalla, this.props.ubicacionFalla)) {
                    if (this.props.ubicacionFalla && this.props.ubicacionFalla.ID > 0) {
                        if (this.props.componente && this.props.componente.ID > 0) {
                            fnCalcularReincidencias();
                        };
                    };
                };
            };
        };
        onChange(item: any): any {
            //console.log(item)
            this.setState({ isNew: false, viewMode: false, allowSave: true, value: item });
            if (item == "PorAnonimo") this.setState({ notYetOptionSelected: false });
            if (item == "PorColaborador") {
                this.setState({ notYetOptionSelected: false })
            };
        };
        render(): JSX.Element {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            let slotState: any = global.getData(this.props.slotState);
            let idEntidad: number = !(slotState && slotState.entidad) ? undefined : slotState.entidad.ID;
            let entidad: any = global.getData(this.props.entidad);
            let cliente: any = global.getData(this.props.cliente);
            let lote: any = global.getData(this.props.ubicacion);
            let isNew: boolean = global.getDataID(this.props.entidad) <= 0;
            let displayAntiguo: boolean = false;
            let idPlaza: string = undefined;
            let idFraccionamiento: string = undefined;
            let supervisionExterna: number = undefined;
            let editCampos: any = {};
            let badgeAntiguo: string = "badge badge-info";
            let tipoVivienda: number = undefined;
            let usuarioSelect: number = undefined;
            let opcionSeleccionada = this.state.value;

            if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {
                idPlaza = global.getData(this.props.ubicacion).IdPlaza;
                idFraccionamiento = global.getData(this.props.ubicacion).DesarrolloClave;
                let plaza: any = global.getData(this.props.ubicacion).Plaza;
                supervisionExterna = plaza ? plaza.ValidarResponsablePlaza : 0;

                let segmento: any = global.getData(this.props.ubicacion).Segmento;
                tipoVivienda = segmento ? segmento.IdTipoVivienda : null;
            };
            //
            if (entidad.ID > 0) {
                opcionSeleccionada = entidad.UsuarioReporta;
            } else {
                if (opcionSeleccionada !== "PorCliente") {
                    let Plaza = getDataID(this.props.plaza);
                    idPlaza = Plaza
                    if (opcionSeleccionada === "PorAnonimo") {
                        idPlaza = getDataID(this.props.plaza2)
                    }
                }
            }

            if (cliente && cliente.Antiguedad > 5) {
                displayAntiguo = true;
                badgeAntiguo = "badge badge-danger";
            };
            //
            
            console.log(entidad)
            if (entidad.IdEstatusReporte === "N" || entidad.IdEstatusReporte === "M") {
                editCampos.ObservacionesServicio = true;
                editCampos.ObservacionesContratista = true;
                editCampos.TipoFalla = true;
                editCampos.Falla = true;
                editCampos.UbicacionFalla = true;
                editCampos.CausaFalla = true;

                if (slotState.isNew === true) {
                    editCampos.ObservacionesSection = true;
                    editCampos.ObservacionesContratistaSection = true;
                };
            };
            //
            let edit: any = {
                icon: "icon-pencil",
                titulo: "Editar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (ReporteUtils.fnHasOrdenes(item.ID)) {
                        global.info("La incidencia no se puede editar porque se encuentra asignada a una orden de trabajo.");
                    } else {
                        let p: any = global.assign({
                            idTipoFalla: item.TipoFalla.ID
                        })
                        global.dispatchAsyncPost("load::reporte$fallasAreaComun", "base/scv/ReporteFallasAreasComunes/GetBP/GetFallaAreaComun/", { parametros: p });


                        global.fixJsonDates(item);
                        Forms.updateFormElements(id, item);
                        let isNew: boolean = item.EstatusPartida.Clave === "N";
                        this.props.config.setState({ viewMode: false, isNew, entidad: item }, id);
                    };
                }
            };
            //
            let remove: any = {
                icon: "fa fa-trash",
                titulo: "Eliminar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (ReporteUtils.fnHasDictamenes(item.ID)) {
                        global.info("La incidencia no se puede eliminar porque se encuentra asignada a un Diagnóstico.");
                    } else if (ReporteUtils.fnHasOrdenes(item.ID)) {
                        global.info("La incidencia no se puede eliminar porque se encuentra asignada a una orden de trabajo.");
                    } else {
                        let element: DataElement = Forms.getValue(id, idParent);
                        Forms.updateFormElement(idParent, id, element.removeItem(item));
                    };
                }
            };
            //
            let labelValue: any = (item: any) => {
                return !item ? "" : (!item.Clave ? "" : "(" + item.Clave + ") ") + (!item.Descripcion ? "" : item.Descripcion);
            };
            //
            let labelCausaFalla: any = (item: any) => {
                return !item ? "" : (!item.Abreviatura ? "" : "(" + item.Abreviatura + ") ") + (!item.Descripcion ? "" : item.Descripcion);
            };
            //
            let labelFallaOrigen: any = (item: any) => {
                return !(item && item.FallaOrigen) ? "" : (!item.FallaOrigen.Abreviatura ? "" : "(" + item.FallaOrigen.Abreviatura + ") ") + (!item.FallaOrigen.Descripcion ? "" : item.FallaOrigen.Descripcion);
            };
            //
            let labelGarantia: any = (value: any) => {
                return (value === undefined || value === null) ? "" : value > 0 ? "<span class='badge bold' style='background-color: rgb(65, 195, 0);'>" + value + "</span>" : "<span class='badge badge-danger bold'>" + value + "</span>"
            };
            //
            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";

                if (state.allowUpdate === true) {
                    className = "fas fa-unlock";
                };

                return global.formatDate(value) + " <span class='pull-right'><i class='" + className + "' style='color:#1A237E;'></i></span>";
            };
            let labelFechaCustom: any = (value: any) => {
                return label.formatDate(value);
            };
            //
            let reMessage: JSX.Element;

            try {
                let reJson: string = Forms.getValue("ReincidenciasValues", REPORTE_FALLAS_ID);
                if (reJson && reJson.length) {
                    let reValues: any = JSON.parse(reJson);
                    if (reValues.ProcedenSi > 0) {
                        reMessage = <alerts.Alert type={alerts.AlertTypeEnum.warning}>
                            <p style={{ fontSize: 12, fontWeight: "bold" }}> REINCIDENCIA </p>
                        </alerts.Alert>
                    };

                    if (reValues.ProcedenNo > 0) {
                        reMessage = <alerts.Alert type={alerts.AlertTypeEnum.danger}>
                            <p style={{ fontSize: 12, fontWeight: "bold" }}> REINCIDENCIA NO PROCEDE </p>
                        </alerts.Alert>
                    };
                };
            } catch (e) { };

            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={<span>
                            <span>Reporte de Fallas Areas Comunes</span>
                            <span className="badge bold badge badge-success pull-right">{!(entidad && entidad.EstatusReporte) ? "" : entidad.EstatusReporte.Nombre}</span>
                            <span className="pull-right bold">Estatus:&nbsp;</span>
                            {entidad.IdPrereporte > 0 ? <span>
                                <span className="badge bold pull-right" style={{ backgroundColor: "#4cd964", marginRight: 5 }} >{entidad.IdPrereporte}</span>
                                <i className="fas fa-mobile-alt  pull-right" style={{ fontSize: "14px", margin: 2 }}></i></span> : null
                            }
                            {!(entidad && entidad.Prereporte) ?
                                <span className="pull-right"><span className="badge badge-danger bold">{isNew === true ? "NUEVO" : entidad.ID}</span>&nbsp;&nbsp;</span> :
                                <span className="pull-right"><span className="badge badge bold" style={{ backgroundColor: "#41c300" }}>prereporte</span>&nbsp;&nbsp;</span>
                            }
                            <span className="pull-right bold">Folio:&nbsp;</span>
                        </span>}
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            {isNew === true && !(entidad && entidad.Prereporte) ?
                                <page.OptionSection
                                    id={FORMULARIO_OPCIONES}
                                    icon="fas fa-cog"
                                    level={1}
                                    collapsed={false}
                                    hideCollapseButton={true}>
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                            <RadioButton
                                                id={POR_CLIENTE}
                                                idForm={config.id}
                                                value="C"
                                                groupName="OpcionesProcede"
                                                size={[12, 12, 4, 4]}
                                                change={this.onChange.bind(this)} />
                                            <RadioButton
                                                id={POR_COLABORADOR}
                                                idForm={config.id}
                                                value="U"
                                                groupName="OpcionesProcede"
                                                size={[12, 12, 4, 4]}
                                                change={this.onChange.bind(this)} />
                                            <RadioButton
                                                id={POR_ANONIMO}
                                                idForm={config.id}
                                                value="A"
                                                groupName="OpcionesProcede"
                                                size={[12, 12, 4, 4]}
                                                change={this.onChange.bind(this)} />
                                        </Column>
                                    </Row>
                                </page.OptionSection>: null
                                }
                            {opcionSeleccionada === "PorCliente" ?
                                isNew === true && !(entidad && entidad.Prereporte) ?
                                    <select.ClientesLotesSPV key={"Cliente"} idForm={config.id} size={[12, 12, 6, 6]} /> :
                                    <label.Entidad id="Cliente" size={[12, 12, 6, 6]} value={(item: any) => {
                                        return !item ? "" : (!item.Clave ? "" : "<span class='" + badgeAntiguo + "'>" + item.Clave + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                                    }} /> : null
                            }
                            {opcionSeleccionada === "PorColaborador" ?
                                isNew === true && !(entidad && entidad.Prereporte) ?
                                    <select.UsuariosLotesSPV
                                        key={"Usuario"}
                                        idForm={config.id}
                                        size={[6, 6, 6, 6]} /*required={true} validations={[validations.required()]}*/ /> :
                                    <label.Entidad id="Usuario" size={[12, 12, 6, 6]} value={(item: any) => {
                                        return !item ? "" : (!item.Clave ? "" : "<span class='" + badgeAntiguo + "'>" + item.Clave + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                                    }} />
                                : null
                            }
                            {opcionSeleccionada === "PorAnonimo" ?
                                <label.Entidad id="Anonimo" size={[12, 12, 6, 6]} value={"ANONIMO"} />
                                : null
                            }
                            <label.Fecha id="FechaCaptura" value={labelFechaCaptura} isHTML={true} size={[12, 12, 4, 2]} />
                            {/*<label.Fecha id="FechaEntregaVivienda" size={[12, 12, 4, 2]} />
                            <label.Label id="MesesTranscurridos" size={[12, 12, 4, 2]} />*/}
                        </Row>
                        <Row>
                            {opcionSeleccionada === "PorCliente" ?
                                <Column size={[12, 12, 4, 4]} style={{ paddingTop: 10 }}>
                                    <ViewUbicacionCliente lote={lote} />
                                </Column> : null
                            }
                            {opcionSeleccionada === "PorColaborador" ?
                                <Column size={[12, 12, 4, 4]} style={{ paddingTop: 10 }}>
                                    <ViewUbicacionColaborador />
                                </Column> : null
                            }
                            {opcionSeleccionada === "PorAnonimo" ?
                                <Column size={[12, 12, 4, 4]} style={{ paddingTop: 10 }}>
                                    <ViewUbicacionAnonimo />
                                </Column> : null
                            }
                            <Column size={[12, 12, 8, 8]} style={{ paddingTop: 10 }}>
                                <page.OptionSection
                                    id={REPORTE_INFORMACION_ID}
                                    title="INFORMACIÓN GENERAL"
                                    parent={config.id}
                                    level={1}
                                    icon="fa fa-info-circle" collapsed={false}>
                                    <Row>
                                        <label.Fecha id="FechaSolucionReporte" value={labelFechaCustom} size={[3, 3, 3, 3]} />
                                        <label.Fecha id="FechaTerminacionFolio" label={"FECHA TERMINACIÓN"} value={entidad.FechaTerminacionFolio} size={[12, 12, 3, 3]} />
                                        <ResponsablesConstruccionDDLV3 id="ResponsableConstruccion" size={[6, 6, 6, 6]} required={true} validations={[validations.required()]}/>
                                    </Row>
                                    <Row>
                                        <label.Label label="DÍAS SOLUCIÓN" id="DiasSolucion" size={[3, 3, 3, 3]} />
                                        <label.Label label="DÍAS CONTRATISTA" id="DiasContratista" size={[3, 3, 3, 3]} />
                                        <ddl.SPVMediosComunicacionDDL id="MedioSolicitud" size={[6, 6, 6, 6]} required={true} validations={[validations.required()]}/>
                                    </Row>
                                    <Row>
                                        <label.Fecha id="FechaContratistaInicial" value={labelFechaCustom} size={[3, 3, 3, 3]} />
                                        <label.Fecha id="FechaContratistaFinal" value={labelFechaCustom} size={[3, 3, 3, 3]} />
                                    </Row>
                                    <Row>
                                        {editCampos.ObservacionesServicio === true ?
                                            <TextArea id="ObservacionesServicio" rows={2} idForm={config.id} size={[6, 6, 6, 6]} /> :
                                            <label.Label id="ObservacionesServicio" size={[6, 6, 6, 6]} />
                                        }
                                        {editCampos.ObservacionesContratista === true ?
                                            <TextAreaContainer /> :
                                            <label.Label id="ObservacionesContratista" size={[6, 6, 6, 6]} />
                                        }
                                    </Row>

                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            
                        </Row>
                        <Row>
                            <Column size={[12, 12, 6, 6]}>
                                <page.OptionSection
                                    id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                    parent={config.id}
                                    level={1}
                                    title={"Contratista"}
                                    icon="fa fa-user" collapsed={false}>
                                    <Row>
                                        {<SPVContratistasConsulta idPlaza={idPlaza} idForm={PAGE_ID} size={[12, 12, 12, 12]} />}
                                        <TipoContratistas id="TipoContratista" idForm={PAGE_ID} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 6, 6]}>
                                <page.OptionSection
                                    id={REPORTE_CONTACTO_ID}
                                    parent={config.id}
                                    title={"TELEFONOS"}
                                    level={1}
                                    icon="fas fa-mobile-alt" collapsed={false} hideCollapseButton={false}>
                                    <Row>
                                        {isNew === true && !(entidad && entidad.Prereporte) ?
                                            <input.Telefono id={"TelefonoCasa"} label={"Teléfono Casa"} idForm={REPORTE_CONTACTO_ID} size={[12, 12, 12, 12]} /> :
                                            <label.Entidad id="TelefonoCasa" value={entidad.TelefonoCasa} label={"Teléfono Casa"} size={[12, 12, 12, 12]} />
                                        }
                                        {isNew === true && !(entidad && entidad.Prereporte) ?
                                            <input.Telefono id={"TelefonoOficina"} label={"Teléfono Oficina"} idForm={REPORTE_CONTACTO_ID} size={[12, 12, 12, 12]} />:
                                            <label.Entidad id="TelefonoOficina" value={entidad.TelefonoOficina} label={"Teléfono Oficina"} size={[12, 12, 12, 12]} />
                                        }
                                        {isNew === true && !(entidad && entidad.Prereporte) ?
                                            <input.Telefono id={"TelefonoOtros"} label={"Teléfono Otros"} idForm={REPORTE_CONTACTO_ID} size={[12, 12, 12, 12]} /> :
                                            <label.Entidad id="TelefonoOtros" value={entidad.TelefonoOtros} label={"Teléfono Otros"} size={[12, 12, 12, 12]} />
                                        }
                                  </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            {/*<ReporteMessages visible={true} />*/}
                        </Row>
                        <Row>
                            <div id="reporteFallas">
                                <page.SectionList
                                    id={REPORTE_FALLAS_ID}
                                    parent={config.id}
                                    icon="fas fa-cogs"
                                    level={1}
                                    hideNewButton={!state.allowUpdate}
                                    //editButtons={<SearchButton id="searchButton" />}
                                    listHeader={listHeaderFallas}
                                    size={[12, 12, 12, 12]}
                                    readonly={true}
                                    horizontalScrolling={true}
                                    selectable={true}
                                    drawOddLine={true}
                                    items={createSuccessfulStoreObject([])}
                                    onAddNew={() => {
                                        let ubicacion: any = global.getData(this.props.ubicacion);
                                        let partidas: any[] = global.getData(Forms.getValue(REPORTE_FALLAS_ID, config.id), []);
                                        let partida: number = 0;
                                        let contratista: any[] = EK.Store.getState().forms.ReporteFallasAreasComunes.form.Contratista.value;
                                        //calcular el consecutivo de la partida
                                        partidas.forEach((value: any, index: number) => {
                                            if (partida < value.Partida) {
                                                partida = value.Partida;
                                            }
                                        });
                                        partida++;
                                        Forms.remove(REPORTE_FALLAS_ID);
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "Partida", partida);
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "DesarrolloClave", ubicacion.DesarrolloClave);
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "EstatusPartida", { Clave: "N", Nombre: "NUEVO" });
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "EstatusPartidaValor", "N");
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "EstatusAutorizacion", "N");
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "PartidaAutorizada", "A");
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "Procede", "S");
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "Reincidencias", 0);
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "Dictamenes", []);
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "Contratista", contratista);

                                        //establecer el contratista default de la ubicación
                                        //if (this.props.contratistas && this.props.contratistas.data) {
                                        //    let contratistas: any[] = global.getData(this.props.contratistas, []);
                                        //    contratistas = contratistas.filter(c => { return c.ContratistaDefault === "S"; });
                                        //    if (contratistas && contratistas.length > 0) {
                                        //        Forms.updateFormElement(REPORTE_FALLAS_ID, "Contratista", contratistas[0].Contratista);
                                        //    };
                                        //};

                                        this.props.config.setState({ viewMode: false, isNew: true, entidad: undefined }, REPORTE_FALLAS_ID);
                                    }}
                                    subTitle={(data: any): any => {
                                        let state: any = global.getData(this.props.slotState);
                                        let subTitle: any = "";

                                        if (state) {
                                            if (state.viewMode === true) {
                                                subTitle = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                                                    {[global.getData(data, []).length].join("")}
                                                </span>
                                            } else {
                                                let partida: any = Forms.getValue("Partida", REPORTE_FALLAS_ID);
                                                subTitle = <span>
                                                    <span> / Partida</span>
                                                    <span className="badge badge-info" style={{ marginLeft: 5 }}>{partida}</span>
                                                </span>
                                            }
                                        };

                                        return subTitle;
                                    }}
                                    mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                        let retValue: any = form
                                            .addID()
                                            .addNumber("Partida")
                                            .addObject("TipoFalla")
                                            .addObject("Falla")
                                            .addObject("CausaFalla")
                                            .addObject("UbicacionFalla")
                                            .addObject("Contratista")
                                            .addDate("TerminoGarantia")
                                            .addNumber("DiasGarantia")
                                            .addDate("FechaCerrado")
                                            .addString("ObservacionesContratista")
                                            .addString("Observaciones")
                                            .addObject("EstatusPartida")
                                            .addString("EstatusPartidaValor")
                                            .addString("EstatusAutorizacion")
                                            .addString("PartidaAutorizada")
                                            .addString("Procede")
                                            .addNumber("Reincidencias")
                                            .addObject("ReincidenciasValues")
                                            .addObject("Dictamenes")
                                            .addVersion()
                                            .toObject();

                                        if (retValue.Contratista == undefined) {
                                            global.warning("Falta seleccionar el contratista.");
                                            return null;
                                        }
                                        let duplicada: boolean;
                                        let items: any[] = entidades;
                                        if (items && items.length > 0) {
                                            items.forEach((value: any, index: number): any => {
                                                if (value.Partida === retValue.Partida) {
                                                    retValue.ID = value.ID;
                                                    retValue._found = true;
                                                };

                                                if (value._eliminado !== true && value.Partida !== retValue.Partida) {
                                                    if (value.TipoFalla && (value.TipoFalla.ID === retValue.TipoFalla.ID) &&
                                                        value.Falla && (value.Falla.ID === retValue.Falla.ID)) {
                                                        duplicada = true;
                                                    }
                                                }
                                            });
                                        };

                                        if (duplicada === true) {
                                            global.warning("La incidencia-ubicación seleccionada ya fue agregada. Por favor verifique la información e intente de nuevo.");
                                            return null;
                                        };

                                        if (!(retValue && retValue.ID > 0)) {
                                            retValue.EstatusAutorizacion = "N";
                                            retValue.EstatusPartidaValor = "N";
                                            retValue.EstatusPartida = global.assign({}, {
                                                Clave: "N",
                                                Nombre: "NUEVO"
                                            });
                                        };

                                        retValue = global.assign(retValue, ReporteUtils.fnSetDictamenes(retValue));

                                        return retValue;
                                    }}
                                    formatter={(index: number, item: any) => {
                                        let bgColor: string;
                                        let extraData: any[] = [];
                                        let allowEdit: boolean = false;
                                        let allowRemove: boolean = false;

                                        if (item.PartidaAutorizada === "R" || item.Procede === "N") {
                                            bgColor = "#FFA07A";
                                        };

                                        if (item.EstatusPartida && (item.EstatusPartida.Clave === "N" || item.EstatusPartida.Clave === "D")) {
                                            if (entidad.EstatusReporte) {
                                                if (entidad.EstatusReporte.Clave === "N") {
                                                    allowEdit = true;
                                                    allowRemove = true;
                                                } else if (entidad.EstatusReporte.Clave === "M") {
                                                    allowEdit = true;
                                                };
                                            };
                                        };

                                        if (isNew === true || item.ID <= 0) {
                                            allowEdit = true;
                                            allowRemove = true;
                                        };

                                        if (displayAntiguo === true) {
                                            allowEdit = false;
                                            allowRemove = false;
                                        };

                                        if (allowEdit === true && state.allowUpdate === true) {
                                            extraData.push(edit);
                                        };

                                        if (allowRemove === true && state.allowUpdate === true) {
                                            extraData.push(remove);
                                        };

                                        return <Row className="list-selectable-item" style={{ backgroundColor: bgColor }}>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida}</span></Column>
                                            {/*<ColumnDictamen items={item.Dictamenes} size={[1, 1, 1, 1]} />*/}
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.TipoFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.TipoFalla.ID}</span>{item.TipoFalla.Nombre}</span>}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Falla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Falla.ID}</span>{item.Falla.Nombre}</span>}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.UbicacionFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.ID}</span>{item.UbicacionFalla.Nombre}</span>}</Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</span>}</Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.Observaciones}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.Nombre : null}</Column>
                                            {/*<Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.FallaOrigen.Descripcion : null}</Column>*/}
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                <a id={"a_reincidencias_" + index}>
                                                    <span className="badge badge-warning bold">{item.Reincidencias}</span>
                                                    <SPVReincidenciasConsulta target={"a_reincidencias_" + index} item={item} idFormSection={REPORTE_FALLAS_ID} />
                                                </a>
                                            </Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesContratista}</Column>
                                            {/*<Column size={[2, 2, 2, 2]} className="listItem-center-header"><span dangerouslySetInnerHTML={{ __html: labelGarantia(item.DiasGarantia) }}></span></Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.TerminoGarantia)}</Column>*/}
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.FechaCerrado)}</Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">{!(item && item.EstatusPartida) ? null : <span className="badge badge-info">{item.EstatusPartida.Nombre}</span>}</Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-default-header " style={{ paddingLeft: "0px", paddingRight: "0px", width: "46px", overflow: "unset", position: "sticky", right: 0, zIndex: 1, height: "0px" }}  >
                                                {extraData.length > 0 ? <buttons.PopOver2 style={{ position: "relative", zIndex: 200, right: "0px", height: "22px", borderBottomLeftRadius: "50px !important", borderBottomRightRadius: "50px !important", borderTopLeftRadius: "50px !important", borderTopRightRadius: "50px !important", background: "#d2cccc", top: "0px" }} idParent={config.id} idForm={REPORTE_FALLAS_ID} renderColumn={true} info={item} extraData={extraData} /> : null}
                                            </Column>
                                        </Row>
                                    }}>
                                    <Row>
                                        {editCampos.TipoFalla === true ?
                                            <TipoFallasAreaComunDDL id={"TipoFalla"} size={[12, 12, 3, 3]} label={"Tipo Incidencia"} idFormSection={REPORTE_FALLAS_ID} /> :
                                            <label.Entidad id="TipoFalla" idForm={REPORTE_FALLAS_ID} value={labelValue} size={[12, 12, 3, 3]} />
                                            /*<SPVTiposComponentesConsulta idFormSection={REPORTE_FALLAS_ID} usoFalla={"Ubicacion"} size={[12, 12, 3, 3]} /> :
                                            <label.Entidad id="TipoFalla" idForm={REPORTE_FALLAS_ID} value={labelValue} size={[12, 12, 3, 3]} />*/
                                        }
                                        {editCampos.Falla === true ?
                                            <FallaAreaComunDDL id="Falla" label={"Incidencia Area Comun"} size={[12, 12, 3, 3]} required={false} idFormSection={REPORTE_FALLAS_ID} /> :
                                            <label.Entidad id="Falla" idForm={REPORTE_FALLAS_ID} value={labelValue} size={[12, 12, 3, 3]} />

                                        }
                                        {editCampos.CausaFalla === true ?
                                            <CausaFallaDDL id={"CausaFalla"} size={[12, 12, 3, 3]} label={"Causa Incidencia"} idFormSection={REPORTE_FALLAS_ID} /> :
                                            <label.Entidad id="CausaFalla" idForm={REPORTE_FALLAS_ID} value={labelValue} size={[12, 12, 3, 3]} />
                                        }
                                        {/*<label.Entidad id="CausaFalla" idForm={REPORTE_FALLAS_ID} value={labelCausaFalla} size={[12, 12, 3, 3]} />
                                        <label.Entidad id="CausaFalla" label="Causa" idForm={REPORTE_FALLAS_ID} value={labelFallaOrigen} size={[12, 12, 3, 3]} />*/}
                                        {editCampos.UbicacionFalla === true ?
                                            <UbicacionFallaDDL id={"UbicacionFalla"} size={[12, 12, 3, 3]} label={"Ubicacion Incidencia"} idFormSection={REPORTE_FALLAS_ID} /> :
                                            <label.Entidad id="UbicacionFalla" idForm={REPORTE_FALLAS_ID} value={labelValue} size={[12, 12, 3, 3]} />
                                        }
                                    </Row>
                                    <Row>
                                        <SPVContratistasConsulta idPlaza={idPlaza} idFormSection={REPORTE_FALLAS_ID} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]}/>
                                        <label.Entidad id="EstatusPartida" idForm={REPORTE_FALLAS_ID} size={[12, 12, 3, 3]} />
                                        <label.Fecha id="FechaCerrado" idForm={REPORTE_FALLAS_ID} size={[12, 12, 3, 3]} />
                                    </Row>
                                    <Row>
                                        {editCampos.ObservacionesSection === true ?
                                            <TextArea id="Observaciones" idFormSection={REPORTE_FALLAS_ID} rows={2} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} /> :
                                            <label.Label id="Observaciones" idForm={REPORTE_FALLAS_ID} size={[12, 12, 6, 6]} />
                                        }
                                        {editCampos.ObservacionesContratistaSection === true ?
                                            <TextArea id="ObservacionesContratista" idFormSection={REPORTE_FALLAS_ID} rows={2} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} /> :
                                            <label.Label id="ObservacionesContratista" idForm={REPORTE_FALLAS_ID} size={[12, 12, 6, 6]} />
                                        }
                                    </Row>
                                </page.SectionList>
                            </div>
                        </Row>
                        <Row>
                            <Dictamenes idFraccionamiento={idFraccionamiento} idPlaza={idPlaza} size={[12, 12, 12, 12]} />
                            <EditOrdenesTrabajo viewMode={displayAntiguo === true} size={[12, 12, 12, 12]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>
        }
    });

    interface IDictamenesProps extends page.IProps, grid.IColumn {
        agenda?: DataElement;
        agendaDetalle?: DataElement;
        ordenesCita?: DataElement;
        item?: DataElement;
        items?: DataElement;
        options?: DataElement;
        slotState?: global.DataElement;
        idFraccionamiento: any;
        idPlaza: any;
        getDictamenes?: (idDictamen: number) => void;
    };

    const Dictamenes: any = global.connect(class extends React.Component<IDictamenesProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.item = state.global[["entity$", REPORTE_DICTAMENES_ID].join("")];
            retValue.items = Forms.getValue(REPORTE_DICTAMENES_ID, config.id, state);
            retValue.options = state.global[["catalogo$", REPORTE_DICTAMENES_OPTIONS_ID].join("")];
            retValue.slotState = state.global.state$reporte$fallas;
            retValue.tipoAgenda = state.global.TipoAgenda;
            retValue.ordenesCita = state.global[["catalogo", REPORTE_APPOINTMENT_DICTAMENES_ID].join("$")];
            retValue.agenda = state.global.catalogo$AgendaNew;
            retValue.agendaDetalle = state.global.ACTDETALLEAGENDA;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            getDictamenes: (idDictamen: number): void => {
                let encodedParams: string = global.encodeParameters({ idReporte: idDictamen });
                global.dispatchAsync("global-page-data", "base/scv/ReporteFallasAreasComunes/Get/GetDictamenesReporte/" + encodedParams, REPORTE_DICTAMENES_ID);
            }
        });
        componentWillReceiveProps(nextProps: IDictamenesProps): any {
            if (global.hasChanged(this.props.items, nextProps.items)) {
                if (global.isSuccessful(nextProps.items)) {
                    let current: DataElement = Forms.getValue(REPORTE_FALLAS_ID, config.id);
                    let next: DataElement = new DataElement(current);

                    let data: any[] = global.getData(next, []);
                    if (data && data.length > 0) {
                        data.forEach((value) => {
                            let item: any = global.assign({}, value);

                            if (item._eliminado !== true) {
                                item = global.assign(item, ReporteUtils.fnSetDictamenes(item));
                                next = next.upsertItem(item);
                            };
                        });
                    };

                    if (global.hasChanged(current, next) && global.isSuccessful(next)) {
                        Forms.updateFormElement(config.id, REPORTE_FALLAS_ID, next);
                    };
                };
            };
            if (global.hasChanged(this.props.ordenesCita, nextProps.ordenesCita)) {
                if (global.isSuccessful(nextProps.ordenesCita)) {
                    let data: any = global.getData(nextProps.ordenesCita, []);
                    Forms.updateFormElement("CapturaInfo", "DictamenesAgendaEdit", data);
                };
            };

            //if (hasChanged(nextProps.agendaDetalle, this.props.agendaDetalle)) {
            //    if (global.isSuccessful(nextProps.agendaDetalle)) {
            //        let item: any = getData(nextProps.agendaDetalle);
            //        if (item.Estado === 5) {
            //            this.props.getOrdenesTrabajo(global.getDataID(this.props.entidad));
            //        };
            //    };
            //};
        };
        componentDidUpdate(prevProps: IOrdenesTrabajo, { }): any {
            if (global.isSuccessful(this.props.agenda)) {
                if (global.wasUpdated(prevProps.agenda, this.props.agenda, false)) {
                    this.props.getDictamenes(global.getDataID(this.props.entidad));
                }
            };
        };
        onPlanificacion(item: any): void {
            console.log(item);
            let tipoAgenda: any;
            let glTipoAgenda: DataElement = global.getStateItem("global.TipoAgenda") as DataElement;
            console.log(glTipoAgenda)
            if (glTipoAgenda) {
                if (global.isSuccessful(glTipoAgenda)) {
                    let tiposAgenda: any[] = global.getData(glTipoAgenda, []);
                    if (tiposAgenda && tiposAgenda.length > 0) {
                        let items: any[] = tiposAgenda.filter((value) => { return value.Clave === "DictamenAreasComunes" }) as any[];
                        tipoAgenda = !(items && items.length > 0) ? null : items[0];
                    };
                };
            };
            //
            console.log(tipoAgenda)
            if (tipoAgenda) {
                if (!(item.AgendaDetalle && item.AgendaDetalle.ID)) {
                    let fechaActual: Date = new Date();
                    let fechaPropuesta: Date;
                    fechaActual = global.FechaPropuesta(fechaActual, 1);
                    fechaPropuesta = global.FechaPropuesta(fechaActual, 1);

                    Forms.reset("AgendaNew");
                    Forms.updateFormElement("AgendaNew", "FechaInicio", fechaActual);  
                    Forms.updateFormElement("AgendaNew", "TipoAgenda", tipoAgenda);

                    global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: tipoAgenda.Clave });
                    global.dispatchDefault("load::AgendaNewCalendasUser", null);
                    global.dispatchSuccessful("global-page-data", [], "AgendaPostVentaResult");
                    global.dispatchSuccessful("load::ACTDETALLEAGENDA", null);

                    //let encodedParams: string = global.encodeObject({ id: item.ID });
                    let encodedParams: string = global.encodeParameters({ id: item.ID });
                    global.dispatchAsync("global-page-data", "base/scv/ReporteFallasAreasComunes/Get/GetDictamenes/" + encodedParams, REPORTE_APPOINTMENT_DICTAMENES_ID);

                    let modalCalendar: any = $("#modalCalen");
                    modalCalendar.modal();
                    modalCalendar.css("height", "auto");
                } else {

                    let fechaActual: Date = new Date();
                    let fechaPropuesta: Date;
                    fechaActual = global.FechaPropuesta(fechaActual, 1);
                    fechaPropuesta = global.FechaPropuesta(fechaActual, 1);

                    Forms.reset("AgendaNew");
                    Forms.updateFormElement("AgendaNew", "FechaInicio", fechaActual);
                    Forms.updateFormElement("AgendaNew", "TipoAgenda", tipoAgenda);
                    config.setState({ action: "REPROGRAMACION" }, "AgendaDictamen");

                    global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: tipoAgenda.Clave });
                    global.dispatchDefault("load::AgendaNewCalendasUser", null);
                    global.dispatchSuccessful("global-page-data", [], "AgendaPostVentaResult");
                    global.dispatchSuccessful("load::ACTDETALLEAGENDA", null);
                    EK.Store.getState().global.state$AgendaContratistaAreasComunes.data.reprogramacion = true

                    //let encodedParams: string = global.encodeObject({ id: item.ID });
                    let encodedParams: string = global.encodeParameters({ id: item.ID });
                    global.dispatchAsync("global-page-data", "base/scv/ReporteFallasAreasComunes/Get/GetDictamenes/" + encodedParams, REPORTE_APPOINTMENT_DICTAMENES_ID);

                    let modalCalendar: any = $("#modalCalen");
                    modalCalendar.modal();
                    modalCalendar.css("height", "auto");

                    /*Forms.updateFormElement("CapturaInfo", "DetalleCteAgendaEdit", null);
                    Forms.updateFormElement("CapturaInfo", "ContratistaOTAgendaEdit", null);

                    let idAgenda: any = item.Agenda.ID;
                    let idAgendaDetalle: any = item.AgendaDetalle.ID;
                    let claveTipoAgenda: any = tipoAgenda.Clave;
                    let p: any = global.assign({
                        IdAgenda: idAgenda,
                        ClaveTipoAgenda: claveTipoAgenda,
                        IdAgendaDetalle: idAgendaDetalle
                    });

                    global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: claveTipoAgenda });
                    global.dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p }, "AgendaDetallesCitaResult");
                    config.setState({ action: "REPROGRAMACION" }, "AgendaDictamen");

                    let modalAgenda: any = $("#modalAgendaInformacionCita");
                    //let modalAgenda: any = $("#modalCalen");
                    modalAgenda.modal();
                    modalAgenda.css("height", "auto");*/
                };
            };
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            //console.log(entidad)
            let IdPlaza: any = entidad ? entidad.IdPlaza : null;
            let slotState: any = global.getData(this.props.slotState);
            let idEntidad: number = !(slotState && slotState.entidad) ? undefined : slotState.entidad.ID;
            let edit: any = {
                icon: "icon-pencil",
                titulo: "Editar Diagnóstico",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {

                    if (item.EstatusDictamenValue == "C") {
                        global.info("El Diagnóstico no se puede editar porque ya se encuentra cerrado.");
                    }
                    else if (ReporteUtils.fnHasOrdenes(item.IdReporteDetalle)) {
                        global.info("El Diagnóstico no se puede editar porque la incidencia se encuentra asignada a una orden de trabajo.");
                    }
                    else {
                        Forms.remove(id);
                        Forms.updateFormElements(id, item);
                        global.dispatchSuccessful("global-page-data", item.Detalles, REPORTE_DICTAMENES_DETALLES_ID);

                        this.props.config.setEntity(item, id);
                        this.props.config.setState({ viewMode: false }, id);
                    };
                }
            };
            //
            let remove: any = {
                icon: "fa fa-trash",
                titulo: "Eliminar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (item.EstatusDictamenValue == "C") {
                        global.info("El Diagnóstico no se puede eliminar porque ya se encuentra cerrado.");
                        return null;
                    }
                    if (ReporteUtils.fnHasOrdenes(item.IdReporteDetalle)) {
                        global.info("El Diagnóstico no se puede eliminar porque la incidencia se encuentra asignada a una orden de trabajo.");
                    } else {
                        let element: DataElement = Forms.getValue(id, idParent);

                        Forms.updateFormElement(idParent, id, element.removeItem(item));
                    };
                }
            };

            let appointment: any = {
                icon: "fa fa-calendar",
                titulo: "Planificar Diagnóstico",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (item.EstatusDictamenValue == "C") {
                        global.info("El Diagnóstico no se puede planificar porque ya se encuentra cerrado.");
                        return null;
                    }
                    if (item && item.ID > 0) {
                        this.onPlanificacion(item);
                    } else {
                        global.info("Para planificar el Diagnóstico es necesario que primero guarde la información capturada.");
                    }
                    //this.props.config.setState({ viewMode: false, action: { name: "onPlanificacion", data: item } });
                    //this.props.config.updateForm();
                }
            };
            return <div id="reporteDictamenes"><page.SectionList
                id={REPORTE_DICTAMENES_ID}
                title="DIAGNÓSTICOS"
                parent={config.id}
                icon="fas fa-clipboard-check"
                level={1}
                listHeader={listHeaderDictamen}
                size={this.props.size}
                readonly={true}
                style={{ marginTop: 12 }}
                items={createSuccessfulStoreObject([])}
                onAddNew={() => {

                    Forms.remove(REPORTE_DICTAMENES_ID);
                    Forms.updateFormElement(REPORTE_DICTAMENES_ID, "Creado", new Date());
                    Forms.updateFormElement(REPORTE_DICTAMENES_ID, "CreadoPor", global.getData(this.props.app).Me);

                    global.dispatchSuccessful("global-page-data", [], REPORTE_DICTAMENES_DETALLES_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTE_DICTAMENES_OPTIONS_ID);

                    this.props.config.setState({ viewMode: false }, REPORTE_DICTAMENES_ID);
                }}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addDescripcion()
                        .addDate("Creado")
                        .addObject("CreadoPor")
                        .addObject("EstatusDictamen")
                        .addObject("ResponsableDictamen")
                        .addObject("Detalles", REPORTE_DICTAMENES_DETALLES_ID)
                        .addObject("PartidasNew", REPORTE_DICTAMENES_DETALLES_ID)
                        .addEstatus()
                        .addVersion()
                        .toObject();
                    let detalles: any[] = retValue.Detalles as any[];

                    if (detalles && detalles.length > 0) {
                        retValue.IdReporteDetalle = detalles[0].IdReporteDetalle;
                        retValue.IdReporte = detalles[0].IdReporte;
                        retValue.Partida = detalles[0].Partida;
                        let partidas: number[] = [];
                        let IdPartidas: number[] = [];
                        for (var i = 0; i < detalles.length; i++) {
                            partidas.push(detalles[i].Partida.Partida);
                            IdPartidas.push(detalles[i].IdReporteDetalle)
                            //retValue.Partida.push(detalles[i].Partida)
                        }
                        retValue.Partidas = partidas.toString();
                        retValue.IdPartidas = IdPartidas.toString();

                    } else {
                        global.warning("No se asignó el componente para el Diagnóstico.");
                        return null;
                    };

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {
                            if (value.ID === retValue.ID) {
                                retValue._found = true;
                            };
                        });
                    };
                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    let extraData: any[] = [];
                    extraData.push(edit);
                    extraData.push(appointment);
                    extraData.push(remove);
                    extraData.push(printDiagnostico);
                   // console.log(this.props)
                    //if (!this.props.viewMode) {
                    //    if (item.EstatusOrdenTrabajo.Clave === "N") {
                    //        extraData.push(edit);
                    //        extraData.push(appointment);
                    //        extraData.push(remove);
                    //    } else if (item.EstatusOrdenTrabajo.Clave === "E") {
                    //        extraData.push(workOT);
                    //        extraData.push(printOT);
                    //    }
                    //};
                    //console.log(item)
                    return <Row id={"row_dictamen_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                            <Row>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                    <CollapseButton idElement={"row_dictamen_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                </Column>
                                {/* <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info bold">{item.Partida ? item.Partida.Partida : ""}</span></Column>*/}
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info bold">{item.Partida ? item.Partidas : ""}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-success bold">{item.ID > 0 ? item.ID : ""}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.Descripcion}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.ResponsableDictamen === undefined || item.ResponsableDictamen.ID === undefined || item.ResponsableDictamen.ID === null ? "" : item.ResponsableDictamen.Nombre}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Agenda === undefined || item.Agenda.ID === null || item.Agenda.ID === undefined ? "" : global.formatDateTimeDirect(item.Agenda.FechaInicio, true)}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Agenda === undefined || item.Agenda.ID === null || item.Agenda.ID === undefined ? "" : global.formatDateTimeDirect(item.Agenda.FechaFin, true)}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave], fontSize: "small" }}></i>}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow">{!(item && item.EstatusDictamen) ? null : <span className="badge" style={{ backgroundColor: BGCEstatusDictamen[item.EstatusDictamen.Clave] }}>{item.EstatusDictamen.Nombre}</span>}</Column>
                                {/* <buttons.PopOver idParent={config.id} idForm={REPORTE_DICTAMENES_ID} info={item} extraData={[edit, remove]} />*/}
                                {extraData.length > 0 ? <buttons.PopOver2 idParent={config.id} idForm={REPORTE_DICTAMENES_ID} info={item} extraData={extraData} /> : null}
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
                                    items={item.Detalles}
                                    readonly={true}
                                    listHeader={listHeaderDictamenDetalle}
                                    addRemoveButton={false}
                                    formatter={(_index: number, _item: any): any => {
                                        return <Row>
                                            {/* <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column> */}
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.Id}</span>{_item.Partida.Falla.Nombre}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.ID}</span>{_item.Partida.UbicacionFalla.Nombre}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Nombre}</Column>
                                            {/*<Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.FallaOrigen.ID}</span>{_item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>*/}
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.EstatusDictamen}</span></Column>
                                        </Row>
                                    }} />
                            </Column>
                            <Column
                                xs={{ size: 10 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 10, offset: 1 }}
                                lg={{ size: 10, offset: 1 }}
                                className="panel-detail well well-sm"
                                style={{ marginTop: "-20px" }}>
                                <KontrolFileManager title="Archivos del Diagnósticos" modulo={config.modulo} viewMode={false} multiple={true} entity={global.createSuccessfulStoreObject({ ID: item.ID })} entityType={global.createSuccessfulStoreObject(["reporte$dictamenes$", idEntidad].join(""))} />
                            </Column>
                        </Row>
                    </Row>
                }}>
                <Row>
                    <input.Text id="Descripcion" label="DESCRIPCIÓN" maxLength={255} idFormSection={REPORTE_DICTAMENES_ID} size={[12, 12, 12, 12]} />
                    {
                        //idPlaza = { entidad.IdPlaza }
                    }
                    <SPVResponsableDictamenConsultaAC idPlaza={IdPlaza} idFormSection={REPORTE_DICTAMENES_ID} size={[12, 12, 10, 10]} required={true} validations={[validations.required()]} />
                    <page.SectionList
                        id={REPORTE_DICTAMENES_DETALLES_ID}
                        parent={REPORTE_DICTAMENES_ID}
                        icon="fas fa-clipboard-list"
                        level={1}
                        style={{ marginTop: 12 }}
                        listHeader={listHeaderDictamenDetalle}
                        size={[12, 12, 12, 12]}
                        readonly={true}
                        items={createSuccessfulStoreObject([])}
                        onSave={() => {
                            let entidades: DataElement = global.createSuccessfulStoreObject([]);

                            let checkedIDs: number[] = [];
                            let checkedEstatus: number[] = [];
                            let checkedEstatusNombre: number[] = [];
                            let checkedEstatusClave: number[] = [];
                            let selectedIds: any[] = [];
                            selectedIds = EK.Store.getState().forms[REPORTE_DICTAMENES_DETALLES_ID].form

                            if (selectedIds) {
                                for (var i = 0; i < Object.keys(selectedIds).length; i++) {
                                    if (selectedIds[Object.keys(selectedIds)[i]].value === true) {
                                        let id: number = Number(Object.keys(selectedIds)[i].replace("partida_", ""));
                                        //let idEstatus: number = selectedIds[i].EstatusDictamen.value.ID
                                        checkedIDs.push(id);
                                        //checkedEstatus.push(idEstatus);
                                        if (selectedIds[Object.keys(selectedIds)[i + 1]].value.id) {
                                            checkedEstatus.push(selectedIds[Object.keys(selectedIds)[i + 1]].value.id);
                                            checkedEstatusNombre.push(selectedIds[Object.keys(selectedIds)[i + 1]].value.Nombre);
                                            checkedEstatusClave.push(selectedIds[Object.keys(selectedIds)[i + 1]].value.Clave);
                                        }
                                        else if (selectedIds[Object.keys(selectedIds)[1]].value["ID"]) {
                                            checkedEstatus.push(selectedIds[Object.keys(selectedIds)[i + 1]].value["ID"]);
                                            checkedEstatusNombre.push(selectedIds[Object.keys(selectedIds)[i + 1]].value["Nombre"]);
                                            checkedEstatusClave.push(selectedIds[Object.keys(selectedIds)[i + 1]].value["Clave"]);
                                        }
                                    };
                                };
                            };
                            if (checkedIDs.length > 0) {

                                let partidas: any[] = global.getData(this.props.config.getCatalogo(REPORTE_DICTAMENES_OPTIONS_ID), []);
                                //Validación de OT
                                // console.log(partidas);
                                // let ordenesTrabajo: any[] = global.getData(this.props.config.getCatalogo(REPORTE_ORDEN_TRABAJO_ID), []);
                                let ordenesTrabajo = global.getData(Forms.getValue(REPORTE_ORDEN_TRABAJO_ID, PAGE_ID));
                                /*let itemsOTValidacion: any[] = ordenesTrabajo.filter((value: any) => {
                                    let itemPartidaOT: any[] = value.Partidas.filter((value2: any) => {
                                        //for (var i = 0; i < checkedIDs.length; i++)
                                        //    return value2.Partida.ID === checkedIDs[i]; //*** Angel Solares Cambiar por includes
                                        return checkedIDs.includes(value2.Partida.ID);
                                    })*/
                                /*if (itemPartidaOT && itemPartidaOT.length > 0) {
                                    return true
                                };
                                return
                            });
                            if (itemsOTValidacion && itemsOTValidacion.length > 0) {
                                global.info("La incidencia no puede ser seleccionada porque ya tiene una orden de trabajo asignada");
                                return;
                            }*/
                                // console.log(ordenesTrabajo);
                                // console.log(Ordenes2);
                                for (var i = 0; i < ordenesTrabajo.length; i++) {
                                    for (var j = 0; j < ordenesTrabajo[i].Partidas.length; j++) {
                                        for (var k = 0; k < checkedIDs.length; k++) {
                                            if (ordenesTrabajo[i].Partidas[j].IdPartida == checkedIDs[k]) {
                                                global.info("La incidencia " + ordenesTrabajo[i].Partidas[j].Partida.Partida + " no puede ser seleccionada porque ya tiene una orden de trabajo asignada");
                                                return;
                                            }
                                        }
                                    }
                                }

                                //fin de la validación de las OT 
                                if (partidas && partidas.length) {
                                    let items: any[] = [];
                                    for (var i = 0; i < checkedIDs.length; i++) {
                                        items = partidas.filter((value) => { return value.IdReporteDetalle === checkedIDs[i]; });
                                        if (items && items.length > 0) {

                                            items[0].Partida.IdEstatusDictamen = checkedEstatus[i];
                                            items[0].Partida.EstatusDictamen = checkedEstatusNombre[i];
                                            entidades = entidades.insertItem(items[0]); // (items[0]);
                                            // console.log(items);
                                            //console.log(entidades);
                                        }
                                    }
                                };
                            }
                            else {
                                global.info("Seleccione el componente para asignar al Diagnóstico");
                                return;
                            };

                            Forms.updateFormElement(REPORTE_DICTAMENES_ID, REPORTE_DICTAMENES_DETALLES_ID, entidades);
                            this.props.config.setState({ viewMode: true }, REPORTE_DICTAMENES_DETALLES_ID);
                        }}
                        onAddNew={() => {
                            Forms.remove(REPORTE_DICTAMENES_DETALLES_ID);
                            let pDetalle: DataElement = Forms.getValue(REPORTE_DICTAMENES_DETALLES_ID, REPORTE_DICTAMENES_ID);
                            let items: any[] = global.getData(pDetalle, []);
                            let currentDictamen: any;
                            if (items && items.length > 0) {
                                currentDictamen = items[0].Partida.Dictamenes[0];
                                for (var i = 0; i < items.length; i++) {
                                    if (items[i].Partida.IdEstatusDictamen == 0) items[i].Partida.IdEstatusDictamen = 1101;
                                    let dictamenEstatus = { ID: items[i].Partida.IdEstatusDictamen, Nombre: items[i].Partida.EstatusDictamen };
                                    Forms.updateFormElement(REPORTE_DICTAMENES_DETALLES_ID, ["partida_", items[i].IdReporteDetalle].join(""), true);
                                    Forms.updateFormElement(REPORTE_DICTAMENES_DETALLES_ID, ["estatus_", items[i].IdReporteDetalle].join(""), dictamenEstatus);
                                }
                            };

                            //Obtener todos los dictamenes
                            let partidasFromAnotherDictamen: number[] = []
                            let elements: DataElement = Forms.getValue(REPORTE_DICTAMENES_ID, config.id);
                            let dictamenes: any[] = global.getData(elements, []);
                            for (var i = 0; i < dictamenes.length; i++) {
                                for (var j = 0; j < dictamenes[i].IdPartidas.split(",").length; j++) {
                                    if (currentDictamen && dictamenes[i].ID == currentDictamen.ID) continue;
                                    let IdPartida = dictamenes[i].IdPartidas.split(",")[j];
                                    //Forms.updateFormElement(REPORTE_DICTAMENES_DETALLES_ID, ["partida_", IdPartida].join(""), true);
                                    partidasFromAnotherDictamen.push(IdPartida);
                                }
                            }

                            let data: any[] = [];
                            let partidas: any[] = global.getData(this.props.config.getCatalogo(REPORTE_FALLAS_ID), []);
                            if (partidas && partidas.length) {
                                partidas.forEach((p: any) => {
                                    let item: any = global.assign({
                                        IdReporteDetalle: p.ID,
                                        IdReporte: p.IdReporte,
                                        Partida: p,
                                        InAnotherDictamen: (partidasFromAnotherDictamen.indexOf(p.ID.toString()) !== -1),
                                        //*** Aqui puedo buscar por ordenes de trabajo para no mostrar el checkbox
                                    });

                                    data.push(item);
                                });
                            };

                            this.props.config.setCatalogo(data, REPORTE_DICTAMENES_OPTIONS_ID);
                            this.props.config.setState({ viewMode: false }, REPORTE_DICTAMENES_DETALLES_ID);
                        }}
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.Id}</span>{item.Partida.Falla.Nombre}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.ID}</span>{item.Partida.UbicacionFalla.Nombre}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Nombre}</Column>
                                {/*<Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.FallaOrigen.ID}</span>{item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>*/}
                                <Column size={[1, 1, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.EstatusDictamen}</span></Column>
                            </Row>
                        }}>
                        <PanelUpdate info={this.props.options}>
                            <List
                                items={this.props.options}
                                readonly={true}
                                listHeader={<Column size={[12, 12, 12, 12]}>
                                    <Row>
                                        <Column size={[1, 1, 1, 1]} style={{ width: 50 }} className="list-default-header">&nbsp;</Column>
                                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
                                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo Incidencia"}</Column>
                                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Incidencia"}</Column>
                                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicacion Incidencia"}</Column>
                                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                                        <Column size={[2, 2, 2, 2]} className="list-default-header">Estatus</Column>
                                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                                    </Row>
                                </Column>}
                                formatter={(index: number, item: any) => {
                                    let bgColor: string;
                                    if (item.InAnotherDictamen) {
                                        bgColor = "#FFA07A";
                                    };
                                    return <Row style={{ backgroundColor: bgColor }}>
                                        <Column size={[1, 1, 1, 1]} style={{ marginBottom: -22, marginTop: -22,  visibility: (item.InAnotherDictamen) ? "hidden" : "visible" }}><CheckBox disabled={item.InAnotherDictamen} id={"partida_" + item.IdReporteDetalle} idFormSection={REPORTE_DICTAMENES_DETALLES_ID} label="" groupName="PartidasRadios" size={[1, 1, 1, 1]} /></Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.Id}</span>{item.Partida.Falla.Nombre}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.Id}</span>{item.Partida.UbicacionFalla.Nombre}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Nombre}</Column>
                                        {item.InAnotherDictamen === true
                                            ? <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.EstatusDictamen}</span></Column>
                                            : <ddl.EstatusDictamenesDDL style={{ marginBottom: -22, marginTop: -22 }} id={"estatus_" + item.IdReporteDetalle} idFormSection={REPORTE_DICTAMENES_DETALLES_ID} size={[2, 2, 2, 2]} />
                                        }
                                    </Row>
                                }} />
                        </PanelUpdate>
                    </page.SectionList>
                </Row>
            </page.SectionList>
            </div>
        };
    });

    interface ISPVClienteContactosProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    const EditSPVClienteContactos: any = global.connect(class extends React.Component<ISPVClienteContactosProps, {}>{
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        render(): JSX.Element {
            let displayTelefono: boolean = false;
            let displayCorreo: boolean = false;

            let tipoContacto: any = Forms.getValue("TipoContacto", REPORTE_CONTACTO_ID);
            if (tipoContacto) {
                if (tipoContacto.Clave === "TELEFONO") {
                    displayTelefono = true;
                }
                else if (tipoContacto.Clave === "CORREO") {
                    displayCorreo = true;
                }
            };

            return <div id="reporteContacto"><page.SectionList
                id={REPORTE_CONTACTO_ID}
                parent={config.id}
                level={1}
                listHeader={listHeaderContacto}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-mobile-alt"
                size={this.props.size}
                mapFormToEntity={(form: EditForm, items?: any[]): any => {
                    let retValue: any = form
                        .addID()
                        .addObject("TipoContacto")
                        .addObject("TipoTelefono")
                        .addBoolean("Titular")
                        .addString("Contacto")
                        .addString("Extension")
                        .addVersion()
                        .toObject();

                    if (retValue.TipoContacto.Clave === "CORREO") {
                        retValue.TipoTelefono = null;
                        retValue.IdTipoTelefono = null;
                        retValue.Extension = null;
                    }

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[4, 4, 4, 4]} className="listItem-default-item">
                            {item.TipoContacto.Clave === "TELEFONO" ? item.Extension ? [item.Contacto, " ext. ", item.Extension].join("") : item.Contacto : null}
                            {item.TipoContacto.Clave === "CORREO" ? item.Contacto : null}
                        </Column>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-item">
                            <span className="badge badge-info">{item.TipoContacto.Clave}</span>&nbsp;
                            {item.TipoContacto.Clave === "TELEFONO" ? <span className="badge badge-success">{item.TipoTelefono.Nombre}</span> : null}
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-center-item">{EK.UX.Labels.yes(item.Titular)}</Column>
                        <buttons.PopOver2 idParent={config.id} idForm={REPORTE_CONTACTO_ID} info={item} extraData={[buttons.PopOver2.edit]} />
                    </Row>
                }}>
                <Row>
                    <ddl.TiposContactoDDL id="TipoContacto" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 12, 12]} />
                    {displayTelefono === true ? <ddl.TiposTelefonoDLL id="TipoTelefono" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 12, 12]} /> : null}
                    {displayCorreo === true ? <input.Email id="Contacto" label="Correo" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 8, 8]} /> : null}
                    {displayTelefono === true ? <input.Telefono id="Contacto" label="Teléfono" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 8, 8]} /> : null}
                    {displayTelefono === true ? <input.Text id="Extension" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 4, 4]} /> : null}
                    <checkBox.CheckBox id="Titular" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 3, 3]} />
                </Row>
            </page.SectionList>
            </div>
        };
    });

    class ViewSPVClienteContactos extends React.Component<ISPVClienteContactosProps, {}>{
        render(): JSX.Element {
            let displayTelefono: boolean = false;
            let displayCorreo: boolean = false;

            let tipoContacto: any = Forms.getValue("TipoContacto", REPORTE_CONTACTO_ID);
            if (tipoContacto) {
                if (tipoContacto.Clave === "TELEFONO") {
                    displayTelefono = true;
                }
                else if (tipoContacto.Clave === "CORREO") {
                    displayCorreo = true;
                }
            };

            return <page.SectionList
                id={REPORTE_CONTACTO_ID}
                parent={config.id}
                level={1}
                listHeader={listHeaderContacto}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-mobile-alt"
                size={this.props.size}
                style={this.props.style}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[4, 4, 4, 4]} className="listItem-default-item">
                            {item.TipoContacto.Clave === "TELEFONO" ? item.Extension ? [item.Contacto, " ext. ", item.Extension].join("") : item.Contacto : null}
                            {item.TipoContacto.Clave === "CORREO" ? item.Contacto : null}
                        </Column>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-item">
                            <span className="badge badge-info">{item.TipoContacto.Clave}</span>&nbsp;
                            {item.TipoContacto.Clave === "TELEFONO" ? <span className="badge badge-success">{item.TipoTelefono.Nombre}</span> : null}
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-center-item">{EK.UX.Labels.yes(item.Titular)}</Column>
                        <Column size={[1, 1, 1, 1]}></Column>
                    </Row>
                }}>
            </page.SectionList>
        };
    };

    interface ISearchButtonProps extends buttons.IButtonProps {
        ubicacion?: DataElement;
    };

    class $SearchButton extends React.Component<ISearchButtonProps, {}> {
        constructor(props: ISearchButtonProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            ubicacion: state.global.entity$reporte$ubicacion
        });
        static defaultProps: ISearchButtonProps = {
            icon: "fa fa-search",
            text: "",
            color: "",
            style: null,
            className: "",
            iconOnly: true,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        render(): JSX.Element {
            let color: string = "white";
            let className: string;

            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            } else {
                className = "btn-default-ek";
            }

            if (global.isSuccessful(this.props.ubicacion)) {
                let segmento: any = global.getData(this.props.ubicacion).Segmento;
                if (segmento) {
                    return <span>
                        <Button {...this.props} keyBtn={"btnSPVBuscadorGralFamCom"} className={className} color={color} />
                        <SPVCombinacionConsulta idTipoVivienda={segmento.IdTipoVivienda} target={this.props.id} idFormSection={REPORTE_FALLAS_ID} />
                    </span>
                }
            };

            return null;
        };
    };
    const SearchButton: any = ReactRedux.connect($SearchButton.props, null)($SearchButton);

    interface IContratistasReporteDDLProps extends ddl.IDropDrownListProps {
        entidad?: DataElement;
    };

    class ContratistasReporte$DDL extends React.Component<IContratistasReporteDDLProps, {}> {
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            entidad: state.global.currentEntity,
            items: state.global.catalogo$reporte$contratistas
        });
        static defaultProps: IContratistasReporteDDLProps = {
            id: "ContratistaOT",
            items: createDefaultStoreObject([]),
            label: "Contratista",
            helpLabel: "Seleccione un Contratista",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 6, 6],
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
        componentDidMount(): void {
            let idEntidad: number = global.getDataID(this.props.entidad);
            if (idEntidad > 0) {
                let encodedFilters: string = global.encodeObject({ idReporte: idEntidad });
                global.dispatchAsync("global-page-data", "base/scv/ReporteFallasAreasComunes/GetBP/GetContratistas/" + encodedFilters, REPORTE_CONTRATISTAS_ID);
            };
        };
        render(): JSX.Element {
            return <ddl.DropdownList$Form {...this.props} />;
        };
    };
    const ContratistasReporteDDL: any = ReactRedux.connect(ContratistasReporte$DDL.props, null)(ContratistasReporte$DDL);

    export interface IReportesButtonProps extends IButtonProps, page.IProps { }

    export let ReportesButton: any = global.connect(class extends React.Component<IReportesButtonProps, {}> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IReportesButtonProps = {
            icon: "glyphicon glyphicon-list-alt",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.entidad)) {
                return <span>
                    <Button keyBtn={"btnSPVOtrosReportesFallas"} {...this.props} id="btn_cliente_reportes" />
                    <SPVReportesClienteConsultaAreasComunes target="btn_cliente_reportes" />
                </span>
            };

            return null;
        };
    });
    export let CancelarFolioButton: any = global.connect(class extends React.Component<IReportesButtonProps, {}> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IBitacoraSPVButtonProps = {
            icon: "fas fa-ban",
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
            let modalCalen: any = $("#ModalCancelarFolio");
            modalCalen.modal();
        };
        render(): JSX.Element {

            if (global.isSuccessful(this.props.entidad)) {
                if (global.getData(this.props.entidad).Cancelado === 'S' || global.getData(this.props.entidad).IdEstatusReporte === 'T') {
                    return null;
                };
                return <span>
                    <Button keyBtn={"btnSPVCancelarReporteFalla"} {...this.props} id="btn_cancelar_folio" onClick={this.onButtonClick} />
                </span>
            }
            return null;
        };
    });
    interface IReporteMessagesProps extends page.IProps {
        contratistas?: global.DataElement;
        cliente?: global.DataElement;
        visible?: boolean;
    };

    class Reporte$Messages extends React.Component<IReporteMessagesProps, {}>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.contratistas = state.global.catalogo$reporte$ubicacion$contratistas;
            retValue.cliente = Forms.getDataValue("Cliente", config.id, state);
            return retValue;
        };
        render(): JSX.Element {
            let messages: JSX.Element[] = [];

            if (!this.props.visible) {
                return null;
            };

            if (!(global.isSuccessful(this.props.cliente) && global.getDataID(this.props.cliente) > 0)) {
                return null;
            };

            if (!global.isSuccessful(this.props.contratistas)) {
                return null;
            };

            let contratistas: any[] = global.getData(this.props.contratistas, []);
            // console.log(this.props.contratistas);
            if (contratistas.length <= 0) {
                messages.push(<alerts.Alert key="not-contratistas" type={alerts.AlertTypeEnum.danger}>
                    <p style={{ fontSize: 12 }}> No se encontraron contratistas asignados para la ubicación seleccionada. </p>
                </alerts.Alert>);
            };

            return <Column size={[12, 12, 12, 12]} style={{ marginBottom: 20 }}>
                {messages}
            </Column>
        };
    };
    const ReporteMessages: any = ReactRedux.connect(Reporte$Messages.props, null)(Reporte$Messages);

    interface IOrdenesTrabajo extends page.IProps, grid.IColumn {
        agenda?: DataElement;
        agendaDetalle?: DataElement;
        calcularPartidas?: (idReporte: number, idContratista: number, orden: any, ordenes: any[]) => void;
        contratista?: DataElement;
        currentOrden?: DataElement;
        getOrdenesTrabajo?: (idReporte: number) => void;
        ordenesCita?: DataElement;
        partidasBP?: DataElement;
        viewMode?: boolean;
    };
    //
    const EditOrdenesTrabajo: any = global.connect(class extends React.Component<IOrdenesTrabajo, {}>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.partidasBP = state.global[["catalogo", REPORTE_ORDEN_TRABAJO_CALCULO_PARTIDAS_ID].join("$")];
            retValue.contratista = Forms.getDataValue("ContratistaOT", REPORTE_ORDEN_TRABAJO_ID, state);
            retValue.tipoAgenda = state.global.TipoAgenda;
            retValue.ordenesCita = state.global[["catalogo", REPORTE_APPOINTMENT_ORDENES_TRABAJO_ID].join("$")];
            retValue.agenda = state.global.catalogo$AgendaNew;
            retValue.agendaDetalle = state.global.ACTDETALLEAGENDA;
            retValue.currentOrden = state.global[["entity", REPORTE_ORDEN_TRABAJO_ID].join("$")];
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            calcularPartidas: (idReporte: number, idContratista: number, orden: any, ordenes: any[]): void => {
                let data: any = global.assign({ idReporte, idContratista, orden, ordenes });
                global.dispatchAsyncPost("global-page-data", "ReporteFallasAreasComunes/calcularPartidasOT/", data, REPORTE_ORDEN_TRABAJO_CALCULO_PARTIDAS_ID);
            },
            getOrdenesTrabajo: (idReporte: number): void => {
                let encodedParams: string = global.encodeParameters({ idReporte });
                global.dispatchAsync("global-page-data", "base/scv/ReporteFallasAreasComunes/Get/GetOrdenesTrabajo/" + encodedParams, REPORTE_ORDEN_TRABAJO_ID);
            }
        });
        componentWillReceiveProps(nextProps: IOrdenesTrabajo): any {
            if (global.hasChanged(this.props.ordenesCita, nextProps.ordenesCita)) {
                if (global.isSuccessful(nextProps.ordenesCita)) {
                    let data: any = global.getData(nextProps.ordenesCita, []);
                    Forms.updateFormElement("CapturaInfo", "ContratistaOTAgendaEdit", data);
                };
            };

            if (hasChanged(nextProps.agendaDetalle, this.props.agendaDetalle)) {
                if (global.isSuccessful(nextProps.agendaDetalle)) {
                    let item: any = getData(nextProps.agendaDetalle);
                    if (item.Estado === 5) {
                        this.props.getOrdenesTrabajo(global.getDataID(this.props.entidad));
                    };
                };
            };

            //if (hasChanged(nextProps.contratista, this.props.contratista)) {
            //    if (global.isSuccessful(nextProps.contratista)) {
            //        alert("Cambio de contratista")
            //        //Forms.remove(REPORTE_ORDEN_TRABAJO_ID);
            //        //Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "EstatusOrdenTrabajo", { Clave: "N", Nombre: "NUEVO" });
            //        global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
            //        //let item: any = getData(nextProps.agendaDetalle);
            //        //if (item.Estado === 5) {
            //        //    this.props.getOrdenesTrabajo(global.getDataID(this.props.entidad));
            //        //};
            //    };
            //};

        };
        componentDidUpdate(prevProps: IOrdenesTrabajo, { }): any {
            if (global.isSuccessful(this.props.agenda)) {
                if (global.wasUpdated(prevProps.agenda, this.props.agenda, false)) {
                    this.props.getOrdenesTrabajo(global.getDataID(this.props.entidad));
                }
            };
        };
        onSave(workMode: boolean): void {
            //Actualiza el estado del grid de fallas.
            let ReceptorPOt: DataElement = Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID);
            let partidasFallasOt: any[] = global.getData(ReceptorPOt, []);
            var PartidasFallas = global.getData(Forms.getValue(REPORTE_FALLAS_ID, config.id));
            var Contratista = Forms.getValue("Contratista", REPORTE_ORDEN_TRABAJO_ID);

            partidasFallasOt.forEach(function (Ot) {
                for (var i = 0; i < PartidasFallas.length; i++) {
                    var OTAsignacion = Ot;
                    if (Ot.Partida.Partida == PartidasFallas[i].Partida) {
                        PartidasFallas[i].TipoFalla = OTAsignacion.Partida.TipoFalla;
                        PartidasFallas[i].Falla = OTAsignacion.Partida.Falla;
                        PartidasFallas[i].UbicacionFalla = OTAsignacion.Partida.UbicacionFalla;
                        PartidasFallas[i].Causafalla = OTAsignacion.Partida.CausaFalla;

                        PartidasFallas[i].IdContratista = Contratista.ID;
                        PartidasFallas[i].Contratista = Contratista;
                        PartidasFallas[i]._modificado = true;
                    }
                }
            });

            Forms.updateFormElement(config.id, REPORTE_FALLAS_ID, PartidasFallas);
            global.dispatchSuccessful("global-page-data", PartidasFallas, REPORTE_FALLAS_ID);

            let entidades: DataElement = this.props.config.getCatalogo(REPORTE_ORDEN_TRABAJO_ID);
            //
            if (config.id) {
                entidades = Forms.getValue(REPORTE_ORDEN_TRABAJO_ID, config.id);
            };
            //
            if (!entidades) {
                entidades = global.createSuccessfulStoreObject([]);
            };
            //
            if (!Forms.isValid(REPORTE_ORDEN_TRABAJO_ID)) {
                global.warning("Los datos están incompletos, verificar campos requeridos y validaciones.");
                return;
            };
            //
            let item: EditForm = Forms.getForm(REPORTE_ORDEN_TRABAJO_ID);
            let entidad: any = item
                .addID()
                .addObject("Contratista")
                .addString("Observaciones")
                .addObject("EstatusOrdenTrabajo")
                .addDateObject("FechaInicioReal")
                .addDateObject("FechaFinReal")
                .addBoolean("CerrarRegistro")
                .addObject("Partidas", REPORTE_ORDEN_TRABAJO_PARTIDAS_ID)
                .addVersion()
                .toObject();

            if (entidad.Observaciones === undefined || entidad.Observaciones === null || entidad.Observaciones.trim() === '') {
                entidad.Observaciones = "Sin observaciones";
            }

            if (workMode === true) {
                if (item['ObservacionesFinal'] !== undefined && item['ObservacionesFinal'] !== null) {
                    entidad.Observaciones += "♪" + item['ObservacionesFinal'];
                } else {
                    entidad.Observaciones += "♪Sin observaciones";
                }
                if (entidad.FechaInicioReal === undefined || entidad.FechaInicioReal === null) {
                    global.warning("Por favor indique la fecha de inicio del trabajo.");
                    return;
                };

                if (entidad.CerrarRegistro === true) {
                    if (entidad.FechaFinReal === undefined || entidad.FechaFinReal === null) {
                        global.warning("Para cerrar la orden de trabajo es necesario capturar la fecha fin del trabajo.");
                        return;
                    };
                };

                if (!global.compareDates(entidad.FechaFinReal, entidad.FechaInicioReal, ">=")) {
                    global.warning("La fecha final del trabajo no puede ser menor a la fecha inicial del trabajo.");
                    return;
                };
            } else {
                ////VALIDAR QUE LAS PARTIDAS SEAN SOLO DE UN MISMO CONTRATISTA
                //let contratistaSeleccionado: any = getData(this.props.contratista).ID; 
                //let partidasTrabajocontratista: any[] = global.getData(Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID), []);
                //let itemsPartidasValidacionContratista: any[] = partidasTrabajocontratista.filter((value) => {
                //    return value.Partida.Contratista.ID != contratistaSeleccionado;
                //});
                //if (itemsPartidasValidacionContratista && itemsPartidasValidacionContratista.length > 0) {
                //    global.info("La orden de trabajo no puede almacenarse porque tiene partidas de distintos contratistas");
                //    return;
                //}
                ////FIN VALIDACION  PARTIDAS DE UN MISMO CONTRATISTA
            }
            //
            if (entidad && entidad.Partidas) {
                let validation: DataElement = global.createSuccessfulStoreObject(entidad.Partidas).getActiveItems();
                let partidas: any[] = global.getData(validation, []);
                if (!(partidas && partidas.length > 0)) {
                    global.warning("La orden de trabajo no tiene partidas asignadas. Por favor verifique la información.");
                    return;
                };
            };
            //
            if (entidad && entidad._found === true) {
                entidad._found = undefined;
            }
            else {
                if (!(entidad.ID > 0)) {
                    if (!(entidad && entidad.ID)) {
                        entidad.ID = entidades.getNextLowerID();
                    }
                };
            };
            //
            let retValue: DataElement = entidades.upsertItem(entidad);
            //
            Forms.updateFormElement(config.id, REPORTE_ORDEN_TRABAJO_ID, retValue);
            //
            this.props.config.setState({ viewMode: true }, REPORTE_ORDEN_TRABAJO_ID);
        };
        onPlanificacion(item: any): void {
            let tipoAgenda: any;
            let glTipoAgenda: DataElement = global.getStateItem("global.TipoAgenda") as DataElement;
            if (glTipoAgenda) {
                if (global.isSuccessful(glTipoAgenda)) {
                    let tiposAgenda: any[] = global.getData(glTipoAgenda, []);
                    if (tiposAgenda && tiposAgenda.length > 0) {
                        let items: any[] = tiposAgenda.filter((value) => { return value.Clave === "ContratistaAreasComunes" }) as any[];
                        tipoAgenda = !(items && items.length > 0) ? null : items[0];
                    };
                };
            };
            //
            if (tipoAgenda) {
                if (!(item.AgendaDetalle && item.AgendaDetalle.ID)) {
                    let fechaActual: Date = new Date();
                    let fechaPropuesta: Date;
                    fechaActual = global.FechaPropuesta(fechaActual, 1);
                    fechaPropuesta = global.FechaPropuesta(fechaActual, 1);

                    Forms.reset("AgendaNew");
                    Forms.updateFormElement("AgendaNew", "FechaInicio", fechaActual);
                    Forms.updateFormElement("AgendaNew", "TipoAgenda", tipoAgenda);

                    global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: tipoAgenda.Clave });
                    global.dispatchDefault("load::AgendaNewCalendasUser", null);
                    global.dispatchSuccessful("global-page-data", [], "AgendaPostVentaResult");
                    global.dispatchSuccessful("load::ACTDETALLEAGENDA", null);

                    let encodedParams: string = global.encodeParameters({ id: item.ID });
                    global.dispatchAsync("global-page-data", "base/scv/Contratistas/Get/GetOrdenesTrabajoAreasComunes/" + encodedParams, REPORTE_APPOINTMENT_ORDENES_TRABAJO_ID);

                    let modalCalendar: any = $("#modalCalen");
                    modalCalendar.modal();
                    modalCalendar.css("height", "auto");
                } else {
                    Forms.updateFormElement("CapturaInfo", "DetalleCteAgendaEdit", null);
                    Forms.updateFormElement("CapturaInfo", "ContratistaOTAgendaEdit", null);

                    let idAgenda: any = item.Agenda.ID;
                    let idAgendaDetalle: any = item.AgendaDetalle.ID;
                    let claveTipoAgenda: any = tipoAgenda.Clave;
                    let p: any = global.assign({
                        IdAgenda: idAgenda,
                        ClaveTipoAgenda: claveTipoAgenda,
                        IdAgendaDetalle: idAgendaDetalle
                    });

                    global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: claveTipoAgenda });
                    global.dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p }, "AgendaDetallesCitaResult");
                    config.setState({ action: "REPROGRAMACION" }, "AgendaContratistaAreasComunes");

                    let modalAgenda: any = $("#modalAgendaInformacionCita");
                    modalAgenda.modal();
                    modalAgenda.css("height", "auto");
                };
            };
        };
        componentDidMount(): void {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            if (state && state.action) {
                if (state.action.name === "onAddNewOT") {
                    Forms.remove(REPORTE_ORDEN_TRABAJO_ID);
                    //let contratista: any[] = EK.Store.getState().forms.ReporteFallasAreasComunes.form.Contratista.value;
                    //Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "Contratista", contratista);
                    Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "EstatusOrdenTrabajo", { Clave: "N", Nombre: "NUEVO" });
                    global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                    this.props.config.setState({ viewMode: false, idOrden: 0, workMode: false }, REPORTE_ORDEN_TRABAJO_ID);
                    this.props.config.setState({ action: null });
                } else if (state.action.name === "onPlanificacion") {
                    this.onPlanificacion(state.action.data)
                    this.props.config.setState({ action: null });
                };
            }
        };
        render(): JSX.Element {
            let idReporte: number = global.getDataID(this.props.entidad);
            let idContratista: number = global.getDataID(this.props.contratista);
            let workMode: boolean = global.getData(this.props.config.getState(REPORTE_ORDEN_TRABAJO_ID)).workMode;
            let idOrden: number = global.getData(this.props.config.getState(REPORTE_ORDEN_TRABAJO_ID)).idOrden;

            let idPlaza: string = undefined;
            let ubicacion: any = undefined;
            idPlaza = global.getData(this.props.config.getEntity(ubicacion)).IdPlaza;
            let ObtenerP: DataElement = Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID);
            let partidas: any[] = global.getData(ObtenerP, []);
            let NumeroP: number = partidas.length
            let ComboDDL: boolean = false;
            if (NumeroP > 0) {
                ComboDDL = true;
            }

            //let partida: any = Forms.getValues(REPORTE_FALLAS_ID);
            //let partidasfOM: any = Forms.getValues(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID);
            //const REPORTE_ORDEN_TRABAJO_ID: string = "reporte$ordenTrabajo";
            //const REPORTE_ORDEN_TRABAJO_PARTIDAS_ID: string = "reporte$ordenTrabajo$partidas";
            //let EntidadPartida: any = Forms.getForm(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
            //let EntidadPartida: any = global.getData(this.props.config.getState(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID)).entidad.Partidas;



            if (idOrden === null || idOrden === undefined) {
                idOrden = 0;
            };
            //
            let items: DataElement;
            if (this.props.partidasBP && global.isSuccessful(this.props.partidasBP)) {
                items = this.props.partidasBP.getUpdatedStateItems();
                items = items.getActiveItems();
            };
            //
            let edit: any = {
                icon: "icon-pencil",
                titulo: "Editar Incidencia",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    global.dispatchSuccessful("global-page-data", item.Partidas, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                    Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "ContratistaOT", item.Contratista)
                    this.props.config.setEntity(item, id);
                    this.props.config.setState({ viewMode: false, idOrden: item.ID, workMode: false }, id);
                }
            };
            //
            let workOT: any = {
                icon: "fas fa-briefcase",
                titulo: "Trabajar OT",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {

                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    global.dispatchSuccessful("global-page-data", item.Partidas, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                    this.props.config.setEntity(item, id);
                    this.props.config.setState({ viewMode: false, idOrden: null, workMode: true }, id);
                }
            };
            //
            let appointment: any = {
                icon: "fa fa-calendar",
                titulo: "Planificar OT",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (item && item.ID > 0) {
                        this.onPlanificacion(item);
                    } else {
                        global.info("Para planificar la orden de trabajo es necesario que primero guarde la información capturada.");
                    }
                }
            };

            let newAppointment: any = {
                icon: "fa fa-calendar-check",
                titulo: "Replanificar OT",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (item && item.ID > 0) {
                        let EditItem = JSON.parse(JSON.stringify(item));
                        EditItem.AgendaDetalle.ID = null;
                        this.onPlanificacion(EditItem);
                    } else {
                        global.info("Para planificar la orden de trabajo es necesario que primero guarde la información capturada.");
                    }
                }
            };
            //
            let editFalla: any = {
                icon: "icon-pencil",
                titulo: "Editar Incidencia",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    //
                    let partida: any = global.assign({}, item.Partida);
                    if (partida) {
                        if (partida.TipoFalla) {
                            Forms.updateFormElement(id, "TipoFalla", partida.TipoFalla);
                        }
                        if (partida.Falla) {
                            let p: any = global.assign({
                                idTipoFalla: partida.TipoFalla.ID
                            })
                            global.dispatchAsyncPost("load::reporte$fallasAreaComun", "base/scv/ReporteFallasAreasComunes/GetBP/GetFallaAreaComun/", { parametros: p });

                            Forms.updateFormElement(id, "Falla", partida.Falla);
                        }
                        if (partida.UbicacionFalla) {
                            Forms.updateFormElement(id, "UbicacionFalla", partida.UbicacionFalla);
                        }
                        if (partida.CausaFalla) {
                            Forms.updateFormElement(id, "CausaFalla", partida.CausaFalla);
                        };
                    };
                    //
                    this.props.config.setState({ viewMode: false }, id);
                }
            };
            //
            let remove: any = {
                icon: "fa fa-trash",
                titulo: "Eliminar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (!(item.AgendaDetalle && item.AgendaDetalle.ID)) {
                        let element: DataElement = Forms.getValue(id, idParent);
                        Forms.updateFormElement(idParent, id, element.removeItem(item));
                    } else {
                        global.info("No se puede eliminar la orden de trabajo porque está en proceso de atención.");
                    }
                }
            };
            //
            let labelContratista: any = (item: any) => {
                return !(item && item.Descripcion) ? "" : "<span class='badge badge-success bold'>" + item.ID + "</span> " + item.Descripcion
            };
            let estilo = !workMode ? { position: 'fixed', left: 0, top: '35%', zIndex: 9999 } : null;
            return <div id="reporteFallasOT">
                <AgendaModal.NewCalendarModalBase forma="Individual" />
                <page.SectionList
                    id={REPORTE_ORDEN_TRABAJO_ID}
                    parent={config.id}
                    icon="fa fa-briefcase"
                    level={1}
                    listHeader={listHeaderOrdenTrabajo}
                    size={this.props.size}
                    readonly={true}
                    hideNewButton={this.props.viewMode === true}
                    items={createSuccessfulStoreObject([])}
                    onSave={() => {
                        if (workMode === true) {
                            //VALIDACION DE PARTIDAS DIN - DIANGNOSTICO INICIAL
                            //let partidasTrabajo: any[] = global.getData(Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID), []);
                            //let itemsPartidasValidacion: any[] = partidasTrabajo.filter((value) => {
                            //    return value.Partida.CausaFalla.FallaOrigen.Abreviatura === "DIN";
                            //});
                            //if (itemsPartidasValidacion && itemsPartidasValidacion.length > 0) {
                            //    global.info("La orden de trabajo no puede almacenarse porque tiene partidas con DIAGNOSTICO INCIAL");
                            //    return;
                            //}
                            //FIN DE LA Validación DE PARTIDAS DIN - DIANGNOSTICO INICIAL
                            let cerrarRegistro: boolean = Forms.getValue("CerrarRegistro", REPORTE_ORDEN_TRABAJO_ID);
                            if (cerrarRegistro === true) {
                                EK.Global.confirm("Presione Confirmar para cerrar la orden de trabajo", "Reporte de Fallas", (isConfirm: any) => {
                                    if (isConfirm === true) {
                                        this.onSave(true);
                                    };
                                });
                            } else {
                                this.onSave(true);
                            };
                        } else {
                            this.onSave(false);
                        };
                    }}
                    onAddNew={() => {
                        Forms.remove(REPORTE_ORDEN_TRABAJO_ID);
                        Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "EstatusOrdenTrabajo", { Clave: "N", Nombre: "NUEVO" });
                        global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                        this.props.config.setState({ viewMode: false, idOrden: 0, workMode: false }, REPORTE_ORDEN_TRABAJO_ID);
                    }}
                    formatter={(index: number, item: any) => {
                        let partidas: global.DataElement = global.createSuccessfulStoreObject(item.Partidas).getActiveItems();
                        let extraData: any[] = [];
                        if (!this.props.viewMode) {
                            if (item.EstatusOrdenTrabajo.Clave === "N") {
                                extraData.push(edit);
                                extraData.push(appointment);
                                if (item.IdAgenda !== null) {
                                    extraData.push(newAppointment);
                                }
                                extraData.push(remove);
                                extraData.push(printOT);

                            } else if (item.EstatusOrdenTrabajo.Clave === "E") {
                                extraData.push(edit);
                                extraData.push(appointment);
                                extraData.push(workOT);
                                extraData.push(printOT);
                            } else if (item.EstatusOrdenTrabajo.Clave === "T") {
                                extraData.push(printOT);
                            }
                        };
                        return <Row id={"row_orden_trabajo_" + item.ID} className="panel-collapsed" style={{ margin: 0 }} >
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
                                    {extraData.length > 0 ? <buttons.PopOver2 idParent={config.id} idForm={REPORTE_ORDEN_TRABAJO_ID} info={item} extraData={extraData} /> : null}
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
                                        items={partidas}
                                        readonly={true}
                                        listHeader={listHeaderOrdenTrabajoPartidas}
                                        addRemoveButton={false}
                                        formatter={(_index: number, _item: any): any => {
                                            return <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.Id}</span>{_item.Partida.Falla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.Id}</span>{_item.Partida.UbicacionFalla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Nombre}</Column>
                                            </Row>
                                        }} />
                                </Column>
                            </Row>
                        </Row>
                    }}>
                    {workMode === true ?
                        <Row>
                            <label.Entidad id="Contratista" value={labelContratista} idForm={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 10, 10]} />
                            <checkBox.CheckBox id="CerrarRegistro" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 2, 2]} />
                            <label.Fecha id="FechaInicio" idForm={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} />
                            <label.Fecha id="FechaFin" idForm={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} />
                            <DatePicker id="FechaInicioReal" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]}/>
                            <DatePicker id="FechaFinReal" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]}/>
                            <input.Text id="Observaciones" visible={false} idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 12, 12]} />
                            <input.Text id="ObservacionesFinal" label="Observacion final" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 12, 12]} />
                            <page.SectionList
                                id={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID}
                                parent={REPORTE_ORDEN_TRABAJO_ID}
                                icon="fas fa-clipboard-list"
                                level={1}
                                style={{ marginTop: 12 }}
                                listHeader={listHeaderOrdenTrabajoPartidas}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                hideNewButton={true}
                                items={createSuccessfulStoreObject([])}
                                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                    let model: any = form
                                        .addID()
                                        .addObject("CausaFalla")
                                        .addObject("TipoFalla")
                                        .addObject("Falla")
                                        .addObject("UbicacionFalla")
                                        .addVersion()
                                        .toObject();

                                    let retValue: any = undefined;
                                    let e: any[] = entidades;
                                    if (e && e.length > 0) {
                                        e.forEach((value: any, index: number): any => {
                                            if (value.ID === model.ID) {
                                                retValue = global.assign(value);
                                                retValue.Partida = global.assign(retValue.Partida, {
                                                    IdCausaFalla: model.IdCausaFalla,
                                                    CausaFalla: model.CausaFalla,
                                                    TipoFalla: model.TipoFalla,
                                                    Falla: model.Falla,
                                                    UbicacionFalla: model.UbicacionFalla
                                                });
                                                retValue.Version = model.Version;
                                                retValue._found = true;
                                            };
                                        });
                                    };

                                    return retValue;
                                }}
                                formatter={(index: number, item: any) => {
                                    return <Row>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.Id}</span>{item.Partida.Falla.Nombre}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.Id}</span>{item.Partida.UbicacionFalla.Nombre}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Nombre}</Column>
                                        {/*<Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.FallaOrigen.ID}</span>{item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>*/}
                                        <buttons.PopOver2 idParent={REPORTE_ORDEN_TRABAJO_ID} idForm={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} info={item} extraData={[editFalla]} />
                                    </Row>
                                }}>
                                <Row>
                                    <TipoFallasAreaComunDDL id={"TipoFalla"} size={[12, 12, 3, 3]} label={"Tipo Incidencia"} idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} /> 
                                    {/*<SPVTiposComponentesConsulta id="TipoFalla" idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} usoFalla={"Ubicacion"} size={[12, 12, 3, 3]} />*/}
                                    <FallaAreaComunDDL id="Falla" label={"Incidencia Area Comun"} size={[12, 12, 3, 3]} required={false} idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} /> 
                                    {/*<SPVComponentesConsulta id="Falla" idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 3, 3]} />*/}
                                    <UbicacionFallaDDL id={"UbicacionFalla"} size={[12, 12, 3, 3]} label={"Ubicacion Incidencia"} idFormSection={REPORTE_FALLAS_ID} /> 
                                    {/*<ddl.SPVUbicacionesFallasDDL id="UbicacionFalla" idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 3, 3]} />*/}
                                    {/*<SPVCausasFallasConsulta idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 3, 3]} />*/}
                                    <CausaFallaDDL id={"CausaFalla"} size={[12, 12, 3, 3]} label={"Causa Incidencia"} idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} /> 
                                    {/*<SPVFallasOrigenConsulta id="CausaFalla" idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 3, 3]} />*/}
                                </Row>
                            </page.SectionList>
                        </Row> :
                        <Row>
                            <ContratistasReporteDDL idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[10, 10, 10, 10]} />
                            <SPVContratistasConsultaAreasComunes visible={ComboDDL} idFormSection={REPORTE_ORDEN_TRABAJO_ID} idPlaza={idPlaza} size={[12, 12, 6, 6]} />
                            <label.Entidad id="EstatusOrdenTrabajo" idForm={REPORTE_ORDEN_TRABAJO_ID} size={[2, 2, 2, 2]} />
                            <input.Text id="Observaciones" label="Observacion inicial" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 12, 12]} />

                            <page.SectionList
                                id={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID}
                                parent={REPORTE_ORDEN_TRABAJO_ID}
                                icon="fas fa-clipboard-list"
                                level={1}
                                style={{ marginTop: 12 }}
                                listHeader={listHeaderOrdenTrabajoPartidas}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                items={createSuccessfulStoreObject([])}
                                onAddNew={() => {
                                    Forms.remove(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                    let partidasOT: DataElement = Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID);
                                    if (!partidasOT) {
                                        partidasOT = global.createSuccessfulStoreObject([]);
                                    };
                                    let ordenesTrabajo: DataElement = Forms.getValue(REPORTE_ORDEN_TRABAJO_ID, config.id);
                                    if (!ordenesTrabajo) {
                                        ordenesTrabajo = global.createSuccessfulStoreObject([]);
                                    };
                                    let orden: any = global.assign({ ID: idOrden, Partidas: global.getData(partidasOT, []) });
                                    this.props.calcularPartidas(idReporte, idContratista, orden, global.getData(ordenesTrabajo));
                                    this.props.config.setState({ viewMode: false }, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                }}
                                onSave={() => {
                                    let partidasBP: any[] = global.getData(this.props.partidasBP, []);
                                    let entidades: DataElement = global.createSuccessfulStoreObject([]);

                                    let checkedIDs: number[] = [];
                                    let form: EditForm = Forms.getForm(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                    if (form.formData && form.formData.form) {
                                        for (var prop in form.formData.form) {
                                            let element: any = form.formData.form[prop];
                                            if (element && element.value === true) {
                                                let id: number = Number(prop.replace("partida_", ""));
                                                if (ReporteUtils.fnHasDictamenNotAccepted(id)) {
                                                    global.info("La incidencia no se puede seleccionar porque tiene un diagnostico relacionado que aun no ha sido aceptado.");
                                                } else {
                                                    checkedIDs.push(id);
                                                }

                                            };
                                        };
                                    };

                                    if (partidasBP && partidasBP.length) {
                                        partidasBP.forEach((value: any, index: number) => {
                                            let checked: any[] = checkedIDs.filter((id) => { return value.IdPartida === id; });
                                            if (checked && checked.length) {
                                                if (!(value.ID > 0)) {
                                                    if (!(value && value.ID)) {
                                                        value.ID = entidades.getNextLowerID();
                                                    }
                                                }
                                                entidades = entidades.upsertItem(value);
                                            } else {
                                                entidades = entidades.removeItem(value);
                                            }
                                        });
                                    };
                                    Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "Contratista", getData(this.props.contratista));
                                    Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, entidades);

                                    //Forms.updateFormElement(config.id, REPORTE_FALLAS_ID, entidades);

                                    this.props.config.setState({ viewMode: true }, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                    //this.props.config.setState({ viewMode: true }, REPORTE_FALLAS_ID);
                                }}
                                formatter={(index: number, item: any) => {
                                    return <Row>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.Id}</span>{item.Partida.Falla.Nombre}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.Id}</span>{item.Partida.UbicacionFalla.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Nombre}</Column>
                                        {/*<Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.FallaOrigen.ID}</span>{item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>*/}
                                    </Row>
                                }}>
                                <PanelUpdate info={this.props.partidasBP}>
                                    <List
                                        items={items}
                                        readonly={true}
                                        listHeader={<Column size={[12, 12, 12, 12]}>
                                            <Row>
                                                <Column size={[1, 1, 1, 1]} style={{ width: 50 }} className="list-default-header">&nbsp;</Column>
                                                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
                                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo Incidencia"}</Column>
                                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                                                <Column size={[2, 2, 4, 4]} className="list-default-header">{"Causa Incidencia"}</Column>
                                            </Row>
                                        </Column>}
                                        formatter={(index: number, item: any) => {
                                            return <Row>
                                                <Column size={[1, 1, 1, 1]} style={{ marginBottom: -22, marginTop: -22}}><checkBox.CheckBox id={"partida_" + item.IdPartida} size={[1, 1, 1, 1]} value={item.ID ? true : false} initialValue={undefined} idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID}/></Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.Id}</span>{item.Partida.Falla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.Id}</span>{item.Partida.UbicacionFalla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Nombre}</Column>
                                                {/*<Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.FallaOrigen.ID}</span>{item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>*/}
                                            </Row>
                                        }} />
                                </PanelUpdate>
                            </page.SectionList>
                        </Row>
                    }
                </page.SectionList>
            </div>
        };
    });

    //=======================================================================
    // UBICACION
    //=======================================================================
    interface IUbicacionClienteProps extends React.Props<any> {
        lote: any;
    };
    interface IUbicacionColaboradorAnonimo extends React.Props<any> {
        plaza?: any;
        plaza2?: any;
    };
    class ViewUbicacionCliente extends React.Component<IUbicacionClienteProps, {}>{

        render(): JSX.Element {
            let lote: any = this.props.lote;
            let plazaValue: any = (item: any) => {
                return !item ? "" : !item.Nombre ? "" : item.Nombre;
            };
            let UrlAplicacion: any = window.location;
            let isIntraUrbana: boolean = UrlAplicacion.pathname.includes("intra")

            return <page.OptionSection
                id={REPORTE_UBICACION_ID}
                parent={config.id}
                title="UBICACIÓN"
                subTitle={<span style={{ marginLeft: 5 }}>
                    <span
                        className="badge badge-info bold">
                        {lote.ClaveFormato}
                    </span>
                </span>
                }
                level={1}
                icon="fa fa-home"
                collapsed={false}
                hideCollapseButton={false}>
                <Row>
                    <label.Entidad
                        id="Plaza"
                        idForm={REPORTE_UBICACION_ID}
                        value={plazaValue}
                        label={"Plaza"}
                        size={[12, 12, 12, 12]} />
                    <label.Entidad id="Desarrollo" idForm={REPORTE_UBICACION_ID} label={"FRACCIONAMIENTO"} size={[12, 12, 12, 12]} value={() => {
                        return !lote || !lote.Desarrollo ? "" : (!lote.DesarrolloClave ? "" : "<span class='badge badge-info'>" + lote.DesarrolloClave + "</span> ") + (!lote.Desarrollo.Nombre ? "" : lote.Desarrollo.Nombre);
                    }} />
                    {isIntraUrbana ? <input.Text id={"UbicacionNombre"} label={"Ubicación"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />: null}

                    {!isIntraUrbana ?
                        <div>
                            <input.Text id={"CalleA"} label={"CALLE A"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                            <input.Text id={"CalleB"} label={"CALLE B"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    </div> : null
                        }
                </Row>

            </page.OptionSection>
        }
    };
    class ViewUbicacionColaborador extends React.Component<IUbicacionColaboradorAnonimo, {}>{
        render(): JSX.Element {
            let entidad = global.getData(EK.Store.getState().global.currentEntity);
            //let plazaValue: any = (item: any) => {
            //    return !item ? "" : !item.Nombre ? "" : item.Nombre;
            //};
            console.log(entidad)
            let UrlAplicacion: any = window.location;
            let isIntraUrbana: boolean = UrlAplicacion.pathname.includes("intra")
            return <page.OptionSection
                id={REPORTE_UBICACION_ID}
                parent={config.id}
                title="UBICACIÓN"
                subTitle={<span style={{ marginLeft: 5 }}>
                    <span className="badge badge-info bold"></span>
                </span>}
                level={1}
                icon="fa fa-home" collapsed={false} hideCollapseButton={false}>
                <Row>
                    {
                        entidad.ID < 0 ?
                            <PlazasDDL3 id={"Plaza"} size={[12, 12, 12, 12]} label={"PLAZA"} idForm={PAGE_ID} /> :
                            <label.Entidad
                                id="Plaza"
                                idForm={REPORTE_UBICACION_ID}
                                value={entidad.PlazaView}
                                label={"Plaza"}
                                size={[12, 12, 12, 12]} />
                    }
                    {
                        isEmty(entidad) || entidad.ID < 0 ?
                            <FraccionamientosColaboradorDDL id={"Fraccionamiento"} size={[12, 12, 12, 12]} idFormSection={PAGE_ID} validations={[validations.required()]} /> :
                            <label.Entidad
                                id="Fraccionamiento"
                                idForm={REPORTE_UBICACION_ID}
                                value={entidad.Desarrollo.Nombre}
                                label={"Fraccionamiento"}
                                size={[12, 12, 12, 12]} />
                    }
                    {/*<input.Text id={"Ubicacion"} label={"Ubicación"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />

                    <input.Text id={"CalleA"} label={"CALLE A"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    <input.Text id={"CalleB"} label={"CALLE B"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />*/}
                    {isIntraUrbana ? <input.Text id={"UbicacionNombre"} label={"Ubicación"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} /> : null}

                    {!isIntraUrbana ?
                        <div>
                            <input.Text id={"CalleA"} label={"CALLE A"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                            <input.Text id={"CalleB"} label={"CALLE B"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                        </div> : null
                    }
                </Row>
            </page.OptionSection>
        };
    };
    class ViewUbicacionAnonimo extends React.Component<IUbicacionColaboradorAnonimo, {}>{
        render(): JSX.Element {
            let entidad = global.getData(EK.Store.getState().global.currentEntity);
            let plazaValue: any = (item: any) => {
                return !item ? "" : !item.Nombre ? "" : item.Nombre;
            };
            let UrlAplicacion: any = window.location;
            let isIntraUrbana: boolean = UrlAplicacion.pathname.includes("intra")
            return <page.OptionSection
                id={REPORTE_UBICACION_ID}
                parent={config.id}
                title="UBICACIÓN"
                subTitle={<span style={{ marginLeft: 5 }}>
                    <span className="badge badge-info bold"></span>
                </span>}
                level={1}
                icon="fa fa-home" collapsed={false} hideCollapseButton={false}>
                <Row>
                    {
                        entidad.ID < 0 ?
                        <PlazasDDL2 id={"Plaza"} size={[12, 12, 12, 12]} label={"PLAZA"} idForm={PAGE_ID} /> :
                        <label.Entidad id="Plaza" idForm={REPORTE_UBICACION_ID} value={entidad.PlazaView} label={"Plaza"} size={[12, 12, 12, 12]} />
                    }
                    {
                        isEmty(entidad) || entidad.ID < 0 ?
                            <FraccionamientosAnonimoDDL id={"Fraccionamiento"} size={[12, 12, 12, 12]} idFormSection={PAGE_ID} validations={[validations.required()]} />:
                            <label.Entidad id="Fraccionamiento" idForm={REPORTE_UBICACION_ID} value={entidad.Desarrollo.Nombre} label={"Plaza"} size={[12, 12, 12, 12]} />
                    }
                    {/*<input.Text id={"Ubicacion"} label={"Ubicación"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />

                    <input.Text id={"CalleA"} label={"CALLE A"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    <input.Text id={"CalleB"} label={"CALLE B"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />*/}
                    {isIntraUrbana ? <input.Text id={"UbicacionNombre"} label={"Ubicación"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} /> : null}

                    {!isIntraUrbana ?
                        <div>
                            <input.Text id={"CalleA"} label={"CALLE A"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                            <input.Text id={"CalleB"} label={"CALLE B"} idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                        </div> : null
                    }
                </Row>
            </page.OptionSection>
        };
    };
    //=======================================================================
    // END UBICACION
    //=======================================================================

    export interface IPrereportesButtonProps extends IButtonProps, page.IProps { }

    export let PrereportesButton: any = global.connect(class extends React.Component<IPrereportesButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static defaultProps: IPrereportesButtonProps = {
            icon: "fas fa-mobile-alt",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.entidad)) {
                if (global.getDataID(this.props.entidad) === -1) {
                    return <span>
                        <Button keyBtn={"btnSPVPreReporteFallas"} {...this.props} id="btn_prereportes" />
                        <PrereportesConsulta target="btn_prereportes" />
                    </span>
                }
            };

            return null;
        };
    });

    interface ICerrarReporteButtonProps extends buttons.IButtonProps, page.IProps { };

    const CerrarReporteButton: any = global.connect(class extends React.Component<ICerrarReporteButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static defaultProps: ICerrarReporteButtonProps = {
            icon: "fas fa-flag-checkered",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let fnClose = () => {
                let id: number = global.getDataID(this.props.entidad);
                global.dispatchAsyncPut("global-current-entity", "base/scv/ReportesFallas/GetBP/CerrarReporte", { id });
            };

            if (!Forms.hasChanged(config.id)) {
                fnClose();
            } else {
                EK.Global.confirm("Hay cambios no guardados. Si continua, los cambios se perderán.", "Reporte de Fallas", () => {
                    fnClose();
                });
            };
        };
        render(): JSX.Element {
            if (!global.isSuccessful(this.props.entidad)) {
                return null;
            };

            if (global.getDataID(this.props.entidad) <= 0) {
                return null;
            };

            if (!global.getData(this.props.state).allowCancel) {
                return null;
            };

            return <Button keyBtn="btnSPVCerrarReporte" {...this.props} onClick={this.onClick.bind(this)} />
        };
    });


    interface IInquestReportButtonProps extends buttons.IButtonProps, page.IProps { };

    const InquestReportButton: any = global.connect(class extends React.Component<IInquestReportButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static defaultProps: IInquestReportButtonProps = {
            icon: "fas fa-poll-people",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let fnClose = () => {
                let dataEntity: any = global.getData(this.props.entidad);
                if (dataEntity != undefined && dataEntity != null) {
                    let otcount = dataEntity.OrdenesTrabajo.length - 1;
                    dataEntity.IdContratista = dataEntity.OrdenesTrabajo[otcount].IdContratista;
                    global.dispatchAsyncPost("global-page-entity", "scv/SPVEncuestasSatisfaccionFija/getIncuest/", { dataEntity }, INQUEST_ID);
                }
                let modalCalen: any = $("#modalInquestReportSPV");
                modalCalen.modal();
            };


            EK.Global.confirm("Desea Aplicar la Encuesta del Reporte de Fallas", "ENCUESTA", () => {
                fnClose();
            });

        };

        render(): JSX.Element {

            if (!global.isSuccessful(this.props.entidad)) {
                return null;
            };

            if (global.getDataID(this.props.entidad) <= 0) {
                return null;
            };

            if (!global.getData(this.props.state).allowInquest) {
                return null;
            };


            let formatBadgeEncuesta: (data: boolean) => any = (data: boolean): any => {
                return <div style={{ textAlign: "center" }}>{label.ok(data)}</div>
            };
            //¿Desea realizar el cierre de la encuesta?, Presione Confirmar para continuar \\ Información fue almacenada con Éxito
            let formatEstatusEncuesta: () => any = () => {
                let retValue: any;
                let dataEntity: any = getData(EK.Store.getState().global.currentEntity);

                let incuest: any = dataEntity != undefined && dataEntity.EncuestaSatisfaccion != undefined ? dataEntity.EncuestaSatisfaccion : undefined;
                let isAlreadyClosed: any = getData(EK.Store.getState().global.InquestClosed);

                if (incuest && incuest.Cerrada === true) {
                    if (incuest.NoContesto === true) {
                        retValue = <span> <span className="fab fa-creative-commons-pd" title="No Contesto" style={{ color: "brown" }} > </span></span>;
                    } else {
                        if (incuest.NoEncontrado === true) {
                            retValue = <span> <span className="fal fa-map-marker-alt-slash" title="No Encontrado" style={{ color: "Orange" }}></span> </span>;
                        } else {
                            retValue = <span> {EK.Modules.SCV.Pages.postventa.RUBA.inquestSPV.onIconSatisfactionIndex(incuest.IndiceSatisfaccion, "EMOJIS")} </span>;
                        }
                    }

                } else {
                    retValue = <span title="Encuesta Pendiented" >{formatBadgeEncuesta(false)} </span>;
                }
                return retValue;
            };


            return <span>
                <span style={{ position: "absolute", marginTop: "-5px", fontSize: "19px", zIndex: 1 }}  > {formatEstatusEncuesta()}</span>
                <Button keyBtn="btnSPVEncuestaReporte" {...this.props} onClick={this.onClick.bind(this)} />
            </span>;
        };
    });


    export const PrereportesConsulta: any = global.connect(class extends React.Component<consultas.IConsultaProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static defaultProps: consultas.IConsultaProps = {
            id: "Prereporte",
            remoteUrl: "base/scv/Prereportes/all",
            remoteMethod: HttpMethod.GET,
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 12, 12],
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdCliente", width: "100px" })
                    .add({ data: "IdPrereporte", title: "ID", width: "100px" })
                    .add({ data: "Cliente.Nombre", width: "200px" })
                    .add({ data: "Ubicacion.ClaveFormato", width: "100px" })
                    .add({ data: "Ubicacion.IdPlaza", width: "100px" })
                    //.addDateTime({ data: "FechaCaptura", title: "Fecha Pre-Reporte", width: 5, order: "desc" })
                    //.add({ data: "EstatusReporte", width: 10, render: prereportes.formatEstatusReporte })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let encodedFilters: string = global.encodeObject({ idPrereporte: item.ID });
            config.dispatchEntityBase(null, "base/scv/ReportesFallas/GetBP/LoadReporte/" + encodedFilters, null, global.HttpMethod.GET);
        };
        render(): JSX.Element {
            return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick} />
        };
    });

    class ReporteUtils {
        public static fnHasOrdenes(id: number): boolean {
            let retValue: boolean;

            let elements: DataElement = Forms.getValue(REPORTE_ORDEN_TRABAJO_ID, config.id);
            if (elements && global.isSuccessful(elements)) {
                elements = elements.getActiveItems();
            };

            let items: any[] = global.getData(elements, []);
            if (items && items.length > 0) {
                for (let i = 0; i < items.length && !retValue; i++) {
                    let partidas: any[] = items[i].Partidas as any[];
                    if (partidas && partidas.length > 0) {
                        for (let j = 0; j < partidas.length && !retValue; j++) {
                            let p: any = global.assign({}, partidas[j]);
                            if (p._eliminado !== true && p.IdPartida === id) {
                                retValue = true;
                            };
                        };
                    };
                };
            };

            return retValue;
        };

        public static fnHasDictamenes(id: number): boolean {
            let retValue: boolean;

            let elements: DataElement = Forms.getValue(REPORTE_DICTAMENES_ID, config.id);
            if (elements && global.isSuccessful(elements)) {
                elements = elements.getActiveItems();
            };

            let items: any[] = global.getData(elements, []);
            if (items && items.length > 0) {
                for (let i = 0; i < items.length && !retValue; i++) {
                    let detalles: any[] = items[i].Detalles as any[];
                    if (detalles && detalles.length > 0) {
                        let d: any = global.assign({}, detalles[0]);
                        if (d && d.IdReporteDetalle === id) {
                            retValue = true;
                        };
                    };
                };
            };

            return retValue;
        };

        public static fnHasDictamenNotAccepted(id: number): boolean {
            let retValue: boolean;
            // retValue = false; Forms.getValue(id, idParent);
            let dataDictamenes = global.getData(Forms.getValue(REPORTE_DICTAMENES_ID, config.id), []);
            //let dataPartidas = Forms.getValue(REPORTE_DICTAMENES_DETALLES_ID, REPORTE_DICTAMENES_ID);
            // let partidas: any[] = global.getData(Forms.getValue(REPORTE_FALLAS_ID, config.id), []);
            // let partidas2 = EK.Store.getState().forms.reporte$dictamenes$detalles;
            if (dataDictamenes && dataDictamenes.length > 0) {
                let partidaReceived: any[];
                for (let i = 0; i < dataDictamenes.length; i++) {
                    // console.log(dataDictamenes[i]);
                    if (dataDictamenes[i].PartidasNew !== undefined) {
                        partidaReceived = dataDictamenes[i].PartidasNew.filter((value) => {
                            return id == value.Partida.ID;
                        });
                        if (partidaReceived[0] !== undefined) {
                            return partidaReceived[0].Partida.EstatusDictamen != "ACEPTADO";
                        }
                    } else {
                        partidaReceived = dataDictamenes[i].Detalles.filter((value) => {
                            return id == value.Partida.ID;
                        });
                        if (partidaReceived[0] !== undefined) {
                            return partidaReceived[0].Partida.EstatusDictamen != "ACEPTADO";
                        }
                    }

                }
                // console.log(partidaReceivedtest[0]);
            }
            //if (partidas && partidas.length > 0) {
            //    let partidaReceived: any[] = partidas.filter((value) => {
            //        return id == value.ID;
            //    });
            //    return partidaReceived[0].EstatusDictamen != "ACEPTADO";
            //}

            return retValue;
        };

        public static fnSetDictamenes(item: any): any {
            let elements: DataElement = Forms.getValue(REPORTE_DICTAMENES_ID, config.id);
            let elements2: DataElement = EK.Store.getState().global.catalogo$reporte$dictamenes$detalles;
            if (!elements) {
                elements = global.createSuccessfulStoreObject([]);
            };
            //
            let retValue: any = global.assign({}, item);
            retValue.Dictamenes = [];
            retValue.Procede = "S";
            //
            let dictamenes: any[] = global.getData(elements, []);
            let partidas: any[] = global.getData(elements2, []);
            if (partidas && partidas.length > 0) {
                let dd: any[] = partidas.filter((value) => {
                    return value._eliminado !== true && retValue.ID === value.IdReporteDetalle;
                });
                //
                if (dd && dd.length > 0) {
                    let dictamen: any = dd[dd.length - 1];
                    if (dictamen && dictamen.Partida.EstatusDictamen && dictamen.Partida.EstatusDictamen === "ACEPTADO") {
                        retValue.Procede = "S";
                        retValue.EstatusPartidaValor = "N";
                        retValue.EstatusPartida = global.assign(retValue.EstatusPartida, {
                            Clave: "N",
                            Nombre: "NUEVO"
                        });
                        for (var i = 0; i < EK.Store.getState().global.catalogo$reporte$fallas.data.length; i++) {
                            if (EK.Store.getState().global.catalogo$reporte$fallas.data[i].ID == retValue.ID) {
                                EK.Store.getState().global.catalogo$reporte$fallas.data[i].Procede = "S";
                                EK.Store.getState().global.catalogo$reporte$fallas.data[i].EstatusPartidaValor = "N";
                            }
                        }

                    } else {
                        retValue.Procede = "N";
                        retValue.EstatusPartidaValor = "D";
                        retValue.EstatusPartida = global.assign(retValue.EstatusPartida, {
                            Clave: "D",
                            Nombre: "Diagnóstico"
                        });
                        for (var i = 0; i < EK.Store.getState().global.catalogo$reporte$fallas.data.length; i++) {
                            if (EK.Store.getState().global.catalogo$reporte$fallas.data[i].ID == retValue.ID) {
                                EK.Store.getState().global.catalogo$reporte$fallas.data[i].Procede = "N";
                                EK.Store.getState().global.catalogo$reporte$fallas.data[i].EstatusPartidaValor = "D";
                            }
                        }
                    };
                };
            };

            let dictamenes2: any[] = global.getData(elements, []);
            if (dictamenes2 && dictamenes2.length > 0) {
                let dd: any[] = dictamenes2.filter((value) => {
                    return value._eliminado !== true && value.IdPartidas.includes(retValue.ID);
                });
                retValue.Dictamenes = dd;
            };

            //
            if (retValue.Procede === "S") {
                retValue.PartidaAutorizada = "A";
            } else {
                retValue.PartidaAutorizada = "R";
            };

            return retValue;
        };

        public static fnSetDictamenes2(item: any): any {
            let elements: DataElement = Forms.getValue(REPORTE_DICTAMENES_ID, config.id);
            if (!elements) {
                elements = global.createSuccessfulStoreObject([]);
            };
            //
            let retValue: any = global.assign({}, item);
            retValue.Dictamenes = [];
            retValue.Procede = retValue.DiasGarantia > 0 ? "S" : "N";
            //
            let dictamenes: any[] = global.getData(elements, []);
            if (dictamenes && dictamenes.length > 0) {
                let dd: any[] = dictamenes.filter((value) => {
                    return value._eliminado !== true && retValue.ID === value.IdReporteDetalle;
                });
                //
                if (dd && dd.length > 0) {
                    let dictamen: any = dd[dd.length - 1];
                    if (dictamen && dictamen.EstatusDictamen && dictamen.EstatusDictamen.Clave === "A") {
                        retValue.Procede = "S";
                        retValue.EstatusPartidaValor = "N";
                        retValue.EstatusPartida = global.assign(retValue.EstatusPartida, {
                            Clave: "N",
                            Nombre: "NUEVO"
                        });
                    } else {
                        retValue.Procede = "N";
                        retValue.EstatusPartidaValor = "D";
                        retValue.EstatusPartida = global.assign(retValue.EstatusPartida, {
                            Clave: "D",
                            Nombre: "Diagnóstico"
                        });
                    };

                    retValue.Dictamenes = dd;
                };
            };
            //
            if (retValue.Procede === "S") {
                retValue.PartidaAutorizada = "A";
            } else {
                retValue.PartidaAutorizada = "R";
            };

            return retValue;
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
            //debugger
            let cliente: any = Forms.getDataValue("Cliente", config.id, EK.Store.getState());
            if (cliente === undefined || cliente.data === undefined) {
                cliente = getData(EK.Store.getState().global.currentEntity).Cliente;
            } else {
                cliente = getData(cliente);
            }

            if (cliente) {
                //  Forms.updateFormElement("BitacoraClienteSPV", "Cliente", { "IdEntity": null, "Clave": null, "Nombre": "ANABEL CARRILLO MENDEZ", "IdUbicacion": 234481, "TelefonoCasa": null, "TelefonoOficina": null, "TelefonoOtros": null, "CorreoElectronico": null, "FechaNacimiento": "0001-01-01T00:00:00", "RFC": null, "Direccion": null, "Colonia": null, "Ciudad": null, "Municipio": null, "EntidadFederal": null, "Pais": null, "CodigoPostal": null, "UbicacionClave": "1610", "UbicacionClaveFormato": "1-6-1-0", "IdCoordinador": null, "IdSupervisor": null, "Antiguedad": 0, "Desarrollo": { "ID": null, "LatitudLongitud": null, "CapasGJson": null, "Direccion": null, "Plaza": null, "Latitud": null, "Longitud": null, "Clave": "CG", "Nombre": null, "Creado": null, "CreadoPor": null, "Modificado": null, "ModificadoPor": null, "Version": null, "Estado": 0, "Estatus": null, "IdEstatus": null, "IdCreadoPor": null, "IdModificadoPor": null, "Sistema": null, "TrackChanges": false }, "Capital": null, "CapitalMoneda": null, "Interes": null, "InteresMoneda": null, "Importe": null, "ImporteMoneda": null, "Moneda": null, "IdMoneda": null, "TipoCambio": null, "Saldo": null, "Pagado": null, "ID": 1071607, "Creado": null, "CreadoPor": null, "Modificado": null, "ModificadoPor": null, "Version": null, "Estado": 2, "Estatus": null, "IdEstatus": null, "IdCreadoPor": null, "IdModificadoPor": null, "Sistema": null, "TrackChanges": true });
                Forms.updateFormElement("BitacoraClienteAreasComunesSPV", "Cliente", cliente);
                Forms.updateFormElement("BitacoraClienteAreasComunesSPV", "VerComentarios", { ID: 1, Clave: "F", Nombre: "Ver Solo Comentarios del Folio" });
                global.dispatchSuccessful("global-page-entity", { origen: "Folio" }, "BitacoraClienteSPV$Origen");
            } else {
                Forms.updateFormElement("BitacoraClienteAreasComunesSPV", "Cliente", null);
                Forms.updateFormElement("BitacoraClienteAreasComunesSPV", "VerComentarios", { ID: 2, Clave: "C", Nombre: "Ver la Información Completa del Cliente" });
                global.dispatchSuccessful("global-page-entity", { origen: "DashBoardFailureReporte" }, "BitacoraClienteSPV$Origen");
            }
            global.dispatchSuccessful("global-page-data", [], "BitacoraClienteSPV$Detalle");
            global.dispatchSuccessful("global-page-entity", [], "BitacoraClienteSPV$Ubicacion");
            global.dispatchSuccessful("global-page-entity", [], "BitacoraClienteSPV$Ubicacion$Detalle");
            global.dispatchSuccessful("global-page-entity", [], "BitacoraClienteSPV$Etapa");

            let modalCalen: any = $("#ModalBitacoraClienteSPVAreasComunes");
            modalCalen.modal();
        };
        render(): JSX.Element {
            return <span>
                <Button keyBtn={"btnSPVBitacoraCliente"} {...this.props} id="btn_bitacora" onClick={this.onButtonClick} />
            </span>
        };
    });

    export let ComentariosOTButton: any = global.connect(class extends React.Component<IBitacoraSPVButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static defaultProps: IBitacoraSPVButtonProps = {
            icon: "fas fa-comment-alt",
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
            let modalCalen: any = $("#modalComentariosOT");
            modalCalen.modal();
        };
        render(): JSX.Element {
            return <span>
                <Button keyBtn={"btnSPVComentariosOT"} {...this.props} id="btn_comentarios_ot" onClick={this.onButtonClick} />
            </span>
        };
    });


};

import reporteFallasAreasComunes = EK.Modules.SCV.Pages.postventa.RUBA.ReporteFallasAreasComunes;