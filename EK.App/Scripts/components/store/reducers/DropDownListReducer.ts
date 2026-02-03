namespace EK.Store {
    export const dropdownlistdata: () => EK.Store.Reducers.IDropDownListReducer =
        (): EK.Store.Reducers.IDropDownListReducer => {
            return EK.Store.getState().dropdownlistdata;
        }
}
namespace EK.Store.Reducers {
    "use strict";

    export interface IDropDownListReducer {
        dropdownlistdata: any[];
        dropdownlistdataTipoFlujo: any[];
        dropdownlistdataAmbito: any[];
        ddldataNotificadoresUsuario: any[];
        ddldataNotificadoresNivel: any[];
    }

    export const DropDownListReducer: any = (state: IDropDownListReducer, action: EK.Store.IAction) => {
        if (state === undefined) {
            return EK.Global.assign(state, {
                dropdownlistdata: { status: AsyncActionTypeEnum.default, data: [] },
            })
        } else if (action.type.indexOf("load::") >= 0) {
            let prop: string = action.type.substring(action.type.indexOf("load::") + 6);
            let newState = {};
            
            if (action.loading) {
                newState[prop] = {
                    status: action.status,
                    data: [] 
                };

                return EK.Global.assign(state, newState);
            } else if (action.successful || action.default) {
                newState[prop] = {
                    status: action.status,
                    data: action.data ? action.data.data : []
                };

                return EK.Global.assign(state, newState);
            } else if (action.failed) {
                newState[prop] = {
                    status: action.status,
                    data: []
                };

                return EK.Global.assign(state, newState);
            }
        } else if (action.type === "load-data") {
            if (action.loading) {
                return EK.Global.assign(state, {
                    dropdownlistdata: { status: action.status, data: action.data.data }
                });
            } else if (action.successful) {
                return EK.Global.assign(state, {
                    dropdownlistdata: { status: action.status, data: action.data.data }
                })
            } else if (action.failed) {
                return EK.Global.assign(state, {
                    dropdownlistdata: { status: action.status, data: [] }
                })
            }
        } else if (action.type === "load-data-tipoflujo") {
            if (action.loading) {
                return EK.Global.assign(state, {
                    dropdownlistdataTipoFlujo: { status: action.status, data: action.data.data }
                });
            } else if (action.successful) {
                return EK.Global.assign(state, {
                    dropdownlistdataTipoFlujo: { status: action.status, data: action.data.data }
                })
            } else if (action.failed) {
                return EK.Global.assign(state, {
                    dropdownlistdataTipoFlujo: { status: action.status, data: [] }
                })
            }
        }
        else if (action.type === "load-data-ambito") {
            if (action.loading) {
                return EK.Global.assign(state, {
                    dropdownlistdataAmbito: { status: action.status, data: action.data.data }
                });
            } else if (action.successful) {
                return EK.Global.assign(state, {
                    dropdownlistdataAmbito: { status: action.status, data: action.data.data }
                })
            } else if (action.failed) {
                return EK.Global.assign(state, {
                    dropdownlistdataAmbito: { status: action.status, data: [] }
                })
            }
        } else if(action.type === "load-data-notificadores-usuario") {
            if (action.loading) {
                return EK.Global.assign(state, {
                    ddldataNotificadoresUsuario: { status: action.status, data: action.data.data }
                });
            } else if (action.successful) {
                return EK.Global.assign(state, {
                    ddldataNotificadoresUsuario: { status: action.status, data: action.data.data }
                })
            } else if (action.failed) {
                return EK.Global.assign(state, {
                    ddldataNotificadoresUsuario: { status: action.status, data: [] }
                })
            }
        }
        else if (action.type === "load-data-notificadores-nivel") {
            if (action.loading) {
                return EK.Global.assign(state, {
                    ddldataNotificadoresNivel: { status: action.status, data: action.data.data }
                });
            } else if (action.successful) {
                return EK.Global.assign(state, {
                    ddldataNotificadoresNivel: { status: action.status, data: action.data.data }
                })
            } else if (action.failed) {
                return EK.Global.assign(state, {
                    ddldataNotificadoresNivel: { status: action.status, data: [] }
                })
            }
        }
        return state;
    };
}