namespace EK.Modules.SCV.Pages.postventa.RUBA.ReversarEntregaUbicacion {
    const PAGE_ID: string = "ReversarEntregaUbicacion";
    const UBICACION_ID: string = PAGE_ID +"$ubicacion";
    const UBICACION_DETALLE_ID: string = PAGE_ID + "$ubicacion$detalle";
    const CLIENTE_ETAPA_ID: string = PAGE_ID + "$cliente$etapa";
    const ACT_REVERSAR_ENTREGA_ID: string = PAGE_ID + "$actReversarEntrega"; 
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [UBICACION_ID, UBICACION_DETALLE_ID, CLIENTE_ETAPA_ID ] );

    class ViewState {
        public allowReversar: boolean;
        public viewMode: boolean;
        constructor(state?: any) {
            if (state) {
                this.allowReversar = state.allowReversar;
                this.viewMode =  state.viewMode;
            }
        };
    };

    interface IConfigEntregaViv extends page.IProps {

    };

    export const Vista: any = global.connect(class extends React.Component<IConfigEntregaViv, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        componentWillMount() {
            global.dispatchFullSuccessful("global-page-entity", {}, UBICACION_ID);
            global.dispatchFullSuccessful("global-page-entity", {}, UBICACION_DETALLE_ID);
            global.dispatchFullSuccessful("global-page-entity", {}, CLIENTE_ETAPA_ID);
            global.dispatchFullSuccessful("global-page-entity", {}, ACT_REVERSAR_ENTREGA_ID);
            Forms.updateFormElement("Cliente", config.id);
        }

        componentWillUnmount() {
            global.dispatchFullSuccessful("global-page-entity", {}, UBICACION_ID);
            global.dispatchFullSuccessful("global-page-entity", {}, UBICACION_DETALLE_ID);
            global.dispatchFullSuccessful("global-page-entity", {}, CLIENTE_ETAPA_ID);
            global.dispatchFullSuccessful("global-page-entity", {}, ACT_REVERSAR_ENTREGA_ID);
            Forms.updateFormElement("Cliente", config.id);
            
        }

        onFilter(props: any, filters: any, type?: string): void { };
        onEntitySaved(props: page.IProps): void {
            let state: ViewState = new ViewState();
            state.allowReversar = false;
            state.viewMode = true
            props.config.setState(state);
        };
        onEntityLoaded(props: page.IProps): void { };

        onWillEntityLoad(id: any, props: page.IProps): void {
            global.setCurrentEntity({});
            let state: ViewState = new ViewState();
            state.allowReversar = false;
            state.viewMode  = true
            props.config.setState(state);
        };

        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowNew={false}
                allowEdit={false}
                allowDelete={false}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                onFilter={this.onFilter.bind(this)}>
                <PageButtons>
                    <ReversarButton />
                </PageButtons>
                <View />
            </page.Main>
        };
    });

    interface IProps extends React.Props<any> {

    }

    interface IState {
        viewMode?: boolean;
    }

    interface IConsultaViviendaEntregableProps extends page.IProps {
        ubicacion?: global.DataElement;
        cliente?: global.DataElement;
        clienteEtapa?: global.DataElement;
        ubicacionDetalle?: global.DataElement;
        obtenerLote?: (idLote: number) => void;
        obtenerEtapa?: (idLote: number) => void;
        actReversarEntrega?: any;
    };

    interface ConsultaViviendaEntregableState {
    };

    let View: any = global.connect(class extends React.Component<IConsultaViviendaEntregableProps, {}> {

        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.cliente = Forms.getDataValue("Cliente", config.id, state);
            retValue.ubicacion = state.global["entity$" + UBICACION_ID];
            retValue.ubicacionDetalle = state.global["entity$" + UBICACION_DETALLE_ID];
            retValue.clienteEtapa = state.global["entity$" + CLIENTE_ETAPA_ID];
            retValue.actReversarEntrega = state.global["entity$" +ACT_REVERSAR_ENTREGA_ID];
            return retValue;
        };

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerLote: (idLote: number): void => {
                let encodedFilters: string = global.encodeObject({ id: idLote });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, UBICACION_ID);
            },
            obtenerEtapa: (argIdCliente: number): void => {
                let fecha: Date = new Date();
                let encodedFilters: string = global.encodeObject({ idCliente: argIdCliente, fechaReporte : fecha.toISOString()});
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetClienteEtapa/" + encodedFilters, CLIENTE_ETAPA_ID);
            }
        }); 

        componentDidMount(): void {
            let state: ViewState = new ViewState(global.getData(this.props.state));
            state.allowReversar = true;
            state.viewMode = true;
            this.props.config.setState(state);
        };

        componentWillReceiveProps(nextProps: IConsultaViviendaEntregableProps): void {
            if (hasChanged(this.props.cliente, nextProps.cliente) && global.getDataID(this.props.cliente) !== global.getDataID(nextProps.cliente)) {
                let idCliente: any = global.getDataID(nextProps.cliente) && global.getDataID(nextProps.cliente) != undefined && global.getDataID(nextProps.cliente) != null ? global.getDataID(nextProps.cliente) : 0;
                let cliente: any = global.getData(nextProps.cliente);
                let idUbicacion: any = cliente.IdUbicacion != null && cliente.IdUbicacion != undefined ? cliente.IdUbicacion : 0;
                if (idCliente > 0) {
                    this.props.obtenerLote(idUbicacion);
                    this.props.obtenerEtapa(idCliente);
                    let fechaIncial: any = new Date('1990-01-01');
                    let fechaFinal: any = new Date();
                    let p: any = global.assign({
                        Plaza: -2,
                        Fraccionamiento: -2,
                        Vocaciones: -2,
                        FechaInicial: fechaIncial,
                        FechaFinal: fechaFinal,
                        Opcionales: "VerViviendaEnt",
                        Cliente: idCliente
                    });
                    global.dispatchAsyncPost("global-page-entity", "base/kontrol/CapturaFechaConstruccion/GetBP/GetFechaConstruccion/", { parametros: p }, UBICACION_DETALLE_ID);
                } else {
                    global.dispatchFullSuccessful("global-page-entity", {}, UBICACION_ID);
                    global.dispatchFullSuccessful("global-page-entity", {}, UBICACION_DETALLE_ID);
                    global.dispatchFullSuccessful("global-page-entity", {}, CLIENTE_ETAPA_ID);
                };
            };

            if (hasChanged(this.props.actReversarEntrega, nextProps.actReversarEntrega) && global.isSuccessful(nextProps.actReversarEntrega)) {
                let item: any = getData(nextProps.actReversarEntrega);
                switch (item.Estado) {
                    case 3: 
                        success("La entrega de la vivienda fue reversada con Éxito");
                        global.dispatchFullSuccessful("global-page-entity", {}, UBICACION_ID);
                        global.dispatchFullSuccessful("global-page-entity", {}, UBICACION_DETALLE_ID);
                        global.dispatchFullSuccessful("global-page-entity", {}, CLIENTE_ETAPA_ID);
                        Forms.reset(config.id)
                        break;
                    default:
                        break;
                }
            }

        };


        componentDidUpdate(prevProps: IConsultaViviendaEntregableProps, {}) {
            if (isSuccessful(this.props.clienteEtapa)) {
                if (hasChanged(prevProps.clienteEtapa, this.props.clienteEtapa)) {
                    let contador: any;
                    contador = $('.counter');
                    if (contador.length > 0) {
                        contador.counterUp();
                    }

                }
            }
        }



        shouldComponentUpdate(nextProps: IConsultaViviendaEntregableProps, nextState: IConsultaViviendaEntregableProps): any {
            return hasChanged(this.props.ubicacion, nextProps.ubicacion) || hasChanged(this.props.ubicacionDetalle, nextProps.ubicacionDetalle) || hasChanged(this.props.clienteEtapa, nextProps.clienteEtapa); 
        }

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
            }
            let badgeAntiguo: string = "badge badge-info";
            let supervisionExterna: number = undefined;
            let lote: any = global.getData(this.props.ubicacion);
            let clienteEtapa: any = global.getData(this.props.clienteEtapa);
            let ubicacionDetalle: any = global.getData(this.props.ubicacionDetalle);

            let diasEntrega: any = 0;
            let mesesEntrega: any = 0;
            let reportesFalla: any = 0;

            diasEntrega = clienteEtapa.MesesTranscurridos ? clienteEtapa.MesesTranscurridos : 0; 
            mesesEntrega = clienteEtapa.MesesTranscurridosEntrega ? clienteEtapa.MesesTranscurridosEntrega : 0;
            if (ubicacionDetalle.length > 0) {
                reportesFalla = ubicacionDetalle[0].CantReportesFallas ? ubicacionDetalle[0].CantReportesFallas : 0; 
            }


            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    level={0}
                    icon="fas fa-undo"
                    collapsed={false} hideCollapseButton={true}>
                    <Row style={{ marginTop: "14px" }}>
                        <Column size={[12, 12, 6, 6]} style={{ marginBottom:"14px" }} >
                            <select.ClientesLotesSPV idForm={config.id} size={[12, 12, 12, 12]} required={true} validations={[validations.required()]} />
                        </Column>
                        <Column size={[12, 12, 6, 6]} >
                            <Column size={[12, 12, 4, 4]} >
                                <span className="dashboard-stat dashboard-stat-v2 red ek-sombra">
                                    <div className="visual">
                                        <i className="fas fa-home"></i>
                                    </div>
                                    <div className="details">
                                        <div className="number">
                                            <span className="counter" data-counter="counterup " data-value={diasEntrega}>{diasEntrega}</span>
                                        </div>
                                        <div className="desc"> Días desde Entrega </div>
                                    </div>
                                </span>
                            </Column>

                            <Column size={[12, 12, 4, 4]} >
                                <span className="dashboard-stat dashboard-stat-v2 red ek-sombra" style={{  backgroundColor: "rgb(241, 196, 15)" }}>
                                    <div className="visual">
                                        <i className="fas fa-home"></i>
                                    </div>
                                    <div className="details">
                                        <div className="number">
                                            <span className="counter" data-counter="counterup " data-value={mesesEntrega}>{mesesEntrega}</span>
                                        </div>
                                        <div className="desc"> Meses desde Entrega </div>
                                    </div>
                                </span>
                            </Column>
                            <Column size={[12, 12, 4, 4]} >
                                <span className="dashboard-stat dashboard-stat-v2 green ek-sombra" >
                                    <div className="visual">
                                        <i className="far fa-eye"></i>
                                    </div>
                                    <div className="details">
                                        <div className="number">
                                            <span className="counter" data-counter="counterup counter" data-value={reportesFalla}>{reportesFalla}</span>
                                        </div>
                                        <div className="desc"> Reportes de Falla </div>
                                    </div>
                                </span>
                            </Column>
                        </Column>
                    </Row>
                    <Row style={{ marginTop: "-14px" }}>
                        <Column size={[12, 12, 6, 6]} style={{ paddingTop: 10 }}>
                            <ViewUbicacionCliente lote={lote} />
                        </Column>
                        <Column size={[12, 12, 6, 6]} style={{ paddingTop: 10 }}>
                            <ViewUbicacionDetalle lote={lote} ubicacionDetalle={ubicacionDetalle} clienteEtapa={clienteEtapa}  />
                        </Column>
                    </Row>
                </page.OptionSection>
            </Column>;
        }
    });

    interface IUbicacionClienteProps extends React.Props<any> {
        lote: any;
        ubicacionDetalle?: any;
        clienteEtapa?: any;
    };

    class ViewUbicacionCliente extends React.Component<IUbicacionClienteProps, {}>{
        render(): JSX.Element {
            let lote: any = this.props.lote;
            return <page.OptionSection
                id={UBICACION_ID}
                parent={config.id}
                subTitle={<span style={{ marginLeft: 5 }}>
                    <span className="badge badge-info bold">{lote.ClaveFormato}</span>
                </span>}
                level={1}
                icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                <Row>
                    <label.Label id="Calle" idForm={UBICACION_ID} size={[12, 12, 12, 12]} />
                    <label.Entidad id="Desarrollo" idForm={UBICACION_ID} size={[12, 12, 12, 12]} value={() => {
                        return !lote || !lote.Desarrollo ? "" : (!lote.DesarrolloClave ? "" : "<span class='badge badge-info'>" + lote.DesarrolloClave + "</span> ") + (!lote.Desarrollo.Nombre ? "" : lote.Desarrollo.Nombre);
                    }} />
                    <label.Entidad id="Plaza" idForm={UBICACION_ID}  size={[12, 12, 12, 12]} />
                    <label.Entidad id="Segmento" idForm={UBICACION_ID} size={[12, 12, 12, 12]} />
                    <label.Entidad id="Prototipo" idForm={UBICACION_ID} size={[12, 12, 12, 12]} />
                </Row>
            </page.OptionSection>
        };
    };


    class ViewUbicacionDetalle extends React.Component<IUbicacionClienteProps, {}>{
        render(): JSX.Element {
            let datos: any = this.props.ubicacionDetalle;
            let clienteEtapa: any = this.props.clienteEtapa; 
            let fechaEscrituracion: any = "";
            let fechaLiberacion: any = "";
            let fechaConstruccion: any = "";
            let fechaEntrega: any = "";
            let fechaReprogramacion: any = ""; 
            let detalleConstruccion: any = "";
            let personaEntregaVivienda: any = "";
            
            if (datos.length > 0) {
                let item: any = datos[0];
                fechaEscrituracion = global.formatDateTimeDirect(item.firma_escritura) ? global.formatDateTimeDirect(item.firma_escritura) : " ";
                fechaLiberacion = global.formatDateTimeDirect(item.fec_liberacion) ? global.formatDateTimeDirect(item.fec_liberacion) : " ";
                fechaConstruccion = global.formatDateTimeDirect(item.fecha_construccion, true) ? global.formatDateTimeDirect(item.fecha_construccion, true) : " ";
                fechaEntrega = global.formatDateTimeDirect(clienteEtapa.FechaLiberacion, true) ? global.formatDateTimeDirect(clienteEtapa.FechaLiberacion, true) : " ";
                fechaReprogramacion = global.formatDateTimeDirect(item.fecha_reprogramacion, true) ? global.formatDateTimeDirect(item.fecha_reprogramacion, true) : " ";
                detalleConstruccion = item.Detalles_construccion ? item.Detalles_construccion : " ";
                personaEntregaVivienda = item.Personaentregavivienda ? item.Personaentregavivienda : " ";  
            }

            return <page.OptionSection
                id={UBICACION_DETALLE_ID}
                parent={config.id}
                level={1}
                icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                <Row>
                    <label.Label id="firma_escritura" value={fechaEscrituracion} idForm={UBICACION_DETALLE_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="firma_liberacion" value={fechaLiberacion} idForm={UBICACION_DETALLE_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="fecha_construccion" value={fechaConstruccion} idForm={UBICACION_DETALLE_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="fecha_entrega" value={fechaEntrega} idForm={UBICACION_DETALLE_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="fecha_reprogramacion" value={fechaReprogramacion} idForm={UBICACION_DETALLE_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="Detalles_construccion" value={detalleConstruccion} idForm={UBICACION_DETALLE_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="Personaentregavivienda" value={personaEntregaVivienda} idForm={UBICACION_DETALLE_ID} size={[12, 12, 12, 12]} />
                </Row>
            </page.OptionSection>
        };
    };

    export interface IReversarButtonProps extends IButtonProps, page.IProps {
        cliente?: global.DataElement;
        ubicacion?: global.DataElement;
        ubicacionDetalle?: global.DataElement;
        clienteEtapa?: global.DataElement;
    };
    export class Reversar$Button extends React.Component<IReversarButtonProps, {}> {
        static props: any = (state: any) => ({
            state: state.global.currentEntityState,
            cliente : Forms.getDataValue("Cliente", config.id, state),
            ubicacionDetalle: state.global["entity$" + UBICACION_DETALLE_ID],
            clienteEtapa: state.global["entity$" + CLIENTE_ETAPA_ID],
            ubicacion: state.global["entity$" + UBICACION_ID]
        });
        static defaultProps: IReversarButtonProps = {
            icon: "fas fa-undo",
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
            let message: string = "Presione Confirmar para revertir la entrega de la vivienda indicada.";
            // if (getData(this.props.clienteEtapa).MesesTranscurridos > 3) {
               // EK.Global.warning('No se puede Revertir la entrega de la vivienda, porque ya pasaron mas de 3 días desde su entrega');
              //  return;
            // }
            let ubicacionDetalle: any = getData(this.props.ubicacionDetalle);
            let reportesFalla :any = ubicacionDetalle[0].CantReportesFallas ? ubicacionDetalle[0].CantReportesFallas : 0; 
            if (reportesFalla > 0) {
                EK.Global.warning('No se puede revertir la entrega de esta vivienda, porque tiene reportes de fallas');
                return;
            }
            EK.Global.confirm(message, "Revertir Entrega", (isConfirm) => {
                if (isConfirm === true) {
                    let idCliente: any = global.getDataID(this.props.cliente) && global.getDataID(this.props.cliente) != undefined && global.getDataID(this.props.cliente) != null ? global.getDataID(this.props.cliente) : 0;
                    let item: any = global.getData(this.props.cliente);

                    let model: any = {};
                    model['IdCliente'] = idCliente;
                   
                    global.dispatchAsyncPut("global-page-entity", "base/scv/EntregaUbicaciones/Get/SaveReversarEntrega/", model, ACT_REVERSAR_ENTREGA_ID);       
                };
            });
        };
        render(): JSX.Element {
            if (getData(this.props.ubicacionDetalle).length > 0) {
                return <Button {...this.props} keyBtn={"btnSPVReversarEntregav"} onClick={this.onClick.bind(this)} />;
            } else {
                return null;
            }
        };
    };
    const ReversarButton: any = ReactRedux.connect(Reversar$Button.props, null)(Reversar$Button);

};
