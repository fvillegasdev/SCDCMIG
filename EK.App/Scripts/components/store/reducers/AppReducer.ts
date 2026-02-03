/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    /*
    app reducer to handle main app events
    */
    export interface IAppState {
        currentPage: string;
        appInfo: any;
    }

    export const AppReducer: any = (state: IAppState, action: EK.Store.IAction) => {
        if (state === undefined) {
            return (<any>Object).assign({},
                {
                    currentPage: "default",
                    appInfo: { status: AsyncActionTypeEnum.default, user: {} }
                });
        } else if (action.type === EK.Store.actions.app.changePage.type) {
            if (action.data.newPage !== "" && state.currentPage !== action.data.newPage) {
                let retValue: IAppState = (<any>Object).assign({}, state, { currentPage: action.data.newPage });

                return retValue;
            }
        } else if (action.type === "app-info") {
            if (action.loading) {
                return EK.Global.assign(state,
                    {
                        appInfo: {
                            status: action.status,
                            user: {}
                        }
                    });
            } else if (action.successful || action.default) {
                return EK.Global.assign(state,
                    {
                        appInfo:
                        {
                            status: action.status,
                            user: action.data.data
                        }
                    });
            } else if (action.failed) {
                return EK.Global.assign(state,
                    {
                        appInfo: {
                            status: action.status,
                            user: {}
                        }
                    });
            }
        }

        return state;
    };
}