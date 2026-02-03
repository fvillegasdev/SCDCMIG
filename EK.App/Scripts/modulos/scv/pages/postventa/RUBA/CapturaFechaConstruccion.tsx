namespace EK.Modules.SCV.Pages.postventa.RUBA.CapturaFechaConstruccion {
    const PAGE_ID: string = "CapturaFechaConstruccion";
    const PAGE_CONSTRUCCION_RESULT_ID: string = "CapturaFechaConstruccionResult";
    const SECTION_CAPTURA_FECHA: string = "SeccionCapturaFechaConstruccion";
    const RADIO_VIVIENDAENT_ID: string = "VerViviendaEnt";
    const RADIO_SINPROG_ID: string = "SinProgramar";
    const RADIO_TODOS_ID: string = "Todos";
    const SECTION_CHECKLIST: string = "Checklist";
    const SECTION_CHECKLIST_PROGRAMADOS: string = "ChecklistProgramados";
    const config: page.IPageConfig = global.createPageConfig("CapturaFechaConstruccion", "scv", [PAGE_CONSTRUCCION_RESULT_ID, SECTION_CAPTURA_FECHA]);

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

    export class EstatusCalendarDashBoardInfo {
        static iconos: any = {
            'ACT': "glyphicon glyphicon-play",      //ACTIVO
            'W': "fas fa-exclamation-triangle",     //POR VENCER  ///fas fa-exclamation-triangle 
            'V': "fa fa-times-circle",              //VENCIDO
            'REP': "icon-loop",                     //REPROGRAMADO
            'ATE': "fa fa-check",                   //ATENDIDAS
            'SUS': "fa fa-calendar-times-o",        // CANCELADA
            'SINMARCA': ""                          //SIN MARCA
        };

        static iconosColor: any = {
            'ACT': "#8bc780",                       //ACTIVO
            'W': "#ff8f00",                         //POR VENCER
            'V': "#df0707",                         //VENCIDO
            'REP': "",                              //REPROGRAMADO
            'SUS': "",                              //REPROGRAMADO
            'ATE': "#8bc780",                       //ATENDIDAS
            'SINMARCA': ""                          //REQUISITO VENCIDO
        };
        static tituloCita: any = {
            'ACT': "Planifición a tiempo",          //ACTIVO
            'W': "Planificación por Vencer",        //POR VENCER
            'V': "Planificación Vencida",           //VENCIDO
            'REP': "Planificación Reprogramada",    //REPROGRAMADO
            'SUS': "Planificación Suspendida",      //REPROGRAMADO
            'ATE': "Planificación Atendida",        //ATENDIDAS
            'SINMARCA': ""                          //REQUISITO VENCIDO
        };
    };
    const filterFracc = (Fraccionamientos: any) => {
        let fraccs: string = "";
        fraccs = Fraccionamientos && Fraccionamientos.length > 0 ? Fraccionamientos.map(f => f.Clave).join(',') : null;
        //for (const x in Fraccionamientos) {
        //    fracc += Fraccionamientos[x].ID + ","
        //}
        //let count = fracc.length;
        //let fraccparams = fracc.slice(0, count - 1);
        return fraccs;
    };
    export class Vista extends page.Base {
        onExcel(): void {
            let model: any = Forms.getForm(PAGE_ID);
            if (!filterFracc(model.Fraccionamientos)) {
                global.info('Seleccione un fraccionamiento');
                return;
            }
            let item: any = {};
            item['Plaza'] = model.PlazaInicial.ID;
            item['Fraccionamiento'] = global.filterFracc(model.Fraccionamientos);
            item['Vocaciones'] = model.Vocaciones.ID;
            item['FechaInicial'] = model.FechaInicio;
            item['FechaFinal'] = model.FechaFinal;
            item['Opcionales'] = model.Opcionales;
            //item['Otros'] ='OtroValor';

            //console.log(item)
            //Exportamos a Excel
            let formName: string = "CapturaFechaConstruccion";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "CapturaFechaConstruccion/Excel/");
            form.setAttribute("target", formName);
            //
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = (JSON.stringify(item));
            form.appendChild(input);
            //
            document.body.appendChild(form);
            //console.log(formName);
            //
            window.open("about:blank", formName);
            //
            form.submit();
            //
            document.body.removeChild(form);
        };
        OpenEntregaMasivaModal(): void {
            //console.log('open modal masivas');
            let tipoAgenda: any;
            let glTipoAgenda: DataElement = global.getStateItem("global.TipoAgenda") as DataElement;
            
           
            if (glTipoAgenda) {
                if (global.isSuccessful(glTipoAgenda)) {
                    let tiposAgenda: any[] = global.getData(glTipoAgenda, []);
                    if (tiposAgenda && tiposAgenda.length > 0) {
                        let items: any[] = tiposAgenda.filter((value) => { return value.Clave === "FechaConstruccion" }) as any[];
                        tipoAgenda = !(items && items.length > 0) ? null : items[0];
                    };
                };
            };
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
            }
        };
        componentWillMount(): void {
            Forms.remove("CapturaFechaConstruccion");
        };
        componentDidMount(): void {
            //configuración necesaria para inicializar agenda.
            if (!global.isLoadingOrSuccessful(global.getStateItem("global.TipoAgenda"))) {
                global.dispatchAsync("load::TipoAgenda", "catalogos/get(TipoAgenda)");
            };

            //configuración necesaria para inicializar agenda.
            global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: "FechaConstruccion" });
        };
        componentWillUnmount(): void {
            Forms.remove("CapturaFechaConstruccion");
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowNew={false} allowSave={false} allowEdit={false} allowDelete={false}>
                <PageButtons>
                    <NewButton onClick={this.OpenEntregaMasivaModal} />
                    <ExcelButton onClick={this.onExcel} />
                </PageButtons>
                <Filtros />
                <ResultView />
            </page.Main>;
        };
    };

    let Filtros: any = global.connect(class extends React.Component<IConsultaViviendaEntregableProps, {}> {
        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);
            this.onSelectCapturaFechaConstruccion = this.onSelectCapturaFechaConstruccion.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada;
            return retValue;
        };
        componentDidMount(): void {
            config.setState({ viewMode: false });
            global.dispatchSuccessful("global-page-data", global.createSuccessfulStoreObject([]), PAGE_CONSTRUCCION_RESULT_ID);
            global.dispatchSuccessful("load::funcionAgenda", { tipo: "PostVenta" });
        };
        componentWillReceiveProps(nextProps: IConsultaViviendaEntregableProps, nextState: IConsultaViviendaEntregableProps): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                //Forms.updateFormElement(PAGE_ID, "FraccInicial", null)
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        };
        CambiarListaSegmentos() {
            //console.log('sdsd')
        }
        onSelectCapturaFechaConstruccion(changeViewMode?: boolean): void {
            let model: any = Forms.getForm(PAGE_ID);
            //console.log(model);
            if (!filterFracc(model.Fraccionamientos)) {
                global.info('Seleccione un fraccionamiento');
                return;
            }
            let plaza: any = model.PlazaInicial.ID;
            let fraccionamiento: any = global.filterFracc(model.Fraccionamientos);
            let vocaciones: any = model.Vocaciones.ID;
            let FechaInicial: any = model.FechaInicio;
            let FechaFinal: any = model.FechaFinal;
            let Opcionales: any = model.Opcionales;
            let cliente: any = model.Cliente && model.Cliente != null && model.Cliente != undefined && model.Cliente.ID != null && model.Cliente.ID != undefined ? model.Cliente.ID : null;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID: '-2' : '-2'
            //console.log(segmento)
            let p: any = global.assign({
                Plaza: plaza,
                Fraccionamiento: fraccionamiento,
                Vocaciones: vocaciones,
                FechaInicial: FechaInicial,
                FechaFinal: FechaFinal,
                Opcionales: Opcionales,
                Cliente: cliente,
                Segmento: segmento
            });
            console.log(p)
            global.dispatchAsyncPost("global-page-data", "ConsultaViviendaEntregable/GetDetallesReprog/", { Uso: 'FCONS' }, "CheckListResult");
            global.dispatchAsyncPost("global-page-data", "base/kontrol/CapturaFechaConstruccion/GetBP/GetFechaConstruccion/", { parametros: p }, PAGE_CONSTRUCCION_RESULT_ID);
            dispatchSuccessful('load::paramNewSearchData', p);
        };
        render(): JSX.Element {
            let idForm: any = EK.Store.getState().forms[PAGE_ID] ? EK.Store.getState().forms[PAGE_ID] : null;
            let color: string = "#d26c35";
            let className: string = "";
            if (idForm === null || idForm === undefined) {

            } else {
                if (idForm.hasChanged) {
                    color = "white";
                    className = " btn-editing";
                }
            };
            let UrlAplicacion: any = window.location;
            let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra")
            let fechaInicial: Date = global.getToday(true);
            fechaInicial.setFullYear(fechaInicial.getFullYear() - 3);

            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros de Fecha de validación CAT"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelectCapturaFechaConstruccion} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row>
                        <Column size={[12, 12, 12, 12]} >
                            {/*<PlazasDDL id={"PlazaInicial"} label={"PLAZA"} size={[12, 12, 4, 4]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />*/}
                            {/*<VocacionesSPVDDL id={"Vocaciones"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                            {/*<FraccionamientosDDL id={"FraccInicial"} size={[12, 12, 4, 4]} idForm={PAGE_ID} validations={[validations.required()]} />*/}
                            <ddl.PlazasDDL id="PlazaInicial" label={"PLAZAS"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                            <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} onChange={this.CambiarListaSegmentos.bind(this)} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                            <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]}  />
                           
                            <DatePicker id="FechaInicio" idForm={PAGE_ID} label={"FECHA INICIAL"} type="date" size={[12, 12, 2, 2]} validations={[validations.required()]} value={fechaInicial} />
                            <DatePicker id="FechaFinal" idForm={PAGE_ID} label={"FECHA FINAL"} value={global.getObtenerFecha()} type="date" size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                           
                        </Column>
                    </Row>
                    <Row>
                        <Column size={[12, 12, 12, 12]} >
                            <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} /> 
                            {/*<ddl.TagsFraccionamientosV2 id="Fraccionamientos" className={"has-success"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                            <select.ClientesSPV id={"Cliente"} idForm={PAGE_ID} size={[12, 12, 4, 4]} required={false} />
                            {!IntraUrbana? 
                            <select.ClientesSPVML id={"Cliente"} label={'Cliente (Manzana y Lote)'} idForm={PAGE_ID} size={[12, 12, 4, 4]} required={false} />
                            : <select.ClientesSPVEND id={"Cliente"} label={'Ubicacion (Edificio, Nivel, Dpto)'} idForm={PAGE_ID} size={[12, 12, 4, 4]} required={false} />}

                        </Column>
                    </Row>
                    <Row>
                        <Column size={[12, 12, 12, 12]} >
                            <div className=" col-xs-12 col-sm-12 col-md-5 col-lg-5" style={{ marginTop: "25px" ,paddingBottom:'20px'}}>
                                <EK.UX.RadioButton$Form id={RADIO_TODOS_ID} idForm={PAGE_ID} label={"Todas"} value={RADIO_TODOS_ID} groupName={"Opcionales"} size={[12, 12, 4, 4]} />
                                <EK.UX.RadioButton$Form id={RADIO_VIVIENDAENT_ID} idForm={PAGE_ID} label={"Vivienda Entregada"} value={"VerViviendaEnt"} groupName={"Opcionales"} size={[12, 12, 4, 4]} />
                                <EK.UX.RadioButton$Form id={RADIO_SINPROG_ID} idForm={PAGE_ID} label={"Sin Programar"} value={"SinProgramar"} groupName={"Opcionales"} size={[12, 12, 4, 4]} />
                            </div>
                        </Column>
                    </Row>
                </page.OptionSection>
            </Column>;
        }
    });

    interface IConsultaViviendaEntregableProps extends page.IProps {
        editCte?: any;
        ItemAgendado?: any;
        agendaActualizada?: any;
        plaza?: any;
    };

    let ResultView: any = global.connect(class extends React.Component<IConsultaViviendaEntregableProps, {}> {
        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
            this.onClickCancel = this.onClickCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.data = state.global.catalogo$CapturaFechaConstruccionResult;
            retValue.editCte = state.forms[SECTION_CAPTURA_FECHA];
            retValue.ItemAgendado = state.global.catalogo$AgendaNew;
            retValue.agendaActualizada = state.global.ACTDETALLEAGENDA;
            return retValue;
        };
        static defaultProps: IConsultaViviendaEntregableProps = {
            data: createSuccessfulStoreObject([]),
        };
        onSelect(item: any): void {
            // let users = EK.Store.getState().global.PERSONALENTREGAVXFRACC.data;
            // console.log(item.num_entrega_viv);
            //console.log(item);
            dispatchSuccessful('load::itemSelectedInRow', item);
            Forms.updateFormElement(SECTION_CAPTURA_FECHA, "PersonaEntregaV", null);
            Forms.updateFormElement(SECTION_CAPTURA_FECHA, "FechaConstruccionEdit", item);
            let EntregaVivienda: any = Forms.getValue("FechaConstruccionEdit", SECTION_CAPTURA_FECHA);
            let model: any = Forms.getForm(SECTION_CAPTURA_FECHA);
            let plaza: any = model.FechaConstruccionEdit.id_identificador;
            let fraccionamiento: any = model.FechaConstruccionEdit.IdFraccionamiento;
            // global.dispatchAsyncPost("load::PERSONALENTREGAVXFRACC", "CapturaFechaConstruccion/GetPersonaEntregaVxFracc/", { Plaza: plaza, Fraccionamiento: fraccionamiento }, "PersonaEntregaVxFracc");
            global.asyncPost("CapturaFechaConstruccion/GetPersonaEntregaVxFracc/", { Plaza: plaza, Fraccionamiento: fraccionamiento }, (status: AsyncActionTypeEnum, data: any[]) => {
                if (status === AsyncActionTypeEnum.successful) {
                    global.dispatchSuccessful("load::PERSONALENTREGAVXFRACC", data, "PersonaEntregaVxFracc");
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                                if (data[i].Clave === item.num_entrega_viv) {
                                    let itemSingle = data[i];
                                    //console.log(itemsingle)
                                    Forms.updateFormElement(SECTION_CAPTURA_FECHA, 'PersonaEntregaV', itemSingle);
                                    break;
                                }
                        }
                    }
                    let PersonaEntrega: any;
                    let fec_liberacion: any;
                    let fecha_entrega: any;
                    //console.log(EntregaVivienda)
                    if (EntregaVivienda !== undefined) {
                        PersonaEntrega = EntregaVivienda.Personaentregavivienda;
                        fec_liberacion = EntregaVivienda.fec_liberacion;
                        fecha_entrega = EntregaVivienda.fecha_entrega;
                    };

                    if (fecha_entrega) {
                        EK.Global.info("No se puede cargar la fecha de validación CAT porque ya esta capturada la fecha de entrega");
                        return;
                    };

                    if (EntregaVivienda && EntregaVivienda.EstatusAgendaConstruccion && EntregaVivienda.EstatusAgendaConstruccion.Clave === 'ATE') {
                        EK.Global.warning('No puede planificar la fecha de construcción, porque ya fue atendida');
                        return;
                    };

                    if (EntregaVivienda && EntregaVivienda.EstatusAgendaConstruccion && EntregaVivienda.EstatusAgendaConstruccion.Clave === 'SUS') {
                        EK.Global.warning('Esta cita está CANCELADA, puede realizar una Reprogramación');
                        return;
                    };

                    if (PersonaEntrega === null) {
                        EK.Global.info("Debe configurar un Agente para Entrega de Vivienda ");
                        return;
                    }
                    //else if (fec_liberacion === null || fec_liberacion === undefined) {
                        //EK.Global.info("Debe configurar una Fecha de Liberación para poder Capturar un Compromiso de Construcción");
                    //}

                   // else {
                        if (this.props.config) {
                            this.props.config.setState({ viewMode: false }, PAGE_CONSTRUCCION_RESULT_ID);
                        }
                    //};

                    let tipoAgenda: any = global.assign(item.TipoAgenda, { Clave: "FechaConstruccion" });
                    global.dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: tipoAgenda.Clave });
                    global.dispatchSuccessful("load::selectedUserForConst", item);
                }
            });
            //NUEVA MODIFICACION
            //setTimeout(() => {
            //    let personas = EK.Store.getState().global.PERSONALENTREGAVXFRACC.data;
            //    console.log(personas)
            //    if (personas.length > 0) {
            //        for (let i = 0; i < personas.length; i++) {
            //            if (personas[i].Clave === item.num_entrega_viv) {
            //                let item = personas[i];
            //                Forms.updateFormElement(SECTION_CAPTURA_FECHA, 'PersonaEntregaV', item);
            //                break;
            //            }
            //        }
            //    }
            //}, 750);

            // FIN NUEVA MODIFICACION   
           // PUT OLD CODE UNDER THIS LINE
        };
        onClickCancel(): void {
            if (this.props.config) {
                this.props.config.setState({ viewMode: true }, PAGE_CONSTRUCCION_RESULT_ID);
            };
        };
        onSelectCheklist(item: any): void {
            dispatchSuccessful("load::CheckListParameters", { uso: 'FCONS', origen: 'CONS' });
            //Abrimos el Modal
            let modalObject: any = $("#modalCheckList");
            modalObject.modal();
            modalObject.css("height", "auto");
            //Actualizamos el Estado
            Forms.updateFormElement(SECTION_CHECKLIST, "CheckListEdit", item);
            //Cargamos Elementos del Item si tiene agregados
            global.asyncPost("CapturaFechaConstruccion/GetProgramados/", { numcte: item.numcte, Uso: 'FCONS' }, (status: AsyncActionTypeEnum, data: any[]) => {
                if (status === AsyncActionTypeEnum.successful) {
                    Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", data);
                };
            });
        };
        //Abrimos Modal Fecha Construccion
        onNewCalendar(): void {
            //console.log('nuevoCalendario');
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", []);
            //Obtenemos item seleccionado
            let valorEdicion: any = Forms.getValue("FechaConstruccionEdit", SECTION_CAPTURA_FECHA);
            let personalEntregaVivienda: any = Forms.getValue("PersonaEntregaV", SECTION_CAPTURA_FECHA);
            if (personalEntregaVivienda === null || personalEntregaVivienda === undefined || personalEntregaVivienda.ID === null) {
                EK.Global.warning('No está configurada la Persona para la entrega de la vivienda');
                return;
            };

            let fechaActual: Date = new Date();
            let fechaPropuesta: Date;
            Forms.updateFormElement("AgendaNew", "FechaInicio", null);
            fechaActual = global.FechaPropuesta(fechaActual, 1);
            fechaPropuesta = global.FechaPropuesta(fechaActual, 1);
            Forms.reset('AgendaNew');
            Forms.updateFormElement("AgendaNew", "FechaInicio", fechaActual);
            Forms.updateFormElement("AgendaNew", "TipoAgenda", valorEdicion.TipoAgenda != null && valorEdicion.TipoAgenda != undefined ? valorEdicion.TipoAgenda : null);
            dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: valorEdicion.TipoAgenda.Clave });
            dispatchDefault("load::AgendaNewCalendasUser", null);

            valorEdicion.ProcesoEjecutado = 'PROGRAMACION';
            valorEdicion.num_entrega_viv = personalEntregaVivienda.ID;
            valorEdicion.Personaentregavivienda = personalEntregaVivienda.Nombre;

            Forms.updateFormElement(SECTION_CAPTURA_FECHA, "FechaConstruccionEdit", valorEdicion);
            let Ubicaciones: any[] = valorEdicion;
            ///Actualizamos el Estados de las Ubicaciones
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", [Ubicaciones]);
            //Abrimos el Modal
            let modalObject: any = $("#modalCalen");
            modalObject.modal();
            modalObject.css("height", "auto");
        };
        //Abrimos Modal Reprogramacion de Fecha de Construccion
        onNewReprogramacion(IdAgenda: any, IdAgendaDetalle: any): void {
            if (IdAgenda === 0 && IdAgendaDetalle === 0) {
                this.onNewCalendar();
                return;
            }
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", []);
            let valorEdicion: any = Forms.getValue("FechaConstruccionEdit", SECTION_CAPTURA_FECHA);
            let personalEntregaVivienda: any = Forms.getValue("PersonaEntregaV", SECTION_CAPTURA_FECHA);
            if (personalEntregaVivienda === null || personalEntregaVivienda === undefined || personalEntregaVivienda.ID === null) {
                EK.Global.warning('No está configurada la Persona para la entrega de la vivienda');
                return;
            };
            Forms.updateFormElement("CapturaInfo", "DetalleCteAgendaEdit", null);
            Forms.updateFormElement("DetallesCita", "AgendaDetallesCitaResult", null);
            let enviartipoAgenda: any = valorEdicion.TipoAgenda.Clave
            dispatchSuccessful("load::SPVparametroTipoAgenda", { TipoAgenda: enviartipoAgenda });

            valorEdicion.ProcesoEjecutado = 'REPROGRAMACION';
            valorEdicion.num_entrega_viv = personalEntregaVivienda.ID;
            valorEdicion.Personaentregavivienda = personalEntregaVivienda.Nombre;

            Forms.updateFormElement(SECTION_CAPTURA_FECHA, "FechaConstruccionEdit", valorEdicion);
            let Ubicaciones: any[] = valorEdicion;
            Forms.updateFormElement("CapturaInfo", "UbicacionesAgendaEdit", [Ubicaciones]);
            let modalObject: any = $("#modalAgendaInformacionCita");


            modalObject.modal();
            modalObject.css("height", "auto");
            let idAgenda: any = IdAgenda;
            let idAgendaDetalle: any = IdAgendaDetalle;
            let claveTipoAgenda: any = 'FechaConstruccion';

            let p: any = global.assign({
                IdAgenda: idAgenda,
                ClaveTipoAgenda: claveTipoAgenda,
                IdAgendaDetalle: idAgendaDetalle,
            });

            global.dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/GetAgendaDetalleCita/", { parametros: p }, "AgendaDetallesCitaResult");
        };
        shouldComponentUpdate(nextProps: IConsultaViviendaEntregableProps, { }): boolean {
            return hasChanged(this.props.editCte, nextProps.editCte) ||
                hasChanged(this.props.data, nextProps.data) ||
                hasChanged(this.props.ItemAgendado, nextProps.ItemAgendado) ||
                hasChanged(this.props.agendaActualizada, nextProps.agendaActualizada);
        };

        equalDates(d1: Date, d2: Date, validacion: any): boolean {
            let cDate: Date = d1 ? new Date(d1.getTime()) : null;
            let nDate: Date = d2 ? new Date(d2.getTime()) : null;

            if (cDate === null || nDate === null) return true;
            switch (validacion) {
                case '!=':
                    return cDate.getTime() !== nDate.getTime();
                case '<':
                    return cDate.getTime() < nDate.getTime();
                case '>':
                    return cDate.getTime() > nDate.getTime();
                case '=':
                    return cDate.getTime() == nDate.getTime();
                case '<=':
                    return cDate.getTime() <= nDate.getTime();
                case '>=':
                    return cDate.getTime() >= nDate.getTime();
                default:
                    return false;
            }
        };

        componentWillReceiveProps(nextProps: IConsultaViviendaEntregableProps, nextState: IConsultaViviendaEntregableProps): void {
            // let ubicacionesUpd = getData(EK.Store.getState().global.DataUbicacionesPlanificadas).FechaInicio;
            
            // console.log(ubicacionesUpd);
            if (hasChanged(this.props.ItemAgendado, nextProps.ItemAgendado) && global.isSuccessful(nextProps.ItemAgendado)) {
                if (nextProps.ItemAgendado && getData(nextProps.ItemAgendado).FechaInicio) {
            //        // console.log(nextProps);
                    let itemEditado: any = getData(nextProps.ItemAgendado);
                    let entidades: DataElement = this.props.config.getCatalogo(PAGE_CONSTRUCCION_RESULT_ID);
                    //console.log(JSON.stringify(itemEditado));
                    // console.log(JSON.stringify(entidades.data));
            //        console.log(this.props.config);
                    if (getData(nextProps.ItemAgendado).FechaInicio && entidades.data.length != 0) {
                        // itemEditado.EstatusAgenda.Clave = "ACT";
                        for (var i = 0; i < entidades.data.length; i++) {
            //                // ubi:
                            //for (let j = 0; j < itemEditado.UbicacionesAgenda.length; j++) {
                            //    if (entidades.data[i].ID === itemEditado.UbicacionesAgenda[j].IdExpediente) {
                                    
                            //        console.log(entidades.data[i].ID, itemEditado.UbicacionesAgenda[j].IdExpediente)
                            //        if (itemEditado.ProcesoEjecutado === "PROGRAMACION" || itemEditado.ProcesoEjecutado === null) {

                            //            if (itemEditado.EstatusAgenda != undefined && itemEditado.EstatusAgenda != null) {
                            //                entidades.data[i].IdAgenda = itemEditado.UbicacionesAgenda[0].IdAgenda
                            //                entidades.data[i].IdAgendaFechaConst = itemEditado.UbicacionesAgenda[0].ID
                            //                entidades.data[i].fecha_construccion = itemEditado.FechaInicio;
                            //                entidades.data[i].EstatusAgendaConstruccion = itemEditado.EstatusAgenda;
                            //                console.log(entidades.data[i].EstatusAgendaConstruccion.Clave);
                            //                // break ubi;
                            //            }
                            //        } else {
                            //            // alert("Visualizar la Fecha de Reprogramación del compromiso de CONSTRUCCION")
                            //        }
                            //    }
                            //}
                            if (entidades.data[i].ID === itemEditado.UbicacionesAgenda[0].IdExpediente) { // esta linea, se colocla [0] porque se supone que desde estas ventas no se puede planificar unsa sola ubicación
                                if (itemEditado.ProcesoEjecutado === "PROGRAMACION" || itemEditado.ProcesoEjecutado === null) {
                                    if (itemEditado.EstatusAgenda != undefined && itemEditado.EstatusAgenda != null) {
                                        entidades.data[i].IdAgenda = itemEditado.UbicacionesAgenda[0].IdAgenda
                                        entidades.data[i].IdAgendaFechaConst = itemEditado.UbicacionesAgenda[0].ID
                                        entidades.data[i].fecha_construccion = itemEditado.FechaInicio;
                                        entidades.data[i].EstatusAgendaConstruccion = itemEditado.EstatusAgenda;
                                        break;
                                    }
                                } else {
                                    // alert("Visualizar la Fecha de Reprogramación del compromiso de CONSTRUCCION")
                                }
                                break;
                            }
                        }
                        
                    }
                     global.dispatchSuccessful("global-page-data", entidades, PAGE_CONSTRUCCION_RESULT_ID);
                        if (this.props.config) {
                            this.props.config.setState({ viewMode: true }, PAGE_CONSTRUCCION_RESULT_ID);
                     };                 
                }
            };

            if (hasChanged(this.props.agendaActualizada, nextProps.agendaActualizada) && global.isSuccessful(nextProps.agendaActualizada)) {
                if (nextProps.agendaActualizada && getData(nextProps.agendaActualizada).FechaInicio) {
                    let fini = getData(nextProps.agendaActualizada).FechaInicio;
                    let itemEditado: any = getData(nextProps.agendaActualizada);
                    //if (this.equalDates(fini, new Date(), '<')) {
                    //    itemEditado.EstatusAgenda.Clave = "ATE";
                    //}

                    let entidades: DataElement = this.props.config.getCatalogo(PAGE_CONSTRUCCION_RESULT_ID);
                    if (getData(nextProps.agendaActualizada).FechaInicio && entidades.data.length != 0) {
                        for (var i = 0; i < entidades.data.length; i++) {
                            if (entidades.data[i].ID === itemEditado.IdExpediente) { // esta linea, se colocla [0] porque se supone que desde estas ventas no se puede planificar unsa sola ubicación
                                entidades.data[i].IdAgendaFechaConst = itemEditado.IdAgendaDetalle;
                                entidades.data[i].IdAgenda = itemEditado.ID;
                                entidades.data[i].fecha_construccion = itemEditado.FechaInicio;
                                entidades.data[i].EstatusAgendaConstruccion = itemEditado.EstatusAgenda;
                                break;
                            }
                        }
                    }
                    global.dispatchSuccessful("global-page-data", entidades, PAGE_CONSTRUCCION_RESULT_ID);
                    if (this.props.config) {
                        this.props.config.setState({ viewMode: true }, PAGE_CONSTRUCCION_RESULT_ID);
                    }
                }
            };
        };

        onRowDClick(item: any): void {
            return null;
        };

        header(info: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info}</h6>
                </span>
            </div>
        };
        render(): JSX.Element {
            let state: any = EK.Store.getState();
            let stateDataFC: any = global.getData(this.props.config.getState());
            let fechaConstruccion: any = state.forms[SECTION_CAPTURA_FECHA] &&
                state.forms[SECTION_CAPTURA_FECHA].form &&
                state.forms[SECTION_CAPTURA_FECHA].form.FechaConstruccionEdit &&
                state.forms[SECTION_CAPTURA_FECHA].form.FechaConstruccionEdit.value &&
                state.forms[SECTION_CAPTURA_FECHA].form.FechaConstruccionEdit.value.fecha_construccion ?
                state.forms[SECTION_CAPTURA_FECHA].form.FechaConstruccionEdit.value.fecha_construccion : null;

            let itemEditado: any = state.forms[SECTION_CAPTURA_FECHA] &&
                state.forms[SECTION_CAPTURA_FECHA].form &&
                state.forms[SECTION_CAPTURA_FECHA].form.FechaConstruccionEdit &&
                state.forms[SECTION_CAPTURA_FECHA].form.FechaConstruccionEdit.value ? state.forms[SECTION_CAPTURA_FECHA].form.FechaConstruccionEdit.value : null;

            let EntregaVivienda: any = Forms.getValue("FechaConstruccionEdit", SECTION_CAPTURA_FECHA);
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
            let UrlAplicacion: any = window.location;
            //console.log(itemEditado)
            if (EntregaVivienda !== undefined) {
                PersonaEntrega = EntregaVivienda.Personaentregavivienda;
                // PersonaEntrega = 'GONZALEZ TARIN CLAUDIA';
                IdAgendaDetalle = EntregaVivienda.IdAgendaFechaConst;
                IdAgenda = EntregaVivienda.IdAgenda;
                cliente = itemEditado.numcte + " - " + itemEditado.nom_cte + " " + itemEditado.ap_paterno_cte + " " + itemEditado.ap_materno_cte;
                fraccionamiento = itemEditado.id_cve_fracc + " " + itemEditado.nom_fracc;
                plaza = itemEditado.id_identificador + " " + itemEditado.descripcion;
                et = UrlAplicacion.pathname.includes("intra")? itemEditado.edificio: itemEditado.id_num_smza;
                mz = UrlAplicacion.pathname.includes("intra") ? itemEditado.nivel: itemEditado.id_num_mza;
                lt = itemEditado.id_num_lote;
                int = itemEditado.id_num_interior;
                ext = itemEditado.id_num_exterior;
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

                if (row.DiasSinFecha > 15 && !row.fecha_construccion) {
                    itemStyle.color = "#F44336";
                    itemStyle.fontWeight = "bolder";
                };

                return <span style={itemStyle}>{data}</span>
            };

            let formatConfigAccionesConstruccion: (data: any, row: any) => any = (data: any, row: any): any => {
                let w: any = window;
                let windowFn: string = "$$IDConstruccion";
                let estatusAgenda: any = !(row.EstatusAgendaConstruccion && row.EstatusAgendaConstruccion.Clave) ? "" : row.EstatusAgendaConstruccion.Clave;
                //
                if (!w[windowFn]) {
                    w[windowFn] = (item: any, tipo: number) => {
                        if (tipo === 0) {
                            this.onSelect(item)
                        }
                        else if (tipo === 1) {
                            this.onSelectCheklist(item);
                        }
                    };
                };
                //
                return <div style={{ textAlign: "center" }}>
                    <div className="btn btn-circle btn-xs" title="Fecha de Construcción">
                        <a style={{}} data-id="data" onClick={() => w[windowFn](row, 0)} className="boton"><i className="fa fa-calendar"></i></a>
                    </div>
                    {row.fecha_construccion === null || row.fecha_programacion === null ?
                        <div className="btn btn-circle btn-xs">
                            <a style={{ color: "#0000" }} data-id="data" className="boton"><i className="fas fa-clipboard-list"></i></a>
                        </div> :
                        <div className="btn btn-circle btn-xs" title="CheckList">
                            <a style={{}} data-id="data" onClick={() => w[windowFn](row, 1)} className="boton"><i className="fas fa-clipboard-list"></i></a>
                        </div>
                    }
                    {estatusAgenda ?
                        <div className="btn btn-circle btn-xs" title="Planificación Construcción">
                            <a style={{}} data-id="data" className="boton"><i title={EstatusCalendarDashBoardInfo.tituloCita[estatusAgenda]} className={EstatusCalendarDashBoardInfo.iconos[estatusAgenda]} style={{ color: EstatusCalendarDashBoardInfo.iconosColor[estatusAgenda] }}></i></a>
                        </div> :
                        <div className="btn btn-circle btn-xs">
                            <a style={{ color: "#0000" }} data-id="data" className="boton"><i className="glyphicon glyphicon-play"></i></a>
                        </div>
                    }
                </div>;
            };

            //console.log(UrlAplicacion);
            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);

            let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'Departamento' : 'Número Interior';
            if (UrlAplicacion.pathname.includes("intra")) {
                dtConfig.columns
                    .add({ data: "numcte", title:"No. cliente", width: "100px", fixed: true, align:'center' })
                    .add({ data: "Nombre", width: "300px", fixed: true, format: formatCliente })
                    .add({ data: "ID", title: "", width: "100px", format: formatConfigAccionesConstruccion, fixed: true })
                    .add({ data: "Fraccionamiento", width: "200px" })
                    .add({ data: "edificio", title: "Edificio", width: "150px" })
                    .add({ data: "nivel", title: "Nivel", width: "150px" })
                    .add({ data: "id_num_interior", title: labelInterior, width: "150px" })
                    .add({ data: "Calle", width: '400px' })
                    .add({ data: "id_num_exterior", width: "150px" })
                    .add({ data: "Contratista", width: "300px" })
                    .add({ data: "desc_segm", width: "150px" })
                    .add({ data: "firma_escritura", width: "150px", format: formatDate })
                    .add({ data: "fec_liberacion", width: "150px", format: formatDate })
                    .add({ data: "DiasSinFecha", width: "150px", dataType: "number" })
                    .add({ data: "fecha_construccion", width: "150px", format: formatDateFull })
                    .add({ data: "Detalles_construccion", width: "200px" })
                    .add({ data: "fecha_entrega", width: "150px", format: formatDateFull })
                    .add({
                        data: "indicador_detalle", width: "200px", format: (data, row, index) => {
                            let style: React.CSSProperties = {
                                backgroundColor: row.ColorMotivoReprogramacion ? row.ColorMotivoReprogramacion : "none"
                            };

                            return <span style={style}>{data}</span>
                        }
                    })
                    .add({ data: "fecha_reprogramacion", width: "200px", format: formatDateFull })
                    .add({
                        data: "Personaentregavivienda", width: "200px", format: (data, row, index) => {
                            return row.Personaentregavivienda === null || row.Personaentregavivienda === undefined || row.Personaentregavivienda === 0 ? "NO" : ''
                        }
                    })
                    .add({ data: "pendiente_pago", width: "150px", format: formatBadgeOk })
                    .add({ data: "fec_pendiente_pago", width: "150px", format: formatDate })
                    .add({ data: "pago", width: "100px", format: formatBadgeOk })
                    .add({ data: "fec_pago", width: "150px", format: formatDate })
                    .add({ data: "dir_email", width: "250px" })
                    .add({ data: "CURP", width: "200px" })
                    .add({ data: "RFC", width: "200px" })
                    .add({ data: "Celular", width: "120px" })
                    .add({ data: "tel_casa", width: "120px" })
                    .add({ data: "tel_oficina", width: "120px" })
                    .toArray();

            } else {
                dtConfig.columns
                    .add({ data: "numcte", title: "No. cliente", width: "100px", fixed: true, align: 'center'})
                    .add({ data: "Nombre", width: "300px", fixed: true, format: formatCliente })
                    .add({ data: "ID", title: "", width: "100px", format: formatConfigAccionesConstruccion, fixed: true })
                    .add({ data: "Fraccionamiento", width: "200px" })
                    .add({ data: "id_num_smza", width: "100px" })
                    .add({ data: "id_num_mza", width: "140px" })
                    .add({ data: "id_num_lote", width: "100px" })
                    .add({ data: "id_num_interior", title: labelInterior, width: "150px" })
                    .add({ data: "Calle", width: '400px' })
                    .add({ data: "id_num_exterior", width: "150px" })
                    .add({ data: "Contratista", width: "300px" })
                    .add({ data: "desc_segm", width: "150px" })
                    .add({ data: "firma_escritura", width: "150px", format: formatDate })
                    .add({ data: "fec_liberacion", width: "150px", format: formatDate })
                    .add({ data: "DiasSinFecha", width: "150px", dataType: "number" })
                    .add({ data: "fecha_construccion", width: "150px", format: formatDateFull })
                    .add({ data: "Detalles_construccion", width: "200px" })
                    .add({ data: "fecha_entrega", width: "150px", format: formatDateFull })
                    .add({
                        data: "indicador_detalle", width: "200px", format: (data, row, index) => {
                            let style: React.CSSProperties = {
                                backgroundColor: row.ColorMotivoReprogramacion ? row.ColorMotivoReprogramacion : "none"
                            };

                            return <span style={style}>{data}</span>
                        }
                    })
                    .add({ data: "fecha_reprogramacion", width: "200px", format: formatDateFull })
                    .add({
                        data: "Personaentregavivienda", width: "200px", format: (data, row, index) => {
                            return row.Personaentregavivienda === null || row.Personaentregavivienda === undefined || row.Personaentregavivienda === 0 ? "NO" : ''
                        }
                    })
                    .add({ data: "pendiente_pago", width: "150px", format: formatBadgeOk })
                    .add({ data: "fec_pendiente_pago", width: "150px", format: formatDate })
                    .add({ data: "pago", width: "100px", format: formatBadgeOk })
                    .add({ data: "fec_pago", width: "150px", format: formatDate })
                    .add({ data: "dir_email", width: "250px" })
                    .add({ data: "CURP", width: "200px" })
                    .add({ data: "RFC", width: "200px" })
                    .add({ data: "Celular", width: "120px" })
                    .add({ data: "tel_casa", width: "120px" })
                    .add({ data: "tel_oficina", width: "120px" })
                    .toArray();

            }

            //dtConfig.columns
            //    .add({ data: "Nombre", width: "300px", fixed: true, format: formatCliente })
            //    .add({ data: "ID", title: "", width: "100px", format: formatConfigAccionesConstruccion, fixed: true })
            //    .add({ data: "Fraccionamiento", width: "200px" }).toArray();

            //    if (!UrlAplicacion.pathname.includes("intra")) {
            //        dtConfig.columns.add({ data: "id_num_smza", width: "100px" })
            //            .add({ data: "id_num_mza", width: "140px" })
            //            .add({ data: "id_num_lote", width: "100px" }).toArray();
            //    }
            //    if (UrlAplicacion.pathname.includes("intra")) {
            //        dtConfig.columns
            //            .add({ data: "edificio", title: "Edificio", width: "150px" })
            //            .add({ data: "nivel", title: "Nivel", width: "150px" }).toArray();
            //    }
                
            //dtConfig.columns
            //    .add({ data: "id_num_interior", title: labelInterior, width: "150px" })
            //    .add({ data: "Calle", width: '400px' })
            //    .add({ data: "id_num_exterior", width: "150px" })
            //    .add({ data: "Contratista", width: "300px" })
            //    .add({ data: "desc_segm", width: "150px" })
            //    .add({ data: "firma_escritura", width: "150px", format: formatDate })
            //    .add({ data: "fec_liberacion", width: "150px", format: formatDate })
            //    .add({ data: "DiasSinFecha", width: "150px", dataType: "number" })
            //    .add({ data: "fecha_construccion", width: "150px", format: formatDateFull })
            //    .add({ data: "Detalles_construccion", width: "200px" })
            //    .add({ data: "fecha_entrega", width: "150px", format: formatDateFull })
            //    .add({
            //        data: "indicador_detalle", width: "200px", format: (data, row, index) => {
            //            let style: React.CSSProperties = {
            //                backgroundColor: row.ColorMotivoReprogramacion ? row.ColorMotivoReprogramacion : "none"
            //            };

            //            return <span style={style}>{data}</span>
            //        }
            //    })
            //    .add({ data: "fecha_reprogramacion", width: "200px", format: formatDateFull })
            //    .add({
            //        data: "Personaentregavivienda", width: "200px", format: (data, row, index) => {
            //            return row.Personaentregavivienda === null || row.Personaentregavivienda === undefined || row.Personaentregavivienda === 0 ? "NO" : ''
            //        }
            //    })
            //    .add({ data: "pendiente_pago", width: "150px", format: formatBadgeOk })
            //    .add({ data: "fec_pendiente_pago", width: "150px", format: formatBadgeOk })
            //    .add({ data: "pago", width: "100px", format: formatBadgeOk })
            //    .add({ data: "fec_pago", width: "150px", format: formatDate })
            //    .add({ data: "dir_email", width: "250px" })
            //    .add({ data: "CURP", width: "200px" })
            //    .add({ data: "RFC", width: "200px" })
            //    .add({ data: "Celular", width: "120px" })
            //    .add({ data: "tel_casa", width: "120px" })
            //    .add({ data: "tel_oficina", width: "120px" })
            //    .toArray();

            

            return <div>
                <EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda.NewCalendarModalBase forma={stateDataFC && stateDataFC.multipleAppointments === true ? null : "Individual"} /* tipoAgenda={"FechaConstruccion"} */ />

                <page.SectionListExtended
                    id={PAGE_CONSTRUCCION_RESULT_ID}
                    parent={config.id}
                    icon="fa fa-table"
                    level={1}
                    onSave={null}
                    dtConfig={dtConfig}
                    hideNewButton={true}
                    size={[12, 12, 12, 12]}
                    readonly={true}
                    onCancel={this.onClickCancel.bind(this)}
                    onRowDoubleClick={this.onRowDClick}
                    items={createSuccessfulStoreObject([])}>
                    <Column size={[12, 12, 12, 12]}>
                        <Label idFormSection={SECTION_CAPTURA_FECHA} value={cliente} label={"Cliente"} size={[12, 12, 12, 12]} />
                        <Label idFormSection={SECTION_CAPTURA_FECHA} value={plaza} label={"Plaza"} size={[6, 6, 6, 6]} />
                        <Label idFormSection={SECTION_CAPTURA_FECHA} value={fraccionamiento} label={"Fraccionamiento"} size={[6, 6, 6, 6]} />
                        <Label idFormSection={SECTION_CAPTURA_FECHA} value={et} label={UrlAplicacion.pathname.includes("intra") ? "EDIFICIO":"ET"} size={[2, 2, 2, 2]} />
                        <Label idFormSection={SECTION_CAPTURA_FECHA} value={mz} label={UrlAplicacion.pathname.includes("intra") ? "NIVEL" :"MZ"} size={[2, 2, 2, 2]} />
                        {UrlAplicacion.pathname.includes("intra") ? null:
                            <Label idFormSection={SECTION_CAPTURA_FECHA} value={lt} label={"LT"} size={[2, 2, 2, 2]} />
                        }
                        <Label idFormSection={SECTION_CAPTURA_FECHA} value={int} label={UrlAplicacion.pathname.includes("intra") ? "DPTO" :"INT"} size={[3, 3, 3, 3]} />
                        <Label idFormSection={SECTION_CAPTURA_FECHA} value={ext} label={"EXT"} size={[3, 3, 3, 3]} />
                        <PersonaEntregaVxFraccDDL size={[7, 7, 7, 7]} id="PersonaEntregaV" label={"Personal entrega de vivienda:"} required={false} idFormSection={SECTION_CAPTURA_FECHA} />
                        <Label idFormSection={SECTION_CAPTURA_FECHA} value={global.formatDateTimeDirect(fechaConstruccion, true)} label={"Fecha Construccion:"} size={[3, 3, 3, 3]} />
                        {fechaConstruccion === undefined || fechaConstruccion === null ? <Row><Button size={[2, 2, 2, 2]} className="btn" keyBtn={"btnSPVNuevaPlanificacion"} icon="fa fa-calendar" style={{ marginTop: "15px", color: "#26c281" }} onClick={this.onNewCalendar} ></Button></Row> : null}
                        {fechaConstruccion === undefined || fechaConstruccion === null ? null : <Button size={[2, 2, 2, 2]} className="btn" keyBtn={"btnSPVReprogramarPlanificacion"} icon="fa fa-calendar" style={{ marginTop: "15px", color: "#26c281" }} onClick={(a, b) => this.onNewReprogramacion(IdAgenda, IdAgendaDetalle)} ></Button>}
                        {fechaConstruccion === undefined || fechaConstruccion === null ? null : <span className="badge badge-info" >Reprogramación </span>}
                    </Column>
                </page.SectionListExtended>
                <Column size={[12, 12, 12, 12]}>
                    <Row visible={global.isSuccessful(this.props.data) && global.getData(this.props.data).length > 0}>
                        <Column size={[12, 12, 12, 12]} style={{ textAlign: "right" }}>
                            <span className="badge badge-info list-footer-badge">
                                <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#F44336", alignmentBaseline: true }}></label>&nbsp;<span>SIN COMPROMISO</span><span></span>
                            </span>
                        </Column>
                    </Row>
                </Column>
            </div>;
        }
    });

    import globalSCV = EK.UX.SCV;
};