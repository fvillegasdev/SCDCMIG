// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.Modules.SCV.Pages.SCVEsquemas {
    "use strict";
    const PAGE_ID: string = "esquemas";

    export interface INestableListProps extends React.Props<any> {
        formatter?: (index: number, item: any, values?: any) => JSX.Element;
        items?: any[] | DataElement;
        url?: string;
        onChange?: (items: any[]) => void;
        itemClass?: string;
        readonly?: boolean;
        addRemoveButton?: boolean;
        listEmpty?: JSX.Element | Function;
        listHeader?: JSX.Element;
        listFooter?: any;
        aggregate?: (item?: any, values?: any) => any;
        childrenPropertyName?: string;
        dragAndDrop?: boolean;
        onItemClick?: (item: any) => void;
        onRemoveNestedItem?: (item: any) => void;
    }

    interface INestableItemProps extends React.Props<any> {
        formatter?: (index: number, item: any) => JSX.Element;
        onRemoveItem?: (index: number, item: any) => void;
        index: number;
        item: any;
        itemClass?: string;
        readonly?: boolean;
        dragAndDrop?: boolean;
        addRemoveButton?: boolean;
        children?: any[];
        values?: any;
        onItemClick?: (item: any) => void;
        onClickButton?: (item: any) => void;
        onRemoveNestedItem?: (item: any) => void;
    }

    export class NestableItem extends React.Component<INestableItemProps, INestableItemProps> {
        constructor(props: INestableItemProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
            this.onClickButton = this.onClickButton(this);
        }
        refs: {
            item: Element;
        };
        onClick(e: any): any {
            if (this.props.onItemClick) {
                this.props.onItemClick(this.props.item);
            }
        }
        onClickButton(e: any): any {
            if (this.props.onClickButton) {
                this.props.onClickButton(this.props.item);
            }
        }
        componentDidMount(): void {
            if (!this.props.readonly) {
                let item: any = $(this.refs.item);
                item.bind("click", (e: any) => {
                    e.stopPropagation();
                    if (this.props.onRemoveItem) {
                        this.props.onRemoveItem(this.props.index, this.props.item);
                    }
                });
                item.bind("mousedown", (e: any) => {
                    e.stopPropagation();
                });
            }
        }
        componentWillUnmount(): void {
            if (!this.props.readonly) {
                let item: any = $(this.refs.item);
                item.unbind();
            }
        }
        render(): JSX.Element {
            let fnFormatter: (index: number, item: any, values?: any) => JSX.Element =
                (this.props.formatter !== undefined ?
                    this.props.formatter :
                    (index: number, item: any, values?: any): JSX.Element => { return item.text; });

            let hasDataProp: boolean = this.props.item !== undefined;
            if (!this.props.readonly) {
                let removeElement: JSX.Element = <i ref="item" className="glyphicon glyphicon-remove tt-item-remove" style={{ float: "right" }}></i>;
                let className: string = "dd3-content";

                if (this.props.itemClass) {
                    className += " " + this.props.itemClass;
                };

                if (this.props.dragAndDrop === true) {
                    className += " dd-handle";
                };

                let listStyle: React.CSSProperties = {
                    display: "block", position: "relative", margin: 0, padding: 0, listStyle: "none"
                };

                return <li
                    className="dd-item dd3-item"
                    data-id={this.props.item.ID}
                    style={{ paddingBottom: 5, paddingTop: 5, border: "none" }}
                    onClick={this.onClick}>
                    <div className={className} style={{ padding: 5, height: "auto", border: "none", backgroundColor: "#EEEEEE" }}>
                        {hasDataProp ? fnFormatter(this.props.index, this.props.item, this.props.values) : this.props.children}
                        {this.props.addRemoveButton ? removeElement : null}
                    </div>
                    {this.props.children && this.props.children.length > 0 ? <ol className="dd-list" style={listStyle}>
                        {this.props.children}
                    </ol> : null}
                </li>;
            } else {
                return <li
                    className="mt-list-item"
                    data-id={this.props.item.ID}
                    style={{ cursor: "pointer", paddingBottom: 5, paddingTop: 5, border: "none" }}
                    onClick={this.onClick}>
                    {hasDataProp ? fnFormatter(this.props.index, this.props.item, this.props.values) : this.props.children}
                </li>;
            }
        }
    }

    export class NestableList extends React.Component<INestableListProps, INestableListProps> {
        constructor(props: INestableListProps) {
            super(props);
            this.listInit = this.listInit.bind(this);
        }
        static defaultProps: INestableListProps = {
            items: new DataElement(),
            formatter: (index: number, item: any): JSX.Element => {
                return item.text;
            },
            dragAndDrop: false,
            url: "",
            readonly: false,
            addRemoveButton: false
        };
        refs: {
            list: Element;
        };
        onRemoveItem:
        (index: number, item: any) => void =
        (index: number, item: any) => {
            let items: any;
            let propItems: any = this.props.items;

            if (this.props.onRemoveNestedItem) {
                this.props.onRemoveNestedItem(item);
            }
            else {
                if (propItems.data) {
                    items = {
                        data: propItems.data.splice(0),
                        timestamp: Number(new Date()),
                        status: propItems.status
                    };

                    items.data.splice(index, 1);
                } else {
                    items = propItems.splice(0);
                    items.splice(index, 1);
                }

                if (this.props.onChange) {
                    this.props.onChange(items);
                } else {
                    this.setState({
                        items: items
                    });
                }
            }
        }
        getItemId:
        (item: any) => number =
        (item: any): number => {
            if (item) {
                if (item.ID) return item.ID;
                if (item.Id) return item.Id;
                if (item.id) return item.id;
            }
            return undefined;
        }
        shouldComponentUpdate(nextProps: INestableListProps, nextState: INestableListProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }
        listInit(): void {
            if (!this.props.readonly) {
                let list: any = $(this.refs.list);

                list.nestable().on("change", (p, q) => {
                    p.stopPropagation();

                    let data: any[] = list.nestable("serialize");
                    let newData: any[] = [];
                    let items: any = this.props.items;
                    let listData: any[] = items && items.data ? items.data : items;

                    if (data && data.length > 0) {
                        data.forEach((itemData: any, index: number) => {
                            for (var i = 0; i < listData.length; i++) {
                                if (itemData.id === this.getItemId(listData[i])) {
                                    newData.push(EK.Global.assign({}, listData[i]));

                                    break;
                                };
                            };
                        });
                    }

                    if (this.props.onChange) {
                        this.props.onChange(newData);
                    } else {
                        this.setState({
                            items: newData
                        });
                    }
                });
            }
        }
        listDestroy(): void {
            let list: any = $(this.refs.list);

            list.nestable().off("change");
            list.nestable("destroy");
        }
        componentDidMount(): void {
            this.listInit();
        }
        componentWillUnmount(): void {
            this.listDestroy();
        }
        componentWillUpdate(nextProps: INestableListProps, nextState: any) {
            this.listDestroy();
        }
        componentDidUpdate(): void {
            this.listInit();
        }
        render(): JSX.Element {
            let items: any;
            let propItems: any = this.props.items;
            let listData: any[] = propItems && propItems.data ? propItems.data : this.props.items;
            let hasData: boolean = listData.length > 0;
            let values: any = {};

            if (hasData) {
                let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                    let retValue: any = (items === undefined || items === null) ? null :
                        items.map((item: any, i: number): any => {
                            let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                            let _children: any[] = null;
                            let cpn: string = this.props.childrenPropertyName;

                            if (cpn && item[cpn]) {
                                _children = fnCreateList(item[cpn]);
                            };

                            if (this.props.aggregate) {
                                values = this.props.aggregate(item, values);
                            };

                            return <NestableItem
                                key={itemKey}
                                index={i}
                                item={item}
                                values={EK.Global.assign({}, values)}
                                children={_children}
                                dragAndDrop={this.props.dragAndDrop}
                                formatter={this.props.formatter}
                                onRemoveItem={this.onRemoveItem}
                                itemClass={this.props.itemClass}
                                readonly={this.props.readonly}
                                onItemClick={this.props.onItemClick}
                                addRemoveButton={this.props.addRemoveButton} />;
                        });

                    return retValue;
                };

                items = fnCreateList(listData);
            }

            let empty: any;
            if (this.props.listEmpty && typeof this.props.listEmpty === "function") {
                empty = this.props.listEmpty(hasData);
            } else {
                empty = this.props.listEmpty;
            }

            let footer: any;
            if (this.props.listFooter && typeof this.props.listFooter === "function") {
                footer = this.props.listFooter(values);
            } else {
                footer = this.props.listFooter;
            }

            let listStyle: React.CSSProperties = {
                display: "block", position: "relative", margin: 0, padding: 0, listStyle: "none"
            };

            if (!this.props.readonly) {
                return <div key={this.props.key} className="dd" ref="list">
                    {this.props.listHeader}
                    <ol className="dd-list" style={listStyle}>
                        {items}
                        {empty}
                    </ol>
                    {footer}
                </div>;
            } else {
                return <div key={this.props.key} className="mt-element-list">
                    {this.props.listHeader}
                    <div className="mt-list-container list-news" style={{ paddingTop: 0, border: "none" }} ref="list">
                        <ul>
                            {items}
                        </ul>
                    </div>
                    {footer}
                </div>;
            }
        }
    }

    //interface para las propiedades comunes
    interface IBase extends React.Props<any> {
        editMode?: boolean;
        idEsquema?: number;
    }

    //interface del componente de niveles
    interface INivelesProps extends IBase {
        nivel?: any;
        niveles?: DataElement;
        sortable?: DataElement;
    }

    interface INivelesState {
        sorting?: boolean;
    }

    //dispatch para calcular los niveles segun el esquema
    const getNiveles: (id: number) => void = (id: number): void => {
        let encodedFilters: string = global.encodeObject({ idEsquema: id });
        dispatchAsync("scv-esquemas-niveles", "esquemas/niveles/all/" + encodedFilters);
    };

    //dispatch para establecer la etapa seleccionada
    const setCurrentEtapa: (item: any) => void = (item: any): void => {
        item = global.assign(item, {
            ID: item.Etapa ? item.Etapa.ID : null,
            Nombre: item.Etapa ? item.Etapa.Nombre : null
        });
        dispatchSuccessful("scv-esquemas-etapas-setCurrent", item/*{ ID: nextID, Nombre: nextNombre }*/);
    };

    export let Niveles: any = global.connect(class extends React.Component<INivelesProps, INivelesState>{
        constructor(props: INivelesProps) {
            super(props);
            this.onAddNew = this.onAddNew.bind(this);
            this.onClickAll = this.onClickAll.bind(this);
            this.onNestable = this.onNestable.bind(this);
            this.onChange = this.onChange.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onSave = this.onSave.bind(this);
            this.state = { sorting: false }
        }
        static props: any = (state: any) => ({
            nivel: state.esquemas.nivelSelected,
            niveles: state.esquemas.niveles,
            sortable: state.esquemas.sortable
        });
        static defaultProps: INivelesProps = {
            editMode: false
        }
        onClickAll(item: any): void {
            setCurrentEtapa({});
        }
        onAddNew(): void {
            let newId: number = 0;
            let siguiente: number = 0;
            let niveles: any[] = getData(this.props.niveles);

            niveles.forEach((value: any, index: number) => {
                if (value.ID <= 0) {
                    if (value.ID < newId) {
                        newId = value.ID;
                    };
                };
                if (value._eliminado !== true) {
                    siguiente++;
                };
            });
            newId--;

            let item = {
                ID: newId,
                Orden: siguiente + 1,
                IdEsquema: this.props.idEsquema,
                Etapas: []
            };

            if (this.props.niveles) {
                let items: any[] = getData(this.props.niveles.upsertItem(item));
                dispatchSuccessful("scv-esquemas-niveles", items);
            }
        }
        componentDidMount(): void {
            if (this.props.idEsquema > 0) {
                let encodedFilters: string = global.encodeObject({ idEsquema: this.props.idEsquema });
                dispatchAsync("scv-esquemas-niveles", "esquemas/niveles/all/" + encodedFilters);
            } else {
                dispatchDefault("scv-esquemas-niveles", []);
                //dispatchDefault("scv-esquemas-niveles-sortable", []);
            }

            dispatchSuccessful("scv-esquemas-niveles-setSelected", {});
            setCurrentEtapa({});
        }
        componentDidUpdate(prevProps: INivelesProps, prevState: INivelesState): void {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.nivel, this.props.nivel, false)) {
                let item: any = getData(this.props.nivel);
                if (item.Estado === 4) {
                    success("El nivel ha sido eliminado");
                }
                getNiveles(this.props.idEsquema);
            }

            if (global.wasUpdated(prevProps.sortable, this.props.sortable, false)) {
                success("El orden de los niveles fue actualizado");
                getNiveles(this.props.idEsquema);
                setCurrentEtapa({});
            }
        }
        shouldComponentUpdate(nextProps: INivelesProps, nextState: INivelesState): boolean {
            return hasChanged(this.props.niveles, nextProps.niveles) ||
                hasChanged(this.props.nivel, nextProps.nivel) ||
                hasChanged(this.props.sortable, nextProps.sortable) ||
                this.state.sorting !== nextState.sorting ||
                this.props.editMode !== nextProps.editMode;
        }
        onNestable(): void {
            let niveles: any[] = getData(this.props.niveles);
            let sortable: any[] = niveles.filter((nivel: any) => {
                let etapas: any[] = nivel.Etapas ? nivel.Etapas : [];
                let retValue: boolean = etapas.length ? true : false;
                return retValue;
            });

            dispatchSuccessful("scv-esquemas-niveles-sortable", sortable);
            this.setState({ sorting: true });
        }
        onChange(niveles: any): void {
            let items: any[] = [];
            if (niveles && niveles.length > 0) {
                niveles.forEach((value: any, index: number) => {
                    let item: any = EK.Global.assign({}, value);
                    item.Orden = index + 1;
                    items.push(item);
                });
            };

            dispatchSuccessful("scv-esquemas-niveles-sortable", items);
        }
        onSave(): void {
            let item = EK.Global.assign({}, {
                Niveles: getData(this.props.sortable)
            });

            dispatchAsyncPut("scv-esquemas-niveles-sortable", "esquemas/niveles/update", item);
        }
        onCancel(): void {
            dispatchDefault("scv-esquemas-niveles-sortable", []);
            this.setState({ sorting: false });
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let editMode: boolean = this.state.sorting;
            let sortable: () => boolean = (): boolean => {
                let data: any[] = global.isSuccessful(this.props.niveles) ? getData(this.props.niveles) : [];
                let retValue: boolean = data && data.length > 1 ? true : false;
                return retValue;
            };

            let niveles: any = this.props.niveles;
            let listData: any[] = niveles && niveles.data ? niveles.data : [];
            let listStyle: React.CSSProperties = {
                display: "block", position: "relative", margin: 0, padding: 0, listStyle: "none"
            };

            let items: any;
            let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                let retValue: any = (items === undefined || items === null) ? null :
                    items.map((item: any, index: number): any => {
                        let id: number = (item.ID !== undefined && item.ID !== null ? item.ID : index);
                        let key: string = "list-item-key-" + id;
                        let selectedKey: string = "etapas-selected-key-" + id;
                        let catalogoKey: string = "etapas-catalogo-key-" + id;
                        return <li key={key}>
                            <div style={{ padding: 5, paddingBottom: 0, height: "auto" }}>
                                <NivelForm
                                    {...this.props}
                                    index={index}
                                    item={item}
                                    selectedKey={selectedKey}
                                    catalogoKey={catalogoKey} />
                            </div>
                        </li>
                    });
                return retValue;
            }
            items = fnCreateList(listData);

            return this.props.editMode
                ? <page.OptionSection
                    title={"Etapas del Seguimiento"}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 5 }}>
                        {[listData.length].join("")}
                    </span>}
                    icon="fas fa-bars" collapsed={false} hideCollapseButton={true}
                    readOnly={false} level={1} editMode={editMode}>
                    <SectionButtons>
                        <Button iconOnly={true} visible={!editMode ? sortable() : false} className="font-white" onClick={this.onNestable} icon="fa fa-sort" />&nbsp;&nbsp;
                                <Button iconOnly={true} visible={!editMode} className="font-white" onClick={this.onClickAll} icon="fas fa-bars" />&nbsp;&nbsp;
                                <AddNewButton visible={!editMode} onClick={this.onAddNew} />
                    </SectionButtons>
                    <SectionView>
                        <PanelUpdate info={this.props.niveles}>
                            <div key={this.props.key}>
                                <ol style={listStyle}>{items}</ol>
                            </div>
                        </PanelUpdate>
                    </SectionView>
                    <SectionEdit onCancel={this.onCancel} onSave={this.onSave}>
                        <PanelUpdate info={this.props.sortable}>
                            <List
                                items={this.props.sortable}
                                readonly={false}
                                addRemoveButton={false}
                                dragAndDrop={true}
                                onChange={this.onChange}
                                formatter={(index: number, item: any) => {
                                    let etapas: any[] = item.Etapas ? item.Etapas : [];
                                    return <Row style={{ alignItems: "center", display: "flex" }}>
                                        <Column size={[2, 2, 2, 2]}>
                                            <div className={"tarea-list"}>{item.Orden}</div>
                                        </Column>
                                        <Column size={[10, 10, 10, 10]}>
                                            {
                                                etapas.map(n => n.Etapa)
                                                    .map((value: any, index: number, array: any[]) =>
                                                        <h6 key={index} className="uppercase" style={{ fontWeight: 600 }}>{value.Nombre}</h6>
                                                    )
                                            }
                                        </Column>
                                    </Row>;
                                } } />
                        </PanelUpdate>
                    </SectionEdit>
                </page.OptionSection>
                : <page.OptionSection
                    title={"Etapas del Seguimiento"}
                    icon="fas fa-bars" collapsed={false} hideCollapseButton={true}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 5 }}>
                        {[listData.length].join("")}
                    </span>}
                    level={1} readOnly={false}>
                    <SectionButtons>
                        <Button iconOnly={true} className="font-white" onClick={this.onClickAll} icon="fas fa-bars" />
                    </SectionButtons>
                    <PanelUpdate info={this.props.niveles}>
                        <div key={this.props.key}>
                            <ol style={listStyle}>{items}</ol>
                        </div>
                    </PanelUpdate>
                </page.OptionSection>
        }
    });

    //interface de las propiedades de cada nivel
    export interface INivel extends IBase {
        index?: any;
        item?: any;
        etapaCurrent?: any;
        selectedKey?: string;
        catalogoKey?: string;
        idForm?: string;
        stateManager?: StateDataManager;
        etapa?: DataElement;
        etapas?: DataElement;
        form?: any;
    }

    //getter para obtener una instancia del la etapaSelected
    export const getItem: (props: INivel) => DataElement = (props: INivel): DataElement => {
        let item: DataElement = props.stateManager.getById(props.selectedKey);
        if (!item) {
            item = createDefaultStoreObject({});
        }
        return item;
    };

    //getter para obtener una instancia de la etapaCatalogo 
    export const getItems: (props: INivel) => DataElement = (props: INivel): DataElement => {
        let items: DataElement = props.stateManager.getById(props.catalogoKey);
        if (!items) {
            items = createDefaultStoreObject([]);
        }
        return items;
    };

    export let NivelForm: any = global.connect(class extends React.Component<INivel, {}>{
        constructor(props: INivel) {
            super(props);
        }
        static defaultProps: INivel = {
            editMode: false
        }
        static props: any = (state: any) => ({
            stateManager: new StateDataManager(state.esquemas)
        });
        componentWillMount(): any {
            dispatchDefault("scv-esquemas-etapas-setSelected", {}, this.props.selectedKey);
            dispatchDefault("scv-esquemas-etapas", [], this.props.catalogoKey);
        }
        componentDidMount(): any {
            let items: any[] = this.props.item.Etapas ? this.props.item.Etapas : [];
            dispatchSuccessful("scv-esquemas-etapas", items, this.props.catalogoKey);
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let idForm: string = "etapas-form-id-" + this.props.index;
            let etapa: DataElement = getItem(this.props);
            let etapas: DataElement = getItems(this.props);

            return <Nivel {...this.props} etapa={etapa} etapas={etapas} idForm={idForm} />
        }
    });

    export let Nivel: any = global.connect(class extends React.Component<INivel, {}>{
        constructor(props: INivel) {
            super(props);
            this.onAddNew = this.onAddNew.bind(this);
            this.onSave = this.onSave.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onDelete = this.onDelete.bind(this);
            this.onActive = this.onActive.bind(this);
        }
        static props: any = (state: any) => ({
            form: state.forms,
            etapaCurrent: state.esquemas.etapaCurrent,
            stateManager: new StateDataManager(state.esquemas)
        });
        static defaultProps: INivel = {
            editMode: false
        }
        refs: {
            form: any;
        }
        componentWillMount(): void {
            this.onCancel();
        }
        shouldComponentUpdate(nextProps: INivel, {}): boolean {
            return hasChanged(this.props.etapas, nextProps.etapas) ||
                hasChanged(this.props.etapa, nextProps.etapa) ||
                this.props.editMode !== nextProps.editMode;
        }
        componentWillUpdate(nextProps: INivel, {}): void {
            if (isSuccessful(nextProps.etapa)) {
                if (nextProps.etapa.returnCode === 4) {
                    dispatchDefault("scv-esquemas-etapas-setSelected", {}, this.props.selectedKey);
                }
            }
        }
        componentDidUpdate(prevProps: INivel, {}): void {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.etapa, this.props.etapa, false)) {
                let item: any = getData(this.props.etapa);

                if (item.Estado === 4) {
                    success("La etapa ha sido eliminada");
                    setCurrentEtapa({});
                } else {
                    success("La etapa ha sido actualizada");
                    setCurrentEtapa(item);
                }

                getNiveles(this.props.idEsquema);
                dispatchDefault("scv-esquemas-etapas-setSelected", {}, this.props.selectedKey);
            }
        }
        onSave(): void {
            let $page: any = $ml[PAGE_ID];
            let group: any = this.props.item;

            if (!Forms.isValid(this.props.idForm)) {
                warning($page.mensajes.warning.message);
                return;
            };

            let item: EditForm = Forms.getForm(this.props.idForm);
            let model: any = item
                .addNumber("ID")
                .addObject("Etapa")
                .addObject("AreaResponsable")
                .addObject("WorkFlow")
                .addNumber("PlazoDias")
                .addNumber("Orden")
                .addNumber("IdEsquema")
                .toObject();

            dispatchAsyncPut("scv-esquemas-etapas-guardar", "esquemas/etapas/save", model, this.props.selectedKey);
        }
        onCancel(): void {
            Forms.remove(this.props.idForm);
            dispatchDefault("scv-esquemas-etapas-setSelected", {}, this.props.selectedKey);
        }
        onSelect(item: any): void {
            Forms.remove(this.props.idForm);
            dispatchSuccessful("scv-esquemas-etapas-setSelected", item, this.props.selectedKey);
        }
        onDelete(item: any): void {
            EK.Global.confirm("Presione Confirmar para eliminar la etapa", "Eliminar etapa", () => {
                let model = EK.Global.assign(item);
                dispatchAsyncPut("scv-esquemas-etapas-guardar", "esquemas/etapas/delete", model, this.props.selectedKey);
            });
        }
        onAddNew(): void {
            let group: any = this.props.item;
            let etapas: any[] = getData(this.props.etapas);
            let newId: number = this.props.etapas.getNextLowerID();

            let item: any = {
                ID: newId,
                Etapa: createDefaultStoreObject({}),
                AreaResponsable: createDefaultStoreObject({}),
                WorkFlow: createDefaultStoreObject({}),
                Orden: group.Orden,
                PlazoDias: 0,
                IdEsquema: this.props.idEsquema
            };

            this.onSelect(item);
        }
        onActive(item: any): void {
            let prevID: number = item && item.Etapa ? item.Etapa.ID : null;
            let nextID: number = getDataID(this.props.etapaCurrent);

            if (prevID !== nextID) {
                setCurrentEtapa(item);
            }
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let group: any = this.props.item;
            let deletable: () => boolean = (): boolean => {
                let items: DataElement = getItems(this.props);
                let data: any[] = isSuccessful(items) ? getData(items) : [];
                let retValue: boolean = data && data.length > 1 ? true : false;
                return retValue;
            };

            let items: DataElement = this.props.etapas;
            if (isSuccessful(this.props.etapas)) {
                items = this.props.etapas.getActiveItems();
            }

            let editMode: boolean = isSuccessful(this.props.etapa);
            let model: any = getData(this.props.etapa);

            let add: any = {
                icon: "fa fa-plus",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onAddNew() }
            };
            let edit: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onSelect(item) }
            };
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onDelete(item) }
            };

            return this.props.editMode ? <OptionSection
                title={group.Orden}
                collapsed={false}
                hideCollapseButton={true}
                editMode={editMode}
                readOnly={false}
                level={10}>
                <SectionView>
                    <NestableList
                        items={items}
                        readonly={false}
                        addRemoveButton={false}
                        listEmpty={(hasData: boolean) => {
                            if (hasData !== true) {
                                return <li className="dd-item dd3-item" style={{ paddingBottom: 5, paddingTop: 5, border: "none" }}>
                                    <div className="dd3-content" style={{ padding: 5, height: "auto", border: "none", backgroundColor: "#FFFFFF" }}>
                                        <Row style={{ padding: 0, margin: 0 }}>
                                            <Column size={[10, 10, 10, 10]} style={{ fontWeight: 400 }}>
                                                <h6 className="uppercase" style={{ fontWeight: 400 }}>
                                                    <Link onClick={this.onAddNew} icon="fa fa-plus" text={" Agregar etapa"} />
                                                </h6>
                                            </Column>
                                        </Row>
                                    </div>
                                </li>
                            }
                            return undefined;
                        } }
                        dragAndDrop={false}
                        formatter={(index: number, item: any) => {
                            return <Row style={{ padding: 0, margin: 0 }}>
                                <Column size={[10, 10, 10, 10]} style={{ fontWeight: 400 }}>
                                    <h6 className="uppercase" style={{ fontWeight: 600 }}>
                                        <Link info={item} onClick={this.onActive} text={item.Etapa.Nombre} />
                                    </h6>
                                </Column>
                                <buttons.PopOver idForm={this.props.idForm} info={item} extraData={[add, edit, remove]} />
                            </Row>
                        } } />
                </SectionView>
                <SectionEdit
                    idForm={this.props.idForm}
                    onSave={this.onSave}
                    onCancel={this.onCancel}>
                    <Row style={{ paddingBottom: 10 }}>
                        <input.Hidden id={"ID"} idFormSection={this.props.idForm} value={model.ID} />
                        <input.Hidden id={"IdEsquema"} idFormSection={this.props.idForm} value={model.IdEsquema} />
                        <input.Hidden id={"Orden"} idFormSection={this.props.idForm} value={model.Orden} />
                        <EtapasDDL
                            id={"Etapa"}
                            idFormSection={this.props.idForm}
                            label={$page.form.section.esquemas$Etapas.form.etapa.label}
                            size={[12, 12, 12, 12]}
                            value={model.Etapa}
                            required={true}
                            change={(item: any) => {
                                Forms.updateFormElement(this.props.idForm, "PlazoDias", item.PlazoEstandar)
                            } }
                            validations={[validations.required()]} />
                        <input.Integer
                            id={"PlazoDias"}
                            idFormSection={this.props.idForm}
                            label={$page.form.section.esquemas$Etapas.form.plazoDias.label}
                            size={[12, 12, 12, 12]}
                            required={true}
                            value={model.PlazoDias}
                            maxLength={8}
                            validations={[validations.required(), validations.isNumber()]} />
                        <AreasOrganizacionDDL
                            id={"AreaResponsable"}
                            idFormSection={this.props.idForm}
                            label={$page.form.section.esquemas$Etapas.form.areaResponsable.label}
                            required={true}
                            size={[12, 12, 12, 12]}
                            helpLabel={$page.form.section.esquemas$Etapas.form.areaResponsable.helplabel}
                            value={model.AreaResponsable}
                            validations={[validations.required()]} />
                        <ddl.WorkflowsDDL
                            id={"WorkFlow"}
                            claveTipo={IWorkFlowTypeEnum.Etapa}
                            idFormSection={this.props.idForm}
                            label={"Autorización"}
                            addNewItem={"SO"}
                            addNewItemText={"Sin autorización"}
                            required={false}
                            size={[12, 12, 12, 12]}
                            helpLabel={"Capture la autorización si es requerida"}
                            value={model.WorkFlow} />
                    </Row>
                </SectionEdit>
            </OptionSection> : <OptionSection
                title={group.Orden}
                collapsed={false}
                hideCollapseButton={true}
                readOnly={false}
                level={10}>
                    <NestableList
                        items={items}
                        readonly={false}
                        addRemoveButton={false}
                        dragAndDrop={false}
                        formatter={(index: number, item: any) => {
                            return <Row style={{ padding: 0, margin: 0 }}>
                                <Column size={[12, 12, 12, 12]} style={{ fontWeight: 400 }}>
                                    <h6 className="uppercase" style={{ fontWeight: 600 }}>
                                        <Link info={item} onClick={this.onActive} text={item.Etapa.Nombre} />
                                    </h6>
                                </Column>
                            </Row>
                        } } />
                </OptionSection>
        }
    });

    interface IAddNewButton extends EK.UX.Buttons.IButtonProps { niveles?: DataElement; };

    let AddNewButton: any = global.connect(class extends React.Component<IAddNewButton, {}>{
        constructor(props: IAddNewButton) {
            super(props);
        }
        static props: any = (state: any) => ({
            niveles: state.esquemas.niveles
        });
        static defaultProps: IAddNewButton = {
            icon: IconTypeEnum.plus,
            text: "",
            color: "white",
            className: "font-white",
            iconOnly: true,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        shouldComponentUpdate(nextProps: IAddNewButton, {}): boolean {
            return hasChanged(this.props.niveles, nextProps.niveles) ||
                this.props.visible !== nextProps.visible;
        }
        render(): JSX.Element {
            let visible: boolean = Boolean(this.props.visible);

            if (isSuccessful(this.props.niveles)) {
                let items: any[] = getData(this.props.niveles);
                let nivel: any = items[items.length - 1];
                let etapas: any[] = nivel ? nivel.Etapas : null;

                if (etapas && etapas.length <= 0) {
                    visible = false;
                }
            }

            return <Button {...this.props} visible={visible} />;
        }
    });

    export interface IEtapasDDLProps extends EK.UX.DropDownLists.IDropDrownListProps {
        faseExpediente?: any;
    }

    export let EtapasDDL: any = global.connect(class extends React.Component<IEtapasDDLProps, {}>{
        static props: any = (state: any) => ({
            faseExpediente: state.fasesExpediente.selected,
            items: state.etapas.catalogo
        });
        static defaultProps: IDropDrownListProps = {
            id: "Etapa",
            items: createDefaultStoreObject([]),
            label: "Etapa",
            helpLabel: "Selecciona la Etapa",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        shouldComponentUpdate(nextProps: IEtapasDDLProps, {}): boolean {
            return hasChanged(this.props.faseExpediente, nextProps.faseExpediente) ||
                hasChanged(this.props.items, nextProps.items);
        }
        componentDidMount(): void {
            let faseClave: string = getData(this.props.faseExpediente).Clave;
            dispatchAsync("etapas-catalogo", "base/scv/etapas/all/" + global.encodeParameters({ FaseClave: faseClave }));
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />
        }
    });
}