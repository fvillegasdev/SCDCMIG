namespace EK.Store.SCV.Reducers {
    "use strict";

    let requisitosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            //TipoRequisitoDDL
            type: "scv-requisitos-tipoSelected",
            property: "tipoSelected",
            default: {}
        },
        {
            //TipoRequisitoDDL
            type: "scv-requisitos-tipoCatalogo",
            property: "tipoCatalogo",
            default: []
        },
        {
            //RequisitoDDL
            type: "scv-requisitos-setSelected",
            property: "selected",
            default: {}
        },
        {
            //RequisitoDDL
            type: "scv-requisitos-catalogo",
            property: "catalogo",
            default: []
        }
        //{
        //    type: "scv-requisitos-guardar",
        //    property: "selected",
        //    default: {}
        //},
        //{
        //    type: "scv-requisitos-caracteristicas",
        //    property: "caracteristicas",
        //    default: []
        //},
        //{
        //    type: "scv-requisitos-caracteristicas-setSelected",
        //    property: "caracteristicaSelected",
        //    default: {}
        //}
    ];

    export const requisitosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, requisitosReducerManager);
    };
}