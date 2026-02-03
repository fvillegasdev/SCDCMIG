namespace EK.Store.SCV.Reducers {
    "use strict";

    let categoriasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "categorias-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "categorias-catalogo",
            property: "catalogo",
            default: {}
        },
        {
            type: "categorias-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const CategoriasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, categoriasReducerManager);
    };
}