namespace EK.UX.Menus {
    "use strict";
    /*
    BEGIN: Props & State
    */
    let w: any = window;

    export interface IMenuProps extends React.Props<any> {
        app: any;
        page: any;
        data?: IMenuItem[];
        clave?: string;
    }

    export interface IMenuItem {
        id?: string;
        opciones?: IMenuItem[];
        ruta: string;
        icono: string;
        clave: string;
        opcion: string;
    }

    export interface IMenuItemProps extends IMenuItem, React.Props<any> {
        app: any;
        page: any;
        level: number;
    }

    const checkIfHasSelectedChild: (currentPage: string, data: any[]) => boolean =
        (currentPage: string, data: any[]) : boolean => {
        if (data !== undefined && data !== null && data.length > 0) {
            for (let i: number = 0; i < data.length; i++) {
                if (data[i].Clave === currentPage) {
                    return true;
                }
            };
        }

        return false;
    };

    /*
    END: Props & State
        
    BEGIN: Components
    */
    export interface IContextMenuProps extends React.Props<any> {
        id: string;
        menuOptions?: any;
        options?: any[];
    };
    export const ContextMenu: any = global.connect(class extends React.Component<IContextMenuProps, IContextMenuProps>{
        //
        static props: any = (state: any) => ({
            menuOptions: state.global.menuOptions
        });
        //
        /**
      });
         */
        menuInit(): void {
            //let menu: any = $("#" + this.props.id);
            //menu.contextmenu({
            //    target: ".dataTable",
            //    onItem: function (context, e) {
            //        alert($(e.target).text());
            //    }
            //});
        };
        menuDestroy(): void {
            //let menu: any = $("#" + this.props.id);
            //let jQuery: any = $;

            //jQuery.contextMenu('destroy', menu);
        };
        componentWillMount(): any {
            if (!this.props.menuOptions || !getData(this.props.menuOptions[this.props.id])) {
                global.updateMenuContextOptions(this.props.id, "main", []);
            };
        };
        componentDidMount(): void {
            this.menuInit();
        };
        componentWillUnmount(): void {
            this.menuDestroy();
        };
        componentWillUpdate(nextProps: IDataTableProps, nextState: any) {
            this.menuDestroy();
        };
        componentDidUpdate(): void {
            this.menuInit();
        };
        render(): JSX.Element {            
            let menuOptions: any = {};
            let options: any = {};

            if (this.props.options) {
                options = this.props.options;
            }
            else {
                if (this.props.menuOptions && this.props.menuOptions[this.props.id]) {
                    menuOptions = this.props.menuOptions[this.props.id];
                };

                options = getData(menuOptions);
                if (!global.isSuccessful(menuOptions)) {
                    return <div id={this.props.id}></div>;
                };
            };
            
            let liOptions: any[] = [];
            let i: number = 0;
            for (var g in options) {
                let groupOptions: any[] = options[g];

                if (i > 0 && groupOptions.length > 0) {
                    liOptions.push(<li key={"divider_" + i.toString()} className="divider"></li>);
                }
                groupOptions.forEach((value: any, index: number) => {
                    if (value.text === "$new$") {
                        liOptions.push(<buttons.NewButton key="btnNew" className="" target={value.target} text="Nuevo" color="" buttonType="list-item" />);
                    }
                    else if (value.text === "$view$") {
                        liOptions.push(<buttons.ViewButton key="btnView" className="" target={value.target} text="Ver..." color="" buttonType="list-item" />);
                    }
                    else if (value.text === "$delete$") {
                        liOptions.push(<buttons.DeleteButton key="btnDelete" className="" target={value.target} text="Eliminar" color="" buttonType="list-item" />);
                    }
                    else if (value.text === "$print$") {
                        liOptions.push(<buttons.PrintButton key="btnPrint" className="" target={value.target} text="Imprimir" color="" buttonType="list-item" />);
                    }
                    else if (value.text === "$export$") {
                        liOptions.push(<buttons.ExcelButton key="btnExport" className="" target={value.target} text="Exportar" color="" buttonType="list-item" />);
                    }
                    else if (value.text === "$edit$") {
                        liOptions.push(<buttons.EditButton key="btnEdit" className="" target={value.target} text="Editar" color="" buttonType="list-item" />);
                    }
                    else {
                        liOptions.push(<li key={index}><a tabIndex={-1}>{value.text}</a></li>);
                    };
                });

                i++;
            };

            return <div id={this.props.id}>
                <ul className="dropdown-menu dropdown-menu-context" role="menu">
                    {liOptions}
                </ul>
            </div>;
        };
    });

    export class _Menu extends React.Component<IMenuProps, IMenuProps> {
        constructor(props: IMenuProps) {
            super(props);
        }

        shouldComponentUpdate(nextProps: IMenuProps, nextState: IMenuProps): boolean {
            return this.props.app.timestamp !== nextProps.app.timestamp
                || (nextProps.page !== undefined && this.props.page === undefined)
                || (nextProps.page !== undefined && this.props.page !== undefined
                    && (this.props.page.timestamp !== nextProps.page.timestamp));
        };

        componentDidMount() {
            //$("body").off("click", ".sidebar-toggler");
            w.Layout.initSidebar();
        };

        componentDidUpdate(prevProps: IMenuProps, prevState: IMenuProps) {
            //w.Layout.initSidebar();
        };

        render(): JSX.Element {
            var items: JSX.Element[] = [];

            this.props.app.data.Menu.forEach((item: any, i: number) => {
                let clave: string = "menu-key-" + item.Clave;

                items.push(<MenuItem
                    key={clave}

                    app={this.props.app}
                    page={this.props.page}
                    opciones={item.Opciones}
                    ruta={item.Ruta}
                    icono={item.Icono}
                    clave={item.Clave}
                    opcion={item.Nombre}
                    id={item.ID}
                    level={1}
                    />);
            });

            return <div className="page-sidebar-wrapper">
                <div className="page-sidebar navbar-collapse collapse">
                    <ul
                        className="page-sidebar-menu  page-header-fixed page-sidebar-menu-closed "
                        data-keep-expanded="false"
                        data-auto-scroll="true"
                        data-slide-speed="200">
                        <li className="sidebar-toggler-wrapper hide">
                            <div className="sidebar-toggler">
                                <span></span>
                            </div>
                        </li>
                        {items}
                </ul>
                </div>
            </div>;
        }
    }

    export class MenuItem extends React.Component<IMenuItemProps, {}> {
        constructor(props:IMenuItemProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        }

        onClick(e:any):any {
            let href: string = this.props.ruta;
            if (href !== undefined && href !== null && href !== "") {
                if (href.indexOf("post::") >= 0) {
                    //
                    let formName: string = "printDocument";
                    let form = document.createElement("form");
                    form.setAttribute("method", "post");
                    form.setAttribute("action", href.substr(6));
                    form.setAttribute("target", "_blank");
                    //
                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.name = "data";
                    input.value = global.encodeParameters({ ID: this.props.id  });
                    form.appendChild(input);
                    //
                    document.body.appendChild(form);
                    //
                    form.submit();
                    //
                    document.body.removeChild(form);
                }
                else {
                    go(this.props.ruta);
                };
            };
        };

        render(): JSX.Element {
            let menuItemsElements: JSX.Element = null;
            let items: JSX.Element[] = [];
            let pageId: string = this.props.page ? this.props.page.data.id : "";
            // check of the Menu Item should be selected
            let className: string = "nav-item";

            if (this.props.opciones !== undefined && this.props.opciones.length > 0) {
                this.props.opciones.forEach((item: any, i: number): void => {
                    let clave: string = "menu-key-" + item.Clave;
                    items.push(<MenuItem
                        key={ clave }
                        id={item.ID}
                        app={this.props.app}
                        page={this.props.page}
                        opciones={item.Opciones}
                        ruta={item.Ruta}
                        icono={item.Icono}
                        clave={item.Clave}
                        opcion={item.Nombre}
                        level={this.props.level + 1}
                        />);
                });

                menuItemsElements = <ul className="sub-menu">
                    {items}
                </ul>;
            };

            if (pageId === this.props.clave) {
                className = className + " active";
            };

            // check if the Menu has a child item selected
            let hasChildSelected: boolean = checkIfHasSelectedChild(pageId, this.props.opciones);
            if (hasChildSelected) {
                className = className + " active";
            }

            return <li className={className}>
                <a onClick={this.onClick} className="nav-link nav-toggle">
                    <EK.UX.Icon icon={this.props.icono} style={{ fontSize: 18, marginRight: 5 }}/>
                    <span className="title">{this.props.opcion}</span>
                    { hasChildSelected ? <span className="selected"></span> : ""}
                    {items.length > 0 && !hasChildSelected ? <span className="arrow"></span> : ""}
                    {items.length > 0 && hasChildSelected ? <span className="arrow open"></span> : ""}
                </a>
                {menuItemsElements}
            </li>;
        }
    }
    /*
    END: Components
    */

    //
    // map props
    //
    const mapProps: any = (state: any): any => {
        return {
            app: state.global.app,
            page: state.global.page
        };
    };

    //
    // map dispatchs
    //
    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {};
    };

    // 
    // connect
    // 
    export let Menu: any = ReactRedux.connect(mapProps, null)(_Menu);
}
import menu = EK.UX.Menus;
import Menu = EK.UX.Menus.Menu;