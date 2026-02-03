namespace EK.Store.KONTROL.Reducers  {
    "use strict";

    let tipomonedaReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "tipomoneda-catalogo",
            property: "catalogo",
            default: []
        }
    ];

    export const TipoMonedaReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, tipomonedaReducerManager);
    };
}