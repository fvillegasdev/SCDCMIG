namespace EK.Modules.SCV.Pages.RangosIngresos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("rangosIngresos", "scv");
    let PAGE_ID= "Rangos de Ingresos";

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addNumber("RangoInicial")
                .addNumber("RangoFinal")
                .addEstatus("Estatus")
                .addObject("Moneda")
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
                        icon="fa fa-money" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 8, 8]} maxLength={150} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                            <input.Currency id="RangoInicial" size={[12,12, 4, 4]} validations={[validations.required()]}/>
                            <input.Currency id="RangoFinal" size={[12, 12, 4, 4]} validations={[validations.required()]} />
                            <ddl.MonedasDDL id="Moneda" size={[12, 12, 4, 4]} validations={[validations.required()]} />
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
                        icon="fa fa-money" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                            <label.Currency id="RangoInicial" size={[6, 6, 2, 2]} />
                            <label.Currency id="RangoFinal" size={[6, 6, 2, 2]} />
                            <label.Moneda id="Moneda" size={[6, 6, 2, 2]} />

                        </Row>
                    </page.OptionSection>
                </Column>
              
            </page.View>;
        };
    };
}




//namespace EK.Modules.SCV.Pages.RangosIngresos {
//    "use strict";
//    const PAGE_ID: string = "rangosIngresos";

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

//    export class ConnectedEditar extends React.Component<IProps, IState> {
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
//                .addString("Clave")
//                .addString("Nombre")
//                .addNumber("RangoInicial")
//                .addNumber("RangoFinal")
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
//                (hasChanged(this.props.global.RANGOSINGRESOS, nextProps.global.RANGOSINGRESOS)) ||
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
//                    }
//                } else {
//                    dispatchFailed("rangosIngresos-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("rangosIngresos-setSelected", createSuccessfulStoreObject({}));
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
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.rangosIngresos];
//            let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let title: IPageTitle;
//            let current: any = this.props.item.data;

//            if (!this.props.isNew) {
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
//                            : <Edit isNew={this.props.isNew} item={current} />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    class $rangosIngresosPage {
//        static props: any = (state: any): any => {
//            return {
//                item: state.rangosIngresos.selected
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerItem: (id: number): void => {
//                dispatchAsync("rangosIngresos-setSelected", "RangosIngresos/get/" + id);
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("rangosIngresos-catalogo", "RangosIngresos/GetAll(0)");
//            },
//            guardar: (item: any, strUrl: string): void => {
//                dispatch(actionAsync({
//                    action: "rangosIngresos-guardar",
//                    type: HttpMethod.PUT,
//                    url: "rangosIngresos/save",
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

//    export let Edicion: any = ReactRedux.connect($rangosIngresosPage.props, $rangosIngresosPage.dispatchs)(ConnectedEditar);

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
//                        maxLength={100}
//                        validations={[
//                            validations.required($page.form.clave.validaciones.requerida)
//                        ]} />
//                    <Input
//                        id="Nombre"
//                        label={$page.form.nombre.label}
//                        size={[12, 6, 6, 8]}
//                        required={true}
//                        value={current.Nombre}
//                        helpLabel={$page.form.nombre.helplabel}
//                        maxLength={300}
//                        validations={[
//                            validations.required($page.form.nombre.validaciones.requerida)
//                        ]} />
//                </Row>
//                <Row>
//                    <Column size={[12, 12, 2, 2]}>
//                        <Input
//                            id="RangoInicial"
//                            label={$page.form.rangoInicial.label}
//                            helpLabel={$page.form.rangoInicial.helplabel}
//                            required={true}
//                            value={current.RangoInicial}
//                            mask={"##9.99"}
//                            />
//                    </Column>
//                    <Column size={[12, 12, 2, 2]}>
//                        <Input
//                            id="RangoFinal"
//                            label={$page.form.rangoFinal.label}
//                            helpLabel={$page.form.rangoFinal.helplabel}
//                            required={true}
//                            value={current.RangoFinal}
//                            mask={"##9.99"}
//                            />
//                    </Column>
//                    <CheckBoxStatus
//                        id="Estatus"
//                        label={$page.form.estatus.label}
//                        xs={{ size: 12 }}
//                        sm={{ size: 6 }}
//                        md={{ size: 6 }}
//                        lg={{ size: 2 }}
//                        required={false}
//                        value={Status}
//                        helpLabel={$page.form.estatus.helplabel}
//                        disabled={false}
//                        style={{ marginTop: 25 }} />
//                </Row>
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

//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 10, 10, 2]} />
//                    <Label label={$page.form.nombre.label} value={current.Nombre} size={[12, 12, 12, 10]} />                    
//                    <Label label={$page.form.rangoInicial.label} value={current.RangoInicial} size={[12, 12, 2, 2]} />
//                    <Label label={$page.form.rangoFinal.label} value={current.RangoFinal} size={[12, 12, 2, 2]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}
