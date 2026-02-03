namespace EK.Modules.SCCO.Pages.Presupuestos.WBS {
    "use strict";

    interface IWBSTreeViewProps extends App.Components.IWBSNodoProps {
        id?: string;
        idForm?: string;
        idFormSection?: string;
        hasChanged?: boolean;
        timestamp?: number;
        treeHeader?: any;
        value?: any;
    };

    interface IWBSTreeViewState {
        selectedItem?: App.Interfaces.IWBSNodo;
    };

    class WBSTreeView extends React.Component<IWBSTreeViewProps, IWBSTreeViewState>{
        constructor(props: IWBSTreeViewProps) {
            super(props);
            //
            this.getNodeProperties = this.getNodeProperties.bind(this);
            this.onNodeClick = this.onNodeClick.bind(this);
            this.onNodeUpdate = this.onNodeUpdate.bind(this);
            //
            this.state = {};
        };
        static defaultProps: IWBSTreeViewProps = {
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
        getNodeProperties(): App.Components.IWBSNodoProps {
            let retValue: App.Components.IWBSNodoProps = {
                id: this.props.id,
                item: this.props.item,
                idForm: this.props.idForm,
                idFormSection: this.props.idFormSection,
                itemChildren: this.props.itemChildren,
                itemConfig: this.props.itemConfig,
                selectedItem: this.props.selectedItem,
                collapseIcon: this.props.collapseIcon,
                expandIcon: this.props.expandIcon,
                checkedIcon: this.props.checkedIcon,
                uncheckedIcon: this.props.uncheckedIcon,
                codeSeparator: this.props.codeSeparator,
                collapsible: this.props.collapsible,
                checkable: this.props.checkable,
                selectable: this.props.selectable,
                actionState: this.props.actionState,
                formatter: this.props.formatter,
                processData: this.props.processData,
                processChildren: this.props.processChildren,
                onNodeClick: this.props.onNodeClick,
                onNodeCheck: this.props.onNodeCheck,
                onNodeToggle: this.props.onNodeToggle,
                onNodeUpdate: this.props.onNodeUpdate
            };

            return retValue;
        };
        onNodeClick(item: App.Interfaces.IWBSNodo): void {
            if (this.props.onNodeClick) {
                this.props.onNodeClick(item);
            } else {
                this.setState(global.assign(this.state, { selectedItem: item }));
            };
        };
        onNodeUpdate(item: App.Interfaces.IWBSNodo): void {
            if (this.props.onNodeUpdate) {
                this.props.onNodeUpdate(item);
            } else {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                let values: any = Forms.getValue(this.props.id, idForm);
                //
                let items: App.Interfaces.IWBSNodo = App.deserialize(values, null, null);
                if (items) {
                    let updated: boolean = items.update(item);
                    if (updated === true) {
                        items.calculate();
                        //
                        Forms.updateFormElement(idForm, this.props.id, items.serialize());
                    };
                };
            };
        };
        shouldComponentUpdate(nextProps: IWBSTreeViewProps, nextState: IWBSTreeViewState): boolean {
            let thisItem: any = this.props.onNodeClick ? this.props.selectedItem : this.state.selectedItem;
            let nextItem: any = this.props.onNodeClick ? nextProps.selectedItem : nextState.selectedItem;

            if (global.hasChanged(this.props.actionState, nextProps.actionState)) {
                return true;
            };

            if (App.hasChanged(thisItem, nextItem) === true) {
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

            let raiz: App.Interfaces.IWBSNodo = App.deserialize(this.props.value, null, null);
            if (raiz) {
                let formControlId: string;

                if (!this.props.id) {
                    let d: any = new Date();
                    formControlId = "formControl_" + Number(d).toString();
                } else {
                    formControlId = "formControl_" + this.props.id;
                };

                let key: string = "nodo$root";
                let nodeProps: App.Components.IWBSNodoProps = this.getNodeProperties();
                nodeProps.index = 0;
                nodeProps.key = key;
                nodeProps.onNodeClick = this.onNodeClick.bind(this);
                nodeProps.onNodeUpdate = this.onNodeUpdate.bind(this);
                nodeProps.selectedItem = nodeProps.onNodeClick ? nodeProps.selectedItem : this.state.selectedItem;

                return <div className="wbs-container">
                    <div className="wbs-treeview">
                        <ul className="wbs-list" id={formControlId} name={formControlId}>
                            {React.cloneElement(raiz.node(nodeProps), { key })}
                        </ul>
                    </div>
                </div>
            };

            return null;
        };
    };

    class WBSTreeViewForm extends React.Component<IWBSTreeViewProps, IWBSTreeViewProps>{
        constructor(props: IWBSTreeViewProps) {
            super(props);
            this.processChildren = this.processChildren.bind(this);
        };
        processChildren(item: any, children: any[]): any {
            let retValue: any[] = children ? children : [];
            //
            let selectedItem = this.props.selectedItem;
            if (selectedItem) {
                if (selectedItem.entidad && selectedItem.entidad._nuevo === true) {
                    let parentItem = selectedItem.padre;
                    if (parentItem) {
                        let areEqual: boolean = parentItem.isEqual(item);
                        if (areEqual === true) {
                            retValue = [...retValue, new App.WBSBlank(selectedItem.entidad, item, selectedItem.raiz, null)];
                        }
                    }
                }
            };
            //
            return retValue;
        };
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (idForm) {
                let element: any = EK.Global.assign(this.props, Forms.getFormElement(idForm, this.props));

                return <WBSTreeView {...element} processChildren={this.processChildren} />
            };

            return null;
        };
    };

    export let WBSTreeView$Form: any = ReactRedux.connect(Forms.props, null)(WBSTreeViewForm);

    interface IWBSTreeViewSectionProps extends grid.IColumn, IWBSTreeViewProps {
        //allowCollapse?: boolean;
        //allowExpand?: boolean;
        //allowDelete?: boolean;
        //allowAddCard?: boolean;
        //allowAddLevel?: boolean;
        className?: string;
        config?: page.IPageConfig;
        //maxLevel?: number;
        //minLevel?: number;
        //title?: any;
        style?: React.CSSProperties;
    };

    class $WBSTreeViewSection extends React.Component<IWBSTreeViewSectionProps, IWBSTreeViewSectionProps>{
        constructor(props: IWBSTreeViewSectionProps) {
            super(props);
            //
            this.onNodeClick = this.onNodeClick.bind(this);
            this.getColumnProperties = this.getColumnProperties.bind(this);
            this.getTreeViewProperties = this.getTreeViewProperties.bind(this);
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            idForm: getData(state.global.page).id
        });
        static defaultProps: IWBSTreeViewSectionProps = {
            //allowCollapse: true,
            //allowExpand: true,
            //allowDelete: true,
            //allowAddCard: true,
            //allowAddLevel: true,
            className: "",
            //maxLevel: 2,
            //minLevel: 1,
            //title: null
        };
        getTreeViewProperties(): IWBSTreeViewProps {
            let retValue: IWBSTreeViewProps = {
                id: this.props.id,
                idForm: this.props.idForm,
                idFormSection: this.props.idFormSection,
                onNodeCheck: this.props.onNodeCheck,
                onNodeClick: this.props.onNodeClick,
                onNodeToggle: this.props.onNodeToggle,
                treeHeader: this.props.treeHeader
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
        onNodeClick(item: any): void {
            global.dispatchSuccessful("global-page-entity", item, this.props.id);
        };
        render(): JSX.Element {
            let selectedItem: App.Interfaces.IWBSNodo;
            let columnProperties: grid.IColumn = this.getColumnProperties();
            let treeViewProperties: IWBSTreeViewProps = this.getTreeViewProperties();
            let itemConfig: App.Interfaces.IWBSConfig = App.getWBSConfig(this.props.id);
            let actionState = this.props.config.getState(this.props.id);
            //
            let item: DataElement = this.props.config.getEntity(this.props.id);
            if (item && global.isSuccessful(item)) {
                selectedItem = global.getData(item);
            };
            //
            return <Column {...columnProperties}>
                <page.OptionSection
                    id={App.PAGE_TREEVIEW_ID}
                    icon="fa fa-boxes fa-3x"
                    collapsed={false}
                    level={1}
                    hideCollapseButton={false}>
                    <Row style={{ marginTop: -5, marginBottom: -5 }}>
                        {this.props.treeHeader}
                        <WBS.WBSTreeView$Form {...treeViewProperties}
                            actionState={actionState}
                            onNodeClick={this.onNodeClick}
                            checkable={false}
                            collapseIcon="fa-chevron-down"
                            expandIcon="fa-chevron-right"
                            selectedItem={selectedItem}
                            itemConfig={itemConfig}/>
                    </Row>
                </page.OptionSection>
            </Column>
        };
    };

    export const WBSTreeViewSection: any = ReactRedux.connect($WBSTreeViewSection.props, null)($WBSTreeViewSection);

    interface IWBSSidebarProps extends React.Props<any> {
        id: string;
        config?: page.IPageConfig;
        entity?: global.DataElement;
        idForm?: string;
        idFormSection?: string;
        onSave?: () => void;
        onClose?: () => void;
    };

    class WBSSidebar extends React.Component<IWBSSidebarProps, {}>{
        constructor(props: IWBSSidebarProps) {
            super(props);
            this.onClose = this.onClose.bind(this);
            this.onSave = this.onSave.bind(this);
            this.assignid = this.assignid.bind(this);
        };
        componentDidMount(): void {
            let $id: string = ["sb", this.props.id].join("$");
            global.closeSidebar($id);
        };
        onClose(): void {
            if (this.props.onClose) {
                this.props.onClose();
            } else {
                let $idForm: string = ["form", this.props.id].join("$");
                let $id: string = ["sb", this.props.id].join("$");
                //
                Forms.remove($idForm);
                //
                global.dispatchDefault("global-page-entity", {}, this.props.id);
                global.closeSidebar($id);
            };
        };
        assignid(item: App.Interfaces.IWBSNodo, idObj: any): any {
            if (item.entidad) {
                if (!(item.entidad.ID && item.entidad.ID > 0)) {
                    item.entidad.ID = idObj.id--;
                };
                //
                if (item.entidad._nuevo === true) {
                    item.entidad._nuevo = undefined;
                };
            };
            //
            if (item instanceof App.WBSComposite) {
                if (item.children) {
                    item.children.forEach((child) => {
                        child = this.assignid(child, idObj);
                    });
                };
            };
            //
            return item;
        };
        onSave(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (this.props.onSave) {
                this.props.onSave();
            } else {
                let item = global.getData(this.props.entity) as App.WBSNodo;
                if (item) {
                    let treeData: any = Forms.getValue(this.props.id, idForm);
                    let treeView: App.Interfaces.IWBSNodo = App.deserialize(treeData, null, null);
                    if (treeView) {
                        let $idForm: string = ["form", this.props.id].join("$");
                        //
                        if (!Forms.isValid($idForm)) {
                            global.warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                            return;
                        };
                        //
                        if (item.beforeSave) {
                            let entidad: any = Forms.getValues($idForm);
                            if (!item.beforeSave(entidad, this.props.config)) {
                                return;
                            };
                        };
                        //
                        let isNew: boolean = (item.entidad._nuevo === true);
                        let idObj: any = global.assign({ id: treeView.getLowerId() - 1 });
                        //
                        let form: global.EditForm = Forms.getForm($idForm);
                        item.entidad = global.assign(item.entidad, item.mapFormToEntity(form));
                        item = this.assignid(item, idObj);
                        //
                        if (isNew === true) {
                            let parent = item.padre as App.Interfaces.IWBSComposite;
                            if (parent) {
                                parent.add(item);
                                //
                                treeView.update(parent);
                            };
                        } else {
                            treeView.update(item);
                        };
                        //
                        treeView.calculate();
                        //
                        Forms.updateFormElement(idForm, this.props.id, treeView.serialize());
                        //
                        global.dispatchSuccessful("global-page-entity", item, this.props.id);
                        //
                        let $id: string = ["sb", this.props.id].join("$");
                        //
                        global.closeSidebar($id);
                    };
                };
            };
        };
        render(): JSX.Element {
            let $id: string = ["sb", this.props.id].join("$");
            let $idForm: string = ["form", this.props.id].join("$");
            let pageEdit: any;
            let pageIcon: string = "fas fa-pencil";
            let pageTitle: string;
            //
            if (this.props.entity && global.isSuccessful(this.props.entity)) {
                let item: App.Interfaces.IWBSNodo = global.getData(this.props.entity);
                if (item) {
                    let d: any = new Date();
                    //
                    pageEdit = React.cloneElement(item.edit({ item, idForm: $idForm }), { key: "sb_page_" + Number(d).toString() });
                    pageTitle = item.getProperty("Nombre");
                };
            };
            //
            return <Sidebar id={$id} onClose={this.onClose}>
                <div className="c-sidebar-scco-wbs-title">
                    <i className={pageIcon}></i>
                    <span>{pageTitle}</span>
                </div>
                <div className="c-sidebar-scco-page">{pageEdit}</div>
                <div className="c-sidebar-scco-buttons">
                    <Row>
                        <Column size={[12, 12, 12, 12]} style={{ marginTop: 12, textAlign: "right" }}>
                            <button type="button" className="btn btn-sm btn-outline red" onClick={this.onClose} style={{ marginRight: 10 }}> Cancelar </button>
                            <button type="button" className="btn btn-sm btn-outline green" onClick={this.onSave}> Guardar </button>
                        </Column>
                    </Row>
                </div>
            </Sidebar>
        };
    };

    class WBSSidebarForm extends React.Component<IWBSSidebarProps, IWBSSidebarProps>{
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        render(): JSX.Element {
            let entity: DataElement = this.props.config.getEntity(this.props.id);

            return <WBSSidebar {...this.props} entity={entity} />;
        };
    };

    export const WBSSidebar$Form: any = ReactRedux.connect(WBSSidebarForm.props, null)(WBSSidebarForm);

    //interface IWBSEditorProps extends React.Props<any>, grid.IColumn {
    //    id?: string;
    //    idForm?: string;
    //    item?: DataElement;
    //    allowSave?: boolean;
    //    allowCancel?: boolean;
    //    className?: string;
    //    config?: page.IPageConfig;
    //    onSave?: () => void;
    //    onCancel?: () => void;
    //    style?: React.CSSProperties;
    //};

    //class WBSEditor extends React.Component<IWBSEditorProps, IWBSEditorProps>{
    //    static defaultProps: IWBSEditorProps = {
    //        id: "",
    //        idForm: "",
    //        item: undefined,
    //        className: "",
    //        allowSave: true,
    //        allowCancel: true
    //    };
    //    shouldComponentUpdate(nextProps: IWBSEditorProps, { }): boolean {
    //        return global.hasChanged(this.props.item, nextProps.item);
    //    };
    //    render(): JSX.Element {
    //        let optionIcon: string;
    //        let optionSubTitle: any;
    //        let entityComponent: any;
    //        //
    //        if (this.props.item && global.isSuccessful(this.props.item)) {
    //            let item = global.getData(this.props.item) as App.Interfaces.IWBSNodo;
    //            if (item) {
    //                let WrappedComponent: any = App.Components.WrapForm(item.edit);
    //                if (WrappedComponent) {
    //                    let idForm: string = [this.props.id, "form"].join("$");

    //                    entityComponent = <WrappedComponent idForm={idForm} item={item} />
    //                };

    //                optionIcon = "fas fa-pencil";

    //                if (item.tipo === "O") {
    //                    optionSubTitle = "Obra";
    //                } else if (item.tipo === "N") {
    //                    optionSubTitle = "Nivel";
    //                } else if (item.tipo === "T") {
    //                    optionSubTitle = "Tarjeta";
    //                } else if (item.tipo === "I") {
    //                    optionSubTitle = "Insumo";
    //                };

    //                if (item.entidad && item.entidad._nuevo === true) {
    //                    optionSubTitle = "Agregar " + optionSubTitle;
    //                } else {
    //                    optionSubTitle = "Editar " + optionSubTitle;
    //                };
    //            };
    //        } else {
    //            optionIcon = "fas fa-pencil";
    //            optionSubTitle = "Presupuesto";
    //            entityComponent = <Row>
    //                <Column size={[12, 12, 12, 12]}>
    //                    <span className="wbs-node-default">Seleccione un elemento</span>
    //                </Column>
    //            </Row>;
    //        };
    //        //
    //        let onSave: () => any = this.props.onSave;
    //        if (!onSave) {
    //            onSave = () => {
    //                let item = global.getData(this.props.item) as App.WBSNodo;
    //                if (item) {
    //                    let data: any = Forms.getValue(this.props.id, this.props.idForm);
    //                    let items: App.Interfaces.IWBSNodo = App.deserialize(data, null, null);
    //                    if (items) {
    //                        let idForm: string = [this.props.id, "form"].join("$");
    //                        //
    //                        if (!Forms.isValid(idForm)) {
    //                            global.warning("Los datos están incompletos, verificar campos requeridos y validaciones");
    //                            return;
    //                        };
    //                        //
    //                        if (item.beforeSave) {
    //                            if (!item.beforeSave(this.props.config)) {
    //                                return;
    //                            };
    //                        };
    //                        //
    //                        let form: global.EditForm = Forms.getForm(idForm);
    //                        let entidad: any = item.mapFormToEntity(form);
    //                        if (entidad) {
    //                            if (!(entidad.ID > 0)) {
    //                                if (!(entidad && entidad.ID)) {
    //                                    entidad.ID = items.getLowerId() - 1;
    //                                };
    //                            };
    //                            //
    //                            item.entidad = global.assign(item.entidad, entidad);
    //                            //
    //                            if (item.entidad._nuevo === true) {
    //                                item.entidad._nuevo = undefined;

    //                                let itemParent = item.padre as App.Interfaces.IWBSComposite;
    //                                if (itemParent) {
    //                                    itemParent.add(item);

    //                                    items.update(itemParent);
    //                                }
    //                            } else {
    //                                items.update(item)
    //                            };
    //                            //
    //                            items.calculate();
    //                            //
    //                            Forms.updateFormElement(this.props.idForm, this.props.id, items.serialize());
    //                            //
    //                            global.dispatchSuccessful("global-page-entity", item, this.props.id);
    //                        }
    //                    }
    //                }
    //            }
    //        };
    //        //
    //        let onCancel: () => any = this.props.onCancel;
    //        if (!onCancel) {
    //            onCancel = () => {
    //                let idForm: string = [this.props.id, "form"].join("$");
    //                Forms.remove(idForm);
    //                //
    //                global.dispatchDefault("global-page-entity", {}, this.props.id);
    //            }
    //        };
    //        //
    //        let allowCancel: boolean = false;
    //        let allowSave: boolean = false;
    //        //
    //        if (this.props.item && global.isSuccessful(this.props.item)) {
    //            allowCancel = this.props.allowCancel;
    //            allowSave = this.props.allowSave;
    //        };
    //        //
    //        return <Column
    //            size={this.props.size}
    //            style={this.props.style}>
    //            <page.OptionSection
    //                subTitle={optionSubTitle}
    //                icon={optionIcon}
    //                collapsed={false}
    //                level={1}>
    //                <SectionButtons>
    //                    <WBSSaveButton onClick={onSave} visible={allowSave} />
    //                    <WBSCancelButton onClick={onCancel} visible={allowCancel} />
    //                </SectionButtons>
    //                {entityComponent}
    //            </page.OptionSection>
    //        </Column>
    //    };
    //};

    //class WBSEditorForm extends React.Component<IWBSEditorProps, IWBSEditorProps>{
    //    static props: any = (state: any) => ({
    //        config: global.createPageConfigFromState(state.global)
    //    });
    //    render(): JSX.Element {
    //        let idForm: any = this.props.idForm ? this.props.idForm : this.props.config.id;
    //        let item: global.DataElement;

    //        if (this.props.id) {
    //            item = this.props.config.getEntity(this.props.id);
    //        };

    //        return <WBSEditor {...this.props} idForm={idForm} item={item} />
    //    };
    //};

    //export const WBSEditor$Form: any = ReactRedux.connect(WBSEditorForm.props, null)(WBSEditorForm);

    //class WBSSaveButton extends React.Component<buttons.IButtonProps, buttons.IButtonProps> {
    //    static defaultProps: buttons.IButtonProps = {
    //        icon: "fa fa-check",
    //        text: "",
    //        color: "white",
    //        className: "btn-ico-ek",
    //        iconOnly: true,
    //        inverse: false,
    //        buttonSize: "sm",
    //        visible: true,
    //        info: undefined
    //    };
    //    render(): JSX.Element {
    //        return <Button keyBtn="btnWBSSave" {...this.props} />
    //    };
    //};

    //class WBSCancelButton extends React.Component<buttons.IButtonProps, buttons.IButtonProps> {
    //    static defaultProps: buttons.IButtonProps = {
    //        icon: "fa fa-times",
    //        text: "",
    //        color: "white",
    //        className: "btn-ico-ek",
    //        iconOnly: true,
    //        inverse: false,
    //        buttonSize: "sm",
    //        visible: true,
    //        info: undefined
    //    };
    //    render(): JSX.Element {
    //        return <Button keyBtn="btnWBSCancel" {...this.props} />
    //    };
    //};
};