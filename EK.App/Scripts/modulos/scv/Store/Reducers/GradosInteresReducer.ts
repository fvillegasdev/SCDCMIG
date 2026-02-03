namespace EK.Store.SCV.Reducers {
    "use strict";

    let gradosInteresReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "gradosInteres-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "gradosInteres-catalogo",
            property: "gradosInteres",
            default: []
        },
        {
            type: "gradosInteres-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const GradosInteresReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, gradosInteresReducerManager);
    };
}