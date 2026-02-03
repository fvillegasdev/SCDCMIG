namespace EK.Modules.SCV.Pages.MotivosCancelacion {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("motivoscancelacion", "scv");
    let PAGE_ID = "Motivos de Cancelación";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
               // .addNumber("Porcentaje")
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
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 7, 7]} maxLength={150} validations={[validations.required()]} />
                            <checkBox.Status  size={[12, 12, 3, 3]} />
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
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 7, 7]} />
                            <label.Estatus  size={[12, 12, 3, 3]} />
                        </Row>
                    </page.OptionSection>
                </Column>

            </page.View>;
        };
    };
};

//namespace EK.Modules.SCV.Pages.MotivosCancelacion {
//    "use strict";
//    const PAGE_ID: string = "motivoscancelacion";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        obtenerDatos?: (id: number) => void;
//        obtenerCatalogo?: () => void;
//        item?: any;
//        params?: IParams;
//        guardar?: (item: any[]) => void;
//        isNew?: boolean;
//        global?: any;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarMotivosCancelacion extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);
            

//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: this.props.isNew ? false : true };
//          //  this.state = { viewMode: true };
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
//                .addString("Abrev")
//                .addNumber("Porcentaje")
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
//                            this.props.obtenerDatos(id);
//                        }
//                    } else {
//                        this.props.obtenerDatos(id);
//                    }
//                    this.props.obtenerDatos(id);
//                } else {
//                    dispatchFailed("scv-motivosCancelacion-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("scv-motivosCancelacion-setSelected", {});
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
//                this.setState({ viewMode: true });
//                this.props.obtenerCatalogo();
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.motivos];
//            let editView: boolean = !this.state.viewMode;
//           // let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let current: any = this.props.item.data;

//            let title: IPageTitle = {
//                title: !this.props.isNew ? current.Descripcion : $page.edit.titulo,
//                subTitle: !this.props.isNew ? current.Abrev : "",
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
//                            />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    class $motivosCancelacionPage {
//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.motivoscancelacion.selected
//                //state.estatusubicacion.catalogo
//            };
//        };
//        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "scv-motivosCancelacion-setSelected",
//                    url: "motivos/GetById/" + id
//                }));
//            },
//            obtenerCatalogo: (): any => {
//                    dispatchAsync("scv-motivosCancelacion-catalogo", "motivos(0,0)");
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "scv-motivosCancelacion-guardar",
//                    type: HttpMethod.PUT,
//                    url: "motivos/Save",
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
//    export let Edicion: any = ReactRedux.connect($motivosCancelacionPage.mapProps, $motivosCancelacionPage.mapDispatchs)(ConnectedPageEditarMotivosCancelacion);

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
//                    id="Abrev"
//                    label={$page.form.abrev.label}
//                    size={[12, 12, 3, 3]}
//                    required={true}
//                    value={current.Abrev}
//                    helpLabel={$page.form.abrev.helplabel}
//                    maxLength={4} />
//                <Input
//                    id="Descripcion"
//                    label={$page.form.descripcion.label}
//                    size={[12, 12, 6, 6]}
//                    required={true}
//                    value={current.Descripcion}
//                    helpLabel={$page.form.descripcion.helplabel}
//                    maxLength={150}
//                    validations={[
//                        validations.required($page.form.descripcion.validaciones.requerida)
//                    ]} />
//                <Input
//                    id="Porcentaje"
//                    label={$page.form.porcentaje.label}
//                    size={[12, 12, 1, 1]}
//                    required={true}
//                    value={current.Porcentaje}
//                    helpLabel={$page.form.porcentaje.helplabel}
//                    maxLength={5}
//                    validations={[
//                        validations.isNumber($page.form.porcentaje.validaciones.requerida)
//                    ]}
//                />
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
//            let current: any = this.props.item;
//            let $page: any = $ml[PAGE_ID];
//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.abrev.label} value={current.Abrev} size={[12, 12, 3, 3]} />
//                    <Label label={$page.form.descripcion.label} value={current.Descripcion} size={[12, 12, 6, 6]} />
//                    <Label label={$page.form.porcentaje.label} value={current.Porcentaje} size={[12, 12, 1, 1]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/

//}