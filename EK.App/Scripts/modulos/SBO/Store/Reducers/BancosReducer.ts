namespace EK.Store.SBO.Reducers {
    "use strict";

    let bancosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "Bancos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "Bancos-catalogo",
            property: "Bancos",
            default: []
        },
               
        {
            type: "history-Bancos",
            property: "history",
            default: EK.Global.createDefaultStoreObject([])
        },
        {
            type: "Bancos-update",
            property: "selected",
            default: {}
        },
        {
            type: "Bancos-guardar",
            property: "selected",
            default: []
        },
        {
            type: "Bancos-catalogo-sat",
            property: "bsat",
            default: []
        },
    ];

    export const bancosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, bancosReducerManager);
    };
}