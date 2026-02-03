namespace EK.Store.SCV.Reducers {
    "use strict";

    let institucionesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "instituciones-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "instituciones-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "instituciones-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "instituciones-esquemas",
            property: "esquemas",
            default: []
        },
        {
            type: "instituciones-esquemas-setSelected",
            property: "esquemaSelected",
            default: {}
        }
    ];

    export const InstitucionesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, institucionesReducerManager);
    };
}