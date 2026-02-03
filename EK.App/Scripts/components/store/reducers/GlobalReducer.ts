namespace EK.Store.Reducers {
    "use strict";
    let globalReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "global-info",
            property: "app",
            default: {
                Cliente: {},
                Clientes: [],
                Permisos: [],
                Menu: []
            }
        },
        {
            type: "global-page",
            property: "page",
            default: {}
        },
        {
            type: "global-page-ml",
            property: "pageML",
            default: {}
        },
        {
            type: "global-modal-result",
            property: "modalResult",
            default: {}
        },
        {
            type: "global-page-search",
            property: "pageSearch",
            default: {}
        },
        {
            type: "usuarios-modulos",
            property: "usuarioModulos",
            default: {}
        },
        {
            type: "cliente-global-selected",
            property: "cliente",
            default: {}
        },
        {
            type: "clientes-kv",
            property: "clientes",
            default: []
        },
        {
            type: "usuario-global-selected",
            property: "usuario",
            default: {}
        },
        {
            type: "usuarios-kv",
            property: "usuarios",
            default: []
        },
        {
            type: "usuarios-favoritos",
            property: "favoritos",
            default: {}
        },
        {
            type: "usuarios-favoritos-agregar",
            property: "favoritos",
            default: {}
        },
        {
            type: "usuarios-favoritos-remover",
            property: "favoritos",
            default: {}
        },
        {
            type: "compania-global-selected",
            property: "compania",
            default: {}
        },
        {
            type: "clientecompania-global-selected",
            property: "clientecompania",
            default: {}
        },
        {
            type: "companias-kv",
            property: "companias",
            default: []
        },
        {
            type: "clientescompanias-kv",
            property: "clientescompanias",
            default: []
        },
        {
            type: "modulo-global-selected",
            property: "modulo",
            default: {}
        },
        {
            type: "clientemodulo-global-selected",
            property: "clientemodulo",
            default: {}
        },
        {
            type: "modulos-kv",
            property: "modulos",
            default: []
        },
        {
            type: "clientesmodulos-kv",
            property: "clientesmodulos",
            default: []
        },
        {
            type: "ambito-global-selected",
            property: "ambito",
            default: {}
        },
        {
            type: "ambitos-kv",
            property: "ambitos",
            default: []
        },
        {
            type: "seccion-global-selected",
            property: "seccion",
            default: {}
        },
        {
            type: "secciones-kv",
            property: "secciones",
            default: []
        },
        {
            type: "global-notifications",
            property: "notifications",
            default:[]
        },{
            type: "global-notificationsApp",
            property: "notificationsApp",
            default:[]
        },
        {
            type: "global-calendar",
            property: "calendario",
            default: []
        },
        {
            type: "global-usuariocompanias",
            property: "usuariocompanias",
            default: []
        },
        {
            type: "global-usuariocompania-selected",
            property: "usuariocompania",
            default: []
        },
        {
            type: "global-current-entity-type",
            property: "currentEntityType",
            default: ""
        },
        {
            type: "global-page-config",
            property: "pageConfig",
            default: {}
        },
        {
            type: "global-page-data",
            property: "catalogo",
            default: {}
        },
        {
            type: "global-page-entity",
            property: "entity",
            default: {}
        },
        {
            type: "global-page-state",
            property: "state",
            default: {}
        },
        {
            type: "global-current-entity",
            property: "currentEntity",
            default: {}
        },
        {
            type: "global-search",
            property: "search",
            default: {}
        },
        {
            type: "global-current-entity-state",
            property: "currentEntityState",
            default: {}
        },
        {
            type: "global-current-catalogo",
            property: "currentCatalogo",
            default: {}
        },
        {
            type: "global-current-link",
            property: "currentLink",
            default: {}
        },
        {
            type: "global-estatusesUbicacion",
            property: "estatusesUbicacion",
            default: []
        },
        {
            type: "global-estatusesUbicacion-selected",
            property: "estatusUbicacion",
            default: {}
        },
        {
            type: "global-estatusesExpediente-catalogo",
            property: "estatusesExpediente",
            default: []
        },
        {
            type: "global-estatusesExpediente-setSelected",
            property: "estatusExpediente",
            default: {}
        }
    ];

    export const GlobalReducer: any = (state: any, action: EK.Store.IAction) => {
        /*
        ,
        {
            type: "global-page-menuOptions",
            property: "menuOptions",
            default: {}
        }
        */
        if (state === undefined) {
            return EK.Global.assign(state, {});
        } else if (action.type.indexOf("load::") >= 0) {
            let prop: string = action.type.substring(action.type.indexOf("load::") + 6);
            let newState = {};

            if (action.loading) {
                newState[prop] = {
                    status: action.status,
                    data: [],
                    timestamp: Number(new Date())
                };

                return EK.Global.assign(state, newState);
            } else if (action.successful || action.default) {
                newState[prop] = {
                    status: action.status,
                    data: action.data ? action.data.data : [],
                    timestamp: Number(new Date())
                };

                return EK.Global.assign(state, newState);
            } else if (action.failed) {
                newState[prop] = {
                    status: action.status,
                    data: [],
                    timestamp: Number(new Date())
                };

                return EK.Global.assign(state, newState);
            }           
        } else if (action.type === "global-page-menuOptions") {
            let prop: string = action.property;
            let newState = {};

            if (action.loading) {
                newState[prop] = {
                    status: action.status,
                    data: {},
                    timestamp: Number(new Date())
                };

                return EK.Global.assign(state, newState);
            } else if (action.successful || action.default) {
                let data: any = action.data.data;
                let newState: any = state["menuOptions"];

                if (!newState) {
                    newState = {};
                    state["menuOptions"] = newState;
                };

                if (newState[prop]) {
                    for (var g in data) {
                        newState[prop].data[g] = data[g];
                    };
                    newState[prop].status = action.status;
                    newState[prop].timestamp = Number(new Date());
                }
                else {
                    newState[prop] = {
                        status: action.status,
                        data: data,
                        timestamp: Number(new Date())
                    };
                };

                return state;
            }
        } else {
            return EK.Global.manageReducerActions(state, action, globalReducerManager);
        }

        return state;
    };
}