namespace EK.Store.SCV.Reducers {
    "use strict";

    let estatusUbicacionReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "estatusubicacion-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "estatusubicacion-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "estatusubicacion-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const EstatusUbicacionReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, estatusUbicacionReducerManager);
    };
}