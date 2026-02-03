// A '.tsx' file enisNew === true && !(entidad && entidad.Prereporte)ables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.Modules.SCV.Pages.postventa.RUBA.ReportesFallas {
    "use strict";
    const PAGE_ID: string = "ReportesFallas";
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
    const REPORTE_ORDEN_TRABAJO_PARTIDAS_ID_OBSERVACIONES: string = "reporte$ordenTrabajo$partidas$obs";
    const REPORTE_ORDEN_TRABAJO_CALCULO_PARTIDAS_ID: string = "reporte$ordenTrabajo$partidasCalculo";
    const REPORTE_CONTRATISTAS_ID: string = "reporte$contratistas";
    const REPORTE_EVIDENCIAS_ID: string = "reporte$evidencias";
    const REPORTE_HISTORIALOT_ID: string = "reporte$historialfechasot";
    const REPORTE_RESPONSABLESCAT_ID: string = "reporte$responsables";
    const REPORTE_DICTAMENES_ID: string = "reporte$dictamenes";
    const REPORTE_DICTAMENES_DETALLES_ID: string = "reporte$dictamenes$detalles";
    const REPORTE_DICTAMENES_OPTIONS_ID: string = "reporte$dictamenes$options";
    const REPORTE_APPOINTMENT_ORDENES_TRABAJO_ID: string = "reporte$appointment$ordenesTrabajo";
    const REPORTE_APPOINTMENT_DICTAMENES_ID: string = "reporte$appointment$dictamenes";
    const REPORTE_BITACORA_DETALLE_ID = "reporte$BitacoraClienteSPV$Detalle";
    const INQUEST_ID: string = "reporte$InquestReportSPV";
    const DIAGNOSTICATE_IMAGE: string = "reporte$diagnosticate$image";
    const DIAGNOSTICATE_NOTE: string = "reporte$diagnosticate$note";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [REPORTE_UBICACION_ID, REPORTE_INFORMACION_ID, REPORTE_UBICACION_CONTRATISTAS_ID, REPORTE_FALLAS_ID, REPORTE_CONTACTO_ID, REPORTE_CLIENTE_ETAPA, REPORTE_PARTIDA, REPORTE_PARTIDA_INFORME, REPORTE_ORDEN_TRABAJO_ID, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_DICTAMENES_ID, REPORTE_EVIDENCIAS_ID, REPORTE_HISTORIALOT_ID, REPORTE_RESPONSABLESCAT_ID, REPORTE_DICTAMENES_DETALLES_ID, REPORTE_DICTAMENES_OPTIONS_ID, REPORTE_CONTRATISTAS_ID, REPORTE_APPOINTMENT_ORDENES_TRABAJO_ID, REPORTE_APPOINTMENT_DICTAMENES_ID, INQUEST_ID, DIAGNOSTICATE_IMAGE, DIAGNOSTICATE_NOTE]);
    declare const PDFObject: any;
    let cantidadAbiertoPdf = 0;
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
        public AuthMode: boolean;
        public action: any;

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
                this.AuthMode = state.AuthMode;
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
                <Column size={[1, 1, 1, 1]} className="list-center-header text-center">{""}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header text-center">{"No. Incidencia"}</Column>
                {/*<Column size={[1, 1, 1, 1]} className="list-center-header text-center">{"Diagnósticos"}</Column>*/}
                <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Familia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Ubicación Incidencia"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header text-center">{"Contratista"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header text-center">{"Observaciones Cliente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Causa Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Origen Causa"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header text-center">{"Reincidencias"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header text-center">{"Observaciones Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header text-center">{"Garantía (días)"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Término Garantía"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Fecha Cerrado"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header text-center">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header text-center">&nbsp;</Column>
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
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Familia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Origen Causa"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"CAT Responsable"}</Column>
            </Row>
        </Column>

    const listHeaderEvidenciasDictamen: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Diagnostico"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Comentario"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">{"Ver Evidencia"}</Column>

                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>
    const listHeaderEvidenciasIncidencia: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Evidencia"}</Column>
                <Column size={[7, 7, 7, 7]} className="list-default-header">{"Comentario"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">{"Ver Evidencia"}</Column>

                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>
    const listHeaderEvidenciasOT: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. OT"}</Column>
                <Column size={[7, 7, 7, 7]} className="list-default-header">{"Comentario"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">{"Ver Evidencia"}</Column>

                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderHistorialFechasOT: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 12, 12]} className="bg-info"><h4 className="text-bold" style={{ "color": '#000' }}>Historial planificaciones OT</h4></Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[3, 3, 3, 3]} className="list-center-header">{"Fecha Inicio"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-center-header">{"Fecha Fin"}</Column>
                <Column size={[4, 4, 4, 4]} className="list-center-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderDictamen: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
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
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Familia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Origen Causa"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">Estado</Column>
            </Row>
        </Column>;

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
    function openWindowWithPost(url, data) {
        var form = document.createElement("form");
        form.target = "_blank";
        form.method = "POST";
        form.action = url;
        //form.title = 'XD'
        form.style.display = "none";

        //for (var key in data) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = 'singlevalue'//key;
        input.value = data//data[key];
        form.appendChild(input);
        //}
        var scriptt = document.createElement("script");
        scriptt.innerHTML = "console.log('texto en otra pagina')";
        //var form = getForm("http://example.com", "_blank", obj, "post");

        //console.log(form);
        //document.title = 'Nueva ventana';
        document.body.appendChild(form);
        document.body.appendChild(scriptt);
        //window.open('', 'TheWindow');
        form.submit();
        document.body.removeChild(form);
        document.body.removeChild(scriptt);
        //let title = document.title;
        //if (title === 'imprimirOT') {
        //    setTimeout(() => { document.title = 'XD' }, 1500)
        //}


    }

    function GetDocumentOTData(OrdenTrabajo) {

        let entidad: any = global.getData(EK.Store.getState().global.currentEntity);
        OrdenTrabajo.Observaciones = OrdenTrabajo.Observaciones.replace('♪', '\n');
        let telefonoCasa = entidad.TelefonoCasa;
        let telefonoOficina = entidad.TelefonoOficina;
        let telefonoCelular = "";
        let telefonoOtros = entidad.TelefonoOtros;
        let contactos = entidad.Contactos;
        let telefonos: any[] = contactos.filter(c => c.TipoContacto.Clave == "TELEFONO");
        if (telefonos != null) {
            for (let t of telefonos) {
                if (t.TipoTelefono.Clave == "CS") {
                    telefonoCasa = t.Contacto;
                }
                else if (t.TipoTelefono.Clave == "T") {
                    telefonoOficina = t.Contacto;
                }
                else if (t.TipoTelefono.Clave == "C") {
                    telefonoCelular = t.Contacto;
                }
                else if (t.TipoTelefono.Clave == "O") {
                    telefonoOtros = t.Contacto;
                }
            }
        }
        let cOrigen = entidad.Contratista;
        let PartidasTable = [];
        let DictamenesTable = [];

        for (let p of OrdenTrabajo.Partidas) {
            let partida = entidad.Partidas.filter(x => x.ID === p.IdPartida);
            if (partida[0] !== null && partida[0] !== undefined) {
                partida[0].ObservacionesOT = p.Observaciones;
                partida[0].ObservacionesAppCat = p.ObservacionesCat;
                PartidasTable.push(partida[0]);
            }

            for (let dic of entidad.Dictamenes) {
                let dictamen = dic.Detalles.filter(y => y.IdReporteDetalle === p.IdPartida);
                if (dictamen[0] !== null && dictamen[0] !== undefined) {
                    let checkDictamen = DictamenesTable.filter(d => d.ID == dic.ID)[0];
                    if (checkDictamen === null || checkDictamen === undefined) {
                        DictamenesTable.push(dic);
                    }
                }
            }

        }
        //entidad.Cliente.Direccion = entidad.Ubicacion.Calle;
        //entidad.Cliente.Desarrollo = entidad.Ubicacion.Desarrollo;
        let rutaFirmas = 'http://Apps.gruporuba.com.mx/unitpricesimage/';
        let dd: any = {
            ID: entidad.ID,
            Folio: entidad.IdFolio,
            OrdenTrabajo: OrdenTrabajo,
            FechaEntregaVivienda: entidad.FechaEntregaVivienda,
            FechaCaptura: entidad.FechaCaptura,
            Cliente: entidad.Cliente,
            CreadoPor: entidad.CreadoPor,
            ModificadoPor: entidad.ModificadoPor,
            TelefonoCasa: telefonoCasa,
            TelefonoOficina: telefonoOficina,
            TelefonoCelular: telefonoCelular,
            TelefonoOtros: telefonoOtros,
            DesarrolloClave: entidad.DesarrolloClave,
            SuperManzana: entidad.SuperManzana,
            Manzana: entidad.Manzana,
            Lote: entidad.Lote,
            Interior: entidad.Interior,
            Exterior: entidad.Exterior,
            Coordinador: entidad.Coordinador,
            ResponsableConstruccion: entidad.ResponsableConstruccion,
            ObservacionesSC: entidad.ObservacionesServicio,
            ObservacionesCAT: entidad.ObservacionesContratista,
            Contratista: OrdenTrabajo.Contratista,
            ContratistaOrigen: cOrigen,
            Citas: null,
            Partidas: PartidasTable,
            Dictamenes: DictamenesTable,
            IdFolio: entidad.ID,
            Ubicacion: entidad.Ubicacion,
            ImagenFirma: OrdenTrabajo.FirmaClienteFilename,
            ImagenFirmaContratista: OrdenTrabajo.FirmaContratistaFilename,
            ImagenFirmaCatSuper: OrdenTrabajo.FirmaCatSupFilename
        }
        //console.log(dd)
        //dd.ResponsableConstruccion.Nombre = dd.ResponsableConstruccion.Nombre.replace('ú', 'á');
        let stringdd = JSON.stringify(dd);
        //console.log(stringdd);

        //let encodedDataDocument = window.btoa(unescape(encodeURIComponent(str)));

        //let encodedDataDocument = window.btoa(stringdd);
        //console.log(encodedDataDocument)
        return stringdd;
    }

    const printOT: any = {
        icon: "fa fa-print",
        titulo: "Imprimir OT",
        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
            let encodedData = GetDocumentOTData(item);
            //console.log(item)
            //openWindowWithPost("scv/reportesFallas/imprimirOT", encodedData);
            //let win2 = global.dispatchAsyncPost("global-page-data", "scv/reportesFallas/ImprimirOTPost", JSON.parse( encodedData) )
            // let win = global.dispatchAsyncPost(null, "base/kontrol/reportesFallas/GetBP/EnviarCorreoDiarioSingleCat/", { parametros: encodedData })
            let resumen = `OT-${item.ID}_Folio-${item.IdReporte}`;
            let win = window.open("scv/reportesFallas/ImprimirOTbyId/" + item.ID + '/' + resumen, "_blank");
            return;

        }
    };
    const printDiagnostico: any = {
        icon: "fa fa-print",
        titulo: "Imprimir Diagnóstico",
        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
            //let win = window.open("scv/reportesFallas/imprimirDiagnostico/" + item.ID, "_blank");
            //console.log(item)
            let resumen = `OD-${item.ID}_Folio-${item.IdReporte}`;
            let win = window.open("scv/reportesFallas/imprimirDiagnosticoById/" + item.ID + '/' + resumen, "_blank");
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
            let unsavedModel = EK.Store.getState().global.tmpUnsavedModel ? EK.Store.getState().global.tmpUnsavedModel.data : null;
            if (unsavedModel !== null) {
                delete EK.Store.getState().global.tmpUnsavedModel
            }
            //console.log('cerrar ventana')
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
                        //this.onSave.bind(this);
                        break;
                    default: break;
                }
            };
        };
        saveConfirm(item: any) {
            //console.log(item)
            global.dispatchAsyncPut("global-current-entity", "base/scv/ReportesFallas/Save", item);
        }

        onSave(props: page.IProps, item: global.EditForm): any {
            // console.log('saving')
            let contacto: any[] = global.getData(Forms.getValue(REPORTE_CONTACTO_ID, config.id), []);
            let contactoIsValid: boolean = true;

            contacto.forEach((value: any) => {
                if (!value.Contacto) {
                    contactoIsValid = false;
                }
            });

            if (!contactoIsValid) {
                warning("Se agregaron contactos del cliente con datos incorrectos. Por favor verifique la información e intente de nuevo.");
                return null;
            };

            let partidas: any[] = global.getData(Forms.getValue(REPORTE_FALLAS_ID, config.id), []);
            let partidasIdValid: boolean = true;
            partidas.forEach((value: any) => {
                if (value.ID < 0 || value.ID === null || value.ID === undefined) {
                    value.IdContratistaImputable = value.IdContratista;
                }
                if (value._eliminado !== true) {
                    if (!(value.TipoFalla && value.TipoFalla.ID) ||
                        !(value.Falla && value.Falla.IdFalla) ||
                        !(value.UbicacionFalla && value.UbicacionFalla.IdUbicacionFalla) ||
                        !(value.Contratista && value.Contratista.ID)) {
                        partidasIdValid = false;

                    }
                }
                value.ListaEvidenciasCte = null;
            });

            if (partidas.length <= 0) {
                warning("Debe indicar por lo menos una incidencia.");
                return null;
            }

            if (!partidasIdValid) {
                warning("Una o más partidas no fueron capturadas correctamente. Por favor verifique la información e intente de nuevo.");
                return null;
            };
            //console.log(partidas)
            let ubicacion: any = global.getData(props.config.getEntity(REPORTE_UBICACION_ID));
            let model: any = item
                .addID()
                .addObject("Cliente")
                .addObject("Prereporte")
                .addObjectConst("Ubicacion", ubicacion)
                .addNumberConst("IdUbicacion", ubicacion.ID)
                .addObject("ResponsableConstruccion")
                .addObject("SupervisorContratista")
                .addObject("MedioSolicitud")
                .addString("ObservacionesServicio")
                .addString("ObservacionesContratista")
                .addObject("Contactos", REPORTE_CONTACTO_ID)
                .addObject("Partidas", REPORTE_FALLAS_ID)
                .addObject("OrdenesTrabajo", REPORTE_ORDEN_TRABAJO_ID)
                .addObject("Dictamenes", REPORTE_DICTAMENES_ID)
                // .addObject("DictamenesPartidas", REPORTE_DICTAMENES_DETALLES_ID)
                .addObject("EstatusReporte")
                .addVersion()
                .toObject();
            //console.log(model)
            if (model.EstatusReporte) {
                model.IdEstatusReporte = model.EstatusReporte.Clave;
            };

            let PartidasUpd = getData(EK.Store.getState().global.catalogo$reporte$fallas);

            for (const pt of PartidasUpd) {
                for (const pda of model.Partidas) {
                    // console.log(pda)
                    pda.ListaEvidenciasCte = null;
                    if (pt.ID == pda.ID) {
                        if (pt.EstatusDictamen !== pda.EstatusDictamen) {
                            pda.EstatusDictamen = pt.EstatusDictamen;
                            pda.IdEstatusDictamen = pt.IdEstatusDictamen;
                            pda.Estado = 3;
                        }
                    }
                }
            }
            //console.log(model, model.ObservacionesServicio, model.ObservacionesContratista)

            if (model.ObservacionesServicio !== undefined && model.ObservacionesServicio !== null && model.ObservacionesServicio.trim() !== '') {
                var patt = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                var res = patt.test(model.ObservacionesServicio);
                if (!res) {
                    global.warning('Las observaciones del cliente contienen caracteres no validos', 'Atencion');
                    return;
                }
            }
            if (model.ObservacionesContratista !== undefined && model.ObservacionesContratista !== null && model.ObservacionesContratista.trim() !== '') {
                var patt2 = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                var res2 = patt2.test(model.ObservacionesContratista);
                if (!res2) {
                    global.warning('Las observaciones a nivel folio contienen caracteres no validos', 'Atencion');
                    return;
                }
            } let totalComentariosNoVerificados = EK.Store.getState().global.TotalComentariosRevisar !== null && EK.Store.getState().global.TotalComentariosRevisar !== undefined ? EK.Store.getState().global.TotalComentariosRevisar.data : 0;
            //console.log(model)
            if (totalComentariosNoVerificados > 0) {
                global.warning('Revise los comentarios en bitacora antes de continuar', 'Atencion');
                return;
            }
            let fechaEntrega = model.Ubicacion.FechaEntregaCalidad
            //console.log(model)
            //console.log(fechaEntrega)
            if (fechaEntrega === null) {
                global.warning('No se puede guardar el folio porque la ubicacion no se entregado aun', 'Atencion');
                return;
            } else {
                let actual = new Date();
                if (actual.getTime() < fechaEntrega.getTime()) {
                    global.warning('No se puede guardar el folio porque la fecha de entrega es mayor a la fecha actual', 'Atencion');
                    return;
                }
            }
            delete EK.Store.getState().global.listaVerificadoLocal;


            if (model.ID === null || model.ID < 0) {
                let contratistas = getData(EK.Store.getState().global.catalogo$reporte$ubicacion$contratistas)
                let unsavedModel = model;
                unsavedModel.Contratistas = contratistas;
                dispatchSuccessful('load::tmpUnsavedModel', unsavedModel);
            } else {
                //delete EK.Store.getState().global.tmpUnsavedModel;
                //console.log('guardar folio No nuevo')
            }
            console.log(model)
            if (model.IdMedioSolicitud === null || model.IdMedioSolicitud === undefined || model.IdMedioSolicitud < 0) {
                global.info('Seleccione un medio de solicitud', 'Atencion');
                return;
            }

            if (model.Dictamenes && model.Dictamenes.length > 0) {
                for (let d of model.Dictamenes) {
                    if (d.Detalles) {
                        for (let det of d.Detalles) {
                            det.Partida.ListaEvidenciasCte = null;
                        }
                    }
                    d.Partida.ListaEvidenciasCte = null;
                    //for(let p of d.)
                }
            }
            console.log(model)
            let todas_no_vigentes = model.Partidas.every(x => x.noProcedePorVigencia === true);
            console.log(todas_no_vigentes)
            //global.dispatchAsyncPut("global-current-entity", "base/scv/ReportesFallas/Save", model );
            if (todas_no_vigentes) {
                console.log('todas no vigentes')
                let parametros = { lista: [] }
                for (let pta of model.Partidas) {
                    let obj = {
                        clave_tipo_vivienda: model.Ubicacion.Segmento.IdTipoVivienda,
                        familia: pta.IdTipoFalla,
                        componente: pta.Falla.IdFalla,
                        ubicacion: pta.UbicacionFalla.IdUbicacionFalla,
                        numcte: model.IdCliente,
                        id_cve_fracc: model.Ubicacion.DesarrolloClave,
                        id_contratista: pta.IdContratista,
                        entrega_vivienda: model.Ubicacion.FechaEntregaCalidad,
                        id_identificador_cc: model.Ubicacion.IdPlaza
                    }
                    parametros.lista.push(obj);
                }

               console.log(parametros)
                global.asyncPost("base/scv/ReportesFallas/GetBP/GuardarIncidenciaNoVigente", { parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            console.log(data)
                            if (data === 1) {
                                global.dispatchSuccessful("global-current-entity");
                                this.resetAllForm()
                                global.success('Informacion guardada correctamente');
                            }
                          
                            break;
                        case AsyncActionTypeEnum.loading:
                            global.dispatchLoading("global-current-entity")
                            break;
                        case AsyncActionTypeEnum.failed:
                            global.dispatchSuccessful("global-current-entity")
                            break;
                    }
                });
                console.log('guardar primer if')
            } else {
                console.log('primer else')
                let partidas_p = model.Partidas.filter(x => x.noProcedePorVigencia === false); 
                let partidas_np = model.Partidas.filter(x => x.noProcedePorVigencia === true); 
                model.Partidas = partidas_p;
                if (partidas_np.length > 0) {
                    console.log('segundo if')
                    let parametros = { lista: [] }
                    for (let pta of partidas_np) {
                        let obj = {
                            clave_tipo_vivienda: model.Ubicacion.Segmento.IdTipoVivienda,
                            familia: pta.IdTipoFalla,
                            componente: pta.Falla.IdFalla,
                            ubicacion: pta.UbicacionFalla.IdUbicacionFalla,
                            numcte: model.IdCliente,
                            id_cve_fracc: model.Ubicacion.DesarrolloClave,
                            id_contratista: pta.IdContratista,
                            entrega_vivienda: model.Ubicacion.FechaEntregaCalidad,
                            id_identificador_cc: model.Ubicacion.IdPlaza
                        }
                        parametros.lista.push(obj);
                    }

                    global.asyncPost("base/scv/ReportesFallas/GetBP/GuardarIncidenciaNoVigente", { parametros }, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                //console.log(data)
                                if (data === 1) {
                                    global.dispatchSuccessful("global-current-entity");
                                    global.dispatchAsyncPut("global-current-entity", "base/scv/ReportesFallas/Save", model);
                                    //
                                    
                                    //setTimeout(() => {
                                    //    console.log('guardar...');
                                    //    global.dispatchAsyncPost("global-current-entity", "base/scv/ReportesFallas/GetBP/Save", { item:model });
                                    //}, 500)
                                }

                                break;
                            case AsyncActionTypeEnum.loading:
                                global.dispatchLoading("global-current-entity")
                                break;
                            case AsyncActionTypeEnum.failed:
                                global.dispatchSuccessful("global-current-entity")
                                break;
                        }
                    });
                } else {
                    console.log('segundo else')
                    //global.dispatchAsyncPut("global-current-entity", "base/scv/ReportesFallas/GetBP/Save", { item: model });
                    global.dispatchAsyncPut("global-current-entity", "base/scv/ReportesFallas/Save", model);

                    //return model;
                    //setState({ viewMode: false })
                    //state.allowSave = false;
                    //this.EndSaveModel(model)
                }
               
            }
      
        };

        //SaveNoVigentes(modelo) {
        //    return modelo;
        //}

        EndSaveModel(modelo) {
            return modelo;
        }

        onFilter(props: any, filters: any, type?: string): void { };
        onEntityLoaded(props: page.IProps): void {
            let entidad: any = global.getData(props.entidad);
            //console.log(entidad)
            let isNew: boolean = global.getDataID(props.entidad) <= 0;
            if (isNew === true && !(entidad && entidad.Prereporte)) {

                let unsavedModel = EK.Store.getState().global.tmpUnsavedModel ? EK.Store.getState().global.tmpUnsavedModel.data : null;
                //console.log(unsavedModel)
                if (unsavedModel !== null) {
                    entidad = unsavedModel;
                    //entidad.IdEstatusReporte = "N"
                    global.dispatchSuccessful("global-page-entity", entidad.Ubicacion, REPORTE_UBICACION_ID);
                    global.dispatchSuccessful("global-page-data", entidad.Contratistas, REPORTE_UBICACION_CONTRATISTAS_ID);
                    global.dispatchSuccessful("global-page-data", entidad.Contactos, REPORTE_CONTACTO_ID);
                    global.dispatchSuccessful("global-page-data", entidad.Partidas, REPORTE_FALLAS_ID);
                    global.dispatchSuccessful("global-page-data", entidad.OrdenesTrabajo, REPORTE_ORDEN_TRABAJO_ID);
                    entidad.IdEstatusReporte = "N";
                    entidad.EstatusReporte = { Clave: "N", Nombre: "NUEVO" };
                    entidad.FechaCaptura = global.getToday();
                    //global.dispatchSuccessful("global-page-data", entidad.contratistas, REPORTE_UBICACION_CONTRATISTAS_ID);
                } else {
                    global.dispatchSuccessful("global-page-entity", {}, REPORTE_UBICACION_ID);
                    global.dispatchSuccessful("global-page-entity", {}, REPORTE_INFORMACION_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTE_UBICACION_CONTRATISTAS_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTE_CONTACTO_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTE_FALLAS_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTE_DICTAMENES_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTE_EVIDENCIAS_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTE_HISTORIALOT_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTE_RESPONSABLESCAT_ID);
                    //global.dispatchSuccessful("load::TipoAgenda", null);
                    entidad.IdEstatusReporte = "N";
                    entidad.EstatusReporte = { Clave: "N", Nombre: "NUEVO" };
                    entidad.FechaCaptura = global.getToday();
                }

                props.config.setEntity(entidad);
                delete EK.Store.getState().global.tmpUnsavedModel;

            } else {
                let unsavedModel = EK.Store.getState().global.tmpUnsavedModel ? EK.Store.getState().global.tmpUnsavedModel.data : null;
                //console.log(unsavedModel)
                if (unsavedModel !== undefined || unsavedModel !== null) {
                    // console.log('borrar modelo temporal')
                    delete EK.Store.getState().global.tmpUnsavedModel;
                }
                //delete EK.Store.getState().global.tmpUnsavedModel;
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
                let evidencias: any[] = entidad.EvidenciasReporte as any[];
                let historialOT: any[] = entidad.HistorialFechasOT as any[];
                let partidas: any[] = entidad.Partidas as any[];
                if (dictamenes && dictamenes.length > 0) {
                    dictamenes.forEach((dm) => {

                        let detalles: any[] = [];
                        let IdPartidas: string[] = dm.IdPartidas.split(",");
                        //console.log(partidas);
                        for (var i = 0; i < IdPartidas.length; i++) {
                            let IdPartida = IdPartidas[i];
                            let partida: any = partidas.filter(
                                p => p.ID == IdPartida);

                            //console.log(partida)
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
                global.dispatchSuccessful("global-page-data", evidencias, REPORTE_EVIDENCIAS_ID);
                global.dispatchSuccessful("global-page-data", historialOT, REPORTE_HISTORIALOT_ID);

                Forms.updateFormElement(config.id, "Cliente", entidad.Cliente);

                ////configuración necesaria para inicializar agenda contratista
                //if (!isLoadingOrSuccessful(global.getStateItem("global.TipoAgenda"))) {
                global.dispatchAsync("load::TipoAgenda", "catalogos/get(TipoAgenda)");
                //};
                //configuración necesaria para inicializar agenda contratista
                global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: "Contratista" });
            };
            console.log(this.props)
            let state: ViewState = new ViewState();
            //let url: string = global.encodeAllURL("scv", "UbicacionesFalla", { activos: 1, usoFalla: "Ubicacion" });
            //global.dispatchAsync("load::ubicaciones$fallas", url);
            state.allowInquest = false;
            state.AuthMode = false;
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
            if (entidad.IdEstatusReporte === 'C') {
                let folioPendiente = EK.Store.getState().global.app && EK.Store.getState().global.app.data && EK.Store.getState().global.app.data.Me ? EK.Store.getState().global.app.data.Me.FolioPendiente : null
                if (folioPendiente && folioPendiente !== undefined) {
                    let currentApp = EK.Store.getState().global.app;
                    currentApp.data.Me.FolioPendiente = null;
                    dispatchSuccessful('load::app', currentApp);
                }
            }
            //console.log('cargado')
            console.log(entidad);
            if (entidad && entidad.Dictamenes && entidad.Dictamenes.length > 0) {
                let folioPendiente = EK.Store.getState().global.app && EK.Store.getState().global.app.data && EK.Store.getState().global.app.data.Me ? EK.Store.getState().global.app.data.Me.FolioPendiente : null
                if (folioPendiente && folioPendiente !== undefined) {
                    let currentApp = EK.Store.getState().global.app;
                    currentApp.data.Me.FolioPendiente = null;
                    dispatchSuccessful('load::app', currentApp);
                }
               
            }
            if (entidad && entidad.OrdenesTrabajo && entidad.OrdenesTrabajo.length > 0) {
                let folioPendiente = EK.Store.getState().global.app && EK.Store.getState().global.app.data && EK.Store.getState().global.app.data.Me ? EK.Store.getState().global.app.data.Me.FolioPendiente : null
                if (folioPendiente && folioPendiente !== undefined) {
                    let currentApp = EK.Store.getState().global.app;
                    currentApp.data.Me.FolioPendiente = null;
                    dispatchSuccessful('load::app', currentApp);
                }
            }
            props.config.setState(state);
        };

        resetAllForm() {
            global.dispatchSuccessful("global-page-entity", {}, REPORTE_UBICACION_ID);
            global.dispatchSuccessful("global-page-entity", {}, REPORTE_INFORMACION_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_UBICACION_CONTRATISTAS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_CONTACTO_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_FALLAS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_DICTAMENES_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_EVIDENCIAS_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_HISTORIALOT_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTE_RESPONSABLESCAT_ID);
            Forms.updateFormElement(config.id, "Cliente", null)
            Forms.updateFormElement(config.id, "FechaEntregaVivienda", null)
            Forms.updateFormElement(config.id, "MesesTranscurridos", null)
              
            ////global.dispatchSuccessful("load::TipoAgenda", null);
            //entidad.IdEstatusReporte = "N";
            //entidad.EstatusReporte = { Clave: "N", Nombre: "NUEVO" };
            //entidad.FechaCaptura = global.getToday();
        

            //props.config.setEntity(entidad);
        }

        render(): JSX.Element {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            //console.log(state)
            let permiso: AuthorizePermission = AuthorizePermission.Write;
            //console.log(permiso)
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowDelete={state.allowDelete}
                allowNew={state.allowNew}
                allowEdit={state.allowSave}
                allowSave={state.allowSave}
                allowCancel={state.allowCancel}
                onSave={this.onSave.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                onFilter={this.onFilter.bind(this)}>
                <PageButtons>
                    <IndicadorClienteButton />
                    <BitacoraSPVButton />
                    <ReportesButton />
                    <CancelarFolioButton />
                    <InquestReportButton />
                </PageButtons>
                <ModalBitacoraClienteSPV size={[12, 12, 12, 12]} />
                <ModalDiagnosticateCATSPV size={[12, 12, 12, 12]} />
                <ModalInquestReportSPV size={[12, 12, 12, 12]} />
                <ModalComentariosOT size={[12, 12, 12, 12]} />
                <ModalCancelarFolio size={[12, 12, 12, 12]} />
                <ModalPhotoViewer size={[12, 12, 12, 12]} />
                <ModalMultiPhotoViewer size={[12, 12, 12, 12]} />
                <ModalPDFViewers size={[12, 12, 12, 12]} />
                <ModalArchivosEntregaRender size={[12, 12, 12, 12]} />
                <ModalAutorizarIncidencia size={[12, 12, 12, 12]} />
                <View />
                <Edit />
            </page.Main>
        };
    };
    export const Edicion: any = ReactRedux.connect(Edicion$.props, null)(Edicion$);

    interface IViewProps extends page.IProps {
        ubicacion?: global.DataElement;
        slotState?: global.DataElement;
        cliente?: global.DataElement;
    };

    let View: any = global.connect(class extends React.Component<IViewProps, IViewProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.cliente = Forms.getDataValue("Cliente", config.id, state);
            retValue.ubicacion = state.global.entity$reporte$ubicacion;
            retValue.slotState = state.global.state$reporte$fallas;
            return retValue;
        };

        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        OpenPhotoViewer(img, prefijo, archivado, b64) {
            //console.log(img,prefijo);
            dispatchSuccessful('load::TipoViewer', 'REPORTE')
            //let fullpathimg = '\\\\10.1.70.29\\Enkontrol_GEOJSON\\' + img;
            let fullpathimg = "";
            if (archivado) {
                fullpathimg = b64;
            } else {
                fullpathimg = prefijo + img;
            }
            //console.log(fullpathimg);
            dispatchSuccessful('load::ImageValueURI', fullpathimg)
            let modalCalen: any = $("#ModalPhotoViewer");
            modalCalen.modal();
        }

        OpenPhotoViewerCte(img) {
            console.log(img)
            dispatchSuccessful('load::TipoViewer', 'REPORTE')
            dispatchSuccessful('load::ImageValueURI', img)
            let modalCalen: any = $("#ModalPhotoViewer");
            modalCalen.modal();
        }

        //ABRIR PDF EN VISTA
        OpenPdfViewer() {
            //console.log('vista')
            let ubicacion: any = global.getData(this.props.ubicacion);
            let entidad: any = global.getData(this.props.entidad);
            let cliente: any = entidad.Cliente ? entidad.Cliente : null;
            let idplaza = ubicacion ? ubicacion.IdPlaza : null;
            let tipovivienda = ubicacion.Segmento ? ubicacion.Segmento.Clave : null;
            let idcliente = cliente ? cliente.ID : null;
            let hipoteca = cliente ? cliente.HipotecaVerde ? 1 : 0 : null;
            if ((idplaza === null || tipovivienda === null || idcliente === null || hipoteca === null) || (idplaza === undefined || tipovivienda === undefined || idcliente === undefined || hipoteca === undefined)) {
                global.info('La informacion del cliente aun no esta lista');
                return;
            }
            let p = { cliente: idcliente, IdPlaza: idplaza, tipo_vivienda: tipovivienda, hipoteca_verde: hipoteca }

            let modalCalen: any = $("#ModalRenderPDFViewer");
            modalCalen.modal();
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');

            global.asyncPost("base/kontrol/reportesFallas/GetBP/GetPDFArrayDataCliente/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        var options = {
                            height: "500px",
                            pdfOpenParams: { view: 'FitV' }
                        };
                        PDFObject.embed("data:application/pdf;base64, " + data, "#pdfviewer", options);
                        cantidadAbiertoPdf++;
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        break;
                }
            });
        }

        getByteArrayFromFile(row) {
            let p = { Imagen: row.data.fullpathimg }
            let tipoArchivo = row.data.TipoArchivo;
            if (tipoArchivo && !tipoArchivo.includes('image') && !tipoArchivo.includes('pdf')) {
                global.info('Formato no soportado para visualizar', 'Atencion');
                return;
            }
            let ruta = tipoArchivo && tipoArchivo.includes('image') ? `base/kontrol/reportesFallas/GetBP/getB64ArchivoEntrega/` : 'base/kontrol/reportesFallas/GetBP/getPdfArchivoEntrega/'
            //console.log(ruta);
            let loader = document.getElementById('loading2');
            let loadedPdf = document.getElementById('loadedDataRenderpdf');
            let loadedImg = document.getElementById('loadedDataRenderImg');

            //console.log(el)
            global.asyncPost(ruta, { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:

                        //console.log(data)
                        loader.style.display = 'none';
                        if (tipoArchivo && tipoArchivo.includes('image')) {
                            loadedImg.style.display = 'block';
                            let el: any = document.getElementById('imgRenderArchAdj');
                            el.src = data;
                        } else {
                            loadedPdf.style.display = 'block';
                            var options = {
                                height: "350px",
                                pdfOpenParams: { view: 'FitV' }
                            };
                            PDFObject.embed("data:application/pdf;base64, " + data, "#pdfviewer2", options);
                        }

                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedPdf.style.display = 'none';
                        loadedImg.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedPdf.style.display = 'none';
                        loadedImg.style.display = 'none';

                        break;
                }
            });
        }

        OpenArchivosEntregaViewer() {
            let entidad: any = global.getData(this.props.entidad);
            let cliente: any = entidad.Cliente ? entidad.Cliente : null;
            let idCliente = cliente ? cliente.ID : null;
            let encodedFilters: string = global.encodeObject({ idCliente });

            let modalCalen: any = $("#ModalRenderArchivosEntrega");
            modalCalen.modal();
            let loader = document.getElementById('loadingAttach');
            let loadedTable = document.getElementById('loadedDataAttach');
            let loadedPdf = document.getElementById('loadedDataRenderpdf');
            let loadedImg = document.getElementById('loadedDataRenderImg');

            global.asyncGet("base/scv/ClientesSPV/GetBP/getBitacoraArchivosEntrega/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:

                        for (let d of data) {
                            d.fullpathimg = d.dbName === 'ek_adm51' ? `\\\\10.1.70.50\\RepositorioEK10\\${d.ImgEvidencia}` : `\\\\10.1.70.52\\RepositorioEK10\\${d.ImgEvidencia}`;
                            d.fullpathimg = d.fullpathimg.replace('KontrolFiles/GetFile/', 'kontrolFiles/');
                            d.fullpathimg = d.fullpathimg.replaceAll('/', '\\');
                        }
                        //console.log(data)
                        let columnas = [
                            { caption: "Tipo agenda", dataField: "btTipoAgenda" },
                            { caption: "Tipo archivo", dataField: "TipoArchivo" },
                            {
                                caption: 'Ver archivo', type: "buttons", width: 120, alignment: "center",
                                buttons: ["Editar", {
                                    text: "ver archivo",
                                    icon: "file",
                                    color: '#000',
                                    hint: "ver archivo",
                                    onClick: (e) => {
                                        this.getByteArrayFromFile(e.row);
                                    }
                                }]
                            }
                        ];
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';

                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
                            },

                            columns: columnas,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: false,
                            rowAlternationEnabled: true
                        }).dxDataGrid("instance");
                        dataGrid.refresh();
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none';
                        loadedPdf.style.display = 'none';
                        loadedImg.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        loadedPdf.style.display = 'none';
                        loadedImg.style.display = 'none';
                        break;
                }
            })
        }

        render(): JSX.Element {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            let entidad: any = global.getData(this.props.entidad);
            let slotState: any = global.getData(this.props.slotState);
            let idEntidad: number = !(slotState && slotState.entidad) ? undefined : slotState.entidad.ID;
            let contratistas: any = this.props.config.getCatalogo(REPORTE_UBICACION_CONTRATISTAS_ID);
            let ubicacion: any = global.getData(this.props.ubicacion);
            let displayAntiguo: boolean = false;
            let badgeAntiguo: string = "badge badge-info";
            let supervisionExterna: number = undefined;
            let appCATEnabled: any = entidad.AppCATEnabled != null && entidad.AppCATEnabled != undefined ? entidad.AppCATEnabled : false;
            if (entidad) {
                if (entidad.Cliente && entidad.Cliente.Antiguedad > 5) {
                    //displayAntiguo = true;
                    badgeAntiguo = "badge badge-danger";
                }
            };
            //console.log(ubicacion)
            //console.log(entidad)

            if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {
                let plaza: any = global.getData(this.props.ubicacion).Plaza;
                // console.log(plaza);
                supervisionExterna = plaza ? plaza.ValidarResponsablePlaza : 0;
            };

            let labelGarantia: any = (value: any) => {
                return (value === undefined || value === null) ? "" : value >= 0 ? "<span class='badge bold' style='background-color: rgb(65, 195, 0);'>" + value + "</span>" : "<span class='badge badge-danger bold'>" + value + "</span>"
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
            let ObservacionesCliente = global.getData(EK.Store.getState().global.currentEntity).ObservacionesServicio;
            let ObservacionesContratista = global.getData(EK.Store.getState().global.currentEntity).ObservacionesContratista;
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
            let permisosList = EK.Store.getState().global.app.data.Permisos;
            let hasEditPermission = permisosList.filter(x => x.Clave === PAGE_ID)[0] !== undefined ? permisosList.filter(x => x.Clave === PAGE_ID)[0].permisos === 8 || permisosList.filter(x => x.Clave === PAGE_ID)[0].permisos === AuthorizePermission.Write ? true : false : false;

            let listaDictamenes = global.getData(EK.Store.getState().global.currentEntity).Dictamenes;
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={<span>
                            <span>Reporte de Fallas</span>
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
                            <label.Entidad id="Cliente" size={[12, 12, 4, 4]} value={(item: any) => {
                                return !item ? "" : (!item.Clave ? "" : "<span class='" + badgeAntiguo + "'>" + item.Clave + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                            }} />
                            <label.Fecha id="FechaCaptura" value={labelFechaCaptura} isHTML={true} size={[12, 12, 4, 2]} />
                            <label.Fecha id="FechaEntregaVivienda" size={[12, 12, 4, 2]} />
                            <label.Label id="MesesTranscurridos" size={[12, 12, 4, 2]} />
                            <Column size={[12, 12, 1, 1]} style={{ paddingTop: 10 }}>
                                <button className="btn btn-default-exp-ek custom-btn-attachment"
                                    onClick={() => this.OpenArchivosEntregaViewer()}>  Archivos adj.
                               </button>
                            </Column>
                            <Column size={[12, 12, 1, 1]} style={{ paddingTop: 10 }}>
                                <button className="btn btn-default-exp-ek custom-btn-expediente"
                                    onClick={() => this.OpenPdfViewer()}>  Expediente</button>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 4, 4]} style={{ paddingTop: 10 }}>
                                <ViewUbicacionCliente lote={ubicacion} />
                            </Column>
                            <Column size={[12, 12, 8, 8]} style={{ paddingTop: 10 }}>
                                <page.OptionSection
                                    id={REPORTE_INFORMACION_ID}
                                    parent={config.id}
                                    level={1}
                                    icon="fa fa-info-circle" collapsed={false}>
                                    <Row>
                                        <label.Fecha id="FechaSolucionReporte" value={labelFechaCustom} size={[12, 12, 3, 3]} />
                                        {/*<label.Fecha label="FECHA TERMINACIÓN" id="FechaTerminacionFolio" value={entidad.FechaTerminacionFolio} size={[12, 12, 3, 3]} />*/}
                                        <label.Fecha label="FECHA TERMINACIÓN" id="FechaTerminacionFolio" value={labelFechaCustom} size={[12, 12, 3, 3]} />
                                        <label.Entidad id="ResponsableConstruccion" size={[12, 12, 6, 6]} />
                                    </Row>
                                    <Row>
                                        <label.Label id="DiasSolucion" size={[12, 12, 3, 3]} />
                                        <label.Label id="DiasContratista" size={[12, 12, 3, 3]} />
                                        <label.Entidad id="MedioSolicitud" size={[12, 12, 6, 6]} />
                                    </Row>
                                    <Row>
                                        <label.Fecha id="FechaContratistaInicial" value={labelFechaCustom} size={[12, 12, 3, 3]} />
                                        <label.Fecha id="FechaContratistaFinal" value={labelFechaCustom} size={[12, 12, 3, 3]} />
                                        {/*supervisionExterna === 1 ? <label.Entidad id="SupervisorContratista" size={[12, 12, 6, 6]} /> : null*/}
                                        <label.Entidad id="CreadoPor" size={[12, 12, 6, 6]} />
                                    </Row>
                                    <Row>
                                        <label.LabelHeight id="ObservacionesServicio" size={[11, 11, 6, 6]} />
                                        <label.LabelHeight id="ObservacionesContratista" size={[11, 11, 6, 6]} />

                                        {/*<label.Label id="ObservacionesServicio" size={[12, 12, 12, 12]} />
                                           <TextArea id="ObservacionesServicio" style={{ readOnly: true }} rows={3} value={ObservacionesCliente} idForm={config.id} size={[12, 12, 12, 12]} />
                                         */}
                                    </Row>
                                    {folioCancelado === 'S' ?
                                        <Row>
                                            <label.Fecha label="Fecha cancelacion" value={fechaCancelado} size={[12, 12, 6, 6]} />
                                            <label.Label label="Motivo cancelacion" value={motivoCancelado} size={[12, 12, 6, 6]} />
                                        </Row> : null}
                                    <Row>
                                        {/*
                                        <TextArea id="ObservacionesContratista" rows={3} value={ObservacionesContratista} idForm={config.id} size={[12, 12, 12, 12]} />
                                        */}
                                        <label.Entidad id="UsuarioProcesoFin" size={[12, 12, 11, 11]} />

                                        <ComentariosOTButton size={[1, 1, 1, 1]} style={{ background: '#3498db', marginTop: '10px', color: '#fff' }} />

                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 8, 8]}>
                                <page.OptionSection
                                    id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                    parent={config.id}
                                    icon="fa fa-users"
                                    level={1} collapsed={false}
                                    subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                                        {[global.getData(contratistas, []).length].join("")}
                                    </span>}>
                                    <PanelUpdate info={contratistas}>
                                        <List
                                            id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                            items={contratistas}
                                            readonly={true}
                                            listHeader={listHeaderContratistas}
                                            formatter={(index: number, item: any) => {
                                                return <Row style={{ margin: 0 }}>
                                                    <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.Clave}</span>{item.Contratista.Descripcion}</Column>
                                                    <Column size={[5, 5, 5, 5]} className="listItem-default-item"><span className="badge badge-info">{item.TipoContratista.Descripcion}</span></Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-center-header">{EK.UX.Labels.yes(item.ContratistaDefault === "S")}</Column>
                                                </Row>
                                            }} />
                                    </PanelUpdate>
                                </page.OptionSection>
                            </Column>
                            <ViewSPVClienteContactos size={[12, 12, 4, 4]} />
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
                                    //console.log(item)
                                    let bgColor: string;
                                    let inputRef: Element;
                                    if (item.PartidaAutorizada === "R" || item.Procede === "N") {
                                        bgColor = "#FFA07A";
                                    };

                                    return <Row id={"row_incidencia_" + item.ID} className="panel-collapsed list-selectable-item" style={{ backgroundColor: bgColor }}>
                                        <Column size={[1, 1, 1, 1]}>
                                            <CollapseButton idElement={"row_incidencia_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />

                                        </Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header text-left"><span className="badge badge-info bold">{item.Partida}</span></Column>
                                        {/*<ColumnDictamen items={item.Dictamenes} size={[1, 1, 1, 1]} />*/}
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-left">{!(item && item.TipoFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.TipoFalla.ID}</span>{item.TipoFalla.Nombre}</span>}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-left">{!(item && item.Falla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Falla.IdFalla}</span>{item.Falla.Descripcion}</span>}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">{!(item && item.UbicacionFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.IdUbicacionFalla}</span>{item.UbicacionFalla.Descripcion}</span>}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow text-center">{!(item && item.Contratista) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</span>}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow text-center">{item.Observaciones}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">{item.CausaFalla ? item.CausaFalla.Descripcion : null}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">{item.CausaFalla ? item.CausaFalla.FallaOrigen.Descripcion : null}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header text-center">
                                            <a id={"a_reincidencias_" + index}>
                                                <span className="badge badge-warning bold">{item.Reincidencias}</span>
                                                <SPVReincidenciasConsulta target={"a_reincidencias_" + index} item={item} idFormSection={REPORTE_FALLAS_ID} />
                                            </a>
                                        </Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow text-center">{item.ObservacionesContratista}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header text-center"><span dangerouslySetInnerHTML={{ __html: labelGarantia(item.DiasGarantia) }}></span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item text-center">{EK.UX.Labels.formatDate(item.TerminoGarantia)}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item text-center">{EK.UX.Labels.formatDate(item.FechaCerrado)}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item text-center">{!(item && item.EstatusPartida) ? null : <span className="badge badge-info">{item.EstatusPartida.Nombre}</span>}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item text-center">&nbsp;</Column>
                                      
                                        <Row>
                                            <Column
                                                xs={{ size: 12 }}
                                                sm={{ size: 12,  }}
                                                md={{ size: 12, }}
                                                lg={{ size: 12, }}
                                                className="panel-detail well well-sm">
                                                <List

                                                    items={item.ListaEvidenciasCte}
                                                    readonly={true}
                                                    listHeader={listHeaderEvidenciasIncidencia}
                                                    addRemoveButton={false}
                                                    formatter={(__index: number, __item: any): any => {
                                                        return <Row  style={{ margin: 0 }}>

                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{__index + 1}</span></Column>

                                                            <Column size={[7, 7, 7, 7]} className="listItem-left-header"><span className="text">{__item.comentario}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">
                                                                <span onClick={() => this.OpenPhotoViewerCte(__item.path)}>
                                                                    <i className="fas fa-eye fa-2x"></i>
                                                                </span>
                                                            </Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>

                                                        </Row>
                                                    }} />
                                            </Column>
                                        </Row>
                                    </Row>
                                }}>
                            </page.SectionList>
                        </Row>
                        <Row>
                            <page.SectionList
                                id={REPORTE_DICTAMENES_ID}
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
                                    let mostrarAlertaEvidencias = false;
                                    let numPartidas: any[] = [];
                                    let partidas: any[] = EK.Store.getState().global.currentEntity.data.Partidas;
                                    for (var i = 0; i < item.IdPartidas.split(",").length; i++) {
                                        let IdPartida: number = item.IdPartidas.split(",")[i];
                                        let partidaNum: any = partidas.filter(
                                            p => p.ID == IdPartida);
                                        numPartidas.push(partidaNum[0].Partida);
                                    }
                                    //console.log(item)
                                    //console.log(partidas);

                                    let hasPerPend = item.Detalles.filter(x => x.Partida.RequierePeritaje === 1);
                                    let estiloPeritaje;
                                    if (hasPerPend !== undefined && hasPerPend.length > 0) {
                                        estiloPeritaje = { background: '#cf6a87', paddingTop: '8px', color: '#fff' }
                                    } else {
                                        estiloPeritaje = {}
                                    }
                                    item.PartidaConPeritajePendite = hasPerPend !== undefined && hasPerPend.length > 0 ? true : false;
                                    let evidenciasTotal = getData(EK.Store.getState().global.catalogo$reporte$evidencias);
                                    let _evidencias = [];
                                    for (let e of evidenciasTotal) {
                                        if (e.Diagnostico === item.ID) {
                                            let sufijo = e.Imagen.substr(0, 2);
                                            switch (sufijo) {
                                                case 'DI':
                                                case 'DR':
                                                case 'AD':
                                                    _evidencias.push(e);
                                                    break;
                                            }
                                        }
                                    }

                                    let totalNoProcede = 0;
                                    //console.log(item)
                                    //if (item.TerminadoCat) {
                                    for (let p of partidas) {
                                        if (p.EstatusDictamen === 'NO PROCEDE') {
                                            totalNoProcede++;
                                        }
                                    }
                                    //}
                                    if (totalNoProcede === partidas.length) {
                                        //if (item.NoProcedeApp) {
                                        //    if (_evidencias.length > 0) {
                                        //        let partidasDictamen = item.IdPartidas.split(",");
                                        //        let sumaEvidenciaDictamen = 0;
                                        //        for (let p of partidasDictamen) {
                                        //            let x = _evidencias.filter(x => x.IdPartida === parseInt(p))[0];
                                        //            if (x === null || x === undefined) {
                                        //                mostrarAlertaEvidencias = true;
                                        //                break;
                                        //            } 
                                        //        }
                                        //    } else {
                                        //        mostrarAlertaEvidencias = true;
                                        //    } 
                                        //}

                                        for (let d of item.Detalles) {
                                            if (d.Partida.NoProcedeApp) {
                                                if (_evidencias.length <= 0) {
                                                    mostrarAlertaEvidencias = true;
                                                } else {
                                                    let x = _evidencias.filter(x => x.IdPartida === d.Partida.ID)[0];
                                                    if (x === null || x === undefined) {
                                                        mostrarAlertaEvidencias = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    return <Row id={"row_dictamen_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item" style={estiloPeritaje}>
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

                                            <Column style={{background:'#fff'}}
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
                                                        let estilo;
                                                        if (_item.Partida.RequierePeritaje === 1) {
                                                            let bgColor = '#6F1E51';
                                                            estilo = { background: bgColor, paddingTop: '5px', paddingBottom: '5px', color: '#fff' }
                                                        } else {
                                                            estilo = { paddingTop: '5px', paddingBottom: '5px', background: '#ced6e0' }
                                                        }
                                                        // console.log(_item)#ecf0f1
                                                        return <Row style={{ background: '#ECEFF1', paddingBottom: '2px', borderBottom:'1px solid #bdc3c7', width:'100%', margin:'auto'}}>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header" style={estilo}><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow" style={estilo}><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow" style={estilo}><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.IdFalla}</span>{_item.Partida.Falla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow" style={estilo}><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{_item.Partida.UbicacionFalla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow" style={estilo}><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow" style={estilo}><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.FallaOrigen.ID}</span>{_item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow" style={estilo}><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.EstatusDictamen}</span></Column>
                                                            <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow" style={{ paddingTop: '10px' }}>
                                                                <label.Label valueClass="label-value-inside"  label="Observaciones de CAT" value={_item.Partida.ObservacionesCat} size={[12, 12, 12, 12]} />
                                                            </Column>
                                                            {_item.Partida.IdContratistaImputable !== null && _item.Partida.IdContratistaImputable !== undefined ?
                                                                <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow" style={{ paddingTop: '2px',paddingBottom:'10px'}}>
                                                                    <p style={{ fontSize: "10px", fontWeight: "bold", paddingLeft: "15px" }}>CONTRATISTA IMPUTABLE</p>
                                                                    <Row>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-left-header" style={{paddingLeft:'30px'}}><span className="badge badge-info bold">{_item.Partida.IdContratistaImputable}</span> {_item.Partida.ContratistaImputable.Nombre}</Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow" style={{}}><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.ContratistaImputable.TipoContrato.Nombre}</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow" style={{ fontSize: "12px", color: "#7c7e97" }}>{"Imputable Falla"}</Column>
                                                                    </Row>
                                                                </Column> : null
                                                            }

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
                                                <KontrolFileManager title="Archivos del Diagnósticos"
                                                    modulo={config.modulo}
                                                    viewMode={true}
                                                    multiple={true}
                                                    entity={global.createSuccessfulStoreObject({ ID: item.ID })}
                                                    entityType={global.createSuccessfulStoreObject(["reporte$dictamenes$", idEntidad].join(""))} />
                                            </Column>
                                        </Row>
                                        {mostrarAlertaEvidencias ?
                                            <Row>
                                                <Column
                                                    xs={{ size: 12 }}
                                                    sm={{ size: 12 }}
                                                    md={{ size: 12 }}
                                                    lg={{ size: 12 }}
                                                    className="panel-detail well well-sm">
                                                    <alerts.Alert type={alerts.AlertTypeEnum.warning} >
                                                        <p style={{ fontSize: 13, fontWeight: "bold" }}> No se cancela el folio porque faltan evidencias de la app</p>
                                                    </alerts.Alert>
                                                </Column>
                                            </Row>
                                            : null}

                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <List

                                                    items={global.createSuccessfulStoreObject(_evidencias)}
                                                    readonly={true}
                                                    listHeader={listHeaderEvidenciasDictamen}
                                                    addRemoveButton={false}
                                                    formatter={(__index: number, __item: any): any => {
                                                        return <Row id={"row_dictamen_" + item.Id} className="panel-collapsed" style={{ margin: 0 }}>

                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{__item.Diagnostico}</span></Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{__item.NoPartida}</span></Column>

                                                            <Column size={[4, 4, 4, 4]} className="listItem-left-header"><span className="text">{__item.Comentarios}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">
                                                                <span onClick={() => this.OpenPhotoViewer(__item.Imagen, __item.Prefijo, __item.ind_archivo, __item.b64Img)}><i className="fas fa-eye fa-2x"></i></span>
                                                            </Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>

                                                        </Row>
                                                    }} />
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
                                //hideNewButton={state.allowSave !== true}
                                hideNewButton={false}
                                items={createSuccessfulStoreObject([])}
                                onAddNew={hasEditPermission ? () => {
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
                                } : undefined}
                               
                                formatter={(index: number, item: any) => {
                                    let partidas: global.DataElement = global.createSuccessfulStoreObject(item.Partidas);
                                    let extraData: any[] = [];
                                    let extraDataPartida: any[] = [];
                                    //console.log(partidas)
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
                                            global.dispatchSuccessful("global-page-data", item.Partidas, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                        }
                                    };
                                    let remove: any = {
                                        icon: "fa fa-trash",
                                        titulo: "Eliminar",
                                        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                                            if (!(item.AgendaDetalle && item.AgendaDetalle.ID)) {
                                                //console.log(id, idParent, item)
                                                this.props.config.setState({ viewMode: false });
                                                this.props.config.updateForm();

                                                let element: DataElement = Forms.getValue(id, idParent);

                                                Forms.updateFormElement(idParent, id, element.removeItem(item));
                                            } else {
                                                global.info("No se puede eliminar la orden de trabajo porque está en proceso de atención.");
                                            }
                                        }
                                    };
                                    let removePartida: any = {
                                        icon: "fa fa-trash",
                                        titulo: "Eliminar",
                                        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                                            //console.log(id, idParent, item);
                                            if (!(item.AgendaDetalle && item.AgendaDetalle.ID)) {
                                                this.props.config.setState({ viewMode: false });
                                                this.props.config.updateForm();

                                                let element: DataElement = Forms.getValue(id, idParent);
                                                //console.log(element)
                                                //Forms.updateFormElement(idParent, id, element.removeItem(item));
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
                                            this.props.config.setState({ viewMode: false, idOrden: null, workMode: true, FechaInicioReal: item.FechaInicioReal, FechaFinReal: item.FechaFinReal, TerminadoCat: item.TerminadoCat }, id);
                                            Forms.remove(id);
                                            Forms.updateFormElements(id, item);
                                            global.dispatchSuccessful("global-page-data", item.Partidas, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                        }
                                    };
                                    let appointment: any = {
                                        icon: "fa fa-calendar",
                                        titulo: "Planificar OT",
                                        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                                            delete EK.Store.getState().global.TryReplanificarOT;
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
                                            delete EK.Store.getState().global.TryReplanificarOT;
                                            this.props.config.setState({ viewMode: false, action: { name: "onPlanificacion", data: EditItem } });
                                            this.props.config.updateForm();
                                        }
                                    }

                                    let ReAppointment: any = {
                                        icon: "fa fa-calendar-day",
                                        titulo: "ReAgendar OT",
                                        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                                            dispatchSuccessful('load::TryReplanificarOT', true);
                                            this.props.config.setState({ viewMode: false, action: { name: "onPlanificacion", data: EditItem } });
                                            this.props.config.updateForm();
                                        }
                                    }

                                    enum PermisosUsuario {
                                        None = 0,
                                        Read = 1,
                                        Read_Edit = 2,
                                        Read_Edit_Add = 4,
                                        Read_Edit_Add_Del = 8
                                    }
                                    let currentPermisos = EK.Store.getState().global.app && EK.Store.getState().global.app.data ? EK.Store.getState().global.app.data.Permisos : [];
                                    let permiso = currentPermisos.length > 0 && currentPermisos.filter(x => x.Clave === config.id)[0] !== undefined ? currentPermisos.filter(x => x.Clave === config.id)[0].permisos : 0;
                                    //console.log(config.id)
                                    //console.log(currentPermisos)
                                    //console.log(permiso)
                                    if (displayAntiguo === false && state.allowSave === true ) {
                                        if (item.EstatusOrdenTrabajo.Clave === "N") {
                                            if (permiso >= PermisosUsuario.Read_Edit) {
                                                extraData.push(edit);
                                                extraData.push(appointment);
                                                if (item.IdAgenda !== null) {
                                                    extraData.push(newAppointment);
                                                }
                                            }
                                            if (permiso >= PermisosUsuario.Read) {
                                                extraData.push(printOT);
                                            }
                                            if (permiso >= PermisosUsuario.Read_Edit_Add_Del) {
                                                extraData.push(remove);
                                            }

                                        } else if (item.EstatusOrdenTrabajo.Clave === "E") {
                                            if (permiso >= PermisosUsuario.Read_Edit) {
                                                extraData.push(edit);
                                                extraData.push(appointment);
                                                if (item.IdAgenda !== null) {
                                                    extraData.push(ReAppointment);
                                                }
                                                extraData.push(workOT);
                                            }
                                            if (permiso >= PermisosUsuario.Read) {
                                                extraData.push(printOT);
                                            }
                                        }
                                    }
                                    if (item.EstatusOrdenTrabajo.Clave === "T" || item.EstatusOrdenTrabajo.Clave === "C") {
                                        if (permiso >= PermisosUsuario.Read) {
                                            extraData.push(printOT);
                                        }
                                        //console.log(item)
                                    };
                                    //console.log(item);
                                    //console.log(entidad);
                                    //console.log(state)
                                    

                                    let listaDictamenes = global.getData(EK.Store.getState().global.currentEntity).Dictamenes;
                                    let evidenciasTotal = getData(EK.Store.getState().global.catalogo$reporte$evidencias);
                                    let HistorialTotalOT = getData(EK.Store.getState().global.catalogo$reporte$historialfechasot);
                                    let _evidencias = [];
                                    //let _evidencias = evidenciasTotal.filter(x => x.OrdenTrabajo === item.ID && x.Diagnostico === 0 && x.IdPartida === 0);
                                    for (let e of evidenciasTotal) {
                                        if (e.OrdenTrabajo === item.ID) {
                                            let sufijo = e.Imagen.substr(0, 2);
                                            switch (sufijo) {
                                                case 'TR':
                                                case 'OR':
                                                case 'TT':
                                                case 'AO':
                                                    _evidencias.push(e);
                                                    break;
                                            }
                                        }
                                    }
                                    let _historialot = HistorialTotalOT.filter(x => x.IdExpediente === item.ID);
                                    //console.log(HistorialTotalOT,_historialot)
                                    // console.log(evidenciasTotal, _evidencias);
                                    //console.log(item)
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
                                                xs={{ size: 12 }}
                                                sm={{ size: 12 }}
                                                md={{ size: 12 }}
                                                lg={{ size: 12 }}
                                                className="panel-detail well well-sm">
                                                <List
                                                    items={partidas}
                                                    readonly={true}
                                                    listHeader={listHeaderOrdenTrabajoPartidas}
                                                    addRemoveButton={false}
                                                    formatter={(_index: number, _item: any): any => {
 
                                                        let selectedIncidencia = EK.Store.getState().global.catalogo$reporte$fallas ? EK.Store.getState().global.catalogo$reporte$fallas.data.filter(x => x.ID === _item.Partida.ID)[0] : null;
                                                        _item.ResponsableDictamen = item.NombreCatResponsable
                                                        if (selectedIncidencia !== null) {
                                                          _item.Partida.IdContratistaImputable = selectedIncidencia.IdContratistaImputable;
                                                          _item.Partida.ContratistaImputable = selectedIncidencia.ContratistaImputable;

                                                        }
                                                        return <Row>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.IdFalla}</span>{_item.Partida.Falla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{_item.Partida.UbicacionFalla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.FallaOrigen.ID}</span>{_item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{_item.ResponsableDictamen}</Column>
                                                            <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow" style={{ paddingTop: '10px' }}>
                                                                <label.Label label="Observaciones de CAT en App" value={_item.ObservacionesCat} size={[12, 12, 12, 12]} />
                                                            </Column>
                                                            {_item.Partida.IdContratistaImputable !== null && _item.Partida.IdContratistaImputable !== undefined ?
                                                                <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow" style={{ paddingTop: '10px', border: "1px solid #ECEFF1" }}>
                                                                    <p style={{ fontSize: "10px", fontWeight: "bold", paddingLeft: "15px" }}>CONTRATISTA IMPUTABLE</p>
                                                                    <Row>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-center-header" style={{}}><span className="badge badge-info bold">{_item.Partida.IdContratistaImputable}</span> {_item.Partida.ContratistaImputable.Nombre}</Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow" ><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.ContratistaImputable.TipoContrato.Nombre}</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow" style={{ fontSize: "12px", color: "#7c7e97"  }}>{"Imputable Falla"}</Column>
                                                                    </Row>
                                                                </Column> : null
                                                            }

                                                        </Row>
                                                    }} />
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <List
                                                    items={global.createSuccessfulStoreObject(_historialot)}
                                                    readonly={true}
                                                    listHeader={listHeaderHistorialFechasOT}
                                                    addRemoveButton={false}
                                                    formatter={(_indexH: number, _itemH: any): any => {
                                                        //console.log(_itemH);
                                                        return <Row id={"row_OT_Historial"} className="panel-collapsed" style={{ margin: 0 }}>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                                                            <Column size={[3, 3, 3, 3]} className="listItem-center-header"><span className="text"> {global.formatDateTimeDirect(_itemH.FechaInicio, true)}</span></Column>
                                                            <Column size={[3, 3, 3, 3]} className="listItem-center-header"><span className="text">{global.formatDateTimeDirect(_itemH.FechaFin, true)}</span></Column>
                                                            <Column size={[4, 4, 4, 4]} className="listItem-center-header"><span className="badge badge-info bold">{_itemH.Descripcion}</span></Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                                                        </Row>
                                                    }} />
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <List

                                                    items={global.createSuccessfulStoreObject(_evidencias)}
                                                    readonly={true}
                                                    listHeader={listHeaderEvidenciasOT}
                                                    addRemoveButton={false}
                                                    formatter={(__index: number, __item: any): any => {
                                                        //console.log(__item)
                                                        return <Row id={"row_OT_" + item.Id} className="panel-collapsed" style={{ margin: 0 }}>

                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{__item.OrdenTrabajo}</span></Column>

                                                            <Column size={[7, 7, 7, 7]} className="listItem-left-header"><span className="text">{__item.Comentarios}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">
                                                                <span onClick={() => this.OpenPhotoViewer(__item.Imagen, __item.Prefijo, __item.ind_archivo, __item.b64Img)}><i className="fas fa-eye fa-2x"></i></span>
                                                            </Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>

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
        verificarComentariosIndispensables?: (idCliente: number) => void;
        verificarIndicadorCliente?: (idCliente: number) => void;
        calcularPartida?: (partida: any, reporte: any) => void;
        calcularReincidencias?: (partida: any) => void;
        cliente?: global.DataElement;
        ubicacion?: global.DataElement;
        etapa?: global.DataElement;
        contratistas?: global.DataElement;
        contacto?: global.DataElement;
        componente?: any;
        ubicacionFalla?: any;
        obsclientepta?: any;
        partida?: global.DataElement;
        partidaInforme?: global.DataElement;
        slotState?: global.DataElement;
        slotsMoverContacto?: any;
        slotsMoverFallas?: any;
        slotsMoverOT?: any;
        slotsMoverDictamenes?: any;
        listaEvidenciascliente?: any;
    };

    export let TextAreaContainer: any = global.connect(class extends React.Component<IEditProps, {}> {
        render(): JSX.Element {
            return <Row>
                <TextArea id="ObservacionesContratista" rows={2} idForm={config.id} size={[6, 6, 6, 6]} />
                <ComentariosOTButton size={[1, 1, 1, 1]} style={{ background: '#3498db', marginTop: '10px', color: '#fff' }} />
            </Row>
        };
    });

    let Edit: any = global.connect(class extends React.Component<IEditProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.cliente = Forms.getDataValue("Cliente", config.id, state);
            retValue.ubicacion = state.global.entity$reporte$ubicacion;
            retValue.etapa = state.global.entity$reporte$cliente$etapa;
            retValue.contratistas = state.global.catalogo$reporte$ubicacion$contratistas;
            retValue.contacto = state.global.catalogo$reporte$contacto;
            retValue.componente = Forms.getValue("Falla", REPORTE_FALLAS_ID, state);
            retValue.ubicacionFalla = Forms.getValue("UbicacionFalla", REPORTE_FALLAS_ID, state);
            retValue.obsclientepta = Forms.getValue("Observaciones", REPORTE_FALLAS_ID, state);

            retValue.partida = state.global.entity$reporte$partida;
            retValue.partidaInforme = state.global.entity$reporte$partida$informe;
            retValue.slotState = state.global.state$reporte$fallas;
            retValue.slotsMoverContacto = state.global.state$reporte$contacto;
            retValue.slotsMoverFallas = state.global.state$reporte$fallas;
            retValue.slotsMoverOT = state.global.state$reporte$ordenTrabajo;
            retValue.slotsMoverDictamenes = state.global.state$reporte$dictamenes;
            retValue.listaEvidenciascliente = state.global.tmpEvidenciaCliente;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerLote: (idUbicacion: number): void => {
                let encodedFilters: string = global.encodeObject({ id: idUbicacion });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, REPORTE_UBICACION_ID);
            },
            obtenerEtapa: (idCliente: number, fechaReporte: Date): void => {
                let encodedFilters: string = global.encodeObject({ idCliente, fechaReporte: fechaReporte.toISOString() });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetClienteEtapa/" + encodedFilters, REPORTE_CLIENTE_ETAPA);
            },
            obtenerContratistas: (idUbicacion: number): void => {
                let url: string = global.encodeAllURL("scv", "ContratistasUbicaciones", { idUbicacion });
                // console.log(url);
                global.dispatchAsync("global-page-data", url, REPORTE_UBICACION_CONTRATISTAS_ID);
            },
            obtenerResponsablesDictamen: (pza): void => {
                let encodedFilters: string = global.encodeObject({ plaza: pza, nivel: '134' });
                dispatchAsync('global-page-data', 'base/kontrol/usuarios/all/' + encodedFilters, REPORTE_RESPONSABLESCAT_ID);
            },
            obtenerContacto: (idCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente });
                global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/GetBP/GetContactoCliente/" + encodedFilters, REPORTE_CONTACTO_ID);
            },
            calcularPartida: (partida: any, reporte: any): void => {
                global.dispatchAsyncPost("global-page-entity", "scv/reportesFallas/calcularPartida/", { partida, reporte }, REPORTE_PARTIDA);
            },
            calcularReincidencias: (partida: any): void => {
                global.dispatchAsyncPost("global-page-entity", "scv/reportesFallas/calcularReincidencias/", { partida }, REPORTE_PARTIDA_INFORME);
            },
            verificarComentariosIndispensables: (idCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente, OperacionEspecificaSP: "BitacoraCompleta" });
                let btnbitacora = document.getElementById('btn_bitacora');
                btnbitacora.classList.remove("btn-income-data");
                global.asyncGet("base/scv/BitacoraClienteSPV/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            //console.log(data);
                            let totalNoVerificado = 0;
                            let cl = EK.Store.getState().global.listaVerificadoLocal ? EK.Store.getState().global.listaVerificadoLocal.data : [];
                            for (let d of data) {
                                if (d.verificado === false || d.verificado === 0) {
                                    if (d.alertaFija) {
                                        if (cl.filter(x => x.idcomentario === d.ID)[0] === undefined) {
                                            btnbitacora.classList.add("btn-income-data");
                                            totalNoVerificado++;
                                        }
                                    } else {
                                        btnbitacora.classList.add("btn-income-data");
                                        totalNoVerificado++;
                                    }


                                    //break;
                                }
                            }
                            dispatchSuccessful('load::TotalComentariosRevisar', totalNoVerificado);
                            break;
                    }
                });
            },      
            
            verificarIndicadorCliente: (idCliente: number): void => {
                let p: any = { idCliente };
                let btnIndicador = document.getElementById('btn_indicador_cte');
                //btnIndicador.classList.remove("btn-income-data");
                //btnIndicador.classList.add("btn-income-data");
                //console.log(p)
                global.asyncPost(`base/kontrol/reportesFallas/GetBP/GetIndicadorCliente/`, { parametros:p}, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            //console.log(data)
                            if (data) {
                                switch (data) {
                                    case 'Alto Riesgo':
                                        btnIndicador.style.background = '#e74c3c';
                                        btnIndicador.title = data;
                                        break;
                                    case 'Riesgo':
                                        btnIndicador.style.background = '#eb953f';
                                        btnIndicador.title = data;
                                        break;
                                    case 'Posible Riesgo':
                                        btnIndicador.style.background = '#f1c40f';
                                        btnIndicador.title = data;
                                        break;
                                    default:
                                        btnIndicador.style.background = '#E1E5EC';
                                        btnIndicador.title = data;
                                        break;
                                }
                            }
                            break;
                    }
                });
            }
        });

        getByteArrayFromFile(row) {
            let p = { Imagen: row.data.fullpathimg }
            let tipoArchivo = row.data.TipoArchivo;
            if (tipoArchivo && !tipoArchivo.includes('image') && !tipoArchivo.includes('pdf')) {
                global.info('Formato no soportado para visualizar', 'Atencion');
                return;
            }
            let ruta = tipoArchivo && tipoArchivo.includes('image') ? `base/kontrol/reportesFallas/GetBP/getB64ArchivoEntrega/` : 'base/kontrol/reportesFallas/GetBP/getPdfArchivoEntrega/'
            //console.log(ruta);
            let loader = document.getElementById('loading2');
            let loadedPdf = document.getElementById('loadedDataRenderpdf');
            let loadedImg = document.getElementById('loadedDataRenderImg');

            //console.log(el)
            global.asyncPost(ruta, { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:

                        //console.log(data)
                        loader.style.display = 'none';
                        if (tipoArchivo && tipoArchivo.includes('image')) {
                            loadedImg.style.display = 'block';
                            let el: any = document.getElementById('imgRenderArchAdj');
                            el.src = data;
                        } else {
                            loadedPdf.style.display = 'block';
                            var options = {
                                height: "350px",
                                pdfOpenParams: { view: 'FitV' }
                            };
                            PDFObject.embed("data:application/pdf;base64, " + data, "#pdfviewer2", options);
                        }

                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedPdf.style.display = 'none';
                        loadedImg.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedPdf.style.display = 'none';
                        loadedImg.style.display = 'none';

                        break;
                }
            });
        }

        OpenArchivosEntregaViewer() {
            let cliente: any = global.getData(this.props.cliente);
            let idCliente = cliente ? cliente.ID : null;
            let encodedFilters: string = global.encodeObject({ idCliente });

            let modalCalen: any = $("#ModalRenderArchivosEntrega");
            modalCalen.modal();
            let loader = document.getElementById('loadingAttach');
            let loadedTable = document.getElementById('loadedDataAttach');
            let loadedPdf = document.getElementById('loadedDataRenderpdf');
            let loadedImg = document.getElementById('loadedDataRenderImg');

            global.asyncGet("base/scv/ClientesSPV/GetBP/getBitacoraArchivosEntrega/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:

                        for (let d of data) {
                            d.fullpathimg = d.dbName === 'ek_adm51' ? `\\\\10.1.70.50\\RepositorioEK10\\${d.ImgEvidencia}` : `\\\\10.1.70.52\\RepositorioEK10\\${d.ImgEvidencia}`;
                            d.fullpathimg = d.fullpathimg.replace('KontrolFiles/GetFile/', 'kontrolFiles/');
                            d.fullpathimg = d.fullpathimg.replaceAll('/', '\\');
                        }
                        //console.log(data)
                        let columnas = [
                            { caption: "Tipo agenda", dataField: "btTipoAgenda" },
                            { caption: "Tipo archivo", dataField: "TipoArchivo" },
                            {
                                caption: 'Ver archivo', type: "buttons", width: 120, alignment: "center",
                                buttons: ["Editar", {
                                    text: "ver archivo",
                                    icon: "file",
                                    color: '#000',
                                    hint: "ver archivo",
                                    onClick: (e) => {
                                        this.getByteArrayFromFile(e.row);
                                    }
                                }]
                            }
                        ];
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';

                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
                            },

                            columns: columnas,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: false,
                            rowAlternationEnabled: true
                        }).dxDataGrid("instance");
                        dataGrid.refresh();
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none';
                        loadedPdf.style.display = 'none';
                        loadedImg.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        loadedPdf.style.display = 'none';
                        loadedImg.style.display = 'none';
                        break;
                }
            })
        }
        OpenPdfViewer() {
            let ubicacion: any = global.getData(this.props.ubicacion);
            let cliente: any = global.getData(this.props.cliente);
            let idplaza = ubicacion ? ubicacion.IdPlaza : null;
            let tipovivienda = ubicacion.Segmento ? ubicacion.Segmento.Clave : null;
            let idcliente = cliente ? cliente.ID : null;
            let hipoteca = cliente ? cliente.HipotecaVerde ? 1 : 0 : null;
            if ((idplaza === null || tipovivienda === null || idcliente === null || hipoteca === null) || (idplaza === undefined || tipovivienda === undefined || idcliente === undefined || hipoteca === undefined)) {
                global.info('La informacion del cliente aun no esta lista');
                return;
            }
           
            let p = { cliente: idcliente, IdPlaza: idplaza, tipo_vivienda: tipovivienda, hipoteca_verde: hipoteca }
            let modalCalen: any = $("#ModalRenderPDFViewer");
            modalCalen.modal();
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            global.asyncPost("base/kontrol/reportesFallas/GetBP/GetPDFArrayDataCliente/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        var options = {
                            height: "500px",
                            pdfOpenParams: { view: 'FitV' }
                        };
                        PDFObject.embed("data:application/pdf;base64, " + data, "#pdfviewer", options);
                        cantidadAbiertoPdf++;
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        break;
                }
            });
        }

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
                    this.props.obtenerLote(cliente.IdUbicacion);
                    this.props.obtenerContratistas(cliente.IdUbicacion);
                    this.props.obtenerContacto(cliente.ID);
                    console.log(cliente);
                    let url: string = global.encodeAllURL("scv", "UbicacionesFalla", { activos: 1, usoFalla: "Ubicacion", lote_id: cliente.IdUbicacion});
                    global.dispatchAsync("load::ubicaciones$fallas", url);

                    // console.log(this.props.entidad)
                    // console.log(nextProps.entidad)
                    let Folio = EK.Store.getState().global.currentEntity.data.ID;
                    if (Folio < 0 || Folio === null) {
                        this.props.verificarComentariosIndispensables(cliente.ID);
                        this.props.verificarIndicadorCliente(cliente.ID);
                    }
                    let encodedFilters = global.encodeObject({ idCliente: cliente.ID, OperacionEspecificaSP: "BitacoraCompleta" });
                    global.dispatchAsync("global-page-data", "base/scv/BitacoraClienteSPV/all/" + encodedFilters, REPORTE_BITACORA_DETALLE_ID);

                    if (global.getDataID(nextProps.entidad) <= 0) {
                        if (cliente && cliente.Antiguedad > 5) {
                            global.dispatchSuccessful("global-page-data", [], REPORTE_FALLAS_ID);
                            global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_ID);
                        };
                        //
                        this.props.obtenerEtapa(cliente.ID, global.getToday());
                        //
                        Forms.updateFormElement(config.id, "SupervisorContratista", undefined);
                    };

                    
                }
                else {
                    //console.log('cliente cambiado: ', nextProps.cliente)
                    //console.log(this.props.entidad)
                    //console.log(nextProps.entidad)
                    if (nextProps.cliente === null || nextProps.cliente === undefined || nextProps.cliente.data === null || nextProps.cliente.data === undefined) {
                        let entidad = nextProps.entidad && nextProps.entidad.data ? nextProps.entidad.data : null;
                        if (entidad && entidad.ID < 0 || entidad && entidad.ID === null) {
                            try {
                                let btnIndicador = document.getElementById('btn_indicador_cte');
                                btnIndicador.style.background = '#E1E5EC';
                                btnIndicador.title = '';
                                let btnbitacora = document.getElementById('btn_bitacora');
                                btnbitacora.classList.remove("btn-income-data");
                            }
                            catch (ex) { }
                        }
                    }

                    if (nextProps.cliente.data === undefined || nextProps.cliente.data === null) {
                        if (EK.Store.getState().global.tmpUnsavedModel !== undefined) {
                            //console.log('borrar la informacion del usuario')
                            delete EK.Store.getState().global.tmpUnsavedModel;
                        }
                    }
                }
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

            if (hasChanged(this.props.state, nextProps.state)) {
                if (nextProps.state.data && nextProps.state.data.viewMode === false) {
                    let partidas = nextProps.entidad && nextProps.entidad.data && nextProps.entidad.data.Partidas ? nextProps.entidad.data.Partidas:[];
                    console.log(partidas)
                    if (partidas.length > 0) {
                        let savedArrayTmp = [];
                        for (let p of partidas) {
                            let partidaArrayEv = [];
                            if (p.ListaEvidenciasCte && p.ListaEvidenciasCte.length > 0) {
                                for (let ev of p.ListaEvidenciasCte) {
                                    savedArrayTmp.push(ev);
                                }

                            }
                        }
                        dispatchSuccessful('load::tmpEvidenciaCliente', savedArrayTmp);
                        //for (let p of partidas) {
                        //    p.ListaEvidenciasCte = null;
                        //}
                        //global.dispatchSuccessful('global-page-data', partidas, REPORTE_FALLAS_ID)
                    }
                }
            }



            ////if (nextProps.listaEvidenciascliente) {
            ////    if (nextProps.listaEvidenciascliente.data
            ////        && nextProps.listaEvidenciascliente.data.length > 0) {
            ////        console.log(this.props.listaEvidenciascliente)
            ////        console.log(nextProps.listaEvidenciascliente)
            //        if (hasChanged(this.props.listaEvidenciascliente, nextProps.listaEvidenciascliente)) {
            //            console.log(this.props.listaEvidenciascliente)
            //            console.log(nextProps.listaEvidenciascliente)
            //            let partidas: any[] = global.getData(Forms.getValue(REPORTE_FALLAS_ID, config.id), []);
            //            for (let p of partidas) {
            //                let evidenciasCte = nextProps.listaEvidenciascliente.data.filter(x => x.item.EntityId === p.ID);
            //                p.ListaEvidenciasCte = evidenciasCte;
            //            }
            //            console.log(this.props.partida)
            //            console.log('se agrega nueva evidencia')
            //            global.dispatchSuccessful('global-page-data', partidas, REPORTE_FALLAS_ID)

            //        }
                   
            //    //}
                
            ////}
        };

        hasChangedEvidenciasCliente(oldEvidencia, newEvidencia) {
            let oldEv = oldEvidencia && oldEvidencia !== undefined && oldEvidencia.data ? oldEvidencia.data : [];
            let newEv = newEvidencia && newEvidencia !== undefined && newEvidencia.data ? newEvidencia.data : [];
            console.log(oldEv)
            console.log(newEv)
                if (oldEv.length !== newEv.length) {
                    return true;
                }
                else {
                    let totalIndiceOld = oldEv.filter(x => x.id).length;
                    let totalIndiceNew = newEv.filter(x => x.id).length;
                    if (totalIndiceNew !== totalIndiceOld) {
                        return true;
                    }
                    else {
                        let hasDiff = false;
                        for (let ev of oldEv) {
                            let newev = newEv.filter(x => x.id === ev.id)[0];
                            if (newev === undefined) {
                                hasDiff = true;
                                break;
                            } else {
                                newev.comentario = newev.comentario ? newev.comentario : '';
                                ev.comentario = ev.comentario ? ev.comentario : '';
                                if (newev.comentario !== ev.comentario) {
                                    hasDiff = true;
                                    break;
                                }
                            }
                        }
                        return hasDiff
                    }
                }

        }

      
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
            //console.log(this.props.listaEvidenciascliente)
           // console.log(nextProps.listaEvidenciascliente)
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.cliente, nextProps.cliente) ||
                hasChanged(this.props.ubicacion, nextProps.ubicacion) ||
                hasChanged(this.props.etapa, nextProps.etapa) ||
                hasChanged(this.props.contratistas, nextProps.contratistas) ||
                hasChanged(this.props.contacto, nextProps.contacto) ||
                this.hasChanged(this.props.componente, nextProps.componente) ||
                this.hasChanged(this.props.ubicacionFalla, nextProps.ubicacionFalla) ||
                this.hasChanged(this.props.obsclientepta, nextProps.obsclientepta) ||
                hasChanged(this.props.partida, nextProps.partida) ||
                hasChanged(this.props.partidaInforme, nextProps.partidaInforme) ||
                hasChanged(this.props.slotState, nextProps.slotState) ||
                hasChanged(this.props.listaEvidenciascliente, nextProps.listaEvidenciascliente)
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
                        //console.log('Seleccionar compoente')
                        let partida: any = Forms.getValues(REPORTE_FALLAS_ID);
                        let reporte: any = Forms.getForm()
                            .addID()
                            .addDate("FechaCaptura")
                            .addDate("FechaEntregaVivienda")
                            .addVersion()
                            .toObject();
                        //console.log(partida,reporte)
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

        noProcedePorVigencia(ev) {
            let procedeIncidencia: any = Forms.getValue("noProcedePorVigencia", REPORTE_FALLAS_ID);
            //console.log(procedeIncidencia)
            let btn = document.getElementById(`${REPORTE_FALLAS_ID}_saveButtonKey`);
            //console.log(btn);
            if (btn !== null && btn !== undefined) {
                let icono = btn.querySelector('i');
                if (icono !== null && icono !== undefined) {
                    icono.classList.remove(procedeIncidencia? 'fa-check':'fa-save');
                    icono.classList.add(procedeIncidencia ? 'fa-save' : 'fa-check');
                }
                //console.log(icono)
            }
            
            //Forms.updateFormElement(REPORTE_FALLAS_ID, "noProcedePorVigencia", !procedeIncidencia);
            //let procedeIncidencia2: any = Forms.getValue("noProcedePorVigencia", REPORTE_FALLAS_ID);
            //console.log(procedeIncidencia2);
            //console.log(form);
        }

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
            //console.log(entidad)
            if (cliente && cliente.Antiguedad > 5) {
                displayAntiguo = true;
                badgeAntiguo = "badge badge-danger";
            };
            //
            const handleClick = (ev) => {
                console.log('Botón clickeado');
            };

            if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {
                idPlaza = global.getData(this.props.ubicacion).IdPlaza;
                idFraccionamiento = global.getData(this.props.ubicacion).DesarrolloClave;
                let plaza: any = global.getData(this.props.ubicacion).Plaza;
                supervisionExterna = plaza ? plaza.ValidarResponsablePlaza : 0;

                let segmento: any = global.getData(this.props.ubicacion).Segmento;
                tipoVivienda = segmento ? segmento.IdTipoVivienda : null;
            };
            //
            if (entidad.IdEstatusReporte === "N" || entidad.IdEstatusReporte === "M") {
                editCampos.ObservacionesServicio = true;
                editCampos.ObservacionesContratista = true;
                editCampos.TipoFalla = true;
                editCampos.Falla = true;
                editCampos.UbicacionFalla = true;

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
                        global.fixJsonDates(item);
                        Forms.remove(id);
                        Forms.updateFormElements(id, item);
                        console.log(id)
                        console.log(item)

                        let isNew: boolean = item.EstatusPartida.Clave === "N";
                        this.props.config.setState({ viewMode: false, isNew, entidad: item }, id);
                        if (item.noProcedePorVigencia) {
                            this.noProcedePorVigencia(id);
                        }
                    };
                }
            };
            //
            let authorize: any = {
                icon: "icon-check",
                titulo: "Autorizar incidencia",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    //this.setState({ AuthMode: true });
                    dispatchSuccessful('load::IncidenciaAutorizar', item);
                    let modalAuth: any = $("#ModalAutorizarIncidencia");
                    modalAuth.modal();
                    //if (ReporteUtils.fnHasOrdenes(item.ID)) {
                    //    global.info("La incidencia no se puede editar porque se encuentra asignada a una orden de trabajo.");
                    //} else {
                    //    global.fixJsonDates(item);
                    //    Forms.remove(id);
                    //    Forms.updateFormElements(id, item);

                    //    let isNew: boolean = item.EstatusPartida.Clave === "N";
                    //    this.props.config.setState({ viewMode: false, isNew, entidad: item }, id);
                    //};
                }
            };
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
                return (value === undefined || value === null) ? "" : value >= 0 ? "<span class='badge bold' style='background-color: rgb(65, 195, 0);'>" + value + "</span>" : "<span class='badge badge-danger bold'>" + value + "</span>"
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
            //let procede = Forms.getValue("noProcedePorVigencia", REPORTE_FALLAS_ID);
            let reMessage: JSX.Element;
            let checkBoxProcede: JSX.Element;


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

           

            let hasErrorForms = Forms.getForm(REPORTE_FALLAS_ID) && Forms.getForm(REPORTE_FALLAS_ID).formData.errors && Forms.getForm(REPORTE_FALLAS_ID).formData.errors.length > 0 ? true : false;
           // console.log(hasErrorForms)
             try {
                   let diasGarantiaVigencia: any = Forms.getValue("DiasGarantia", REPORTE_FALLAS_ID);
                 // console.log(diasGarantiaVigencia)
                 if (diasGarantiaVigencia && diasGarantiaVigencia !== undefined && diasGarantiaVigencia < 0  && !hasErrorForms) {
                        checkBoxProcede = <checkBox.CheckBox id="noProcedePorVigencia" label="No procede por vigencia" idFormSection={REPORTE_FALLAS_ID} size={[12, 12, 12, 12]} change={() => this.noProcedePorVigencia(event)} />
                   };
             } catch (e) { };
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={<span>
                            <span>Reporte de Fallas</span>
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
                                <select.ClientesLotesSPV key={"Cliente"} idForm={config.id} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} /> :
                                <label.Entidad id="Cliente" size={[12, 12, 4, 4]} value={(item: any) => {
                                    return !item ? "" : (!item.Clave ? "" : "<span class='" + badgeAntiguo + "'>" + item.Clave + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                                }} />
                            }
                            <label.Fecha id="FechaCaptura" value={labelFechaCaptura} isHTML={true} size={[12, 12, 4, 2]} />
                            <label.Fecha id="FechaEntregaVivienda" size={[12, 12, 4, 2]} />
                            <label.Label id="MesesTranscurridos" size={[12, 12, 4, 2]} />
                            <Column size={[12, 12, 1, 1]} style={{ paddingTop: 10 }}>
                                <button className="btn btn-default-exp-ek  custom-btn-attachment"
                                    onClick={() => this.OpenArchivosEntregaViewer()}>  Archivos adj.
                               </button>
                            </Column>
                            <Column size={[12, 12, 1, 1]} style={{ paddingTop: 10 }}>
                                <button className="btn btn-default-exp-ek custom-btn-expediente"
                                    onClick={() => this.OpenPdfViewer()}>  Expediente</button>
                            </Column>
                        </Row>

                        <Row>
                            <Column size={[12, 12, 4, 4]} style={{ paddingTop: 10 }}>
                                <ViewUbicacionCliente lote={lote} />
                            </Column>
                            <Column size={[12, 12, 8, 8]} style={{ paddingTop: 10 }}>
                                <page.OptionSection
                                    id={REPORTE_INFORMACION_ID}
                                    parent={config.id}
                                    level={1}
                                    icon="fa fa-info-circle" collapsed={false}>
                                    <Row>
                                        <label.Fecha id="FechaSolucionReporte" value={labelFechaCustom} size={[3, 3, 3, 3]} />
                                        <label.Fecha id="FechaSolucionTerminacion" value={entidad.FechaTerminacionFolio} size={[3, 3, 3, 3]} />
                                        <ResponsablesConstruccionDDL id="ResponsableConstruccion" size={[6, 6, 6, 6]} required={true} validations={[validations.required()]} />
                                    </Row>
                                    <Row>
                                        <label.Label id="DiasSolucion" size={[3, 3, 3, 3]} />
                                        <label.Label id="DiasContratista" size={[3, 3, 3, 3]} />
                                        <ddl.SPVMediosComunicacionDDL id="MedioSolicitud" size={[6, 6, 6, 6]} required={true} />
                                    </Row>
                                    <Row>
                                        <label.Fecha id="FechaContratistaInicial" value={labelFechaCustom} size={[3, 3, 3, 3]} />
                                        <label.Fecha id="FechaContratistaFinal" value={labelFechaCustom} size={[3, 3, 3, 3]} />
                                        {/*supervisionExterna === 1 ? <SPVContratistasConsulta id="SupervisorContratista" label="Supervisión Externa" idPlaza={idPlaza} size={[6, 6, 6, 6]} required={true} validations={[validations.required()]} /> : null*/}
                                    </Row>
                                    <Row>
                                        {editCampos.ObservacionesServicio === true ?
                                            <TextArea id="ObservacionesServicio" rows={2} idForm={config.id} size={[6, 6, 6, 6]} /> :
                                            <label.Label id="ObservacionesServicio" size={[12, 12, 12, 12]} />
                                        }

                                    </Row>
                                    <Row>
                                        {editCampos.ObservacionesContratista === true ?
                                            //<TextAreaContainer /> 
                                            <span>
                                                <TextArea id="ObservacionesContratista" rows={2} idForm={config.id} size={[6, 6, 6, 6]} />
                                                <ComentariosOTButton size={[1, 1, 1, 1]} style={{ background: '#3498db', marginTop: '10px', color: '#fff' }} />
                                            </span>
                                            :
                                            <label.Label id="ObservacionesContratista" size={[6, 6, 6, 6]} />
                                        }
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            {displayAntiguo === true ?
                                <Column size={[12, 12, 12, 12]} style={{ marginBottom: 20 }}>
                                    <alerts.Alert type={alerts.AlertTypeEnum.danger}>
                                        <p style={{ fontSize: 12 }}> La fecha de entrega de la vivienda fue hace más de 5 años. </p>
                                    </alerts.Alert>
                                </Column> : null
                            }
                        </Row>
                        <Row>
                            <Column size={[12, 12, 8, 8]}>
                                <page.OptionSection
                                    id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                    parent={config.id}
                                    icon="fa fa-users"
                                    level={1} collapsed={false}
                                    subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                                        {[global.getData(this.props.contratistas, []).length].join("")}
                                    </span>}>
                                    <PanelUpdate info={this.props.contratistas}>
                                        <List
                                            id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                            items={this.props.contratistas}
                                            readonly={true}
                                            listHeader={listHeaderContratistas}
                                            formatter={(index: number, item: any) => {
                                                return <Row style={{ margin: 0 }}>
                                                    <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.Clave}</span>{item.Contratista.Descripcion}</Column>
                                                    <Column size={[5, 5, 5, 5]} className="listItem-default-item"><span className="badge badge-info">{item.TipoContratista.Descripcion}</span></Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-center-header">{EK.UX.Labels.yes(item.ContratistaDefault === "S")}</Column>
                                                </Row>
                                            }} />
                                    </PanelUpdate>
                                </page.OptionSection>
                            </Column>
                            <EditSPVClienteContactos size={[12, 12, 4, 4]} />
                        </Row>
                        <Row>
                            <ReporteMessages visible={true} />
                        </Row>
                        <Row>
                            <div id="reporteFallas">
                                <page.SectionList
                                    id={REPORTE_FALLAS_ID}
                                    parent={config.id}
                                    icon="fas fa-cogs"
                                    level={1}
                                    hideNewButton={displayAntiguo === true || !tipoVivienda || !state.allowUpdate}
                                    editButtons={<SearchButton id="searchButton" />}
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
                                        console.log(partidas)
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
                                        Forms.updateFormElement(REPORTE_FALLAS_ID, "noProcedePorVigencia", false);

                                        //establecer el contratista default de la ubicación
                                        if (this.props.contratistas && this.props.contratistas.data) {
                                            let contratistas: any[] = global.getData(this.props.contratistas, []);
                                            contratistas = contratistas.filter(c => { return c.ContratistaDefault === "S"; });
                                            if (contratistas && contratistas.length > 0) {
                                                Forms.updateFormElement(REPORTE_FALLAS_ID, "Contratista", contratistas[0].Contratista);
                                            };
                                        };

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
                                                    <span> / Incidencia</span>
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
                                            .addBoolean("noProcedePorVigencia")
                                            .addVersion()
                                            .toObject();

                                        console.log('map to form')
                                        
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
                                                        value.Falla && (value.Falla.IdFalla === retValue.Falla.IdFalla) &&
                                                        value.UbicacionFalla && (value.UbicacionFalla.IdUbicacionFalla === retValue.UbicacionFalla.IdUbicacionFalla)) {
                                                        duplicada = true;
                                                    }
                                                }
                                            });
                                        };

                                        if (duplicada === true) {
                                            global.warning("La falla-ubicación seleccionada ya fue agregada. Por favor verifique la información e intente de nuevo.");
                                            return null;
                                        };

                                        if (!(retValue && retValue.ID > 0)) {
                                            //if (retValue.noProcedePorVigencia) {
                                            //}
                                            retValue.EstatusAutorizacion = "N";
                                            retValue.EstatusPartidaValor = "N";
                                            retValue.EstatusPartida = global.assign({}, {
                                                Clave: "N",
                                                Nombre: "NUEVO"
                                            });
                                        };


                                        //console.log(retValue)
                                        var patt = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                                        var patt2 = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                                        var res = patt.test(retValue.Observaciones);
                                        var res2 = patt2.test(retValue.ObservacionesContratista);
                                        if (!res) {
                                            global.warning('Las observaciones del cliente contienen caracteres no validos', 'Atencion');
                                            return;
                                        }
                                        if (!res2) {
                                            global.warning('Las observaciones a nivel folio contienen caracteres no validos', 'Atencion');
                                            return;
                                        }
                                        retValue = global.assign(retValue, ReporteUtils.fnSetDictamenes(retValue));
                                        return retValue;
                                        //retValue.DiasGarantia = 10;

                                    }}
                                    formatter={(index: number, item: any) => {
                                        //console.log(item)
                                        let bgColor: string;
                                        let extraData: any[] = [];
                                        let allowEdit: boolean = false;
                                        let allowRemove: boolean = false;

                                        if (item.PartidaAutorizada === "R" || item.Procede === "N") {
                                            bgColor = "#FFA07A";
                                        };
                                        if (item.Reincidencias > 0 && item.DiasGarantia < 0) {
                                            item.PartidaAutorizada = "A";
                                            item.Procede === "S";
                                            bgColor = "#A4EDFF";
                                        }
                                        if (item.noProcedePorVigencia) {
                                            bgColor = "#2f3542";
                                        }

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
                                        if (!item.AutorizadoGerente) {
                                            extraData.push(authorize);
                                        }
                                        //console.log(idEntidad)
                                        //console.log(config.modulo)
                                        console.log(item)
                                        //console.log(entidad)
                                        let fechaHoy:any = new Date().getTime()
                                        let restante = entidad.Creado ? fechaHoy - entidad.Creado.getTime() : 0;
                                        const milisegundosPorHora = 1000 * 60 * 60;
                                        const diferenciaHoras = item.ID > 0? restante / milisegundosPorHora:1000;
                                        //console.log(diferenciaHoras)
                                     
                                        //console.log(item)
                                        //console.log(ListaEvidenciasCliente)
                                        //console.log(state.allowUpdate)
                                        //let showEvidenciasSection = true;
                                        //INC-EDITconsole.log(labelGarantia)KontrolFiles/GetFile/reporte$dictamenes$/42029/anexos/638266888453347777
                                        return <Row id={"row_incidenciacte_" + item.ID} className="panel-collapsed " style={{ backgroundColor: bgColor,  }}>
                                            <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                                <Row>
                                                    <Column size={[1, 1, 1, 1]}>
                                                        {item.ID <= 0 || item.ID === null || diferenciaHoras > 24 ?
                                                            null:
                                                            <CollapseButton
                                                                idElement={"row_incidenciacte_" + item.ID}
                                                                className="button-panel-plus"
                                                                collapsedClass="panel-collapsed"
                                                                collapsedUpIcon="fa fa-caret-up"
                                                                collapsedDownIcon="fa fa-caret-down"
                                                                style={null} collapsed={true}
                                                                iconOnly={true} inverse={true} />
                                                            
                                                        }
                                                        

                                                    </Column>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                        <span className="badge badge-info bold">{item.Partida}</span>
                                                    </Column>
                                                    {/*<ColumnDictamen items={item.Dictamenes} size={[1, 1, 1, 1]} />*/}
                                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.TipoFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.TipoFalla.ID}</span>{item.TipoFalla.Nombre}</span>}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Falla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Falla.IdFalla}</span>{item.Falla.Descripcion}</span>}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.UbicacionFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.IdUbicacionFalla}</span>{item.UbicacionFalla.Descripcion}</span>}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</span>}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.Observaciones}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.Descripcion : null}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.FallaOrigen.Descripcion : null}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                        <a id={"a_reincidencias_" + index}>
                                                            <span className="badge badge-warning bold">{item.Reincidencias}</span>
                                                            <SPVReincidenciasConsulta target={"a_reincidencias_" + index} item={item} idFormSection={REPORTE_FALLAS_ID} />
                                                        </a>
                                                    </Column>
                                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesContratista}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-center-header"><span dangerouslySetInnerHTML={{ __html: labelGarantia(item.DiasGarantia) }}></span></Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.TerminoGarantia)}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.FechaCerrado)}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item">{!(item && item.EstatusPartida) ? null : <span className="badge badge-info">{item.EstatusPartida.Nombre}</span>}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-default-header " style={{ paddingLeft: "0px", paddingRight: "0px", width: "70px", overflow: "unset", position: "sticky", right: 0, zIndex: 1, height: "0px" }}  >
                                                        {extraData.length > 0 ? <buttons.PopOver2 style={{ position: "relative", zIndex: 200, right: "0px", height: "22px", borderBottomLeftRadius: "50px !important", borderBottomRightRadius: "50px !important", borderTopLeftRadius: "50px !important", borderTopRightRadius: "50px !important", background: "#d2cccc", top: "0px" }} idParent={config.id} idForm={REPORTE_FALLAS_ID} renderColumn={true} info={item} extraData={extraData} /> : null}
                                                    </Column>
                                                </Row>
                                            </Column>
                                            {item.ID <=0 || item.ID === null || diferenciaHoras > 24?
                                                null
                                                :
                                                <EvidenciasClienteList IdIncidencia={item.ID} Folio={item.IdReporte} />
                                            
                                            }
                                          
                                          </Row>
                                          
                                    }}>
                                    <Row>
                                        {editCampos.TipoFalla === true ?
                                            <SPVTiposComponentesConsulta idFormSection={REPORTE_FALLAS_ID} tipovivienda={tipoVivienda} usoFalla={"Ubicacion"} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} /> :
                                            <label.Entidad id="TipoFalla" idForm={REPORTE_FALLAS_ID} value={labelValue} size={[12, 12, 3, 3]} />
                                        }
                                        {editCampos.Falla === true ?
                                            <SPVComponentesConsulta idFormSection={REPORTE_FALLAS_ID} tipoVivienda={tipoVivienda} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} /> :
                                            <label.Entidad id="Falla" idForm={REPORTE_FALLAS_ID} value={labelValue} size={[12, 12, 3, 3]} />
                                        }
                                        <label.Entidad id="CausaFalla" idForm={REPORTE_FALLAS_ID} value={labelCausaFalla} size={[12, 12, 3, 3]} />
                                        <label.Entidad id="CausaFalla" label="Causa" idForm={REPORTE_FALLAS_ID} value={labelFallaOrigen} size={[12, 12, 3, 3]} />
                                    </Row>
                                    <Row>
                                        <SPVContratistasConsulta idPlaza={idPlaza} idFormSection={REPORTE_FALLAS_ID} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                                        {editCampos.UbicacionFalla === true ?
                                            <ddl.SPVUbicacionesFallasDDL id="UbicacionFalla" type={tipoVivienda} idFormSection={REPORTE_FALLAS_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required(), validations.custom("", "", [""], ddl.ddlValidate)]} /> :
                                            <label.Entidad id="UbicacionFalla" idForm={REPORTE_FALLAS_ID} value={labelValue} size={[12, 12, 3, 3]} />
                                        }
                                        <label.Entidad id="EstatusPartida" idForm={REPORTE_FALLAS_ID} size={[12, 12, 3, 3]} />
                                    </Row>
                                    <Row>
                                        <label.Label id="DiasGarantia" idForm={REPORTE_FALLAS_ID} value={labelGarantia} isHTML={true} size={[12, 12, 3, 3]} />
                                        <label.Fecha id="TerminoGarantia" idForm={REPORTE_FALLAS_ID} size={[12, 12, 3, 3]} />
                                        <label.Fecha id="FechaCerrado" idForm={REPORTE_FALLAS_ID} size={[12, 12, 3, 3]} />
                                        <Column size={[12, 12, 3, 3]}>
                                            {reMessage}
                                            {checkBoxProcede}
                       
                                        </Column>
                                    </Row>
                                    <Row>
                                        {editCampos.ObservacionesSection === true ?

                                            <TextArea id="Observaciones" idFormSection={REPORTE_FALLAS_ID} rows={2} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} /> :
                                            <label.Label id="Observaciones" idForm={REPORTE_FALLAS_ID} size={[12, 12, 6, 6]} />
                                        }
                                        {editCampos.ObservacionesContratistaSection === true ?
                                            <TextArea id="ObservacionesContratista" idFormSection={REPORTE_FALLAS_ID} rows={2} size={[12, 12, 6, 6]} /> :
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


    interface IEvidenciasProps {
        IdIncidencia?: number;
        Folio?: number;
        ListaEvidencias?: any;
    }

    export let EvidenciasClienteList: any = global.connect(class extends React.Component<IEvidenciasProps, {}> {
        constructor(props: IEvidenciasProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            ListaEvidencias:  state.global.tmpEvidenciaCliente
        });

        shouldComponentUpdate(nextProps: IEvidenciasProps, { }): boolean {
            return  hasChanged(this.props.ListaEvidencias, nextProps.ListaEvidencias)
        };

        GetTotalEvidencias(Incidencia) {
            let TotalEvidencias = this.props.ListaEvidencias && this.props.ListaEvidencias.data ? this.props.ListaEvidencias.data : [];
            //let evidencias = TotalEvidencias.filter(x => x.item.EntityId === Incidencia);
            for (let evidencia of TotalEvidencias) {
                if (evidencia.item.EntityId === Incidencia) {
                    let comentarioElement: any = document.getElementById(`comentario$${evidencia.UUID}`);
                    let comentario = comentarioElement && comentarioElement.value ? comentarioElement.value : '';
                    evidencia.modificar = evidencia.id && evidencia.id > 0 && evidencia.comentario !== comentario ? true : false;
                    evidencia.comentario = comentario;
                } else {
                    evidencia.modificar = false;
                }
            }
            return TotalEvidencias;
        }

        SaveEvidenciasCliente(Incidencia, Folio) {
           // console.log(Incidencia, Folio)
            let ruta = `base/kontrol/reportesFallas/GetBP/SaveEvidenciasCliente/`
            let loader = document.getElementById(`_loader_containerevidencias${Incidencia}`);
            let loaded = document.getElementById(`_loaded_containerevidencias${Incidencia}`);
            //debugger
            let TotalEvidencias = this.GetTotalEvidencias(Incidencia);
            //console.log(TotalEvidencias)
            if (TotalEvidencias.length > 0) {
                let evidencias = TotalEvidencias.filter(x => x.item.EntityId === Incidencia);
                evidencias = evidencias.filter(x => x.modificar || !x.id || x.id < 0);
                //console.log(evidencias)
                if (evidencias.length === 0) {
                    global.info('No hay evidencias o cambios detectados')
                    return;
                } else {
                    for (let i = 0; i < evidencias.length; i++) {
                        if (evidencias[i].id && evidencias[i].id > 0) {
                            if (evidencias[i].modificar) {
                                let modelUpd = { id: evidencias[i].id, comentario: evidencias[i].comentario }
                                //console.log(modelUpd)
                                global.asyncPost(ruta, { parametros: modelUpd }, (status2: AsyncActionTypeEnum, datasaved: any) => {
                                    switch (status2) {
                                        case AsyncActionTypeEnum.successful:
                                            if (i + 1 === evidencias.length) {
                                                loader.style.display = 'none'
                                                loaded.style.display = 'block'
                                                global.success('Evidencias actualizadas')
                                            }
                                            break;
                                        case AsyncActionTypeEnum.loading:
                                            loader.style.display = 'block'
                                            loaded.style.display = 'none'
                                            break;
                                        case AsyncActionTypeEnum.failed:
                                            loader.style.display = 'none'
                                            loaded.style.display = 'block'
                                            global.warning('Error al actualizar el registro')
                                            break;
                                    }
                                });
                                //this.SaveDispatchPost(ruta, modelUpd, loader, loaded, i + 1, evidencias.length,null,null,null,'Evidencia actualizada', 'Error al actualizar');
                            }
                        }
                        else {
                           // console.log('agregar incidencia nueva')
                            //console.log(evidencias[i])
                            let formdata: FormData = new FormData();
                            formdata.append("item", JSON.stringify(evidencias[i].item));
                            formdata.append("file", evidencias[i].file);
                            global.asyncPut("KontrolFiles/Save", formdata, (status: AsyncActionTypeEnum, dataResponse: any) => {
                                switch (status) {
                                    case AsyncActionTypeEnum.successful:
                                        if (dataResponse && dataResponse.ID && dataResponse.ID > 0) {
                                            //console.log(dataResponse)
                                            let modelo = { folio: Folio, incidencia: Incidencia, idkontrol: dataResponse.ID, comentario: evidencias[i].comentario }
                                            //console.log(modelo)

                                            global.asyncPost(ruta, { parametros: modelo }, (status2: AsyncActionTypeEnum, datasaved: any) => {
                                                switch (status2) {
                                                    case AsyncActionTypeEnum.successful:
                                                        

                                                        let indexEvidencia = TotalEvidencias.findIndex(x => x.UUID === evidencias[i].UUID);
                                                        if (indexEvidencia > -1) {
                                                            TotalEvidencias[indexEvidencia].id = datasaved;
                                                            TotalEvidencias[indexEvidencia].path = dataResponse.FilePath;
                                                            TotalEvidencias[indexEvidencia].uid = dataResponse.Uid;
                                                            TotalEvidencias[indexEvidencia].tipo = dataResponse.Tipo;
                                                            TotalEvidencias[indexEvidencia].entityType = dataResponse.EntityType
                                                            TotalEvidencias[indexEvidencia].IdKontrol = dataResponse.ID
                                                        }
                                                        if (i + 1 === evidencias.length) {
                                                            loader.style.display = 'none'
                                                            loaded.style.display = 'block'
                                                            dispatchSuccessful('load::tmpEvidenciaCliente', TotalEvidencias);
                                                            global.success('Evidencias guardadas')
                                                        }

                                                        break;
                                                    case AsyncActionTypeEnum.loading:
                                                        break;
                                                    case AsyncActionTypeEnum.failed:
                                                        loader.style.display = 'none'
                                                        loaded.style.display = 'block'
                                                        global.warning('Error al Guardar el registro')
                                                        break;
                                                }
                                            });
                                            //this.SaveDispatchPost(ruta, modelo, loader, loaded, i + 1, evidencias.length, TotalEvidencias, dataResponse, evidencias[i],null,null,null,true)
                                        }
                                        break;
                                    case AsyncActionTypeEnum.loading:
                                        loader.style.display = 'block'
                                        loaded.style.display = 'none'
                                        break;
                                    case AsyncActionTypeEnum.failed:
                                        loader.style.display = 'none'
                                        loaded.style.display = 'block'
                                        global.warning('Error al Guardar el Archivo')
                                        break;
                                }
                            });
                        }
                    }
                }
            } else {
                global.info('No ha seleccionado ninguna evidencia')
                return;
            }

        }

        EliminarEvidenciaCliente(data) {
            let items = this.GetTotalEvidencias(data.item.EntityId);
            let newData = items.filter(x => x.UUID !== data.UUID);
            if (data.id && data.id > 0) {
                EK.Global.confirm("¿Desea eliminar la siguiente evidencia?", "Eliminar evidencia", (isConfirm: any) => {
                    if (isConfirm === true) {
                        let modelDelete = {
                            ID: data.IdKontrol,
                            EntityId: data.item.EntityId,
                            EntityType: data.entityType,
                            Tipo: data.tipo,
                            Uid: data.uid
                        }
                    let loader = document.getElementById(`_loader_containerevidencias${data.item.EntityId}`);
                    let loaded = document.getElementById(`_loaded_containerevidencias${data.item.EntityId}`);
                    global.asyncPut("KontrolFiles/Delete", modelDelete, (status: AsyncActionTypeEnum, dataRes: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                if (dataRes) {
                                    let ruta = `base/kontrol/reportesFallas/GetBP/DeleteEvidenciasCliente/`
                                    global.asyncPost(ruta, { parametros: { id: data.id } }, (status2: AsyncActionTypeEnum, datasaved: any) => {
                                        switch (status2) {
                                            case AsyncActionTypeEnum.successful:
                                                    loader.style.display = 'none'
                                                    loaded.style.display = 'block'
                                                    dispatchSuccessful('load::tmpEvidenciaCliente', newData);
                                                    global.success('Evidencias eliminada')
                                                break;
                                            case AsyncActionTypeEnum.loading:
                                                break;
                                            case AsyncActionTypeEnum.failed:
                                                loader.style.display = 'none'
                                                loaded.style.display = 'block'
                                                global.warning('Error al eliminar el registro')
                                                break;
                                        }
                                    });
                                }
                                break;
                            case AsyncActionTypeEnum.loading:
                                loader.style.display = 'block';
                                loaded.style.display = 'none';
                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loaded.style.display = 'block';
                                global.warning('Error al eliminar el archivo')
                                break;
                        }
                    });
                    };
                });
            } else {
                dispatchSuccessful('load::tmpEvidenciaCliente', newData);
            }
        }

        openEvidenciaCte(data) {
            console.log(data)
            if (!data.path) {
                global.info('Primero debe guardar el archivo');
                return;
            }
            dispatchSuccessful('load::TipoViewer', 'REPORTE')
            dispatchSuccessful('load::ImageValueURI', data.path)
            let modalCalen: any = $("#ModalPhotoViewer");
            modalCalen.modal();
        }
       
        render(): any {
            let Incidencia = this.props.IdIncidencia ? this.props.IdIncidencia : -1;
            let Folio = this.props.Folio ? this.props.Folio : -1;
            if (Incidencia < 0 || Folio < 0)
                return null;
            const HeaderEvidenciasCliente: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">
                            <KontrolFileManagerSimple
                                title="Archivos de la incidencia"
                                modulo={config.modulo}
                                viewMode={false}
                                multiple={true}
                                style={{ color: 'red' }}
                                noAutoSave={true}
                                entity={global.createSuccessfulStoreObject({ ID: Incidencia })}
                                entityType={global.createSuccessfulStoreObject(["reporte$incidencias$",""].join(""))} />

                        </Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">{"ID"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Evidencia"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Evidencia"}</Column>
                        <Column size={[5, 5, 5, 5]} className="list-center-header">{"Comentario"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">
                            <button className="btn-xs-save" title="Guardar evidencias" onClick={() => this.SaveEvidenciasCliente(Incidencia, Folio)}>
                                <i className="fas fa-save"></i>
                            </button>
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </Column>

            
            let TotalEvidencias = this.props.ListaEvidencias && this.props.ListaEvidencias.data? this.props.ListaEvidencias.data:[]
            let evidencias = TotalEvidencias.filter(x => x.item.EntityId === Incidencia);

            return <Row style={{ marginTop: '10px' }}>
                <Column
                    xs={{ size: 12 }}
                    sm={{ size: 12 }}
                    md={{ size: 12 }}
                    lg={{ size: 12 }}
                    className="panel-detail well well-sm">
                    <div id={'_loader_containerevidencias' + Incidencia} style={{ display: 'none' }}>
                        <Updating text="" />
                    </div>
                    <div id={'_loaded_containerevidencias' + Incidencia}>
                        <List
                            items={evidencias}
                            readonly={true}
                            listHeader={HeaderEvidenciasCliente}
                            addRemoveButton={false}
                            formatter={(__index: number, __item: any): any => {
                               // console.log(__item)
                                let comen = __item.comentario ? __item.comentario : '';
                                setTimeout(() => {
                                    let imp = document.getElementById(`comentario$${__item.UUID}`);
                                    if (imp) {
                                        imp['value'] = comen
                                    }
                                }, 100)
                                return <Row style={{ margin: 0 }}>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header brdr-right">
                                        &nbsp;
                                                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header brdr-right">
                                        {__item.id}
                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header brdr-right">
                                        <span className="badge badge-info bold">{__index + 1}</span>
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-left-header brdr-right">
                                        <span className="text">{__item.file && __item.file !== null ? __item.file.name : null}</span>
                                    </Column>
                                    <Column size={[5, 5, 5, 5]} className="listItem-left-header brdr-right">

                                        <input type="text" defaultValue={''} id={`comentario$${__item.UUID}`}
                                            className="fullInput" style={{ width: '100%', border: '1px solid #95a5a6' }} />

                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-right-header ">
                                        <button onClick={() => this.EliminarEvidenciaCliente(__item)} className="mr-2 bntIcons" title="Eliminar">
                                            <i className="fas fa-times "></i>
                                        </button>
                                        <button onClick={() => this.openEvidenciaCte(__item)} className="mr-3 bntIcons" title="Ver">
                                            <i className="fas fa-eye "></i>
                                        </button>
                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                                </Row>
                            }} />
                    </div>

                </Column>
            </Row>

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
                global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/Get/GetDictamenesReporte/" + encodedParams, REPORTE_DICTAMENES_ID);
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
            //console.log(item)
            let tipoAgenda: any;
            let glTipoAgenda: DataElement = global.getStateItem("global.TipoAgenda") as DataElement;
            if (glTipoAgenda) {
                if (global.isSuccessful(glTipoAgenda)) {
                    let tiposAgenda: any[] = global.getData(glTipoAgenda, []);
                    if (tiposAgenda && tiposAgenda.length > 0) {
                        let items: any[] = tiposAgenda.filter((value) => { return value.Clave === "Dictamen" }) as any[];
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

                    //let encodedParams: string = global.encodeObject({ id: item.ID });
                    let encodedParams: string = global.encodeParameters({ id: item.ID });
                    global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/Get/GetDictamenes/" + encodedParams, REPORTE_APPOINTMENT_DICTAMENES_ID);

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
                    EK.Store.getState().global.state$AgendaContratista.data.reprogramacion = true

                    //let encodedParams: string = global.encodeObject({ id: item.ID });
                    let encodedParams: string = global.encodeParameters({ id: item.ID });
                    global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/Get/GetDictamenes/" + encodedParams, REPORTE_APPOINTMENT_DICTAMENES_ID);

                    let modalCalendar: any = $("#modalCalen");
                    modalCalendar.modal();
                    modalCalendar.css("height", "auto");
                    //console.log('Open planificacion diagnostico')
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
            let slotState: any = global.getData(this.props.slotState);
            let idEntidad: number = !(slotState && slotState.entidad) ? undefined : slotState.entidad.ID;
            let edit: any = {
                icon: "icon-pencil",
                titulo: "Editar Diagnóstico",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {

                    if (item.EstatusDictamenValue == "C") {
                        global.info("El Diagnóstico no se puede editar porque ya se encuentra cerrado.");
                    }
                    //else if (ReporteUtils.fnHasOrdenes(item.IdReporteDetalle)) {
                    //    global.info("El Diagnóstico no se puede editar porque la partida se encuentra asignada a una orden de trabajo.");
                    //}
                    else {
                        Forms.remove(id);
                        Forms.updateFormElements(id, item);
                        //console.log(item);
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
                    //console.log('planificar diagnostico')
                    if (item.EstatusDictamenValue == "C") {
                        global.info("El Diagnóstico no se puede planificar porque ya se encuentra cerrado.");
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
                    //console.log(retValue)
                    var patt = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                    var res = patt.test(retValue.Descripcion);
                    if (!res) {
                        global.warning('El texto ingresado contiene caracteres no validos', 'Atencion');
                        return;
                    } else {
                        return retValue;
                    }

                }}
                formatter={(index: number, item: any) => {
                    let extraData: any[] = [];
                    extraData.push(edit);
                    extraData.push(appointment);
                    extraData.push(remove);
                    extraData.push(printDiagnostico);
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
                    //console.log(idEntidad)
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
                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.IdFalla}</span>{_item.Partida.Falla.Descripcion}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{_item.Partida.UbicacionFalla.Descripcion}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Descripcion}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.FallaOrigen.ID}</span>{_item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.EstatusDictamen}</span></Column>
                                            <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow" style={{ paddingTop: '10px' }}>
                                                <label.Label label="Observaciones de CAT" value={_item.Partida.ObservacionesCat} size={[12, 12, 12, 12]} />
                                            </Column>
                                            {_item.Partida.IdContratistaImputable !== null && _item.Partida.IdContratistaImputable !== undefined ?
                                                <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow" style={{ paddingTop: '10px', border: "1px solid #ECEFF1" }}>
                                                    <p style={{ fontSize: "10px", fontWeight: "bold", paddingLeft: "15px" }}>CONTRATISTA IMPUTABLE</p>
                                                    <Row>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-center-header" style={{}}><span className="badge badge-info bold">{_item.Partida.IdContratistaImputable}</span> {_item.Partida.ContratistaImputable.Nombre}</Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.ContratistaImputable.TipoContrato.Nombre}</span></Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow" style={{ fontSize: "12px", color: "#7c7e97" }}>{"Imputable Falla"}</Column>
                                                    </Row>
                                                </Column> : null
                                            }

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
                    <input.Text id="Descripcion" maxLength={255} idFormSection={REPORTE_DICTAMENES_ID} required={true} validations={[validations.required()]} size={[12, 12, 12, 12]} />
                    <SPVResponsableDictamenConsulta idPlaza={this.props.idPlaza} idFormSection={REPORTE_DICTAMENES_ID} size={[12, 12, 10, 10]} required={true} validations={[validations.required()]} />
                    {/*<ddl.EstatusDictamenesDDL id="EstatusDictamen" idFormSection={REPORTE_DICTAMENES_ID} required={true} validations={[validations.required()]} size={[12, 12, 2, 2]} />*/}
                    {/*<Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginTop: 20 }}>ABIERTO</span></Column>*/}
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
                            //console.log(selectedIds);
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
                                                //global.info("La incidencia " + ordenesTrabajo[i].Partidas[j].Partida.Partida + " no puede ser seleccionada porque ya tiene una orden de trabajo asignada");
                                                //return;
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
                            let ordenesTrabajo = global.getData(Forms.getValue(REPORTE_ORDEN_TRABAJO_ID, PAGE_ID));
                            //console.log(items)
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
                            //console.log(currentDictamen)
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

                            let ListaPartidas: any[] = global.getData(this.props.config.getCatalogo(REPORTE_FALLAS_ID), []);
                            for (var i = 0; i < ordenesTrabajo.length; i++) {
                                for (var j = 0; j < ordenesTrabajo[i].Partidas.length; j++) {
                                    for (var k = 0; k < ListaPartidas.length; k++) {
                                        if (ordenesTrabajo[i].Partidas[j].IdPartida == ListaPartidas[k].ID) {
                                            //console.log(ListaPartidas[k].ID)
                                            let added = partidasFromAnotherDictamen.filter(x => x === ListaPartidas[k].ID.toString())[0];
                                            if (added === undefined) {
                                                partidasFromAnotherDictamen.push(ListaPartidas[k].ID.toString());
                                            }

                                            //global.info("La incidencia " + ordenesTrabajo[i].Partidas[j].Partida.Partida + " no puede ser seleccionada porque ya tiene una orden de trabajo asignada");
                                            //return;
                                        }
                                    }
                                }
                            }

                            let data: any[] = [];
                            let partidas: any[] = global.getData(this.props.config.getCatalogo(REPORTE_FALLAS_ID), []);
                            // console.log(partidasFromAnotherDictamen)
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
                                    //console.log(p.ID)
                                });
                            };

                            this.props.config.setCatalogo(data, REPORTE_DICTAMENES_OPTIONS_ID);
                            this.props.config.setState({ viewMode: false }, REPORTE_DICTAMENES_DETALLES_ID);
                        }}
                        formatter={(index: number, item: any) => {
                            //console.log(item)
                            return <Row>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.IdFalla}</span>{item.Partida.Falla.Descripcion}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{item.Partida.UbicacionFalla.Descripcion}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Descripcion}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.FallaOrigen.ID}</span>{item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.EstatusDictamen}</span></Column>
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
                                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Familia"}</Column>
                                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Componente"}</Column>
                                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                                        <Column size={[2, 2, 2, 2]} className="list-default-header">Estatus</Column>
                                    </Row>
                                </Column>}
                                formatter={(index: number, item: any) => {
                                    //console.log(item);
                                    let bgColor: string;

                                    if (item.InAnotherDictamen) {
                                        bgColor = "#FFA07A";
                                    };
                                    return <Row style={{ backgroundColor: bgColor }}>
                                        <Column size={[1, 1, 1, 1]} style={{ marginBottom: -22, marginTop: -22, width: 50, visibility: (item.InAnotherDictamen) ? "hidden" : "visible" }}><CheckBox disabled={item.InAnotherDictamen} value={false} id={"partida_" + item.IdReporteDetalle} idFormSection={REPORTE_DICTAMENES_DETALLES_ID} label="" groupName="PartidasRadios" size={[1, 1, 1, 1]} /></Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.IdFalla}</span>{item.Partida.Falla.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{item.Partida.UbicacionFalla.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Descripcion}</Column>
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
                    <ddl.TiposContactoDDL id="TipoContacto" idFormSection={REPORTE_CONTACTO_ID} validations={[validations.required()]} size={[12, 12, 12, 12]} />
                    {displayTelefono === true ? <ddl.TiposTelefonoDLL id="TipoTelefono" idFormSection={REPORTE_CONTACTO_ID} validations={[validations.required()]} size={[12, 12, 12, 12]} /> : null}
                    {displayCorreo === true ? <input.Email id="Contacto" label="Correo" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 8, 8]} validations={[validations.required()]} /> : null}
                    {displayTelefono === true ? <input.Telefono id="Contacto" label="Teléfono" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 8, 8]} validations={[validations.required()]} /> : null}
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
            id: "Contratista",
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
            //console.log(idEntidad)
            if (idEntidad > 0) {
                let encodedFilters: string = global.encodeObject({ idReporte: idEntidad });
                let encodedFilters2: string = global.encodeObject({ idReporte: idEntidad });
                global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/GetBP/GetContratistas/" + encodedFilters, REPORTE_CONTRATISTAS_ID);
                //global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/GetBP/GetEvidencias/" + encodedFilters, REPORTE_EVIDENCIAS_ID);
                //global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/GetBP/GetHistorialFechasOT/" + encodedFilters, REPORTE_HISTORIALOT_ID);
                //global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/GetBP/GetEvidencias/" + encodedFilters, REPORTE_RESPONSABLESCAT_ID);
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

        //rowDBClick(item) => {
        // console.log(item)
        // }

        buscarInfoRepCliente(): void {
            //console.log('opening');
            let cliente: any = Forms.getDataValue("Cliente", config.id, EK.Store.getState());
            let folio: any = EK.Store.getState().global.currentEntity !== null && EK.Store.getState().global.currentEntity !== undefined ? EK.Store.getState().global.currentEntity.data.ID : 0;
            if (cliente === undefined || cliente.data === undefined) {
                cliente = getData(EK.Store.getState().global.currentEntity).Cliente;
            } else {
                cliente = getData(cliente);
            }
            //console.log(cliente)
            if (!cliente) {
                global.warning('Seleccione un cliente');
                return;
            }
            let isExporting = false;
            let f = { idCliente: cliente.ID }
            let encodedFilters: string = global.encodeObject(f);
            let urlSearch = `base/scv/ReportesFallas/GetBP/GetClienteReportes/${encodedFilters}`;
            let columnas = [
                { dataField: "IdReporte", caption: "Folio", fixed: true, fixedPosition: "left" },
                { dataField: "IdPrereporte", fixed: true, fixedPosition: "left" },
                { dataField: "FechaCaptura", caption: "Fecha", aligment: "center", dataType: "datetime", format: "dd/MM/yyyy" },
                { dataField: "ResponsableConstruccion.Nombre", caption: "Responsable" },
                {
                    dataField: "Partida", caption: "Incidencia", encodeHtml: false,
                    customizeText: (cellInfo) => {
                        //console.log(cellInfo)
                        if (!isExporting) {
                            return `<span class="badge badge-info">${cellInfo.value}</span>`;
                        } else {
                            return `${cellInfo.value}`;
                        }
                    }
                },
                {
                    dataField: "Dictamenes", caption: "Diagnosticos", encodeHtml: false,
                    customizeText: (cellInfo) => {
                        //console.log(cellInfo)
                        let items = cellInfo.value;
                        let activos: number = items.filter(x => x.EstatusDictamen.Clave === "I").length;
                        let aprobados: number = items.filter(x => x.EstatusDictamen.Clave === "A").length;
                        let rechazados: number = items.filter(x => x.EstatusDictamen.Clave === "N").length;
                        let formato = '';
                        if (!isExporting) {
                            formato = `<span class="badge" style="background:#36c6d3;">${activos}</span>
                                    <span class="badge" style="background:#41c300;">${aprobados}</span>
                                    <span class="badge" style="background:#ed6b75;">${rechazados}</span>`;
                        } else {
                            formato = `${activos}, ${aprobados}, ${rechazados}`;
                        }

                        return formato;
                    }
                },
                { dataField: "TipoFalla.Nombre", caption: "Familia" },
                { dataField: "Falla.Descripcion", caption: "Componente" },
                { dataField: "UbicacionFalla.Descripcion", caption: "Ubicacion Incidencia" },
                { dataField: "Contratista.Descripcion", caption: "Contratista Origen" },
                { dataField: "ContratistaOT.Descripcion", caption: "Contratista OT" },
                { dataField: "CausaFalla.Descripcion", caption: "Causa Incidencia" },
                { dataField: "CausaFalla.FallaOrigen.Descripcion", caption: "Origen Causa" },
                {
                    dataField: "Reincidencias", caption: "Reincidencias", aligment: 'center', encodeHtml: false,
                    customizeText: (cellInfo) => {
                        let formato = '';
                        if (!isExporting) {
                            formato = `<span class="badge" style="background:#f1c40f;">${cellInfo.value}</span>`;
                        } else {
                            formato = cellInfo.value;
                        }
                        return formato;
                    }
                },
                { dataField: "Observaciones", caption: "Observaciones" },
                { dataField: "ObservacionesContratista", caption: "Observaciones Contratista" },
                {
                    dataField: "DiasGarantia", caption: "Garantia (Dias)", aligment: "left", encodeHtml: false,
                    customizeText: (cellInfo) => {
                        let formato = '';
                        if (!isExporting) {
                            formato = `<span class="badge" style="background:#41C300;">${cellInfo.value}</span>`;
                        } else {
                            formato = cellInfo.value;
                        }
                        return formato;
                    }
                },
                { dataField: "TerminoGarantia", caption: "Termino Garantia", dataType: "datetime", format: "dd/MM/yyyy" },
                { dataField: "FechaCerrado", caption: "Fecha Cerrado", dataType: "datetime", format: "dd/MM/yyyy" },
                {
                    dataField: "EstatusPartida.Nombre", caption: "Estatus Incidencia", encodeHtml: false,
                    customizeText: (cellInfo) => {
                        let formato = '';
                        if (!isExporting) {
                            formato = `<span class="badge" style="background:#36c6d3;">${cellInfo.value}</span>`;
                        } else {
                            formato = cellInfo.value;
                        }
                        return formato;
                    }
                },
                {
                    dataField: "NombreEstatusReporte", caption: "Estatus Folio", encodeHtml: false,
                    customizeText: (cellInfo) => {
                        let formato = '';
                        if (!isExporting) {
                            switch (cellInfo.value) {
                                case 'TERMINADO': formato = `<span class="badge" style="background:#41c300;">${cellInfo.value}</span>`;
                                    break;
                                default: formato = `<span class="badge badge-info"">${cellInfo.value}</span>`;
                                    break;
                            }
                        } else {
                            formato = cellInfo.value;
                        }

                        return formato;
                    }
                }
            ];
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            try {
                $("#datagroupOtrosRepContainer").dxDataGrid("dispose");
            } catch (ex) { }
            global.asyncGet(urlSearch, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //console.log(data)
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupOtrosRepContainer").dxDataGrid({
                            dataSource: data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
                            },
                            searchPanel: {
                                visible: true
                            },
                            export: {
                                enabled: true,
                                fileName: "Otros_Reporte_Fallas_Cliente" + fecha,
                                allowExportSelectedData: false
                            },
                            onRowDblClick: (e) => {
                                // console.log(e)
                                let modalQuery: any = $("#OtrosReportesModal");
                                modalQuery.modal('toggle');
                                try { $("#datagroupOtrosRepContainer").dxDataGrid("dispose"); } catch (ex) { }
                                global.go([config.modulo, "pv", config.id, e.data.IdReporte].join("/"));

                                //this.rowDBClick(e.data);
                            },
                            onExporting: function (e) {
                                //console.log(e)
                                isExporting = true;
                            },
                            onExported: function (e) {
                                isExporting = false;
                            },

                            paging: {
                                pageSize: 15
                            },
                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [10, 15, 25],
                                showInfo: true
                            },
                            groupPanel: {
                                visible: false
                            },
                            columns: columnas,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: false,
                            rowAlternationEnabled: true
                        }).dxDataGrid("instance");
                        dataGrid.refresh();
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        break;
                }
            });
            //let idCliente: any = idClienteEntidad != null && idClienteEntidad != undefined && idClienteEntidad > 0 ? idClienteEntidad : this.props.entidad != undefined && this.props.entidad.id != null && this.props.entidad.id != undefined ? this.props.entidad.id : 0;
            //if (idCliente <= 0) {
            //    global.warning('Seleccione primero al cliente')
            //    return null;
            //}
            //console.log()
            let modalQuery: any = $("#OtrosReportesModal");
            modalQuery.modal();
        }
        render(): JSX.Element {
            if (global.isSuccessful(this.props.entidad)) {
                //console.log(this.props.entidad);
                return <span>
                    <span>
                        <Button keyBtn={"btnSPVOtrosReportesFallas"} {...this.props} id="btn_cliente_reportes" onClick={this.buscarInfoRepCliente} />
                    </span>
                    <span>
                        <SPVReportesClienteConsulta target='none' />
                    </span>
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
            let permisosList = EK.Store.getState().global.app.data.Permisos;
            let hasEditPermission = permisosList.filter(x => x.Clave === PAGE_ID)[0] !== undefined ? permisosList.filter(x => x.Clave === PAGE_ID)[0].permisos === 8 || permisosList.filter(x => x.Clave === PAGE_ID)[0].permisos === AuthorizePermission.Write ? true : false : false;

            if (global.isSuccessful(this.props.entidad)) {
                if (global.getData(this.props.entidad).Cancelado === 'S' || global.getData(this.props.entidad).IdEstatusReporte === 'T' || !hasEditPermission) {
                    return null;
                };
                return <span>
                    <Button keyBtn={"btnSPVCancelarReporteFalla"} {...this.props} id="btn_cancelar_folio" onClick={this.onButtonClick} />
                </span>
            }
            return null;
        };
    });

    export let IndicadorClienteButton: any = global.connect(class extends React.Component<IReportesButtonProps, {}> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            //config: global.createPageConfigFromState(state.global)
        });
        //static defaultProps: IBitacoraSPVButtonProps = {
        //    icon: "fas fa-ban",
        //    text: "",
        //    color: "white",
        //    className: "btn btn-default-ek",
        //    iconOnly: false,
        //    inverse: false,
        //    buttonSize: "sm",
        //    visible: true,
        //    info: undefined
        //};

        render(): JSX.Element {
           // let permisosList = EK.Store.getState().global.app.data.Permisos;
            if (global.isSuccessful(this.props.entidad)) {
                let entidad = this.props.entidad && this.props.entidad.data ? this.props.entidad.data : null;
                let toolTip = '';
                let bgIndicador = '#E1E5EC';
                //console.log(entidad)
                if (entidad) {
                    switch (entidad.IndicadorCliente) {
                        case 'Alto Riesgo':
                            bgIndicador = '#e74c3c';
                            toolTip = entidad.IndicadorCliente;
                            break;
                        case 'Riesgo':
                            bgIndicador = '#eb953f';
                            toolTip = entidad.IndicadorCliente;
                            break;
                        case 'Posible Riesgo':
                            bgIndicador = '#f1c40f';
                            toolTip = entidad.IndicadorCliente;
                            break;
                        default:
                            bgIndicador = '#E1E5EC';
                            toolTip = entidad.IndicadorCliente;
                            break;
                    }
                }
                //console.log(entidad)
                //console.log(bgIndicador)
                //console.log(toolTip)
                return <Button
                    keyBtn={"btnIndicadorCliente"}
                    titulo={toolTip}
                    id="btn_indicador_cte"
                    style={{ background: bgIndicador, padding: '0px', width: '25px', height: '25px', marginRight: '15px', borderBottomLeftRadius: '3px', borderBottomRightRadius: '3px', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }} />

            }
            return null;
           // let hasEditPermission = permisosList.filter(x => x.Clave === PAGE_ID)[0] !== undefined ? permisosList.filter(x => x.Clave === PAGE_ID)[0].permisos === 8 || permisosList.filter(x => x.Clave === PAGE_ID)[0].permisos === AuthorizePermission.Write ? true : false : false;
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
            retValue.contratista = Forms.getDataValue("Contratista", REPORTE_ORDEN_TRABAJO_ID, state);
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
                global.dispatchAsyncPost("global-page-data", "scv/reportesFallas/calcularPartidasOT/", data, REPORTE_ORDEN_TRABAJO_CALCULO_PARTIDAS_ID);
            },
            getOrdenesTrabajo: (idReporte: number): void => {
                let encodedParams: string = global.encodeParameters({ idReporte });
                global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/Get/GetOrdenesTrabajo/" + encodedParams, REPORTE_ORDEN_TRABAJO_ID);
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
            }
            //console.log('XDXD')
        }


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
                        PartidasFallas[i].CausaFalla.FallaOrigen = OTAsignacion.Partida.CausaFalla.FallaOrigen;

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
                .addNumber("IdCat")
                .addObject("Partidas", REPORTE_ORDEN_TRABAJO_PARTIDAS_ID)
                .addVersion()
                .toObject();
            //console.log(item)
            //console.log(entidad)
            //if (entidad.IdCat === undefined || entidad.IdCat === null) {
            if (item['ResponsableDictamen'] !== undefined && item['ResponsableDictamen'] !== null) {
                entidad.IdCat = item['ResponsableDictamen'].ID;
            }
            //}
            //console.log(entidad, item)
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
                ////    
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
            this.props.config.setState({ viewMode: true }, REPORTE_ORDEN_TRABAJO_ID);
            //

        };
        onPlanificacion(item: any): void {
            let tipoAgenda: any;
            let glTipoAgenda: DataElement = global.getStateItem("global.TipoAgenda") as DataElement;
            if (glTipoAgenda) {
                if (global.isSuccessful(glTipoAgenda)) {
                    let tiposAgenda: any[] = global.getData(glTipoAgenda, []);
                    if (tiposAgenda && tiposAgenda.length > 0) {
                        let items: any[] = tiposAgenda.filter((value) => { return value.Clave === "Contratista" }) as any[];
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
                    global.dispatchAsync("global-page-data", "base/scv/Contratistas/Get/GetOrdenesTrabajo/" + encodedParams, REPORTE_APPOINTMENT_ORDENES_TRABAJO_ID);

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
                    config.setState({ action: "REPROGRAMACION" }, "AgendaContratista");

                    let modalAgenda: any = $("#modalAgendaInformacionCita");
                    modalAgenda.modal();
                    modalAgenda.css("height", "auto");
                };
            };
        };
        //sho
        componentDidMount(): void {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            if (state && state.action) {
                if (state.action.name === "onAddNewOT") {
                    Forms.remove(REPORTE_ORDEN_TRABAJO_ID);
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
            let TerminadoCat: boolean = global.getData(this.props.config.getState(REPORTE_ORDEN_TRABAJO_ID)).TerminadoCat;
            let FechaIniReal: Date = global.getData(this.props.config.getState(REPORTE_ORDEN_TRABAJO_ID)).FechaInicioReal;
            let FechaFinReal: Date = global.getData(this.props.config.getState(REPORTE_ORDEN_TRABAJO_ID)).FechaFinReal;
            let idOrden: number = global.getData(this.props.config.getState(REPORTE_ORDEN_TRABAJO_ID)).idOrden;
            //let testDate = null;
            //console.log(workMode)
            //console.log(TerminadoCat)
            //console.log(FechaIniReal)

            let idPlaza: string = undefined;
            let ubicacion: any = undefined;
            idPlaza = global.getData(this.props.config.getEntity(ubicacion)).IdPlaza;
            let ObtenerP: DataElement = Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID);
            let partidas: any[] = global.getData(ObtenerP, []);
            //console.log(partidas)
            let NumeroP: number = partidas.length
            let ComboDDL: boolean = false;
            let mostrarResponsable: boolean = false;
            for (let p of partidas) {
                if (p.ResponsableDictamen === 'N/A') {
                    mostrarResponsable = true;
                    break;
                }
            }
            if (NumeroP > 0) {
                ComboDDL = true;
            }
            let ubi = global.getData(this.props.config.getEntity(ubicacion)).Ubicacion;
            let tipoVivienda = ubi !== undefined && ubi !== null ? ubi.Segmento.IdTipoVivienda : -1;
            //let tipoVivienda: number = undefined;

            //console.log(this.props);
            //
            //if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {

            //    let segmento: any = global.getData(this.props.ubicacion).Segmento;
            //    tipoVivienda = segmento ? segmento.IdTipoVivienda : null;
            //};
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
                    this.props.config.setState({ viewMode: false, idOrden: null, workMode: true, FechaInicioReal: item.FechaInicioReal, FechaFinReal: item.FechaFinReal, TerminadoCat: item.TerminadoCat }, id);
                }
            };
            //
            let appointment: any = {
                icon: "fa fa-calendar",
                titulo: "Planificar OT",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    delete EK.Store.getState().global.TryReplanificarOT;
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
                        delete EK.Store.getState().global.TryReplanificarOT;
                        let EditItem = JSON.parse(JSON.stringify(item));
                        EditItem.AgendaDetalle.ID = null;
                        this.onPlanificacion(EditItem);
                    } else {
                        global.info("Para planificar la orden de trabajo es necesario que primero guarde la información capturada.");
                    }
                }
            };

            let ReAppointment: any = {
                icon: "fa fa-calendar-day",
                titulo: "ReAgendar OT",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (item && item.ID > 0) {
                        dispatchSuccessful('load::TryReplanificarOT', true);
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
            let listaDictamenes = global.getData(EK.Store.getState().global.currentEntity).Dictamenes;
            let listaOrdenesT = global.getData(EK.Store.getState().global.catalogo$reporte$ordenTrabajo);

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
                    // hideNewButton={this.props.viewMode === true}
                    hideNewButton={false}
                    items={createSuccessfulStoreObject([])}
                    onSave={() => {
                        // GUARDAR LAS PARTIDAS DENTRO DE LA OT Y CERRAR MODO EDICION DE OT ======== GUARDAR OT COMPLETA CON DETALLE
                        if (workMode === true) {

                            let observacionestrabajo: any = Forms.getValue("ObservacionesFinal", REPORTE_ORDEN_TRABAJO_ID);
                            //console.log(observacionestrabajo)
                            if (observacionestrabajo !== undefined && observacionestrabajo !== null && observacionestrabajo.trim() !== '') {
                                var patt = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                                var res = patt.test(observacionestrabajo);
                                if (!res) {
                                    global.warning('El texto ingresado en la observacion contiene caracteres no validos', 'Atencion');
                                    return;
                                }
                            }
                            //VALIDACION DE PARTIDAS DIN - DIANGNOSTICO INICIAL
                            let partidasTrabajo: any[] = global.getData(Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID), []);


                            let itemsPartidasValidacion: any[] = partidasTrabajo.filter((value) => {
                                return value.Partida.CausaFalla.FallaOrigen.Abreviatura === "DIN";
                            });
                            if (itemsPartidasValidacion && itemsPartidasValidacion.length > 0) {
                                global.info("La orden de trabajo no puede almacenarse porque tiene partidas con DIAGNOSTICO INCIAL");
                                return;
                            }
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

                            let observacionestrabajo: any = Forms.getValue("Observaciones", REPORTE_ORDEN_TRABAJO_ID);
                            //console.log(observacionestrabajo)
                            if (observacionestrabajo !== undefined && observacionestrabajo !== null && observacionestrabajo.trim() !== '') {
                                var patt = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                                var res = patt.test(observacionestrabajo);
                                if (!res) {
                                    global.warning('El texto ingresado en la observacion contiene caracteres no validos', 'Atencion');
                                    return;
                                }
                            }

                            let partidasTrabajo: any[] = global.getData(Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID), []);
                            let PartidasOtObservaciones = EK.Store.getState().forms.reporte$ordenTrabajo$partidas;
                            if (PartidasOtObservaciones !== undefined && PartidasOtObservaciones !== null) {
                                let o = PartidasOtObservaciones.form;
                                for (let p of partidasTrabajo) {
                                    let key = 'Observaciones_' + p.IdPartida;
                                    if (o[key] === undefined || o[key] === null) {
                                        p.Estado = 4;
                                    } else {
                                        p.Observaciones = o[key].value !== undefined ? o[key].value : 'Sin Observaciones';
                                        if (p.Observaciones !== undefined && p.Observaciones !== null && p.Observaciones.trim() !== '') {
                                            var patt = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                                            var res = patt.test(p.Observaciones);
                                            if (!res) {
                                                global.warning('Algun comentario en las incidencias contiene caracteres no validos', 'Atencion');
                                                return;
                                            }
                                        }
                                    }
                                }
                            }
                            let totalEliminar = 0;
                            for (let p of partidasTrabajo) {
                                if (p.Estado === 4) totalEliminar++;
                            }
                            if (totalEliminar === partidasTrabajo.length) {
                                global.warning('No puedes eliminar todas las incidencias de la OT');
                                return;
                            }
                            Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, partidasTrabajo);
                            this.onSave(false);
                        };
                    }}
                    onAddNew={() => {
                        //console.log('AddingNew');
                        global.dispatchSuccessful('load::AddingNewOT', true);
                        Forms.remove(REPORTE_ORDEN_TRABAJO_ID);
                        Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "EstatusOrdenTrabajo", { Clave: "N", Nombre: "NUEVO" });
                        global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                        this.props.config.setState({ viewMode: false, idOrden: 0, workMode: false }, REPORTE_ORDEN_TRABAJO_ID);

                    }}
                    formatter={(index: number, item: any) => {
                        //console.log(item)
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
                                if (item.IdAgenda !== null) {
                                    extraData.push(ReAppointment);
                                }
                                extraData.push(workOT);
                                extraData.push(printOT);
                            } else if (item.EstatusOrdenTrabajo.Clave === "T") {
                                extraData.push(printOT);
                            }
                        };

                        let HistorialTotalOT = getData(EK.Store.getState().global.catalogo$reporte$historialfechasot);
                        let _historialot = HistorialTotalOT.filter(x => x.IdExpediente === item.ID);
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
                                            let partidasTrabajo: any[] = global.getData(Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID), []);
                                            //console.log(partidasTrabajo)
                                            //console.log(item.NombreCatResponsable)
                                            //_item.ResponsableDictamen = 'N/A4'; Partidas que se muestran en la tabla de OT, modo edicion
                                            //console.log(_item,item)
                                            if (listaDictamenes != undefined && listaDictamenes != null && listaDictamenes.length > 0) {
                                                for (const dic of listaDictamenes) {
                                                    if (dic.Detalles && dic.Detalles !== undefined) {
                                                        let _partida = dic.Detalles.filter(x => x.IdReporteDetalle === _item.IdPartida)[0];
                                                        if (_partida !== undefined) {
                                                            _item.ResponsableDictamen = dic.ResponsableDictamen.Nombre;
                                                            break;
                                                        }
                                                    }

                                                }
                                            }
                                            _item.ResponsableDictamen = item.NombreCatResponsable;
                                            let loop = null;
                                            if (partidasTrabajo.length > 0) {
                                                loop = setInterval(VerificarListaCats, 500);

                                            }

                                            function VerificarListaCats() {
                                                let Responsables = EK.Store.getState().global.reporte$responsables;
                                                if (_item.ResponsableDictamen !== undefined && item.ResponsableDictamen !== null) {
                                                    if (Responsables !== undefined && Responsables.data.length > 0) {
                                                        clearInterval(loop);
                                                        let respDict = Responsables.data.filter(x => x.Nombre === _item.ResponsableDictamen)[0];
                                                        if (respDict !== undefined) {
                                                            Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "ResponsableDictamen", respDict);
                                                        }

                                                    }
                                                } else {
                                                    clearInterval(loop);
                                                }
                                            }

                                            let selectedIncidencia = EK.Store.getState().global.catalogo$reporte$fallas ? EK.Store.getState().global.catalogo$reporte$fallas.data.filter(x => x.ID === _item.Partida.ID)[0] : null;
                                            _item.ResponsableDictamen = item.NombreCatResponsable
                                            if (selectedIncidencia !== null) {
                                                _item.Partida.IdContratistaImputable = selectedIncidencia.IdContratistaImputable;
                                                _item.Partida.ContratistaImputable = selectedIncidencia.ContratistaImputable;

                                            }
                                            return <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.IdFalla}</span>{_item.Partida.Falla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{_item.Partida.UbicacionFalla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.FallaOrigen.ID}</span>{_item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{_item.ResponsableDictamen}</Column>
                                                <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow" style={{ paddingTop: '10px' }}>
                                                    <label.Label label="Observaciones de CAT en App" value={_item.ObservacionesCat} size={[12, 12, 12, 12]} />
                                                </Column>
                                                {_item.Partida.IdContratistaImputable !== null && _item.Partida.IdContratistaImputable !== undefined ?
                                                    <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow" style={{ paddingTop: '10px', border: "1px solid #ECEFF1" }}>
                                                        <p style={{ fontSize: "10px", fontWeight: "bold", paddingLeft: "15px" }}>CONTRATISTA IMPUTABLE</p>
                                                        <Row>
                                                            <Column size={[4, 4, 4, 4]} className="listItem-center-header" style={{}}><span className="badge badge-info bold">{_item.Partida.IdContratistaImputable}</span> {_item.Partida.ContratistaImputable.Nombre}</Column>
                                                            <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow" ><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.ContratistaImputable.TipoContrato.Nombre}</span></Column>
                                                            <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow" style={{ fontSize: "12px", color: "#7c7e97" }}>{"Imputable Falla"}</Column>
                                                        </Row>
                                                    </Column> : null
                                                }

                                            </Row>
                                        }} />
                                </Column>
                            </Row>
                            <Row>
                                <Column
                                    xs={{ size: 10 }}
                                    sm={{ size: 10, offset: 1 }}
                                    md={{ size: 10, offset: 1 }}
                                    lg={{ size: 10, offset: 1 }}
                                    className="panel-detail well well-sm">
                                    <List
                                        items={global.createSuccessfulStoreObject(_historialot)}
                                        readonly={true}
                                        listHeader={listHeaderHistorialFechasOT}
                                        addRemoveButton={false}
                                        formatter={(_indexH: number, _itemH: any): any => {
                                            //console.log(_itemH);
                                            return <Row id={"row_OT_Historial"} className="panel-collapsed" style={{ margin: 0 }}>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                                                <Column size={[3, 3, 3, 3]} className="listItem-center-header"><span className="text"> {global.formatDateTimeDirect(_itemH.FechaInicio, true)}</span></Column>
                                                <Column size={[3, 3, 3, 3]} className="listItem-center-header"><span className="text">{global.formatDateTimeDirect(_itemH.FechaFin, true)}</span></Column>
                                                <Column size={[4, 4, 4, 4]} className="listItem-center-header"><span className="badge badge-info bold">{_itemH.Descripcion}</span></Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
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
                            {
                                TerminadoCat && FechaIniReal !== null ?
                                    <label.Fecha id="FechaInicioReal" idForm={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} /> :
                                    <DatePicker id="FechaInicioReal" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />

                            }
                            {/*<DatePicker id="FechaFinReal" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} value={FechaFinReal} />*/}

                            <DatePicker id="FechaFinReal" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} value={FechaFinReal} />
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
                                    //DETALLE QUE SE RENDERIZA CUANDO SE ABRE LA VENTANA DE TRABAJAR OT
                                    if (listaDictamenes != undefined && listaDictamenes != null && listaDictamenes.length > 0) {
                                        for (const dic of listaDictamenes) {
                                            let _partida = dic.Detalles.filter(x => x.IdReporteDetalle === item.IdPartida)[0];
                                            if (_partida !== undefined) {
                                                item.ResponsableDictamen = dic.ResponsableDictamen.Nombre;
                                                break;
                                            }
                                        }
                                    }
                                    //item.ResponsableDictamen = 
                                    return <Row>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.IdFalla}</span>{item.Partida.Falla.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{item.Partida.UbicacionFalla.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.FallaOrigen.ID}</span>{item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow">{item.ResponsableDictamen}</Column>
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow" style={{ paddingTop: '10px', float: 'left' }}>
                                            <label.Label label="Observaciones de CAT en App" value={item.ObservacionesCat} size={[12, 12, 11, 11]} />
                                            <buttons.PopOver2 idParent={REPORTE_ORDEN_TRABAJO_ID} idForm={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} info={item} extraData={[editFalla]} />
                                        </Column>

                                    </Row>
                                }}>
                                {
                                    console.log(this.props)
                                }
                                <Row>
                                    <SPVTiposComponentesConsulta id="TipoFalla" tipovivienda={tipoVivienda} idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} usoFalla={"Ubicacion"} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                    <SPVComponentesConsulta id="Falla" idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} tipoVivienda={tipoVivienda} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                    <ddl.SPVUbicacionesFallasDDL id="UbicacionFalla" idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required(), validations.custom("", "", [""], ddl.ddlValidate)]} />
                                    <SPVCausasFallasConsulta idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                    <SPVFallasOrigenConsulta id="CausaFalla" idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                </Row>
                            </page.SectionList>
                        </Row> :
                        <Row>
                            <ContratistasReporteDDL idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[10, 10, 6, 6]} required={true} validations={[validations.required()]} />
                            <SPVContratistasConsulta visible={ComboDDL} idFormSection={REPORTE_ORDEN_TRABAJO_ID} idPlaza={idPlaza} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                            <SPVResponsableDictamenConsulta idPlaza={idPlaza} idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 10, 10]} required={true} validations={[validations.required()]} />

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
                                    //console.log(ordenesTrabajo)
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

                                    Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, entidades);
                                    //Forms.updateFormElement(config.id, REPORTE_FALLAS_ID, entidades);

                                    this.props.config.setState({ viewMode: true }, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                    //this.props.config.setState({ viewMode: true }, REPORTE_FALLAS_ID);



                                }}
                                formatter={(index: number, item: any) => {

                                    //item.ResponsableDictamen = 'N/A2'; //Estatus que se muestra cuando se selecciona la partida que se agrega a la OT
                                    item.ResponsableDictamen = item.ResponsableDictamen === null || item.ResponsableDictamen === '' || item.ResponsableDictamen === undefined ? 'N/A' : item.ResponsableDictamen
                                    if (listaOrdenesT != undefined && listaOrdenesT != null && listaOrdenesT.length > 0) {
                                        for (const ot of listaOrdenesT) {
                                            let _partida = ot.Partidas.filter(x => x.IdPartida === item.IdPartida)[0];
                                            if (_partida !== undefined) {
                                                item.ResponsableDictamen = ot.NombreCatResponsable;
                                                break;
                                            }
                                        }

                                    }
                                    if (item.ResponsableDictamen === 'N/A') {
                                        for (const d of listaDictamenes) {
                                            let _partida = d.Detalles.filter(x => x.IdReporteDetalle === item.IdPartida)[0];
                                            if (_partida !== undefined) {
                                                item.ResponsableDictamen = d.ResponsableDictamen.Nombre;
                                                break;
                                            }
                                        }
                                        //console.log()
                                    }
                                    //console.log(item)
                                    //item.ResponsableDictamen = 
                                    let loop = setInterval(VerificarListaCats, 100);
                                    function VerificarListaCats() {
                                        if (index === 0) {
                                            Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "ResponsableDictamen", null);
                                        }

                                        let yaSeleccionado: DataElement = Forms.getValue("ResponsableDictamen", REPORTE_ORDEN_TRABAJO_ID);
                                        if (yaSeleccionado !== null && yaSeleccionado !== undefined) {
                                            //if (nuevosAgregados )
                                            //    clearInterval(loop);
                                            //    return;
                                        }
                                        if (item.ResponsableDictamen !== undefined && item.ResponsableDictamen !== null) {
                                            let Responsables = EK.Store.getState().global.reporte$responsables;
                                            if (Responsables !== undefined && Responsables.data.length > 0) {
                                                clearInterval(loop);
                                                let respDict = Responsables.data.filter(x => x.Nombre === item.ResponsableDictamen)[0];
                                                if (respDict !== undefined) {
                                                    Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "ResponsableDictamen", respDict);
                                                    localStorage.setItem('RespDictSeleccionado', 'YaSeleccionado');
                                                }
                                            }
                                        } else {
                                            clearInterval(loop);
                                        }
                                    }

                                    let obs = item.Observaciones;
                                    return <Row>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.IdFalla}</span>{item.Partida.Falla.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{item.Partida.UbicacionFalla.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.FallaOrigen.ID}</span>{item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.ResponsableDictamen}</Column>

                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item " style={{ paddingTop: '5px' }}>
                                            <input.Text id={"Observaciones_" + item.IdPartida} value={obs} label="Observaciones" idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 12, 12]} />
                                        </Column>
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
                                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Familia"}</Column>
                                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Componente"}</Column>
                                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Origen Causa"}</Column>
                                            </Row>
                                        </Column>}
                                        formatter={(index: number, item: any) => {
                                            return <Row>
                                                <Column size={[1, 1, 1, 1]} style={{ marginBottom: -22, marginTop: -22, width: 50 }}><checkBox.CheckBox id={"partida_" + item.IdPartida} size={[1, 1, 1, 1]} value={item.ID ? true : false} initialValue={undefined} idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} /></Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.TipoFalla.ID}</span>{item.Partida.TipoFalla.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.Falla.IdFalla}</span>{item.Partida.Falla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{item.Partida.UbicacionFalla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.ID}</span>{item.Partida.CausaFalla.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Partida.CausaFalla.FallaOrigen.ID}</span>{item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
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

    interface IUbicacionClienteProps extends React.Props<any> {
        lote: any;
    };

    class ViewUbicacionCliente extends React.Component<IUbicacionClienteProps, {}>{
        render(): JSX.Element {
            let lote: any = this.props.lote;
            let plazaValue: any = (item: any) => {
                return !item ? "" : !item.Nombre ? "" : item.Nombre;
            };

            return <page.OptionSection
                id={REPORTE_UBICACION_ID}
                parent={config.id}
                subTitle={<span style={{ marginLeft: 5 }}>
                    <span className="badge badge-info bold">{lote.ClaveFormato}</span>
                </span>}
                level={1}
                icon="fa fa-home" collapsed={false} hideCollapseButton={false}>
                <Row>
                    <label.Label id="Calle" idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    <label.Entidad id="Desarrollo" idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} value={() => {
                        return !lote || !lote.Desarrollo ? "" : (!lote.DesarrolloClave ? "" : "<span class='badge badge-info'>" + lote.DesarrolloClave + "</span> ") + (!lote.Desarrollo.Nombre ? "" : lote.Desarrollo.Nombre);
                    }} />
                    <label.Entidad id="Plaza" idForm={REPORTE_UBICACION_ID} value={plazaValue} size={[12, 12, 12, 12]} />
                    <label.Entidad id="Segmento" idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    <label.Entidad id="Prototipo" idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                </Row>
            </page.OptionSection>
        };
    };

    export interface IPrereportesButtonProps extends IButtonProps, page.IProps { }

    export let PrereportesButton: any = global.connect(class extends React.Component<IPrereportesButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            //console.log(retValue);
            return retValue;
        };
        //' btn-income-data'
        static defaultProps: IPrereportesButtonProps = {
            icon: "fas fa-mobile-alt",
            text: "",
            color: "white",
            className: 'btn btn-default-ek',
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };


        componentWillMount() {

            global.asyncPost('base/scv/Prereportes/all', { activos: 1 }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //console.log(data);
                        if (data.length > 0) {
                            dispatchSuccessful('load::HasPreReportes', true);
                        } else {
                            dispatchSuccessful('load::HasPreReportes', false);
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        break;
                }
            });


        }

        render(): JSX.Element {
            let hasPrereportes = EK.Store.getState().global.HasPreReportes !== undefined ? global.getData(EK.Store.getState().global.HasPreReportes) : null;
            if (hasPrereportes === true) {
                let btnPre = document.getElementById('btn_prereportes');
                if (btnPre !== null && btnPre !== undefined) {
                    btnPre.classList.add("btn-income-data");

                }
            } else {
                let btnPre = document.getElementById('btn_prereportes');
                if (btnPre !== null && btnPre !== undefined) {
                    btnPre.classList.remove("btn-income-data");
                }
            }

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
                    console.log(dataEntity)
                    dataEntity.Partidas.forEach((value: any) => {
                        value.ListaEvidenciasCte = null;
                    });
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
            retValue.Procede = retValue.DiasGarantia >= 0 ? "S" : "N";
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
            retValue.Procede = retValue.DiasGarantia >= 0 ? "S" : "N";
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

        componentWillReceiveProps(nextProps: IEditProps): void {
        }

        onButtonClick(): void {
            //
            let cliente: any = Forms.getDataValue("Cliente", config.id, EK.Store.getState());
            let folio: any = EK.Store.getState().global.currentEntity !== null && EK.Store.getState().global.currentEntity !== undefined ? EK.Store.getState().global.currentEntity.data.ID : 0;
            if (cliente === undefined || cliente.data === undefined) {
                cliente = getData(EK.Store.getState().global.currentEntity).Cliente;
            } else {
                cliente = getData(cliente);
            }
            // console.log(cliente);
            if (cliente) {
                //  Forms.updateFormElement("BitacoraClienteSPV", "Cliente", { "IdEntity": null, "Clave": null, "Nombre": "ANABEL CARRILLO MENDEZ", "IdUbicacion": 234481, "TelefonoCasa": null, "TelefonoOficina": null, "TelefonoOtros": null, "CorreoElectronico": null, "FechaNacimiento": "0001-01-01T00:00:00", "RFC": null, "Direccion": null, "Colonia": null, "Ciudad": null, "Municipio": null, "EntidadFederal": null, "Pais": null, "CodigoPostal": null, "UbicacionClave": "1610", "UbicacionClaveFormato": "1-6-1-0", "IdCoordinador": null, "IdSupervisor": null, "Antiguedad": 0, "Desarrollo": { "ID": null, "LatitudLongitud": null, "CapasGJson": null, "Direccion": null, "Plaza": null, "Latitud": null, "Longitud": null, "Clave": "CG", "Nombre": null, "Creado": null, "CreadoPor": null, "Modificado": null, "ModificadoPor": null, "Version": null, "Estado": 0, "Estatus": null, "IdEstatus": null, "IdCreadoPor": null, "IdModificadoPor": null, "Sistema": null, "TrackChanges": false }, "Capital": null, "CapitalMoneda": null, "Interes": null, "InteresMoneda": null, "Importe": null, "ImporteMoneda": null, "Moneda": null, "IdMoneda": null, "TipoCambio": null, "Saldo": null, "Pagado": null, "ID": 1071607, "Creado": null, "CreadoPor": null, "Modificado": null, "ModificadoPor": null, "Version": null, "Estado": 2, "Estatus": null, "IdEstatus": null, "IdCreadoPor": null, "IdModificadoPor": null, "Sistema": null, "TrackChanges": true });
                Forms.updateFormElement("BitacoraClienteSPV", "Cliente", cliente);
                //Forms.updateFormElement("BitacoraClienteSPV", "VerComentarios", { ID: 1, Clave: "F", Nombre: "Ver Solo Comentarios del Folio" });
                if (folio > 0) {
                    Forms.updateFormElement("BitacoraClienteSPV", "VerComentarios", { ID: 1, Clave: "F", Nombre: "Ver Solo Comentarios del Folio" });
                } else {
                    Forms.updateFormElement("BitacoraClienteSPV", "VerComentarios", { ID: 2, Clave: "C", Nombre: "Ver la Información Completa del Cliente" });
                }
                global.dispatchSuccessful("global-page-entity", { origen: "Folio" }, "BitacoraClienteSPV$Origen");
            } else {
                Forms.updateFormElement("BitacoraClienteSPV", "Cliente", null);
                Forms.updateFormElement("BitacoraClienteSPV", "VerComentarios", { ID: 2, Clave: "C", Nombre: "Ver la Información Completa del Cliente" });
                global.dispatchSuccessful("global-page-entity", { origen: "DashBoardFailureReporte" }, "BitacoraClienteSPV$Origen");
            }
            global.dispatchSuccessful("global-page-data", [], "BitacoraClienteSPV$Detalle");
            global.dispatchSuccessful("global-page-entity", [], "BitacoraClienteSPV$Ubicacion");
            global.dispatchSuccessful("global-page-entity", [], "BitacoraClienteSPV$Ubicacion$Detalle");
            global.dispatchSuccessful("global-page-entity", [], "BitacoraClienteSPV$Etapa");

            let modalCalen: any = $("#modalBitacoraClienteSPV");
            modalCalen.modal();
        };
        render(): JSX.Element {
            {/*return <span>
                <Button keyBtn={"btnSPVBitacoraCliente"} {...this.props} id="btn_bitacora" onClick={this.onButtonClick} />
            </span>*/}
            if (global.isSuccessful(this.props.entidad)) {
                //if (global.getData(this.props.entidad).Cancelado === 'S' || global.getData(this.props.entidad).IdEstatusReporte === 'T') {
                if (global.getData(this.props.entidad).Cancelado === 'S') {
                    return null;
                };
                return <span>
                    <Button keyBtn={"btnSPVBitacoraCliente"} {...this.props} id="btn_bitacora" onClick={this.onButtonClick} />
                </span>
            }
            return null;
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
            </span >

        };
    });

};

import reportesFallas = EK.Modules.SCV.Pages.postventa.RUBA.ReportesFallas;