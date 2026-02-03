EK.Store.BaseRouter = EK.Store.BaseRouter.map((value: any, index: number) => {
    if (value.path === "/") {
        return {
            path: "/",
            component: EK.Modules.Kontrol.Pages.Admin.Vista
        };
    }
    else {
        return value;
    };
});