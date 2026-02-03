/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let seccionesParametrosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "secciones-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "secciones-catalogo",
            property: "secciones",
            default: []
        },
        {
            type: "history-secciones",
            property: "history",
            default: {}
        },
        {
            type: "history-seccion",
            property: "history",
            default: {}
        },
        {
            type: "secciones-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const seccionesParametrosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, seccionesParametrosReducerManager);
    };
}