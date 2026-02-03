namespace EK.Store.SCV.Reducers {
    "use strict";

    let PrototiposReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-prototipos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-prototipos-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "svc-prototipos-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const PrototiposReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, PrototiposReducerManager);
    };
}