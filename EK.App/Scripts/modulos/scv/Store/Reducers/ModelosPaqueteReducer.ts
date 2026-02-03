namespace EK.Store.SCV.Reducers {
    "use strict";

    let modelosPaqueteReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "modelosPaquete-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "modelosPaquete-catalogo",
            property: "modelosPaquete",
            default: []
        },
        {
            type: "modelosPaquete-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const modelosPaqueteReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, modelosPaqueteReducerManager);
    };
}