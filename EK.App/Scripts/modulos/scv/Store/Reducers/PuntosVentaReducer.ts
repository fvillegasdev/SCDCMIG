namespace EK.Store.SCV.Reducers {
    "use strict";
    let scvpuntosVentaReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-puntosVenta-catalogo",
            property: "catalogo",
            default: []
        }
    ];

    export const ScvpuntosVentaReducerManager: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, scvpuntosVentaReducerManager);
    };
}