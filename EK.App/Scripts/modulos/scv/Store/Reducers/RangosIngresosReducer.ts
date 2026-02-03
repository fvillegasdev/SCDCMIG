namespace EK.Store.SCV.Reducers {
    "use strict";

    let rangosIngresosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "rangosIngresos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "rangosIngresos-catalogo",
            property: "rangosIngresos",
            default: []
        },
        {
            type: "rangosIngresos-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const rangosIngresosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, rangosIngresosReducerManager);
    };
}