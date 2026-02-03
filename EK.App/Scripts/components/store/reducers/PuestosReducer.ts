/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let puestosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "puestos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "puestos-catalogo",
            property: "puestos",
            default: []
        },
        {
            type: "puestos-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const PuestosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, puestosReducerManager);
    };
}