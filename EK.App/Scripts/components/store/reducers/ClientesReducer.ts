/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let clientesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "clientes-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "clientes-catalogo",
            property: "clientes",
            default: []
        },
        {
            type: "clientes-companias",
            property: "companias",
            default: {}
        },
        {
            type: "clientes-usuarios",
            property: "usuarios",
            default: {}
        },
        {
            type: "clientes-update",
            property: "selected",
            default: {}
        },
        {
            type: "clientes-parametros",
            property: "parametros",
            default: {}
        }
    ];

    export const ClientesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, clientesReducerManager);
    };
}