namespace EK.UX {
    "use strict";

    enum TitleSizeEnum {
        small = 0,
        normal = 1,
        large = 2
    }

    interface IQuickSidebarProps extends React.Props<any> {
        id?: string;
        data?: any;
        config?: any;
        updateTab?: (tab: number, data: any) => void;
        bordered?: boolean;
        loading?: boolean;
        color?: string;
        title?: string;
    }

    interface IQuickSidebarState extends React.Props<any> {
        current: number;
    }

    export interface IQuickSidebarPanelProps extends React.Props<any> {
        data?: any;
        icon?: string;
        title?: string;
        visibleColumns?: any;
        pageMode?: page.PageMode;
    }

    export interface IQuickSidebarPanelState {
        timestamp: number;
    }

    export class QuickSidebarPanel extends React.Component<IQuickSidebarPanelProps, {}> {
        render(): any {
            let filtersItem: any[] = [];
            let InfoItem: any[] = [];

            React.Children.forEach(this.props.children, (child: any, index: number): any => {
                if (child.props.$displayName === "PageFilter") {
                    filtersItem.push(child);
                }
                else if (child.props.$displayName === "PageInfo")
                {
                    if (!child.props.children === undefined) {
                            InfoItem.push(child.props.children);
                    }
                    else
                    {
                        InfoItem.push(child);
                    }
                    
                }
            });

            //  <Acciones$Tab /> 
            return <QuickSidebarTab>
                <ResultadosTab pageMode={this.props.pageMode} />
                <qsTabs.CalendarItem />
                <History$Tab />
                <SeguimientoCampaniaPublicidadUsuario />
            </QuickSidebarTab>
        }
    }

    export class QuickSidebarTab extends React.Component<IQuickSidebarProps, IQuickSidebarState> {
        constructor(props: IQuickSidebarProps) {
            super(props);

            this.state = { current: 0 };
        }

        static defaultProps: IQuickSidebarProps = {
            id: "",
            bordered: false,
            loading: false,
            color: null
        };

        refs: {
            tabContainer: Element;
            tabTitle: Element;
        };

        quickSidebarInit(): void {
            $("#qsbToogle").click(function (e) {
                $("body").toggleClass("page-quick-sidebar-open");
            });
        }

        quickSidebarDestroy(): void {
            $("#qsbToogle").unbind("click");
        }

        componentDidMount() {
            this.quickSidebarInit();

            let tabContainer: any = $(this.refs.tabContainer);
            let tabTitle: any = $(this.refs.tabTitle);

            tabContainer.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                let target = $(e.target).attr("data-title");

                tabTitle.find("span").html(target);
            });
        }

        componentWillUnmount(): void {
            this.quickSidebarDestroy();
        }

        componentWillUpdate(nextProps: IQuickSidebarProps, nextState: any) {
            this.quickSidebarDestroy();
        }

        componentDidUpdate(): void {
            this.quickSidebarInit();
        }

        render(): JSX.Element {
            let wrapperStyle: React.CSSProperties = {
            };

            let headerStyle: React.CSSProperties = {
            };

            return <div style={wrapperStyle} className="page-quick-sidebar-wrapper" data-close-on-body-click="true">
                <div style={headerStyle} className="page-quick-sidebar">
                    <div className="page-quick-sidebar-title" ref="tabTitle">
                        <span className="caption-subject uppercase" style={{ fontSize: 14, fontWeight: 600, marginLeft: 0 }}>
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

                            return <li className={this.state.current == index ? "active" : ""}>
                                <a className={props.icon} href="javascript:;" data-target={"#quick_sidebar_tab_" + index} data-toggle="tab" data-TabIndex={index} data-title={props.title}></a>
                            </li>;
                        })}
                    </ul>
                </div>
                <div className="tab-content" style={{  }}>
                    {React.Children.map(this.props.children, (child: any, index: number) => {
                        let c: any;
                        if (typeof child.props.children === "function") {
                            c = child.props.children(this.props.data);
                        } else {
                            c = child;
                        };

                        return <div className={this.state.current == index ? "tab-pane active" : "tab-pane"} id={"quick_sidebar_tab_" + index}>
                            {c}
                        </div>;
                    })}
                </div>
            </div>;
        }
    }
}
import qsTabs = EK.UX.QSTabs;
import rsTabs = EK.UX.Tabs;
import QuickSidebarTab = EK.UX.QuickSidebarTab;
import QuickSidebarPanel = EK.UX.QuickSidebarPanel;