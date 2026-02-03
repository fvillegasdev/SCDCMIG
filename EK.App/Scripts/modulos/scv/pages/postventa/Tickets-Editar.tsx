namespace EK.Modules.SCV.Pages.postventa.Tickets {
    "use strict";

    const PAGE_ID: string = "Tickets";
    const REPORTE_UBICACION_ID: string = "ticket$ubicacion";
    const REPORTE_UBICACION_CONTRATISTAS_ID: string = "ticket$ubicacion$contratistas";
    const REPORTE_INFORMACION_ID: string = "ticket$informacion";
    const TICKET_EXPENDIENTE_UBICACION_ID: string = "ticket$Expediente$Ubicacion";
    const REPORTE_CONTACTO_ID: string = "ticket$contacto";
    const TICKET_INCIDENCIAS_ID: string = "ticket$incidencias";
    const REPORTE_CLIENTE_ETAPA: string = "ticket$cliente$etapa";
    const REPORTE_PARTIDA: string = "ticket$partida";
    const REPORTE_ORDEN_TRABAJO_ID: string = "ticket$ordenTrabajo";
    const REPORTE_ORDEN_TRABAJO_PARTIDAS_ID: string = "ticket$ordenTrabajo$partidas";
    const REPORTE_ORDEN_TRABAJO_CALCULO_PARTIDAS_ID: string = "ticket$ordenTrabajo$partidasCalculo";
    const REPORTE_CONTRATISTAS_ID: string = "ticket$contratistas";
    const INCIDENCIA_DICTAMENES_ID: string = "ticket$dictamenes";
    const SECCION_UBICACION_SELECCIONADO: string = PAGE_ID + "$ubicacionSeleccionada";
    //const MODAL_UBICACION_ID: string = "modal$ubicacion$visible";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [TICKET_EXPENDIENTE_UBICACION_ID, REPORTE_UBICACION_ID, REPORTE_INFORMACION_ID, REPORTE_UBICACION_CONTRATISTAS_ID, TICKET_INCIDENCIAS_ID, REPORTE_CONTACTO_ID, REPORTE_CLIENTE_ETAPA, REPORTE_PARTIDA, REPORTE_ORDEN_TRABAJO_ID, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, INCIDENCIA_DICTAMENES_ID, REPORTE_CONTRATISTAS_ID]);


    const listHeaderOrdenTrabajo: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">#OT</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Inicio Estimado Trabajo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Final Estimado Trabajo"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Planificación"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>


    const listHeaderContratistas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo Contratista"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Tipo Contrato"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">{"Default"}</Column>
            </Row>
        </Column>

    const listHeaderFallas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"No. Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Dictámenes"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo de Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Componente"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Origen Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Reincidencias"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Cliente"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">{"Garantía (días)"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Término Garantía"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fecha Cerrado"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Procede"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderContacto: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Contacto"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Tipo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Titular"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderExpedienteUbicacion: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[3, 3, 3, 5]} className="list-default-header">{"Exp."}/{"Ubicación"}</Column>
                <Column size={[3, 3, 3, 4]} className="list-default-header">{"FechaEntrega"}</Column>
                <Column size={[3, 3, 3, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderDictamenes: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Descripción"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Creado"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Creado por"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderOrdenTrabajoPartidas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo de componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>




    class ViewState {
        public allowCancel: boolean;
        public allowNew: boolean;
        public allowSave: boolean;
        public allowDelete: boolean;
        public allowPrint: boolean;
        public allowRevise: boolean;
        public allowUpdate: boolean;
        public viewMode: boolean;

        constructor(state?: any) {
            if (state) {
                this.allowCancel = state.allowCancel;
                this.allowNew = state.allowNew;
                this.allowSave = state.allowSave;
                this.allowDelete = state.allowDelete;
                this.allowPrint = state.allowPrint;
                this.allowRevise = state.allowRevise;
                this.allowUpdate = state.allowUpdate;
                this.viewMode = state.viewMode;
            }
        };
    };

    var BGCEstatusDictamen: any = {
        "I": "#36c6d3",
        "A": "#41c300",
        "N": "#ed6b75"
    };

    export class ColumnDictamenes extends React.Component<any, any>{
        render(): JSX.Element {
            let items: any[] = global.getData(new DataElement(this.props.items).getActiveItems(), []);
            if (items) {
                let activos: number = items.filter((value) => { return value.EstatusDictamen.Clave === "I" }).length;
                let aprobados: number = items.filter((value) => { return value.EstatusDictamen.Clave === "A" }).length;
                let rechazados: number = items.filter((value) => { return value.EstatusDictamen.Clave === "N" }).length;

                return <Column size={this.props.size} className="listItem-center-header">
                    <span className="badge badge-roundless" style={{ backgroundColor: BGCEstatusDictamen["I"] }}>{activos}</span>&nbsp;
                    <span className="badge badge-roundless" style={{ backgroundColor: BGCEstatusDictamen["A"] }}>{aprobados}</span>&nbsp;
                    <span className="badge badge-roundless" style={{ backgroundColor: BGCEstatusDictamen["N"] }}>{rechazados}</span>
                </Column>
            };

            return null;
        };
    };

    const printOT: any = {
        icon: "fa fa-print",
        titulo: "Imprimir OT",
        action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
            //if ((item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda && item.AgendaDetalle.EstatusAgenda.ID) != null) {
            let win = window.open("scv/tickets/imprimirOT/" + item.ID, "_blank");
            //} else {
            //    global.warning("No se puede Imprimir la OT, porque no está Planificada la cita para el contratista.");
            //    return;
            //}
        }
    };

    class Edicion$ extends React.Component<page.IProps, page.IProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSave(props: page.IProps, item: any): any {
            let contacto: any[] = global.getData(Forms.getValue(REPORTE_CONTACTO_ID, config.id), []);
            let contactoIsValid: boolean = true;

            contacto.forEach((value: any) => {
                if (!value.Contacto) {
                    contactoIsValid = false;
                }
            });

            if (!contactoIsValid) {
                warning("Se agregaron contactos del cliente con datos incorrectos. Por favor verifique la información e intente de nuevo.");
                return null;
            };

            let incidencias: any[] = global.getData(Forms.getValue(TICKET_INCIDENCIAS_ID, config.id), []);
            let partidasIdValid: boolean = true;

            incidencias.forEach((value: any) => {
                if (value._eliminado !== true) {
                    if (!(value.Componente && value.Componente.ID) ||
                        //!(value.UbicacionFalla && value.UbicacionFalla.IdUbicacionFalla) ||
                        !(value.Contratista && value.Contratista.ID)) {
                        partidasIdValid = false;
                    }
                }
            });

            if (!partidasIdValid) {
                warning("Una o más partidas no fueron capturadas correctamente. Por favor verifique la información e intente de nuevo.");
                return null;
            };

            //let ubicacion: any = EK.Store.getState().forms.Tickets.form.Ubicacion.value;
            //let expediente: any = EK.Store.getState().forms.Tickets.form.ExpedienteUbicacion.value;
            let expedienteUbicacion: any;
            let ubicacion: any;
            if (item.ExpedienteUbicacion != undefined) {
                expedienteUbicacion = item.ExpedienteUbicacion;
            }
            else {
                expedienteUbicacion = EK.Store.getState().global.Tickets$ubicacionSeleccionada.data

            }
            //


            ubicacion = expedienteUbicacion.Ubicacion;
            let model: any = item
                .addID()
                .addObject("Cliente")
                //.addObject("Prereporte")
                .addObjectConst("Ubicacion", ubicacion)
                .addNumberConst("IdUbicacion", ubicacion.ID)
                .addObjectConst("ExpedienteUbicacion", expedienteUbicacion)
                .addNumberConst("IdExpedienteUbicacion", expedienteUbicacion.ID)
                .addNumberConst("IdVentaUbicacion", expedienteUbicacion.IdVentaUbicacion)
                .addNumberConst("IdResponsableConstruccion", item.ResponsableConstruccion.ID)
                .addNumberConst("IdContratistaResponsable", expedienteUbicacion.IdContratista)

                .addObject("ResponsableConstruccion")
                .addObject("SupervisorContratista")
                .addObject("MedioSolicitud")
                .addString("ObservacionesCliente")
                .addString("ObservacionesContratista")
                .addObject("Contactos", REPORTE_CONTACTO_ID)
                .addObject("Incidencias", TICKET_INCIDENCIAS_ID)
                .addObject("OrdenesTrabajo", REPORTE_ORDEN_TRABAJO_ID)
                .addVersion()
                .toObject();

            return model;
        };
        onFilter(props: any, filters: any, type?: string): void { };

        onEntityLoaded(props: page.IProps): void {
            let entidad: any = global.getData(props.entidad);
            let isNew: boolean = global.getDataID(props.entidad) <= 0;


            if (isNew === true) {
                global.dispatchSuccessful("global-page-entity", {}, REPORTE_UBICACION_ID);
                global.dispatchSuccessful("global-page-entity", {}, REPORTE_INFORMACION_ID);
                global.dispatchSuccessful("global-page-data", [], REPORTE_UBICACION_CONTRATISTAS_ID);
                global.dispatchSuccessful("global-page-data", [], REPORTE_CONTACTO_ID);
                global.dispatchSuccessful("global-page-data", [], TICKET_INCIDENCIAS_ID);
                global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_ID);
                global.dispatchSuccessful("global-page-data", [], TICKET_EXPENDIENTE_UBICACION_ID);

                global.dispatchSuccessful("global-page-data", [], SECCION_UBICACION_SELECCIONADO);


                entidad.IdEstatusTicket = "N";
                entidad.EstatusTicket = { Clave: "N", Nombre: "NUEVO" };
                entidad.IdEstatusRevisado = "N";
                entidad.Revisado = false;
                entidad.FechaCaptura = global.getToday();

                props.config.setEntity(entidad);
            } else {

                var valores = [];
                valores.push(entidad.ResponsableConstruccion);

                //global.dispatchSuccessful("global-page-entity", entidad.Ubicacion, REPORTE_UBICACION_ID);
                global.dispatchSuccessful("global-page-data", valores, REPORTE_UBICACION_CONTRATISTAS_ID);
                global.dispatchSuccessful("global-page-data", entidad.Contactos, REPORTE_CONTACTO_ID);

                global.dispatchSuccessful("global-page-data", entidad.Incidencias, TICKET_INCIDENCIAS_ID);
                global.dispatchSuccessful("global-page-data", entidad.OrdenesTrabajo, REPORTE_ORDEN_TRABAJO_ID);
                global.dispatchSuccessful("global-page-data", entidad.ExpedienteUbicacion, TICKET_EXPENDIENTE_UBICACION_ID);
                global.dispatchSuccessful("global-page-data", entidad.ExpedienteUbicacion.Ubicacion, SECCION_UBICACION_SELECCIONADO);


                //Forms.updateFormElement(config.id, REPORTE_UBICACION_ID, entidad.Ubicacion);
                Forms.updateFormElement(REPORTE_UBICACION_ID, "Cliente", entidad.Cliente);
                Forms.updateFormElement(REPORTE_UBICACION_ID, "Expediente", entidad.IdExpediente);
                Forms.updateFormElement(REPORTE_UBICACION_ID, "Ubicacion", entidad.Ubicacion.ClaveCorta);
                Forms.updateFormElement(REPORTE_UBICACION_ID, "Calle", entidad.Ubicacion.Calle);
                //Forms.updateFormElement(REPORTE_UBICACION_ID, "Plaza", item.Ubicacion.Plaza.Nombre);
                Forms.updateFormElement(REPORTE_UBICACION_ID, "Prototipo", entidad.Ubicacion.Prototipo.Nombre);

                ///tiene que llenar los datos

                //let encodedFilters: string = global.encodeObject({ idPrototipo: entidad.Ubicacion.IdPrototipo });
                //global.dispatchAsync("global-page-data", "base/svc/Tickets/GetBP/getUbicacionesComponente/" + encodedFilters, "ubicaciones$componentes");



            };

            let state: ViewState = new ViewState();

            if (entidad.IdEstatusReporte === "N" || entidad.IdEstatusReporte === "M") {
                state.allowNew = true;
                state.allowDelete = false;
                state.allowRevise = true;
            } else {
                state.allowNew = false;
                state.allowDelete = false;
                state.allowRevise = false;

            };



            if (entidad.IdEstatusRevisado === "S") {
                props.config.clearCatalogo(null, REPORTE_CONTRATISTAS_ID);
            };

            //if (entidad.IdEstatusReporte !== "T") {
            //    state.allowSave = true;
            //} else {
            //    state.allowSave = false;
            //};

            if (isNew === true) {
                state.allowRevise = false;
            };

            let fechaCaptura: Date = new Date(entidad.FechaCaptura);
            let horasTrascurridas: number = global.getDateDiff(fechaCaptura, global.getToday(), "hours");
            //if (horasTrascurridas <= 24) {
            state.allowUpdate = true;
            //};

            props.config.setState(state);





        };
        render(): JSX.Element {

            let ml: any = config.getML();


            let state: ViewState = new ViewState(global.getData(this.props.state));
            let isNew: boolean = global.getDataID(this.props.entidad) <= 0;



            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowDelete={state.allowDelete}
                allowNew={state.allowNew}
                allowEdit={state.allowSave}
                allowSave={state.allowSave}
                onSave={this.onSave.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                onFilter={this.onFilter.bind(this)}
                >
                {
                    <PageButtons>

                        <RevisarButton />
                        <ReportesButton />
                    </PageButtons>
                }

                <View />
                <Edit />

            </page.Main>
        };
    };
    export const Edicion: any = ReactRedux.connect(Edicion$.props, null)(Edicion$);

    interface IViewProps extends page.IProps {
        ubicacion?: global.DataElement;
    };

    let View: any = global.connect(class extends React.Component<IViewProps, IViewProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.ubicacion = state.global.entity$ticket$ubicacion;
            return retValue;
        };
        render(): JSX.Element {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            let entidad: any = global.getData(this.props.entidad);
            let contratistas: any = this.props.config.getCatalogo(REPORTE_UBICACION_CONTRATISTAS_ID);
            let ubicacion: any = global.getData(this.props.ubicacion);
            let displayAntiguo: boolean = false;
            let badgeAntiguo: string = "badge badge-info";
            //let supervisionExterna: number = undefined;
            let fechaEntrega: string = "";


            //if (entidad) {
            //    if (entidad.Cliente && entidad.Cliente.Antiguedad > 5) {
            //        displayAntiguo = true;
            //        badgeAntiguo = "badge badge-danger";
            //    }
            //};

            //if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {
            //    let plaza: any = global.getData(this.props.ubicacion).Plaza;
            //    supervisionExterna = plaza ? plaza.ValidarResponsablePlaza : 0;
            //};

            let labelGarantia: any = (value: any) => {
                return (value === undefined || value === null) ? "" : value > 0 ? "<span class='badge bold' style='background-color: rgb(65, 195, 0);'>" + value + "</span>" : "<span class='badge badge-danger bold'>" + value + "</span>"
            };

            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";

                if (state.allowUpdate === true) {
                    className = "fas fa-unlock";
                };

                return global.formatDate(value) + " <span class='pull-right'><i class='" + className + "' style='color:#1A237E;'></i></span>";
            };





            if (entidad.Ubicacion != undefined) {
                fechaEntrega = global.formatDateTimeDirect(entidad.Ubicacion.FechaEntrega, true);
            }


            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={<span>
                            <span>Ticket</span>
                            {entidad.IdPrereporte > 0 ? <span> <span className="badge  pull-right" style={{ backgroundColor: "#4cd964" }} >{entidad.IdPrereporte}</span>
                                <i className="fas fa-mobile-alt  pull-right" style={{ fontSize: "14px" }}></i>&nbsp;</span>
                                : null}
                            <span className="badge badge-danger bold pull-right">{entidad.ID <= 0 ? "nuevo" : entidad.ID}</span>
                            <span className="pull-right bold">Folio:&nbsp;</span>
                        </span>}
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Entidad id="Cliente" size={[4, 4, 4, 4]} value={(item: any) => {
                                return !item ? "" : (!item.Clave ? "" : "<span class='" + badgeAntiguo + "'>" + item.Clave + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                            } } />
                            <label.Fecha id="FechaReporte" value={labelFechaCaptura} isHTML={true} size={[2, 2, 2, 2]} />

                            <label.Fecha id="FechaEntrega" value={fechaEntrega} size={[2, 2, 2, 2]} />
                            <label.Label id="DiasTranscurridos" size={[2, 2, 2, 2]} />
                            <label.Entidad id="EstatusTicket" size={[2, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <Column size={[4, 4, 4, 4]} style={{ paddingTop: 10 }}>
                                {<ViewUbicacionCliente />
                                }
                            </Column>
                            <Column size={[8, 8, 8, 8]} style={{ paddingTop: 10 }}>
                                <page.OptionSection
                                    id={REPORTE_INFORMACION_ID}
                                    parent={config.id}
                                    level={1}
                                    icon="fa fa-info-circle" collapsed={false}>
                                    <Row>
                                        <label.Label id="DiasSolucion" size={[12, 12, 3, 3]} />
                                        <label.Label id="DiasContratista" size={[12, 12, 3, 3]} />
                                        <label.Entidad id="ResponsableConstruccion" size={[12, 12, 6, 6]} />
                                    </Row>
                                    <Row>
                                        <label.Fecha id="FechaPosibleSolucion" size={[12, 12, 3, 3]} />
                                        <label.Fecha id="FechaContratistaInicial" size={[12, 12, 3, 3]} />
                                        <label.Entidad id="MedioSolicitud" size={[12, 12, 6, 6]} />
                                    </Row>
                                    <Row>
                                        <label.Fecha id="FechaSolucionTerminacion" size={[12, 12, 3, 3]} />
                                        <label.Fecha id="FechaContratistaFinal" size={[12, 12, 3, 3]} />
                                        {/*supervisionExterna === 1 ? <label.Entidad id="SupervisorContratista" size={[12, 12, 6, 6]} /> : null */}
                                    </Row>
                                    <Row>
                                        <label.Label id="ObservacionesCliente" size={[12, 12, 6, 6]} />
                                        <label.Label id="ObservacionesContratista" size={[12, 12, 6, 6]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>

                        </Row>
                        <Row>
                            <Column size={[12, 12, 8, 8]}>
                                <page.OptionSection
                                    id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                    parent={config.id}
                                    icon="fa fa-users"
                                    level={1} collapsed={false}
                                    subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                                        {[global.getData(contratistas, []).length].join("")}
                                    </span>}>
                                    <PanelUpdate info={contratistas}>
                                        <List
                                            id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                            items={contratistas}
                                            readonly={true}
                                            listHeader={listHeaderContratistas}
                                            formatter={(index: number, item: any) => {
                                                return <Row style={{ margin: 0 }}>
                                                    <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                                                    {/*
                                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span className="badge badge-info">{item.TipoContratista.Descripcion}</span></Column>
                                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item">{item.Contratista && item.Contratista.TipoContrato ? <span className="badge badge-info">{item.Contratista.TipoContrato.Nombre}</span> : null}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-center-header">{EK.UX.Labels.yes(item.ContratistaDefault === "S")}</Column>
                                                    */}
                                                </Row>
                                            } } />
                                    </PanelUpdate>
                                </page.OptionSection>
                            </Column>

                            <ViewSPVClienteContactos size={[12, 12, 12, 4]} />
                        </Row>
                        <Row>
                            <page.SectionList
                                id={TICKET_INCIDENCIAS_ID}
                                parent={config.id}
                                icon="fas fa-cogs"
                                level={1}
                                listHeader={listHeaderFallas}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                horizontalScrolling={true}
                                selectable={true}
                                drawOddLine={true}
                                items={createSuccessfulStoreObject([])}
                                formatter={(index: number, item: any) => {
                                    let bgColor: string;

                                    if (item.PartidaAutorizada === "R" || item.Procede === "N" || item.ProcedeBool === false) {
                                        bgColor = "#FFA07A";
                                    };

                                    return <Row className="list-selectable-item" style={{ backgroundColor: bgColor }}>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Incidencia}</span></Column>
                                        <ColumnDictamenes size={[1, 1, 1, 1]} items={item.Dictamenes} />
                                        <Column size={[12, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Componente.TipoComponente) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Componente.TipoComponente.ID}</span>{item.Componente.TipoComponente.Nombre}</span>}</Column>
                                        <Column size={[12, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Componente) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Componente.ID}</span>{item.Componente.Descripcion}</span>}</Column>
                                        <Column size={[12, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.UbicacionComponente) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionComponente.ID}</span>{item.UbicacionComponente.Nombre}</span>}</Column>
                                        <Column size={[12, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Nombre}</span>}</Column>
                                        <Column size={[12, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!item.CausaIncidencia ? item.CausaIncidencia.Descripcion : null}</Column>
                                        <Column size={[12, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!item.CausaIncidencia ? item.CausaIncidencia.OrigenIncidencia.Descripcion : null}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                            <a id={"a_reincidencias_" + index}>
                                                <span className="badge badge-warning bold">{item.Reincidencias}</span>
                                                <SPVReincidenciasConsulta target={"a_reincidencias_" + index} item={item} idFormSection={TICKET_INCIDENCIAS_ID} />
                                            </a>
                                        </Column>
                                        <Column size={[12, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesCliente}</Column>
                                        <Column size={[12, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesContratista}</Column>
                                        <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow">{item.DiasGarantia}</Column>

                                        <Column size={[12, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.FechaTerminoGarantia)}</Column>
                                        <Column size={[12, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.FechaCierre)}</Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-header">{EK.UX.Labels.yes(item.ProcedeBool === true)}</Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">{!(item && item.EstatusIncidencia) ? null : <span className="badge badge-info">{item.EstatusIncidencia.Nombre}</span>}</Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">&nbsp;</Column>
                                    </Row>
                                } }>
                            </page.SectionList>
                        </Row>
                        <Row>
                            <page.SectionList
                                id={REPORTE_ORDEN_TRABAJO_ID}
                                parent={config.id}
                                icon="fa fa-briefcase"
                                level={1}
                                listHeader={listHeaderOrdenTrabajo}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                allowNew={false}
                                items={createSuccessfulStoreObject([])}
                                formatter={(index: number, item: any) => {
                                    let detalle: global.DataElement = global.createSuccessfulStoreObject(item.Incidencias);
                                    let extraData: any[] = [];

                                    if (item.EstatusOrdenTrabajo.Clave !== "T") {
                                        extraData.push(printOT);
                                    };



                                    return <Row id={"row_orden_trabajo_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                            <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                    <CollapseButton idElement={"row_orden_trabajo_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.ID > 0 ? <span className="badge badge-info">{item.ID}</span> : "&nbsp;"}</Column>
                                                <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaInicio)}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaFin)}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave] }}></i>}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info">{item.EstatusOrdenTrabajo.Nombre}</span></Column>
                                                {extraData.length > 0 ? < buttons.PopOver idParent={config.id} idForm={REPORTE_ORDEN_TRABAJO_ID} info={item} extraData={extraData} /> : null}
                                            </Row>
                                        </Column>
                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <List
                                                    items={detalle}
                                                    readonly={true}
                                                    listHeader={listHeaderOrdenTrabajoPartidas}
                                                    addRemoveButton={false}
                                                    formatter={(_index: number, _item: any): any => {
                                                        return <Row>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Incidencia.ID}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Incidencia.Componente.TipoComponente.ID}</span>{_item.Incidencia.Componente.TipoComponente.Nombre}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Incidencia.Componente.ID}</span>{_item.Incidencia.Componente.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Incidencia.UbicacionComponente.ID}</span>{_item.Incidencia.UbicacionComponente.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{!(_item.Incidencia.CausaIncidencia) ? "" : _item.Incidencia.CausaIncidencia.ID}</span>{!(_item.Incidencia.CausaIncidencia) ? "" : _item.Incidencia.CausaIncidencia.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{!(_item.Incidencia.CausaIncidencia.OrigenIncidencia) ? "" : _item.Incidencia.CausaIncidencia.OrigenIncidencia.ID}</span>{!(_item.Incidencia.CausaIncidencia.OrigenIncidencia) ? "" : _item.Incidencia.CausaIncidencia.OrigenIncidencia.Descripcion}</Column>
                                                        </Row>
                                                    } } />
                                            </Column>
                                        </Row>
                                    </Row>
                                } }>
                            </page.SectionList>
                        </Row>


                    </page.OptionSection>
                </Column>
            </page.View>
        }
    });

    interface IEditProps extends page.IProps {
        //obtenerLote?: (idUbicacion: number) => void;
        obtenerExpedientes?: (idCliente: number) => void;
        obtenerContratistas?: (idUbicacion: number) => void;
        obtenerContacto?: (idCliente: number) => void;
        //obtenerEtapa?: (idCliente: number, fechaReporte: Date) => void;
        calcularPartida?: (partida: any, reporte: any) => void;
        cliente?: global.DataElement;
        ubicacionSeleccionada?: any;
        ubicacion?: global.DataElement;
        //etapa?: global.DataElement;
        contratistas?: global.DataElement;
        contacto?: global.DataElement;
        componente?: any;
        partida?: global.DataElement;
        slotState?: global.DataElement;
        slotsMoverContacto?: any;
        slotsMoverIncidencias?: any;
        slotsMoverOT?: any;
    };

    let Edit: any = global.connect(class extends React.Component<IEditProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.cliente = Forms.getDataValue("Cliente", config.id, state);
            if (EK.Store.getState().global.Tickets$ubicacionSeleccionada !== undefined) {
                retValue.ubicacionSeleccionada = EK.Store.getState().global.Tickets$ubicacionSeleccionada.data;
                retValue.ubicacion = EK.Store.getState().global.Tickets$ubicacionSeleccionada.data;

            }

            //retValue.etapa = state.global.entity$reporte$cliente$etapa;
            retValue.contratistas = state.global.catalogo$ticket$ubicacion$contratistas;
            retValue.contacto = state.global.catalogo$reporte$contacto;
            retValue.componente = Forms.getValue("Componente", TICKET_INCIDENCIAS_ID, state);
            retValue.partida = state.global.entity$ticket$partida;
            retValue.slotState = state.global.state$ticket$incidencias;
            retValue.slotsMoverContacto = state.global.state$reporte$contacto;
            retValue.slotsMoverOT = state.global.state$ticket$ordenTrabajo;
            retValue.slotsMoverIncidencias = state.global.state$ticket$incidencias;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerLote: (idUbicacion: number): void => {
                //let encodedFilters: string = global.encodeObject({ id: idUbicacion });
                //global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, REPORTE_UBICACION_ID);
            },
            obtenerEtapa: (idCliente: number, fechaReporte: Date): void => {
                //let encodedFilters: string = global.encodeObject({ idCliente, fechaReporte: fechaReporte.toISOString() });
                //global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetClienteEtapa/" + encodedFilters, REPORTE_CLIENTE_ETAPA);
            },
            obtenerExpedientes: (idCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente });
                global.dispatchAsync("global-page-data", "base/svc/Tickets/GetBP/getExpedienteUbicaciones/" + encodedFilters, TICKET_EXPENDIENTE_UBICACION_ID);

            },
            obtenerContratistas: (idUbicacion: number): void => {
                //let url: string = global.encodeAllURL("scv", "ContratistasUbicaciones", { idUbicacion });
                //global.dispatchAsync("global-page-data", url, REPORTE_UBICACION_CONTRATISTAS_ID);
                let encodedFilters: string = global.encodeObject({ idUbicacion });
                global.dispatchAsync("global-page-data", "base/scv/Tickets/GetBP/GetContratistasByUbicacion/" + encodedFilters, REPORTE_UBICACION_CONTRATISTAS_ID);



            },
            obtenerContacto: (idCliente: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente });
                global.dispatchAsync("global-page-data", "base/scv/Tickets/GetBP/GetContactoCliente/" + encodedFilters, REPORTE_CONTACTO_ID);
            },
            calcularPartida: (partida: any, reporte: any): void => {
                //global.dispatchAsyncPost("global-page-entity", "base/scv/Tickets/GetBP/CalcularPartida/", { partida, reporte }, REPORTE_PARTIDA);
                global.dispatchAsyncPost("global-page-entity", "scv/tickets/calcularPartida/", { partida, reporte }, REPORTE_PARTIDA);
            }
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            //if (hasChanged(this.props.etapa, nextProps.etapa)) {
            //    if (isSuccessful(nextProps.etapa)) {
            //        //Forms.updateFormElement(config.id, "FechaEntregaVivienda", global.getData(nextProps.etapa).FechaLiberacion);
            //        //Forms.updateFormElement(config.id, "MesesTranscurridos", global.getData(nextProps.etapa).MesesTranscurridos);
            //    }
            //};



            if (hasChanged(this.props.partida, nextProps.partida)) {
                if (isSuccessful(nextProps.partida)) {
                    Forms.updateFormElements(TICKET_INCIDENCIAS_ID, global.getData(nextProps.partida));
                }
            };
            if (hasChanged(this.props.cliente, nextProps.cliente) && global.getDataID(this.props.cliente) !== global.getDataID(nextProps.cliente)) {
                if (isSuccessful(nextProps.cliente)) {
                    let cliente: any = global.getData(nextProps.cliente);
                    this.props.obtenerExpedientes(cliente.ID);


                    //global.dispatchSuccessful("global-page-data", true, MODAL_UBICACION_ID);

                    let modalQuery: any = $("#ExpedienteUbicacionModal");
                    modalQuery.modal();

                    //OHSS obetner modal
                    this.props.obtenerContacto(cliente.ID);

                    //if (global.getDataID(nextProps.entidad) <= 0) {
                    //    if (cliente && cliente.Antiguedad > 5) {
                    //        global.dispatchSuccessful("global-page-data", [], REPORTE_FALLAS_ID);
                    //        global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_ID);
                    //    };
                    //    //
                    //    this.props.obtenerEtapa(cliente.ID, global.getToday());
                    //    //
                    //    Forms.updateFormElement(config.id, "SupervisorContratista", undefined);
                    //};
                };

            };
            if (global.hasChanged(this.props.ubicacionSeleccionada, nextProps.ubicacionSeleccionada)) {



                let items: any = EK.Store.getState().global["catalogo$" + TICKET_EXPENDIENTE_UBICACION_ID];



                if (items !== undefined) {
                    if (nextProps.ubicacionSeleccionada.IdUbicacion > 0) {
                        this.props.obtenerContratistas(nextProps.ubicacionSeleccionada.IdUbicacion);
                        EK.Global.dispatchSuccessful("global-page-data", items.data, TICKET_EXPENDIENTE_UBICACION_ID);
                        Forms.updateFormElement(config.id, "FechaEntrega", nextProps.ubicacionSeleccionada.Ubicacion.FechaEntrega);
                        Forms.updateFormElement(config.id, "MesesTranscurridos", global.getData(nextProps.ubicacionSeleccionada).MesesTranscurridos);
                    }
                }
            };
            if (hasChanged(this.props.slotsMoverContacto, nextProps.slotsMoverContacto)) {
                if (getData(nextProps.slotsMoverContacto).viewMode === false) {
                    let target = $("#reporteContacto");
                    if (target.length) {
                        $('html, body').animate({ scrollTop: target.offset().top - 150 }, 500, 'swing');
                    }
                }
            }
            if (hasChanged(this.props.slotsMoverIncidencias, nextProps.slotsMoverIncidencias)) {
                if (getData(nextProps.slotsMoverIncidencias).viewMode === false) {
                    let target = $("#reporteIncidencias");
                    if (target.length) {
                        $('html, body').animate({ scrollTop: target.offset().top - 150 }, 500, 'swing');
                    }
                }
            }
            if (hasChanged(this.props.slotsMoverOT, nextProps.slotsMoverOT)) {
                if (getData(nextProps.slotsMoverOT).viewMode === false) {
                    let target = $("#reporteIncidenciasOT");
                    if (target.length) {
                        $('html, body').animate({ scrollTop: target.offset().top - 150 }, 500, 'swing');
                    }
                }
            }
        };
        hasChanged(componente1: any, componente2: any): boolean {
            let c1: any = componente1 === undefined ? null : componente1;
            let c2: any = componente2 === undefined ? null : componente2;

            try {
                if (c1 !== null && c2 !== null) {
                    return global.hasChanged(c1, c2) || c1.IdTipoComponente !== c2.IdTipoComponente || c1.IdComponente !== c2.IdComponente;
                } else {
                    if (c1 === null && c2 === null) {
                        return false;
                    } else {
                        return true;
                    };
                };
            } catch (e) {
                return true;
            }

        };
        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {

            return hasChanged(this.props.cliente, nextProps.cliente) ||
                hasChanged(this.props.ubicacionSeleccionada, nextProps.ubicacionSeleccionada) ||
                hasChanged(this.props.entidad, nextProps.entidad) ||
                //    hasChanged(this.props.cliente, nextProps.cliente) ||
                hasChanged(this.props.ubicacion, nextProps.ubicacion) ||
                //    hasChanged(this.props.etapa, nextProps.etapa) ||
                //    hasChanged(this.props.contratistas, nextProps.contratistas) ||
                hasChanged(this.props.contacto, nextProps.contacto) ||
                this.hasChanged(this.props.componente, nextProps.componente) ||
                //    hasChanged(this.props.partida, nextProps.partida) ||
                hasChanged(this.props.slotState, nextProps.slotState);
        };
        componentDidUpdate(prevProps: IEditProps, { }): any {
            let state: any = global.getData(this.props.slotState);
            if (state && state.viewMode === false) {
                if (this.hasChanged(prevProps.componente, this.props.componente) && this.props.componente !== undefined) {
                    let partida: any = Forms.getValues(TICKET_INCIDENCIAS_ID);


                    let expedienteUbicacion: any = EK.Store.getState().global.Tickets$ubicacionSeleccionada.data;


                    let reporte: any = Forms.getForm()
                        .addID()
                        .addDate("FechaCaptura")
                        .addDate("FechaEntregaVivienda")
                        .addObjectConst("ExpedienteUbicacion", expedienteUbicacion)
                        .addVersion()
                        .toObject();
                    this.props.calcularPartida(partida, reporte);
                }
            };
        };
        onClickItem(item: any) {
            dispatchDefault("load::" + SECCION_UBICACION_SELECCIONADO, {});

            if (item.ID != null && item.ID != undefined) {
                dispatchSuccessful("load::" + SECCION_UBICACION_SELECCIONADO, item);
                //let p: any = global.assign({
                //    activos: 1,
                //    IdUbicacion: item.ID
                //});
                //dispatchAsyncPost("global-page-data", "base/kontrol/SupervisoresUbicaciones/GetBP/getSupervisoresFraccionamientos/", { parametros: p }, SECCION_SUPERVISORES_ID);
                //dispatchAsyncPost("global-page-data", "base/kontrol/SupervisoresUbicaciones/GetBP/getUbicacionesFraccionamientos/", { parametros: p }, SECCION_UBICACIONES_ID);
                let items: any = EK.Store.getState().global["catalogo$" + TICKET_EXPENDIENTE_UBICACION_ID];
                EK.Global.dispatchSuccessful("global-page-data", items.data, TICKET_EXPENDIENTE_UBICACION_ID);
                let idPrototipo: any = item ? item.Ubicacion.IdPrototipo : -1;
                let encodedFilters: string = global.encodeObject({ idPrototipo: idPrototipo });
                global.dispatchAsync("global-page-data", "base/svc/Tickets/GetBP/getUbicacionesComponente/" + encodedFilters, "ubicaciones$componentes");



                Forms.updateFormElement(config.id, "FechaEntregaVivienda", global.formatDateTimeDirect(item.Ubicacion.FechaEntrega, true));
                //        //Forms.updateFormElement(config.id, "MesesTranscurridos", global.getData(nextProps.etapa).MesesTranscurridos);


            } else {
                //global.dispatchSuccessful("global-page-data", [], SECCION_SUPERVISORES_ID);

            }

        }
        render(): JSX.Element {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            let slotState: any = global.getData(this.props.slotState);
            //let idEntidad: number = !(slotState && slotState.entidad) ? undefined : slotState.entidad.ID;
            let entidad: any = global.getData(this.props.entidad);
            //let cliente: any = global.getData(this.props.cliente);
            //let lote: any = global.getData(this.props.ubicacion);
            let isNew: boolean = global.getDataID(this.props.entidad) <= 0;
            //let displayAntiguo: boolean = false;
            //let idPlaza: string = undefined;
            //let supervisionExterna: number = undefined;
            //let editCampos: any = {};
            let badgeAntiguo: string = "badge badge-info";
            //let tipoVivienda: number = undefined;
            //let revisado: boolean = entidad.IdEstatusRevisado === "S";

            //if (cliente && cliente.Antiguedad > 5) {
            //    displayAntiguo = true;
            //    badgeAntiguo = "badge badge-danger";
            //};

            //if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {
            //    idPlaza = global.getData(this.props.ubicacion).IdPlaza;

            //    let plaza: any = global.getData(this.props.ubicacion).Plaza;
            //    supervisionExterna = plaza ? plaza.ValidarResponsablePlaza : 0;

            //    let segmento: any = global.getData(this.props.ubicacion).Segmento;
            //    tipoVivienda = segmento ? segmento.IdTipoVivienda : null;
            //};

            //if (entidad.IdEstatusReporte === "N" || entidad.IdEstatusReporte === "M") {
            //    editCampos.ObservacionesServicio = true;
            //    editCampos.ObservacionesContratista = true;
            //    editCampos.TipoComponente = true;
            //    editCampos.Falla = true;
            //    editCampos.UbicacionFalla = true;

            //    if (slotState.isNew === true) {
            //        editCampos.ObservacionesSection = true;
            //        editCampos.ObservacionesContratistaSection = true;
            //    };
            //};

            let edit: any = {
                icon: "icon-pencil",
                titulo: "Editar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    global.fixJsonDates(item);
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    Forms.updateFormElement(id, INCIDENCIA_DICTAMENES_ID, global.createSuccessfulStoreObject(item.Dictamenes));

                    //modificacion
                    Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "TipoComponente", item.Componente.TipoComponente);

                    let entity: any = EK.Store.getState().global.currentEntity.data;
                    let idPrototipo: string = entity.Ubicacion.IdPrototipo;
                    let encodedFilters: string = global.encodeObject({ idPrototipo: idPrototipo });
                    global.dispatchAsync("global-page-data", "base/svc/Tickets/GetBP/getUbicacionesComponente/" + encodedFilters, "ubicaciones$componentes");



                    Forms.updateFormElement(id, "UbicacionComponente", { IdUbicacion: item.UbicacionComponente.ID, Clave: item.UbicacionComponente.ID, Nombre: item.UbicacionComponente.Descripcion });

                    let isNew: boolean = item.EstatusIncidencia.Clave === "N";
                    this.props.config.setState({ viewMode: false, isNew, entidad: item }, id);
                }
            };

            //let labelValue: any = (item: any) => {
            //    return !item ? "" : (!item.Clave ? "" : "(" + item.Clave + ") ") + (!item.Descripcion ? "" : item.Descripcion);
            //};

            let labelCausaFalla: any = (item: any) => {

                return !item ? "" : (!item.Clave ? "" : "(" + item.Clave + ") ") + (!item.Descripcion ? "" : item.Descripcion);
            };

            let labelOrigenFalla: any = (item: any) => {
                return !(item && item.OrigenIncidencia) ? "" : (!item.OrigenFalla.Abreviatura ? "" : "(" + item.OrigenFalla.Abreviatura + ") ") + (!item.OrigenFalla.Descripcion ? "" : item.OrigenFalla.Descripcion);
            };

            let labelGarantia: any = (value: any) => {
                return (value === undefined || value === null) ? "" : value > 0 ? "<span class='badge bold' style='background-color: rgb(65, 195, 0);'>" + value + "</span>" : "<span class='badge badge-danger bold'>" + value + "</span>"
            };

            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";

                if (state.allowUpdate === true) {
                    className = "fas fa-unlock";
                };

                return global.formatDate(value) + " <span class='pull-right'><i class='" + className + "' style='color:#1A237E;'></i></span>";
            };



            return <page.Edit>

                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={<span>
                            <span>Tickets</span>
                            {/*entidad.IdPrereporte > 0 ? <span> <span className="badge  pull-right" style={{ backgroundColor: "#4cd964" }} >{entidad.IdPrereporte}</span>
                                <i className="fas fa-mobile-alt  pull-right" style={{ fontSize: "14px" }}></i>&nbsp;</span>
                                : null}
                            {!(entidad && entidad.Prereporte) ?
                                <span className="badge badge-danger bold pull-right">{isNew === true ? "nuevo" : entidad.ID}</span> :
                                <span className="badge badge bold pull-right" style={{ backgroundColor: "#41c300" }}>prereporte</span>
                            */}
                            <span className="pull-right bold">Folio:&nbsp;</span>
                        </span>}
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            {isNew === true && !(entidad && entidad.Prereporte) ?
                                <select.ClientesPostVenta idForm={config.id} size={[4, 4, 4, 4]} required={true} validations={[validations.required()]} /> :
                                <label.Entidad id="Cliente" size={[4, 4, 4, 4]} value={(item: any) => {
                                    return !item ? "" : (!item.Clave ? "" : "<span class='" + badgeAntiguo + "'>" + item.Clave + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                                } } />
                            }
                            <label.Fecha id="FechaReporte" value={labelFechaCaptura} isHTML={true} size={[2, 2, 2, 2]} />
                            <label.Fecha id="FechaEntrega" size={[2, 2, 2, 2]} />
                            <label.Label id="DiasTranscurridos" size={[2, 2, 2, 2]} />
                            <label.Entidad id="EstatusReporte" size={[2, 2, 2, 2]} />
                        </Row>

                        <Row>
                            <Column size={[4, 4, 4, 4]} style={{ paddingTop: 10 }}>
                                {/*Ponemos aqui para ver la relacion con el expediente(REPORTE_ORDEN_TRABAJO_ID)*/}
                                <ViewUbicacionCliente />


                                {/*termina expediente*/}

                            </Column>
                            <Column size={[8, 8, 8, 8]} style={{ paddingTop: 10 }}>
                                <page.OptionSection
                                    id={REPORTE_INFORMACION_ID}
                                    parent={config.id}
                                    level={1}
                                    icon="fa fa-info-circle" collapsed={false}>
                                    <Row>
                                        <label.Label id="DiasSolucion" size={[3, 3, 3, 3]} />
                                        <label.Label id="DiasContratista" size={[3, 3, 3, 3]} />
                                        <ResponsablesConstruccionDDL id="ResponsableConstruccion" size={[6, 6, 6, 6]} required={true} validations={[validations.required()]} />
                                    </Row>
                                    <Row>
                                        <label.Fecha id="FechaSolucionReporte" size={[3, 3, 3, 3]} />
                                        <label.Fecha id="FechaContratistaInicial" size={[3, 3, 3, 3]} />
                                        <ddl.SPVMediosComunicacionDDL id="MedioSolicitud" size={[6, 6, 6, 6]} required={true} validations={[validations.required()]} />
                                    </Row>
                                    <Row>
                                        <label.Fecha id="FechaSolucionTerminacion" size={[3, 3, 3, 3]} />
                                        <label.Fecha id="FechaContratistaFinal" size={[3, 3, 3, 3]} />
                                        {/*supervisionExterna === 1 ? <SPVContratistasConsulta id="SupervisorContratista" label="Supervisión Externa" idPlaza={idPlaza} size={[6, 6, 6, 6]} required={true} validations={[validations.required()]} /> : null*/}
                                    </Row>
                                    <Row>
                                        <TextArea id="ObservacionesCliente" rows={2} idForm={config.id} size={[6, 6, 6, 6]} />
                                        <TextArea id="ObservacionesContratista" rows={2} idForm={config.id} size={[6, 6, 6, 6]} />
                                    </Row>
                                </page.OptionSection>

                            </Column>


                        </Row>
                        <Row>
                            <Column size={[12, 12, 8, 8]}>
                                <page.OptionSection
                                    id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                    parent={config.id}
                                    icon="fa fa-users"
                                    level={1} collapsed={false}
                                    subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                                        {[global.getData(this.props.contratistas, []).length].join("")}
                                    </span>}>
                                    <PanelUpdate info={this.props.contratistas}>
                                        <List
                                            id={REPORTE_UBICACION_CONTRATISTAS_ID}
                                            items={this.props.contratistas}
                                            readonly={true}
                                            listHeader={listHeaderContratistas}
                                            formatter={(index: number, item: any) => {
                                                return <Row style={{ margin: 0 }}>
                                                    <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                                                    {/*<Column size={[2, 2, 2, 2]} className="listItem-default-item"><span className="badge badge-info">{item.TipoContratista.Descripcion}</span></Column>
                                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item">{item.Contratista && item.Contratista.TipoContrato ? <span className="badge badge-info">{item.Contratista.TipoContrato.Nombre}</span> : null}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-center-header">{EK.UX.Labels.yes(item.ContratistaDefault === "S")}</Column>
                                                        */}
                                                </Row>
                                            } } />
                                    </PanelUpdate>
                                </page.OptionSection>
                            </Column>
                            <EditSPVClienteContactos size={[12, 12, 6, 4]} />
                        </Row>
                        <Row>
                            {/*displayAntiguo === true ?
                                <Column size={[12, 12, 12, 12]} style={{ marginBottom: 20 }}>
                                    <alerts.Alert type={alerts.AlertTypeEnum.danger}>
                                        <p style={{ fontSize: 12 }}> La fecha de entrega de la vivienda fue hace más de 5 años. </p>
                                    </alerts.Alert>
                                </Column> : null
                            */}
                        </Row>


                        <Row>
                            <ReporteMessages visible={true} />
                        </Row>
                        <Row>
                            <div id="reporteIncidencias">
                                <page.SectionList
                                    id={TICKET_INCIDENCIAS_ID}
                                    parent={config.id}
                                    icon="fas fa-cogs"
                                    level={1}
                                    //hideNewButton={displayAntiguo === true || revisado === true || !tipoVivienda || !state.allowUpdate}
                                    editButtons={<SearchButton id="searchButton" />}
                                    listHeader={listHeaderFallas}
                                    size={[12, 12, 12, 12]}
                                    readonly={true}
                                    horizontalScrolling={true}
                                    selectable={true}
                                    drawOddLine={true}
                                    items={createSuccessfulStoreObject([])}
                                    onAddNew={() => {
                                        let ubicacion: any = global.getData(this.props.ubicacion);
                                        let partidas: any[] = global.getData(Forms.getValue(TICKET_INCIDENCIAS_ID, config.id), []);
                                        let partida: number = 0;

                                        //calcular el consecutivo de la partida
                                        partidas.forEach((value: any, index: number) => {
                                            if (partida < value.Partida) {
                                                partida = value.Partida;
                                            }
                                        });
                                        partida++;

                                        Forms.remove(TICKET_INCIDENCIAS_ID);
                                        Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "Partida", partida);
                                        Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "DesarrolloClave", ubicacion.DesarrolloClave);
                                        Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "EstatusIncidencia", { Clave: "N", Nombre: "NUEVO" });
                                        Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "EstatusIncidenciaValor", "N");
                                        Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "EstatusAutorizacion", "N");
                                        Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "PartidaAutorizada", "R");
                                        Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "Procede", "N");
                                        Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "ProcedeBool", true);
                                        Forms.updateFormElement(TICKET_INCIDENCIAS_ID, INCIDENCIA_DICTAMENES_ID, global.createSuccessfulStoreObject([]));

                                        //establecer el contratista default de la ubicación
                                        if (this.props.contratistas && this.props.contratistas.data) {
                                            let contratistas: any[] = global.getData(this.props.contratistas, []);
                                            contratistas = contratistas.filter(c => { return c.ContratistaDefault === "S"; });
                                            if (contratistas && contratistas.length > 0) {
                                                Forms.updateFormElement(TICKET_INCIDENCIAS_ID, "Contratista", contratistas[0].Contratista);
                                            };
                                        };

                                        this.props.config.setState({ viewMode: false, isNew: true, entidad: undefined }, TICKET_INCIDENCIAS_ID);
                                    } }

                                    subTitle={(data: any): any => {
                                        let state: any;// = global.getData(this.props.slotState);
                                        let subTitle: any = "";

                                        //if (state) {
                                        //    if (state.viewMode === true) {
                                        //        subTitle = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                                        //            {[global.getData(data, []).length].join("")}
                                        //        </span>
                                        //    } else {
                                        //        let partida: any = Forms.getValue("Partida", REPORTE_FALLAS_ID);
                                        //        subTitle = <span>
                                        //            <span> / Partida</span>
                                        //            <span className="badge badge-info" style={{ marginLeft: 5 }}>{partida}</span>
                                        //        </span>
                                        //    }
                                        //};

                                        return subTitle;
                                    } }
                                    mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                        let retValue: any = form
                                            .addID()
                                            .addNumber("Partida")
                                            .addObject("TipoComponente")
                                            .addObject("Componente")
                                            .addObject("CausaIncidencia")
                                            .addObject("UbicacionComponente")
                                            .addObject("Contratista")
                                            .addDate("TerminoGarantia")
                                            .addNumber("DiasGarantia")
                                            .addDate("FechaCerrado")
                                            .addString("ObservacionesContratista")
                                            .addString("ObservacionesCliente")
                                            .addObject("EstatusIncidencia")
                                            .addString("EstatusIncidenciaValor")
                                            .addString("EstatusAutorizacion")
                                            .addString("PartidaAutorizada")
                                            .addString("Procede")
                                            .addBoolean("ProcedeBool")
                                            .addNumber("Reincidencias")
                                            .addObject("Dictamenes", INCIDENCIA_DICTAMENES_ID)
                                            .addVersion()
                                            .toObject();



                                        return retValue;
                                    } }
                                    formatter={(index: number, item: any) => {
                                        let bgColor: string;
                                        let extraData: any[] = [];
                                        let allowEdit: boolean = false;
                                        let allowRemove: boolean = false;



                                        if (item.PartidaAutorizada === "R" || item.Procede === "N" || item.ProcedeBool === false) {
                                            bgColor = "#FFA07A";
                                        };




                                        //if (item.EstatusPartida && (item.EstatusPartida.Clave === "N" || item.EstatusPartida.Clave === "D")) {
                                        //    if (entidad.EstatusReporte) {
                                        //        if (entidad.EstatusReporte.Clave === "N") {
                                        //            allowEdit = allowRemove = true;
                                        //        } else if (entidad.EstatusReporte.Clave === "M") {
                                        //            allowEdit = true;
                                        //        };
                                        //    };
                                        //};

                                        //if (isNew === true || item.ID <= 0) {
                                        allowEdit = allowRemove = true;
                                        //};

                                        //if (displayAntiguo === true) {
                                        //    allowEdit = allowRemove = false;
                                        //};

                                        //if (allowEdit === true) {
                                        //    extraData.push(edit);
                                        //};
                                        extraData.push(edit);

                                        //if (allowRemove === true && state.allowUpdate === true) {
                                        //    extraData.push(buttons.PopOver.remove);
                                        //};
                                        state.allowUpdate = true;

                                        return <Row className="list-selectable-item" style={{ backgroundColor: bgColor }}>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida}</span></Column>
                                            <ColumnDictamenes size={[1, 1, 1, 1]} items={item.Dictamenes} />
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Componente.TipoComponente) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Componente.TipoComponente.ID}</span>{item.Componente.TipoComponente.Nombre}</span>}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Componente) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Componente.ID}</span>{item.Componente.Descripcion}</span>}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.UbicacionComponente) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionComponente.ID}</span>{item.UbicacionComponente.Nombre}</span>}</Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</span>}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaIncidencia ? item.CausaIncidencia.Descripcion : null}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaIncidencia ? item.CausaIncidencia.OrigenFalla.Descripcion : null}</Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.Reincidencias}</Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesCliente}</Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesContratista}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.TerminoGarantia)}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.FechaCerrado)}</Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">{EK.UX.Labels.yes(item.ProcedeBool === true)}</Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">{!(item && item.EstatusIncidencia) ? null : <span className="badge badge-info">{item.EstatusIncidencia.Nombre}</span>}</Column>
                                            <Column size={[1, 1, 1, 1]}>
                                                {extraData.length > 0 ? <buttons.PopOver idParent={config.id} idForm={TICKET_INCIDENCIAS_ID} renderColumn={false} info={item} extraData={extraData} /> : null}
                                            </Column>
                                        </Row>
                                    } }>
                                    <Row>
                                        <SPVTiposComponentesConsulta idFormSection={TICKET_INCIDENCIAS_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                        <SPVComponentesConsulta idFormSection={TICKET_INCIDENCIAS_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />


                                        <label.Entidad id="CausaIncidencia" idForm={TICKET_INCIDENCIAS_ID} value={labelCausaFalla} size={[12, 12, 3, 3]} />
                                        <label.Entidad id="CausaIncidencia" label="Causa" idForm={TICKET_INCIDENCIAS_ID} value={labelOrigenFalla} size={[12, 12, 3, 3]} />
                                        <SPVContratistasConsulta idFormSection={TICKET_INCIDENCIAS_ID} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />


                                        <SPVUbicacionesComponentesDDL idFormSection={TICKET_INCIDENCIAS_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />


                                        <label.Entidad id="EstatusIncidencia" idForm={TICKET_INCIDENCIAS_ID} size={[12, 12, 3, 3]} />
                                        <label.Label id="DiasGarantia" idForm={TICKET_INCIDENCIAS_ID} isHTML={true} size={[12, 12, 3, 3]} />
                                        <label.Fecha id="TerminoGarantia" idForm={TICKET_INCIDENCIAS_ID} size={[12, 12, 3, 3]} />
                                        <label.Fecha id="FechaCerrado" idForm={TICKET_INCIDENCIAS_ID} size={[12, 12, 3, 3]} />
                                        <checkBox.CheckBox id="ProcedeBool" idFormSection={TICKET_INCIDENCIAS_ID} size={[12, 12, 1, 1]} />
                                        <TextArea id="ObservacionesCliente" idFormSection={TICKET_INCIDENCIAS_ID} rows={2} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                                        <TextArea id="ObservacionesContratista" idFormSection={TICKET_INCIDENCIAS_ID} rows={2} size={[12, 12, 6, 6]} />
                                        <page.SectionList
                                            id={INCIDENCIA_DICTAMENES_ID}
                                            parent={TICKET_INCIDENCIAS_ID}
                                            icon="fas fa-clipboard-check"
                                            level={1}
                                            listHeader={listHeaderDictamenes}
                                            size={[12, 12, 12, 12]}
                                            readonly={true}
                                            style={{ marginTop: 12 }}
                                            items={createSuccessfulStoreObject([])}
                                            onAddNew={() => {
                                                Forms.remove(INCIDENCIA_DICTAMENES_ID);
                                                Forms.updateFormElement(INCIDENCIA_DICTAMENES_ID, "IdTicket", entidad.ID);

                                                Forms.updateFormElement(INCIDENCIA_DICTAMENES_ID, "Creado", new Date());
                                                Forms.updateFormElement(INCIDENCIA_DICTAMENES_ID, "CreadoPor", global.getData(this.props.app).Me);
                                                this.props.config.setState({ viewMode: false }, INCIDENCIA_DICTAMENES_ID);
                                            } }
                                            mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                                let retValue: any = form
                                                    .addID()
                                                    .addDescripcion()
                                                    .addNumber("IdTicket")
                                                    .addNumber("IdReporteDetalle")
                                                    .addDate("Creado")
                                                    .addObject("CreadoPor")
                                                    .addObject("EstatusDictamen")
                                                    .addEstatus()
                                                    .addVersion()
                                                    .toObject();

                                                let e: any[] = entidades;
                                                if (e && e.length > 0) {
                                                    e.forEach((value: any, index: number): any => {
                                                        if (value.ID === retValue.ID) {
                                                            retValue._found = true;
                                                        };
                                                    });
                                                };

                                                return retValue;
                                            } }
                                            formatter={(index: number, item: any) => {
                                                return <Row id={"row_dictamen_" + item.ID} className="panel-collapsed">
                                                    <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                                        <Row>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                                <CollapseButton idElement={"row_dictamen_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                                            </Column>
                                                            <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow">{item.Descripcion}</Column>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-default-item">{label.formatDate(item.Creado)}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-info">{!(item && item.CreadoPor) ? "" : item.CreadoPor.Nombre}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.EstatusDictamen) ? null : <span className="badge" style={{ backgroundColor: BGCEstatusDictamen[item.EstatusDictamen.Clave] }}>{item.EstatusDictamen.Nombre}</span>}</Column>
                                                            <buttons.PopOver idParent={TICKET_INCIDENCIAS_ID} idForm={INCIDENCIA_DICTAMENES_ID} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                                        </Row>
                                                    </Column>

                                                </Row>
                                            } }>
                                            <Row>
                                                <input.Text id="Descripcion" maxLength={255} idFormSection={INCIDENCIA_DICTAMENES_ID} required={true} validations={[validations.required()]} size={[12, 12, 10, 10]} />
                                                <ddl.EstatusDictamenesDDL id="EstatusDictamen" idFormSection={INCIDENCIA_DICTAMENES_ID} required={true} validations={[validations.required()]} size={[12, 12, 2, 2]} />
                                            </Row>
                                        </page.SectionList>
                                    </Row>
                                </page.SectionList>
                            </div>
                        </Row>
                        <Row>
                            <EditOrdenesTrabajo size={[12, 12, 12, 12]} />

                        </Row>
                        <UbicacionModal visible={false} />
                    </page.OptionSection>
                </Column>
            </page.Edit>
        }
    });

    interface ISPVClienteContactosProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    const EditSPVClienteContactos: any = global.connect(class extends React.Component<ISPVClienteContactosProps, {}>{
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        render(): JSX.Element {
            let displayTelefono: boolean = false;
            let displayCorreo: boolean = false;

            let tipoContacto: any = Forms.getValue("TipoContacto", REPORTE_CONTACTO_ID);
            if (tipoContacto) {
                if (tipoContacto.Clave === "TELEFONO") {
                    displayTelefono = true;
                }
                else if (tipoContacto.Clave === "CORREO") {
                    displayCorreo = true;
                }
            };

            return <div id="reporteContacto"><page.SectionList
                id={REPORTE_CONTACTO_ID}
                parent={config.id}
                level={1}
                listHeader={listHeaderContacto}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-mobile-alt"
                size={this.props.size}
                mapFormToEntity={(form: EditForm, items?: any[]): any => {
                    let retValue: any = form
                        .addID()
                        .addObject("TipoContacto")
                        .addObject("TipoTelefono")
                        .addBoolean("Titular")
                        .addString("Contacto")
                        .addString("Extension")
                        .addVersion()
                        .toObject();

                    if (retValue.TipoContacto.Clave === "CORREO") {
                        retValue.TipoTelefono = null;
                        retValue.IdTipoTelefono = null;
                        retValue.Extension = null;
                    }

                    return retValue;
                } }
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[4, 4, 4, 4]} className="listItem-default-item">
                            {item.TipoContacto.Clave === "TELEFONO" ? item.Extension ? [item.Contacto, " ext. ", item.Extension].join("") : item.Contacto : null}
                            {item.TipoContacto.Clave === "CORREO" ? item.Contacto : null}
                        </Column>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-item">
                            <span className="badge badge-info">{item.TipoContacto.Clave}</span>&nbsp;
                            {item.TipoContacto.Clave === "TELEFONO" ? <span className="badge badge-success">{item.TipoTelefono.Nombre}</span> : null}
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-center-item">{EK.UX.Labels.yes(item.Titular)}</Column>
                        <buttons.PopOver idParent={config.id} idForm={REPORTE_CONTACTO_ID} info={item} extraData={[buttons.PopOver.edit]} />
                    </Row>
                } }>
                <Row>
                    <ddl.TiposContactoDDL id="TipoContacto" idFormSection={REPORTE_CONTACTO_ID} validations={[validations.required()]} size={[12, 12, 12, 12]} />
                    {displayTelefono === true ? <ddl.TiposTelefonoDLL id="TipoTelefono" idFormSection={REPORTE_CONTACTO_ID} validations={[validations.required()]} size={[12, 12, 12, 12]} /> : null}
                    {displayCorreo === true ? <input.Email id="Contacto" label="Correo" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 8, 8]} validations={[validations.required()]} /> : null}
                    {displayTelefono === true ? <input.Telefono id="Contacto" label="Teléfono" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 8, 8]} validations={[validations.required()]} /> : null}
                    {displayTelefono === true ? <input.Text id="Extension" label="Extensión" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 4, 4]} /> : null}
                    <checkBox.CheckBox id="Titular" idFormSection={REPORTE_CONTACTO_ID} size={[12, 12, 3, 3]} label="Titular" />
                </Row>
            </page.SectionList>
            </div>
        };
    });

    class ViewSPVClienteContactos extends React.Component<ISPVClienteContactosProps, {}>{
        render(): JSX.Element {
            let displayTelefono: boolean = false;
            let displayCorreo: boolean = false;

            let tipoContacto: any = Forms.getValue("TipoContacto", REPORTE_CONTACTO_ID);
            if (tipoContacto) {
                if (tipoContacto.Clave === "TELEFONO") {
                    displayTelefono = true;
                }
                else if (tipoContacto.Clave === "CORREO") {
                    displayCorreo = true;
                }
            };

            return <page.SectionList
                id={REPORTE_CONTACTO_ID}
                parent={config.id}
                level={1}
                listHeader={listHeaderContacto}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-mobile-alt"
                size={this.props.size}
                style={this.props.style}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[4, 4, 4, 4]} className="listItem-default-item">
                            {item.TipoContacto.Clave === "TELEFONO" ? item.Extension ? [item.Contacto, " ext. ", item.Extension].join("") : item.Contacto : null}
                            {item.TipoContacto.Clave === "CORREO" ? item.Contacto : null}
                        </Column>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-item">
                            <span className="badge badge-info">{item.TipoContacto.Clave}</span>&nbsp;
                            {item.TipoContacto.Clave === "TELEFONO" ? <span className="badge badge-success">{item.TipoTelefono.Nombre}</span> : null}
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-center-item">{EK.UX.Labels.yes(item.Titular)}</Column>
                        <Column size={[1, 1, 1, 1]}></Column>
                    </Row>
                } }>
            </page.SectionList>
        };
    };

    interface ISearchButtonProps extends buttons.IButtonProps {
        ubicacion?: DataElement;
    };

    class $SearchButton extends React.Component<ISearchButtonProps, {}> {
        constructor(props: ISearchButtonProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            ubicacion: state.global.entity$ticket$ubicacion
        });
        static defaultProps: ISearchButtonProps = {
            icon: "fa fa-search",
            text: "",
            color: "",
            style: null,
            className: "",
            iconOnly: true,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        render(): JSX.Element {
            let color: string = "white";
            let className: string;

            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            } else {
                className = "btn-default-ek";
            }

            if (global.isSuccessful(this.props.ubicacion)) {
                let segmento: any = global.getData(this.props.ubicacion).Segmento;
                if (segmento) {
                    return <span>
                        <Button {...this.props} keyBtn={"btnSPVBuscadorGralFamCom"} className={className} color={color} />
                        <SPVCombinacionConsulta idTipoComponente={0} target={this.props.id} idFormSection={TICKET_INCIDENCIAS_ID} />
                    </span>
                }
            };

            return null;
        };
    };
    const SearchButton: any = ReactRedux.connect($SearchButton.props, null)($SearchButton);

    interface IContratistasReporteDDLProps extends ddl.IDropDrownListProps {
        entidad?: DataElement;
    };

    class ContratistasTicket$DDL extends React.Component<IContratistasReporteDDLProps, {}> {
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            entidad: state.global.currentEntity,
            items: state.global.catalogo$ticket$contratistas
        });
        static defaultProps: IContratistasReporteDDLProps = {
            id: "Contratista",
            items: createDefaultStoreObject([]),
            label: "Contratista",
            helpLabel: "Seleccione un Contratista",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'> ", item.id, "</span>",
                        "<span class='bold' style='font-size: 90%'> ", item.Nombre, "</span> "
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ", item.text, "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success bold'> ", item.id, "</span>",
                    "<span class='bold' style='font-size: 90%'> ", item.Nombre, "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            let idEntidad: number = global.getDataID(this.props.entidad);
            if (idEntidad > 0) {
                let encodedFilters: string = global.encodeObject({ idTicket: idEntidad });
                global.dispatchAsync("global-page-data", "base/scv/tickets/GetBP/GetContratistas/" + encodedFilters, REPORTE_CONTRATISTAS_ID);
            };
        };
        render(): JSX.Element {
            return <ddl.DropdownList$Form {...this.props} />;
        };
    };
    const ContratistasTicketDDL: any = ReactRedux.connect(ContratistasTicket$DDL.props, null)(ContratistasTicket$DDL);

    export interface IReportesButtonProps extends IButtonProps, page.IProps { }

    export let ReportesButton: any = global.connect(class extends React.Component<IReportesButtonProps, {}> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IReportesButtonProps = {
            icon: "glyphicon glyphicon-list-alt",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.entidad)) {
                if (global.getDataID(this.props.entidad) > 0) {
                    return <span>
                        <Button keyBtn={"btnSPVOtrosReportesFallas"} {...this.props} id="btn_cliente_reportes" />
                        <SPVReportesClienteConsulta target="btn_cliente_reportes" />
                    </span>
                }
            }

            return null;
        };
    });

    export interface IRevisarButtonProps extends IButtonProps, page.IProps { };
    export class Revisar$Button extends React.Component<IRevisarButtonProps, {}> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            state: state.global.currentEntityState
        });
        static defaultProps: IRevisarButtonProps = {
            icon: "fas fa-clipboard-check",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let message: string = "Presione Confirmar para actualizar el reporte a estatus Revisado.";
            let entidad: any = global.getData(this.props.entidad);
            //let partidas: any[] = !(entidad && entidad.Partidas) ? [] : entidad.Partidas as any[];
            //if (partidas && partidas.length) {
            //    let partidasRechazadas: boolean;
            //    let partidasEnDictamen: boolean;
            //    //
            //    partidas.forEach((value: any, index: number) => {
            //        if (value.PartidaAutorizada === "R" || value.Procede === "N" || value.ProcedeBool === false) {
            //            partidasRechazadas = true;
            //        };
            //        //
            //        let dictamenes: any[] = value.Dictamenes as any[];
            //        if (dictamenes && dictamenes.length > 0) {
            //            let dictamen: any = dictamenes[dictamenes.length - 1];
            //            if (dictamen.EstatusDictamen && dictamen.EstatusDictamen.Clave === "I") {
            //                partidasEnDictamen = true;
            //            };
            //        };
            //    });
            //    //
            //    if (partidasEnDictamen === true) {
            //        global.warning("El reporte tiene partidas con dictámen abierto. Verifique la información.");
            //        return;
            //    };
            //    //
            //    if (partidasRechazadas === true) {
            //        message = "El reporte tiene partidas rechazadas.\n Presione Confirmar para actualizar el reporte a estatus Revisado.";
            //    };
            //};
            //
            //EK.Global.confirm(message, "Reporte de Fallas", (isConfirm) => {
            //    if (isConfirm === true) {
            //        global.dispatchAsyncPut("global-current-entity", "scv/reportesFallas/revisarReporte/", entidad);
            //    };
            //});
        };
        render(): JSX.Element {
            let options: ViewState = new ViewState(global.getData(this.props.state));

            if (global.isSuccessful(this.props.entidad) && global.getDataID(this.props.entidad) > 0) {
                if (options.allowRevise === true && options.viewMode === true) {
                    return <Button {...this.props} keyBtn={"btnSPVAutorizarReporteFallas"} onClick={this.onClick.bind(this)} />
                }
            };

            return null;
        };
    };
    const RevisarButton: any = ReactRedux.connect(Revisar$Button.props, null)(Revisar$Button);

    interface IReporteMessagesProps extends page.IProps {
        contratistas?: global.DataElement;
        cliente?: global.DataElement;
        visible?: boolean;
    };

    class Reporte$Messages extends React.Component<IReporteMessagesProps, {}>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.contratistas = state.global.catalogo$reporte$ubicacion$contratistas;
            retValue.cliente = Forms.getDataValue("Cliente", config.id, state);
            return retValue;
        };
        render(): JSX.Element {
            let messages: JSX.Element[] = [];

            if (!this.props.visible) {
                return null;
            };

            if (!(global.isSuccessful(this.props.cliente) && global.getDataID(this.props.cliente) > 0)) {
                return null;
            };

            if (!global.isSuccessful(this.props.contratistas)) {
                return null;
            };

            let contratistas: any[] = global.getData(this.props.contratistas, []);
            if (contratistas.length <= 0) {
                messages.push(<alerts.Alert key="not-contratistas" type={alerts.AlertTypeEnum.danger}>
                    <p style={{ fontSize: 12 }}> No se encontraron contratistas asignados para la ubicación seleccionada. </p>
                </alerts.Alert>);
            };

            return <Column size={[12, 12, 12, 12]} style={{ marginBottom: 20 }}>
                {messages}
            </Column>
        };
    };
    const ReporteMessages: any = ReactRedux.connect(Reporte$Messages.props, null)(Reporte$Messages);

    interface IOrdenesTrabajo extends page.IProps, grid.IColumn {
        viewMode?: boolean;
        partidasBP?: DataElement;
        contratista?: DataElement;
        calcularPartidas?: (idReporte: number, idContratista: number, orden: any, ordenes: any[]) => void;
    };

    const EditOrdenesTrabajo: any = global.connect(class extends React.Component<IOrdenesTrabajo, {}>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.partidasBP = state.global[["catalogo", REPORTE_ORDEN_TRABAJO_CALCULO_PARTIDAS_ID].join("$")];
            retValue.contratista = Forms.getDataValue("Contratista", REPORTE_ORDEN_TRABAJO_ID, state);
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            calcularPartidas: (idTicket: number, idContratista: number, orden: any, ordenes: any[]): void => {
                let data: any = global.assign({ idTicket, idContratista, orden, ordenes });
                global.dispatchAsyncPost("global-page-data", "scv/tickets/calcularPartidasOT/", data, REPORTE_ORDEN_TRABAJO_CALCULO_PARTIDAS_ID);
            }
        });
        onSave(workMode: boolean): void {
            let entidades: DataElement = this.props.config.getCatalogo(REPORTE_ORDEN_TRABAJO_ID);


            //
            if (config.id) {
                entidades = Forms.getValue(REPORTE_ORDEN_TRABAJO_ID, config.id);
            };
            //
            if (!entidades) {
                entidades = global.createSuccessfulStoreObject([]);
            };
            //
            if (!Forms.isValid(REPORTE_ORDEN_TRABAJO_ID)) {
                global.warning("Los datos están incompletos, verificar campos requeridos y validaciones.");
                return;
            };
            //
            let item: EditForm = Forms.getForm(REPORTE_ORDEN_TRABAJO_ID);
            let entidad: any = item
                .addID()
                .addObject("Contratista")
                .addString("Observaciones")
                .addObject("EstatusOrdenTrabajo")
                .addDateObject("FechaInicioReal")
                .addDateObject("FechaFinReal")
                .addBoolean("CerrarRegistro")
                .addObject("Incidencias", REPORTE_ORDEN_TRABAJO_PARTIDAS_ID)
                .addVersion()
                .toObject();
            //
            if (workMode === true) {
                if (entidad.FechaInicioReal === undefined || entidad.FechaInicioReal === null) {
                    global.warning("Por favor indique la fecha de inicio del trabajo.");
                    return;
                };

                if (entidad.CerrarRegistro === true) {
                    if (entidad.FechaFinReal === undefined || entidad.FechaFinReal === null) {
                        global.warning("Para cerrar la orden de trabajo es necesario capturar la fecha fin del trabajo.");
                        return;
                    };
                };

                if (!global.compareDates(entidad.FechaFinReal, entidad.FechaInicioReal, ">=")) {
                    global.warning("La fecha final del trabajo no puede ser menor a la fecha inicial del trabajo.");
                    return;
                };
            };
            //
            if (entidad && entidad.Partidas) {
                let validation: DataElement = global.createSuccessfulStoreObject(entidad.Partidas).getActiveItems();
                let partidas: any[] = global.getData(validation, []);
                if (!(partidas && partidas.length > 0)) {
                    global.warning("La orden de trabajo no tiene partidas asignadas. Por favor verifique la información.");
                    return;
                };
            };
            //
            if (entidad && entidad._found === true) {
                entidad._found = undefined;
            }
            else {
                if (!(entidad.ID > 0)) {
                    if (!(entidad && entidad.ID)) {
                        entidad.ID = entidades.getNextLowerID();
                    }
                };
            };
            //
            let retValue: DataElement = entidades.upsertItem(entidad);
            //
            Forms.updateFormElement(config.id, REPORTE_ORDEN_TRABAJO_ID, retValue);
            //
            this.props.config.setState({ viewMode: true }, REPORTE_ORDEN_TRABAJO_ID);
        };
        render(): JSX.Element {
            let idReporte: number = global.getDataID(this.props.entidad);
            let idContratista: number = global.getDataID(this.props.contratista);
            let workMode: boolean = global.getData(this.props.config.getState(REPORTE_ORDEN_TRABAJO_ID)).workMode;
            let addOTs: boolean = global.getData(this.props.entidad).EstatusTicket.Clave == "N";
            let idOrden: number = global.getData(this.props.config.getState(REPORTE_ORDEN_TRABAJO_ID)).idOrden;
            if (idOrden === null || idOrden === undefined) {
                idOrden = 0;
            };

            let items: DataElement;
            if (this.props.partidasBP && global.isSuccessful(this.props.partidasBP)) {
                items = this.props.partidasBP.getUpdatedStateItems();
                items = items.getActiveItems();
            };

            let edit: any = {
                icon: "icon-pencil",
                titulo: "Editar Incidencia",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    global.dispatchSuccessful("global-page-data", item.Partidas, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                    this.props.config.setState({ viewMode: false, idOrden: item.ID, workMode: false }, id);
                }
            };

            let workOT: any = {
                icon: "fas fa-briefcase",
                titulo: "Trabajar OT",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    global.dispatchSuccessful("global-page-data", item.Partidas, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                    this.props.config.setState({ viewMode: false, idOrden: null, workMode: true }, id);
                }
            };

            let editFalla: any = {
                icon: "icon-pencil",
                titulo: "Editar Incidencia",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    //
                    let partida: any = global.assign({}, item.Partida);
                    if (partida) {
                        if (partida.TipoComponente) {
                            Forms.updateFormElement(id, "TipoComponente", { Clave: partida.TipoComponente.ID, Nombre: partida.TipoComponente.Nombre });
                        }
                        if (partida.Componente) {
                            Forms.updateFormElement(id, "Componente", { Clave: partida.Componente.ID, Nombre: partida.Componente.Descripcion });
                        }
                        if (partida.UbicacionComponente) {
                            Forms.updateFormElement(id, "UbicacionComponente", { Clave: partida.UbicacionComponente.ID, Nombre: partida.UbicacionComponente.Descripcion });
                        }
                        if (partida.CausaIncidencia) {
                            Forms.updateFormElement(id, "CausaIncidencia", partida.CausaIncidencia);
                        };
                    };
                    //
                    this.props.config.setState({ viewMode: false }, id);
                }
            };

            let labelContratista: any = (item: any) => {
                return !(item && item.Descripcion) ? "" : "<span class='badge badge-success bold'>" + item.ID + "</span> " + item.Descripcion
            };

            return <div id="reporteIncidenciasOT"> <page.SectionList
                id={REPORTE_ORDEN_TRABAJO_ID}
                parent={config.id}
                icon="fa fa-briefcase"
                level={1}
                listHeader={listHeaderOrdenTrabajo}
                hideNewButton={addOTs}
                size={this.props.size}
                readonly={true}
                items={createSuccessfulStoreObject([])}
                onSave={() => {
                    //if (workMode === true) {
                    //    let cerrarRegistro: boolean = Forms.getValue("CerrarRegistro", REPORTE_ORDEN_TRABAJO_ID);
                    //    if (cerrarRegistro === true) {
                    //        EK.Global.confirm("Presione Confirmar para cerrar la orden de trabajo", "Reporte de Fallas", (isConfirm) => {
                    //            if (isConfirm === true) {
                    //                this.onSave(true);
                    //            };
                    //        });
                    //    } else {
                    //        this.onSave(true);
                    //    };
                    //} else {
                    this.onSave(false);
                    //};
                } }
                onAddNew={() => {
                    Forms.remove(REPORTE_ORDEN_TRABAJO_ID);
                    Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, "EstatusOrdenTrabajo", { Clave: "N", Nombre: "NUEVO" });
                    global.dispatchSuccessful("global-page-data", [], REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                    //
                    this.props.config.setState({ viewMode: false, idOrden: 0, workMode: false }, REPORTE_ORDEN_TRABAJO_ID);
                } }
                formatter={(index: number, item: any) => {
                    let partidas: global.DataElement = global.createSuccessfulStoreObject(item.Partidas).getActiveItems();
                    let extraData: any[] = [];

                    if (!this.props.viewMode) {
                        if (item.EstatusOrdenTrabajo.Clave === "N") {
                            extraData.push(edit);
                            extraData.push(buttons.PopOver.remove);
                        } else if (item.EstatusOrdenTrabajo.Clave === "E") {
                            extraData.push(workOT);
                            extraData.push(printOT);
                        }
                    };

                    return <Row id={"row_orden_trabajo_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                            <Row>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                    <CollapseButton idElement={"row_orden_trabajo_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                </Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.ID > 0 ? <span className="badge badge-info">{item.ID}</span> : <span>&nbsp;</span>}</Column>
                                <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaInicio)}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaFin)}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave] }}></i>}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info">{item.EstatusOrdenTrabajo.Nombre}</span></Column>
                                {extraData.length > 0 ? <buttons.PopOver idParent={config.id} idForm={REPORTE_ORDEN_TRABAJO_ID} info={item} extraData={extraData} /> : null}
                            </Row>
                        </Column>
                        <Row>
                            <Column
                                xs={{ size: 10 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 10, offset: 1 }}
                                lg={{ size: 10, offset: 1 }}
                                className="panel-detail well well-sm">
                                <List
                                    items={partidas}
                                    readonly={true}
                                    listHeader={listHeaderOrdenTrabajoPartidas}
                                    addRemoveButton={false}
                                    formatter={(_index: number, _item: any): any => {
                                        return <Row>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Incidencia.ID}</span></Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Incidencia.Componente.TipoComponente.ID}</span>{_item.Incidencia.Componente.TipoComponente.Nombre}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Incidencia.Componente.ID}</span>{_item.Incidencia.Componente.Descripcion}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Incidencia.UbicacionComponente.ID}</span>{_item.Incidencia.UbicacionComponente.Nomnre}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Incidencia.CausaIncidencia.ID}</span>{_item.Incidencia.CausaIncidencia.Descripcion}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Incidencia.CausaIncidencia.OrigenFalla.ID}</span>{_item.Incidencia.CausaIncidencia.OrigenFalla.Descripcion}</Column>
                                        </Row>
                                    } } />
                            </Column>
                        </Row>
                    </Row>
                } }>
                {workMode === true ?
                    <Row>
                        <label.Entidad id="Contratista" value={labelContratista} idForm={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 10, 10]} />
                        <checkBox.CheckBox id="CerrarRegistro" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 2, 2]} />
                        <label.Fecha id="FechaInicio" idForm={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} />
                        <label.Fecha id="FechaFin" idForm={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} />
                        <DatePicker id="FechaInicioReal" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <DatePicker id="FechaFinReal" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <input.Text id="Observaciones" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 12, 12]} />
                        <page.SectionList
                            id={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID}
                            parent={REPORTE_ORDEN_TRABAJO_ID}
                            icon="fas fa-clipboard-list"
                            level={1}
                            style={{ marginTop: 12 }}
                            listHeader={listHeaderOrdenTrabajoPartidas}
                            size={[12, 12, 12, 12]}
                            readonly={true}
                            hideNewButton={true}
                            items={createSuccessfulStoreObject([])}
                            mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                let model: any = form
                                    .addID()
                                    .addObject("CausaIncidencia")
                                    .addVersion()
                                    .toObject();

                                let retValue: any = undefined;
                                let e: any[] = entidades;
                                if (e && e.length > 0) {
                                    e.forEach((value: any, index: number): any => {
                                        if (value.ID === model.ID) {
                                            retValue = global.assign(value);
                                            retValue.Partida = global.assign(retValue.Partida, {
                                                IdCausaIncidencia: model.IdCausaIncidencia,
                                                CausaFalla: model.CausaIncidencia
                                            });
                                            retValue.Version = model.Version;
                                            retValue._found = true;
                                        };
                                    });
                                };

                                return retValue;
                            } }
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida.Partida}</span></Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.Componente.TipoComponente.ID}</span>{item.Incidencia.TipoComponente.Nombre}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{}</span>{}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.UbicacionComponente.ID}</span>{item.Incidencia.UbicacionComponente.Nombre}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.CausaIncidencia.ID}</span>{item.Incidencia.CausaFalla.Descripcion}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.CausaIncidencia.OrigenFalla.ID}</span>{item.Incidencia.CausaIncidencia.OrigenFalla.Descripcion}</Column>
                                    <buttons.PopOver idParent={REPORTE_ORDEN_TRABAJO_ID} idForm={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} info={item} extraData={[editFalla]} />
                                </Row>
                            } }>
                            <Row>
                                <label.Entidad id="TipoComponente" idForm={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 2, 2]} />
                                <label.Entidad id="Falla" idForm={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 2, 2]} />
                                <label.Entidad id="UbicacionFalla" idForm={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 2, 2]} />
                                <SPVCausasFallasConsulta idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                <SPVFallasOrigenConsulta id="CausaFalla" idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            </Row>
                        </page.SectionList>
                    </Row> :
                    <Row>
                        {/*
                            Aqui es la ot que genera al inicio
                        */}
                        <ContratistasTicketDDL idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[10, 10, 10, 10]} required={true} validations={[validations.required()]} />
                        <label.Entidad id="EstatusOrdenTrabajo" idForm={REPORTE_ORDEN_TRABAJO_ID} size={[2, 2, 2, 2]} />
                        <input.Text id="Observaciones" idFormSection={REPORTE_ORDEN_TRABAJO_ID} size={[12, 12, 12, 12]} />
                        <page.SectionList
                            id={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID}
                            parent={REPORTE_ORDEN_TRABAJO_ID}
                            icon="fas fa-clipboard-list"
                            level={1}
                            style={{ marginTop: 12 }}
                            listHeader={listHeaderOrdenTrabajoPartidas}
                            size={[12, 12, 12, 12]}
                            readonly={true}
                            items={createSuccessfulStoreObject([])}
                            onAddNew={() => {
                                Forms.remove(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);

                                let partidas: DataElement = Forms.getValue(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, REPORTE_ORDEN_TRABAJO_ID);
                                if (!partidas) {
                                    partidas = global.createSuccessfulStoreObject([]);
                                };

                                let ordenes: DataElement = Forms.getValue(REPORTE_ORDEN_TRABAJO_ID, config.id);
                                if (!ordenes) {
                                    ordenes = global.createSuccessfulStoreObject([]);
                                };

                                let orden: any = global.assign({ ID: idOrden, Partidas: global.getData(partidas, []) });
                                this.props.calcularPartidas(idReporte, idContratista, orden, global.getData(ordenes));
                                this.props.config.setState({ viewMode: false }, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                            } }
                            onSave={() => {
                                let partidasBP: any[] = global.getData(this.props.partidasBP, []);
                                let entidades: DataElement = global.createSuccessfulStoreObject([]);

                                let checkedIDs: number[] = [];
                                let form: EditForm = Forms.getForm(REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                                if (form.formData && form.formData.form) {
                                    for (var prop in form.formData.form) {
                                        let element: any = form.formData.form[prop];
                                        if (element && element.value === true) {
                                            let id: number = Number(prop.replace("partida_", ""));
                                            checkedIDs.push(id);
                                        };
                                    };
                                };

                                if (partidasBP && partidasBP.length) {
                                    partidasBP.forEach((value: any, index: number) => {
                                        let checked: any[] = checkedIDs.filter((id) => { return value.IdPartida === id; });
                                        if (checked && checked.length) {
                                            if (!(value.ID > 0)) {
                                                if (!(value && value.ID)) {
                                                    value.ID = entidades.getNextLowerID();
                                                }
                                            }
                                            entidades = entidades.upsertItem(value);
                                        } else {
                                            entidades = entidades.removeItem(value);
                                        }
                                    });
                                };

                                Forms.updateFormElement(REPORTE_ORDEN_TRABAJO_ID, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID, entidades);
                                this.props.config.setState({ viewMode: true }, REPORTE_ORDEN_TRABAJO_PARTIDAS_ID);
                            } }
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Incidencia.Partida}</span></Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.Componente.TipoComponente.ID}</span>{item.Incidencia.Componente.TipoComponente.Nombre}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.Componente.ID}</span>{item.Incidencia.Componente.Nombre}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.UbicacionComponente.ID}</span>{item.Incidencia.UbicacionComponente.Nombre}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.CausaIncidencia.ID}</span>{item.Incidencia.CausaIncidencia.Descripcion}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.CausaIncidencia.OrigenFalla.ID}</span>{item.Incidencia.CausaIncidencia.OrigenFalla.Descripcion}</Column>
                                </Row>
                            } }>
                            <PanelUpdate info={this.props.partidasBP}>
                                <List
                                    items={items}
                                    readonly={true}
                                    listHeader={<Column size={[12, 12, 12, 12]}>
                                        <Row>
                                            <Column size={[1, 1, 1, 1]} style={{ width: 50 }} className="list-default-header">&nbsp;</Column>
                                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
                                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo de Componente"}</Column>
                                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Componente"}</Column>
                                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Componente"}</Column>
                                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                                        </Row>
                                    </Column>}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[1, 1, 1, 1]} style={{ marginBottom: -22, marginTop: -22, width: 50 }}><checkBox.CheckBox id={"partida_" + item.IdPartida} size={[1, 1, 1, 1]} value={item.ID ? true : false} initialValue={undefined} idFormSection={REPORTE_ORDEN_TRABAJO_PARTIDAS_ID} /></Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Incidencia.Partida}</span></Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.Componente.TipoComponente.ID}</span>{item.Incidencia.Componente.TipoComponente.Nombre}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.Componente.ID}</span>{item.Incidencia.Componente.Descripcion}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.UbicacionComponente.IdUbicacionComponente}</span>{item.Incidencia.UbicacionComponente.Nombre}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.CausaIncidencia.ID}</span>{item.Incidencia.CausaIncidencia.Descripcion}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Incidencia.CausaIncidencia.OrigenFalla.ID}</span>{item.Incidencia.CausaIncidencia.OrigenFalla.Descripcion}</Column>
                                        </Row>
                                    } } />
                            </PanelUpdate>
                        </page.SectionList>
                    </Row>
                }
            </page.SectionList>
            </div>
        };
    });

    interface IUbicacionClienteProps extends React.Props<any> {
        //lote: any;
    };

    class ViewUbicacionCliente extends React.Component<IUbicacionClienteProps, {}>{
        render(): JSX.Element {
            //let lote: any = this.props.lote;
            let ml: any = config.getML();


            return <page.OptionSection
                id={REPORTE_UBICACION_ID}
                parent={config.id}

                level={1}
                icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                <Row>
                    <label.Label id="Expediente" idForm={REPORTE_UBICACION_ID} label={ml.form.Expediente.label} size={[12, 12, 12, 12]} />
                    <label.Label id="Ubicacion" idForm={REPORTE_UBICACION_ID} label={ml.form.Ubicacion.label} size={[12, 12, 12, 12]} />
                    <label.Label id="Calle" idForm={REPORTE_UBICACION_ID} label={ml.form.Calle.label} size={[12, 12, 12, 12]} />
                    <label.Label id="Prototipo" idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="Clave" idForm={REPORTE_UBICACION_ID} size={[12, 12, 12, 12]} />


                </Row>
            </page.OptionSection>
        };
    };

    //export interface IPrereportesButtonProps extends IButtonProps, page.IProps { }

    //export let PrereportesButton: any = global.connect(class extends React.Component<IPrereportesButtonProps, {}> {
    //    static props: any = (state: any) => {
    //        var retValue: any = page.props(state);
    //        return retValue;
    //    };
    //    static defaultProps: IPrereportesButtonProps = {
    //        icon: "fas fa-mobile-alt",
    //        text: "",
    //        color: "white",
    //        className: "btn btn-default-ek",
    //        iconOnly: false,
    //        inverse: false,
    //        buttonSize: "sm",
    //        visible: true,
    //        info: undefined
    //    };
    //    render(): JSX.Element {
    //        if (global.isSuccessful(this.props.entidad)) {
    //            if (global.getDataID(this.props.entidad) === -1) {
    //                return <span>
    //                    <Button keyBtn={"btnSPVPreReporteFallas"} {...this.props} id="btn_prereportes" />
    //                    <PrereportesConsulta target="btn_prereportes" />
    //                </span>
    //            }
    //        };

    //        return null;
    //    };
    //});

    //export const PrereportesConsulta: any = global.connect(class extends React.Component<consultas.IConsultaProps, {}> {
    //    static props: any = (state: any) => {
    //        var retValue: any = page.props(state);
    //        return retValue;
    //    };
    //    static defaultProps: consultas.IConsultaProps = {
    //        id: "Prereporte",
    //        remoteUrl: "base/scv/Prereportes/all",
    //        remoteMethod: HttpMethod.GET,
    //        value: undefined,
    //        initialValue: undefined,
    //        hasChanged: false,
    //        hasValidationError: false,
    //        size: [12, 12, 12, 12],
    //        setColumns: (ml: any) => {
    //            let columns: dt.IDTColumn[] = dt.createColumns(ml)
    //                .add({ data: "IdCliente", width: 10 })
    //                .add({ data: "IdPrereporte", title: "ID", width: 5 })
    //                .add({ data: "Cliente.Nombre", width: 20 })
    //                .add({ data: "Ubicacion.ClaveFormato", width: 8 })
    //                .add({ data: "Ubicacion.IdPlaza", width: 8 })
    //                .addDateTime({ data: "FechaCaptura", title: "Fecha Pre-Reporte", width: 5, order: "desc" })
    //                .add({ data: "EstatusReporte", width: 10, render: prereportes.formatEstatusReporte })
    //                .toArray();

    //            return columns;
    //        }
    //    };
    //    onRowDoubleClick(item: any): void {
    //        let encodedFilters: string = global.encodeObject({ idPrereporte: item.ID });
    //        config.dispatchEntityBase(null, "base/scv/ReportesFallas/GetBP/LoadReporte/" + encodedFilters, null, global.HttpMethod.GET);
    //    };
    //    render(): JSX.Element {
    //        return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick} />
    //    };
    //});

    ///OHSS
    export class SPVTiposComponentesConsulta extends React.Component<consultas.IConsultaProps, {}> {
        static defaultProps: consultas.IConsultaProps = {
            id: "TipoComponente",
            remoteMethod: HttpMethod.GET,
            remoteUrl: "base/scv/TiposComponentes/all",
            label: "Tipo de Componente",
            helpLabel: "Seleccione un tipo de Componente",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Clave", width: "100px" })
                    .add({ data: "Nombre", width: "350px" })
                    .add({ data: "DuracionGarantia", width: "100px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            Forms.updateFormElement(idForm, "Falla", undefined);
        };
        render(): JSX.Element {
            return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
        };
    };

    export class SPVCausasFallasConsulta extends React.Component<consultas.IConsultaProps, {}> {
        static defaultProps: consultas.IConsultaProps = {
            id: "CausaIncidencia",
            remoteMethod: HttpMethod.GET,
            remoteUrl: "base/scv/CausaIncidencias/all",
            label: "Incidencia",
            helpLabel: "Seleccione una Incidencia",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.IdCausaIncidencia,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdCausaIncidencia", width: "100px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "Abreviatura", width: "100px" })
                    .add({ data: "OrigenFalla.Clave", width: "100px" })
                    .add({ data: "OrigenFalla.Descripcion", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                return { activos: 0 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };

    export class SPVFallasOrigenConsulta extends React.Component<consultas.IConsultaProps, {}> {
        static defaultProps: consultas.IConsultaProps = {
            id: "OrigenFalla",
            remoteMethod: HttpMethod.GET,
            remoteUrl: "base/scv/CausaIncidencias/all",
            label: "Causa",
            helpLabel: "Seleccione una causa de la Incidencia",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.OrigenFalla.Clave,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.OrigenFalla.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdCausaIncidencia", width: "100px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "OrigenFalla.Clave", width: "100px" })
                    .add({ data: "OrigenFalla.Descripcion", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                return { activos: 0 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };

    export const SPVReportesClienteConsulta: any = global.connect(class extends React.Component<consultas.IConsultaProps, consultas.IConsultaProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static defaultProps: consultas.IConsultaProps = {
            remoteUrl: "base/scv/Tickets/all",
            remoteMethod: HttpMethod.GET,
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 12, 12],
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "idPrereporte", width: "100px", format: EK.UX.DataTable.formatPrereporte })
                    .add({ data: "Ubicacion.ClaveFormato", width: "100px" })
                    .add({ data: "Cliente.Nombre", width: "300px" })
                    .add({ data: "ResponsableConstruccion.Nombre", width: "300px" })
                    .add({ data: "EstatusReporte", width: "100px", format: EK.UX.DataTable.formatEstatusReporte })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            global.go([config.modulo, "pv", config.id, item.ID].join("/"));
        };
        render(): JSX.Element {
            let entidad: any = this.props.config.getEntity();
            let bi: any = () => {
                return { idCliente: global.getData(entidad).IdCliente };
            };

            return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick} beforeInvoke={bi} />
        };
    });

    interface ISPVCombinacionConsultaProps extends consultas.IConsultaProps {
        idTipoComponente?: number;
    };

    export class SPVCombinacionConsulta extends React.Component<ISPVCombinacionConsultaProps, {}> {
        static defaultProps: ISPVCombinacionConsultaProps = {
            id: "BusquedaComponente",
            label: "Buscar",
            helpLabel: "Búsqueda de componentes",
            remoteMethod: HttpMethod.GET,
            //remoteUrl: "base/scv/ReportesFallas/Get/GetComponentes/",
            remoteUrl: "base/scv/Fallas/all/",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            idTipoComponente: 0,
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "TipoComponente.ID", width: "100px" })
                    .add({ data: "TipoComponente.Clave", width: "100px" })
                    .add({ data: "TipoComponente.Nombre", width: "200px" })
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Descripcion", width: "200px" })
                    .add({ data: "Impacto.Nombre", width: "200px" })
                    .add({ data: "DuracionGarantia", width: "100px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            Forms.updateFormElement(idForm, "TipoComponente", item.TipoComponente);
            Forms.updateFormElement(idForm, "Falla", item.Falla);
        };
        render(): JSX.Element {
            let bi: any = () => {
                return { IdTipoComponente: this.props.idTipoComponente };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
        };
    };

    interface ISPVContratistasConsultaProps extends consultas.IConsultaProps {
        idPlaza?: any;
    };

    export class SPVContratistasConsulta extends React.Component<ISPVContratistasConsultaProps, {}> {
        static defaultProps: ISPVContratistasConsultaProps = {
            id: "Contratista",
            remoteUrl: "base/scv/Contratistas/all",
            remoteMethod: HttpMethod.GET,
            label: "Contratista",
            helpLabel: "Seleccione un contratista",
            value: undefined,
            initialValue: undefined,
            idPlaza: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Nombre", width: "300px", order: "asc" })
                    .add({ data: "TipoConvenio.Nombre", width: "200px" })
                    .add({ data: "Proveedor.Nombre", width: "200px" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                let idPlaza: number = this.props.idPlaza ? this.props.idPlaza : null;
                return { idPlaza };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };
    interface ISPVReincidenciasConsultaProps extends consultas.IConsultaProps {
        item?: any;
    };

    export class SPVReincidenciasConsulta extends React.Component<ISPVReincidenciasConsultaProps, ISPVReincidenciasConsultaProps> {
        constructor(props: ISPVReincidenciasConsultaProps) {
            super(props);
            let id: string = ["consulta", new Date().getTime()].join("_");
            this.state = { id };
        };
        static defaultProps: ISPVReincidenciasConsultaProps = {
            id: "Reincidencias",
            remoteUrl: "base/scv/Tickets/Get/GetReincidencias",
            remoteMethod: HttpMethod.GET,
            label: "",
            helpLabel: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            item: undefined,
            size: [12, 12, 12, 12],
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdTicket", width: "100px" })
                    .add({ data: "Componente.Nombre", width: "300px" })
                    .add({ data: "UbicacionComponente.Nombre", width: "100px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            global.go([config.modulo, "pv", config.id, item.IdTicket].join("/"));
        };
        render(): JSX.Element {
            let bi: any = () => {
                if (this.props.item) {
                    return global.assign({}, {
                        //idCliente: this.props.item.IdCliente,
                        //idTipoVivienda: this.props.item.Falla.IdTipoVivienda,
                        idTipoComponente: this.props.item.Componente.TipoComponente.ID,
                        idComponente: this.props.item.Componente.ID,
                        IdTicket: this.props.item.IdTicket
                    })
                };

                return null;
            };

            return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick} beforeInvoke={bi} />
        };
    };

    interface ISPVComponentesConsultaProps extends consultas.IConsultaProps {
        tipoComponente?: any;
        //tipoVivienda?: number;
    };

    export const SPVComponentesConsulta: any = global.connect(class extends React.Component<ISPVComponentesConsultaProps, {}> {
        static props: any = (state: any) => ({
            tipoComponente: Forms.getValue("TipoComponente", "ticket$incidencias", state)
        });
        static defaultProps: ISPVComponentesConsultaProps = {
            id: "Componente",
            remoteUrl: "base/scv/ComponentesIncidencias/all",
            remoteMethod: HttpMethod.GET,
            label: "Componente",
            helpLabel: "Seleccione un componente",
            value: undefined,
            initialValue: undefined,
            tipoComponente: undefined,
            //tipoVivienda: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "DuracionGarantia", width: "100px" })
                    .add({ data: "Impacto.Nombre", width: "100px" })
                    .add({ data: "TipoComponente.Clave", width: "100px" })
                    .add({ data: "TipoComponente.Nombre", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (!this.props.tipoComponente) {
                Forms.updateFormElement(idForm, "TipoComponente", item.TipoComponente);
            } else {
                if (this.props.tipoComponente.ID !== item.TipoComponente.ID) {
                    Forms.updateFormElement(idForm, "TipoComponente", item.TipoComponente);
                };
            };
        };
        render(): JSX.Element {
            let bi: any = () => {
                let idTipoComponente: number = this.props.tipoComponente ? this.props.tipoComponente.ID : null;


                return { idTipoComponente, activos: 0 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
        };
    });
    interface IResponsablesConstruccionDDLProps extends ddl.IDropDrownListProps {
        ubicacion?: DataElement;
    };

    export let ResponsablesConstruccionDDL: any = global.connect(class extends React.Component<IResponsablesConstruccionDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.reporte$responsables,
            ubicacion: state.global.Tickets$ubicacionSeleccionada
        });
        static defaultProps: IResponsablesConstruccionDDLProps = {
            id: "Responsable",
            items: createDefaultStoreObject([]),
            label: "Responsable de Construcción",
            helpLabel: "Responsable de Construcción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentWillReceiveProps(nextProps: IResponsablesConstruccionDDLProps): void {
            if (global.hasChanged(this.props.ubicacion, nextProps.ubicacion)) {
                if (global.isSuccessful(nextProps.ubicacion)) {
                    let ubicacion: any = global.getData(nextProps.ubicacion);
                    let encodedFilters: string = global.encodeObject({});
                    global.dispatchAsync("load::reporte$responsables", "base/kontrol/usuarios/all/" + encodedFilters);
                };

            };
        };
        componentDidMount(): void {
            global.dispatchSuccessful("load::reporte$responsables", []);
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("load::reporte$responsables", []);
            dispatchDefault("load::" + SECCION_UBICACION_SELECCIONADO, {});
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    ///Ubicacion del componente
    interface IUbicacionesComponenteProps extends ddl.IDropDrownListProps {
        componente?: any;
        //tipoVivienda?: number;
    };

    //class SPVUbicacionesComponente$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
    export const SPVUbicacionesComponente$DDL: any = global.connect(class extends React.Component<IUbicacionesComponenteProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.catalogo$ubicaciones$componentes,
            componente: Forms.getValue("Componente", "ticket$incidencias", state)



        });
        static defaultProps: IUbicacionesComponenteProps = {
            id: "UbicacionComponente",
            items: createDefaultStoreObject([]),
            label: "Ubicación Componente",
            helpLabel: "Seleccione una ubicación del Componente",
            value: createDefaultStoreObject({}),
            componente: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "IdUbicacion",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>", item.IdUbicacion, "</span> ",
                        "<span class='bold' style='font-size: 90%'>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-success bold'>", item.IdUbicacion, "</span> ",
                    "<span class='bold' style='font-size: 90%'>", item.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let componente: any = getData(this.props.componente).ID ? getData(this.props.componente).ID : -1;
                let idPrototipo: any = EK.Store.getState().global.Tickets$ubicacionSeleccionada ? EK.Store.getState().global.Tickets$ubicacionSeleccionada.data.Ubicacion.IdPrototipo : -1;;
                //let url: string = global.encodeAllURL("scv", "UbicacionesComponentes", { activos: 1, idCompontente: componente });
                //global.dispatchAsync("load::ubicaciones$componentes", url);
                let encodedFilters: string = global.encodeObject({ idPrototipo: idPrototipo });
                global.dispatchAsync("global-page-data", "base/svc/Tickets/GetBP/getUbicacionesComponente/" + encodedFilters, "ubicaciones$componentes");
            };
        };
        render(): JSX.Element {



            let e: any = global.assign({}, { ID: -2, IdUbicacion: null, Nombre: "Seleccione una opción" });
            let items: any = ddl.assignElement(this.props.items, e);

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />;
        };
    });
    export const SPVUbicacionesComponentesDDL: any = ReactRedux.connect(SPVUbicacionesComponente$DDL.props, null)(SPVUbicacionesComponente$DDL);
    //Termina ubicacion del componente
    //OHSS Termina


    interface IUbicacionModalProps extends page.IProps {
        handleClose: () => void;
        validation?: DataElement;
        emailAddress?: DataElement;
        //visible?: boolean;
    };


    interface IUbicacionModalState {
        //visible: boolean;
    };

    const UbicacionModal: any = global.connect(class extends React.Component<IUbicacionModalProps, IUbicacionModalState> {
        constructor(props: IUbicacionModalProps) {
            super(props);
            //this.state = { visible: false };
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            //retValue.validation = state.global.reporte$questions$response;
            //retValue.emailAddress = state.global.entity$reporte$email;
            //retValue.visible = state.global.catalogo$modal$ubicacion$visible;
            return retValue;
        };
        componentDidMount(): void {
            let props: IUbicacionModalProps = this.props;
            //global.dispatchDefault("global-page-entity", {}, REPORTE_EMAIL_ID);
            //global.dispatchDefault("load::reporte$questions$response", {});

            //Forms.remove(REPORTE_SECURITY_QUESTIONS_ID);
            //Forms.remove(REPORTE_EMAIL_ID);
            //Forms.updateFormElement(REPORTE_SECURITY_QUESTIONS_ID, "FechaNacimiento", global.getToday(true));

            //let modal: any = $("#ExpedienteUbicacionModal");
            //modal.modal({ backdrop: "static" });
            //modal.on('hidden.bs.modal', function () {
            //    if (props.handleClose) {
            //        props.handleClose();
            //    };
            //})
        };
        //componentWillReceiveProps(nextProps: IUbicacionModalProps): void {
        //    if (global.hasChanged(this.props.visible, nextProps.visible)) {
        //        let isVisible: any = global.getData(nextProps.visible);
        //        //if (global.isSuccessful(nextProps.validation)) {
        //            //let validation: any = global.getData(nextProps.validation);
        //            //if (validation.success === true) {
        //        this.setState({ visible: isVisible});
        //            //};
        //        //};
        //    };
        //};
        //componentDidUpdate(prevProps: IUbicacionModalProps, { }): any {
        //if (this.state.visible === false) {
        //    if (global.wasUpdated(prevProps.emailAddress, this.props.emailAddress, false)) {
        //global.success("El correo electrónico fue actualizado exitosamente.");

        //let modal: any = $("#ExpedienteUbicacionModal");
        //        modal.modal("hide");

        //};
        //};
        //onValidarClick(): void {
        //    let entidad: any = getData(this.props.entidad);
        //    let idCliente: number = !(entidad && entidad.Cliente) ? null : entidad.Cliente.ID;

        //    if (!Forms.isValid(REPORTE_SECURITY_QUESTIONS_ID)) {
        //        global.warning("Los datos están incompletos, verificar campos requeridos y validaciones");
        //        return;
        //    };

        //    let item: any = Forms.getForm(REPORTE_SECURITY_QUESTIONS_ID);
        //    let questions: any = {};
        //    questions["FechaNacimiento"] = new Date(item.FechaNacimiento).toISOString();
        //    questions["DireccionVivienda"] = new String(item.DireccionVivienda);
        //    questions["AnioCompra"] = new Number(item.AnioCompra.Clave);

        //    global.dispatchAsyncPost("load::reporte$questions$response", "base/scv/ReportesFallas/GetBP/ValidateSecurityQuestions", { idCliente, questions });
        //};
        onDoubleClick(item: any) {
            //let item: any = getData(this.props.entidad);
            //let idCliente: number = !(entidad && entidad.Cliente) ? null : entidad.Cliente.ID;

            //if (!Forms.isValid(REPORTE_EMAIL_ID)) {
            //    global.warning("Los datos están incompletos, verificar campos requeridos y validaciones");
            //    return;
            //};

            //let form: EditForm = Forms.getForm(REPORTE_EMAIL_ID);
            //let item: any = form
            //    .addNumberConst("IdCliente", idCliente)
            //    .addString("Contacto", "EmailNuevo")
            //    .toObject();

            //global.dispatchAsyncPut("global-page-entity", "base/scv/ReportesFallas/Get/SaveEmailGarantias", item, REPORTE_EMAIL_ID);

            dispatchDefault("load::" + SECCION_UBICACION_SELECCIONADO, {});

            if (item.ID != null && item.ID != undefined) {
                dispatchSuccessful("load::" + SECCION_UBICACION_SELECCIONADO, item);
                //let p: any = global.assign({
                //    activos: 1,
                //    IdUbicacion: item.ID
                //});
                //dispatchAsyncPost("global-page-data", "base/kontrol/SupervisoresUbicaciones/GetBP/getSupervisoresFraccionamientos/", { parametros: p }, SECCION_SUPERVISORES_ID);
                //dispatchAsyncPost("global-page-data", "base/kontrol/SupervisoresUbicaciones/GetBP/getUbicacionesFraccionamientos/", { parametros: p }, SECCION_UBICACIONES_ID);
                let items: any = EK.Store.getState().global["catalogo$" + TICKET_EXPENDIENTE_UBICACION_ID];
                EK.Global.dispatchSuccessful("global-page-data", items.data, TICKET_EXPENDIENTE_UBICACION_ID);
                let idPrototipo: any = item ? item.Ubicacion.IdPrototipo : -1;
                let encodedFilters: string = global.encodeObject({ idPrototipo: idPrototipo });
                global.dispatchAsync("global-page-data", "base/svc/Tickets/GetBP/getUbicacionesComponente/" + encodedFilters, "ubicaciones$componentes");

                Forms.updateFormElement(config.id, REPORTE_UBICACION_ID, item.Ubicacion);
                //global.dispatchSuccessful("global-page-entity", item.Ubicacion, REPORTE_UBICACION_ID);




                Forms.updateFormElement(config.id, "Expediente", item.IdExpediente);
                Forms.updateFormElement(config.id, "Ubicacion", item.Ubicacion.ClaveCorta);
                Forms.updateFormElement(config.id, "Calle", item.Ubicacion.Calle);
                //Forms.updateFormElement(REPORTE_UBICACION_ID, "Plaza", item.Ubicacion.Plaza.Nombre);
                Forms.updateFormElement(config.id, "Prototipo", item.Ubicacion.Prototipo.Nombre);

                Forms.updateFormElement(config.id, "FechaEntregaVivienda", global.formatDateTimeDirect(item.Ubicacion.FechaEntrega, true));

                //global.dispatchSuccessful("global-page-data", false, MODAL_UBICACION_ID);
            }

            let modal: any = $("#ExpedienteUbicacionModal");
            modal.modal("hide");


        };

        render(): JSX.Element {
            //let visible: boolean = this.state.visible;


            let securityHeader: any = <h6 className="modal-title" style={{ fontWeight: 600 }}>{"Seleccionar Ubicacion"}</h6>;
            //let securityFooter: any = <div className="modal-footer">{saveButton}</div>;
            let dateTimeDirect: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return global.formatDateTimeDirect(data, true);
            };



            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "IdExpediente", width: 35, title: "Expediente" })
                .addClave({ width: 35, title: "Ubicacion" })
                .add({ data: "Ubicacion.FechaEntrega", width: 35, title: "Fecha de entrega", render: dateTimeDirect })
                .toArray();

            let items = this.props.config.getCatalogo(TICKET_EXPENDIENTE_UBICACION_ID);


            //if (!visible) return <div id="ExpedienteUbicacionModal"></div>;

            return <modal.Modal id="ExpedienteUbicacionModal" header={securityHeader} style={{ height: "auto" }}  >
                <dt.DataTableExt columns={columns} data={items} onRowDoubleClick={this.onDoubleClick.bind(this)} />
            </modal.Modal>
        };
    });
};

import tickets = EK.Modules.SCV.Pages.postventa.Tickets;