namespace EK.Store.SCV.Reducers {
    "use strict";

    let segmentosVigenciasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "segmentosvigencias-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "segmentosvigencias-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "segmentosvigencias-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const SegmentosVigenciasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, segmentosVigenciasReducerManager);
    };
}