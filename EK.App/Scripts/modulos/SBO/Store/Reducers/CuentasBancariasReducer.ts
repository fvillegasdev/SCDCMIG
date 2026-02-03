namespace EK.Store.SBO.Reducers {
    "use strict";

    let cuentasBancariasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "CuentasBancarias-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "CuentasBancarias-catalogo",
            property: "cuentabancaria",
            default: []
        },
               
        {
            type: "history-CuentasBancarias",
            property: "history",
            default: EK.Global.createDefaultStoreObject([])
        },
        {
            type: "CuentasBancarias-update",
            property: "selected",
            default: {}
        },
        {
            type: "CuentasBancarias-guardar",
            property: "selected",
            default: []
        }
    ];

    export const CuentasBancariasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, cuentasBancariasReducerManager);
    };
}