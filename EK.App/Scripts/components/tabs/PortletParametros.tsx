namespace EK.UX.Tabs {
    "use strict";

    interface IPortletParametrosTabPaneProps extends IPortletTabPaneProps {
        onItemClick?: (item: any) => void;
        headerValue?: string;
    }

    export class PortletParametros extends React.Component<IPortletParametrosTabPaneProps, IPortletTabPaneState> {
        constructor(props: IPortletTabPaneProps) {
            super(props);
            this.onItemClick = this.onItemClick.bind(this);
        }

        static defaultProps: IPortletTabPaneProps = {
            data: [],
            icon: "icon-ek-130",
            title: "Parámetros"
        };

        shouldComponentUpdate(nextProps: IPortletParametrosTabPaneProps, nextState: IPortletParametrosTabPaneProps): boolean {
            return this.props.data.timestamp !== nextProps.data.timestamp;
        }

        onItemClick(item: any) {
            this.props.onItemClick(item);
        }

        formatItem(index: number, item: any) {
            var itemKey: string = "generic-item-key-" + (index).toString();
            let isOdd = !(index % 2) ? "bg-grey-cararra bg-font-grey-cararra" : "";

            return <Row>
                <Column lg={6} md={6} sm={6} xs={12}>
                    {item.Parametro.Nombre}
                </Column>
                <Column lg={6} md={6} sm={6} xs={12}>
                    {item.Valor}
                </Column>
            </Row>;
        }

        render(): JSX.Element {
            let current: any = this.props.data.data;
            // Ordenar por seccion
            let seccionesArray: string[] = [];
            if (current && current.length > 0) {
                current.sort(function (a, b) {
                    return a.Parametro.Secciones.Nombre.localeCompare(b.Parametro.Secciones.Nombre);
                });

                for (var i = 0; i < current.length; i++) {
                    if (seccionesArray.indexOf(current[i].Parametro.Secciones.Nombre) == -1) {
                        seccionesArray.push(current[i].Parametro.Secciones.Nombre)
                    }
                }
            }

            let header: JSX.Element =
                <div className="mt-list-head list-todo font-white bg-blue-steel">
                    <div className="list-head-title-container">
                        <h4 className="list-title">{this.props.headerValue}</h4>
                    </div>
                </div>;

            let headerListCollapse: JSX.Element = <div></div>;
            let seccionesElement: JSX.Element[] = [];
            for (var i = 0; i <= seccionesArray.length - 1; i++) {
                let items = current.filter(c => c.Parametro.Secciones.Nombre == seccionesArray[i]);
                if (items.length != 0) {
                    seccionesElement.push(
                        <li key={"li_" + seccionesArray[i] + "_" + i.toString()} className="mt-list-item grey">
                            <div className="list-todo-item grey">
                                <a key={"a_" + seccionesArray[i] + "_" + i.toString()} className="list-toggle-container font-white collapsed"
                                    data-toggle="collapse" href={"#" + i.toString()} aria-expanded="false">
                                    <div className="list-toggle">
                                        <div className="list-toggle-title">{seccionesArray[i]}
                                        </div>
                                        <span className="badge badge-pill badge-success pull-right">{items.length}</span>
                                    </div>
                                </a>
                            </div>
                            <div id={i.toString()} className="panel-collapse collapse in" aria-expanded="true">
                                <List
                                    listHeader={headerListCollapse}
                                    items={items}
                                    formatter={this.formatItem}
                                    readonly={true}
                                    onItemClick={this.onItemClick} />
                            </div>
                        </li>);
                }
            }

            let list: JSX.Element =
                <div className="mt-element-list">
                    {header}
                    < div className="mt-list-container list-todo" >
                        < ul >
                            {seccionesElement}
                        </ul >
                    </div >
                </div >;

            return <EK.UX.PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                {list}
            </EK.UX.PortletTabPane>;
        }
    }

    /* Parametros de Companias */
    export interface IPortletParametrosCompanias extends IPortletParametrosTabPaneProps {
        compania?: any;
    }

    export class PortletParametrosCompanias extends React.Component<IPortletParametrosCompanias, IPortletParametrosCompanias> {
        constructor(props: IPortletParametrosCompanias) {
            super(props);
            this.onItemClick = this.onItemClick.bind(this);
        }

        static defaultProps: IPortletParametrosCompanias = {
            data: [],
            icon: "icon-ek-130",
            title: "Parámetros"
        };

        refs: {
            portlet: Element;
            requiredPoint: Element;
        }

        shouldComponentUpdate(nextProps: IPortletParametrosCompanias, nextState: IPortletParametrosCompanias): boolean {
            return this.props.data.timestamp !== nextProps.data.timestamp;
        }

        onItemClick(item: any) {
            console.log(item);
            go("/parametros/configuracion/" + item.Parametro.ID);
        }

        render(): any {
            let headerValue: string = this.props.compania && this.props.compania.data ? [this.props.compania.data.Clave, this.props.compania.data.Nombre].join(' ') : "Compañía";

            return <PortletParametros
                onItemClick={this.onItemClick}
                headerValue={headerValue}
                data={this.props.data} />;
        }
    }

    const portletParametrosCompaniasMapProps: any = (state: any): any => {
        return {
            data: state.companias.parametros,
            compania: state.companias.selected
        };
    }

    export let CompaniasParametros: any = ReactRedux.connect(portletParametrosCompaniasMapProps, null)(PortletParametrosCompanias);
    /* Parametros de Companias */

    /* Parametros de Clientes */
    export interface IPortletParametrosClientes extends IPortletParametrosTabPaneProps {
        cliente?: any;
    }

    export class PortletParametrosClientes extends React.Component<IPortletParametrosClientes, IPortletParametrosClientes> {
        constructor(props: IPortletParametrosClientes) {
            super(props);
            this.onItemClick = this.onItemClick.bind(this);
        }

        static defaultProps: IPortletParametrosClientes = {
            data: [],
            icon: "icon-ek-130",
            title: "Parámetros"
        };

        refs: {
            portlet: Element;
            requiredPoint: Element;
        }

        shouldComponentUpdate(nextProps: IPortletParametrosClientes, nextState: IPortletParametrosClientes): boolean {
            return this.props.data.timestamp !== nextProps.data.timestamp;
        }

        onItemClick(item: any) {
            console.log(item);
            go("/parametros/configuracion/" + item.Parametro.ID);
        }

        render(): any {
            let headerValue: string = this.props.cliente && this.props.cliente.data ? [this.props.cliente.data.Clave, this.props.cliente.data.Nombre].join(' ') : "Cliente";

            return <PortletParametros
                onItemClick={this.onItemClick}
                headerValue={headerValue}
                data={this.props.data} />;
        }
    }

    const portletParametrosClientesMapProps: any = (state: any): any => {
        return {
            data: state.clientes.parametros,
            cliente: state.clientes.selected
        };
    }

    export let ClientesParametros: any = ReactRedux.connect(portletParametrosClientesMapProps, null)(PortletParametrosClientes);
    /* Parametros de Clientes */

    /* Parametros de Modulos */
    export interface IPortletParametrosModulos extends IPortletParametrosTabPaneProps {
        modulo?: any;
    }

    export class PortletParametrosModulos extends React.Component<IPortletParametrosModulos, IPortletParametrosModulos> {
        constructor(props: IPortletParametrosModulos) {
            super(props);
            this.onItemClick = this.onItemClick.bind(this);
        }

        static defaultProps: IPortletParametrosModulos = {
            data: [],
            icon: "icon-ek-130",
            title: "Parámetros"
        };

        refs: {
            portlet: Element;
            requiredPoint: Element;
        }

        shouldComponentUpdate(nextProps: IPortletParametrosModulos, nextState: IPortletParametrosModulos): boolean {
            return this.props.data.timestamp !== nextProps.data.timestamp;
        }

        onItemClick(item: any) {
            console.log(item);
            go("/parametros/configuracion/" + item.Parametro.ID);
        }

        render(): any {
            let headerValue: string = this.props.modulo && this.props.modulo.data ? [this.props.modulo.data.Clave, this.props.modulo.data.Nombre].join(' ') : "Módulo";

            return <PortletParametros
                onItemClick={this.onItemClick}
                headerValue={headerValue}
                data={this.props.data} />;
        }
    }

    const portletParametrosModulosMapProps: any = (state: any): any => {
        return {
            data: state.modulos.parametros,
            modulo: state.modulos.selected
        };
    }

    export let ModulosParametros: any = ReactRedux.connect(portletParametrosModulosMapProps, null)(PortletParametrosModulos);
    /* Parametros de Modulos */
}

import ParametrosClientes = EK.UX.Tabs.PortletParametros;
import PortletModulosParametros = EK.UX.Tabs.ModulosParametros;
import PortletClientesParametros = EK.UX.Tabs.ClientesParametros;
import PortletCompaniasParametros = EK.UX.Tabs.CompaniasParametros;