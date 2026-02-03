namespace EK.Store.SBO.Reducers {
    "use strict";

    let tipoMovimientoReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "TipoMovimiento-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "TipoMovimiento-catalogo",
            property: "tipomovimiento",
            default: []
        },
               
        {
            type: "history-TipoMovimiento",
            property: "history",
            default: EK.Global.createDefaultStoreObject([])
        },
        {
            type: "TipoMovimiento-update",
            property: "selected",
            default: {}
        },
        {
            type: "TipoMovimiento-guardar",
            property: "selected",
            default: []
        }
    ];

    export const TipoMovimientoReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, tipoMovimientoReducerManager);
    };
}