namespace EK.Store.SCV.Reducers {
    "use strict";

    let caracteristicaAdicionalReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "caracteristicaAdicional-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "caracteristicaAdicional-catalog",
            property: "catalog",
            default: []
        },
        {
            type: "caracteristicaAdicional-save",
            property: "selected",
            default: {}
        }
    ];

    export const caracteristicaAdicionalReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, caracteristicaAdicionalReducerManager);
    };
}