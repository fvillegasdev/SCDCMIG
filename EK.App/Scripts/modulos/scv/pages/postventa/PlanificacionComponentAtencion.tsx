// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.postventa.SPVPlanificacionComponent {
    "use strict";
    const PAGE_ID = "SPVPlanificacionComponentAtencion";
    const DASHBOARD_PAGE_ID: string = "SPVPlanificacionDashboard";

    //const DESARROLLO_ID = PAGE_ID + "$Desarrollo";
    const RECURSO_SELECCIONADO = "SPVPlanificacionComponent$RecursoSeleccionado";

    //const SECTION_RESOURCES_ID = PAGE_ID + "$Resources";
    //const SECTION_ACTIVIDADES_ID = PAGE_ID + "$Actividades";
    const SECTION_GRID_UBICACION: string = PAGE_ID + "$GridUbicacion";
    const SECTION_LIST_ACTIVIDADES: string = PAGE_ID + "$listActividades";
    const SECTION_ATENCION: string = PAGE_ID + "$atencionComponent";
    const SECTION_RESOURCES_ID: string = "SPVPlanificacionComponent$Resources";

    const CONFIGMODAL_ID = PAGE_ID + "$config";
    const PLANIFICACION_CALENDAR_ID = "AgendaSPVPlanificacionResource";
    const CALENDAR_STATE = "AgendaSPVPlanificacionCalendar";
    const TIPOAGENDA_STATE = PAGE_ID + "$TipoAgenda";
    const TIPOATENCION_STATE = PAGE_ID + "$TipoAtencion";
    const FORMVALUES_STATE = PAGE_ID + "$FormValues";

    const ATENCION_NEW = PAGE_ID + "$New";

    const MODAL_CHECKLIST_ID = PAGE_ID + "_ModalChecklist";

    const CHECKLIST_ITEMS_TODOS: any = "ChecklistEstandar$Todos";
    const CHECKLIST_ITEMS_TODOS_LOADDATA: any = "ChecklistEstandar$TodosLoadData";
    const CHECKLIST_ITEMS_SELECCIONADOS: any = "ChecklistEstandar$Seleccionados";
    const CHECKLIST_ITEMS_SELECCIONADOS_LOADDATA: any = "ChecklistEstandar$SeleccionadosLoadData";
    const CHECKLIST_ITEMS_SELECCIONADOS_PROGRESSBAR: any = CHECKLIST_ITEMS_SELECCIONADOS + '$PB';
   

    const BLOGPOST_SELECT_ENTITY: any = "BlogPost$SelectEntity";

    const configModal: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [SECTION_RESOURCES_ID, SECTION_GRID_UBICACION, SECTION_ATENCION, CHECKLIST_ITEMS_TODOS, CHECKLIST_ITEMS_SELECCIONADOS]);


    interface IPlanificacionComponentProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    export class PlanificacionComponentAtencionModalBase extends React.Component<IPlanificacionComponentProps, {}> {
        constructor(props: IPlanificacionComponentProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        componentWillMount() {
            global.dispatchSuccessful("global-page-data", [], SECTION_GRID_UBICACION);


            global.dispatchSuccessful("global-page-data", [], ATENCION_NEW);
            global.dispatchSuccessful("global-page-data", [], PLANIFICACION_CALENDAR_ID);
        }

        componentWillUnmount() {
            global.dispatchSuccessful("global-page-data", [], SECTION_GRID_UBICACION);



            global.dispatchSuccessful("global-page-data", [], ATENCION_NEW);
            global.dispatchSuccessful("global-page-data", [], PLANIFICACION_CALENDAR_ID);
        }

        componentDidMount(): void {
        };

        render(): JSX.Element {
            return <Column
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalPlanificacionAtencion {...this.props} />
            </Column>
        }
    };

    interface IModalPlanificacionProps extends page.IProps {
        tipoAgenda?: any;
        configModal?: any;
        recursoSeleccionado?: global.DataElement;
    };

    function getTipoTareaClave() {
        //Obtener el TipoTarea de PlanificacionDetalle
        let gridListaActividades: any = global.getData(EK.Store.getState().global["catalogo$" + "SPVPlanificacionComponentAtencion$listActividades"]);
        let tipoTareaClave: string;
        if (gridListaActividades.length > 0) {
            tipoTareaClave = gridListaActividades[0].TipoTarea.Clave;
        }
        return tipoTareaClave;
    }

    function getUbicacionID() {
        //Obtener el ID de la Ubicacion
        let gridUbicaciones: any = global.getData(Forms.getValue(SECTION_GRID_UBICACION, configModal.id));
        let idUbicacion: number;
        if (gridUbicaciones.length > 0) {
            idUbicacion = gridUbicaciones[0].ID;
        }
        return idUbicacion;
    }


    //***Modal para mostrar la información de la Planificacion ***//
    let ModalPlanificacionAtencion: any = global.connect(class extends React.Component<IModalPlanificacionProps, {}> {
        constructor(props: IModalPlanificacionProps) {
            super(props);
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalPlanificacionProps = {};
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            configModal: state.global["catalogo$" + CONFIGMODAL_ID],
            tipoAgenda: getData(state.global[TIPOAGENDA_STATE]).TipoAgenda,

        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerItem: (id: number): void => { }
        });

        componentWillReceiveProps(nextProps: IModalPlanificacionProps): any {
            if (global.hasChanged(this.props.configModal, nextProps.configModal)) {
                if (isSuccessful(nextProps.configModal)) {
                    let dataConfig: any = getData(nextProps.configModal);
                    global.setPageConfig({
                        id: dataConfig.id,
                        modulo: dataConfig.modulo,
                        slots: configModal.slots.concat(dataConfig.slots),
                        idML: dataConfig.idML
                    });
                }
            }
        };

        shouldComponentUpdate(nextProps: IModalPlanificacionProps, { }): boolean {
            return hasChanged(this.props.tipoAgenda, nextProps.tipoAgenda) ||
                hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado)
        };

        componentDidUpdate(prevProps: IModalPlanificacionProps, prevState: IModalPlanificacionProps): any {
            
        };
        onClose(): void {
            global.dispatchSuccessful("global-page-data", [], SECTION_GRID_UBICACION);
            global.dispatchSuccessful("global-page-data", [], SECTION_LIST_ACTIVIDADES);
            global.dispatchSuccessful("load::" + FORMVALUES_STATE, []);
            global.dispatchSuccessful("load::" + TIPOATENCION_STATE, []);
            let modalObject: any = $("#SPVPlanificacionComponentAtencion");
            modalObject.modal("hide");
        };
        mostrarModalChecklist(): void {

            let tipoTareaClave: string = getTipoTareaClave();
            let ubicacionID: number = getUbicacionID();
            ubicacionID = (ubicacionID == null || ubicacionID == undefined) ? -1 : ubicacionID;

            global.dispatchSuccessful(
                "global-page-data",
                {
                    bp: 'CheckList',
                    parametros: { activos: 1, tipoChecklistClave: tipoTareaClave }
                },
                CHECKLIST_ITEMS_TODOS_LOADDATA);

            
            global.dispatchSuccessful(
                "global-page-data",
                {
                    parametros: { activos: 1, OperacionEspecificaSP: 'FILTRAR_POR_ENTIDAD', modulo: 'spv', entityType: "spv$" + tipoTareaClave, entityId: ubicacionID  }
                },
                CHECKLIST_ITEMS_SELECCIONADOS_LOADDATA);
            

            //Estatus checklist
            dispatchAsync("load::ESTATUSCHECKLISTSPV", "catalogos/get(ESTATUSCHECKLISTSPV)");

            configModal.setState({ viewMode: false });

            let modalObject: any = $("#" + MODAL_CHECKLIST_ID);
            modalObject.modal();
            modalObject.css("height", "auto");
        };
        footerPersonalized(): JSX.Element {
            let state: DataElement = this.props.config.getState();

            return <div className="modal-footer">
                    <div>
                        <Button size={[2, 2, 2, 2]} className="btn btn-md"
                            style={{ backgroundColor: "#8bc780", color: "#FFFFFF" }}
                            onClick={this.mostrarModalChecklist.bind(this)}>Checklist</Button>
                        <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                    </div>
            </div>
        };
        header(title: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{title}</h6>
                </span>
            </div>
        };
        render(): JSX.Element {
            return <modal.Modal id={PAGE_ID} header={this.header("Atención")} addDefaultCloseFooter={false} footer={this.footerPersonalized()} >
                <View tipoAgenda={this.props.tipoAgenda} />
                <ModalChecklist />
            </modal.Modal>
        }
    });

    interface IView extends page.IProps {
        tipoAgenda?: any;
    }
    let View: any = global.connect(class extends React.Component<IView, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoAgenda = state.global[TIPOAGENDA_STATE];
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});
        
        render(): JSX.Element {
            return <Row>
                <Column size={[12, 12, 6, 6]} style={{ marginTop: "40px" }}>
                    <PlanificacionUbicacionGrid />
                    <ViewActivities/>
                </Column>
                <Column size={[12, 12, 6, 6]}>
                    <TabCalendarDetails />
                </Column>
                </Row>;
        }
    });

    interface ITabProps extends page.IProps {
    };

    let TabCalendarDetails: any = global.connect(class extends React.Component<ITabProps, ITabProps> {
        static props: any = (state: any) => ({
        });
        componentWillMount(): void {
        };
        onClose(): void {
        };
        nuevoHorario(): void {
        };
        componentDidUpdate(prevProps: ITabProps, prevState: ITabProps): any {
        };
        equalDates(d1: Date, d2: Date): boolean {
            return true;
        };
        componentWillReceiveProps(nextProps: ITabProps): void {
        };
        render(): JSX.Element {
            return <div className="tabbable-line">
                <ul className="nav nav-tabs ">
                    <li id="tab1" className="active">
                        <a href="#tab_11" data-toggle="tab" aria-expanded="true"> Atender </a>
                    </li>
                    <li id="tab2" className="">
                        <a href="#tab_12" data-toggle="tab" aria-expanded="true"> Calendario </a>
                    </li>
                    <li id="tab3" className="">
                        <a href="#tab_13" data-toggle="tab" aria-expanded="false"> Historial </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="tab_11">
                        <ViewAtencionComponent/>
                    </div>
                    <div className="tab-pane " id="tab_12">
                        <ViewCalendar/>
                    </div>
                    <div className="tab-pane" id="tab_13">
                        <PlanificacionComponentViewTaskModal/>
                    </div>
                </div>
            </div>;
        };
    });

    let PlanificacionUbicacionGrid: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        }

        shouldComponentUpdate({ }, { }): boolean {
            return true;
        };

        onRowDoubleClick(item: any): any {
        };

        onViewPlanificacion(item: any): void {
        };

        render(): JSX.Element {
            let ml: any = configModal.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addSelect()
                .addID({ width: "80px", title: "ID", fixed: true })
                .add({ data: "Desarrollo.Nombre", title: "Desarrollo", width: "140px" })
                .add({ data: "Prototipo.Clave", title: "Prototipo", width: "140px" })
                .add({ data: "ClaveFormato", title: "Ubicación", width: "140px" })

            return <Row>
                <Column>
                    <page.SectionListExtended
                        id={SECTION_GRID_UBICACION}
                        parent={PAGE_ID}
                        idForm={PAGE_ID}
                        title={"Ubicación"}
                        icon="fa fa-table"
                        level={1}
                        onSave={null}
                        dtConfig={dtConfig}
                        hideNewButton={true}
                        size={[12, 12, 12, 12]}
                        readonly={true}
                        onRowDoubleClick={this.onRowDoubleClick}
                        items={createSuccessfulStoreObject([])}>
                    </page.SectionListExtended>
                </Column>
            </Row>;
        };
    });


    interface IViewActivities extends page.IProps {
        tipoAgenda?: any;
    }
    let ViewActivities: any = global.connect(class extends React.Component<IViewActivities, {}> {
        constructor(props: IViewActivities) {
            super(props);
            this.onSelectDetalleCita = this.onSelectDetalleCita.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoAgenda = state.global[TIPOAGENDA_STATE];
            retValue.data = state.global["catalogo$" + SECTION_LIST_ACTIVIDADES];
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});


        shouldComponentUpdate(nextProps: IViewActivities, { }): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        componentWillReceiveProps(nextProps: IViewActivities): any {
            if (global.hasChanged(this.props.data, nextProps.data)) {
                if (isSuccessful(nextProps.data)) {
                    let item: any = getData(nextProps.data);
                    if (item && item != undefined && item.length > 0) {
                        let idGrupoEntrega: any;
                        idGrupoEntrega = item[0].Ubicacion.Desarrollo.IdGrupoEntrega;
                        let parametros: string = global.encodeObject({ IdGrupo: idGrupoEntrega });
                        dispatchAsync("global-page-data", "base/scv/GruposUsuario/Get/GetGroupsDetailsUser/" + parametros, SECTION_RESOURCES_ID);
                    }
                }
            }
        };

        onSelectDetalleCita(item: any, Estatus: any): void {
            let ordenTrabajo: any = global.assign({}, item.OrdenTrabajo);
            let state: any = EK.Store.getState();
            let config: any = state.global.pageConfig;

            //Atender
            if (Estatus === "ATE") {
                if (Estatus === "ATE") {
                    Forms.reset(getData(config).id);
                    Forms.updateFormElement(getData(config).id, "ID", item.ID);
                    Forms.updateFormElement(getData(config).id, "EstatusDashboard", "ACTATN");
                    global.dispatchSuccessful("load::" + TIPOATENCION_STATE, { Estatus: "ATE" });
                };
            };

            //Reprogramados
            if (Estatus === "REP") {
                Forms.reset(getData(config).id);
                Forms.updateFormElement(getData(config).id, "ID", item.ID);
                Forms.updateFormElement(getData(config).id, "EstatusDashboard", "ACTREP");
                global.dispatchSuccessful("load::" + TIPOATENCION_STATE, { Estatus: "REP" });
            };

            //Cancelados
            if (Estatus === "CAN") {
            };

            //visualizacion
            if (Estatus === "VER") {
                //Actualizamos el Estado TIPOATENCION_STATE
                global.dispatchSuccessful("load::" + FORMVALUES_STATE, { Item: item });
                global.dispatchSuccessful("load::" + TIPOATENCION_STATE, { Estatus: "VER" });
            };
        };


        render(): JSX.Element {
            let $page: any = $ml[""];
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let IndicaActualizando: any = isSuccessful(this.props.data) ? "" : <div style={{ position: "relative", float: "none", marginTop: 50 }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={30} icon={"fas fa-sync-alt"} colorClass={"font-blue"} text={"Actualizando"} /></div>;

            let atendido: any = {
                icon: "fa fa-check",
                info: "",
                titulo: "Atender Cita",
                style: "color: #8bc780",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelectDetalleCita(item, "ATE");
                }
            };
            //
            let reprogramado: any = {
                icon: "icon-loop",
                info: "",
                titulo: "Reprogramar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let p: any = global.assign({
                        Motivo: "REP",
                        Uso: "Contratista"
                    });
                    this.onSelectDetalleCita(item, "REP");
                }
            };
            //
            let verInformacion: any = {
                icon: "fa fa-list-alt",
                info: "",
                titulo: "Ver Información",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelectDetalleCita(item, "VER");
                }
            };

            let reservedInformation: any = {
                icon: "fas fa-layer-group",
                info: "",
                titulo: "Reservado",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    EK.Global.info("Esta planificación es de tipo RESERVA ");
                }
            };
            //
            let cancelado: any = {
                icon: "far fa-calendar-times",
                info: "",
                titulo: "Cancelar",
                color: "#df0707",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {

                }
            };
            //
            let edit: any = {
                icon: "icon-pencil",
                titulo: "Editar",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    global.fixJsonDates(item);

                    Forms.remove(id);
                    Forms.updateFormElements(id, item);

                    config.setEntity(item, id);
                    config.setState({ viewMode: false }, id);
                }
            };

            return <Row>
                {IndicaActualizando ? IndicaActualizando :
                    <Column style={{ paddingLeft: "30px", paddingRight: "30px" }} size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={SECTION_LIST_ACTIVIDADES}
                            level={1}
                            subTitle={"Actividades"}
                            icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                            <div>
                        <List
                            items={getData(this.props.data)}
                            readonly={true}
                            listMode="literal"
                            addRemoveButton={false}
                            dragAndDrop={false}
                            horizontalScrolling={false}
                            height={"auto"}
                            listHeader={
                                        <Column size={[12, 12, 12, 12]}>
                                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"ID"}</Column>
                                            <Column size={[3, 3, 3, 3]} className="list-default-header">{"Fecha"}</Column>
                                            <Column size={[3, 3, 3, 3]} className="list-default-header">{"Hora"}</Column>
                                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Estatus"}</Column>
                                            <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                                        </Column>
                            }
                            formatter={(index: number, item: any) => {
                                return <Row style={{ marginTop: "4px" }}>
                                    <Column>
                                        <Row>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-item">
                                                <span>{item.ID}</span>
                                            </Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header" >
                                                <span>{EK.UX.Labels.formatDate(item.Fecha)}</span>
                                            </Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                                <span className="badge badge-primary">{global.formatTimePlanificacionSPV(item.DTStart) + " - " + global.formatTimePlanificacionSPV(item.DTEnd)}</span>
                                            </Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                                                <span className={"badge badge-success"} style={{ textAlign: "center", background: item.EstatusPlanificacionDet.BGColor }}>{item.EstatusPlanificacionDet ? item.EstatusPlanificacionDet.Nombre : ""}</span>
                                            </Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-default-header">&nbsp;</Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                            {(() => {
                                                switch (item.TipoTarea.Clave) {
                                                    case null: // ACTIVA
                                                    case undefined:
                                                    case "FechaConstruccion":
                                                        switch (item.EstatusPlanificacionDet.Clave) {
                                                            case "ACTATN": // ATENDIDA
                                                                return <buttons.PopOver idParent={configModal.id} idForm={SECTION_LIST_ACTIVIDADES} info={item} extraData={[verInformacion]} />;
                                                            case "ACTENP": // EN PROCESO
                                                                if (item.Recurso.ID === /*global.getCurrentUser().ID*/ 1) {
                                                                    return <buttons.PopOver idParent={configModal.id} idForm={SECTION_LIST_ACTIVIDADES} info={item} extraData={[atendido, reprogramado]} />;
                                                                } else {
                                                                    return <buttons.PopOver idParent={configModal.id} idForm={SECTION_LIST_ACTIVIDADES} info={item} extraData={[verInformacion]} />;
                                                                }
                                                            case "ACTREP": // REPROGRAMADA
                                                                return <buttons.PopOver idParent={configModal.id} idForm={SECTION_LIST_ACTIVIDADES} info={item} extraData={[verInformacion]} />;
                                                            default:
                                                                return null
                                                        }
                                                }
                                            })()}
                                            </Column>
                                        </Row>
                                    </Column>
                                </Row>;
                            }} />
                            </div>
                        </page.OptionSection>
                    </Column>
                }
            </Row>;
        }
    });

    interface IViewAtencionComponent extends page.IProps {
        tipoAgenda?: any;
        tipoAtencion?: any;
        formItems?: any;
        saveAtencion?: global.DataElement;
    }
    let ViewAtencionComponent: any = global.connect(class extends React.Component<IViewAtencionComponent, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoAgenda = state.global[TIPOAGENDA_STATE];
            retValue.tipoAtencion = state.global[TIPOATENCION_STATE];
            retValue.formItems = state.global[FORMVALUES_STATE];
            retValue.saveAtencion = state.global["catalogo$" + ATENCION_NEW];
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});

        onSaveAtencion(): void {
            let state: any = EK.Store.getState();
            if (!Forms.isValid(this.props.config.id)) {
                warning("verificar los campos obligatorios");
                return;
            }

            let estatus: any = Forms.getValue("EstatusDashboard", this.props.config.id);
            let Recurso = getData(state.global[RECURSO_SELECCIONADO]);
            Forms.updateFormElement(this.props.config.id, "Recurso", Recurso);
            let _item: EditForm = Forms.getForm(this.props.config.id);
            let _model: any = _item;

            switch (estatus) {
                case "CAN":   // POSTVENTA - ENTREGA DE VIVIENDA
                    break;
                case "ACTREP":
                    _model = _item
                        .addID()
                        .addString("EstatusDashboard")
                        .addObject("MotivoReprog")
                        .addDate("HoraInicio")
                        .addDate("HoraFin")
                        .addString("Observaciones")
                        .addObject("Recurso")
                        .toObject();
                    global.dispatchAsyncPut("global-page-data", "base/scv/PlanificacionSPV/Get/SaveAtencion", _model, ATENCION_NEW);
                    global.dispatchSuccessful("load::" + TIPOATENCION_STATE, []);
                    break;
                case "ACTATN":
                    _model  = _item
                        .addID()
                        .addString("EstatusDashboard")
                        .addString("Observaciones")
                        .toObject();
                    global.dispatchAsyncPut("global-page-data", "base/scv/PlanificacionSPV/Get/SaveAtencion", _model, ATENCION_NEW);
                    global.dispatchSuccessful("load::" + TIPOATENCION_STATE, []);
                    break;
                default:
                    return null;
            }
        };

        componentDidUpdate(prevProps: IViewAtencionComponent, prevState: IViewAtencionComponent): any {
            if (this.props.saveAtencion && wasUpdated(prevProps.saveAtencion, this.props.saveAtencion, false)) {
                let item: any = getData(prevProps.saveAtencion);
                switch (item.Estado) {
                    case 4: // eliminado con exito
                        break;
                    default:
                        global.success("Actividad Actualizada");
                        let parametros: string = global.encodeObject({ IdPlanificacion: 1 });
                        dispatchAsync("global-page-data", "base/scv/PlanificacionSPV/Get/GetPlanificacionSPVDetalle/" + parametros, "SPVPlanificacionComponentAtencion$listActividades");
                        break;
                }
            }
        };

        shouldComponentUpdate(nextProps: IViewAtencionComponent, { }): boolean {
            return hasChanged(this.props.tipoAtencion, nextProps.tipoAtencion) ||
                hasChanged(this.props.formItems, nextProps.formItems) ||
                hasChanged(this.props.saveAtencion, nextProps.saveAtencion);
        };

        componentWillReceiveProps(nextProps: IViewAtencionComponent): any {
        };

        render(): JSX.Element {
            let $page: any = $ml[""];
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let IndicaActualizando: any = isSuccessful(this.props.formItems) ? "" : <div style={{ position: "relative", float: "none", marginTop: 50 }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={30} icon={"fas fa-sync-alt"} colorClass={"font-blue"} text={"Actualizando"} /></div>;
            let TipoAtencion: any = getData(this.props.tipoAtencion);
            let ValueItem: any = getData(this.props.formItems).Item;
            let value: string = "motivo Reprogramacion";
            let item: any;
            if (TipoAtencion && TipoAtencion.Estatus) {
                    switch (TipoAtencion.Estatus) {
                        case "VER":
                            item = <Row>
                                <Column style={{ paddingLeft: "10px", paddingRight: "10px" }} size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={SECTION_ATENCION}
                                        level={1}
                                        subTitle={"Atención"}
                                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                                        <div>
                                            <label.Label id="Fecha" size={[12, 12, 6, 6]} value={global.formatDate(ValueItem.Fecha)} label="Fecha" />
                                            <label.Label id="RecursosProg" size={[12, 12, 6, 6]} value={ValueItem.Recurso.Nombre} label="Recurso" />
                                            <label.Label id="HoraInicio" size={[12, 12, 6, 6]} value={global.formatTimePlanificacionSPV(ValueItem.DTStart)} label="Hora Inicio" />
                                            <label.Label id="HoraFin" size={[12, 12, 6, 6]} value={global.formatTimePlanificacionSPV(ValueItem.DTEnd)} label="Hora Fin" />
                                            {ValueItem.IdMotivoReprogramacion > 0 ?
                                                <label.Label id="MotivoReprog" value={ValueItem.IdMotivoReprogramacion} label="Motivo Reprogramación" size={[12, 12, 6, 6]} />
                                                : null
                                            }
                                            <label.Descripcion id="Observaciones" size={[12, 12, 12, 12]} value={ValueItem.Observaciones} label="Observaciones" />
                                        </div>
                                    </page.OptionSection>
                                </Column>
                            </Row>;
                            break;
                        case "REP":
                            item= <Row>
                                <Column style={{ paddingLeft: "10px", paddingRight: "10px" }} size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={SECTION_ATENCION}
                                        level={1}
                                        subTitle={"Atención"}
                                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                                        <div>
                                            <ddl.MotivosreprogDDL id="MotivoReprog" size={[12, 12, 6, 6]} validations={[validations.required()]} />
                                            <Column size={[12, 12, 6, 6]} style={{ marginTop: "15px", float: "right" }}>
                                                <ViewSPVGruposDetalle/>
                                            </Column>
                                            <DatePicker id="HoraInicio" type="datetime" size={[12, 12, 6, 6]} validations={[validations.required()]} label="Fecha Inicio" />
                                            <DatePicker id="HoraFin" type="datetime" size={[12, 12, 6, 6]} validations={[validations.required()]} label="Fecha Fin" />
                                            <input.Descripcion id="Observaciones" size={[12, 12, 6, 6]} label="Observaciones" />
                                        </div>
                                    </page.OptionSection>
                                    <div>
                                        <Button size={[2, 2, 2, 2]} className="btn btn-md btn-editing" style={{ backgroundColor: "#8bc780", color: "#FFFFFF", float: "right" }} icon="fa fa-check" onClick={this.onSaveAtencion.bind(this)}>Guardar</Button>
                                    </div>
                                </Column>
                            </Row>;
                            break;
                        case "ATE":
                            item = <Row>
                                <Column style={{ paddingLeft: "10px", paddingRight: "10px" }} size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={SECTION_ATENCION}
                                        level={1}
                                        subTitle={"Atención"}
                                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                                        <div>
                                            <input.Descripcion id="Observaciones" size={[12, 12, 6, 6]} label="Observaciones" />
                                        </div>
                                    </page.OptionSection>
                                    <div>
                                        <Button size={[2, 2, 2, 2]} className="btn btn-md btn-editing" style={{ backgroundColor: "#8bc780", color: "#FFFFFF", float: "right" }} icon="fa fa-check" onClick={this.onSaveAtencion.bind(this)}>Guardar</Button>
                                    </div>
                                </Column>
                            </Row>;
                            break;
                        default:
                            item = <div>
                            </div>;
                                break;
            }
            }
            return <div>{item}</div>;
        }
    });

    interface IViewCalendarProps extends page.IProps {
        recursoSeleccionado?: global.DataElement;
        actividades?: global.DataElement;
        updatedActivitiesForm?: EditForm;
        tipoAgenda?: EditForm;
    };


    let ViewCalendar: any = global.connect(class extends React.Component<IViewCalendarProps, IViewCalendarProps> {
        constructor(props: IViewCalendarProps) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.recursoSeleccionado = state.global[RECURSO_SELECCIONADO];
            retValue.tipoAgenda = getData(state.global[TIPOAGENDA_STATE]).TipoAgenda;
            return retValue;
        };

        shouldComponentUpdate(nextProps: IViewCalendarProps, { }): boolean {
            return hasChanged(this.props.recursoSeleccionado, nextProps.recursoSeleccionado);
        };

        onClickEventProp(calEvent: any, jsEvent: any, view: any): any {
            alert("alerta Metodo onClickEventProp Propiedad");
        };

        onClickSelectProp(startDate: any, endDate: any, jsEvent: any, view: any): any {
            let state: any = EK.Store.getState();
            let config: any = state.global.pageConfig;
            let fechaInicial: Date = new Date(startDate);
            let fechaFinal: Date = new Date(endDate);
            let nuevaFechaInicial: Date = new Date(fechaInicial.getTime() + (fechaInicial.getTimezoneOffset() * (1 * 60000)));
            let nuevaFechaFinal: Date = new Date(fechaFinal.getTime() + (fechaFinal.getTimezoneOffset() * (1 * 60000)));
            let fechaActual: Date = new Date();

            if (nuevaFechaInicial.getTime() <= fechaActual.getTime()) {
                EK.Global.warning("Error en selección de fecha", "Seleccione por favor una fecha y hora mayor a la actual");
                return;
            };

            if (!this.props.recursoSeleccionado) {
                global.warning("Seleccione un Recurso. Por favor intente nuevamente.");
                return;
            }

            EK.Global.confirm("Presione para confirmar", "Estas seleccionando la fecha \n\n" + global.formatDateTimeDirect(nuevaFechaInicial, true) + " - " + global.formatTimePlanificacionSPV(nuevaFechaFinal), () => {
                Forms.updateFormElement(getData(config).id, "HoraInicio", nuevaFechaInicial);
                Forms.updateFormElement(getData(config).id, "HoraFin", nuevaFechaFinal);
            });
        };


        render(): JSX.Element {
            return <div>
                <SPVPlanificacionComponent.ViewCalendarPlanificacion
                    onClickEventProp={this.onClickEventProp.bind(this)}
                    onClickSelectProp={this.onClickSelectProp.bind(this)}/>
            </div>;
        };
    });




    interface IModalChecklistProps extends page.IProps {

    };

    const listHeaderTodos: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[10, 10, 10, 10]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    const listHeaderSeleccionados: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 7, 7]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    //***Modal para mostrar checklist ***//
    let ModalChecklist: any = global.connect(class extends React.Component<IModalChecklistProps, {}> {
        constructor(props: IModalChecklistProps) {
            super(props);
            this.onClickCommentsButton = this.onClickCommentsButton.bind(this);
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalChecklistProps = {};
        static props: any = (state: any) => ({

        });

        componentDidMount(): void {
        }

        componentWillReceiveProps(nextProps: IModalChecklistProps): any {
        };

        shouldComponentUpdate(nextProps: IModalChecklistProps, { }): boolean {
            return false;
        };

        componentDidUpdate(prevProps: IModalChecklistProps, prevState: IModalChecklistProps): any {
        };
        onClose(): void {
            configModal.setState({ viewMode: true });

            let modalObject: any = $("#" + MODAL_CHECKLIST_ID);
            modalObject.modal("hide");
        };
        onSave(): void {
            let items: any = global.getData(Forms.getValue(CHECKLIST_ITEMS_SELECCIONADOS, configModal.id));
            
            //Obtener y asignar valores de los progressbar
            /*items.forEach(function (value, index) {
                let totalAvance: any = Forms.getValue(CHECKLIST_ITEMS_SELECCIONADOS_PROGRESSBAR + index, DASHBOARD_PAGE_ID);
                let totalAvanceNumerico: number = totalAvance ? parseInt(totalAvance) : null;

                if (value.ID >= 0) {
                    if (value.TotalAvance != totalAvanceNumerico && value._eliminado != true) {
                        value.TotalAvance = totalAvanceNumerico;
                        value._modificado = true;
                    }
                }
                else {
                    value.TotalAvance = totalAvanceNumerico;
                    delete value["_modificado"];
                }
            });*/
            
            dispatchAsyncPut("global-page-data", "base/SCV/ChecklistsControl/Get/SaveChecklists", items, CHECKLIST_ITEMS_SELECCIONADOS);
        };
        
        onClickCommentsButton(index: number, item: any, config: any): any {
            let itemSelected: any = global.assign({}, {
                IDComponente: "QSPRcomments",
                ID: item.ID,
                Clave: item.Clave,
                Nombre: item.Nombre,
                TipoEntidad: {
                    Clave: 'svp$checklists',
                    Nombre: 'Checklists',
                }
            });

            global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY);

            config.setState({ viewMode: false });
        }
        onClickFilesButton(index: number, item: any, config: any): any {
            let itemSelected: any = global.assign({}, {
                IDComponente: "QSPRfiles",
                ID: item.ID,
                Clave: item.Clave,
                Nombre: item.Nombre,
                TipoEntidad: {
                    Clave: 'svp$checklists',
                    Nombre: 'Checklists',
                }
            });

            global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY);

            config.setState({ viewMode: false });
        }
        getCommentsButtton(index: number, item: any, config: any): JSX.Element {
            return item.ID >= 0 ? <button
                id={'ActionButton_' + index} key={"wbs-action-" + index}
                className="wbs-button" title={'Comentarios'}
                onClick={(e) => {
                    e.stopPropagation();
                    this.onClickCommentsButton(index, item, config)
                }}>
                <i className={'fas fal fa-comment'}></i>
                <span style={{ float: "right", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{item.TotalComentarios}</span>
            </button> : null;
        }
        getFilesButtton(index: number, item: any, config: any): JSX.Element {
            return item.ID >= 0 ? <button
                id={'ActionButton_Files_' + index} key={"wbs-action-Files-" + index}
                className="wbs-button" title={'Archivos'}
                onClick={(e) => {
                    e.stopPropagation();
                    this.onClickFilesButton(index, item, config)
                }}>
                <i className={'fas fal fa-file-alt'}></i>
                <span style={{ float: "right", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{item.TotalArchivos}</span>
            </button> : null;
        }
        removeSelectedItem: any = {
            icon: "fa fa-trash",
            titulo: "Eliminar",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                let element: DataElement = Forms.getValue(id, idParent);

                let withRemovedItem = element.removeItem(item);

                //Actualizar estado formulario
                Forms.updateFormElement(idParent, id, withRemovedItem);
            }
        }
        getProgressBarBGColor(index: number, item: any): any {
            let OKColor: string = '#85c680';
            let WarningColor: string = '#fbf647';
            let DangerColor: string = '#ed5565';
            let color: string;

            if (item.FechaCompromiso) {
                let now: any = new Date();
                let today: any = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                if (item.FechaCompromiso < today) {
                    color = DangerColor;
                }
                else {
                    color = OKColor;
                }
            }
            else {
                color = WarningColor;
            }
            return color;
        }
        footerPersonalized(): JSX.Element {
            return <div className="modal-footer">
                <div>
                    <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                    <Button size={[2, 2, 2, 2]} className="btn btn-md btn-editing" style={{ backgroundColor: "#8bc780", color: "#FFFFFF", float: "right" }} icon="fa fa-check" onClick={this.onSave.bind(this)}>Guardar</Button>
                </div>
            </div>
        };
        header(title: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{title}</h6>
                </span>
            </div>
        };
        render(): JSX.Element {
            return <div>
                <modal.Modal id={MODAL_CHECKLIST_ID}
                    header={this.header("Checklist")}
                    addDefaultCloseFooter={false}
                    footer={this.footerPersonalized()} >
                    <QuickSidePanelRight id="QSPRcomments" >
                        < EK.Modules.Kontrol.Pages.BlogPost.blogPost {...this.props} />
                    </QuickSidePanelRight>
                    <QuickSidePanelRight id="QSPRfiles" >
                        <QuickSidePanelArchivos />
                    </QuickSidePanelRight>
                    <Checklist
                        parent={configModal.id}
                        unselectedItems={CHECKLIST_ITEMS_TODOS}
                        selectedItems={CHECKLIST_ITEMS_SELECCIONADOS}
                        addSelectItemButton={true}
                        addRemoveSelectedItemButton={false}
                        getCustomRemoveButton={(index: number, item: any) => {
                            let idUsuario = global.getData(EK.Store.getState().global.app).Me.ID;
                            if ((item.TotalAvance == 0 || !item.TotalAvance) && (item.IdCreadoPor == idUsuario || !item.IdCreadoPor)) {
                                return <buttons.PopOver idParent={configModal.id} idForm={CHECKLIST_ITEMS_SELECCIONADOS} info={item} extraData={[this.removeSelectedItem]} />;
                            }
                            else {
                                return null;
                            }
                        }}
                        showUnselectedItems={true}

                        unselectedItemsHeader={<Column size={[10, 10, 10, 10]} className="list-default-header">{"Nombre"}</Column>}
                        unselectedItemsFormatter={(index: number, item: any) => {
                            return <Column size={[10, 10, 10, 10]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>;
                        }}
                        selectedItemsHeader={
                            [
                                <Column size={[10, 10, 6, 6]} key="nombre" className="list-default-header">{"Nombre"}</Column>,
                                <Column size={[10, 10, 2, 2]} key="avance" className="list-default-header">{"Avance"}</Column>,
                                <Column size={[10, 10, 1, 1]} key="estatus" className="list-default-header">{"Estatus"}</Column>,
                                <Column size={[10, 10, 1, 1]} key="revisado" className="list-default-header">{"Revisado"}</Column>,
                                <Column size={[10, 10, 1, 1]} key="botones" className="list-default-header">&nbsp;</Column>,
                                <Column size={[10, 10, 2, 2]} key="fechaculminado" className="list-default-header">{"Fecha Culminado"}</Column>,
                                <Column size={[10, 10, 2, 2]} key="culminadopor" className="list-default-header">{"Culminado Por"}</Column>,
                                <Column size={[10, 10, 2, 2]} key="fecharevisado" className="list-default-header">{"Fecha Revisado"}</Column>,
                                <Column size={[10, 10, 2, 2]} key="revisadopor" className="list-default-header">{"Revisado Por"}</Column>
                            ]
                        }
                        selectedItemsFormatter={(index: number, item: any) => {
                            return [
                                <Column size={[10, 10, 6, 6]} key={"clave"+index}>
                                    <span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{item.Nombre ? item.Nombre.trim() : ""}</span>
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"progressbar" + index}>
                                    <div id="" className="form-group" style={{ marginLeft: "5%", minHeight: "20px", paddingTop: "2px", display: "block", textAlign: "left" }}>
                                        <div style={{ width: "80%", height: "80%", position: "relative", marginLeft: "4px" }} >
                                            {item.IdFlujoAutorizacion ? <i className="fa fa-random" aria-hidden="true" style={{ position: 'absolute', marginTop: '-3px', marginLeft: '-14px' }}></i> : null}
                                                &nbsp;

                                            <span style={{ width: "80%", verticalAlign: "revert", paddingBottom: "0px", height: "7px" }}>
                                                <span className="ek10-sgp-progress-bar-small-content" style={{ height: "inherit" }}   ></span>
                                                <span className="ek10-sgp-progress-bar-small-advance" style={{ width: item.TotalAvance + '%', height: "inherit", backgroundColor: this.getProgressBarBGColor(index, item) }}></span>
                                            </span>
                                            {item.TotalAvance ? <div style={{ position: 'absolute', marginLeft: "42%", marginTop: "-8px" }}>{item.TotalAvance} %</div> : null}
                                            {item.TotalAvance && !item.FechaCompromiso ? <div style={{ marginLeft: "0px", paddingTop: "5px", fontSize: "9px" }}>Sin fecha compromiso</div> : null}
                                        </div>
                                    </div>
                                </Column>,
                                <Column size={[10, 10, 1, 1]} className="listItem-default-item" key={"estatusChecklist" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{item.EstatusChecklist ? item.EstatusChecklist.Nombre : ""}</span>
                                </Column>,
                                <Column size={[10, 10, 1, 1]} className="listItem-default-item" key={"revisado" + index}>
                                    {(item.EstatusChecklist && item.EstatusChecklist.Clave == 'FINALIZADA') ?
                                        <checkBox.CheckBox textAlign="center" property={CHECKLIST_ITEMS_SELECCIONADOS}
                                            value={item.Revisado} index={index} id={"Revisado"} idFormSection={configModal.id} />
                                        : EK.UX.Labels.ok(item.Revisado)
                                    }
                                </Column>,
                                <Column size={[10, 10, 1, 1]} key={"botones" + index}>
                                    {this.getCommentsButtton(index, item, configModal)}
                                    {this.getFilesButtton(index, item, configModal)}
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"fechaculminado" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{global.formatDate(item.FechaCulminado)}</span>
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"culminadopor" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{item.CulminadoPor ? item.CulminadoPor.Nombre : ''  }</span>
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"fecharevisado" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{global.formatDate(item.FechaRevisado)}</span>
                                </Column>,
                                <Column size={[10, 10, 2, 2]} key={"revisadopor" + index}>
                                    <span style={{ fontWeight: 300, fontSize: 10 }}>{item.RevisadoPor ? item.RevisadoPor.Nombre : ''}</span>
                                </Column>
                                ];
                        }}
                        onSelectItemValidation={(selectedItems: any, item: any) => {
                            let claveDuplicada: boolean = false;
                            selectedItems.forEach(function (val) {
                                if (val._eliminado != true && val.Clave === item.Clave) {
                                    claveDuplicada = true;
                                }
                            });

                            if (claveDuplicada) {
                                EK.Global.info("El elemento ya se encuentra seleccionado");
                            }

                            return !claveDuplicada;
                        }}
                        onSelectItemConversion={(item: any, newItem: any) => {
                            newItem.Clave = item.Clave;//Pendiente ver si van
                            newItem.Nombre = item.Nombre;//Pendiente ver si van
                            newItem.IdChecklist = item.ID;
                            newItem.TotalAvance = 0;
                            newItem.IdFlujoAutorizacion = item.IdFlujoAutorizacion;
                            newItem.FlujoAutorizacion = item.FlujoAutorizacion;
                            newItem.Modulo = "spv";
                            newItem.EntityType = "spv$" + getTipoTareaClave();
                            newItem.EntityId = getUbicacionID();
                            return newItem;
                        }}
                    />

                </modal.Modal>
            </div>
            
        }
    });

    let QuickSidePanelArchivos: any = global.connect(class extends React.Component<IQuickSidePanelRight, IQuickSidePanelRight> {
        constructor(props: IQuickSidePanelRight) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entity = state.global["catalogo$" + BLOGPOST_SELECT_ENTITY];
            return retValue;
        };
        shouldComponentUpdate(nextProps: IQuickSidePanelRight, { }): boolean {
            return global.hasChanged(this.props.entity, nextProps.entity);
        };

        render(): JSX.Element {
            let entity: any = getData(this.props.entity);
            if (!entity.ID) {
                return null;
            }

            let idEntity: number = entity.ID ? entity.ID : 0;
            let claveEntityType: number = entity.TipoEntidad.Clave ? entity.TipoEntidad.Clave : 0;

            return <KontrolFileManager title="Archivos" modulo={this.props.config.modulo} viewMode={false} multiple={true} entity={global.createSuccessfulStoreObject({ ID: idEntity })} entityType={global.createSuccessfulStoreObject([claveEntityType].join(""))} />
        };
    });
};


import PlanificacionComponentAtencionModal = EK.Modules.SCV.Pages.postventa.SPVPlanificacionComponent.PlanificacionComponentAtencionModalBase;