/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let tareaestatusReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "tareaestatus-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "tareaestatus-catalogo",
            property: "tareaestatus",
            default: []
        },
        {
            type: "tareaestatus-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const TareaEstatusReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, tareaestatusReducerManager);
    };
}