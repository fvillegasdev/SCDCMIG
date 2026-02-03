namespace EK.Store.SCV.Reducers {
    "use strict";

    let conceptosPagoReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-conceptosPago-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-conceptosPago-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-conceptosPorTipo",
            property: "conceptos",
            default: []
        },
        {
            type: "scv-conceptosPago-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const conceptosPagoReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, conceptosPagoReducerManager);
    };
}