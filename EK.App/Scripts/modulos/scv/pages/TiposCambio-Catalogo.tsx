namespace EK.Modules.SCV.Pages.TiposCambio {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("tiposcambio", "scv");
    let ml: any = config.getML();
    let PAGE_ID = "Tipos de Cambio";

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addString("Clave")
                .addObject("MonedaOrigen")
                .addObject("MonedaDestino")
                .addDate("Fecha")
                .addDate("FechaHasta")
                .addNumber("Valor")
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            
        };
        onEntitySaved(props: page.IProps): void {
            dispatchDefault("global-current-catalogo", {});
        };
        //onDelete(id: any, props: page.IProps): void {
        //    dispatchAsyncPut("global-current-entity", "/base/scv/CGValores/Delete/", { id });
        //};
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntitySaved={this.onEntitySaved} >
                <View />
                <Edit />
            </page.Main>;

        };
    };

    class Edit extends page.Base{

        render(): JSX.Element {
           
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <MonedasDDL id="MonedaOrigen" size={[12, 4, 4, 4]} validations={[validations.required()]} />
                            <DatePicker id= {"Fecha"} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                            <Input id={"Valor"} size={[12, 3, 3, 3]} maxLength={18} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 2, 2, 2]} validations={[validations.required()]}/>
                            <MonedasDDL id="MonedaDestino" size={[12, 4, 4, 4]} validations={[validations.required()]} />
                            <DatePicker id= {"FechaHasta"} size={[12, 3, 3, 3]}  validations={[validations.required()]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;

        };
    };

    class View extends page.Base{
    //let View: any = global.connect(class extends React.Component<TiposCambioView, TiposCambioView> {

    //    static props: any = (state: any) => ({
            
    //    });


        render(): JSX.Element {
           
            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}

                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Entidad id="MonedaOrigen" size={[12, 4, 4, 4]} />
                            <label.Fecha id="Fecha" size={[12, 3, 3, 3]} />
                            <label.Valor id="Valor" size={[12, 3, 3, 3]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                            <label.Entidad id="MonedaDestino" size={[12, 3, 3, 3]} />
                            <label.Fecha id="FechaHasta" size={[12, 3, 3, 3]} />


                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};



//namespace EK.Modules.SCV.Pages.TiposCambio {
//    "use strict";
//    const PAGE_ID: string = "tiposcambio";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        obtenerItem?: (id: number) => void;
//        cargarDatos?: () => void;
//        item?: any;
//        params?: IParams;
//        guardar?: (item: any) => void;
//        isNew?: boolean;
//        global?: any;
//        monedas?: any;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarTiposCambio extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.state = { viewMode: this.props.isNew ? false : true };
//        }

//        static defaultProps: IProps = {
//            global: {},
//            isNew: false
//        };

//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.TiposCambioReducer.selected,
//                monedas: state.global.MONEDA
//            };
//        };

//        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerItem: (id: number): void => {
//                dispatchAsync("tiposcambio-setSelected", "TiposCambio/GetById/" + id);
//            },
//            cargarDatos: (): any => {
//                dispatchAsync("tiposcambio-catalogo", "tiposcambio(0)");
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "tiposcambio-guardar",
//                    type: HttpMethod.PUT,
//                    url: "tiposcambio/save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            }
//        });

//        saveForm(): void {
//            if (!Forms.isValid(PAGE_ID)) {
//                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//                return;
//            };
//            let item: EditForm = Forms.getForm(PAGE_ID);
//            //if ((item.hasValue)) {
//            let model: any = item
//                .addNumberConst("ID", getDataID(this.props.item))
//                .addObject("Moneda")
//                .addObject("MonedaDestino")
//                .addDate("Fecha")
//                .addDate("FechaHasta")
//                .addNumber("Valor")
//                .addEstatus("Estatus")
//                .toObject();
//            this.props.guardar(model);
//            this.setState({ viewMode: false });
//            //}
//        }

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

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.item, nextProps.item)) ||
//                (hasChanged(this.props.monedas, nextProps.monedas)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.monedas);
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
//                    dispatchFailed("tiposcambio-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("tiposcambio-setSelected", createSuccessfulStoreObject({}));
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
//                this.props.cargarDatos();
//                this.setState({ viewMode: true });

//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.tiposcambio];
//            let editView: boolean = !this.state.viewMode;
//            // let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let title: IPageTitle;
//            let current: any = getData(this.props.item);
//            let nombre_moneda_origen: any = !current.Moneda || current.Moneda === null ? "" : current.Moneda.Nombre;
//            let nombre_moneda_destino: any = !current.MonedaDestino || current.Moneda === null ? "" : current.MonedaDestino.Nombre;


//            title = {
//                title: !this.props.isNew ? nombre_moneda_origen + ' - ' + nombre_moneda_destino : $page.edit.titulo,
//                subTitle: !this.props.isNew ? current.Clave : "",
//                children: !this.props.isNew ? [EK.UX.Labels.badgeEstatus(current.Estatus)] : null
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
//                                monedas={this.props.monedas}
//                            />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }


//    export let Edicion: any = ReactRedux.connect(ConnectedPageEditarTiposCambio.mapProps, ConnectedPageEditarTiposCambio.mapDispatchs)(ConnectedPageEditarTiposCambio);

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
//        monedas?: any;
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
//            let moneda: any = (this.props.isNew && this.props.monedas && this.props.monedas.data) ? this.props.monedas.data[0] : current.Moneda;
//            let monedaDestino: any = (this.props.isNew && this.props.monedas && this.props.monedas.data) ? this.props.monedas.data[0] : current.MonedaDestino;

//            return <FadeInColumn>
//                <Column size={[12, 12, 5, 5]}>
//                    <Input id="ID" value={current.ID} label="" visible={false} />
//                    <MonedasDDL
//                        helpLabel={$page.form.monedanombre.helplabel}
//                        items={this.props.monedas}
//                        itemKey={"ID"}
//                        itemValue={"Nombre"}
//                        label={$page.form.monedanombre.label}
//                        required={true}
//                        size={[12, 12, 12, 12]}
//                        value={moneda}
//                        validations={[
//                            validations.required($page.form.monedanombre.validaciones.requerida)
//                        ]} />
//                    <MonedasDDL
//                        id="MonedaDestino"
//                        helpLabel={$page.form.monedanombredestino.helplabel}
//                        items={this.props.monedas}
//                        itemKey={"ID"}
//                        itemValue={"Nombre"}
//                        label={$page.form.monedanombredestino.label}
//                        required={true}
//                        size={[12, 12, 12, 12]}
//                        value={monedaDestino}
//                        validations={[
//                            validations.required($page.form.monedanombredestino.validaciones.requerida)
//                        ]} />
//                </Column>
//                <Column size={[12, 12, 2, 2]}>
//                    <DatePicker
//                        id="Fecha"
//                        label={$page.form.fecha.label}
//                        size={[12, 12, 12, 12]}
//                        required={true}
//                        value={current.Fecha}
//                        helpLabel={$page.form.fecha.helplabel} />
//                    <DatePicker
//                        id="FechaHasta"
//                        label={$page.form.fechahasta.label}
//                        size={[12, 12, 12, 12]}
//                        required={true}
//                        value={current.FechaHasta}
//                        helpLabel={$page.form.fechahasta.helplabel} />
//                </Column>
//                <Column size={[12, 12, 2, 2]}>
//                    <Input
//                        id="Valor"
//                        label={$page.form.tiposcambio.label}
//                        size={[12, 12, 12, 12]}
//                        required={true}
//                        value={current.Valor}
//                        helpLabel={$page.form.tiposcambio.helplabel}
//                        maxLength={18}
//                        validations={[
//                            validations.required($page.form.tiposcambio.requerida)
//                        ]} />
//                </Column>
//                <Column size={[12, 12, 3, 3]}>
//                    <CheckBoxStatus
//                        id="Estatus"
//                        label={$page.form.estatus.label}
//                        xs={{ size: 12 }}
//                        sm={{ size: 12 }}
//                        md={{ size: 2 }}
//                        lg={{ size: 2 }}
//                        required={false}
//                        value={Status}
//                        helpLabel={$page.form.estatus.helplabel}
//                        disabled={false}
//                        style={{ marginTop: 15 }} />
//                </Column>
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
//                    <Column size={[12, 12, 6, 6]}>
//                        <Label label={$page.form.monedanombre.label} value={current.Moneda.Nombre} size={[12, 12, 12, 12]} />
//                        <Label label={$page.form.monedanombredestino.label} value={current.MonedaDestino.Nombre} size={[12, 12, 12, 12]} />
//                    </Column>
//                    <Column size={[12, 12, 3, 3]}>

//                        <Label label={$page.form.fecha.label} value={current.Fecha} size={[12, 12, 12, 12]} />
//                        <Label label={$page.form.fechahasta.label} value={current.FechaHasta} size={[12, 12, 12, 12]} />
//                    </Column>
//                    <Column size={[12, 12, 3, 3]}>
//                        <Label label={$page.form.tiposcambio.label} value={current.Valor} size={[12, 12, 12, 12]} />
//                    </Column>
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}