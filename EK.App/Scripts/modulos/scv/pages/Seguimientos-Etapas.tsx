// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.SeguimientoExpedientes {
    "use strict";
    const PAGE_ID: string = "seguimientos";
    //const PAGE_ID: string = "esquemas";
    //const PAGE_ID_SECTION_FORM_ETAPAS: string = "esquema$Etapas";

    interface ISeguimientoEtapaProps extends IBaseSeguimiento {
        obtenerSeguimientosEtapas?: (id: number) => void;
        obtenerSeguimientosEtapa?: (id: number, idEtapa: number) => void;
        seguimiento?: any;
        etapas?: any;
        isNew?: boolean;
        global?: any;
        etapaGlobal?: number;
    }

    interface ISeguimientoEtapaState {
        viewMode?: boolean;
    }

    export class cSeguimientoEtapas extends React.Component<ISeguimientoEtapaProps, ISeguimientoEtapaState> {
        constructor(props: ISeguimientoEtapaProps) {
            super(props);
            this.state = { viewMode: this.props.isNew ? false : true };
            this.onViewAll = this.onViewAll.bind(this);
        };
        // Inicialización
        static defaultProps: ISeguimientoEtapaProps = {
            global: {},
            isNew: false,
            etapaGlobal: 0
        };
        //props
        static mapProps: any = (state: any): any => {
            return {
                etapas: state.seguimientosReducer.etapas,
                seguimiento: state.seguimientosReducer.selected,
                etapaGlobal: state.global.seguimiento$etapaGlobal
            };
        };
        onViewAll(): any {
            let id: number = Number(getData(this.props.seguimiento).ID);
            let idEtapa: number = 0;
            if (id > 0) {
                global.dispatchSuccessful("load::seguimiento$etapaGlobal", { etapaGlobal: 0 });
                dispatchSuccessful("scv-seguimientos-etapas-setSelected", {});
                this.props.obtenerSeguimientosEtapa(id, idEtapa);
            }
            return;
        };
        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerSeguimientosEtapas: (id: any): any => {
                dispatchAsync("scv-seguimientos-etapas", "SCV/Seguimientos/SeguimientoEtapas/" + id);
            },
            obtenerSeguimientosEtapa: (id: any, idEtapa: any): any => {
                dispatchAsync("scv-seguimientos-requisitos", "SCV/Seguimientos/SeguimientoRequisitos/" + id + "/" + idEtapa);
                dispatchAsync("scv-seguimientos-documentos", "SCV/Seguimientos/SeguimientoDocumentos/" + id + "/" + idEtapa);
                dispatchAsync("scv-seguimientos-procesos", "SCV/Seguimientos/SeguimientoProcesos/" + id + "/" + idEtapa);
            }
        });
        shouldComponentUpdate(nextProps: ISeguimientoEtapaProps, nextState: ISeguimientoEtapaState): boolean {
            return (hasChanged(this.props.etapas, nextProps.etapas)) ||
                (this.state.viewMode !== nextState.viewMode);
        };
        componentDidMount(): any {
            // let editView: boolean = !this.state.viewMode;
            let id: number = Number(getData(this.props.seguimiento).ID);
            if (id > 0) {
                this.props.obtenerSeguimientosEtapas(id);
            } else {

                dispatchFailed("scv-seguimientos-setSelected", null);
            }
            setCurrentEntityType(PAGE_ID);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let editView: boolean = !this.state.viewMode;
            let current: any = this.props.etapas.data;
            let niveles: any;
            return <page.OptionSection
                title={$page.form.section.etapas.titulo} level={1}
                icon="fas fa-indent" collapsed={false} readOnly={true}>
                <SectionButtons >
                    <Button iconOnly={true} className="font-white" icon="fas fa-bars" visible={!editView} style={{ marginRight: "10px" }} onClick={this.onViewAll} />
                </SectionButtons >
                <PanelUpdate info={this.props.etapas} >
                    <View
                        etapas={current}
                        obtenerSeguimientosEtapa={this.props.obtenerSeguimientosEtapa} />
                </PanelUpdate>
            </page.OptionSection>
        }
    }

    interface IViewProps extends React.Props<any> {
        etapas: any;
        obtenerSeguimientosEtapa?: (id: number, idEtapa: number) => void;
    };

    class View extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
            this.onClickSelectEtapa = this.onClickSelectEtapa.bind(this);
        }

        onClickSelectEtapa(item: any): void {
            let id: number = Number(item.IdSeguimiento);
            let idEtapa: number = Number(item.IdEtapa);
            this.props.obtenerSeguimientosEtapa(id, idEtapa);
            global.dispatchSuccessful("load::seguimiento$etapaGlobal", { etapaGlobal: idEtapa });
            dispatchSuccessful("scv-seguimientos-etapas-setSelected", item);
        }

        render(): JSX.Element {
            return <FadeInColumn>
                <div className="mt-element-list">
                    <div className="mt-list-container list-default ext-1 group " style={{ borderLeft: "0px", borderBottom: "0px", borderRight: "0px" }}>
                        <TodoList items={this.props.etapas}
                            onItemClick={this.onClickSelectEtapa} />
                    </div>
                </div>
            </FadeInColumn >
        }
    }

    interface IEditProps extends React.Props<any> {
        item: any;
        isNew?: boolean;
    };

    class Edit extends React.Component<IEditProps, IEditProps> {
        constructor(props: IEditProps) {
            super(props);
        };

        refs: {
            form: any;
        };

        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let current: any = this.props.item;
            let estatus: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
            return <FadeInColumn>
                <Row>
                    <Input id={"ID"} value={current.ID} label="" visible={false} />
                    <Input
                        id={"Clave"}
                        label={$page.form.clave.label}
                        size={[12, 12, 12, 3]}
                        required={true}
                        value={current.Clave}
                        helpLabel={$page.form.clave.helplabel}
                        maxLength={25}
                        validations={[
                            validations.required($page.form.clave.validaciones.requerida)
                        ]} />
                    <TiposFinanciamientoDDL
                        id={"TipoFinanciamiento"}
                        idFormSection={PAGE_ID}
                        label={$page.form.tipoFinanciamiento.label}
                        required={true}
                        size={[12, 12, 12, 6]}
                        helpLabel={$page.form.tipoFinanciamiento.helplabel}
                        value={current.TipoFinanciamiento}
                        validations={[
                            validations.required($page.form.tipoFinanciamiento.validaciones.requerida)
                        ]} />
                    <CheckBoxStatus
                        id={"Estatus"}
                        label={$page.form.estatus.label}
                        xs={{ size: 12 }}
                        sm={{ size: 12 }}
                        md={{ size: 12 }}
                        lg={{ size: 3 }}
                        required={true}
                        value={estatus}
                        helpLabel={$page.form.estatus.helplabel}
                        disabled={false} />
                </Row>
                <Row>
                    <Input
                        id={"Nombre"}
                        label={$page.form.nombre.label}
                        size={[12, 12, 12, 12]}
                        required={true}
                        value={current.Nombre}
                        helpLabel={$page.form.nombre.helplabel}
                        maxLength={150}
                        validations={[
                            validations.required($page.form.nombre.validaciones.requerida)
                        ]} />
                </Row>

            </FadeInColumn>
        }
    }

    interface IPopoverAutorizacion extends React.Props<any> {
        superior?: any;
        responsable?: any;
        entidad?: any;
        dataManager?: StateDataManager;
        placement?: string;
    }

    export let PopoverAutorizacion: any = global.connect(class extends React.Component<IPopoverAutorizacion, {}> {
        constructor(props: IPopoverAutorizacion) {
            super(props);
            this.getSuperior = this.getSuperior.bind(this);
        }
        static props: any = (state: any) => ({
            dataManager: new StateDataManager(state.seguimientosReducer)
        });
        static defaultProps: IPopoverAutorizacion = {
            superior: createDefaultStoreObject({}),
            responsable: createDefaultStoreObject({}),
            entidad: "",
            placement: "right",
        };
        componentWillMount(): void {
            global.dispatchDefault("scv-seguimientos-responsable-superior", {}, this.props.entidad);
        }
        componentDidMount(): any {
            let responsable: any = getData(this.props.responsable);
            let idUsuario: number = responsable ? Number(responsable.IdUsuario) : 0;
            global.dispatchAsync("scv-seguimientos-responsable-superior", "posiciones/superior/" + idUsuario, this.props.entidad);
        }
        shouldComponentUpdate(nextProps: IPopoverAutorizacion, {}): boolean {
            return hasChanged(this.props.dataManager, nextProps.dataManager) ||
                hasChanged(this.props.responsable, nextProps.responsable);
        }
        getSuperior(): DataElement {
            let item: DataElement = this.props.dataManager.getById(this.props.entidad);
            if (item === null || item === undefined) {
                item = createDefaultStoreObject({});
            }
            return item;
        }
        render(): JSX.Element {
            let superior: DataElement = this.getSuperior();
            let superiorInfo: any = getData(superior);
            let responsable: any = getData(this.props.responsable);
            let content: JSX.Element = null;

            if (isSuccessful(superior)) {
                content = <span>
                    <div><span className="badge badge-success">Responsable:</span> {responsable.Nombre}</div>
                    <div><span className="badge badge-danger">Autorizador:</span> {superiorInfo.Nombre}</div>
                </span>
            }

            return <EK.UX.Popover title={"Autorización Pendiente"} content={content}
                className={"badge badge-info pull-right btn-editing ek-sombra"}
                placement={this.props.placement}>
                <p style={{ fontSize: "11px", margin: "0px" }}> Por Autorizar </p>
            </EK.UX.Popover>
        }
    });

    interface IListaDetalleProps extends React.Props<any> {
        items: any;
        isNew?: boolean;
        onItemClick?: (item: any) => void;
        values?: any;
        formatter?: (index: number, item: any) => JSX.Element;
        children?: any[];
    };

    class TodoList extends React.Component<IListaDetalleProps, IListaDetalleProps> {
        constructor(props: IListaDetalleProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };

        onClick(item: any, e: any): any {
            if (this.props.onItemClick) {
                this.props.onItemClick(item);
            }
        }

        render() {
            let $page: any = $ml[PAGE_ID];
            let current: any = this.props.items;
            let semaforo: any = {};
            let colorTarea: any = {};
            semaforo['A'] = "tarea-list"; //ACTIVO
            semaforo["C"] = "tarea-list-completado"; //COMPLETADO
            semaforo["P"] = "tarea-list-pendiente"; //PENDIENTE
            semaforo["F"] = "tarea-list-removed"; //FUERA DE FECHA 
            semaforo["X"] = "tarea-list-alerta"; //ADVERTENCIA
            semaforo['D'] = "tarea-list"; //PENDIENTE POR AUTORIZAR - ESTA IGUAL ACTIVO
            semaforo["U"] = "tarea-list"; //AUTORIZADO 
            semaforo["R"] = "tarea-list"; //RECHAZADO 

            colorTarea['A'] = "#659be0"; //ACTIVO
            colorTarea["C"] = "#A5D6A7"; //COMPLETADO
            colorTarea["P"] = "#F5F5F5"; //PENDIENTE
            colorTarea["F"] = "#fa060e"; //FUERA DE FECHA 
            colorTarea["X"] = "#ffc107"; //ADVERTENCIA
            colorTarea['D'] = "#659be0"; //PENDIENTE POR AUTORIZAR - ESTA IGUAL ACTIVO
            colorTarea["U"] = "#659be0"; //AUTORIZADO 
            colorTarea["R"] = "#659be0"; //RECHAZADO 

            return (
                <ul className="listItem">
                    {this.props.items.map(item => {
                        let estatusEtapaItem = item.EstatusEtapa.Clave;
                        let diasParaCulminar: any = item.DiasParaCulminarEtapa;
                        let diasPlazoVencimiento: any = item.PlazoVencimiento;
                        let porcentajeSensibilidadAdvertencia: number = 0.25; ///////////////////////   hay que crear una variable o componente general para toda la aplicacion 
                        let activarAlerta: boolean = ((diasParaCulminar / diasPlazoVencimiento) <= porcentajeSensibilidadAdvertencia) ? true : false;
                        let estatus_etapa: any = (estatusEtapaItem === 'A' || estatusEtapaItem === 'D') ? activarAlerta ? 'X' : estatusEtapaItem : estatusEtapaItem;
                        estatus_etapa = ((estatusEtapaItem === 'A' || estatusEtapaItem === 'D') && diasParaCulminar <= 0) ? 'F' : estatus_etapa;
                        let responsable: DataElement = createSuccessfulStoreObject(item.Posicion);
                        // let estatus_etapa: any = (estatusEtapaItem === 'A' )  ? activarAlerta ? 'X' : estatusEtapaItem : estatusEtapaItem;
                        //estatus_etapa = ((estatusEtapaItem === 'A' )  && diasParaCulminar <= 0) ? 'F' : estatus_etapa;

                        return <div key={item.ID} style={{ marginTop: 22, minHeight: 56 }}>
                            <a key={item.ID} data-id={item.ID} onClick={(e) => this.onClick(item, e)} className={"list-toggle-container collapsed"} aria-expanded="false" href={"#colapsa" + item.ID} data-toggle="collapse" >
                                {estatusEtapaItem === 'D' ? <PopoverAutorizacion responsable={responsable} entidad={"etapa"} /> : null}
                                <span className={"badge badge-default pull-left ek-sombra " + semaforo[estatus_etapa]}  >{item.Orden}</span>
                                {item.ReadOnlyKontrol === 0 ? <span className="fa fa-lock" style={{ fontSize: "18px", color: "#FF8F00 ", marginLeft: "-6px" }}></span> : false}
                                {activarAlerta ? diasParaCulminar !== 0 ?
                                    <div className="badge badge-warning pull-right  btn-editing ek-sombra" style={{ backgroundColor: colorTarea[estatus_etapa], borderBottomLeftRadius: "0px", borderTopLeftRadius: "0px", fontSize: "10px" }} >{diasParaCulminar}Días</div>
                                    : false : false}
                                <div className="list-toggle done uppercase" style={{ fontWeight: "normal", backgroundColor: "#ffffff", color: "#909090", borderColor: "#c22639", paddingLeft: "60px", marginTop: "-6px" }} > {item.Etapa.Nombre}
                                </div>
                            </a>
                            <div className="panel-collapse well well-sm collapse" id={"colapsa" + item.ID} aria-expanded="false" style={{ height: "0px", marginTop: "-6px" }}>
                                <ul>
                                    <li className="mt-list-item" style={{ borderLeftColor: colorTarea[estatus_etapa], borderLeft: "none" }} >
                                        <Row style={{ marginBottom: 20 }}>
                                            <div className="col-md-6 col-sm-6 col-xs-6 text-stat" style={{ textAlign: "center" }}>
                                                <div style={{ backgroundColor: "#fff", padding: 2}}>
                                                    <div style={{ position: "absolute", top: -4, left: -2 }}><i className="far fa-calendar" style={{ fontSize: 18, color: "#1E88E5" }}></i></div>
                                                    <div style={{ fontWeight: 600 }}>Plazo (días)</div>
                                                    <div style={{ fontWeight: 400 }}>{item.PlazoVencimiento}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-6 text-stat" style={{ textAlign: "center" }}>
                                                <div style={{ backgroundColor: "#fff", padding: 2 }}>
                                                    <div style={{ position: "absolute", top: -4, left: -2 }}><i className="fas fa-calendar-day" style={{fontSize: 18, color: "#1E88E5" }}></i></div>
                                                    <div style={{ fontWeight: 600 }}>Inicio</div>
                                                    <div style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDate(item.FechaInicio)}</div>
                                                </div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col-md-6 col-sm-6 col-xs-6 text-stat" style={{ textAlign: "center" }}>
                                                <div style={{ backgroundColor: "#fff", padding: 2 }}>
                                                    <div style={{ position: "absolute", top: -4, left: -2 }}><i className="far fa-calendar-times" style={{ fontSize: 18, color: "#F57C00" }}></i></div>
                                                    <div style={{ fontWeight: 600 }}>Vencimiento</div>
                                                    <div style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDate(item.FechaVencimiento)}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-6 text-stat" style={{ textAlign: "center" }}>
                                                <div style={{ backgroundColor: "#fff", padding: 2 }}>
                                                    <div style={{ position: "absolute", top: -4, left: -2 }}><i className="far fa-calendar-check" style={{ fontSize: 18, color: "#AED581" }}></i></div>
                                                    <div style={{ fontWeight: 600 }}>Cierre</div>
                                                    {EK.UX.Labels.formatDateYear(item.FechaCierre) != "0001" ? <div style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDate(item.FechaCierre)}</div> : null}
                                                </div>
                                            </div>
                                        </Row>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    )}
                </ul>
            );
        }
    }

    export let SeguimientoEtapas: any = ReactRedux.connect(cSeguimientoEtapas.mapProps, cSeguimientoEtapas.mapDispatchs)(cSeguimientoEtapas);
}