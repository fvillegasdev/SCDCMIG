namespace EK.Store.Reducers {
    "use strict";

    export const HistoryReducer: any = (state: any, action: EK.Store.IAction) => {
        if (state === undefined) {
            return {};
        } else if (action.type.indexOf("history-entity-") >= 0) {
            //let prop: string = action.type.substring(15);
            //let newState = {};

            //if (action.loading) {
            //    newState[prop] = createLoadingStoreObject([]);
            //} else if (action.default) {
            //    newState[prop] = createDefaultStoreObject(action.data.data);
            //} else if (action.successful) {
            //    newState[prop] = createSuccessfulStoreObject(action.data.data);
            //} else if (action.failed) {
            //    newState[prop] = createFailedStoreObject([]);
            //};

            //return EK.Global.assign(state, newState);
            return {};
        };

        return state;
    };
}