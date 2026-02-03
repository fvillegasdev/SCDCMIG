/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let clasificadoresReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "clasificadores-tipos",
            property: "tipoClasificadores",
            default: {}
        },
        {
            type: "clasificadores-clasificadores",
            property: "clasificadores",
            default: {}
        },
        {
            type: "clasificadores-clasificadoresentidad",
            property: "clasificadoresPorEntidad",
            default: {}
        },
        {
            type: "clasificadores-perfil",
            property: "clasificadoresPorPerfil",
            default: {}
        },
        {
            type: "clasificadores-save",
            property: "clasificadoresPorEntidad",
            default: {}
        },
        {
            type: "clasificadores-acciones",
            property: "acciones",
            default: []
        },
        {
            type: "clasificadores-clasificador",
            property: "clasificador",
            default: {}

        },
        {
            type: "clasificadores-item",
            property: "item",
            default: {}

        },
        {
            type: "clasificadores-tipo",
            property: "tipoClasificador",
            default: {}

        },
        {
            type: "clasificadores-clasificadoresentidad-original",
            property: "clasificadoresPorEntidadOriginal",
            default: {}
        },        
        {
            type: "tiposClasificador-history",
            property: "tiposClasificadorHistory",
            default: {}

        },
        {
            type: "clasificadores-tipo-save",
            property: "tipoClasificador",
            default: {}

        },
        {
            type: "clasificadores-temporales",
            property: "clasificadoresTemporales",
            default: {}

        }
    ];

    export const ClasificadoresReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, clasificadoresReducerManager);
    };
}