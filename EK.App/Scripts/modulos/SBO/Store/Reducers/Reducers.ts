let sboReducers = {
    bancos: EK.Store.SBO.Reducers.bancosReducer,
    tipomovimiento: EK.Store.SBO.Reducers.TipoMovimientoReducer,
    cheques: EK.Store.SBO.Reducers.ChequesReducer,
    cuentabancaria: EK.Store.SBO.Reducers.CuentasBancariasReducer,
    subtipomovimiento: EK.Store.SBO.Reducers.SubTipoMovimientoReducer,
    batchs: EK.Store.SBO.Reducers.BatchReducer,
    //tipomoneda: EK.Store.SBO.Reducers.TipoMonedaReducer,
    chequesautomaticos: EK.Store.SBO.Reducers.GeneracionChequesAutomaticosReducer,
    proveedores: EK.Store.SBO.Reducers.ProveedoresReducerManager,
    centroscosto: EK.Store.SBO.Reducers.CentrosCostoReducer

}

EK.Store.BaseReducers = EK.Global.assign(EK.Store.BaseReducers, sboReducers);