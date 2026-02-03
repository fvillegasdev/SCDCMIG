// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


namespace EK.Modules.SCV.Pages.postventa.RUBA.ReportesFallasConsulta {
    "use strict";

    const PAGE_ID: string = "ReportesFallasConsulta";
    const PAGE_OPCIONES_PARTIDAS_ID: string = "reportesConsulta$opcionesPartidas";
    const PAGE_OPCIONES_REPORTES_ID: string = "reportesConsulta$opcionesFolios";
    const PAGE_ESTATUS_DIAGNOSTICO_ID: string = "reportesConsulta$estatusDiagnostico";
    const PAGE_ESTATUS_PARTIDA_DIAGNOSTICO_ID: string = "reportesConsulta$estatusPartidaDiagnostico";
    const PAGE_OPCIONES_DIAGNOSTICOS: string = "";
    const PAGE_OPCIONES_DIAGNOSTICOSPARTIDA: string = "";
    //import FileSaver from 'file-saver';

    const PROCEDE_SI_VALUE: string = "ProcedeSi";
    const PROCEDE_NO_VALUE: string = "ProcedeNo";
    const PROCEDE_TODOS_VALUE: string = "ProcedeTodos";

    const FolioEstatusNuevo: string = "FN";
    const FolioEstatusTerminado: string = "FT";
    const FolioEstatusCancelado: string = "FX";
    const FolioEstatusTodos: string = "FALL";

    const OTEstatusNuevo: string = "OTN";
    const OTEstatusEnProceso: string = "OTEP";
    const OTEstatusTerminado: string = "OTT";
    const OTEstatusCancelado: string = "OTC";
    const OTEstatusPendiente: string = "OTP";
    const OTEstatusTodos: string = "OTALL";

    const CANCELADO_SI_VALUE: string = "CanceladoSi";
    const CANCELADO_NO_VALUE: string = "CanceladoNo";
    const CANCELADO_TODOS_VALUE: string = "CanceladoTodos";
    const CANCELADO_CONTINGENCIA_VALUE: string = "CanceladoContingencia";
    const DIAGNOSTICO_TODOS_VALUE: string = "DiagnosticoTodosStatus";
    const DIAGNOSTICO_ABIERTO_VALUE: string = "DiagnosticoAbiertoStatus";
    const DIAGNOSTICO_CERRADO_VALUE: string = "DiagnosticoCerradoStatus";
    const PARTIDA_DIAGNOSTICO_ABIERTO_VALUE: string = "PartidaDiagnosticoAbiertoStatus";
    const PARTIDA_DIAGNOSTICO_ACEPTADO_VALUE: string = "PartidaDiagnosticoAceptadoStatus";
    const PARTIDA_DIAGNOSTICO_NOPROCEDE_VALUE: string = "PartidaDiagnosticoNoProcedeStatus";
    const PARTIDA_DIAGNOSTICO_TODOS_VALUE: string = "PartidaDiagnosticoTodosStatus";
    let colorButton1 = '#ccc';
    let HiddenCancelSection = true;
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_OPCIONES_PARTIDAS_ID, PAGE_OPCIONES_REPORTES_ID]);
    declare const ExcelJS: any;
    declare const DevExpress: any;
    declare const FileSaver: any;

    const formatBadgeOk: (data: boolean, type: any, row: any) => any = (data: any, type: any, row: any[]): any => {
        data = (data === "True" || data === "SI") ? true : (data === "False" || data === "NO") ? false : data;
        return <div style={{ textAlign: "center" }}>{label.ok(data)}</div>
    };

    export const Vista: any = page.connect(class extends page.Base {

        //static props: any = (state: any) => {
        //    state.xd = 'LOLS';
        //    var retValue: any = page.props(state);
        //    //Searching: global.getData(state.global.searchingDataState)
        //    //retValue.agruparPorFolio = Forms.getValue("AgruparPorFolio", config.id, state);
        //        state.buttonColor1 = '#000000';
        //    console.log(retValue);
        //    return retValue;
        //};
        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            //entidad: state.forms[SECTION_CONCEPTO_ID],
            plaza: state.global.Plaza_Seleccionada,
            data: global.getData(state.global.currentCatalogo),
            stateSearching: global.getData(state.global.searchingDataState)
        });


        onExport(): void {
            let filters: any = this.onWillFilter(this.props, Forms.getForm([config.id, "filters"].join("$")));
            filters = global.assign(filters, global.getFilters(filters));
            filters.IdVocacion = filters.Vocacion ? filters.Vocacion.Clave : null;
            filters.IdCausaFalla = filters.CausaFalla ? filters.CausaFalla.ID === -2 ? -2 : filters.CausaFalla.IdCausaFalla : null;
            //global.requestAction("scv/reportesFallas/consulta/exportar", filters, "post");
        };
        onWillFilter(props: any, filters: any): any {
            let model: any = Forms.getValues(config.id);
            console.log(model);
            //if (model.OpcionesProcede) {
            //    switch (model.OpcionesProcede) {
            //        case "ProcedeSi": filters.OpcionProcede = "S"; break;
            //        case "ProcedeNo": filters.OpcionProcede = "N"; break;
            //        case "ProcedeTodos": filters.OpcionProcede = "T"; break;
            //    };
            //};
            if (model.OpcionesEstatusFolio) {
                switch (model.OpcionesEstatusFolio) {
                    case "FN": filters.OpcionesEstatusFolio = "N"; break;
                    case "FT": filters.OpcionesEstatusFolio = "T"; break;
                    case "FX": filters.OpcionesEstatusFolio = "X";
                        break;
                    case "FALL": filters.OpcionesEstatusFolio = "A"; break;
                }
            }

            if (filters.OpcionesEstatusFolio === "X") {
                if (model.MotivoCancelacionTodos) {
                    filters.motivoCancelacionID = 0;
                } else {
                    filters.motivoCancelacionID = model.Motivo.ID;
                }
            } else {
                delete filters.motivoCancelacionID;
            }
            let segmento: any = filters.segmento && filters.segmento.ID ? filters.segmento.ID !== 9999 ? filters.segmento.ID : '-2' : '-2'
            filters.Segmento = segmento;
            if (model.OpcionesEstatusOT) {
                switch (model.OpcionesEstatusOT) {
                    case "OTN": filters.OpcionesEstatusOT = "1090"; break;
                    case "OTEP": filters.OpcionesEstatusOT = "1110"; break;
                    case "OTT": filters.OpcionesEstatusOT = "1091"; break;
                    case "OTC": filters.OpcionesEstatusOT = "1095"; break;
                    case "OTP": filters.OpcionesEstatusOT = "1092"; break;
                    case "OTALL": filters.OpcionesEstatusOT = "0"; break;
                }
            }

            if (model.OpcionesDiagEstatus) {
                switch (model.OpcionesDiagEstatus) {
                    case "DiagnosticoAbiertoStatus": filters.OpcionesDiagEstatus = "I"; break;
                    case "DiagnosticoCerradoStatus": filters.OpcionesDiagEstatus = "C"; break;
                    case "DiagnosticoTodosStatus": filters.OpcionesDiagEstatus = "T"; break;
                };
            };
            if (model.OpcionesPartDiagEstatus) {
                switch (model.OpcionesPartDiagEstatus) {
                    case "PartidaDiagnosticoAbiertoStatus": filters.OpcionesPartDiagEstatus = "ABIERTO"; break;
                    case "PartidaDiagnosticoAceptadoStatus": filters.OpcionesPartDiagEstatus = "ACEPTADO"; break;
                    case "PartidaDiagnosticoNoProcedeStatus": filters.OpcionesPartDiagEstatus = "NO PROCEDE"; break;
                    case "PartidaDiagnosticoTodosStatus": filters.OpcionesPartDiagEstatus = "TODOS"; break;
                };
            };

            //eliminar el id para evitar error de conversión Int32 a String
            if (filters.Fraccionamientos && filters.Fraccionamientos.length > 0) {
                filters.Fraccionamientos.forEach((f: any) => { delete f["ID"]; });
            };

            filters.IncidenciaAut = model.OpcionesIncidenciaAutorizada;
            switch (model.OpcionesIncidenciaAutorizada) {
                case "IT": filters.IncidenciaAut = "-2"; break;
                case "IA": filters.IncidenciaAut = "1"; break;
                case "INA": filters.IncidenciaAut = "0"; break;
            }
            //console.log(filters, model);
            //return
            return filters;
        };
        clearEstatusDiagnostico() {
            let model: any = Forms.getValues(config.id);
            Forms.updateFormElement(config.id, "OpcionesDiagEstatus", null);
            let x = document.getElementById('btnId1');
            x.style.background = '#ccc';
        }

        changeColorButtons(id) {
            let x = document.getElementById('btnId' + id);
            x.style.background = '#36C6D3';
        }

        setEstatusCancelado(cancelado) {
            
            let s = document.getElementById('seccionCancelado');
            cancelado === true ? s.style.display = 'block' : s.style.display = 'none';
        }
        clearEstatusPartDiagnostico() {
            Forms.updateFormElement(config.id, "OpcionesPartDiagEstatus", null);
            let x = document.getElementById('btnId2');
            x.style.background = '#ccc';
        }
        clearEstatusOT() {
            Forms.updateFormElement(config.id, "OpcionesEstatusOT", null);
            let x = document.getElementById('btnId3');
            x.style.background = '#ccc';
        }

        changeAllCancelados() {
            let model: any = Forms.getValues(config.id);
            if (model.MotivoCancelacionTodos) {
                let x = document.getElementById('Motivo');
                //x.disabled = true;
            }
            console.log(model.MotivoCancelacionTodos);
        }

        diasVencidos(newDate: Date, newDate2: Date) {
            let fecha = new Date();
            let fechaString = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
            let fechaString2 = newDate2.getFullYear() + '/' + (newDate2.getMonth() + 2) + '/' + newDate2.getDate();
            let nfecha = new Date(fechaString);
            let nfecha2 = new Date(fechaString2);
            let n1 = nfecha.getTime();
            let n2 = nfecha2.getTime();
            let diferencia = (n2 - n1) / 1000 / 60 / 60 / 24;
            return Math.ceil(diferencia);
        }
        onFilter(props: page.IProps, filters: any, type?: string): void {
            let summaryText = '';

            let UrlAplicacion: any = window.location;
            let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'Departamento' : '# Interior';
            let columnas: any;
            columnas = UrlAplicacion.pathname.includes("intra") ? [
                { caption: "# Cliente", dataField: "Cliente.ID" },
                { caption: "Cliente", dataField: "Cliente.Nombre" },
                { caption: "# Fraccionamiento", dataField: "Fraccionamiento.ID" },
                { caption: "Nombre Fraccionamiento", dataField: "Fraccionamiento.Descripcion" },
                { caption: "Edificio", dataField: "edificio" },
                { caption: "Nivel", dataField: "nivel" },
                { caption: labelInterior, dataField: "Ubicacion.NumeroInterior" },
                { caption: "Calle Fraccionamiento", dataField: "Fraccionamiento.Direccion" },
                { caption: "# Exterior", dataField: "Ubicacion.NumeroExterior" },
                { caption: "Plaza", dataField: "Plaza.Nombre" },

                {
                    caption: "Folio", dataField: "Folio", groupIndex: 0, width: 100, alignment: "center" ,
                    groupCellTemplate: function (cellElement, cellInfo) {
                        let total = '0';
                        let estatus = cellInfo.text;
                        if (!cellInfo.row.isExpanded) {
                            total = cellInfo.data.collapsedItems.length;
                            summaryText = `Folio ${estatus} (TOTAL ${total})`;
                            localStorage.setItem('TotalItemInFolio$' + cellInfo.text, total);
                        } else {
                            if (localStorage.getItem('TotalItemInFolio$$' + estatus) !== null) {
                                total = localStorage.getItem('TotalItemInFolio$$' + estatus)
                            } else {
                                total = cellInfo.data.items.length;
                            }
                            summaryText = `Folio ${estatus} (TOTAL ${total})`;
                        }
                        if (cellInfo.data.isContinuationOnNextPage) {
                            summaryText += ' La lista continua en la siguiente pagina';
                        }

                        return $("<span>").text(summaryText);
                    }
                },
                { caption: "Tipo Vivienda", dataField: "TipoVivienda.Descripcion" },
                {
                    caption: "Estatus Reporte", dataField: "EstatusReporte",
                    groupCellTemplate: function (cellElement, cellInfo) {
                        let total = '0';
                        let estatus = cellInfo.text;
                        if (!cellInfo.row.isExpanded) {
                            total = cellInfo.data.collapsedItems.length;
                            summaryText = `Estatus ${estatus} (TOTAL ${total})`;
                            localStorage.setItem('TotalFolios$' + cellInfo.text, total);
                        } else {
                            if (localStorage.getItem('TotalFolios$' + estatus) !== null) {
                                total = localStorage.getItem('TotalFolios$' + estatus)
                            } else {
                                total = cellInfo.data.items.length;
                            }
                            summaryText = `Estatus ${estatus} (TOTAL ${total})`;
                        }
                        if (cellInfo.data.isContinuationOnNextPage) {
                            summaryText += ' La lista continua en la siguiente pagina';
                        }

                        return $("<span>").text(summaryText);
                    }
                },
                { caption: "Tipo Reporte", dataField: "TipoReporte" },
                { caption: "Entrega de vivienda", dataField: "DeEntregaVivienda", alignment: "center" },
                { caption: "Fecha Reporte", dataField: 'FechaReporte', dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "Fecha Terminado", dataField: 'FechaTerminacionFolio', dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "# Incidencia", dataField: "Partida", alignment: "center" },
                { caption: "Estatus Inc. Diag. ", dataField: "EstatusPartidaDictamen" },
                { caption: "Inc. Autorizada", dataField: "Autorizada" },
                { caption: "Fec. Inc. Autorizada", dataField: "FechaAutorizada", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "Diagnostico", dataField: "ListaDictamentes", alignment: "center" },
                { caption: "Estatus Diagnostico", dataField: "EstatusDictamen", alignment: "center" },
                { caption: "F. diagnostico creado", dataField: "FechaCreadoDictamen", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "F. Inicio Agenda diagnostico", dataField: "FechaInicioDictamen", alignment: "center", dataType: 'datetime', format: 'dd/MM/yyyy' },
                { caption: "F. diagnostico terminado", dataField: "FechaFinDictamen", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy',width:150 },
                { caption: "F. diagnostico terminado CAT", dataField: "FechaFinDictamenCAT", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "F. diagnostico cancelado", dataField: "FechaCancelacionDictamen", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "Fecha Cambio estatus Diag - WEB", dataField: 'FechaCambioEstatusDicWeb', alignment: "center", dataType: 'datetime', format: 'dd/MM/yyyy HH:mm' },
                { caption: "Usuario Cambio estatus Diag - WEB", dataField: 'UsuarioCambioEstatusDicWeb', alignment: "center" },
                { caption: "CAT Responsable Dictamen", dataField: "CatResponsableDictamen", alignment: "center" },
                { caption: "CAT Responsable OT", dataField: "CatResponsableOT", alignment: "center" },
                { caption: "Orden de trabajo", dataField: "OrdenTrabajo.ID", alignment: "center" },
                { caption: "Trabajos terminados", dataField: "TrabajosTerminados", alignment: "center" },
                { caption: "Estatus OT", dataField: "OrdenTrabajo.Estatus", alignment: "center" },
                { caption: "F. OT creada", dataField: "OrdenTrabajo.FechaCreado", alignment: "center", width: 150 , dataType: 'date', format: 'dd/MM/yyyy'},
                { caption: "F. Inicio Agenda OT", dataField: "OrdenTrabajo.FechaInicio", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "F. Inicio Real OT", dataField: "OrdenTrabajo.FechaInicioReal", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "F. Fin Real OT", dataField: "OrdenTrabajo.FechaFinReal", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "F. OT Terminado Cat", dataField: "FechaTerminadoCatOrdenTrabajo", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "F. cancelacion OT", dataField: "OrdenTrabajo.FechaCancelado", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy', width: 100 },
                { caption: "Fecha Cambio estatus OT - WEB", dataField: 'FechaCambioEstatusOTWeb', alignment: "center", dataType: 'datetime', format: 'dd/MM/yyyy HH:mm' },
                { caption: "Usuario Cambio estatus OT - WEB", dataField: 'UsuarioCambioEstatusOTWeb', alignment: "center" },
                { caption: "Dias transcurridos", dataField: 'DiasTranscurridos', alignment: "center" },
                { caption: "Fecha cancelacion folio", dataField: 'FechaCancelacionFolio', dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "Motivo cancelacion folio", dataField: 'MotivoCancelacionFolio' },
                { caption: "Familia", dataField: "TipoFalla.Nombre" },
                { caption: "Componente", dataField: "Falla.Descripcion" },
                { caption: "Ubicación Incidencia", dataField: "UbicacionFalla.Descripcion" },
                { caption: "Causa Incidencia", dataField: "CausaFalla.Descripcion" },
                { caption: "Incidencia Origen", dataField: "CausaFalla.FallaOrigen.Descripcion" },
                { caption: "Observaciones Cliente", dataField: "Observaciones" },
                { caption: "Observaciones de CAT en APP", dataField: "ObservacionesOTApp" },
                { caption: "Observaciones Contratista", dataField: "ObservacionesContratista" },
                { caption: "Observaciones a nivel folio", dataField: "ObservacionFolio" },
                { caption: "Medio Solicitud", dataField: "MedioSolicitud.Nombre" },
                { caption: "# Prototipo", dataField: "Prototipo.ID" },
                { caption: "Prototipo", dataField: "Prototipo.Nombre" },
                { caption: "Financiamiento", dataField: "Financiamiento" },
                { caption: "Hipoteca Verde", dataField: "EsHipotecaVerde" },
                { caption: "Correo electronico cliente", dataField: "CorreoCliente" },
                { caption: "Telefonos Cliente", dataField: "ContactosCliente" },            
                { caption: "# Contratista Incidencia", dataField: "ContratistaPartida.ID" },
                { caption: "Nombre contratista Incidencia", dataField: "ContratistaPartida.Nombre" },
                { caption: "# Contratista OT", dataField: "Contratista.ID" },
                { caption: "Contratista Imputable", dataField: "ContratistaImputable.Nombre" },
                { caption: "Nombre contratista OT", dataField: "Contratista.Nombre" },
                { caption: "Usuario Recibió", dataField: "UsuarioRecibio.Nombre" },
                { caption: "Días Solución", dataField: "DiasSolucion", alignment: "center" },
                { caption: "Días Contratista", dataField: "Diascontratista", alignment: "center" },
                { caption: "# Responsable", dataField: "ResponsableConstruccion.ID", alignment: "center" },
                { caption: "Responsable", dataField: "ResponsableConstruccion.Nombre" },
                { caption: "Tipo Responsable", dataField: "ResponsableConstruccion.TipoResponsable" },
                { caption: "Costo Proyectado", dataField: "CostoProyectado" },
                { caption: "Días Reporte Abierto", dataField: "DiasReporteAbierto" },
                { caption: "Incidencia Procede", dataField: "Procede" },
                { caption: "Fecha  Procedencia", dataField: "FechaProcedencia", dataType: "datetime", format: "dd/MM/yyyy" },
                { caption: "Monto Seguro", dataField: "MontoSeguro" },
                { caption: "Fecha Entrega", dataField: "FechaEntregaCalidad", dataType: "datetime", format: "dd/MM/yyyy" },
                { caption: "Fecha Firmó", dataField: "FechaEntregado", dataType: "datetime", format: "dd/MM/yyyy" },
                { caption: "FInalizado por:", dataField: "UsuarioProcesoFin" }
            ] : [{ caption: "Plaza", dataField: "Plaza.Nombre" },

                    {
                        caption: "Folio", dataField: "Folio", groupIndex: 0, width: 100, alignment: "center" ,
                        groupCellTemplate: function (cellElement, cellInfo) {
                            let total = '0';
                            let estatus = cellInfo.text;
                            if (!cellInfo.row.isExpanded) {
                                total = cellInfo.data.collapsedItems.length;
                                summaryText = `Folio ${estatus} (TOTAL ${total})`;
                                localStorage.setItem('TotalItemInFolio$' + cellInfo.text, total);
                            } else {
                                if (localStorage.getItem('TotalItemInFolio$$' + estatus) !== null) {
                                    total = localStorage.getItem('TotalItemInFolio$$' + estatus)
                                } else {
                                    total = cellInfo.data.items.length;
                                }
                                summaryText = `Folio ${estatus} (TOTAL ${total})`;
                            }
                            if (cellInfo.data.isContinuationOnNextPage) {
                                summaryText += ' La lista continua en la siguiente pagina';
                            }

                            return $("<span>").text(summaryText);
                        }
                    },
                    { caption: "Tipo Vivienda", dataField: "TipoVivienda.Descripcion" },
                    {
                        caption: "Estatus Reporte", dataField: "EstatusReporte",
                        groupCellTemplate: function (cellElement, cellInfo) {
                            let total = '0';
                            let estatus = cellInfo.text;
                            if (!cellInfo.row.isExpanded) {
                                total = cellInfo.data.collapsedItems.length;
                                summaryText = `Estatus ${estatus} (TOTAL ${total})`;
                                localStorage.setItem('TotalFolios$' + cellInfo.text, total);
                            } else {
                                if (localStorage.getItem('TotalFolios$' + estatus) !== null) {
                                    total = localStorage.getItem('TotalFolios$' + estatus)
                                } else {
                                    total = cellInfo.data.items.length;
                                }
                                summaryText = `Estatus ${estatus} (TOTAL ${total})`;
                            }
                            if (cellInfo.data.isContinuationOnNextPage) {
                                summaryText += ' La lista continua en la siguiente pagina';
                            }

                            return $("<span>").text(summaryText);
                        }
                    },
                    { caption: "Tipo Reporte", dataField: "TipoReporte" },
                    { caption: "Entrega de vivienda", dataField: "DeEntregaVivienda", alignment: "center" },
                    { caption: "Fecha Reporte", dataField: 'FechaReporte', dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "Fecha Terminado", dataField: 'FechaTerminacionFolio', dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "# Incidencia", dataField: "Partida", alignment: "center" },
                    { caption: "Estatus Inc. Diag. ", dataField: "EstatusPartidaDictamen" },
                    { caption: "Inc. Autorizada", dataField: "Autorizada" },
                    { caption: "Fec. Inc. Autorizada", dataField: "FechaAutorizada", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "Diagnostico", dataField: "ListaDictamentes", alignment: "center" },
                    { caption: "Estatus Diagnostico", dataField: "EstatusDictamen", alignment: "center" },
                    { caption: "F. diagnostico creado", dataField: "FechaCreadoDictamen", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "F. Inicio Agenda diagnostico", dataField: "FechaInicioDictamen", alignment: "center", dataType: 'datetime', format: 'dd/MM/yyyy' },
                    { caption: "F. diagnostico terminado", dataField: "FechaFinDictamen", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy', width:150 },
                    { caption: "F. diagnostico terminado CAT", dataField: "FechaFinDictamenCAT", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "F. diagnostico cancelado", dataField: "FechaCancelacionDictamen", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "Fecha Cambio estatus Diag - WEB", dataField: 'FechaCambioEstatusDicWeb', alignment: "center", dataType: 'datetime', format: 'dd/MM/yyyy HH:mm' },
                    { caption: "Usuario Cambio estatus Diag - WEB", dataField: 'UsuarioCambioEstatusDicWeb', alignment: "center" },
                    { caption: "CAT Responsable Dictamen", dataField: "CatResponsableDictamen", alignment: "center" },
                    { caption: "CAT Responsable OT", dataField: "CatResponsableOT", alignment: "center", width: 200 },
                    { caption: "Orden de trabajo", dataField: "OrdenTrabajo.ID", alignment: "center" },
                    { caption: "Trabajos terminados", dataField: "TrabajosTerminados", alignment: "center" },
                    { caption: "Estatus OT", dataField: "OrdenTrabajo.Estatus", alignment: "center" },
                    { caption: "F. OT creada", dataField: "OrdenTrabajo.FechaCreado", alignment: "center", width: 150, dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "F. Inicio Agenda OT", dataField: "OrdenTrabajo.FechaInicio", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "F. Inicio Real OT", dataField: "OrdenTrabajo.FechaInicioReal", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "F. Fin Real OT", dataField: "OrdenTrabajo.FechaFinReal", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "F. OT Terminado Cat", dataField: "FechaTerminadoCatOrdenTrabajo", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "F. cancelacion OT", dataField: "OrdenTrabajo.FechaCancelado", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy', width: 100  },
                    { caption: "Fecha Cambio estatus OT - WEB", dataField: 'FechaCambioEstatusOTWeb', alignment: "center", dataType: 'datetime', format: 'dd/MM/yyyy HH:mm' },
                    { caption: "Usuario Cambio estatus OT - WEB", dataField: 'UsuarioCambioEstatusOTWeb', alignment: "center" },
                    { caption: "Dias transcurridos", dataField: 'DiasTranscurridos', alignment: "center" },
                    { caption: "Fecha cancelacion folio", dataField: 'FechaCancelacionFolio', dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "Motivo cancelacion folio", dataField: 'MotivoCancelacionFolio' },
                    { caption: "Familia", dataField: "TipoFalla.Nombre" },
                    { caption: "Componente", dataField: "Falla.Descripcion" },
                    { caption: "Ubicación Incidencia", dataField: "UbicacionFalla.Descripcion" },
                    { caption: "Causa Incidencia", dataField: "CausaFalla.Descripcion" },
                    { caption: "Incidencia Origen", dataField: "CausaFalla.FallaOrigen.Descripcion" },
                    { caption: "Observaciones Cliente", dataField: "Observaciones" },
                    { caption: "Observaciones de CAT en APP", dataField: "ObservacionesOTApp" },
                    { caption: "Observaciones Contratista", dataField: "ObservacionesContratista" },
                    { caption: "Observaciones a nivel folio", dataField: "ObservacionFolio" },
                    { caption: "Medio Solicitud", dataField: "MedioSolicitud.Nombre" },
                    { caption: "# Prototipo", dataField: "Prototipo.ID" },
                    { caption: "Prototipo", dataField: "Prototipo.Nombre" },
                    { caption: "Financiamiento", dataField: "Financiamiento" },
                    { caption: "Hipoteca Verde", dataField: "EsHipotecaVerde" },
                    { caption: "# Cliente", dataField: "Cliente.ID" },
                    { caption: "Cliente", dataField: "Cliente.Nombre" },
                    { caption: "Correo electronico cliente", dataField: "CorreoCliente" },
                    { caption: "Telefonos Cliente", dataField: "ContactosCliente" },
                    { caption: "# Fraccionamiento", dataField: "Fraccionamiento.ID" },
                    { caption: "Nombre Fraccionamiento", dataField: "Fraccionamiento.Descripcion" },
                    { caption: "Calle Fraccionamiento", dataField: "Fraccionamiento.Direccion" },
                    { caption: "Etapa", dataField: "Ubicacion.Etapa", alignment: "left" },
                    { caption: "Manzana", dataField: "Ubicacion.Manzana", alignment: "center", width: 200 },
                    { caption: "Lote", dataField: "Ubicacion.Lote" },
                    { caption: labelInterior, dataField: "Ubicacion.NumeroInterior" },
                    { caption: "# Exterior", dataField: "Ubicacion.NumeroExterior" },
                    { caption: "# Contratista Incidencia", dataField: "ContratistaPartida.ID" },
                    { caption: "Nombre contratista Incidencia", dataField: "ContratistaPartida.Nombre" },
                    { caption: "# Contratista OT", dataField: "Contratista.ID" },
                   { caption: "Contratista Imputable", dataField: "ContratistaImputable.Nombre" },
                    { caption: "Nombre contratista OT", dataField: "Contratista.Nombre" },
                    { caption: "Usuario Recibió", dataField: "UsuarioRecibio.Nombre" },
                    { caption: "Días Solución", dataField: "DiasSolucion", alignment: "center" },
                    { caption: "Días Contratista", dataField: "Diascontratista", alignment: "center" },
                    { caption: "# Responsable", dataField: "ResponsableConstruccion.ID", alignment: "center" },
                    { caption: "Responsable", dataField: "ResponsableConstruccion.Nombre" },
                    { caption: "Tipo Responsable", dataField: "ResponsableConstruccion.TipoResponsable" },
                    { caption: "Costo Proyectado", dataField: "CostoProyectado" },
                    { caption: "Días Reporte Abierto", dataField: "DiasReporteAbierto" },
                    { caption: "Incidencia Procede", dataField: "Procede" },
                    { caption: "Fecha  Procedencia", dataField: "FechaProcedencia", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Monto Seguro", dataField: "MontoSeguro" },
                    { caption: "Fecha Entrega", dataField: "FechaEntregaCalidad", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Fecha Firmó", dataField: "FechaEntregado", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "FInalizado por:", dataField: "UsuarioProcesoFin" }];
      
            //if (UrlAplicacion.pathname.includes("intra")) {
            //    columnas.splice(47, 1).splice(48, 1).splice(49, 1);
            //    columnas.splice(49, 0, { caption: "Edificio", dataField: "edificio" }, { caption: "Nivel", dataField: "nivel" })
            //}
            if (getData(props.page).id === config.id) {
                filters = global.assign(filters, global.getFilters(filters));
                filters.IdVocacion = filters.Vocacion ? filters.Vocacion.Clave : null;
                filters.IdCausaFalla = filters.CausaFalla ? filters.CausaFalla.ID === -2 ? -2 : filters.CausaFalla.IdCausaFalla : null;

                if (!(filters.Fraccionamientos && filters.Fraccionamientos.length > 0)) {
                    global.info("Debe seleccionar por lo menos un fraccionamiento.");
                    return;
                };
                //props.config.dispatchCatalogoBasePost("scv/reportesFallas/consulta", filters);
                let loader = document.getElementById('loading');
                let loadedTable = document.getElementById('loadedData');

                try {
                    $("#datagroupContainer").dxDataGrid("dispose");
                } catch (ex) { }
                console.log(filters)
                global.asyncPost("scv/reportesFallas/consulta", filters, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            loader.style.display = 'none';
                            loadedTable.style.display = 'inherit';
                           
                            for (const d of data) {
                                //console.log(d)
                                d.DiasTranscurridos = d.DiasTranCancelacion;
                                if (d.ObservacionesContratista !== null && d.ObservacionesContratista !== undefined && d.ObservacionesContratista.includes("♪")) {
                                    d.ObservacionesContratista = d.ObservacionesContratista.replace("♪", "  | |  ")
                                }
                                d.DiasSolucion = d.DiasSolucion <= 0 ? 1 : d.DiasSolucion;
                                d.ListaDictamentes = d.ListaDictamentes === null ? 'N/A' : d.ListaDictamentes;
                                d.EstatusDictamen = d.EstatusDictamen === null ? 'N/A' : d.EstatusDictamen;
                                d.FechaCancelacionDictamen = d.EstatusDictamen === 'CANCELADO' ? d.FechaCancelacionFolio : 'N/A';
                                console.log(d.OrdenTrabajo.FechaCreado)
                            }
                            //198008	
                            
                                let fecha = Date.now();
                                let dataGrid = $("#datagroupContainer").dxDataGrid({
                                    dataSource: data,
                                    allowColumnReordering: true,
                                    scrolling: {
                                        columnRenderingMode: "standard"
                                    },
                                    columnAutoWidth: true,
                                    showBorders: false,
                                    grouping: {
                                        autoExpandAll: false,
                                    },
                                    
                                    onExporting: function (e) {

                                        e.cancel = true;
                                        for (const d of data) {
                                            d.EsHipotecaVerde = d.EsHipotecaVerde ? 'SI' : 'NO';
                                            d.Procede = d.Procede ? 'SI' : 'NO';
                                            d.MontoSeguro = d.MontoSeguro ? 'SI' : 'NO';
                                            d.Autorizada = d.Autorizada ? 'SI' : 'NO';
                                        }
                                        e.cancel = false;
                                        setTimeout(() => {
                                            for (const d of data) {
                                                d.EsHipotecaVerde = d.EsHipotecaVerde === 'SI' ? true : false
                                                d.Procede = d.Procede === 'SI' ? true : false
                                                d.MontoSeguro = d.MontoSeguro === 'SI' ? true : false
                                                d.Autorizada = d.Autorizada === 'SI' ? true : false
                                            }
                                        }, 200);
                                        
                                    },
                                    
                                    searchPanel: {
                                        visible: true
                                    },
                                    export: {
                                        enabled: true,
                                        fileName: "Reporte_Fallas_" + fecha,
                                        allowExportSelectedData: false
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
                                        visible: true
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
            };
        };
        componentDidMount(): void {
            global.dispatchSuccessful("global-current-catalogo", []);
            Forms.updateFormElement([config.id + "$filters"].join(""), "Contratista", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement([config.id + "$filters"].join(""), "TipoFalla", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement([config.id + "$filters"].join(""), "Falla", { ID: -2, IdFalla: -2, Clave: "-2", Nombre: "TODOS", Descripcion: "TODOS" });
            Forms.updateFormElement([config.id + "$filters"].join(""), "CausaFalla", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaInicial", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaFinal", global.getToday(true));
            //Forms.updateFormElement(config.id, "OpcionesProcede", PROCEDE_SI_VALUE);
            //Forms.updateFormElement(config.id, "OpcionesCancelado", CANCELADO_TODOS_VALUE);
            Forms.updateFormElement(config.id, "OpcionesEstatusFolio", FolioEstatusTodos);
            Forms.updateFormElement(config.id, "OpcionesIncidenciaAutorizada", 'IT');
            Forms.updateFormElement(config.id, "OpcionesEstatusOT", null);
            dispatchAsyncPost("load::SPVMOTIVOS", "scv/reportesFallas/GetMotivosCancelacionFolio/");

        };
        componentWillUnmount() {
            for (let key in localStorage) {
                let k: any = key;
                if (k.includes('TotalItemInFolio') || k.includes('TotalFolios')) {
                    localStorage.removeItem(key);
                } else {
                    console.log(key)
                }
            }
            //console.log('cerrar y vaciar el localstorage');
        }
        onRowDoubleClick(item: any): any {
            return null;
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let agruparPorFolio: any = Forms.getValue("AgruparPorFolio", [config.id, "$filters"].join(""));
            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowNew={false}
                allowDelete={false}
                allowExcel={false}
                onWillFilter={this.onWillFilter.bind(this)}
                onFilter={this.onFilter.bind(this)}>
                <page.Filters collapsed={false} refreshIcon="fa fa-search">
                    <ddl.PlazasDDL id="PlazaInicial" idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <ddl.VocacionesFilterDDL id="Vocacion" idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <ddl.SegmentosDDLv2 id="segmento" idForm={config.id} size={[12, 12, 2, 2]} />
                    <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={config.id} />

                    {/*<ddl.TagsFraccionamientosV2 id="Fraccionamientos" idForm={config.id} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} /> */}

                    <consultas.SPVContratistasConsulta id="Contratista" idForm={config.id} size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                    <ddl.SPVMediosComunicacionDDL id="MedioSolicitud" size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                    <DatePicker id="FechaInicial" type="date" idForm={config.id} size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                    <DatePicker id="FechaFinal" type="date" idForm={config.id} size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                    <consultas.SPVTiposComponentesConsulta idForm={config.id} size={[12, 12, 2, 2]} selectAll={true} required={true} validations={[validations.required()]} />
                    <consultas.SPVComponentesConsulta idForm={config.id} size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                    <consultas.SPVCausasFallasConsulta idForm={config.id} size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                    {/*<checkBox.CheckBox id="AgruparPorFolio" label="Agrupar por Folio" idForm={config.id} size={[12, 12, 3, 3]} />*/}
                    <Button text="HIDDEN" size={[12, 12, 3, 3]} style={{ marginTop: 12, visibility: 'hidden'}} />
                    <Column size={[12, 12, 8, 8]} style={{ marginTop: 12 }}>
                        <page.OptionSection
                            title="Estatus de folio"
                            icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                    {/*<RadioButton id={PROCEDE_SI_VALUE} idForm={config.id} value="S" groupName="OpcionesProcede" size={[12, 12, 4, 4]} />
                                    <RadioButton id={PROCEDE_NO_VALUE} idForm={config.id} value="N" groupName="OpcionesProcede" size={[12, 12, 4, 4]} />
                                    <RadioButton id={PROCEDE_TODOS_VALUE} idForm={config.id} value="T" groupName="OpcionesProcede" size={[12, 12, 4, 4]} />*/}

                                    <RadioButton id={FolioEstatusNuevo} label="Nuevo" idForm={config.id} value="FN"  groupName="OpcionesEstatusFolio" size={[12, 12, 3, 3]} change={() => this.setEstatusCancelado(false)} />
                                    <RadioButton id={FolioEstatusTerminado} label="Terminado" value="FT" idForm={config.id}  groupName="OpcionesEstatusFolio" size={[12, 12, 3, 3]} change={() => this.setEstatusCancelado(false)} />
                                    <RadioButton id={FolioEstatusCancelado} label="Cancelado" value="FX" idForm={config.id} groupName="OpcionesEstatusFolio" size={[12, 12, 3, 3]} change={() => this.setEstatusCancelado(true)} />
                                    <RadioButton id={FolioEstatusTodos} label="Todos" value="FALL" idForm={config.id} groupName="OpcionesEstatusFolio" size={[12, 12, 3, 3]} change={() => this.setEstatusCancelado(false)} />
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                    <Column size={[12, 12, 4, 4]} style={{ marginTop: 12 }}>
                        <page.OptionSection
                            title="Incidencias autorizadas"
                            icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                    <RadioButton id={'IA'} label="Autorizado" value="1" idForm={config.id} groupName="OpcionesIncidenciaAutorizada" size={[12, 12, 3, 3]}  />
                                    <RadioButton id={'INA'} label="No Autorizado" value="0" idForm={config.id} groupName="OpcionesIncidenciaAutorizada" size={[12, 12, 4, 4]}  />
                                    <RadioButton id={'IT'} label="Todos" idForm={config.id} value="-2" groupName="OpcionesIncidenciaAutorizada" size={[12, 12, 3, 3]} />
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                    <span id="seccionCancelado" style={{ display: 'none' }}>
                        <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                            <page.OptionSection 
                                title="Motivo de cancelacion"
                                icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <span >
                                            <MotivosreprogDDL id="Motivo" size={[12, 12, 10, 10]} />
                                            <checkBox.CheckBox id="MotivoCancelacionTodos" change={() => this.changeAllCancelados()} label="Todos" idForm={config.id} size={[12, 12, 2, 2]} />
                                        </span>
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </span>
                    

                    {/*<Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                        <span id="seccionCancelado" style={{ display: 'none' }}>
                            <MotivosreprogDDL id="Motivo" label="Motivo de cancelacion" size={[12, 12, 10, 10]} />
                            <checkBox.CheckBox id="MotivoCancelacionTodos" change={() => this.changeAllCancelados()} label="Todos" idForm={config.id} size={[12, 12, 2, 2]} />
                        </span>
                    </Column>*/}

                        <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                        
                        </Column>
                        <Column size={[12, 12, 6, 6]} style={{ marginTop: 12 }}>
                            <page.OptionSection
                                id={PAGE_ESTATUS_DIAGNOSTICO_ID}
                                icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <RadioButton id={DIAGNOSTICO_ABIERTO_VALUE} idForm={config.id} value="I" groupName="OpcionesDiagEstatus" change={() => this.changeColorButtons(1)} size={[12, 12, 4, 4]} />
                                        <RadioButton id={DIAGNOSTICO_CERRADO_VALUE} idForm={config.id} value="C" groupName="OpcionesDiagEstatus" change={() => this.changeColorButtons(1)} size={[12, 12, 4, 4]} />
                                        <RadioButton id={DIAGNOSTICO_TODOS_VALUE} idForm={config.id} value="T" groupName="OpcionesDiagEstatus" change={() => this.changeColorButtons(1)} size={[12, 12, 3, 3]} />
                                        <Button icon="fas fa-eraser" id="btnId1" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={this.clearEstatusDiagnostico} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>

                        
                        <Column size={[12, 12, 6, 6]} style={{ marginTop: 12 }}>
                            <page.OptionSection
                                id={PAGE_ESTATUS_PARTIDA_DIAGNOSTICO_ID}
                                icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <RadioButton id={PARTIDA_DIAGNOSTICO_ABIERTO_VALUE} idForm={config.id} value="ABIERTO" change={() => this.changeColorButtons(2)} groupName="OpcionesPartDiagEstatus" size={[12, 12, 3, 3]} />
                                        <RadioButton id={PARTIDA_DIAGNOSTICO_ACEPTADO_VALUE} idForm={config.id} value="CERRADO" change={() => this.changeColorButtons(2)} groupName="OpcionesPartDiagEstatus" size={[12, 12, 3, 3]} />
                                        <RadioButton id={PARTIDA_DIAGNOSTICO_NOPROCEDE_VALUE} idForm={config.id} value="NO PROCEDE" change={() => this.changeColorButtons(2)} groupName="OpcionesPartDiagEstatus" size={[12, 12, 3, 3]} />
                                        <RadioButton id={PARTIDA_DIAGNOSTICO_TODOS_VALUE} idForm={config.id} value="TODOS" change={() => this.changeColorButtons(2)} groupName="OpcionesPartDiagEstatus" size={[12, 12, 2, 2]} />
                                        <Button icon="fas fa-eraser" id="btnId2" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={this.clearEstatusPartDiagnostico} />

                                    </Column>
                                </Row>
                            </page.OptionSection>
                    </Column>
                    <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                        <hr />
                    </Column>
                    <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                        <page.OptionSection
                            title="Estatus de OT"
                            icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                    <RadioButton id={OTEstatusNuevo} label="Nuevo" idForm={config.id} value="OTN" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                    <RadioButton id={OTEstatusEnProceso} label="En proceso" idForm={config.id} value="OTEP" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                    <RadioButton id={OTEstatusTerminado} label="Terminado" idForm={config.id} value="OTT" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                    <RadioButton id={OTEstatusCancelado} label="Cancelado" idForm={config.id} value="OTC" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                    <RadioButton id={OTEstatusPendiente} label="Pendiente" idForm={config.id} value="OTP" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                    <RadioButton id={OTEstatusTodos} label="Todos" idForm={config.id} value="OTALL" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 1, 1]} />
                                    <Button icon="fas fa-eraser" id="btnId3" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={this.clearEstatusOT} />
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </page.Filters>
                {/*agruparPorFolio === true ?
                    <DataTableAgrupado dtConfig={dtConfig} /> :
                    <dt.DataTableExtended dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} />
                
                <PanelUpdate info={this.props.data}>
                    <div id="datagroupContainer">
                    </div>
                </PanelUpdate>*/}
                <div id="loading" style={{display: 'none'}}>
                    <Updating text="" />
                </div>
                
                <div id="loadedData" style={{ display: 'inherit' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff' }}></div>
                </div>
            </page.Main>
        }
    });

    class DataTableAgrupado extends React.Component<any, any> {
        render(): JSX.Element {
            let dtConfig: dt.IDTConfig = this.props.dtConfig;
            dtConfig.groups
                .add({ data: "Folio" })
                .toArray();

            return <dt.DataTableExtended dtConfig={dtConfig} />
        };
    };

};