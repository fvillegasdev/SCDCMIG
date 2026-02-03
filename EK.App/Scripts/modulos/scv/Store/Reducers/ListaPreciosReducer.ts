namespace EK.Store.SCV.Reducers {
    "use strict";

    let listaPreciosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-listaPrecios-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-listaPrecios-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-listaPrecios-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const listaPreciosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, listaPreciosReducerManager);
    };
}