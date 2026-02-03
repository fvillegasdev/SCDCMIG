namespace EK.Modules.SCV.Pages.Instituciones {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("instituciones", "scv");
    let PAGE_ID = "Instituciones de Crédito";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addString("Clave")
                .addString("Nombre")
                .addEstatus("Estatus")
                //.addObject("Esquemas")
                .addVersion()
                .toObject();
            return model;
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;

        };
    };
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>            
                            <input.Clave id="Clave" url="base/scv/Instituciones/exists/Exists" size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={50} />
                            <checkBox.Status size={[12, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};
    
//namespace EK.Modules.SCV.Pages.Instituciones {
//    "use strict";
//    const PAGE_ID: string = "instituciones";
//    const PAGE_ID_ESQUEMAS_FORM: string = "instituciones$Esquemas";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        obtenerDatos?: (id: number) => void;
//        item?: any;
//        params?: IParams;
//        guardar?: (item: any[]) => void;
//        isNew?: boolean;
//        global?: any;
//        obtenerCatalogo?: () => void;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarInstituciones extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);

//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: this.props.isNew ? false : true };
//        }

//        static defaultProps: IProps = {
//            global: {},
//            isNew: false
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();
//            let model: any = item
//                .addNumberConst("ID", getDataID(this.props.item))
//                .addString("Clave")
//                .addString("Descripcion")
//                .addEstatus("Estatus")
//                .addObject("Esquemas")
//                .toObject();
//            this.props.guardar(model);
//            this.setState({ viewMode: false });
//        }

//        editForm(): void {
//            Forms.remove(PAGE_ID);
//            Forms.createFormElement(PAGE_ID, "Esquemas", getData(this.props.item).Esquemas);
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//            if (!this.props.isNew && !this.state.viewMode) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.goBack();
//            }
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.item, nextProps.item)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);
//            if (!this.props.isNew) {
//                let id: number = Number(this.props.params.id);
//                if (id) {
//                    if (isSuccessful(this.props.item)) {
//                        if (id !== getDataID(this.props.item)) {
//                            this.props.obtenerDatos(id);
//                        }
//                    } else {
//                        this.props.obtenerDatos(id);
//                    }
//                    this.props.obtenerDatos(id);
//                } else {
//                    dispatchFailed("instituciones-setSelected", null);
//                    dispatchFailed("instituciones-esquemas", null);
//                    dispatchFailed("instituciones-esquemas-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("instituciones-setSelected", createSuccessfulStoreObject({}));
//                dispatchSuccessful("instituciones-esquemas", []);
//                dispatchSuccessful("instituciones-esquemas-setSelected", createSuccessfulStoreObject({}));
//            }
//            setCurrentEntityType(PAGE_ID);
//        };

//        componentWillReceiveProps(nextProps: IProps) {
//            if (hasChanged(this.props.item, nextProps.item)) {
//                if (isSuccessful(nextProps.item)) {
//                    setCurrentEntity(nextProps.item);
//                };
//            };
//        };

//        componentDidUpdate(prevProps: IProps, prevState: IState): any {
//            let $page: any = $ml[PAGE_ID];
//            if (wasUpdated(prevProps.item, this.props.item)) {
//                success($page.mensajes.exito);
//                this.setState({ viewMode: true});
//                this.props.obtenerCatalogo();
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.instituciones];
//            let editView: boolean = !this.state.viewMode;
//            let current: any = this.props.item.data;

//            let title: IPageTitle = {
//                title: !this.props.isNew ? current.Descripcion : $page.edit.titulo,
//                subTitle: !this.props.isNew ? current.NombreCorto : "",
//                children: [EK.UX.Labels.badgeEstatus(current.Estatus)]
//            };

//            let esquemas: any;
//            if (isSuccessful(this.props.item)) {
//                esquemas = createSuccessfulStoreObject(getData(this.props.item).Esquemas);
//            };

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.item}>
//                        {!editView
//                            ? <View 
//                                item={current}
//                                esquemas={esquemas} />
//                            : <Edit
//                                isNew={this.props.isNew}
//                                item={current} />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    class $institucionesPage {
//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.instituciones.selected
//            };
//        };

//        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "instituciones-setSelected",
//                    url: "instituciones/GetById/" + id
//                }));
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("instituciones-catalogo", "instituciones(0,0)");
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "instituciones-guardar",
//                    type: HttpMethod.PUT,
//                    url: "instituciones/Save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            }
//        });
//    }
//    export let Edicion: any = ReactRedux.connect($institucionesPage.mapProps, $institucionesPage.mapDispatchs)(ConnectedPageEditarInstituciones);

//    /*** BEGIN: NEW FORM ***/
//    export class Nuevo extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <Edicion isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        item: any;
//        isNew?: boolean;
//    };

//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
//        };

//        refs: {
//            form: any;
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            return <FadeInColumn>
//                <Row>
//                    <Input id="ID" value={current.ID} label="" visible={false} />
//                    <Input
//                        id="Clave"
//                        label={$page.form.clave.label}
//                        size={[12, 6, 6, 2]}
//                        required={true}
//                        value={current.Clave}
//                        helpLabel={$page.form.clave.helplabel}
//                        maxLength={50}
//                        validations={[
//                            validations.required($page.form.clave.validaciones.requerida)
//                        ]} />
//                    <Input
//                        id="Descripcion"
//                        label={$page.form.descripcion.label}
//                        size={[12, 6, 6, 8]}
//                        required={true}
//                        value={current.Descripcion}
//                        helpLabel={$page.form.descripcion.helplabel}
//                        maxLength={150}
//                        validations={[
//                            validations.required($page.form.descripcion.validaciones.requerida)
//                        ]} />
//                    <CheckBoxStatus
//                        id="Estatus"
//                        label={$page.form.estatus.label}
//                        xs={{ size: 12 }}
//                        sm={{ size: 12 }}
//                        md={{ size: 12 }}
//                        lg={{ size: 2 }}
//                        required={false}
//                        value={Status}
//                        helpLabel={$page.form.estatus.helplabel}
//                        disabled={false} />
//                </Row>
//                <Row>
//                    <Column size={[12, 12, 12, 6]}>
//                        <EditEsquemas />
//                    </Column>
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IViewProps extends React.Props<any> {
//        item: any;
//        esquemas: any;
//    };

//    class View extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }

//        render(): JSX.Element {
//            let current: any = this.props.item;
//            let $page: any = $ml[PAGE_ID];
//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 12, 6, 2]} />
//                    <Label label={$page.form.descripcion.label} value={current.Descripcion} size={[12, 12, 6, 10]} />
//                </Row>
//                <Row>
//                    <Column size={[12, 12, 12, 6]}>
//                        <OptionSection title={$page.form.section.instituciones$Esquemas.titulo} collapsed={false} readOnly={true}>
//                            <PanelUpdate info={this.props.esquemas}>
//                                <List
//                                    items={this.props.esquemas}
//                                    readonly={true}
//                                    addRemoveButton={false}
//                                    dragAndDrop={false}
//                                    listHeader={ListHeader.getListHeader($page)}
//                                    formatter={(index: number, item: any) => {
//                                        return <Row style={{ alignItems: "center", display: "flex", padding: 10 }}>
//                                            <Column size={[3, 3, 3, 3]} style={{ fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                                <div>{item.Esquema.Clave}</div>
//                                            </Column>
//                                            <Column size={[6, 6, 6, 6]} style={{ fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                                <div>{item.Esquema.Nombre}</div>
//                                            </Column>
//                                            <Column size={[3, 3, 3, 3]} style={{ fontWeight: 400 }}>
//                                                <div>{""}</div>
//                                            </Column>
//                                        </Row>;
//                                    } } />
//                            </PanelUpdate>
//                        </OptionSection>
//                    </Column>
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/

//    class ListHeader {
//        static getListHeader($page: any): JSX.Element {
//            let header: JSX.Element =
//                <Row style={{ paddingTop: 5, paddingBottom: 5, marginRight: 10, marginLeft: 10 }}>
//                    <Column size={[3, 3, 3, 3]}>
//                        <span style={{ fontWeight: 600 }}>{$page.form.section.instituciones$Esquemas.list.headers.clave}</span>
//                    </Column>
//                    <Column size={[6, 6, 6, 6]}>
//                        <span style={{ fontWeight: 600 }}>{$page.form.section.instituciones$Esquemas.list.headers.esquema}</span>
//                    </Column>
//                    <Column size={[3, 3, 3, 3]}>
//                        <span style={{ fontWeight: 600 }}>{$page.form.section.instituciones$Esquemas.list.headers.opciones}</span>
//                    </Column>
//                </Row>
//            return header;
//        }
//    }

//    interface IEditEsquemasProps extends React.Props<any> {
//        esquemas: DataElement;
//        form: any;
//        esquema: any;
//        removeSelectedEsquema?: () => void;
//        setSelectedEsquema?: (item: any) => void;
//    }

//    class Edit$Esquemas extends React.Component<IEditEsquemasProps, {}> {
//        constructor(props: IEditEsquemasProps) {
//            super(props);
//            this.onClickNew = this.onClickNew.bind(this);
//            this.onClickCancel = this.onClickCancel.bind(this);
//            this.onClickSelectEsquema = this.onClickSelectEsquema.bind(this);
//            this.onClickRemoveEsquema = this.onClickRemoveEsquema.bind(this);
//            this.updateEsquemas = this.updateEsquemas.bind(this);
//            this.onClickSave = this.onClickSave.bind(this);
//        }

//        static props: any = (state: any) => ({
//            esquema: state.instituciones.esquemaSelected,
//            form: state.forms,
//            esquemas: Forms.getDataValue("Esquemas", PAGE_ID, state, [])
//        });

//        onClickNew(): void {
//            let newId: number = 0;
//            let esquemas: any[] = getData(this.props.esquemas);

//            esquemas.forEach((value: any, index: number) => {
//                if (value.ID <= 0) {
//                    if (value.ID < newId) {
//                        newId = value.ID;
//                    };
//                };
//            });
//            newId--;

//            /*** Validar los atributos del nuevo item ***/
//            let item: any = {
//                ID: newId,
//                Esquema: createDefaultStoreObject({})
//            };

//            Forms.remove(PAGE_ID_ESQUEMAS_FORM);
//            this.props.setSelectedEsquema(item);
//        };

//        onClickCancel(): void {
//            this.props.removeSelectedEsquema();
//        };

//        onClickSelectEsquema(item: any): void {
//            Forms.remove(PAGE_ID_ESQUEMAS_FORM);
//            this.props.setSelectedEsquema(item);
//        };

//        updateEsquemas(items: any): void {
//            Forms.updateFormElement(PAGE_ID, "Esquemas", items);
//        };

//        onClickRemoveEsquema(item: any): void {
//            if (isSuccessful(this.props.esquemas)) {
//                let items: any[] = getData(this.props.esquemas.removeItem(item));
//                this.updateEsquemas(items);
//            };
//        };

//        onClickSave(): void {
//            let $page: any = $ml[PAGE_ID];

//            if (!Forms.isValid(PAGE_ID_ESQUEMAS_FORM)) {
//                warning($page.mensajes.warning);
//                return;
//            };

//            let item: EditForm = Forms.getForm(PAGE_ID_ESQUEMAS_FORM);
//            let esquema: any = item
//                .addNumber("ID")
//                .addObject("Esquema")
//                .toObject();

//            esquema = EK.Global.assign(esquema, {
//                Esquema: esquema.Esquema
//            });

//            if (this.props.esquemas) {
//                let items: any[] = getData(this.props.esquemas.upsertItem(esquema));
//                this.props.removeSelectedEsquema();
//                this.updateEsquemas(items);
//            };
//        }

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            removeSelectedEsquema: (): void => {
//                dispatchDefault("instituciones-esquemas-setSelected", {});
//            },
//            setSelectedEsquema: (item: any): void => {
//                dispatchSuccessful("instituciones-esquemas-setSelected", item);
//            }
//        });

//        shouldComponentUpdate(nextProps: IEditEsquemasProps, {}): boolean {
//            return (hasChanged(this.props.esquema, nextProps.esquema)) ||
//                (hasChanged(this.props.esquemas, nextProps.esquemas));
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let items: DataElement;
//            if (isSuccessful(this.props.esquemas)) {
//                items = this.props.esquemas.getActiveItems();
//            }
//            let esquemaBeingEdited: boolean = isSuccessful(this.props.esquema);
//            let model: any = getData(this.props.esquema);

//            return <OptionSection
//                collapsed={false}
//                title={$page.form.section.instituciones$Esquemas.titulo}
//                editMode={esquemaBeingEdited}>
//                <SectionView onAddNew={this.onClickNew}>
//                    <List
//                        items={items}
//                        readonly={false}
//                        listHeader={ListHeader.getListHeader($page)}
//                        addRemoveButton={false}
//                        dragAndDrop={false}
//                        formatter={(index: number, item: any) => {
//                            return <Row style={{ alignItems: "center", display: "flex", marginRight: 5, marginLeft: 5, paddingBottom: 5, paddingTop: 5 }}>
//                                <Column size={[3, 3, 3, 3]} style={{ fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                    <span style={{ fontWeight: 400 }}>{item.Esquema.Clave}</span>
//                                </Column>
//                                <Column size={[6, 6, 6, 6]} style={{ fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                    <span style={{ fontWeight: 400 }}>{item.Esquema.Nombre}</span>
//                                </Column>
//                                <Column size={[3, 3, 3, 3]} style={{ textAlign: "center" }}>
//                                    <Button className="btn-sm-ek" onClick={this.onClickSelectEsquema} info={item} icon="icon-pencil"></Button>
//                                    <Button className="btn-sm-ek" onClick={this.onClickRemoveEsquema} info={item} icon="icon-trash"></Button>
//                                </Column>
//                            </Row>;
//                        } } />
//                </SectionView>
//                <SectionEdit
//                    idForm={PAGE_ID_ESQUEMAS_FORM}
//                    onCancel={this.onClickCancel}
//                    onSave={this.onClickSave}>
//                    <Row>
//                        <Column size={[12, 12, 12, 12]}>
//                            <Row>
//                                <Input
//                                    id={"ID"}
//                                    idFormSection={PAGE_ID_ESQUEMAS_FORM}
//                                    value={model.ID}
//                                    label={""}
//                                    visible={false} />
//                                <SCVEsquemasDDL
//                                    id={"Esquema"}
//                                    idFormSection={PAGE_ID_ESQUEMAS_FORM}
//                                    label={$page.form.section.instituciones$Esquemas.form.esquema.label}
//                                    size={[12, 12, 12, 12]}
//                                    required={true}
//                                    value={model.Esquema}
//                                    helpLabel={$page.form.section.instituciones$Esquemas.form.esquema.helplabel}
//                                    validations={[
//                                        validations.required($page.form.section.instituciones$Esquemas.form.esquema.validaciones.requerida)
//                                    ]} />
//                            </Row>
//                        </Column>
//                    </Row>
//                </SectionEdit>
//            </OptionSection>
//        }
//    }

//    const EditEsquemas: any =
//        ReactRedux.connect(Edit$Esquemas.props, Edit$Esquemas.dispatchs)(Edit$Esquemas);
//}