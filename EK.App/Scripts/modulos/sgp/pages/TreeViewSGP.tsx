namespace EK.Modules.SGP.Pages.Proyectos {
    "use strict";

    const PAGE_ID = "TreeViewSGP";

    const PROYECTO_SELECCIONADO: string = "ProjectSelected";
    const SLOT_WBS: string = "WBSNODE";
    const SECTION_FORM_NEWTASK: string = PAGE_ID + "$NewTaskForm";
    const SIDEBAR_NAME: string = PAGE_ID + "SideBarNew";
    const TASK_NEW = PAGE_ID + "$NewTask";
    const w: any = window;

    w.popoverUserAssigned = (id, item) => {
        let iniciales: any;
        iniciales = item.entidad.Tarea.AsignadoA.Nombre.substr(0, 1) + item.entidad.Tarea.AsignadoA.Apellidos.substr(0, 1);
        let itemfoto = item.entidad.Tarea.AsignadoA.Foto === "" ? $(["<span class='img-circle-fixed' style='margin-left:20px; vertical-align:middle; max-width:55px; max-height:55px; width:45px; height:45px; background:#1e7145; color:white; text-align:center; justify-content:center; align-items:center ; display:inline-block' >",
            "<p style='padding-top:13px; margin:0px'>", iniciales, "</p>", "</span>"].join(""))
            : $(["<img alt='' class='img-circle-fixed' src='", item.entidad.Tarea.AsignadoA.Foto, "' style='margin-left:20px; vertical-align:middle; max-width:55px; max-height:55px; width:45px; height:45px; background:#1e7145; color:white; text-align:center; justify-content:center; align-items:center ' />"].join(""))

        let contentDetalle: string = "<span>" + itemfoto[0].outerHTML + "</span>";            
        contentDetalle = contentDetalle + "<span style='margin-left:4px;' class='badge badge-info'>" + item.entidad.Tarea.AsignadoA.Nombre + " " + item.entidad.Tarea.AsignadoA.Apellidos + "</span>";

        let element: any = $("#" + id);
        element.popover({
            trigger: "focus",
            html: true,
            content: contentDetalle,
            title: "Detalle",
            container: 'body',
            placement: "left"
        }).on("mouseenter", function () {
            element.popover("show");
        }).on("mouseleave", function () {
            element.popover("hide");
        }).on("show.bs.popover", function () {
            $(this).data("bs.popover").tip().css("max-width", "800");
            $(this).data("bs.popover").tip().css("width", "400px");
        });
    };


    export var tiposEntidad: any = {
        "sgp$proyectos": { Name: "Proyecto", bgColor: "#9f9cbd26" },
        "sgp$grupos": { Name: "Grupo Nivel", bgColor: "#cec4c412" },
        "sgp$tareas": { Name: "Tarea", bgColor: "" }
    };

   
    export var NodoType: INodoType = {
        NIVEL: "NIVEL",
        RAIZ: "RAIZ",
        SUBNIVEL: "SUBNIVEL"
    };

    export interface ITypeButton {
        CM: string;
        CL: string;
        EX: string;
        DL: string;
        LV: string;
        SL: string;
        FL: string;
        UA: string;
        ED: string;
        AA: string;
        TA: string;
        NG: string;
        PL: string;
        PA: string;
        PR: string;
    };

    export var TypeButton: ITypeButton = {
        CM: "commments",
        CL: "collapse",
        EX: "expand",
        DL: "delete",
        LV: "level",
        SL: "subLevel",
        FL: "files",
        ED: "edit",
        UA: "userAssigned",
        AA: "adminAdvanced",
        TA: "workflow",
        NG: "gantt",
        PL: "play",
        PA: "pause",
        PR: "priority"
    };



    /* ****************************************** INICIA INTERFACES ****************************************** */
    export interface INodoType {
        RAIZ: string;
        NIVEL: string;
        SUBNIVEL: string;
    };

    export var NodoType: INodoType = {
        NIVEL: "NIVEL",
        RAIZ: "RAIZ",
        SUBNIVEL: "SUBNIVEL"
    };

 export interface INodeState {
        checked?: boolean;
        collapsed?: boolean;
    };
   

    export interface IComposite extends INode {
        children: Array<INode>;
        add: (item: INode) => void;
        remove: (item: INode) => void;
        create: (data: any) => INode;
    };

    export interface IFormProps extends React.Props<any> {
        config?: page.IPageConfig;
        idForm?: string;
        item?: INode;
    };

    export interface IRaiz extends IComposite { };

    export interface INivel extends IComposite { };

    export interface ISubNivel extends IComposite { };

    interface INivelEditProps extends IFormProps {
        tipoNivel?: any;
    };

    export interface INode {
        codigo: string[];
        nivel: number;
        padre: INode;
        raiz: INode;
        type: string;
        entidad: any;
        TipoNodo: any;
        children: any;
        serialize(): any;
        formatter: (item: INode, props: INodeProps) => JSX.Element;
        getLowerId: (id?: number) => number;
        mapFormToEntity: (form: global.EditForm) => any;
        calculate: () => number;
        update: (item: INode) => boolean;
        node: (props: any) => JSX.Element;
        edit: (props: any) => JSX.Element;
        view?: (props: any) => JSX.Element;
    };


    export interface INodeProps extends React.Props<any> {
        id?: string;
        item?: INode;
        idForm?: string;
        idFormSection?: string;
        itemChildren?: Array<INode>;
        selectedItem?: INode;
        collapseIcon?: string;
        expandIcon?: string;
        checkedIcon?: string;
        uncheckedIcon?: string;
        codeSeparator?: string;
        collapsible?: boolean;
        checkable?: boolean;
        selectable?: boolean;
        formatter?: (item: INode, props: INodeProps) => JSX.Element;
        processData?: (item: any) => any;
        processChildren?: (item: any, children: any[]) => any[];
        onNodeClick?: (item: INode) => void;
        onNodeCheck?: (item: INode, value: boolean) => void;
        onNodeToggle?: (item: INode, value: boolean) => void;
    };



    interface ITreeViewProps extends INodeProps {
        id?: string;
        idForm?: string;
        idFormSection?: string;
        hasChanged?: boolean;
        timestamp?: number;
        value?: any;
    };

    interface ITreeViewState {
        selectedItem?: INode;
    };



    interface ITreeViewSectionProps extends grid.IColumn, ITreeViewProps {
        className?: string;
        config?: page.IPageConfig;
        maxLevel?: number;
        minLevel?: number;
        title?: any;
        style?: React.CSSProperties;
    };

    /* ****************************************** TERMINA INTERFACES ****************************************** */


    /* ****************************************** INICIA CLASES ****************************************** */


    class TreeView extends React.Component<ITreeViewProps, ITreeViewState>{
        constructor(props: ITreeViewProps) {
            super(props);
            this.state = {};
        };
        static defaultProps: ITreeViewProps = {
            id: "",
            value: undefined,
            hasChanged: false,
            collapseIcon: "fa-minus-square",
            expandIcon: "fa-plus-square",
            checkedIcon: "fa-check-square",
            uncheckedIcon: "fa-square",
            codeSeparator: ".",
            collapsible: true,
            checkable: true,
            selectable: true
        };
        getNodeProperties(): INodeProps {
            let retValue: INodeProps = {
                id: this.props.id,
                item: this.props.item,
                idForm: this.props.idForm,
                idFormSection: this.props.idFormSection,
                itemChildren: this.props.itemChildren,
                selectedItem: this.props.selectedItem,
                collapseIcon: this.props.collapseIcon,
                expandIcon: this.props.expandIcon,
                checkedIcon: this.props.checkedIcon,
                uncheckedIcon: this.props.uncheckedIcon,
                codeSeparator: this.props.codeSeparator,
                collapsible: this.props.collapsible,
                checkable: this.props.checkable,
                selectable: this.props.selectable,
                processData: this.props.processData,
                processChildren: this.props.processChildren,
                onNodeClick: this.props.onNodeClick,
                onNodeCheck: this.props.onNodeCheck,
                onNodeToggle: this.props.onNodeToggle
            };

            return retValue;
        };
        onNodeClick(item): void {
            if (this.props.onNodeClick) {
                this.props.onNodeClick(item);
            } else {
                this.setState(global.assign(this.state, { selectedItem: item }));
            };
        };
        shouldComponentUpdate(nextProps: ITreeViewProps, nextState: ITreeViewState): boolean {
            let thisItem: any = this.props.onNodeClick ? this.props.selectedItem : this.state.selectedItem;
            let nextItem: any = this.props.onNodeClick ? nextProps.selectedItem : nextState.selectedItem;

            let changed: boolean = hasChanged(thisItem, nextItem);
            if (changed) {
                return true;
            };

            if (this.props.hasChanged !== nextProps.hasChanged ||
                this.props.timestamp !== nextProps.timestamp) {
                return true;
            };

            return false
        };
        render(): JSX.Element {
            if (!this.props.value) {
                return null;
            };

            let raiz: INode = deserialize(this.props.value, null, null);
            if (raiz) {
                raiz.calculate();

                let formControlId: string;

                if (!this.props.id) {
                    let d: any = new Date();
                    formControlId = "formControl_" + Number(d).toString();
                } else {
                    formControlId = "formControl_" + this.props.id;
                };

                let nodeProps: INodeProps = this.getNodeProperties();
                nodeProps.onNodeClick = this.onNodeClick.bind(this);
                nodeProps.selectedItem = nodeProps.onNodeClick ? nodeProps.selectedItem : this.state.selectedItem;

                return <div className="wbs-treeview">
                    <ul className="wbs-list" id={formControlId} name={formControlId}>
                        {React.cloneElement(raiz.node(nodeProps), { key: "nodo$obra" })}
                    </ul>
                </div>
            };

            return null;
        };
    };

    class TreeViewForm extends React.Component<ITreeViewProps, ITreeViewProps>{
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (idForm) {
                let element: any = EK.Global.assign(this.props, Forms.getFormElement(idForm, this.props));

                return <TreeView {...element} />
            };

            return null;
        };
    };

    export let TreeView$Form: any = ReactRedux.connect(Forms.props, null)(TreeViewForm);

    export class Node implements INode {
        codigo: string[];
        nivel: number;
        padre: INode;
        raiz: INode;
        type: string;
        entidad: any;
        TipoNodo: any;
        children: any;

        constructor(entidad: any, padre: IComposite, raiz: INode, type: string) {
            this.padre = padre;
            this.raiz = raiz;
            this.entidad = global.assign({}, entidad);
            this.type = type;

            let importe: number = entidad.Importe;
            if (importe === undefined || importe === null) {
                this.entidad = global.assign(this.entidad, { Importe: 0 });
            };

            if (!padre) {
                this.nivel = 0;
                this.codigo = ["1"];
            } else {
                this.nivel = padre.nivel + 1;
                let _codigo: string = String(padre.children.length + 1);
                this.codigo = [].concat(padre.codigo, [_codigo]);
            };
        };
        calculate(): number {
            return this.entidad["Importe"];
        };
        formatter(item: INode, props: INodeProps): JSX.Element {
            return <div></div>
        };
        node = (props: INodeProps): JSX.Element => {
            return <Object {...props} item={this} collapsible={false} />
        };
        getLowerId(id?: number): number {
            id = id ? id : 0;

            if (this.entidad.ID <= 0) {
                if (this.entidad.ID < id) {
                    id = this.entidad.ID;
                };
            };

            return id;
        };
        update(item: INode): boolean {
            let updated: boolean;

            if (this.entidad && item.entidad) {
                let equals: boolean = this.entidad.ID === item.entidad.ID;
                if (equals === true) {
                    for (var p in item) {
                        this[p] = item[p];
                        this.entidad = global.assign(this.entidad, {
                            _eliminado: undefined,
                            _nuevo: undefined,
                            _sincambios: undefined,
                            _modificado: true
                        });
                    };

                    updated = true;
                }
            };

            return updated;
        };
        serialize(): any {
            let retValue: any = global.assign(this.entidad, {
                Codigo: this.codigo.join("."),
                Nivel: this.nivel,
                Type: this.type
            });

            return retValue;
        };
        edit = (props: IFormProps): JSX.Element => {
            return <Row></Row>
        };
        mapFormToEntity = (form: global.EditForm): any => {
            let retValue: any = form
                .addID()
                .addNombre()
                .addNumber("Importe")
                .addEstatus()
                .addVersion()
                .toObject();

            return retValue;
        };
        //beforeSave(config: page.IPageConfig): boolean {
        //    return true;
        //};
    };


    export class Composite extends Node implements IComposite {
        children: Array<INode>;

        constructor(entidad: any, padre: any, raiz: any, type: string) {
            super(entidad, padre, raiz, type);
            this.children = new Array<INode>();
        };
        add(item: INode): void {
            this.children.push(item);
        };
        remove(item: INode): void {
            let items: any[] = [];
            let thisItems: any[] = this.children ? this.children : [];
            let thisItem: any = EK.Global.assign({}, item);

            thisItems.forEach((_item: any) => {
                let itemTemp: any = EK.Global.assign({}, _item);

                if (_item.entidad.ID !== item.entidad.ID) {
                    items.push(itemTemp);
                };
            });

            if (thisItem.entidad.ID > 0) {
                thisItem.entidad = global.assign(thisItem.entidad, {
                    _nuevo: undefined,
                    _sincambios: undefined,
                    _modificado: undefined,
                    _eliminado: true
                });

                items.push(thisItem);
            };

            this.children = [...items];
        };
        calculate(): number {
            let importe: number = 0;
            let sumatoria: number = 0;

            this.children.forEach((item: INode) => {
                sumatoria = sumatoria + item.calculate();
            });
            let childrensArray: any = this.children;
            let childrensCA: any[];
            childrensCA = childrensArray.filter((value) => {
                return value.entidad.Tarea.Contemplaravance == true;
            });
            let childrens: number = childrensCA.length > 0 ? childrensCA.length : 1;

            if (this.entidad.Tarea.Contemplaravance || this.entidad.Type === NodoType.RAIZ) {
                importe = sumatoria > 0 ? (sumatoria / childrens) : this.entidad.Importe;
            }
            this.entidad = global.assign(this.entidad, { Importe: importe });

            return importe;
        };
        node = (props: INodeProps): JSX.Element => {
            let children: any[] = this.children ? this.children : [];

            if (props.processChildren) {
                children = props.processChildren(this, children);
            };

            return <Object {...props} item={this}>
                <div className="wbs-node-children wbs-node-nested">
                    <ul className="wbs-node-children-container">
                        {
                            children.map((child: INode, index: number) => {
                                return React.cloneElement(child.node(props), { key: index })
                            })
                        }
                    </ul>
                </div>
            </Object>
        };
        getLowerId(id?: number): number {
            id = super.getLowerId(id);

            if (this.children) {
                this.children.forEach((child) => {
                    id = child.getLowerId(id);
                })
            };

            return id;
        };
        update(item: INode): boolean {
            let updated: boolean = super.update(item);
            
            if (updated !== true) {
                if (this.children) {
                    this.children.forEach((child) => {
                        if (updated !== true) {
                            updated = child.update(item);
                            
                            if (updated === true) {
                                this.entidad = global.assign(this.entidad, {
                                    _eliminado: undefined,
                                    _nuevo: undefined,
                                    _sincambios: undefined,
                                    _modificado: true
                                });
                            };
                        };
                    })
                };
            };

            return updated;
        };
        serialize(): any {
            let obj: any = super.serialize();
            let children: any[] = [];

            if (this.children) {
                this.children.forEach((value) => {
                    let clave: string = value.TipoNodo.Clave;
                    let nodo: any;
                    switch (clave) {
                        case "sgp$grupos":
                            nodo = global.assign(new Nivel(value, this, this), value);
                            break;
                        case "sgp$tareas":
                            nodo = global.assign(new Nivel(value, this, this), value);
                            break;
                        default:
                            break;
                    };

                    let child: any = nodo.serialize();
                    children.push(child);
                });
            };

            if (obj) {
                obj.Children = children;
            };

            return obj;
        };
        create(data: any): any {
            let id: number = -1;
            
            let raiz = this.raiz as IComposite;
            if (raiz) {
                id = raiz.getLowerId() - 1;
            };
            
            let entidad: any = global.assign(data, { ID: id, _nuevo: true });
            
            let retValue = ___deserialize(entidad, this, raiz);
            
            return retValue;
        };
    };



    export class Object extends React.Component<INodeProps, INodeState>{
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

            let equals: boolean = areEqual(this.props.item, this.props.selectedItem);
            if (equals === true) {
                className += "wbs-node-selected"
            };

            let fnFormatter = this.props.formatter ? this.props.formatter : this.props.item.formatter;

            let lineThroughStyle: string = "none";
            let color: string = "";
            let bGColorNodeType: any = "";
            if (this.props.item && this.props.item.entidad && this.props.item.entidad.tarea && this.props.item.entidad.Tarea.EstatusAvance) {
                lineThroughStyle = "line-through";
                color = "#b9b7b7";
            }

            if (this.props.item && this.props.item.entidad && this.props.item.entidad.TipoNodo && this.props.item.entidad.TipoNodo.Clave) {
                bGColorNodeType = tiposEntidad[this.props.item.entidad.TipoNodo.Clave].bgColor;
            }

            return <li className="wbs-node-container">
                <div className={className} style={{ background: bGColorNodeType }}>
                    <NodoCollapse {...this.props} />
                    <span className="wbs-node-code bold" style={{ textDecoration: lineThroughStyle, color: color }}>{this.props.item.codigo.join(this.props.codeSeparator)}</span>
                    <a className="wbs-node-link" onClick={this.onClick.bind(this)}>
                        <span className="wbs-node-text">{fnFormatter(this.props.item, this.props)}</span>
                    </a>
                    <span className="wbs-node-actions"></span>
                </div>
                {this.props.children}
            </li>
        };
    };

    export class Raiz extends Composite implements IRaiz {
        obra: any;
        constructor(entidad: any) {
            super(entidad, null, null, NodoType.RAIZ);
            this.obra = global.assign({}, entidad.Obra);
        };

        formatter(item: INode, props: INodeProps): JSX.Element {
            return <div>
                <span className="badge badge-success" style={{ marginRight: 5 }}>P</span>
                <span className="wbs-node-name">{item.entidad.Nombre}</span>
                <span className="wbs-node-importe">
                    <EK.Modules.SGP.Pages.Tareas.ProgressBarSgpViewSmall id={"AvanceTarea"} value={item.entidad.Importe} />
                </span>
                <Actions
                    id={props.id}
                    idForm={props.idForm}
                    idFormSection={props.idFormSection}
                    item={item}
                    className="pull-right"
                    style={{ paddingRight: 5 }}
                    actions={[$Actions.addLevel, $Actions.addComments, $Actions.addFiles]} />
            </div>
        };
    };



    class $TreeViewSection extends React.Component<ITreeViewSectionProps, ITreeViewSectionProps>{
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            idForm: getData(state.global.page).id
        });
        static defaultProps: ITreeViewSectionProps = {
            className: "",
            maxLevel: 5,
            minLevel: 2,
            title: null
        };
        getTreeViewProperties(): ITreeViewProps {
            let retValue: ITreeViewProps = {
                id: this.props.id,
                idForm: this.props.idForm,
                idFormSection: this.props.idFormSection,
                onNodeCheck: this.props.onNodeCheck,
                onNodeClick: this.props.onNodeClick,
                onNodeToggle: this.props.onNodeToggle
            };

            return retValue;
        };
        getColumnProperties(): grid.IColumnProps {
            let retValue: grid.IColumnProps = {
                className: this.props.className,
                size: this.props.size,
                style: this.props.style
            };

            return retValue;
        };
        onNodeClick(item): void {
            global.dispatchSuccessful("global-page-entity", item, this.props.id);
            global.dispatchSuccessful("global-current-entity", item.entidad.Tarea);
        };
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let selectedItem: INode;

            let item: DataElement = this.props.config.getEntity(this.props.id);
            if (item && global.isSuccessful(item)) {
                selectedItem = global.getData(item);
            };
            //
            let processChildren = (item: any, children: any[]): any[] => {
                let retValue: any[] = children ? children : [];

                if (selectedItem) {
                    if (selectedItem.entidad && selectedItem.entidad._nuevo === true) {
                        let parentItem = selectedItem.padre;
                        if (parentItem && parentItem.entidad) {
                            if (item.entidad.ID === parentItem.entidad.ID) {
                                retValue = [...retValue, new Blank(selectedItem.entidad, item, selectedItem.raiz, null)];
                            }
                        };
                    };
                };

                return retValue;
            };
            //
            let columnProperties: grid.IColumn = this.getColumnProperties();
            let treeViewProperties: ITreeViewProps = this.getTreeViewProperties();
            //
            return <Column {...columnProperties}>
                <page.OptionSection
                    id={"wbs$treeview"}
                    subTitle=""
                    icon="fa fa-boxes fa-3x"
                    collapsed={false}
                    level={1}
                    hideCollapseButton={false}>
                    <Row style={{ marginTop: -5, marginBottom: -5 }}>
                        <div className="wbs-container">
                            <TreeView$Form {...treeViewProperties}
                                onNodeClick={this.onNodeClick.bind(this)}
                                checkable={false}
                                collapseIcon="fa-chevron-down"
                                expandIcon="fa-chevron-right"
                                processChildren={processChildren}
                                selectedItem={selectedItem} />
                        </div>
                    </Row>
                </page.OptionSection>
                <ModalNewNodeSGP {...this.props} />
            </Column>
        };
    };

    export const TreeViewSection: any = ReactRedux.connect($TreeViewSection.props, null)($TreeViewSection);


    export class Blank extends Node {
        node = (props: INodeProps): JSX.Element => {
            return <li className="wbs-node-container">
                <div className="wbs-node-content">
                    <a className="wbs-node-link wbs-node-selected wbs-node-blank">
                        <span className="wbs-node-text">{this.entidad.Nombre}</span>
                    </a>
                </div>
            </li>
        };
    };

    interface IActionsProps extends React.Props<any> {
        id?: string;
        idForm?: string;
        idFormSection?: string;
        actions?: IAction[];
        className?: string;
        item?: INode;
        config?: page.IPageConfig;
        style?: React.CSSProperties;
    };

    interface IAction {
        icon: string;
        title: string;
        type: string;
        action: (id: string, idForm: string, item: any, config: page.IPageConfig) => void;
        extraInfo: (value: number) => JSX.Element;
    };

    export class $Actions extends React.Component<IActionsProps, IActionsProps>{
        static defaultProps: IActionsProps = {
            id: "",
            idForm: "",
            className: "",
            item: undefined
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });

        private static onDeleteItem(item: any): any {
            EK.Global.confirm("Presione Confirmar para eliminar ", "Eliminar elemento", () => {
                let id = item.entidad.ID ? item.entidad.ID : 0;
                if (id > 0) {
                    let parametros: string = global.encodeObject({ ID: id });
                    dispatchAsync("global-page-data", "base/sgp/WBS/Get/DeleteWBSById/" + parametros, SLOT_WBS);
                }
            });
        };

        static collapse: IAction = {
            icon: "fa-minus-square",
            title: "Colapsar",
            type: TypeButton.CL,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let element: JQuery = $("#" + id + "-collapse-" + item.codigo.join("-") + " > i");
                if (element && element.length && !element.hasClass("collapsed")) {
                    element.click();
                };
            },
            extraInfo: (value: number) => {
                return null;
            }
        };
        static expand: IAction = {
            icon: "fa-plus-square",
            title: "Expandir",
            type: TypeButton.EX,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let element: JQuery = $("#" + id + "-collapse-" + item.codigo.join("-") + " > i");
                if (element && element.length && !element.hasClass("expanded")) {
                    element.click();
                };
            },
            extraInfo: (value: number) => {
                return null;
            }
        };
        static delete: IAction = {
            icon: "fa-trash",
            title: "Eliminar",
            type: TypeButton.DL,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                $Actions.onDeleteItem(item);
            },
            extraInfo: (value: number) => {
                return null;
            }
        };
        static addLevel: IAction = {
            icon: "fa-plus",
            title: "Agregar Nivel",
            type: TypeButton.LV,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                $Actions.expand.action(id, idForm, item, config);
                let data: any = Forms.getValue(id, idForm);
                let raiz: INode = deserialize(data, null, null);
                Forms.updateFormElement(SECTION_FORM_NEWTASK, "Type", "grupos");
                Forms.updateFormElement(SECTION_FORM_NEWTASK, "Padre", item.entidad);
                global.showSidebar(SIDEBAR_NAME);
            },
            extraInfo: (value: number) => {
                return null;
            }
        };

        static addSubLevel: IAction = {
            icon: "fa-plus",
            title: "Agregar Tarea",
            type: TypeButton.SL,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                $Actions.expand.action(id, idForm, item, config);
                let data: any = Forms.getValue(id, idForm);
                let raiz: INode = deserialize(data, null, null);
                Forms.updateFormElement(SECTION_FORM_NEWTASK, "Type", "tareas");
                Forms.updateFormElement(SECTION_FORM_NEWTASK, "Padre", item.entidad);
                global.showSidebar(SIDEBAR_NAME);
            },
            extraInfo: (value: number) => {
                return null;
            }
        };
        static adminAdvanced: IAction = {
            icon: "fal fa-flag-checkered",
            title: "Avance",
            type: TypeButton.AA,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let idEntidad: number = 0;
                switch (item.entidad.TipoNodo.Clave) {
                    case "sgp$proyectos":
                        idEntidad = item.entidad.IdProyecto;
                        break;
                    case "sgp$grupos":
                        idEntidad = item.entidad.Tarea.ID;
                        break;
                    case "sgp$tareas":
                        idEntidad = item.entidad.Tarea.ID;
                        break;
                }

                let itemSelected: any = global.assign({}, {
                    IDComponente: "QSPREditarTarea",
                    ID: idEntidad,
                    Clave: item.entidad.Clave,
                    Nombre: item.entidad.Nombre,
                    TipoEntidad: { Clave: item.entidad.TipoNodo.Clave, Nombre: tiposEntidad[item.entidad.TipoNodo.Clave].Name }
                });

                global.dispatchSuccessful("global-page-data", itemSelected, "BlogPost$SelectEntity");
                global.dispatchSuccessful("global-page-data", item.entidad.Tarea, "tareaSeleccionada");

                config.setState({ viewMode: false });
            },
            extraInfo: (value: number) => {
                return <span style={{ float: "right", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{value}</span>
            }
        };
        static play: IAction = {
            icon: "fal fa-play",
            title: "Iniciar tarea",
            type: TypeButton.PL,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let $ml: any = config.getML();
                EK.Global.confirm($ml.IniciarTarea.descripcion, $ml.IniciarTarea.titulo, () => {
                    let model: any = global.assign({}, {
                        ID: item.entidad.Tarea.ID,
                        FlujoAvance: { ID: -1, Clave: 'ENPROCESO' }
                    });

                    global.dispatchAsyncPut("global-page-data", "base/sgp/sgp_tareas/Get/IniciarTarea", model, TASK_NEW);
                });
            },
            extraInfo: (value: number) => {
                return null;
            }
        };
        static pause: IAction = {
            icon: "fal fa-pause",
            title: "Pausar tarea",
            type: TypeButton.PA,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let $ml: any = config.getML();
                EK.Global.confirm($ml.PausarTarea.descripcion, $ml.PausarTarea.titulo, () => {
                    let model: any = global.assign({}, {
                        ID: item.entidad.Tarea.ID,
                        FlujoAvance: { ID: -1, Clave: 'PAUSADA' }
                    });
                    ///preguntar. personalizar forms.
                    global.dispatchAsyncPut("global-page-data", "base/sgp/sgp_tareas/Get/IniciarTarea", model, TASK_NEW);
                });
            },
            extraInfo: (value: number) => {
                return null;
            }
        };
        static edit: IAction = {
            icon: "fal fa-edit",
            title: "Visualizar/Editar",
            type: TypeButton.ED,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let idEntidad: any = 0;
                switch (item.entidad.TipoNodo.Clave) {
                    case "sgp$proyectos":
                        idEntidad = item.entidad.IdProyecto;
                        break;
                    case "sgp$grupos":
                        idEntidad = item.entidad.Tarea.ID;
                        break;
                    case "sgp$tareas":
                        idEntidad = item.entidad.Tarea.ID;
                        break;
                }

                let idParameter: string = ":id";
                let redirectPath: string = "/sgp/Tareas/:id";
                if (idEntidad > 0) {

                    if (redirectPath.indexOf(idParameter) >= 0) {
                        redirectPath = redirectPath.replace(idParameter, idEntidad);
                    }
                    go(redirectPath);
                }

            },
            extraInfo: (value: number) => {
                return null;
            }
        };
        static priority: IAction = {
            icon: "",
            title: "Prioridad tarea",
            type: TypeButton.PR,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                
            },
            extraInfo: (value: any) => {
                //let colorIcon: string = "";
                //if (value.Prioridad.Clave === "BAJA") {
                //    colorIcon = "orange";
                //} else if (value.Prioridad.Clave === "MEDIA") {
                //    colorIcon = "green";
                //} else if (value.Prioridad.Clave === "ALTA") {
                //    colorIcon = "red";
                //}

                return <i className={value.Prioridad.Icono} style={{ color: value.Prioridad.BGColor }}></i>
            }
        };
        static addComments: IAction = {
            icon: "fal fa-comment",
            title: "Comentarios",
            type: TypeButton.CM,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let idEntidad: number= 0;
                switch (item.entidad.TipoNodo.Clave) {
                    case "sgp$proyectos":
                        idEntidad = item.entidad.IdProyecto;
                    break;
                    case "sgp$grupos":
                        idEntidad = item.entidad.Tarea.ID;
                    break;
                    case "sgp$tareas":
                        idEntidad = item.entidad.Tarea.ID;
                    break;
                }

                let itemSelected: any = global.assign({}, {
                    IDComponente: "QSPRblogpost",
                    ///IDComponente: "QSPRProyectos",
                    ID: idEntidad,
                    Clave: item.entidad.Clave,
                    Nombre: item.entidad.Nombre,
                    TipoEntidad: { Clave: item.entidad.TipoNodo.Clave, Nombre: tiposEntidad[item.entidad.TipoNodo.Clave].Name }
                });

                global.dispatchSuccessful("global-page-data", itemSelected, "BlogPost$SelectEntity");

                config.setState({ viewMode: false });
            },
            extraInfo: (value: number) => {
                return <span style={{ float: "right", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{value}</span>
            }
        };
        static workflow: IAction = {
            icon: "fas fa-random",
            title: "Autorización",
            type: TypeButton.TA,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
            },
            extraInfo: (value: any) => {
                if (value.FlujoAvance.Clave === 'PORAUTORIZAR') {
                    return <span style={{ float: "right", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}><i className="fal fa-ban"></i></span>
                } else {
                    return null;
                }
            }
        };
        static addFiles: IAction = {
            icon: "fal fa-file-alt",
            title: "Archivos",
            type: TypeButton.FL,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                let idEntidad: number = 0;
                switch (item.entidad.TipoNodo.Clave) {
                    case "sgp$proyectos":
                        idEntidad = item.entidad.IdProyecto;
                        break;
                    case "sgp$grupos":
                        idEntidad = item.entidad.Tarea.ID;
                        break;
                    case "sgp$tareas":
                        idEntidad = item.entidad.Tarea.ID;
                        break;
                }

                let itemSelected: any = global.assign({}, {
                    IDComponente: "QSPRArchivos",
                    ID: idEntidad,
                    Clave: item.entidad.Clave,
                    Nombre: item.entidad.Nombre,
                    TipoEntidad: { Clave: item.entidad.TipoNodo.Clave, Nombre: tiposEntidad[item.entidad.TipoNodo.Clave].Name }
                });

                global.dispatchSuccessful("global-page-data", itemSelected, "BlogPost$SelectEntity");
            },
            extraInfo: (value: number) => {
                return <span style={{ float: "right", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{value}</span>
            }
        };

        static userAssigned: IAction = {
            icon: "fad fa-user",
            title: "Usuario Asignado",
            type: TypeButton.UA,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
                if (item.entidad.Tarea.AsignadoA.ID != null) {
                    let idItem: any = "ActionButton_" + item.codigo.join("-") + "_" + TypeButton.UA;
                    window["popoverUserAssigned"](idItem, item);
                }
            },
            extraInfo: (value: number) => {
                return null;
            }
        };

        static GanttIcon: IAction = {
            icon: "fad fa-project-diagram",
            title: "No Gantt",
            type: TypeButton.NG,
            action: (id: string, idForm: string, item: any, config: page.IPageConfig) => {
            },
            extraInfo: (value: number) => {
                return <span style={{ float: "right", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}><i className={"fas fa-ban"}></i></span>;
            }
        };


        render(): JSX.Element {
            let permiso: AuthorizePermission = AuthorizePermission.Write;
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let item = this.props.item;
            if (item) {
                let actionButtonsRight = [];
                let actionButtonsLeft = [];

                let actions = [...this.props.actions];
                if (actions) {
                    actions.forEach((action, index) => {
                        let className = "fas " + action.icon;
                        let id = "ActionButton_" + item.codigo.join("-") + "_" + action.type;
                        if (action.type == TypeButton.CM && item.entidad.TotalComentarios > 0) {
                            actionButtonsLeft.push(<button id={id} key={"wbs-action-" + index} className="wbs-button" title={item.entidad.TotalComentarios + " " + action.title}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    action.action(this.props.id, idForm, item, this.props.config)
                                }}><i className={className}></i>{action.extraInfo(item.entidad.TotalComentarios)}
                            </button>
                            );
                        } else if (action.type == TypeButton.FL && item.entidad.TotalArchivos > 0) {
                            actionButtonsLeft.push(<button id={id} key={"wbs-action-" + index} className="wbs-button" title={item.entidad.TotalArchivos + " " + action.title}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    action.action(this.props.id, idForm, item, this.props.config)
                                }}><i className={className}></i>{action.extraInfo(item.entidad.TotalArchivos)}
                            </button>
                            );
                        }
                        else if (action.type == TypeButton.DL && item.children.length > 0) {
                            //No incluye el boton delete si tiene childrens
                        } else if (action.type == TypeButton.UA && item.entidad.Tarea.AsignadoA.ID != null) {
                            actionButtonsLeft.push(<button id={id} key={"wbs-action-" + index} className="wbs-button" title={action.title}
                                onMouseEnter={(e) => {
                                    e.stopPropagation();
                                    action.action(this.props.id, idForm, item, this.props.config)
                                }}><i className={className}></i> <span style={{ fontSize: "8px", fontFamily: "poppins" }}>{item.entidad.Tarea.AsignadoA.Nombre} </span></button>
                            );
                        }
                        else if (action.type == TypeButton.PR) {
                            if (item.entidad.Tarea.Prioridad.Clave != null && item.entidad.Tarea.Prioridad.Clave !="NINGUNA") {
                                actionButtonsLeft.push(<button id={id} key={"wbs-action-priority" + index} className="wbs-button" title={action.title + ": " + item.entidad.Tarea.Prioridad.Nombre}
                                    onMouseEnter={(e) => {
                                        e.stopPropagation();
                                        action.action(this.props.id, idForm, item, this.props.config)
                                    }}>{action.extraInfo(item.entidad.Tarea)}</button>
                                );
                            }
                        }
                        else if (action.type == TypeButton.TA) {
                            if (item.entidad.Tarea.WorkFlow.ID != null) {
                                actionButtonsLeft.push(<button id={id} key={"wbs-action-workflow" + index} className="wbs-button" title={action.title + ": " + item.entidad.Tarea.WorkFlow.Nombre}
                                    onMouseEnter={(e) => {
                                        e.stopPropagation();
                                        action.action(this.props.id, idForm, item, this.props.config)
                                    }}>
                                    <i className={className}></i>{action.extraInfo(item.entidad.Tarea)}
                                    </button>
                                );
                            }
                        }
                        else if (action.type == TypeButton.AA) {
                            if (item.entidad.TieneHijos == false && item.entidad.TipoNodo.Clave === 'sgp$tareas' && item.entidad.Tarea.FlujoAvance.Clave !== 'NOINICIADA') {
                                actionButtonsRight.push(<button id={id} key={"wbs-action-adminAdvanced" + index} className="wbs-button" title={action.title}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        action.action(this.props.id, idForm, item, this.props.config)
                                    }}><i className={className}></i></button>);
                            }
                        }
                        else if (action.type == TypeButton.PL) {
                            if (item.entidad.TieneHijos == false && item.entidad.TipoNodo.Clave === 'sgp$tareas') {
                                if (item.entidad.Tarea.FlujoAvance.Clave === 'NOINICIADA' || item.entidad.Tarea.FlujoAvance.Clave === 'PAUSADA') {
                                    let user: any = EK.Store.getState().global.app.data.Me;
                                    if (item.entidad.Tarea.AsignadoA.ID === user.ID) {
                                        actionButtonsRight.push(<button id={id} key={"wbs-action-play" + index} className="wbs-button" title={action.title}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                action.action(this.props.id, idForm, item, this.props.config)
                                            }}><i className={className}></i></button>);

                                    }
                                }
                            }
                        }
                        else if (action.type == TypeButton.PA) {
                            if (item.entidad.TieneHijos == false && item.entidad.TipoNodo.Clave ==='sgp$tareas') {
                                if (item.entidad.Tarea.FlujoAvance.Clave === 'ENPROCESO') {
                                    let user: any = EK.Store.getState().global.app.data.Me;
                                    if (item.entidad.Tarea.AsignadoA.ID === user.ID) {
                                        actionButtonsLeft.push(<button id={id} key={"wbs-action-pause" + index} className="wbs-button" title={action.title}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                action.action(this.props.id, idForm, item, this.props.config)
                                            }}><i className={className}></i></button>);
                                    }
                                }
                            }
                        }
                        else if (action.type == TypeButton.ED) {
                            actionButtonsRight.push(<Authorize key={"wbs-action-authorize-" + index} accion={AuthorizeAction.RenderBlocked} permiso={permiso}><button id={id} key={"wbs-action-" + index} className="wbs-button" title={action.title}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        action.action(this.props.id, idForm, item, this.props.config)
                                    }}><i className={className}></i></button>
                                </Authorize>);
                        }
                        else if (action.type == TypeButton.NG) {
                            if (!item.entidad.Tarea.PresentacionGantt) {
                                actionButtonsLeft.push(<button id={id} key={"wbs-action-" + index} className="wbs-button" title={action.title}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        action.action(this.props.id, idForm, item, this.props.config)
                                    }}><i className={className}></i>{action.extraInfo(0)}
                                </button>
                                );
                            }
                        }
                        else {
                            actionButtonsRight.push(<button id={id} key={"wbs-action-" + index} className="wbs-button" title={action.title}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    action.action(this.props.id, idForm, item, this.props.config)
                                }}><i className={className}></i></button>
                            );
                        }
                    })
                };

                let className: string = "wbs-node-actions ";

                if (this.props.className) {
                    className += this.props.className;
                };

                let style = this.props.style;

                return <span>
                        <span className={""} style={style}>{actionButtonsLeft}</span>
                        <span className={className} style={style}>{actionButtonsRight}</span>
                </span>
            };

            return null;
        };
    };

    export const Actions: any = ReactRedux.connect($Actions.props, null)($Actions);
   
    export class Nivel extends Composite implements INivel {
        constructor(entidad: any, padre: any, raiz: any) {
            super(entidad, padre, raiz, NodoType.NIVEL);
        };
        formatter(item: INode, props: INodeProps): JSX.Element {
            let lineThroughStyle: string = "none"; 
            let color: string = ""; 
            if (item.entidad.Tarea.EstatusAvance) {
                lineThroughStyle = "line-through";
                color = "#b9b7b7";
            }
            return <div>
                <span className="wbs-node-name" style={{ textDecoration: lineThroughStyle, color: color }}>{item.entidad.Nombre}</span>
                <span className="wbs-node-name "><span style={{ margin: "2px", fontSize: "10px", fontFamily: "poppins", color: "#cac6c6" }}>( Inicia {EK.Modules.SGP.Pages.Dashboard.onDisplayDateShort(item.entidad.Tarea.FechaEstimadaInicio, item.entidad.Tarea.FlujoAvance.Clave)} -> Termina {EK.Modules.SGP.Pages.Dashboard.onDisplayDateShort(item.entidad.Tarea.FechaEstimadaFin, item.entidad.Tarea.FlujoAvance.Clave)} )</span></span>
                <span className="wbs-node-importe">
                    {item.entidad.Tarea.Contemplaravance ?
                        <EK.Modules.SGP.Pages.Tareas.ProgressBarSgpViewSmall id={"AvanceTarea"} value={item.entidad.Importe} />
                        : null}
                </span>
                <Actions
                    id={props.id}
                    idForm={props.idForm}
                    idFormSection={props.idFormSection}
                    item={item}
                    className="pull-right"
                    style={{ paddingRight: 5 }}
                    actions={[$Actions.priority, $Actions.addSubLevel, $Actions.delete, $Actions.addComments, $Actions.pause, $Actions.addFiles, $Actions.userAssigned, $Actions.adminAdvanced, $Actions.workflow, $Actions.edit, $Actions.play, $Actions.GanttIcon]} />
            </div>
        };
        mapFormToEntity = (form: global.EditForm): any => {
            let retValue: any = form
                .addID()
                .addNombre()
                .addDescripcion()
                .addObject("TipoNivel")
                .addObject("NivelPresupuesto")
                .addObject("TipoAvance")
                .addNumber("Factor")
                .addEstatus()
                .addVersion()
                .toObject();

            return retValue;
        };
    };

    export class NodoCollapse extends React.Component<INodeProps, INodeState>{
        constructor(props: INodeProps) {
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
        render(): JSX.Element {
            if (this.props.collapsible !== true) {
                return null;
            };

            let className: string = "";

            if (this.state.collapsed === true) {
                className += "collapsed fas " + this.props.expandIcon;
            } else {
                className += "expanded fas " + this.props.collapseIcon;
            };

            let id: string = this.props.id + "-collapse-" + this.props.item.codigo.join("-");
            if (this.props.item.children.length <= 0) {
                return <span id={id} className="wbs-button-icon">&nbsp;</span>
            }
            return <span id={id} className="wbs-button-icon"><i className={className} onClick={this.onClick.bind(this)}></i></span>
        };
    };


    /* ****************************************** TERMINA CLASES ****************************************** */

    /* ****************************************** INICIA FUNCIONES ****************************************** */

    export const hasChanged: (obj1: any, obj2: any) => boolean = (obj1: any, obj2: any): boolean => {
        try {
            if (obj1 && obj2) {
                let v1: any = global.assign({}, obj1.entidad);
                let v2: any = global.assign({}, obj2.entidad);

                if (v1.ID && v2.ID) {
                    return v1.ID !== v2.ID;
                } else {
                    if (!v1.ID && !v2.ID) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                if (!obj1 && !obj2) {
                    return false;
                } else {
                    return true;
                }
            }
        } catch (e) {
            return true;
        }
    };
    export const deserialize = (data: any, padre: any, raiz: any): INode => {
        let retValue: INode;

        if (data) {
            switch (data.Type) {
                case "RAIZ": retValue = new Raiz(data); break;
                case "NIVEL": retValue = new Nivel(data, padre, raiz); break;
                default: retValue = new Node(data, padre, raiz, null); break;
            };

            if (!raiz && retValue.type === NodoType.RAIZ) {
                raiz = retValue;
            };

            if (retValue instanceof Composite) {
                let children: any[] = data.Children;
                if (children && children.length > 0) {
                    children.forEach((child) => {
                        let item: any = deserialize(child, retValue, raiz);
                        let padre: IComposite = retValue as IComposite;
                        padre.add(item);
                    });
                }
            }
        };

        return retValue;
    };

    export const ___deserialize = (data: any, padre: any, raiz: any): INode => {
        let retValue: INode;

        if (data) {
            switch (data.Type) {
                default: retValue = new Node(data, padre, raiz, null); break;
            }
        };

        return retValue;
    };

    export const areEqual: (obj1: any, obj2: any) => boolean = (obj1: any, obj2: any): boolean => {
        let retValue: boolean = false;

        obj1 = obj1 ? obj1 : {};
        obj2 = obj2 ? obj2 : {};

        if (obj1 && obj2) {
            if (obj1.entidad && obj2.entidad) {
                if (obj1.entidad.ID && obj2.entidad.ID) {
                    if (obj1.entidad.ID === obj2.entidad.ID) {
                        retValue = true;
                    }
                }
            }
        };

        return retValue;
    };

    /* ****************************************** TERMINA FUNCIONES ****************************************** */

    interface IModalNewNodeSGPProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        saveTarea?: global.DataElement;
        proyectoSeleccionado?: global.DataElement;
        form?: any;
    };


    let ModalNewNodeSGP: any = global.connect(class extends React.Component<IModalNewNodeSGPProps, {}> {
        constructor(props: IModalNewNodeSGPProps) {
            super(props);
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalNewNodeSGPProps = {};
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            saveTarea: state.global["catalogo$" + TASK_NEW],
            proyectoSeleccionado: state.global["catalogo$" + PROYECTO_SELECCIONADO],
            form: Forms.getForm(SECTION_FORM_NEWTASK),
        });

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});

        shouldComponentUpdate(nextProps: IModalNewNodeSGPProps, nextState: IModalNewNodeSGPProps): boolean {
            return global.hasChanged(this.props.form.Type, nextProps.form.Type) ||
                global.hasChanged(this.props.saveTarea, nextProps.saveTarea);
        };

        onSaveTarea(): void {
            if (!Forms.isValid(SECTION_FORM_NEWTASK)) {
                warning("Verificar los campos obligatorios");
                return;
            }
            let tipoNodo: any;

            tipoNodo = Forms.getValue("Type", SECTION_FORM_NEWTASK);

            let proyecto: any = getData(this.props.proyectoSeleccionado);
            switch (tipoNodo) {
                case "tareas":
                    let _itemTarea: EditForm = Forms.getForm(SECTION_FORM_NEWTASK);
                    let _modelTarea: any = _itemTarea
                        .addID()
                        .addClave()
                        .addNombre()
                        .addObject("Padre")
                        .addEstatus()
                        .addDate("FechaInicio")
                        .addBoolean("PresentacionGantt")
                        .addBoolean("Contemplaravance")
                        .addString("Type")
                        .addDate("FechaFin")
                        .addDescripcion()
                        .addVersion()
                        .toObject();
                    if (proyecto && proyecto.ID) {
                        _modelTarea["IdProyecto"] = proyecto.ID;
                    }
                    global.dispatchAsyncPut("global-page-data", "base/sgp/wbs/Get/SaveWBS", _modelTarea, TASK_NEW);
                    break;
                case "grupos":
                    let _itemGrupo: EditForm = Forms.getForm(SECTION_FORM_NEWTASK);
                    let _modelGrupo: any = _itemGrupo
                        .addID()
                        .addClave()
                        .addNombre()
                        .addObject("Padre")
                        .addEstatus()
                        .addBoolean("PresentacionGantt")
                        .addBoolean("Contemplaravance")
                        .addString("Type")
                        .addDescripcion()
                        .addVersion()
                        .toObject();
                    if (proyecto && proyecto.ID) {
                        _modelGrupo["IdProyecto"] = proyecto.ID;
                    }
                    global.dispatchAsyncPut("global-page-data", "base/sgp/wbs/Get/SaveWBS", _modelGrupo, TASK_NEW);
                    break;
                default:
                    return null;
            }
        };

        componentDidUpdate(prevProps: IModalNewNodeSGPProps, prevState: IModalNewNodeSGPProps): any {
            if (this.props.saveTarea && wasUpdated(prevProps.saveTarea, this.props.saveTarea, false)) {
                let items: any = getData(this.props.saveTarea);
                switch (items.Estado) {
                    case 4: // eliminado con exito
                        break;
                    default:
                        global.success("Agregado Correctamente");
                        dispatchSuccessful("global-page-data", items, "WBSNODE");
                        this.onClose();
                        break;
                }
            }
        };

        onClose(): void {
            global.closeSidebar(SIDEBAR_NAME);
            Forms.remove(SECTION_FORM_NEWTASK);
        };

        render(): JSX.Element {
            let proyecto: any = getData(this.props.proyectoSeleccionado);
            let formulario: any = this.props.form;
            let state: DataElement = this.props.config.getState();
            let nombreProyecto: any = proyecto.Nombre ? proyecto.Nombre : "";

            return <Sidebar id={SIDEBAR_NAME} onClose={this.onClose}>
                <div>
                    <span style={{ paddingRight: 10, paddingBottom: 10 }}>
                        <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{nombreProyecto}</h6>
                    </span>
                </div>
                {formulario.Type == "tareas" ? <TaskFields /> : null}
                {formulario.Type == "grupos" ? <GroupFields /> : null}
                {global.isUpdating(this.props.saveTarea) ?
                    <div style={{ float: "right" }}>
                        <div style={{ position: "relative" }}><AwesomeSpinner paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} /></div>
                        <div ><button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red">Cerrar</button></div>
                    </div> :
                    <div style={{ float: "right" }}>
                        {global.getData(state).viewMode === true ? <Button size={[2, 2, 2, 2]} className="btn btn-md btn-editing" style={{ backgroundColor: "#8bc780", color: "#FFFFFF" }} icon="fa fa-check" onClick={this.onSaveTarea.bind(this)}>Agregar</Button> : null}
                        <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red">Cerrar</button>
                    </div>
                }
            </Sidebar>
        }
    });


    class TaskFields extends React.Component<IModalNewNodeSGPProps, IModalNewNodeSGPProps>{
        render(): JSX.Element {
            return <page.OptionSection
                id={SECTION_FORM_NEWTASK}
                level={1}
                subTitle={"Nueva Tarea"}
                icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                <div>
                    <input.Clave size={[12, 12, 12, 12]} maxLength={50} validations={[validations.required()]} idFormSection={SECTION_FORM_NEWTASK} />
                    <input.Nombre size={[12, 12, 12, 12]} maxLength={150} validations={[validations.required()]} idFormSection={SECTION_FORM_NEWTASK} />
                    <DatePicker id="FechaInicio" type="date" size={[12, 12, 12, 12]} validations={[validations.required(), validations.lessEqualThan("FechaFin", "")]} label="Fecha Inicio" idFormSection={SECTION_FORM_NEWTASK} />
                    <DatePicker id="FechaFin" type="date" size={[12, 12, 12, 12]} validations={[validations.required(), validations.greaterEqualThan("FechaInicio", "")]} label="Fecha Fin" idFormSection={SECTION_FORM_NEWTASK} />
                    <checkBox.Status checkedLabel="Presentación Gantt" id="PresentacionGantt" idFormSection={SECTION_FORM_NEWTASK} size={[6, 6, 6, 6]} value={true} />
                    <checkBox.Status checkedLabel="Contemplar avance" id="Contemplaravance" idFormSection={SECTION_FORM_NEWTASK} size={[6, 6, 6, 6]} value={true} />
                    <TextArea id="Descripcion" rows={2} size={[12, 12, 12, 12]} idFormSection={SECTION_FORM_NEWTASK} />
                </div>
            </page.OptionSection>
        };
    };

    class GroupFields extends React.Component<IModalNewNodeSGPProps, IModalNewNodeSGPProps>{
        render(): JSX.Element {
            return <page.OptionSection
                id={SECTION_FORM_NEWTASK}
                level={1}
                subTitle={"Nuevo Grupo"}
                icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                <div>
                    <input.Clave size={[12, 12, 12, 12]} maxLength={50} validations={[validations.required()]} idFormSection={SECTION_FORM_NEWTASK} />
                    <input.Nombre size={[12, 12, 12, 12]} maxLength={150} validations={[validations.required()]} idFormSection={SECTION_FORM_NEWTASK} />
                    <checkBox.Status checkedLabel="Presentación Gantt" id="PresentacionGantt" idFormSection={SECTION_FORM_NEWTASK} size={[6, 6, 6, 6]} value={true} />
                    <checkBox.Status checkedLabel="Contemplar avance" id="Contemplaravance" idFormSection={SECTION_FORM_NEWTASK} size={[6, 6, 6, 6]} value={true} />
                    <TextArea id="Descripcion" rows={2} size={[12, 12, 12, 12]} idFormSection={SECTION_FORM_NEWTASK} />
                </div>
            </page.OptionSection>
        };
    };

}