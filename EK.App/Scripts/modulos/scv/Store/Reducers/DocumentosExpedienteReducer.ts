namespace EK.Store.SCV.Reducers {
    "use strict";

    let documentosExpedienteReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-documentosExpediente-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-documentosExpediente-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-documentosExpediente-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const documentosExpedienteReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, documentosExpedienteReducerManager);
    };
}