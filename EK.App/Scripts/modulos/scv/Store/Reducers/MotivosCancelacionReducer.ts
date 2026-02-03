namespace EK.Store.SCV.Reducers {
    "use strict";
    let scvmotivosCancelacionReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-motivosCancelacion-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-motivosCancelacion-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-motivosCancelacion-guardar",
            property: "selected",
            default: {}
        }
    ];

    export const ScvmotivosCancelacionReducer : any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, scvmotivosCancelacionReducerManager);
    };
}