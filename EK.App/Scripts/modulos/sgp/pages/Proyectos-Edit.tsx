namespace EK.Modules.SGP.Pages.Proyectos {
    "use strict";
    const PAGE_ID: string = "Proyectos";
    const SECTION_COLABORADORES_ID = "Colaboradores";

    const CATALOGO_GRUPOS_ID: string = "SGPGruposUsuarios$GruposUsuarios";
    const USUARIOS_SELECCIONADOS: string = "SGPGruposUsuarios$UsuariosSelect";
    const CATALOGO_NAME: string = "SGPGruposUsuarios$NameCatalogo";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "sgp", [CATALOGO_GRUPOS_ID, SECTION_COLABORADORES_ID]);

    let IdProyecto = -1;

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()    
                .addClave()
                .addNombre()
                .addEstatus()
                .addVisualizacionProyecto("TipoVisualizacionEdit","TipoVisualizacion")
                .addVersion()
                .addObject("FechaInicio")
                .addObject("FechaFin")
                .addObject("EstatusProyecto")
                .addObject("Tipo")
                .addObject("Responsable")
                .addObject("AsignadoA")
                .addObject("EstatusProyecto")
                .addObject(SECTION_COLABORADORES_ID)
                .addObjectCustomForm("CUSTOMFORM")
                .addDescripcion()
                .toObject();

            return model;
        };

        onEntityLoaded(props: page.IProps): any {
            let entidad: any = getData(props.entidad);
            IdProyecto = getDataID(props.entidad);
            let parametros: any = global.assign({ IdProyecto: IdProyecto });
            if (IdProyecto <= 0 || IdProyecto === undefined) {
                global.dispatchSuccessful("global-page-data", [], SECTION_COLABORADORES_ID);
            }
            else {
                props.config.dispatchCatalogoBase("base/scv/Proyectos/Get/GetColaboradores/", parametros, SECTION_COLABORADORES_ID);
                global.dispatchAsync("global-page-data", "base/scv/gruposusuario/Get/GetAll/", CATALOGO_GRUPOS_ID);
                global.dispatchSuccessful("load::" + CATALOGO_NAME, SECTION_COLABORADORES_ID);            
            };
        };

        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onEntityLoaded={this.onEntityLoaded} onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    
    class Edit extends page.Base {
        componentWillMount(): void {
            requireGlobal(Catalogos.tipovisualizacionproyecto);
        };

        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        icon="fa fa-industry"   
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 2, 2, 2]}>
                                <ImageManager modulo={config.modulo} viewMode={false}/>
                            </Column>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 6, 6, 6]} maxLength={150} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 2, 2, 2]} />

                            <label.Entidad id="CreadoPor" size={[12, 6, 4, 2]}
                                value={(item: any) => { return !item ? "" : item.Nombre + " " + item.Apellidos; }}
                            />
                            <label.Fecha id="Creado" size={[12, 6, 2, 1]} />
                            <label.Fecha id="Modificado" size={[12, 6, 2, 1]} />
                            <input.Date id="FechaInicio" size={[12, 6, 4, 2]} validations={[validations.required(),
                                validations.lessEqualThan("FechaFin", "La fecha de inicio debe ser menor a la fecha de finalización")]} />
                            <input.Date id="FechaFin" size={[12, 6, 4, 2]} validations={[validations.required(),
                                validations.greaterEqualThan("FechaInicio", "La fecha de fin debe ser menor a la fecha de inicio")]} />
                            <Column size={[12, 2, 2, 2]} style={{ textAlign: "center", padding: "0px", margin: "0px" }}>
                                <span id="TipoVisualizacion" className="label-text">Tipo Visualización</span>
                                <TipoVisualizacionEdit />
                            </Column>

                            <ddl.SGPUsuariosAgrupadosProyectoDDL id="Responsable" addNewItem={"SO"} validations={[validations.required()]} size={[12, 12, 4, 4]} />
                            <ddl.SGPUsuariosAgrupadosProyectoDDL id="AsignadoA" addNewItem={"SO"} validations={[validations.required()]} size={[12, 12, 4, 3]} />
                            <ddl.SGPTipoProyectoDDL id="Tipo" addNewItem={"SO"} validations={[validations.required()]} size={[12, 6, 4, 3]} />

                            <ddl.EstatusProyecto id="EstatusProyecto" addNewItem={"SO"} validations={[validations.required()]} size={[12, 3, 3, 3]} />
                            <input.Descripcion size={[12, 7, 7, 7]} />
                            <SectionColaboradores id="Colaboradores" />
                        </Row>
                        <Row>
                            <SectionFieldsRendering />
                        </Row>
                    </page.OptionSection>

                </Column>
            </page.Edit>;
        };
    };

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={"Proyectos"}
                        icon="fa fa-industry"
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 2, 2, 2]}>
                                <ImageManager modulo={config.modulo} viewMode={true} />
                            </Column>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 6, 6, 6]} />
                            <label.Estatus size={[12, 2, 2, 2]} />
                            <label.Entidad id="CreadoPor" size={[12, 6, 4, 2]}
                                value={(item: any) => {return !item ? "" : item.Nombre + " " + item.Apellidos;}}
                            />
                            <label.Fecha id="Creado" size={[12, 6, 2, 1]} />
                            <label.Fecha id="Modificado" size={[12, 6, 2, 1]} />
                            <label.Fecha id="FechaInicio" size={[12, 6, 4, 2]} />
                            <label.Fecha id="FechaFin" size={[12, 6, 4, 2]} />
                            <label.TipoVisualizacion size={[12, 2, 2, 2]} />
                            <label.Entidad id="Responsable" size={[12, 6, 4, 4]}
                                value={(item: any) => { return !item ? "" : item.Nombre + " " + item.Apellidos; }}
                            />
                            <label.Entidad id="AsignadoA" size={[12, 6, 4, 3]}
                                value={(item: any) => { return !item ? "" : item.Nombre + " " + item.Apellidos; }}
                            />
                            <label.Entidad id="Tipo" size={[12, 6, 4, 3]} />
                            <label.Entidad id="EstatusProyecto" size={[12, 3, 3, 3]} />
                            <label.Descripcion size={[12, 7, 7, 7]} />
                            <SectionColaboradores id="Colaboradores" />      
                        </Row>
                        <Row>
                            <SectionFieldsRendering />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
    };

    interface ISectionFieldsRendering extends page.IProps {
        TipoProyecto?: any;
        entity?: DataElement;
        entityState?: DataElement;
    };
    let SectionFieldsRendering: any = global.connect(class extends React.Component<ISectionFieldsRendering, ISectionFieldsRendering> {
        constructor(props: ISectionFieldsRendering) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.TipoProyecto = Forms.getValue("Tipo", config.id);
            retValue.entity = state.global.currentEntity
            retValue.entityState = state.global.currentEntityState
            return retValue;
        };
        shouldComponentUpdate(nextProps: ISectionFieldsRendering, { }): boolean {
            return global.hasChanged(this.props.TipoProyecto, nextProps.TipoProyecto)
                || global.hasChanged(this.props.entity, nextProps.entity)
                || global.hasChanged(this.props.entityState, nextProps.entityState);
        };

        render(): JSX.Element {
            let entidad: any = getData(this.props.entity);
            let entidadState: any = getData(this.props.entityState);
            let formTipoProyecto: any = this.props.TipoProyecto;
            let tipoEntidad: string = "";
            let tipoProyecto: any;
            if (entidadState && entidadState.viewMode) {
                if (entidad.Tipo != null && entidad.Tipo != undefined) {
                    tipoProyecto = entidad.Tipo;
                    tipoEntidad = config.id + "$" + tipoProyecto.Clave;
                }
            } else {
                if (formTipoProyecto != null && formTipoProyecto != undefined) {
                    tipoEntidad = config.id + "$" + formTipoProyecto.Clave;
                }
            }
            return <FieldsRendering modoView={this.props.entityState} tipoEntidad={tipoEntidad} />
        };
    });


    interface ITipoVisualizacionEdit extends React.Props<any> {
        entity?: DataElement;
    }
    export let TipoVisualizacionEdit: any = global.connect(class extends React.Component<ITipoVisualizacionEdit, {}>{
        constructor(props: ITipoVisualizacionEdit) {
            super(props);
        }
        static props: any = (state: any) => ({
            entity: state.global.currentEntity
        });
        shouldComponentUpdate(nextProps: ITipoVisualizacionEdit, { }): boolean {
            return hasChanged(this.props.entity, nextProps.entity) ||
                this.props.entity !== nextProps.entity;
        }
        render(): JSX.Element {
            let entidad: any = getData(this.props.entity);
            let value: boolean = false;
            if (entidad.TipoVisualizacion != null && entidad.TipoVisualizacion != undefined) {
                if (entidad.TipoVisualizacion.Clave === "PRI") {
                    value = true;
                }
            }

            return <checkBox.TipoVisualizacion id="TipoVisualizacionEdit" style={{ minHeight: "0px" }} value={value} size={[12, 12, 12, 12]} />
        }
    });

    interface ISectionColaboradoresProps extends page.IProps {
    };

    let SectionColaboradores: any = global.connect(class extends React.Component<ISectionColaboradoresProps, ISectionColaboradoresProps> {
        constructor(props: ISectionColaboradoresProps) {
            super(props);
            this.onSave = this.onSave.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.data = state.global["catalogo$" + SECTION_COLABORADORES_ID];
            return retValue;
        };

        onSave(): void {
            let state: any = EK.Store.getState();
            let Usuarios: any = getData(state.global[USUARIOS_SELECCIONADOS]);
            if (Usuarios && Usuarios != undefined && Usuarios.length > 0) {
                let formValue = createSuccessfulStoreObject(Usuarios);
                Forms.updateFormElement(PAGE_ID, SECTION_COLABORADORES_ID, formValue);
                this.props.config.setState({ viewMode: true }, SECTION_COLABORADORES_ID);
            }
        };

        shouldComponentUpdate(nextProps: ISectionColaboradoresProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        componentWillReceiveProps(nextProps: ISectionColaboradoresProps, { }): any {
            if (hasChanged(this.props.data, nextProps.data)) {
                if (global.isSuccessful(nextProps.data)) {
                }
            }
        };

        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={SECTION_COLABORADORES_ID}
                parent={config.id}
                title={"Colaboradores"}
                level={1}
                listMode={"literal"}
                style={{paddingTop: "15px"}}
                onSave={this.onSave.bind(this)}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-th-list"
                size={[12, 12, 12, 12]}
                listHeader={
                    <div key="listHeaderKey" style={{ padding: "5px 10px" }}>
                        <Row>
                        </Row>
                    </div>}
                formatter={(index: number, item: any) => {
                    let iniciales: any;
                    iniciales = item.Usuario.Nombre.substr(0, 1) + item.Usuario.Apellidos.substr(0, 1);
                    return <Row style={{ float: "left", margin: "2px" }}>
                        <div>
                            {item.Usuario.Foto === "" ?
                                <div className="img-circle-fixed" style={{ marginLeft: "20px", verticalAlign: "middle", maxWidth: "55px", maxHeight: "55px", width: "45px", height: "45px", background: "#1e7145", color: "white", zIndex: (300), textAlign: "center", justifyContent: "center", alignItems: "center" }}   >
                                    <p title={item.Usuario.Nombre} style={{ paddingTop: "13px", margin: "0px" }}>{iniciales}</p>
                                </div>
                                :
                                <img alt="" title={item.Usuario.Nombre} className="img-circle-fixed" src={item.Usuario.Foto} style={{ marginLeft: "20px", verticalAlign: "middle", maxWidth: "55px", maxHeight: "55px", width: "45px", height: "45px", background: "beige", zIndex: (300), textAlign: "center" }} />
                            }
                        </div>
                    </Row>;
                }}>
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <SGPGruposUsuarios.ViewSGPGruposUsuarios id="ColaboradorForm" idForm={PAGE_ID} idFormSection={SECTION_COLABORADORES_ID} />
                    </Row>
                </Column>
            </page.SectionList>
        };
    });
}