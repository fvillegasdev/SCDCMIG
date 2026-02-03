/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let flujoestatusReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "flujoestatus-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "flujoestatus-catalogo",
            property: "flujoestatus",
            default: []
        },
        {
            type: "flujoestatus-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const FlujoEstatusReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, flujoestatusReducerManager);
    };
}