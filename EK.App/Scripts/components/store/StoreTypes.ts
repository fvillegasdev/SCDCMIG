/// <reference path="../../typings/react/react-global.d.ts" />

namespace EK.Store {
    "use strict";

    export let BaseReducers: any = {};
    export let BaseRouter: any[] = [];

    /*
    define types of actions
    */

    export enum AsyncActionTypeEnum {
        default = 0,
        loading = 1,
        successful = 2,
        failed = 3,
        updating = 4
    }

    export interface IAsyncData {
        status: AsyncActionTypeEnum;
        data: any[];
        timeStamp: number;
    };

    export interface IAction extends Redux.Action {
        type: string;
        data: any;
        property?: string;
        status?: AsyncActionTypeEnum;
        actionResult?: AsyncActionTypeEnum;
        returnCode?: number;
        returnMessage?: string;
        returnSeverity?: number;
        returnUpdateState?: boolean;
        loading: boolean;
        successful: boolean;
        failed: boolean;
        default: boolean;
        updating: boolean;
    };

    export interface IActionType {
        type: string;
        action: (data: any, actionStatus?: AsyncActionTypeEnum) => IAction;
        actionAsync?: Function;
    };

    export const getAction: (type: string, data: any, actionStatus?: AsyncActionTypeEnum, property?: string) => IAction =
        (type: string, data: any, actionStatus?: AsyncActionTypeEnum, property?: string): IAction => {

            if (!actionStatus) {
                actionStatus = AsyncActionTypeEnum.default;
            }

            return {
                type,
                data,
                property,
                status: actionStatus,
                loading: actionStatus === EK.Store.AsyncActionTypeEnum.loading,
                successful: actionStatus === EK.Store.AsyncActionTypeEnum.successful,
                failed: actionStatus === EK.Store.AsyncActionTypeEnum.failed,
                default: actionStatus === EK.Store.AsyncActionTypeEnum.default,
                updating: actionStatus === EK.Store.AsyncActionTypeEnum.updating
            };
        };

    export const setActionStatus: (action: IAction, actionStatus?: AsyncActionTypeEnum) => IAction =
        (action: IAction, actionStatus?: AsyncActionTypeEnum): IAction => {

            if (!actionStatus) {
                actionStatus = AsyncActionTypeEnum.default;
            }

            return {
                type : action.type,
                data : action.data,
                status: actionStatus,
                loading: actionStatus === EK.Store.AsyncActionTypeEnum.loading,
                successful: actionStatus === EK.Store.AsyncActionTypeEnum.successful,
                failed: actionStatus === EK.Store.AsyncActionTypeEnum.failed,
                default: actionStatus === EK.Store.AsyncActionTypeEnum.default,
                updating: actionStatus === EK.Store.AsyncActionTypeEnum.updating
            };
        };

    export const actionCreator: (type: string, asyncActionFn?: Function) => IActionType =
        (type: string, asyncActionFn?: Function): IActionType => {

        return {
            type: type,
            action: (data: any, actionStatus?: AsyncActionTypeEnum): IAction => {
                if (!actionStatus) {
                    actionStatus = AsyncActionTypeEnum.default;
                }

                return {
                    type,
                    data,
                    status: actionStatus,
                    loading: actionStatus === EK.Store.AsyncActionTypeEnum.loading,
                    successful: actionStatus === EK.Store.AsyncActionTypeEnum.successful,
                    failed: actionStatus === EK.Store.AsyncActionTypeEnum.failed,
                    default: actionStatus === EK.Store.AsyncActionTypeEnum.default,
                    updating: actionStatus === EK.Store.AsyncActionTypeEnum.updating
                };
            },
            actionAsync: asyncActionFn
        };
    };

    export interface IActionSet {
        app: {
            changePage: IActionType
        };
        clientes: {
            setSelected: IActionType,
            cargarCompanias: IActionType
        };
        notification: {
            loadNotifications: IActionType,
            loadTasks: IActionType,
            loadMessages: IActionType
        };
        flujos: {
            setSelected: IActionType,
            cargarFlujos: IActionType,
            cargarTareas: IActionType,
            cargarNotificadores: IActionType,
            saveNotifier: IActionType,
            deleteNotifier: IActionType,
            setSelectedNotifier: IActionType,
            saveWorkflow: IActionType,
            historyWorkflow: IActionType
        };
        flujoInstancias: {
            setSelected: IActionType,
            cargaFlujoInstancias: IActionType,
            cargarTareas: IActionType,
            cargarNotificadores: IActionType,
            saveNotifier: IActionType,
            deleteNotifier: IActionType,
            setSelectedNotifier: IActionType,
            saveWorkflow: IActionType,
            historyWorkflow: IActionType
        };
    };

    export const actions: IActionSet = {
        app: {
            changePage: actionCreator("change_page")
        },
        clientes: {
            setSelected: actionCreator("clientes-setSelected"),
            cargarCompanias: null // actionCreator("clientes-companias", actionCargarCompanias)
        },
        notification : {
            loadNotifications: actionCreator("load-notifications"),
            loadTasks: actionCreator("load-tasks"),
            loadMessages: actionCreator("load-messages")            
        },
        flujos: {
            setSelected: actionCreator("flujo-selected"),
            cargarFlujos: actionCreator("flujos-list"),
            cargarTareas: actionCreator("flujo-tareas"),
            cargarNotificadores: actionCreator("flujo-notificadores"),
            saveNotifier: actionCreator("save-notificadores") , 
            deleteNotifier: actionCreator("delete-notificadores"),
            setSelectedNotifier: actionCreator("notifier-setSelected"),
            saveWorkflow: actionCreator("save-workflow"),
            historyWorkflow: actionCreator("history-workflow")
        },
        flujoInstancias: {
            setSelected: actionCreator("flujoInstancias-selected"),
            cargaFlujoInstancias: actionCreator("flujoInstancias-list"),
            cargarTareas: actionCreator("flujoInstancias-tareas"),
            cargarNotificadores: actionCreator("flujoInstancias-notificadores"),
            saveNotifier: actionCreator("save-notificadores"),
            deleteNotifier: actionCreator("delete-notificadoresWFInstance"),
            setSelectedNotifier: actionCreator("notifierWFInstance-setSelected"),
            saveWorkflow: actionCreator("save-workflowInstance"),
            historyWorkflow: actionCreator("history-workflowInstance")
        }
    };

    /*
    define main State object
    */
    // export interface IState {
    //    appCurrentPage: string;
    //    clientes_selected: any;
    //    clientes_companias: IAsyncData;
    // }

    export interface IAppSettings {
        currentPage: string;
        appInfo: {
            user: any;
            status: AsyncActionTypeEnum;
        };
    }

    // export const initialState: EK.Store.IState = {
    //    appCurrentPage: "",
    //    clientes_selected: {},
    //    clientes_companias: { state: AsyncActionTypeEnum.default, data: [] }
    // };

    export type asyncActionFn = (dispatch: Redux.Dispatch<any>, getState: () => any) => any;
}

import AsyncActionTypeEnum = EK.Store.AsyncActionTypeEnum;