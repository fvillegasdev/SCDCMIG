namespace EK.UX {
    "use strict";

    export interface IDropdownNotificationItem {
        Id: number;
        Time?: string;
        Title?: string;
        Image?: string;
        Text?: string;
        Data?: any;
        ValueNow: number;
        TypeElement?: string;
        inicializarForma?: (idForm: string) => void;
    };
    export interface IDropdownNotificationProps extends React.Props<any> {
        app?: DataElement;
        data?: IDropdownNotificationItem[];
        icon: string;
        headerFormat?: (item: IDropdownNotificationProps) => JSX.Element;
        itemFormat?: (item: IDropdownNotificationItem) => JSX.Element;
        typeElement?: string;
        loadNotifications?: () => void;
        //loadTasks?: () => void; 
        //loadMessages?: () => void;    
        notifications: any;
        notificationsApp: any;
    };
    export interface IDropdownNotificationItemProps extends React.Props<any> {
        item?: any;
        itemFormat: (item: any) => JSX.Element;
        inicializarForma?: (idForm: string) => void;
    };
    export interface IDropdownSendNotificationProps extends React.Props<any> {
        app?: any;
        page?: any;
        setNotificacion?: (notificacion: any) => void;
    };
    export interface IDropdownLanguageProps extends React.Props<any> {
        claveLanguage?: any;
        items: any;
        lang: any;
    };
    // format for each item style
    export const DropdownNotificationHeader: (item: IDropdownNotificationProps, notificationsCount: number) => JSX.Element =
        (item: IDropdownNotificationProps, notificationsCount: number): JSX.Element => {
            switch (item.typeElement) {
                case "Notificacion":
                    return <h3><span className="bold">{notificationsCount} notificaciones</span> pendientes</h3>;
                case "Tarea":
                    return <h3>Tiene <span className="bold">{notificationsCount} tareas</span> pendientes</h3>;
            }
        };

    export const DropdownItemStyle: (item: any) => JSX.Element =
        (item: any): JSX.Element => {
            switch (item.TypeElement) {
                case "Notificacion":
                    return <li>
                        <a href={"#/kontrol/workflows/plantilla/tarea/" + item.Id}>
                            <span className="time">{item.Time}</span>
                            <span className="details">
                                <span className="label label-sm label-icon label-success">
                                    <EK.UX.Icon icon={item.Image} />
                                </span>
                                {item.Title}
                            </span>
                        </a>
                    </li>;
                case "Notificacion$Single":
                    return <SingleNotificationItem item={item} />
                case "Tarea":
                    return <li>
                        <a href={"#/kontrol/Workflows/autorizacion/" + item.Id}>
                            <div className="row" style={{ paddingLeft: 5 }}>
                                <span className="task">
                                    <span className="desc" style={{ fontWeight: 600 }}>{item.Title} </span>
                                </span>
                            </div>
                            <div className="row" style={{ paddingLeft: 5 }}>
                                <span className="txt" >{item.Text}</span>
                            </div>
                        </a>
                    </li>;
            }
        };

    export class DropdownNotificationAppCat extends React.Component<IDropdownNotificationProps, {}> {
        constructor(props: IDropdownNotificationProps) {
            super(props);
        }
        //
        static props: any = (state: any): any => {
            //console.log(state.global.notificationsApp)
            return {
                app: state.global.app,
                notifications: state.global.notificationsApp
            };
        }
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => {
            let url = "Kontrol/GetNotificationsApp";
            return {
                loadNotifications: (): void => {
                    dispatchAsync("global-notificationsApp", "Kontrol/GetNotificationsApp");
                },
                inicializarForma: (idForm: string): void => {
                    dispatch(EK.Global.action("forms-reset-state", { idForm }));
                }
            };
        };
        //
        componentDidMount(): void {
            //this.props.loadNotifications();
        }
        shouldComponentUpdate(nextProps: IDropdownNotificationProps, nextState: IDropdownNotificationProps) {
            if (hasChanged(this.props.notifications, nextProps.notifications)) {
                if (isSuccessful(nextProps.notifications)) {
                    return true;
                } else {
                    return false;
                };
            };

            return false;
        };
        render(): JSX.Element {
            let items: JSX.Element[] = [];
            let ddItemsElements: JSX.Element = null;
            let notificationsData: any = getData(this.props.notifications);
            //console.log(notificationsData)
            let notificationsCount: number = 0;
            let notifications: any[] = [];
            let itemType: string = this.props.typeElement;

            if (notificationsData && notificationsData[itemType] && notificationsData[itemType].length > 0) {
                notifications = notificationsData[itemType];
            };

            notificationsCount = notifications.length;
            if (itemType === "Tareas") {
                let onTaskClick: (m: any) => any = (m: any): any => {
                    go("/kontrol/autorizaciones/" + m.ID);
                };
                if (isSuccessful(this.props.app)) {
                    items = notifications.map((item: any, index: number): any => {
                        //console.log(item)
                        return <li key={index} onClick={() => { onTaskClick(item); }} >
                            <a style={{ padding: 5, borderLeft: "5px solid #00C853" }}>
                                <div style={{ color: "#616161", fontSize: 12, padding: "5px 10px" }}>
                                    <div className="bold">({item.Instancia.IdReferencia}) {item.Instancia.Workflow.Tipo.Nombre}/{item.Instancia.Nombre}</div>
                                    <div>{item.Instancia.UserOwner.Nombre} {item.Instancia.UserOwner.Apellidos}</div>
                                    <div className="badge badge-default">{global.formatDateTime(item.FechaAsignacion)}</div>
                                </div>
                            </a>
                        </li>;
                    });
                };
            }
            else {
                let onMessageClick: (m: any) => any = (m: any): any => {
                    go("/kontrol/notificaciones/" + m.ID);
                    //console.log(m)
                };
                notificationsCount = 0;
                if (isSuccessful(this.props.app)) {
                    items = notifications.map((item: any, index: number): any => {
                        // console.log(item);
                        let tt = false;
                        let bgColor: string = "#E8EAF6";
                        let textColor: string = "#353b48";

                        switch (item.Clave) {
                            case "NOT-APPCAT-CAMBIO-DIAG":
                                bgColor = "#fdcb6e";
                                break;
                            case "NOT-APPCAT-CAMBIO-OT":
                                bgColor = "#e67e22";
                                break;
                            case "NOT-APPCAT-CAMBIO-INCIDENCIA":
                                bgColor = "#3498db";
                                break;
                            case "NOT-APPCAT-OT-TERMINADO":
                                bgColor = "#b8e994";
                                tt = true;
                                break;
                        }


                        if (item.Leido === true) {
                            bgColor = "#f1f2f6";
                        }
                        else {
                            notificationsCount++;
                        };
                        return <li key={index} onClick={() => { onMessageClick(item); }} style={{ marginBottom: 2 }}>
                            <a style={{ padding: 0, backgroundColor: bgColor, margin: 1 }}>
                                <div style={{ color: "#616161", fontSize: 12, padding: "5px 10px" }}>
                                    {tt ? <span>
                                        <div className="bold">{item.Nombre}</div>
                                        <div><span className="bpld"> # OT </span> <span className="badge badge-info"> {item.IdOrdenTrabajo}</span></div>
                                        <div>{item.CreadoPor.Nombre} {item.CreadoPor.Apellidos}</div>
                                        <div className="badge badge-default">{global.FormatDateTimePre(item.Creado)}</div>
                                    </span>
                                        :
                                        <span>
                                            <div className="bold">{item.Nombre} - FOLIO {item.Folio}</div>
                                            <div><span className="bpld"> Ubicacion </span> <span className="badge badge-info"> {item.Ubicacion}</span></div>
                                            <div>{item.CreadoPor.Nombre} {item.CreadoPor.Apellidos}</div>
                                            <div className="badge badge-default">{global.FormatDateTimePre(item.Creado)}</div>
                                        </span>
                                    }
                                </div>
                            </a>
                        </li>;
                    });
                };
            };
            let titulo: string = itemType === "Mensajes" ? "notificaciones " : "autorizaciones";
            var ddMenu: JSX.Element = null;
            ddMenu = <ul className="dropdown-menu" id={"header_notification_" + this.props.typeElement}>
                <li className="external" style={{ borderBottom: "1px solid #B0BEC5" }}>
                    <span className="bold">{notificationsCount} {titulo} </span> pendientes
                </li>
                <li>
                    <ul className="dropdown-menu-list" style={{ overflowY: "scroll", height: "250px" }}
                        data-handle-color="#637283">
                        {items}
                    </ul>
                </li>
            </ul>;


            let iconClass: string = this.props.icon;
            //console.log(notificationsCount)
            if (notificationsCount > 0) {

            }
            if (notificationsCount > 0) {
                iconClass += " notificacionAppCatEna ";
                if (this.props.typeElement === "Mensajes") {
                    iconClass += " faa-ring faa-slow animated";
                }
                else if (this.props.typeElement === "Tareas") {
                    iconClass += " faa-horizontal animated";
                };
            } else {
                iconClass += " notificacionAppCatDis";
            }

            return <li className="dropdown dropdown-extended dropdown-notification">
                <a
                    href="javascript:;"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    data-hover="dropdown"
                    data-close-others="true"
                >
                    <EK.UX.IconAC icon={iconClass} style={{ color: '#000' }} />
                    {notificationsCount > 0 ? <span className="badge badge-default">{notificationsCount}</span> : <span></span>}
                </a>
                {ddMenu}
            </li>;
        }
    }
    export class DropdownNotification extends React.Component<IDropdownNotificationProps, {}> {
        constructor(props: IDropdownNotificationProps) {
            super(props);
        }
        //
        static props: any = (state: any): any => {
            return {
                app: state.global.app,
                notifications: state.global.notifications
            };
        }
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => {
            let url = "Kontrol/GetNotifications";
            return {
                loadNotifications: (): void => {
                    dispatchAsync("global-notifications", "Kontrol/GetNotifications");
                },
                inicializarForma: (idForm: string): void => {
                    dispatch(EK.Global.action("forms-reset-state", { idForm }));
                }
            };
        };
        //
        componentDidMount(): void {
            //this.props.loadNotifications();
        }
        shouldComponentUpdate(nextProps: IDropdownNotificationProps, nextState: IDropdownNotificationProps) {
            if (hasChanged(this.props.notifications, nextProps.notifications)) {
                if (isSuccessful(nextProps.notifications)) {
                    return true;
                } else {
                    return false;
                };
            };

            return false;
        };
        render(): JSX.Element {
            let items: JSX.Element[] = [];
            let ddItemsElements: JSX.Element = null;
            let notificationsData: any = getData(this.props.notifications);
            let notificationsCount: number = 0;
            let notifications: any[] = [];
            let itemType: string = this.props.typeElement;

            if (notificationsData && notificationsData[itemType] && notificationsData[itemType].length > 0) {
                notifications = notificationsData[itemType];
            };

            notificationsCount = notifications.length;
            if (itemType === "Tareas") {
                let onTaskClick: (m: any) => any = (m: any): any => {
                    go("/kontrol/autorizaciones/" + m.ID);
                };
                if (isSuccessful(this.props.app)) {
                    items = notifications.map((item: any, index: number): any => {
                        return <li key={index} onClick={() => { onTaskClick(item); }} >
                            <a style={{ padding: 5, borderLeft: "5px solid #00C853" }}>
                                <div style={{ color: "#616161", fontSize: 12, padding: "5px 10px" }}>
                                    <div className="bold">({item.Instancia.IdReferencia}) {item.Instancia.Workflow.Tipo.Nombre}/{item.Instancia.Nombre}</div>
                                    <div>{item.Instancia.UserOwner.Nombre} {item.Instancia.UserOwner.Apellidos}</div>
                                    <div className="badge badge-default">{global.formatDateTime(item.FechaAsignacion)}</div>
                                </div>
                            </a>
                        </li>;
                    });
                };
            }
            else {
                let onMessageClick: (m: any) => any = (m: any): any => {
                    console.log(m)
                    go("/kontrol/notificaciones/" + m.ID);
                };
                notificationsCount = 0;
                if (isSuccessful(this.props.app)) {
                    items = notifications.map((item: any, index: number): any => {
                        let bgColor: string = "#E8EAF6";
                        if (item.Leido === true) {
                            bgColor = "#fff";
                        }
                        else {
                            notificationsCount++;
                        };
                        return <li key={index} onClick={() => { onMessageClick(item); }} style={{ marginBottom: 2 }}>
                            <a style={{ padding: 0, backgroundColor: bgColor, margin: 1 }}>
                                <div style={{ color: "#616161", fontSize: 12, padding: "5px 10px" }}>
                                    <div className="bold">{item.Nombre}</div>
                                    <div>{item.CreadoPor.Nombre} {item.CreadoPor.Apellidos}</div>
                                    <div className="badge badge-default">{global.formatDateTime(item.Creado)}</div>
                                </div>
                            </a>
                        </li>;
                    });
                };
            };
            let titulo: string = itemType === "Mensajes" ? "notificaciones " : "autorizaciones";
            var ddMenu: JSX.Element = null;
            ddMenu = <ul className="dropdown-menu" id={"header_notification_" + this.props.typeElement}>
                <li className="external" style={{ borderBottom: "1px solid #B0BEC5" }}>
                    <span className="bold">{notificationsCount} {titulo} </span> pendientes
                </li>
                <li>
                    <ul className="dropdown-menu-list" style={{ overflowY: "scroll", height: "250px" }}
                        data-handle-color="#637283">
                        {items}
                    </ul>
                </li>
            </ul>;

            let iconClass: string = this.props.icon;
            if (notificationsCount > 0) {
                if (this.props.typeElement === "Mensajes") {
                    iconClass += " faa-ring faa-slow animated";
                }
                else if (this.props.typeElement === "Tareas") {
                    iconClass += " faa-horizontal animated";
                };
            };

            return <li className="dropdown dropdown-extended dropdown-notification">
                <a
                    href="javascript:;"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    data-hover="dropdown"
                    data-close-others="true"
                >
                    <EK.UX.Icon icon={iconClass} />
                    {notificationsCount > 0 ? <span className="badge badge-default">{notificationsCount}</span> : <span></span>}
                </a>
                {ddMenu}
            </li>;
        }
    }

    export class DropdownSendNotification extends React.Component<IDropdownSendNotificationProps, {}> {
        constructor(props: IDropdownSendNotificationProps) {
            super(props);

            this.onLinkClick = this.onLinkClick.bind(this);
        }

        shouldComponentUpdate(nextProps: IDropdownSendNotificationProps, nextState: IDropdownSendNotificationProps) {
            return false;
        };

        onLinkClick(): any {
            let pageId: string = this.props.page.data.id;
            let opcion: string;
            let descripcion: string;

            for (var i = 0; i < this.props.app.data.Permisos.length; i++) {
                let permiso: any = this.props.app.data.Permisos[i];

                if (pageId === permiso.Clave) {
                    opcion = permiso.Opcion;
                    descripcion = permiso.Descripcion;

                    break;
                };
            };

            this.props.setNotificacion({
                Nombre: opcion,
                Descripcion: descripcion,
                Link: location.href
            });

            go("/kontrol/notificaciones/id?nuevo");
        };

        render(): JSX.Element {
            return <li className="dropdown dropdown-extended dropdown-notification hidden-xs">
                <a href="javascript:;" className="dropdown-toggle" onClick={this.onLinkClick}>
                    <EK.UX.Icon icon="icon-envelope" />
                </a>
            </li>;
        };
    };

    export class DropdownLanguage extends React.Component<IDropdownLanguageProps, {}> {
        constructor(props: IDropdownLanguageProps) {
            super(props);

            this.onLinkClick = this.onLinkClick.bind(this);
        };
        static props: any = (state: any) => {
            let app: any = global.getData(state.global.app);
            let lang: any = app && app.Language ? app.Language.ClaveLang : "";

            return {
                claveLanguage: lang,
                items: state.global.IDIOMAS,
                lang: state.global.entity$lang
            };
        };
        shouldComponentUpdate(nextProps: IDropdownLanguageProps, nextState: IDropdownLanguageProps) {
            return this.props.claveLanguage !== nextProps.claveLanguage ||
                global.hasChanged(this.props.items, nextProps.items) ||
                global.hasChanged(this.props.lang, nextProps.lang);
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::IDIOMAS", "catalogos/get(idioma)");
            };
        };
        componentWillUpdate(nextProps: IDropdownLanguageProps, nextState: IDropdownLanguageProps): any {
            if (global.hasChanged(this.props.lang, nextProps.lang)) {
                location.reload();
            };
        };
        onLinkClick(element: any): any {
            global.dispatchAsync("global-page-entity", "kontrol/setLanguage/" + element.Clave, "lang")
        };
        render(): JSX.Element {
            let className: string = "bandera-" + this.props.claveLanguage;
            let items: any[] = [];

            if (global.isSuccessful(this.props.items)) {
                items = global.getData(this.props.items);
                //

            };

            return <li className="dropdown dropdown-extended dropdown-notification hidden-xs">
                <a href="javascript:;"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    data-hover="dropdown"
                    data-close-others="true">
                    <span className={className}></span>
                </a>
                <ul className="dropdown-menu dropdown-menu-default">
                    {items.map((value: any, index: number): any => {
                        return <li key={index}>
                            <a href="#" onClick={() => this.onLinkClick(value)}>
                                <span className={"bandera-" + value.Clave}></span>
                                <span className="badge badge-info">{value.Clave}</span>
                                <span>{value.Nombre}</span>
                            </a>
                        </li>;
                    })}
                </ul>
            </li>;
        };
    };

    class SingleNotificationItem extends React.Component<{ item: any }, {}> {
        constructor(props: any) {
            super(props);

            this.onLinkClick = this.onLinkClick.bind(this);
        }

        onLinkClick(): any {
            let item: any = this.props.item;
            let itemLink: string = ["/kontrol/notificaciones/", item.ID].join("");

            dispatchSuccessful("notificaciones-setSelected", this.props.item);

            go(itemLink);
        };

        render(): JSX.Element {
            let item: any = this.props.item;
            //let itemLink: string = ["#/kontrol/notificaciones/", item.ID].join("");
            let itemModificado: string = EK.Global.getDateFormatted(item.Modificado);

            return <li>
                <a href="javascript:;" onClick={this.onLinkClick}>
                    <span className="time" style={{ textAlign: "center" }}>{itemModificado}</span>
                    <div style={{ color: "rgb(119, 119, 119)", fontSize: 13, fontWeight: 600 }}>
                        {item.Asunto}
                    </div>
                    <div style={{ fontSize: 11 }}>
                        {item.ModificadoPor.Nombre}
                    </div>
                </a>
            </li>;
        };
    };

    export const getItems: (data: any, typeElem: string) => JSX.Element = (data: any, typeElem: string): JSX.Element => {
        var items: JSX.Element[] = [];
        var ddItemsElements: JSX.Element = null;

        if (data !== undefined) {
            data.forEach((item: { TypeElement: string; }, i: number) => {
                let itemId: string = "dd-key-" + i.toString();
                let typeElement: string = item.TypeElement.substr(0, typeElem.length);

                if (typeElem === typeElement) {
                    items.push(<DropdownNotificationItem key={itemId} item={item}
                        itemFormat={function () { return DropdownItemStyle(item); }} />);
                };
            });

            return <ul
                className="dropdown-menu-list" style={{ overflowY: "scroll", height: "250px" }}
                data-handle-color="#637283">
                {items}
            </ul>;

        }

        return ddItemsElements;
    };

    const mapSNProps: any = (state: any): any => {
        return {
            app: state.global.app,
            page: state.global.page
        };
    };

    const mapSNDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            setNotificacion: (notificacion: any): void => {
                dispatchSuccessful("notificaciones-setSelected", notificacion);
            }
        };
    };

    export let TasksNotification: any = ReactRedux.connect(DropdownNotification.props, DropdownNotification.dispatchs)(DropdownNotification);
    export let MessageNotification: any = ReactRedux.connect(DropdownNotification.props, DropdownNotification.dispatchs)(DropdownNotification);
    export let MessageNotificationAppCat: any = ReactRedux.connect(DropdownNotificationAppCat.props, DropdownNotificationAppCat.dispatchs)(DropdownNotificationAppCat);
    export let SendNotificationComponent: any = ReactRedux.connect(mapSNProps, mapSNDispatchs)(DropdownSendNotification);
    export let LanguageNotificationComponent: any = ReactRedux.connect(DropdownLanguage.props, null)(DropdownLanguage);
    // export let NetStatus: any = ReactRedux.connect(DropdownNotification.props, DropdownNotification.dispatchs)(DropdownNotification);

    export class DropdownNotificationItem extends React.Component<IDropdownNotificationItemProps, {}> {
        constructor(props: IDropdownNotificationItemProps) {
            super(props);

            this.onClickTask = this.onClickTask.bind(this);
        }
        onClickTask(item: any): void {
            this.props.inicializarForma("ProcessAutorization");

            let route: string = "/kontrol/workflows/autorizacion/" + item.id + "";
            ReactRouter.hashHistory.push(route);
        };
        render(): JSX.Element {
            return this.props.itemFormat(this.props.item);
        };
    };
}
