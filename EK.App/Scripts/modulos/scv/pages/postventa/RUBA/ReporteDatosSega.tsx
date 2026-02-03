namespace EK.Modules.SCV.Pages.Reportes.DatosSega {
    "use strict";
    const PAGE_ID: string = "ReporteDatosSega";
    //const PAGE_OPCIONES_PARTIDAS_ID: string = "reportesConsulta$opcionesPartidas";
    //const PAGE_OPCIONES_REPORTES_ID: string = "reportesConsulta$opcionesFolios";
    //const PAGE_ESTATUS_DIAGNOSTICO_ID: string = "reportesConsulta$estatusDiagnostico";
    //const PAGE_ESTATUS_PARTIDA_DIAGNOSTICO_ID: string = "reportesConsulta$estatusPartidaDiagnostico";
    //const PAGE_OPCIONES_DIAGNOSTICOS: string = "";
    //const PAGE_OPCIONES_DIAGNOSTICOSPARTIDA: string = "";
    //import FileSaver from 'file-saver';
    declare const ExcelJS: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;

    const TipoConsultaDiag: string = "D";
    const TipoConsultaOT: string = "O";
    const TipoMostrarComparativo: string = "C";
    const TipoMostrarAcumulado: string = "A";
  
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

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
       
        clearEstatusDiagnostico() {
            let model: any = Forms.getValues(config.id);
            Forms.updateFormElement(config.id, "OpcionesDiagEstatus", null);
            let x = document.getElementById('btnId1');
            x.style.background = '#ccc';
        }

        ChangeTipoMostrar(id) {
            let fc = document.getElementById('FechasComparativo');
            let fa = document.getElementById('FechasAcumulado');
            if (id === 1) {
                fc.style.display = 'inherit';
                fa.style.display = 'none';
            } else {
                fc.style.display = 'none';
                fa.style.display = 'inherit';
            }
            
            
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

        onWillFilter(props: any, filters: any): any {
            let model: any = Forms.getValues(config.id);
            console.log(model)
            filters.TipoConsultar = model.TipoConsultar;
            filters.TipoMostrar = model.TipoMostrar;
            filters.Estatus = model.Estatus
            console.log(filters)
            return model;
        };

        formatFiltros(model) {
            let retValue = {
                IdPlaza: null, FechaInicial: null, FechaFinal: null, MesInicio: null,
                MesFin: null, AnioInicio: null, AnioFin: null, TipoConsultar: null,
                TipoMostrar: null, MesInicioTxt: null, MesFinTxt: null,Estatus: null               
            };
            retValue.IdPlaza = model.PlazaInicial ? model.PlazaInicial.ID : null; 
            retValue.FechaInicial = model.FechaInicial ? model.FechaInicial : null; 
            retValue.FechaFinal = model.FechaFinal ? model.FechaFinal : null; 
            retValue.MesInicio = model.MesInicial ? model.MesInicial.ID : null; 
            retValue.MesFin = model.MesFinal ? model.MesFinal.ID : null; 
            retValue.AnioInicio = model.AnioInicial ? model.AnioInicial.ID : null; 
            retValue.AnioFin = model.AnioFinal ? model.AnioFinal.ID : null; 
            retValue.MesInicioTxt = model.MesInicial ? model.MesInicial.Nombre : null; 
            retValue.MesFinTxt = model.MesFinal ? model.MesFinal.Nombre : null; 
            retValue.TipoConsultar = model.TipoConsultar ? model.TipoConsultar : null; 
            retValue.TipoMostrar = model.TipoMostrar ? model.TipoMostrar : null; 
            retValue.Estatus = model.Estatus ? model.Estatus.Clave : null;
            return retValue;
        }

        validarFiltros(f) {
            if (f.IdPlaza === null) {
                global.warning('Seleccione una plaza');
                return false;
            }
            if (f.TipoConsultar === null) {
                global.warning('Seleccione el tipo de consulta');
                return false;
            }
            if (f.TipoMostrar === null) {
                global.warning('Seleccione una opcion de mostrar');
                return false;
            }

            if (f.TipoMostrar === 'C') {
                if (f.MesInicio === null) {
                    global.warning('Seleccione el Mes de inicio');
                    return false;
                }
                if (f.MesFin === null) {
                    global.warning('Seleccione el Mes de fin');
                    return false;
                }
                if (f.AnioInicio === null) {
                    global.warning('Seleccione el Año de inicio');
                    return false;
                }
                if (f.AnioFin === null) {
                    global.warning('Seleccione el Año de fin');
                    return false;
                }
            } 

            if (f.TipoMostrar === 'A') {
                if (f.FechaInicial === null) {
                    global.warning('Seleccione la fecha inicial');
                    return false;
                }
                if (f.FechaFinal === null) {
                    global.warning('Seleccione la fecha final');
                    return false;
                }
            } 
            return true;
        }

        onFilter(props: page.IProps, filters: any, type?: string): void {
            //let summaryText = '';
            //filters.IdPlaza = filters.PlazaInicial.ID;
            if (getData(props.page).id === config.id) {
                //filters.IdPlaza = filters.PlazaInicial ? filters.PlazaInicial.ID : null;
                let filtros = this.formatFiltros(filters);
                //console.log(filtros)
                let valido = this.validarFiltros(filtros);
                if (!valido) {
                    return;
                }
                let columnas: any;
                let titleTipoMostrar = filters.TipoConsultar === 'O' ? 'Orden Trabajo' : 'Diagnostico';
                let titleTipoRelacionado = filters.TipoConsultar === 'O' ? 'Diagnosticos' : 'OrdenesTrabajo';

                let titleResumenTotal = filters.TipoConsultar === 'O' ? 'Total OT' : 'Total Diagnosticos';
                let titleResumenTotalA = filters.TipoConsultar === 'O' ? 'Total OT Terminada App' : 'Total Diagnostico Terminado App ';
                let titleResumenTotalW = filters.TipoConsultar === 'O' ? 'Total OT Terminada Web' : 'Total Diagnostico Terminado Web ';
                columnas = [
                    //{ caption: "Folio", dataField: "folio" },
                    { caption: "Plaza", dataField: "Plaza" },
                    { caption: "Cve. Frac.", dataField: "id_cve_fracc" },
                    { caption: "Nom. Frac", dataField: "nom_fracc" },
                    { caption: "Etapa", dataField: "etapa" },
                    { caption: "Manzana", dataField: "mza" },
                    { caption: "Lote", dataField: "lote" },
                    { caption: "Interior", dataField: "interior" },
                    { caption: "Exterior", dataField: "exterior" },
                    { caption: "Folio", dataField: "folio" },
                    { caption: titleTipoMostrar, dataField: "IdItemRow" },
                    { caption: "Estatus", dataField: "EstatusItem", alignment: 'center' },
                    { caption: "F. Terminado", dataField: "FechaTerminadoItem", alignment: 'center', dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Partida", dataField: "Partida", alignment: 'center' },
                    { caption: "Evidencia", dataField: "tieneEvidencia", alignment: 'center' },
                    { caption: "Comentario", dataField: "tieneComentario", alignment: 'center' },
                    { caption: "Firma del cliente", dataField: "tieneFirma", alignment: 'center' },
                    { caption: "Terminado en app", dataField: "terminado_cat", alignment: 'center' },
                    { caption: titleTipoRelacionado, dataField: "listaRelacionado" },
                    { caption: 'No. Usuario CAT', dataField: "NoCat", alignment: 'center'},
                    { caption: 'Usuario CAT', dataField: "NombreCat" },
                    { caption: 'No. Usuario Web', dataField: "NoUsuarioWeb", alignment: 'center'},
                    { caption: 'Usuario Web', dataField: "NombreUsuarioWeb" }
                    //{ caption: "# Cliente", dataField: "Cliente.ID" }
                ];
                let loader = document.getElementById('loading');
                let loadedTable = document.getElementById('loadedData');
                //console.log(filtros)
                try {
                   $("#datagroupContainer").dxDataGrid("dispose");
                } catch (ex) { }
                global.asyncPost("base/scv/reportesFallasConsulta/GetBP/GetConsultaDatosSEGA/", { parametros: filtros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            loader.style.display = 'none';
                            loadedTable.style.display = 'inherit';
                            console.log(data);
                            for (let d of data) {
                                d.NoUsuarioWeb = d.NoUsuarioWeb === 0 ? '' : d.NoUsuarioWeb;
                            }
                            let dataFiltrado = global.groupArrayByCol(data, 'Plaza');
                            let resumenPlazas = [];
                            let sumaries = [];
                            if (filtros.TipoMostrar === 'A') {
                               
                                for (let d of dataFiltrado) {
                                    let totalItem = d.values.length;
                                    let totalTerminadoApp = d.values.filter(x => x.terminado_cat === 1).length;
                                    let totalTerminadoWeb = d.values.filter(x => x.terminado_cat === 0).length;
                                    let porcentajeA = totalItem > 0 ? Math.round((totalTerminadoApp * 100 / totalItem)):0;
                                    let porcentajeW = totalItem > 0 ? Math.round((totalTerminadoWeb * 100 / totalItem)):0;

                                    resumenPlazas.push({ Plaza: d.Plaza, totalItem, totalTerminadoApp, totalTerminadoWeb, porcentajeA, porcentajeW })
                                }
                                sumaries = [{
                                    column: 'Plaza',
                                    summaryType: 'count',
                                    customizeText(data) {
                                        return `TOTALES`;
                                    },
                                    },
                                    {
                                        column: 'totalItem',
                                        summaryType: 'sum',
                                        customizeText(data) {
                                            return data.value;
                                        },
                                    },
                                    {
                                        column: 'totalTerminadoWeb',
                                        summaryType: 'sum',
                                        customizeText(data) {
                                            return data.value;
                                        },
                                    },
                                    {
                                        column: 'porcentajeW',
                                        summaryType: 'count',
                                        customizeText(data) {
                                            let porc = totalesPorcentaje.web / data.value
                                            return porc;
                                        },
                                    },
                                    {
                                        column: 'totalTerminadoApp',
                                        summaryType: 'sum',
                                        customizeText(data) {
                                            return data.value;
                                        },
                                    },
                                    {
                                        column: 'porcentajeA',
                                        summaryType: 'count',
                                        customizeText(data) {
                                            let porc = totalesPorcentaje.app / data.value
                                            return porc;
                                        },
                                    }]
                            } else {
                                for (let d of dataFiltrado) {
                                    let totalItemI = d.values.filter(x => x.periodo === 'I').length;
                                    let totalTerminadoAppI = d.values.filter(x => x.terminado_cat === 1 && x.periodo === 'I').length;
                                    let totalTerminadoWebI = d.values.filter(x => x.terminado_cat === 0 && x.periodo === 'I').length;
                                    let porcentajeAI = totalItemI>0? Math.round((totalTerminadoAppI * 100 / totalItemI)):0;
                                    let porcentajeWI = totalItemI > 0 ? Math.round((totalTerminadoWebI * 100 / totalItemI)):0;
                                    let totalItemF = d.values.filter(x => x.periodo === 'F').length;
                                    let totalTerminadoAppF = d.values.filter(x => x.terminado_cat === 1 && x.periodo === 'F').length;
                                    let totalTerminadoWebF = d.values.filter(x => x.terminado_cat === 0 && x.periodo === 'F').length;
                                    let porcentajeAF = totalItemF > 0 ? Math.round((totalTerminadoAppF * 100 / totalItemF)):0;
                                    let porcentajeWF = totalItemF > 0 ?Math.round((totalTerminadoWebF * 100 / totalItemF)):0;
                                    let diferencia = porcentajeAF - porcentajeAI;
                                    //totalTerminadoApp = `${totalTerminadoApp}  -  ${porcentajeA}%`;
                                    //totalTerminadoWeb = `${totalTerminadoWeb}  -  ${porcentajeW}%`;
                                    resumenPlazas.push({
                                        Plaza: d.Plaza, totalItemI, totalTerminadoAppI, totalTerminadoWebI,
                                        porcentajeAI, porcentajeWI, totalItemF, totalTerminadoAppF, totalTerminadoWebF,
                                        porcentajeAF, porcentajeWF, diferencia
                                    })
                                }

                                sumaries = [{
                                    column: 'Plaza',
                                    summaryType: 'count',
                                    encodeHtml: false,
                                    customizeText(data) {
                                        return `TOTALES`;
                                    },
                                },
                                {
                                    column: 'totalItemI',
                                    summaryType: 'sum',
                                    customizeText(data) {
                                        return data.value;
                                    },
                                },
                                {
                                    column: 'totalTerminadoWebI',
                                    summaryType: 'sum',
                                    customizeText(data) {
                                        return data.value;
                                    },
                                },
                                {
                                    column: 'porcentajeWI',
                                    summaryType: 'count',
                                    customizeText(data) {
                                        let porc = totalesPorcentaje.web / data.value
                                        return porc;
                                    },
                                },
                                {
                                    column: 'totalTerminadoAppI',
                                    summaryType: 'sum',
                                    customizeText(data) {
                                        return data.value;
                                    },
                                },
                                {
                                    column: 'porcentajeAI',
                                    summaryType: 'count',
                                    customizeText(data) {
                                        let porc = totalesPorcentaje.app / data.value
                                        return porc;
                                    },
                                },
                                    {
                                        column: 'totalItemF',
                                        summaryType: 'sum',
                                        customizeText(data) {
                                            return data.value;
                                        },
                                    },
                                    {
                                        column: 'totalTerminadoWebF',
                                        summaryType: 'sum',
                                        customizeText(data) {
                                            return data.value;
                                        },
                                    },
                                    {
                                        column: 'porcentajeWF',
                                        summaryType: 'count',
                                        customizeText(data) {
                                            let porc = totalesPorcentaje.webf / data.value
                                            return porc;
                                        },
                                    },
                                    {
                                        column: 'totalTerminadoAppF',
                                        summaryType: 'sum',
                                        customizeText(data) {
                                            return data.value;
                                        },
                                    },
                                    {
                                        column: 'porcentajeAF',
                                        summaryType: 'count',
                                        customizeText(data) {
                                            let porc = totalesPorcentaje.appf / data.value
                                            return porc;
                                        },
                                    },
                                    {
                                        column: 'diferencia',
                                        summaryType: 'count',
                                        customizeText(data) {
                                            let porc = totalesPorcentaje.dif / data.value
                                            return porc;
                                        },
                                    }
                                ]
                            }
                            let periodoIni = '';
                            let periodoFin = '';                  

                            let totalesPorcentaje = { app: 0, web: 0, appf: 0, webf: 0,dif:0 };
                            if (filtros.TipoMostrar === 'C') {
                                periodoIni = `${filtros.MesInicioTxt} ${filtros.AnioInicio}`;
                                periodoFin = `${filtros.MesFinTxt} ${filtros.AnioFin}`;
                                for (let i of resumenPlazas) {
                                    totalesPorcentaje.app += i.porcentajeAI;
                                    totalesPorcentaje.web += i.porcentajeWI;
                                    totalesPorcentaje.appf += i.porcentajeAF;
                                    totalesPorcentaje.webf += i.porcentajeWF;
                                    totalesPorcentaje.dif += i.diferencia;
                                }
                            } else {
                                for (let i of resumenPlazas) {
                                    totalesPorcentaje.app += i.porcentajeA;
                                    totalesPorcentaje.web += i.porcentajeW;
                                }
                            }

                            let columnasResumen = filtros.TipoMostrar === 'A' ? [
                                { caption: "Plaza", dataField: "Plaza" },
                                { caption: titleResumenTotal, dataField: "totalItem" },
                                { caption: titleResumenTotalW, dataField: "totalTerminadoWeb" },
                                { caption: '% T. Web', dataField: "porcentajeW", width: 80 },
                                { caption: titleResumenTotalA, dataField: "totalTerminadoApp" },
                                { caption: '% T. App', dataField: "porcentajeA", width: 80 }

                            ] : [{ caption: "Plaza", dataField: "Plaza" }, {
                                caption: periodoIni,
                            
                                alignment: "center",
                                columns: [
                                    { caption: titleResumenTotal, dataField: "totalItemI" },
                                    { caption: titleResumenTotalW, dataField: "totalTerminadoWebI" },
                                    { caption: '% T. Web', dataField: "porcentajeWI", width: 80 },
                                    { caption: titleResumenTotalA, dataField: "totalTerminadoAppI" },
                                    { caption: '% T. App', dataField: "porcentajeAI", width: 80 }
                                  ]
                                }, {
                                    caption: periodoFin,
                                    alignment: "center",
                                        columns: [
                                            { caption: titleResumenTotal, dataField: "totalItemF" },
                                            { caption: titleResumenTotalW, dataField: "totalTerminadoWebF" },
                                            { caption: '% T. Web', dataField: "porcentajeWF", width: 80 },
                                            { caption: titleResumenTotalA, dataField: "totalTerminadoAppF" },
                                            { caption: '% T. App', dataField: "porcentajeAF", width: 80 }
                                        ]
                                    },
                                    { caption: "Dif.", dataField: "diferencia" }
                                   ];

                            let fecha = Date.now();
                            let Detalle = "Detalle";
                            let Resumen = "Resumen";
                            let dataGrid = $("#datagroupContainer").dxTabPanel({
                                export: {
                                    enabled: true,
                                    fileName: "Reporte_SEGA_" + fecha,
                                    allowExportSelectedData: false
                                },
                                dataSource: [{
                                    title: "Detalle",
                                    template: function () {
                                        return $("<div id='details'>").dxDataGrid({
                                            width: "100%",
                                            columns: columnas,
                                            rowAlternationEnabled: true,
                                            dataSource: data,
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
                                                visible: true
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
                                                visible: true
                                            },
                                            columnFixing: { enabled: true },
                                            showColumnLines: false,
                                            showRowLines: true,
                                            selection: {
                                                mode: "single"
                                            },
                                        });
                                    },
                                },
                                    {
                                        title: 'Resumen',
                                        template: function () {
                                            return $("<div id='resume'>").dxDataGrid({
                                                width: "100%",
                                                columns: columnasResumen,
                                                summary: {
                                                    totalItems: sumaries
                                                },
                                                rowAlternationEnabled: true,
                                                dataSource: resumenPlazas
                                            });
                                        }
                                    }],
                                itemTitleTemplate: function (itemData, itemIndex, itemElement) {
                                    itemElement.append("<span classNane='dx-tab-text'>" + itemData.title + "</span>");
                                },
                                deferRendering: false
                            });

                            $("#exportButton").dxButton({
                                text: "Exportar a excel",
                                icon: "xlsxfile",
                                type: "success",
                                onClick: function () {
                                    let dataGrid1 = $("#details").dxDataGrid("instance");
                                    let dataGrid2 = $("#resume").dxDataGrid("instance");
                                    let workbook = new ExcelJS.Workbook();
                                    let details = workbook.addWorksheet(Detalle);
                                    let resume = workbook.addWorksheet(Resumen);

                                    details.getRow(2).getCell(2).value = "Detalle";
                                    details.getRow(2).getCell(2).font = { bold: true, size: 16, underline: "double" };

                                    resume.getRow(2).getCell(2).value = "Resumen";
                                    resume.getRow(2).getCell(2).font = { bold: true, size: 16, underline: "double" };

                                    function setAlternatingRowsBackground(gridCell, excelCell) {
                                        if (gridCell.rowType === "header" || gridCell.rowType === "data") {
                                            if (excelCell.fullAddress.row % 2 === 0) {
                                                excelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "D3D3D3" }, bgColor: { argb: "D3D3D3" } };
                                            }
                                        }
                                    }

                                    DevExpress.excelExporter.exportDataGrid({
                                        worksheet: details,
                                        component: dataGrid1,
                                        topLeftCell: { row: 4, column: 2 },
                                        customizeCell: function (options) {
                                            setAlternatingRowsBackground(options.gridCell, options.excelCell)
                                        }
                                    }).then(function () {
                                        return DevExpress.excelExporter.exportDataGrid({
                                            worksheet: resume,
                                            component: dataGrid2,
                                            topLeftCell: { row: 4, column: 2 },
                                            customizeCell: function (options) {
                                                setAlternatingRowsBackground(options.gridCell, options.excelCell)
                                            }
                                        });
                                    }).then(function () {
                                        workbook.xlsx.writeBuffer().then(function (buffer) {
                                            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ReporteDatosSEGA_" + fecha + ".xlsx");
                                        });
                                    });
                                }
                            });
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
            
        };
        componentDidMount(): void {
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaInicial", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaFinal", global.getToday(true));
            Forms.updateFormElement(config.id, "TipoConsultar", null);
            Forms.updateFormElement(config.id, "TipoMostrar", null);
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
                    <Row style={{ padding: '5px' }}>
                    <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={config.id} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />
                    <span style={{ display: 'inherit' }} id="FechasAcumulado">
                        <DatePicker id="FechaInicial" label="Fecha Inicio" type="date" idForm={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        <DatePicker id="FechaFinal" label="Fecha Fin" type="date" idForm={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                    </span>
                    <span style={{ display: 'none' }} id="FechasComparativo">
                        <Column size={[12, 12, 3, 3]} style={{ marginTop: 12 }}>
                            <page.OptionSection
                                title="Inicio"
                                icon="" level={1} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <ddl.YearsDDL id="AnioInicial" idForm={config.id} size={[12, 12, 6, 6]} label="Año" validations={[validations.required()]} required={true} />
                                        <ddl.MonthsDDL id="MesInicial" idForm={config.id} size={[12, 12, 6, 6]} label="Mes" validations={[validations.required()]} required={true} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                        <Column size={[12, 12, 3, 3]} style={{ marginTop: 12 }}>
                            <page.OptionSection
                                title="Fin"
                                icon="" level={1} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <ddl.YearsDDL id="AnioFinal" idForm={config.id} size={[12, 12, 6, 6]} label="Año" validations={[validations.required()]} required={true} />
                                        <ddl.MonthsDDL id="MesFinal" idForm={config.id} size={[12, 12, 6, 6]} label="Mes" validations={[validations.required()]} required={true} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </span>
                   </Row>
                    <Row style={{padding:'5px' }} >
                        <Column size={[12, 12, 6, 6]} style={{ marginTop: 12 }}>
                            <page.OptionSection
                                title="Consulta de"
                                icon="" level={1} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>

                                        <RadioButton id={TipoConsultaDiag} label="Diagnostico" idForm={config.id} value="ConsultarDiag" groupName="TipoConsultar" size={[12, 12, 3, 3]} />
                                        <RadioButton id={TipoConsultaOT} label="Orden de trabajo" value="ConsultarOT" idForm={config.id} groupName="TipoConsultar" size={[12, 12, 3, 3]} />

                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                        <ddl.EstatusSegaDDL id="Estatus" idForm={config.id} size={[12, 12, 2, 2]} style={{ height: '60px' }} label="Estatus" validations={[validations.required()]} required={true} />

                        <Column size={[12, 12, 4, 4]} style={{ marginTop: 12 }}>
                            <page.OptionSection
                                title="Mostrar"
                                icon="" level={1} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>

                                        <RadioButton id={TipoMostrarComparativo} label="Comparativo" idForm={config.id} value="MostrarComparativo" groupName="TipoMostrar" change={() => this.ChangeTipoMostrar(1)} size={[12, 12, 5, 5]} />
                                        <RadioButton id={TipoMostrarAcumulado} label="Acumulado" value="MostrarAcumulado" idForm={config.id} groupName="TipoMostrar" change={() => this.ChangeTipoMostrar(2)} size={[12, 12, 5, 5]} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </Row>
                </page.Filters>
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'inherit' }}>
                    <div id="exportContainer">
                        <div id="exportButton"></div>
                    </div>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff' }}></div>
                </div>
            </page.Main>
        }
    });
}