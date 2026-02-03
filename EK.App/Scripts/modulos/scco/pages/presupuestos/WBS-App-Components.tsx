namespace EK.Modules.SCCO.Pages.Presupuestos.WBS.App.Components {
    "use strict";

    export interface IWBSNodoProps extends React.Props<any> {
        id?: string;
        item?: Interfaces.IWBSNodo;
        index?: number;
        idForm?: string;
        idFormSection?: string;
        itemChildren?: Array<Interfaces.IWBSNodo>;
        itemConfig?: Interfaces.IWBSConfig;
        selectedItem?: Interfaces.IWBSNodo;
        collapseIcon?: string;
        expandIcon?: string;
        checkedIcon?: string;
        uncheckedIcon?: string;
        codeSeparator?: string;
        collapsible?: boolean;
        checkable?: boolean;
        selectable?: boolean;
        actionState?: global.DataElement;
        formatter?: (item: Interfaces.IWBSNodo, index: number, props: IWBSNodoProps) => JSX.Element;
        processData?: (item: any) => any;
        processChildren?: (item: any, children: any[]) => any[];
        onNodeClick?: (item: Interfaces.IWBSNodo) => void;
        onNodeCheck?: (item: Interfaces.IWBSNodo, value: boolean) => void;
        onNodeToggle?: (item: Interfaces.IWBSNodo, value: boolean) => void;
        onNodeUpdate?: (item: Interfaces.IWBSNodo) => void;
    };

    export interface IWBSNodoState {
        checked?: boolean;
        collapsed?: boolean;
    };

    export class WBSNodoCollapse extends React.Component<IWBSNodoProps, IWBSNodoState>{
        constructor(props: IWBSNodoProps) {
            super(props);
            this.state = { collapsed: true };
        };
        onClick(): void {
            let collapse: Element = ReactDOM.findDOMNode(this);

            let container = $(collapse).closest(".wbs-node-container");
            if (container) {
                container.children(".wbs-node-children").toggleClass("wbs-node-active");
                container.children(".wbs-node-children").toggleClass("wbs-node-nested");
            };

            this.setState({ collapsed: !this.state.collapsed });

            if (this.props.onNodeToggle) {
                this.props.onNodeToggle(this.props.item, !this.state.collapsed);
            };
        };
        componentWillReceiveProps(nextProps: IWBSNodoProps, nextState: IWBSNodoState): void {
            if (global.hasChanged(this.props.actionState, nextProps.actionState)) {
                if (global.isSuccessful(nextProps.actionState)) {
                    let state: any = global.getData(nextProps.actionState);
                    if (state) {
                        let equals: boolean = App.areEqual(nextProps.item, state.item);
                        if (equals === true) {
                            if (state.action === "expand") {
                                let collapse: Element = ReactDOM.findDOMNode(this);
                                //
                                let container = $(collapse).closest(".wbs-node-container");
                                if (container) {
                                    container.children(".wbs-node-children").addClass("wbs-node-active");
                                    container.children(".wbs-node-children").removeClass("wbs-node-nested");
                                };
                                //
                                this.setState({ collapsed: false });
                            };
                        };
                    };
                };
            };
        };
        render(): JSX.Element {
            let id: string = this.props.id + "-collapse-" + this.props.item.codigo.join("-");
            let iconClassName: string = "fas ";
            let icon: any;

            if (this.state.collapsed === true) {
                iconClassName += " " + this.props.expandIcon;
            } else {
                iconClassName += " " + this.props.collapseIcon;
            };

            if (this.props.collapsible === true) {
                icon = <i className={iconClassName} onClick={this.onClick.bind(this)}></i>;
            };

            return <span className="wbs-node-collapse wbs-button-icon">{icon}</span>
        };
    };

    export class WBSNodoCheckBox extends React.Component<IWBSNodoProps, IWBSNodoState>{
        constructor(props: IWBSNodoProps) {
            super(props);
            this.state = { checked: false };
        };
        onClick(): void {
            this.setState({ checked: !this.state.checked });

            if (this.props.onNodeCheck) {
                this.props.onNodeCheck(this.props.item, !this.state.checked);
            };
        };
        render(): JSX.Element {
            if (this.props.checkable !== true) {
                return null;
            };

            let className: string = "";

            if (this.state.checked === true) {
                className += "fas " + this.props.checkedIcon;
            } else {
                className += "fas " + this.props.uncheckedIcon;
            };

            let id: string = this.props.id + "-check-" + this.props.item.codigo.join("-");

            return <span id={id} className="wbs-button-icon"><i className={className} onClick={this.onClick.bind(this)}></i></span>
        };
    };

    export class WBSObject extends React.Component<IWBSNodoProps, IWBSNodoState>{
        onClick(e): void {
            e.stopPropagation();

            if (this.props.selectable === true) {
                if (this.props.onNodeClick) {
                    this.props.onNodeClick(this.props.item);
                }
            };
        };
        render(): JSX.Element {
            let className: string = "wbs-node-content ";
            //
            let bloqueado: boolean = this.props.item.getProperty("Bloqueado");
            if (bloqueado === true) {
                className += "wbs-node-locked "
            };
            //
            let equals: boolean = App.areEqual(this.props.item, this.props.selectedItem);
            if (equals === true) {
                className += "wbs-node-selected"
            };
            //
            let fnFormatter = this.props.formatter ? this.props.formatter : this.props.item.formatter;
            //
            return <li className="wbs-node-container">
                <div className={className}>
                    <WBSNodoCollapse {...this.props} />
                    <WBSNodoCheckBox {...this.props} />
                    <span className="wbs-node-code bold">{this.props.item.codigo.join(this.props.codeSeparator)}</span>
                    <span className="wbs-node-link" onClick={this.onClick.bind(this)}>
                        <span className="wbs-node-text">{fnFormatter(this.props.item, this.props.index, this.props)}</span>
                    </span>
                </div>
                {this.props.children}
            </li>
        };
    };

    interface IWBSAction {
        icon: string;
        title: string;
        action: (id: string, idForm: string, item: any, config: page.IPageConfig) => void;
    };

    interface IWBSActionsProps extends React.Props<any> {
        id?: string;
        idForm?: string;
        idFormSection?: string;
        actions?: IWBSAction[];
        className?: string;
        item?: Interfaces.IWBSNodo;
        config?: page.IPageConfig;
        style?: React.CSSProperties;
    };

    export class $WBSActions extends React.Component<IWBSActionsProps, IWBSActionsProps>{
        static defaultProps: IWBSActionsProps = {
            id: "",
            idForm: "",
            className: "",
            item: undefined
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        static collapse: IWBSAction = {
            icon: "fa-minus-square",
            title: "Colapsar",
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                config.setState({ action: "collapse", item }, id);
            }
        };
        static expand: IWBSAction = {
            icon: "fa-plus-square",
            title: "Expandir",
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                config.setState({ action: "expand", item }, id);
            }
        };
        static delete: IWBSAction = {
            icon: "fa-trash",
            title: "Eliminar",
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let padre: App.Interfaces.IWBSComposite = item.padre;
                if (padre) {
                    padre.remove(item);
                    //
                    let data: any = Forms.getValue(id, idForm);
                    if (data) {
                        let raiz: App.Interfaces.IWBSNodo = App.deserialize(data, null, null);
                        if (raiz) {
                            let updated: boolean = raiz.update(padre);
                            if (updated === true) {
                                raiz.calculate();
                                //
                                Forms.updateFormElement(idForm, id, raiz.serialize());
                                //
                                global.dispatchDefault("global-page-entity", {}, id);
                            }
                        }
                    }
                }
            }
        };
        static addLevel: IWBSAction = {
            icon: "fa-plus",
            title: "Agregar Nivel",
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let data: any = Forms.getValue(id, idForm);
                let raiz: App.Interfaces.IWBSNodo = App.deserialize(data, null, null);
                let nodo: App.Interfaces.IWBSNivel = new App.WBSNivel({ Nombre: "Nuevo Nivel", Cantidad: 1.00000000, Precio: 0.00000000, Importe: 0.00000000, _nuevo: true }, item, raiz);
                //
                $WBSActions.expand.action(id, idForm, item, config);
                $WBSActions.edit.action(id, idForm, nodo, config);
            }
        };
        static addCard: IWBSAction = {
            icon: "fa-credit-card-blank",
            title: "Agregar Tarjeta",
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let data: any = Forms.getValue(id, idForm);
                let raiz: App.Interfaces.IWBSNodo = App.deserialize(data, null, null);
                let nodo: App.Interfaces.IWBSTarjeta = new App.WBSTarjeta({ Nombre: "Nueva Tarjeta", Cantidad: 1.00000000, Precio: 0.00000000, Importe: 0.00000000, _nuevo: true }, item, raiz);
                //
                $WBSActions.expand.action(id, idForm, item, config);
                $WBSActions.edit.action(id, idForm, nodo, config);
            }
        };
        static edit: IWBSAction = {
            icon: "fa-pencil",
            title: "Editar",
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let $id: string = ["sb", id].join("$");
                let $idForm: string = ["form", id].join("$");
                //
                Forms.remove($idForm);
                //
                let entidad: any = item.entidad;
                if (entidad) {
                    let elements: any = {};
                    //
                    for (var p in entidad) {
                        if (p === "Estatus") {
                            let data: any = entidad[p];
                            if (data && data.Clave === "A") {
                                elements[p] = true;
                            } else if (data && data.Clave === "B") {
                                elements[p] = false;
                            } else {
                                elements[p] = entidad[p]
                            }
                        } else {
                            elements[p] = entidad[p];
                        };
                    };
                    //
                    Forms.updateFormElements($idForm, elements);
                };
                //
                if (item.onEdit) {
                    item.onEdit($idForm);
                };
                //
                global.dispatchSuccessful("global-page-entity", item, id);
                //
                global.showSidebar($id);
            }
        };
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            //
            if (this.props.item) {
                let actionButtons = [];
                //
                let actions = [...this.props.actions];
                if (actions) {
                    actions.forEach((action, index) => {
                        let className = "fas " + action.icon;
                        //
                        actionButtons.push(<button key={"wbs-action-" + index} className="wbs-button" title={action.title}
                            onClick={(e) => {
                                e.stopPropagation();
                                //
                                action.action(this.props.id, idForm, this.props.item, this.props.config)
                            }}><i className={className}></i></button>
                        );
                    })
                };
                //
                let className: string = "wbs-node-actions ";
                let style: any = this.props.style;
                //
                if (this.props.className) {
                    className += this.props.className;
                };
                //
                let bloqueado: boolean = this.props.item.getProperty("Bloqueado");
                if (bloqueado !== true) {
                    return <span className={className} style={style}>
                        {actionButtons}
                    </span>
                };
            };
            //
            return null;
        };
    };

    export const WBSActions: any = ReactRedux.connect($WBSActions.props, null)($WBSActions);
};

/*
https://material-ui.com/es/components/tree-view/
http://demos.shieldui.com/web/treeview/checkboxes
http://keenthemes.com/preview/metronic/theme/admin_1/ui_tree.html
https://medium.com/@tariqul.islam.rony/multiple-checkbox-handling-by-react-js-84b1d49a46c6
https://stackoverflow.com/questions/10408482/how-to-get-unique-value-in-multidimensional-array
https://stackoverflow.com/questions/4520503/how-do-you-get-the-root-node-or-the-first-level-node-of-the-selected-node-in-a-t
https://es.reactjs.org/docs/react-api.html
https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/
https://jsfiddle.net/desandro/zm7Et/

div.wbs-container
	ul.wbs-list
		li.wbs-node-container
            div.wbs-node-content
	            i.wbs-node-collapse
                i.wbs-node-check
                a.wbs-node-link > children
		    div.wbs-node-children
			    div.wbs-node-children-container
*/