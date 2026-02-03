let ___SCPBaseRouter: any[] = [
    { path: "/kontrol/Proveedores", component: EK.Modules.SCP.Pages.Proveedores.Vista },
    { path: "/kontrol/Proveedores/:id", component: EK.Modules.SCP.Pages.Proveedores.Edicion },
    { path: "/kontrol/TipoProveedores", component: EK.Modules.SCP.Pages.TipoProveedores.Vista },
    { path: "/kontrol/TipoProveedores/:id", component: EK.Modules.SCP.Pages.TipoProveedores.Edicion },
    { path: "/kontrol/TipoMovimientoProveedores", component: EK.Modules.SCP.Pages.TipoMovimientoProveedores.Vista },
    { path: "/kontrol/TipoMovimientoProveedores/:id", component: EK.Modules.SCP.Pages.TipoMovimientoProveedores.Edicion },
    { path: "/kontrol/ActaConstitutiva", component: EK.Modules.SCP.Pages.ProveedoresActasConstitutivas.Vista },
    { path: "/kontrol/ActaConstitutiva/:id", component: EK.Modules.SCP.Pages.ProveedoresActasConstitutivas.Edicion },
    { path: "/kontrol/RegistroPublicoPropiedad", component: EK.Modules.SCP.Pages.RegistroPublicoPropiedad.Vista },
    { path: "/kontrol/RegistroPublicoPropiedad/:id", component: EK.Modules.SCP.Pages.RegistroPublicoPropiedad.Edicion }
];

EK.Store.BaseRouter = EK.Store.BaseRouter.concat(___SCPBaseRouter);