

namespace EK.Modules.SCV.Pages.postventa.RUBA.ReportePredictivo {
    const PAGE_ID: string = "ReportePredictivo";
    const PAGE_PENDIENTE_RESULT_ID: string = "ReportePredictivoResult";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_PENDIENTE_RESULT_ID]);
    declare const Map: any;
    export class Vista extends page.Base {
        componentDidMount(): void {
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowNew={false} allowSave={false} allowEdit={false} allowDelete={false}>
                <Filtros />
                {<ResultView />}
            </page.Main>;
        };
    }
    interface IConsultaReincidencias extends page.IProps {
        plaza?: any;
        load?: any;
    };

    let Filtros: any = global.connect(class extends React.Component<IConsultaReincidencias, {}> {
        constructor(props: IConsultaReincidencias) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada;
            return retValue;
        };
        componentWillReceiveProps(nextProps: IConsultaReincidencias, nextState: IConsultaReincidencias): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        }
        onSelectReport(params: any): void {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            let loadedGraf = document.getElementById('loadedDatagraf');
            let UrlAplicacion: any = window.location;
            let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'Departamento' : '# Interior';
            let columns: any
            columns = UrlAplicacion.pathname.includes("intra") ? [
                { caption: "Cliente", dataField: "Nombre", alignment: 'left' },
                { caption: "Fraccionamiento", dataField: "Fraccionamiento", alignment: 'left' },
                { caption: "Edificio", dataField: "edificio", alignment: 'center' },
                { caption: "Nivel", dataField: "nivel", alignment: 'center' },
                { caption: labelInterior, dataField: "Interior", alignment: 'center' },
                { caption: "Calle", dataField: "Calle", alignment: 'left' },            
                { caption: "# Exterior", dataField: "Exterior", alignment: 'left' },
                { caption: "Plaza", dataField: "Plaza", alignment: 'center' },
                { caption: "Telefono Casa", dataField: "TelefonoCasa", alignment: 'center' },
                { caption: "Telefono Oficina", dataField: "TelefonoOficina", alignment: 'center' },
                { caption: "Telefono Otros", dataField: "TelefonoOtros", alignment: 'center' },
                { caption: "Tipo Vivienda", dataField: "TipoVivienda", alignment: 'left' },          
                { caption: "Historial de incidencias", dataField: "HistorialIncidencias", alignment: 'center' },
                { caption: "Fecha Entrega", dataField: "FechaEntrega", alignment: 'center', dataType: "datetime", format: "d/MM/yyyy" },
                { caption: "Dias Entrega", dataField: "Dias", alignment: 'center' },
                { caption: "Tuvo Detalles Entrega", dataField: "Detalle", alignment: 'center' },
                { caption: "Folios Abiertos", dataField: "FolioAbiertos", alignment: 'center' },
                { caption: "Incidencias Abiertas", dataField: "IncidenciasAbiertas", alignment: 'center' },
                { caption: "Reincidencias", dataField: "Reincidencias", alignment: 'center' },
                { caption: "Tiempo de reparacion corriendo", dataField: "FolioPromedio", alignment: 'center' },
                { caption: "Tiempo de reparacion final", dataField: "TiemposReparacionFinal", alignment: 'center' },
                { caption: "Problematicas encontradas", dataField: "PuntajeProblematica", alignment: 'center' },
                { caption: "Estatus", dataField: "Estatus", alignment: 'center' },
                { caption: "Contratista", dataField: "Contratista", alignment: 'center' }
            ] : [{ caption: "Plaza", dataField: "Plaza", alignment: 'center' },
                    { caption: "Cliente", dataField: "Nombre", alignment: 'left' },
                    { caption: "Telefono Casa", dataField: "TelefonoCasa", alignment: 'center' },
                    { caption: "Telefono Oficina", dataField: "TelefonoOficina", alignment: 'center' },
                    { caption: "Telefono Otros", dataField: "TelefonoOtros", alignment: 'center' },
                    { caption: "Tipo Vivienda", dataField: "TipoVivienda", alignment: 'left' },
                    { caption: "Fraccionamiento", dataField: "Fraccionamiento", alignment: 'left' },
                    { caption: "Calle", dataField: "Calle", alignment: 'left' },
                    { caption: "Etapa", dataField: "Etapa", alignment: 'center' },
                    { caption: "Manzana", dataField: "Manzana", alignment: 'center' },
                    { caption: "Lote", dataField: "Lote", alignment: 'center' },
                    { caption: labelInterior, dataField: "Interior", alignment: 'center' },
                    { caption: "# Exterior", dataField: "Exterior", alignment: 'left' },
                    { caption: "Historial de incidencias", dataField: "HistorialIncidencias", alignment: 'center' },
                    { caption: "Fecha Entrega", dataField: "FechaEntrega", alignment: 'center', dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Dias Entrega", dataField: "Dias", alignment: 'center' },
                    { caption: "Tuvo Detalles Entrega", dataField: "Detalle", alignment: 'center' },
                    { caption: "Folios Abiertos", dataField: "FolioAbiertos", alignment: 'center' },
                    { caption: "Incidencias Abiertas", dataField: "IncidenciasAbiertas", alignment: 'center' },
                    { caption: "Reincidencias", dataField: "Reincidencias", alignment: 'center' },
                    { caption: "Tiempo de reparacion corriendo", dataField: "FolioPromedio", alignment: 'center' },
                    { caption: "Tiempo de reparacion final", dataField: "TiemposReparacionFinal", alignment: 'center' },
                    { caption: "Problematicas encontradas", dataField: "PuntajeProblematica", alignment: 'center' },
                    { caption: "Estatus", dataField: "Estatus", alignment: 'center' },
                    { caption: "Contratista", dataField: "Contratista", alignment: 'center' }];
            
            //if (UrlAplicacion.pathname.includes("intra")) {
            //    columns.splice(8, 1).splice(9, 1).splice(10, 1);
            //    columns.splice(10, 0, { caption: "Edificio", dataField: "edificio", alignment: 'center' }, { caption: "Nivel", dataField: "nivel", alignment: 'center' })
            //}

            let grafica = [
                { valueField: "TotalSN", name: "Sin Riesgo", color: "#82E0AA" },
                { valueField: "TotalPR", name: "Posible Riesgo", color: "#f1c40f" },
                { valueField: "TotalR", name: "Riesgo", color: "#e67e22" },
                //{ valueField: "TotalRE", name: "Riesgo Evidente", color: "#F5B7B1" },
                { valueField: "TotalAR", name: "Alto Riesgo", color: "#e74c3c" }
                //{ valueField: "TotalMAR", name: "Muy Alto Rieso", color: "#E74C3C", },
            ];
            let graficaFracc = [
                { valueField: "PosibleRiesgo", name: "Posible Riesgo", color: "#f1c40f" },
                { valueField: "Riesgo", name: "Riesgo", color: "#e67e22" },
                //{ valueField: "RiesgoEvidente", name: "Riesgo Evidente", color: "#F5B7B1" },
                { valueField: "AltoRiesgo", name: "Alto Riesgo", color: "#e74c3c" }
                //{ valueField: "MuyAltoRiesgo", name: "Muy Alto Riesgo", color: "#E74C3C", },
            ];
            global.asyncPost("base/kontrol/reportesFallasConsulta/GetBP/GetReportePredictivo/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        loadedGraf.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data, PAGE_PENDIENTE_RESULT_ID)
                        let chart = data;
                        //console.log(data)
                        let chartdata = [//{ gravedad: 'Muy alto riesgo', TotalMAR: chart.filter(x => x.PuntajeProblematica === 7).length },
                        { gravedad: 'Alto riesgo', TotalAR: chart.filter(x => x.PuntajeProblematica > 4).length },
                        //{ gravedad: 'Riesgo evidente', TotalRE: chart.filter(x => x.PuntajeProblematica === 5).length },
                        { gravedad: 'Riesgo', TotalR: chart.filter(x => x.PuntajeProblematica === 3 || x.PuntajeProblematica === 4).length },
                        { gravedad: 'Posible riesgo', TotalPR: chart.filter(x => x.PuntajeProblematica === 1 || x.PuntajeProblematica === 2).length },
                        { gravedad: 'Sin riesgo', TotalSN: chart.filter(x => x.PuntajeProblematica <= 0).length }];

                        let chartInfoTable = [
                        //{ gravedad: 'Muy alto riesgo', Total: chart.filter(x => x.PuntajeProblematica === 7).length },
                        { gravedad: 'Alto riesgo', Total: chart.filter(x => x.PuntajeProblematica > 4).length },
                        //{ gravedad: 'Riesgo evidente', Total: chart.filter(x => x.PuntajeProblematica === 5).length },
                            { gravedad: 'Riesgo', Total: chart.filter(x => x.PuntajeProblematica === 3 || x.PuntajeProblematica === 4).length },
                            { gravedad: 'Posible riesgo', Total: chart.filter(x => x.PuntajeProblematica === 1 || x.PuntajeProblematica === 2).length },
                        { gravedad: 'Sin riesgo', Total: chart.filter(x => x.PuntajeProblematica <= 0).length }];
                        let chartFraccionamientos = data.filter(x => {
                            return x.PuntajeProblematica >= 0;
                        }).map(x => {
                            return {
                                Fraccionamiento: x.Fraccionamiento,
                                IdFracc: x.IdFracc,
                                Puntaje: x.PuntajeProblematica
                            }
                        }).reduce((ar, obj) => {
                            let bool = false;
                            if (!ar) {
                                ar = [];
                            }
                            ar.forEach((a) => {
                                if (a.IdFracc === obj.IdFracc && a.Puntaje === obj.Puntaje && (obj.Puntaje === 1 || obj.Puntaje === 2) && (a.Puntaje === 1 || a.Puntaje === 2)) {
                                    a.counterPR++;
                                    a.counterR = 0;
                                    a.counterAR = 0;
                                    bool = true;
                                }
                                if (a.IdFracc === obj.IdFracc && a.Puntaje === obj.Puntaje && (obj.Puntaje === 3 || obj.Puntaje === 3) && (a.Puntaje === 4 || a.Puntaje === 4)) {
                                    a.counterPR = 0;
                                    a.counterR++;
                                    a.counterAR = 0;
                                    bool = true;
                                }
                                //if (a.Fraccionamiento === obj.Fraccionamiento && a.Puntaje === obj.Puntaje && obj.Puntaje === 5 && a.Puntaje === 5) {
                                //    a.counterPR = 0;
                                //    a.counterR = 0;
                                //    a.counterRE++;
                                //    a.counterAR = 0;
                                //    a.counterMAR = 0;
                                //    bool = true;
                                //}
                                if (a.IdFracc === obj.IdFracc && a.Puntaje === obj.Puntaje && obj.Puntaje > 4 && a.Puntaje > 4) {
                                    a.counterPR = 0;
                                    a.counterR = 0;
                                    a.counterAR++;
                                    bool = true;
                                }
                                //if (a.Fraccionamiento === obj.Fraccionamiento && a.Puntaje === obj.Puntaje && obj.Puntaje === 7 && a.Puntaje === 7) {
                                //    a.counterPR = 0;
                                //    a.counterR = 0;
                                //    a.counterRE = 0;
                                //    a.counterAR = 0;
                                //    a.counterMAR++;
                                //    bool = true;
                                //}
                            });
                            if (!bool) {
                                if (obj.Puntaje === 1 || obj.Puntaje === 2) {
                                    obj.counterPR = 1;
                                    obj.counterR = 0;
                                    //obj.counterRE = 0;
                                    obj.counterAR = 0;
                                    //obj.counterMAR = 0;
                                    ar.push(obj);
                                }
                                if (obj.Puntaje === 3 || obj.Puntaje === 4) {
                                    obj.counterPR = 0;
                                    obj.counterR = 1;
                                    //obj.counterRE = 0;
                                    obj.counterAR = 0;
                                    //obj.counterMAR = 0;
                                    ar.push(obj);
                                }
                                //if (obj.Puntaje === 5) {
                                //    obj.counterPR = 0;
                                //    obj.counterR = 0;
                                //    obj.counterRE = 1;
                                //    obj.counterAR = 0;
                                //    obj.counterMAR = 0;
                                //    ar.push(obj);
                                //}
                                if (obj.Puntaje > 4) {
                                    obj.counterPR = 0;
                                    obj.counterR = 0;
                                    //obj.counterRE = 0;
                                    obj.counterAR = 1;
                                    //obj.counterMAR = 0;
                                    ar.push(obj);
                                }
                                //if (obj.Puntaje === 7) {
                                //    obj.counterPR = 0;
                                //    obj.counterR = 0;
                                //    obj.counterRE = 0;
                                //    obj.counterAR = 0;
                                //    obj.counterMAR = 1;
                                //    ar.push(obj);
                                //}
                            }
                            return ar;
                        }, []).reduce((ar, obj) => {
                            let bool = false;
                            if (!ar) {
                                ar = [];
                            }
                            ar.forEach((a) => {
                                //if (a.IdFracc === obj.IdFracc && a.Puntaje !== obj.Puntaje) {
                                //    if (obj.Puntaje === 1 || obj.Puntaje === 2) {
                                //        a.counterPR = obj.counterPR
                                //    }
                                //    if (obj.Puntaje === 3 || obj.Puntaje === 4) {
                                //        a.counterR = obj.counterR
                                //    }
                                //    //if (obj.Puntaje === 5) {
                                //    //    a.counterRE = obj.counterRE
                                //    //}
                                //    if (obj.Puntaje > 4) {
                                //        a.counterAR = obj.counterAR
                                //    }
                                //    //if (obj.Puntaje === 7) {
                                //    //    a.counterMAR = obj.counterMAR
                                //    //}
                                //    bool = true;
                                //}
                                if (a.IdFracc === obj.IdFracc) {
                                    if (obj.Puntaje > 0) {
                                        switch (obj.Puntaje) {
                                            case 1:
                                            case 2:
                                                a.counterPR++;
                                                break;
                                            case 3:
                                            case 4:
                                                a.counterR++;
                                                break;
                                            default:
                                                a.counterAR++;
                                                break;
                                        }
                                    }
                                    bool = true;
                                } 

                            });
                            if (!bool) {
                                ar.push(obj);
                            }
                            return ar;
                        }, []).map(x => {
                            return {
                                Fraccionamiento: x.Fraccionamiento,
                                PosibleRiesgo: x.counterPR,
                                Riesgo: x.counterR,
                                //RiesgoEvidente: x.counterRE,
                                AltoRiesgo: x.counterAR,
                               // MuyAltoRiesgo: x.counterMAR
                            }
                        });


                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: data,
                            onRowPrepared: (e) => {
                                if (e.rowType === "data") {
                                    e.rowElement.css("background",
                                        e.data.PuntajeProblematica === 1 || e.data.PuntajeProblematica === 2 ? "#f1c40f" :
                                        e.data.PuntajeProblematica === 3 || e.data.PuntajeProblematica === 4 ? "#e67e22" :
                                        e.data.PuntajeProblematica > 4 ? "#e74c3c" : ''
                                    );
                                }
                            },
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
                            columns: columns,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: false,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true,
                                customizeExcelCell: function (options) {
                                    var gridCell = options.gridCell;
                                    if (!gridCell) {
                                        return;
                                    }

                                    if (gridCell.rowType === "data") {
                                        switch (gridCell.data.PuntajeProblematica) {
                                            case 1: options.backgroundColor = "#f1c40f"; break
                                            case 2: options.backgroundColor = "#f1c40f"; break
                                            case 3: options.backgroundColor = "#e67e22"; break
                                            case 4: options.backgroundColor = "#e67e22"; break
                                            case 5: options.backgroundColor = "#e74c3c"; break
                                            case 6: options.backgroundColor = "#e74c3c"; break
                                            case 7: options.backgroundColor = "#e74c3c"; break
                                        }
                                    }

                                },
                                fileName: "Reporte Predictivo_" + fecha,
                                allowExportSelectedData: false
                            }
                        }).dxDataGrid("instance");


                        //==================================
                        // charts info
                        //==================================
                        let dataGridchart = $("#datagroupContainerchart").dxDataGrid({
                            dataSource: chartInfoTable,
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
                                visible: true
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
                            columns: [
                                { caption: "Indicador", dataField: "gravedad", alignment: 'left' },
                                { caption: "Total", dataField: "Total", alignment: 'left' },
                            ],
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true,
                                fileName: "Problemáticas_encontradas_" + fecha,
                                allowExportSelectedData: false
                            }
                        }).dxDataGrid("instance");

                        let dataGridchartFracc = $("#datagroupContainerchartFracc").dxDataGrid({
                            dataSource: chartFraccionamientos,
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
                                visible: true
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
                            columns: [
                                { caption: "Fraccionamiento", dataField: "Fraccionamiento", alignment: 'left' },
                                { caption: "Posible Riesgo", dataField: "PosibleRiesgo", alignment: 'left' },
                                { caption: "Riesgo", dataField: "Riesgo", alignment: 'left' },
                                //{ caption: "Riesgo Evidente", dataField: "RiesgoEvidente", alignment: 'left' },
                                { caption: "Alto Riesgo", dataField: "AltoRiesgo", alignment: 'left' },
                                //{ caption: "Muy Alto Riesgo", dataField: "MuyAltoRiesgo", alignment: 'left' },
                            ],
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true,
                                fileName: "Fraccionamientos_en_riesgo_" + fecha,
                                allowExportSelectedData: false
                            }
                        }).dxDataGrid("instance");
                        let dxChart = $("#chart").dxChart({
                            dataSource: chartdata,
                            commonSeriesSettings: {
                                argumentField: "gravedad",
                                type: "bar",
                                ignoreEmptyPoints: true,
                                hoverMode: "allArgumentPoints",
                                selectionMode: "allArgumentPoints",
                                label: {
                                    visible: true,
                                    format: {
                                        type: "decimal",
                                    }
                                }
                            },
                            series: grafica,
                            title: "Total de problemáticas encontradas.",
                            legend: {
                                verticalAlignment: "bottom",
                                horizontalAlignment: "center"
                            },
                            "export": {
                                enabled: true
                            },
                            tooltip: {
                                enabled: true,
                                customizeTooltip: function (arg) {
                                }
                            },
                            zoomAndPan: {
                                argumentAxis: "both",  // or "zoom" | "pan" | "none"
                                valueAxis: "both"      // or "zoom" | "pan" | "none"
                            },
                            onPointClick: function (e) {
                                e.target.select();
                            }
                        });
                        let dxChartFracc = $("#chartFracc").dxChart({
                            dataSource: chartFraccionamientos,
                            commonSeriesSettings: {
                                argumentField: "Fraccionamiento",
                                type: "bar",
                                ignoreEmptyPoints: true,
                                hoverMode: "allArgumentPoints",
                                selectionMode: "allArgumentPoints",
                                label: {
                                    visible: true,
                                    format: {
                                        type: "decimal",
                                    }
                                }
                            },
                            series: graficaFracc,
                            title: "Fraccionamientos en riesgo.",
                            legend: {
                                verticalAlignment: "bottom",
                                horizontalAlignment: "center"
                            },
                            "export": {
                                enabled: true
                            },
                            tooltip: {
                                enabled: true,
                                customizeTooltip: function (arg) {
                                }
                            },
                            zoomAndPan: {
                                argumentAxis: "both",  // or "zoom" | "pan" | "none"
                                valueAxis: "both"      // or "zoom" | "pan" | "none"
                            },
                            argumentAxis: {
                                visualRange: [0, 20]
                            },
                            scrollBar: {
                                visible: true,
                                //...
                            },
                            onPointClick: function (e) {
                                e.target.select();
                            }
                        });
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none'
                        loadedGraf.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedGraf.style.display = 'none'
                        loadedTable.style.display = 'none';
                        break;
                }
            });

        }
        onSelect(): void {
            let model: any = Forms.getForm(PAGE_ID);
            let Fraccionamiento = global.filterFracc(model.Fraccionamientos)
            let Vocaciones = model.Vocaciones.ID;
            let Plaza = model.PlazaInicial.ID;
            let FechaInicial = model.FechaInicial;
            let FechaFinal = model.FechaFinal;
            let Cliente = model.Cliente != undefined ? model.Cliente.ID : null;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2';
            //console.log(model)
            let p: any = global.assign({
                PLAZA: Plaza,
                VOCACIONES: Vocaciones,
                FRACCIONAMIENTO: Fraccionamiento,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                CLIENTE: Cliente,
                SEGMENTO:segmento
            });
            if (p.FRACCIONAMIENTO === "" || p.FRACCIONAMIENTO === null || p.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            this.onSelectReport(p);
            Forms.updateFormElement(PAGE_ID, "Cliente", null);
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Reporte predictivo "}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelect} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>

                        <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                        <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                       {/* <ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 4, 4]} />*/}
                        <DatePicker id="FechaInicial" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        <DatePicker id="FechaFinal" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        <select.ClientesLotesSPV key={"Cliente"} label="Cliente" idForm={PAGE_ID} size={[12, 12, 6, 6]} required={true} />

                    </Column>

                </page.OptionSection>
            </Column>;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IConsultaReincidencias, {}> {
        constructor(props: IConsultaReincidencias) {
            super(props);
        };
        static defaultProps: IConsultaReincidencias = {
            data: createSuccessfulStoreObject([]),
        };
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]} style={{ background: '#fff' }}>
                <br />
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'inherit' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                </div>

            </Column>

                <div id="loadedDatagraf" style={{ display: 'none', background: '#fff' }}>
                    <Column size={[5, 5, 5, 5]} style={{ background: '#fff' }}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={"Tabla de problemáticas encontradas"}
                            level={1}
                            icon="icon-folder"
                            collapsed={false}>
                            <div id="loadedData" style={{ display: 'inherit', background: '#fff' }}>
                                <div id="datagroupContainerchart" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                            </div>

                        </page.OptionSection>
                    </Column>
                    <Column size={[7, 7, 7, 7]} style={{ background: '#fff' }}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={"Gráfica de problemáticas encontradas"}
                            level={1}
                            icon="icon-folder"
                            collapsed={false}>
                            <div id="loadedData" style={{ display: 'inherit', background: '#fff' }}>
                                <div id="chart" style={{ padding: '10px', background: '#fff' }}>
                                </div>
                            </div>
                        </page.OptionSection>
                    </Column>
                    <Column size={[5, 5, 5, 5]} style={{ background: '#fff' }}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={"Tabla de Fraccionamientos en riesgo"}
                            level={1}
                            icon="icon-folder"
                            collapsed={false}>
                            <div id="loadedData" style={{ display: 'inherit', background: '#fff' }}>
                                <div id="datagroupContainerchartFracc" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                            </div>
                        </page.OptionSection>
                    </Column>
                    <Column size={[7, 7, 7, 7]} style={{ background: '#fff' }}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={"Gráfica de Fraccionamientos en riesgo"}
                            level={1}
                            icon="icon-folder"
                            collapsed={false}>
                            <div id="loadedData" style={{ display: 'inherit', background: '#fff' }}>
                                <div id="chartFracc" style={{ padding: '10px', background: '#fff' }}>
                                </div>
                            </div>
                        </page.OptionSection>
                    </Column>

                </div>
            </div>
        }
    });
}