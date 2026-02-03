namespace EK.Modules.Kontrol.Pages.TiposClasificador {
    "use strict";
    let CLASIFICADORES: string = "Clasificadores"
    let Tags: string = "Tags"
    let PAGE_ID: string = "Tipos Clasificador"
    const config: page.IPageConfig = global.createPageConfig("tiposClasificador", "kontrol", [CLASIFICADORES, Tags]);

    const Encabezado_Clasificadores: JSX.Element =
        <div style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 4, 4, 4]} className="list-default-header">{"Clave"}</Column>
                <Column size={[12, 6, 6, 6]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[12, 2, 2, 2]} className="list-center-header">&nbsp;</Column>
            </Row>
        </div>;

    const Encabezado_Tags: JSX.Element =
        <div style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 10, 10, 10]} className="list-default-header">{"Clave"}</Column>
                <Column size={[12, 2, 2, 2]} className="list-center-header">&nbsp;</Column>
            </Row>
        </div>;

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addString("Descripcion")
                .addObject("CatalogosClasificadores")
                .addNumber("IdCatalogosClasificadores")
                .addObject("TipoClasificador")
                .addObject(CLASIFICADORES)
                .addObject(Tags)
                .addVersion()
                .toObject();
            return model;
        };

        onEntityLoaded(props: page.IProps): any {
            let idTipoClasificador = getDataID(props.entidad);
            if (idTipoClasificador === -1) {
                global.dispatchSuccessful("global-page-data", [], CLASIFICADORES);
                global.dispatchSuccessful("global-page-data", [], Tags);
            }
            else {
                let parametros: any = global.assign({ IdTipoClasificador: idTipoClasificador });
                props.config.dispatchCatalogoBase("base/kontrol/clasificadores/Get/GetAll/", parametros, CLASIFICADORES);
                props.config.dispatchCatalogoBase("base/kontrol/clasificadores/Get/GetAll/", parametros, Tags);
            };                    
        };
        onEntitySaved(props: page.IProps): any {
            let filters: any = Forms.getValues(config.id + "$filters");
            var pathRoute = global.getFullUrl("/base/kontrol/tiposClasificador/Get/GetAllTiposClasificador/", "");
            config.dispatchCatalogoBase(pathRoute, filters);
        }
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}
                onEntitySaved={this.onEntitySaved}
                onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    interface ITipoClasificador extends page.IProps {
        TipoClasificador?: any;
        tipo?: any;
    };


    export const Edit: any = global.connect(class extends React.Component<ITipoClasificador, ITipoClasificador> {
        constructor(props: ITipoClasificador) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        componentDidMount(): void {
            this.props.config.setState({ viewMode: true }, CLASIFICADORES);
            this.props.config.setState({ viewMode: true }, Tags);           
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let hideNewButton: boolean = entidad.ID == -1 ? false : entidad.IdCatalogosClasificadores ? false : true;
            let labelClasificador: string = entidad.IdCatalogosClasificadores == null ? "Cátalogo" : "Personalizado";

            let displayClasificador: boolean = false;
            let tipoClasificador: any = Forms.getValue("TipoClasificador", config.id);
            let sistema: any = Forms.getValue("Sistema", config.id);
            if (tipoClasificador) {
                if (tipoClasificador.Clave === "CLA") {
                    displayClasificador = true;
                }
                else if (tipoClasificador.Clave === "TAG") {
                    displayClasificador = false;
                }
            }            
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 25 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={PAGE_ID}
                        icon="fas fa-stream" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            {sistema != true ?
                                <input.Clave size={[12, 12, 2, 2]} /> :
                                <Label id="Clave" value={entidad.Clave} size={[12, 12, 2, 2]} />
                            }                            
                            <input.Nombre size={[12, 4, 4, 4]} />
                            <Label id="CatalogosClasificadores" value={labelClasificador} size={[12, 4, 2, 2]} />
                            <TiposDDL id={"TipoClasificador"} addNewItem={"SO"} validations={[validations.required()]}  size={[12, 4, 2, 2]}  />
                            <input.Hidden id="IdCatalogosClasificadores" />
                            <checkBox.Status size={[6, 6, 2, 2]} />
                            <Input id={"Descripcion"} size={[12, 12, 12, 12]} />
                        </Row>
                        <Row>
                            {displayClasificador === true ?

                                <page.SectionList
                                    id={CLASIFICADORES}
                                    icon="fa fa-cog"
                                    parent={config.id}
                                    style={{ paddingTop: 20 }}
                                    hideNewButton={false}
                                    level={1}
                                    size={[12, 12, 12, 12]}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    listHeader={Encabezado_Clasificadores}
                                    mapFormToEntity={(form: EditForm): any => {
                                        return form
                                            .addID()
                                            .addClave()
                                            .addNombre()
                                            .addEstatus()
                                            .addVersion()
                                            .toObject();
                                    }}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column>
                                                <Row>
                                                    <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                                        {item.Clave}
                                                    </Column>

                                                    <Column size={[12, 6, 6, 6]} className="listItem-default-item">
                                                        {item.Nombre}
                                                    </Column>

                                                    {hideNewButton == true ?
                                                        <buttons.PopOver idParent={config.id} idForm={CLASIFICADORES} info={item}
                                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                                        : null}

                                                </Row>
                                            </Column>
                                        </Row>
                                    }}>
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} >
                                            <input.Clave size={[12, 12, 4, 4]} idFormSection={CLASIFICADORES} />
                                            <input.Nombre size={[12, 12, 8, 8]} idFormSection={CLASIFICADORES} />
                                        </Column>

                                    </Row>
                                </page.SectionList>
                                :
                                < page.SectionList
                                    id={Tags}
                                    title={"Tags"}
                                    icon="fa fa-tags"
                                    parent={config.id}
                                    style={{ paddingTop: 20 }}
                                    hideNewButton={false}
                                    level={1}
                                    size={[12, 12, 12, 12]}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    listHeader={Encabezado_Tags}
                                    mapFormToEntity={(form: EditForm): any => {
                                        return form
                                            .addID()
                                            .addClave()
                                            .addEstatus()
                                            .addVersion()
                                            .toObject();
                                    }}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column>
                                                <Row>
                                                    <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                                        {item.Clave}
                                                    </Column>
                                                    {hideNewButton == true ?
                                                        <buttons.PopOver idParent={config.id} idForm={Tags} info={item}
                                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                                        : null}

                                                </Row>
                                            </Column>
                                        </Row>;
                                    }}>
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} >
                                            <input.Clave size={[12, 12, 4, 4]} idFormSection={Tags} />
                                        </Column>

                                    </Row>
                                </page.SectionList>
                            }
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });
    const View: any = global.connect(class extends React.Component<ITipoClasificador, ITipoClasificador> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let tipoClasificador: string = entidad.IdCatalogosClasificadores == null ? "Cátalogo" : "Personalizado";
            let displayClasificador: boolean = false;

            if (global.isSuccessful(this.props.entidad)) {
                let TipoClasificador: any = global.getData(this.props.entidad).TipoClasificador;
                if (tipoClasificador ) {
                    if (entidad.TipoClasificador === undefined || entidad.TipoClasificador.Clave === "CLA") {
                        displayClasificador = true;
                    }
                    else if (entidad.TipoClasificador.Clave === "TAG") {
                        displayClasificador = false;
                    }
                }
            }

            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 25 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={PAGE_ID}
                        icon="fas fa-stream" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 4, 4, 4]} />
                            <Label id="CatalogosClasificadores" value={tipoClasificador} size={[12, 4, 2, 2]} />
                            <label.Entidad id={"TipoClasificador"} size={[12, 4, 2, 2]} />
                            <label.Estatus id="Estatus" size={[6, 6, 2, 2]} />
                            <Label id={"Descripcion"} size={[12, 12, 12, 12]} />
                        </Row>
                        <Row>
                                {displayClasificador === true ?
                                <page.SectionList
                                    id={CLASIFICADORES}
                                    icon="fa fa-cog"
                                    parent={config.id}
                                    style={{ paddingTop: 20 }}
                                    level={1}
                                    size={[12, 12, 12, 12]}
                                    listHeader={Encabezado_Clasificadores}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column>
                                                <Row>
                                                    <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                                        {item.Clave}
                                                    </Column>

                                                    <Column size={[12, 6, 6, 6]} className="listItem-default-item">
                                                        {item.Nombre}
                                                    </Column>

                                                </Row>
                                            </Column>
                                        </Row>;
                                    }}>
                                </page.SectionList>
                                :
                                <page.SectionList
                                    id={Tags}
                                    title={"TAGS"}
                                    icon="fa fa-cog"
                                    parent={config.id}
                                    style={{ paddingTop: 20 }}
                                    level={1}
                                    size={[12, 12, 12, 12]}
                                    listHeader={Encabezado_Tags}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column>
                                                <Row>
                                                    <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                                        {item.Clave}
                                                    </Column>

                                                  
                                                </Row>
                                            </Column>
                                        </Row>;
                                    }}>
                                </page.SectionList>
                            }
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });
};
//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const idForm: string = "tipoClasificador";
//    const idFormClasificadores: string = "FrmClasificadoresxTipo";
//    const PAGE_ID: string = "tiposClasificador";
//    const SECTION_CLASIFICADORES_ID: string = "ENK025$CL";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    const formClasificadores: () => EditForm = (): EditForm => {
//        return new EditForm(idFormClasificadores);
//    };

//    interface IParams {
//        id: number;
//    }

//    interface ITipoClasificadorProps extends React.Props<any> {
//        cargarDatos?: (id: number, clave: string) => void;
//        tipoClasificador: any;
//        params?: IParams;
//        history?: any[];
//        global?: any;
//        guardar?: (item: any) => void;
//        isNew?: boolean; 
//        clasificadores?: any;
//        clasificadoresxTipo?: any;               
//        inicializarClasificadores?: (claveTipo: string) => void;        
//        actualizarClasificadoresTemporales?: (items: any[]) => void;
//        guardarClasificadores?: (items: any[]) => void;
//        actualizarClasificadoresFinal?: (items: any[]) => void;                
//        inicializaForma?: (idForm: string) => void;
//    }

//    interface ITipoClasificadorState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarTipoClasificador extends React.Component<ITipoClasificadorProps, ITipoClasificadorState> {
//        constructor(props: ITipoClasificadorProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
           
//            this.state = { viewMode: true };
//        }

//        static defaultProps: ITipoClasificadorProps = {
//            isNew: false,
//            tipoClasificador: undefined,
//            global: {}
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();
//            let clasificadores: any[] = this.props.clasificadoresxTipo;
            
//            let tipoClasificador: any = item
//                .addNumberConst("ID", this.props.tipoClasificador.data.ID == undefined ? 0 : this.props.tipoClasificador.data.ID)
//                .addString("Nombre")
//                .addString("Clave")
//                .addString("Descripcion")
//                .addNumberConst("IdCatalogosClasificadores", this.props.tipoClasificador.data.IdCatalogosClasificadores == undefined ? 0 : this.props.tipoClasificador.data.IdCatalogosClasificadores)
//                .addEstatus("Estatus")
//                .addObjectConst("Clasificadores", clasificadores)
//                .toObject();

//            this.props.guardar(tipoClasificador);
//            this.setState({ viewMode: false });
//        }

//        editForm(): void {
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//            let $bc: any = $ml.bc;
//            if (!this.props.isNew && !this.state.viewMode) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.push($bc.kontrol.tiposClasificadores);
//            }
//        }       

//        shouldComponentUpdate(nextProps: ITipoClasificadorProps, nextState: ITipoClasificadorState): boolean {
//            return (this.props.tipoClasificador.timestamp !== nextProps.tipoClasificador.timestamp)
//                || (this.props.clasificadores.timestamp !== nextProps.clasificadores.timestamp)
//                || (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {     
//            requireGlobal(Catalogos.estatus);     
//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id), this.props.tipoClasificador.data.Clave);
//                } else {
//                    dispatchFailed("clasificadores-tipo", null);
//                }
//            } else {
//                dispatchSuccessful("clasificadores-tipo", createSuccessfulStoreObject({}));
//            }
//        };

//        componentDidUpdate(prevProps: ITipoClasificadorProps, prevState: ITipoClasificadorState): any {
//            let $page: any = $ml[PAGE_ID];
//            if (prevProps.tipoClasificador.status === AsyncActionTypeEnum.updating) {
//                if (this.props.tipoClasificador.status === AsyncActionTypeEnum.successful) {
//                    success($page.mensajes.update);
//                }
//            }
//        }

//        render(): JSX.Element {
//            let tipoF: any = this.props.tipoClasificador.data;
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.tiposClasificadores,
//            (this.props.isNew ? { text: $page.editar.title, href: $page.editar.href } :
//                { text: tipoF.Clave, href: "" })];

//            let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let title: IPageTitle = {
//                title: !this.props.isNew ? tipoF.Nombre : $page.editar.title,
//                subTitle: !this.props.isNew ? tipoF.Clave : $page.editar.subtitle,
//                children: [EK.UX.Labels.badgeEstatus(this.props.tipoClasificador.data.Estatus)]
//            };

//            //let status: AsyncActionTypeEnum =
//            //    (!this.props.tipoClasificador || !this.props.tipoClasificador.status) ? AsyncActionTypeEnum.default : this.props.tipoClasificador.status;

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                            <PanelUpdate info={this.props.tipoClasificador}>
//                                {!this.props.isNew && this.state.viewMode
//                                    ? <View
//                                        data={tipoF}
//                                        clasificadores={this.props.clasificadores} />
//                                    : <Edit
//                                        isNew={this.props.isNew}
//                                        data={tipoF}                                       
//                                        clasificadores={this.props.clasificadores}
//                                        clasificadoresxTipo={this.props.clasificadoresxTipo}
//                                        global={this.props.global}
//                                        actualizarClasificadoresTemporales={this.props.actualizarClasificadoresTemporales}
//                                        actualizarClasificadoresFinal={this.props.actualizarClasificadoresFinal}
//                                        tipoClasificador={this.props.tipoClasificador}
//                                        />}
//                            </PanelUpdate>                        
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            tipoClasificador: state.clasificadores.tipoClasificador,
//            history: state.clasificadores.tiposClasificadorHistory,  
//            clasificadores: state.clasificadores.clasificadoresTemporales,
//            items: state.clasificadores.clasificadoresTemporales,
//            clasificadoresxTipo: state.clasificadores.clasificadores,            
//            global: state.global                      
//        };
//    };
//    const titleActionMapProps: any = (state: any): any => {
//        return {
//            title: state.clasificadores && state.clasificadores.tipoClasificador && state.clasificadores.tipoClasificador.data
//                ? state.clasificadores.tipoClasificador.data.Descripcion : null
//        };
//    };

//    const infoItemMapProps: any = (state: any): any =>
//    {
//        return { data: state.clasificadores.tipoClasificador };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        let $page: any = $ml[PAGE_ID];
//        return {
//            cargarDatos: (id: number, clave: string): void => {
//                dispatchAsync("clasificadores-clasificadores", "tiposclasificadores/catalogo(" + clave + ",1)");
//                dispatchAsync("clasificadores-temporales", "tiposclasificadores/catalogo(" + clave + ",1)");                
//                dispatchAsync("tiposClasificador-history", "tiposClasificadores/historyTypes(" + id + ")");
             
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "clasificadores-tipo-save",
//                    type: HttpMethod.POST,
//                    url: "tiposclasificadores/Save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//                success($page.mensajes.save, $page.mensajes.savetitle);

//            },
//            actualizarClasificadoresTemporales: (items: any[]): void => {
//                dispatchSuccessful("clasificadores-temporales", createSuccessfulStoreObject(items));
//            },
//            actualizarClasificadoresFinal: (items: any[]): void => {
//                dispatchSuccessful("clasificadores-clasificadores", createSuccessfulStoreObject(items));
//            },
//            guardarClasificadores: (items: any[]): void => {
//                dispatch(actionAsync({
//                    action: "clasificadores-temporales",
//                    type: HttpMethod.POST,
//                    url: "clasificadores/guardarCatGeneral",
//                    data: items,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));               
//            },
//            inicializaForma: (idForm: string): void => { dispatch(EK.Global.action("forms-reset-state", { idForm })); }
//        };
//    };

//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);

//    export let PageTipoClasificadorCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarTipoClasificador);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevoTipoClasificador extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PageTipoClasificadorCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        data: any;
//        isNew?: boolean;       
//        clasificadores?: any;
//        tipoClasificador: any;
//        clasificadoresxTipo?: any;  
//        global?: any;     
//        actualizarClasificadoresTemporales?: (items: any[]) => void;        
//        actualizarClasificadoresFinal?: (items: any[]) => void;        
//    };

//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);

//            this.onClickAddClasificador = this.onClickAddClasificador.bind(this);
//            this.onClickRemoveClasificador = this.onClickRemoveClasificador.bind(this);

//            //this.onSaveFormClick = this.onSaveFormClick.bind(this);
//        };

//        refs: {
//            form: any;
//        };

//        //onSaveFormClick(): void {
//        //    let item: EditForm = form();            
//        //    let clasificadores: any[] = this.props.clasificadoresxTipo;

//        //    let tipoClasificador: any = item
//        //        .addNumberConst("ID", this.props.data.ID == undefined ? 0 : this.props.data.ID)
//        //        .addString("Nombre")
//        //        .addString("Clave")
//        //        .addString("Descripcion")
//        //        .addNumberConst("IdCatalogosClasificadores", this.props.data.IdCatalogosClasificadores == undefined ? 0 : this.props.data.IdCatalogosClasificadores)
//        //        .addEstatus("Estatus")
//        //        .addObjectConst("Clasificadores", clasificadores)
//        //        .toObject();
//        //    this.props.onSaveForm(tipoClasificador);

//        //};

//        onClickAddClasificador(): void {
//            let $page: any = $ml[PAGE_ID];
//            let item: EditForm = formClasificadores();
//            let clasificadoresActuales: any[] = this.props.clasificadores.data;
//            let clasificadoresActualesxTipo: any[] = this.props.clasificadoresxTipo.data;
//            let encontrado: boolean = false;
//            let Estatus: any[] = this.props.global.ESTATUS.data;
//            let IdStatus: number = 0;
//            for (let e of Estatus) {
//                if (e.Clave === "A") {
//                    IdStatus = e.ID;
//                }
//            }

//            for (let C of clasificadoresActuales) {
//                if (C.Clave === item.formData.form.ClaveClasif.value && C.IdEstatus === IdStatus) {
//                    encontrado = true;
//                    break;
//                }
//            }

//            if (encontrado === true) {
//                warning($page.mensajes.warningDuplicado, $page.mensajes.warningDuplicadoTitle);
//                return;
//            }

//            let newClasificador: any = {
//                "Clave": item.formData.form.ClaveClasif.value,
//                "Creado": new Date(),
//                "CreadoPor": this.props.data.CreadoPor,
//                "ID": 0,
//                "IdEstatus": IdStatus,
//                "Modificado": new Date(),
//                "ModificadoPor": this.props.data.CreadoPor,
//                "Nombre": item.formData.form.NombreClasif.value,
//                "RV": new Date(),
//                "Tipo": this.props.tipoClasificador
//            };

//            for (let c of clasificadoresActualesxTipo) {
//                c.Tipo = this.props.tipoClasificador.data;
//            }

//            clasificadoresActuales.push(newClasificador);
//            clasificadoresActualesxTipo.push(newClasificador);

//            this.props.actualizarClasificadoresTemporales(clasificadoresActuales);
//            this.props.actualizarClasificadoresFinal(clasificadoresActualesxTipo);
//        }

//        onClickRemoveClasificador(item: any): any {
//            let clasificadoresActuales: any[] = this.props.clasificadores.data;
//            let clasificadoresActualesxTipo: any[] = this.props.clasificadoresxTipo.data;
//            var index = clasificadoresActuales.indexOf(item);
//            let idClasif: number = 0;
//            if (index > -1) {
//                idClasif = clasificadoresActuales[index].ID;
//                clasificadoresActuales.splice(index, 1);
//            }

//            this.props.actualizarClasificadoresTemporales(clasificadoresActuales);

//            if (idClasif !== undefined || idClasif !== null) {
//                let Estatus: any[] = this.props.global.ESTATUS.data;
//                let IdStatus: number = 0;
//                for (let e of Estatus) {
//                    if (e.Clave === "B") {
//                        IdStatus = e.ID;
//                    }
//                }

//                for (let c of clasificadoresActualesxTipo) {
//                    c.Tipo = this.props.tipoClasificador.data;
//                    if (c.ID === idClasif) {
//                        c.IdEstatus = IdStatus;
//                    }
//                }
//                this.props.actualizarClasificadoresFinal(clasificadoresActualesxTipo);
//            }
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.data;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
           
//            let clasificadores: any = this.props.clasificadores;           
//            let mensajeActualizacion: string =
//                clasificadores.status === AsyncActionTypeEnum.updating ?
//                    $page.mensajes.updating : $page.mensajes.getdata;
//            return <FadeInColumn>                               
//                    <Input id="ID" value={current.ID} label="" visible={false} />
//                    <Input id="IdCatalogo" value={current.IdCatalogosClasificadores} label="" visible={false} />
//                    <Input
//                        id="Clave"
//                        label={$page.form.clave.label}
//                        size={[12, 6, 6, 2]}
//                        helpLabel={$page.form.clave.helpLabel}
//                        value={current.Clave}
//                        maxLength={25}
//                        validations={[
//                            validations.required($page.form.clave.validations)
//                        ]}
//                        /> 
//                    <Input
//                        id="Nombre"
//                        label={$page.form.nombre.label}
//                        size={[12, 12,9, 9]}
//                        helpLabel={$page.form.nombre.helpLabel}
//                        value={current.Nombre}
//                        maxLength={150}
//                        validations={[
//                            validations.required($page.form.nombre.helpLabel)
//                        ]}
//                        style={{ marginTop: 20 }} />                                     
//                    <CheckBoxStatus
//                        id="Estatus"
//                        label={$page.form.estatus.label}
//                        xs={{ size: 12 }}
//                        sm={{ size: 12 }}
//                        md={{ size: 6 }}
//                        lg={{ size: 2 }}
//                        helpLabel={$page.form.estatus.helpLabel}
//                        value={Status}
//                        style={{ marginTop: 20 }} />
//                    <Input
//                        id="Descripcion"
//                        label={$page.form.descripcion.label}
//                        size={[12, 12, 10, 10]}
//                        helpLabel={$page.form.descripcion.helpLabel}
//                        value={current.Clave}
//                        maxLength={4000}
//                        />                                                                                                                          
//                {this.props.isNew ? null :
//                    <OptionSection title={$page.formClasificadores.title} readOnly={true}>
//                        <Row className="well well-sm" style={{ marginLeft: 0, marginRight: 0, paddingBottom: 0 }}>                            
//                                <Input id="ClaveClasif" label={$page.formClasificadores.clave.label} size={[12, 6, 3, 3]} helpLabel={$page.formClasificadores.clave.helpLabel}
//                                value={""} maxLength={25} validations={[validations.required($page.formClasificadores.clave.validations)]} />
//                                <Input id="NombreClasif" label={$page.formClasificadores.clave.label} size={[12, 12, 6, 6]} helpLabel={$page.formClasificadores.nombre.helpLabel}
//                                    value={""} maxLength={150} validations={[validations.required($page.formClasificadores.nombre.validations)]} />
//                            <Column size={[12, 1, 1, 1]} style={{ padding: "6px 6px" }}>
//                                <Button icon={"fa fa-plus"} style={{ fontSize: 14 }} color={ColorEnum.greenSharp} onClick={this.onClickAddClasificador} />
//                            </Column>                        
//                    </Row>
//                    <Row>
//                        <UpdateColumn info={clasificadores} text={mensajeActualizacion}>
//                            <Column size={[12, 12, 12, 12]}>
//                                    <ListClasificadores 
//                                        childrenPropertyName={$page.formClasificadores.title}
//                                    readonly={false}
//                                    addRemoveButton={false}
//                                    formatter={(index: number, item: any) => {
//                                        let hasChilds: boolean = item.Clasificadores && item.Clasificadores.length > 0;
//                                        let icono: string = hasChilds ? "fa fa-list-alt" : "icon-ek-059";
//                                        let removeElement: JSX.Element = <Button onClick={this.onClickRemoveClasificador} info={item} inverse={true} icon="glyphicon glyphicon-trash" color="red-mint" style={{ float: "right", marginTop: "-2px", padding: "1px 0px", width: 24 }}></Button>;
//                                        return <div>
//                                            <i className={icono} style={{ height: 25, border: "1px dashed #999", padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
//                                            <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Nombre}</div>
//                                            {removeElement}
//                                        </div>
//                                    } }
//                                    />
//                            </Column>
//                        </UpdateColumn>
//                    </Row>
//                </OptionSection>
//                }
//            </FadeInColumn>;
//        };
        
//}
//    const mapPropsListClasificadores: any = (state: any): any => {
//            return {               
//                items: state.clasificadores.clasificadoresTemporales,
//            };
//        };
//    let ListClasificadores: any = ReactRedux.connect(mapPropsListClasificadores, null)(List);
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IViewProps extends React.Props<any> {
//        data: any;        
//        onEditForm?: () => any;
//        clasificadores?: any;
//    };

//    class View extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }   

//        render(): JSX.Element {
//            let current: any = this.props.data;
//            let Status: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let $page: any = $ml[PAGE_ID];
//            return <FadeInColumn>              
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.nombre.label} value={current.Nombre} size={[12, 12, 12, 12]} />
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 12, 12, 6]} />
//                    <Label label={$page.form.descripcion.label} value={current.Descripcion} size={[12, 12, 12, 6]} />
//                </Row>
//                <OptionSection title={$page.form.title} readOnly={true}>
//                    <Row>
//                        <UpdateColumn info={this.props.clasificadores} text={$page.form.textUpdate}>
//                        <List items={this.props.clasificadores} addRemoveButton={false} readonly={true}
//                            formatter={(index: number, item: any) => {                                
//                                let icono: string = "icon-ek-059";                                
//                                return <div>
//                                    <i className={icono} style={{ height: 25, border: "1px dashed #999", padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
//                                    <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Nombre}</div>                                    
//                                </div>
//                            } }>
//                        </List>
//                        </UpdateColumn>
//                    </Row>
//                </OptionSection>
//            </FadeInColumn >;
//        };
//    }
//    /*** END: VIEW FORM ***/


   
//}




