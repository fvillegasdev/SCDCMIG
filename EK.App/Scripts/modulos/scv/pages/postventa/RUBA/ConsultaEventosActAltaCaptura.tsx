namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEventosActCaptura {
    const PAGE_ID: string = "ConsultaEventosActCaptura";
    const PAGE_PENDIENTE_RESULT_ID: string = "ConsultaEventosActCaptura";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_PENDIENTE_RESULT_ID]);
    declare const ExcelJS: any;
    declare const Set: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;
    const GASTOSTOTALESSDC = "GASTOSTOTALESSDC";
    const EVENTOEVIDENCIASSDC = "EVENTOEVIDENCIASSDC";
    const EVENTOINSUMOSSDC = "EVENTOINSUMOSSDC";
    const UBICACIONSDC = "UBICACIONSDC";
    export class Vista extends page.Base {
        componentDidMount(): void {
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowNew={false} allowSave={false} allowEdit={false} allowDelete={false}>
                {/*<Filtros />}
                {<ResultView />}
                {<ConsultaEventosActCapturaDetalleModal />*/}

            </page.Main>;
        };
    }

    export interface IConsultaEventosActCaptura extends page.IProps {
        plaza?: any;
        load?: any;
        EventData: any;
        PosiblesAlianzas: any;
        ObservacionesReq: any;
        Permisos: any;
        initList: (idList: string, data: any) => void
    };
    const loadEventData = (idEvent, rowData) => {
        let parametros = global.assign({
            IDEVENTO: idEvent,
            OPERACION: "GETEVENTOCAPTURA"
        })
        dispatchSuccessful("load::Load", { load: true })
        console.log(rowData)
        global.asyncPost("base/kontrol/EventosActividades/GetBP/GetEventoCapturaByIdEvento/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    dispatchSuccessful("load::EventData", data, PAGE_ID)
                    dispatchSuccessful("load::Load", { load: false })
                    let FechaProgramacion = rowData.FechaProgramacion === null ? '' : rowData.FechaProgramacion.toLocaleDateString();
                    let FechaReprogramacion = rowData.FechaReprogramacion === null ? '' : rowData.FechaReprogramacion.toLocaleDateString();


                   // Forms.updateFormElement(PAGE_ID, "Tipo", rowData.ClasificacionNombre)
                    Forms.updateFormElement(PAGE_ID, "IdEvento", rowData.ID)
                    Forms.updateFormElement(PAGE_ID, "NombreEventoLabel", rowData.Nombre)
                    Forms.updateFormElement(PAGE_ID, "Plaza", rowData.Plaza)
                    Forms.updateFormElement(PAGE_ID, "TipoVivienda", rowData.TipoVivienda)
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", rowData.Fraccionamiento)
                    Forms.updateFormElement(PAGE_ID, "OrganizadorLabel", rowData.Organizador)
                    Forms.updateFormElement(PAGE_ID, "Antecedentes", data.Antecedentes)
                    Forms.updateFormElement(PAGE_ID, "ImpactoEsperado", data.ImpactoEsperado)
                    Forms.updateFormElement(PAGE_ID, "GastosTotales", data.GastosTotales.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
                    Forms.updateFormElement(PAGE_ID, "GastoRuba", data.Ruba.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
                    Forms.updateFormElement(PAGE_ID, "PorcentajeRuba", data.Porcentaje+'%')
                    Forms.updateFormElement(PAGE_ID, "HorasIntervencion", data.HorasIntervencion)
                    Forms.updateFormElement(PAGE_ID, "MetaAsistencia", data.MetaAsistencia)
                    Forms.updateFormElement(PAGE_ID, "NumeroAsistentes", data.NumeroAsistentes)
                    Forms.updateFormElement(PAGE_ID, "PorcentajeAsistencia", data.PorcentajeMeta+'%')
                    Forms.updateFormElement(PAGE_ID, "PresenciaPrensa", data.PresenciaPrensa ? 'SI' : 'NO')
                    Forms.updateFormElement(PAGE_ID, "ProgramaRecomendados", data.ProgramaRecomendados ? 'SI' : 'NO')
                    Forms.updateFormElement(PAGE_ID, "FechaProgramacion", FechaProgramacion)
                    Forms.updateFormElement(PAGE_ID, "FechaReprogramacion", FechaReprogramacion)
                    Forms.updateFormElement(PAGE_ID, "MotivoReprogramacion", data.MotivoReprogramacion)
                    Forms.updateFormElement(PAGE_ID, "Imagen", data.Imagen ? 'SI' : 'NO')
                    Forms.updateFormElement(PAGE_ID, "Integracion", data.Integracion ? 'SI' : 'NO')
                    Forms.updateFormElement(PAGE_ID, "Servicios", data.Servicios ? 'SI' : 'NO')
                    Forms.updateFormElement(PAGE_ID, "Sustentabilidad", data.Sustentabilidad ? 'SI' : 'NO')

                    loadFiles({ tipo: "anexos", entityType: GASTOSTOTALESSDC, entityId: rowData.IdCaptura, activos: 1 }, "itemsFileGT", "datagroupContainerFilesGastosTotales");
                    loadFiles({ tipo: "anexos", entityType: EVENTOEVIDENCIASSDC, entityId: rowData.IdCaptura, activos: 1 }, "itemsFileEvidencias", "datagroupContainerFilesEvidencias");
                    loadFiles({ tipo: "anexos", entityType: EVENTOINSUMOSSDC, entityId: rowData.IdCaptura, activos: 1 }, "itemsFileInsumos", "datagroupContainerFilesInsumos");
                    loadFiles({ tipo: "anexos", entityType: UBICACIONSDC, entityId: rowData.IdCaptura, activos: 1 }, "itemsFileUbicaciones", "datagroupContainerFilesUbicacion");

                    let dataGrid = $("#PatrocinadoresCaptura").dxDataGrid({
                        dataSource: data.Patrocinadores,
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
                            pageSize: 15
                        },
                        pager: {
                            showPageSizeSelector: false,
                            allowedPageSizes: [10, 15, 25],
                            showInfo: true
                        },
                        groupPanel: {
                            visible: false
                        },
                        columns: [
                            { caption: "ID", dataField: "ID", alignment: 'left' },
                            { caption: "PATROCINADOR", dataField: "Patrocinador", alignment: 'left' },
                            {
                                caption: "CANTIDAD", dataField: "Cantidad", alignment: 'left', dataType: 'number',
                                format: {
                                    type: 'currency',
                                    precision: 2,
                                    currency: 'USD'
                                } },
                            { caption: "PORCENTAJE", dataField: "Porcentaje", alignment: 'left' },
                            { caption: "ESPECIE", dataField: "Especie", alignment: 'left' },
                            { caption: "TIPO ESPECIE", dataField: "TipoEspecie", alignment: 'left' },
                        ],
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
                    break;
                case AsyncActionTypeEnum.failed:
                    dispatchSuccessful("load::Load", { load: false })

                    break;
            }
        })
    }


    export let Filtros: any = global.connect(class extends React.Component<IConsultaEventosActCaptura, {}> {
        constructor(props: IConsultaEventosActCaptura) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeView = state.global.modeView;
            retValue.plaza = state.global.Plaza_Seleccionada;
            retValue.EventData = state.global.EventData;
            retValue.PosiblesAlianzas = state.global.PosiblesAlianzas;
            retValue.ObservacionesReq = state.global.ObservacionesReq;
            retValue.Permisos = state.global.Permisos;

            return retValue;
        };
        componentDidMount(): void {
           // Forms.updateFormElement(PAGE_ID, "MediosDifusion", { ID: '-2' });
            //Forms.updateFormElement(PAGE_ID, "Tipo", "E");
            dispatchSuccessful("load::EventData", {})
            dispatchSuccessful("load::Load", { load: false })
            //initList("ListPosiblesAlianzas", null)
        };
        componentWillReceiveProps(nextProps: IConsultaEventosActCaptura, nextState: IConsultaEventosActCaptura): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
            if (hasChanged(this.props.EventData, nextProps.EventData)) {
                if (isSuccessful(nextProps.EventData) && nextProps.EventData.data.ID !== undefined && nextProps.EventData.data.ID > 0) {
                    let evento: any = global.getData(nextProps.EventData);


                }
            }
        }

        onSelectReport(params: any): void {
            let loader = document.getElementById('loadingCaptura');
            let loadedTable = document.getElementById('loadedDataCaptura');
            const columns = [
                { caption: "ID EVENTO", dataField: "ID" },
                //{ caption: "TIPO", dataField: "ClasificacionNombre" },
                { caption: "NOMBRE", dataField: "Nombre" },
                { caption: "PLAZA", dataField: "Plaza" },
                { caption: "TIPO DE VIVIENDA", dataField: "TipoVivienda" },
                { caption: "FRACCIONAMIENTO", dataField: "Fraccionamiento" },
                { caption: "ORGANIZADOR", dataField: "Organizador" },
                { caption: "ANTECENDENTES", dataField: "Antecedentes" },
                { caption: "IMPACTO ESPERADO", dataField: "ImpactoEsperado" },
                {
                    caption: "GASTOS TOTALES", dataField: "GastosTotales", dataType: 'number',
                    format: {
                        type: 'currency',
                        precision: 2,
                        currency: 'USD'
                    } },
                {
                    caption: "GASTO RUBA", dataField: "Ruba", dataType: 'number',
                    format: {
                        type: 'currency',
                        precision: 2,
                        currency: 'USD'
                    } },
                { caption: "PORCENTAJE RUBA", dataField: "PorcentajeRuba" },
                { caption: "HORAS DE INTERVENCIÓN TOTALES", dataField: "HorasIntervencionTotales" },
                { caption: "META DE ASISTENCIA", dataField: "MetaAsistencia" },
                { caption: "NUMERO DE ASISTENTES", dataField: "NumeroAsistentes" },
                { caption: "PORCENTAJE META", dataField: "PorcentajeMeta" },
                { caption: "PRESENCIA PRENSA", dataField: "PresenciaPrensa" },
                { caption: "PROGRAMA DE RECOMENDADOS", dataField: "ProgramaRecomendados" },
                { caption: "FECHA DE PROGRAMACIÓN", dataField: "FechaProgramacion", dataType: "datetime", format: "dd/MM/yyyy" },
                { caption: "FECHA DE REPROGRAMACIÓN", dataField: "FechaReprogramacion", dataType: "datetime", format: "dd/MM/yyyy" },
                { caption: "MOTIVO REPROGRAMACIÓN", dataField: "MotivoReprogramacion" },
                { caption: "IMAGEN", dataField: "Imagen" },
                { caption: "INTEGRACIÓN", dataField: "Integracion" },
                { caption: "SERVICIOS", dataField: "Servicios" },
                { caption: "SUSTENTABILIDAD", dataField: "Sustentabilidad" },
                {
                    caption: "VER DETALLE",
                    type: 'buttons',
                    buttons: ['edit', {
                        hint: 'VER DETALLE',
                        icon: 'detailslayout',
                        onClick(e) {
                            let data = []
                            let idEvent = e.row.data.ID
                            loadEventData(idEvent, e.row.data)
                            dispatchSuccessful("load::Event", e.row.data)
                            let modalObject: any = $("#ConsultaEventosActCapturaDetalle");

                            modalObject.modal();
                            modalObject.css("height", "auto");
                        },
                    }],
                },
            ];

            global.asyncPost("base/kontrol/EventosActividades/GetBP/ConsultasEventosActividades/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data)
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainerCaptura").dxDataGrid({
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
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true,
                                fileName: "ConsultaEventosActividadesCaptura_" + fecha,
                                allowExportSelectedData: false
                            },
                            onExporting: function (e) {

                                e.cancel = true;
                                for (const d of data) {
                                    d.PresenciaPrensa = d.PresenciaPrensa ? 'SI' : 'NO';
                                    d.ProgramaRecomendados = d.ProgramaRecomendados ? 'SI' : 'NO';
                                    d.Imagen = d.Imagen ? 'SI' : 'NO';
                                    d.Integracion = d.Integracion ? 'SI' : 'NO';
                                    d.Servicios = d.Servicios? 'SI' : 'NO';
                                    d.Sustentabilidad = d.Sustentabilidad ? 'SI' : 'NO';
                                }
                                e.cancel = false;
                                setTimeout(() => {
                                    for (const d of data) {
                                        d.PresenciaPrensa = d.PresenciaPrensa === 'SI' ? true : false
                                        d.ProgramaRecomendados = d.ProgramaRecomendados === 'SI' ? true : false
                                        d.Imagen = d.Imagen === 'SI' ? true : false
                                        d.Integracion = d.Integracion === 'SI' ? true : false
                                        d.Servicios = d.Servicios === 'SI' ? true : false
                                        d.Sustentabilidad = d.Sustentabilidad === 'SI' ? true : false
                                    }
                                }, 200);

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

        onSelect(): void {
            let model: any = Forms.getForm(PAGE_ID);
            //console.log(model)
            let Nombre = model.NombreEventoCaptura === undefined ? null : model.NombreEventoCaptura.Nombre;
            let Plaza = model.PlazaInicial.ID;
            let TipoVivienda = model.Vocaciones.ID;
            let Fraccionamiento = global.filterFracc(model.FraccionamientosCaptura)
            let Organizador = model.Organizador.ID;
            let FechaInicial = model.FechaInicialC;
            let FechaFinal = model.FechaFinalC;
            let Prensa = model.PresenciaPrensa === 'PresenciaPrensaSi' ? 1 : model.PresenciaPrensa === 'PresenciaPrensaNo' ? 0 : -2;
            let ProgramaRecomendados = model.ProgramaRecomendados === 'ProgramaRecomendadosSi' ? 1 : model.ProgramaRecomendados === 'ProgramaRecomendadosNo' ? 0 : -2;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'
            let p: any = global.assign({
                NOMBRE: Nombre,
                PLAZA: Plaza,
                TIPOVIVIENDA: TipoVivienda,
                FRACCIONAMIENTO: Fraccionamiento,
                ORGANIZADOR: Organizador,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                PRENSA: Prensa,
                PROGRAMARECOMENDADOS: ProgramaRecomendados,
                OPERACION: 'REPORTECAPTURA'
            });
            console.log(p)
            if (p.FRACCIONAMIENTO === "" || p.FRACCIONAMIENTO === null || p.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            this.onSelectReport(p);
        }
        changeColorButtons(id) {
            let x = document.getElementById('btnId' + id);
            x.style.background = '#36C6D3';
        }
        clearRadioButton(idForm: string, btnId: string) {
            Forms.updateFormElement(PAGE_ID, idForm, null);
            let x = document.getElementById(btnId);
            x.style.background = '#ccc';
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Consulta Eventos Actividades Captura"}
                    level={5}
                    icon="icon-folder"
                    collapsed={true}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelect} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <Column size={[12, 12, 6, 6]}>
                            <select.EventosActividades id="NombreEventoCaptura" key={"NombreEvento"} label="Nombre del evento o actividad" idFormSection={PAGE_ID} size={[12, 12, 12, 12]} />
                            {/* <input.Text id="NombreEventoCaptura" label="Nombre del evento o actividad" idForm={PAGE_ID} size={[12, 12, 12, 12]} />*/}
                            </Column>
                            <Column size={[12, 12, 12, 12]}>
                            <ddl.PlazasDDL2 id="PlazaInicial" label="Plaza" idFormSection={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <ddl.VocacionesFilterDDL2 id="Vocaciones" label={"Tipo de vivienda"} idFormSection={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="FraccionamientosCaptura" idFormSection={PAGE_ID} /> 

                            {/*<ddl.TagsFraccionamientosV2 id="FraccionamientosCaptura" idFormSection={PAGE_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />*/}

                            <ddl.OrganizadorEvento id="Organizador" selectAll={true} label="Organizador" idFormSection={PAGE_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />
                                <DatePicker id="FechaInicialC" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                <DatePicker id="FechaFinalC" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            </Column>
                        </Column>
                    </Row>
                    <Row>
                        <Column size={[12, 12, 12, 12]} style={{ marginTop: 10 }}>
                            <page.OptionSection
                                id={PAGE_ID}
                                subTitle={"PROMOCIÓN DEL EVENTO"}
                                level={1}
                                icon="fa fa-camera"
                                collapsed={false}>
                                <Row style={{}}>
                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                        <b>PRESENCIA DE PRENSA</b>
                                    </Column >
                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                        <RadioButton id="PresenciaPrensaSi" label="SI" idFormSection={PAGE_ID} groupName="PresenciaPrensa" change={() => this.changeColorButtons(1)} size={[12, 12, 6, 6]} />
                                        <RadioButton id="PresenciaPrensaNO" label="NO" idFormSection={PAGE_ID} groupName="PresenciaPrensa" change={() => this.changeColorButtons(1)} size={[12, 12, 5, 5]} />
                                        <Button icon="fas fa-eraser" id="btnId1" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={() => { this.clearRadioButton("PresenciaPrensa", "btnId1") }} />
                                    </Column >
                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                        <b>PROGRAMA DE RECOMENDADOS</b>
                                    </Column >
                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                        <RadioButton id="ProgramaRecomendadosSi" label="SI" idFormSection={PAGE_ID} groupName="ProgramaRecomendados" change={() => this.changeColorButtons(2)} size={[12, 12, 6, 6]} />
                                        <RadioButton id="ProgramaRecomendadosNo" label="NO" idFormSection={PAGE_ID} groupName="ProgramaRecomendados" change={() => this.changeColorButtons(2)} size={[12, 12, 5, 5]} />
                                        <Button icon="fas fa-eraser" id="btnId2" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={() => { this.clearRadioButton("ProgramaRecomendados", "btnId2") }} />
                                    </Column >
                                </Row>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ padding: "5px" }}>
                                        {<ResultView />}
                                        {<ConsultaEventosActCapturaDetalleModal />}
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column >
                    </Row>

                </page.OptionSection>
              
            ;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IConsultaEventosActCaptura, {}> {
        constructor(props: IConsultaEventosActCaptura) {
            super(props);
        };
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]} style={{ background: '#fff' }}>
                <br />
                <div id="loadingCaptura" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedDataCaptura" style={{ display: 'inherit' }}>
                    <div id="datagroupContainerCaptura" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                </div>
            </Column>

            </div>
        }
    });



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
        row.getCell(NumberCell).alignment = { vertical: aligVertical, horizontal: aligHorizontal }; //vertical: top | middle | bottom, horizontal: left|center|rigth
        row.getCell(NumberCell).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    }
    //========================================================================
    // MODAL Archivos
    //========================================================================
    export const getFormatBytes: (bytes: number, precision: number) => string = (bytes: number = 0, precision: number = 2): string => {
        if (isNaN(bytes) || !isFinite(bytes)) return "0 Bytes";

        let unit = 0;
        let units: string[] = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }

        return bytes.toFixed(precision) + " " + units[unit];
    };
    const onDataTableFiles = (container: string, data: any) => {
        $(`#${container}`).dxDataGrid({
            dataSource: data,
            rowAlternationEnabled: true,
            selection: {
                mode: "single"
            },
            paging: {
                pageSize: 5
            },
            columns: [{
                caption: "Archivo", dataField: "Nombre", alignment: 'left',
                cellTemplate: (container, options) => {
                    let text = options.data.Nombre
                    $('<a/>').addClass('dx-link')
                        .text(text)
                        .on('dxclick', () => {
                            //Do something with 
                            window.location.href = options.data.FilePath;
                        })
                        .appendTo(container);
                },
            },
            { caption: "Fecha", dataField: "Creado", dataType: "datetime", format: "d/M/yyyy" },
            {
                caption: "Creado Por", dataField: "CreadoPor.Nombre"
            },
            {
                caption: "Tamaño", dataField: "FileSize",
                cellTemplate: function (container, options) {
                    return $("<div>", {})
                        .append($(`<span>${getFormatBytes(options.data.FileSize, 2)}</span>`))
                        .appendTo(container);
                }
            }
            ],
            showBorders: true,
        }).dxDataGrid("instance");
    }
    const loadFiles = (parametros, state, initTable) => {
        let encodedFilters: string = global.encodeObject(parametros);
        global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
            dispatchSuccessful(`load::${state}`, data, PAGE_ID);
            onDataTableFiles(initTable, data);
        });
    }
    const ConsultaEventosActCapturaDetalleModal: any = global.connect(class extends React.Component<IConsultaEventosActCaptura, {}>{
        constructor(props: IConsultaEventosActCaptura) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.Load = state.global.Load;
            retValue.EventData = state.global.EventData;
            retValue.PosiblesAlianzas = state.global.PosiblesAlianzas;
            retValue.ObservacionesReq = state.global.ObservacionesReq;
            retValue.Permisos = state.global.Permisos;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

            initList: (idList: string, data: any) => {
                //let list = $('#ListPosiblesAlianzas').dxList({
                //    dataSource: data,
                //    displayExpr: 'Descripcion',
                //    noDataText: "Sin datos para mostrar",
                //});
            }
        })
        footerModal(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        componentDidMount(): void {
            let data = []
            let list = $('#ListPosiblesAlianzas').dxList({
                dataSource: data,
                displayExpr: 'Descripcion',
                noDataText: "Sin datos para mostrar",
            });
        };
        componentWillReceiveProps(nextProps: IConsultaEventosActCaptura, nextState: IConsultaEventosActCaptura): void {
            if (hasChanged(this.props.PosiblesAlianzas, nextProps.PosiblesAlianzas) && global.isSuccessful(nextProps.PosiblesAlianzas)) {
                if (isSuccessful(nextProps.PosiblesAlianzas)) {
                    let data: any = global.getData(nextProps.PosiblesAlianzas);
                    console.log("will")
                };
            };

        }
        onExport() {
            const workbook = new ExcelJS.Workbook();
            const ws = workbook.addWorksheet('Detalle de evento');
            const data = getData(EK.Store.getState().global.EventData);
            const event = getData(EK.Store.getState().global.Event);

            let row = 2;
            let column = 2;
            let counter = 0

            let header = ['ID', 'NOMBRE DEL EVENTO', 'PLAZA', 'TIPO DE VIVIENDA', 'FRACCIONAMIENTO'].forEach(x => {
                console.log(x)
                formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
                counter++
            });

            row = 3
            counter = 0
            let row2 = [event.ID, event.Nombre, event.Plaza, event.TipoVivienda, event.Fraccionamiento].forEach(x => {
                formatoRows(row, column + counter, x, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
            })

            row = 5
            counter = 0
            let header2 = ['ORGANIZADOR', 'ANTECEDENTES', 'IMPACTO ESPERADO', 'GASTOS TOTALES', 'GASTOS RUBA', 'PORCENTAJE RUBA'].forEach(x => {
                formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
                counter++
            })

            row = 6
            counter = 0
            let row3 = [event.Organizador, event.Antecedentes, event.ImpactoEsperado, event.GastosTotales, event.Ruba, event.PorcentajeRuba].forEach(x => {
                formatoRows(row, column + counter, x, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
            })

            row = 8
            counter = 0
            let header3 = ['HORAS DE INTERVENCIÓN', 'META DE ASISTENCIA', 'NUMERO DE ASISTENTES', 'PORCENTAJE DE ASISTENCIA', 'PRESENCIA DE PRENSA', 'PROGRAMA DE RECOMENDADOS'].forEach(x => {
                formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
                counter++
            })

            row = 9
            counter = 0
            let row4 = [event.HorasIntervencionTotales, event.MetaAsistencia, event.NumeroAsistentes, event.PorcentajeMeta, event.PresenciaPrensa ? 'SI' : 'NO', event.ProgramaRecomendados ? 'SI' : 'NO'].forEach(x => {
                formatoRows(row, column + counter, x, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
            })

            row = 12
            counter = 0
            let header4 = ["FECHA DE PROGRAMACIÓN", 'FECHA DE REPROGRAMACIÓN', 'MOTIVO DE REPROGRAMACIÓN', 'IMAGEN', 'INTEGRACION', 'SERVICIOS', 'SUSTENTABILIDAD'].forEach(x => {
                formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', false, ws)
                counter++
            })

            row = 13;
            counter = 0;
            let row5 = [event.FechaProgramacion, event.FechaReprogramacion, event.MotivoReprogramacion, event.Imagen ? 'SI' : 'NO',
                event.Integracion ? 'SI' : 'NO',
                event.Servicios ? 'SI' : 'NO',
                event.Sustentabilidad ? 'SI' : 'NO'].forEach(x => {
                    formatoRows(row, column + counter, x, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                    counter++
                })

            row = 15;
            counter = 0;

            let headerPatrocinadores = ['ID', 'PATROCINADOR', 'CANTIDAD', 'PORCENTAJE','ESPECIE', 'TIPO ESPECIE'].forEach(x => {
                formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', false, ws)
                counter++
            })

            row = 16
            counter = 0;
            let suma = 0
            if (data.Patrocinadores !== null) {
                for (let x of data.Patrocinadores) {
                    formatoRows(row + counter, 2, x['ID'], '000000', 'FFFFFF', 'middle', 'center', false, ws)
                    formatoRows(row + counter, 3, x['Patrocinador'], '000000', 'FFFFFF', 'middle', 'center', false, ws)
                    formatoRows(row + counter, 4, x['Cantidad'], '000000', 'FFFFFF', 'middle', 'center', false, ws)
                    formatoRows(row + counter, 5, x['Porcentaje'], '000000', 'FFFFFF', 'middle', 'center', false, ws)
                    formatoRows(row + counter, 6, x['Especie'] ? 'SI' : 'NO', '000000', 'FFFFFF', 'middle', 'center', false, ws)
                    formatoRows(row + counter, 7, x['TipoEspecie'], '000000', 'FFFFFF', 'middle', 'center', false, ws)
                    counter++
                    suma = suma + x['Porcentaje']
                }
                let lastRow = row + counter;
                formatoRows(lastRow, 4, 'Total de porcentaje', '000000', 'FFFFFF', 'middle', 'center', false, ws)
                formatoRows(lastRow, 5, suma.toString(), '000000', 'FFFFFF', 'middle', 'center', false, ws)
            }
            

            



            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DetalleEventosActividadesCaptura.xlsx');
            });
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let load;
            if (isSuccessful(EK.Store.getState().global.Load)) {
                load = getData(EK.Store.getState().global.Load).load;
            }
            return <modal.Modal id="ConsultaEventosActCapturaDetalle" header={"Detalles del evento"} footer={this.footerModal()}
                addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    {
                        load ?
                            <div className="alert alert-info" style={{ marginTop: 20 }}>
                                <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                            </div>
                            : null

                    }
                    {
                        !load ? <Column size={[12, 12, 12, 12]}>
                            <Row>
                                <Column size={[12, 12, 12, 12]}>
                                    <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Exportar"} onClick={this.onExport} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2", float: 'rigth' }} />
                                </Column>
                                <Column size={[12, 12, 12, 12]}>

                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={<span>Información del evento</span>}
                                        icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                                {/*<label.Label id="Tipo" label="Tipo" idForm={PAGE_ID} size={[12, 12, 2, 2]} />*/}
                                                <label.Label id="IdEvento" label="ID" idForm={PAGE_ID} size={[12, 12, 1, 1]} />
                                                <label.Label id="NombreEventoLabel" label="Nombre" idForm={PAGE_ID} size={[12, 12, 9, 11]} />
                                                <label.Label id="Plaza" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="TipoVivienda" label="Tipo de vivienda" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="Fraccionamiento" label="Fraccionamiento" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="OrganizadorLabel" label="Organizador" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="Antecedentes" label="Antecedentes" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="ImpactoEsperado" label="Impacto esperado" idForm={PAGE_ID} size={[12, 12, 6, 6]} />
                                                <label.Label id="GastosTotales" label="Gastos Totales" idForm={PAGE_ID} size={[12, 12, 6, 6]} />
                                                <label.Label id="GastoRuba" label="Gastos Ruba" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                                                <label.Label id="PorcentajeRuba" label="Porcentaje Ruba" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                <label.Label id="HorasIntervencion" label="Horas de Intervención" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                                                <label.Label id="MetaAsistencia" label="Meta de asistencia" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                                                <label.Label id="NumeroAsistentes" label="Numero de asistentes" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                                                <label.Label id="PorcentajeAsistencia" label="Porcentaje de asistencia" idForm={PAGE_ID} size={[12, 12, 6, 6]} />
                                                <label.Label id="PresenciaPrensa" label="Presencia de prensa" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                <label.Label id="ProgramaRecomendados" label="Programa de recomendados" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                <label.Label id="FechaProgramacion" label="Fecha de Programación" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                <label.Label id="FechaReprogramacion" label="Fecha de Reprogramación" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                <label.Label id="MotivoReprogramacion" label="Motivo de Reprogramación" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                <label.Label id="Imagen" label="Imagen" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                <label.Label id="Integracion" label="Integración" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                <label.Label id="Servicios" label="Servicios" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                <label.Label id="Sustentabilidad" label="Sustentabilidad" idForm={PAGE_ID} size={[12, 12, 4, 4]} />

                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]} >
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"PATROCINADORES"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <Column size={[12, 12, 12, 12]}>
                                                <div className="widget-container">
                                                    <div id="PatrocinadoresCaptura" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                    </div>
                                                </div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column >
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"GASTOS TOTALES"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <div id="datagroupContainerFilesGastosTotales" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                            </div>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"EVIDENCIAS"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <div id="datagroupContainerFilesEvidencias" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                            </div>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"INSUMOS DEL EVENTO"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <div id="datagroupContainerFilesInsumos" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                            </div>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"UBICACIÓN DEL EVENTO"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <div id="datagroupContainerFilesUbicacion" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                            </div>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>
                        </Column> : null
                    }
                </Row>
            </modal.Modal>
        };
    });
}