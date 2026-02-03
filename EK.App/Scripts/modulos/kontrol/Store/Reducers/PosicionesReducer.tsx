namespace EK.Store.Reducers {
    "use strict";

    let posicionesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "posiciones-setSelected",
            property: "selectedPosicion",
            default: {}
        },
        {
            type: "posiciones-catalogo",
            property: "posiciones",
            default: {}
        },
        {
            type: "categorias-setSelected",
            property: "selectedCategoria",
            default: {}
        },
        {
            type: "categorias-catalogo",
            property: "categorias",
            default: {}
        },
        {
            type: "puestos-setSelected",
            property: "selectedPuesto",
            default: {}
        },
        {
            type: "puestos-catalogo",
            property: "puestos",
            default: {}
        }
    ];

    export const PosicionesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, posicionesReducerManager);
    };

}
