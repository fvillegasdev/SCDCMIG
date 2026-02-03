namespace EK.Store.SCV.Reducers {
    "use strict";

    let planesPagosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-planesPagos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-planesPagos-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-planesPagos-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "scv-planesPagos-conceptosPago",
            property: "conceptosPago",
            default: []
        },
        {
            type: "scv-planesPagos-conceptosPago-setSelected",
            property: "conceptosPagoSelected",
            default: {}
        }
    ];

    export const planesPagosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, planesPagosReducerManager);
    };
}