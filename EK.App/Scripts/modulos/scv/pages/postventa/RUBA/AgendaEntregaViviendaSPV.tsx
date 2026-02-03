namespace EK.Modules.SCV.Pages.postventa.RUBA.AgendaEntregaVivienda {
    //Entrega Paquetes
    let AGENDA_ID_Entrega_Vivienda = "AgendaEntregaVivienda";
    const config: page.IPageConfig = global.createPageConfig("AgendaEntregaVivienda", "kontrol", [AGENDA_ID_Entrega_Vivienda]);
    const PAGE_entrega_viv_ID: string = "Agenda";
    const SECTION_CAPTURA_INFO: string = "CapturaInfo";
    const SECTION_CONCEPTO_ID: string = "AgendaSPV";
    const DETALLES_CITA: string = "DetallesCita";
    const DETALLES_INCIDENCIA_CITA: string = "DetallesCita$Incidencias";
    const DETALLES_INCIDENCIA_CITA_LISTA: string = "listaIncidencias";
    const SECTION_CHECKLIST: string = "Checklist";
    const SECTION_CHECKLIST_PROGRAMADOS: string = "ChecklistProgramados";
    let dataGrid;
    let dataGrid2;
    let BotonOK: any;
    let Reprogramar: boolean;
    let Atendido: boolean;
    let Reprogramado: boolean;
    let Cancelado: boolean;
    let verDetalle: boolean;
    let itemFiltrado: boolean;
    let showListaIncidencias: boolean;
    let showFormIncidencias: boolean;
    const RADIO_OBSCTE_SI: string = "ObsClienteSI";
    const RADIO_OBSCTE_NO: string = "ObsClienteNO";
    const RADIO_RECIBE_CON_OBSCTE_SI: string = "RecibeConObservacionSI";
    const RADIO_RECIBE_CON_OBSCTE_NO: string = "RecibeConObservacionNO";
    const RADIO_CONTRATISTA: string = "EsContratista";
    const RADIO_PROVEEDOR: string = "EsProveedor";

    declare const Quagga: any;
    let recording = false;
    let snapshotB64 = '';
    let nombreEvidencia = 'Ninguna evidencia seleccionada...';
    let hasEvidencia = false;
    let UUID_Evidencia = null;
    //declare const useRef: any;
    //declare const useState: any;
    //declare const useEffect : any;

    //const videoRef = useRef(null);
    //const canvasRef = useRef(null);
    //const [imageData, setImageData] = useState(null);

    BotonOK = "No Programado";
    Reprogramar = false;
    Atendido = false;
    Reprogramado = false;
    Cancelado = false;
    verDetalle = false;
    itemFiltrado = false
    showFormIncidencias = false;

    interface IAgendaEntregaViviendaProps extends page.IProps, grid.IColumn {
        forma?: any;
        OkAgenda?: any;
        detCita?: any;
        UbicacionesAgenda?: any;
        agendaActualizada?: any;
        ActEstatusAgenda?: (IdAgenda: number, IdDetalleAgenda: number, IdExpediente: number, EstatusAgenda: number, Motivo: any, Observaciones: any, FechaInicio: Date, FechaFin: Date, MotivoReprogramacion: any, ObservacionCliente: any, tipoAgendaCLave: any, IdUsuarioAsignado: any, IdPlaza: any, ClaveRezago: any, ClaveRecepcionDet: any, nombreResidente?: any) => void;
        entityType: any;
        entity: any;
        checkListGuardado?: any;
        plaza?: any;
        fraccionamiento?: any;
        tipoAgendaSPV?: any;
        fechaInicio?: any;
    };

    export const AgendaEntregaVivienda: any = global.connect(class extends React.Component<IAgendaEntregaViviendaProps, IAgendaEntregaViviendaProps> {
        constructor(props: IAgendaEntregaViviendaProps) {
            super(props);
            this.onAddNew = this.onAddNew.bind(this);
            this.onClickCancel = this.onClickCancel.bind(this);
            this.onSelectCalendar = this.onSelectCalendar.bind(this);
            this.onSelectAceptaUbicaciones = this.onSelectAceptaUbicaciones.bind(this);
            this.onSelectEliminamosUbicaciones = this.onSelectEliminamosUbicaciones.bind(this);
            this.onSelectDetalleCita = this.onSelectDetalleCita.bind(this);
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            data: state.global.catalogo$AgendaConfigViviendaEntregableResult,
            OkAgenda: Forms.getDataValue("ConfigCalendarEdit", SECTION_CAPTURA_INFO, state),
            UbicacionesAgenda: Forms.getDataValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO, state),
            plaza: Forms.getValue("PlazaInicial", PAGE_entrega_viv_ID, state),
            detCita: state.global.catalogo$AgendaDetallesCitaResult,
            detCte: Forms.getDataValue("DetalleCteAgendaEdit", SECTION_CAPTURA_INFO, state),
            agendaActualizada: state.global.ACTDETALLEAGENDA,
            entity: state.global.KontrolFileParametersCurrentEntity,
            entityType: state.global.KontrolFileParametersCurrentEntityType,
            checkListGuardado: state.global.catalogo$ChecklistProgramadosGuardados,
            fraccionamiento: Forms.getValue("FraccInicial", PAGE_entrega_viv_ID, state),
            tipoAgendaSPV: state.global.SPVparametroTipoAgenda,
            fechaInicio: state.forms.DetallesCita === undefined || state.forms.DetallesCita === null || state.forms.DetallesCita.form.FechaInicio === undefined || state.forms.DetallesCita.form.FechaInicio === null ? null : state.forms.DetallesCita.form.FechaInicio
        });
        //
        refs: {
            modal: Element;
        };
        //Dispatchs Section
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            ActEstatusAgenda: (IdAgenda: number, IdDetalleAgenda: number, IdExpediente: number, EstatusAgenda: number, Motivo: any, Observaciones: any, FechaInicio: Date, FechaFin: Date, MotivoReprogramacion: any, ObservacionCliente: any, tipoAgendaCLave: any, IdUsuarioAsignado: any, IdPlaza: any, ClaveRezago: any, ClaveRecepcionDet: any, nombreResidente?: any): void => {
                dispatchSuccessful("load::ACTDETALLEAGENDA", null);
                let p: any = global.assign({
                    IdAgenda, IdDetalleAgenda, IdExpediente, EstatusAgenda, Motivo, Observaciones, FechaInicio, FechaFin, MotivoReprogramacion, ObservacionCliente, tipoAgendaCLave, IdUsuarioAsignado, IdPlaza, ClaveRezago, ClaveRecepcionDet, nombreResidente
                });
                //console.log(p)
                global.dispatchAsyncPost("load::ACTDETALLEAGENDA", "base/kontrol/agendaSPV/GetBP/SaveDetProg/", { parametros: p }, "ActDetalleAgenda");
            },
        });
        componentWillUnmount() {
            dispatchSuccessful("load::ACTDETALLEAGENDA", null);
        };
        componentDidMount(): void {
            global.dispatchSuccessful("global-page-data", [], "AgendaConfigViviendaEntregableResult");
            global.dispatchSuccessful("global-page-data", [], "UbicacionesAgendaEdit");
            global.dispatchSuccessful("global-page-data", [], "ConfigCalendarEdit");
            dispatchSuccessful("load::ACTDETALLEAGENDA", null);
            Reprogramar = false;
            Atendido = false;
            Reprogramado = false;
            Cancelado = false;
            verDetalle = false;
            itemFiltrado = false;
            ////let url: string = global.encodeAllURL("scv", "UbicacionesFalla", { activos: 1, usoFalla: "Ubicacion" });
            ////global.dispatchAsync("load::ubicaciones$fallas", url);
 
            //
            //configuración necesaria para consultar el calendario de construccion/vivienda
            //global.dispatchAsync("load::TipoAgenda", "catalogos/get(TipoAgenda)");
        };
        componentWillUpdate(nextProps: IAgendaEntregaViviendaProps, nextState: IAgendaEntregaViviendaProps): void {
            if (hasChanged(this.props.detCita, nextProps.detCita) && global.isSuccessful(nextProps.detCita)) {
                Reprogramar = false;
                Atendido = false;
                Reprogramado = false;
                Cancelado = false;
                verDetalle = false;
                itemFiltrado = false;
                Forms.reset('DetallesCita');
                Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", null);
            }
        };

        openSelectFileDialog() {
            const fileInput = document.getElementById('singleFileInput');
            fileInput.click();
        }

        changeFileSelected(e: any) {
            if (hasEvidencia) {
                global.info('Ya hay una evidencia cargada');
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            //let data: any = e.target.files[0];
            console.log(e.target.files)


            const selectedFile: any = e.target.files[0];
            console.log(selectedFile)
            if (selectedFile) {
                if (this.validFile(selectedFile.type)) {
                    // Creamos un objeto FileReader
                    const reader = new FileReader();

                    // Configuramos la función que se ejecutará cuando se complete la lectura del archivo
                    reader.onload = (ev: any) => {
                        const base64String = ev.target.result; // Aquí está la cadena Base64
                        snapshotB64 = base64String;
                        console.log('Archivo convertido a Base64:', base64String);
                        let det = getData(this.props.detCita)
                        hasEvidencia = true;
                        let d = new Date();
                        let _uuid = d.getTime();
                        const divElement = document.getElementById('nom_evidencia');
                        const botonQuitar = document.getElementById('del_evidencia');
                        let filename = `evidencia_${det[0].numcte}_${_uuid}.png`;
                        divElement.textContent = filename
                        botonQuitar.style.display = 'inline-block';
                        nombreEvidencia = filename;
                        UUID_Evidencia = _uuid;

                        const fileInput: any = document.getElementById('singleFileInput');
                        fileInput.value = null;
                        //resultDisplay.textContent = base64String; // Mostrar en pantalla (opcional)
                    };

                    // Leemos el archivo como datos URL, lo que nos da una cadena Base64
                    reader.readAsDataURL(selectedFile);
                }
                else {
                    global.info('El formato del archivo seleccionado no es valido');
                    return;
                }
            }
            
            //getData(this.props.detCita)
        }

        validFile(ext) {
            let valid = false;
            switch (ext) {
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/bmp':
                case 'image/svg':
                    valid = true;
                    break;
            }
            return valid;
        }

        openAndSetBound() {
            if (hasEvidencia) {
                global.info('Ya hay una evidencia cargada');
                return;
            }
            let modalAgendaFC: any = $("#modalCameraOpened");
            modalAgendaFC.modal({ backdrop: 'static', keyboard: false });
            modalAgendaFC.css("height", "auto");
            let modalContainer: any = document.querySelector('#modalCameraOpened');
            let mh = modalContainer.clientHeight;
            let mw = modalContainer.clientWidth;
            let customHeight = mh * 0.80;
            let customWidth = mw * 0.85;

            let camContainer: any = document.querySelector('#canvas_live');
            let snapContainer: any = document.querySelector('#canvas_snapshot');
            camContainer.style.height = `${customHeight}px`;
            snapContainer.style.height = `${customHeight}px`;
            camContainer.style.display = 'block';
            setTimeout(() => {
                let rect = camContainer.getBoundingClientRect();
                this.startCamera(customWidth, customHeight);
            }, 400)
           
            //console.log(mh);
        }

        startCamera(vw, vh) {
           // this.openAndSetBound();
            recording = true;
            this.cameraStream(true);
            //setTimeout(() => {
                let videobox: any = document.querySelector('#canvas_live');
                let rect = videobox.getBoundingClientRect();
                console.log(rect.width)
                console.log(rect.height)
                Quagga.init({
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        constraints: {
                            width: vw,
                            height: vh,
                        },
                        target: document.querySelector('#canvas_live')    // Or '#yourElement' (optional)
                    },
                    decoder: {
                        readers: ["code_128_reader"]
                    }
                }, (err) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                    console.log("Initialization finished. Ready to start");

                    Quagga.start();

                });
           // }, 250)
           
       
            
        };
     
        takePhoto() {
            let videobox: any = document.querySelector('#canvas_live video');
            //console.log(videobox)
            let rect = videobox.getBoundingClientRect();
            const canvas = document.createElement('canvas');
            canvas.width = rect.width;
            canvas.height = rect.height;
            const context = canvas.getContext('2d');
            context.drawImage(videobox, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');
           // console.log(dataURL)
            
            this.cameraStream(false);
            let imgtag: any = document.getElementById('img_snapshot');
            imgtag.src = `${dataURL}`;
            snapshotB64 = dataURL;
            this.showCameraButtons(false);
        };

        showCameraButtons(show) {
            let cambuttons: any = document.querySelector('#camera_buttons');
            let snapbuttons: any = document.querySelector('#snapshot_buttons');
            if (show) {
                cambuttons.style.display = 'block';
                snapbuttons.style.display = 'none';
            } else {
                cambuttons.style.display = 'none';
                snapbuttons.style.display = 'block';
            }
        }

        stopCamera() {
            Quagga.stop();
        }

       cameraStream(show) {
           let videocontainer: any = document.querySelector('#canvas_live');
           let photobox: any = document.querySelector('#canvas_snapshot');
           if (!recording) {
               videocontainer.style.display = 'none';
               photobox.style.display = 'none';
               return;
           }
           if (show) {
               videocontainer.style.display = 'block';
               photobox.style.display = 'none';
           } else {
               videocontainer.style.display = 'none';
               photobox.style.display = 'block';
           }
        }

        onCloseModalCamera() {
            try {
                Quagga.stop();
            } catch (ex) {}
            recording = false;
            snapshotB64 = '';
            nombreEvidencia = '';
            hasEvidencia = false;
            UUID_Evidencia = null;
            let modalCalen: any = $("#modalCameraOpened");
            modalCalen.modal('hide');
        }

        quitarEvidencia() {
            const botonQuitar = document.getElementById('del_evidencia');
            recording = false;
            snapshotB64 = '';
            nombreEvidencia = '';
            hasEvidencia = false;
            UUID_Evidencia = null;
            const divElement = document.getElementById('nom_evidencia');
            divElement.textContent = 'Ninguna evidencia seleccionada';
            botonQuitar.style.display = 'none';
        }

        verifyPhoto(accept, data) {
            //console.log(data)
            if (accept) {
                Quagga.stop();
                recording = false;
                this.cameraStream(false);
                hasEvidencia = true;
                let d = new Date();
                let _uuid = d.getTime();
                const divElement = document.getElementById('nom_evidencia');
                const botonQuitar = document.getElementById('del_evidencia');
                let filename = `evidencia_${data.numcte}_${_uuid}.png`;
                divElement.textContent = filename
                botonQuitar.style.display = 'inline-block';
                nombreEvidencia = filename; 
                UUID_Evidencia = _uuid;
                this.showCameraButtons(true);

                let modalCalen: any = $("#modalCameraOpened");
                modalCalen.modal('hide');
                //let _blob = this.b64ToBlob(snapshotB64);
                //this.blobToFile(_blob, filename);
            } else {
                snapshotB64 = '';
                hasEvidencia = false;
                this.cameraStream(true);
                this.showCameraButtons(true);
            }
        }


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


        nuevoHorario(): void {
            var fechaHoraInicio = new Date(Forms.getValue("FechaInicio", 'DetallesCita'));
            var horarioCompleto: any = getData(EK.Store.getState().global.HorarioAtencion);
            // console.log(horarioCompleto)
            // fechaHoraInicio.setHours(fechaHoraInicio.getHours() + 1);
            fechaHoraInicio.setMinutes(fechaHoraInicio.getMinutes() + 15);
            var horas: any = fechaHoraInicio.getHours();
            var minutos: any = fechaHoraInicio.getMinutes();
            var horaPropuesta: any = ("00" + horas).slice(-2) + ':' + ("00" + minutos).slice(-2)
            horarioCompleto.forEach((item: any) => {
                if (item.Clave === horaPropuesta) {
                    Forms.updateFormElement("DetallesCita", "HoraFIN", item);
                }
            });
        };
        //
        componentWillReceiveProps(nextProps: IAgendaEntregaViviendaProps, nextState: IAgendaEntregaViviendaProps): void {
            if (hasChanged(this.props.checkListGuardado, nextProps.checkListGuardado) && global.isSuccessful(nextProps.checkListGuardado)) {
                let item: any = getData(nextProps.checkListGuardado);
                switch (item.Estado) {
                    case 5: // eliminado con exito
                        let ubicacionEnProceso: any = Forms.getValue("DetalleCteAgendaEdit", SECTION_CAPTURA_INFO);
                        if (ubicacionEnProceso === null || ubicacionEnProceso === undefined) {
                            return;
                        } else {
                            ubicacionEnProceso.CantidadPendientesPorReparar = item.CantidadPendientesPorReparar;
                            ubicacionEnProceso.bit_revisado = item.bit_revisado;
                            Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", ubicacionEnProceso);
                        }
                        success("CheckList Guardado Correctamente!");
                        break;
                    default:
                        break;
                }
            };

            if (hasChanged(nextProps.agendaActualizada, this.props.agendaActualizada) && global.isSuccessful(nextProps.agendaActualizada)) {
                //aqui deberia hacer el render de las otras citas y regargar la agenda del usuario o administrador
                let item: any = getData(nextProps.agendaActualizada);
                // let lastItem: any = getData(this.props.agendaActualizada);
                switch (item.Estado) {
                    case 5: // eliminado con exito
                        success("Planificación Actualizada Correctamente!");
                        let idPagina = getData(EK.Store.getState().global.pageConfig).id;

                        if (idPagina === 'Agenda') {
                            let id = getData(EK.Store.getState().global.IdEvento);
                            let accion = getData(EK.Store.getState().global.TipoAccionAgendaReload);
                            let params = getData(EK.Store.getState().global.ParametrosReloadAgenda);
                            //console.log(params);
                            let indicadoresEstado = getData(EK.Store.getState().global.dashBoardAgendaIndicadoresEstados);
                            if (id !== undefined && id !== null) {
                                let objectCalendar = getData(EK.Store.getState().global.AgendaDashBoard);
                                let eventos = objectCalendar.Events;
                                let index = 0;
                                let repetidos = 0;
                                for (const evento of eventos) {
                                    index++;
                                    if (evento.UID === id) {
                                        evento.DTStart = item.FechaInicio;
                                        evento.DTEnd = item.FechaFin;
                                        const vencidos = this.diasVencidos(item.FechaInicio);
                                        if (vencidos === 0) {
                                            evento.BackgroundColor = '#FF8F00';
                                        } else if (vencidos > 0) {
                                            evento.BackgroundColor = '#df0707';
                                        } else {
                                            evento.BackgroundColor = '#8BC780';
                                        }
                                        repetidos++;
                                    }
                                }
                                if (repetidos > 1) {
                                    let params = getData(EK.Store.getState().global.ParametrosReloadAgenda);
                                    let fecha = getData(EK.Store.getState().global.FechaForReloadCalendar);
                                    params.FechaInicio = fecha;
                                    global.asyncPost("base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: params }, (status: AsyncActionTypeEnum, data: any[]) => {
                                        if (status === AsyncActionTypeEnum.successful) {
                                            global.dispatchSuccessful("load::AgendaDashBoard", data);
                                            let calendar: any = $('#AgendaDashBoard');
                                            calendar.fullCalendar('gotoDate', fecha);
                                        }
                                    });
                                } else {
                                    switch (accion) {
                                        case 'CAN':
                                            eventos.splice(index, 1);
                                            break;
                                        case 'ATE':
                                            indicadoresEstado[0].CantidadAtendidas++;
                                            let TipoAgenda = EK.Store.getState().forms.Agenda.form.TipoAgenda.value.Clave
                                            if (TipoAgenda == "EntregaVivienda") {
                                                let modal = $("#modalConfirmacionEncuesta");
                                                modal.modal({ backdrop: 'static', keyboard: false });
                                            }
                                            eventos.splice(index, 1);
                                            break;
                                        case 'REP':
                                            indicadoresEstado[0].CantidadReprogramadas++;
                                            break;
                                        case 'REP-ATE':
                                            indicadoresEstado[0].CantidadAtendidas++;
                                            indicadoresEstado[0].CantidadReprogramadas++;
                                            eventos.splice(index, 1);
                                            break;
                                    }
                                    //objectCalendar.Events = eventos;
                                    //let calendar: any = $('#AgendaDashBoard');
                                    //let fecha = getData(EK.Store.getState().global.FechaForReloadCalendar);
                                    //setTimeout(() => {
                                    //    console.log(fecha);
                                    //    global.dispatchSuccessful("load::AgendaDashBoard", objectCalendar);
                                    //    global.dispatchSuccessful('load::dashBoardAgendaIndicadoresEstados', indicadoresEstado)
                                    //    calendar.fullCalendar('gotoDate', fecha);
                                    //}, 100);
                                    let params = getData(EK.Store.getState().global.ParametrosReloadAgenda);
                                    let fecha = getData(EK.Store.getState().global.FechaForReloadCalendar);
                                    params.FechaInicio = fecha;
                                    global.asyncPost("base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: params }, (status: AsyncActionTypeEnum, data: any[]) => {
                                        if (status === AsyncActionTypeEnum.successful) {
                                            global.dispatchSuccessful("load::AgendaDashBoard", data);
                                            let calendar: any = $('#AgendaDashBoard');
                                            calendar.fullCalendar('gotoDate', fecha);
                                        }
                                    });
                                }

                            }
                        }

                        this.onClose();
                        break;
                    default:
                        break;
                }
            };

            if (hasChanged(this.props.plaza, nextProps.plaza) && this.props.plaza != undefined && (nextProps.plaza.ID != this.props.plaza.ID)) {
                Forms.updateFormElement(PAGE_entrega_viv_ID, "PersonaEntregaV", null);
                dispatchDefault("load::PERSONALENTREGAVXFRACC", null);
            };

            if (nextProps.fraccionamiento != null && hasChanged(this.props.fraccionamiento, nextProps.fraccionamiento) && this.props.fraccionamiento != undefined && this.props.fraccionamiento.ID != undefined && (nextProps.fraccionamiento.ID != this.props.fraccionamiento.ID)) {
                Forms.updateFormElement(PAGE_entrega_viv_ID, "PersonaEntregaV", null);
                let plaza: any = nextProps.plaza.ID;
                let fraccionamiento: any = nextProps.fraccionamiento.ID;
                global.dispatchAsyncPost("load::PERSONALENTREGAVXFRACC", "CapturaFechaConstruccion/GetPersonaEntregaVxFracc/", { Plaza: plaza, Fraccionamiento: fraccionamiento }, "PersonaEntregaVxFracc");
            };

            if (global.hasChanged(this.props.fechaInicio, nextProps.fechaInicio)) {
                if (nextProps.fechaInicio != null && nextProps.fechaInicio != undefined) {
                    if (this.props.fechaInicio != undefined && this.props.fechaInicio != null && nextProps.fechaInicio != null && nextProps.fechaInicio != undefined) {
                        let updateValue: boolean = false;
                        updateValue = global.hasChanged(this.props.fechaInicio, nextProps.fechaInicio) && this.equalDates(this.props.fechaInicio.value, nextProps.fechaInicio.value, '!=');
                        if (updateValue === true) {
                            this.nuevoHorario();
                        }
                    }
                }
            };
        };
        diasVencidos(newDate: Date) {
            let fecha = new Date();
            let fechaString = fecha.getFullYear() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getDate();
            let fechaString2 = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
            let nfecha = new Date(fechaString);
            let nfecha2 = new Date(fechaString2);
            let n1 = nfecha.getTime();
            let n2 = nfecha2.getTime()
            let vencidos = (n1 - n2) / 1000 / 60 / 60 / 24;
            return vencidos;
        }
        //Abrimos Modal para seleccion de Viviendas entregables
        onAddNew(): void {
            let tipoAgenda: any = Forms.getValue("TipoAgenda", 'AgendaNew') !== undefined ? Forms.getValue("TipoAgenda", 'AgendaNew').Clave : null
            if (tipoAgenda !== null) {
                switch (tipoAgenda) {
                    case "FechaConstruccion":
                        // console.log('modalAgendaMasivaFechaContruccion');
                        this.props.data.data = [];
                        //console.log(this.props.data.data)
                        let modalAgendaFC: any = $("#modalAgendaMasivaFechaContruccion");
                        modalAgendaFC.modal();
                        modalAgendaFC.css("height", "auto");
                        break;
                    case "EntregaVivienda":
                        let modalAgenda: any = $("#modalAgendaEntregaVivienda");
                        modalAgenda.modal();
                        modalAgenda.css("height", "auto");
                        break;
                }
            }
        };

        //Seleccion multiple de Viviendas entregables
        onSelectViviendasEnt(): void {
            //Distpatch de Consulta ConfigViviendaEntregableResult
            let model: any = Forms.getForm(PAGE_entrega_viv_ID);
            let PersonaEntrega: any = Forms.getValue("PersonaEntregaV", PAGE_entrega_viv_ID);
            let plaza: any = model.PlazaInicial.ID;
            let fraccionamiento: any = model.FraccInicial.ID;

            if (plaza < 1) {
                warning("Debe indicar la plaza");
                return;
            };

            if (fraccionamiento < 1) {
                warning("Debe indicar el Fraccionamiento");
                return;
            };

            if (PersonaEntrega < 1) {
                warning("Debe indicar el responsable de la entrega");
                return;
            };

            if (PersonaEntrega.Clave === 'Seleccione una opción') {
                warning("Debe Capturar la Persona de Entrega Vivienda !");
                return;
            }
            else {
                let removedItems: number = 0;
                let item: any = model
                    .addObject("PlazaInicial")
                    .addObject("FraccInicial")
                    .addObject("PersonaEntregaV")
                    .toObject();

                let columnas = [
                    { caption: " ", dataField: "SeleccionaCliente" },
                    { caption: "Cliente", dataField: "Cliente" },
                    { caption: "Fracccionamiento", dataField: "Fraccionamiento" },
                    { caption: "ET", dataField: 'id_num_smza' },
                    { caption: "MZ", dataField: 'id_num_mza' },
                    { caption: "LT", dataField: "id_num_lote" },
                    { caption: "INT", dataField: "id_num_interior" },
                    { caption: "EXT", dataField: "num_ext" },
                    { caption: "Ent. Viv.", dataField: "NomPersonaEntregaViv" },
                    { caption: "Equipamiento", dataField: "vale_mueble" },
                    { caption: "Financiamiento", dataField: "Financiamiento" },
                    { caption: "F. Escritura", dataField: "Firma_Escritura", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "F. Const.", dataField: "Fec_Construccion", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "P. Pago", dataField: "pendiente_pago" },
                    { caption: "F. Pagado", dataField: "fec_pago", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                    { caption: "ET/MZ/LT", dataField: "ETMZLT", alignment: "center" },
                ];
                //global.dispatchAsyncPost("global-page-data", "ConsultaViviendaEntregable/GetAgendaViviendasEntregables/", item, "AgendaConfigViviendaEntregableResult");

                let upd = document.getElementById("updating");
                let load = document.getElementById("loading");
                global.asyncPost("ConsultaViviendaEntregable/GetAgendaViviendasEntregables/", item, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            //console.log(data);
                            upd.style.display = "none";
                            load.style.display = "block";
                            let ItemsYaSeleccionados: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                            for (let d of data) {
                                d.vale_mueble = d.vale_mueble === 'True' ? true : false;
                                d.pendiente_pago = d.pendiente_pago === 'True' ? true : false;
                                if (ItemsYaSeleccionados !== null && ItemsYaSeleccionados !== undefined) {
                                    let i = ItemsYaSeleccionados.filter(x => x.ID === d.ID)[0];
                                    if (i !== null && i !== undefined) {
                                        d.SeleccionaCliente = i.SeleccionaCliente;
                                    } else {
                                        d.SeleccionaCliente = false;
                                    }
                                }
                                d.Cliente = d.numcte + ' - ' + d.nom_cte + ' ' + d.ap_paterno_cte + ' ' + d.ap_materno_cte;
                                d.Fraccionamiento = d.id_cve_fracc + ' ' + d.nom_fracc;
                            }
                            let fecha = Date.now();
                            dataGrid = $("#datagroupContainer").dxDataGrid({
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
                                sorting: {
                                    mode: "multiple" // or "multiple" | "none"
                                },
                                onRowPrepared(e) {
                                    //console.log(e);
                                    if (e.rowType == 'header') {
                                        e.rowElement[0].style.backgroundColor = '#fff';
                                        e.rowElement[0].style.color = '#333';
                                        e.rowElement[0].style.borderBottomColor = '#FFD59F';
                                    }
                                },
                                onCellClick: (e) => {
                                    let item = e.data;
                                    if (e.columnIndex === 0) {

                                        let TipoAgendaMasiva = EK.Store.getState().forms.AgendaNew.form.TipoAgenda.value.Clave;
                                        if (TipoAgendaMasiva === 'EntregaVivienda') {
                                            if (item.pago === "False") {
                                                EK.Global.info("No puede planificar la fecha de entrega porque La vivienda no esta PAGADA, Validar con titulación");
                                                return;
                                            }
                                            let validar: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                                            let pasaValidacion: boolean = true;
                                            for (var i = 0; i < validar.length; i++) {
                                                if (validar[i].id_cve_fracc != item.id_cve_fracc) {
                                                    pasaValidacion = false;
                                                    break;
                                                }
                                            }
                                            if (pasaValidacion === false) {
                                                warning("La planificación masiva solo se permite en Fraccionamientos Iguales");
                                                return;
                                            }
                                            let ItemsSeleccionados: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                                            if (ItemsSeleccionados === undefined || ItemsSeleccionados === null || !ItemsSeleccionados) {
                                                let items: DataElement = global.createSuccessfulStoreObject([]);
                                                let retValue: DataElement = items.upsertItem(item);
                                                Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", getData(retValue));
                                            } else {
                                                if (item.SeleccionaCliente === true) {
                                                    let Filtrado: any[] = (ItemsSeleccionados.filter(seleccionados => seleccionados.ID != item.ID));
                                                    Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", Filtrado);
                                                } else {
                                                    let items: DataElement = global.createSuccessfulStoreObject(ItemsSeleccionados);
                                                    if (item.ID == undefined && item.ID == null) {
                                                        item.ID = items.getNextLowerID();
                                                    };
                                                    let retValue: DataElement = items.upsertItem(item);
                                                    Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", getData(retValue));
                                                }

                                            }
                                            for (let d of data) {
                                                if (d.ID === item.ID) {
                                                    d.SeleccionaCliente = !d.SeleccionaCliente;
                                                }
                                            }
                                            dataGrid.refresh();
                                        }
                                    }
                                },


                                searchPanel: {
                                    visible: true
                                },
                                export: {
                                    enabled: false
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
                                    visible: false
                                },

                                columns: columnas,
                                columnFixing: { enabled: true },
                                showColumnLines: false,
                                showRowLines: false,
                                rowAlternationEnabled: true
                            }).dxDataGrid("instance");
                            //global.dispatchSuccessful("global-page-data", data, "AgendaConfigViviendaEntregableResult");

                            break;
                        case AsyncActionTypeEnum.loading:
                            upd.style.display = "block";
                            load.style.display = "none";
                            break;
                        case AsyncActionTypeEnum.failed:
                            upd.style.display = "none";
                            load.style.display = "none";
                            break;
                    }
                });
            }
        };

        onSelectConstruccion(): void {
            //Distpatch de Consulta ConfigViviendaEntregableResult
            let model: any = Forms.getForm(PAGE_entrega_viv_ID);
            // let PersonaEntrega: any = Forms.getValue("PersonaEntregaV", PAGE_entrega_viv_ID);
            let plaza: any = model.PlazaInicial.ID;
            let fraccionamiento: any = model.FraccInicial.ID;

            if (plaza < 1) {
                warning("Debe indicar la plaza");
                return;
            };

            if (fraccionamiento < 1) {
                warning("Debe indicar el Fraccionamiento");
                return;
            };

            //if (PersonaEntrega < 1) {
            //    warning("Debe indicar el responsable de la entrega");
            //    return;
            //};

            //if (PersonaEntrega.Clave === 'Seleccione una opción') {
            //    warning("Debe Capturar la Persona de Entrega Vivienda !");
            //    return;
            //}
            //else {
            //let removedItems: number = 0;
            //let item: any = model
            //    .addObject("PlazaInicial")
            //    .addObject("FraccInicial")
            //    // .addObject("PersonaEntregaV")
            //    .toObject();
            //global.dispatchAsyncPost("global-page-data", "ConsultaViviendaEntregable/GetAgendaViviendasEntregables/", item, "AgendaConfigViviendaEntregableResult");
            // }
            // let model: any = Forms.getForm(PAGE_ID);
            // let plaza: any = model.PlazaInicial.ID;
            // let fraccionamiento: any = model.FraccInicial.ID;
            let vocaciones = -2;
            let FechaInicial = new Date('10/03/2017');
            let FechaFinal = new Date();
            let Opcionales: any = 'SinProgramar';
            let cliente = null;
            let p: any = global.assign({
                Plaza: plaza,
                Fraccionamiento: fraccionamiento,
                Vocaciones: vocaciones,
                FechaInicial: FechaInicial,
                FechaFinal: FechaFinal,
                Opcionales: Opcionales,
                Cliente: cliente
            });
            // global.dispatchAsyncPost("global-page-data", "ConsultaViviendaEntregable/GetAgendaViviendasEntregables/", item, "AgendaConfigViviendaEntregableResult");

            //global.dispatchAsyncPost("global-page-data", "ConsultaViviendaEntregable/GetDetallesReprog/", { Uso: 'FCONS' }, "CheckListResult");
            //global.dispatchAsyncPost("global-page-data", "base/kontrol/CapturaFechaConstruccion/GetBP/GetFechaConstruccion/", { parametros: p }, 'AgendaConfigViviendaEntregableResult');
            let UrlAplicacion: any = window.location;
            let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'DPTO' : 'INT';
            let columnas = [
                { caption: " ", dataField: "SeleccionaCliente" },
                { caption: "Cliente", dataField: "Cliente" },
                { caption: "Fracccionamiento", dataField: "Fraccionamiento" },
                { caption: "ET", dataField: 'id_num_smza' },
                { caption: "MZ", dataField: 'id_num_mza' },
                { caption: "LT", dataField: "id_num_lote" },
                { caption: labelInterior, dataField: "id_num_interior" },
                { caption: "EXT", dataField: "id_num_exterior" },
                { caption: "Ent. Viv.", dataField: "Personaentregavivienda" },
                { caption: "F. Escritura", dataField: "firma_escritura", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "F. Const.", dataField: "fecha_construccion", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "P. Pago", dataField: "pendiente_pago", alignment: "center" },
                { caption: "F. Pagado", dataField: "fec_pago", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "ETMZLT", dataField: "ETMZLT", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' }
            ];

            if (UrlAplicacion.pathname.includes("intra")) {
                columnas.splice(3, 1).splice(4, 1).splice(5, 1);
                columnas.splice(5, 0, { caption: "Edificio", dataField: "edificio" }, { caption: "Nivel", dataField: "nivel" })
                columnas.pop();
            }
            let upd = document.getElementById("updating2");
            let load = document.getElementById("loading2");

            global.asyncPost("base/kontrol/CapturaFechaConstruccion/GetBP/GetFechaConstruccion/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //console.log(data);
                        upd.style.display = "none";
                        load.style.display = "block";
                        let ItemsYaSeleccionados: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                        for (let d of data) {
                            d.pendiente_pago = !d.pago;
                            if (ItemsYaSeleccionados !== null && ItemsYaSeleccionados !== undefined) {
                                let i = ItemsYaSeleccionados.filter(x => x.ID === d.ID)[0];
                                if (i !== null && i !== undefined) {
                                    d.SeleccionaCliente = i.SeleccionaCliente;
                                } else {
                                    d.SeleccionaCliente = false;
                                }
                            }
                            d.Cliente = d.numcte + ' - ' + d.nom_cte + ' ' + d.ap_paterno_cte + ' ' + d.ap_materno_cte;
                            d.Fraccionamiento = d.id_cve_fracc + ' ' + d.nom_fracc;
                        }
                        let fecha = Date.now();
                        dataGrid2 = $("#datagroupContainer2").dxDataGrid({
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
                            onRowPrepared(e) {
                                //console.log(e);
                                if (e.rowType == 'header') {
                                    e.rowElement[0].style.backgroundColor = '#fff';
                                    e.rowElement[0].style.color = '#333';
                                    e.rowElement[0].style.borderBottomColor = '#FFD59F';
                                }
                            },
                            onCellClick: (e) => {
                                let item = e.data;
                                if (e.columnIndex === 0) {

                                    let TipoAgendaMasiva = EK.Store.getState().forms.AgendaNew.form.TipoAgenda.value.Clave;
                                    if (TipoAgendaMasiva === 'FechaConstruccion') {

                                        let validar: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                                        let pasaValidacion: boolean = true;
                                        for (var i = 0; i < validar.length; i++) {
                                            if (validar[i].id_cve_fracc != item.id_cve_fracc) {
                                                pasaValidacion = false;
                                                break;
                                            }
                                        }

                                        if (pasaValidacion === false) {
                                            warning("La planificación masiva solo se permite en Fraccionamientos Iguales");
                                            return;
                                        }

                                        let PersonaEntrega: any = item.Personaentregavivienda;;
                                        let fec_liberacion: any = item.fec_liberacion;
                                        let fecha_entrega: any = item.fecha_entrega;

                                        if (fecha_entrega) {
                                            EK.Global.info("No se puede cargar la fecha de validación CAT porque ya esta capturada la fecha de entrega");
                                            return;
                                        }
                                        if (item && item.EstatusAgendaConstruccion && item.EstatusAgendaConstruccion.Clave === 'ATE') {
                                            EK.Global.warning('No puede planificar la fecha de construcción, porque ya fue atendida');
                                            return;
                                        }
                                        if (item && item.EstatusAgendaConstruccion && item.EstatusAgendaConstruccion.Clave === 'SUS') {
                                            EK.Global.warning('Esta cita está CANCELADA, puede realizar una Reprogramación');
                                            return;
                                        }
                                        if (PersonaEntrega === null) {
                                            EK.Global.info("Debe configurar un Agente para Entrega de Vivienda ");
                                            return;
                                        }
                                        else if (fec_liberacion === null || fec_liberacion === undefined) {
                                            EK.Global.info("Debe configurar una Fecha de Liberación para poder Capturar la Fecha de validación CAT");
                                            return;
                                        }

                                        let ItemsSeleccionados: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                                        if (ItemsSeleccionados === undefined || ItemsSeleccionados === null || !ItemsSeleccionados) {
                                            let items: DataElement = global.createSuccessfulStoreObject([]);
                                            let retValue: DataElement = items.upsertItem(item);
                                            Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", getData(retValue));
                                        } else {
                                            if (item.SeleccionaCliente === true) {
                                                let Filtrado: any[] = (ItemsSeleccionados.filter(seleccionados => seleccionados.ID != item.ID));
                                                Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", Filtrado);
                                            } else {
                                                let items: DataElement = global.createSuccessfulStoreObject(ItemsSeleccionados);
                                                if (item.ID == undefined && item.ID == null) {
                                                    item.ID = items.getNextLowerID();
                                                };
                                                let retValue: DataElement = items.upsertItem(item);
                                                Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", getData(retValue));
                                            }
                                        }
                                        for (let d of data) {
                                            if (d.ID === item.ID) {
                                                d.SeleccionaCliente = !d.SeleccionaCliente;
                                            }
                                        }
                                        dataGrid2.refresh();
                                    }
                                }
                            },


                            searchPanel: {
                                visible: true
                            },
                            export: {
                                enabled: false
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
                                visible: false
                            },

                            columns: columnas,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: false,
                            rowAlternationEnabled: true
                        }).dxDataGrid("instance");
                        //global.dispatchSuccessful("global-page-data", data, "AgendaConfigViviendaEntregableResult");

                        break;
                    case AsyncActionTypeEnum.loading:
                        upd.style.display = "block";
                        load.style.display = "none";
                        break;
                    case AsyncActionTypeEnum.failed:
                        upd.style.display = "none";
                        load.style.display = "none";
                        break;
                }
            });
        };

        onClickCancel(): void {
            Forms.remove(SECTION_CONCEPTO_ID);
            if (this.props.config) {
                this.props.config.setState({ viewMode: true }, SECTION_CONCEPTO_ID);
            }
        };
        onClose(): void {
            Reprogramar = false;
            Atendido = false;
            Reprogramado = false;
            Cancelado = false;
            verDetalle = false;
            itemFiltrado = false
            Forms.reset('DetallesCita');
            Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", null);

            let modalCalen: any = $("#modalAgendaEntregaVivienda");
            modalCalen.modal('hide');
            let ModalObj2: any = $("#modalAgendaInformacionCita");
            ModalObj2.modal('hide');
            recording = false;
            snapshotB64 = '';
            nombreEvidencia = '';
            hasEvidencia = false;
            UUID_Evidencia = null;
        };
        //Seleccion multiple de Conceptos del 

        onSelectCalendar(item: any, value: any): void {
            //console.log(item, value)
            // Entrega de vivienda
            // Validar si el formulario select tipo agenda no es null, abrir uno u otro, si no, obtener el id de la pagina
            let TipoAgendaMasiva = EK.Store.getState().forms.AgendaNew.form.TipoAgenda.value.Clave
            if (TipoAgendaMasiva === 'EntregaVivienda') {
                if (item.pago === "False") {
                    setTimeout(() => {
                        Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
                    }, 5);
                    if (value) {
                        EK.Global.info("No puede planificar la fecha de entrega porque La vivienda no esta PAGADA, Validar con titulación");
                    }
                    return;

                };
                let validar: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                let pasaValidacion: boolean = true;
                if (value === true) { // en caso de ser seleccionado
                    for (var i = 0; i < validar.length; i++) {
                        if (validar[i].id_cve_fracc != item.id_cve_fracc) {
                            pasaValidacion = false;
                            break;
                        }
                    }
                    if (pasaValidacion === false) {
                        Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
                        warning("La planificación masiva solo se permite en Fraccionamientos Iguales");
                        return;
                    }
                };

                if (value === true) { // en caso de ser seleccionado
                    let ItemsSeleccionados: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                    if (ItemsSeleccionados === undefined || ItemsSeleccionados === null || !ItemsSeleccionados) {
                        let items: DataElement = global.createSuccessfulStoreObject([]);
                        let retValue: DataElement = items.upsertItem(item);
                        Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", getData(retValue));
                    } else {
                        let items: DataElement = global.createSuccessfulStoreObject(ItemsSeleccionados);
                        if (item.ID == undefined && item.ID == null) {
                            item.ID = items.getNextLowerID();
                        };
                        let retValue: DataElement = items.upsertItem(item);
                        Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", getData(retValue));
                    }
                } else { // en caso de desmarcarlo
                    let ItemsSeleccionados: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                    if (ItemsSeleccionados === null || ItemsSeleccionados === undefined || !ItemsSeleccionados) {

                    } else {
                        let Filtrado: any[] = (ItemsSeleccionados.filter(seleccionados => seleccionados.ID != item.ID));
                        Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", Filtrado);
                    }
                }
            }
        };
        onSelectClienteFechaConstruccion(item: any, value: any): void {
            //  CONSTRUCCION
            let TipoAgendaMasiva = EK.Store.getState().forms.AgendaNew.form.TipoAgenda.value.Clave
            if (TipoAgendaMasiva === 'FechaConstruccion') {
                //console.log(item);
                let validar: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                let pasaValidacion: boolean = true;
                if (value === true) { // en caso de ser seleccionado
                    for (var i = 0; i < validar.length; i++) {
                        if (validar[i].id_cve_fracc != item.id_cve_fracc) {
                            pasaValidacion = false;
                            break;
                        }
                    }
                    if (pasaValidacion === false) {
                        Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
                        warning("La planificación masiva solo se permite en Fraccionamientos Iguales");
                        return;
                    }
                    let PersonaEntrega: any;
                    let fec_liberacion: any;
                    let fecha_entrega: any;
                    let EntregaVivienda = item;
                    if (EntregaVivienda !== undefined) {
                        PersonaEntrega = EntregaVivienda.Personaentregavivienda;
                        fec_liberacion = EntregaVivienda.fec_liberacion;
                        fecha_entrega = EntregaVivienda.fecha_entrega;
                    }

                    if (fecha_entrega) {
                        EK.Global.info("No se puede cargar la fecha de validación CAT porque ya esta capturada la fecha de entrega");
                        Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
                        return;
                    }
                    if (EntregaVivienda && EntregaVivienda.EstatusAgendaConstruccion && EntregaVivienda.EstatusAgendaConstruccion.Clave === 'ATE') {
                        EK.Global.warning('No puede planificar la fecha de construcción, porque ya fue atendida');
                        Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
                        return;
                    }
                    if (EntregaVivienda && EntregaVivienda.EstatusAgendaConstruccion && EntregaVivienda.EstatusAgendaConstruccion.Clave === 'SUS') {
                        EK.Global.warning('Esta cita está CANCELADA, puede realizar una Reprogramación');
                        Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
                        return;
                    }
                    if (PersonaEntrega === null) {

                        Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
                        EK.Global.info("Debe configurar un Agente para Entrega de Vivienda ");
                        return;
                    }
                    else if (fec_liberacion === null || fec_liberacion === undefined) {
                        EK.Global.info("Debe configurar una Fecha de Liberación para poder Capturar la Fecha de validación CAT");
                        Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
                        return;
                    }
                }

                // DESCOMENTAR TODO ESTO DESPUES DE AGREGAR TODAS LAS VALIDACIONES
                if (value === true) { // en caso de ser seleccionado
                    let ItemsSeleccionados: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                    if (ItemsSeleccionados === undefined || ItemsSeleccionados === null || !ItemsSeleccionados) {
                        let items: DataElement = global.createSuccessfulStoreObject([]);
                        let retValue: DataElement = items.upsertItem(item);
                        Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", getData(retValue));
                    } else {
                        let items: DataElement = global.createSuccessfulStoreObject(ItemsSeleccionados);
                        if (item.ID == undefined && item.ID == null) {
                            item.ID = items.getNextLowerID();
                        };
                        let retValue: DataElement = items.upsertItem(item);
                        Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", getData(retValue));
                    }
                } else { // en caso de desmarcarlo
                    let ItemsSeleccionados: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
                    if (ItemsSeleccionados === null || ItemsSeleccionados === undefined || !ItemsSeleccionados) {

                    } else {
                        let Filtrado: any[] = (ItemsSeleccionados.filter(seleccionados => seleccionados.ID != item.ID));
                        Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", Filtrado);
                    }
                }
            }
        };
        //Asignamos Ubicacion a la Agenda
        onSelectAceptaUbicaciones(item: any): void {
            let itemsSeleccionados: any[] = EK.Store.getState().forms.CapturaInfo.form.UbicacionesAgendaEdit.value;
            if (itemsSeleccionados.length > 0) {
                dispatchSuccessful("load::massive", "MASIVO");
            }
            this.tryDisposedxDg("#datagroupContainer");
            this.tryDisposedxDg("#datagroupContainer2");
            this.onClose();
        };
        tryDisposedxDg(id) {
            try {
                $(id).dxDataGrid("dispose");
            } catch (ex) { }
        }
        //Eliminamos Ubicacion de la Agenda
        onSelectEliminamosUbicaciones(item: any): void {
            //Seleccionamos Arreglo de ubicaciones seleccionado
            let UbicacionesAgenda: any[] = Forms.getValue("UbicacionesAgendaEdit", SECTION_CAPTURA_INFO);
            //Filtramos Ubicaciones
            let Filtrado: any[] = (UbicacionesAgenda.filter(ubicaciones => ubicaciones.ID != item.ID));
            //Actualizamos el Estado UbicacionesAgendaEdit
            Forms.updateFormElement(SECTION_CAPTURA_INFO, "UbicacionesAgendaEdit", Filtrado);
            Forms.updateFormElement("FormularioViviendasMasivas", "CheckSeleccion_" + item.ID, false);
        };
        onSelectDetalleCita(item: any, Estatus: any): void {
            itemFiltrado = true;
            verDetalle = false;
            console.log(item);
            //console.log(Estatus);
            //Atendidos
            if (Estatus === "ATE") {
                let fechaComparacion: any = new Date();
                let fechaFin: any = item.FechaFin;
                if (item.TipoAgenda.Clave === "FechaConstruccion") {
                    fechaComparacion = new Date();
                    let fecha120: any = new Date(fechaFin);
                    var dias = 10; // Número de días a agregar
                    fecha120.setDate(fecha120.getDate() + dias);
                    if (this.equalDates(fechaComparacion, fecha120, ">")) {
                        warning("La planificación ya se encuentra vencida, solo puede reprogramarla  ");
                        return;
                    };
                }
                if (item.TipoAgenda.Clave === "EntregaVivienda") {
                    fechaComparacion = new Date();
                    let fecha120: any = new Date(fechaFin);
                    var dias = 10; // Número de días a agregar
                    fecha120.setDate(fecha120.getDate() + dias);
                    if (this.equalDates(fechaComparacion, fecha120, ">")) {
                        warning("La planificación ya se encuentra vencida, solo puede reprogramarla  ");
                        return;
                    };
                };

                Atendido = true;
                Reprogramado = false;
                Cancelado = false;
                Reprogramar = false;
                let url: string = global.encodeAllURL("scv", "UbicacionesFalla", { activos: 1, usoFalla: "Ubicacion", lote_id: item.lote_id });
                global.dispatchAsync("load::ubicaciones$fallas", url);

            };

            //Reprogramados
            if (Estatus === "REP") {
                Atendido = false;
                Reprogramado = true;
                Cancelado = false;
                Reprogramar = true;
            };

            //Cancelados
            if (Estatus === "SUS") {
                Atendido = false;
                Reprogramado = false;
                Cancelado = true;
                Reprogramar = false;
            };

            //visualizacion
            if (Estatus === 'VER') {
                verDetalle = true;

                let estatusAgenda = !(item && item.EstatusAgenda) ? null : item.EstatusAgenda.Clave;
                if (estatusAgenda === "ATE") {
                    Atendido = true;
                    Reprogramado = false;
                    Cancelado = false;
                    Reprogramar = false;
                } else if (estatusAgenda === "REP") {
                    Atendido = false;
                    Reprogramado = true;
                    Cancelado = false;
                    Reprogramar = true;
                } else if (estatusAgenda === "SUS") {
                    Atendido = false;
                    Reprogramado = false;
                    Cancelado = true;
                    Reprogramar = false;
                }
            };

            if (verDetalle === true) {
                let horaFin: any = global.assign({
                    ID: 99999,
                    Clave: new Date(item.FechaFin).toLocaleTimeString("en-US"),
                    Nombre: ""
                });

                Forms.reset(DETALLES_CITA);
                Forms.updateFormElement(DETALLES_CITA, "TieneObservacionCliente", item.bit_detalles === "S");
                Forms.updateFormElement(DETALLES_CITA, "Motivo", item.Motivo);
                Forms.updateFormElement(DETALLES_CITA, "FechaInicio", item.FechaInicio);
                Forms.updateFormElement(DETALLES_CITA, "FechaFin", item.FechaFin);
                Forms.updateFormElement(DETALLES_CITA, "HoraFIN", horaFin);
                Forms.updateFormElement(DETALLES_CITA, "Observaciones", item.observaciones);
                Forms.updateFormElement(DETALLES_CITA, "EstatusAgenda", item.EstatusAgenda);
            } else {
                let fechaActual: Date = new Date();
                let fechaPropuesta: Date;
                fechaActual = global.FechaPropuesta(fechaActual, 1);
                fechaPropuesta = global.FechaPropuesta(fechaActual, 1);
                Forms.reset(DETALLES_CITA);
                Forms.updateFormElement(DETALLES_CITA, "FechaInicio", fechaActual);
            };

            //Actualizamos el Estado DetalleCteAgendaEdit
            Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", item);
            dispatchSuccessful("load::KontrolFileParametersCurrentEntityType", { data: "SPVAgenda" });
            dispatchSuccessful("load::KontrolFileParametersCurrentEntity", item);
        };

        onAccesoDirectoReprogramacion(): void {
            let storedListaIncidencias = EK.Store.getState().global.listaIncidenciasUbicacionEntrega;
            let ListaIncidencias = storedListaIncidencias && storedListaIncidencias.data && storedListaIncidencias.data.length > 0 ? storedListaIncidencias.data : [];
            //console.log(ListaIncidencias)
            ListaIncidencias = ListaIncidencias.filter(x => x.ID !== null);
            let totalIncidencias = ListaIncidencias.length;
           
            if (totalIncidencias < 1) {
                global.warning('Debes guardar al menos una incidencia para continuar');
                return;
            }
            let item: any;
            console.log(item)
            item = Forms.getValue("DetalleCteAgendaEdit", "CapturaInfo");
            let p: any = global.assign({
                Motivo: "REP",
                Uso: item.TipoAgenda.Clave
            });
            dispatchSuccessful('load::REPREZ', { rezago: true });
            dispatchAsyncPost("load::SPVMOTIVOS", "CapturaFechaConstruccion/GetMotivosRezago/", { parametros: p });
            //dispatchAsyncPost("load::SPVMOTIVOS", "CapturaFechaConstruccion/GetMotivosReprogramacion/", { parametros: p });
            this.onSelectDetalleCita(item, 'REP');
        }

        GetIncidenciasEntregaCliente(numcte: number) {
            try {
                Forms.reset(DETALLES_INCIDENCIA_CITA)
                Forms.updateFormElement(DETALLES_INCIDENCIA_CITA, 'TipoFalla', null)
                Forms.updateFormElement(DETALLES_INCIDENCIA_CITA, 'Falla', null)
                Forms.updateFormElement(DETALLES_INCIDENCIA_CITA, 'Contratista', null)
                //let formInc = document.getElementById('formIncidencias');
                //let listInc = document.getElementById('gridIncidencias');
                //formInc.style.display = 'none';
                //listInc.style.display = 'block';
                //nombreEvidencia = 'Ninguna evidencia seleccionada...';
                hasEvidencia = false;
                recording = false;
                UUID_Evidencia = null;
                snapshotB64 = '';
                nombreEvidencia = '';
                Quagga.stop();
            } catch (ex) { }
            setTimeout(() => {
                let loader = document.getElementById('_loader_inc_id_grid');
                let loaded = document.getElementById('_loaded_inc_id_grid');
                let parametros = { numcte }
                //console.log(numcte)
                //let storedListaIncidencias = EK.Store.getState().global.listaIncidenciasUbicacionEntrega;
                //let ListaIncidencias = storedListaIncidencias && storedListaIncidencias.data && storedListaIncidencias.data.length > 0 ? storedListaIncidencias.data : [];
              
                if (numcte !== null && numcte !== undefined && numcte > 0) {
                    global.asyncPost("base/scv/ReportesFallas/GetBP/GetIncidenciasEntrega", { parametros }, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                console.log(data)

                                //ListaIncidencias.push(itemIncidencia);
                                loader.style.display = 'none';
                                loaded.style.display = 'block'
                                global.loadDxGrid('inc_id_grid', this.getColumnasDxgrid(), data);
                                dispatchSuccessful('load::listaIncidenciasUbicacionEntrega', data);

                                //if (data === 1) {
                                //    // global.dispatchSuccessful("global-current-entity");
                                //    //this.resetAllForm()
                                //    global.success('Informacion guardada correctamente');
                                //}

                                break;
                            case AsyncActionTypeEnum.loading:
                                loader.style.display = 'block';
                                loaded.style.display = 'none'
                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loaded.style.display = 'block'
                                break;
                        }
                    });
                }
            }, 150)
          
           
        }

        onAddNewIncidencia(): void {
            
            let itemForm: any;
            itemForm = Forms.getForm(DETALLES_INCIDENCIA_CITA)
            console.log(itemForm);
            if (itemForm && (itemForm.TipoFalla === undefined || itemForm.TipoFalla === null || itemForm.Falla === undefined || itemForm.Falla === null )) {
                global.info('Informacion incompleta');
                return;
            }
            if (!(itemForm && itemForm.UbicacionFalla && itemForm.UbicacionFalla.ID && itemForm.UbicacionFalla.ID > 0)) {
                global.info('Informacion incompleta');
                return;
            }
            if (!(itemForm.TipoContProv && itemForm.TipoContProv !== undefined && itemForm.TipoContProv !== '')) {
                global.info('Informacion incompleta');
                return;
            }
            if (!(itemForm.Contratista && itemForm.Contratista !== undefined && itemForm.Contratista !== null && itemForm.Contratista.ID > 0)) {
                global.info('Informacion incompleta');
                return;
            }

            let d = new Date();
            let itemIncidencia = {
                ID:null,
                IdFamilia: itemForm.TipoFalla.ID,
                Familia: itemForm.TipoFalla.Nombre,
                IdComponente: itemForm.Falla.ID,
                Componente: itemForm.Falla.Descripcion,
                IdUbicacion: itemForm.UbicacionFalla.IdUbicacionFalla,
                Ubicacion: itemForm.UbicacionFalla.Descripcion,
                IdContratista: itemForm.Contratista ? itemForm.Contratista.ID:null,
                Contratista: itemForm.Contratista ? itemForm.Contratista.Descripcion:null,
                AtendidoAlMomento: itemForm.atendidoMomento !== undefined && itemForm.atendidoMomento !== null ? itemForm.atendidoMomento : false,
                Evidencia: snapshotB64, 
                NomEvidencia: nombreEvidencia,
                UUID_Evidencia,
                TieneEvidencia: hasEvidencia ? 'SI' : 'NO',
                Observaciones: itemForm.Observaciones,
                incidenciaContratista: itemForm.TipoContProv === 'EsContratista' ? 'SI':'NO',
                incidenciaProveedor: itemForm.TipoContProv === 'EsProveedor' ? 'SI' : 'NO'
            }

           
            let storedListaIncidencias = EK.Store.getState().global.listaIncidenciasUbicacionEntrega;
            let ListaIncidencias = storedListaIncidencias && storedListaIncidencias.data && storedListaIncidencias.data.length > 0 ? storedListaIncidencias.data : [];
            ListaIncidencias.push(itemIncidencia);
            let formInc = document.getElementById('formIncidencias');
            let listInc = document.getElementById('gridIncidencias');
            let btnsaveincome = document.getElementById('btn_save_inc');
            
            Forms.reset(DETALLES_INCIDENCIA_CITA)
            Forms.updateFormElement(DETALLES_INCIDENCIA_CITA, 'TipoFalla', null)
            Forms.updateFormElement(DETALLES_INCIDENCIA_CITA, 'Falla', null)
            Forms.updateFormElement(DETALLES_INCIDENCIA_CITA, 'Contratista', null)
            formInc.style.display = 'none';
            listInc.style.display = 'block';
            setTimeout(()=>{
                btnsaveincome.style.display = 'block';
            }, 250)
           
            global.loadDxGrid('inc_id_grid', this.getColumnasDxgrid(), ListaIncidencias);
            dispatchSuccessful('load::listaIncidenciasUbicacionEntrega', ListaIncidencias);
            const divElement = document.getElementById('nom_evidencia');
            const botonQuitar = document.getElementById('del_evidencia');
            
            divElement.textContent = 'Ninguna evidencia seleccionada...';
            botonQuitar.style.display = 'none';
            
            //nombreEvidencia = 'Ninguna evidencia seleccionada...';
            hasEvidencia = false;
            recording = false;
            try {
                Quagga.stop();
            } catch (ex) {}
            
            
        }

     

        onCancelNewIncidencia() {
            Forms.reset(DETALLES_INCIDENCIA_CITA)
            Forms.updateFormElement(DETALLES_INCIDENCIA_CITA, 'TipoFalla', null)
            Forms.updateFormElement(DETALLES_INCIDENCIA_CITA, 'Falla', null)
            Forms.updateFormElement(DETALLES_INCIDENCIA_CITA, 'Contratista', null)
            let formInc = document.getElementById('formIncidencias');
            let listInc = document.getElementById('gridIncidencias');
            formInc.style.display = 'none';
            listInc.style.display = 'block';
            //nombreEvidencia = 'Ninguna evidencia seleccionada...';
            hasEvidencia = false;
            recording = false;
            UUID_Evidencia = null;
            snapshotB64 = '';
            nombreEvidencia = '';
            try {
                Quagga.stop();
            } catch (ex) { }
        }

        showFormNewIncidencias(): void {
            //const formInc = document.getElementById('btn_save_inc');
            //formInc.style.display = 'block'
            let formInc = document.getElementById('formIncidencias');
            let listInc = document.getElementById('gridIncidencias');
            formInc.style.display = 'block';
            listInc.style.display = 'none';
            const divElement = document.getElementById('nom_evidencia');
            const botonQuitar = document.getElementById('del_evidencia');
            botonQuitar.style.display = 'none';
            divElement.textContent = 'Ninguna evidencia seleccionada...';
            //nombreEvidencia = 'Ninguna evidencia seleccionada...';
            hasEvidencia = false;
            recording = false;
            UUID_Evidencia = null;
            snapshotB64 = '';
            nombreEvidencia = '';
            try {
                Quagga.stop();
            } catch (ex) {}
        }

        saveAllIncidenciasUbicacion() {
            let item: any = Forms.getForm(SECTION_CAPTURA_INFO)
            let storedListaIncidencias = EK.Store.getState().global.listaIncidenciasUbicacionEntrega;
            let ListaIncidencias = storedListaIncidencias && storedListaIncidencias.data && storedListaIncidencias.data.length > 0 ? storedListaIncidencias.data : [];
            ListaIncidencias = ListaIncidencias.filter(x => x.ID === null);
            console.log(ListaIncidencias)
            console.log(item)
            if (ListaIncidencias.length > 0) {
                EK.Global.confirm("Desea guardar la siguiente informacion? ", "Incidencias", () => {
                    let parametros = { lista: [] }

                    for (let pta of ListaIncidencias) {
                        let obj = {
                            familia: pta.IdFamilia,
                            componente: pta.IdComponente,
                            ubicacion: pta.IdUbicacion,
                            contratista: pta.IdContratista,
                            numcte: item.DetalleCteAgendaEdit.numcte,
                            id_identificador_cc: item.DetalleCteAgendaEdit.id_identificador,
                            atendidoAlMomento: pta.AtendidoAlMomento,
                            clave_evidencia: pta.UUID_Evidencia,
                            observaciones: pta.Observaciones,
                            IdAgenda: item.DetalleCteAgendaEdit.ID,
                            incidenciaContratista: pta.incidenciaContratista,
                            incidenciaProveedor: pta.incidenciaProveedor
                        }
                        parametros.lista.push(obj);
                    }

                    let loader = document.getElementById('_loader_inc_id_grid');
                    let loaded = document.getElementById('_loaded_inc_id_grid');

                    global.asyncPost("base/scv/ReportesFallas/GetBP/GuardarIncidenciasEntrega", { parametros }, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                console.log(data)
                                loader.style.display = 'none';
                                loaded.style.display = 'block'
                                if (data === 1) {
                                    this.saveAllEvidenciasEntrega(item.DetalleCteAgendaEdit.numcte);
                                    //global.success('Informacion guardada correctamente');
                                    //this.GetIncidenciasEntregaCliente(item.DetalleCteAgendaEdit.numcte);
                                    //this.saveAllEvidenciasEntrega(item.DetalleCteAgendaEdit.numcte);
                                } else {

                                }

                                break;
                            case AsyncActionTypeEnum.loading:
                                loader.style.display = 'block';
                                loaded.style.display = 'none'
                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loaded.style.display = 'block'
                                break;
                        }
                    });
                });
            } else {
                global.info('No ha agregado ninguna incidencia')
            }
            
        }

        b64ToBlob(b64: string, contentType: string = 'image/png'): Blob {
            let base64Content = b64.split(';base64,').pop();
            const byteCharacters = atob(base64Content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: contentType });
        }

        blobToFile(theBlob: Blob, fileName: string): EK.UX.Kontrol.File {
            const file = new File([theBlob], fileName, {
                type: theBlob.type,
                lastModified: new Date().getTime(),
            });
            //console.log(file);
            let _file: EK.UX.Kontrol.File =  new EK.UX.Kontrol.File(file);
            //_file = new EK.UX.Kontrol.File(file);
            //console.log(_file)
            return _file;
        }

        saveAllEvidenciasEntrega(numcte) {
            let storedListaIncidencias = EK.Store.getState().global.listaIncidenciasUbicacionEntrega;
            let ListaIncidencias = storedListaIncidencias && storedListaIncidencias.data && storedListaIncidencias.data.length > 0 ? storedListaIncidencias.data : [];
            //console.log(ListaIncidencias)
            ListaIncidencias = ListaIncidencias.filter(x => x.ID === null && x.Evidencia !== null && x.Evidencia !== '');
            if (ListaIncidencias.length > 0) {
                let arrayFiles = [];
                let index = 1;
                let total = ListaIncidencias.length;
                for (let incidencia of ListaIncidencias) {
                    let _blob = this.b64ToBlob(incidencia.Evidencia);
                    let _file = this.blobToFile(_blob, incidencia.NomEvidencia);
                    let model: any = {};
                    let d = new Date();
                    model = EK.Global.assign(model, {
                        EntityId: numcte,
                        EntityType: 'EvidenciaIncEntrega',
                        Nombre: _file.getName(),
                        FileSize: _file.getSize(),
                        FileType: _file.getType(),
                        FileExtension: _file.getExtension(),
                        Modulo: 'SPV',
                        Tipo: 'anexos',
                        Uid: d.getTime(),
                        Clave: incidencia.UUID_Evidencia
                    });
                    let data: FormData = new FormData();
                    data.append("item", JSON.stringify(model));
                    data.append("file", _file.getFile());
                    this.saveDatafileIncidencia(data, index, total, numcte);
                    index++;
                }
            } else {
                global.success('Informacion guardada correctamente');
                this.GetIncidenciasEntregaCliente(numcte);
                let btnsaveincome = document.getElementById('btn_save_inc');
                setTimeout(() => {
                    btnsaveincome.style.display = 'none';
                }, 100)
            }
        }

        saveDatafileIncidencia(data: FormData, index, total, numcte) {
            let loader = document.getElementById('_loader_inc_id_grid');
            let loaded = document.getElementById('_loaded_inc_id_grid');
            global.asyncPut("KontrolFiles/Save", data, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //console.log(data)
                        if (index === total) {
                            loader.style.display = 'none';
                            loaded.style.display = 'block'
                            global.success('Informacion guardada correctamente');
                            this.GetIncidenciasEntregaCliente(numcte);
                            let btnsaveincome = document.getElementById('btn_save_inc');
                            setTimeout(() => {
                                btnsaveincome.style.display = 'none';
                            }, 100)
                            //console.log('todos guardados')
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loaded.style.display = 'block'
                        break;
                }
            });
        }

        getColumnasDxgrid() {
            let columnas = [
                //{ caption: "ID", dataField: 'id' },
                { caption: "Familia", dataField: 'Familia' },
                { caption: "Componente", dataField: 'Componente'},
                { caption: 'Ubicacion', dataField: 'Ubicacion' },
                { caption: 'Contratista', dataField: 'Contratista', alignment: 'center' },
                { caption: 'Observaciones', dataField: 'Observaciones', alignment: 'center' },
                { caption: 'Atendido al momento', dataField: 'AtendidoAlMomento', dataType: "boolean", alignment: 'center' },
                { caption: 'Evidencia', dataField: 'TieneEvidencia', alignment: 'center' }

            ];
            return columnas;
        }

        getNewFechaTest() {
            const currentDate = new Date();
            const dateNext = new Date(currentDate);
            dateNext.setDate(currentDate.getDate() + 10);
            return dateNext;
        }

        getStartDays() {
            let detCita = getData(this.props.detCita);
            let tipoClaveAgenda = detCita[0].TipoAgenda !== undefined ? detCita[0].TipoAgenda.Clave : null;
            let dias = 0;
            let d = new Date();
            let h = d.getHours();
            let totalHoras = 148 + h;
            var FechaActual = new Date();
            if (tipoClaveAgenda !== null) {
                switch (tipoClaveAgenda) {
                    case 'FechaConstruccion':
                        dias = -(totalHoras / 24);
                        for (var i = 1; i < 6; i++) {
                            var FechaAnterior = new Date(FechaActual);
                            FechaAnterior.setDate(FechaAnterior.getDate() - i);
                            if (FechaAnterior.getDay() === 0) {
                                dias--;
                            }
                        }
                        //dias = -25;
                        break;
                    case 'EntregaVivienda':
                        dias = -(totalHoras / 24);
                        for (var i = 1; i < 6; i++) {
                            var FechaAnterior = new Date(FechaActual);
                            FechaAnterior.setDate(FechaAnterior.getDate() - i);
                            if (FechaAnterior.getDay() === 0) {
                                dias--;
                            }
                        }
                        break;
                }
            }

            return dias;
        }

        //Botones de Estatus
        onSelectBotonEstatus(Estatus?: any): void {
            //Obtenemos el Item editado
            let UrlAplicacion: any = window.location;

            let Item: any = Forms.getValue("DetalleCteAgendaEdit", SECTION_CAPTURA_INFO);
            //Obtenemos Fecha Inicio
            //console.log(Item);
            let FechaInicio: any = Forms.getValue("FechaInicio", DETALLES_CITA);
            //Obtenemos Fecha Fin
            // let FechaFin: any = Forms.getValue("FechaFin", DETALLES_CITA);
            //Obtenemos Fecha Reprogramacion
            let Observaciones: any = Forms.getValue("Observaciones", DETALLES_CITA);
            let nombreResidente: any = Forms.getValue("NombreResidente", DETALLES_CITA);
            //Obtenemos Fecha Reprogramacion
            let Motivo: any = Forms.getValue("Motivo", DETALLES_CITA);
            //Obtenemos Motivo Reprogramacion

            let idPlaza: any = Item.id_identificador;
            if (Item.id_identificador === null || Item.id_identificador === undefined) {
                EK.Global.info("La plaza no esta definida en la planificación a actualizar");
                return;
            }

            if (Observaciones === undefined) {
                Observaciones = '';
            }

            nombreResidente = nombreResidente === undefined ? '' : nombreResidente;

            let ObsCte: any = Forms.getValue("Opcionales", DETALLES_CITA);
            let bit_detalles: any;
            let tituloMotivo: any;
            let idPagina = getData(EK.Store.getState().global.pageConfig).id;
            let IdUsuarioAsignado;
            switch (idPagina) {
                case 'Agenda':
                    IdUsuarioAsignado = Item.num_entrega_viv ? Item.num_entrega_viv : null;
                    break;
                case 'CapturaFechaConstruccion':
                    IdUsuarioAsignado = Forms.getValue("PersonaEntregaV", 'SeccionCapturaFechaConstruccion') ? Forms.getValue("PersonaEntregaV", 'SeccionCapturaFechaConstruccion').Clave : null;
                    break;
                case 'ConfigViviendaEntregable':
                    IdUsuarioAsignado = Forms.getValue("PersonaEntregaV", 'CapturaCampos') ? Forms.getValue("PersonaEntregaV", 'CapturaCampos').Clave : null;
                    break;
            }
            let tipoAgendaCLave: any = Item.TipoAgenda.Clave ? Item.TipoAgenda.Clave : null;
            let num_entrega_viv: any = Item.num_entrega_viv ? Item.num_entrega_viv : null;
            // let IdUsuarioAsignado: any = Forms.getValue("PersonaEntregaV", 'SeccionCapturaFechaConstruccion') ? Forms.getValue("PersonaEntregaV", 'SeccionCapturaFechaConstruccion').Clave : num_entrega_viv;
            bit_detalles = null;
            tituloMotivo = "";

            let fechaInicio: any;
            let fechaFin: any;
            let fechaInicioFormulario: any;
            let fechaFinFormulario: any;
            /***********************************************************/

            fechaInicioFormulario = Forms.getValue("FechaInicio", DETALLES_CITA);
            let horaFin: any = Forms.getValue("HoraFIN", DETALLES_CITA) === undefined ? null : Forms.getValue("HoraFIN", DETALLES_CITA).Clave;

            if (Estatus === 'REP') {
                if (horaFin === undefined || horaFin === null) {
                    warning("Debe Indicar la Hora Fin");
                    return;
                };

                var timePat = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$";
                var matchArray = horaFin.match(timePat);

                if (matchArray == null) {
                    return
                }
            };

            var fechaProcesar = new Date(fechaInicioFormulario);
            var pad: string = "00";
            horaFin = horaFin + ":00.000";
            let fechaText: any;
            fechaText = new Date(fechaProcesar.getFullYear() + "-" + (pad + (fechaProcesar.getMonth() + 1).toString()).slice(-pad.length) + "-" + (pad + fechaProcesar.getDate().toString()).slice(-pad.length) + " " + horaFin);
            fechaFinFormulario = fechaText;
            fechaFin = fechaFinFormulario;

            if (Estatus === "ATE" && Item.TipoAgenda.Clave === "EntregaVivienda") {
                bit_detalles = "N";
                if (ObsCte != "ObsClienteSI" && ObsCte != "ObsClienteNO") {
                    warning("Debe Indicar si el cliente recibe CON o SIN Observación");
                    return
                }
                if (ObsCte === "ObsClienteSI") {
                    bit_detalles = "S";
                }
            }

            if (Estatus === "REP" || Estatus === "SUS") {
                tituloMotivo = "la Pausa"
                if (Estatus === "REP") {
                    tituloMotivo = "la Reprogramación"
                };

                if (Motivo != null && Motivo) {
                    if (Motivo === undefined || Motivo === null || Motivo.ID === undefined || Motivo.ID === null) {
                        warning("Debe Indicar el Motivo de " + tituloMotivo);
                        return;
                    }
                };
            };

            //Estatus Atendido
            if (Estatus === 'ATE') {
                if (Item.TipoAgenda.Clave === "FechaConstruccion") {
                    if (UrlAplicacion.pathname.includes("intra")) {
                        if (Item.CantidadPendientesPorReparar > 0 && nombreResidente === '') {
                            warning("Ingrese el Nombre del residente que lo Recibe!");
                            return;
  
                        };
                    } else {
                        if (Item.bit_revisado == null || Item.bit_revisado == undefined) {
                            EK.Global.info("La Planificación no puede ser actualizada  porque no ha Revisado el CheckList");
                            return;
                        };
                        if (Item.CantidadPendientesPorReparar > 0) {
                                warning("La Planificación no puede ser actualizada porque existen items del CheckList por resolver!");
                                return;
                        };
                    }
                 
                };
                //console.log(Motivo);
                //if()
                let conObservacion: any = Forms.getValue("Opcionales", 'DetallesCita');
                let recibeConObservacion: any = Forms.getValue("ConfirmaEntregaConObservacion", 'DetallesCita');
                let storedListaIncidencias = EK.Store.getState().global.listaIncidenciasUbicacionEntrega;
                let ListaIncidencias = storedListaIncidencias && storedListaIncidencias.data && storedListaIncidencias.data.length > 0 ? storedListaIncidencias.data : [];
                //console.log(ListaIncidencias)
                let listaIncidenciasGuardadas = ListaIncidencias.filter(x => x.ID !== null);
                let listaIncidenciasNoGuardadas = ListaIncidencias.filter(x => x.ID === null);

                let totalIncidencias = listaIncidenciasGuardadas.length;

               
                console.log(ListaIncidencias)
                console.log(totalIncidencias)

                if (Observaciones === null || Observaciones === undefined || Observaciones.trim() === '') {
                    global.warning('El campo de Información adicional es obligatorio ', 'Atencion');
                    return;
                }

                var patt = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                var res = patt.test(Observaciones);
                if (!res) {
                    global.warning('El texto ingresado contiene caracteres no validos', 'Atencion');
                    return;
                }

                if (Item.TipoAgenda.Clave === "EntregaVivienda" ) {
                    if (totalIncidencias < 1 && conObservacion === "ObsClienteSI") {
                        global.warning('Debes guardar al menos una incidencia para continuar', 'Sin observaciones')
                        return;
                    }
                    //console.log(res);
                    if (listaIncidenciasNoGuardadas && listaIncidenciasNoGuardadas.length > 0) {
                        global.info('Si haces la recepcion sin haber guardado perderas la informacion', 'Observaciones no guardadas')
                    }
                }
                let tituloMensaje = Item.TipoAgenda.Clave === "FechaConstruccion" && Item.CantidadPendientesPorReparar > 0 ? 'Recepción con Observaciones' : 'Recepción de Vivienda';
                tituloMensaje = UrlAplicacion.pathname.includes("intra") ? tituloMensaje : 'Recepción de Vivienda'
                //Item.NombreResidente = nombreResidente;
                console.log(Item);
                EK.Global.confirm("Presione Confirmar para guardar ", tituloMensaje, () => {
                    if (conObservacion === "ObsClienteSI" && recibeConObservacion === "RecibeConObservacionSI") {
                        //this.props.ActEstatusAgenda(Item.IdAgenda, Item.ID, Item.numcte, Estatus, null, Observaciones, null, null, null, bit_detalles, tipoAgendaCLave, IdUsuarioAsignado, idPlaza, null, Motivo.ID);
                        this.props.ActEstatusAgenda(Item.IdAgenda, Item.ID, Item.numcte, Estatus, null, Observaciones, null, null, null, bit_detalles, tipoAgendaCLave, IdUsuarioAsignado, idPlaza, null, 0, nombreResidente);
                    } else {
                        this.props.ActEstatusAgenda(Item.IdAgenda, Item.ID, Item.numcte, Estatus, null, Observaciones, null, null, null, bit_detalles, tipoAgendaCLave, IdUsuarioAsignado, idPlaza, null, 0, nombreResidente);
                    }
                    dispatchSuccessful('load::TipoAccionAgendaReload', 'ATE')
                    // console.log(Item.IdAgenda, Item.ID, Item.numcte, Estatus, null, Observaciones, null, null, null, bit_detalles, tipoAgendaCLave, IdUsuarioAsignado, idPlaza)
                });
            };

            //Estatus Reprogramado
            if (Estatus === "REP") {
                // console.log(IdUsuarioAsignado);
                let DetallesCita: any[] = getData(this.props.detCita);
                if (Item.TipoAgenda.Clave === "FechaConstruccion") {
                    if ((DetallesCita) && DetallesCita.length > 0) {
                        fechaInicio = DetallesCita[0].FechaInicio;
                        fechaFin = DetallesCita[0].FechaFin;

                        var fechaLimite = new Date(fechaInicio);
                        var dias = 3; // Número de días a agregar
                        fechaLimite.setDate(fechaLimite.getDate() + dias);

                        if (this.equalDates(fechaInicioFormulario, fechaLimite, ">")) {
                            warning("No se puede Reprogramar una fecha de construcción, con una fecha de inicio mayor a 3 días");
                            return
                        }
                        if (this.equalDates(fechaFinFormulario, fechaInicioFormulario, "<=")) {
                            warning("La fecha fin no puede ser menor o igual a la fecha de inicio");
                            return
                        }
                    }
                } else {
                    if ((DetallesCita) && DetallesCita.length > 0) {
                        fechaInicio = DetallesCita[0].FechaInicio;
                        fechaFin = DetallesCita[0].FechaFin;
                    }
                };
                Reprogramar = true;
                if (Observaciones === null || Observaciones === undefined || Observaciones.trim() === '') {
                    global.warning('El campo de Información adicional es obligatorio', 'Atencion');
                    return;
                }
                var patt = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                var res = patt.test(Observaciones);
                if (!res) {
                    global.warning('El texto ingresado contiene caracteres no validos', 'Atencion');
                    return;
                }
                FechaInicio = new Date(FechaInicio.getTime() - (FechaInicio.getTimezoneOffset() * 60000)).toISOString();
                fechaFinFormulario = new Date(fechaFinFormulario.getTime() - (fechaFinFormulario.getTimezoneOffset() * 60000)).toISOString();
                EK.Global.confirm("Presione Confirmar para Reprogramar la Planificación", "Reprogramar Planificación", () => {
                    dispatchSuccessful('load::TipoAccionAgendaReload', 'REP')
                    let rezago = getData(EK.Store.getState().global.REPREZ).rezago;
                    //console.log(Observaciones)

                    if (rezago) {
                        this.props.ActEstatusAgenda(Item.IdAgenda, Item.ID, Item.numcte, Estatus, Item.Motivo, Observaciones, FechaInicio, fechaFinFormulario, 65, bit_detalles, tipoAgendaCLave, IdUsuarioAsignado, idPlaza, Motivo.ID, 0);

                    } else {
                        this.props.ActEstatusAgenda(Item.IdAgenda, Item.ID, Item.numcte, Estatus, Item.Motivo, Observaciones, FechaInicio, fechaFinFormulario, Motivo.ID, bit_detalles, tipoAgendaCLave, IdUsuarioAsignado, idPlaza, null, 0);

                    }
                });
                //console.log(IdUsuarioAsignado, IdUsuarioAsignado2);
            };

            //Estatus Cancelado
            if (Estatus === "SUS") {
                let DataCita = getData(EK.Store.getState().global.catalogo$AgendaDetallesCitaResult)[0];
                FechaInicio = DataCita.FechaInicio;
                fechaFin = DataCita.FechaFin;
                //console.log(FechaInicio, fechaFin);
                if (Observaciones === null || Observaciones === undefined || Observaciones.trim() === '') {
                    global.warning('El campo de Información adicional es obligatorio', 'Atencion');
                    return;
                }

                var patt = new RegExp(/^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\'\"\:\(\)\/\¿\¡\;]+$/g);
                var res = patt.test(Observaciones);
                if (!res) {
                    global.warning('El texto ingresado contiene caracteres no validos', 'Atencion');
                    return;
                }
                EK.Global.confirm("Presione Confirmar para Pausar esta Planificación ", "Pausar Planificación", () => {
                    Reprogramar = false;
                    dispatchSuccessful('load::TipoAccionAgendaReload', 'CAN')
                    //Dispatch para Guardar en la BD

                    this.props.ActEstatusAgenda(Item.IdAgenda, Item.ID, Item.numcte, Estatus, Item.Motivo, Observaciones, FechaInicio, fechaFin, Motivo.ID, bit_detalles, tipoAgendaCLave, IdUsuarioAsignado, idPlaza, null, 0);
                });
            };
        };

        onSelectCheklist(item: any): void {
            //console.log(item)
            dispatchSuccessful("load::CheckListParameters", { uso: "FCONS", origen: "ENTVIV" });
            //Abrimos el Modal
            item = getData(EK.Store.getState().global.SelectedItemAtender);
            let modalObject: any = $("#modalCheckList");
            modalObject.modal();
            modalObject.css("height", "auto");
            // Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", item);
            //Actualizamos el Estado
            Forms.updateFormElement(SECTION_CHECKLIST, "CheckListEdit", item);
            //Cargamos Elementos del Item si tiene agregados
            //console.log(item)
            global.dispatchAsyncPost("global-page-data", "ConsultaViviendaEntregable/GetDetallesReprog/", { Uso: "FCONS" }, "CheckListResult");
            global.asyncPost("CapturaFechaConstruccion/GetProgramados/", { numcte: item.numcte, Uso: "FCONS" }, (status: AsyncActionTypeEnum, data: any[]) => {
                if (status === AsyncActionTypeEnum.successful) {
                    //Actualizamos el Estado ConfigDetProgEdit
                    Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", data);
                }
            });
        };
        footerAtencionCita(muestraBotonEntregaViviendaCliente: any, colorBoton?: any): JSX.Element {
            return <div className="modal-footer" style={{ height: '80px'}}>
                {Atendido === true && !verDetalle && muestraBotonEntregaViviendaCliente === true ? global.isLoading(this.props.agendaActualizada) ? <div style={{ position: "relative", float: "right", right: "119px" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} /></div> : <Button size={[2, 2, 2, 2]} visible={Atendido} className="btn btn-md btn-editing" style={{ backgroundColor: colorBoton ? colorBoton : ' #69b65c ', color: "#FFFFFF" }} icon="fa fa-check" onClick={() => this.onSelectBotonEstatus('ATE')} > {colorBoton === '#eb6969' ? 'Recepción con observaciones' :'Recepción de Vivienda'} </Button> : null}
                {Reprogramado === true && !verDetalle ? global.isLoading(this.props.agendaActualizada) ? <div style={{ position: "relative", float: "right", right: "119px" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} /></div> : <Button size={[6, 6, 6, 6]} visible={Reprogramado} className="btn btn-md btn-editing" style={{ backgroundColor: "#659be0", color: "#FFFFFF" }} icon="icon-loop" onClick={() => this.onSelectBotonEstatus('REP')} > Reprogramar</Button> : null}
                {Cancelado === true && !verDetalle ? global.isLoading(this.props.agendaActualizada) ? <div style={{ position: "relative", float: "right", right: "119px" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} /></div> : <Button size={[2, 2, 2, 2]} visible={Cancelado} className="btn btn-md btn-editing" style={{ backgroundColor: "#eb6969", color: "#FFFFFF" }} icon="fa fa-times-circle" onClick={() => this.onSelectBotonEstatus('SUS')} > Pausar</Button> : null}
                <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md RED" data-dismiss="modal">Cerrar</button>
            </div>
            
        };
        headerPersonalized(info: any): JSX.Element {
            if (info != undefined || info != null) {
                return <div>
                    <span >
                        <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info["titulo"]}</h6>
                    </span>
                    <span className="badge badge-info" ><i className={info["iconoAgenda"]} style={{ height: "22px", marginTop: "-17px" }}></i>  {info["nombreAgenda"]} </span>
                </div>
            } else {
                return <div></div>;
            }
        };
        footerProgramacionMasiva(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={this.onSelectAceptaUbicaciones} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Aceptar </button>
                <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        headerPersonalizedProgramacionMasiva(info: any): JSX.Element {
            if (info != undefined || info != null) {
                return <div>
                    <span >
                        <h6 className="modal-title" style={{ display: "inline-block", padding: "0px 5px" }}>{info}</h6>
                    </span>
                </div>
            } else {
                return <div></div>;
            }
        };
        onUpdateAgendaClick() {
            let entidades: any[] = global.getData(this.props.detCita, []) as any[];
            if (!(entidades && entidades.length > 0)) {
                global.warning("Para realizar este proceso debe tener definidas las ubicaciones a planificar");
                return;
            };
            //
            let tipoAgenda: any;
            let tipoAgendaSPV: any = global.getData(this.props.tipoAgendaSPV);
            let tipoAgendaCG: DataElement = global.getStateItem("global.TipoAgenda") as DataElement;
            if (tipoAgendaCG && global.isSuccessful(tipoAgendaCG)) {
                let tiposAgenda: any[] = global.getData(tipoAgendaCG, []);
                if (tiposAgenda && tiposAgenda.length > 0) {
                    let items: any[] = tiposAgenda.filter((value) => { return value.Clave === tipoAgendaSPV.TipoAgenda }) as any[];
                    if (items && items.length > 0) {
                        tipoAgenda = items[0];
                    };
                };
            };
            //
            let idTipoAgenda: number = Number(tipoAgenda.ID);
            let idUsuarioSeleccionado: any = entidades[0].num_entrega_viv;
            //
            let p: any = global.assign({
                activos: 1,
                TipoAgenda: idTipoAgenda,
                IdPlaza: "-2",
                ClaveEstado: "TODOS",
                UsuarioSeleccionado: idUsuarioSeleccionado,
                FuncionAgenda: "PostVenta",
                CalendarComplete: "SI",
                FechaInicio: new Date()
            });
            //
            global.dispatchSuccessful('load::ParametrosCalendarioFromAgenda', p);
            global.dispatchAsyncPost("load::AgendaNewCalendasUser", "base/kontrol/agendaSPV/GetBP/getAgendaDashBoard/", { parametros: p });
        };

        resetCalendarTab() {
            dispatchDefault('load::ParametrosCalendarioFromAgenda', [])
            dispatchDefault('load::AgendaNewCalendasUser', [])
        }
        LoadMotivosRecepcionDetalles() {
            let p: any = global.assign({
                Motivo: "SUS",
                Uso: 1036
            });
            dispatchAsyncPost("load::SPVMOTIVOS", "CapturaFechaConstruccion/GetMotivosRecepcionDetalle/", { parametros: p });
        }
        /**===============================
         * Encuesta Entrega
         * ==============================*/
        FooterModalConfirmacion(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={() => { }} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Contestar</button>
                <button type="button" onClick={() => { }} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Omitir</button>
            </div>;
        };
        saveObservacionNoContestoEncuesta(): void {
            let cliente = +EK.Store.getState().global.catalogo$AgendaDetallesCitaResult.data[0].numcte;
            let Observaciones = Forms.getValue("ObservacionesEncuesta", PAGE_entrega_viv_ID)
            console.log(Observaciones);
            let regex = /[a-zA-Z]/;
            if (!regex.test(Observaciones)) {
                warning("Favor de ingresar una observacion valida", "Aviso")
                return
            }
            if (Observaciones === null || Observaciones === undefined || Observaciones === "") {
                warning("Favor de ingresar una observacion valida", "Aviso")
                return
            }
            let parametros = {
                CLIENTE: cliente,
                NOQUIZOCONTESTAR: 1,
                ENCUESTACERRADA: 0,
                OBSERVACIONESNOCONTESTO: Observaciones
            }
            global.asyncPost("base/kontrol/ConfigViviendaEntregable/GetBP/EncuestaViviendaEntregable/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data === 0) {
                            success("Registro guardado", "Exito");
                            let modal: any = $("#modalObservacionesEncuesta");
                            modal.modal("hide");
                            Forms.updateFormElement(PAGE_entrega_viv_ID, "ObservacionesEncuesta", null);
                        } else {
                            warning("A ocurrido un error", "Aviso");
                            let modal: any = $("#modalObservacionesEncuesta");
                            modal.modal("hide");
                            Forms.updateFormElement(PAGE_entrega_viv_ID, "ObservacionesEncuesta", null);
                        }
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        break;
                }
            });
        }
        FooterModalObservacion(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={this.saveObservacionNoContestoEncuesta} className="btn dark btn-outline btn-md blue">Guardar</button>
            </div>;
        };
        openModal() {
            let modal = $("#modalConfirmacionEncuesta");
            modal.modal({ backdrop: 'static', keyboard: false });
        }

      
        render(): JSX.Element {

           

            let $page: any = $ml[AGENDA_ID_Entrega_Vivienda];
            let IdEstatus: any = getData(this.props.OkAgenda);
            let DetallesCita: any[] = getData(this.props.detCita);
            //console.log(DetallesCita);
            let Localidad: any = "";
            let IdLocalidad: any = "";
            let FechaInicio: any = "";
            let FechaFin: any = "";
            let NomPersonaEntregaViv: any = "";
            let colorBotonCheckList: any = "";
            let infoHeader: any;
            let infoHeaderCam: any;
            infoHeaderCam = { titulo: "Tomar  fotografiia", iconoAgenda: "fas fa-camera" };

            let procesoEjecutado: any;
            let infoEnviada: any = this.props.UbicacionesAgenda && this.props.UbicacionesAgenda.data && this.props.UbicacionesAgenda.data.length > 0 ? this.props.UbicacionesAgenda.data[0].ProcesoEjecutado : null;
            let tipoAgenda: any = Forms.getValue("TipoAgenda", 'AgendaNew');
            let conObservacion: any = Forms.getValue("Opcionales", 'DetallesCita');
            let recibeConObservacion: any = Forms.getValue("ConfirmaEntregaConObservacion", 'DetallesCita');
            let muestraBotonEntregaViviendaCliente: any;
            let UrlAplicacion: any = window.location;
            //console.log(nombreEvidencia)
            muestraBotonEntregaViviendaCliente = false;
            if ((conObservacion === "ObsClienteNO") || (conObservacion === "ObsClienteSI" && recibeConObservacion === "RecibeConObservacionSI")) {
                muestraBotonEntregaViviendaCliente = true;
            }

            if (tipoAgenda != undefined && tipoAgenda != null && tipoAgenda.Clave === "FechaConstruccion") {
                muestraBotonEntregaViviendaCliente = true;
            }

            if ((DetallesCita) && DetallesCita.length > 0) {
                NomPersonaEntregaViv = DetallesCita[0].NomPersonaEntregaViv;
                Localidad = DetallesCita[0].Localidad;
                FechaInicio = DetallesCita[0].FechaInicio;
                FechaFin = DetallesCita[0].FechaFin;
                let agendaNombre: any = "";
                let agendaClave: any = "";
                let agendaIcono: any = "";
                if (DetallesCita != undefined && DetallesCita.length > 0) {
                    agendaNombre = DetallesCita[0].TipoAgenda != undefined && DetallesCita[0].TipoAgenda.Nombre != undefined ? DetallesCita[0].TipoAgenda.Nombre : "";
                    agendaClave = DetallesCita[0].TipoAgenda != undefined && DetallesCita[0].TipoAgenda.Clave != undefined ? DetallesCita[0].TipoAgenda.Clave : "";
                    agendaIcono = DetallesCita[0].TipoAgenda != undefined && DetallesCita[0].TipoAgenda.Clave != undefined ? DetallesCita[0].TipoAgenda.Clave === "FechaConstruccion" ? " fas fa-building " : " glyphicon glyphicon-user " : "";
                }
                infoHeader = { titulo: "Información de la Planificación", nombreAgenda: agendaNombre, claveAgenda: agendaClave, iconoAgenda: agendaIcono };
            }
            else {
                NomPersonaEntregaViv = "";
                Localidad = "";
                FechaInicio = "";
                FechaFin = "";
            }

            //Botones Edicion
            let atendido: any = {
                icon: "fa fa-check",
                info: "",
                titulo: "Recepción de Vivienda",
                style: "color: #8bc780",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelectDetalleCita(item, 'ATE');
                    dispatchSuccessful('load::SelectedItemAtender', item);
                    //console.log(item);
                }
            };

            let reprogramado: any = {
                icon: "icon-loop",
                info: "",
                titulo: "Reprogramar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let p: any = global.assign({
                        Motivo: "REP",
                        Uso: item.TipoAgenda.Clave
                    });
                    dispatchSuccessful('load::REPREZ', { rezago: false });
                    dispatchAsyncPost("load::SPVMOTIVOS", "CapturaFechaConstruccion/GetMotivosReprogramacion/", { parametros: p });
                    this.onSelectDetalleCita(item, 'REP');
                    dispatchSuccessful('load::SelectedItemAtender', item);
                }
            };

            let verInformacion: any = {
                icon: "fa fa-list-alt",
                info: "",
                titulo: "Ver Información",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelectDetalleCita(item, 'VER');
                }

            };

            let cancelado: any = {
                icon: "glyphicon glyphicon-pause",
                info: "",
                titulo: "Pausar",
                color: "#df0707",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let p: any = global.assign({
                        Motivo: "SUS",
                        Uso: item.TipoAgenda.Clave
                    });
                    dispatchAsyncPost("load::SPVMOTIVOS", "CapturaFechaConstruccion/GetMotivosReprogramacion/", { parametros: p });
                    this.onSelectDetalleCita(item, 'SUS');
                }
            };

            let tituloTab: string = "";

            if (Atendido === true) {
                tituloTab = "Atención";

            } else if (Cancelado === true) {
                tituloTab = "Pausado";
            } else if (Reprogramar === true) {
                tituloTab = "Reprogramación";
            } else if (verDetalle === true) {
                tituloTab = "Visualización";
            };
            //console.log(tituloTab)


            const listHeaderUbicacionesPlanificacion: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[9, 9, 9, 9]} style={{ textAlign: "center" }} className="list-default-header bold">{"CLIENTE"}</Column>
                        <Column size={[4, 4, 4, 4]} style={{ textAlign: "left" }} className="list-default-header bold">{"FRACCIONAMIENTO"}</Column>
                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"ET"}</Column> : null} 
                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"MZ"}</Column> : null}
                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"LT"}</Column> : null}
                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{UrlAplicacion.pathname.includes("intra") ? "DPTO" : "INT"}</Column>
                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"EXT"}</Column>
                        {UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"EDIFICIO"}</Column> : null}
                        {UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"NIVEL"}</Column> : null}

                        <Column size={[2, 2, 3, 3]} style={{ textAlign: "center" }} className="list-default-header bold">{"F.FIRMA"}</Column>
                        <Column size={[4, 4, 4, 4]} style={{ textAlign: "center" }} className="list-default-header bold">{"F.CONST."}</Column>
                        <Column size={[4, 4, 4, 4]} style={{ textAlign: "center" }} className="list-default-header bold">{"P.PAGO"}</Column>
                        <Column size={[4, 4, 4, 4]} style={{ textAlign: "center" }} className="list-default-header bold">{"F.PAGADO"}</Column>
                    </Row>
                </Column>;

            let idForm: any = EK.Store.getState().forms[PAGE_entrega_viv_ID] ? EK.Store.getState().forms[PAGE_entrega_viv_ID] : null;
            let color: string = "#d26c35";
            let className: string = "";
            if (idForm === null || idForm === undefined) {

            } else {
                if (idForm.hasChanged) {
                    color = "white";
                    className = " btn-editing";
                }
            };
            //backgroundColor: (DetallesCita[0].CantidadPendientesPorReparar > 0 ? ' #eb6969 ' : ' #69b65c ')
            //let colorBotonRecepcion = '#69b65c' //DetallesCita[0].CantidadPendientesPorReparar > 0 ? ' #eb6969 ' : ' #69b65c ';
            console.log(DetallesCita)
            let colorBotonRecepcion = DetallesCita && DetallesCita.length > 0 && DetallesCita[0].CantidadPendientesPorReparar > 0 ? '#eb6969' : '#69b65c';
            colorBotonRecepcion = UrlAplicacion.pathname.includes("intra") ? colorBotonRecepcion :'#69b65c'
            return <div>
                {/*Modal Encuesta*/}
                <EncuestaEntegaVivienda />
                {/* MODAL CONFIRMACION ENCUESTA */}
                <modal.Modal id="modalConfirmacionEncuesta" header={null} footer={null} addDefaultCloseFooter={false} style={{ height: "200px", textAlign: "center" }}>
                    <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                        <Column size={[12, 12, 12, 12]}>
                            <h2>Encuesta para el cliente</h2>
                            <br />
                            <br />
                            <button type="button" onClick={() => { let modalObs = $('#modalObservacionesEncuesta'); modalObs.modal({ backdrop: 'static', keyboard: false }) }} className="btn dark btn-outline btn-md red" data-dismiss="modal">Omitir</button>
                            <button type="button" onClick={() => { let modalEnc = $('#ModalEncuestaEntregaVivienda'); modalEnc.modal({ backdrop: 'static', keyboard: false }) }} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Contestar</button>
                        </Column>
                    </Row>
                </modal.Modal>

                {/* MODAL OBSERVACIONES ENCUESTA */}
                <modal.Modal id="modalObservacionesEncuesta" header={null} footer={this.FooterModalObservacion()} addDefaultCloseFooter={false} style={{ height: "200px" }}>
                    <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                        <Column size={[12, 12, 12, 12]}>
                            <h2>Observaciones</h2>
                            <br />
                            <br />
                            <Row>
                                <TextArea id="ObservacionesEncuesta" label={"Observaciones"} idFormSection={PAGE_entrega_viv_ID} rows={2} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                            </Row>
                        </Column>
                    </Row>
                </modal.Modal>
                {/* CHECKLIST*/}
                <CheckListModal />
                {/* PROGRAMACIÓN MASIVA DE ENTREGA DE VIVIENDA  */}
                <modal.Modal id="modalAgendaEntregaVivienda" header={this.headerPersonalizedProgramacionMasiva("Programación masiva para la entrega de vivienda")} footer={this.footerProgramacionMasiva()} addDefaultCloseFooter={false} >
                    <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                        <Column size={[12, 12, 12, 12]}>
                            <Row>
                                <page.OptionSection
                                    id={PAGE_entrega_viv_ID}
                                    subTitle={"Filtro programación masiva para la entrega de vivienda"}
                                    level={2}
                                    icon="icon-folder"
                                    collapsed={false}>
                                    <SectionButtons >
                                        <Button className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelectViviendasEnt} style={{ marginRight: 5, color }} />
                                    </SectionButtons >
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} >
                                            <PlazasDDL id="PlazaInicial" size={[12, 12, 4, 4]} label="PLAZA" idFormSection={PAGE_entrega_viv_ID} validations={[validations.required()]} required={true} />
                                            <VocacionesCustomDDL id="Vocaciones" idFormSection={PAGE_entrega_viv_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                            <FraccionamientosCustomDDL id="FraccInicial" size={[12, 12, 4, 4]} idFormSection={PAGE_entrega_viv_ID} validations={[validations.required()]} />
                                            <PersonaEntregaVxFraccDDL id="PersonaEntregaV" size={[12, 12, 4, 4]} label="PERSONA ENTREGA VIV.:" idFormSection={PAGE_entrega_viv_ID} validations={[validations.required()]} required={true} />
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Row>


                        </Column>
                        <Column>
                            <div id="updating" style={{ display: 'none' }}>
                                <Updating text="" />
                            </div>
                            <div id="loading">
                                <div id="datagroupContainer" style={{ padding: '10px', marginBottom: '20px', background: '#fff' }}>
                                </div>
                            </div>
                        </Column>
                        <Column size={[12, 12, 12, 12]}>
                            <Row>
                                <OptionSection
                                    title="Información del Cliente"
                                    id={SECTION_CAPTURA_INFO}
                                    icon="fa fa-table"
                                    onSave={null}
                                    level={1}
                                    collapsed={false}>
                                    <PanelUpdate info={this.props.data}>
                                        <List
                                            items={getData(this.props.data)}
                                            readonly={false}
                                            addRemoveButton={false}
                                            dragAndDrop={false}
                                            horizontalScrolling={true}
                                            height={"300px"}
                                            listHeader={<Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center", paddingLeft: "5px", marginBottom: "-6PX", marginTop: "-41PX", width: "52PX" }} className="bold"></Column>
                                                    <Column size={[9, 9, 9, 9]} className="list-default-header bold center">{"CLIENTE"}</Column>
                                                    <Column size={[4, 4, 4, 4]} className="list-default-header bold center">{"FRACC."}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"ET"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"MZ"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"LT"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"INT"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"EXT"}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"ENT.VIV."}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center hidden-xs">{"EQUIPA."}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="list-default-header bold center">{"FINANCIA."}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"F.ESCRITURA"}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"F.CONST."}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"P.PAGO"}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"F.PAGADO"}</Column>
                                                </Row>
                                            </Column>}
                                            formatter={(index: number, item: any) => {
                                                let itemStyle: React.CSSProperties = {
                                                    paddingTop: 5,
                                                    paddingBottom: 5
                                                };
                                                return <Row style={itemStyle}  >
                                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center", marginBottom: "-22PX", marginTop: "-41PX", width: "52PX" }}> <checkBox.CheckBoxImpresion idFormSection={"FormularioViviendasMasivas"} id={"CheckSeleccion_" + item.ID} value={false} initialValue={false} change={(value) => this.onSelectCalendar(item, value)} /></Column>
                                                    <Column size={[9, 9, 9, 9]} >{item.numcte + ' - ' + item.nom_cte + ' ' + item.ap_paterno_cte + ' ' + item.ap_materno_cte}</Column>
                                                    <Column size={[4, 4, 4, 4]} >{item.id_cve_fracc + ' -  ' + item.nom_fracc}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.id_num_smza}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.id_num_mza}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.id_num_lote}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.id_num_interior}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.num_ext}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{item.NomPersonaEntregaViv}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.vale_mueble === true ? <i className="fa fa-check"></i> : <i className="fas fa-times"></i>}</Column>
                                                    <Column size={[2, 2, 2, 2]} >{item.Financiamiento}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{global.formatDateTimeDirect(item.Firma_Escritura) ? global.formatDateTimeDirect(item.Firma_Escritura) : " "}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{global.formatDateTimeDirect(item.fecha_construccion, true) ? global.formatDateTimeDirect(item.fecha_construccion, true) : " "}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{global.formatDateTimeDirect(item.fec_pendiente_pago) ? global.formatDateTimeDirect(item.fec_pendiente_pago) : " "}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{item.pago === "False" ? " " : global.formatDateTimeDirect(item.fec_pago)}</Column>
                                                </Row>
                                            }} />
                                    </PanelUpdate>
                                </OptionSection>
                            </Row>
                        </Column>
                    </Row>
                </modal.Modal>
                {/*PROGRAMACION MASIVA DE COMPROMISO DE CONSTRUCCION*/}

                <modal.Modal id="modalAgendaMasivaFechaContruccion" header={this.headerPersonalizedProgramacionMasiva("Programación masiva para fecha de construccion")} footer={this.footerProgramacionMasiva()} addDefaultCloseFooter={false} >
                    <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                        <Column size={[12, 12, 12, 12]}>
                            <Row>
                                <page.OptionSection
                                    id={PAGE_entrega_viv_ID}
                                    subTitle={"Filtro programación masiva para Fecha de validación CAT"}
                                    level={2}
                                    icon="icon-folder"
                                    collapsed={false}>
                                    <SectionButtons >
                                        <Button className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelectConstruccion} style={{ marginRight: 5, color }} />
                                    </SectionButtons >
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} >
                                            <PlazasDDL id="PlazaInicial" size={[12, 12, 4, 4]} label="PLAZA" idFormSection={PAGE_entrega_viv_ID} validations={[validations.required()]} required={true} />
                                            <VocacionesCustomDDL id="Vocaciones" idFormSection={PAGE_entrega_viv_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                            <FraccionamientosCustomDDL id="FraccInicial" size={[12, 12, 4, 4]} idFormSection={PAGE_entrega_viv_ID} validations={[validations.required()]} />
                                            <PersonaEntregaVxFraccDDL id="PersonaEntregaV" size={[12, 12, 4, 4]} label="PERSONA ENTREGA VIV.:" idFormSection={PAGE_entrega_viv_ID} validations={[validations.required()]} required={true} />
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Row>
                        </Column>
                        <Column>
                            <div id="updating2" style={{ display: 'none' }}>
                                <Updating text="" />
                            </div>
                            <div id="loading2">
                                <div id="datagroupContainer2" style={{ padding: '10px', marginBottom: '20px', background: '#fff' }}>
                                </div>
                            </div>
                        </Column>
                        {/*<Column size={[12, 12, 12, 12]}>
                            <Row>
                                <OptionSection
                                    title="Información del Cliente"
                                    id={SECTION_CAPTURA_INFO}
                                    icon="fa fa-table"
                                    onSave={null}
                                    level={1}
                                    collapsed={false}>
                                    <PanelUpdate info={this.props.data}>
                                        <List
                                            items={getData(this.props.data)}
                                            readonly={false}
                                            addRemoveButton={false}
                                            dragAndDrop={false}
                                            horizontalScrolling={true}
                                            height={"300px"}
                                            listHeader={<Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center", paddingLeft: "5px", marginBottom: "-6PX", marginTop: "-41PX", width: "52PX" }} className="bold"></Column>
                                                    <Column size={[9, 9, 9, 9]} className="list-default-header bold center">{"CLIENTE"}</Column>
                                                    <Column size={[4, 4, 4, 4]} className="list-default-header bold center">{"FRACC."}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"ET"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"MZ"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"LT"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"INT"}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"EXT"}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"ENT.VIV."}</Column>
                                                    <Column size={[1, 1, 1, 1]} className="list-default-header bold center hidden-xs">{"EQUIPA."}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="list-default-header bold center">{"FINANCIA."}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"F.ESCRITURA"}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"F.CONST."}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"P.PAGO"}</Column>
                                                    <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"F.PAGADO"}</Column>
                                                </Row>
                                            </Column>}
                                            formatter={(index: number, item: any) => {
                                                let itemStyle: React.CSSProperties = {
                                                    paddingTop: 5,
                                                    paddingBottom: 5
                                                };
                                                return <Row style={itemStyle}  >
                                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center", marginBottom: "-22PX", marginTop: "-41PX", width: "52PX" }}> <checkBox.CheckBoxImpresion idFormSection={"FormularioViviendasMasivas"} id={"CheckSeleccion_" + item.ID} value={false} initialValue={false} change={(value) => this.onSelectClienteFechaConstruccion(item, value)} /></Column>
                                                    <Column size={[9, 9, 9, 9]} >{item.numcte + ' - ' + item.nom_cte + ' ' + item.ap_paterno_cte + ' ' + item.ap_materno_cte}</Column>
                                                    <Column size={[4, 4, 4, 4]} >{item.id_cve_fracc + ' -  ' + item.nom_fracc}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.id_num_smza}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.id_num_mza}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.id_num_lote}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.id_num_interior}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.num_ext}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{item.NomPersonaEntregaViv}</Column>
                                                    <Column size={[1, 1, 1, 1]} >{item.vale_mueble === true ? <i className="fa fa-check"></i> : <i className="fas fa-times"></i>}</Column>
                                                    <Column size={[2, 2, 2, 2]} >{item.Financiamiento}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{global.formatDateTimeDirect(item.Firma_Escritura) ? global.formatDateTimeDirect(item.Firma_Escritura) : " "}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{global.formatDateTimeDirect(item.fecha_construccion, true) ? global.formatDateTimeDirect(item.fecha_construccion, true) : " "}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{global.formatDateTimeDirect(item.fec_pendiente_pago) ? global.formatDateTimeDirect(item.fec_pendiente_pago) : " "}</Column>
                                                    <Column size={[3, 3, 3, 3]} >{item.pago === "False" ? " " : global.formatDateTimeDirect(item.fec_pago)}</Column>
                                                </Row>
                                            }} />
                                    </PanelUpdate>
                                </OptionSection>
                            </Row> footer={this.footerAtencionCita(muestraBotonEntregaViviendaCliente)}
                        </Column>*/}
                    </Row>
                </modal.Modal>

                {/* ATENCIÓN DE LA CITA PLANIFICADA */}
                <modal.Modal id="modalAgendaInformacionCita" header={this.headerPersonalized(infoHeader)} addDefaultCloseFooter={false} footer={this.footerAtencionCita(muestraBotonEntregaViviendaCliente, colorBotonRecepcion)}>
                    
                       
                            <div id="main_body_infocita" style={{ overflowY: "scroll", width:'100%' }}>
                        <Row style={{ alignContent: "center" }}>
                            <Column size={[12, 12, 12, 12]} >
                                <Row>
                                    <Column size={[12, 12, 12, 12]}>
                                        <Label idFormSection={DETALLES_CITA} value={NomPersonaEntregaViv} label={"Entrega Vivienda:"} size={[12, 12, 6, 6]} />
                                        <Label idFormSection={DETALLES_CITA} value={global.formatDateTimeDirect(FechaInicio, true)} label={"Fecha Inicio:"} size={[12, 6, 3, 3]} />
                                        <Label idFormSection={DETALLES_CITA} value={global.formatDateTimeDirect(FechaFin, true)} label={"Fecha Fin:"} size={[12, 6, 3, 3]} />
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                        <br />
                        <Row>
                            <Column size={[12, 12, 12, 6]}>
                                <Column size={[12, 12, 12, 12]}>
                                    <OptionSection
                                        title="Detalles Cliente"
                                        id={DETALLES_CITA}
                                        icon="fa fa-table"
                                        onSave={null}
                                        level={2}
                                        collapsed={false}>
                                        <PanelUpdate info={this.props.detCita}>
                                            <List
                                                items={getData(this.props.detCita)}
                                                readonly={false}
                                                addRemoveButton={false}
                                                dragAndDrop={false}
                                                height={"150px"}
                                                horizontalScrolling={true}
                                                listHeader={listHeaderUbicacionesPlanificacion}
                                                formatter={(index: number, item: any) => {
                                                    //console.log(this.props.entity,this.props.entityType)
                                                    let itemStyle: React.CSSProperties = {
                                                        paddingTop: 5,
                                                        paddingBottom: 5
                                                    };
                                                    return <Row>
                                                        <Column size={[9, 9, 9, 9]} className="listItem-default-header listItem-overflow"><span className="badge badge-info bold">{item.numcte}</span> - {item.nom_cte + ' ' + item.ap_paterno_cte + ' ' + item.ap_materno_cte}</Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-header listItem-overflow"><span className="badge badge-info bold">{item.id_cve_fracc}</span> - {item.nom_fracc}</Column>
                                                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} className="listItem-default-header listItem-overflow">{item.id_num_smza}</Column> : null}
                                                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} className="listItem-default-header listItem-overflow">{item.id_num_mza}</Column> : null}
                                                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} className="listItem-default-header listItem-overflow">{item.id_num_lote}</Column> : null}
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-header listItem-overflow">{item.id_num_interior}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-header listItem-overflow">{item.num_ext}</Column>
                                                        {UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="listItem-default-header listItem-overflow">{item.edificio}</Column> : null}
                                                        {UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="listItem-default-header listItem-overflow">{item.nivel}</Column> : null}

                                                        <Column size={[3, 3, 3, 3]} className="listItem-default-header listItem-overflow">{global.formatDateTimeDirect(item.Firma_Escritura)}</Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-header listItem-overflow">{global.formatDateTimeDirect(item.fecha_construccion, true)}</Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-header listItem-overflow">{global.formatDateTimeDirect(item.fec_pendiente_pago)}</Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-header listItem-overflow">{global.formatDateTimeDirect(item.fec_pago)}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-header listItem-overflow" style={{ /*paddingTop: "5px", paddingBottom: "5px",*/ paddingLeft: "0px", paddingRight: "0px", width: "20px", overflow: "unset", position: "sticky", right: 0, zIndex: 20, backgroundColor: "white" }}>
                                                            {(() => {
                                                                switch (item.EstatusAgenda.Clave) {
                                                                    case "ACT": // ACTIVA
                                                                        if (infoEnviada != undefined && infoEnviada != null && infoEnviada === "REPROGRAMACION") {
                                                                            return <buttons.PopOver idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[reprogramado]} style={{ marginLeft: "-16px" }} />;
                                                                        } else {
                                                                            if (item.TipoAgenda && item.TipoAgenda.Clave === "FechaConstruccion") {
                                                                                return <buttons.PopOver idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[atendido, reprogramado]} style={{ marginLeft: "-16px" }} />;
                                                                            } else {
                                                                                return <buttons.PopOver idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[atendido, reprogramado, cancelado]} style={{ marginLeft: "-16px" }} />;
                                                                            }
                                                                        }
                                                                    case "SUS": // SUSPENDIDA
                                                                        return <buttons.PopOver idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[reprogramado]} style={{ marginLeft: "-16px" }} />;
                                                                    case "ATE": // ATENDIDA
                                                                        return <buttons.PopOver idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[verInformacion]} style={{ marginLeft: "-16px" }} />;
                                                                    case "REP": // REPROGRAMADA
                                                                        return <buttons.PopOver idParent={config.id} idForm={DETALLES_CITA} info={item} extraData={[verInformacion]} style={{ marginLeft: "-16px" }} />;
                                                                    default:
                                                                        return null
                                                                }
                                                            })()}
                                                        </Column>
                                                    </Row>
                                                }} />
                                        </PanelUpdate>
                                    </OptionSection>
                                </Column>
                            </Column>
                            {itemFiltrado === true ?
                                <Column size={[12, 12, 12, 6]}>
                                    <div className="tabbable-line">
                                        <ul className="nav nav-tabs">
                                            <li className="active">
                                                <a href="#tab_posventa_action" data-toggle="tab" aria-expanded="true">{tituloTab}</a>
                                            </li>
                                            {Reprogramar === true ?
                                                <li className="" onClick={this.resetCalendarTab.bind(this)}>
                                                    <a href="#tab_posventa_calendar" data-toggle="tab" aria-expanded="false"> Calendario </a>
                                                </li>
                                                : null}
                                        </ul>
                                        <div className="tab-content" style={{ padding: 0 }}>
                                            <div className="tab-pane active" id="tab_posventa_action">
                                                {DetallesCita.length > 0 && DetallesCita[0].TipoAgenda.Clave === "FechaConstruccion" ?
                                                    <Row style={{ marginLeft: "15px", marginRight: "15px", textAlign: "right" }}>
                                                        <Button id={"BotonCheckList"} size={[2, 2, 2, 2]} className="btn btn-editing " icon="fa fa-pencil-square-o" style={{ marginTop: "15px", backgroundColor: (DetallesCita[0].CantidadPendientesPorReparar > 0 ? ' #eb6969 ' : ' #69b65c '), color: "#FFFFFF" }} onClick={() => this.onSelectCheklist(DetallesCita[0])}> CheckList 1</Button>
                                                    </Row> : null
                                                }
                                                {verDetalle === true ?
                                                    <label.Label id="EstatusAgenda" label="Estatus" idForm={DETALLES_CITA} value={(value: any) => {
                                                        return (value === undefined || value === null) ? "" : "<span class='badge bold badge-success'>" + value.Nombre + "</span>"
                                                    }} isHTML={true} size={[12, 12, 12, 12]} /> : null
                                                }
                                                {DetallesCita.length > 0 && DetallesCita[0].TipoAgenda.Clave === "EntregaVivienda" && Atendido === true ?
                                                    verDetalle === true ?
                                                        <div style={{ marginTop: "15px", fontSize: "11px", marginBottom: "40px" }}>
                                                            <label.Boolean id="TieneObservacionCliente" idForm={DETALLES_CITA} label={"Con Observación del Cliente"} size={[12, 12, 12, 12]} />
                                                        </div> :
                                                        <div style={{ marginTop: "15px", fontSize: "11px", marginBottom: "40px" }}>
                                                            <EK.UX.RadioButton$Form
                                                                id={RADIO_OBSCTE_SI}
                                                                idFormSection={DETALLES_CITA}
                                                                label={"Con Observación del Cliente"}
                                                                value={"SI"}
                                                                groupName={"Opcionales"}
                                                                onChangeEvent={() => this.GetIncidenciasEntregaCliente(DetallesCita[0].numcte)}
                                                                size={[12, 12, 12, 12]} />

                                                            {DetallesCita.length > 0 && DetallesCita[0].TipoAgenda.Clave === "EntregaVivienda" && Atendido === true && conObservacion === "ObsClienteSI" ?

                                                                <Row>
                                                                    <div style={{ marginTop: "0px", fontSize: "11px", marginBottom: "40px", marginLeft: "40px" }}>
                                                                        <EK.UX.RadioButton$Form
                                                                            id={RADIO_RECIBE_CON_OBSCTE_SI}
                                                                            idFormSection={DETALLES_CITA}
                                                                            label={"Si Recibió"}
                                                                            value={"SI"}
                                                                            groupName={"ConfirmaEntregaConObservacion"}
                                                                            onChangeEvent={() => this.LoadMotivosRecepcionDetalles()}
                                                                            size={[12, 12, 12, 12]} />
                                                                        <EK.UX.RadioButton$Form
                                                                            id={RADIO_RECIBE_CON_OBSCTE_NO}
                                                                            idFormSection={DETALLES_CITA}
                                                                            label={"No Recibió"}
                                                                            value={"NO"}
                                                                            groupName={"ConfirmaEntregaConObservacion"}

                                                                            size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    <br /><br />

                                                                    <div id="formIncidencias" style={{ display: 'none' }}>
                                                                        <SPVTiposComponentesConsulta idFormSection={DETALLES_INCIDENCIA_CITA} tipovivienda={DetallesCita[0].clave_tipo_vivienda} usoFalla={"Ubicacion"} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                                                                        <SPVComponentesConsultaAgendaSpv idFormSection={DETALLES_INCIDENCIA_CITA} tipoVivienda={DetallesCita[0].clave_tipo_vivienda} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                                                                        <ddl.SPVUbicacionesFallasDDL id="UbicacionFalla" idFormSection={DETALLES_INCIDENCIA_CITA} size={[12, 12, 6, 6]} required={true} validations={[validations.required(), validations.custom("", "", [""], ddl.ddlValidate)]} />
                                                                        <SPVContratistasConsulta idPlaza={DetallesCita[0].id_identificador !== undefined ? DetallesCita[0].id_identificador : null} idFormSection={DETALLES_INCIDENCIA_CITA} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                                                                        <input.Text id="Observaciones" label="Observaciones" size={[12, 12, 12, 12]} maxLength={250} rowspan={250} idFormSection={DETALLES_INCIDENCIA_CITA} required={false} />
                                                                        
                                                                        <Row>
                                                                            <Column size={[12, 12, 5, 5]}>
                                                                                <checkBox.CheckBox id="atendidoMomento" label="Se atendio en el momento" idFormSection={DETALLES_INCIDENCIA_CITA} size={[12, 12, 12, 12]} />

                                                                            </Column>
                                                                            <Column size={[12, 12, 7, 7]}>
                                                                                <div style={{ paddingTop: "10px", width: '55%', paddingLeft: '5px', marginLeft: '5px', display: 'inline-block' }}>
                                                                                    <button style={{ marginTop: "5px", background: 'transparent', color: '#3498db' }} onClick={() => this.openAndSetBound()}><i className="fas fa-camera white-text fa-2x" /></button>
                                                                                    <button style={{ marginTop: "5px", background: 'transparent', color: '#34495e', marginLeft: "10px" }} onClick={() => this.openSelectFileDialog()}><i className="fas fa-paperclip white-text fa-2x" /> </button>
                                                                                    <input type="file" style={{ display: 'none' }} id="singleFileInput" onChange={(e) => this.changeFileSelected(e)} />
                                                                                </div>
                                                                                <div id="nom_evidencia" style={{ width: '90%', paddingTop: '5px', paddingLeft: '10px', fontWeight: 600, display: 'inline-block' }}>
                                                                                    Ninguna evidencia seleccionada...    <span> <i className="fas fa-times fa-2x" /> </span>
                                                                                </div>
                                                                                <div id="del_evidencia" style={{ width: '10%', paddingTop: '5px', paddingRight: '10px', fontWeight: 600, display: 'none' }}>
                                                                                    <span onClick={() => this.quitarEvidencia()}> <i className="fas fa-times fa-2x" /> </span>
                                                                                </div>
                                                                            </Column>
                                                                        </Row>
                                                                        <div style={{ marginTop: "20px", fontSize: "11px", marginBottom: "60px", marginLeft: "0px" }}>
                                                                            <EK.UX.RadioButton$Form
                                                                                id={RADIO_CONTRATISTA}
                                                                                idFormSection={DETALLES_INCIDENCIA_CITA}
                                                                                label={"Contratista"}
                                                                                value={null}
                                                                                groupName={"TipoContProv"}
                                                                                //onChangeEvent={() => this.LoadMotivosRecepcionDetalles()}
                                                                                size={[12, 12, 3, 3]} />
                                                                            <EK.UX.RadioButton$Form
                                                                                id={RADIO_PROVEEDOR}
                                                                                idFormSection={DETALLES_INCIDENCIA_CITA}
                                                                                label={"Proveedor"}
                                                                                value={null}
                                                                                groupName={"TipoContProv"}

                                                                                size={[12, 12, 9, 9]} />
                                                                        </div>
                                                                        <Row>
                                                                            <button style={{ marginTop: "10px", padding: "5px", marginBottom: "5px", marginLeft: "15px", background: "#48dbfb", width:'45%' }} onClick={() => this.onAddNewIncidencia()}><i className="fas fa-check" /> Agregar</button>
                                                                            <button style={{ marginTop: "10px", padding: "5px", marginBottom: "5px", marginLeft: "15px", background: "#e74c3c", width: '45%'}} onClick={() => this.onCancelNewIncidencia()}><i className="fas fa-times" /> Cancelar</button>

                                                                        </Row>
                                                                    </div>
                                                                    <br />
                                                                   
                                                                    <Row id="gridIncidencias" style={{ display: 'block' }}>
                                                                        <Column size={[12, 12, 12, 12]}>
                                                                            <Column size={[11, 11, 11, 11]}>
                                                                                <page.dxGridTable style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} title={"Lista de incidencias"} id={'inc_id_grid'} />
                                                                            </Column>
                                                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: 'left', padding: '0px', margin: '0px', width: '20px', color: "#fff" }}>
                                                                                <button style={{ background: '#3498db' }} onClick={() => this.showFormNewIncidencias()}><i className="fas fa-plus white-text" /> </button>

                                                                                {/*<button style={{ background: '#1abc9c', marginTop: '5px' }} onClick={() => this.saveAllIncidenciasUbicacion()}><i className="fas fa-save white-text" /> </button>*/}

                                                                            </Column>
                                                                        </Column>
                                                                        <Column  size={[12,12,12,12]}>
                                                                            <button id="btn_save_inc" style={{ display:'none', fontSize: '12px', marginTop: '5px', padding:'5px', marginLeft:'10px' }} className="btn-income-data" onClick={() => this.saveAllIncidenciasUbicacion()}>
                                                                                <i className="fas fa-save white-text" /> Guardar observaciones
                                                                            </button>
                                                                        </Column>
                                                                    </Row>
                                                                    <hr />
                                                                </Row>
                                                                : null
                                                            }



                                                            <EK.UX.RadioButton$Form
                                                                id={RADIO_OBSCTE_NO}
                                                                idFormSection={DETALLES_CITA}
                                                                label={"Sin Observación del Cliente"}
                                                                value={"NO"}
                                                                groupName={"Opcionales"}
                                                                size={[12, 12, 12, 12]} />
                                                        </div> : null
                                                }

                                                {Reprogramar === true || Cancelado === true ?
                                                    verDetalle === true ?
                                                        <label.Entidad id="Motivo" idForm={DETALLES_CITA} label="Motivo" size={[12, 12, 12, 12]} /> :
                                                        <MotivosreprogDDL id="Motivo" idFormSection={DETALLES_CITA} label="Motivo" size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} /> : null
                                                }
                                                {Reprogramar === true ?
                                                    verDetalle === true ?
                                                        <label.FechaHora id="FechaInicio" idForm={DETALLES_CITA} label="FECHA INICIO" value={(item: any, entidad: any) => {
                                                            return global.formatDateTimeDirect(item, true);
                                                        }} size={[12, 12, 6, 6]} /> :
                                                        <DatePicker id="FechaInicio" daysOfWeekDisabled={[0]} label="FECHA INICIO" minuteStep={15} startDays={this.getStartDays()} hoursDisabled={[0, 1, 2, 3, 4, 5, 6, 21, 22, 23, 24]} type="datetime" idFormSection={DETALLES_CITA} value={global.getObtenerFecha()} size={[12, 12, 12, 6]} validations={[validations.required()]} required={true} /> : null
                                                }
                                                {Reprogramar === true ?
                                                    verDetalle === true ?
                                                        <label.Entidad id="HoraFIN" idForm={DETALLES_CITA} label="HORA FIN" size={[12, 12, 6, 6]} /> :
                                                        <SPVHorariosAtencionDDL id="HoraFIN" idFormSection={DETALLES_CITA} validations={[validations.required()]} size={[12, 12, 12, 6]} /> : null
                                                }

                                                {verDetalle === true ?
                                                    <label.Label id="Observaciones" idForm={DETALLES_CITA} label="Información Adicional" size={[12, 12, 12, 12]} /> :
                                                    (conObservacion === "ObsClienteSI" && recibeConObservacion === "RecibeConObservacionNO") ?
                                                        <Row>
                                                            <Button size={[12, 12, 12, 12]} className="btn btn-md btn-editing" style={{ backgroundColor: "#659be0", color: "#FFFFFF", marginLeft: "85px", marginTop: "0px" }} icon="icon-loop" onClick={() => this.onAccesoDirectoReprogramacion()} > Reprogramar</Button>

                                                        </Row> :
                                                        <Row>
                                                            {conObservacion === "ObsClienteSI" && recibeConObservacion === "RecibeConObservacionSI" ?
                                                                //<MotivosreprogDDL id="Motivo" idFormSection={DETALLES_CITA} label="Motivo" size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                null :
                                                                null
                                                            }
                                                            <div>
                                                                {
                                                                    UrlAplicacion.pathname.includes("intra") && DetallesCita[0].CantidadPendientesPorReparar > 0 ?
                                                                        <input.Text id="NombreResidente" label="Nombre de residente" style={{ marginBottom: '10px' }} size={[12, 12, 12, 12]} maxLength={250} rowspan={250} idFormSection={DETALLES_CITA} required={false} /> : null
                                                                }

                                                                <input.Text id="Observaciones" label="Información Adicional" size={[12, 12, 12, 12]} maxLength={250} rowspan={250} idFormSection={DETALLES_CITA} required={false} />

                                                            </div>
                                                            
                                                        </Row>
                                                }
                                                <Column size={[12, 12, 12, 12]} style={{ marginTop: "10px" }} >
                                                    {this.props.entity && global.getDataID(this.props.entity) > 0 ?
                                                        (conObservacion === "ObsClienteSI" && recibeConObservacion === "RecibeConObservacionNO") ? null :
                                                            <KontrolFileManager modulo="SPV" entityType={this.props.entityType} tipo="anexos" entity={this.props.entity} viewMode={verDetalle} multiple={true} size={[12, 12, 12, 12]} />
                                                        : null
                                                    }
                                                </Column>
                                            </div>
                                            <div className="tab-pane" id="tab_posventa_calendar">
                                                <Row style={{ marginLeft: "15px", marginRight: "15px", textAlign: "right" }}>
                                                    <Button size={[4, 4, 4, 4]} className="btn btn-md btn-editing" style={{ backgroundColor: '#8ad48c', color: "#FFFFFF", marginTop: "15px" }} icon="fas fa-sync-alt" onClick={this.onUpdateAgendaClick.bind(this)}> Actualizar Calendario 3 </Button>
                                                </Row>
                                                <Row style={{ marginLeft: "10px", marginRight: "10px", height: "340px", overflow: "overlay" }}>
                                                    <calendar.GlobalAgendaNew id="AgendaNewCalendar" idForm={DETALLES_CITA} applyValuesControl="FechaInicio" minTime="07:00:00" maxTime="20:00:00" />
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Column> :
                                <Column size={[12, 12, 12, 6]}>
                                    <alerts.Alert type={alerts.AlertTypeEnum.info}>
                                        <p style={{ fontSize: 12 }}> Seleccione un detalle para visualizar la información. </p>
                                    </alerts.Alert>
                                </Column>
                            }
                        </Row>
                            </div>  
                       
                   
                </modal.Modal>
                <modal.Modal id="modalCameraOpened" camController={Quagga}  header={this.headerPersonalized(infoHeaderCam)} addDefaultCloseFooter={false}>
                    <div id="canvas_live" style={{ display: 'none', position: 'relative', width: '90%',margin:'auto', background: '#bdc3c7', textAlign: 'center' }}>
                    </div>
                    <div id="camera_buttons" style={{ textAlign: 'center', position:'relative' }}>
                        <div style={{ position:'absolute',left:100, padding: '3px'}} >
                            <button id="btn_cancel" style={{ color: '#fff', background: '#34495e', width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px' }} onClick={() => this.onCloseModalCamera()}>
                                <i className="fas fa-arrow-left white-text fa-4x" />
                            </button>
                        </div>
                        <div style={{ position: 'absolute', right: 100, padding: '3px' }} >
                            <button id="btn_shot" style={{ color: '#fff', background: '#ff5e57', width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px' }} onClick={() => this.takePhoto()}>
                                <i className="fas fa-record-vinyl white-text fa-4x" />
                            </button>
                        </div>
                       
                    </div>

                    <div id="canvas_snapshot" style={{ display: 'none', position: 'relative', width: '90%', margin:'auto', background: '#95a5a6', textAlign: 'center' }}>
                        <img id="img_snapshot" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div id="snapshot_buttons" style={{ display: 'none', textAlign: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 100, padding: '3px' }} >
                            <button id="btn_decline" style={{ color: '#fff', background: '#c0392b', width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px' }} onClick={() => this.verifyPhoto(false, DetallesCita[0])}>
                                <i className="fas fa-times white-text fa-3x" />
                            </button>
                        </div>
                        <div style={{ position: 'absolute', right: 100, padding: '3px' }} >
                            <button id="btn_ok" style={{ color: '#fff', background: '#2ecc71', width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px' }} onClick={() => this.verifyPhoto(true, DetallesCita[0])}>
                                <i className="fas fa-check white-text fa-3x" />
                            </button>
                        </div>
                    </div>
                 </modal.Modal>

                <div style={{ marginTop: "-20px" }}>
                    <OptionSection
                        title="Ubicaciones para Agendar"
                        id={SECTION_CONCEPTO_ID}
                        icon="fa fa-table"
                        level={1}
                        collapsed={false}
                        onSave={null}>
                        <SectionView onAddNew={(this.props.forma === undefined || this.props.forma != 'Individual') && tipoAgenda && tipoAgenda.Clave && tipoAgenda.Clave === 'EntregaVivienda' || (this.props.forma === undefined || this.props.forma != 'Individual') && tipoAgenda && tipoAgenda.Clave && tipoAgenda.Clave === 'FechaConstruccion' ? this.onAddNew : null}>
                            <List
                                items={getData(this.props.UbicacionesAgenda)}
                                readonly={false}
                                horizontalScrolling={true}
                                height={"344px"}
                                drawOddLine={true}
                                addRemoveButton={false}
                                listHeader={<Column size={[12, 12, 12, 12]} className="fixheaderlist">
                                    <Row>
                                        <Column size={[9, 9, 9, 9]} className="list-default-header bold center">{"CLIENTE"}</Column>
                                        <Column size={[4, 4, 4, 4]} className="list-default-header bold center">{"FRACC."}</Column>
                                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"ET"}</Column> : null}
                                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"MZ"}</Column> : null}
                                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"LT"}</Column> : null}
                                        <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{UrlAplicacion.pathname.includes("intra") ? "DPTO" : "INT"}</Column>
                                        <Column size={[1, 1, 1, 1]} className="list-default-header bold center">{"EXT"}</Column>
                                        {UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} className="list-default-header bold center">{"EDIFICIO"}</Column> : null}
                                        {UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} className="list-default-header bold center">{"NIVEL"}</Column> : null}

                                        <Column size={[3, 3, 3, 3]} className="list-default-header bold center">{"ENT.VIV."}</Column>
                                        <Column size={[4, 4, 4, 4]} className="list-default-header bold center">{"FEC. CONST."}</Column>
                                        <Column size={[1, 1, 1, 1]} className="list-default-header bold center hidden-xs">{"EQUIPA."}</Column>
                                        <Column size={[1, 1, 1, 1]} className="list-default-header bold center">&nbsp;</Column>
                                    </Row>
                                </Column>}
                                formatter={(index55: number, item: any) => {
                                    let drawOddLine: any;
                                    drawOddLine = "#f9f9f9";
                                    if ((index55 % 2) == 0) {
                                        drawOddLine = "white";
                                    } 
                                    return <Row id={"row_concepto4_" + index55}  >
                                        <Column size={[9, 9, 9, 9]} className="listItem-default-header listItem-overflow" >{item.numcte + ' - ' + item.nom_cte + ' ' + item.ap_paterno_cte + ' ' + item.ap_materno_cte}</Column>
                                        <Column size={[4, 4, 4, 4]} className="listItem-default-header listItem-overflow" >{item.id_cve_fracc + ' -  ' + item.nom_fracc}</Column>
                                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[1, 1, 1, 1]} className="listItem-default-header listItem-overflow" >{item.id_num_smza}</Column> : null}
                                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[1, 1, 1, 1]} className="listItem-default-header listItem-overflow" >{item.id_num_mza}</Column> : null}
                                        {!UrlAplicacion.pathname.includes("intra") ? <Column size={[1, 1, 1, 1]} className="listItem-default-header listItem-overflow" >{item.id_num_lote}</Column> : null}
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-header listItem-overflow" >{item.id_num_interior}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-header listItem-overflow" >{item.num_ext}</Column>
                                        {UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="listItem-default-header center listItem-overflow">{item.edificio}</Column> : null}
                                        {UrlAplicacion.pathname.includes("intra") ? <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="listItem-default-header center listItem-overflow">{item.nivel}</Column> : null}

                                        <Column size={[3, 3, 3, 3]} className="listItem-default-header listItem-overflow" >{item.Personaentregavivienda}</Column>
                                        <Column size={[4, 4, 4, 4]} className="listItem-default-header listItem-overflow" >{global.formatDateTimeDirect(item.fecha_construccion, true)}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-header listItem-overflow" >{item.vale_mueble === true ? <i className="fa fa-check"></i> : <i className="fas fa-times"></i>}</Column>

                                        {!this.props.forma || this.props.forma != "Individual" ?
                                            <Column size={[1, 1, 1, 1]} className="listItem-default-header " style={{ position: "sticky", right: 0, zIndex: 0, backgroundColor: drawOddLine }} >
                                                <Button size={[1, 1, 1, 1]} className="btn-ico-ek btn-xs btn  default red" style={{ fontSize: "5px", borderTopLeftRadius: "50px", borderTopRightRadius: "50px", borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px" }} icon="fas fa-times" onClick={this.onSelectEliminamosUbicaciones} info={item}></Button>
                                            </Column> : null
                                        }
                                    </Row>;
                                }} />
                        </SectionView >
                        <SectionEdit
                            idForm={SECTION_CAPTURA_INFO}
                            onCancel={this.onClickCancel}
                            onSave={null}>
                            <Column size={[12, 12, 12, 12]}>
                                <Row>
                                    <OptionSection
                                        title="Detalles Reprogramación"
                                        id={SECTION_CAPTURA_INFO}
                                        icon="fa fa-table"
                                        onSave={null}
                                        level={2}
                                        collapsed={false}>
                                        <PanelUpdate info={this.props.UbicacionesAgenda}>
                                            <List
                                                items={getData(this.props.UbicacionesAgenda)}
                                                readonly={false}
                                                addRemoveButton={false}
                                                dragAndDrop={false}
                                                listHeader={<div>
                                                    <Row>
                                                        <Column>
                                                            <Column size={[10, 10, 10, 10]} style={{ textAlign: "center" }} className="list-default-header bold">{"DETALLES"}</Column>
                                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"AGREGAR"}</Column>
                                                        </Column>
                                                    </Row>
                                                </div>}
                                                formatter={(index11: number, item: any) => {
                                                    return <Row style={{ textAlign: "left" }} id={"row_concepto_3232" + index11} className="panel-collapsed" >
                                                        <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                            <Row>
                                                                <Column size={[10, 10, 10, 10]} className="listItem-left-header hidden-xs bold">
                                                                    <i className="fa fa-circle"></i>{item.detalle}
                                                                </Column>
                                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header hidden-xs">
                                                                    <Button className="btn  default btn-default-ek" onClick={null} info={item} icon="fa fa-plus-square"></Button>
                                                                </Column>
                                                            </Row>
                                                        </Column>
                                                    </Row>
                                                }} />
                                        </PanelUpdate>
                                    </OptionSection>
                                </Row>
                            </Column>
                        </SectionEdit>
                    </OptionSection>
                </div>
            </div>
        }
    });
    //
    const vocacionesMapProps: any = (state: any): any => {
        var retValue: any = page.props(state);
        retValue.items = state.global.VOCACIONESSPV;
        retValue.plazaSeleccionada = Forms.getDataValue("PlazaInicial", PAGE_entrega_viv_ID, state);
        return retValue;
    };

    const fraccionamientosMapProps: any = (state: any): any => {
        var retValue: any = page.props(state);
        retValue.items = state.global.DDLFRACCIONAMIENTOS;
        retValue.vocacionSeleccionada = Forms.getDataValue("Vocaciones", PAGE_entrega_viv_ID, state);
        retValue.plazaSeleccionada = Forms.getDataValue("PlazaInicial", PAGE_entrega_viv_ID, state);
        return retValue;
    };

    const VocacionesCustomDDL: any = ReactRedux.connect(vocacionesMapProps, null)(ddl.VocacionesSPV$DDL);
    const FraccionamientosCustomDDL: any = ReactRedux.connect(fraccionamientosMapProps, null)(ddl.Fraccionamientos$DDL);
};

import AgendaEntregaViviendaPV = EK.Modules.SCV.Pages.postventa.RUBA.AgendaEntregaVivienda