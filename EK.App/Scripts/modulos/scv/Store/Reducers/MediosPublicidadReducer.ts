namespace EK.Store.SCV.Reducers {
    "use strict";

    let mediosPublicidadReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "mediosPublicidad-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "mediosPublicidad-catalogo",
            property: "medios",
            default: []
        },
        {
            type: "mediosPublicidad-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const mediosPublicidadReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, mediosPublicidadReducerManager);
    };
}