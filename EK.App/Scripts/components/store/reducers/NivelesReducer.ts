/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let nivelesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "niveles-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "niveles-catalogo",
            property: "niveles",
            default: []
        },
        {
            type: "niveles-configuracion",
            property: "configuracion",
            default: {}
        },
        {
            type: "history-niveles",
            property: "history",
            default: {}
        },
        {
            type: "history-nivel",
            property: "history",
            default: {}
        },
        {
            type: "niveles-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "niveles-configuracion-guardar",
            property: "configuracion",
            default: {}
        },
        {
            type: "niveles-acciones",
            property: "acciones",
            default: {}
        },
        {
            type: "niveles-clientes",
            property: "clientes",
            default: []
        }
    ];

    export const NivelesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, nivelesReducerManager);
    };
}