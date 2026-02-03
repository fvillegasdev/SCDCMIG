namespace EK.Store.SCV.Reducers {
    "use strict";
    let scvventasReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-ventas-recalculo-ubicacion",
            property: "ubicaciones",
            default: {}
        },
        {
            type: "scv-ventas-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "scv-ventas-setPlanPagosSelected",
            property: "planPagosSelected",
            default: {}
        },
        {
            type: "scv-ventas-setSelectedConcepto",
            property: "planPagosConceptoSelected",
            default: {}
        },
        {
            type: "scv-ventas-setSelectedDocs",
            property: "planPagosDocumentos",
            default: {}
        },
        {
            type: "scv-ventas-catalogo",
            property: "catalogo",
            default: []
        },
        {
            type: "scv-ventas-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "scv-ventas-ubicaciones",
            property: "ubicaciones",
            default: []
        },
        {
            type: "scv-ventas-pv",
            property: "planesVenta",
            default: []
        },
        {
            type: "scv-ventas-ubicaciones-setSelected",
            property: "ventaUbicacion",
            default: {}
        },
        {
            type: "scv-ventas-setEsquemaSelected",
            property: "esquema",
            default: {}
        },
        {
            type: "scv-ventas-esquema",
            property: "esquema",
            default:[]
        },
        {
            type: "scv-ventas-setSelectedCredito",
            property: "ventaCredito",
            default: {}
        },  
        {
            type: "scv-ventas-setReestructura",
            property: "reestructura",
            default: {}
        },
        {
            type: "scv-ventas-guardarpp",
            property: "planesVenta",
            default: {}
        },
        {
            type: "scv-ventas-setPlanPagosEdicion",
            property: "planPagosEdicion",
            default: {}
        },
        {
            type: "scv-ventas-setCotizacionSelected",
            property: "cotizacionSelected",
            default: {}
        },
        {
            type: "scv-ventas-setExpedienteSelected",
            property: "expedienteSelected",
            default: {}
        }
    ];

    export const ScvventasReducerManager: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, scvventasReducerManager);
    };
}