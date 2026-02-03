namespace EK.Modules.Kontrol.Pages.Clasificadores {
    "use strict";
    const idForm: string = "clasificadorescatalogo";
    const CLASIFICADORES_ID = "Clasificadores";

    interface IClasificadoresCatalogo extends React.Props<any> {
        id: string;
        item: any;
       
        config?: page.IPageConfig;
        entidad?: DataElement;
        entityType?: DataElement;
        customEntityType?: string;
        tipoClasificador?: any;
        clasificador?: any;
        clasificadoresPorEntidad?: any;
        acciones?: any;
        //inicializar: (claveEntidad: string, item: any) => void;
        //cleanup: () => void;
        onItemClick?: (item: any) => void;
        //actualizarAcciones?: (items: any[]) => void;
        page?: any;
        state?: DataElement;
        size?: number[];
    }

    interface IClasificadoresState {
        permiso: number;
    }

    export class PageClasificadoresCatalogo extends React.Component<IClasificadoresCatalogo, IClasificadoresState> {
        constructor(props: IClasificadoresCatalogo) {
            super(props);

            //this.onChangeClasificador = this.onChangeClasificador.bind(this);
            //this.onClickAdd = this.onClickAdd.bind(this);
            //this.onClickRemove = this.onClickRemove.bind(this);
            //this.updateClasificadores = this.updateClasificadores.bind(this);

            //this.state = {
            //    permiso: getOptionPermissionValue(this.props.id)
            //}
        };
        static defaultProps: IClasificadoresCatalogo = {
            id: "Clasificador",
            size: [12, 12, 12, 12],
            item: {},
            customEntityType: null
        };
        componentWillUnmount(): any {
            //this.props.cleanup();
        };
        componentDidMount(): any {
            let url: string = "base/kontrol/catalogoClasificador/all/";
            let data: any = { claveEntidad: global.getData(this.props.entityType), idEntidad: global.getDataID(this.props.entidad) };
            let config: page.IPageConfig = global.assign({}, this.props.config);
            let slots: any[] = config.slots;

            if (this.props.customEntityType) {
                data.claveEntidad = this.props.customEntityType;
            };

            if (!config.hasSlot(CLASIFICADORES_ID)) {
                if (!slots) {
                    slots = [];
                };

                slots.push(CLASIFICADORES_ID);

                global.setPageConfig({ id: config.id, modulo: config.modulo, slots, idML: config.idML });
            };
            
            this.props.config.dispatchCatalogoBase(url, data, CLASIFICADORES_ID);
        };
        componentDidUpdate(prevProps: IClasificadoresCatalogo) {
            //if (prevProps.clasificadoresPorEntidad.status === AsyncActionTypeEnum.updating) {
            //    if (this.props.clasificadoresPorEntidad.status === AsyncActionTypeEnum.successful) {
            //        success("Los clasificadores fueron guardados");

            //        this.props.actualizarAcciones([]);
            //    }
            //}
        };
        shouldComponentUpdate(nextProps: IClasificadoresCatalogo, nextState: IClasificadoresCatalogo): boolean {
            return global.hasChanged(this.props.clasificadoresPorEntidad, nextProps.clasificadoresPorEntidad) ||
                global.hasChanged(this.props.acciones, nextProps.acciones);
        }
        /* Funciones */
        //onClickRemove(item: any): any {
        //    let acciones: any[] = getData(this.props.acciones);
        //    let accionesState: any[] = [];
        //    let wasAddedByAction: boolean = false;

        //    for (var i = 0; i < acciones.length; i++) {
        //        let value: any = acciones[i];
        //        if (value.ID === item.ID && value.TipoClasificador.ID === item.TipoClasificador.ID) {
        //            wasAddedByAction = true;
        //        } else {
        //            accionesState.push(EK.Global.assign({}, value));
        //        };
        //    };

        //    if (!wasAddedByAction) {
        //        let nuevoClasificador = {
        //            ID: item.ID,
        //            Clave: item.Clave,
        //            Nombre: item.Nombre,
        //            Accion: 2,
        //            TipoClasificador: {
        //                ID: item.TipoClasificador.ID,
        //                Clave: item.TipoClasificador.Clave,
        //                Nombre: item.TipoClasificador.Nombre
        //            }
        //        };

        //        accionesState.push(nuevoClasificador);
        //    };

        //    this.props.actualizarAcciones(accionesState);
        //};
        //onClickAdd(): void {
        //    let acciones: any[] = getData(this.props.acciones);
        //    let accionesState: any[] = [];
        //    let tipoClasificador: any = this.props.tipoClasificador.data;
        //    let clasificador: any = this.props.clasificador.data;
        //    let foundInAdded: boolean = false;
        //    let foundInRemoved: boolean = false;

        //    for (var i = 0; i < acciones.length; i++) {
        //        let value: any = acciones[i];
        //        if (value.ID === clasificador.ID && value.TipoClasificador.ID === tipoClasificador.ID) {
        //            if (value.Accion === 1) {
        //                foundInAdded = true;
        //            } else {
        //                foundInRemoved = true;
        //            }
        //        } else {
        //            accionesState.push(EK.Global.assign({}, value));
        //        };
        //    };

        //    if (foundInRemoved) {
        //        this.props.actualizarAcciones(accionesState);
        //    } else {
        //        if (foundInAdded) {
        //            //
        //        } else {
        //            if (!this.itemExists(tipoClasificador, clasificador)) {
        //                let nuevoClasificador = {
        //                    ID: clasificador.ID,
        //                    Clave: clasificador.Clave,
        //                    Nombre: clasificador.Nombre,
        //                    Accion: 1,
        //                    TipoClasificador: {
        //                        ID: tipoClasificador.ID,
        //                        Clave: tipoClasificador.Clave,
        //                        Nombre: tipoClasificador.Nombre
        //                    }
        //                };

        //                accionesState.push(nuevoClasificador);

        //                this.props.actualizarAcciones(accionesState);
        //            }
        //        }
        //    }
        //};
        //updateClasificadores(acciones: any[]): any {
        //    if (!isSuccessful(this.props.clasificadoresPorEntidad)) {
        //        return this.props.clasificadoresPorEntidad;
        //    };

        //    let actionsForDelete: any[] = [];
        //    let actionsForAdd: any[] = [];

        //    for (var i = 0; i < acciones.length; i++) {
        //        if (acciones[i].Accion === 1) {
        //            actionsForAdd.push(acciones[i]);
        //        } else {
        //            actionsForDelete.push(acciones[i]);
        //        };
        //    };

        //    let fnIsForDelete: (t: number, c: number) => boolean = (t: number, c: number): boolean => {
        //        for (var i = 0; i < actionsForDelete.length; i++) {
        //            let ad: any = actionsForDelete[i];

        //            if (ad.ID === c && ad.TipoClasificador.ID === t) {
        //                return true;
        //            }
        //        };

        //        return false;
        //    };

        //    let retValue: any[] = [];
        //    let cpe: any[] = getData(this.props.clasificadoresPorEntidad);
        //    for (var i = 0; i < cpe.length; i++) {
        //        let value: any = cpe[i];
        //        let tc: any = {
        //            ID: value.ID,
        //            Clave: value.Clave,
        //            Nombre: value.Nombre,
        //            Clasificadores: []
        //        };

        //        for (var j = 0; j < value.Clasificadores.length; j++) {
        //            let c: any = value.Clasificadores[j];

        //            if (!fnIsForDelete(tc.ID, c.ID)) {
        //                tc.Clasificadores.push({
        //                    ID: c.ID,
        //                    Clave: c.Clave,
        //                    Nombre: c.Nombre,
        //                    TipoClasificador: {
        //                        ID: tc.ID,
        //                        Clave: tc.Clave,
        //                        Nombre: tc.Nombre
        //                    }
        //                });
        //            };
        //        };

        //        if (tc.Clasificadores.length > 0) {
        //            retValue.push(tc);
        //        };
        //    };

        //    if (actionsForAdd.length > 0) {
        //        actionsForAdd.forEach((value: any, index: number) => {
        //            let tc: any = null;

        //            for (var i = 0; i < retValue.length; i++) {
        //                if (value.TipoClasificador.ID === retValue[i].ID) {
        //                    tc = retValue[i];

        //                    break;
        //                }
        //            }

        //            if (tc === null) {
        //                retValue.push({
        //                    ID: value.TipoClasificador.ID,
        //                    Clave: value.TipoClasificador.Clave,
        //                    Nombre: value.TipoClasificador.Nombre,
        //                    Clasificadores: [{
        //                        ID: value.ID,
        //                        Clave: value.Clave,
        //                        Nombre: value.Nombre,
        //                        Clasificadores: [],
        //                        TipoClasificador: {
        //                            ID: value.TipoClasificador.ID,
        //                            Clave: value.TipoClasificador.Clave,
        //                            Nombre: value.TipoClasificador.Nombre,
        //                        }
        //                    }]
        //                });
        //            } else {
        //                tc.Clasificadores.push({
        //                    ID: value.ID,
        //                    Clave: value.Clave,
        //                    Nombre: value.Nombre,
        //                    Clasificadores: [],
        //                    TipoClasificador: {
        //                        ID: value.TipoClasificador.ID,
        //                        Clave: value.TipoClasificador.Clave,
        //                        Nombre: value.TipoClasificador.Nombre,
        //                    }
        //                });
        //            }
        //        });
        //    };

        //    return createSuccessfulStoreObject(retValue);
        //};
        //itemExists(tipoClasificador: any, clasificador: any): boolean {
        //    if (isSuccessful(this.props.clasificadoresPorEntidad)) {
        //        let data: any[] = this.props.clasificadoresPorEntidad.data;

        //        // 
        //        let tc: any[] = data.filter(d => d.ID === tipoClasificador.ID);
        //        if (tc.length > 0) {
        //            let cl: any[] = tc[0].Clasificadores.filter(c => c.ID === clasificador.ID);

        //            if (cl.length > 0) {
        //                return true;
        //            };
        //        };
        //    };

        //    return false;
        //};
        render(): JSX.Element {
            let config: page.IPageConfig = this.props.config;
            //let clasificadoresEntidad: any = this.updateClasificadores(getData(this.props.acciones));
            let idParent: string = "";

            if (global.isSuccessful(this.props.page)) {
                idParent = global.getData(this.props.page).id;
            };
            
            //let mensajeActualizacion: string =
            //    clasificadoresEntidad.status === AsyncActionTypeEnum.updating ?
            //        "Guardando los clasificadores" : "Obteniendo clasificadores";


            if (page.canViewEditMode(this.props.state)) {
                return <page.SectionList
                    id={CLASIFICADORES_ID}
                    title= "Clasificadores"
                    parent={idParent}
                    icon="fa fa-table"
                    level={1}
                    size={[12, 12, 12, 12]}
                    listMode="literal"
                    mapFormToEntity={(form: EditForm, entidades: any[]): any => {
                        let retValue: any = form
                            .addObject("TipoClasificador")
                            .addObject("Clasificador")
                            .toObject();

                        if (entidades) {
                            entidades.forEach((value: any, index: number): void => {
                                if (value.IdTipoClasificador === retValue.IdTipoClasificador && value.IdClasificador === retValue.IdClasificador) {
                                    if (value.ID !== retValue.ID) {
                                        retValue.ID = value.ID;
                                        retValue.Version = value.Version;
                                    };
                                };
                            });
                        };

                        return retValue;
                    }}
                    readonly={false}
                    addRemoveButton={false}
                    aggregate={(item?: any, values?: any) => {
                        let retValue: any = values ? values : {};

                        if (item && item.IdTipoClasificador > 0) {
                            if (values.IdTipoClasificador !== item.IdTipoClasificador) {
                                values.IdTipoClasificador = item.IdTipoClasificador;
                                //
                                values.renderGroup = true;
                            }
                            else {
                                values.renderGroup = false;
                            };
                        };

                        return retValue;
                    }}
                    formatter={(index: number, item: any, values: any) => {
                        return <div>
                            {values && values.renderGroup === true ? <Row className="listItem-groupHeader">
                                <Column size={[12, 12, 12, 12]}>
                                    <i className="fas fa-tags" style={{ marginRight: 5 }}></i> {item.TipoClasificador.Nombre}
                                </Column>
                            </Row> : null}
                            <Row className={index % 2 === 0 ? "listItem-row-even" : "listItem-row-odd"}>
                                <Column size={[11, 11, 11, 11]} className="listItem-left-item">
                                    {item.Clasificador.Nombre}
                                </Column>
                                <buttons.PopOver idParent={config.id} idForm={CLASIFICADORES_ID} info={item}
                                    extraData={[buttons.PopOver.remove]} />
                            </Row>
                        </div>;
                    }}>
                    <Row>
                        <TipoClasificador idFormSection={CLASIFICADORES_ID} />
                        <ClasificadoresDDL idFormSection={CLASIFICADORES_ID} />
                    </Row>
                </page.SectionList>;
            }
            else {
                return <page.SectionList
                    id={CLASIFICADORES_ID}
                    title="Clasificadores"
                    parent={idParent}
                    level={1}
                    icon="fa fa-table"
                    size={[12, 12, 12, 12]}
                    readonly={false}
                    addRemoveButton={false}
                    listMode="literal"
                    aggregate={(item?: any, values?: any) => {
                        let retValue: any = values ? values : {};

                        if (item && item.IdTipoClasificador > 0) {
                            if (values.IdTipoClasificador !== item.IdTipoClasificador) {
                                values.IdTipoClasificador = item.IdTipoClasificador;
                                //
                                values.renderGroup = true;
                            }
                            else {
                                values.renderGroup = false;
                            };
                        };

                        return retValue;
                    }}
                    formatter={(index: number, item: any, values: any) => {
                        return <div>
                            {values && values.renderGroup === true ? <Row className="listItem-groupHeader">
                                <Column size={[12, 12, 12, 12]}>
                                    <i className="fas fa-tags" style={{ marginRight: 5 }}></i> {item.TipoClasificador.Nombre}
                                </Column>
                            </Row> : null}
                            <Row className={index % 2 === 0 ? "listItem-row-even" : "listItem-row-odd"}>
                                <Column size={[12, 12, 12, 12]} className="listItem-left-item">
                                    {item.Clasificador.Nombre}
                                </Column>
                            </Row>
                            </div>;
                    }}>
                </page.SectionList>;
            }
        }
    }

    //Página
    const mapProps: any = (state: any): any => {
        return {
            config: global.getPageConfig(state.global.pageConfig),
            page: state.global.page,
            entidad: state.global.currentEntity,
            entityType: state.global.currentEntityType,
            tipoClasificadores: state.clasificadores.tipoClasificadores,
            clasificadoresPorEntidad: state.clasificadores.clasificadoresPorEntidad,
            clasificador: state.clasificadores.clasificador,
            tipoClasificador: state.clasificadores.tipoClasificador,
            acciones: state.clasificadores.acciones,
            state: state.global.currentEntityState
        };
    };

    const buttonAddMapProps: any = (state: any): any => {
        let tipo = isSuccessful(state.clasificadores.tipoClasificadores);
        let clasificador = isSuccessful(state.clasificadores.clasificador); 

        return {
            visible: tipo && clasificador
        };
    };

    //const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
    //    return {
    //        cleanup: (): void => {
    //            dispatchDefault("clasificadores-acciones", []);
    //            dispatchDefault("clasificadores-clasificadoresentidad", []);
    //        },
    //        inicializar: (claveEntidad: string, item: any): void => {
    //            dispatchSuccessful("clasificadores-item", { claveEntidad, item });
    //            dispatchAsync("clasificadores-clasificadoresentidad", "clasificadores/entidad(" + claveEntidad + "/" + item.ID + ")");
    //        },
    //        actualizarAcciones: (items: any[]): void => {
    //            dispatchSuccessful("clasificadores-acciones", items);
    //        }
    //    }; 
    //};

    export let ClassAddButton: any = ReactRedux.connect(buttonAddMapProps, null)(Button);
    export let section: any = ReactRedux.connect(mapProps, null)(PageClasificadoresCatalogo);
    /// Filtro de DDLClasificadores
    export interface ITipoClasificadorFilterDDLProps extends IDropDrownListProps {
        obtenerTiposClasificador: () => void;
        cleanup: () => void;
    }



    /// Filtro de DDLClasificadores
    class TipoClasificador$DDL extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSCLASIFICADOR
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "TipoClasificador",
            items: createDefaultStoreObject([]),
            label: "Tipo",
            helpLabel: "Seleccione el tipo de clasificador",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            addNewItem: "SO",
            addNewItemText: "Seleccione una opcion",
            size: undefined
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "tiposClasificador", { activos: 1 });
                dispatchAsync("load::TIPOSCLASIFICADOR", url);
            };
        };
        render(): any {
            return <ddl.DropdownList$Form {...this.props} />;
        };
    };

    export const TipoClasificador: any = ReactRedux.connect(TipoClasificador$DDL.props)(TipoClasificador$DDL);

    export interface IClasificadorFilterDDLProps extends ddl.IDropDrownListProps {
        tipoClasificador?: any;
    };
    export class ClasificadorDDL extends React.Component<IClasificadorFilterDDLProps, IClasificadorFilterDDLProps> {
        static props: any = (state: any) => ({
            items: state.global.CLASIFICADORES,
            tipoClasificador: Forms.getValue("TipoClasificador", CLASIFICADORES_ID, state)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Clasificador",
            items: createDefaultStoreObject([]),
            label: "Clasificador",
            helpLabel: "Seleccione el clasificador",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined
        };
        componentDidUpdate(prevProps: IClasificadorFilterDDLProps) {
            if (this.props.tipoClasificador && this.props.tipoClasificador.ID > 0) {
                if (global.hasChanged(this.props.tipoClasificador, prevProps.tipoClasificador)) {
                    let idForm: any = this.props.idFormSection != null && this.props.idFormSection != undefined ? this.props.idFormSection : this.props.idForm;
                    Forms.updateFormElement(idForm, this.props.id, {});
                    let url: string = global.encodeAllURL("kontrol", "clasificadores", { claveCatalogo: this.props.tipoClasificador.Clave });
                    dispatchAsync("load::CLASIFICADORES", url);
                };
            };
        };
        shouldComponentUpdate(nextProps: IClasificadorFilterDDLProps, nextState: IClasificadorFilterDDLProps): boolean {
            return global.hasChanged(this.props.tipoClasificador, nextProps.tipoClasificador) ||
                global.hasChanged(this.props.items, nextProps.items);
        };
        render(): any {
            return <ddl.DropdownList$Form {...this.props} />;
        };
    };
    export const ClasificadoresDDL: any = ReactRedux.connect(ClasificadorDDL.props)(ClasificadorDDL);

    const mapSCButtonProps: any = (state: any) => {
        return {
            info: {
                item: state.clasificadores.item,
                acciones: state.clasificadores.acciones
            },
            visible: isSuccessful(state.clasificadores.acciones)
        };
    };

    const mapSCButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {
                let claveEntidad: any = info.item.data.claveEntidad;
                let item: any = info.item.data.item;
                let acciones: any = info.acciones.data;

                dispatch(actionAsync({
                    action: "clasificadores-save",
                    type: HttpMethod.POST,
                    url: "clasificadores/guardar",
                    data: { claveEntidad, item, acciones },
                    custom: {
                        processData: false,
                        contentType: false
                    },
                    status: AsyncActionTypeEnum.updating
                }));
            }
        }
    };

    export let Clasificadores$SaveButton: any = ReactRedux.connect(mapSCButtonProps, mapSCButtonDispatchs)(EK.UX.Buttons.SaveButton);
    //export let Clasificadores$TiposClasificador: any = ReactRedux.connect(ddlTipoClasificadoresMapProps, ddlTipoClasificadoresMapDispatchs)(TipoClasificadorFilterDDL);
    //export let Clasificadores$Clasificadores: any = ReactRedux.connect(ddlClasificadoresMapProps, ddlClasificadoresMapDispatchs)(ClasificadorFilterDDL);
}
import clasificadores = EK.Modules.Kontrol.Pages.Clasificadores;
import Clasificadores$SaveButton = EK.Modules.Kontrol.Pages.Clasificadores.Clasificadores$SaveButton;
import ClasificadoresSection = EK.Modules.Kontrol.Pages.Clasificadores.section;