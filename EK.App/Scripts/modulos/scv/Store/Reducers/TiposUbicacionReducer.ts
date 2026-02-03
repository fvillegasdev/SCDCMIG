namespace EK.Store.SCV.Reducers {
    "use strict";

    let tiposUbicacionReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "tiposUbicacion-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "tiposUbicacion-catalogo",
            property: "tiposUbicacion",
            default: []
        },
        {
            type: "tiposUbicacion-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const tiposUbicacionReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, tiposUbicacionReducerManager);
    };
}