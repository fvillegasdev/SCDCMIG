namespace EK.Store.SCV.Reducers {
    "use strict";

    let procesosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-procesos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-procesos-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-procesos-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const procesosObjReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, procesosReducerManager);
    };
}