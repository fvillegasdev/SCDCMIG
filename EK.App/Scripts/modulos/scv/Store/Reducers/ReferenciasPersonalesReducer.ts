namespace EK.Store.SCV.Reducers {
    "use strict";

    let referenciasPersonalesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "referenciasPersonales-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "referenciasPersonales-catalogo",
            property: "referenciasPersonales",
            default: []
        },
        {
            type: "referenciasPersonales-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const referenciasPersonalesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, referenciasPersonalesReducerManager);
    };
}