namespace EK.Store.SCV.Reducers {
    "use strict";

    let segmentosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "segmentos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "segmentos-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "segmentos-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const segmentosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, segmentosReducerManager);
    };
}