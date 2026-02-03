namespace EK.Modules.SCV.Pages.postventa.RUBA.BitacoraEspSPVCliente {
    "use strict";
    const PAGE_ID: string = "BitacoraEspSPVCliente";
    const PAGE_UBICACION_ID: string = "BitacoraEspSPVCliente$ubicacion";
    const PAGE_REPORTE_ID: string = "BitacoraEspSPVCliente$reporte";
    const PAGE_REPORTE_PARTIDAS_ID: string = "BitacoraEspSPVCliente$reportePartidas";
    const PAGE_REPORTE_ORDEN_TRABAJO_ID: string = "BitacoraEspSPVCliente$reporte$ordenTrabajo";
    const PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID: string = "contratistasLotes$ordenTrabajoCheck";
    const PAGE_BITACORA_CLIENTE_ID: string = PAGE_ID + "$bitacora$cliente";
    const PAGE_BITACORA_COMENTARIOS_CLIENTE_ID: string = PAGE_ID + "$bitacora$cliente$comentarios";
    const PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID: string = PAGE_ID + "$bitacora$cliente$historialincidencias";
    const PAGE_BITACORA: string = PAGE_ID + "$bitacora$cliente$incidencias";
    const BITACORA_AGENDA_CLIENTE_ID: string = PAGE_ID + "$agenda$historial$cliente";
    const PAGE_CLIENTE_INFO_ID: string = PAGE_ID + "$clienteInfo";
    const UBICACION_DETALLE_ID: string = PAGE_ID + "$ubicacion$detalle";
    const CLIENTE_ETAPA_ID: string = PAGE_ID + "$cliente$etapa";
    const REPORTES_UBICACION: string = PAGE_ID + "$reportes$ubicacion";
    const SEGUIMIENTO_EXPEDIENTE: string = PAGE_ID + "$seguimiento$expediente";
    const UBICACION_EQUIPAMIENTO: string = PAGE_ID + "$ubicacion$equipamiento";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_UBICACION_ID, PAGE_REPORTE_ID, PAGE_REPORTE_PARTIDAS_ID, PAGE_REPORTE_ORDEN_TRABAJO_ID, PAGE_BITACORA_COMENTARIOS_CLIENTE_ID, PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID, UBICACION_DETALLE_ID, CLIENTE_ETAPA_ID, REPORTES_UBICACION, SEGUIMIENTO_EXPEDIENTE, BITACORA_AGENDA_CLIENTE_ID, UBICACION_EQUIPAMIENTO, PAGE_BITACORA_CLIENTE_ID, PAGE_CLIENTE_INFO_ID]);
    let getColumnasBitacora = ()=>{
        let columnas = [
            {
                caption: "Verificado", dataField: "verificado", 
            },
            { caption: "ID", dataField: "ID" },
            { caption: "Incidencia", dataField: "IdPartida", alignment: 'center' },
            { caption: "Fecha", dataField: "Fecha", dataType: 'datetime', format: 'dd/MM/yyyy',  alignment: 'center' },
            { caption: "Comentario", dataField: "Descripcion",  minWidth: 50 },
            { caption: "Folio", dataField: "IdFolio",  alignment: 'center' },
            { caption: "Creado Por", dataField: "ModificadoPor.Nombre" },
        ];
        return columnas;
    }
    const listHeaderReporteOrdenesTrabajo: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Inicio Estimado Trabajo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Final Estimado Trabajo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Planificación Servicio"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderReporteOrdenesTrabajoPartidas: JSX.Element =
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

    const listHeaderReportePartidas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Familia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">{"No. Reincidencias"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Cliente"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">{"Garantía (días)"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Término Garantía"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fecha Cerrado"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Procede"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderEvidenciasEntrega: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fecha Inicio"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fecha Fin"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Observaciones"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Ver"}</Column>
            </Row>
        </Column>

    const listHeaderReporteUbicacion: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"FOLIO"}</Column>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"FECHA REPORTE"}</Column>
            </Row>
        </Column>

    const listHeaderComentariosCliente: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Fecha"}</Column>
                <Column size={[8, 8, 8, 8]} className="list-default-header">{"Observaciones"}</Column>
            </Row>
        </Column>

    const listHeaderHistorialIncidenciasCliente: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Folio"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Familia"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Componente"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Ubicacion incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"No. Reincidencias"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
            </Row>
        </Column>

    const listHeaderSeguimientoExpediente: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 4, 4]} className="list-default-header">{"ETAPA"}</Column>
                <Column size={[12, 12, 3, 3]} className="list-default-header">{"EMP. CAPTURÓ"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-default-header">{"ESTATUS"}</Column>
                <Column size={[12, 12, 2, 2]} className="list-default-header">{"FECHA INICIAL"}</Column>
                <Column size={[12, 12, 2, 2]} className="list-default-header">{"FECHA FINAL"}</Column>
            </Row>
        </Column>

    const listHeaderUbicacionEquipamiento: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 4, 4]} className="list-default-header">{"CLAVE"}</Column>
                <Column size={[12, 12, 8, 8]} className="list-default-header">{"DESCRIPCION"}</Column>
            </Row>
        </Column>


    export const Edicion: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            props.config.setEntity({});
            global.dispatchSuccessful("global-page-entity", {}, PAGE_UBICACION_ID);
            global.dispatchSuccessful("global-page-entity", {}, PAGE_REPORTE_ID);
            global.dispatchSuccessful("global-page-entity", {}, UBICACION_DETALLE_ID);
            global.dispatchSuccessful("global-page-entity", {}, CLIENTE_ETAPA_ID);
            global.dispatchSuccessful("global-page-entity", {}, PAGE_BITACORA_CLIENTE_ID);
            global.dispatchSuccessful("global-page-data", [], BITACORA_AGENDA_CLIENTE_ID);
            global.dispatchSuccessful("global-page-entity", {}, PAGE_CLIENTE_INFO_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTES_UBICACION);
            global.dispatchSuccessful("global-page-data", [], SEGUIMIENTO_EXPEDIENTE);
            global.dispatchSuccessful("global-page-data", [], UBICACION_EQUIPAMIENTO);
            global.dispatchSuccessful("global-page-data", [], PAGE_BITACORA_COMENTARIOS_CLIENTE_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID);
            delete EK.Store.getState().global.tmpDataHistorial;

            try {
                $(`#dxHistorialIncidencias`).dxDataGrid("dispose");
            } catch (ex) { }
            props.config.setState({ viewMode: false });
        };
        onFilter(props: any, filters: any, type?: string): void { };
        onEntityLoaded(props: page.IProps): void { };
        onEntitySaved(props: page.IProps): void {
            global.dispatchSuccessful("global-page-entity", {}, PAGE_UBICACION_ID);
            global.dispatchSuccessful("global-page-entity", {}, PAGE_REPORTE_ID);
            global.dispatchSuccessful("global-page-entity", {}, UBICACION_DETALLE_ID);
            global.dispatchSuccessful("global-page-entity", {}, CLIENTE_ETAPA_ID);
            global.dispatchSuccessful("global-page-entity", {}, PAGE_BITACORA_CLIENTE_ID);
            global.dispatchSuccessful("global-page-data", [], BITACORA_AGENDA_CLIENTE_ID);
            global.dispatchSuccessful("global-page-entity", {}, PAGE_CLIENTE_INFO_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);
            global.dispatchSuccessful("global-page-data", [], REPORTES_UBICACION);
            global.dispatchSuccessful("global-page-data", [], SEGUIMIENTO_EXPEDIENTE);
            global.dispatchSuccessful("global-page-data", [], UBICACION_EQUIPAMIENTO);
            global.dispatchSuccessful("global-page-data", [], PAGE_BITACORA_COMENTARIOS_CLIENTE_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID);
            delete EK.Store.getState().global.tmpDataHistorial;

            try {
                $(`#dxHistorialIncidencias`).dxDataGrid("dispose");
            } catch (ex) { }
            Forms.remove(PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID);
            props.config.setState({ viewMode: false });
        };
        onSave() {
            let model = { Cliente: 12332 };
            return model;
        }
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowNew={false}
                allowSave={false}
                allowDelete={false}
                onFilter={this.onFilter.bind(this)}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntitySaved={this.onEntitySaved.bind(this)}
                onSave={this.onSave.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <PageButtons>
                    <ImprimirExpedienteCliente />
                    <BitacoraPrintButton />
                    <FormalizacionVentaButton />
                    <EquipamientoViviendaButton />
                </PageButtons>
                <ModalPhotoViewer size={[12, 12, 12, 12]} />
                <Edit />
            </page.Main>
        };
    });

    interface IEditProps extends page.IProps {
        clienteRef?: DataElement;
        clienteInfo?: DataElement;
        ubicacion?: DataElement;
        reporte?: DataElement;
        reportesPartidas?: global.DataElement;
        partidas?: DataElement;
        ordenesTrabajo?: DataElement;
        obtenerUbicacion?: (idUbicacion: number) => void;
        obtenerReporte?: (id: number) => void;
        obtenerEtapa?: (id: number) => void;
        obtenerExpediente?: (idCliente: number) => void;
        obtenerBitacora?: (idCliente: number) => void;
        obtenerBitacoraArchivosEntrega?: (idCliente: number) => void;
        obtenerBitacoraClienteComentarios?: (idCliente: number) => void;
        obtenerHistorialIncidencias?: (idCliente: number) => void;
        obtenerCliente?: (id: number) => void;
        clienteEtapa?: global.DataElement;
        ubicacionDetalle?: global.DataElement;
        reportesUbicacion?: global.DataElement;
        expedientes?: global.DataElement;
        observacionesCliente?: global.DataElement;
        historialIncidenciasCliente?: global.DataElement;
        equipamiento?: global.DataElement;
        bitacora?: global.DataElement;
        bitacoraAgendaCliente?: global.DataElement;
    };

    const Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state);
            retValue.ubicacionDetalle = state.global["entity$" + UBICACION_DETALLE_ID];
            retValue.clienteEtapa = state.global["entity$" + CLIENTE_ETAPA_ID];
            retValue.ubicacion = state.global.entity$BitacoraEspSPVCliente$ubicacion;
            retValue.reportesUbicacion = state.global["catalogo$" + REPORTES_UBICACION];
            retValue.reportesPartidas = state.global["catalogo$" + PAGE_REPORTE_PARTIDAS_ID];
            retValue.reporte = state.global.entity$BitacoraEspSPVCliente$reporte;
            retValue.partidas = state.global.catalogo$BitacoraEspSPVCliente$reportePartidas;
            retValue.ordenesTrabajo = state.global.catalogo$BitacoraEspSPVCliente$reporte$ordenTrabajo;
            retValue.expedientes = state.global["catalogo$" + SEGUIMIENTO_EXPEDIENTE];
            retValue.equipamiento = state.global["catalogo$" + UBICACION_EQUIPAMIENTO];
            retValue.bitacora = state.global["entity$" + PAGE_BITACORA_CLIENTE_ID];
            retValue.bitacoraAgendaCliente = state.global["catalogo$" + BITACORA_AGENDA_CLIENTE_ID];
            retValue.observacionesCliente = state.global["catalogo$" + PAGE_BITACORA_COMENTARIOS_CLIENTE_ID];
            retValue.historialIncidenciasCliente = state.global["catalogo$" + PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID];
            retValue.clienteInfo = state.global["entity$" + PAGE_CLIENTE_INFO_ID];
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerUbicacion: (idUbicacion: number): void => {
                let encodedFilters: string = global.encodeObject({ id: idUbicacion });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, PAGE_UBICACION_ID);
            },
            obtenerReporte: (id: number): void => {
                global.dispatchAsyncPost("global-page-entity", "base/scv/ReportesFallas/id", { id }, PAGE_REPORTE_ID);
            },
            obtenerEtapa: (argIdCliente: number): void => {
                let fecha: Date = new Date();
                let encodedFilters: string = global.encodeObject({ idCliente: argIdCliente, fechaReporte: fecha.toISOString() });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetClienteEtapa/" + encodedFilters, CLIENTE_ETAPA_ID);
            },
            obtenerExpediente: (argIdCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente: argIdCliente });
                global.dispatchAsync("global-page-data", "base/scv/ClientesSPV/GetBP/GetEtapasExpediente/" + encodedFilters, SEGUIMIENTO_EXPEDIENTE);
                global.dispatchAsync("global-page-data", "base/scv/ConsultaViviendaEntregable/GetBP/GetEquipamientoUbicacion/" + encodedFilters, UBICACION_EQUIPAMIENTO);
            },
            obtenerBitacora: (idCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente });
                global.dispatchAsync("global-page-entity", "base/scv/ClientesSPV/GetBP/GetBitacora/" + encodedFilters, PAGE_BITACORA_CLIENTE_ID);
            },
            obtenerCliente: (id: number): void => {
                global.dispatchAsyncPost("global-page-entity", "base/scv/ClientesSPV/id", { id }, PAGE_CLIENTE_INFO_ID);
            },
            obtenerBitacoraArchivosEntrega: (idCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente });
                global.dispatchAsync("global-page-data", "base/scv/ClientesSPV/GetBP/getBitacoraArchivosEntrega/" + encodedFilters, BITACORA_AGENDA_CLIENTE_ID);
            },
            obtenerBitacoraClienteComentarios: (idCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente });
                global.dispatchAsync("global-page-data", "base/scv/ClientesSPV/GetBP/getBitacoraClientesComentarios/" + encodedFilters, PAGE_BITACORA_COMENTARIOS_CLIENTE_ID);
            },
            obtenerHistorialIncidencias: (idCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente });
                //global.dispatchAsync("global-page-data", "base/scv/ClientesSPV/GetBP/getHistorialIncidencias/" + encodedFilters, PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID);
                let loader = document.getElementById('loading');
                let loadedTable = document.getElementById('loadedData');
                global.asyncGet("base/scv/ClientesSPV/GetBP/getHistorialIncidencias/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                          //  console.log(data)

                            let columnas = [
                                { caption: "Folio", dataField: "IdReporte" },
                                { caption: "No. Incidencia", dataField: "Partida", alignment:"center" },
                                { caption: "Familia", dataField: "TipoFalla.Nombre" },
                                { caption: "Componente", dataField: "Falla.Nombre" },
                                { caption: "Ubicacion Incidencia", dataField: "UbicacionFalla.Nombre" },
                                { caption: "No. Reincidencias", dataField: "Reincidencias", alignment: "center" },
                                { caption: "Contratista", dataField: "Contratista.Nombre" },
                                { caption: "Incidencia", dataField: "CausaFalla.Nombre" }
                            ];
                            dispatchSuccessful("load::tmpDataHistorial", data);
                            global.loadDxGridTable('dxHistorialIncidencias', columnas, data, true, 'Reporte_Historial_Incidencias');
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
            },
            
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (hasChanged(this.props.clienteRef, nextProps.clienteRef) && getDataID(this.props.clienteRef) !== getDataID(nextProps.clienteRef)) {
                if (isSuccessful(nextProps.clienteRef)) {
                    let item: any = global.getData(nextProps.clienteRef);
                    let idCliente: any = global.getDataID(nextProps.clienteRef) && global.getDataID(nextProps.clienteRef) != undefined && global.getDataID(nextProps.clienteRef) != null ? global.getDataID(nextProps.clienteRef) : 0;
                    let cliente: any = global.getData(nextProps.clienteRef);
                    let idUbicacion: any = cliente.IdUbicacion != null && cliente.IdUbicacion != undefined ? cliente.IdUbicacion : 0;
                    if (idCliente > 0) {
                        console.log(idCliente)
                        this.props.obtenerUbicacion(item.IdUbicacion);
                        this.props.obtenerEtapa(idCliente);
                        this.props.obtenerExpediente(idCliente);
                        this.props.obtenerBitacora(idCliente);
                        this.props.obtenerBitacoraArchivosEntrega(idCliente);
                        this.props.obtenerCliente(idCliente);
                        this.props.obtenerBitacoraClienteComentarios(idCliente);
                        this.props.obtenerHistorialIncidencias(idCliente);
                        let fechaIncial: any = new Date('1990-01-01');
                        let fechaFinal: any = new Date();
                        let p: any = global.assign({
                            Plaza: -2,
                            Fraccionamiento: -2,
                            Vocaciones: -2,
                            FechaInicial: fechaIncial,
                            FechaFinal: fechaFinal,
                            Opcionales: "Bitacora",
                            Cliente: idCliente
                        });
                        global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
                        global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);
                        global.dispatchSuccessful("global-page-data", [], UBICACION_EQUIPAMIENTO);
                        global.dispatchAsyncPost("global-page-entity", "base/kontrol/CapturaFechaConstruccion/GetBP/GetFechaConstruccion/", { parametros: p }, UBICACION_DETALLE_ID);
                        global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/all/" + global.encodeObject({ idCliente: idCliente }), REPORTES_UBICACION);
                    } else {
                        global.dispatchSuccessful("global-page-entity", {}, PAGE_UBICACION_ID);
                        global.dispatchSuccessful("global-page-entity", {}, PAGE_REPORTE_ID);
                        global.dispatchSuccessful("global-page-entity", {}, UBICACION_DETALLE_ID);
                        global.dispatchSuccessful("global-page-entity", {}, CLIENTE_ETAPA_ID);
                        global.dispatchSuccessful("global-page-entity", {}, PAGE_BITACORA_CLIENTE_ID);
                        global.dispatchSuccessful("global-page-entity", {}, PAGE_CLIENTE_INFO_ID);
                        global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
                        global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);
                        global.dispatchSuccessful("global-page-data", [], REPORTES_UBICACION);
                        global.dispatchSuccessful("global-page-data", [], SEGUIMIENTO_EXPEDIENTE);
                        global.dispatchSuccessful("global-page-data", [], BITACORA_AGENDA_CLIENTE_ID);
                        global.dispatchSuccessful("global-page-data", [], UBICACION_EQUIPAMIENTO);
                        global.dispatchSuccessful("global-page-data", [], PAGE_BITACORA_COMENTARIOS_CLIENTE_ID);
                        global.dispatchSuccessful("global-page-data", [], PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID);
                        delete EK.Store.getState().global.tmpDataHistorial;

                        try {
                            $(`#dxHistorialIncidencias`).dxDataGrid("dispose");
                        } catch (ex) { }
                    }
                };
                if (nextProps.clienteRef.data === undefined) {
                    global.dispatchSuccessful("global-page-entity", {}, PAGE_UBICACION_ID);
                    global.dispatchSuccessful("global-page-entity", {}, PAGE_REPORTE_ID);
                    global.dispatchSuccessful("global-page-entity", {}, UBICACION_DETALLE_ID);
                    global.dispatchSuccessful("global-page-entity", {}, CLIENTE_ETAPA_ID);
                    global.dispatchSuccessful("global-page-entity", {}, PAGE_BITACORA_CLIENTE_ID);
                    global.dispatchSuccessful("global-page-entity", {}, PAGE_CLIENTE_INFO_ID);
                    global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
                    global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);
                    global.dispatchSuccessful("global-page-data", [], REPORTES_UBICACION);
                    global.dispatchSuccessful("global-page-data", [], SEGUIMIENTO_EXPEDIENTE);
                    global.dispatchSuccessful("global-page-data", [], BITACORA_AGENDA_CLIENTE_ID);
                    global.dispatchSuccessful("global-page-data", [], UBICACION_EQUIPAMIENTO);
                    global.dispatchSuccessful("global-page-data", [], PAGE_BITACORA_COMENTARIOS_CLIENTE_ID);
                    global.dispatchSuccessful("global-page-data", [], PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID);
                    delete EK.Store.getState().global.tmpDataHistorial;

                    try {
                        $(`#dxHistorialIncidencias`).dxDataGrid("dispose");
                    } catch (ex) { }
                }
            };

            if (hasChanged(this.props.reporte, nextProps.reporte) && getDataID(this.props.reporte) !== getDataID(nextProps.reporte)) {
                if (isSuccessful(nextProps.reporte)) {
                    let reporte: any = global.getData(nextProps.reporte);
                    let partidas: DataElement = global.createSuccessfulStoreObject(reporte.Partidas);
                    let ordenesTrabajo: DataElement = global.createSuccessfulStoreObject(reporte.OrdenesTrabajo);
                    //console.log(partidas)
                    Forms.updateFormElement(config.id, PAGE_REPORTE_PARTIDAS_ID, partidas);
                    Forms.updateFormElement(config.id, PAGE_REPORTE_ORDEN_TRABAJO_ID, ordenesTrabajo);
                    Forms.remove(PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID);
                };
            };
        };
        
        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.clienteRef, nextProps.clienteRef) ||
                hasChanged(this.props.clienteInfo, nextProps.clienteInfo) ||
                hasChanged(this.props.clienteEtapa, nextProps.clienteEtapa) ||
                hasChanged(this.props.ubicacionDetalle, nextProps.ubicacionDetalle) ||
                hasChanged(this.props.ubicacion, nextProps.ubicacion) ||
                hasChanged(this.props.reporte, nextProps.reporte) ||
                hasChanged(this.props.reportesPartidas, nextProps.reportesPartidas) ||
                hasChanged(this.props.reportesUbicacion, nextProps.reportesUbicacion) ||
                hasChanged(this.props.partidas, nextProps.partidas) ||
                hasChanged(this.props.ordenesTrabajo, nextProps.ordenesTrabajo) ||
                hasChanged(this.props.expedientes, nextProps.expedientes) ||
                hasChanged(this.props.equipamiento, nextProps.equipamiento) ||
                hasChanged(this.props.bitacoraAgendaCliente, nextProps.bitacoraAgendaCliente) ||
                hasChanged(this.props.observacionesCliente, nextProps.observacionesCliente) ||
                hasChanged(this.props.bitacora, nextProps.bitacora);
        };
        componentDidUpdate(prevProps: IEditProps, { }) {
            if (isSuccessful(this.props.clienteEtapa)) {
                if (hasChanged(prevProps.clienteEtapa, this.props.clienteEtapa)) {
                    let contador: any;
                    contador = $(".counter");
                    if (contador.length > 0) {
                        contador.counterUp();
                    }
                }
            }
        };
        onClickItem(item: any) {
            if (item.ID != null && item.ID != undefined) {
                this.props.obtenerReporte(item.ID);
            }
        };

        OpenPhotoViewer(img) {
            //console.log(img);
            dispatchSuccessful('load::TipoViewer', 'EXPEDIENTE')
            dispatchSuccessful('load::ImageValueURI', img)
            let modalCalen: any = $("#ModalPhotoViewer");
            modalCalen.modal();
            //console.log(img)
        }

        imprimirHistorial() {
           // let id: number = global.getDataID(this.props.clienteRef);
           // let win = window.open("scv/reportesFallas/imprimirDocumento/FormalizacionVenta/" + id, "_blank")

            let cliente = global.getData(EK.Store.getState().global.entity$BitacoraEspSPVCliente$clienteInfo);
            if (isEmptyObject(cliente)) {
                global.warning("La informacion del cliente no esta lista.");
                return;
            }

            //let operacionEspecificaSP: string = "BitacoraCompleta";
            //let win = window.open("scv/bitacoraCLienteSPV/imprimirDocumentoHistorial/" + cliente.ID, "_blank")
            //console.log('imprimir historial')
        }

        refreshDxTable() {
            let dataHistorial = EK.Store.getState().global.tmpDataHistorial;
            if (dataHistorial && dataHistorial !== null && dataHistorial !== undefined) {
                let columnas = [
                    { caption: "Folio", dataField: "IdReporte" },
                    { caption: "No. Incidencia", dataField: "Partida", alignment: "center" },
                    { caption: "Familia", dataField: "TipoFalla.Nombre" },
                    { caption: "Componente", dataField: "Falla.Nombre" },
                    { caption: "Ubicacion Incidencia", dataField: "UbicacionFalla.Nombre" },
                    { caption: "No. Reincidencias", dataField: "Reincidencias", alignment: "center" },
                    { caption: "Contratista", dataField: "Contratista.Nombre" },
                    { caption: "Incidencia", dataField: "CausaFalla.Nombre" }
                ];
                global.loadDxGridTable('dxHistorialIncidencias', columnas, dataHistorial.data, true, 'Reporte_Historial_Incidencias');
               // console.log('volver a cargar tabla');
            }
            
        }
        obtenerBitacoraCliente() {
            let Cliente = Forms.getValue("Cliente", config.id)
            //let idCliente = Cliente.ID
            let idCliente: any = Cliente.ID > 0 ? Cliente.ID : 0;
            console.log(idCliente)
            let encodedFilters: string = global.encodeObject({ idCliente, OperacionEspecificaSP: "BitacoraCompleta" });
            //global.dispatchAsync("global-page-data", "base/scv/ClientesSPV/GetBP/getHistorialIncidencias/" + encodedFilters, PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID);
            let loader = document.getElementById('loaderBitacoraComentarios');
            let loadedTable = document.getElementById('loadedBitacoraComentarios');
            let columnas = getColumnasBitacora();
            global.asyncGet("base/scv/BitacoraClienteSPV/all/" + encodedFilters, (status: AsyncActionTypeEnum, dataResponse: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        let datagrid = $(`#dxBitacora`).dxDataGrid({
                            dataSource: dataResponse,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            sorting: {
                                mode: "multiple" // or "multiple" | "none"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
                            },
                            searchPanel: {
                                visible: false
                            },
                            paging: {
                                pageSize: 10
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
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                        }).dxDataGrid("instance");
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        break;
                }
            });
            //global.dispatchDxTableBitacoraAsyncGet('dxBitacora', "base/scv/BitacoraClienteSPV/all/",
            //    encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', false);
        }

        render(): JSX.Element {
            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";
                if (global.isSuccessful(this.props.reporte)) {
                    let reporte: any = global.getData(this.props.reporte);
                    let fechaCaptura: Date = new Date(reporte.FechaCaptura);
                    let horasTrascurridas: number = global.getDateDiff(fechaCaptura, global.getToday(), "hours");
                    if (horasTrascurridas <= 24) {
                        className = "fas fa-unlock";
                    };
                };

                return global.formatDate(value) + " <span class='pull-right'><i class='" + className + "' style='color:#1A237E;'></i></span>";
            };
            let diasEntrega: any = 0;
            let mesesEntrega: any = 0;
            let reportesFalla: any = 0;
            let lote: any = global.getData(this.props.ubicacion);
            let clienteEtapa: any = global.getData(this.props.clienteEtapa);
            let ubicacionDetalle: any = global.getData(this.props.ubicacionDetalle);

            diasEntrega = clienteEtapa.MesesTranscurridos ? clienteEtapa.MesesTranscurridos : 0;
            mesesEntrega = clienteEtapa.MesesTranscurridosEntrega ? clienteEtapa.MesesTranscurridosEntrega : 0;
            if (ubicacionDetalle.length > 0) {
                reportesFalla = ubicacionDetalle[0].CantReportesFallas ? ubicacionDetalle[0].CantReportesFallas : 0;
            };

            let ListaEvidenciasArchivosConst = this.props.bitacoraAgendaCliente !== null && this.props.bitacoraAgendaCliente !== undefined ? this.props.bitacoraAgendaCliente.data.filter(x => x.btIdTipoAgenda === 1041) : [];
            let ListaEvidenciasArchivosEnt = this.props.bitacoraAgendaCliente !== null && this.props.bitacoraAgendaCliente !== undefined ? this.props.bitacoraAgendaCliente.data.filter(x => x.btIdTipoAgenda === 1031) : [];
            //console.log(this.props.bitacoraAgendaCliente,ListaEvidenciasArchivosConst)
            let templista = [];
            let tempSublista = [];
            for (let ent of ListaEvidenciasArchivosConst) {
                if (templista.length <= 0) {
                    tempSublista.push({ img: ent.ImgEvidencia, tipo: ent.TipoArchivo, ext: ent.Extension });
                    ent.ListaDocs = tempSublista;
                    templista.push(ent);
                }
                else {
                    let temprow = templista.filter(x => x.IdAgenda == ent.IdAgenda)[0];
                    if (temprow !== undefined) {
                        temprow.ListaDocs.push({ img: ent.ImgEvidencia, tipo: ent.TipoArchivo, ext: ent.Extension });
                    } else {
                        tempSublista.push({ img: ent.ImgEvidencia, tipo: ent.TipoArchivo, ext: ent.Extension })
                        ent.ListaDocs = tempSublista;
                        templista.push(ent);
                    }
                }
                tempSublista = [];
            }
            ListaEvidenciasArchivosConst = templista;
            templista = [];
            for (let ent of ListaEvidenciasArchivosEnt) {
                if (templista.length <= 0) {
                    tempSublista.push({ img: ent.ImgEvidencia, tipo: ent.TipoArchivo, ext: ent.Extension });
                    ent.ListaDocs = tempSublista;
                    templista.push(ent);
                }
                else {
                    let temprow = templista.filter(x => x.IdAgenda == ent.IdAgenda)[0];
                    if (temprow !== undefined) {
                        temprow.ListaDocs.push({ img: ent.ImgEvidencia, tipo: ent.TipoArchivo, ext: ent.Extension });
                    } else {
                        tempSublista.push({ img: ent.ImgEvidencia, tipo: ent.TipoArchivo, ext: ent.Extension })
                        ent.ListaDocs = tempSublista;
                        templista.push(ent);
                    }
                }
                tempSublista = [];
            }
            ListaEvidenciasArchivosEnt = templista;
            templista = [];
            ///console.log(templista)
            let cte = this.props.clienteInfo ? this.props.clienteInfo.data : {};
            //console.log(cte);
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        level={1}
                        subTitle=" Bitácora del Cliente "
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={false}>
                        <Row>
                            <select.ClientesLotesSPV idForm={config.id} size={[12, 12, 12, 12]} required={true} validations={[validations.required()]} />
                            <label.Label id="TelefonoCasa" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 2, 2]} />
                            <label.Label id="TelefonoOficina" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 2, 2]} />
                            <label.Label id="TelefonoOtros" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 2, 2]} />
                            <label.Label id="CorreoElectronico" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 6, 6]} />
                        </Row>
                        <Row>
                            <label.Entidad label="Vendedor" id="Vendedor" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 6, 6]} value={() => {
                                return !cte || !cte.VendedorID ? "" : (!cte.VendedorID ? "" : "<span class='badge badge-info'>" + cte.VendedorID + "</span> ") + (!cte.Vendedor ? "" : cte.Vendedor);
                            }} />


                            <label.Entidad label="Notario" id="Notario" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 6, 6]} value={() => {
                                return !cte || !cte.NotarioID ? "" : (!cte.NotarioID ? "" : "<span class='badge badge-info'>" + cte.NotarioID + "</span> ") + (!cte.Notario ? "" : cte.Notario);
                            }} />
                        </Row>
                        <Row>
                            <UbicacionClienteView ubicacion={this.props.ubicacion} size={[12, 12, 4, 4]} />
                            <ViewUbicacionDetalle lote={lote} ubicacionDetalle={ubicacionDetalle} clienteEtapa={clienteEtapa} size={[12, 12, 5, 5]} />
                            <Column size={[12, 12, 3, 3]} style={{ paddingTop: 10 }}>
                                <Column size={[12, 12, 12, 12]} >
                                    <span className="dashboard-stat dashboard-stat-v1 red ek-sombra" style={{ marginBottom: "15px", height: "80px" }}>
                                        <div className="visual">
                                            <i className="fas fa-home"></i>
                                        </div>
                                        <div className="details">
                                            <div className="number">
                                                <span className="counter" data-counter="counterup" data-value={diasEntrega}>{diasEntrega}</span>
                                            </div>
                                            <div className="desc"> Días desde la Entrega </div>
                                        </div>
                                    </span>
                                </Column>
                                <Column size={[12, 12, 12, 12]} >
                                    <span className="dashboard-stat dashboard-stat-v1 red ek-sombra" style={{ marginBottom: "15px", height: "80px", backgroundColor: "rgb(241, 196, 15)" }}>
                                        <div className="visual">
                                            <i className="fas fa-home"></i>
                                        </div>
                                        <div className="details">
                                            <div className="number">
                                                <span className="counter" data-counter="counterup" data-value={mesesEntrega}>{mesesEntrega}</span>
                                            </div>
                                            <div className="desc"> Meses desde la Entrega </div>
                                        </div>
                                    </span>
                                </Column>
                                <Column size={[12, 12, 12, 12]} >
                                    <span className="dashboard-stat dashboard-stat-v1 blue ek-sombra" style={{ marginBottom: "15px", height: "80px" }}>
                                        <div className="visual">
                                            <i className="far fa-eye"></i>
                                        </div>
                                        <div className="details">
                                            <div className="number">
                                                <span className="counter" data-counter="counterup" data-value={reportesFalla}>{reportesFalla}</span>
                                            </div>
                                            <div className="desc"> Reportes de Falla </div>
                                        </div>
                                    </span>
                                </Column>
                            </Column>
                        </Row>
                    </page.OptionSection>
                    <page.OptionSection
                        id={UBICACION_DETALLE_ID}
                        parent={config.id}
                        level={0}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <div className="tabbable-line">
                            <ul className="nav nav-tabs ">
                                <li className="active">
                                    <a href="#tab_1" data-toggle="tab" aria-expanded="true" style={{ fontSize: "12px" }}>Garantías</a>
                                </li>
                                <li className="">
                                    <a href="#tab_2" data-toggle="tab" aria-expanded="false" style={{ fontSize: "12px" }}>Seguimiento del Expediente</a>
                                </li>
                                <li className="">
                                    <a href="#tab_3" data-toggle="tab" aria-expanded="false" style={{ fontSize: "12px" }}>Equipamiento  </a>
                                </li>
                                <li className="">
                                    <a href="#tab_4" data-toggle="tab" aria-expanded="false" style={{ fontSize: "12px" }}>Entrega  </a>
                                </li>
                                <li className="">
                                    <a href="#tab_5" data-toggle="tab" aria-expanded="false" style={{ fontSize: "12px" }}>Observaciones  </a>
                                </li>
                                <li className="" onClick={this.refreshDxTable}>
                                    <a href="#tab_6" data-toggle="tab" aria-expanded="false" style={{ fontSize: "12px" }}>Historial de incidencias  </a>
                                </li>
                                <li className="" onClick={this.obtenerBitacoraCliente}>
                                    <a href="#tab_7" data-toggle="tab" aria-expanded="false" style={{ fontSize: "12px" }}>Notas de Bitácora  </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="tab_1">
                                    <Column size={[12, 12, 3, 3]}>
                                        <page.OptionSection
                                            id={REPORTES_UBICACION}
                                            parent={config.id}
                                            icon="fas fa-cogs"
                                            level={1} collapsed={false}
                                            subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                                                {[global.getData(this.props.reportesUbicacion, []).length].join("")}
                                            </span>}>
                                            <PanelUpdate info={this.props.reportesUbicacion}>
                                                <List
                                                    id={REPORTES_UBICACION}
                                                    items={this.props.reportesUbicacion}
                                                    readonly={true}
                                                    listHeader={listHeaderReporteUbicacion}
                                                    onItemClick={this.onClickItem.bind(this)}
                                                    horizontalScrolling={true}
                                                    selectable={true}
                                                    drawOddLine={true}
                                                    formatter={(index: number, item: any) => {
                                                        //console.log(item)
                                                        return <Row className="list-selectable-item" >
                                                            <Column size={[6, 6, 6, 6]} className="listItem-default-item"><span className="badge badge-info bold">{item.ID}</span></Column>
                                                            <Column size={[6, 6, 6, 6]} className="listItem-default-item"><div style={{ textAlign: "center" }}>{label.formatDate(item.Creado)}</div></Column>
                                                        </Row>
                                                    }} />
                                            </PanelUpdate>
                                        </page.OptionSection>
                                    </Column>
                                    <Column size={[12, 12, 9, 9]} >
                                        <Row>
                                            <page.SectionList
                                                id={PAGE_REPORTE_PARTIDAS_ID}
                                                parent={config.id}
                                                icon="fas fa-cogs"
                                                level={1}
                                                hideNewButton={true}
                                                listHeader={listHeaderReportePartidas}
                                                size={[12, 12, 12, 12]}
                                                readonly={true}
                                                horizontalScrolling={true}
                                                selectable={true}
                                                drawOddLine={true}
                                                items={createSuccessfulStoreObject([])}
                                                formatter={(index: number, item: any) => {
                                                    let bgColor: string;

                                                    if (item.PartidaAutorizada === "R" || item.Procede === "N" || item.ProcedeBool === false) {
                                                        bgColor = "#FFA07A";
                                                    };

                                                    let labelGarantia: any = (value: any) => {
                                                        return (value === undefined || value === null) ? "" : value > 0 ? "<span class='badge bold' style='background-color: rgb(65, 195, 0);'>" + value + "</span>" : "<span class='badge badge-danger bold'>" + value + "</span>"
                                                    };

                                                    return <Row className="list-selectable-item" style={{ backgroundColor: bgColor }}>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida}</span></Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.TipoFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.TipoFalla.ID}</span>{item.TipoFalla.Nombre}</span>}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Falla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Falla.IdFalla}</span>{item.Falla.Descripcion}</span>}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.UbicacionFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.IdUbicacionFalla}</span>{item.UbicacionFalla.Descripcion}</span>}</Column>
                                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</span>}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.Descripcion : null}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.FallaOrigen.Descripcion : null}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header"><span className="badge badge-warning bold">{item.Reincidencias}</span></Column>
                                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.Observaciones}</Column>
                                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesContratista}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header"><span dangerouslySetInnerHTML={{ __html: labelGarantia(item.DiasGarantia) }}></span></Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.TerminoGarantia)}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.FechaCerrado)}</Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">{EK.UX.Labels.yes(item.ProcedeBool === true)}</Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">{!(item && item.EstatusPartida) ? null : <span className="badge badge-info">{item.EstatusPartida.Nombre}</span>}</Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">&nbsp;</Column>
                                                    </Row>
                                                }}>
                                            </page.SectionList>
                                        </Row>
                                        <Row>
                                            <page.SectionList
                                                id={PAGE_REPORTE_ORDEN_TRABAJO_ID}
                                                parent={config.id}
                                                icon="fa fa-briefcase"
                                                level={1}
                                                hideNewButton={true}
                                                listHeader={listHeaderReporteOrdenesTrabajo}
                                                size={[12, 12, 12, 12]}
                                                readonly={true}
                                                items={createSuccessfulStoreObject([])}
                                                formatter={(index: number, item: any) => {
                                                    let partidas: global.DataElement = global.createSuccessfulStoreObject(item.Partidas);

                                                    return <Row id={"row_orden_trabajo_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                                            <Row>
                                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                                    <CollapseButton idElement={"row_orden_trabajo_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                                                </Column>
                                                                <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</Column>
                                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaInicio)}</Column>
                                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaFin)}</Column>
                                                                <Column size={[2, 2, 2, 2]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave] }}></i>}</Column>
                                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info">{item.EstatusOrdenTrabajo.Nombre}</span></Column>
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
                                                                    listHeader={listHeaderReporteOrdenesTrabajoPartidas}
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
                                        </Row>
                                    </Column>
                                </div>
                                <div className="tab-pane" id="tab_2">
                                    <Column size={[12, 12, 12, 12]}>
                                        <page.OptionSection
                                            id={SEGUIMIENTO_EXPEDIENTE}
                                            parent={config.id}
                                            icon="fas fa-cogs"
                                            level={1} collapsed={false}
                                            subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                                                {[global.getData(this.props.expedientes, []).length].join("")}
                                            </span>}>
                                            <PanelUpdate info={this.props.expedientes}>
                                                <List
                                                    id={SEGUIMIENTO_EXPEDIENTE}
                                                    items={this.props.expedientes}
                                                    readonly={true}
                                                    listHeader={listHeaderSeguimientoExpediente}
                                                    horizontalScrolling={true}
                                                    selectable={true}
                                                    drawOddLine={true}
                                                    formatter={(index: number, item: any) => {
                                                        return <Row className="list-selectable-item" >
                                                            <Column size={[12, 12, 4, 4]} className="listItem-default-item"><span className="badge badge-info bold">{item.Nombre}</span></Column>
                                                            <Column size={[12, 12, 3, 3]} className="listItem-default-item">{item.CreadoPor.ID === undefined || item.CreadoPor.ID === null ? '' : <span className="badge badge-info bold">{item.CreadoPor.ID}</span>}  {(item.CreadoPor.Apellido === undefined || item.CreadoPor.Apellido === null ? '' : item.CreadoPor.Apellido + ' ') + ' ' + (item.CreadoPor.Nombre === undefined || item.CreadoPor.Nombre === null ? '' : item.CreadoPor.Nombre + ' ')}</Column>
                                                            <Column size={[12, 12, 1, 1]} className="listItem-default-item">{EK.UX.Labels.ok(item.Estatus.Clave)}</Column>
                                                            <Column size={[12, 12, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaInicio)}</Column>
                                                            <Column size={[12, 12, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaLiberacion)}</Column>
                                                        </Row>
                                                    }} />
                                            </PanelUpdate>
                                        </page.OptionSection>
                                    </Column>
                                </div>
                                <div className="tab-pane" id="tab_3">
                                    <Column size={[12, 12, 12, 12]}>
                                        <page.OptionSection
                                            id={UBICACION_EQUIPAMIENTO}
                                            parent={config.id}
                                            icon="fas fa-cogs"
                                            level={1} collapsed={false}
                                            subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                                                {[global.getData(this.props.equipamiento, []).length].join("")}
                                            </span>}>
                                            <PanelUpdate info={this.props.equipamiento}>
                                                <List
                                                    id={UBICACION_EQUIPAMIENTO}
                                                    items={this.props.equipamiento}
                                                    readonly={true}
                                                    listHeader={listHeaderUbicacionEquipamiento}
                                                    horizontalScrolling={true}
                                                    selectable={true}
                                                    drawOddLine={true}
                                                    formatter={(index: number, item: any) => {
                                                        return <Row className="list-selectable-item" >
                                                            <Column size={[12, 12, 4, 4]} className="listItem-default-item"><span className="badge badge-info bold">{item.Clave}</span></Column>
                                                            <Column size={[12, 12, 8, 8]} className="listItem-default-item">{item.Nombre}</Column>
                                                        </Row>
                                                    }} />
                                            </PanelUpdate>
                                        </page.OptionSection>
                                    </Column>
                                </div>
                                <div className="tab-pane" id="tab_4">
                                    <Column size={[12, 12, 12, 12]}>
                                        <page.OptionSection
                                            id={BITACORA_AGENDA_CLIENTE_ID}
                                            parent={config.id}
                                            icon="fas fa-cogs"
                                            level={1} collapsed={false}
                                            title={"Archivos evidencia Construccion"}>
                                            <PanelUpdate info={global.createSuccessfulStoreObject(ListaEvidenciasArchivosConst)}>
                                                <List
                                                    id={BITACORA_AGENDA_CLIENTE_ID}
                                                    items={global.createSuccessfulStoreObject(ListaEvidenciasArchivosConst)}
                                                    readonly={true}
                                                    listHeader={listHeaderEvidenciasEntrega}
                                                    horizontalScrolling={true}
                                                    selectable={false}
                                                    drawOddLine={true}
                                                    formatter={(index: number, item: any) => {
                                                        //console.log(item.ListaDocs)
                                                        let listaTemp = [];
                                                        let _index = 0;
                                                        for (let i of item.ListaDocs) {
                                                            _index++;
                                                            //console.log(i)
                                                            if (i.img !== null) {
                                                                if (i.tipo.includes('image/')) {
                                                                    listaTemp.push(
                                                                        <div key={_index} style={{ padding: '4px' }}>
                                                                            <span style={{ padding: '2px', background: '#3498db', color: '#fff' }} onClick={() => this.OpenPhotoViewer(i.img)}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    let fecha = Date.now();
                                                                    listaTemp.push(
                                                                        <div key={_index} style={{ padding: '4px' }}>
                                                                            <a href={i.img} download>{'Archivo_' + fecha + '.' + i.ext}</a>
                                                                        </div>
                                                                    )
                                                                }
                                                            }

                                                        }
                                                        return <Row className="list-selectable-item" >
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span className="badge badge-info bold">{item.btEstatusAgenda}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.btFInicio, true)}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.btFFin, true)}</Column>
                                                            <Column size={[5, 5, 5, 5]} className="listItem-default-item">{item.Observaciones}</Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                                                {
                                                                    listaTemp
                                                                }
                                                            </Column>
                                                        </Row>
                                                    }} />
                                            </PanelUpdate>
                                        </page.OptionSection>
                                    </Column>
                                    <Column size={[12, 12, 12, 12]}>
                                        <page.OptionSection
                                            id={BITACORA_AGENDA_CLIENTE_ID}
                                            parent={config.id}
                                            icon="fas fa-cogs"
                                            level={1} collapsed={false}
                                            title={"Archivos evidencia Entrega"}>
                                            <PanelUpdate info={global.createSuccessfulStoreObject(ListaEvidenciasArchivosEnt)}>
                                                <List
                                                    id={BITACORA_AGENDA_CLIENTE_ID}
                                                    items={global.createSuccessfulStoreObject(ListaEvidenciasArchivosEnt)}
                                                    readonly={true}
                                                    listHeader={listHeaderEvidenciasEntrega}
                                                    horizontalScrolling={true}
                                                    selectable={false}
                                                    drawOddLine={true}
                                                    formatter={(index: number, item: any) => {
                                                        //console.log(item.ListaDocs)
                                                        let listaTemp = [];
                                                        let _index = 0;
                                                        for (let i of item.ListaDocs) {
                                                            _index++;
                                                            //console.log(i)
                                                            if (i.img !== null) {
                                                                if (i.tipo.includes('image/')) {
                                                                    listaTemp.push(
                                                                        <div key={_index} style={{ padding: '4px' }}>
                                                                            <span style={{ padding: '2px', background: '#3498db', color: '#fff' }} onClick={() => this.OpenPhotoViewer(i.img)}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    let fecha = Date.now();
                                                                    listaTemp.push(
                                                                        <div key={_index} style={{ padding: '4px' }}>
                                                                            <a href={i.img} download>{'Archivo_' + fecha + '.' + i.ext}</a>
                                                                        </div>
                                                                    )
                                                                }
                                                            }

                                                        }
                                                        return <Row className="list-selectable-item" >
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span className="badge badge-info bold">{item.btEstatusAgenda}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.btFInicio, true)}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.btFFin, true)}</Column>
                                                            <Column size={[5, 5, 5, 5]} className="listItem-default-item">{item.Observaciones}</Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                                                {
                                                                    listaTemp
                                                                }

                                                            </Column>
                                                        </Row>
                                                    }} />
                                            </PanelUpdate>
                                        </page.OptionSection>
                                    </Column>
                                </div>
                                <div className="tab-pane" id="tab_5">
                                    <Column size={[12, 12, 12, 12]}>
                                        <page.OptionSection
                                            id={PAGE_BITACORA_COMENTARIOS_CLIENTE_ID}
                                            parent={config.id}
                                            icon="fas fa-cogs"
                                            level={1} collapsed={false}
                                            title={"Observaciones al cliente"}>
                                            <PanelUpdate info={this.props.observacionesCliente}>
                                                <List
                                                    id={PAGE_BITACORA_COMENTARIOS_CLIENTE_ID}
                                                    items={this.props.observacionesCliente}
                                                    readonly={true}
                                                    listHeader={listHeaderComentariosCliente}
                                                    horizontalScrolling={true}
                                                    selectable={false}
                                                    drawOddLine={true}
                                                    formatter={(index: number, item: any) => {
                                                        //console.log(item.ListaDocs)

                                                        return <Row className="list-selectable-item" >
                                                            <Column size={[4, 4, 4, 4]} className="listItem-default-item">{global.formatDateTimeDirect(item.fec_llamada, true)}</Column>
                                                            <Column size={[8, 8, 8, 8]} className="listItem-default-item">{item.observaciones}</Column>

                                                        </Row>
                                                    }} />
                                            </PanelUpdate>
                                        </page.OptionSection>
                                    </Column>
                                </div>
                                <div className="tab-pane" id="tab_6">
                                    <Column size={[12, 12, 12, 12]}>
                                        <page.OptionSection
                                            id={PAGE_BITACORA_HISTORIAL_INCIDENCIAS_ID}
                                            parent={config.id}
                                            icon="fas fa-cogs"
                                            level={1} collapsed={false}
                                            title={"Historial de incidencias del cliente"}>
                                            <Row>
                                                <div ><Column size={[12, 12, 12, 12]}>

                                                    <br />
                                                    <div id="loading" style={{ display: 'none' }}>
                                                        <Updating text="" />
                                                    </div>

                                                    <div id="loadedData" style={{ background: '#fff', display: 'inherit' }}>

                                                        <div id="dxHistorialIncidencias" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                        </div>
                                                    </div>

                                                </Column>
                                                </div>
                                            </Row>
                                        </page.OptionSection>
                                    </Column>
                                </div>
                                <div className="tab-pane" id="tab_7">
                                    <Column size={[12, 12, 12, 12]}>
                                        <page.OptionSection
                                            id={PAGE_BITACORA}
                                            parent={config.id}
                                            icon="fas fa-cogs"
                                            level={1} collapsed={false}
                                            title={"Historial de incidencias del cliente"}>
                                            <Row>
                                                <div ><Column size={[12, 12, 12, 12]}>

                                                    <br />
                                                    <div id="loaderBitacoraComentarios" style={{ display: 'none' }}>
                                                        <Updating text="" />
                                                    </div>

                                                    <div id="loadedBitacoraComentarios" style={{ background: '#fff', display: 'inherit' }}>

                                                        <div id="dxBitacora" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                        </div>
                                                    </div>

                                                </Column>
                                                </div>
                                            </Row>
                                        </page.OptionSection>
                                    </Column>
                                </div>
                            </div>
                        </div>
                    </page.OptionSection>
                </Column>
            </page.Edit>

        };
    });

    interface IUbicacionClienteProps extends React.Props<any> {
        lote: any;
        ubicacionDetalle?: any;
        clienteEtapa?: any;
        size?: number[];
    };

    class ViewUbicacionDetalle extends React.Component<IUbicacionClienteProps, {}>{
        render(): JSX.Element {
            let datos: any[] = this.props.ubicacionDetalle ? this.props.ubicacionDetalle : [];
            let clienteEtapa: any = this.props.clienteEtapa;
            let fechaEscrituracion: any = "";
            let fechaLiberacion: any = "";
            let fechaConstruccion: any = "";
            let fechaEntrega: any = "";
            let fechaReprogramacion: any = "";
            let detalleConstruccion: any = "";
            let personaEntregaVivienda: any = "";
             console.log(datos)
            if (datos.length > 0) {
                let item: any = datos[0];
                //console.log(item)
                fechaEscrituracion = global.formatDateTimeDirect(item.firma_escritura) ? global.formatDateTimeDirect(item.firma_escritura) : " ";
                fechaLiberacion = global.formatDateTimeDirect(item.fec_liberacion) ? global.formatDateTimeDirect(item.fec_liberacion) : " ";
                fechaConstruccion = global.formatDateTimeDirect(item.fecha_construccion, true) ? global.formatDateTimeDirect(item.fecha_construccion, true) : " ";
                fechaEntrega = global.formatDateTimeDirect(clienteEtapa.FechaLiberacion, true) ? global.formatDateTimeDirect(clienteEtapa.FechaLiberacion, true) : " ";
                fechaReprogramacion = global.formatDateTimeDirect(item.fecha_reprogramacion, true) ? global.formatDateTimeDirect(item.fecha_reprogramacion, true) : " ";
                detalleConstruccion = item.Detalles_construccion ? item.Detalles_construccion : " ";
                personaEntregaVivienda = item.Personaentregavivienda ? item.Personaentregavivienda : " ";
            };

            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
                <page.OptionSection
                    id={UBICACION_DETALLE_ID}
                    parent={config.id}
                    level={1}
                    icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.Label id="firma_escritura" value={fechaEscrituracion} idForm={UBICACION_DETALLE_ID} size={[12, 12, 6, 6]} />
                        <label.Label id="firma_liberacion" value={fechaLiberacion} idForm={UBICACION_DETALLE_ID} size={[12, 12, 6, 6]} />
                        <label.Label id="fecha_construccion" value={fechaConstruccion} idForm={UBICACION_DETALLE_ID} size={[12, 12, 6, 6]} />
                        <label.Label id="fecha_entrega" value={fechaEntrega} idForm={UBICACION_DETALLE_ID} size={[12, 12, 6, 6]} />
                        <label.Entidad id="Etapa" idForm={PAGE_BITACORA_CLIENTE_ID} size={[12, 12, 6, 6]} />
                        <label.Entidad id="Esquema" idForm={PAGE_BITACORA_CLIENTE_ID} size={[12, 12, 6, 6]} />
                        <label.Entidad id="Contratista" idForm={PAGE_BITACORA_CLIENTE_ID} size={[12, 12, 12, 12]} />
                        <label.Fecha id="TerminoGarantia" idForm={PAGE_BITACORA_CLIENTE_ID} size={[12, 12, 12, 12]} />
                        <label.Boolean id="Entregado" idForm={PAGE_BITACORA_CLIENTE_ID} size={[12, 12, 12, 6]} />
                        <label.Boolean id="HasEquipamiento" idForm={PAGE_BITACORA_CLIENTE_ID} size={[12, 12, 12, 6]} />
                    </Row>
                </page.OptionSection>
            </Column>
        };
    };

    interface IUbicacionBaseProps extends page.IProps {
        ubicacion?: DataElement;
        size?: number[];
    };

    class UbicacionClienteView extends React.Component<IUbicacionBaseProps, {}>{
        render(): JSX.Element {
            let ubicacion: any = global.getData(this.props.ubicacion);
            let plazaValue: any = (item: any) => {
                return !item ? "" : !item.Nombre ? "" : item.Nombre;
            };

            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
                <page.OptionSection
                    id={PAGE_UBICACION_ID}
                    parent={config.id}
                    subTitle={<span style={{ marginLeft: 5 }}>
                        <span className="badge badge-info bold">{ubicacion.ClaveFormato}</span>
                    </span>}
                    level={1}
                    icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.Label id="Calle" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                        <label.Entidad id="Desarrollo" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} value={() => {
                            return !ubicacion || !ubicacion.Desarrollo ? "" : (!ubicacion.DesarrolloClave ? "" : "<span class='badge badge-info'>" + ubicacion.DesarrolloClave + "</span> ") + (!ubicacion.Desarrollo.Nombre ? "" : ubicacion.Desarrollo.Nombre);
                        }} />
                        <label.Entidad id="Plaza" idForm={PAGE_UBICACION_ID} value={plazaValue} size={[12, 12, 12, 12]} />
                        <label.Entidad id="Segmento" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                        <label.Entidad id="Prototipo" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                        <label.Label id="Superficie" idForm={PAGE_UBICACION_ID} size={[12, 12, 6, 6]} />
                        <label.Label id="Exterior" idForm={PAGE_UBICACION_ID} size={[12, 12, 6, 6]} />
                    </Row>
                </page.OptionSection>
            </Column>
        };
    };

    interface IReporteFallasProps extends IUbicacionBaseProps { };

    class ReporteFallasView extends React.Component<IReporteFallasProps, {}>{
        render(): JSX.Element {
            let supervisionExterna: number = undefined;

            if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {
                let plaza: any = global.getData(this.props.ubicacion).Plaza;
                supervisionExterna = plaza ? plaza.ValidarResponsablePlaza : 0;
            };

            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
                <page.OptionSection
                    id={PAGE_REPORTE_ID}
                    parent={config.id}
                    level={1}
                    icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.Label id="DiasSolucion" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Label id="DiasContratista" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Entidad id="ResponsableConstruccion" idForm={PAGE_REPORTE_ID} size={[12, 12, 6, 6]} />
                        <label.Fecha id="FechaSolucionReporte" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Fecha id="FechaContratistaInicial" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Entidad id="MedioSolicitud" idForm={PAGE_REPORTE_ID} size={[12, 12, 6, 6]} />
                        <label.Fecha id="FechaSolucionTerminacion" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Fecha id="FechaContratistaFinal" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        {supervisionExterna === 1 ? <label.Entidad id="SupervisorContratista" idForm={PAGE_REPORTE_ID} size={[12, 12, 6, 6]} /> : null}
                        <label.Label id="ObservacionesServicio" idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 12]} />
                        <label.Label id="ObservacionesContratista" idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 12]} />
                    </Row>
                </page.OptionSection>
            </Column>
        };
    };

    interface IFormalizacionVentaButtonProps extends IButtonProps, page.IProps {
        clienteRef?: DataElement;
    };

    const FormalizacionVentaButton: any = global.connect(class extends React.Component<IFormalizacionVentaButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state);
            return retValue;
        };
        static defaultProps: IFormalizacionVentaButtonProps = {
            icon: "fas fa-print",
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
            let id: number = global.getDataID(this.props.clienteRef);
            let win = window.open("scv/reportesFallas/imprimirDocumento/FormalizacionVenta/" + id, "_blank")
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.clienteRef)) {
                if (global.getDataID(this.props.clienteRef) > 0) {
                    return <Button {...this.props} keyBtn="btnSPVFormalizacionVenta" onClick={this.onClick.bind(this)} />
                };
            };

            return null;
        };
    });

    const ImprimirExpedienteCliente: any = global.connect(class extends React.Component<IFormalizacionVentaButtonProps, {}> {
        //constructor(props: IimprimirDocsButton) {
        //    super(props);
        //    this.onClick = this.onClick.bind(this);
        //};
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state);
            return retValue;
        };

        static defaultProps: IFormalizacionVentaButtonProps = {
            icon: "fas fa-print",
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
            let item: EditForm = Forms.getForm('BitacoraEspSPVClienteResult');
            let model: any = {};
            let cliente = global.getData(EK.Store.getState().global.entity$BitacoraEspSPVCliente$clienteInfo);
            let hv = cliente.HipotecaVerde ? 1 : 0;

            let ubicacion = global.getData(EK.Store.getState().global.entity$BitacoraEspSPVCliente$ubicacion);

            if (isEmptyObject(cliente) || isEmptyObject(ubicacion)) {
                global.warning("La informacion del cliente no esta lista.");
                return;
            }
            global.info('Se esta preparando la descarga del expediente')
            model.ImpresionDocs = [];
            model.ImpresionDocs.push({ IdUbicacionVenta: cliente.ID, clave_tipo_vivienda: ubicacion.Segmento.IdTipoVivienda, numcte: cliente.ID, plaza: ubicacion.IdPlaza, hipoteca_verde: hv });

            // global.dispatchAsyncPut("global-page-data", "ConfigViviendaEntregable/GetDocsImpresion/", model, 'ImpresionDocumentos');
            global.asyncPut("ConfigViviendaEntregable/GetDocsImpresion/", model, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //console.log(data);
                        if (data.FileReference) {
                            EK.Global.confirm("Presione Confirmar para descargar los archivos", "Documentos Procesados Correctamente", () => {
                                window.location.assign(data.FileReference.FilePath);
                            });
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                       // console.log('cargando')
                        break;
                    case AsyncActionTypeEnum.failed:
                       // console.log('error')
                        break;
                }
            });
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.clienteRef)) {
                if (global.getDataID(this.props.clienteRef) > 0) {
                    return <Button {...this.props} keyBtn={"btnSPVImprimirDOC"} onClick={this.onClick} />;
                };
            };
            return null;
        };
    });

    const BitacoraPrintButton: any = global.connect(class extends React.Component<IFormalizacionVentaButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state);
            return retValue;
        };
        static defaultProps: IFormalizacionVentaButtonProps = {
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
        onClick(): void {
            let cliente = global.getData(EK.Store.getState().global.entity$BitacoraEspSPVCliente$clienteInfo);
            if (isEmptyObject(cliente)) {
                global.warning("La informacion del cliente no esta lista.");
                return;
            }
            let operacionEspecificaSP: string = "BitacoraCompleta";
            let win = window.open("scv/bitacoraCLienteSPV/imprimirDocumento/" + cliente.ID + "/" + operacionEspecificaSP, "_blank")
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.clienteRef)) {
                if (global.getDataID(this.props.clienteRef) > 0) {
                    return <Button {...this.props} keyBtn="btnSPVBitacoraPrint" onClick={this.onClick.bind(this)} />
                };
            };

            return null;
        };
    });

    let ImprimirExpedienteCliente2: any = global.connect(class extends React.Component<IFormalizacionVentaButtonProps, {}> {
        //constructor(props: IimprimirDocsButton) {
        //    super(props);
        //    this.onClick = this.onClick.bind(this);
        //};
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state);
            return retValue;
        };

        static defaultProps: IFormalizacionVentaButtonProps = {
            icon: "fas fa-print",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        //Funcion para Obtener Ubicaciones Agenda(AgendaEntregaViviendaSPV)
        //getImprimibles(): any {
        //    //Arreglo de Ubicaciones de la Agenda
        //    let Imprimibles: any[];
        //    //Obtenemos informacion del Array
        //    let retValues: any[] = [];

        //    //Imprimibles = Forms.getValue("ItemsParaImpresion", SECTION_CONCEPTO_ID);
        //    Imprimibles = Forms.getValue("ItemsParaImpresion", PAGE_ENTREGA_RESULT_ID);

        //    //Validamos que Ubicaciones no este vacio
        //    if (Imprimibles === undefined || Imprimibles === null || Imprimibles.length <= 0 || !Imprimibles) {
        //        warning("No existe items seleccionados");
        //        return;
        //    } else {
        //        Imprimibles.forEach((value) => {
        //            let retValue: any = global.assign(value.item, {
        //                numcte: value.numcte,
        //                plaza: value.id_identificador,
        //                IdUbicacionVenta: value.numcte,
        //                clave_tipo_vivienda: value.clave_tipo_vivienda,
        //                hipoteca_verde: value.hipoteca_verde ? 1 : 0
        //            });
        //            //
        //            retValues.push(retValue);
        //        });
        //    }
        //    return retValues;
        //};

        onClick(): void {
            //let Imprimibles: any = Forms.getValue("ItemsParaImpresion", SECTION_CONCEPTO_ID);
            //let Imprimibles: any = Forms.getValue("ItemsParaImpresion", PAGE_ENTREGA_RESULT_ID);
            //let Imprimir: any[] = this.getImprimibles();
            //if (Imprimir === null || Imprimir === undefined || Imprimir.length === 0) {
            //    return;
            //};
            //let cantidadItemsSeleccionados: any = Imprimibles.length;
            //warning("Iniciando proceso de Impresión de Documentos, Espere por favor <br> " + cantidadItemsSeleccionados + " items seleccionados ");
            //Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ClientesImprimir", Imprimir);
            let model: any = {};
            let cliente = global.getData(EK.Store.getState().global.entity$BitacoraEspSPVCliente$clienteInfo);
            let hv = cliente.HipotecaVerde ? 1 : 0;
            let ubicacion = global.getData(EK.Store.getState().global.entity$BitacoraEspSPVCliente$ubicacion);
            model.ImpresionDocs = [];
            model.ImpresionDocs.push({ IdUbicacionVenta: cliente.ID, clave_tipo_vivienda: ubicacion.Segmento.IdTipoVivienda, numcte: cliente.ID, plaza: ubicacion.IdPlaza, hipoteca_verde: hv });
            //    .toObject();

            // console.log(cliente);
            ////Asignamos la Propiedad ubicaciones Agenda al Modelo
            //model["ImpresionDocs"] = Imprimir;
            // global.dispatchAsyncPut("global-page-data", "ConfigViviendaEntregable/GetDocsImpresion/", model, 'ImpresionDocumentos');
            global.asyncPut("ConfigViviendaEntregable/GetDocsImpresion/", model, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                      //  console.log(data);
                        if (data.FileReference) {
                            EK.Global.confirm("Presione Confirmar para descargar los archivos", "Documentos Procesados Correctamente", () => {
                                window.location.assign(data.FileReference.FilePath);
                            });
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                       // console.log('cargando')
                        break;
                    case AsyncActionTypeEnum.failed:
                      //  console.log('error')
                        break;
                }
            });
            //console.log('imprimiendo');
        };
        render(): JSX.Element {
            return <Button {...this.props} keyBtn={"btnSPVImprimirDOC"} onClick={this.onClick} />;
        };
    });

    const EquipamientoViviendaButton: any = global.connect(class extends React.Component<IFormalizacionVentaButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state);
            return retValue;
        };
        static defaultProps: IFormalizacionVentaButtonProps = {
            icon: "fas fa-print",
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
            let id: number = global.getDataID(this.props.clienteRef);
            console.log('intentar imprimr')
            global.asyncPost('base/scv/ReportesFallas/GetBP/VerificarPlantilla', { Nombre: 'EQUIPAMIENTO-RUBA' }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data) {
                            let win = window.open("scv/reportesFallas/imprimirDocumento/EquipamientoVivienda/" + id, "_blank")
                        }
                       // console.log(data);
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        //console.log('error')
                        break;
                }
            });
            //global.dispatchAsyncPut("global-current-entity", "base/scv/ReporteFallasAreasComunes/GetBP/CancelaReporte", { motivo });
            //let win = window.open("scv/reportesFallas/imprimirDocumento/EquipamientoVivienda/" + id, "_blank")
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.clienteRef)) {
                if (global.getDataID(this.props.clienteRef) > 0) {
                    return <Button {...this.props} keyBtn="btnSPVEquipamientoVivienda" onClick={this.onClick.bind(this)} />
                };
            };

            return null;
        };
    });
};