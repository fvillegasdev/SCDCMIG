namespace EK.Store.SCV.Reducers {
    "use strict";

    let tipoInmuebleReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "tipoinmueble-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "tipoinmueble-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "tipoinmueble-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const TipoInmuebleReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, tipoInmuebleReducerManager);
    };
}