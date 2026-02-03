namespace EK.UX.QuickSidePanels {
    "use strict";
    const BLOGPOST_SELECT_ENTITY = "BlogPost$SelectEntity";

    export interface IQuickSidePanelRight extends React.Props<any> {
        entity?: any;
        id: string;
        data?: any;
        config?: page.IPageConfig;
        updateTab?: (tab: number, data: any) => void;
        bordered?: boolean;
        loading?: boolean;
        color?: string;
        title?: string;
        wrapperStyle?: React.CSSProperties;
        headerStyle?: React.CSSProperties;
        contentStyle?: React.CSSProperties;
    }

    export let QuickSidePanelRight: any = global.connect(class extends React.Component<IQuickSidePanelRight, IQuickSidePanelRight> {
        constructor(props: IQuickSidePanelRight) {
            super(props);
            this.onClickCerrar = this.onClickCerrar.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entity = state.global["catalogo$" + BLOGPOST_SELECT_ENTITY];
            return retValue;
        };

        onClickCerrar(idElement: string):any {
            let globalstate: any = EK.Store.getState().global;
            for (var p in globalstate) {
                let index: number = p.indexOf("state$");
                if (index >= 0) {
                    if (p !== this.props.config.id) {
                        let data = getData(globalstate[p])
                        if (data.viewMode === false) {
                            let stateUpdate = p.slice(6);
                            this.props.config.setState({ viewMode: true }, stateUpdate);
                        }
                    }
                };
            };

            $("#page-quick-side-toogle" + this.props.id).toggleClass("ek10-page-quick-panel-open");
            this.props.config.setState({ viewMode: true });
        }

        componentDidUnMount(): void {
            global.dispatchSuccessful("global-page-data", [], BLOGPOST_SELECT_ENTITY);
        };

        componentDidMount() {           
        }
        componentDidUpdate(prevProps: IQuickSidePanelRight, prevState: IQuickSidePanelRight): void {
            let id: string = this.props.id;
            let Entity = getData(this.props.entity);

            let IDComponente: string = Entity.IDComponente;

            if (IDComponente === id) {
                $("#page-quick-side-toogle" + this.props.id).toggleClass("ek10-page-quick-panel-open"); 
            }
        }

        shouldComponentUpdate(nextProps: IQuickSidePanelRight, nextState: IQuickSidePanelRight): boolean {
            return hasChanged(this.props.entity, nextProps.entity);
        }

        render(): JSX.Element {

            let Entity = getData(this.props.entity);
            let idEntity: number = Entity.ID ? Entity.ID : 0;
            let IDComponente: string = Entity.IDComponente;
            let titleHeader: string = Entity.TipoEntidad ? Entity.TipoEntidad.Nombre : "";

            let claveModel: string = Entity.Clave ? Entity.Clave : "";
            let titleModel: string = Entity.Nombre ? Entity.Nombre : "";
            let id:string = this.props.id;
            
            
            if (IDComponente !== id || (IDComponente === id && idEntity===undefined)) {
                return <div id={"page-quick-side-toogle"+ this.props.id} className="">
                    <div className="ek10-page-quick-panel-wrapper--on" data-close-on-body-click="true"></div>
                    <div id="pageQuickSidebarOverlay" onClick={this.onClickCerrar.bind(this)} className="ek10-page-quick-panel-overlay" ></div>
                </div>;
            }




            let wrapperStyle: React.CSSProperties = this.props.wrapperStyle;
            if (!wrapperStyle) {
                wrapperStyle = {};
            };
            let headerStyle: React.CSSProperties = this.props.headerStyle;
            if (!headerStyle) {
                headerStyle = {};
            };
            let contentStyle: React.CSSProperties = this.props.contentStyle;
            if (!contentStyle) {
                contentStyle = { height: "calc(100 % - 5 %)"};
            };
       

            let idForm: string = [this.props.id, "$quickSidePanel$Righ"].join("");
            return <div id={"page-quick-side-toogle" + this.props.id} className="">
                <div style={wrapperStyle} className="ek10-page-quick-panel-wrapper--on" data-close-on-body-click="true">
                    <div style={headerStyle} className="ek10-page-quick-header">
                        <div className="page-quick-sidebar-title" ref="tabTitle">
                            <span className="caption-subject uppercase" >
                                {titleHeader}
                            </span>
                        </div>
                        <div id="buttonCloseQuickPanel" className="ek10-page-quick-sidepanel-close" onClick={this.onClickCerrar.bind(this)}>
                            <a >
                                <i className="fal fa-times" style={{ lineHeight: "inherit"}}></i>
                            </a>
                        </div>
                    </div>
                    <div className="ek10-page-quick-content">
                        <div className="caption-subject" style={{ marginTop: "4px", height: "calc(5%)"}}>
                            <span className='badge badge-success bold'>
                                {claveModel}
                            </span>
                            <span className='bold' style={{ fontSize:"90%" }}>
                                {" "+titleModel}
                            </span>
                        </div>
                        <div className="ek10-tabs-component-content-scrollbar" style={{ contentStyle }}>
                            {Forms.cloneChildrenElements(this.props.children, (p: any) => {
                                p.idFormSection = idForm;
                                return p;
                            })}
                        </div>
                    </div>
                </div>
                <div id="pageQuickSidebarOverlay" onClick={this.onClickCerrar.bind(this)} className="ek10-page-quick-panel-overlay" ></div>
                </div>;
        }
    });

    interface IQuickSidePanelRightWrappedProps extends React.Props<any> {
    }
    
    export class QuickSidePanelRightWrapped$DLL extends React.Component<IQuickSidePanelRightWrappedProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        render(): any {
            return <QuickSidePanelRight {...this.props}/>
        }
    }

    export const QuickSidePanelRightWrappedDDL: any = ReactRedux.connect(QuickSidePanelRightWrapped$DLL.props, null)(QuickSidePanelRightWrapped$DLL);
};
import IQuickSidePanelRight = EK.UX.QuickSidePanels.IQuickSidePanelRight;
import QuickSidePanelRight = EK.UX.QuickSidePanels.QuickSidePanelRight;
import QuickSidePanelWrappedSGP = EK.UX.QuickSidePanels.QuickSidePanelRightWrappedDDL;