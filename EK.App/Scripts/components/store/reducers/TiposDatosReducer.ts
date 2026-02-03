/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let tipopdatosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "tiposdatos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "tiposdatos-catalogo",
            property: "tiposdatos",
            default: []
        },
        {
            type: "tiposdatos-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const TipoDatosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, tipopdatosReducerManager);
    };
}