namespace EK.UX.Page {
    "use strict";

    export enum PageMode {
        Principal = 0,
        Vista = 1,
        Edicion = 2,
        Personalizado = 3,
        Impresion = 4,
        Reporte = 4,
        SoloGuardar = 5
    };
    export interface IPageTitle {
        title: string;
        subTitle: string;
        children?: any[];
    };
    export const applyFilter: (props: IProps, filter?: (filters: any) => any, type?: string) => any = (props: IProps, filter?: (filters: any) => any, type?: string): any => {
        let id: string = props.id ? props.id : getData(props.page).id;
        let idForm: string = [id, "filters"].join("$");
        let filters: any = Forms.getValues(idForm);
        //
        let actionUrl: string = "";
        if (props.onWillFilter) {
            filters = props.onWillFilter(props, filters);
        };
        if (filter || props.onFilter) {
            if (filter) {
                filter(filters);
            }
            else {
                props.onFilter(props, filters, type);
            };
        }
        else {
            props.config.dispatchPost(global.getFilters(filters));
        };
    };
    export const dispatchGlobalData: (props: IProps) => any = (props: IProps): any => {
        let idForm: string = [props.id, "filters"].join("$");
        let filters: any = Forms.getValues(idForm)
        let dispatchAction: string = "global-current-catalogo";
        let encodedFilters: string = global.encodeObject(filters);
        let actionUrl: string = [props.pageLink, "/all/", encodedFilters].join("");
        if (props.dispatchGlobalData) {
            props.dispatchGlobalData(dispatchAction, actionUrl, filters, encodedFilters);
        }
        else {
            dispatchAsync(dispatchAction, actionUrl);
        };
    };
    export const canViewReadMode: (state?: DataElement) => boolean = (state?: DataElement): boolean => {
        let retValue: boolean = false;
        //
        if (!state) {
            state = global.getStateItem("global.currentEntityState");
        };
        //
        if (isSuccessful(state)) {
            if (getData(state).viewMode === true) {
                retValue = true;
            };
        };

        return retValue;
    };
    export const canViewEditMode: (state?: DataElement) => boolean = (state?: DataElement): boolean => {
        let retValue: boolean = false;
        //
        if (!state) {
            state = global.getStateItem("global.currentEntityState");
        };
        //
        if (isSuccessful(state)) {
            if (getData(state).viewMode === false) {
                retValue = true;
            };
        };

        return retValue;
    };
    export const connect: (component: any) => any = (component: any): any => {
        let dispatchs: any = component.dispatchs;

        return ReactRedux.connect(props, dispatchs)(component);
    };
    export const props: any = global.pageProps;
    export const save: (idForm: string) => void = (idForm: string): void => {
        try {
            if (!Forms.isValid(idForm)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            } else {
                if (props.onClick) {
                    let item: any = props.onClick();

                    if (item) {
                        let dispatchItem: any;
                        let url: string;

                        if (item.url) {
                            dispatchItem = item.model;
                            url = item.url;
                        } else {
                            dispatchItem = item;
                        };

                        let pageLink: string = getData(props.pageLink);
                        let actionUrl: string = url ? url : [pageLink, "/save"].join("");

                        dispatchAsyncPut("global-current-entity", actionUrl, item);
                    };
                };
            };
        } catch (e) { }
    };
    export class Base extends React.Component<page.IProps, page.IProps>{ };
    export class Generic<T> extends React.Component<T, T>{ };
    export interface IPageDefaultProps {
        config?: page.IPageConfig;
        icon?: string;
        url?: string;
        propForm?: string;
        ddlCG?: string;
        ddlTargetAction?: string;
        ddlTargetUrl?: string;
        itemFormatter?: (item: any, container: any) => any;
        selectionFormatter?: (item: any) => any;
        addNewItem?: string;
    };
    export class PageDefaultProps implements IPageDefaultProps {
        config?: page.IPageConfig;
        icon?: string;
        url?: string;
        propForm?: string;
        ddlCG?: string;
        ddlTargetAction?: string;
        ddlTargetUrl?: string;
        itemFormatter?: (item: any, container: any) => any;
        selectionFormatter?: (item: any) => any;
        addNewItem?: string;

        constructor(data: IPageDefaultProps, createBaseDll?: boolean, createSBAdd?: boolean) {
            this.config = data.config;
            this.icon = data.icon;
            this.url = data.url;
            this.propForm = data.propForm;
            this.ddlCG = data.ddlCG;
            this.ddlTargetAction = data.ddlTargetAction;
            this.ddlTargetUrl = data.ddlTargetUrl;

            if (createBaseDll) {
                let mapProps: any = new Function("s", "var o={ $defProps : " + JSON.stringify(data) + "}; o.items = s.global.ddlBase" + data.propForm + "; return o;");
                //
                global.createBaseDDL(ddl.BaseDDL, data, mapProps);
            };
            if (createSBAdd) {
                let mapProps: any = new Function("s", "var o={ $defProps : " + JSON.stringify(data) + "}; o.$modalResult = s.global.modalResult; return o;");
                //
                global.createSpecialAddButton(buttons.SpecialAddButton, data, mapProps);
            };
        };
    };
    export interface IPageConfig {
        id: string;
        idFilters: string;
        idML: string;
        modulo: string;
        group: string;
        slot: string;
        slots: any[];
        state: any;
        clearCatalogo?: (f?: any, slot?: string) => void;
        dispatch?: (f?: any, slot?: any, type?: any) => void;
        dispatchPost?: (f?: any, slot?: any, type?: any) => void;
        dispatchCatalogoBase?: (url: string, data?: any, slot?: any, type?: any) => void;
        dispatchCatalogoBasePost?: (url: string, data?: any, slot?: any, type?: any) => void;
        dispatchEntityBase?: (data: any, url: string, slot?: any, method?: HttpMethod) => void;
        dispatchEntity?: (id: number, slot?: any, url?: string, method?: HttpMethod) => void;
        getBaseLink?: (slot?: string) => string;
        getIDEntidad?: (props: IProps, slot?: string) => number;
        getML?: (property?: string) => any;
        getCatalogo?: (slot?: string) => DataElement;
        getEntity?: (slot?: string) => DataElement;
        getState?: (slot?: string) => DataElement;
        hasSlot?: (slot: string) => boolean;
        setCatalogo?: (data: any, slot?: string) => void;
        setEntity?: (entity: any, slot?: string) => void;
        setState?: (state: any, slot?: string) => void;
        setPageTitle?: (title: string, subTitle?: string, children?: any) => void;
        updateForm?: (slot?: string) => void;
    };
    export class PageConfig implements IPageConfig {
        id: string;
        idFilters: string;
        idML: string;
        group: string;
        modulo: string;
        slot: any;
        slots: any[];
        state: any;

        constructor(id?: string, modulo?: string, slots?: any[], idML?: string, group?: string) {
            this.id = id;
            this.idFilters = id + "$filters";
            this.idML = idML ? idML : id;
            this.modulo = modulo;
            this.slots = !slots ? [] : slots;
            this.group = group;
        };
        clearCatalogo(f?: any, slot?: string): void {
            let dataSlot: string = slot;
            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };

            if (!dataSlot) {
                global.dispatchSuccessful("global-current-catalogo", []);
            }
            else {
                global.dispatchSuccessful("global-page-data", [], dataSlot);
            };
        };
        dispatch(f?: any, slot?: any, type?: any): void {
            let encodedFilters: string = global.encodeObject(f);
            let dataSlot: string = slot;
            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };

            if (!dataSlot) {
                let url: string = ["base/", this.modulo, "/", this.id, "/all/", encodedFilters].join("");
                global.dispatchAsync("global-current-catalogo", url); 
            }
            else {
                let url: string = ["base/", this.modulo, "/", dataSlot, "/all/", encodedFilters].join("");
                global.dispatchAsync("global-page-data", url, dataSlot);
            };
        };

        dispatchPost(f?: any, slot?: any, type?: string): void {
            let dataSlot: string = slot;
            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };
            if (!dataSlot) {

                let url: string = ["base/", this.modulo, "/", this.id, "/allPost/"].join("");
                global.dispatchAsyncPost("global-current-catalogo", url, f);
            }
            else {
                let url: string = ["base/", this.modulo, "/", dataSlot, "/allPost/"].join("");
                global.dispatchAsyncPost("global-page-data", url, f, dataSlot);
            };
        };

        dispatchCatalogoBase(url: string, data?: any, slot?: any, type?: string): void {
            let dataSlot: string = slot;
            let dispatchFn: any = global.dispatchAsync;

            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };
            if (data !== undefined && data !== null) {
                let encodedFilters: string = global.encodeObject(data);
                url = url + encodedFilters;
            };

            if (type === "exportar") {
                url = url + "/" + type;
                window.open(url);
            }
            else {
                if (!dataSlot) {
                    global.dispatchAsync("global-current-catalogo", url);
                }
                else {
                    global.dispatchAsync("global-page-data", url, dataSlot);
                };
            };
        };
        dispatchCatalogoBasePost(url: string, data?: any, slot?: any, type?: string): void {
            let dataSlot: string = slot;

            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };

            if (type === "exportar") {
                url = url + "/" + type;
                global.requestAction(url, data, "post");
            }
            else {
                if (!dataSlot) {
                    global.dispatchAsyncPost("global-current-catalogo", url, data);
                }
                else {
                    global.dispatchAsyncPost("global-page-data", url, data, dataSlot);
                };
            };
        };
        dispatchEntityBase(data: any, url: string, slot?: any, method?: HttpMethod): void {
            let dataSlot: string = slot;
            let dispatchFn: any = global.dispatchAsync;

            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };

            if (method) {
                if (method === HttpMethod.POST) {
                    dispatchFn = global.dispatchAsyncPost;
                } else if (method === HttpMethod.PUT) {
                    dispatchFn = global.dispatchAsyncPut;
                };

                if (!dataSlot) {
                    dispatchFn("global-current-entity", url, data);
                }
                else {
                    dispatchFn("global-page-entity", url, data, dataSlot);
                };
            }
            else {
                if (!dataSlot) {
                    dispatchFn("global-current-entity", url);
                }
                else {
                    dispatchFn("global-page-entity", url, dataSlot);
                };
            };
        };
        dispatchEntity(id: number, slot?: any, url?: string, method?: HttpMethod): void {
            //let url: string;
            let dataSlot: string = slot;
            let dispatchFn: any = global.dispatchAsyncPost;

            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };

            if (method) {
                if (method === HttpMethod.PUT) {
                    dispatchFn = global.dispatchAsyncPost;
                };
            };

            if (!dataSlot) {
                if (!url) {
                    url = ["base/", this.modulo, "/", this.id, "/id/"].join("");
                };
                dispatchFn("global-current-entity", url, { id });
            }
            else {
                if (!url) {
                    url = ["base/", this.modulo, "/", dataSlot, "/id/"].join("");
                };
                dispatchFn("global-page-entity", url, { id }, dataSlot);
            };
        };
        getBaseLink(slot?: string): string {
            let modulo: string = this.modulo;
            let id: string = this.id;

            if (slot) {
                id = this.slots[0];

                if (this.slots[1]) {
                    modulo = this.slots[1];
                };
            };

            return ["base", modulo, id].join("/");
        };
        getCatalogo(slot?: string): DataElement {
            if (!this.state) {
                this.state = EK.Store.getState().global;
            };
            if (!slot) {
                return this.state.currentCatalogo;
            }
            else {
                return this.state["catalogo$" + slot];
            };
        };
        getIDEntidad(props: IProps, slot?: string): number {
            let retValue: number = -1;
            let entidad: any = this.getEntity(slot);

            if (entidad) {
                if (props.idKeyEntidad) {
                    retValue = global.getData(entidad)[props.idKeyEntidad];
                }
                else {
                    retValue = global.getDataID(entidad);
                };
            };

            return retValue;
        };
        getEntity(slot?: string): DataElement {
            //if (!this.state) {
            this.state = EK.Store.getState().global;
            //};
            if (!slot) {
                return this.state.currentEntity;
            }
            else {
                return this.state["entity$" + slot];
            };
        };
        getState(slot?: string): DataElement {
            if (!this.state) {
                this.state = EK.Store.getState().global;
            };
            if (slot === undefined || slot === null) {
                return this.state.currentEntityState;
            }
            else {
                return this.state["state$" + slot];
            };
        };
        getML(property?: string): any {
            let idKey: string = this.idML ? this.idML : this.id;
            let retValue: any;
            //
            if (property) {
                retValue = global.getNestedProp($ml, idKey + "." + property);
                if (retValue) {
                    retValue.__isMLSection = true;
                };
            }
            else {
                retValue = $ml[idKey];
            };
            //
            return retValue;
        };
        hasSlot(slot: string): boolean {
            let retValue: boolean = false;

            for (var i = 0; i < this.slots.length; i++) {
                let currentSlot: any = this.slots[i];
                if (currentSlot.constructor.name === "String") {
                    if (slot === currentSlot) {
                        retValue = true;
                        break;
                    };
                }
                else {
                    if (slot === currentSlot.id) {
                        retValue = true;
                        break;
                    };
                };
            };

            return retValue;
        };
        setCatalogo(data: any, slot?: string): void {
            let dataSlot: string = slot;
            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };

            if (!dataSlot) {
                dispatchSuccessful("global-current-catalogo", data);
            }
            else {
                dispatchSuccessful("global-page-data", data, dataSlot);
            };
        };
        setEntity(entity: any, slot?: string): void {
            let dataSlot: string = slot;
            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };

            if (!dataSlot) {
                dispatchSuccessful("global-current-entity", entity);
            }
            else {
                dispatchSuccessful("global-page-entity", entity, dataSlot);
            };
        };
        setState(state: any, slot?: string): void {
            let s: any = EK.Store.getState();
            let newState: any = {};
            let dataSlot: string = slot;
            if (!dataSlot && this.slot) {
                dataSlot = this.slot;
            };

            if (state !== null) {
                if (s && s.global) {
                    let data: any = getData(s.global.currentEntityState);

                    newState = global.assign(data, state);
                };
            };

            if (!dataSlot) {
                dispatchSuccessful("global-current-entity-state", newState);
            }
            else {
                dispatchSuccessful("global-page-state", newState, dataSlot);
            };
        };
        setPageTitle(title: string, subTitle?: string, children?: any): void {
            this.setState({ title, subTitle, children });
            //let state: any = EK.Store.getState();
            //let newState: any = {};

            //if (state.global.currentEntityState) {
            //    newState = global.assign(state);
            //};
            //newState.title = { title, subTitle };

            //dispatchSuccessful("global-current-entity-state", newState);
        };
        updateForm(slot?: string): void {
            let entidad: any = getData(this.getEntity(slot));
            let elements: any = {};

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

            let idForm: string = this.id;
            if (slot) {
                idForm = slot;
            }
            Forms.updateFormElements(idForm, elements);
        };
    };
    interface IParams {
        id: any;
    };
    interface IOptionSectionProps extends React.Props<any> {
        id?: string;
        config?: page.IPageConfig;
        editMode?: boolean;
        iconSave?: string;
        inlineEdit?: boolean;
        inlineNew?: boolean;
        title?: any;
        subTitle?: any;
        dispatchFilter?: string;
        loading?: boolean;
        readOnly?: boolean;
        icon?: string;
        level?: string;
        inverse?: boolean;
        visible?: boolean;
        collapsed?: boolean;
        hideCollapseButton?: boolean;
        onCollapse?: (collapsed: boolean) => void;
        onCancel?: () => void;
        onSave?: () => void;
        autonomo?: boolean;
    };
    interface IOptionSectionState {
        loadContent?: boolean;
    };
    export interface IProps extends global.props {
        app?: any;
        allowDelete?: boolean;
        allowNew?: boolean;
        allowEdit?: boolean;
        allowSave?: boolean;
        allowView?: boolean;
        allowExcel?: boolean;
        allowFileUpload?: boolean;
        bc?: string[];
        breadcrumb?: any;
        changePage?: (pageId: string) => {};
        config?: IPageConfig;
        customPermission?: () => boolean;
        entidad?: DataElement;
        entityType?: DataElement;
        data?: DataElement;
        forceUpdate?: boolean;
        id?: string;
        idLoader?: string;
        idLoaded?: string;
        idML?: string;
        idKeyEntidad?: string;
        isNew?: boolean;
        keyML?: string;
        mode?: boolean;
        modulo?: string;
        obtenerItem?: (id: number) => void;
        onSave?: (props: page.IProps, item: EditForm) => void;
        onCatalogoLoaded?: (props: page.IProps) => void;
        onEntityLoaded?: (props: page.IProps, parameters?: any) => void;
        onEnterEditMode?: (props: page.IProps) => void;
        onEnterViewMode?: (props: page.IProps) => void;
        onWillEntityLoad?: (id: any, props: page.IProps) => void;
        onDelete?: (id: any, props: page.IProps) => void;
        onExport?: (item: any, props: page.IProps) => void;
        onView?: (item: any, props: page.IProps) => void;
        onNew?: (item: any, props: page.IProps) => void;
        onEntitySaved?: (props: page.IProps) => void;
        onFilter?: (props: any, filters: any, type?: string) => any;
        onWillFilter?: (props: any, filters: any) => any;
        dispatchGlobalData?: (dispatchAction: string, actionUrl: string, filters: any, encodedFilters: string) => void;
        page?: any;
        pageLink?: string;
        pageMode?: PageMode;
        params?: IParams;
        readOnly?: boolean;
        slots?: any[];
        state?: DataElement;
        title?: string | IPageTitle;
    };
    interface IPageState {
        viewMode?: boolean;
        //pageLink?: string;
    };
    interface IPageTitleProps extends React.Props<any> {
        title: string;
        subTitle?: string;
        className?: string;
        state?: any;
        style?: React.CSSProperties;
    };
    export class Base$Page extends React.Component<IProps, IPageState> {
        constructor(props: IProps) {
            super(props);
            this.dispatchEntity = this.dispatchEntity.bind(this);
            this.dispatchCatalogo = this.dispatchCatalogo.bind(this);
            this.loadEntityFromParams = this.loadEntityFromParams.bind(this);
            //this.state = {
            //    pageLink: ["base", this.props.modulo, this.props.id].join("/")
            //};
            // don't use 
            let w: any = window;
            w["__page_id__"] = this.props.id;
            //
        };
        //
        static defaultProps: IProps = {
            id: undefined,
            pageMode: undefined
        };
        dispatchEntity(id: number): void {
            let actionUrl: string = [this.props.pageLink, "/id"].join("");
            if (actionUrl === 'base/scv/ReportesFallas/id') {
                //if (id > 0) {
                //global.dispatchAsyncPut("global-current-entity", "base/scv/ReportesFallas/Save", item);

                // } else {

                // }
                dispatchAsyncPost("global-current-entity", actionUrl, { id });

            } else {
                dispatchAsyncPost("global-current-entity", actionUrl, { id });

            }
            //console.log(actionUrl);
        };
        dispatchCatalogo(force?: boolean): void {
            let idForm: string;
            let filters: any;

            if (force === true || !isLoadingOrSuccessful(this.props.data)) {
                page.applyFilter(global.assign(this.props, { children: [] }));
            };
        };
        loadEntityFromParams(): boolean {
            let context: any = global.getCurrentContext();
            let params: any = context.params;
            let retValue: boolean = false;

            if (params && !isNaN(parseInt(params.id))) {
                let id: number = Number(params.id);
                let obtenerItem: boolean = true;
                if (isSuccessful(this.props.entidad)) {
                    if (id === this.props.config.getIDEntidad(this.props, null)) {
                        obtenerItem = false;

                        if (this.props.onEntityLoaded) {
                            this.props.onEntityLoaded(this.props);
                        };
                        retValue = true;
                    };
                };

                if (obtenerItem === true) {
                    if (this.props.onWillEntityLoad) {
                        this.props.onWillEntityLoad(id, this.props);
                    }
                    else {
                        this.dispatchEntity(id);
                    }
                };
            } else {
                let l: any = window.location;
                //
                if (l && l.href) {
                    let search: string = $.trim(l.href).toLowerCase();
                    let nuevoPos: number = search.indexOf("?nuevo");
                    if (nuevoPos === -1) {
                        nuevoPos = search.indexOf("&nuevo");
                    };
                    //
                    let statePos: number = search.indexOf("?state");
                    if (statePos === -1) {
                        statePos = search.indexOf("&state");
                    };
                    //
                    if (nuevoPos >= 0 || statePos >= 0) {
                        let pos: number;
                        let newEntity: any = {};
                        if (nuevoPos >= 0) {
                            newEntity.ID = -1;
                            pos = nuevoPos;
                        }
                        else {
                            pos = statePos;
                        };

                        pos = search.indexOf("&", pos + 1);
                        if (pos >= 0) {
                            let newEntityString: string = "";
                            search = $.trim(l.href);

                            for (var i = pos + 1; i < search.length; i++) {
                                if (search[i] === "#") {
                                    break;
                                }
                                else {
                                    newEntityString += search[i];
                                };
                            };

                            newEntity = global.decodeParameters(newEntityString);
                        };

                        dispatchSuccessful("global-current-entity", newEntity);
                        Forms.updateFormElements(this.props.config.id, newEntity);

                        this.props.config.setState({ viewMode: false, isNew: true });

                        if (this.props.onEntityLoaded) {
                            let props: IProps = global.assign(this.props);
                            props.entidad = createSuccessfulStoreObject(newEntity);

                            this.props.onEntityLoaded(props);
                        };

                        retValue = true;
                    }
                    else if (this.props.onWillEntityLoad) {
                        this.props.onWillEntityLoad(l.search, this.props);
                    }
                };
            };

            return retValue;
        };
        shouldComponentUpdate(nextProps: IProps, nextState: IPageState): boolean {
            if (this.props.pageMode === PageMode.Principal) {
                return (hasChanged(this.props.data, nextProps.data)) ||
                    (hasChanged(this.props.entidad, nextProps.entidad)) ||
                    (hasChanged(this.props.state, nextProps.state)) ||
                    (nextProps.forceUpdate === true);
            } else if (this.props.pageMode === PageMode.Edicion || this.props.pageMode === PageMode.Impresion) {
                return (hasChanged(this.props.entidad, nextProps.entidad)) ||
                    (this.props.config.getIDEntidad(this.props, null) !== global.getCurrentContext().params.id) ||
                    (hasChanged(this.props.state, nextProps.state)) ||
                    (nextProps.forceUpdate === true);
            } else {
                return true;
            };
        };
        componentWillMount(): void {
            $('.search-form input').val("");
            //
            requireGlobal(Catalogos.estatus);
            setCurrentEntityType(this.props.id);
            //
            if (this.props.changePage !== undefined) {
                this.props.changePage(this.props.id);
            };
            let scManager: any = window["shortcut"];
            scManager.add("F1", () => { $("body").toggleClass("page-quick-sidebar-open"); });

            if (this.props.pageMode === PageMode.Edicion || this.props.pageMode === PageMode.Impresion) {
                this.props.config.setState({ viewMode: true });
            }
            else if (this.props.pageMode === PageMode.Principal) {
                this.props.config.setState({ viewMode: true });
            };
            //
            dispatchSuccessful("global-page-ml", { code: this.props.keyML ? this.props.keyML : this.props.id });
            //
            Forms.remove(this.props.id);
            //Forms.remove(this.props.config.idFilters);
        };
        componentDidMount(): void {
            //
            //setCurrentEntityType(this.props.id);
            ////
            //if (this.props.changePage !== undefined) {
            //    this.props.changePage(this.props.id);
            //};
            //
            //console.log('pagina cargada...')
            //console.log(this.props.pageLink)
            if (this.props.pageLink) {
                setCurrentLink(this.props.pageLink);
                let folioPendiente = EK.Store.getState().global.app && EK.Store.getState().global.app.data && EK.Store.getState().global.app.data.Me ? EK.Store.getState().global.app.data.Me.FolioPendiente:null

                console.log(folioPendiente)
                if (folioPendiente && folioPendiente !== undefined) {
                    const hostname = window.location.hostname;
                    let fullpath = window.location.href; 
                    let urlRedireccionReporte = EK.Store.getState().global.app.data.Me.redirectReportUrl;
                    let path = `${urlRedireccionReporte}/${folioPendiente}`;
                    //switch (hostname) {
                    //    case 'localhost':
                    //        path = `http://localhost:55407/#/scv/pv/reportesFallas/${folioPendiente}`;
                    //        //console.log('redireccionado a localhost')
                    //        break;
                    //    case 'demos.gruporuba.com.mx':
                    //        path = `https://demos.gruporuba.com.mx/scdc3/#/scv/pv/reportesFallas/${folioPendiente}`;
                    //        break;
                    //    case 'apps.gruporuba.com.mx':
                    //        path = `https://apps.gruporuba.com.mx/scdc/#/scv/pv/reportesFallas/${folioPendiente}`;
                    //        break;
                    //}
                   
                    if (path !== fullpath) {
                        console.log('redireccioar a: ')
                        console.log(path)
                        window.location.href = path;
                    } else {
                        console.log('unica ventana disponible')
                    }
                }
               
                
            };
            //

            if (this.props.pageMode === PageMode.Principal || this.props.pageMode === PageMode.Vista) {
                let forceUpdate: boolean = getData(this.props.entityType) !== this.props.id;
                this.dispatchCatalogo(forceUpdate);

            } else if (this.props.pageMode === PageMode.Edicion || this.props.pageMode === PageMode.Impresion) {
                this.loadEntityFromParams();
            };
        };
        componentWillReceiveProps(nextProps: IProps) {
            if (this.props.pageMode === PageMode.Principal) {
                if (global.wasLoaded(this.props.data, nextProps.data)) {
                    if (this.props.onCatalogoLoaded) {
                        let props: page.IProps = global.assign(nextProps, { pageLink: this.props.pageLink });
                        props.config = global.clonePageConfig(props.config);

                        this.props.onCatalogoLoaded(global.assign(props, { pageLink: this.props.pageLink }));
                    };

                    //this.dispatchCatalogo(true);
                };
            } else if (this.props.pageMode === PageMode.Edicion || this.props.pageMode === PageMode.Impresion) {

                if (hasChanged(this.props.state, nextProps.state)) {
                    let thisViewMode: boolean = getData(this.props.state).viewMode;
                    let nextViewMode: boolean = getData(nextProps.state).viewMode;
                    //
                    if (getData(nextProps.state).viewMode !== false) {
                        Forms.remove(this.props.id);
                    };
                    //
                    if (thisViewMode !== nextViewMode) {
                        //
                        if (nextViewMode === false) {
                            if (this.props.onEnterEditMode) {
                                this.props.onEnterEditMode(this.props);
                            };
                        };
                        //
                        if (nextViewMode === true) {
                            if (this.props.onEnterViewMode) {
                                this.props.onEnterViewMode(this.props);
                            };
                        };
                    };
                };
                if (global.wasLoaded(this.props.entidad, nextProps.entidad)) {

                    let l: any = window.location;
                    let search: string;
                    let pEntity: any;
                    //
                    let pos: number = l.href.indexOf("?");
                    if (pos >= 0) {
                        let pEntityString: string = "";
                        search = $.trim(l.href);

                        for (var i = pos + 1; i < search.length; i++) {
                            if (search[i] === "#") {
                                break;
                            }
                            else {
                                pEntityString += search[i];
                            };
                        };

                        pEntity = global.decodeParameters(pEntityString);
                    };
                    //
                    if (this.props.onEntityLoaded) {

                        let props: page.IProps = global.assign(nextProps, { pageLink: this.props.pageLink });
                        props.config = global.clonePageConfig(props.config);

                        this.props.onEntityLoaded(global.assign(props, { pageLink: this.props.pageLink }), pEntity);

                    };
                    //this.dispatchCatalogo(true);
                };
                //if (hasChanged(this.props.entidad, nextProps.entidad)) {
                //    if (isSuccessful(nextProps.entidad)) {
                //        let entidad: any = getData(nextProps.entidad);
                //        let elements: any = {};

                //        for (var p in entidad) {
                //            if (p === "Estatus") {
                //                let data: any = entidad[p];
                //                if (data && data.Clave === "A") {
                //                    elements[p] = true;
                //                } else if (data && data.Clave === "B") {
                //                    elements[p] = false;
                //                } else {
                //                    elements[p] = entidad[p]
                //                }
                //            } else {
                //                elements[p] = entidad[p];
                //            };
                //        };
                //        Forms.updateFormElements(this.props.id, elements);
                //    };
                //};
            };
        };
        componentWillUpdate(): any {
            if (this.props.pageMode === PageMode.Principal) {
            }
            else if (this.props.pageMode === PageMode.Vista) {
            }
            else if (this.props.pageMode === PageMode.Edicion || this.props.pageMode === PageMode.Impresion) {
                if (isSuccessful(this.props.entidad)) {
                    let context: any = global.getCurrentContext();
                    let params: any = context.params;

                    if (params && !isNaN(parseInt(params.id))) {
                        let id: number = Number(params.id);
                        //aqui
                        let idEntidad: number = Number(this.props.config.getIDEntidad(this.props, null));
                        if (id !== idEntidad && idEntidad > 0) {
                            go(window.location.href, false);
                        }
                        else if (idEntidad === 0) {
                            go("kontrol/NotFoundItem", false);
                        };

                    };
                };
            };
        };
        componentDidUpdate(prevProps: IProps, prevState: IPageState): any {
           // console.log('sdsds dfd')
            if (this.props.pageMode === PageMode.Principal) {
                let $page: any = $ml[this.props.id];
                if (wasUpdated(prevProps.entidad, this.props.entidad)) {
                    success($page.mensajes.exito);

                    this.dispatchCatalogo(true);
                    this.props.config.setState({ viewMode: true });
                    //dispatchSuccessful("global-current-entity-state", { viewMode: true });
                };
            } else if (this.props.pageMode === PageMode.Vista) {
            } else if (this.props.pageMode === PageMode.Edicion) {
                let $page: any = $ml[this.props.id];
                if (wasUpdated(prevProps.entidad, this.props.entidad)) {
                    if (window.self !== window.top) {
                        let parent: any = window.parent;
                        //
                        let modalResultObj: any = {};
                        modalResultObj[this.props.config.id] = global.getData(this.props.entidad);
                        //
                        parent.global.dispatchSuccessful("global-modal-result", modalResultObj);
                        //
                        parent.global.success($page.mensajes.exito);
                        //
                        if (parent.closeModal) {
                            parent.closeModal();
                        };
                    }
                    else {
                        success($page.mensajes.exito);

                        this.props.config.setState({ viewMode: true });
                        //dispatchSuccessful("global-current-entity-state", { viewMode: true });
                        if (this.props.onEntitySaved) {
                            this.props.onEntitySaved(this.props);
                        }
                        else {
                            this.dispatchCatalogo(true);
                        };
                    }
                };
                //else if (isSuccessful(prevProps.entidad) && hasChanged(prevProps.entidad, this.props.entidad)) {
                //    this.loadEntityFromParams();
                //};
            };
        };
        componentWillUnmount(): void {
            let scManager: any = window["shortcut"];
            scManager.remove("F1");
            //scManager.remove("insert");
            //scManager.remove("ctrl+i");
            //scManager.remove("delete");
            //scManager.remove("ctrl+p");
            //scManager.remove("ctrl+e");
            //scManager.remove("ctrl+left");
            //scManager.remove("ctrl+right");
            //scManager.remove("enter");
            //scManager.remove("esc");

            if (this.props.pageMode === PageMode.Edicion || this.props.pageMode === PageMode.Impresion) {
                Forms.remove(this.props.id);
                this.props.config.setState(null);
                //dispatchDefault("global-current-entity-state", {});
            };

            dispatchDefault("global-current-entity", {});
            this.props.config.setState(null);

            //dispatchDefault("global-current-entity-state", {});
        };

        render(): JSX.Element {
            //console.log('general page')
            let permissionMode: auth.AuthorizeMode = auth.AuthorizeMode.Hierarchical;

            if (this.props.customPermission) {
                permissionMode = auth.AuthorizeMode.Custom;
            };
            return <div className="page-content-wrapper">
                <div className="page-content">
                    <Authorize id={this.props.id}
                        mode={permissionMode} custom={this.props.customPermission}
                        permiso={AuthorizePermission.Read} accion={AuthorizeAction.AccessDeniedRender}>
                        <div style={{ display: "inline" }}>{this.props.children}</div>
                    </Authorize>
                    <div style={{ height: 100, width: "100%" }}></div>
                </div>
            </div>;
        }
    }
    export class PageRedirect extends React.Component<{}, {}>{
        componentDidMount(): any {
            let pathRedirect: string = global.getCurrentContext().params.path;

            if (pathRedirect) {
                let ro: any = global.decodeParameters(pathRedirect);

                if (ro.url.indexOf("http://") >= 0 || ro.url.indexOf("https://") >= 0) {
                    location.replace(ro.url);
                }
                else {
                    location.replace("#" + ro.url);
                }
            };
        };
        render(): any {
            return null;
        };
    };
    export class Page$V2 extends React.Component<IProps, IPageState> {
        constructor(props: IProps) {
            super(props);

            this.getPageInfo = this.getPageInfo.bind(this);
        };
        //
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            changePage: (id: string): any => {
                dispatchSuccessful("global-page", { id });
            }
        });
        //
        static defaultProps: IProps = {
            id: undefined,
            allowNew: true,
            allowSave: true,
            allowDelete: true,
            allowEdit: true,
            allowFileUpload: false,
            allowExcel: true,
            allowView: true,
            forceUpdate: false,
            readOnly: false
        };
        //
        getPageInfo(): IPageConfig {
            let retValue: IPageConfig;
            if (this.props.config && this.props.config.id && this.props.config.id === this.props.id) {
                retValue = this.props.config;
            }
            else {
                retValue = new PageConfig(this.props.id, this.props.modulo, this.props.slots);
            };

            return retValue;
        }
        componentWillMount(): void {
            if (this.props.id !== getData(this.props.entityType)) {
                dispatchDefault("global-current-entity", {});
                //dispatchDefault("global-current-entity-state", {});
                dispatchDefault("global-current-catalogo", {});
                this.props.config.setState(null);
            };

            //if (this.props.pageMode === PageMode.Principal){
            //    this.props.config.clearCatalogo();
            //};
            global.setPageConfig({ id: this.props.id, modulo: this.props.modulo, slots: this.props.slots, idML: this.props.idML });
        };
        componentWillReceiveProps(nextProps: IProps): any {
            //if (this.props.pageMode === PageMode.Edicion) {
            //    let context: any = global.getCurrentContext();
            //    let idParam: any = context && context.params ? context.params.id : undefined;
            //    let isNew: boolean = context.location.search === "?nuevo";

            //    if (isSuccessful(nextProps.entidad)) {
            //        if ((isNew === true && getDataID(nextProps.entidad) !== -1) ||
            //                (idParam && getDataID(nextProps.entidad) !== parseInt(idParam))) {
            //            dispatchDefault("global-current-entity", {});
            //            //this.props.config.setState({ viewMode: true });
            //        };
            //    };
            //};
        };
        render(): JSX.Element {
            let config: IPageConfig = this.getPageInfo();
            let pageButtons: any[] = [];
            let pageChildren: any[] = [];
            let pageFilters: any[] = [];
            let pageInfo: any[] = [];
            let pageLink: string = config.getBaseLink(); //["base", this.props.modulo, this.props.id].join("/");

            React.Children.forEach(this.props.children, (child: any, index: number): any => {
                if (child) {
                    if (child.props.$displayName === "PageButtons") {
                        pageButtons.push(child);
                    }

                    else if (child.props.$displayName === "PageFilter") {

                        let pageFilterProps: page.IProps =
                            global.assign(this.props, { children: child.props.children });

                        //global.assign(this.props, child.props);
                        //pageFilterProps.onWillFilter = this.props.onWillFilter;}

                        pageFilterProps.key = "pageV2$filters";

                        let pageFilter: any = React.cloneElement(child, pageFilterProps)

                        pageChildren.push(pageFilter);
                    }

                    else if (child.props.$displayName === "PageInfo") {
                        pageInfo.push(child);
                    }
                    else {
                        pageChildren.push(child);
                    };
                };
            });

            let title: any = {};
            if (this.props.title && this.props.title !== null) {
                if (typeof this.props.title === "string") {
                    title = { title: this.props.title, subTitle: null, children: null };
                } else {
                    title = this.props.title;
                };
            }
            else {
                if (this.props.pageMode === PageMode.Edicion) {
                    let current: any = getData(this.props.entidad);
                    let isNew: boolean = false;
                    if (isSuccessful(this.props.state)) {
                        let state: any = getData(this.props.state);

                        if (state.isNew === true) {
                            isNew = true;
                        };
                    };

                    if (isNew) {
                        let $page: any = $ml[config.id];
                        title = { title: $page.titulo.Nuevo, subTitle: "" };
                    }
                    else {
                        if (isSuccessful(this.props.entidad)) {
                            let nombre: string = [current.Nombre].map((value: any, index: number) => {
                                if (value !== undefined && value !== null) {
                                    return value;
                                };
                            }).join("");
                            let clave: string = [current.Clave].map((value: any, index: number) => {
                                if (value !== undefined && value !== null) {
                                    return value;
                                };
                            }).join("");
                            title = { title: nombre, subTitle: clave, children: [EK.UX.Labels.badgeEstatus(current.Estatus)] };
                        };
                    };
                }
                else if (this.props.pageMode === PageMode.Impresion) {
                    title = { title: "Reporte", subTitle: "" };
                }
                else if (this.props.pageMode === PageMode.Principal || this.props.pageMode === PageMode.Vista) {
                    let $page: any = $ml[config.id];
                    if ($page && $page.consulta && $page.consulta.title) {
                        title = { title: $page.consulta.title, subTitle: "" };
                    };
                };
            };

            if (this.props.pageMode === PageMode.Principal) {
                if (this.props.readOnly === true) {
                    pageButtons.push(<PageButtons key="pageButtons">
                        {this.props.allowExcel === true ? <ExcelButton key="btnExcel" onClick={this.props.onExport} /> : null}
                        <PrintButton key="btnPrint" />
                        {this.props.allowView === true ? <ViewButton key="btnView" onClick={this.props.onView} /> : null}
                    </PageButtons>);
                } else {
                    pageButtons.push(<PageButtons key="pageButtons">
                        {this.props.allowNew === true ? <NewButton key="btnNew" onClick={this.props.onNew} /> : null}
                        {this.props.allowExcel === true ? <ExcelButton key="btnExcel" onClick={this.props.onExport} /> : null}
                        <PrintButton key="btnPrint" />
                        {this.props.allowView === true ? <ViewButton key="btnView" onClick={this.props.onView} /> : null}
                        {this.props.allowDelete === true ? <DeleteButton key="btnDelete" onDelete={this.props.onDelete} /> : null}
                    </PageButtons>);
                };
            };


            if (this.props.pageMode === PageMode.Impresion) {
                pageButtons.push(<PageButtons key="pageButtons">
                    <PrintButton key="btnPrint" />
                </PageButtons>);
            };
            if (this.props.pageMode === PageMode.Edicion) {
                let viewMode: boolean = getData(this.props.state).viewMode;
                if (this.props.readOnly === true) {
                    pageButtons.push(<PageButtons key="pageButtons">
                        <CancelButton key="btnCancel" />
                    </PageButtons>);
                }
                else {
                    if (viewMode === true) {
                        pageButtons.push(<PageButtons key="pageButtons">
                            {this.props.allowNew === true ? <NewButton key="btnNew" onClick={this.props.onNew} /> : null}
                            {this.props.allowEdit === true ? <EditButton key="btnEdit" /> : null}
                            {this.props.allowDelete === true ? <DeleteButton key="btnDelete" onDelete={this.props.onDelete} /> : null}
                            <CancelButton key="btnCancel" />
                        </PageButtons>);
                    }
                    else {
                        pageButtons.push(<PageButtons key="pageButtons">
                            {this.props.allowSave === true ? <SaveButton key="btnSave" onClick={() => { return this.props.onSave(this.props, Forms.getForm(config.id)); }} /> : null}
                            {this.props.allowDelete === true ? <DeleteButton key="btnDelete" onDelete={this.props.onDelete} /> : null}
                            <CancelButton key="btnCancel" />
                        </PageButtons>);
                    };
                };

                if (this.props.allowFileUpload === true) {
                    if (isSuccessful(this.props.entidad)) {
                        pageChildren.push(<KontrolFileManager key="fileManager" modulo={this.props.modulo} viewMode={viewMode} />);
                        pageChildren.push(<ImageManager key="imageManager" modulo={this.props.modulo} viewMode={viewMode} />);
                    }
                }
            };

            let entityData: any = {
                entidad: this.props.entidad,
                entityType: this.props.entityType,
                data: this.props.data,
            };
            if (this.props.id !== getData(this.props.entityType)) {
                entityData = {
                    entidad: createDefaultStoreObject({}),
                    entityType: createSuccessfulStoreObject(this.props.id),
                    data: createDefaultStoreObject([])
                };
            };

            let children: any;
            if (this.props.pageMode === PageMode.Principal) {
                children = <page.mainSection key="mainSection">{pageChildren}</page.mainSection>;
            }
            else {
                children = pageChildren;
            };
            //console.log(pageButtons)
            return <Base$Page
                {...this.props}
                {...entityData}
                id={this.props.id}
                modulo={this.props.modulo}
                slots={this.props.slots}
                config={config}
                pageLink={pageLink}
                changePage={this.props.changePage}>
                <PageBar>
                    <Column lg={12} md={12} sm={12} xs={12}>
                        <PageTitle title={title.title} subTitle={title.subTitle}>
                            {title.children}
                        </PageTitle>
                        <Breadcrumb idPage={config.id} idModulo={this.props.modulo} pageMode={this.props.pageMode} data={this.props.breadcrumb} />
                    </Column>
                    <div className="page-bar-buttons">
                        {pageButtons && pageButtons.length > 0 ? pageButtons.reverse() : null}
                    </div>
                </PageBar>
                <Grid className="page-section">
                    <Acciones$Panel></Acciones$Panel>
                    {children}
                </Grid>
                <QuickSidebarPanel pageMode={this.props.pageMode}>
                    {pageInfo}
                </QuickSidebarPanel>
            </Base$Page>;
        };
    };
    /* 
                     
     */
    //{pageFilters} 
    class $dxTable extends React.Component<IProps, IProps> {
        constructor(props: page.IProps) {
            super(props);
        };

        render(): JSX.Element {
            //console.log(this.props.id, this.props.idLoader, this.props.idLoaded)
            return <Row>
                <div ><Column size={[12, 12, 12, 12]}>


                    <div id={this.props.idLoader} style={{ display: 'none' }}>
                        <Updating text="" />
                    </div>

                    <div id={this.props.idLoaded} style={{ background: '#fff', display: 'inherit' }}>

                        <div id={this.props.id} style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                        </div>
                    </div>

                </Column>
                </div>
            </Row>;
        };
    };

    class $dxGridTable extends React.Component<IProps, IProps> {
        constructor(props: page.IProps) {
            super(props);
        };

        render(): JSX.Element {
            //console.log(this.props.id, this.props.idLoader, this.props.idLoaded)
            return <page.OptionSection
                //id={UBICACION_CLIENTE_DETALLE_ID}
                //parent={config.id}
                title={this.props.title}
                level={1}
                icon="fa fa-table" collapsed={false} hideCollapseButton={true}>
                <Row>
                    <div style={{ marginTop: '10px' }}><Column size={[12, 12, 12, 12]}>


                        <div id={'_loader_' + this.props.id} style={{ display: 'none' }}>
                            <Updating text="" />
                        </div>

                        <div id={'_loaded_' + this.props.id} style={{ background: '#fff', display: 'none' }}>
                            <div id={this.props.id} style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                            </div>
                        </div>

                    </Column>
                    </div>
                </Row>
            </page.OptionSection>


        };
    };

    interface ITagsFraccionamientosCustomProps extends EK.UX.DropDownLists.IDropDrownListProps {
        plaza?: DataElement;
        proyecto?: DataElement;
        itemsSeleccionados?: any;
        itemsTotalList?: any;
        itemsFixed?: any;
        inDashboardCalendar?: any
        vocaciones?: any
    };


    export const TagsFraccionamientosPlazaVV = global.connect(class extends React.Component<ITagsFraccionamientosCustomProps, {}> {
        static props: any = (state: any) => {
            
            var retValue: any = page.props(state);
            //console.log(retValue.config.id)
            retValue.items = state.global["tags$fraccionamientos$filteredLists"];
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);
            retValue.itemsSeleccionados = state.global.ItemSeleccionadoDLLFracc;
            retValue.itemsTotalList = state.global.ItemsTotalList;
            return retValue;
        };
        static defaultProps: ITagsFraccionamientosCustomProps = {
            id: "TagsFraccionamientos",
            label: "Fraccionamientos",
            helpLabel: "Seleccione los fraccionamientos",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            mode: 1,
            matchers: ["Clave", "Nombre"]

        };

        ClearAllLists(IdForm?) {
            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', []);
            dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`, null);
            dispatchSuccessful("load::ItemsTotalList", null);
            if (IdForm) {
                Forms.updateFormElement(IdForm, this.props.id, null);
            }
            this.changeFocusContainer('main-tag-container', 'error');
        }
        
        componentWillReceiveProps(nextProps: ITagsFraccionamientosCustomProps, { }): void {
            let actualizarFraccionamiento: any = 0;
            if (global.getData(nextProps.plaza).ID != global.getData(this.props.plaza).ID) {
                actualizarFraccionamiento = 1;
                //console.log('cambiar plaza')
            };

            if (actualizarFraccionamiento === 1) {
                let idPlaza: any = getData(nextProps.plaza).ID;
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idPlaza != undefined) {
                    //console.log(this.props)
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza });
                    
                    this.ClearAllLists(idForm);
                    this.changeFocusContainer('main-tag-container', 'error')
                    global.asyncGet("base/kontrol/fraccionamientos/all/" + encodedParams, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                data.unshift({ Clave: '-2', Nombre: 'TODOS' });
                                dispatchSuccessful("load::tags$fraccionamientos$filteredLists", data);
                                dispatchSuccessful("load::ItemsTotalList", data);
                                let elementos = document.getElementsByClassName('item-container-ek-custom');
                                if (data && data.length > 0) {
                                    this.changeFocusContainer('main-tag-container', 'success')
                                    let first = [{ Clave: '-2', Nombre: 'TODOS' }]
                                    dispatchSuccessful('load::ItemSeleccionadoDLLFracc', first)
                                    Forms.updateFormElement(idForm, this.props.id, first);
                                }           
                                break;
                            case AsyncActionTypeEnum.loading:
                               // Forms.updateFormElement(idForm, this.props.id, []);
                               break;
                        }
                    });
                   
                };
                
                
            };

            if (global.isSuccessful(nextProps.itemsFixed)) {
                if (hasChanged(this.props.itemsFixed, nextProps.itemsFixed)) {
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (nextProps.itemsFixed.data.length > 0) {
                        dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`, nextProps.itemsFixed.data);
                        dispatchSuccessful("load::ItemsTotalList", nextProps.itemsFixed.data);
                        let todosItem = nextProps.itemsFixed.data.filter(x => x.Nombre === 'TODOS');
                        dispatchSuccessful('load::ItemSeleccionadoDLLFracc', todosItem);
                    } else {
                        this.ClearAllLists()
                       
                    }
                }
            }

            if (global.isSuccessful(nextProps.itemsTotalList)) {
                if (global.hasChanged(this.props.itemsTotalList, nextProps.itemsTotalList)) {
                    let existeItemTodos: boolean = false;
                    //AL CARGAR LOS NUEVOS ITEMS, SI LA LISTA ES MAYOR A CERO CAMBIAR BORDER A COLOR SUCCESS
                    if (nextProps.itemsTotalList && nextProps.itemsTotalList.data.length > 0) {
                        this.changeFocusContainer('main-tag-container', 'success')
                    }

                }
            }

        };
        shouldComponentUpdate(nextProps: ITagsFraccionamientosCustomProps, { }): boolean {
            return hasChanged(this.props.itemsTotalList, nextProps.itemsTotalList) ||
                hasChanged(this.props.plaza, nextProps.plaza) ||
                hasChanged(this.props.itemsSeleccionados, nextProps.itemsSeleccionados) ||
                hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.itemsFixed, nextProps.itemsFixed)
        };

        componentWillUnmount() {

            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', null);
           

            //dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`, null);
            //dispatchSuccessful("load::ItemsTotalList", null);
        }

        componentDidMount() {
            let total = global.getStoreData('ItemsTotalList');
            if (total && total !== null && total.length > 0) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                //let todosItem = total.filter(x => x.Nombre === 'TODOS');
                this.changeFocusContainer('main-tag-container', 'success')
                let first = [{ Clave: '-2', Nombre: 'TODOS' }]
                dispatchSuccessful('load::ItemSeleccionadoDLLFracc', first)
                Forms.updateFormElement(idForm, this.props.id, first);
            }
        }

        loadItems(items, selected) {
            let cont = document.getElementById('arraydata-box');
            if (!items || items === null || items === undefined ||  !items.data || items.data.length === 0) {
                
                if (cont) {
                    cont.style.borderColor = '#e74c3c';
                }
                return <span className="item-container-ek-custom noresult" key={"tag_key_nd" } >
                    No se encontraron resultados
                </span> ;
            }
            
            const elementos = items.data.map((d, index) => {
                let classSel = "";
                if (selected && selected.data && selected.data.length > 0) {
                    classSel = selected.data.filter(x => x.Clave === d.Clave)[0] !== undefined ? ' item-ek-selected' : ''
                }
               return (d.Clave && d.Clave !== '-2' ?
                   <span className={"item-container-ek-custom" + classSel} key={"tag_key_" + d.Clave} id={'item_tag_' + d.Clave} onMouseDown={() => this.AddToSelectedItems(d)}>
                        <span className="badge badge-success bold">{d.Clave}</span>
                        <span className=" bold"> {d.Nombre}</span>
                    </span> :
                   <span className={"item-container-ek-custom" + classSel} key={"tag_key_" + d.Clave} id={'item_tag_' + d.Clave} onMouseDown={() => this.AddToSelectedItems(d)}>
                        <span className="badge badge-success bold">{d.Nombre}</span>
                    </span>)
            });
            if (cont) {
                cont.style.borderColor = '#27A4B0';
            }
            return elementos
        }

        loadSelectedItems(selected, items) {
            if (!selected || selected === undefined || selected === null || selected.data.length === 0) {
                return null;
            }
            const elementos = selected.data.map((d, index) =>  (
                    d.Clave && d.Clave !== '-2' ?
                        <span className="col custom-selected-tag-ek"  key={"sel_tag_key_" + d.Clave}>
                            <span className="delItemIcon" onClick={() => this.DeleteFromSelectedItem(d)}><i className="fas fa-times"></i> </span>
                            <span className="badge badge-success bold">{d.Clave}</span>
                        </span> :
                        <span className="col custom-selected-tag-ek"  key={"sel_tag_key_" + d.Clave}>
                            <span className="delItemIcon" onClick={() => this.DeleteFromSelectedItem(d)}><i className="fas fa-times"></i> </span>
                            <span className="badge badge-success bold">{d.Nombre}</span>
                        </span>
                )
            );
            return elementos
        }

        changeFocusContainer(ID, tipo) {
            let container = document.getElementById(ID);
            let icon1 = document.getElementById("icon-1st");
            let icon2 = document.getElementById("icon-2nd");
            if (container) {
                switch (tipo) {
                    case 'error':
                        container.style.border = '1px solid #e74c3c';
                        icon1.style.color = "#E73D4A";
                        icon2.style.color = "#E73D4A";
                        icon1.classList.remove('fa-check');
                        icon1.classList.add('fa-exclamation')
                        break;
                    case 'success':
                        container.style.border = '1px solid #27A4B0';
                        icon1.style.color = "#26C281";
                        icon2.style.color = "#26C281";
                        icon1.classList.remove('fa-exclamation');
                        icon1.classList.add('fa-check')
                        
                        break;
                }
            }
        }
        DeleteFromSelectedItem(item) {
            let seleccionados = this.props.itemsSeleccionados;
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            seleccionados = seleccionados ? seleccionados.data : [];
            seleccionados = seleccionados.filter(x => x.Clave !== item.Clave);
            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', seleccionados);
            if (this.props.inDashboardCalendar) {
                if (seleccionados.length > 0) {
                    let fraccString = seleccionados.map(x => x.Clave).join(',');
                    console.log(fraccString)
                    dispatchSuccessful('load::fSeleccionado', fraccString);
                } else {
                    dispatchSuccessful('load::fSeleccionado', '');
                }
                
            }
            if (seleccionados.length <= 0) {
                this.changeFocusContainer('main-tag-container', 'error')
                Forms.updateFormElement(idForm, this.props.id, null);
            } else {
                Forms.updateFormElement(idForm, this.props.id, seleccionados);
            }

        }

        AddToSelectedItems(item) {
            let seleccionados = this.props.itemsSeleccionados;
            let totalItems = this.props.items;
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

            seleccionados = seleccionados ? seleccionados.data : [];
            if (seleccionados.length === 0) {
                seleccionados.push(item);
            } else {
                let isInArray = seleccionados.filter(x => x.Clave === item.Clave)[0] !== undefined ? true : false;
                if (!isInArray) {
                    seleccionados.push(item);
                }
            }
            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', seleccionados);
            if (this.props.inDashboardCalendar) {
                let fraccString = seleccionados.map(x => x.Clave).join(',');
                dispatchSuccessful('load::fSeleccionado', fraccString);
            }
            Forms.updateFormElement(idForm, this.props.id, seleccionados);
            if (seleccionados.length === 1) {
                this.changeFocusContainer('main-tag-container', 'success')
            }
        }

        openFraccList() {
            let el = document.getElementById('arraydata-box');
            el.style.visibility = 'visible';
        }

        closeFraccList() {
            let el = document.getElementById('arraydata-box');
            el.style.visibility = 'hidden';
            let input: any = document.getElementById('searchItems');
            input.value = null;
            let items = EK.Store.getState().global.ItemsTotalList;
            if (items && items.data && items.data.length > 0) {
                dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`, items.data);
            }
        }

        filtrarItems = (event) => {
            if (!this.props.itemsTotalList) {
                return;
            }
            let val = event.target.value;
            let filtrados = this.props.itemsTotalList.data.filter(x => x.Clave.toLowerCase().includes(val.toLowerCase()) || x.Nombre.toLowerCase().includes(val.toLowerCase()))
            dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`,filtrados)
        }

        render(): JSX.Element {
            //console.log(this.props)
            let items = this.loadItems(this.props.items, this.props.itemsSeleccionados);
            let itemSeleccionado = this.loadSelectedItems(this.props.itemsSeleccionados, this.props.items);
            return <Column className="custom-dropdown-ek" size={this.props.size}>
                    <h3>FRACCIONAMIENTOS <i className="fas fa-exclamation mr-2" id="icon-1st"></i><i className="fas fa-asterisk" id="icon-2nd"></i> </h3>
                    <div className="row custom-container-tag-input" id="main-tag-container">
                        {itemSeleccionado}
                        <input type="text" autoComplete="off" className="custom-input-dd col-sm-3" id="searchItems" onKeyUp={this.filtrarItems} onClick={() => this.openFraccList()} onBlur={() => this.closeFraccList()} />
                    </div>
                    <div className="array-box" id="arraydata-box">
                        <div className="array-box-container">
                            {items}
                        </div>
                    </div>
             </Column>
        };
    });

    export const TagsFraccionamientosPlazaAreasComunes = global.connect(class extends React.Component<ITagsFraccionamientosCustomProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global["tags$fraccionamientos$filteredLists"];
            retValue.plaza = Forms.getDataValue("PlazaInicial", retValue.config.id, state);
            retValue.proyecto = state.global["FRACCIONAMIENTO_Seleccionado"];;
            retValue.itemsSeleccionados = state.global.ItemSeleccionadoDLLFracc;
            retValue.itemsTotalList = state.global.ItemsTotalList;
            return retValue;
        };
        static defaultProps: ITagsFraccionamientosCustomProps = {
            id: "TagsFraccionamientos",
            label: "Fraccionamientos",
            helpLabel: "Seleccione los fraccionamientos",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            mode: 1,
            matchers: ["Clave", "Nombre"]

        };

        ClearAllLists(IdForm?) {
            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', []);
            dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`, null);
            dispatchSuccessful("load::ItemsTotalList", null);
            if (IdForm) {
                Forms.updateFormElement(IdForm, this.props.id, null);
            }
            this.changeFocusContainer('main-tag-container', 'error');
        }

        componentWillReceiveProps(nextProps: ITagsFraccionamientosCustomProps, { }): void {
            let actualizarFraccionamiento: any = 0;
            if (global.getData(nextProps.plaza).ID != global.getData(this.props.plaza).ID) {
                actualizarFraccionamiento = 1;
                console.log('cambiar plaza')
            };

            if (actualizarFraccionamiento === 1) {
                //let idPlaza: any = getData(nextProps.plaza).ID;
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                //if (idPlaza != undefined) {
                console.log('actualizar')
                this.ClearAllLists(idForm);
                //    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza });

                //    this.ClearAllLists(idForm);
                //    this.changeFocusContainer('main-tag-container', 'error')
                //    global.asyncGet("base/kontrol/fraccionamientos/all/" + encodedParams, (status: AsyncActionTypeEnum, data: any) => {
                //        switch (status) {
                //            case AsyncActionTypeEnum.successful:
                //                data.unshift({ Clave: '-2', Nombre: 'TODOS' });
                //                dispatchSuccessful("load::tags$fraccionamientos$filteredLists", data);
                //                dispatchSuccessful("load::ItemsTotalList", data);
                //                let elementos = document.getElementsByClassName('item-container-ek-custom');
                //                if (data && data.length > 0) {
                //                    this.changeFocusContainer('main-tag-container', 'success')
                //                    let first = [{ Clave: '-2', Nombre: 'TODOS' }]
                //                    dispatchSuccessful('load::ItemSeleccionadoDLLFracc', first)
                //                    Forms.updateFormElement(idForm, this.props.id, first);
                //                }
                //                break;
                //            case AsyncActionTypeEnum.loading:
                //                // Forms.updateFormElement(idForm, this.props.id, []);
                //                break;
                //        }
                //    });

                //};


            };

            if (global.isSuccessful(nextProps.proyecto)) {
                if (nextProps.proyecto.data && nextProps.proyecto.data.ID) {
                    if (hasChanged(this.props.proyecto, nextProps.proyecto)) {
                        if (this.props.proyecto === undefined && nextProps.proyecto && nextProps.proyecto.data) {
                            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                            //console.log('cambio de proyecto');
                            //console.log(this.props.proyecto);
                            //console.log(nextProps.proyecto);
                            this.getFraccionamientosByProyecto(idForm, nextProps.proyecto.data.Clave)

                        } else {
                            if (this.props.proyecto && this.props.proyecto.data) {
                                if (hasChanged(this.props.proyecto.data.ID, nextProps.proyecto.data.ID)) {
                                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                                    //console.log('cambio de proyecto');
                                    //console.log(this.props.proyecto);
                                    //console.log(nextProps.proyecto);
                                    this.getFraccionamientosByProyecto(idForm, nextProps.proyecto.data.Clave )
                                }
                            }
                           
                        }
                       
                    }
                 //   if (nextProps.proyecto.data.ID && hasChanged(this.props.proyecto.data.ID, nextProps.proyecto.data.ID)) {

                       
                   // }
                }
                
            }

            if (global.isSuccessful(nextProps.itemsFixed)) {
                if (hasChanged(this.props.itemsFixed, nextProps.itemsFixed)) {
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (nextProps.itemsFixed.data.length > 0) {
                        dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`, nextProps.itemsFixed.data);
                        dispatchSuccessful("load::ItemsTotalList", nextProps.itemsFixed.data);
                        let todosItem = nextProps.itemsFixed.data.filter(x => x.Nombre === 'TODOS');
                        dispatchSuccessful('load::ItemSeleccionadoDLLFracc', todosItem);
                    } else {
                        this.ClearAllLists()

                    }
                }
            }

            if (global.isSuccessful(nextProps.itemsTotalList)) {
                if (global.hasChanged(this.props.itemsTotalList, nextProps.itemsTotalList)) {
                    let existeItemTodos: boolean = false;
                    //AL CARGAR LOS NUEVOS ITEMS, SI LA LISTA ES MAYOR A CERO CAMBIAR BORDER A COLOR SUCCESS
                    if (nextProps.itemsTotalList && nextProps.itemsTotalList.data.length > 0) {
                        this.changeFocusContainer('main-tag-container', 'success')
                    }

                }
            }

        };


        getFraccionamientosByProyecto(idForm,cvefracc) {
                 this.ClearAllLists(idForm);
                    this.changeFocusContainer('main-tag-container', 'error')
                    //global.asyncGet("base/kontrol/fraccionamientos/all/" + encodedParams, (status: AsyncActionTypeEnum, data: any) => {
            global.asyncPost("base/kontrol/fraccionamientos/GetBP/getFraccionamientosByProyectoID", { parametros: { ClaveProyecto: cvefracc } }, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                data.unshift({ Clave: '-2', Nombre: 'TODOS' });
                                dispatchSuccessful("load::tags$fraccionamientos$filteredLists", data);
                                dispatchSuccessful("load::ItemsTotalList", data);
                                let elementos = document.getElementsByClassName('item-container-ek-custom');
                                if (data && data.length > 0) {
                                    this.changeFocusContainer('main-tag-container', 'success')
                                    let first = [{ Clave: '-2', Nombre: 'TODOS' }]
                                    dispatchSuccessful('load::ItemSeleccionadoDLLFracc', first)
                                    Forms.updateFormElement(idForm, this.props.id, first);
                                }
                                break;
                            case AsyncActionTypeEnum.loading:
                                // Forms.updateFormElement(idForm, this.props.id, []);
                                break;
                        }
                    });

        }

        shouldComponentUpdate(nextProps: ITagsFraccionamientosCustomProps, { }): boolean {
            return hasChanged(this.props.itemsTotalList, nextProps.itemsTotalList) ||
                hasChanged(this.props.plaza, nextProps.plaza) ||
                hasChanged(this.props.itemsSeleccionados, nextProps.itemsSeleccionados) ||
                hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.itemsFixed, nextProps.itemsFixed) || 
                hasChanged(this.props.proyecto, nextProps.proyecto) 
        };

        componentWillUnmount() {

            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', null);


            //dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`, null);
            //dispatchSuccessful("load::ItemsTotalList", null);
        }

        componentDidMount() {
            let total = global.getStoreData('ItemsTotalList');
            if (total && total !== null && total.length > 0) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                //let todosItem = total.filter(x => x.Nombre === 'TODOS');
                this.changeFocusContainer('main-tag-container', 'success')
                let first = [{ Clave: '-2', Nombre: 'TODOS' }]
                dispatchSuccessful('load::ItemSeleccionadoDLLFracc', first)
                Forms.updateFormElement(idForm, this.props.id, first);
            }
        }

        loadItems(items, selected) {
            let cont = document.getElementById('arraydata-box');
            if (!items || items === null || items === undefined || !items.data || items.data.length === 0) {

                if (cont) {
                    cont.style.borderColor = '#e74c3c';
                }
                return <span className="item-container-ek-custom noresult" key={"tag_key_nd"} >
                    No se encontraron resultados
                </span>;
            }

            const elementos = items.data.map((d, index) => {
                let classSel = "";
                if (selected && selected.data && selected.data.length > 0) {
                    classSel = selected.data.filter(x => x.Clave === d.Clave)[0] !== undefined ? ' item-ek-selected' : ''
                }
                return (d.Clave && d.Clave !== '-2' ?
                    <span className={"item-container-ek-custom" + classSel} key={"tag_key_" + d.Clave} id={'item_tag_' + d.Clave} onMouseDown={() => this.AddToSelectedItems(d)}>
                        <span className="badge badge-success bold">{d.Clave}</span>
                        <span className=" bold"> {d.Nombre}</span>
                    </span> :
                    <span className={"item-container-ek-custom" + classSel} key={"tag_key_" + d.Clave} id={'item_tag_' + d.Clave} onMouseDown={() => this.AddToSelectedItems(d)}>
                        <span className="badge badge-success bold">{d.Nombre}</span>
                    </span>)
            });
            if (cont) {
                cont.style.borderColor = '#27A4B0';
            }
            return elementos
        }

        loadSelectedItems(selected, items) {
            if (!selected || selected === undefined || selected === null || selected.data.length === 0) {
                return null;
            }
            const elementos = selected.data.map((d, index) => (
                d.Clave && d.Clave !== '-2' ?
                    <span className="col custom-selected-tag-ek" key={"sel_tag_key_" + d.Clave}>
                        <span className="delItemIcon" onClick={() => this.DeleteFromSelectedItem(d)}><i className="fas fa-times"></i> </span>
                        <span className="badge badge-success bold">{d.Clave}</span>
                    </span> :
                    <span className="col custom-selected-tag-ek" key={"sel_tag_key_" + d.Clave}>
                        <span className="delItemIcon" onClick={() => this.DeleteFromSelectedItem(d)}><i className="fas fa-times"></i> </span>
                        <span className="badge badge-success bold">{d.Nombre}</span>
                    </span>
            )
            );
            return elementos
        }

        changeFocusContainer(ID, tipo) {
            let container = document.getElementById(ID);
            let icon1 = document.getElementById("icon-1st");
            let icon2 = document.getElementById("icon-2nd");
            if (container) {
                switch (tipo) {
                    case 'error':
                        container.style.border = '1px solid #e74c3c';
                        icon1.style.color = "#E73D4A";
                        icon2.style.color = "#E73D4A";
                        icon1.classList.remove('fa-check');
                        icon1.classList.add('fa-exclamation')
                        break;
                    case 'success':
                        container.style.border = '1px solid #27A4B0';
                        icon1.style.color = "#26C281";
                        icon2.style.color = "#26C281";
                        icon1.classList.remove('fa-exclamation');
                        icon1.classList.add('fa-check')

                        break;
                }
            }
        }
        DeleteFromSelectedItem(item) {
            let seleccionados = this.props.itemsSeleccionados;
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            seleccionados = seleccionados ? seleccionados.data : [];
            seleccionados = seleccionados.filter(x => x.Clave !== item.Clave);
            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', seleccionados);
            if (this.props.inDashboardCalendar) {
                if (seleccionados.length > 0) {
                    let fraccString = seleccionados.map(x => x.Clave).join(',');
                    console.log(fraccString)
                    dispatchSuccessful('load::fSeleccionado', fraccString);
                } else {
                    dispatchSuccessful('load::fSeleccionado', '');
                }

            }
            if (seleccionados.length <= 0) {
                this.changeFocusContainer('main-tag-container', 'error')
                Forms.updateFormElement(idForm, this.props.id, null);
            } else {
                Forms.updateFormElement(idForm, this.props.id, seleccionados);
            }

        }

        AddToSelectedItems(item) {
            let seleccionados = this.props.itemsSeleccionados;
            let totalItems = this.props.items;
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

            seleccionados = seleccionados ? seleccionados.data : [];
            if (seleccionados.length === 0) {
                seleccionados.push(item);
            } else {
                let isInArray = seleccionados.filter(x => x.Clave === item.Clave)[0] !== undefined ? true : false;
                if (!isInArray) {
                    seleccionados.push(item);
                }
            }
            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', seleccionados);
            if (this.props.inDashboardCalendar) {
                let fraccString = seleccionados.map(x => x.Clave).join(',');
                dispatchSuccessful('load::fSeleccionado', fraccString);
            }
            Forms.updateFormElement(idForm, this.props.id, seleccionados);
            if (seleccionados.length === 1) {
                this.changeFocusContainer('main-tag-container', 'success')
            }
        }

        openFraccList() {
            let el = document.getElementById('arraydata-box');
            el.style.visibility = 'visible';
        }

        closeFraccList() {
            let el = document.getElementById('arraydata-box');
            el.style.visibility = 'hidden';
            let input: any = document.getElementById('searchItems');
            input.value = null;
            let items = EK.Store.getState().global.ItemsTotalList;
            if (items && items.data && items.data.length > 0) {
                dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`, items.data);
            }
        }

        filtrarItems = (event) => {
            if (!this.props.itemsTotalList) {
                return;
            }
            let val = event.target.value;
            let filtrados = this.props.itemsTotalList.data.filter(x => x.Clave.toLowerCase().includes(val.toLowerCase()) || x.Nombre.toLowerCase().includes(val.toLowerCase()))
            dispatchSuccessful(`load::tags$fraccionamientos$filteredLists`, filtrados)
        }

        render(): JSX.Element {
            //console.log(this.props)
            let items = this.loadItems(this.props.items, this.props.itemsSeleccionados);
            let itemSeleccionado = this.loadSelectedItems(this.props.itemsSeleccionados, this.props.items);
            return <Column className="custom-dropdown-ek" size={this.props.size}>
                <h3>ETAPAS <i className="fas fa-exclamation mr-2" id="icon-1st"></i><i className="fas fa-asterisk" id="icon-2nd"></i> </h3>
                <div className="row custom-container-tag-input" id="main-tag-container">
                    {itemSeleccionado}
                    <input type="text" autoComplete="off" className="custom-input-dd col-sm-3" id="searchItems" onKeyUp={this.filtrarItems} onClick={() => this.openFraccList()} onBlur={() => this.closeFraccList()} />
                </div>
                <div className="array-box" id="arraydata-box">
                    <div className="array-box-container">
                        {items}
                    </div>
                </div>
            </Column>
        };
    });

    const enum TipoLista {
        Full,
        Filtered,
         
        Selected
    }

    export const TagsFraccionamientosPlaza2DC = global.connect(class extends React.Component<ITagsFraccionamientosCustomProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global["tags$fraccionamientosDC$filteredLists"];
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);
            retValue.itemsSeleccionados = state.global.ItemSeleccionadoDLLFraccDC;
            retValue.itemsTotalList = state.global.ItemsTotalListDC;
            return retValue;
        };
        static defaultProps: ITagsFraccionamientosCustomProps = {
            id: "TagsFraccionamientos",
            label: "Fraccionamientos",
            helpLabel: "Seleccione los fraccionamientos",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            mode: 1,
            matchers: ["Clave", "Nombre"]

        };

        nameAction(tipo: TipoLista) {
            let action = 'load::';
            switch (tipo) {
                case TipoLista.Full: action += 'ItemsTotalListDC';
                    break;
                case TipoLista.Filtered: action += 'tags$fraccionamientosDC$filteredLists';
                    break;
                case TipoLista.Selected: action += 'ItemSeleccionadoDLLFraccDC';
                    break;
            }
            return action;
        }

        ClearAllLists(IdForm?) {
            dispatchSuccessful(this.nameAction(TipoLista.Selected), []);
            dispatchSuccessful(this.nameAction(TipoLista.Filtered), null);
            dispatchSuccessful(this.nameAction(TipoLista.Full), null);
            if (IdForm) {
                Forms.updateFormElement(IdForm, this.props.id, null);
            }
            this.changeFocusContainer('main-tag-container-dc', 'error');
        }

        componentWillReceiveProps(nextProps: ITagsFraccionamientosCustomProps, { }): void {
            let actualizarFraccionamiento: any = 0;
            if (global.getData(nextProps.plaza).ID != global.getData(this.props.plaza).ID) {
                actualizarFraccionamiento = 1;
                //console.log('cambiar plaza')
            };

            if (actualizarFraccionamiento === 1) {
                let idPlaza: any = getData(nextProps.plaza).ID;
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idPlaza != undefined) {
                    console.log(this.props)
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza });

                    this.ClearAllLists(idForm);
                    this.changeFocusContainer('main-tag-container-dc', 'error')
                    global.asyncGet("base/kontrol/fraccionamientos/all/" + encodedParams, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                dispatchSuccessful(this.nameAction(TipoLista.Filtered), data);
                                dispatchSuccessful(this.nameAction(TipoLista.Full), data);
                                //let elementos = document.getElementsByClassName('item-container-ek-custom');
                                if (data && data.length > 0) {
                                    console.log(idForm)
                                    console.log(this.props.id)
                                    this.changeFocusContainer('main-tag-container-dc', 'success')
                                    let first = [{ Clave: '-2', Nombre: 'TODOS' }]
                                    dispatchSuccessful(this.nameAction(TipoLista.Selected), first)
                                    Forms.updateFormElement(idForm, this.props.id, first);
                                }
                                break;
                            case AsyncActionTypeEnum.loading:
                                // Forms.updateFormElement(idForm, this.props.id, []);
                                break;
                        }
                    });

                };


            };

            if (global.isSuccessful(nextProps.itemsFixed)) {
                if (hasChanged(this.props.itemsFixed, nextProps.itemsFixed)) {
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (nextProps.itemsFixed.data.length > 0) {
                        dispatchSuccessful(this.nameAction(TipoLista.Filtered), nextProps.itemsFixed.data);
                        dispatchSuccessful(this.nameAction(TipoLista.Full), nextProps.itemsFixed.data);
                        let todosItem = nextProps.itemsFixed.data.filter(x => x.Nombre === 'TODOS');
                        dispatchSuccessful(this.nameAction(TipoLista.Selected), todosItem);
                    } else {
                        this.ClearAllLists()

                    }
                }
            }

            if (global.isSuccessful(nextProps.itemsTotalList)) {
                if (global.hasChanged(this.props.itemsTotalList, nextProps.itemsTotalList)) {
                    let existeItemTodos: boolean = false;
                    //AL CARGAR LOS NUEVOS ITEMS, SI LA LISTA ES MAYOR A CERO CAMBIAR BORDER A COLOR SUCCESS
                    if (nextProps.itemsTotalList && nextProps.itemsTotalList.data.length > 0) {
                        this.changeFocusContainer('main-tag-container-dc', 'success')
                    }

                }
            }

        };
        shouldComponentUpdate(nextProps: ITagsFraccionamientosCustomProps, { }): boolean {
            return hasChanged(this.props.itemsTotalList, nextProps.itemsTotalList) ||
                hasChanged(this.props.plaza, nextProps.plaza) ||
                hasChanged(this.props.itemsSeleccionados, nextProps.itemsSeleccionados) ||
                hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.itemsFixed, nextProps.itemsFixed)
        };

        componentWillUnmount() {

            dispatchSuccessful(this.nameAction(TipoLista.Selected), null);
            dispatchSuccessful(this.nameAction(TipoLista.Filtered), null);
            dispatchSuccessful(this.nameAction(TipoLista.Full), null);
        }

        loadItems(items, selected) {
            let cont = document.getElementById('arraydata-box-dc');
            if (!items || items === null || items === undefined || !items.data || items.data.length === 0) {

                if (cont) {
                    cont.style.borderColor = '#e74c3c';
                }
                return <span className="item-container-ek-custom noresult" key={"tag_key_nd"} >
                    No se encontraron resultados
                </span>;
            }

            const elementos = items.data.map((d, index) => {
                let classSel = "";
                if (selected && selected.data && selected.data.length > 0) {
                    classSel = selected.data.filter(x => x.Clave === d.Clave)[0] !== undefined ? ' item-ek-selected' : ''
                }
                return (d.Clave && d.Clave !== '-2' ?
                    <span className={"item-container-ek-custom" + classSel} key={"tag_key_" + d.Clave} id={'item_tag_' + d.Clave} onMouseDown={() => this.AddToSelectedItems(d)}>
                        <span className="badge badge-success bold">{d.Clave}</span>
                        <span className=" bold"> {d.Nombre}</span>
                    </span> :
                    <span className={"item-container-ek-custom" + classSel} key={"tag_key_" + d.Clave} id={'item_tag_' + d.Clave} onMouseDown={() => this.AddToSelectedItems(d)}>
                        <span className="badge badge-success bold">{d.Nombre}</span>
                    </span>)
            });
            if (cont) {
                cont.style.borderColor = '#27A4B0';
            }
            return elementos
        }

        loadSelectedItems(selected, items) {
            if (!selected || selected === undefined || selected === null || selected.data.length === 0) {
                return null;
            }
            const elementos = selected.data.map((d, index) => (
                d.Clave && d.Clave !== '-2' ?
                    <span className="col custom-selected-tag-ek" key={"sel_tag_key_" + d.Clave}>
                        <span className="delItemIcon" onClick={() => this.DeleteFromSelectedItem(d)}><i className="fas fa-times"></i> </span>
                        <span className="badge badge-success bold">{d.Clave}</span>
                    </span> :
                    <span className="col custom-selected-tag-ek" key={"sel_tag_key_" + d.Clave}>
                        <span className="delItemIcon" onClick={() => this.DeleteFromSelectedItem(d)}><i className="fas fa-times"></i> </span>
                        <span className="badge badge-success bold">{d.Nombre}</span>
                    </span>
            )
            );
            return elementos
        }

        changeFocusContainer(ID, tipo) {
            let container = document.getElementById(ID);
            let icon1 = document.getElementById("icon-1st-dc");
            let icon2 = document.getElementById("icon-2nd-dc");
            if (container) {
                switch (tipo) {
                    case 'error':
                        container.style.border = '1px solid #e74c3c';
                        icon1.style.color = "#E73D4A";
                        icon2.style.color = "#E73D4A";
                        icon1.classList.remove('fa-check');
                        icon1.classList.add('fa-exclamation')
                        break;
                    case 'success':
                        container.style.border = '1px solid #27A4B0';
                        icon1.style.color = "#26C281";
                        icon2.style.color = "#26C281";
                        icon1.classList.remove('fa-exclamation');
                        icon1.classList.add('fa-check')

                        break;
                }
            }
        }
        DeleteFromSelectedItem(item) {
            let seleccionados = this.props.itemsSeleccionados;
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            seleccionados = seleccionados ? seleccionados.data : [];
            seleccionados = seleccionados.filter(x => x.Clave !== item.Clave);
            dispatchSuccessful(this.nameAction(TipoLista.Selected), seleccionados);
            if (this.props.inDashboardCalendar) {
                if (seleccionados.length > 0) {
                    let fraccString = seleccionados.map(x => x.Clave).join(',');
                    console.log(fraccString)
                    dispatchSuccessful('load::fSeleccionado', fraccString);
                } else {
                    dispatchSuccessful('load::fSeleccionado', '');
                }

            }
            if (seleccionados.length <= 0) {
                this.changeFocusContainer('main-tag-container-dc', 'error')
                Forms.updateFormElement(idForm, this.props.id, null);
            } else {
                Forms.updateFormElement(idForm, this.props.id, seleccionados);
            }

        }

        AddToSelectedItems(item) {
            let seleccionados = this.props.itemsSeleccionados;
            let totalItems = this.props.items;
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

            seleccionados = seleccionados ? seleccionados.data : [];
            if (seleccionados.length === 0) {
                seleccionados.push(item);
            } else {
                let isInArray = seleccionados.filter(x => x.Clave === item.Clave)[0] !== undefined ? true : false;
                if (!isInArray) {
                    seleccionados.push(item);
                }
            }
            dispatchSuccessful(this.nameAction(TipoLista.Selected), seleccionados);
            if (this.props.inDashboardCalendar) {
                let fraccString = seleccionados.map(x => x.Clave).join(',');
                dispatchSuccessful('load::fSeleccionado', fraccString);
            }
            Forms.updateFormElement(idForm, this.props.id, seleccionados);
            if (seleccionados.length === 1) {
                this.changeFocusContainer('main-tag-container-dc', 'success')
            }
        }

        openFraccList() {
            let el = document.getElementById('arraydata-box-dc');
            el.style.visibility = 'visible';
        }

        closeFraccList() {
            let el = document.getElementById('arraydata-box-dc');
            el.style.visibility = 'hidden';
            let input: any = document.getElementById('searchItems-dc');
            input.value = null;
            let items = EK.Store.getState().global.ItemsTotalList;
            if (items && items.data && items.data.length > 0) {
                dispatchSuccessful(this.nameAction(TipoLista.Filtered), items.data);
            }
        }

        filtrarItems = (event) => {
            if (!this.props.itemsTotalList) {
                return;
            }
            let val = event.target.value;
            let filtrados = this.props.itemsTotalList.data.filter(x => x.Clave.toLowerCase().includes(val.toLowerCase()) || x.Nombre.toLowerCase().includes(val.toLowerCase()))
            dispatchSuccessful(this.nameAction(TipoLista.Filtered), filtrados)
        }

        render(): JSX.Element {
            //console.log(this.props)
            let items = this.loadItems(this.props.items, this.props.itemsSeleccionados);
            let itemSeleccionado = this.loadSelectedItems(this.props.itemsSeleccionados, this.props.items);
            return <Column className="custom-dropdown-ek" size={this.props.size}>
                <h3>FRACCIONAMIENTOS <i className="fas fa-exclamation mr-2" id="icon-1st-dc"></i><i className="fas fa-asterisk" id="icon-2nd-dc"></i> </h3>
                <div className="row custom-container-tag-input" id="main-tag-container-dc">
                    {itemSeleccionado}
                    <input type="text" autoComplete="off" className="custom-input-dd col-sm-3" id="searchItems-dc" onKeyUp={this.filtrarItems} onClick={() => this.openFraccList()} onBlur={() => this.closeFraccList()} />
                </div>
                <div className="array-box" id="arraydata-box-dc">
                    <div className="array-box-container">
                        {items}
                    </div>
                </div>
            </Column>
        };
    });

    export class FraccionamientosSingle$DDL extends React.Component<ITagsFraccionamientosCustomProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.fraccSeleccionado,
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);
            return retValue;
        };

        static defaultProps: IDropDrownListProps = {
            id: "FraccionamientosGeo",
            items: createDefaultStoreObject([]),
            label: "Fraccionamientos",
            helpLabel: "Seleccione el fraccionamiento.",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): any {
            dispatchSuccessful("load::fSeleccionado", '-2');
        }

        componentWillReceiveProps(nextProps: ITagsFraccionamientosCustomProps, nextState: ITagsFraccionamientosCustomProps): void {
            if (global.hasChanged(this.props.plaza, nextProps.plaza)) {
                if ((getData(nextProps.plaza).ID != getData(this.props.plaza).ID)) {
                    let idPlaza: any = getData(nextProps.plaza).ID;
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

                    Forms.updateFormElement(idForm, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2 });
                    let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;
                    if (idPlaza != undefined) {
                        dispatchAsync("load::fraccSeleccionado", encodedURL);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: ITagsFraccionamientosCustomProps, nextState: ITagsFraccionamientosCustomProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            ////////
            if (global.isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    };
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    };
                };
            };
            ///////
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} /*addNewItem={"SO"} addNewItemText={"Indique el Fraccionamiento"}  */ />;
        };
    };
    export const FraccionamientosSingleDDL: any = ReactRedux.connect(FraccionamientosSingle$DDL.props, null)(FraccionamientosSingle$DDL);

   
    class $View extends React.Component<IProps, IProps> {
        constructor(props: page.IProps) {
            super(props);
        };
        render(): JSX.Element {
            if (!page.canViewReadMode(this.props.state)) {
                return null;
            };
            return <PanelUpdate info={this.props.entidad}>
                <FadeInColumn>
                    {this.props.children}
                </FadeInColumn>
            </PanelUpdate>;
        };
    };
    class $Edit extends React.Component<IProps, IProps> {
        constructor(props: page.IProps) {
            super(props);
        };
        render(): JSX.Element {
            if (!page.canViewEditMode(this.props.state)) {
                return null;
            };
            return <PanelUpdate info={this.props.entidad}>
                <FadeInColumn>
                    {this.props.children}
                </FadeInColumn>
            </PanelUpdate>;
        };
    };
    export class PageBar extends React.Component<{}, {}> {
        onBack(): void {
            ReactRouter.hashHistory.goBack();
        }

        onForward(): void {
            ReactRouter.hashHistory.goForward();
        }

        componentDidMount(): void {
            let w: any = $(window);
            let fix: () => void = (): void => {
                if ($(".page-title-row-fixed").size() > 0) {
                    $(".page-title-row-fixed").css("width", (w.width() - 75) + "px");
                } else {
                    $(".page-title-row").css("width", "");
                };
            };

            fix();
            w.on("scroll", (e: any) => {
                //fix();
                $(".page-title-row").toggleClass("page-title-row-fixed", w.scrollTop() > 50);
            });

            w.resize(() => {
                //fix();
            });
        };

        componentWillUnmount(): void {
            $(window).unbind("scroll");
            $(window).unbind("resize");
        };

        render(): JSX.Element {
            return <div className="page-bar page-title-row">
                {this.props.children}
            </div>;
        }
    }
    export const pageScroll: (selector: string) => void = (selector: string): void => {
        let target: JQuery = $(selector);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500, 'swing');
        }
    }
    export const PageTitle = global.connect(class extends React.Component<IPageTitleProps, {}> {
        constructor(props: IPageTitleProps) {
            super(props);

            this.getTitle = this.getTitle.bind(this);
        };
        //
        static props: any = (state: any) => ({
            state: state.global.currentEntityState
        });
        //
        getTitle(): any {
            let retValue: any = null;
            let state: any = getData(this.props.state);

            if (state.title) {
                retValue = state.title;
            }
            else if (this.props.title && this.props.title !== null) {
                if (typeof this.props.title === "string") {
                    retValue = { title: this.props.title, subTitle: null, children: null };
                } else {
                    retValue = this.props.title;
                };
            };

            return retValue;
        };
        componentDidUpdate(nextProps: IPageTitleProps) {
            let t: any = this.getTitle();

            if (t !== null) {
                document.title = t.title;
            }
            else {
                document.title = "";
            };
        };
        componentDidMount(): void {
            let t: any = this.getTitle();

            if (t !== null) {
                document.title = t.title;
            }
            else {
                document.title = "";
            };
        };
        componentDidUnMount(): void {
            document.title = "";
        };
        render(): JSX.Element {
            let title: any = this.getTitle();

            if (title === null) {
                return null;
            };

            return <h3 className="page-title">
                {title.title}
                {title.subTitle ? <span>&nbsp;</span> : null}
                {title.subTitle ? <small style={{ marginRight: 10 }}>{title.subTitle}</small> : null}
                <span>{title.children}</span>
            </h3>;
        };
    });
    export class PageToolbar extends React.Component<{}, {}> {
        componentDidMount(): void {
            let w: any = $(window);
            let fix: () => void = (): void => {
                if ($(".page-title-row-fixed").size() > 0) { 
                    $(".page-title-row-fixed").css("width", (w.width() - 75) + "px");
                } else {
                    $(".page-title-row").css("width", "");
                };
            };

            fix();
            w.on("scroll", (e: any) => {
                //fix();
                $(".page-title-row").toggleClass("page-title-row-fixed", w.scrollTop() > 50);
            });

            w.resize(() => {
                //fix();
            });
        };

        componentWillUnmount(): void {
            $(window).unbind("scroll");
            $(window).unbind("resize");
        };

        render(): JSX.Element {
            return <Row className="page-title-row">
                {this.props.children}
            </Row>;
        };
    };
    export class PageSection extends React.Component<{ text: string }, {}>{
        render(): JSX.Element {
            return <Column size={[12, 12, 12, 12]}><h3
                className="form-section"
                style={{
                    margin: "30px 0",
                    paddingBottom: "5px",
                    borderBottom: "1px solid #e7ecf1",
                    color: "#26a1ab"
                }}
                >{this.props.text}</h3></Column>;
        }
    };    
    export class $OptionSection extends React.Component<IOptionSectionProps, IOptionSectionState> {
        constructor(props: IOptionSectionProps) {
            super(props);

            this.getML = this.getML.bind(this);
            this.onCollapse = this.onCollapse.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onSave = this.onSave.bind(this);

            if (this.props.collapsed === true) {
                this.state = { loadContent: false };
            }
            else {
                this.state = { loadContent: true };
            };
        };
        //
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        //
        static defaultProps: IOptionSectionProps = {
            readOnly: null,
            loading: false,
            inlineEdit: false,
            inlineNew: false,
            title: "",
            subTitle: "",
            collapsed: true,
            visible: true,
            level: "0",
            hideCollapseButton: false,
            autonomo: false,
        };

        refs: {
            tabContainer: Element;
        };
        getML(): any {
            let id: string = this.props.id;
            let config: page.IPageConfig = this.props.config;
            let retValue: any;

            try {
                let mlKey: string = id;

                retValue = $ml[config.id].sections[mlKey];
                if (!retValue) {
                    retValue = {};
                };
            }
            catch (e) {
                retValue = {};
            };

            return retValue;
        };
        onCollapse(collapsed: boolean): void {
            if (this.props.onCollapse) {
                this.props.onCollapse(collapsed);
            };

            if (this.state.loadContent === false && collapsed === true) {
                this.setState({ loadContent: true });
            };
        };
        onCancel(): void {
            if (this.props.onCancel) {
                this.props.onCancel();
            };
        };
        onSave(): void {
            if (this.props.onSave) {
                this.props.onSave();
            };
        };
        componentWillMount(): any {
            if (this.props.id) {
                this.props.config.setState({ viewMode: true }, this.props.id);
            };
        };
        componentWillReceiveProps(nextProps: IOptionSectionProps): void {
        }
        render(): JSX.Element {
            if (this.props.visible !== true) {
                return null;
            };

            let className: string = "panel panel-primary";
            let titleClassName: string = "caption";
            let subTitleClassName: string = "";
            let readOnly: boolean = this.props.readOnly;
            let collapsedClassName: string = this.props.collapsed ? "collapsed" : "";
            let editMode: boolean = this.props.editMode;

            let state: DataElement;
            if (this.props.id) {
                state = this.props.config.getState(this.props.id);
                if (isSuccessful(state) && getData(state).viewMode !== undefined) {
                    editMode = !(getData(state).viewMode === true);
                };
            };

            if (this.props.readOnly === true || this.props.readOnly === false) {
                if (this.props.id) {
                    let permiso: number = getOptionPermissionValue(this.props.id);

                    if (permiso !== null) {
                        if (this.props.readOnly === null) {
                            if (permiso === EK.UX.Auth.READ_PERMISSION) {
                                readOnly = true;
                            } else if (permiso >= EK.UX.Auth.WRITE_PERMISSION) {
                                readOnly = false;
                            }
                        } else {
                            if (this.props.readOnly === true && permiso >= EK.UX.Auth.READ_PERMISSION) {
                                readOnly = true;
                            } else if (this.props.readOnly === false && permiso >= EK.UX.Auth.WRITE_PERMISSION) {
                                readOnly = false;
                            }
                        }
                    }

                    if (readOnly === null) {
                        return null;
                    }
                } else {
                    readOnly = true;
                }
            }

            className = "panel panel-main " + (this.props.inverse === true ? "bg-inverse " : " ") + collapsedClassName;
            titleClassName = "caption panel-sub" + this.props.level;
            subTitleClassName = "caption-helper";

            let pageButtons: any[] = [];
            let pageChildren: any[] = [];
            let pageView: any = null;
            let pageEdit: any = null;
            let sectionButtons: any;
            let buttons: any[] = [];
            let optionMode: any = null;
            let title: any = this.props.title;
            let subTitle: any = this.props.subTitle;
            let optionML: any = this.getML();

            if (!title) {
                title = optionML.title;
            }
            else {
                if (title.constructor.name === "Function") {
                    title = title(this.props.config.getEntity(this.props.id));
                };
            };

            React.Children.forEach(this.props.children, (child: any, index: number): any => {
                if (child) {
                    if (child.props.$displayName === "SectionButtons") {
                        if (child && child.props && child.props.children) {
                            if (child.props.children.length > 0) {
                                child.props.children.forEach((value: any, index: number) => {
                                    buttons.push(value);
                                });
                            } else {
                                buttons.push(child.props.children);
                            };
                        };
                    } else if (child.props.$displayName === "SectionEdit") {
                        if (editMode === true) {
                            if (child.props.title !== undefined && child.props.title !== null) {
                                subTitle = <small className={subTitleClassName} style={{ marginLeft: 10 }}>{child.props.title}</small>;
                            };

                            if (child.props.getButtons) {
                                let $buttons: any[] = child.props.getButtons(this.props.id, child.props);

                                if ($buttons && $buttons.length > 0) {
                                    $buttons.forEach((value: any, index: number) => {
                                        buttons.push(value);
                                    });
                                };
                            };

                            //pageChildren.push(child);                        
                            //optionMode = "portlet-edit";
                        };
                        pageEdit = child;
                    } else if (child.props.$displayName === "SectionView") {
                        if (editMode === false) {
                            if (child.props.title !== undefined && child.props.title !== null) {
                                subTitle = <small className={subTitleClassName} style={{ marginLeft: 10 }}>{child.props.title}</small>;
                            };

                            if (child.props.getButtons) {
                                let $buttons: any[] = child.props.getButtons(this.props.id, child.props);

                                if ($buttons && $buttons.length > 0) {
                                    $buttons.forEach((value: any, index: number) => {
                                        buttons.push(value);
                                    });
                                };
                            };

                            //pageChildren.push(child);
                            optionMode = null;
                        };
                        pageView = child;
                    } else {
                        pageChildren.push(child);
                    };
                };
            });

            if (!sectionButtons) {
                let hasButtons: boolean =
                    (buttons && buttons.length > 0) ||
                    (editMode && this.props.onSave !== undefined) ||
                    (editMode && this.props.onCancel !== undefined) ||
                    (this.props.hideCollapseButton !== true);
                   
                if (hasButtons) {
                    sectionButtons = <SectionButtons>
                        {buttons}
                        {editMode && this.props.onSave ? <SaveButton icon="fa fa-check" onClick={this.onSave} iconOnly={true} /> : null}
                        {editMode && this.props.onCancel ? <CancelButton icon="fa fa-remove" onClick={this.onCancel} iconOnly={true} /> : null}
                        {this.props.hideCollapseButton !== true ?
                            <CollapseButton className="btn-ico-ek" style={null} collapsed={this.props.collapsed} onClick={this.onCollapse} iconOnly={true} /> : null}
                    </SectionButtons>;
                };
            };

            if (this.props.inlineNew === true && editMode === false) {
                // only for section list
                let children: any = this.props.children;
                let saveButton: any;
                //
                for (var cp = 0; cp <= children.length; cp++) {
                    if (this.props.children[2].props.$displayName === "SectionEdit") {
                        saveButton = this.props.children[2].props.onSave;
                    };
                };
                
                pageChildren.push(<div key="inlineEdit" className="inlineedit">
                    <Column size={[11, 11, 11, 11]}>
                        {pageEdit}
                    </Column>
                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "right", padding: "10px 5px 0px" }}>
                        <button className="bg-white btn-section-ek" title="Agregar" onClick={saveButton}><i className="fa fa-plus"></i></button>
                    </Column>
                </div>);
            };

            if (pageView && pageEdit) {
                if (editMode === false) {
                    pageChildren.push(pageView);
                } else {
                    pageChildren.push(pageEdit);
                };
            };

            return <div className={className + " panel-sub" + this.props.level} style={{ position: "relative", marginBottom: 10 }}>
                {sectionButtons ?
                    <div className={"panel-heading-top panel-sub" + this.props.level}>
                        {sectionButtons}
                    </div>
                    : null}
                <div className={"panel-heading panel-sub" + this.props.level + " " + collapsedClassName + " " + optionMode}>
                    <div className={titleClassName}>
                        {this.props.icon ? <Icon icon={this.props.icon} /> : null}
                        <span className="caption-subject" dangerouslySetInnerHTML={{ __html: title }}>
                        </span>
                        {subTitle}
                    </div>
                </div>
                {this.state.loadContent === true ?
                    <div className={"panel-body panel-sub" + this.props.level}>
                        <div className="tab-content">
                            {pageChildren}
                        </div>
                    </div> : null}
            </div>;
        }
    };
    export let OptionSection: any = ReactRedux.connect($OptionSection.props, null)($OptionSection);
    export class mainSection extends React.Component<{}, {}>{
        render(): JSX.Element {
            return <OptionSection
                collapsed={false}
                level="main"
                hideCollapseButton={true}
            >
                {this.props.children}
            </OptionSection>;
        };
    };
    export class PageUnauthorized extends React.Component<{}, {}>{
        render(): JSX.Element {
            return <Column size={[12, 12, 12, 12]} style={{textAlign:"center"}}>
                <div>
                <i className="fa fa-exclamation-triangle" style={{
                    lineHeight: "128px",
                    fontSize: 128,
                    //fontWeight: 300,
                    color: "#e7505a"
                }}></i>
                </div>
                <div className="details">
                    <h3>Oops! No tiene permiso para acceder a esta opción.</h3>
                    <p>Intente actualizar la página o contacte a su administrador local del sistema.<br />
                    </p>                    
                </div>
            </Column>;
        }
    }
    export class NotFoundItem extends React.Component<{}, {}>{
        render(): JSX.Element {
            return <div className="page-content-wrapper">
                <div className="page-content">
                    <Column size={[12, 12, 12, 12]} style={{ textAlign: "center", paddingTop:20 }}>
                        <div>
                            <i className="far fa-file-code" style={{
                                lineHeight: "128px",
                                fontSize: 128,
                                fontWeight: 300,
                                color: "lightgray"
                            }}></i>
                        </div>
                        <div className="details">
                            <h3>Oops! No se encontro el elemento.</h3>
                        </div>
                    </Column>
                    <div style={{ height: 100, width: "100%" }}></div>
                </div>
            </div>;
        }
    }


    interface IOptionListProps extends IOptionSectionProps, grid.IColumnProps, IListProps {
        config?: page.IPageConfig;
        data?: DataElement;
        dtConfig?: dt.IDTConfig;
        editButtons?: any;
        viewButtons?: any;
        iconSave?: string;
        listFilter?: any[];
        listMode?: string;
        dtMode?: string;
        parent?: string;
        slot?: string;
        state?: DataElement;
        collapsed?: boolean;
        customFilters?: () => any[];
        mapFormToEntity?: (form: EditForm, entidades?: any) => any;
        hideNewButton?: boolean;
        onAddNew?: () => any;
        onSave?: () => any;
        onCancel?: () => any;
        onFilter?: () => any;
        onAfterSave?: (item?: any, entidades?: DataElement) => any;
        onRowSelected?: (item: any) => void;
        onRowStyle?: (item: any) => React.CSSProperties;
        onRowDoubleClick?: (item: any) => void;
        onSectionLoaded?: (props: any) => void;
        addRefresh?: boolean;
        autonomo?: boolean;
        onValidations?: () => boolean;
        sidebarContent?: any;
    };
    export class $SectionList extends React.Component<IOptionListProps, {}>{
        constructor(props: IOptionListProps) {
            super(props);

            this.getFilterFormName = this.getFilterFormName.bind(this);
            this.onFilter = this.onFilter.bind(this);
            this.getData = this.getData.bind(this);
            this.getML = this.getML.bind(this);
        };
        //
        static props: any = (state: any) => {
            return {
                config: global.createPageConfigFromState(state.global),
                state: state.global.currentEntityState,
                dtMode: "N"
            };
        };
        static propsExtended: any = (state: any) => {
            return {
                config: global.createPageConfigFromState(state.global),
                state: state.global.currentEntityState,
                dtMode: "E"
            };
        };
        static defaultProps: IOptionListProps = {
            collapsed: false,
            addRefresh: true,
            autonomo: false,
            onValidations: null,
        };
        //
        //setData(items: any): void {
        //    let config: page.IPageConfig = this.props.config;

        //    if (page.canViewEditMode(this.props.state)) {
        //        if (!Forms.getValue(this.props.id, this.props.parent)) {
        //            Forms.updateFormElement(this.props.parent, this.props.id, items);
        //        };
        //    };
        //};
        getData(): DataElement {
            let id: string = this.props.id;
            let config: page.IPageConfig = this.props.config;
            let retValue: DataElement;

            if (page.canViewEditMode(this.props.state)) {
                retValue = Forms.getValue(this.props.id, this.props.parent);
            }
            else {
                let slot: string;
                if (config.hasSlot(id)) {
                    retValue = config.getCatalogo(id);
                }
                else {
                    retValue = config.getCatalogo();
                };
            };

            if (retValue && global.isSuccessful(retValue)) {
                retValue = retValue.getActiveItems();
            };
            return retValue;
        };
        getML(): any {
            let id: string = this.props.id;
            let config: page.IPageConfig = this.props.config;
            let retValue: any;

            try {
                let mlKey: string = id;

                retValue = $ml[config.idML].sections[mlKey];
                if (!retValue) {
                    retValue = {};
                };
            }
            catch (e) {
                retValue = {};
            };

            return retValue;
        };
        getListProperties(): IListProps {
            let retValue: IListProps = {
                addRemoveButton: this.props.addRemoveButton,
                aggregate: this.props.aggregate,
                dragAndDrop: this.props.dragAndDrop,
                formatter: this.props.formatter,
                itemClass: this.props.itemClass,
                listFooter: this.props.listFooter,
                listHeader: this.props.listHeader,
                onChange: this.props.onChange,
                onItemClick: this.props.onItemClick,
                onRemoveNestedItem: this.props.onRemoveNestedItem,
                readonly: this.props.readonly,
                url: this.props.url,
                listMode: this.props.listMode,
                horizontalScrolling: this.props.horizontalScrolling,
                selectable: this.props.selectable,
                drawOddLine: this.props.drawOddLine,
                height: this.props.height
            };

            return retValue;
        };
        getColumnProperties(): grid.IColumnProps {
            let retValue: grid.IColumnProps = {
                className: "panel-container " + (this.props.level ? "panel-sub" + this.props.level + " " : "") + $.trim(this.props.className),
                size: this.props.size,
                style: this.props.style
            };

            return retValue;
        };
        getFilterFormName() {
            //return this.props.id + "$$filtro";
            return this.props.id;
        };
        onFilter(): void {
            if (this.props.onFilter) {
                this.props.onFilter();
            }
            else {
                let filterFormName: string = this.getFilterFormName();
                let config: page.IPageConfig = global.assign({}, this.props.config);
                let values: any = Forms.getValues(filterFormName);

                let filters: any = global.getFilters(values);

                if (this.props.customFilters) {
                    filters = global.assign(filters, this.props.customFilters());
                };
                //generar json

                //this.props.config.dispatchCatalogoBase(this.props.dispatchFilter, filters, filterFormName);

                this.props.config.dispatchCatalogoBasePost(this.props.dispatchFilter, { parametros: filters }, filterFormName);
            };
        };
        componentWillMount(): void {
            let items: any = this.props.config.getCatalogo(this.props.id);
            console.log(items)
            if (global.isSuccessful(items)) {
                Forms.updateFormElement(this.props.parent, this.props.id, items);
            };
            //
            if (this.props.dispatchFilter) {
                this.onFilter();
            };
        };
        componentDidMount(): void {
            if (this.props.onSectionLoaded) {
                this.props.onSectionLoaded(this.props);
            };
        };
        componentWillReceiveProps(nextProps: IOptionListProps, nextState: IOptionListProps): any {
            if (this.props.parent) {
                let next: any = this.props.config.getCatalogo(this.props.id);
                let current: any = Forms.getValue(this.props.id, this.props.parent);

                if (global.hasChanged(current, next) && global.getTimestamp(next) > global.getTimestamp(current)) {
                    Forms.updateFormElement(this.props.parent, this.props.id, next);
                };
            };
        };
        //shouldComponentUpdate(nextProps: IOptionListProps, nextState: IOptionListProps): any {
        //    if (this.props.parent) {
        //        let next: any = this.props.config.getCatalogo(this.props.id);
        //        let current: any = Forms.getValue(this.props.id, this.props.parent);

        //        if (global.hasChanged(current, next) && global.getTimestamp(next) > global.getTimestamp(current)) {
        //            return true;
        //        };
        //    };

        //    return false;
        //};
        render(): JSX.Element {
            let that: IOptionListProps = this.props;
            let $section: any = this.getML();
            let data: DataElement = this.getData();
            let listProperties: IListProps = this.getListProperties();
            let columnProperties: grid.IColumn = this.getColumnProperties();
            let subTitle: any = "";
            let title: any = "";

            //console.count("*** RENDER: $sectionList ***" + this.props.id);

            if (this.props.subTitle) {
                if (this.props.subTitle.constructor.name === "Function") {
                    subTitle = this.props.subTitle(data);
                };
            }
            else {
                subTitle = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                    {[global.getData(data, []).length].join("")}
                </span>;
            };

            if (this.props.title) {
                title = this.props.title;
            }
            else {
                title = $section.title; 
            };

            let sectionButtons: any;
            let onAddNew: () => any = this.props.onAddNew;
            let onCancelEdit: () => any = null;
            let onSave: () => any = this.props.onSave;
            let onFilter: () => any = this.props.onFilter;

            let onValidations: () => boolean = this.props.onValidations;

            let state: DataElement = this.props.config.getState(this.props.id);
            let editMode: boolean = null;
            let filterButton: any = null;
            let filters: any = null; 
            let children: any[] = [];
            let specialButtons: any[] = [];

            React.Children.forEach(this.props.children, (child: any, index: number): any => {
                if (child) {
                    if (child.props.$displayName === "SectionButtons") {
                        React.Children.forEach(child.props.children, (childButton: any, indexButton: number): any => {
                            if (childButton.props.$displayName === "SpecialButton" || childButton.type.WrappedComponent.defaultProps.$displayName === "SpecialButton") {
                                let sbProps: buttons.IButtonProps = global.assign(childButton.type.WrappedComponent ? childButton.type.WrappedComponent.defaultProps : childButton.props);
                                sbProps.key = "sb_" + sbProps.$props.pageId;
                                sbProps.$props = global.assign(sbProps.$props, { idParentSection: that.id });
                                //
                                specialButtons.push(React.cloneElement(childButton, sbProps));
                            };
                        });
                    } else {
                        children.push(child);
                    };
                };
            });
            //
            if (this.props.listFilter) {
                let filterFormName: string = this.getFilterFormName();
                let filterControls: any[] = this.props.listFilter.map((value: any, index: number) => {
                    return React.cloneElement(value, global.assign(value.props, { key: "filter_key_" + index, idFormSection: value.props.idFormSection ? value.props.idFormSection : filterFormName }));
                });

                if (this.props.addRefresh)
                {
                    filterButton = <Button className="btn-ico-ek white" key="buttonRefresh" iconOnly={true} color="white" icon="fas fa-sync-alt" onClick={this.onFilter} />;
                }
                filters = <Row className="list-fixed-filter" >{filterControls}</Row>;
            };
            //
            let permiso: number = getOptionPermissionValue(this.props.config.id + "$" + this.props.id);
            let sectionListAutonomo: boolean = this.props.autonomo;
            let viewmOde: any = getData(state).viewMode;
            let canViewEditMode: boolean = page.canViewEditMode(this.props.state);

            if (isSuccessful(state) && getData(state).viewMode !== undefined) {
                editMode = !(getData(state).viewMode === true);

                if (editMode === true) {
                    if (specialButtons || this.props.editButtons) {
                        sectionButtons = <SectionButtons key="editButtons">{specialButtons}{this.props.editButtons}</SectionButtons>;
                    }
                }
                else {
                    if (this.props.viewButtons || filterButton) {
                        sectionButtons = <SectionButtons key="viewButtons">{this.props.viewButtons}{filterButton}</SectionButtons>;
                    }
                }
            };

            if (canViewEditMode || sectionListAutonomo) {

                if (this.props.hideNewButton === true) {
                    onAddNew = undefined;
                }
                else {

                    if ((!onAddNew) && (permiso == null || permiso >= EK.UX.Auth.NEW_PERMISSION)) {
                        onAddNew = () => {
                            Forms.remove(this.props.id);
                            //
                            this.props.config.setEntity({}, this.props.id);
                            //
                            this.props.config.setState({ viewMode: false }, this.props.id);
                        };
                    };
                };

                onCancelEdit = () => {
                    Forms.remove(this.props.id);
                    //
                    global.dispatchDefault("global-page-entity", {}, this.props.id);
                    //
                    this.props.config.setState({ viewMode: true }, this.props.id);

                    if (this.props.onCancel) {
                        this.props.onCancel();
                    }
                };

                if (!onSave) {
                    onSave = () => {

                        let successfulValidations: boolean = true;
                        if (this.props.onValidations)
                        {
                            successfulValidations=this.props.onValidations();
                        };

                        if (!successfulValidations)
                        {
                            return;
                        }

                        let entidades: DataElement = this.props.config.getCatalogo(this.props.id);

                        if (this.props.parent) {
                            entidades = Forms.getValue(this.props.id, this.props.parent);
                        };

                        if (!entidades) {
                            entidades = global.createSuccessfulStoreObject([]);
                        };

                        if (!Forms.isValid(this.props.id)) {
                            warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                            return;
                        };
                        let item: EditForm = Forms.getForm(this.props.id);
                        let entidad: any = this.props.mapFormToEntity(item, global.getData(entidades));
                        //
                        if (entidad && entidad._found === true) {
                            entidad._found = undefined;
                        }
                        else {
                            if (!(entidad.ID > 0)) {
                               if ( !(entidad && entidad.ID))
                               {
                                    entidad.ID = entidades.getNextLowerID();
                                }
                            };
                        };
                        //
                        let retValue: DataElement = entidades.upsertItem(entidad);
                        //
                        Forms.updateFormElement(this.props.parent, this.props.id, retValue);
                        //
                        this.props.config.setState({ viewMode: true }, this.props.id);
                        //
                        if (this.props.onAfterSave) {
                            this.props.onAfterSave(entidad, retValue);
                        };
                    };
                };
            }

            return <Column {...columnProperties}>
                <OptionSection
                    autonomo={this.props.autonomo}
                    id={this.props.id}
                    level={this.props.level}
                    title={title}// title={$section.title}
                    subTitle={subTitle}
                    icon={this.props.icon}                   
                    collapsed={this.props.collapsed}
                    onCollapse={this.props.onCollapse}
                    inlineEdit={this.props.inlineEdit}
                    inlineNew={this.props.inlineNew}
                >
                    {sectionButtons}

                    <SectionView
                        editMode={editMode}
                        onAddNew={onAddNew}
                        inlineNew={this.props.inlineNew}>
                        <PanelUpdate info={data}>
                            {filters}
                            {this.props.dtMode === "N" ?
                                <List id={this.props.id + "_list"} {...listProperties} items={data} actions={this.props.actions} readonly={true} addRemoveButton={false} /> :
                                <dt.DataTableExtended dtType="list" id={this.props.id} dtConfig={this.props.dtConfig} onRowStyle={this.props.onRowStyle} onRowSelected={this.props.onRowSelected} onRowDoubleClick={this.props.onRowDoubleClick} />
                            }
                        </PanelUpdate>
                    </SectionView>

                    <SectionEdit
                        inlineNew={this.props.inlineNew}
                        editMode={editMode}
                        idForm={this.props.id}
                        iconSave={this.props.iconSave}
                        onCancel={onCancelEdit}
                        onSave={onSave}>
                        {children}
                    </SectionEdit>
                </OptionSection>
                {this.props.sidebarContent ? <Sidebar id={this.props.id + "$sb"}>{this.props.sidebarContent}</Sidebar> : null }
            </Column>;
        };
    };
    export const SectionList: any = ReactRedux.connect($SectionList.props, null)($SectionList);
    export const SectionListExtended: any = ReactRedux.connect($SectionList.propsExtended, null)($SectionList);

    export const Section = global.connect(
        class extends React.Component<IOptionListProps, {}>{
            constructor(props: IOptionListProps) {
                super(props);

                this.getData = this.getData.bind(this);
                this.getML = this.getML.bind(this);
            };
            //
            static props: any = (state: any) => {
                return {
                    config: global.createPageConfigFromState(state.global)
                };
            };
            //
            getData(): DataElement {
                let id: string = this.props.id;
                let config: page.IPageConfig = this.props.config;
                let retValue: DataElement;

                let slot: string;
                if (config.hasSlot(id)) {
                    retValue = config.getEntity(id);
                }
                else {
                    retValue = config.getEntity();
                };

                return retValue;
            };
            getML(): any {
                let id: string = this.props.id;
                let config: page.IPageConfig = this.props.config;
                let retValue: any;

                try {
                    let mlKey: string = id;

                    retValue = $ml[config.idML].sections[mlKey];
                    if (!retValue) {
                        retValue = {};
                    };
                }
                catch (e) {
                    retValue = {};
                };

                return retValue;
            };
            getListProperties(): IListProps {
                let retValue: IListProps = {
                    addRemoveButton: this.props.addRemoveButton,
                    aggregate: this.props.aggregate,
                    dragAndDrop: this.props.dragAndDrop,
                    formatter: this.props.formatter,
                    itemClass: this.props.itemClass,
                    listFooter: this.props.listFooter,
                    listHeader: this.props.listHeader,
                    onChange: this.props.onChange,
                    onItemClick: this.props.onItemClick,
                    onRemoveNestedItem: this.props.onRemoveNestedItem,
                    readonly: this.props.readonly,
                    url: this.props.url,
                    listMode: this.props.listMode
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
            render(): JSX.Element {
                let $section: any = this.getML();
                let data: DataElement = this.getData();
                let listProperties: IListProps = this.getListProperties();
                let columnProperties: grid.IColumn = this.getColumnProperties();

                return <Column {...columnProperties}>
                    <OptionSection title={$section.title} collapsed={false}>
                        <PanelUpdate info={data}>
                            {this.props.children}
                        </PanelUpdate>
                    </OptionSection>
                </Column>;
            };
        }
    );
    //
    // map props
    //
    const mapProps: any = (state: any): any => {
        return {
            app: state.global.app,
            page: state.global.page
        };
    };

    export let Page: any = ReactRedux.connect(props, Page$V2.dispatchs)(Base$Page);
    export const Main: any = ReactRedux.connect(props, Page$V2.dispatchs)(Page$V2);
    export const View: any = ReactRedux.connect(props, null)($View);
    export const dxTable: any = ReactRedux.connect(props, null)($dxTable);
    export const dxGridTable: any = ReactRedux.connect(props, null)($dxGridTable);
    export const Edit: any = ReactRedux.connect(props, null)($Edit);
    export const Filters: any = EK.UX.Tabs.PageFilter;
    export const FiltersV2: any = EK.UX.Tabs.PageFilterV2;
}

import page = EK.UX.Page;
import IPageTitle = EK.UX.Page.IPageTitle;
import OptionSection = EK.UX.Page.OptionSection;
import Page = EK.UX.Page.Page;
import PageBar = EK.UX.Page.PageBar;
import PageMode = EK.UX.Page.PageMode;
import PageSection = EK.UX.Page.PageSection;
import PageTitle = EK.UX.Page.PageTitle;
import PageToolbar = EK.UX.Page.PageToolbar;
import PageUnauthorized = EK.UX.Page.PageUnauthorized;
import NotFoundItem = EK.UX.Page.NotFoundItem;
import PageV2 = EK.UX.Page.Main;