namespace EK.UX.Tabs {
    "use strict";

    export class EntityClienteItem extends React.Component<IPortletTabPaneProps, IPortletTabPaneState> {
        constructor(props: IPortletTabPaneProps) {
            super(props);

            this.state = { timestamp: 0 };
        }

        static defaultProps: IPortletTabPaneProps = {
            data: [],
            icon: "fa fa-industry",
            title: "Cliente"
        };

        formatItem(index: number, title: string, description: string) {
            var itemKey: string = "generic-item-key-" + (index).toString();
            let isOdd = !(index % 2) ? "bg-grey-cararra bg-font-grey-cararra" : "";

            return <div key={itemKey} className={"row " + isOdd}>
                <Column lg={6} md={6} sm={6} xs={12} className="titleCol">
                    {title}
                </Column>
                <Column lg={6} md={6} sm={6} xs={12} className="descriptionCol">
                    {description}
                </Column>
            </div>;
        }

        shouldComponentUpdate(nextProps: IPortletTabPaneProps, nextState: IPortletTabPaneState): boolean {
            return true; //this.state.timestamp !== nextState.timestamp;
        }

        componentWillReceiveProps(nextProps: IPortletTabPaneProps) {
            if (this.state.timestamp !== nextProps.data.timestamp) {
                this.setState({ timestamp: nextProps.data.timestamp });
            }
        }

        render(): JSX.Element {
            let v: any[] = [];
            let data: any[] = this.props.data;
            let visibleCol: any[] = this.props.visibleColumns;

            if (data) {
                let i = 0;
                for (let e in data) {
                    if (visibleCol === undefined) {
                        if (typeof data[e] !== "object") {
                            v.push(this.formatItem(i++, e, data[e]));
                        } else {
                            if (data[e] instanceof Date) {
                                v.push(this.formatItem(i++, e, data[e].toLocaleString()));
                            } else {
                                if (e === "CreadoPor") {
                                }
                            }
                        }
                    }
                    else {
                        for (let col of visibleCol) {
                            if (col.data === e) {
                                if (typeof data[e] !== "object") {
                                    v.push(this.formatItem(i++, col.title, data[e]));
                                    break;
                                } else {
                                    if (data[e] instanceof Date) {
                                        v.push(this.formatItem(i++, col.title, data[e].toLocaleString()));
                                        break;
                                    } else {
                                        if (e === "CreadoPor") {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
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

import EntityClienteItem = EK.UX.Tabs.EntityClienteItem;