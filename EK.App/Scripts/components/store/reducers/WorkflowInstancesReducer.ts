/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let workflowInstancesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "flujoInstancias-list",
            property: "flujoInstancias",
            default: []
        },
        {
            type: "flujoInstancias-selected",
            property: "selected",
            default: []
        },
        {
            type: "flujoInstancias-tareasInstancia",
            property: "tasksInstancia",
            default: []
        },
        {
            type: "flujoInstancias-notificadores",
            property: "notificadores",
            default: []
        },
        {
            type: "save-workflowInstance",
            property: "selected",
            default: []
        },
        {
            type: "history-workflowInstance",
            property: "history",
            default: []        
        },        
        {
            type: "workflowInstancia-Cancelar",
            property: "cancelado",
            default: []
        },
        {
            type: "workflowInstancia-Referencia",
            property: "referencia",
            default: []
        },
        {
            type: "tareaInstancia-selected",
            property: "taskInstanceSelected",
            default: []
        }
        ,
        {
            type: "tareaInstancia-documentos",
            property: "taskDocsAgregados",
            default: []
        },
        {
            type: "history-workflowtaskinstance",
            property: "taskInstanceHistory",
            default: []
        },
        {
            type: "tareaInstancia-selectedDocument",
            property: "taskInstanceSelectedDocument",
            default: []
        },
        {
            type: "autorizacionProceso",
            property: "processAutorization",
            default: []
        },
        {
            type: "autorizacionProceso-documentos",
            property: "processAutorizationDocs",
            default: []
        },
        {
            type: "update-process",
            property: "processAutorization",
            default: []
        }
        ,
        {
            type: "misProcesos-setSelected",
            property: "misProcesosSelected",
            default: []
        },
        {
            type: "misProcesos-list",
            property: "misProcesos",
            default: []
        },
        {
            type: "misProcesos-tipos",
            property: "misProcesosTipos",
            default: []
        },
        {
            type: "misTareas-setSelected",
            property: "misTareasSelected",
            default: []
        },
        {
            type: "misTareas-list",
            property: "misTareas",
            default: []
        }
    ]

    export const WorkflowInstancesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, workflowInstancesReducerManager);
    }

}