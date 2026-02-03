namespace EK.Store.SCV.Reducers {
    "use strict";

    let scvComisionesReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "scv-comisiones-setSelected",
            property: "selected",
            default: {}
        },
        // PERIODOS
        {
            type: "scv-comisiones-catalogo-config-periodos",
            property: "comisionCatalogoPeriodos",
            default: []
        },
        {
            type: "scv-comisiones-catalogo-config-periodos-detalle",
            property: "comisionCatalogoPeriodosDetalle",
            default: []
        },
        {
            type: "scv-comisiones-guardar-config-periodo",
            property: "agregarPeriodo",
            default: {}
        },
        {
            type: "scv-comisiones-select-config-periodo",
            property: "selectPeriodo",
            default: {}
        },
        {
            type: "scv-comisiones-select-config-periodo-detalle",
            property: "selectPeriodoDetalle",
            default: {}
        },
        {
            type: "scv-comisiones-guardar-config-periodo-detalle",
            property: "agregarPeriodoDetalle",
            default: {}
        },
        // COMISION PLAN ESQUEMA DE FINANCIAMIENTO
        {
            type: "scv-comisiones-select-plan-esquema",
            property: "selectComisionEsquema",
            default: {}
        },
        {
            type: "scv-comisiones-select-plan-esquema-periodo",
            property: "selectComisionEsquemaPeriodo",
            default: {}
        },
        {
            type: "scv-comisiones-catalogo-plan-esquema-periodos",
            property: "comisionCatalogoEsquemaPeriodos",
            default: []
        },
        {
            type: "scv-comisiones-guardar-plan-esquema-periodo",
            property: "agregarPlanEsquemaPeriodo",
            default: {}
        },
        {
            type: "scv-comisiones-guardar-plan-esqueman-periodo-detalle",
            property: "agregarPlanEsquemaPeriodoDetalle",
            default: {}
        },
        {
            type: "scv-comisiones-catalogo-plan-esquema-periodos-detalle",
            property: "comisionCatalogoEsquemaPeriodosDetalle",
            default: []
        },
        // COMISION PORCENTAJE DE COMISIONES
        {
            type: "scv-comisiones-config-catalogo",
            property: "configuraciones",
            default: []
        },
        {
            type: "scv-comisiones-config-setSelected",
            property: "configuracionSelected",
            default: {}
        },
        {
            type: "scv-comisiones-config-guardar",
            property: "configuracionSelected",
            default: {}
        },
        //DROPDOWNLIST COMISION CONFIGURACION
        //{desarrollos}
        {
            type: "scv-comisiones-config-desarrollos",
            property: "desarrollos",
            default: []
        },
        {
            type: "scv-comisiones-config-desarrollos-setSelected",
            property: "desarrolloSelected",
            default: {}
        },
        //{esquemas}
        {
            type: "scv-comisiones-config-esquemas",
            property: "esquemas",
            default: []
        },
        {
            type: "scv-comisiones-config-esquemas-setSelected",
            property: "esquemaSelected",
            default: {}
        },
        //{prototipos}
        {
            type: "scv-comisiones-config-prototipos",
            property: "prototipos",
            default: []
        },
        {
            type: "scv-comisiones-config-prototipos-setSelected",
            property: "prototipoSelected",
            default: {}
        },
        //{ubicaciones}
        {
            type: "scv-comisiones-config-ubicaciones",
            property: "ubicaciones",
            default: []
        },
        {
            type: "scv-comisiones-config-ubicaciones-setSelected",
            property: "ubicacionSelected",
            default: {}
        },
        //CALCULO DE COMISIONES
        {
            type: "scv-calculo-comisiones-select-periodo-detalle",
            property: "selectCalculoComisionPeriodoDetalle",
            default: {}
        },
        {
            type: "scv-calculo-comisiones-movimiento-detalle",
            property: "calculoComisionesMovimimientosDetalles",
            default: []
        }
    ];

    export const comisionesObjReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, scvComisionesReducerManager);
    };
}