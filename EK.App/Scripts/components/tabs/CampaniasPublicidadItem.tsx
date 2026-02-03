namespace EK.UX.Tabs {
    "use strict";

    export class CampaniasPublicidadUserTab extends React.Component<IPortletTabPaneProps, IPortletTabPaneState> {
        constructor(props: IPortletTabPaneProps) {
            super(props);

            this.state = { timestamp: 0 };
            this.onItemClick = this.onItemClick.bind(this);
        };
        static defaultProps: IPortletTabPaneProps = {
            data: [],
            icon: "fas fa-mail-bulk",
            title: "Campañas de Publicidad"
        };

        shouldComponentUpdate(nextProps: IPortletTabPaneProps, nextState: IPortletTabPaneState): boolean {
            return this.state.timestamp !== nextState.timestamp;
        };

        componentDidMount() {
        };

        componentWillMount(): void {
            dispatchAsync("load::CampaniasPublicidadUser", "base/scv/campaniasPublicidad/Get/SelectCampaniaPublicidadUser/");
        };

        componentWillReceiveProps(nextProps: IPortletTabPaneProps) {
            if (this.state.timestamp !== nextProps.data.timestamp) {
                this.setState({ timestamp: nextProps.data.timestamp });
            }
        };

        onItemClick(item: any) {
            console.log(item);
            let Validate: boolean = false;

            if (!isLoadingOrSuccessful(item)) {
                if (item.ID != null) {
                    let ID: string = item.ID;
                    dispatchAsync("load::CampaniaUsuario", "base/scv/campaniasPublicidad/Get/SelectCampaniaPublicidadUser/" + global.encodeParameters({ ID: ID }));
                    Validate = true;
                }
            };
            if (Validate) {
                //Abrimos el Modal
                let modalObject: any = $("#modalCampaniaUser");
                modalObject.modal();
            }
        }


        formatItem(index: number, item: any) {
            return <Row style={{ height: 95, marginTop: 10, borderBottom: "solid", borderBottomWidth: .2, borderBottomColor: "rgb(231, 233, 235)" }}>
                <Column size={[10, 10, 10, 10]} >
                    <Column size={[12, 12, 12, 12]} style={{ textAlign: "left", marginBottom: 10 }}>
                        <Row style={{ fontSize: 14, marginLeft: "auto" }}>
                            <span className={"col-lg-12 col-md-12 col-sm-12 col-xs-12"} style={{ fontWeight: 300 }}>{item.Nombre}</span>
                        </Row>
                    </Column>
                    <Column size={[12, 12, 12, 12]} style={{ paddingLeft: 10, textAlign: "left" }}>
                        <Row style={{ fontSize: 11, marginLeft: "auto" }}>
                            <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5" style={{ marginBottom: 2 }}>{"Vigencia Inicial"}</span>
                            <span className="col-lg-1 col-md-1 col-sm-1 col-xs-1 " style={{ marginBottom: 2 }}>&nbsp;</span>
                            <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5" style={{ marginBottom: 2 }}>{"Vigencia Final"}</span>
                        </Row>
                        <Row style={{ fontSize: 11, marginLeft: "auto" }}>
                            <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5 badge badge-success" style={{ marginBottom: 2 }}>{global.formatDate(item.FechaInicial)}</span>
                            <span className="col-lg-1 col-md-1 col-sm-1 col-xs-1 " style={{ marginBottom: 2 }}>&nbsp;</span>
                            <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5 badge badge-success" style={{ marginBottom: 2 }}>{global.formatDate(item.FechaFinal)}</span>
                        </Row>
                    </Column>
                </Column>
                <Column size={[2, 2, 2, 2]} style={{ paddingTop: 32, color: "rgb(231, 233, 235)", marginLeft: 0 }}>
                    <span style={{ fontSize: 26 }}>&nbsp;</span>
                </Column>
            </Row>;
        }

        render(): JSX.Element {
            return <PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                {this.props.data.status === AsyncActionTypeEnum.loading
                    ? <Updating text="actualizando campanias..." />
                    : this.props.data.status === AsyncActionTypeEnum.successful
                        ? <List
                            listHeader={null}
                            items={this.props.data}
                            formatter={this.formatItem}
                            readonly={true}
                            onItemClick={this.onItemClick}
                            />
                        : null
                }
                <Row>
                    <modal.Modal id="modalCampaniaUser" header={"Campaña Publicidad"} addDefaultCloseFooter={false}>
                        <SeguimientoCampaniaPublicidadUsuarioTemplate />
                    </modal.Modal>
                </Row>
            </PortletTabPane>;
        }
    }

    const campaniasProps: any = (state: any): any => {
        return {
            data: state.global.CampaniasPublicidadUser,
            claveEntidad: state.global.currentEntityType,
            entidad: state.global.currentEntity
        };
    };

    const mapcampaniasDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            obtenerCampanias: (entidad: string, idItem: number): any => {
                dispatchAsync("load::CampaniasPublicidadUser", "base/scv/campaniasPublicidad/Get/SelectCampaniaPublicidadUser/");
            }
        };
    };

    export let SeguimientoCampaniaPublicidadUsuario: any = ReactRedux.connect(campaniasProps, mapcampaniasDispatchs)(CampaniasPublicidadUserTab);

};
import SeguimientoCampaniaPublicidadUsuario = EK.UX.Tabs.SeguimientoCampaniaPublicidadUsuario;