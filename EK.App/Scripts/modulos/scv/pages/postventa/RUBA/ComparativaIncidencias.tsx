

namespace EK.Modules.SCV.Pages.postventa.RUBA.ComparativaIncidencias {
    const PAGE_ID: string = "ComparativaIncidencias";
    const PAGE_PENDIENTE_RESULT_ID: string = "ComparativaIncidenciasResult";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_PENDIENTE_RESULT_ID]);
    declare const ExcelJS: any;
    declare const Set: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;

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
    const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());

    let quitarAcentos = (text: any) => {
        return text.normalize('NFD')
            .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
            .normalize();
    }
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
    interface IConsultaComparativaIncidencias extends page.IProps {
        plaza?: any;
        load?: any;
        Opciones?: any;
    };

    let Filtros: any = global.connect(class extends React.Component<IConsultaComparativaIncidencias, {}> {
        constructor(props: IConsultaComparativaIncidencias) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
        };
        static props: any = (state: any) => ({
            plaza: state.global.Plaza_Seleccionada,
            Opciones: Forms.getDataValue("Opciones", PAGE_ID, state)
        });

        componentDidMount(): void {
            Forms.updateFormElement(PAGE_ID, "Opciones", "ViviendasFirmadas");
            this.changeRange("F")
            global.dispatchSuccessful("global-page-entity", {}, PAGE_PENDIENTE_RESULT_ID);
        }
        componentWillReceiveProps(nextProps: IConsultaComparativaIncidencias, nextState: IConsultaComparativaIncidencias): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        }
        onSelect(): void {
            let model: any = Forms.getForm(PAGE_ID);
            let Fraccionamiento = global.filterFracc(model.Fraccionamientos)
            let Vocaciones = uppercaseWords(model.Vocacion.Nombre.toLowerCase());
            if (Vocaciones === "Vivienda Residencial") {
                Vocaciones = "Residencial"
            }
            if (Vocaciones === 'Todos') {
                Vocaciones = '-2'
            }
            let Plaza = model.PlazaInicial.ID;
            let Contratista = model.Contratista.ID;
            // * Periodo A
            let FechaInicialA = model.FechaInicialA;
            let FechaFinalA = model.FechaFinalA;
            let FechaInicialINA = model.FechaInicialINA;
            let FechaFinalINA = model.FechaFinalINA;
            // * Periodo B
            let FechaInicialB = model.FechaInicialB;
            let FechaFinalB = model.FechaFinalB;
            let FechaInicialINB = model.FechaInicialINB;
            let FechaFinalINB = model.FechaFinalINB;
            let Opciones = model.Opciones;

            let p: any = global.assign({
                PLAZA: Plaza,
                VOCACIONES: Vocaciones,
                FRACCIONAMIENTO: Fraccionamiento,
                FECHAINICIALA: FechaInicialA,
                FECHAFINALA: FechaFinalA,
                FECHAINICIALINA: FechaInicialINA,
                FECHAFINALINA: FechaFinalINA,
                FECHAINICIALB: FechaInicialB,
                FECHAFINALB: FechaFinalB,
                FECHAINICIALINB: FechaInicialINB,
                FECHAFINALINB: FechaFinalINB,
                CONTRATISTA: Contratista
            });
            //console.log(p)
            if (p.FRACCIONAMIENTO === "" || p.FRACCIONAMIENTO === null || p.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            (Opciones == "ViviendasFirmadas") ? this.onSelectReportFirmadas(p) : this.onSelectReportEntregadas(p)
        }
        Columns(opcion: string) {
            const Columns = [
                { caption: "Plaza", dataField: "IdPlaza" },
                { caption: "Desc. Plaza", dataField: "Plaza" },
                { caption: "Familia", dataField: "Familia" },
                { caption: "Año de Inicio", dataField: "AnioInicial" },
                { caption: "% Año de Inicio", dataField: "PorcentajePeriodoInicial" },
                { caption: "Año de Término", dataField: "AnioFin" },
                { caption: "% Año de Término", dataField: "PorcentajePeriodoFinal" },
                { caption: "Total Periodo Inicial", dataField: "TotalPeriodoInicialA" },
                { caption: "Total Periodo Final", dataField: "TotalPeriodoFinA" },
                { caption: "Acumulado del Periodo Inicial", dataField: "AcumuladoPeriodoInicial" },
                { caption: "Acumulado del Periodo Final", dataField: "AcumuladoPeriodoFin" },
                { caption: "Suma por Plaza Inicial", dataField: "TotalPeriodoInicialB" },
                { caption: "Suma por Plaza Final", dataField: "TotalPeriodoFinB" },
            ]
            if (opcion === "E")
                Columns.push({ caption: "Sscta Tras", dataField: "sscta_tras" })
            return Columns;
        }
        onSelectReportFirmadas(params: any): void {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            const Columns = this.Columns("F")

            global.asyncPost("base/kontrol/reportesFallasConsulta/GetBP/GetReporteComparativaIncidenciasFirmadas/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-current-entity', data)
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
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
                            groupPanel: {
                                visible: true
                            },
                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [10, 15, 25],
                                showInfo: true
                            },
                            columns: Columns,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true
                            },
                            onExporting: function (e) {
                                createExcel();
                                e.cancel = true;
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
        onSelectReportEntregadas(params: any): void {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            const Columns = this.Columns("E")
            console.log(params)
            global.asyncPost("base/kontrol/reportesFallasConsulta/GetBP/GetReporteComparativaIncidenciasEntregadas/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        console.log(data)
                        dispatchSuccessful('global-current-entity', data)
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
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
                            groupPanel: {
                                visible: true
                            },
                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [10, 15, 25],
                                showInfo: true
                            },
                            columns: Columns,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true
                            },
                            onExporting: function (e) {
                                createExcel();
                                e.cancel = true;
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
        changeRange(range) {
            let F = document.getElementById('rangeF');
            let E = document.getElementById('rangeE');
            let BF = document.getElementById('rangeBF');
            let BE = document.getElementById('rangeBE');
            if (range === "F") {
                F.style.display = 'block';
                E.style.display = 'none';
                BF.style.display = 'block';
                BE.style.display = 'none';
            } else {
                E.style.display = 'block';
                F.style.display = 'none';
                BE.style.display = 'block';
                BF.style.display = 'none';
            }
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";

            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Consulta Comparativa de Incidencias "}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelect} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Column size={[3, 3, 3, 3]} style={{ padding: '10px' }}>
                        <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                        <ddl.VocacionesFilterDDL id="Vocacion" idForm={PAGE_ID} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                        <page.TagsFraccionamientosPlazaVV size={[12, 12, 12, 12]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                        {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 12, 12]} />*/}
                        <consultas.SPVContratistasConsulta id="Contratista" idForm={PAGE_ID} size={[12, 12, 12, 12]} selectAll={true} required={true} validations={[validations.required()]} />
                        <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                            <RadioButton id="ViviendasFirmadas" label="Viviendas Firmadas" value="Firmadas" idForm={PAGE_ID} groupName="Opciones" size={[12, 12, 6, 6]} change={() => this.changeRange("F")} />
                            <RadioButton id="ViviendasEntregadas" label="Viviendas Entregadas" value="Entregadas" idForm={PAGE_ID} groupName="Opciones" size={[12, 12, 6, 6]} change={() => this.changeRange("E")} />
                        </Column>
                    </Column>
                    <Column size={[9, 9, 9, 9]} style={{ padding: '10px' }}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={<span>Rango de Fechas <strong>A</strong></span>}
                            level={1}
                            icon="icon-calendar"
                            collapsed={false}>
                            <div id="rangeF" style={{ display: 'none' }}>
                                <DatePicker id="FechaInicialA" label="Fecha Inicial Firma" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 2, 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                <DatePicker id="FechaFinalA" label={"Fecha Final Firma"} type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 2, 11, 31)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            </div>
                            <div id="rangeE" style={{ display: 'none' }}>
                                <DatePicker id="FechaInicialA" label="Fecha Inicial Entrega" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 2, 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                <DatePicker id="FechaFinalA" label={"Fecha Final Entrega"} type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 2, 11, 31)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            </div>
                            <DatePicker id="FechaInicialINA" label="Fecha Inicial  Incidencia" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 2, 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            <DatePicker id="FechaFinalINA" label="Fecha Final Incidencia" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 2, 11, 31)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        </page.OptionSection>
                    </Column>
                    <Column size={[9, 9, 9, 9]} style={{ padding: '10px' }}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={<span>Rango de Fechas <strong>B</strong></span>}
                            level={1}
                            icon="icon-calendar"
                            collapsed={false}>
                            <div id="rangeBF" style={{ display: 'none' }}>
                                <DatePicker id="FechaInicialB" label="Fecha Inicial Firma" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 1, 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                <DatePicker id="FechaFinalB" label={"Fecha Final Firma"} type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 1, 11, 31)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            </div>
                            <div id="rangeBE" style={{ display: 'none' }}>
                                <DatePicker id="FechaInicialB" label="Fecha Inicial Entrega" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 1, 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                <DatePicker id="FechaFinalB" label={"Fecha Final Entrega"} type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 1, 11, 31)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            </div>
                            <DatePicker id="FechaInicialINB" label="Fecha Inicial  Incidencia" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 1, 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            <DatePicker id="FechaFinalINB" label="Fecha Final Incidencia" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear() - 1, 11, 31)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        </page.OptionSection>

                    </Column>
                </page.OptionSection>
            </Column>;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IConsultaComparativaIncidencias, {}> {
        constructor(props: IConsultaComparativaIncidencias) {
            super(props);
        };
        static defaultProps: IConsultaComparativaIncidencias = {
            data: createSuccessfulStoreObject([]),
        };
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]} style={{ background: '#fff' }}>
                <br />
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'inherit' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                    </div>
                </div>

            </Column>
            </div>
        }
    });
    let createExcel = () => {
        let entity = EK.Store.getState().global.currentEntity;
        let data = getData(entity);
        let dateInit = Forms.getValue("FechaInicialINA", PAGE_ID);
        let opcion = Forms.getValue("Opciones", PAGE_ID);
        let dateEnd = Forms.getValue("FechaFinalINA", PAGE_ID);
        let dateYearEnd = Forms.getValue("FechaFinalINB", PAGE_ID)
        //Periodo Meses
        const dateA = new Date(dateInit);
        const dateB = new Date(dateEnd);
        const dateYB = new Date(dateYearEnd);
        const monthInit = dateA.toLocaleString('es-MX', { month: 'long' });
        const monthEnd = dateB.toLocaleString('es-MX', { month: 'long' });
        const anioInit = dateA.getFullYear()
        const anioEnd = dateYB.getFullYear()
        let columnasPlaza = 0;
        let todasPlazas: boolean = false;

        //console.log(data)
        //obtenemos las plazas, con la data de la busqueda.
        let Plazas = data.reduce((ar, obj) => {
            let bool = false;
            if (!ar) {
                ar = [];
            }
            ar.forEach((a) => {
                if (a.Plaza === obj.Plaza) {
                    bool = true;
                }
            });
            if (!bool) {
                obj.count = 1;
                ar.push(obj);
            }
            return ar;
        }, []).map(x => {
           // console.log(x)
            return {
                Plazas: x.Plaza,
                CantViviendas: [x.TotalPeriodoInicialA, x.TotalPeriodoFinA],
                Periodo: [anioInit, anioEnd],
                Sumatoria: [
                    x.TotalPeriodoInicialB, x.TotalPeriodoInicialA !== 0 ? (x.TotalPeriodoInicialB / x.TotalPeriodoInicialA * 100).toFixed(2) : 0, x.TotalPeriodoFinB, x.TotalPeriodoFinA !== 0 ? (x.TotalPeriodoFinB / x.TotalPeriodoFinA * 100).toFixed(2) : 0
                ],
                TotalIncidenciasInicial: x.TotalPeriodoInicialB,
                TotalIncidenciasFin: x.TotalPeriodoFinB,
                TotalIncidenciasPlazaIni: x.TotalIncidenciasPlazaA,
                TotalIncidenciasPlazaFin: x.TotalIncidenciasPlazaB,
                Contratista: x.ContratistaSel,
                TotalEntregasPlazaIni: x.total_ent_pza_ini,
                TotalEntregasPlazaFin: x.total_ent_pza_fin
            }
        });

        //console.log(Plazas);
        for (let p of Plazas) {
            let familias = data.filter(x => x.Plaza === p.Plazas);
            p.familia = familias; //creamos su objeto con las familias que tiene cada plaza

        }
        //Row  Familias
        let Familias = data.filter((e, i) => data.findIndex(a => a["Equivalencia"] === e["Equivalencia"]) === i).map(x => {
            return { Equivalencia: x.Equivalencia, Familia: x.Familia };
        });

        let acumuladoA = data.map(x => {
            return {
                AcumuladoPlaza: x.AcumuladoPeriodoInicial
            }
        })
        let acumuladoB = data.map(x => {
            return {
                AcumuladoPlaza: x.AcumuladoPeriodoFin
            }
        })
        ////si son todas las plazas agregamos el obj
        if (Plazas.length > 1) {
            todasPlazas = true;
            let sumaTodasPlazasInicial = Plazas.reduce((total, obj) => { return total + obj.TotalIncidenciasInicial }, 0);
            let sumaTodasPlazasFin = Plazas.reduce((total, obj) => { return total + obj.TotalIncidenciasFin }, 0);

            Plazas.unshift({
                Plazas: 'Todas las plazas',
                CantViviendas: [acumuladoA[0].AcumuladoPlaza, acumuladoB[0].AcumuladoPlaza],
                Periodo: [anioInit, anioEnd],
                Sumatoria: [sumaTodasPlazasInicial,
                    acumuladoA[0].AcumuladoPlaza !== 0 ? (sumaTodasPlazasInicial / acumuladoA[0].AcumuladoPlaza * 100).toFixed(2) : 0,
                    sumaTodasPlazasFin,
                    acumuladoB[0].AcumuladoPlaza !== 0 ? (sumaTodasPlazasFin / acumuladoB[0].AcumuladoPlaza * 100).toFixed(2) : 0
                ],
            })
        }

        let contratista = Plazas[0].Contratista;
        contratista !== 'N/A' ? contratista : '';
        //inicializamos y construimos el excel
        const workbook = new ExcelJS.Workbook();
        const ws = workbook.addWorksheet('Comparativa de Incidencias');
        //obtenemos las primeras 5 fils

        //obtenemos columns
        let column = ws.getColumn(1);
        column.width = 42; //Ancho de la primera columna

        // si son todas las plazas se convinas las celdas B1 a BNQ1, sino solo se convina B1:E1
        let columna = 0; //guia para el llenado de las celdas con las plazas
        if (todasPlazas) {
            columna = 2;
            //fila 1                    fila 2                          
            ws.mergeCells('B1:E1'); ws.mergeCells('B2:E2');
            ws.mergeCells('F1:I1'); ws.mergeCells('F2:I2');
            ws.mergeCells('J1:M1'); ws.mergeCells('J2:M2');
            ws.mergeCells('N1:Q1'); ws.mergeCells('N2:Q2');
            ws.mergeCells('R1:U1'); ws.mergeCells('R2:U2');
            ws.mergeCells('V1:Y1'); ws.mergeCells('V2:Y2');
            ws.mergeCells('Z1:AC1'); ws.mergeCells('Z2:AC2');
            ws.mergeCells('AD1:AG1'); ws.mergeCells('AD2:AG2');
            ws.mergeCells('AH1:AK1'); ws.mergeCells('AH2:AK2');
            ws.mergeCells('AL1:AO1'); ws.mergeCells('AL2:AO2');
            ws.mergeCells('AP1:AS1'); ws.mergeCells('AP2:AS2');
            ws.mergeCells('AT1:AW1'); ws.mergeCells('AT2:AW2');
            ws.mergeCells('AX1:BA1'); ws.mergeCells('AX2:BA2');
            ws.mergeCells('BB1:BE1'); ws.mergeCells('BB2:BE2');
            ws.mergeCells('BF1:BI1'); ws.mergeCells('BF2:BI2');
            ws.mergeCells('BJ1:BM1'); ws.mergeCells('BJ2:BM2');
            ws.mergeCells('BN1:BQ1'); ws.mergeCells('BN2:BQ2');

            //fila 3
            ws.mergeCells('B3:C3'); ws.mergeCells('D3:E3'); ws.mergeCells('F3:G3'); ws.mergeCells('H3:I3');
            ws.mergeCells('J3:K3'); ws.mergeCells('L3:M3'); ws.mergeCells('N3:O3'); ws.mergeCells('P3:Q3');
            ws.mergeCells('R3:S3'); ws.mergeCells('T3:U3'); ws.mergeCells('V3:W3'); ws.mergeCells('X3:Y3');
            ws.mergeCells('Z3:AA3'); ws.mergeCells('AB3:AC3'); ws.mergeCells('AD3:AE3'); ws.mergeCells('AF3:AG3');
            ws.mergeCells('AH3:AI3'); ws.mergeCells('AJ3:AK3'); ws.mergeCells('AL3:AM3'); ws.mergeCells('AN3:AO3');
            ws.mergeCells('AP3:AQ3'); ws.mergeCells('AR3:AS3'); ws.mergeCells('AT3:AU3'); ws.mergeCells('AV3:AW3');
            ws.mergeCells('AX3:AY3'); ws.mergeCells('AZ3:BA3'); ws.mergeCells('BB3:BC3'); ws.mergeCells('BD3:BE3');
            ws.mergeCells('BF3:BG3'); ws.mergeCells('BH3:BI3'); ws.mergeCells('BJ3:BK3'); ws.mergeCells('BL3:BM3');
            ws.mergeCells('BN3:BO3'); ws.mergeCells('BP3:BQ3');

            //FILA 4
            ws.mergeCells('B4:C4'); ws.mergeCells('D4:E4'); ws.mergeCells('F4:G4'); ws.mergeCells('H4:I4');
            ws.mergeCells('J4:K4'); ws.mergeCells('L4:M4'); ws.mergeCells('N4:O4'); ws.mergeCells('P4:Q4');
            ws.mergeCells('R4:S4'); ws.mergeCells('T4:U4'); ws.mergeCells('V4:W4'); ws.mergeCells('X4:Y4');
            ws.mergeCells('Z4:AA4'); ws.mergeCells('AB4:AC4'); ws.mergeCells('AD4:AE4'); ws.mergeCells('AF4:AG4');
            ws.mergeCells('AH4:AI4'); ws.mergeCells('AJ4:AK4'); ws.mergeCells('AL4:AM4'); ws.mergeCells('AN4:AO4');
            ws.mergeCells('AP4:AQ4'); ws.mergeCells('AR4:AS4'); ws.mergeCells('AT4:AU4'); ws.mergeCells('AV4:AW4');
            ws.mergeCells('AX4:AY4'); ws.mergeCells('AZ4:BA4'); ws.mergeCells('BB4:BC4'); ws.mergeCells('BD4:BE4');
            ws.mergeCells('BF4:BG4'); ws.mergeCells('BH4:BI4'); ws.mergeCells('BJ4:BK4'); ws.mergeCells('BL4:BM4');
            ws.mergeCells('BN4:BO4'); ws.mergeCells('BP4:BQ4');

        } else {
            if (contratista !== '' && opcion === "ViviendasEntregadas") {
                //FILA 1
                ws.mergeCells('B1:E1');
                //FILA 2
                ws.mergeCells('B2:E2');
                //FILA 3
                ws.mergeCells('B3:C3');
                ws.mergeCells('D3:E3');
                //FILA 4
                ws.mergeCells('B4:C4');
                ws.mergeCells('D4:E4');
                //FILA 5
                ws.mergeCells('B5:C5');
                ws.mergeCells('D5:E5');
                //FILA 6
                ws.mergeCells('B6:C6');
                ws.mergeCells('D6:E6');
            } else {
                //FILA 1
                ws.mergeCells('B1:E1');
                //FILA 2
                ws.mergeCells('B2:E2');
                //FILA 3
                ws.mergeCells('B3:C3');
                ws.mergeCells('D3:E3');
                //FILA 4
                ws.mergeCells('B4:C4');
                ws.mergeCells('D4:E4');
            }

        }

        //* construimos las primeras 5 linea Plazas, Rango Meses, Viviendas Fimadas, Año y sumatoria de incidencias
        //* Primera linea celda 1 Plazas
        formatoRows(1, 1, "PLAZA", 'FFFFFF', '000000', 'middle', 'center', true, ws)

        //* Segunda linea celda 1 Rango Meses
        formatoRows(2, 1, contratista, 'FFFFFF', '000000', 'middle', 'center', true, ws);
        //* Tercera linea celda 1 
        let FilasPrimeraColumna = [];
        let indexRow_Col1 = 0;
        if (contratista !== '' && opcion === "ViviendasEntregadas") {
            //formatoRows(3, 1, "VIVIENDAS ENTREGADAS PLAZA", 'FFFFFF', '000000', 'middle', 'right', true, ws)
            let OpcionText = opcion === "ViviendasFirmadas" ? 'FIRMADAS' : 'ENTREGADAS';
            FilasPrimeraColumna = [
                { row: 3, col: 1, text: "VIVIENDAS ENTREGADAS PLAZA", textColor: 'FFFFFF', bgColor: '000000', alignV: 'middle', alignH: 'right', bold: true },
                { row: 4, col: 1, text: "VIVIENDAS " + OpcionText + " DEL CONTRATISTA", textColor: 'FFFFFF', bgColor: '000000', alignV: 'middle', alignH: 'right', bold: true },
                { row: 5, col: 1, text: "TOTAL DE INCIDENCIAS PLAZA", textColor: 'FFFFFF', bgColor: '000000', alignV: 'middle', alignH: 'right', bold: true },
                { row: 6, col: 1, text: "FAMILIA                                                 AÑO", textColor: 'FFFFFF', bgColor: '000000', alignV: 'middle', alignH: 'left', bold: true },
                { row: 7, col: 1, text: "SUMATORIA DE INCIDENCIAS", textColor: 'FFFFFF', bgColor: '000000', alignV: 'middle', alignH: 'right', bold: true }
            ];
            indexRow_Col1 = 7;
        } else {
            let OpcionText = opcion === "ViviendasFirmadas" ? 'VIVIENDAS FIRMADAS' : 'VIVIENDAS ENTREGADAS';
            FilasPrimeraColumna = [
                { row: 3, col: 1, text: OpcionText, textColor: 'FFFFFF', bgColor: '000000', alignV: 'middle', alignH: 'right', bold: true },
                { row: 4, col: 1, text: "FAMILIA                                                 AÑO", textColor: 'FFFFFF', bgColor: '000000', alignV: 'middle', alignH: 'left', bold: true },
                { row: 5, col: 1, text: "SUMATORIA DE INCIDENCIAS", textColor: 'FFFFFF', bgColor: '000000', alignV: 'middle', alignH: 'right', bold: true }
            ];
            indexRow_Col1 = 5;
        }

        //====== COMENTADO TEMPORAL
        //(opcion === "ViviendasFirmadas") ? formatoRows(3, 1, "VIVIENDAS FIRMADAS", 'FFFFFF', '000000', 'middle', 'right', true, ws)
        //   : formatoRows(3, 1, "VIVIENDAS ENTREGADAS", 'FFFFFF', '000000', 'middle', 'right', true, ws)

        for (let r of FilasPrimeraColumna) {
            formatoRows(r.row, r.col, r.text, r.textColor, r.bgColor, r.alignV, r.alignH, r.bold, ws);
        }



        //* 4ta linea celda 1 se deja el espacio para abarcar la celda === COMENTADO TEMPORAL
        //formatoRows(4, 1, "FAMILIA                                                 AÑO", 'FFFFFF', '000000', 'middle', 'left', true, ws)

        //* 5ta linea ===COMENTADO TEMPORAL
        //formatoRows(5, 1, "SUMATORIA DE INCIDENCIAS", 'FFFFFF', '000000', 'middle', 'right', true, ws)

        //Rellenamos 6ta linea celda 1 con todas las familias el resto de las columnas
        Familias.forEach((elemento, i, ar) => {
            i += 1
            formatoRows(indexRow_Col1 + i, 1, elemento["Familia"].toLocaleUpperCase(), '000000', 'DEDEC6', 'middle', 'left', true, ws)
        });

        let columRow3 = 2;
        let columRow4 = 2;
        let columRow5 = 2;
        let columnRow6 = 2;
        let columnRow7 = 2;

        // llenamos las primeras 5 lineas
        for (let i = 0; i < Plazas.length; i++) {
            if (i === 0) { //si son todas las plazas las registra
                formatoRows(1, 2, Plazas[i].Plazas.toLocaleUpperCase(), 'FFFFFF', '000000', 'middle', 'center', true, ws)
                formatoRows(2, 2, monthInit.toLocaleUpperCase() + '-' + monthEnd.toLocaleUpperCase(), 'FFFFFF', '000000', 'middle', 'center', true, ws)

                if (contratista !== '' && opcion === "ViviendasEntregadas") {
                    let indexRow = 3;
                    formatoRows(3, columRow3, Plazas[i].TotalEntregasPlazaIni, '000000', 'DEDEC6', 'middle', 'center', true, ws)
                    formatoRows(3, columRow3 + 2, Plazas[i].TotalEntregasPlazaFin, '000000', 'DEDEC6', 'middle', 'center', true, ws)
                    columRow3 += 2;

                    for (let j = 0; j < Plazas[i].CantViviendas.length; j++) {
                        //console.log(Plazas[i].CantViviendas[j]);
                        (Plazas.length > 1) ? formatoRows(4, columRow4, Plazas[i].CantViviendas[j], '000000', '9CFF9C', 'middle', 'center', true, ws) :
                            formatoRows(4, columRow4, Plazas[i].CantViviendas[j], '000000', 'DEDEC6', 'middle', 'center', true, ws)
                        columRow4 += 2;
                    }

                    formatoRows(5, columRow5, Plazas[i].TotalIncidenciasPlazaIni, '000000', 'DEDEC6', 'middle', 'center', true, ws)
                    formatoRows(5, columRow5 + 2, Plazas[i].TotalIncidenciasPlazaFin, '000000', 'DEDEC6', 'middle', 'center', true, ws)
                    columRow5 += 2;

                    for (let k = 0; k < Plazas[i].Periodo.length; k++) {
                        formatoRows(6, columnRow6, Plazas[i].Periodo[k], 'FFFFFF', '000000', 'middle', 'center', true, ws)
                        columnRow6 += 2;
                    }

                    for (let l = 0; l < Plazas[i].Sumatoria.length; l++) {
                        formatoRows(7, columnRow7, Plazas[i].Sumatoria[l], 'FFFFFF', '000000', 'middle', 'center', true, ws)
                        columnRow7++;
                    }
                } else {
                    //* linea 3
                    for (let j = 0; j < Plazas[i].CantViviendas.length; j++) {
                        console.log(Plazas[i].CantViviendas[j]);
                        (Plazas.length > 1) ? formatoRows(3, columRow3, Plazas[i].CantViviendas[j], '000000', '9CFF9C', 'middle', 'center', true, ws) :
                            formatoRows(3, columRow3, Plazas[i].CantViviendas[j], '000000', 'DEDEC6', 'middle', 'center', true, ws)
                        columRow3 += 2;
                    }
                    //* linea 4
                    for (let k = 0; k < Plazas[i].Periodo.length; k++) {
                        formatoRows(4, columRow4, Plazas[i].Periodo[k], 'FFFFFF', '000000', 'middle', 'center', true, ws)
                        columRow4 += 2;
                    }
                    //
                    for (let l = 0; l < Plazas[i].Sumatoria.length; l++) {
                        formatoRows(5, columRow5, Plazas[i].Sumatoria[l], 'FFFFFF', '000000', 'middle', 'center', true, ws)
                        columRow5++;
                    }
                }

            }
            else {

                //if (contratista !== '') {
                //    columna += 4;
                //    formatoRows(1, columna, Plazas[i].Plazas.toLocaleUpperCase(), 'FFFFFF', '000000', 'middle', 'center', true, ws)
                //    formatoRows(2, columna, monthInit.toLocaleUpperCase() + '-' + monthEnd.toLocaleUpperCase(), 'FFFFFF', '000000', 'middle', 'center', true, ws)

                //    formatoRows(3, columna, Plazas[i].TotalEntregasPlazaIni, '000000', 'DEDEC6', 'middle', 'center', true, ws)
                //    formatoRows(3, columna + 2, Plazas[i].TotalEntregasPlazaFin, '000000', 'DEDEC6', 'middle', 'center', true, ws)

                //    for (let j = 0; j < Plazas[i].CantViviendas.length; j++) {
                //        formatoRows(4, columRow4, Plazas[i].CantViviendas[j], '000000', 'DEDEC6', 'middle', 'center', true, ws)
                //        columRow4 += 2;
                //    }

                //    formatoRows(5, columRow5, Plazas[i].TotalIncidenciasPlazaIni, '000000', 'DEDEC6', 'middle', 'center', true, ws)
                //    formatoRows(5, columRow5 + 2, Plazas[i].TotalIncidenciasPlazaFin, '000000', 'DEDEC6', 'middle', 'center', true, ws)

                //    columRow5 - 2;
                //    for (let k = 0; k < Plazas[i].Periodo.length; k++) {
                //        formatoRows(6, columnRow6, Plazas[i].Periodo[k], 'FFFFFF', '000000', 'middle', 'center', true, ws)
                //        columnRow6 += 2;
                //    }
                //    for (let l = 0; l < Plazas[i].Sumatoria.length; l++) {
                //        formatoRows(7, columnRow7, Plazas[i].Sumatoria[l], 'FFFFFF', '000000', 'middle', 'center', true, ws)
                //        columnRow7++;
                //    }
                //} else {
                columna += 4;
                formatoRows(1, columna, Plazas[i].Plazas.toLocaleUpperCase(), 'FFFFFF', '000000', 'middle', 'center', true, ws)
                formatoRows(2, columna, monthInit.toLocaleUpperCase() + '-' + monthEnd.toLocaleUpperCase(), 'FFFFFF', '000000', 'middle', 'center', true, ws)
                //*linea 3
                for (let j = 0; j < Plazas[i].CantViviendas.length; j++) {
                    formatoRows(3, columRow3, Plazas[i].CantViviendas[j], '000000', 'DEDEC6', 'middle', 'center', true, ws)
                    columRow3 += 2;
                }
                //*linea 4
                columRow3 - 2;
                for (let k = 0; k < Plazas[i].Periodo.length; k++) {
                    formatoRows(4, columRow4, Plazas[i].Periodo[k], 'FFFFFF', '000000', 'middle', 'center', true, ws)
                    columRow4 += 2;
                }
                //
                for (let l = 0; l < Plazas[i].Sumatoria.length; l++) {
                    formatoRows(5, columRow5, Plazas[i].Sumatoria[l], 'FFFFFF', '000000', 'middle', 'center', true, ws)
                    columRow5++;
                }
                //}

            }
        }

        let dataColumns = contratista !== '' && opcion === "ViviendasEntregadas" ? 8 : 6;
        let dataCell = 0;
        let dataCellPorcentaje = 0;
        let dataCellFin = 0;
        let dataCellPorFin = 0;
        let datosTodasPlazas = [];
        let anioInicialSuma = 0;
        let anioFinalSuma = 0;
        for (let i = 0; i < Familias.length; i++) {
            dataCell = 2
            dataCellPorcentaje = 3
            dataCellFin = 4
            dataCellPorFin = 5
            for (let p of Plazas) {
                if (!todasPlazas) {//para cuando no es todas las plazas se inicial el registro en la fila 6 y columnas 2, 3, 4 y 5
                    let f = p.familia.filter(x => x.Equivalencia === Familias[i].Equivalencia)[0];
                    if (f != undefined) {
                        formatoRows(dataColumns + i, 2, f.AnioInicial, '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, 3, f.PorcentajePeriodoInicial, '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, 4, f.AnioFin, '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        if (+f.PorcentajePeriodoFinal < +f.PorcentajePeriodoInicial || f.PorcentajePeriodoFinal === 0) {
                            formatoRows(dataColumns + i, 5, f.PorcentajePeriodoFinal, '000000', '99FF99', 'middle', 'right', false, ws)
                        } else {
                            formatoRows(dataColumns + i, 5, f.PorcentajePeriodoFinal, '000000', 'D99795', 'middle', 'right', false, ws)
                        }
                    } else {
                        formatoRows(dataColumns + i, 2, "", '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, 3, "", '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, 4, "", '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, 5, "", '000000', '99FF99', 'middle', 'right', false, ws)
                    }
                }

                if (p.Plazas != "Todas las plazas" && todasPlazas) {// para que se registre toda la data de todas las plazas
                    let f = p.familia.filter(x => x.Equivalencia === Familias[i].Equivalencia)[0];

                    if (f != undefined) {
                        dataCell += 4;
                        dataCellPorcentaje += 4;
                        dataCellFin += 4;
                        dataCellPorFin += 4;
                        formatoRows(dataColumns + i, dataCell, f.AnioInicial, '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, dataCellPorcentaje, f.PorcentajePeriodoInicial, '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, dataCellFin, f.AnioFin, '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        if (+f.PorcentajePeriodoFinal < +f.PorcentajePeriodoInicial || f.PorcentajePeriodoFinal === 0 || f.PorcentajePeriodoFinal === '0.00' || f.PorcentajePeriodoFinal === 0.00) {
                            //console.log(f.PorcentajePeriodoFinal)
                            formatoRows(dataColumns + i, dataCellPorFin, f.PorcentajePeriodoFinal, '000000', '99FF99', 'middle', 'right', false, ws)
                        } else {
                            formatoRows(dataColumns + i, dataCellPorFin, f.PorcentajePeriodoFinal, '000000', 'D99795', 'middle', 'right', false, ws)
                        }
                        anioInicialSuma += f.AnioInicial;
                        anioFinalSuma += f.AnioFin;
                    } else {
                        dataCell += 4;
                        dataCellPorcentaje += 4;
                        dataCellFin += 4;
                        dataCellPorFin += 4;
                        formatoRows(dataColumns + i, dataCell, "", '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, dataCellPorcentaje, "", '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, dataCellFin, "", '000000', 'FFFFFF', 'middle', 'right', false, ws)
                        formatoRows(dataColumns + i, dataCellPorFin, "", '000000', 'FFFFFF', 'middle', 'right', false, ws)
                    }
                }
            }
            if (todasPlazas) {
                // hacemos la sumatoria de todos los anios de inicio y los finales y hacemos el calculo del porcentaje para el item de todas las plazas
                datosTodasPlazas.push({
                    Familia: Familias[i].Familia, AnioInicial: anioInicialSuma,
                    PorcentajePeriodoInicial: (anioInicialSuma / acumuladoA[0].AcumuladoPlaza * 100).toFixed(2),
                    AnioFin: anioFinalSuma, PorcentajePeriodoFinal: (anioFinalSuma / acumuladoB[0].AcumuladoPlaza * 100).toFixed(2)
                })
                anioInicialSuma = 0;
                anioFinalSuma = 0;
            }
        }
        let row = 6;
        if (todasPlazas) {
            //llenamos el excel con la informacion de todas las plazas
            for (let i = 0; i < datosTodasPlazas.length; i++) {
                formatoRows(row + i, 2, datosTodasPlazas[i].AnioInicial, '000000', 'FFFFFF', 'middle', 'right', false, ws)
                formatoRows(row + i, 3, datosTodasPlazas[i].PorcentajePeriodoInicial, '000000', 'FFFFFF', 'middle', 'right', false, ws)
                formatoRows(row + i, 4, datosTodasPlazas[i].AnioFin, '000000', 'FFFFFF', 'middle', 'right', false, ws)
                if (+datosTodasPlazas[i].PorcentajePeriodoFinal < +datosTodasPlazas[i].PorcentajePeriodoInicial || datosTodasPlazas[i].PorcentajePeriodoFinal === 0 || datosTodasPlazas[i].PorcentajePeriodoFinal === '0.00') {
                    formatoRows(row + i, 5, datosTodasPlazas[i].PorcentajePeriodoFinal, '000000', '99FF99', 'middle', 'right', false, ws)
                } else {
                    formatoRows(row + i, 5, datosTodasPlazas[i].PorcentajePeriodoFinal, '000000', 'D99795', 'middle', 'right', false, ws)
                }
            }
        }
        workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ConsultaComparativaIncidencias.xlsx');
        });
    }
}