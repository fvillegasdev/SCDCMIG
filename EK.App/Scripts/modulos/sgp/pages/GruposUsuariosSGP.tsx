namespace EK.Modules.SGP.Pages.SGPGruposUsuarios {
    "use strict";

    const PAGE_ID: string = "SGPGruposUsuarios";
    const CATALOGO_GRUPOS_ID: string = PAGE_ID + "$GruposUsuarios";
    const CATALOGO_GRUPO_SELECCIONADO: string = PAGE_ID + "$GruposUsuariosSelect";
    const USUARIOS_SELECCIONADOS: string = PAGE_ID + "$UsuariosSelect";
    const CATALOGO_NAME: string = PAGE_ID + "$NameCatalogo";


    //const SECTION_COLABORADORES_ID = "Proyectos$Colaboradores";


    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "sgp", [CATALOGO_GRUPOS_ID]);
    const w: any = window;

    interface IViewSGPGrupos extends page.IProps {
        grupos?: global.DataElement;
        grupoSeleccionado?: global.DataElement;
        catalogoState?: global.DataElement;
        catalogoStateName?: any;
        idForm?: any;
        idFormSection?: any;
    };

    interface IViewSGPGruposState {
    };

    export const ViewSGPGruposUsuarios: any = global.connect(class extends React.Component<IViewSGPGrupos, IViewSGPGruposState>{
        constructor(props: IViewSGPGrupos) {
            super(props);
            this.onSave = this.onSave.bind(this);
            this.getGroupsUsersSelected = this.getGroupsUsersSelected.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.grupos = state.global["catalogo$" + CATALOGO_GRUPOS_ID];
            retValue.grupoSeleccionado = state.global["catalogo$" + CATALOGO_GRUPO_SELECCIONADO];
            retValue.catalogoState = state.global["catalogo$" + getData(state.global[CATALOGO_NAME])];
            return retValue;
        };

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });

        componentWillReceiveProps(nextProps: IViewSGPGrupos, { }): any {
            if (hasChanged(this.props.catalogoState, nextProps.catalogoState)) {
                if (global.isSuccessful(nextProps.catalogoState)) {
                }
            }
        };

        shouldComponentUpdate(nextProps: IViewSGPGrupos, { }): boolean {
            return hasChanged(this.props.grupos, nextProps.grupos);
        };

        componentWillMount(): void {
            if (isSuccessful(this.props.catalogoState)) {
                let ItemsGrupos: any = this.getGroupsUsersSelected();
                let newGrupos: any = createSuccessfulStoreObject(ItemsGrupos);
                global.dispatchSuccessful("global-page-data", newGrupos, CATALOGO_GRUPOS_ID);
            }
        };

        componentWillUnmount() {
            let ItemsGrupos: any = getData(this.props.grupos);
            if (ItemsGrupos && ItemsGrupos != undefined && ItemsGrupos.length > 0) {
                ItemsGrupos.forEach((valueGroups: any, indexGroups: number) => {
                    if (valueGroups.IntegrantesGrupo && valueGroups.IntegrantesGrupo.length > 0) {
                        valueGroups.IntegrantesGrupo.forEach((valueInte: any, indexInte: number) => {
                            if (valueInte.Usuario.ID) {
                                valueInte["Selected"] = false;
                            }
                        })
                    }
                })
            }
            let newGrupos: any = createSuccessfulStoreObject(ItemsGrupos);
            global.dispatchSuccessful("global-page-data", newGrupos, CATALOGO_GRUPOS_ID);
        };

        getGroupsUsersSelected() {
            let formValue: any;
            let Items: any = [];
            formValue = Forms.getValue(this.props.idFormSection, this.props.idForm);
            Items = getData(formValue);
            let ItemsGrupos: any = getData(this.props.grupos);
            if (Items != undefined && Items != null) {
                let newItems: any = createSuccessfulStoreObject(Items);
                global.dispatchSuccessful("load::" + USUARIOS_SELECCIONADOS, newItems);
                if (Items && Items.length > 0 && ItemsGrupos && ItemsGrupos.length > 0) {
                    Items.forEach((value: any, index: number) => {
                        ItemsGrupos.forEach((valueGroups: any, indexGroups: number) => {
                            if (valueGroups.IntegrantesGrupo && valueGroups.IntegrantesGrupo.length > 0) {
                                valueGroups.IntegrantesGrupo.forEach((valueInte: any, indexInte: number) => {
                                    if (valueInte.Usuario.ID === value.Usuario.ID) {
                                        if (value._eliminado) {
                                            valueInte["Selected"] = false;
                                        } else {
                                            valueInte["Selected"] = true;
                                        }
                                    }
                                })
                            }
                        })
                    })
                }
            }
            return ItemsGrupos;
        };

        onClickItem(item: any) {
            //let idGrupo: any = item.ID;
            //if (idGrupo >= 0 || idGrupo !== null || idGrupo !== undefined) {
            //    global.dispatchSuccessful("global-page-data", item, CATALOGO_GRUPO_SELECCIONADO);
            //    let items: any = getData(this.props.grupos);
            //    EK.Global.dispatchSuccessful("global-page-data", items, CATALOGO_GRUPOS_ID);
            //}
        };

        onSave(): void {
        };


        render(): JSX.Element {
            return <div >
                <page.SectionList
                    id={CATALOGO_GRUPOS_ID}
                    parent={config.id}
                    subTitle={(data: any): any => { return <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>; }}
                    icon={"fa fa-cog"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={true}
                    onItemClick={this.onClickItem.bind(this)}
                    height={"380px"}
                    drawOddLine={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    onSave={this.onSave.bind(this)}
                    listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[12, 12, 12, 12]} className="list-default-header">{"Nombre"}</Column>
                        </Row>
                    </div>}
                    formatter={(index: number, item: any) => {
                        let itemSeleccionado: string = this.props.grupoSeleccionado && getData(this.props.grupoSeleccionado).Clave ? getData(this.props.grupoSeleccionado).Clave : "TODOS";
                        let estatusSeleccion: boolean = itemSeleccionado == item.Clave ? true : false;
                        let estatusClass: string = "";

                        //if (estatusSeleccion == true) {
                        //    estatusClass += " selected";
                        //}
                        return <div className={estatusClass}>
                            <ColaboradoresGrupoSGP item={item} idFormSection={this.props.idFormSection} idForm={this.props.idForm} />
                        </div>;
                }}
                />
            </div>
        };
    });


    interface IColaboradoresGrupoSGP extends page.IProps {
        item?: any;
        idForm?: any;
        idFormSection?: any;
        grupos?: DataElement;
    };

    export const ColaboradoresGrupoSGP: any = global.connect(class extends React.Component<IColaboradoresGrupoSGP, {}>{
        constructor(props: IColaboradoresGrupoSGP) {
            super(props);
            this.selectUserInGroups = this.selectUserInGroups.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.grupos = state.global["catalogo$" + CATALOGO_GRUPOS_ID];
            return retValue;
        };

        shouldComponentUpdate(nextProps: IColaboradoresGrupoSGP, nextState: page.IProps): boolean {
            return hasChanged(this.props.item, nextProps.item) ||
                hasChanged(this.props.grupos, nextProps.grupos);
        };

        componentDidMount(): void {
        };

        selectUserInGroups(item: any) {
            let ItemsGrupos: any = getData(this.props.grupos);
            if (item != undefined && item != null) {
                if (ItemsGrupos && ItemsGrupos.length > 0) {
                        ItemsGrupos.forEach((valueGroups: any, indexGroups: number) => {
                            if (valueGroups.IntegrantesGrupo && valueGroups.IntegrantesGrupo.length > 0) {
                                valueGroups.IntegrantesGrupo.forEach((valueInte: any, indexInte: number) => {
                                    if (valueInte.Usuario.ID === item.Usuario.ID) {
                                        if (item.Selected) {
                                            valueInte["Selected"] = false;
                                        } else {
                                            valueInte["Selected"] = true;
                                        }
                                    }                                    
                                })
                            }
                        })
                }
            }
            return ItemsGrupos;
        };

        onItemClick(item: any): any {
            let state: any = EK.Store.getState();
            let arrayUsuarios: any[] = [];
            let Usuarios: any = getData(state.global[USUARIOS_SELECCIONADOS]);
            let grupos: any = getData(state.global[CATALOGO_GRUPOS_ID]);
            let temporal: any;
            if (Usuarios && Usuarios != undefined && Usuarios.length > 0) {
                temporal = Usuarios.filter(value => value.Usuario.ID === item.Usuario.ID);
                if (temporal && temporal.length > 0) {
                    Usuarios.forEach((value: any, index: number) => {
                        if (value.Usuario.ID === temporal[0].Usuario.ID && value.IsNew && value.IsNew === true) {
                            Usuarios.splice(index, 1);
                        } else if (!value.IsNew && !value._eliminado && value.Usuario.ID === temporal[0].Usuario.ID) {
                            value["_eliminado"] = true;
                        } else if (value._eliminado && value.Usuario.ID === temporal[0].Usuario.ID) {
                            value["_eliminado"] = false;
                        }
                    });
                } else {
                    item["IsNew"] = true;
                    arrayUsuarios.push(item);
                }
            } else {
                item["IsNew"] = true;
                arrayUsuarios.push(item);
            }
            arrayUsuarios = Usuarios.length > 0 ? arrayUsuarios.concat(Usuarios) : arrayUsuarios;
            let newUsuarios: any = global.createSuccessfulStoreObject(arrayUsuarios);

            //new grupos
            let ItemsGrupos: any = this.selectUserInGroups(item);
            let newGrupos: any = createSuccessfulStoreObject(ItemsGrupos);
            global.dispatchSuccessful("global-page-data", newGrupos, CATALOGO_GRUPOS_ID);
            global.dispatchSuccessful("load::" + USUARIOS_SELECCIONADOS, newUsuarios);
            Forms.updateFormElement(this.props.idFormSection, USUARIOS_SELECCIONADOS, newUsuarios);
        };

        onGetImagenes(item: any): any {
            let IntegrantesGrupo: any[] = item.IntegrantesGrupo;
            let retValue: any[] = [];
            let arrayElementos: any[] = [];
            let arrayImagenes: any[] = [];

            let iniciales: string;
            if (IntegrantesGrupo != null && IntegrantesGrupo != undefined && IntegrantesGrupo.length >= 0) {
                IntegrantesGrupo.forEach((value: any, index: number) => {
                    let retValue: any = global.assign({}, {
                        Usuario: {
                            ID: value.Usuario.ID,
                            Nombre: value.Usuario.Nombre,
                            Apellidos: value.Usuario.Apellidos,
                            Foto: value.Usuario.Foto
                        }, 
                        Grupo: {
                            ID: item.ID,
                            Clave: item.Clave,
                            Nombre: item.Nombre
                        },
                        Selected: value.Selected
                    });
                    arrayElementos.push(retValue);
                });
            }
            if (arrayElementos && arrayElementos.length >= 0) {
                arrayElementos.forEach((value: any, index: number) => {
                    let iniciales: string = "";
                    let classSelected: string = value.Selected ? " selected" : "";
                    iniciales = value.Usuario.Nombre.substr(0, 1) + value.Usuario.Apellidos.substr(0, 1);
                    retValue.push(<div key={"ImgItemFotoDet_" + index.toString()} onClick={this.onItemClick.bind(this, value)}>
                        {value.Usuario.Foto === "" ?
                            <div className={"img-circle " + classSelected} style={{ background: "#1e7145", color: "white", width: "30px", height: "30px", float: "left", marginTop: "10px", marginLeft: "10px", position: "relative", zIndex: (300 + index), display: "inline-flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}   >
                                <p title={value.Usuario.Nombre}>{iniciales}</p>
                            </div>
                            :
                            <img alt="" title={value.Usuario.Nombre} className={"img-circle " + classSelected} src={value.Usuario.Foto} style={{ background: "beige", width: "30px", height: "30px", float: "left", marginTop: "10px", marginLeft: "10px", position: "relative", zIndex: (300 + index), justifyContent: "center", alignItems: "center", textAlign: "center" }} />
                        }
                    </div>);
                })
            }
            return retValue;
        };

        render(): JSX.Element {
            return <Row style={{ padding: "0px 10px", overflow: "unset" }}>
                <Column size={[12, 12, 12, 12]} className="listItem-default-item ">
                    <span className="badge badge-success" style={{ marginRight: 5 }}>{this.props.item.Clave}</span>{this.props.item.Nombre}
                    <span className="badge badge-default" style={{ marginRight: 5, float: "right", backgroundColor: "#4cd964" }}>{this.props.item.CantidadUsuarios ? this.props.item.CantidadUsuarios : 0}</span>
                        <div style={{ overflow: "unset" }}>
                        {this.onGetImagenes(this.props.item)}
                        </div>
                    </Column>
            </Row>;
        }
    });


    //interface IPopoverAutorizacion extends React.Props<any> {
    //    superior?: any;
    //    responsable?: any;
    //    entidad?: any;
    //    dataManager?: StateDataManager;
    //    placement?: string;
    //}

    //export let PopoverAutorizacion: any = global.connect(class extends React.Component<IPopoverAutorizacion, {}> {
    //    constructor(props: IPopoverAutorizacion) {
    //        super(props);
    //        this.getSuperior = this.getSuperior.bind(this);
    //    }
    //    static props: any = (state: any) => ({
    //        dataManager: new StateDataManager(state.seguimientosReducer)
    //    });
    //    static defaultProps: IPopoverAutorizacion = {
    //        superior: createDefaultStoreObject({}),
    //        responsable: createDefaultStoreObject({}),
    //        entidad: "",
    //        placement: "right",
    //    };
    //    componentWillMount(): void {
    //        global.dispatchDefault("scv-seguimientos-responsable-superior", {}, this.props.entidad);
    //    }
    //    componentDidMount(): any {
    //        let responsable: any = getData(this.props.responsable);
    //        let idUsuario: number = responsable ? Number(responsable.IdUsuario) : 0;
    //        global.dispatchAsync("scv-seguimientos-responsable-superior", "posiciones/superior/" + idUsuario, this.props.entidad);
    //    }
    //    shouldComponentUpdate(nextProps: IPopoverAutorizacion, { }): boolean {
    //        return hasChanged(this.props.dataManager, nextProps.dataManager) ||
    //            hasChanged(this.props.responsable, nextProps.responsable);
    //    }
    //    getSuperior(): DataElement {
    //        let item: DataElement = this.props.dataManager.getById(this.props.entidad);
    //        if (item === null || item === undefined) {
    //            item = createDefaultStoreObject({});
    //        }
    //        return item;
    //    }
    //    render(): JSX.Element {
    //        let superior: DataElement = this.getSuperior();
    //        let superiorInfo: any = getData(superior);
    //        let responsable: any = getData(this.props.responsable);
    //        let content: JSX.Element = null;
    //            content = <div>
    //                <ViewSGPGruposUsuarios/>
    //            </div>

    //            return <EK.UX.HoverCard title={"Autorización Pendiente"} content={content}
    //            className={"badge badge-info pull-right btn-editing ek-sombra"}
    //            placement={this.props.placement}>
    //            <p style={{ fontSize: "11px", margin: "0px" }}> Por Autorizar </p>
    //            </EK.UX.HoverCard>
    //    }
    //});

    //interface IPopoverColaboradores extends React.Props<any> {
    //    entidad?: any;
    //    placement?: string;
    //    dataManager?: StateDataManager;
    //}

    //export let PopoverColaboradores: any = global.connect(class extends React.Component<IPopoverColaboradores, {}> {
    //    constructor(props: IPopoverColaboradores) {
    //        super(props);
    //    }
    //    static props: any = (state: any) => ({
    //        dataManager: new StateDataManager(state.seguimientosReducer)
    //    });
    //    static defaultProps: IPopoverColaboradores = {
    //        entidad: "",
    //        placement: "left",
    //    };
    //    componentWillMount(): void {
    //        global.dispatchDefault("ColaboradoresSGP", {}, this.props.entidad);
    //    }
    //    componentDidMount(): any {
    //        //let responsable: any = getData(this.props.responsable);
    //        //let idUsuario: number = responsable ? Number(responsable.IdUsuario) : 0;
    //        //global.dispatchAsync("scv-seguimientos-responsable-superior", "posiciones/superior/" + idUsuario, this.props.entidad);
    //    }
    //    shouldComponentUpdate(nextProps: IPopoverColaboradores, { }): boolean {
    //        return hasChanged(this.props.dataManager, nextProps.dataManager);
    //    }
    //    //getSuperior(): DataElement {
    //    //    let item: DataElement = this.props.dataManager.getById(this.props.entidad);
    //    //    if (item === null || item === undefined) {
    //    //        item = createDefaultStoreObject({});
    //    //    }
    //    //    return item;
    //    //}
    //    render(): JSX.Element {
    //        //let superior: DataElement = this.getSuperior();
    //        //let superiorInfo: any = getData(superior);
    //        //let responsable: any = getData(this.props.responsable);
    //        let content: JSX.Element = null;
    //        content = <p style={{ fontSize: "11px", margin: "0px" }}> Por Autorizar </p>;

    //        return <EK.UX.HoverCard title={"Colaboradores"} content={content}
    //            className={"badge badge-info pull-right btn-editing ek-sombra"}
    //            placement={this.props.placement}>
    //            <p style={{ fontSize: "11px", margin: "0px" }}> Por Autorizar </p>
    //        </EK.UX.HoverCard>
    //    }
    //});

}