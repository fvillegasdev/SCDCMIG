/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let companiasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "companias-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "companias-catalogo",
            property: "companias",
            default: []
        },
        {
            type: "companias-localidades",
            property: "localidades",
            default: []
        },
        {
            type: "companias-clientes",
            property: "clientes",
            default: []
        },
        {
            type: "companias-usuarionivel",
            property: "companiausuarionivel",
            default: []
        },
        {
            type: "companias-deletecompaniausuarionivel",
            property: "companiausuarionivel",
            default: []
        },
        {
            type: "companias-guardar",
            property: "selected",
            default: []
        },
        {
            type: "companias-parametros",
            property: "parametros",
            default: []
        },
        {
            type: "companias-vivienda",
            property: "vivienda",
            default: []
        }

    ];

    export const CompaniasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, companiasReducerManager);
    };
}