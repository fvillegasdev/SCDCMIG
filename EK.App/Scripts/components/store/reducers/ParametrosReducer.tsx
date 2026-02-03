/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let parametrosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "parametros-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "parametros-catalogo",
            property: "parametros",
            default: []
        },
        {
            type: "parametros-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "parametros-ambitos",
            property: "ambitos",
            default: {}
        },
        {
            type: "parametros-seccion",
            property: "seccion",
            default: {}
        }
    ];

    export const ParametrosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, parametrosReducerManager);
    };
}