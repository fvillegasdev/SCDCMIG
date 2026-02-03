namespace EK.Store.Reducers {
    "use strict";

    let KontrolFileManagerReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "kontrol-fileManager-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "kontrol-fileManager-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "kontrol-fileManager-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "kontrol-fileManager-eliminar",
            property: "selected",
            default: {}
        },
        {
            type: "kontrol-fileManager-file-setSelected",
            property: "file",
            default: {}
        }
    ];

    export const KontrolFileManagerReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, KontrolFileManagerReducerManager);
    };
}