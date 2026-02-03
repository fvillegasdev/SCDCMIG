namespace EK.Global {
    "use strict";
    const w: any = window;

    declare var swal: (p1: any, p2?: any, p3?: any) => any;
    declare const ExcelJS: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;

    export var ClavesCatalogosClasificadores = {
        COMPANIA :"COMPANIA",
        REGION: "REGION"
    };

    export var ClaveCatalogos = {
        USUARIOS: "USUARIOS",
        REGION: "REGION",
        TM: "TipoMovimiento",
        CB: "CuentaBancaria",
        MONEDA: "Moneda"
    };

    export interface props extends React.Props<any> {
        $displayName?: string;
        $props?: any;
        $modalResult?: DataElement;
        $defProps?: page.IPageDefaultProps;
    };

    export interface IDefaultComponentProps {
        config?: page.IPageConfig;
        url?: string;
        propForm?: string;
        ddlCG?: string;
        ddlTargetAction?: string;
        ddlTargetUrl?: string;
    };

    interface IStorageItem {
        data: any;
        timeStamp: number;
    };
    export const pageProps: any = (state: any) => ({
        config: global.getPageConfig(state.global.pageConfig),
        app: state.global.app,
        page: state.global.page,
        entidad: state.global.currentEntity,
        entityType: state.global.currentEntityType,
        data: state.global.currentCatalogo,
        state: state.global.currentEntityState
    });
    export const assign: (obj1: any, obj2?: any, obj3?: any) => any = (obj1: any, obj2: any, obj3?: any): any => {
        let obj: any = $.extend({}, obj1, obj2, obj3);

        return obj;
    };
    export const connect: (component: any, props?: any) => any = (component: any, props?: any): any => {
        let c_props: any = props ? props : component.props;
        let c_dispatchs: any = component.dispatchs;

        return ReactRedux.connect(c_props, c_dispatchs)(component);
    };
    export const createComponent: (component: any, props?: any, mapProps?: any) => any = (component: any, props?: any, mapProps?: any): any => {
        let c_props: any = mapProps ? mapProps : component.props;
        let c_dispatchs: any = component.dispatchs;
        //
        let tProps: any = global.assign(props, { key: "" });
        //
        let c_obj: any = ReactRedux.connect(c_props, c_dispatchs)(component);
        //
        return React.createElement(c_obj, props);
    };
    export const createSpecialAddButton: (component: any, defaultProps: page.IPageDefaultProps, mapProps?: any) => any = (component: any, defaultProps: page.IPageDefaultProps, mapProps?: any): any => {
        let idButton: string = "Add" + defaultProps.propForm;
        //
        if (buttons && buttons.base && buttons.base[idButton]) {
            return;
        };
        //
        let c_props: any = mapProps ? mapProps : component.props;
        let c_dispatchs: any = component.dispatchs;
        //
        if (!defaultProps.ddlTargetAction) {

        };
        
        let c_obj: any = ReactRedux.connect(c_props, c_dispatchs)(component);
        //
        if (buttons && buttons.base) {
            buttons.base[idButton] = c_obj;
        };
    };
    export const createBaseDDL: (component: any, defaultProps: page.IPageDefaultProps, mapProps?: any) => any = (component: any, defaultProps: page.IPageDefaultProps, mapProps?: any): any => {
        let c_props: any = mapProps ? mapProps : component.props;
        let c_dispatchs: any = null;
        //
        let dispatchs: any = null;
        //
        for (var m in defaultProps) {
            if (!dispatchs) dispatchs = {};
            //
            if (defaultProps[m].constructor.name === "Function") {
                dispatchs[m] = defaultProps[m];
            };
        };
        //
        if (dispatchs) {
            c_dispatchs = (dispatch: Redux.Dispatch<any>) => { return dispatchs; };
        };
        //
        if (!defaultProps.ddlTargetAction) {

        };
        //
        let c_obj: any = ReactRedux.connect(c_props, c_dispatchs)(component);
        //
        if (ddl && ddl.base) {
            ddl.base[defaultProps.propForm] = c_obj;
        };
    };
    export const fixJsonDates: (obj: any) => void = (obj: any): void => {
        if (obj) {
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    let v: any = obj[k];
                    if (v && typeof v === "string") {
                        if (v.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})/)) {
                            // it's a date, parse it
                            obj[k] = new Date(v);
                        }
                    } else if (v && typeof v === "object") {
                        fixJsonDates(v);
                    };
                }
            };
        };
    };

    export const getStoredItem: (key: string) => any = (key: string): any => {
        let retValue: any;

        if (typeof (Storage) !== "undefined") {
            let storedItemSource: string = localStorage.getItem(key);
            if (storedItemSource) {
                let storedItem: IStorageItem = JSON.parse(storedItemSource);
                // fix the dates
                fixJsonDates(storedItem);

                if (storedItem.timeStamp) {
                    let currentDate: number = Number(new Date());

                    if (storedItem.timeStamp < currentDate) {
                        // expired, remove from local storage
                        localStorage.removeItem(key);
                    } else {
                        retValue = storedItem.data;
                    }
                } else {
                    retValue = storedItem.data;
                };
            };
        };

        return retValue;
    };

    export const storeItem: (key: string, item: any, duration?: number) => void
        = (key: string, item: any, duration?: number): void => {
            if (typeof (Storage) !== "undefined") {
                let timeStamp: number;
                if (duration !== undefined) {
                    let currentDate: Date = new Date();
                    currentDate.setMinutes(currentDate.getMinutes() + duration);

                    timeStamp = Number(currentDate);
                };

                let itemToStore: IStorageItem = {
                    data: item,
                    timeStamp: timeStamp
                };

                localStorage.setItem(key, JSON.stringify(itemToStore));
            };
        };

    export const removeItem: (key: string) => void = (key: string): void => {
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem(key);
        };
    };

    export const getNestedProp: (obj: any, propName: string) => any = (obj: any, propName: string): any => {
        if (!propName) {
            return obj;
        };
        //
        let arr: string[] = propName.split(".");
        while (arr.length && (obj = obj[arr.shift()]));
        //
        return obj;
    }

    export const createDefaultStoreObject: (data?: any) => DataElement = (data?: any): DataElement => {
        let element: DataElement = new DataElement();
        element.status = EK.Store.AsyncActionTypeEnum.default;
        element.data = data;
        element.timestamp = Number(new Date());

        return element;
    };

    export const createLoadingStoreObject: (data?: any) => any = (data?: any): any => {
        return {
            status: EK.Store.AsyncActionTypeEnum.loading,
            data: data,
            timestamp: Number(new Date())
        };
    };

    export const createUpdatingStoreObject: (data?: any) => any = (data?: any): any => {
        return {
            status: EK.Store.AsyncActionTypeEnum.updating,
            data: data,
            timestamp: Number(new Date())
        };
    };
    // , actionResult?: AsyncActionTypeEnum
    export const createSuccessfulStoreObject: (data: any) => DataElement =
        (data: any): DataElement => {
        let element: DataElement = new DataElement();
        element.status = EK.Store.AsyncActionTypeEnum.successful;
        element.data = data;
        element.timestamp = Number(new Date());
        element.returnCode = 0;
        element.returnMessage = "";
        element.returnSeverity = 1;
        element.returnUpdateState = true;
        //element.actionResult = actionResult;

        return element;
    };

    export const createFailedStoreObject: (data?: any, actionResult?: AsyncActionTypeEnum) => any =
        (data?: any, actionResult?: AsyncActionTypeEnum): any => {
        let element: DataElement = new DataElement();
        element.status = EK.Store.AsyncActionTypeEnum.failed;
        element.data = data;
        element.timestamp = Number(new Date());
        element.actionResult = actionResult;

        return element;
    };

    export interface IManagedReducerActions {
        type: string;
        property?: string;
        default?: any;
    }

    export const manageReducerActions: (state: any, action: EK.Store.IAction, actions: IManagedReducerActions[]) => any =
        (state: any, action: EK.Store.IAction, actions: IManagedReducerActions[]): any => {
            let newObj: any;
            let property: string;

            if (state === undefined) {
                newObj = {};
                actions.forEach((a: any) => {
                    property = a.property;

                    newObj[a.property] = EK.Global.createDefaultStoreObject(a.default);
                });

                return newObj;
            } else if (actions && action && actions.length > 0) {
                for (var i = 0; i < actions.length; i++) {
                    let a: any = actions[i];
                    let actionType: string = a.type;

                    if (a.type === action.type) {
                        property = a.property;
                        if (action.property) {
                            property = [property, "$", action.property].join("");
                        };

                        let actionData: DataElement = undefined;
                        //let actionStatus: AsyncActionTypeEnum = action.status;
                        let stateData: any = undefined;
                        let stateElement: DataElement = state[property];

                        actionData = new DataElement();
                        actionData.status = action.status;
                        actionData.returnCode = action.returnCode;
                        actionData.returnMessage = action.returnMessage;
                        actionData.returnSeverity = action.returnSeverity;
                        actionData.returnUpdateState = action.returnUpdateState;

                        // no nos sirve el estatus Failed, se restaura el estatus anterior y se queda con la marca de failed
                        if (action.failed) {
                            actionData.data = stateElement && stateElement.data ? stateElement.data : a.default;
                            actionData.status = stateElement && stateElement.prevStatus ? stateElement.prevStatus : AsyncActionTypeEnum.default;
                            actionData.prevStatus = AsyncActionTypeEnum.failed;
                            actionData.actionResult = AsyncActionTypeEnum.failed;
                        } else if (action.loading || action.updating) {
                            actionData.data = stateElement && stateElement.data ? stateElement.data : a.default;
                            actionData.prevStatus = stateElement && stateElement.status ? stateElement.status : AsyncActionTypeEnum.default;
                            actionData.actionResult = undefined;
                        } else if (action.successful) {
                            if (action.data) {
                                actionData = action.data;
                            };

                            if (action.returnUpdateState === false) {
                                if (state && state[property]) {
                                    actionData.data = state[property].data;
                                };
                            }; 
                        };

                        newObj = {
                            [property]: actionData
                        };

                        break;
                    };
                };

                if (newObj) {
                    let retValue: any = EK.Global.assign(state, newObj);
                    return retValue;
                };
            };

            return state;
        };

    export const setCurrentEntityType: (entityType: string) => void = (entityType: string): void => {
        dispatchSuccessful("global-current-entity-type", entityType);
    };

    export const setCurrentEntity: (entity: any) => void = (entity: any): void => {
        dispatchSuccessful("global-current-entity", entity);
    };

    export const setCurrentLink: (link: string) => void = (link: string): void => {
        dispatchSuccessful("global-current-link", link);
    };

    export const setLabels: (page: any, props: any) => void = (page: any, props: any): void => {
        let retValue: any = {
            label: props.label,
            helpLabel: props.helpLabel
        };

        if (page && props.id) {
            let mlKey: string = props.id;

            if (page.form) {
                if (props.idFormSection && page.form[props.idFormSection] && page.form[props.idFormSection][mlKey]) {
                    if (!props.label) {
                        retValue.label = page.form[props.idFormSection][mlKey].label;
                    };
                    if (!props.helpLabel) { 
                        retValue.helpLabel = page.form[props.idFormSection][mlKey].helpLabel;
                    };
                }
                else {
                    if (page.form[mlKey] && page.form[mlKey] !== null) {
                        if (!props.label) {
                            retValue.label = page.form[mlKey].label;
                        };
                        if (!props.helpLabel) {
                            retValue.helpLabel = page.form[mlKey].helpLabel;
                        };
                    };
                };
            };
        };

        return retValue;
    };

    export const showSidebar: (id: string, state?: any) => void = (id: string, state?: any): void => {
        if (!state) {
            state = {};
        };

        global.dispatchSuccessful("global-page-state", global.assign({ state: 1, dt: Number(new Date()) }), "sidebar$" + id);
    }

    export const closeSidebar: (id: string, state?: any) => void = (id: string, state?: any): void => {
        if (!state) {
            state = {};
        };

        global.dispatchSuccessful("global-page-state", global.assign({ state: 0, dt: Number(new Date()) }), "sidebar$" + id);
    }

    // , actionResult?: AsyncActionTypeEnum
    export const dispatchSuccessful: (idAction: string, data?: any, property?: string) => void =
        (idAction: string, data?: any, property?: string): void => {

            let obj: any;
            if (data && !data.status && !data.data && !data.timestamp) {
                obj = createSuccessfulStoreObject(data);
            } else {
                obj = data;
            }

            EK.Store.dispatch(EK.Store.getAction(idAction, obj, EK.Store.AsyncActionTypeEnum.successful, property));
    };
    export const filtrarDataResultados: (CATALOGO_ID: any, CATALOGO_BU_ID, Filtros: any[], value: any) => void = (CATALOGO_ID: any, CATALOGO_BU_ID, Filtros: any[], value: any): void => {
        let ListaFiltrada = [];
        let ListaOriginalBackUp: any = EK.Store.getState().global[CATALOGO_BU_ID];
        
        if (ListaOriginalBackUp === undefined) {
            let catalogo = `catalogo$${CATALOGO_ID}`;
            if (EK.Store.getState().global[catalogo].data.length === 0)
                return
            ListaOriginalBackUp = EK.Store.getState().global[catalogo].data;
            global.dispatchSuccessful(`load::${CATALOGO_BU_ID}`, ListaOriginalBackUp);
        } else {
            ListaOriginalBackUp = ListaOriginalBackUp.data;
        }

        if (value.trim() === '') {
            global.dispatchSuccessful("global-page-data", ListaOriginalBackUp, CATALOGO_ID);
            return;
        }

        for (let u of ListaOriginalBackUp) {
            let patron: any = '';
            for (let f of Filtros) {
                if (f.includes('.')) {
                    let keys = f.split('.');
                    let val = u;
                    for (let k of keys) {
                        val = val[k];
                    }
                    patron += val.toString().toLowerCase();
                } else {
                    patron += u[f].toString().toLowerCase();
                }
            }
            if (patron.includes(value.toLowerCase())) {
                ListaFiltrada.push(u);
                //global.dispatchSuccessful("global-page-data", ListaFiltrada, CATALOGO_ID);
            }
        }
        //if (ListaFiltrada.length === 0) {
          //  global.dispatchSuccessful("global-page-data", ListaFiltrada, CATALOGO_ID);
        //}
        global.dispatchSuccessful("global-page-data", ListaFiltrada, CATALOGO_ID);
    }

    export const dispatchFullSuccessful: (idAction: string, data?: any, property?: string, returnCode?: number, returnMessage?: string, returnSeverity?: number, returnUpdateState?: boolean) => void =
        (idAction: string, data?: any, property?: string, returnCode?: number, returnMessage?: string, returnSeverity?: number, returnUpdateState?: boolean): void => {

            let obj: DataElement;
            if (data && !data.status && !data.data && !data.timestamp) {
                obj = createSuccessfulStoreObject(data);                
            } else {
                obj = data;
            };

            if (obj) {
                obj.status = AsyncActionTypeEnum.successful;
                obj.actionResult = AsyncActionTypeEnum.successful;
                obj.returnCode = returnCode;
                obj.returnMessage = returnMessage;
                obj.returnSeverity = returnSeverity;
                obj.returnUpdateState = returnUpdateState;
            };

            let action: EK.Store.IAction = EK.Store.getAction(idAction, obj, EK.Store.AsyncActionTypeEnum.successful, property);
            action.returnCode = returnCode;
            action.returnMessage = returnMessage;
            action.returnSeverity = returnSeverity;
            action.returnUpdateState = returnUpdateState;

            EK.Store.dispatch(action);
        };

    export const dispatchLoading: (idAction: string, data?: any, property?: string) => void =
        (idAction: string, data?: any, property?: string): void => {

        let obj: any;
        if (data && !data.status && !data.data && !data.timestamp) {
            obj = createLoadingStoreObject(data);
        } else {
            obj = data;
        }

        EK.Store.dispatch(EK.Store.getAction(idAction, obj, EK.Store.AsyncActionTypeEnum.loading, property));
    };

    export const dispatchUpdating: (idAction: string, data?: any, property?: string) => void =
        (idAction: string, data?: any, property?: string): void => {
        let obj: any;
        if (data && !data.status && !data.data && !data.timestamp) {
            obj = createUpdatingStoreObject(data);
        } else {
            obj = data;
        }

        EK.Store.dispatch(EK.Store.getAction(idAction, obj, EK.Store.AsyncActionTypeEnum.updating, property));
    };

    export const dispatchFailed: (idAction: string, data?: any, actionResult?: AsyncActionTypeEnum, property?: string) => void =
        (idAction: string, data?: any, actionResult?: AsyncActionTypeEnum, property?: string): void => {

            let obj: any;
            if (data && !data.status && !data.data && !data.timestamp) {
                obj = createFailedStoreObject(data, actionResult);
            } else {
                obj = data;
            }

        EK.Store.dispatch(EK.Store.getAction(idAction, obj, EK.Store.AsyncActionTypeEnum.failed, property));
    };

    export const dispatchDefault: (idAction: string, data?: any, property?: string) => void =
        (idAction: string, data?: any, property?: string): void => {
        let obj: any;
        if (data && !data.status && !data.data && !data.timestamp) {
            obj = createDefaultStoreObject(data);
        } else {
            obj = data;
        }

        EK.Store.dispatch(EK.Store.getAction(idAction, obj, EK.Store.AsyncActionTypeEnum.default, property));
    };

    export const dispatchSync: (idAction: string, data?: any) => void = (idAction: string, data?: any): void => {
        EK.Store.dispatch(EK.Store.getAction(idAction, data, EK.Store.AsyncActionTypeEnum.default));
    };

    export enum HttpMethod {
        GET = 1,
        POST = 2,
        PUT = 3
    };

    export interface IDispatchAsyncParam {
        action: string;
        url: string;
        data?: any;
        property?: any;
        type?: HttpMethod;
        status?: AsyncActionTypeEnum;
        custom?: any;
        callBack?: (status: AsyncActionTypeEnum, data: any) => void;
    };

    export const action: (idAction: string, data: any) => any = (idAction: string, data: any): any => {
        return EK.Store.getAction(idAction, data);
    };

    export const actionAsync: (p: IDispatchAsyncParam) => (dispatch: Redux.Dispatch<any>, getState: () => any) => any
        = (p: IDispatchAsyncParam): (dispatch: Redux.Dispatch<any>, getState: () => any) => any => {

            let obj: any = Object;
            let isFormData: boolean = (p.data && p.data.constructor && p.data.constructor.name === "FormData");
            if (!p.data) {
                p.data = {};
            }

            // dispatch initial state
            if (p.callBack) {
                p.callBack(AsyncActionTypeEnum.loading, null);
            }
            else {
                let dispatchFn: any;
                if (p.status === AsyncActionTypeEnum.updating) {
                    dispatchFn = EK.Global.dispatchUpdating; //(p.action, undefined, p.property);
                } else {
                    dispatchFn = EK.Global.dispatchLoading; //(p.action, undefined, p.property);
                };
                //
                if (!p.property || p.property.constructor.name === "String") {
                    dispatchFn(p.action, undefined, p.property);
                }
                else if (p.property.constructor.name === "Array") {
                    for (var i = 0; i < p.property.length; i++) {
                        dispatchFn(p.action, undefined, p.property[i]);
                    };
                }
                else if (p.property.constructor.name === "Object") {
                    for (var pi in p.property) {
                        dispatchFn(p.action, undefined, pi);
                    };
                }
            };

            let url: any = p.url;
            let ajaxConfig: any = {
                url: url,
                contentType: "application/json; charset=UTF-8"
            };

            if (p.type) {
                if (p.type === HttpMethod.GET) {
                    ajaxConfig.type = "GET";
                } else if (p.type === HttpMethod.POST) {
                    ajaxConfig.type = "POST";
                    if (p.data) {
                        ajaxConfig.data = isFormData ? p.data : JSON.stringify(p.data);
                    }
                } else if (p.type === HttpMethod.PUT) {
                    ajaxConfig.type = "PUT";
                    if (p.data) {
                        ajaxConfig.data = isFormData ? p.data : JSON.stringify(p.data);
                    }
                } else {
                    ajaxConfig.type = "GET";
                }
            }

            if (p.custom) {
                ajaxConfig = obj.assign({}, ajaxConfig, p.custom);
            };
            // mark the ajax call 
            ajaxConfig.headers = { "X-EK-PAGE-ID": window["__page_id__"] };
            //
            let doInvoke: any = () => {
                $.ajax(ajaxConfig)
                    .done((data: any, textStatus: any, jqXHR: any): any => {
                        let h: string = jqXHR.getResponseHeader("x-ek-page-id");
                        //
                        if (h) {
                            if (h !== window["__page_id__"]) {
                                if (!p.property || p.property.constructor.name === "String") {
                                    EK.Global.dispatchDefault(p.action, {}, p.property);
                                }
                                else if (p.property.constructor.name === "Array") {
                                    for (var i = 0; i < p.property.length; i++) {
                                        EK.Global.dispatchDefault(p.action, {}, p.property[i]);
                                    };
                                }
                                else if (p.property.constructor.name === "Object") {
                                    for (var pi in p.property) {
                                        EK.Global.dispatchDefault(p.action, {}, pi);
                                    };
                                }

                                //EK.Global.dispatchDefault(p.action, {}, p.property);

                                return;
                            };
                        };
                        if (data && data.Codigo > 0) {
                            if (data.Severity === 0) {
                                success(data.Mensaje);
                            }
                            else if (data.Severity === 1) {
                                warning(data.Mensaje);
                            }
                            else if (data.Severity === 2) {
                                errorMessage(data.Mensaje);
                            }
                            else if (data.Severity === 3) {
                                success(data.Mensaje);
                            };

                            let d: any = data && data.Resultado ? data.Resultado : data;
                            if (p.callBack) {
                                p.callBack(AsyncActionTypeEnum.successful, d);
                            } else {
                                if (!p.property || p.property.constructor.name === "String") {
                                    EK.Global.dispatchFullSuccessful(p.action, d, p.property, data.Codigo, data.Mensaje, data.Severity, data.UpdateState);
                                }
                                else if (p.property.constructor.name === "Array") {
                                    for (var i = 0; i < p.property.length; i++) {
                                        EK.Global.dispatchFullSuccessful(p.action, d[i], p.property[i], data.Codigo, data.Mensaje, data.Severity, data.UpdateState);
                                    };
                                }
                                else if (p.property.constructor.name === "Object") {
                                    for (var pi in p.property) {
                                        EK.Global.dispatchFullSuccessful(p.action, d[pi], pi, data.Codigo, data.Mensaje, data.Severity, data.UpdateState);
                                    };
                                }
                                //EK.Global.dispatchFullSuccessful(p.action, d, p.property, data.Codigo, data.Mensaje, data.Severity, data.UpdateState);
                            };
                        }
                        else {
                            let d: any = data && data.Resultado ? data.Resultado : data;

                            if (p.callBack) {
                                p.callBack(AsyncActionTypeEnum.successful, d);
                            } else {
                                if (!p.property || p.property.constructor.name === "String") {
                                    EK.Global.dispatchFullSuccessful(p.action, d, p.property, 0, "");
                                }
                                else if (p.property.constructor.name === "Array") {
                                    for (var i = 0; i < p.property.length; i++) {
                                        EK.Global.dispatchFullSuccessful(p.action, d[i], p.property[i], 0, "");
                                    };
                                }
                                else if (p.property.constructor.name === "Object") {
                                    for (var pi in p.property) {
                                        EK.Global.dispatchFullSuccessful(p.action, d[pi], pi, 0, "");
                                    };
                                }

                                //EK.Global.dispatchFullSuccessful(p.action, d, p.property, 0, "");
                            };
                        };
                    })
                    .fail((jqXHR: any, textStatus: any): any => {
                        if (jqXHR.readyState == 4) {
                            console.log(jqXHR.responseText)
                            if (!url.includes('history/ReportesFallas')) {
                                global.warning("No se pudo completar la operación (" + url + ")", "EnKontrol (1)");
                            }
                           
                        }
                        else if (jqXHR.readyState == 0) {
                            let jquery: any = $;
                            let m: any = '<div><div style="padding-top: 96px; padding-bottom: 24px;">' +
                                '<i class="fas fa-wifi" style="font-size: 128px; color: #FFAB00;-webkit-animation: flickerAnimation 3s infinite;-moz-animation: flickerAnimation 3s infinite;-o-animation: flickerAnimation 3s infinite;animation: flickerAnimation 3s infinite;"></i>' +
                                '</div><div style="margin-top: 20px; margin-bottom: 20px; color: #555;">' +
                                '<div>parece que hay un error de conexión, verifica si estas conectado a Internet</div>' +
                                '<div style="padding: 20px 0px;">por favor intenta de nuevo actualizando la página presionando la tecla F5 o haciendo click <a onclick="location.reload(true)">aquí</a></div>' +
                                '</div></div>';

                            $(".page-header").css("z-index", 0);
                            jquery.blockUI({
                                css: {
                                    border: 'none',
                                    padding: '0px',
                                    margin: '0px',
                                    top: '50px',
                                    backgroundColor: '#fff',
                                    'border-radius': '10px !important',
                                    '-webkit-border-radius': '10px !important',
                                    '-moz-border-radius': '10px !important'
                                },
                                message: m
                            }); 
                        }
                        else {
                            global.warning(textStatus, "EnKontrol (3)");
                        };

                        if (p.callBack) {
                            p.callBack(AsyncActionTypeEnum.failed, null);
                        } else {
                            if (!p.property || p.property.constructor.name === "String") {
                                EK.Global.dispatchFailed(p.action, undefined, AsyncActionTypeEnum.failed, p.property);
                            }
                            else if (p.property.constructor.name === "Array") {
                                for (var i = 0; i < p.property.length; i++) {
                                    EK.Global.dispatchFailed(p.action, undefined, AsyncActionTypeEnum.failed, p.property[i]);
                                };
                            }
                            else if (p.property.constructor.name === "Object") {
                                for (var pi in p.property) {
                                    EK.Global.dispatchFailed(p.action, undefined, AsyncActionTypeEnum.failed, pi);
                                };
                            }
                            //dispatchFailed(p.action, undefined, AsyncActionTypeEnum.failed, p.property);
                        };
                    })
                    .always((): any => {
                        // think in something
                    }
                );
            };

            if (p.callBack) {
                doInvoke();
            }
            else {
                return (dispatch: Redux.Dispatch<any>, getState: () => any): any => {
                    doInvoke();
                };
            };
        };
    // export const dispatchAsync: (action: string, url: string, data?: any, key?: string, duration?: number) =>
    export const updateMenuContextOptions: (menuId: string, groupId: string, options: any[]) => any =
        (menuId: string, groupId: string, options: any[]): any => {
            let data: any = {};
            data[groupId] = options;
            dispatchSuccessful("global-page-menuOptions", data, menuId);
        };
    export const dispatchAsync: (action: string, url: string, property?: string) =>
        any = (action: string, url: string, property?: string) => {
            EK.Store.dispatch(EK.Global.actionAsync({ action, url, property }));
        };

    export const dispatchToSlot: (slot: string, action: string, url: string) =>
        any = (slot: string, action: string, url: string) => {
            EK.Store.dispatch(EK.Global.actionAsync({ action, url, property: slot }));
        };

    export const dispatchAsyncPut: (action: string, url: string, data?: any, property?: string) =>
        any = (action: string, url: string, data?: any, property?: string) => {
            EK.Store.dispatch(actionAsync({
                action,
                property,
                type: HttpMethod.PUT,
                url,
                data,
                custom: {
                    processData: false,
                    contentType: false
                },
                status: AsyncActionTypeEnum.updating
            }));
        };

    export const asyncGet: (url: string, callBack?: any) => any =
        (url: string, callBack?: any): any => {
            actionAsync({
                action: "",
                property: "",
                type: HttpMethod.GET,
                url: url,
                data: {},
                custom: {
                    processData: false,
                    contentType: false
                },
                status: AsyncActionTypeEnum.loading,
                callBack: callBack
            });
        };
    export const asyncPost: (url: string, data?: any, callBack?: any) => any =
        (url: string, data?: any, callBack?: any): any => {
            actionAsync({
                action: "",
                property: "",
                type: HttpMethod.POST,
                url: url,
                data: data,
                custom: {
                    processData: false,
                    contentType: false
                },
                status: AsyncActionTypeEnum.loading,
                callBack: callBack
            });
        };
    export const asyncPut: (url: string, data?: any, callBack?: any) => any =
        (url: string, data?: any, callBack?: any): any => {
            actionAsync({
                action: "",
                property: "",
                type: HttpMethod.PUT,
                url: url,
                data: data,
                custom: {
                    processData: false,
                    contentType: false
                },
                status: AsyncActionTypeEnum.updating,
                callBack: callBack
            });
        };
    export const dispatchAsyncPost: (action: string, url: string, data?: any, property?: string) => any =
        (action: string, url: string, data?: any, property?: string): any => {
            EK.Store.dispatch(actionAsync({
                action: action,
                property,
                type: HttpMethod.POST,
                url: url,
                data: data,
                custom: {
                    processData: false,
                    contentType: false
                },
                status: AsyncActionTypeEnum.loading
            }));
        };

    export const getStoreData: (ID: any) => any = (ID: any): any => {
        let d = EK.Store.getState().global[ID];
        d = d !== null && d !== undefined && Object.keys(d).length > 0 ? d.data ? d.data : d : null
        return d;
    };

    export const getStoreItem: (ID: any) => any = (ID: any): any => {
        let d = EK.Store.getState().global[ID];
        d = d !== null && d !== undefined && Object.keys(d).length > 0 ? d.data ? d.data : d : null
        return d;
    };

    export const userDate: (date: Date) => Date = (date: Date): Date => {
        if (!date || date === null) {
            return null;
        };
        var timezone: any = global.getCurrentTimeZone();
        if (!timezone) {
            return date;
        };
        var retValue = new Date(date.getTime());
        retValue.setHours(retValue.getHours() + timezone.BaseOffset.Hours);

        return retValue;
    };
    export const formatMask: (v: string, mask: string) => string = (v: string, mask: string): string => {
        let inputObject: any = $("<input />"); 
        return inputObject.inputmask({ mask }).val(v).val();
    };
    export const formatRFC: (v: string) => string = (v: string): string => {
        return formatMask(v, "A{3,4}-999999-[A|9][A|9][A|9]");
    };
    export const formatCURP: (v: string) => string = (v: string): string => {
        return formatMask(v, "A{3,4}-999999-AAAAAA-99");
    };
    export const formatTelefono: (v: string) => string = (v: string): string => {
        return formatMask(v, "(99) 9999-9999");
    };
    export const formatDate: (date: Date) => string = (date: Date): string => {
        if (!date || date === null) {
            return "";
        };
        var language: any = global.getCurrentLanguage();
        var userDate: Date = global.userDate(date);
        var datePattern: string = language.ShortDatePattern.toLowerCase();

        return $.fn.datepicker.DPGlobal.formatDate(userDate, datePattern, language.Clave);
    };
    export const formatUserDate: (date: Date) => string = (date: Date): string => {
        if (!date || date === null) {
            return "";
        };
        var language: any = global.getCurrentLanguage();

        return $.fn.datepicker.DPGlobal.formatDate(date, language.ShortDatePattern, language.Clave);
    };
    export const formatMoney: (data: number, moneda: any) => any = (data: any, moneda: any): any => {
        let retValue: string;

        if (!moneda || data === undefined || data === null) {
            return "";
        };

        let symbol: string = moneda.MoneySymbol ? moneda.MoneySymbol : ""; 
        let decimalDigits: number = moneda.DecimalDigits >= 0 ? moneda.DecimalDigits : 2;
        let decimalSeparator: string = moneda.DecimalSeparator ? moneda.DecimalSeparator : ".";
        let groupSeparator: string = moneda.GroupSeparator ? moneda.GroupSeparator : "";

        retValue = symbol +
            parseFloat(data).toFixed(decimalDigits).replace(/./g, function (c, i, a) {
            return i && c !== decimalSeparator && ((a.length - i) % 3 === 0) ? groupSeparator + c : c;
        });

        return retValue;
    };
    export const formatDateTime: (date: Date) => string = (date: Date): string => {
        if (!date || date === null) {
            return "";
        };
        var language: any = global.getCurrentLanguage();
        var userDate: Date = global.userDate(date);
        var shortPattern: string = language.ShortDatePattern.toLowerCase();
        var retValue: string = [
            $.fn.datepicker.DPGlobal.formatDate(userDate, shortPattern, language.Clave),
            " ",
            ("00"+userDate.getHours()).slice(-2),
            language.TimeSeparator,
            ("00"+userDate.getMinutes()).slice(-2),
            language.TimeSeparator,
            ("00"+userDate.getSeconds()).slice(-2)
        ].join("");

        return retValue;
    };

    export const FormatDateTimePre: (date: Date) => string = (date: Date): string =>{
        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let anio = date.getFullYear();
        let horas = date.getHours();
        let minutos = date.getMinutes();
        let segundos = date.getSeconds();

        let fechaFormato = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
        return fechaFormato
    }

    export const formatDateTimeDirect: (date: Date, formatL?: boolean) => string = (date: Date, formatL?: boolean): string => {
        if (!date || date === null) {
            return "";
        };
        var language: any = global.getCurrentLanguage();
        var shortPattern: string = language.ShortDatePattern.toLowerCase();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? 0 + minutes : minutes;
        var strTime = " " + ("00" + hours).slice(-2) + ':' + ("00" + minutes).slice(-2) + ' ' + ampm;
        if (formatL === undefined || formatL === null || formatL === false) {
            strTime = "";
        }
        var pad: string = "00";
        return (pad + date.getDate().toString()).slice(-pad.length) + "/" + (pad + (date.getMonth() + 1).toString()).slice(-pad.length) + "/"+ date.getFullYear() +  strTime;

    };

    export const formatTimePlanificacionSPV: (date: Date) => string = (date: Date): string => {
        if (!date || date === null) {
            return "";
        };
        var language: any = global.getCurrentLanguage();
        var shortPattern: string = language.ShortDatePattern.toLowerCase();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? 0 + minutes : minutes;
        var strTime = " " + ("00" + hours).slice(-2) + ':' + ("00" + minutes).slice(-2) + ' ' + ampm;
        return strTime;
    };

    export const formatLongDate: (date: Date) => string = (date: Date): string => {
        if (!date || date === null) {
            return "";
        };
        var language: any = global.getCurrentLanguage();
        var userDate: Date = global.userDate(date);

        return $.fn.datepicker.DPGlobal.formatDate(userDate, language.LongDatePattern, language.Clave);
    };
    export const formatLongDateTime: (date: Date) => string = (date: Date): string => {
        if (!date || date === null) {
            return "";
        };
        var language: any = global.getCurrentLanguage();
        var userDate: Date = global.userDate(date);
        var retValue: string = [
            $.fn.datepicker.DPGlobal.formatDate(userDate, language.LongDatePattern, language.Clave),
            " (",
            userDate.getHours(),
            language.TimeSeparator,
            userDate.getMinutes(),
            language.TimeSeparator,
            userDate.getSeconds(),
            ")"
        ].join("");

        return retValue;
    };
    export const getDateFormatted: (date: Date) => string = (date: Date): string => {
        var pad: string = "00";
        return (date !== undefined || date !== null) ?
            (pad + date.getDate().toString()).slice(-pad.length) + "/" +
            (pad + (date.getMonth() + 1).toString()).slice(-pad.length) + "/" +
            date.getFullYear() : "";
    };
    export const getDTDateFormatted: (date: Date, type: any, row: any) => string = (date: Date, type: any, row: any): string => {
        return getDateFormatted(date);
    }
    export const getTimestamp: (data: any) => Number = (data: any): Number => {
        if (data && data.timestamp) {
            return data.timestamp;
        } else {
            return 0;
        }
    }

    export const startloadingDxGrid: (IdTable: any) => any = (IdTable: any): any => {
        let _loader = document.getElementById(`_loader_${IdTable}`);
        let _loadedTable = document.getElementById(`_loaded_${IdTable}`);
        _loader.style.display = 'block';
        _loadedTable.style.display = 'none';
    }

    export const loadDxGridTable: (IdTable: any, columnas: any, dataSource: any, exportar?: any, filename?: any, loader?: any, loaded?: any, edit?: any) => any = (IdTable: any, columnas: any, dataSource: any, exportar?: any, filename?: any, loader?: any, loaded?: any, edit?: any): any => {
        let _loader = loader ? document.getElementById(loader) : document.getElementById('loading');
        let _loadedTable = loaded ? document.getElementById(loaded) : document.getElementById('loadedData');
        _loader.style.display = 'none';
        _loadedTable.style.display = 'inherit';
        let _alowEdit = edit ? edit : false;
        //console.log(IdTable, exportar, filename)
        try {
            $(`#${IdTable}`).dxDataGrid("dispose");
        } catch (ex) { } 
        let fecha = Date.now();
        let _exportar = exportar ? exportar : false;
        let _fileName = filename ? filename : 'Reporte_export_tmp_';
        let dataGrid = $(`#${IdTable}`).dxDataGrid({
            dataSource,
            allowColumnReordering: true,
            scrolling: {
                columnRenderingMode: "virtual"
            },
            columnAutoWidth: true,
            showBorders: false,
            grouping: {
                autoExpandAll: false,
            },
            export: {
                enabled: _exportar,
                fileName: `${_fileName}${fecha}`,
                allowExportSelectedData: false
            },
            editing: {
                mode: 'cell',
                allowUpdating: _alowEdit,
                allowAdding: false,
                allowDeleting: false,
            },
            columns: columnas,
            columnFixing: { enabled: true },
            showColumnLines: false,
            showRowLines: false,
            rowAlternationEnabled: true
        }).dxDataGrid("instance");
        dataGrid.refresh();
    }

    export const loadDxGrid: (IdTable: any, columnas: any, dataSource: any, exportar?: any, filename?: any, edit?: any, bordes?: any, summaries?: any, replaceExport?: any, rowlines?: any) => any = (IdTable: any, columnas: any, dataSource: any, exportar?: any, filename?: any, edit?: any, bordes?: any, summaries?: any, replaceExport?: any, rowlines?: any ): any => {
        let _loader = document.getElementById(`_loader_${IdTable}`);
        let _loadedTable = document.getElementById(`_loaded_${IdTable}`);
        _loader.style.display = 'none';
        _loadedTable.style.display = 'block';
        let _alowEdit = edit ? edit : false;
        let _bordes = bordes ? bordes : false;
        let _rowlines = rowlines ? rowlines : false;
        //console.log(IdTable, exportar, filename)
        try {
            $(`#${IdTable}`).dxDataGrid("dispose");
        } catch (ex) { }
        let fecha = Date.now();
        let _exportar = exportar ? exportar : false;
        let _fileName = filename ? filename : 'Reporte_export_tmp_';
        let dataGrid = $(`#${IdTable}`).dxDataGrid({
            dataSource,
            allowColumnReordering: true,
            scrolling: {
                columnRenderingMode: "virtual"
            },
            columnAutoWidth: true,
            showBorders: _bordes,
            //filterRow: {
            //    visible: true,
            //    applyFilter: 'auto',
            //},
            
            //headerFilter: {
            //    visible: true,
            //},
            grouping: {
                autoExpandAll: false,
            },
            export: {
                enabled: _exportar,
                fileName: `${_fileName}${fecha}`,
                allowExportSelectedData: false
            },
            onExporting:  (e) => {
                //console.log(e)
                if (replaceExport && replaceExport.length > 0) {
                    e.cancel = true;
                    for (const d of dataSource) {
                        for (let rep of replaceExport) {
                            d[rep.from] = d[rep.to];
                        }
                        // d.Estatus = d.Estatus_cve;
                    }
                    e.cancel = false;
                }
              
            },
            editing: {
                mode: 'cell',
                allowUpdating: _alowEdit,
                allowAdding: false,
                allowDeleting: false,
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 15, 25],
                showInfo: true
            },
            paging: {
                pageSize: 15
            },
            columns: columnas,
            summary: {
                totalItems:summaries
            },
            columnFixing: { enabled: true },
            showColumnLines: _bordes,
            showRowLines: _rowlines,
            rowAlternationEnabled: true
        }).dxDataGrid("instance");
        dataGrid.refresh();
    }

    export const loadDxGridTableComentarios: (IdTable: any, columnas: any, dataSource: any, exportar?: any, filename?: any, loader?: any, loaded?: any, edit?: any) => any = (IdTable: any, columnas: any, dataSource: any, exportar?: any, filename?: any, loader?: any, loaded?: any, edit?: any): any => {
        let _loader = loader ? document.getElementById(loader) : document.getElementById('loading');
        let _loadedTable = loaded ? document.getElementById(loaded) : document.getElementById('loadedData');
        _loader.style.display = 'none';
        _loadedTable.style.display = 'inherit';
        let _alowEdit = edit ? edit : false;
        //console.log(IdTable, exportar, filename)
        try {
            $(`#${IdTable}`).dxDataGrid("dispose");
        } catch (ex) { }
        let fecha = Date.now();
        let _exportar = exportar ? exportar : false;
        let _fileName = filename ? filename : 'Reporte_export_tmp_';
        let dataGrid = $(`#${IdTable}`).dxDataGrid({
            dataSource,
            allowColumnReordering: true,
            scrolling: {
                columnRenderingMode: "virtual"
            },
            columnAutoWidth: true,
            showBorders: false,
            grouping: {
                autoExpandAll: false,
            },
            export: {
                enabled: _exportar,
                fileName: `${_fileName}${fecha}`,
                allowExportSelectedData: false
            },
            editing: {
                mode: 'cell',
                allowUpdating: _alowEdit,
                allowAdding: false,
                allowDeleting: false,
            },
            onRowPrepared: (info) => {
                let dataRow = info.data;
                if (dataRow) {
                    //console.log(info)
                    //console.log(dataRow)
                    if (dataRow.verificado) {
                        info.rowElement.addClass('cr-row-bitacora-noverif');  
                    }
                }
                //if (data.verificado) {
                //    info.rowElement.addClass('cr-row-bitacora-noverif');  
                //}
               
            },
            onCellClick: (e) => {
                let item = e.data;
                if (e.columnIndex === 0) {
                   // console.log(e)
                    e.data.verificado = false;
                    dataGrid.refresh();
                    marcarComentarioVerificado(e)
                }
            },
            columns: columnas,
            columnFixing: { enabled: true },
            showColumnLines: false,
            showRowLines: false,
            rowAlternationEnabled: true
        }).dxDataGrid("instance");
        dataGrid.refresh();
    }

    const getColumnasBitacora: (item: any) => void = (item: any): void => {

    }

    const marcarComentarioVerificado: (item: any) => void = (item: any): void =>  {
        console.log(item);
        
        //let encodedFilters: string;
        //encodedFilters = global.encodeObject({ idCliente: item.IdCliente, OperacionEspecificaSP: "VerificarComentarioObtenerBitacora", IdComentario: item.ID });
        //global.dispatchAsync("global-page-data", "base/scv/BitacoraClienteSPV/all/" + encodedFilters, BITACORA_DETALLE_ID);
        //let totalNoVerificado = EK.Store.getState().global.TotalComentariosRevisar ? EK.Store.getState().global.TotalComentariosRevisar.data : 0;
        //totalNoVerificado--;
        //dispatchSuccessful('load::TotalComentariosRevisar', totalNoVerificado);
        //if (totalNoVerificado <= 0) {
        //    let btnbitacora = document.getElementById('btn_bitacora');
        //    btnbitacora.classList.remove("btn-income-data");
        //}
        //global.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
        //    encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);
    }

    export const dispatchDxTableAsyncGet: (TableID: any, URL: any, encodedFilters: any, columnas: any, exportar?: any, filename?: any, edit?: any, bordes?: any, summaries?: any, replaceExport?: any, rowlines?: any) => any = (TableID: any, URL: any, encodedFilters: any, columnas: any, exportar?: any, filename?: any, edit?: any, bordes?: any, summaries?: any, replaceExport?: any, rowlines?: any): any => {
        let _loader = document.getElementById(`_loader_${TableID}`);
        let _loadedTable = document.getElementById(`_loaded_${TableID}`);
        global.asyncGet(URL + encodedFilters, (status: AsyncActionTypeEnum, dataResponse: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            loadDxGrid(TableID, columnas, dataResponse, exportar, filename, edit, bordes, summaries)
                            break;
                        case AsyncActionTypeEnum.loading:
                            _loader.style.display = 'block';
                            _loadedTable.style.display = 'none';
                            break;
                        case AsyncActionTypeEnum.failed:
                            _loader.style.display = 'none';
                            _loadedTable.style.display = 'none';
                            break;
                    }
                });
    }

    export const dispatchDxTableAsyncPost: (TableID: any, URL: any, modelo: any, columnas: any, exportar?: any, filename?: any, edit?: any, bordes?: any, summaries?: any, replaceExport?: any, rowlines?: any) => any = (TableID: any, URL: any, modelo: any, columnas: any, exportar?: any, filename?: any, edit?: any, bordes?: any, summaries?: any, replaceExport?: any, rowlines?: any): any => {
        let _loader = document.getElementById(`_loader_${TableID}`);
        let _loadedTable = document.getElementById(`_loaded_${TableID}`);
        global.asyncPost(URL, { parametros: modelo}, (status: AsyncActionTypeEnum, dataResponse: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    loadDxGrid(TableID, columnas, dataResponse, exportar, filename, edit, bordes, summaries, replaceExport, rowlines)
                    break;
                case AsyncActionTypeEnum.loading:
                    _loader.style.display = 'block';
                    _loadedTable.style.display = 'none';
                    break;
                case AsyncActionTypeEnum.failed:
                    _loader.style.display = 'none';
                    _loadedTable.style.display = 'none';
                    break;
            }
        });
    }

    export const dispatchDxTableBitacoraAsyncGet: (TableID: any, URL: any, encodedFilters: any, columnas: any, exportar?: any, filename?: any, loader?: any, loaded?: any, edit?: any) => any = (TableID: any, URL: any, encodedFilters: any, columnas: any, exportar?: any, filename?: any, loader?: any, loaded?: any, edit?: any): any => {
        let _loader = loader ? document.getElementById(loader) : document.getElementById('loading');
        let _loadedTable = loaded ? document.getElementById(loaded) : document.getElementById('loadedData');
        global.asyncGet(URL + encodedFilters, (status: AsyncActionTypeEnum, dataResponse: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    loadDxGridTableComentarios(TableID, columnas, dataResponse, exportar, filename, loader, loaded, edit)
                    break;
                case AsyncActionTypeEnum.loading:
                    _loader.style.display = 'block';
                    _loadedTable.style.display = 'none';
                    break;
                case AsyncActionTypeEnum.failed:
                    _loader.style.display = 'none';
                    _loadedTable.style.display = 'none';
                    break;
            }
        });
    }



    export const hasChanged: (currentState: any, nextState: any) => boolean = (currentState: any, nextState: any): boolean => {
        let ct: any = currentState === undefined ? null : currentState;
        let nt: any = nextState === undefined ? null : nextState;

        try {
            if (ct !== null && nt !== null) {
                if (ct.timestamp && nt.timestamp) {
                    return ct.timestamp !== nt.timestamp;
                } else {
                    if (ct.ID && nt.ID) {
                        return ct.ID !== nt.ID;
                    } else {
                        return ct !== nt;
                    };
                };
            } else {
                if (ct === null && nt === null) {
                    return false;
                } else {
                    return true;
                };
            };
        } catch (e) {
            return true;
        }
    };
    export const hasChangedArray: (currentArray: any, nextArray: any) => boolean = (currentArray: any, nextArray: any): boolean => {
        let ca: any = currentArray === undefined ? null : currentArray;
        let na: any = nextArray === undefined ? null : nextArray;

        try {
            let different = false;
            if (ca.length !== na.length) {
                return true;
            } else {
                for (let i of ca) {
                    different = na.filter(x => x.ID === i.ID)[0] !== undefined ? true : false;
                   // different = isInArray;
                    if (different) {
                        break;
                    }
                }
            }
            return different;
        } catch (e) {
            return true;
        }
    };
    export const wasUpdated: (currentState: any, nextState: any, removeForm?: boolean) => boolean = (currentState: any, nextState: any, removeForm?: boolean): boolean => {
        let retValue: boolean = isUpdating(currentState) && isFullSuccessful(nextState);
        let returnCode: number = nextState.returnCode;

        if (removeForm === undefined || removeForm === null) {
            removeForm = true;
        };

        if (returnCode === undefined || returnCode === null) {
            returnCode = 0;
        };

        if (returnCode === 0) {
            if (retValue === true) {
                if (removeForm === true) {
                    Forms.remove();
                };
            };
        }
        else {
            retValue = false;
        };

        return retValue;
    };
    export const wasLoaded: (currentState: any, nextState: any) => boolean = (currentState: any, nextState: any): boolean => {
        let retValue: boolean = isLoadingOrUpdating(currentState) && isSuccessful(nextState);

        return retValue;
    };
    export const getData: (item: any, value?: any) => any = (item: any, value?: any): any => {
        if (!value) {
            value = {};
        };
        if (item && item.data) {
            return item.data;
        } else {
            return value;
        };
    };

    export const isActive: (item: any) => any = (item: any): any => {
        let retValue: boolean = false;

        if (isSuccessful(item)) {
            let data: any = getData(item);
            if (data.Estatus && data.Estatus.Clave === "A") {
                retValue = true;
            };
        };

        return retValue;
    };

    export const emptyViewMode: (item: any) => any = (item: any): any => {
        let retValue: boolean = false;

        if (isSuccessful(item)) {
            let data: any = getData(item);
            if (data.Estatus && data.Estatus.Clave === "A") {
                retValue = true;
            };
        };

        return retValue;
    };

    export const getDataID: (item: any) => any = (item: any): any => {
        let data: any = getData(item);

        if (data.ID) {
            return data.ID;
        } else {
            return 0;
        };
    };

    export const isEqualID: (left: any, right: any) => any = (left: any, right: any): any => {
        let retValue: boolean = false;

        if (left && right) {
            if (left.ID > 0 && right.ID > 0) {
                if (left.ID === right.ID) {
                    retValue = true;
                };
            };
        };

        return retValue;
    };

    export const areEqualID: (left: any, right: any) => boolean = (left: any, right: any): boolean => {
        let retValue: boolean = false;
        //
        let isLeftArray: boolean = left && left.constructor.name === "Array";
        let isRightArray: boolean = right && right.constructor.name === "Array";
        //
        if (isLeftArray && isRightArray) {
            let a1: any[] = left ? left : [];
            let a2: any[] = right ? right : [];
            //
            let a3: any = a1.filter(v1 => a2.some(v2 => global.isEqualID(v1, v2)));
            //
            retValue = (a1.length === a3.length) && (a2.length === a3.length);
        }
        else {
            retValue = global.isEqualID(left, right);
        };
        //
        return retValue;
    };
    export const groupArrayByCol: (array: any[], colName: any) => any[] = (array: any[], colName: any): any[] => {
        let retValue: any[] = [];
        let uniqueValues = array.map(item => item[colName]).filter((value, index, self) => self.indexOf(value) === index);

        for (let val of uniqueValues) {
            let filtrado = array.filter(x => x[colName] === val);
            if (filtrado.length > 0) {
                retValue.push({ [colName]: val, values: filtrado })
            }
        }
        return retValue; 
    };
    export const isDefault: (data: any) => boolean = (data: any): boolean => {
        if (data && data.status && data.status === AsyncActionTypeEnum.default) {
            return true;
        } else {
            return false;
        };
    };
    export const isDataElement: (data: any) => boolean = (data: any): boolean => {
        let retValue: boolean = false;

        if (!isNull(data) && !isNull(data.status) && !isNull(data.timestamp)) {
            retValue = true;
        };

        return retValue;
    };
    export const hasFailed: (data: any) => boolean = (data: any): boolean => {
        if (data && data.status && data.status === AsyncActionTypeEnum.failed) {
            return true;
        } else {
            return false;
        };
    };

    export const areEqual: (obj1: any, obj2: any) => boolean = (obj1: any, obj2: any): boolean => {
        let retValue = false;

        obj1 = isNull(obj1, {});
        obj2 = isNull(obj2, {});

        let obj1Name = obj1.constructor.name;
        let obj2Name = obj2.constructor.name;

        if (obj1Name === obj2Name) {
            if (obj1Name === "Object") {
                retValue = obj1.ID === obj2.ID;
            }
            else if (obj1Name === "Date") {
                retValue = obj1.getTime() === obj2.getTime();
            }
            else {
                retValue = obj1 === obj2;
            };
        };

        return retValue;
    };

    export const isNull: (obj: any, v?: any) => any = (obj: any, v: any): any => {
        let retValue: boolean = obj === undefined || obj === null;
        //
        if (v === undefined || v === null) {
            return retValue;
        }
        else {
            return (retValue === true) ? v : obj;
        };
    };

    export const isEmpty: (obj: any) => boolean = (obj: any): boolean => {
        let retValue: boolean = true;

        if (obj !== undefined && obj !== null) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    retValue = false;
                };

                break;
            };
        };

        return retValue;
    };

    export const isEmptyObject: (obj: any) => boolean = (obj: any): boolean => {
        let retValue: boolean = true;

        if (obj !== undefined && obj !== null && obj.ID >= 0) {
            for (var f in obj) {
                retValue = false;

                break;
            };
        };

        return retValue;
    };

    export const isEmptyObj:(json: any) => boolean = (json: any): boolean =>{
        return Object.keys(json).length === 0;
    }

    export const isSuccessful: (data: DataElement) => boolean = (data: DataElement): boolean => {
        if (data && data.status && data.status === AsyncActionTypeEnum.successful) {
            return true;
        } else {
            return false;
        };
    };

    export const isFullSuccessful: (data: DataElement) => boolean = (data: DataElement): boolean => {
        if (data &&
            data.status &&
            data.status === AsyncActionTypeEnum.successful && 
            data.actionResult === AsyncActionTypeEnum.successful) {
            return true;
        } else {
            return false;
        };
    };

    export const isLoading: (data: any) => boolean = (data: any): boolean => {
        if (data && data.status && data.status === AsyncActionTypeEnum.loading) {
            return true;
        } else {
            return false;
        };
    };

    export const isUpdating: (data: any) => boolean = (data: any): boolean => {
        if (data && data.status && data.status === AsyncActionTypeEnum.updating) {
            return true;
        } else {
            return false;
        };
    };

    export const isLoadingOrSuccessful: (data: any) => boolean = (data: any): boolean => {
        if (data && data.status && (data.status === AsyncActionTypeEnum.loading || data.status === AsyncActionTypeEnum.successful)) {
            return true;
        } else {
            return false;
        };
    };

    export const isLoadingOrUpdating: (data: any) => boolean = (data: any): boolean => {
        if (data && data.status && (data.status === AsyncActionTypeEnum.loading || data.status === AsyncActionTypeEnum.updating)) {
            return true;
        } else {
            return false;
        };
    };

    export const goModal: (id: string, url: string, p?: any, type?: string) => void = (id: string, url: string, p?: any, type?: string): void => {
        let modalObj: any = $("#" + id);
        let $iframe: any = $("#iframe_" + id);
        let encoded: string = p ? "&" + global.encodeParameters(p) : "";
        let modalType: string = type ? "&" + type : "";
        //
        modalObj.modal();
        //
        let urlModal: string;
        let ts: string = "&ts=" + Number(new Date());
        if (url && url.indexOf("#") >= 0) {
            urlModal = "?modal=1" + ts + modalType + encoded + url;
        }
        else {
            if (url.indexOf("?") >= 0) {
                urlModal = url + "&modal=1" + modalType + encoded + ts;
            }
            else {
                urlModal = url + "?modal=1" + modalType + encoded + ts;
            };
        };
        //$iframe.attr("src", "about:blank");
        $iframe.attr("src", urlModal);
    };
    export const setModalData: (id: string, data: any) => void = (id: string, data: any): void => {
        let w: any = window;
        let idFn: string = "$modal$" + id;
        //
        w[idFn] = data;
    };
    export const getFullUrl: (url: string, specialC?: string) => string = (url: string, specialC?: string ): string => {
        let retValue: string;
        let webAppName: string = $("meta[name=webappdir]").attr("content");
        //let serverName: string = $("meta[name=appdir]").attr("content");
        
        specialC = specialC === undefined || specialC === null ? "#" : "";  
        //
        if (url.indexOf("http") < 0) {
            if (url.indexOf(specialC+"/") < 0) {
                if (url.indexOf("/") == 0) {
                    url = specialC + url;
                }
                else {
                    url = specialC+"/" + url;
                }
            }
            //
            //retValue = serverName + url;
            retValue = window.location.href.split("/").slice(0, 3).join("/")
                + webAppName
                + (webAppName[webAppName.length -1] === "/" ? "" : "/")
                + (url[0] === "/" ? url.substring(1) : url);
        }
        else {
            retValue = url;
        }
        
        return retValue;
    };
    export const getModalData: (id: string) => any = (id: string): any => {
        let w: any = window;
        let idFn: string = "$modal$" + id;

        if (w.self !== w.top) {
            let parent: any = w.parent;
            //
            return parent[idFn];
        }
        else {
            return w[idFn];
        };
    };
    export const go: (url: string, relative?: boolean) => void = (url: string, relative?: boolean): void => {
        if (relative === true) {
            url = [getCurrentPath(), url].join("/");
        };

        let data: string = global.encodeObject({ url });

        location.href = "#/kontrol/go/" + data;
    };
    export const open: (url: string, relative?: boolean, target?: string) => void = (url: string, relative?: boolean, target?: string): void => {
        if (relative === true) {
            url = [getCurrentPath(), url].join("/");
        };

        if (!target) {
            target = "_blank";
        };

        let data: string = global.encodeObject({ url });

        window.open("#/kontrol/go/" + data, target);
    };

    export const goBack: () => void = (): void => {
        ReactRouter.hashHistory.goBack();
    };

    export const getCurrentPath: () => string = (): string => {
        try {
            return ReactRouter.hashHistory.getCurrentLocation().pathname;
        } catch (e) {
            return "";
        };
    };

    export const getStateItem: (path: string) => any = (path: string): any => {
        let state: any = EK.Store.getState();

        return global.getNestedProp(state, path);
    };

    export const isAgent: () => any = (): any => {
        try {
            let result: any = getData(EK.Store.getState().global.app).Me.IdAgente === null ? false : true;
            return result;
        } catch (ex) { }
    };

    export const getCurrentUser: () => any = (): any => {
        try {
            return getData(EK.Store.getState().global.app).Me;
        } catch (ex) { }
    };
    export const getCurrentTimeZone: () => any = (): any => {
        try {
            return getData(EK.Store.getState().global.app).TimeZone;
        } catch (ex) { }
    };
    export const getCurrentLanguage: () => any = (): any => {
        try {
            return getData(EK.Store.getState().global.app).Language;
        } catch (ex) { }
    };
    export const getCurrentContext: () => any = (): any => {
        try {
            return window["$$context"];
        } catch (e) {
            return {};
        };
    };
    export const getPageConfig: (config: DataElement) => page.IPageConfig = (config: DataElement): page.IPageConfig => {
        try {
            let dataConfig: page.IPageConfig = getData(config);

            return new page.PageConfig(dataConfig.id, dataConfig.modulo, dataConfig.slots, dataConfig.idML);
        } catch (e) {
            return null;
        };
    };
    export const createPageConfigFromState: (state: any) => page.IPageConfig = (state: any): page.IPageConfig => {
        try {
            let dataConfig: page.IPageConfig = getData(state.pageConfig);
            let retValue: page.IPageConfig = new page.PageConfig(dataConfig.id, dataConfig.modulo, dataConfig.slots, dataConfig.idML);
            retValue.state = state;

            return retValue;
        } catch (e) {
            return null;
        };
    };
    export const clonePageConfig: (pageConfig: page.IPageConfig) => page.IPageConfig = (pageConfig: page.IPageConfig): page.IPageConfig => {
        try {
            let retValue: page.IPageConfig = new page.PageConfig(pageConfig.id, pageConfig.modulo, pageConfig.slots);
            retValue.state = pageConfig.state;
            retValue.slot = pageConfig.slot;
            retValue.idML = pageConfig.idML;

            return retValue;
        } catch (e) {
            return null;
        };
    };
    export const createPageConfig: (id: string, modulo: string, slots?: any[], idML?: string, group?: string) =>
        page.IPageConfig = (id: string, modulo: string, slots?: any[], idML?: string, group?: string): page.IPageConfig => {

        try {
            return new page.PageConfig(id, modulo, slots, idML, group);
        } catch (e) {
            return null;
        };
    };
    export const setPageConfig: ({ id, modulo, slots, idML }) => any = ({id, modulo, slots, idML }): any => {
        try {
            dispatchSuccessful("global-page-config", { id, modulo, slots });
        } catch (e) {
            return {};
        };
    };
    export const decodeParameters: (p: string) => any = (p: string): any => {
        try {            
            let data: string = decodeURIComponent(atob(p));
            let retValue: any = JSON.parse(data);

            global.fixJsonDates(retValue);

            return retValue;
        } catch (e) {
            return "";
        };
    };
    export const encodeString: (p: any) => string = (p: any): string => {
        try {
            let filtros: string = btoa(encodeURIComponent(p));

            return filtros;
        } catch (e) {
            return "";
        };
    };
    export const encodeParameters: (p: any) => string = (p: any): string => {
        try {
            if (!p) {
                return "";
            };

            let data: any = JSON.stringify(p);
            let filtros: string = btoa(encodeURIComponent(data));

            return filtros;
        } catch (e) {
            return "";
        };
    };
    export const encodeFilters: (idForm: string) => string = (idForm: string): string => {
        try {
            let values: any = Forms.getValues(idForm);
            let retValue: any = {};

            if (values) {
                for (var p in values) {
                    let itemValue: any = values[p];
                    if (itemValue) {
                        if (isDataElement(itemValue)) {
                            retValue["Id" + p] = global.getDataID(itemValue);
                        }
                        else if (itemValue.constructor && itemValue.constructor.name === "Object") {
                            retValue["Id" + p] = itemValue.ID;
                        }
                        else {
                            retValue[p] = itemValue;
                        };
                    };
                };
            };
            return global.encodeParameters(retValue);
        } catch (e) {
            return "";
        };
    };
    export const getFilters: (obj: any) => string = (obj: any): string => {
        try {
            let values: any = obj;
            let retValue: any = {};

            if (values) {
                for (var p in values) {
                    let itemValue: any = values[p];

                    if (itemValue) {
                        if (isDataElement(itemValue)) {
                            let idItem: number = global.getDataID(itemValue);
                            if (idItem !== 0 && idItem !== -1) {
                                retValue["Id" + p] = idItem;
                            };
                        }
                        else if (itemValue.constructor && itemValue.constructor.name === "Object") {
                            if (itemValue.ID !== 0 && itemValue.ID !== -1) {
                                retValue["Id" + p] = itemValue.ID;
                            };
                        }
                        else {
                            retValue[p] = itemValue;
                        };
                    }
                };
            };
            return retValue;
        } catch (e) {
            return "";
        };
    };    
    export const encodeObject: (obj: any) => string = (obj: any): string => {
        try {
            let values: any = obj;
            let retValue: any = {};

            if (values) {
                for (var p in values) {
                    let itemValue: any = values[p];
                    if (itemValue) {
                        if (isDataElement(itemValue)) {
                            retValue["Id" + p] = global.getDataID(itemValue);
                        }
                        else if (itemValue.constructor && itemValue.constructor.name === "Object") {
                            retValue["Id" + p] = itemValue.ID;
                        }
                        else {
                            retValue[p] = itemValue;
                        };
                    };
                };

                return global.encodeParameters(retValue);
            }
            else {
                return "";
            };
        } catch (e) {
            return "";
        };
    };
    export const encodeAllURL: (modulo: string, tipo: string, parametros: any) => any =
        (modulo: string, tipo: string, parametros: any): any => {
        let encodedFilters: string = global.encodeObject(parametros);
        let retValue: string = ["base/", modulo, "/", tipo, "/all/", encodedFilters].join("");

        return retValue;
    };
    let defJsonFn: any = $.ajaxSettings.converters["text json"];
    $.ajaxSettings.converters["text json"] = (b: any): any => {
        let obj: any = defJsonFn(b);

        fixJsonDates(obj);

        return obj;
    };

    $.ajaxSetup({
        global: true,
        error: function (xhr, status, err) {
            if (xhr.status === -1) {
                alert("You were idle too long, redirecting to STS") //or something like that
                window.location.reload();
            }
        }
    });

    declare var toastr: any;
    export const warning: (message: string, title?: string) => void = (message: string, title?: string): void => {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };

        toastr.warning(message, title);
    };
    
    export const errorMessage: (message: string, title?: string) => void = (message: string, title?: string): void => {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "10000",
            "extendedTimeOut": "5000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };

        toastr.error(message, title);
    };

    export const success: (message: string, title?: string) => void = (message: string, title?: string): void => {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };

        toastr.success(message, title);
    };

    export const info: (message: string, title?: string) => void = (message: string, title?: string): void => {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };

        toastr.info(message, title);
    };

    export const confirm: (message: string, title?: string, confirmFn?: Function) => void =
        (message: string, title?: string, confirmFn?: Function): void => {
        swal({
            title: title,
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#64DD17",
            confirmButtonText: "Confirmar",
            closeOnConfirm: true
            }, confirmFn);

        $(('body > div.sweet-overlay') as any).css('z-index', '16777270');
        $(('body > div.sweet-alert') as any).css('z-index', '16777271');
    };

    export const confirmTrueFalse: (message: string, title?: string, confirmFn?: Function) => void =
        (message: string, title?: string, confirmFn?: Function): void => {
            swal({
                title: title,
                text: message,
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#64DD17",
                confirmButtonText: "Si",
                cancelButtonText:'NO',
                closeOnConfirm: true
            }, confirmFn);

            $(('body > div.sweet-overlay') as any).css('z-index', '16777270');
            $(('body > div.sweet-alert') as any).css('z-index', '16777271');
        };

    export const executeWorkerNotifications: any = (key: string): any => {
        let dispatchAsignaciones: () => any = (): any => {
           dispatchAsync("global-notifications", "kontrol/notifications/assigned");
           //dispatchAsync("global-notificationsApp", "Kontrol/notificationsapp/assigned");
        };
        let dispatchAsignacionesApp: () => any = (): any => {
            dispatchAsync("global-notificationsApp", "Kontrol/notificationsapp/assigned");
        }

        let IntervalTimerSendMail: any;

        let dispatchEnviarCorreoACat: () => any = (): any => {
            let fecha = new Date();
            let HoraActual = fecha.getHours();
            let minutos = fecha.getMinutes();
            
            if (HoraActual >= 18 &&  HoraActual < 19) { 
                //console.log('obtener los cat y sus detalles');
                global.asyncGet("scv/reportesFallas/GetListaCatsEnviarCorreo/", (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {
                       // console.log(data);
                        let index = 0;
                        loopSendMailAndSave(index, data);
                    }
                });
            } else {
                setTimeout(() => { dispatchEnviarCorreoACat() }, 300000);
            }
        };

        const loopSendMailAndSave: (indice, data) => any = (indice, data): any => {
            
            if (indice < data.length) {
                let fecha = new Date();
                let d = data[indice];
                let EstatusCompletoEnvio = localStorage.getItem('EstatusCompletoEnvio') !== null ? JSON.parse(localStorage.getItem('EstatusCompletoEnvio')) : [];
                let u = EstatusCompletoEnvio.filter(x => x.user === d.IdResponsableDictamen)[0];
                //console.log(d.IdResponsableDictamen, u.user);
               
                if (u === undefined) {
                    let p = { UltimoEnvio: d.UltimoEnvio, CorreoCat: d.CorreoCat, IdResponsableDictamen: d.IdResponsableDictamen, FoliosTerminados: d.FoliosTerminados };
                    global.asyncPost("base/kontrol/reportesFallas/GetBP/EnviarCorreoDiarioSingleCat/", { parametros: p }, (status2: AsyncActionTypeEnum, data2: any) => {
                        if (status2 === AsyncActionTypeEnum.successful) {
                            let stsEnviado = data2 > 0 ? 'E' : 'NE';
                            let estadoEnvio = { user: d.IdResponsableDictamen, sts: stsEnviado, lastDate: new Date().toString() };
                            EstatusCompletoEnvio.push(estadoEnvio);
                            localStorage.setItem('EstatusCompletoEnvio', JSON.stringify(EstatusCompletoEnvio));
                            //console.log(EstatusCompletoEnvio[indice]);
                            indice++;
                            setTimeout(() => {  loopSendMailAndSave(indice,data) },25000)
                        }
                    });    
                } else {
                    let ufe = new Date(u.lastDate);
                    if (fecha.getDate() !== ufe.getDate() || u.sts !== 'E') {
                        let p = { UltimoEnvio: d.UltimoEnvio, CorreoCat: d.CorreoCat, IdResponsableDictamen: d.IdResponsableDictamen, FoliosTerminados: d.FoliosTerminados };
                          global.asyncPost("base/kontrol/reportesFallas/GetBP/EnviarCorreoDiarioSingleCat/", { parametros: p }, (status2: AsyncActionTypeEnum, data2: any) => {
                            if (status2 === AsyncActionTypeEnum.successful) {
                                let stsEnviado = data2 > 0 ? 'E' : 'NE';
                                for (let e of EstatusCompletoEnvio) {
                                    if (e.user === d.IdResponsableDictamen) {
                                        e.sts = stsEnviado;
                                        e.lastDate = new Date().toString();
                                    }
                                }
                                localStorage.setItem('EstatusCompletoEnvio', JSON.stringify(EstatusCompletoEnvio));
                                indice++;
                                setTimeout(() => { loopSendMailAndSave(indice, data) }, 25000)
                          }
                        });
                    } else {
                      indice++;
                      loopSendMailAndSave(indice, data);
                    }
                }
            } else {
                //console.log('fin');
                setTimeout(() => {
                    dispatchEnviarCorreoACat();
                }, 300000)
            }
        }

        let SingleUserSendMail: () => any = (): any => {
            let usuario = EK.Store.getState().global.app.data.Me;
            //console.log(usuario);
            if (usuario.ID === 1150 || usuario.ID === 1) { // 1150, 2057
                dispatchEnviarCorreoACat();
                //setInterval(dispatchEnviarCorreoACat, 300000); //Cada 5 minutos = 1000 * 60 * 5
                //setInterval(dispatchEnviarCorreoACat, 60000); //Cada 2 minutos = 1000 * 60 * 5
            }
        };
        //if (global.isSuccessful(EK.Store.getState().global.app)) {
        //    dispatchAsync("global-notifications", "kontrol/notifications/assigned");
        //};

        let GetListaTiposNotificaciones: () => any = (): any => {
           global.dispatchAsync("load::ListaTipoAgenda", "catalogos/get(TipoAgenda)");
        };
        let GetListaPlazas: () => any = (): any => {
            dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
        };
        //dispatchEnviarCorreoACat();
        SingleUserSendMail();
        dispatchAsignaciones();
        dispatchAsignacionesApp();
        setInterval(dispatchAsignaciones, 180000);
        setInterval(dispatchAsignacionesApp, 120000);
        GetListaTiposNotificaciones();
        GetListaPlazas();
        //setInterval(dispatchEnviarCorreoACat, 300000);

        //var w: any = new Worker("../../Scripts/components/workers/WorkerTasks.js");

        //w.postMessage();
        //w.onmessage = (e: any): any => {
        //    if (e.data === "ResponseWorker") {
        //        dispatchAsync("global-notifications", "Kontrol/GetNotifications");
        //    };
        //};

        //window["$$worker"] = new Worker("../../Scripts/components/workers/WorkerTasks.js");

        //setTimeout(function () {
            
        //}, 5000);
    };

    export const getDateDiff: (d1: Date, d2: Date, f: string) => number = (d1: Date, d2: Date, f: string): number => {
        if (f === undefined || f === null) {
            f = "msecs";
        };

        var diff: number = d2.getTime() - d1.getTime();

        if (f === "days") {
            return diff / (1000 * 60 * 60 * 24);
        } else if (f === "hours") {
            return diff / (1000 * 60 * 60);
        } else if (f === "mins") {
            return diff / (1000 * 60);
        } else if (f === "secs") {
            return diff / (1000);
        } else if (f === "msecs") {
            return diff;
        };

        return 0;
    };

    export const requestAction: (action: string, data?: any, method?: string) => void = (action: string, data?: any, method?: string): void => {
        if (!method) {
            method = "get";
        };
        //
        let form = document.createElement("form");
        let formName: string = ["form_action_", Number(new Date())].join("");
        //
        form.setAttribute("action", action);
        form.setAttribute("method", method);
        form.setAttribute("target", formName);
        //
        if (data) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = JSON.stringify(data);

            form.appendChild(input);
        };
        //
        document.body.appendChild(form);
        var w = window.open("about:blank", formName);
        //
        form.submit();
        document.body.removeChild(form);
    };

    export const getToday: (withoutTime?: boolean) => Date = (withoutTime?: boolean): Date => {
        if (!withoutTime || withoutTime === undefined || withoutTime === null) {
            withoutTime = false;
        };

        var retValue: Date = new Date();

        if (withoutTime === true) {
            retValue.setHours(0, 0, 0, 0);
        };

        return retValue;
    };

    export const compareDates: (d1: Date, d2: Date, validacion: any) => boolean = (d1: Date, d2: Date, validacion: any): boolean => {
        let cDate: Date = d1 ? new Date(d1.getTime()) : null;
        let nDate: Date = d2 ? new Date(d2.getTime()) : null;
        if (cDate === null || nDate === null) return true;
        switch (validacion) {
            case '!=':
                return cDate.getTime() !== nDate.getTime();
            case '<':
                return cDate.getTime() < nDate.getTime();
            case '>':
                return cDate.getTime() > nDate.getTime();
            case '=':
                return cDate.getTime() == nDate.getTime();
            case '<=':
                return cDate.getTime() <= nDate.getTime();
            case '>=':
                return cDate.getTime() >= nDate.getTime();
            default:
                return false;
        }
    };

    export enum Catalogos {
        estatus = 0,
        ambitos = 1,
        tiposdato = 2,
        niveles = 3,
        companias = 4,
        monedas = 5,
        modulos = 6,
        tipocheque = 7,
        mediosPublicidad = 8,
        gradosInteres = 9,
        tareaEstatus = 11,
        posiciones = 12,
        estatusventa = 13,
        tipovisualizacionproyecto= 14
    }

    export const requireGlobal: (type: global.Catalogos) => void = (type: global.Catalogos): void => {
        if (type === Catalogos.estatus) {
            dispatchAsync("load::ESTATUS", "catalogos/get(estatus)");
        }
        else if (type === Catalogos.ambitos) {
            dispatchAsync("load::AMBITOS", "catalogos/get(ambito)");
        }
        else if (type === Catalogos.tiposdato) {
            dispatchAsync("load::TIPODATO", "catalogos/get(tipodato)");
        }
        else if (type === Catalogos.niveles) {
            dispatchAsync("load::NIVELES", "niveles/kv");
        }
        else if (type === Catalogos.companias) {
            let url: string = global.encodeAllURL("kontrol", "companias", { activos: 1 });
            dispatchAsync("load::COMPANIAS", url);
        }
        else if (type === Catalogos.modulos) {
            dispatchAsync("load::MODULOS", "modulos/key-value");
        }
        else if (type === Catalogos.tipocheque) {
            dispatchAsync("load::TIPOCHEQUE", "catalogos/get(tipocheque)");
        }
        else if (type === Catalogos.mediosPublicidad) {
            dispatchAsync("load::MEDIOSPUBLICIDAD", "catalogos/get(mediosPublicidad)");
        }
        else if (type === Catalogos.gradosInteres) {
            dispatchAsync("load::GRADOSINTERES", "catalogos/get(gradosInteres)");
        }
        else if (type === Catalogos.monedas) {
            let url: string = global.encodeAllURL("kontrol", "monedas", { activos: 1 });

            dispatchAsync("load::MONEDA", url);
        }
        else if (type === Catalogos.posiciones) {
            let url: string = global.encodeAllURL("kontrol", "posiciones", { estatus: "D", kv: 1 });

            dispatchAsync("load::POSICIONES", url);
        }
        else if (type === Catalogos.estatusventa) {
            let url: string = global.encodeAllURL("kontrol", "estatusventa", { idcatalogo: 59});

            dispatchAsync("load::ESTATUSVENTA", url);
        }
        else {
            let typeName: string;
            for (var c in Catalogos) {
                if (parseInt(c) === type) {
                    typeName = Catalogos[c].toUpperCase();

                    break;
                };
            };

            dispatchAsync("load::" + typeName, "catalogos/get(" + typeName + ")");
        }
    };
    export const getObtenerFecha: () => any = (): any => {
        var today: Date = new Date()
        //var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        return today;
    }
    export const getFechaModificada: () => any = (): any => {
        var today: Date = new Date()
        today.setDate(new Date().getDate() + 10);
        return today;
    }

     export const FechaPropuesta: (fecha: Date, horas: number, type? :any ) => Date = (fecha: Date, horas: number, type?:any): Date => {
        var language: any = global.getCurrentLanguage();
        var shortPattern: string = language.ShortDatePattern.toLowerCase();
        var hours = fecha.getHours();
        var minutes = fecha.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        if (type != undefined && type != null) {
            //hours = hours % 12;
            //hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? 0 + minutes : minutes;
            var strTime = " " + ("00" + hours).slice(-2) + ':' + ("00").slice(-2) + ' ' + ampm;

            var pad: string = "00";
            var retorno = new Date(fecha.getFullYear() + '-' + (pad + (fecha.getMonth() + 1).toString()).slice(-pad.length) + '-' + (pad + fecha.getDate().toString()).slice(-pad.length) + ' ' + ("00" + hours).slice(-2) + ':00:00Z');
            retorno = new Date(retorno.getTime() + (retorno.getTimezoneOffset() * (horas * 60000)));
        } else {
            //hours = hours % 12;
            //hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? 0 + minutes : minutes;
            var strTime = " " + ("00" + hours).slice(-2) + ':' + ("00").slice(-2) + ' ' + ampm;

            var pad: string = "00";
            var retorno = new Date(fecha.getFullYear() + '-' + (pad + (fecha.getMonth() + 1).toString()).slice(-pad.length) + '-' + (pad + fecha.getDate().toString()).slice(-pad.length) + ' ' + ("00" + hours).slice(-2) + ':00:00');
          //  retorno = new Date(retorno.getTime() + (retorno.getTimezoneOffset() * (horas * 60000)));
        }
        return retorno;
    }

    export const getGlobal: (type: Catalogos) => any = (type: Catalogos): any => {
        let state: any = EK.Store.getState();
        let data: any;

        if (type === Catalogos.estatus) {
            if (state.global && state.global.ESTATUS) {
                data = EK.Global.assign({}, state.global.ESTATUS);
                data.getActive = (): any => {
                    let o: any[] = data.data;
                    if (o) {
                        let e: any = o.filter((e: any) => e.Clave === "A");
                        if (e && e.length > 0) {
                            return e[0];
                        }
                    }
                };
                data.isActive = (item: any): any => {
                    let clave = data.getActive().Clave;

                    return item.Clave === clave;
                };
                data.getInactive = (): any => {
                    let o: any[] = data.data;
                    if (o) {
                        let e: any = o.filter((e: any) => e.Clave === "B");
                        if (e && e.length > 0) {
                            return e[0];
                        }
                    }
                };
                data.isInactive = (item: any): any => {
                    let clave = data.getInactive().Clave;

                    return item.Clave === clave;
                };
            }

            return data;
        }
        else {
            let typeName: string;
            for (var c in Catalogos) {
                if (parseInt(c) === type) {
                    typeName = Catalogos[c].toUpperCase();

                    break;
                };
            };

            if (state.global && state.global[typeName]) {
                data = EK.Global.assign({}, state.global[typeName]);
                data.get = (clave: string): any => {
                    let o: any[] = data.data;
                    if (o) {
                        let e: any = o.filter((e: any) => e.Clave === clave);
                        if (e && e.length > 0) {
                            return e[0];
                        }
                    }
                };
            };
        };

        return data;
    };

    export class EditForm {
        idForm: string;
        formState: any;
        formData: any;
        timestamp: number;

        constructor(idForm?: string, state?: any, formData?: any) {
            if (!state) {
                state = EK.Store.getState();
            };

            if (idForm) {
                this.idForm = idForm;
            } else {
                this.idForm = getData(state.global.page).id;
            };

            this.formState = {};
            if (formData) {
                this.formData = formData;
            }
            else {
                if (this.idForm && state && state.forms) {
                    this.formData = EK.Global.assign({}, state.forms[this.idForm]);
                }
            };

            if (this.formData && this.formData.form) {
                for (var e in this.formData.form) {
                    if (this.formData.form[e]) {
                        this[e] = this.formData.form[e].value;
                    };
                };
                this.timestamp = this.formData.timestamp;
            };
        };

        static getForm(formData: any): EditForm {
            return new EditForm(null, null, formData);
        };

        reset(): void {
            this.formState = {};
        };
        hasValue(value: any): boolean {
            if (value !== undefined &&
                value !== null) {

                return true;
            } else {
                return false;
            }
        }

        getValue(id: string): any {
            let value: any;

            try {
                value = this.formData.form[id].value;
            } catch (e) { }

            return value;
        };

        add(targetFieldName: string, fieldName?: any): EditForm {
            if (this.formData && this.formData.form) {
                let fieldKey: string = fieldName !== undefined ? fieldName : targetFieldName;
                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value)) {
                    this.formState[targetFieldName] = this.formData.form[fieldKey].value;
                }
            }

            return this;
        }

        addNumber(targetFieldName: string, fieldName?: any): EditForm {
            if (this.formData && this.formData.form) {
                let fieldKey: string = fieldName !== undefined ? fieldName : targetFieldName;
                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value)) {
                    this.formState[targetFieldName] = Number(this.formData.form[fieldKey].value);
                }
            }

            return this;
        }

        addNumberConst(targetFieldName: string, value: Number): EditForm {
            this.formState[targetFieldName] = value;

            return this;
        }

        addID(): EditForm {
            return this.addNumber("ID");
        };

        addClave(): EditForm {
            return this.addString("Clave");
        };

        addNombre(): EditForm {
            return this.addString("Nombre");
        };

        addDescripcion(): EditForm {
            return this.addString("Descripcion");
        };

        addVersion(): EditForm {
            return this.addString("Version");
        };

        addString(targetFieldName: string, fieldName?: any): EditForm {
            if (this.formData && this.formData.form) {
                let fieldKey: string = fieldName !== undefined ? fieldName : targetFieldName;
                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value)) {
                    if (this.formData.form[fieldKey].value.constructor.name === "Object") {
                        this.formState[targetFieldName] = JSON.stringify(this.formData.form[fieldKey].value);
                    } else {
                        this.formState[targetFieldName] = this.formData.form[fieldKey].value.toString();
                    }
                }
            }

            return this;
        }

        addStringConst(fieldName: string, value?: string): EditForm {
            this.formState[fieldName] = value;

            return this;
        };

        addBoolean(targetFieldName: string, fieldName?: string): EditForm {
            if (this.formData && this.formData.form) {
                let fieldKey: string = fieldName !== undefined ? fieldName : targetFieldName;
                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value)) {
                    this.formState[targetFieldName] = this.formData.form[fieldKey].value === true;
                }
            }

            return this;
        };

        addBooleanConst(fieldName: string, value?: boolean): EditForm {
            this.formState[fieldName] = value;

            return this;
        };

        addDateConst(fieldName: string, value?: Date): EditForm {
            this.formState[fieldName] = value;

            return this;
        };

        addDate(targetFieldName: string, fieldName?: any): EditForm {
            if (this.formData && this.formData.form) {
                let fieldKey: string = fieldName !== undefined ? fieldName : targetFieldName;
                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value) && this.formData.form[fieldKey].value) {
                    this.formState[targetFieldName] = new Date(this.formData.form[fieldKey].value).toISOString();
                }
            }
            return this;
        };

        addDateObject(targetFieldName: string, fieldName?: any): EditForm {
            if (this.formData && this.formData.form) {
                let fieldKey: string = fieldName !== undefined ? fieldName : targetFieldName;
                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value) && this.formData.form[fieldKey].value) {
                    this.formState[targetFieldName] = new Date(this.formData.form[fieldKey].value);
                }
            }
            return this;
        }

        addEstatus(targetFieldName?: string, fieldName?: any): EditForm {
            let retValue: any;
            let estatus: any = getGlobal(Catalogos.estatus);

            if (!targetFieldName) {
                targetFieldName = "Estatus";
            };

            if (this.formData && this.formData.form) {
                let fieldKey: string = fieldName ? fieldName : targetFieldName;

                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value)) {
                    if (this.formData.form[fieldKey].value.ID > 0)
                    {
                        this.formState[targetFieldName] = this.formData.form[fieldKey].value;
                    }
                    else
                    {
                        if (this.formData.form[fieldKey].value === true)
                        {
                            this.formState[targetFieldName] = estatus.getActive();
                        }
                        else
                        {
                            this.formState[targetFieldName] = estatus.getInactive();
                        }
                    }

                    if (this.formState[targetFieldName] !== null) {
                        this.formState["Id" + targetFieldName] = this.formState[targetFieldName].ID;
                    }
                    //this.formState[targetFieldName] =
                    //    this.formData.form[fieldKey].value === true
                    //        ? estatus.getActive() : (estatus.getInactive());
                } else {
                    this.formState[targetFieldName] = estatus.getActive();
                    this.formState["Id" + targetFieldName] = this.formState[targetFieldName].ID;
                };
            };

            return this;
        };
        addVisualizacionProyecto(targetFieldName?: string, targetModelName?: string, fieldName?: any): EditForm {
            let retValue: any;
            let estatus: any = getGlobal(Catalogos.tipovisualizacionproyecto);

            if (!targetFieldName) {
                targetFieldName = "TipoVisualizacion";
            };

            if (this.formData && this.formData.form) {
                let fieldKey: string = fieldName ? fieldName : targetFieldName;

                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value)) {
                    if (this.formData.form[fieldKey].value.ID > 0) {
                        this.formState[targetModelName] = this.formData.form[fieldKey].value;
                    }
                    else {
                        if (this.formData.form[fieldKey].value === true) {
                            this.formState[targetModelName] = estatus.get("PRI");
                        }
                        else {
                            this.formState[targetModelName] = estatus.get("PUB");
                        }
                    }

                    if (this.formState[targetModelName] !== null) {
                        this.formState["Id" + targetModelName] = this.formState[targetModelName].ID;
                    }
                    //this.formState[targetFieldName] =
                    //    this.formData.form[fieldKey].value === true
                    //        ? estatus.getActive() : (estatus.getInactive());
                } else {
                    this.formState[targetModelName] = estatus.get("PUB");
                    this.formState["Id" + targetModelName] = this.formState[targetModelName].ID;
                };
            };

            return this;
        };

        addFile(targetFieldName: string, fieldName?: any): EditForm {
            if (this.formData && this.formData.form) {
                let fieldKey: string = fieldName !== undefined ? fieldName : targetFieldName;
                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value)) {
                    //let elementId: string = this.formData.form[fieldKey].value.elementId;
                    let elementId: string = "formControl_" + fieldName;
                    if (elementId) {
                        if (this.formData.form[fieldKey].value === true) {
                            let fileElement: any = document.getElementById(elementId);
                            if (fileElement) {
                                if (fileElement.files && fileElement.files.length > 0) {
                                    this.formState[targetFieldName] = new EK.UX.Kontrol.File(fileElement.files[0]);
                                }
                            }
                        } else {
                            this.formState[targetFieldName] = null;
                        };
                    };
                };
            };

            return this;
        };

        addObject(targetFieldName: string, fieldName?: any) {
            if (this.formData && this.formData.form) {
                var fieldKey = fieldName !== undefined ? fieldName : targetFieldName;
                if (this.hasValue(this.formData.form[fieldKey]) && this.hasValue(this.formData.form[fieldKey].value)) {
                    let fState: any = this.formData.form[fieldKey].value;
                    //this.formState[targetFieldName] = this.formData.form[fieldKey].value;
                    if (fState !== undefined && fState !== null) {
                        if (isDataElement(fState)) {
                            this.formState[targetFieldName] =fState.data;
                        }
                        else {
                            if (fState.constructor.name === "Array") {
                                this.formState[targetFieldName] = fState;
                            }
                            else {
                                if (fState.ID && fState.ID < 1) {
                                    this.formState[targetFieldName] = null;
                                    this.formState["Id" + targetFieldName] = null;
                                }
                                else
                                {
                                    this.formState[targetFieldName] = fState;
                                    this.formState["Id" + targetFieldName] = fState.ID;
                                }
                               
                            }
                        }
                    }

                    //if (this.formState[targetFieldName] !== undefined && this.formState[targetFieldName] !== null) {
                    //    this.formState["Id" + targetFieldName] = this.formState[targetFieldName].ID;
                    //}
                }
            }

            return this;
        };

        addObjectCustomForm(targetFieldName: string, fieldName?: any, property?: string) {
            //Propiedad como se recibe en modelo = formState[property]
            if (property == null || property == undefined || property == "") {
                property = "CUSTOMFORM";
            }
            //ID Propiedad del elemento (fieldName)
            var fieldKey = fieldName !== undefined ? fieldName : targetFieldName;
            //Se añade CUSTOMFORM$ para estandarizar y facilitar lectura de elementos.
            targetFieldName = "CUSTOMFORM$" + fieldKey;

            let state: any = EK.Store.getState();
            let catalogo: any[] = getData(state.global['catalogo$CUSTOMFORM$' + fieldKey]); 

            this.formState[property] = ([]);

            //Se viene fieldName, no es parte de la ENTIDAD = FORMA PRINCIPAL. Ej. SectionList solo agrega una vez en la forma.
            if (fieldName !== undefined) {
                this.addToFormStateFromCatalogo(targetFieldName, property, catalogo);
            } else {
                let catalogos: any[] = this.getCatalogosState();
                for (var c in catalogos) {
                    catalogo = getData(state.global[catalogos[c]]);
                    let index: number = catalogos[c].indexOf("CUSTOMFORM");
                    let targetFieldNameC: string = catalogos[c].substring(index);
                    if (catalogo.length > 0) {
                        this.addToFormStateFromCatalogo(targetFieldNameC, property, catalogo);
                    }
                }
            }
            return this;
        };

        getCatalogosState(): any[] {
            let state: any = EK.Store.getState();
            let catalogos: any[] = [];
            for (var p in state.global) {
                let index: number = p.indexOf("catalogo$CUSTOMFORM");
                if (index >= 0) {
                    catalogos.push(p);
                };
            };
            return catalogos;
        };
        addToFormStateFromCatalogo(targetFieldName: string, property?: string, catalogo?: any[]) {
            let state: any = EK.Store.getState();
            let elementosCustomForm: DataElement = state.forms[targetFieldName].form;  

            if (state.forms[targetFieldName] && state.forms[targetFieldName].form) {
                let i: number;
                i = 0;
                let element: any = [];
                let elementoCatalogo: any = [];
                for (var key in catalogo) {
                    let customColumn: any = "EKFieldCustom_" + catalogo[i].PersonalizarCampos.Seccion.ID + "_" + catalogo[i].PersonalizarCampos.Configuracion.ID
                    elementoCatalogo[i] = catalogo[key];
                    switch (elementosCustomForm[customColumn].value.constructor.name) {
                        case "Object":
                            switch (elementoCatalogo[i]["PersonalizarCampos"].TipoCampo.Clave) {
                                case "ENT":
                                    elementoCatalogo[i]["ValorRegistro"] = elementosCustomForm[customColumn].value ? (elementosCustomForm[customColumn].value.ID).toString() : null;
                                    break;
                                case "LIS":
                                    elementoCatalogo[i]["ValorRegistro"] = elementosCustomForm[customColumn].value ? JSON.stringify(elementosCustomForm[customColumn].value) : null;
                                    break;
                            }
                            break;
                        case 'Date':
                            var valor: string;
                            var valor1: any = new Date(elementosCustomForm[customColumn].value);
                            var mes = ("00" + (valor1.getMonth() + 1)).slice(-2);
                            var periodo = valor1.getFullYear();
                            var dia = ("00" + valor1.getDate()).slice(-2);
                            valor = periodo + '-' + mes + '-' + dia + ' 00:00:00.000';
                            elementoCatalogo[i]["ValorRegistro"] = elementosCustomForm[customColumn].value ? valor : null;
                            break;
                        case 'Boolean':
                            elementoCatalogo[i]["ValorRegistro"] = elementosCustomForm[customColumn].value ? (elementosCustomForm[customColumn].value).toString() : false;
                            break;
                        case 'Number':
                            elementoCatalogo[i]["ValorRegistro"] = elementosCustomForm[customColumn].value ? (elementosCustomForm[customColumn].value).toString() : 0;
                            break;
                        case 'File':
                            //let a: any = this; 
                            //alert('archivo');
                            break;
                        default:
                            elementoCatalogo[i]["ValorRegistro"] = elementosCustomForm[customColumn].value ? (elementosCustomForm[customColumn].value).toString() : null;
                            break;
                    }
                    i++;
                };
                this.formState[property] = elementoCatalogo;
            }
        };

        addObjectConst(fieldName: string, value?: any) {
            this.formState[fieldName] = value;
            return this;
        };

        toObject(): any {
            return this.formState;
        };

        toForm(): FormData {
            let item: FormData = new FormData();
            for (var key in this.formState) {
                let data: any = this.formState[key];

                if (data !== undefined && data !== null) {
                    if (data.constructor.name === "Object") {
                        item.append(key, JSON.stringify(this.formState[key]));
                    } else {
                        item.append(key, this.formState[key]);
                    };
                };
            };

            return item;
        };
    }

    export const appendStyle: (id: string, style: string) => void = (id: string, style: string): void => {
        let s: any = $("#" + id);
        if (s.size() === 0) {
            $("<style type='text/css' id='" + id + "'>" + style + "</style>").appendTo("head");
        };
    };

    export const removeStyle: (id: string) => void = (id: string): void => {
        let s: any = $("#" + id);
        if (s.size() > 0) {
            s.remove();
        };
    };

    export const $ml: any = {};

    export interface IDataElement {
        status: AsyncActionTypeEnum;
        data: any | any[];
        timestamp: number;
        prevStatus?: AsyncActionTypeEnum;
        actionResult?: AsyncActionTypeEnum;
        returnCode?: number;
        returnMessage?: string;
        returnSeverity?: number;
        returnUpdateState?: boolean;

        getNextLowerID(): number;
        getActiveItems(): DataElement;
        removeItem(item: any): DataElement;
        upsertItem(item: any): DataElement;
    };

    export class StateDataManager {
        state: any;

        constructor(state?: any) {
            this.state = state;
        }

        getById(id: string): DataElement {
            let retValue: DataElement = null;
            
            for (var p in this.state) {
                let index: number = p.indexOf("$");
                if (index >= 0) {
                    let idState: string = p.substring(index + 1);
                    if (idState === id) {
                        retValue = this.state[p];

                        break;
                    };
                };
            };

            return retValue;
        };
    };

    export class DataElement implements IDataElement {
        status: AsyncActionTypeEnum;
        data: any | any[];
        timestamp: number;
        prevStatus?: AsyncActionTypeEnum;
        actionResult?: AsyncActionTypeEnum;
        returnCode?: number;
        returnMessage?: string;
        returnSeverity?: number;
        returnUpdateState?: boolean;

        constructor(data?: any) {
            this.status = AsyncActionTypeEnum.default;
            this.data = data;
            this.timestamp = Number(new Date());
            this.returnCode = 0;
            this.returnMessage = "";
            this.returnSeverity = 1;
            this.returnUpdateState = true;

            if (data) {
                if (data.status && data.timestamp) {
                    this.status = data.status;
                    this.data = data.data;
                    this.timestamp = data.timestamp;
                    this.returnCode = data.returnCode;
                    this.returnMessage = data.returnMessage;
                    this.returnSeverity = data.returnSeverity;
                    this.returnUpdateState = data.returnUpdateState;
                };
            };
        };

        getNextLowerID() : number {
            let id: number = 0;
            let data: any[] = getData(this);

            for (var i = 0; i < data.length; i++) {
                if (data[i].ID <= 0) {
                    if (data[i].ID < id) {
                        id = data[i].ID;
                    };
                };
            }
            id--;

            return id;
        };

        getUpdatedStateItems(): DataElement {
            let items: any[] = [];
            let thisItems: any[] = getData(this);

            if (thisItems && thisItems.length > 0) {
                thisItems.forEach((value: any, index: number) => {
                    if (value && value.Estado === 4) {
                        value._eliminado = true;
                    }
                    else if (value && value.Estado === 3) {
                        value._modificado = true;
                    }
                    else if (value && value.Estado === 1) {
                        value._nuevo = true;
                    };
                    items.push(value);
                });
            };

            let retValue: DataElement = new DataElement();
            retValue.status = this.status;
            retValue.data = items;
            retValue.timestamp = this.timestamp;

            return retValue;
        };

        getActiveItems(): DataElement {
            let items: any[] = [];
            let thisItems: any[] = getData(this);

            if (thisItems && thisItems.length > 0) {
                thisItems.forEach((value: any, index: number) => {
                    if (value && value._eliminado !== true) {
                        items.push(value);
                    };
                });
            };

            let retValue: DataElement = new DataElement();
            retValue.status = this.status;
            retValue.data = items;
            retValue.timestamp = this.timestamp;

            return retValue;
        };

        removeItem(item: any): DataElement {
            let items: any[] = [];
            let thisItems: any[] = isSuccessful(this) ? getData(this) : [];
            let thisItem: any = EK.Global.assign({}, item);

            thisItems.forEach((value: any, index: number) => {
                let itemTemp: any = EK.Global.assign({}, value);

                if (value.ID !== item.ID) {
                    items.push(itemTemp);
                };
            });

            if (thisItem.ID > 0) {
                thisItem._nuevo = undefined;
                thisItem._sincambios = undefined;
                thisItem._modificado = undefined;
                thisItem._eliminado = true;
                items.push(thisItem);
            };

            let retValue: DataElement = new DataElement();
            retValue.status = this.status;
            retValue.data = items;
            retValue.timestamp = Number(new Date());

            return retValue;
        };

        createInitialArray(): any[] {
            let retValue: any[] = [];
            let thisItems: any[] = isSuccessful(this) ? getData(this) : [];
            let modificado: boolean = false;

            thisItems.forEach((value: any, index: number) => {
                let itemTemp: any = EK.Global.assign({}, value);

                itemTemp._eliminado = undefined;
                itemTemp._nuevo = undefined;
                itemTemp._modificado = undefined;
                itemTemp._sincambios = true;

                retValue.push(itemTemp);
            });

            return retValue;
        };

        upsertItem(item: any, fn?: (item: any, newItem: any) => boolean): DataElement {
            let items: any[] = [];
            let thisItems: any[] = isSuccessful(this) ? getData(this) : [];
            let modificado: boolean = false;

            thisItems.forEach((value: any, index: number) => {
                if (value && value !== null) {
                    let itemTemp: any = EK.Global.assign({}, value);
                    let equalItem: boolean;

                    if (fn) {
                        equalItem = fn(value, item);
                    } else {
                        equalItem = value.ID === item.ID;
                    }

                    if (equalItem) {
                        for (var f in item) {
                            itemTemp[f] = item[f];
                        };
                        itemTemp._eliminado = undefined;
                        itemTemp._nuevo = undefined;
                        itemTemp._sincambios = undefined;
                        itemTemp._modificado = true;

                        modificado = true;
                    };

                    items.push(itemTemp);
                };
            });

            if (!modificado) {
                items.push(item);
            };

            let retValue: DataElement = new DataElement();
            retValue.status = this.status;
            retValue.data = items;
            retValue.timestamp = Number(new Date());

            return retValue;
        };

        insertItem(item: any): DataElement {
            let items: any[] = [];
            let thisItems: any[] = isSuccessful(this) ? getData(this) : [];

            thisItems.forEach((value: any, index: number) => {
                let itemTemp: any = EK.Global.assign({}, value);

                items.push(itemTemp);
            });
            item._nuevo = true;
            items.push(item);

            let retValue: DataElement = new DataElement();
            retValue.status = this.status;
            retValue.data = items;
            retValue.timestamp = Number(new Date());

            return retValue;
        };
    };

    export const supportLocalStorage: () => boolean = (): boolean => {
        if (typeof (Storage) !== undefined) {
            return true;
        } else {
            return false;
        };
    };

    export const getLocalStorage: () => Storage = (): Storage => {
        return w.localStorage;
    };
    export const filterFracc: (Fraccionamientos: any) => any = (Fraccionamientos: any): any => {
        let fraccs: string = "";
        //fraccs = Fraccionamientos && Fraccionamientos.length > 0 ? Fraccionamientos.map(f => f.ID).join(',') : null;
        fraccs = Fraccionamientos && Fraccionamientos.length > 0 ? Fraccionamientos.map(f => f.Clave).join(',') : null;
        return fraccs;
    };
};

import global = EK.Global;
import isEmptyObject = EK.Global.isEmptyObject;
import DataElement = EK.Global.DataElement;
import StateDataManager = EK.Global.StateDataManager;
import $ml = EK.Global.$ml;
import go = EK.Global.go;
import getData = EK.Global.getData;
import getDataID = EK.Global.getDataID;
import getCurrentContext = EK.Global.getCurrentContext;
import getTimestamp = EK.Global.getTimestamp;
import hasFailed = EK.Global.hasFailed;
import isDefault = EK.Global.isDefault;
import isSuccessful = EK.Global.isSuccessful;
import isFullSuccessful = EK.Global.isFullSuccessful;
import isLoading = EK.Global.isLoading;
import isUpdating = EK.Global.isUpdating;
import isLoadingOrUpdating = EK.Global.isLoadingOrUpdating;
import isLoadingOrSuccessful = EK.Global.isLoadingOrSuccessful;
import hasChanged = EK.Global.hasChanged;
import hasChangedArray = EK.Global.hasChangedArray;
import wasUpdated = EK.Global.wasUpdated;
import actionAsync = EK.Global.actionAsync;
import createSuccessfulStoreObject = EK.Global.createSuccessfulStoreObject;
import createDefaultStoreObject = EK.Global.createDefaultStoreObject;
import createLoadingStoreObject = EK.Global.createLoadingStoreObject;
import createFailedStoreObject = EK.Global.createFailedStoreObject;
import dispatchSync = EK.Global.dispatchSync;
import dispatchAsync = EK.Global.dispatchAsync;
import dispatchAsyncPut = EK.Global.dispatchAsyncPut;
import dispatchAsyncPost = EK.Global.dispatchAsyncPost;
import dispatchDefault = EK.Global.dispatchDefault;
import dispatchFailed = EK.Global.dispatchFailed;
import dispatchSuccessful = EK.Global.dispatchSuccessful;
import dispatchUpdating = EK.Global.dispatchUpdating;
import HttpMethod = EK.Global.HttpMethod;
import warning = EK.Global.warning;
import success = EK.Global.success;
import errorMessage = EK.Global.errorMessage;
import EditForm = EK.Global.EditForm;
import requireGlobal = EK.Global.requireGlobal;
import Catalogos = EK.Global.Catalogos;
import setCurrentEntityType = EK.Global.setCurrentEntityType;
import setCurrentEntity = EK.Global.setCurrentEntity;
import setCurrentLink = EK.Global.setCurrentLink;