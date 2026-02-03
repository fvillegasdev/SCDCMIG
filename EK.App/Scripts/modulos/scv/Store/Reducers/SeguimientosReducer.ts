namespace EK.Store.SCV.Reducers {
    "use strict";
    let scvSeguimientoExpedientesReducerManager: EK.Global.IManagedReducerActions[] = [
        // Entidad Principal
        {
            type: "scv-seguimientos-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-seguimientos-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-seguimientos-suspension",
            property: "suspension",
            default: "N"
        },
        {
            type: "scv-seguimientos-viewMode-componente",
            property: "viewMode",
            default: true
        },
        {
            type: "scv-seguimientos-guardar",
            property: "selected",
            default: {}
        },
        // Elementos Hijos
        {
            type: "scv-seguimientos-etapas",
            property: "etapas",
            default: []
        },
        {
            type: "scv-seguimientos-avanzar-etapa",
            property: "avanzarEtapa",
            default: []
        },
        {
            type: "scv-seguimientos-requisitos",
            property: "requisitos",
            default: []
        },
        {
            type: "scv-seguimientos-requisitos-setSelected",
            property: "requisitoSelected",
            default: {}
        },
        {
            type: "scv-seguimientos-requisitos-guardar",
            property: "requisitoSelected",
            default: {}
        },
        {
            type: "scv-seguimientos-etapas-setSelected",
            property: "etapaSelected",
            default: {}
        },
        {
            type: "scv-seguimientos-procesos",
            property: "procesos",
            default: []
        },
        {
            type: "scv-seguimientos-procesos-setSelected",
            property: "procesoSelected",
            default: {}
        },
        {
            type: "scv-seguimientos-documentos",
            property: "documentos",
            default: []
        },
        {
            type: "scv-seguimientos-procesos-setSelected",
            property: "documentoSelected",
            default: {}
        },
        {
            type: "scv-seguimientos-motivos",
            property: "motivos",
            default: []
        },
        {
            type: "scv-seguimientos-expediente-setSelected",
            property: "expediente",
            default: {}
        },
        {
            type: "scv-seguimientos-responsable-superior",
            property: "responsableSuperior",
            default: {}
        },
        {
            type: "scv-seguimientos-requisito-valores",
            property: "requisitoValues",
            default: {}
        }
    ];

    export const seguimientosObjReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, scvSeguimientoExpedientesReducerManager);
    };
}