namespace EK.Store.SCV.Reducers {
    "use strict";

    let centralesObrerasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-centralesObreras-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-centralesObreras-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-centralesObreras-kv",
            property: "kv",
            default: []
        },
        {
            type: "scv-centralesObreras-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const centralesObrerasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, centralesObrerasReducerManager);
    };
}