namespace EK.Modules.SCV.Pages.SegmentosVigencia{
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("segmentosvigencia", "scv");
    let PAGE_ID = "Vigencia de Segmentos";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addDate("Vigencia")
                .addObject("Segmento")
                .addNumber("PrecioInicial")
                .addNumber("PrecioFinal")
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
                            <SegmentosDDL id={"Segmento"} size={[12, 12, 6, 6]} validations={[validations.required()]} />
                            <input.Currency id={"PrecioInicial"} size={[12, 12, 2, 2]} required={false} />
                            <input.Currency id={"PrecioFinal"} size={[12, 12, 2, 2]} required={false} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                        <div className="alert alert-info">
                            <strong>Importante!</strong> Los Precios de esta sección son informativos.
                        </div>
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
                            <label.General id="Segmento" size={[12, 12, 6, 6]}/>
                            <Label id="PrecioInicial" size={[12, 12, 2, 2]} />
                            <Label id="PrecioFinal" size={[12, 12, 2, 2]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};


//namespace EK.Modules.SCV.Pages.SegmentosVigencias {
//    "use strict";
//    const PAGE_ID: string = "segmentosVigencias";
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
//        segmentos?: any;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarSegmentosVigencias extends React.Component<IProps, IState> {
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
//                .addObject("Segmento")
//                .addDate("Vigencia")
//                .addNumber("PrecioInicial")
//                .addNumber("PrecioFinal")
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
//                    dispatchFailed("segmentosvigencias-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("segmentosvigencias-setSelected", {});
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
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.segmentosvigencia];
//            let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let current: any = this.props.item.data;

//            let title: IPageTitle = {
//                title: !this.props.isNew ? current.Segmento.Descripcion : $page.edit.titulo,
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
//                                segmentos={this.props.segmentos}
//                                />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    class $segmentosvigenciasPage {
//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.segmentosvigencias.selected,
//                segmentos: state.segmentos.catalogo
//            };
//        };

//        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            cargarDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "segmentosvigencias-setSelected",
//                    url: "segmentosvigencias(" + id + ")"
//                }));
//                dispatchAsync("segmentos-catalogo", "segmentos(0,0)");
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "segmentosvigencias-guardar",
//                    type: HttpMethod.PUT,
//                    url: "segmentosvigencias/save",
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
//    export let Edicion: any = ReactRedux.connect($segmentosvigenciasPage.mapProps, $segmentosvigenciasPage.mapDispatchs)(ConnectedPageEditarSegmentosVigencias);

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
//        segmentos?: any;
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
//            let segmento: any = (this.props.isNew && this.props.segmentos && this.props.segmentos.data) ? this.props.segmentos.data[0] :
//                current.Segmento;

//            return <FadeInColumn>
//                <Input id="ID" value={current.ID} label="" visible={false} />
//                <SegmentosDDL
//                    helpLabel={$page.form.segmentodescripcion.helplabel}
//                    items={this.props.segmentos}
//                    itemKey={"ID"}
//                    itemValue={"Descripcion"}
//                    label={$page.form.segmentodescripcion.Label}
//                    required={true}
//                    size={[12, 12, 10, 10]}
//                    value={segmento}
//                    validations={[
//                        validations.required($page.form.segmentodescripcion.validaciones.requerida)
//                    ]} />
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
//                <DatePicker
//                    id="Vigencia"
//                    label={$page.form.vigencia.label}
//                    size={[12, 12, 4, 4]}
//                    required={true}
//                    value={current.Vigencia}
//                    helpLabel={$page.form.vigencia.helplabel} />
//                <Input
//                    id="PrecioInicial"
//                    label={$page.form.precioinicial.label}
//                    size={[12, 12, 4, 4]}
//                    required={true}
//                    value={current.PrecioInicial}
//                    helpLabel={$page.form.precioinicial.helplabel}
//                    maxLength={18}
//                    validations={[
//                        validations.required($page.form.precioinicial.requerida)
//                    ]} />
//                <Input
//                    id="PrecioFinal"
//                    label={$page.form.preciofinal.label}
//                    size={[12, 12, 4, 4]}
//                    required={true}
//                    value={current.PrecioInicial}
//                    helpLabel={$page.form.preciofinal.helplabel}
//                    maxLength={18}
//                    validations={[
//                        validations.required($page.form.preciofinal.requerida)
//                    ]} />
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
//                    <Label label={$page.form.segmentodescripcion.label} value={current.Segmento.Descripcion} size={[12, 12, 12, 12]} />
//                    <Label label={$page.form.vigencia.label} value={current.Vigencia} size={[12, 12, 12, 4]} />
//                    <Label label={$page.form.precioinicial.label} value={current.PrecioInicial} size={[12, 10, 10, 4]} />
//                    <Label label={$page.form.preciofinal.label} value={current.PrecioFinal} size={[12, 10, 10, 4]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}