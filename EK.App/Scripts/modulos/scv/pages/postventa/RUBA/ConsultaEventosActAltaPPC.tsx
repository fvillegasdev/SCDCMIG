namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEventosActPPC{
    const PAGE_ID: string = "ConsultaEventosActPPC";
    const PAGE_RESULT_ID: string = "ConsultaEventosActPPC";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_RESULT_ID]);
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
        row.getCell(NumberCell).alignment = { vertical: aligVertical, horizontal: aligHorizontal }; //vertical: top | middle | bottom, horizontal: left|center|rigth
        row.getCell(NumberCell).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    }

    const loadData = (idEvent) => {
        let parametros = global.assign({
            ID: idEvent
        })
        dispatchSuccessful("load::Load", { load: true })
        global.asyncPost("base/kontrol/EventosActividades/GetBP/GetEventById/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    dispatchSuccessful("load::EventData", data, PAGE_ID)
                    let catalogo = getData(EK.Store.getState().global.catalogo);
                    let FechaProgramacion = data.FechaProgramacion === null ? '' : data.FechaProgramacion.toLocaleDateString();
                    let FechaReprogramacion = data.FechaReprogramacion === null ? '' : data.FechaReprogramacion.toLocaleDateString();


                    //Forms.updateFormElement(PAGE_ID, "TipoLabel", data.ClasificacionNombre);
                    Forms.updateFormElement(PAGE_ID, "IdEvento", data.ID);
                    Forms.updateFormElement(PAGE_ID, "NombreEventoLabel", data.Nombre);
                    Forms.updateFormElement(PAGE_ID, "AlcanceEvento", data.AlcanceEvento);
                    Forms.updateFormElement(PAGE_ID, "TipoEvento", data.TipoEvento);
                    Forms.updateFormElement(PAGE_ID, "Plaza", data.Plaza);
                    Forms.updateFormElement(PAGE_ID, "TipoVivienda", data.TipoVivienda);
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", data.Fraccionamiento);
                    Forms.updateFormElement(PAGE_ID, "FechaProgramacion", FechaProgramacion);
                    Forms.updateFormElement(PAGE_ID, "FechaReprogramacion", FechaReprogramacion);
                    Forms.updateFormElement(PAGE_ID, "MotivoReprogramacion", data.MotivoReprogramacion);

                    global.asyncPost("base/kontrol/EventosActividades/GetBP/GetEventosActividadesPPC/", { parametros: parametros }, (status: AsyncActionTypeEnum, data2: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                dispatchSuccessful("load::Detalle", data2, PAGE_ID)
                                let dataParticipantes = EK.Store.getState().global.tmplistaparticipantesdet;
                                console.log(dataParticipantes)

                                console.log(data2.Participantes)
                                onDataTableData("DetParticipantes", [dataParticipantes.data], Participantes, "Participantes");
                                onDataTableData("DetPatrocinadores", data2.Patrocinadores, Patrocinadores, "Patrocinadores");
                                onDataTableData("DetColaboradores", data2.Colaboradores, Colaboradores, "Colaboradores");

                                loadFiles({ tipo: "anexos", entityType: "PARTICIPANTESPPC", entityId: data.ID, activos: 1 }, "itemsFileParticipantes", "FilesParticipantes");
                                loadFiles({ tipo: "anexos", entityType: "PATROCINADORESPPC", entityId: data.ID, activos: 1 }, "itemsFilePatrocinadores", "FilesPatrocinadores");
                                loadFiles({ tipo: "anexos", entityType: "COLABORADORESPPC", entityId: data.ID, activos: 1 }, "itemsFileColaboradores", "FilesColaboradores");

                                dispatchSuccessful("load::Load", { load: false })
                                break;
                            case AsyncActionTypeEnum.loading:
                                break;
                            case AsyncActionTypeEnum.failed:
                                dispatchSuccessful("load::Load", { load: false })

                                break;
                        }
                    })
                  

                

                  


                    dispatchSuccessful("load::Load", { load: false })
                    break;
                case AsyncActionTypeEnum.loading:
                    break;
                case AsyncActionTypeEnum.failed:
                    dispatchSuccessful("load::Load", { load: false })

                    break;
            }
        })
        
       
    }
    const Participantes = [
        { caption: "Plaza", dataField: "Plaza", alignment: 'left' },
        { caption: "Fraccionamiento", dataField: "Fraccionamiento", alignment: 'left' },
        { caption: "Segmento", dataField: "TipoVivienda", alignment: 'left' },
        { caption: "Fecha", dataField: "FechaProgramacion", alignment: 'left', dataType: 'date', format: 'dd/MM/yyyy' },
        { caption: "Mujer", dataField: "mujer", alignment: 'center' },
        { caption: "Hombre", dataField: "hombre", alignment: 'center' },
        { caption: "Niños", dataField: "ninos", alignment: 'center' },
        { caption: "Adultos mayores", dataField: "amayores", alignment: 'center' },
        { caption: "Total", dataField: "total", alignment: 'center' },
    ]
    const columnsParticipantes = [
        { caption: "Id Evento", dataField: "ID", alignment: 'left' },
        //{ caption: "Clasificacion", dataField: "ClasificacionNombre", alignment: 'left' },
        { caption: "Nombre Evento", dataField: "Nombre", alignment: 'left' },
        { caption: "Plaza", dataField: "Plaza", alignment: 'left' },
        { caption: "Fraccionamiento", dataField: "Fraccionamiento", alignment: 'left' },
        { caption: "Segmento", dataField: "TipoVivienda", alignment: 'left' },
        { caption: "Fecha", dataField: "FechaProgramacion", alignment: 'left', dataType: 'date', format: 'dd/MM/yyyy' },
        //{ caption: "Fecha Reprogramacion", dataField: "FechaReprogramacion", alignment: 'left' },
        //{ caption: "Motivo Reprogramacion", dataField: "MotivoReprogramacion", alignment: 'left' },
        { caption: "Mujer", dataField: "mujer", alignment: 'center' },
        { caption: "Hombre", dataField: "hombre", alignment: 'center' },
        { caption: "Niños", dataField: "ninos", alignment: 'center' },
        { caption: "Adultos mayores", dataField: "amayores", alignment: 'center' },
        { caption: "Total", dataField: "total", alignment: 'center' },
        //{ caption: "Nombre Participante", dataField: "NombreParticipante", alignment: 'left' },
        //{ caption: "Apellido Paterno", dataField: "ApellidoPaternoParticipante", alignment: 'left' },
        //{ caption: "Apellido Materno", dataField: "ApellidoMaternoParticipante", alignment: 'left' },
        //{ caption: "Calle", dataField: "Calle", alignment: 'left' },
        //{ caption: "Numero", dataField: "Numero", alignment: 'left' },
        //{ caption: "Telefono", dataField: "Telefono", alignment: 'left' },
        //{ caption: "Celular", dataField: "Celular", alignment: 'left' },
        //{ caption: "Email", dataField: "Email", alignment: 'left' },
        {
            caption: "VER DETALLE",
            type: 'buttons',
            buttons: ['edit', {
                hint: 'Clone',
                icon: 'detailslayout',
                onClick(e) {
                    console.log(e);
                    let data = []
                    let idEvent = e.row.data.ID
                    dispatchSuccessful('load::tmplistaparticipantesdet', e.row.data);
                    loadData(idEvent)
                    let modalObject: any = $("#ConsultaEventosActPPCDetalleModal");

                    modalObject.modal();
                    modalObject.css("height", "auto");
                },
            }],
        },
    ]
    const Patrocinadores = [
        { caption: "Nombre Patrocinador", dataField: "Nombre", alignment: 'left' },
        { caption: "Razon Social", dataField: "RazonSocial", alignment: 'left' },
        { caption: "Calle", dataField: "Calle", alignment: 'left' },
        { caption: "Numero", dataField: "Numero", alignment: 'left' },
        { caption: "Telefono", dataField: "Telefono", alignment: 'left' },
        { caption: "Celular", dataField: "Celular", alignment: 'left' },
        { caption: "Email", dataField: "Email", alignment: 'left' },
    ]
    const columnsPatrocinadores = [
        { caption: "Id Evento", dataField: "ID", alignment: 'left' },
        //{ caption: "Clasificacion", dataField: "ClasificacionNombre", alignment: 'left' },
        { caption: "Nombre Evento", dataField: "Nombre", alignment: 'left' },
        { caption: "Plaza", dataField: "Plaza", alignment: 'left' },
        { caption: "Fraccionamiento", dataField: "Fraccionamiento", alignment: 'left' },
        { caption: "Tipo Vivienda", dataField: "TipoVivienda", alignment: 'left' },
        { caption: "Fecha Programacion", dataField: "FechaProgramacion", alignment: 'left' },
        { caption: "Fecha Reprogramacion", dataField: "FechaReprogramacion", alignment: 'left' },
        { caption: "Motivo Reprogramacion", dataField: "MotivoReprogramacion", alignment: 'left' },
        { caption: "Nombre Patrocinador", dataField: "NombrePatrocinador", alignment: 'left' },
        { caption: "Razon Social", dataField: "RazonSocial", alignment: 'left' },
        { caption: "Calle", dataField: "Calle", alignment: 'left' },
        { caption: "Numero", dataField: "Numero", alignment: 'left' },
        { caption: "Telefono", dataField: "Telefono", alignment: 'left' },
        { caption: "Celular", dataField: "Celular", alignment: 'left' },
        { caption: "Email", dataField: "Email", alignment: 'left' },
        {
            caption: "VER DETALLE",
            type: 'buttons',
            buttons: ['edit', {
                hint: 'Clone',
                icon: 'detailslayout',
                onClick(e) {
                    let data = []
                    let idEvent = e.row.data.ID
                    loadData(idEvent)
                    let modalObject: any = $("#ConsultaEventosActPPCDetalleModal");

                    modalObject.modal();
                    modalObject.css("height", "auto");
                },
            }],
        },
    ]
    let Colaboradores = [
        { caption: "No. Empleado", dataField: "NoEmpleado", alignment: 'left' },
        { caption: "Nombre", dataField: "Nombre", alignment: 'left' },
        { caption: "Apellido Paterno", dataField: "ApellidoPaterno", alignment: 'left' },
        { caption: "Apellido Materno", dataField: "ApellidoMaterno", alignment: 'left' },
        { caption: "Email", dataField: "Email", alignment: 'left' },
        { caption: "Puesto", dataField: "Puesto", alignment: 'left' },
        { caption: "Staff", dataField: "Staff", alignment: 'left' },
        { caption: "Participante", dataField: "Participante", alignment: 'left' },
    ]
    let columnsColaboradores = [
        { caption: "Id Evento", dataField: "ID", alignment: 'left' },
        //{ caption: "Clasificacion", dataField: "ClasificacionNombre", alignment: 'left' },
        { caption: "Nombre Evento", dataField: "Nombre", alignment: 'left' },
        { caption: "Plaza", dataField: "Plaza", alignment: 'left' },
        { caption: "Fraccionamiento", dataField: "Fraccionamiento", alignment: 'left' },
        { caption: "Tipo Vivienda", dataField: "TipoVivienda", alignment: 'left' },
        { caption: "Fecha Programacion", dataField: "FechaProgramacion", alignment: 'left' },
        { caption: "Fecha Reprogramacion", dataField: "FechaReprogramacion", alignment: 'left' },
        { caption: "Motivo Reprogramacion", dataField: "MotivoReprogramacion", alignment: 'left' },
        { caption: "No. Empleado", dataField: "NoEmpleado", alignment: 'left' },
        { caption: "Nombre", dataField: "NombreColaborador", alignment: 'left' },
        { caption: "Apellido Paterno", dataField: "ApellidoPaterno", alignment: 'left' },
        { caption: "Apellido Materno", dataField: "ApellidoMaterno", alignment: 'left' },
        { caption: "Email", dataField: "Email", alignment: 'left' },
        { caption: "Puesto", dataField: "Puesto", alignment: 'left' },
        { caption: "Staff", dataField: "Staff", alignment: 'left' },
        { caption: "Participante", dataField: "Participante", alignment: 'left' },
        {
            caption: "VER DETALLE",
            type: 'buttons',
            buttons: ['edit', {
                hint: 'Clone',
                icon: 'detailslayout',
                onClick(e) {
                    let data = []
                    let idEvent = e.row.data.ID
                    loadData(idEvent)
                    let modalObject: any = $("#ConsultaEventosActPPCDetalleModal");

                    modalObject.modal();
                    modalObject.css("height", "auto");
                },
            }],
        },
    ]
    const onDataTableData = (container: string, data: any, columns?: any, nameFileExport?: any, TypeEntity?: any) => {
        let fecha = Date.now();
        $(`#${container}`).dxDataGrid({
            dataSource: data,
            columnAutoWidth: true,
            showBorders: false,
            searchPanel: {
                visible: true
            },
            paging: {
                pageSize: 10
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [15, 20, 25],
                showInfo: true
            },
            columns: columns,
            showColumnLines: false,
            showRowLines: true,
            columnFixing: { enabled: true },
            rowAlternationEnabled: true,
            selection: {
                mode: "single"
            },
            groupPanel: {
                visible: true
            },
        }).dxDataGrid("instance");
    }
    export class Vista extends page.Base {
        componentDidMount(): void {
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowNew={false} allowSave={false} allowEdit={false} allowDelete={false}>
                {/*<Filtros />*/}
               

            </page.Main>;
        };
    }


    export interface IConsultaEventosActPPC extends page.IProps {
        plaza?: any;
        load?: any;
        EventData: any;
        PosiblesAlianzas: any;
        ObservacionesReq: any;
        Permisos: any;
        initList: (idList: string, data: any) => void
    };
    


   export let Filtros: any = global.connect(class extends React.Component<IConsultaEventosActPPC, {}> {
        constructor(props: IConsultaEventosActPPC) {
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
            Forms.updateFormElement(PAGE_ID, "MediosDifusion", { ID: '-2' });
            Forms.updateFormElement(PAGE_ID, "Tipo", "E");
            dispatchSuccessful("load::EventData", {})
            dispatchSuccessful("load::Load", { load: false })
            //initList("ListPosiblesAlianzas", null)
        };
        componentWillReceiveProps(nextProps: IConsultaEventosActPPC, nextState: IConsultaEventosActPPC): void {

            //if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
            //    Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            //    Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            //}
            if (hasChanged(this.props.EventData, nextProps.EventData)) {
                if (isSuccessful(nextProps.EventData) && nextProps.EventData.data.ID !== undefined && nextProps.EventData.data.ID > 0) {
                    let evento: any = global.getData(nextProps.EventData);

                  


                }
            }
        }

        onSelectReport(params: any): void {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            global.asyncPost("base/kontrol/EventosActividades/GetBP/ConsultasEventosActividadesPPC/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data)
                        let fecha = Date.now();
                    onDataTableData("ParticipantesPPC", data.Participantes, columnsParticipantes, "Participantes");
                    onDataTableData("PatrocinadoresPPC", data.Patrocinadores, columnsPatrocinadores, "Patrocinadores");
                    onDataTableData("ColaboradoresPPC", data.Colaboradores, columnsColaboradores, "Colaboradores");

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
            console.log(model)
            let Nombre = model.NombreEventoPPC === undefined ? null : model.NombreEventoPPC.Nombre;
            let Tipo = model.Tipo === null? '-2':model.Tipo;
            let Plaza = model.PlazaInicialPPC.ID;
            let TipoVivienda = model.VocacionesPPC.ID;
            //let Fraccionamiento = global.filterFracc(model.Fraccionamientos)
            let FechaInicial = model.FechaInicialPPC;
            let FechaFinal = model.FechaFinalPPC;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'
            let p: any = global.assign({
                NOMBRE: Nombre,
                //TIPO: Tipo,
                PLAZA: Plaza,
                TIPOVIVIENDA: TipoVivienda,
                FRACCIONAMIENTO: -2,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                OPERACION: ""
            });
            console.log(p)
            //if (p.FRACCIONAMIENTO === "" || p.FRACCIONAMIENTO === null || p.FRACCIONAMIENTO === undefined) {
            //    return global.warning("Favor de seleccionar un fraccionamiento.")
            //}
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
                    subTitle={"Consulta Participantes, Patrocinadores y Colaboradores"}
                    level={5}
                    icon="icon-folder"
                    collapsed={true}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelect} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            {/*<Column size={[12, 12, 4, 4]} >
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={<span>TIPO</span>}
                                    icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                            <RadioButton id="E" label="EVENTOS" value="Evento" idForm={PAGE_ID} groupName="Tipo" change={() => this.changeColorButtons(1)} size={[12, 12, 6, 6]} />
                                            <RadioButton id="A" label="ACTIVIDADES" value="Actividades" idForm={PAGE_ID} groupName="Tipo" change={() => this.changeColorButtons(1)} size={[12, 12, 5, 5]} />
                                            <Button icon="fas fa-eraser" id="btnId1" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={() => { this.clearRadioButton("Tipo", "btnId1") }} />
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Column>*/}
                            <Column size={[12, 12, 6, 6]}>
                            {/*<input.Text id="NombreEvento" label="Nombre del evento o actividad" idForm={PAGE_ID} size={[12, 12, 12, 12]} />*/}
                            <select.EventosActividades id="NombreEventoPPC" key={"NombreEvento"} label="Nombre del evento o actividad" idFormSection={PAGE_ID} size={[12, 12, 12, 12]}  />
                            </Column>
                            <Column size={[12, 12, 12, 12]}>
                            <ddl.PlazasDDL id="PlazaInicialPPC" label="Plaza" idFormSection={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <ddl.VocacionesFilterDDL2 id="VocacionesPPC" label={"Tipo de vivienda"} idFormSection={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            {/*<ddl.TagsFraccionamientos2 id="Fraccionamientos" idFormSection={PAGE_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />*/}
                                <DatePicker id="FechaInicialPPC" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                <DatePicker id="FechaFinalPPC" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            </Column>
                        </Column>
                    </Row>
                {<ResultView />}
                {<ConsultaEventosActPPCDetalleModal />}
                </page.OptionSection>
            ;
        }
    });
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
    let ResultView: any = global.connect(class extends React.Component<IConsultaEventosActPPC, {}> {
        constructor(props: IConsultaEventosActPPC) {
            super(props);
        };
        
        onExport() {
            const workbook = new ExcelJS.Workbook();
            const ParticipantesWs = workbook.addWorksheet('Participantes');
            const PatrocinadoresWs = workbook.addWorksheet('Patrocinadores');
            const ColaboradoresWs = workbook.addWorksheet('Colaboradores');
            const data = getData(EK.Store.getState().global.catalogo);
            console.log(data.length)
            if (isEmpty(data)) {
                warning("No hay información a exportar", "Atención");
                return;
            }

            ParticipantesWs.mergeCells('B2:L2');
            formatoRows(2, 2, "PARTICIPANTES", 'FFFFFF', '2196F3', 'middle', 'center', true, ParticipantesWs)
            let row = 3;
            let column = 2;
            let counter = 0
            let headersParticipantes = ["Id Evento", "Nombre del evento", "Plaza","Fraccionamiento", "Segmento",
                "Fecha", "Mujer", "Hombre", "Niños", "Adultos Mayores", "Total"].forEach(x => {
                    formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', true, ParticipantesWs)
                    counter++
                })
            
            if (data.Participantes !== null) {
                row = 4
                column = 2
                counter = 0
                for (let x of data.Participantes) {
                    formatoRows(row + counter, 2, x.ID, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    //formatoRows(row + counter, 3, x.ClasificacionNombre, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 3, x.Nombre, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 4, x.Plaza, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 6, x.Fraccionamiento, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 5, x.TipoVivienda, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 7, x.FechaProgramacion, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 8, x.mujer, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 9, x.hombre, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 10, x.ninos, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 11, x.amayores, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    formatoRows(row + counter, 12, x.total, '000000', 'FFFFFF', 'middle', 'center', false, ParticipantesWs)
                    counter++
                }
            }
            


            PatrocinadoresWs.mergeCells('B2:Q2');
            formatoRows(2, 2, "PATROCINADORES", 'FFFFFF', '2196F3', 'middle', 'center', true, PatrocinadoresWs)
            row = 3;
            column = 2;
            counter = 0
            let headersPatrocinadores = ["Id Evento", "Nombre del evento", "Plaza", "Tipo Vivienda", "Fraccionamiento", "Fecha Programación", "Fecha de reprogramación",
                "Motivo de Reprogramación", "Nombre Patrocinador", "Razon Social", "Calle", "Numero", "Telefono", "Celular", "Email"].forEach(x => {
                    formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', true, PatrocinadoresWs)
                    counter++
                })
           
            if (data.Patrocinadores !== null) {
                console.log(data.Patrocinadores)
                row = 4
                column = 2
                counter = 0
                for (let x of data.Patrocinadores) {
                    formatoRows(row + counter, 2, x.ID, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    //formatoRows(row + counter, 3, x.ClasificacionNombre, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 3, x.Nombre, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 4, x.Plaza, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 5, x.TipoVivienda, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 6, x.Fraccionamiento, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 7, x.FechaProgramacion, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 8, x.FechaReprogramacion, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 9, x.MotivoReprogramacion, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 10, x.NombrePatrocinador, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 11, x.RazonSocial, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 12, x.Calle, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 13, x.Numero, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 14, x.Telefono, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 15, x.Celular, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    formatoRows(row + counter, 16, x.Email, '000000', 'FFFFFF', 'middle', 'center', false, PatrocinadoresWs)
                    counter++
                }
            }
            

            ColaboradoresWs.mergeCells('B2:R2');
            formatoRows(2, 2, "COLABORADORES", 'FFFFFF', '2196F3', 'middle', 'center', true, ColaboradoresWs)
            row = 3;
            column = 2;
            counter = 0
            let headersColaboradores = ["Id Evento", "Nombre del evento", "Plaza", "Tipo Vivienda", "Fraccionamiento", "Fecha Programación", "Fecha de reprogramación",
                "Motivo de Reprogramación", "No. Empleado", "Nombre Colaborador", "Apellido Paterno", "Apellido Materno", "Email", "Puesto", "Staff", "Participante"].forEach(x => {
                    formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', true, ColaboradoresWs)
                    counter++
                })
           
            if (data.Colaboradores !== null) {
                row = 4
                column = 2
                counter = 0
                for (let x of data.Colaboradores) {
                    formatoRows(row + counter, 2, x.ID, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    //formatoRows(row + counter, 3, x.ClasificacionNombre, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 3, x.Nombre, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 4, x.Plaza, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 5, x.TipoVivienda, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 6, x.Fraccionamiento, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 7, x.FechaProgramacion, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 8, x.FechaReprogramacion, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 9, x.MotivoReprogramacion, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 10, x.NoEmpleado, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 11, x.NombreColaborador, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 12, x.ApellidoPaterno, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 13, x.ApellidoMaterno, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 14, x.Email, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 15, x.Puesto, '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 16, x.Staff ? 'SI' : 'NO', '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    formatoRows(row + counter, 17, x.Participante ? 'SI' : 'NO', '000000', 'FFFFFF', 'middle', 'center', false, ColaboradoresWs)
                    counter++
                }
            }
            
            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DetalleEventosActividadesCaptura.xlsx');
            });
        }
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]} style={{ background: '#fff' }}>
                <br />
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'inherit' }}>
                    <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Exportar"} onClick={this.onExport} style={{ marginRight: 5, Color:"white", backgroundColor: "#4EC9A2", float: 'rigth' }} />
                    <h3>Participantes</h3>
                    <div id="ParticipantesPPC" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                    <h3>Patrocinadores</h3>
                    <div id="PatrocinadoresPPC" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                    <h3>Colaboradores</h3>
                    <div id="ColaboradoresPPC" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                </div>
            </Column>

            </div>
        }
    });



    //========================================================================
    // MODAL Detalle
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
    const ConsultaEventosActPPCDetalleModal: any = global.connect(class extends React.Component<IConsultaEventosActPPC, {}>{
        constructor(props: IConsultaEventosActPPC) {
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
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let load;
            if (isSuccessful(EK.Store.getState().global.Load)) {
                load = getData(EK.Store.getState().global.Load).load;
            }
            return <modal.Modal id="ConsultaEventosActPPCDetalleModal" header={"Detalles del evento"} footer={this.footerModal()}
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
                                </Column>
                                <Column size={[12, 12, 12, 12]}>

                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={<span>Información del evento</span>}
                                        icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                                {/*<label.Label id="TipoLabel" label="Tipo" idForm={PAGE_ID} size={[12, 12, 2, 2]} />*/}
                                                <label.Label id="IdEvento" label="ID" idForm={PAGE_ID} size={[12, 12, 1, 1]} />
                                                <label.Label id="NombreEventoLabel" label="Nombre" idForm={PAGE_ID} size={[12, 12, 9, 9]} />
                                                <label.Label id="AlcanceEvento" label="Alcance del evento" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="TipoEvento" label="Tipo de evento" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="Plaza" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="TipoVivienda" label="Tipo de vivienda" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="Fraccionamiento" label="Fraccionamiento" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="FechaProgramacion" label="Fecha de programación" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="FechaReprogramacion" label="Fecha de Reprogramación" idForm={PAGE_ID} size={[12, 12, 6, 6]} />
                                                <label.Label id="MotivoReprogramacion" label="Motivo de reprogramacion" idForm={PAGE_ID} size={[12, 12, 6, 6]} />

                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]} >
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"PARTICIPANTES"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <Column size={[12, 12, 12, 12]}>
                                                <div className="widget-container">
                                                    <div id="DetParticipantes" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                    </div>
                                                </div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column >
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
                                                    <div id="DetPatrocinadores" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                    </div>
                                                </div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column >
                                <Column size={[12, 12, 12, 12]} >
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"COLABORADORES"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <Column size={[12, 12, 12, 12]}>
                                                <div className="widget-container">
                                                    <div id="DetColaboradores" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                    </div>
                                                </div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column >
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"ARCHIVOS PARTICIPANTES"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <div id="FilesParticipantes" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                            </div>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"ARCHIVOS PATROCINADORES"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <div id="FilesPatrocinadores" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                            </div>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"ARCHIVOS COLABORADORES"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <div id="FilesColaboradores" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
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