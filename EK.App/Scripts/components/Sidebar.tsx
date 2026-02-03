namespace EK.UX.Sidebars {
    "use strict";

    const w: any = window;

    export interface ISidebarProps extends React.Props<any> {
        id?: string;
        level?: number;
        className?: string;
        global?: any;
        onClose?: () => void;
    };

    export class $Sidebar extends React.Component<ISidebarProps, ISidebarProps> {
        constructor(props: ISidebarProps) {
            super(props);

            this.onClose = this.onClose.bind(this);
            this.getComponentState = this.getComponentState.bind(this);
        }

        static defaultProps: ISidebarProps = {
            id: "",
            level: 1
        };

        refs: {
            sideBar: Element;
        };

        onClose(): any {
            if (this.props.onClose) {
                this.props.onClose();
            };

            global.closeSidebar(this.props.id);
        };

        getComponentState(props?: ISidebarProps): any {
            let retValue: any = {
                data: { state: 0 }
            };

            let id: string = "state$sidebar$" + props.id;

            if (props.global[id]) {
                retValue = props.global[id];
            };

            return global.getData(retValue);
        };

        shouldComponentUpdate(nextProps: ISidebarProps, nextState: ISidebarProps): boolean {
            let tg: any = this.getComponentState(this.props);
            let ng: any = this.getComponentState(nextProps);
            
            if (tg.state !== ng.state) {
                return true;
            }
            else {
                return false;
            }
        };

        render(): JSX.Element {
            let s: any = this.getComponentState(this.props);
            let wClass: string = "c-sidebar-container ";
            let wClassWindows: string = "c-sidebar-window";

            if (s.state === 1) {
                wClass += " c-sidebar-open";
            };

            if (this.props.className) {
                wClassWindows += " " + this.props.className;
            };

            let classParent: any = $(".c-sidebar-container");
            let zIndexClass: any = classParent.css("z-index") ? classParent.css("z-index") : 10048;
            let levelSumary: number = 0;
            if(this.props.level > 1) {
                levelSumary= (this.props.level-1) * 3;
            }
            let zIndexParent: number = zIndexClass + levelSumary;
            let zIndexBlocked: number = zIndexParent + 1;
            let zIndexContent: number = zIndexParent + 2;

            return <div className={wClass} style={{ zIndex: zIndexParent }}>
                <div className="c-sidebar-blocked" style={{ zIndex: zIndexBlocked }}></div>
                <div className={wClassWindows} ref="sideBar" style={{ zIndex: zIndexContent }}>
                    <button className="c-sidebar-close-button" onClick={this.onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                    <div>
                        {s.state === 1 ? this.props.children : null}
                    </div>
                </div>
            </div>;
        };
    };

    export const sidebarMapProps: any = (state: any): any => {
        return {
            global: state.global
        };
    };

    export let Sidebar: any = ReactRedux.connect(sidebarMapProps, null)($Sidebar);
}

import Sidebar = EK.UX.Sidebars.Sidebar;