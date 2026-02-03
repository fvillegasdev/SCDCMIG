
namespace EK.Store.SCV.Reducers {
    "use strict";

    let caracteristicasComponentReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "caracteristicas-component-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "caracteristicas-component-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "caracteristicas-component-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "caracteristicas-component-dropdownlist",
            property: "dropdownlist",
            default: {}
        }
    ];

    export const caracteristicasComponentReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, caracteristicasComponentReducerManager);
    };
}