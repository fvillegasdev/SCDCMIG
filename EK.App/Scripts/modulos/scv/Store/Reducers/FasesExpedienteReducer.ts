namespace EK.Store.SCV.Reducers {
    "use strict";

    let fasesExpedienteReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-fasesExpediente-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-fasesExpediente-kv",
            property: "kv",
            default: []
        }
    ];

    export const fasesExpedienteReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, fasesExpedienteReducerManager);
    };
}