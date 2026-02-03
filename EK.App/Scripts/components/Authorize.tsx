
namespace EK.UX.Auth {
    "use strict";

    export const NONE_PERMISSION: number = 0;
    export const READ_PERMISSION: number = 1;
    export const WRITE_PERMISSION: number = 2;
    export const NEW_PERMISSION: number = 4;    
    export const DELETE_PERMISSION: number = 8;

    export enum AuthorizePermission {
        None,
        Read,
        Write,
        New,
        Delete
    };
    export enum AuthorizeAction {
        None,
        Hide,
        RenderBlocked,
        Redirect,
        AccessDeniedRender
    };
    export enum AuthorizeMode {
        Match,
        Hierarchical,
        Custom
    };
    export interface IAuthorizeProps extends React.Props<any> {
        id?: string;
        permiso?: AuthorizePermission;
        accion?: AuthorizeAction;
        mode?: AuthorizeMode;
        custom?: () => boolean;
        app?: any;
        page?: any;
    };
    export const getOption: (id: string) => any = (id: string): any => {
        let p: any[] = null;
        let i: number;
        let retValue: number = null;

        try {
            p = EK.Store.getState().global.app.data.Permisos;

            for (i = 0; i < p.length; i++) {
                if (p[i].Clave === id) {
                    retValue = p[i];

                    break;
                }
            }
        } catch (ex) { }

        return retValue;
    }

    export const getOptionPermissionValue: (id: string) => AuthorizePermission = (id: string): AuthorizePermission => {
        let p: any[] = null;
        let i: number;
        let retValue: number = null;

        try {
            p = EK.Store.getState().global.app.data.Permisos;            

            for (i = 0; i < p.length; i++) {
                if (p[i].Clave === id) {
                    retValue = p[i].permisos;

                    break;
                }
            }
        } catch(ex) {}

        return retValue;
    }

    export const getOptionExportValue: (id: string) => boolean = (id: string): boolean => {

        let p: any[] = null;
        let i: number;
        let retValue: boolean = null;

        try {
            p = EK.Store.getState().global.app.data.Permisos;

            for (i = 0; i < p.length; i++) {
                if (p[i].Clave === id) {
                    retValue = p[i].Exportar;

                    break;
                }
            }
        } catch (ex) { }

        return retValue;
    }


    export const getOptionPermission: (id: string) => AuthorizePermission = (id: string): AuthorizePermission => {
        let permiso: number = null;
        let retValue: AuthorizePermission = null;

        try {
            permiso = getOptionPermissionValue(id);

            if (permiso === NONE_PERMISSION) {
                retValue = AuthorizePermission.None;
            } else if (permiso === READ_PERMISSION) {
                retValue = AuthorizePermission.Read;
            } else if (permiso === WRITE_PERMISSION) {
                retValue = AuthorizePermission.Write;
            } else if (permiso === NEW_PERMISSION) {
                retValue = AuthorizePermission.New;
            } else if (permiso === DELETE_PERMISSION) {
                retValue = AuthorizePermission.Delete;
            }
        } catch (ex) { }

        return retValue;
    }

    export class _Authorize extends React.Component<IAuthorizeProps, IAuthorizeProps>{
        static defaultProps: IAuthorizeProps = {
            permiso: AuthorizePermission.None,
            accion: AuthorizeAction.Hide,
            mode: AuthorizeMode.Hierarchical
        };

        render(): any {
            let pageId: string = this.props.id;
            if (!pageId) {
                if (this.props.page && this.props.page.data && this.props.page.data.id) {
                    pageId = this.props.page.data.id;
                }
            }

            let p: any[] = this.props.app.data.Permisos;
            let i: number;
            let hasAccess: boolean = false;
            if (this.props.mode === AuthorizeMode.Custom) {
                if (this.props.custom) {
                    hasAccess = this.props.custom();
                };
            }
            else {

                for (i = 0; i < p.length; i++) {
                    if (p[i].Clave === pageId) {
                        let permiso: number = p[i].permisos;

                        if (this.props.mode === AuthorizeMode.Hierarchical) {
                            // min permission strategy
                            if (this.props.permiso === AuthorizePermission.None && (permiso > NONE_PERMISSION)) {
                                hasAccess = true;
                            } else if (this.props.permiso === AuthorizePermission.Read && (permiso >= READ_PERMISSION)) {
                                hasAccess = true;
                            } else if (this.props.permiso === AuthorizePermission.Write && (permiso >= WRITE_PERMISSION)) {
                                hasAccess = true;
                            } else if (this.props.permiso === AuthorizePermission.New && (permiso >= NEW_PERMISSION)) {
                                hasAccess = true;
                            } else if (this.props.permiso === AuthorizePermission.Delete && (permiso >= DELETE_PERMISSION)) {
                                hasAccess = true;
                            }
                        } else if (this.props.mode === AuthorizeMode.Match) {
                            // min permission strategy
                            if (this.props.permiso === AuthorizePermission.None && (permiso > NONE_PERMISSION)) {
                                hasAccess = true;
                            } else if (this.props.permiso === AuthorizePermission.Read && (permiso & READ_PERMISSION)) {
                                hasAccess = true;
                            } else if (this.props.permiso === AuthorizePermission.Write && (permiso & WRITE_PERMISSION)) {
                                hasAccess = true;
                            } else if (this.props.permiso === AuthorizePermission.New && (permiso & NEW_PERMISSION)) {
                                hasAccess = true;
                            } else if (this.props.permiso === AuthorizePermission.Delete && (permiso & DELETE_PERMISSION)) {
                                hasAccess = true;
                            }
                        }

                        break;
                    }
                }
            };
            if (!hasAccess) {
                if (this.props.accion === AuthorizeAction.Hide) {
                    return null;
                } else if (this.props.accion === AuthorizeAction.RenderBlocked) {
                    return null;
                } else if (this.props.accion === AuthorizeAction.Redirect) {
                    return null;
                } else if (this.props.accion === AuthorizeAction.AccessDeniedRender) {
                    return <PageUnauthorized />;
                }
            }

            let renderChild: any;
            React.Children.forEach(this.props.children, (child: any, index: number): any => {
                if (index === 0) {
                    //console.log(child)
                    renderChild = child;
                }
            });

            return this.props.children;
        }
    }

    //
    // map props
    //
    const mapProps: any = (state: any): any => {
        return {
            app: state.global.app,
            page: state.global.page
        };
    };

    //
    // map dispatchs
    //

    // 
    // connect
    // 
    export let Authorize: any = ReactRedux.connect(mapProps, null)(_Authorize);    
}

import auth = EK.UX.Auth;

import getOption = EK.UX.Auth.getOption;
import getOptionPermission = EK.UX.Auth.getOptionPermission;
import getOptionPermissionValue = EK.UX.Auth.getOptionPermissionValue;
import Authorize = EK.UX.Auth.Authorize;
import AuthorizeAction = EK.UX.Auth.AuthorizeAction;
import AuthorizePermission = EK.UX.Auth.AuthorizePermission;
import AuthorizeMode = EK.UX.Auth.AuthorizeMode;