namespace EK.UX {
    "use strict";
    let w: any = window;

    interface ITemplateEmptyProps extends React.Props<any> {
        appSettings: any;
        favoritos?: any;
        cargaAppInfo?: () => void;
        cargaCompanias?: () => void;
        cargaFavoritos?: () => void;
    };
      
    export interface IState {
    }

    export class MainTemplateEmpty extends React.Component<ITemplateEmptyProps, IState> {
        constructor(props: ITemplateEmptyProps) {
            super(props);
        };
       
        shouldComponentUpdate(nextProps: ITemplateEmptyProps, nextState: IState): boolean {
            return (hasChanged(this.props.appSettings.app, nextProps.appSettings.app))
                || (hasChanged(this.props.favoritos, nextProps.favoritos))
        };
        componentWillReceiveProps(nextProps: ITemplateEmptyProps): void {
        };
        componentWillUpdate(nextProps: ITemplateEmptyProps, nextState: ITemplateEmptyProps) {
        };
        componentWillMount(): any {
            let config: any = window["__USER_CONFIG"];
            if (config) {
                global.dispatchSuccessful("global-info", config.Configuration);
                global.dispatchSuccessful("usuarios-favoritos", config.Favoritos);
                global.dispatchSuccessful("global-notifications", config.Notificaciones);
                global.dispatchSuccessful("global-calendar", config.Calendario);
            };
        };
        componentDidMount(): any { };
        render(): JSX.Element {
            try {
                if (!this.props.appSettings
                    || !this.props.appSettings.app
                    || this.props.appSettings.app.status !== AsyncActionTypeEnum.successful) {
                    return null;
                } else {
                    let loading: any = $("#loading-page-animation");
                    if (loading.size() > 0) {
                        loading.remove();
                    };
                };

                return <div className="page-wrapper">
                    <div className="clearfix"> </div>
                    <div className="page-container page-modal">
                        <div id="__app_router"></div>
                        <div id="__content">
                            {this.props.children}
                        </div>
                    </div>
                </div>;
            }
            catch (e) {
                alert(e.message);
            }
        }
    }
    const mapProps: any = (state: any): any => {
        return {
            appSettings: state.global
        };
    };
    // connect Template to the Main Store
    export let TemplateEmpty: any = ReactRedux.connect(mapProps, null, null, {
        pure: true
    })(MainTemplateEmpty);
}