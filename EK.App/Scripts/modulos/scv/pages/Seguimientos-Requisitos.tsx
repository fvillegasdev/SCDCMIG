// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.SeguimientoExpedientes {
    "use strict";
    const PAGE_ID: string = "seguimientos";

    interface ISeguimientoRequisitosProps extends IBaseSeguimiento {
        obtenerSeguimientosRequisitos?: (id: number, idEtapa: number) => void;
        avanzaEtapa?: (id: number, idEtapa: number) => void;
        seguimiento?: any;
        avanzar?: any;
        requisitos?: any;
        activarEdicion?: boolean;
        global?: any;
        etapaGlobal?: any;
    }

    interface ISeguimientoRequisitosState {
        viewMode?: boolean;
        stateBotonAvanzar?: boolean;
    }

    export const SeguimientoRequisitos: any = global.connect(class extends React.Component<ISeguimientoRequisitosProps, ISeguimientoRequisitosState> {
        constructor(props: ISeguimientoRequisitosProps) {
            super(props);
            this.state = {
                viewMode: this.props.activarEdicion ? false : true,
                stateBotonAvanzar: this.props.activarEdicion ? true : false
            };
            this.onAdvanceStage = this.onAdvanceStage.bind(this);
        }

        static defaultProps: ISeguimientoRequisitosProps = {
            global: {},
            activarEdicion: false,
        };

        static props: any = (state: any): any => ({
            requisitos: state.seguimientosReducer.requisitos,
            seguimiento: state.seguimientosReducer.selected,
            etapa: state.seguimientosReducer.etapaSelected,
            avanzar: state.seguimientosReducer.avanzarEtapa,
            etapaGlobal: state.global.seguimiento$etapaGlobal
        });

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerSeguimientosRequisitos: (id: any, idEtapa: any): any => {
                dispatchAsync("scv-seguimientos-requisitos", "SCV/Seguimientos/SeguimientoRequisitos/" + id + "/" + idEtapa);
            }
        });

        onAdvanceStage(): any {
            let id: number = Number(getData(this.props.seguimiento).ID);
            let idEtapa: number = getData(this.props.etapa).IdEtapa; // cuando carga la primera vez debe traer todo los requisitos
            let viewModeAnterior: boolean = this.state.viewMode;
            let datosTransferencia = EK.Global.assign({}, {
                IdSeguimiento: id,
                IdEtapa: idEtapa
            });
            this.setState({ stateBotonAvanzar: false, viewMode: viewModeAnterior })
            dispatchAsyncPut("scv-seguimientos-avanzar-etapa", "SCV/Seguimientos/SendAuthorization/Seguimiento/Etapa", datosTransferencia);

        }

        shouldComponentUpdate(nextProps: ISeguimientoRequisitosProps, nextState: ISeguimientoRequisitosState): boolean {
            if (hasChanged(this.props.avanzar, nextProps.avanzar)) {
                return true;
            }

            if ((this.state.stateBotonAvanzar !== nextState.stateBotonAvanzar)) {
                return true;
            }

            if (hasChanged(this.props.requisitos, nextProps.requisitos)) {
                return true;
            }

            if ((this.state.viewMode !== nextState.viewMode)) {
                return true;
            }
            return false;
        }

        componentWillReceiveProps(nextProps: ISeguimientoRequisitosProps): void {
            if (hasChanged(getData(this.props.etapa).IdEtapa, getData(nextProps.etapa).IdEtapa)) {
                this.setState({ stateBotonAvanzar: nextProps.activarEdicion ? true : false });
            }
        }

        componentWillUpdate(nextProps: ISeguimientoRequisitosProps, nextState: ISeguimientoRequisitosState) {
            if (nextProps.avanzar.returnCode >= 1) {
                this.setState({ stateBotonAvanzar: nextProps.activarEdicion ? true : false });
            }

            if (hasChanged(this.props.avanzar, nextProps.avanzar)) {
                if (isSuccessful(nextProps.avanzar)) {
                    let id: number = Number(getData(this.props.seguimiento).ID);
                    dispatchAsync("scv-seguimientos-etapas", "SCV/Seguimientos/SeguimientoEtapas/" + id);
                    this.setState({ stateBotonAvanzar: false });

                    //{refrescar los seguimientos de expediente}: 14/04/2018
                    if (nextProps.avanzar.returnCode > 999) {
                        let idExpediente: number = getData(this.props.seguimiento).IdExpediente;
                        let encodedParams: string = global.encodeParameters({ idExpediente });
                        dispatchAsync("scv-seguimientos-catalogo", "SCV/Seguimientos/GetAllByParams/" + encodedParams);
                    }
                }
            }
        };

        componentWillMount(): any {
            let editView: boolean = this.state.viewMode ? false : true;
            let id: number = Number(getData(this.props.seguimiento).ID);
            let idEtapa: number = this.props.etapaGlobal.data.etapaGlobal ? this.props.etapaGlobal.data.etapaGlobal : 0; // cuando carga la primera vez debe traer todo los requisitos
            // 
            if (id > 0) {
                this.props.obtenerSeguimientosRequisitos(id, idEtapa);
            } else {
                dispatchFailed("scv-seguimientos-setSelected", null);
            }
        }

        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let editView: boolean = this.state.viewMode ? false : true;
            let botonAvanzar: boolean;
            let current: any = this.props.requisitos.data;
            let etapaSelect: any = getData(this.props.etapa);
            let existeEtapa: boolean = etapaSelect.ID ? true : false;
            let tituloEtapa: any = existeEtapa ? $page.form.section.etapas$Requisitos.tituloindividual + "   (" + etapaSelect.Etapa.Nombre + ") " : $page.form.section.etapas$Requisitos.titulototal;

            botonAvanzar = this.state.stateBotonAvanzar;
            let hideCollapseButton: boolean = isUpdating(this.props.avanzar);
            let activarBotonAvance: any = existeEtapa ? etapaSelect.EstatusEtapa.Clave === 'A' && etapaSelect.ReadOnlyKontrol === 1 ? true : false : false;

            return <page.OptionSection
                title={tituloEtapa}
                icon="fas fa-vote-yea"
                collapsed={false} level={1} readOnly={true} hideCollapseButton={hideCollapseButton}>
                <SectionButtons >
                    {isUpdating(this.props.avanzar) ? <AwesomeSpinner paddingBottom={0} paddingTop={3} size={14} icon={"fa fa-refresh"} colorClass={"font-white"} /> : false}
                    {botonAvanzar ? activarBotonAvance
                        ? <Button info={current} iconOnly={true} className="font-white" onClick={this.onAdvanceStage} style={{ marginRight: 8 }} icon="fa fa-step-forward" />
                        : false : false}
                </SectionButtons >
                <PanelUpdate info={this.props.requisitos} >
                    {!editView
                        ? <View
                            requisitos={current}
                            existeEtapa={existeEtapa}
                            activarEdicion={false}
                            />
                        : <View
                            requisitos={current}
                            existeEtapa={existeEtapa}
                            activarEdicion={true}
                            />
                    }
                </PanelUpdate>
            </page.OptionSection>
        }
    });

    interface IViewProps extends React.Props<any> {
        requisitos: any;
        existeEtapa: boolean;
        activarEdicion?: boolean;
    };

    class View extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let current: any = this.props.requisitos;

            return <FadeInColumn>
                <List
                    items={this.props.requisitos}
                    readonly={false}
                    addRemoveButton={false}
                    dragAndDrop={false}
                    itemClass={"listItem-default"}
                    listHeader={<div>
                        <Row className="list-fixed-header list-default-header" style={{ padding: "5px 0px 0px", margin: 0 }}>
                            <Column size={[9, 9, 9, 9]}>{$page.form.section.etapas$Requisitos.list.requisito}</Column>
                            <Column size={[1, 1, 1, 1]}>{$page.form.section.etapas$Requisitos.list.plazodias}</Column>
                            <Column size={[2, 2, 2, 2]}>&nbsp;</Column>
                        </Row>
                    </div>}
                    formatter={(index: number, item: any) => {
                        let info: RequisitoInfo = new RequisitoInfo();
                        info.obligatorio = item.Obligatorio;
                        info.estatusRequisitoItem = item.EstatusRequisito.Clave;
                        info.estatusEtapaItem = item.EstatusEtapa.Clave;
                        info.diasParaCulminar = item.DiasParaCulminarRequisito;
                        info.tieneVencimiento = item.TieneVencimiento;
                        info.diasVencidoRequisito = item.DiasVencidoRequisito;
                        info.diasPlazoVencimiento = item.PlazoDias;
                        info.porcentajeSensibilidadAdvertencia = 0.25; ///////////////////////   hay que crear una variable o componente general para toda la aplicacion 
                        info.colorTexto = "";
                        info.colorTextoPosibleVencimiento = "";
                        info.colorTextoRequisitoVencido = "";
                        info.colorRequisitoObligatorio = RequisitoInfo.ICONO_ITEMS_COLOR['F'];
                        info.activarAlertaPosibleEntrega = ((info.diasParaCulminar / info.diasPlazoVencimiento) <= info.porcentajeSensibilidadAdvertencia) ? true : false;
                        info.activarAlertaRequisitoVencido = (info.diasVencidoRequisito < 0) ? true : false;
                        info.estatus_etapa = info.estatusRequisitoItem === 'E' ? info.estatusRequisitoItem : info.activarAlertaPosibleEntrega ? 'X' : info.estatusRequisitoItem;
                        info.class_guadar = "btn-editing";
                        info.color_guardar = "yellow-casablanca";
                        info.estatus_etapa = (info.estatusRequisitoItem !== 'E' && info.diasParaCulminar <= 0) ? 'F' : info.estatus_etapa;
                        info.colorTexto = info.estatus_etapa
                        info.existeEtapa = this.props.existeEtapa;
                        info.activarEdicion = this.props.activarEdicion;
                        info.tipoClave = item.TipoRequisito.Clave;

                        switch (info.estatusEtapaItem) {
                            case 'C': // si la etapa esta completada no se debe marcar nada con alerta solo se debe indicar cuales se entregaron
                                info.diasParaCulminar = '';
                                info.colorTexto = 'SINMARCA';
                                info.estatus_etapa = (info.estatusRequisitoItem === 'E') ? info.estatusRequisitoItem : 'SINMARCA';
                                info.activarEdicion = false; //evitar modo edicion: 2018/03/25
                                break;
                            case 'D': // PENDIENTE DOR AUTORIZAR
                                info.diasParaCulminar = '';
                                info.colorTexto = 'SINMARCA';
                                info.estatus_etapa = (info.estatusRequisitoItem === 'E') ? info.estatusRequisitoItem : 'SINMARCA';
                                info.activarEdicion = false; //evitar modo edicion: 2018/03/25
                                break;
                            case 'A': // si la etapa esta activa aqui si hay que marcar como va cada requisito entregado, con alerta, fuera de fecha
                                info.colorTexto = info.activarAlertaPosibleEntrega ? info.estatus_etapa : 'SINMARCA';
                                break;
                            case 'P': // si la etapa esta pendiente no se debe marcar los requisitos y si se debe mostrar la cuantos dias de vencimiento tiene el requisito una vez activada la etapa
                                info.diasParaCulminar = info.diasPlazoVencimiento;
                                info.estatus_etapa = (info.estatusRequisitoItem === 'E') ? info.estatusRequisitoItem : 'SINMARCA';
                                info.colorTexto = 'SINMARCA';
                                break;
                            default:
                                info.diasParaCulminar = info.diasPlazoVencimiento;
                                info.estatus_etapa = 'SINMARCA';
                                info.colorTexto = 'SINMARCA';
                                break;
                        }

                        switch (info.estatusRequisitoItem) {
                            case 'D': // POR AUTORIZAR
                                info.activarEdicion = false; //evitar modo edicion: 2018/04/03
                                break;
                            case 'E': // ENTREGADO
                                break;
                            case 'P': // PENDIENTE
                                break;
                            case 'R': // RECHAZADO
                                break;
                            case 'U': // AUTORIZADO
                                break;
                            default:
                                break;
                        }

                        info.colorTextoPosibleVencimiento = info.estatus_etapa;
                        info.colorTextoRequisitoVencido = info.estatus_etapa;

                        if (info.activarAlertaRequisitoVencido) {
                            info.colorTextoRequisitoVencido = 'F';
                            info.colorTextoPosibleVencimiento = 'SINMARCA';
                        }

                        if (info.estatusRequisitoItem === 'E') {
                            info.colorRequisitoObligatorio = RequisitoInfo.ICONO_ITEMS_COLOR[info.colorTextoRequisitoVencido];
                        }

                        //{los requisitos tipo PROCESO no son capturables}
                        if (info.tipoClave === 'PROC') {
                            info.activarEdicion = false;
                        }

                        return <RequisitoItem index={index} item={item} info={info} />
                    } } />
            </FadeInColumn>
        }
    }
}