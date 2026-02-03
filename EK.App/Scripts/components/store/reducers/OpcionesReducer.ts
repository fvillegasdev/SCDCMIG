/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let opcionesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "opciones-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "opciones-catalogo",
            property: "opciones",
            default: []
        },
        {
            type: "opciones-guardar",
            property: "selected",
            default: {}
        },
    ];

    export const OpcionesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, opcionesReducerManager);
    };
}