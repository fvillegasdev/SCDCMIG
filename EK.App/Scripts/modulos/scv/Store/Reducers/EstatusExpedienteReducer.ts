namespace EK.Store.SCV.Reducers {
    "use strict";

    let estatusExpedienteReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-estatusExpediente-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-estatusExpediente-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-estatusExpediente-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const estatusExpedienteReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, estatusExpedienteReducerManager);
    };
}