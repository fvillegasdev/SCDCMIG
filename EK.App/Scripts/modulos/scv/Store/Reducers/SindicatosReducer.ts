namespace EK.Store.SCV.Reducers {
    "use strict";

    let sindicatosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-sindicatos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-sindicatos-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-sindicatos-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const sindicatosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, sindicatosReducerManager);
    };
}