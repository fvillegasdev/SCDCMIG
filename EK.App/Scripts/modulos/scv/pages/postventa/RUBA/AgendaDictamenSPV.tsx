namespace EK.Modules.SCV.Pages.postventa.RUBA.AgendaDictamen {
    const PAGE_ID: string = "AgendaDictamen";
    const PAGE_CONTRATISTA_ID: string = "AgendaDictamenPV";
    const SECTION_CAPTURA_INFO: string = "CapturaInfo";
    const SECTION_CONCEPTO_ID: string = "AgendaSPV";
    const DETALLES_CITA: string = "DetallesCita";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "kontrol", []);

    export const resetAgenda: () => void = (): void => {
        global.dispatchSuccessful("global-page-data", [], "AgendaPostVentaResult");
        global.dispatchSuccessful("global-page-data", [], "DictamenesAgendaEdit");
        global.dispatchSuccessful("global-page-data", [], SECTION_CONCEPTO_ID);
        global.dispatchSuccessful("load::ACTDETALLEAGENDA", null);

        Forms.updateFormElement(SECTION_CAPTURA_INFO, "DictamenesAgendaEdit", []);
        Forms.remove("FormularioViviendasMasivas");
    };

    const listHeaderDictamen: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">#Diagnóstico</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Descripción"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Responsable"}</Column>
            </Row>
        </Column>

    interface IAgendaDictamenProps extends page.IProps {
        agendaActualizada?: any;
        agendaState?: DataElement;
        checkListGuardado?: any;
        dictamenAgenda?: any;
        detCita?: any;
        entityType: any;
        entity: any;
        fechaInicio?: any;
      //  fechaInicioReserva?: any;
        forma?: any;
        plaza?: any;
        saveAgenda?: (item: any) => void;
        tipoAgenda?: any;
    };

    export const AgendaDictamen: any = global.connect(class extends React.Component<IAgendaDictamenProps, IAgendaDictamenProps> {
        constructor(props: IAgendaDictamenProps) {
            super(props);
            this.onClose = this.onClose.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.data = state.global.catalogo$AgendaPostVentaResult;
            retValue.dictamenAgenda = Forms.getDataValue("DictamenesAgendaEdit", SECTION_CAPTURA_INFO, state);
            retValue.plaza = Forms.getValue("PlazaInicial", PAGE_CONTRATISTA_ID, state);
            retValue.detCita = state.global.catalogo$AgendaDetallesCitaResult;
            retValue.agendaActualizada = state.global.ACTDETALLEAGENDA;
            retValue.tipoAgenda = Forms.getValue("TipoAgenda", "AgendaNew");
            retValue.agendaState = state.global.state$AgendaContratista;
            retValue.fechaInicio = state.forms.DetallesCita === undefined || state.forms.DetallesCita === null || state.forms.DetallesCita.form.FechaInicio === undefined || state.forms.DetallesCita.form.FechaInicio === null ? null : state.forms.DetallesCita.form.FechaInicio;
          //  retValue.fechaInicioReserva = Forms.getValue("FechaInicio", PAGE_ORDEN_TRABAJO_RESERVA_ID);
            return retValue;
        };
        refs: {
            modal: Element;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            saveAgenda: (item: any): void => {
                global.warning("Espere un momento, procesando información");
                global.dispatchAsyncPut("load::ACTDETALLEAGENDA", "base/kontrol/AgendaSPV/Get/SaveDetProgContratista", item, "ActDetalleAgenda");
            }
        });
        componentDidMount(): void {
            agendaContratistaPV.resetAgenda();

            //let state: AgendaState = new AgendaState();
            //state.reprogramacion = false;
            //state.atendido = false;
            //state.reprogramado = false;
            //state.cancelado = false;
            //state.detallar = false;
            //state.filtrado = false;
            //state.action = "";

           // this.props.config.setState(state, PAGE_ID);
            this.props.config.setCatalogo([], PAGE_CONTRATISTA_ID);
        };
        componentWillUnmount(): void {
            agendaContratistaPV.resetAgenda();
        };
        componentWillUpdate(nextProps: IAgendaDictamenProps, nextState: IAgendaDictamenProps): void {
            if (hasChanged(this.props.detCita, nextProps.detCita)) {
                if (global.isSuccessful(nextProps.detCita)) {
                    Forms.reset("DetallesCita");
                    Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", null);
                }
            }
        };
        componentWillReceiveProps(nextProps: IAgendaDictamenProps, nextState: IAgendaDictamenProps): void {
            if (hasChanged(nextProps.agendaActualizada, this.props.agendaActualizada) && global.isSuccessful(nextProps.agendaActualizada)) {
                //aqui deberia hacer el render de las otras citas y regargar la agenda del usuario o administrador
                let item: any = getData(nextProps.agendaActualizada);
                switch (item.Estado) {
                    case 5: // eliminado con exito
                        success("Planificación Actualizada Correctamente!");
                        this.onClose();
                        break;
                    default: break;
                }
            };

            if (hasChanged(this.props.tipoAgenda, nextProps.tipoAgenda)) {
                Forms.updateFormElement(SECTION_CAPTURA_INFO, "DictamenesAgendaEdit", []);
            };
        };
        nuevoHorario(idForm: string): void {
            var fechaHoraInicio = new Date(Forms.getValue("FechaInicio", idForm));
            var horarioCompleto: any = getData(EK.Store.getState().global.HorarioAtencion);

            fechaHoraInicio.setHours(fechaHoraInicio.getHours() + 1);

            var horas: any = fechaHoraInicio.getHours();
            var minutos: any = fechaHoraInicio.getMinutes();
            var horaPropuesta: any = ("00" + horas).slice(-2) + ':' + ("00" + minutos).slice(-2)
            horarioCompleto.forEach((item:any) => {
                if (item.Clave === horaPropuesta) {
                    Forms.updateFormElement(idForm, "HoraFIN", item);
                };
            });
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
        onClose(): void {
            Forms.reset("DetallesCita");
            Forms.updateFormElement(SECTION_CAPTURA_INFO, "DetalleCteAgendaEdit", null);
        

            let ModalObj2: any = $("#modalAgendaInformacionCita");
            ModalObj2.modal("hide");
        };
   
        headerPersonalized(info: any): JSX.Element {
            if (info != undefined || info != null) {
                return <div>
                    <span >
                        <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info["titulo"]}</h6>
                    </span>
                    <span className="badge badge-info" ><i className={info["iconoAgenda"]} style={{ height: "22px", marginTop: "-17px" }}></i>  {info["nombreAgenda"]} </span>
                    <span><span className="badge badge-success">{info["ContratistaID"]}</span>&nbsp;{info["ContratistaNombre"]}</span>
                </div>
            } else {
                return <div></div>;
            }
        };

        onSave(config: page.IPageConfig): void {
            let item: DataElement = config.getEntity(SECTION_CONCEPTO_ID);
            let entidad: any = global.getData(item);

            let retValue: DataElement = this.props.dictamenAgenda;
            if (!retValue) {
                retValue = global.createSuccessfulStoreObject([]);
            };
            //
            let items: any[] = global.getData(retValue, []);
            if (items && items.length > 0) {
                for (let i = 0; i < items.length; i++) {
                    let value: any = global.assign({}, items[i]);
                    if (value.IdOrdenTrabajo === entidad.IdOrdenTrabajo) {
                        let _item: any = global.assign({}, value);
                        retValue = retValue.upsertItem(_item);
                        break;
                    };
                };
            };
            //
            if (retValue && global.isSuccessful(retValue)) {
                Forms.updateFormElement(SECTION_CAPTURA_INFO, "DictamenesAgendaEdit", retValue.data);
            };
            //
            config.setState({ viewMode: true }, SECTION_CONCEPTO_ID);
        };
        onAddNew(): void {
            let modalAgenda: any = $("#modalAgendaEntregaVivienda");
            modalAgenda.modal();
            modalAgenda.css("height", "auto");
        };
        render(): JSX.Element {
            let $page: any = $ml[config.id];
            let DetallesCita: any[] = getData(this.props.detCita);
            let fechaInicio: Date;
            let fechaFin: Date;
            let infoHeader: any;
            let tipoAgenda: any = Forms.getValue("TipoAgenda", "AgendaNew");

            if ((DetallesCita) && DetallesCita.length > 0) {
                let detalleCita: any = DetallesCita[0];
                if (detalleCita && detalleCita.OrdenTrabajo) {
                    fechaInicio = detalleCita.OrdenTrabajo.Agenda.FechaInicio as Date;
                    fechaFin = detalleCita.OrdenTrabajo.Agenda.FechaInicio as Date;
                    infoHeader = { titulo: "Información de la Planificación", nombreAgenda: detalleCita.OrdenTrabajo.Agenda.TipoAgenda.Nombre, claveAgenda: detalleCita.OrdenTrabajo.Agenda.TipoAgenda.Icono, ContratistaID: detalleCita.OrdenTrabajo.Contratista.ID, ContratistaNombre: detalleCita.OrdenTrabajo.Contratista.Nombre };
                };
            };
            //
            if (!fechaInicio) {
                fechaInicio = global.getToday(true);
            };
            //        
            if (!fechaFin) {
                fechaFin = global.getToday(true);
            };
    
            return <div>
                <OptionSection
                    title="Diagnósticos"
                    id={SECTION_CONCEPTO_ID}
                    icon="fa fa-table"
                    level={1}
                    collapsed={false}
                    onAddNew={null}
                    onSave={null}>
                        <List
                            items={getData(this.props.dictamenAgenda)}
                            readonly={true}
                            horizontalScrolling={true}
                            height={"300px"}
                            drawOddLine={true}
                            addRemoveButton={false}
                            listHeader={listHeaderDictamen}
                            formatter={(index: number, item: any) => {
                                let drawOddLine: any;
                                drawOddLine = "#f9f9f9";

                                if ((index % 2) == 0) {
                                    drawOddLine = "white";
                                };
                                let itemStyle: React.CSSProperties = {
                                    paddingTop: 5,
                                    paddingBottom: 5
                                };
                                return <Row id={"row_dictamen_" + index}  >
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span className="badge badge-info bold">{item.Dictamen && item.Dictamen.Partida ? item.Dictamen.Partida.Partida : ""}</span></Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span className="badge badge-success bold">{item.ID > 0 ? item.ID : ""}</span></Column>
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.Dictamen ? item.Dictamen.Descripcion : "" }</Column>
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.Dictamen === undefined || item.Dictamen.ResponsableDictamen === undefined || item.Dictamen.ResponsableDictamen.ID === undefined || item.Dictamen.ResponsableDictamen.ID === null ? "" : item.Dictamen.ResponsableDictamen.Nombre}</Column>
                                </Row>;
                            }} />
                  </OptionSection>
            </div>
        }
    });
};

import agendaDictamenPV = EK.Modules.SCV.Pages.postventa.RUBA.AgendaDictamen;