namespace EK.UX.Tabs {
    "use strict";

    interface IAccionTabProps extends EK.UX.IPortletTabPaneProps {
        acciones?: any;
        entidad?: any;
        claveOpcion?: any;
        actionState?: DataElement;
        obtenerAcciones?: (claveOpcion: string) => any;
    }

    interface IAccionItemProps extends React.Props<any> {
        data?: any;
    }

    export class AccionesPanel extends React.Component<IAccionTabProps, IAccionTabProps> {
        constructor(props: IAccionTabProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        };

        static defaultProps: EK.UX.IPortletTabPaneProps = {
            data: {},
            icon: "fa fa-tasks",
            title: "Acciones"
        };

        onClick(item: any): any {
            let option: any = getOption(item.Clave);
            let entidad: any = this.props.entidad;

            if (entidad) {
                if (option && option.Ruta) {
                    let redirectPath: string = option.Ruta;

                    if (item.ActionType === 1) {
                        if (item.Propiedades && item.Propiedades.length > 0) {
                            let propiedades: any = JSON.parse(item.Propiedades);
                            let entityData: any = global.getData(this.props.entidad);

                            for (var p in propiedades) {
                                let idParameter: string = ":" + p;
                                let idProperty: string = propiedades[p];
                                let actionValue: any;

                                if (idProperty) {
                                    if (idProperty.indexOf("function") >= 0) {
                                        let fn: any = eval(idProperty);

                                        actionValue = fn(entityData);
                                    }
                                    else {
                                        actionValue = entityData[idProperty];
                                    }
                                };
                                //
                                if (redirectPath.indexOf(idParameter) >= 0) {
                                    redirectPath = redirectPath.replace(idParameter, actionValue);
                                }
                                else {
                                    redirectPath = redirectPath + "/" + actionValue;
                                }
                            };
                        };
                        //
                        go(redirectPath);
                    }
                    else if (item.ActionType === 2) {
                        if (item.Propiedades && item.Propiedades.length > 0) {
                            let propiedades: any = JSON.parse(item.Propiedades);
                            let entityData: any = global.getData(this.props.entidad);
                            let data: any = {};

                            for (var p in propiedades) {
                                let idParameter: string = ":" + p;
                                let idProperty: string = propiedades[p];
                                let actionValue: any;
                                //
                                if (idProperty) {
                                    if (idProperty.indexOf("function") >= 0) {
                                        let fn: any = eval(idProperty);

                                        actionValue = fn(entityData);
                                    }
                                    else {
                                        actionValue = entityData[idProperty];
                                    };
                                };

                                if (redirectPath.indexOf(idParameter) >= 0) {
                                    redirectPath = redirectPath.replace(idParameter, actionValue);
                                }
                                else {
                                    data[p] = actionValue;
                                };
                            };
                            //
                            redirectPath = redirectPath + "/" + global.encodeParameters(data);
                            //
                            global.info(option.Opcion, "....");
                            //
                            $.ajax({
                                type: "GET",
                                contentType: "application/json; charset=UTF-8",
                                url: redirectPath,
                                async: true
                            }).done((data: any): any => {
                                global.success(option.Opcion, "Completado");
                            }).fail((jqXHR: any, textStatus: any): any => {
                                global.errorMessage(option.Option, "Completado");
                            }).always((): any => {
                            });
                        };
                    };

                    $(".page-quick-sidebar-toggler").click();
                } else {
                    warning("Esta acción no tiene definido un acceso");
                };
            } else {
                warning("Debe seleccionar un elemento para acceder a la acción");
            };
        };

        shouldComponentUpdate(nextProps: IAccionTabProps, nextState: IAccionTabProps): boolean {
            return hasChanged(this.props.acciones, nextProps.acciones);
        };

        componentWillMount() {
            let claveOpcion: any = this.props.claveOpcion;
            //
            if (claveOpcion.data && claveOpcion.data.id) {
                this.props.obtenerAcciones(claveOpcion.data.id);
            };
        };

        componentWillReceiveProps(nextProps: IAccionTabProps) {
            if (hasChanged(this.props.claveOpcion, nextProps.claveOpcion)) {
                this.props.obtenerAcciones(nextProps.claveOpcion.data.id);
            };
        };

        render(): JSX.Element {
            let acciones: any[] = global.getData(this.props.acciones);
            let accionesItems: any = null;

            if (isSuccessful(this.props.acciones)) {
                accionesItems = acciones.map((value: any, index: number) => {
                    return <AccionPanelItem key={index} item={value} onItemClick={this.onClick} />;
                });
            };
            // <UpdateColumn info={this.props.acciones} text="actualizando...">
            return acciones && acciones.length > 0 ?
                <div className="tabbable-line">
                    <ul className="nav nav-tabs" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {accionesItems}
                    </ul>
                </div>
                :
                null;
        };
    };

    export class AccionesTab extends React.Component<IAccionTabProps, IAccionTabProps> {
        constructor(props: IAccionTabProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        };

        static defaultProps: EK.UX.IPortletTabPaneProps = {
            data: {},
            icon: "fa fa-tasks",
            title: "Acciones"
        };

        onClick(item: any): any {
            let option: any = getOption(item.Clave);
            let entidad: any = this.props.entidad;

            if (entidad) {
                if (option && option.Ruta) {
                    let redirectPath: string = option.Ruta;

                    if (item.ActionType === 1) {
                        if (item.Propiedades && item.Propiedades.length > 0) {
                            let propiedades: any = JSON.parse(item.Propiedades);
                            let entityData: any = global.getData(this.props.entidad);

                            for (var p in propiedades) {
                                let idParameter: string = ":" + p;
                                let idProperty: string = propiedades[p];
                                let actionValue: any;

                                if (idProperty) {
                                    if (idProperty.indexOf("function") >= 0) {
                                        let fn: any = eval(idProperty);

                                        actionValue = fn(entityData);
                                    }
                                    else {
                                        actionValue = entityData[idProperty];
                                    }
                                };
                                //
                                if (redirectPath.indexOf(idParameter) >= 0) {
                                    redirectPath = redirectPath.replace(idParameter, actionValue);
                                }
                                else {
                                    redirectPath = redirectPath + "/" + actionValue;
                                }
                            };
                        };
                        //
                        go(redirectPath);
                    }
                    else if (item.ActionType === 2) {
                        if (item.Propiedades && item.Propiedades.length > 0) {
                            let propiedades: any = JSON.parse(item.Propiedades);
                            let entityData: any = global.getData(this.props.entidad);
                            let data: any = {};

                            for (var p in propiedades) {
                                let idParameter: string = ":" + p;
                                let idProperty: string = propiedades[p];
                                let actionValue: any;
                                //
                                if (idProperty) {
                                    if (idProperty.indexOf("function") >= 0) {
                                        let fn: any = eval(idProperty);

                                        actionValue = fn(entityData);
                                    }
                                    else {
                                        actionValue = entityData[idProperty];
                                    };
                                };

                                if (redirectPath.indexOf(idParameter) >= 0) {
                                    redirectPath = redirectPath.replace(idParameter, actionValue);
                                }
                                else {
                                    data[p] = actionValue;
                                };
                            };
                            //
                            redirectPath = redirectPath + "/" + global.encodeParameters(data);
                            //
                            global.info(option.Opcion, "....");
                            //
                            $.ajax({
                                type: "GET",
                                contentType: "application/json; charset=UTF-8",
                                url: redirectPath,
                                async: true
                            }).done((data: any): any => {
                                global.success(option.Opcion, "Completado");
                            }).fail((jqXHR: any, textStatus: any): any => {
                                    global.errorMessage(option.Option, "Completado");
                            }).always((): any => {
                            });
                        };
                    };

                    $(".page-quick-sidebar-toggler").click();
                } else {
                    warning("Esta acción no tiene definido un acceso");
                };
            } else {
                warning("Debe seleccionar un elemento para acceder a la acción");
            };
        };

        shouldComponentUpdate(nextProps: IAccionTabProps, nextState: IAccionTabProps): boolean {
            return hasChanged(this.props.acciones, nextProps.acciones);
        };

        componentWillMount() {
            let claveOpcion: any = this.props.claveOpcion;
            //
            if (claveOpcion.data && claveOpcion.data.id) {
                this.props.obtenerAcciones(claveOpcion.data.id);
            };
        };

        componentWillReceiveProps(nextProps: IAccionTabProps) {
            if (hasChanged(this.props.claveOpcion, nextProps.claveOpcion)) {
                this.props.obtenerAcciones(nextProps.claveOpcion.data.id);
            };
        };

        render(): JSX.Element {
            let acciones: any[] = this.props.acciones.data;
            let accionesItems: any = null;

            if (isSuccessful(this.props.acciones)) {
                accionesItems = acciones.map((value: any, index: number) => {
                    return <AccionSectionItem key={index} item={value} onItemClick={this.onClick} />;
                });
            };
                
            return <PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                <UpdateColumn info={this.props.acciones} text="actualizando...">
                    <div className="mt-element-list">
                        <div className="mt-list-container list-news" style={{ borderTop: "1px solid #e7ecf1", paddingTop: 0 }} ref="list">
                            <ul>
                                {accionesItems}
                            </ul>
                        </div>
                    </div>
                </UpdateColumn>
            </PortletTabPane>;
        };
    };
    export interface IActionSectionItemProps extends React.Props<any> {
        item?: any;
        onItemClick?: (item: any) => void;
    };
    export class AccionPanelItem extends React.Component<IActionSectionItemProps, IActionSectionItemProps> {
        constructor(props: IActionSectionItemProps) {
            super(props);
        };

        render(): JSX.Element {
            let option: any = getOption(this.props.item.Clave);
            if (!option || !option.permisos || option.permisos < 1) {
                return null;
            };

            let icono: string = option.Icono ? option.Icono : "fa fa-list-alt";

            return <li className="ek10-tabs_item_container"
                onClick={() => this.props.onItemClick(this.props.item)}>
                <a style={{ padding: "0px" }}>
                    <div className="ek10-tabs_item" style={{ padding: "0px" }}>
                        <div className="ek10-tabs__icon">
                            <i className={icono} style={{ fontSize:16, fontWeight: 400 }}></i>
                        </div>
                        <div className="ek10-tabs__details">
                            <span className="ek10-tabs__title">{option.Opcion ? option.Opcion : ""}</span>
                            {option.Descripcion ? <span className="ek10-tabs__value">{option.Descripcion}</span>
                            : <span className="ek10-tabs__value" style={{ marginBottom: "13px" }}></span>}
                        </div>
                    </div>
                </a>
                </li>;
        }
    }
    export class AccionSectionItem extends React.Component<IActionSectionItemProps, IActionSectionItemProps> {
        constructor(props: IActionSectionItemProps) {
            super(props);
        };

        render(): JSX.Element {            
            let option: any = getOption(this.props.item.Clave);
            if (!option || !option.permisos || option.permisos < 1) {
                return null;
            };

            let icono: string = option.Icono ? option.Icono : "fa fa-list-alt";

            return <li className="mt-list-item" style={{ cursor: "pointer", paddingBottom: 10, paddingTop: 0 }} onClick={() => this.props.onItemClick(this.props.item)}>
                    <Row style={{ paddingTop: 10 }}>
                        <Column size={[2, 2, 2, 2]} className="text-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <i className={icono} style={{ marginTop: 5, fontSize: 24 }}></i>
                        </Column>
                        <Column size={[10, 10, 10, 10]} style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <Column size={[12, 12, 12, 12]} style={{ paddingLeft: 0, marginBottom: 5 }}>
                                <div style={{ color: "rgb(51, 51, 51)", marginBottom: 0, fontWeight: 600, fontSize: 13 }}>{option.Opcion}</div>
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ paddingLeft: 0 }}>
                                <div style={{ marginBottom: 0, fontSize: 11 }}>{option.Descripcion}</div>
                            </Column>
                        </Column>
                    </Row>
                </li>;
        }
    }

    const accionesProps: any = (state: any): any => {
        return {
            acciones: state.modulos.acciones,
            claveOpcion: state.global.page,
            entidad: state.global.currentEntity,
            actionState: state.global.currentActionState
        };
    };
    const mapAccionesDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            obtenerAcciones: (claveOpcion: string): any => {
                dispatchAsync("opciones-acciones", ["opciones/acciones/", claveOpcion].join(""));
            }
        };
    };

    export let Acciones$Tab: any = ReactRedux.connect(accionesProps, mapAccionesDispatchs)(EK.UX.Tabs.AccionesTab);
    export let Acciones$Panel: any = ReactRedux.connect(accionesProps, mapAccionesDispatchs)(EK.UX.Tabs.AccionesPanel);
}

import Acciones$Tab = EK.UX.Tabs.Acciones$Tab;
import Acciones$Panel = EK.UX.Tabs.Acciones$Panel;