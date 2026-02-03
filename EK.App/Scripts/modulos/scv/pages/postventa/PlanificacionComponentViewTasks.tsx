// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.postventa.SPVPlanificacionComponent {
    "use strict";
    const PAGE_ID = "SPVPlanificacionComponentViewTask";
    const CONFIGMODAL_ID = PAGE_ID + "$config";
    const SECTION_VIEWTASKS_HORIZONTAL = PAGE_ID + "$TasksHorizontal";
    const SECTION_VIEWTASKS_VERTICAL = PAGE_ID + "$TasksVertical";
    const TIPOAGENDA_STATE = "SPVPlanificacionComponentTipoAgenda";

    const configModal: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [SECTION_VIEWTASKS_HORIZONTAL, SECTION_VIEWTASKS_VERTICAL]);

    interface IPlanificacionComponentViewTaskProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    export class PlanificacionComponentModalViewTaskBase extends React.Component<IPlanificacionComponentViewTaskProps, {}> {
        constructor(props: IPlanificacionComponentViewTaskProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        componentWillMount() {
        }

        componentWillUnmount() {
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
                <ModalPlanificacionViewTask {...this.props} />
            </Column>
        }
    };

    interface IModalPlanificacionViewTaskProps extends page.IProps {
        tipoAgenda?: any;
        configModal?: any;
        datahead?: any;
    };

    //***Modal para mostrar la información de la Planificacion ***//
    let ModalPlanificacionViewTask: any = global.connect(class extends React.Component<IModalPlanificacionViewTaskProps, {}> {
        constructor(props: IModalPlanificacionViewTaskProps) {
            super(props);
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalPlanificacionViewTaskProps = {};
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            configModal: state.global["catalogo$" + CONFIGMODAL_ID],
            tipoAgenda: getData(state.global[TIPOAGENDA_STATE]).TipoAgenda,
            datahead: state.global["catalogo$" + SECTION_VIEWTASKS_HORIZONTAL]
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        });

        componentWillReceiveProps(nextProps: IModalPlanificacionViewTaskProps): any {
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

        shouldComponentUpdate(nextProps: IModalPlanificacionViewTaskProps, { }): boolean {
            return hasChanged(this.props.tipoAgenda, nextProps.tipoAgenda) ||
                hasChanged(this.props.datahead, nextProps.datahead);
        };

        componentDidUpdate(prevProps: IModalPlanificacionViewTaskProps, prevState: IModalPlanificacionViewTaskProps): any {
        };

        onClose(): void {
            global.dispatchSuccessful("global-page-data", [], SECTION_VIEWTASKS_HORIZONTAL);
            global.dispatchSuccessful("global-page-data", [], SECTION_VIEWTASKS_VERTICAL);
            let modalObject: any = $("#SPVPlanificacionComponentViewTask");
            modalObject.modal("hide");
        };

        footerPersonalized(): JSX.Element {
            let state: DataElement = this.props.config.getState();

            return <div className="modal-footer">
                <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
            </div>
        };
        header(title: any): JSX.Element {
            let item: any;
            let IDTarea: string = "";
            let Tarea: string = "";
            let TipoTarea: any;
            if (isSuccessful(this.props.datahead)) {
                item = getData(this.props.datahead);
                if (item && item != undefined && item.length > 0) {
                    IDTarea = item[0].IdPlanificacion;
                    Tarea = item[0].Tarea.Nombre;
                }
            }
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h4 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{title}</h4>
                </span>
                {Tarea != "" ? 
                    <div style={{ fontSize: "13px", fontWeight: "bold", lineHeight: "1.5", textAlign: "left", alignItems: "center", padding: "5px 20px 2px 5px" }}>
                        <span className="badge badge-success" style={{ paddingRight: "1rem", paddingLeft: "1rem" }} >{IDTarea}</span>
                        <span style={{ height: "auto", width: "auto", padding: "0.5rem", fontWeight: "normal"}}>{Tarea}</span>
                    </div>
                    : null
                }
            </div>
        };
        render(): JSX.Element {
            return <modal.Modal id={PAGE_ID} header={this.header("Tarea")} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <ViewHorizontalActivities />
                    <Column style={{ marginLeft: "50px", marginTop: "36px" }} size={[12, 12, 6, 6]}>
                        <ViewVerticalActivities />
                    </Column>
                </Row>
            </modal.Modal>
        }
    });

    interface IViewHorizontalActivities extends page.IProps {
        tipoAgenda?: any;
        datahead?: DataElement;
    }
    let ViewHorizontalActivities: any = global.connect(class extends React.Component<IViewHorizontalActivities, {}> {
        constructor(props: IViewHorizontalActivities) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoAgenda = state.global[TIPOAGENDA_STATE];
            retValue.datahead = state.global["catalogo$" + SECTION_VIEWTASKS_HORIZONTAL];
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});


        shouldComponentUpdate(nextProps: IViewHorizontalActivities, { }): boolean {
            return hasChanged(this.props.datahead, nextProps.datahead);
        };
        onClickElementHorizontal(item: any): void {
            let IdPlanificacionDetalle: any;
            let IdPadre: any;
            if (item && item != null && item != undefined) {
                IdPlanificacionDetalle = item.ID;
                let parametros: string = global.encodeObject({ IdPlanificacionDetalle: IdPlanificacionDetalle });
                dispatchAsync("global-page-data", "base/scv/PlanificacionSPV/Get/GetViewActsDet/" + parametros, SECTION_VIEWTASKS_VERTICAL);
            }
        };

        render(): JSX.Element {
            let $page: any = $ml[""];
            let IndicaActualizando: any = isSuccessful(this.props.datahead) ? "" : <div style={{ position: "relative", float: "none" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={30} icon={"fas fa-sync-alt"} colorClass={"font-blue"} text={"Actualizando"} /></div>;
            let items: DataElement = getData(this.props.datahead);
            return <Row>
                {IndicaActualizando ? IndicaActualizando :
                    <EKHorizontalTimeLine
                        items={items}
                        customScroll={true}
                        onClickElementHorizontal={this.onClickElementHorizontal}
                        desactivarFondo={true}
                        page={$page}
                        desactivarNavegacion={true}
                        tipoPresentacion={11} />
                } 
                </Row>;
        }
    });

    interface IViewVerticalActivities extends page.IProps {
        tipoAgenda?: any;
        dataActivities?: DataElement;
        datahead?: DataElement;
    }
    let ViewVerticalActivities: any = global.connect(class extends React.Component<IViewVerticalActivities, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoAgenda = state.global[TIPOAGENDA_STATE];
            retValue.datahead = state.global["catalogo$" + SECTION_VIEWTASKS_HORIZONTAL];
            retValue.dataActivities = state.global["catalogo$" + SECTION_VIEWTASKS_VERTICAL];
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});


        shouldComponentUpdate(nextProps: IViewVerticalActivities, { }): boolean {
            return hasChanged(this.props.dataActivities, nextProps.dataActivities);
        };

        componentWillReceiveProps(nextProps: IViewVerticalActivities): any {
            if (global.hasChanged(this.props.datahead, nextProps.datahead)) {
                if (isSuccessful(nextProps.datahead)) {
                    let IdPlanificacionDetalle: any;
                    let IdPadre: any;
                    let items: any = getData(nextProps.datahead);
                    if (items && items.length > 0) {
                        IdPlanificacionDetalle = items[0].ID;
                        IdPadre = items[0].ID;
                        let parametros: string = global.encodeObject({ IdPlanificacionDetalle: IdPlanificacionDetalle });
                        dispatchAsync("global-page-data", "base/scv/PlanificacionSPV/Get/GetViewActsDet/" + parametros, SECTION_VIEWTASKS_VERTICAL);
                    }
                }
            }
        };

        render(): JSX.Element {
            let $page: any = $ml[""];
            let IndicaActualizando: any = isSuccessful(this.props.dataActivities) ? "" : <div style={{ position: "relative", float: "none", marginTop: 50 }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={30} icon={"fas fa-sync-alt"} colorClass={"font-blue"} text={"Actualizando"} /></div>;
            return <Row>
                <div key={this.props.key} style={{ height: undefined }} className="chats">
                    <div className="portlet light bordered" style={{ paddingLeft: "30px", marginRight: "90px" }}>
                        <div className="portlet-body" id="chats" style={{ borderLeftStyle: "dotted", borderLeftColor: "beige", borderLeftWidth: "initial" }}>
                            {IndicaActualizando ? IndicaActualizando :
                                <List
                                    items={getData(this.props.dataActivities)}
                                    readonly={true}
                                    listMode="literal"
                                    addRemoveButton={false}
                                    dragAndDrop={false}
                                    horizontalScrolling={false}
                                    height={"auto"}
                                    listHeader={
                                        <Column size={[12, 12, 12, 12]}>
                                        </Column>
                                    }
                                    formatter={(index: number, item: any) => {
                                        let nombreRercurso: any = item.Recurso != undefined && item.Recurso.Nombre != undefined ? item.Recurso.Nombre : ""
                                        let iniciales: any; 
                                        let nombreLetras: any;
                                        nombreLetras = nombreRercurso.trim().split(" ");
                                        if (nombreLetras.length > 0) {
                                            iniciales = nombreLetras[0].substr(0, 1) + (nombreLetras.length > 1 ? nombreLetras[1].substr(0, 1) : "");
                                        }
                                        return <Row >
                                            <li className="in">
                                                {item.FotoRecurso === "" ?
                                                    <div className="img-circle-fixed" style={{ marginLeft: "-20px", borderTopLeftRadius: "50 !important", verticalAlign: "middle", maxWidth: "55px", maxHeight: "55px", width: "45px", height: "45px", background: "#1e7145", color: "white", zIndex: (300), textAlign: "center", justifyContent: "center", alignItems: "center" }}   >
                                                        <p style={{ paddingTop:"13px" }}>{iniciales}</p>
                                                    </div>
                                                    :
                                                    <img alt="" title={""} className="img-circle-fixed" src={item.FotoRecurso} style={{ marginLeft: "-20px", borderTopLeftRadius: "50 !important", verticalAlign: "middle", maxWidth: "55px", maxHeight: "55px", width: "45px", height: "45px", background: "beige", zIndex: (300), textAlign: "center" }} />
                                                }
                                                <div className="message message-content-border" style={{ marginLeft:"35px", marginTop: "-37px", marginRight: "-5px" }}>
                                                    <span className="datetime" style={{ float: "left", marginTop: "-24px", marginLeft: "-5px", fontWeight: 600 }}> {global.formatDate(item.DTStart)} </span>
                                                    <span className="arrow"> </span>
                                                    <span className="Name" style={{ fontWeight: 600 }}> {nombreRercurso} </span>
                                                    <span className="datetime" style={{ float: "right", fontSize: "11px" }}>{global.formatTimePlanificacionSPV(item.DTStart) + " - " + global.formatTimePlanificacionSPV(item.DTEnd)}</span>
                                                    <span className="body"> Observaciones:  {item.Observaciones != null ? " " + item.Observaciones : " "}</span>
                                                    <div style={{ textAlignLast: "end" }}>
                                                        <span className={"Name badge badge-success"} style={{ fontSize: "11px !important", background: item.EstatusPlanificacionDet.BGColor }}>{item.EstatusPlanificacionDet ? item.EstatusPlanificacionDet.Nombre : ""}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </Row>;
                                    }} />
                            }
                        </div>
                    </div>
                </div>
            </Row>;
        }
    });
};

import PlanificacionComponentViewTaskModal = EK.Modules.SCV.Pages.postventa.SPVPlanificacionComponent.PlanificacionComponentModalViewTaskBase;