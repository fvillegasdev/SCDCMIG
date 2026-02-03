namespace EK.Store.SCV.Reducers {
    "use strict";

    let scvclientesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-clientes-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-clientes-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "svc-clientes-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "scv-clientes-referencias",
            property: "referencias",
            default: []
        },
        {
            type: "scv-clientes-ref-laborales",
            property: "refLaborales",
            default: []
        },
        {
            type: "scv-clientes-referencia-setSelected",
            property: "referenciaselected",
            default: {}
        },
        {
            type: "scv-clientes-ref-laboral-setSelected",
            property: "refLaboralSelected",
            default: {}
        },
        {
            type: "svc-clientes-adicionales",
            property: "infoAdicional",
            default: {}
        }
    ];

    export const ScvclientesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, scvclientesReducerManager);
    };
}