namespace EK.Store.SCV.Reducers {
    "use strict";

    let expedientesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            //expediente seleccionado
            type: "scv-expedientes-setSelected",
            property: "selected",
            default: {}
        },
        {
            //catalogo de expedientes
            type: "scv-expedientes-catalogo",
            property: "catalogo",
            default: []
        },
        {
            //expediente a grabar
            type: "scv-expedientes-guardar",
            property: "selected",
            default: {}
        },
        {
            //cliente del expediente
            type: "scv-expedientes-cliente-setSelected",
            property: "clienteSelected",
            default: {}
        },

        //seguimientos
        {
            type: "scv-expedientes-seguimiento-prospeccion",
            property: "seguimientoProspeccion",
            default: {}
        },
        {
            type: "scv-expedientes-seguimiento-venta",
            property: "seguimientoVenta",
            default: {}
        },
        {
            type: "scv-expedientes-seguimiento-posventa",
            property: "seguimientoPosventa",
            default: {}
        }
    ];

    export const expedientesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, expedientesReducerManager);
    };
}