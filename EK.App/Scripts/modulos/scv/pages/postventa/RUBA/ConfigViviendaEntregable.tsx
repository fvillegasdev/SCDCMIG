/// <reference path="consultaviviendaentregable.tsx" />
namespace EK.Modules.SCV.Pages.postventa.RUBA.ConfigViviendaEntregable {
    const PAGE_ID: string = "ConfigViviendaEntregable";
    const PAGE_ENTREGA_RESULT_ID: string = "ConfigViviendaEntregableResult";
    const SECTION_CAPTURA_CAMPOS: string = "CapturaCampos";
    const SECTION_CHECKLIST: string = "Checklist";
    const SECTION_CHECKLIST_PROGRAMADOS: string = "ChecklistProgramados";
    const RADIO_OBSCTE_SI: string = "ObsClienteSI";
    const RADIO_OBSCTE_NO: string = "ObsClienteNO";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_ENTREGA_RESULT_ID]);

    export class EstatusCalendarDashBoardInfo {
        static iconos: any = {
            'ACT': "glyphicon glyphicon-play",   //ACTIVO
            'W': "fas fa-exclamation-triangle",                //POR VENCER
            'V': "far fa-calendar-times",           //VENCIDO
            'REP': "icon-loop",                  //REPROGRAMADO
            'ATE': "fa fa-check",               //ATENDIDAS
            'SUS': "fas fa-calendar-times",     // CANCELADA
            'CAN': "fas fa-calendar-times",
            'SINMARCA': ""                       //SIN MARCA
        };

        static iconosColor: any = {
            'ACT': "#8bc780",                 //ACTIVO
            'W': "#ff8f00",                 //POR VENCER
            'V': "#df0707",                 //VENCIDO
            'REP': "",                       //REPROGRAMADO
            'SUS': "",                       //REPROGRAMADO
            'CAN': "#df0707",               //CANCELADA
            'ATE': "#8bc780",                //ATENDIDAS
            'SINMARCA': ""                    //REQUISITO VENCIDO
        };

        static tituloCita: any = {
            'ACT': "Planifición a tiempo",                 //ACTIVO
            'W': "Planificación por Vencer",                 //POR VENCER
            'V': "Planificación Vencida",                 //VENCIDO
            'REP': "Planificación Reprogramada",                       //REPROGRAMADO
            'SUS': "Planificación Suspendida",                       //REPROGRAMADO
            'ATE': "Planificación Atendida",                //ATENDIDAS
            'SINMARCA': ""                    //REQUISITO VENCIDO
        };
    };
    ///
    interface IConfigEntregaViv extends page.IProps {
        ImpresionDocumentos?: any;
    };
    //
    const formatBadgeOk: (data: boolean, type: any, row: any) => any = (data: any, type: any, row: any[]): any => {
        return <div style={{ textAlign: "center" }}>{label.ok(data)}</div>
    };
    //
    const formatDate: (data: boolean, type: any, row: any) => any = (data: any, type: any, row: any[]): any => {
        return <div style={{ textAlign: "center" }}>{label.formatDate(data)}</div>
    };
    const formatDateFull: (data: boolean, type: any, row: any) => any = (data: any, type: any, row: any[]): any => {
        let valueFormat: any = global.formatDateTimeDirect(data, true) ? global.formatDateTimeDirect(data, true) : "";
        return <div> {valueFormat}</div>
    };
    //
    const filterFracc = (Fraccionamientos: any) => {
        let fraccs: string = "";
        fraccs = Fraccionamientos && Fraccionamientos.length > 0 ? Fraccionamientos.map(f => f.Clave).join(',') : null;
        return fraccs;
    };
    //
    export let Vista: any = global.connect(class extends React.Component<IConfigEntregaViv, {}> {
        static props: any = (state: any) => ({
            ImpresionDocumentos: state.global.catalogo$ImpresionDocumentos
        });
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addObject("MotivoRezago")
                .addString("Observaciones")
                .addObject("PersonaEntregaV")
                .addString("HoralugarEntrega")
                .addString("numcte")
                .toObject();
            return model;
        };
        onExcel(): void {
            //Obtenemos el Modelo de la Seccion
            let model: any = Forms.getForm(PAGE_ID);
            //Creamos el Modelo de Datos
            if (!filterFracc(model.Fraccionamientos)) {
                global.info('Seleccione un fraccionamiento');
                return;
            }
            let item: any = {};
            item['Plaza'] = model.PlazaInicial.ID;
            item['fechaInicial'] = model.FechaInicio;
            item['fechaFinal'] = model.FechaFinal;
            item['financiamiento'] = model.Financiamiento.ID;
            item['fraccionamiento'] = global.filterFracc(model.Fraccionamientos);
            item['Vocaciones'] = model.Vocaciones.ID;
            item['fechaEntrega'] = model.FechaEntrega;
            item['fechaProgramacion'] = model.FechaProgramacion;
            item['lugarHoraEntrega'] = model.LugarHoraEntrega ? model.LugarHoraEntrega : null;

            //Exportamos a Excel
            let formName: string = "ConfigViviendaEntregable";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "ConfigViviendaEntregable/Excel/");
            form.setAttribute("target", formName);
            //
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = (JSON.stringify(item));
            form.appendChild(input);
            //
            document.body.appendChild(form);
            //
            window.open("about:blank", formName);
            //
            form.submit();
            //
            document.body.removeChild(form);
        };
        componentWillReceiveProps(nextProps: IConfigEntregaViv, nextState: IConfigEntregaViv): any {
            if (this.props.ImpresionDocumentos && wasUpdated(this.props.ImpresionDocumentos, nextProps.ImpresionDocumentos, false)) {
                let item: any = getData(nextProps.ImpresionDocumentos);
                switch (item.Estado) {
                    case 4: // eliminado con exito
                        break;
                    case 5:
                        console.log(item)
                        if (item.FileReference) {
                            EK.Global.confirm("Presione Confirmar para descargar los archivos", "Documentos Procesados Correctamente", () => {
                                window.location.assign(item.FileReference.FilePath);
                            });
                        }
                        break;
                    default:
                }
            }
        };
        componentWillMount(): void {
            Forms.remove(PAGE_ID);
        };
        componentDidMount(): void {
            //configuración necesaria para inicializar agenda.
            if (!global.isLoadingOrSuccessful(global.getStateItem("global.TipoAgenda"))) {
                global.dispatchAsync("load::TipoAgenda", "catalogos/get(TipoAgenda)");
            };

            //configuración necesaria para inicializar agenda.
            global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: "EntregaVivienda" });
        };
        onMultipleAppointments(): void {
            let tipoAgenda: any;
            let glTipoAgenda: DataElement = global.getStateItem("global.TipoAgenda") as DataElement;
            if (glTipoAgenda) {
                if (global.isSuccessful(glTipoAgenda)) {
                    let tiposAgenda: any[] = global.getData(glTipoAgenda, []);
                    if (tiposAgenda && tiposAgenda.length > 0) {
                        let items: any[] = tiposAgenda.filter((value) => { return value.Clave === "EntregaVivienda" }) as any[];
                        tipoAgenda = !(items && items.length > 0) ? null : items[0];
                    };
                };
            };
            //
            if (tipoAgenda) {
                let fechaActual: Date = new Date();
                let fechaPropuesta: Date;
                fechaActual = global.FechaPropuesta(fechaActual, 1);
                fechaPropuesta = global.FechaPropuesta(fechaActual, 1);

                Forms.reset("AgendaNew");
                Forms.updateFormElement("AgendaNew", "FechaInicio", fechaActual);
                Forms.updateFormElement("AgendaNew", "FechaFin", fechaPropuesta);
                Forms.updateFormElement("AgendaNew", "TipoAgenda", tipoAgenda);

                global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: tipoAgenda.Clave });
                global.dispatchDefault("load::AgendaNewCalendasUser", null);
                global.dispatchSuccessful("global-page-data", [], "AgendaPostVentaResult");
                global.dispatchSuccessful("load::ACTDETALLEAGENDA", null);

                Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", []);
                //
                config.setState({ multipleAppointments: true });
                //
                let modalCalen: any = $("#modalCalen");
                modalCalen.modal();
                modalCalen.css("height", "auto");
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowSave={false} allowEdit={false} allowDelete={false} allowNew={false}>
                <PageButtons>
                    <NewButton onClick={this.onMultipleAppointments.bind(this)} />
                    <ExcelButton onClick={this.onExcel} />{global.isUpdating(this.props.ImpresionDocumentos) ? <AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} marginTop={-36} marginLeft={48} icon="fas fa-sync-alt" colorClass="font-blue" /> : <PrintDocsButton />}
                </PageButtons>
                <Filtros />
                <ResultView />
            </page.Main>
        };
    });

    interface IimprimirDocsButton extends EK.UX.Buttons.IButtonProps {
        item?: any;
        config?: page.IPageConfig;
        //data?: any;
        impresionDocs?: (numcte: number, clave_tipo_vivienda: any, hipoteca_verde: boolean, id_identificador: string) => void;
    };

    let PrintDocsButton: any = global.connect(class extends React.Component<IimprimirDocsButton, {}> {
        constructor(props: IimprimirDocsButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IimprimirDocsButton = {
            icon: "fa fa-print",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        //Funcion para Obtener Ubicaciones Agenda(AgendaEntregaViviendaSPV)
        getImprimibles(): any {
            //Arreglo de Ubicaciones de la Agenda
            let Imprimibles: any[];
            //Obtenemos informacion del Array
            let retValues: any[] = [];

            //Imprimibles = Forms.getValue("ItemsParaImpresion", SECTION_CONCEPTO_ID);
            Imprimibles = Forms.getValue("ItemsParaImpresion", PAGE_ENTREGA_RESULT_ID);

            //Validamos que Ubicaciones no este vacio
            if (Imprimibles === undefined || Imprimibles === null || Imprimibles.length <= 0 || !Imprimibles) {
                warning("No existe items seleccionados");
                return;
            } else {
                Imprimibles.forEach((value) => {
                    let retValue: any = global.assign(value.item, {
                        numcte: value.numcte,
                        plaza: value.id_identificador,
                        IdUbicacionVenta: value.numcte,
                        clave_tipo_vivienda: value.clave_tipo_vivienda,
                        hipoteca_verde: value.hipoteca_verde ? 1 : 0
                    });
                    //
                    retValues.push(retValue);
                });
            }
            return retValues;
        };

        onClick(): void {
            //let Imprimibles: any = Forms.getValue("ItemsParaImpresion", SECTION_CONCEPTO_ID);
            let Imprimibles: any = Forms.getValue("ItemsParaImpresion", PAGE_ENTREGA_RESULT_ID);
            console.log(Imprimibles)
            let Imprimir: any[] = this.getImprimibles();
            if (Imprimir === null || Imprimir === undefined || Imprimir.length === 0) {
                return;
            };
            let cantidadItemsSeleccionados: any = Imprimibles.length;
            global.info("Iniciando proceso de Impresión de Documentos, Espere por favor <br> " + cantidadItemsSeleccionados + " items seleccionados ");
            Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ClientesImprimir", Imprimir);
            let item: EditForm = Forms.getForm(PAGE_ENTREGA_RESULT_ID);
            let model: any = item
                .toObject();

            console.log(Imprimir)
            console.log(model)
            //Asignamos la Propiedad ubicaciones Agenda al Modelo
            model["ImpresionDocs"] = Imprimir;
            global.dispatchAsyncPut("global-page-data", "ConfigViviendaEntregable/GetDocsImpresion/", model, 'ImpresionDocumentos');
            // console.log('imprimiendo');
        };
        render(): JSX.Element {
            return <Button {...this.props} keyBtn={"btnSPVImprimirDOC"} onClick={this.onClick} />;
        };
    });

    interface IProps extends React.Props<any> {
        item?: any;
        CapturaFechaConstruccionResult?: DataElement;
        isNew?: boolean;
    };

    interface IState {
        viewMode?: boolean;
    };

    interface IConsultaViviendaEntregableProps extends page.IProps {
        plaza?: any;
        checklist?: any;
        GuardaConfig?: (numcte: number, FechaProgramacion: Date, PersonaEntregaV: any, HoralugarEntrega: any) => void;
        CheckImpresion?: any;
        ReturnImpresionDocumentos?: any;
        checkListGuardado?: any;
        ItemAgendado?: any;
        agendaActualizada?: any;
        editCte?: any;
    };

    interface ConsultaViviendaEntregableState {
        config?: page.IPageConfig;
    };

    let Filtros: any = global.connect(class extends React.Component<IConsultaViviendaEntregableProps, {}> {
        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);
            this.onSelectConfigViviendasEnt = this.onSelectConfigViviendasEnt.bind(this);
        };
        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            plaza: state.global.Plaza_Seleccionada
        });
        componentDidMount(): void {
            config.setState({ viewMode: false });
            Forms.updateFormElement([PAGE_ID].join(""), "FechaInicio", new Date(global.getToday(true).getFullYear(), 0, 1));
            global.dispatchSuccessful("global-page-data", global.createSuccessfulStoreObject([]), PAGE_ENTREGA_RESULT_ID);
            global.dispatchSuccessful("global-page-data", global.createSuccessfulStoreObject([]), "ClienteImpresionResult");
            global.dispatchSuccessful("load::funcionAgenda", { tipo: "PostVenta" });
        };
        componentWillReceiveProps(nextProps: IConsultaViviendaEntregableProps, nextState: IConsultaViviendaEntregableProps): void {
            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
                // console.log(getData(nextProps.plaza));
            }
        };
        onSelectConfigViviendasEnt(changeViewMode?: boolean): void {
            let model: any = Forms.getForm(PAGE_ID);
            console.log(model);
            if (!filterFracc(model.Fraccionamientos)) {
                global.info('Seleccione un fraccionamiento');
                return;
            }
            //Forms.updateFormElement(SECTION_CONCEPTO_ID, "ClientesImprimir", [])
            //Forms.updateFormElement(SECTION_CONCEPTO_ID, "ItemsParaImpresion", [])
            //Forms.reset(SECTION_CONCEPTO_ID);
            Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ClientesImprimir", [])
            Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ItemsParaImpresion", [])
            Forms.reset(PAGE_ENTREGA_RESULT_ID);

            let plaza: any = model.PlazaInicial.ID;
            let fechaInicial: any = model.FechaInicio;
            let fechaFinal: any = model.FechaFinal;
            let financiamiento: any = model.Financiamiento.ID;
            let fraccionamiento: any = global.filterFracc(model.Fraccionamientos);
            let vocaciones: any = model.Vocaciones.ID;
            let cliente: any = model.Cliente && model.Cliente != null && model.Cliente != undefined && model.Cliente.ID != null && model.Cliente.ID != undefined ? model.Cliente.ID : null;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'

            let p: any = global.assign({
                Plaza: plaza,
                FechaInicial: fechaInicial,
                FechaFinal: fechaFinal,
                Financiamiento: financiamiento,
                Fraccionamiento: fraccionamiento,
                Vocaciones: vocaciones,
                Cliente: cliente,
                Segmento: segmento
            });
            console.log(p)
            global.dispatchAsyncPost("global-page-data", "base/kontrol/ConfigViviendaEntregable/GetBP/GetConfigViviendaEntregable/", { parametros: p }, PAGE_ENTREGA_RESULT_ID);
            global.dispatchAsyncPost("global-page-data", "ConsultaViviendaEntregable/GetDetallesReprog/", { Uso: 'FCONS' }, "CheckListResult");
        };
        render(): JSX.Element {
            let idForm: any = EK.Store.getState().forms[PAGE_ID] ? EK.Store.getState().forms[PAGE_ID] : null;
            let color: string = "#d26c35";
            let className: string = "";
            let UrlAplicacion: any = window.location;
            let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra")
            if (idForm === null || idForm === undefined) {

            } else {
                if (idForm.hasChanged) {
                    color = "white";
                    className = " btn-editing";
                }
            };

            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Programación de Vivienda"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button className={className} keyBtn={"btnSPVFiltrarInformacion"} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelectConfigViviendasEnt} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row style={{ paddingBottom: '10px' }}>
                        <Column size={[12, 12, 12, 12]} >
                            {/*<PlazasDDL id={"PlazaInicial"} size={[12, 12, 4, 4]} label={"PLAZAS"} idForm={PAGE_ID} validations={[validations.required()]} required={true} />*/}
                            {/*<VocacionesSPVDDL id={"Vocaciones"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                            {/*<FraccionamientosDDL id={"FraccInicial"} size={[12, 12, 4, 4]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />*/}
                            <ddl.PlazasDDL id="PlazaInicial" label={"PLAZAS"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                            <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                            <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />

                            {/*<ddl.TagsFraccionamientosV2 id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                            <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                        </Column>
                    </Row>
                    <Row style={{paddingBottom:'15px'}}>
                        <Column size={[12, 12, 12, 12]} >
                            <input.Date id={"FechaInicio"} size={[12, 12, 6, 3]} idForm={PAGE_ID} label={"FECHA INICIAL"} validations={[validations.required()]} value={global.getObtenerFecha()} />
                            <input.Date id="FechaFinal" idForm={PAGE_ID} label={"FECHA FINAL"} size={[12, 12, 6, 3]} validations={[validations.required()]} value={global.getObtenerFecha()} />

                            <select.ClientesSPV id={"Cliente"} idForm={PAGE_ID} size={[12, 12, 6, 6]} required={false} />
                            {!IntraUrbana ?
                                <select.ClientesSPVML id={"Cliente"} label={'Cliente (Manzana y Lote)'} idForm={PAGE_ID} size={[12, 12, 4, 4]} required={false} />
                                : <select.ClientesSPVEND id={"Cliente"} label={'Ubicacion (Edificio, Nivel, Dpto)'} idForm={PAGE_ID} size={[12, 12, 4, 4]} required={false} />}
                                <FinanciamientoDDL id={"Financiamiento"} size={[12, 12, 3, 3]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />

                        </Column>
                   </Row>
                </page.OptionSection>
            </Column>;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IConsultaViviendaEntregableProps, {}> {
        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
            this.onNewCalendar = this.onNewCalendar.bind(this);
            this.onSelectCheckImpresion = this.onSelectCheckImpresion.bind(this);
            this.onSelectCheckTODOS = this.onSelectCheckTODOS.bind(this);
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            data: state.global.catalogo$ConfigViviendaEntregableResult,
            checklist: state.global.catalogo$CheckListResult,
            CheckImpresion: Forms.getDataValue("CheckImpresion", PAGE_ENTREGA_RESULT_ID, state),
            ReturnImpresionDocumentos: state.global.catalogo$ImpresionDocumentos,
            checkListGuardado: state.global.catalogo$ChecklistProgramadosGuardados,
            ItemAgendado: state.global.catalogo$AgendaNew,
            agendaActualizada: state.global.ACTDETALLEAGENDA,
            editCte: state.forms[SECTION_CAPTURA_CAMPOS]
        });
        //Dispatchs Section
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            GuardaConfig: (numcte: number, FechaProgramacion: Date, PersonaEntregaV: any, HoralugarEntrega: any): void => {
                let item: any = { numcte, FechaProgramacion, PersonaEntregaV, HoralugarEntrega };
                global.dispatchAsyncPost("global-page-data", "ConfigViviendaEntregable/SaveConfigViv/", item, "ConfigVivSave");
            },
        });
        static defaultProps: IConsultaViviendaEntregableProps = {
            data: createSuccessfulStoreObject([])
        };
        onSelect(item: any): void {
            console.log(item)
            Forms.updateFormElement(SECTION_CAPTURA_CAMPOS, "ConfigViviendaEntEdit", item);
            dispatchSuccessful('load::ItemSeleccionadoUPD', item);
            //console.log('assas');
            //Obtenemos item seleccionado
            let Ubicaciones: any = Forms.getValue("ConfigViviendaEntEdit", SECTION_CAPTURA_CAMPOS);

            if (item.pago === "False" || item.pago === "false" || item.pago === false) {
                EK.Global.info("No puede planificar la fecha de entrega porque La vivienda no esta PAGADA, Validar con titulación.");
                return;
            };
            //
            if (item.EstatusAgendaEntrega.Clave === 'ATE') {
                EK.Global.info("No puede planificar la fecha de entrega, porque ya fue atendida");
                return;
            };
            //
            if (item.Fec_Construccion === null || item.Fec_Construccion === undefined) {
                EK.Global.info("No puede planificar la fecha de entrega porque no tiene Fecha de Construcción Planificada");
                return;
            };
            //
            if (item.EstatusAgendaEntrega.Clave === null) {
                if (item.EstatusAgendaConstruccion.Clave === null || item.EstatusAgendaConstruccion.Clave != 'ATE') {
                    EK.Global.info("No puede planificar la fecha de entrega, porque la Planificación de la FECHA DE CONSTRUCCIÓN no ha sido atendida");
                    return;
                }
            };
            //

            let plaza: any = item.id_identificador;
            let fraccionamiento: any = item.IdFraccionamiento;
            // global.dispatchSuccessful("load::PERSONALENTREGAVXFRACC", []);
            

            //global.dispatchAsyncPost("load::PERSONALENTREGAVXFRACC", "CapturaFechaConstruccion/GetPersonaEntregaVxFracc/", { Plaza: plaza, Fraccionamiento: fraccionamiento }, "PersonaEntregaVxFracc");
            global.asyncPost("CapturaFechaConstruccion/GetPersonaEntregaVxFracc/", { Plaza: plaza, Fraccionamiento: fraccionamiento }, (status: AsyncActionTypeEnum, data: any[]) => {
                if (status === AsyncActionTypeEnum.successful) {
                    global.dispatchSuccessful("load::PERSONALENTREGAVXFRACC", data, "PersonaEntregaVxFracc");
                    //console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].Clave === item.num_entrega_viv) {
                                    let item = data[i];
                            Forms.updateFormElement(SECTION_CAPTURA_CAMPOS, "PersonaEntregaV", item);
                                    break;
                       }
                    }
                    //let d = getData(EK.Store.getState().global.PERSONALENTREGAVXFRACC);
                    //console.log(d);
                    
                    //global.dispatchSuccessful("load::PERSONALENTREGAVXFRACC", data,'PersonaEntregaVxFracc');
                    //Forms.updateFormElement(SECTION_CAPTURA_CAMPOS, "PersonaEntregaV", data);
                }
            });
            ///Actualizamos el Estados de las Ubicaciones
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", [Ubicaciones]);
                
            //Validamos que no existan Conceptos del CheckList sin Terminar
            global.asyncPost("CapturaFechaConstruccion/GetProgramados/", { numcte: Ubicaciones.numcte, Uso: 'FCONS' }, (status: AsyncActionTypeEnum, data: any[]) => {
                if (status === AsyncActionTypeEnum.successful) {
                    if (this.props.config) {
                        //this.props.config.setState({ viewMode: false }, SECTION_CONCEPTO_ID);
                        this.props.config.setState({ viewMode: false }, PAGE_ENTREGA_RESULT_ID);
                    }
                }
            });
        };
        //Abrimos Modal Fecha Construccion
        onNewCalendar(): void {
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", []);
            //Obtenemos item seleccionado
            let valorEdicion: any = Forms.getValue("ConfigViviendaEntEdit", SECTION_CAPTURA_CAMPOS);
            let personalEntregaVivienda: any = Forms.getValue("PersonaEntregaV", SECTION_CAPTURA_CAMPOS);

            let fechaActual: Date = new Date();
            let fechaPropuesta: Date;
            Forms.updateFormElement("AgendaNew", "FechaInicio", null);
            fechaActual = global.FechaPropuesta(fechaActual, 1);
            fechaPropuesta = global.FechaPropuesta(fechaActual, 1);
            Forms.reset('AgendaNew');
            Forms.updateFormElement("AgendaNew", "FechaInicio", fechaActual);
            //Forms.updateFormElement("AgendaNew", "FechaFin", fechaPropuesta);
            Forms.updateFormElement("AgendaNew", "TipoAgenda", valorEdicion.TipoAgenda != null && valorEdicion.TipoAgenda != undefined ? valorEdicion.TipoAgenda : null);
            let enviartipoAgenda: any = valorEdicion.TipoAgenda.Clave
            dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: enviartipoAgenda });
            dispatchDefault("load::AgendaNewCalendasUser", null);
            valorEdicion.ProcesoEjecutado = 'PROGRAMACION';
            valorEdicion.num_entrega_viv = personalEntregaVivienda.ID;
            valorEdicion.Personaentregavivienda = personalEntregaVivienda.Nombre;

            let Ubicaciones: any = valorEdicion;

            ///Actualizamos el Estados de las Ubicaciones
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", [Ubicaciones]);
            //Guardamos campos de ConfigViviendaEnt.
            //Obtenemos FechaProgramacion
            let FechaProgramacion: any = global.getObtenerFecha();
            //Obtenemos PersonaEntregaV.
            let PersonaEntregaV: any = Forms.getValue("PersonaEntregaV", SECTION_CAPTURA_CAMPOS);
            // Obetenemos HoralugarEntrega
            let HoralugarEntrega: any = Forms.getValue("HoralugarEntrega", SECTION_CAPTURA_CAMPOS);
            //Obtenemos Radio Buttons
            let ObservacionesCte: any = Forms.getValue("Opcionales", SECTION_CAPTURA_CAMPOS);
            //Guardamos la Informacion en BD
            this.props.GuardaConfig(Ubicaciones.numcte, FechaProgramacion, PersonaEntregaV.ID, HoralugarEntrega);
            //
            config.setState({ multipleAppointments: false });
            //Abrimos el Modal
            let modalCalen: any = $("#modalCalen");
            modalCalen.modal();
            modalCalen.css("height", "auto");
        };
        //Abrimos Modal Reprogramacion de Fecha de Construccion
        onNewReprogramacion(IdAgenda: any, IdAgendaDetalle: any): void {
            console.log("reprogramacion")
            let valorEdicion: any = Forms.getValue("ConfigViviendaEntEdit", SECTION_CAPTURA_CAMPOS);
            console.log(valorEdicion)
            let personalEntregaVivienda: any = Forms.getValue("PersonaEntregaV", SECTION_CAPTURA_CAMPOS);
            console.log(personalEntregaVivienda)
            valorEdicion.ProcesoEjecutado = 'REPROGRAMACION';
            valorEdicion.num_entrega_viv = personalEntregaVivienda.ID;
            valorEdicion.Personaentregavivienda = personalEntregaVivienda.Nombre;
            dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: valorEdicion.TipoAgenda.Clave });
            let Ubicaciones: any = valorEdicion;

            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", [Ubicaciones]);

            let modalAgenda: any = $("#modalAgendaInformacionCita");
            modalAgenda.modal();
            modalAgenda.css("height", "auto");
            let idAgenda: any = IdAgenda;
            let idAgendaDetalle: any = IdAgendaDetalle;

            let claveTipoAgenda: any = 'EntregaVivienda';
            let p: any = global.assign({
                IdAgenda: idAgenda,
                ClaveTipoAgenda: claveTipoAgenda,
                IdAgendaDetalle: idAgendaDetalle,
            });

            global.dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p }, "AgendaDetallesCitaResult");
        };
        componentWillReceiveProps(nextProps: IConsultaViviendaEntregableProps, nextState: IConfigEntregaViv): any {
            if (this.props.ReturnImpresionDocumentos && wasUpdated(this.props.ReturnImpresionDocumentos, nextProps.ReturnImpresionDocumentos, false)) {
                let model: any = Forms.getForm(PAGE_ID);
                console.log(model);
                if (!Forms.isValid(PAGE_ID)) {
                    warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                    return;
                };

                Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ClientesImprimir", [])
                Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ItemsParaImpresion", [])
                Forms.reset(PAGE_ENTREGA_RESULT_ID);    

                let plaza: any = model.PlazaInicial.ID;
                let fechaInicial: any = model.FechaInicio;
                let fechaFinal: any = model.FechaFinal;
                let financiamiento: any = model.Financiamiento.ID;
                //let fraccionamiento: any = model.FraccInicial.ID;
                let fraccionamiento: any = global.filterFracc(model.Fraccionamientos);;
                let vocaciones: any = model.Vocaciones.ID;

                let p: any = global.assign({
                    Plaza: plaza,
                    FechaInicial: fechaInicial,
                    FechaFinal: fechaFinal,
                    Financiamiento: financiamiento,
                    Fraccionamiento: fraccionamiento,
                    Vocaciones: vocaciones
                });

                global.dispatchAsyncPost("global-page-data", "base/kontrol/ConfigViviendaEntregable/GetBP/GetConfigViviendaEntregable/", { parametros: p }, PAGE_ENTREGA_RESULT_ID);
                global.dispatchAsyncPost("global-page-data", "ConsultaViviendaEntregable/GetDetallesReprog/", { Uso: 'FCONS' }, "CheckListResult");
            };
            if (hasChanged(this.props.checkListGuardado, nextProps.checkListGuardado) && global.isSuccessful(nextProps.checkListGuardado)) {
                let item: any = getData(nextProps.checkListGuardado);
                switch (item.Estado) {
                    case 5:
                        let items: any = nextProps.data;
                        for (var i = 0; i < items.data.length; i++) {
                            if (item.ID === items.data[i].ID) {
                                items.data[i].bit_revisado = item.bit_revisado;
                                items.data[i].CantidadPendientesPorReparar = item.CantidadPendientesPorReparar;
                                break;
                            };
                        };
                        global.dispatchSuccessful("global-page-data", new DataElement(items), PAGE_ENTREGA_RESULT_ID);
                        break;
                    default:
                        break;
                }
            };

            if (hasChanged(this.props.ItemAgendado, nextProps.ItemAgendado) && global.isSuccessful(nextProps.ItemAgendado)) {
                if (nextProps.ItemAgendado && getData(nextProps.ItemAgendado).FechaInicio) {
                    let itemEditado: any = getData(nextProps.ItemAgendado);
                    let IdUsuarioAsignado = Forms.getValue("PersonaEntregaV", 'CapturaCampos') ? Forms.getValue("PersonaEntregaV", 'CapturaCampos').Clave : Forms.getValue("PersonaEntregaV", 'CapturaCampos').ID;
                    let NomUsuarioAsignado = Forms.getValue("PersonaEntregaV", 'CapturaCampos') ? Forms.getValue("PersonaEntregaV", 'CapturaCampos').Nombre : 'ND';
                    let entidades: DataElement = this.props.config.getCatalogo(PAGE_ENTREGA_RESULT_ID);
                    if (getData(nextProps.ItemAgendado).FechaInicio && entidades.data.length != 0) {
                        for (var i = 0; i < entidades.data.length; i++) {
                            if (entidades.data[i].ID === itemEditado.UbicacionesAgenda[0].IdExpediente) { // esta linea, se colocla [0] porque se supone que desde estas ventas no se puede planificar unsa sola ubicación
                                if (itemEditado.ProcesoEjecutado === "PROGRAMACION") {
                                    if (itemEditado.EstatusAgenda != undefined && itemEditado.EstatusAgenda != null) {
                                        console.log(itemEditado);
                                        entidades.data[i].IdAgenda = itemEditado.UbicacionesAgenda[0].IdAgenda
                                        entidades.data[i].IdAgendaEntVivienda = itemEditado.UbicacionesAgenda[0].ID
                                        entidades.data[i].Fec_Entrega = itemEditado.FechaInicio;
                                        entidades.data[i].EstatusAgendaEntrega = itemEditado.EstatusAgenda;
                                        entidades.data[i].VisualizarCheckImpresion = true;
                                        entidades.data[i].Personaentregavivienda = NomUsuarioAsignado;
                                        entidades.data[i].num_entrega_viv = IdUsuarioAsignado;
                                        break;
                                    }
                                };
                                break;
                            }
                        }
                    };

                    global.dispatchSuccessful("global-page-data", new DataElement(entidades), PAGE_ENTREGA_RESULT_ID);

                    if (this.props.config) {
                        this.props.config.setState({ viewMode: true }, PAGE_ENTREGA_RESULT_ID);
                    };
                }
            };
            if (hasChanged(this.props.agendaActualizada, nextProps.agendaActualizada) && global.isSuccessful(nextProps.agendaActualizada)) {
                if (nextProps.agendaActualizada && getData(nextProps.agendaActualizada).FechaInicio) {
                    let itemEditado: any = getData(nextProps.agendaActualizada);
                    let IdUsuarioAsignado = Forms.getValue("PersonaEntregaV", 'CapturaCampos') ? Forms.getValue("PersonaEntregaV", 'CapturaCampos').Clave : Forms.getValue("PersonaEntregaV", 'CapturaCampos').ID;
                    let NomUsuarioAsignado = Forms.getValue("PersonaEntregaV", 'CapturaCampos') ? Forms.getValue("PersonaEntregaV", 'CapturaCampos').Nombre : 'ND';
                    let entidades: DataElement = this.props.config.getCatalogo(PAGE_ENTREGA_RESULT_ID);
                    if (getData(nextProps.agendaActualizada).FechaInicio && entidades.data.length != 0) {
                        for (var i = 0; i < entidades.data.length; i++) {
                            //console.log(entidades.data[i]);
                            if (entidades.data[i].ID === itemEditado.IdExpediente) {
                                entidades.data[i].IdAgendaEntVivienda = itemEditado.IdAgendaDetalle;
                                entidades.data[i].IdAgenda = itemEditado.ID;
                                entidades.data[i].fecha_reprogramacion = itemEditado.FechaInicio;
                                entidades.data[i].EstatusAgendaEntrega = itemEditado.EstatusAgenda;
                                entidades.data[i].Personaentregavivienda = NomUsuarioAsignado;
                                entidades.data[i].num_entrega_viv = IdUsuarioAsignado;
                                break;
                            }
                        }
                    }
                    global.dispatchSuccessful("global-page-data", new DataElement(entidades), PAGE_ENTREGA_RESULT_ID);
                    if (this.props.config) {
                        //this.props.config.setState({ viewMode: true }, "ConsultaVE");
                        this.props.config.setState({ viewMode: true }, PAGE_ENTREGA_RESULT_ID);
                    }
                }
            }
        };
        onSelectCheckTODOS(value: any): void {

            Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ItemsParaImpresion", []);
            Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ClientesImprimir", []);

            if (value) { // en caso de ser seleccionado
                let ChecksForma: any = EK.Store.getState().forms[PAGE_ENTREGA_RESULT_ID].form;
                let seleccionTodos: any = ChecksForma["SelecTodos"].value;
                let varia: any;

                Object.keys(ChecksForma).forEach(function (key, index) {
                    let varia: any = ChecksForma[key];

                    let encontrado: number = key.indexOf("CheckImpresion_");
                    if (encontrado >= 0) {
                        if (varia.value === undefined) {
                            Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, key, true);
                        } else {
                            Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, key, seleccionTodos);
                        }
                    }
                });
            } else { // en caso de desmarcarlo
                let ChecksForma1: any = EK.Store.getState().forms[PAGE_ENTREGA_RESULT_ID].form;
                Object.keys(ChecksForma1).forEach(function (key, index) {
                    let varia: any = ChecksForma1[key];
                    if (varia.value === undefined) {
                        Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, key, true);
                    } else {
                        Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, key, false);
                    }
                });
            };
        };
        onSelectCheckImpresion(item: any, value: any): void {
            if (value === true) { // en caso de ser seleccionado
                let ItemsImpresion: any[] = Forms.getValue("ItemsParaImpresion", PAGE_ENTREGA_RESULT_ID);
                if (ItemsImpresion === undefined || ItemsImpresion === null || !ItemsImpresion) {
                    let items: DataElement = global.createSuccessfulStoreObject([]);
                    let retValue: DataElement = items.upsertItem(item);
                    Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ItemsParaImpresion", getData(retValue));
                } else {
                    let items: DataElement = global.createSuccessfulStoreObject(ItemsImpresion);
                    if (item.ID == undefined && item.ID == null) {
                        item.ID = items.getNextLowerID();
                    };
                    let retValue: DataElement = items.upsertItem(item);
                    Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ItemsParaImpresion", getData(retValue));
                }
            } else { // en caso de desmarcarlo
                let ItemsImpresion: any[] = Forms.getValue("ItemsParaImpresion", PAGE_ENTREGA_RESULT_ID);
                if (ItemsImpresion === null || ItemsImpresion === undefined || !ItemsImpresion) {

                } else {
                    let Filtrado: any[] = (ItemsImpresion.filter(seleccionados => seleccionados.ID != item.ID));
                    Forms.updateFormElement(PAGE_ENTREGA_RESULT_ID, "ItemsParaImpresion", Filtrado);
                }
            }
        };
        onVerDocumentos(item: any): void {
            dispatchSuccessful("load::KontrolFileParametersCurrentEntityType", { data: "SPVEntregaPaquetes" });
            dispatchSuccessful("load::KontrolFileParametersCurrentEntity", item);
            let modalObject: any = $("#modalDocumentosVivienda");
            modalObject.modal();
            modalObject.css("height", "auto");
        };
        onSelectCheklist(item: any): void {
            //Ocultamos o mostramos Botones
            if (item.Fec_Construccion === null || item.Fec_Construccion === undefined) {
                EK.Global.info("No puede crear un CheckList porque no tiene Fecha de Construcción Planificada");
                return;
            };
            dispatchSuccessful("load::CheckListParameters", { uso: 'FCONS', origen: 'ENTVIV' });
            //Abrimos el Modal
            let modalObject: any = $("#modalCheckList");
            modalObject.modal();
            modalObject.css("height", "auto");
            //Actualizamos el Estado
            Forms.updateFormElement(SECTION_CHECKLIST, "CheckListEdit", item);
            //Cargamos Elementos del Item si tiene agregados
            global.asyncPost("CapturaFechaConstruccion/GetProgramados/", { numcte: item.numcte, Uso: 'FCONS' }, (status: AsyncActionTypeEnum, data: any[]) => {
                if (status === AsyncActionTypeEnum.successful) {
                    //Actualizamos el Estado ConfigDetProgEdit
                    Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", data);
                }
            });
        };
        onRowDClick(item: any): void {
            return null;
        }
        onSave = () => {
            let IdUsuarioAsignado = Forms.getValue("PersonaEntregaV", 'CapturaCampos') ? Forms.getValue("PersonaEntregaV", 'CapturaCampos').Clave : Forms.getValue("PersonaEntregaV", 'CapturaCampos').ID;
            let datos = Forms.getValue("ConfigViviendaEntEdit", "CapturaCampos");
            let folio = datos.folio;
            let idAgenda = datos.IdAgendaEntVivienda === 0 ? datos.IdAgendaFechaConst : datos.IdAgendaEntVivienda;

            let dataParams = {
                IdResponsable: IdUsuarioAsignado,
                Folio: folio,
                IdAgenda: idAgenda
            }

            let item = global.getData(EK.Store.getState().global.ItemSeleccionadoUPD);
            let entidades: DataElement = this.props.config.getCatalogo(PAGE_ENTREGA_RESULT_ID);
            global.asyncPost("ConfigViviendaEntregable/UpdateResponsableEntViv/",  dataParams, (status: AsyncActionTypeEnum, data: any[]) => {
                if (status === AsyncActionTypeEnum.successful) {
            //        //Actualizamos el Estado ConfigDetProgEdit
                   // console.log(data);
                    let NomUsuarioAsignado = Forms.getValue("PersonaEntregaV", 'CapturaCampos') ? Forms.getValue("PersonaEntregaV", 'CapturaCampos').Nombre : 'ND';
                    for (let i = 0; i < entidades.data.length; i++) {
                        if (item.ID === entidades.data[i].ID) {
                            entidades.data[i].Personaentregavivienda = NomUsuarioAsignado;
                            entidades.data[i].num_entrega_viv = IdUsuarioAsignado;
                            break;
                        }
                    }
                    global.dispatchSuccessful("global-page-data", new DataElement(entidades), PAGE_ENTREGA_RESULT_ID);
                    success('Usuario cambiado exitosamente');
                    this.props.config.setState({ viewMode: true }, PAGE_ENTREGA_RESULT_ID);
                }
            });
            //this.props.config.setState({ viewMode: true }, PAGE_ENTREGA_RESULT_ID);
        }


        shouldComponentUpdate(nextProps: IConsultaViviendaEntregableProps, {}): boolean {
            return hasChanged(this.props.data, nextProps.data) ||
                hasChanged(this.props.editCte, nextProps.editCte) ||
                hasChanged(this.props.ItemAgendado, nextProps.ItemAgendado) ||
                hasChanged(this.props.checklist, nextProps.checklist) ||
                hasChanged(this.props.ReturnImpresionDocumentos, nextProps.ReturnImpresionDocumentos) ||
                hasChanged(this.props.checkListGuardado, nextProps.checkListGuardado) ||
                hasChanged(this.props.ItemAgendado, nextProps.ItemAgendado) ||
                hasChanged(this.props.agendaActualizada, nextProps.agendaActualizada);
        };
        render(): JSX.Element {
            let state: any = global.getData(this.props.config.getState());
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(this.props.data, []).length].join("")} </span>;

            //Obtenemos Fecha Programacion
            let FechaProgramacion: any = global.getObtenerFecha();
            //Obtenemos Fecha Entrega
            let FechaEntrega: any = Forms.getValue("ConfigViviendaEntEdit", SECTION_CAPTURA_CAMPOS);
            if (FechaEntrega !== undefined) {
                FechaEntrega = FechaEntrega.Fec_Entrega;
            };
            let UrlAplicacion: any = window.location;
            let EntregaVivienda: any = Forms.getValue("ConfigViviendaEntEdit", SECTION_CAPTURA_CAMPOS);
            let PersonaEntrega: any;
            let IdAgenda: any;
            let IdAgendaDetalle: any;
            let cliente: any;
            let fraccionamiento: any;
            let plaza: any;
            let et: any;
            let mz: any;
            let lt: any;
            let int: any;
            let ext: any;

            if (EntregaVivienda !== undefined) {
                PersonaEntrega = EntregaVivienda.Personaentregavivienda;
                IdAgendaDetalle = EntregaVivienda.IdAgendaEntVivienda;
                IdAgenda = EntregaVivienda.IdAgenda;

                cliente = EntregaVivienda.numcte + ' - ' + EntregaVivienda.nom_cte + ' ' + EntregaVivienda.ap_paterno_cte + ' ' + EntregaVivienda.ap_materno_cte;
                fraccionamiento = EntregaVivienda.id_cve_fracc + ' ' + EntregaVivienda.nom_fracc;
                plaza = EntregaVivienda.id_identificador + ' ' + EntregaVivienda.descripcion;

                et = UrlAplicacion.pathname.includes("intra") ? EntregaVivienda.edificio : EntregaVivienda.id_num_smza;
                mz = UrlAplicacion.pathname.includes("intra") ? EntregaVivienda.nivel : EntregaVivienda.id_num_mza;
                lt = EntregaVivienda.id_num_lote;
                int = EntregaVivienda.id_num_interior;
                ext = EntregaVivienda.num_ext;
            };

            //Botones Edicion
            let edit: any = {
                icon: "fa fa-calendar",
                info: "",
                titulo: "Fecha de Entrega",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelect(item);
                }
            };

            //let verDocumentos: any = {
            //    icon: "glyphicon glyphicon-file",
            //    info: "",
            //    titulo: "Ver DocumentosVer Documentos",
            //    action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
            //        this.onVerDocumentos(item);
            //    }
            //};

            let checklist: any = {
                icon: "fas fa-clipboard-list",
                info: "",
                titulo: "CheckList",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelectCheklist(item);
                }
            };

            let formatDateDocument: any = (data: boolean, type: any, row: any) => {
                let itemStyleDOC: React.CSSProperties = {
                    backgroundColor: "",
                    color: "#000000",
                };

                if (row.CantidadDocImpresos !== null && row.CantidadDocImpresos === 0 && row.VisualizarCheckImpresion === true) {
                    itemStyleDOC.color = "#84a950";
                    itemStyleDOC.backgroundColor = "#FFECB3";
                    itemStyleDOC.fontWeight = "bolder";
                };

                return <span style={itemStyleDOC}>{formatDate(data, type, row)}</span>
            };

            let formatCliente: (data: any, row: any) => any = (data: any, row: any): any => {
                let itemStyle: React.CSSProperties = {};

                if (row.Fec_Construccion !== null && row.Fec_Entrega !== null) {
                    itemStyle.color = "#84a950";
                    itemStyle.fontWeight = "bolder";
                };

                if (row.pago !== true) {
                    itemStyle.color = "#F44336";
                    itemStyle.fontWeight = "bolder";
                };

                return <span style={itemStyle}>{data}</span>
            };

            let formatConfigAccionesEntrega: (data: any, row: any) => any = (data: any, item: any): any => {
                //console.log("aquiiiiiii")
                let w: any = window;
                let windowFn: string = "$$IDEntrega";
                let estatusAgendaCons: any = !(item.EstatusAgendaConstruccion && item.EstatusAgendaConstruccion.Clave) ? "" : item.EstatusAgendaConstruccion.Clave;
                let estatusAgendaEntr: any = !(item.EstatusAgendaEntrega && item.EstatusAgendaEntrega.Clave) ? "" : item.EstatusAgendaEntrega.Clave;

                //Para que se muestre el proceso completo en las cargas iniciales
                if (estatusAgendaEntr) {
                    if (!estatusAgendaCons) {
                        estatusAgendaCons = 'ATE'
                    }
                }
                if (!w[windowFn]) {
                    w[windowFn] = (item: any, tipo: number) => {
                        if (tipo === 0) {
                            this.onSelect(item)
                        }
                        else if (tipo === 1) {
                            this.onVerDocumentos(item);
                        }
                    };
                };
                //
                return <div style={{ textAlign: "center" }}>
                    <div className="btn btn-circle btn-xs" title="Fecha de Entrega">
                        <a style={{}} data-id="data" onClick={() => w[windowFn](item, 0)} className="boton"><i className="fa fa-calendar"></i></a>
                    </div>
                    {item.CantidadDocImpresos && item.CantidadDocImpresos > 0 ?
                        <div className="btn btn-circle btn-xs">
                            {/*<a style={{}} data-id="data" onClick={() => w[windowFn](item, 1)} className="boton"><i className="glyphicon glyphicon-file btn-xs"></i></a>*/}
                            <a style={{}} data-id="data" className="boton"><i className="glyphicon glyphicon-file btn-xs"></i></a>
                        </div> :
                        <div className="btn btn-circle btn-xs">
                            <a style={{ color: "#0000" }} data-id="data" className="boton"><i className="glyphicon glyphicon-file btn-xs"></i></a>
                        </div>}
                    
                    {estatusAgendaCons ?
                        <div className="btn btn-circle btn-xs" title="Planificación Construcción">
                            <i title={EstatusCalendarDashBoardInfo.tituloCita[estatusAgendaCons] + " (Construcción)"} className={EstatusCalendarDashBoardInfo.iconos[estatusAgendaCons]} style={{ color: EstatusCalendarDashBoardInfo.iconosColor[estatusAgendaCons] }}></i>
                        </div> :
                        <div className="btn btn-circle btn-xs">
                            <a style={{ color: "#0000" }} data-id="data" className="boton"><i className="glyphicon glyphicon-play"></i></a>
                        </div>
                    }
                    {estatusAgendaEntr ?
                        <div className="btn btn-circle btn-xs" title="Planificación Vivienda">
                            <i title={EstatusCalendarDashBoardInfo.tituloCita[estatusAgendaEntr] + " (Vivienda)"} className={EstatusCalendarDashBoardInfo.iconos[estatusAgendaEntr]} style={{ color: EstatusCalendarDashBoardInfo.iconosColor[estatusAgendaEntr] }}></i>
                        </div> :
                        <div className="btn btn-circle btn-xs">
                            <a style={{ color: "#0000" }} data-id="data" className="boton"><i className="glyphicon glyphicon-play"></i></a>
                        </div>
                    }
                </div>;
            };

            
            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'Departamento' : 'Número Interior';
            if (UrlAplicacion.pathname.includes("intra")) {
                dtConfig.columns
                    .add({
                        data: "_checkBox", title: "...", fixed: true, format: (data, row, index) => {
                            return <Column size={[1, 1, 1, 1]} style={{ textAlign: "center", padding: "0px", marginTop: "-22px" }}>{row.VisualizarCheckImpresion === true && row.pago === true ? <checkBox.CheckBoxImpresion idFormSection={PAGE_ENTREGA_RESULT_ID} id={"CheckImpresion_" + index} value={false} initialValue={false} change={(value) => this.onSelectCheckImpresion(row, value)} /> : <checkBox.CheckBoxImpresion idFormSection={PAGE_ENTREGA_RESULT_ID} id={"CheckImpresion_" + index} value={false} initialValue={false} change={(value) => this.onSelectCheckImpresion(row, value)} />}</Column>

                        }, width: "50px"
                    })
                    .add({ data: "numcte",title:'No. Cliente', width: "100px", fixed: true })
                    .add({ data: "Nombre", width: "300px", fixed: true, format: formatCliente })
                    .add({ data: "ID", title: "", width: "120px", format: formatConfigAccionesEntrega, fixed: true })
                    .add({ data: "Fraccionamiento", width: "200px" })
                /*.add({
                        data: "CantidadDocImpresos", dataType: "number", width: "150px", format: (data, row, index) => {
                            let itemStyleDOCumentoSinImprimir: React.CSSProperties = {
                                backgroundColor: "",
                                color: "#000000",
                            };
                            if (row.CantidadDocImpresos !== null && row.CantidadDocImpresos === 0 && row.VisualizarCheckImpresion === true) {
                                itemStyleDOCumentoSinImprimir.color = " #84a950";
                                itemStyleDOCumentoSinImprimir.backgroundColor = "#fee505";
                                itemStyleDOCumentoSinImprimir.fontWeight = "bolder";
                            };
                            return <span style={itemStyleDOCumentoSinImprimir}>{data}</span>
                        }
                    })*/
                    .add({ data: "edificio", title: "Edificio", width: "150px" })
                    .add({ data: "nivel", title: "Nivel", width: "150px" })
                    .add({ data: "id_num_interior", width: "160px", title: labelInterior })
                    .add({ data: "dir_casa", title:'Calle', width: '400px' })
                    .add({ data: "num_ext", width: "160px" })         
                    .add({ data: "etapa", title: 'Etapa Proceso', width: "160px" })
                    .add({ data: "AgenteVentas", title: 'Asesor de ventas', width: "160px" })
                    .add({ data: "esCoacreditado", title: 'Es Coacreditado', width: "100px", format: formatBadgeOk})
                    .add({ data: "prototipo", width: "200px" })
                    .add({ data: "desc_tipo_vivienda", width: "200px" })
                    .add({ data: "Financiamiento", width: "200px" })
                    .add({ data: "subsidio", width: "100px" })
                    .add({ data: "hipoteca_verde", width: "150px", format: formatBadgeOk })
                    .add({ data: "Ecocasa", width: "100px", format: formatBadgeOk })
                    .add({ data: "fecha_etapa", width: "150px", format: formatBadgeOk })
                    .add({ data: "Firma_Escritura", width: "180px", format: formatDate })
                    .add({ data: "Libera_Titulacion", width: "150px", format: formatDate })
                    .add({ data: "FechaFirma", title: 'Fecha Firma', width: "150px", format: formatDate })
                    .add({ data: "fecha_construccion", width: "150px", format: formatDateFull })
                    .add({ data: "Detalles", width: "200px" })
                    .add({ data: "fecha_liberacion", title: 'Fecha Liberacion', width: "150px", format: formatDateFull })
                    .add({ data: "fecha_programacion", width: "150px", format: formatDateFull })
                    .add({ data: "Fec_Entrega", width: "150px", format: formatDateFull })
                    .add({ data: "bit_detalles", width: "150px", format: (data, row, index) => { return data === 1 ? "NO" : "SI"; } })
                    .add({ data: "pendiente_pago", width: "150px", format: formatBadgeOk })
                    .add({ data: "fec_pendiente_pago", width: "150px", format: formatBadgeOk })
                    .add({ data: "pago", width: "100px", format: formatBadgeOk })
                    .add({ data: "fec_pago", width: "150px", format: formatDate })
                    .add({ data: "clave_rezago", width: "150px" })
                    .add({ data: "fecha_reprogramacion", width: "150px", format: formatDateFull })
                    .add({ data: "observaciones", width: "200px" })
                    .add({ data: "Desde_Liberacion", dataType: "number", width: "200px" })
                    .add({ data: "Desde_Construccion", dataType: "number", width: "200px" })
                    .add({ data: "Personaentregavivienda", width: "200px" })
                    .add({ data: "monto_seguro", width: "150px", format: formatBadgeOk })
                    .add({ data: "dir_email", width: "250px" })
                    .add({ data: "CURP", width: "200px" })
                    .add({ data: "RFC", width: "200px" })
                    .add({ data: "Celular", width: "120px" })
                    .add({ data: "tel_casa", width: "120px" })
                    .add({ data: "tel_oficina", width: "120px" })
                    .toArray();
            } else {
                dtConfig.columns
                    .add({
                        data: "_checkBox", title: "...", fixed: true, format: (data, row, index) => {
                            return <Column size={[1, 1, 1, 1]} style={{ textAlign: "center", padding: "0px", marginTop: "-22px" }}>{row.VisualizarCheckImpresion === true && row.pago === true ? <checkBox.CheckBoxImpresion idFormSection={PAGE_ENTREGA_RESULT_ID} id={"CheckImpresion_" + index} value={false} initialValue={false} change={(value) => this.onSelectCheckImpresion(row, value)} /> : <checkBox.CheckBoxImpresion idFormSection={PAGE_ENTREGA_RESULT_ID} id={"CheckImpresion_" + index} value={false} initialValue={false} change={(value) => this.onSelectCheckImpresion(row, value)} />}</Column>
                        }, width: "50px"
                    })
                    .add({ data: "numcte", title: 'No. Cliente', width: "100px", fixed: true })
                    .add({ data: "Nombre", width: "300px", fixed: true, format: formatCliente })
                    .add({ data: "ID", title: "", width: "120px", format: formatConfigAccionesEntrega, fixed: true })
                    .add({ data: "Fraccionamiento", width: "200px" })
                    /*.add({
                        data: "CantidadDocImpresos", dataType: "number", width: "150px", format: (data, row, index) => {
                            let itemStyleDOCumentoSinImprimir: React.CSSProperties = {
                                backgroundColor: "",
                                color: "#000000",
                            };

                            if (row.CantidadDocImpresos !== null && row.CantidadDocImpresos === 0 && row.VisualizarCheckImpresion === true) {
                                itemStyleDOCumentoSinImprimir.color = " #84a950";
                                itemStyleDOCumentoSinImprimir.backgroundColor = "#fee505";
                                itemStyleDOCumentoSinImprimir.fontWeight = "bolder";
                            };

                            return <span style={itemStyleDOCumentoSinImprimir}>{data}</span>
                        }
                    })*/
                    .add({ data: "id_num_interior", width: "160px", title: labelInterior })
                    .add({ data: "num_ext", width: "160px" })
                    .add({ data: "dir_casa", title: 'Calle', width: '400px' })
                    .add({ data: "etapa", title: 'Etapa Proceso', width: "160px" })
                    .add({ data: "AgenteVentas", title: 'Asesor de ventas', width: "160px" })
                    .add({ data: "esCoacreditado", title: 'Es Coacreditado', width: "100px", format: formatBadgeOk })
                    .add({ data: "id_num_smza", title: 'Etapa Ubicacion', width: "150px" })
                    .add({ data: "id_num_mza", width: "140px" })
                    .add({ data: "id_num_lote", width: "100px" })
                    .add({ data: "prototipo", width: "200px" })
                    .add({ data: "desc_tipo_vivienda", width: "200px" })
                    .add({ data: "Financiamiento", width: "200px" })
                    .add({ data: "subsidio", width: "100px" })
                    .add({ data: "hipoteca_verde", width: "150px", format: formatBadgeOk })
                    .add({ data: "Ecocasa", width: "100px", format: formatBadgeOk })
                    .add({ data: "fecha_etapa", width: "150px", format: formatBadgeOk })
                    .add({ data: "Firma_Escritura", width: "180px", format: formatDate })
                    .add({ data: "Libera_Titulacion", width: "150px", format: formatDate })
                    .add({ data: "FechaFirma", title: 'Fecha Firma', width: "150px", format: formatDate })
                    .add({ data: "fecha_construccion", width: "150px", format: formatDateFull })
                    .add({ data: "Detalles", width: "200px" })
                    .add({ data: "fecha_liberacion", title: 'Fecha Liberacion', width: "150px", format: formatDateFull })
                    .add({ data: "fecha_programacion", width: "150px", format: formatDateFull })
                    .add({ data: "Fec_Entrega", width: "150px", format: formatDateFull })
                    .add({ data: "bit_detalles", width: "150px", format: (data, row, index) => { return data === 1 ? "NO" : "SI"; } })
                    .add({ data: "pendiente_pago", width: "150px", format: formatBadgeOk })
                    .add({ data: "fec_pendiente_pago", width: "150px", format: formatBadgeOk })
                    .add({ data: "pago", width: "100px", format: formatBadgeOk })
                    .add({ data: "fec_pago", width: "150px", format: formatDate })
                    .add({ data: "clave_rezago", width: "150px" })
                    .add({ data: "fecha_reprogramacion", width: "150px", format: formatDateFull })
                    .add({ data: "observaciones", width: "200px" })
                    .add({ data: "Desde_Liberacion", dataType: "number", width: "200px" })
                    .add({ data: "Desde_Construccion", dataType: "number", width: "200px" })
                    .add({ data: "Personaentregavivienda", width: "200px" })
                    .add({ data: "monto_seguro", width: "150px", format: formatBadgeOk })
                    .add({ data: "dir_email", width: "250px" })
                    .add({ data: "CURP", width: "200px" })
                    .add({ data: "RFC", width: "200px" })
                    .add({ data: "Celular", width: "120px" })
                    .add({ data: "tel_casa", width: "120px" })
                    .add({ data: "tel_oficina", width: "120px" })
                    .toArray();
            }
            //dtConfig.columns
            //    .add({
            //        data: "_checkBox", title: "...", fixed: true, format: (data, row, index) => {
            //            /// console.log(row);
            //            //return <Column size={[1, 1, 1, 1]} style={{ textAlign: "center", padding: "0px", marginTop: "-22px" }}>
            //            //  {row.VisualizarCheckImpresion === true && row.pago === true ? <checkBox.CheckBoxImpresion idFormSection={PAGE_ENTREGA_RESULT_ID} id={"CheckImpresion_" + index} value={false} initialValue={false} change={(value) => this.onSelectCheckImpresion(row, value)} /> : null}
            //            //</Column>
            //            return <Column size={[1, 1, 1, 1]} style={{ textAlign: "center", padding: "0px", marginTop: "-22px" }}>{row.VisualizarCheckImpresion === true && row.pago === true ? <checkBox.CheckBoxImpresion idFormSection={PAGE_ENTREGA_RESULT_ID} id={"CheckImpresion_" + index} value={false} initialValue={false} change={(value) => this.onSelectCheckImpresion(row, value)} /> : <checkBox.CheckBoxImpresion idFormSection={PAGE_ENTREGA_RESULT_ID} id={"CheckImpresion_" + index} value={false} initialValue={false} change={(value) => this.onSelectCheckImpresion(row, value)} />}</Column>

            //        }, width: "50px"
            //    })
            //    //.add({ data: "numcte", title:"No. Cliente", width: "150px", fixed: true, format: formatCliente })

            //    .add({ data: "Nombre", width: "300px", fixed: true, format: formatCliente })
            //    .add({ data: "ID", title: "", width: "120px", format: formatConfigAccionesEntrega, fixed: true })
            //    .add({ data: "Fraccionamiento", width: "200px" })
            //    .add({
            //        data: "CantidadDocImpresos", dataType: "number", width: "150px", format: (data, row, index) => {
            //            let itemStyleDOCumentoSinImprimir: React.CSSProperties = {
            //                backgroundColor: "",
            //                color: "#000000",
            //            };

            //            if (row.CantidadDocImpresos !== null && row.CantidadDocImpresos === 0 && row.VisualizarCheckImpresion === true) {
            //                itemStyleDOCumentoSinImprimir.color = " #84a950";
            //                itemStyleDOCumentoSinImprimir.backgroundColor = "#fee505";
            //                itemStyleDOCumentoSinImprimir.fontWeight = "bolder";
            //            };

            //            return <span style={itemStyleDOCumentoSinImprimir}>{data}</span>
            //        }
            //    })
            //    if (UrlAplicacion.pathname.includes("intra")) {
            //        dtConfig.columns
            //        .add({ data: "edificio", title: "Edificio", width: "150px" })
            //        .add({ data: "nivel", title: "Nivel", width: "150px" }).toArray();
            //    }


            //dtConfig.columns
            //    .add({ data: "id_num_interior", width: "160px", title: labelInterior })
            //    .add({ data: "num_ext", width: "160px" })
            //    .add({ data: "Calle", width: '400px' })
            //    .add({ data: "etapa", title: 'Etapa Proceso', width: "160px" })
            //    .add({ data: "AgenteVentas", title: 'Asesor de ventas', width: "160px" })
               
            //    if (!UrlAplicacion.pathname.includes("intra")) {
            //        dtConfig.columns.add({ data: "id_num_smza", title: 'Etapa Ubicacion', width: "150px" })
            //            .add({ data: "id_num_mza", width: "140px" })
            //            .add({ data: "id_num_lote", width: "100px" }).toArray();
            //    }
              
            //dtConfig.columns
            //    .add({ data: "prototipo", width: "200px" })
            //    .add({ data: "desc_tipo_vivienda", width: "200px" })
            //    .add({ data: "Financiamiento", width: "200px" })
            //    .add({ data: "subsidio", width: "100px" })
            //    .add({ data: "hipoteca_verde", width: "150px", format: formatBadgeOk })
            //    .add({ data: "Ecocasa", width: "100px", format: formatBadgeOk })
            //    .add({ data: "fecha_etapa", width: "150px", format: formatBadgeOk })
            //    .add({ data: "Firma_Escritura", width: "180px", format: formatDate })
            //    .add({ data: "Libera_Titulacion", width: "150px", format: formatDate })
            //    .add({ data: "FechaFirma", title: 'Fecha Firma', width: "150px", format: formatDate })
            //    .add({ data: "fecha_construccion", width: "150px", format: formatDateFull})
            //    .add({ data: "Detalles", width: "200px" })
            //    .add({ data: "fecha_liberacion", title: 'Fecha Liberacion', width: "150px", format: formatDateFull })
            //    .add({ data: "fecha_programacion", width: "150px", format: formatDateFull })
            //    .add({ data: "Fec_Entrega", width: "150px", format: formatDateFull })
            //    .add({ data: "bit_detalles", width: "150px", format: (data, row, index) => { return data === 1 ? "NO" : "SI"; } })
            //    .add({ data: "pendiente_pago", width: "150px", format: formatBadgeOk })
            //    .add({ data: "fec_pendiente_pago", width: "150px", format: formatBadgeOk })
            //    .add({ data: "pago", width: "100px", format: formatBadgeOk })
            //    .add({ data: "fec_pago", width: "150px", format: formatDate })
            //    .add({ data: "clave_rezago", width: "150px" })
            //    .add({ data: "fecha_reprogramacion", width: "150px", format: formatDateFull })
            //    .add({ data: "observaciones", width: "200px" })
            //    .add({ data: "Desde_Liberacion", dataType: "number",width: "200px" })
            //    .add({ data: "Desde_Construccion", dataType: "number", width: "200px" })
            //    .add({ data: "Personaentregavivienda", width: "200px" })
            //    .add({ data: "monto_seguro", width: "150px", format: formatBadgeOk })
            //    .add({ data: "dir_email", width: "250px" })
            //    .add({ data: "CURP", width: "200px" })
            //    .add({ data: "RFC", width: "200px" })
            //    .add({ data: "Celular", width: "120px" })
            //    .add({ data: "tel_casa", width: "120px" })
            //    .add({ data: "tel_oficina", width: "120px" })
            //    .toArray();

         
            return <Column size={[12, 12, 12, 12]}>
                <Row>
                    <EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda.NewCalendarModalBase forma={state && state.multipleAppointments === true ? null : "Individual"} />
                    <CheckListModal />
                    <VerDocumentosViviendaModal titulomodal={"Ver Documentos Relacionados a la Ubicación"} />
                    <page.SectionListExtended
                        id={PAGE_ENTREGA_RESULT_ID}
                        parent={config.id}
                        icon="fa fa-table"
                        level={1}
                        dtConfig={dtConfig}
                        hideNewButton={true}
                        size={[12, 12, 12, 12]}
                        readonly={true}
                        onRowDoubleClick={this.onRowDClick}
                        items={createSuccessfulStoreObject([])}
                        onSave={this.onSave}
                        >
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={cliente} label="Cliente" size={[12, 12, 12, 12]} />
                                <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={plaza} label="Plaza" size={[6, 6, 6, 6]} />
                                <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={fraccionamiento} label="Fraccionamiento" size={[6, 6, 6, 6]} />
                                <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={et} label={UrlAplicacion.pathname.includes("intra") ? "EDIFICIO" : "ET"} size={[2, 2, 2, 2]} />
                                <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={mz} label={UrlAplicacion.pathname.includes("intra") ? "NIVEL" : "MZ"} size={[2, 2, 2, 2]} />
                                {UrlAplicacion.pathname.includes("intra") ? null :
                                    <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={lt} label="LT" size={[2, 2, 2, 2]} /> 
                                }
                                <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={int} label={UrlAplicacion.pathname.includes("intra") ? "DPTO" : "INT"} size={[3, 3, 3, 3]} />
                                <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={ext} label="EXT" size={[3, 3, 3, 3]} />
                                <ddl.PersonaEntregaVxFraccDDL size={[12, 12, 12, 12]} id="PersonaEntregaV" label="PERSONA ENTREGA VIV.:" idFormSection={SECTION_CAPTURA_CAMPOS} validations={[validations.required()]} required={true} />
                                <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} id="FechaProgramacion" value={global.formatDateTimeDirect(FechaProgramacion, true)} label="Fecha Programacion:" size={[3, 3, 3, 3]} />
                                <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={global.formatDateTimeDirect(FechaEntrega, true)} label="Fecha Entrega:" size={[3, 3, 3, 3]} />
                                {FechaEntrega === null || FechaEntrega === undefined ? <Button size={[2, 2, 2, 2]} className="btn" keyBtn="btnSPVNuevaPlanificacion" icon="fa fa-calendar" style={{ marginTop: "15px", color: "#26c281" }} onClick={this.onNewCalendar} ></Button> : null}
                                {FechaEntrega != null || FechaEntrega != undefined ? <label.Label idFormSection={SECTION_CAPTURA_CAMPOS} value={null} label="Fecha Reprogramación:" size={[3, 3, 3, 3]} /> : null}
                                {FechaEntrega != null || FechaEntrega != undefined ? <Button size={[2, 2, 2, 2]} className="btn" keyBtn="btnSPVReprogramarPlanificacion" icon="fa fa-calendar" style={{ marginTop: "15px", color: "#26c281" }} onClick={() => this.onNewReprogramacion(IdAgenda, IdAgendaDetalle)} ></Button> : null}
                            </Column>
                        </Row>
                    </page.SectionListExtended>
                    <Column size={[12, 12, 12, 12]}>
                        <Row visible={global.isSuccessful(this.props.data) && global.getData(this.props.data).length > 0}>
                            <Column size={[12, 12, 12, 12]} style={{ textAlign: "right" }} className="listItem-right-header">
                                <span className="badge badge-info list-footer-badge">
                                    <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#f44336", alignmentBaseline: true }}></label>&nbsp;<span>PENDIENTE PAGO</span><span></span>
                                </span>&nbsp;
                                <span className="badge badge-info list-footer-badge">
                                    <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#84a950", alignmentBaseline: true }}></label>&nbsp;<span>LISTA P/ IMPRESIÓN</span><span></span>
                                </span>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Column>
        };
    });
};

import configVivienda = EK.Modules.SCV.Pages.postventa.RUBA.ConfigViviendaEntregable;