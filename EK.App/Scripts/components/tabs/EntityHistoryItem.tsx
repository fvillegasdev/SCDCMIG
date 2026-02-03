namespace EK.UX.Tabs {
    "use strict";

    export class EntityHistoryItem extends React.Component<IPortletTabPaneProps, IPortletTabPaneState> {
        constructor(props: IPortletTabPaneProps) {
            super(props);

            this.state = { timestamp: 0 };
        }

        static defaultProps: IPortletTabPaneProps = {
            data: [],
            icon: "fa fa-history",
            title: "Historial"
        };

        shouldComponentUpdate(nextProps: IPortletTabPaneProps, nextState: IPortletTabPaneState): boolean {
            return this.state.timestamp !== nextState.timestamp;
        }

        componentWillReceiveProps(nextProps: IPortletTabPaneProps) {            
            if (this.state.timestamp !== nextProps.data.timestamp) {
                this.setState({ timestamp: nextProps.data.timestamp });
            }
        }

        render(): JSX.Element {
            let v: any[] = [];
            let history: any = this.props.data;

            if (history && history.data && history.data.length > 0) {
                let data: any[] = history.data;

                for (var i = 0; i < data.length; i++) {
                    var itemKey: string = "generic-item-key-" + Number(new Date()) + "-" + i;
                    let isOdd: string = !(i % 2) ? "bg-grey-cararra bg-font-grey-cararra" : "";

                    if (data[i].RecordType === 0) {
                        v.push(<Row key={itemKey} className={isOdd + " history-item"}>
                            <Column lg={1} md={1} sm={1} xs={1}>
                                <span aria-hidden="true" className="icon-star history-icon"></span>
                            </Column>
                            <Column lg={11} md={11} sm={11} xs={11}>
                                Creado el <span>{data[i].Creado.toLocaleString()}</span> por
                                                                        <span> {data[i].CreadoPorNombre}</span>
                            </Column>
                        </Row>);
                    } else if (data[i].RecordType === 2) {
                        v.push(<Row key={itemKey} className={isOdd + " history-item"}>
                            <Column lg={1} md={1} sm={1} xs={1}>
                                <span aria-hidden="true" className="icon-note history-icon"></span>
                            </Column>
                            <Column lg={11} md={11} sm={11} xs={11}>
                                Modificado el <span>{data[i].Modificado.toLocaleString()}</span> por
                                                                    <span> {data[i].ModificadoPorNombre}</span>
                            </Column>
                        </Row>);
                    }
                }
            }

            return <EK.UX.PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                <div>
                    {v}
                </div>
            </EK.UX.PortletTabPane>;
        }
    }
}

import EntityHistoryItem = EK.UX.Tabs.EntityHistoryItem;