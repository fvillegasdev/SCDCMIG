"use strict";

var __idLanguage = $("#element_language").val();
var __isModal = $("#element_modal").val() === "1";
var pathRoute =  global.getFullUrl("/kontrol/lang/" + __idLanguage, "");
$.getJSON(pathRoute, (data: any): any => {
    //$ml = JSON.parse(data);
    window["$ml"] = JSON.parse(data);

    ReactDOM.render(
        <ReactRedux.Provider store={EK.Store.store}>
            <EK.UX.Template isModal={__isModal}>
                <ReactRouter.Router history={ReactRouter.hashHistory}>
                    {EK.Store.BaseRouter.map((value: any, index: number) => {
                        return <ReactRouter.Route key={["route_", index.toString()].join("")} path={value.path} component={value.component} onEnter={verifyRoute} />;
                    })}
                </ReactRouter.Router>
            </EK.UX.Template>
        </ReactRedux.Provider>,
        document.getElementById("__pageWrapper")
        );
});

function verifyRoute(route: any): any {
    window["$$context"] = route;
}; 