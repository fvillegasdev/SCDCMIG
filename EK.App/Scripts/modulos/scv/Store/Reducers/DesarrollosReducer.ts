namespace EK.Store.SCV.Reducers {
    "use strict";
    let scvdesarrollosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-desarrollos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-desarrollos-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-desarrollos-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "scv-desarrollos-comisiones",
            property: "comisiones",
            default: []
        },
        {
            type: "scv-desarrollos-cuentas",
            property: "cuentasDeposito",
            default: {}
        },
        {
            type: "scv-desarrollos-cuentas-setSelected",
            property: "cuentaSelected",
            default: {}
        },
        {
            type: "scv-desarrollos-prototipos",
            property: "prototipos",
            default: []
        },
        {
            type: "scv-desarrollos-prototipos-setSelected",
            property: "prototipoSelected",
            default: {}
        },
        {
            type: "scv-desarrollos-prototipos-guardar",
            property: "prototipos",
            default: []
        },

        {
            type: "scv-desarrollos-esquemas-setSelected",
            property: "esquemaSelected",
            default: {}
        }
    ];

    export const ScvdesarrollosReducerManager: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, scvdesarrollosReducerManager);
    };
}