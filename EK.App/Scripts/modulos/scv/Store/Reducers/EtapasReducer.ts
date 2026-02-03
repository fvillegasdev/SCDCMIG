namespace EK.Store.SCV.Reducers {
    "use strict";

    let etapasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "etapas-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "etapas-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "etapas-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const EtapasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, etapasReducerManager);
    };
}