namespace EK.Store.SBO.Reducers {
    "use strict";

    let batchReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "Bancos-Batchs",
            property: "batchs",
            default: {}
        },
        {
            type: "Bancos-setBatchSelected",
            property: "batchSelected",
            default: {}
        },
        {
            type: "SBO-batch-total",
            property: "batchTotal",
            default: {}
        }
    ];

    export const BatchReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, batchReducerManager);
    };

}
