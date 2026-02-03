namespace EK.Store.SBO.Reducers {
    "use strict";

    let chequesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "SBO-cheques-reporteDetallado",
            property: "reporteDetallado",
            default: {}
        },
        {
            type: "SBO-cheques-catalogo",
            property: "cheques",
            default: []
        },
        {
            type: "SBO-cheques-setSelected",
            property: "setSelected",
            default: []
        },
        {
            type: "SBO-cheques-maxmin",
            property: "chequesMaxMin",
            default: []
        },
        {
            type: "SBO-cheques-selected",
            property: "chequesSelected",
            default: []
        },
        {
            type: "SBO-cheques-listSelected",
            property: "chequesListSelected",
            default: []
        },
        {
            type: "SBO-cheques-total",
            property: "batchTotal",
            default: {}
        },
        {
            type: "SBO-cheques-guardar",
            property: "setSelected",
            default: []
        },
        {
            type: "SBO-cheques-consecutivo",
            property: "consecutivo",
            default: {}
        },
        {
            type: "SBO-cheques-cantidadLetra",
            property: "cantidadLetra",
            default: {}
        },
        {
            type: "SBO-cheques-checkListchecked",
            property: "chequesListChecked",
            default: {}
        }
    ];

    export const ChequesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, chequesReducerManager);
    };

}
