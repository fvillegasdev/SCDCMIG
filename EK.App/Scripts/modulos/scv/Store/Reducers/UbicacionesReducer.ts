namespace EK.Store.SCV.Reducers {
    "use strict";

    let ubicacionesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "ubicaciones-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "ubicaciones-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "ubicaciones-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "ubicaciones-desarrollo-prototipos",
            property: "prototipos",
            default: []
        },
        {
            type: "ubicaciones-caracteristicas",
            property: "caracteristicas",
            default: []
        },
        {
            type: "ubicaciones-caracteristicas-setSelected",
            property: "caracteristicaSelected",
            default: {}
        },
        {
            type: "ubicaciones-caracteristicas-adicionales",
            property: "adicionales",
            default: []
        }
    ];

    export const ubicacionesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, ubicacionesReducerManager);
    };
}