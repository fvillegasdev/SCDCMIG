namespace EK.Store.SCV.Reducers {
    "use strict";

    let tipoFinanciamientoReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "tipofinanciamiento-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "tipofinanciamiento-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "tipofinanciamiento-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const tipoFinanciamientoReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, tipoFinanciamientoReducerManager);
    };
}