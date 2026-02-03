namespace EK.Modules.SCV.Pages.Categorias {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("categorias", "scv");

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("Catalogo")
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .toObject();

            if (model.Catalogo == undefined) {
                let catalogo: any = {
                    ID: 0, Clave: config.id, Nombre: ""
                };
                model.Catalogo = catalogo;
            };

            config.dispatchEntityBase(model, "base/kontrol/CGValores/save", undefined, global.HttpMethod.PUT);

            return null;
        };

        onWillEntityLoad(id: any, props: page.IProps): void {
            config.dispatchEntityBase({ id }, "base/kontrol/CGValores/id/", undefined, global.HttpMethod.POST);
        };
        onEntitySaved(props: page.IProps): void {
            dispatchDefault("global-current-catalogo", {});
        };
        onDelete(id: any, props: page.IProps): void {
            dispatchAsyncPut("global-current-entity", "/base/scv/CGValores/Delete/", { id });
        };

        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onWillEntityLoad={this.onWillEntityLoad} onEntitySaved={this.onEntitySaved} onDelete={this.onDelete}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id="Categorias"
                        subTitle="Categorias De Agentes"
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 12, 8, 8]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
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
                        id="Categorias"
                        subTitle="Categorias De Agentes"
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};
//namespace EK.Modules.SCV.Pages.Categorias {
//    "use strict";
//    const PAGE_ID: string = "categorias";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        obtenerItem?: (id: number) => void;
//        obtenerCatalogo?: () => void;
//        item?: any;
//        params?: IParams;
//        guardar?: (item: any[]) => void;
//        global?: any;
//        isNew?: boolean;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    class ConnectedEditar extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);

//            setCurrentEntityType(PAGE_ID);

//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: true };
//        }

//        static defaultProps: IProps = {
//            global: {},
//            isNew: false
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();
//            let model: any = item
//                .addNumberConst("ID", getDataID(this.props.item))
//                .addStringConst("ClaveCatalogo", PAGE_ID)
//                .addString("Clave")
//                .addString("Nombre")
//                .addEstatus("Estatus")
//                .toObject();
//            this.props.guardar(model);

//            this.setState({ viewMode: false });
//        }

//        editForm(): void {
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
//                            this.props.obtenerItem(id);
//                        }
//                    } else {
//                        this.props.obtenerItem(id);
//                    };
//                } else {
//                    dispatchFailed("categorias-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("categorias-setSelected", {});
//            }
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
//                success($page.mensajes.save);

//                this.props.obtenerCatalogo();
//                this.setState({ viewMode: true });
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];  /// PAGE_ID 
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.categorias];
//            let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let title: IPageTitle;

//            let current: any = this.props.item.data;
//            if (!this.props.isNew) {
//                let current: any = this.props.item.data;

//                title = {
//                    title: !this.props.isNew ? current.Nombre : $page.edit.titulo,
//                    subTitle: !this.props.isNew ? current.Clave : "",
//                    children: [EK.UX.Labels.badgeEstatus(current.Estatus)]
//                };
//            } else {
//                title = {
//                    title: "",
//                    subTitle: "",
//                    children: null
//                };
//            };

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.item}>
//                        {!editView
//                            ? <View item={current} />
//                            : <Edit isNew={this.props.isNew} item={current} />}
//                    </PanelUpdate>
//                </PageV2 >;
//            return page;
//        }
//    }
    
//    class $categoriasPage {
//        static props: any = (state: any): any => {
//            return {
//                item: state.categorias.selected
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerItem: (id: number): void => {
//                dispatchAsync("categorias-setSelected", "catalogos/get/" + id);
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("categorias-catalogo", "catalogos(CATEGORIAS)");
//            },
//            guardar: (item: any, strUrl: string): void => {
//                dispatch(actionAsync({
//                    action: "categorias-guardar",
//                    type: HttpMethod.PUT,
//                    url: "catalogosgeneralesvalores/save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            }
//        });
//    };

//    export let Edicion: any = ReactRedux.connect($categoriasPage.props, $categoriasPage.dispatchs)(ConnectedEditar);

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
//                <Input id="ID" value={current.ID} label="" visible={false} />
//                <Input
//                    id="Clave"
//                    label={$page.form.clave.label}
//                    size={[12, 6, 6, 2]}
//                    required={true}
//                    value={current.Clave}
//                    helpLabel={$page.form.clave.helplabel}
//                    maxLength={100}
//                    validations={[
//                        validations.required($page.form.clave.validaciones.requerida)
//                    ]} />
//                <Input
//                    id="Nombre"
//                    label={$page.form.nombre.label}
//                    size={[12, 6, 6, 8]}
//                    required={true}
//                    value={current.Nombre}
//                    helpLabel={$page.form.clave.helplabel}
//                    maxLength={300}
//                    validations={[
//                        validations.required($page.form.nombre.validaciones.requerida)
//                    ]} />
//                <CheckBoxStatus
//                    id="Estatus"
//                    label={$page.form.estatus.label}
//                    xs={{ size: 12 }}
//                    sm={{ size: 6 }}
//                    md={{ size: 6 }}
//                    lg={{ size: 2 }}
//                    required={false}
//                    value={Status}
//                    helpLabel={$page.form.estatus.helplabel}
//                    disabled={false}
//                    style={{ marginTop: 25 }} />
//            </FadeInColumn>;
//        };
//    }
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IViewProps extends React.Props<any> {
//        item: any;
//    };

//    class View extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let Status: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 10, 10, 2]} />
//                    <Label label={$page.form.nombre.label} value={current.Nombre} size={[12, 12, 12, 10]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}
