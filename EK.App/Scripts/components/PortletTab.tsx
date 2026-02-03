/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Icon.tsx" />

namespace EK.UX {
    "use strict";

    enum TitleSizeEnum {
        small = 0,
        normal = 1,
        large = 2
    }

    interface IPortletTabProps extends React.Props<any> {
        id?: string;
        data?: any;
        config?: any;
        updateTab?: (tab: number, data: any) => void;
        bordered?: boolean;
        loading?: boolean;
        color?: string;
        title?: string;
       
    }

    interface IPortletTabState extends React.Props<any> {
        current: number;
    }

    export interface IPortletTabPaneProps extends React.Props<any> {
        data?: any;
        icon?: string;
        title?: string;
        visibleColumns?: any;
        currentEntityType?: DataElement;
        currentCatalogo?: DataElement;
        config?: page.IPageConfig;
    }

    export interface IPortletTabPaneState {
        timestamp: number;
    }

    export class PortletTabPane extends React.Component<IPortletTabPaneProps, {}> {
        render(): any {
            return <div className="portletTabPane">{this.props.children}</div>;
        }
    }

    export class PortletTab extends React.Component<IPortletTabProps, IPortletTabState> {
        constructor(props: IPortletTabProps) {
            super(props);

            this.getTabData = this.getTabData.bind(this);
            this.state = { current : 0 };
        }

        static defaultProps: IPortletTabProps = {
            id: "",
            bordered: false,
            loading: false,
            color: null
        };

        refs: {
            tabContainer: Element;
            tabTitle: Element;
        };

        getTabData(index: number): any {
            let retValue: any = {};

            if (this.props.data && this.props.data[index]) {
                retValue = this.props.data[index];
            }

            return retValue;
        }

        componentDidMount() {
            let tabContainer: any = $(this.refs.tabContainer);
            let tabTitle: any = $(this.refs.tabTitle);
            let stateFn: Function = this.setState;

            // init the functions
            //this.props.updateTab(0, this.props.data);
            //this.props.updateTab(1, this.props.data);
            //this.props.updateTab(2, this.props.data);

            let that = this;
            tabContainer.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                let target = $(e.target).attr("data-title");

                // stateFn({ current: target });
                tabTitle.find("span").html(target);
            });
        }

        //componentWillReceiveProps(nextProps: IPortletTabProps) {
        //    //React.Children.forEach(this.props.children, (child: any, index: number) => {
        //    //    this.props.updateTab(index, nextProps.data);
        //    //});
        //}

        render(): JSX.Element {
            let className: string = "portlet light bordered";

            return <div className={className}>
                <div
                    className={"portlet-title tabbable-line " + (this.props.color && this.props.bordered ? " border-" + this.props.color : "")}
                    style={{ marginBottom: 0, borderBottom: "none" }}>
                    <div className="caption" ref="tabTitle">
                        <span className="caption-subject uppercase" style={{ fontSize: 14, fontWeight: 600 }}>
                            {React.Children.map(this.props.children, (child: any, index: number) => {
                                let props: any = child.type.WrappedComponent ? child.type.WrappedComponent.defaultProps : child.props;
                                if (this.state.current == index) {
                                    return props.title;
                                } else {
                                    return null;
                                };
                            })}
                        </span>
                    </div>
                    <ul className="nav nav-tabs" ref="tabContainer">
                        {React.Children.map(this.props.children, (child: any, index: number) => {
                            let props: any = child.type.WrappedComponent ? child.type.WrappedComponent.defaultProps : child.props;
                            let style: React.CSSProperties = {};
                            //if (this.state.current == index) {
                            //    style = { borderBottom: "4px solid #fff" };
                            //}
                            return <li className={this.state.current == index ? "active" : ""} style={style}>
                                <a href={"#portlet_tab" + index} data-toggle="tab" data-TabIndex={index} data-title={props.title}>
                                    <span aria-hidden="true" className={props.icon} style={{ fontSize: 18 }}></span>
                                </a>
                            </li>;
                        })}
                    </ul>
                </div>
                <div className="portlet-body" style={{padding: 0}}>
                    <div className="tab-content">
                        {React.Children.map(this.props.children, (child: any, index: number) => {
                            let c: any;
                            if (typeof child.props.children === "function") {
                                c = child.props.children(this.props.data);
                            } else {
                                c = child;
                            }

                            return <div className={this.state.current == index ? "tab-pane active" : "tab-pane"} id={"portlet_tab" + index}>
                                {c}
                            </div>;
                        })}
                    </div>
                </div>
            </div>;
        }
    }
}

import PortletTab = EK.UX.PortletTab;
import PortletTabPane = EK.UX.PortletTabPane;
import IPortletTabPaneProps = EK.UX.IPortletTabPaneProps;