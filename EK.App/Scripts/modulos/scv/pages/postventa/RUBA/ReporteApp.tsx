

namespace EK.Modules.SCV.Pages.postventa.RUBA.ReporteApp {
    const PAGE_ID: string = "ReporteApp";
    const PAGE_PENDIENTE_RESULT_ID: string = "ReporteAppResult";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_PENDIENTE_RESULT_ID]);
    declare const Map: any;
    declare const ExcelJS: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;
    const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());

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
    interface IReporteApp extends page.IProps {
        plaza?: any;
        load?: any;
    };

    let Filtros: any = global.connect(class extends React.Component<IReporteApp, {}> {
        constructor(props: IReporteApp) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada;
            return retValue;
        };
        componentDidMount(): void {
            Forms.updateFormElement(PAGE_ID, "Origen", "Ambos");

        };
        componentWillReceiveProps(nextProps: IReporteApp, nextState: IReporteApp): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        }
        onSelectReport(params: any): void {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');

            const columns = [
                { caption: "Plaza", dataField: "Plaza", alignment: 'center' },
                { caption: "Folio", dataField: "Folio", alignment: 'center' },
                { caption: "Tipo Vivienda", dataField: "TipoVivienda", alignment: 'center' },
                { caption: "Fecha Reporte", dataField: "FechaCaptura", alignment: 'center' },
                { caption: "Fecha Termino", dataField: "FechaTermino", alignment: 'center' },
                { caption: "Estatus Reporte", dataField: "EstatusReporte", alignment: 'center' },
                { caption: "Calificación", dataField: "Calificacion", alignment: 'center' },
                {
                    caption: "Calificación estrellas", dataField: "Calificacion", alignment: 'center', allowExporting: false, encodeHtml: false, customizeText: (cellInfo) => {
                        let max = 5;
                        let calificado = cellInfo.value ? cellInfo.value : 0;
                        let nocalificado = max - calificado;
                        let stars = '';
                        if (calificado === 0 || calificado === '' || calificado === null || calificado === undefined)
                            return stars = ''
                        for (let i = 0; i < calificado; i++) {
                            stars += `<i class="fas fa-star" style="color:#F1C40F"></i>`;
                        }
                        for (let i = 0; i < nocalificado; i++) {
                            stars += `<i class="far fa-star"></i>`;
                        }
                        return stars;
                    } },
                { caption: "Origen", dataField: "Origen", alignment: 'center' },
            ];
            global.asyncPost("base/kontrol/reportesFallasConsulta/GetBP/GetReporteAppEstadistico/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data, PAGE_PENDIENTE_RESULT_ID)
                        let FromWeb = [...data.filter(x => x.Origen === 'Web')];
                        let FromApp = [...data.filter(x => x.Origen === 'App')];
                        let CountWep = FromWeb.length;
                        let CountApp = FromApp.length;

                        let TotalesApp = FromApp.reduce((ar, obj) => {
                            let bool = false;
                            if (!ar) {
                                ar = [];
                            }
                            ar.forEach((a) => {
                                if (a.EstatusReporte === obj.EstatusReporte && a.EstatusReporte === "NUEVO" && obj.EstatusReporte === "NUEVO") {
                                        a.countN++;
                                        a.countT = 0;
                                        a.countC = 0;
                                        bool = true;
                                }
                                if (a.EstatusReporte === obj.EstatusReporte && a.EstatusReporte == "TERMINADO" && obj.EstatusReporte === "TERMINADO") {
                                    a.countN = 0;
                                    a.countT++;
                                    a.countC = 0;
                                    bool = true;
                                }
                                if (a.EstatusReporte === obj.EstatusReporte && a.EstatusReporte == "CANCELADO" && obj.EstatusReporte === "CANCELADO") {
                                    a.countN = 0;
                                    a.countT = 0;
                                    a.countC++;
                                    bool = true;
                                }
                            });
                            if (!bool) {
                                if (obj.EstatusReporte === "NUEVO") {
                                    obj.countN = 1;
                                    obj.countT = 0;
                                    obj.countC = 0;
                                    ar.push(obj);
                                }
                                if (obj.EstatusReporte === "TERMINADO") {
                                    obj.countN = 0;
                                    obj.countT = 1;
                                    obj.countC = 0;
                                    ar.push(obj);
                                }
                                if (obj.EstatusReporte === "CANCELADO") {
                                    obj.countN = 0;
                                    obj.countT = 0;
                                    obj.countC = 1;
                                    ar.push(obj);
                                }
                               
                            }
                            return ar;
                        }, []).reduce((ar, obj) => {
                            let bool = false;
                            if (!ar) {
                                ar = [];
                            }
                            ar.forEach((a) => {
                                if (a.EstatusReporte !== obj.EstatusReporte) {
                                    if (obj.EstatusReporte === "NUEVO") {
                                        a.countN = obj.countN;
                                    }
                                    if (obj.EstatusReporte === "TERMINADO") {
                                        a.countT = obj.countT;
                                    }
                                    if (obj.EstatusReporte === "CANCELADO") {
                                        a.countC = obj.countC;
                                    }
                                    bool = true;
                                }
                            });
                            if (!bool) {
                                ar.push(obj);
                            }
                            return ar;
                        }, []).map((x) => {
                            return {
                                TotalAbiertos: x.countN||0,
                                TotalTerminados: x.countT||0,
                                TotalCancelados: x.countC||0
                            }
                        });
                        let TotalesWeb = FromWeb.reduce((ar, obj) => {
                            let bool = false;
                            if (!ar) {
                                ar = [];
                            }
                            ar.forEach((a) => {
                                if (a.EstatusReporte === obj.EstatusReporte && a.EstatusReporte === "NUEVO" && obj.EstatusReporte === "NUEVO") {
                                    a.countN++;
                                    a.countT = 0;
                                    a.countC = 0;
                                    bool = true;
                                }
                                if (a.EstatusReporte === obj.EstatusReporte && a.EstatusReporte == "TERMINADO" && obj.EstatusReporte === "TERMINADO") {
                                    a.countN = 0;
                                    a.countT++;
                                    a.countC = 0;
                                    bool = true;
                                }
                                if (a.EstatusReporte === obj.EstatusReporte && a.EstatusReporte == "CANCELADO" && obj.EstatusReporte === "CANCELADO") {
                                    a.countN = 0;
                                    a.countT = 0;
                                    a.countC++;
                                    bool = true;
                                }
                            });
                            if (!bool) {
                                if (obj.EstatusReporte === "NUEVO") {
                                    obj.countN = 1;
                                    ar.push(obj);
                                }
                                if (obj.EstatusReporte === "TERMINADO") {
                                    obj.countT = 1;
                                    ar.push(obj);
                                }
                                if (obj.EstatusReporte === "CANCELADO") {
                                    obj.countC = 1;
                                    ar.push(obj);
                                }

                            }
                            return ar;
                        }, []).reduce((ar, obj) => {
                            let bool = false;
                            if (!ar) {
                                ar = [];
                            }
                            ar.forEach((a) => {
                                if (a.EstatusReporte !== obj.EstatusReporte) {
                                    if (obj.EstatusReporte === "NUEVO") {
                                        a.countN = obj.countN;
                                    }
                                    if (obj.EstatusReporte === "TERMINADO") {
                                        a.countT = obj.countT;
                                    }
                                    if (obj.EstatusReporte === "CANCELADO") {
                                        a.countC = obj.countC;
                                    }
                                    bool = true;
                                }
                            });
                            if (!bool) {
                                ar.push(obj);
                            }
                            return ar;
                        }, []).map((x) => {
                            return {
                                TotalAbiertos: x.countN||0,
                                TotalTerminados: x.countT||0,
                                TotalCancelados: x.countC||0
                            }
                        });
                        let abiertos, terminados, cancelados;
                        let abiertosW, terminadosW, canceladosW;
                            console.log(TotalesApp.length)
                        if (TotalesApp.length === 0) {
                            abiertos = 0;
                            terminados = 0;
                            cancelados = 0;
                        } else {
                            abiertos =  TotalesApp[0].TotalAbiertos;
                            terminados =  TotalesApp[0].TotalTerminados ;
                            cancelados = TotalesApp[0].TotalCancelados ;
                        }
                        if (TotalesWeb.length === 0) {
                            abiertosW = 0;
                            terminadosW = 0;
                            canceladosW = 0;
                        } else {
                            abiertosW = TotalesWeb[0].TotalAbiertos;
                            terminadosW = TotalesWeb[0].TotalTerminados;
                            canceladosW = TotalesWeb[0].TotalCancelados;
                        }
                        let dataChartAndGrid = [{
                            Origen: "App", TotalTodos: CountApp,
                            TotalAbiertos: abiertos,
                            TotalTerminados: terminados,
                            TotalCancelados: cancelados
                        },
                            {
                                Origen: "Web", TotalTodos: CountWep,
                                TotalAbiertos: abiertosW,
                                TotalTerminados: terminadosW,
                                TotalCancelados: canceladosW
                            }]
                        let fecha = Date.now();
                        let Detalle = "Detalle";
                        let Resumen = "Resumen";
                        let grid = $("#tabPanel").dxTabPanel({
                            dataSource: [{
                                title: Detalle,
                                template: function () {
                                    return $("<div id='details'>").dxDataGrid({
                                        width: "100%",
                                        columns: columns,
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
                                
                            }, {
                                title: Resumen,
                                template: function () {
                                    return $("<div id='resume'>").dxDataGrid({
                                        width: "100%",
                                        columns: [
                                            { dataField: "Origen", caption: "Origen" },
                                            { dataField: "TotalTodos", caption: "Total Reportes" },
                                            { dataField: "TotalAbiertos", caption: "Total Abiertos" },
                                            { dataField: "TotalTerminados", caption: "Total Terminados" },
                                            { dataField: "TotalCancelados", caption: "Total Cancelados" }
                                        ],
                                        rowAlternationEnabled: true,
                                        dataSource: dataChartAndGrid
                                    });
                                }
                            }],
                            itemTitleTemplate: function (itemData, itemIndex, itemElement) {
                                itemElement.append("<span classNane='dx-tab-text'>" + itemData.title + "</span>");
                            },
                            deferRendering: false
                        });
                        //===================================
                        // Export
                        //===================================
                          $("#exportButton").dxButton({
                            text: "Exportar a excel",
                              icon: "xlsxfile",
                              type: "success",
                            onClick: function() {
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
                                if(gridCell.rowType === "header" || gridCell.rowType === "data") {
                                  if(excelCell.fullAddress.row % 2 === 0) {
                                    excelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "D3D3D3" }, bgColor: { argb: "D3D3D3" }};
                                  }
                                }
                              }

                              DevExpress.excelExporter.exportDataGrid({
                                worksheet: details,
                                component: dataGrid1,
                                topLeftCell: { row: 4, column: 2 },
                                customizeCell: function(options) {
                                  setAlternatingRowsBackground(options.gridCell, options.excelCell)
                                }
                              }).then(function() {
                                return DevExpress.excelExporter.exportDataGrid({
                                  worksheet: resume,
                                  component: dataGrid2,
                                  topLeftCell: { row: 4, column: 2 },
                                  customizeCell: function(options) {
                                    setAlternatingRowsBackground(options.gridCell, options.excelCell)
                                  }
                                });
                              }).then(function() {
                                  workbook.xlsx.writeBuffer().then(function(buffer) {
                                      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ReporteApp_"+fecha+".xlsx");
                                  });
                              });
                            }
                          });
                        //=================================
                        //  CHART
                        //=================================
                        let grafica = $("#pie").dxPieChart({
                            palette: "Material",
                            dataSource: dataChartAndGrid,
                            title: "Utilización de la aplicación",
                            legend: {
                                orientation: "horizontal",
                                itemTextPosition: "right",
                                horizontalAlignment: "center",
                                verticalAlignment: "bottom",
                                columnCount: 4
                            },
                            "export": {
                                enabled: true
                            },
                            series: [{
                                argumentField: "Origen",
                                valueField: "TotalTodos",
                                label: {
                                    visible: true,
                                    font: {
                                        size: 16
                                    },
                                    connector: {
                                        visible: true,
                                        width: 0.5
                                    },
                                    position: "columns",
                                    customizeText: function (arg) {
                                        return `# Folios: ${arg.valueText}\n Uso:${arg.percentText}`
                                    }
                                }
                            }]
                        });
                        let barchart = $("#chart").dxChart({
                            dataSource: dataChartAndGrid,
                            commonSeriesSettings: {
                                argumentField: "Origen",
                                type: "bar",
                                hoverMode: "allArgumentPoints",
                                selectionMode: "allArgumentPoints",
                                label: {
                                    visible: true,
                                    format: {
                                        type: "fixedPoint",
                                        precision: 0
                                    }
                                }
                            },
                            series: [
                                { valueField: "TotalTodos", name: "Total Reportes" },
                                { valueField: "TotalAbiertos", name: "Total Abiertos" },
                                { valueField: "TotalTerminados", name: "Total Terminados" },
                                { valueField: "TotalCancelados", name: "Total Cancelados" }
                            ],
                            title: "Detalle",
                            legend: {
                                verticalAlignment: "bottom",
                                horizontalAlignment: "center"
                            },
                            "export": {
                                enabled: true
                            },
                            onPointClick: function (e) {
                                e.target.select();
                            }
                        });
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        break;
                }
            });

        }
        onSelect(): void {
            let model: any = Forms.getForm(PAGE_ID);
            let Plaza = model.PlazaInicial.ID;
            let Vocaciones = uppercaseWords(model.Vocaciones.Nombre.toLowerCase());
            if (Vocaciones === "Vivienda Residencial") {
                Vocaciones = "Residencial"
            }
            if (Vocaciones === 'Todos') {
                Vocaciones = '-2'
            }
            let Fraccionamiento = global.filterFracc(model.Fraccionamientos)
            let FechaInicial = model.FechaInicial;
            let FechaFinal = model.FechaFinal;
            let Origen = model.Origen;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'

            let p: any = global.assign({
                PLAZA: Plaza,
                VOCACIONES: Vocaciones,
                FRACCIONAMIENTO: Fraccionamiento,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                ORIGEN: Origen,
                SEGMENTO: segmento
            });
            if (p.FRACCIONAMIENTO === "" || p.FRACCIONAMIENTO === null || p.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            this.onSelectReport(p);
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Consulta de Reporte App"}
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

                        {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 4, 4]} />*/}
                        <Column size={[12, 12, 12, 12]} style={{ padding: 0, paddingTop: 8 }}>
                            <Column size={[12, 12, 6, 6]} >
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={<span>Origen</span>}
                                    icon="fa fa-map-marker" level={1} collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                            <RadioButton id="Web" label="Web" value="WEB" idForm={PAGE_ID} groupName="Origen" size={[12, 12, 4, 4]} />
                                            <RadioButton id="App" label="App" value="APP" idForm={PAGE_ID} groupName="Origen" size={[12, 12, 4, 4]} />
                                            <RadioButton id="Ambos" label="Ambos" value="AMBOS" idForm={PAGE_ID} groupName="Origen" size={[12, 12, 4, 4]} />
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 6, 6]} >
                                <DatePicker id="FechaInicial" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                                <DatePicker id="FechaFinal" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                            </Column>
                        </Column>
                    </Column>
                </page.OptionSection>
            </Column>;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IReporteApp, {}> {
        constructor(props: IReporteApp) {
            super(props);
        };
        static defaultProps: IReporteApp = {
            data: createSuccessfulStoreObject([]),
        };
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]} style={{ background: '#fff' }}>
                <br />
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'none' }}>
                    <div className="demo-container">
                        <div id="exportContainer">
                            <div id="exportButton"></div>
                        </div>
                        <div id="tabPanel"></div>
                    </div>
                    {/*<div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>*/}
                    <Column size={[12, 12, 6, 6]} style={{ background: '#fff' }}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={""}
                            level={1}
                            icon="icon-folder"
                            collapsed={false}>
                            <div id="loadedData" style={{ display: 'inherit', background: '#fff' }}>
                                <div className="demo-container">
                                    <div id="pie"></div>
                                </div>
                            </div>
                        </page.OptionSection>
                    </Column>
                    <Column size={[12, 12, 6, 6]} style={{ background: '#fff' }}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={""}
                            level={1}
                            icon="icon-folder"
                            collapsed={false}>
                            <div id="loadedData" style={{ display: 'inherit', background: '#fff' }}>
                                <div className="demo-container">
                                    <div id="chart"></div>
                                </div>
                            </div>
                        </page.OptionSection>
                    </Column>
                    
                </div>

            </Column>
            </div>
        }
    });
}