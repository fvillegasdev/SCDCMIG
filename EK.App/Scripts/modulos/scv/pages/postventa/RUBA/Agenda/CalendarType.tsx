namespace EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda {
    const PAGE_filtro_ID: string = "AgendaDashBoardEntregaVivienda";

    export class EstatusCalendarDashBoardInfo {
        static iconos: any = {
            'ACT': "glyphicon glyphicon-play",      //Activo - A Tiempo
            'W': "fas fa-exclamation-triangle",     //POR VENCER
            'V': "fa fa-times-circle",              //VENCIDO
            'REP': "icon-loop",                     //REPROGRAMADO
            'ATE': "fa fa-check",                   //ATENDIDAS
            'SUS': "glyphicon glyphicon-pause",     // SUSPENDIDAS 
            'CAN': "far fa-calendar-times",         // CANCELADA  
            'SINMARCA': ""                          //SIN MARCA
        };

        static iconosColor: any = {
            'ACT': "#8bc780",                       //Activo - A Tiempo
            'W': "#ff8f00",                         //POR VENCER
            'V': "#df0707",                         //VENCIDO
            'REP': "#9d9b9b",                       //REPROGRAMADO
            'SUS': "#337ab7",                       //SUSPENDIDAS
            'CAN': "#337ab7",                       //CANCELADA 
            'ATE': "#9d9b9b",                       //ATENDIDAS
            'SINMARCA': ""                          //REQUISITO VENCIDO
        };
    };

    interface ICalendarType extends page.IProps {
        item?: any;
        indicadoresAgendaEstados?: DataElement;
        TipoAgendaSeleccionada?: any;
        EstadoSeleccionado?: any;
        PlazaSeleccionada?: any;
        getIndicadores?: (TipoAgenda: any, ArgIdPlaza: any) => void;
        onclick?: () => void;
        pageId?: string;
    };

    class CalendarTypeBase$ extends React.Component<ICalendarType, ICalendarType> {
        constructor(props: ICalendarType) {
            super(props);
        };
        render(): JSX.Element {
            let tipoAgenda: any = this.props.item && this.props.item.value && this.props.item.value.Clave ? this.props.item.value.Clave : null;
            let tipoAgendaSeleccionada: any = Forms.getValue("TipoAgenda", this.props.pageId);
            let plazaSeleccionada: any = Forms.getValue("PlazaInicial", this.props.pageId);

            return <div>
                <Column size={[12, 12, 2, 2]} style={{ paddingRight: "5px", paddingLeft: "5px" }}>
                    <div className="portlet light  portlet-fit  bordered  ek-sombra " >
                        <div className="portlet-body" >
                            <CalendarDashBoardEstados TipoAgendaSeleccionada={tipoAgendaSeleccionada} PlazaSeleccionada={plazaSeleccionada} />
                        </div>
                    </div>
                </Column>
                {tipoAgenda === "EntregaVivienda" ? <AgendaDashBoardEntregaVivienda.AgendaDashBoardEntregaViviendaGeneral /> : null}
            </div>;
        };
    };
    export const CalendarTypeBase: any = ReactRedux.connect(Forms.props, null)(CalendarTypeBase$);

    let CalendarDashBoardEstados: any = global.connect(class extends React.Component<ICalendarType, {}>{
        constructor(props: ICalendarType) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any): any => ({
            indicadoresAgendaEstados: state.global.dashBoardAgendaIndicadoresEstados,
            EstadoSeleccionado: state.global.EstatusAgendaSelected
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            getIndicadores: (ArgIdTipoAgenda: any, ArgIdPlaza: any): void => {
                if (ArgIdTipoAgenda != null && ArgIdPlaza != null) {
                    ArgIdTipoAgenda = ArgIdTipoAgenda == -2 ? null : ArgIdTipoAgenda;
                    ArgIdPlaza = ArgIdPlaza === -2 ? null : ArgIdPlaza;
                    let funcionAgenda: string = EK.Store.getState().global.funcionAgenda != null && EK.Store.getState().global.funcionAgenda != undefined && EK.Store.getState().global.funcionAgenda.data != null && EK.Store.getState().global.funcionAgenda.data != undefined && EK.Store.getState().global.funcionAgenda.data.tipo != null && EK.Store.getState().global.funcionAgenda.data.tipo != undefined ? EK.Store.getState().global.funcionAgenda.data.tipo : null;

                    let p: any = global.assign({
                        activos: 1, TipoAgenda: ArgIdTipoAgenda, IdPlaza: ArgIdPlaza, FuncionAgenda: funcionAgenda,
                    });

                    global.dispatchAsyncPost("load::dashBoardAgendaIndicadoresEstados", "base/kontrol/agendaSPV/GetBP/getStateCalendarDashBoard/", { parametros: p });
                    global.dispatchSuccessful("load::EstatusAgendaSelected", { Clave: "TODOS", Nombre: 'TODOS LOS ESTADOS' });
                    global.dispatchSuccessful("load::UsuarioAgendaSelected", { ID: "TODOS", Clave: "TODOS" })
                }
            }
        });
        onClick(valor: any, e: any): void {
            e.preventDefault();
            global.dispatchSuccessful("load::EstatusAgendaSelected", { Clave: valor });
            global.dispatchSuccessful("load::UsuarioAgendaSelected", { ID: "TODOS", Clave: "TODOS" })
        };
        shouldComponentUpdate(nextProps: ICalendarType, nextState: ICalendarType): boolean {
            return hasChanged(this.props.TipoAgendaSeleccionada, nextProps.TipoAgendaSeleccionada) ||
                hasChanged(this.props.indicadoresAgendaEstados, nextProps.indicadoresAgendaEstados) ||
                hasChanged(this.props.PlazaSeleccionada, nextProps.PlazaSeleccionada) ||
                hasChanged(this.props.EstadoSeleccionado, nextProps.EstadoSeleccionado);
        };
        componentWillUpdate(nextProps: ICalendarType, {}): void {
            if (hasChanged(this.props.TipoAgendaSeleccionada, nextProps.TipoAgendaSeleccionada) || hasChanged(this.props.PlazaSeleccionada, nextProps.PlazaSeleccionada)) {
                let idTipoAgendaPROPS: any = this.props.TipoAgendaSeleccionada && this.props.TipoAgendaSeleccionada.ID ? this.props.TipoAgendaSeleccionada.ID : null;
                let idTipoAgenda: any = nextProps.TipoAgendaSeleccionada && nextProps.TipoAgendaSeleccionada.ID ? nextProps.TipoAgendaSeleccionada.ID : null;

                let idPlazaNex: any = nextProps.PlazaSeleccionada && nextProps.PlazaSeleccionada.ID ? nextProps.PlazaSeleccionada.ID : null;
                let idPlazaProps: any = this.props.PlazaSeleccionada && this.props.PlazaSeleccionada.ID ? this.props.PlazaSeleccionada.ID : null;

                if (((idTipoAgendaPROPS != idTipoAgenda) && (idTipoAgenda != -1)) || ((idPlazaNex != idPlazaProps) && (idPlazaNex != -1))) {
                    this.props.getIndicadores(idTipoAgenda, idPlazaNex);
                }
            }
        };
        render(): JSX.Element {
            let indicadores: any = getData(this.props.indicadoresAgendaEstados);
            let totalIndicador: number = 0;
            let cantidadActivas: number = 0;
            let cantidadPorVencer: number = 0;
            let cantidadVencidas: number = 0;
            let cantidadReprogramadas: number = 0;
            let CantidadSuspendidas: number = 0;
            let cantidadAtendidas: number = 0;
            let CantidadCanceladas: number = 0;
            let indicadorDeActualizacion: boolean = true;
            let funcionAgenda: string = EK.Store.getState().global.funcionAgenda != null && EK.Store.getState().global.funcionAgenda != undefined && EK.Store.getState().global.funcionAgenda.data != null && EK.Store.getState().global.funcionAgenda.data != undefined && EK.Store.getState().global.funcionAgenda.data.tipo != null && EK.Store.getState().global.funcionAgenda.data.tipo != undefined ? EK.Store.getState().global.funcionAgenda.data.tipo : null;
            if (isSuccessful(this.props.indicadoresAgendaEstados)) {
                totalIndicador = 0;
                cantidadActivas = 0;
                cantidadPorVencer = 0;
                cantidadVencidas = 0;
                cantidadReprogramadas = 0;
                CantidadSuspendidas = 0;
                cantidadAtendidas = 0;
                CantidadCanceladas = 0

                indicadorDeActualizacion = false;
                if (getData(this.props.indicadoresAgendaEstados).length > 0) {
                    cantidadActivas = getData(this.props.indicadoresAgendaEstados)[0].CantidadActivas;
                    cantidadPorVencer = getData(this.props.indicadoresAgendaEstados)[0].CantidadPorVencer;
                    cantidadVencidas = getData(this.props.indicadoresAgendaEstados)[0].CantidadVencidas;
                    cantidadReprogramadas = getData(this.props.indicadoresAgendaEstados)[0].CantidadReprogramadas;
                    CantidadSuspendidas = getData(this.props.indicadoresAgendaEstados)[0].CantidadSuspendidas;
                    cantidadAtendidas = getData(this.props.indicadoresAgendaEstados)[0].CantidadAtendidas;
                    CantidadCanceladas = getData(this.props.indicadoresAgendaEstados)[0].CantidadCanceladas;
                    totalIndicador = this.props.indicadoresAgendaEstados ? (cantidadActivas + cantidadPorVencer + cantidadVencidas + CantidadSuspendidas) : 0;
                }
            }
            let IndicaActualizando: any = indicadorDeActualizacion ? <AwesomeSpinner paddingTop={0} size={11} icon={"fas fa-sync-alt"} colorClass={"font-white"} /> : '';

            let resaltar: (parametro: string) => string = (parametro: string) => {
                let retorno = '';
                if (getData(this.props.EstadoSeleccionado).Clave === parametro || getData(this.props.EstadoSeleccionado).Clave === parametro) {
                    retorno = " indicar_seleccion";
                }
                return retorno;
            };
            return <div >
                <ol className="dd-list " style={{ marginLeft: "-15px", marginRight: "-15px" }} >
                    <li className={"dd-item dd3-item panel panel-main panel-sub10 dd3-content-ek  " + resaltar('TODOS')} data-id="209" onClick={(e) => this.onClick("TODOS", e)} style={{ cursor: "pointer" }}>
                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px" }}>{IndicaActualizando ? IndicaActualizando : totalIndicador}</span>
                        <a className="btn" onClick={(e) => this.onClick("TODOS", e)}>
                            <i className="fas fa-bars"></i> TODOS </a>
                    </li>
                    <li className={"dd-item dd3-item  dd3-content-ek  " + resaltar('ACT')} onClick={(e) => this.onClick("ACT", e)} data-id="210" style={{ cursor: "pointer" }}>
                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusCalendarDashBoardInfo.iconosColor['ACT'] }}>{IndicaActualizando ? IndicaActualizando : cantidadActivas}</span>
                        <a className="btn" >
                            <i className={EstatusCalendarDashBoardInfo.iconos['ACT']} style={{ color: EstatusCalendarDashBoardInfo.iconosColor['ACT'] }}></i> <span style={{ fontSize: "11px" }}> A Tiempo </span> </a>
                    </li>
                    <li className={"dd-item dd3-item  dd3-content-ek  " + resaltar('W')} onClick={(e) => this.onClick("W", e)} data-id="212" style={{ cursor: "pointer" }} >
                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusCalendarDashBoardInfo.iconosColor['W'] }}>{IndicaActualizando ? IndicaActualizando : cantidadPorVencer}</span>
                        <a className="btn">
                            <i className={EstatusCalendarDashBoardInfo.iconos['W']} style={{ color: EstatusCalendarDashBoardInfo.iconosColor['W'] }}></i> <span style={{ fontSize: "11px" }}> Por Vencer </span>  </a>
                    </li>
                    <li className={"dd-item dd3-item  dd3-content-ek    " + resaltar('V')} onClick={(e) => this.onClick("V", e)} data-id="213" style={{ cursor: "pointer" }}>
                        <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusCalendarDashBoardInfo.iconosColor['V'] }}>{IndicaActualizando ? IndicaActualizando : cantidadVencidas}</span>
                        <a className="btn" >
                            <i className={EstatusCalendarDashBoardInfo.iconos['V']} style={{ color: EstatusCalendarDashBoardInfo.iconosColor['V'] }}></i> <span style={{ fontSize: "11px" }}> Vencidas </span>  </a>
                    </li>
                    <li className={"dd-item dd3-item panel panel-main panel-sub10 dd3-content-ek     " + resaltar('SUS')} onClick={(e) => this.onClick("SUS", e)} data-id="212" style={{ cursor: "pointer" }}>
                        <span className="badge badge-DEFAULT pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusCalendarDashBoardInfo.iconosColor['SUS'] }}>{IndicaActualizando ? IndicaActualizando : CantidadSuspendidas}</span>
                        <a className="btn" >
                            <i className={EstatusCalendarDashBoardInfo.iconos['SUS']} ></i> <span style={{ fontSize: "11px" }}> Pausadas </span>  </a>
                    </li>

                    {/*    <li className={"dd-item dd3-item       " + resaltar('CAN')} onClick={(e) => this.onClick("CAN", e)} data-id="212" style={{ cursor: "pointer" }}>
                        <span className="badge badge-DEFAULT pull-right ek-sombra" style={{ marginTop: "7px", background: EstatusCalendarDashBoardInfo.iconosColor['CAN'] }}>{IndicaActualizando ? IndicaActualizando : CantidadCanceladas}</span>
                        <a className="btn" >
                            <i className={EstatusCalendarDashBoardInfo.iconos['CAN']} ></i> <span style={{ fontSize: "11px" }}> Canceladas </span>  </a>
                    </li>*/}

                    <li className={"dd-item dd3-item  dd3-content-ek      " + resaltar('REP')} onClick={(e) => this.onClick("REP", e)} data-id="211" style={{ cursor: "pointer" }}>
                        <span className="badge badge-DEFAULT pull-right " style={{ marginTop: "7px", background: EstatusCalendarDashBoardInfo.iconosColor['REP'] }}>{IndicaActualizando ? IndicaActualizando : cantidadReprogramadas}</span>
                        <a className="btn" >
                            <i className={EstatusCalendarDashBoardInfo.iconos['REP']} ></i> <span style={{ fontSize: "11px" }}> Reprogramadas </span>  </a>
                    </li>


                    <li className={"dd-item dd3-item  dd3-content-ek" + resaltar('ATE')} data-id="213" onClick={(e) => this.onClick("ATE", e)} style={{ cursor: "pointer" }}>
                        <span className="badge badge-success pull-right " style={{ marginTop: "7px", background: EstatusCalendarDashBoardInfo.iconosColor['ATE'] }}>{IndicaActualizando ? IndicaActualizando : cantidadAtendidas}</span>
                        <a className="btn" >
                            <i className={EstatusCalendarDashBoardInfo.iconos['ATE']} ></i><span style={{ fontSize: "11px" }}> Atendidas </span></a>
                    </li>
                </ol>
            </div>
        }
    });
};

import CalendarType = EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda.CalendarTypeBase