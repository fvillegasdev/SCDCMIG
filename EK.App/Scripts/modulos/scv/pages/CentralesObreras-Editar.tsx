namespace EK.Modules.SCV.Pages.CentralesObreras {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("centralesObreras", "scv");
    let ml: any = config.getML();
    let PAGE_ID = "Centrales Obreras";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
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
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
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

// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
//namespace EK.Modules.SCV.Pages.CentralesObreras {
//    "use strict";
//    const PAGE_ID: string = "centralesObreras";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        obtenerItem?: (id: number) => void;
//        obtenerCatalogo?: () => void;
//        item?: any;
//        params?: IParams;
//        guardar?: (item: any) => void;
//        global?: any;
//        isNew?: boolean;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageCentralesObrerasEditar extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.state = { viewMode: this.props.isNew ? false : true };
//        };

//        static defaultProps: IProps = {
//            global: {},
//            isNew: false
//        };

//        editForm(): void {
//            Forms.remove(PAGE_ID);
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//            if (!this.props.isNew && !this.state.viewMode) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.goBack();
//            }
//        }

//        saveForm(): void {
//            if (!Forms.isValid(PAGE_ID)) {
//                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//                return;
//            };

//            let item: EditForm = Forms.getForm(PAGE_ID);
//            let model: any = item
//                .addNumberConst("ID", getDataID(this.props.item))
//                .addString("Clave")
//                .addString("Descripcion")
//                .addEstatus("Estatus")
//                .toObject();
//            this.props.guardar(model);
//            this.setState({ viewMode: false });
//        };

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.item, nextProps.item)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            setCurrentEntityType(PAGE_ID);
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
//                    }
//                } else {
//                    dispatchFailed("scv-centralesObreras-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("scv-centralesObreras-setSelected", createSuccessfulStoreObject({}));
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
//                success($page.mensajes.exito);
//                this.props.obtenerCatalogo();
//                this.setState({ viewMode: true });
//            };
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.pd, $bc.scv.centralesObreras];

//            let editView: boolean = !this.state.viewMode;
//            let title: IPageTitle;
//            let current: any = this.props.item.data;

//            title = {
//                title: !this.props.isNew ? current.Descripcion : $page.edit.title,
//                subTitle: !this.props.isNew ? current.Clave : "",
//                children: !this.props.isNew ? [EK.UX.Labels.badgeEstatus(current.Estatus)] : null
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
//                            ? <View
//                                item={current} />
//                            : <Edit
//                                isNew={this.props.isNew}
//                                item={current} />
//                        }
//                    </PanelUpdate>
//                </PageV2>
//            return page;
//        };
//    }

//    class $CentralesObrerasEditarPage {
//        static props: any = (state: any): any => {
//            return {
//                item: state.centralesObreras.selected
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerItem: (id: number): void => {
//                dispatchAsync("scv-centralesObreras-setSelected", "CentralesObreras/GetById/" + id);
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("scv-centralesObreras-catalogo", "CentralesObreras(0)");
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "scv-centralesObreras-guardar",
//                    type: HttpMethod.PUT,
//                    url: "CentralesObreras/Save",
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
//            let estatus: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            return <FadeInColumn>
//                <Row>
//                    <Input
//                        id={"ID"}
//                        value={current.ID}
//                        label=""
//                        visible={false} />
//                    <Input id={"Clave"}
//                        label={$page.form.clave.label}
//                        size={[12, 12, 4, 2]}
//                        required={true}
//                        value={current.Clave}
//                        helpLabel={$page.form.clave.helplabel}
//                        maxLength={50}
//                        validations={[
//                            validations.required($page.form.clave.validaciones.requerida)
//                        ]} />
//                    <Input
//                        id={"Descripcion"}
//                        label={$page.form.descripcion.label}
//                        size={[12, 12, 8, 8]}
//                        required={true}
//                        value={current.Descripcion}
//                        helpLabel={$page.form.descripcion.helplabel}
//                        maxLength={150}
//                        validations={[
//                            validations.required($page.form.descripcion.validaciones.requerida)
//                        ]} />
//                    <CheckBoxStatus
//                        id={"Estatus"}
//                        label={$page.form.estatus.label}
//                        xs={{ size: 12 }}
//                        sm={{ size: 12 }}
//                        md={{ size: 12 }}
//                        lg={{ size: 2 }}
//                        required={false}
//                        value={estatus}
//                        helpLabel={$page.form.estatus.helplabel}
//                        disabled={false} />
//                </Row>
//            </FadeInColumn>
//        }
//    }

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

//            return <FadeInColumn>
//                <Row>
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 12, 4, 2]} />
//                    <Label label={$page.form.descripcion.label} value={current.Descripcion} size={[12, 12, 8, 10]} />
//                </Row>
//            </FadeInColumn>
//        }
//    }

//    export let Edicion: any = ReactRedux.connect(
//        $CentralesObrerasEditarPage.props,$CentralesObrerasEditarPage.dispatchs)(ConnectedPageCentralesObrerasEditar);

//    export class Nuevo extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <Edicion isNew={true} />
//        }
//    };
//}