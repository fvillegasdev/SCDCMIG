namespace EK.Store.SBO.Reducers {
    "use strict";

    let proveedoresReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "Proveedores-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "Proveedores-catalogo",
            property: "proveedores",
            default: []
        },
    ];

    export const ProveedoresReducerManager: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, proveedoresReducerManager);
    };
}