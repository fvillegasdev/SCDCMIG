namespace EK.Modules.SCV.Pages.SCVPlanesPagos {
    "use strict";
    const scv_Planes_Pagos_ConceptosPago: string = "scv_Planes_Pagos_ConceptosPago";
    const scv_Planes_Pagos_Configuracion: string = "Configuracion";
    const config: page.IPageConfig = global.createPageConfig("planesPagos", "scv", [scv_Planes_Pagos_ConceptosPago, scv_Planes_Pagos_Configuracion]);
    let PAGE_ID = "Planes de Pagos";

    const Encabezado_scv_Planes_Pagos_ConceptosPago: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 1, 1, 1]} className="list-default-header">{"Orden"}</Column>
                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Concepto de Pago"}</Column>
                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tipo"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">{"Plazo"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">{"%Venta"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">{"Formula"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">{"Modificable"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">{"Impresión"}</Column>
            </Row>
        </div>;


    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addString("Descripcion")
                .addDate("VigenciaInicio")
                .addDate("VigenciaFin")
                .addObject("Moneda")
                .addObject(scv_Planes_Pagos_ConceptosPago)
                .addObject(scv_Planes_Pagos_Configuracion)
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            var Id_Plan_Pago = getDataID(props.entidad);
            if (Id_Plan_Pago === -1) {
                global.dispatchSuccessful("global-page-data", [], scv_Planes_Pagos_ConceptosPago);
                global.dispatchSuccessful("global-page-data", [], scv_Planes_Pagos_Configuracion);  
            }
            else {
                let url: string = global.encodeAllURL("scv", "PlanesPagoConceptosPagos", { id: Id_Plan_Pago });
                global.dispatchAsync("global-page-data", url, scv_Planes_Pagos_ConceptosPago);
                let parametros: any = global.assign({ idPlanPagos: Id_Plan_Pago });
                props.config.dispatchCatalogoBase("base/scv/planesPagos/Get/GetListConfiguracionById/", parametros, scv_Planes_Pagos_Configuracion);
            };

        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        render(): JSX.Element {
            

            /*
            let fnvalidarimporteporcentaje = function (v: any, values?: any): boolean {
                let porcentaje: any = Forms.getValue("Porcentaje", scv_Planes_Pagos_ConceptosPago);
                if (!v || v == null || v == 0) {
                    return true;
                } else {
                    if (!porcentaje || porcentaje == null || porcentaje == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            */
            let fnValidateMin = function (v: any, values?: any): boolean {
                if (v) {
                    return v > 0;
                }
                return true;
            }

            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={PAGE_ID}
                        icon="fa fa-edit" collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={20} validations={[validations.required()]}/>
                            <Input id={"Descripcion"} size={[12, 12, 8, 8]} validations={[validations.required()]}/>
                            <checkBox.Status size={[12, 12, 2, 2]} validations={[validations.required()]}/>
                            <DatePicker id={"VigenciaInicio"} size={[12, 12, 4, 4]} required={true} maxLength={8} validations={[validations.required()]}/>
                            <DatePicker id={"VigenciaFin"} size={[12, 12, 4, 4]} required={true} maxLength={8} validations={[validations.required()]} />
                            <MonedasDDL  id={"Moneda"} size={[12, 12, 4,4]} required={true} validations={[validations.required()]}/>
                        </Row>
                        <page.SectionList
                            id={scv_Planes_Pagos_ConceptosPago}
                            parent={config.id}
                            level={1}
                            icon="fa fa-object-ungroup"
                            style={{ paddingTop: 20 }}
                            size={[12, 12, 12, 12]}
                            listHeader={Encabezado_scv_Planes_Pagos_ConceptosPago}
                            items={createSuccessfulStoreObject([])} readonly={false}
                            addRemoveButton={false}
                            onValidations={() => {
                                let porcentaje: any = Forms.getValue("Porcentaje", scv_Planes_Pagos_ConceptosPago);
                                let importe: any = Forms.getValue("Importe", scv_Planes_Pagos_ConceptosPago);
                                let formula: any = Forms.getValue("Formula", scv_Planes_Pagos_ConceptosPago);

                                let sumaTotal: number = 0;

                                if (porcentaje && porcentaje != 0) {
                                    sumaTotal = sumaTotal+1;
                                }


                                if (importe && importe != 0) {
                                    sumaTotal = sumaTotal+1;
                                }

                                if (formula && (formula != "" || formula != null)) {
                                    sumaTotal = sumaTotal+1;
                                }

                                if (sumaTotal > 1) {
                                    warning("Sólo se puede llenar uno de los campos de importe/porcentaje/fórmula, no ambos")
                                    return false;
                                }
                                return true;
                            }}

                            mapFormToEntity={(form: EditForm): any => {
                               return form
                                    .addID()
                                    .addObject("ConceptoPago")
                                    .addBoolean("Modificable")
                                    .addNumber("Importe")
                                    .addNumber("Porcentaje")
                                    .addNumber("NumeroPagos")
                                    .addObject("FrecuenciaPago")
                                    .addNumber("PorcentajeTIF")
                                    .addNumber("NumeroPlazoPrimerPago")
                                    .addObject("PeriodoPrimerPago")
                                    .addBoolean("Impresion")
                                    .addNumber("Orden")
                                    .addBoolean("Venta")
                                    .addBoolean("Reestructura")
                                    .addBoolean("Finiquito")
                                    .addString("Formula")
                                    .addVersion()
                                    .addEstatus()
                                    .toObject();                              
                            }}
                            formatter={(index: number, item: any) => {
                                return <Row>

                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                        <span>{item.Orden}</span>
                                    </Column>
                                    <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                        <span>{item.ConceptoPago.Nombre}</span>
                                    </Column>
                                    <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                        <span>{item.ConceptoPago.TipoConceptoPago.Nombre}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]}  className="listItem-default-item">
                                        <span>{item.NumeroPagos + ' - ' + item.FrecuenciaPago.Nombre}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                        <span>{EK.UX.Labels.formatDecimal(item.Importe)}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                        <span>{EK.UX.Labels.formatDecimal(item.Porcentaje)}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                        <span>{item.Formula}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                        <span style={{ color: "lightgrey" }}>{EK.UX.Labels.bool(item.Modificable)}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                        <span style={{ color: "lightgrey" }}>{ EK.UX.Labels.bool(item.Impresion) }</span>
                                    </Column>

                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                        <buttons.PopOver idParent={config.id} idForm={scv_Planes_Pagos_ConceptosPago} info={item}
                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                    </Column>
                                </Row>;
                            }}>
                            <Row>
                                <input.Integer id="Orden" idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 2, 2, 2]} validations={[validations.required()]} />
                                <ConceptosPagoDDL id={"ConceptoPago"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 7, 7, 7]} validations={[validations.required()]} />

                                <CheckBox id={"Venta"} idFormSection={scv_Planes_Pagos_ConceptosPago}  size={[12, 12, 1, 1]} />
                                <CheckBox id={"Reestructura"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 1, 1, 1]} />
                                <CheckBox id={"Finiquito"} idFormSection={scv_Planes_Pagos_ConceptosPago}  size={[12, 2, 1, 1]} />

                                <Importe />
                                <Porcentaje/>
                                <input.Text id="Formula" idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 6, 6, 6]} />

                                <Currency id={"PorcentajeTIF"} placeHolder={"0"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 2, 2, 2]}  maxLength={8} />
                                <Currency id={"PorcentajeTIM"} placeHolder={"0"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 2, 2, 2]} maxLength={8} />
                                <Integer id={"NumeroPagos"} placeHolder={"1"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 2, 2, 2]} maxLength={8} />

                                <FrecuenciaPagoDDL id={"FrecuenciaPago"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 2, 2, 2]}  />
                                <PeriodoPagoDDL id={"PeriodoPrimerPago"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 2, 2, 2]} />
                                <Integer id={"NumeroPlazoPrimerPago"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 2, 2, 2]} validations={[validations.required(), validations.custom("", "el valor no puede ser 0",[], fnValidateMin)]} maxLength={8} />


                                <CheckBox id={"Impresion"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 1, 1, 1]} />
                                <CampoModificable/>
                            </Row>
                        </page.SectionList>
                        <TiposFC />
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
                        level="main"
                        subTitle={PAGE_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave id="Clave" size={[12, 12, 2, 2]}  />
                            <Label id={"Descripcion"} size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                            <label.Fecha id={"VigenciaInicio"} size={[12, 12, 4, 4]} />
                            <label.Fecha id={"VigenciaFin"} size={[12, 12, 4, 4]} />
                            <label.Moneda id={"Moneda"} size={[12, 12, 4, 4]}/>

                        </Row>
                        <page.SectionList
                            id={scv_Planes_Pagos_ConceptosPago}
                            parent={config.id}
                            icon="fa fa-object-ungroup"
                            level={1}
                            style={{ paddingTop: 20 }}
                            size={[12, 12, 12, 12]}
                            listHeader={Encabezado_scv_Planes_Pagos_ConceptosPago}
                            items={createSuccessfulStoreObject([])}
                            readonly={false}
                            addRemoveButton={false}
                            formatter={(index: number, item: any) => {
                                return <Row>

                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                        <span className="badge badge-success">{item.Orden}</span>
                                    </Column>
                                    <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                        <span>{item.ConceptoPago.Nombre}</span>
                                    </Column>
                                    <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                        <span> {item.ConceptoPago.TipoConceptoPago.Nombre}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                        <span>{item.NumeroPagos + ' - ' + item.FrecuenciaPago.Nombre}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                        <span>{EK.UX.Labels.formatDecimal(item.Importe)}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                        <span>{EK.UX.Labels.formatDecimal(item.Porcentaje)}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                        <span>{item.Formula}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                        <span style={{ color: "lightgrey" }}>{EK.UX.Labels.bool(item.Modificable)}</span>
                                    </Column>
                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                        <span style={{ color: "lightgrey" }}>{EK.UX.Labels.bool(item.Impresion)}</span>
                                    </Column>
                                </Row>;
                            }}>
                        </page.SectionList>
                        <TiposFC />
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
    export let TiposFC: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;

            return <page.SectionList
                id={scv_Planes_Pagos_Configuracion}
                parent={config.id}
                icon="fa fa-cog"
                level={1}
                size={[12, 6, 6, 6]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">{"Tipos de Financiamiento"}</Column>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">{"Tipos de Comercialización"}</Column>
                    </Row>
                </div>}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()                        
                        .addNumber("IdTipoFinanciamiento")
                        .addNumber("IdTipoComercializacion")
                        .addObject("TipoFinanciamiento")
                        .addObject("TipoComercializacion")
                        .toObject()

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {                            
                            let TipoComercializacion: any = value.TipoComercializacion === null ? null : value.TipoComercializacion.ID;
                            let TipoFinanciamiento: any = value.TipoFinanciamiento === null ? null : value.TipoFinanciamiento.ID;                       
                            if (TipoFinanciamiento === retValue.IdTipoFinanciamiento &&
                                TipoComercializacion === retValue.IdTipoComercializacion) {
                                if (value.ID < 0) {
                                    retValue = null;
                                }
                                else {
                                    retValue.ID = value.ID;
                                    retValue._found = true;
                                }
                            }
                        });
                    };

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    let nombreFinanciamiento: any = (item.TipoFinanciamiento == null) || (item.TipoFinanciamiento.ID == null) ? "Todos" : item.TipoFinanciamiento.Nombre;
                    let nombreComercializacion: any = (item.TipoComercializacion == null) || (item.TipoComercializacion.ID == null) ? "Todos" : item.TipoComercializacion.Nombre;
                    return <Row>
                        <Column size={[6, 6, 6, 6]} className="listItem-default-header">
                            <span>{nombreFinanciamiento}</span>
                        </Column>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                            <span>{nombreComercializacion}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={scv_Planes_Pagos_Configuracion} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} size={[1, 1, 1, 1]} />
                        }
                    </Row>
                }}>
                <Row>
                    <Column>
                        <ddl.TiposFinanciamientoDDL idFormSection={scv_Planes_Pagos_Configuracion} addNewItem={"VT"} addNewItemText={"Todos"} />
                        <ddl.TipoComercializacionDDL idFormSection={scv_Planes_Pagos_Configuracion} addNewItem={"VT"} addNewItemText={"Todos"} cargarDatos={true} />
                    </Column>

                </Row>
            </page.SectionList>
        }
    })



    interface ICampoModificable extends page.IProps {
        formula?: any;
    };

    export let CampoModificable: any = global.connect(class extends React.Component<ICampoModificable, ICampoModificable> {
        constructor(props: ICampoModificable) {
            super(props);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.formula = Forms.getValue("Formula", scv_Planes_Pagos_ConceptosPago)
            return retValue;
        };
        render(): JSX.Element
        {
            let valorFormula: any = this.props.formula;
            if (valorFormula == "" || valorFormula == null || valorFormula == undefined)
            {
                return <CheckBox id={"Modificable"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 2, 1, 1]} />
            }
            return null;
        }
    });


    interface IImporte extends page.IProps {
        importe?: any;
    };
    export let Importe: any = global.connect(class extends React.Component<IImporte, IImporte> {
        constructor(props: IImporte) {
            super(props);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.importe = Forms.getValue("Importe", scv_Planes_Pagos_ConceptosPago)
            return retValue;
        };
        componentWillReceiveProps(nextProps: IImporte, nextState: IImporte): any
        {

            if (global.hasChanged(this.props.importe, nextProps.importe))
            {
                if (nextProps.importe == null || nextProps.importe == undefined)
                {
                    Forms.updateFormElement(scv_Planes_Pagos_ConceptosPago, "Importe", 0);
                }
            };
        };
        render(): JSX.Element {

            return <Currency id={"Importe"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 3, 3, 3]} maxLength={8} />;
        }
    });


    interface IPorcentaje extends page.IProps {
        porcentaje?: any;
    };
    export let Porcentaje: any = global.connect(class extends React.Component<IPorcentaje, IPorcentaje> {
        constructor(props: IPorcentaje) {
            super(props);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.porcentaje = Forms.getValue("Porcentaje", scv_Planes_Pagos_ConceptosPago)
            return retValue;
        };
        componentWillReceiveProps(nextProps: IPorcentaje, nextState: IPorcentaje): any {

            if (global.hasChanged(this.props.porcentaje, nextProps.porcentaje))
            {
                if (nextProps.porcentaje == null || nextProps.porcentaje == undefined) {
                    Forms.updateFormElement(scv_Planes_Pagos_ConceptosPago, "Porcentaje", 0);
                }
            };
        };
        render(): JSX.Element {

            let fnValidatePorc = function (v: any, values?: any): boolean {
                if (v) {
                    let porcentajeActual: number = Number(v);
                    let porcentajeAnterior: number = Number(values.Porcentaje);
                    let porcentaje: any[] = global.getData(Forms.getValue(scv_Planes_Pagos_ConceptosPago, config.id));
                    let total: number = porcentajeActual - porcentajeAnterior;
                    porcentaje.forEach((item: any, index: number) => {
                        total += item.Porcentaje;
                    })
                    if (total > 100) {
                        return false;
                    }
                    return true
                }
                return true;

            }

            return <Currency id={"Porcentaje"} idFormSection={scv_Planes_Pagos_ConceptosPago} size={[12, 3, 3, 3]} maxLength={8} validations={[validations.custom("", "El Porcentaje total no puede ser Mayor que 100", ["Porcentaje"], fnValidatePorc)]} />

        }
    });

};
//namespace EK.Modules.SCV.Pages.SCVPlanesPagos {
//    "use strict";
//    const PAGE_ID: string = "planesPagos";
//    const SECTION_ID: string = "planesPagos$ConceptosPago";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        obtenerItem?: (id: number) => void;
//        obtenerCatalogo?: () => void;
//        item?: any;
//        params?: IParams;
//        guardar?: (item: any) => void;
//        isNew?: boolean;
//        global?: any;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    class ListHeader {
//        static getListHeader($page: any): JSX.Element {
//            let header: JSX.Element =
//                <Row style={{ paddingTop: 5, paddingBottom: 5 }}>
//                    <Column size={[3, 3, 3, 3]} className="list-default-header">
//                        {$page.form.section.conceptos.list.headers.concepto}
//                    </Column>
//                    <Column size={[2, 2, 2, 2]} className="list-default-header">
//                        {$page.form.section.conceptos.list.headers.tipo}
//                    </Column>
//                    <Column size={[2, 2, 2, 2]} className="list-default-header">
//                        {$page.form.section.conceptos.list.headers.plazo}
//                    </Column>
//                    <Column size={[1, 1, 1, 1]} className="list-default-header">
//                        {$page.form.section.conceptos.list.headers.importe}
//                    </Column>
//                    <Column size={[1, 1, 1, 1]} className="list-default-header">
//                        {$page.form.section.conceptos.list.headers.porcentaje}
//                    </Column>
//                    <Column size={[1, 1, 1, 1]} className="list-default-header">
//                        {$page.form.section.conceptos.list.headers.modificable}
//                    </Column>
//                </Row>;

//            return header;
//        }
//    }

//    export class ConnectedSCVPlanesPagosEditarPage extends React.Component<IProps, IState> {
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

//        editForm(): void {
//            Forms.remove(PAGE_ID);
//            Forms.createFormElement(PAGE_ID, "ConceptosPago", getData(this.props.item).ConceptosPago);
//            this.setState({ viewMode: false });
//        };

//        saveForm(): void {
//            if (!Forms.isValid(PAGE_ID)) {
//                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
//                return;
//            };

//            let item: EditForm = Forms.getForm();
//            let model: any = item
//                .addNumberConst("ID", getDataID(this.props.item))
//                .addString("Clave")
//                .addString("Descripcion")
//                .addEstatus("Estatus")
//                .addObject("Moneda")
//                .addDate("VigenciaInicio")
//                .addDate("VigenciaFin")
//                .addObject("ConceptosPago")
//                .toObject();
//            this.props.guardar(model);
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
//            setCurrentEntityType(PAGE_ID);
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
//                    this.props.obtenerItem(id);
//                } else {
//                    dispatchFailed("scv-planesPagos-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("scv-planesPagos-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

//        componentWillReceiveProps(nextProps: IProps) {
//            if (hasChanged(this.props.item, nextProps.item)) {
//                setCurrentEntity(nextProps.item);
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
//            let bc: any = [$bc.global.ek, $bc.scv.pd, $bc.scv.planesPagos];

//            let editView: boolean = !this.state.viewMode;
//            let title: IPageTitle;
//            let current: any = this.props.item.data;

//            title = {
//                title: !this.props.isNew ? current.Descripcion : $page.edit.titulo,
//                subTitle: !this.props.isNew ? current.Clave : "",
//                children: !this.props.isNew ? [EK.UX.Labels.badgeEstatus(current.Estatus)] : null
//            };

//            let conceptosPago: any;
//            if (isSuccessful(this.props.item)) {
//                conceptosPago = createSuccessfulStoreObject(getData(this.props.item).ConceptosPago);
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
//                                item={current}
//                                conceptosPago={conceptosPago} />
//                            : <Edit
//                                isNew={this.props.isNew}
//                                item={current} />
//                        }
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    interface IViewProps extends React.Props<any> {
//        item: any;
//        conceptosPago: any;
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
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 12, 12, 3]} />
//                    <Label label={$page.form.descripcion.label} value={current.Descripcion} size={[12, 12, 12, 9]} />
//                </Row>
//                <Row>
//                    <Label label={$page.form.vigenciainicio.label} value={current.VigenciaInicio} size={[12, 12, 6, 3]} />
//                    <Label label={$page.form.vigenciafin.label} value={current.VigenciaFin} size={[12, 12, 6, 3]} />
//                    <Label label={$page.form.moneda.label} value={current.Moneda.Nombre} size={[12, 12, 12, 6]} />
//                </Row>
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <OptionSection title={$page.form.section.conceptos.titulo} collapsed={false} readOnly={true}>
//                            <PanelUpdate info={this.props.conceptosPago}>
//                                <List items={this.props.conceptosPago}
//                                    readonly={false}
//                                    addRemoveButton={false}
//                                    listHeader={ListHeader.getListHeader($page)}
//                                    formatter={(index: number, item: any) => {
//                                        return <Row style={{ paddingTop: 5, paddingBottom: 5 }}>
//                                            <Column size={[3, 3, 3, 3]} style={{ fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                                <span style={{ fontWeight: 400 }}>{item.ConceptoPago.Nombre}</span>
//                                            </Column>
//                                            <Column size={[2, 2, 2, 2]}>
//                                                <span style={{ fontWeight: 400 }}>{item.ConceptoPago.TipoConceptoPago.Nombre}</span>
//                                            </Column>
//                                            <Column size={[2, 2, 2, 2]}>
//                                                <span style={{ fontWeight: 400 }}>{item.NumeroPagos + ' - ' + item.FrecuenciaPago.Nombre}</span>
//                                            </Column>
//                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
//                                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDecimal(item.Importe)}</span>
//                                            </Column>
//                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
//                                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDecimal(item.Porcentaje)}</span>
//                                            </Column>
//                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
//                                                <span style={{ fontWeight: 400 }}>{item.Modificable ? EK.UX.Labels.ok(item.Modificable) : null}</span>
//                                            </Column>
//                                        </Row>;
//                                    } }
//                                    />
//                            </PanelUpdate>
//                        </OptionSection>
//                    </Column>
//                </Row>
//            </FadeInColumn>
//        }
//    }

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
//                    <Input id={"ID"} value={current.ID} label="" visible={false} />
//                    <Input
//                        id={"Clave"}
//                        label={$page.form.clave.label}
//                        size={[12, 12, 12, 3]}
//                        required={true}
//                        value={current.Clave}
//                        helpLabel={$page.form.clave.helplabel}
//                        maxLength={20}
//                        validations={[
//                            validations.required($page.form.clave.validaciones.requerida)
//                        ]} />
//                    <Input
//                        id={"Descripcion"}
//                        label={$page.form.descripcion.label}
//                        size={[12, 12, 12, 6]}
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
//                        lg={{ size: 3 }}
//                        required={true}
//                        value={estatus}
//                        helpLabel={$page.form.estatus.helplabel}
//                        disabled={false} />
//                </Row>
//                <Row>
//                    <DatePicker
//                        id={"VigenciaInicio"}
//                        label={$page.form.vigenciainicio.label}
//                        size={[12, 12, 6, 3]}
//                        required={true}
//                        value={current.VigenciaInicio}
//                        helpLabel={$page.form.vigenciainicio.helplabel}
//                        maxLength={8}
//                        validations={[
//                            validations.required($page.form.vigenciainicio.validaciones.requerida)
//                        ]} />
//                    <DatePicker
//                        id={"VigenciaFin"}
//                        label={$page.form.vigenciafin.label}
//                        size={[12, 12, 6, 3]}
//                        required={true}
//                        value={current.VigenciaFin}
//                        helpLabel={$page.form.vigenciafin.helplabel}
//                        maxLength={8}
//                        validations={[
//                            validations.required($page.form.vigenciafin.validaciones.requerida)
//                        ]} />
//                    <MonedasDDL
//                        id={"Moneda"}
//                        label={$page.form.moneda.label}
//                        size={[12, 12, 12, 6]}
//                        value={current.Moneda}
//                        required={true}
//                        helpLabel={$page.form.moneda.helplabel}
//                        validations={[
//                            validations.required($page.form.moneda.validaciones.requerida)
//                        ]} />
//                </Row>
//                <Row>
//                    <Column size={[12, 12, 12, 12]}>
//                        <Edit$ConceptosPago />
//                    </Column>
//                </Row>
//            </FadeInColumn>
//        }
//    }

//    class $SCVPlanesPagosPage {
//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.planesPagos.selected
//            };
//        };

//        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            obtenerItem: (id: number): void => {
//                dispatchAsync("scv-planesPagos-setSelected", "planesPagos/GetById/" + id);
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "scv-planesPagos-guardar",
//                    type: HttpMethod.PUT,
//                    url: "planesPagos/Save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("scv-planesPagos-catalogo", "planesPagos/GetAll(0)");
//            }
//        });
//    }

//    export let Edicion: any = ReactRedux.connect($SCVPlanesPagosPage.mapProps,
//        $SCVPlanesPagosPage.mapDispatchs)(ConnectedSCVPlanesPagosEditarPage);

//    export class Nuevo extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <Edicion isNew={true} />
//        }
//    };

//    interface IEditConceptosPagoProps extends React.Props<any> {
//        conceptosPago: DataElement;
//        form: any;
//        conceptoPago: any;
//        removeSelectedConceptoPago?: () => void;
//        setSelectedConceptoPago?: (item: any) => void;
//    }

//    class EditConceptosPago extends React.Component<IEditConceptosPagoProps, {}> {
//        constructor(props: IEditConceptosPagoProps) {
//            super(props);
//            this.onClickNew = this.onClickNew.bind(this);
//            this.onClickCancel = this.onClickCancel.bind(this);
//            this.onClickSelectItem = this.onClickSelectItem.bind(this);
//            this.onClickRemoveItem = this.onClickRemoveItem.bind(this);
//            this.updateItems = this.updateItems.bind(this);
//            this.onClickSave = this.onClickSave.bind(this);
//            this.onValidateElement = this.onValidateElement.bind(this);
//        }

//        static props: any = (state: any) => ({
//            conceptoPago: state.planesPagos.conceptosPagoSelected,
//            form: state.forms,
//            conceptosPago: Forms.getDataValue("ConceptosPago", PAGE_ID, state, [])
//        });

//        onClickNew(): void {
//            let newId: number = 0;
//            let conceptosPago: any[] = getData(this.props.conceptosPago);

//            conceptosPago.forEach((value: any, index: number) => {
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
//                ConceptoPago: createDefaultStoreObject({}),
//                FrecuenciaPago: createDefaultStoreObject({}),
//                NumeroPagos: 0,
//                Modificable: true,
//                Importe: 0,
//                Porcentaje: 0,
//                PorcentajeTIF: 0,
//                PorcentajeTIM: 0,
//                NumeroPlazoPrimerPago: 0,
//                PeriodoPrimerPago: createDefaultStoreObject({})
//            };

//            if (this.props.conceptosPago) {
//                let items: any[] = getData(this.props.conceptosPago.upsertItem(item));
//                this.props.removeSelectedConceptoPago();
//                this.updateItems(items);
//            };

//            Forms.remove(SECTION_ID);
//            this.props.setSelectedConceptoPago(item);
//        };

//        onClickCancel(): void {
//            this.props.removeSelectedConceptoPago();
//        };

//        onClickSelectItem(item: any): void {
//            Forms.remove(SECTION_ID);
//            this.props.setSelectedConceptoPago(item);
//        };

//        updateItems(items: any): void {
//            Forms.updateFormElement(PAGE_ID, "ConceptosPago", items);
//        };

//        onClickRemoveItem(item: any): void {
//            if (isSuccessful(this.props.conceptosPago)) {
//                let items: any[] = getData(this.props.conceptosPago.removeItem(item));
//                this.updateItems(items);
//            };
//        };

//        onValidateElement(id: any, idForm: string, value: any) {
//            let element: EK.UX.IFormElement = EK.UX.Forms.getFormElement(idForm, { id: id });
//            if (element.value === undefined || element.value === null) {
//                element.value = value;
//                EK.UX.Forms.updateFormElement(idForm, element);
//            }
//        }

//        onClickSave(): void {
//            let $page: any = $ml[PAGE_ID];

//            if (!Forms.isValid(SECTION_ID)) {
//                warning($page.mensajes.warning);
//                return;
//            };

//            this.onValidateElement("Importe", SECTION_ID, 0);
//            this.onValidateElement("Porcentaje", SECTION_ID, 0);

//            let item: EditForm = Forms.getForm(SECTION_ID);
//            let importe: number = Math.abs(item.formData.form["Importe"].value);
//            let porcentaje: number = Math.abs(item.formData.form["Porcentaje"].value);

//            if (importe > 0 && porcentaje > 0) {
//                warning($page.mensajes.requiredPorcentaje);
//                return;
//            }

//            if (importe === 0 && porcentaje === 0) {
//                warning($page.mensajes.requiredImporte);
//                return;
//            }

//            let conceptoPago: any = item
//                .addNumber("ID")
//                .addObject("ConceptoPago")
//                .addObject("FrecuenciaPago")
//                .addNumber("NumeroPagos")
//                .addBoolean("Modificable")
//                .addNumber("Importe")
//                .addNumber("Porcentaje")
//                .addNumber("PorcentajeTIF")
//                .addNumber("PorcentajeTIM")
//                .addNumber("NumeroPlazoPrimerPago")
//                .addObject("PeriodoPrimerPago")
//                .toObject();

//            conceptoPago = EK.Global.assign(conceptoPago, {
//                ConceptoPago: conceptoPago.ConceptoPago,
//                FrecuenciaPago: conceptoPago.FrecuenciaPago,
//                NumeroPagos: conceptoPago.NumeroPagos,
//                Modificable: conceptoPago.Modificable,
//                Importe: conceptoPago.Importe,
//                Porcentaje: conceptoPago.Porcentaje,
//                PorcentajeTIF: conceptoPago.PorcentajeTIF,
//                PorcentajeTIM: conceptoPago.PorcentajeTIM,
//                NumeroPlazoPrimerPago: conceptoPago.NumeroPlazoPrimerPago,
//                PeriodoPrimerPago: conceptoPago.PeriodoPrimerPago
//            });

//            if (this.props.conceptosPago) {
//                let items: any[] = getData(this.props.conceptosPago.upsertItem(conceptoPago));
//                this.props.removeSelectedConceptoPago();
//                this.updateItems(items);
//            };
//        }

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            removeSelectedConceptoPago: (): void => {
//                dispatchDefault("scv-planesPagos-conceptosPago-setSelected", {});
//            },
//            setSelectedConceptoPago: (item: any): void => {
//                dispatchSuccessful("scv-planesPagos-conceptosPago-setSelected", item);
//            }
//        });

//        shouldComponentUpdate(nextProps: IEditConceptosPagoProps, {}): boolean {
//            return (hasChanged(this.props.conceptoPago, nextProps.conceptoPago)) ||
//                (hasChanged(this.props.conceptosPago, nextProps.conceptosPago));
//        };

//        componentWillMount(): any {
//            dispatchDefault("scv-planesPagos-conceptosPago", []);
//            dispatchDefault("scv-planesPagos-conceptosPago-setSelected", {});
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let items: DataElement;
//            if (isSuccessful(this.props.conceptosPago)) {
//                items = this.props.conceptosPago.getActiveItems();
//            }
//            let conceptosPagoBeingEdited: boolean = isSuccessful(this.props.conceptoPago);
//            let model: any = getData(this.props.conceptoPago);

//            let editSection: JSX.Element = (
//                <OptionSection
//                    collapsed={false}
//                    title={$page.form.section.conceptos.titulo}
//                    editMode={conceptosPagoBeingEdited}>
//                    <SectionView onAddNew={this.onClickNew}>
//                        <List
//                            items={items}
//                            readonly={false}
//                            listHeader={ListHeader.getListHeader($page)}
//                            addRemoveButton={false}
//                            dragAndDrop={false}
//                            formatter={(index: number, item: any) => {
//                                return <Row style={{ paddingTop: 5, paddingBottom: 5 }}>
//                                    <Column size={[3, 3, 3, 3]} style={{ fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                        <span style={{ fontWeight: 400 }}>{item.ConceptoPago.Nombre}</span>
//                                    </Column>
//                                    <Column size={[2, 2, 2, 2]}>
//                                        <span style={{ fontWeight: 400 }}>{item.ConceptoPago.TipoConceptoPago.Nombre}</span>
//                                    </Column>
//                                    <Column size={[2, 2, 2, 2]}>
//                                        <span style={{ fontWeight: 400 }}>{item.NumeroPagos + ' - ' + item.FrecuenciaPago.Nombre}</span>
//                                    </Column>
//                                    <Column size={[1, 1, 1, 1]}>
//                                        <span style={{ fontWeight: 400, float: "right" }}>{EK.UX.Labels.formatDecimal(item.Importe)}</span>
//                                    </Column>
//                                    <Column size={[1, 1, 1, 1]}>
//                                        <span style={{ fontWeight: 400, float: "right" }}>{EK.UX.Labels.formatDecimal(item.Porcentaje)}</span>
//                                    </Column>
//                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
//                                        <span>{item.Modificable ? EK.UX.Labels.ok(item.Modificable) : null}</span>
//                                    </Column>
//                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }}>
//                                        <Button className="btn-sm-ek" onClick={this.onClickSelectItem} info={item} icon="icon-pencil"></Button>
//                                        <Button className="btn-sm-ek" onClick={this.onClickRemoveItem} info={item} icon="icon-trash"></Button>
//                                    </Column>
//                                </Row>;
//                            } } />
//                    </SectionView>
//                    <SectionEdit
//                        idForm={SECTION_ID}
//                        onCancel={this.onClickCancel}
//                        onSave={this.onClickSave}>
//                        <Row>
//                            <Column size={[12, 12, 12, 12]}>
//                                <Row>
//                                    <Input
//                                        id={"ID"}
//                                        idFormSection={SECTION_ID}
//                                        value={model.ID}
//                                        visible={false}
//                                        />
//                                    <ConceptosPagoDDL
//                                        id={"ConceptoPago"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        size={[12, 12, 9, 9]}
//                                        required={true}
//                                        value={model.ConceptoPago}
//                                        helpLabel={""}
//                                        />
//                                    <CheckBox
//                                        id={"Modificable"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        xs={{ size: 12 }}
//                                        sm={{ size: 12 }}
//                                        md={{ size: 3 }}
//                                        lg={{ size: 3 }}
//                                        required={true}
//                                        mode={checkBox.Mode.line}
//                                        value={model.Modificable}
//                                        helpLabel={""}
//                                        disabled={false} />
//                                </Row>
//                                <Row>
//                                    <Currency
//                                        id={"Importe"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        size={[12, 12, 6, 3]}
//                                        required={true}
//                                        value={model.Importe}
//                                        maxLength={8}
//                                        />
//                                    <Currency
//                                        id={"Porcentaje"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        size={[12, 12, 6, 3]}
//                                        required={true}
//                                        value={model.Porcentaje}
//                                        maxLength={8}
//                                       />
//                                    <Integer
//                                        id={"NumeroPagos"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        size={[12, 12, 6, 3]}
//                                        required={true}
//                                        value={model.NumeroPagos}
//                                        maxLength={8}
//                                       />
//                                    <FrecuenciaPagoDDL
//                                        id={"FrecuenciaPago"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        size={[12, 12, 6, 3]}
//                                        required={true}
//                                        value={model.FrecuenciaPago}
//                                        helpLabel={""}
//                                        />
//                                </Row>
//                                <Row>
//                                    <Currency
//                                        id={"PorcentajeTIF"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        size={[12, 12, 6, 3]}
//                                        required={false}
//                                        value={model.PorcentajeTIF}
//                                        maxLength={8}
//                                      />
//                                    <Currency
//                                        id={"PorcentajeTIM"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        size={[12, 12, 6, 3]}
//                                        required={false}
//                                        value={model.PorcentajeTIM}
//                                        maxLength={8}
//                                        />
//                                    <Integer
//                                        id={"NumeroPlazoPrimerPago"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        size={[12, 12, 6, 3]}
//                                        required={true}
//                                        value={model.NumeroPlazoPrimerPago}
//                                        maxLength={8}
//                                       />
//                                    <PeriodoPagoDDL
//                                        id={"PeriodoPrimerPago"}
//                                        idFormSection={SECTION_ID}
//                                        label={""}
//                                        size={[12, 12, 6, 3]}
//                                        required={true}
//                                        value={model.PeriodoPrimerPago}
//                                        helpLabel={""}
//                                         />
//                                </Row>
//                            </Column>
//                        </Row>
//                    </SectionEdit>
//                </OptionSection>
//            )
//            return editSection;
//        }
//    }

//    const Edit$ConceptosPago: any =
//        ReactRedux.connect(EditConceptosPago.props, EditConceptosPago.dispatchs)(EditConceptosPago);
//}