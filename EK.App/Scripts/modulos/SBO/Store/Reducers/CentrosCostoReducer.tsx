namespace EK.Store.SBO.Reducers {
    "use strict";

    let centrosCostoReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "CentrosCosto-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "CentrosCosto-catalogo",
            property: "centroscosto",
            default: []
        },
    ];

    export const CentrosCostoReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, centrosCostoReducerManager);
    };
}