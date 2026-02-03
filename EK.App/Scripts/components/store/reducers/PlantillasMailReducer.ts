/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let plantillasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "plantillas-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "plantillas-catalogo",
            property: "plantillas",
            default: []
        },
        {
            type: "plantillas-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const PlantillasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, plantillasReducerManager);
    };
}