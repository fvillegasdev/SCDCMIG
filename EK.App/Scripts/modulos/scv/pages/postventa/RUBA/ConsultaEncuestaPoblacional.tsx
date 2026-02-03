namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEncuestaPoblacional {
    "use strict";
    const PAGE_ID = "ConsultaEncuestaPoblacional";
    const FORMCHILD = "CHILDREN";
    const TotalEncuestaYFracc = "TotalEncuestaYFracc";
    declare const ExcelJS: any;
    declare const Set: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;
    let escapeRegExp = (text: string) => {
        return text.replace(/[¿.*+\-?^${}()|[\]\\]/g, '\$&'); // $& significa toda la cadena coincidente
    }
    let quitarAcentos = (cadena) => {
        const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
        return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
    }
    let formatoRows = (numberRow: number, NumberCell: number, data: string, colorLetra: string, colorCell: any, aligVertical: string, aligHorizontal: string, bold: boolean,
        ws: any) => {
        let row = ws.getRow(numberRow);
        row.getCell(NumberCell).value = data;
        row.getCell(NumberCell).fill = {//formato negro letras blancas alinedo centro
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: colorCell }
        }
        row.getCell(NumberCell).font = { color: { argb: colorLetra }, bold: bold };
        row.getCell(NumberCell).alignment = { vertical: aligVertical, horizontal: aligHorizontal };
        row.getCell(NumberCell).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    }
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [TotalEncuestaYFracc]);

    interface IEncuestaPoblacional extends page.IProps {
        modeEdit?: any,
        fraccionamientoSel: any,
        onViewChart: (Pregunta: any) => {}
        plaza?: any;
    };

    export let Vista = global.connect(class extends React.Component<IEncuestaPoblacional, {}> {
        constructor(props: IEncuestaPoblacional) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            retValue.plaza = state.global.Plaza_Seleccionada;
            return retValue;
        };

        componentWillReceiveProps(nextProps: IEncuestaPoblacional): void {
            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        }
        onSelect() {
            let model: any = Forms.getForm(PAGE_ID)
            let Plaza = model.PlazaInicial.ID;
            let TipoEncuesta = model.TipoEncuesta.ID;
            let Fraccionamiento = global.filterFracc(model.Fraccionamientos);
            let FechaInicial = model.FechaInicial;
            let FechaFinal = model.FechaFinal;
            let TipoClasificacion = model.TipoClasificacion.ID

            let parametros = global.assign({
                PLAZA: Plaza,
                TIPOENCUESTA: TipoEncuesta,
                FRACCIONAMIENTO: Fraccionamiento,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                TIPOCLASIFICACION: TipoClasificacion
            })
            if (parametros.FRACCIONAMIENTO === "" || parametros.FRACCIONAMIENTO === null || parametros.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            let chart = document.getElementById('chart');
            const columns = [
                { caption: "Tipo Clasificación", dataField: "TipoClasificacion", alignment: 'left' },
                { caption: "Opciones", dataField: "Opciones", alignment: 'left' },
                { caption: "# Respuestas", dataField: "Respuestas", alignment: 'center' },
                { caption: "Id Tipo Encuesta", dataField: "IdTipoEncuesta", alignment: 'right' },
                { caption: "Tipo Encuesta", dataField: "TipoEncuesta", alignment: 'center', groupIndex: 0, },
            ];
            global.asyncPost("base/kontrol/EncuestaPoblacional/GetBP/GetConsulta/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        global.dispatchAsyncPost("load::ENCUESTADETALLE", "base/kontrol/EncuestaPoblacional/GetBP/EncuestaDetalle/", { parametros: parametros });
                        loader.style.display = 'none';
                        chart.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data, PAGE_ID);
                        let fecha = Date.now();
                        var toolTip = $("#tooltip").dxTooltip({
                        }).dxTooltip("instance");
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            onRowPrepared: function (event) {
                                if (event.rowType == 'data') {
                                    event.rowElement.mousemove(function () {
                                        $('#tooltipText').text("Doble click para ver gráfica");
                                        toolTip.show(event.rowElement);
                                    })
                                }
                                $(event.rowElement).on('dblclick', function () {
                                    dispatchSuccessful("load::forDelete", event.data, PAGE_ID);
                                    onViewChart(event.data);
                                }).on('remove', function () {
                                    //on remove event in jquery ui libraries or 
                                    $(this).off('dblclick remove');
                                })
                            },
                            dataSource: data,
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
                                visible: true
                            },
                            columns: columns,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true,
                                fileName: "Consulta Encuesta Poblacional " + fecha,
                                allowExportSelectedData: false
                            },
                            onExporting: function (e) {
                                createExcel()
                                e.cancel = true;
                                //for (const d of data) {
                                //    d.TipoClasificacion = escapeRegExp(d.TipoClasificacion);
                                //    d.Opciones = escapeRegExp(d.Opciones)
                                //    d.TipoEncuesta = escapeRegExp(d.TipoEncuesta)
                                //}
                                //e.cancel = false;
                            },
                        }).dxDataGrid("instance");

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

        onCancel() {
            Forms.reset(PAGE_ID);
        }
        componentDidMount(): any {
            Forms.updateFormElement(PAGE_ID, "TipoEncuesta", { ID: -2, Clave: "-2", Nombre: "TODOS" })
            Forms.updateFormElement(PAGE_ID, "TipoClasificacion", { ID: -2, Clave: "-2", Nombre: "TODOS" })
        };
        showNextActivities(seccion) {

        }
        render(): JSX.Element {
            let totales = 0;
            let encuestas = 0;
            let viviendas;
            let vocaciones;
            let enableButton = false;
            if (isSuccessful(EK.Store.getState().global.TotalEncuestaFracc)) {
                totales = getData(EK.Store.getState().global.TotalEncuestaFracc);
                encuestas = totales[0].ENCUESTAS;
                viviendas = totales[0].VIVIENDAS;
                vocaciones = totales[0].VOCACIONES;
            }
            let enable = false;
            let fracc;
            if (isSuccessful(this.props.fraccionamientoSel)) {
                fracc = this.props.fraccionamientoSel.data;
                if (fracc.ID !== -1) {
                    enable = true
                }
            }
            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";

            };
            let fecha = global.getToday();
            let className: string = "btn-editing";
            let color: string = "white";
            return <page.Main {...config} pageMode={PageMode.Personalizado}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Consulta encuesta poblacional"}
                    level={2}
                    icon="fas fa-poll-people"
                    collapsed={false}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelect} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row>
                        <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                            <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <ddl.TipoEncuesta id={"TipoEncuesta"} size={[12, 12, 4, 4]} label={"Tipo Encuesta"} selectAll={true} idFormSection={PAGE_ID} required={true} validations={[validations.required()]} />
                            <page.TagsFraccionamientosPlazaVV size={[12, 12, 5, 5]} id="Fraccionamientos" idForm={PAGE_ID} />

                            {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 5, 5]} />*/} 
                        </Column>
                        <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                            <DatePicker id="FechaInicial" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            <DatePicker id="FechaFinal" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            <ddl.TipoClasificacion id={"TipoClasificacion"} size={[12, 12, 4, 4]} label={"Tipo Clasificación"} selectAll={true} idFormSection={PAGE_ID} required={true} validations={[validations.required()]} />
                        </Column>
                    </Row>
                    <div ><Column size={[12, 12, 12, 12]}>
                        <br />
                        <div id="loading" style={{ display: 'none' }}>
                            <Updating text="" />
                        </div>

                        <div id="loadedData" style={{ display: 'inherit' }}>
                            <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                            <div className="demo-container">
                                <div id="chart"></div>
                            </div>
                            <div id="tooltip">
                                <p id="tooltipText"></p>
                            </div>
                        </div>
                    </Column></div>
                </page.OptionSection>
            </page.Main>;
        };
    });
    let onViewChart = (items) => {
        let charts = document.getElementById('chart');
        let data = EK.Store.getState().global.catalogo$ConsultaEncuestaPoblacional.data;
        let PreguntasOpciones = data.filter(x => x.TipoClasificacion === items.TipoClasificacion && x.IdTipoEncuesta === items.IdTipoEncuesta).map(x => ({ arg: x.Opciones, val: x.Respuestas }));
        charts.style.display = 'block';


        console.log(PreguntasOpciones[0].TipoClasificacion, PreguntasOpciones)
        let name = PreguntasOpciones[0].TipoClasificacion

        let chart = $('#chart').dxChart({
            dataSource: PreguntasOpciones,
            legend: {
                visible: false,
            },
            series: {
                type: 'bar',
            },
            argumentAxis: {
                tickInterval: 1,
                label: {
                    format: {
                        type: 'decimal',
                    },
                },
            },
            export: {
                enabled: true
            },
            scrollBar: {
                visible: false,
                //...
            },
            title: items.TipoClasificacion,
        });
        let chartV = document.getElementById('chart');
        chartV.style.display = 'inherit';
    }


    let createExcel = () => {

        let encuestas = EK.Store.getState().global.ENCUESTADETALLE.data;

        let groupData = encuestas.reduce((acc, item) => {
            let index = acc.findIndex(
                (el) => el.folio_enc === item.folio_enc && el.pregunta === item.pregunta
            );

            if (index >= 0) {
                acc[index].data.push({ respuesta: item.respuesta });
            } else {
                acc.push({
                    folio_enc: item.folio_enc,
                    pregunta: item.pregunta,
                    order: item.Order,
                    data: [{ respuesta: item.respuesta }],
                });
            }

            return acc;
        }, []);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Encuestas');

        // Agrupar la data por folio_enc
        const groupedData = groupData.reduce((acc, curr) => {
            if (!acc[curr.folio_enc]) {
                acc[curr.folio_enc] = [];
            }
            acc[curr.folio_enc].push(curr);
            return acc;
        }, {});

        // Procesar y agregar datos al archivo de Excel
        let rowIndex = 2;
        const headers = [];
        const seen = {}; // objeto para almacenar las encuestas que ya hemos procesado
        for (const folio_enc in groupedData) {
            if (!seen[folio_enc]) { // solo procesar las encuestas que no hemos visto antes
                seen[folio_enc] = true; //  marcar la encuesta como procesada
                groupedData[folio_enc].sort((a, b) => a.order - b.order);
                groupedData[folio_enc].forEach(item => {
                    item.data.forEach((respuesta, index) => {
                        const headerKey = `${item.pregunta}_${index + 1}`;
                        let headerIndex = -1;
                        for (let i = 0; i < headers.length; i++) {
                            if (headers[i].key === headerKey) {
                                headerIndex = i;
                                break;
                            }
                        }

                        if (headerIndex === -1) {
                            headers.push({ key: headerKey, order: item.order });
                        }
                    });
                });
            }
        }

        // Ordenar las cabeceras según el orden de las preguntas
        headers.sort((a, b) => a.order - b.order);

        // Escribir las cabeceras
        headers.unshift({ key: 'NoEncuesta', order: 0 });
    
        headers.forEach((header, index) => {
            worksheet.getRow(1).getCell(index + 1).value = header.key;
        });

        // Rellenar las celdas de respuesta con los datos de las encuestas
        for (const folio_enc in groupedData) {
            const row = new Array(headers.length);
            for (let i = 0; i < row.length; i++) {
                row[i] = '';
            }
            row[0] = folio_enc;
            groupedData[folio_enc].forEach(item => {
                item.data.forEach((respuesta, index) => {
                    const headerKey = `${item.pregunta}_${index + 1}`;
                    let headerIndex = -1;
                    for (let i = 0; i < headers.length; i++) {
                        if (headers[i].key === headerKey) {
                            headerIndex = i;
                            break;
                        }
                    }
                    row[headerIndex] = respuesta.respuesta;
                });
            });
            worksheet.addRow(row);
            rowIndex++;

            delete groupedData[folio_enc]; 
        }

        // Rellenar las celdas de respuesta con los datos de las encuestas
        for (const folio_enc in groupedData) {
            const row = new Array(headers.length);
            for (let i = 0; i < row.length; i++) {
                row[i] = '';
            }
            row[0] = folio_enc;
            groupedData[folio_enc].forEach(item => {
                const singleIndexOrders = [9, 10, 15, 16, 17];
                const isSingleIndex = singleIndexOrders.indexOf(item.order) !== -1;
                item.data.forEach((respuesta, index) => {
                    const headerKey = isSingleIndex
                        ? `${item.pregunta}`
                        : `${item.pregunta}_${index + 1}`;
                    let headerIndex = -1;
                    for (let i = 0; i < headers.length; i++) {
                        if (headers[i].key === headerKey) {
                            headerIndex = i;
                            break;
                        }
                    }
                    row[headerIndex] = respuesta.respuesta;
                });
            });
            worksheet.addRow(row);
            rowIndex++;
        }

        // Establecer formato de celdas
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, cellNumber) => {
                if (rowNumber === 1) {
                    cell.font = { bold: true };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                }

                // Aplicar borde a todas las celdas excepto la primera columna
                if (cellNumber > 1) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };

                    // Alternar el color de fondo de las columnas, incluidas las cabeceras
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: cellNumber % 2 === 0 ? 'FFF2F2F2' : 'FFD9D9D9' }
                    };
                }
            });
        });

        // Ajustar ancho de columna y reajustamos los nombres de los headers para cuando sean multiples preguntes aparezca el numero
            headers.forEach((header, index) => {
            if (header.order !== 9 && header.order !== 10
                //&& header.order !== 15
                && header.order !== 16
                && header.order !== 17)
            {
                let pregunta = header.key.split('_');
                header.key = pregunta[0];
            }
        })
        headers.forEach((header, index) => {
            worksheet.getRow(1).getCell(index + 1).value = header.key;
        });
        worksheet.columns = headers.map(header => ({ key: header, width: 35 }));

        // Guardar
        workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ReporteEncuestaPoblacional.xlsx');
        });
    }

};