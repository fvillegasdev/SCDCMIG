namespace EK.Modules.SCCO.Pages.Presupuestos.WBS.App.Interfaces {
    "use strict";
    export interface IWBSConfig {
        id: string;
        maxLevel: number;
        minLevel: number;
        validations: any[];
    };

    export interface IWBSNodoType {
        OBRA: string;
        NIVEL: string;
        TARJETA: string;
        INSUMO: string;
    };

    export interface IWBSNodo {
        codigo: string[];
        nivel: number;
        padre: IWBSNodo;
        raiz: IWBSNodo;
        tipo: string;
        entidad: any;
        serialize(): any;
        onEdit(idForm: string): void;
        onView(idForm: string): void;
        formatter: (item: IWBSNodo, index: number, props: any) => JSX.Element;
        getLowerId: (id?: number) => number;
        beforeSave: (item?: any, config?: page.IPageConfig) => boolean;
        mapFormToEntity: (form: global.EditForm) => any;
        getProperty: (property: string) => any;
        setProperty: (property: string, value: any) => void;
        calculate: () => number;
        isEqual: (item: IWBSNodo) => boolean;
        update: (item: IWBSNodo) => boolean;
        node: (props: any) => JSX.Element;
        edit: (props: any) => JSX.Element;
        view?: (props: any) => JSX.Element;
    };

    export interface IWBSComposite extends IWBSNodo {
        children: Array<IWBSNodo>;
        add: (item: IWBSNodo) => void;
        remove: (item: IWBSNodo) => void;
        removeAll: () => void;
        create: (data: any) => IWBSNodo;
        getActiveChildren(): Array<IWBSNodo>;
    };

    export interface IWBSObra extends IWBSComposite { };

    export interface IWBSNivel extends IWBSComposite { };

    export interface IWBSTarjeta extends IWBSComposite { };

    export interface IWBSInsumo extends IWBSNodo { };
};