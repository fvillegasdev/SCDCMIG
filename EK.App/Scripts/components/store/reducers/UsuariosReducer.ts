/// <reference path="../../Index.ts" />
/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";

    let usuariosReducerManager: EK.Global.IManagedReducerActions[] = [
        {
            type: "usuarios-setSelected",
            property: "selected",
            default: {}
        },
        {
            type: "usuarios-setSelectedAgente",
            property: "selectedAgente",
            default: {}
        },
        {
            type: "usuarios-setCurrent",
            property: "actual",
            default: {}
        },
        {
            type: "usuarios-catalogo",
            property: "usuarios",
            default: []
        },
        {
            type: "usuarios-puestos",
            property: "puestos",
            default: []
        },        
        {
            type: "usuarios-guardar",
            property: "selected",
            default: {}
        },
        {
            type: "usuarios-guardar-agente",
            property: "selectedAgente",
            default: {}
        },
        {
            type: "usuarios-niveles",
            property: "niveles",
            default: {}
        },
        {
            type: "usuarios-na-usuario",
            property: "nivelesUsuario",
            default: {}
        },
        {
            type: "usuarios-na-perfil",
            property: "nivelesPerfil",
            default: {}
        },
        {
            type: "usuarios-nivelesSetSelected",
            property: "nivelSelected",
            default: {}
        },
        {
            type: "usuarios-eliminarniveles",
            property: "guardar",
            default: {}
        },
        {
            type: "usuarios-configuracion-niveles",
            property: "configuracionNiveles",
            default: {}
        },
        {
            type: "usuarios-excepciones-opciones",
            property: "opciones",
            default: {}
        },
        {
            type: "usuarios-excepciones",
            property: "excepciones",
            default: []
        },
        {
            type: "usuarios-excepciones-save",
            property: "opciones",
            default: []
        },
        {
            type: "usuarios-niveles-asignados",
            property: "nivelesAsignados",
            default: []
        },
        {
            type: "usuarios-nivel-asignado-sel",
            property: "nivelAsignadoSeleccionado",
            default: {}
        },
        {
            type: "usuarios-cn-save",
            property: "configuracionNiveles",
            default: {}
        },
        {
            type: "usuarios-admin",
            property: "admin",
            default: {}
        }
    ];

    export const UsuariosReducer: any = (state: any, action: EK.Store.IAction) => {
        return EK.Global.manageReducerActions(state, action, usuariosReducerManager);
    };

}
