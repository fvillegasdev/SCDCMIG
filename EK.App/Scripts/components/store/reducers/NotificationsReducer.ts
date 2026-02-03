
namespace EK.Store.Reducers {
    "use strict";

    let NotificationReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "load-notifications",
            property: "notifications",
            default: []
        }
      
    ]

    export const NotificationReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, NotificationReducerManager);
    }
}
//namespace EK.Store {
//    export const notifications: () => EK.Store.Reducers.INotification =
//        (): EK.Store.Reducers.INotification => {
//            return EK.Store.getState().notifications;
//        }
//}
//namespace EK.Store.Reducers {
//    "use strict";

//    export interface INotification {
//        //emptyNotification: any[];
//        notifications: any[];
//        tasks: any[];
//        messages: any[];
//    }

//    export const NotificationReducer: any = (state: INotification, action: EK.Store.IAction) => {
//        if (state === undefined) {
//            return EK.Global.assign(state, {                
//                notifications: { status: AsyncActionTypeEnum.default, data: [] },
//                tasks: { status: AsyncActionTypeEnum.default, data: [] },
//                messages: { status: AsyncActionTypeEnum.default, data: [] }
//            }           
//            )
//        } else if (action.type === "load-notifications") {
//                    if (action.loading) {
//                        // return EK.Global.assign(state, {                            
//                        //    notifications: { status: action.status, data: [] }
//                        // });
//                    } else if (action.successful) {
//                        return EK.Global.assign(state, {
//                            notifications: { status: action.status, data: action.data.data }
//                        });
//                    } else if (action.failed) {
//                        return EK.Global.assign(state, {
//                            notifications: { status: action.status, data: [] }
//                        });
//                    }

//                } else if (action.type === "load-tasks") {
//                    if (action.loading) {
//                        // return EK.Global.assign(state, {  
//                        //    tasks: { status: action.status, data: action.data.data }                                                  
//                        // });
//                    } else if (action.successful) {
//                        return EK.Global.assign(state, {
//                            tasks: { status: action.status, data: action.data.data }
//                        });
//                    } else if (action.failed) {
//                        return EK.Global.assign(state, {
//                            tasks: { status: action.status, data: [] }
//                        });
//                    }
//                }else if (action.type === "load-messages") {
//                        if (action.loading) {
//                            // return EK.Global.assign(state, { 
//                            //    messages: { status: action.status, data: action.data.data }
//                            // });
//                        } else if (action.successful) {
//                            return EK.Global.assign(state, {
//                                messages: { status: action.status, data: action.data.data }
//                            });
//                        } else if (action.failed) {
//                            return EK.Global.assign(state, {
//                                messages: { status: action.status, data: [] }
//                            });
//                        }
//                }
                 
//                return state;
//    };

//}