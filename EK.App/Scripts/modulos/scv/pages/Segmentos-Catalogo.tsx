namespace EK.Modules.SCV.Pages.Segmentos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("segmentos", "scv");
    let PAGE_ID = "Segmentos de Vivienda";

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addString("Descripcion")
                .addVersion()
                .addNumber("IdContable")
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
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 10, 10]} maxLength={150} validations={[validations.required()]} />
                            <Input id="Descripcion" size={[12, 8, 8, 8]} maxLength={150} />
                            <input.IdContable size={[12, 2, 2, 2]} validations={[validations.required()]}/>
                            <checkBox.Status id="Estatus" size={[12, 12, 2, 2]} />
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
                        icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 10, 10]} />
                            <Label id="Descripcion" size={[12, 8, 8, 8]} />
                            <Label id="IdContable" size={[12, 2, 2, 2]} />
                            <label.Estatus id="Estatus" size={[12, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>

            </page.View>;
        };
    };
}


//namespace EK.Modules.SCV.Pages.Segmentos {
//    "use strict";
//    const PAGE_ID: string = "segmentos";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        item?: any;
//        params?: IParams;
//        guardar?: (item: any[]) => void;
//        isNew?: boolean;
//        global?: any;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarSegmentos extends React.Component<IProps, IState> {
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
//                .addString("Descripcion")
//                .addString("IdContable")
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
//                            this.props.cargarDatos(id);
//                        }
//                    } else {
//                        this.props.cargarDatos(id);
//                    }
//                    this.props.cargarDatos(id);
//                } else {
//                    dispatchFailed("segmentos-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("segmentos-setSelected", {});
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
//                this.setState({ viewMode: true });
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.segmentos];
//            let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let current: any = this.props.item.data;

//            let title: IPageTitle = {
//                title: !this.props.isNew ? current.Descripcion : $page.edit.titulo,
//                subTitle: !this.props.isNew ? current.ID : "",
//                children: [EK.UX.Labels.badgeEstatus(current.Estatus)]
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
//                            ? <View item={current} />
//                            : <Edit
//                                isNew={this.props.isNew}
//                                item={current}
//                                />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    class $segmentosPage {
//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.segmentos.selected
//            };
//        };

//        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            cargarDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "segmentos-setSelected",
//                    url: "segmentos(" + id + ")"
//                }));
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "segmentos-guardar",
//                    type: HttpMethod.PUT,
//                    url: "segmentos/save",
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
//    export let Edicion: any = ReactRedux.connect($segmentosPage.mapProps, $segmentosPage.mapDispatchs)(ConnectedPageEditarSegmentos);

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
//                    id="Descripcion"
//                    label={$page.form.descripcion.label}
//                    size={[12, 12, 8, 8]}
//                    required={true}
//                    value={current.Descripcion}
//                    helpLabel={$page.form.descripcion.helplabel}
//                    maxLength={300}
//                    validations={[
//                        validations.required($page.form.descripcion.validaciones.requerida)
//                    ]} />
//                <Input
//                    id="IdContable"
//                    label={$page.form.idcontable.label}
//                    size={[12, 12, 2, 2]}
//                    required={true}
//                    value={current.IdContable}
//                    helpLabel={$page.form.idcontable.helplabel}
//                    maxLength={4} />
//                <CheckBoxStatus
//                    id="Estatus"
//                    label={$page.form.estatus.label}
//                    xs={{ size: 12 }}
//                    sm={{ size: 12 }}
//                    md={{ size: 2 }}
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
//            let current: any = this.props.item;
//            let $page: any = $ml[PAGE_ID];
//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.descripcion.label} value={current.Descripcion} size={[12, 12, 12, 10]} />
//                    <Label label={$page.form.idcontable.label} value={current.IdContable} size={[12, 10, 10, 2]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}