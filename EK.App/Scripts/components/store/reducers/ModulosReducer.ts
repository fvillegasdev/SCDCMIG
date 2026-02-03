/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let modulesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "modulos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "modulos-opciones",
            property: "opciones",
            default: {}
        },
        {
            type: "opciones-acciones",
            property: "acciones",
            default: {}
        },
        {
            type: "modulos-catalogo",
            property: "modulos",
            default: []
        },
        {
            type: "history-modulos",
            property: "history",
            default: {}
        },
        {
            type: "history-modulo",
            property: "history",
            default: {}
        },
        {
            type: "modulos-guardar",
            property: "selected",
            default: []
        },
        {
            type: "modulos-parametros",
            property: "parametros",
            default: []
        },
    ];

    export const ModulosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, modulesReducerManager);
    };
}