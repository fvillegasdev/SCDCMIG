namespace EK.Store.Reducers {
    "use strict";

    let notificacionesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "notificaciones-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "notificaciones-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "notificaciones-setLeida",
            property: "leida",
            default: {}
        }
    ];

    export const NotificacionesReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, notificacionesReducerManager);
    };

}
