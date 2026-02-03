namespace EK.Store.SCV.Reducers {
    "use strict";

    let EmpresasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-empresas-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-empresas-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "svc-empresas-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const empresasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, EmpresasReducerManager);
    };
}