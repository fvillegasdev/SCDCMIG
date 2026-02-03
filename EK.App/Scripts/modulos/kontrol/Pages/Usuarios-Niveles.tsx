//namespace EK.Modules.Kontrol.Pages.Usuarios {
//    "use strict";
//    const PAGE_ID: string = "usuarios$niveles";
//    const config: page.IPageConfig = global.createPageConfig("usuarios$niveles", "kontrol");

//    export const Niveles: any = page.connect(class extends page.Base {
//        saveForm(props: page.IProps, item: EditForm): any {
//            let model: any = item
//                .addID()
//                .addObject("Usuario")
//                .addObject("Proveedor")
//                .addNumber("LimitePagare")
//                .addBoolean("Comisionable")
//                .addBoolean("AsesorCredito")
//                .addEstatus()
//                .addVersion()
//                .toObject();

//            return model;
//        };
//        onWillEntityLoad(id: any, props: page.IProps): void {
//            if (id === "?nuevo") {
//                let newEntity: any = { ID: -1 };
//                config.setEntity(newEntity);
//                config.setState({ viewMode: false, isNew: true });
//            }
//            else {
//                config.dispatchEntityBase({ id }, "usuario/agente", undefined, global.HttpMethod.POST);
//            };
//        };
//        onEntityLoaded(props: page.IProps): any {
//            let agente: any = getData(props.entidad);
//            let idAgente: any = getDataID(props.entidad);

//            props.config.setEntity(agente.Usuario, USUARIOS_ID);
//        };
//        render(): JSX.Element {
//            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}
//                onWillEntityLoad={this.onWillEntityLoad} onEntityLoaded={this.onEntityLoaded} idKeyEntidad="IdUsuario">
//                <View />
//                <Edit />
//            </page.Main>;
//        };
//    });
//    const Edit = page.connect(class extends page.Base {
//        render(): JSX.Element {
//            return <page.Edit>
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <OptionSection id="Info" icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
//                            <Row>
//                                <Column size={[12, 6, 6, 6]}>
//                                    <label.Custom id="Nombre" idForm={USUARIOS_ID} size={[6, 6, 6, 6]} value={(item: any) => {
//                                        return !item ? "" : item.Nombre + " " + item.Apellidos;
//                                    }} />
//                                    <label.Estatus idForm={USUARIOS_ID} size={[12, 3, 3, 3]} />
//                                    <label.Boolean idForm={USUARIOS_ID} id="Bloqueado" size={[12, 3, 3, 3]} />
//                                    <label.Clave idForm={USUARIOS_ID} size={[12, 6, 6, 6]} />
//                                    <label.Fecha idForm={USUARIOS_ID} id="VigenciaInicio" size={[6, 3, 3, 3]} />
//                                    <label.Fecha id="VigenciaFin" idForm="Usuario" size={[6, 3, 3, 3]} />
//                                </Column>
//                                <Column size={[12, 6, 6, 6]}>
//                                    <OptionSection id="Agente" icon="fa fa-th" hideCollapseButton={true} collapsed={false} level={1}>
//                                        <Row>
//                                            <Column size={[12, 12, 12, 12]}>
//                                                <checkBox.CheckBox id="Comisionable" label="Comisionable" size={[4, 4, 4, 4]} />
//                                                <checkBox.CheckBox id="AsesorCredito" label="Asesor de Crédito" size={[4, 4, 4, 4]} />
//                                                <checkBox.Status label={"Estatus"} size={[4, 4, 4, 4]} />
//                                                <ProveedoresSelect id="Proveedor" size={[12, 8, 8, 8]} />
//                                                <input.Currency id="LimitePagare" label="Límite de Pagaré" size={[6, 4, 4, 4]} />
//                                            </Column>
//                                        </Row>
//                                    </OptionSection>
//                                </Column>
//                            </Row>
//                        </OptionSection>
//                    </Column>
//                </Row>
//            </page.Edit>;
//        };
//    });
//    class View extends page.Base {
//        render(): JSX.Element {
//            return <page.View>
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <OptionSection id="Info" icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
//                            <Row>
//                                <Column size={[12, 6, 6, 6]}>
//                                    <label.Custom id="Nombre" idForm={USUARIOS_ID} size={[6, 6, 6, 6]} value={(item: any) => {
//                                        return !item ? "" : item.Nombre + " " + item.Apellidos;
//                                    }} />
//                                    <label.Estatus idForm={USUARIOS_ID} size={[12, 3, 3, 3]} />
//                                    <label.Boolean id="Bloqueado" idForm={USUARIOS_ID} size={[12, 3, 3, 3]} />
//                                    <label.Clave idForm={USUARIOS_ID} size={[12, 6, 6, 6]} />
//                                    <label.Fecha id="VigenciaInicio" idForm={USUARIOS_ID} size={[6, 3, 3, 3]} />
//                                    <label.Fecha id="VigenciaFin" idForm={USUARIOS_ID} size={[6, 3, 3, 3]} />
//                                </Column>
//                                <Column size={[12, 6, 6, 6]}>
//                                    <OptionSection id="Agente" icon="fa fa-th" hideCollapseButton={true} collapsed={false} level={1}>
//                                        <Row>
//                                            <Column size={[12, 12, 12, 12]}>
//                                                <label.Boolean id="Comisionable" label="Comisionable" size={[6, 4, 4, 4]} />
//                                                <label.Boolean id="AsesorCredito" label="Asesor de Crédito" size={[6, 4, 4, 4]} />
//                                                <label.Estatus id="Estatus" label={"Estatus"} size={[6, 4, 4, 4]} />
//                                                <label.Entidad id="Proveedor" label="Proveedor" size={[12, 8, 8, 8]} />
//                                                <label.Label id="LimitePagare" label="Límite de Pagaré" size={[6, 4, 4, 4]} labelType="Money" />
//                                            </Column>
//                                        </Row>
//                                    </OptionSection>
//                                </Column>
//                            </Row>
//                        </OptionSection>
//                    </Column>
//                </Row>
//            </page.View>;
//        };
//    };


//    interface INivelesProps extends React.Props<any> {
//        data?: any;
//        entidad?: any;
//        claveEntidad?: string;
//        niveles?: any;
//        nivelesAsignados?: any;
//        params?: { id: number; };
//        obtenerDatos: (idUsuario: number) => any;
//        actualizarDatos: (niveles: any) => any;
//        saveConfiguracionNiveles: (niveles: any) => any;
//        cargaUsuario?: (idUsuario: number) => void;
//    };

//    class NivelesForm extends React.Component<INivelesProps, INivelesProps> {
//        constructor(props: INivelesProps) {
//            super(props);

//            this.onCancelEditForm = this.onCancelEditForm.bind(this);
//            this.onSaveForm = this.onSaveForm.bind(this);
//            this.onNivelClick = this.onNivelClick.bind(this);
//            this.onSaveNiveles = this.onSaveNiveles.bind(this);
//        }

//        onNivelClick(item: any): any {
//            let nivelesAsignados: any[] = getData(this.props.nivelesAsignados);

//            let niveles: any[] = nivelesAsignados.map((value: any, index: number) => {
//                let idNivel: number = value.idCompania === item.item.idCompania ? item.nivel.ID : value.idNivel;
//                let nombreNivel: string = value.idCompania === item.item.idCompania ? item.nivel.Nivel : value.Nivel.Nivel;

//                return {
//                    ID: value.ID,
//                    idCompania: value.idCompania,
//                    idNivel: idNivel,
//                    Compania: {
//                        ID: value.Compania.ID,
//                        Clave: value.Compania.Clave,
//                        Nombre: value.Compania.Nombre
//                    },
//                    Nivel: {
//                        ID: idNivel,
//                        Nivel: nombreNivel
//                    }
//                };
//            });

//            this.props.actualizarDatos(niveles);
//        };

//        onSaveNiveles(): any {
//            this.props.saveConfiguracionNiveles(
//                {
//                    idUsuario: getDataID(this.props.entidad),
//                    niveles: getData(this.props.nivelesAsignados)
//                }
//            );
//        };

//        onCancelEditForm(): void {
//            ReactRouter.hashHistory.goBack();
//        }

//        onSaveForm(): void {
//            ReactRouter.hashHistory.goBack();
//        }

//        componentDidMount(): void {
//            if (isSuccessful(this.props.niveles)) { } else {
//                requireGlobal(Catalogos.niveles);
//            }

//            if (this.props.params.id) {
//                if (isSuccessful(this.props.entidad)) {
//                    this.props.obtenerDatos(this.props.entidad.data.ID);
//                } else {
//                    this.props.cargaUsuario(Number(this.props.params.id));
//                };
//            } else {
//                dispatchFailed("usuarios-setSelected", null);
//            }
//        }

//        componentDidUpdate(prevProps: INivelesProps) {
//            if (isSuccessful(this.props.entidad)) {
//                if (isLoadingOrSuccessful(this.props.nivelesAsignados)) { } else {
//                    this.props.obtenerDatos(this.props.entidad.data.ID);
//                }
//            };

//            if (isUpdating(prevProps.nivelesAsignados)) {
//                if (isSuccessful(this.props.nivelesAsignados)) {
//                    success($ml.usuarios.niveles.guardado);
//                }
//            }
//        }

//        render(): JSX.Element {
//            let bc: any = [$ml.bc.global.ek, $ml.bc.kontrol.cg, $ml.bc.kontrol.usuarios, $ml.bc.kontrol.niveles];

//            let entidad: any = this.props.entidad;
//            let current: any = entidad.data;

//            let niveles: any[] = this.props.niveles.data;
//            let companiasNiveles: any = this.props.nivelesAsignados;
//            let mensajeActualizacion: string = isUpdating(companiasNiveles) ? $ml.usuarios.niveles.guardando : $ml.usuarios.niveles.leyendo;

//            let loadingObj: any = !isSuccessful(this.props.entidad) ? this.props.entidad : companiasNiveles;
//            let title: any = {
//                title: current.Nombre,
//                subTitle: ["<", current.Email, ">"].join(""),
//                children: [EK.UX.Labels.badgeEstatus(current.Estatus), EK.UX.Labels.badgeBloqueado(current.Bloqueado)]
//            };

//            // create the page component
//            let page: JSX.Element = <PageV2 id={PAGE_ID} title={title} breadcrumb={bc}>
//                <PageButtons>
//                    <Usuarios$Niveles$SaveButton onClick={this.onSaveNiveles} />
//                    <CancelButton onClick={this.onCancelEditForm} />
//                </PageButtons>
//                <Row style={{ marginBottom: 35 }}>
//                    <Column size={[12, 12, 12, 12]}>
//                        <OptionSection title="Asignación de niveles" collapsed={false} readOnly={false}>
//                            <Row>
//                                <UpdateColumn info={companiasNiveles} text={mensajeActualizacion}>
//                                    <Column size={[12, 12, 12, 12]}>
//                                        <List items={companiasNiveles}
//                                            readonly={false}
//                                            addRemoveButton={false}
//                                            formatter={(index: number, item: any) => {
//                                                let buttonClass: string = "btn btn-danger btn-sm dropdown-toggle";
//                                                let selectedItem: string = $ml.usuarios.niveles.noAsignado;

//                                                if (item.idNivel !== undefined && item.idNivel !== null) {
//                                                    selectedItem = item.Nivel.Nivel;
//                                                    buttonClass = "btn btn-default btn-sm dropdown-toggle";
//                                                }

//                                                return <div style={{ height: 36, paddingTop: 2 }}>
//                                                    <div style={{ float: "left", paddingLeft: 5, width: "50%" }}>
//                                                        {item.Compania.Nombre}</div>
//                                                    <div style={{ float: "right", width: "45%" }}>
//                                                        <div className="btn-group" style={{ width: "100%" }}>
//                                                            <button className={buttonClass} aria-expanded="false" type="button" data-toggle="dropdown" style={{ width: "100%", textAlign: "left" }}>
//                                                                {selectedItem}
//                                                                <i className="fa fa-angle-down"></i>
//                                                            </button>
//                                                            <ul className="dropdown-menu" role="menu" style={{ height: 200, width: "100%", overflow: "hidden", overflowY: "scroll" }}>
//                                                                <li key={0}><Link onClick={this.onNivelClick} info={{ item: item, nivel: { ID: null, Nivel: null } }} text={$ml.usuarios.niveles.noAsignado}></Link></li>
//                                                                <li className="divider"> </li>
//                                                                {niveles.map((value: any, index: any) => {
//                                                                    return <li key={index}><Link onClick={this.onNivelClick} info={{ item: item, nivel: value }} text={value.Nivel}></Link></li>;
//                                                                })}
//                                                            </ul>
//                                                        </div>
//                                                    </div>
//                                                </div>
//                                            } }
//                                            />
//                                    </Column>
//                                </UpdateColumn>
//                            </Row>
//                        </OptionSection>
//                    </Column>
//                </Row>
//            </PageV2>;

//            return page;
//        };
//    };

//    const mapNSButtonProps: any = (state: any) => {
//        return {
//            visible: state.usuarios.configuracionNiveles.data.length > 0
//        };
//    };

//    const mapNivelesProps: any = (state: any): any => {
//        return {
//            entidad: state.usuarios.selected,
//            claveEntidad: EK.Global.ClaveCatalogos.USUARIOS,
//            nivelesAsignados: state.usuarios.configuracionNiveles,
//            niveles: state.global.NIVELES ? state.global.NIVELES : createDefaultStoreObject({})
//        };
//    };

//    const mapNivelesDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargaUsuario: (idUsuario: number): void => {
//                dispatchAsync("usuarios-setSelected", "Usuarios/GetById/" + idUsuario);
//            },
//            obtenerDatos: (idUsuario: number): any => {
//                dispatchAsync("usuarios-configuracion-niveles", "usuarios(" + idUsuario + ")/configuracion/niveles");
//            },
//            actualizarDatos: (niveles: any): any => {
//                dispatchSuccessful("usuarios-configuracion-niveles", niveles);
//            },
//            saveConfiguracionNiveles(niveles: any) {
//                dispatch(actionAsync({
//                    action: "usuarios-cn-save",
//                    type: HttpMethod.PUT,
//                    url: "usuarios/SaveNiveles",
//                    data: niveles,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            }
//        };
//    };

//    export let Usuarios$Niveles$SaveButton: any = ReactRedux.connect(mapNSButtonProps, null)(EK.UX.Buttons.SaveButton);
//    export let Usuario$Niveles: any = ReactRedux.connect(mapNivelesProps, mapNivelesDispatchs)(NivelesForm);
//};