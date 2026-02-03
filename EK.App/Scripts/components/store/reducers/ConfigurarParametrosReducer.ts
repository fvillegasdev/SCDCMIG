/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let configurarParametrosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "configurarparametros-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "configurarparametros-catalogo",
            property: "configurarparametros",
            default: []
        },
        {
            type: "configurarparametros-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "configurarparametros-ambitos",
            property: "ambitos",
            default: {}
        },
        {
            type: "configurarparametros-cliente",
            property: "cliente",
            default: {}
        }
        
    ];

    export const ConfigurarParametrosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, configurarParametrosReducerManager);
    };
}