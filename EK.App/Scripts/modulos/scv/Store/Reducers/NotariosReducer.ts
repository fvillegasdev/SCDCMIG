namespace EK.Store.SCV.Reducers {
    "use strict";
    let scvnotariosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-notarios-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-notarios-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-notarios-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const ScvnotariosReducerManager: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, scvnotariosReducerManager);
    };
}