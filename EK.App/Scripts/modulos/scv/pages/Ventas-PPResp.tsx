//namespace EK.Modules.SCV.Pages.Ventas {
//    "use strict";
//    const VENTA_PAGE_ID: string = "ventas";
//    const PAGE_ID: string = "ventas$PV";
//    const SECTION_CONCEPTO_ID: string = "ventas$PPConcepto";
//    const SECTION_ABONO_ID: string = "ventas$PPAbono";
//    const idFormNuevoPP: string = "$ventasNPP";
//    const idFormDocumento: string = "$ventasNPPDoc";

//    /*** BEGIN: PRINCIPAL ***/
//    interface IParams {
//        id: any;
//    }
//    interface IProps extends React.Props<any> {
//        obtenerDatos?: (id: number) => void;
//        obtenerCatalogo?: () => void;
//        item?: any;
//        planPagos?: DataElement;
//        params?: IParams;
//        guardar?: (item: any[], strUrl: string) => void;
//        isNew?: boolean;
//        global?: any;
//    }
//    interface IState {
//        viewMode?: boolean;
//    }

//    class VentasPV extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);

//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: false };
//        }

//        static defaultProps: IProps = {
//            global: {},
//            isNew: false
//        };

//        saveForm(): void {

//            //if (!Forms.isValid(PAGE_ID)) {
//            //    warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//            //    return;
//            //};

//            let item: EditForm = Forms.getForm();
//            let model: any = item
//                .addNumberConst("ID", getDataID(this.props.item))
//                .addObject("PlanPagos")
//                .toObject();
//            this.props.guardar(model, "Ventas/SavePP/" + getDataID(this.props.item));
//            this.setState({ viewMode: false });
//            go("/scv/ventas/" + getDataID(this.props.item))

//        }
//        editForm(): void {
//        }
//        cancelEditForm(): void {
//            ReactRouter.hashHistory.goBack();
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.item, nextProps.item)) ||
//                (hasChanged(this.props.planPagos, nextProps.planPagos));
//        }
//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);

//            let id: number = Number(this.props.params.id);
//            if (id) {
//                if (isSuccessful(this.props.item)) {
//                    if (id !== getDataID(this.props.item)) {
//                        this.props.obtenerDatos(id);

//                    }
//                }
//                else {
//                    this.props.obtenerDatos(id);
//                };

//                this.props.obtenerDatos(id);
//            };

//            Forms.createFormElement(PAGE_ID, "PlanPagos", getData(this.props.item).PlanPagos)

//            setCurrentEntityType(PAGE_ID);
//        };
//        componentWillReceiveProps(nextProps: IProps) {
//            if (hasChanged(this.props.item, nextProps.item)) {
//                setCurrentEntity(nextProps.item);
//            };

//            if (hasChanged(this.props.planPagos, nextProps.planPagos)) {
//                if (isSuccessful(nextProps.planPagos)) {

//                };
//            };
//        };
//        componentDidUpdate(prevProps: IProps, prevState: IState): any {
//            let $page: any = $ml[VENTA_PAGE_ID];

//            if (wasUpdated(prevProps.item, this.props.item)) {
//                success($page.mensajes.exito);
//                this.props.obtenerCatalogo();
//                this.setState({ viewMode: true });
//            };
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.pd, $bc.scv.ventas];
//            let editView: boolean = !this.state.viewMode;
//            let current: any = getData(this.props.item);
//            let ventaAutorizada: any = current && (current.EstatusVenta.Clave === "A" || current.EstatusVenta.Clave === "P") ? true : false;

//            let venta: any = {};
//            let cliente: any = {};
//            if (isSuccessful(this.props.item)) {
//                venta = current;
//                cliente = venta.Cliente ? venta.Cliente : {};
//            };

//            let title: IPageTitle = {
//                title: cliente.Nombre,
//                subTitle: venta.Clave,
//                children: [EK.UX.Labels.badgeEstatus(venta.Estatus)]
//            };

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView && !ventaAutorizada ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView && !ventaAutorizada ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.item}>
//                        <Ventas$General />
//                        <Row>
//                            <Column size={[12, 12, 12, 12]}>
//                                <PlanPagosView />
//                            </Column>
//                        </Row>
//                    </PanelUpdate>
//                </PageV2>;

//            return page;
//        }
//    }

//    class $ventasPVPage {
//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.ventas.selected,
//                planPagos: state.ventas.planPagosSelected
//            };
//        };
//        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerDatos: (id: number): void => {
//                dispatchAsync("scv-ventas-setSelected", "Ventas/GetById/" + id);
//            },
//            guardar: (item: any, strUrl: string): void => {
//                dispatch(actionAsync({
//                    action: "scv-ventas-pv-guardar",
//                    type: HttpMethod.PUT,
//                    url: strUrl,
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("scv-ventas-catalogo", "Ventas(0,0)");
//            }
//        });
//    };
//    export let Ventas$PV: any = ReactRedux.connect($ventasPVPage.mapProps, $ventasPVPage.mapDispatchs)(VentasPV);
//    /*** END: PRINCIPAL ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IPlanPagosProps extends React.Props<any> {
//        item?: any;
//        concepto?: any;
//        planPagos?: DataElement;
//        removeSelectedItem?: () => void;
//        obtenerPlanPagos?: (idVenta: number, idPlanPagos: number) => void;
//        recalcularPlanPagos?: (venta: any, concepto: any) => void;
//        setSelectedItem: (item: any) => void;
//        setSelectedPP: (item: any) => void;
//        venta: boolean;
//    };
//    interface IPlanPagosState {
//        EditPP: boolean;
//    }
//    class PlanPagos extends React.Component<IPlanPagosProps, IPlanPagosState> {
//        constructor(props: IPlanPagosProps) {
//            super(props);
//            this.state = { EditPP: true };

//            this.onSelectPlanPagos = this.onSelectPlanPagos.bind(this);
//            this.onClickCancel = this.onClickCancel.bind(this);
//            this.onClickSave = this.onClickSave.bind(this);
//            this.onClickRefresh = this.onClickRefresh.bind(this);
//            this.onClickNuevoConcepto = this.onClickNuevoConcepto.bind(this);
//            this.onRecalcularPlanPagos = this.onRecalcularPlanPagos.bind(this);
//            this.setInfoConcepto = this.setInfoConcepto.bind(this);
//        };

//        //
//        static props: any = (state: any) => ({
//            item: state.ventas.selected,
//            planPagos: state.ventas.planPagosSelected,
//            concepto: state.forms[SECTION_CONCEPTO_ID]
//        });
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerPlanPagos: (idVenta: number, idPlanPagos: number): void => {
//                dispatchAsync("scv-ventas-setPlanPagosSelected", "ventas(" + idVenta + ")/GetPlanDePagos(" + idPlanPagos + ")");
//            },
//            recalcularPlanPagos: (venta: any, concepto: any): void => {
//                let item: any = { venta, concepto };

//                dispatchAsyncPost("scv-ventas-setPlanPagosSelected", "ventas/RecalcularPlanDePagos", item);
//            },
//            removeSelectedItem: (): void => {
//                dispatchDefault("scv-ventas-setSelectedConcepto", {});
//            },
//            setSelectedItem: (item: any): void => {
//                dispatchSuccessful("scv-ventas-setSelectedConcepto", item);
//            },
//            setSelectedPP: (item: any): void => {
//                dispatchSuccessful("scv-ventas-setPlanPagosSelected", item);
//            }
//        });
//        //

//        updateItems(items: any): void {
//            Forms.updateFormElement(PAGE_ID, "PlanPagos", items);
//        };
//        getFormData(): any {
//            if (!Forms.isValid(SECTION_CONCEPTO_ID)) {
//                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//                return;
//            };

//            let item: EditForm = Forms.getForm(SECTION_CONCEPTO_ID);
//            let removedItems: number = 0;

//            let concepto: any = item
//                .addNumber("ID")
//                .addObject("ConceptoPago")
//                .addNumber("ImporteMoneda")
//                .addNumber("PorcentajeTIF")
//                .addNumber("NumeroPagos")
//                .addObject("FrecuenciaPago")
//                .addNumber("NumeroPlazoPrimerPago")
//                .addObject("PeriodoPrimerPago")
//                .addBoolean("Modificable")
//                .toObject();

//            return concepto;
//        };
//        setInfoConcepto(concepto: any): void {
//            let formaConcepto: any = {
//                ID: concepto.ID,
//                ConceptoPago: concepto.ConceptoPago,
//                ImporteMoneda: concepto.CapitalMoneda,
//                PorcentajeTIF: concepto.PorcentajeTIF,
//                NumeroPagos: concepto.NumeroPagos,
//                FrecuenciaPago: concepto.FrecuenciaPago,
//                NumeroPlazoPrimerPago: concepto.NumeroPlazoPrimerPago,
//                PeriodoPrimerPago: concepto.PeriodoPrimerPago,
//                Documentos: concepto.Documentos,
//                Modificable: concepto.Modificable
//            };

//            Forms.updateFormElements(SECTION_CONCEPTO_ID, formaConcepto);
//        };

//        onSelectPlanPagos(): void {
//            let item: EditForm = Forms.getForm(idFormNuevoPP);
//            let model: any = item
//                .addObject("PlanPagos")
//                .toObject();

//            this.props.obtenerPlanPagos(getDataID(this.props.item), model.PlanPagos.ID);
//            this.setState({ EditPP: false });
//        };
//        onRecalcularPlanPagos(concepto: any): void {
//            let venta: any = getData(this.props.item);
//            venta.PlanPagos = getData(this.props.planPagos);

//            this.props.recalcularPlanPagos(venta, concepto);
//        };
//        onClickCancel(): void {
//            Forms.remove(SECTION_CONCEPTO_ID);
//        };
//        onClickRefresh(): void {
//            let concepto: any = this.getFormData();
//            let venta: any = getData(this.props.item);
//            let planPagos: any = getData(this.props.planPagos);

//            if (concepto.ID < 0) {
//                let items: any[] = planPagos.Conceptos;
//                if (items) {
//                    let e: any = items.filter((e: any) => e.ID === concepto.ID);
//                    if (e && e.length === 0) {
//                        items.push(concepto);
//                        planPagos.Conceptos = items;
//                    }
//                }
//            };
//            venta.PlanPagos = planPagos;
//            this.props.recalcularPlanPagos(venta, concepto);
//        };
//        onClickNuevoConcepto(): void {
//            Forms.remove(SECTION_CONCEPTO_ID);

//            let conceptos: any[] = getData(this.props.planPagos).Conceptos;
//            let id: number = 0;

//            conceptos.forEach((value: any, index: number) => {
//                if (value.ID < id) {
//                    id = value.ID;
//                };
//            });

//            id--;
//            let item: any = {
//                ID: id,
//                Modificable: true,
//                ConceptoPago: "",
//                Documentos: [],
//                Nuevo: true
//            };

//            Forms.updateFormElements(SECTION_CONCEPTO_ID, item);
//        };
//        onClickSave(): void {
//            if (!Forms.isValid(SECTION_CONCEPTO_ID)) {
//                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//                return;
//            };

//            let item: EditForm = Forms.getForm(SECTION_CONCEPTO_ID);
//            let removedItems: number = 0;

//            let concepto: any = item
//                .addNumber("ID")
//                .addObject("ConceptoPago")
//                .addNumber("ImporteMoneda")
//                .addNumber("PorcentajeTIF")
//                .addNumber("NumeroPagos")
//                .addObject("FrecuenciaPago")
//                .addNumber("NumeroPlazoPrimerPago")
//                .addObject("PeriodoPrimerPago")
//                .addBoolean("Modificable")
//                .addObject("Documentos")
//                .toObject();

//            //Validar que existan documentos.
//            let documentos: any[] = concepto.Documentos;
//            if (documentos === undefined || documentos.length === 0) {
//                warning("No se han generado los documentos correspondientes al Concepto, es necesario Recalcular.");
//                return;
//            };

//            Forms.remove(SECTION_CONCEPTO_ID);

//        };

//        componentDidMount(): any {
//            let ventaPP: any = {};
//            if (isSuccessful(this.props.item)) {
//                ventaPP = getData(this.props.item).PlanPagos;
//                if (ventaPP == undefined || ventaPP == null) {
//                    Forms.createFormElement(PAGE_ID, "PlanPagos", getData(this.props.planPagos));
//                    this.setState({ EditPP: true });
//                } else {
//                    this.props.setSelectedPP(ventaPP);
//                    this.setState({ EditPP: false });
//                };
//            };
//        };

//        componentWillReceiveProps(nextProps: IPlanPagosProps): void {
//            if (hasChanged(this.props.planPagos, nextProps.planPagos)) {
//                if (isSuccessful(nextProps.planPagos)) {
//                    Forms.updateFormElement(PAGE_ID, "PlanPagos", getData(nextProps.planPagos));
//                };
//            };
//        };
//        shouldComponentUpdate(nextProps: IPlanPagosProps, nextState: IPlanPagosProps): boolean {
//            return true;
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            let venta: any = getData(this.props.item);
//            let statusUpdate: DataElement = !isLoadingOrUpdating(this.props.planPagos) ? createSuccessfulStoreObject({}) : this.props.planPagos;
//            let modificable: boolean = Forms.getValue("Modificable", SECTION_CONCEPTO_ID) === true && !this.props.venta;
//            let editMode: boolean = Forms.getValue("ID", SECTION_CONCEPTO_ID) !== undefined;
//            let collapsed: boolean = this.props.venta ? true : false;

//            return <OptionSection
//                title={$page.form.section.planPagos.titulo}
//                editMode={editMode}
//                collapsed={collapsed}>
//                <SectionButtons>
//                    <Button className="btn-sm btn-default-ek" color="white" icon="fa fa-calculator"
//                        visible={modificable && editMode} onClick={this.onClickRefresh} style={{ marginRight: 15 }} />
//                    <Button className="btn-sm btn-default-ek" color="white" icon="fa fa-plus" visible={isSuccessful(this.props.planPagos) && !editMode && !this.state.EditPP && !this.props.venta} onClick={this.onClickNuevoConcepto} />
//                    <Button className="btn-sm btn-default-ek" color="white" icon="fa fa-check" visible={(!isLoadingOrSuccessful(this.props.planPagos) || this.state.EditPP) && !this.props.venta} onClick={this.onSelectPlanPagos} />
//                </SectionButtons>
//                <SectionView>
//                    <PanelUpdate info={statusUpdate}>
//                        {!isLoadingOrSuccessful(this.props.planPagos) || this.state.EditPP
//                            ? !this.props.venta ? <PlanesPagoDDL idDesarrollo={venta.Desarrollo.ID} idFormSection={idFormNuevoPP} /> : null
//                            : <View$PP setInfoConcepto={this.setInfoConcepto} planPagos={this.props.planPagos} venta={this.props.venta} />
//                        }
//                    </PanelUpdate>
//                </SectionView>
//                <SectionEdit
//                    idForm={SECTION_CONCEPTO_ID}
//                    onCancel={this.onClickCancel}
//                    onSave={modificable ? this.onClickSave : null}>
//                    <Edit$Concepto recalcularPlanPagos={this.onRecalcularPlanPagos} setInfoConcepto={this.setInfoConcepto} venta={this.props.venta} />
//                </SectionEdit>
//            </OptionSection>;
//        };
//    }
//    export let PlanPagosView: any = ReactRedux.connect(PlanPagos.props, PlanPagos.dispatchs)(PlanPagos);
//    /*** END: VIEW FORM ***/

//    /*** BEGIN: Plan de Pagos ***/
//    interface IViewPPProps extends React.Props<any> {
//        planPagos: DataElement;
//        setSelectedItem: (item: any) => void;
//        setInfoConcepto: (concepto: any) => void;
//        venta: boolean;
//    };
//    class ViewPP extends React.Component<IViewPPProps, IViewPPProps> {
//        constructor(props: IViewPPProps) {
//            super(props);

//            this.onClickSelect = this.onClickSelect.bind(this);
//            this.onClickView = this.onClickView.bind(this);
//        };

//        //
//        static props: any = (state: any) => {
//            return {
//                planPagos: Forms.getDataValue("PlanPagos", PAGE_ID, state, {})
//            }
//        };
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelectedItem: (item: any): void => {
//                dispatchSuccessful("scv-ventas-setSelectedConcepto", item);
//            }
//        });
//        //
//        onClickSelect(item: any): void {
//            Forms.remove(SECTION_CONCEPTO_ID);

//            this.props.setInfoConcepto(item);
//        };
//        onClickView(item: any): void {
//            Forms.remove(SECTION_CONCEPTO_ID);

//            this.props.setInfoConcepto(item);
//        };

//        shouldComponentUpdate(nextProps: IViewPPProps, nextState: IViewPPProps): boolean {
//            return hasChanged(this.props.planPagos, nextProps.planPagos);
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];

//            return <List
//                items={getData(this.props.planPagos).Conceptos}
//                readonly={false}
//                addRemoveButton={false}
//                aggregate={(item: any, values: any) => {
//                    if (!values.Capital) values.Capital = 0;
//                    if (!values.Interes) values.Interes = 0;
//                    if (!values.Importe) values.Importe = 0;

//                    if (item.OnEdit !== true) {
//                        values.Capital += item.CapitalMoneda ? item.CapitalMoneda : 0;
//                        values.Interes += item.InteresMoneda ? item.InteresMoneda : 0;
//                        values.Importe += item.ImporteMoneda ? item.ImporteMoneda : 0;
//                    };

//                    return values;
//                }}
//                listFooter={(values: any) => {
//                    return <div>
//                        <Row>
//                            <Column size={[5, 5, 5, 5]} className="list-default-header">{""}</Column>
//                            <Column size={[2, 2, 2, 2]} className="list-right-header">
//                                <span className="badge badge-info list-footer-badge">
//                                    {EK.UX.Labels.formatMoney(values.Capital)}
//                                </span>
//                            </Column>
//                            <Column size={[2, 2, 2, 2]} className="list-right-header">
//                                <span className="badge badge-info list-footer-badge">
//                                    {EK.UX.Labels.formatMoney(values.Interes)}
//                                </span>
//                            </Column>
//                            <Column size={[2, 2, 2, 2]} className="list-right-header">
//                                <span className="badge badge-info list-footer-badge">
//                                    {EK.UX.Labels.formatMoney(values.Importe)}
//                                </span>
//                            </Column>
//                        </Row>
//                    </div>;
//                }}
//                listHeader={<div>
//                    <Row>
//                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Concepto"}</Column>
//                        <Column size={[1, 1, 1, 1]} className="list-center-header">{"Plazo"}</Column>
//                        <Column size={[1, 1, 1, 1]} className="list-center-header">{"Primer Pago"}</Column>
//                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Capital"}</Column>
//                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Interes"}</Column>
//                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
//                    </Row>
//                </div>}
//                formatter={(index: number, item: any) => {
//                    return <Row style={{ paddingTop: 5, paddingBottom: 5 }}>
//                        <Column size={[3, 3, 3, 3]}>
//                            {item.ConceptoPago.Nombre}
//                        </Column>
//                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
//                            ({item.NumeroPagos}) {item.FrecuenciaPago.Nombre}
//                        </Column>
//                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
//                            ({item.NumeroPlazoPrimerPago}) {item.PeriodoPrimerPago.Nombre}
//                        </Column>
//                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
//                            {EK.UX.Labels.formatMoney(item.CapitalMoneda)}
//                        </Column>
//                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
//                            {EK.UX.Labels.formatMoney(item.InteresMoneda)}
//                        </Column>
//                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
//                            {EK.UX.Labels.formatMoney(item.ImporteMoneda)}
//                        </Column>
//                        {item.Modificable === true && !this.props.venta ?
//                            <Column size={[1, 1, 1, 1]}>
//                                <Button className="btn  default btn-default-ek" onClick={this.onClickSelect} info={item} icon="icon-pencil"></Button>
//                            </Column> :
//                            <Column size={[1, 1, 1, 1]}>
//                                <Button className="btn  default btn-default-ek" onClick={this.onClickView} info={item} icon="fas fa-bars"></Button>
//                            </Column>}
//                    </Row>;
//                }} />;
//        };
//    }
//    let View$PP: any = ReactRedux.connect(ViewPP.props, ViewPP.dispatchs)(ViewPP);
//    //

//    /*** BEGIN: EDIT CONCEPTO ***/
//    interface IEditProps extends React.Props<any> {
//        //item: any;
//        abono: DataElement;
//        compania: DataElement;
//        planPagos: DataElement;
//        pp: DataElement;
//        concepto?: EditForm;
//        items: DataElement;
//        fechaAbono: Date;
//        importeAbono: number;
//        idAbono: number;
//        setSelectedItem: (item: any) => void;
//        setSelectedDocs: (documentos: any[]) => void;
//        setInfoConcepto: (concepto: any) => void;
//        recalcularPlanPagos: (concepto: any) => void;
//        venta: boolean;
//    };
//    interface IEditState {
//        editAbono: boolean;
//        abono: any;
//    };
//    class EditConcepto extends React.Component<IEditProps, IEditState> {
//        constructor(props: IEditProps) {
//            super(props);

//            this.state = {
//                editAbono: false,
//                abono: {}
//            };

//            this.getDocumentos = this.getDocumentos.bind(this);

//            this.onClickNuevo = this.onClickNuevo.bind(this);
//            this.onClickCancel = this.onClickCancel.bind(this);
//            this.onClickSaveAbono = this.onClickSaveAbono.bind(this);
//            this.onClickEditAbono = this.onClickEditAbono.bind(this);
//            this.onClickRemoveAbono = this.onClickRemoveAbono.bind(this);
//        };

//        //
//        static props: any = (state: any) => {
//            return {
//                pp: state.ventas.planPagosSelected,
//                planPagos: Forms.getDataValue("PlanPagos", PAGE_ID, state, {}),
//                concepto: Forms.getForm(SECTION_CONCEPTO_ID, state),

//                fechaAbono: Forms.getValue("Fecha", SECTION_ABONO_ID, state),
//                importeAbono: Forms.getValue("ImporteMoneda", SECTION_ABONO_ID, state),
//                idAbono: Forms.getValue("ID", SECTION_ABONO_ID, state)
//            };
//        };
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelectedItem: (item: any): void => {
//                dispatchSuccessful("scv-ventas-setSelectedConcepto", item);
//            },
//            setSelectedDocs: (documentos: any[]): void => {
//                dispatchSuccessful("scv-ventas-setSelectedDocs", documentos);
//            }
//        });
//        //

//        updateItems(items: any): void {
//            Forms.updateFormElement(PAGE_ID, "Referencias", items);
//        };

//        selectItem(item: any): void {
//            Forms.remove(idFormDocumento);
//        };

//        getDocumentos(): any {
//            let concepto: any = this.props.concepto;
//            let documentos: any = concepto.Documentos;

//            if (documentos) {
//                let saldo: number = concepto.ImporteMoneda;;
//                let importeAnterior: number = 0;
//                let editPos: number = null;
//                let saldoPos: number = null;
//                let isValid: boolean = true;

//                documentos = documentos.map((value: any, index: number): any => {
//                    let documento = EK.Global.assign({}, value);

//                    saldo -= importeAnterior;

//                    if (this.state.editAbono === true && editPos === null) {
//                        if (this.props.fechaAbono < documento.Vencimiento) {
//                            editPos = index;
//                            saldoPos = saldo;

//                            if (this.props.importeAbono > saldo) {
//                                isValid = false;
//                            };
//                        };
//                    };

//                    documento.Saldo = saldo;

//                    importeAnterior = documento.CapitalMoneda;

//                    return documento;
//                });

//                if (this.state.editAbono === true) {
//                    if (editPos === null) {
//                        editPos = documentos.length;
//                    };

//                    if (isValid) {
//                        if (!(this.props.importeAbono > 0)) {
//                            isValid = false;
//                        };
//                    };

//                    documentos.splice(editPos, 0, {
//                        Vencimiento: this.props.fechaAbono,
//                        Saldo: saldoPos,
//                        InteresMoneda: 0,
//                        CapitalMoneda: this.props.importeAbono,
//                        ImporteMoneda: this.props.importeAbono,
//                        OnEdit: true,
//                        IsValid: isValid
//                    });
//                };
//            };

//            return documentos;
//        };

//        onClickCancel(): void {
//            Forms.remove(SECTION_ABONO_ID);

//            this.setState({
//                editAbono: false,
//                abono: {}
//            });
//        };
//        onClickEditAbono(item: any): void {
//            Forms.remove(SECTION_ABONO_ID);

//            this.setState({
//                editAbono: true,
//                abono: item
//            });
//        };
//        onClickRemoveAbono(abono: any): void {
//            let abonos: any[] = [];
//            let concepto: any = this.props.concepto;


//            // recolectamos de nuevo los abonos, para realizar el cálculo
//            let documentos: any[] = concepto.Documentos;

//            if (documentos && documentos.length > 0) {
//                for (var i = 0; i < documentos.length; i++) {
//                    let doc: any = documentos[i];

//                    if (doc.ID !== abono.ID) {
//                        if (doc.TipoAbono.Clave == "AC") {
//                            abonos[abonos.length] = {
//                                ID: doc.ID,
//                                Fecha: doc.Vencimiento,
//                                ImporteMoneda: doc.CapitalMoneda
//                            };
//                        };
//                    };
//                };
//            };

//            concepto.Abonos = abonos;

//            // actualizar concepto
//            this.props.recalcularPlanPagos(concepto);
//        };
//        onClickSaveAbono(): void {
//            if (!Forms.isValid(SECTION_ABONO_ID)) {
//                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//                return;
//            };

//            let item: EditForm = Forms.getForm(SECTION_ABONO_ID);
//            let abonos: any[] = [];
//            let concepto: any = this.props.concepto;
//            let documentos: any[] = concepto.Documentos;

//            let abono: any = item
//                .addNumber("ID")
//                .addNumber("ImporteMoneda")
//                .addDate("Fecha")
//                .addNumberConst("_nuevo", 1)
//                .toObject();

//            // recolectamos de nuevo los abonos, para realizar el cálculo
//            if (abono.ID === undefined) {
//                abonos[abonos.length] = abono;
//            };

//            if (documentos && documentos.length > 0) {
//                for (var i = 0; i < documentos.length; i++) {
//                    let doc: any = documentos[i];

//                    if (doc.ID === abono.ID) {
//                        abonos[abonos.length] = {
//                            ID: abono.ID,
//                            Fecha: abono.Fecha,
//                            ImporteMoneda: abono.ImporteMoneda
//                        };
//                    } else {
//                        if (doc.TipoAbono.Clave == "AC") {
//                            abonos[abonos.length] = {
//                                ID: doc.ID,
//                                Fecha: doc.Vencimiento,
//                                ImporteMoneda: doc.CapitalMoneda
//                            };
//                        };
//                    };
//                };
//            };

//            concepto.Abonos = abonos;

//            // actualizar concepto
//            this.props.recalcularPlanPagos(concepto);

//            // 
//            this.setState({
//                editAbono: false,
//                abono: {}
//            });
//        };
//        onClickNuevo(): void {
//            Forms.remove(SECTION_ABONO_ID);

//            this.setState({
//                editAbono: true,
//                abono: {}
//            });
//        };

//        shouldComponentUpdate(nextProps: IEditProps, nextState: IEditState): boolean {
//            return hasChanged(this.props.concepto, nextProps.concepto) ||
//                hasChanged(this.props.pp, nextProps.pp) ||
//                this.props.fechaAbono !== nextProps.fechaAbono ||
//                this.props.importeAbono !== nextProps.importeAbono ||
//                this.state.editAbono !== nextState.editAbono;
//        };
//        componentDidMount(): void {

//        };
//        componentWillUpdate(nextProps: IEditProps, nextState: IEditState) {
//            if (hasChanged(this.props.planPagos, nextProps.planPagos) && isSuccessful(nextProps.planPagos)) {
//                let concepto: any = this.props.concepto;
//                let data: any[] = getData(nextProps.planPagos).Conceptos;

//                for (var i = 0; i < data.length; i++) {
//                    if (data[i].ID === concepto.ID) {
//                        this.props.setInfoConcepto(data[i]);

//                        break;
//                    };
//                };
//            };
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            let documentos: any[] = this.getDocumentos();
//            let modificable: boolean = Forms.getValue("Modificable", SECTION_CONCEPTO_ID) === true && !this.props.venta;
//            //let compania: any = getData(this.props.compania);
//            let compania: any = {
//                Localidad: {
//                    Nombre: "Del Valle,San Pedro Garza García, Nuevo León, México"
//                },
//                TimeZone: {
//                    Nombre: "(UTC-06:00) Guadalajara, Ciudad de México, Monterrey"
//                }
//            };

//            return <PanelUpdate info={this.props.pp}>
//                {modificable ? <EditFormConcepto /> : <ViewFormConcepto />}
//                <OptionSection
//                    title={$page.form.section.planPagos.titulo}
//                    collapsed={false}
//                    readOnly={true}
//                    inverse={true}
//                    editMode={this.state.editAbono}
//                    inlineEdit={true} >
//                    <SectionView
//                        title="tabla de amortización"
//                        onAddNew={modificable ? this.onClickNuevo : null}>
//                        <Row>
//                            <Column>
//                                <List
//                                    items={createSuccessfulStoreObject(documentos)}
//                                    readonly={false}
//                                    addRemoveButton={false}
//                                    aggregate={(item: any, values: any) => {
//                                        if (!values.Capital) values.Capital = 0;
//                                        if (!values.Interes) values.Interes = 0;
//                                        if (!values.Importe) values.Importe = 0;

//                                        if (item.OnEdit !== true) {
//                                            values.Capital += item.CapitalMoneda ? item.CapitalMoneda : 0;
//                                            values.Interes += item.InteresMoneda ? item.InteresMoneda : 0;
//                                            values.Importe += item.ImporteMoneda ? item.ImporteMoneda : 0;
//                                        };

//                                        return values;
//                                    }}
//                                    listHeader={<div>
//                                        <Row>
//                                            <Column size={[1, 1, 1, 1]} className="list-center-header">{"Numero"}</Column>
//                                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Vencimiento"}</Column>
//                                            <Column size={[1, 2, 2, 2]} className="list-center-header">{"Saldo"}</Column>
//                                            <Column size={[1, 2, 2, 2]} className="list-center-header">{"Capital"}</Column>
//                                            <Column size={[1, 2, 2, 2]} className="list-center-header">{"Interes"}</Column>
//                                            <Column size={[1, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
//                                        </Row>
//                                    </div>}
//                                    listFooter={(values: any) => {
//                                        return <div>
//                                            <Row>
//                                                <Column size={[1, 1, 1, 1]} className="list-default-header">{""}</Column>
//                                                <Column size={[1, 1, 1, 1]} className="list-default-header">{""}</Column>
//                                                <Column size={[1, 2, 2, 2]} className="list-default-header">{""}</Column>
//                                                <Column size={[1, 2, 2, 2]} className="list-right-header">
//                                                    <span className="badge badge-info list-footer-badge">
//                                                        {EK.UX.Labels.formatMoney(values.Capital)}
//                                                    </span>
//                                                </Column>
//                                                <Column size={[1, 2, 2, 2]} className="list-right-header">
//                                                    <span className="badge badge-info list-footer-badge">
//                                                        {EK.UX.Labels.formatMoney(values.Interes)}
//                                                    </span>
//                                                </Column>
//                                                <Column size={[1, 2, 2, 2]} className="list-right-header">
//                                                    <span className="badge badge-info list-footer-badge">
//                                                        {EK.UX.Labels.formatMoney(values.Importe)}
//                                                    </span>
//                                                </Column>
//                                            </Row>
//                                        </div>;
//                                    }}
//                                    formatter={(index: number, item: any, values: any) => {
//                                        let itemStyle: React.CSSProperties = {
//                                            paddingTop: 5,
//                                            paddingBottom: 5
//                                        };
//                                        let buttonEdit: any;

//                                        if (item.TipoAbono && item.TipoAbono.Clave === "AC") {
//                                            itemStyle.backgroundColor = "#FFECB3";
//                                            itemStyle.borderTopLeftRadius = 10;
//                                            itemStyle.borderTopRightRadius = 10;
//                                            itemStyle.borderBottomLeftRadius = 10;
//                                            itemStyle.borderBottomRightRadius = 10;
//                                            itemStyle.fontWeight = "bolder";

//                                            if (this.state.editAbono === false && !this.props.venta) {
//                                                buttonEdit = <Column size={[2, 2, 2, 2]}>
//                                                    <Button className="btn  default btn-default-ek" onClick={this.onClickRemoveAbono} info={item} icon="icon-trash"></Button>
//                                                </Column>;
//                                            };
//                                        };

//                                        if (item.OnEdit === true) {
//                                            if (item.IsValid === true) {
//                                                itemStyle.backgroundColor = "#CCECB3";
//                                            } else {
//                                                itemStyle.backgroundColor = "#F36A5A";
//                                                itemStyle.color = "#fff";
//                                            }
//                                            itemStyle.borderTopLeftRadius = 10;
//                                            itemStyle.borderTopRightRadius = 10;
//                                            itemStyle.borderBottomLeftRadius = 10;
//                                            itemStyle.borderBottomRightRadius = 10;
//                                            itemStyle.fontWeight = "bolder";

//                                        };

//                                        return <Row style={itemStyle}>
//                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
//                                                {item.Numero ? item.Numero : "-----"}
//                                            </Column>
//                                            <Column size={[1, 1, 1, 1]}>
//                                                {EK.UX.Labels.formatDate(item.Vencimiento, "---------------")}
//                                            </Column>
//                                            <Column size={[6, 6, 2, 2]} style={{ textAlign: "right" }}>
//                                                {EK.UX.Labels.formatMoney(item.Saldo, "---------------")}
//                                            </Column>
//                                            <Column size={[6, 6, 2, 2]} style={{ textAlign: "right" }}>
//                                                {EK.UX.Labels.formatMoney(item.CapitalMoneda, "---------------")}
//                                            </Column>
//                                            <Column size={[6, 6, 2, 2]} style={{ textAlign: "right" }}>
//                                                {EK.UX.Labels.formatMoney(item.InteresMoneda, "---------------")}
//                                            </Column>
//                                            <Column size={[6, 6, 2, 2]} style={{ textAlign: "right" }}>
//                                                {EK.UX.Labels.formatMoney(item.ImporteMoneda, "---------------")}
//                                            </Column>
//                                            {buttonEdit}
//                                        </Row>;
//                                    }} />
//                                <div className="note bg-white" style={{ marginTop: 20 }}>
//                                    <p>Las fechas son expresadas en base a la localidad de <span className="bold">{compania.Localidad.Nombre}</span>, con la zona horaria <span className="bold">{compania.TimeZone.Nombre}</span></p>
//                                </div>
//                            </Column>
//                        </Row>
//                    </SectionView>
//                    <SectionEdit
//                        title="abono a capital"
//                        idForm={SECTION_ABONO_ID}
//                        onSave={this.onClickSaveAbono}
//                        onCancel={this.onClickCancel}>
//                        <EditAbono item={this.state.abono} documentos={documentos} />
//                    </SectionEdit>
//                </OptionSection>
//            </PanelUpdate>;
//        };
//    }
//    let Edit$Concepto: any = ReactRedux.connect(EditConcepto.props, EditConcepto.dispatchs)(EditConcepto);

//    /*** BEGIN: VIEW INFO CONCEPTO ***/
//    interface IViewConceptoProps extends React.Props<any> { };
//    class ViewFormConcepto extends React.Component<IViewConceptoProps, IViewConceptoProps> {
//        constructor(props: IViewConceptoProps) {
//            super(props);
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            let conceptoPago: any = Forms.getValue("ConceptoPago", SECTION_CONCEPTO_ID);
//            let frecuenciaPago: any = Forms.getValue("FrecuenciaPago", SECTION_CONCEPTO_ID);
//            let periodoPrimerPago: any = Forms.getValue("PeriodoPrimerPago", SECTION_CONCEPTO_ID);
//            return <Row>
//                <Label id="ConceptoPago" label="Concepto" value={conceptoPago ? conceptoPago.Nombre : ""} />
//                <Label id="ImporteMoneda" idForm={SECTION_CONCEPTO_ID} label={$page.form.section.planPagos.conceptos.importe.label}
//                    size={[12, 12, 6, 3]} />
//                <Label id="PorcentajeTIF" idForm={SECTION_CONCEPTO_ID} label={$page.form.section.planPagos.conceptos.porcentajeTIF.label}
//                    size={[12, 12, 6, 3]} />
//                <Label id="NumeroPagos" idForm={SECTION_CONCEPTO_ID} label={$page.form.section.planPagos.conceptos.numeroPagos.label}
//                    size={[12, 12, 6, 3]} />
//                <Label id="FrecuenciaPago" label={$page.form.section.planPagos.conceptos.periodo.label}
//                    size={[12, 12, 6, 3]} value={frecuenciaPago ? frecuenciaPago.Nombre : ""} />
//                <Label id="NumeroPlazoPrimerPago" idForm={SECTION_CONCEPTO_ID} label={$page.form.section.planPagos.conceptos.numeroPlazoPrimerPago.label}
//                    size={[12, 12, 6, 3]} />
//                <Label id="PeriodoPrimerPago" label={$page.form.section.planPagos.conceptos.periodoPrimerPago.label}
//                    size={[12, 12, 6, 3]} value={periodoPrimerPago ? periodoPrimerPago.Nombre : ""} />
//            </Row>;
//        };
//    };
//    //

//    /*** BEGIN: EDIT INFO CONCEPTO ***/
//    interface IEditFormConceptoProps extends React.Props<any> { };
//    class EditFormConcepto extends React.Component<IEditFormConceptoProps, IEditFormConceptoProps> {
//        constructor(props: IEditFormConceptoProps) {
//            super(props);
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            //let conceptoPago: any = Forms.getValue("ConceptoPago", SECTION_CONCEPTO_ID);
//            // let editConcepto: boolean = (conceptoPago && conceptoPago.Clave === "N");
//            let editConcepto: boolean = Forms.getValue("Nuevo", SECTION_CONCEPTO_ID);
//            return <Row>
//                <Input id="ID" visible={false} />
//                {editConcepto ? <ConceptosPagoDDL label="Concepto" tipoConcepto="N" id="ConceptoPago" idFormSection={SECTION_CONCEPTO_ID} /> :
//                    <Label id="ConceptoPago" idForm={SECTION_CONCEPTO_ID} label="Concepto" value={(value: any) => value ? value.Nombre : null} />}
//                <Currency
//                    id="ImporteMoneda"
//                    idFormSection={SECTION_CONCEPTO_ID}
//                    label={$page.form.section.planPagos.conceptos.importe.label}
//                    size={[12, 12, 6, 3]}
//                    maxLength={8}
//                    validations={[
//                        validations.isNumber($page.form.section.planPagos.conceptos.importe.validaciones.numero)
//                    ]} />
//                <Currency
//                    id="PorcentajeTIF"
//                    idFormSection={SECTION_CONCEPTO_ID}
//                    label={$page.form.section.planPagos.conceptos.porcentajeTIF.label}
//                    size={[12, 12, 6, 3]}
//                    maxLength={8}
//                    validations={[
//                        validations.isNumber($page.form.section.planPagos.conceptos.porcentajeTIF.validaciones.numero)
//                    ]} />
//                <Integer
//                    id="NumeroPagos"
//                    idFormSection={SECTION_CONCEPTO_ID}
//                    label={$page.form.section.planPagos.conceptos.numeroPagos.label}
//                    size={[12, 12, 6, 3]}
//                    maxLength={8}
//                    validations={[
//                        validations.required($page.form.section.planPagos.conceptos.numeroPagos.validaciones.requerida),
//                        validations.isNumber($page.form.section.planPagos.conceptos.numeroPagos.validaciones.numero)
//                    ]} />
//                <FrecuenciaPagoDDL
//                    idFormSection={SECTION_CONCEPTO_ID}
//                    label={$page.form.section.planPagos.conceptos.periodo.label}
//                    size={[12, 12, 6, 3]}
//                    validations={[
//                        validations.required($page.form.section.planPagos.conceptos.periodo.validaciones.requerida)
//                    ]} />
//                <Integer
//                    id="NumeroPlazoPrimerPago"
//                    idFormSection={SECTION_CONCEPTO_ID}
//                    label={$page.form.section.planPagos.conceptos.numeroPlazoPrimerPago.label}
//                    size={[12, 12, 6, 3]}
//                    maxLength={8}
//                    validations={[
//                        validations.required($page.form.section.planPagos.conceptos.numeroPlazoPrimerPago.validaciones.requerida),
//                        validations.isNumber($page.form.section.planPagos.conceptos.numeroPlazoPrimerPago.validaciones.numero)
//                    ]} />
//                <PeriodoPagoDDL
//                    id="PeriodoPrimerPago"
//                    idFormSection={SECTION_CONCEPTO_ID}
//                    label={$page.form.section.planPagos.conceptos.periodoPrimerPago.label}
//                    size={[12, 12, 6, 3]}
//                    required={true}
//                    helpLabel={$page.form.section.planPagos.conceptos.periodoPrimerPago.helplabel}
//                    validations={[
//                        validations.required($page.form.section.planPagos.conceptos.periodoPrimerPago.validaciones.requerida)
//                    ]} />
//            </Row>;
//        };
//    };
//    //

//    /*** BEGIN: EDIT ABONO ***/
//    interface IEditAbonoProps extends React.Props<any> {
//        item: any;
//        documentos?: any[];
//    };
//    class EditAbono extends React.Component<IEditAbonoProps, IEditAbonoProps> {
//        constructor(props: IEditAbonoProps) {
//            super(props);
//        };

//        getValues(): any {
//            let documentos: any[] = this.props.documentos;

//            for (var i = 0; i < documentos.length; i++) {
//                let doc: any = documentos[i];


//            };
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            let current: any = this.props.item;
//            let documentos: any[] = this.props.documentos;

//            let validate: (fecha: Date, importe: number, documentos: any[]) => any =
//                (fecha: Date, importe: number, documentos: any[]): any => {
//                    if (fecha === undefined || fecha === null ||
//                        importe === undefined || importe === null ||
//                        documentos === undefined || documentos === null || documentos.length === 0) {
//                        return false;
//                    };

//                    let isValid: boolean = false;

//                    for (var i = 0; i < documentos.length; i++) {
//                        let documento: any = documentos[i];
//                        let vencimiento: Date = documento.Vencimiento;
//                        if (fecha < vencimiento) {
//                            if (importe < documento.Saldo) {
//                                isValid = true;

//                                break;
//                            };
//                        };
//                    };

//                    return isValid;
//                };

//            let customValidation: EK.UX.Validations.ValidationError = validations.custom("valido", "", ["Fecha", "ImporteMoneda"],
//                (v: any, values?: any): boolean => {
//                    let that: any = this;
//                    return validate(values.Fecha, values.ImporteMoneda, this.props.documentos);
//                }
//            );

//            customValidation.data = documentos;

//            return <FadeInColumn>
//                <Row>
//                    <Input id="ID" value={current.ID} idFormSection={SECTION_ABONO_ID} visible={false} />
//                    <DatePicker
//                        id="Fecha"
//                        idFormSection={SECTION_ABONO_ID}
//                        label="Fecha de Abono"
//                        size={[3, 3, 3, 3]}
//                        validations={[
//                            validations.required("el inicio de vigencia es requerida"),
//                            customValidation
//                        ]}
//                        value={current.Vencimiento} />
//                    <Currency
//                        id="ImporteMoneda"
//                        idFormSection={SECTION_ABONO_ID}
//                        label={$page.form.section.planPagos.conceptos.importe.label}
//                        size={[3, 3, 3, 3]}
//                        value={current.CapitalMoneda}
//                        validations={[
//                            validations.required("se requiere el importe del abono"),
//                            validations.isNumber($page.form.section.planPagos.conceptos.importe.validaciones.numero),
//                            customValidation
//                        ]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    };
//    //

//    interface IPlanesPagoDDLProps extends IDropDrownListProps {
//        idDesarrollo?: number
//    };
//    class PlanesPago$DDL extends React.Component<IPlanesPagoDDLProps, {}> {
//        static props: any = (state: any) => ({
//            items: state.ventas.planesVenta
//        });

//        static defaultProps: IPlanesPagoDDLProps = {
//            id: "PlanPagos",
//            items: createDefaultStoreObject([]),
//            label: "",
//            helpLabel: "",
//            value: createDefaultStoreObject({}),
//            initialValue: undefined,
//            hasChanged: false,
//            hasValidationError: false,
//            required: false,
//            itemKey: "ID",
//            itemValue: "Descripcion",
//            size: [12, 12, 12, 12]
//        };

//        componentDidMount(): void {
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                if (!isNaN(this.props.idDesarrollo)) {
//                    dispatchAsync("scv-ventas-pv", "Ventas/PlanesDePagoPorDesarrollo(" + this.props.idDesarrollo + ")");
//                };
//            };
//        };

//        componentWillReceiveProps(nextProps: IPlanesPagoDDLProps): void {
//            if (!isLoadingOrSuccessful(nextProps.items)) {
//                if (this.props.idDesarrollo !== nextProps.idDesarrollo) {
//                    if (!isNaN(this.props.idDesarrollo)) {
//                        dispatchAsync("scv-ventas-pv", "Ventas/PlanesDePagoPorDesarrollo(" + nextProps.idDesarrollo + ")");
//                    };
//                };
//            };
//        };

//        render(): any {
//            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
//        };
//    };
//    const PlanesPagoDDL: any = ReactRedux.connect(PlanesPago$DDL.props, null)(PlanesPago$DDL);
//}
