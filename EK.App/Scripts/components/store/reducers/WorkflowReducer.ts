/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let workflowsReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "tipoWorkflow-catalogo",
            property: "flujoTipos",
            default:[]
        },
        {
            type: "tipoWorkflow-setSelected",
            property: "flujoTipoSelected",
            default: []
        },
        {
            type: "tipoWorkflow-save",
            property: "flujoTipos",
            default: []
        },
        {
            type: "tipoWorkflow-history",
            property: "flujoTiposHistory",
            default: []
        },
        {
            type: "flujos-list",
            property: "flujos",
            default: []
        },
        {
            type: "flujo-selected",
            property: "selected",
            default: {}
        },
        {
            type: "flujo-tareas",
            property: "tasks",
            default: []
        },
        {
            type: "flujo-tarea-reglas",
            property: "tareaReglas",
            default: []
        },
        {
            type: "save-workflow",
            property: "selected",
            default: {}
        },
        {
            type: "history-workflow",
            property: "history",
            default: []
        },
        {
            type: "flujo-listInstancias",
            property: "flujoInstancias",
            default: []
        },
        {
            type: "tarea-selected",
            property: "taskSelected",
            default: []
        },
        {
            type: "regla-selected",
            property: "reglaSelected",
            default: []
        },
        {
            type: "tarea-readOnly",
            property: "taskReadOnly",
            default: []
        },
        {
            type: "save-workflowtask",
            property: "tasks",
            default: []
        },
        {
            type: "delete-workflowtask",
            property: "tasks",
            default: []
        },

    ]

    export const WorkflowsReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, workflowsReducerManager);
    }
}