/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let estatusReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "estatus-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "estatus-catalogo",
            property: "estatus",
            default: []
        },
        {
            type: "estatus-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const EstatusReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, estatusReducerManager);
    };
}