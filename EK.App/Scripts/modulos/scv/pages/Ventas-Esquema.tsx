//namespace EK.Modules.SCV.Pages.Ventas {
//    "use strict";
//    const VENTA_PAGE_ID: string = "ventas";
//    const PAGE_ID: string = "ventas$Esquema";
//    const idFormNuevo: string = "$ventasNuevoEsquema";
//    const idFormCredito: string = "$ventasCredito";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        obtenerDatos?: (id: number) => void;
//        obtenerCatalogo?: () => void;
//        item?: any;
//        esquema?: DataElement;
//        params?: IParams;
//        guardar?: (item: any[], strUrl: string) => void;
//        isNew?: boolean;
//        global?: any;
//        obtenerEsquema?: (item: any) => void;
 
//    }

//    interface IState {
//        viewMode?: boolean;
//    }


//    class VentasEsquema extends React.Component<IProps, IState> {
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


//            let item: EditForm = Forms.getForm();
//            if (item !== undefined) {
//                let model: any = item
//                    .addNumberConst("ID", getDataID(this.props.item))
//                    .addObject("Esquema")
//                    .toObject();
//                this.props.guardar(model, "Ventas/SaveEsquema/" + getDataID(this.props.item));
//            }
//                this.setState({ viewMode: false });
//                go("/scv/ventas/" + getDataID(this.props.item))
//        }

//        editForm(): void {
//            Forms.remove(PAGE_ID);
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//                ReactRouter.hashHistory.goBack();
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.item, nextProps.item)) ||
//                (hasChanged(this.props.esquema, nextProps.esquema));
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);

//            let id: number = Number(this.props.params.id);
//            if (id) {
//                this.props.obtenerDatos(id);
//            };
//            Forms.createFormElement(PAGE_ID, "Esquema", getData(this.props.item).Esquema)
//            setCurrentEntityType(PAGE_ID);
//        };

//        componentWillReceiveProps(nextProps: IProps) {
//            if (hasChanged(this.props.item, nextProps.item)) {
//                setCurrentEntity(nextProps.item);
               
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
//           // let reestructurar = current && current.VersionReestructura === 0 ? false : true; 

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
//                        {editView && (!ventaAutorizada) ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView && (!ventaAutorizada) ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.item}>
//                        <Ventas$General />
//                        <Ventas$EsquemaEdit/>
//                    </PanelUpdate>
//                </PageV2>;

//            return page;
//        }
//    }

//    class $ventasEsquemaPage {
//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.ventas.selected,
//                esquema: state.ventas.esquema
//            };
//        };

//        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerDatos: (id: number): void => {
//                dispatchAsync("scv-ventas-setSelected", "Ventas/GetById/" + id);
//                dispatchAsync("scv-ventas-setEsquemaSelected", "Ventas/GetVentaEsquema/" + id);
//            },
//            guardar: (item: any, strUrl: string): void => {
//                dispatch(actionAsync({
//                    action: "scv-ventas-esquema-guardar",
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
//            },
//           obtenerEsquema: (item: any): void => {
//                dispatchSuccessful("scv-ventas-setEsquemaSelected", item);
//            },
//        });
//    };
//    export let Ventas$Esquema: any = ReactRedux.connect($ventasEsquemaPage.mapProps, $ventasEsquemaPage.mapDispatchs)(VentasEsquema);
//    ///***BEGIN***/
 
//    interface IEditEsquemaProps extends React.Props<any> {
//          esquema: DataElement;
//          form: any;
//          removeSelectedItem?: () => void;
//          setSelectedItem?: (item: any) => void;
//          obtenerEsquema: (idVenta: number) => void;
//          item?: any;
//          esquemaVta: DataElement;
//      }

//    interface IEditEsquemaState {
//        edicion: boolean;
//        EditEsquema: boolean;
//    }


//    class Edit extends React.Component<IEditEsquemaProps, IEditEsquemaState> {
//        constructor(props: IEditEsquemaProps) {
//            super(props);
//            this.state = { edicion: false, EditEsquema: false };

//            this.onClickCancel = this.onClickCancel.bind(this);
//            this.onClickSave = this.onClickSave.bind(this);
//            this.onEdit = this.onEdit.bind(this);
//            this.onDelete = this.onDelete.bind(this);
//            this.onSelectEsquema = this.onSelectEsquema.bind(this);
//            this.funcionState = this.funcionState.bind(this);
//       };
        
//        static props: any = (state: any) => ({
//            form: state.forms,
//            item: state.ventas.selected,
//            esquema: state.ventas.esquema
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelectedItem: (item: any): void => {
//                dispatchSuccessful("scv-ventas-setEsquemaSelected", item);
//            },
//            obtenerEsquema: (idVenta: any): void => {
//                dispatchAsync("scv-ventas-setEsquemaSelected", "Ventas/GetVentaEsquema/" + idVenta);
//            },
//            removeSelectedItem: (): void => {
//                dispatchDefault("scv-ventas-setEsquemaSelected", {});
//            },
//        });

  
//        onClickCancel(): void {
//            if (getDataID(this.props.esquema) > 0 && this.state.edicion) {
//                let model: any = getData(this.props.esquema);
//                this.setState({ edicion: false, EditEsquema: false });
//                this.props.setSelectedItem(model);
//            };
//        };

//        onClickSave(): void {
            
//            if (!Forms.isValid(idFormNuevo)) {
//                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//                return;
//            };



//            let item: EditForm = Forms.getForm(idFormNuevo);

//            let model: any = item
//                .addNumber("ID")
//                .addObject("Esquema")
//                .addObject("Creditos")
//                .addNumber("VersionVenta")
//                .addNumberConst("_nuevo", 1)
//                .toObject();

//            let lista: number = 0;

//            if (model.Creditos && model.Creditos.length > 0) {
//                model.Creditos.forEach((value: any, index: number) => {
//                    if (value && value._eliminado !== true) {
//                        lista++
//                    };
//                });
//            };

//            if (lista == 0) {
//                warning("Debe agregar Institución de Crédito para continuar.");
//                return;
//            };

//            this.props.setSelectedItem(model);
//            this.updateItems(model);
//            this.setState({ edicion: false, EditEsquema: false });
//            }

//        onEdit() {
//            Forms.remove(idFormNuevo);
//            this.props.setSelectedItem(getData(this.props.esquema));
//            Forms.createFormElement(idFormNuevo, "Creditos", getData(this.props.esquema).Creditos);
//            Forms.createFormElement(idFormNuevo, "Esquema", getData(this.props.esquema).Esquema);
//            this.setState({ edicion: true, EditEsquema: false });
//        };

//        onDelete() {
//            Forms.remove(idFormNuevo);
//            if (isSuccessful(this.props.esquema)) {
//                let item: any = getData(this.props.esquema);
//                item._eliminado = true;
//                this.updateItems(item);
//            };
//            this.props.removeSelectedItem();
//        };

//        onSelectEsquema(item: any): any {
//            Forms.updateFormElement(idFormNuevo, "Esquema", item);
//        };

//        updateItems(items: any): void {
//            Forms.updateFormElement(PAGE_ID, "Esquema", items);
//        };


//        shouldComponentUpdate(nextProps: IEditEsquemaProps, nextState: IEditEsquemaState): boolean {
//            return (hasChanged(this.props.esquema, nextProps.esquema) ||
//                this.state.EditEsquema !== nextState.EditEsquema);
//        };

       
//        componentDidMount(): any {
//            Forms.remove(idFormNuevo);
//            let ventaE: any = {};
//            if (isSuccessful(this.props.item)) {
//                ventaE = getData(this.props.item).Esquema;
//                if (ventaE == undefined || ventaE == null) {
//                    this.setState({ edicion: true, EditEsquema: true });
//                };
//            };
//            this.props.setSelectedItem(ventaE);
//        };

//        funcionState(state: boolean):void{
//            this.setState({ edicion: true, EditEsquema: state });
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            let items: DataElement;
//            let model: any = getData(this.props.esquema);
//            let element = Forms.getValue("Esquema", idFormNuevo);
//            let ventaEsquema: any = model.Esquema ? model.Esquema.Nombre : undefined;
//            let idEsquema: number = model.Esquema ? model.Esquema.ID : 0;
//            let ventaEsquemaID: any = getDataID(this.props.esquema) > 0 ? model.ID : -1;
//            let esquemaBeginEdited: boolean = this.state.edicion;

//            if (this.state.edicion || ventaEsquema == undefined) {
//                ventaEsquema = element ? element.Nombre: undefined;
//                idEsquema = element ? element.ID: 0;
//            };

//            let creditos: any;
//            if (isSuccessful(this.props.esquema)) {
//                creditos = createSuccessfulStoreObject(getData(this.props.esquema).Creditos);
//            };
            
//            return <OptionSection
//                title={$page.form.section.esquema.titulo}
//                editMode={esquemaBeginEdited}
//                collapsed={false}>
//                <SectionView onEdit={this.onEdit}>
//                    <div>
//                        <Row>
//                            <Label label={$page.form.section.esquema.label} value={ventaEsquema} size={[12, 12, 12, 12]} />
//                        </Row>
//                        <Row>
//                            <Column size={[12, 12, 12, 12]}>
//                                <View$Creditos ventaCreditos={creditos} />
//                            </Column>
//                        </Row>
//                        </div>
//                    </SectionView>
//                    <SectionEdit idForm={idFormNuevo} onSave={this.onClickSave}
//                        onCancel={this.onClickCancel}>
//                    <div key="esquema">
//                            <Row>
//                                <Column size={[12, 12, 12, 12]}>
//                                <Input id="ID" idFormSection={idFormNuevo} value={ventaEsquemaID} visible={false} />
//                                {(this.state.EditEsquema) ?
//                                    <EsquemasDDL idFormSection={idFormNuevo} size={[12, 12, 12, 12]} value={model.Esquema} required={true} change={this.onSelectEsquema} />
//                                    :
//                                    <div>
//                                        <Input id="IdEsquema" idFormSection={idFormNuevo} value={idEsquema} visible={false} />
//                                        <Label label={$page.form.section.esquema.label} value={ventaEsquema} size={[12, 12, 12, 12]} />
//                                        <Input id="VersionVenta" idFormSection={idFormNuevo} value={model.VersionVenta} visible={false} />
//                                   </div>
//                                }
//                                </Column>
//                            </Row>
//                            <Row>
//                            <Column size={[12, 12, 12, 12]}>
//                                <Edit$Creditos funcionState={this.funcionState}/>
//                              </Column>
//                            </Row>
//                        </div>
//                    </SectionEdit>
//            </OptionSection>;
//        };
//    };

//    let Ventas$EsquemaEdit: any = ReactRedux.connect(Edit.props, Edit.dispatchs)(Edit);
//    ///***END***/

//    //
//    //Sección para agregar Instituciones de Crédito.
//    interface IEditCreditosProps extends React.Props<any> {
//        ventaCreditos: DataElement;
//        form: any;
//        ventaCredito: any;
//        removeSelectedCredito?: () => void;
//        setSelectedCredito?: (item: any) => void;
//        funcionState?: (State: boolean) => void;
//    }
//    class EditCreditos extends React.Component<IEditCreditosProps, {}> {
//        constructor(props: IEditCreditosProps) {
//            super(props);
//            this.onClickNew = this.onClickNew.bind(this);
//            this.onClickCancel = this.onClickCancel.bind(this);
//            this.onClickSave = this.onClickSave.bind(this);
//            this.onClickSelectItem = this.onClickSelectItem.bind(this);
//            this.onClickRemoveItem = this.onClickRemoveItem.bind(this);
//        };
//        //
//        static props: any = (state: any) => ({
//            ventaCredito: state.ventas.ventaCredito,
//            form: state.forms,
//            ventaCreditos: Forms.getDataValue("Creditos", idFormNuevo, state, [])
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            removeSelectedCredito: (): void => {
//                dispatchDefault("scv-ventas-setSelectedCredito", {});
//            },
//            setSelectedCredito: (item: any): void => {
//                dispatchSuccessful("scv-ventas-setSelectedCredito", item);
//            }
//        });
//        //
//        onClickNew(): void {
            
//            let newId: number = 0;
//            let creditos: any[] = getData(this.props.ventaCreditos);
           
//            creditos.forEach((value: any, index: number) => {
//                if (value.ID <= 0) {
//                    if (value.ID < newId) {
//                        newId = value.ID;
//                    };
//                };
//            });

//            newId--;

//            let item: any = {
//                ID: newId,
//                Institucion: "",
//                Comentarios: "",
//                MontoCredito: 0
//            };

//            Forms.remove(idFormCredito);
//            this.props.setSelectedCredito(item);
//            let esquema: EditForm = Forms.getForm(idFormNuevo);

//            let model: any = esquema
//                .addObject("Esquema")
//                .toObject();

//            Forms.updateFormElement(idFormNuevo, "Esquema", model.Esquema);
//            this.props.funcionState(false);
//        };

//        onClickSave(): void {
//            if (!Forms.isValid(idFormCredito)) {
//                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//                return;
//            };

//            let item: EditForm = Forms.getForm(idFormCredito);

//            let model: any = item
//                .addNumber("ID")
//                .addObject("Institucion")
//                .addString("Comentarios")
//                .addNumber("MontoCredito")
//                .toObject();
            
//            this.setState({ edicion: false });

//            if (this.props.ventaCreditos) {
//                let items: any[] = getData(this.props.ventaCreditos.upsertItem(model));

//                this.props.removeSelectedCredito();
//                this.updateItems(items);
//                this.props.funcionState(false);
//            };
//        };

//        onClickCancel(): void {
//            this.props.removeSelectedCredito()
//            if (isSuccessful(this.props.ventaCreditos)) {
//                let items = this.props.ventaCreditos.getActiveItems();
//                if (items && items.data.length > 0) {
//                    this.props.funcionState(false);
//                } else
//                { this.props.funcionState(true);};
//            }
//        };

//        onClickSelectItem(item: any): void {
//            Forms.remove(idFormCredito);
//            this.props.setSelectedCredito(item);
//        };

//        onClickRemoveItem(item: any): void {
//            if (isSuccessful(this.props.ventaCreditos)) {
//                let lista: number = 0;
//                let items: any[] = getData(this.props.ventaCreditos.removeItem(item));
//                this.updateItems(items);

//                if (items && items.length > 0) {
//                    items.forEach((value: any, index: number) => {
//                        if (value && value._eliminado !== true && value.ID !== item.ID) {
//                            lista ++
//                        };
//                    });
//                };
                
//                if (lista == 0){
//                    this.props.funcionState(true);
//                };
//            };
//        };
        
//        updateItems(items: any): void {
//            Forms.updateFormElement(idFormNuevo, "Creditos", items);
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            let items: DataElement;
//            let BeginEdited: boolean = (isSuccessful(this.props.ventaCredito));
//            let model: any = getData(this.props.ventaCredito);

//            if (isSuccessful(this.props.ventaCreditos)) {
//                items = this.props.ventaCreditos.getActiveItems();
//            }

//            return <OptionSection title={$page.form.section.esquema.institucion.titulo} editMode={BeginEdited} inverse={true} collapsed={false} level={1}>
//                <SectionView onAddNew={this.onClickNew}>
//                    <List
//                        items={items}
//                        readonly={false}
//                        addRemoveButton={false}
//                        dragAndDrop={false}
//                        aggregate={(item: any, values: any) => {
//                            if (!values.MontoCredito) values.MontoCredito = 0;
//                            values.MontoCredito += item.MontoCredito ? item.MontoCredito : 0;
//                            return values;
//                        }}
//                        listHeader={<div key="listHeaderKey">
//                            <Row style={{ paddingTop: 5, paddingBottom: 5 }}>
//                                <Column size={[4, 4, 4, 4]} className="list-center-header">
//                                    <span style={{ fontWeight: 600, marginLeft: 10, marginRight: 10 }}>{$page.form.section.esquema.institucion.label}</span>
//                                </Column>
//                                <Column size={[4, 4, 4, 4]} className="list-center-header">
//                                    <span style={{ fontWeight: 600, marginLeft: 10, marginRight: 10 }}>{$page.form.section.esquema.comentarios}</span>
//                                </Column>
//                                <Column size={[2, 2, 2, 2]} className="list-center-header">
//                                    <span style={{ fontWeight: 600, marginLeft: 10, marginRight: 10 }}>{$page.form.section.esquema.montoCredito.label}</span>
//                                </Column>
//                            </Row>
//                        </div>}
//                        listFooter={(values: any) => {
//                            return <div>
//                                <Row>
//                                    <Column size={[8, 8, 8, 8]} style={{ textAlign: "right" }}>{""}</Column>
//                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
//                                        <span className="badge badge-info list-footer-badge">
//                                            {EK.UX.Labels.formatMoney(values.MontoCredito)}
//                                        </span>
//                                    </Column>
//                                </Row>
//                            </div>;
//                        }}
//                        formatter={(index: number, item: any) => {
//                            return <Row>
//                                <Column size={[4, 4, 4, 4]} className="listItem-default-header">{item.Institucion.Descripcion}</Column>
//                                <Column size={[4, 4, 4, 4]} className="listItem-default-header">{item.Comentarios}</Column>
//                                <Column size={[2, 2, 2, 2]} className="listItem-default-header">{EK.UX.Labels.formatMoney(item.MontoCredito)}</Column>
//                                <Column size={[2, 2, 2, 2]}>
//                                    <Button className="btn  default btn  default btn-default-ek" style={{ float: "right" }} onClick={this.onClickSelectItem} info={item} icon="icon-pencil"></Button>
//                                    <Button className="btn  default btn  default btn-default-ek" style={{ float: "right" }} onClick={this.onClickRemoveItem} info={item} icon="icon-trash"></Button>
//                                </Column>
//                            </Row>;
//                        }} />
//                </SectionView>
//                <SectionEdit
//                idForm={idFormCredito} onSave={this.onClickSave}
//                onCancel={this.onClickCancel}>
//                    <div>
//                    <Row>
//                        <Column size={[12, 12, 12, 12]}>
//                            <Input id="ID" idFormSection={idFormCredito} value={model.ID} visible={false} size={[1, 1, 1, 1]}/>
//                            <InstitucionesDDL id="Institucion" idFormSection={idFormCredito} size={[4, 4, 4, 4]} value={model.Institucion} required={true} />
//                            <Input
//                                    id="Comentarios"
//                                    label={$page.form.section.esquema.comentarios}
//                                    idFormSection={idFormCredito}
//                                    value={model.Comentarios}
//                                    size={[4, 4, 4, 4]} />
//                            <Currency
//                                    id="MontoCredito"
//                                    idFormSection={idFormCredito}
//                                    label={$page.form.section.esquema.montoCredito.label}
//                                    value={model.MontoCredito}
//                                    maxLength={8}
//                                    required={true} 
//                                    validations={[
//                                        validations.required($page.form.section.esquema.montoCredito.validaciones.requerida),
//                                        validations.isNumber($page.form.section.esquema.montoCredito.validaciones.requerida)
//                                    ]}
//                                    size={[2, 2, 2, 2]} />
//                        </Column>
//                    </Row>
//                </div>
//                </SectionEdit>
//            </OptionSection>;
//        };
//    };

//    const Edit$Creditos: any = ReactRedux.connect(EditCreditos.props, EditCreditos.dispatchs)(EditCreditos);
//    //

//    //Sección para agregar Instituciones de Crédito.
//    interface IViewCreditosState {

//    }

//    interface IViewCreditosProps extends React.Props<any> {
//        ventaCreditos: DataElement;
//    }
//    class ViewCreditos extends React.Component<IViewCreditosProps, IViewCreditosState> {
//        constructor(props: IViewCreditosProps) {
//            super(props);
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            let items: DataElement;
            
//            if (isSuccessful(this.props.ventaCreditos)) {
//                items = this.props.ventaCreditos.getActiveItems();
//            }

//            return <OptionSection title={$page.form.section.esquema.institucion.titulo} editMode={false} inverse={true} collapsed={false} hideCollapseButton={true} level={1}>
//                <SectionView >
//                    <List
//                        items={items}
//                        readonly={false}
//                        addRemoveButton={false}
//                        dragAndDrop={false}
//                        aggregate={(item: any, values: any) => {

//                            if (!values.MontoCredito) values.MontoCredito = 0;

//                            values.MontoCredito += item.MontoCredito ? item.MontoCredito : 0;
//                            return values;
//                        }}
//                        listHeader={<div key="listHeaderKey">
//                            <Row style={{ paddingTop: 5, paddingBottom: 5 }}>
//                                <Column size={[4, 4, 4, 4]} className="list-default-header">{$page.form.section.esquema.institucion.label}</Column>
//                                <Column size={[4, 4, 4, 4]} className="list-default-header">{$page.form.section.esquema.comentarios}</Column>
//                                <Column size={[2, 2, 2, 2]} className="list-default-header">{$page.form.section.esquema.montoCredito.label}</Column>
//                            </Row>
//                        </div>}
//                        listFooter={(values: any) => {
//                            return <div>
//                                <Row>
//                                    <Column size={[8, 8, 8, 8]} style={{ textAlign: "right" }}>{""}</Column>
//                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
//                                        <span className="badge badge-info list-footer-badge">
//                                            {EK.UX.Labels.formatMoney(values.MontoCredito)}
//                                        </span>
//                                    </Column>
//                                </Row>
//                            </div>;
//                        }}
//                        formatter={(index: number, item: any) => {
//                            return <Row>
//                                <Column size={[4, 4, 4, 4]} className="listItem-default-header">{item.Institucion.Descripcion}</Column>
//                                <Column size={[4, 4, 4, 4]} className="listItem-default-header">{item.Comentarios}</Column>
//                                <Column size={[2, 2, 2, 2]} className="listItem-default-header">{EK.UX.Labels.formatMoney(item.MontoCredito)}</Column>
//                            </Row>;
//                        }} />
//                </SectionView>
//                <SectionEdit>
//                </SectionEdit>
//            </OptionSection>;
//        };
//    };

  
//    //

//    export let View$Creditos: any = ReactRedux.connect()(ViewCreditos);


//    interface IInstitucionesProps extends IDropDrownListProps {
//        esquema?: any;
//    }

//    export class Instituciones$DDL extends React.Component<IInstitucionesProps, IInstitucionesProps> {
//        static props: any = (state: any) => ({
//            items: state.instituciones.catalogo
//        });

//        constructor(props: IInstitucionesProps) {
//            super(props);
//            this.state = {
//                esquema: Forms.getFormElement("$ventasNuevoEsquema", { id: "Esquema" }) }
//        }

//        static defaultProps: IDropDrownListProps = {
//            id: "Institucion",
//            items: createDefaultStoreObject([]),
//            label: "Institución de Crédito",
//            helpLabel: "Seleccione la Institución de Crédito",
//            value: createDefaultStoreObject({}),
//            initialValue: undefined,
//            hasChanged: false,
//            hasValidationError: false,
//            required: false,
//            itemKey: "ID",
//            itemValue: "Descripcion",
//            size: undefined
//        };

//        refs: {
//            ddl: Element;
//            requiredPoint: Element;
//        }
        
//        componentWillReceiveProps(nextProps: IInstitucionesProps): void {

//            let element: EK.UX.IFormElement = Forms.getFormElement("$ventasNuevoEsquema", { id: "Esquema" });

//            if (!isEmptyObject(element.value)) {
//                if (element.value.ID != this.state.esquema.ID) {
//                    this.setState({ esquema: element.value });
//                    dispatchAsync("instituciones-catalogo", "Instituciones/GetInstitucionesEsquema");
//                };
//            };
//        };

//        componentDidMount(): void{
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                let element: EK.UX.IFormElement = Forms.getFormElement("$ventasNuevoEsquema", { id: "IdEsquema" });
//                if (element.value > 0) {
//                    dispatchAsync("instituciones-catalogo", "Instituciones/GetInstitucionesEsquema");
//                };
//            };
//        };

//        render(): any {
//            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;

//        };
//    }

//    export let InstitucionesDDL: any = ReactRedux.connect(
//        Instituciones$DDL.props, null)(Instituciones$DDL);

//    interface IEsquemasDDLProps extends IDropDrownListProps {
//        Institucion?: DataElement;
//    }

//    class Esquemas$DDL extends React.Component<IEsquemasDDLProps, {}> {
//        static props: any = (state: any) => ({
//            items: state.esquemas.catalogo
//        });

//        static defaultProps: IEsquemasDDLProps = {
//            id: "Esquema",
//            items: createDefaultStoreObject([]),
//            label: "Esquema de Financiamiento",
//            helpLabel: "",
//            value: createDefaultStoreObject({}),
//            initialValue: undefined,
//            hasChanged: false,
//            hasValidationError: false,
//            required: false,
//            itemKey: "ID",
//            itemValue: "Nombre",
//            size: [12, 12, 12, 12],
//        };

//        componentDidMount(): void {
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                dispatchAsync("scv-esquemas-catalogo", "base/scv/esquemas/all/" + global.encodeParameters({}));
//                //dispatchAsync("scv-esquemas-catalogo", "esquemas/GetAll(0)");
//            };
//        };

//        render(): any {
//            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
//        };
//    };

//    const EsquemasDDL: any = ReactRedux.connect(Esquemas$DDL.props, null)(Esquemas$DDL);

//}

