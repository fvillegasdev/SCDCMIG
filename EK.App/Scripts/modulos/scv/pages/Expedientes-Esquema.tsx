//namespace EK.Modules.SCV.Pages.ExpedientesEsquemas {
//    "use strict";
//    const EXPEDIENTE_ID: string = "Expediente";
//    const EXPEDIENTE_RELACIONADOS_ID: string = "Relacionados";
//    const EXPEDIENTE_CONFIGURACIONES_ID: string = "Expediente$Configuraciones";

//    const config: page.IPageConfig = global.createPageConfig("expedientes", "scv",
//        [EXPEDIENTE_ID, EXPEDIENTE_RELACIONADOS_ID, EXPEDIENTE_CONFIGURACIONES_ID]);

//    const FASE_ICON: any = {
//        "FASE-PROS": "fa fa-user",
//        "FASE-VENT": "fa fa-tag",
//        "FASE-POST": "fa fa-cog"
//    };

//    export let Edicion: any = global.connect(class extends page.Base {
//        static props: any = (state: any) => ({
//            entidad: state.global.currentEntity,
//            config: global.createPageConfigFromState(state.global)
//        });
//        getFaseConfig(): any[] {
//            let state: DataElement = this.props.config.getState();
//            let seguimientos: any[] = global.getData(state).seguimientos;
//            let isValid: boolean = true;
//            let items: any[] = [];

//            seguimientos.forEach((value) => {
//                let form: EditForm = Forms.getForm(value.idForm);

//                if (!Forms.isValid(value.idForm)) {
//                    isValid = false;
//                }

//                let item: any = form
//                    .addDate("FechaEstimada")
//                    .addObject("Esquema")
//                    .addObject("Posicion")
//                    .addObject("Autorizados", value.idFormChild)
//                    .toObject();

//                let itemTemp: any = EK.Global.assign({}, value.item);

//                for (var p in item) {
//                    itemTemp[p] = item[p];
//                };

//                let fechaEstimada: any = itemTemp["FechaEstimada"];
//                if (fechaEstimada === null || $.trim(fechaEstimada).length === 0) {
//                    isValid = false;
//                };

//                let esquema: any = itemTemp["Esquema"];
//                if (esquema === null || esquema === undefined) {
//                    isValid = false;
//                };

//                items.push(itemTemp);
//            });

//            if (isValid === true) {
//                return items;
//            } else {
//                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//                return null;
//            }
//        };
//        saveForm(props: page.IProps, item: EditForm): any {
//            let seguimientos: any[] = this.getFaseConfig();
//            if (seguimientos === null || seguimientos === undefined || seguimientos.length === 0) {
//                return;
//            }

//            let model: any = item
//                .addID()
//                .addClave()
//                .addObject("Cliente")
//                .addObject("Desarrollo")
//                .addObject("TipoComercializacion")
//                .addObject(EXPEDIENTE_RELACIONADOS_ID)
//                .addObjectConst("Seguimientos", seguimientos)
//                //.addObjectConst("Seguimiento", seguimiento)
//                .addEstatus()
//                .addVersion()
//                .toObject();

//            return model;
//        };
//        onEntityLoaded(props: page.IProps): void {
//            let idExpediente: number = global.getData(props.entidad).ID;
//            let idCliente: number = global.getData(props.entidad).IdCliente;
//            let idDesarrollo: number = global.getData(props.entidad).IdDesarrollo;
//            let entidad: any = global.getData(props.entidad);

//            if (idExpediente === undefined || idExpediente === -1) {
//                //{limpiar informacion del expediente}
//                global.dispatchSuccessful("global-page-data", [], EXPEDIENTE_RELACIONADOS_ID);
//                props.config.dispatchCatalogoBase("base/scv/Expedientes/GetBP/GetConfiguracionAll/", { idExpediente: -1 }, EXPEDIENTE_CONFIGURACIONES_ID);

//                //{consultar cliente y actualizarlo en la pantalla}
//                let parametros: any = global.encodeParameters({ id: idCliente });
//                global.asyncGet("base/kontrol/ScvClientes/Get/GetByClienteId/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
//                    if (status === AsyncActionTypeEnum.successful) {
//                        Forms.updateFormElement(config.id, "Cliente", data);
//                    }
//                });

//                //{establecer desarrollo parametro desde prospectos clientes}
//                if (idDesarrollo > 0) {
//                    global.asyncPost("base/scv/desarrollos/id", { id: idDesarrollo }, (status: AsyncActionTypeEnum, data: any) => {
//                        if (status === AsyncActionTypeEnum.successful) {
//                            Forms.updateFormElement(config.id, "Desarrollo", data);
//                        }
//                    });
//                }

//                //{actualizar estatus de expediente como no asignado}
//                Forms.updateFormElement(config.id, "EstatusExpediente", { Clave: "X", Nombre: "SIN ASIGNAR" });
//                Forms.updateFormElement(config.id, "Seguimientos");
//            } else {
//                props.config.dispatchCatalogoBase("SCV/Expedientes/Configuracion/Relacionados/", { idExpediente }, EXPEDIENTE_RELACIONADOS_ID);
//                props.config.dispatchCatalogoBase("base/scv/Expedientes/GetBP/GetConfiguracionAll/", { idExpediente }, EXPEDIENTE_CONFIGURACIONES_ID);
//            }

//            // requireMe()
//            global.dispatchAsyncPost("load::usuario$me", "usuario/me", null);
//        };
//        render(): JSX.Element {
//            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm.bind(this)} onEntityLoaded={this.onEntityLoaded.bind(this)} allowNew={false}>
//                <View />
//                <Edit />
//            </page.Main>
//        };
//    });

//    const BadgePosicionItem: (item: any) => void = (item: any): JSX.Element => {
//        let posicionAsignada: boolean = item.Posicion.Usuario.ID ? true : false;
//        let usuarioAsignado: any = <span className="badge badge-danger bold btn-editing">POSICION NO ASIGNADA</span>
//        if (posicionAsignada) {
//            usuarioAsignado = <span className="badge badge-info bold">{item.Posicion.Usuario ? [item.Posicion.Usuario.Nombre, item.Posicion.Usuario.Apellidos].join(" ") : null}</span>;
//        }
//        return <div>{item.Posicion.Nombre}&nbsp;{usuarioAsignado}</div>
//    };

//    interface IEditConfiguracion extends page.IProps {
//        desarrollo?: any;
//    };

//    //class Edit$ extends page.Base {
//    let Edit: any = global.connect(class extends React.Component<IEditConfiguracion, IEditConfiguracion> {
//        constructor(props: IEditConfiguracion) {
//            super(props);
//        }
//        static props: any = (state: any) => ({
//            entidad: state.global.currentEntity,
//            desarrollo: Forms.getValue("Desarrollo", config.id, state)
//        });
//        componentWillReceiveProps(nextProps: IEditConfiguracion, nextState: IEditConfiguracion): any {
//            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo)) {

//                if (nextProps.desarrollo && nextProps.desarrollo.ID > 0) {
//                    //Forms.updateFormElement(config.id, "TipoComercializacion", { ID: -1, Nombre: "Seleccione un Tipo de Comercialización" })
//                    //dispatchAsync("load::TIPOCOMERCIALIZACION", "base/scv/desarrollos/Get/GetDesarrolloTiposComercializacion/"
//                    //    + global.encodeParameters({ IdDesarrollo: nextProps.desarrollo.ID, TipoOperacion: 'Lista' }));
//                    //let url: string = global.encodeAllURL("scv", "TipoComercializacion", { activo: 1 });
//                    //dispatchAsync("load::TIPOCOMERCIALIZACION", url);
//                }
//            };
//        };
//        render(): JSX.Element {
//            let entidad: any = global.getData(this.props.entidad);
//            let cliente: any = global.assign({}, entidad.Cliente);
//            let isExpedienteNuevo: boolean = global.getDataID(this.props.entidad) <= 0;
//            let nombre: string = "";

//            if (global.isSuccessful(this.props.entidad)) {
//                nombre = '(' + cliente.Clave + ') ' + cliente.Nombre + ' ' + cliente.ApellidoPaterno + ' ' + cliente.ApellidoMaterno;
//            };

//            const listHeaderOwners: JSX.Element =
//                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
//                    <Row>
//                        <Column size={[11, 11, 11, 11]} className="list-default-header">{"Posición"}</Column>
//                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
//                    </Row>
//                </Column>

//            const listHeaderColaboradores: JSX.Element =
//                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
//                    <Row>
//                        <Column size={[11, 11, 11, 11]} className="list-default-header">{"Posición"}</Column>
//                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
//                    </Row>
//                </Column>
//            let nuevoItemTipoC: any = {};
//            nuevoItemTipoC['ID'] = -1;
//            nuevoItemTipoC['Nombre'] = 'Seleccione un Tipo de Comercialización';
//            nuevoItemTipoC['Descripcion'] = 'Seleccione un Tipo de Comercialización';
//            return <page.Edit>
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <page.OptionSection
//                            id={EXPEDIENTE_ID}
//                            icon="fa fa-folder-open" collapsed={false} hideCollapseButton={true}>
//                            <Row>
//                                <label.Label id="ID" size={[2, 2, 2, 2]} />
//                                <label.Cliente id="Cliente" size={[8, 8, 8, 8]} />
//                                <label.Entidad id="EstatusExpediente" size={[2, 2, 2, 2]} />
//                                {isExpedienteNuevo === true ?
//                                    <div>
//                                        <ddl.DesarrollosDDL id="Desarrollo" size={[6, 6, 6, 6]} validations={[validations.required()]} required={true} />
//                                        <ddl.TipoComercializacionDesarrolloDDL id="TipoComercializacion" idFormSection={config.id} cargarDatos={false} nuevoItem={nuevoItemTipoC} agregarnuevoItem={true} size={[6, 6, 6, 6]} validations={[validations.required()]} required={true} />
//                                    </div> :
//                                    <div>
//                                        <label.Entidad id="Desarrollo" size={[6, 6, 6, 6]} />
//                                        <label.Entidad id="TipoComercializacion" size={[6, 6, 6, 6]} />
//                                    </div>
//                                }
//                            </Row>
//                            <Row style={{ marginTop: 20 }}>
//                            </Row>
//                            <Row>
//                                <SectionConfigs />
//                            </Row>
//                        </page.OptionSection>
//                    </Column>
//                </Row>
//            </page.Edit>
//        }
//    });
//    // const Edit: any = ReactRedux.connect(Edit$.props, null)(Edit$);

//    class View$ extends page.Base {
//        static props: any = (state: any) => ({
//            entidad: state.global.currentEntity,
//            config: global.createPageConfigFromState(state.global)
//        });
//        render(): JSX.Element {
//            let entidad: any = global.getData(this.props.entidad);
//            let cliente: any = global.assign({}, entidad.Cliente);
//            let nombre: string = "";
//            if (global.isSuccessful(this.props.entidad)) {
//                nombre = '(' + cliente.Clave + ') ' + cliente.Nombre + ' ' + cliente.ApellidoPaterno + ' ' + cliente.ApellidoMaterno;
//            };
//            const listHeaderOwners: JSX.Element =
//                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
//                    <Row>
//                        <Column size={[12, 12, 12, 12]} className="list-default-header">{"Posición"}</Column>
//                    </Row>
//                </Column>

//            const listHeaderColaboradores: JSX.Element =
//                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
//                    <Row>
//                        <Column size={[12, 12, 12, 12]} className="list-default-header">{"Posición"}</Column>
//                    </Row>
//                </Column>

//            return <page.View>
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <page.OptionSection
//                            id={EXPEDIENTE_ID}
//                            icon="fa fa-folder-open" collapsed={false} hideCollapseButton={true}>
//                            <Row>
//                                <label.Label id="ID" size={[2, 2, 2, 2]} />
//                                <label.Cliente id="Cliente" size={[8, 8, 8, 8]} />
//                                <label.Entidad id="EstatusExpediente" size={[2, 2, 2, 2]} />
//                                <label.Entidad id="Desarrollo" size={[6, 6, 6, 6]} />
//                                <label.Entidad id="TipoComercializacion" size={[6, 6, 6, 6]} />
//                            </Row>
//                            <Row style={{ marginTop: 20 }}>
//                                <page.SectionList
//                                    id={EXPEDIENTE_RELACIONADOS_ID}
//                                    parent={config.id}
//                                    icon="glyphicon glyphicon-th"
//                                    level={1}
//                                    listHeader={listHeaderColaboradores}
//                                    readonly={false}
//                                    addRemoveButton={false}
//                                    size={[12, 12, 6, 6]}
//                                    formatter={(index: number, item: any) => {
//                                        return <Row>
//                                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">{BadgePosicionItem(item)}</Column>
//                                        </Row>
//                                    }}>
//                                </page.SectionList>
//                            </Row>
//                            <Row>
//                                <SectionConfigs />
//                            </Row>
//                        </page.OptionSection>
//                    </Column>
//                </Row>
//            </page.View>
//        }
//    };
//    const View: any = ReactRedux.connect(View$.props, null)(View$);

//    interface IConfiguracionProps extends page.IProps {
//        items?: global.DataElement;
//        usuario?: global.DataElement;
//        item?: any;
//        idForm?: string;
//        idFormChild?: string;
//        editMode?: boolean;
//        viewMode?: boolean;
//    };

//    class $SectionConfigs extends React.Component<IConfiguracionProps, {}>{
//        constructor(props: IConfiguracionProps) {
//            super(props);
//        };
//        static defaultProps: IConfiguracionProps = {
//            items: global.createSuccessfulStoreObject([])
//        };
//        static props: any = (state: any) => ({
//            entidad: state.global.currentEntity,
//            config: global.createPageConfigFromState(state.global),
//            items: state.global.catalogo$Expediente$Configuraciones
//        });
//        render(): JSX.Element {
//            let state: global.DataElement = this.props.config.getState();
//            let viewMode: boolean = null;
//            if (global.isSuccessful(state) && global.getData(state).viewMode !== undefined) {
//                viewMode = global.getData(state).viewMode === true;
//            }

//            return <PanelUpdate info={this.props.items}>
//                <Configuraciones entidad={this.props.entidad} items={this.props.items} viewMode={viewMode} config={this.props.config} />
//            </PanelUpdate>
//        };
//    };
//    const SectionConfigs: any = ReactRedux.connect($SectionConfigs.props, null)($SectionConfigs);

//    class Configuraciones extends React.Component<IConfiguracionProps, {}>{
//        constructor(props: IConfiguracionProps) {
//            super(props);
//        };
//        getEditMode(item: any, listData: any[]): boolean {
//            let retValue: boolean = false;
//            let index: number = listData.map((value) => { return value.Fase.Clave; }).indexOf(item.Fase.Clave);
//            let prevItem = index > 0 ? listData[index - 1] : null;

//            if (prevItem === null || (prevItem.EstatusSeguimiento)) {
//                if ((item.EstatusSeguimiento && item.EstatusSeguimiento.Clave !== "F")) {
//                    retValue = true;
//                }
//            }

//            return retValue;
//        };
//        componentWillMount(): void {
//            let propItems: any = this.props.items;
//            let listData: any[] = propItems && propItems.data ? propItems.data : [];
//            let hasData: boolean = listData.length > 0;
//            let seguimientos: any[] = [];

//            if (hasData) {
//                listData.forEach((item: any, index: number): any => {
//                    let key: string = "fase-config-key-" + index + "-" + (item.ID !== undefined && item.ID !== null ? item.ID : index);
//                    let idForm: string = "fase$config$" + index;
//                    let idFormChild: string = "fase$config$authorized$" + index;

//                    if (this.props.viewMode === false) {
//                        let editMode: boolean = this.getEditMode(item, listData);
//                        if (editMode) {
//                            let s1: any = global.assign({ idForm, idFormChild, item });
//                            seguimientos.push(s1);
//                        }
//                    }
//                });

//                this.props.config.setState({ seguimientos });
//            }
//        };
//        render(): JSX.Element {
//            let items: any;
//            let propItems: any = this.props.items;
//            let listData: any[] = propItems && propItems.data ? propItems.data : [];
//            let hasData: boolean = listData.length > 0;
//            //
//            if (hasData) {
//                let fnCreateList: (items: any[]) => any = (items: any[]): any => {
//                    let retValue: any = (items === undefined || items === null) ? null :
//                        items.map((item: any, index: number): any => {
//                            let key: string = "fase-config-key-" + index + "-" + (item.ID !== undefined && item.ID !== null ? item.ID : index);
//                            let idForm: string = "fase$config$" + index;
//                            let idFormChild: string = "fase$config$authorized$" + index;
//                            //
//                            if (this.props.viewMode === true) {
//                                return <ViewConfiguracion key={key} item={item} idForm={idForm} idFormChild={idFormChild} />
//                            } else {
//                                let editMode: boolean = this.getEditMode(item, listData);
//                                return <EditConfiguracion key={key} item={item} items={this.props.items} editMode={editMode} idForm={idForm} idFormChild={idFormChild} />
//                            }
//                        });
//                    return retValue;
//                };

//                items = fnCreateList(listData);
//            }

//            return <FadeInColumn>{items}</FadeInColumn>
//        };
//    };

//    class $EditConfiguracion extends React.Component<IConfiguracionProps, {}>{
//        static props: any = (state: any) => ({
//            config: global.createPageConfigFromState(state.global),
//            usuario: state.global.usuario$me
//        });
//        onChange(item: any): void {
//            if (item && item.IdUsuario > 0) {
//                global.asyncGet("posiciones/superior/" + item.IdUsuario, (status: AsyncActionTypeEnum, data: any) => {
//                    if (status === AsyncActionTypeEnum.successful) {
//                        this.onAddOwner(data);
//                    }
//                });
//            }
//        };
//        onAddOwner(posicion: any): void {
//            if (posicion === null || posicion === undefined || posicion.ID <= 0) {
//                return;
//            }
//            //
//            let section: global.DataElement = Forms.getValue(EXPEDIENTE_OWNERS_ID, config.id);
//            let listData: any[] = section && section.data ? section.data : [];
//            let newId: number = section.getNextLowerID();
//            let exists: boolean = false;
//            //
//            listData.forEach((item) => {
//                if (item.Posicion.ID === posicion.ID && item._eliminado !== true) {
//                    exists = true;
//                }
//            });
//            //
//            if (!exists) {
//                let model: any = global.assign({}, { ID: newId, Posicion: posicion, IdPosicion: posicion.ID });
//                let retValue: global.DataElement = section.upsertItem(model);
//                Forms.updateFormElement(config.id, EXPEDIENTE_OWNERS_ID, retValue);
//            }
//        };
//        componentDidMount(): void {
//            global.dispatchSuccessful("global-page-entity", this.props.item, this.props.idForm);
//            global.dispatchSuccessful("global-page-data", this.props.item.Autorizados, this.props.idFormChild);

//            if (this.props.editMode) {
//                //el responsable será el usuario actual en nuevos seguimientos
//                if (global.isSuccessful(this.props.usuario) && (this.props.item.ID <= 0)) {
//                    let usuario: any = global.getData(this.props.usuario);
//                    Forms.updateFormElement(this.props.idForm, "Posicion", usuario.Posicion);
//                }
//            }
//        };
//        render(): JSX.Element {
//            let $page: any = config.getML();
//            let item: any = this.props.item;
//            let isNew: boolean = !(item.ID > 0);
//            let fase: any = global.assign({}, item.Fase);
//            let estatusSeguimiento: any = global.assign({}, item.EstatusSeguimiento);
//            let editMode: boolean = this.props.editMode;

//            let style: React.CSSProperties = {
//                opacity: editMode ? 1.0 : 0.5,
//                pointerEvents: editMode ? "auto" : "none"
//            };

//            const listHeaderAuthorized: JSX.Element =
//                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
//                    <Row>
//                        <Column size={[10, 10, 10, 10]} className="list-default-header">{"Posición"}</Column>
//                        <Column size={[2, 2, 2, 2]} className="list-center-header">&nbsp;</Column>
//                    </Row>
//                </Column>

//            return <Column size={[4, 4, 4, 4]} style={style}>
//                <page.OptionSection
//                    id={this.props.idForm} title={fase.Nombre} level={1} icon={FASE_ICON[fase.Clave]} collapsed={false}
//                    subTitle={<span><span className="badge badge-info bold" style={{ margin: "0px 5px" }}>{estatusSeguimiento.Nombre}</span></span>}>
//                    <Row>
//                        {editMode && (isNew || estatusSeguimiento.Clave === "E") ?
//                            <ddl.SCVEsquemasConfiguracion id="Esquema" idFormSection={this.props.idForm} faseClave={fase.Clave} idExpediente={item.IdExpediente} size={[12, 12, 12, 12]} validations={[validations.required()]} /> :
//                            <label.Entidad id="Esquema" label={$page.form.Esquema.label} idForm={this.props.idForm} size={[12, 12, 12, 12]} />
//                        }
//                        {editMode ?
//                            <ddl.EKPosicionesDDL id="Posicion" idFormSection={this.props.idForm} label="Responsable" value={item.Posicion} size={[12, 12, 12, 12]} validations={[validations.required()]} change={this.onChange.bind(this)} /> :
//                            <label.Entidad id="Posicion" label={$page.form.Responsable.label} idForm={this.props.idForm} size={[12, 12, 12, 12]} />
//                        }
//                        {editMode ?
//                            <DatePicker id="FechaEstimada" idFormSection={this.props.idForm} label={$page.form.FechaEstimada.label} value={item.FechaEstimada} type="date" size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} /> :
//                            <label.Fecha id="FechaEstimada" label={$page.form.FechaEstimada.label} idForm={this.props.idForm} size={[12, 12, 12, 12]} />
//                        }
//                    </Row>
//                    <Row style={{ marginTop: 15 }}>
//                        <page.SectionList
//                            id={this.props.idFormChild}
//                            title="Lista de Autorizados"
//                            parent={this.props.idForm}
//                            icon="fa fa-users"
//                            level={1}
//                            hideNewButton={!editMode}
//                            listHeader={listHeaderAuthorized}
//                            items={createSuccessfulStoreObject([])}
//                            readonly={false}
//                            addRemoveButton={false}
//                            size={[12, 12, 12, 12]}
//                            mapFormToEntity={(form: EditForm): any => {
//                                return form
//                                    .addID()
//                                    .addObject("Posicion")
//                                    .addVersion()
//                                    .toObject();
//                            }}
//                            formatter={(index: number, item: any) => {
//                                return <Row>
//                                    <Column size={[10, 10, 10, 10]} className="listItem-default-header">{BadgePosicionItem(item)}</Column>
//                                    <buttons.PopOver size={[2, 2, 2, 2]} idParent={this.props.idForm} idForm={this.props.idFormChild} info={item}
//                                        extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
//                                </Row>
//                            }}>
//                            <Row>
//                                <ddl.EKPosicionesDDL id="Posicion" idFormSection={this.props.idFormChild} size={[12, 12, 12, 12]} validations={[validations.required()]} />
//                            </Row>
//                        </page.SectionList>
//                    </Row>
//                </page.OptionSection>
//            </Column>
//        }
//    };
//    const EditConfiguracion: any = ReactRedux.connect($EditConfiguracion.props, null)($EditConfiguracion);

//    class ViewConfiguracion extends React.Component<IConfiguracionProps, {}>{
//        componentDidMount(): void {
//            global.dispatchSuccessful("global-page-entity", this.props.item, this.props.idForm);
//            global.dispatchSuccessful("global-page-data", this.props.item.Autorizados, this.props.idFormChild);
//        };
//        render(): JSX.Element {
//            let $page: any = config.getML();
//            let item: any = this.props.item;
//            let autorizados: global.DataElement = global.createSuccessfulStoreObject(item.Autorizados);
//            let fase: any = global.assign({}, item.Fase);
//            let estatusSeguimiento: any = global.assign({}, item.EstatusSeguimiento);

//            const listHeaderAuthorized: JSX.Element =
//                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
//                    <Row>
//                        <Column size={[10, 10, 10, 10]} className="list-default-header">{"Posición"}</Column>
//                        <Column size={[2, 2, 2, 2]} className="list-center-header">&nbsp;</Column>
//                    </Row>
//                </Column>

//            return <Column size={[4, 4, 4, 4]}>
//                <page.OptionSection
//                    id={this.props.idForm} title={fase.Nombre} level={1} icon={FASE_ICON[fase.Clave]} collapsed={false}
//                    subTitle={<span><span className="badge badge-info bold" style={{ margin: "0px 5px" }}>{estatusSeguimiento.Nombre}</span></span>}>
//                    <Row>
//                        <label.Entidad id="Esquema" label={$page.form.Esquema.label} idForm={this.props.idForm} size={[12, 12, 12, 12]} />
//                        <label.Entidad id="Posicion" label={$page.form.Responsable.label} idForm={this.props.idForm} size={[12, 12, 12, 12]} />
//                        <label.Fecha id="FechaEstimada" label={$page.form.FechaEstimada.label} idForm={this.props.idForm} size={[12, 12, 12, 12]} />
//                    </Row>
//                    <Row style={{ marginTop: 15 }}>
//                        <Column size={[12, 12, 12, 12]}>
//                            <OptionSection
//                                id={this.props.idFormChild}
//                                title="Lista de Autorizados"
//                                subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
//                                    {[global.getData(autorizados, []).length].join("")}
//                                </span>}
//                                level={1}
//                                collapsed={false}
//                                icon="fa fa-users">
//                                <List
//                                    items={autorizados}
//                                    readonly={true}
//                                    addRemoveButton={false}
//                                    listHeader={listHeaderAuthorized}
//                                    formatter={(index: number, item: any) => {
//                                        return <Row>
//                                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">{BadgePosicionItem(item)}</Column>
//                                        </Row>
//                                    }} />
//                            </OptionSection>
//                        </Column>
//                    </Row>
//                </page.OptionSection>
//            </Column>
//        }
//    };
//}