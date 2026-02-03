// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.Modules.SCV.Pages.postventa.RUBA {
    "use strict";
    const PAGE_ID: string = "ReporteFallasAreasComunes";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv");
    const w: any = window;

    interface IResponsablesConstruccionDDLProps extends ddl.IDropDrownListProps {
        ubicacion?: DataElement;
        savedUbicacion?: DataElement;
        plaza?: any;
        plaza2?: any;
    };
    export let ResponsablesConstruccionDDL2: any = global.connect(class extends React.Component<IResponsablesConstruccionDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.reporte$responsables,
            ubicacion: state.global.entity$reporte$ubicacion,
            plaza: state.global.Plaza_Seleccionada,
            plaza2: state.global.Plaza_Seleccionada2
        });
        static defaultProps: IResponsablesConstruccionDDLProps = {
            id: "Responsable",
            items: createDefaultStoreObject([]),
            label: "Responsable de Construcción",
            helpLabel: "Responsable de Construcción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentWillReceiveProps(nextProps: IResponsablesConstruccionDDLProps): void {
            if (global.hasChanged(this.props.ubicacion, nextProps.ubicacion)) {
                if (global.isSuccessful(nextProps.ubicacion)) {
                    let ubicacion: any = global.getData(nextProps.ubicacion);

                    let p: any = global.assign({
                        IdPlaza: ubicacion.IdPlaza,
                        IdFraccionamiento: ubicacion.DesarrolloClave,
                    });
                    //console.log(p)

                    global.dispatchAsyncPost("load::reporte$responsables", "base/scv/SPVSupervisoresCoordinadores/GetBP/getResponsablesConstruccion/", { parametros: p });
                };
            } else if (global.hasChanged(this.props.plaza, nextProps.plaza)) {
                if (global.isSuccessful(nextProps.plaza)) {
                    let plaza = global.getData(nextProps.plaza)
                    let p: any = global.assign({
                        IdPlaza: plaza.ID
                    })
                    global.dispatchAsyncPost("load::reporte$responsables", "base/scv/SPVSupervisoresCoordinadores/GetBP/getResponsablesConstruccion/", { parametros: p });

                }
            } else if (global.hasChanged(this.props.plaza2, nextProps.plaza2)) {
                if (global.isSuccessful(nextProps.plaza2)) {
                    let plaza = global.getData(nextProps.plaza2)
                    let p: any = global.assign({
                        IdPlaza: plaza.ID
                    })
                    global.dispatchAsyncPost("load::reporte$responsables", "base/scv/SPVSupervisoresCoordinadores/GetBP/getResponsablesConstruccion/", { parametros: p });

                }
            };
        };
        componentDidMount(): void {
            global.dispatchSuccessful("load::reporte$responsables", []);
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("load::reporte$responsables", []);
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export let ResponsablesConstruccionDDLV3: any = global.connect(class extends React.Component<IResponsablesConstruccionDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.reporte$responsables,
            ubicacion: state.global.entity$reporte$ubicacion,
            plaza: state.global.Plaza_Seleccionada,
            plaza2: state.global.Plaza_Seleccionada2,
            savedUbicacion: state.global.currentEntity
        });
        static defaultProps: IResponsablesConstruccionDDLProps = {
            id: "Responsable",
            items: createDefaultStoreObject([]),
            label: "Responsable de Construcción",
            helpLabel: "Responsable de Construcción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentWillReceiveProps(nextProps: IResponsablesConstruccionDDLProps): void {
            if (global.hasChanged(this.props.ubicacion, nextProps.ubicacion)) {
                if (global.isSuccessful(nextProps.ubicacion)) {
                    let ubicacion: any = global.getData(nextProps.ubicacion);

                    let p: any = global.assign({
                        IdPlaza: ubicacion.IdPlaza,
                        IdFraccionamiento: ubicacion.DesarrolloClave,
                    });
                    console.log(p)

                    global.dispatchAsyncPost("load::reporte$responsables", "base/scv/SPVSupervisoresCoordinadores/GetBP/getResponsablesConstruccionACUnico/", { parametros: p });
                };
            } else if (global.hasChanged(this.props.plaza, nextProps.plaza)) {
                if (global.isSuccessful(nextProps.plaza)) {
                    let ubicacion: any = global.getData(nextProps.savedUbicacion);
                    console.log(ubicacion)
                    if (ubicacion.ID > 0) {
                        let p: any = global.assign({
                            IdPlaza: ubicacion.IdPlaza
                        })
                        console.log(p)
                        global.dispatchAsyncPost("load::reporte$responsables", "base/scv/SPVSupervisoresCoordinadores/GetBP/getResponsablesConstruccionACUnico/", { parametros: p });

                    } else {
                        let plaza = global.getData(nextProps.plaza)
                        let p: any = global.assign({
                            IdPlaza: plaza.ID
                        })
                        console.log(p)
                        global.dispatchAsyncPost("load::reporte$responsables", "base/scv/SPVSupervisoresCoordinadores/GetBP/getResponsablesConstruccionACUnico/", { parametros: p });

                    }
                    
                }
            } else if (global.hasChanged(this.props.plaza2, nextProps.plaza2)) {
                if (global.isSuccessful(nextProps.plaza2)) {
                    let plaza = global.getData(nextProps.plaza2)
                    let p: any = global.assign({
                        IdPlaza: plaza.ID
                    })
                    console.log(p)
                    global.dispatchAsyncPost("load::reporte$responsables", "base/scv/SPVSupervisoresCoordinadores/GetBP/getResponsablesConstruccionACUnico/", { parametros: p });

                }
            };
        };
        componentDidMount(): void {
            global.dispatchSuccessful("load::reporte$responsables", []);
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("load::reporte$responsables", []);
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });






    interface IFraccDDLProps extends ddl.IDropDrownListProps {
        ubicacion?: DataElement;
        plaza?: any;
        plaza2?: any;
    };
    export let FraccDDL: any = global.connect(class extends React.Component<IFraccDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.Fraccs,
            plaza: state.global.Plaza_Seleccionada,
        });
        static defaultProps: IResponsablesConstruccionDDLProps = {
            id: "Fraccionamiento",
            items: createDefaultStoreObject([]),
            label: "Fraccionamientos",
            helpLabel: "Fraccionamientos",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentWillReceiveProps(nextProps: IFraccDDLProps): void {
            if (global.hasChanged(this.props.plaza, nextProps.plaza)) {
                if (global.isSuccessful(nextProps.plaza)) {
                    let IDPLAZA: any = getData(nextProps.plaza).ID
                    let encodedParams: string = global.encodeParameters({ IdPlaza: IDPLAZA, IdVocacion: -2 });
                    global.dispatchAsyncPost("load::Fraccs", "base/kontrol/fraccionamientos/all/", { parametros: encodedParams });

                };
            }
        };
        componentDidMount(): void {
            global.dispatchSuccessful("load::Fraccs", []);
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("load::Fraccs", []);
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    interface IFraccionamientosDashBoardFailureReportVDDLProps extends IDropDrownListProps {
        plazaSeleccionada?: global.DataElement;
    }
    export class FraccionamientosDashBoardFailureReport$DDL2 extends React.Component<IFraccionamientosDashBoardFailureReportVDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.DDLFRACCIONAMIENTOSDBFAILUREREPORT,
            plazaSeleccionada: state.global.Plaza_Seleccionada //Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
        });

        static defaultProps: IDropDrownListProps = {
            id: "Fraccionamiento",
            items: createDefaultStoreObject([]),
            label: "Fraccionamientos",
            helpLabel: "Seleccione el fraccionamiento.",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: true,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentWillReceiveProps(nextProps: IFraccionamientosDashBoardFailureReportVDDLProps, nextState: IFraccionamientosDashBoardFailureReportVDDLProps): void {
            if (global.hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada)) {

                if ((getData(nextProps.plazaSeleccionada).ID != getData(this.props.plazaSeleccionada).ID)) {
                    let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2 });
                    let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;
                    if (idPlaza != undefined) {
                        dispatchAsync("load::DDLFRACCIONAMIENTOSDBFAILUREREPORT", encodedURL);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IFraccionamientosDashBoardFailureReportVDDLProps, nextState: IFraccionamientosDashBoardFailureReportVDDLProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillMount(): any {
            //Forms.updateFormElement(config.id, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            ////////
            if (global.isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    };
                };
            //    if (existeItemTodos === false) {
            //        let nuevoItem: any = {};
            //        nuevoItem['ID'] = -2;
            //        nuevoItem['Clave'] = '-2';
            //        nuevoItem['Nombre'] = 'TODOS';
            //        if (itemsModificados.data.length > 0) {
            //            // itemsModificados.data.unshift(nuevoItem);
            //        };
            //    };
            };
            ///////
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} /*addNewItem={"SO"} addNewItemText={"Indique el Fraccionamiento"}  */ />;
        };
    };
    export const FraccionamientosDashBoardFailureReportDDL2: any = ReactRedux.connect(FraccionamientosDashBoardFailureReport$DDL2.props, null)(FraccionamientosDashBoardFailureReport$DDL2);

    interface IFraccionamientosColaboradorDDLProps extends IDropDrownListProps {
        plazaSeleccionada?: global.DataElement;
    }
    export class FraccionamientosColaborador$DDL extends React.Component<IFraccionamientosColaboradorDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.DDLFRACCIONAMIENTOSCOLABORADOR,
            plazaSeleccionada: state.global.Plaza_Seleccionada //Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
        });

        static defaultProps: IDropDrownListProps = {
            id: "Fraccionamiento",
            items: createDefaultStoreObject([]),
            label: "Fraccionamientos",
            helpLabel: "Seleccione el fraccionamiento.",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentWillReceiveProps(nextProps: IFraccionamientosColaboradorDDLProps, nextState: IFraccionamientosColaboradorDDLProps): void {

            if (global.hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada)) {
                if ((getData(nextProps.plazaSeleccionada).ID != getData(this.props.plazaSeleccionada).ID)) {
                    let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2 });
                    let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;
                    if (idPlaza != undefined) {
                        dispatchAsync("load::DDLFRACCIONAMIENTOSCOLABORADOR", encodedURL);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IFraccionamientosColaboradorDDLProps, nextState: IFraccionamientosColaboradorDDLProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillMount(): any {
            // Forms.updateFormElement(config.id, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            ////////
            if (global.isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    };
                };
                //if (existeItemTodos === false) {
                //    let nuevoItem: any = {};
                //    nuevoItem['ID'] = -2;
                //    nuevoItem['Clave'] = '-2';
                //    nuevoItem['Nombre'] = 'TODOS';
                //    if (itemsModificados.data.length > 0) {
                //        // itemsModificados.data.unshift(nuevoItem);
                //    };
                //};
            };
            ///////
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} /*addNewItem={"SO"} addNewItemText={"Indique el Fraccionamiento"}  */ />;
        };
    };
    export const FraccionamientosColaboradorDDL: any = ReactRedux.connect(FraccionamientosColaborador$DDL.props, null)(FraccionamientosColaborador$DDL);


    interface IFraccionamientosAnonimoDDLProps extends IDropDrownListProps {
        plazaSeleccionada2?: global.DataElement;
    }
    export class FraccionamientosAnonimo$DDL extends React.Component<IFraccionamientosAnonimoDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.DDLFRACCIONAMIENTOSANONIMO,
            plazaSeleccionada2: state.global.Plaza_Seleccionada2 //Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
        });

        static defaultProps: IDropDrownListProps = {
            id: "Fraccionamientos2",
            items: createDefaultStoreObject([]),
            label: "Fraccionamientos",
            helpLabel: "Seleccione el fraccionamiento.",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentWillReceiveProps(nextProps: IFraccionamientosAnonimoDDLProps, nextState: IFraccionamientosAnonimoDDLProps): void {

            if (global.hasChanged(this.props.plazaSeleccionada2, nextProps.plazaSeleccionada2)) {
                if ((getData(nextProps.plazaSeleccionada2).ID != getData(this.props.plazaSeleccionada2).ID)) {
                    let idPlaza: any = getData(nextProps.plazaSeleccionada2).ID;
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2 });
                    let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;
                    if (idPlaza != undefined) {
                        dispatchAsync("load::DDLFRACCIONAMIENTOSANONIMO", encodedURL);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IFraccionamientosDashBoardFailureReportVDDLProps, nextState: IFraccionamientosDashBoardFailureReportVDDLProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillMount(): any {
           // Forms.updateFormElement(config.id, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            ////////
            if (global.isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    };
                };
                //if (existeItemTodos === false) {
                //    let nuevoItem: any = {};
                //    nuevoItem['ID'] = -2;
                //    nuevoItem['Clave'] = '-2';
                //    nuevoItem['Nombre'] = 'TODOS';
                //    if (itemsModificados.data.length > 0) {
                //        // itemsModificados.data.unshift(nuevoItem);
                //    };
                //};
            };
            ///////
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} /*addNewItem={"SO"} addNewItemText={"Indique el Fraccionamiento"}  */ />;
        };
    };
    export const FraccionamientosAnonimoDDL: any = ReactRedux.connect(FraccionamientosAnonimo$DDL.props, null)(FraccionamientosAnonimo$DDL);


    export class TipoContratista$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[PAGE_ID + "$TipoContratista"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "TipoContratista",
            items: createDefaultStoreObject([]),
            label: "Tipo Contratista",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let items: any[] = [];
                items.push({ ID: 1, Clave: "V", Nombre: "VIVIENDA" });
                items.push({ ID: 2, Clave: "U", Nombre: "URBANIZACION" });
                items.push({ ID: 3, Clave: "E", Nombre: "ELECTRIFICACION" });
                items.push({ ID: 4, Clave: "I", Nombre: "IMPERMEABILIZACION" });
                global.dispatchSuccessful("load::" + PAGE_ID + "$TipoContratista", items);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const TipoContratistas: any = ReactRedux.connect(TipoContratista$DDL.props, null)(TipoContratista$DDL);

    export class TipoContratistaConsulta$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[PAGE_ID + "$TipoContratistaConsulta"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "TipoContratista",
            items: createDefaultStoreObject([]),
            label: "Tipo Contratista",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let items: any[] = [];
                items.push({ ID: 1, Clave: "V", Nombre: "VIVIENDA" });
                items.push({ ID: 2, Clave: "U", Nombre: "URBANIZACION" });
                items.push({ ID: 3, Clave: "E", Nombre: "ELECTRIFICACION" });
                items.push({ ID: 4, Clave: "I", Nombre: "IMPERMEABILIZACION" });
                global.dispatchSuccessful("load::" + PAGE_ID + "$TipoContratistaConsulta", items);
            };
        };
        render(): JSX.Element {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        let test: any = EK.Store.getState().global.page.data.id;
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const TipoContratistasConsulta: any = ReactRedux.connect(TipoContratistaConsulta$DDL.props, null)(TipoContratistaConsulta$DDL);


    interface ITipoFallaAreaComun extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class TipoFallaAreaComun$DDL extends React.Component<ITipoFallaAreaComun, IDropDrownListState> {
        constructor(props: ITipoFallaAreaComun) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.TIPOFALLASAREACOMUN
        });
        static defaultProps: ITipoFallaAreaComun = {
            id: "TipoFallaAreaComun",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una Incidencia",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::TIPOFALLASAREACOMUN", "ReporteFallasAreasComunes/GetTipoFallas/");
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::TipoFalla_Seleccionada", null);
            dispatchDefault("load::TIPOFALLASAREACOMUN", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::TipoFalla_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: ITipoFallaAreaComun, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: ITipoFallaAreaComun, nextState: ITipoFallaAreaComun): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::TipoFalla_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            //let test: any = EK.Store.getState().global.page.data.id;
                            //if (test != "ReporteFallasAreasComunes" || test !== "catFallasAreasComunes")
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const TipoFallasAreaComunDDL: any = ReactRedux.connect(TipoFallaAreaComun$DDL.props, null)(TipoFallaAreaComun$DDL);


    interface IFallaAreasComunesDDLProps extends ddl.IDropDrownListProps {
        tipoFalla?: any;
    };
    export let FallaAreaComunDDL: any = global.connect(class extends React.Component<IFallaAreasComunesDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.reporte$fallasAreaComun,
            tipoFalla: state.global.TipoFalla_Seleccionada
        });
        static defaultProps: IFallaAreasComunesDDLProps = {
            id: "FallaAreaComun",
            items: createDefaultStoreObject([]),
            label: "Incidencia Area Comun",
            helpLabel: "Seleccione la Incidencia",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            required: false,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            },
        };
        componentWillReceiveProps(nextProps: IFallaAreasComunesDDLProps): void {
            if (global.hasChanged(this.props.tipoFalla, nextProps.tipoFalla)) {
                //console.log(nextProps)
                if (global.isSuccessful(nextProps.tipoFalla)) {
                    let tipoFalla = global.getData(nextProps.tipoFalla)
                    let p: any = global.assign({
                        idTipoFalla: tipoFalla.ID
                    })
                    global.dispatchAsyncPost("load::reporte$fallasAreaComun", "base/scv/ReporteFallasAreasComunes/GetBP/GetFallaAreaComun/", { parametros: p });
                }
            }
        };
        componentDidMount(): void {
            global.dispatchSuccessful("load::reporte$fallasAreaComun", []);
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("load::reporte$fallasAreaComun", []);
        };
        render(): JSX.Element {
            let itemsModificados: DataElement = this.props.items;
            //////
            if (global.isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    };
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    //if (itemsModificados.data.length > 0) {
                    let page: any = EK.Store.getState().global.page.data.id;
                    if (page !== "ReporteFallasAreasComunes")
                        itemsModificados.data.unshift(nuevoItem);
                    //};
                };
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });





    interface IUbicacionFallaComun extends ddl.IDropDrownListProps {

    }


    export class UbicacionFallaComun$DDL extends React.Component<IUbicacionFallaComun, IDropDrownListState> {
        constructor(props: IUbicacionFallaComun) {
            super(props);
            this.onchangeElementoUbicacionFalla = this.onchangeElementoUbicacionFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.UBICACIONFALLA
        });
        static defaultProps: IUbicacionFallaComun = {
            id: "UbicacionFalla",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una ubicacion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::UBICACIONFALLA", "ReporteFallasAreasComunes/GetUbicacionesFallas/");
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::UbicacionFalla_Seleccionada", null);
            dispatchDefault("load::UBICACIONFALLA", null);
        };
        onchangeElementoUbicacionFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::UbicacionFalla_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IUbicacionFallaComun, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IUbicacionFallaComun, nextState: IUbicacionFallaComun): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::UbicacionFalla_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        let test: any = EK.Store.getState().global.page.data.id;
                        if (test != "ReporteFallasAreasComunes")
                            itemsModificados.data.unshift(nuevoItem);
                    }
                }
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoUbicacionFalla} />;
        };
    };
    export const UbicacionFallaDDL: any = ReactRedux.connect(UbicacionFallaComun$DDL.props, null)(UbicacionFallaComun$DDL);



    interface ICausaFallaComun extends ddl.IDropDrownListProps {

    }


    export class CausaFallaComun$DDL extends React.Component<ICausaFallaComun, IDropDrownListState> {
        constructor(props: ICausaFallaComun) {
            super(props);
            this.onchangeElementoCausaFalla = this.onchangeElementoCausaFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.CAUSAFALLA
        });
        static defaultProps: ICausaFallaComun = {
            id: "CausaFalla",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una ubicacion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::CAUSAFALLA", "ReporteFallasAreasComunes/GetCausaFallas/");
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::CausaFalla_Seleccionada", null);
            dispatchDefault("load::CAUSAFALLA", null);
        };
        onchangeElementoCausaFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::CausaFalla_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: ICausaFallaComun, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: ICausaFallaComun, nextState: ICausaFallaComun): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::CausaFalla_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        let test: any = EK.Store.getState().global.page.data.id;
                        if (test != "ReporteFallasAreasComunes")
                            itemsModificados.data.unshift(nuevoItem);
                    }
                }
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoCausaFalla} />;
        };
    };
    export const CausaFallaDDL: any = ReactRedux.connect(CausaFallaComun$DDL.props, null)(CausaFallaComun$DDL);


    interface IContratistaAreaComun extends ddl.IDropDrownListProps {

    }

    export class ContratistaAreaComun$DDL extends React.Component<IContratistaAreaComun, IDropDrownListState> {
        constructor(props: IContratistaAreaComun) {
            super(props);
            this.onchangeElementoContratista = this.onchangeElementoContratista.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.CONTRATISTA
        });
        static defaultProps: IContratistaAreaComun = {
            id: "Contratista",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione un contratista",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::CONTRATISTA", "base/scv/Contratistas/all");
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::Contratista_Seleccionado", null);
            dispatchDefault("load::CONTRATISTA", null);
        };
        onchangeElementoContratista(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::Contratista_Seleccionado", itemFinal);
        };
        shouldComponentUpdate(nextProps: IContratistaAreaComun, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IContratistaAreaComun, nextState: IContratistaAreaComun): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::Contratista_Seleccionado", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        let test: any = EK.Store.getState().global.page.data.id;
                        if (test != "ReporteFallasAreasComunes")
                            itemsModificados.data.unshift(nuevoItem);
                    }
                }
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoContratista} />;
        };
    };
    export const ContratistaDDL: any = ReactRedux.connect(ContratistaAreaComun$DDL.props, null)(ContratistaAreaComun$DDL);


    export const SPVReportesClienteConsultaAreasComunes: any = global.connect(class extends React.Component<consultas.IConsultaProps, consultas.IConsultaProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entidad = Forms.getValue("Cliente", config.id, state);
            return retValue;
        };
        static defaultProps: consultas.IConsultaProps = {
            id: "ReportesCliente",
            remoteUrl: "base/scv/ReporteFallasAreasComunes/GetBP/GetFraccReportes",
            remoteMethod: HttpMethod.GET,
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 12, 12],
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdReporte", width: "100px", fixed: true })
                    //.add({ data: "IdPrereporte", width: "120px", fixed: true, format: EK.UX.DataTable.formatPrereporte })
                    .add({ data: "FechaCaptura", width: "100px", format: EK.UX.DataTable.formatDate })
                    .add({ data: "ResponsableConstruccion.Nombre", width: "250px" })
                    .add({ data: "Partida", width: "80px", align: "center", format: EK.UX.DataTable.formatBadgeInfo })
                    .add({ data: "Dictamenes", width: "120px", format: EK.UX.DataTable.formatDictamen })
                    .add({ title: "Tipo Incidencia", data: "TipoFalla.Nombre", width: "150px" })
                    .add({ title: "Incidencia", data: "Falla.Nombre", width: "150px" })
                    .add({ title: "Ubicacion Falla", data: "UbicacionFalla.Nombre", width: "150px" })
                    .add({ data: "Contratista.Descripcion", width: "250px" })
                    .add({ title: "Causa Incidencia", data: "CausaFalla.Nombre", width: "150px" })
                    .add({ title: "Fraccionamiento", data: "Desarrollo.Nombre", width: "150px" })
                    //.add({ data: "Reincidencias", width: "120px", align: "center", format: EK.UX.DataTable.formatBadgeWarning })
                    .add({ data: "Observaciones", width: "300px" })
                    .add({ data: "ObservacionesContratista", width: "300px" })
                    //.add({ data: "DiasGarantia", width: "120px", format: EK.UX.DataTable.formatGarantia })
                    //.add({ data: "TerminoGarantia", width: "150px", format: EK.UX.DataTable.formatDate })
                    .add({ data: "FechaCerrado", width: "120px", format: EK.UX.DataTable.formatDate })
                    .add({ data: "EstatusPartida.Nombre", width: "120px", format: EK.UX.DataTable.formatBadgeSuccess })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            global.go([config.modulo, "pv", config.id, item.IdReporte].join("/"));
        };
        render(): JSX.Element {
            let entidad: any = this.props.config.getEntity();
            let DesarrolloClave: any = global.getData(entidad).DesarrolloClave;
            if (DesarrolloClave === undefined && DesarrolloClave === null && DesarrolloClave === "") {
                DesarrolloClave = global.getData(entidad).Ubicacion.DesarrolloClave
            }
            

            if (DesarrolloClave === "") {
                return null;
            } else {
                let bi: any = () => {
                    return { DesarrolloClave };
                };

                return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick} beforeInvoke={bi} />
            }
        };
    });


    interface ISPVContratistasConsultaAreasComunesProps extends consultas.IConsultaProps {
        idPlaza?: any;
        visible?: boolean;
    };

    export class SPVContratistasConsultaAreasComunes extends React.Component<ISPVContratistasConsultaAreasComunesProps, {}> {
        static defaultProps: ISPVContratistasConsultaAreasComunesProps = {
            id: "Contratista",
            remoteUrl: "base/scv/Contratistas/all",
            remoteMethod: HttpMethod.GET,
            label: "Contratista",
            helpLabel: "Seleccione un contratista",
            value: undefined,
            initialValue: undefined,
            idPlaza: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!(item && item.ID)) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Descripcion", width: "300px", order: "asc" })
                    .add({ data: "Ciudad", width: "150px" })
                    .add({ data: "Direccion", width: "300px" })
                    .add({ data: "TipoContrato.Nombre", width: "200px" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                let idPlaza: number = this.props.idPlaza ? this.props.idPlaza : null;
                return { idPlaza };
            };

            if (this.props.visible === false) {
                return null;
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };

    class TipoCliente$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global["TipoCliente"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "TipoCliente",
            items: createDefaultStoreObject([]),
            label: "Tipo Cliente",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let items: any[] = [];
                items.push({ ID: 1, Clave: "PorCliente", Nombre: "Por Cliente" });
                items.push({ ID: 2, Clave: "PorColaborador", Nombre: "Por Colaborador" });
                items.push({ ID: 3, Clave: "PorAnonimo", Nombre: "Por Anonimo" });
                global.dispatchSuccessful("load::TipoCliente", items);
            };


        };
        render(): JSX.Element {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const TipoClienteDDL: any = ReactRedux.connect(TipoCliente$DDL.props, null)(TipoCliente$DDL);

};
