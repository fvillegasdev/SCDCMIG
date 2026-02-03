namespace EK.Store.SCV.Reducers {
    "use strict";

    let tiposCaracteristicaAdicionalReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "tiposCaracteristica-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "tiposCaracteristica-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "tiposCaracteristica-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const tiposCaracteristicaAdicionalReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, tiposCaracteristicaAdicionalReducerManager);
    };
}