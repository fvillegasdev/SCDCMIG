namespace EK.UX.Tabs {
    "use strict";

    interface IHistoryProps extends EK.UX.IPortletTabPaneProps {
        claveEntidad?: any;
        entidad?: any;
        obtenerHistory?: (entidad: string, idItem: number) => any;
    }

    export class HistoryItem extends React.Component<IPortletTabPaneProps, IPortletTabPaneState> {
        constructor(props: IPortletTabPaneProps) {
            super(props);

            this.state = { timestamp: 0 };
        }

        static defaultProps: IPortletTabPaneProps = {
            data: [],
            icon: "icon-ek-001",
            title: "Historial de Cambios"
        };

        componentDidMount() {
            let style: string = "\
                .timeline:before {\
                    margin-left: 23px;\
                }\
                .timeline .timeline-badge {\
                    padding-left: 5px;\
                }\
                .timeline .timeline-body-content {\
                    margin-top: 0px;\
                }\
                .timeline.white-bg .item-created .timeline-badge-userpic { \
                    border-color: #26C281;\
                }\
                .timeline.white-bg .item-modified .timeline-badge-userpic { \
                    border-color: #F4D03F;\
                }\
                .timeline.white-bg .item-deleted .timeline-badge-userpic { \
                    border-color: #D91E18;\
                }\
                img[alt].tl:after {\
                  display: block;\
                  position: absolute;\
                  top: 4px;\
                  left: 9px;\
                  width: 40px;\
                  height: 40px;\
                  background-color: #fff;\
                  padding-top: 2px;\
                  font-family: 'icomoon' !important;\
                  -webkit-font-smoothing: antialiased;\
                  -moz-osx-font-smoothing: grayscale;\
                  font-size: 28px;\
                  text-align: center;\
                  content: '\\e91c';\
                }\
            ";

            EK.Global.appendStyle("history-item-style", style);
        }

        shouldComponentUpdate(nextProps: IPortletTabPaneProps, nextState: IPortletTabPaneState): boolean {
            return getTimestamp(this.state) !== getTimestamp(nextState);
        }

        componentWillReceiveProps(nextProps: IPortletTabPaneProps) {
            if (getTimestamp(this.state) !== getTimestamp(nextProps.data)) {
                this.setState({ timestamp: nextProps.data.timestamp });
            }
        }

        render(): JSX.Element {
            let v: any[] = [];
            let history: any = this.props.data;

            let renderDataFn: (item: any) => any = (item: any): any => {
                return <div>
                    <h5 style={{ fontSize: 12 }}>
                        <div style={{ fontWeight: 600 }}>{item.Clave}</div>
                        <div>{item.Nombre}</div>
                    </h5>                    
                </div>;
            }

            if (history && history.data && history.data.length > 0) {
                let data: any[] = history.data;                

                for (var i = 0; i < data.length; i++) {
                    var itemKey: string = "generic-item-key-" + Number(new Date()) + "-" + i;
                    let usuarioFoto: string = ["cliente(enk)/usuario(", data[i].IdModificadoPor, ")/sm/foto"].join("");
                    let dateLabel: string;
                    let content: string;
                    let height: number = undefined;
                    let itemClass: string = undefined;
                    let borderColor: string = "";

                    if (data[i].RecordType === 0) {
                        borderColor = "#26C281";
                        dateLabel = ["creado el ", data[i].Modificado.toLocaleString()].join("");
                        content = "";
                        itemClass = "item-created";
                    } else if (data[i].RecordType === 2) {
                        borderColor = "#F7CA18";
                        dateLabel = ["modificado el ", data[i].Modificado.toLocaleString()].join("");
                        content = "";
                        itemClass = "item-modified";
                    };

                    v.push(<div className={"timeline-item " + itemClass} key={i}>
                        <div className="timeline-badge" style={{ height: height }}>
                            <img alt="img" className="tl" src={usuarioFoto} style={{ width: 48, height: 48, border: "4px #f5f6fa solid"}}/>
                        </div>
                        <div className="timeline-body" style={{
                            marginLeft: 68,
                            marginRight: 5,
                            padding: 10,
                            marginTop: 10,
                            height: height
                        }}>
                            <div className="timeline-body-arrow" style={{top:12}}>
                            </div>
                            <div className="timeline-body-head" style={{marginBottom: 0}}>
                                <div className="timeline-body-head-caption" style={{ float: "none" }}>
                                    <blockquote style={{
                                        borderLeft: "3px solid " + borderColor,
                                        padding: "2px 2px 10px 8px",
                                        margin: 0,
                                        fontSize: 14
                                    }}>
                                        {renderDataFn(data[i])}
                                        <small style={{ fontWeight: 600 }}>
                                            {data[i].IdModificadoPorNombre}<br />
                                            <cite title="" style={{ fontWeight: 300 }}>{dateLabel}</cite>
                                        </small>
                                    </blockquote>                                    
                                </div>
                            </div>
                            <div className="timeline-body-content">
                                <span
                                    className="font-grey-cascade"
                                    style={{ fontSize: 12 }}> {content}</span>
                            </div>
                        </div>
                    </div>);
                }
            }

            return <EK.UX.PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                <div className="timeline">
                    {v}
                </div>
            </EK.UX.PortletTabPane>;
        }
    }

    export class HistoryItemCatalogo extends React.Component<IHistoryProps, IPortletTabPaneState> {
        constructor(props: IHistoryProps) {
            super(props);

        }

        static defaultProps: IHistoryProps = {
            data: [],
            icon: "fa fa-history",
            title: "Historial de Cambios"
        };

        componentDidMount() {
            if (isSuccessful(this.props.claveEntidad) && isSuccessful(this.props.entidad)) {
                let idEntidad: number = getData(this.props.entidad).ID;

                if (idEntidad) {
                    this.props.obtenerHistory(getData(this.props.claveEntidad), idEntidad);
                };
            };
        };

        componentDidUpdate() {
            let w: any = window;
            let wrapper: any = $('.page-quick-sidebar-wrapper');

            let qsb: any = wrapper.find("#quick_sidebar_tab_1").find(".portletTabPane");            
            let height: any = wrapper.height() - wrapper.find('.nav-tabs').outerHeight(true);

            w.App.destroySlimScroll(qsb);
            qsb.attr("data-height", height);
            w.App.initSlimScroll(qsb);
        }

        shouldComponentUpdate(nextProps: IHistoryProps, nextState: IPortletTabPaneState): boolean {
            if (!nextProps.claveEntidad || !nextProps.entidad) {
                return true;
            }// to render empty

            let entidad: string = nextProps.claveEntidad.data;
            let thisData: any = this.props.data && this.props.data[entidad];
            let nextData: any = nextProps.data && nextProps.data[entidad];

            return hasChanged(thisData, nextData);
        };

        componentWillReceiveProps(nextProps: IHistoryProps) {
            if (hasChanged(this.props.claveEntidad, nextProps.claveEntidad) ||
                hasChanged(this.props.entidad, nextProps.entidad)) {

                if (isSuccessful(nextProps.claveEntidad) &&
                    isSuccessful(nextProps.entidad)) {

                    let idEntidad: number = getData(nextProps.entidad).ID;
                    if (idEntidad) {
                        this.props.obtenerHistory(getData(nextProps.claveEntidad), idEntidad);
                    };
                };
            };
        };

        render(): JSX.Element {
            if (!this.props.claveEntidad || !this.props.entidad) {
                return null
            };

            let v: any[] = [];
            let history: any = this.props.data[this.props.claveEntidad.data];

            let icono_items: any = {};
            icono_items[1] = ""; // RESERVADO PARA CUANDO NO TIENE RECORDTYPE

            icono_items[0] = "fa fa-feed"; 
            icono_items[3] = "fa fa-pencil"; 


            icono_items[1100] = "fa fa-check";              //CHECK LIST 
            icono_items[1101] = "fa fa-flag-checkered";     //FINALIZACION
            icono_items[1102] = "fa fa-step-forward";       //AVANZAR
            icono_items[1103] = "fa fa-pause";              //PAUSE
            icono_items[1104] = "fa fa-play";               //CONTINUAR
            icono_items[1105] = "fa fa-stop";               //CANCEL
            icono_items[1106] = "icon-arrow-right";         //PROCESS



            let renderDataFn: () => any;
            //let renderDataFn: (item: any, lastItem: any) => any = (item: any): any => {
            //    return <div>
            //        <h5 style={{ fontSize: 12 }}>
            //            <div style={{ fontWeight: 600 }}>{item.Clave}</div>
            //            <div>{item.Nombre}</div>
            //        </h5>
            //    </div>;
            //}

            if (history && history.data && history.data.length > 0) {
                let data: any[] = history.data;
                let fnItem: any = (icono: any, classColor: string, mensaje: any) => {
                    return <div className="timeline-item" key="mensaje">
                        <div className="timeline-body timeline-element">
                            <div className="timeline-body-content">
                                <div className={classColor}>
                                    {icono}
                                </div>
                                <div className="font-grey-cascade" style={{ fontSize: 12, float: "right", width: 235, padding: "5px 10px" }}>
                                    {mensaje}
                                </div>
                            </div>
                        </div>
                    </div >;
                };
                for (var i = 0; i < data.length; i++) { // Creado
                    let renderMessage: any = null;
                    let item: any = data[i];
                    let itemDate: string = global.formatDateTime(item.Modificado);
                    let iconoLog: string = icono_items[item.RecordType] ? icono_items[item.RecordType] : icono_items[0]; 



                    if (item.RecordType === 0) {
                        let mensaje: any = <span>Creado por <span className="bold">{data[i].IdModificadoPorNombre}</span> el {itemDate}</span>;
                        let icono: any = <i className={iconoLog} style={{ fontSize: 14 }}></i>;

                        renderMessage = fnItem(icono, "timeline-new", mensaje);
                    }
                    else if (item.RecordType === 3) { // Modificado {data[i].Modificado}
                        let mensaje: any = <span>Modificado por <span className="bold">{data[i].IdModificadoPorNombre}</span> el {itemDate}</span>;
                        let icono: any = <i className={iconoLog} style={{ fontSize: 14 }}></i>;

                        renderMessage = fnItem(icono, "timeline-edit", mensaje);
                    }
                    else if (item.RecordType >= 1000) { // Modificado {data[i].Modificado}
                        let mensaje: any = <div>{item.Message} por <span className="bold">{item.IdModificadoPorNombre}</span> el {itemDate}</div>;
                        let icono: any = <i className={iconoLog} style={{ fontSize: 14 }}></i>;

                        renderMessage = fnItem(icono, "timeline-event", mensaje);
                    };

                    v.push(<div className={"timeline-item "} key={i}>
                        {renderMessage}
                    </div>);
                }
            }

            return <EK.UX.PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                <div className="timeline">
                    {v}
                </div>
            </EK.UX.PortletTabPane>;
        }
    }

    const historyProps: any = (state: any): any => {
        return {
            data: state.history,
            claveEntidad: state.global.currentEntityType,
            entidad: state.global.currentEntity
        };
    };

    const mapHistoryDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            obtenerHistory: (entidad: string, idItem: number): any => {
               // dispatchAsync(["history-entity-", entidad].join(""), ["history/", entidad ,"/", idItem, "/25"].join(""));
            }
        };
    };

    export let History$Tab: any = ReactRedux.connect(historyProps, mapHistoryDispatchs)(EK.UX.Tabs.HistoryItemCatalogo);
};

import History$Tab = EK.UX.Tabs.History$Tab;
import HistoryItemTab = EK.UX.Tabs.HistoryItem;
import HistoryItemCatalogoTab = EK.UX.Tabs.HistoryItemCatalogo;