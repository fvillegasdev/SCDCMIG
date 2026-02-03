/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Icon.tsx" />

namespace EK.UX {
    "use strict";

    export enum TitleSizeEnum {
        small = 0,
        normal = 1,
        large = 2
    }

    interface IPortletProps extends React.Props<any> {
        bordered?: boolean;
        loading?: boolean;
        color?: string;
    }

    interface IPortletTitleProps extends global.props {
        title?: string;
        subTitle?: string;
        color?: string;
        icon?: string;
    }

    export class PortletTitle extends React.Component<IPortletTitleProps, {}> {
        static defaultProps: IPortletTitleProps = {
            $displayName: "PortletTitle"
        };
        render(): any {
            let titleElement: any;
            let className: string = "caption-subject";

            if (this.props.title) {
                titleElement = <div className="caption">
                    {this.props.icon ? <Icon icon={this.props.icon} /> : null}
                    <span className={className + (this.props.color ? " font-" + this.props.color : "")}>
                        {this.props.title}
                    </span>
                    {this.props.subTitle !== undefined ?
                        <span className="caption-helper">
                            &nbsp;{this.props.subTitle}
                        </span> : null}
                </div>;
            } else  {
                titleElement = <div>{this.props.children}</div>;
            }

            return titleElement;
        }
    }

    export class PortletActions extends React.Component<global.props, {}> {
        static defaultProps: global.props = {
            $displayName: "PortletActions"
        };
        render(): any {
            return <div className="actions">{this.props.children}</div>;
        }
    }

    export class Portlet extends React.Component<IPortletProps, {}> {
        constructor(props:IPortletProps) {
            super(props);
        }

        static defaultProps: IPortletProps = {
            bordered: false,
            loading: false,
            color: null
        };

        refs: {
            tabContainer: Element;
        };

        componentDidMount() {
            //let style: string = "\
            //.withborder {\
            //    border-style: solid;\
            //    border-width: 2px;\
            //    border-radius: 6px;\
            //}\
            //";

            //EK.Global.appendStyle("portlet-custom-style", style);
        }

        render(): JSX.Element {
            let className: string = "portlet" +
                (this.props.color !== null &&  this.props.bordered ? " box " + this.props.color : "") +
                (this.props.color !== null && !this.props.bordered ? " solid " + this.props.color : "") +
                (this.props.color === null &&  this.props.bordered ? " light " : ""); // bordered
            // <div className={"portlet-title " + (this.props.color && this.props.bordered ? " border-" + this.props.color : "")}>
            return <div className={className} style={{ marginTop: "10px" }}>
                <div className={"portlet-title"}>
                    {React.Children.map(this.props.children, (child: any, index: number) => {
                        if (child.props.$displayName === "PortletTitle") {
                            return child;
                        } else {
                            return null;
                        };
                    })}
                </div>
                <div className="portlet-body">  
                    <div className="tab-content" style={{ minHeight: 100 }}>
                        {React.Children.map(this.props.children, (child: any, index: number) => {
                            if (child.props.$displayName !== "PortletTitle" && child.props.$displayName !== "PortletActions") {
                                return child;
                            } else {
                                return null;
                            };
                        })}
                    </div>
                </div>
            </div>;
        }
    }
}

import Portlet = EK.UX.Portlet;
import PortletTitle = EK.UX.PortletTitle;