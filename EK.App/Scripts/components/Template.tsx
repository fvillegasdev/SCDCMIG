namespace EK.UX {
    "use strict";
    let w: any = window;

    interface ITemplateWrapperProps extends React.Props<any> {
        isModal: boolean;
    };

    interface ITemplateProps extends React.Props<any> {
        appSettings: any;
        favoritos?: any;
        cargaAppInfo?: () => void;
        cargaCompanias?: () => void;
        cargaFavoritos?: () => void;
    };

    export interface IState {
    }
    
    export class MainTemplate extends React.Component<ITemplateProps, IState> {
        constructor(props: ITemplateProps) {
            super(props);
        };

        shouldComponentUpdate(nextProps: ITemplateProps, nextState: IState): boolean {
            return (hasChanged(this.props.appSettings.app, nextProps.appSettings.app))
                || (hasChanged(this.props.favoritos, nextProps.favoritos))
        };

        componentWillReceiveProps(nextProps: ITemplateProps): void {
        };

        componentWillUpdate(nextProps: ITemplateProps, nextState: ITemplateProps) {
        };
        componentWillMount(): any {
            let config: any = window["__USER_CONFIG"];
            if (config) {
                //console.log(config)
                global.dispatchSuccessful("global-info", config.Configuration);
                global.dispatchSuccessful("usuarios-favoritos", config.Favoritos);
                global.dispatchSuccessful("global-notifications", config.Notificaciones);
                global.dispatchSuccessful("global-notificationsApp", config.NotificacionesApp);
                global.dispatchSuccessful("global-calendar", config.Calendario);
            };
        };
        componentDidMount(): any {
            //this.props.cargaAppInfo();
            //this.props.cargaCompanias();
            //this.props.cargaFavoritos();

            global.executeWorkerNotifications("");
        };

        render(): JSX.Element {
            try {
                if (!this.props.appSettings
                    || !this.props.appSettings.app
                    || this.props.appSettings.app.status !== AsyncActionTypeEnum.successful) {
                    return null;
                } else {
                    $("body").css("background-color", "#fff");
                    let loading: any = $("#loading-page-animation");
                    if (loading.size() > 0) {
                        loading.remove();
                    };
                };

                return <div className="page-wrapper">
                    <HeaderTemplate
                        appSettings={this.props.appSettings} />
                    <div className="clearfix"> </div>
                    <div className="page-container">
                        <Menu />
                        <div id="__app_router"></div>
                        <div id="__content">
                            <menu.ContextMenu id="mainMenuContext" />
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

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            cargaAppInfo: (): void => {
                dispatchAsync("global-info", "Kontrol/GetConfiguracion");
            },
            cargaCompanias: (): void => {
                dispatchAsync("global-usuariocompanias", "usuarios/niveles");
            },
            cargaFavoritos: (): void => {
                dispatchAsync("usuarios-favoritos", "usuarios/favoritos");
            }
        };
    };

    const mapProps: any = (state: any): any => {
        return {
            appSettings: state.global
        };
    };


    interface IHeaderProps extends React.Props<any> {
        appSettings: any;
        onClick: (item: any) => void;
    };


    export class _HeaderTemplate extends React.Component<IHeaderProps, IState> {
        constructor(props: IHeaderProps) {
            super(props);

            this.onSearch = this.onSearch.bind(this);
        }

        refs: {
            input: any;
        };

        onSearch(e: any): any {
            let filter: any = this.refs.input.value;

            clearTimeout(w.$$searchDispatch);
            //
            w.$$searchDispatch = setTimeout(() => { global.dispatchSuccessful("global-search", filter); }, 1000);
            //
            if (!this.props.appSettings
                || !this.props.appSettings.pageSearch
                || !this.props.appSettings.pageSearch.data
                || !this.props.appSettings.pageSearch.data.id) {
                return;
            }
            
            let id: string = this.props.appSettings.pageSearch.data.id;
            $("#" + id).DataTable().search(filter).draw();
            
        }

        componentDidMount() {
            w.Layout.initHeader();
        };

        render(): JSX.Element {
            if (!global.isSuccessful(this.props.appSettings.app)) {
                return null;
            };

            let app: any = global.getData(this.props.appSettings.app);
            let displaySearch: boolean = false;
            let imageFileName: string = app && app.Me ? app.Me.Foto : "";
            let logoFileName: string = app ? app.Logo : "";
            ///
            let url: string = ["#/kontrol/notificaciones/id?nuevo&" + global.encodeParameters({ ID: -1, IdReferencia: location.href })].join("");
            let indice = 0;
            
            let NotificacionAppCatClass = indice > 0 ? 'notificacionAppCatEna' : 'notificacionAppCatDis';
            let ClassIcon = indice > 0 ? 'fad fa-calendar notificacionAppCatEna' : 'fad fa-calendar notificacionAppCatDis';
            let currentUrl: any = window.location.href;
            let ambiente = currentUrl.includes('intra') ? currentUrl.includes('apps.intraurbana') ? 'Intraurbana sur' : 'Intraurbana de occidente' : '';

            return <div
                className="page-header navbar navbar-fixed-top">
                <div className="page-header-inner ">
                    <div className="page-logo">
                        <div className="menu-toggler sidebar-toggler">
                            <span></span>
                        </div>
                        <a href="#/">
                            <img
                                src={global.getFullUrl("/" + logoFileName, "")}
                                alt="logo"
                                className="logo-default"
                                style={{
                                    width: 150,
                                    height: 30,
                                    marginTop: 10
                                }}
                            />
                         
                        </a>
                       
                    </div>
                   
                    <a href="javascript:;"
                        className="menu-toggler responsive-toggler"
                        data-toggle="collapse" data-target=".navbar-collapse">
                        <span></span>
                    </a>
                    <a id="qsbToogle" className="responsive-toggler">
                        <i className="fas fa-bars"></i>
                    </a>
                    <div className="search-form hidden-xs">
                        <div className="input-group">
                            <input type="text" onChange={this.onSearch} ref="input" style={{ color: "#8c8b8b",paddingLeft: "7px", outline:0, border:0,marginTop:"3px"}} className="form-control" placeholder="Buscar..." name="query" />
                            <span className="input-group-btn">
                                <a href="javascript:;" className="btn submit">
                                    <i className="icon-magnifier"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="top-menu">
                        <ul className="nav navbar-nav pull-right" id="navBarNotifications">

                            <li className="dropdown dropdown-user hidden-xs">
                               
                                    <div className="username-content" style={{marginLeft:'5px', paddingTop:'20px'}}>
                                        <span className="username username-hide-on-mobile">
                                        {ambiente}
                                        </span>
                                     
                                    </div>
                                    
                                
                            </li><li className="dropdown dropdown-user hidden-xs">
                                <a
                                    href="https://ruba.atlassian.net/servicedesk/customer/portal/35/group/71/create/10380"
                                    style={{
                                        borderBottomLeftRadius: 6,
                                        borderBottomRightRadius: 6,
                                        borderTopLeftRadius: 6,
                                        borderTopRightRadius: 6,
                                        margin: "3px 0px",
                                        padding: "15px 10px 10px 10px"
                                    }}
                                    target="_blank"
                                    className="">

                                    <i className="fas fa-2x fa-headset"></i>
                                    <div className="username-content" style={{marginLeft:'5px'}}>
                                        <span className="username username-hide-on-mobile">
                                           Servicio al cliente
                                        </span>
                                        <span className="username-title username-hide-on-mobile">
                                            Bienvenido al área de soporte de la UAT
                                        </span>
                                    </div>
                                    
                                </a>
                            </li>
                          
                            <DropdownFavoritos />
                            <MessageNotification icon="fad fa-bell notificacion" typeElement="Mensajes"></MessageNotification>

                            
                            <MessageNotificationAppCat icon={"fad fa-calendar"} typeElement="Mensajes"></MessageNotificationAppCat>

                             
                            <TasksNotification icon="fad fa-clipboard-check tareas" typeElement="Tareas"></TasksNotification>
                            <li className="dropdown dropdown-user hidden-xs">
                                <a
                                    href="javascript:;"
                                    style={{
                                        borderBottomLeftRadius: 6,
                                        borderBottomRightRadius: 6,
                                        borderTopLeftRadius: 6,
                                        borderTopRightRadius: 6,
                                        margin: "3px 0px",
                                        padding: "15px 10px 10px 10px"
                                    }}
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    data-hover="dropdown"
                                    data-close-others="true">
                                    <img alt="" className="img-circle" src={global.getFullUrl("/"+imageFileName, "")} />
                                    <div className="username-content">
                                        <span className="username username-hide-on-mobile">
                                            {app.Me.Nombre}
                                        </span>
                                        <span className="username-title username-hide-on-mobile">
                                            {app.Me.Posicion}
                                        </span>
                                    </div>
                                    <i className="fa fa-angle-down"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-default">
                                    <li>
                                        <a href="?me#/kontrol/usuarios/id">
                                            <i className="icon-user"></i> Mi perfil </a>
                                    </li>
                                    {/*  <li>
                                        <a href="?me#/kontrol/usuarios/password/id">
                                            <i className="icon-user"></i> Cambiar contraseña </a>
                                    </li> */}
                                    <li>
                                        <a href="#/kontrol/workflows/procesos">
                                            <i className="icon-ek-130"></i> Mis autorizaciones</a>
                                    </li>
                                    <li className="dropdown-menu-container">
                                        <modal.ModalButton icon="icon-envelope" text="Nuevo mensaje" url={url} buttonType="anchor"/>
                                    </li>
                                    <li className="dropdown-menu-container">
                                        <modal.ModalButton icon="fa fa-calendar" text="Nuevo cita" url={"#/kontrol/citas/id?nuevo"} buttonType="anchor" />
                                    </li>

                                    <li className="dropdown-menu-container">
                                        <modal.ModalButton icon="fas fa-tasks" text="Nuevo tarea" url={"#/kontrol/tareasRapidas/id?nuevo"} buttonType="anchor" />
                                    </li>
                                    <li>
                                        <a href="Kontrol/SignOut">
                                            <i className="icon-key"></i> Log Out </a>
                                    </li>
                                    <li style={{backgroundColor: "#f1f1f1", fontWeight: "bold"}}>
                                        <a href="#"><i className="fas fa-code-branch"></i>{app.Version}</a>
                                    </li>
                                </ul>
                            </li>
                            <LanguageNotificationComponent />
                        </ul>
                    </div>
                </div>
            </div>;
        }
    }

    export class FooterTemplate extends React.Component<ITemplateProps, {}> {
        constructor(props: any) {
            super(props);
        }

        render(): JSX.Element {
            return <div className="page-footer">
                <div className="page-footer-inner">
                    2016 &copy; EnKontrol
                <a target="_blank" href="http://www.enkontrol.com"> EnKontrol</a> &nbsp;|&nbsp;
                <a href="#" title="EnKontrol" target="_blank">EnKontrol</a>
                </div>
                <div className="scroll-to-top">
                    <i className="icon-arrow-up"></i>
                </div>
            </div>;
        }
    }
    //
    export class Template extends React.Component<ITemplateWrapperProps, {}> {
        constructor(props: ITemplateWrapperProps) {
            super(props);
        };

        render(): JSX.Element {
            if (this.props.isModal === true) {
                return <TemplateEmpty>{this.props.children}</TemplateEmpty>;
            }
            else {
                return <TemplateFull>{this.props.children}</TemplateFull>;
            };
        };
    };
    // connect Template to the Main Store
    export let TemplateFull: any = ReactRedux.connect(mapProps, mapDispatchs, null, {
        pure: true
    })(MainTemplate);

    export let HeaderTemplate: any = ReactRedux.connect(mapProps, mapDispatchs)(_HeaderTemplate);
}