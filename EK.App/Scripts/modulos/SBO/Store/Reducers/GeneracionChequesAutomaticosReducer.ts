namespace EK.Store.SBO.Reducers {
    "use strict";

    let generacionChequesAutomaticosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "SBO-chequesautomaticos-tipocheque",
            property: "tipocheque",
            default: []
        },
        {
            type: "SBO-chequesautomaticos-tipocheques",
            property: "tipocheques",
            default: []
        },
        {
            type: "SBO-chequesautomaticos-pagosprogramados",
            property: "pagosprogramados",
            default: []
        },
        {
            type: "SBO-chequesautomaticos-pagosSelected",
            property: "pagosSelected",
            default: []
        },
        {
            type: "SBO-chequesautomaticos-pagosaGenerar",
            property: "pagosaGenerar",
            default: []
        },
        {
            type: "SBO-chequesautomaticos-saveresult",
            property: "result",
            default: []
        },
    ];

    export const GeneracionChequesAutomaticosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, generacionChequesAutomaticosReducerManager);
    };
}