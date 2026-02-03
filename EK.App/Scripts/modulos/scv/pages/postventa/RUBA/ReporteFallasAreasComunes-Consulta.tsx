namespace EK.Modules.SCV.Pages.postventa.RUBA.ReporteFallasAreasComunesConsulta {
    //Constantes
    const PAGE_ID: string = "ConsultaReporteAreasComunes";
    const PAGE_RESULT: string = "ConsultaReporteAreasComunesResult";
    const PAGE_ESTATUS_DIAGNOSTICO_ID: string = "reportesConsulta$estatusDiagnostico";
    const PAGE_ESTATUS_PARTIDA_DIAGNOSTICO_ID: string = "reportesConsulta$estatusPartidaDiagnostico";

    // FOLIO
    const FolioEstatusNuevo: string = "FN";
    const FolioEstatusTerminado: string = "FT";
    const FolioEstatusCancelado: string = "FX";
    const FolioEstatusTodos: string = "FALL";
    //DIAGNOSTICO
    const DIAGNOSTICO_TODOS_VALUE: string = "DiagnosticoTodosStatus";
    const DIAGNOSTICO_ABIERTO_VALUE: string = "DiagnosticoAbiertoStatus";
    const DIAGNOSTICO_CERRADO_VALUE: string = "DiagnosticoCerradoStatus";
    //PARTIDADIAGNNOSTICO
    const PARTIDA_DIAGNOSTICO_ABIERTO_VALUE: string = "PartidaDiagnosticoAbiertoStatus";
    const PARTIDA_DIAGNOSTICO_ACEPTADO_VALUE: string = "PartidaDiagnosticoAceptadoStatus";
    const PARTIDA_DIAGNOSTICO_NOPROCEDE_VALUE: string = "PartidaDiagnosticoNoProcedeStatus";
    const PARTIDA_DIAGNOSTICO_TODOS_VALUE: string = "PartidaDiagnosticoTodosStatus";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_RESULT]);
    // OT
    const OTEstatusNuevo: string = "OTN";
    const OTEstatusEnProceso: string = "OTEP";
    const OTEstatusTerminado: string = "OTT";
    const OTEstatusCancelado: string = "OTC";
    const OTEstatusTodos: string = "OTALL";
    //
    const filterFracc = (Fraccionamientos: any) => {
        let fracc: string = "";
        for (const x in Fraccionamientos) {
            fracc += Fraccionamientos[x].Clave + ","
        }
        let count = fracc.length;
        let fraccparams = fracc.slice(0, count - 1);
        return fraccparams;
    };
    //
    
    //interfaces
    interface IConsultaReporteAreasComunes extends page.IProps {
        plaza?: any;
        tipoFalla?: any;
    }
    
    export class Vista extends page.Base {

        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowSave={false} allowEdit={false} allowDelete={false} allowNew={false}>
                <Filtros />
                <ResultView style={{ paddingBottom: "50px" }}/>
            </page.Main>;
        };
    };

    let Filtros: any = global.connect(class extends React.Component<IConsultaReporteAreasComunes, {}> {

        constructor(props: IConsultaReporteAreasComunes) {
            super(props)
            this.onSearch = this.onSearch.bind(this);

        }

        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            plaza: state.global.Plaza_Seleccionada,
            data: global.getData(state.global.currentCatalogo),
            entity: global.getData(state.global.currentEntity),
            tipoFalla: EK.Store.getState().global.TipoFalla_Seleccionada
        });
        ValidateParams(){
            let model: any = Forms.getValues(PAGE_ID);
            let CausaFalla = model.CausaFalla.ID;
            let Contratista = model.Contratista.ID;
            let TipoContratista = model.TipoContratista.ID;
            let Falla = model.Falla.ID;
            let FechaInicial = model.FechaInicial;
            let FechaFinal = model.FechaFinal;
            let Fraccionamiento = filterFracc(model.Fraccionamientos);
            let MedioSolicitud = model.MedioSolicitud.ID;
            let MotivoCancelacion = model.Motivo.ID;
            let MotivoCancelacionTodos = model.MotivoCancelacionTodos;
            let OpcionesEstatusFolio = model.OpcionesEstatusFolio;
            let OpcionesDiagEstatus = model.OpcionesDiagEstatus;
            let OpcionesPartDiagEstatus = model.OpcionesPartDiagEstatus;
            let OpcionesEstatusOT = model.OpcionesEstatusOT;
            let Plaza = model.PlazaInicial.ID;
            let TipoCliente = model.TipoCliente.Clave;
            let TipoFalla = model.TipoFalla.ID;
            let UbicacionFalla = model.UbicacionFalla.ID
            let Vocacion = model.Vocaciones.ID;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'
            if (OpcionesEstatusFolio) {
                switch (OpcionesEstatusFolio) {
                    case "FN": OpcionesEstatusFolio = "N"; break;
                    case "FT": OpcionesEstatusFolio = "T"; break;
                    case "FX": OpcionesEstatusFolio = "X"; break;
                    case "FALL": OpcionesEstatusFolio = -2; break;
                }
            }
            if (OpcionesEstatusFolio === "X") {
                if (MotivoCancelacionTodos) {
                    MotivoCancelacion = -2;
                } 
            } else {
                MotivoCancelacion = null;
            }

            if (OpcionesEstatusOT) {
                switch (OpcionesEstatusOT) {
                    case "OTN": OpcionesEstatusOT = "1090"; break;
                    case "OTEP": OpcionesEstatusOT = "1110"; break;
                    case "OTT": OpcionesEstatusOT = "1091"; break;
                    case "OTC": OpcionesEstatusOT = "1095"; break;
                    case "OTALL": OpcionesEstatusOT = -2; break;
                }
            }
            if (OpcionesDiagEstatus) {
                switch (OpcionesDiagEstatus) {
                    case "DiagnosticoAbiertoStatus": OpcionesDiagEstatus = "I"; break;
                    case "DiagnosticoCerradoStatus": OpcionesDiagEstatus = "C"; break;
                    case "DiagnosticoTodosStatus": OpcionesDiagEstatus = -2; break;
                };
            };
            if (OpcionesPartDiagEstatus) {
                switch (OpcionesPartDiagEstatus) {
                    case "PartidaDiagnosticoAbiertoStatus": OpcionesPartDiagEstatus = "ABIERTO"; break;
                    case "PartidaDiagnosticoAceptadoStatus": OpcionesPartDiagEstatus = "ACEPTADO"; break;
                    case "PartidaDiagnosticoNoProcedeStatus": OpcionesPartDiagEstatus = "NO PROCEDE"; break;
                    case "PartidaDiagnosticoTodosStatus": OpcionesPartDiagEstatus = -2; break;
                };
            };

            let parametros = {
                CausaFalla: CausaFalla,
                Contratista: Contratista,
                TipoContratista: TipoContratista,
                Falla: Falla,
                FechaInicial: FechaInicial,
                FechaFinal: FechaFinal,
                Fraccionamiento: Fraccionamiento,
                MedioSolicitud: MedioSolicitud,
                MotivoCancelacion: MotivoCancelacion,
                OpcionesEstatusFolio: OpcionesEstatusFolio,
                OpcionesDiagEstatus: OpcionesDiagEstatus,
                OpcionesPartDiagEstatus: OpcionesPartDiagEstatus,
                OpcionesEstatusOT: OpcionesEstatusOT,
                Plaza: Plaza,
                TipoCliente: TipoCliente,
                TipoFalla: TipoFalla,
                UbicacionFalla: UbicacionFalla,
                Vocacion: Vocacion,
                Segmento: segmento
            }
            if (parametros.Fraccionamiento === "" || parametros.Fraccionamiento === null || parametros.Fraccionamiento === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            return parametros;
        }
        Columns() {
            let summaryText = '';
            const columnas = [
                {
                    caption: "Folio", dataField: "Folio", groupIndex: 0,
                    groupCellTemplate: function (cellElement, cellInfo) {
                        let total = '0';
                        let estatus = cellInfo.text;
                        if (!cellInfo.row.isExpanded) {
                            total = cellInfo.data.collapsedItems.length;
                            summaryText = `Folio ${estatus} (TOTAL ${total})`;
                            localStorage.setItem('TotalFolios$' + cellInfo.text, total);
                        } else {
                            if (localStorage.getItem('TotalFolios$' + estatus) !== null) {
                                total = localStorage.getItem('TotalFolios$' + estatus)
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
                { caption: "Estatus Reporte", dataField: "EstatusFolio", },
                { caption: "Fecha Reporte", dataField: 'FechaReporte', dataType: 'datetime', format: 'dd/MM/yyyy' },
                { caption: "Fecha Terminado", dataField: 'FechaAtencion', dataType: 'datetime', format: 'dd/MM/yyyy' },
                { caption: "Fecha Cancelacion Folio", dataField: 'FechaCancelacionFolio',},
                { caption: "Dias Reporte Abierto", alignment: "center", dataField: "DiasPromedio" },
                { caption: "Dias Transcurridos", alignment: "center", dataField: "DiasTranscurridos" },
                { caption: "# Incidencia", dataField: "NoIncidencia", alignment: "center" },
                { caption: "# Cliente", dataField: "IdCliente" },
                { caption: "Cliente", dataField: "Cliente" },
                { caption: "Tipo Cliente", dataField: "TipoClienteNombre" },
                { caption: "# Plaza", dataField: "IdPlaza", alignment: "center", width: 200 },
                { caption: "Plaza", dataField: "Plaza", alignment: "center", width: 200 },
                { caption: "# Fraccionamiento", dataField: "ClaveFraccionamiento" },
                { caption: "Nombre Fraccionamiento", dataField: "Fraccionamiento" },
                { caption: "# Contratista", dataField: "IdContratista" },
                { caption: "Contratista", dataField: "Contratista" },
                { caption: "Tipo Contratista", dataField: "TipoContratista" },
                { caption: "Dias promedio contratista", dataField: "DiasPromedioContratista", alignment: "center" },
                { caption: "Vocacion", dataField: "Vocacion" },
                { caption: "# Responsable", dataField: "IdResponsable" },
                { caption: "Responsable", dataField: "Responsable", alignment: "left" },
                { caption: "# Diagnostico", dataField: "IdDiagnostico", alignment: "center" },
                { caption: "F. Diagnostico Creado", dataField: "FechaCreadoDictamen",},
                { caption: "F. Diagnostico Terminado", dataField: "FechaFinDictamen",  },
                { caption: "F. Diagnostico Cancelado", dataField: "FechaCancelacionDictamen",  },
                { caption: "F. Inicio Agenda Diagnostico", dataField: "FechaInicioAgendaDictamen", alignment: "center",   },
                { caption: "Estatus Diagnostico", dataField: "EstatusDictamen", alignment: "center" },
                { caption: "Estatus Inc. Diag. ", dataField: "EstatusIncidenciaDictamen" },
                { caption: "# Orden de trabajo", dataField: "IdOT", alignment: "center" },
                { caption: "Estatus OT", dataField: "EstatusOT", alignment: "center" },
                { caption: "Fecha Creacion OT", dataField: "FechaCreacionOT", alignment: "center", },
                { caption: "F. Inicio Agenda", dataField: "FechaInicioAgenda", alignment: "center", dataType: 'datetime', format: 'dd/MM/yyyy' },
                { caption: "F. Inicio Real", dataField: "FechaInicioReal", alignment: "center", },
                { caption: "F. Fin Real", dataField: "FechaFinReal", alignment: "center",  },
                { caption: "F. Cancelacion OT", dataField: "FechaCancelacionOT", alignment: "center",},
                { caption: "Calle A", dataField: "CalleA" },
                { caption: "Calle B", dataField: "CalleB" },
                { caption: "Días Solución", alignment: "center", dataField: "DiasSolucion" },
                { caption: "Tipo Incidencia", dataField: "TipoIncidencia" },
                { caption: "Incidencia", dataField: "Incidencia" },
                { caption: "Ubicacion Incidencia", dataField: "UbicacionIncidencia" },
                { caption: "Causa Incidencia", dataField: "CausaIncidencia" },
                { caption: "Medio Solicitud", dataField: "MedioSolicitud" },
                { caption: "Observaciones Cliente", dataField: "ObservacionesCliente" },
                { caption: "Observaciones Contratista", dataField: "ObservacionesContratista" },
                { caption: "Observaciones a Nivel Folio", dataField: "ObservacionesFolio" },
                { caption: "Motivo Cancelacion", dataField: "MotivoCancelacion" },
                { caption: "Dias Promedio", dataField: "DiasPromedio", alignment: "center" },
                { caption: "Incidencia Procede", dataField: "IncidenciaProcede" },
                { caption: "Finalizado Por", dataField: "UsuarioProcesoFin" },
                
            ];
            return columnas;
        }
        onSearch(): void {
            let parametros = this.ValidateParams();
            const columns = this.Columns();
            if (parametros === undefined) {
                return;
            }
            console.log(parametros);
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            global.asyncPost("base/kontrol/ConsultaReporteAreasComunes/GetBP/GetConsulta/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
                            },
                            searchPanel: {
                                visible: true
                            },
                            onExporting: function (e) {

                                e.cancel = true;
                                for (const d of data) {
                                    d.IncidenciaProcede = d.IncidenciaProcede ? 'SI' : 'NO';

                                }
                                e.cancel = false;
                            },
                            export: {
                                enabled: true,
                                fileName: "Reporte_Fallas_Areas_Comunes" + fecha,
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
                            columns: columns,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: false,
                            rowAlternationEnabled: true
                        }).dxDataGrid("instance");
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
        componentDidMount(): void {
            global.dispatchSuccessful("global-page-catalogo", null, PAGE_RESULT);
            Forms.updateFormElement(PAGE_ID, "OpcionesEstatusOT", null); 
            Forms.updateFormElement(PAGE_ID, "OpcionesDiagEstatus", null); 
            Forms.updateFormElement(PAGE_ID, "OpcionesPartDiagEstatus", null); 
            Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Contratista", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement(PAGE_ID, "TipoFalla", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement(PAGE_ID, "Falla", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement(PAGE_ID, "CausaFalla", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement(PAGE_ID, "UbicacionFalla", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement(PAGE_ID, "TipoCliente", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement(PAGE_ID, "TipoContratista", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            dispatchAsyncPost("load::SPVMOTIVOS", "scv/reportesFallas/GetMotivosCancelacionFolio/");

        };
        componentWillReceiveProps(nextProps: IConsultaReporteAreasComunes, nextState: IConsultaReporteAreasComunes): void {
            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
            if (global.hasChanged(this.props.tipoFalla, nextProps.tipoFalla)) {
                Forms.updateFormElement(PAGE_ID, "Falla", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            }
        };
        setEstatusCancelado(cancelado) {
            let s = document.getElementById('seccionCancelado');
            cancelado === true ? s.style.display = 'block' : s.style.display = 'none';
        }
        changeColorButtons(id) {
            let x = document.getElementById('btnId' + id);
            x.style.background = '#36C6D3';
        }
        clearEstatusDiagnostico() {
            let model: any = Forms.getValues(config.id);
            Forms.updateFormElement(config.id, "OpcionesDiagEstatus", null);
            let x = document.getElementById('btnId1');
            x.style.background = '#ccc';
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
        render(): JSX.Element {
            let idForm: any = EK.Store.getState().forms[PAGE_ID] ? EK.Store.getState().forms[PAGE_ID] : null;
            let color: string = "#d26c35";
            // let className: string = "font-white";
            let className: string = "";
            if (idForm === null || idForm === undefined) {

            } else {
                if (idForm.hasChanged) {
                    color = "white";
                    className = " btn-editing";
                }
            }

            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Reporte de Incidencias Areas Comunes."}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button className={className} keyBtn={"btnSPVFiltrarInformacion"} iconOnly={true} color={color} icon="fa fa-search" onClick={this.onSearch} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row style={{ padding: '10px' }}>
                        <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>

                            <ddl.PlazasDDL id="PlazaInicial" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                            <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                            {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 4, 4]} />*/}
                            <consultas.SPVContratistasConsulta id="Contratista" idForm={PAGE_ID} size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                            <TipoContratistasConsulta id="TipoContratista" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <DatePicker id="FechaInicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            <DatePicker id="FechaFinal" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            <TipoFallasAreaComunDDL id={"TipoFalla"} selectAll={true} validations={[validations.required()]} required={true} size={[12, 12, 3, 3]} label={"Tipo Incidencia"} idFormSection={PAGE_ID} />
                            <FallaAreaComunDDL id="Falla" validations={[validations.required()]} required={true} label={"Incidencia Area Comun"} size={[12, 12, 3, 3]} idFormSection={PAGE_ID} />
                            <UbicacionFallaDDL id={"UbicacionFalla"} validations={[validations.required()]} required={true} size={[12, 12, 3, 3]} label={"Ubicacion Incidencia"} idFormSection={PAGE_ID} />
                            <CausaFallaDDL id={"CausaFalla"} validations={[validations.required()]} required={true} size={[12, 12, 3, 3]} label={"Causa Incidencia"} idFormSection={PAGE_ID} />
                            <TipoClienteDDL idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <ddl.SPVMediosComunicacionDDL id="MedioSolicitud" size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />

                        </Column>
                    </Row>
                  
                    <Row style={{ padding: '10px' }}>
                        <Column>
                            <page.OptionSection
                                title="Estatus de folio"
                                icon="fas fa-cog" level={2} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <RadioButton id={FolioEstatusNuevo} label="Nuevo" idForm={config.id} value="FN" groupName="OpcionesEstatusFolio" size={[12, 12, 3, 3]} change={() => this.setEstatusCancelado(false)} />
                                        <RadioButton id={FolioEstatusTerminado} label="Terminado" value="FT" idForm={config.id} groupName="OpcionesEstatusFolio" size={[12, 12, 3, 3]} change={() => this.setEstatusCancelado(false)} />
                                        <RadioButton id={FolioEstatusCancelado} label="Cancelado" value="FX" idForm={config.id} groupName="OpcionesEstatusFolio" size={[12, 12, 3, 3]} change={() => this.setEstatusCancelado(true)} />
                                        <RadioButton id={FolioEstatusTodos} label="Todos" value="FALL" idForm={config.id} groupName="OpcionesEstatusFolio" size={[12, 12, 3, 3]} change={() => this.setEstatusCancelado(false)} />
                                    </Column>
                                </Row>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                                        <span id="seccionCancelado" style={{ display: 'none' }}>
                                            <MotivosreprogDDL id="Motivo" label="Motivo de cancelacion" size={[12, 12, 10, 10]} />
                                            <checkBox.CheckBox id="MotivoCancelacionTodos" label="Todos" idForm={config.id} size={[12, 12, 2, 2]} />
                                        </span>
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </Row>
                    <Row style={{ padding: '10px' }}>
                        <Column size={[12, 12, 6, 6]}>
                            <page.OptionSection
                                id={PAGE_ESTATUS_DIAGNOSTICO_ID}
                                icon="fas fa-cog" level={2} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <RadioButton id={DIAGNOSTICO_ABIERTO_VALUE} label="Abierto" idForm={config.id} value="I" groupName="OpcionesDiagEstatus" change={() => this.changeColorButtons(1)} size={[12, 12, 4, 4]} />
                                        <RadioButton id={DIAGNOSTICO_CERRADO_VALUE} label="Cerrado" idForm={config.id} value="C" groupName="OpcionesDiagEstatus" change={() => this.changeColorButtons(1)} size={[12, 12, 4, 4]} />
                                        <RadioButton id={DIAGNOSTICO_TODOS_VALUE} label="Todos" idForm={config.id} value="T" groupName="OpcionesDiagEstatus" change={() => this.changeColorButtons(1)} size={[12, 12, 3, 3]} />
                                        <Button icon="fas fa-eraser" id="btnId1" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={this.clearEstatusDiagnostico} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                        <Column size={[12, 12, 6, 6]}>
                            <page.OptionSection
                                id={PAGE_ESTATUS_PARTIDA_DIAGNOSTICO_ID}
                                icon="fas fa-cog" level={2} collapsed={false} hideCollapseButton={true}>
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
                    </Row>
                    <Row style={{ padding: '10px' }}>
                        <Column>
                            <page.OptionSection
                                title="Estatus de OT"
                                icon="fas fa-cog" level={2} collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <RadioButton id={OTEstatusNuevo} label="Nuevo" idForm={config.id} value="OTN" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                        <RadioButton id={OTEstatusEnProceso} label="En proceso" idForm={config.id} value="OTEP" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                        <RadioButton id={OTEstatusTerminado} label="Terminado" idForm={config.id} value="OTT" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                        <RadioButton id={OTEstatusCancelado} label="Cancelado" idForm={config.id} value="OTC" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                        <RadioButton id={OTEstatusTodos} label="Todos" idForm={config.id} value="OTALL" change={() => this.changeColorButtons(3)} groupName="OpcionesEstatusOT" size={[12, 12, 2, 2]} />
                                        <Button icon="fas fa-eraser" id="btnId3" className={"btn btn-xs"} size={[12, 12, 1, 1]} style={{ backgroundColor: '#ccc', color: "#FFFFFF", border: 'none' }} onClick={this.clearEstatusOT} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </Row>
                </page.OptionSection>
            </Column>;

        }
    });


    export let ResultView: any = page.connect(class extends page.Base {

        constructor(props: IConsultaReporteAreasComunes) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            data: global.getData(state.global.currentCatalogo),
        });
        componentWillReceiveProps(nextProps: IConsultaReporteAreasComunes, nextState: IConsultaReporteAreasComunes): void {
            if (getData(nextProps.data) !== getData(this.props.data)) {
                // this.props.data = null;
            }
        }
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]}>

                <br />
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'inherit' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom:'50px' }}></div>
                </div>

            </Column></div>
        }
    });
};
