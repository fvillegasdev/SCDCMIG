namespace EK.Store.KONTROL.Reducers {
    "use strict";

    let tiposcambioReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "tiposcambio-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "tiposcambio-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "tiposcambio-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const TiposCambioReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, tiposcambioReducerManager);
    };
}