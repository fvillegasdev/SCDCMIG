namespace EK.Store.SBO.Reducers {
    "use strict";

    let subtipoMovimientoReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "SubTipoMovimiento-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "SubTipoMovimiento-catalogo",
            property: "SubTipoMovimiento",
            default: []
        },

        {
            type: "history-SubTipoMovimiento",
            property: "history",
            default: EK.Global.createDefaultStoreObject([])
        },
        {
            type: "SubTipoMovimiento-update",
            property: "selected",
            default: {}
        },
        {
            type: "SubTipoMovimiento-guardar",
            property: "selected",
            default: []
        }
    ];

    export const SubTipoMovimientoReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, subtipoMovimientoReducerManager);
    };
}