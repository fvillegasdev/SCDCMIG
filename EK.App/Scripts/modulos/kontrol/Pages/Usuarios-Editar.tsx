namespace EK.Modules.Kontrol.Pages.Usuarios {
    "use strict";
    const slot$1: string = "Posicion";
    const NIVELES_ID: string = "Niveles";
    const GRUPOS_USUARIOS: string = "Grupos";
    const config: page.IPageConfig = global.createPageConfig("usuarios", "kontrol", [slot$1, NIVELES_ID, GRUPOS_USUARIOS]);

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addBoolean("Bloqueado")
                .addClave()
                .addNombre()
                .addObject("DashBoard")
                .addString("Email")
                .addString("Apellidos")
                .addDate("VigenciaInicio")
                .addDate("VigenciaFin")
                .addDate("InicioOperaciones")
                .addObject("Posicion")
                .addObject("AreaOrganizacion")
                .addObject("TimeZone")
                .addObject("Idioma")
                .addString("Telefono")
                .addEstatus()
                .addObject(NIVELES_ID)
                .addObject("Clasificadores")
                .addVersion()
                .toObject();
            console.log(model);
            return model;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            if (id === "?me") {
                config.dispatchEntityBase({ id }, "usuario/me", undefined, global.HttpMethod.POST);
            }
            else {
                config.dispatchEntity(id);
            };
        };
        componentWillMount(): void {
            dispatchAsync("load::Dominios", "base/kontrol/dominios/Get/GetAll/" + global.encodeObject({ activos: 1 }));
            let entidad: any = global.getData(this.props.entidad);
        }
        onEntityLoaded(props: page.IProps): void    {
            let entity: any = getData(props.entidad);

            props.config.setEntity({ Posicion: entity.Posicion }, slot$1);
            props.config.dispatchCatalogoBase("kontrol/usuarios/niveles/", { idUsuario: entity.ID }, NIVELES_ID);
            if (entity.ID != -1) {
                let parametros: any = global.assign({ idUsuario: entity.ID });
                props.config.dispatchCatalogoBase("base/kontrol/GruposUsuario/Get/GetGroupsDetailsUser/", parametros, GRUPOS_USUARIOS);
            }
            else
            {
                global.dispatchSuccessful("global-page-data", [], GRUPOS_USUARIOS);
            }           
        };
        onWillFilter(props: any, filters: any): any
        {
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} allowNew="false"
                onSave={this.saveForm}
                onComponentWillMount={this.componentWillMount}
                onEntityLoaded={this.onEntityLoaded}
                onWillFilter={this.onWillFilter}               
                onWillEntityLoad={this.onWillEntityLoad}>
                <PageButtons>
                    <buttons.ViewerButton />
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    export const Edit = page.connect(class extends page.Base {
        render(): JSX.Element {
            let timeStamp = Number(new Date()).toString();
            let usuario: any = global.getData(this.props.entidad);
            //console.log(usuario);
            return <page.Edit>
                <Row >
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id="Info"
                            icon="fa fa-th"
                            level="main"
                            hideCollapseButton={true}
                            collapsed={false}>
                            <Row>
                                <Column size={[12, 3, 3, 3]}>
                                    <ImageManager modulo={config.id} viewMode={false} />
                                </Column>
                                <Column size={[12, 9, 9, 9]}>
                                  
                                    <Row style={{ paddingBottom: 10 }}>
                                        <label.Custom id="Nombre" size={[12, 12, 8, 8]} value={(item: any) => {
                                            return !item ? "" : item.Nombre + " " + item.Apellidos;
                                        }} />
                                        <checkBox.Blocked size={[6, 2, 2, 2]} />
                                        {/*<label.Boolean id="Bloqueado" size={[6, 6, 2, 2]} />*/}
                                        <label.Estatus size={[6, 6, 2, 2]} />
                                        <label.Clave size={[12, 12, 2, 2]} />
                                        <label.Custom id="Email" size={[12, 6, 4, 4]} />
                                        <label.Fecha id="VigenciaInicio" size={[6, 6, 2, 2]} />
                                        <label.Fecha id="VigenciaFin" size={[6, 6, 2, 2]} />
                                        <label.Fecha id="InicioOperaciones" size={[6, 6, 2, 2]} />
                                        <label.General id="DashBoard" size={[12, 6, 3, 3]} />

                                    </Row>
                                    <Row>
                                        <Column size={[12, 6, 6, 6]}>
                                            <page.OptionSection id={slot$1} icon="fa fa-sitemap" level={1} collapsed={false}>
                                                <Row>
                                                    <PosicionesDDL addNewItem={"SO"} addNewItemText={"Sin Posición"}id="Posicion" size={[12, 12, 12, 12]} />
                                                    <AreasOrganizacionDDL id="AreaOrganizacion" />
                                                </Row>
                                            </page.OptionSection>
                                        </Column>
                                        <Column size={[12, 6, 6, 6]}>
                                            <OptionSection id="Globalizacion" icon="fa fa-cogs" level={1} collapsed={false}>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <ZonaHorariaDDL />
                                                        <IdiomasDDL />
                                                    </Column>
                                                </Row>
                                            </OptionSection>
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>

                            <Column size={[12, 6, 6, 6]} style={{ padding: 0 }}>
                                <page.SectionList
                                    id={NIVELES_ID}
                                    parent={config.id}
                                    level={1}
                                    icon="fa fa-table"
                                    size={[12, 12, 12, 12]}
                                    listHeader={
                                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                            <Row>
                                                <Column size={[11, 11, 11, 11]} className="list-default-header">{"Compañía/Nivel"}</Column>
                                                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                                            </Row>
                                        </div>}
                                    mapFormToEntity={(form: EditForm, entidades: any[]): any => {
                                        let retValue: any = form
                                            .addID()
                                            .addObject("Compania")
                                            .addObject("Nivel")
                                            .addVersion()
                                            .toObject();

                                        if (entidades) {
                                            entidades.forEach((value: any, index: number): void => {
                                                if (value.IdCompania === retValue.IdCompania) {
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
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[11, 11, 11, 11]} className="listItem-default-header">
                                                <h5 style={{ fontWeight: 400 }}>{item.Compania.Nombre}</h5><h6 style={{ fontWeight: 300 }}>{item.Nivel.Nombre}</h6>
                                            </Column>
                                            <buttons.PopOver idParent={config.id} idForm={NIVELES_ID} info={item}
                                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                        </Row>;
                                    }}>
                                    <Row>
                                        {Forms.getValue("ID", NIVELES_ID) > 0 ? <label.Entidad id="Compania" idForm={NIVELES_ID} size={[12, 12, 12, 12]} /> : null}
                                        {!(Forms.getValue("ID", NIVELES_ID) > 0) ? <ddl.CompaniaDDL idFormSection={NIVELES_ID} size={[12, 12, 12, 12]} /> : null}
                                        <ddl.NivelesDDL idFormSection={NIVELES_ID} size={[12, 12, 12, 12]} />
                                    </Row>
                                </page.SectionList>
                                <page.SectionList
                                    id={GRUPOS_USUARIOS}
                                    level={1}
                                    hideNewButton={true}
                                    icon="fa fa-users"
                                    size={[12, 12, 12, 12]}
                                    listHeader={
                                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                            <Row>
                                                <Column size={[12, 7, 7, 7]} className="list-default-header">{"Grupo"}</Column>
                                                <Column size={[12, 3, 3, 3]} className="list-default-header">{"Integrantes"}</Column>
                                                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Estatus"}</Column>
                                            </Row>
                                        </div>}
                                    readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[12, 7, 7, 7]} className="listItem-default-item">
                                                <span style={{ fontWeight: 400 }}>({item.Grupo.Clave}) {item.Grupo.Nombre}</span>
                                            </Column>
                                            <Column size={[12, 3, 3, 3]} className="listItem-center-item">
                                                <span className="badge badge-success" style={{ fontWeight: 400 }}>{item.CantidadIntegrantes}</span>
                                            </Column>
                                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                                <span style={{ fontWeight: 400 }}>{item.Grupo.Estatus.Clave ? EK.UX.Labels.ok(item.Grupo.Estatus.Clave) : null}</span>
                                            </Column>
                                        </Row>;
                                    }}>
                                </page.SectionList>
                            </Column>

                            <Column size={[12, 6, 6, 6]} style={{ padding: 0 }}>
                                <clasificadores.section />
                            </Column>

                        </page.OptionSection>
                    </Column>



                    <Column size={[12, 12, 12, 12]}>
                        <KontrolFileManager modulo={config.id} viewMode={false} multiple={true} />
                    </Column>
                </Row>
            </page.Edit>;
        };
    });
    export const View = page.connect(class extends page.Base {
        render(): JSX.Element {
            let timeStamp = Number(new Date()).toString();
            let usuario: DataElement = this.props.entidad;
            let usuarioFoto: string = "usuario/default/foto";

            if (isSuccessful(usuario)) {
                usuarioFoto = ["usuario(", getDataID(usuario), ")/lg/foto?", timeStamp].join("");
                // console.log(config.id)
            };

            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <OptionSection
                            id="Info"
                            icon="fa fa-th"
                            level="main"
                            hideCollapseButton={true}
                            collapsed={false}>
                            <Row>
                                <Column size={[12, 3, 3, 3]}>
                                    <ImageManager modulo={config.id} viewMode={true} />
                                </Column>
                                <Column size={[12, 9, 9, 9]}>
                                    <Row style={{ paddingBottom: 10 }}>
                                        <label.Custom id="Nombre" size={[12, 12, 8, 8]} value={(item: any) => {
                                            return !item ? "" : item.Nombre + " " + item.Apellidos;
                                        }} />
                                        <label.Boolean id="Bloqueado" size={[6, 6, 2, 2]} />
                                        <label.Estatus size={[6, 6, 2, 2]} />
                                        <label.Clave size={[12, 12, 2, 2]} />
                                        <label.Custom id="Email" size={[12, 6, 4, 4]} />
                                        <label.Fecha id="VigenciaInicio" size={[6, 6, 2, 2]} />
                                        <label.Fecha id="VigenciaFin" size={[6, 6, 2, 2]} />
                                      
                                        <label.Fecha id="InicioOperaciones" size={[6, 6, 2, 2]} />
                                        <label.General id="DashBoard" size={[12, 6, 3, 3]} />

                                    </Row>
                                    <Row>
                                        <Column size={[12, 6, 6, 6]}>
                                            <page.OptionSection id={slot$1} icon="fa fa-sitemap" level={1} collapsed={false}>
                                                <Row>
                                                    <label.Entidad id="Posicion" size={[12, 12, 12, 12]} />
                                                    <label.Entidad id="AreaOrganizacion" size={[12, 12, 12, 12]} />
                                                </Row>
                                            </page.OptionSection>
                                        </Column>
                                        <Column size={[12, 6, 6, 6]}>
                                            <OptionSection id="Globalizacion" icon="fa fa-cogs" level={1} collapsed={false}>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <label.Entidad id="TimeZone" size={[12, 12, 12, 12]} />
                                                        <label.Entidad id="Idioma" size={[12, 12, 12, 12]} />
                                                    </Column>
                                                </Row>
                                            </OptionSection>
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>

                            <Column size={[12, 6, 6, 6]} style={{ padding: 0 }}>
                                <page.SectionList
                                    id={NIVELES_ID}
                                    level={1}
                                    icon="fa fa-table"
                                    size={[12, 12, 12, 12]}
                                    listHeader={
                                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                            <Row>
                                                <Column size={[12, 12, 12, 12]} className="list-default-header">{"Compañía/Nivel"}</Column>
                                            </Row>
                                        </div>}
                                    readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                <h5 style={{ fontWeight: 400 }}>{item.Compania.Nombre}</h5><h6 style={{ fontWeight: 300 }}>{item.Nivel.Nombre}</h6>
                                            </Column>
                                        </Row>;
                                    }}>
                                </page.SectionList>
                                <page.SectionList
                                    id={GRUPOS_USUARIOS}
                                    level={1}
                                    icon="fa fa-users"
                                    size={[12, 12, 12, 12]}
                                    listHeader={
                                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                            <Row>
                                                <Column size={[12, 7, 7, 7]} className="list-default-header">{"Grupo"}</Column>
                                                <Column size={[12, 3, 3, 3]} className="list-default-header">{"Integrantes"}</Column>
                                                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Estatus"}</Column>
                                            </Row>
                                        </div>}
                                    readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[12, 7, 7, 7]} className="listItem-default-item">
                                                <span style={{ fontWeight: 400 }}>({item.Grupo.Clave}) {item.Grupo.Nombre}</span>
                                            </Column>
                                            <Column size={[12, 3, 3, 3]} className="listItem-center-item">
                                                <span className="badge badge-success" style={{ fontWeight: 400 }}>{item.CantidadIntegrantes}</span>
                                            </Column>
                                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                                <span style={{ fontWeight: 400 }}>{item.Grupo.Estatus.Clave ? EK.UX.Labels.ok(item.Grupo.Estatus.Clave) : null}</span>
                                            </Column>
                                        </Row>;
                                    }}>
                                </page.SectionList>
                            </Column>

                            <Column size={[12, 6, 6, 6]} style={{ padding: 0 }}>
                                <clasificadores.section />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                                
                            </Column>
                        </OptionSection>
                    </Column>



                    <Column size={[12, 12, 12, 12]}>
                        <KontrolFileManager modulo={config.id} viewMode={true} multiple={true} />
                    </Column>
                </Row>
            </page.View>;
        };
    });
    interface IEditPosicionProps extends React.Props<any> {
        posicion?: any;
    };
    const EditPosicion = global.connect(class extends React.Component<IEditPosicionProps, IEditPosicionProps> {
        constructor(props: IEditPosicionProps) {
            super(props);

            this.onSave = this.onSave.bind(this);
            this.onDelete = this.onDelete.bind(this);
        };
        onDelete(): void {
            Forms.updateFormElement(config.id, "Posicion", undefined);
        };
        onSave(config?: page.IPageConfig): void {
            let element: any = Forms.getValue("Posicion", slot$1);

            Forms.updateFormElement(config.id, "Posicion", element);

            config.setState({ viewMode: true }, slot$1);
        };
        render(): JSX.Element {
            return <page.OptionSection
                id={slot$1}
                collapsed={false}>
                <SectionView defaultEditButton={true} onDelete={this.onDelete}>
                    <Row>
                        <label.Entidad id="Posicion" idForm={slot$1} label="Posición" size={[12, 12, 12, 12]} />
                    </Row>
                </SectionView>
                <SectionEdit
                    onSave={this.onSave}
                    defaultCancelButton={true}>
                    <Row>
                        <PosicionesDDL id="Posicion" idFormSection={slot$1} />
                    </Row>
                </SectionEdit>
            </page.OptionSection>;
        };
    });
    // 
    // Change password
    //
    export const ChangePassword: any = page.connect(class extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addString("Password")
                .addString("PasswordConfirm")
                .addVersion()
                .toObject();

            config.dispatchEntityBase(model, "usuario/save/password", undefined, global.HttpMethod.PUT);
        };
        componentDidMount(): void {
            config.setState({ viewMode: false });
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            if (id === "?me") {
                config.dispatchEntityBase({ id }, "usuario/me", undefined, global.HttpMethod.POST);
            }
            else {
                config.dispatchEntity(id);
            };
        };
        onEntityLoaded(props: page.IProps): void {
            props.config.updateForm();
        };
        onEntitySaved(props: page.IProps): void {
            go("kontrol/usuarios/" + getDataID(props.entidad));
        };
        onAccessValidation(): boolean {
            if (auth.getOptionPermissionValue(config.id) >= auth.READ_PERMISSION) {
                return true;
            }
            else {
                if (isSuccessful(this.props.entidad)) {
                    if (getDataID(this.props.entidad) === global.getCurrentUser().ID) {
                        return true;
                    };
                } else if (isLoadingOrUpdating(this.props.entidad)) {
                    return true;
                }
                return false;
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion}
                onSave={this.saveForm} onEntitySaved={this.onEntitySaved} onEntityLoaded={this.onEntityLoaded}
                onWillEntityLoad={this.onWillEntityLoad} customPermission={this.onAccessValidation}>
                <EditChangePassword />
            </page.Main>;
        };
    });
    let EditChangePassword: any = global.connect(class extends React.Component<page.IProps, {}> {
        constructor(props: page.IProps) {
            super(props);
        };
        //class EditChangePassword extends page.Base {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
        });
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <OptionSection id="PasswordInfo" icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                            <Row>
                                <Column size={[12, 6, 6, 6]}>
                                    <label.Label id="Nombre" size={[6, 6, 6, 6]} value={entidad.Nombre + " " + entidad.Apellidos} />
                                    <label.Estatus size={[12, 3, 3, 3]} />
                                    <label.Boolean id="Bloqueado" size={[12, 3, 3, 3]} />
                                    <label.Clave size={[12, 6, 6, 6]} />
                                    <label.Fecha id="VigenciaInicio" size={[6, 3, 3, 3]} />
                                    <label.Fecha id="VigenciaFin" size={[6, 3, 3, 3]} />
                                </Column>
                                <Column size={[12, 6, 6, 6]}>
                                    <page.OptionSection
                                        id="Password" collapsed={false} hideCollapseButton={true} level={1}>
                                        <Row>
                                            <Column style={{ minHeight: 70 }}>
                                                <input.Password id="Password" passwordValidator={true} size={[12, 6, 6, 6]} />
                                                <input.Password id="PasswordConfirm" size={[12, 6, 6, 6]} />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>
                        </OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    });


    export let DashBoardDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.catalogo$DashBoards
        });
        static defaultProps: IDropDrownListProps = {
            id: "DashBoard",
            items: createDefaultStoreObject([]),
            label: "DashBoard Principal",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let encodedURL: any = "/base/kontrol/opciones/Get/GetDashBoards/";
                var pathRoute = global.getFullUrl(encodedURL, "");
                dispatchAsync("global-page-data", pathRoute, "DashBoards");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
  

};