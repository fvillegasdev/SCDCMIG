namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEventosActAlta {
    const PAGE_ID: string = "ConsultaEventosActAlta";
    const PAGE_PENDIENTE_RESULT_ID: string = "ConsultaEventosActAlta";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_PENDIENTE_RESULT_ID]);
    declare const ExcelJS: any;
    declare const Set: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;

    export class Vista extends page.Base {
        componentDidMount(): void {
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowNew={false} allowSave={false} allowEdit={false} allowDelete={false}>
                <Filtros />
               
                {<ConsultaEventosActAltaDetalleModal />}

            </page.Main>;
        };
    }
    const initList = (idList: string, data: any): void => {
        let list = $(`#${idList}`).dxList({
            dataSource: data,
            displayExpr: 'Descripcion',
            noDataText: "Sin datos para mostrar",
        });
    }
    export interface IConsultaEventosActAlta extends page.IProps {
        plaza?: any;
        load?: any;
        EventData: any;
        PosiblesAlianzas: any;
        ObservacionesReq: any;
        Permisos: any;
        initList: (idList: string, data: any) => void
    };
    const loadEventData = (idEvent) => {
        let parametros = global.assign({
            ID: idEvent
        })
        dispatchSuccessful("load::Load", { load: true })

        global.asyncPost("base/kontrol/EventosActividades/GetBP/GetEventById/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    dispatchSuccessful("load::EventData", data, PAGE_ID)
                    dispatchSuccessful("load::Load", { load: false })
                    let datainit = [];
                    let ObservacionesReq = data.ObservacionesReq.length > 0 ? data.ObservacionesReq.map(x => { return { Descripcion: x.DescripcionObsReq } }) : [];
                    let Permisos = data.Permisos.length > 0 ? data.Permisos.map(x => { return { Descripcion: x.Permiso } }) : [];
                    let InvitadosEspeciales = data.InvitadosEspeciales.length > 0 ? data.InvitadosEspeciales.map(x => {
                        return {
                            FullNombre: `${x.Nombre} ${x.ApellidoPaterno} ${x.ApellidoMaterno}`,
                            Cargo: x.Cargo,
                            Confirmo: x.Confirmo
                        }
                    }) : [];
                    let FechaProgramacion = data.FechaProgramacion === null ? '' : data.FechaProgramacion.toLocaleDateString();
                    let FechaReprogramacion = data.FechaReprogramacion === null ? '' : data.FechaReprogramacion.toLocaleDateString();



                    Forms.updateFormElement(PAGE_ID, "TipoEventoAct", data.ClasificacionNombre);
                    Forms.updateFormElement(PAGE_ID, "IdEvento", data.ID);
                    Forms.updateFormElement(PAGE_ID, "NombreEventoLabel", data.Nombre);
                    Forms.updateFormElement(PAGE_ID, "AlcanceEvento", data.AlcanceEvento);
                    Forms.updateFormElement(PAGE_ID, "TipoEventoLabel", data.TipoEvento);
                    Forms.updateFormElement(PAGE_ID, "Plaza", data.Plaza);
                    Forms.updateFormElement(PAGE_ID, "TipoVivienda", data.TipoVivienda);
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", data.Fraccionamiento);
                    Forms.updateFormElement(PAGE_ID, "VolanteoLabel", data.Volanteo ? 'SI' : 'NO');
                    Forms.updateFormElement(PAGE_ID, "PrensaLabel", data.Prensa ? 'SI' : 'NO');
                    Forms.updateFormElement(PAGE_ID, "RedesLabel", data.Redes ? 'SI' : 'NO');
                    Forms.updateFormElement(PAGE_ID, "PerifoneoLabel", data.Perifoneo ? 'SI' : 'NO');
                    Forms.updateFormElement(PAGE_ID, "CorreoLabel", data.Correo ? 'SI' : 'NO');
                    Forms.updateFormElement(PAGE_ID, "MediosComunicacionLabel", data.MediosComunicacion ? 'SI' : 'NO');
                    Forms.updateFormElement(PAGE_ID, "FechaProgramacion", FechaProgramacion);
                    Forms.updateFormElement(PAGE_ID, "FechaReprogramacion", FechaReprogramacion);
                    Forms.updateFormElement(PAGE_ID, "MotivoReprogramacion", data.MotivoReprogramacion);
                    Forms.updateFormElement(PAGE_ID, "NumeroStaff", data.NumeroStaff);
                    Forms.updateFormElement(PAGE_ID, "MedioDifusion", data.MedioDifusion);
                    Forms.updateFormElement(PAGE_ID, "MetaAsistencia", data.MetaAsistencia);
                    Forms.updateFormElement(PAGE_ID, "Participantes", data.Participantes ? 'SI' : 'NO');
                    Forms.updateFormElement(PAGE_ID, "Empresas", data.Empresas ? 'SI' : 'NO');
                    Forms.updateFormElement(PAGE_ID, "ImpactoComunidad", data.ImpactoComunidad);
                    Forms.updateFormElement(PAGE_ID, "ClasificacionEventoLabel", data.ClasificacionEvento);
                    initList("ListPosiblesAlianzas", data.PosiblesAlianzas);
                    initList("ListObservacionesReq", ObservacionesReq);
                    initList("ListPermisos", Permisos);

                    let dataGrid = $("#InvitadosEspeciales").dxDataGrid({
                        dataSource: InvitadosEspeciales,
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
                            { caption: "NOMBRE", dataField: "FullNombre", alignment: 'left' },
                            { caption: "CARGO", dataField: "Cargo", alignment: 'left' },
                            { caption: "CONFIRMÓ", dataField: "Confirmo", alignment: 'left' },
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


    let Filtros: any = global.connect(class extends React.Component<IConsultaEventosActAlta, {}> {
        constructor(props: IConsultaEventosActAlta) {
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
        componentWillReceiveProps(nextProps: IConsultaEventosActAlta, nextState: IConsultaEventosActAlta): void {

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
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            const columns = [
                { caption: "ID", dataField: "ID" },
                //{ caption: "TIPO", dataField: "ClasificacionNombre" },
                { caption: "NOMBRE", dataField: "Nombre" },
                { caption: "ALCANCE DEL PROYECTO", dataField: "AlcanceEvento" },
                { caption: "TIPO EVENTO", dataField: "TipoEvento" },
                { caption: "PLAZA", dataField: "Plaza" },
                { caption: "TIPO DE VIVIENDA", dataField: "TipoVivienda" },
                { caption: "FRACCIONAMIENTO", dataField: "Fraccionamiento" },
                { caption: "VOLANTEO", dataField: "Volanteo" },
                { caption: "PRENSA", dataField: "Prensa" },
                { caption: "PERIFONEO", dataField: "Perifoneo" },
                { caption: "REDES SOCIALES", dataField: "Redes" },
                { caption: "CORREO ELECTRONICO", dataField: "Correo" },
                { caption: "MEDIOS DE COMUNICACIÓN", dataField: "MediosComunicacion" },
                { caption: "FECHA DE PROGRAMACIÓN", dataField: "FechaProgramacion", dataType: "datetime", format: "dd/MM/yyyy" },
                { caption: "FECHA DE REPROGRAMACIÓN", dataField: "FechaReprogramacion", dataType: "datetime", format: "dd/MM/yyyy" },
                { caption: "MOTIVO DE REPROGRAMACIÓN", dataField: "MotivoReprogramacion" },
                { caption: "NUMERO DE STAFF", dataField: "NumeroStaff" },
                //{ caption: "MEDIO DE DIFUSIÓN", dataField: "MedioDifusion" },
                { caption: "META DE ASISTENCIA", dataField: "MetaAsistencia" },
                { caption: "PARTICIPANTES", dataField: "Participantes" },
                { caption: "EMPRESAS", dataField: "Empresas" },
                { caption: "IMPACTO EN LA COMUNIDAD", dataField: "ImpactoComunidad" },
                { caption: "CLASIFICACIÓN DEL EVENTO", dataField: "ClasificacionEvento" },
                {
                    caption: "VER DETALLE",
                    type: 'buttons',
                    buttons: ['edit', {
                        hint: 'Clone',
                        icon: 'detailslayout',
                        onClick(e) {
                            let data = []
                            let idEvent = e.row.data.ID
                            loadEventData(idEvent)
                            let modalObject: any = $("#ConsultaEventosActAltaDetalle");

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
                                fileName: "ConsultaEventosActividadesAlta_" + fecha,
                                allowExportSelectedData: false
                            },
                            onExporting: function (e) {

                                e.cancel = true;
                                for (const d of data) {
                                    d.Empresas = d.Empresas ? 'SI' : 'NO';
                                    d.Participantes = d.Participantes ? 'SI' : 'NO';
                                    d.Volanteo = d.Volanteo ? 'SI' : 'NO';
                                    d.Prensa = d.Prensa ? 'SI' : 'NO';
                                    d.Perifoneo = d.Perifoneo ? 'SI' : 'NO';
                                    d.Redes = d.Redes ? 'SI' : 'NO';
                                    d.Correo = d.Correo ? 'SI' : 'NO';
                                    d.MediosComunicacion = d.MediosComunicacion ? 'SI' : 'NO';
                                }
                                e.cancel = false;
                                setTimeout(() => {
                                    for (const d of data) {
                                        d.Empresas = d.Empresas === 'SI' ? true : false
                                        d.Participantes = d.Participantes === 'SI' ? true : false
                                        d.Volanteo = d.Volanteo === 'SI' ? true : false
                                        d.Prensa = d.Prensa === 'SI' ? true : false
                                        d.Perifoneo = d.Perifoneo === 'SI' ? true : false
                                        d.Redes = d.Redes === 'SI' ? true : false
                                        d.Correo = d.Correo === 'SI' ? true : false
                                        d.MediosComunicacion = d.MediosComunicacion === 'SI' ? true : false
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
            //let Tipo = model.Tipo;
            let Nombre = model.NombreEvento === undefined ? null : model.NombreEvento.Nombre;
            let AlcanceEvento = model.Alcance;
            let TipoEvento = model.TipoEvento;
            let Plaza = model.PlazaInicial.ID;
            let TipoVivienda = model.Vocaciones.ID;
            let Fraccionamiento = global.filterFracc(model.Fraccionamientos)
           // let MediosDifusion = model.MediosDifusion.ID;
            let FechaInicial = model.FechaInicialA;
            let FechaFinal = model.FechaFinalA;
            let Participantes = model.Participantes === 'PARTICIPANTESI' ? 1 : model.Participantes === 'PARTICIPANTENO' ? 0 : -2;
            let Empresas = model.Empresas === 'EMPRESASI' ? 1 : model.Empresas === 'EMPRESANO' ? 0 : -2;
            let Impacto = model.Impacto;
            let ClasificacionEvento = model.ClasificacionEvento;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'
            let p: any = global.assign({
               // TIPO: Tipo,
                NOMBRE: Nombre,
                ALCANCEEVENTO: AlcanceEvento === null || AlcanceEvento === undefined ? '-2' : AlcanceEvento,
                TIPOEVENTO: TipoEvento === null || TipoEvento === undefined ? '-2' : TipoEvento,
                PLAZA: Plaza,
                TIPOVIVIENDA: TipoVivienda,
                FRACCIONAMIENTO: Fraccionamiento,
                //MEDIOSDIFUSION: MediosDifusion,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                PARTICIPANTES: Participantes,
                EMPRESA: Empresas,
                IMPACTOCOMUNIDAD: Impacto === null || Impacto === undefined ? '-2' : Impacto,
                CLASIFICACIONEVENTO: ClasificacionEvento === null || ClasificacionEvento === undefined ? '-2' : ClasificacionEvento,
                OPERACION: 'REPORTEALTA'
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
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Consulta Eventos Actividades Alta"}
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
                                            <RadioButton id="E" label="EVENTOS" value="Evento" idForm={PAGE_ID} groupName="Tipo" size={[12, 12, 6, 6]} />
                                            <RadioButton id="A" label="ACTIVIDADES" value="Actividades" idForm={PAGE_ID} groupName="Tipo" size={[12, 12, 6, 6]} />
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Column>*/}
                            <Column size={[12, 12, 6, 6]}>
                                <select.EventosActividades id="NombreEvento" key={"NombreEvento"} label="Nombre del evento o actividad" idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                                {/*<input.Text id="NombreEvento" label="Nombre del evento o actividad" idForm={PAGE_ID} size={[12, 12, 12, 12]} />*/}
                            </Column>
                            <Column size={[12, 12, 12, 12]}>
                                <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                                <ddl.VocacionesFilterDDL2 id="Vocaciones" label={"Tipo de vivienda"} idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                                {/*<ddl.TagsFraccionamientosV2 id="Fraccionamientos" idForm={config.id} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                                <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos"  idForm={config.id} /> 

                                {/*<ddl.TagsFraccionamientosV2 id="Fraccionamientos" idForm={config.id} size={[12, 12, 12, 6]} validations={[validations.required()]} required={true} />
                                <ddl.MediosDifusion id="MediosDifusion" selectAll={true} label="Medios de difusion" size={[12, 12, 3, 3]} />*/}
                                <DatePicker id="FechaInicialA" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                <DatePicker id="FechaFinalA" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            </Column>
                        </Column>
                    </Row>
                    <Row>
                        <Column size={[12, 12, 4, 4]} style={{ padding: '10px' }}>
                            <Row>

                            </Row>
                            <Row>
                                <Column size={[12, 12, 12, 12]} >
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={<span>ALCANCE DEL EVENTO</span>}
                                        icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                                <RadioButton id="INTERNO" label="INTERNO" idForm={PAGE_ID} change={() => this.changeColorButtons(1)} groupName="Alcance" size={[12, 12, 3, 3]} />
                                                <RadioButton id="EXTERNO" label="EXTERNO" idForm={PAGE_ID} change={() => this.changeColorButtons(1)} groupName="Alcance" size={[12, 12, 3, 3]} />
                                                <RadioButton id="AMBOS" label="AMBOS" idForm={PAGE_ID} change={() => this.changeColorButtons(1)} groupName="Alcance" size={[12, 12, 3, 3]} />
                                                <Button icon="fas fa-eraser" id="btnId1" className={"btn btn-xs"} size={[12, 12, 3, 3]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={() => { this.clearRadioButton("Alcance", "btnId1") }} />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>
                        </Column>
                        <Column size={[12, 12, 8, 8]} style={{ padding: '10px' }}>
                            <Row>

                            </Row>
                            <Row>
                                <Column size={[12, 12, 12, 12]} >
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={<span>TIPO DEL EVENTO</span>}
                                        icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                                        <Row>
                                            <Column size={[12, 12, 6, 6]} style={{ margin: "10px 0" }}>
                                                <RadioButton id="NUEVO" label="NUEVO" idForm={PAGE_ID} change={() => this.changeColorButtons(2)} groupName="TipoEvento" size={[12, 12, 6, 6]} />
                                                <RadioButton id="ORDINARIO" label="ORDINARIO" idForm={PAGE_ID} change={() => this.changeColorButtons(2)} groupName="TipoEvento" size={[12, 12, 6, 6]} />
                                            </Column>
                                            <Column size={[12, 12, 6, 6]} style={{ margin: "10px 0" }}>
                                                <RadioButton id="EXTRAORDINARIO" label="EXTRAORDINARIO" idForm={PAGE_ID} change={() => this.changeColorButtons(2)} groupName="TipoEvento" size={[12, 12, 6, 6]} />
                                                <RadioButton id="ESPECIAL" label="ESPECIAL" idForm={PAGE_ID} change={() => this.changeColorButtons(2)} groupName="TipoEvento" size={[12, 12, 5, 5]} />
                                                <Button icon="fas fa-eraser" id="btnId2" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={() => { this.clearRadioButton("TipoEvento", "btnId2") }} />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>
                        </Column>
                    </Row>

                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <page.OptionSection
                                id={PAGE_ID}
                                subTitle={"RECONOCIMIENTOS"}
                                level={1}
                                icon="fa fa-users"
                                collapsed={false}>
                                <Row style={{}}>
                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                        <b>PARTICIPANTES</b>
                                    </Column >
                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                        <RadioButton id="PARTICIPANTESI" label="SI" idForm={PAGE_ID} groupName="Participantes" change={() => this.changeColorButtons(3)} size={[12, 12, 6, 6]} />
                                        <RadioButton id="PARTICIPANTENO" label="NO" idForm={PAGE_ID} groupName="Participantes" change={() => this.changeColorButtons(3)} size={[12, 12, 5, 5]} />
                                        <Button icon="fas fa-eraser" id="btnId3" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={() => { this.clearRadioButton("Participantes", "btnId3") }} />
                                    </Column >
                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                        <b>EMPRESAS</b>
                                    </Column >
                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                        <RadioButton id="EMPRESASI" label="SI" idForm={PAGE_ID} change={() => this.changeColorButtons(4)} groupName="Empresas" size={[12, 12, 6, 6]} />
                                        <RadioButton id="EMPRESANO" label="NO" idForm={PAGE_ID} change={() => this.changeColorButtons(4)} groupName="Empresas" size={[12, 12, 5, 5]} />
                                        <Button icon="fas fa-eraser" id="btnId4" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={() => { this.clearRadioButton("Empresas", "btnId4") }} />
                                    </Column >
                                </Row>
                            </page.OptionSection>
                        </Column>
                        <Column size={[12, 12, 12, 12]} >
                            <page.OptionSection
                                id={PAGE_ID}
                                subTitle={"IMPACTO EN LA COMUNIDAD"}
                                level={1}
                                icon="fa fa-users"
                                collapsed={false}>
                                <Row style={{}}>
                                    <Column size={[12, 12, 12, 12]}>
                                        <RadioButton id="IMAGEN" label="IMAGEN" idForm={PAGE_ID} change={() => this.changeColorButtons(5)} groupName="Impacto" size={[12, 12, 2, 2]} />
                                        <RadioButton id="INTEGRACION" label="INTEGRACIÓN" idForm={PAGE_ID} change={() => this.changeColorButtons(5)} groupName="Impacto" size={[12, 12, 3, 3]} />
                                        <RadioButton id="SERVICIOS" label="APOYO A LA COMUNIDAD" idForm={PAGE_ID} change={() => this.changeColorButtons(5)} groupName="Impacto" size={[12, 12, 3, 3]} />
                                        <RadioButton id="SUSTENTABILIDAD" label="SUSTENTABILIDAD" idForm={PAGE_ID} change={() => this.changeColorButtons(5)} groupName="Impacto" size={[12, 12, 3, 3]} />
                                        <Button icon="fas fa-eraser" id="btnId5" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={() => { this.clearRadioButton("Impacto", "btnId5") }} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column >
                        <Column size={[12, 12, 12, 12]} >
                            <page.OptionSection
                                id={PAGE_ID}
                                subTitle={"CLASIFICACIÓN DE EVENTOS"}
                                level={1}
                                icon="fa fa-users"
                                collapsed={false}>
                                <Row style={{}}>
                                    <Column size={[12, 12, 12, 12]}>
                                        <RadioButton id="ACTIVIDAD" label="ACTIVIDAD" idForm={PAGE_ID} change={() => this.changeColorButtons(6)} groupName="ClasificacionEvento" size={[12, 12, 3, 3]} />
                                        <RadioButton id="EVENTO" label="EVENTO" idForm={PAGE_ID} change={() => this.changeColorButtons(6)} groupName="ClasificacionEvento" size={[12, 12, 3, 3]} />
                                        <RadioButton id="PROGRAMA" label="PROGRAMA" idForm={PAGE_ID} change={() => this.changeColorButtons(6)} groupName="ClasificacionEvento" size={[12, 12, 3, 3]} />
                                        <RadioButton id="CAMPAÑA" label="CAMPAÑA" idForm={PAGE_ID} change={() => this.changeColorButtons(6)} groupName="ClasificacionEvento" size={[12, 12, 2, 2]} />
                                        <Button icon="fas fa-eraser" id="btnId6" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={() => { this.clearRadioButton("ClasificacionEvento", "btnId6") }} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column >
                    </Row>
                    <Row>
                        <Column size={[12, 12, 12, 12]} >
                            {<ResultView />}
                        </Column>
                    </Row>
                </page.OptionSection>
                <EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEventosActCaptura.Filtros />
                <EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEventosActPPC.Filtros />
            </Column>;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IConsultaEventosActAlta, {}> {
        constructor(props: IConsultaEventosActAlta) {
            super(props);
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
    // MODAL DETALLES
    //========================================================================
    const ConsultaEventosActAltaDetalleModal: any = global.connect(class extends React.Component<IConsultaEventosActAlta, {}>{
        constructor(props: IConsultaEventosActAlta) {
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
        componentWillReceiveProps(nextProps: IConsultaEventosActAlta, nextState: IConsultaEventosActAlta): void {
            if (hasChanged(this.props.PosiblesAlianzas, nextProps.PosiblesAlianzas) && global.isSuccessful(nextProps.PosiblesAlianzas)) {
                if (isSuccessful(nextProps.PosiblesAlianzas)) {
                    let data: any = global.getData(nextProps.PosiblesAlianzas);
                    console.log("will")
                    initList("ListPosiblesAlianzas", data)
                };
            };
            if (hasChanged(this.props.ObservacionesReq, nextProps.ObservacionesReq) && global.isSuccessful(nextProps.ObservacionesReq)) {
                if (isSuccessful(nextProps.ObservacionesReq)) {
                    let data: any = global.getData(nextProps.ObservacionesReq);
                    initList("ListObservacionesReq", data)
                };
            };
            if (hasChanged(this.props.Permisos, nextProps.Permisos) && global.isSuccessful(nextProps.Permisos)) {
                if (isSuccessful(nextProps.Permisos)) {
                    let data: any = global.getData(nextProps.Permisos);
                    initList("ListPermisos", data)
                };
            };
        }
        onExport() {
            const workbook = new ExcelJS.Workbook();
            const ws = workbook.addWorksheet('Detalle de evento');
            const data = getData(EK.Store.getState().global.EventData);
            console.log(data)

            let header1 = ['Id', 'Nombre del evento', 'Alcance del evento', 'Tipo evento', 'Plaza'];
            let data1 = [data.ID, data.Nombre.toUpperCase(), data.AlcanceEvento.toUpperCase(), data.TipoEvento, data.Plaza]
            let header2 = ['Tipo de vivienda', 'Fraccionamiento', 'Fecha de programación', 'Fecha de Reprogramación', 'Motivo de reprogramación', 'Numero de staff'];
            let data2 = [data.TipoVivienda, data.Fraccionamiento, data.FechaProgramacion, data.FechaReprogramacion, data.MotivoReprogramacion, data.NumeroStaff];
            let header3 = ['Meta de asistencia', 'Participantes', 'Empresas', 'Impacto en la comunidad', 'Clasificacio del evento'];
            let data3 = [data.MetaAsistencia, data.Participantes ? 'SI' : 'NO', data.Empresas ? 'SI' : 'NO', data.ImpactoComunidad, data.ClasificacionEvento]

            let row = 2;
            let column = 2;
            let counter = 0
            for (let x of header1) {
                formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
                counter++
            }
            row = 3
            counter = 0
            for (let x of data1) {
                formatoRows(row, column + counter, x, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
            }
            row = 5
            counter = 0

            for (let x of header2) {
                formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
                counter++
            }
            row = 6
            counter = 0
            for (let x of data2) {
                formatoRows(row, column + counter, x, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
            }
            row = 8
            counter = 0

            for (let x of header3) {
                formatoRows(row, column + counter, x, 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
                counter++
            }
            row = 9
            counter = 0
            for (let x of data3) {
                formatoRows(row, column + counter, x, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
            }

            row = 12
            counter = 1
            let counterRows = 1
            ws.mergeCells('B11:D11');
            formatoRows(11, column, 'Invitados Especiales', 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
            formatoRows(row, column, 'Nombre', 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
            formatoRows(row, column + 1, 'Cargo', 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
            formatoRows(row, column + 2, 'Confirmo', 'FFFFFF', '2196F3', 'middle', 'center', true, ws)

            for (let x of data.InvitadosEspeciales) {
                formatoRows(row + counter, 2, `${x.Nombre} ${x.ApellidoPaterno} ${x.ApellidoMaterno}`, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                formatoRows(row + counter, 3, x.Cargo, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                formatoRows(row + counter, 4, x.Confirmo ? 'SI' : 'NO', '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
                counterRows++
            }

            let nextRow = row + counterRows + 1;
            counter = 1
            formatoRows(nextRow, column, 'Posibles Alianzas', 'FFFFFF', '2196F3', 'middle', 'center', true, ws)

            for (let x of data.PosiblesAlianzas) {
                formatoRows(nextRow + counter, column, x.Descripcion, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
            }

            nextRow = row + counterRows + 1;
            column = 4;
            counter = 1
            formatoRows(nextRow, column, 'Observaciones y Requerimientos', 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
            for (let x of data.ObservacionesReq) {
                formatoRows(nextRow + counter, column, x.DescripcionObsReq, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
            }

            nextRow = row + counterRows + 1;
            column = 6;
            counter = 1
            formatoRows(nextRow, column, 'Permisos', 'FFFFFF', '2196F3', 'middle', 'center', true, ws)
            for (let x of data.Permisos) {
                formatoRows(nextRow + counter, column, x.Permiso, '000000', 'FFFFFF', 'middle', 'center', false, ws)
                counter++
            }



            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DetalleEventosActividades.xlsx');
            });
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let load;
            if (isSuccessful(EK.Store.getState().global.Load)) {
                load = getData(EK.Store.getState().global.Load).load;
            }
            return <modal.Modal id="ConsultaEventosActAltaDetalle" header={"Detalles del evento"} footer={this.footerModal()}
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
                                                <label.Label id="IdEvento" label="ID" idForm={PAGE_ID} size={[12, 12, 1, 1]} />
                                                <label.Label id="NombreEventoLabel" label="Nombre" idForm={PAGE_ID} size={[12, 12, 11,11]} />
                                                <label.Label id="AlcanceEvento" label="Alcance del evento" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="TipoEventoLabel" label="Tipo de evento" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="Plaza" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="TipoVivienda" label="Tipo de vivienda" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="Fraccionamiento" label="Fraccionamiento" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="VolanteoLabel" label="Volanteo" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="PrensaLabel" label="Prensa" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="PerifoneoLabel" label="Perifoneo" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="RedesLabel" label="Redes Sociales" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="CorreoLabel" label="Correo Electronico" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="MediosComunicacionLabel" label="Medios de comunicación" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="FechaProgramacion" label="Fecha de programación" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                <label.Label id="FechaReprogramacion" label="Fecha de Reprogramación" idForm={PAGE_ID} size={[12, 12, 6, 6]} />
                                                <label.Label id="MotivoReprogramacion" label="Motivo de reprogramacion" idForm={PAGE_ID} size={[12, 12, 6, 6]} />
                                                <label.Label id="NumeroStaff" label="Numero de Staff" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                                                {/*<label.Label id="MedioDifusion" label="Medio de difusión" idForm={PAGE_ID} size={[12, 12, 4, 4]} />*/}
                                                <label.Label id="MetaAsistencia" label="MetaAsistencia" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                                                <label.Label id="Participantes" label="Participantes" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                                                <label.Label id="Empresas" label="Empresas" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                                                <label.Label id="ImpactoComunidad" label="Impacto en la comunidad" idForm={PAGE_ID} size={[12, 12, 6, 6]} />
                                                <label.Label id="ClasificacionEventoLabel" label="Clasificacion del Evento" idForm={PAGE_ID} size={[12, 12, 4, 4]} />

                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>

                                </Column>
                                <Column size={[12, 12, 12, 12]} >
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"POSIBLES ALIANZAS"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <Column size={[12, 12, 12, 12]}>
                                                <div className="widget-container">
                                                    <div id="ListPosiblesAlianzas"></div>
                                                </div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column >
                                <Column size={[12, 12, 12, 12]} >
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"OBSERVACIONES Y REQUERIMIENTOS"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <Column size={[12, 12, 12, 12]}>
                                                <div className="widget-container">
                                                    <div id="ListObservacionesReq"></div>
                                                </div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column >
                                <Column size={[12, 12, 12, 12]} >
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"PERMISOS"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <Column size={[12, 12, 12, 12]}>
                                                <div className="widget-container">
                                                    <div id="ListPermisos"></div>
                                                </div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column >
                                <Column size={[12, 12, 12, 12]} >
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"INVITADOS ESPECIALES"}
                                        level={1}
                                        icon="fa fa-users"
                                        collapsed={false}>
                                        <SectionButtons >
                                        </SectionButtons >
                                        <Row >
                                            <Column size={[12, 12, 12, 12]}>
                                                <div className="widget-container">
                                                    <div id="InvitadosEspeciales" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                    </div>
                                                </div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column >

                            </Row>
                        </Column> : null
                    }
                </Row>
            </modal.Modal>
        };
    });
}