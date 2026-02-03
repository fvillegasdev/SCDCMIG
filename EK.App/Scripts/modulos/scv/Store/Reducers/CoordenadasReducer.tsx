namespace EK.Store.SCV.Reducers {
    "use strict";

    let coordenadasReduxMgr: EK.Global.IManagedReducerActions[] = [
        {
            type: "coordenadas-changed",
            property: "updCoordenadas",
            default: {}
        }
    ];

    export const coordenadasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, coordenadasReduxMgr);
    };
}