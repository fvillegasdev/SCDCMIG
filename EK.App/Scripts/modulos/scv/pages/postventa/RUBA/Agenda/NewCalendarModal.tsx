namespace EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda {
    "use strict";
    const AGENDA_ID_NEW: string = "AgendaNew";
    const SECTION_CAPTURA_INFO: string = "CapturaInfo";
    const SECTION_CONCEPTO_ID: string = "AgendaSPV";

    interface IModalCalendarProps extends page.IProps, grid.IColumn {
        agenda?: any;
        forma?: any;
        style?: React.CSSProperties;
        tipoAgenda?: any;
    };

    export let NewCalendarModalBase: any = global.connect(class extends React.Component<IModalCalendarProps, {}> {
        constructor(props: IModalCalendarProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoAgenda = state.global.SPVparametroTipoAgenda;
            return retValue;
        };
        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalCalendar {...this.props} tipoAgenda={global.getData(this.props.tipoAgenda).TipoAgenda} />
            </Column>
        };
    });

    //***Modal para mostrar la información de la cotización seleccionada***//
    let ModalCalendar: any = global.connect(class extends React.Component<IModalCalendarProps, {}> {
        constructor(props: IModalCalendarProps) {
            super(props);
            this.getUbicacionesAgendaConfig = this.getUbicacionesAgendaConfig.bind(this);
            this.state = { visualizarBotonGuardar: true };
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalCalendarProps = {};
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            agenda: state.global.catalogo$AgendaNew,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerItem: (id: number): void => { }
        });
        //Funcion para Obtener Ubicaciones Agenda(AgendaEntregaViviendaSPV)
        getUbicacionesAgendaConfig(): any {
            //Arreglo de Ubicaciones de la Agenda
            let UbicacionesAgenda: any[];
            //Obtenemos informacion del Array
            let retValues: any[] = [];
            let TipoAgenda: any = this.props.tipoAgenda;

            if (TipoAgenda === undefined) {
                TipoAgenda = 'EntregaVivienda'
            };

            UbicacionesAgenda = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
            //Validamos que Ubicaciones no este vacio
            if (UbicacionesAgenda === undefined || UbicacionesAgenda.length <= 0 || UbicacionesAgenda === null) {
                warning("Capture una Ubicación!");
            } else {
                UbicacionesAgenda = EK.Store.getState().forms.CapturaInfo.form.UbicacionesAgendaEdit.value;
                UbicacionesAgenda.forEach((value) => {
                    let retValue: any = global.assign(value.item, {
                        IdExpediente: value.numcte,
                        IdUsuarioAsignado: value.num_entrega_viv,
                        TipoAgenda: TipoAgenda
                    });
                    //
                    retValues.push(retValue);
                });
            };

            return retValues;
        };
        equalDates(d1: Date, d2: Date, validacion: any): boolean {
            let cDate: Date = d1 ? new Date(d1.getTime()) : null;
            let nDate: Date = d2 ? new Date(d2.getTime()) : null;

            if (cDate === null && nDate === null) return true;
            switch (validacion) {
                case '<>':
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
        transformaFecha: (date: Date, formatL?: boolean) => string = (date: Date, formatL?: boolean): string => {
            if (!date || date === null) {
                return "";
            };

            var language: any = global.getCurrentLanguage();
            var shortPattern: string = language.ShortDatePattern.toLowerCase();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? 0 + minutes : minutes;
            var strTime = " " + ("00" + hours).slice(-2) + ':' + ("00" + minutes).slice(-2) + ' ' + ampm;
            if (formatL === undefined || formatL === null || formatL === false) {
                strTime = "";
            }
            var pad: string = "00";
            return (pad + date.getDate().toString()).slice(-pad.length) + "/" + (pad + (date.getMonth() + 1).toString()).slice(-pad.length) + "/" + date.getFullYear() + strTime;
        };
        getOrdenesTrabajoAgendaConfig(): any {
            let retValues: any[] = [];
            let TipoAgenda: any = this.props.tipoAgenda;

            if (TipoAgenda === undefined) {
                TipoAgenda = "Contratista"
            }

            let ordenesTrabajo: any[] = Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO);
            if (ordenesTrabajo === undefined || ordenesTrabajo.length <= 0 || ordenesTrabajo === null) {
                global.warning("Capture una orden de trabajo. Por favor intente nuevamente.");
            } else {
                ordenesTrabajo = EK.Store.getState().forms.CapturaInfo.form.ContratistaOTAgendaEdit.value;
                ordenesTrabajo.forEach((value) => {
                    let retValue: any = global.assign(value, {
                        IdExpediente: value.IdOrdenTrabajo,
                        IdUsuarioAsignado: value.OrdenTrabajo.IdContratista,
                        TipoAgenda: TipoAgenda
                    });

                    retValues.push(retValue);
                });
            };

            return retValues;
        };
        getOrdenesTrabajoAgendaAreasConmunesConfig(): any {
            let retValues: any[] = [];
            let TipoAgenda: any = this.props.tipoAgenda;

            if (TipoAgenda === undefined) {
                TipoAgenda = "ContratistaAreasComunes"
            }

            let ordenesTrabajo: any[] = Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO);
            if (ordenesTrabajo === undefined || ordenesTrabajo.length <= 0 || ordenesTrabajo === null) {
                global.warning("Capture una orden de trabajo. Por favor intente nuevamente.");
            } else {
                ordenesTrabajo = EK.Store.getState().forms.CapturaInfo.form.ContratistaOTAgendaEdit.value;
                ordenesTrabajo.forEach((value) => {
                    let retValue: any = global.assign(value, {
                        IdExpediente: value.IdOrdenTrabajo,
                        IdUsuarioAsignado: value.OrdenTrabajo.IdContratista,
                        TipoAgenda: TipoAgenda
                    });

                    retValues.push(retValue);
                });
            };

            return retValues;
        };
        getDictamenesAgendaConfig(): any {
            let retValues: any[] = [];
            let TipoAgenda: any = this.props.tipoAgenda;

            if (TipoAgenda === undefined) {
                TipoAgenda = "Dictamen"
            }

            let dictamenes: any[] = Forms.getValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO);
            if (dictamenes === undefined || dictamenes.length <= 0 || dictamenes === null) {
                global.warning("Capture un Diagnóstico. Por favor intente nuevamente.");
            } else {
                dictamenes = EK.Store.getState().forms.CapturaInfo.form.DictamenesAgendaEdit.value;
                dictamenes.forEach((value) => {
                    let retValue: any = global.assign(value, {
                        IdExpediente: value.Dictamen.ID,
                        IdUsuarioAsignado: value.Dictamen.ResponsableDictamen.ID,
                        TipoAgenda: TipoAgenda
                    });
                    retValues.push(retValue);
                });
            };
            return retValues;
        };
        getDictamenesAreasComunesAgendaConfig(): any {
            let retValues: any[] = [];
            let TipoAgenda: any = this.props.tipoAgenda;

            if (TipoAgenda === undefined) {
                TipoAgenda = "DictamenAreasComunes"
            }

            let dictamenes: any[] = Forms.getValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO);
            if (dictamenes === undefined || dictamenes.length <= 0 || dictamenes === null) {
                global.warning("Capture un Diagnóstico. Por favor intente nuevamente.");
            } else {
                dictamenes = EK.Store.getState().forms.CapturaInfo.form.DictamenesAgendaEdit.value;
                dictamenes.forEach((value) => {
                    let retValue: any = global.assign(value, {
                        IdExpediente: value.Dictamen.ID,
                        IdUsuarioAsignado: value.Dictamen.ResponsableDictamen.ID,
                        TipoAgenda: TipoAgenda
                    });
                    retValues.push(retValue);
                });
            };
            return retValues;
        };
        onSaveAgenda(): void {
            
            this.setState({ visualizarBotonGuardar: false });
            if (!Forms.isValid(AGENDA_ID_NEW)) {
                warning("verificar los campos obligatorios");
                this.setState({ visualizarBotonGuardar: true });
                return;
            }

            let fechaInicioFormulario: any;
            let fechaFinFormulario: any;

            fechaInicioFormulario = Forms.getValue("FechaInicio", AGENDA_ID_NEW);
            let horaFin: any = Forms.getValue("HoraFIN", AGENDA_ID_NEW).Clave;

            if (horaFin === undefined || horaFin === null) {
                this.setState({ visualizarBotonGuardar: true });
                warning("Debe Indicar la Hora Fin");
                return;
            }

            var timePat = '^([01]?[0-9]|2[0-3]):[0-5][0-9]$';
            var matchArray = horaFin.match(timePat);

            if (matchArray == null) {
                this.setState({ visualizarBotonGuardar: true });
                return
            }

            var fechaProcesar = new Date(fechaInicioFormulario);
            var pad: string = "00";
            horaFin = horaFin + ':00.000';
            fechaFinFormulario = new Date(fechaProcesar.getFullYear() + '-' + (pad + (fechaProcesar.getMonth() + 1).toString()).slice(-pad.length) + '-' + (pad + fechaProcesar.getDate().toString()).slice(-pad.length) + ' ' + horaFin);



            if (this.equalDates(fechaFinFormulario, fechaInicioFormulario, "<=")) {
                warning("La hora fin no puede ser menor o igual a la hora de inicio ");
                this.setState({ visualizarBotonGuardar: true });
                return
            };

            let TipoAgenda: any = Forms.getValue("TipoAgenda", AGENDA_ID_NEW);
            if (TipoAgenda === undefined || TipoAgenda.Clave === 'Seleccione una opcion' || TipoAgenda.Clave === 'Todos' || TipoAgenda.ID <= 0 || TipoAgenda.Clave === undefined) {
                warning("Debe Seleccionar un Tipo de Agenda!");
                this.setState({ visualizarBotonGuardar: true });
                return;
            }
            //if (this.equalDates(fechaInicioFormulario, new Date(), "<")) {
            //    warning("La fecha y hora de inicio no puede ser menor a la fecha y hora actual");
            //    this.setState({ visualizarBotonGuardar: true });
            //    return
            //}
            switch (TipoAgenda.Clave) {
                case 'EntregaVivienda':   // POSTVENTA - ENTREGA DE VIVIENDA
                case 'FechaConstruccion': // POSTVENTA - FECHA DE CONSTRUCCION
                    //Guardado Agenda Entrada Vivienda SPV
                    let UbicacionesAgenda: any[] = this.getUbicacionesAgendaConfig();
                    if (UbicacionesAgenda === null || UbicacionesAgenda === undefined || UbicacionesAgenda.length === 0) {
                        this.setState({ visualizarBotonGuardar: true });
                        return;
                    }

                    Forms.updateFormElement(AGENDA_ID_NEW, "UbicacionesAgenda", UbicacionesAgenda);
                    let item: EditForm = Forms.getForm(AGENDA_ID_NEW);
                    let model: any = item
                        .addID()
                        .addObject("TipoAgenda")
                        .addString("Geolocalizacion")
                        .addVersion()
                        .toObject();
                    //Asignamos la Propiedad ubicaciones Agenda al Modelo
                    //let personaEntregaS: any = Forms.getValue("PersonaEntregaV", 'SeccionCapturaFechaConstruccion');
                    //let personaEntregaS: any = EK.Store.getState().forms.SeccionCapturaFechaConstruccion.form.PersonaEntregaV.value;
                    let modoFormulario: any = EK.Store.getState().global.massive;
                    let personaEntregaS: any = null;
                    let idPagina = getData(EK.Store.getState().global.pageConfig).id;
                    switch (idPagina) {
                        case 'CapturaFechaConstruccion':
                            if (modoFormulario != undefined && modoFormulario.data == "MASIVO") {
                                personaEntregaS = EK.Store.getState().forms.Agenda.form.PersonaEntregaV.value
                            } else {
                                personaEntregaS = EK.Store.getState().forms.SeccionCapturaFechaConstruccion.form.PersonaEntregaV.value
                            }
                            break;
                        case 'ConfigViviendaEntregable':

                            if (modoFormulario != undefined && modoFormulario.data == "MASIVO") {
                                personaEntregaS = EK.Store.getState().forms.Agenda.form.PersonaEntregaV.value
                            } else {
                                personaEntregaS = EK.Store.getState().forms.CapturaCampos.form.PersonaEntregaV.value
                            }

                            break;
                        case 'Agenda':
                            personaEntregaS = EK.Store.getState().forms.Agenda.form.PersonaEntregaV.value;
                            break;
                    }
                    


                    model["UbicacionesAgenda"] = UbicacionesAgenda;
                    for (const u of model.UbicacionesAgenda) {
                        u.IdUsuarioAsignado = personaEntregaS.ID;
                    }
                    //if (model.UbicacionesAgenda[0].IdUsuarioAsignado === undefined) {
                    //    for (const u of model.UbicacionesAgenda) {
                    //        u.IdUsuarioAsignado = EK.Store.getState().forms.Agenda.form.PersonaEntregaV.value.ID;
                    //    }
                    //}
                    model["FechaInicio"] = new Date(fechaInicioFormulario.getTime() - (fechaInicioFormulario.getTimezoneOffset() * 60000)).toISOString();
                    model["FechaFin"] = new Date(fechaFinFormulario.getTime() - (fechaFinFormulario.getTimezoneOffset() * 60000)).toISOString();
                    let registroEditado: any = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO) ? Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO) : null;
                    model["ProcesoEjecutado"] = registroEditado[0].ProcesoEjecutado;

                    let idplaza = EK.Store.getState().global.itemSelectedInRow ? EK.Store.getState().global.itemSelectedInRow.data.id_identificador:'ND';
                    //let model: any = Forms.getForm(PAGE_ID);


                    let _fechaIni = new Date(model["FechaInicio"]);
                    model['mesInicio'] = _fechaIni.getMonth() + 1;
                    model['anioInicio'] = _fechaIni.getFullYear();

                    model['id_identificador_cc'] = idplaza;
                    
                    console.log(model)
                   // Planificacion Contruccion y Entrega
                    EK.Global.confirm("Presione Confirmar para guardar ", "Planificación de Cita \n\n" + global.formatDateTimeDirect(fechaInicioFormulario, true), () => {
                       //console.log(model);
                       global.dispatchAsyncPut("global-page-data", "base/kontrol/AgendaSPV/save", model, AGENDA_ID_NEW);
                       dispatchSuccessful("load::massive", null);
                    });
                    break;
                case "Contratista":
                    let OrdenesTrabajo: any[] = this.getOrdenesTrabajoAgendaConfig();
                    if (OrdenesTrabajo === null || OrdenesTrabajo === undefined || OrdenesTrabajo.length === 0) {
                        this.setState({ visualizarBotonGuardar: true });
                        return;
                    };

                    let _item: EditForm = Forms.getForm(AGENDA_ID_NEW);
                    let _model: any = _item
                        .addID()
                        .addObject("TipoAgenda")
                        .addString("Geolocalizacion")
                        .addVersion()
                        .toObject();

                    let _registroEditado: any = Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO) ? Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO) : null;
                   
                    _model["OrdenesTrabajo"] = OrdenesTrabajo;
                    _model["FechaInicio"] = new Date(fechaInicioFormulario.getTime() - (fechaInicioFormulario.getTimezoneOffset() * 60000)).toISOString();
                    _model["FechaFin"] = new Date(fechaFinFormulario.getTime() - (fechaFinFormulario.getTimezoneOffset() * 60000)).toISOString();
                    _model["ProcesoEjecutado"] = _registroEditado[0].ProcesoEjecutado;
                    _model["IdPlaza"] = _registroEditado[0].Ubicacion.IdPlaza;
                    //console.log(_model)
                    let allOTs = EK.Store.getState().forms.ReportesFallas.form.OrdenesTrabajo.initialValue;
                    for (let o of _model.OrdenesTrabajo) {
                        let foundOT = allOTs.filter(x => x.ID === o.IdOrdenTrabajo)[0];
                        _model["IdResponsableDictamen"] = foundOT.IdCat;

                        if (o.Reservas != null) {
                            //console.log(o.Reservas);
                            o.Reservas = o.Reservas;
                        }
                    }
                    console.log(_model)
                    let replanificar = EK.Store.getState().global.TryReplanificarOT;
                     console.log(replanificar);
                    //delete EK.Store.getState().global.TryReplanificarOT;
                    
                    EK.Global.confirm("Presione Confirmar para guardar ", "Planificación de Cita OT \n\n" + global.formatDateTimeDirect(fechaInicioFormulario, true), () => {
                        if (replanificar !== undefined) {
                            _model.ProcesoEjecutado = 'ReAgendarOT';
                            global.dispatchAsyncPut("global-page-data", "base/kontrol/AgendaSPV/Get/SaveAgendaContratista", _model, AGENDA_ID_NEW);
                        } else {
                            global.dispatchAsyncPut("global-page-data", "base/kontrol/AgendaSPV/Get/SaveAgendaContratista", _model, AGENDA_ID_NEW);
                        }
                    });
                    break;
                case "Dictamen":
                    let dictamenes: any[] = this.getDictamenesAgendaConfig();
                    if (dictamenes === null || dictamenes === undefined || dictamenes.length === 0) {
                        return;
                    };

                    let _itemDictamen: EditForm = Forms.getForm(AGENDA_ID_NEW);
                    let _modelDictamen: any = _itemDictamen
                        .addID()
                        .addObject("TipoAgenda")
                        .addString("Geolocalizacion")
                        .addVersion()
                        .toObject();

                    let _registroEditadoDictamen: any = Forms.getValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO) ? Forms.getValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO) : null;

                    _modelDictamen["Dictamenes"] = dictamenes;
                    _modelDictamen["FechaInicio"] = new Date(fechaInicioFormulario.getTime() - (fechaInicioFormulario.getTimezoneOffset() * 60000)).toISOString();
                    _modelDictamen["FechaFin"] = new Date(fechaFinFormulario.getTime() - (fechaFinFormulario.getTimezoneOffset() * 60000)).toISOString();
                    _modelDictamen["ProcesoEjecutado"] = 'PROGRAMACION'; //_registroEditadoDictamen[0].ProcesoEjecutado;
                    _modelDictamen['IdPlaza'] = EK.Store.getState().global.currentEntity.data.IdPlaza;
                    console.log(_modelDictamen)
                    EK.Global.confirm("Presione Confirmar para guardar ", "Planificación de Cita Diag. \n\n" + global.formatDateTimeDirect(fechaInicioFormulario, true), () => {
                        global.dispatchAsyncPut("global-page-data", "base/kontrol/AgendaSPV/Get/SaveAgendaDictamen", _modelDictamen, AGENDA_ID_NEW);
                        //warning("planificacion inhabilitada");
                    });
                    break;
                case "DictamenAreasComunes":
                    let dictamenesAreasComunes: any[] = this.getDictamenesAreasComunesAgendaConfig();
                    if (dictamenesAreasComunes === null || dictamenesAreasComunes === undefined || dictamenesAreasComunes.length === 0) {
                        return;
                    };

                    let _itemDictamenAreasComunes: EditForm = Forms.getForm(AGENDA_ID_NEW);
                    let _modelDictamenAreaComunes: any = _itemDictamenAreasComunes
                        .addID()
                        .addObject("TipoAgenda")
                        .addString("Geolocalizacion")
                        .addVersion()
                        .toObject();

                    //let _registroEditadoDictamen: any = Forms.getValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO) ? Forms.getValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO) : null;

                    _modelDictamenAreaComunes["Dictamenes"] = dictamenesAreasComunes;
                    _modelDictamenAreaComunes["FechaInicio"] = new Date(fechaInicioFormulario.getTime() - (fechaInicioFormulario.getTimezoneOffset() * 60000)).toISOString();
                    _modelDictamenAreaComunes["FechaFin"] = new Date(fechaFinFormulario.getTime() - (fechaFinFormulario.getTimezoneOffset() * 60000)).toISOString();
                    _modelDictamenAreaComunes["ProcesoEjecutado"] = 'PROGRAMACION'; //_registroEditadoDictamen[0].ProcesoEjecutado;
                    _modelDictamenAreaComunes['IdPlaza'] = EK.Store.getState().global.currentEntity.data.IdPlaza;
                    EK.Global.confirm("Presione Confirmar para guardar ", "Planificación de Cita \n\n" + global.formatDateTimeDirect(fechaInicioFormulario, true), () => {
                        //console.log(_modelDictamenAreaComunes)
                        global.dispatchAsyncPut("global-page-data", "base/kontrol/AgendaSPV/Get/SaveAgendaDictamenAreasComunes", _modelDictamenAreaComunes, AGENDA_ID_NEW);
                        //warning("planificacion inhabilitada");
                    });

                    break;
                case "ContratistaAreasComunes":
                    let OrdenesTrabajoAreasComunes: any[] = this.getOrdenesTrabajoAgendaAreasConmunesConfig();
                    if (OrdenesTrabajoAreasComunes === null || OrdenesTrabajoAreasComunes === undefined || OrdenesTrabajoAreasComunes.length === 0) {
                        this.setState({ visualizarBotonGuardar: true });
                        return;
                    };

                    let _itemAreasComunes: EditForm = Forms.getForm(AGENDA_ID_NEW);
                    let _modelAreasComunes: any = _itemAreasComunes
                        .addID()
                        .addObject("TipoAgenda")
                        .addString("Geolocalizacion")
                        .addVersion()
                        .toObject();

                    let _registroEditadoAreasComunes: any = Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO) ? Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO) : null;

                    _modelAreasComunes["OrdenesTrabajo"] = OrdenesTrabajoAreasComunes;
                    _modelAreasComunes["FechaInicio"] = new Date(fechaInicioFormulario.getTime() - (fechaInicioFormulario.getTimezoneOffset() * 60000)).toISOString();
                    _modelAreasComunes["FechaFin"] = new Date(fechaFinFormulario.getTime() - (fechaFinFormulario.getTimezoneOffset() * 60000)).toISOString();
                    _modelAreasComunes["ProcesoEjecutado"] = _registroEditadoAreasComunes[0].ProcesoEjecutado;
                    _modelAreasComunes["IdPlaza"] = _registroEditadoAreasComunes[0].Ubicacion.IdPlaza;
                    EK.Global.confirm("Presione Confirmar para guardar ", "Planificación de Cita  \n\n" + global.formatDateTimeDirect(fechaInicioFormulario, true), () => {
                        //console.log(_modelAreasComunes)
                        global.dispatchAsyncPut("global-page-data", "base/kontrol/AgendaSPV/Get/SaveAgendaContratistaAreasComunes", _modelAreasComunes, AGENDA_ID_NEW);
                    });
                    break;
                default:
                    return null;
            }
        };
        onClose(): void {
            dispatchSuccessful("load::massive", null);
            let modalCalen: any = $("#modalCalen");
            modalCalen.modal("hide");
        };
        footerPersonalized(): JSX.Element {
            let state: DataElement = this.props.config.getState(SECTION_CONCEPTO_ID);

            return <div className="modal-footer">
                {global.isUpdating(this.props.agenda) ?
                    <div>
                        <div style={{ position: "relative", float: "right", right: "119px" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} /></div>
                        <div style={{ float: "right" }}><button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button></div>
                    </div> :
                    <div>
                        {global.getData(state).viewMode === true ? <Button size={[2, 2, 2, 2]} className="btn btn-md btn-editing" style={{ backgroundColor: "#8bc780", color: "#FFFFFF" }} icon="fa fa-check" onClick={this.onSaveAgenda.bind(this)}>Agregar Planificación</Button> : null}
                        <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                    </div>
                }
            </div>
        };
        header(info: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info}</h6>
                </span>
            </div>
        };
        render(): JSX.Element {
            return <modal.Modal id="modalCalen" header={this.header("Calendario")} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <Edit forma={this.props.forma} tipoAgenda={this.props.tipoAgenda} />
                </Row>
            </modal.Modal>
        }
    });

    interface IEdit extends page.IProps {
        agenda: any;
        item: DataElement;
        forma?: any;
        tipoAgenda?: any;
        fechaInicio?: any;
        funcionAgenda?: any;
        ubicaciones?: any;
        ordenesTrabajo?: any;
    };

    let Edit: any = global.connect(class extends React.Component<IEdit, IEdit> {
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            agenda: state.global.catalogo$AgendaNew,
            funcionAgenda: state.global.funcionAgenda,
            tipoAgenda: state.global.SPVparametroTipoAgenda,
            ubicaciones: Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO),
            ordenesTrabajo: Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO),
            dictamenes: Forms.getValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO),
            fechaInicio: state.forms.AgendaNew === undefined || state.forms.AgendaNew === null || state.forms.AgendaNew.form.FechaInicio === undefined || state.forms.AgendaNew.form.FechaInicio === null ? null : state.forms.AgendaNew.form.FechaInicio
        });
        componentWillMount(): void {
            Forms.updateFormElement(AGENDA_ID_NEW, "UbicacionesAgenda");
        };
        onClose(): void {
            let modalCalen: any = $("#modalCalen");
            modalCalen.modal("hide");
        };
        nuevoHorario(): void {
            var claveTipoAgenda: any = getData(this.props.tipoAgenda).TipoAgenda;
            var fechaHoraInicio = new Date(Forms.getValue("FechaInicio", AGENDA_ID_NEW));
            var horarioCompleto: any = getData(EK.Store.getState().global.HorarioAtencion);
            if (claveTipoAgenda === 'FechaConstruccion' || claveTipoAgenda === 'EntregaVivienda') {
                fechaHoraInicio.setMinutes(fechaHoraInicio.getMinutes() + 15);
            } else {
                fechaHoraInicio.setHours(fechaHoraInicio.getHours() + 1);
            }
            var horas: any = fechaHoraInicio.getHours();
            var minutos: any = fechaHoraInicio.getMinutes();
            var horaPropuesta: any = ("00" + horas).slice(-2) + ':' + ("00" + minutos).slice(-2)
            horarioCompleto.forEach((item: any) => {
                if (item.Clave === horaPropuesta) {
                    Forms.updateFormElement(AGENDA_ID_NEW, "HoraFIN", item);
                }

            });
        };
        componentDidUpdate(prevProps: IEdit, prevState: IEdit): any {
            if (this.props.agenda && wasUpdated(prevProps.agenda, this.props.agenda, false)) {
                let item: any = getData(prevProps.agenda);
                switch (item.Estado) {
                    case 4: // eliminado con exito
                        break;
                    default:
                        // global.dispatchSuccessful('load::DataUbicacionesPlanificadas', 'DATAUPDUBI');
                        //console.log(this.props.forma);
                        if (this.props.forma != "Individual") {
                            let funcionAgenda: string = EK.Store.getState().global.funcionAgenda != null && EK.Store.getState().global.funcionAgenda != undefined && EK.Store.getState().global.funcionAgenda.data != null && EK.Store.getState().global.funcionAgenda.data != undefined && EK.Store.getState().global.funcionAgenda.data.tipo != null && EK.Store.getState().global.funcionAgenda.data.tipo != undefined ? EK.Store.getState().global.funcionAgenda.data.tipo : null;
                            let p: any = global.assign({
                                activos: 1, FuncionAgenda: funcionAgenda
                            });
                            dispatchAsyncPost("load::AgendaDashBoard", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
                        };

                        global.success("Información incorporada a la Agenda");

                        if (this.props.tipoAgenda) {
                            let tipoAgenda: any = this.props.tipoAgenda ? this.props.tipoAgenda : null;
                            Forms.updateFormElement(AGENDA_ID_NEW, "TipoAgenda", this.props.agenda.data.TipoAgenda);
                        }
                        let idPagina = getData(EK.Store.getState().global.pageConfig).id;

                        if (idPagina === 'Agenda') {
                            let params = getData(EK.Store.getState().global.ParametrosReloadAgenda);
                            // let fecha = getData(EK.Store.getState().global.FechaForReloadCalendar);
                            // params.FechaInicio = fecha;
                            global.asyncPost("base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: params }, (status: AsyncActionTypeEnum, data: any[]) => {
                                if (status === AsyncActionTypeEnum.successful) {
                                    global.dispatchSuccessful("load::AgendaDashBoard", data);
                                    let calendar: any = $('#AgendaDashBoard');
                                    calendar.fullCalendar('gotoDate', params.FechaInicio);
                                }
                            });
                        }
                        
                        this.onClose();
                        break;
                }
            }
        };
        equalDates(d1: Date, d2: Date): boolean {
            let cDate: Date = d1 ? new Date(d1.getTime()) : null;
            let nDate: Date = d2 ? new Date(d2.getTime()) : null;

            if (cDate === null && nDate === null) return true;
            if (cDate === null || nDate === null || (cDate.getTime() !== nDate.getTime())) {
                return false;
            } else {
                return true;
            }
        };
        componentWillReceiveProps(nextProps: IEdit): void {
            if (global.hasChanged(this.props.fechaInicio, nextProps.fechaInicio)) {
                if (nextProps.fechaInicio != null && nextProps.fechaInicio != undefined) {
                    if (this.props.fechaInicio != undefined && this.props.fechaInicio != null && nextProps.fechaInicio != null && nextProps.fechaInicio != undefined) {
                        let updateValue: boolean = false;
                        updateValue = global.hasChanged(this.props.fechaInicio, nextProps.fechaInicio) && !this.equalDates(this.props.fechaInicio.value, nextProps.fechaInicio.value);
                        if (updateValue === true) {
                            this.nuevoHorario();
                        }
                    }
                }
            };

            if (global.hasChanged(this.props.ubicaciones, nextProps.ubicaciones)) {
                let itemsUbicaciones: any[] = nextProps.ubicaciones;
                if (itemsUbicaciones != null || itemsUbicaciones != undefined) {
                    if (itemsUbicaciones.length > 0) {
                        let geolocalizacion: any = itemsUbicaciones[0].Geolocalizacion;
                        if (geolocalizacion) {
                            Forms.updateFormElement(AGENDA_ID_NEW, "Geolocalizacion", geolocalizacion);
                        } else {
                            Forms.updateFormElement(AGENDA_ID_NEW, "Geolocalizacion", '0');
                        }
                    } else {
                        Forms.updateFormElement(AGENDA_ID_NEW, "Geolocalizacion", '0');
                    }
                }
            };

            if (global.hasChanged(this.props.ordenesTrabajo, nextProps.ordenesTrabajo)) {
                let ordenesTrabajo: any[] = nextProps.ordenesTrabajo;
                if (ordenesTrabajo && ordenesTrabajo.length > 0) {
                    let ubicacion: any = ordenesTrabajo[0].Ubicacion;
                    if (ubicacion && ubicacion.Geolocalizacion) {
                        Forms.updateFormElement(AGENDA_ID_NEW, "Geolocalizacion", ubicacion.Geolocalizacion);
                    } else {
                        Forms.updateFormElement(AGENDA_ID_NEW, "Geolocalizacion", "0");
                    }
                } else {
                    Forms.updateFormElement(AGENDA_ID_NEW, "Geolocalizacion", "0");
                }
            };

            if (global.hasChanged(this.props.tipoAgenda, nextProps.tipoAgenda)) {
                if (nextProps !== null && nextProps.tipoAgenda != undefined) {
                    let tipoAgendaFormulario: any = Forms.getValue("TipoAgenda", AGENDA_ID_NEW);
                    if (tipoAgendaFormulario != nextProps.tipoAgenda) {
                        var itemsTipoAgenda: any[] = getData(EK.Store.getState().global.TipoAgenda);
                        let itemActual: any;
                        let x: number;
                        let totalItems: any = itemsTipoAgenda.length;
                        for (x = 0; x < totalItems; x++) {
                            if (itemsTipoAgenda[x].Clave === getData(nextProps.tipoAgenda).TipoAgenda) {
                                itemActual = itemsTipoAgenda[x];
                                Forms.updateFormElement(AGENDA_ID_NEW, "TipoAgenda", itemActual);
                                break;
                            }
                        }
                    }
                }
            }
        };
        onActualizarInformacion(): void {
            var UbicacionesAgenda = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
            var otPorAgendar: any[] = Forms.getValue("ContratistaOTAgendaEdit", SECTION_CAPTURA_INFO);
            let idTipoAgenda: any = Forms.getValue("TipoAgenda", AGENDA_ID_NEW).ID;
            let funcionAgenda: string = EK.Store.getState().global.funcionAgenda != null && EK.Store.getState().global.funcionAgenda != undefined && EK.Store.getState().global.funcionAgenda.data != null && EK.Store.getState().global.funcionAgenda.data != undefined && EK.Store.getState().global.funcionAgenda.data.tipo != null && EK.Store.getState().global.funcionAgenda.data.tipo != undefined ? EK.Store.getState().global.funcionAgenda.data.tipo : null;
            
            let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", 'Agenda') && Forms.getValue("PlazaInicial", 'Agenda').ID ? Forms.getValue("PlazaInicial", 'Agenda').ID : null;

            var claveTipoAgenda: any = getData(this.props.tipoAgenda).TipoAgenda;
            switch (claveTipoAgenda) {
                case 'EntregaVivienda':
                    if (UbicacionesAgenda === undefined || UbicacionesAgenda.length <= 0 || UbicacionesAgenda === null) {
                        warning("Para realizar este proceso debe tener definida la ubicación a planificar");
                        return;
                    } else {
                        if (UbicacionesAgenda.length > 0) {
                            let idUsuarioSeleccionado: any = UbicacionesAgenda[0].num_entrega_viv;
                            let fecha = global.getData(EK.Store.getState().global.FechaCalendarioInicial);
                            let p: any = global.assign({
                                activos: 1,
                                TipoAgenda: idTipoAgenda,
                                IdPlaza: idPlazaSeleccionada,
                                ClaveEstado: 'TODOS',
                                UsuarioSeleccionado: idUsuarioSeleccionado,
                                FuncionAgenda: funcionAgenda,
                                CalendarComplete: "SI",
                                FechaInicio: fecha
                            });
                            console.log(p)
                            global.dispatchSuccessful('load::ParametrosCalendarioFromAgenda', p);
                            dispatchAsyncPost("load::AgendaNewCalendasUser", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
                        }
                    }
                    break;
                case 'FechaConstruccion': // POSTVENTA - FECHA DE CONSTRUCCION
                    if (UbicacionesAgenda === undefined || UbicacionesAgenda.length <= 0 || UbicacionesAgenda === null) {
                        warning("Para realizar este proceso debe tener definida la ubicación a planificar");
                        return;
                    } else {
                        if (UbicacionesAgenda.length > 0) {
                            let idUsuarioSeleccionado: any = UbicacionesAgenda[0].num_entrega_viv;
                            let fecha = global.getData(EK.Store.getState().global.FechaCalendarioInicial);

                            let p: any = global.assign({
                                activos: 1,
                                TipoAgenda: idTipoAgenda,
                                IdPlaza: idPlazaSeleccionada,
                                ClaveEstado: 'ACT,W',
                                UsuarioSeleccionado: idUsuarioSeleccionado,
                                FuncionAgenda: funcionAgenda,
                                CalendarComplete: "SI",
                                FechaInicio: fecha
                            });
                           console.log(p)
                            //console.log(claveTipoAgenda)
                            global.dispatchSuccessful('load::ParametrosCalendarioFromAgenda', p);
                            dispatchAsyncPost("load::AgendaNewCalendasUser", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
                        }
                    }
                    break;
                case 'Contratista':       // POSTVENTA - CONTRATISTAS ORDEN DE TRABAJO
                    if (otPorAgendar === undefined || otPorAgendar.length <= 0 || otPorAgendar === null) {
                        warning("Para realizar este proceso debe tener definida las OT a planificar");
                        return;
                    } else {
                        if (otPorAgendar.length > 0) {
                            let idContratistaSeleccionado: string = (otPorAgendar[0].OrdenTrabajo.IdContratista).toString();
                            let fecha = global.getData(EK.Store.getState().global.FechaCalendarioInicial);
                            //let fsele = EK.Store.getState().global.fSeleccionado.data;
                            //let CurrentPlaza = EK.Store.getState().global.currentEntity.data.IdPlaza;
                            //CurrentPlaza = CurrentPlaza !== undefined && CurrentPlaza !== null ? CurrentPlaza : '-2';
                            let CurrentPlaza = EK.Store.getState().global.currentEntity.data.IdPlaza;
                            CurrentPlaza = CurrentPlaza !== undefined && CurrentPlaza !== null ? CurrentPlaza : '-2';
                            let allOTs = EK.Store.getState().forms.ReportesFallas.form.OrdenesTrabajo.initialValue;
                            let IdCat = allOTs.filter(x => x.ID === otPorAgendar[0].IdOrdenTrabajo)[0] !== undefined ? allOTs.filter(x => x.ID === otPorAgendar[0].IdOrdenTrabajo)[0].IdCat : null;

                            let p: any = global.assign({
                                activos: 1,
                                TipoAgenda: idTipoAgenda,
                                IdPlaza: CurrentPlaza,
                                ClaveEstado: 'TODOS',
                                UsuarioSeleccionado: idContratistaSeleccionado,
                                FuncionAgenda: funcionAgenda,
                                CalendarComplete: "SI",
                                FechaInicio: fecha,
                                OperacionEspecificaSP: 'AgendaDashBoardCalendarTab',
                                IdCat
                                //fSeleccionado: fsele
                            });

                            //console.log(allOTs);
                            //console.log(otPorAgendar[0])
                            //console.log(p)
                        
                            global.dispatchSuccessful('load::ParametrosCalendarioFromAgenda', p);
                           
                            //let calendar: any = $('#AgendaDashBoard');
                            //console.log(fecha);
                            dispatchAsyncPost("load::AgendaNewCalendasUser", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
                        }
                    }
                    break
                case 'Dictamen':       // POSTVENTA - DICTAMEN
                    var dictamenPorAgendar: any[] = Forms.getValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO);
                    if (dictamenPorAgendar === undefined || dictamenPorAgendar.length <= 0 || dictamenPorAgendar === null) {
                        warning("Para realizar este proceso debe tener definido un Diagnóstico a planificar");
                        return;
                    } else {
                        if (dictamenPorAgendar.length > 0) {
                            let idResponsableSeleccionado: string = (dictamenPorAgendar[0].Dictamen.ResponsableDictamen.ID).toString();
                            //let fsele1 = EK.Store.getState().global.fSeleccionado.data;
                            let fecha = global.getData(EK.Store.getState().global.FechaCalendarioInicial);
                            let CurrentPlaza = EK.Store.getState().global.currentEntity.data.IdPlaza;
                            CurrentPlaza = CurrentPlaza !== undefined && CurrentPlaza !== null ? CurrentPlaza : '-2';
                            let p: any = global.assign({
                                activos: 1,
                                TipoAgenda: idTipoAgenda,
                                IdPlaza: CurrentPlaza,
                                ClaveEstado: 'TODOS',
                                UsuarioSeleccionado: idResponsableSeleccionado,
                                FuncionAgenda: funcionAgenda,
                                CalendarComplete: "SI",
                                FechaInicio: fecha,
                                OperacionEspecificaSP: 'AgendaDashBoardCalendarTab',
                                IdCat:idResponsableSeleccionado
                            });
                            //console.log(p)
                            global.dispatchSuccessful('load::ParametrosCalendarioFromAgenda', p);
                            dispatchAsyncPost("load::AgendaNewCalendasUser", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });

                        }
                    }
                    break
                case 'DictamenAreasComunes':       // POSTVENTA - DICTAMEN
                    var dictamenPorAgendar: any[] = Forms.getValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO);
                    if (dictamenPorAgendar === undefined || dictamenPorAgendar.length <= 0 || dictamenPorAgendar === null) {
                        warning("Para realizar este proceso debe tener definido un Diagnóstico a planificar");
                        return;
                    } else {
                        if (dictamenPorAgendar.length > 0) {
                            let idResponsableSeleccionado: string = (dictamenPorAgendar[0].Dictamen.ResponsableDictamen.ID).toString();
                            let fecha = global.getData(EK.Store.getState().global.FechaCalendarioInicial);
                            let CurrentPlaza = EK.Store.getState().global.currentEntity.data.IdPlaza;
                            CurrentPlaza = CurrentPlaza !== undefined && CurrentPlaza !== null ? CurrentPlaza : '-2';
                            let p: any = global.assign({
                                activos: 1,
                                TipoAgenda: idTipoAgenda,
                                IdPlaza: CurrentPlaza,
                                ClaveEstado: 'TODOS',
                                UsuarioSeleccionado: idResponsableSeleccionado,
                                FuncionAgenda: funcionAgenda,
                                CalendarComplete: "SI",
                                FechaInicio: fecha
                            });
                            //console.log(p)
                            global.dispatchSuccessful('load::ParametrosCalendarioFromAgenda', p);
                            dispatchAsyncPost("load::AgendaNewCalendasUser", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
                        }
                    }
                    break
                case 'ContratistaAreasComunes':       // POSTVENTA - CONTRATISTASAREASCOMUNES
                    if (otPorAgendar === undefined || otPorAgendar.length <= 0 || otPorAgendar === null) {
                        warning("Para realizar este proceso debe tener definida las OT a planificar");
                        return;
                    } else {
                        if (otPorAgendar.length > 0) {
                            let idContratistaSeleccionado: string = (otPorAgendar[0].OrdenTrabajo.IdContratista).toString();
                            let CurrentPlaza = EK.Store.getState().global.currentEntity.data.IdPlaza;
                            CurrentPlaza = CurrentPlaza !== undefined && CurrentPlaza !== null ? CurrentPlaza : '-2';
                            let p: any = global.assign({
                                activos: 1,
                                TipoAgenda: idTipoAgenda,
                                IdPlaza: CurrentPlaza,
                                ClaveEstado: 'TODOS',
                                UsuarioSeleccionado: idContratistaSeleccionado,
                                FuncionAgenda: funcionAgenda,
                                CalendarComplete: "SI",
                                FechaInicio: new Date()
                            });
                            // console.log(p)
                            global.dispatchSuccessful('load::ParametrosCalendarioFromAgenda', p);
                            dispatchAsyncPost("load::AgendaNewCalendasUser", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
                        }
                    }
                    break
                default:
                    return null;
            }
        };
        resetCalendarTab() {
            dispatchDefault('load::ParametrosCalendarioFromAgenda', [])
            dispatchDefault('load::AgendaNewCalendasUser', [])
            //console.log('calendario nuevo');
        }

        GetStartDays() {   
            let PageID: any = getData(EK.Store.getState().global.pageConfig).id;
            let dias = 0;
            var d = new Date();
            var h = d.getHours();
            var totalHoras = 148 + h;
            if (PageID === 'ConfigViviendaEntregable') {
                dias = -(totalHoras / 24);
                var FechaActual = new Date();
                for (var i = 1; i < 6; i++) {
                    var FechaAnterior = new Date(FechaActual);
                    FechaAnterior.setDate(FechaAnterior.getDate() - i);
                    //console.log(FechaAnterior + ' ' + i);
                    if (FechaAnterior.getDay() === 0) {
                        dias--;
                    }
                }   
            }
            //console.log(dias)
            return dias;
        }

        render(): JSX.Element {
            let $page: any = $ml[AGENDA_ID_NEW];
            let geolocalizacion: any = Forms.getValue("Geolocalizacion", AGENDA_ID_NEW);
            let nombreTipoAgenda: any = Forms.getValue("TipoAgenda", AGENDA_ID_NEW) && Forms.getValue("TipoAgenda", AGENDA_ID_NEW) ? Forms.getValue("TipoAgenda", AGENDA_ID_NEW).Nombre : '';
            let claveTipoAgenda: any = getData(this.props.tipoAgenda).TipoAgenda;
            let idForm: any = EK.Store.getState().forms[AGENDA_ID_NEW] ? EK.Store.getState().forms[AGENDA_ID_NEW] : null;
            let mostrarBotonGuardar: any = false;
            let color: string = "#ff5e00";
            let className: string = "font-white";

            if (idForm === null || idForm === undefined) {
            } else {
                if (idForm.hasChanged) {
                    color = "#ff5e00";
                    className = " btn-editing";
                    mostrarBotonGuardar = true;
                }
            }

            //console.log(claveTipoAgenda)
            //let startDays: any = claveTipoAgenda != null && claveTipoAgenda != undefined && (claveTipoAgenda === "Contratista" || claveTipoAgenda === "Dictamen") || (claveTipoAgenda === "ContratistaAreasComunes" || claveTipoAgenda === "DictamenAreasComunes") ? undefined : 0;
            let startDays: any = this.GetStartDays();
            let minuteStep: any = claveTipoAgenda != null && claveTipoAgenda != undefined && (claveTipoAgenda === "Contratista" || claveTipoAgenda === "Dictamen") || (claveTipoAgenda === "ContratistaAreasComunes" || claveTipoAgenda === "DictamenAreasComunes") ? 15 : 30;
            //if (claveTipoAgenda === 'EntregaVivienda') {
            //    startDays = -5;
            //    var FechaActual = new Date();
            //    var FechaAnterior = new Date(FechaActual);
            //    for (var i = 1; i < 6; i++) {
            //        FechaAnterior.setDate(FechaAnterior.getDate() - i);
            //        if (FechaAnterior.getDay() === 0 || FechaAnterior.getDay() === 6) {
            //            startDays--;
            //        }
            //    }
            //}
            //console.log(startDays);

            return <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8, overflowY: "auto", height: "450px", position: "relative" }} >
                <Column size={[12, 12, 4, 4]}>
                    <page.OptionSection
                        id={AGENDA_ID_NEW}
                        editMode={true}
                        subTitle={"Agenda"}
                        icon="far fa-calendar-alt" collapsed={false} hideCollapseButton={false}>
                        <Row>
                            {!this.props.forma || this.props.forma != 'Individual' ?
                                <TipoAgendaFixedDDL id="TipoAgenda" idFormSection={AGENDA_ID_NEW} validations={[validations.required()]} size={[12, 12, 12, 12]} agregarnuevoItem={true} agregarTodos={false} />
                                :
                                <Label id="TipoAgenda" idFormSection={AGENDA_ID_NEW} value={nombreTipoAgenda} label={"Tipo de Agenda"} size={[12, 12, 12, 12]} />
                            }
                            <DatePicker id={"FechaInicio"} startDays={startDays} label={"Fecha Inicio"} minuteStep={EK.Store.getState().global.currentEntityType.data == "CapturaFechaConstruccion" || EK.Store.getState().global.currentEntityType.data == "ConfigViviendaEntregable" || EK.Store.getState().global.currentEntityType.data == "Agenda" ? 15 : 30}  daysOfWeekDisabled={[0]} hoursDisabled={[0, 1, 2, 3, 4, 5, 6, 21, 22, 23, 24]} type="datetime" idFormSection={AGENDA_ID_NEW} value={global.getObtenerFecha()} size={[12, 12, 7, 7]} validations={[validations.required()]} />
                            <SPVHorariosAtencionDDL id="HoraFIN" idFormSection={AGENDA_ID_NEW} validations={[validations.required()]} size={[12, 12, 5, 5]} />
                            <label.Label id="Geolocalizacion" label={"Geolocalización"} idFormSection={AGENDA_ID_NEW} value={geolocalizacion} size={[12, 12, 12, 12]} />
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                <MapView />
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 8, 8]}  >
                    <div className="tabbable-line">
                        <ul className="nav nav-tabs ">
                            <li className="active">
                                {(() => {
                                    switch (claveTipoAgenda) {
                                        case "EntregaVivienda":   // POSTVENTA - ENTREGA DE VIVIENDA
                                        case "FechaConstruccion": // POSTVENTA - FECHA DE CONSTRUCCION
                                            return <a href="#tab_1" data-toggle="tab" aria-expanded="true"> Ubicaciones </a>;
                                        case "Contratista":       // POSTVENTA - CONTRATISTAS
                                            return <a href="#tab_1" data-toggle="tab" aria-expanded="true"> Ordenes de Trabajo </a>
                                        case "Dictamen":          // POSTVENTA - DICTAMENES
                                            return <a href="#tab_1" data-toggle="tab" aria-expanded="true"> Diagnósticos</a>
                                        case "DictamenAreasComunes":          // POSTVENTA - DICTAMENES
                                            return <a href="#tab_1" data-toggle="tab" aria-expanded="true"> Diagnósticos</a>
                                        case "ContratistaAreasComunes":          // POSTVENTA - CONTRATISTA
                                            return <a href="#tab_1" data-toggle="tab" aria-expanded="true"> Contratista</a>
                                        default:
                                            return null;
                                    }
                                })()}

                            </li>
                            <li className="" onClick={this.resetCalendarTab.bind(this)}>
                                <a href="#tab_2" data-toggle="tab" aria-expanded="false"> Calendario </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="tab_1">
                                {(() => {
                                    switch (claveTipoAgenda) {
                                        case "EntregaVivienda":   // POSTVENTA - ENTREGA DE VIVIENDA
                                        case "FechaConstruccion": // POSTVENTA - FECHA DE CONSTRUCCION
                                            return <AgendaEntregaViviendaPV.AgendaEntregaVivienda tipoAgenda={this.props.tipoAgenda} forma={this.props.forma} />;
                                        case "Contratista":       // POSTVENTA - CONTRATISTAS
                                            return <agendaContratistaPV.AgendaContratista tipoAgenda={this.props.tipoAgenda} forma={this.props.forma} />;
                                        case "Dictamen":          // POSTVENTA - DICTAMENES
                                            return <agendaDictamenPV.AgendaDictamen tipoAgenda={this.props.tipoAgenda} forma={this.props.forma} />;
                                        case "DictamenAreasComunes":    // POSTVENTA - DICTAMENES AREAS COMUNES
                                            return <agendaDictamenAreasComunesPV.AgendaDictamenAreasComunes tipoAgenda={this.props.tipoAgenda} forma={this.props.forma} />;
                                        case "ContratistaAreasComunes":    // POSTVENTA - CONTRATISTA AREAS COMUNES
                                            return <agendaContratistaAreasComunesPV.AgendaContratistaAreasComunes tipoAgenda={this.props.tipoAgenda} forma={this.props.forma} />;
                                        default:
                                            return null;
                                    }
                                })()}
                            </div>
                            <div className="tab-pane" id="tab_2">
                                <div>
                                    <Row>
                                        <Column style={{ marginLeft: "7px", marginTop: "-27px", marginBottom: "39px" }}>
                                            <Button size={[4, 4, 4, 4]} className="btn btn-md btn-editing" style={{ backgroundColor: '#8ad48c', color: "#FFFFFF", width: "250px", position: "absolute", right: "40px" }} icon="fas fa-sync-alt" onClick={() => this.onActualizarInformacion()} > Actualizar Calendario 1 </Button>
                                        </Column>
                                    </Row>
                                    <Row style={{ marginLeft: "10px", marginRight: "10px", height: "340px", overflow: "overlay" }} >
                                        <calendar.GlobalAgendaNew id="AgendaNewCalendar" idForm={AGENDA_ID_NEW} applyValuesControl={"FechaInicio"} minTime={"07:00:00"} maxTime={"20:00:00"} />
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Column>
            </Column>;
        };
    });

    interface IMapViewProps extends React.Props<any> {
        entidad?: any;
        ubicaciones?: any;
        state?: DataElement;
        geolocalizacion: string;
    };
    interface IMapViewState {
        useLocation: boolean;
    };
    const MapView: any = global.connect(class extends React.Component<IMapViewProps, IMapViewState> {
        constructor(props: IMapViewProps) {
            super(props);
            this.state = { useLocation: false };
        };
        static props: any = (state: any) => {
            return {
                entidad: EK.Store.getState().forms[AGENDA_ID_NEW].form, //Forms.getValue("Localidad", config.id),
                state: state.global.currentEntityState,
                ubicaciones: Forms.getValue("UbicacionesAgendaEdit", "CapturaInfo", state),
                geolocalizacion: Forms.getValue("Geolocalizacion", AGENDA_ID_NEW)
            };
        };
        componentDidMount(): any {
            //window["onMapLocationChanged"] = (p: any): any => {
            //    Forms.updateFormElement(AGENDA_ID_NEW, "Geolocalizacion", p);
            //};
        };
        shouldComponentUpdate(nextProps: IMapViewProps, nextState: IMapViewProps): any {
            if (hasChanged(this.props.geolocalizacion, nextProps.geolocalizacion)) {
                return true;
            }
            if (hasChanged(this.props.ubicaciones, nextProps.ubicaciones)) { return true }
            return false;
        }

        render(): JSX.Element {
            let mapLocation: string = "";
            let geolocalizacion: any = Forms.getValue("Geolocalizacion", AGENDA_ID_NEW)
            let buscasMapa: boolean = false
            if (geolocalizacion != null && geolocalizacion != undefined && geolocalizacion != '0' && geolocalizacion != ' ' && geolocalizacion != ',') {
                geolocalizacion = geolocalizacion === null || geolocalizacion === undefined ? 0 : geolocalizacion;
                let ubicaciones: any[] = this.props.ubicaciones as any[];
                if (ubicaciones && ubicaciones.length > 0) {
                    let idFraccionamiento: any = this.props.ubicaciones[0].id_cve_fracc;
                    mapLocation = '/kontrol/map/multilocations/' + global.encodeObject({ ACT: 1, PS: '-2', Geo: geolocalizacion, FS: idFraccionamiento });
                    mapLocation = global.getFullUrl(mapLocation, "");
                    buscasMapa = true;
                };
            };
            return <div style={{ width: "316px", height: "234px" }}>
                {buscasMapa === true ?
                    <iframe
                        style={{ border: 0, width: "100%", height: "100%" }}
                        src={mapLocation} />
                    : null}
            </div>;
        }
    });
};

import AgendaModal = EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda;
import NewCalendarModal = EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda.NewCalendarModalBase;