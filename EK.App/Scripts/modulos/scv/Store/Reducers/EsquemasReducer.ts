namespace EK.Store.SCV.Reducers {
    "use strict";

    let esquemasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            //Esquema seleccionado
            type: "scv-esquemas-setSelected",
            property: "selected",
            default: {}
        },
        {
            //Catalogo de esquemas
            type: "scv-esquemas-catalogo",
            property: "catalogo",
            default: []
        },
        {
            //Catalogo de esquemas
            type: "scv-esquemas-catalogo-fase",
            property: "catalogoEsquemaFase",
            default: []
        },
        {
            //Esquema a grabar
            type: "scv-esquemas-guardar",
            property: "selected",
            default: {}
        },
        {
            //Catalogo de niveles
            type: "scv-esquemas-niveles",
            property: "niveles",
            default: []
        },
        {
            //Sortable List
            type: "scv-esquemas-niveles-sortable",
            property: "sortable",
            default: []
        },
        {
            //Nivel seleccionado
            type: "scv-esquemas-niveles-setSelected",
            property: "nivelSelected",
            default: {}
        },
        {
            //Grabar o eliminar nivel
            type: "scv-esquemas-niveles-guardar",
            property: "nivelSelected",
            default: {}
        },
        {
            //Catalogo de etapas
            type: "scv-esquemas-etapas",
            property: "etapas",
            default: []
        },
        {
            //Etapa seleccionada
            type: "scv-esquemas-etapas-setSelected",
            property: "etapaSelected",
            default: {}
        },
        {
            //Etapa a grabar
            type: "scv-esquemas-etapas-guardar",
            property: "etapaSelected",
            default: {}
        },
        {
            //Etapa a configurar
            type: "scv-esquemas-etapas-setCurrent",
            property: "etapaCurrent",
            default: {}
        },
        {   //Catalogo de requisitos
            type: "scv-esquemas-etapas-requisitos",
            property: "requisitos",
            default: []
        },
        {
            //Requisito a configurar
            type: "scv-esquemas-etapas-requisitos-setSelected",
            property: "requisitoSelected",
            default: {}
        },
        {
            //Requisito a grabar
            type: "scv-esquemas-etapas-requisitos-guardar",
            property: "requisitoSelected",
            default: {}
        },
        {
            //Catalogo de documentos
            type: "scv-esquemas-etapas-documentos",
            property: "documentos",
            default: []
        },
        {
            //documento a configurar
            type: "scv-esquemas-etapas-documentos-setSelected",
            property: "documentoSelected",
            default: {}
        },
        {
            //documento a grabar
            type: "scv-esquemas-etapas-documentos-guardar",
            property: "documentoSelected",
            default: {}
        },
        {
            //Catalogo de procesos
            type: "scv-esquemas-etapas-procesos",
            property: "procesos",
            default: []
        },
        {
            //proceso a configurar
            type: "scv-esquemas-etapas-procesos-setSelected",
            property: "procesoSelected",
            default: {}
        },
        {
            //proceso a grabar
            type: "scv-esquemas-etapas-procesos-guardar",
            property: "procesoSelected",
            default: {}
        },
    ];

    export const esquemasReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, esquemasReducerManager);
    };
}