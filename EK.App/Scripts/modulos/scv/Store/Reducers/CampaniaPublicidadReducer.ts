namespace EK.Store.SCV.Reducers {
    "use strict";

    let campaniaPublicidadReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "campaniaPublicidad-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "campaniaPublicidad-catalogo",
            property: "campaniaPublicidad",
            default: []
        },
        {
            type: "campaniaPublicidad-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const campaniaPublicidadReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, campaniaPublicidadReducerManager);
    };
}