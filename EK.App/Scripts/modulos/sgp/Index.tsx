let ___SGPBaseRouter: any[] = [
    //{ path: "/", component: EK.Modules.SCV.Pages.Expedientes.Vista },
    //{ path: "/scv/Reasignacion", component: EK.Modules.SCV.Pages.Reasignacion.Vista },
    { path: "/sgp/TipoProyecto", component: EK.Modules.SGP.Pages.TipoProyecto.Vista },
    { path: "/sgp/TipoProyecto/:id", component: EK.Modules.SGP.Pages.TipoProyecto.Edicion },
    //{ path: "/sgp/proyectos", component: EK.Modules.SGP.Pages.Proyectos.Vista },
    { path: "/sgp/proyectos", component: EK.Modules.SGP.Pages.Dashboard.Vista },
    { path: "/sgp/proyectos/:id", component: EK.Modules.SGP.Pages.Proyectos.Edicion },
    { path: "/sgp/reservaterritorial", component: EK.Modules.SGP.Pages.ReservaTerritorial.Vista },
    { path: "/sgp/reservaterritorial/:id", component: EK.Modules.SGP.Pages.ReservaTerritorial.Edicion },
    { path: "/sgp/ProyectosDashboard", component: EK.Modules.SGP.Pages.Dashboard.Vista },
    { path: "/sgp/Tareas", component: EK.Modules.SGP.Pages.Tareas.Vista },
    { path: "/sgp/Tareas/:id", component: EK.Modules.SGP.Pages.Tareas.Edicion }
];

EK.Store.BaseRouter = EK.Store.BaseRouter.concat(___SGPBaseRouter);